# GOVERNMENT_FINANCE.md — Finances Publiques et Subventions Étatiques

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module gère les relations financières avec les autorités publiques : subventions gouvernementales, transferts, conformité fiscale, déclarations obligatoires et rapports aux tutelles.

---

## 2. Schéma de base de données

```sql
-- Subventions gouvernementales
CREATE TABLE government_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  grant_name VARCHAR(300) NOT NULL,
  source_authority VARCHAR(200) NOT NULL,
  grant_type VARCHAR(50) CHECK (grant_type IN (
    'OPERATING', 'CAPITAL', 'SALARY_SUPPORT', 'SCHOLARSHIP_FUND', 'INFRASTRUCTURE'
  )),
  total_amount DECIMAL(15,2) NOT NULL,
  released_amount DECIMAL(15,2) DEFAULT 0,
  remaining_amount DECIMAL(15,2) GENERATED ALWAYS AS (
    total_amount - released_amount
  ) STORED,
  fiscal_year VARCHAR(9) NOT NULL,
  status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN (
    'APPLIED', 'PENDING', 'PARTIAL', 'FULLY_RELEASED', 'CLOSED', 'REJECTED'
  )),
  conditions TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Décaissements de subventions
CREATE TABLE grant_disbursements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id UUID NOT NULL REFERENCES government_grants(id),
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  disbursement_date DATE NOT NULL,
  reference_number VARCHAR(100),
  purpose TEXT NOT NULL,
  verified_by UUID REFERENCES auth.users(id),
  status VARCHAR(20) DEFAULT 'RECEIVED' CHECK (status IN (
    'EXPECTED', 'RECEIVED', 'VERIFIED', 'DISPUTED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Déclarations fiscales
CREATE TABLE tax_declarations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  declaration_type VARCHAR(50) NOT NULL CHECK (declaration_type IN (
    'VAT', 'INCOME_TAX', 'PAYROLL_TAX', 'PROPERTY_TAX', 'SOCIAL_CONTRIBUTIONS'
  )),
  fiscal_period VARCHAR(20) NOT NULL,
  total_revenue DECIMAL(15,2) DEFAULT 0,
  total_deductible DECIMAL(15,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(30) DEFAULT 'DRAFT' CHECK (status IN (
    'DRAFT', 'FILED', 'ACCEPTED', 'AMENDED', 'DISPUTED'
  )),
  filed_at TIMESTAMPTZ,
  due_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rapports aux tutelles
CREATE TABLE authority_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  authority_name VARCHAR(200) NOT NULL,
  report_type VARCHAR(100) NOT NULL,
  fiscal_year VARCHAR(9) NOT NULL,
  content JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN (
    'DRAFT', 'SUBMITTED', 'ACKNOWLEDGED', 'RETURNED'
  )),
  submitted_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_gov_grants_school ON government_grants(school_id);
CREATE INDEX idx_gov_grants_year ON government_grants(fiscal_year);
CREATE INDEX idx_grant_disb_grant ON grant_disbursements(grant_id);
CREATE INDEX idx_tax_decl_school ON tax_declarations(school_id);
CREATE INDEX idx_tax_decl_due ON tax_declarations(due_date);
CREATE INDEX idx_auth_reports_school ON authority_reports(school_id);
```

---

## 3. RBAC

| Rôle | Voir subventions | Appliquer | Déclarer impôts | Soumettre rapports |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✗ | ✓ | ✗ |
| DIRECTEUR | ✓ (lecture) | ✗ | ✗ | ✓ |

---

## 4. API Endpoints

```
GET    /api/government-finance/grants              → Lister les subventions
POST   /api/government-finance/grants              → Créer demande de subvention
GET    /api/government-finance/grants/:id           → Détail d'une subvention
GET    /api/government-finance/grants/:id/disbursements → Décaissements
POST   /api/government-finance/grants/:id/disbursements → Enregistrer décaissement
GET    /api/government-finance/tax-declarations     → Déclarations fiscales
POST   /api/government-finance/tax-declarations     → Créer une déclaration
POST   /api/government-finance/tax-declarations/:id/file → Déposer
GET    /api/government-finance/reports              → Rapports aux tutelles
POST   /api/government-finance/reports              → Créer un rapport
POST   /api/government-finance/reports/:id/submit   → Soumettre
```

---

## 5. Règles métier

1. **Traçabilité** : Chaque décaissement est lié à un usage spécifique
2. **Conformité** : Les déclarations doivent être déposées avant la date limite
3. **Vérification** : Double vérification des montants reçus vs attendus
4. **Reporting** : Rapports annuels obligatoires aux autorités de tutelle
5. **Alertes** : Notification 30 jours avant chaque échéance fiscale

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
