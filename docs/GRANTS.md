# GRANTS.md — Module Subventions et Fonds Externes

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module gère les subventions non-gouvernementales : fondations, organisations internationales, bailleurs de fonds privés. Il suit le cycle complet : demande → approbation → décaissement → reporting → clôture.

---

## 2. Schéma de base de données

```sql
-- Subventions externes
CREATE TABLE external_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  donor_name VARCHAR(300) NOT NULL,
  donor_type VARCHAR(50) CHECK (donor_type IN (
    'FOUNDATION', 'NGO', 'INTERNATIONAL_ORG', 'CORPORATE', 'INDIVIDUAL'
  )),
  grant_name VARCHAR(300) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  released_amount DECIMAL(15,2) DEFAULT 0,
  grant_currency VARCHAR(3) DEFAULT 'USD',
  exchange_rate DECIMAL(10,6) DEFAULT 1,
  status VARCHAR(30) DEFAULT 'APPLIED' CHECK (status IN (
    'APPLIED', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'CLOSED', 'REJECTED'
  )),
  application_date DATE NOT NULL,
  approval_date DATE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  purpose TEXT NOT NULL,
  reporting_frequency VARCHAR(20) CHECK (reporting_frequency IN (
    'MONTHLY', 'QUARTERLY', 'ANNUAL'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Décaissements
CREATE TABLE grant_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id UUID NOT NULL REFERENCES external_grants(id) ON DELETE CASCADE,
  release_number INTEGER NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  local_amount DECIMAL(15,2),
  release_date DATE NOT NULL,
  conditions_met BOOLEAN DEFAULT TRUE,
  notes TEXT,
  received_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rapports de performance
CREATE TABLE grant_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id UUID NOT NULL REFERENCES external_grants(id),
  report_period VARCHAR(20) NOT NULL,
  report_type VARCHAR(50) CHECK (report_type IN (
    'PROGRESS', 'FINANCIAL', 'FINAL', 'INTERIM'
  )),
  activities_completed INTEGER DEFAULT 0,
  beneficiaries_reached INTEGER DEFAULT 0,
  amount_spent DECIMAL(15,2) DEFAULT 0,
  amount_remaining DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN (
    'DRAFT', 'SUBMITTED', 'APPROVED', 'RETURNED'
  )),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_ext_grants_school ON external_grants(school_id);
CREATE INDEX idx_ext_grants_donor ON external_grants(donor_name);
CREATE INDEX idx_ext_grants_status ON external_grants(status);
CREATE INDEX idx_grant_releases_grant ON grant_releases(grant_id);
CREATE INDEX idx_grant_reports_grant ON grant_reports(grant_id);
```

---

## 3. RBAC

| Rôle | Consulter | Créer demande | Approuver | Soumettre rapport | Clôturer |
|------|:-:|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✗ | ✗ | ✓ (financier) | ✗ |
| DIRECTEUR | ✓ | ✓ | ✗ | ✓ | ✗ |

---

## 4. API Endpoints

```
GET    /api/grants/external                    → Lister les subventions
POST   /api/grants/external                    → Soumettre une demande
GET    /api/grants/external/:id                → Détail d'une subvention
PATCH  /api/grants/external/:id                → Modifier statut
GET    /api/grants/external/:id/releases        → Décaissements
POST   /api/grants/external/:id/releases        → Enregistrer un décaissement
GET    /api/grants/external/:id/reports         → Rapports
POST   /api/grants/external/:id/reports         → Créer un rapport
POST   /api/grants/external/:id/reports/:rid/submit → Soumettre rapport
```

---

## 5. Règles métier

1. **Multi-devises** : Conversion automatique via taux centralisé
2. **Décaissements** : Libérations progressives selon les jalons
3. **Reporting** : Rapports obligatoires selon la fréquence définie
4. **Conditions** : Vérification des conditions avant chaque décaissement
5. **Clôture** : Solde de tout compte avant fermeture de la subvention

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
