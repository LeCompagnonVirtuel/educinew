# FINANCIAL_ARCHITECTURE.md — Architecture Financière

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Document d'architecture du sous-système financier complet : composants, flux de données, patterns utilisés et principes de conception.

---

## 2. Architecture globale

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js)                   │
│  Pages → Hooks → Services → UI Components               │
├─────────────────────────────────────────────────────────┤
│                    API LAYER (Edge Functions)            │
│  Auth → RBAC → Validation → Rate Limit → Controllers    │
├─────────────────────────────────────────────────────────┤
│                    SERVICE LAYER                         │
│  Finance │ Payments │ Wallets │ Scholarships │ AI        │
├─────────────────────────────────────────────────────────┤
│                    REPOSITORY LAYER                      │
│  Supabase Client → RLS → Queries → Transactions         │
├─────────────────────────────────────────────────────────┤
│                    DATA LAYER (Supabase)                 │
│  PostgreSQL │ RLS │ Indexes │ Functions │ Triggers       │
├─────────────────────────────────────────────────────────┤
│                    EXTERNAL SERVICES                     │
│  Money Fusion │ DeepSeek │ Gemini │ Economic Data APIs   │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Modules et dépendances

```
FINANCE (comptabilité générale)
├── PAYMENTS (transactions)
│   ├── WALLETS (portefeuilles numériques)
│   └── Money Fusion (provider)
├── SCHOLARSHIPS (bourses)
├── STUDENT_FINANCE (finance étudiante)
│   └── Payment Plans
├── INSTITUTION_FINANCE (trésorerie)
├── GOVERNMENT_FINANCE (subventions étatiques)
├── GRANTS (subventions externes)
├── INVESTMENTS (placements)
├── DONATIONS (dons et mécénat)
├── INSURANCE (assurances)
├── RECONCILIATION (rapprochement)
├── COMPLIANCE (conformité)
├── SECURITY (sécurité financière)
├── INTELLIGENCE (analyses prédictives)
├── ECONOMIC_DATA_MESH (données externes)
└── AI (intelligence artificielle)
```

---

## 4. Patterns architecturaux

### 4.1 CQRS (Command Query Responsibility Segregation)

```typescript
// Command side (écriture)
interface FinanceCommandHandler {
  handleCreateEntry(command: CreateEntryCommand): Promise<JournalEntry>;
  handleApproveEntry(command: ApproveEntryCommand): Promise<void>;
}

// Query side (lecture)
interface FinanceQueryHandler {
  getTrialBalance(query: TrialBalanceQuery): Promise<TrialBalance>;
  getIncomeStatement(query: IncomeStatementQuery): Promise<IncomeStatement>;
}
```

### 4.2 Event Sourcing (audit trail)

```typescript
interface FinancialEvent {
  id: string;
  type: 'ENTRY_CREATED' | 'ENTRY_APPROVED' | 'PAYMENT_RECEIVED';
  aggregateId: string;
  payload: Record<string, unknown>;
  metadata: {
    userId: string;
    schoolId: string;
    timestamp: string;
    ip: string;
  };
}
```

### 4.3 Repository Pattern

```typescript
interface FinanceRepository {
  // Écritures
  createEntry(data: CreateEntryData): Promise<JournalEntry>;
  updateEntry(id: string, data: Partial<JournalEntry>): Promise<JournalEntry>;
  getEntryById(id: string): Promise<JournalEntry | null>;
  getEntriesByPeriod(schoolId: string, periodId: string): Promise<JournalEntry[]>;

  // Requêtes
  getTrialBalance(schoolId: string, periodId: string): Promise<AccountBalance[]>;
  getIncomeStatement(schoolId: string, periodId: string): Promise<IncomeStatementLine[]>;
}
```

---

## 5. Flux de données critiques

### 5.1 Paiement standard

```
Parent initiate payment
  → PaymentService.create()
    → MoneyFusion.initiate()
      → Webhook received
        → Verify HMAC signature
          → Update payment status
            → Update invoice balance
              → Update wallet if applicable
                → Generate audit log
                  → Send notification
```

### 5.2 Réconciliation bancaire

```
Import bank statement
  → Parse CSV/MT940
    → Create bank_statement_lines
      → Auto-reconcile algorithm
        → Match with journal entries
          → Flag discrepancies
            → Human review if needed
              → Final reconciliation
```

---

## 6. Multi-tenant

Chaque requête financière :
1. Extrait `school_id` du JWT
2. Applique RLS (sécurité de backup)
3. Filtre systématiquement par `school_id`
4. Aucune donnée n'est partagée entre établissements

```typescript
// Exemple de requête sécurisée
const entries = await supabase
  .from('journal_entries')
  .select('*')
  .eq('school_id', schoolId)  // Filtre obligatoire
  .eq('period_id', periodId);
```

---

## 7. Performance

| Technique | Implémentation |
|-----------|----------------|
| Server Components | Pages financières rendues côté serveur |
| Lazy Loading | Modules IA chargés à la demande |
| Dynamic Import | Charts lourds en dynamic import |
| Pagination | Toutes les listes paginées (max 100) |
| Cache | Requêtes fréquentes cachées 5min |
| Materialized Views | Résumés pré-calculés |

---

## 8. Monitoring

```
Métriques clés :
- Latence API (p50, p95, p99)
- Taux d'erreur par endpoint
- Volume de transactions
- Montant total traité
- Taux de succès des paiements
- Temps de réconciliation
- Utilisation IA (tokens, latence)
```

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
