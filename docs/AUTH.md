# AUTH.md — Architecture Authentification EduCI

## Vue d'ensemble

L'architecture auth repose sur **Supabase Auth** avec gestion cookie via `@supabase/ssr`, un **Repository Pattern** pour l'abstraction des accès données, et une couche **Service** avec séparation des responsabilités.

## Flux d'authentification

```
Page (UI)
  → useAuth() Hook
    → AuthService
      → AuthRepository
        → Supabase Client
          → Supabase Auth API
```

## Composants

### Shared Packages
| Package | Rôle |
|---------|------|
| `@educi/types` | Types `AuthUser`, `AuthSession`, `LoginCredentials`, `AuditEvent` |
| `@educi/errors` | `AuthenticationError`, `InvalidCredentialsError`, `SessionExpiredError`, etc. |
| `@educi/config` | `AUTH` (password policy, session, rate limit, MFA), `AUTH_PERMISSIONS` |
| `@educi/logger` | Logging `logger.audit()`, `logger.security()` |
| `@educi/utils` | `isValidEmail`, `isValidPhone` |

### Web — `src/features/auth/`
```
features/auth/
├── index.ts                    # Barrel export
├── types.ts                    # AuthRepository, SessionRepository, UserRepository, AuditRepository, InvitationRepository
├── validators/
│   ├── index.ts
│   └── schemas.ts              # LoginSchema, RegisterSchema, ForgotPasswordSchema, etc.
├── repositories/
│   ├── index.ts
│   ├── auth.repository.ts      # signIn, signUp, signOut, getSession, refreshSession
│   └── audit.repository.ts     # log, getEvents
├── services/
│   ├── index.ts
│   ├── auth.service.ts         # login, register, logout, changePassword, forgotPassword
│   ├── session.service.ts      # getCurrent, refresh, scheduleProactiveRefresh
│   ├── password.service.ts     # validate, validateOrThrow, getStrength, generate
│   ├── permission.service.ts   # canAccessRoute, canPerformAction, hasMinimumHierarchy
│   ├── token.service.ts        # decodePayload, isExpired, shouldRefresh
│   ├── email-verification.service.ts  # sendVerificationEmail, canResend
│   ├── audit.service.ts        # logLogin, logLogout, logFailedLogin, logPasswordChange
│   └── security.service.ts     # checkLoginAttempts, recordFailedLogin, isLocked
└── hooks/
    ├── index.ts
    └── useAuth.tsx             # AuthProvider, useAuth
```

### Web — `src/middleware/`
```
middleware/
├── index.ts                    # Barrel export
├── csrf.ts                     # checkCSRF
├── route-guard.ts              # isStaticFile, isPublicPath, isProtectedRoute, canAccessRoute
├── security-headers.ts         # getSecurityHeaders, applySecurityHeaders
└── auth.ts                     # getAuthContext, shouldRedirectToVerification, etc.
```

### Mobile — `mobile/features/auth/`
```
features/auth/
├── index.ts                    # Barrel export
├── repositories/
│   ├── index.ts
│   └── auth.repository.ts      # signIn, signOut, refreshSession, getUser
├── services/
│   ├── index.ts
│   ├── secure-storage.ts       # createSecureTokenStorage (SecureStore/localStorage)
│   ├── session.service.ts      # scheduleProactiveRefresh, isExpired
│   └── audit.service.ts        # log
└── hooks/
    ├── index.ts
    └── MobileAuthContext.tsx    # MobileAuthProvider, useMobileAuth
```

## Architecture des erreurs

```
AppError
├── AuthenticationError         (401)
├── AuthorizationError          (403)
├── SessionExpiredError         (401)
├── InvalidCredentialsError     (401)
├── EmailNotVerifiedError       (403)
├── PasswordPolicyError         (400) + violations[]
├── TokenExpiredError           (401)
├── ForbiddenError              (403)
├── AccountLockedError          (423) + lockedUntil
├── TooManyAttemptsError        (429) + retryAfterMs
├── ValidationError             (400)
├── AuthError                   (401)
├── PermissionError             (403)
├── NotFoundError               (404)
├── ConflictError               (409)
├── RateLimitError              (429)
├── PaymentError                (402)
└── MultiTenantError            (403)
```

## Validation Zod

| Schéma | Usage |
|--------|-------|
| `LoginSchema` | identifier + password |
| `RegisterSchema` | email + password + confirmPassword + name |
| `ForgotPasswordSchema` | email |
| `ResetPasswordSchema` | token + newPassword + confirmPassword |
| `ChangePasswordSchema` | currentPassword + newPassword + confirmPassword |
| `VerifyEmailSchema` | token |
| `InvitationSchema` | email + role + schoolId |
| `MFAVerifySchema` | code (6 chiffres) |
| `FirstLoginSchema` | newPassword + confirmPassword + acceptTerms |

## RBAC

13 rôles avec hiérarchie:
```
SUPER_ADMIN (100) > ADMIN (90) > DIRECTEUR (80) > COMPTABLE/SECRETAIRE/CENSEUR (60) > SURVEILLANT (50) > TEACHER/BIBLIOTHECAIRE/INFIRMIER (40) > CHAUFFEUR (30) > PARENT (20) > STUDENT (10)
```

`AUTH_PERMISSIONS` centralise les actions par rôle (MANAGE_SCHOOLS, CREATE_USER, etc.).

## Sécurité

- **DB-first role resolution**: Rôle et school_id toujours lus depuis `public.users`
- **CSRF**: Origin/Host validation sur tous les API routes mutating
- **Security Headers**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Rate Limiting**: 5 tentatives login / 15min, 3 emails / 5min
- **Password Policy**: 8+ chars, majuscule, minuscule, chiffre
- **Account Lockout**: Verrouillage après 5 tentatives, 30min
- **Cookies HttpOnly/Secure/SameSite**: Configuration dans `AUTH.SESSION.COOKIE_OPTIONS`
- **Proactive Token Refresh**: 5 minutes avant expiration
