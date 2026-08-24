# FINANCIAL_AI.md — Intelligence Artificielle Financière

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module IA Financière intègre DeepSeek et Gemini pour l'analyse prédictive, la détection de fraude, l'optimisation des coûts et l'automatisation des tâches financières répétitives.

---

## 2. Schéma de base de données

```sql
-- Prompts et configurations IA
CREATE TABLE ai_financial_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_name VARCHAR(200) NOT NULL,
  model_provider VARCHAR(20) CHECK (model_provider IN ('DEEPSEEK', 'GEMINI')),
  model_name VARCHAR(100) NOT NULL,
  task_type VARCHAR(50) CHECK (task_type IN (
    'REVENUE_FORECAST', 'COST_PREDICTION', 'FRAUD_DETECTION',
    'ANOMALY_DETECTION', 'RECOMMENDATION', 'NATURAL_LANGUAGE_QUERY',
    'DOCUMENT_ANALYSIS', 'RISK_ASSESSMENT'
  )),
  system_prompt TEXT NOT NULL,
  parameters JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Historique des requêtes IA
CREATE TABLE ai_query_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  config_id UUID NOT NULL REFERENCES ai_financial_configs(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  input_data JSONB NOT NULL,
  output_data JSONB,
  tokens_used INTEGER,
  latency_ms INTEGER,
  status VARCHAR(20) CHECK (status IN ('SUCCESS', 'FAILED', 'TIMEOUT')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scores de risque IA
CREATE TABLE ai_risk_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN (
    'STUDENT', 'SUPPLIER', 'TRANSACTION', 'INVESTMENT', 'POLICY'
  )),
  entity_id UUID NOT NULL,
  risk_type VARCHAR(50) NOT NULL CHECK (risk_type IN (
    'DEFAULT', 'FRAUD', 'COMPLIANCE', 'CREDIT', 'OPERATIONAL'
  )),
  risk_score DECIMAL(5,2) NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
  risk_level VARCHAR(20) CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  factors JSONB NOT NULL,
  model_version VARCHAR(20),
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chatbot financier
CREATE TABLE financial_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  message_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED'))
);

CREATE TABLE financial_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES financial_chat_sessions(id) ON DELETE CASCADE,
  role VARCHAR(10) NOT NULL CHECK (role IN ('USER', 'ASSISTANT', 'SYSTEM')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_ai_configs_task ON ai_financial_configs(task_type);
CREATE INDEX idx_ai_logs_school ON ai_query_logs(school_id);
CREATE INDEX idx_ai_logs_config ON ai_query_logs(config_id);
CREATE INDEX idx_ai_risk_entity ON ai_risk_scores(entity_type, entity_id);
CREATE INDEX idx_ai_risk_level ON ai_risk_scores(risk_level);
CREATE INDEX idx_chat_sessions_user ON financial_chat_sessions(user_id);
CREATE INDEX idx_chat_messages_session ON financial_chat_messages(session_id);
```

---

## 3. RBAC

| Rôle | Utiliser IA | Voir scores risque | Configurer modèles | Chatbot |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✗ | ✓ |
| COMPTABLE | ✓ | ✗ | ✗ | ✓ |
| DIRECTEUR | ✓ | ✓ | ✗ | ✓ |
| PARENT | ✗ | ✗ | ✗ | ✓ (limité) |
| ELEVE | ✗ | ✗ | ✗ | ✗ |

---

## 4. Service IA

```typescript
// services/ai/financial-ai.service.ts
interface FinancialAIService {
  forecastRevenue(schoolId: string, params: ForecastParams): Promise<AIForecast>;
  detectFraud(schoolId: string, transaction: Transaction): Promise<FraudResult>;
  calculateRiskScore(entityType: string, entityId: string): Promise<RiskScore>;
  analyzeDocument(fileUrl: string, task: string): Promise<DocumentAnalysis>;
  queryFinancialData(schoolId: string, question: string): Promise<AIResponse>;
  generateReport(schoolId: string, reportType: string): Promise<AIReport>;
}
```

---

## 5. API Endpoints

```
POST   /api/ai/forecast                         → Prévision IA
POST   /api/ai/fraud-detect                     → Détection de fraude
POST   /api/ai/risk-score                       → Calcul score de risque
POST   /api/ai/document-analysis                → Analyse de document
POST   /api/ai/chat                             → Chatbot financier
GET    /api/ai/chat/:sessionId                  → Messages d'une session
GET    /api/ai/risk-scores                      → Scores de risque
GET    /api/ai/logs                             → Historique des requêtes
```

---

## 6. Règles métier

1. **Pas de logique IA côté client** : Toujours via Edge Functions
2. **Explicabilité** : Chaque prédiction inclut les facteurs d'influence
3. **Rate limiting** : Max 100 requêtes IA/heure par établissement
4. **Confidentialité** : Les données ne sont jamais envoyées à des tiers
5. **Fallback** : Si IA indisponible, fallback sur règles métier

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
