# Architecture EduCI — Monorepo Enterprise

## Structure du projet

```
EduCI/
├── packages/                   # Packages partagés (@educi/*)
│   ├── types/                  # Source de vérité types TypeScript
│   │   └── src/index.ts        # Enums + Interfaces
│   ├── errors/                 # Hiérarchie d'erreurs standardisée
│   │   └── src/index.ts        # AppError, ValidationError, etc.
│   ├── logger/                 # Logger centralisé (interdit console.log)
│   │   └── src/index.ts        # logger.info/warn/error/audit/security
│   ├── config/                 # Configuration centralisée
│   │   └── src/
│   │       ├── index.ts        # Constantes, rôles, app config
│   │       ├── routes.ts       # Routes publiques
│   │       └── permissions.ts  # RBAC matrice routes par rôle
│   └── utils/                  # Utilitaires partagés (formatting, validation)
│       └── src/index.ts
│
├── web/                        # Application Next.js 14
│   ├── src/
│   │   ├── app/               # Pages (App Router)
│   │   │   ├── api/           # API Routes (35 endpoints)
│   │   │   └── [module]/      # Pages par module
│   │   ├── components/        # Composants React
│   │   │   ├── ui/            # Composants génériques
│   │   │   ├── layout/        # Shell application
│   │   │   ├── auth/          # Composants authentification
│   │   │   ├── settings/      # Panneaux paramètres
│   │   │   └── onboarding/    # Wizard inscription
│   │   ├── hooks/             # Hooks personnalisés
│   │   ├── lib/               # Logique métier
│   │   │   ├── api/           # Wrappers API facade
│   │   │   │   └── domains/   # Services domaine (DDD)
│   │   │   ├── payments/      # Orchestrateur Money Fusion
│   │   │   ├── supabase/      # Clients Supabase
│   │   │   └── realtime/      # Gestionnaire temps réel
│   │   └── types/             # Re-export @educi/types
│   ├── tests/                 # Tests Vitest
│   ├── e2e/                   # Tests Playwright
│   └── public/                # Assets statiques
│
├── mobile/                    # Application Expo/React Native
│   ├── app/
│   │   ├── screens/           # 40 écrans
│   │   ├── tabs/              # 18 onglets
│   │   ├── context/           # Auth, Child, Language
│   │   ├── hooks/             # Notifications, Realtime, RoleGuard
│   │   └── navigation.tsx     # Navigateur par rôle
│   ├── components/            # Composants mobile
│   └── services/              # Services API mobile
│
├── supabase/                  # Backend Supabase
│   ├── migrations/            # Migrations SQL (30+)
│   └── seed.sql               # Données de démo
│
├── docs/                      # Documentation projet
├── scripts/                   # Scripts utilitaires
├── tests/                     # Structure tests standardisée
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── fixtures/
│   └── mocks/
│
├── package.json               # Monorepo workspaces
└── tsconfig.json              # TypeScript project references
```

## Architecture applicative

```
Page (UI)
  ↓
Hook (état + effets)
  ↓
Service wrapper (lib/api/*.ts)
  ↓
Domain service (lib/api/domains/*.service.ts)
  ↓
Supabase Client (avec school_id auto)
  ↓
PostgreSQL + RLS
```

## Packages partagés

| Package | Import | Rôle |
|---------|--------|------|
| `@educi/types` | Types/interfaces | Source unique de vérité |
| `@educi/errors` | Erreurs métier | Hiérarchie standardisée |
| `@educi/logger` | Logging | Remplace console.log |
| `@educi/config` | Configuration | Constantes, rôles, routes |
| `@educi/utils` | Utilitaires | Format, validation, helpers |

## Conventions d'import

```typescript
// Packages partagés
import { User, Role } from '@educi/types';
import { AppError, ValidationError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ROLE_DASHBOARDS, PAYMENT_GATEWAY } from '@educi/config';
import { formatCurrency, getInitials } from '@educi/utils';

// Web interne
import { useAuth } from '@/hooks/useAuth';
import { sbStudents } from '@/lib/api/domains/students.service';
import { Button } from '@/components/ui';
```

## Multi-tenant

Toute requête DOIT inclure `school_id` :
- Côté service : `getAuthenticatedSchoolId()` depuis `@/lib/api/secure`
- Côté DB : RLS via `get_user_school_id()`
- Jamais de trust sur `user_metadata` (client-writable)
