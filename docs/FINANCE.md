# FINANCE.md — Module Finance Générale

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module Finance centralise toutes les opérations financières de l'établissement : comptabilité générale, trésorerie, budget, reporting et consolidation multi-entités.

### Principes fondamentaux

- Double comptabilité accrue
- Séparation des rôles (saisie / validation / exécution)
- Traçabilité complète de chaque écriture
- Multi-devises avec taux de change centralisés
- Consolidation automatique par établissement

---

## 2. Architecture

```
Page → Hook → Service → Repository → Supabase
```

Aucune logique métier dans les composants UI.

---

## 3. Schéma de base de données

```sql
-- Table principale des comptes comptables
CREATE TABLE chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  account_code VARCHAR(20) NOT NULL,
  account_name VARCHAR(200) NOT NULL,
  account_type VARCHAR(50) NOT NULL CHECK (account_type IN (
    'ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'
  )),
  parent_id UUID REFERENCES chart_of_accounts(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, account_code)
);

-- Écritures comptables
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  entry_number VARCHAR(50) NOT NULL,
  entry_date DATE NOT NULL,
  description TEXT NOT NULL,
  period_id UUID NOT NULL REFERENCES fiscal_periods(id),
  status VARCHAR(30) DEFAULT 'DRAFT' CHECK (status IN (
    'DRAFT', 'PENDING', 'APPROVED', 'POSTED', 'VOID'
  )),
  total_debit DECIMAL(15,2) DEFAULT 0,
  total_credit DECIMAL(15,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'XOF',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, entry_number)
);

-- Lignes d'écriture
CREATE TABLE journal_entry_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
  debit DECIMAL(15,2) DEFAULT 0 CHECK (debit >= 0),
  credit DECIMAL(15,2) DEFAULT 0 CHECK (credit >= 0),
  description TEXT,
  cost_center_id UUID REFERENCES cost_centers(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (debit > 0 OR credit > 0),
  CHECK (NOT (debit > 0 AND credit > 0))
);

-- Périodes fiscales
CREATE TABLE fiscal_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  period_name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_closed BOOLEAN DEFAULT FALSE,
  closed_by UUID REFERENCES auth.users(id),
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Centres de coûts
CREATE TABLE cost_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  center_code VARCHAR(20) NOT NULL,
  center_name VARCHAR(200) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, center_code)
);

-- Budgets
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  period_id UUID NOT NULL REFERENCES fiscal_periods(id),
  account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
  budget_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  actual_amount DECIMAL(15,2) DEFAULT 0,
  variance DECIMAL(15,2) GENERATED ALWAYS AS (budget_amount - actual_amount) STORED,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, period_id, account_id)
);

-- Index
CREATE INDEX idx_journal_entries_school ON journal_entries(school_id);
CREATE INDEX idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX idx_journal_entries_status ON journal_entries(status);
CREATE INDEX idx_journal_lines_entry ON journal_entry_lines(entry_id);
CREATE INDEX idx_journal_lines_account ON journal_entry_lines(account_id);
CREATE INDEX idx_budgets_school_period ON budgets(school_id, period_id);
CREATE INDEX idx_cost_centers_school ON cost_centers(school_id);
```

---

## 4. RBAC

| Rôle | Créer écriture | Approuver écriture | Consulter | Modifier budget | Fermer période |
|------|:-:|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✗ | ✓ | ✗ | ✗ |
| DIRECTEUR | ✗ | ✗ | ✓ | ✓ | ✗ |

---

## 5. Service principal

```typescript
// services/finance/finance.service.ts
interface CreateEntryParams {
  school_id: string;
  entry_date: string;
  description: string;
  period_id: string;
  lines: Array<{
    account_id: string;
    debit?: number;
    credit?: number;
    description?: string;
    cost_center_id?: string;
  }>;
}

interface FinanceService {
  createEntry(params: CreateEntryParams): Promise<JournalEntry>;
  approveEntry(entryId: string, userId: string): Promise<JournalEntry>;
  postEntry(entryId: string): Promise<JournalEntry>;
  getTrialBalance(schoolId: string, periodId: string): Promise<TrialBalance>;
  getIncomeStatement(schoolId: string, periodId: string): Promise<IncomeStatement>;
  getBalanceSheet(schoolId: string, asOfDate: string): Promise<BalanceSheet>;
}
```

---

## 6. API Endpoints

```
POST   /api/finance/entries          → Créer une écriture
GET    /api/finance/entries          → Lister les écritures
GET    /api/finance/entries/:id      → Détail d'une écriture
PATCH  /api/finance/entries/:id      → Modifier une écriture (DRAFT uniquement)
POST   /api/finance/entries/:id/approve  → Approuver
POST   /api/finance/entries/:id/post     → Comptabiliser
POST   /api/finance/entries/:id/void     → Annuler
GET    /api/finance/trial-balance    → Balance générale
GET    /api/finance/income-statement → Compte de résultat
GET    /api/finance/balance-sheet    → Bilan
GET    /api/finance/budgets          → Suivi budgétaire
```

---

## 7. Règles métier

1. **Équilibre obligatoire** : Chaque écriture doit avoir total_debit = total_credit
2. **Validation séquentielle** : DRAFT → APPROVED → POSTED
3. **Verrouillage** : Une écriture POSTED ne peut être modifiée, uniquement annulée
4. **Période fermée** : Aucune écriture ne peut être créée dans une période fermée
5. **Budget** : Alerte si dépassement > 10% du budget prévisionnel

---

## 8. Validation Zod

```typescript
import { z } from 'zod';

const EntryLineSchema = z.object({
  account_id: z.string().uuid(),
  debit: z.number().min(0).optional(),
  credit: z.number().min(0).optional(),
  description: z.string().max(500).optional(),
  cost_center_id: z.string().uuid().optional(),
}).refine(
  (data) => (data.debit || 0) > 0 || (data.credit || 0) > 0,
  { message: "Débit ou crédit requis" }
).refine(
  (data) => !((data.debit || 0) > 0 && (data.credit || 0) > 0),
  { message: "Débit et crédit mutuellement exclusifs" }
);

const CreateEntrySchema = z.object({
  school_id: z.string().uuid(),
  entry_date: z.string().datetime(),
  description: z.string().min(1).max(500),
  period_id: z.string().uuid(),
  lines: z.array(EntryLineSchema).min(2),
});
```

---

## 9. Reporting

| Rapport | Description | Fréquence |
|---------|-------------|-----------|
| Balance générale | Soldes de tous les comptes | Temps réel |
| Compte de résultat | Revenus vs charges | Mensuel |
| Bilan | Actif / Passif | Trimestriel |
| Suivi budgétaire | Réalisé vs prévisionnel | Mensuel |
| Flux de trésorerie | Entrées / Sorties | Hebdomadaire |

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
