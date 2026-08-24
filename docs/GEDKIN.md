# GEDKIN — Global Education Knowledge Intelligence Network

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09  
**Phase:** 4.9  
**Classification:** Enterprise Production

---

## Overview

GEDKIN (Global Education Knowledge Intelligence Network) is EduCI's enterprise-grade intelligence platform that unifies data fabric, knowledge graphs, semantic search, research analytics, forecasting, and AI-driven decision support across all educational institutions.

---

## Module Map

| Module | ID | Description |
|--------|-----|-------------|
| Global Education Data Fabric | M1 | Data domains, products, contracts, lineage, quality |
| Knowledge Graph | M2 | Entities, relations, snapshots, resolution |
| Semantic Intelligence | M3 | Concepts, ontologies, taxonomies, embeddings |
| Research Intelligence | M4 | Projects, publications, citations, trends |
| Global Education Observatory | M5 | Indicators, benchmarks, SDG alignment |
| Policy & Decision Intelligence | M6 | Policies, simulations, recommendations |
| Global Forecasting Engine | M7 | Forecasts, models, drift detection |
| AI Agent Network | M8 | Agents, tasks, messages, tools, memory |
| Digital Research Lab | M9 | Experiments, datasets, models, benchmarks |
| Data Products & Marketplace | M10 | Products, subscriptions, reviews, SLAs |
| Simulation & Scenario Engine | M11 | Simulations, scenarios, runs, sensitivity |
| Intelligence Copilot | M12 | Queries, responses, conversations, approvals |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     GEDKIN Platform                              │
├──────────┬──────────┬──────────┬──────────┬─────────────────────┤
│  Data    │Knowledge │ Semantic │ Research │  Observatory        │
│  Fabric  │  Graph   │ Intel    │  Intel   │                     │
├──────────┴──────────┴──────────┴──────────┴─────────────────────┤
│  Policy   │ Forecasting │  Agents  │  Lab  │ Marketplace        │
├───────────┴─────────────┴──────────┴───────┴────────────────────┤
│  Simulation Engine  │  Intelligence Copilot                     │
├─────────────────────┴───────────────────────────────────────────┤
│           Supabase · Edge Functions · DeepSeek · Gemini          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js App Router |
| Language | TypeScript Strict |
| Validation | Zod |
| Database | Supabase (PostgreSQL + pgvector) |
| AI | DeepSeek, Gemini |
| Realtime | Supabase Realtime |
| Auth | Supabase Auth + RBAC |

---

## Data Flow

```
Page → Hook → Service → Repository → Supabase
```

All business logic resides in services. All data access flows through repositories. No direct Supabase calls from UI components.

---

## Multi-Tenancy

Every GEDKIN query enforces `school_id` filtering. RLS policies provide additional database-level isolation. No cross-tenant data leakage is permitted.

---

## File Structure

| Package | Path |
|---------|------|
| Types | `packages/types/src/phase4-9-gedkin.ts` |
| Config | `packages/config/src/phase4-9-gedkin.ts` |
| Errors | `packages/errors/src/phase4-9-gedkin.ts` |
| Validators | `web/src/features/gedkin/validators/gedkin.ts` |
| Services | `web/src/features/gedkin/services/` |
| Repositories | `web/src/features/gedkin/repositories/` |

---

## Configuration

All module configurations are centralized in `packages/config/src/phase4-9-gedkin.ts`. Key settings:

| Config Key | Default | Description |
|-----------|---------|-------------|
| `maxDomainsPerSchool` | 50 | Max data domains per tenant |
| `maxEntitiesPerSchool` | 100,000 | Max knowledge graph entities |
| `embeddingDimensions` | 1536 | Vector embedding size |
| `maxAgentsPerSchool` | 20 | Max AI agents per tenant |
| `maxForecastsPerSchool` | 100 | Max active forecasts |
| `maxSimulationsPerSchool` | 50 | Max concurrent simulations |

---

## Security

| Control | Implementation |
|---------|---------------|
| RBAC | Role-based access per module |
| ABAC | Attribute-based fine-grained policies |
| Tenant Isolation | `school_id` + RLS |
| Encryption | AES-256 at rest, TLS 1.3 in transit |
| Audit | All access logged |
| SQL Injection | Zod validation + parameterized queries |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| API response | <200ms |
| Graph traversal | <200ms (depth ≤ 5) |
| Semantic search | <500ms |
| Forecast execution | <30s |
| Simulation run | <60s |
| Copilot response | <3s |

---

## Related Documentation

- [GEDKIN_ARCHITECTURE.md](GEDKIN_ARCHITECTURE.md)
- [GEDKIN_API.md](GEDKIN_API.md)
- [GEDKIN_DATA.md](GEDKIN_DATA.md)
- [KNOWLEDGE_GRAPH.md](KNOWLEDGE_GRAPH.md)
- [DIGITAL_BRAIN.md](DIGITAL_BRAIN.md)
- [AI_OS.md](AI_OS.md)
