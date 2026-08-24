# GEDKIN Semantic Intelligence Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

Semantic Intelligence (Module 3) provides multilingual concept management, ontology definitions, taxonomy hierarchies, vector embeddings, and hybrid search capabilities across EduCI.

---

## Data Model

### GedkinSemanticConcept

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Concept name (1-200 chars) |
| `description` | string | Concept description (max 2000) |
| `language` | enum | FR, EN, ES, AR, PT |
| `synonyms` | string[] | Alternative names |
| `relatedConcepts` | string[] | Related concept IDs |
| `ontologyId` | UUID | Parent ontology |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinOntology

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Ontology name (1-200 chars) |
| `description` | string | Ontology description (max 2000) |
| `version` | string | Semantic version |
| `concepts` | string[] | Concept IDs |
| `relations` | string[] | Relation definitions |
| `language` | enum | Primary language |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinTaxonomy

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Taxonomy name (1-200 chars) |
| `description` | string | Taxonomy description (max 2000) |
| `rootConcepts` | string[] | Root concept IDs |
| `depth` | integer | Hierarchy depth |
| `language` | enum | Primary language |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinEmbedding

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `entityType` | string | Entity type |
| `entityId` | UUID | Entity ID |
| `model` | enum | Embedding model |
| `vector` | number[] | Vector representation |
| `dimensions` | integer | Vector dimensions |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinSemanticSearch

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `query` | string | Search query |
| `language` | enum | Query language |
| `results` | string[] | Result entity IDs |
| `searchType` | enum | Search strategy |
| `timestamp` | ISO 8601 | Search timestamp |

---

## Supported Languages

| Code | Language |
|------|----------|
| `FR` | French |
| `EN` | English |
| `ES` | Spanish |
| `AR` | Arabic |
| `PT` | Portuguese |

---

## Search Types

| Type | Description |
|------|-------------|
| `KEYWORD` | Traditional keyword matching |
| `SEMANTIC` | Vector similarity search |
| `HYBRID` | Combined keyword + semantic |
| `VECTOR` | Pure vector similarity |
| `GRAPH` | Graph-based traversal |

---

## Embedding Models

| Model | Dimensions | Description |
|-------|------------|-------------|
| `OPENAI` | 1536 | OpenAI text-embedding |
| `SENTENCE_TRANSFORMER` | 768 | Sentence-BERT |
| `MULTILINGUAL_E5` | 1024 | Multilingual E5 (default) |
| `CUSTOM` | Variable | Custom model |

---

## Configuration

```typescript
export const gedkinSemanticConfig = {
  enabled: true,
  supportedLanguages: ['fr', 'en', 'es', 'ar', 'pt'],
  defaultLanguage: 'fr',
  embeddingModel: 'MULTILINGUAL_E5',
  vectorSearchTopK: 10,
  hybridSearchEnabled: true,
  ontologyMaxConcepts: 10000,
  taxonomyMaxDepth: 10,
  synonymResolutionEnabled: true,
};
```

---

## Search Algorithm

### Hybrid Search Pipeline

1. **Keyword Phase** — BM25 full-text search
2. **Semantic Phase** — Vector similarity via pgvector
3. **Graph Phase** — Graph traversal for related entities
4. **Fusion** — Reciprocal Rank Fusion (RRF)
5. **Filtering** — Apply access controls and facets
6. **Ranking** — Final relevance scoring

### Similarity Metrics

| Metric | Formula | Use Case |
|--------|---------|----------|
| Cosine | `dot(a,b) / (‖a‖ × ‬b‖)` | Default |
| L2 | `√Σ(aᵢ-bᵢ)²` | Euclidean |
| Inner Product | `dot(a,b)` | Ranked retrieval |

---

## Ontology Management

### Concept Hierarchy

```
Root Concept
├── Child Concept A
│   ├── Grandchild A1
│   └── Grandchild A2
├── Child Concept B
│   └── Grandchild B1
└── Child Concept C
```

### Relation Types in Ontology

| Relation | Description |
|----------|-------------|
| `IS_A` | Taxonomic inheritance |
| `PART_OF` | Meronymic composition |
| `HAS_PROPERTY` | Attribute assignment |
| `CAUSES` | Causal relationship |
| `PRECEDES` | Temporal ordering |

---

## Taxonomy Depth Analysis

| Depth | Entities | Query Complexity |
|-------|----------|-----------------|
| 1 | ~10 | O(1) |
| 2 | ~50 | O(n) |
| 3 | ~200 | O(n²) |
| 4 | ~500 | O(n²) |
| 5+ | ~1000 | O(n³) |

---

## Use Cases

### 1. Multilingual Search

Student searches "fractions" in French → Returns "fractions", "addition de fractions", "soustraction de fractions"

### 2. Concept Discovery

Teacher searches "photosynthesis" → Returns related concepts: "cellular respiration", "energy cycle", "chlorophyll"

### 3. Curriculum Mapping

Ontology maps curriculum standards to concepts → Enables gap analysis and prerequisite validation

### 4. Resource Tagging

Embeddings auto-tag learning resources → Enables semantic recommendation

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinSemanticConceptNotFoundError` | GEDKIN_SEMANTIC_CONCEPT_NOT_FOUND | 404 |
| `GedkinSemanticConceptError` | GEDKIN_SEMANTIC_CONCEPT | 500 |
| `GedkinOntologyNotFoundError` | GEDKIN_ONTOLOGY_NOT_FOUND | 404 |
| `GedkinOntologyError` | GEDKIN_ONTOLOGY | 500 |
| `GedkinTaxonomyNotFoundError` | GEDKIN_TAXONOMY_NOT_FOUND | 404 |
| `GedkinTaxonomyError` | GEDKIN_TAXONOMY | 500 |
| `GedkinEmbeddingError` | GEDKIN_EMBEDDING | 500 |
| `GedkinSemanticSearchError` | GEDKIN_SEMANTIC_SEARCH | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_KNOWLEDGE_GRAPH.md](GEDKIN_KNOWLEDGE_GRAPH.md)
- [GEDKIN_API.md](GEDKIN_API.md)
