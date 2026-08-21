# Deployment — Phase 3.2 Adaptive Learning Intelligence

## Overview

Deployment guide for the Adaptive Learning Intelligence module covering environment variables, database migration, Vercel deployment, and Supabase RLS policies.

## Environment Variables

### Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Adaptive-Specific

```env
# AI Engine
AI_TUTOR_MODEL=gpt-4
AI_TUTOR_MAX_TOKENS=2048
AI_TUTOR_TEMPERATURE=0.7

# Knowledge Tracing
KNOWLEDGE_TRACING_ALGORITHM=bkt
KNOWLEDGE_TRACING_LEARN_RATE=0.1

# Spaced Repetition
SPACED_REPETITION_ALGORITHM=fsrs
SPACED_REPETITION_MAX_INTERVAL=365

# Recommendations
RECOMMENDATION_ALGORITHM=hybrid
RECOMMENDATION_MAX_ITEMS=10

# Analytics
ANALYTICS_RETENTION_DAYS=90
ANALYTICS_AGGREGATION_INTERVAL=daily
```

### Optional

```env
# Voice
VOICE_PROVIDER=elevenlabs
VOICE_API_KEY=...

# Image Processing
IMAGE_MAX_WIDTH=1920
IMAGE_MAX_HEIGHT=1080

# Monitoring
SENTRY_DSN=...
LOG_LEVEL=info
```

## Database Migration

### Migration Files

```
supabase/migrations/
├── 20250101000001_adaptive_profiles.sql
├── 20250101000002_adaptive_learning_paths.sql
├── 20250101000003_adaptive_content_items.sql
├── 20250101000004_adaptive_difficulty_profiles.sql
├── 20250101000005_adaptive_knowledge_gaps.sql
├── 20250101000006_adaptive_competencies.sql
├── 20250101000007_adaptive_assessments.sql
├── 20250101000008_adaptive_repetition_cards.sql
├── 20250101000009_adaptive_recommendations.sql
├── 20250101000010_adaptive_analytics.sql
├── 20250101000011_adaptive_experiments.sql
├── 20250101000012_adaptive_realtime.sql
├── 20250101000013_adaptive_prerequisites.sql
├── 20250101000014_adaptive_mastery.sql
├── 20250101000015_adaptive_sessions.sql
├── 20250101000016_adaptive_engagement.sql
├── 20250101000017_adaptive_feedback.sql
├── 20250101000018_adaptive_goals.sql
├── 20250101000019_adaptive_gamification.sql
├── 20250101000020_adaptive_notifications.sql
├── 20250101000021_adaptive_progress.sql
├── 20250101000022_adaptive_social.sql
├── 20250101000023_adaptive_curation.sql
├── 20250101000024_adaptive_accessibility.sql
├── 20250101000025_adaptive_instructor.sql
└── 20250101000026_adaptive_curriculum.sql
```

### Migration Command

```bash
# Apply migrations
supabase db push

# Or apply individually
supabase migration up 20250101000001_adaptive_profiles
```

### Table Schema Pattern

```sql
CREATE TABLE adaptive_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  learning_style TEXT DEFAULT 'visual',
  cognitive_load DECIMAL(3,2) DEFAULT 0.5,
  prior_knowledge DECIMAL(3,2) DEFAULT 0.0,
  motivation_level TEXT DEFAULT 'medium',
  learning_pace TEXT DEFAULT 'moderate',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_adaptive_profiles_school ON adaptive_profiles(school_id);
CREATE INDEX idx_adaptive_profiles_user ON adaptive_profiles(user_id);
CREATE INDEX idx_adaptive_profiles_status ON adaptive_profiles(status);
```

## Vercel Deployment

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "crons": [
    {
      "path": "/api/adaptive/analytics/aggregate",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/adaptive/repetition/optimize",
      "schedule": "0 3 * * *"
    }
  ]
}
```

### Build Steps

```bash
# Install dependencies
npm ci

# Run typecheck
npm run typecheck

# Run lint
npm run lint

# Run tests
npm run test

# Build
npm run build

# Deploy
vercel --prod
```

### Post-Deploy

```bash
# Verify API routes
curl https://your-domain.com/api/adaptive/profiles?schoolId=test

# Check analytics cron
curl https://your-domain.com/api/adaptive/analytics/aggregate
```

## Supabase RLS Policies

### Profile RLS

```sql
-- Enable RLS
ALTER TABLE adaptive_profiles ENABLE ROW LEVEL SECURITY;

-- School isolation
CREATE POLICY "school_isolation" ON adaptive_profiles
  FOR ALL
  USING (school_id = auth.jwt() ->> 'school_id');

-- Service role access
CREATE POLICY "service_role_access" ON adaptive_profiles
  FOR ALL
  USING (auth.role() = 'service_role');
```

### Learning Path RLS

```sql
ALTER TABLE adaptive_learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_isolation" ON adaptive_learning_paths
  FOR ALL
  USING (school_id = auth.jwt() ->> 'school_id');
```

### Content RLS

```sql
ALTER TABLE adaptive_content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_isolation" ON adaptive_content_items
  FOR ALL
  USING (school_id = auth.jwt() ->> 'school_id');

CREATE POLICY "public_read" ON adaptive_content_items
  FOR SELECT
  USING (status = 'published');
```

### Assessment RLS

```sql
ALTER TABLE adaptive_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_isolation" ON adaptive_assessments
  FOR ALL
  USING (school_id = auth.jwt() ->> 'school_id');

CREATE POLICY "student_submit" ON adaptive_assessment_responses
  FOR INSERT
  WITH CHECK (user_id = auth.uid());
```

### Analytics RLS

```sql
ALTER TABLE adaptive_learning_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_isolation" ON adaptive_learning_sessions
  FOR ALL
  USING (school_id = auth.jwt() ->> 'school_id');

CREATE POLICY "user_own_data" ON adaptive_learner_analytics
  FOR SELECT
  USING (user_id = auth.uid());
```

### Gamification RLS

```sql
ALTER TABLE adaptive_leaderboards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_isolation" ON adaptive_leaderboards
  FOR ALL
  USING (school_id = auth.jwt() ->> 'school_id');

CREATE POLICY "public_view" ON adaptive_leaderboard_entries
  FOR SELECT
  USING (true);
```

### Notification RLS

```sql
ALTER TABLE adaptive_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_own_notifications" ON adaptive_notifications
  FOR ALL
  USING (user_id = auth.uid());
```

## Post-Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Database migrations applied
- [ ] RLS policies enabled on all tables
- [ ] API routes responding correctly
- [ ] Analytics cron jobs scheduled
- [ ] Error monitoring configured
- [ ] Performance benchmarks met
- [ ] Security audit completed
