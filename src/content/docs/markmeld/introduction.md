---
title: Introduction
description: Overview of markmeld - scientific document authoring with markdown
---

Markmeld is an academic publishing system. It helps you author scientific documents using `markdown` and `YAML`. Document types include grants, papers, biosketches, CVs, dissertations, letters, and more.

## Philosophy

The core principle: **separate content from style**.

You specify 3 pieces of information: **content**, **structure**, and **style**. Together, these generate your desired output:

```
content + structure + style → output
```

### 1. Content

Write your content (manuscript, CV, grant) in `markdown` and/or `YAML` format.

### 2. Structure

Structure determines how your content comes together. Your `YAML` and `markdown` inputs are integrated using a `Jinja` template. Markmeld renders your template, producing output (typically markdown) that integrates all your inputs.

### 3. Style

Style controls the look and feel of your output. Are you building a PDF? A Word document? We use [pandoc](http://pandoc.org) for this step. You specify style using a pandoc template, and markmeld pipes its output into pandoc to generate the final document.

## Configuration

Connect content, structure, and style by specifying them in a `_markmeld.yaml` configuration file.
