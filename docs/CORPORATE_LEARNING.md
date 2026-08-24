# CORPORATE_LEARNING - Apprentissage Entreprise

Phase 4.4 - Module Corporate Learning

---

## 1. Objectif

Solutions de formation pour entreprises partenaires : formation sur mesure, suivi des compétences employés, conformité réglementaire.

## 2. Modèle de Données

```sql
CREATE TABLE corporate_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  company_id UUID REFERENCES workforce_companies(id),
  title TEXT NOT NULL,
  description TEXT,
  program_type TEXT CHECK (program_type IN ('ONBOARDING','UPSKILLING','COMPLIANCE','LEADERSHIP','TECHNICAL')),
  target_audience TEXT,
  duration_weeks INT,
  delivery_method TEXT CHECK (delivery_method IN ('REMOTE','ON_SITE','HYBRID')),
  max_participants INT,
  price_per_participant DECIMAL(10,2),
  start_date DATE,
  end_date DATE,
  status TEXT CHECK (status IN ('DRAFT','ACTIVE','COMPLETED','CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE corporate_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES corporate_programs(id),
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  employee_email TEXT,
  department TEXT,
  position TEXT,
  status TEXT CHECK (status IN ('NAMED','ENROLLED','IN_PROGRESS','COMPLETED','DROPPED')),
  progress INT DEFAULT 0,
  assessment_score DECIMAL(5,2),
  enrolled_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE corporate_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES corporate_programs(id),
  title TEXT NOT NULL,
  assessment_type TEXT CHECK (assessment_type IN ('QUIZ','PROJECT','PRESENTATION','EXAM')),
  max_score INT DEFAULT 100,
  weight DECIMAL(3,2) DEFAULT 1.0,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/corporate/programs
```json
{
  "programs": [
    {
      "id": "uuid",
      "title": "Formation Cybersécurité",
      "company": "BankTech SARL",
      "program_type": "COMPLIANCE",
      "participants": 30,
      "progress_avg": 65,
      "status": "ACTIVE"
    }
  ]
}
```

### POST /api/corporate/programs
```json
{
  "company_id": "uuid",
  "title": "Leadership Management",
  "program_type": "LEADERSHIP",
  "target_audience": "Managers et chefs de projet",
  "duration_weeks": 8,
  "delivery_method": "HYBRID",
  "max_participants": 20,
  "price_per_participant": 250000,
  "start_date": "2024-11-15"
}
```

### POST /api/corporate/programs/:id/enroll
```json
{
  "participants": [
    {
      "employee_id": "EMP001",
      "employee_name": "Jean Dupont",
      "employee_email": "j.dupont@banktech.com",
      "department": "IT",
      "position": "Développeur Senior"
    }
  ]
}
```

### GET /api/corporate/programs/:id/report
```json
{
  "program_id": "uuid",
  "title": "Formation Cybersécurité",
  "overall_progress": 72,
  "completion_rate": 85,
  "avg_assessment_score": 78.5,
  "participant_details": [
    {
      "employee_name": "Jean Dupont",
      "progress": 100,
      "status": "COMPLETED",
      "final_score": 92
    }
  ]
}
```

## 4. RBAC

| Rôle | Programs | Participants | Reports |
|------|----------|--------------|---------|
| SUPER_ADMIN | CRUD | CRUD | ✅ |
| ADMIN | CRUD | CRUD | ✅ |
| COMPANY | R (own) | RU (own) | R (own) |
| ENSEIGNANT | R (assigned) | R (assigned) | R (assigned) |

## 5. Reporting Enterprise

- Tableau de bord temps réel
- Export CSV/PDF personnalisé
- Rapport conformité réglementaire
- ROI formation calculé
- Comparaison avant/après formation

## 6. Intégrations

```typescript
const CorporateIntegrations = {
  LMS: ['Moodle', 'Canvas', 'Blackboard'],
  HR_SYSTEMS: ['SAP', 'Oracle HCM', 'BambooHR'],
  CALENDAR: ['Google Calendar', 'Outlook'],
  VIDEO: ['Zoom', 'Teams', 'Google Meet']
};
```

## 7. Facturation

```typescript
const BillingModel = {
  calculateInvoice: (program, participants) => {
    return {
      base: program.price_per_participant * participants.length,
      discount: participants.length >= 20 ? 0.15 : 0,
      tax: 0.18,
      total: calculateTotal(...)
    };
  }
};
```

## 8. Index

```sql
CREATE INDEX idx_corporate_programs_school ON corporate_programs(school_id);
CREATE INDEX idx_corporate_programs_company ON corporate_programs(company_id);
CREATE INDEX idx_corporate_programs_status ON corporate_programs(status);
CREATE INDEX idx_corporate_participants_program ON corporate_participants(program_id);
CREATE INDEX idx_corporate_assessments_program ON corporate_assessments(program_id);
```
