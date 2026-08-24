# WORKFORCE_AI - IA Prédictive Workforce

Phase 4.4 - Module Workforce AI

---

## 1. Objectif

IA pour prédire les tendances du marché, optimiser le matching talents-emplois, recommander des parcours de formation.

## 2. Modèle de Données

```sql
CREATE TABLE ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  prediction_type TEXT CHECK (prediction_type IN ('DEMAND','SALARY','SKILLS_TREND','EMPLOYABILITY')),
  target_entity TEXT,
  target_id UUID,
  prediction JSONB NOT NULL,
  confidence DECIMAL(3,2),
  model_version TEXT,
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  user_id UUID REFERENCES users(id),
  recommendation_type TEXT CHECK (recommendation_type IN ('COURSE','CERTIFICATION','JOB','SKILL','CAREER_PATH')),
  recommendation_data JSONB NOT NULL,
  relevance_score DECIMAL(3,2),
  reason TEXT,
  is_accepted BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ai_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name TEXT NOT NULL,
  model_type TEXT CHECK (model_type IN ('REGRESSION','CLASSIFICATION','CLUSTERING','NLP')),
  provider TEXT CHECK (provider IN ('DEEPSEEK','GEMINI','CUSTOM')),
  endpoint TEXT,
  parameters JSONB DEFAULT '{}',
  performance_metrics JSONB DEFAULT '{}',
  last_trained TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### POST /api/workforce-ai/predict
```json
{
  "prediction_type": "DEMAND",
  "target_entity": "job_title",
  "parameters": {
    "job_title": "Data Scientist",
    "region": "Dakar",
    "horizon_months": 12
  }
}
```
**Response:**
```json
{
  "prediction": {
    "predicted_demand": "VERY_HIGH",
    "growth_rate": 35.2,
    "confidence": 0.88,
    "valid_until": "2025-03-15"
  }
}
```

### POST /api/workforce-ai/recommend
```json
{
  "user_id": "uuid",
  "recommendation_type": "CAREER_PATH",
  "context": {
    "current_skills": ["React", "Node.js"],
    "experience_years": 2,
    "salary_goal": 1000000
  }
}
```
**Response:**
```json
{
  "recommendations": [
    {
      "type": "CAREER_PATH",
      "title": "Full Stack → Cloud Architect",
      "relevance_score": 0.92,
      "steps": [
        { "action": "Certification AWS", "timeline": "3 mois", "impact": "HIGH" },
        { "action": "Projet cloud", "timeline": "2 mois", "impact": "MEDIUM" }
      ],
      "predicted_salary_increase": 45
    }
  ]
}
```

### POST /api/workforce-ai/match
```json
{
  "talent_id": "uuid",
  "match_type": "JOB",
  "filters": { "location": "Dakar", "min_salary": 500000 }
}
```

### GET /api/workforce-ai/insights/:schoolId
```json
{
  "insights": {
    "top_skills_demand": [
      { "skill": "React", "growth": "+25%" },
      { "skill": "Python", "growth": "+18%" }
    ],
    "employment_forecast": { "next_quarter": "POSITIVE", "confidence": 0.85 }
  }
}
```

## 4. RBAC

| Rôle | Predict | Recommend | Match | Insights |
|------|---------|-----------|-------|----------|
| SUPER_ADMIN | ✅ | ✅ | ✅ | ✅ |
| ADMIN | ✅ | ✅ | ✅ | ✅ |
| ENSEIGNANT | ❌ | R (own) | R (own) | R (school) |
| ELEVE | ❌ | R (own) | R (own) | R (public) |

## 5. AI Providers

```typescript
const AIProviders = {
  DEEPSEEK: { useCase: 'Text analysis, recommendations', model: 'deepseek-chat' },
  GEMINI: { useCase: 'Predictions, complex analysis', model: 'gemini-pro' },
  CUSTOM: { useCase: 'Domain-specific models', model: 'workforce-v1' }
};
```

## 6. Model Training Pipeline

```typescript
const TrainingPipeline = {
  dataCollection: async () => { /* Fetch historical data */ },
  preprocessing: async (data) => { /* Clean & normalize */ },
  training: async (data) => { /* Train model */ },
  evaluation: async (model) => { /* Validate metrics */ },
  deployment: async (model) => { /* Deploy to production */ }
};
```

## 7. Monitoring

- Model performance (accuracy, F1, A/B testing)
- Prediction drift detection
- Bias monitoring
- Latency tracking
- Cost optimization

## 8. Index

```sql
CREATE INDEX idx_ai_predictions_type ON ai_predictions(prediction_type);
CREATE INDEX idx_ai_predictions_entity ON ai_predictions(target_entity, target_id);
CREATE INDEX idx_ai_recommendations_user ON ai_recommendations(user_id);
CREATE INDEX idx_ai_recommendations_type ON ai_recommendations(recommendation_type);
CREATE INDEX idx_ai_models_provider ON ai_models(provider);
```
