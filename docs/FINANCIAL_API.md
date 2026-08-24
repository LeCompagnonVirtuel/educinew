# FINANCIAL_API.md — API Financière

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

L'API Financière expose tous les endpoints des modules finance de manière cohérente, avec validation Zod, RBAC, rate limiting et journalisation obligatoire.

---

## 2. Architecture API

```
Client → Middleware (Auth, RBAC, Rate Limit) → Route Handler → Service → Repository → Supabase
```

---

## 3. Middlewares

```typescript
// middleware/financial-auth.ts
async function financialAuthMiddleware(req: Request): Promise<RequestContext> {
  // 1. Vérifier JWT
  const token = extractToken(req);
  const user = await verifyJWT(token);

  // 2. Vérifier RBAC
  const allowedRoles = getRequiredRoles(req.method, req.url);
  if (!allowedRoles.includes(user.role)) {
    throw new ForbiddenError('Insufficient permissions');
  }

  // 3. Vérifier school_id
  const schoolId = extractSchoolId(req);
  if (!await userBelongsToSchool(user.id, schoolId)) {
    throw new ForbiddenError('Not a member of this school');
  }

  // 4. Rate limiting
  await checkRateLimit(user.id, getRateLimitConfig(req.url));

  // 5. Logger
  await logAccess(user.id, req.method, req.url);

  return { user, schoolId };
}
```

---

## 4. Schémas de validation

```typescript
// schemas/financial-schemas.ts
import { z } from 'zod';

const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sort_by: z.string().optional(),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

const DateRangeSchema = z.object({
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
});

const SchoolIdSchema = z.object({
  school_id: z.string().uuid(),
});

// Reusable patterns
const AmountSchema = z.number().positive().max(100_000_000);
const CurrencySchema = z.enum(['XOF', 'EUR', 'USD']);
const UUIDSchema = z.string().uuid();
```

---

## 5. Endpoints consolidés

### Finance Générale
```
POST   /api/v1/finance/entries
GET    /api/v1/finance/entries
GET    /api/v1/finance/entries/:id
PATCH  /api/v1/finance/entries/:id
POST   /api/v1/finance/entries/:id/approve
POST   /api/v1/finance/entries/:id/post
GET    /api/v1/finance/trial-balance
GET    /api/v1/finance/income-statement
GET    /api/v1/finance/balance-sheet
```

### Paiements
```
POST   /api/v1/payments
GET    /api/v1/payments
GET    /api/v1/payments/:id
POST   /api/v1/payments/:id/refund
POST   /api/v1/payments/webhook
GET    /api/v1/invoices
POST   /api/v1/invoices
```

### Portefeuilles
```
GET    /api/v1/wallets/balance
POST   /api/v1/wallets/topup
GET    /api/v1/wallets/transactions
POST   /api/v1/wallets/pay
POST   /api/v1/wallets/transfer
```

### Bourses
```
GET    /api/v1/scholarships
POST   /api/v1/scholarships
GET    /api/v1/scholarship-types
POST   /api/v1/scholarship-applications
PATCH  /api/v1/scholarship-applications/:id
```

### Finance Étudiante
```
GET    /api/v1/student-finance/:studentId/summary
POST   /api/v1/student-finance/payment-plans
GET    /api/v1/student-finance/alerts
```

### Intelligence Financière
```
POST   /api/v1/ai/forecast
POST   /api/v1/ai/fraud-detect
POST   /api/v1/ai/chat
GET    /api/v1/intelligence/anomalies
```

---

## 6. Rate Limiting

| Endpoint | Limite | Fenêtre |
|----------|--------|---------|
| Lecture (GET) | 200 requêtes | 1 heure |
| Écriture (POST/PATCH) | 50 requêtes | 1 heure |
| Webhook | 1000 requêtes | 1 heure |
| IA Chat | 30 requêtes | 1 heure |
| Export | 5 requêtes | 1 jour |

---

## 7. Réponses d'erreur

```typescript
// formats/error-response.ts
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    request_id: string;
    timestamp: string;
  };
}

// Codes d'erreur
const ERROR_CODES = {
  VALIDATION_ERROR: 'FIN_001',
  UNAUTHORIZED: 'FIN_002',
  FORBIDDEN: 'FIN_003',
  NOT_FOUND: 'FIN_004',
  DUPLICATE_ENTRY: 'FIN_005',
  INSUFFICIENT_BALANCE: 'FIN_006',
  PERIOD_CLOSED: 'FIN_007',
  ENTRY_NOT_BALANCED: 'FIN_008',
  PAYMENT_FAILED: 'FIN_009',
  RATE_LIMITED: 'FIN_010',
};
```

---

## 8. Documentation

- OpenAPI 3.0 disponible sur `/api/v1/docs`
- Chaque endpoint inclut des examples dans la spec
- SDK TypeScript généré automatiquement

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
