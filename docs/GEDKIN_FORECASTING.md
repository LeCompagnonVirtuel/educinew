# GEDKIN Forecasting Engine Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Global Forecasting Engine (Module 7) provides predictive analytics for enrollment, dropout, graduation, teacher demand, infrastructure, financial, workforce, skills, mobility, and population forecasting.

---

## Data Model

### GedkinForecast

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Forecast name (1-200 chars) |
| `type` | enum | Forecast category |
| `model` | enum | ML model type |
| `status` | enum | PENDING, RUNNING, COMPLETED, FAILED |
| `parameters` | JSONB | Model parameters |
| `predictions` | GedkinForecastPrediction[] | Prediction results |
| `confidence` | number | 0-1 confidence level |
| `period` | string | Forecast period |
| `createdAt` | ISO 8601 | Creation timestamp |
| `completedAt` | ISO 8601 | Completion timestamp |

### GedkinForecastModel

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Model name (1-200 chars) |
| `type` | enum | Model architecture |
| `version` | string | Model version |
| `accuracy` | number | 0-1 accuracy score |
| `trainingData` | JSONB | Training data config |
| `hyperparameters` | JSONB | Model hyperparameters |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinForecastPrediction

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `forecastId` | UUID | Parent forecast |
| `date` | ISO 8601 | Prediction date |
| `value` | number | Predicted value |
| `lowerBound` | number | Lower confidence bound |
| `upperBound` | number | Upper confidence bound |
| `confidence` | number | 0-1 prediction confidence |

### GedkinCapacityForecast

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `resourceType` | string | Resource category |
| `currentCapacity` | number | Current capacity |
| `predictedDemand` | number | Predicted demand |
| `gap` | number | Demand - capacity |
| `period` | string | Forecast period |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinDriftDetection

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `forecastId` | UUID | Parent forecast |
| `metric` | string | Drift metric name |
| `driftScore` | number | 0-1 drift magnitude |
| `severity` | string | LOW, MEDIUM, HIGH, CRITICAL |
| `detectedAt` | ISO 8601 | Detection timestamp |
| `acknowledged` | boolean | Human acknowledgment |

---

## Forecast Types

| Type | Description | Horizon |
|------|-------------|---------|
| `ENROLLMENT` | Student enrollment | 1-5 years |
| `DROPOUT` | Dropout rates | 1-3 years |
| `GRADUATION` | Graduation rates | 1-5 years |
| `TEACHER_DEMAND` | Teacher hiring needs | 1-3 years |
| `INFRASTRUCTURE` | Facility requirements | 2-10 years |
| `FINANCIAL` | Revenue and costs | 1-5 years |
| `WORKFORCE` | Staffing needs | 1-3 years |
| `SKILLS` | Skills demand | 2-5 years |
| `MOBILITY` | Student mobility | 1-3 years |
| `POPULATION` | Population growth | 1-10 years |

---

## Model Types

| Model | Description | Use Case |
|-------|-------------|----------|
| `LINEAR_REGRESSION` | Linear trend | Short-term, stable trends |
| `ARIMA` | Time series | Seasonal patterns |
| `PROPHET` | Facebook Prophet | Holidays, trends |
| `LSTM` | Neural network | Complex patterns |
| `ENSEMBLE` | Multiple models | Default, highest accuracy |
| `TRANSFORMER` | Attention-based | Long sequences |

---

## Model Selection Guide

| Data Size | Seasonality | Complexity | Recommended Model |
|-----------|------------|------------|-------------------|
| Small | Low | Low | LINEAR_REGRESSION |
| Small | High | Medium | ARIMA |
| Medium | High | Medium | PROPHET |
| Large | High | High | LSTM |
| Large | Variable | High | TRANSFORMER |
| Any | Variable | Any | ENSEMBLE (default) |

---

## Drift Detection

### Types

| Drift Type | Description | Response |
|------------|-------------|----------|
| `DATA_DRIFT` | Input distribution shift | Retrain model |
| `CONCEPT_DRIFT` | Target relationship change | Update model |
| `MODEL_DRIFT` | Performance degradation | Replace model |
| `SEASONALITY_DRIFT` | Seasonal pattern change | Adjust parameters |

### Severity Levels

| Level | Drift Score | Action |
|-------|------------|--------|
| LOW | 0.0 - 0.2 | Monitor |
| MEDIUM | 0.2 - 0.5 | Review recommended |
| HIGH | 0.5 - 0.8 | Retrain model |
| CRITICAL | 0.8 - 1.0 | Immediate replacement |

---

## Capacity Planning

### Gap Analysis

```
Gap = Predicted Demand - Current Capacity

Positive Gap → Expansion needed
Negative Gap → Surplus available
Zero Gap → Optimal capacity
```

### Planning Horizons

| Horizon | Planning Action |
|---------|----------------|
| < 6 months | Operational adjustments |
| 6-12 months | Tactical hiring/acquisition |
| 1-3 years | Strategic investment |
| 3-10 years | Infrastructure development |

---

## Configuration

```typescript
export const gedkinForecastConfig = {
  enabled: true,
  supportedModels: ['LINEAR_REGRESSION', 'ARIMA', 'PROPHET', 'LSTM', 'ENSEMBLE', 'TRANSFORMER'],
  defaultModel: 'ENSEMBLE',
  maxForecastsPerSchool: 100,
  maxHorizonDays: 365,
  confidenceLevel: 0.95,
  driftDetectionEnabled: true,
  modelRegistryEnabled: true,
  explainabilityRequired: true,
  predictionDisclaimerEstimate: true,
};
```

---

## Zod Validation Schemas

### Create Forecast

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.nativeEnum(GedkinForecastType),
  model: z.nativeEnum(GedkinForecastModel),
  status: z.nativeEnum(GedkinForecastStatus),
  parameters: z.record(z.unknown()),
  predictions: z.array(z.string()),
  confidence: z.number().min(0).max(1),
  period: z.string().min(1),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinForecastNotFoundError` | GEDKIN_FORECAST_NOT_FOUND | 404 |
| `GedkinForecastError` | GEDKIN_FORECAST | 500 |
| `GedkinForecastFailedError` | GEDKIN_FORECAST_FAILED | 500 |
| `GedkinForecastModelError` | GEDKIN_FORECAST_MODEL | 500 |
| `GedkinDriftDetectedError` | GEDKIN_DRIFT_DETECTED | 400 |
| `GedkinCapacityForecastError` | GEDKIN_CAPACITY_FORECAST | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_SIMULATION.md](GEDKIN_SIMULATION.md)
- [GEDKIN_OBSERVATORY.md](GEDKIN_OBSERVATORY.md)
