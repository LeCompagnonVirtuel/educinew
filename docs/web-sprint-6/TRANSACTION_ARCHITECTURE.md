# Transaction Architecture — Sprint 6

## Why RPC Functions

Supabase JS client does NOT support client-side transactions.
All atomic multi-table operations MUST use PostgreSQL RPC functions.

## Functions Created

### confirm_payment_atomic(p_payment_id UUID, p_school_id UUID)

Purpose: Atomically confirm a payment and update the linked invoice.

Flow:
1. SELECT ... FROM payments WHERE id = p_payment_id AND school_id = p_school_id FOR UPDATE
2. Validate payment status = 'pending'
3. UPDATE payments SET status = 'completed', confirmed_at = NOW()
4. UPDATE invoices SET paid_amount = paid_amount + amount, status = CASE ...
5. RETURN payment record

Guarantees:
- Row-level lock prevents double-confirm
- Invoice paid_amount never exceeds total_amount
- Status transitions are validated (pending → completed only)

### soft_delete_student_atomic(p_student_id UUID, p_school_id UUID)

Purpose: Soft-delete a student and deactivate their user account atomically.

Flow:
1. SELECT ... FROM students WHERE id = p_student_id AND school_id = p_school_id FOR UPDATE
2. Validate not already deleted
3. UPDATE students SET deleted_at = NOW(), status = 'inactive'
4. UPDATE users SET is_active = false WHERE id = student.user_id
5. RETURN student record

### restore_student_atomic(p_student_id UUID, p_school_id UUID)

Purpose: Restore a soft-deleted student and reactivate their user account.

Flow:
1. SELECT ... FROM students WHERE deleted_at IS NOT NULL FOR UPDATE
2. UPDATE students SET deleted_at = NULL, status = 'active'
3. UPDATE users SET is_active = true WHERE id = student.user_id
4. RETURN student record

### create_invoice_with_items(p_invoice JSONB, p_items JSONB, p_school_id UUID)

Purpose: Create an invoice with all its line items atomically.

Flow:
1. INSERT INTO invoices (school_id, student_id, total_amount, ...)
2. FOR EACH item IN p_items: INSERT INTO invoice_items (invoice_id, ...)
3. RETURN invoice record

Guarantees:
- No orphaned items if invoice insert fails
- No invoice without items

## Security Properties

All functions use:
- `SECURITY DEFINER` — runs with function owner's privileges
- `SET search_path = public` — prevents search_path injection
- `FOR UPDATE` — row-level locking for race condition prevention
- `RAISE EXCEPTION` — explicit error on invalid state transitions

## Usage from Application

```typescript
const { data, error } = await ctx.supabase.rpc('confirm_payment_atomic', {
  p_payment_id: paymentId,
  p_school_id: ctx.schoolId,
});
```
