# Testing — Phase 3.3 Assessment Engine

## Test Framework

- **Unit/Integration**: Vitest (`vitest.config.ts`, `vitest.integration.config.ts`)
- **E2E**: Playwright (`playwright.config.ts`)
- **Location**: `web/tests/` and `web/e2e/`

## Test Files

### Unit Tests

| # | Test File | Covers |
|---|-----------|--------|
| 1 | `assessment-core.test.ts` | Core validators, schemas |
| 2 | `assessment-certification.test.ts` | Certificate creation, validation |
| 3 | `assessment-modules.test.ts` | Competency, national exam schemas |
| 4 | `assessment-research-intl.test.ts` | Research, international schemas |
| 5 | `assessment-ai-question-gen.test.ts` | AI question generation service |
| 6 | `assessment-adaptive-exam.test.ts` | Adaptive exam service |
| 7 | `assessment-automatic-grading.test.ts` | Auto grading service |
| 8 | `assessment-question-pool.test.ts` | Question pool service |
| 9 | `assessment-exam-session.test.ts` | Exam session service |
| 10 | `assessment-exam-attempt.test.ts` | Exam attempt service |

### Integration Tests

| # | Test File | Covers |
|---|-----------|--------|
| 11 | `assessment-certificate.e2e.test.ts` | Certificate CRUD end-to-end |
| 12 | `assessment-portfolio.e2e.test.ts` | Portfolio CRUD end-to-end |
| 13 | `assessment-national-exam.e2e.test.ts` | National exam workflow |
| 14 | `assessment-integrity.e2e.test.ts` | Integrity checks end-to-end |
| 15 | `assessment-research.e2e.test.ts` | Research project workflow |

### E2E Tests (Playwright)

| # | Test File | Covers |
|---|-----------|--------|
| 16 | `assessment-exam-flow.spec.ts` | Full exam taking flow |
| 17 | `assessment-certification-flow.spec.ts` | Certificate issuance flow |
| 18 | `assessment-question-bank.spec.ts` | Question bank management |
| 19 | `assessment-reporting.spec.ts` | Reports and analytics |
| 20 | `assessment-mobile.spec.ts` | Mobile responsiveness |

## Test Coverage Targets

- Services: 90% line coverage
- Validators: 100% schema coverage
- Hooks: 80% component coverage
- API routes: 85% endpoint coverage

## Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## Test Patterns

### Service Test

```typescript
import { describe, it, expect, vi } from 'vitest';
import { Assessment[Entity]Service } from '../services/assessment-[entity].service';

describe('Assessment[Entity]Service', () => {
  it('should get entity by id', async () => { ... });
  it('should throw NotFoundError for missing entity', async () => { ... });
  it('should create entity', async () => { ... });
  it('should update entity', async () => { ... });
  it('should delete entity', async () => { ... });
});
```

### Validator Test

```typescript
import { describe, it, expect } from 'vitest';
import { [entity]CreateSchema } from '../validators/assessment-core';

describe('[entity]CreateSchema', () => {
  it('should validate valid data', () => { ... });
  it('should reject invalid uuid', () => { ... });
  it('should reject empty required fields', () => { ... });
  it('should accept optional fields as undefined', () => { ... });
});
```
