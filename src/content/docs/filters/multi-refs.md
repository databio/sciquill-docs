---
title: Multiple References
description: Pandoc filter for multiple bibliography sections
---

The multi-refs filter lets you have multiple references sections in a document. Useful for separating main manuscript references from supplemental references.

## Basic usage

Place a div where you want references to appear:

```markdown
<div class="multi-refs"></div>
```

References cited before this point will appear here. You can place multiple divs to create separate bibliography sections.

## Example structure

```markdown
# Main Manuscript

Here's a citation [@smith2020].

<div class="multi-refs"></div>

# Supplemental Material

Here's another citation [@jones2021].

<div class="multi-refs"></div>
```

## Handling duplicate references

Control what happens when a reference appears in multiple sections:

```yaml
---
multiref_no_duplicates: true
---
```

- `false` (default): List in both bibliographies (better for alphabetical styles)
- `true`: Only list in the first bibliography (better for numeric styles)

## Command line usage

The filter works with any of these patterns:

```bash
# --citeproc before filter
pandoc --citeproc --lua-filter multi-refs.lua doc.md -o doc.pdf

# --citeproc after filter  
pandoc --lua-filter multi-refs.lua --citeproc doc.md -o doc.pdf

# No --citeproc (filter handles internally)
pandoc --lua-filter multi-refs.lua doc.md -o doc.pdf
```

All three produce identical output.

## Further reading

- [Handling supplemental citations with pandoc](https://databio.org/supplemental_citations)
