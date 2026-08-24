# GEDKIN API Reference

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Base URL

```
/api/v1/gedkin
```

All endpoints require authentication via Supabase JWT. All requests must include `school_id` in the JWT claims or request body.

---

## Common Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <jwt_token>` |
| `Content-Type` | `application/json` |
| `X-School-Id` | `<school_uuid>` |

---

## Pagination

All list endpoints support pagination:

| Parameter | Type | Default | Max |
|-----------|------|---------|-----|
| `offset` | integer | 0 | — |
| `limit` | integer | 50 | 200 |

**Response:**

```json
{
  "data": [],
  "total": 150,
  "offset": 0,
  "limit": 50
}
```

---

## Module 1 — Data Fabric

### Domains

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/data-fabric/domains` | List domains |
| `GET` | `/data-fabric/domains/:id` | Get domain |
| `POST` | `/data-fabric/domains` | Create domain |
| `PATCH` | `/data-fabric/domains/:id` | Update domain |
| `DELETE` | `/data-fabric/domains/:id` | Delete domain |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/data-fabric/products` | List products |
| `GET` | `/data-fabric/products/:id` | Get product |
| `POST` | `/data-fabric/products` | Create product |
| `PATCH` | `/data-fabric/products/:id` | Update product |
| `DELETE` | `/data-fabric/products/:id` | Delete product |

### Contracts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/data-fabric/contracts` | List contracts |
| `POST` | `/data-fabric/contracts` | Create contract |
| `PATCH` | `/data-fabric/contracts/:id` | Update contract |

### Sources

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/data-fabric/sources` | List sources |
| `POST` | `/data-fabric/sources` | Create source |
| `PATCH` | `/data-fabric/sources/:id` | Update source |

### Lineage

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/data-fabric/lineage` | List lineage edges |
| `POST` | `/data-fabric/lineage` | Create lineage edge |

### Quality

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/data-fabric/quality` | List quality reports |
| `POST` | `/data-fabric/quality` | Create quality report |

---

## Module 2 — Knowledge Graph

### Entities

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/knowledge-graph/entities` | List entities |
| `GET` | `/knowledge-graph/entities/:id` | Get entity |
| `POST` | `/knowledge-graph/entities` | Create entity |
| `PATCH` | `/knowledge-graph/entities/:id` | Update entity |
| `DELETE` | `/knowledge-graph/entities/:id` | Delete entity |

### Relations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/knowledge-graph/relations` | List relations |
| `POST` | `/knowledge-graph/relations` | Create relation |
| `DELETE` | `/knowledge-graph/relations/:id` | Delete relation |

### Traversal

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/knowledge-graph/traverse` | Traverse graph from node |

### Snapshots

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/knowledge-graph/snapshots` | List snapshots |
| `POST` | `/knowledge-graph/snapshots` | Create snapshot |

### Resolution

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/knowledge-graph/resolve` | Resolve entity duplicates |

---

## Module 3 — Semantic Intelligence

### Concepts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/semantic/concepts` | List concepts |
| `POST` | `/semantic/concepts` | Create concept |

### Ontologies

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/semantic/ontologies` | List ontologies |
| `POST` | `/semantic/ontologies` | Create ontology |

### Taxonomies

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/semantic/taxonomies` | List taxonomies |
| `POST` | `/semantic/taxonomies` | Create taxonomy |

### Embeddings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/semantic/embeddings` | Generate embeddings |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/semantic/search` | Semantic search |

---

## Module 4 — Research Intelligence

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/research/projects` | List projects |
| `GET` | `/research/projects/:id` | Get project |
| `POST` | `/research/projects` | Create project |
| `PATCH` | `/research/projects/:id` | Update project |

### Publications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/research/publications` | List publications |
| `POST` | `/research/publications` | Create publication |

### Profiles

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/research/profiles` | List researcher profiles |
| `POST` | `/research/profiles` | Create profile |

### Citations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/research/citations` | List citations |
| `POST` | `/research/citations` | Create citation |

### Trends

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/research/trends` | List research trends |

---

## Module 5 — Observatory

### Indicators

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/observatory/indicators` | List indicators |
| `POST` | `/observatory/indicators` | Create indicator |

### Dashboards

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/observatory/dashboards` | List dashboards |
| `POST` | `/observatory/dashboards` | Create dashboard |

### Benchmarks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/observatory/benchmarks` | List benchmarks |
| `POST` | `/observatory/benchmarks` | Create benchmark |

### SDG Alignment

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/observatory/sdg` | List SDG alignments |
| `POST` | `/observatory/sdg` | Create SDG alignment |

---

## Module 6 — Policy Intelligence

### Policies

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/policy/policies` | List policies |
| `GET` | `/policy/policies/:id` | Get policy |
| `POST` | `/policy/policies` | Create policy |
| `PATCH` | `/policy/policies/:id` | Update policy |

### Simulations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/policy/simulations` | List policy simulations |
| `POST` | `/policy/simulations` | Run simulation |

### Recommendations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/policy/recommendations` | List recommendations |

### Impact Analysis

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/policy/impacts` | List impact analyses |
| `POST` | `/policy/impacts` | Create impact analysis |

---

## Module 7 — Forecasting Engine

### Forecasts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/forecast/forecasts` | List forecasts |
| `GET` | `/forecast/forecasts/:id` | Get forecast |
| `POST` | `/forecast/forecasts` | Create forecast |

### Models

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/forecast/models` | List models |
| `POST` | `/forecast/models` | Register model |

### Predictions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/forecast/predictions` | List predictions |

### Capacity

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/forecast/capacity` | List capacity forecasts |

### Drift

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/forecast/drift` | List drift detections |

---

## Module 8 — AI Agent Network

### Agents

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents` | List agents |
| `GET` | `/agents/:id` | Get agent |
| `POST` | `/agents` | Create agent |
| `PATCH` | `/agents/:id` | Update agent |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents/tasks` | List tasks |
| `POST` | `/agents/tasks` | Create task |
| `PATCH` | `/agents/tasks/:id` | Update task |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents/messages` | List messages |
| `POST` | `/agents/messages` | Send message |

### Tool Calls

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents/tool-calls` | List tool calls |
| `POST` | `/agents/tool-calls` | Execute tool call |

### Memory

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents/memory` | List memory entries |
| `POST` | `/agents/memory` | Store memory |
| `DELETE` | `/agents/memory/:key` | Evict memory |

---

## Module 9 — Research Lab

### Experiments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lab/experiments` | List experiments |
| `POST` | `/lab/experiments` | Create experiment |

### Datasets

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lab/datasets` | List datasets |
| `POST` | `/lab/datasets` | Create dataset |

### Models

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lab/models` | List experiment models |
| `POST` | `/lab/models` | Create model |

### Benchmarks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lab/benchmarks` | List benchmarks |
| `POST` | `/lab/benchmarks` | Create benchmark |

---

## Module 10 — Marketplace

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/marketplace/products` | List products |
| `GET` | `/marketplace/products/:id` | Get product |
| `POST` | `/marketplace/products` | Publish product |
| `PATCH` | `/marketplace/products/:id` | Update product |

### Subscriptions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/marketplace/subscriptions` | List subscriptions |
| `POST` | `/marketplace/subscriptions` | Subscribe |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/marketplace/reviews` | List reviews |
| `POST` | `/marketplace/reviews` | Create review |

### Access Logs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/marketplace/access-logs` | List access logs |

### SLAs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/marketplace/slas` | List SLAs |
| `POST` | `/marketplace/slas` | Create SLA |

---

## Module 11 — Simulation Engine

### Simulations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/simulation/simulations` | List simulations |
| `GET` | `/simulation/simulations/:id` | Get simulation |
| `POST` | `/simulation/simulations` | Create simulation |

### Scenarios

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/simulation/scenarios` | List scenarios |
| `POST` | `/simulation/scenarios` | Create scenario |

### Runs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/simulation/runs` | List runs |
| `POST` | `/simulation/runs` | Execute scenario run |

### Results

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/simulation/results` | List results |

### Sensitivity

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/simulation/sensitivity` | List sensitivity analyses |
| `POST` | `/simulation/sensitivity` | Run sensitivity analysis |

---

## Module 12 — Intelligence Copilot

### Queries

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/copilot/query` | Submit query |
| `GET` | `/copilot/queries` | List queries |

### Responses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/copilot/responses/:queryId` | Get response |

### Conversations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/copilot/conversations` | List conversations |
| `GET` | `/copilot/conversations/:id` | Get conversation |

### Approvals

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/copilot/approvals` | Approve response |
| `GET` | `/copilot/approvals` | List pending approvals |

---

## Error Response Format

```json
{
  "error": {
    "code": "GEDKIN_RESOURCE_NOT_FOUND",
    "message": "Resource introuvable",
    "details": {},
    "statusCode": 404
  }
}
```

---

## Rate Limits

| Tier | Requests/Minute | Requests/Hour |
|------|----------------|---------------|
| Free | 60 | 1,000 |
| Standard | 120 | 5,000 |
| Enterprise | 600 | 30,000 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_SECURITY.md](GEDKIN_SECURITY.md)
- [GEDKIN_VALIDATORS.md](GEDKIN_VALIDATORS.md)
