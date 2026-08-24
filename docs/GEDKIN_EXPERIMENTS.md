# GEDKIN Research Lab Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Digital Research Lab (Module 9) provides experiment management, dataset versioning, model experimentation, and benchmarking capabilities for educational research.

---

## Data Model

### GedkinExperiment

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Experiment name (1-200 chars) |
| `description` | string | Experiment description (max 5000) |
| `status` | enum | PLANNING, RUNNING, COMPLETED, FAILED, CANCELLED |
| `hypothesis` | string | Research hypothesis (max 2000) |
| `methodology` | string | Methodology description (max 5000) |
| `datasetIds` | string[] | Associated datasets |
| `modelIds` | string[] | Associated models |
| `results` | JSONB | Experiment results |
| `startedAt` | ISO 8601 | Start timestamp |
| `completedAt` | ISO 8601 | Completion timestamp |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinDataset

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Dataset name (1-200 chars) |
| `description` | string | Dataset description (max 2000) |
| `type` | enum | Data format type |
| `schema` | JSONB | Schema definition |
| `size` | integer | Size in bytes |
| `rows` | integer | Row count |
| `license` | string | Usage license |
| `tags` | string[] | Discovery tags |
| `version` | string | Semantic version |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinModelExperiment

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `experimentId` | UUID | Parent experiment |
| `name` | string | Model name (1-200 chars) |
| `modelType` | string | Model architecture |
| `hyperparameters` | JSONB | Model hyperparameters |
| `metrics` | JSONB | Performance metrics |
| `artifacts` | string[] | Output artifact paths |
| `status` | string | Model status |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinBenchmark

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Benchmark name (1-200 chars) |
| `description` | string | Benchmark description (max 2000) |
| `datasetIds` | string[] | Benchmark datasets |
| `metrics` | JSONB | Target metrics |
| `baseline` | JSONB | Baseline metrics |
| `createdAt` | ISO 8601 | Creation timestamp |

---

## Experiment Statuses

| Status | Description |
|--------|-------------|
| `PLANNING` | Being designed |
| `RUNNING` | Actively executing |
| `COMPLETED` | Successfully finished |
| `FAILED` | Execution failed |
| `CANCELLED` | Stopped by user |

---

## Dataset Types

| Type | Description | Extensions |
|------|-------------|------------|
| `TABULAR` | Structured data | CSV, Parquet, JSON |
| `TEXT` | Unstructured text | TXT, PDF, DOCX |
| `IMAGE` | Visual data | PNG, JPG, DICOM |
| `AUDIO` | Sound data | WAV, MP3, FLAC |
| `VIDEO` | Motion data | MP4, AVI, MOV |
| `GRAPH` | Graph data | GEXF, GraphML |
| `EMBEDDING` | Vector data | NPY, BIN |

---

## Reproducibility

### Requirements

| Requirement | Implementation |
|-------------|---------------|
| Random Seed | Fixed seed per experiment |
| Version Control | Git-based code tracking |
| Dependency Lock | Lock file generation |
| Environment | Container-based execution |
| Data Snapshot | Immutable dataset copies |
| Model Registry | Versioned model storage |

### Reproducibility Score

```
score = (seed固定 × 0.2) + (code版本 × 0.2) + (依赖锁定 × 0.2) + (数据快照 × 0.2) + (环境容器 × 0.2)
```

---

## Model Experimentation

### Supported Model Types

| Type | Framework | Use Case |
|------|-----------|----------|
| `LINEAR` | Scikit-learn | Simple regression |
| `TREE` | XGBoost | Classification |
| `NEURAL` | PyTorch | Deep learning |
| `TRANSFORMER` | HuggingFace | NLP tasks |
| `ENSEMBLE` | Custom | Model stacking |
| `FORECAST` | Prophet | Time series |

### Hyperparameter Optimization

| Strategy | Description |
|----------|-------------|
| GRID | Exhaustive search |
| RANDOM | Random sampling |
| BAYESIAN | Gaussian process |
| HYPERBAND | Early stopping |

---

## Artifact Management

### Artifact Types

| Type | Description | Retention |
|------|-------------|-----------|
| `MODEL` | Trained model weights | 365 days |
| `METRIC` | Performance metrics | Permanent |
| `LOG` | Training logs | 90 days |
| `VISUALIZATION` | Charts and plots | 180 days |
| `REPORT` | Experiment reports | Permanent |
| `CODE` | Source code snapshot | Permanent |

---

## Configuration

```typescript
export const gedkinExperimentConfig = {
  enabled: true,
  maxExperimentsPerSchool: 50,
  maxDatasetsPerSchool: 200,
  maxModelsPerExperiment: 10,
  reproducibilityRequired: true,
  artifactRetentionDays: 365,
  benchmarkingEnabled: true,
  versionControlEnabled: true,
};
```

---

## Zod Validation Schemas

### Create Experiment

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(5000),
  status: z.nativeEnum(GedkinExperimentStatus),
  hypothesis: z.string().max(2000),
  methodology: z.string().max(5000),
  datasetIds: z.array(z.string()),
  modelIds: z.array(z.string()),
  results: z.record(z.unknown()),
})
```

### Create Dataset

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  type: z.nativeEnum(GedkinDatasetType),
  schema: z.record(z.unknown()),
  size: z.number().int().nonneg(),
  rows: z.number().int().nonneg(),
  license: z.string().min(1),
  tags: z.array(z.string()),
  version: z.string().min(1),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinExperimentNotFoundError` | GEDKIN_EXPERIMENT_NOT_FOUND | 404 |
| `GedkinExperimentError` | GEDKIN_EXPERIMENT | 500 |
| `GedkinExperimentFailedError` | GEDKIN_EXPERIMENT_FAILED | 500 |
| `GedkinDatasetNotFoundError` | GEDKIN_DATASET_NOT_FOUND | 404 |
| `GedkinDatasetError` | GEDKIN_DATASET | 500 |
| `GedkinModelExperimentError` | GEDKIN_MODEL_EXPERIMENT | 500 |
| `GedkinBenchmarkError_` | GEDKIN_BENCHMARK_LAB | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_RESEARCH.md](GEDKIN_RESEARCH.md)
- [GEDKIN_MARKETPLACE.md](GEDKIN_MARKETPLACE.md)
