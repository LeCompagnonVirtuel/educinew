# GEDKIN Intelligence Copilot Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Intelligence Copilot (Module 12) provides a natural language interface for querying all GEDKIN modules, generating SQL, charts, tables, reports, and knowledge graph traversals with full citation and provenance tracking.

---

## Data Model

### GedkinCopilotQuery

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `userId` | UUID | Querying user |
| `query` | string | Natural language query (1-5000 chars) |
| `queryType` | enum | Query strategy |
| `language` | enum | Query language |
| `status` | enum | PROCESSING, COMPLETED, FAILED |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinCopilotResponse

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `queryId` | UUID | Parent query |
| `answer` | string | Generated answer |
| `responseTypes` | enum[] | Response formats |
| `sources` | GedkinCopilotSource[] | Data sources |
| `citations` | string[] | Citation references |
| `confidence` | number | 0-1 confidence |
| `provenance` | JSONB | Data lineage |
| `processingTime` | integer | Response time (ms) |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinCopilotConversation

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `userId` | UUID | Conversation owner |
| `queries` | string[] | Query IDs |
| `title` | string | Conversation title (1-200 chars) |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinCopilotSource

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `type` | string | Source type |
| `entityId` | UUID | Source entity |
| `entityName` | string | Entity name |
| `relevance` | number | 0-1 relevance score |
| `excerpt` | string | Source excerpt (max 5000) |
| `url` | string | Source URL |

### GedkinCopilotApproval

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `queryId` | UUID | Query reference |
| `responseId` | UUID | Response reference |
| `approvedBy` | UUID | Approving user |
| `status` | string | Approval status |
| `reason` | string | Approval reason (max 2000) |
| `timestamp` | ISO 8601 | Approval timestamp |

---

## Query Types

| Type | Description | Example |
|------|-------------|---------|
| `NATURAL_LANGUAGE` | Free text query | "Show me dropout trends" |
| `SQL` | Direct SQL query | SELECT count(*) FROM students |
| `KNOWLEDGE_GRAPH` | Graph traversal | "Find prerequisites for Algebra" |
| `SEMANTIC` | Vector search | "Resources about fractions" |
| `FORECAST` | Prediction query | "Enrollment next year" |
| `SIMULATION` | Scenario query | "Impact of policy change" |

---

## Response Types

| Type | Description |
|------|-------------|
| `TEXT` | Natural language answer |
| `CHART` | Data visualization |
| `TABLE` | Structured data table |
| `REPORT` | Formatted report |
| `GRAPH` | Knowledge graph visualization |
| `CODE` | Generated code snippet |

---

## SQL Generation

### Safety Rules

| Rule | Implementation |
|------|---------------|
| Read-only | No INSERT, UPDATE, DELETE |
| Tenant filtering | Automatic `school_id` WHERE |
| Rate limiting | Max 10 queries/minute |
| Injection protection | Parameterized queries only |
| Validation | Zod schema validation |

### Example

```
User: "How many students are in grade 10?"

Generated SQL:
SELECT COUNT(*) as student_count
FROM students
WHERE grade = '10'
  AND school_id = $1
  AND deleted_at IS NULL
```

---

## Citation System

### Citation Sources

| Source | Description |
|--------|-------------|
| `DATABASE` | Direct database query |
| `KNOWLEDGE_GRAPH` | Graph traversal result |
| `SEMANTIC_SEARCH` | Vector search result |
| `FORECAST` | Prediction output |
| `SIMULATION` | Simulation result |
| `EXTERNAL` | External data source |

### Citation Format

```json
{
  "source": "students table",
  "query": "SELECT COUNT(*) FROM students WHERE grade = '10'",
  "timestamp": "2026-08-09T10:00:00Z",
  "row_count": 1
}
```

---

## Provenance Tracking

### Data Lineage

```
User Query
  → Copilot Interpretation
    → Data Source Identification
      → Query Execution
        → Result Aggregation
          → Response Generation
            → Citation Assembly
```

### Provenance Fields

| Field | Description |
|-------|-------------|
| `sources` | Data sources used |
| `transforms` | Data transformations applied |
| `calculations` | Aggregations performed |
| `filters` | Filters applied |
| `limits` | Row limits enforced |

---

## Conversation Management

### Conversation Flow

1. **Start** — User initiates conversation
2. **Query** — User submits question
3. **Process** — Copilot interprets and executes
4. **Respond** — Answer with citations
5. **Follow-up** — User asks follow-up questions
6. **End** — User closes conversation

### Context Preservation

- Previous queries retained
- Reference resolution across turns
- Incremental refinement
- History browsing

---

## Approval Workflow

### When Approval Required

| Condition | Requirement |
|-----------|-------------|
| Confidence < 0.80 | Mandatory approval |
| Critical data access | Mandatory approval |
| Policy recommendation | Mandatory approval |
| Financial data | Mandatory approval |

### Approval Process

```
Copilot Response → Pending Approval → Human Review → Approve/Reject
```

---

## Configuration

```typescript
export const gedkinCopilotConfig = {
  enabled: true,
  maxQueriesPerUser: 100,
  maxConversationLength: 50,
  sqlGenerationEnabled: true,
  sqlReadOnlyByDefault: true,
  sqlValidationRequired: true,
  sqlInjectionProtection: true,
  chartGenerationEnabled: true,
  tableGenerationEnabled: true,
  reportGenerationEnabled: true,
  citationRequired: true,
  confidenceScoreRequired: true,
  humanApprovalForCritical: true,
  conversationRetentionDays: 90,
  supportedLanguages: ['fr', 'en', 'es', 'ar', 'pt'],
};
```

---

## Zod Validation Schemas

### Create Copilot Query

```typescript
z.object({
  schoolId: z.string().uuid(),
  userId: z.string().uuid(),
  query: z.string().min(1).max(5000),
  queryType: z.nativeEnum(GedkinCopilotQueryType),
  language: z.nativeEnum(GedkinSemanticLanguage),
  status: z.nativeEnum(GedkinCopilotStatus),
})
```

### Create Copilot Response

```typescript
z.object({
  schoolId: z.string().uuid(),
  queryId: z.string().uuid(),
  answer: z.string().min(1),
  responseTypes: z.array(z.nativeEnum(GedkinCopilotResponseType)),
  sources: z.array(z.string()),
  citations: z.array(z.string()),
  confidence: z.number().min(0).max(1),
  provenance: z.record(z.unknown()),
  processingTime: z.number().int().nonneg(),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinCopilotQueryError` | GEDKIN_COPILOT_QUERY | 500 |
| `GedkinCopilotResponseError` | GEDKIN_COPILOT_RESPONSE | 500 |
| `GedkinCopilotApprovalError` | GEDKIN_COPILOT_APPROVAL | 500 |
| `GedkinCopilotSourceError` | GEDKIN_COPILOT_SOURCE | 500 |
| `GedkinCopilotConversationError` | GEDKIN_COPILOT_CONVERSATION | 500 |
| `GedkinSQLInjectionBlockedError` | GEDKIN_SQL_INJECTION_BLOCKED | 403 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_AGENTS.md](GEDKIN_AGENTS.md)
- [GEDKIN_API.md](GEDKIN_API.md)
