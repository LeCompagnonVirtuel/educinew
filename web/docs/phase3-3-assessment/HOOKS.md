# Hooks — Phase 3.3 Assessment Engine

40 React hooks in `web/src/features/assessment/hooks/`. Two patterns per entity: **List** (data fetching) and **Actions** (mutations).

## Pattern — List Hook

```typescript
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Assessment[Entity]Service } from '../services/assessment-[entity].service';
import { createClient } from '@/lib/supabase/client';

export const useAssessment[Entity]List = (schoolId: string) => {
  const [items, setItems] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new Assessment[Entity]Service(supabase);
      const data = await service.list[Entities](schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);
  return { items, loading, error, refresh: fetchItems };
};
```

## Pattern — Actions Hook

```typescript
'use client';
import { useState, useCallback } from 'react';
import { Assessment[Entity]Service } from '../services/assessment-[entity].service';
import { createClient } from '@/lib/supabase/client';

export const useAssessment[Entity]Actions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (schoolId: string, data: EntityCreate) => {
    setLoading(true); setError(null);
    try {
      const supabase = createClient();
      const service = new Assessment[Entity]Service(supabase);
      return await service.create[Entity](schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      throw err;
    } finally { setLoading(false); }
  }, []);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<EntityCreate>) => {
    setLoading(true); setError(null);
    try {
      const supabase = createClient();
      const service = new Assessment[Entity]Service(supabase);
      return await service.update[Entity](schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      throw err;
    } finally { setLoading(false); }
  }, []);

  const remove = useCallback(async (schoolId: string, id: string) => {
    setLoading(true); setError(null);
    try {
      const supabase = createClient();
      const service = new Assessment[Entity]Service(supabase);
      return await service.delete[Entity](schoolId, id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      throw err;
    } finally { setLoading(false); }
  }, []);

  return { create, update, remove, loading, error };
};
```

## Complete Hook List

### Module 1 — AI Assessment Engine

| # | List Hook | Actions Hook | Entity |
|---|-----------|--------------|--------|
| 1 | `use-assessment-ai-question-gen.ts` | `use-assessment-ai-question-gen-actions.ts` | AIQuestionGenerator |
| 2 | `use-assessment-adaptive-exam.ts` | `use-assessment-adaptive-exam-actions.ts` | AdaptiveExam |
| 3 | `use-assessment-automatic-grading.ts` | `use-assessment-automatic-grading-actions.ts` | AutomaticGrading |
| 4 | `use-assessment-essay-evaluation.ts` | `use-assessment-essay-evaluation-actions.ts` | EssayEvaluationAI |
| 5 | `use-assessment-competency-test.ts` | `use-assessment-competency-test-actions.ts` | CompetencyTest |

### Module 2 — Question Bank

| # | List Hook | Actions Hook | Entity |
|---|-----------|--------------|--------|
| 6 | `use-assessment-question-pool.ts` | `use-assessment-question-pool-actions.ts` | QuestionPool |

### Module 3 — Certification

| # | List Hook | Actions Hook | Entity |
|---|-----------|--------------|--------|
| 7 | `use-assessment-certificate.ts` | `use-assessment-certificate-actions.ts` | Certificate |
| 8 | `use-assessment-certificate-template.ts` | `use-assessment-certificate-template-actions.ts` | CertificateTemplate |
| 9 | `use-assessment-skill-badge.ts` | `use-assessment-skill-badge-actions.ts` | SkillBadge |
| 10 | `use-assessment-digital-diploma.ts` | `use-assessment-digital-diploma-actions.ts` | DigitalDiploma |

### Module 4 — Competency Assessment

| # | List Hook | Actions Hook | Entity |
|---|-----------|--------------|--------|
| 11 | `use-assessment-skill-matrix.ts` | `use-assessment-skill-matrix-actions.ts` | SkillMatrix |
| 12 | `use-assessment-portfolio.ts` | `use-assessment-portfolio-actions.ts` | Portfolio |
| 13 | `use-assessment-plagiarism.ts` | `use-assessment-plagiarism-actions.ts` | PlagiarismDetection |

### Module 5 — National Examination

| # | List Hook | Actions Hook | Entity |
|---|-----------|--------------|--------|
| 14 | `use-assessment-national-exam.ts` | `use-assessment-national-exam-actions.ts` | NationalExam |
| 15 | `use-assessment-exam-session.ts` | `use-assessment-exam-session-actions.ts` | ExamSession |
| 16 | `use-assessment-exam-attempt.ts` | `use-assessment-exam-attempt-actions.ts` | ExamAttempt |

### Module 6-11 — Remaining

| # | List Hook | Actions Hook | Entity |
|---|-----------|--------------|--------|
| 17 | `use-assessment-proctoring.ts` | `use-assessment-proctoring-actions.ts` | ProctoringAI |
| 18 | `use-assessment-transcript.ts` | `use-assessment-transcript-actions.ts` | TranscriptGenerator |
| 19 | `use-assessment-accreditation.ts` | `use-assessment-accreditation-actions.ts` | SchoolAccreditation |
| 20 | `use-assessment-research-project.ts` | `use-assessment-research-project-actions.ts` | ResearchProject |

## Return Values

**List Hook**: `{ items: T[], loading: boolean, error: string | null, refresh: () => void }`

**Actions Hook**: `{ create, update, remove, loading: boolean, error: string | null }`
