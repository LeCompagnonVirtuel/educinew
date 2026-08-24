# BULLYING MODULE

Phase 4.6 — Prévention et Gestion du Harcèlement

---

## 1. Vision

Système de prévention, signalement et gestion du harcèlement scolaire. Détection précoce, intervention et suivi.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Données globales |
| ADMIN | Cas école |
| DIRECTEUR | Tous cas |
| SURVEILLANT | Signaler + cas assignés |
| ENSEIGNANT | Signaler + cas classes |
| PARENT | Notifications enfants |
| ELEVE | Signaler + ses cas |

---

## 3. DB Schema

```sql
CREATE TABLE bullying_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  report_reference VARCHAR(50) UNIQUE NOT NULL,
  reporter_type VARCHAR(20) CHECK (reporter_type IN ('student', 'parent', 'teacher', 'staff')),
  reporter_id UUID NOT NULL REFERENCES auth.users(id),
  victim_id UUID NOT NULL REFERENCES students(id),
  incident_type VARCHAR(50) NOT NULL,
  frequency VARCHAR(30) CHECK (frequency IN ('once', 'occasional', 'frequent', 'daily')),
  location VARCHAR(100),
  description TEXT NOT NULL,
  witnesses TEXT,
  evidence_urls TEXT[],
  risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(30) CHECK (status IN ('reported', 'under_review', 'investigating', 'intervening', 'resolved', 'escalated')),
  assigned_to UUID REFERENCES auth.users(id),
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_bullying_school ON bullying_reports(school_id);
CREATE INDEX idx_bullying_victim ON bullying_reports(victim_id);
CREATE INDEX idx_bullying_status ON bullying_reports(status);
```

```sql
CREATE TABLE bullying_interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  report_id UUID NOT NULL REFERENCES bullying_reports(id),
  intervention_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  participants UUID[],
  outcome TEXT,
  conducted_by UUID NOT NULL REFERENCES auth.users(id),
  intervention_date TIMESTAMPTZ DEFAULT now(),
  follow_up_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE bullying_anonymous_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  tip_content TEXT NOT NULL,
  incident_date DATE,
  location VARCHAR(100),
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed BOOLEAN DEFAULT false,
  reviewed_by UUID REFERENCES auth.users(id),
  linked_report_id UUID REFERENCES bullying_reports(id)
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/bullying/reports` | Liste signalements |
| POST | `/api/bullying/reports` | Signaler harcèlement |
| GET | `/api/bullying/reports/:id` | Détail signalement |
| PUT | `/api/bullying/reports/:id` | Mettre à jour |
| POST | `/api/bullying/reports/:id/interventions` | Ajouter intervention |
| POST | `/api/bullying/anonymous` | Signalement anonyme |
| GET | `/api/bullying/anonymous/pending` | Tips en attente |
| GET | `/api/bullying/dashboard` | Statistiques |

---

## 5. API Example — Signalement

```json
POST /api/bullying/reports
{
  "victim_id": "uuid-victim",
  "incident_type": "verbal",
  "frequency": "frequent",
  "location": "Cour de récréation",
  "description": "Un groupe d'élèves insulte régulièrement la victime pendant la récréation",
  "witnesses": "3-4 élèves de la classe de 6ème A",
  "risk_level": "high"
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE bullying_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY bullying_school_isolation ON bullying_reports
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE POLICY bullying_student_view_own ON bullying_reports
  FOR SELECT USING (
    victim_id = auth.uid()
    OR reporter_id = auth.uid()
  );
```

---

## 7. Types de Harcèlement

| Type | Description |
|------|-------------|
| verbal | Insultes, moqueries, menaces |
| physical | Coups, bousculades, vandalisme |
| social | Exclusion, rumeurs, isolement |
| cyber | Harcèlement en ligne, réseaux |
| sexual | Commentaires inappropriés |
| discriminatory | Harcèlement basé sur l'identité |

---

## 8. Architecture

```
Page Reports → useBullyingReports() → BullyingService → BullyingRepository
Page Anonymous → useAnonymousTips() → BullyingService → BullyingRepository
Dashboard → useBullyingDashboard() → BullyingService → BullyingRepository
```

---

## 9. Notifications

- Nouveau signalement critic → Push DSL + Admin
- Signalement anonyme → Email surveillant
- Intervention planifiée → Rappel intervenant
- Cas non résolu 7j → Escalade direction

---

*Phase 4.6 — EduCI Documentation*
