# GEAESIP Deployment Guide

## Overview

This guide covers the deployment, configuration, monitoring, and scaling of the GEAESIP platform within the EduCI infrastructure.

## Prerequisites

### Required Services

| Service | Purpose | Required |
|---------|---------|----------|
| Supabase | Database, Auth, Storage, Realtime | Yes |
| Vercel | Web hosting, Edge Functions | Yes |
| DeepSeek | AI Reasoning | Yes |
| Gemini | AI Generation | Yes |
| Money Fusion | Payments | Yes |

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Services
DEEPSEEK_API_KEY=your-deepseek-key
GEMINI_API_KEY=your-gemini-key

# Payments
MONEY_FUSION_API_KEY=your-money-fusion-key
MONEY_FUSION_WEBHOOK_SECRET=your-webhook-secret

# GEAESIP Configuration
GEAESIP_ENABLED=true
GEAESIP_LOG_LEVEL=info
GEAESIP_MAX_CONCURRENT_AGENTS=50
GEAESIP_CRISIS_ESCALATION_TIMEOUT=15
```

## Database Setup

### 1. Run Migrations

```bash
# Apply all migrations
supabase db push

# Or apply specific migration
supabase migration up 20260101000001_geaesip_tables.sql
```

### 2. Enable Required Extensions

```sql
-- Ensure pg_cron is enabled for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net for webhooks
CREATE EXTENSION IF NOT EXISTS pg_net;
```

### 3. Configure RLS Policies

All GEAESIP tables have RLS enabled. Verify policies are active:

```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE 'geaesip_%';
```

### 4. Create Indexes

Indexes are created with migrations. Verify completeness:

```sql
-- Check indexes
SELECT indexname, tablename 
FROM pg_indexes 
WHERE tablename LIKE 'geaesip_%';
```

## Application Deployment

### 1. Web Application (Vercel)

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod
```

### 2. Edge Functions

```bash
# Deploy Supabase Edge Functions
supabase functions deploy geaesip-intelligence
supabase functions deploy geaesip-decisions
supabase functions deploy geaesip-crisis
```

### 3. Mobile Application

```bash
# Build for production
eas build --platform ios --profile production
eas build --platform android --profile production
```

## Configuration

### Module Configuration

All module configurations are defined in `packages/config/src/phase4-10-geaesip.ts`.

Key configuration parameters:

| Module | Parameter | Default | Description |
|--------|-----------|---------|-------------|
| Intelligence Core | fusionThreshold | 0.85 | Minimum confidence for knowledge fusion |
| Control Center | autoEscalationMinutes | 30 | Auto-escalation timeout |
| Agent Orchestration | maxAgentsPerSchool | 50 | Maximum agents per tenant |
| Crisis Command | escalationTimeoutMinutes | 15 | Crisis escalation timeout |
| Resource Optimization | forecastHorizonDays | 365 | Resource forecast horizon |
| Memory Fabric | defaultRetentionDays | 365 | Memory retention period |
| Governance | auditRetentionDays | 2555 | Audit log retention (7 years) |

### Per-Tenant Configuration

Schools can customize their GEAESIP configuration:

```json
{
  "geaesip": {
    "enabled": true,
    "modules": {
      "intelligence": { "enabled": true },
      "crisis": { "enabled": true },
      "agents": { "maxCount": 25 }
    },
    "ai": {
      "primaryProvider": "deepseek",
      "fallbackProvider": "gemini"
    }
  }
}
```

## Monitoring

### 1. Application Monitoring

#### Vercel Analytics
- Page views and performance
- API response times
- Error rates

#### Supabase Dashboard
- Database performance
- Query execution times
- Connection pool status

### 2. GEAESIP-Specific Monitoring

#### Intelligence Metrics
```sql
-- Query intelligence scores by school
SELECT school_id, AVG(score) as avg_score
FROM geaesip_intelligence_cores
WHERE deleted_at IS NULL
GROUP BY school_id;
```

#### Agent Performance
```sql
-- Query agent mission completion rates
SELECT 
  school_id,
  COUNT(*) as total_missions,
  COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed,
  AVG(score) as avg_score
FROM geaesip_agent_missions
WHERE deleted_at IS NULL
GROUP BY school_id;
```

#### Crisis Response Times
```sql
-- Query crisis response metrics
SELECT 
  school_id,
  type,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/60) as avg_response_minutes
FROM geaesip_crises
WHERE deleted_at IS NULL
AND status = 'CLOSED'
GROUP BY school_id, type;
```

### 3. Alerting

Configure alerts for:

| Metric | Threshold | Action |
|--------|-----------|--------|
| Intelligence Score | < 50 | Alert admin |
| Agent Failures | > 10% | Alert admin |
| Crisis Escalation | > 15 minutes | Alert emergency team |
| API Error Rate | > 5% | Alert DevOps |
| Database Connections | > 80% | Alert DevOps |

### 4. Logging

#### Structured Logging
```typescript
logger.info('GEAESIP Intelligence Computed', {
  schoolId,
  intelligenceId,
  score,
  level,
  duration,
});
```

#### Log Retention
- Application logs: 30 days
- Audit logs: 7 years
- Crisis logs: 10 years

## Scaling Considerations

### 1. Database Scaling

#### Connection Pooling
```toml
# supabase/config.toml
[db]
max_connections = 100
```

#### Read Replicas
For high-traffic deployments:
- Configure Supabase read replicas
- Route read queries to replicas
- Keep writes on primary

#### Partitioning
For large datasets:
```sql
-- Partition by school_id for large tenants
CREATE TABLE geaesip_intelligence_cores_partitioned (
    LIKE geaesip_intelligence_cores
) PARTITION BY HASH (school_id);
```

### 2. API Scaling

#### Rate Limiting
```typescript
// Configured per tenant
const rateLimits = {
  basic: { requests: 100, window: 60 },
  standard: { requests: 500, window: 60 },
  enterprise: { requests: 1000, window: 60 },
};
```

#### Caching Strategy
| Data Type | Cache Duration | Invalidation |
|-----------|----------------|--------------|
| Intelligence Scores | 5 minutes | Event-driven |
| Dashboard KPIs | 1 minute | Real-time |
| Forecast Results | 1 hour | Version change |
| Static Config | 24 hours | Deploy |

### 3. AI Service Scaling

#### Concurrency Limits
```typescript
const aiConcurrency = {
  deepseek: { maxConcurrent: 10, timeout: 30000 },
  gemini: { maxConcurrent: 20, timeout: 30000 },
};
```

#### Fallback Strategy
```
Primary: DeepSeek → Fallback: Gemini → Local Model
```

### 4. Real-time Scaling

#### WebSocket Connections
- Supabase Realtime handles WebSocket connections
- Monitor connection count per tenant
- Implement connection limits per plan

#### Event Processing
```typescript
// Event bus configuration
const eventBus = {
  maxRetries: 3,
  retryDelay: 1000,
  deadLetterQueue: true,
};
```

## Backup & Recovery

### 1. Database Backups

#### Automated Backups
- Supabase provides daily automated backups
- Retention: 7 days (default)

#### Manual Backups
```bash
# Create backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore backup
psql $DATABASE_URL < backup_20260101.sql
```

### 2. Disaster Recovery

#### RTO/RPO Targets
| Metric | Target |
|--------|--------|
| Recovery Time Objective (RTO) | 4 hours |
| Recovery Point Objective (RPO) | 1 hour |

#### Recovery Procedures
1. Database failure: Restore from Supabase backup
2. Application failure: Redeploy from Vercel
3. AI service failure: Switch to fallback provider
4. Complete outage: Follow disaster recovery runbook

### 3. Data Retention

| Data Type | Retention | Deletion |
|-----------|-----------|----------|
| Intelligence Cores | Indefinite | Soft delete |
| Decision Audits | 7 years | Hard delete |
| Crisis Timelines | 10 years | Hard delete |
| Memory Fabric | 1 year (configurable) | TTL-based |
| API Usage | 90 days | Automatic |

## Security Checklist

### Pre-Deployment

- [ ] All environment variables secured
- [ ] RLS policies verified
- [ ] API keys rotated
- [ ] Webhook secrets configured
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] CSP headers set
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] Authentication flows tested
- [ ] Authorization checks verified
- [ ] Audit logging enabled

### Post-Deployment

- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Backup verification
- [ ] Performance baseline established
- [ ] Security scan completed
- [ ] Load testing completed
- [ ] Disaster recovery tested

## Troubleshooting

### Common Issues

#### 1. Intelligence Score Not Updating
```sql
-- Check last computed timestamp
SELECT id, last_computed_at 
FROM geaesip_intelligence_cores 
WHERE school_id = 'your-school-id';

-- Force recomputation
UPDATE geaesip_intelligence_cores 
SET last_computed_at = NULL 
WHERE school_id = 'your-school-id';
```

#### 2. Agent Missions Failing
```sql
-- Check agent status
SELECT id, status, last_active_at 
FROM geaesip_agent_registries 
WHERE school_id = 'your-school-id';

-- Check mission failures
SELECT id, status, result 
FROM geaesip_agent_missions 
WHERE school_id = 'your-school-id' 
AND status = 'FAILED';
```

#### 3. Crisis Escalation Timeout
```sql
-- Check crisis status
SELECT id, type, level, phase, created_at 
FROM geaesip_crises 
WHERE school_id = 'your-school-id' 
AND status = 'OPEN';

-- Check escalation config
SELECT * FROM geaesip_governance_policies 
WHERE domain = 'CRISIS';
```

#### 4. Memory Fabric Performance
```sql
-- Check memory count by type
SELECT type, COUNT(*) 
FROM geaesip_memories 
WHERE school_id = 'your-school-id' 
GROUP BY type;

-- Check expired memories
SELECT COUNT(*) 
FROM geaesip_memories 
WHERE expires_at < now() 
AND deleted_at IS NULL;
```

## Performance Tuning

### Database Queries

1. **Add missing indexes** for frequently queried columns
2. **Use EXPLAIN ANALYZE** to identify slow queries
3. **Implement query pagination** for large result sets
4. **Consider materialized views** for complex aggregations

### API Responses

1. **Implement response caching** for read-heavy endpoints
2. **Use field selection** to return only needed data
3. **Compress responses** for large payloads
4. **Implement pagination** for list endpoints

### AI Processing

1. **Batch processing** for multiple intelligence computations
2. **Async processing** for non-critical AI tasks
3. **Result caching** for repeated queries
4. **Fallback handling** for AI service failures