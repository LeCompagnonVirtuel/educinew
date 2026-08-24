# EMPLOYMENT - Offres et Candidatures

Phase 4.4 - Module Employment

---

## 1. Objectif

Gestion des offres d'emploi, candidatures et processus de recrutement pour les partenaires entreprises.

## 2. Modèle de Données

```sql
CREATE TABLE workforce_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  company_id UUID REFERENCES workforce_companies(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  job_type TEXT CHECK (job_type IN ('FULL_TIME','PART_TIME','INTERNSHIP','CONTRACT','FREELANCE')),
  salary_min DECIMAL(12,2),
  salary_max DECIMAL(12,2),
  required_skills JSONB DEFAULT '[]',
  education_level TEXT,
  experience_years INT DEFAULT 0,
  application_deadline DATE,
  is_active BOOLEAN DEFAULT true,
  applications_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE workforce_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  job_id UUID REFERENCES workforce_jobs(id),
  student_id UUID REFERENCES students(id),
  status TEXT CHECK (status IN ('PENDING','REVIEWED','INTERVIEW','ACCEPTED','REJECTED','WITHDRAWN')),
  cover_letter TEXT,
  resume_url TEXT,
  match_score DECIMAL(5,2),
  feedback TEXT,
  applied_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE workforce_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT CHECK (size IN ('STARTUP','SMALL','MEDIUM','LARGE','ENTERPRISE')),
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  is_verified BOOLEAN DEFAULT false,
  partnership_level TEXT DEFAULT 'BASIC',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/workforce/jobs
```json
{
  "jobs": [
    {
      "id": "uuid",
      "title": "Développeur React",
      "company": "TechAfrica",
      "location": "Dakar",
      "job_type": "FULL_TIME",
      "salary_range": "500000-800000",
      "required_skills": ["React", "TypeScript", "Node.js"],
      "application_deadline": "2024-12-31"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 150 }
}
```

### POST /api/workforce/jobs
```json
{
  "company_id": "uuid",
  "title": "Analyste Marketing Digital",
  "description": "Gestion des campagnes digitales",
  "location": "Abidjan",
  "job_type": "FULL_TIME",
  "salary_min": 400000,
  "salary_max": 600000,
  "required_skills": ["SEO", "Google Ads", "Analytics"],
  "application_deadline": "2024-11-30"
}
```

### POST /api/workforce/applications
```json
{
  "job_id": "uuid",
  "cover_letter": "Je suis très intéressé par ce poste...",
  "resume_url": "https://storage.example.com/resumes/uuid.pdf"
}
```

### PATCH /api/workforce/applications/:id
```json
{
  "status": "INTERVIEW",
  "feedback": "Profil intéressant, entretien planifié"
}
```

## 4. RBAC

| Rôle | Jobs | Candidatures | Companies |
|------|------|--------------|-----------|
| SUPER_ADMIN | CRUD | CRUD | CRUD |
| ADMIN | CRUD | RU | CRUD |
| ENSEIGNANT | R | R (class) | R |
| ELEVE | R | CRUD (own) | R |
| COMPANY | CRUD (own) | RU (own) | RU (own) |

## 5. Matching Algorithm

```typescript
function calculateMatchScore(job, student): number {
  const skillMatch = calculateSkillOverlap(job.required_skills, student.skills);
  const educationMatch = job.education_level === student.level ? 1 : 0.5;
  const experienceMatch = Math.min(student.experience / job.experience_years, 1);
  
  return (skillMatch * 0.5 + educationMatch * 0.3 + experienceMatch * 0.2) * 100;
}
```

## 6. Notifications

- Nouvelle offre correspondant aux compétences → Email + Push
- Statut candidature modifié → Email
- Deadline approche → Rappel
- Entretien planifié → Calendar invite

## 7. Index

```sql
CREATE INDEX idx_jobs_school ON workforce_jobs(school_id);
CREATE INDEX idx_jobs_company ON workforce_jobs(company_id);
CREATE INDEX idx_jobs_active ON workforce_jobs(is_active);
CREATE INDEX idx_jobs_type ON workforce_jobs(job_type);
CREATE INDEX idx_applications_job ON workforce_applications(job_id);
CREATE INDEX idx_applications_student ON workforce_applications(student_id);
CREATE INDEX idx_applications_status ON workforce_applications(status);
CREATE INDEX idx_companies_school ON workforce_companies(school_id);
```
