# EduOS Phase 3.4 — Architecture

> Version : 3.4.0

---

## 1. Design système

```
                    ┌──────────────────────┐
                    │     Load Balancer    │
                    │    (CDN + WAF)       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │    API Gateway       │
                    │  (Rate Limit, Auth)  │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼──────┐    ┌─────────▼────────┐    ┌───────▼──────┐
│   Web App    │    │   Edge Functions  │    │  Mobile App  │
│  (Next.js)   │    │   (Supabase)     │    │   (Expo)     │
└───────┬──────┘    └─────────┬────────┘    └───────┬──────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                    ┌──────────▼───────────┐
                    │    Supabase BDD      │
                    │  (PostgreSQL + RLS)  │
                    └──────────────────────┘
```

---

## 2. Modules et interactions

### Matrice de dépendances

| Module | Dépend de |
|--------|-----------|
| Core Runtime | — |
| Workflow Automation | Core Runtime |
| Digital Identity Wallet | Core Runtime |
| Educational Wallet | Digital Identity Wallet |
| Marketplace & Commerce | Educational Wallet, Workflow |
| Governance & Policy | Core Runtime |
| National Registry | Core Runtime, Governance |
| Blockchain Education | Digital Identity Wallet, National Registry |
| Ecosystem Integration | Core Runtime |
| AI Orchestrator | Core Runtime, Ecosystem Integration |
| Enterprise Data Fabric | Core Runtime, Ecosystem Integration |
| Enterprise Automation Hub | Workflow Automation, AI Orchestrator |

### Flux inter-modules

```
Student Enrolled
    ├─► Core Runtime → create session
    ├─► Digital Identity → issue credential
    ├─► Educational Wallet → credit scholarship
    ├─► National Registry → register record
    ├─► AI Orchestrator → assign tutor agent
    └─► Automation Hub → send welcome notification
```

---

## 3. Patterns architecturaux

### 3.1 Service Mesh

- Découverte de services automatique
- Health check toutes les 10s
- Circuit breaker (seuil: 5 échecs, timeout: 30s)
- Retry max 3 tentatives

### 3.2 Event-Driven Architecture

```
Event Bus (200 listeners max, retention 86400s)
    │
    ├──► Publishers (Webhooks, DB triggers, API)
    │
    └──► Subscribers (Workflows, Notifications, AI)
```

### 3.3 Data Flow

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Source   │───►│ ETL/     │───►│ Data     │───►│ Consumer │
│ (DB,API) │    │ Stream   │    │ Product  │    │ (Apps)   │
└─────────┘    └──────────┘    └──────────┘    └──────────┘
                    │                │
                    ▼                ▼
              ┌──────────┐    ┌──────────┐
              │ Quality  │    │ Catalog  │
              │ Checks   │    │ Metadata │
              └──────────┘    └──────────┘
```

---

## 4. Communication inter-services

| Mécanisme | Usage |
|-----------|-------|
| REST API | Communication synchrone |
| Event Bus | Communication asynchrone |
| Webhook | Notifications externes |
| Message Queue | Jobs en file d'attente |
| gRPC | Communication haute performance |

---

## 5. Scalabilité

| Composant | Stratégie |
|-----------|-----------|
| API | Auto-scaling 2-20 replicas |
| Workers | Queue-based scaling |
| Cache | LRU avec TTL (300s défaut) |
| BDD | Read replicas + connection pooling |
| Storage | CDN + Cloud storage |

---

## 6. Fiabilité

| Mécanisme | Configuration |
|-----------|---------------|
| Circuit Breaker | 5 échecs → ouvert, 30s reset |
| Retry | Max 3, backoff exponentiel |
| Health Check | /health, /ready, /live |
| Graceful Shutdown | Timeout 30s |
| Disaster Recovery | RTO 4h, RPO 1h |
| Backup | Quotidien, rétention 90j |

---

## 7. Voir aussi

- [Documentation principale](../phase3-4-eduos.md)
- [Tables de données](../database/eduos-tables.md)
- [Sécurité](../security/eduos-security.md)
- [Performance](../performance/eduos-performance.md)
