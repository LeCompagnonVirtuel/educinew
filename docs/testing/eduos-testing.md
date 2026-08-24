# EduOS Phase 3.4 — Tests

> Version : 3.4.0 | Vitest + Playwright + Detox

---

## 1. Stratégie de test

### Niveaux

| Niveau | Outil | Couverture cible |
|--------|-------|------------------|
| Unitaire | Vitest | 80% |
| Intégration | Vitest | 70% |
| E2E Web | Playwright | Flux principaux |
| E2E Mobile | Detox | Flux principaux |
| Performance | k6 | Load testing |

---

## 2. Structure des tests

```
tests/
├── unit/
│   ├── services/
│   ├── hooks/
│   └── utils/
├── integration/
│   ├── api/
│   └── database/
├── e2e/
│   ├── web/
│   └── mobile/
└── fixtures/
```

---

## 3. Tests par module

### Core Runtime

```typescript
// unit/services/core-runtime.test.ts
describe('EduOS Module Management', () => {
  it('should create module with valid config')
  it('should reject module with circular dependencies')
  it('should enforce max modules limit')
  it('should validate plugin signatures')
})
```

### Workflow Automation

```typescript
// integration/workflow.test.ts
describe('Workflow Execution', () => {
  it('should execute simple workflow end-to-end')
  it('should handle step failure with retry')
  it('should respect timeout limits')
  it('should support parallel execution')
})
```

### Digital Identity Wallet

```typescript
// unit/wallet.test.ts
describe('Identity Wallet', () => {
  it('should create wallet with DID')
  it('should issue verifiable credential')
  it('should verify credential offline')
  it('should revoke credential')
  it('should enforce biometric confidence threshold')
})
```

### Educational Wallet

```typescript
// integration/wallet-transactions.test.ts
describe('Educational Wallet', () => {
  it('should credit wallet correctly')
  it('should debit with sufficient balance')
  it('should reject debit with insufficient balance')
  it('should enforce daily transaction limits')
  it('should detect fraudulent transactions')
})
```

### Marketplace

```typescript
// e2e/marketplace.test.ts
describe('Marketplace Flow', () => {
  it('should browse and search products')
  it('should add to cart and checkout')
  it('should process payment')
  it('should track order status')
})
```

---

## 4. Données de test

### Fixtures

```typescript
// fixtures/school.ts
export const testSchool = {
  id: 'test-school-001',
  name: 'École Test EduCI',
  country: 'CI',
  currency: 'XOF',
}

// fixtures/user.ts
export const testAdmin = {
  id: 'test-admin-001',
  email: 'admin@test.educi.com',
  role: 'ADMIN',
  school_id: 'test-school-001',
}
```

### Mocking

- Supabase: Mock complet des opérations BDD
- External APIs: MSW (Mock Service Worker)
- Time: Fake timers pour les schedules
- Random: Seed fixe pour la reproductibilité

---

## 5. CI/CD Integration

### Pipeline

```yaml
# .github/workflows/test.yml
stages:
  - lint
  - typecheck
  - unit-tests
  - integration-tests
  - e2e-web
  - e2e-mobile
  - coverage-report
```

### Seuils de couverture

| Métrique | Minimum |
|----------|---------|
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |
| Statements | 80% |

---

## 6. Exécution

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E Web
npm run test:e2e:web

# E2E Mobile
npm run test:e2e:mobile

# Coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 7. Qualité requise (Definition of Done)

- [ ] Fonctionnelle
- [ ] Testée (unit + integration)
- [ ] Responsive
- [ ] Sécurisée
- [ ] Typée (TypeScript strict)
- [ ] Sans erreur TypeScript
- [ ] Sans erreur ESLint
- [ ] Sans dette technique

---

## 8. Voir aussi

- [Guide de testing](../12_TESTING_GUIDE.md)
- [Foundation Tests](../FOUNDATION_TESTS.md)
- [Documentation principale](../phase3-4-eduos.md)
