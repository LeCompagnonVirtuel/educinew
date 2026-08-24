# AI Dynamic Routes Audit

## Summary

- **Total AI routes**: 217
- **Dynamic configuration**: 217/217 have `export const dynamic = 'force-dynamic'`
- **Authentication**: All use `createClient` with `SERVICE_ROLE_KEY` for server-side access
- **Violations**: 0

## Analysis Matrix

| Criterion | AI Routes (217) | Justification |
|-----------|----------------|---------------|
| Uses cookies/headers | Yes | Auth token extraction |
| Uses Supabase auth | Yes | Service role access |
| Uses runtime data | Yes | AI model API calls |
| Uses secrets | Yes | `SERVICE_ROLE_KEY`, AI API keys |
| Static possible | **No** | Requires runtime context |
| Dynamic required | **Yes** | All criteria met |

## Configuration Applied

```typescript
export const dynamic = 'force-dynamic';
```

Applied at the top of every route file, before imports.

## Rationale

All 217 AI routes:
1. Call external AI services (DeepSeek, Gemini) via Edge Functions
2. Require authenticated Supabase access with `SERVICE_ROLE_KEY`
3. Process user-specific data at runtime
4. Cannot produce meaningful static output

## Total API Routes (4,656)

All 4,656 API routes received `export const dynamic = 'force-dynamic'` because:
- All use `withTenant`/`withRole`/`withAuth` or `createClient`
- All require request-time authentication (cookies/headers)
- None can produce static output
- Next.js App Router API routes are inherently dynamic

## Security Verification

- 0 `SERVICE_ROLE_KEY` exposed in client code
- 0 secrets in route source files
- 0 `process.env` values exposed to client
- All sensitive operations are server-only
