# TALENT_MARKETPLACE - Place de Marché des Talents

Phase 4.4 - Module Talent Marketplace

---

## 1. Objectif

Plateforme de mise en relation entre talents (diplômés/stagiaires) et entreprises, avec matching intelligent et processus de recrutement intégré.

## 2. Modèle de Données

```sql
CREATE TABLE marketplace_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  user_id UUID REFERENCES users(id),
  profile_type TEXT CHECK (profile_type IN ('TALENT','RECRUITER')),
  headline TEXT,
  bio TEXT,
  skills JSONB DEFAULT '[]',
  experience JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  portfolio_url TEXT,
  availability TEXT CHECK (availability IN ('IMMEDIATELY','2_WEEKS','1_MONTH','3_MONTHS','NOT_LOOKING')),
  preferred_work_types JSONB DEFAULT '[]',
  salary_expectation DECIMAL(12,2),
  location_preference TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE marketplace_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  talent_id UUID REFERENCES marketplace_profiles(id),
  job_id UUID REFERENCES workforce_jobs(id),
  match_score DECIMAL(5,2),
  talent_interest BOOLEAN,
  recruiter_interest BOOLEAN,
  status TEXT CHECK (status IN ('PENDING','MUTUAL','INTERVIEW','HIRED','EXPIRED')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE marketplace_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES marketplace_matches(id),
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/marketplace/talents
```json
{
  "talents": [
    {
      "id": "uuid",
      "headline": "Développeur Full Stack React/Node",
      "skills": ["React", "Node.js", "TypeScript", "PostgreSQL"],
      "availability": "IMMEDIATELY",
      "location_preference": "Dakar",
      "match_score": 92.5,
      "profile_views": 145
    }
  ],
  "filters": {
    "skills": ["React", "Node.js"],
    "availability": "IMMEDIATELY",
    "location": "Dakar"
  }
}
```

### POST /api/marketplace/matches
```json
{
  "talent_id": "uuid",
  "job_id": "uuid",
  "talent_interest": true
}
```

### GET /api/marketplace/matches/:id/messages
```json
{
  "messages": [
    {
      "id": "uuid",
      "sender": "Recruiter",
      "content": "Bonjour, votre profil nous intéresse beaucoup.",
      "is_read": true,
      "created_at": "2024-10-15T14:30:00Z"
    }
  ]
}
```

### POST /api/marketplace/matches/:id/messages
```json
{
  "content": "Merci pour votre intérêt. Je suis disponible pour un entretien."
}
```

## 4. Matching Algorithm

```typescript
const calculateMatch = (talent, job) => {
  const skillScore = calculateSkillOverlap(talent.skills, job.required_skills);
  const availabilityScore = getAvailabilityScore(talent.availability);
  const locationScore = talent.location_preference === job.location ? 1 : 0.5;
  const salaryScore = talent.salary_expectation <= job.salary_max ? 1 : 0.7;
  
  return (skillScore * 0.4 + availabilityScore * 0.2 + 
          locationScore * 0.2 + salaryScore * 0.2) * 100;
};
```

## 5. RBAC

| Rôle | Talents | Matches | Messages |
|------|---------|---------|----------|
| SUPER_ADMIN | CRUD | CRUD | R |
| ADMIN | CRUD | CRUD | R |
| TALENT | R (public) + W (own) | R (own) + W (own) | RW (own) |
| RECRUITER | R (visible) | RW (own) | RW (own) |

## 6. Features

- **Matching intelligent** : Algorithme ML-based
- **Messagerie intégrée** : Communication sécurisée
- **Entretiens vidéo** : Intégration Zoom/Meet
- **Évaluations** : Tests techniques intégrés
- **Analytics** : Dashboard recruteur
- **Notifications** : Temps réel

## 7. Gamification

```typescript
const Gamification = {
  badges: ['PROFILE_COMPLETE', 'FIRST_APPLICATION', 'SKILL_VERIFIED', 'INTERVIEW_READY'],
  levels: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
  reputation: calculateReputationBasedOnFeedback(...)
};
```

## 8. Index

```sql
CREATE INDEX idx_marketplace_profiles_type ON marketplace_profiles(profile_type);
CREATE INDEX idx_marketplace_profiles_skills ON marketplace_profiles USING GIN(skills);
CREATE INDEX idx_marketplace_matches_talent ON marketplace_matches(talent_id);
CREATE INDEX idx_marketplace_matches_job ON marketplace_matches(job_id);
CREATE INDEX idx_marketplace_matches_status ON marketplace_matches(status);
CREATE INDEX idx_marketplace_messages_match ON marketplace_messages(match_id);
```
