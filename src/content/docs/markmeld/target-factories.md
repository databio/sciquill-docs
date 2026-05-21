---
title: Target Factories
description: Programmatically generate markmeld targets
---

Target factories generate targets programmatically. Instead of specifying every target in your config, a factory can add multiple targets from an external data source or file list.

## Example use case

Say you have a folder of `.md` files and want a separate PDF for each. Without factories, you'd need a target for each file. With a target factory, add a new target by just adding a new `.md` file — no config change needed.

## Built-in: Glob factory

The `glob` factory creates a target for each file matching a pattern:

```yaml
target_factories:
  - glob:
      path: "*.md"
  - glob:
      name_levels: 2
      path: "*/*.md"
      glob_variables:
        jinja_template: template.jinja
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `path` | Glob pattern (e.g., `*.md`, `*/*.md`) |
| `name_levels` | Directory levels in target name (default: 0) |
| `inherit_from` | Optional target to inherit settings from |
| `glob_variables` | Additional variables for generated targets |

## Custom target factories

Create your own factories as Python packages.

### 1. Define the factory function

```python
def my_factory(cfg):
    """Return a dict of target_name: target_config pairs."""
    targets = {}
    for item in get_items():
        targets[item.name] = {
            'jinja_template': 'template.jinja',
            'output_file': f'{item.name}.pdf',
            'data': {'variables': {'title': item.title}}
        }
    return targets
```

### 2. Register as entry point

In `pyproject.toml`:

```toml
[project.entry-points."markmeld.factories"]
my_factory = "mypackage:my_factory"
```

### 3. Use in config

```yaml
target_factories:
  - my_factory:
      custom_param: value
```
