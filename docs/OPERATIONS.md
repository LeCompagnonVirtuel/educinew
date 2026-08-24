# Operations Guide — EduCI Phase 4.0

**Version:** 4.0.0  
**Status:** Active  
**Last Updated:** 2026-08-06

---

## Overview

This guide covers operational procedures for running EduCI in production, including monitoring, incident response, maintenance, and support workflows.

---

## System Architecture

### Production Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | Vercel (Next.js) | Web application |
| Backend | Supabase | API, Auth, Database |
| Storage | Supabase Storage | File storage |
| AI | DeepSeek + Gemini | AI inference |
| Payments | Money Fusion | Payment processing |
| CDN | Vercel Edge | Static assets |

---

## Monitoring

### Health Checks

| Service | Endpoint | Interval |
|---------|----------|----------|
| Web App | `GET /` | 1 minute |
| API | `GET /health` | 1 minute |
| Database | Connection pool | 30 seconds |
| Edge Functions | `GET /health` | 1 minute |

### Metrics Dashboard

Key metrics tracked:

| Category | Metrics |
|----------|---------|
| Availability | Uptime, error rate |
| Performance | Response time, throughput |
| Usage | Active users, API calls |
| Business | Enrollments, payments |

---

## Incident Response

### Severity Levels

| Level | Description | Response Time |
|-------|------------|---------------|
| P1 | System down | 15 minutes |
| P2 | Major feature broken | 1 hour |
| P3 | Minor feature issue | 4 hours |
| P4 | Cosmetic issue | 24 hours |

### Response Process

1. **Detect** — Alert triggers or user report
2. **Triage** — Assess severity and impact
3. **Mitigate** — Immediate fix or workaround
4. **Investigate** — Root cause analysis
5. **Resolve** — Permanent fix deployed
6. **Review** — Post-incident review

### Communication Templates

#### P1 Status Update

```
[INCIDENT] EduCI is experiencing degraded performance.
Impact: [describe affected features]
Status: Investigating
ETA: [estimated resolution]
Updates: Every 15 minutes
```

---

## Maintenance

### Scheduled Maintenance

| Type | Frequency | Duration |
|------|-----------|----------|
| Database optimization | Weekly | 30 minutes |
| Dependency updates | Bi-weekly | 1 hour |
| Security patches | As needed | 30 minutes |
| Major upgrades | Quarterly | 4 hours |

### Maintenance Window

- Preferred: Saturday 02:00-06:00 UTC
- Minimum 72-hour advance notice
- Status page updated during maintenance

---

## Backup & Recovery

### Backup Schedule

| Data Type | Frequency | Retention |
|-----------|-----------|-----------|
| Database | Daily | 30 days |
| Files | Daily | 30 days |
| Config | On change | 90 days |
| Logs | Daily | 1 year |

### Recovery Procedures

| Scenario | RTO | RPO |
|----------|-----|-----|
| Data corruption | 1 hour | 24 hours |
| Accidental deletion | 4 hours | 24 hours |
| Full restore | 8 hours | 24 hours |

---

## Support Workflow

### Ticket Routing

| Issue Type | Assigned To |
|-----------|-------------|
| Account issues | Support Team |
| Billing issues | Finance Team |
| Technical issues | Engineering Team |
| Feature requests | Product Team |

### Escalation Path

```
Level 1: Support Agent
→ Level 2: Senior Support
→ Level 3: Engineering
→ Level 4: Platform Owner
```

---

## Log Management

### Log Levels

| Level | Usage |
|-------|-------|
| ERROR | System errors |
| WARN | Unexpected conditions |
| INFO | Normal operations |
| DEBUG | Development only (never in production) |

### Log Retention

- Application logs: 90 days
- Access logs: 1 year
- Audit logs: 7 years
- Error logs: 2 years

---

## Capacity Planning

### Scaling Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| CPU usage | >80% | Scale up |
| Memory usage | >85% | Scale up |
| DB connections | >80% pool | Add replicas |
| Storage | >80% | Add capacity |

### Growth Projections

| Metric | Current | 6 Months | 12 Months |
|--------|---------|----------|-----------|
| Users | 1,000 | 5,000 | 20,000 |
| Data | 10GB | 50GB | 200GB |
| API calls/day | 100K | 500K | 2M |

---

## Runbooks

### Common Operations

| Operation | Runbook |
|-----------|---------|
| Scale database | Increase connection pool |
| Deploy update | CI/CD pipeline |
| Rotate secrets | Supabase Vault update |
| Clear cache | CDN purge |

---

## Related Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) — Deployment Guide
- [PERFORMANCE.md](PERFORMANCE.md) — Performance Guide
- [SECURITY.md](SECURITY.md) — Security Documentation
