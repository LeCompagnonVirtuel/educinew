# LIFELONG_LEARNING - Formation Continue

Phase 4.4 - Module Lifelong Learning

---

## 1. Objectif

Plateforme de formation continue pour les diplômés et professionnels en activité, permettant la montée en compétences tout au long de la vie.

## 2. Modèle de Données

```sql
CREATE TABLE lifelong_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('TECHNICAL','MANAGEMENT','DIGITAL','LANGUAGE','COMPLIANCE')),
  format TEXT CHECK (format IN ('ONLINE','HYBRID','IN_PERSON','SELF_PACED')),
  duration_hours INT,
  price DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'FCFA',
  max_participants INT,
  instructor_id UUID REFERENCES users(id),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lifelong_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  course_id UUID REFERENCES lifelong_courses(id),
  user_id UUID REFERENCES users(id),
  status TEXT CHECK (status IN ('ENROLLED','IN_PROGRESS','COMPLETED','DROPPED')),
  progress INT DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  completion_date DATE,
  certificate_url TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lifelong_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES lifelong_courses(id),
  title TEXT NOT NULL,
  content_type TEXT CHECK (content_type IN ('VIDEO','TEXT','QUIZ','ASSIGNMENT','LIVE')),
  content_url TEXT,
  duration_minutes INT,
  order_index INT NOT NULL,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. API Endpoints

### GET /api/lifelong/courses
```json
{
  "courses": [
    {
      "id": "uuid",
      "title": "Formation DevOps Avancé",
      "category": "TECHNICAL",
      "format": "ONLINE",
      "duration_hours": 40,
      "price": 150000,
      "instructor": "Dr. Koné",
      "start_date": "2024-11-01",
      "enrolled_count": 25,
      "rating": 4.8
    }
  ]
}
```

### POST /api/lifelong/enrollments
```json
{
  "course_id": "uuid",
  "payment_method": "MONEY_FUSION"
}
```

### GET /api/lifelong/enrollments/:id/progress
```json
{
  "enrollment_id": "uuid",
  "progress": 65,
  "completed_modules": 8,
  "total_modules": 12,
  "current_module": "Module 9: CI/CD Pipeline",
  "estimated_completion": "2024-12-15"
}
```

### POST /api/lifelong/modules/:id/complete
```json
{
  "score": 85,
  "time_spent_minutes": 45,
  "feedback": "Contenu très utile"
}
```

## 4. RBAC

| Rôle | Voir cours | S'inscrire | Créer cours | Voir certificat |
|------|-----------|-----------|-------------|-----------------|
| SUPER_ADMIN | ✅ | ✅ | ✅ | ✅ |
| ADMIN | ✅ | ✅ | ✅ | ✅ |
| ENSEIGNANT | ✅ | ✅ | ✅ | ✅ |
| ELEVE/GRADUATE | ✅ | ✅ | ❌ | ✅ (own) |
| PROFESSIONAL | ✅ | ✅ | ❌ | ✅ (own) |

## 5. Certification

- Certificat généré automatiquement à 100% de progression
- PDF signé avec QR code vérifiable
- Stocké dans Supabase Storage
- Valide X mois selon le cours

## 6. Pricing Models

```typescript
const PricingModels = {
  FREE: { price: 0 },
  ONE_TIME: { price: 150000, currency: 'FCFA' },
  SUBSCRIPTION: { monthly: 25000, annual: 250000 },
  CORPORATE: { per_seat: 100000, min_seats: 5 }
};
```

## 7. Analytics

- Taux de complétion par cours
- Temps moyen de formation
- Satisfaction apprenants
- Revenus générés
- Compétences les plus demandées
- Taux de rétention

## 8. Index

```sql
CREATE INDEX idx_courses_school ON lifelong_courses(school_id);
CREATE INDEX idx_courses_category ON lifelong_courses(category);
CREATE INDEX idx_enrollments_course ON lifelong_enrollments(course_id);
CREATE INDEX idx_enrollments_user ON lifelong_enrollments(user_id);
CREATE INDEX idx_enrollments_status ON lifelong_enrollments(status);
CREATE INDEX idx_modules_course ON lifelong_modules(course_id);
```
