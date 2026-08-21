# Types — Phase 3.3 Assessment Engine

3 type files in `packages/types/src/` with 84 enums and 200+ interfaces.

## Files

| File | Lines | Contents |
|------|-------|----------|
| `assessment-core.ts` | 784 | Module 1-2: Core enums + interfaces |
| `assessment-certification.ts` | 930 | Module 3-5: Certification, competency, national exam |
| `assessment-modules.ts` | 1095 | Module 6-11: Accreditation, integrity, portfolio, research, international, AI |

## Enums (84 total)

### assessment-core.ts (22 enums)

| Enum | Values | Module |
|------|--------|--------|
| `ExamType` | ADAPTIVE, STATIC, DIAGNOSTIC, FORMATIVE, SUMMATIVE, CERTIFICATION, NATIONAL | 1 |
| `QuestionType` | MCQ, TRUE_FALSE, FILL_BLANK, SHORT_ANSWER, ESSAY, CODING, PRACTICAL, ORAL, MATCHING, ORDERING, DIAGRAM, CASE_STUDY | 1 |
| `DifficultyLevel` | VERY_EASY, EASY, MEDIUM, HARD, VERY_HARD, ADAPTIVE | 1 |
| `GradingMethod` | AUTO, SEMI_AUTO, MANUAL, AI_POWERED, RUBRIC_BASED | 1 |
| `ExamStatus` | DRAFT, PUBLISHED, IN_PROGRESS, COMPLETED, CANCELLED, ARCHIVED | 1 |
| `AttemptStatus` | IN_PROGRESS, SUBMITTED, GRADED, REVIEWED, APPEALED | 1 |
| `ProctoringMode` | NONE, BASIC, ADVANCED, AI_SUPERVISED | 1 |
| `CheatingIndicator` | NONE, SUSPICIOUS, CONFIRMED, FALSE_POSITIVE | 1 |
| `SecureBrowserLevel` | NONE, BASIC, LOCKDOWN, FULL_ISOLATION | 1 |
| `QuestionDifficulty` | EASY, MEDIUM, HARD, EXPERT, AUTO_ADAPTIVE | 1 |
| `ExamSessionStatus` | SCHEDULED, ACTIVE, PAUSED, COMPLETED, CANCELLED | 1 |
| `QuestionStatus` | DRAFT, IN_REVIEW, APPROVED, REJECTED, ARCHIVED | 2 |
| `QuestionApprovalStatus` | PENDING, APPROVED, REJECTED, REVISION_NEEDED | 2 |
| `QuestionSource` | AI_GENERATED, TEACHER_CREATED, BANK_IMPORTED, OCR_SCANNED, TRANSLATED | 2 |
| `QuestionFormat` | TEXT, IMAGE, AUDIO, VIDEO, INTERACTIVE, CODE, LATEX | 2 |
| `QuestionCategory` | ACADEMIC, PROFESSIONAL, CERTIFICATION, NATIONAL, CUSTOM | 2 |
| `QuestionTagType` | TOPIC, SKILL, COMPETENCY, BLOOM_LEVEL, DIFFICULTY, SOURCE | 2 |
| `QuestionVersionStatus` | DRAFT, CURRENT, DEPRECATED, ARCHIVED | 2 |
| `QuestionReviewStatus` | PENDING, IN_PROGRESS, APPROVED, REJECTED | 2 |
| `ImportFormat` | CSV, EXCEL, JSON, QTI, DOCX, PDF, IMAGE | 2 |
| `ExportFormat` | CSV, EXCEL, JSON, QTI, PDF, DOCX | 2 |
| `BulkOperationType` | EDIT, DELETE, MOVE, TAG, DIFFICULTY, STATUS | 2 |

### assessment-certification.ts (34 enums)

| Enum | Values | Module |
|------|--------|--------|
| `CertificateType` | DIGITAL, BLOCKCHAIN, ACADEMIC, PROFESSIONAL, MICRO_CREDENTIAL, ACHIEVEMENT, COMPLETION | 3 |
| `CertificateStatus` | ACTIVE, EXPIRED, REVOKED, PENDING, SUSPENDED | 3 |
| `CertificateFormat` | PDF, PNG, SVG, JSON, BLOCKCHAIN_TX | 3 |
| `VerificationMethod` | QR_CODE, PUBLIC_URL, API, BLOCKCHAIN, EMAIL | 3 |
| `TemplateType` | ACADEMIC, PROFESSIONAL, CUSTOM, MINIMAL, CLASSIC, MODERN | 3 |
| `CredentialLevel` | FOUNDATION, INTERMEDIATE, ADVANCED, EXPERT, MASTERY | 3 |
| `BadgeType` | SKILL, ACHIEVEMENT, PARTICIPATION, MASTERY, LEADERSHIP | 3 |
| `TranscriptFormat` | PDF, HTML, JSON, XML | 3 |
| `RenewalStatus` | NOT_REQUIRED, DUE, IN_PROGRESS, COMPLETED, OVERDUE | 3 |
| `CompetencyTestType` | PRACTICAL, WRITTEN, ORAL, PORTFOLIO, PEER, SELF, EXTERNAL | 4 |
| `PortfolioType` | STUDENT, TEACHER, COMPETENCY, PROJECT | 4 |
| `AssessmentMethod` | DIRECT_OBSERVATION, PRODUCT_ASSESSMENT, PORTFOLIO, PEER, SELF, EXTERNAL | 4 |
| `CompetencyGapSeverity` | NONE, LOW, MEDIUM, HIGH, CRITICAL | 4 |
| `SkillMatrixLevel` | NOT_DEVELOPING, DEVELOPING, PROFICIENT, ADVANCED, EXPERT | 4 |
| `AssessmentFrequency` | ONCE, DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUAL | 4 |
| `NationalExamType` | BEPC, BAC, CONCOURS, CERTIFICATE, DIPLOMA | 5 |
| `ExamCenterStatus` | ACTIVE, INACTIVE, FULL, MAINTENANCE | 5 |
| `SeatAllocationStatus` | AVAILABLE, ALLOCATED, CONFIRMED, CANCELLED | 5 |
| `CandidateRegistrationStatus` | PENDING, CONFIRMED, REJECTED, CANCELLED | 5 |
| `ExamDistributionStatus` | PENDING, DISTRIBUTED, COLLECTED, SECURED | 5 |
| `SecurePrintStatus` | PENDING, PRINTING, COMPLETED, FAILED | 5 |
| `CorrectionStatus` | PENDING, IN_PROGRESS, COMPLETED, REVIEWED, MODERATED | 5 |
| `MarkerAssignmentStatus` | ASSIGNED, IN_PROGRESS, COMPLETED, OVERDUE | 5 |
| `DoubleMarkingStatus` | PENDING, FIRST_MARK, SECOND_MARK, RECONCILED, ESCALATED | 5 |
| `ModerationStatus` | PENDING, IN_PROGRESS, COMPLETED, APPEALED | 5 |
| `AppealStatus` | PENDING, UNDER_REVIEW, UPHELD, REJECTED, RESOLVED | 5 |
| `ResultsPublicationStatus` | DRAFT, APPROVED, PUBLISHED, ARCHIVED | 5 |
| `RankingType` | NATIONAL, REGIONAL, DEPARTMENTAL, SCHOOL, CLASS | 5 |

### assessment-modules.ts (28 enums)

| Enum | Values | Module |
|------|--------|--------|
| `AccreditationType` | SCHOOL, TEACHER, PROGRAM, INSTITUTION | 6 |
| `AccreditationStatus` | PENDING, IN_PROGRESS, ACCREDITED, DENIED, SUSPENDED, EXPIRED | 6 |
| `ComplianceStatus` | COMPLIANT, NON_COMPLIANT, PARTIAL, PENDING_REVIEW | 6 |
| `AuditStatus` | SCHEDULED, IN_PROGRESS, COMPLETED, FOLLOW_UP | 6 |
| `EvidenceStatus` | SUBMITTED, VERIFIED, REJECTED, PENDING | 6 |
| `RecommendationType` | MANDATORY, RECOMMENDED, OPTIONAL | 6 |
| `CorrectiveActionStatus` | PENDING, IN_PROGRESS, COMPLETED, OVERDUE | 6 |
| `PlagiarismStatus` | CLEAN, SUSPECTED, CONFIRMED, PARTIAL | 7 |
| `AIContentDetectionStatus` | HUMAN, AI_GENERATED, MIXED, UNKNOWN | 7 |
| `IntegrityRiskLevel` | LOW, MEDIUM, HIGH, CRITICAL | 7 |
| `IntegrityReportType` | PLAGIARISM, AI_DETECTION, CHEATING, FORGERY, IDENTITY | 7 |
| `BehaviorAnomalyType` | NONE, TAB_SWITCH, COPY_PASTE, TIME_ANOMALY, PATTERN_ANOMALY | 7 |
| `FraudType` | IDENTITY_FRAUD, CONTENT_FRAUD, COLLUSION, IMPERSONATION, TECHNICAL | 7 |
| `PortfolioItemType` | DOCUMENT, IMAGE, VIDEO, AUDIO, PDF, CODE, LINK, CERTIFICATE, PROJECT, RESEARCH | 8 |
| `PortfolioVisibility` | PRIVATE, SCHOOL, PUBLIC, SHARED | 8 |
| `PortfolioStatus` | DRAFT, PUBLISHED, ARCHIVED | 8 |
| `MediaFormat` | JPEG, PNG, MP4, MP3, PDF, DOCX | 8 |
| `ResearchProjectStatus` | PROPOSAL, ACTIVE, COMPLETED, PUBLISHED, ARCHIVED | 9 |
| `PublicationType` | JOURNAL, CONFERENCE, BOOK, CHAPTER, THESIS, PATENT | 9 |
| `ResearchGrantStatus` | APPLIED, UNDER_REVIEW, APPROVED, FUNDED, COMPLETED, REJECTED | 9 |
| `CollaborationType` | INTERNAL, EXTERNAL, INTERNATIONAL, INDUSTRY | 9 |
| `InnovationLabStatus` | ACTIVE, PAUSED, COMPLETED | 9 |
| `InternationalExamType` | CAMBRIDGE, IB, PEARSON, TOEFL, IELTS, DELF, DALF, SAT, ACT | 10 |
| `CreditSystem` | ECTS, US_CREDIT, UK_CREDIT, NATIONAL, CUSTOM | 10 |
| `RecognitionStatus` | PENDING, RECOGNIZED, PARTIALLY_RECOGNIZED, NOT_RECOGNIZED | 10 |
| `CreditTransferStatus` | PENDING, APPROVED, REJECTED, PARTIAL | 10 |
| `AssessmentAIAction` | FEEDBACK, WEAKNESS_DETECTION, SUGGESTION, DIFFICULTY_ADJUSTMENT, PREDICTION, RISK_DETECTION | 11 |
| `FeedbackType` | IMMEDIATE, DELAYED, DETAILED, SUMMARY, CORRECTIVE | 11 |

## Key Interfaces (200+)

### Module 1 — AI Assessment Engine

| Interface | Description |
|-----------|-------------|
| `AIQuestionGenerator` | AI question generation config |
| `GeneratedQuestion` | Single generated question |
| `AdaptiveExam` | Adaptive exam definition |
| `DynamicQuestionDifficulty` | IRT difficulty parameters |
| `AutomaticGrading` | Grading result |
| `GradingBreakdown` | Per-section scores |
| `EssayEvaluationAI` | Essay evaluation result |
| `CodingAssessment` | Code evaluation result |
| `TestResult` | Individual test case result |
| `PracticalAssessment` | Practical assessment result |
| `OralExamination` | Oral exam record |
| `ExamBlueprint` | Exam structure definition |
| `QuestionPool` | Question pool metadata |
| `ExamSession` | Active exam session |
| `ExamAttempt` | Student exam attempt |
| `AttemptAnswer` | Individual answer record |
| `ExamReplay` | Exam replay data |
| `SecureBrowser` | Browser lockdown config |
| `ProctoringAI` | Proctoring config |
| `ProctoringAlert` | Proctoring alert |
| `CheatingDetection` | Cheating detection record |
| `FaceVerification` | Face verification record |
| `ScreenMonitoring` | Screen monitoring data |
| `MicrophoneMonitoring` | Audio monitoring data |
| `ExamLockdown` | Lockdown config |

### Module 2 — Question Bank

| Interface | Description |
|-----------|-------------|
| `QuestionCategoryEntity` | Question category |
| `QuestionTag` | Question tag |
| `QuestionDifficultyConfig` | Difficulty configuration |
| `QuestionMetadata` | Question metadata |
| `QuestionLearningObjective` | Learning objective mapping |
| `QuestionCompetencyMapping` | Competency mapping |
| `QuestionBloomTaxonomy` | Bloom's taxonomy level |
| `QuestionVersion` | Version history entry |
| `QuestionApprovalWorkflow` | Approval workflow |
| `QuestionReviewer` | Reviewer assignment |
| `QuestionReview` | Review record |
| `QuestionStatistics` | Usage statistics |
| `QuestionReuseLog` | Reuse tracking |
| `ImportQuestionJob` | Import job |
| `ExportQuestionJob` | Export job |
| `BulkEditJob` | Bulk edit job |
| `OCRQuestionImport` | OCR import |
| `AIQuestionGeneration` | AI generation job |
| `QuestionTranslation` | Translation record |
| `QuestionValidation` | Validation result |
| `DuplicateDetection` | Duplicate detection |

### Module 3 — Certification

| Interface | Description |
|-----------|-------------|
| `Certificate` | Certificate record |
| `DigitalCertificate` | Digital file |
| `BlockchainCertificate` | Blockchain record |
| `QRVerification` | QR verification |
| `PublicVerification` | Public URL verification |
| `CertificateTemplate` | Template definition |
| `CertificateBranding` | Branding config |
| `CertificateExpiration` | Expiration tracking |
| `CertificateRenewal` | Renewal record |
| `CertificateValidation` | Validation record |
| `CertificateRevocation` | Revocation record |
| `CertificateRegistry` | Registry stats |
| `MicroCredential` | Micro credential |
| `SkillBadge` | Skill badge |
| `OpenBadge` | Open Badge standard |
| `TranscriptGenerator` | Transcript config |
| `DigitalDiploma` | Digital diploma |

### Module 4 — Competency

| Interface | Description |
|-----------|-------------|
| `CompetencyTest` | Competency test |
| `SkillMatrix` | Student skill matrix |
| `CompetencyLevelConfig` | Level definitions |
| `CompetencyRubric` | Rubric definition |
| `PerformanceRubric` | Performance rubric |
| `Portfolio` | Student portfolio |
| `PeerAssessment` | Peer assessment |
| `SelfAssessment` | Self assessment |
| `TeacherAssessment` | Teacher assessment |
| `ExternalAssessment` | External assessment |
| `CompetencyReport` | Competency report |
| `GapAnalysis` | Gap analysis |
| `LearningPathSuggestion` | Learning path |
| `CertificationEligibility` | Eligibility check |
| `SkillEvolutionTracking` | Skill evolution |

### Module 5 — National Examination

| Interface | Description |
|-----------|-------------|
| `NationalExam` | National exam |
| `ExamCenter` | Exam center |
| `SeatAllocation` | Seat allocation |
| `CandidateRegistration` | Registration |
| `AnonymousNumber` | Anonymous numbering |
| `ExamDistribution` | Distribution record |
| `SecurePrinting` | Secure print job |
| `CorrectionCenter` | Correction center |
| `MarkerAssignment` | Marker assignment |
| `DoubleMarking` | Double marking |
| `Moderation` | Moderation record |
| `Appeal` | Appeal record |
| `ResultsPublication` | Results publication |
| `ExamRanking` | Ranking record |
| `NationalAnalytics` | Analytics |

### Module 6-11

| Interface | Module |
|-----------|--------|
| `SchoolAccreditation` | 6 |
| `TeacherAccreditation` | 6 |
| `ProgramAccreditation` | 6 |
| `AuditFramework` | 6 |
| `ComplianceCheck` | 6 |
| `EvidenceCollection` | 6 |
| `AccreditationReport` | 6 |
| `CorrectiveAction` | 6 |
| `PlagiarismDetection` | 7 |
| `AIGeneratedContentDetection` | 7 |
| `AcademicIntegrity` | 7 |
| `FraudDetection` | 7 |
| `StudentPortfolio` | 8 |
| `TeacherPortfolio` | 8 |
| `ResearchProject` | 9 |
| `InnovationLab` | 9 |
| `Publication` | 9 |
| `ResearchGrant` | 9 |
| `InternationalExam` | 10 |
| `CreditTransfer` | 11 |
| `RecognitionEngine` | 10 |
| `AssessmentAI` | 11 |
| `AutoFeedback` | 11 |
| `ExamPrediction` | 11 |
| `SmartRubric` | 11 |
| `AIModeration` | 11 |
| `AIInvigilator` | 11 |

### Shared Interfaces

| Interface | Description |
|-----------|-------------|
| `AssessmentDashboard` | Dashboard aggregate |
| `RecentAssessment` | Recent assessment entry |
| `ExamTakingState` | Active exam state |
| `CertificateWallet` | Student credential wallet |
| `IntegrityDashboard` | Integrity overview |
