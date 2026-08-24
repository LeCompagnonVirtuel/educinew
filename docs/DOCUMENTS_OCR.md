# Document OCR Processing Documentation

## Overview

The OCR (Optical Character Recognition) Processing feature provides intelligent text extraction from scanned documents, images, and PDFs. It supports multi-language recognition, template-based field extraction, confidence scoring, error correction, and batch processing capabilities.

---

## OCR Pipeline Architecture

### Processing Flow

```
Document Upload
  → Image Preprocessing
    → Language Detection
      → Text Recognition
        → Post-Processing
          → Field Extraction
            → Validation
              → Storage
                → Notification
```

### Pipeline Stages

| Stage | Description | Output |
|-------|-------------|--------|
| Preprocessing | Image enhancement, deskewing | Clean image |
| Detection | Language and layout detection | Metadata |
| Recognition | Character recognition | Raw text |
| Post-processing | Error correction, formatting | Clean text |
| Extraction | Field extraction from templates | Structured data |
| Validation | Data validation and verification | Validated data |

### Architecture Components

```
┌─────────────────────────────────────────────────────┐
│                   OCR Service                       │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │Preprocess│→ │Recognize │→ │PostProcess│         │
│  └──────────┘  └──────────┘  └──────────┘         │
│       ↓              ↓              ↓               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Enhance  │  │  Tesseract│  │ Correct  │         │
│  │ Deskew   │  │  Custom   │  │ Format   │         │
│  │ Denoise  │  │  Engine   │  │ Validate │         │
│  └──────────┘  └──────────┘  └──────────┘         │
└─────────────────────────────────────────────────────┘
```

---

## Supported Languages

### Primary Languages

| Code | Language | Status |
|------|----------|--------|
| `eng` | English | ✅ Full support |
| `fra` | French | ✅ Full support |
| `deu` | German | ✅ Full support |
| `spa` | Spanish | ✅ Full support |
| `ita` | Italian | ✅ Full support |
| `por` | Portuguese | ✅ Full support |
| `nld` | Dutch | ✅ Full support |
| `rus` | Russian | ✅ Full support |
| `jpn` | Japanese | ✅ Full support |
| `chi_sim` | Chinese (Simplified) | ✅ Full support |

### Additional Languages

| Code | Language | Status |
|------|----------|--------|
| `chi_tra` | Chinese (Traditional) | ✅ Supported |
| `kor` | Korean | ✅ Supported |
| `ara` | Arabic | ✅ Supported |
| `hin` | Hindi | ✅ Supported |
| `tur` | Turkish | ✅ Supported |
| `pol` | Polish | ✅ Supported |
| `swe` | Swedish | ✅ Supported |
| `nor` | Norwegian | ✅ Supported |
| `dan` | Danish | ✅ Supported |
| `fin` | Finnish | ✅ Supported |

### Language Detection

| Method | Description |
|--------|-------------|
| Auto-detect | Automatic language detection |
| Manual select | User specifies language |
| Multi-language | Multiple languages in one document |

---

## Template-Based Extraction

### Template Types

| Template | Description |
|----------|-------------|
| Invoice | Invoice document extraction |
| Receipt | Receipt document extraction |
| ID Document | ID card, passport extraction |
| Form | Form field extraction |
| Contract | Contract clause extraction |
| Custom | User-defined templates |

### Template Configuration

```json
{
  "id": "invoice_template",
  "name": "Invoice Template",
  "fields": [
    {
      "name": "invoiceNumber",
      "type": "text",
      "pattern": "Invoice #([A-Z0-9]+)",
      "required": true
    },
    {
      "name": "totalAmount",
      "type": "number",
      "pattern": "Total: \\$([0-9,.]+)",
      "required": true
    },
    {
      "name": "date",
      "type": "date",
      "pattern": "Date: (\\d{2}/\\d{2}/\\d{4})",
      "required": true
    },
    {
      "name": "vendorName",
      "type": "text",
      "region": "header",
      "required": true
    }
  ],
  "regions": {
    "header": { "x": 0, "y": 0, "width": 100, "height": 20 },
    "body": { "x": 0, "y": 20, "width": 100, "height": 60 },
    "footer": { "x": 0, "y": 80, "width": 100, "height": 20 }
  }
}
```

### Template Operations

| Operation | Description |
|-----------|-------------|
| Create | Create extraction template |
| Update | Update template fields |
| Delete | Delete template |
| List | List available templates |
| Test | Test template extraction |

---

## Field Extraction & Validation

### Field Types

| Type | Description | Validation |
|------|-------------|------------|
| `text` | Text field | Regex pattern |
| `number` | Numeric field | Min/max, format |
| `date` | Date field | Date format |
| `email` | Email field | Email format |
| `phone` | Phone number | Phone format |
| `currency` | Currency amount | Currency format |
| `address` | Address field | Address format |
| `select` | Selection field | Allowed values |

### Validation Rules

```json
{
  "field": "totalAmount",
  "type": "currency",
  "validation": {
    "required": true,
    "min": 0,
    "max": 1000000,
    "format": "USD",
    "decimalPlaces": 2
  }
}
```

### Validation Results

```json
{
  "field": "totalAmount",
  "value": "1,234.56",
  "valid": true,
  "confidence": 0.98,
  "normalizedValue": 1234.56
}
```

---

## Confidence Scoring

### Confidence Levels

| Score | Level | Description |
|-------|-------|-------------|
| 0.95-1.00 | High | Very reliable |
| 0.85-0.94 | Medium | Generally reliable |
| 0.70-0.84 | Low | Needs review |
| 0.00-0.69 | Poor | Manual verification required |

### Confidence Calculation

```typescript
function calculateConfidence(recognition: RecognitionResult): number {
  const charConfidence = recognition.characters.reduce(
    (sum, char) => sum + char.confidence, 0
  ) / recognition.characters.length;
  
  const layoutConfidence = recognition.layout.score;
  const languageConfidence = recognition.language.confidence;
  
  return (charConfidence * 0.6) + (layoutConfidence * 0.2) + (languageConfidence * 0.2);
}
```

### Confidence Thresholds

| Threshold | Action |
|-----------|--------|
| ≥ 0.95 | Auto-accept |
| ≥ 0.85 | Accept with flag |
| ≥ 0.70 | Require review |
| < 0.70 | Require manual entry |

---

## Error Correction

### Correction Methods

| Method | Description |
|--------|-------------|
| Spell Check | Dictionary-based correction |
| Context Analysis | Context-aware correction |
| Pattern Matching | Pattern-based correction |
| Language Model | Statistical correction |
| Custom Rules | User-defined rules |

### Correction Pipeline

```
Raw OCR Text
  → Spell Checking
    → Context Analysis
      → Pattern Matching
        → Language Model
          → Custom Rules
            → Corrected Text
```

### Correction Configuration

```json
{
  "enabled": true,
  "methods": {
    "spellCheck": true,
    "contextAnalysis": true,
    "patternMatching": true,
    "languageModel": true,
    "customRules": true
  },
  "customRules": [
    {
      "pattern": "sc00l",
      "replacement": "school"
    },
    {
      "pattern": "EduCl",
      "replacement": "EduCI"
    }
  ]
}
```

---

## Batch Processing

### Batch Configuration

```json
{
  "documents": ["doc_001", "doc_002", "doc_003"],
  "language": "eng",
  "template": "invoice_template",
  "options": {
    "enhanceContrast": true,
    "deskew": true,
    "removeNoise": true,
    "confidenceThreshold": 0.7
  }
}
```

### Batch Status

```json
{
  "batchId": "batch_001",
  "total": 3,
  "completed": 2,
  "processing": 1,
  "failed": 0,
  "status": "PROCESSING",
  "documents": [
    {
      "documentId": "doc_001",
      "status": "COMPLETED",
      "confidence": 0.95
    },
    {
      "documentId": "doc_002",
      "status": "COMPLETED",
      "confidence": 0.88
    },
    {
      "documentId": "doc_003",
      "status": "PROCESSING",
      "progress": 65
    }
  ]
}
```

### Batch Operations

| Operation | Description |
|-----------|-------------|
| Start | Start batch processing |
| Pause | Pause batch processing |
| Resume | Resume batch processing |
| Cancel | Cancel batch processing |
| Status | Get batch status |
| Results | Get batch results |

---

## Integration with Forms

### Form Field Extraction

| Feature | Description |
|---------|-------------|
| Auto-detect Fields | Detect form fields automatically |
| Field Mapping | Map extracted fields to form |
| Validation | Validate extracted data |
| Pre-fill | Pre-fill form fields |

### Form Integration Flow

```
Document OCR
  → Field Extraction
    → Field Mapping
      → Validation
        → Form Pre-fill
          → User Review
            → Form Submission
```

### Form Field Configuration

```json
{
  "formId": "form_001",
  "mappings": [
    {
      "ocrField": "invoiceNumber",
      "formField": "invoice_number",
      "required": true
    },
    {
      "ocrField": "totalAmount",
      "formField": "amount",
      "required": true,
      "transform": "currency"
    }
  ]
}
```

---

## API Reference

### Extract Text

```
POST /api/documents/ocr/extract
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "language": "eng",
  "options": {
    "enhanceContrast": true,
    "deskew": true,
    "removeNoise": true
  }
}
```

**Response:**
```json
{
  "text": "Extracted text content...",
  "confidence": 0.95,
  "language": "eng",
  "pages": 1,
  "processingTime": 2500
}
```

### Extract Fields

```
POST /api/documents/ocr/fields
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "templateId": "invoice_template",
  "fields": ["invoiceNumber", "totalAmount", "date"]
}
```

**Response:**
```json
{
  "fields": {
    "invoiceNumber": {
      "value": "INV-2026-001",
      "confidence": 0.98,
      "valid": true
    },
    "totalAmount": {
      "value": "1,234.56",
      "confidence": 0.95,
      "valid": true,
      "normalizedValue": 1234.56
    },
    "date": {
      "value": "01/15/2026",
      "confidence": 0.92,
      "valid": true,
      "normalizedValue": "2026-01-15"
    }
  }
}
```

### Validate OCR

```
POST /api/documents/ocr/validate
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "corrections": {
    "invoiceNumber": "INV-2026-002"
  }
}
```

### Correct OCR

```
POST /api/documents/ocr/correct
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "method": "auto",
  "options": {
    "spellCheck": true,
    "contextAnalysis": true
  }
}
```

### Batch OCR

```
POST /api/documents/ocr/batch
```

**Request Body:**
```json
{
  "documentIds": ["doc_001", "doc_002", "doc_003"],
  "language": "eng",
  "template": "invoice_template"
}
```

### Template OCR

```
POST /api/documents/ocr/template
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "templateId": "invoice_template"
}
```

### Get OCR Status

```
GET /api/documents/ocr/[id]/status
```

**Response:**
```json
{
  "id": "ocr_001",
  "documentId": "doc_123",
  "status": "COMPLETED",
  "progress": 100,
  "confidence": 0.94,
  "processingTime": 3200,
  "createdAt": "2026-01-15T10:30:00Z",
  "completedAt": "2026-01-15T10:30:03"
}
```

### Get Supported Languages

```
GET /api/documents/ocr/languages
```

**Response:**
```json
{
  "languages": [
    { "code": "eng", "name": "English", "accuracy": 0.98 },
    { "code": "fra", "name": "French", "accuracy": 0.96 },
    { "code": "deu", "name": "German", "accuracy": 0.97 }
  ]
}
```

---

## Configuration

### OCR Settings

```typescript
ocr: {
  provider: 'tesseract',
  languages: ['eng', 'fra', 'deu', 'spa', 'ita', 'por'],
  confidenceThreshold: 0.7,
  maxFileSize: 52428800, // 50MB
  preprocessing: {
    enhanceContrast: true,
    deskew: true,
    removeNoise: true,
    binarize: true
  },
  postprocessing: {
    spellCheck: true,
    contextAnalysis: true,
    patternMatching: true
  },
  batch: {
    maxDocuments: 100,
    maxConcurrent: 5,
    timeoutSeconds: 300
  }
}
```

### Performance Metrics

| Metric | Target |
|--------|--------|
| Single page OCR | < 5 seconds |
| Multi-page OCR | < 30 seconds |
| Batch processing | < 5 minutes per 100 pages |
| Field extraction | < 2 seconds |
| Confidence scoring | < 1 second |

---

## Error Handling

| Error | Code | Description |
|-------|------|-------------|
| `UNSUPPORTED_FORMAT` | 400 | Document format not supported |
| `FILE_TOO_LARGE` | 400 | File exceeds size limit |
| `LANGUAGE_NOT_SUPPORTED` | 400 | Language not supported |
| `TEMPLATE_NOT_FOUND` | 404 | Template not found |
| `PROCESSING_FAILED` | 500 | OCR processing error |
| `LOW_CONFIDENCE` | 200 | Low confidence warning |
| `TIMEOUT` | 408 | Processing timeout |

---

## Best Practices

### Image Quality

1. **Resolution** — Use 300 DPI minimum
2. **Contrast** — Ensure good contrast
3. **Orientation** — Correct page orientation
4. **Noise** — Remove background noise
5. **Clarity** — Avoid blurry images

### Template Design

1. **Clear Labels** — Use clear field labels
2. **Consistent Format** — Consistent document format
3. **Test Templates** — Test with sample documents
4. **Version Control** — Version template changes
5. **Documentation** — Document template fields

### Batch Processing

1. **Chunk Large Batches** — Process in smaller chunks
2. **Monitor Progress** — Track processing status
3. **Handle Failures** — Implement retry logic
4. **Resource Limits** — Respect resource limits
5. **Timeout Handling** — Set appropriate timeouts
