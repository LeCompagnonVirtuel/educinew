# Configuration — Phase 3.1 Intelligence

## Variables d'environnement

### Obligatoires

| Variable | Description | Valeur |
|----------|-------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role (côté serveur) | `eyJ...` |
| `NEXT_PUBLIC_APP_URL` | URL de l'application | `https://your-domain.com` |
| `NODE_ENV` | Environnement | `production` \| `development` |

### Optionnelles (Intelligence)

| Variable | Description | Défaut |
|----------|-------------|--------|
| `AI_MODEL_ENDPOINT` | Endpoint du modèle IA | — |
| `AI_API_KEY` | Clé API IA | — |
| `SENTRY_DSN` | DSN Sentry pour monitoring | — |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN Sentry côté client | — |

## Configuration Supabase

### Client côté client

```typescript
// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export function createClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### Client côté serveur (API routes)

```typescript
// Dans les API routes
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

## Configuration Next.js

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};
```

## Configuration TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@educi/types": ["../packages/types/src"],
      "@educi/errors": ["../packages/errors/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Configuration ESLint

```json
// .eslintrc.json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

## Configuration Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@educi/types': path.resolve(__dirname, '../packages/types/src'),
      '@educi/errors': path.resolve(__dirname, '../packages/errors/src'),
    },
  },
});
```

## Configuration Playwright

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
```

## Configuration Sentry

```javascript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

## Permissions RLS (Row Level Security)

```sql
-- Politique pour les tables Intelligence
CREATE POLICY "School isolation" ON intelligence_engines
  FOR ALL USING (school_id = auth.uid()::text::uuid);

-- Politique similaire pour toutes les tables intelligence_*
-- Chaque école ne voit que ses propres données
```

## Structure des dossiers

```
src/
├── app/
│   └── api/
│       └── intelligence/     # 32 dossiers d'entités
├── features/
│   └── intelligence/
│       ├── hooks/            # 64 hooks
│       ├── repositories/     # 1 repository
│       ├── services/         # 32 services
│       ├── validators/       # 3 validateurs
│       └── types.ts          # Types réexportés
├── lib/
│   └── supabase/             # Clients Supabase
└── types/                    # Types partagés
```

## Environnements

| Environnement | URL | Branche |
|---------------|-----|---------|
| Développement | `localhost:3000` | `main` |
| Preview | `*.vercel.app` | PR branches |
| Production | `your-domain.com` | `main` |
