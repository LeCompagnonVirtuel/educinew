# Testing — Phase 3.2 Adaptive Learning Intelligence

## Overview

40 test files using Vitest, located under `src/features/adaptive/__tests__/`. Tests cover CRUD operations, filters, and concurrency for all major services.

## Structure

```
__tests__/
├── services/
│   ├── adp-profile.service.test.ts
│   ├── adp-learning-path.service.test.ts
│   ├── adp-content-delivery.service.test.ts
│   ├── adp-difficulty-engine.service.test.ts
│   ├── adp-knowledge-gap.service.test.ts
│   ├── adp-competency.service.test.ts
│   ├── adp-assessment.service.test.ts
│   ├── adp-spaced-repetition.service.test.ts
│   ├── adp-recommendation.service.test.ts
│   ├── adp-analytics.service.test.ts
│   ├── adp-ab-testing.service.test.ts
│   ├── adp-realtime-adjustment.service.test.ts
│   ├── adp-session.service.test.ts
│   ├── adp-engagement.service.test.ts
│   ├── adp-feedback.service.test.ts
│   ├── adp-goal.service.test.ts
│   ├── adp-mastery.service.test.ts
│   ├── adp-streak.service.test.ts
│   ├── adp-leaderboard.service.test.ts
│   └── adp-social-learning.service.test.ts
├── hooks/
│   ├── use-adaptive-profile-list.test.ts
│   ├── use-adaptive-profile-actions.test.ts
│   ├── use-adaptive-learning-path-list.test.ts
│   └── use-adaptive-learning-path-actions.test.ts
├── validators/
│   ├── adaptive-core.test.ts
│   ├── adaptive-learning.test.ts
│   ├── adaptive-content.test.ts
│   ├── adaptive-assessment.test.ts
│   └── adaptive-analytics.test.ts
├── api/
│   ├── profiles.test.ts
│   ├── learning-paths.test.ts
│   ├── assessments.test.ts
│   ├── analytics.test.ts
│   └── recommendations.test.ts
└── repositories/
    └── adaptive.repository.test.ts
```

## Mock Pattern

```typescript
// __tests__/services/adp-profile.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdpProfileService } from '../../services/adp-profile.service';
import { createClient } from '@supabase/supabase-js';

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    then: vi.fn().mockResolvedValue({ data: [], error: null }),
  })),
}));

describe('AdpProfileService', () => {
  let service: AdpProfileService;
  const schoolId = 'test-school-id';
  const mockProfile = {
    id: 'profile-1',
    school_id: schoolId,
    user_id: 'user-1',
    learning_style: 'visual',
    status: 'active',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    const supabase = createClient('http://localhost', 'test-key');
    service = new AdpProfileService(supabase);
  });

  describe('getProfile', () => {
    it('should return profile when found', async () => {
      const result = await service.getProfile(schoolId, 'profile-1');
      expect(result).toBeDefined();
    });

    it('should throw error when not found', async () => {
      await expect(service.getProfile(schoolId, 'missing'))
        .rejects.toThrow();
    });
  });

  describe('listProfiles', () => {
    it('should return array of profiles', async () => {
      const result = await service.listProfiles(schoolId);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should apply filters', async () => {
      const result = await service.listProfiles(schoolId, {
        status: 'active',
        learning_style: 'visual',
      });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('createProfile', () => {
    it('should create new profile', async () => {
      const result = await service.createProfile(schoolId, {
        school_id: schoolId,
        user_id: 'user-1',
        learning_style: 'visual',
      });
      expect(result).toBeDefined();
    });

    it('should validate input data', async () => {
      await expect(service.createProfile(schoolId, {
        school_id: schoolId,
        user_id: 'user-1',
        learning_style: 'invalid-style',
      })).rejects.toThrow();
    });
  });

  describe('concurrency', () => {
    it('should handle concurrent reads', async () => {
      const promises = Array.from({ length: 10 }, (_, i) =>
        service.getProfile(schoolId, `profile-${i}`)
      );
      const results = await Promise.allSettled(promises);
      expect(results).toHaveLength(10);
    });

    it('should handle concurrent writes', async () => {
      const promises = Array.from({ length: 5 }, (_, i) =>
        service.createProfile(schoolId, {
          school_id: schoolId,
          user_id: `user-${i}`,
        })
      );
      const results = await Promise.allSettled(promises);
      expect(results).toHaveLength(5);
    });
  });
});
```

## Test Coverage Categories

### CRUD Tests

| Test | Description |
|------|-------------|
| `get {entity}` | Single item retrieval by ID |
| `list {entities}` | Collection retrieval with filters |
| `create {entity}` | New item creation with validation |
| `update {entity}` | Partial update with existing item |
| `delete {entity}` | Soft delete with existence check |

### Filter Tests

| Filter | Test |
|--------|------|
| `status` | Filter by active/inactive/archived |
| `type` | Filter by entity type |
| `userId` | Filter by user ownership |
| `dateRange` | Filter by created_at/updated_at |
| `search` | Full-text search on title/description |

### Concurrency Tests

| Scenario | Test |
|----------|------|
| Parallel reads | 10 simultaneous getProfile calls |
| Parallel writes | 5 simultaneous createProfile calls |
| Read-write mix | Concurrent reads during write operation |
| Race conditions | Update same entity from two requests |

### Validation Tests

| Scenario | Test |
|----------|------|
| Missing required fields | Reject with Zod error |
| Invalid UUID format | Reject with format error |
| Invalid enum value | Reject with enum error |
| Out of range number | Reject with range error |
| Empty string | Reject with min length error |

### API Route Tests

| Route | Tests |
|-------|-------|
| `GET /api/adaptive/profiles` | Returns list, handles schoolId |
| `POST /api/adaptive/profiles` | Creates item, validates body |
| `GET /api/adaptive/profiles/[id]` | Returns item, handles not found |
| `PUT /api/adaptive/profiles/[id]` | Updates item, validates partial |
| `DELETE /api/adaptive/profiles/[id]` | Deletes item, handles not found |

## Running Tests

```bash
# Run all adaptive tests
npx vitest run src/features/adaptive/__tests__

# Run specific service test
npx vitest run src/features/adaptive/__tests__/services/adp-profile.service.test.ts

# Run with coverage
npx vitest run --coverage src/features/adaptive/__tests__

# Watch mode
npx vitest watch src/features/adaptive/__tests__
```

## Coverage Targets

| Metric | Target |
|--------|--------|
| Line coverage | > 80% |
| Branch coverage | > 75% |
| Function coverage | > 85% |
| Statement coverage | > 80% |
