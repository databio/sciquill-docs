---
title: Install
description: Installing markmeld
---

```bash
pip install markmeld
```

## Testing

Markmeld provides the `mm` executable. Test with the demos in the markmeld repository:

```bash
git clone https://github.com/databio/markmeld
cd markmeld/demo
mm default
```

This produces output, automatically piping to pandoc. Get raw output with `-p`:

```bash
mm default -p > rendered.md
```

## Prerequisites

Markmeld requires [pandoc](https://pandoc.org/) for document conversion. Optional tools:

- **[inkscape](http://inkscape.org)** - Convert SVG to PDF
- **[ghostscript](http://www.ghostscript.com)** - Merge PDFs
