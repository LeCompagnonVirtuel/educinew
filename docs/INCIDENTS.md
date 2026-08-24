# INCIDENTS MODULE

Phase 4.6 — Gestion des Incidents

---

## 1. Vision

Système centralisé de gestion des incidents scolaires: signalement, investigation, résolution et reporting.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Toutes les écoles |
| ADMIN | Incidents école |
| DIRECTEUR | Tous incidents école |
| SURVEILLANT | Signaler + gérer |
| ENSEIGNANT | Signaler + consulter |
| PARENT | Incidents de ses enfants |
| ELEVE | Incidents le concernant |

---

## 3. DB Schema

```sql
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  incident_reference VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(100),
  severity VARCHAR(20) CHECK (severity IN ('minor', 'moderate', 'serious', 'critical')),
  status VARCHAR(30) CHECK (status IN ('reported', 'acknowledged', 'investigating', 'resolved', 'escalated', 'closed')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  incident_date TIMESTAMPTZ NOT NULL,
  reported_by UUID NOT NULL REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  students_involved UUID[],
  injuries_sustained BOOLEAN DEFAULT false,
  injury_details TEXT,
  parents_notified BOOLEAN DEFAULT false,
  authorities_notified BOOLEAN DEFAULT false,
  resolution TEXT,
  resolution_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_incidents_school ON incidents(school_id);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_date ON incidents(incident_date);
```

```sql
CREATE TABLE incident_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  incident_id UUID NOT NULL REFERENCES incidents(id),
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  description VARCHAR(255),
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE incident_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  incident_id UUID NOT NULL REFERENCES incidents(id),
  action_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  assigned_to UUID REFERENCES auth.users(id),
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/incidents` | Liste incidents |
| POST | `/api/incidents` | Signaler incident |
| GET | `/api/incidents/:id` | Détail incident |
| PUT | `/api/incidents/:id` | Mettre à jour |
| POST | `/api/incidents/:id/actions` | Ajouter action |
| POST | `/api/incidents/:id/attachments` | Ajouter pièce |
| PUT | `/api/incidents/:id/assign` | Assigner |
| PUT | `/api/incidents/:id/escalate` | Escalader |
| GET | `/api/incidents/stats` | Statistiques |

---

## 5. API Example — Signalement

```json
POST /api/incidents
{
  "category": "behavioral",
  "subcategory": "fight",
  "severity": "serious",
  "title": "Bagarre entre élèves",
  "description": "Deux élèves de 5ème se sont battus en cours de sport",
  "location": "Gymnase",
  "incident_date": "2026-08-08T10:30:00Z",
  "students_involved": ["uuid-student1", "uuid-student2"],
  "injuries_sustained": true,
  "injury_details": "Élément 1: ecchymose au bras gauche"
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY incidents_school_isolation ON incidents
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE POLICY incidents_student_view ON incidents
  FOR SELECT USING (
    students_involved @> ARRAY[auth.uid()]::uuid[]
  );
```

---

## 7. Catégories d'Incidents

| Catégorie | Sous-catégories |
|-----------|-----------------|
| behavioral | fight, disruption, defiance, truancy |
| safety | injury, fire, chemical, equipment |
| health | medical_emergency, illness, allergy |
| property | vandalism, theft, damage |
| bullying | verbal, physical, cyber |
| academic | cheating, plagiarism |
| other | miscellaneous |

---

## 8. Workflow

```
Report → Acknowledge (24h) → Assign → Investigate (72h)
                                          ↓
                              Action Plan → Implement → Resolve
                                          ↓ (si critique)
                                    Escalate → Admin/Director
```

---

## 9. Notifications

- Incident critique → Push admin + directeur
- Action en retard → Rappel assigné
- Incident escaladé → Notification supérieure
- Résolution → Notification reporter + parents

---

*Phase 4.6 — EduCI Documentation*
