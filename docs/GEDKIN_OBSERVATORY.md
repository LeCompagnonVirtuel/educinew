# GEDKIN Observatory Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Global Education Observatory (Module 5) tracks education indicators, benchmarks, SDG alignment, and provides dashboards for institutional and cross-country comparison.

---

## Data Model

### GedkinObservatoryIndicator

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Indicator name (1-200 chars) |
| `category` | enum | Indicator category |
| `value` | number | Indicator value |
| `unit` | string | Measurement unit |
| `frequency` | enum | DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUAL |
| `country` | string | Country name |
| `region` | string | Geographic region |
| `period` | string | Measurement period |
| `source` | string | Data source |
| `methodology` | string | Collection methodology |
| `confidence` | number | 0-1 confidence level |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinObservatoryDashboard

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Dashboard name (1-200 chars) |
| `type` | string | Dashboard type |
| `indicators` | string[] | Indicator IDs |
| `filters` | JSONB | Dashboard filters |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinBenchmark

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Benchmark name (1-200 chars) |
| `description` | string | Benchmark description (max 2000) |
| `indicators` | string[] | Indicator IDs |
| `benchmarks` | JSONB | Target values per indicator |
| `period` | string | Benchmark period |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinSDGAlignment

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `sdgNumber` | integer | 1-17 SDG number |
| `sdgName` | string | SDG name |
| `indicators` | string[] | Aligned indicators |
| `alignmentScore` | number | 0-1 alignment score |
| `period` | string | Measurement period |
| `createdAt` | ISO 8601 | Creation timestamp |

---

## Indicator Categories

| Category | Description | Example Indicators |
|----------|-------------|-------------------|
| `ENROLLMENT` | Student enrollment | Gross enrollment ratio, Net enrollment ratio |
| `LITERACY` | Literacy rates | Youth literacy, Adult literacy |
| `GRADUATION` | Completion rates | Primary completion, Secondary completion |
| `DROPOUT` | Dropout metrics | Primary dropout, Secondary dropout |
| `ATTENDANCE` | Attendance rates | Daily attendance, Chronic absenteeism |
| `TEACHER_RATIO` | Teacher staffing | Pupil-teacher ratio, Qualified teacher ratio |
| `SPENDING` | Education finance | Per-student spending, Government expenditure |
| `INFRASTRUCTURE` | Physical resources | Classroom ratio, Toilet ratio |
| `DIGITAL_ACCESS` | Technology access | Computer ratio, Internet access |
| `LEARNING_OUTCOMES` | Achievement | PISA scores, National exam results |
| `GENDER_PARITY` | Gender equality | GPI enrollment, GPI completion |
| `INCLUSION` | Inclusion metrics | Special needs enrollment, Gender parity |
| `EMPLOYMENT` | Graduate outcomes | Employment rate, Underemployment |
| `SKILLS` | Skills development | TVET enrollment, Skills proficiency |
| `MOBILITY` | Student mobility | International students, Migration rate |

---

## SDG Alignment

### Education-Related SDGs

| SDG | Name | Key Indicators |
|-----|------|----------------|
| 1 | No Poverty | School access for poor |
| 3 | Good Health | School health programs |
| 4 | Quality Education | All education indicators |
| 5 | Gender Equality | Gender parity metrics |
| 8 | Decent Work | Graduate employment |
| 10 | Reduced Inequalities | Access equity metrics |
| 17 | Partnerships | International cooperation |

---

## Benchmark Comparison

### Comparison Levels

| Level | Description |
|-------|-------------|
| `SCHOOL` | Internal school benchmark |
| `REGIONAL` | Regional comparison |
| `NATIONAL` | National comparison |
| `INTERNATIONAL` | Global comparison |

---

## Configuration

```typescript
export const gedkinObservatoryConfig = {
  enabled: true,
  indicatorCategories: [
    'ENROLLMENT', 'LITERACY', 'GRADUATION', 'DROPOUT', 'ATTENDANCE',
    'TEACHER_RATIO', 'SPENDING', 'INFRASTRUCTURE', 'DIGITAL_ACCESS',
    'LEARNING_OUTCOMES', 'GENDER_PARITY', 'INCLUSION', 'EMPLOYMENT',
    'SKILLS', 'MOBILITY'
  ],
  defaultFrequency: 'ANNUAL',
  benchmarkingEnabled: true,
  sdgAlignmentEnabled: true,
  rankingEnabled: true,
  historicalDataRetentionYears: 10,
  crossCountryComparisonEnabled: true,
};
```

---

## Dashboard Types

| Type | Description |
|------|-------------|
| `OVERVIEW` | High-level summary |
| `COMPARISON` | Benchmark comparison |
| `TREND` | Time series analysis |
| `GEOGRAPHIC` | Map-based visualization |
| `SDG` | SDG alignment view |
| `CUSTOM` | User-defined dashboard |

---

## Data Quality Requirements

| Requirement | Threshold |
|-------------|-----------|
| Source attribution | Required |
| Methodology documentation | Required |
| Confidence level | ≥ 0.7 for publication |
| Update frequency | Per indicator specification |
| Historical data | Minimum 5 years |

---

## Zod Validation Schemas

### Create Indicator

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  category: z.nativeEnum(GedkinIndicatorCategory),
  value: z.number(),
  unit: z.string().min(1),
  frequency: z.nativeEnum(GedkinIndicatorFrequency),
  country: z.string().min(1),
  region: z.string().min(1),
  period: z.string().min(1),
  source: z.string().min(1),
  methodology: z.string().min(1),
  confidence: z.number().min(0).max(1),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinIndicatorNotFoundError` | GEDKIN_INDICATOR_NOT_FOUND | 404 |
| `GedkinIndicatorError` | GEDKIN_INDICATOR | 500 |
| `GedkinDashboardNotFoundError` | GEDKIN_DASHBOARD_NOT_FOUND | 404 |
| `GedkinDashboardError` | GEDKIN_DASHBOARD | 500 |
| `GedkinBenchmarkNotFoundError` | GEDKIN_BENCHMARK_NOT_FOUND | 404 |
| `GedkinBenchmarkError` | GEDKIN_BENCHMARK | 500 |
| `GedkinSDGAlignmentError` | GEDKIN_SDG_ALIGNMENT | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_FORECASTING.md](GEDKIN_FORECASTING.md)
- [GEDKIN_POLICY.md](GEDKIN_POLICY.md)
