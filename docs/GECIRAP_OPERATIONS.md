# GECIRAP — Operational Procedures

## Standard Operating Procedures for Infrastructure Management

---

## 1. Vision

GECIRAP Operations provides standardized procedures for daily infrastructure management, incident response, change management, and capacity planning, ensuring consistent and reliable operations.

---

## 2. Daily Operations

### Morning Health Check (08:00 UTC)

| Step | Action | Owner |
|------|--------|-------|
| 1 | Review dashboard overview | On-call |
| 2 | Check all regions HEALTHY | On-call |
| 3 | Verify no critical alerts | On-call |
| 4 | Review overnight scaling events | On-call |
| 5 | Check backup job status | On-call |
| 6 | Verify edge node sync status | On-call |

### Health Check Commands

```
GET /api/gecirap/dashboard/overview
GET /api/gecirap/dashboard/health
GET /api/gecirap/regions/health
GET /api/gecirap/scaling/events?since=today
GET /api/gecirap/edge/nodes?status=OFFLINE
```

---

## 3. Change Management

### Change Categories

| Category | Approval | Window |
|----------|----------|--------|
| Standard | Admin | Any time |
| Normal | Admin + Review | Maintenance window |
| Emergency | Admin | Immediate |
| Major | Admin + Director + Review | Scheduled |

### Change Process

```
1. Submit change request
2. Risk assessment
3. Approval workflow
4. Schedule change
5. Execute change
6. Verify change
7. Document change
8. Close change request
```

### Maintenance Windows

| Window | Time (UTC) | Duration |
|--------|------------|----------|
| Weekday | 02:00-04:00 | 2 hours |
| Weekend | 00:00-06:00 | 6 hours |
| Holiday | 00:00-06:00 | 6 hours |

---

## 4. Incident Response

### Severity Levels

| Level | Response Time | Resolution Target |
|-------|---------------|-------------------|
| P1 - Critical | 5 minutes | 1 hour |
| P2 - High | 15 minutes | 4 hours |
| P3 - Medium | 1 hour | 24 hours |
| P4 - Low | 4 hours | 72 hours |

### Incident Response Process

```
1. Detect (automated or manual)
2. Triage (assess severity)
3. Communicate (notify stakeholders)
4. Investigate (root cause analysis)
5. Mitigate (stop the bleeding)
6. Resolve (fix the issue)
7. Review (post-mortem)
8. Improve (prevent recurrence)
```

### Incident Communication

| Stakeholder | P1 | P2 | P3 | P4 |
|-------------|-----|-----|-----|-----|
| On-call | Immediate | Immediate | 1 hour | 4 hours |
| Admin | 5 min | 15 min | Next day | Weekly |
| Director | 15 min | 1 hour | Weekly | Monthly |
| Users | 30 min | 2 hours | Next day | None |

---

## 5. Capacity Planning

### Weekly Review

| Step | Action |
|------|--------|
| 1 | Review utilization trends |
| 2 | Check capacity forecasts |
| 3 | Review scaling events |
| 4 | Assess cost trends |
| 5 | Plan capacity adjustments |

### Capacity Thresholds

| Level | CPU | Memory | Storage |
|-------|-----|--------|---------|
| Normal | < 70% | < 75% | < 80% |
| Warning | 70-85% | 75-85% | 80-90% |
| Critical | 85-95% | 85-95% | 90-95% |
| Emergency | > 95% | > 95% | > 95% |

---

## 6. Backup Operations

### Backup Schedule

| Type | Frequency | Retention |
|------|-----------|-----------|
| Database full | Daily 02:00 UTC | 30 days |
| Database incremental | Every 6 hours | 7 days |
| Configuration | Daily 03:00 UTC | 90 days |
| Edge packages | Weekly | 90 days |

### Backup Verification

| Step | Action |
|------|--------|
| 1 | Verify backup integrity |
| 2 | Test restore to staging |
| 3 | Validate data consistency |
| 4 | Log verification results |

---

## 7. Security Operations

### Daily Security Tasks

| Task | Frequency | Owner |
|------|-----------|-------|
| Review audit logs | Daily | Admin |
| Check failed logins | Daily | Admin |
| Review access anomalies | Daily | Admin |
| Verify certificate expiry | Weekly | Admin |
| Review permission changes | Weekly | Admin |
| Rotate secrets | Per policy | Admin |

### Security Incident Response

```
1. Detect security event
2. Contain threat
3. Eradicate threat
4. Recover systems
5. Document incident
6. Update security controls
```

---

## 8. DR Operations

### DR Test Schedule

| Test Type | Frequency | Duration |
|-----------|-----------|----------|
| Tabletop | Monthly | 2 hours |
| Simulation | Quarterly | 4 hours |
| Partial exercise | Semi-annual | 8 hours |
| Full exercise | Annual | 24 hours |

### DR Test Process

```
1. Plan test scenario
2. Notify stakeholders
3. Execute test
4. Measure RTO/RPO
5. Document results
6. Update DR plans
7. Train staff
```

---

## 9. Monitoring & Alerting

### Alert Routing

| Severity | Channel | Escalation |
|----------|---------|------------|
| Critical | PagerDuty + Slack | 5 min |
| High | Slack + Email | 15 min |
| Medium | Email | 1 hour |
| Low | Dashboard | Next business day |

### Key Metrics

| Metric | Warning | Critical |
|--------|---------|----------|
| API response time | > 1s | > 5s |
| Error rate | > 1% | > 5% |
| CPU utilization | > 85% | > 95% |
| Memory utilization | > 85% | > 95% |
| Disk utilization | > 80% | > 90% |
| Backup failures | > 0 | > 3 |

---

## 10. Runbooks

### Runbook: High CPU

```
1. Identify affected resources
2. Check scaling policies
3. Review recent deployments
4. Check for runaway processes
5. Scale up if needed
6. Investigate root cause
```

### Runbook: Database Down

```
1. Verify database status
2. Check connectivity
3. Review recent changes
4. Attempt restart
5. Restore from backup if needed
6. Notify stakeholders
```

### Runbook: Edge Node Offline

```
1. Verify node connectivity
2. Check power/network
3. Review last known status
4. Dispatch field team if needed
5. Sync data on recovery
6. Update node status
```
