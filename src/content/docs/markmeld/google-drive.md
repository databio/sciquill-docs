---
title: Google Drive
description: Using Google Docs as markmeld sources
---

Markmeld supports using Google Docs directly as content sources. This allows collaborative authoring in Google Docs while building documents with markmeld.

## Setup

1. Create a Google Cloud service account
2. Download the credentials JSON
3. Set the environment variable:

```bash
export MM_GOOGLE_DRIVE_CREDENTIALS="/path/to/credentials.json"
```

4. Share your Google Docs with the service account email

## Configuration

Set `type: google-doc` in your target:

```yaml
targets:
  manuscript:
    type: google-doc
    jinja_template: template.jinja
    output_file: manuscript.pdf
    data:
      google_docs:
        doc_id: "YOUR_GOOGLE_DOC_ID"
        folder_id: "YOUR_FOLDER_ID"  # Optional: for figures
```

Get the doc ID from the URL: `docs.google.com/document/d/YOUR_DOC_ID/edit`

## Building

```bash
mm manuscript                    # Normal build (uses cache)
mm manuscript --force-refresh    # Bypass cache
mm manuscript --clear-cache      # Clear cache first
```

## Figure handling

When you specify a `folder_id` (or let it auto-detect the doc's parent folder), markmeld:
- Converts SVG files to PDF
- Downloads CSV and data files  
- Updates figure paths in the document
- Caches converted files

## Cache location

```
.cache/
└── {doc_id}/
    ├── docs/       # Cached markdown
    ├── converted/  # SVG→PDF conversions
    └── csv/        # Downloaded data files
```

## Python API

```python
from markmeld.google_drive import GoogleDriveProcessor

processor = GoogleDriveProcessor()
doc = processor.download_doc('doc-id')
print(doc.content)
```
