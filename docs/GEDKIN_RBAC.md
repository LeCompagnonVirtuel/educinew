# GEDKIN RBAC & ABAC Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

GEDKIN implements Role-Based Access Control (RBAC) combined with Attribute-Based Access Control (ABAC) for fine-grained authorization across all modules. Every data access is validated against role permissions, attribute policies, and tenant boundaries.

---

## RBAC Architecture

```
┌─────────────────────────────────────────────────────┐
│                   RBAC + ABAC Engine                 │
├─────────────────────────────────────────────────────┤
│  User → Role → Permission → Resource → Action       │
│         ↓                                           │
│  Attributes → Policy Evaluation → Allow/Deny        │
└─────────────────────────────────────────────────────┘
```

---

## Roles

| Role | Description | GEDKIN Access Level |
|------|-------------|-------------------|
| `SUPER_ADMIN` | Platform administrator | Full access across all tenants |
| `ADMIN` | School administrator | Full access within tenant |
| `DIRECTEUR` | School director | Read/Write all modules |
| `SECRETAIRE` | Secretary | Read/Write operational modules |
| `COMPTABLE` | Accountant | Read/Write finance modules |
| `ENSEIGNANT` | Teacher | Read academic, Write grades |
| `SURVEILLANT` | Supervisor | Read attendance, Write attendance |
| `PARENT` | Parent/Guardian | Read child data only |
| `ELEVE` | Student | Read own data only |
| `CHAUFFEUR` | Driver | Read/Write transport |
| `BIBLIOTHECAIRE` | Librarian | Read/Write library |
| `INFIRMIER` | Nurse | Read/Write health |
| `RH` | HR Manager | Read/Write HR modules |

---

## GEDKIN Module Permissions

### Permission Matrix

| Module | SUPER_ADMIN | ADMIN | DIRECTEUR | ENSEIGNANT | ELEVE |
|--------|------------|-------|-----------|------------|-------|
| Data Fabric | CRUD | CRUD | CRU | R | R (own) |
| Knowledge Graph | CRUD | CRUD | CRU | R | R |
| Semantic | CRUD | CRUD | CRU | R | R |
| Research | CRUD | CRUD | CRU | CRU | R |
| Observatory | CRUD | CRUD | CRU | R | R |
| Policy | CRUD | CRUD | CRU | R | None |
| Forecasting | CRUD | CRUD | CRU | R | None |
| AI Agents | CRUD | CRUD | CRU | R (limited) | None |
| Research Lab | CRUD | CRUD | CRU | CRU | R |
| Marketplace | CRUD | CRUD | CRU | R | R |
| Simulation | CRUD | CRUD | CRU | R | None |
| Copilot | CRUD | CRUD | CRU | R | R (limited) |

### CRUD Permissions

| Action | Description |
|--------|-------------|
| `C` | Create new resources |
| `R` | Read existing resources |
| `U` | Update existing resources |
| `D` | Delete resources |

---

## ABAC Attributes

### User Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `user.id` | UUID | User identifier |
| `user.role` | enum | User role |
| `user.school_id` | UUID | Tenant identifier |
| `user.department` | string | Department assignment |
| `user.clearance` | enum | Security clearance level |

### Resource Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `resource.type` | string | Resource type |
| `resource.owner` | UUID | Resource owner |
| `resource.classification` | enum | Data classification |
| `resource.visibility` | enum | Data visibility |
| `resource.school_id` | UUID | Resource tenant |

### Context Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `context.time` | datetime | Access timestamp |
| `context.location` | string | Geographic location |
| `context.device` | string | Device type |
| `context.ip` | string | IP address |

---

## Policy Evaluation

### Policy Structure

```typescript
interface AccessPolicy {
  id: string;
  name: string;
  effect: 'ALLOW' | 'DENY';
  conditions: {
    role?: string[];
    attributes?: Record<string, unknown>;
    timeRange?: { start: string; end: string };
    classification?: string[];
  };
  priority: number;
}
```

### Evaluation Algorithm

```
1. Collect user attributes
2. Collect resource attributes
3. Collect context attributes
4. Evaluate all matching policies
5. Apply priority ordering
6. Return most specific policy
7. Default: DENY
```

### Evaluation Example

```typescript
const policy = evaluateAccess({
  user: { role: 'ENSEIGNANT', school_id: 'abc' },
  resource: { type: 'GRADES', classification: 'CONFIDENTIAL', school_id: 'abc' },
  action: 'WRITE',
  context: { time: '2026-08-09T09:00:00Z' }
});

// Result: ALLOW
// Reason: ENSEIGNANT has WRITE permission on GRADES for own school
```

---

## Module-Specific Policies

### Data Fabric Policies

| Policy | Condition | Effect |
|--------|-----------|--------|
| Domain Create | role = ADMIN OR DIRECTEUR | ALLOW |
| Domain Read | school_id matches | ALLOW |
| Domain Update | owner = user.id OR role = ADMIN | ALLOW |
| Domain Delete | role = ADMIN | ALLOW |
| Quality Read | school_id matches | ALLOW |

### Knowledge Graph Policies

| Policy | Condition | Effect |
|--------|-----------|--------|
| Entity Create | role IN (ADMIN, DIRECTEUR, ENSEIGNANT) | ALLOW |
| Entity Read | school_id matches | ALLOW |
| Entity Update | role IN (ADMIN, DIRECTEUR) | ALLOW |
| Entity Delete | role = ADMIN | ALLOW |
| Graph Traverse | school_id matches | ALLOW |

### Copilot Policies

| Policy | Condition | Effect |
|--------|-----------|--------|
| Query Submit | role IN (ADMIN, DIRECTEUR, ENSEIGNANT, ELEVE) | ALLOW |
| SQL Generation | role IN (ADMIN, DIRECTEUR, COMPTABLE) | ALLOW |
| Critical Approval | role IN (ADMIN, DIRECTEUR) | ALLOW |
| Conversation Read | owner = user.id OR role = ADMIN | ALLOW |

### Agent Policies

| Policy | Condition | Effect |
|--------|-----------|--------|
| Agent Create | role IN (ADMIN, DIRECTEUR) | ALLOW |
| Agent Read | school_id matches | ALLOW |
| Task Submit | role IN (ADMIN, DIRECTEUR, ENSEIGNANT) | ALLOW |
| Tool Execute | capability matches | ALLOW |

---

## Conditional Access

### Time-Based Restrictions

| Restriction | Policy |
|-------------|--------|
| Business hours only | context.time BETWEEN 08:00 AND 18:00 |
| Weekday only | context.time NOT IN weekend |
| Holiday blocked | context.time NOT IN holidays |

### Location-Based Restrictions

| Restriction | Policy |
|-------------|--------|
| On-campus only | context.location IN school_zones |
| Country restricted | context.location.country = school.country |
| VPN required | context.ip IN vpn_ranges |

### Device-Based Restrictions

| Restriction | Policy |
|-------------|--------|
| Managed devices only | context.device IN managed_devices |
| MFA required | user.mfa_enabled = true |
| Certificate required | context.device.certificate = valid |

---

## Permission Inheritance

```
SUPER_ADMIN
└── ADMIN
    └── DIRECTEUR
        ├── SECRETAIRE
        ├── COMPTABLE
        ├── ENSEIGNANT
        │   └── ELEVE
        ├── SURVEILLANT
        ├── PARENT
        ├── CHAUFFEUR
        ├── BIBLIOTHECAIRE
        ├── INFIRMIER
        └── RH
```

### Inheritance Rules

| Rule | Description |
|------|-------------|
| Child inherits parent | Lower roles inherit permissions |
| Override by policy | Specific policies override inheritance |
| Deny overrides allow | DENY always wins |
| Most specific wins | Specific resource policy wins |

---

## Audit Trail

### Logged Events

| Event | Data Captured |
|-------|--------------|
| Access granted | User, resource, action, timestamp |
| Access denied | User, resource, action, reason |
| Policy change | Old policy, new policy, changer |
| Role assignment | User, role, assigner |
| Permission override | User, resource, override reason |

### Log Format

```json
{
  "event": "ACCESS_GRANTED",
  "userId": "uuid",
  "userRole": "ENSEIGNANT",
  "schoolId": "uuid",
  "resource": "gedkin_entities",
  "action": "READ",
  "timestamp": "2026-08-09T10:00:00Z",
  "ip": "192.168.1.100",
  "policyId": "uuid"
}
```

---

## Configuration

```typescript
export const gedkinRBACConfig = {
  enabled: true,
  defaultEffect: 'DENY',
  auditAllAccess: true,
  policyCacheTtl: 300,
  maxPoliciesPerRole: 50,
  inheritanceEnabled: true,
  conditionalAccessEnabled: true,
  timeRestrictionsEnabled: true,
  locationRestrictionsEnabled: true,
};
```

---

## Common Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinPermissionError` | GEDKIN_PERMISSION | 403 |
| `GedkinAuthorizationError` | GEDKIN_AUTHORIZATION | 403 |
| `GedkinAccessDeniedError` | GEDKIN_ACCESS_DENIED | 403 |
| `GedkinTenantError` | GEDKIN_TENANT | 403 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_SECURITY.md](GEDKIN_SECURITY.md)
- [GEDKIN_PRIVACY.md](GEDKIN_PRIVACY.md)
- [08_PERMISSIONS_RBAC.md](08_PERMISSIONS_RBAC.md)
