# Deployment Guide — EduCI Phase 4.0

**Version:** 4.0.0  
**Status:** Active  
**Last Updated:** 2026-08-06

---

## Overview

This guide covers deployment procedures for EduCI across frontend, backend, and database components.

---

## Architecture

### Deployment Targets

| Component | Platform | Method |
|-----------|----------|--------|
| Web App | Vercel | Git push |
| Backend | Supabase Edge Functions | CLI deploy |
| Database | Supabase | Migration files |
| Mobile | App Store / Play Store | Build & submit |

---

## Environments

| Environment | Purpose | URL |
|-------------|---------|-----|
| Development | Local development | localhost:3000 |
| Preview | PR validation | *.vercel.app |
| Staging | Pre-production | staging.educi.app |
| Production | Live | educi.app |

---

## CI/CD Pipeline

### Pipeline Flow

```
Push → Build → Test → Deploy (Preview) → Review → Merge → Deploy (Production)
```

### GitHub Actions

```yaml
name: Deploy
on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Frontend Deployment

### Vercel Configuration

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci"
}
```

### Environment Variables

| Variable | Environment | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | All | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Yes |
| `NEXT_PUBLIC_APP_URL` | All | Yes |

### Domain Configuration

1. Add domain in Vercel dashboard
2. Configure DNS records
3. Enable SSL (auto via Vercel)
4. Set up redirects

---

## Backend Deployment

### Supabase Edge Functions

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy api-v1-students
```

### Function Structure

```
supabase/functions/
├── api-v1-students/
│   ├── index.ts
│   └── _shared/
├── api-v1-grades/
│   ├── index.ts
│   └── _shared/
└── webhook-money-fusion/
    └── index.ts
```

### Environment Variables

| Variable | Required |
|----------|----------|
| `SUPABASE_URL` | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes |
| `DEEPSEEK_API_KEY` | Yes |
| `GEMINI_API_KEY` | Yes |
| `MONEY_FUSION_SECRET` | Yes |

---

## Database Deployment

### Migration Process

```bash
# Create new migration
supabase migration new add_students_table

# Apply migrations locally
supabase db reset

# Push to production
supabase db push
```

### Migration Checklist

- [ ] Forward-only migrations
- [ ] Backward compatible
- [ ] Indexes created
- [ ] RLS policies added
- [ ] Tested locally
- [ ] Rollback plan documented

---

## Mobile Deployment

### iOS

```bash
# Build
eas build --platform ios

# Submit
eas submit --platform ios
```

### Android

```bash
# Build
eas build --platform android

# Submit
eas submit --platform android
```

---

## Pre-Deployment Checklist

### Code Quality

- [ ] TypeScript compilation passes
- [ ] ESLint passes with zero errors
- [ ] All tests passing
- [ ] Code review approved
- [ ] No security vulnerabilities

### Configuration

- [ ] Environment variables set
- [ ] Database migrations ready
- [ ] API endpoints documented
- [ ] Error monitoring configured
- [ ] Logging configured

### Security

- [ ] Secrets not in code
- [ ] RLS policies tested
- [ ] Rate limiting configured
- [ ] CORS configured
- [ ] CSP headers set

---

## Rollback Procedures

### Frontend Rollback

1. Identify last working commit
2. Revert in Vercel dashboard or git revert
3. Verify deployment
4. Notify team

### Database Rollback

```bash
# If migration has rollback
supabase migration down

# Manual rollback
psql -f rollback_script.sql
```

### Edge Function Rollback

```bash
# Deploy previous version
supabase functions deploy api-v1-students --no-verify-jwt
```

---

## Post-Deployment

### Verification Steps

1. Smoke test critical paths
2. Check error monitoring
3. Verify payment processing
4. Test AI features
5. Monitor performance metrics

### Communication

- Update status page
- Notify stakeholders
- Document changes in CHANGELOG.md

---

## Related Documentation

- [OPERATIONS.md](OPERATIONS.md) — Operations Guide
- [SECURITY.md](SECURITY.md) — Security Documentation
- [TESTING.md](TESTING.md) — Testing Documentation
