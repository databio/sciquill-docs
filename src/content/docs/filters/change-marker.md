---
title: Change Tracking
description: Pandoc filter for marking changes in manuscripts
---

The change marker filter helps provide manuscript versions with changes highlighted.

## Enable change marking

Add to your document metadata:

```yaml
mark_changes: true
```

## Mark changed text

Use the `{.changed}` attribute on a text span:

```markdown
This text will not be marked. [This text was changed.]{.changed} This text was not changed.
```

## Toggle changes

Switch change marking on or off by toggling `mark_changes` in your metadata. This lets you maintain a single source and build both marked and clean versions.

## Custom colors

The default color is `brickred`. Change it in metadata:

```yaml
mark_changes: true
change_color: blue
```
