---
title: Jinja Templates
description: Writing Jinja templates for markmeld
---

Data content is specified in the markmeld config through options like `md_files`, `yaml_globs`, and more. Markmeld loads this data and runs it through a Jinja template.

## Standard variable naming

Use `content` as the standard name for your main document:

```yaml
data:
  md_files:
    content: manuscript.md
```

In your template:

```jinja
{{ content }}
```

For multiple documents, use descriptive names:

```yaml
data:
  md_files:
    content: manuscript.md
    supplement: appendix.md
```

## File directives

### md_files and yaml_files

Specify a key for each file:

```yaml
data:
  md_files:
    my_md_file: path/to/file1.md
  yaml_files:
    my_yaml_file: path/to/file2.yaml
```

Access markdown content directly:

```jinja
{{ my_md_file }}
```

Access YAML as a dictionary:

```jinja
{{ my_yaml_file.variable_name }}
```

### Globs

For `md_globs` and `yaml_globs`, content is available under the filename (without extension):

```yaml
data:
  md_globs:
    - chapters/*.md
```

```jinja
{{ chapter1 }}
```

## Variables directive

Define variables directly in config:

```yaml
data:
  variables:
    author: "Jane Doe"
    year: 2025
```

Access them: `{{ author }}`, `{{ year }}`

## Special variables

Markmeld provides these automatically:

- `{{ _today }}` — Today's date (YYYY-MM-DD)
- `{{ _now }}` — Current UNIX timestamp
- `{{ target_name }}` — Current target name
- `{{ _global_frontmatter }}` — Merged frontmatter from all sources
- `{{ _local_frontmatter }}` — Frontmatter by file key
- `{{ _md }}` — Structured access to markdown content
- `{{ _yaml }}` — Structured access to YAML content

## Frontmatter

### Base defaults

```yaml
targets:
  my_target:
    frontmatter:
      csl: "nature.csl"
    data:
      md_files:
        content: manuscript.md
```

### Overrides (always win)

```yaml
targets:
  my_target:
    frontmatter_overrides:
      lab: "Sheffield Lab"
```

### Precedence

```
frontmatter < md frontmatter < yaml data < variables < frontmatter_overrides
```

## Dynamic access with _md

For loops and dynamic templates:

```yaml
data:
  md_files:
    intro: md/01-intro.md
    chapter1: md/02-chapter.md
  variables:
    chapters: [intro, chapter1]
```

```jinja
{% for chapter in chapters %}
{{ _md[chapter].content }}
{% endfor %}
```

Properties: `.content`, `.frontmatter`, `.path`, `.ext`

## Custom filters

### date filter

```jinja
{{ some_date | date(to_format="%B %d, %Y") }}
```

### extract_refs filter

```jinja
{% set refs = content | extract_refs %}
```
