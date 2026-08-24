# Testing Documentation — EduCI Phase 4.0

**Version:** 4.0.0  
**Status:** Active  
**Last Updated:** 2026-08-06

---

## Overview

EduCI follows a comprehensive testing strategy across unit, integration, and end-to-end levels. All code must pass tests before merging.

---

## Testing Pyramid

```
          /\
         /  \        E2E Tests (10%)
        /    \
       /------\      Integration Tests (30%)
      /        \
     /----------\    Unit Tests (60%)
```

---

## Test Frameworks

| Level | Framework | Purpose |
|-------|-----------|---------|
| Unit | Vitest | Component and function tests |
| Integration | Vitest + MSW | API and service tests |
| E2E | Playwright | User flow tests |
| Mobile | Detox | React Native tests |

---

## Unit Testing

### Setup

```typescript
import { describe, it, expect } from 'vitest';

describe('GradeCalculator', () => {
  it('should calculate weighted average', () => {
    const result = calculateWeightedAverage([
      { score: 90, weight: 0.3 },
      { score: 80, weight: 0.7 },
    ]);
    expect(result).toBe(83);
  });
});
```

### Coverage Requirements

| Type | Minimum |
|------|---------|
| Statements | 80% |
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |

### Naming Convention

```typescript
describe('FeatureGroup', () => {
  describe('specificFunction', () => {
    it('should handle expected input', () => {});
    it('should handle edge case', () => {});
    it('should throw on invalid input', () => {});
  });
});
```

---

## Integration Testing

### API Testing

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

describe('Students API', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  it('should create a student', async () => {
    const response = await request(app)
      .post('/api/students')
      .send(studentPayload)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

### Database Testing

```typescript
describe('Student Repository', () => {
  it('should retrieve students by school', async () => {
    const students = await studentRepository.findBySchool(schoolId);
    expect(students).toHaveLength(5);
    expect(students[0]).toHaveProperty('schoolId', schoolId);
  });
});
```

---

## End-to-End Testing

### Playwright Setup

```typescript
import { test, expect } from '@playwright/test';

test('student enrollment flow', async ({ page }) => {
  await page.goto('/dashboard');
  await page.click('[data-testid="students-tab"]');
  await page.click('[data-testid="add-student"]');
  await page.fill('[data-testid="first-name"]', 'John');
  await page.fill('[data-testid="last-name"]', 'Doe');
  await page.click('[data-testid="submit"]');
  
  await expect(page.locator('.success-message')).toBeVisible();
});
```

### Test Scenarios

| Module | Scenarios |
|--------|-----------|
| Auth | Login, logout, password reset |
| Students | CRUD, enrollment, search |
| Teachers | CRUD, assignment, schedule |
| Grades | Entry, calculation, reports |
| Payments | Invoice, payment, receipt |
| Reports | Generation, download |

---

## Mobile Testing

### Detox Configuration

```json
{
  "testRunner": "jest",
  "runnerConfig": "./e2e/jest.config.js",
  "apps": {
    "ios.debug": {
      "type": "ios.app",
      "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/EduCI.app"
    }
  }
}
```

### Mobile Test Scenarios

- Offline functionality
- Push notification handling
- Camera and QR scanning
- GPS location services
- Data sync after reconnect

---

## Test Data Management

### Fixtures

```typescript
export const studentFixture = {
  firstName: 'Test',
  lastName: 'Student',
  dateOfBirth: '2010-01-01',
  schoolId: 'test-school-id',
};
```

### Cleanup

```typescript
afterEach(async () => {
  await cleanupTestData();
});
```

---

## CI/CD Integration

### Pipeline Steps

```yaml
test:
  steps:
    - name: Install dependencies
      run: npm ci
    - name: Type check
      run: npm run typecheck
    - name: Lint
      run: npm run lint
    - name: Unit tests
      run: npm run test:unit
    - name: Integration tests
      run: npm run test:integration
    - name: E2E tests
      run: npm run test:e2e
```

### Quality Gates

| Gate | Requirement |
|------|------------|
| Type check | Zero errors |
| Lint | Zero errors |
| Unit tests | All passing |
| Coverage | >80% |
| E2E tests | All critical flows passing |

---

## Performance Testing

### Load Test Scenarios

```typescript
export const options = {
  scenarios: {
    normal_load: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
    },
    peak_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 0 },
      ],
    },
  },
};
```

---

## Test Reporting

### Reports Generated

- JUnit XML for CI integration
- HTML report for detailed review
- Coverage report with thresholds
- Performance report with trends

---

## Related Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) — Deployment Guide
- [PERFORMANCE.md](PERFORMANCE.md) — Performance Guide
- [SECURITY.md](SECURITY.md) — Security Documentation
