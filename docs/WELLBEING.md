# WELLBEING MODULE

Phase 4.6 — Bien-être des Élèves

---

## 1. Vision

Suivi du bien-être émotionnel, social et psychologique des élèves. Questionnaires, indicateurs et interventions.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Données globales |
| ADMIN | Données école |
| INFIRMIER | Accès complet |
| PSYCHOLOGUE | Accès complet |
| ENSEIGNANT | Élèves de ses classes |
| PARENT | Ses enfants uniquement |
| ELEVE | Ses données uniquement |

---

## 3. DB Schema

```sql
CREATE TABLE wellbeing_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  assessment_type VARCHAR(50) NOT NULL,
  mood_score INTEGER CHECK (mood_score BETWEEN 1 AND 5),
  stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 5),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
  social_connectedness INTEGER CHECK (social_connectedness BETWEEN 1 AND 5),
  academic_satisfaction INTEGER CHECK (academic_satisfaction BETWEEN 1 AND 5),
  notes TEXT,
  assessed_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_wellbeing_student ON wellbeing_assessments(student_id);
CREATE INDEX idx_wellbeing_school ON wellbeing_assessments(school_id);
```

```sql
CREATE TABLE wellbeing_interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  student_id UUID NOT NULL,
  intervention_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  start_date DATE,
  end_date DATE,
  outcome TEXT,
  conducted_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

```sql
CREATE TABLE wellbeing_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  student_id UUID NOT NULL,
  flag_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT,
  is_resolved BOOLEAN DEFAULT false,
  flagged_by UUID NOT NULL REFERENCES auth.users(id),
  resolved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/wellbeing/assessments/:studentId` | Évaluations élève |
| POST | `/api/wellbeing/assessments` | Créer évaluation |
| GET | `/api/wellbeing/flags` | Drapeaux actifs |
| POST | `/api/wellbeing/flags` | Signaler problème |
| PUT | `/api/wellbeing/flags/:id/resolve` | Résoudre drapeau |
| GET | `/api/wellbeing/interventions` | Interventions |
| POST | `/api/wellbeing/interventions` | Créer intervention |
| GET | `/api/wellbeing/dashboard` | Indicateurs globaux |

---

## 5. API Example — Évaluation

```json
POST /api/wellbeing/assessments
{
  "student_id": "uuid-student",
  "assessment_type": "weekly_check",
  "mood_score": 3,
  "stress_level": 4,
  "sleep_quality": 2,
  "social_connectedness": 4,
  "academic_satisfaction": 3,
  "notes": "Élève semble fatiguée cette semaine"
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE wellbeing_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY wellbeing_school_isolation ON wellbeing_assessments
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE POLICY wellbeing_student_self ON wellbeing_assessments
  FOR SELECT USING (student_id = auth.uid());
```

---

## 7. Indicateurs Clés

| Indicateur | Seuil Alerte |
|------------|--------------|
| Mood Score | < 2 |
| Stress Level | > 4 |
| Sleep Quality | < 2 |
| Absences consécutives | > 3 |
| Notes en baisse | > 20% |

---

## 8. Architecture

```
Page Dashboard → useWellbeingDashboard() → WellbeingService → WellbeingRepository
Page Élève → useWellbeingAssessments() → WellbeingService → WellbeingRepository
Page Interventions → useWellbeingInterventions() → WellbeingService → WellbeingRepository
```

---

## 9. Notifications

- Score mood < 2 → Alerte psychologue
- Stress > 4 pendant 2 semaines → Intervention obligatoire
- Absences > 3 → Notification parent + direction
- Flag critique → Push notification admin + infirmerie

---

*Phase 4.6 — EduCI Documentation*
