# GEDKIN Knowledge Graph Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Knowledge Graph (Module 2) maps relationships between educational entities — students, teachers, schools, courses, skills, research, and policies. It enables semantic traversal, entity resolution, and graph-based intelligence across the platform.

---

## Data Model

### GedkinKnowledgeEntity

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `entityType` | enum | Entity classification |
| `name` | string | Entity name (1-200 chars) |
| `description` | string | Entity description (max 2000) |
| `properties` | JSONB | Extensible properties |
| `embeddings` | number[] | Vector embeddings |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinKnowledgeRelation

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `sourceEntityId` | UUID | Source entity |
| `targetEntityId` | UUID | Target entity |
| `relationType` | enum | Relationship type |
| `weight` | number | 0-1 relationship strength |
| `properties` | JSONB | Extensible properties |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinGraphSnapshot

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Snapshot name (1-200 chars) |
| `entityCount` | integer | Entity count at snapshot |
| `relationCount` | integer | Relation count at snapshot |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinEntityResolution

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `sourceEntityId` | UUID | Source entity |
| `targetEntityId` | UUID | Target entity |
| `confidence` | number | 0-1 resolution confidence |
| `method` | string | Resolution method |
| `resolvedAt` | ISO 8601 | Resolution timestamp |

---

## Entity Types

| Type | Description |
|------|-------------|
| `STUDENT` | Individual learner |
| `TEACHER` | Educator or staff |
| `SCHOOL` | Educational institution |
| `UNIVERSITY` | Higher education institution |
| `INSTITUTION` | Any educational institution |
| `COURSE` | Academic course |
| `SUBJECT` | Academic subject |
| `SKILL` | Learned skill |
| `COMPETENCY` | Measured competency |
| `CERTIFICATION` | Earned certification |
| `EXAM` | Examination |
| `CURRICULUM` | Curriculum framework |
| `RESEARCH` | Research project |
| `PUBLICATION` | Academic publication |
| `ORGANIZATION` | Any organization |
| `COUNTRY` | Country entity |
| `REGION` | Geographic region |
| `POLICY` | Education policy |
| `REGULATION` | Regulatory requirement |
| `FUNDING` | Funding source |
| `JOB` | Employment position |
| `INDUSTRY` | Industry sector |
| `INFRASTRUCTURE` | Physical infrastructure |
| `TECHNOLOGY` | Technology stack |

---

## Relation Types

| Type | From | To | Description |
|------|------|-----|-------------|
| `TEACHES` | Teacher | Subject/Course | Teaching relationship |
| `STUDIES` | Student | Course/Subject | Learning relationship |
| `BELONGS_TO` | Entity | Organization | Membership |
| `GRADUATES_FROM` | Student | Institution | Graduation |
| `CERTIFIED_BY` | Entity | Certification | Certification |
| `EQUIVALENT_TO` | Entity | Entity | Equivalence |
| `REQUIRES` | Concept | Concept | Prerequisite |
| `DEPENDS_ON` | Entity | Entity | Dependency |
| `RELATED_TO` | Entity | Entity | General relation |
| `WORKS_AT` | Teacher | School | Employment |
| `RESEARCHES` | Researcher | Topic | Research focus |
| `FUNDS` | Funder | Project | Funding |
| `GOVERNS` | Policy | Entity | Governance |
| `REGULATES` | Regulation | Entity | Regulation |
| `LOCATED_IN` | Entity | Region | Location |
| `PARTICIPATES_IN` | Entity | Event | Participation |
| `SPECIALIZES_IN` | Teacher | Subject | Specialization |

---

## Graph Traversal

### Parameters

```typescript
interface TraverseParams {
  startNodeId: string;
  relationTypes?: GedkinRelationtype[];
  depth: number; // Max 5
  direction: 'INCOMING' | 'OUTGOING' | 'BOTH';
  schoolId: string;
}
```

### Complexity

| Depth | Estimated Nodes | Response Time |
|-------|----------------|---------------|
| 1 | ~50 | <50ms |
| 2 | ~500 | <100ms |
| 3 | ~2,000 | <150ms |
| 4 | ~5,000 | <200ms |
| 5 | ~10,000 | <300ms |

---

## Entity Resolution

### Algorithm

1. Generate embeddings for source and target entities
2. Compute cosine similarity
3. Apply threshold (default: 0.85)
4. Match on name, type, and properties
5. Propose resolution with confidence score
6. Require human confirmation for confidence < 0.95

### Resolution Methods

| Method | Description |
|--------|-------------|
| `EMBEDDING_SIMILARITY` | Vector cosine similarity |
| `NAME_MATCH` | Fuzzy string matching |
| `PROPERTY_MATCH` | Property comparison |
| `HUMAN_CONFIRMED` | Manual resolution |

---

## Graph Snapshots

Snapshots capture the graph state at a point in time:

- Entity count
- Relation count
- Topology statistics
- Used for drift detection and historical comparison

---

## Configuration

```typescript
export const gedkinKnowledgeGraphConfig = {
  enabled: true,
  maxEntitiesPerSchool: 100000,
  maxRelationsPerSchool: 500000,
  embeddingDimensions: 1536,
  graphTraversalMaxDepth: 5,
  entityResolutionThreshold: 0.85,
  snapshotRetentionDays: 90,
  autoIndexEnabled: true,
};
```

---

## Use Cases

### 1. Learning Path Optimization

Map prerequisite concepts to recommend optimal learning sequences:

```
Algebra → Linear Equations → Systems of Equations → Matrices
```

### 2. Knowledge Gap Detection

Identify missing prerequisite knowledge when students struggle:

```
Student fails Quadratic Equations
→ Graph reveals weak understanding of Linear Equations
→ Recommend targeted review
```

### 3. Resource Recommendation

Suggest relevant materials based on concept relationships:

```
Topic: Photosynthesis
→ Related: Cellular Respiration, Energy Cycle
→ Resources: Videos, Worksheets, Interactive Simulations
```

### 4. Teacher Assignment Optimization

Match teacher expertise to subject requirements:

```
Subject: Advanced Physics
→ Requires: Quantum Mechanics, Thermodynamics
→ Best match: Teacher with Physics PhD specialization
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinKnowledgeEntityNotFoundError` | GEDKIN_KNOWLEDGE_ENTITY_NOT_FOUND | 404 |
| `GedkinKnowledgeEntityError` | GEDKIN_KNOWLEDGE_ENTITY | 500 |
| `GedkinKnowledgeEntityConflictError` | GEDKIN_KNOWLEDGE_ENTITY_CONFLICT | 409 |
| `GedkinKnowledgeRelationError` | GEDKIN_KNOWLEDGE_RELATION | 500 |
| `GedkinGraphSnapshotError` | GEDKIN_GRAPH_SNAPSHOT | 500 |
| `GedkinEntityResolutionError` | GEDKIN_ENTITY_RESOLUTION | 500 |
| `GedkinGraphTraversalError` | GEDKIN_GRAPH_TRAVERSAL | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_SEMANTIC.md](GEDKIN_SEMANTIC.md)
- [KNOWLEDGE_GRAPH.md](KNOWLEDGE_GRAPH.md)
