# SECURITY & MULTI-TENANCY AUDIT — Web Sprint 1

**Date** : 2026-08-13
**Auditeur** : Claude (Architecte)
**Scope** : `web/src/app/api/` + `packages/` + `supabase/migrations/`

---

## Executive Summary

L'audit révèle une situation **CRITIQUE** :
- **2458 routes API sans authentification** (53% du total)
- **2712 routes utilisant `SERVICE_ROLE_KEY`** sans auth, bypassant toutes les protections RLS
- **995 routes sans aucune référence à `school_id`** (multi-tenancy absente)
- Le `schoolId` est accepté directement depuis le client sans vérification dans la majorité des routes non-authentifiées

**RISQUE** : Fuite cross-tenant massive. N'importe quel client peut accéder aux données de n'importe quel établissement en fournissant un `schoolId` arbitraire.

---

## 1. API Routes — Statistiques

| Métrique | Valeur | % |
|----------|--------|---|
| **Total routes** | 4656 | 100% |
| Routes avec authentification (`getUser`/`withSupabase`) | 2198 | 47% |
| Routes **SANS authentification** | **2458** | **53%** |
| Routes utilisant `SERVICE_ROLE_KEY` (bypass RLS) | 2712 | 58% |
| Routes avec `withSupabase` (nouveau pattern sécurisé) | 348 | 7.5% |
| Routes avec `createRouteHandlerClient` (ancien pattern auth) | ~1459 | 31% |
| Routes avec Zod/validation | 2078 | 45% |
| Routes avec try/catch | 4320 | 93% |
| Routes avec logger `@educi/logger` | 1459 | 31% |
| Routes avec `console.log` | **0** | 0% |
| Routes avec pagination | 83 | 1.8% |
| Routes avec role/permission check | ~1200* | ~26% |
| Routes avec `as any` | 867 | 19% |
| Routes avec soft delete reference | 352 | 8% |

*Estimé à partir des lignes contenant des checks de rôle.

### Patterns API identifiés

| Pattern | Description | Sécurité |
|---------|-------------|----------|
| **Pattern A** : `withSupabase({ auth: 'user' })` | Nouveau pattern, auth intégrée | BON |
| **Pattern B** : `createRouteHandlerClient` + `getUser` | Ancien pattern, auth manuelle | MOYEN |
| **Pattern C** : `createClient(URL, SERVICE_ROLE_KEY)` + schoolId client | Pas d'auth, bypass RLS | **CRITIQUE** |

---

## 2. Multi-Tenancy — 5 Features Critiques

| Feature | Routes | Auth | Sans auth | SERVICE_ROLE | Risque |
|---------|--------|------|-----------|--------------|--------|
| **eduos** | 414 | 414 | 0 | Variable | FAIBLE |
| **enterprise** | 723 | 7 | 716 | 716 | **CRITIQUE** |
| **integration** | 147 | 0 | **147** | **147** | **CRITIQUE** |
| **intelligence** | 64 | 0 | **64** | **64** | **CRITIQUE** |
| **global-cloud** | 404 | 404 | 0 | Variable | FAIBLE |

### Pattern dangereux confirmé (integration, intelligence, enterprise)

```typescript
// VULNÉRABLE : pas d'auth, SERVICE_ROLE_KEY, schoolId du client non vérifié
export async function GET(request: NextRequest) {
  const supabase = createClient(URL!, SERVICE_ROLE_KEY!);
  const schoolId = searchParams.get('schoolId'); // SPOOFABLE
  const data = await service.list(schoolId);
}
```

**Impact** : N'importe qui peut lire/écrire les données de n'importe quel établissement.

---

## 3. Routes sans school_id

**995 routes** ne mentionnent ni `school_id` ni `schoolId`.

Modules principalement affectés (estimation) :
- `adaptive` (~100 routes) — utilise SERVICE_ROLE + schoolId client
- `assessment` (~50 routes)
- `digital-twin`
- `financial-compliance`
- `financial-intelligence`
- `financial-risk`
- `geaesip`, `gecirap`, `gedkin`, `gegin`
- `gov`, `government-finance`
- `health-ai`
- `interoperability`
- `labor-market`
- `lifelong-learning`
- `lxp`
- `workforce`, `workforce-ai`

---

## 4. RBAC

### Mécanismes existants

1. **`@educi/config`** : Permissions déclaratives par module (STUDENT_PERMISSIONS, TEACHER_PERMISSIONS, FINANCE_PERMISSIONS, etc.)
2. **`web/src/lib/roles.ts`** : Hiérarchie de rôles
3. **Pattern dans routes** : Vérification manuelle `if (!['ADMIN', 'SUPER_ADMIN'].includes(role))`
4. **Middleware** : RBAC page-level uniquement (pas API-level)

### Problème

- Pas de middleware centralisé API-level pour RBAC
- Chaque route implémente sa propre logique de permission
- Les 2458 routes sans auth n'ont évidemment aucun RBAC

---

## 5. Validation (Zod)

### Existant

- `web/src/lib/api/validation.ts` : Schemas de base (grade, attendance, payment, student, staff, etc.)
- 52 fichiers validators/schemas dans `web/src/features/`
- 2078 routes avec une forme de validation

### Problème

- **2578 routes sans validation** (55%)
- Le helper `validateSchoolId()` (lib) lit simplement le query param sans vérification d'autorisation
- school_id dans les schemas est `nullable().optional()` — il ne protège pas

---

## 6. Type Safety

| Issue | Count |
|-------|-------|
| `@ts-nocheck` | **1** (`web/src/lib/api/index.ts`) |
| `@ts-ignore` | 0 |
| `@ts-expect-error` | 0 |
| `as any` dans routes API | **867** |

Le fichier `web/src/lib/api/index.ts` est un barrel d'exports client-side marqué `@ts-nocheck` — il est utilisé côté frontend (pas API routes) mais reste un problème de type safety.

---

## 7. Security Headers

### vercel.json (Production) — COMPLET

| Header | Valeur | Status |
|--------|--------|--------|
| X-Frame-Options | DENY | OK |
| X-Content-Type-Options | nosniff | OK |
| Referrer-Policy | strict-origin-when-cross-origin | OK |
| Content-Security-Policy | Présente (avec unsafe-inline pour scripts) | ACCEPTABLE |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | OK |
| X-XSS-Protection | 1; mode=block | OK |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | OK |
| Cross-Origin-Opener-Policy | ABSENT | MANQUANT |
| Cross-Origin-Resource-Policy | ABSENT | MANQUANT |

### middleware.ts (Runtime)

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- **HSTS manquant dans middleware**
- **Permissions-Policy manquant dans middleware**

### CSP

`unsafe-inline` pour scripts (Google Maps) — documenté et justifié.

---

## 8. RLS (Row Level Security)

### Migrations identifiées

- `20250101000002_rls_policies.sql` : Policies de base (47 tables)
- `20260702000001_multi_tenant_security_hardening.sql`
- `20260706113123_security_fixes_webhooks_and_rls.sql`
- `20260707120000_fix_rls_policies_enterprise.sql`
- `20260712000000_security_hardening.sql`
- `20260715010000_comprehensive_security_fixes.sql`
- `20260715020000_security_hardening_final.sql`
- `20260716020000_fix_service_role_rls_bypass.sql`

### Fonctions helper RLS

```sql
get_user_school_id() -- Retourne school_id de l'utilisateur courant
get_user_role()      -- Retourne le rôle
is_super_admin()     -- Check SUPER_ADMIN
```

### Problème CRITIQUE

Les RLS sont bien configurées pour les requêtes authentifiées (anon key + auth session). MAIS :

**2712 routes utilisent `SERVICE_ROLE_KEY`** qui **bypass toutes les policies RLS**.

Les RLS deviennent donc **inutiles** pour plus de la moitié de l'API car le service role n'est pas soumis aux policies.

---

## 9. Rate Limiting

### Existant

- `otp_rate_limits` table (DB-level pour OTP/email)
- `@educi/config` : Constantes de rate limiting définies
- **Aucun middleware de rate limiting API global**
- Pas de rate limiter au niveau des routes

### Risque

- Login brute force non protégé au niveau API
- Endpoints IA sans limitation
- Aucune protection DDoS au niveau application

---

## 10. Audit Logging

### Existant

- `@educi/logger` package avec niveaux: debug, info, warn, error, audit, security
- Table `audit_logs` en BDD avec RLS
- 1459 routes utilisent le logger

### Problème

- Logger non utilisé dans 3197 routes (69%)
- Pas de corrélation request/ID systématique
- Pas d'audit automatique des opérations sensibles dans la majorité des routes

---

## 11. Soft Delete

- 352 routes référencent `deleted_at` ou soft delete
- Pas de standard uniforme — chaque module gère différemment

---

## 12. Tests

| Type | Count |
|------|-------|
| Test files total (.test.ts + .spec.ts) | **1783** |
| E2E tests (web/e2e/) | 3 |
| Security tests (tests/security/) | **0** |
| Test directory racine | Vide (README only) |

**Aucun test de sécurité** : pas de tests IDOR, pas de tests cross-tenant, pas de tests RBAC.

---

## 13. Score Initial (Baseline)

| Domaine | Score | Max | % |
|---------|-------|-----|---|
| Authentication | 3 | 10 | 30% |
| RBAC | 2 | 10 | 20% |
| ABAC | 1 | 10 | 10% |
| Multi-tenancy | 2 | 15 | 13% |
| RLS | 6 | 10 | 60% |
| API Validation | 4 | 10 | 40% |
| Type Safety | 7 | 10 | 70% |
| Security Headers | 8 | 5 | 80% (4/5) |
| Audit Logging | 3 | 5 | 60% |
| Error Handling | 4 | 5 | 80% |
| Security Testing | 0 | 10 | 0% |
| Documentation | 3 | 5 | 60% |

**TOTAL : 43/100**

---

## 14. Vulnérabilités CRITIQUES

### CRIT-1 : Service Role Key sans authentification (2712 routes)

**Impact** : Accès complet aux données de tous les tenants
**Vecteur** : Appel API direct avec schoolId arbitraire
**Probabilité** : Exploitation triviale

### CRIT-2 : schoolId accepté du client sans validation (995+ routes)

**Impact** : Fuite cross-tenant
**Vecteur** : Modification du paramètre schoolId dans les requêtes
**Probabilité** : Exploitation triviale

### CRIT-3 : Modules entiers sans auth (integration: 147, intelligence: 64, enterprise: 716)

**Impact** : Données accessibles publiquement
**Vecteur** : Accès direct aux endpoints
**Probabilité** : Exploitation immédiate

### CRIT-4 : Aucun rate limiting global sur l'API

**Impact** : DDoS, brute force, enumeration
**Vecteur** : Requêtes massives
**Probabilité** : Moyenne

### CRIT-5 : Aucun test de sécurité

**Impact** : Régressions invisibles
**Vecteur** : Modifications futures
**Probabilité** : Certaine

---

## 15. Infrastructure existante réutilisable

| Composant | Chemin | Status |
|-----------|--------|--------|
| Logger | `packages/logger/` | Fonctionnel |
| Config/Permissions | `packages/config/` | Complet |
| Auth helper (client) | `web/src/lib/api/secure.ts` | Client-only |
| Supabase server client | `web/src/lib/supabase/server.ts` | Fonctionnel |
| Zod schemas | `web/src/lib/api/validation.ts` | Partiel |
| Role hierarchy | `web/src/lib/roles.ts` | Complet |
| Middleware | `web/src/middleware.ts` | Page-level only |
| RLS functions | `supabase/migrations/` | Fonctionnel |
| Validators (features) | `web/src/features/*/validators/` | Partiel (52 fichiers) |

---

## 16. Recommandations prioritaires

### P0 — IMMÉDIAT (bloquant)

1. Créer un middleware/helper API centralisé `requireAuth()` côté serveur
2. Supprimer l'usage de `SERVICE_ROLE_KEY` dans les routes API publiques
3. Valider `schoolId` contre le contexte auth serveur (jamais confiance client)
4. Protéger les modules `integration`, `intelligence`, et `enterprise` (927 routes)

### P1 — URGENT

5. Standardiser le pattern API (converger vers `withSupabase` ou helper centralisé)
6. Ajouter RBAC centralisé (`requireRole()`)
7. Supprimer `@ts-nocheck` de `web/src/lib/api/index.ts`
8. Créer tests de sécurité (IDOR, cross-tenant, auth)

### P2 — IMPORTANT

9. Ajouter rate limiting global
10. Compléter validation Zod sur les routes manquantes
11. Ajouter COOP/CORP headers
12. Standardiser soft delete

---

## 17. Baseline Tests

| Métrique | Valeur |
|----------|--------|
| Test files | 1783 |
| Security tests | 0 |
| E2E tests | 3 |
| Tests directory structure | Non organisé pour security |

**Note** : Le test baseline complet (passed/failed/skipped) sera établi après exécution de la suite de tests.

---

## Conclusion

**DECISION : NO-GO**

Le projet présente des vulnérabilités cross-tenant critiques qui permettent l'accès non autorisé aux données de n'importe quel établissement. Le score de 43/100 est largement sous le minimum requis de 90/100.

Les corrections P0 sont absolument nécessaires avant toute mise en production ou continuation du développement fonctionnel.
