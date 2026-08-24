# DONATIONS.md — Module Dons et Mécénat

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module gère les dons reçus par l'établissement : dons ponctuels, dons récurrents, mécénat d'entreprise, legs, et suivi des reçus fiscaux.

---

## 2. Schéma de base de données

```sql
-- Dons
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  donor_name VARCHAR(300) NOT NULL,
  donor_type VARCHAR(30) CHECK (donor_type IN (
    'INDIVIDUAL', 'CORPORATE', 'FOUNDATION', 'ALUMNI', 'GOVERNMENT', 'OTHER'
  )),
  donor_email VARCHAR(200),
  donor_phone VARCHAR(30),
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) DEFAULT 'XOF',
  donation_type VARCHAR(30) CHECK (donation_type IN (
    'ONE_TIME', 'RECURRING', 'LEGACY', 'IN_KIND'
  )),
  frequency VARCHAR(20) CHECK (frequency IN ('MONTHLY', 'QUARTERLY', 'ANNUAL')),
  purpose VARCHAR(50) CHECK (purpose IN (
    'GENERAL', 'SCHOLARSHIP', 'INFRASTRUCTURE', 'EQUIPMENT',
    'RESEARCH', 'ENDOWMENT', 'OTHER'
  )),
  is_anonymous BOOLEAN DEFAULT FALSE,
  tax_receipt_number VARCHAR(100),
  tax_receipt_issued BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'RECEIVED' CHECK (status IN (
    'PROMISED', 'RECEIVED', 'ACKNOWLEDGED', 'TAX_RECEIPT_ISSUED'
  )),
  received_at TIMESTAMPTZ,
  wallet_id UUID REFERENCES wallets(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campagnes de collecte de fonds
CREATE TABLE fundraising_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  campaign_name VARCHAR(300) NOT NULL,
  description TEXT,
  goal_amount DECIMAL(15,2) NOT NULL,
  raised_amount DECIMAL(15,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN (
    'DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dons liés à une campagne
CREATE TABLE campaign_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES fundraising_campaigns(id),
  donation_id UUID NOT NULL REFERENCES donations(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, donation_id)
);

-- Index
CREATE INDEX idx_donations_school ON donations(school_id);
CREATE INDEX idx_donations_donor ON donations(donor_name);
CREATE INDEX idx_donations_type ON donations(donation_type);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_campaigns_school ON fundraising_campaigns(school_id);
CREATE INDEX idx_campaigns_status ON fundraising_campaigns(status);
```

---

## 3. RBAC

| Rôle | Consulter | Enregistrer don | Émettre reçu fiscal | Créer campagne |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✓ | ✓ | ✗ |
| SECRETAIRE | ✓ (lecture) | ✗ | ✗ | ✗ |

---

## 4. API Endpoints

```
GET    /api/donations                           → Lister les dons
POST   /api/donations                           → Enregistrer un don
GET    /api/donations/:id                       → Détail d'un don
PATCH  /api/donations/:id                       → Modifier statut
POST   /api/donations/:id/tax-receipt           → Émettre reçu fiscal
GET    /api/donations/campaigns                 → Campagnes de collecte
POST   /api/donations/campaigns                 → Créer une campagne
GET    /api/donations/campaigns/:id             → Détail campagne
GET    /api/donations/campaigns/:id/donations   → Dons de la campagne
GET    /api/donations/summary                   → Synthèse annuelle
```

---

## 5. Règles métier

1. **Reçu fiscal** : Émis automatiquement après réception du don
2. **Anonymat** : Les dons anonymes masquent le nom dans les rapports publics
3. **Campagnes** : Le montant levé est mis à jour en temps réel
4. **Dons en nature** : Évaluation obligatoire avant enregistrement
5. **Reconnaissance** : Notification automatique de remerciement au donateur

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
