import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIR = fileURLToPath(new URL('../content/docs/', import.meta.url));

/**
 * Astro integration that serves raw .md source files (frontmatter stripped)
 * alongside HTML pages. Works in both dev and build modes.
 */
export default function rawMarkdown() {
  return {
    name: 'raw-markdown',
    hooks: {
      // Dev: serve .md files via Vite middleware
      'astro:config:setup': ({ addMiddleware, updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [{
              name: 'raw-markdown-dev',
              configureServer(server) {
                server.middlewares.use(async (req, res, next) => {
                  if (!req.url?.endsWith('.md')) return next();

                  const relPath = req.url.startsWith('/') ? req.url.slice(1) : req.url;
                  // Try exact match, then .mdx variant
                  let srcPath = join(CONTENT_DIR, relPath);
                  let content;
                  try {
                    content = await readFile(srcPath, 'utf-8');
                  } catch {
                    // Try .mdx source for .md request
                    const mdxPath = srcPath.replace(/\.md$/, '.mdx');
                    try {
                      content = await readFile(mdxPath, 'utf-8');
                    } catch {
                      return next();
                    }
                  }

                  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
                  res.end(stripFrontmatter(content));
                });
              },
            }],
          },
        });
      },
      // Build: copy .md files to dist/
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        await copyMarkdownFiles(CONTENT_DIR, outDir, CONTENT_DIR);
      },
    },
  };
}

async function copyMarkdownFiles(srcDir, outDir, rootDir) {
  const entries = await readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    if (entry.isDirectory()) {
      await copyMarkdownFiles(srcPath, outDir, rootDir);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const rel = relative(rootDir, srcPath).replace(/\.mdx$/, '.md');
      const destPath = join(outDir, rel);
      await mkdir(dirname(destPath), { recursive: true });
      const raw = await readFile(srcPath, 'utf-8');
      const stripped = stripFrontmatter(raw);
      await writeFile(destPath, stripped);
    }
  }
}

function stripFrontmatter(content) {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  if (match) {
    return content.slice(match[0].length);
  }
  return content;
}
