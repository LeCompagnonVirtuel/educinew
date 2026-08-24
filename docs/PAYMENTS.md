# PAYMENTS.md — Module Paiements

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module Paiements gère toutes les transactions financières : frais scolaires, bourses, pénalités, remboursements. Provider exclusif : **Money Fusion** (Stripe, Flutterwave, CinetPay interdits).

---

## 2. Schéma de base de données

```sql
-- Transactions de paiement
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) DEFAULT 'XOF',
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN (
    'CASH', 'MOBILE_MONEY', 'BANK_TRANSFER', 'CARD', 'CHECK', 'WALLET'
  )),
  provider VARCHAR(50) DEFAULT 'MONEY_FUSION',
  provider_ref VARCHAR(200),
  status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN (
    'PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'VOID'
  )),
  description TEXT,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lignes de facture
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description VARCHAR(300) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  fee_type_id UUID REFERENCES fee_types(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Factures
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  invoice_number VARCHAR(50) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  paid_amount DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN (
    'DRAFT', 'PENDING', 'PARTIAL', 'PAID', 'OVERDUE', 'VOID'
  )),
  due_date DATE NOT NULL,
  issued_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, invoice_number)
);

-- Types de frais
CREATE TABLE fee_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50) CHECK (category IN (
    'TUITION', 'REGISTRATION', 'EXAM', 'TRANSPORT', 'MEALS', 'UNIFORM', 'OTHER'
  )),
  amount DECIMAL(15,2) NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  frequency VARCHAR(20) CHECK (frequency IN ('MONTHLY', 'QUARTERLY', 'ANNUAL')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_payments_school ON payments(school_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_date ON payments(paid_at);
CREATE INDEX idx_invoices_school ON invoices(school_id);
CREATE INDEX idx_invoices_student ON invoices(student_id);
CREATE INDEX idx_invoices_status ON invoices(status);
```

---

## 3. RBAC

| Rôle | Créer paiement | Voir paiements | Approuver remboursement | Gérer factures |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ |
| COMPTABLE | ✓ | ✓ | ✗ | ✓ |
| SECRETAIRE | ✗ | ✓ | ✗ | ✗ |
| PARENT | ✗ | ✓ (propres) | ✗ | ✗ |

---

## 4. Money Fusion — Intégration

```typescript
// services/payments/providers/money-fusion.ts
interface MoneyFusionConfig {
  api_key: string;
  secret_key: string;
  merchant_id: string;
  webhook_secret: string;
  base_url: string;
}

interface InitiatePaymentParams {
  amount: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  description: string;
  metadata: Record<string, string>;
}

interface MoneyFusionResponse {
  payment_url: string;
  transaction_id: string;
  status: string;
}
```

---

## 5. Webhook — Validation HMAC

```typescript
// services/payments/webhook-handler.ts
import crypto from 'crypto';

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

async function handleWebhook(event: PaymentWebhookEvent): Promise<void> {
  const payment = await getPaymentByProviderRef(event.transaction_id);
  if (!payment) throw new Error('Payment not found');

  switch (event.status) {
    case 'SUCCESS':
      await updatePaymentStatus(payment.id, 'COMPLETED');
      await updateInvoicePayment(payment.invoice_id, payment.amount);
      await logAudit(payment.school_id, 'PAYMENT_COMPLETED', payment.id);
      break;
    case 'FAILED':
      await updatePaymentStatus(payment.id, 'FAILED');
      await logAudit(payment.school_id, 'PAYMENT_FAILED', payment.id);
      break;
  }
}
```

---

## 6. API Endpoints

```
POST   /api/payments              → Initier un paiement
GET    /api/payments              → Lister les paiements
GET    /api/payments/:id          → Détail d'un paiement
POST   /api/payments/:id/refund   → Demander un remboursement
POST   /api/payments/webhook      → Webhook Money Fusion (pas d'auth)
GET    /api/invoices              → Lister les factures
POST   /api/invoices              → Créer une facture
GET    /api/invoices/:id          → Détail d'une facture
GET    /api/fee-types             → Types de frais
```

---

## 7. Règles métier

1. **Double validation** : Tout paiement est validé côté client ET côté serveur via webhook
2. **Idempotence** : Les webhooks sont traités idempotently via `provider_ref`
3. **Pénalités** : Retard > 30 jours = pénalité automatique configurable
4. **Remboursement** : Uniquement par ADMIN/COMPTABLE, avec justification obligatoire
5. **Audit Log** : Chaque mutation financière génère un audit log immuable

---

## 8. Validation Zod

```typescript
const CreatePaymentSchema = z.object({
  student_id: z.string().uuid(),
  amount: z.number().positive().max(10_000_000),
  currency: z.enum(['XOF', 'EUR', 'USD']),
  payment_method: z.enum([
    'CASH', 'MOBILE_MONEY', 'BANK_TRANSFER', 'CARD', 'CHECK', 'WALLET'
  ]),
  invoice_id: z.string().uuid().optional(),
  description: z.string().max(500).optional(),
});

const RefundSchema = z.object({
  payment_id: z.string().uuid(),
  reason: z.string().min(10).max(500),
  amount: z.number().positive().optional(),
});
```

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
