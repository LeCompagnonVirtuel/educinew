# API Routes — Phase 3.3 Assessment Engine

All routes are prefixed with `/api/assessment/`. Total: ~80 REST routes.

## Module 1 — AI Assessment Engine

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/ai-question-generators` | List AI question generators |
| POST | `/ai-question-generators` | Create AI question generator |
| GET | `/ai-question-generators/:id` | Get AI question generator |
| PUT | `/ai-question-generators/:id` | Update AI question generator |
| DELETE | `/ai-question-generators/:id` | Delete AI question generator |
| POST | `/ai-question-generators/:id/generate` | Generate questions |
| GET | `/adaptive-exams` | List adaptive exams |
| POST | `/adaptive-exams` | Create adaptive exam |
| GET | `/adaptive-exams/:id` | Get adaptive exam |
| PUT | `/adaptive-exams/:id` | Update adaptive exam |
| DELETE | `/adaptive-exams/:id` | Delete adaptive exam |
| GET | `/automatic-gradings` | List automatic gradings |
| POST | `/automatic-gradings` | Create automatic grading |
| GET | `/essay-evaluations` | List essay evaluations |
| POST | `/essay-evaluations` | Create essay evaluation |
| GET | `/coding-assessments` | List coding assessments |
| POST | `/coding-assessments` | Create coding assessment |
| GET | `/practical-assessments` | List practical assessments |
| POST | `/practical-assessments` | Create practical assessment |
| GET | `/oral-examinations` | List oral examinations |
| POST | `/oral-examinations` | Create oral examination |
| GET | `/exam-blueprints` | List exam blueprints |
| POST | `/exam-blueprints` | Create exam blueprint |
| GET | `/question-randomizers` | List question randomizers |
| POST | `/question-randomizers` | Create question randomizer |
| GET | `/question-pools` | List question pools |
| POST | `/question-pools` | Create question pool |
| GET | `/exam-sessions` | List exam sessions |
| POST | `/exam-sessions` | Create exam session |
| GET | `/exam-attempts` | List exam attempts |
| POST | `/exam-attempts` | Create exam attempt |
| PUT | `/exam-attempts/:id/submit` | Submit exam attempt |
| GET | `/secure-browsers` | List secure browser configs |
| POST | `/secure-browsers` | Create secure browser config |
| GET | `/proctoring-ai` | List proctoring configs |
| POST | `/proctoring-ai` | Create proctoring config |
| GET | `/cheating-detections` | List cheating detections |
| POST | `/cheating-detections` | Create cheating detection |
| GET | `/face-verifications` | List face verifications |
| POST | `/face-verifications` | Create face verification |
| GET | `/screen-monitorings` | List screen monitorings |
| POST | `/screen-monitorings` | Create screen monitoring |
| GET | `/microphone-monitorings` | List microphone monitorings |
| POST | `/microphone-monitorings` | Create microphone monitoring |
| GET | `/exam-lockdowns` | List exam lockdowns |
| POST | `/exam-lockdowns` | Create exam lockdown |

## Module 2 — Question Bank

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/question-categories` | List question categories |
| POST | `/question-categories` | Create question category |
| GET | `/question-tags` | List question tags |
| POST | `/question-tags` | Create question tag |
| GET | `/question-versions` | List question versions |
| POST | `/question-versions` | Create question version |
| GET | `/question-approval-workflows` | List approval workflows |
| POST | `/question-approval-workflows` | Create approval workflow |
| GET | `/question-reviews` | List question reviews |
| POST | `/question-reviews` | Create question review |
| GET | `/question-statistics` | List question statistics |
| POST | `/import-question-jobs` | Create import job |
| POST | `/export-question-jobs` | Create export job |
| POST | `/bulk-edit-jobs` | Create bulk edit job |
| POST | `/ocr-question-imports` | Create OCR import |
| POST | `/ai-question-generations` | Generate questions via AI |
| POST | `/question-translations` | Translate questions |
| POST | `/question-validations` | Validate questions |
| POST | `/duplicate-detections` | Run duplicate detection |

## Module 3 — Certification

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/certificates` | List certificates |
| POST | `/certificates` | Create certificate |
| GET | `/certificates/:id/verify` | Verify certificate |
| GET | `/digital-certificates` | List digital certificates |
| POST | `/digital-certificates` | Create digital certificate |
| GET | `/blockchain-certificates` | List blockchain certificates |
| POST | `/blockchain-certificates` | Create blockchain certificate |
| GET | `/qr-verifications` | List QR verifications |
| POST | `/qr-verifications` | Create QR verification |
| GET | `/certificate-templates` | List templates |
| POST | `/certificate-templates` | Create template |
| GET | `/micro-credentials` | List micro credentials |
| POST | `/micro-credentials` | Create micro credential |
| GET | `/skill-badges` | List skill badges |
| POST | `/skill-badges` | Create skill badge |
| GET | `/transcript-generators` | List transcript generators |
| POST | `/transcript-generators` | Generate transcript |
| GET | `/digital-diplomas` | List digital diplomas |
| POST | `/digital-diplomas` | Create digital diploma |

## Module 4 — Competency Assessment

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/competency-tests` | List competency tests |
| POST | `/competency-tests` | Create competency test |
| GET | `/skill-matrices` | List skill matrices |
| POST | `/skill-matrices` | Create skill matrix |
| GET | `/competency-rubrics` | List competency rubrics |
| POST | `/competency-rubrics` | Create competency rubric |
| GET | `/portfolios` | List portfolios |
| POST | `/portfolios` | Create portfolio |
| GET | `/peer-assessments` | List peer assessments |
| POST | `/peer-assessments` | Create peer assessment |
| GET | `/self-assessments` | List self assessments |
| POST | `/self-assessments` | Create self assessment |
| GET | `/competency-reports` | List competency reports |
| POST | `/competency-reports` | Generate competency report |
| GET | `/gap-analyses` | List gap analyses |
| POST | `/gap-analyses` | Create gap analysis |

## Module 5 — National Examination

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/national-exams` | List national exams |
| POST | `/national-exams` | Create national exam |
| GET | `/exam-centers` | List exam centers |
| POST | `/exam-centers` | Create exam center |
| GET | `/seat-allocations` | List seat allocations |
| POST | `/seat-allocations` | Allocate seats |
| GET | `/candidate-registrations` | List registrations |
| POST | `/candidate-registrations` | Register candidate |
| GET | `/correction-centers` | List correction centers |
| POST | `/correction-centers` | Create correction center |
| GET | `/moderations` | List moderations |
| POST | `/moderations` | Create moderation |
| GET | `/appeals` | List appeals |
| POST | `/appeals` | Create appeal |
| GET | `/results-publications` | List result publications |
| POST | `/results-publications` | Publish results |
| GET | `/exam-rankings` | List exam rankings |
| POST | `/exam-rankings` | Generate rankings |

## Module 6 — Accreditation

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/school-accreditations` | List school accreditations |
| POST | `/school-accreditations` | Create accreditation |
| GET | `/compliance-checks` | List compliance checks |
| POST | `/compliance-checks` | Create compliance check |
| GET | `/accreditation-reports` | List reports |
| POST | `/accreditation-reports` | Generate report |
| GET | `/corrective-actions` | List corrective actions |
| POST | `/corrective-actions` | Create corrective action |

## Module 7 — Academic Integrity

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/plagiarism-detections` | List plagiarism detections |
| POST | `/plagiarism-detections` | Run plagiarism check |
| GET | `/ai-content-detections` | List AI content detections |
| POST | `/ai-content-detections` | Run AI detection |
| GET | `/integrity-reports` | List integrity reports |
| POST | `/integrity-reports` | Generate integrity report |
| GET | `/fraud-detections` | List fraud detections |
| POST | `/fraud-detections` | Create fraud detection |

## Module 8-11 — Portfolio, Research, International, AI

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/student-portfolios` | List student portfolios |
| POST | `/student-portfolios` | Create student portfolio |
| GET | `/research-projects` | List research projects |
| POST | `/research-projects` | Create research project |
| GET | `/international-exams` | List international exams |
| POST | `/international-exams` | Create international exam |
| GET | `/credit-transfers` | List credit transfers |
| POST | `/credit-transfers` | Create credit transfer |
| GET | `/ai-assessments` | List AI assessments |
| POST | `/ai-assessments` | Create AI assessment |
| GET | `/auto-feedbacks` | List auto feedbacks |
| POST | `/auto-feedbacks` | Generate feedback |
| GET | `/exam-predictions` | List exam predictions |
| POST | `/exam-predictions` | Generate prediction |

## Common Query Parameters

- `?page=1&limit=20` — Pagination
- `?sort=created_at&order=desc` — Sorting
- `?status=ACTIVE` — Filtering
- `?search=query` — Full-text search

## Authentication

All routes require Supabase JWT token via `Authorization: Bearer <token>` header. School-scoped via RLS.
