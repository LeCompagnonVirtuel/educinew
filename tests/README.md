# Tests EduCI

Structure standardisée des tests.

## Organisation

```
tests/
├── unit/          — Tests unitaires (services, utils, validators)
├── integration/   — Tests d'intégration (API routes, DB)
├── e2e/           — Tests end-to-end (Playwright)
├── fixtures/      — Données de test réutilisables
└── mocks/         — Mocks partagés (Supabase, services)
```

## Conventions

- Un fichier de test par module/service
- Nommage : `{module}.test.ts` (unit), `{module}.integration.test.ts`, `{module}.spec.ts` (e2e)
- Fixtures nommées par entité : `students.fixture.ts`, `payments.fixture.ts`
- Mocks nommés par service : `supabase.mock.ts`, `money-fusion.mock.ts`

## Exécution

```bash
# Unit tests
cd web && npm run test

# E2E tests
cd web && npm run test:e2e
```
