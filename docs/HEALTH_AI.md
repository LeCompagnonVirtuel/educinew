# HEALTH AI MODULE

Phase 4.6 — Intelligence Artificielle pour la Santé Scolaire

---

## 1. Vision

Utilisation de DeepSeek et Gemini pour l'analyse prédictive, le dépistage et les recommandations sanitaires. Toujours via Edge Functions.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Config IA globale |
| ADMIN | Config école |
| INFIRMIER | Résultats IA + recommandations |
| DIRECTEUR | Rapports IA |
| ENSEIGNANT | Alertes élèves de ses classes |
| PARENT | Recommandations santé enfant |

---

## 3. DB Schema

```sql
CREATE TABLE health_ai_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  model_name VARCHAR(100) NOT NULL,
  model_type VARCHAR(50) NOT NULL,
  provider VARCHAR(50) CHECK (provider IN ('deepseek', 'gemini')),
  version VARCHAR(20),
  config JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  last_trained_at TIMESTAMPTZ,
  performance_metrics JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE health_ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  model_id UUID NOT NULL REFERENCES health_ai_models(id),
  student_id UUID REFERENCES students(id),
  prediction_type VARCHAR(100) NOT NULL,
  confidence_score DECIMAL(5,4),
  input_features JSONB NOT NULL,
  prediction_result JSONB NOT NULL,
  recommendation TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  review_status VARCHAR(20) CHECK (review_status IN ('pending', 'reviewed', 'accepted', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_health_ai_predictions_school ON health_ai_predictions(school_id);
CREATE INDEX idx_health_ai_predictions_student ON health_ai_predictions(student_id);
```

```sql
CREATE TABLE health_ai_screenings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  student_id UUID NOT NULL REFERENCES students(id),
  screening_type VARCHAR(50) NOT NULL,
  model_id UUID NOT NULL REFERENCES health_ai_models(id),
  answers JSONB NOT NULL,
  risk_score DECIMAL(5,4),
  risk_level VARCHAR(20),
  recommendations JSONB DEFAULT '[]'::jsonb,
  requires_human_review BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health/ai/models` | Modèles actifs |
| POST | `/api/health/ai/predict` | Lancer prédiction |
| GET | `/api/health/ai/predictions` | Historique prédictions |
| PUT | `/api/health/ai/predictions/:id/review` | Revoir prédiction |
| POST | `/api/health/ai/screen` | Dépistage automatique |
| GET | `/api/health/ai/screenings` | Résultats dépistages |
| GET | `/api/health/ai/analytics` | Métriques modèles |

---

## 5. API Example — Prédiction

```json
POST /api/health/ai/predict
{
  "student_id": "uuid-student",
  "prediction_type": "health_risk_assessment",
  "input_features": {
    "attendance_rate": 0.85,
    "grades_trend": "declining",
    "visit_count": 5,
    "absences": 8,
    "wellbeing_scores": { "mood": 2, "stress": 4, "sleep": 2 }
  }
}
```

---

## 6. Edge Function — Prédiction

```typescript
// supabase/functions/health-ai-predict/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEEPSEEK_API = Deno.env.get("DEEPSEEK_API_KEY");

serve(async (req) => {
  const { student_id, prediction_type, input_features } = await req.json();

  const response = await fetch("https://api.deepseek.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DEEPSEEK_API}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "health-risk-v1",
      features: input_features,
      type: prediction_type
    })
  });

  const result = await response.json();

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" }
  });
});
```

---

## 7. RLS Policies

```sql
ALTER TABLE health_ai_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY health_ai_school_isolation ON health_ai_predictions
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE POLICY health_ai_infirmerie_access ON health_ai_predictions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('INFIRMIER', 'ADMIN', 'DIRECTEUR')
    )
  );
```

---

## 8. Types de Prédiction

| Type | Modèle | Description |
|------|--------|-------------|
| health_risk | DeepSeek | Risque santé global |
| absence_pattern | Gemini | Prédiction absentéisme |
| wellbeing_decline | DeepSeek | Déclin bien-être |
| epidemic_risk | Gemini | Risque épidémie |
| nutrition_alert | DeepSeek | Alerte nutritionnelle |

---

## 9. Sécurité IA

- Jamais de données personnelles dans prompts
- Anonymisation avant envoi
- Pas de stockage prompts côté DeepSeek
- Logs de toutes les requêtes IA
- Validation humaine obligatoire pour décisions

---

## 10. Notifications

- Prédiction risque élevé → Push infirmerie
- Score confiance < 0.7 → Flag review humaine
- Modèle dégradé → Alerte admin
- Dépistage terminé → Notification infirmerie

---

*Phase 4.6 — EduCI Documentation*
