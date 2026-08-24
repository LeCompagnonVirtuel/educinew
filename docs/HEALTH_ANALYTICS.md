# HEALTH ANALYTICS MODULE

Phase 4.6 — Analyses et Statistiques Santé

---

## 1. Vision

Tableaux de bord et analyses avancées pour le suivi de la santé scolaire. KPIs, tendances et rapports.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Analytics globales |
| ADMIN | Analytics école |
| DIRECTEUR | Rapports école |
| INFIRMIER | Analyses détaillées |
| COMPTABLE | Coûts santé |
| ENSEIGNANT | Tendance élèves |

---

## 3. DB Schema

```sql
CREATE TABLE health_analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  snapshot_date DATE NOT NULL,
  total_students INTEGER NOT NULL,
  students_with_profiles INTEGER,
  total_visits INTEGER,
  visits_this_month INTEGER,
  common_conditions JSONB DEFAULT '[]'::jsonb,
  medication_usage JSONB DEFAULT '[]'::jsonb,
  alert_counts JSONB DEFAULT '{}'::jsonb,
  wellbeing_averages JSONB DEFAULT '{}'::jsonb,
  attendance_health_correlation DECIMAL(5,4),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, snapshot_date)
);

CREATE INDEX idx_health_analytics_date ON health_analytics_snapshots(school_id, snapshot_date);
```

```sql
CREATE TABLE health_analytics_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  metric_name VARCHAR(100) NOT NULL,
  period_type VARCHAR(20) CHECK (period_type IN ('daily', 'weekly', 'monthly', 'quarterly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  metric_value DECIMAL(12,4),
  previous_period_value DECIMAL(12,4),
  change_percentage DECIMAL(7,4),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE health_analytics_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  report_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  data JSONB NOT NULL,
  generated_by UUID NOT NULL REFERENCES auth.users(id),
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health/analytics/dashboard` | Dashboard KPIs |
| GET | `/api/health/analytics/trends` | Tendances |
| GET | `/api/health/analytics/conditions` | Pathologies fréquentes |
| GET | `/api/health/analytics/medications` | Usage médicaments |
| GET | `/api/health/analytics/wellbeing` | Tendances bien-être |
| GET | `/api/health/analytics/attendance` | Corrélation santé-assiduité |
| POST | `/api/health/analytics/reports` | Générer rapport |
| GET | `/api/health/analytics/reports` | Liste rapports |
| GET | `/api/health/analytics/export` | Export CSV/Excel |

---

## 5. API Example — Dashboard

```json
GET /api/health/analytics/dashboard?period=monthly

Response:
{
  "period": "2026-07",
  "total_students": 850,
  "students_with_profiles": 812,
  "profile_completion_rate": 0.955,
  "total_visits": 156,
  "visits_trend": +12.5,
  "top_conditions": [
    { "condition": "Gastro-entérite", "count": 23 },
    { "condition": "Maux de tête", "count": 18 },
    { "condition": "Rhume", "count": 15 }
  ],
  "medication_usage": [
    { "medication": "Paracétamol", "prescriptions": 34 },
    { "medication": "Ibuprofène", "prescriptions": 12 }
  ],
  "wellbeing_averages": {
    "mood": 3.8,
    "stress": 2.4,
    "sleep": 3.5
  },
  "active_alerts": 3,
  "critical_alerts": 0
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE health_analytics_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY health_analytics_school_isolation ON health_analytics_snapshots
  USING (school_id = current_setting('app.current_school_id')::uuid);
```

---

## 7. KPIs Standards

| KPI | Formule | Cible |
|-----|---------|-------|
| Taux couverture santé | Profiles / Total élèves | > 95% |
| Visites/mois | Total visites / mois | < 15% élèves |
| Alerte résolue 24h | Résolu < 24h / Total | > 80% |
| Score bien-être moyen | Moyenne scores | > 3.5/5 |
| Taux assiduité santé | Présence élèves sains | > 95% |

---

## 8. Graphiques Disponibles

| Graphique | Type | Données |
|-----------|------|---------|
| Visites par mois | Ligne | 12 mois |
| Top pathologies | Barres | Top 10 |
| Usage médicaments | Camembert | Top médicaments |
| Score bien-être | Radar | 5 dimensions |
| Corrélation santé-scolarité | Scatter | Notes vs absences |

---

## 9. Notifications

- Rapport prêt → Email admin
- Alerte tendance négative → Push infirmerie
- Snapshot généré → Log système
- Export disponible → Notification demandeur

---

*Phase 4.6 — EduCI Documentation*
