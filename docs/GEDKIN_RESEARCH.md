# GEDKIN Research Intelligence Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

Research Intelligence (Module 4) manages research projects, publications, researcher profiles, citation networks, and trend analysis across educational institutions.

---

## Data Model

### GedkinResearchProject

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `title` | string | Project title (1-500 chars) |
| `description` | string | Project description (max 5000) |
| `status` | enum | ACTIVE, COMPLETED, SUSPENDED, CANCELLED |
| `principalInvestigator` | string | PI name |
| `coInvestigators` | string[] | Co-PI names |
| `startDate` | ISO 8601 | Start date |
| `endDate` | ISO 8601 | End date |
| `funding` | number | Funding amount |
| `keywords` | string[] | Research keywords |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinPublication

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `projectId` | UUID | Parent project |
| `title` | string | Publication title (1-500 chars) |
| `authors` | string[] | Author names |
| `journal` | string | Journal name (1-300 chars) |
| `year` | integer | Publication year (1900-2100) |
| `doi` | string | Digital Object Identifier |
| `citations` | integer | Citation count |
| `status` | enum | DRAFT, SUBMITTED, UNDER_REVIEW, ACCEPTED, PUBLISHED, REJECTED |
| `abstract` | string | Abstract (max 5000) |
| `keywords` | string[] | Publication keywords |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinResearcherProfile

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `userId` | UUID | User reference |
| `name` | string | Researcher name (1-200 chars) |
| `institution` | string | Institution (1-300 chars) |
| `researchAreas` | string[] | Research focus areas |
| `publications` | string[] | Publication IDs |
| `hIndex` | integer | H-index score |
| `citations` | integer | Total citations |
| `orcidId` | string | ORCID identifier |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinCitation

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `publicationId` | UUID | Cited publication |
| `citedByPublicationId` | UUID | Citing publication |
| `context` | string | Citation context (max 2000) |
| `timestamp` | ISO 8601 | Citation timestamp |

### GedkinResearchTrend

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `topic` | string | Trend topic (1-200 chars) |
| `trendScore` | number | 0-1 popularity score |
| `growthRate` | number | Growth rate percentage |
| `topInstitutions` | string[] | Leading institutions |
| `topCountries` | string[] | Leading countries |
| `period` | string | Measurement period |
| `createdAt` | ISO 8601 | Creation timestamp |

---

## Project Statuses

| Status | Description |
|--------|-------------|
| `ACTIVE` | Currently funded and ongoing |
| `COMPLETED` | Research finished |
| `SUSPENDED` | Temporarily paused |
| `CANCELLED` | Terminated before completion |

---

## Publication Statuses

| Status | Description |
|--------|-------------|
| `DRAFT` | Being written |
| `SUBMITTED` | Submitted to journal |
| `UNDER_REVIEW` | Peer review in progress |
| `ACCEPTED` | Accepted for publication |
| `PUBLISHED` | Published and available |
| `REJECTED` | Rejected by reviewers |

---

## Citation Network Analysis

### Metrics

| Metric | Formula | Description |
|--------|---------|-------------|
| H-Index | max h where h papers have ≥ h citations | Researcher impact |
| i10-Index | Count of papers with ≥ 10 citations | Highly cited works |
| Citation Velocity | Citations per year | Impact momentum |
| Collaboration Score | Co-authorship network density | Collaboration strength |

### Network Visualization

```
Publication A ←── Citation ── Publication B
      ↑                              ↑
      │                              │
   Citation                      Citation
      │                              │
      ↓                              ↓
Publication C ── Citation ──→ Publication D
```

---

## Trend Analysis

### Algorithm

1. Aggregate publication keywords by time period
2. Compute frequency and growth rate
3. Identify emerging topics (growth > 20% YoY)
4. Identify declining topics (growth < -10% YoY)
5. Rank by trend score

### Trend Categories

| Category | Growth Rate | Description |
|----------|------------|-------------|
| Emerging | > 50% | Rapidly growing |
| Growing | 20-50% | Steady increase |
| Stable | -20% to 20% | Consistent interest |
| Declining | -50% to -20% | Decreasing interest |
| Obsolete | < -50% | Outdated topic |

---

## Configuration

```typescript
export const gedkinResearchConfig = {
  enabled: true,
  maxProjectsPerSchool: 200,
  maxPublicationsPerProject: 50,
  citationTrackingEnabled: true,
  trendAnalysisEnabled: true,
  collaborationNetworkEnabled: true,
  impactCalculationEnabled: true,
  openAccessPriority: true,
};
```

---

## Zod Validation Schemas

### Create Research Project

```typescript
z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(500),
  description: z.string().max(5000),
  status: z.nativeEnum(GedkinResearchStatus),
  principalInvestigator: z.string().min(1),
  coInvestigators: z.array(z.string()),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  funding: z.number().nonneg(),
  keywords: z.array(z.string()),
})
```

### Create Publication

```typescript
z.object({
  schoolId: z.string().uuid(),
  projectId: z.string().uuid(),
  title: z.string().min(1).max(500),
  authors: z.array(z.string()),
  journal: z.string().min(1).max(300),
  year: z.number().int().min(1900).max(2100),
  doi: z.string().min(1),
  citations: z.number().int().nonneg(),
  status: z.nativeEnum(GedkinPublicationStatus),
  abstract: z.string().max(5000),
  keywords: z.array(z.string()),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinResearchProjectNotFoundError` | GEDKIN_RESEARCH_PROJECT_NOT_FOUND | 404 |
| `GedkinResearchProjectError` | GEDKIN_RESEARCH_PROJECT | 500 |
| `GedkinPublicationNotFoundError` | GEDKIN_PUBLICATION_NOT_FOUND | 404 |
| `GedkinPublicationError` | GEDKIN_PUBLICATION | 500 |
| `GedkinResearcherNotFoundError` | GEDKIN_RESEARCHER_NOT_FOUND | 404 |
| `GedkinResearcherError` | GEDKIN_RESEARCHER | 500 |
| `GedkinCitationError` | GEDKIN_CITATION | 500 |
| `GedkinResearchTrendError` | GEDKIN_RESEARCH_TREND | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_OBSERVATORY.md](GEDKIN_OBSERVATORY.md)
- [GEDKIN_KNOWLEDGE_GRAPH.md](GEDKIN_KNOWLEDGE_GRAPH.md)
