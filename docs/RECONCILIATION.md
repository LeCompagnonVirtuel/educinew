# RECONCILIATION.md — Module Rapprochement Financier

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module assure le rapprochement entre les écritures comptables et les mouvements bancaires/externes. Il identifie les écarts, propose des lettrages automatiques et garantit l'exactitude des données financières.

---

## 2. Schéma de base de données

```sql
-- Relevés bancaires importés
CREATE TABLE bank_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  bank_account_id UUID NOT NULL REFERENCES institution_bank_accounts(id),
  statement_date DATE NOT NULL,
  opening_balance DECIMAL(15,2) NOT NULL,
  closing_balance DECIMAL(15,2) NOT NULL,
  imported_at TIMESTAMPTZ DEFAULT NOW(),
  reconciled BOOLEAN DEFAULT FALSE,
  reconciled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lignes de relevé bancaire
CREATE TABLE bank_statement_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  statement_id UUID NOT NULL REFERENCES bank_statements(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  balance_after DECIMAL(15,2),
  reference VARCHAR(200),
  reconciled BOOLEAN DEFAULT FALSE,
  journal_entry_id UUID REFERENCES journal_entries(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lettrages (rapprochements)
CREATE TABLE reconciliations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  bank_statement_line_id UUID NOT NULL REFERENCES bank_statement_lines(id),
  journal_entry_line_id UUID NOT NULL REFERENCES journal_entry_lines(id),
  match_type VARCHAR(20) CHECK (match_type IN ('EXACT', 'PARTIAL', 'MANUAL')),
  confidence_score DECIMAL(5,2),
  reconciled_by UUID NOT NULL REFERENCES auth.users(id),
  reconciled_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Écarts de rapprochement
CREATE TABLE reconciliation_discrepancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  bank_statement_line_id UUID REFERENCES bank_statement_lines(id),
  journal_entry_line_id UUID REFERENCES journal_entry_lines(id),
  discrepancy_type VARCHAR(30) CHECK (discrepancy_type IN (
    'AMOUNT_MISMATCH', 'MISSING_ENTRY', 'MISSING_BANK_LINE', 'DUPLICATE', 'TIMING'
  )),
  amount_difference DECIMAL(15,2),
  description TEXT,
  status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN (
    'OPEN', 'INVESTIGATING', 'RESOLVED', 'WAIVED'
  )),
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_bank_stmt_school ON bank_statements(school_id);
CREATE INDEX idx_bank_stmt_account ON bank_statements(bank_account_id);
CREATE INDEX idx_bank_stmt_date ON bank_statements(statement_date);
CREATE INDEX idx_bank_lines_stmt ON bank_statement_lines(statement_id);
CREATE INDEX idx_bank_lines_reconciled ON bank_statement_lines(reconciled);
CREATE INDEX idx_reconciliations_school ON reconciliations(school_id);
CREATE INDEX idx_discrepancies_school ON reconciliation_discrepancies(school_id);
CREATE INDEX idx_discrepancies_status ON reconciliation_discrepancies(status);
```

---

## 3. RBAC

| Rôle | Importer relevé | Rapprocher | Résoudre écart | Consulter |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✓ | ✗ | ✓ |

---

## 4. Service principal

```typescript
// services/reconciliation/reconciliation.service.ts
interface ReconciliationService {
  importBankStatement(
    schoolId: string,
    bankAccountId: string,
    file: Buffer
  ): Promise<BankStatement>;
  autoReconcile(schoolId: string, statementId: string): Promise<AutoReconcileResult>;
  manualReconcile(params: ManualReconcileParams): Promise<Reconciliation>;
  getDiscrepancies(schoolId: string): Promise<Discrepancy[]>;
  resolveDiscrepancy(discrepancyId: string, userId: string): Promise<void>;
  getReconciliationStatus(schoolId: string): Promise<ReconciliationStatus>;
}
```

---

## 5. API Endpoints

```
POST   /api/reconciliation/import              → Importer un relevé
GET    /api/reconciliation/statements           → Lister les relevés
POST   /api/reconciliation/auto                 → Lettrage automatique
POST   /api/reconciliation/manual               → Lettrage manuel
GET    /api/reconciliation/discrepancies        → Écarts identifiés
PATCH  /api/reconciliation/discrepancies/:id    → Résoudre un écart
GET    /api/reconciliation/status               → État du rapprochement
GET    /api/reconciliation/unreconciled         → Éléments non rapprochés
```

---

## 6. Règles métier

1. **Lettrage auto** : Algorithme de matching par montant + référence
2. **Seuil de confiance** : Score > 90% = lettrage automatique, sinon manuel
3. **Doublons** : Détection automatique des transactions en double
4. **Timing** : Écarts de timing < 5 jours tolérés automatiquement
5. **Reporting** : Taux de rapprochement affiché en temps réel

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
