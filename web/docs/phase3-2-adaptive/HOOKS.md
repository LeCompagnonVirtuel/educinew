# Hooks — Phase 3.2 Adaptive Learning Intelligence

## Overview

100 React hooks located under `src/features/adaptive/hooks/`. Two hooks per entity: a **List hook** for data fetching and an **Actions hook** for CRUD mutations.

## Structure

```
hooks/
├── use-adaptive-profile-list.ts
├── use-adaptive-profile-actions.ts
├── use-adaptive-learning-style-list.ts
├── use-adaptive-learning-style-actions.ts
├── use-adaptive-learning-path-list.ts
├── use-adaptive-learning-path-actions.ts
├── use-adaptive-content-list.ts
├── use-adaptive-content-actions.ts
├── use-adaptive-difficulty-list.ts
├── use-adaptive-difficulty-actions.ts
├── use-adaptive-knowledge-gap-list.ts
├── use-adaptive-knowledge-gap-actions.ts
├── use-adaptive-competency-list.ts
├── use-adaptive-competency-actions.ts
├── use-adaptive-assessment-list.ts
├── use-adaptive-assessment-actions.ts
├── use-adaptive-repetition-list.ts
├── use-adaptive-repetition-actions.ts
├── use-adaptive-recommendation-list.ts
├── use-adaptive-recommendation-actions.ts
├── use-adaptive-analytics-list.ts
├── use-adaptive-analytics-actions.ts
├── use-adaptive-experiment-list.ts
├── use-adaptive-experiment-actions.ts
├── use-adaptive-realtime-list.ts
├── use-adaptive-realtime-actions.ts
├── use-adaptive-prerequisite-list.ts
├── use-adaptive-prerequisite-actions.ts
├── use-adaptive-mastery-list.ts
├── use-adaptive-mastery-actions.ts
├── use-adaptive-session-list.ts
├── use-adaptive-session-actions.ts
├── use-adaptive-engagement-list.ts
├── use-adaptive-engagement-actions.ts
├── use-adaptive-feedback-list.ts
├── use-adaptive-feedback-actions.ts
├── use-adaptive-goal-list.ts
├── use-adaptive-goal-actions.ts
├── use-adaptive-streak-list.ts
├── use-adaptive-streak-actions.ts
├── use-adaptive-leaderboard-list.ts
├── use-adaptive-leaderboard-actions.ts
├── use-adaptive-notification-list.ts
├── use-adaptive-notification-actions.ts
├── use-adaptive-progress-list.ts
├── use-adaptive-progress-actions.ts
├── use-adaptive-social-list.ts
├── use-adaptive-social-actions.ts
├── use-adaptive-curation-list.ts
├── use-adaptive-curation-actions.ts
└── ... (100 total)
```

## List Hook Pattern

```typescript
'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AdaptiveProfile } from '@educi/types';

export function useAdaptiveProfileList(schoolId: string) {
  const [items, setItems] = useState<AdaptiveProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/adaptive/profiles?schoolId=${schoolId}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const { data } = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
}
```

## Actions Hook Pattern

```typescript
'use client';
import { useState, useCallback } from 'react';
import type { AdaptiveProfileCreate } from '@educi/types';

export function useAdaptiveProfileActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AdaptiveProfileCreate) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/adaptive/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId, ...data })
      });
      if (!response.ok) throw new Error('Failed to create');
      const { data: result } = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AdaptiveProfileCreate>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/adaptive/profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId, ...data })
      });
      if (!response.ok) throw new Error('Failed to update');
      const { data: result } = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/adaptive/profiles/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId })
      });
      if (!response.ok) throw new Error('Failed to delete');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
}
```

## Return Values

| Hook Type | Returns |
|-----------|---------|
| **List** | `{ items, loading, error, refresh }` |
| **Actions** | `{ loading, error, create, update, remove }` |

## Supabase Client

All hooks use `createClient` from `@/lib/supabase/client` for browser-side Supabase access. API calls go through `/api/adaptive/*` REST endpoints.

```typescript
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

## Entity Coverage

| Domain | List Hooks | Actions Hooks |
|--------|------------|---------------|
| Learner Profile | 4 | 4 |
| Learning Path | 2 | 2 |
| Content Delivery | 2 | 2 |
| Difficulty Engine | 2 | 2 |
| Knowledge Gap | 2 | 2 |
| Competency | 2 | 2 |
| Assessment | 2 | 2 |
| Spaced Repetition | 2 | 2 |
| Recommendation | 2 | 2 |
| Analytics | 2 | 2 |
| A/B Testing | 2 | 2 |
| Real-time | 2 | 2 |
| Prerequisite | 2 | 2 |
| Mastery | 2 | 2 |
| Session | 2 | 2 |
| Engagement | 2 | 2 |
| Feedback | 2 | 2 |
| Goals | 2 | 2 |
| Gamification | 6 | 6 |
| Notifications | 2 | 2 |
| Progress | 2 | 2 |
| Social Learning | 2 | 2 |
| Content Curation | 2 | 2 |
| Accessibility | 2 | 2 |
| Instructor | 2 | 2 |
| Curriculum | 2 | 2 |
| **Total** | **50** | **50** |

## Server-Side vs Client-Side

- **Client hooks**: Use `fetch()` to call Next.js API routes
- **Server components**: Use Supabase service-role directly
- All list hooks include `useEffect` auto-fetch on mount
- All action hooks return memoized callbacks via `useCallback`
