# Deployment — Phase 3.3 Assessment Engine

## Platform

- **Hosting**: Vercel
- **Database**: Supabase (PostgreSQL)
- **Storage**: AWS S3 via Supabase Storage
- **CDN**: Vercel Edge Network

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database
DATABASE_URL=

# AI Services
OPENAI_API_KEY=
AI_MODEL_VERSION=

# Blockchain (certificates)
ETHEREUM_RPC_URL=
SOLANA_RPC_URL=

# Storage
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# Notifications
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMS_API_KEY=
PUSH_NOTIFICATION_KEY=

# Security
ENCRYPTION_KEY=
JWT_SECRET=
SESSION_SECRET=

# Monitoring
SENTRY_DSN=
ANALYTICS_KEY=
```

## Database Migrations

Located in `packages/database/migrations/` or Supabase dashboard.

### Assessment Tables

```sql
-- Module 1: AI Assessment Engine
CREATE TABLE ai_question_generators (...);
CREATE TABLE adaptive_exams (...);
CREATE TABLE automatic_gradings (...);
CREATE TABLE exam_sessions (...);
CREATE TABLE exam_attempts (...);
CREATE TABLE proctoring_ai (...);
CREATE TABLE cheating_detections (...);

-- Module 2: Question Bank
CREATE TABLE question_categories (...);
CREATE TABLE question_tags (...);
CREATE TABLE question_versions (...);
CREATE TABLE question_pools (...);

-- Module 3: Certification
CREATE TABLE certificates (...);
CREATE TABLE certificate_templates (...);
CREATE TABLE skill_badges (...);
CREATE TABLE transcript_generators (...);

-- Module 4: Competency
CREATE TABLE competency_tests (...);
CREATE TABLE skill_matrices (...);
CREATE TABLE portfolios (...);
CREATE TABLE peer_assessments (...);

-- Module 5: National Examination
CREATE TABLE national_exams (...);
CREATE TABLE exam_centers (...);
CREATE TABLE seat_allocations (...);
CREATE TABLE candidate_registrations (...);

-- Module 6-11: Accreditation, Integrity, Portfolio, Research, International, AI
-- ... additional tables
```

### Row Level Security

```sql
-- All tables use school_id scoping
ALTER TABLE [table] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_isolation" ON [table]
  FOR ALL USING (school_id = auth.uid()::text);
```

## Deployment Steps

1. **Build**: `npm run build` (Next.js production build)
2. **Migrate**: Run Supabase migrations
3. **Deploy**: `vercel deploy --prod`
4. **Verify**: Health check at `/api/health`

## Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["cdg1"],
  "memory": 3009,
  "maxDuration": 30
}
```

## CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy Phase 3.3
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test
      - run: npm run lint
      - run: npm run typecheck
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v25
```

## Performance

- **Cold start**: < 2s (Vercel Edge)
- **API response**: < 200ms (p95)
- **PDF generation**: < 30s
- **Report generation**: < 60s
- **File upload**: 50MB max
- **Rate limit**: 100 req/min per IP

## Monitoring

- **Errors**: Sentry (`sentry.edge.config.ts`, `sentry.server.config.ts`)
- **Analytics**: Vercel Analytics
- **Logs**: Vercel Logs + Supabase Logs
- **Uptime**: Vercel Health Checks
