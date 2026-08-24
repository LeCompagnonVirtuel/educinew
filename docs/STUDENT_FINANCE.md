# STUDENT_FINANCE.md — Module Finance Étudiante

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module Finance Étudiante consolide la situation financière complète d'un élève : factures, paiements, bourses, solde dû, historique et prévisions. C'est la vue 360° des finances d'un étudiant.

---

## 2. Schéma de base de données

```sql
-- Résumé financier par élève (vue matérialisée)
CREATE MATERIALIZED VIEW student_financial_summary AS
SELECT
  s.id AS student_id,
  s.school_id,
  COALESCE(inv.total_invoiced, 0) AS total_invoiced,
  COALESCE(pay.total_paid, 0) AS total_paid,
  COALESCE(sch.total_scholarships, 0) AS total_scholarships,
  COALESCE(inv.total_invoiced, 0)
    - COALESCE(pay.total_paid, 0)
    - COALESCE(sch.total_scholarships, 0) AS balance_due,
  inv.invoice_count,
  pay.payment_count
FROM students s
LEFT JOIN (
  SELECT student_id, school_id,
    SUM(total_amount) AS total_invoiced,
    COUNT(*) AS invoice_count
  FROM invoices
  WHERE status != 'VOID'
  GROUP BY student_id, school_id
) inv ON s.id = inv.student_id AND s.school_id = inv.school_id
LEFT JOIN (
  SELECT student_id, school_id,
    SUM(amount) AS total_paid,
    COUNT(*) AS payment_count
  FROM payments
  WHERE status = 'COMPLETED'
  GROUP BY student_id, school_id
) pay ON s.id = pay.student_id AND s.school_id = pay.school_id
LEFT JOIN (
  SELECT student_id, school_id,
    SUM(amount) AS total_scholarships
  FROM scholarships
  WHERE status = 'ACTIVE'
  GROUP BY student_id, school_id
) sch ON s.id = sch.student_id AND s.school_id = sch.school_id;

-- Plan de paiement
CREATE TABLE payment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  total_amount DECIMAL(15,2) NOT NULL,
  installments INTEGER NOT NULL CHECK (installments > 0),
  frequency VARCHAR(20) CHECK (frequency IN ('MONTHLY', 'QUARTERLY')),
  start_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN (
    'ACTIVE', 'COMPLETED', 'DEFAULTED', 'CANCELLED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Échéancier
CREATE TABLE payment_plan_installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES payment_plans(id) ON DELETE CASCADE,
  installment_number INTEGER NOT NULL,
  due_date DATE NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  paid_amount DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN (
    'PENDING', 'PAID', 'OVERDUE', 'PARTIAL'
  )),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alertes financières
CREATE TABLE financial_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN (
    'OVERDUE', 'UPCOMING_DUE', 'PAYMENT_FAILED', 'PLAN_DEFAULT', 'LIMIT_REACHED'
  )),
  severity VARCHAR(20) DEFAULT 'INFO' CHECK (severity IN ('INFO', 'WARNING', 'CRITICAL')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_student_fin_summary ON student_financial_summary(student_id);
CREATE INDEX idx_payment_plans_student ON payment_plans(student_id);
CREATE INDEX idx_installments_plan ON payment_plan_installments(plan_id);
CREATE INDEX idx_installments_due ON payment_plan_installments(due_date);
CREATE INDEX idx_financial_alerts_student ON financial_alerts(student_id);
CREATE INDEX idx_financial_alerts_unread ON financial_alerts(is_read);
```

---

## 3. RBAC

| Rôle | Voir résumé | Créer plan | Voir alertes | Gérer échéancier |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✓ | ✓ | ✓ |
| SECRETAIRE | ✓ | ✗ | ✓ | ✗ |
| PARENT | ✓ (enfant) | ✗ | ✓ (enfant) | ✗ |
| ELEVE | ✓ (propre) | ✗ | ✓ (propre) | ✗ |

---

## 4. Service principal

```typescript
// services/student-finance/student-finance.service.ts
interface StudentFinanceService {
  getStudentSummary(studentId: string): Promise<StudentFinancialSummary>;
  createPaymentPlan(params: CreatePaymentPlanParams): Promise<PaymentPlan>;
  getNextDueInstallments(schoolId: string): Promise<Installment[]>;
  checkOverdue(): Promise<FinancialAlert[]>;
  generateStatement(studentId: string, period: string): Promise<FinancialStatement>;
}
```

---

## 5. API Endpoints

```
GET    /api/student-finance/:studentId/summary    → Résumé financier
GET    /api/student-finance/:studentId/statement   → Relevé détaillé
POST   /api/student-finance/payment-plans          → Créer un plan
GET    /api/student-finance/payment-plans/:id      → Détail du plan
POST   /api/student-finance/payment-plans/:id/pay  → Payer une échéance
GET    /api/student-finance/alerts                 → Alertes financières
PATCH  /api/student-finance/alerts/:id/read        → Marquer comme lue
GET    /api/student-finance/overdue                → Éléments en retard
```

---

## 6. Règles métier

1. **Consolidation** : Le solde = facturé - payé - bourses
2. **Plans** : Maximum 3 plans actifs par élève
3. **Retard** : Alerte automatique si échéance dépassée > 7 jours
4. **Défaut** : Après 3 échéances impayées, statut DEFAULTED + notification parent
5. **Rafraîchissement** : La vue matérialisée est rafraîchie toutes les heures

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
