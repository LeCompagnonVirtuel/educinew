# Services — Phase 3.3 Assessment Engine

40 service classes implementing the CRUD pattern. Each service wraps the `AssessmentRepository`.

## Pattern

```typescript
// services/assessment-[entity].service.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { AssessmentRepository, createAssessmentRepository } from '../repositories/assessment.repository';
import { Assessment[Entity]NotFoundError } from '@educi/errors';

export class Assessment[Entity]Service {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }

  async get(schoolId: string, id: string): Promise<Entity> {
    const item = await this.repo.get[Entity](schoolId, id);
    if (!item) throw new Assessment[Entity]NotFoundError(id);
    return item;
  }

  async list(schoolId: string, filters?: Record<string, unknown>): Promise<Entity[]> {
    return this.repo.list[Entities](schoolId, filters);
  }

  async create(schoolId: string, data: EntityCreate): Promise<Entity> {
    return this.repo.create[Entity]({ ...data, school_id: schoolId });
  }

  async update(schoolId: string, id: string, data: Partial<EntityCreate>): Promise<Entity> {
    const existing = await this.repo.get[Entity](schoolId, id);
    if (!existing) throw new Assessment[Entity]NotFoundError(id);
    return this.repo.update[Entity](id, schoolId, data);
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.get[Entity](schoolId, id);
    if (!existing) throw new Assessment[Entity]NotFoundError(id);
    return this.repo.delete[Entity](id, schoolId);
  }
}
```

## Service List

### Module 1 — AI Assessment Engine (18 services)

| # | Service File | Entity |
|---|-------------|--------|
| 1 | `assessment-ai-question-gen.service.ts` | AIQuestionGenerator |
| 2 | `assessment-adaptive-exam.service.ts` | AdaptiveExam |
| 3 | `assessment-automatic-grading.service.ts` | AutomaticGrading |
| 4 | `assessment-essay-evaluation.service.ts` | EssayEvaluationAI |
| 5 | `assessment-coding-assessment.service.ts` | CodingAssessment |
| 6 | `assessment-practical-assessment.service.ts` | PracticalAssessment |
| 7 | `assessment-oral-examination.service.ts` | OralExamination |
| 8 | `assessment-exam-blueprint.service.ts` | ExamBlueprint |
| 9 | `assessment-question-pool.service.ts` | QuestionPool |
| 10 | `assessment-exam-session.service.ts` | ExamSession |
| 11 | `assessment-exam-attempt.service.ts` | ExamAttempt |
| 12 | `assessment-proctoring.service.ts` | ProctoringAI |
| 13 | `assessment-cheating-detection.service.ts` | CheatingDetection |
| 14 | `assessment-integrity.service.ts` | Integrity |
| 15 | `assessment-import-question.service.ts` | ImportQuestionJob |
| 16 | `assessment-micro-credential.service.ts` | MicroCredential |
| 17 | `assessment-digital-certificate.service.ts` | DigitalCertificate |
| 18 | `assessment-digital-diploma.service.ts` | DigitalDiploma |

### Module 2 — Question Bank (6 services)

| # | Service File | Entity |
|---|-------------|--------|
| 19 | `assessment-question-category.service.ts` | QuestionCategory |
| 20 | `assessment-question-tag.service.ts` | QuestionTag |
| 21 | `assessment-question-version.service.ts` | QuestionVersion |
| 22 | `assessment-question-statistics.service.ts` | QuestionStatistic |
| 23 | `assessment-question-approval.service.ts` | QuestionApprovalWorkflow |

### Module 3 — Certification (4 services)

| # | Service File | Entity |
|---|-------------|--------|
| 24 | `assessment-certificate.service.ts` | Certificate |
| 25 | `assessment-certificate-template.service.ts` | CertificateTemplate |
| 26 | `assessment-skill-badge.service.ts` | SkillBadge |
| 27 | `assessment-transcript.service.ts` | TranscriptGenerator |

### Module 4 — Competency Assessment (5 services)

| # | Service File | Entity |
|---|-------------|--------|
| 28 | `assessment-competency-test.service.ts` | CompetencyTest |
| 29 | `assessment-skill-matrix.service.ts` | SkillMatrix |
| 30 | `assessment-portfolio.service.ts` | Portfolio |
| 31 | `assessment-peer-assessment.service.ts` | PeerAssessment |
| 32 | `assessment-competency-report.service.ts` | CompetencyReport |

### Module 5 — National Examination (3 services)

| # | Service File | Entity |
|---|-------------|--------|
| 33 | `assessment-national-exam.service.ts` | NationalExam |
| 34 | `assessment-exam-center.service.ts` | ExamCenter |
| 35 | `assessment-moderation.service.ts` | Moderation |

### Module 6 — Accreditation (1 service)

| # | Service File | Entity |
|---|-------------|--------|
| 36 | `assessment-accreditation.service.ts` | SchoolAccreditation |

### Module 7 — Academic Integrity (1 service)

| # | Service File | Entity |
|---|-------------|--------|
| 37 | `assessment-plagiarism.service.ts` | PlagiarismDetection |

### Module 8-11 — Portfolio, Research, International, AI (3 services)

| # | Service File | Entity |
|---|-------------|--------|
| 38 | `assessment-research-project.service.ts` | ResearchProject |
| 39 | `assessment-international-exam.service.ts` | InternationalExam |
| 40 | `assessment-appeal.service.ts` | Appeal |

## Service Composition

Each service:
- Imports `SupabaseClient` from `@supabase/supabase-js`
- Imports entity types from `@educi/types`
- Imports error classes from `@educi/errors`
- Creates `AssessmentRepository` in constructor
- Exposes 5 methods: `get`, `list`, `create`, `update`, `delete`
- Throws typed `NotFoundError` on missing entities
