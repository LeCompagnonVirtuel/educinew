# HEALTH MODULE

Phase 4.6 — Module Santé Scolaire

---

## 1. Vision

Module central de gestion de la santé des élèves, infirmerie, suivis médicaux et alertes sanitaires.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Toutes les données, toutes les écoles |
| ADMIN | Données de son école |
| INFIRMIER | Accès complet santé |
| ENSEIGNANT | Lecture élèves de ses classes |
| PARENT | Santé de ses enfants |
| ELEVE | Son dossier uniquement |

---

## 3. DB Schema

```sql
CREATE TABLE health_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  blood_type VARCHAR(5),
  allergies TEXT[],
  chronic_conditions TEXT[],
  medications JSONB DEFAULT '[]'::jsonb,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(50),
  doctor_name VARCHAR(255),
  doctor_phone VARCHAR(50),
  insurance_number VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_school FOREIGN KEY (school_id) REFERENCES schools(id)
);

CREATE INDEX idx_health_profiles_school ON health_profiles(school_id);
CREATE INDEX idx_health_profiles_student ON health_profiles(student_id);
```

```sql
CREATE TABLE health_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  student_id UUID NOT NULL,
  visit_date TIMESTAMPTZ DEFAULT now(),
  reason TEXT NOT NULL,
  symptoms TEXT,
  diagnosis TEXT,
  treatment TEXT,
  medication_prescribed JSONB DEFAULT '[]'::jsonb,
  follow_up_date DATE,
  recorded_by UUID NOT NULL REFERENCES auth.users(id),
  severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

```sql
CREATE TABLE health_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  alert_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  target_roles TEXT[] DEFAULT ARRAY['ADMIN', 'INFIRMIER'],
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health/profiles/:studentId` | Profil santé |
| POST | `/api/health/profiles` | Créer profil |
| PUT | `/api/health/profiles/:id` | Modifier profil |
| GET | `/api/health/visits` | Liste consultations |
| POST | `/api/health/visits` | Enregistrer visite |
| GET | `/api/health/alerts` | Alertes actives |
| POST | `/api/health/alerts` | Créer alerte |
| PUT | `/api/health/alerts/:id/resolve` | Résoudre alerte |

---

## 5. API Example — Créer visite

```json
POST /api/health/visits
{
  "student_id": "uuid-student",
  "reason": "Maux de tête",
  "symptoms": "Douleur frontale, fièvre 38.2°C",
  "diagnosis": "Céphalée avec fièvre",
  "treatment": "Paracétamol 500mg",
  "medication_prescribed": [
    { "name": "Paracétamol", "dosage": "500mg", "frequency": "3x/jour", "duration": "5 jours" }
  ],
  "severity": "medium"
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE health_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY health_profiles_school_isolation ON health_profiles
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE POLICY health_profiles_parent_access ON health_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM parent_student_relations
      WHERE parent_id = auth.uid()
      AND student_id = health_profiles.student_id
    )
  );
```

---

## 7. Architecture

```
Page Health → useHealthProfile() → HealthService → HealthRepository → Supabase
Page Visits → useHealthVisits() → HealthService → HealthRepository → Supabase
Page Alerts → useHealthAlerts() → HealthService → HealthRepository → Supabase
```

---

## 8. Notifications

- Alerte fièvre > 38.5°C → Notification parent + infirmerie
- Allergie détectée → Alerte rouge infirmerie
- Médicament administré → Log audit
- Consultation urgente → Push notification admin

---

*Phase 4.6 — EduCI Documentation*
