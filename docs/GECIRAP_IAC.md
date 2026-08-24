# GECIRAP — Infrastructure as Code

## Declarative Infrastructure Provisioning & Drift Detection

---

## 1. Vision

GECIRAP IaC enables educational institutions to manage infrastructure through version-controlled templates, with automated provisioning, drift detection, and policy enforcement across multiple cloud providers.

---

## 2. Supported IaC Providers

| Provider | Status | Default | Use Case |
|----------|--------|---------|----------|
| Terraform | Supported | Yes | Multi-cloud |
| Pulumi | Supported | No | Programmatic IaC |
| CloudFormation | Supported | No | AWS-native |
| Bicep | Supported | No | Azure-native |
| CDK | Supported | No | AWS with code |
| Crossplane | Supported | No | Kubernetes-native |

---

## 3. Entity Relationships

```
InfrastructureTemplate (1) ──── (N) InfrastructureStack
InfrastructureStack (1) ──── (N) ProvisioningJob
InfrastructureStack (1) ──── (N) ResourceChange
InfrastructureStack (1) ──── (N) DriftDetection
```

---

## 4. Template Management

### Template Structure

```json
{
  "name": "VPC Module",
  "provider": "TERRAFORM",
  "content": "resource \"aws_vpc\" \"main\" {\n  cidr_block = var.cidr\n}",
  "version": "1.0.0",
  "variables": { "cidr": "10.0.0.0/16" }
}
```

### Template Versioning

- Version follows semver (e.g., `1.0.0`)
- Each template update creates new version
- Stacks reference specific template versions
- Rollback to previous versions supported

---

## 5. Stack Management

### Stack Status

| Status | Description |
|--------|-------------|
| `PENDING` | Created but not applied |
| `PLANNING` | Terraform plan running |
| `APPLYING` | Changes being applied |
| `APPLIED` | Successfully applied |
| `DESTROYING` | Resources being destroyed |
| `DRIFTED` | Configuration drift detected |
| `FAILED` | Application failed |
| `LOCKED` | Locked to prevent changes |

### Stack Lifecycle

```
PENDING → PLANNING → APPLYING → APPLIED
              │          │
              │          └── FAILED
              └── DRIFTED
```

---

## 6. Provisioning Jobs

| Field | Description |
|-------|-------------|
| `action` | Operation type (plan, apply, destroy) |
| `status` | Job status |
| `plan` | Execution plan |
| `changes` | Resource changes |
| `error` | Error message if failed |

### Provisioning Flow

```
1. Create ProvisioningJob
2. Generate execution plan
3. Review resource changes
4. Apply changes (with approval if required)
5. Update stack state
6. Record audit log
```

---

## 7. Resource Changes

| Change Type | Description |
|-------------|-------------|
| `CREATE` | New resource being created |
| `UPDATE` | Existing resource being modified |
| `DELETE` | Resource being removed |
| `REPLACE` | Resource being destroyed and recreated |
| `NO_CHANGE` | No changes needed |

### Approval Workflow

| Status | Description |
|--------|-------------|
| `PENDING` | Awaiting approval |
| `APPROVED` | Approved for execution |
| `REJECTED` | Rejected by approver |
| `EXPIRED` | Approval window expired |

---

## 8. Drift Detection

### Drift Status

| Status | Description |
|--------|-------------|
| `IN_SYNC` | Infrastructure matches template |
| `DRIFTED` | Configuration drift detected |
| `UNKNOWN` | Unable to determine |

### Drift Detection Schedule

- Default interval: 3,600 seconds (1 hour)
- Drift detected → Alert generated
- Critical drift → Automated remediation (if enabled)

### Drift Response

```
Drift Detected
      │
      ├── Auto-remediate (if enabled)
      ├── Alert operator
      └── Create audit log entry
```

---

## 9. Infrastructure Policies

Policies enforce organizational rules:

```json
{
  "name": "Security Policy",
  "rules": [
    { "type": "NO_PUBLIC_S3", "params": {} },
    { "type": "ENCRYPTION_REQUIRED", "params": { "algorithm": "AES-256" } },
    { "type": "TAGGING_REQUIRED", "params": { "tags": ["environment", "owner"] } }
  ],
  "enforced": true
}
```

### Policy Violations

| Code | Description |
|------|-------------|
| `GECIRAP_POLICY_VIOLATION` | Policy rule violated |
| `GECIRAP_APPROVAL_REQUIRED` | Change requires approval |
| `GECIRAP_DESTROY_BLOCKED` | Destroy blocked by policy |

---

## 10. Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `maxStacksPerSchool` | 100 | Max stacks per school |
| `maxTemplates` | 500 | Max templates per school |
| `stateBackend` | remote | State storage backend |
| `driftDetectionInterval` | 3,600 | Seconds between drift checks |
| `destroyProtection` | true | Block destroy operations |
| `approvalRequired` | true | Require approval for changes |
| `auditAllOperations` | true | Log every operation |

---

## 11. State Management

### State Backend

| Backend | Description |
|---------|-------------|
| `remote` | Supabase/external state store |
| `local` | Local file (development only) |

### State Security

- State encrypted at rest
- Access controlled via RBAC
- State locking prevents concurrent modifications
- State history maintained for rollback

---

## 12. Destroy Protection

Production stacks have destroy protection enabled by default:

```typescript
// Attempting to destroy a protected stack
throw new GecirapDestroyBlockedError('Destruction bloquée — protection activée');
```

To destroy a protected stack:
1. Disable destroy protection on the stack
2. Obtain approval from admin
3. Execute destroy operation
4. Re-enable protection on remaining stacks
