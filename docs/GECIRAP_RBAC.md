# GECIRAP — RBAC & ABAC Permissions

## Role-Based & Attribute-Based Access Control

---

## 1. Vision

GECIRAP implements dual access control: RBAC for role-based permissions and ABAC for attribute-based fine-grained access, ensuring only authorized users can perform infrastructure operations.

---

## 2. RBAC Roles

### Roles with GECIRAP Access

| Role | Permissions | Scope |
|------|-------------|-------|
| `SUPER_ADMIN` | Full access | All schools |
| `ADMIN` | Full access | Own school |
| `DIRECTEUR` | Read-only | Dashboard, reports |

### Permission Matrix

| Operation | SUPER_ADMIN | ADMIN | DIRECTEUR |
|-----------|-------------|-------|-----------|
| Cloud Providers | CRUD | CRUD | Read |
| Cloud Accounts | CRUD | CRUD | Read |
| Cloud Resources | CRUD | CRUD | Read |
| Clusters | CRUD | CRUD | Read |
| Workloads | CRUD | CRUD | Read |
| IaC Templates | CRUD | CRUD | Read |
| IaC Stacks | CRUD | CRUD | Read |
| Scaling Policies | CRUD | CRUD | Read |
| DR Plans | CRUD | CRUD | Read |
| DR Executions | Execute | Execute | Read |
| Multi-Cloud | CRUD | CRUD | Read |
| Edge Nodes | CRUD | CRUD | Read |
| Networks | CRUD | CRUD | Read |
| AIOps Agents | CRUD | CRUD | Read |
| Remediation | Approve | Approve | Read |
| FinOps | CRUD | CRUD | Read |
| Budgets | CRUD | CRUD | Read |
| Digital Twins | CRUD | CRUD | Read |
| Simulations | CRUD | CRUD | Read |
| Dashboard | Read | Read | Read |
| Audit Logs | Read | Read | Read |

---

## 3. ABAC Attributes

### User Attributes

| Attribute | Description | Values |
|-----------|-------------|--------|
| `role` | User role | SUPER_ADMIN, ADMIN, etc. |
| `school_id` | School affiliation | UUID |
| `department` | Department | string |
| `clearance` | Security clearance | LOW, MEDIUM, HIGH |

### Resource Attributes

| Attribute | Description | Values |
|-----------|-------------|--------|
| `school_id` | Owning school | UUID |
| `environment` | Deployment env | PRODUCTION, STAGING, etc. |
| `sensitivity` | Data sensitivity | PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED |
| `cost_center` | Financial owner | string |

### Context Attributes

| Attribute | Description | Values |
|-----------|-------------|--------|
| `time_of_day` | Request time | 00:00-23:59 |
| `ip_address` | Source IP | IPv4/IPv6 |
| `device_type` | Client device | DESKTOP, MOBILE, TABLET |
| `mfa_verified` | MFA status | true, false |

---

## 4. ABAC Policies

### Policy Structure

```json
{
  "effect": "ALLOW",
  "subjects": [
    { "attribute": "role", "operator": "IN", "value": ["ADMIN", "SUPER_ADMIN"] }
  ],
  "resources": [
    { "attribute": "school_id", "operator": "EQUALS", "value": "${user.school_id}" }
  ],
  "actions": ["READ", "WRITE"],
  "conditions": [
    { "attribute": "time_of_day", "operator": "BETWEEN", "value": ["08:00", "18:00"] },
    { "attribute": "mfa_verified", "operator": "EQUALS", "value": true }
  ]
}
```

### Policy Effect

| Effect | Description |
|--------|-------------|
| `ALLOW` | Permit the operation |
| `DENY` | Block the operation |

---

## 5. Evaluation Flow

```
1. Authenticate user (JWT)
2. Extract user attributes
3. Identify resource attributes
4. Gather context attributes
5. Load applicable policies
6. Evaluate RBAC (role check)
7. Evaluate ABAC (attribute check)
8. Determine final decision
9. Log decision
```

### Decision Priority

| Priority | Rule |
|----------|------|
| 1 | Explicit DENY always wins |
| 2 | If no DENY, check ALLOW |
| 3 | If no ALLOW, default DENY |

---

## 6. School Isolation

Every operation is scoped to a school:

```typescript
// RBAC: Role check
if (!['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
  throw new GecirapPermissionError('Non autorisé');
}

// ABAC: School isolation
if (resource.school_id !== user.school_id && user.role !== 'SUPER_ADMIN') {
  throw new GecirapPermissionError('Accès non autorisé à cette école');
}
```

---

## 7. Permission Inheritance

```
SUPER_ADMIN
  └── Inherits all ADMIN permissions
  └── Cross-school access

ADMIN
  └── Inherits all DIRECTEUR permissions
  └── Full CRUD for own school

DIRECTEUR
  └── Read-only access to dashboards
  └── Read-only access to reports
```

---

## 8. Approval Workflows

### Operations Requiring Approval

| Operation | Approver | Risk |
|-----------|----------|------|
| DR Recovery Execution | ADMIN | HIGH |
| Automated Remediation (HIGH risk) | ADMIN | HIGH |
| Automated Remediation (CRITICAL risk) | 2x ADMIN | CRITICAL |
| Budget Modification > 50% | ADMIN + COMPTABLE | MEDIUM |
| Cloud Migration | ADMIN | HIGH |

### Approval Status

| Status | Description |
|--------|-------------|
| `PENDING` | Awaiting approval |
| `APPROVED` | Approved |
| `REJECTED` | Rejected |
| `EXPIRED` | Approval window expired |

---

## 9. Access Reviews

### Review Schedule

| Review Type | Frequency | Scope |
|-------------|-----------|-------|
| Role review | Quarterly | All users |
| Permission review | Monthly | Elevated permissions |
| Service account review | Monthly | API keys |
| Access log review | Weekly | Anomalous access |

### Review Process

```
1. Generate access report
2. Identify dormant accounts
3. Review elevated permissions
4. Validate role assignments
5. Remove unnecessary access
6. Document decisions
```

---

## 10. Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `rbacEnforcement` | true | Enforce RBAC |
| `abacEnforcement` | true | Enforce ABAC |
| `accessReviewDays` | 30 | Days between access reviews |
| `approvalExpiryHours` | 24 | Approval expiry |
| `maxFailedAttempts` | 5 | Account lockout threshold |
| `lockoutDurationSeconds` | 1,800 | Lockout duration |
