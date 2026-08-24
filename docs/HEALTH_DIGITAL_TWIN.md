# HEALTH DIGITAL TWIN MODULE

Phase 4.6 — Jumeau Numérique Santé Scolaire

---

## 1. Vision

Modèle numérique virtuel de la santé de l'école: simulation, prédiction et optimisation des ressources santé.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Twins globaux |
| ADMIN | Twin école |
| DIRECTEUR | Simulations + recommandations |
| INFIRMIER | Données + simulations |
| COMPTABLE | Coûts simulés |
| ENSEIGNANT | Visualisations classes |

---

## 3. DB Schema

```sql
CREATE TABLE digital_twins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  twin_name VARCHAR(255) NOT NULL,
  twin_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('initializing', 'active', 'paused', 'archived')),
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_sync_at TIMESTAMPTZ,
  sync_frequency VARCHAR(30),
  data_sources JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_digital_twins_school ON digital_twins(school_id);
```

```sql
CREATE TABLE twin_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  twin_id UUID NOT NULL REFERENCES digital_twins(id),
  snapshot_date TIMESTAMPTZ DEFAULT now(),
  state_data JSONB NOT NULL,
  health_metrics JSONB NOT NULL,
  wellbeing_metrics JSONB,
  resource_utilization JSONB,
  anomalies_detected JSONB DEFAULT '[]'::jsonb,
  predictions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_twin_snapshots_twin ON twin_snapshots(twin_id);
CREATE INDEX idx_twin_snapshots_date ON twin_snapshots(snapshot_date);
```

```sql
CREATE TABLE twin_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  twin_id UUID NOT NULL REFERENCES digital_twins(id),
  simulation_name VARCHAR(255) NOT NULL,
  scenario JSONB NOT NULL,
  parameters JSONB NOT NULL,
  results JSONB,
  status VARCHAR(20) CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  run_by UUID NOT NULL REFERENCES auth.users(id),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE twin_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  twin_id UUID NOT NULL REFERENCES digital_twins(id),
  simulation_id UUID REFERENCES twin_simulations(id),
  recommendation_type VARCHAR(50) NOT NULL,
  priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  expected_impact JSONB,
  implementation_cost DECIMAL(12,2),
  status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'implemented', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health/twins` | Liste twins |
| POST | `/api/health/twins` | Créer twin |
| GET | `/api/health/twins/:id` | Détail twin |
| PUT | `/api/health/twins/:id` | Config twin |
| POST | `/api/health/twins/:id/sync` | Synchroniser |
| GET | `/api/health/twins/:id/snapshots` | Historique |
| POST | `/api/health/twins/:id/simulate` | Lancer simulation |
| GET | `/api/health/twins/:id/simulations` | Liste simulations |
| GET | `/api/health/twins/:id/recommendations` | Recommandations |
| PUT | `/api/health/twins/:id/recommendations/:rid` | Traiter recommandation |
| GET | `/api/health/twins/:id/health-map` | Carte santé |

---

## 5. API Example — Simulation

```json
POST /api/health/twins/:id/simulate
{
  "simulation_name": "Impact grippe saisonnière",
  "scenario": "epidemic_outbreak",
  "parameters": {
    "disease": "influenza",
    "attack_rate": 0.15,
    "duration_weeks": 4,
    "intervention": "vaccination_campaign",
    "vaccination_coverage": 0.60
  }
}

Response:
{
  "id": "uuid-simulation",
  "status": "completed",
  "results": {
    "projected_cases": 127,
    "absenteeism_impact": 0.12,
    "estimated_cost": 45000,
    "intervention_effectiveness": 0.73,
    "recommendation": "Campagne de vaccination recommandée"
  }
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE digital_twins ENABLE ROW LEVEL SECURITY;

CREATE POLICY twin_school_isolation ON digital_twins
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE POLICY twin_admin_manage ON digital_twins
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('ADMIN', 'SUPER_ADMIN', 'DIRECTEUR')
    )
  );
```

---

## 7. Types de Twin

| Type | Description | Données |
|------|-------------|---------|
| health_overview | Vue globale santé | Tous modules |
| epidemic_simulation | Simulation épidémie | Visites, absences |
| resource_optimization | Optimisation ressources | Infirmerie, personnel |
| wellbeing_model | Modèle bien-être | Évaluations, alertes |
| cost_projection | Projection coûts | Paiements, consommables |

---

## 8. Scénarios de Simulation

| Scénario | Paramètres | Résultat |
|----------|------------|----------|
| epidemic_outbreak | disease, attack_rate, duration | Cas projetés, coûts |
| resource_shortage | resource_type, deficit_level | Impact, recommandations |
| intervention_test | intervention, coverage, duration | Efficacité, ROI |
| season_trend | season, conditions | Tendances prédites |
| policy_change | policy, scope | Impact projeté |

---

## 9. Synchronisation

```
Health Profiles → Sync (hebdo) → Twin State
Health Visits → Sync (temps réel) → Twin Metrics
Wellbeing → Sync (hebdo) → Twin Wellbeing
Alerts → Sync (temps réel) → Twin Anomalies
```

---

## 10. Notifications

- Twin synchronisé → Log système
- Anomalie détectée → Push infirmerie
- Simulation terminée → Notification demandeur
- Recommandation critique → Push admin + directeur
- Twin inactive 30j → Rappel admin

---

*Phase 4.6 — EduCI Documentation*
