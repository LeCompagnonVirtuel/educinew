# Phase 2.10 - Search Platform

## Overview

The Search Platform module provides enterprise-grade full-text search capabilities for the EduCI ecosystem. It implements search indexing, query optimization, relevance tuning, synonym management, suggestion engines, search analytics, and federated search across multiple data sources. This module ensures fast, accurate, and relevant search results across all platform data.

```
┌─────────────────────────────────────────────────────────┐
│                   SEARCH PLATFORM                        │
├─────────────────────────────────────────────────────────┤
│  Search Indexing → Query Optimization → Relevance Tuning │
│  Synonyms → Suggestions → Search Analytics              │
│  Federated Search → Faceted Search → Personalization    │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10):**
- `SearchIndexRepository` - Index CRUD + findByName, findByStatus
- `SearchQueryRepository` - Query CRUD + findByIndex, findByStatus
- `SearchRelevanceRepository` - Relevance CRUD + findByIndex, findByMetric
- `SearchSynonymRepository` - Synonym CRUD + findByTerm, findByGroup
- `SearchSuggestionRepository` - Suggestion CRUD + findByPrefix, findByIndex
- `SearchAnalyticsRepository` - Analytics CRUD + findByIndex, findByPeriod
- `SearchFederatedRepository` - Federated search CRUD + findBySources
- `SearchFacetRepository` - Facet CRUD + findByIndex, findActive
- `SearchPersonalizationRepository` - Personalization CRUD + findByUser
- `SearchConfigRepository` - Config CRUD + findByIndex, findGlobal

**Entity Types (40):**
- `SearchIndex`, `SearchIndexCreate`, `SearchIndexUpdate`, `SearchIndexQuery`
- `SearchQuery`, `SearchQueryCreate`, `SearchQueryUpdate`, `SearchQueryQuery`
- `SearchRelevance`, `SearchRelevanceCreate`, `SearchRelevanceUpdate`, `SearchRelevanceQuery`
- `SearchSynonym`, `SearchSynonymCreate`, `SearchSynonymUpdate`, `SearchSynonymQuery`
- `SearchSuggestion`, `SearchSuggestionCreate`, `SearchSuggestionUpdate`, `SearchSuggestionQuery`
- `SearchAnalytics`, `SearchAnalyticsCreate`, `SearchAnalyticsUpdate`, `SearchAnalyticsQuery`
- `SearchFederated`, `SearchFederatedCreate`, `SearchFederatedUpdate`, `SearchFederatedQuery`
- `SearchFacet`, `SearchFacetCreate`, `SearchFacetUpdate`, `SearchFacetQuery`
- `SearchPersonalization`, `SearchPersonalizationCreate`, `SearchPersonalizationUpdate`, `SearchPersonalizationQuery`
- `SearchConfig`, `SearchConfigCreate`, `SearchConfigUpdate`, `SearchConfigQuery`

### Validators

**File: `ep-cache-search-security.ts` (1,200 lines)**

| Schema | Purpose |
|--------|---------|
| `searchIndexCreateSchema` | Validates index creation (name, fields, mappings) |
| `searchQueryCreateSchema` | Validates query creation (query, index, filters) |
| `searchRelevanceCreateSchema` | Validates relevance config creation |
| `searchSynonymCreateSchema` | Validates synonym creation (term, synonyms, group) |
| `searchSuggestionCreateSchema` | Validates suggestion creation |
| `searchAnalyticsCreateSchema` | Validates analytics creation |
| `searchFederatedCreateSchema` | Validates federated search creation |
| `searchFacetCreateSchema` | Validates facet creation (field, type, options) |
| `searchPersonalizationCreateSchema` | Validates personalization creation |
| `searchConfigCreateSchema` | Validates search config creation |

### Errors

| Error Code | Description |
|------------|-------------|
| `SEARCH_INDEX_NOT_FOUND` | Search index not found |
| `SEARCH_INDEX_BUSY` | Index currently being rebuilt |
| `SEARCH_QUERY_FAILED` | Search query execution failed |
| `SEARCH_RELEVANCE_INVALID` | Relevance configuration invalid |
| `SEARCH_SYNONYM_CONFLICT` | Synonym conflict detected |
| `SEARCH_SUGGESTION_FAILED` | Suggestion generation failed |
| `SEARCH_FEDERATED_TIMEOUT` | Federated search timed out |
| `SEARCH_FACET_INVALID` | Facet configuration invalid |
| `SEARCH_PERSONALIZATION_FAILED` | Personalization failed |
| `SEARCH_CONFIG_INVALID` | Search config invalid |

### Repository

```typescript
// 10 repository interfaces for search management
interface SearchIndexRepository {
  create(data: SearchIndexCreate): Promise<SearchIndex>;
  findById(id: string): Promise<SearchIndex | null>;
  findByName(name: string): Promise<SearchIndex | null>;
  findByStatus(status: string): Promise<SearchIndex[]>;
  update(id: string, data: SearchIndexUpdate): Promise<SearchIndex>;
  delete(id: string): Promise<void>;
  list(query: SearchIndexQuery): Promise<SearchIndex[]>;
  rebuildIndex(id: string): Promise<void>;
  getStats(id: string): Promise<SearchIndexStats>;
}

interface SearchQueryRepository {
  create(data: SearchQueryCreate): Promise<SearchQuery>;
  findById(id: string): Promise<SearchQuery | null>;
  findByIndex(indexId: string): Promise<SearchQuery[]>;
  findByStatus(status: string): Promise<SearchQuery[]>;
  update(id: string, data: SearchQueryUpdate): Promise<SearchQuery>;
  list(query: SearchQueryQuery): Promise<SearchQuery[]>;
  findSlowQueries(thresholdMs: number): Promise<SearchQuery[]>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `SearchIndexService` | Index creation, management, and rebuilding |
| `SearchQueryService` | Query execution and optimization |
| `SearchRelevanceService` | Relevance tuning and scoring |
| `SearchSynonymService` | Synonym management and expansion |
| `SearchSuggestionService` | Auto-complete and suggestions |
| `SearchAnalyticsService` | Search analytics and reporting |
| `SearchFederatedService` | Multi-source federated search |
| `SearchFacetService` | Faceted search and filtering |
| `SearchPersonalizationService` | Personalized search results |
| `SearchConfigService` | Search configuration management |

### Hooks

| Hook | Purpose |
|------|---------|
| `useSearchIndexes` | Index management |
| `useSearchQueries` | Query execution |
| `useSearchRelevance` | Relevance configuration |
| `useSearchSynonyms` | Synonym management |
| `useSearchSuggestions` | Suggestion operations |
| `useSearchAnalytics` | Analytics viewing |
| `useSearchFederated` | Federated search |
| `useSearchFacets` | Facet management |
| `useSearchPersonalization` | Personalization config |
| `useSearchConfig` | Search configuration |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/search/indexes` | List indexes |
| POST | `/api/enterprise/search/indexes` | Create index |
| GET | `/api/enterprise/search/indexes/[id]` | Get index |
| PUT | `/api/enterprise/search/indexes/[id]` | Update index |
| POST | `/api/enterprise/search/indexes/[id]/rebuild` | Rebuild index |
| GET | `/api/enterprise/search/indexes/[id]/stats` | Get index stats |
| GET | `/api/enterprise/search/queries` | List queries |
| POST | `/api/enterprise/search/queries` | Execute query |
| GET | `/api/enterprise/search/queries/[id]` | Get query result |
| GET | `/api/enterprise/search/relevance` | List relevance configs |
| POST | `/api/enterprise/search/relevance` | Create relevance config |
| GET | `/api/enterprise/search/synonyms` | List synonyms |
| POST | `/api/enterprise/search/synonyms` | Create synonym |
| GET | `/api/enterprise/search/suggestions` | Get suggestions |
| POST | `/api/enterprise/search/suggestions` | Create suggestion |
| GET | `/api/enterprise/search/analytics` | Search analytics |
| GET | `/api/enterprise/search/federated` | Federated search |
| GET | `/api/enterprise/search/facets` | List facets |
| POST | `/api/enterprise/search/facets` | Create facet |
| GET | `/api/enterprise/search/personalization` | Personalization config |
| PUT | `/api/enterprise/search/personalization` | Update personalization |
| GET | `/api/enterprise/search/config` | Get search config |
| PUT | `/api/enterprise/search/config` | Update search config |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `SearchDashboardScreen` | Search overview and metrics |
| `SearchIndexScreen` | Index management |
| `SearchQueryScreen` | Query testing |
| `SearchRelevanceScreen` | Relevance tuning |
| `SearchAnalyticsScreen` | Search analytics |
| `SearchSynonymScreen` | Synonym management |

## Configuration

```typescript
export const SEARCH_CONFIG = {
  limits: {
    maxIndexes: 50,
    maxDocumentsPerIndex: 10000000,
    maxQueryLength: 1000,
    maxSynonyms: 10000,
    maxFacets: 100,
    maxSuggestions: 50,
  },
  indexing: {
    batchSize: 1000,
    refreshIntervalMs: 5000,
    maxConcurrentIndexers: 3,
    replicationFactor: 2,
  },
  query: {
    timeoutMs: 30000,
    maxResults: 1000,
    defaultPageSize: 20,
    highlightEnabled: true,
  },
  relevance: {
    defaultBoost: 1.0,
    maxBoost: 10.0,
    decayFunction: 'gauss',
    refreshIntervalMs: 300000,
  },
  analytics: {
    samplingRate: 0.1,
    retentionDays: 90,
    aggregationIntervalMs: 300000,
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `search_admin` | Full search management |
| `search_operator` | Index management, query testing |
| `search_analyst` | Analytics and relevance tuning |
| `search_viewer` | Read-only search data |
| `platform_admin` | Cross-index operations |

## Multi-Tenancy

- Search indexes scoped per tenant
- Query results filtered by tenant context
- Synonyms per tenant or shared
- Analytics aggregated per tenant
- Personalization per tenant user
- Facets configurable per tenant

## Offline Support

- Search index snapshots cached locally
- Query results cached for offline
- Suggestions available from local cache
- Analytics buffered for batch upload
- Synonym updates queued for sync

## API Reference

### Indexes
- GET /api/enterprise/search/indexes
- POST /api/enterprise/search/indexes
- GET /api/enterprise/search/indexes/[id]
- PUT /api/enterprise/search/indexes/[id]
- POST /api/enterprise/search/indexes/[id]/rebuild
- GET /api/enterprise/search/indexes/[id]/stats

### Queries
- GET /api/enterprise/search/queries
- POST /api/enterprise/search/queries
- GET /api/enterprise/search/queries/[id]

### Relevance
- GET /api/enterprise/search/relevance
- POST /api/enterprise/search/relevance
- GET /api/enterprise/search/relevance/[id]
- PUT /api/enterprise/search/relevance/[id]

### Synonyms
- GET /api/enterprise/search/synonyms
- POST /api/enterprise/search/synonyms
- GET /api/enterprise/search/synonyms/[id]
- PUT /api/enterprise/search/synonyms/[id]
- DELETE /api/enterprise/search/synonyms/[id]

### Suggestions
- GET /api/enterprise/search/suggestions
- POST /api/enterprise/search/suggestions

### Analytics
- GET /api/enterprise/search/analytics
- GET /api/enterprise/search/analytics/top-queries
- GET /api/enterprise/search/analytics/no-results

### Federated
- GET /api/enterprise/search/federated
- POST /api/enterprise/search/federated

### Facets
- GET /api/enterprise/search/facets
- POST /api/enterprise/search/facets
- GET /api/enterprise/search/facets/[id]
- PUT /api/enterprise/search/facets/[id]

### Personalization
- GET /api/enterprise/search/personalization
- PUT /api/enterprise/search/personalization

### Config
- GET /api/enterprise/search/config
- PUT /api/enterprise/search/config

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All services and validators |
| Integration Tests | Index and query operations |
| E2E Tests | Full search workflows |
| Performance Tests | Query latency benchmarks |
| Relevance Tests | Search relevance accuracy |

## Security

- Search queries sanitized of injection attempts
- Index access controlled by tenant
- Query results filtered by permissions
- Analytics data anonymized
- Personalization data encrypted
- Search config changes logged to audit
- Rate limiting on search queries
