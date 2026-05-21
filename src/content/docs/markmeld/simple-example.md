---
title: Simple Example
description: A basic markmeld tutorial
---

## Definition of terms

- **configuration file** — A YAML file that configures markmeld and specifies targets (default: `_markmeld.yaml`)
- **target** — A specific recipe that usually builds an output
- **data** — Content in markdown or YAML format used to produce a target
- **template** — A [jinja2](https://palletsprojects.com/p/jinja/) file defining how input is integrated to produce output

## A simple example

Here's a `_markmeld.yaml` that produces a single target:

```yaml
targets:
  target1:
    output_file: "{today}_demo_output.pdf"  
    latex_template: pandoc_default.tex
    jinja_template: jinja_template.jinja
    command: |
        pandoc --template "{latex_template}" --output "{output_file}"
    data:
      yaml_files:
        - some_data.yaml
      md_files:
        some_text_data: some_text.md
```

This target reads structured data from `some_data.yaml` and prose from `some_text.md`, integrated through `jinja_template.jinja`. The output is piped to pandoc to produce the PDF.

Build it with: `mm target1`

## Command line usage

- `mm` — List available targets
- `mm -c <config>` — Use a different config file
- `mm -l` — List targets with descriptions
- `mm <target>` — Build the target
- `mm <target> -p` — Print output (what would be piped to the command)
- `mm <target> -d` — Dump structured input before melding (useful for debugging templates)
- `mm <target> -e` — Explain the target configuration
