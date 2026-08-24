# Education Knowledge Graph — EduCI Phase 4.0

**Version:** 4.0.0  
**Status:** Active  
**Last Updated:** 2026-08-06

---

## Overview

The Education Knowledge Graph maps relationships between educational entities — students, teachers, subjects, concepts, assessments, and outcomes. It enables semantic search, recommendation engines, and contextual intelligence across the platform.

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│            Knowledge Graph Engine                │
├──────────┬──────────┬──────────────────────────┤
│  Graph   │  Semantic│  Recommendation          │
│  Store   │  Search  │  Engine                  │
├──────────┴──────────┴──────────────────────────┤
│           Supabase + pgvector                   │
└─────────────────────────────────────────────────┘
```

---

## Entity Types

### Core Entities

| Entity | Description |
|--------|-------------|
| `Student` | Individual learner |
| `Teacher` | Educator or staff |
| `Subject` | Academic discipline |
| `Topic` | Unit within a subject |
| `Concept` | Specific learning objective |
| `Assessment` | Test, exam, or assignment |
| `Resource` | Learning material |
| `Class` | Student grouping |

### Relationship Types

| Relationship | From | To |
|-------------|------|-----|
| `ENROLLED_IN` | Student | Class |
| `TEACHES` | Teacher | Subject |
| `COVERS` | Subject | Topic |
| `REQUIRES` | Concept | Concept |
| `ASSESSED_BY` | Concept | Assessment |
| `USES` | Topic | Resource |
| `BELONGS_TO` | Class | Subject |

---

## Graph Schema

```typescript
interface GraphNode {
  id: string;
  type: EntityType;
  properties: Record<string, unknown>;
  embeddings?: number[]; // Vector embeddings for semantic search
  createdAt: Date;
  updatedAt: Date;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationType;
  weight: number;
  properties: Record<string, unknown>;
}
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

## Semantic Search

Vector embeddings enable natural language queries:

```typescript
interface SemanticQuery {
  text: string;
  entityType?: EntityType[];
  schoolId: string;
  limit: number;
  threshold: number; // Similarity threshold 0-1
}
```

### Example Queries

- "Topics related to fractions for grade 5"
- "Resources for teaching African history"
- "Students struggling with science concepts"

---

## Recommendation Engine

### Types

| Type | Description |
|------|-------------|
| Content | Suggest learning resources |
| Path | Recommend learning sequences |
| Peer | Connect students with similar needs |
| Intervention | Flag at-risk students |

### Algorithm

1. Query user's interaction history
2. Build context graph from recent activity
3. Traverse graph for related entities
4. Rank by relevance and recency
5. Apply business rules and filters
6. Return top recommendations

---

## Data Population

The graph is populated from:

- **Direct Input** — Curriculum and assessment definitions
- **Activity Data** — Student interactions and submissions
- **AI Inference** — Concept extraction from content
- **Manual Curation** — Teacher-defined relationships

---

## Performance

| Metric | Target |
|--------|--------|
| Graph traversal depth | 5 levels |
| Query response time | <200ms |
| Recommendation latency | <500ms |
| Vector search accuracy | >90% |
| Graph update latency | <5 seconds |

---

## API Reference

### Query Graph

```http
POST /api/v1/knowledge-graph/query
{
  "startNode": "uuid",
  "relationTypes": ["COVERS", "REQUIRES"],
  "depth": 3
}
```

### Semantic Search

```http
POST /api/v1/knowledge-graph/search
{
  "text": "string",
  "entityType": ["Concept", "Resource"],
  "schoolId": "uuid"
}
```

### Get Recommendations

```http
GET /api/v1/knowledge-graph/recommendations/{entityId}?type=content&limit=10
```

---

## Related Documentation

- [DIGITAL_BRAIN.md](DIGITAL_BRAIN.md) — Education Digital Brain
- [AI_OS.md](AI_OS.md) — Autonomous AI Operating System
- [AUTONOMOUS_ACADEMIC.md](AUTONOMOUS_ACADEMIC.md) — Autonomous Academic Intelligence
