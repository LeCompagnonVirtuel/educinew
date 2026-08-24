# GEAESIP API Reference

## Overview

All GEAESIP API endpoints follow REST conventions with consistent request/response patterns. All endpoints require authentication and are tenant-isolated via `schoolId`.

## Authentication

All API requests must include:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Common Response Patterns

### Success Response
```json
{
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

### Pagination Response
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Rate Limiting

| Tier | Requests/Minute | Burst |
|------|-----------------|-------|
| Basic | 100 | 20 |
| Standard | 500 | 50 |
| Enterprise | 1000 | 100 |

---

## Module 1: Intelligence Core

### Endpoints

#### List Intelligence Cores
```http
GET /api/geaesip/intelligence-core?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "name": "Main Intelligence",
      "level": "ADVANCED",
      "score": 85.5,
      "components": {
        "reasoning": 90,
        "prediction": 80,
        "fusion": 85
      },
      "lastComputedAt": "2024-01-15T10:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Intelligence Core
```http
GET /api/geaesip/intelligence-core/{id}?schoolId={schoolId}
```

#### Create Intelligence Core
```http
POST /api/geaesip/intelligence-core
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "name": "Main Intelligence",
  "level": "ADVANCED",
  "score": 85.5,
  "components": {
    "reasoning": 90,
    "prediction": 80
  }
}
```

#### Update Intelligence Core
```http
PUT /api/geaesip/intelligence-core/{id}
```

#### Delete Intelligence Core
```http
DELETE /api/geaesip/intelligence-core/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Knowledge Fusion
```http
GET /api/geaesip/intelligence-core/fusion?schoolId={schoolId}
POST /api/geaesip/intelligence-core/fusion
```

#### Cross-Domain Signals
```http
GET /api/geaesip/intelligence-core/signals?schoolId={schoolId}
POST /api/geaesip/intelligence-core/signals
```

#### Causal Relationships
```http
GET /api/geaesip/intelligence-core/causal?schoolId={schoolId}
POST /api/geaesip/intelligence-core/causal
```

#### System Health Scores
```http
GET /api/geaesip/intelligence-core/health?schoolId={schoolId}
POST /api/geaesip/intelligence-core/health
```

---

## Module 2: Control Center

### Endpoints

#### List Control Centers
```http
GET /api/geaesip/control-center?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "type": "EXECUTIVE",
      "name": "Executive Dashboard",
      "kpis": {
        "enrollment": 1250,
        "performance": 85,
        "budget": 950000
      },
      "alerts": [],
      "status": "ACTIVE",
      "config": {},
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Control Center
```http
GET /api/geaesip/control-center/{id}?schoolId={schoolId}
```

#### Create Control Center
```http
POST /api/geaesip/control-center
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "type": "EXECUTIVE",
  "name": "Executive Dashboard",
  "kpis": {
    "enrollment": 1250,
    "performance": 85
  },
  "status": "ACTIVE",
  "config": {}
}
```

#### Update Control Center
```http
PUT /api/geaesip/control-center/{id}
```

#### Delete Control Center
```http
DELETE /api/geaesip/control-center/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Executive Cockpit
```http
GET /api/geaesip/control-center/executive?schoolId={schoolId}
POST /api/geaesip/control-center/executive
```

#### Alerts
```http
GET /api/geaesip/control-center/alerts?schoolId={schoolId}
POST /api/geaesip/control-center/alerts
PUT /api/geaesip/control-center/alerts/{id}/acknowledge
```

#### Decision Queue
```http
GET /api/geaesip/control-center/decisions?schoolId={schoolId}
POST /api/geaesip/control-center/decisions
```

---

## Module 3: Cross-Domain Intelligence

### Endpoints

#### List Cross-Domain Events
```http
GET /api/geaesip/cross-domain?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "domain": "ACADEMIC",
      "eventType": "PERFORMANCE_DROP",
      "severity": "MEDIUM",
      "metadata": {
        "subject": "Mathematics",
        "gradeLevel": "10"
      },
      "timestamp": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Cross-Domain Event
```http
GET /api/geaesip/cross-domain/{id}?schoolId={schoolId}
```

#### Create Cross-Domain Event
```http
POST /api/geaesip/cross-domain
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "domain": "ACADEMIC",
  "eventType": "PERFORMANCE_DROP",
  "severity": "MEDIUM",
  "metadata": {
    "subject": "Mathematics"
  }
}
```

#### Update Cross-Domain Event
```http
PUT /api/geaesip/cross-domain/{id}
```

#### Delete Cross-Domain Event
```http
DELETE /api/geaesip/cross-domain/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Correlations
```http
GET /api/geaesip/cross-domain/correlations?schoolId={schoolId}
POST /api/geaesip/cross-domain/correlations
```

#### Impact Chains
```http
GET /api/geaesip/cross-domain/impacts?schoolId={schoolId}
POST /api/geaesip/cross-domain/impacts
```

#### Systemic Risks
```http
GET /api/geaesip/cross-domain/risks?schoolId={schoolId}
POST /api/geaesip/cross-domain/risks
```

#### Dependency Graphs
```http
GET /api/geaesip/cross-domain/dependencies?schoolId={schoolId}
POST /api/geaesip/cross-domain/dependencies
```

---

## Module 4: Digital Twin 2.0

### Endpoints

#### List Digital Twins
```http
GET /api/geaesip/digital-twin?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "name": "School Digital Twin",
      "entityTypes": ["STUDENT", "TEACHER", "CLASS"],
      "syncStatus": "SYNCED",
      "lastSyncedAt": "2024-01-15T10:00:00Z",
      "state": {},
      "config": {},
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Digital Twin
```http
GET /api/geaesip/digital-twin/{id}?schoolId={schoolId}
```

#### Create Digital Twin
```http
POST /api/geaesip/digital-twin
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "name": "School Digital Twin",
  "entityTypes": ["STUDENT", "TEACHER", "CLASS"],
  "syncStatus": "SYNCED",
  "state": {},
  "config": {}
}
```

#### Update Digital Twin
```http
PUT /api/geaesip/digital-twin/{id}
```

#### Delete Digital Twin
```http
DELETE /api/geaesip/digital-twin/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Twin States
```http
GET /api/geaesip/digital-twin/{twinId}/states?schoolId={schoolId}
POST /api/geaesip/digital-twin/{twinId}/states
```

#### Twin Simulations
```http
GET /api/geaesip/digital-twin/{twinId}/simulations?schoolId={schoolId}
POST /api/geaesip/digital-twin/{twinId}/simulations
```

---

## Module 5: Scenario Simulator

### Endpoints

#### List Scenarios
```http
GET /api/geaesip/scenario?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "name": "Budget Increase Impact",
      "type": "BUDGET_INCREASE",
      "description": "Simulate 20% budget increase",
      "status": "COMPLETED",
      "assumptions": {},
      "variables": {},
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Scenario
```http
GET /api/geaesip/scenario/{id}?schoolId={schoolId}
```

#### Create Scenario
```http
POST /api/geaesip/scenario
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "name": "Budget Increase Impact",
  "type": "BUDGET_INCREASE",
  "description": "Simulate 20% budget increase",
  "status": "DRAFT",
  "assumptions": {},
  "variables": {}
}
```

#### Update Scenario
```http
PUT /api/geaesip/scenario/{id}
```

#### Delete Scenario
```http
DELETE /api/geaesip/scenario/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Scenario Runs
```http
GET /api/geaesip/scenario/{scenarioId}/runs?schoolId={schoolId}
POST /api/geaesip/scenario/{scenarioId}/runs
```

#### Scenario Comparisons
```http
GET /api/geaesip/scenario/comparisons?schoolId={schoolId}
POST /api/geaesip/scenario/comparisons
```

---

## Module 6: Decision Intelligence

### Endpoints

#### List Decisions
```http
GET /api/geaesip/decision?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "type": "ACADEMIC",
      "title": "Curriculum Reform",
      "description": "Implement new curriculum",
      "options": [],
      "selectedOption": null,
      "risk": "MEDIUM",
      "confidence": 0.85,
      "evidence": [],
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Decision
```http
GET /api/geaesip/decision/{id}?schoolId={schoolId}
```

#### Create Decision
```http
POST /api/geaesip/decision
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "type": "ACADEMIC",
  "title": "Curriculum Reform",
  "description": "Implement new curriculum",
  "options": [
    {
      "id": "uuid",
      "title": "Option A",
      "description": "Phased implementation",
      "pros": ["Lower risk"],
      "cons": ["Slower"],
      "cost": 50000,
      "impact": 7,
      "probability": 0.9,
      "score": 8.5
    }
  ],
  "risk": "MEDIUM",
  "confidence": 0.85,
  "evidence": []
}
```

#### Update Decision
```http
PUT /api/geaesip/decision/{id}
```

#### Delete Decision
```http
DELETE /api/geaesip/decision/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Decision Approvals
```http
GET /api/geaesip/decision/{decisionId}/approvals?schoolId={schoolId}
POST /api/geaesip/decision/{decisionId}/approvals
```

#### Decision Audit
```http
GET /api/geaesip/decision/{decisionId}/audit?schoolId={schoolId}
POST /api/geaesip/decision/{decisionId}/audit
```

---

## Module 7: Agent Orchestration

### Endpoints

#### List Agents
```http
GET /api/geaesip/agents?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "category": "ACADEMIC",
      "name": "Academic Advisor Agent",
      "description": "Provides academic guidance",
      "status": "ACTIVE",
      "capabilities": ["ANALYSIS", "RECOMMENDATION"],
      "tools": ["DATA_QUERY", "REPORT_GENERATION"],
      "config": {},
      "lastActiveAt": "2024-01-15T10:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Agent
```http
GET /api/geaesip/agents/{id}?schoolId={schoolId}
```

#### Create Agent
```http
POST /api/geaesip/agents
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "category": "ACADEMIC",
  "name": "Academic Advisor Agent",
  "description": "Provides academic guidance",
  "status": "ACTIVE",
  "capabilities": ["ANALYSIS", "RECOMMENDATION"],
  "tools": ["DATA_QUERY", "REPORT_GENERATION"],
  "config": {}
}
```

#### Update Agent
```http
PUT /api/geaesip/agents/{id}
```

#### Delete Agent
```http
DELETE /api/geaesip/agents/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Agent Missions
```http
GET /api/geaesip/agents/missions?schoolId={schoolId}
POST /api/geaesip/agents/missions
```

#### Agent Votes
```http
GET /api/geaesip/agents/missions/{missionId}/votes?schoolId={schoolId}
POST /api/geaesip/agents/missions/{missionId}/votes
```

#### Agent Negotiations
```http
GET /api/geaesip/agents/missions/{missionId}/negotiations?schoolId={schoolId}
POST /api/geaesip/agents/missions/{missionId}/negotiations
```

---

## Module 8: Workflow Engine

### Endpoints

#### List Workflows
```http
GET /api/geaesip/workflow?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "name": "Student Enrollment",
      "description": "Automated enrollment process",
      "tasks": [],
      "dependencies": [],
      "status": "ACTIVE",
      "trigger": {},
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Workflow
```http
GET /api/geaesip/workflow/{id}?schoolId={schoolId}
```

#### Create Workflow
```http
POST /api/geaesip/workflow
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "name": "Student Enrollment",
  "description": "Automated enrollment process",
  "tasks": [
    {
      "id": "uuid",
      "name": "Validate Documents",
      "type": "API",
      "assignee": null,
      "parameters": {},
      "maxRetries": 3
    }
  ],
  "dependencies": [],
  "status": "DRAFT",
  "trigger": {}
}
```

#### Update Workflow
```http
PUT /api/geaesip/workflow/{id}
```

#### Delete Workflow
```http
DELETE /api/geaesip/workflow/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Workflow Tasks
```http
GET /api/geaesip/workflow/{workflowId}/tasks?schoolId={schoolId}
POST /api/geaesip/workflow/{workflowId}/tasks
```

#### Action Plans
```http
GET /api/geaesip/workflow/action-plans?schoolId={schoolId}
POST /api/geaesip/workflow/action-plans
```

#### Execution Logs
```http
GET /api/geaesip/workflow/executions?schoolId={schoolId}
POST /api/geaesip/workflow/executions
```

---

## Module 9: Risk & Resilience

### Endpoints

#### List Risks
```http
GET /api/geaesip/risk?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "name": "Cyber Attack Risk",
      "category": "CYBER",
      "description": "Risk of data breach",
      "probability": 0.3,
      "impact": 8,
      "score": 2.4,
      "status": "MITIGATING",
      "owner": "uuid",
      "mitigations": ["Implement MFA", "Regular audits"],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Risk
```http
GET /api/geaesip/risk/{id}?schoolId={schoolId}
```

#### Create Risk
```http
POST /api/geaesip/risk
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "name": "Cyber Attack Risk",
  "category": "CYBER",
  "description": "Risk of data breach",
  "probability": 0.3,
  "impact": 8,
  "score": 2.4,
  "status": "IDENTIFIED",
  "owner": "uuid",
  "mitigations": []
}
```

#### Update Risk
```http
PUT /api/geaesip/risk/{id}
```

#### Delete Risk
```http
DELETE /api/geaesip/risk/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Risk Matrix
```http
GET /api/geaesip/risk/matrix?schoolId={schoolId}
POST /api/geaesip/risk/matrix
```

#### Early Warnings
```http
GET /api/geaesip/risk/warnings?schoolId={schoolId}
POST /api/geaesip/risk/warnings
```

#### Mitigation Plans
```http
GET /api/geaesip/risk/mitigations?schoolId={schoolId}
POST /api/geaesip/risk/mitigations
```

---

## Module 10: Crisis Command

### Endpoints

#### List Crises
```http
GET /api/geaesip/crisis?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "type": "CYBER_ATTACK",
      "level": "LEVEL_3",
      "title": "Ransomware Attack",
      "description": "Active ransomware incident",
      "phase": "RESPONSE",
      "status": "MANAGED",
      "commander": "uuid",
      "timeline": [],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T12:00:00Z"
    }
  ]
}
```

#### Get Crisis
```http
GET /api/geaesip/crisis/{id}?schoolId={schoolId}
```

#### Create Crisis
```http
POST /api/geaesip/crisis
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "type": "CYBER_ATTACK",
  "level": "LEVEL_3",
  "title": "Ransomware Attack",
  "description": "Active ransomware incident",
  "phase": "DETECTION",
  "status": "OPEN",
  "commander": "uuid"
}
```

#### Update Crisis
```http
PUT /api/geaesip/crisis/{id}
```

#### Delete Crisis
```http
DELETE /api/geaesip/crisis/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Crisis Teams
```http
GET /api/geaesip/crisis/{crisisId}/teams?schoolId={schoolId}
POST /api/geaesip/crisis/{crisisId}/teams
```

#### Crisis Playbooks
```http
GET /api/geaesip/crisis/playbooks?schoolId={schoolId}
POST /api/geaesip/crisis/playbooks
```

#### Emergency Communications
```http
GET /api/geaesip/crisis/{crisisId}/communications?schoolId={schoolId}
POST /api/geaesip/crisis/{crisisId}/communications
```

---

## Module 11: Resource Optimization

### Endpoints

#### List Resource Forecasts
```http
GET /api/geaesip/resource?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "resourceType": "TEACHER",
      "current": 50,
      "predicted": 55,
      "gap": 5,
      "period": "2024-Q2",
      "model": "ARIMA",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Resource Forecast
```http
GET /api/geaesip/resource/{id}?schoolId={schoolId}
```

#### Create Resource Forecast
```http
POST /api/geaesip/resource
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "resourceType": "TEACHER",
  "current": 50,
  "predicted": 55,
  "gap": 5,
  "period": "2024-Q2",
  "model": "ARIMA"
}
```

#### Update Resource Forecast
```http
PUT /api/geaesip/resource/{id}
```

#### Delete Resource Forecast
```http
DELETE /api/geaesip/resource/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Allocation Plans
```http
GET /api/geaesip/resource/allocations?schoolId={schoolId}
POST /api/geaesip/resource/allocations
```

#### Optimization Results
```http
GET /api/geaesip/resource/optimizations?schoolId={schoolId}
POST /api/geaesip/resource/optimizations
```

---

## Module 12: Copilot 2.0

### Endpoints

#### List Copilot Sessions
```http
GET /api/geaesip/copilot?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "userId": "uuid",
      "mode": "TEXT",
      "queries": [],
      "context": {},
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Copilot Session
```http
GET /api/geaesip/copilot/{id}?schoolId={schoolId}
```

#### Create Copilot Session
```http
POST /api/geaesip/copilot
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "userId": "uuid",
  "mode": "TEXT",
  "queries": [],
  "context": {},
  "status": "ACTIVE"
}
```

#### Update Copilot Session
```http
PUT /api/geaesip/copilot/{id}
```

#### Delete Copilot Session
```http
DELETE /api/geaesip/copilot/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Copilot Answers
```http
GET /api/geaesip/copilot/{sessionId}/answers?schoolId={schoolId}
POST /api/geaesip/copilot/{sessionId}/answers
```

#### Copilot Explanations
```http
GET /api/geaesip/copilot/{sessionId}/explanations?schoolId={schoolId}
POST /api/geaesip/copilot/{sessionId}/explanations
```

---

## Module 13: Memory Fabric

### Endpoints

#### List Memory Entries
```http
GET /api/geaesip/memory?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "type": "INSTITUTION",
      "category": "SEMANTIC",
      "key": "enrollment_policy",
      "value": {},
      "source": "policy_document",
      "confidence": 0.95,
      "ttl": 365,
      "expiresAt": "2025-01-15T10:00:00Z",
      "provenance": [],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Memory Entry
```http
GET /api/geaesip/memory/{id}?schoolId={schoolId}
```

#### Create Memory Entry
```http
POST /api/geaesip/memory
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "type": "INSTITUTION",
  "category": "SEMANTIC",
  "key": "enrollment_policy",
  "value": {},
  "source": "policy_document",
  "confidence": 0.95,
  "ttl": 365,
  "provenance": []
}
```

#### Update Memory Entry
```http
PUT /api/geaesip/memory/{id}
```

#### Delete Memory Entry
```http
DELETE /api/geaesip/memory/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Memory Retrieval
```http
POST /api/geaesip/memory/retrieve
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "query": "enrollment policy",
  "limit": 10
}
```

#### Memory Policies
```http
GET /api/geaesip/memory/policies?schoolId={schoolId}
POST /api/geaesip/memory/policies
```

---

## Module 14: AI Evaluation

### Endpoints

#### List AI Evaluations
```http
GET /api/geaesip/evaluation?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "type": "MODEL",
      "targetId": "uuid",
      "metrics": {
        "accuracy": 0.92,
        "latency": 150
      },
      "score": 0.88,
      "status": "COMPLETED",
      "findings": [],
      "recommendations": [],
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get AI Evaluation
```http
GET /api/geaesip/evaluation/{id}?schoolId={schoolId}
```

#### Create AI Evaluation
```http
POST /api/geaesip/evaluation
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "type": "MODEL",
  "targetId": "uuid",
  "metrics": {
    "accuracy": 0.92,
    "latency": 150
  },
  "score": 0.88,
  "status": "PENDING",
  "findings": [],
  "recommendations": []
}
```

#### Update AI Evaluation
```http
PUT /api/geaesip/evaluation/{id}
```

#### Delete AI Evaluation
```http
DELETE /api/geaesip/evaluation/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Model Evaluations
```http
GET /api/geaesip/evaluation/models?schoolId={schoolId}
POST /api/geaesip/evaluation/models
```

#### Agent Evaluations
```http
GET /api/geaesip/evaluation/agents?schoolId={schoolId}
POST /api/geaesip/evaluation/agents
```

---

## Module 15: Impact Intelligence

### Endpoints

#### List Impact Models
```http
GET /api/geaesip/impact?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "type": "EDUCATION_ROI",
      "name": "Education ROI Calculator",
      "formula": "revenue / cost",
      "inputs": {},
      "outputs": {},
      "validated": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Impact Model
```http
GET /api/geaesip/impact/{id}?schoolId={schoolId}
```

#### Create Impact Model
```http
POST /api/geaesip/impact
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "type": "EDUCATION_ROI",
  "name": "Education ROI Calculator",
  "formula": "revenue / cost",
  "inputs": {},
  "outputs": {},
  "validated": false
}
```

#### Update Impact Model
```http
PUT /api/geaesip/impact/{id}
```

#### Delete Impact Model
```http
DELETE /api/geaesip/impact/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Impact Results
```http
GET /api/geaesip/impact/results?schoolId={schoolId}
POST /api/geaesip/impact/results
```

#### Economic Forecasts
```http
GET /api/geaesip/impact/forecasts?schoolId={schoolId}
POST /api/geaesip/impact/forecasts
```

#### Human Capital Index
```http
GET /api/geaesip/impact/human-capital?schoolId={schoolId}
POST /api/geaesip/impact/human-capital
```

---

## Module 16: Forecasting 2.0

### Endpoints

#### List Forecasts
```http
GET /api/geaesip/forecasting?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "domain": "ENROLLMENT",
      "method": "ARIMA",
      "horizon": "MEDIUM_TERM",
      "predictions": [
        {
          "date": "2024-06-01",
          "value": 1300,
          "lower": 1250,
          "upper": 1350
        }
      ],
      "confidence": 0.85,
      "backtesting": null,
      "drift": null,
      "version": 1,
      "createdAt": "2024-01-15T10:00:00Z",
      "completedAt": "2024-01-15T10:05:00Z"
    }
  ]
}
```

#### Get Forecast
```http
GET /api/geaesip/forecasting/{id}?schoolId={schoolId}
```

#### Create Forecast
```http
POST /api/geaesip/forecasting
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "domain": "ENROLLMENT",
  "method": "ARIMA",
  "horizon": "MEDIUM_TERM"
}
```

#### Update Forecast
```http
PUT /api/geaesip/forecasting/{id}
```

#### Delete Forecast
```http
DELETE /api/geaesip/forecasting/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Forecast Backtests
```http
GET /api/geaesip/forecasting/{forecastId}/backtests?schoolId={schoolId}
POST /api/geaesip/forecasting/{forecastId}/backtests
```

#### Model Drift
```http
GET /api/geaesip/forecasting/drift?schoolId={schoolId}
POST /api/geaesip/forecasting/drift
```

---

## Module 17: Observatory 2.0

### Endpoints

#### List Composite Indices
```http
GET /api/geaesip/observatory?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "type": "GLOBAL_EDUCATION",
      "name": "Global Education Index",
      "score": 78.5,
      "components": [
        {
          "name": "Enrollment Rate",
          "weight": 0.3,
          "value": 85
        }
      ],
      "weights": {},
      "period": "2024-Q1",
      "version": 1,
      "computedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Composite Index
```http
GET /api/geaesip/observatory/{id}?schoolId={schoolId}
```

#### Create Composite Index
```http
POST /api/geaesip/observatory
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "type": "GLOBAL_EDUCATION",
  "name": "Global Education Index",
  "score": 78.5,
  "components": [
    {
      "name": "Enrollment Rate",
      "weight": 0.3,
      "value": 85
    }
  ],
  "weights": {},
  "period": "2024-Q1",
  "version": 1
}
```

#### Update Composite Index
```http
PUT /api/geaesip/observatory/{id}
```

#### Delete Composite Index
```http
DELETE /api/geaesip/observatory/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Observatory Indicators
```http
GET /api/geaesip/observatory/indicators?schoolId={schoolId}
POST /api/geaesip/observatory/indicators
```

#### Observatory Trends
```http
GET /api/geaesip/observatory/trends?schoolId={schoolId}
POST /api/geaesip/observatory/trends
```

---

## Module 18: Governance & Ethics

### Endpoints

#### List Governance Policies
```http
GET /api/geaesip/governance?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "domain": "AI",
      "name": "AI Ethics Policy",
      "rules": [
        {
          "rule": "No bias in algorithms",
          "description": "AI models must be bias-free",
          "severity": "HIGH"
        }
      ],
      "enforcementLevel": "MANDATORY",
      "enabled": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Governance Policy
```http
GET /api/geaesip/governance/{id}?schoolId={schoolId}
```

#### Create Governance Policy
```http
POST /api/geaesip/governance
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "domain": "AI",
  "name": "AI Ethics Policy",
  "rules": [
    {
      "rule": "No bias in algorithms",
      "description": "AI models must be bias-free",
      "severity": "HIGH"
    }
  ],
  "enforcementLevel": "MANDATORY",
  "enabled": true
}
```

#### Update Governance Policy
```http
PUT /api/geaesip/governance/{id}
```

#### Delete Governance Policy
```http
DELETE /api/geaesip/governance/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Governance Audits
```http
GET /api/geaesip/governance/audits?schoolId={schoolId}
POST /api/geaesip/governance/audits
```

#### Ethics Reviews
```http
GET /api/geaesip/governance/ethics?schoolId={schoolId}
POST /api/geaesip/governance/ethics
```

#### Bias Reviews
```http
GET /api/geaesip/governance/bias?schoolId={schoolId}
POST /api/geaesip/governance/bias
```

---

## Module 19: API & Event Fabric

### Endpoints

#### List Intelligence APIs
```http
GET /api/geaesip/api-fabric?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "name": "Education Analytics API",
      "version": "1.0.0",
      "endpoints": [
        {
          "path": "/analytics/enrollment",
          "method": "GET",
          "description": "Get enrollment analytics"
        }
      ],
      "auth": {
        "type": "API_KEY",
        "config": {}
      },
      "rateLimit": {
        "requests": 1000,
        "window": 60
      },
      "quota": {
        "daily": 10000,
        "monthly": 300000
      },
      "enabled": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Intelligence API
```http
GET /api/geaesip/api-fabric/{id}?schoolId={schoolId}
```

#### Create Intelligence API
```http
POST /api/geaesip/api-fabric
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "name": "Education Analytics API",
  "version": "1.0.0",
  "endpoints": [
    {
      "path": "/analytics/enrollment",
      "method": "GET",
      "description": "Get enrollment analytics"
    }
  ],
  "auth": {
    "type": "API_KEY",
    "config": {}
  },
  "rateLimit": {
    "requests": 1000,
    "window": 60
  },
  "quota": {
    "daily": 10000,
    "monthly": 300000
  },
  "enabled": true
}
```

#### Update Intelligence API
```http
PUT /api/geaesip/api-fabric/{id}
```

#### Delete Intelligence API
```http
DELETE /api/geaesip/api-fabric/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Event Bus
```http
GET /api/geaesip/api-fabric/events?schoolId={schoolId}
POST /api/geaesip/api-fabric/events
```

#### Event Subscriptions
```http
GET /api/geaesip/api-fabric/subscriptions?schoolId={schoolId}
POST /api/geaesip/api-fabric/subscriptions
```

#### API Usage
```http
GET /api/geaesip/api-fabric/usage?schoolId={schoolId}
```

---

## Module 20: Education OS

### Endpoints

#### List Education Runtimes
```http
GET /api/geaesip/runtime?schoolId={schoolId}
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "uuid",
      "name": "Main Education Runtime",
      "phase": "INTELLIGENCE",
      "status": "RUNNING",
      "config": {},
      "metrics": {
        "uptime": 99.9,
        "tasks_completed": 1500
      },
      "lastRunAt": "2024-01-15T10:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Education Runtime
```http
GET /api/geaesip/runtime/{id}?schoolId={schoolId}
```

#### Create Education Runtime
```http
POST /api/geaesip/runtime
```

**Request Body:**
```json
{
  "schoolId": "uuid",
  "name": "Main Education Runtime",
  "phase": "DATA",
  "status": "RUNNING",
  "config": {},
  "metrics": {}
}
```

#### Update Education Runtime
```http
PUT /api/geaesip/runtime/{id}
```

#### Delete Education Runtime
```http
DELETE /api/geaesip/runtime/{id}?schoolId={schoolId}
```

### Related Endpoints

#### Runtime Executions
```http
GET /api/geaesip/runtime/{runtimeId}/executions?schoolId={schoolId}
POST /api/geaesip/runtime/{runtimeId}/executions
```

#### Runtime Metrics
```http
GET /api/geaesip/runtime/{runtimeId}/metrics?schoolId={schoolId}
POST /api/geaesip/runtime/{runtimeId}/metrics
```