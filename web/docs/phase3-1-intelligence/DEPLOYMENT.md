# Déploiement — Phase 3.1 Intelligence

## Prérequis

- Node.js 18+
- Supabase CLI
- Vercel CLI (ou alternative)
- Variables d'environnement configurées

## Variables d'environnement

### Variables obligatoires

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Variables Intelligence (Phase 3.1)

```env
# IA/ML (optionnel - pour les modèles prédictifs)
AI_MODEL_ENDPOINT=https://your-ai-endpoint.com
AI_API_KEY=your-ai-api-key

# Monitoring (optionnel)
SENTRY_DSN=https://your-sentry-dsn
```

## Migrations de base de données

### Tables Intelligence (32 tables)

```sql
-- Tables core
CREATE TABLE intelligence_engines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  source_types TEXT[] NOT NULL,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  engine_id UUID REFERENCES intelligence_engines(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  config JSONB NOT NULL,
  sync_interval_minutes INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_pipelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  engine_id UUID REFERENCES intelligence_engines(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('ETL', 'STREAM', 'BATCH', 'REAL_TIME')),
  source_ids UUID[] NOT NULL,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables modèles & scores
CREATE TABLE intelligence_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  engine_id UUID REFERENCES intelligence_engines(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(30) NOT NULL,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  engine_id UUID REFERENCES intelligence_engines(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  score DECIMAL(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  period VARCHAR(20) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables alertes & recommandations
CREATE TABLE intelligence_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  engine_id UUID REFERENCES intelligence_engines(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  severity VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  source VARCHAR(200),
  entity_type VARCHAR(100),
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  engine_id UUID REFERENCES intelligence_engines(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  status VARCHAR(20) DEFAULT 'pending',
  assigned_to UUID,
  due_date TIMESTAMPTZ,
  completion_notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables dashboards & widgets
CREATE TABLE intelligence_dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  role VARCHAR(50) NOT NULL,
  user_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  dashboard_id UUID REFERENCES intelligence_dashboards(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  config JSONB DEFAULT '{}',
  position JSONB DEFAULT '{}',
  size VARCHAR(20) DEFAULT 'medium',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables KPIs & insights
CREATE TABLE intelligence_kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  dashboard_id UUID REFERENCES intelligence_dashboards(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  target DECIMAL(10,2),
  unit VARCHAR(50),
  trend VARCHAR(20),
  change_percent DECIMAL(5,2),
  category VARCHAR(50),
  period VARCHAR(20),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  entity_type VARCHAR(100),
  entity_id UUID,
  data JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables prédictives
CREATE TABLE intelligence_predictive_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  config JSONB DEFAULT '{}',
  training_data_points INTEGER DEFAULT 0,
  accuracy DECIMAL(3,2) CHECK (accuracy >= 0 AND accuracy <= 1),
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_student_risk (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  risk_score DECIMAL(5,2) NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level VARCHAR(20) NOT NULL,
  risk_factors JSONB NOT NULL,
  recommended_interventions TEXT[],
  confidence DECIMAL(3,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_early_warnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  confidence DECIMAL(3,2),
  status VARCHAR(20) DEFAULT 'active',
  acknowledged_by UUID,
  resolved_by UUID,
  resolution TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables NLP & connaissances
CREATE TABLE intelligence_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  tags TEXT[],
  summary TEXT,
  author VARCHAR(200),
  is_published BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_nlp_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  language VARCHAR(10) DEFAULT 'fr',
  task VARCHAR(50) NOT NULL,
  config JSONB DEFAULT '{}',
  result JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables analytics
CREATE TABLE intelligence_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  dimension VARCHAR(100) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50),
  period VARCHAR(50),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_analytics_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  format VARCHAR(20) NOT NULL,
  config JSONB DEFAULT '{}',
  schedule VARCHAR(50),
  recipients TEXT[],
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tables intégration
CREATE TABLE intelligence_connectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  config JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE intelligence_data_syncs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  connector_id UUID REFERENCES intelligence_connectors(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  config JSONB DEFAULT '{}',
  last_sync_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'idle',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour performance
CREATE INDEX idx_intelligence_engines_school ON intelligence_engines(school_id);
CREATE INDEX idx_intelligence_data_sources_engine ON intelligence_data_sources(engine_id);
CREATE INDEX idx_intelligence_scores_engine ON intelligence_scores(engine_id);
CREATE INDEX idx_intelligence_alerts_school ON intelligence_alerts(school_id);
CREATE INDEX idx_intelligence_student_risk_student ON intelligence_student_risk(student_id);
CREATE INDEX idx_intelligence_early_warnings_entity ON intelligence_early_warnings(entity_type, entity_id);
CREATE INDEX idx_intelligence_knowledge_base_school ON intelligence_knowledge_base(school_id);
```

## Déploiement Vercel

```bash
# Build
npm run build

# Déploiement
vercel --prod

# Variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

## Vérification post-déploiement

1. Vérifier les routes API : `GET /api/intelligence/engines?schoolId=xxx`
2. Vérifier les tables dans Supabase
3. Tester les hooks React dans le dashboard
4. Vérifier les logs Sentry (si configuré)
