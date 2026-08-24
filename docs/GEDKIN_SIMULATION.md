# GEDKIN Simulation Engine Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Simulation & Scenario Engine (Module 11) provides Monte Carlo simulations, scenario modeling, sensitivity analysis, and what-if exploration for educational policy and planning.

---

## Data Model

### GedkinSimulation

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Simulation name (1-200 chars) |
| `description` | string | Simulation description (max 5000) |
| `type` | enum | Simulation category |
| `status` | enum | PENDING, RUNNING, COMPLETED, FAILED |
| `parameters` | JSONB | Simulation parameters |
| `startedAt` | ISO 8601 | Start timestamp |
| `completedAt` | ISO 8601 | Completion timestamp |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinScenario

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `simulationId` | UUID | Parent simulation |
| `name` | string | Scenario name (1-200 chars) |
| `type` | enum | Scenario variant |
| `description` | string | Scenario description (max 5000) |
| `assumptions` | JSONB | Scenario assumptions |
| `parameters` | JSONB | Scenario parameters |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinScenarioRun

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `scenarioId` | UUID | Parent scenario |
| `status` | enum | Execution status |
| `results` | JSONB | Run results |
| `duration` | integer | Execution time (ms) |
| `startedAt` | ISO 8601 | Start timestamp |
| `completedAt` | ISO 8601 | Completion timestamp |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinSimulationResult

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `runId` | UUID | Parent run |
| `dimension` | string | Result dimension |
| `baselineValue` | number | Baseline value |
| `scenarioValue` | number | Scenario value |
| `impact` | number | Impact magnitude |
| `confidence` | number | 0-1 confidence |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinSensitivityAnalysis

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `simulationId` | UUID | Parent simulation |
| `parameter` | string | Parameter name |
| `range` | JSONB | Parameter range |
| `impact` | JSONB | Impact values |
| `sensitivity` | number | Sensitivity score |
| `createdAt` | ISO 8601 | Creation timestamp |

---

## Simulation Types

| Type | Description | Parameters |
|------|-------------|------------|
| `POPULATION` | Demographics | Growth rate, migration |
| `SCHOOLS` | School capacity | Classrooms, teachers |
| `STUDENTS` | Student flow | Enrollment, retention |
| `TEACHERS` | Workforce | Hiring, retirement |
| `FINANCE` | Budget model | Revenue, costs |
| `INFRASTRUCTURE` | Facilities | Construction, maintenance |
| `TECHNOLOGY` | Digital tools | Adoption, replacement |
| `CLIMATE` | Environmental | Weather, disasters |
| `MIGRATION` | Movement | Internal, international |
| `EMPLOYMENT` | Labor market | Supply, demand |
| `SKILLS` | Competencies | Training, obsolescence |
| `POLICY` | Policy impact | Rule changes |
| `MONTE_CARLO` | Stochastic | Random variables |

---

## Scenario Types

| Type | Description |
|------|-------------|
| `BASELINE` | Current trends continue |
| `OPTIMISTIC` | Best-case assumptions |
| `PESSIMISTIC` | Worst-case assumptions |
| `CUSTOM` | User-defined assumptions |

---

## Monte Carlo Simulation

### Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| Runs | 1000 | Number of iterations |
| Confidence | 0.95 | Confidence interval |
| Seed | Random | Random seed |
| Distribution | Normal | Variable distribution |

### Output

```json
{
  "mean": 1250,
  "median": 1248,
  "stdDev": 45,
  "percentile5": 1175,
  "percentile95": 1325,
  "histogram": [...]
}
```

---

## Sensitivity Analysis

### Tornado Diagram

```
Parameter A    ████████████████████████  (+45%)
Parameter B    ██████████████████        (+30%)
Parameter C    ████████████████          (+25%)
Parameter D    ██████████████            (+20%)
Parameter E    ████████                  (+10%)
```

### Sensitivity Scores

| Score | Interpretation |
|-------|---------------|
| > 0.8 | Highly sensitive |
| 0.5 - 0.8 | Moderately sensitive |
| 0.2 - 0.5 | Low sensitivity |
| < 0.2 | Insensitive |

---

## Comparison Mode

### Side-by-Side Analysis

| Dimension | Baseline | Optimistic | Pessimistic |
|-----------|----------|------------|-------------|
| Enrollment | 1000 | 1200 | 800 |
| Graduation | 75% | 85% | 65% |
| Cost/student | $500 | $450 | $600 |

---

## Configuration

```typescript
export const gedkinSimulationConfig = {
  enabled: true,
  maxSimulationsPerSchool: 50,
  maxScenariosPerSimulation: 20,
  maxRunsPerScenario: 100,
  monteCarloEnabled: true,
  monteCarloDefaultRuns: 1000,
  sensitivityAnalysisEnabled: true,
  comparisonEnabled: true,
  simulationTimeoutSeconds: 600,
  resultRetentionDays: 365,
};
```

---

## Zod Validation Schemas

### Create Simulation

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(5000),
  type: z.nativeEnum(GedkinSimulationType),
  status: z.nativeEnum(GedkinSimulationStatus),
  parameters: z.record(z.unknown()),
})
```

### Create Scenario

```typescript
z.object({
  schoolId: z.string().uuid(),
  simulationId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.nativeEnum(GedkinScenarioType),
  description: z.string().max(5000),
  assumptions: z.record(z.unknown()),
  parameters: z.record(z.unknown()),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinSimulationNotFoundError` | GEDKIN_SIMULATION_NOT_FOUND | 404 |
| `GedkinSimulationError` | GEDKIN_SIMULATION | 500 |
| `GedkinSimulationFailedError` | GEDKIN_SIMULATION_FAILED | 500 |
| `GedkinScenarioNotFoundError` | GEDKIN_SCENARIO_NOT_FOUND | 404 |
| `GedkinScenarioError` | GEDKIN_SCENARIO | 500 |
| `GedkinScenarioRunError` | GEDKIN_SCENARIO_RUN | 500 |
| `GedkinSensitivityError` | GEDKIN_SENSITIVITY | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_FORECASTING.md](GEDKIN_FORECASTING.md)
- [GEDKIN_POLICY.md](GEDKIN_POLICY.md)
