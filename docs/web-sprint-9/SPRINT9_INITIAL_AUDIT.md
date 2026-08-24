# Sprint 9 — Initial Audit Report

## Date: 2026-08-20

## Build Status (Before Sprint 9)

- `next build`: **FAIL** (Exit code 1)
- Error: "Failed to collect page data" during static generation
- Root causes identified:
  1. **135 routes** with undefined schema variable references (e.g., `AcademicFiltersSchema`)
  2. **6 validator files** using Zod `.ip()` method not available in Zod 4.4.3
  3. **1 validator file** (`ep-open-production.ts`) missing `import { z } from 'zod'`
  4. **1 schema ordering issue** (`pollOptionSchema` used before declaration in LXP validators)
  5. **20 geaesip repositories** importing `supabase` from `@educi/config` (not exported)
  6. **55 error classes** missing from `@educi/errors` package
  7. **21 duplicate error classes** between `phase4-aeip.ts` and `phase4-3-gei2p.ts`
  8. **2 duplicate config exports** (`SECURITY_CONFIG`, `NOTIFICATION_CONFIG`)
  9. **Custom error pages** (`/_error: /404`, `/_error: /500`) failing with styled-jsx context issue

## AI Routes Audit (217 routes)

All 217 AI routes:
- Use `createClient` with `SERVICE_ROLE_KEY` for server-side Supabase access
- Process data at runtime (authentication, user context, AI model calls)
- Cannot be statically generated
- Require `export const dynamic = 'force-dynamic'`

## API Routes Total: 4,656

- All use `withTenant`, `withRole`, `withSuperAdmin`, or `createClient`
- All require runtime request context (cookies, headers, auth)
- None can be statically generated
- All require `export const dynamic = 'force-dynamic'`

## Test Status (Before Fixes)

- Sprint 3-8 tests: 12 failures (SERVICE_ROLE_KEY allowlist, as any count)
- Sprint 9 tests: Not yet created

## Security Status

- CRITICAL: 0
- HIGH: 0
- @ts-nocheck: 0
- @ts-ignore: 0
- as any (API): 0
- console.log (API): 0
- Secrets exposed: 0
