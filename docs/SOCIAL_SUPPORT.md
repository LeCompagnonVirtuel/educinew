# SOCIAL SUPPORT MODULE

Phase 4.6 — Soutien Social des Élèves

---

## 1. Vision

Système de suivi du soutien social: bourses, aide alimentaire, accompagnement familial et besoins socio-économiques.

---

## 2. RBAC

| Rôle | Accès |
|------|-------|
| SUPER_ADMIN | Données globales |
| ADMIN | Aide école |
| DIRECTEUR | Cas sensibles |
| SECRETAIRE | Saisie + consultation |
| ENSEIGNANT | Signaler besoins |
| PARENT | Demande aide |
| ELEVE | Son dossier |

---

## 3. DB Schema

```sql
CREATE TABLE social_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  household_size INTEGER,
  household_income_range VARCHAR(50),
  number_of_guardians INTEGER DEFAULT 1,
  guardian_employment_status VARCHAR(50),
  sibling_count INTEGER DEFAULT 0,
  siblings_in_school INTEGER DEFAULT 0,
  housing_status VARCHAR(50),
  food_insecurity_flag BOOLEAN DEFAULT false,
  clothing_need_flag BOOLEAN DEFAULT false,
  transport_need_flag BOOLEAN DEFAULT false,
  medical_need_flag BOOLEAN DEFAULT false,
  notes TEXT,
  confidentiality_level VARCHAR(20) CHECK (confidentiality_level IN ('standard', 'elevated', 'restricted')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_social_profiles_school ON social_profiles(school_id);
CREATE INDEX idx_social_profiles_student ON social_profiles(student_id);
```

```sql
CREATE TABLE social_aid_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  student_id UUID NOT NULL REFERENCES students(id),
  request_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  urgency VARCHAR(20) CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(30) CHECK (status IN ('submitted', 'reviewing', 'approved', 'denied', 'fulfilled', 'closed')),
  requested_by UUID NOT NULL REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  approved_amount DECIMAL(10,2),
  fulfillment_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE social_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  program_name VARCHAR(255) NOT NULL,
  program_type VARCHAR(50) NOT NULL,
  description TEXT,
  eligibility_criteria JSONB DEFAULT '{}'::jsonb,
  total_budget DECIMAL(12,2),
  remaining_budget DECIMAL(12,2),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE social_program_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES social_programs(id),
  student_id UUID NOT NULL REFERENCES students(id),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) CHECK (status IN ('active', 'completed', 'withdrawn')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/social/profiles/:studentId` | Profil social |
| POST | `/api/social/profiles` | Créer profil |
| PUT | `/api/social/profiles/:id` | Modifier profil |
| GET | `/api/social/requests` | Demandes d'aide |
| POST | `/api/social/requests` | Soumettre demande |
| PUT | `/api/social/requests/:id` | Traiter demande |
| GET | `/api/social/programs` | Programmes |
| POST | `/api/social/programs` | Créer programme |
| POST | `/api/social/programs/:id/enroll` | Inscrire élève |
| GET | `/api/social/dashboard` | Statistiques |

---

## 5. API Example — Demande d'Aide

```json
POST /api/social/requests
{
  "student_id": "uuid-student",
  "request_type": "school_supplies",
  "description": "Famille dans l'incapacité de fournir fournitures scolaires pour l'année",
  "urgency": "medium",
  "requested_items": [
    { "item": "Cahiers", "quantity": 10 },
    { "item": "Stylos", "quantity": 5 },
    { "item": "Cartable", "quantity": 1 }
  ]
}
```

---

## 6. RLS Policies

```sql
ALTER TABLE social_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY social_school_isolation ON social_profiles
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE POLICY social_restricted_access ON social_profiles
  FOR SELECT USING (
    confidentiality_level != 'restricted'
    OR EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('ADMIN', 'DIRECTEUR')
    )
  );
```

---

## 7. Types d'Aide

| Type | Description |
|------|-------------|
| financial | Bourses, frais scolaires |
| school_supplies | Fournitures, uniformes |
| food | Aide alimentaire, cantine |
| transport | Transport scolaire |
| medical | Frais médicaux |
| clothing | Vêtements, chaussures |
| housing | Aide logement |
| counseling | Accompagnement psychologique |

---

## 8. Programmes Standards

| Programme | Type | Budget |
|-----------|------|--------|
| Bourse mérite | financial | Selon fonds |
| Cantine solidaire | food | Mensuel |
| Transport gratuit | transport | Annuel |
| Fournitures | school_supplies | Annuel |
| Vestiaire | clothing | Semester |

---

## 9. Notifications

- Demande urgente → Push admin + directeur
- Demandise approuvée → Notification demandeur
- Budget programme bas → Alerte comptable
- Renouvellement bourse → Rappel parent 30j avant

---

*Phase 4.6 — EduCI Documentation*
