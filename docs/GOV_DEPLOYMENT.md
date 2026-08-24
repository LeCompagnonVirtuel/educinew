# GOV_DEPLOYMENT.md — Government Deployment Guide

**Phase 4.1 — Government Integration**
**Version**: 1.0
**Status**: Production

---

## 1. Overview

Deployment instructions for government integration services. Follow these procedures to deploy, configure, and maintain the EduCI government platform.

## 2. Prerequisites

### 2.1 Infrastructure Requirements
- **Supabase Project**: Production-ready instance
- **Vercel Account**: Deployment platform
- **Node.js**: v18+ LTS
- **npm**: v9+
- **Git**: Latest version

### 2.2 Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
JWT_SECRET=your-jwt-secret
GOV_API_KEY=your-government-api-key
GOV_CLIENT_ID=your-client-id
ENCRYPTION_KEY=your-encryption-key
SENTRY_DSN=your-sentry-dsn
```

## 3. Database Setup

### 3.1 Schema Migration
```bash
npx supabase migration up
npx supabase migration list
```

### 3.2 RLS Policies
```sql
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "School access" ON schools
  FOR ALL USING (school_id = auth.uid());

CREATE POLICY "Student access" ON students
  FOR SELECT USING (school_id = auth.uid());
```

## 4. Deployment Process

### 4.1 Pre-deployment Checklist
- [ ] All tests passing
- [ ] Code review completed
- [ ] Security scan completed
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Backup created
- [ ] Rollback plan documented

### 4.2 Deployment Steps
```bash
git pull origin main
npm ci
npm test
npm run build
npx supabase migration up
vercel --prod
curl -I https://your-domain.com
```

## 5. Configuration

### 5.1 Environment Configuration
| Variable | Production | Staging | Development |
|----------|------------|---------|-------------|
| SUPABASE_URL | Production URL | Staging URL | Local URL |
| LOG_LEVEL | warn | info | debug |
| CACHE_TTL | 3600 | 300 | 0 |
| RATE_LIMIT | 1000 | 100 | 10 |

### 5.2 Feature Flags
```json
{
  "features": {
    "government_api": true,
    "digital_identity": true,
    "open_data": true,
    "emergency_management": true,
    "analytics": true
  }
}
```

## 6. Monitoring

### 6.1 Health Checks
```typescript
export default async function handler(req, res) {
  const checks = {
    database: await checkDatabase(),
    cache: await checkCache(),
    storage: await checkStorage()
  };
  const healthy = Object.values(checks).every(c => c.status === 'ok');
  res.status(healthy ? 200 : 503).json({ status: healthy ? 'healthy' : 'unhealthy', checks });
}
```

### 6.2 Alerting Rules
- **Response Time**: > 500ms
- **Error Rate**: > 1%
- **CPU Usage**: > 80%
- **Memory Usage**: > 85%

## 7. Backup and Recovery

### 7.1 Backup Schedule
- **Daily**: Incremental database backup
- **Weekly**: Full database backup
- **Monthly**: Full system backup

### 7.2 Recovery Procedures
```bash
npx supabase db restore --backup-id=backup-2026-08-06
npx supabase db restore --point-in-time=2026-08-06T10:00:00Z
npx supabase db verify
```

## 8. Scaling

- **Vercel**: Automatic horizontal scaling
- **Supabase**: Connection pooling
- **CDN**: Static asset distribution
- **Redis**: Caching layer

## 9. Security Hardening

- **Firewall**: Restrict unnecessary ports
- **SSH**: Key-based authentication only
- **CSP**: Content Security Policy
- **HSTS**: HTTP Strict Transport Security

## 10. Maintenance

- **Daily**: Log rotation, health checks
- **Weekly**: Performance review, security scans
- **Monthly**: Dependency updates, backup verification
- **Quarterly**: Security audits, capacity planning

## 11. Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Database connection | Pool exhaustion | Increase pool size |
| Slow queries | Missing indexes | Add appropriate indexes |
| Auth failures | Token expiry | Implement refresh tokens |

---

**Last Updated**: August 2026
**Owner**: DevOps Team