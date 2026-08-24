# SEARCH_PLATFORM.md — Enterprise Search Platform

## Phase 3.5 — Unified Search & Discovery

---

## 1. Vision

A unified search platform across all EduCI modules, enabling instant discovery of students, teachers, documents, records, and insights with relevance ranking and AI-powered suggestions.

---

## 2. Architecture

```
┌──────────────────────────────────────┐
│          Search Interface            │
├──────────┬───────────┬───────────────┤
│ Query    │ Relevance │ AI            │
│ Parser   │ Engine    │ Suggester     │
├──────────┴───────────┴───────────────┤
│       Search Index (Elasticsearch)    │
├──────────────────────────────────────┤
│       Data Indexers (Per Module)      │
└──────────────────────────────────────┘
```

---

## 3. Searchable Entities

| Entity | Module | Fields Indexed |
|--------|--------|----------------|
| Students | 04_STUDENTS | name, id, class, status |
| Teachers | 05_TEACHERS | name, subject, qualification |
| Classes | 08_CLASSES | name, level, capacity |
| Subjects | 09_SUBJECTS | name, code, description |
| Exams | 12_EXAMS | name, date, type, subject |
| Grades | 13_GRADES | student, subject, score |
| Documents | 21_DOCUMENTS | title, content, type, tags |
| Payments | 15_PAYMENTS | reference, amount, status |
| Communications | 22_COMMUNICATION | subject, body, recipients |

---

## 4. Search Features

| Feature | Description |
|---------|-------------|
| Full-text Search | Natural language queries |
| Fuzzy Matching | Typo tolerance |
| Autocomplete | Real-time suggestions |
| Faceted Search | Filter by module, date, type |
| Highlighted Results | Matched terms highlighted |
| Saved Searches | Persistent search queries |
| Search History | Recent search tracking |
| AI Suggestions | Context-aware recommendations |

---

## 5. Indexing Strategy

| Index Type | Refresh | Purpose |
|------------|---------|---------|
| Real-time | <1s | Student records, attendance |
| Near real-time | <60s | Grades, documents |
| Batch | Hourly | Analytics, historical data |
| Full rebuild | Weekly | Schema changes |

---

## 6. API

```
GET  /api/v1/search?q=query           — Search all entities
GET  /api/v1/search/:module?q=query   — Search specific module
GET  /api/v1/search/suggest?q=prefix  — Autocomplete suggestions
POST /api/v1/search/advanced          — Advanced search with filters
GET  /api/v1/search/history           — User search history
DELETE /api/v1/search/history/:id     — Clear search history
```

---

## 7. Relevance Ranking

| Factor | Weight |
|--------|--------|
| Exact match | 40% |
| Partial match | 25% |
| Recency | 15% |
| Popularity (access count) | 10% |
| Entity type priority | 10% |

---

## 8. Performance

- Search response: <100ms (p95)
- Autocomplete: <50ms
- Index updates: <1s for real-time
- Supports 10M+ documents
- Concurrent users: 1000+

---

## 9. Security

- RBAC on search results (no unauthorized data)
- Audit trail for all search queries
- No sensitive fields in full-text index
- Rate limiting: 100 req/min per user
- Data masking for restricted fields

---

## 10. Multi-language

- English, French, Arabic support
- Unicode full support
- Language-aware stemming
- Locale-specific sorting
