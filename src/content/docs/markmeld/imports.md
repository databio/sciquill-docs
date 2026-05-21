---
title: Imports
description: Importing and sharing markmeld configurations
---

Import shared config to reuse settings across projects.

## Basic imports

Create a shared config file with common settings:

```yaml
# /path/to/shared/_markmeld.yaml
targets:
  base_target:
    figczar: /path/to/figczar.lua
    csl: /path/to/biomed-central.csl
    bibdb: /path/to/references.bib
```

Import it in your project:

```yaml
imports:
  - /path/to/shared/_markmeld.yaml
```

Now you can use `{figczar}`, `{csl}`, and `{bibdb}` in your commands.

## Using environment variables

Point to shared config with an environment variable:

```yaml
imports:
  - $MARKMELD
```

## Inheriting from imported targets

```yaml
imports:
  - /path/to/shared/_markmeld.yaml

targets:
  my_target:
    inherit_from: base_target
    data:
      md_files:
        content: manuscript.md
```

## Import priority

Imports are processed in order. Local settings override imported ones.

## Relative imports

By default, relative paths in imported files are relative to the **importing** file. To keep paths relative to the **imported** file:

```yaml
imports:
  - these/paths/relative/to/here/_markmeld.yaml

imports_relative:
  - these/paths/relative/to/there/_markmeld.yaml
```

Avoid nesting relative imports — it gets confusing.
