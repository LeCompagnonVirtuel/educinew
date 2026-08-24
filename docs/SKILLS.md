# SKILLS - Gestion des Compétences

Phase 4.4 - Module Skills

---

## 1. Objectif

Catalogue centralisé des compétences techniques et transversales, liées aux programmes scolaires et aux exigences du marché du travail.

## 2. Modèle de Données

```sql
CREATE TABLE workforce_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('TECHNICAL','SOFT','DIGITAL','LANGUAGE','MANAGEMENT')),
  description TEXT,
  level_required TEXT CHECK (level_required IN ('BEGINNER','INTERMEDIATE','ADVANCED','EXPERT')),
  industry_relevance JSONB DEFAULT '[]',
  assessment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE workforce_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  skill_id UUID REFERENCES workforce_skills(id),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  validity_months INT DEFAULT 24,
  cost DECIMAL(10,2),
  requirements JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/workforce/skills
```json
{
  "skills": [
    {
      "id": "uuid",
      "name": "Développement Web",
      "category": "TECHNICAL",
      "level_required": "INTERMEDIATE",
      "industry_relevance": ["IT", "Digital"],
      "certifications_count": 3
    }
  ],
  "total": 45
}
```

### POST /api/workforce/skills
```json
{
  "name": "Comptabilité",
  "category": "TECHNICAL",
  "description": "Gestion comptable et financière",
  "level_required": "INTERMEDIATE",
  "industry_relevance": ["Finance", "Commerce"]
}
```

### POST /api/workforce/certifications
```json
{
  "skill_id": "uuid",
  "name": "Certified Web Developer",
  "provider": "TechCert",
  "validity_months": 24,
  "cost": 50000,
  "requirements": {
    "exam_required": true,
    "min_score": 70
  }
}
```

## 4. RBAC

| Rôle | Lecture | Écriture | Suppression |
|------|---------|----------|-------------|
| SUPER_ADMIN | ✅ | ✅ | ✅ |
| ADMIN | ✅ | ✅ | ❌ |
| ENSEIGNANT | ✅ | ❌ | ❌ |
| ELEVE | ✅ (public) | ❌ | ❌ |

## 5. Règles Métier

- Une compétence peut avoir plusieurs certifications
- Les certifications ont une durée de validité
- L'industry_relevance est un tableau JSON
- La suppression est logique (deleted_at)

## 6. Validation Zod

```typescript
const SkillSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.enum(['TECHNICAL','SOFT','DIGITAL','LANGUAGE','MANAGEMENT']),
  description: z.string().max(500).optional(),
  level_required: z.enum(['BEGINNER','INTERMEDIATE','ADVANCED','EXPERT']),
  industry_relevance: z.array(z.string()).optional()
});
```

## 7. Index

```sql
CREATE INDEX idx_skills_school ON workforce_skills(school_id);
CREATE INDEX idx_skills_category ON workforce_skills(category);
CREATE INDEX idx_skills_name ON workforce_skills(name);
CREATE INDEX idx_certifications_skill ON workforce_certifications(skill_id);
```
