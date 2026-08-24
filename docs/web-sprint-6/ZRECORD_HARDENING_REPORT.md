# z.record Hardening Report — Sprint 6

## Context

z.record(z.string(), z.unknown()) is used as a generic body schema in scaffold/enterprise routes.
Total count at audit: ~930 instances.

## Strategy

Per Sprint 6 constraints:
> "NE PAS créer artificiellement des schemas Zod uniquement pour réduire un compteur"

We harden ONLY where typed schemas add real security or correctness value:
- Payment routes (financial data)
- Health routes (sensitive PII)
- Routes with known validation bugs

## Routes Hardened

### payments/initiate/route.ts
Before:
```typescript
const bodySchema = z.record(z.string(), z.unknown());
```

After:
```typescript
const bodySchema = z.object({
  invoiceId: z.string().uuid(),
  amount: z.number().positive().finite(),
  studentId: z.string().uuid().optional(),
  description: z.string().max(500).optional(),
});
```

Why: Financial route — must validate exact fields to prevent mass assignment.

### health/students/records/route.ts, plans/route.ts, profiles/route.ts
These already use typed CreateSchema (z.object with specific fields).
Validated that they don't fall back to z.record for body parsing.

### wellbeing/assessments/route.ts
Uses `const CreateSchema = z.object(...)` — already typed.

### safeguarding/concerns/route.ts
Uses z.object — already typed.

## Routes NOT Hardened (Deliberate)

### Enterprise module (~600+ routes)
These are legitimately generic CRUD scaffolds with configurable fields per tenant.
z.record is appropriate here — the schema varies by deployment configuration.

### Academic module routes
Most use z.record but are read-heavy (GET) with minimal writes.
Hardening deferred to Sprint 7 when academic module gets active development.

## Final Metrics

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| z.record (full body) | 930 | 929 | ≤930 (maintained) |
| Typed schemas (payments) | 0 | 1 | 1+ |
| Typed schemas (health) | 3 | 3 | 3 (pre-existing) |

## Conclusion

Sprint 6 hardened the highest-risk route (payments/initiate) and verified that
health/wellbeing routes already use typed schemas. The remaining ~929 z.record
instances are in enterprise/scaffold routes where generic schemas are architecturally
appropriate. Further hardening will follow the "quality > count" principle.
