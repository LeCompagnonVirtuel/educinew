import { SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '@educi/errors';
import type {
  AIQuestionGenerator, AIQuestionGeneratorCreate, AIQuestionGeneratorUpdate,
  AdaptiveExam, AdaptiveExamCreate, AdaptiveExamUpdate,
  DynamicQuestionDifficulty, DynamicQuestionDifficultyCreate, DynamicQuestionDifficultyUpdate,
  AutomaticGrading, AutomaticGradingCreate, AutomaticGradingUpdate,
  EssayEvaluationAI, EssayEvaluationAICreate, EssayEvaluationAIUpdate,
  CodingAssessment, CodingAssessmentCreate, CodingAssessmentUpdate,
  PracticalAssessment, PracticalAssessmentCreate, PracticalAssessmentUpdate,
  OralExamination, OralExaminationCreate, OralExaminationUpdate,
  ExamBlueprint, ExamBlueprintCreate, ExamBlueprintUpdate,
  QuestionRandomizer, QuestionRandomizerCreate, QuestionRandomizerUpdate,
  QuestionPool, QuestionPoolCreate, QuestionPoolUpdate,
  ExamSession, ExamSessionCreate, ExamSessionUpdate,
  ExamAttempt, ExamAttemptCreate, ExamAttemptUpdate,
  SecureBrowser, SecureBrowserCreate, SecureBrowserUpdate,
  ProctoringAI, ProctoringAICreate, ProctoringAIUpdate,
  CheatingDetection, CheatingDetectionCreate, CheatingDetectionUpdate,
  FaceVerification, FaceVerificationCreate, FaceVerificationUpdate,
  ScreenMonitoring, ScreenMonitoringCreate, ScreenMonitoringUpdate,
  MicrophoneMonitoring, MicrophoneMonitoringCreate, MicrophoneMonitoringUpdate,
  ExamLockdown, ExamLockdownCreate, ExamLockdownUpdate,
  QuestionCategory, QuestionCategoryCreate, QuestionCategoryUpdate,
  QuestionTag, QuestionTagCreate, QuestionTagUpdate,
  QuestionDifficultyConfig, QuestionDifficultyConfigCreate, QuestionDifficultyConfigUpdate,
  QuestionMetadata, QuestionMetadataCreate, QuestionMetadataUpdate,
  QuestionVersion, QuestionVersionCreate, QuestionVersionUpdate,
  QuestionApprovalWorkflow, QuestionApprovalWorkflowCreate, QuestionApprovalWorkflowUpdate,
  QuestionReview, QuestionReviewCreate, QuestionReviewUpdate,
  QuestionStatistic, QuestionStatisticCreate, QuestionStatisticUpdate,
  ImportQuestionJob, ImportQuestionJobCreate, ImportQuestionJobUpdate,
  ExportQuestionJob, ExportQuestionJobCreate, ExportQuestionJobUpdate,
  BulkEditJob, BulkEditJobCreate, BulkEditJobUpdate,
  OCRQuestionImport, OCRQuestionImportCreate, OCRQuestionImportUpdate,
  AIQuestionGeneration, AIQuestionGenerationCreate, AIQuestionGenerationUpdate,
  QuestionTranslation, QuestionTranslationCreate, QuestionTranslationUpdate,
  QuestionValidation, QuestionValidationCreate, QuestionValidationUpdate,
  DuplicateDetection, DuplicateDetectionCreate, DuplicateDetectionUpdate,
  Certificate, CertificateCreate, CertificateUpdate,
  DigitalCertificate, DigitalCertificateCreate, DigitalCertificateUpdate,
  BlockchainCertificate, BlockchainCertificateCreate, BlockchainCertificateUpdate,
  QRVerification, QRVerificationCreate, QRVerificationUpdate,
  PublicVerification, PublicVerificationCreate, PublicVerificationUpdate,
  CertificateTemplate, CertificateTemplateCreate, CertificateTemplateUpdate,
  CertificateBranding, CertificateBrandingCreate, CertificateBrandingUpdate,
  CertificateExpiration, CertificateExpirationCreate, CertificateExpirationUpdate,
  CertificateRenewal, CertificateRenewalCreate, CertificateRenewalUpdate,
  CertificateValidation, CertificateValidationCreate, CertificateValidationUpdate,
  CertificateRevocation, CertificateRevocationCreate, CertificateRevocationUpdate,
  CertificateRegistry, CertificateRegistryCreate, CertificateRegistryUpdate,
  MicroCredential, MicroCredentialCreate, MicroCredentialUpdate,
  SkillBadge, SkillBadgeCreate, SkillBadgeUpdate,
  OpenBadge, OpenBadgeCreate, OpenBadgeUpdate,
  AchievementCertificate, AchievementCertificateCreate, AchievementCertificateUpdate,
  AcademicCertificate, AcademicCertificateCreate, AcademicCertificateUpdate,
  ProfessionalCertificate, ProfessionalCertificateCreate, ProfessionalCertificateUpdate,
  TranscriptGenerator, TranscriptGeneratorCreate, TranscriptGeneratorUpdate,
  DigitalDiploma, DigitalDiplomaCreate, DigitalDiplomaUpdate,
  CompetencyTest, CompetencyTestCreate, CompetencyTestUpdate,
  SkillMatrix, SkillMatrixCreate, SkillMatrixUpdate,
  CompetencyLevelConfig, CompetencyLevelConfigCreate, CompetencyLevelConfigUpdate,
  CompetencyRubric, CompetencyRubricCreate, CompetencyRubricUpdate,
  PerformanceRubric, PerformanceRubricCreate, PerformanceRubricUpdate,
  Portfolio, PortfolioCreate, PortfolioUpdate,
  PeerAssessment, PeerAssessmentCreate, PeerAssessmentUpdate,
  SelfAssessment, SelfAssessmentCreate, SelfAssessmentUpdate,
  TeacherAssessment, TeacherAssessmentCreate, TeacherAssessmentUpdate,
  ExternalAssessment, ExternalAssessmentCreate, ExternalAssessmentUpdate,
  CompetencyReport, CompetencyReportCreate, CompetencyReportUpdate,
  GapAnalysis, GapAnalysisCreate, GapAnalysisUpdate,
  LearningPathSuggestion, LearningPathSuggestionCreate, LearningPathSuggestionUpdate,
  CertificationEligibility, CertificationEligibilityCreate, CertificationEligibilityUpdate,
  SkillEvolutionTracking, SkillEvolutionTrackingCreate, SkillEvolutionTrackingUpdate,
  NationalExam, NationalExamCreate, NationalExamUpdate,
  ExamCenter, ExamCenterCreate, ExamCenterUpdate,
  SeatAllocation, SeatAllocationCreate, SeatAllocationUpdate,
  CandidateRegistration, CandidateRegistrationCreate, CandidateRegistrationUpdate,
  AnonymousNumber, AnonymousNumberCreate, AnonymousNumberUpdate,
  ExamDistribution, ExamDistributionCreate, ExamDistributionUpdate,
  SecurePrinting, SecurePrintingCreate, SecurePrintingUpdate,
  CorrectionCenter, CorrectionCenterCreate, CorrectionCenterUpdate,
  MarkerAssignment, MarkerAssignmentCreate, MarkerAssignmentUpdate,
  DoubleMarking, DoubleMarkingCreate, DoubleMarkingUpdate,
  Moderation, ModerationCreate, ModerationUpdate,
  Appeal, AppealCreate, AppealUpdate,
  ResultsPublication, ResultsPublicationCreate, ResultsPublicationUpdate,
  ExamRanking, ExamRankingCreate, ExamRankingUpdate,
  NationalAnalytics, NationalAnalyticsCreate, NationalAnalyticsUpdate,
  SchoolAccreditation, SchoolAccreditationCreate, SchoolAccreditationUpdate,
  TeacherAccreditation, TeacherAccreditationCreate, TeacherAccreditationUpdate,
  ProgramAccreditation, ProgramAccreditationCreate, ProgramAccreditationUpdate,
  AuditFramework, AuditFrameworkCreate, AuditFrameworkUpdate,
  ComplianceCheck, ComplianceCheckCreate, ComplianceCheckUpdate,
  EvidenceCollection, EvidenceCollectionCreate, EvidenceCollectionUpdate,
  AccreditationReport, AccreditationReportCreate, AccreditationReportUpdate,
  AccreditationRecommendation, AccreditationRecommendationCreate, AccreditationRecommendationUpdate,
  CorrectiveAction, CorrectiveActionCreate, CorrectiveActionUpdate,
  RenewalWorkflow, RenewalWorkflowCreate, RenewalWorkflowUpdate,
  PlagiarismDetection, PlagiarismDetectionCreate, PlagiarismDetectionUpdate,
  SimilarityDetection, SimilarityDetectionCreate, SimilarityDetectionUpdate,
  AIGeneratedContentDetection, AIGeneratedContentDetectionCreate, AIGeneratedContentDetectionUpdate,
  CitationChecker, CitationCheckerCreate, CitationCheckerUpdate,
  AcademicIntegrity, AcademicIntegrityCreate, AcademicIntegrityUpdate,
  FraudDetection, FraudDetectionCreate, FraudDetectionUpdate,
  ForgeryDetection, ForgeryDetectionCreate, ForgeryDetectionUpdate,
  IdentityVerification, IdentityVerificationCreate, IdentityVerificationUpdate,
  BehaviorAnalysis, BehaviorAnalysisCreate, BehaviorAnalysisUpdate,
  IntegrityRiskScore, IntegrityRiskScoreCreate, IntegrityRiskScoreUpdate,
  IntegrityReport, IntegrityReportCreate, IntegrityReportUpdate,
  StudentPortfolio, StudentPortfolioCreate, StudentPortfolioUpdate,
  TeacherPortfolio, TeacherPortfolioCreate, TeacherPortfolioUpdate,
  CompetencyPortfolio, CompetencyPortfolioCreate, CompetencyPortfolioUpdate,
  Project, ProjectCreate, ProjectUpdate,
  ResearchEntry, ResearchEntryCreate, ResearchEntryUpdate,
  Internship, InternshipCreate, InternshipUpdate,
  MediaItem, MediaItemCreate, MediaItemUpdate,
  PortfolioSharing, PortfolioSharingCreate, PortfolioSharingUpdate,
  PublicPortfolio, PublicPortfolioCreate, PublicPortfolioUpdate,
  PortfolioExport, PortfolioExportCreate, PortfolioExportUpdate,
  ResearchProject, ResearchProjectCreate, ResearchProjectUpdate,
  InnovationLab, InnovationLabCreate, InnovationLabUpdate,
  Publication, PublicationCreate, PublicationUpdate,
  ResearchRepository, ResearchRepositoryCreate, ResearchRepositoryUpdate,
  ResearchGrant, ResearchGrantCreate, ResearchGrantUpdate,
  ResearchTeam, ResearchTeamCreate, ResearchTeamUpdate,
  ResearchAnalytics, ResearchAnalyticsCreate, ResearchAnalyticsUpdate,
  ResearchKPI, ResearchKPICreate, ResearchKPIUpdate,
  PatentTracking, PatentTrackingCreate, PatentTrackingUpdate,
  ResearchCollaboration, ResearchCollaborationCreate, ResearchCollaborationUpdate,
  InternationalExam, InternationalExamCreate, InternationalExamUpdate,
  InternationalCredit, InternationalCreditCreate, InternationalCreditUpdate,
  CreditTransfer, CreditTransferCreate, CreditTransferUpdate,
  RecognitionEngine, RecognitionEngineCreate, RecognitionEngineUpdate,
} from '@educi/types';

const now = () => new Date().toISOString();

export interface AssessmentRepository {
  createAIQuestionGenerator(schoolId: string, data: AIQuestionGeneratorCreate): Promise<AIQuestionGenerator>;
  getAIQuestionGenerator(schoolId: string, id: string): Promise<AIQuestionGenerator | null>;
  updateAIQuestionGenerator(schoolId: string, id: string, data: AIQuestionGeneratorUpdate): Promise<AIQuestionGenerator>;
  deleteAIQuestionGenerator(schoolId: string, id: string): Promise<void>;
  listaIQuestionGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGenerator[]>;
  createAdaptiveExam(schoolId: string, data: AdaptiveExamCreate): Promise<AdaptiveExam>;
  getAdaptiveExam(schoolId: string, id: string): Promise<AdaptiveExam | null>;
  updateAdaptiveExam(schoolId: string, id: string, data: AdaptiveExamUpdate): Promise<AdaptiveExam>;
  deleteAdaptiveExam(schoolId: string, id: string): Promise<void>;
  listadaptiveExams(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveExam[]>;
  createDynamicQuestionDifficulty(schoolId: string, data: DynamicQuestionDifficultyCreate): Promise<DynamicQuestionDifficulty>;
  getDynamicQuestionDifficulty(schoolId: string, id: string): Promise<DynamicQuestionDifficulty | null>;
  updateDynamicQuestionDifficulty(schoolId: string, id: string, data: DynamicQuestionDifficultyUpdate): Promise<DynamicQuestionDifficulty>;
  deleteDynamicQuestionDifficulty(schoolId: string, id: string): Promise<void>;
  listdynamicQuestionDifficulties(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicQuestionDifficulty[]>;
  createAutomaticGrading(schoolId: string, data: AutomaticGradingCreate): Promise<AutomaticGrading>;
  getAutomaticGrading(schoolId: string, id: string): Promise<AutomaticGrading | null>;
  updateAutomaticGrading(schoolId: string, id: string, data: AutomaticGradingUpdate): Promise<AutomaticGrading>;
  deleteAutomaticGrading(schoolId: string, id: string): Promise<void>;
  listautomaticGradings(schoolId: string, filters?: Record<string, unknown>): Promise<AutomaticGrading[]>;
  createEssayEvaluationAI(schoolId: string, data: EssayEvaluationAICreate): Promise<EssayEvaluationAI>;
  getEssayEvaluationAI(schoolId: string, id: string): Promise<EssayEvaluationAI | null>;
  updateEssayEvaluationAI(schoolId: string, id: string, data: EssayEvaluationAIUpdate): Promise<EssayEvaluationAI>;
  deleteEssayEvaluationAI(schoolId: string, id: string): Promise<void>;
  listessayEvaluationAIs(schoolId: string, filters?: Record<string, unknown>): Promise<EssayEvaluationAI[]>;
  createCodingAssessment(schoolId: string, data: CodingAssessmentCreate): Promise<CodingAssessment>;
  getCodingAssessment(schoolId: string, id: string): Promise<CodingAssessment | null>;
  updateCodingAssessment(schoolId: string, id: string, data: CodingAssessmentUpdate): Promise<CodingAssessment>;
  deleteCodingAssessment(schoolId: string, id: string): Promise<void>;
  listcodingAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<CodingAssessment[]>;
  createPracticalAssessment(schoolId: string, data: PracticalAssessmentCreate): Promise<PracticalAssessment>;
  getPracticalAssessment(schoolId: string, id: string): Promise<PracticalAssessment | null>;
  updatePracticalAssessment(schoolId: string, id: string, data: PracticalAssessmentUpdate): Promise<PracticalAssessment>;
  deletePracticalAssessment(schoolId: string, id: string): Promise<void>;
  listpracticalAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<PracticalAssessment[]>;
  createOralExamination(schoolId: string, data: OralExaminationCreate): Promise<OralExamination>;
  getOralExamination(schoolId: string, id: string): Promise<OralExamination | null>;
  updateOralExamination(schoolId: string, id: string, data: OralExaminationUpdate): Promise<OralExamination>;
  deleteOralExamination(schoolId: string, id: string): Promise<void>;
  listoralExaminations(schoolId: string, filters?: Record<string, unknown>): Promise<OralExamination[]>;
  createExamBlueprint(schoolId: string, data: ExamBlueprintCreate): Promise<ExamBlueprint>;
  getExamBlueprint(schoolId: string, id: string): Promise<ExamBlueprint | null>;
  updateExamBlueprint(schoolId: string, id: string, data: ExamBlueprintUpdate): Promise<ExamBlueprint>;
  deleteExamBlueprint(schoolId: string, id: string): Promise<void>;
  listexamBlueprints(schoolId: string, filters?: Record<string, unknown>): Promise<ExamBlueprint[]>;
  createQuestionRandomizer(schoolId: string, data: QuestionRandomizerCreate): Promise<QuestionRandomizer>;
  getQuestionRandomizer(schoolId: string, id: string): Promise<QuestionRandomizer | null>;
  updateQuestionRandomizer(schoolId: string, id: string, data: QuestionRandomizerUpdate): Promise<QuestionRandomizer>;
  deleteQuestionRandomizer(schoolId: string, id: string): Promise<void>;
  listquestionRandomizers(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionRandomizer[]>;
  createQuestionPool(schoolId: string, data: QuestionPoolCreate): Promise<QuestionPool>;
  getQuestionPool(schoolId: string, id: string): Promise<QuestionPool | null>;
  updateQuestionPool(schoolId: string, id: string, data: QuestionPoolUpdate): Promise<QuestionPool>;
  deleteQuestionPool(schoolId: string, id: string): Promise<void>;
  listquestionPools(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionPool[]>;
  createExamSession(schoolId: string, data: ExamSessionCreate): Promise<ExamSession>;
  getExamSession(schoolId: string, id: string): Promise<ExamSession | null>;
  updateExamSession(schoolId: string, id: string, data: ExamSessionUpdate): Promise<ExamSession>;
  deleteExamSession(schoolId: string, id: string): Promise<void>;
  listexamSessions(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSession[]>;
  createExamAttempt(schoolId: string, data: ExamAttemptCreate): Promise<ExamAttempt>;
  getExamAttempt(schoolId: string, id: string): Promise<ExamAttempt | null>;
  updateExamAttempt(schoolId: string, id: string, data: ExamAttemptUpdate): Promise<ExamAttempt>;
  deleteExamAttempt(schoolId: string, id: string): Promise<void>;
  listexamAttempts(schoolId: string, filters?: Record<string, unknown>): Promise<ExamAttempt[]>;
  createSecureBrowser(schoolId: string, data: SecureBrowserCreate): Promise<SecureBrowser>;
  getSecureBrowser(schoolId: string, id: string): Promise<SecureBrowser | null>;
  updateSecureBrowser(schoolId: string, id: string, data: SecureBrowserUpdate): Promise<SecureBrowser>;
  deleteSecureBrowser(schoolId: string, id: string): Promise<void>;
  listsecureBrowsers(schoolId: string, filters?: Record<string, unknown>): Promise<SecureBrowser[]>;
  createProctoringAI(schoolId: string, data: ProctoringAICreate): Promise<ProctoringAI>;
  getProctoringAI(schoolId: string, id: string): Promise<ProctoringAI | null>;
  updateProctoringAI(schoolId: string, id: string, data: ProctoringAIUpdate): Promise<ProctoringAI>;
  deleteProctoringAI(schoolId: string, id: string): Promise<void>;
  listproctoringAIs(schoolId: string, filters?: Record<string, unknown>): Promise<ProctoringAI[]>;
  createCheatingDetection(schoolId: string, data: CheatingDetectionCreate): Promise<CheatingDetection>;
  getCheatingDetection(schoolId: string, id: string): Promise<CheatingDetection | null>;
  updateCheatingDetection(schoolId: string, id: string, data: CheatingDetectionUpdate): Promise<CheatingDetection>;
  deleteCheatingDetection(schoolId: string, id: string): Promise<void>;
  listcheatingDetections(schoolId: string, filters?: Record<string, unknown>): Promise<CheatingDetection[]>;
  createFaceVerification(schoolId: string, data: FaceVerificationCreate): Promise<FaceVerification>;
  getFaceVerification(schoolId: string, id: string): Promise<FaceVerification | null>;
  updateFaceVerification(schoolId: string, id: string, data: FaceVerificationUpdate): Promise<FaceVerification>;
  deleteFaceVerification(schoolId: string, id: string): Promise<void>;
  listfaceVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<FaceVerification[]>;
  createScreenMonitoring(schoolId: string, data: ScreenMonitoringCreate): Promise<ScreenMonitoring>;
  getScreenMonitoring(schoolId: string, id: string): Promise<ScreenMonitoring | null>;
  updateScreenMonitoring(schoolId: string, id: string, data: ScreenMonitoringUpdate): Promise<ScreenMonitoring>;
  deleteScreenMonitoring(schoolId: string, id: string): Promise<void>;
  listscreenMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<ScreenMonitoring[]>;
  createMicrophoneMonitoring(schoolId: string, data: MicrophoneMonitoringCreate): Promise<MicrophoneMonitoring>;
  getMicrophoneMonitoring(schoolId: string, id: string): Promise<MicrophoneMonitoring | null>;
  updateMicrophoneMonitoring(schoolId: string, id: string, data: MicrophoneMonitoringUpdate): Promise<MicrophoneMonitoring>;
  deleteMicrophoneMonitoring(schoolId: string, id: string): Promise<void>;
  listmicrophoneMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<MicrophoneMonitoring[]>;
  createExamLockdown(schoolId: string, data: ExamLockdownCreate): Promise<ExamLockdown>;
  getExamLockdown(schoolId: string, id: string): Promise<ExamLockdown | null>;
  updateExamLockdown(schoolId: string, id: string, data: ExamLockdownUpdate): Promise<ExamLockdown>;
  deleteExamLockdown(schoolId: string, id: string): Promise<void>;
  listexamLockdowns(schoolId: string, filters?: Record<string, unknown>): Promise<ExamLockdown[]>;
  createQuestionCategory(schoolId: string, data: QuestionCategoryCreate): Promise<QuestionCategory>;
  getQuestionCategory(schoolId: string, id: string): Promise<QuestionCategory | null>;
  updateQuestionCategory(schoolId: string, id: string, data: QuestionCategoryUpdate): Promise<QuestionCategory>;
  deleteQuestionCategory(schoolId: string, id: string): Promise<void>;
  listquestionCategories(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionCategory[]>;
  createQuestionTag(schoolId: string, data: QuestionTagCreate): Promise<QuestionTag>;
  getQuestionTag(schoolId: string, id: string): Promise<QuestionTag | null>;
  updateQuestionTag(schoolId: string, id: string, data: QuestionTagUpdate): Promise<QuestionTag>;
  deleteQuestionTag(schoolId: string, id: string): Promise<void>;
  listquestionTags(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionTag[]>;
  createQuestionDifficultyConfig(schoolId: string, data: QuestionDifficultyConfigCreate): Promise<QuestionDifficultyConfig>;
  getQuestionDifficultyConfig(schoolId: string, id: string): Promise<QuestionDifficultyConfig | null>;
  updateQuestionDifficultyConfig(schoolId: string, id: string, data: QuestionDifficultyConfigUpdate): Promise<QuestionDifficultyConfig>;
  deleteQuestionDifficultyConfig(schoolId: string, id: string): Promise<void>;
  listquestionDifficultyConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionDifficultyConfig[]>;
  createQuestionMetadata(schoolId: string, data: QuestionMetadataCreate): Promise<QuestionMetadata>;
  getQuestionMetadata(schoolId: string, id: string): Promise<QuestionMetadata | null>;
  updateQuestionMetadata(schoolId: string, id: string, data: QuestionMetadataUpdate): Promise<QuestionMetadata>;
  deleteQuestionMetadata(schoolId: string, id: string): Promise<void>;
  listquestionMetadatas(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionMetadata[]>;
  createQuestionVersion(schoolId: string, data: QuestionVersionCreate): Promise<QuestionVersion>;
  getQuestionVersion(schoolId: string, id: string): Promise<QuestionVersion | null>;
  updateQuestionVersion(schoolId: string, id: string, data: QuestionVersionUpdate): Promise<QuestionVersion>;
  deleteQuestionVersion(schoolId: string, id: string): Promise<void>;
  listquestionVersions(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionVersion[]>;
  createQuestionApprovalWorkflow(schoolId: string, data: QuestionApprovalWorkflowCreate): Promise<QuestionApprovalWorkflow>;
  getQuestionApprovalWorkflow(schoolId: string, id: string): Promise<QuestionApprovalWorkflow | null>;
  updateQuestionApprovalWorkflow(schoolId: string, id: string, data: QuestionApprovalWorkflowUpdate): Promise<QuestionApprovalWorkflow>;
  deleteQuestionApprovalWorkflow(schoolId: string, id: string): Promise<void>;
  listquestionApprovalWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionApprovalWorkflow[]>;
  createQuestionReview(schoolId: string, data: QuestionReviewCreate): Promise<QuestionReview>;
  getQuestionReview(schoolId: string, id: string): Promise<QuestionReview | null>;
  updateQuestionReview(schoolId: string, id: string, data: QuestionReviewUpdate): Promise<QuestionReview>;
  deleteQuestionReview(schoolId: string, id: string): Promise<void>;
  listquestionReviews(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionReview[]>;
  createQuestionStatistic(schoolId: string, data: QuestionStatisticCreate): Promise<QuestionStatistic>;
  getQuestionStatistic(schoolId: string, id: string): Promise<QuestionStatistic | null>;
  updateQuestionStatistic(schoolId: string, id: string, data: QuestionStatisticUpdate): Promise<QuestionStatistic>;
  deleteQuestionStatistic(schoolId: string, id: string): Promise<void>;
  listquestionStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionStatistic[]>;
  createImportQuestionJob(schoolId: string, data: ImportQuestionJobCreate): Promise<ImportQuestionJob>;
  getImportQuestionJob(schoolId: string, id: string): Promise<ImportQuestionJob | null>;
  updateImportQuestionJob(schoolId: string, id: string, data: ImportQuestionJobUpdate): Promise<ImportQuestionJob>;
  deleteImportQuestionJob(schoolId: string, id: string): Promise<void>;
  listimportQuestionJobs(schoolId: string, filters?: Record<string, unknown>): Promise<ImportQuestionJob[]>;
  createExportQuestionJob(schoolId: string, data: ExportQuestionJobCreate): Promise<ExportQuestionJob>;
  getExportQuestionJob(schoolId: string, id: string): Promise<ExportQuestionJob | null>;
  updateExportQuestionJob(schoolId: string, id: string, data: ExportQuestionJobUpdate): Promise<ExportQuestionJob>;
  deleteExportQuestionJob(schoolId: string, id: string): Promise<void>;
  listexportQuestionJobs(schoolId: string, filters?: Record<string, unknown>): Promise<ExportQuestionJob[]>;
  createBulkEditJob(schoolId: string, data: BulkEditJobCreate): Promise<BulkEditJob>;
  getBulkEditJob(schoolId: string, id: string): Promise<BulkEditJob | null>;
  updateBulkEditJob(schoolId: string, id: string, data: BulkEditJobUpdate): Promise<BulkEditJob>;
  deleteBulkEditJob(schoolId: string, id: string): Promise<void>;
  listbulkEditJobs(schoolId: string, filters?: Record<string, unknown>): Promise<BulkEditJob[]>;
  createOCRQuestionImport(schoolId: string, data: OCRQuestionImportCreate): Promise<OCRQuestionImport>;
  getOCRQuestionImport(schoolId: string, id: string): Promise<OCRQuestionImport | null>;
  updateOCRQuestionImport(schoolId: string, id: string, data: OCRQuestionImportUpdate): Promise<OCRQuestionImport>;
  deleteOCRQuestionImport(schoolId: string, id: string): Promise<void>;
  listoCRQuestionImports(schoolId: string, filters?: Record<string, unknown>): Promise<OCRQuestionImport[]>;
  createAIQuestionGeneration(schoolId: string, data: AIQuestionGenerationCreate): Promise<AIQuestionGeneration>;
  getAIQuestionGeneration(schoolId: string, id: string): Promise<AIQuestionGeneration | null>;
  updateAIQuestionGeneration(schoolId: string, id: string, data: AIQuestionGenerationUpdate): Promise<AIQuestionGeneration>;
  deleteAIQuestionGeneration(schoolId: string, id: string): Promise<void>;
  listaIQuestionGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGeneration[]>;
  createQuestionTranslation(schoolId: string, data: QuestionTranslationCreate): Promise<QuestionTranslation>;
  getQuestionTranslation(schoolId: string, id: string): Promise<QuestionTranslation | null>;
  updateQuestionTranslation(schoolId: string, id: string, data: QuestionTranslationUpdate): Promise<QuestionTranslation>;
  deleteQuestionTranslation(schoolId: string, id: string): Promise<void>;
  listquestionTranslations(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionTranslation[]>;
  createQuestionValidation(schoolId: string, data: QuestionValidationCreate): Promise<QuestionValidation>;
  getQuestionValidation(schoolId: string, id: string): Promise<QuestionValidation | null>;
  updateQuestionValidation(schoolId: string, id: string, data: QuestionValidationUpdate): Promise<QuestionValidation>;
  deleteQuestionValidation(schoolId: string, id: string): Promise<void>;
  listquestionValidations(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionValidation[]>;
  createDuplicateDetection(schoolId: string, data: DuplicateDetectionCreate): Promise<DuplicateDetection>;
  getDuplicateDetection(schoolId: string, id: string): Promise<DuplicateDetection | null>;
  updateDuplicateDetection(schoolId: string, id: string, data: DuplicateDetectionUpdate): Promise<DuplicateDetection>;
  deleteDuplicateDetection(schoolId: string, id: string): Promise<void>;
  listduplicateDetections(schoolId: string, filters?: Record<string, unknown>): Promise<DuplicateDetection[]>;
  createCertificate(schoolId: string, data: CertificateCreate): Promise<Certificate>;
  getCertificate(schoolId: string, id: string): Promise<Certificate | null>;
  updateCertificate(schoolId: string, id: string, data: CertificateUpdate): Promise<Certificate>;
  deleteCertificate(schoolId: string, id: string): Promise<void>;
  listcertificates(schoolId: string, filters?: Record<string, unknown>): Promise<Certificate[]>;
  createDigitalCertificate(schoolId: string, data: DigitalCertificateCreate): Promise<DigitalCertificate>;
  getDigitalCertificate(schoolId: string, id: string): Promise<DigitalCertificate | null>;
  updateDigitalCertificate(schoolId: string, id: string, data: DigitalCertificateUpdate): Promise<DigitalCertificate>;
  deleteDigitalCertificate(schoolId: string, id: string): Promise<void>;
  listdigitalCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificate[]>;
  createBlockchainCertificate(schoolId: string, data: BlockchainCertificateCreate): Promise<BlockchainCertificate>;
  getBlockchainCertificate(schoolId: string, id: string): Promise<BlockchainCertificate | null>;
  updateBlockchainCertificate(schoolId: string, id: string, data: BlockchainCertificateUpdate): Promise<BlockchainCertificate>;
  deleteBlockchainCertificate(schoolId: string, id: string): Promise<void>;
  listblockchainCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainCertificate[]>;
  createQRVerification(schoolId: string, data: QRVerificationCreate): Promise<QRVerification>;
  getQRVerification(schoolId: string, id: string): Promise<QRVerification | null>;
  updateQRVerification(schoolId: string, id: string, data: QRVerificationUpdate): Promise<QRVerification>;
  deleteQRVerification(schoolId: string, id: string): Promise<void>;
  listqRVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<QRVerification[]>;
  createPublicVerification(schoolId: string, data: PublicVerificationCreate): Promise<PublicVerification>;
  getPublicVerification(schoolId: string, id: string): Promise<PublicVerification | null>;
  updatePublicVerification(schoolId: string, id: string, data: PublicVerificationUpdate): Promise<PublicVerification>;
  deletePublicVerification(schoolId: string, id: string): Promise<void>;
  listpublicVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<PublicVerification[]>;
  createCertificateTemplate(schoolId: string, data: CertificateTemplateCreate): Promise<CertificateTemplate>;
  getCertificateTemplate(schoolId: string, id: string): Promise<CertificateTemplate | null>;
  updateCertificateTemplate(schoolId: string, id: string, data: CertificateTemplateUpdate): Promise<CertificateTemplate>;
  deleteCertificateTemplate(schoolId: string, id: string): Promise<void>;
  listcertificateTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateTemplate[]>;
  createCertificateBranding(schoolId: string, data: CertificateBrandingCreate): Promise<CertificateBranding>;
  getCertificateBranding(schoolId: string, id: string): Promise<CertificateBranding | null>;
  updateCertificateBranding(schoolId: string, id: string, data: CertificateBrandingUpdate): Promise<CertificateBranding>;
  deleteCertificateBranding(schoolId: string, id: string): Promise<void>;
  listcertificateBrandings(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateBranding[]>;
  createCertificateExpiration(schoolId: string, data: CertificateExpirationCreate): Promise<CertificateExpiration>;
  getCertificateExpiration(schoolId: string, id: string): Promise<CertificateExpiration | null>;
  updateCertificateExpiration(schoolId: string, id: string, data: CertificateExpirationUpdate): Promise<CertificateExpiration>;
  deleteCertificateExpiration(schoolId: string, id: string): Promise<void>;
  listcertificateExpirations(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateExpiration[]>;
  createCertificateRenewal(schoolId: string, data: CertificateRenewalCreate): Promise<CertificateRenewal>;
  getCertificateRenewal(schoolId: string, id: string): Promise<CertificateRenewal | null>;
  updateCertificateRenewal(schoolId: string, id: string, data: CertificateRenewalUpdate): Promise<CertificateRenewal>;
  deleteCertificateRenewal(schoolId: string, id: string): Promise<void>;
  listcertificateRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRenewal[]>;
  createCertificateValidation(schoolId: string, data: CertificateValidationCreate): Promise<CertificateValidation>;
  getCertificateValidation(schoolId: string, id: string): Promise<CertificateValidation | null>;
  updateCertificateValidation(schoolId: string, id: string, data: CertificateValidationUpdate): Promise<CertificateValidation>;
  deleteCertificateValidation(schoolId: string, id: string): Promise<void>;
  listcertificateValidations(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateValidation[]>;
  createCertificateRevocation(schoolId: string, data: CertificateRevocationCreate): Promise<CertificateRevocation>;
  getCertificateRevocation(schoolId: string, id: string): Promise<CertificateRevocation | null>;
  updateCertificateRevocation(schoolId: string, id: string, data: CertificateRevocationUpdate): Promise<CertificateRevocation>;
  deleteCertificateRevocation(schoolId: string, id: string): Promise<void>;
  listcertificateRevocations(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRevocation[]>;
  createCertificateRegistry(schoolId: string, data: CertificateRegistryCreate): Promise<CertificateRegistry>;
  getCertificateRegistry(schoolId: string, id: string): Promise<CertificateRegistry | null>;
  updateCertificateRegistry(schoolId: string, id: string, data: CertificateRegistryUpdate): Promise<CertificateRegistry>;
  deleteCertificateRegistry(schoolId: string, id: string): Promise<void>;
  listcertificateRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRegistry[]>;
  createMicroCredential(schoolId: string, data: MicroCredentialCreate): Promise<MicroCredential>;
  getMicroCredential(schoolId: string, id: string): Promise<MicroCredential | null>;
  updateMicroCredential(schoolId: string, id: string, data: MicroCredentialUpdate): Promise<MicroCredential>;
  deleteMicroCredential(schoolId: string, id: string): Promise<void>;
  listmicroCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<MicroCredential[]>;
  createSkillBadge(schoolId: string, data: SkillBadgeCreate): Promise<SkillBadge>;
  getSkillBadge(schoolId: string, id: string): Promise<SkillBadge | null>;
  updateSkillBadge(schoolId: string, id: string, data: SkillBadgeUpdate): Promise<SkillBadge>;
  deleteSkillBadge(schoolId: string, id: string): Promise<void>;
  listskillBadges(schoolId: string, filters?: Record<string, unknown>): Promise<SkillBadge[]>;
  createOpenBadge(schoolId: string, data: OpenBadgeCreate): Promise<OpenBadge>;
  getOpenBadge(schoolId: string, id: string): Promise<OpenBadge | null>;
  updateOpenBadge(schoolId: string, id: string, data: OpenBadgeUpdate): Promise<OpenBadge>;
  deleteOpenBadge(schoolId: string, id: string): Promise<void>;
  listopenBadges(schoolId: string, filters?: Record<string, unknown>): Promise<OpenBadge[]>;
  createAchievementCertificate(schoolId: string, data: AchievementCertificateCreate): Promise<AchievementCertificate>;
  getAchievementCertificate(schoolId: string, id: string): Promise<AchievementCertificate | null>;
  updateAchievementCertificate(schoolId: string, id: string, data: AchievementCertificateUpdate): Promise<AchievementCertificate>;
  deleteAchievementCertificate(schoolId: string, id: string): Promise<void>;
  listachievementCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<AchievementCertificate[]>;
  createAcademicCertificate(schoolId: string, data: AcademicCertificateCreate): Promise<AcademicCertificate>;
  getAcademicCertificate(schoolId: string, id: string): Promise<AcademicCertificate | null>;
  updateAcademicCertificate(schoolId: string, id: string, data: AcademicCertificateUpdate): Promise<AcademicCertificate>;
  deleteAcademicCertificate(schoolId: string, id: string): Promise<void>;
  listacademicCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicCertificate[]>;
  createProfessionalCertificate(schoolId: string, data: ProfessionalCertificateCreate): Promise<ProfessionalCertificate>;
  getProfessionalCertificate(schoolId: string, id: string): Promise<ProfessionalCertificate | null>;
  updateProfessionalCertificate(schoolId: string, id: string, data: ProfessionalCertificateUpdate): Promise<ProfessionalCertificate>;
  deleteProfessionalCertificate(schoolId: string, id: string): Promise<void>;
  listprofessionalCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<ProfessionalCertificate[]>;
  createTranscriptGenerator(schoolId: string, data: TranscriptGeneratorCreate): Promise<TranscriptGenerator>;
  getTranscriptGenerator(schoolId: string, id: string): Promise<TranscriptGenerator | null>;
  updateTranscriptGenerator(schoolId: string, id: string, data: TranscriptGeneratorUpdate): Promise<TranscriptGenerator>;
  deleteTranscriptGenerator(schoolId: string, id: string): Promise<void>;
  listtranscriptGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<TranscriptGenerator[]>;
  createDigitalDiploma(schoolId: string, data: DigitalDiplomaCreate): Promise<DigitalDiploma>;
  getDigitalDiploma(schoolId: string, id: string): Promise<DigitalDiploma | null>;
  updateDigitalDiploma(schoolId: string, id: string, data: DigitalDiplomaUpdate): Promise<DigitalDiploma>;
  deleteDigitalDiploma(schoolId: string, id: string): Promise<void>;
  listdigitalDiplomas(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalDiploma[]>;
  createCompetencyTest(schoolId: string, data: CompetencyTestCreate): Promise<CompetencyTest>;
  getCompetencyTest(schoolId: string, id: string): Promise<CompetencyTest | null>;
  updateCompetencyTest(schoolId: string, id: string, data: CompetencyTestUpdate): Promise<CompetencyTest>;
  deleteCompetencyTest(schoolId: string, id: string): Promise<void>;
  listcompetencyTests(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyTest[]>;
  createSkillMatrix(schoolId: string, data: SkillMatrixCreate): Promise<SkillMatrix>;
  getSkillMatrix(schoolId: string, id: string): Promise<SkillMatrix | null>;
  updateSkillMatrix(schoolId: string, id: string, data: SkillMatrixUpdate): Promise<SkillMatrix>;
  deleteSkillMatrix(schoolId: string, id: string): Promise<void>;
  listskillMatrixs(schoolId: string, filters?: Record<string, unknown>): Promise<SkillMatrix[]>;
  createCompetencyLevelConfig(schoolId: string, data: CompetencyLevelConfigCreate): Promise<CompetencyLevelConfig>;
  getCompetencyLevelConfig(schoolId: string, id: string): Promise<CompetencyLevelConfig | null>;
  updateCompetencyLevelConfig(schoolId: string, id: string, data: CompetencyLevelConfigUpdate): Promise<CompetencyLevelConfig>;
  deleteCompetencyLevelConfig(schoolId: string, id: string): Promise<void>;
  listcompetencyLevelConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyLevelConfig[]>;
  createCompetencyRubric(schoolId: string, data: CompetencyRubricCreate): Promise<CompetencyRubric>;
  getCompetencyRubric(schoolId: string, id: string): Promise<CompetencyRubric | null>;
  updateCompetencyRubric(schoolId: string, id: string, data: CompetencyRubricUpdate): Promise<CompetencyRubric>;
  deleteCompetencyRubric(schoolId: string, id: string): Promise<void>;
  listcompetencyRubrics(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyRubric[]>;
  createPerformanceRubric(schoolId: string, data: PerformanceRubricCreate): Promise<PerformanceRubric>;
  getPerformanceRubric(schoolId: string, id: string): Promise<PerformanceRubric | null>;
  updatePerformanceRubric(schoolId: string, id: string, data: PerformanceRubricUpdate): Promise<PerformanceRubric>;
  deletePerformanceRubric(schoolId: string, id: string): Promise<void>;
  listperformanceRubrics(schoolId: string, filters?: Record<string, unknown>): Promise<PerformanceRubric[]>;
  createPortfolio(schoolId: string, data: PortfolioCreate): Promise<Portfolio>;
  getPortfolio(schoolId: string, id: string): Promise<Portfolio | null>;
  updatePortfolio(schoolId: string, id: string, data: PortfolioUpdate): Promise<Portfolio>;
  deletePortfolio(schoolId: string, id: string): Promise<void>;
  listportfolios(schoolId: string, filters?: Record<string, unknown>): Promise<Portfolio[]>;
  createPeerAssessment(schoolId: string, data: PeerAssessmentCreate): Promise<PeerAssessment>;
  getPeerAssessment(schoolId: string, id: string): Promise<PeerAssessment | null>;
  updatePeerAssessment(schoolId: string, id: string, data: PeerAssessmentUpdate): Promise<PeerAssessment>;
  deletePeerAssessment(schoolId: string, id: string): Promise<void>;
  listpeerAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<PeerAssessment[]>;
  createSelfAssessment(schoolId: string, data: SelfAssessmentCreate): Promise<SelfAssessment>;
  getSelfAssessment(schoolId: string, id: string): Promise<SelfAssessment | null>;
  updateSelfAssessment(schoolId: string, id: string, data: SelfAssessmentUpdate): Promise<SelfAssessment>;
  deleteSelfAssessment(schoolId: string, id: string): Promise<void>;
  listselfAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<SelfAssessment[]>;
  createTeacherAssessment(schoolId: string, data: TeacherAssessmentCreate): Promise<TeacherAssessment>;
  getTeacherAssessment(schoolId: string, id: string): Promise<TeacherAssessment | null>;
  updateTeacherAssessment(schoolId: string, id: string, data: TeacherAssessmentUpdate): Promise<TeacherAssessment>;
  deleteTeacherAssessment(schoolId: string, id: string): Promise<void>;
  listteacherAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherAssessment[]>;
  createExternalAssessment(schoolId: string, data: ExternalAssessmentCreate): Promise<ExternalAssessment>;
  getExternalAssessment(schoolId: string, id: string): Promise<ExternalAssessment | null>;
  updateExternalAssessment(schoolId: string, id: string, data: ExternalAssessmentUpdate): Promise<ExternalAssessment>;
  deleteExternalAssessment(schoolId: string, id: string): Promise<void>;
  listexternalAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<ExternalAssessment[]>;
  createCompetencyReport(schoolId: string, data: CompetencyReportCreate): Promise<CompetencyReport>;
  getCompetencyReport(schoolId: string, id: string): Promise<CompetencyReport | null>;
  updateCompetencyReport(schoolId: string, id: string, data: CompetencyReportUpdate): Promise<CompetencyReport>;
  deleteCompetencyReport(schoolId: string, id: string): Promise<void>;
  listcompetencyReports(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyReport[]>;
  createGapAnalysis(schoolId: string, data: GapAnalysisCreate): Promise<GapAnalysis>;
  getGapAnalysis(schoolId: string, id: string): Promise<GapAnalysis | null>;
  updateGapAnalysis(schoolId: string, id: string, data: GapAnalysisUpdate): Promise<GapAnalysis>;
  deleteGapAnalysis(schoolId: string, id: string): Promise<void>;
  listgapAnalysises(schoolId: string, filters?: Record<string, unknown>): Promise<GapAnalysis[]>;
  createLearningPathSuggestion(schoolId: string, data: LearningPathSuggestionCreate): Promise<LearningPathSuggestion>;
  getLearningPathSuggestion(schoolId: string, id: string): Promise<LearningPathSuggestion | null>;
  updateLearningPathSuggestion(schoolId: string, id: string, data: LearningPathSuggestionUpdate): Promise<LearningPathSuggestion>;
  deleteLearningPathSuggestion(schoolId: string, id: string): Promise<void>;
  listlearningPathSuggestions(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPathSuggestion[]>;
  createCertificationEligibility(schoolId: string, data: CertificationEligibilityCreate): Promise<CertificationEligibility>;
  getCertificationEligibility(schoolId: string, id: string): Promise<CertificationEligibility | null>;
  updateCertificationEligibility(schoolId: string, id: string, data: CertificationEligibilityUpdate): Promise<CertificationEligibility>;
  deleteCertificationEligibility(schoolId: string, id: string): Promise<void>;
  listcertificationEligibilities(schoolId: string, filters?: Record<string, unknown>): Promise<CertificationEligibility[]>;
  createSkillEvolutionTracking(schoolId: string, data: SkillEvolutionTrackingCreate): Promise<SkillEvolutionTracking>;
  getSkillEvolutionTracking(schoolId: string, id: string): Promise<SkillEvolutionTracking | null>;
  updateSkillEvolutionTracking(schoolId: string, id: string, data: SkillEvolutionTrackingUpdate): Promise<SkillEvolutionTracking>;
  deleteSkillEvolutionTracking(schoolId: string, id: string): Promise<void>;
  listskillEvolutionTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<SkillEvolutionTracking[]>;
  createNationalExam(schoolId: string, data: NationalExamCreate): Promise<NationalExam>;
  getNationalExam(schoolId: string, id: string): Promise<NationalExam | null>;
  updateNationalExam(schoolId: string, id: string, data: NationalExamUpdate): Promise<NationalExam>;
  deleteNationalExam(schoolId: string, id: string): Promise<void>;
  listnationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<NationalExam[]>;
  createExamCenter(schoolId: string, data: ExamCenterCreate): Promise<ExamCenter>;
  getExamCenter(schoolId: string, id: string): Promise<ExamCenter | null>;
  updateExamCenter(schoolId: string, id: string, data: ExamCenterUpdate): Promise<ExamCenter>;
  deleteExamCenter(schoolId: string, id: string): Promise<void>;
  listexamCenters(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCenter[]>;
  createSeatAllocation(schoolId: string, data: SeatAllocationCreate): Promise<SeatAllocation>;
  getSeatAllocation(schoolId: string, id: string): Promise<SeatAllocation | null>;
  updateSeatAllocation(schoolId: string, id: string, data: SeatAllocationUpdate): Promise<SeatAllocation>;
  deleteSeatAllocation(schoolId: string, id: string): Promise<void>;
  listseatAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<SeatAllocation[]>;
  createCandidateRegistration(schoolId: string, data: CandidateRegistrationCreate): Promise<CandidateRegistration>;
  getCandidateRegistration(schoolId: string, id: string): Promise<CandidateRegistration | null>;
  updateCandidateRegistration(schoolId: string, id: string, data: CandidateRegistrationUpdate): Promise<CandidateRegistration>;
  deleteCandidateRegistration(schoolId: string, id: string): Promise<void>;
  listcandidateRegistrations(schoolId: string, filters?: Record<string, unknown>): Promise<CandidateRegistration[]>;
  createAnonymousNumber(schoolId: string, data: AnonymousNumberCreate): Promise<AnonymousNumber>;
  getAnonymousNumber(schoolId: string, id: string): Promise<AnonymousNumber | null>;
  updateAnonymousNumber(schoolId: string, id: string, data: AnonymousNumberUpdate): Promise<AnonymousNumber>;
  deleteAnonymousNumber(schoolId: string, id: string): Promise<void>;
  listanonymousNumbers(schoolId: string, filters?: Record<string, unknown>): Promise<AnonymousNumber[]>;
  createExamDistribution(schoolId: string, data: ExamDistributionCreate): Promise<ExamDistribution>;
  getExamDistribution(schoolId: string, id: string): Promise<ExamDistribution | null>;
  updateExamDistribution(schoolId: string, id: string, data: ExamDistributionUpdate): Promise<ExamDistribution>;
  deleteExamDistribution(schoolId: string, id: string): Promise<void>;
  listexamDistributions(schoolId: string, filters?: Record<string, unknown>): Promise<ExamDistribution[]>;
  createSecurePrinting(schoolId: string, data: SecurePrintingCreate): Promise<SecurePrinting>;
  getSecurePrinting(schoolId: string, id: string): Promise<SecurePrinting | null>;
  updateSecurePrinting(schoolId: string, id: string, data: SecurePrintingUpdate): Promise<SecurePrinting>;
  deleteSecurePrinting(schoolId: string, id: string): Promise<void>;
  listsecurePrintings(schoolId: string, filters?: Record<string, unknown>): Promise<SecurePrinting[]>;
  createCorrectionCenter(schoolId: string, data: CorrectionCenterCreate): Promise<CorrectionCenter>;
  getCorrectionCenter(schoolId: string, id: string): Promise<CorrectionCenter | null>;
  updateCorrectionCenter(schoolId: string, id: string, data: CorrectionCenterUpdate): Promise<CorrectionCenter>;
  deleteCorrectionCenter(schoolId: string, id: string): Promise<void>;
  listcorrectionCenters(schoolId: string, filters?: Record<string, unknown>): Promise<CorrectionCenter[]>;
  createMarkerAssignment(schoolId: string, data: MarkerAssignmentCreate): Promise<MarkerAssignment>;
  getMarkerAssignment(schoolId: string, id: string): Promise<MarkerAssignment | null>;
  updateMarkerAssignment(schoolId: string, id: string, data: MarkerAssignmentUpdate): Promise<MarkerAssignment>;
  deleteMarkerAssignment(schoolId: string, id: string): Promise<void>;
  listmarkerAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<MarkerAssignment[]>;
  createDoubleMarking(schoolId: string, data: DoubleMarkingCreate): Promise<DoubleMarking>;
  getDoubleMarking(schoolId: string, id: string): Promise<DoubleMarking | null>;
  updateDoubleMarking(schoolId: string, id: string, data: DoubleMarkingUpdate): Promise<DoubleMarking>;
  deleteDoubleMarking(schoolId: string, id: string): Promise<void>;
  listdoubleMarkings(schoolId: string, filters?: Record<string, unknown>): Promise<DoubleMarking[]>;
  createModeration(schoolId: string, data: ModerationCreate): Promise<Moderation>;
  getModeration(schoolId: string, id: string): Promise<Moderation | null>;
  updateModeration(schoolId: string, id: string, data: ModerationUpdate): Promise<Moderation>;
  deleteModeration(schoolId: string, id: string): Promise<void>;
  listmoderations(schoolId: string, filters?: Record<string, unknown>): Promise<Moderation[]>;
  createAppeal(schoolId: string, data: AppealCreate): Promise<Appeal>;
  getAppeal(schoolId: string, id: string): Promise<Appeal | null>;
  updateAppeal(schoolId: string, id: string, data: AppealUpdate): Promise<Appeal>;
  deleteAppeal(schoolId: string, id: string): Promise<void>;
  listappeals(schoolId: string, filters?: Record<string, unknown>): Promise<Appeal[]>;
  createResultsPublication(schoolId: string, data: ResultsPublicationCreate): Promise<ResultsPublication>;
  getResultsPublication(schoolId: string, id: string): Promise<ResultsPublication | null>;
  updateResultsPublication(schoolId: string, id: string, data: ResultsPublicationUpdate): Promise<ResultsPublication>;
  deleteResultsPublication(schoolId: string, id: string): Promise<void>;
  listresultsPublications(schoolId: string, filters?: Record<string, unknown>): Promise<ResultsPublication[]>;
  createExamRanking(schoolId: string, data: ExamRankingCreate): Promise<ExamRanking>;
  getExamRanking(schoolId: string, id: string): Promise<ExamRanking | null>;
  updateExamRanking(schoolId: string, id: string, data: ExamRankingUpdate): Promise<ExamRanking>;
  deleteExamRanking(schoolId: string, id: string): Promise<void>;
  listexamRankings(schoolId: string, filters?: Record<string, unknown>): Promise<ExamRanking[]>;
  createNationalAnalytics(schoolId: string, data: NationalAnalyticsCreate): Promise<NationalAnalytics>;
  getNationalAnalytics(schoolId: string, id: string): Promise<NationalAnalytics | null>;
  updateNationalAnalytics(schoolId: string, id: string, data: NationalAnalyticsUpdate): Promise<NationalAnalytics>;
  deleteNationalAnalytics(schoolId: string, id: string): Promise<void>;
  listnationalAnalyticses(schoolId: string, filters?: Record<string, unknown>): Promise<NationalAnalytics[]>;
  createSchoolAccreditation(schoolId: string, data: SchoolAccreditationCreate): Promise<SchoolAccreditation>;
  getSchoolAccreditation(schoolId: string, id: string): Promise<SchoolAccreditation | null>;
  updateSchoolAccreditation(schoolId: string, id: string, data: SchoolAccreditationUpdate): Promise<SchoolAccreditation>;
  deleteSchoolAccreditation(schoolId: string, id: string): Promise<void>;
  listschoolAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolAccreditation[]>;
  createTeacherAccreditation(schoolId: string, data: TeacherAccreditationCreate): Promise<TeacherAccreditation>;
  getTeacherAccreditation(schoolId: string, id: string): Promise<TeacherAccreditation | null>;
  updateTeacherAccreditation(schoolId: string, id: string, data: TeacherAccreditationUpdate): Promise<TeacherAccreditation>;
  deleteTeacherAccreditation(schoolId: string, id: string): Promise<void>;
  listteacherAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherAccreditation[]>;
  createProgramAccreditation(schoolId: string, data: ProgramAccreditationCreate): Promise<ProgramAccreditation>;
  getProgramAccreditation(schoolId: string, id: string): Promise<ProgramAccreditation | null>;
  updateProgramAccreditation(schoolId: string, id: string, data: ProgramAccreditationUpdate): Promise<ProgramAccreditation>;
  deleteProgramAccreditation(schoolId: string, id: string): Promise<void>;
  listprogramAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<ProgramAccreditation[]>;
  createAuditFramework(schoolId: string, data: AuditFrameworkCreate): Promise<AuditFramework>;
  getAuditFramework(schoolId: string, id: string): Promise<AuditFramework | null>;
  updateAuditFramework(schoolId: string, id: string, data: AuditFrameworkUpdate): Promise<AuditFramework>;
  deleteAuditFramework(schoolId: string, id: string): Promise<void>;
  listauditFrameworks(schoolId: string, filters?: Record<string, unknown>): Promise<AuditFramework[]>;
  createComplianceCheck(schoolId: string, data: ComplianceCheckCreate): Promise<ComplianceCheck>;
  getComplianceCheck(schoolId: string, id: string): Promise<ComplianceCheck | null>;
  updateComplianceCheck(schoolId: string, id: string, data: ComplianceCheckUpdate): Promise<ComplianceCheck>;
  deleteComplianceCheck(schoolId: string, id: string): Promise<void>;
  listcomplianceChecks(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceCheck[]>;
  createEvidenceCollection(schoolId: string, data: EvidenceCollectionCreate): Promise<EvidenceCollection>;
  getEvidenceCollection(schoolId: string, id: string): Promise<EvidenceCollection | null>;
  updateEvidenceCollection(schoolId: string, id: string, data: EvidenceCollectionUpdate): Promise<EvidenceCollection>;
  deleteEvidenceCollection(schoolId: string, id: string): Promise<void>;
  listevidenceCollections(schoolId: string, filters?: Record<string, unknown>): Promise<EvidenceCollection[]>;
  createAccreditationReport(schoolId: string, data: AccreditationReportCreate): Promise<AccreditationReport>;
  getAccreditationReport(schoolId: string, id: string): Promise<AccreditationReport | null>;
  updateAccreditationReport(schoolId: string, id: string, data: AccreditationReportUpdate): Promise<AccreditationReport>;
  deleteAccreditationReport(schoolId: string, id: string): Promise<void>;
  listaccreditationReports(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationReport[]>;
  createAccreditationRecommendation(schoolId: string, data: AccreditationRecommendationCreate): Promise<AccreditationRecommendation>;
  getAccreditationRecommendation(schoolId: string, id: string): Promise<AccreditationRecommendation | null>;
  updateAccreditationRecommendation(schoolId: string, id: string, data: AccreditationRecommendationUpdate): Promise<AccreditationRecommendation>;
  deleteAccreditationRecommendation(schoolId: string, id: string): Promise<void>;
  listaccreditationRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationRecommendation[]>;
  createCorrectiveAction(schoolId: string, data: CorrectiveActionCreate): Promise<CorrectiveAction>;
  getCorrectiveAction(schoolId: string, id: string): Promise<CorrectiveAction | null>;
  updateCorrectiveAction(schoolId: string, id: string, data: CorrectiveActionUpdate): Promise<CorrectiveAction>;
  deleteCorrectiveAction(schoolId: string, id: string): Promise<void>;
  listcorrectiveActions(schoolId: string, filters?: Record<string, unknown>): Promise<CorrectiveAction[]>;
  createRenewalWorkflow(schoolId: string, data: RenewalWorkflowCreate): Promise<RenewalWorkflow>;
  getRenewalWorkflow(schoolId: string, id: string): Promise<RenewalWorkflow | null>;
  updateRenewalWorkflow(schoolId: string, id: string, data: RenewalWorkflowUpdate): Promise<RenewalWorkflow>;
  deleteRenewalWorkflow(schoolId: string, id: string): Promise<void>;
  listrenewalWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<RenewalWorkflow[]>;
  createPlagiarismDetection(schoolId: string, data: PlagiarismDetectionCreate): Promise<PlagiarismDetection>;
  getPlagiarismDetection(schoolId: string, id: string): Promise<PlagiarismDetection | null>;
  updatePlagiarismDetection(schoolId: string, id: string, data: PlagiarismDetectionUpdate): Promise<PlagiarismDetection>;
  deletePlagiarismDetection(schoolId: string, id: string): Promise<void>;
  listplagiarismDetections(schoolId: string, filters?: Record<string, unknown>): Promise<PlagiarismDetection[]>;
  createSimilarityDetection(schoolId: string, data: SimilarityDetectionCreate): Promise<SimilarityDetection>;
  getSimilarityDetection(schoolId: string, id: string): Promise<SimilarityDetection | null>;
  updateSimilarityDetection(schoolId: string, id: string, data: SimilarityDetectionUpdate): Promise<SimilarityDetection>;
  deleteSimilarityDetection(schoolId: string, id: string): Promise<void>;
  listsimilarityDetections(schoolId: string, filters?: Record<string, unknown>): Promise<SimilarityDetection[]>;
  createAIGeneratedContentDetection(schoolId: string, data: AIGeneratedContentDetectionCreate): Promise<AIGeneratedContentDetection>;
  getAIGeneratedContentDetection(schoolId: string, id: string): Promise<AIGeneratedContentDetection | null>;
  updateAIGeneratedContentDetection(schoolId: string, id: string, data: AIGeneratedContentDetectionUpdate): Promise<AIGeneratedContentDetection>;
  deleteAIGeneratedContentDetection(schoolId: string, id: string): Promise<void>;
  listaIGeneratedContentDetections(schoolId: string, filters?: Record<string, unknown>): Promise<AIGeneratedContentDetection[]>;
  createCitationChecker(schoolId: string, data: CitationCheckerCreate): Promise<CitationChecker>;
  getCitationChecker(schoolId: string, id: string): Promise<CitationChecker | null>;
  updateCitationChecker(schoolId: string, id: string, data: CitationCheckerUpdate): Promise<CitationChecker>;
  deleteCitationChecker(schoolId: string, id: string): Promise<void>;
  listcitationCheckers(schoolId: string, filters?: Record<string, unknown>): Promise<CitationChecker[]>;
  createAcademicIntegrity(schoolId: string, data: AcademicIntegrityCreate): Promise<AcademicIntegrity>;
  getAcademicIntegrity(schoolId: string, id: string): Promise<AcademicIntegrity | null>;
  updateAcademicIntegrity(schoolId: string, id: string, data: AcademicIntegrityUpdate): Promise<AcademicIntegrity>;
  deleteAcademicIntegrity(schoolId: string, id: string): Promise<void>;
  listacademicIntegrities(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicIntegrity[]>;
  createFraudDetection(schoolId: string, data: FraudDetectionCreate): Promise<FraudDetection>;
  getFraudDetection(schoolId: string, id: string): Promise<FraudDetection | null>;
  updateFraudDetection(schoolId: string, id: string, data: FraudDetectionUpdate): Promise<FraudDetection>;
  deleteFraudDetection(schoolId: string, id: string): Promise<void>;
  listfraudDetections(schoolId: string, filters?: Record<string, unknown>): Promise<FraudDetection[]>;
  createForgeryDetection(schoolId: string, data: ForgeryDetectionCreate): Promise<ForgeryDetection>;
  getForgeryDetection(schoolId: string, id: string): Promise<ForgeryDetection | null>;
  updateForgeryDetection(schoolId: string, id: string, data: ForgeryDetectionUpdate): Promise<ForgeryDetection>;
  deleteForgeryDetection(schoolId: string, id: string): Promise<void>;
  listforgeryDetections(schoolId: string, filters?: Record<string, unknown>): Promise<ForgeryDetection[]>;
  createIdentityVerification(schoolId: string, data: IdentityVerificationCreate): Promise<IdentityVerification>;
  getIdentityVerification(schoolId: string, id: string): Promise<IdentityVerification | null>;
  updateIdentityVerification(schoolId: string, id: string, data: IdentityVerificationUpdate): Promise<IdentityVerification>;
  deleteIdentityVerification(schoolId: string, id: string): Promise<void>;
  listidentityVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]>;
  createBehaviorAnalysis(schoolId: string, data: BehaviorAnalysisCreate): Promise<BehaviorAnalysis>;
  getBehaviorAnalysis(schoolId: string, id: string): Promise<BehaviorAnalysis | null>;
  updateBehaviorAnalysis(schoolId: string, id: string, data: BehaviorAnalysisUpdate): Promise<BehaviorAnalysis>;
  deleteBehaviorAnalysis(schoolId: string, id: string): Promise<void>;
  listbehaviorAnalysises(schoolId: string, filters?: Record<string, unknown>): Promise<BehaviorAnalysis[]>;
  createIntegrityRiskScore(schoolId: string, data: IntegrityRiskScoreCreate): Promise<IntegrityRiskScore>;
  getIntegrityRiskScore(schoolId: string, id: string): Promise<IntegrityRiskScore | null>;
  updateIntegrityRiskScore(schoolId: string, id: string, data: IntegrityRiskScoreUpdate): Promise<IntegrityRiskScore>;
  deleteIntegrityRiskScore(schoolId: string, id: string): Promise<void>;
  listintegrityRiskScores(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrityRiskScore[]>;
  createIntegrityReport(schoolId: string, data: IntegrityReportCreate): Promise<IntegrityReport>;
  getIntegrityReport(schoolId: string, id: string): Promise<IntegrityReport | null>;
  updateIntegrityReport(schoolId: string, id: string, data: IntegrityReportUpdate): Promise<IntegrityReport>;
  deleteIntegrityReport(schoolId: string, id: string): Promise<void>;
  listintegrityReports(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrityReport[]>;
  createStudentPortfolio(schoolId: string, data: StudentPortfolioCreate): Promise<StudentPortfolio>;
  getStudentPortfolio(schoolId: string, id: string): Promise<StudentPortfolio | null>;
  updateStudentPortfolio(schoolId: string, id: string, data: StudentPortfolioUpdate): Promise<StudentPortfolio>;
  deleteStudentPortfolio(schoolId: string, id: string): Promise<void>;
  liststudentPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<StudentPortfolio[]>;
  createTeacherPortfolio(schoolId: string, data: TeacherPortfolioCreate): Promise<TeacherPortfolio>;
  getTeacherPortfolio(schoolId: string, id: string): Promise<TeacherPortfolio | null>;
  updateTeacherPortfolio(schoolId: string, id: string, data: TeacherPortfolioUpdate): Promise<TeacherPortfolio>;
  deleteTeacherPortfolio(schoolId: string, id: string): Promise<void>;
  listteacherPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherPortfolio[]>;
  createCompetencyPortfolio(schoolId: string, data: CompetencyPortfolioCreate): Promise<CompetencyPortfolio>;
  getCompetencyPortfolio(schoolId: string, id: string): Promise<CompetencyPortfolio | null>;
  updateCompetencyPortfolio(schoolId: string, id: string, data: CompetencyPortfolioUpdate): Promise<CompetencyPortfolio>;
  deleteCompetencyPortfolio(schoolId: string, id: string): Promise<void>;
  listcompetencyPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyPortfolio[]>;
  createProject(schoolId: string, data: ProjectCreate): Promise<Project>;
  getProject(schoolId: string, id: string): Promise<Project | null>;
  updateProject(schoolId: string, id: string, data: ProjectUpdate): Promise<Project>;
  deleteProject(schoolId: string, id: string): Promise<void>;
  listprojects(schoolId: string, filters?: Record<string, unknown>): Promise<Project[]>;
  createResearchEntry(schoolId: string, data: ResearchEntryCreate): Promise<ResearchEntry>;
  getResearchEntry(schoolId: string, id: string): Promise<ResearchEntry | null>;
  updateResearchEntry(schoolId: string, id: string, data: ResearchEntryUpdate): Promise<ResearchEntry>;
  deleteResearchEntry(schoolId: string, id: string): Promise<void>;
  listresearchEntries(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchEntry[]>;
  createInternship(schoolId: string, data: InternshipCreate): Promise<Internship>;
  getInternship(schoolId: string, id: string): Promise<Internship | null>;
  updateInternship(schoolId: string, id: string, data: InternshipUpdate): Promise<Internship>;
  deleteInternship(schoolId: string, id: string): Promise<void>;
  listinternships(schoolId: string, filters?: Record<string, unknown>): Promise<Internship[]>;
  createMediaItem(schoolId: string, data: MediaItemCreate): Promise<MediaItem>;
  getMediaItem(schoolId: string, id: string): Promise<MediaItem | null>;
  updateMediaItem(schoolId: string, id: string, data: MediaItemUpdate): Promise<MediaItem>;
  deleteMediaItem(schoolId: string, id: string): Promise<void>;
  listmediaItems(schoolId: string, filters?: Record<string, unknown>): Promise<MediaItem[]>;
  createPortfolioSharing(schoolId: string, data: PortfolioSharingCreate): Promise<PortfolioSharing>;
  getPortfolioSharing(schoolId: string, id: string): Promise<PortfolioSharing | null>;
  updatePortfolioSharing(schoolId: string, id: string, data: PortfolioSharingUpdate): Promise<PortfolioSharing>;
  deletePortfolioSharing(schoolId: string, id: string): Promise<void>;
  listportfolioSharings(schoolId: string, filters?: Record<string, unknown>): Promise<PortfolioSharing[]>;
  createPublicPortfolio(schoolId: string, data: PublicPortfolioCreate): Promise<PublicPortfolio>;
  getPublicPortfolio(schoolId: string, id: string): Promise<PublicPortfolio | null>;
  updatePublicPortfolio(schoolId: string, id: string, data: PublicPortfolioUpdate): Promise<PublicPortfolio>;
  deletePublicPortfolio(schoolId: string, id: string): Promise<void>;
  listpublicPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<PublicPortfolio[]>;
  createPortfolioExport(schoolId: string, data: PortfolioExportCreate): Promise<PortfolioExport>;
  getPortfolioExport(schoolId: string, id: string): Promise<PortfolioExport | null>;
  updatePortfolioExport(schoolId: string, id: string, data: PortfolioExportUpdate): Promise<PortfolioExport>;
  deletePortfolioExport(schoolId: string, id: string): Promise<void>;
  listportfolioExports(schoolId: string, filters?: Record<string, unknown>): Promise<PortfolioExport[]>;
  createResearchProject(schoolId: string, data: ResearchProjectCreate): Promise<ResearchProject>;
  getResearchProject(schoolId: string, id: string): Promise<ResearchProject | null>;
  updateResearchProject(schoolId: string, id: string, data: ResearchProjectUpdate): Promise<ResearchProject>;
  deleteResearchProject(schoolId: string, id: string): Promise<void>;
  listresearchProjects(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchProject[]>;
  createInnovationLab(schoolId: string, data: InnovationLabCreate): Promise<InnovationLab>;
  getInnovationLab(schoolId: string, id: string): Promise<InnovationLab | null>;
  updateInnovationLab(schoolId: string, id: string, data: InnovationLabUpdate): Promise<InnovationLab>;
  deleteInnovationLab(schoolId: string, id: string): Promise<void>;
  listinnovationLabs(schoolId: string, filters?: Record<string, unknown>): Promise<InnovationLab[]>;
  createPublication(schoolId: string, data: PublicationCreate): Promise<Publication>;
  getPublication(schoolId: string, id: string): Promise<Publication | null>;
  updatePublication(schoolId: string, id: string, data: PublicationUpdate): Promise<Publication>;
  deletePublication(schoolId: string, id: string): Promise<void>;
  listpublications(schoolId: string, filters?: Record<string, unknown>): Promise<Publication[]>;
  createResearchRepository(schoolId: string, data: ResearchRepositoryCreate): Promise<ResearchRepository>;
  getResearchRepository(schoolId: string, id: string): Promise<ResearchRepository | null>;
  updateResearchRepository(schoolId: string, id: string, data: ResearchRepositoryUpdate): Promise<ResearchRepository>;
  deleteResearchRepository(schoolId: string, id: string): Promise<void>;
  listresearchRepositories(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchRepository[]>;
  createResearchGrant(schoolId: string, data: ResearchGrantCreate): Promise<ResearchGrant>;
  getResearchGrant(schoolId: string, id: string): Promise<ResearchGrant | null>;
  updateResearchGrant(schoolId: string, id: string, data: ResearchGrantUpdate): Promise<ResearchGrant>;
  deleteResearchGrant(schoolId: string, id: string): Promise<void>;
  listresearchGrants(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchGrant[]>;
  createResearchTeam(schoolId: string, data: ResearchTeamCreate): Promise<ResearchTeam>;
  getResearchTeam(schoolId: string, id: string): Promise<ResearchTeam | null>;
  updateResearchTeam(schoolId: string, id: string, data: ResearchTeamUpdate): Promise<ResearchTeam>;
  deleteResearchTeam(schoolId: string, id: string): Promise<void>;
  listresearchTeams(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchTeam[]>;
  createResearchAnalytics(schoolId: string, data: ResearchAnalyticsCreate): Promise<ResearchAnalytics>;
  getResearchAnalytics(schoolId: string, id: string): Promise<ResearchAnalytics | null>;
  updateResearchAnalytics(schoolId: string, id: string, data: ResearchAnalyticsUpdate): Promise<ResearchAnalytics>;
  deleteResearchAnalytics(schoolId: string, id: string): Promise<void>;
  listresearchAnalyticses(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchAnalytics[]>;
  createResearchKPI(schoolId: string, data: ResearchKPICreate): Promise<ResearchKPI>;
  getResearchKPI(schoolId: string, id: string): Promise<ResearchKPI | null>;
  updateResearchKPI(schoolId: string, id: string, data: ResearchKPIUpdate): Promise<ResearchKPI>;
  deleteResearchKPI(schoolId: string, id: string): Promise<void>;
  listresearchKPIs(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchKPI[]>;
  createPatentTracking(schoolId: string, data: PatentTrackingCreate): Promise<PatentTracking>;
  getPatentTracking(schoolId: string, id: string): Promise<PatentTracking | null>;
  updatePatentTracking(schoolId: string, id: string, data: PatentTrackingUpdate): Promise<PatentTracking>;
  deletePatentTracking(schoolId: string, id: string): Promise<void>;
  listpatentTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<PatentTracking[]>;
  createResearchCollaboration(schoolId: string, data: ResearchCollaborationCreate): Promise<ResearchCollaboration>;
  getResearchCollaboration(schoolId: string, id: string): Promise<ResearchCollaboration | null>;
  updateResearchCollaboration(schoolId: string, id: string, data: ResearchCollaborationUpdate): Promise<ResearchCollaboration>;
  deleteResearchCollaboration(schoolId: string, id: string): Promise<void>;
  listresearchCollaborations(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchCollaboration[]>;
  createInternationalExam(schoolId: string, data: InternationalExamCreate): Promise<InternationalExam>;
  getInternationalExam(schoolId: string, id: string): Promise<InternationalExam | null>;
  updateInternationalExam(schoolId: string, id: string, data: InternationalExamUpdate): Promise<InternationalExam>;
  deleteInternationalExam(schoolId: string, id: string): Promise<void>;
  listinternationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalExam[]>;
  createInternationalCredit(schoolId: string, data: InternationalCreditCreate): Promise<InternationalCredit>;
  getInternationalCredit(schoolId: string, id: string): Promise<InternationalCredit | null>;
  updateInternationalCredit(schoolId: string, id: string, data: InternationalCreditUpdate): Promise<InternationalCredit>;
  deleteInternationalCredit(schoolId: string, id: string): Promise<void>;
  listinternationalCredits(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalCredit[]>;
  createCreditTransfer(schoolId: string, data: CreditTransferCreate): Promise<CreditTransfer>;
  getCreditTransfer(schoolId: string, id: string): Promise<CreditTransfer | null>;
  updateCreditTransfer(schoolId: string, id: string, data: CreditTransferUpdate): Promise<CreditTransfer>;
  deleteCreditTransfer(schoolId: string, id: string): Promise<void>;
  listcreditTransfers(schoolId: string, filters?: Record<string, unknown>): Promise<CreditTransfer[]>;
  createRecognitionEngine(schoolId: string, data: RecognitionEngineCreate): Promise<RecognitionEngine>;
  getRecognitionEngine(schoolId: string, id: string): Promise<RecognitionEngine | null>;
  updateRecognitionEngine(schoolId: string, id: string, data: RecognitionEngineUpdate): Promise<RecognitionEngine>;
  deleteRecognitionEngine(schoolId: string, id: string): Promise<void>;
  listrecognitionEngines(schoolId: string, filters?: Record<string, unknown>): Promise<RecognitionEngine[]>;
}

export class AssessmentRepositoryImpl implements AssessmentRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new AppError(`Assessment entity not found: ${id}`, 'ASSESSMENT_ENTITY_NOT_FOUND', 404);
  }

  // ─── AIQuestionGenerator ───────────────────────────────────────────────────
  async createAIQuestionGenerator(schoolId: string, data: AIQuestionGeneratorCreate): Promise<AIQuestionGenerator> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ai_question_generators')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATOR_CREATE_FAILED', 500);
    return result;
  }

  async getAIQuestionGenerator(schoolId: string, id: string): Promise<AIQuestionGenerator | null> {
    const { data, error } = await this.supabase
      .from('ai_question_generators')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAIQuestionGenerator(schoolId: string, id: string, data: AIQuestionGeneratorUpdate): Promise<AIQuestionGenerator> {
    const { data: result, error } = await this.supabase
      .from('ai_question_generators')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAIQuestionGenerator(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_question_generators')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATOR_DELETE_FAILED', 500);
  }

  async listaIQuestionGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGenerator[]> {
    let query = this.supabase.from('ai_question_generators').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AdaptiveExam ──────────────────────────────────────────────────────────
  async createAdaptiveExam(schoolId: string, data: AdaptiveExamCreate): Promise<AdaptiveExam> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('adaptive_exams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ADAPTIVE_EXAM_CREATE_FAILED', 500);
    return result;
  }

  async getAdaptiveExam(schoolId: string, id: string): Promise<AdaptiveExam | null> {
    const { data, error } = await this.supabase
      .from('adaptive_exams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAdaptiveExam(schoolId: string, id: string, data: AdaptiveExamUpdate): Promise<AdaptiveExam> {
    const { data: result, error } = await this.supabase
      .from('adaptive_exams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ADAPTIVE_EXAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAdaptiveExam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('adaptive_exams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ADAPTIVE_EXAM_DELETE_FAILED', 500);
  }

  async listadaptiveExams(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveExam[]> {
    let query = this.supabase.from('adaptive_exams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ADAPTIVE_EXAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DynamicQuestionDifficulty ─────────────────────────────────────────────
  async createDynamicQuestionDifficulty(schoolId: string, data: DynamicQuestionDifficultyCreate): Promise<DynamicQuestionDifficulty> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('dynamic_question_difficulties')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DYNAMIC_QUESTION_DIFFICULTY_CREATE_FAILED', 500);
    return result;
  }

  async getDynamicQuestionDifficulty(schoolId: string, id: string): Promise<DynamicQuestionDifficulty | null> {
    const { data, error } = await this.supabase
      .from('dynamic_question_difficulties')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDynamicQuestionDifficulty(schoolId: string, id: string, data: DynamicQuestionDifficultyUpdate): Promise<DynamicQuestionDifficulty> {
    const { data: result, error } = await this.supabase
      .from('dynamic_question_difficulties')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DYNAMIC_QUESTION_DIFFICULTY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDynamicQuestionDifficulty(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dynamic_question_difficulties')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_DYNAMIC_QUESTION_DIFFICULTY_DELETE_FAILED', 500);
  }

  async listdynamicQuestionDifficulties(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicQuestionDifficulty[]> {
    let query = this.supabase.from('dynamic_question_difficulties').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_DYNAMIC_QUESTION_DIFFICULTY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AutomaticGrading ──────────────────────────────────────────────────────
  async createAutomaticGrading(schoolId: string, data: AutomaticGradingCreate): Promise<AutomaticGrading> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('automatic_gradings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUTOMATIC_GRADING_CREATE_FAILED', 500);
    return result;
  }

  async getAutomaticGrading(schoolId: string, id: string): Promise<AutomaticGrading | null> {
    const { data, error } = await this.supabase
      .from('automatic_gradings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomaticGrading(schoolId: string, id: string, data: AutomaticGradingUpdate): Promise<AutomaticGrading> {
    const { data: result, error } = await this.supabase
      .from('automatic_gradings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUTOMATIC_GRADING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAutomaticGrading(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automatic_gradings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUTOMATIC_GRADING_DELETE_FAILED', 500);
  }

  async listautomaticGradings(schoolId: string, filters?: Record<string, unknown>): Promise<AutomaticGrading[]> {
    let query = this.supabase.from('automatic_gradings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUTOMATIC_GRADING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── EssayEvaluationAI ─────────────────────────────────────────────────────
  async createEssayEvaluationAI(schoolId: string, data: EssayEvaluationAICreate): Promise<EssayEvaluationAI> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('essay_evaluations_ai')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ESSAY_EVALUATION_AI_CREATE_FAILED', 500);
    return result;
  }

  async getEssayEvaluationAI(schoolId: string, id: string): Promise<EssayEvaluationAI | null> {
    const { data, error } = await this.supabase
      .from('essay_evaluations_ai')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEssayEvaluationAI(schoolId: string, id: string, data: EssayEvaluationAIUpdate): Promise<EssayEvaluationAI> {
    const { data: result, error } = await this.supabase
      .from('essay_evaluations_ai')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ESSAY_EVALUATION_AI_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEssayEvaluationAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('essay_evaluations_ai')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ESSAY_EVALUATION_AI_DELETE_FAILED', 500);
  }

  async listessayEvaluationAIs(schoolId: string, filters?: Record<string, unknown>): Promise<EssayEvaluationAI[]> {
    let query = this.supabase.from('essay_evaluations_ai').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ESSAY_EVALUATION_AI_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CodingAssessment ──────────────────────────────────────────────────────
  async createCodingAssessment(schoolId: string, data: CodingAssessmentCreate): Promise<CodingAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('coding_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CODING_ASSESSMENT_CREATE_FAILED', 500);
    return result;
  }

  async getCodingAssessment(schoolId: string, id: string): Promise<CodingAssessment | null> {
    const { data, error } = await this.supabase
      .from('coding_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCodingAssessment(schoolId: string, id: string, data: CodingAssessmentUpdate): Promise<CodingAssessment> {
    const { data: result, error } = await this.supabase
      .from('coding_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CODING_ASSESSMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCodingAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('coding_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CODING_ASSESSMENT_DELETE_FAILED', 500);
  }

  async listcodingAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<CodingAssessment[]> {
    let query = this.supabase.from('coding_assessments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CODING_ASSESSMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PracticalAssessment ───────────────────────────────────────────────────
  async createPracticalAssessment(schoolId: string, data: PracticalAssessmentCreate): Promise<PracticalAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('practical_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PRACTICAL_ASSESSMENT_CREATE_FAILED', 500);
    return result;
  }

  async getPracticalAssessment(schoolId: string, id: string): Promise<PracticalAssessment | null> {
    const { data, error } = await this.supabase
      .from('practical_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePracticalAssessment(schoolId: string, id: string, data: PracticalAssessmentUpdate): Promise<PracticalAssessment> {
    const { data: result, error } = await this.supabase
      .from('practical_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PRACTICAL_ASSESSMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deletePracticalAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('practical_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PRACTICAL_ASSESSMENT_DELETE_FAILED', 500);
  }

  async listpracticalAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<PracticalAssessment[]> {
    let query = this.supabase.from('practical_assessments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PRACTICAL_ASSESSMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── OralExamination ───────────────────────────────────────────────────────
  async createOralExamination(schoolId: string, data: OralExaminationCreate): Promise<OralExamination> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('oral_examinations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ORAL_EXAMINATION_CREATE_FAILED', 500);
    return result;
  }

  async getOralExamination(schoolId: string, id: string): Promise<OralExamination | null> {
    const { data, error } = await this.supabase
      .from('oral_examinations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateOralExamination(schoolId: string, id: string, data: OralExaminationUpdate): Promise<OralExamination> {
    const { data: result, error } = await this.supabase
      .from('oral_examinations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ORAL_EXAMINATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteOralExamination(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('oral_examinations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ORAL_EXAMINATION_DELETE_FAILED', 500);
  }

  async listoralExaminations(schoolId: string, filters?: Record<string, unknown>): Promise<OralExamination[]> {
    let query = this.supabase.from('oral_examinations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ORAL_EXAMINATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamBlueprint ─────────────────────────────────────────────────────────
  async createExamBlueprint(schoolId: string, data: ExamBlueprintCreate): Promise<ExamBlueprint> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_blueprints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_BLUEPRINT_CREATE_FAILED', 500);
    return result;
  }

  async getExamBlueprint(schoolId: string, id: string): Promise<ExamBlueprint | null> {
    const { data, error } = await this.supabase
      .from('exam_blueprints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamBlueprint(schoolId: string, id: string, data: ExamBlueprintUpdate): Promise<ExamBlueprint> {
    const { data: result, error } = await this.supabase
      .from('exam_blueprints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_BLUEPRINT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamBlueprint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_blueprints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_BLUEPRINT_DELETE_FAILED', 500);
  }

  async listexamBlueprints(schoolId: string, filters?: Record<string, unknown>): Promise<ExamBlueprint[]> {
    let query = this.supabase.from('exam_blueprints').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_BLUEPRINT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionRandomizer ────────────────────────────────────────────────────
  async createQuestionRandomizer(schoolId: string, data: QuestionRandomizerCreate): Promise<QuestionRandomizer> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_randomizers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_RANDOMIZER_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionRandomizer(schoolId: string, id: string): Promise<QuestionRandomizer | null> {
    const { data, error } = await this.supabase
      .from('question_randomizers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionRandomizer(schoolId: string, id: string, data: QuestionRandomizerUpdate): Promise<QuestionRandomizer> {
    const { data: result, error } = await this.supabase
      .from('question_randomizers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_RANDOMIZER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionRandomizer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_randomizers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_RANDOMIZER_DELETE_FAILED', 500);
  }

  async listquestionRandomizers(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionRandomizer[]> {
    let query = this.supabase.from('question_randomizers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_RANDOMIZER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionPool ──────────────────────────────────────────────────────────
  async createQuestionPool(schoolId: string, data: QuestionPoolCreate): Promise<QuestionPool> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_pools')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_POOL_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionPool(schoolId: string, id: string): Promise<QuestionPool | null> {
    const { data, error } = await this.supabase
      .from('question_pools')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionPool(schoolId: string, id: string, data: QuestionPoolUpdate): Promise<QuestionPool> {
    const { data: result, error } = await this.supabase
      .from('question_pools')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_POOL_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionPool(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_pools')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_POOL_DELETE_FAILED', 500);
  }

  async listquestionPools(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionPool[]> {
    let query = this.supabase.from('question_pools').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_POOL_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamSession ───────────────────────────────────────────────────────────
  async createExamSession(schoolId: string, data: ExamSessionCreate): Promise<ExamSession> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_sessions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_SESSION_CREATE_FAILED', 500);
    return result;
  }

  async getExamSession(schoolId: string, id: string): Promise<ExamSession | null> {
    const { data, error } = await this.supabase
      .from('exam_sessions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamSession(schoolId: string, id: string, data: ExamSessionUpdate): Promise<ExamSession> {
    const { data: result, error } = await this.supabase
      .from('exam_sessions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_SESSION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamSession(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_sessions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_SESSION_DELETE_FAILED', 500);
  }

  async listexamSessions(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSession[]> {
    let query = this.supabase.from('exam_sessions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_SESSION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamAttempt ───────────────────────────────────────────────────────────
  async createExamAttempt(schoolId: string, data: ExamAttemptCreate): Promise<ExamAttempt> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_attempts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_ATTEMPT_CREATE_FAILED', 500);
    return result;
  }

  async getExamAttempt(schoolId: string, id: string): Promise<ExamAttempt | null> {
    const { data, error } = await this.supabase
      .from('exam_attempts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamAttempt(schoolId: string, id: string, data: ExamAttemptUpdate): Promise<ExamAttempt> {
    const { data: result, error } = await this.supabase
      .from('exam_attempts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_ATTEMPT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamAttempt(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_attempts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_ATTEMPT_DELETE_FAILED', 500);
  }

  async listexamAttempts(schoolId: string, filters?: Record<string, unknown>): Promise<ExamAttempt[]> {
    let query = this.supabase.from('exam_attempts').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_ATTEMPT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SecureBrowser ─────────────────────────────────────────────────────────
  async createSecureBrowser(schoolId: string, data: SecureBrowserCreate): Promise<SecureBrowser> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('secure_browsers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_BROWSER_CREATE_FAILED', 500);
    return result;
  }

  async getSecureBrowser(schoolId: string, id: string): Promise<SecureBrowser | null> {
    const { data, error } = await this.supabase
      .from('secure_browsers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSecureBrowser(schoolId: string, id: string, data: SecureBrowserUpdate): Promise<SecureBrowser> {
    const { data: result, error } = await this.supabase
      .from('secure_browsers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_BROWSER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSecureBrowser(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('secure_browsers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_BROWSER_DELETE_FAILED', 500);
  }

  async listsecureBrowsers(schoolId: string, filters?: Record<string, unknown>): Promise<SecureBrowser[]> {
    let query = this.supabase.from('secure_browsers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_BROWSER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ProctoringAI ──────────────────────────────────────────────────────────
  async createProctoringAI(schoolId: string, data: ProctoringAICreate): Promise<ProctoringAI> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('proctoring_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROCTORING_AI_CREATE_FAILED', 500);
    return result;
  }

  async getProctoringAI(schoolId: string, id: string): Promise<ProctoringAI | null> {
    const { data, error } = await this.supabase
      .from('proctoring_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProctoringAI(schoolId: string, id: string, data: ProctoringAIUpdate): Promise<ProctoringAI> {
    const { data: result, error } = await this.supabase
      .from('proctoring_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROCTORING_AI_UPDATE_FAILED', 500);
    return result;
  }

  async deleteProctoringAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('proctoring_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROCTORING_AI_DELETE_FAILED', 500);
  }

  async listproctoringAIs(schoolId: string, filters?: Record<string, unknown>): Promise<ProctoringAI[]> {
    let query = this.supabase.from('proctoring_ais').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROCTORING_AI_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CheatingDetection ─────────────────────────────────────────────────────
  async createCheatingDetection(schoolId: string, data: CheatingDetectionCreate): Promise<CheatingDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('cheating_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CHEATING_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getCheatingDetection(schoolId: string, id: string): Promise<CheatingDetection | null> {
    const { data, error } = await this.supabase
      .from('cheating_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCheatingDetection(schoolId: string, id: string, data: CheatingDetectionUpdate): Promise<CheatingDetection> {
    const { data: result, error } = await this.supabase
      .from('cheating_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CHEATING_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCheatingDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cheating_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CHEATING_DETECTION_DELETE_FAILED', 500);
  }

  async listcheatingDetections(schoolId: string, filters?: Record<string, unknown>): Promise<CheatingDetection[]> {
    let query = this.supabase.from('cheating_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CHEATING_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── FaceVerification ──────────────────────────────────────────────────────
  async createFaceVerification(schoolId: string, data: FaceVerificationCreate): Promise<FaceVerification> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('face_verifications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_FACE_VERIFICATION_CREATE_FAILED', 500);
    return result;
  }

  async getFaceVerification(schoolId: string, id: string): Promise<FaceVerification | null> {
    const { data, error } = await this.supabase
      .from('face_verifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateFaceVerification(schoolId: string, id: string, data: FaceVerificationUpdate): Promise<FaceVerification> {
    const { data: result, error } = await this.supabase
      .from('face_verifications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_FACE_VERIFICATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteFaceVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('face_verifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_FACE_VERIFICATION_DELETE_FAILED', 500);
  }

  async listfaceVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<FaceVerification[]> {
    let query = this.supabase.from('face_verifications').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_FACE_VERIFICATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ScreenMonitoring ──────────────────────────────────────────────────────
  async createScreenMonitoring(schoolId: string, data: ScreenMonitoringCreate): Promise<ScreenMonitoring> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('screen_monitorings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCREEN_MONITORING_CREATE_FAILED', 500);
    return result;
  }

  async getScreenMonitoring(schoolId: string, id: string): Promise<ScreenMonitoring | null> {
    const { data, error } = await this.supabase
      .from('screen_monitorings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateScreenMonitoring(schoolId: string, id: string, data: ScreenMonitoringUpdate): Promise<ScreenMonitoring> {
    const { data: result, error } = await this.supabase
      .from('screen_monitorings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCREEN_MONITORING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteScreenMonitoring(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('screen_monitorings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCREEN_MONITORING_DELETE_FAILED', 500);
  }

  async listscreenMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<ScreenMonitoring[]> {
    let query = this.supabase.from('screen_monitorings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCREEN_MONITORING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MicrophoneMonitoring ──────────────────────────────────────────────────
  async createMicrophoneMonitoring(schoolId: string, data: MicrophoneMonitoringCreate): Promise<MicrophoneMonitoring> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('microphone_monitorings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICROPHONE_MONITORING_CREATE_FAILED', 500);
    return result;
  }

  async getMicrophoneMonitoring(schoolId: string, id: string): Promise<MicrophoneMonitoring | null> {
    const { data, error } = await this.supabase
      .from('microphone_monitorings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMicrophoneMonitoring(schoolId: string, id: string, data: MicrophoneMonitoringUpdate): Promise<MicrophoneMonitoring> {
    const { data: result, error } = await this.supabase
      .from('microphone_monitorings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICROPHONE_MONITORING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMicrophoneMonitoring(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('microphone_monitorings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICROPHONE_MONITORING_DELETE_FAILED', 500);
  }

  async listmicrophoneMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<MicrophoneMonitoring[]> {
    let query = this.supabase.from('microphone_monitorings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICROPHONE_MONITORING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamLockdown ──────────────────────────────────────────────────────────
  async createExamLockdown(schoolId: string, data: ExamLockdownCreate): Promise<ExamLockdown> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_lockdowns')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_LOCKDOWN_CREATE_FAILED', 500);
    return result;
  }

  async getExamLockdown(schoolId: string, id: string): Promise<ExamLockdown | null> {
    const { data, error } = await this.supabase
      .from('exam_lockdowns')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamLockdown(schoolId: string, id: string, data: ExamLockdownUpdate): Promise<ExamLockdown> {
    const { data: result, error } = await this.supabase
      .from('exam_lockdowns')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_LOCKDOWN_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamLockdown(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_lockdowns')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_LOCKDOWN_DELETE_FAILED', 500);
  }

  async listexamLockdowns(schoolId: string, filters?: Record<string, unknown>): Promise<ExamLockdown[]> {
    let query = this.supabase.from('exam_lockdowns').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_LOCKDOWN_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionCategory ──────────────────────────────────────────────────────
  async createQuestionCategory(schoolId: string, data: QuestionCategoryCreate): Promise<QuestionCategory> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_categories')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_CATEGORY_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionCategory(schoolId: string, id: string): Promise<QuestionCategory | null> {
    const { data, error } = await this.supabase
      .from('question_categories')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionCategory(schoolId: string, id: string, data: QuestionCategoryUpdate): Promise<QuestionCategory> {
    const { data: result, error } = await this.supabase
      .from('question_categories')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_CATEGORY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionCategory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_categories')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_CATEGORY_DELETE_FAILED', 500);
  }

  async listquestionCategories(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionCategory[]> {
    let query = this.supabase.from('question_categories').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_CATEGORY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionTag ───────────────────────────────────────────────────────────
  async createQuestionTag(schoolId: string, data: QuestionTagCreate): Promise<QuestionTag> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_tags')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TAG_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionTag(schoolId: string, id: string): Promise<QuestionTag | null> {
    const { data, error } = await this.supabase
      .from('question_tags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionTag(schoolId: string, id: string, data: QuestionTagUpdate): Promise<QuestionTag> {
    const { data: result, error } = await this.supabase
      .from('question_tags')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TAG_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionTag(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_tags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TAG_DELETE_FAILED', 500);
  }

  async listquestionTags(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionTag[]> {
    let query = this.supabase.from('question_tags').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TAG_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionDifficultyConfig ──────────────────────────────────────────────
  async createQuestionDifficultyConfig(schoolId: string, data: QuestionDifficultyConfigCreate): Promise<QuestionDifficultyConfig> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_difficulty_configs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_DIFFICULTY_CONFIG_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionDifficultyConfig(schoolId: string, id: string): Promise<QuestionDifficultyConfig | null> {
    const { data, error } = await this.supabase
      .from('question_difficulty_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionDifficultyConfig(schoolId: string, id: string, data: QuestionDifficultyConfigUpdate): Promise<QuestionDifficultyConfig> {
    const { data: result, error } = await this.supabase
      .from('question_difficulty_configs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_DIFFICULTY_CONFIG_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionDifficultyConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_difficulty_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_DIFFICULTY_CONFIG_DELETE_FAILED', 500);
  }

  async listquestionDifficultyConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionDifficultyConfig[]> {
    let query = this.supabase.from('question_difficulty_configs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_DIFFICULTY_CONFIG_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionMetadata ──────────────────────────────────────────────────────
  async createQuestionMetadata(schoolId: string, data: QuestionMetadataCreate): Promise<QuestionMetadata> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_metadata')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_METADATA_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionMetadata(schoolId: string, id: string): Promise<QuestionMetadata | null> {
    const { data, error } = await this.supabase
      .from('question_metadata')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionMetadata(schoolId: string, id: string, data: QuestionMetadataUpdate): Promise<QuestionMetadata> {
    const { data: result, error } = await this.supabase
      .from('question_metadata')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_METADATA_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionMetadata(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_metadata')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_METADATA_DELETE_FAILED', 500);
  }

  async listquestionMetadatas(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionMetadata[]> {
    let query = this.supabase.from('question_metadata').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_METADATA_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionVersion ───────────────────────────────────────────────────────
  async createQuestionVersion(schoolId: string, data: QuestionVersionCreate): Promise<QuestionVersion> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_versions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VERSION_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionVersion(schoolId: string, id: string): Promise<QuestionVersion | null> {
    const { data, error } = await this.supabase
      .from('question_versions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionVersion(schoolId: string, id: string, data: QuestionVersionUpdate): Promise<QuestionVersion> {
    const { data: result, error } = await this.supabase
      .from('question_versions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VERSION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_versions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VERSION_DELETE_FAILED', 500);
  }

  async listquestionVersions(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionVersion[]> {
    let query = this.supabase.from('question_versions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VERSION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionApprovalWorkflow ──────────────────────────────────────────────
  async createQuestionApprovalWorkflow(schoolId: string, data: QuestionApprovalWorkflowCreate): Promise<QuestionApprovalWorkflow> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_approval_workflows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_APPROVAL_WORKFLOW_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionApprovalWorkflow(schoolId: string, id: string): Promise<QuestionApprovalWorkflow | null> {
    const { data, error } = await this.supabase
      .from('question_approval_workflows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionApprovalWorkflow(schoolId: string, id: string, data: QuestionApprovalWorkflowUpdate): Promise<QuestionApprovalWorkflow> {
    const { data: result, error } = await this.supabase
      .from('question_approval_workflows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_APPROVAL_WORKFLOW_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionApprovalWorkflow(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_approval_workflows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_APPROVAL_WORKFLOW_DELETE_FAILED', 500);
  }

  async listquestionApprovalWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionApprovalWorkflow[]> {
    let query = this.supabase.from('question_approval_workflows').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_APPROVAL_WORKFLOW_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionReview ────────────────────────────────────────────────────────
  async createQuestionReview(schoolId: string, data: QuestionReviewCreate): Promise<QuestionReview> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_reviews')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_REVIEW_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionReview(schoolId: string, id: string): Promise<QuestionReview | null> {
    const { data, error } = await this.supabase
      .from('question_reviews')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionReview(schoolId: string, id: string, data: QuestionReviewUpdate): Promise<QuestionReview> {
    const { data: result, error } = await this.supabase
      .from('question_reviews')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_REVIEW_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionReview(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_reviews')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_REVIEW_DELETE_FAILED', 500);
  }

  async listquestionReviews(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionReview[]> {
    let query = this.supabase.from('question_reviews').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_REVIEW_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionStatistic ─────────────────────────────────────────────────────
  async createQuestionStatistic(schoolId: string, data: QuestionStatisticCreate): Promise<QuestionStatistic> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_statistics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_STATISTIC_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionStatistic(schoolId: string, id: string): Promise<QuestionStatistic | null> {
    const { data, error } = await this.supabase
      .from('question_statistics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionStatistic(schoolId: string, id: string, data: QuestionStatisticUpdate): Promise<QuestionStatistic> {
    const { data: result, error } = await this.supabase
      .from('question_statistics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_STATISTIC_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionStatistic(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_statistics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_STATISTIC_DELETE_FAILED', 500);
  }

  async listquestionStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionStatistic[]> {
    let query = this.supabase.from('question_statistics').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_STATISTIC_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ImportQuestionJob ─────────────────────────────────────────────────────
  async createImportQuestionJob(schoolId: string, data: ImportQuestionJobCreate): Promise<ImportQuestionJob> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('import_question_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_IMPORT_QUESTION_JOB_CREATE_FAILED', 500);
    return result;
  }

  async getImportQuestionJob(schoolId: string, id: string): Promise<ImportQuestionJob | null> {
    const { data, error } = await this.supabase
      .from('import_question_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateImportQuestionJob(schoolId: string, id: string, data: ImportQuestionJobUpdate): Promise<ImportQuestionJob> {
    const { data: result, error } = await this.supabase
      .from('import_question_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_IMPORT_QUESTION_JOB_UPDATE_FAILED', 500);
    return result;
  }

  async deleteImportQuestionJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('import_question_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_IMPORT_QUESTION_JOB_DELETE_FAILED', 500);
  }

  async listimportQuestionJobs(schoolId: string, filters?: Record<string, unknown>): Promise<ImportQuestionJob[]> {
    let query = this.supabase.from('import_question_jobs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_IMPORT_QUESTION_JOB_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExportQuestionJob ─────────────────────────────────────────────────────
  async createExportQuestionJob(schoolId: string, data: ExportQuestionJobCreate): Promise<ExportQuestionJob> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('export_question_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXPORT_QUESTION_JOB_CREATE_FAILED', 500);
    return result;
  }

  async getExportQuestionJob(schoolId: string, id: string): Promise<ExportQuestionJob | null> {
    const { data, error } = await this.supabase
      .from('export_question_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExportQuestionJob(schoolId: string, id: string, data: ExportQuestionJobUpdate): Promise<ExportQuestionJob> {
    const { data: result, error } = await this.supabase
      .from('export_question_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXPORT_QUESTION_JOB_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExportQuestionJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('export_question_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXPORT_QUESTION_JOB_DELETE_FAILED', 500);
  }

  async listexportQuestionJobs(schoolId: string, filters?: Record<string, unknown>): Promise<ExportQuestionJob[]> {
    let query = this.supabase.from('export_question_jobs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXPORT_QUESTION_JOB_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── BulkEditJob ───────────────────────────────────────────────────────────
  async createBulkEditJob(schoolId: string, data: BulkEditJobCreate): Promise<BulkEditJob> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('bulk_edit_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_BULK_EDIT_JOB_CREATE_FAILED', 500);
    return result;
  }

  async getBulkEditJob(schoolId: string, id: string): Promise<BulkEditJob | null> {
    const { data, error } = await this.supabase
      .from('bulk_edit_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBulkEditJob(schoolId: string, id: string, data: BulkEditJobUpdate): Promise<BulkEditJob> {
    const { data: result, error } = await this.supabase
      .from('bulk_edit_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_BULK_EDIT_JOB_UPDATE_FAILED', 500);
    return result;
  }

  async deleteBulkEditJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('bulk_edit_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_BULK_EDIT_JOB_DELETE_FAILED', 500);
  }

  async listbulkEditJobs(schoolId: string, filters?: Record<string, unknown>): Promise<BulkEditJob[]> {
    let query = this.supabase.from('bulk_edit_jobs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_BULK_EDIT_JOB_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── OCRQuestionImport ─────────────────────────────────────────────────────
  async createOCRQuestionImport(schoolId: string, data: OCRQuestionImportCreate): Promise<OCRQuestionImport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ocr_question_imports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_OCR_QUESTION_IMPORT_CREATE_FAILED', 500);
    return result;
  }

  async getOCRQuestionImport(schoolId: string, id: string): Promise<OCRQuestionImport | null> {
    const { data, error } = await this.supabase
      .from('ocr_question_imports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateOCRQuestionImport(schoolId: string, id: string, data: OCRQuestionImportUpdate): Promise<OCRQuestionImport> {
    const { data: result, error } = await this.supabase
      .from('ocr_question_imports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_OCR_QUESTION_IMPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteOCRQuestionImport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocr_question_imports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_OCR_QUESTION_IMPORT_DELETE_FAILED', 500);
  }

  async listoCRQuestionImports(schoolId: string, filters?: Record<string, unknown>): Promise<OCRQuestionImport[]> {
    let query = this.supabase.from('ocr_question_imports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_OCR_QUESTION_IMPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AIQuestionGeneration ──────────────────────────────────────────────────
  async createAIQuestionGeneration(schoolId: string, data: AIQuestionGenerationCreate): Promise<AIQuestionGeneration> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ai_question_generations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATION_CREATE_FAILED', 500);
    return result;
  }

  async getAIQuestionGeneration(schoolId: string, id: string): Promise<AIQuestionGeneration | null> {
    const { data, error } = await this.supabase
      .from('ai_question_generations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAIQuestionGeneration(schoolId: string, id: string, data: AIQuestionGenerationUpdate): Promise<AIQuestionGeneration> {
    const { data: result, error } = await this.supabase
      .from('ai_question_generations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAIQuestionGeneration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_question_generations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATION_DELETE_FAILED', 500);
  }

  async listaIQuestionGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGeneration[]> {
    let query = this.supabase.from('ai_question_generations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_QUESTION_GENERATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionTranslation ───────────────────────────────────────────────────
  async createQuestionTranslation(schoolId: string, data: QuestionTranslationCreate): Promise<QuestionTranslation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_translations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TRANSLATION_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionTranslation(schoolId: string, id: string): Promise<QuestionTranslation | null> {
    const { data, error } = await this.supabase
      .from('question_translations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionTranslation(schoolId: string, id: string, data: QuestionTranslationUpdate): Promise<QuestionTranslation> {
    const { data: result, error } = await this.supabase
      .from('question_translations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TRANSLATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionTranslation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_translations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TRANSLATION_DELETE_FAILED', 500);
  }

  async listquestionTranslations(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionTranslation[]> {
    let query = this.supabase.from('question_translations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_TRANSLATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QuestionValidation ────────────────────────────────────────────────────
  async createQuestionValidation(schoolId: string, data: QuestionValidationCreate): Promise<QuestionValidation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('question_validations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VALIDATION_CREATE_FAILED', 500);
    return result;
  }

  async getQuestionValidation(schoolId: string, id: string): Promise<QuestionValidation | null> {
    const { data, error } = await this.supabase
      .from('question_validations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQuestionValidation(schoolId: string, id: string, data: QuestionValidationUpdate): Promise<QuestionValidation> {
    const { data: result, error } = await this.supabase
      .from('question_validations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VALIDATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQuestionValidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('question_validations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VALIDATION_DELETE_FAILED', 500);
  }

  async listquestionValidations(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionValidation[]> {
    let query = this.supabase.from('question_validations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QUESTION_VALIDATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DuplicateDetection ────────────────────────────────────────────────────
  async createDuplicateDetection(schoolId: string, data: DuplicateDetectionCreate): Promise<DuplicateDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('duplicate_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DUPLICATE_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getDuplicateDetection(schoolId: string, id: string): Promise<DuplicateDetection | null> {
    const { data, error } = await this.supabase
      .from('duplicate_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDuplicateDetection(schoolId: string, id: string, data: DuplicateDetectionUpdate): Promise<DuplicateDetection> {
    const { data: result, error } = await this.supabase
      .from('duplicate_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DUPLICATE_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDuplicateDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('duplicate_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_DUPLICATE_DETECTION_DELETE_FAILED', 500);
  }

  async listduplicateDetections(schoolId: string, filters?: Record<string, unknown>): Promise<DuplicateDetection[]> {
    let query = this.supabase.from('duplicate_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_DUPLICATE_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Certificate ───────────────────────────────────────────────────────────
  async createCertificate(schoolId: string, data: CertificateCreate): Promise<Certificate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_CREATE_FAILED', 500);
    return result;
  }

  async getCertificate(schoolId: string, id: string): Promise<Certificate | null> {
    const { data, error } = await this.supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificate(schoolId: string, id: string, data: CertificateUpdate): Promise<Certificate> {
    const { data: result, error } = await this.supabase
      .from('certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_DELETE_FAILED', 500);
  }

  async listcertificates(schoolId: string, filters?: Record<string, unknown>): Promise<Certificate[]> {
    let query = this.supabase.from('certificates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DigitalCertificate ────────────────────────────────────────────────────
  async createDigitalCertificate(schoolId: string, data: DigitalCertificateCreate): Promise<DigitalCertificate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('digital_certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_CERTIFICATE_CREATE_FAILED', 500);
    return result;
  }

  async getDigitalCertificate(schoolId: string, id: string): Promise<DigitalCertificate | null> {
    const { data, error } = await this.supabase
      .from('digital_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDigitalCertificate(schoolId: string, id: string, data: DigitalCertificateUpdate): Promise<DigitalCertificate> {
    const { data: result, error } = await this.supabase
      .from('digital_certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_CERTIFICATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDigitalCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_CERTIFICATE_DELETE_FAILED', 500);
  }

  async listdigitalCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificate[]> {
    let query = this.supabase.from('digital_certificates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_CERTIFICATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── BlockchainCertificate ─────────────────────────────────────────────────
  async createBlockchainCertificate(schoolId: string, data: BlockchainCertificateCreate): Promise<BlockchainCertificate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('blockchain_certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_BLOCKCHAIN_CERTIFICATE_CREATE_FAILED', 500);
    return result;
  }

  async getBlockchainCertificate(schoolId: string, id: string): Promise<BlockchainCertificate | null> {
    const { data, error } = await this.supabase
      .from('blockchain_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBlockchainCertificate(schoolId: string, id: string, data: BlockchainCertificateUpdate): Promise<BlockchainCertificate> {
    const { data: result, error } = await this.supabase
      .from('blockchain_certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_BLOCKCHAIN_CERTIFICATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteBlockchainCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('blockchain_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_BLOCKCHAIN_CERTIFICATE_DELETE_FAILED', 500);
  }

  async listblockchainCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainCertificate[]> {
    let query = this.supabase.from('blockchain_certificates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_BLOCKCHAIN_CERTIFICATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── QRVerification ────────────────────────────────────────────────────────
  async createQRVerification(schoolId: string, data: QRVerificationCreate): Promise<QRVerification> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('qr_verifications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QR_VERIFICATION_CREATE_FAILED', 500);
    return result;
  }

  async getQRVerification(schoolId: string, id: string): Promise<QRVerification | null> {
    const { data, error } = await this.supabase
      .from('qr_verifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQRVerification(schoolId: string, id: string, data: QRVerificationUpdate): Promise<QRVerification> {
    const { data: result, error } = await this.supabase
      .from('qr_verifications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_QR_VERIFICATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteQRVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('qr_verifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_QR_VERIFICATION_DELETE_FAILED', 500);
  }

  async listqRVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<QRVerification[]> {
    let query = this.supabase.from('qr_verifications').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_QR_VERIFICATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PublicVerification ────────────────────────────────────────────────────
  async createPublicVerification(schoolId: string, data: PublicVerificationCreate): Promise<PublicVerification> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('public_verifications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_VERIFICATION_CREATE_FAILED', 500);
    return result;
  }

  async getPublicVerification(schoolId: string, id: string): Promise<PublicVerification | null> {
    const { data, error } = await this.supabase
      .from('public_verifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePublicVerification(schoolId: string, id: string, data: PublicVerificationUpdate): Promise<PublicVerification> {
    const { data: result, error } = await this.supabase
      .from('public_verifications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_VERIFICATION_UPDATE_FAILED', 500);
    return result;
  }

  async deletePublicVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('public_verifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_VERIFICATION_DELETE_FAILED', 500);
  }

  async listpublicVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<PublicVerification[]> {
    let query = this.supabase.from('public_verifications').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_VERIFICATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificateTemplate ───────────────────────────────────────────────────
  async createCertificateTemplate(schoolId: string, data: CertificateTemplateCreate): Promise<CertificateTemplate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificate_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_TEMPLATE_CREATE_FAILED', 500);
    return result;
  }

  async getCertificateTemplate(schoolId: string, id: string): Promise<CertificateTemplate | null> {
    const { data, error } = await this.supabase
      .from('certificate_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateTemplate(schoolId: string, id: string, data: CertificateTemplateUpdate): Promise<CertificateTemplate> {
    const { data: result, error } = await this.supabase
      .from('certificate_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_TEMPLATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificateTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_TEMPLATE_DELETE_FAILED', 500);
  }

  async listcertificateTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateTemplate[]> {
    let query = this.supabase.from('certificate_templates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_TEMPLATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificateBranding ───────────────────────────────────────────────────
  async createCertificateBranding(schoolId: string, data: CertificateBrandingCreate): Promise<CertificateBranding> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificate_brandings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_BRANDING_CREATE_FAILED', 500);
    return result;
  }

  async getCertificateBranding(schoolId: string, id: string): Promise<CertificateBranding | null> {
    const { data, error } = await this.supabase
      .from('certificate_brandings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateBranding(schoolId: string, id: string, data: CertificateBrandingUpdate): Promise<CertificateBranding> {
    const { data: result, error } = await this.supabase
      .from('certificate_brandings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_BRANDING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificateBranding(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_brandings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_BRANDING_DELETE_FAILED', 500);
  }

  async listcertificateBrandings(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateBranding[]> {
    let query = this.supabase.from('certificate_brandings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_BRANDING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificateExpiration ─────────────────────────────────────────────────
  async createCertificateExpiration(schoolId: string, data: CertificateExpirationCreate): Promise<CertificateExpiration> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificate_expirations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_EXPIRATION_CREATE_FAILED', 500);
    return result;
  }

  async getCertificateExpiration(schoolId: string, id: string): Promise<CertificateExpiration | null> {
    const { data, error } = await this.supabase
      .from('certificate_expirations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateExpiration(schoolId: string, id: string, data: CertificateExpirationUpdate): Promise<CertificateExpiration> {
    const { data: result, error } = await this.supabase
      .from('certificate_expirations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_EXPIRATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificateExpiration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_expirations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_EXPIRATION_DELETE_FAILED', 500);
  }

  async listcertificateExpirations(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateExpiration[]> {
    let query = this.supabase.from('certificate_expirations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_EXPIRATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificateRenewal ────────────────────────────────────────────────────
  async createCertificateRenewal(schoolId: string, data: CertificateRenewalCreate): Promise<CertificateRenewal> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificate_renewals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_RENEWAL_CREATE_FAILED', 500);
    return result;
  }

  async getCertificateRenewal(schoolId: string, id: string): Promise<CertificateRenewal | null> {
    const { data, error } = await this.supabase
      .from('certificate_renewals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateRenewal(schoolId: string, id: string, data: CertificateRenewalUpdate): Promise<CertificateRenewal> {
    const { data: result, error } = await this.supabase
      .from('certificate_renewals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_RENEWAL_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificateRenewal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_renewals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_RENEWAL_DELETE_FAILED', 500);
  }

  async listcertificateRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRenewal[]> {
    let query = this.supabase.from('certificate_renewals').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_RENEWAL_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificateValidation ─────────────────────────────────────────────────
  async createCertificateValidation(schoolId: string, data: CertificateValidationCreate): Promise<CertificateValidation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificate_validations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_VALIDATION_CREATE_FAILED', 500);
    return result;
  }

  async getCertificateValidation(schoolId: string, id: string): Promise<CertificateValidation | null> {
    const { data, error } = await this.supabase
      .from('certificate_validations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateValidation(schoolId: string, id: string, data: CertificateValidationUpdate): Promise<CertificateValidation> {
    const { data: result, error } = await this.supabase
      .from('certificate_validations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_VALIDATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificateValidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_validations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_VALIDATION_DELETE_FAILED', 500);
  }

  async listcertificateValidations(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateValidation[]> {
    let query = this.supabase.from('certificate_validations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_VALIDATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificateRevocation ─────────────────────────────────────────────────
  async createCertificateRevocation(schoolId: string, data: CertificateRevocationCreate): Promise<CertificateRevocation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificate_revocations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REVOCATION_CREATE_FAILED', 500);
    return result;
  }

  async getCertificateRevocation(schoolId: string, id: string): Promise<CertificateRevocation | null> {
    const { data, error } = await this.supabase
      .from('certificate_revocations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateRevocation(schoolId: string, id: string, data: CertificateRevocationUpdate): Promise<CertificateRevocation> {
    const { data: result, error } = await this.supabase
      .from('certificate_revocations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REVOCATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificateRevocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_revocations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REVOCATION_DELETE_FAILED', 500);
  }

  async listcertificateRevocations(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRevocation[]> {
    let query = this.supabase.from('certificate_revocations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REVOCATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificateRegistry ───────────────────────────────────────────────────
  async createCertificateRegistry(schoolId: string, data: CertificateRegistryCreate): Promise<CertificateRegistry> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certificate_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REGISTRY_CREATE_FAILED', 500);
    return result;
  }

  async getCertificateRegistry(schoolId: string, id: string): Promise<CertificateRegistry | null> {
    const { data, error } = await this.supabase
      .from('certificate_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateRegistry(schoolId: string, id: string, data: CertificateRegistryUpdate): Promise<CertificateRegistry> {
    const { data: result, error } = await this.supabase
      .from('certificate_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REGISTRY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificateRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REGISTRY_DELETE_FAILED', 500);
  }

  async listcertificateRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRegistry[]> {
    let query = this.supabase.from('certificate_registries').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATE_REGISTRY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MicroCredential ───────────────────────────────────────────────────────
  async createMicroCredential(schoolId: string, data: MicroCredentialCreate): Promise<MicroCredential> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('micro_credentials')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICRO_CREDENTIAL_CREATE_FAILED', 500);
    return result;
  }

  async getMicroCredential(schoolId: string, id: string): Promise<MicroCredential | null> {
    const { data, error } = await this.supabase
      .from('micro_credentials')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMicroCredential(schoolId: string, id: string, data: MicroCredentialUpdate): Promise<MicroCredential> {
    const { data: result, error } = await this.supabase
      .from('micro_credentials')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICRO_CREDENTIAL_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMicroCredential(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('micro_credentials')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICRO_CREDENTIAL_DELETE_FAILED', 500);
  }

  async listmicroCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<MicroCredential[]> {
    let query = this.supabase.from('micro_credentials').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_MICRO_CREDENTIAL_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SkillBadge ────────────────────────────────────────────────────────────
  async createSkillBadge(schoolId: string, data: SkillBadgeCreate): Promise<SkillBadge> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('skill_badges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_BADGE_CREATE_FAILED', 500);
    return result;
  }

  async getSkillBadge(schoolId: string, id: string): Promise<SkillBadge | null> {
    const { data, error } = await this.supabase
      .from('skill_badges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSkillBadge(schoolId: string, id: string, data: SkillBadgeUpdate): Promise<SkillBadge> {
    const { data: result, error } = await this.supabase
      .from('skill_badges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_BADGE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSkillBadge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_badges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_BADGE_DELETE_FAILED', 500);
  }

  async listskillBadges(schoolId: string, filters?: Record<string, unknown>): Promise<SkillBadge[]> {
    let query = this.supabase.from('skill_badges').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_BADGE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── OpenBadge ─────────────────────────────────────────────────────────────
  async createOpenBadge(schoolId: string, data: OpenBadgeCreate): Promise<OpenBadge> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('open_badges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_OPEN_BADGE_CREATE_FAILED', 500);
    return result;
  }

  async getOpenBadge(schoolId: string, id: string): Promise<OpenBadge | null> {
    const { data, error } = await this.supabase
      .from('open_badges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateOpenBadge(schoolId: string, id: string, data: OpenBadgeUpdate): Promise<OpenBadge> {
    const { data: result, error } = await this.supabase
      .from('open_badges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_OPEN_BADGE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteOpenBadge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('open_badges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_OPEN_BADGE_DELETE_FAILED', 500);
  }

  async listopenBadges(schoolId: string, filters?: Record<string, unknown>): Promise<OpenBadge[]> {
    let query = this.supabase.from('open_badges').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_OPEN_BADGE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AchievementCertificate ────────────────────────────────────────────────
  async createAchievementCertificate(schoolId: string, data: AchievementCertificateCreate): Promise<AchievementCertificate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('achievement_certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACHIEVEMENT_CERTIFICATE_CREATE_FAILED', 500);
    return result;
  }

  async getAchievementCertificate(schoolId: string, id: string): Promise<AchievementCertificate | null> {
    const { data, error } = await this.supabase
      .from('achievement_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAchievementCertificate(schoolId: string, id: string, data: AchievementCertificateUpdate): Promise<AchievementCertificate> {
    const { data: result, error } = await this.supabase
      .from('achievement_certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACHIEVEMENT_CERTIFICATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAchievementCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('achievement_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACHIEVEMENT_CERTIFICATE_DELETE_FAILED', 500);
  }

  async listachievementCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<AchievementCertificate[]> {
    let query = this.supabase.from('achievement_certificates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACHIEVEMENT_CERTIFICATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AcademicCertificate ───────────────────────────────────────────────────
  async createAcademicCertificate(schoolId: string, data: AcademicCertificateCreate): Promise<AcademicCertificate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('academic_certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_CERTIFICATE_CREATE_FAILED', 500);
    return result;
  }

  async getAcademicCertificate(schoolId: string, id: string): Promise<AcademicCertificate | null> {
    const { data, error } = await this.supabase
      .from('academic_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAcademicCertificate(schoolId: string, id: string, data: AcademicCertificateUpdate): Promise<AcademicCertificate> {
    const { data: result, error } = await this.supabase
      .from('academic_certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_CERTIFICATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAcademicCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_CERTIFICATE_DELETE_FAILED', 500);
  }

  async listacademicCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicCertificate[]> {
    let query = this.supabase.from('academic_certificates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_CERTIFICATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ProfessionalCertificate ───────────────────────────────────────────────
  async createProfessionalCertificate(schoolId: string, data: ProfessionalCertificateCreate): Promise<ProfessionalCertificate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('professional_certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROFESSIONAL_CERTIFICATE_CREATE_FAILED', 500);
    return result;
  }

  async getProfessionalCertificate(schoolId: string, id: string): Promise<ProfessionalCertificate | null> {
    const { data, error } = await this.supabase
      .from('professional_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProfessionalCertificate(schoolId: string, id: string, data: ProfessionalCertificateUpdate): Promise<ProfessionalCertificate> {
    const { data: result, error } = await this.supabase
      .from('professional_certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROFESSIONAL_CERTIFICATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteProfessionalCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('professional_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROFESSIONAL_CERTIFICATE_DELETE_FAILED', 500);
  }

  async listprofessionalCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<ProfessionalCertificate[]> {
    let query = this.supabase.from('professional_certificates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROFESSIONAL_CERTIFICATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TranscriptGenerator ───────────────────────────────────────────────────
  async createTranscriptGenerator(schoolId: string, data: TranscriptGeneratorCreate): Promise<TranscriptGenerator> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('transcript_generators')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TRANSCRIPT_GENERATOR_CREATE_FAILED', 500);
    return result;
  }

  async getTranscriptGenerator(schoolId: string, id: string): Promise<TranscriptGenerator | null> {
    const { data, error } = await this.supabase
      .from('transcript_generators')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTranscriptGenerator(schoolId: string, id: string, data: TranscriptGeneratorUpdate): Promise<TranscriptGenerator> {
    const { data: result, error } = await this.supabase
      .from('transcript_generators')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TRANSCRIPT_GENERATOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTranscriptGenerator(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transcript_generators')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_TRANSCRIPT_GENERATOR_DELETE_FAILED', 500);
  }

  async listtranscriptGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<TranscriptGenerator[]> {
    let query = this.supabase.from('transcript_generators').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_TRANSCRIPT_GENERATOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DigitalDiploma ────────────────────────────────────────────────────────
  async createDigitalDiploma(schoolId: string, data: DigitalDiplomaCreate): Promise<DigitalDiploma> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('digital_diplomas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_DIPLOMA_CREATE_FAILED', 500);
    return result;
  }

  async getDigitalDiploma(schoolId: string, id: string): Promise<DigitalDiploma | null> {
    const { data, error } = await this.supabase
      .from('digital_diplomas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDigitalDiploma(schoolId: string, id: string, data: DigitalDiplomaUpdate): Promise<DigitalDiploma> {
    const { data: result, error } = await this.supabase
      .from('digital_diplomas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_DIPLOMA_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDigitalDiploma(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_diplomas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_DIPLOMA_DELETE_FAILED', 500);
  }

  async listdigitalDiplomas(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalDiploma[]> {
    let query = this.supabase.from('digital_diplomas').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_DIGITAL_DIPLOMA_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyTest ────────────────────────────────────────────────────────
  async createCompetencyTest(schoolId: string, data: CompetencyTestCreate): Promise<CompetencyTest> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_tests')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_TEST_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyTest(schoolId: string, id: string): Promise<CompetencyTest | null> {
    const { data, error } = await this.supabase
      .from('competency_tests')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyTest(schoolId: string, id: string, data: CompetencyTestUpdate): Promise<CompetencyTest> {
    const { data: result, error } = await this.supabase
      .from('competency_tests')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_TEST_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyTest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_tests')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_TEST_DELETE_FAILED', 500);
  }

  async listcompetencyTests(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyTest[]> {
    let query = this.supabase.from('competency_tests').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_TEST_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SkillMatrix ───────────────────────────────────────────────────────────
  async createSkillMatrix(schoolId: string, data: SkillMatrixCreate): Promise<SkillMatrix> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('skill_matrices')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_MATRIX_CREATE_FAILED', 500);
    return result;
  }

  async getSkillMatrix(schoolId: string, id: string): Promise<SkillMatrix | null> {
    const { data, error } = await this.supabase
      .from('skill_matrices')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSkillMatrix(schoolId: string, id: string, data: SkillMatrixUpdate): Promise<SkillMatrix> {
    const { data: result, error } = await this.supabase
      .from('skill_matrices')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_MATRIX_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSkillMatrix(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_matrices')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_MATRIX_DELETE_FAILED', 500);
  }

  async listskillMatrixs(schoolId: string, filters?: Record<string, unknown>): Promise<SkillMatrix[]> {
    let query = this.supabase.from('skill_matrices').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_MATRIX_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyLevelConfig ─────────────────────────────────────────────────
  async createCompetencyLevelConfig(schoolId: string, data: CompetencyLevelConfigCreate): Promise<CompetencyLevelConfig> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_level_configs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_LEVEL_CONFIG_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyLevelConfig(schoolId: string, id: string): Promise<CompetencyLevelConfig | null> {
    const { data, error } = await this.supabase
      .from('competency_level_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyLevelConfig(schoolId: string, id: string, data: CompetencyLevelConfigUpdate): Promise<CompetencyLevelConfig> {
    const { data: result, error } = await this.supabase
      .from('competency_level_configs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_LEVEL_CONFIG_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyLevelConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_level_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_LEVEL_CONFIG_DELETE_FAILED', 500);
  }

  async listcompetencyLevelConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyLevelConfig[]> {
    let query = this.supabase.from('competency_level_configs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_LEVEL_CONFIG_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyRubric ──────────────────────────────────────────────────────
  async createCompetencyRubric(schoolId: string, data: CompetencyRubricCreate): Promise<CompetencyRubric> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_rubrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_RUBRIC_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyRubric(schoolId: string, id: string): Promise<CompetencyRubric | null> {
    const { data, error } = await this.supabase
      .from('competency_rubrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyRubric(schoolId: string, id: string, data: CompetencyRubricUpdate): Promise<CompetencyRubric> {
    const { data: result, error } = await this.supabase
      .from('competency_rubrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_RUBRIC_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyRubric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_rubrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_RUBRIC_DELETE_FAILED', 500);
  }

  async listcompetencyRubrics(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyRubric[]> {
    let query = this.supabase.from('competency_rubrics').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_RUBRIC_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PerformanceRubric ─────────────────────────────────────────────────────
  async createPerformanceRubric(schoolId: string, data: PerformanceRubricCreate): Promise<PerformanceRubric> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('performance_rubrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PERFORMANCE_RUBRIC_CREATE_FAILED', 500);
    return result;
  }

  async getPerformanceRubric(schoolId: string, id: string): Promise<PerformanceRubric | null> {
    const { data, error } = await this.supabase
      .from('performance_rubrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePerformanceRubric(schoolId: string, id: string, data: PerformanceRubricUpdate): Promise<PerformanceRubric> {
    const { data: result, error } = await this.supabase
      .from('performance_rubrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PERFORMANCE_RUBRIC_UPDATE_FAILED', 500);
    return result;
  }

  async deletePerformanceRubric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_rubrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PERFORMANCE_RUBRIC_DELETE_FAILED', 500);
  }

  async listperformanceRubrics(schoolId: string, filters?: Record<string, unknown>): Promise<PerformanceRubric[]> {
    let query = this.supabase.from('performance_rubrics').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PERFORMANCE_RUBRIC_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Portfolio ─────────────────────────────────────────────────────────────
  async createPortfolio(schoolId: string, data: PortfolioCreate): Promise<Portfolio> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('portfolios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_CREATE_FAILED', 500);
    return result;
  }

  async getPortfolio(schoolId: string, id: string): Promise<Portfolio | null> {
    const { data, error } = await this.supabase
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePortfolio(schoolId: string, id: string, data: PortfolioUpdate): Promise<Portfolio> {
    const { data: result, error } = await this.supabase
      .from('portfolios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_UPDATE_FAILED', 500);
    return result;
  }

  async deletePortfolio(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('portfolios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_DELETE_FAILED', 500);
  }

  async listportfolios(schoolId: string, filters?: Record<string, unknown>): Promise<Portfolio[]> {
    let query = this.supabase.from('portfolios').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PeerAssessment ────────────────────────────────────────────────────────
  async createPeerAssessment(schoolId: string, data: PeerAssessmentCreate): Promise<PeerAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('peer_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PEER_ASSESSMENT_CREATE_FAILED', 500);
    return result;
  }

  async getPeerAssessment(schoolId: string, id: string): Promise<PeerAssessment | null> {
    const { data, error } = await this.supabase
      .from('peer_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePeerAssessment(schoolId: string, id: string, data: PeerAssessmentUpdate): Promise<PeerAssessment> {
    const { data: result, error } = await this.supabase
      .from('peer_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PEER_ASSESSMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deletePeerAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('peer_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PEER_ASSESSMENT_DELETE_FAILED', 500);
  }

  async listpeerAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<PeerAssessment[]> {
    let query = this.supabase.from('peer_assessments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PEER_ASSESSMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SelfAssessment ────────────────────────────────────────────────────────
  async createSelfAssessment(schoolId: string, data: SelfAssessmentCreate): Promise<SelfAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('self_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SELF_ASSESSMENT_CREATE_FAILED', 500);
    return result;
  }

  async getSelfAssessment(schoolId: string, id: string): Promise<SelfAssessment | null> {
    const { data, error } = await this.supabase
      .from('self_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSelfAssessment(schoolId: string, id: string, data: SelfAssessmentUpdate): Promise<SelfAssessment> {
    const { data: result, error } = await this.supabase
      .from('self_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SELF_ASSESSMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSelfAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('self_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SELF_ASSESSMENT_DELETE_FAILED', 500);
  }

  async listselfAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<SelfAssessment[]> {
    let query = this.supabase.from('self_assessments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SELF_ASSESSMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TeacherAssessment ─────────────────────────────────────────────────────
  async createTeacherAssessment(schoolId: string, data: TeacherAssessmentCreate): Promise<TeacherAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('teacher_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ASSESSMENT_CREATE_FAILED', 500);
    return result;
  }

  async getTeacherAssessment(schoolId: string, id: string): Promise<TeacherAssessment | null> {
    const { data, error } = await this.supabase
      .from('teacher_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherAssessment(schoolId: string, id: string, data: TeacherAssessmentUpdate): Promise<TeacherAssessment> {
    const { data: result, error } = await this.supabase
      .from('teacher_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ASSESSMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTeacherAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ASSESSMENT_DELETE_FAILED', 500);
  }

  async listteacherAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherAssessment[]> {
    let query = this.supabase.from('teacher_assessments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ASSESSMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExternalAssessment ────────────────────────────────────────────────────
  async createExternalAssessment(schoolId: string, data: ExternalAssessmentCreate): Promise<ExternalAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('external_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXTERNAL_ASSESSMENT_CREATE_FAILED', 500);
    return result;
  }

  async getExternalAssessment(schoolId: string, id: string): Promise<ExternalAssessment | null> {
    const { data, error } = await this.supabase
      .from('external_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExternalAssessment(schoolId: string, id: string, data: ExternalAssessmentUpdate): Promise<ExternalAssessment> {
    const { data: result, error } = await this.supabase
      .from('external_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXTERNAL_ASSESSMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExternalAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('external_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXTERNAL_ASSESSMENT_DELETE_FAILED', 500);
  }

  async listexternalAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<ExternalAssessment[]> {
    let query = this.supabase.from('external_assessments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXTERNAL_ASSESSMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyReport ──────────────────────────────────────────────────────
  async createCompetencyReport(schoolId: string, data: CompetencyReportCreate): Promise<CompetencyReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyReport(schoolId: string, id: string): Promise<CompetencyReport | null> {
    const { data, error } = await this.supabase
      .from('competency_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyReport(schoolId: string, id: string, data: CompetencyReportUpdate): Promise<CompetencyReport> {
    const { data: result, error } = await this.supabase
      .from('competency_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_REPORT_DELETE_FAILED', 500);
  }

  async listcompetencyReports(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyReport[]> {
    let query = this.supabase.from('competency_reports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── GapAnalysis ───────────────────────────────────────────────────────────
  async createGapAnalysis(schoolId: string, data: GapAnalysisCreate): Promise<GapAnalysis> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('gap_analyses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_GAP_ANALYSIS_CREATE_FAILED', 500);
    return result;
  }

  async getGapAnalysis(schoolId: string, id: string): Promise<GapAnalysis | null> {
    const { data, error } = await this.supabase
      .from('gap_analyses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateGapAnalysis(schoolId: string, id: string, data: GapAnalysisUpdate): Promise<GapAnalysis> {
    const { data: result, error } = await this.supabase
      .from('gap_analyses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_GAP_ANALYSIS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteGapAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gap_analyses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_GAP_ANALYSIS_DELETE_FAILED', 500);
  }

  async listgapAnalysises(schoolId: string, filters?: Record<string, unknown>): Promise<GapAnalysis[]> {
    let query = this.supabase.from('gap_analyses').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_GAP_ANALYSIS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LearningPathSuggestion ────────────────────────────────────────────────
  async createLearningPathSuggestion(schoolId: string, data: LearningPathSuggestionCreate): Promise<LearningPathSuggestion> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_path_suggestions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_LEARNING_PATH_SUGGESTION_CREATE_FAILED', 500);
    return result;
  }

  async getLearningPathSuggestion(schoolId: string, id: string): Promise<LearningPathSuggestion | null> {
    const { data, error } = await this.supabase
      .from('learning_path_suggestions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningPathSuggestion(schoolId: string, id: string, data: LearningPathSuggestionUpdate): Promise<LearningPathSuggestion> {
    const { data: result, error } = await this.supabase
      .from('learning_path_suggestions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_LEARNING_PATH_SUGGESTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningPathSuggestion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_path_suggestions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_LEARNING_PATH_SUGGESTION_DELETE_FAILED', 500);
  }

  async listlearningPathSuggestions(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPathSuggestion[]> {
    let query = this.supabase.from('learning_path_suggestions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_LEARNING_PATH_SUGGESTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CertificationEligibility ──────────────────────────────────────────────
  async createCertificationEligibility(schoolId: string, data: CertificationEligibilityCreate): Promise<CertificationEligibility> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('certification_eligibilities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATION_ELIGIBILITY_CREATE_FAILED', 500);
    return result;
  }

  async getCertificationEligibility(schoolId: string, id: string): Promise<CertificationEligibility | null> {
    const { data, error } = await this.supabase
      .from('certification_eligibilities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificationEligibility(schoolId: string, id: string, data: CertificationEligibilityUpdate): Promise<CertificationEligibility> {
    const { data: result, error } = await this.supabase
      .from('certification_eligibilities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATION_ELIGIBILITY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCertificationEligibility(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certification_eligibilities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATION_ELIGIBILITY_DELETE_FAILED', 500);
  }

  async listcertificationEligibilities(schoolId: string, filters?: Record<string, unknown>): Promise<CertificationEligibility[]> {
    let query = this.supabase.from('certification_eligibilities').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CERTIFICATION_ELIGIBILITY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SkillEvolutionTracking ────────────────────────────────────────────────
  async createSkillEvolutionTracking(schoolId: string, data: SkillEvolutionTrackingCreate): Promise<SkillEvolutionTracking> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('skill_evolution_trackings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_EVOLUTION_TRACKING_CREATE_FAILED', 500);
    return result;
  }

  async getSkillEvolutionTracking(schoolId: string, id: string): Promise<SkillEvolutionTracking | null> {
    const { data, error } = await this.supabase
      .from('skill_evolution_trackings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSkillEvolutionTracking(schoolId: string, id: string, data: SkillEvolutionTrackingUpdate): Promise<SkillEvolutionTracking> {
    const { data: result, error } = await this.supabase
      .from('skill_evolution_trackings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_EVOLUTION_TRACKING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSkillEvolutionTracking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_evolution_trackings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_EVOLUTION_TRACKING_DELETE_FAILED', 500);
  }

  async listskillEvolutionTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<SkillEvolutionTracking[]> {
    let query = this.supabase.from('skill_evolution_trackings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SKILL_EVOLUTION_TRACKING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── NationalExam ──────────────────────────────────────────────────────────
  async createNationalExam(schoolId: string, data: NationalExamCreate): Promise<NationalExam> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('national_exams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_EXAM_CREATE_FAILED', 500);
    return result;
  }

  async getNationalExam(schoolId: string, id: string): Promise<NationalExam | null> {
    const { data, error } = await this.supabase
      .from('national_exams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNationalExam(schoolId: string, id: string, data: NationalExamUpdate): Promise<NationalExam> {
    const { data: result, error } = await this.supabase
      .from('national_exams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_EXAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteNationalExam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_exams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_EXAM_DELETE_FAILED', 500);
  }

  async listnationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<NationalExam[]> {
    let query = this.supabase.from('national_exams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_EXAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamCenter ────────────────────────────────────────────────────────────
  async createExamCenter(schoolId: string, data: ExamCenterCreate): Promise<ExamCenter> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_centers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_CENTER_CREATE_FAILED', 500);
    return result;
  }

  async getExamCenter(schoolId: string, id: string): Promise<ExamCenter | null> {
    const { data, error } = await this.supabase
      .from('exam_centers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamCenter(schoolId: string, id: string, data: ExamCenterUpdate): Promise<ExamCenter> {
    const { data: result, error } = await this.supabase
      .from('exam_centers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_CENTER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamCenter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_centers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_CENTER_DELETE_FAILED', 500);
  }

  async listexamCenters(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCenter[]> {
    let query = this.supabase.from('exam_centers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_CENTER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SeatAllocation ────────────────────────────────────────────────────────
  async createSeatAllocation(schoolId: string, data: SeatAllocationCreate): Promise<SeatAllocation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('seat_allocations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SEAT_ALLOCATION_CREATE_FAILED', 500);
    return result;
  }

  async getSeatAllocation(schoolId: string, id: string): Promise<SeatAllocation | null> {
    const { data, error } = await this.supabase
      .from('seat_allocations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSeatAllocation(schoolId: string, id: string, data: SeatAllocationUpdate): Promise<SeatAllocation> {
    const { data: result, error } = await this.supabase
      .from('seat_allocations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SEAT_ALLOCATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSeatAllocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('seat_allocations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SEAT_ALLOCATION_DELETE_FAILED', 500);
  }

  async listseatAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<SeatAllocation[]> {
    let query = this.supabase.from('seat_allocations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SEAT_ALLOCATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CandidateRegistration ─────────────────────────────────────────────────
  async createCandidateRegistration(schoolId: string, data: CandidateRegistrationCreate): Promise<CandidateRegistration> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('candidate_registrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CANDIDATE_REGISTRATION_CREATE_FAILED', 500);
    return result;
  }

  async getCandidateRegistration(schoolId: string, id: string): Promise<CandidateRegistration | null> {
    const { data, error } = await this.supabase
      .from('candidate_registrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCandidateRegistration(schoolId: string, id: string, data: CandidateRegistrationUpdate): Promise<CandidateRegistration> {
    const { data: result, error } = await this.supabase
      .from('candidate_registrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CANDIDATE_REGISTRATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCandidateRegistration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('candidate_registrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CANDIDATE_REGISTRATION_DELETE_FAILED', 500);
  }

  async listcandidateRegistrations(schoolId: string, filters?: Record<string, unknown>): Promise<CandidateRegistration[]> {
    let query = this.supabase.from('candidate_registrations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CANDIDATE_REGISTRATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AnonymousNumber ───────────────────────────────────────────────────────
  async createAnonymousNumber(schoolId: string, data: AnonymousNumberCreate): Promise<AnonymousNumber> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('anonymous_numbers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ANONYMOUS_NUMBER_CREATE_FAILED', 500);
    return result;
  }

  async getAnonymousNumber(schoolId: string, id: string): Promise<AnonymousNumber | null> {
    const { data, error } = await this.supabase
      .from('anonymous_numbers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAnonymousNumber(schoolId: string, id: string, data: AnonymousNumberUpdate): Promise<AnonymousNumber> {
    const { data: result, error } = await this.supabase
      .from('anonymous_numbers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ANONYMOUS_NUMBER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAnonymousNumber(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('anonymous_numbers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ANONYMOUS_NUMBER_DELETE_FAILED', 500);
  }

  async listanonymousNumbers(schoolId: string, filters?: Record<string, unknown>): Promise<AnonymousNumber[]> {
    let query = this.supabase.from('anonymous_numbers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ANONYMOUS_NUMBER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamDistribution ──────────────────────────────────────────────────────
  async createExamDistribution(schoolId: string, data: ExamDistributionCreate): Promise<ExamDistribution> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_distributions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_DISTRIBUTION_CREATE_FAILED', 500);
    return result;
  }

  async getExamDistribution(schoolId: string, id: string): Promise<ExamDistribution | null> {
    const { data, error } = await this.supabase
      .from('exam_distributions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamDistribution(schoolId: string, id: string, data: ExamDistributionUpdate): Promise<ExamDistribution> {
    const { data: result, error } = await this.supabase
      .from('exam_distributions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_DISTRIBUTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamDistribution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_distributions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_DISTRIBUTION_DELETE_FAILED', 500);
  }

  async listexamDistributions(schoolId: string, filters?: Record<string, unknown>): Promise<ExamDistribution[]> {
    let query = this.supabase.from('exam_distributions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_DISTRIBUTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SecurePrinting ────────────────────────────────────────────────────────
  async createSecurePrinting(schoolId: string, data: SecurePrintingCreate): Promise<SecurePrinting> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('secure_printings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_PRINTING_CREATE_FAILED', 500);
    return result;
  }

  async getSecurePrinting(schoolId: string, id: string): Promise<SecurePrinting | null> {
    const { data, error } = await this.supabase
      .from('secure_printings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSecurePrinting(schoolId: string, id: string, data: SecurePrintingUpdate): Promise<SecurePrinting> {
    const { data: result, error } = await this.supabase
      .from('secure_printings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_PRINTING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSecurePrinting(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('secure_printings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_PRINTING_DELETE_FAILED', 500);
  }

  async listsecurePrintings(schoolId: string, filters?: Record<string, unknown>): Promise<SecurePrinting[]> {
    let query = this.supabase.from('secure_printings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SECURE_PRINTING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CorrectionCenter ──────────────────────────────────────────────────────
  async createCorrectionCenter(schoolId: string, data: CorrectionCenterCreate): Promise<CorrectionCenter> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('correction_centers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTION_CENTER_CREATE_FAILED', 500);
    return result;
  }

  async getCorrectionCenter(schoolId: string, id: string): Promise<CorrectionCenter | null> {
    const { data, error } = await this.supabase
      .from('correction_centers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCorrectionCenter(schoolId: string, id: string, data: CorrectionCenterUpdate): Promise<CorrectionCenter> {
    const { data: result, error } = await this.supabase
      .from('correction_centers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTION_CENTER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCorrectionCenter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('correction_centers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTION_CENTER_DELETE_FAILED', 500);
  }

  async listcorrectionCenters(schoolId: string, filters?: Record<string, unknown>): Promise<CorrectionCenter[]> {
    let query = this.supabase.from('correction_centers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTION_CENTER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MarkerAssignment ──────────────────────────────────────────────────────
  async createMarkerAssignment(schoolId: string, data: MarkerAssignmentCreate): Promise<MarkerAssignment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('marker_assignments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MARKER_ASSIGNMENT_CREATE_FAILED', 500);
    return result;
  }

  async getMarkerAssignment(schoolId: string, id: string): Promise<MarkerAssignment | null> {
    const { data, error } = await this.supabase
      .from('marker_assignments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarkerAssignment(schoolId: string, id: string, data: MarkerAssignmentUpdate): Promise<MarkerAssignment> {
    const { data: result, error } = await this.supabase
      .from('marker_assignments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MARKER_ASSIGNMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMarkerAssignment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marker_assignments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_MARKER_ASSIGNMENT_DELETE_FAILED', 500);
  }

  async listmarkerAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<MarkerAssignment[]> {
    let query = this.supabase.from('marker_assignments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_MARKER_ASSIGNMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DoubleMarking ─────────────────────────────────────────────────────────
  async createDoubleMarking(schoolId: string, data: DoubleMarkingCreate): Promise<DoubleMarking> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('double_markings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DOUBLE_MARKING_CREATE_FAILED', 500);
    return result;
  }

  async getDoubleMarking(schoolId: string, id: string): Promise<DoubleMarking | null> {
    const { data, error } = await this.supabase
      .from('double_markings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDoubleMarking(schoolId: string, id: string, data: DoubleMarkingUpdate): Promise<DoubleMarking> {
    const { data: result, error } = await this.supabase
      .from('double_markings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_DOUBLE_MARKING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDoubleMarking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('double_markings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_DOUBLE_MARKING_DELETE_FAILED', 500);
  }

  async listdoubleMarkings(schoolId: string, filters?: Record<string, unknown>): Promise<DoubleMarking[]> {
    let query = this.supabase.from('double_markings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_DOUBLE_MARKING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Moderation ────────────────────────────────────────────────────────────
  async createModeration(schoolId: string, data: ModerationCreate): Promise<Moderation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('moderations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MODERATION_CREATE_FAILED', 500);
    return result;
  }

  async getModeration(schoolId: string, id: string): Promise<Moderation | null> {
    const { data, error } = await this.supabase
      .from('moderations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateModeration(schoolId: string, id: string, data: ModerationUpdate): Promise<Moderation> {
    const { data: result, error } = await this.supabase
      .from('moderations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MODERATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteModeration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('moderations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_MODERATION_DELETE_FAILED', 500);
  }

  async listmoderations(schoolId: string, filters?: Record<string, unknown>): Promise<Moderation[]> {
    let query = this.supabase.from('moderations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_MODERATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Appeal ────────────────────────────────────────────────────────────────
  async createAppeal(schoolId: string, data: AppealCreate): Promise<Appeal> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('appeals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_APPEAL_CREATE_FAILED', 500);
    return result;
  }

  async getAppeal(schoolId: string, id: string): Promise<Appeal | null> {
    const { data, error } = await this.supabase
      .from('appeals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAppeal(schoolId: string, id: string, data: AppealUpdate): Promise<Appeal> {
    const { data: result, error } = await this.supabase
      .from('appeals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_APPEAL_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAppeal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('appeals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_APPEAL_DELETE_FAILED', 500);
  }

  async listappeals(schoolId: string, filters?: Record<string, unknown>): Promise<Appeal[]> {
    let query = this.supabase.from('appeals').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_APPEAL_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResultsPublication ────────────────────────────────────────────────────
  async createResultsPublication(schoolId: string, data: ResultsPublicationCreate): Promise<ResultsPublication> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('results_publications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESULTS_PUBLICATION_CREATE_FAILED', 500);
    return result;
  }

  async getResultsPublication(schoolId: string, id: string): Promise<ResultsPublication | null> {
    const { data, error } = await this.supabase
      .from('results_publications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResultsPublication(schoolId: string, id: string, data: ResultsPublicationUpdate): Promise<ResultsPublication> {
    const { data: result, error } = await this.supabase
      .from('results_publications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESULTS_PUBLICATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResultsPublication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('results_publications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESULTS_PUBLICATION_DELETE_FAILED', 500);
  }

  async listresultsPublications(schoolId: string, filters?: Record<string, unknown>): Promise<ResultsPublication[]> {
    let query = this.supabase.from('results_publications').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESULTS_PUBLICATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamRanking ───────────────────────────────────────────────────────────
  async createExamRanking(schoolId: string, data: ExamRankingCreate): Promise<ExamRanking> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_rankings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_RANKING_CREATE_FAILED', 500);
    return result;
  }

  async getExamRanking(schoolId: string, id: string): Promise<ExamRanking | null> {
    const { data, error } = await this.supabase
      .from('exam_rankings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamRanking(schoolId: string, id: string, data: ExamRankingUpdate): Promise<ExamRanking> {
    const { data: result, error } = await this.supabase
      .from('exam_rankings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_RANKING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamRanking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_rankings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_RANKING_DELETE_FAILED', 500);
  }

  async listexamRankings(schoolId: string, filters?: Record<string, unknown>): Promise<ExamRanking[]> {
    let query = this.supabase.from('exam_rankings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EXAM_RANKING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── NationalAnalytics ─────────────────────────────────────────────────────
  async createNationalAnalytics(schoolId: string, data: NationalAnalyticsCreate): Promise<NationalAnalytics> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('national_analytics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_ANALYTICS_CREATE_FAILED', 500);
    return result;
  }

  async getNationalAnalytics(schoolId: string, id: string): Promise<NationalAnalytics | null> {
    const { data, error } = await this.supabase
      .from('national_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNationalAnalytics(schoolId: string, id: string, data: NationalAnalyticsUpdate): Promise<NationalAnalytics> {
    const { data: result, error } = await this.supabase
      .from('national_analytics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_ANALYTICS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteNationalAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_ANALYTICS_DELETE_FAILED', 500);
  }

  async listnationalAnalyticses(schoolId: string, filters?: Record<string, unknown>): Promise<NationalAnalytics[]> {
    let query = this.supabase.from('national_analytics').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_NATIONAL_ANALYTICS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SchoolAccreditation ───────────────────────────────────────────────────
  async createSchoolAccreditation(schoolId: string, data: SchoolAccreditationCreate): Promise<SchoolAccreditation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('school_accreditations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCHOOL_ACCREDITATION_CREATE_FAILED', 500);
    return result;
  }

  async getSchoolAccreditation(schoolId: string, id: string): Promise<SchoolAccreditation | null> {
    const { data, error } = await this.supabase
      .from('school_accreditations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSchoolAccreditation(schoolId: string, id: string, data: SchoolAccreditationUpdate): Promise<SchoolAccreditation> {
    const { data: result, error } = await this.supabase
      .from('school_accreditations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCHOOL_ACCREDITATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSchoolAccreditation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_accreditations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCHOOL_ACCREDITATION_DELETE_FAILED', 500);
  }

  async listschoolAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolAccreditation[]> {
    let query = this.supabase.from('school_accreditations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SCHOOL_ACCREDITATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TeacherAccreditation ──────────────────────────────────────────────────
  async createTeacherAccreditation(schoolId: string, data: TeacherAccreditationCreate): Promise<TeacherAccreditation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('teacher_accreditations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ACCREDITATION_CREATE_FAILED', 500);
    return result;
  }

  async getTeacherAccreditation(schoolId: string, id: string): Promise<TeacherAccreditation | null> {
    const { data, error } = await this.supabase
      .from('teacher_accreditations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherAccreditation(schoolId: string, id: string, data: TeacherAccreditationUpdate): Promise<TeacherAccreditation> {
    const { data: result, error } = await this.supabase
      .from('teacher_accreditations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ACCREDITATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTeacherAccreditation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_accreditations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ACCREDITATION_DELETE_FAILED', 500);
  }

  async listteacherAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherAccreditation[]> {
    let query = this.supabase.from('teacher_accreditations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_ACCREDITATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ProgramAccreditation ──────────────────────────────────────────────────
  async createProgramAccreditation(schoolId: string, data: ProgramAccreditationCreate): Promise<ProgramAccreditation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('program_accreditations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROGRAM_ACCREDITATION_CREATE_FAILED', 500);
    return result;
  }

  async getProgramAccreditation(schoolId: string, id: string): Promise<ProgramAccreditation | null> {
    const { data, error } = await this.supabase
      .from('program_accreditations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProgramAccreditation(schoolId: string, id: string, data: ProgramAccreditationUpdate): Promise<ProgramAccreditation> {
    const { data: result, error } = await this.supabase
      .from('program_accreditations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROGRAM_ACCREDITATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteProgramAccreditation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('program_accreditations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROGRAM_ACCREDITATION_DELETE_FAILED', 500);
  }

  async listprogramAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<ProgramAccreditation[]> {
    let query = this.supabase.from('program_accreditations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROGRAM_ACCREDITATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AuditFramework ────────────────────────────────────────────────────────
  async createAuditFramework(schoolId: string, data: AuditFrameworkCreate): Promise<AuditFramework> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('audit_frameworks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUDIT_FRAMEWORK_CREATE_FAILED', 500);
    return result;
  }

  async getAuditFramework(schoolId: string, id: string): Promise<AuditFramework | null> {
    const { data, error } = await this.supabase
      .from('audit_frameworks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAuditFramework(schoolId: string, id: string, data: AuditFrameworkUpdate): Promise<AuditFramework> {
    const { data: result, error } = await this.supabase
      .from('audit_frameworks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUDIT_FRAMEWORK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAuditFramework(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audit_frameworks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUDIT_FRAMEWORK_DELETE_FAILED', 500);
  }

  async listauditFrameworks(schoolId: string, filters?: Record<string, unknown>): Promise<AuditFramework[]> {
    let query = this.supabase.from('audit_frameworks').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_AUDIT_FRAMEWORK_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ComplianceCheck ───────────────────────────────────────────────────────
  async createComplianceCheck(schoolId: string, data: ComplianceCheckCreate): Promise<ComplianceCheck> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('compliance_checks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPLIANCE_CHECK_CREATE_FAILED', 500);
    return result;
  }

  async getComplianceCheck(schoolId: string, id: string): Promise<ComplianceCheck | null> {
    const { data, error } = await this.supabase
      .from('compliance_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateComplianceCheck(schoolId: string, id: string, data: ComplianceCheckUpdate): Promise<ComplianceCheck> {
    const { data: result, error } = await this.supabase
      .from('compliance_checks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPLIANCE_CHECK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteComplianceCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_checks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPLIANCE_CHECK_DELETE_FAILED', 500);
  }

  async listcomplianceChecks(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceCheck[]> {
    let query = this.supabase.from('compliance_checks').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPLIANCE_CHECK_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── EvidenceCollection ────────────────────────────────────────────────────
  async createEvidenceCollection(schoolId: string, data: EvidenceCollectionCreate): Promise<EvidenceCollection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('evidence_collections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EVIDENCE_COLLECTION_CREATE_FAILED', 500);
    return result;
  }

  async getEvidenceCollection(schoolId: string, id: string): Promise<EvidenceCollection | null> {
    const { data, error } = await this.supabase
      .from('evidence_collections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEvidenceCollection(schoolId: string, id: string, data: EvidenceCollectionUpdate): Promise<EvidenceCollection> {
    const { data: result, error } = await this.supabase
      .from('evidence_collections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_EVIDENCE_COLLECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEvidenceCollection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('evidence_collections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_EVIDENCE_COLLECTION_DELETE_FAILED', 500);
  }

  async listevidenceCollections(schoolId: string, filters?: Record<string, unknown>): Promise<EvidenceCollection[]> {
    let query = this.supabase.from('evidence_collections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_EVIDENCE_COLLECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AccreditationReport ───────────────────────────────────────────────────
  async createAccreditationReport(schoolId: string, data: AccreditationReportCreate): Promise<AccreditationReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('accreditation_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getAccreditationReport(schoolId: string, id: string): Promise<AccreditationReport | null> {
    const { data, error } = await this.supabase
      .from('accreditation_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAccreditationReport(schoolId: string, id: string, data: AccreditationReportUpdate): Promise<AccreditationReport> {
    const { data: result, error } = await this.supabase
      .from('accreditation_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAccreditationReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('accreditation_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_REPORT_DELETE_FAILED', 500);
  }

  async listaccreditationReports(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationReport[]> {
    let query = this.supabase.from('accreditation_reports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AccreditationRecommendation ───────────────────────────────────────────
  async createAccreditationRecommendation(schoolId: string, data: AccreditationRecommendationCreate): Promise<AccreditationRecommendation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('accreditation_recommendations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_RECOMMENDATION_CREATE_FAILED', 500);
    return result;
  }

  async getAccreditationRecommendation(schoolId: string, id: string): Promise<AccreditationRecommendation | null> {
    const { data, error } = await this.supabase
      .from('accreditation_recommendations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAccreditationRecommendation(schoolId: string, id: string, data: AccreditationRecommendationUpdate): Promise<AccreditationRecommendation> {
    const { data: result, error } = await this.supabase
      .from('accreditation_recommendations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_RECOMMENDATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAccreditationRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('accreditation_recommendations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_RECOMMENDATION_DELETE_FAILED', 500);
  }

  async listaccreditationRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationRecommendation[]> {
    let query = this.supabase.from('accreditation_recommendations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACCREDITATION_RECOMMENDATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CorrectiveAction ──────────────────────────────────────────────────────
  async createCorrectiveAction(schoolId: string, data: CorrectiveActionCreate): Promise<CorrectiveAction> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('corrective_actions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTIVE_ACTION_CREATE_FAILED', 500);
    return result;
  }

  async getCorrectiveAction(schoolId: string, id: string): Promise<CorrectiveAction | null> {
    const { data, error } = await this.supabase
      .from('corrective_actions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCorrectiveAction(schoolId: string, id: string, data: CorrectiveActionUpdate): Promise<CorrectiveAction> {
    const { data: result, error } = await this.supabase
      .from('corrective_actions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTIVE_ACTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCorrectiveAction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('corrective_actions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTIVE_ACTION_DELETE_FAILED', 500);
  }

  async listcorrectiveActions(schoolId: string, filters?: Record<string, unknown>): Promise<CorrectiveAction[]> {
    let query = this.supabase.from('corrective_actions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CORRECTIVE_ACTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RenewalWorkflow ───────────────────────────────────────────────────────
  async createRenewalWorkflow(schoolId: string, data: RenewalWorkflowCreate): Promise<RenewalWorkflow> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('renewal_workflows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RENEWAL_WORKFLOW_CREATE_FAILED', 500);
    return result;
  }

  async getRenewalWorkflow(schoolId: string, id: string): Promise<RenewalWorkflow | null> {
    const { data, error } = await this.supabase
      .from('renewal_workflows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRenewalWorkflow(schoolId: string, id: string, data: RenewalWorkflowUpdate): Promise<RenewalWorkflow> {
    const { data: result, error } = await this.supabase
      .from('renewal_workflows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RENEWAL_WORKFLOW_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRenewalWorkflow(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('renewal_workflows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RENEWAL_WORKFLOW_DELETE_FAILED', 500);
  }

  async listrenewalWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<RenewalWorkflow[]> {
    let query = this.supabase.from('renewal_workflows').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RENEWAL_WORKFLOW_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PlagiarismDetection ───────────────────────────────────────────────────
  async createPlagiarismDetection(schoolId: string, data: PlagiarismDetectionCreate): Promise<PlagiarismDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('plagiarism_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PLAGIARISM_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getPlagiarismDetection(schoolId: string, id: string): Promise<PlagiarismDetection | null> {
    const { data, error } = await this.supabase
      .from('plagiarism_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePlagiarismDetection(schoolId: string, id: string, data: PlagiarismDetectionUpdate): Promise<PlagiarismDetection> {
    const { data: result, error } = await this.supabase
      .from('plagiarism_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PLAGIARISM_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deletePlagiarismDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('plagiarism_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PLAGIARISM_DETECTION_DELETE_FAILED', 500);
  }

  async listplagiarismDetections(schoolId: string, filters?: Record<string, unknown>): Promise<PlagiarismDetection[]> {
    let query = this.supabase.from('plagiarism_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PLAGIARISM_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SimilarityDetection ───────────────────────────────────────────────────
  async createSimilarityDetection(schoolId: string, data: SimilarityDetectionCreate): Promise<SimilarityDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('similarity_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SIMILARITY_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getSimilarityDetection(schoolId: string, id: string): Promise<SimilarityDetection | null> {
    const { data, error } = await this.supabase
      .from('similarity_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSimilarityDetection(schoolId: string, id: string, data: SimilarityDetectionUpdate): Promise<SimilarityDetection> {
    const { data: result, error } = await this.supabase
      .from('similarity_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_SIMILARITY_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSimilarityDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('similarity_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_SIMILARITY_DETECTION_DELETE_FAILED', 500);
  }

  async listsimilarityDetections(schoolId: string, filters?: Record<string, unknown>): Promise<SimilarityDetection[]> {
    let query = this.supabase.from('similarity_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_SIMILARITY_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AIGeneratedContentDetection ───────────────────────────────────────────
  async createAIGeneratedContentDetection(schoolId: string, data: AIGeneratedContentDetectionCreate): Promise<AIGeneratedContentDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ai_generated_content_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_GENERATED_CONTENT_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getAIGeneratedContentDetection(schoolId: string, id: string): Promise<AIGeneratedContentDetection | null> {
    const { data, error } = await this.supabase
      .from('ai_generated_content_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAIGeneratedContentDetection(schoolId: string, id: string, data: AIGeneratedContentDetectionUpdate): Promise<AIGeneratedContentDetection> {
    const { data: result, error } = await this.supabase
      .from('ai_generated_content_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_GENERATED_CONTENT_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAIGeneratedContentDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_generated_content_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_GENERATED_CONTENT_DETECTION_DELETE_FAILED', 500);
  }

  async listaIGeneratedContentDetections(schoolId: string, filters?: Record<string, unknown>): Promise<AIGeneratedContentDetection[]> {
    let query = this.supabase.from('ai_generated_content_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_AI_GENERATED_CONTENT_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CitationChecker ───────────────────────────────────────────────────────
  async createCitationChecker(schoolId: string, data: CitationCheckerCreate): Promise<CitationChecker> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('citation_checkers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CITATION_CHECKER_CREATE_FAILED', 500);
    return result;
  }

  async getCitationChecker(schoolId: string, id: string): Promise<CitationChecker | null> {
    const { data, error } = await this.supabase
      .from('citation_checkers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCitationChecker(schoolId: string, id: string, data: CitationCheckerUpdate): Promise<CitationChecker> {
    const { data: result, error } = await this.supabase
      .from('citation_checkers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CITATION_CHECKER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCitationChecker(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('citation_checkers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CITATION_CHECKER_DELETE_FAILED', 500);
  }

  async listcitationCheckers(schoolId: string, filters?: Record<string, unknown>): Promise<CitationChecker[]> {
    let query = this.supabase.from('citation_checkers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CITATION_CHECKER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AcademicIntegrity ─────────────────────────────────────────────────────
  async createAcademicIntegrity(schoolId: string, data: AcademicIntegrityCreate): Promise<AcademicIntegrity> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('academic_integrities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_INTEGRITY_CREATE_FAILED', 500);
    return result;
  }

  async getAcademicIntegrity(schoolId: string, id: string): Promise<AcademicIntegrity | null> {
    const { data, error } = await this.supabase
      .from('academic_integrities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAcademicIntegrity(schoolId: string, id: string, data: AcademicIntegrityUpdate): Promise<AcademicIntegrity> {
    const { data: result, error } = await this.supabase
      .from('academic_integrities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_INTEGRITY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAcademicIntegrity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_integrities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_INTEGRITY_DELETE_FAILED', 500);
  }

  async listacademicIntegrities(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicIntegrity[]> {
    let query = this.supabase.from('academic_integrities').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_ACADEMIC_INTEGRITY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── FraudDetection ────────────────────────────────────────────────────────
  async createFraudDetection(schoolId: string, data: FraudDetectionCreate): Promise<FraudDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('fraud_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_FRAUD_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getFraudDetection(schoolId: string, id: string): Promise<FraudDetection | null> {
    const { data, error } = await this.supabase
      .from('fraud_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateFraudDetection(schoolId: string, id: string, data: FraudDetectionUpdate): Promise<FraudDetection> {
    const { data: result, error } = await this.supabase
      .from('fraud_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_FRAUD_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteFraudDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('fraud_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_FRAUD_DETECTION_DELETE_FAILED', 500);
  }

  async listfraudDetections(schoolId: string, filters?: Record<string, unknown>): Promise<FraudDetection[]> {
    let query = this.supabase.from('fraud_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_FRAUD_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ForgeryDetection ──────────────────────────────────────────────────────
  async createForgeryDetection(schoolId: string, data: ForgeryDetectionCreate): Promise<ForgeryDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('forgery_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_FORGERY_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getForgeryDetection(schoolId: string, id: string): Promise<ForgeryDetection | null> {
    const { data, error } = await this.supabase
      .from('forgery_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateForgeryDetection(schoolId: string, id: string, data: ForgeryDetectionUpdate): Promise<ForgeryDetection> {
    const { data: result, error } = await this.supabase
      .from('forgery_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_FORGERY_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteForgeryDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('forgery_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_FORGERY_DETECTION_DELETE_FAILED', 500);
  }

  async listforgeryDetections(schoolId: string, filters?: Record<string, unknown>): Promise<ForgeryDetection[]> {
    let query = this.supabase.from('forgery_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_FORGERY_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── IdentityVerification ──────────────────────────────────────────────────
  async createIdentityVerification(schoolId: string, data: IdentityVerificationCreate): Promise<IdentityVerification> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('identity_verifications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_IDENTITY_VERIFICATION_CREATE_FAILED', 500);
    return result;
  }

  async getIdentityVerification(schoolId: string, id: string): Promise<IdentityVerification | null> {
    const { data, error } = await this.supabase
      .from('identity_verifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIdentityVerification(schoolId: string, id: string, data: IdentityVerificationUpdate): Promise<IdentityVerification> {
    const { data: result, error } = await this.supabase
      .from('identity_verifications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_IDENTITY_VERIFICATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteIdentityVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_verifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_IDENTITY_VERIFICATION_DELETE_FAILED', 500);
  }

  async listidentityVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]> {
    let query = this.supabase.from('identity_verifications').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_IDENTITY_VERIFICATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── BehaviorAnalysis ──────────────────────────────────────────────────────
  async createBehaviorAnalysis(schoolId: string, data: BehaviorAnalysisCreate): Promise<BehaviorAnalysis> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('behavior_analyses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_BEHAVIOR_ANALYSIS_CREATE_FAILED', 500);
    return result;
  }

  async getBehaviorAnalysis(schoolId: string, id: string): Promise<BehaviorAnalysis | null> {
    const { data, error } = await this.supabase
      .from('behavior_analyses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBehaviorAnalysis(schoolId: string, id: string, data: BehaviorAnalysisUpdate): Promise<BehaviorAnalysis> {
    const { data: result, error } = await this.supabase
      .from('behavior_analyses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_BEHAVIOR_ANALYSIS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteBehaviorAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('behavior_analyses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_BEHAVIOR_ANALYSIS_DELETE_FAILED', 500);
  }

  async listbehaviorAnalysises(schoolId: string, filters?: Record<string, unknown>): Promise<BehaviorAnalysis[]> {
    let query = this.supabase.from('behavior_analyses').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_BEHAVIOR_ANALYSIS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── IntegrityRiskScore ────────────────────────────────────────────────────
  async createIntegrityRiskScore(schoolId: string, data: IntegrityRiskScoreCreate): Promise<IntegrityRiskScore> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('integrity_risk_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_RISK_SCORE_CREATE_FAILED', 500);
    return result;
  }

  async getIntegrityRiskScore(schoolId: string, id: string): Promise<IntegrityRiskScore | null> {
    const { data, error } = await this.supabase
      .from('integrity_risk_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIntegrityRiskScore(schoolId: string, id: string, data: IntegrityRiskScoreUpdate): Promise<IntegrityRiskScore> {
    const { data: result, error } = await this.supabase
      .from('integrity_risk_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_RISK_SCORE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteIntegrityRiskScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('integrity_risk_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_RISK_SCORE_DELETE_FAILED', 500);
  }

  async listintegrityRiskScores(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrityRiskScore[]> {
    let query = this.supabase.from('integrity_risk_scores').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_RISK_SCORE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── IntegrityReport ───────────────────────────────────────────────────────
  async createIntegrityReport(schoolId: string, data: IntegrityReportCreate): Promise<IntegrityReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('integrity_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getIntegrityReport(schoolId: string, id: string): Promise<IntegrityReport | null> {
    const { data, error } = await this.supabase
      .from('integrity_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIntegrityReport(schoolId: string, id: string, data: IntegrityReportUpdate): Promise<IntegrityReport> {
    const { data: result, error } = await this.supabase
      .from('integrity_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteIntegrityReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('integrity_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_REPORT_DELETE_FAILED', 500);
  }

  async listintegrityReports(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrityReport[]> {
    let query = this.supabase.from('integrity_reports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTEGRITY_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── StudentPortfolio ──────────────────────────────────────────────────────
  async createStudentPortfolio(schoolId: string, data: StudentPortfolioCreate): Promise<StudentPortfolio> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('student_portfolios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_STUDENT_PORTFOLIO_CREATE_FAILED', 500);
    return result;
  }

  async getStudentPortfolio(schoolId: string, id: string): Promise<StudentPortfolio | null> {
    const { data, error } = await this.supabase
      .from('student_portfolios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStudentPortfolio(schoolId: string, id: string, data: StudentPortfolioUpdate): Promise<StudentPortfolio> {
    const { data: result, error } = await this.supabase
      .from('student_portfolios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_STUDENT_PORTFOLIO_UPDATE_FAILED', 500);
    return result;
  }

  async deleteStudentPortfolio(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_portfolios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_STUDENT_PORTFOLIO_DELETE_FAILED', 500);
  }

  async liststudentPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<StudentPortfolio[]> {
    let query = this.supabase.from('student_portfolios').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_STUDENT_PORTFOLIO_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TeacherPortfolio ──────────────────────────────────────────────────────
  async createTeacherPortfolio(schoolId: string, data: TeacherPortfolioCreate): Promise<TeacherPortfolio> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('teacher_portfolios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_PORTFOLIO_CREATE_FAILED', 500);
    return result;
  }

  async getTeacherPortfolio(schoolId: string, id: string): Promise<TeacherPortfolio | null> {
    const { data, error } = await this.supabase
      .from('teacher_portfolios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherPortfolio(schoolId: string, id: string, data: TeacherPortfolioUpdate): Promise<TeacherPortfolio> {
    const { data: result, error } = await this.supabase
      .from('teacher_portfolios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_PORTFOLIO_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTeacherPortfolio(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_portfolios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_PORTFOLIO_DELETE_FAILED', 500);
  }

  async listteacherPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherPortfolio[]> {
    let query = this.supabase.from('teacher_portfolios').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_TEACHER_PORTFOLIO_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyPortfolio ───────────────────────────────────────────────────
  async createCompetencyPortfolio(schoolId: string, data: CompetencyPortfolioCreate): Promise<CompetencyPortfolio> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_portfolios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_PORTFOLIO_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyPortfolio(schoolId: string, id: string): Promise<CompetencyPortfolio | null> {
    const { data, error } = await this.supabase
      .from('competency_portfolios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyPortfolio(schoolId: string, id: string, data: CompetencyPortfolioUpdate): Promise<CompetencyPortfolio> {
    const { data: result, error } = await this.supabase
      .from('competency_portfolios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_PORTFOLIO_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyPortfolio(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_portfolios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_PORTFOLIO_DELETE_FAILED', 500);
  }

  async listcompetencyPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyPortfolio[]> {
    let query = this.supabase.from('competency_portfolios').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_COMPETENCY_PORTFOLIO_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Project ───────────────────────────────────────────────────────────────
  async createProject(schoolId: string, data: ProjectCreate): Promise<Project> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('projects')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROJECT_CREATE_FAILED', 500);
    return result;
  }

  async getProject(schoolId: string, id: string): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProject(schoolId: string, id: string, data: ProjectUpdate): Promise<Project> {
    const { data: result, error } = await this.supabase
      .from('projects')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROJECT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteProject(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROJECT_DELETE_FAILED', 500);
  }

  async listprojects(schoolId: string, filters?: Record<string, unknown>): Promise<Project[]> {
    let query = this.supabase.from('projects').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PROJECT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchEntry ─────────────────────────────────────────────────────────
  async createResearchEntry(schoolId: string, data: ResearchEntryCreate): Promise<ResearchEntry> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_entries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ENTRY_CREATE_FAILED', 500);
    return result;
  }

  async getResearchEntry(schoolId: string, id: string): Promise<ResearchEntry | null> {
    const { data, error } = await this.supabase
      .from('research_entries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchEntry(schoolId: string, id: string, data: ResearchEntryUpdate): Promise<ResearchEntry> {
    const { data: result, error } = await this.supabase
      .from('research_entries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ENTRY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_entries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ENTRY_DELETE_FAILED', 500);
  }

  async listresearchEntries(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchEntry[]> {
    let query = this.supabase.from('research_entries').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ENTRY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Internship ────────────────────────────────────────────────────────────
  async createInternship(schoolId: string, data: InternshipCreate): Promise<Internship> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('internships')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNSHIP_CREATE_FAILED', 500);
    return result;
  }

  async getInternship(schoolId: string, id: string): Promise<Internship | null> {
    const { data, error } = await this.supabase
      .from('internships')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInternship(schoolId: string, id: string, data: InternshipUpdate): Promise<Internship> {
    const { data: result, error } = await this.supabase
      .from('internships')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNSHIP_UPDATE_FAILED', 500);
    return result;
  }

  async deleteInternship(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('internships')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNSHIP_DELETE_FAILED', 500);
  }

  async listinternships(schoolId: string, filters?: Record<string, unknown>): Promise<Internship[]> {
    let query = this.supabase.from('internships').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNSHIP_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MediaItem ─────────────────────────────────────────────────────────────
  async createMediaItem(schoolId: string, data: MediaItemCreate): Promise<MediaItem> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('media_items')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MEDIA_ITEM_CREATE_FAILED', 500);
    return result;
  }

  async getMediaItem(schoolId: string, id: string): Promise<MediaItem | null> {
    const { data, error } = await this.supabase
      .from('media_items')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMediaItem(schoolId: string, id: string, data: MediaItemUpdate): Promise<MediaItem> {
    const { data: result, error } = await this.supabase
      .from('media_items')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_MEDIA_ITEM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMediaItem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('media_items')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_MEDIA_ITEM_DELETE_FAILED', 500);
  }

  async listmediaItems(schoolId: string, filters?: Record<string, unknown>): Promise<MediaItem[]> {
    let query = this.supabase.from('media_items').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_MEDIA_ITEM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PortfolioSharing ──────────────────────────────────────────────────────
  async createPortfolioSharing(schoolId: string, data: PortfolioSharingCreate): Promise<PortfolioSharing> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('portfolio_sharings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_SHARING_CREATE_FAILED', 500);
    return result;
  }

  async getPortfolioSharing(schoolId: string, id: string): Promise<PortfolioSharing | null> {
    const { data, error } = await this.supabase
      .from('portfolio_sharings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePortfolioSharing(schoolId: string, id: string, data: PortfolioSharingUpdate): Promise<PortfolioSharing> {
    const { data: result, error } = await this.supabase
      .from('portfolio_sharings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_SHARING_UPDATE_FAILED', 500);
    return result;
  }

  async deletePortfolioSharing(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('portfolio_sharings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_SHARING_DELETE_FAILED', 500);
  }

  async listportfolioSharings(schoolId: string, filters?: Record<string, unknown>): Promise<PortfolioSharing[]> {
    let query = this.supabase.from('portfolio_sharings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_SHARING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PublicPortfolio ───────────────────────────────────────────────────────
  async createPublicPortfolio(schoolId: string, data: PublicPortfolioCreate): Promise<PublicPortfolio> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('public_portfolios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_PORTFOLIO_CREATE_FAILED', 500);
    return result;
  }

  async getPublicPortfolio(schoolId: string, id: string): Promise<PublicPortfolio | null> {
    const { data, error } = await this.supabase
      .from('public_portfolios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePublicPortfolio(schoolId: string, id: string, data: PublicPortfolioUpdate): Promise<PublicPortfolio> {
    const { data: result, error } = await this.supabase
      .from('public_portfolios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_PORTFOLIO_UPDATE_FAILED', 500);
    return result;
  }

  async deletePublicPortfolio(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('public_portfolios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_PORTFOLIO_DELETE_FAILED', 500);
  }

  async listpublicPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<PublicPortfolio[]> {
    let query = this.supabase.from('public_portfolios').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLIC_PORTFOLIO_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PortfolioExport ───────────────────────────────────────────────────────
  async createPortfolioExport(schoolId: string, data: PortfolioExportCreate): Promise<PortfolioExport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('portfolio_exports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_EXPORT_CREATE_FAILED', 500);
    return result;
  }

  async getPortfolioExport(schoolId: string, id: string): Promise<PortfolioExport | null> {
    const { data, error } = await this.supabase
      .from('portfolio_exports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePortfolioExport(schoolId: string, id: string, data: PortfolioExportUpdate): Promise<PortfolioExport> {
    const { data: result, error } = await this.supabase
      .from('portfolio_exports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_EXPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deletePortfolioExport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('portfolio_exports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_EXPORT_DELETE_FAILED', 500);
  }

  async listportfolioExports(schoolId: string, filters?: Record<string, unknown>): Promise<PortfolioExport[]> {
    let query = this.supabase.from('portfolio_exports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PORTFOLIO_EXPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchProject ───────────────────────────────────────────────────────
  async createResearchProject(schoolId: string, data: ResearchProjectCreate): Promise<ResearchProject> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_projects')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_PROJECT_CREATE_FAILED', 500);
    return result;
  }

  async getResearchProject(schoolId: string, id: string): Promise<ResearchProject | null> {
    const { data, error } = await this.supabase
      .from('research_projects')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchProject(schoolId: string, id: string, data: ResearchProjectUpdate): Promise<ResearchProject> {
    const { data: result, error } = await this.supabase
      .from('research_projects')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_PROJECT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchProject(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_projects')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_PROJECT_DELETE_FAILED', 500);
  }

  async listresearchProjects(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchProject[]> {
    let query = this.supabase.from('research_projects').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_PROJECT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── InnovationLab ─────────────────────────────────────────────────────────
  async createInnovationLab(schoolId: string, data: InnovationLabCreate): Promise<InnovationLab> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('innovation_labs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INNOVATION_LAB_CREATE_FAILED', 500);
    return result;
  }

  async getInnovationLab(schoolId: string, id: string): Promise<InnovationLab | null> {
    const { data, error } = await this.supabase
      .from('innovation_labs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInnovationLab(schoolId: string, id: string, data: InnovationLabUpdate): Promise<InnovationLab> {
    const { data: result, error } = await this.supabase
      .from('innovation_labs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INNOVATION_LAB_UPDATE_FAILED', 500);
    return result;
  }

  async deleteInnovationLab(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('innovation_labs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_INNOVATION_LAB_DELETE_FAILED', 500);
  }

  async listinnovationLabs(schoolId: string, filters?: Record<string, unknown>): Promise<InnovationLab[]> {
    let query = this.supabase.from('innovation_labs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_INNOVATION_LAB_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Publication ───────────────────────────────────────────────────────────
  async createPublication(schoolId: string, data: PublicationCreate): Promise<Publication> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('publications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLICATION_CREATE_FAILED', 500);
    return result;
  }

  async getPublication(schoolId: string, id: string): Promise<Publication | null> {
    const { data, error } = await this.supabase
      .from('publications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePublication(schoolId: string, id: string, data: PublicationUpdate): Promise<Publication> {
    const { data: result, error } = await this.supabase
      .from('publications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLICATION_UPDATE_FAILED', 500);
    return result;
  }

  async deletePublication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('publications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLICATION_DELETE_FAILED', 500);
  }

  async listpublications(schoolId: string, filters?: Record<string, unknown>): Promise<Publication[]> {
    let query = this.supabase.from('publications').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PUBLICATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchRepository ────────────────────────────────────────────────────
  async createResearchRepository(schoolId: string, data: ResearchRepositoryCreate): Promise<ResearchRepository> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_repositories')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_REPOSITORY_CREATE_FAILED', 500);
    return result;
  }

  async getResearchRepository(schoolId: string, id: string): Promise<ResearchRepository | null> {
    const { data, error } = await this.supabase
      .from('research_repositories')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchRepository(schoolId: string, id: string, data: ResearchRepositoryUpdate): Promise<ResearchRepository> {
    const { data: result, error } = await this.supabase
      .from('research_repositories')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_REPOSITORY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchRepository(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_repositories')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_REPOSITORY_DELETE_FAILED', 500);
  }

  async listresearchRepositories(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchRepository[]> {
    let query = this.supabase.from('research_repositories').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_REPOSITORY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchGrant ─────────────────────────────────────────────────────────
  async createResearchGrant(schoolId: string, data: ResearchGrantCreate): Promise<ResearchGrant> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_grants')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_GRANT_CREATE_FAILED', 500);
    return result;
  }

  async getResearchGrant(schoolId: string, id: string): Promise<ResearchGrant | null> {
    const { data, error } = await this.supabase
      .from('research_grants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchGrant(schoolId: string, id: string, data: ResearchGrantUpdate): Promise<ResearchGrant> {
    const { data: result, error } = await this.supabase
      .from('research_grants')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_GRANT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchGrant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_grants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_GRANT_DELETE_FAILED', 500);
  }

  async listresearchGrants(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchGrant[]> {
    let query = this.supabase.from('research_grants').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_GRANT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchTeam ──────────────────────────────────────────────────────────
  async createResearchTeam(schoolId: string, data: ResearchTeamCreate): Promise<ResearchTeam> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_teams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_TEAM_CREATE_FAILED', 500);
    return result;
  }

  async getResearchTeam(schoolId: string, id: string): Promise<ResearchTeam | null> {
    const { data, error } = await this.supabase
      .from('research_teams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchTeam(schoolId: string, id: string, data: ResearchTeamUpdate): Promise<ResearchTeam> {
    const { data: result, error } = await this.supabase
      .from('research_teams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_TEAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchTeam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_teams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_TEAM_DELETE_FAILED', 500);
  }

  async listresearchTeams(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchTeam[]> {
    let query = this.supabase.from('research_teams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_TEAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchAnalytics ─────────────────────────────────────────────────────
  async createResearchAnalytics(schoolId: string, data: ResearchAnalyticsCreate): Promise<ResearchAnalytics> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_analytics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ANALYTICS_CREATE_FAILED', 500);
    return result;
  }

  async getResearchAnalytics(schoolId: string, id: string): Promise<ResearchAnalytics | null> {
    const { data, error } = await this.supabase
      .from('research_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchAnalytics(schoolId: string, id: string, data: ResearchAnalyticsUpdate): Promise<ResearchAnalytics> {
    const { data: result, error } = await this.supabase
      .from('research_analytics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ANALYTICS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ANALYTICS_DELETE_FAILED', 500);
  }

  async listresearchAnalyticses(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchAnalytics[]> {
    let query = this.supabase.from('research_analytics').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_ANALYTICS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchKPI ───────────────────────────────────────────────────────────
  async createResearchKPI(schoolId: string, data: ResearchKPICreate): Promise<ResearchKPI> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_KPI_CREATE_FAILED', 500);
    return result;
  }

  async getResearchKPI(schoolId: string, id: string): Promise<ResearchKPI | null> {
    const { data, error } = await this.supabase
      .from('research_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchKPI(schoolId: string, id: string, data: ResearchKPIUpdate): Promise<ResearchKPI> {
    const { data: result, error } = await this.supabase
      .from('research_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_KPI_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_KPI_DELETE_FAILED', 500);
  }

  async listresearchKPIs(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchKPI[]> {
    let query = this.supabase.from('research_kpis').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_KPI_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PatentTracking ────────────────────────────────────────────────────────
  async createPatentTracking(schoolId: string, data: PatentTrackingCreate): Promise<PatentTracking> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('patent_trackings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PATENT_TRACKING_CREATE_FAILED', 500);
    return result;
  }

  async getPatentTracking(schoolId: string, id: string): Promise<PatentTracking | null> {
    const { data, error } = await this.supabase
      .from('patent_trackings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePatentTracking(schoolId: string, id: string, data: PatentTrackingUpdate): Promise<PatentTracking> {
    const { data: result, error } = await this.supabase
      .from('patent_trackings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_PATENT_TRACKING_UPDATE_FAILED', 500);
    return result;
  }

  async deletePatentTracking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('patent_trackings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_PATENT_TRACKING_DELETE_FAILED', 500);
  }

  async listpatentTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<PatentTracking[]> {
    let query = this.supabase.from('patent_trackings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_PATENT_TRACKING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResearchCollaboration ─────────────────────────────────────────────────
  async createResearchCollaboration(schoolId: string, data: ResearchCollaborationCreate): Promise<ResearchCollaboration> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('research_collaborations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_COLLABORATION_CREATE_FAILED', 500);
    return result;
  }

  async getResearchCollaboration(schoolId: string, id: string): Promise<ResearchCollaboration | null> {
    const { data, error } = await this.supabase
      .from('research_collaborations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchCollaboration(schoolId: string, id: string, data: ResearchCollaborationUpdate): Promise<ResearchCollaboration> {
    const { data: result, error } = await this.supabase
      .from('research_collaborations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_COLLABORATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResearchCollaboration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_collaborations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_COLLABORATION_DELETE_FAILED', 500);
  }

  async listresearchCollaborations(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchCollaboration[]> {
    let query = this.supabase.from('research_collaborations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RESEARCH_COLLABORATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── InternationalExam ─────────────────────────────────────────────────────
  async createInternationalExam(schoolId: string, data: InternationalExamCreate): Promise<InternationalExam> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('international_exams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_EXAM_CREATE_FAILED', 500);
    return result;
  }

  async getInternationalExam(schoolId: string, id: string): Promise<InternationalExam | null> {
    const { data, error } = await this.supabase
      .from('international_exams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInternationalExam(schoolId: string, id: string, data: InternationalExamUpdate): Promise<InternationalExam> {
    const { data: result, error } = await this.supabase
      .from('international_exams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_EXAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteInternationalExam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('international_exams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_EXAM_DELETE_FAILED', 500);
  }

  async listinternationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalExam[]> {
    let query = this.supabase.from('international_exams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_EXAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── InternationalCredit ───────────────────────────────────────────────────
  async createInternationalCredit(schoolId: string, data: InternationalCreditCreate): Promise<InternationalCredit> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('international_credits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_CREDIT_CREATE_FAILED', 500);
    return result;
  }

  async getInternationalCredit(schoolId: string, id: string): Promise<InternationalCredit | null> {
    const { data, error } = await this.supabase
      .from('international_credits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInternationalCredit(schoolId: string, id: string, data: InternationalCreditUpdate): Promise<InternationalCredit> {
    const { data: result, error } = await this.supabase
      .from('international_credits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_CREDIT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteInternationalCredit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('international_credits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_CREDIT_DELETE_FAILED', 500);
  }

  async listinternationalCredits(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalCredit[]> {
    let query = this.supabase.from('international_credits').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_INTERNATIONAL_CREDIT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CreditTransfer ────────────────────────────────────────────────────────
  async createCreditTransfer(schoolId: string, data: CreditTransferCreate): Promise<CreditTransfer> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('credit_transfers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CREDIT_TRANSFER_CREATE_FAILED', 500);
    return result;
  }

  async getCreditTransfer(schoolId: string, id: string): Promise<CreditTransfer | null> {
    const { data, error } = await this.supabase
      .from('credit_transfers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCreditTransfer(schoolId: string, id: string, data: CreditTransferUpdate): Promise<CreditTransfer> {
    const { data: result, error } = await this.supabase
      .from('credit_transfers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_CREDIT_TRANSFER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCreditTransfer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('credit_transfers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_CREDIT_TRANSFER_DELETE_FAILED', 500);
  }

  async listcreditTransfers(schoolId: string, filters?: Record<string, unknown>): Promise<CreditTransfer[]> {
    let query = this.supabase.from('credit_transfers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_CREDIT_TRANSFER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecognitionEngine ─────────────────────────────────────────────────────
  async createRecognitionEngine(schoolId: string, data: RecognitionEngineCreate): Promise<RecognitionEngine> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recognition_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RECOGNITION_ENGINE_CREATE_FAILED', 500);
    return result;
  }

  async getRecognitionEngine(schoolId: string, id: string): Promise<RecognitionEngine | null> {
    const { data, error } = await this.supabase
      .from('recognition_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecognitionEngine(schoolId: string, id: string, data: RecognitionEngineUpdate): Promise<RecognitionEngine> {
    const { data: result, error } = await this.supabase
      .from('recognition_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ASSESSMENT_RECOGNITION_ENGINE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecognitionEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recognition_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ASSESSMENT_RECOGNITION_ENGINE_DELETE_FAILED', 500);
  }

  async listrecognitionEngines(schoolId: string, filters?: Record<string, unknown>): Promise<RecognitionEngine[]> {
    let query = this.supabase.from('recognition_engines').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ASSESSMENT_RECOGNITION_ENGINE_LIST_FAILED', 500);
    return data ?? [];
  }
}

export function createAssessmentRepository(supabase: SupabaseClient): AssessmentRepository {
  return new AssessmentRepositoryImpl(supabase);
}