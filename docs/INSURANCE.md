# INSURANCE.md — Module Assurances

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module gère les contrats d'assurance de l'établissement : assurance bâtiment, assurance du personnel, assurance scolaire (élèves), sinistres et renouvellements.

---

## 2. Schéma de base de données

```sql
-- Contrats d'assurance
CREATE TABLE insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  policy_number VARCHAR(100) NOT NULL,
  insurer_name VARCHAR(200) NOT NULL,
  policy_type VARCHAR(50) CHECK (policy_type IN (
    'BUILDING', 'CONTENT', 'LIABILITY', 'WORKERS_COMP',
    'STUDENT', 'VEHICLE', 'DIRECTORS_OFFICERS', 'CYBER'
  )),
  coverage_amount DECIMAL(15,2) NOT NULL,
  premium_amount DECIMAL(15,2) NOT NULL,
  deductible DECIMAL(15,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'XOF',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  renewal_date DATE,
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN (
    'DRAFT', 'ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING_RENEWAL'
  )),
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, policy_number)
);

-- Sinistres
CREATE TABLE insurance_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  policy_id UUID NOT NULL REFERENCES insurance_policies(id),
  claim_number VARCHAR(100) NOT NULL,
  incident_date DATE NOT NULL,
  reported_date DATE DEFAULT CURRENT_DATE,
  description TEXT NOT NULL,
  estimated_amount DECIMAL(15,2),
  settled_amount DECIMAL(15,2),
  status VARCHAR(30) DEFAULT 'FILED' CHECK (status IN (
    'FILED', 'UNDER_REVIEW', 'APPROVED', 'PARTIALLY_APPROVED',
    'REJECTED', 'SETTLED', 'CLOSED'
  )),
  documents_urls TEXT[],
  settled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cotisations (paiements de primes)
CREATE TABLE insurance_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID NOT NULL REFERENCES insurance_policies(id),
  amount DECIMAL(15,2) NOT NULL,
  payment_date DATE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  payment_method VARCHAR(50),
  reference VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_insurance_policies_school ON insurance_policies(school_id);
CREATE INDEX idx_insurance_policies_type ON insurance_policies(policy_type);
CREATE INDEX idx_insurance_policies_end ON insurance_policies(end_date);
CREATE INDEX idx_claims_school ON insurance_claims(school_id);
CREATE INDEX idx_claims_policy ON insurance_claims(policy_id);
CREATE INDEX idx_claims_status ON insurance_claims(status);
```

---

## 3. RBAC

| Rôle | Consulter | Créer contrat | Déclarer sinistre | Approuver sinistre |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✗ | ✗ | ✗ |
| INFIRMIER | ✗ | ✗ | ✓ (sinistres santé) | ✗ |

---

## 4. API Endpoints

```
GET    /api/insurance/policies                  → Lister les contrats
POST   /api/insurance/policies                  → Créer un contrat
GET    /api/insurance/policies/:id              → Détail d'un contrat
PATCH  /api/insurance/policies/:id              → Modifier
GET    /api/insurance/policies/:id/payments     → Cotisations
POST   /api/insurance/policies/:id/payments     → Enregistrer cotisation
GET    /api/insurance/claims                    → Lister les sinistres
POST   /api/insurance/claims                    → Déclarer un sinistre
PATCH  /api/insurance/claims/:id                → Traiter sinistre
GET    /api/insurance/expiring                  → Contrats à renouveler
```

---

## 5. Règles métier

1. **Renouvellement** : Alerte 60 jours avant expiration
2. **Sinistres** : Déclaration dans les 30 jours suivant l'incident
3. **Couverture** : Vérification que le sinistre est couvert par le contrat
4. **Franchise** : Déduction automatique du montant indemnisé
5. **Documents** : Stockage sécurisé des polices et justificatifs

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
