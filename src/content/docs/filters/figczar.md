---
title: Figure Management
description: Pandoc filter for advanced figure handling in LaTeX documents
---

Figczar is a pandoc filter that adds power to pandoc's ability to display figures in LaTeX documents. It handles figure wrapping, multi-column figures, and label-based references.

## Figure labels

Refer to figures by LaTeX label instead of by number, making reordering easy:

```markdown
![\label{abstract}Fig. \ref{abstract}: Example figure](fig/example_figure.png) 
```

Refer to figures elsewhere with `\ref{label}`.

## Wrapfig

Wrap figures using the [LaTeX wrapfig package](https://ctan.org/pkg/wrapfig?lang=en) by appending `{wrap=X}`:

```markdown
![\label{myfigure}Fig \ref{myfigure}. Fig Title](fig/figure.pdf){wrap=82mm}
```

Specify the width in any LaTeX-compatible format.

## Full-width figures

Use `{fullwidth=t}` to create a `\figure*` environment, making figures span columns in multi-column templates:

```markdown
![\label{myfigure2}Fig \ref{myfigure2}. Fig 2 Title](fig/figure2.pdf){fullwidth=t}
```

### Positioning options

- `h` — *here*: Place where the figure environment is, if there's room
- `t` — *top*: Place at the top of a page
- `b` — *bottom*: Place at the bottom of a page
- `p` — *page*: Place on a page containing only floats
- `!` — *force*: Ignore parameters for float placement

Example: `{fullwidth=b}` places a full-width figure at the bottom.
