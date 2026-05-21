---
title: Multi-Output Targets
description: Generating multiple outputs from a single target
---

Multi-output targets produce multiple outputs from a single target definition — like mail merge.

## Quick start

Add a `loop` to your target:

```yaml
targets:
  letters:
    output_file: "letter_{recipient}.pdf"
    jinja_template: letter.jinja
    loop:
      loop_data: recipients
      assign_to: recipient
    data:
      yaml_files:
        data: recipients.yaml
```

Where `recipients.yaml` contains:

```yaml
recipients:
  - "John Doe"
  - "Jane Doe"
```

Run `mm letters` to generate `letter_John Doe.pdf` and `letter_Jane Doe.pdf`.

## Loop attributes

| Attribute | Description |
|-----------|-------------|
| `loop_data` | Name of the array to iterate over |
| `assign_to` | Variable name for each element |

## Array of objects

For more complex data:

```yaml
recipients:
  - name: "John Doe"
    institution: "University of Virginia"
  - name: "Jane Doe"
    institution: "Brigham Young University"
```

Access properties in output_file and templates:

```yaml
output_file: "letter_{recipient[name]}.pdf"
```

In your jinja template:

```jinja
Dear {{ recipient.name }},

On behalf of {{ recipient.institution }}...
```

## Example: Email mail merge

Generate mailto links for personalized emails:

```yaml
# data.yaml
people:
  - first_name: Bob
    email: bob@example.com
  - first_name: Alice
    email: alice@example.com
```

```jinja
{# letter.jinja #}
{% for person in people %}
<a href="mailto:{{ person.email }}?subject=Hello&body=Hi {{ person.first_name }}">
  {{ person.first_name }}
</a>
{% endfor %}
```

```yaml
# _markmeld.yaml
targets:
  emails:
    jinja_template: letter.jinja
    output_file: emails.html
    command: pandoc -o {output_file}
    data:
      yaml_files:
        - data.yaml
```
