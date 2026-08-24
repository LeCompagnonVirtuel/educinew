# SCHOLARSHIPS.md — Module Bourses et Aides Financières

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module gère les bourses, subventions scolaires, réductions et aides financières accordées aux élèves. Il intègre les critères d'éligibilité, le workflow d'approbation et l'impact sur la facturation.

---

## 2. Schéma de base de données

```sql
-- Types de bourses
CREATE TABLE scholarship_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50) CHECK (category IN (
    'MERIT', 'NEED_BASED', 'ATHLETIC', 'ARTS', 'GOVERNMENT', 'DONOR', 'LOYALTY'
  )),
  coverage_type VARCHAR(30) CHECK (coverage_type IN (
    'FULL', 'PARTIAL', 'FLAT_AMOUNT', 'PERCENTAGE'
  )),
  coverage_value DECIMAL(15,2),
  max_recipients INTEGER,
  requires_gpa BOOLEAN DEFAULT FALSE,
  min_gpa DECIMAL(3,2),
  requires_financial_need BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bourses attribuées
CREATE TABLE scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  scholarship_type_id UUID NOT NULL REFERENCES scholarship_types(id),
  academic_year VARCHAR(9) NOT NULL,
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN (
    'PENDING', 'APPROVED', 'ACTIVE', 'SUSPENDED', 'REVOKED', 'EXPIRED'
  )),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  conditions TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Demandes de bourse
CREATE TABLE scholarship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  scholarship_type_id UUID NOT NULL REFERENCES scholarship_types(id),
  academic_year VARCHAR(9) NOT NULL,
  status VARCHAR(30) DEFAULT 'SUBMITTED' CHECK (status IN (
    'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'WAITLISTED'
  )),
  motivation TEXT,
  documents_urls TEXT[],
  reviewer_id UUID REFERENCES auth.users(id),
  reviewer_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Réductions automatiques
CREATE TABLE discounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  scholarship_id UUID REFERENCES scholarships(id),
  fee_type_id UUID NOT NULL REFERENCES fee_types(id),
  discount_type VARCHAR(20) CHECK (discount_type IN ('PERCENTAGE', 'FLAT')),
  discount_value DECIMAL(15,2) NOT NULL,
  applied_to_invoice_id UUID REFERENCES invoices(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_scholarships_school ON scholarships(school_id);
CREATE INDEX idx_scholarships_student ON scholarships(student_id);
CREATE INDEX idx_scholarships_year ON scholarships(academic_year);
CREATE INDEX idx_scholarships_status ON scholarships(status);
CREATE INDEX idx_scholarship_apps_school ON scholarship_applications(school_id);
CREATE INDEX idx_scholarship_apps_student ON scholarship_applications(student_id);
```

---

## 3. RBAC

| Rôle | Consulter | Soumettre demande | Approuver | Révoquer | Attribuer directement |
|------|:-:|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✗ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✗ | ✓ | ✓ | ✓ |
| DIRECTEUR | ✓ | ✗ | ✓ | ✗ | ✗ |
| SECRETAIRE | ✓ | ✗ | ✗ | ✗ | ✗ |
| PARENT | ✓ (enfant) | ✓ | ✗ | ✗ | ✗ |
| ELEVE | ✓ (propre) | ✓ | ✗ | ✗ | ✗ |

---

## 4. Workflow d'approbation

```
Demander → Soumise → En revue → Approuvée/Rejetée
                                      ↓
                                   Active → Expirée/Révoquée
```

---

## 5. API Endpoints

```
GET    /api/scholarships                    → Lister les bourses
POST   /api/scholarships                    → Attribuer une bourse
GET    /api/scholarships/:id                → Détail d'une bourse
PATCH  /api/scholarships/:id                → Modifier statut
GET    /api/scholarship-types               → Types de bourses disponibles
POST   /api/scholarship-applications        → Soumettre une demande
GET    /api/scholarship-applications        → Lister les demandes
PATCH  /api/scholarship-applications/:id    → Traiter une demande
GET    /api/scholarships/student/:id        → Bourses d'un élève
```

---

## 6. Règles métier

1. **Éligibilité** : Vérification automatique des critères (GPA, besoin financier)
2. **Concurrence** : Si `max_recipients` atteint, mise en liste d'attente
3. **Facturation** : Les bourses actives réduisent automatiquement les factures
4. **Expiration** : Les bourses expirent à la fin de l'année académique
5. **Révocation** : Possible si les conditions ne sont plus remplies

---

## 7. Validation Zod

```typescript
const ScholarshipApplicationSchema = z.object({
  student_id: z.string().uuid(),
  scholarship_type_id: z.string().uuid(),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/),
  motivation: z.string().min(50).max(2000),
  documents_urls: z.array(z.string().url()).max(5),
});

const ApproveScholarshipSchema = z.object({
  amount: z.number().positive(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  conditions: z.string().max(1000).optional(),
});
```

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
