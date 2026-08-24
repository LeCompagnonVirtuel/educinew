# GEAESIP Data Model

## Overview

The GEAESIP data model follows EduCI's multi-tenant architecture with `school_id` isolation on all tables. All tables include standard audit fields (`created_at`, `updated_at`, `deleted_at`) and enforce Row Level Security (RLS).

## Common Fields

Every GEAESIP table includes:

```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
school_id       UUID NOT NULL REFERENCES schools(id)
created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
deleted_at      TIMESTAMPTZ
```

## Table Summary

| Module | Tables | Primary Entity |
|--------|--------|----------------|
| 1. Intelligence Core | 5 | Intelligence scores, fusion, signals, causal, health |
| 2. Control Center | 4 | Dashboards, cockpits, alerts, decision queues |
| 3. Cross-Domain | 5 | Events, correlations, impacts, systemic risks, dependencies |
| 4. Digital Twin | 3 | Twins, states, simulations |
| 5. Scenario Simulator | 3 | Scenarios, runs, comparisons |
| 6. Decision Intelligence | 3 | Decisions, approvals, audits |
| 7. Agent Orchestration | 4 | Agents, missions, votes, negotiations |
| 8. Workflow Engine | 4 | Workflows, tasks, action plans, execution logs |
| 9. Risk & Resilience | 4 | Risks, matrices, warnings, mitigations |
| 10. Crisis Command | 5 | Crises, teams, playbooks, timelines, communications |
| 11. Resource Optimization | 3 | Forecasts, allocations, optimizations |
| 12. Copilot 2.0 | 3 | Sessions, answers, explanations |
| 13. Memory Fabric | 3 | Memories, retrievals, policies |
| 14. AI Evaluation | 3 | Evaluations, model evals, agent evals |
| 15. Impact Intelligence | 4 | Models, results, forecasts, human capital |
| 16. Forecasting 2.0 | 3 | Forecasts, backtests, drift |
| 17. Observatory 2.0 | 3 | Indices, indicators, trends |
| 18. Governance & Ethics | 4 | Policies, audits, ethics reviews, bias reviews |
| 19. API & Event Fabric | 4 | APIs, event buses, subscriptions, usage |
| 20. Education OS | 3 | Runtimes, executions, metrics |

## Module 1: Intelligence Core

### geaesip_intelligence_cores

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() |
| school_id | UUID | FK -> schools(id), NOT NULL |
| name | VARCHAR(255) | NOT NULL |
| level | VARCHAR(20) | CHECK (BASIC, STANDARD, ADVANCED, SUPER, OMNISCIENT) |
| score | DECIMAL(5,2) | CHECK (0-100) |
| components | JSONB | DEFAULT '{}' |
| last_computed_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() |
| deleted_at | TIMESTAMPTZ | |

**Indexes:** school_id, level

### geaesip_knowledge_fusions

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| sources | TEXT[] | NOT NULL |
| fused_result | JSONB | NOT NULL |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| timestamp | TIMESTAMPTZ | NOT NULL |

**Indexes:** school_id, timestamp

### geaesip_cross_domain_signals

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| domain | VARCHAR(50) | NOT NULL |
| signal_type | VARCHAR(100) | NOT NULL |
| value | DECIMAL(10,2) | NOT NULL |
| severity | VARCHAR(20) | CHECK (VERY_LOW, LOW, MEDIUM, HIGH, VERY_HIGH) |
| metadata | JSONB | DEFAULT '{}' |

**Indexes:** school_id, domain, severity

### geaesip_causal_relationships

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| cause | VARCHAR(255) | NOT NULL |
| effect | VARCHAR(255) | NOT NULL |
| strength | DECIMAL(3,2) | CHECK (0-1) |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| evidence | TEXT[] | NOT NULL |

**Indexes:** school_id, cause, effect

### geaesip_system_health_scores

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| dimension | VARCHAR(100) | NOT NULL |
| score | DECIMAL(5,2) | CHECK (0-100) |
| trend | VARCHAR(20) | CHECK (IMPROVING, STABLE, DECLINING) |
| factors | JSONB | DEFAULT '{}' |

**Indexes:** school_id, dimension

## Module 2: Control Center

### geaesip_control_centers

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | CHECK (EXECUTIVE, NATIONAL, REGIONAL, SCHOOL, CRISIS, FINANCIAL, ACADEMIC, INFRASTRUCTURE, SECURITY, AI) |
| name | VARCHAR(255) | NOT NULL |
| kpis | JSONB | DEFAULT '{}' |
| status | VARCHAR(20) | CHECK (ACTIVE, INACTIVE, MAINTENANCE) |
| config | JSONB | DEFAULT '{}' |

**Indexes:** school_id, type, status

### geaesip_executive_cockpits

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| metrics | JSONB | DEFAULT '{}' |
| trends | JSONB | DEFAULT '{}' |
| risks | TEXT[] | DEFAULT '{}' |
| opportunities | TEXT[] | DEFAULT '{}' |
| period | VARCHAR(50) | NOT NULL |

**Indexes:** school_id, period

### geaesip_alerts

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| severity | VARCHAR(20) | CHECK (INFO, LOW, MEDIUM, HIGH, CRITICAL) |
| title | VARCHAR(255) | NOT NULL |
| message | TEXT | NOT NULL |
| source | VARCHAR(100) | NOT NULL |
| acknowledged | BOOLEAN | DEFAULT FALSE |
| acknowledged_by | UUID | |

**Indexes:** school_id, severity, acknowledged

### geaesip_decision_queues

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| decisions | TEXT[] | NOT NULL |
| priority | INTEGER | CHECK (0-10) |
| status | VARCHAR(20) | CHECK (PENDING, QUEUED, APPROVED, REJECTED, EXECUTING, COMPLETED, FAILED, ROLLED_BACK) |

**Indexes:** school_id, status, priority

## Module 3: Cross-Domain Intelligence

### geaesip_cross_domain_events

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| domain | VARCHAR(20) | CHECK (ACADEMIC, FINANCIAL, OPERATIONAL, SECURITY, INFRASTRUCTURE, HEALTH, SOCIAL, GOVERNMENT, RESEARCH, CLOUD, DATA) |
| event_type | VARCHAR(100) | NOT NULL |
| severity | VARCHAR(20) | CHECK (MINIMAL, LOW, MEDIUM, HIGH, CRITICAL) |
| metadata | JSONB | DEFAULT '{}' |

**Indexes:** school_id, domain, severity

### geaesip_correlations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| domain_a | VARCHAR(20) | NOT NULL |
| domain_b | VARCHAR(20) | NOT NULL |
| strength | VARCHAR(20) | CHECK (WEAK, MODERATE, STRONG, VERY_STRONG) |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| evidence | TEXT[] | NOT NULL |

**Indexes:** school_id, domain_a, domain_b

### geaesip_impact_chains

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| events | TEXT[] | NOT NULL |
| total_impact | DECIMAL(10,2) | NOT NULL |
| propagation_path | TEXT[] | NOT NULL |

**Indexes:** school_id

### geaesip_systemic_risks

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| domains | TEXT[] | NOT NULL |
| probability | DECIMAL(3,2) | CHECK (0-1) |
| impact | DECIMAL(3,2) | CHECK (0-10) |
| score | DECIMAL(3,2) | CHECK (0-10) |
| mitigations | TEXT[] | DEFAULT '{}' |

**Indexes:** school_id

### geaesip_dependency_graphs

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| nodes | JSONB | NOT NULL |
| edges | JSONB | NOT NULL |

**Indexes:** school_id

## Module 4: Digital Twin 2.0

### geaesip_system_twins

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| entity_types | TEXT[] | NOT NULL |
| sync_status | VARCHAR(20) | CHECK (SYNCED, SYNCING, STALE, ERROR) |
| state | JSONB | DEFAULT '{}' |
| config | JSONB | DEFAULT '{}' |

**Indexes:** school_id, sync_status

### geaesip_twin_states

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| twin_id | UUID | FK -> geaesip_system_twins(id) |
| entity_type | VARCHAR(50) | NOT NULL |
| entity_id | UUID | NOT NULL |
| state | JSONB | NOT NULL |
| metrics | JSONB | DEFAULT '{}' |
| relationships | JSONB | DEFAULT '[]' |

**Indexes:** twin_id, (entity_type, entity_id)

### geaesip_twin_simulations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| twin_id | UUID | FK -> geaesip_system_twins(id) |
| mode | VARCHAR(20) | CHECK (REAL_TIME, HISTORICAL, PREDICTIVE, WHAT_IF, INTERVENTION) |
| parameters | JSONB | NOT NULL |
| results | JSONB | DEFAULT '{}' |
| status | VARCHAR(20) | CHECK (PENDING, RUNNING, COMPLETED, FAILED) |

**Indexes:** twin_id, status

## Module 5: Scenario Simulator

### geaesip_scenarios

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| type | VARCHAR(50) | CHECK (REFORM, PROGRAM_CHANGE, FEE_CHANGE, BUDGET_INCREASE, BUDGET_DECREASE, SCHOOL_CREATION, SCHOOL_CLOSURE, MASS_RECRUITMENT, TEACHER_MIGRATION, DEMOGRAPHIC_GROWTH, ECONOMIC_CRISIS, HEALTH_CRISIS, NATURAL_DISASTER, CYBER_ATTACK, CLOUD_OUTAGE, NETWORK_OUTAGE) |
| description | TEXT | NOT NULL |
| status | VARCHAR(20) | CHECK (DRAFT, RUNNING, COMPLETED, FAILED) |
| assumptions | JSONB | DEFAULT '{}' |
| variables | JSONB | DEFAULT '{}' |

**Indexes:** school_id, type, status

### geaesip_scenario_runs

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| scenario_id | UUID | FK -> geaesip_scenarios(id) |
| parameters | JSONB | NOT NULL |
| results | JSONB | DEFAULT '{}' |
| impacts | JSONB | DEFAULT '{}' |
| risks | TEXT[] | DEFAULT '{}' |
| status | VARCHAR(20) | CHECK (DRAFT, RUNNING, COMPLETED, FAILED) |

**Indexes:** school_id, scenario_id, status

### geaesip_scenario_comparisons

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| scenario_ids | UUID[] | NOT NULL |
| comparison | JSONB | NOT NULL |
| best_option | UUID | NOT NULL |
| confidence | DECIMAL(3,2) | CHECK (0-1) |

**Indexes:** school_id

## Module 6: Decision Intelligence

### geaesip_decisions

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | CHECK (ACADEMIC, FINANCIAL, OPERATIONAL, STRATEGIC, CRISIS, POLICY) |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | NOT NULL |
| options | JSONB | NOT NULL |
| selected_option | UUID | |
| risk | VARCHAR(20) | CHECK (LOW, MEDIUM, HIGH, CRITICAL) |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| evidence | TEXT[] | DEFAULT '{}' |
| status | VARCHAR(20) | CHECK (PENDING, QUEUED, APPROVED, REJECTED, EXECUTING, COMPLETED, FAILED, ROLLED_BACK) |

**Indexes:** school_id, type, status, risk

### geaesip_decision_approvals

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| decision_id | UUID | FK -> geaesip_decisions(id) |
| approver_id | UUID | NOT NULL |
| status | VARCHAR(20) | CHECK (PENDING, APPROVED, REJECTED, ESCALATED) |
| reason | TEXT | |

**Indexes:** school_id, decision_id, status

### geaesip_decision_audits

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| decision_id | UUID | FK -> geaesip_decisions(id) |
| action | VARCHAR(100) | NOT NULL |
| actor | UUID | NOT NULL |
| details | JSONB | DEFAULT '{}' |

**Indexes:** school_id, decision_id, actor

## Module 7: Agent Orchestration

### geaesip_agent_registries

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| category | VARCHAR(20) | CHECK (ACADEMIC, STUDENT, TEACHER, FINANCE, HR, HEALTH, SECURITY, INFRASTRUCTURE, GOVERNMENT, RESEARCH, CLOUD, DATA, COMPLIANCE, CRISIS, EXECUTIVE) |
| name | VARCHAR(255) | NOT NULL |
| description | TEXT | NOT NULL |
| status | VARCHAR(20) | CHECK (ACTIVE, INACTIVE, ERROR, MAINTENANCE, DELEGATING) |
| capabilities | TEXT[] | NOT NULL |
| tools | TEXT[] | DEFAULT '{}' |
| config | JSONB | DEFAULT '{}' |

**Indexes:** school_id, category, status

### geaesip_agent_missions

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| objective | TEXT | NOT NULL |
| context | JSONB | DEFAULT '{}' |
| constraints | TEXT[] | DEFAULT '{}' |
| agents | UUID[] | NOT NULL |
| tools | TEXT[] | DEFAULT '{}' |
| budget | DECIMAL(12,2) | DEFAULT 0 |
| deadline | TIMESTAMPTZ | NOT NULL |
| risk_level | VARCHAR(20) | CHECK (MINIMAL, LOW, MEDIUM, HIGH, CRITICAL) |
| approval_required | BOOLEAN | DEFAULT FALSE |
| status | VARCHAR(20) | CHECK (PLANNING, EXECUTING, MONITORING, COMPLETED, FAILED, CANCELLED) |
| result | JSONB | |
| score | DECIMAL(5,2) | |

**Indexes:** school_id, status, risk_level

### geaesip_agent_votes

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| mission_id | UUID | FK -> geaesip_agent_missions(id) |
| agent_id | UUID | FK -> geaesip_agent_registries(id) |
| proposal | TEXT | NOT NULL |
| vote | VARCHAR(10) | CHECK (APPROVE, REJECT, ABSTAIN) |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| reasoning | TEXT | NOT NULL |

**Indexes:** school_id, mission_id, agent_id

### geaesip_agent_negotiations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| mission_id | UUID | FK -> geaesip_agent_missions(id) |
| proposals | JSONB | NOT NULL |
| round | INTEGER | CHECK >= 1 |
| outcome | JSONB | NOT NULL |

**Indexes:** school_id, mission_id

## Module 8: Workflow Engine

### geaesip_workflows

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| description | TEXT | NOT NULL |
| tasks | JSONB | NOT NULL |
| dependencies | JSONB | DEFAULT '[]' |
| status | VARCHAR(20) | CHECK (DRAFT, ACTIVE, PAUSED, COMPLETED, FAILED, CANCELLED) |
| trigger | JSONB | DEFAULT '{}' |

**Indexes:** school_id, status

### geaesip_workflow_tasks

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| workflow_id | UUID | FK -> geaesip_workflows(id) |
| name | VARCHAR(255) | NOT NULL |
| type | VARCHAR(20) | CHECK (API, WEBHOOK, EVENT_BUS, WORKFLOW, AGENT, HUMAN_TASK, SCHEDULED_JOB) |
| assignee | UUID | |
| parameters | JSONB | DEFAULT '{}' |
| status | VARCHAR(20) | CHECK (PENDING, ASSIGNED, RUNNING, COMPLETED, FAILED, BLOCKED, ROLLED_BACK) |
| result | JSONB | |
| retries | INTEGER | DEFAULT 0 |
| max_retries | INTEGER | DEFAULT 3 |

**Indexes:** workflow_id, status

### geaesip_action_plans

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| title | VARCHAR(255) | NOT NULL |
| workflows | UUID[] | NOT NULL |
| priority | INTEGER | CHECK (0-10) |
| deadline | TIMESTAMPTZ | NOT NULL |
| approval_required | BOOLEAN | DEFAULT FALSE |
| status | VARCHAR(20) | CHECK (DRAFT, ACTIVE, PAUSED, COMPLETED, FAILED, CANCELLED) |

**Indexes:** school_id, status

### geaesip_execution_logs

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| task_id | UUID | FK -> geaesip_workflow_tasks(id) |
| action | VARCHAR(100) | NOT NULL |
| status | VARCHAR(20) | CHECK (PENDING, ASSIGNED, RUNNING, COMPLETED, FAILED, BLOCKED, ROLLED_BACK) |
| input | JSONB | NOT NULL |
| output | JSONB | |
| error | TEXT | |
| duration | INTEGER | NOT NULL |

**Indexes:** school_id, task_id

## Module 9: Risk & Resilience

### geaesip_risk_registries

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| category | VARCHAR(20) | CHECK (ACADEMIC, FINANCIAL, OPERATIONAL, CYBER, INFRASTRUCTURE, HEALTH, SOCIAL, COMPLIANCE, GEOPOLITICAL, CLIMATE, AI, DATA, CLOUD) |
| description | TEXT | NOT NULL |
| probability | DECIMAL(3,2) | CHECK (0-1) |
| impact | DECIMAL(3,2) | CHECK (0-10) |
| score | DECIMAL(3,2) | CHECK (0-10) |
| status | VARCHAR(20) | CHECK (IDENTIFIED, ASSESSED, MITIGATING, MONITORING, ACCEPTED, CLOSED) |
| owner | UUID | NOT NULL |
| mitigations | TEXT[] | DEFAULT '{}' |

**Indexes:** school_id, category, status

### geaesip_risk_matrices

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| risks | JSONB | NOT NULL |

**Indexes:** school_id

### geaesip_early_warnings

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| risk_id | UUID | FK -> geaesip_risk_registries(id) |
| signal | TEXT | NOT NULL |
| severity | VARCHAR(20) | CHECK (INFO, LOW, MEDIUM, HIGH, CRITICAL) |
| confidence | DECIMAL(3,2) | CHECK (0-1) |

**Indexes:** school_id, risk_id, severity

### geaesip_mitigation_plans

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| risk_id | UUID | FK -> geaesip_risk_registries(id) |
| actions | JSONB | NOT NULL |
| owner | UUID | NOT NULL |
| deadline | TIMESTAMPTZ | NOT NULL |
| status | VARCHAR(20) | CHECK (PLANNING, EXECUTING, COMPLETED, ON_HOLD) |
| progress | DECIMAL(3,2) | CHECK (0-1) |

**Indexes:** school_id, risk_id, status

## Module 10: Crisis Command

### geaesip_crises

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | CHECK (PANDEMIC, NATURAL_DISASTER, FIRE, CYBER_ATTACK, POWER_OUTAGE, NETWORK_OUTAGE, CLOUD_OUTAGE, FINANCIAL_CRISIS, SOCIAL_CRISIS, SCHOOL_INCIDENT) |
| level | VARCHAR(10) | CHECK (LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5) |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | NOT NULL |
| phase | VARCHAR(20) | CHECK (DETECTION, CLASSIFICATION, ESCALATION, RESPONSE, RECOVERY, POSTMORTEM) |
| status | VARCHAR(20) | CHECK (OPEN, MANAGED, RESOLVED, CLOSED) |
| commander | UUID | NOT NULL |

**Indexes:** school_id, type, level, status

### geaesip_crisis_teams

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| crisis_id | UUID | FK -> geaesip_crises(id) |
| roles | JSONB | NOT NULL |
| members | UUID[] | NOT NULL |
| status | VARCHAR(20) | CHECK (FORMED, ACTIVE, STANDBY, DISBANDED) |

**Indexes:** school_id, crisis_id

### geaesip_crisis_playbooks

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| crisis_type | VARCHAR(20) | NOT NULL |
| steps | JSONB | NOT NULL |
| triggers | TEXT[] | NOT NULL |
| resources | JSONB | DEFAULT '[]' |
| status | VARCHAR(20) | CHECK (DRAFT, ACTIVE, ARCHIVED) |

**Indexes:** school_id, crisis_type, status

### geaesip_crisis_timelines

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| crisis_id | UUID | FK -> geaesip_crises(id) |
| events | JSONB | NOT NULL |

**Indexes:** school_id, crisis_id

### geaesip_emergency_communications

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| crisis_id | UUID | FK -> geaesip_crises(id) |
| recipients | UUID[] | NOT NULL |
| message | TEXT | NOT NULL |
| channel | VARCHAR(10) | CHECK (SMS, EMAIL, PUSH, PHONE, ALL) |
| status | VARCHAR(20) | CHECK (PENDING, SENT, DELIVERED, FAILED) |

**Indexes:** school_id, crisis_id, status

## Module 11: Resource Optimization

### geaesip_resource_forecasts

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| resource_type | VARCHAR(20) | CHECK (TEACHER, CLASSROOM, BUDGET, EQUIPMENT, VEHICLE, ENERGY, SERVER, CLOUD, TRAINING, SCHOLARSHIP, INFRASTRUCTURE) |
| current | DECIMAL(12,2) | NOT NULL |
| predicted | DECIMAL(12,2) | NOT NULL |
| gap | DECIMAL(12,2) | NOT NULL |
| period | VARCHAR(50) | NOT NULL |
| model | VARCHAR(50) | NOT NULL |

**Indexes:** school_id, resource_type

### geaesip_allocation_plans

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| resource_type | VARCHAR(20) | NOT NULL |
| allocations | JSONB | NOT NULL |
| constraints | JSONB | DEFAULT '{}' |
| objective | VARCHAR(20) | CHECK (COST, EFFICIENCY, EQUITY, QUALITY, RESILIENCE) |
| score | DECIMAL(5,2) | NOT NULL |
| status | VARCHAR(20) | CHECK (DRAFT, APPROVED, EXECUTING, COMPLETED) |

**Indexes:** school_id, resource_type, status

### geaesip_optimization_results

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| resource_type | VARCHAR(20) | NOT NULL |
| baseline | JSONB | NOT NULL |
| optimized | JSONB | NOT NULL |
| savings | DECIMAL(12,2) | NOT NULL |
| impact | JSONB | DEFAULT '{}' |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| recommendations | TEXT[] | DEFAULT '{}' |

**Indexes:** school_id, resource_type

## Module 12: Copilot 2.0

### geaesip_copilot_sessions

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| user_id | UUID | NOT NULL |
| mode | VARCHAR(10) | CHECK (TEXT, VOICE, MULTIMODAL) |
| queries | JSONB | DEFAULT '[]' |
| context | JSONB | DEFAULT '{}' |
| status | VARCHAR(20) | CHECK (ACTIVE, CLOSED, ERROR) |

**Indexes:** school_id, user_id, status

### geaesip_copilot_answers

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| session_id | UUID | FK -> geaesip_copilot_sessions(id) |
| question | TEXT | NOT NULL |
| answer | TEXT | NOT NULL |
| capabilities | TEXT[] | NOT NULL |
| sources | TEXT[] | DEFAULT '{}' |
| citations | JSONB | DEFAULT '[]' |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| reasoning | TEXT | NOT NULL |
| limitations | TEXT[] | DEFAULT '{}' |
| processing_time | INTEGER | NOT NULL |

**Indexes:** session_id

### geaesip_copilot_explanations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| session_id | UUID | FK -> geaesip_copilot_sessions(id) |
| answer_id | UUID | FK -> geaesip_copilot_answers(id) |
| data_used | TEXT[] | DEFAULT '{}' |
| reasoning_steps | TEXT[] | DEFAULT '{}' |
| assumptions | TEXT[] | DEFAULT '{}' |
| limitations | TEXT[] | DEFAULT '{}' |
| alternatives | TEXT[] | DEFAULT '{}' |

**Indexes:** session_id, answer_id

## Module 13: Memory Fabric

### geaesip_memories

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | CHECK (USER, INSTITUTION, AGENT, DECISION, EVENT, POLICY, RESEARCH, SCENARIO, CRISIS) |
| category | VARCHAR(20) | CHECK (SEMANTIC, EPISODIC, PROCEDURAL, ORGANIZATIONAL) |
| key | VARCHAR(255) | NOT NULL |
| value | JSONB | NOT NULL |
| source | VARCHAR(100) | NOT NULL |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| ttl | INTEGER | NOT NULL |
| expires_at | TIMESTAMPTZ | |
| provenance | JSONB | DEFAULT '[]' |

**Indexes:** school_id, type, category, key

### geaesip_memory_retrievals

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| query | TEXT | NOT NULL |
| results | JSONB | NOT NULL |
| ranking | TEXT[] | NOT NULL |

**Indexes:** school_id

### geaesip_memory_policies

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | NOT NULL |
| retention_days | INTEGER | NOT NULL |
| encryption_required | BOOLEAN | DEFAULT FALSE |
| access_control | JSONB | NOT NULL |

**Indexes:** school_id, type

## Module 14: AI Evaluation

### geaesip_ai_evaluations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | CHECK (MODEL, AGENT, PROMPT, DATASET, SCENARIO, RED_TEAM, SAFETY, REGRESSION) |
| target_id | UUID | NOT NULL |
| metrics | JSONB | NOT NULL |
| score | DECIMAL(5,2) | NOT NULL |
| status | VARCHAR(20) | CHECK (PENDING, RUNNING, COMPLETED, FAILED) |
| findings | TEXT[] | DEFAULT '{}' |
| recommendations | TEXT[] | DEFAULT '{}' |

**Indexes:** school_id, type, status

### geaesip_model_evaluations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| model_id | UUID | NOT NULL |
| accuracy | DECIMAL(5,2) | NOT NULL |
| relevance | DECIMAL(5,2) | NOT NULL |
| hallucination_rate | DECIMAL(5,2) | NOT NULL |
| latency | INTEGER | NOT NULL |
| cost | DECIMAL(12,2) | NOT NULL |
| bias | DECIMAL(5,2) | NOT NULL |
| safety | DECIMAL(5,2) | NOT NULL |
| explainability | DECIMAL(5,2) | NOT NULL |
| robustness | DECIMAL(5,2) | NOT NULL |
| drift | DECIMAL(5,2) | NOT NULL |

**Indexes:** school_id, model_id

### geaesip_agent_evaluations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| agent_id | UUID | NOT NULL |
| task_completion | DECIMAL(5,2) | NOT NULL |
| accuracy | DECIMAL(5,2) | NOT NULL |
| efficiency | DECIMAL(5,2) | NOT NULL |
| safety | DECIMAL(5,2) | NOT NULL |
| cooperation | DECIMAL(5,2) | NOT NULL |
| score | DECIMAL(5,2) | NOT NULL |

**Indexes:** school_id, agent_id

## Module 15: Impact Intelligence

### geaesip_impact_models

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | CHECK (EDUCATION_ROI, SOCIAL_ROI, EMPLOYMENT, GRADUATION, DROPOUT_COST, INFRASTRUCTURE_ROI, TEACHER_ROI, SCHOLARSHIP, RESEARCH, POLICY) |
| name | VARCHAR(255) | NOT NULL |
| formula | TEXT | NOT NULL |
| inputs | JSONB | DEFAULT '{}' |
| outputs | JSONB | DEFAULT '{}' |
| validated | BOOLEAN | DEFAULT FALSE |

**Indexes:** school_id, type

### geaesip_impact_results

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| model_id | UUID | FK -> geaesip_impact_models(id) |
| inputs | JSONB | NOT NULL |
| outputs | JSONB | NOT NULL |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| period | VARCHAR(20) | CHECK (SHORT_TERM, MEDIUM_TERM, LONG_TERM) |

**Indexes:** school_id, model_id

### geaesip_economic_forecasts

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| indicator | VARCHAR(100) | NOT NULL |
| forecast | JSONB | NOT NULL |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| period | VARCHAR(20) | NOT NULL |
| model | VARCHAR(50) | NOT NULL |

**Indexes:** school_id, indicator

### geaesip_human_capital_indices

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| dimension | VARCHAR(100) | NOT NULL |
| score | DECIMAL(5,2) | NOT NULL |
| trend | VARCHAR(20) | CHECK (IMPROVING, STABLE, DECLINING) |
| factors | JSONB | DEFAULT '{}' |

**Indexes:** school_id, dimension

## Module 16: Forecasting 2.0

### geaesip_extended_forecasts

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| domain | VARCHAR(20) | CHECK (ENROLLMENT, POPULATION, TEACHERS, INFRASTRUCTURE, BUDGET, EMPLOYMENT, GRADUATION, DROPOUT, MOBILITY, RESEARCH, TECHNOLOGY, ENERGY, CLOUD_CAPACITY) |
| method | VARCHAR(20) | CHECK (LINEAR, ARIMA, PROPHET, LSTM, ENSEMBLE, TRANSFORMER) |
| horizon | VARCHAR(20) | CHECK (SHORT_TERM, MEDIUM_TERM, LONG_TERM) |
| predictions | JSONB | NOT NULL |
| confidence | DECIMAL(3,2) | CHECK (0-1) |
| version | INTEGER | DEFAULT 1 |

**Indexes:** school_id, domain, method

### geaesip_forecast_backtests

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| forecast_id | UUID | FK -> geaesip_extended_forecasts(id) |
| actual | JSONB | NOT NULL |
| predicted | JSONB | NOT NULL |
| mape | DECIMAL(5,2) | NOT NULL |
| rmse | DECIMAL(5,2) | NOT NULL |
| r2 | DECIMAL(5,2) | NOT NULL |

**Indexes:** school_id, forecast_id

### geaesip_model_drifts

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| forecast_id | UUID | FK -> geaesip_extended_forecasts(id) |
| metric | VARCHAR(100) | NOT NULL |
| drift_score | DECIMAL(5,2) | NOT NULL |
| severity | VARCHAR(20) | CHECK (INFO, LOW, MEDIUM, HIGH, CRITICAL) |

**Indexes:** school_id, forecast_id

## Module 17: Observatory 2.0

### geaesip_composite_indices

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | CHECK (GLOBAL_EDUCATION, RESILIENCE, INTELLIGENCE, DIGITAL, EQUITY, INNOVATION, SAFETY, SUSTAINABILITY) |
| name | VARCHAR(255) | NOT NULL |
| score | DECIMAL(5,2) | NOT NULL |
| components | JSONB | NOT NULL |
| weights | JSONB | DEFAULT '{}' |
| period | VARCHAR(50) | NOT NULL |
| version | INTEGER | DEFAULT 1 |

**Indexes:** school_id, type

### geaesip_observatory_indicators_2

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| scope | VARCHAR(20) | CHECK (NATIONAL, REGIONAL, INSTITUTIONAL, ACADEMIC, ECONOMIC, SOCIAL, HEALTH, INFRASTRUCTURE, TECHNOLOGY, SECURITY, AI) |
| name | VARCHAR(255) | NOT NULL |
| value | DECIMAL(10,2) | NOT NULL |
| unit | VARCHAR(50) | NOT NULL |
| source | VARCHAR(100) | NOT NULL |
| methodology | TEXT | NOT NULL |
| version | INTEGER | DEFAULT 1 |
| period | VARCHAR(50) | NOT NULL |

**Indexes:** school_id, scope

### geaesip_observatory_trends

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| index_type | VARCHAR(20) | NOT NULL |
| periods | JSONB | NOT NULL |
| direction | VARCHAR(20) | CHECK (IMPROVING, STABLE, DECLINING) |
| rate | DECIMAL(5,2) | NOT NULL |
| inflection_points | JSONB | DEFAULT '[]' |

**Indexes:** school_id, index_type

## Module 18: Governance & Ethics

### geaesip_governance_policies

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| domain | VARCHAR(10) | CHECK (AI, DECISION, DATA, MODEL, AGENT, POLICY) |
| name | VARCHAR(255) | NOT NULL |
| rules | JSONB | NOT NULL |
| enforcement_level | VARCHAR(20) | CHECK (MANDATORY, RECOMMENDED, OPTIONAL) |
| enabled | BOOLEAN | DEFAULT TRUE |

**Indexes:** school_id, domain, enabled

### geaesip_governance_audits

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| domain | VARCHAR(10) | NOT NULL |
| action | VARCHAR(20) | CHECK (REVIEW, APPROVE, REJECT, FLAG, ESCALATE, AUDIT) |
| actor | UUID | NOT NULL |
| target | VARCHAR(255) | NOT NULL |
| details | JSONB | DEFAULT '{}' |

**Indexes:** school_id, domain, actor

### geaesip_ethics_reviews

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | NOT NULL |
| target_id | UUID | NOT NULL |
| findings | JSONB | NOT NULL |
| status | VARCHAR(20) | CHECK (PENDING, APPROVED, REJECTED, CONDITIONAL) |
| reviewer | UUID | NOT NULL |
| recommendation | TEXT | NOT NULL |

**Indexes:** school_id, type, status

### geaesip_bias_reviews

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| type | VARCHAR(20) | NOT NULL |
| target_id | UUID | NOT NULL |
| bias_type | VARCHAR(100) | NOT NULL |
| severity | VARCHAR(20) | CHECK (INFO, LOW, MEDIUM, HIGH, CRITICAL) |
| evidence | TEXT[] | NOT NULL |
| mitigation | TEXT | NOT NULL |
| status | VARCHAR(20) | CHECK (PENDING, APPROVED, REJECTED, CONDITIONAL) |

**Indexes:** school_id, type, status

## Module 19: API & Event Fabric

### geaesip_intelligence_apis

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| version | VARCHAR(20) | NOT NULL |
| endpoints | JSONB | NOT NULL |
| auth | JSONB | NOT NULL |
| rate_limit | JSONB | NOT NULL |
| quota | JSONB | NOT NULL |
| enabled | BOOLEAN | DEFAULT TRUE |

**Indexes:** school_id, enabled

### geaesip_event_buses

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| type | VARCHAR(20) | CHECK (REST, WEBHOOK, EVENT_BUS, STREAMING, SUBSCRIPTION) |
| schema | JSONB | NOT NULL |
| subscribers | TEXT[] | DEFAULT '{}' |
| status | VARCHAR(20) | CHECK (ACTIVE, INACTIVE, ERROR) |

**Indexes:** school_id, status

### geaesip_event_subscriptions

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| event_type | VARCHAR(20) | CHECK (INTELLIGENCE, DECISION, FORECAST, SIMULATION, AGENT, CRISIS, RISK, GOVERNANCE) |
| webhook_url | TEXT | NOT NULL |
| filters | JSONB | DEFAULT '{}' |
| active | BOOLEAN | DEFAULT TRUE |

**Indexes:** school_id, event_type, active

### geaesip_api_usage

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| api_id | UUID | FK -> geaesip_intelligence_apis(id) |
| endpoint | TEXT | NOT NULL |
| method | VARCHAR(10) | NOT NULL |
| count | INTEGER | NOT NULL |
| latency | INTEGER | NOT NULL |
| errors | INTEGER | DEFAULT 0 |

**Indexes:** school_id, api_id

## Module 20: Education OS

### geaesip_education_runtimes

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| name | VARCHAR(255) | NOT NULL |
| phase | VARCHAR(20) | CHECK (DATA, KNOWLEDGE, INTELLIGENCE, PREDICTION, SIMULATION, DECISION, GOVERNANCE, APPROVAL, ACTION, OBSERVATION, LEARNING) |
| status | VARCHAR(20) | CHECK (RUNNING, PAUSED, ERROR, COMPLETED) |
| config | JSONB | DEFAULT '{}' |
| metrics | JSONB | DEFAULT '{}' |
| last_run_at | TIMESTAMPTZ | |

**Indexes:** school_id, phase, status

### geaesip_runtime_executions

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| runtime_id | UUID | FK -> geaesip_education_runtimes(id) |
| phase | VARCHAR(20) | NOT NULL |
| input | JSONB | NOT NULL |
| output | JSONB | NOT NULL |
| duration | INTEGER | NOT NULL |
| status | VARCHAR(20) | CHECK (RUNNING, PAUSED, ERROR, COMPLETED) |
| error | TEXT | |

**Indexes:** school_id, runtime_id, status

### geaesip_runtime_metrics

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| school_id | UUID | FK -> schools(id) |
| runtime_id | UUID | FK -> geaesip_education_runtimes(id) |
| name | VARCHAR(100) | NOT NULL |
| value | DECIMAL(12,2) | NOT NULL |
| unit | VARCHAR(50) | NOT NULL |

**Indexes:** school_id, runtime_id, name