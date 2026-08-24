# GEAESIP Architecture

## Overview

The GEAESIP architecture follows the EduCI enterprise patterns with strict separation of concerns: Page → Hook → Service → Repository → Supabase. All modules are multi-tenant with school_id isolation and Row Level Security (RLS).

## Module Architecture

### Module Structure

Each of the 20 modules follows a consistent structure:

```
features/geaesip/
├── services/           # Business logic layer
├── repositories/       # Data access layer (Supabase)
├── hooks/              # React hooks for UI integration
├── validators/         # Zod validation schemas
└── __tests__/          # Unit and integration tests
```

### Layer Responsibilities

#### Services Layer
- Business logic implementation
- Input validation using Zod schemas
- Multi-tenant school_id enforcement
- Cross-module orchestration
- AI/ML model integration

#### Repository Layer
- Supabase query construction
- Data mapping between database and TypeScript
- Query optimization and indexing
- Transaction management

#### Hooks Layer
- React state management
- API call orchestration
- Loading and error state handling
- Real-time subscription management

#### Validators Layer
- Request/response validation
- Type-safe API contracts
- Input sanitization
- Business rule enforcement

## Data Flow Diagrams

### 1. Intelligence Processing Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Data       │────▶│  Fusion     │────▶│  Reasoning  │
│  Collection │     │  Engine     │     │  Engine     │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Knowledge  │     │  Causal     │
                    │  Graph      │     │  Analysis   │
                    └─────────────┘     └─────────────┘
                           │                    │
                           └────────┬───────────┘
                                    ▼
                             ┌─────────────┐
                             │  Health     │
                             │  Score      │
                             └─────────────┘
```

### 2. Decision Intelligence Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Problem    │────▶│  Option     │────▶│  Risk       │
│  Detection  │     │  Generation │     │  Assessment │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Score      │     │  Approval   │
                    │  Ranking    │     │  Workflow   │
                    └─────────────┘     └─────────────┘
                           │                    │
                           └────────┬───────────┘
                                    ▼
                             ┌─────────────┐
                             │  Execution  │
                             │  & Audit    │
                             └─────────────┘
```

### 3. Agent Orchestration Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Mission    │────▶│  Agent      │────▶│  Task       │
│  Creation   │     │  Selection  │     │  Delegation │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Consensus  │     │  Negotiation│
                    │  Protocol   │     │  Engine     │
                    └─────────────┘     └─────────────┘
                           │                    │
                           └────────┬───────────┘
                                    ▼
                             ┌─────────────┐
                             │  Result     │
                             │  Aggregation│
                             └─────────────┘
```

### 4. Crisis Response Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Detection  │────▶│  Level      │────▶│  Team       │
│  & Alert    │     │  Assessment │     │  Formation  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Playbook   │     │  Communication│
                    │  Execution  │     │  Dispatch   │
                    └─────────────┘     └─────────────┘
                           │                    │
                           └────────┬───────────┘
                                    ▼
                             ┌─────────────┐
                             │  Recovery   │
                             │  & Review   │
                             └─────────────┘
```

## Integration Points

### Internal Integrations

| Module | Integrates With | Integration Type |
|--------|-----------------|------------------|
| Intelligence Core | Cross-Domain, Digital Twin | Event-driven |
| Control Center | All Modules | Dashboard aggregation |
| Cross-Domain | Risk, Observatory | Signal correlation |
| Digital Twin | Forecasting, Scenario | State synchronization |
| Scenario Simulator | Digital Twin, Forecasting | Simulation orchestration |
| Decision Intelligence | Risk, Governance | Approval workflows |
| Agent Orchestration | Workflow, Copilot | Task delegation |
| Workflow Engine | All Modules | Action execution |
| Risk Intelligence | Crisis, Observatory | Early warning |
| Crisis Command | Workflow, Communication | Emergency response |
| Resource Optimization | Forecasting, Digital Twin | Allocation planning |
| Copilot | All Modules | Query routing |
| Memory Fabric | All Modules | Knowledge persistence |
| AI Evaluation | All Modules | Quality monitoring |
| Impact Intelligence | Forecasting, Observatory | ROI calculation |
| Forecasting | Digital Twin, Observatory | Prediction pipeline |
| Observatory | All Modules | Index computation |
| Governance | All Modules | Policy enforcement |
| API & Event Fabric | All Modules | Data distribution |
| Education OS | All Modules | Runtime orchestration |

### External Integrations

| System | Integration | Protocol |
|--------|-------------|----------|
| Supabase | Database, Auth, Storage, Realtime | REST, WebSocket |
| DeepSeek | AI Reasoning, Analysis | API |
| Gemini | AI Generation, Vision | API |
| Money Fusion | Payment Processing | Webhook |
| Mobile App | Push Notifications, Offline Sync | WebSocket |
| Government APIs | Education Statistics | REST |

## Security Model

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────┐
│                   Security Layers                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Supabase   │  │    JWT       │  │    RBAC      │ │
│  │   Auth       │  │   Validation │  │   Enforcement│ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    MFA       │  │   Rate       │  │    Audit     │ │
│  │   Required   │  │   Limiting   │  │    Logging   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Permission Matrix

| Role | Intelligence | Control | Decision | Crisis | Governance |
|------|--------------|---------|----------|--------|------------|
| SUPER_ADMIN | Full | Full | Full | Full | Full |
| ADMIN | Read/Write | Read/Write | Read | Read | Read |
| DIRECTEUR | Read | Read/Write | Request | Respond | Read |
| ENSEIGNANT | Read (Class) | Read (Class) | - | Report | - |
| PARENT | Read (Child) | Read (Child) | - | - | - |
| ELEVE | Read (Self) | Read (Self) | - | - | - |

### Data Protection

- **Encryption at Rest**: AES-256 for sensitive data
- **Encryption in Transit**: TLS 1.3 for all communications
- **RLS Policies**: Row-level security on all tables
- **Audit Logging**: Complete action trail for compliance
- **Data Retention**: Configurable per module (see config)

## Multi-Tenant Architecture

### Tenant Isolation

```
┌─────────────────────────────────────────────────────────┐
│                  Multi-Tenant Layer                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  School A Data    School B Data    School C Data        │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐          │
│  │ students│     │ students│     │ students│          │
│  │ teachers│     │ teachers│     │ teachers│          │
│  │ classes │     │ classes │     │ classes │          │
│  └─────────┘     └─────────┘     └─────────┘          │
│                                                         │
│  All queries filtered by: WHERE school_id = ?          │
│  RLS policies enforce: school_id = auth.school_id()    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Tenant-Aware Operations

Every GEAESIP operation:

1. **Retrieves school_id** from authentication context
2. **Filters queries** with `.eq("school_id", schoolId)`
3. **Enforces RLS** as secondary protection (never primary)
4. **Logs actions** with school_id for audit trail
5. **Enforces quotas** per tenant configuration

## Performance Architecture

### Caching Strategy

| Layer | Cache Type | TTL | Invalidation |
|-------|------------|-----|--------------|
| API Response | Redis | 5 min | Event-driven |
| Database Query | Supabase Cache | 15 min | TTL |
| AI Model Output | Memory | 1 hour | Version change |
| Dashboard KPI | Client | 1 min | Real-time |

### Scaling Considerations

- **Horizontal Scaling**: Stateless services behind load balancer
- **Database Connection Pooling**: Supabase built-in
- **Edge Functions**: Serverless for API endpoints
- **CDN**: Static assets via Vercel Edge Network
- **Real-time**: Supabase WebSocket for live updates

## Error Handling

### Error Categories

| Category | Examples | Response |
|----------|----------|----------|
| Validation | Invalid input, missing fields | 400 Bad Request |
| Authentication | Invalid token, expired session | 401 Unauthorized |
| Authorization | Insufficient permissions | 403 Forbidden |
| Not Found | Resource doesn't exist | 404 Not Found |
| Business Logic | Rule violation, constraint | 422 Unprocessable |
| External Service | AI model failure, payment error | 502 Bad Gateway |
| System | Database error, timeout | 500 Internal Server |

### Error Recovery

- **Automatic Retry**: Transient failures (network, timeout)
- **Circuit Breaker**: External service failures
- **Fallback Values**: AI model unavailability
- **Graceful Degradation**: Non-critical feature failures
- **Alerting**: Critical system failures