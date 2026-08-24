# FINANCIAL_INTELLIGENCE.md — Intelligence Financière

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module d'Intelligence Financière fournit des analyses prédictives, détection d'anomalies, prévisions de trésorerie et recommandations d'optimisation financière via IA.

---

## 2. Schéma de base de données

```sql
-- Modèles prédictifs
CREATE TABLE financial_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  model_name VARCHAR(200) NOT NULL,
  model_type VARCHAR(50) CHECK (model_type IN (
    'REVENUE_FORECAST', 'CASH_FLOW_FORECAST', 'DEFAULT_PREDICTION',
    'COST_OPTIMIZATION', 'DEMAND_FORECAST', 'ANOMALY_DETECTION'
  )),
  parameters JSONB NOT NULL,
  training_data_range DATERANGE,
  last_trained_at TIMESTAMPTZ,
  accuracy_score DECIMAL(5,4),
  status VARCHAR(20) DEFAULT 'READY' CHECK (status IN (
    'TRAINING', 'READY', 'STALE', 'FAILED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prévisions
CREATE TABLE financial_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  model_id UUID NOT NULL REFERENCES financial_models(id),
  forecast_type VARCHAR(50) NOT NULL,
  target_date DATE NOT NULL,
  predicted_value DECIMAL(15,2) NOT NULL,
  confidence_lower DECIMAL(15,2),
  confidence_upper DECIMAL(15,2),
  confidence_level DECIMAL(3,2) DEFAULT 0.95,
  actual_value DECIMAL(15,2),
  error_margin DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Détections d'anomalies
CREATE TABLE financial_anomalies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  anomaly_type VARCHAR(50) CHECK (anomaly_type IN (
    'AMOUNT_SPIKE', 'FREQUENCY_CHANGE', 'PATTERN_BREAK',
    'NEW_VENDOR', 'ROUND_TRIP', 'UNUSUAL_TIMING'
  )),
  severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH')),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  description TEXT NOT NULL,
  expected_range VARCHAR(100),
  actual_value DECIMAL(15,2),
  anomaly_score DECIMAL(5,2),
  status VARCHAR(20) DEFAULT 'DETECTED' CHECK (status IN (
    'DETECTED', 'REVIEWED', 'FALSE_POSITIVE', 'CONFIRMED'
  )),
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recommandations IA
CREATE TABLE financial_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  category VARCHAR(50) CHECK (category IN (
    'COST_REDUCTION', 'REVENUE_OPTIMIZATION', 'CASH_FLOW',
    'INVESTMENT', 'DEBT_MANAGEMENT', 'PRICING'
  )),
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  impact_estimate DECIMAL(15,2),
  impact_type VARCHAR(20) CHECK (impact_type IN ('SAVING', 'REVENUE', 'RISK_REDUCTION')),
  priority VARCHAR(20) CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
  status VARCHAR(20) DEFAULT 'NEW' CHECK (status IN (
    'NEW', 'ACKNOWLEDGED', 'IMPLEMENTING', 'IMPLEMENTED', 'REJECTED'
  )),
  implemented_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  implemented_at TIMESTAMPTZ
);

-- Index
CREATE INDEX idx_fin_models_school ON financial_models(school_id);
CREATE INDEX idx_forecasts_school ON financial_forecasts(school_id);
CREATE INDEX idx_forecasts_date ON financial_forecasts(target_date);
CREATE INDEX idx_anomalies_school ON financial_anomalies(school_id);
CREATE INDEX idx_anomalies_status ON financial_anomalies(status);
CREATE INDEX idx_recommendations_school ON financial_recommendations(school_id);
CREATE INDEX idx_recommendations_priority ON financial_recommendations(priority);
```

---

## 3. RBAC

| Rôle | Voir prévisions | Voir anomalies | Voir recommandations | Entraîner modèle |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✗ |
| COMPTABLE | ✓ | ✗ | ✗ | ✗ |
| DIRECTEUR | ✓ | ✓ | ✓ | ✗ |

---

## 4. Service IA

```typescript
// services/intelligence/financial-intelligence.service.ts
interface FinancialIntelligenceService {
  forecastRevenue(schoolId: string, months: number): Promise<Forecast[]>;
  forecastCashFlow(schoolId: string, days: number): Promise<Forecast[]>;
  detectAnomalies(schoolId: string, period: string): Promise<Anomaly[]>;
  generateRecommendations(schoolId: string): Promise<Recommendation[]>;
  retrainModel(modelId: string): Promise<void>;
  getInsightsDashboard(schoolId: string): Promise<InsightsDashboard>;
}
```

---

## 5. API Endpoints

```
GET    /api/intelligence/forecasts             → Prévisions financières
GET    /api/intelligence/forecasts/:type       → Prévision par type
GET    /api/intelligence/anomalies             → Anomalies détectées
PATCH  /api/intelligence/anomalies/:id         → Traiter une anomalie
GET    /api/intelligence/recommendations       → Recommandations IA
PATCH  /api/intelligence/recommendations/:id   → Mettre à jour statut
GET    /api/intelligence/dashboard             → Tableau de bord IA
POST   /api/intelligence/models/:id/retrain    → Ré-entraîner (SUPER_ADMIN)
GET    /api/intelligence/insights              → Insights agrégés
```

---

## 6. Règles métier

1. **Prévisions** : Rafraîchissement hebdomadaire des modèles
2. **Anomalies** : Seuil de détection configurable par établissement
3. **Recommandations** : Impact financier estimé en XOF
4. **Confiance** : Intervalles de confiance à 95% par défaut
5. **Explicabilité** : Chaque recommandation inclut le raisonnement IA

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
