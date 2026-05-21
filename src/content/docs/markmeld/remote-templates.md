---
title: Remote Templates
description: Using templates from the mm_templates repository
---

Markmeld can fetch templates from a remote repository, so you don't need to maintain local copies.

## Template repository

The official template repository is at [databio.org/mm_templates](https://databio.org/mm_templates).

Available templates include:
- `generic.jinja` — General-purpose document
- `manuscript/` — Academic manuscripts
- `grant/` — Grant proposals
- `letter/` — Letters
- `biosketch/` — NIH biosketches

## Using remote templates

Reference templates by URL in your config:

```yaml
targets:
  manuscript:
    jinja_template: https://databio.org/mm_templates/v1/manuscript/manuscript.jinja
    output_file: manuscript.pdf
    data:
      md_files:
        content: src/manuscript.md
```

## Version pinning

Use versioned paths to ensure reproducibility:

```yaml
# Version 1 (stable)
jinja_template: https://databio.org/mm_templates/v1/manuscript/manuscript.jinja

# Version 0 (legacy)
jinja_template: https://databio.org/mm_templates/v0/manuscript.jinja
```

## Local caching

Markmeld caches remote templates locally after the first download. Use `--force-refresh` to update:

```bash
mm manuscript --force-refresh
```
