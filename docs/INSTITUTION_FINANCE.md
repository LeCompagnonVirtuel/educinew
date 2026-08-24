# INSTITUTION_FINANCE.md — Finance Institutionnelle

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module Finance Institutionnelle gère les finances au niveau de l'établissement : comptes bancaires, flux de trésorerie, comptes débiteurs/créditeurs, et reporting institutionnel consolidé.

---

## 2. Schéma de base de données

```sql
-- Comptes bancaires de l'institution
CREATE TABLE institution_bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  bank_name VARCHAR(200) NOT NULL,
  account_name VARCHAR(200) NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  account_type VARCHAR(30) CHECK (account_type IN (
    'CURRENT', 'SAVINGS', 'FIXED_DEPOSIT', 'OPERATIONAL'
  )),
  currency VARCHAR(3) DEFAULT 'XOF',
  balance DECIMAL(15,2) DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, account_number)
);

-- Flux de trésorerie
CREATE TABLE cash_flow_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  bank_account_id UUID REFERENCES institution_bank_accounts(id),
  flow_type VARCHAR(20) NOT NULL CHECK (flow_type IN ('INFLOW', 'OUTFLOW')),
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'TUITION_FEES', 'OTHER_FEES', 'GOVERNMENT_SUBSIDY',
    'SALARIES', 'SUPPLIERS', 'UTILITIES', 'MAINTENANCE',
    'INVESTMENTS', 'LOANS', 'OTHER'
  )),
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  description TEXT,
  reference_type VARCHAR(50),
  reference_id UUID,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comptes débiteurs (créances)
CREATE TABLE accounts_receivable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  invoice_id UUID REFERENCES invoices(id),
  amount DECIMAL(15,2) NOT NULL,
  due_date DATE NOT NULL,
  aging_bucket VARCHAR(20) CHECK (aging_bucket IN (
    'CURRENT', '30_DAYS', '60_DAYS', '90_DAYS', 'OVER_90'
  )),
  status VARCHAR(20) DEFAULT 'OUTSTANDING' CHECK (status IN (
    'OUTSTANDING', 'PARTIAL', 'COLLECTED', 'WRITTEN_OFF'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comptes créditeurs (dettes)
CREATE TABLE accounts_payable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  supplier_name VARCHAR(200) NOT NULL,
  description TEXT,
  amount DECIMAL(15,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN (
    'PENDING', 'APPROVED', 'PAID', 'OVERDUE'
  )),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_bank_accounts_school ON institution_bank_accounts(school_id);
CREATE INDEX idx_cash_flow_school ON cash_flow_entries(school_id);
CREATE INDEX idx_cash_flow_date ON cash_flow_entries(transaction_date);
CREATE INDEX idx_cash_flow_type ON cash_flow_entries(flow_type);
CREATE INDEX idx_receivable_school ON accounts_receivable(school_id);
CREATE INDEX idx_receivable_student ON accounts_receivable(student_id);
CREATE INDEX idx_receivable_aging ON accounts_receivable(aging_bucket);
CREATE INDEX idx_payable_school ON accounts_payable(school_id);
CREATE INDEX idx_payable_due ON accounts_payable(due_date);
```

---

## 3. RBAC

| Rôle | Voir trésorerie | Ajouter compte | Créer flux | Approuver paiement | Voir aging |
|------|:-:|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✗ | ✓ | ✗ | ✓ |
| DIRECTEUR | ✓ (lecture) | ✗ | ✗ | ✗ | ✓ |

---

## 4. Service principal

```typescript
// services/institution-finance/institution-finance.service.ts
interface InstitutionFinanceService {
  getTreasurySummary(schoolId: string): Promise<TreasurySummary>;
  getCashFlowForecast(schoolId: string, days: number): Promise<CashFlowForecast>;
  getAgingReport(schoolId: string): Promise<AgingReport>;
  getReceivables(schoolId: string, filters: AgingFilter): Promise<Receivable[]>;
  getPayables(schoolId: string, filters: PayableFilter): Promise<Payable[]>;
}
```

---

## 5. API Endpoints

```
GET    /api/institution-finance/treasury          → Synthèse trésorerie
GET    /api/institution-finance/cash-flow          → Flux de trésorerie
GET    /api/institution-finance/cash-flow/forecast → Prévisions
GET    /api/institution-finance/receivables        → Créances
GET    /api/institution-finance/receivables/aging  → Rapport aging
GET    /api/institution-finance/payables           → Dettes fournisseurs
POST   /api/institution-finance/payables           → Enregistrer dette
POST   /api/institution-finance/bank-accounts      → Ajouter compte
```

---

## 6. Règles métier

1. **Aging** : Calcul automatique du vieillissement des créances
2. **Prévisions** : Projection sur 30/60/90 jours basée sur les échéances
3. **Relevé** : Synchronisation mensuelle des comptes bancaires
4. **Alertes** : Notification si solde opérationnel < seuil minimum
5. **Consolidation** : Agrégation multi-établissements pour le SUPER_ADMIN

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
