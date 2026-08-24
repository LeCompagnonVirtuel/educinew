# GEDKIN AI Agent Network Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The AI Agent Network (Module 8) orchestrates specialized AI agents for research, data analysis, policy, curriculum, student intelligence, teacher intelligence, finance, infrastructure, government, compliance, global education, knowledge graph, forecasting, and observatory tasks.

---

## Data Model

### GedkinAIAgent

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `type` | enum | Agent type |
| `name` | string | Agent name (1-200 chars) |
| `description` | string | Agent description (max 2000) |
| `status` | enum | ACTIVE, INACTIVE, ERROR, MAINTENANCE |
| `capabilities` | string[] | Agent capabilities |
| `config` | JSONB | Agent configuration |
| `lastActiveAt` | ISO 8601 | Last activity timestamp |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinAgentTask

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `agentId` | UUID | Assigned agent |
| `type` | string | Task type |
| `input` | JSONB | Task input data |
| `output` | JSONB | Task output data |
| `status` | enum | Task lifecycle status |
| `priority` | enum | LOW, MEDIUM, HIGH, CRITICAL |
| `startedAt` | ISO 8601 | Start timestamp |
| `completedAt` | ISO 8601 | Completion timestamp |
| `error` | string | Error message if failed |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinAgentMessage

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `taskId` | UUID | Task reference |
| `fromAgentId` | UUID | Sender agent |
| `toAgentId` | UUID | Receiver agent |
| `content` | string | Message content |
| `type` | string | Message type |
| `timestamp` | ISO 8601 | Send timestamp |

### GedkinToolCall

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `agentId` | UUID | Calling agent |
| `taskId` | UUID | Task reference |
| `tool` | string | Tool name |
| `parameters` | JSONB | Tool parameters |
| `result` | JSONB | Tool result |
| `status` | string | Call status |
| `timestamp` | ISO 8601 | Call timestamp |

### GedkinAgentMemory

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `agentId` | UUID | Owner agent |
| `key` | string | Memory key |
| `value` | string | Memory value |
| `ttl` | integer | Time-to-live (seconds) |
| `expiresAt` | ISO 8601 | Expiration timestamp |

---

## Agent Types

| Type | Description | Capabilities |
|------|-------------|--------------|
| `RESEARCH` | Research analysis | Literature review, trend analysis |
| `DATA_ANALYST` | Data processing | Statistics, visualization, reporting |
| `POLICY` | Policy analysis | Recommendation, simulation |
| `CURRICULUM` | Curriculum management | Mapping, gap analysis |
| `STUDENT_INTELLIGENCE` | Student analytics | Performance, at-risk, learning paths |
| `TEACHER_INTELLIGENCE` | Teacher analytics | Effectiveness, workload |
| `FINANCE_INTELLIGENCE` | Financial analytics | Budget, forecasting |
| `INFRASTRUCTURE` | Facility analytics | Capacity, maintenance |
| `GOVERNMENT` | Government reporting | Compliance, submissions |
| `COMPLIANCE` | Regulatory compliance | Audit, violation detection |
| `GLOBAL_EDUCATION` | Cross-country analysis | Benchmarking, trends |
| `KNOWLEDGE_GRAPH` | Graph operations | Traversal, entity resolution |
| `FORECASTING` | Predictive analytics | Model training, inference |
| `OBSERVATORY` | Indicator tracking | Monitoring, alerts |

---

## Task Lifecycle

```
PENDING → RUNNING → COMPLETED
                    → FAILED → (retry) → RUNNING
                              → (max retries) → FAILED
```

### Task Priorities

| Priority | Queue Position | Timeout |
|----------|---------------|---------|
| CRITICAL | First | 300s |
| HIGH | Second | 300s |
| MEDIUM | Third | 300s |
| LOW | Last | 300s |

---

## Agent Communication

### Message Types

| Type | Description |
|------|-------------|
| `REQUEST` | Requesting information or action |
| `RESPONSE` | Responding to a request |
| `NOTIFICATION` | Broadcasting information |
| `DELEGATION` | Delegating a subtask |

### Inter-Agent Protocols

```
Agent A → Message → Agent B
         ← Response ←
         → Delegation → Agent C
                       ← Response ←
         ← Aggregated Response ←
```

---

## Tool System

### Available Tools

| Tool | Description |
|------|-------------|
| `query_database` | Execute read-only SQL |
| `search_semantic` | Semantic vector search |
| `traverse_graph` | Graph traversal |
| `generate_forecast` | Run forecast model |
| `simulate_policy` | Policy simulation |
| `generate_report` | Report generation |
| `send_notification` | User notification |
| `log_audit` | Audit trail entry |

### Tool Authorization

All tool calls require:
1. Agent capability validation
2. Tool permission check
3. Rate limit enforcement
4. Audit logging

---

## Memory System

### Memory Types

| Type | TTL | Description |
|------|-----|-------------|
| `SHORT_TERM` | 300s | Current task context |
| `WORKING` | 3600s | Active session memory |
| `LONG_TERM` | 86400s | Persistent insights |
| `EPHEMERAL` | 60s | Immediate context |

### Memory Operations

| Operation | Description |
|-----------|-------------|
| `SET` | Store key-value pair |
| `GET` | Retrieve value by key |
| `DELETE` | Remove key-value pair |
| `EXPIRE` | Set TTL on existing key |

---

## Configuration

```typescript
export const gedkinAgentConfig = {
  enabled: true,
  supportedAgentTypes: [
    'RESEARCH', 'DATA_ANALYST', 'POLICY', 'CURRICULUM',
    'STUDENT_INTELLIGENCE', 'TEACHER_INTELLIGENCE', 'FINANCE_INTELLIGENCE',
    'INFRASTRUCTURE', 'GOVERNMENT', 'COMPLIANCE', 'GLOBAL_EDUCATION',
    'KNOWLEDGE_GRAPH', 'FORECASTING', 'OBSERVATORY'
  ],
  maxAgentsPerSchool: 20,
  maxConcurrentTasks: 10,
  taskTimeoutSeconds: 300,
  humanInTheLoopRequired: true,
  confidenceThreshold: 0.7,
  memoryTtlSeconds: 3600,
  auditAllAgentActions: true,
  toolAuthorizationRequired: true,
};
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinAgentNotFoundError` | GEDKIN_AGENT_NOT_FOUND | 404 |
| `GedkinAgentError` | GEDKIN_AGENT | 500 |
| `GedkinAgentInactiveError` | GEDKIN_AGENT_INACTIVE | 400 |
| `GedkinTaskNotFoundError` | GEDKIN_TASK_NOT_FOUND | 404 |
| `GedkinTaskError` | GEDKIN_TASK | 500 |
| `GedkinTaskFailedError` | GEDKIN_TASK_FAILED | 500 |
| `GedkinToolCallError` | GEDKIN_TOOL_CALL | 500 |
| `GedkinAgentMemoryError` | GEDKIN_AGENT_MEMORY | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_COPILOT.md](GEDKIN_COPILOT.md)
- [AI_OS.md](AI_OS.md)
