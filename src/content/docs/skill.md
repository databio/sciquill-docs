---
title: AI Skill Reference
description: AI agent reference for markmeld document authoring
---

> Markmeld melds markdown/YAML via Jinja2 templates → pandoc → documents. Philosophy: **content + structure + style → output**.

## Install & CLI

```bash
pip install markmeld   # requires pandoc
mm                     # list targets
mm <target>            # build target
mm <target> -p         # preview (no build)
mm <target> -d         # dump template data
mm <target> -e         # explain target
```

## Configuration (`_markmeld.yaml`)

```yaml
targets:
  manuscript:
    jinja_template: template.jinja
    output_file: output/{today}_manuscript.pdf
    command: pandoc -o "{output_file}"
    data:
      md_files:
        content: src/manuscript.md
      yaml_files:
        metadata: src/metadata.yaml
      variables:
        author: "Jane Doe"
```

**Data sources:** `md_files`, `yaml_files`, `variables`, `md_globs`, `yaml_globs`

**Target types:** standard (template→command), `type: raw` (command only), `type: meta` (orchestrates others)

**Inheritance:** `inherit_from: base_target`

**Side targets:** `prebuild: [...]`, `postbuild: [...]`

## Jinja Templates

```jinja
---
title: {{ title }}
---
{{ content }}
```

**Special variables:** `{{ _today }}`, `{{ _now }}`, `{{ target_name }}`, `{{ _md[key].content }}`, `{{ _yaml[key].content }}`

## Multi-output (mail merge)

```yaml
loop:
  loop_data: recipients   # list from YAML
  assign_to: recipient    # available in template
output_file: "letter_{recipient.name}.pdf"
```

## Advanced Features

- **Imports:** `imports: [/path/to/_markmeld.yaml]`
- **Google Drive:** `type: google-doc` with `google_docs: {doc_id: "..."}` (needs `MM_GOOGLE_DRIVE_CREDENTIALS`)
- **Remote templates:** `jinja_template: https://databio.org/mm_templates/v1/...`
- **Pandoc filters:** figczar (figures), change-marker (track changes), multi-refs (bibliographies)

## Docs

Full documentation: `https://sciquill.databio.org/markmeld/<page>.md` (raw markdown, AI-fetchable)
