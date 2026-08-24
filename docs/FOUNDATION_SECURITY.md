# FOUNDATION SECURITY — EduCI Enterprise

## Security Audit Report

Date: 2026-08-10
Score: **58/100**

---

## CRITICAL Vulnerabilities

### 1. Payment Webhook — No HMAC Validation
**File:** `web/src/app/api/payments/webhook/money-fusion/route.ts`
**Risk:** Any attacker knowing a transaction reference can forge payment completions.
**Fix:** Implement HMAC-SHA256 signature verification on all incoming webhook payloads.

### 2. Multi-tenant Data Leaks via RLS
**Tables:** `exams`, `quizzes`, `exam_categories`
**Risk:** SELECT policies are `USING(true)` — all authenticated users can read all data regardless of school.
**Fix:** Add school_id scoping via JOIN or direct column check.

### 3. Conversation Search Without School Isolation
**File:** `web/src/app/api/conversations/[id]/search/route.ts`
**Risk:** Users can search messages in any conversation by guessing IDs.
**Fix:** Verify conversation belongs to user's school before returning results.

---

## HIGH Vulnerabilities

### 4. PostgREST Filter Injection
**Pattern:** `.or(\`first_name.ilike.%${query}%\`)`
**Risk:** Special PostgREST operators in user input could break filter syntax.
**Fix:** Sanitize search input before interpolation into .or() filters.

### 5. File Upload Extension Vulnerability
**File:** `web/src/app/api/students/[id]/photo/route.ts`
**Risk:** Extension derived from user filename could enable path traversal.
**Fix:** Use MIME-to-extension mapping (as done in logo upload route).

### 6. Rate Limiting Coverage: 0.8%
**Stat:** Only 3/398 routes have rate limiting.
**Fix:** Apply rate limiting to all mutation endpoints and auth-related routes.

---

## MEDIUM Vulnerabilities

### 7. login_history INSERT policy — `WITH CHECK (true)`
Any authenticated user can insert arbitrary login records.

### 8. No Content-Type validation on webhook
The webhook parses JSON without verifying Content-Type header.

### 9. Inconsistent RLS patterns
Newest tables use `current_setting('app.current_school_id')` while older tables use `get_user_school_id()`. Inconsistency creates maintenance risk.

### 10. 86 console.log + 156 console.error in production
Information leakage via browser console in production builds.

---

## Security Strengths

- Supabase Auth with JWT + refresh tokens
- Security headers (HSTS, CSP, X-Frame-Options, Permissions-Policy)
- CSRF protection via Origin-based validation
- No raw SQL queries (Supabase client parameterizes)
- No secrets in client-side code
- Service role key restricted to server-side
- Role escalation prevented in users_update policy
- XSS protected (no unescaped user content)

---

## Scoring Breakdown

| Category | Score | Max |
|----------|-------|-----|
| Authentication | 14 | 15 |
| RBAC | 10 | 15 |
| CSRF Protection | 8 | 10 |
| Security Headers | 9 | 10 |
| Input Validation | 7 | 10 |
| Rate Limiting | 4 | 10 |
| Webhook Security | 1 | 10 |
| File Upload | 4 | 5 |
| Secrets Management | 5 | 5 |
| XSS Prevention | 5 | 5 |
| SQL Injection | 5 | 5 |
| **TOTAL** | **58** | **100** |
