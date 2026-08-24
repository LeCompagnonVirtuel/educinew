# CAREER - Gestion des Carrières

Phase 4.4 - Module Career

---

## 1. Objectif

Suivi longitudinal des parcours professionnels des diplômés, de l'orientation à l'évolution de carrière.

## 2. Modèle de Données

```sql
CREATE TABLE workforce_careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  student_id UUID REFERENCES students(id),
  current_company TEXT,
  current_position TEXT,
  industry TEXT,
  start_date DATE,
  salary_range TEXT,
  career_goals JSONB DEFAULT '{}',
  skills_matched JSONB DEFAULT '[]',
  progression_history JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE workforce_career_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id UUID REFERENCES workforce_careers(id),
  milestone_type TEXT CHECK (milestone_type IN ('PROMOTION','CHANGE','CERTIFICATION','TRAINING','ACHIEVEMENT')),
  title TEXT NOT NULL,
  description TEXT,
  achieved_at DATE,
  impact_score INT CHECK (impact_score BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/workforce/careers/:studentId
```json
{
  "career": {
    "id": "uuid",
    "current_company": "TechCorp Africa",
    "current_position": "Développeur Full Stack",
    "industry": "IT",
    "start_date": "2024-06-15",
    "progression_history": [
      {
        "position": "Stagiaire",
        "company": "TechCorp Africa",
        "start": "2024-01",
        "end": "2024-06"
      }
    ],
    "milestones": [
      {
        "type": "PROMOTION",
        "title": "Promotion développeur junior",
        "achieved_at": "2024-09"
      }
    ]
  }
}
```

### POST /api/workforce/careers
```json
{
  "student_id": "uuid",
  "current_company": "StartupTech",
  "current_position": "Analyste Data",
  "industry": "Data Science",
  "start_date": "2024-03-01",
  "career_goals": {
    "short_term": "Devenir Lead Data Engineer",
    "long_term": "CTO"
  }
}
```

### POST /api/workforce/careers/:id/milestones
```json
{
  "milestone_type": "CERTIFICATION",
  "title": "AWS Solutions Architect",
  "description": "Certification obtenue",
  "achieved_at": "2024-12-01",
  "impact_score": 8
}
```

## 4. RBAC

| Rôle | Lecture | Écriture | Vue historique |
|------|---------|----------|----------------|
| SUPER_ADMIN | ✅ | ✅ | ✅ |
| ADMIN | ✅ | ✅ | ✅ |
| ENSEIGNANT | ❌ | ❌ | ❌ |
| ELEVE | ✅ (own) | ❌ | ✅ (own) |
| PARENT | ✅ (child) | ❌ | ✅ (child) |

## 5. Règles Métier

- Un étudiant ne peut avoir qu'un seul profil career actif
- Les milestones sont ajoutés manuellement ou via intégration
- Le salary_range est un indicateur, pas une valeur exacte
- La progression_history est mise à jour automatiquement

## 6. Analytics

- Distribution des industries par promotion
- Temps moyen première emploi
- Évolution salariale moyenne
- Taux de fidélisation entreprise
- Top compétences recherchées

## 7. Index

```sql
CREATE INDEX idx_careers_student ON workforce_careers(student_id);
CREATE INDEX idx_careers_school ON workforce_careers(school_id);
CREATE INDEX idx_careers_industry ON workforce_careers(industry);
CREATE INDEX idx_milestones_career ON workforce_career_milestones(career_id);
```
