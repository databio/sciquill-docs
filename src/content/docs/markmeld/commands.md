---
title: Commands
description: Alternative commands and target types
---

Markmeld renders your jinja template and pipes the output to a command (usually pandoc). You can customize this behavior.

## Default command

If you omit `command`, markmeld uses:

```yaml
command: pandoc --template "{latex_template}" --output "{output_file}"
```

## Custom commands

### Without pandoc

Write rendered output directly to a file:

```yaml
targets:
  csv_export:
    jinja_template: data.jinja
    output_file: output.csv
    command: cat > {output_file}
```

Your jinja template outputs CSV, and it's written directly.

### Multiple commands

Chain commands with pipes:

```yaml
command: |
  pandoc -o {output_file}.tex && pdflatex {output_file}.tex
```

## Target types

### Raw targets

Run a command without passing template output to stdin:

```yaml
targets:
  build_figures:
    type: raw
    command: ./build_figs.sh
```

Useful for prebuild/postbuild steps.

### Meta targets

Run other targets without any command:

```yaml
targets:
  build_all:
    type: meta
    prebuild:
      - figures
      - manuscript
      - supplement
```

### Abstract targets

Define reusable config that can't be built directly:

```yaml
targets:
  base_config:
    abstract: true
    bibfolder: /path/to/bib/
    csl: nature.csl
  
  manuscript:
    inherit_from: base_config
    jinja_template: manuscript.jinja
```
