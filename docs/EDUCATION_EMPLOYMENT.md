# EDUCATION_EMPLOYMENT - Pont Éducation-Emploi

Phase 4.4 - Module Education Employment Bridge

---

## 1. Objectif

Mesurer et optimiser la connexion entre formation scolaire et insertion professionnelle : pertinence des programmes, adéquation formation-emploi.

## 2. Modèle de Données

```sql
CREATE TABLE education_employment_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  program_id UUID REFERENCES programs(id),
  industry TEXT NOT NULL,
  job_titles JSONB DEFAULT '[]',
  relevance_score DECIMAL(3,2),
  employment_rate DECIMAL(5,2),
  avg_time_to_employment INT,
  avg_salary DECIMAL(12,2),
  satisfaction_score DECIMAL(3,2),
  last_updated TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE program_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  program_id UUID REFERENCES programs(id),
  graduation_year INT NOT NULL,
  total_graduates INT,
  employed_count INT,
  employed_within_6_months INT,
  employed_within_12_months INT,
  avg_starting_salary DECIMAL(12,2),
  top_employers JSONB DEFAULT '[]',
  industry_distribution JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE curriculum_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  program_id UUID REFERENCES programs(id),
  feedback_type TEXT CHECK (feedback_type IN ('EMPLOYER','GRADUATE','INDUSTRY_EXPERT')),
  feedback_from TEXT NOT NULL,
  skill_gaps JSONB DEFAULT '[]',
  suggestions JSONB DEFAULT '[]',
  rating INT CHECK (rating BETWEEN 1 AND 5),
  submitted_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/education-employment/links
```json
{
  "links": [
    {
      "id": "uuid",
      "program": "Licence Informatique",
      "industry": "Technologie",
      "job_titles": ["Développeur", "Analyste IT", "Chef de projet"],
      "relevance_score": 0.92,
      "employment_rate": 87.5,
      "avg_time_to_employment": 3,
      "avg_salary": 750000,
      "satisfaction_score": 4.5
    }
  ]
}
```

### GET /api/education-employment/outcomes/:programId
```json
{
  "program_id": "uuid",
  "program_name": "Licence Informatique",
  "outcomes_by_year": [
    {
      "graduation_year": 2024,
      "total_graduates": 120,
      "employed_count": 105,
      "employed_within_6_months": 80,
      "employed_within_12_months": 100,
      "avg_starting_salary": 650000,
      "top_employers": ["TechCorp", "BankTech", "StartupTech"],
      "industry_distribution": {
        "Technologie": 65,
        "Finance": 15,
        "Consulting": 10,
        "Autre": 10
      }
    }
  ]
}
```

### POST /api/education-employment/feedback
```json
{
  "program_id": "uuid",
  "feedback_type": "EMPLOYER",
  "feedback_from": "TechCorp HR",
  "skill_gaps": [
    "Tests unitaires",
    "CI/CD",
    "Cloud computing"
  ],
  "suggestions": [
    "Ajouter module DevOps",
    "Renforcer pratique Agile",
    "Intégrer projets réels"
  ],
  "rating": 4
}
```

### GET /api/education-employment/gap-analysis/:programId
```json
{
  "program_id": "uuid",
  "program_name": "Licence Informatique",
  "gap_analysis": {
    "skills_provided": [
      { "skill": "Programmation", "level": "ADVANCED" },
      { "skill": "Bases de données", "level": "INTERMEDIATE" }
    ],
    "skills_demanded": [
      { "skill": "Programmation", "level": "ADVANCED" },
      { "skill": "DevOps", "level": "INTERMEDIATE" },
      { "skill": "Cloud", "level": "BEGINNER" }
    ],
    "gaps_identified": [
      { "skill": "DevOps", "gap": "MEDIUM", "priority": "HIGH" },
      { "skill": "Cloud", "gap": "LARGE", "priority": "MEDIUM" }
    ],
    "recommendations": [
      "Ajouter module DevOps en 3ème année",
      "Partenariat avec cloud provider",
      "Projets avec CI/CD"
    ]
  }
}
```

## 4. RBAC

| Rôle | Links | Outcomes | Feedback | Gap Analysis |
|------|-------|----------|----------|--------------|
| SUPER_ADMIN | CRUD | CRUD | CRUD | CRUD |
| ADMIN | CRUD | CRUD | CRUD | CRUD |
| DIRECTEUR | R | R | R | R |
| ENSEIGNANT | R (own) | R (own) | W (own) | R (own) |

## 5. Analytics

```typescript
const Analytics = {
  employmentRate: (program) => calculateEmploymentRate(program),
  timeToEmployment: (program) => calculateAvgTime(program),
  salaryComparison: (program, industry) => compareSalaries(program, industry),
  programROI: (program) => calculateROI(program),
  industryAlignment: (program, industry) => measureAlignment(program, industry)
};
```

## 6. Recommendations Engine

```typescript
const generateRecommendations = (gapAnalysis) => {
  return gapAnalysis.gaps_identified.map(gap => ({
    priority: gap.priority,
    action: getActionForGap(gap),
    estimated_impact: estimateImpact(gap),
    resources_required: getResources(gap),
    timeline: getTimeline(gap)
  }));
};
```

## 7. Dashboard Metrics

- Taux d'emploi par programme
- Salaire moyen par diplôme
- Temps moyen d'insertion
- Top employeurs par programme
- Satisfaction employeurs
- Écarts compétences identifiés

## 8. Index

```sql
CREATE INDEX idx_edu_emp_links_program ON education_employment_links(program_id);
CREATE INDEX idx_edu_emp_links_industry ON education_employment_links(industry);
CREATE INDEX idx_outcomes_program ON program_outcomes(program_id);
CREATE INDEX idx_outcomes_year ON program_outcomes(graduation_year);
CREATE INDEX idx_feedback_program ON curriculum_feedback(program_id);
CREATE INDEX idx_feedback_type ON curriculum_feedback(feedback_type);
```
