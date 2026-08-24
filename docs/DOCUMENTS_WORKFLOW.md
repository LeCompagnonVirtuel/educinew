# Document Workflow Engine Documentation

## Overview

The Workflow Engine provides configurable automation for document lifecycle management, including approval processes, review cycles, signature workflows, and custom business processes. It implements a state machine architecture with support for complex conditions, delegation, escalation, and timeout handling.

---

## Workflow Types

### Approval Workflow

| Property | Description |
|----------|-------------|
| Purpose | Multi-level document approval |
| Steps | Sequential or parallel approval |
| Conditions | Approval, rejection, changes |
| Timeout | Configurable per step |
| Delegation | Supported |

### Review Workflow

| Property | Description |
|----------|-------------|
| Purpose | Document review and feedback |
| Steps | Sequential or parallel review |
| Conditions | Approve, reject, comment |
| Scoring | Optional numeric scoring |
| Deadline | Configurable due date |

### Signature Workflow

| Property | Description |
|----------|-------------|
| Purpose | Document signing |
| Steps | Sequential signing order |
| Conditions | Sign, reject |
| Certificates | X.509 certificate-based |
| Timestamp | Cryptographic timestamps |

### Custom Workflow

| Property | Description |
|----------|-------------|
| Purpose | Business-specific processes |
| Steps | Fully configurable |
| Conditions | Custom logic |
| Actions | Custom actions |
| Integrations | External system hooks |

---

## Workflow Steps

### Step Types

| Type | Description |
|------|-------------|
| `APPROVE` | Approval step |
| `REVIEW` | Review and feedback step |
| `SIGN` | Signature step |
| `NOTIFY` | Notification step |
| `CONDITION` | Conditional branching |
| `PARALLEL` | Parallel execution |
| `WAIT` | Wait for external event |
| `ACTION` | Custom action step |

### Step Properties

```typescript
interface WorkflowStep {
  id: string;
  name: string;
  type: StepType;
  assigneeRole?: string;
  assigneeId?: string;
  required: boolean;
  timeoutDays?: number;
  escalationDays?: number;
  conditions?: StepCondition[];
  actions?: StepAction[];
}
```

### Step Configuration

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Step display name |
| `type` | StepType | Step type |
| `assigneeRole` | string | Required role |
| `assigneeId` | string | Specific user |
| `required` | boolean | Must complete to proceed |
| `timeoutDays` | number | Days before timeout |
| `escalationDays` | number | Days before escalation |
| `conditions` | Condition[] | Transition conditions |
| `actions` | Action[] | Actions to execute |

---

## Workflow Conditions

### Condition Types

| Type | Description | Example |
|------|-------------|---------|
| `APPROVED` | Step approved | `status === 'APPROVED'` |
| `REJECTED` | Step rejected | `status === 'REJECTED'` |
| `CHANGES` | Changes requested | `status === 'CHANGES'` |
| `SIGNED` | Document signed | `status === 'SIGNED'` |
| `TIMEOUT` | Step timed out | `timeout === true` |
| `CUSTOM` | Custom logic | `data.amount > 1000` |

### Condition Configuration

```typescript
interface StepCondition {
  fromStep: string;
  toStep: string;
  condition: ConditionType;
  logic?: string;
}
```

### Condition Examples

```json
{
  "fromStep": "teacher_review",
  "toStep": "admin_approval",
  "condition": "APPROVED"
}
```

```json
{
  "fromStep": "amount_check",
  "toStep": "finance_approval",
  "condition": "CUSTOM",
  "logic": "data.amount > 1000"
}
```

---

## Delegation

### Delegation Features

| Feature | Description |
|---------|-------------|
| Delegate | Assign to another user |
| Reason | Document delegation reason |
| Expiration | Time-limited delegation |
| Audit Trail | Track all delegations |
| Revocation | Cancel delegation |

### Delegation Configuration

```typescript
interface Delegation {
  id: string;
  approvalId: string;
  delegatorId: string;
  delegateId: string;
  reason: string;
  expiresAt: string;
  createdAt: string;
}
```

### Delegation Flow

```
Original Assignee
  → Delegates to User
    → User Receives Notification
      → User Completes Step
        → Original Assignee Notified
          → Audit Trail Updated
```

---

## Escalation

### Escalation Features

| Feature | Description |
|---------|-------------|
| Auto-Escalate | Automatic escalation on timeout |
| Escalation Path | Configurable escalation chain |
| Notification | Alert on escalation |
| Time Limits | Configurable per step |

### Escalation Configuration

```typescript
interface Escalation {
  stepId: string;
  escalationDays: number;
  escalationPath: string[];
  notifyOriginal: boolean;
}
```

### Escalation Flow

```
Step Assigned
  → Timeout Reached
    → Escalation Triggered
      → Next in Chain Notified
        → If No Response
          → Escalate Again
            → Final Escalation
              → Admin Alert
```

---

## Timeout Handling

### Timeout Features

| Feature | Description |
|---------|-------------|
| Configurable | Per-step timeout |
| Auto-Action | Auto-approve/reject on timeout |
| Notifications | Alert before timeout |
| Escalation | Escalate on timeout |

### Timeout Configuration

```typescript
interface TimeoutConfig {
  stepId: string;
  timeoutDays: number;
  warningDays: number;
  action: 'ESCALATE' | 'AUTO_APPROVE' | 'AUTO_REJECT' | 'NOTIFY';
  notificationDays: number[];
}
```

### Timeout Flow

```
Step Assigned
  → Warning Notification (5 days)
    → Final Warning (1 day)
      → Timeout Reached
        → Action Executed
          → Next Step Triggered
```

---

## State Machine

### Workflow States

| State | Description |
|-------|-------------|
| `DRAFT` | Workflow defined but not started |
| `ACTIVE` | Workflow in progress |
| `PAUSED` | Workflow paused |
| `COMPLETED` | Workflow finished successfully |
| `CANCELLED` | Workflow cancelled |
| `FAILED` | Workflow failed |

### Step States

| State | Description |
|-------|-------------|
| `PENDING` | Waiting to start |
| `ACTIVE` | Currently in progress |
| `APPROVED` | Step approved |
| `REJECTED` | Step rejected |
| `CHANGES` | Changes requested |
| `SIGNED` | Document signed |
| `TIMEOUT` | Step timed out |
| `DELEGATED` | Step delegated |
| `SKIPPED` | Step skipped |

### State Diagram

```
                    ┌─────────────┐
                    │    DRAFT    │
                    └──────┬──────┘
                           │ Start
                           ▼
                    ┌─────────────┐
              ┌─────│    ACTIVE   │─────┐
              │     └──────┬──────┘     │
              │            │            │
              ▼            ▼            ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │ PAUSED   │  │COMPLETED │  │ CANCELLED│
       └──────────┘  └──────────┘  └──────────┘
              │
              │ Resume
              ▼
       ┌──────────┐
       │  ACTIVE  │
       └──────────┘
```

### Transition Rules

| From | To | Trigger |
|------|----|---------|
| DRAFT | ACTIVE | Start workflow |
| ACTIVE | PAUSED | Pause workflow |
| PAUSED | ACTIVE | Resume workflow |
| ACTIVE | COMPLETED | All steps done |
| ACTIVE | CANCELLED | Cancel workflow |
| ACTIVE | FAILED | Error occurred |

---

## Notification Integration

### Notification Events

| Event | Description |
|-------|-------------|
| `workflow.started` | Workflow initiated |
| `workflow.step.assigned` | Step assigned to user |
| `workflow.step.completed` | Step completed |
| `workflow.step.approved` | Step approved |
| `workflow.step.rejected` | Step rejected |
| `workflow.step.timeout` | Step timed out |
| `workflow.step.delegated` | Step delegated |
| `workflow.completed` | Workflow finished |
| `workflow.cancelled` | Workflow cancelled |
| `workflow.escalated` | Step escalated |

### Notification Channels

| Channel | Description |
|---------|-------------|
| `IN_APP` | In-app notification |
| `EMAIL` | Email notification |
| `PUSH` | Push notification |

### Notification Template

```json
{
  "event": "workflow.step.assigned",
  "recipient": "user_002",
  "data": {
    "workflowName": "Document Review",
    "documentName": "Quarterly Report.pdf",
    "stepName": "Teacher Review",
    "dueDate": "2026-01-20T00:00:00Z"
  }
}
```

---

## Custom Workflow Creation

### Workflow Definition

```json
{
  "name": "Custom Approval Process",
  "description": "Multi-level approval with conditions",
  "steps": [
    {
      "id": "step1",
      "name": "Initial Review",
      "type": "REVIEW",
      "assigneeRole": "TEACHER",
      "required": true,
      "timeoutDays": 7
    },
    {
      "id": "step2",
      "name": "Department Approval",
      "type": "APPROVE",
      "assigneeRole": "ADMIN",
      "required": true,
      "timeoutDays": 5,
      "conditions": [
        {
          "fromStep": "step1",
          "condition": "APPROVED"
        }
      ]
    },
    {
      "id": "step3",
      "name": "Final Approval",
      "type": "APPROVE",
      "assigneeRole": "ADMIN",
      "required": true,
      "timeoutDays": 3,
      "conditions": [
        {
          "fromStep": "step2",
          "condition": "APPROVED"
        }
      ]
    }
  ],
  "actions": [
    {
      "trigger": "workflow.completed",
      "type": "NOTIFY",
      "target": "initiator",
      "message": "Your document has been approved"
    }
  ]
}
```

### Workflow Variables

| Variable | Description |
|----------|-------------|
| `${document.name}` | Document name |
| `${document.type}` | Document type |
| `${initiator.name}` | Workflow initiator |
| `${currentStep.name}` | Current step name |
| `${currentStep.assignee}` | Current assignee |

### Workflow Conditions Logic

```json
{
  "condition": {
    "type": "CUSTOM",
    "logic": "data.amount > 1000 && data.department === 'Finance'"
  }
}
```

---

## Workflow Templates

### Built-in Templates

| Template | Description |
|----------|-------------|
| Simple Approval | Single-level approval |
| Two-Level Approval | Teacher → Admin approval |
| Document Review | Review with comments |
| Contract Signing | Multi-signer workflow |
| Policy Approval | Policy document approval |
| Grade Approval | Grade submission approval |

### Template Configuration

```typescript
interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  conditions: StepCondition[];
  actions: WorkflowAction[];
  createdBy: string;
  createdAt: string;
}
```

---

## Batch Workflow Operations

### Batch Start

```json
{
  "workflowId": "workflow_001",
  "documentIds": ["doc_001", "doc_002", "doc_003"],
  "initiatorId": "user_001"
}
```

### Batch Status

```json
{
  "batchId": "batch_001",
  "total": 3,
  "completed": 2,
  "failed": 1,
  "status": "PARTIAL",
  "details": [
    {
      "documentId": "doc_001",
      "status": "STARTED",
      "instanceId": "instance_001"
    },
    {
      "documentId": "doc_002",
      "status": "STARTED",
      "instanceId": "instance_002"
    },
    {
      "documentId": "doc_003",
      "status": "FAILED",
      "error": "Permission denied"
    }
  ]
}
```

---

## Error Handling

### Error Types

| Error | Code | Description |
|-------|------|-------------|
| `WORKFLOW_NOT_FOUND` | 404 | Workflow definition not found |
| `STEP_NOT_FOUND` | 404 | Step not found |
| `INSTANCE_NOT_FOUND` | 404 | Workflow instance not found |
| `INVALID_TRANSITION` | 400 | Invalid state transition |
| `UNAUTHORIZED` | 403 | Not authorized to perform action |
| `WORKFLOW_CANCELLED` | 409 | Workflow already cancelled |
| `STEP_TIMEOUT` | 408 | Step timed out |
| `DELEGATION_FAILED` | 500 | Delegation error |

### Error Response

```json
{
  "error": {
    "code": "INVALID_TRANSITION",
    "message": "Cannot transition from COMPLETED to ACTIVE",
    "details": {
      "instanceId": "instance_001",
      "currentState": "COMPLETED",
      "attemptedTransition": "ACTIVE"
    }
  }
}
```

---

## API Reference

### Create Workflow

```
POST /api/documents/workflows
```

### Start Workflow

```
POST /api/documents/workflows/[id]/start
```

### Transition Workflow

```
POST /api/documents/workflows/transition
```

### Complete Workflow

```
POST /api/documents/workflows/[id]/complete
```

### Cancel Workflow

```
POST /api/documents/workflows/[id]/cancel
```

### Get Workflow History

```
GET /api/documents/workflows/[id]/history
```

### Get Workflow Instances

```
GET /api/documents/workflows/instances
```

### Delegate Workflow Step

```
POST /api/documents/workflows/[id]/delegate
```

### Get Workflow Templates

```
GET /api/documents/workflows/templates
```

### Create Workflow Template

```
POST /api/documents/workflows/templates
```

---

## Performance Considerations

| Metric | Target |
|--------|--------|
| Workflow start | < 500ms |
| Step transition | < 300ms |
| History query | < 200ms |
| Batch operations | < 5s per 100 |

### Optimization Strategies

1. **Async Processing** — Non-blocking step transitions
2. **Caching** — Cache workflow definitions
3. **Batch Operations** — Bulk workflow starts
4. **Indexing** — Optimize database queries
5. **Pagination** — Paginate history results
