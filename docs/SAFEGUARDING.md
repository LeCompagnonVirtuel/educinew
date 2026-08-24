# SAFEGUARDING MODULE

Phase 4.6 — Protection des Mineurs

---

## 1. Vision

Système de safeguarding pour protéger les élèves contre les maltraitances, négligences et abus. Conformité légale et procédures obligatoires.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Toutes les données |
| ADMIN | Données école + signalements |
| DIRECTEUR | Signalements + cas assignés |
| DESIGNATED_SAFEGUARDING_LEAD | Accès complet safeguarding |
| INFIRMIER | Indicateurs physiques |
| ENSEIGNANT | Signaler + cas assignés |
| PARENT | Notifications cas de ses enfants |

---

## 3. DB Schema

```sql
CREATE TABLE safeguarding_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  case_reference VARCHAR(50) UNIQUE NOT NULL,
  student_id UUID NOT NULL REFERENCES students(id),
  category VARCHAR(100) NOT NULL,
  risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(30) CHECK (status IN ('reported', 'investigating', 'escalated', 'resolved', 'closed')),
  description TEXT NOT NULL,
  reporter_id UUID NOT NULL REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  external_agency_notified BOOLEAN DEFAULT false,
  agency_name VARCHAR(255),
  agency_reference VARCHAR(100),
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_safeguarding_school ON safeguarding_cases(school_id);
CREATE INDEX idx_safeguarding_student ON safeguarding_cases(student_id);
CREATE INDEX idx_safeguarding_status ON safeguarding_cases(status);
```

```sql
CREATE TABLE safeguarding_observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  case_id UUID NOT NULL REFERENCES safeguarding_cases(id),
  observation TEXT NOT NULL,
  observed_by UUID NOT NULL REFERENCES auth.users(id),
  observation_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE safeguarding_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  student_id UUID NOT NULL,
  checklist_type VARCHAR(50) NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  completed_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/safeguarding/cases` | Liste cas |
| POST | `/api/safeguarding/cases` | Signaler cas |
| GET | `/api/safeguarding/cases/:id` | Détail cas |
| PUT | `/api/safeguarding/cases/:id` | Mettre à jour cas |
| POST | `/api/safeguarding/cases/:id/observations` | Ajouter observation |
| GET | `/api/safeguarding/cases/:id/observations` | Liste observations |
| PUT | `/api/safeguarding/cases/:id/assign` | Assigner cas |
| POST | `/api/safeguarding/cases/:id/escalate` | Escalader cas |
| GET | `/api/safeguarding/dashboard` | Indicateurs |

---

## 5. API Example — Signalement

```json
POST /api/safeguarding/cases
{
  "student_id": "uuid-student",
  "category": "neglect",
  "risk_level": "high",
  "description": "Élève présente des signes de négligence: vêtements sales, pas de déjeuner, fatigue chronique",
  "observation_initiale": "Marques suspectes sur les bras, hygiène négligée"
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE safeguarding_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY safeguarding_admin_access ON safeguarding_cases
  FOR ALL USING (
    school_id = current_setting('app.current_school_id')::uuid
    AND EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('ADMIN', 'DIRECTEUR', 'DESIGNATED_SAFEGUARDING_LEAD')
    )
  );
```

---

## 7. Catégories de Signalement

| Catégorie | Description |
|-----------|-------------|
| physical_abuse | Maltraitance physique |
| emotional_abuse | Maltraitance émotionnelle |
| sexual_abuse | Abus sexuel |
| neglect | Négligence |
| bullying | Harcèlement |
| self_harm | Auto-mutilation |
| domestic_violence | Violence domestique |
| exploitation | Exploitation |

---

## 8. Procédure d'Escalade

```
Signalement → DSL Review (24h) → Risk Assessment → Action Plan
                                    ↓ (si critique)
                              External Agency (48h max)
                                    ↓
                              Follow-up Reviews (weekly)
                                    ↓
                              Resolution → Close Case
```

---

## 9. Notifications

- Nouveau cas critique → Push notification DSL + Admin
- Cas non traité 24h → Escalade automatique
- Mise à jour cas → Notification assigné
- Résolution → Notification reporter

---

*Phase 4.6 — EduCI Documentation*
