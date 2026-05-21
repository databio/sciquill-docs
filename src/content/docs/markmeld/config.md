---
title: Configuration
description: Markmeld configuration specification
---

A markmeld project is configured using `_markmeld.yaml`. This file specifies targets to build, each with data, templates, and build options.

## Root configuration

```yaml
version: "1"
targets:
  # targets defined here
imports:
  - other_config.yaml
```

- `version` — Config specification version (use "1")
- `targets` — Build targets
- `imports` — Import other markmeld configs
- `target_factories` — Auto-generate targets with plugins

## Target configuration

```yaml
targets:
  my_target:
    jinja_template: template.jinja
    output_file: output/{today}_document.pdf
    command: pandoc -o "{output_file}"
    data:
      md_files:
        content: manuscript.md
      yaml_files:
        metadata: data.yaml
      variables:
        author: "Jane Doe"
```

### Core attributes

| Attribute | Description |
|-----------|-------------|
| `jinja_template` | Path to Jinja template |
| `output_file` | Output path (supports `{today}`, `{target_name}`) |
| `command` | Shell command (receives rendered output on stdin) |
| `type` | Target type (`raw` for no jinja rendering) |
| `data` | Input content specification |

### Data block

| Directive | Description |
|-----------|-------------|
| `md_files` | Named markdown files |
| `md_globs` | Glob patterns for markdown |
| `yaml_files` | Named YAML files |
| `yaml_globs` | Glob patterns for YAML |
| `variables` | Inline YAML data |

### Frontmatter control

```yaml
targets:
  my_target:
    frontmatter:
      csl: nature.csl        # Default, doc can override
    frontmatter_overrides:
      lab: "Sheffield Lab"   # Always wins
```

### Target inheritance

```yaml
targets:
  base:
    jinja_template: shared.jinja
  derived:
    inherit_from: base
    data:
      md_files:
        content: specific.md
```

### Side targets

```yaml
targets:
  main:
    prebuild:
      - build_figures
    postbuild:
      - cleanup
```

### Options

```yaml
targets:
  my_target:
    recursive_render: false  # Disable double-rendering
    stopopen: true           # Don't auto-open output
```
