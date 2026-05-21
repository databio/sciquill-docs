---
title: Overview
description: Introduction to markmeld - the markdown melder
---

Markmeld is a *markdown melder*. It merges `yaml` and `markdown` content using `jinja2` templates. You configure markmeld with your content in computer-readable `.md` and `.yaml` files, and markmeld helps produce polished, publication-ready versions of your content.

## How it works

1. Store your content in computer-readable formats: `.md` for unstructured text, `.yaml` for structured content like lists or objects.
2. Write or find a jinja template that produces the output document you're trying to create. We have common examples in a [public repository](https://databio.org/mm_templates/).
3. Configure markmeld with a `yaml` configuration file pointing to your content files and your jinja template.

Markmeld is particularly powerful when combined with [pandoc](https://pandoc.org) — pipe the markmeld output to pandoc, making it easy to format output in HTML, PDF via LaTeX, Word, and more.

## Why use markmeld?

For simple use cases, you can use pandoc alone by providing a list of markdown files. Markmeld adds power:

### 1. Structured content

Markmeld integrates structured YAML data alongside prose content. Useful for CVs, biosketches, and grants where you have both prose and structured lists.

### 2. Templated output

Jinja templates give you control over output structure. Re-arrange, subset, merge, and compute on input to create complex output — not just concatenation.

### 3. Flexible downstream uses

Markmeld outputs aren't restricted to markdown. Design templates that produce JSON, HTML, or any format.

### 4. Pre-build hooks

Incorporate commands that run before or after builds. Build "meta-targets" made of other targets.

### 5. Mail merge

Loop functions generate multiple similar documents differing based on structured input — like traditional mail merge.

### 6. Target factories

A plugin system to auto-create targets using Python code.

## Quick example

```yaml
targets:
  manuscript:
    jinja_template: manuscript.jinja
    output_file: output/manuscript.pdf
    command: |
      pandoc --template letter.tex --output "{output_file}"
    data:
      md_files:
        content: src/manuscript.md
      yaml_files:
        metadata: src/metadata.yaml
```

Build with: `mm manuscript`
