import { SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '@educi/errors';
import type {
  LearningProfile, SkillGraph, Competency, CompetencyProgression,
  MasteryTracking, KnowledgeMap, LearningObjective, LearningPath,
  AdaptiveSequencing, AdaptiveRecommendation, WeaknessDetection,
  StrengthDetection, DifficultyAdjustmentRecord, LearningPace,
  PersonalizedCurriculum, RemediationPlan, SkillAssessment,
  CognitiveProfile, MemoryRetention, AttentionScore, MotivationIndex,
  EngagementIndex, LearningSpeed, LearningCurve, BehaviourPrediction,
  AcademicRisk, EmotionalIndicator, BurnoutDetection, InterventionSuggestion,
  DynamicQuiz, AdaptiveHomework, PersonalizedExercise, SmartRevision,
  AIQuestionGenerator, HintUsage, ErrorAnalysis, ConceptReinforcement,
  AITutor, TutorConversation, HomeworkAssistance, ConceptExplanation,
  ConversationMemory, MathSolver, ScienceSolver, ProgrammingTutor,
  EssayAssistant, MasteryDashboard, CompetencyDashboard, KnowledgeHeatmap,
  LearningTimeline, SkillEvolution, WeakTopicsReport, StrongTopicsReport,
  TeacherInsights, ParentInsights, SchoolInsights, AnalyticsReport,
  RecommendedLesson, RecommendedVideo, RecommendedBook, RecommendedExercise,
  RecommendedProject, RecommendedGroup, RecommendedTutor, RecommendedExam,
  CompetencyFramework, FrameworkCompetency, FrameworkProgress,
  DigitalLesson, InteractiveLesson, Simulation, VirtualLab,
  ARLesson, VRLesson, VideoLesson, AudioLesson, Podcast, Flashcard, MindMap,
  AdaptiveExam, CompetencyExam, AICorrection, Rubric,
  AutoGradingResult, EssayEvaluation, OralEvaluation, PracticalEvaluation,
  XP, Level, Achievement, Mission, DailyChallenge, WeeklyChallenge,
  Leaderboard, Team, Avatar, Reward, Badge, VirtualCurrency, CurrencyTransaction,
  ParentRecommendation, ParentAlert, ParentCoaching, HomeActivity, ParentWeeklyReport,
  LessonPlan, ExamTemplate, HomeworkTemplate, RubricTemplate,
  ClassroomInsights, AttendanceInsights, TeacherIntervention, LessonRecommendation,
  SchoolPerformanceAI, TeacherPerformanceAI, CurriculumAnalysis,
  ResourceAllocation, RiskPrediction, NationalComparison,
} from '@educi/types';

const now = () => new Date().toISOString();

export interface AdaptiveRepository {
  // ─── Module 1 ─────────────────────────────────────────────────────────
  createLearningProfile(schoolId: string, data: Omit<LearningProfile, 'id' | 'created_at' | 'updated_at'>): Promise<LearningProfile>;
  getLearningProfile(schoolId: string, id: string): Promise<LearningProfile | null>;
  updateLearningProfile(schoolId: string, id: string, data: Partial<LearningProfile>): Promise<LearningProfile>;
  deleteLearningProfile(schoolId: string, id: string): Promise<void>;
  listLearningProfiles(schoolId: string, filters?: Record<string, unknown>): Promise<LearningProfile[]>;

  createSkillGraph(schoolId: string, data: Omit<SkillGraph, 'id' | 'created_at' | 'updated_at'>): Promise<SkillGraph>;
  getSkillGraph(schoolId: string, id: string): Promise<SkillGraph | null>;
  updateSkillGraph(schoolId: string, id: string, data: Partial<SkillGraph>): Promise<SkillGraph>;
  deleteSkillGraph(schoolId: string, id: string): Promise<void>;
  listSkillGraphs(schoolId: string, filters?: Record<string, unknown>): Promise<SkillGraph[]>;

  createCompetency(schoolId: string, data: Omit<Competency, 'id' | 'created_at' | 'updated_at'>): Promise<Competency>;
  getCompetency(schoolId: string, id: string): Promise<Competency | null>;
  updateCompetency(schoolId: string, id: string, data: Partial<Competency>): Promise<Competency>;
  deleteCompetency(schoolId: string, id: string): Promise<void>;
  listCompetencies(schoolId: string, filters?: Record<string, unknown>): Promise<Competency[]>;

  createCompetencyProgression(schoolId: string, data: Omit<CompetencyProgression, 'id' | 'created_at'>): Promise<CompetencyProgression>;
  getCompetencyProgression(schoolId: string, id: string): Promise<CompetencyProgression | null>;
  updateCompetencyProgression(schoolId: string, id: string, data: Partial<CompetencyProgression>): Promise<CompetencyProgression>;
  deleteCompetencyProgression(schoolId: string, id: string): Promise<void>;
  listCompetencyProgressions(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyProgression[]>;

  createMasteryTracking(schoolId: string, data: Omit<MasteryTracking, 'id' | 'created_at' | 'updated_at'>): Promise<MasteryTracking>;
  getMasteryTracking(schoolId: string, id: string): Promise<MasteryTracking | null>;
  updateMasteryTracking(schoolId: string, id: string, data: Partial<MasteryTracking>): Promise<MasteryTracking>;
  deleteMasteryTracking(schoolId: string, id: string): Promise<void>;
  listMasteryTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<MasteryTracking[]>;

  createKnowledgeMap(schoolId: string, data: Omit<KnowledgeMap, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeMap>;
  getKnowledgeMap(schoolId: string, id: string): Promise<KnowledgeMap | null>;
  updateKnowledgeMap(schoolId: string, id: string, data: Partial<KnowledgeMap>): Promise<KnowledgeMap>;
  deleteKnowledgeMap(schoolId: string, id: string): Promise<void>;
  listKnowledgeMaps(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeMap[]>;

  createLearningObjective(schoolId: string, data: Omit<LearningObjective, 'id' | 'created_at' | 'updated_at'>): Promise<LearningObjective>;
  getLearningObjective(schoolId: string, id: string): Promise<LearningObjective | null>;
  updateLearningObjective(schoolId: string, id: string, data: Partial<LearningObjective>): Promise<LearningObjective>;
  deleteLearningObjective(schoolId: string, id: string): Promise<void>;
  listLearningObjectives(schoolId: string, filters?: Record<string, unknown>): Promise<LearningObjective[]>;

  createLearningPath(schoolId: string, data: Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>): Promise<LearningPath>;
  getLearningPath(schoolId: string, id: string): Promise<LearningPath | null>;
  updateLearningPath(schoolId: string, id: string, data: Partial<LearningPath>): Promise<LearningPath>;
  deleteLearningPath(schoolId: string, id: string): Promise<void>;
  listLearningPaths(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPath[]>;

  createAdaptiveSequencing(schoolId: string, data: Omit<AdaptiveSequencing, 'id' | 'created_at' | 'updated_at'>): Promise<AdaptiveSequencing>;
  getAdaptiveSequencing(schoolId: string, id: string): Promise<AdaptiveSequencing | null>;
  updateAdaptiveSequencing(schoolId: string, id: string, data: Partial<AdaptiveSequencing>): Promise<AdaptiveSequencing>;
  deleteAdaptiveSequencing(schoolId: string, id: string): Promise<void>;
  listAdaptiveSequencings(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveSequencing[]>;

  createAdaptiveRecommendation(schoolId: string, data: Omit<AdaptiveRecommendation, 'id' | 'created_at'>): Promise<AdaptiveRecommendation>;
  getAdaptiveRecommendation(schoolId: string, id: string): Promise<AdaptiveRecommendation | null>;
  updateAdaptiveRecommendation(schoolId: string, id: string, data: Partial<AdaptiveRecommendation>): Promise<AdaptiveRecommendation>;
  deleteAdaptiveRecommendation(schoolId: string, id: string): Promise<void>;
  listAdaptiveRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveRecommendation[]>;

  createWeaknessDetection(schoolId: string, data: Omit<WeaknessDetection, 'id' | 'detected_at'>): Promise<WeaknessDetection>;
  getWeaknessDetection(schoolId: string, id: string): Promise<WeaknessDetection | null>;
  updateWeaknessDetection(schoolId: string, id: string, data: Partial<WeaknessDetection>): Promise<WeaknessDetection>;
  deleteWeaknessDetection(schoolId: string, id: string): Promise<void>;
  listWeaknessDetections(schoolId: string, filters?: Record<string, unknown>): Promise<WeaknessDetection[]>;

  createStrengthDetection(schoolId: string, data: Omit<StrengthDetection, 'id' | 'detected_at'>): Promise<StrengthDetection>;
  getStrengthDetection(schoolId: string, id: string): Promise<StrengthDetection | null>;
  updateStrengthDetection(schoolId: string, id: string, data: Partial<StrengthDetection>): Promise<StrengthDetection>;
  deleteStrengthDetection(schoolId: string, id: string): Promise<void>;
  listStrengthDetections(schoolId: string, filters?: Record<string, unknown>): Promise<StrengthDetection[]>;

  createDifficultyAdjustment(schoolId: string, data: Omit<DifficultyAdjustmentRecord, 'id' | 'adjusted_at'>): Promise<DifficultyAdjustmentRecord>;
  getDifficultyAdjustment(schoolId: string, id: string): Promise<DifficultyAdjustmentRecord | null>;
  updateDifficultyAdjustment(schoolId: string, id: string, data: Partial<DifficultyAdjustmentRecord>): Promise<DifficultyAdjustmentRecord>;
  deleteDifficultyAdjustment(schoolId: string, id: string): Promise<void>;
  listDifficultyAdjustments(schoolId: string, filters?: Record<string, unknown>): Promise<DifficultyAdjustmentRecord[]>;

  createLearningPace(schoolId: string, data: Omit<LearningPace, 'id' | 'created_at' | 'updated_at'>): Promise<LearningPace>;
  getLearningPace(schoolId: string, id: string): Promise<LearningPace | null>;
  updateLearningPace(schoolId: string, id: string, data: Partial<LearningPace>): Promise<LearningPace>;
  deleteLearningPace(schoolId: string, id: string): Promise<void>;
  listLearningPaces(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPace[]>;

  createPersonalizedCurriculum(schoolId: string, data: Omit<PersonalizedCurriculum, 'id' | 'created_at' | 'updated_at'>): Promise<PersonalizedCurriculum>;
  getPersonalizedCurriculum(schoolId: string, id: string): Promise<PersonalizedCurriculum | null>;
  updatePersonalizedCurriculum(schoolId: string, id: string, data: Partial<PersonalizedCurriculum>): Promise<PersonalizedCurriculum>;
  deletePersonalizedCurriculum(schoolId: string, id: string): Promise<void>;
  listPersonalizedCurriculums(schoolId: string, filters?: Record<string, unknown>): Promise<PersonalizedCurriculum[]>;

  createRemediationPlan(schoolId: string, data: Omit<RemediationPlan, 'id' | 'created_at' | 'updated_at'>): Promise<RemediationPlan>;
  getRemediationPlan(schoolId: string, id: string): Promise<RemediationPlan | null>;
  updateRemediationPlan(schoolId: string, id: string, data: Partial<RemediationPlan>): Promise<RemediationPlan>;
  deleteRemediationPlan(schoolId: string, id: string): Promise<void>;
  listRemediationPlans(schoolId: string, filters?: Record<string, unknown>): Promise<RemediationPlan[]>;

  createSkillAssessment(schoolId: string, data: Omit<SkillAssessment, 'id' | 'assessed_at'>): Promise<SkillAssessment>;
  getSkillAssessment(schoolId: string, id: string): Promise<SkillAssessment | null>;
  updateSkillAssessment(schoolId: string, id: string, data: Partial<SkillAssessment>): Promise<SkillAssessment>;
  deleteSkillAssessment(schoolId: string, id: string): Promise<void>;
  listSkillAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<SkillAssessment[]>;
  // ─── Module 2 ─────────────────────────────────────────────────────────
  createCognitiveProfile(schoolId: string, data: Omit<CognitiveProfile, 'id' | 'created_at' | 'updated_at'>): Promise<CognitiveProfile>;
  getCognitiveProfile(schoolId: string, id: string): Promise<CognitiveProfile | null>;
  updateCognitiveProfile(schoolId: string, id: string, data: Partial<CognitiveProfile>): Promise<CognitiveProfile>;
  deleteCognitiveProfile(schoolId: string, id: string): Promise<void>;
  listCognitiveProfiles(schoolId: string, filters?: Record<string, unknown>): Promise<CognitiveProfile[]>;

  createMemoryRetention(schoolId: string, data: Omit<MemoryRetention, 'id' | 'created_at' | 'updated_at'>): Promise<MemoryRetention>;
  getMemoryRetention(schoolId: string, id: string): Promise<MemoryRetention | null>;
  updateMemoryRetention(schoolId: string, id: string, data: Partial<MemoryRetention>): Promise<MemoryRetention>;
  deleteMemoryRetention(schoolId: string, id: string): Promise<void>;
  listMemoryRetentions(schoolId: string, filters?: Record<string, unknown>): Promise<MemoryRetention[]>;

  createAttentionScore(schoolId: string, data: Omit<AttentionScore, 'id' | 'created_at'>): Promise<AttentionScore>;
  getAttentionScore(schoolId: string, id: string): Promise<AttentionScore | null>;
  updateAttentionScore(schoolId: string, id: string, data: Partial<AttentionScore>): Promise<AttentionScore>;
  deleteAttentionScore(schoolId: string, id: string): Promise<void>;
  listAttentionScores(schoolId: string, filters?: Record<string, unknown>): Promise<AttentionScore[]>;

  createMotivationIndex(schoolId: string, data: Omit<MotivationIndex, 'id' | 'created_at' | 'updated_at'>): Promise<MotivationIndex>;
  getMotivationIndex(schoolId: string, id: string): Promise<MotivationIndex | null>;
  updateMotivationIndex(schoolId: string, id: string, data: Partial<MotivationIndex>): Promise<MotivationIndex>;
  deleteMotivationIndex(schoolId: string, id: string): Promise<void>;
  listMotivationIndices(schoolId: string, filters?: Record<string, unknown>): Promise<MotivationIndex[]>;

  createEngagementIndex(schoolId: string, data: Omit<EngagementIndex, 'id' | 'created_at' | 'updated_at'>): Promise<EngagementIndex>;
  getEngagementIndex(schoolId: string, id: string): Promise<EngagementIndex | null>;
  updateEngagementIndex(schoolId: string, id: string, data: Partial<EngagementIndex>): Promise<EngagementIndex>;
  deleteEngagementIndex(schoolId: string, id: string): Promise<void>;
  listEngagementIndices(schoolId: string, filters?: Record<string, unknown>): Promise<EngagementIndex[]>;

  createLearningSpeed(schoolId: string, data: Omit<LearningSpeed, 'id' | 'created_at' | 'updated_at'>): Promise<LearningSpeed>;
  getLearningSpeed(schoolId: string, id: string): Promise<LearningSpeed | null>;
  updateLearningSpeed(schoolId: string, id: string, data: Partial<LearningSpeed>): Promise<LearningSpeed>;
  deleteLearningSpeed(schoolId: string, id: string): Promise<void>;
  listLearningSpeeds(schoolId: string, filters?: Record<string, unknown>): Promise<LearningSpeed[]>;

  createLearningCurve(schoolId: string, data: Omit<LearningCurve, 'id' | 'created_at'>): Promise<LearningCurve>;
  getLearningCurve(schoolId: string, id: string): Promise<LearningCurve | null>;
  updateLearningCurve(schoolId: string, id: string, data: Partial<LearningCurve>): Promise<LearningCurve>;
  deleteLearningCurve(schoolId: string, id: string): Promise<void>;
  listLearningCurves(schoolId: string, filters?: Record<string, unknown>): Promise<LearningCurve[]>;

  createBehaviourPrediction(schoolId: string, data: Omit<BehaviourPrediction, 'id' | 'created_at'>): Promise<BehaviourPrediction>;
  getBehaviourPrediction(schoolId: string, id: string): Promise<BehaviourPrediction | null>;
  updateBehaviourPrediction(schoolId: string, id: string, data: Partial<BehaviourPrediction>): Promise<BehaviourPrediction>;
  deleteBehaviourPrediction(schoolId: string, id: string): Promise<void>;
  listBehaviourPredictions(schoolId: string, filters?: Record<string, unknown>): Promise<BehaviourPrediction[]>;

  createAcademicRisk(schoolId: string, data: Omit<AcademicRisk, 'id' | 'created_at' | 'updated_at'>): Promise<AcademicRisk>;
  getAcademicRisk(schoolId: string, id: string): Promise<AcademicRisk | null>;
  updateAcademicRisk(schoolId: string, id: string, data: Partial<AcademicRisk>): Promise<AcademicRisk>;
  deleteAcademicRisk(schoolId: string, id: string): Promise<void>;
  listAcademicRisks(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicRisk[]>;

  createEmotionalIndicator(schoolId: string, data: Omit<EmotionalIndicator, 'id' | 'detected_at'>): Promise<EmotionalIndicator>;
  getEmotionalIndicator(schoolId: string, id: string): Promise<EmotionalIndicator | null>;
  updateEmotionalIndicator(schoolId: string, id: string, data: Partial<EmotionalIndicator>): Promise<EmotionalIndicator>;
  deleteEmotionalIndicator(schoolId: string, id: string): Promise<void>;
  listEmotionalIndicators(schoolId: string, filters?: Record<string, unknown>): Promise<EmotionalIndicator[]>;

  createBurnoutDetection(schoolId: string, data: Omit<BurnoutDetection, 'id' | 'detected_at' | 'created_at'>): Promise<BurnoutDetection>;
  getBurnoutDetection(schoolId: string, id: string): Promise<BurnoutDetection | null>;
  updateBurnoutDetection(schoolId: string, id: string, data: Partial<BurnoutDetection>): Promise<BurnoutDetection>;
  deleteBurnoutDetection(schoolId: string, id: string): Promise<void>;
  listBurnoutDetections(schoolId: string, filters?: Record<string, unknown>): Promise<BurnoutDetection[]>;

  createInterventionSuggestion(schoolId: string, data: Omit<InterventionSuggestion, 'id' | 'created_at'>): Promise<InterventionSuggestion>;
  getInterventionSuggestion(schoolId: string, id: string): Promise<InterventionSuggestion | null>;
  updateInterventionSuggestion(schoolId: string, id: string, data: Partial<InterventionSuggestion>): Promise<InterventionSuggestion>;
  deleteInterventionSuggestion(schoolId: string, id: string): Promise<void>;
  listInterventionSuggestions(schoolId: string, filters?: Record<string, unknown>): Promise<InterventionSuggestion[]>;

  // ─── Module 3 ─────────────────────────────────────────────────────────
  createDynamicQuiz(schoolId: string, data: Omit<DynamicQuiz, 'id' | 'created_at'>): Promise<DynamicQuiz>;
  getDynamicQuiz(schoolId: string, id: string): Promise<DynamicQuiz | null>;
  updateDynamicQuiz(schoolId: string, id: string, data: Partial<DynamicQuiz>): Promise<DynamicQuiz>;
  deleteDynamicQuiz(schoolId: string, id: string): Promise<void>;
  listDynamicQuizzes(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicQuiz[]>;

  createAdaptiveHomework(schoolId: string, data: Omit<AdaptiveHomework, 'id' | 'created_at'>): Promise<AdaptiveHomework>;
  getAdaptiveHomework(schoolId: string, id: string): Promise<AdaptiveHomework | null>;
  updateAdaptiveHomework(schoolId: string, id: string, data: Partial<AdaptiveHomework>): Promise<AdaptiveHomework>;
  deleteAdaptiveHomework(schoolId: string, id: string): Promise<void>;
  listAdaptiveHomeworks(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveHomework[]>;

  createPersonalizedExercise(schoolId: string, data: Omit<PersonalizedExercise, 'id' | 'created_at'>): Promise<PersonalizedExercise>;
  getPersonalizedExercise(schoolId: string, id: string): Promise<PersonalizedExercise | null>;
  updatePersonalizedExercise(schoolId: string, id: string, data: Partial<PersonalizedExercise>): Promise<PersonalizedExercise>;
  deletePersonalizedExercise(schoolId: string, id: string): Promise<void>;
  listPersonalizedExercises(schoolId: string, filters?: Record<string, unknown>): Promise<PersonalizedExercise[]>;

  createSmartRevision(schoolId: string, data: Omit<SmartRevision, 'id' | 'created_at'>): Promise<SmartRevision>;
  getSmartRevision(schoolId: string, id: string): Promise<SmartRevision | null>;
  updateSmartRevision(schoolId: string, id: string, data: Partial<SmartRevision>): Promise<SmartRevision>;
  deleteSmartRevision(schoolId: string, id: string): Promise<void>;
  listSmartRevisions(schoolId: string, filters?: Record<string, unknown>): Promise<SmartRevision[]>;

  createAIQuestionGenerator(schoolId: string, data: Omit<AIQuestionGenerator, 'id' | 'created_at'>): Promise<AIQuestionGenerator>;
  getAIQuestionGenerator(schoolId: string, id: string): Promise<AIQuestionGenerator | null>;
  updateAIQuestionGenerator(schoolId: string, id: string, data: Partial<AIQuestionGenerator>): Promise<AIQuestionGenerator>;
  deleteAIQuestionGenerator(schoolId: string, id: string): Promise<void>;
  listAIQuestionGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGenerator[]>;

  createHintUsage(schoolId: string, data: Omit<HintUsage, 'id' | 'created_at'>): Promise<HintUsage>;
  getHintUsage(schoolId: string, id: string): Promise<HintUsage | null>;
  updateHintUsage(schoolId: string, id: string, data: Partial<HintUsage>): Promise<HintUsage>;
  deleteHintUsage(schoolId: string, id: string): Promise<void>;
  listHintUsages(schoolId: string, filters?: Record<string, unknown>): Promise<HintUsage[]>;

  createErrorAnalysis(schoolId: string, data: Omit<ErrorAnalysis, 'id' | 'created_at'>): Promise<ErrorAnalysis>;
  getErrorAnalysis(schoolId: string, id: string): Promise<ErrorAnalysis | null>;
  updateErrorAnalysis(schoolId: string, id: string, data: Partial<ErrorAnalysis>): Promise<ErrorAnalysis>;
  deleteErrorAnalysis(schoolId: string, id: string): Promise<void>;
  listErrorAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<ErrorAnalysis[]>;

  createConceptReinforcement(schoolId: string, data: Omit<ConceptReinforcement, 'id' | 'created_at'>): Promise<ConceptReinforcement>;
  getConceptReinforcement(schoolId: string, id: string): Promise<ConceptReinforcement | null>;
  updateConceptReinforcement(schoolId: string, id: string, data: Partial<ConceptReinforcement>): Promise<ConceptReinforcement>;
  deleteConceptReinforcement(schoolId: string, id: string): Promise<void>;
  listConceptReinforcements(schoolId: string, filters?: Record<string, unknown>): Promise<ConceptReinforcement[]>;

  // ─── Module 4 ─────────────────────────────────────────────────────────
  createAITutor(schoolId: string, data: Omit<AITutor, 'id' | 'created_at' | 'updated_at'>): Promise<AITutor>;
  getAITutor(schoolId: string, id: string): Promise<AITutor | null>;
  updateAITutor(schoolId: string, id: string, data: Partial<AITutor>): Promise<AITutor>;
  deleteAITutor(schoolId: string, id: string): Promise<void>;
  listAITutors(schoolId: string, filters?: Record<string, unknown>): Promise<AITutor[]>;

  createTutorConversation(schoolId: string, data: Omit<TutorConversation, 'id' | 'started_at'>): Promise<TutorConversation>;
  getTutorConversation(schoolId: string, id: string): Promise<TutorConversation | null>;
  updateTutorConversation(schoolId: string, id: string, data: Partial<TutorConversation>): Promise<TutorConversation>;
  deleteTutorConversation(schoolId: string, id: string): Promise<void>;
  listTutorConversations(schoolId: string, filters?: Record<string, unknown>): Promise<TutorConversation[]>;

  createHomeworkAssistance(schoolId: string, data: Omit<HomeworkAssistance, 'id' | 'created_at'>): Promise<HomeworkAssistance>;
  getHomeworkAssistance(schoolId: string, id: string): Promise<HomeworkAssistance | null>;
  updateHomeworkAssistance(schoolId: string, id: string, data: Partial<HomeworkAssistance>): Promise<HomeworkAssistance>;
  deleteHomeworkAssistance(schoolId: string, id: string): Promise<void>;
  listHomeworkAssistances(schoolId: string, filters?: Record<string, unknown>): Promise<HomeworkAssistance[]>;

  createConceptExplanation(schoolId: string, data: Omit<ConceptExplanation, 'id' | 'created_at'>): Promise<ConceptExplanation>;
  getConceptExplanation(schoolId: string, id: string): Promise<ConceptExplanation | null>;
  updateConceptExplanation(schoolId: string, id: string, data: Partial<ConceptExplanation>): Promise<ConceptExplanation>;
  deleteConceptExplanation(schoolId: string, id: string): Promise<void>;
  listConceptExplanations(schoolId: string, filters?: Record<string, unknown>): Promise<ConceptExplanation[]>;

  createConversationMemory(schoolId: string, data: Omit<ConversationMemory, 'id' | 'last_updated'>): Promise<ConversationMemory>;
  getConversationMemory(schoolId: string, id: string): Promise<ConversationMemory | null>;
  updateConversationMemory(schoolId: string, id: string, data: Partial<ConversationMemory>): Promise<ConversationMemory>;
  deleteConversationMemory(schoolId: string, id: string): Promise<void>;
  listConversationMemories(schoolId: string, filters?: Record<string, unknown>): Promise<ConversationMemory[]>;

  createMathSolver(schoolId: string, data: Omit<MathSolver, 'id' | 'created_at'>): Promise<MathSolver>;
  getMathSolver(schoolId: string, id: string): Promise<MathSolver | null>;
  updateMathSolver(schoolId: string, id: string, data: Partial<MathSolver>): Promise<MathSolver>;
  deleteMathSolver(schoolId: string, id: string): Promise<void>;
  listMathSolvers(schoolId: string, filters?: Record<string, unknown>): Promise<MathSolver[]>;

  createScienceSolver(schoolId: string, data: Omit<ScienceSolver, 'id' | 'created_at'>): Promise<ScienceSolver>;
  getScienceSolver(schoolId: string, id: string): Promise<ScienceSolver | null>;
  updateScienceSolver(schoolId: string, id: string, data: Partial<ScienceSolver>): Promise<ScienceSolver>;
  deleteScienceSolver(schoolId: string, id: string): Promise<void>;
  listScienceSolvers(schoolId: string, filters?: Record<string, unknown>): Promise<ScienceSolver[]>;

  createProgrammingTutor(schoolId: string, data: Omit<ProgrammingTutor, 'id' | 'created_at'>): Promise<ProgrammingTutor>;
  getProgrammingTutor(schoolId: string, id: string): Promise<ProgrammingTutor | null>;
  updateProgrammingTutor(schoolId: string, id: string, data: Partial<ProgrammingTutor>): Promise<ProgrammingTutor>;
  deleteProgrammingTutor(schoolId: string, id: string): Promise<void>;
  listProgrammingTutors(schoolId: string, filters?: Record<string, unknown>): Promise<ProgrammingTutor[]>;

  createEssayAssistant(schoolId: string, data: Omit<EssayAssistant, 'id' | 'created_at'>): Promise<EssayAssistant>;
  getEssayAssistant(schoolId: string, id: string): Promise<EssayAssistant | null>;
  updateEssayAssistant(schoolId: string, id: string, data: Partial<EssayAssistant>): Promise<EssayAssistant>;
  deleteEssayAssistant(schoolId: string, id: string): Promise<void>;
  listEssayAssistants(schoolId: string, filters?: Record<string, unknown>): Promise<EssayAssistant[]>;

  // ─── Module 5 ─────────────────────────────────────────────────────────
  createMasteryDashboard(schoolId: string, data: Omit<MasteryDashboard, 'id' | 'created_at'>): Promise<MasteryDashboard>;
  getMasteryDashboard(schoolId: string, id: string): Promise<MasteryDashboard | null>;
  updateMasteryDashboard(schoolId: string, id: string, data: Partial<MasteryDashboard>): Promise<MasteryDashboard>;
  deleteMasteryDashboard(schoolId: string, id: string): Promise<void>;
  listMasteryDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<MasteryDashboard[]>;

  createCompetencyDashboard(schoolId: string, data: Omit<CompetencyDashboard, 'id' | 'created_at'>): Promise<CompetencyDashboard>;
  getCompetencyDashboard(schoolId: string, id: string): Promise<CompetencyDashboard | null>;
  updateCompetencyDashboard(schoolId: string, id: string, data: Partial<CompetencyDashboard>): Promise<CompetencyDashboard>;
  deleteCompetencyDashboard(schoolId: string, id: string): Promise<void>;
  listCompetencyDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyDashboard[]>;

  createKnowledgeHeatmap(schoolId: string, data: Omit<KnowledgeHeatmap, 'id' | 'created_at'>): Promise<KnowledgeHeatmap>;
  getKnowledgeHeatmap(schoolId: string, id: string): Promise<KnowledgeHeatmap | null>;
  updateKnowledgeHeatmap(schoolId: string, id: string, data: Partial<KnowledgeHeatmap>): Promise<KnowledgeHeatmap>;
  deleteKnowledgeHeatmap(schoolId: string, id: string): Promise<void>;
  listKnowledgeHeatmaps(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeHeatmap[]>;

  createLearningTimeline(schoolId: string, data: Omit<LearningTimeline, 'id' | 'created_at'>): Promise<LearningTimeline>;
  getLearningTimeline(schoolId: string, id: string): Promise<LearningTimeline | null>;
  updateLearningTimeline(schoolId: string, id: string, data: Partial<LearningTimeline>): Promise<LearningTimeline>;
  deleteLearningTimeline(schoolId: string, id: string): Promise<void>;
  listLearningTimelines(schoolId: string, filters?: Record<string, unknown>): Promise<LearningTimeline[]>;

  createSkillEvolution(schoolId: string, data: Omit<SkillEvolution, 'id' | 'created_at'>): Promise<SkillEvolution>;
  getSkillEvolution(schoolId: string, id: string): Promise<SkillEvolution | null>;
  updateSkillEvolution(schoolId: string, id: string, data: Partial<SkillEvolution>): Promise<SkillEvolution>;
  deleteSkillEvolution(schoolId: string, id: string): Promise<void>;
  listSkillEvolutions(schoolId: string, filters?: Record<string, unknown>): Promise<SkillEvolution[]>;

  createWeakTopicsReport(schoolId: string, data: Omit<WeakTopicsReport, 'id' | 'generated_at'>): Promise<WeakTopicsReport>;
  getWeakTopicsReport(schoolId: string, id: string): Promise<WeakTopicsReport | null>;
  updateWeakTopicsReport(schoolId: string, id: string, data: Partial<WeakTopicsReport>): Promise<WeakTopicsReport>;
  deleteWeakTopicsReport(schoolId: string, id: string): Promise<void>;
  listWeakTopicsReports(schoolId: string, filters?: Record<string, unknown>): Promise<WeakTopicsReport[]>;

  createStrongTopicsReport(schoolId: string, data: Omit<StrongTopicsReport, 'id' | 'generated_at'>): Promise<StrongTopicsReport>;
  getStrongTopicsReport(schoolId: string, id: string): Promise<StrongTopicsReport | null>;
  updateStrongTopicsReport(schoolId: string, id: string, data: Partial<StrongTopicsReport>): Promise<StrongTopicsReport>;
  deleteStrongTopicsReport(schoolId: string, id: string): Promise<void>;
  listStrongTopicsReports(schoolId: string, filters?: Record<string, unknown>): Promise<StrongTopicsReport[]>;

  createTeacherInsights(schoolId: string, data: Omit<TeacherInsights, 'id' | 'generated_at'>): Promise<TeacherInsights>;
  getTeacherInsights(schoolId: string, id: string): Promise<TeacherInsights | null>;
  updateTeacherInsights(schoolId: string, id: string, data: Partial<TeacherInsights>): Promise<TeacherInsights>;
  deleteTeacherInsights(schoolId: string, id: string): Promise<void>;
  listTeacherInsights(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherInsights[]>;

  createParentInsights(schoolId: string, data: Omit<ParentInsights, 'id' | 'generated_at'>): Promise<ParentInsights>;
  getParentInsights(schoolId: string, id: string): Promise<ParentInsights | null>;
  updateParentInsights(schoolId: string, id: string, data: Partial<ParentInsights>): Promise<ParentInsights>;
  deleteParentInsights(schoolId: string, id: string): Promise<void>;
  listParentInsights(schoolId: string, filters?: Record<string, unknown>): Promise<ParentInsights[]>;

  createSchoolInsights(schoolId: string, data: Omit<SchoolInsights, 'id' | 'generated_at'>): Promise<SchoolInsights>;
  getSchoolInsights(schoolId: string, id: string): Promise<SchoolInsights | null>;
  updateSchoolInsights(schoolId: string, id: string, data: Partial<SchoolInsights>): Promise<SchoolInsights>;
  deleteSchoolInsights(schoolId: string, id: string): Promise<void>;
  listSchoolInsights(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolInsights[]>;

  createAnalyticsReport(schoolId: string, data: Omit<AnalyticsReport, 'id' | 'created_at' | 'generated_at'>): Promise<AnalyticsReport>;
  getAnalyticsReport(schoolId: string, id: string): Promise<AnalyticsReport | null>;
  updateAnalyticsReport(schoolId: string, id: string, data: Partial<AnalyticsReport>): Promise<AnalyticsReport>;
  deleteAnalyticsReport(schoolId: string, id: string): Promise<void>;
  listAnalyticsReports(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReport[]>;

  // ─── Module 6 ─────────────────────────────────────────────────────────
  createRecommendedLesson(schoolId: string, data: Omit<RecommendedLesson, 'id' | 'created_at'>): Promise<RecommendedLesson>;
  getRecommendedLesson(schoolId: string, id: string): Promise<RecommendedLesson | null>;
  updateRecommendedLesson(schoolId: string, id: string, data: Partial<RecommendedLesson>): Promise<RecommendedLesson>;
  deleteRecommendedLesson(schoolId: string, id: string): Promise<void>;
  listRecommendedLessons(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedLesson[]>;

  createRecommendedVideo(schoolId: string, data: Omit<RecommendedVideo, 'id' | 'created_at'>): Promise<RecommendedVideo>;
  getRecommendedVideo(schoolId: string, id: string): Promise<RecommendedVideo | null>;
  updateRecommendedVideo(schoolId: string, id: string, data: Partial<RecommendedVideo>): Promise<RecommendedVideo>;
  deleteRecommendedVideo(schoolId: string, id: string): Promise<void>;
  listRecommendedVideos(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedVideo[]>;

  createRecommendedBook(schoolId: string, data: Omit<RecommendedBook, 'id' | 'created_at'>): Promise<RecommendedBook>;
  getRecommendedBook(schoolId: string, id: string): Promise<RecommendedBook | null>;
  updateRecommendedBook(schoolId: string, id: string, data: Partial<RecommendedBook>): Promise<RecommendedBook>;
  deleteRecommendedBook(schoolId: string, id: string): Promise<void>;
  listRecommendedBooks(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedBook[]>;

  createRecommendedExercise(schoolId: string, data: Omit<RecommendedExercise, 'id' | 'created_at'>): Promise<RecommendedExercise>;
  getRecommendedExercise(schoolId: string, id: string): Promise<RecommendedExercise | null>;
  updateRecommendedExercise(schoolId: string, id: string, data: Partial<RecommendedExercise>): Promise<RecommendedExercise>;
  deleteRecommendedExercise(schoolId: string, id: string): Promise<void>;
  listRecommendedExercises(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedExercise[]>;

  createRecommendedProject(schoolId: string, data: Omit<RecommendedProject, 'id' | 'created_at'>): Promise<RecommendedProject>;
  getRecommendedProject(schoolId: string, id: string): Promise<RecommendedProject | null>;
  updateRecommendedProject(schoolId: string, id: string, data: Partial<RecommendedProject>): Promise<RecommendedProject>;
  deleteRecommendedProject(schoolId: string, id: string): Promise<void>;
  listRecommendedProjects(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedProject[]>;

  createRecommendedGroup(schoolId: string, data: Omit<RecommendedGroup, 'id' | 'created_at'>): Promise<RecommendedGroup>;
  getRecommendedGroup(schoolId: string, id: string): Promise<RecommendedGroup | null>;
  updateRecommendedGroup(schoolId: string, id: string, data: Partial<RecommendedGroup>): Promise<RecommendedGroup>;
  deleteRecommendedGroup(schoolId: string, id: string): Promise<void>;
  listRecommendedGroups(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedGroup[]>;

  createRecommendedTutor(schoolId: string, data: Omit<RecommendedTutor, 'id' | 'created_at'>): Promise<RecommendedTutor>;
  getRecommendedTutor(schoolId: string, id: string): Promise<RecommendedTutor | null>;
  updateRecommendedTutor(schoolId: string, id: string, data: Partial<RecommendedTutor>): Promise<RecommendedTutor>;
  deleteRecommendedTutor(schoolId: string, id: string): Promise<void>;
  listRecommendedTutors(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedTutor[]>;

  createRecommendedExam(schoolId: string, data: Omit<RecommendedExam, 'id' | 'created_at'>): Promise<RecommendedExam>;
  getRecommendedExam(schoolId: string, id: string): Promise<RecommendedExam | null>;
  updateRecommendedExam(schoolId: string, id: string, data: Partial<RecommendedExam>): Promise<RecommendedExam>;
  deleteRecommendedExam(schoolId: string, id: string): Promise<void>;
  listRecommendedExams(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedExam[]>;

  // ─── Module 7 ─────────────────────────────────────────────────────────
  createCompetencyFramework(schoolId: string, data: Omit<CompetencyFramework, 'id' | 'created_at' | 'updated_at'>): Promise<CompetencyFramework>;
  getCompetencyFramework(schoolId: string, id: string): Promise<CompetencyFramework | null>;
  updateCompetencyFramework(schoolId: string, id: string, data: Partial<CompetencyFramework>): Promise<CompetencyFramework>;
  deleteCompetencyFramework(schoolId: string, id: string): Promise<void>;
  listCompetencyFrameworks(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyFramework[]>;

  createFrameworkCompetency(schoolId: string, data: Omit<FrameworkCompetency, 'id' | 'created_at'>): Promise<FrameworkCompetency>;
  getFrameworkCompetency(schoolId: string, id: string): Promise<FrameworkCompetency | null>;
  updateFrameworkCompetency(schoolId: string, id: string, data: Partial<FrameworkCompetency>): Promise<FrameworkCompetency>;
  deleteFrameworkCompetency(schoolId: string, id: string): Promise<void>;
  listFrameworkCompetencies(schoolId: string, filters?: Record<string, unknown>): Promise<FrameworkCompetency[]>;

  createFrameworkProgress(schoolId: string, data: Omit<FrameworkProgress, 'id' | 'created_at' | 'updated_at'>): Promise<FrameworkProgress>;
  getFrameworkProgress(schoolId: string, id: string): Promise<FrameworkProgress | null>;
  updateFrameworkProgress(schoolId: string, id: string, data: Partial<FrameworkProgress>): Promise<FrameworkProgress>;
  deleteFrameworkProgress(schoolId: string, id: string): Promise<void>;
  listFrameworkProgresses(schoolId: string, filters?: Record<string, unknown>): Promise<FrameworkProgress[]>;
  // ─── Module 8 ─────────────────────────────────────────────────────────
  createDigitalLesson(schoolId: string, data: Omit<DigitalLesson, 'id' | 'created_at' | 'updated_at'>): Promise<DigitalLesson>;
  getDigitalLesson(schoolId: string, id: string): Promise<DigitalLesson | null>;
  updateDigitalLesson(schoolId: string, id: string, data: Partial<DigitalLesson>): Promise<DigitalLesson>;
  deleteDigitalLesson(schoolId: string, id: string): Promise<void>;
  listDigitalLessons(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalLesson[]>;

  createInteractiveLesson(schoolId: string, data: Omit<InteractiveLesson, 'id' | 'created_at'>): Promise<InteractiveLesson>;
  getInteractiveLesson(schoolId: string, id: string): Promise<InteractiveLesson | null>;
  updateInteractiveLesson(schoolId: string, id: string, data: Partial<InteractiveLesson>): Promise<InteractiveLesson>;
  deleteInteractiveLesson(schoolId: string, id: string): Promise<void>;
  listInteractiveLessons(schoolId: string, filters?: Record<string, unknown>): Promise<InteractiveLesson[]>;

  createSimulation(schoolId: string, data: Omit<Simulation, 'id' | 'created_at'>): Promise<Simulation>;
  getSimulation(schoolId: string, id: string): Promise<Simulation | null>;
  updateSimulation(schoolId: string, id: string, data: Partial<Simulation>): Promise<Simulation>;
  deleteSimulation(schoolId: string, id: string): Promise<void>;
  listSimulations(schoolId: string, filters?: Record<string, unknown>): Promise<Simulation[]>;

  createVirtualLab(schoolId: string, data: Omit<VirtualLab, 'id' | 'created_at'>): Promise<VirtualLab>;
  getVirtualLab(schoolId: string, id: string): Promise<VirtualLab | null>;
  updateVirtualLab(schoolId: string, id: string, data: Partial<VirtualLab>): Promise<VirtualLab>;
  deleteVirtualLab(schoolId: string, id: string): Promise<void>;
  listVirtualLabs(schoolId: string, filters?: Record<string, unknown>): Promise<VirtualLab[]>;

  createARLesson(schoolId: string, data: Omit<ARLesson, 'id' | 'created_at'>): Promise<ARLesson>;
  getARLesson(schoolId: string, id: string): Promise<ARLesson | null>;
  updateARLesson(schoolId: string, id: string, data: Partial<ARLesson>): Promise<ARLesson>;
  deleteARLesson(schoolId: string, id: string): Promise<void>;
  listARLessons(schoolId: string, filters?: Record<string, unknown>): Promise<ARLesson[]>;

  createVRLesson(schoolId: string, data: Omit<VRLesson, 'id' | 'created_at'>): Promise<VRLesson>;
  getVRLesson(schoolId: string, id: string): Promise<VRLesson | null>;
  updateVRLesson(schoolId: string, id: string, data: Partial<VRLesson>): Promise<VRLesson>;
  deleteVRLesson(schoolId: string, id: string): Promise<void>;
  listVRLessons(schoolId: string, filters?: Record<string, unknown>): Promise<VRLesson[]>;

  createVideoLesson(schoolId: string, data: Omit<VideoLesson, 'id' | 'created_at'>): Promise<VideoLesson>;
  getVideoLesson(schoolId: string, id: string): Promise<VideoLesson | null>;
  updateVideoLesson(schoolId: string, id: string, data: Partial<VideoLesson>): Promise<VideoLesson>;
  deleteVideoLesson(schoolId: string, id: string): Promise<void>;
  listVideoLessons(schoolId: string, filters?: Record<string, unknown>): Promise<VideoLesson[]>;

  createAudioLesson(schoolId: string, data: Omit<AudioLesson, 'id' | 'created_at'>): Promise<AudioLesson>;
  getAudioLesson(schoolId: string, id: string): Promise<AudioLesson | null>;
  updateAudioLesson(schoolId: string, id: string, data: Partial<AudioLesson>): Promise<AudioLesson>;
  deleteAudioLesson(schoolId: string, id: string): Promise<void>;
  listAudioLessons(schoolId: string, filters?: Record<string, unknown>): Promise<AudioLesson[]>;

  createPodcast(schoolId: string, data: Omit<Podcast, 'id' | 'created_at'>): Promise<Podcast>;
  getPodcast(schoolId: string, id: string): Promise<Podcast | null>;
  updatePodcast(schoolId: string, id: string, data: Partial<Podcast>): Promise<Podcast>;
  deletePodcast(schoolId: string, id: string): Promise<void>;
  listPodcasts(schoolId: string, filters?: Record<string, unknown>): Promise<Podcast[]>;

  createFlashcard(schoolId: string, data: Omit<Flashcard, 'id' | 'created_at'>): Promise<Flashcard>;
  getFlashcard(schoolId: string, id: string): Promise<Flashcard | null>;
  updateFlashcard(schoolId: string, id: string, data: Partial<Flashcard>): Promise<Flashcard>;
  deleteFlashcard(schoolId: string, id: string): Promise<void>;
  listFlashcards(schoolId: string, filters?: Record<string, unknown>): Promise<Flashcard[]>;

  createMindMap(schoolId: string, data: Omit<MindMap, 'id' | 'created_at'>): Promise<MindMap>;
  getMindMap(schoolId: string, id: string): Promise<MindMap | null>;
  updateMindMap(schoolId: string, id: string, data: Partial<MindMap>): Promise<MindMap>;
  deleteMindMap(schoolId: string, id: string): Promise<void>;
  listMindMaps(schoolId: string, filters?: Record<string, unknown>): Promise<MindMap[]>;

  // ─── Module 9 ─────────────────────────────────────────────────────────
  createAdaptiveExam(schoolId: string, data: Omit<AdaptiveExam, 'id' | 'created_at'>): Promise<AdaptiveExam>;
  getAdaptiveExam(schoolId: string, id: string): Promise<AdaptiveExam | null>;
  updateAdaptiveExam(schoolId: string, id: string, data: Partial<AdaptiveExam>): Promise<AdaptiveExam>;
  deleteAdaptiveExam(schoolId: string, id: string): Promise<void>;
  listAdaptiveExams(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveExam[]>;

  createCompetencyExam(schoolId: string, data: Omit<CompetencyExam, 'id' | 'created_at'>): Promise<CompetencyExam>;
  getCompetencyExam(schoolId: string, id: string): Promise<CompetencyExam | null>;
  updateCompetencyExam(schoolId: string, id: string, data: Partial<CompetencyExam>): Promise<CompetencyExam>;
  deleteCompetencyExam(schoolId: string, id: string): Promise<void>;
  listCompetencyExams(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyExam[]>;

  createAICorrection(schoolId: string, data: Omit<AICorrection, 'id' | 'corrected_at'>): Promise<AICorrection>;
  getAICorrection(schoolId: string, id: string): Promise<AICorrection | null>;
  updateAICorrection(schoolId: string, id: string, data: Partial<AICorrection>): Promise<AICorrection>;
  deleteAICorrection(schoolId: string, id: string): Promise<void>;
  listAICorrections(schoolId: string, filters?: Record<string, unknown>): Promise<AICorrection[]>;

  createRubric(schoolId: string, data: Omit<Rubric, 'id' | 'created_at' | 'updated_at'>): Promise<Rubric>;
  getRubric(schoolId: string, id: string): Promise<Rubric | null>;
  updateRubric(schoolId: string, id: string, data: Partial<Rubric>): Promise<Rubric>;
  deleteRubric(schoolId: string, id: string): Promise<void>;
  listRubrics(schoolId: string, filters?: Record<string, unknown>): Promise<Rubric[]>;

  createAutoGradingResult(schoolId: string, data: Omit<AutoGradingResult, 'id' | 'generated_at'>): Promise<AutoGradingResult>;
  getAutoGradingResult(schoolId: string, id: string): Promise<AutoGradingResult | null>;
  updateAutoGradingResult(schoolId: string, id: string, data: Partial<AutoGradingResult>): Promise<AutoGradingResult>;
  deleteAutoGradingResult(schoolId: string, id: string): Promise<void>;
  listAutoGradingResults(schoolId: string, filters?: Record<string, unknown>): Promise<AutoGradingResult[]>;

  createEssayEvaluation(schoolId: string, data: Omit<EssayEvaluation, 'id' | 'evaluated_at'>): Promise<EssayEvaluation>;
  getEssayEvaluation(schoolId: string, id: string): Promise<EssayEvaluation | null>;
  updateEssayEvaluation(schoolId: string, id: string, data: Partial<EssayEvaluation>): Promise<EssayEvaluation>;
  deleteEssayEvaluation(schoolId: string, id: string): Promise<void>;
  listEssayEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<EssayEvaluation[]>;

  createOralEvaluation(schoolId: string, data: Omit<OralEvaluation, 'id' | 'evaluated_at'>): Promise<OralEvaluation>;
  getOralEvaluation(schoolId: string, id: string): Promise<OralEvaluation | null>;
  updateOralEvaluation(schoolId: string, id: string, data: Partial<OralEvaluation>): Promise<OralEvaluation>;
  deleteOralEvaluation(schoolId: string, id: string): Promise<void>;
  listOralEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<OralEvaluation[]>;

  createPracticalEvaluation(schoolId: string, data: Omit<PracticalEvaluation, 'id' | 'evaluated_at'>): Promise<PracticalEvaluation>;
  getPracticalEvaluation(schoolId: string, id: string): Promise<PracticalEvaluation | null>;
  updatePracticalEvaluation(schoolId: string, id: string, data: Partial<PracticalEvaluation>): Promise<PracticalEvaluation>;
  deletePracticalEvaluation(schoolId: string, id: string): Promise<void>;
  listPracticalEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<PracticalEvaluation[]>;

  // ─── Module 10 ────────────────────────────────────────────────────────
  createXP(schoolId: string, data: Omit<XP, 'id' | 'created_at'>): Promise<XP>;
  getXP(schoolId: string, id: string): Promise<XP | null>;
  updateXP(schoolId: string, id: string, data: Partial<XP>): Promise<XP>;
  deleteXP(schoolId: string, id: string): Promise<void>;
  listXPs(schoolId: string, filters?: Record<string, unknown>): Promise<XP[]>;

  createLevel(schoolId: string, data: Omit<Level, 'id' | 'created_at' | 'updated_at'>): Promise<Level>;
  getLevel(schoolId: string, id: string): Promise<Level | null>;
  updateLevel(schoolId: string, id: string, data: Partial<Level>): Promise<Level>;
  deleteLevel(schoolId: string, id: string): Promise<void>;
  listLevels(schoolId: string, filters?: Record<string, unknown>): Promise<Level[]>;

  createAchievement(schoolId: string, data: Omit<Achievement, 'id' | 'created_at'>): Promise<Achievement>;
  getAchievement(schoolId: string, id: string): Promise<Achievement | null>;
  updateAchievement(schoolId: string, id: string, data: Partial<Achievement>): Promise<Achievement>;
  deleteAchievement(schoolId: string, id: string): Promise<void>;
  listAchievements(schoolId: string, filters?: Record<string, unknown>): Promise<Achievement[]>;

  createMission(schoolId: string, data: Omit<Mission, 'id' | 'created_at'>): Promise<Mission>;
  getMission(schoolId: string, id: string): Promise<Mission | null>;
  updateMission(schoolId: string, id: string, data: Partial<Mission>): Promise<Mission>;
  deleteMission(schoolId: string, id: string): Promise<void>;
  listMissions(schoolId: string, filters?: Record<string, unknown>): Promise<Mission[]>;

  createDailyChallenge(schoolId: string, data: Omit<DailyChallenge, 'id'>): Promise<DailyChallenge>;
  getDailyChallenge(schoolId: string, id: string): Promise<DailyChallenge | null>;
  updateDailyChallenge(schoolId: string, id: string, data: Partial<DailyChallenge>): Promise<DailyChallenge>;
  deleteDailyChallenge(schoolId: string, id: string): Promise<void>;
  listDailyChallenges(schoolId: string, filters?: Record<string, unknown>): Promise<DailyChallenge[]>;

  createWeeklyChallenge(schoolId: string, data: Omit<WeeklyChallenge, 'id' | 'created_at'>): Promise<WeeklyChallenge>;
  getWeeklyChallenge(schoolId: string, id: string): Promise<WeeklyChallenge | null>;
  updateWeeklyChallenge(schoolId: string, id: string, data: Partial<WeeklyChallenge>): Promise<WeeklyChallenge>;
  deleteWeeklyChallenge(schoolId: string, id: string): Promise<void>;
  listWeeklyChallenges(schoolId: string, filters?: Record<string, unknown>): Promise<WeeklyChallenge[]>;

  createLeaderboard(schoolId: string, data: Omit<Leaderboard, 'id' | 'generated_at'>): Promise<Leaderboard>;
  getLeaderboard(schoolId: string, id: string): Promise<Leaderboard | null>;
  updateLeaderboard(schoolId: string, id: string, data: Partial<Leaderboard>): Promise<Leaderboard>;
  deleteLeaderboard(schoolId: string, id: string): Promise<void>;
  listLeaderboards(schoolId: string, filters?: Record<string, unknown>): Promise<Leaderboard[]>;

  createTeam(schoolId: string, data: Omit<Team, 'id' | 'created_at'>): Promise<Team>;
  getTeam(schoolId: string, id: string): Promise<Team | null>;
  updateTeam(schoolId: string, id: string, data: Partial<Team>): Promise<Team>;
  deleteTeam(schoolId: string, id: string): Promise<void>;
  listTeams(schoolId: string, filters?: Record<string, unknown>): Promise<Team[]>;

  createAvatar(schoolId: string, data: Omit<Avatar, 'id' | 'updated_at'>): Promise<Avatar>;
  getAvatar(schoolId: string, id: string): Promise<Avatar | null>;
  updateAvatar(schoolId: string, id: string, data: Partial<Avatar>): Promise<Avatar>;
  deleteAvatar(schoolId: string, id: string): Promise<void>;
  listAvatars(schoolId: string, filters?: Record<string, unknown>): Promise<Avatar[]>;

  createReward(schoolId: string, data: Omit<Reward, 'id' | 'created_at'>): Promise<Reward>;
  getReward(schoolId: string, id: string): Promise<Reward | null>;
  updateReward(schoolId: string, id: string, data: Partial<Reward>): Promise<Reward>;
  deleteReward(schoolId: string, id: string): Promise<void>;
  listRewards(schoolId: string, filters?: Record<string, unknown>): Promise<Reward[]>;

  createBadge(schoolId: string, data: Omit<Badge, 'id' | 'created_at'>): Promise<Badge>;
  getBadge(schoolId: string, id: string): Promise<Badge | null>;
  updateBadge(schoolId: string, id: string, data: Partial<Badge>): Promise<Badge>;
  deleteBadge(schoolId: string, id: string): Promise<void>;
  listBadges(schoolId: string, filters?: Record<string, unknown>): Promise<Badge[]>;

  createVirtualCurrency(schoolId: string, data: Omit<VirtualCurrency, 'id' | 'created_at' | 'updated_at'>): Promise<VirtualCurrency>;
  getVirtualCurrency(schoolId: string, id: string): Promise<VirtualCurrency | null>;
  updateVirtualCurrency(schoolId: string, id: string, data: Partial<VirtualCurrency>): Promise<VirtualCurrency>;
  deleteVirtualCurrency(schoolId: string, id: string): Promise<void>;
  listVirtualCurrencies(schoolId: string, filters?: Record<string, unknown>): Promise<VirtualCurrency[]>;

  createCurrencyTransaction(schoolId: string, data: Omit<CurrencyTransaction, 'id' | 'created_at'>): Promise<CurrencyTransaction>;
  getCurrencyTransaction(schoolId: string, id: string): Promise<CurrencyTransaction | null>;
  updateCurrencyTransaction(schoolId: string, id: string, data: Partial<CurrencyTransaction>): Promise<CurrencyTransaction>;
  deleteCurrencyTransaction(schoolId: string, id: string): Promise<void>;
  listCurrencyTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<CurrencyTransaction[]>;

  // ─── Module 11 ────────────────────────────────────────────────────────
  createParentRecommendation(schoolId: string, data: Omit<ParentRecommendation, 'id' | 'created_at'>): Promise<ParentRecommendation>;
  getParentRecommendation(schoolId: string, id: string): Promise<ParentRecommendation | null>;
  updateParentRecommendation(schoolId: string, id: string, data: Partial<ParentRecommendation>): Promise<ParentRecommendation>;
  deleteParentRecommendation(schoolId: string, id: string): Promise<void>;
  listParentRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<ParentRecommendation[]>;

  createParentAlert(schoolId: string, data: Omit<ParentAlert, 'id' | 'created_at'>): Promise<ParentAlert>;
  getParentAlert(schoolId: string, id: string): Promise<ParentAlert | null>;
  updateParentAlert(schoolId: string, id: string, data: Partial<ParentAlert>): Promise<ParentAlert>;
  deleteParentAlert(schoolId: string, id: string): Promise<void>;
  listParentAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<ParentAlert[]>;

  createParentCoaching(schoolId: string, data: Omit<ParentCoaching, 'id' | 'created_at'>): Promise<ParentCoaching>;
  getParentCoaching(schoolId: string, id: string): Promise<ParentCoaching | null>;
  updateParentCoaching(schoolId: string, id: string, data: Partial<ParentCoaching>): Promise<ParentCoaching>;
  deleteParentCoaching(schoolId: string, id: string): Promise<void>;
  listParentCoachings(schoolId: string, filters?: Record<string, unknown>): Promise<ParentCoaching[]>;

  createHomeActivity(schoolId: string, data: Omit<HomeActivity, 'id' | 'created_at'>): Promise<HomeActivity>;
  getHomeActivity(schoolId: string, id: string): Promise<HomeActivity | null>;
  updateHomeActivity(schoolId: string, id: string, data: Partial<HomeActivity>): Promise<HomeActivity>;
  deleteHomeActivity(schoolId: string, id: string): Promise<void>;
  listHomeActivities(schoolId: string, filters?: Record<string, unknown>): Promise<HomeActivity[]>;

  createParentWeeklyReport(schoolId: string, data: Omit<ParentWeeklyReport, 'id' | 'generated_at'>): Promise<ParentWeeklyReport>;
  getParentWeeklyReport(schoolId: string, id: string): Promise<ParentWeeklyReport | null>;
  updateParentWeeklyReport(schoolId: string, id: string, data: Partial<ParentWeeklyReport>): Promise<ParentWeeklyReport>;
  deleteParentWeeklyReport(schoolId: string, id: string): Promise<void>;
  listParentWeeklyReports(schoolId: string, filters?: Record<string, unknown>): Promise<ParentWeeklyReport[]>;

  // ─── Module 12 ────────────────────────────────────────────────────────
  createLessonPlan(schoolId: string, data: Omit<LessonPlan, 'id' | 'created_at' | 'updated_at'>): Promise<LessonPlan>;
  getLessonPlan(schoolId: string, id: string): Promise<LessonPlan | null>;
  updateLessonPlan(schoolId: string, id: string, data: Partial<LessonPlan>): Promise<LessonPlan>;
  deleteLessonPlan(schoolId: string, id: string): Promise<void>;
  listLessonPlans(schoolId: string, filters?: Record<string, unknown>): Promise<LessonPlan[]>;

  createExamTemplate(schoolId: string, data: Omit<ExamTemplate, 'id' | 'created_at'>): Promise<ExamTemplate>;
  getExamTemplate(schoolId: string, id: string): Promise<ExamTemplate | null>;
  updateExamTemplate(schoolId: string, id: string, data: Partial<ExamTemplate>): Promise<ExamTemplate>;
  deleteExamTemplate(schoolId: string, id: string): Promise<void>;
  listExamTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<ExamTemplate[]>;

  createHomeworkTemplate(schoolId: string, data: Omit<HomeworkTemplate, 'id' | 'created_at'>): Promise<HomeworkTemplate>;
  getHomeworkTemplate(schoolId: string, id: string): Promise<HomeworkTemplate | null>;
  updateHomeworkTemplate(schoolId: string, id: string, data: Partial<HomeworkTemplate>): Promise<HomeworkTemplate>;
  deleteHomeworkTemplate(schoolId: string, id: string): Promise<void>;
  listHomeworkTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<HomeworkTemplate[]>;

  createRubricTemplate(schoolId: string, data: Omit<RubricTemplate, 'id' | 'created_at'>): Promise<RubricTemplate>;
  getRubricTemplate(schoolId: string, id: string): Promise<RubricTemplate | null>;
  updateRubricTemplate(schoolId: string, id: string, data: Partial<RubricTemplate>): Promise<RubricTemplate>;
  deleteRubricTemplate(schoolId: string, id: string): Promise<void>;
  listRubricTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<RubricTemplate[]>;

  createClassroomInsights(schoolId: string, data: Omit<ClassroomInsights, 'id' | 'generated_at'>): Promise<ClassroomInsights>;
  getClassroomInsights(schoolId: string, id: string): Promise<ClassroomInsights | null>;
  updateClassroomInsights(schoolId: string, id: string, data: Partial<ClassroomInsights>): Promise<ClassroomInsights>;
  deleteClassroomInsights(schoolId: string, id: string): Promise<void>;
  listClassroomInsights(schoolId: string, filters?: Record<string, unknown>): Promise<ClassroomInsights[]>;

  createAttendanceInsights(schoolId: string, data: Omit<AttendanceInsights, 'id' | 'generated_at'>): Promise<AttendanceInsights>;
  getAttendanceInsights(schoolId: string, id: string): Promise<AttendanceInsights | null>;
  updateAttendanceInsights(schoolId: string, id: string, data: Partial<AttendanceInsights>): Promise<AttendanceInsights>;
  deleteAttendanceInsights(schoolId: string, id: string): Promise<void>;
  listAttendanceInsights(schoolId: string, filters?: Record<string, unknown>): Promise<AttendanceInsights[]>;

  createTeacherIntervention(schoolId: string, data: Omit<TeacherIntervention, 'id' | 'created_at'>): Promise<TeacherIntervention>;
  getTeacherIntervention(schoolId: string, id: string): Promise<TeacherIntervention | null>;
  updateTeacherIntervention(schoolId: string, id: string, data: Partial<TeacherIntervention>): Promise<TeacherIntervention>;
  deleteTeacherIntervention(schoolId: string, id: string): Promise<void>;
  listTeacherInterventions(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherIntervention[]>;

  createLessonRecommendation(schoolId: string, data: Omit<LessonRecommendation, 'id' | 'created_at'>): Promise<LessonRecommendation>;
  getLessonRecommendation(schoolId: string, id: string): Promise<LessonRecommendation | null>;
  updateLessonRecommendation(schoolId: string, id: string, data: Partial<LessonRecommendation>): Promise<LessonRecommendation>;
  deleteLessonRecommendation(schoolId: string, id: string): Promise<void>;
  listLessonRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<LessonRecommendation[]>;

  // ─── Module 13 ────────────────────────────────────────────────────────
  createSchoolPerformanceAI(schoolId: string, data: Omit<SchoolPerformanceAI, 'id' | 'generated_at'>): Promise<SchoolPerformanceAI>;
  getSchoolPerformanceAI(schoolId: string, id: string): Promise<SchoolPerformanceAI | null>;
  updateSchoolPerformanceAI(schoolId: string, id: string, data: Partial<SchoolPerformanceAI>): Promise<SchoolPerformanceAI>;
  deleteSchoolPerformanceAI(schoolId: string, id: string): Promise<void>;
  listSchoolPerformanceAIs(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolPerformanceAI[]>;

  createTeacherPerformanceAI(schoolId: string, data: Omit<TeacherPerformanceAI, 'id' | 'generated_at'>): Promise<TeacherPerformanceAI>;
  getTeacherPerformanceAI(schoolId: string, id: string): Promise<TeacherPerformanceAI | null>;
  updateTeacherPerformanceAI(schoolId: string, id: string, data: Partial<TeacherPerformanceAI>): Promise<TeacherPerformanceAI>;
  deleteTeacherPerformanceAI(schoolId: string, id: string): Promise<void>;
  listTeacherPerformanceAIs(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherPerformanceAI[]>;

  createCurriculumAnalysis(schoolId: string, data: Omit<CurriculumAnalysis, 'id' | 'generated_at'>): Promise<CurriculumAnalysis>;
  getCurriculumAnalysis(schoolId: string, id: string): Promise<CurriculumAnalysis | null>;
  updateCurriculumAnalysis(schoolId: string, id: string, data: Partial<CurriculumAnalysis>): Promise<CurriculumAnalysis>;
  deleteCurriculumAnalysis(schoolId: string, id: string): Promise<void>;
  listCurriculumAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<CurriculumAnalysis[]>;

  createResourceAllocation(schoolId: string, data: Omit<ResourceAllocation, 'id' | 'generated_at'>): Promise<ResourceAllocation>;
  getResourceAllocation(schoolId: string, id: string): Promise<ResourceAllocation | null>;
  updateResourceAllocation(schoolId: string, id: string, data: Partial<ResourceAllocation>): Promise<ResourceAllocation>;
  deleteResourceAllocation(schoolId: string, id: string): Promise<void>;
  listResourceAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<ResourceAllocation[]>;

  createRiskPrediction(schoolId: string, data: Omit<RiskPrediction, 'id' | 'created_at'>): Promise<RiskPrediction>;
  getRiskPrediction(schoolId: string, id: string): Promise<RiskPrediction | null>;
  updateRiskPrediction(schoolId: string, id: string, data: Partial<RiskPrediction>): Promise<RiskPrediction>;
  deleteRiskPrediction(schoolId: string, id: string): Promise<void>;
  listRiskPredictions(schoolId: string, filters?: Record<string, unknown>): Promise<RiskPrediction[]>;

  createNationalComparison(schoolId: string, data: Omit<NationalComparison, 'id' | 'generated_at'>): Promise<NationalComparison>;
  getNationalComparison(schoolId: string, id: string): Promise<NationalComparison | null>;
  updateNationalComparison(schoolId: string, id: string, data: Partial<NationalComparison>): Promise<NationalComparison>;
  deleteNationalComparison(schoolId: string, id: string): Promise<void>;
  listNationalComparisons(schoolId: string, filters?: Record<string, unknown>): Promise<NationalComparison[]>;
}

export class AdaptiveRepositoryImpl implements AdaptiveRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new AppError(`Adaptive entity not found: ${id}`, 'ADAPTIVE_NOT_FOUND', 404);
  }

  // ─── LearningProfile ──────────────────────────────────────────────────────
  async createLearningProfile(schoolId: string, data: Omit<LearningProfile, 'id' | 'created_at' | 'updated_at'>): Promise<LearningProfile> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_profiles')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PROFILE_CREATE_FAILED', 500);
    return result;
  }

  async getLearningProfile(schoolId: string, id: string): Promise<LearningProfile | null> {
    const { data, error } = await this.supabase
      .from('learning_profiles')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningProfile(schoolId: string, id: string, data: Partial<LearningProfile>): Promise<LearningProfile> {
    const { data: result, error } = await this.supabase
      .from('learning_profiles')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PROFILE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningProfile(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_profiles')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PROFILE_DELETE_FAILED', 500);
  }

  async listLearningProfiles(schoolId: string, filters?: Record<string, unknown>): Promise<LearningProfile[]> {
    let query = this.supabase.from('learning_profiles').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PROFILE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SkillGraph ──────────────────────────────────────────────────────
  async createSkillGraph(schoolId: string, data: Omit<SkillGraph, 'id' | 'created_at' | 'updated_at'>): Promise<SkillGraph> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('skill_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_GRAPH_CREATE_FAILED', 500);
    return result;
  }

  async getSkillGraph(schoolId: string, id: string): Promise<SkillGraph | null> {
    const { data, error } = await this.supabase
      .from('skill_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSkillGraph(schoolId: string, id: string, data: Partial<SkillGraph>): Promise<SkillGraph> {
    const { data: result, error } = await this.supabase
      .from('skill_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_GRAPH_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSkillGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_GRAPH_DELETE_FAILED', 500);
  }

  async listSkillGraphs(schoolId: string, filters?: Record<string, unknown>): Promise<SkillGraph[]> {
    let query = this.supabase.from('skill_graphs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_GRAPH_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Competency ──────────────────────────────────────────────────────
  async createCompetency(schoolId: string, data: Omit<Competency, 'id' | 'created_at' | 'updated_at'>): Promise<Competency> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competencies')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_CREATE_FAILED', 500);
    return result;
  }

  async getCompetency(schoolId: string, id: string): Promise<Competency | null> {
    const { data, error } = await this.supabase
      .from('competencies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetency(schoolId: string, id: string, data: Partial<Competency>): Promise<Competency> {
    const { data: result, error } = await this.supabase
      .from('competencies')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competencies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_DELETE_FAILED', 500);
  }

  async listCompetencys(schoolId: string, filters?: Record<string, unknown>): Promise<Competency[]> {
    let query = this.supabase.from('competencies').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyProgression ──────────────────────────────────────────────────────
  async createCompetencyProgression(schoolId: string, data: Omit<CompetencyProgression, 'id' | 'created_at' | 'updated_at'>): Promise<CompetencyProgression> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_progressions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_PROGRESSION_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyProgression(schoolId: string, id: string): Promise<CompetencyProgression | null> {
    const { data, error } = await this.supabase
      .from('competency_progressions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyProgression(schoolId: string, id: string, data: Partial<CompetencyProgression>): Promise<CompetencyProgression> {
    const { data: result, error } = await this.supabase
      .from('competency_progressions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_PROGRESSION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyProgression(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_progressions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_PROGRESSION_DELETE_FAILED', 500);
  }

  async listCompetencyProgressions(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyProgression[]> {
    let query = this.supabase.from('competency_progressions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_PROGRESSION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MasteryTracking ──────────────────────────────────────────────────────
  async createMasteryTracking(schoolId: string, data: Omit<MasteryTracking, 'id' | 'created_at' | 'updated_at'>): Promise<MasteryTracking> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('mastery_trackings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_TRACKING_CREATE_FAILED', 500);
    return result;
  }

  async getMasteryTracking(schoolId: string, id: string): Promise<MasteryTracking | null> {
    const { data, error } = await this.supabase
      .from('mastery_trackings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMasteryTracking(schoolId: string, id: string, data: Partial<MasteryTracking>): Promise<MasteryTracking> {
    const { data: result, error } = await this.supabase
      .from('mastery_trackings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_TRACKING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMasteryTracking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mastery_trackings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_TRACKING_DELETE_FAILED', 500);
  }

  async listMasteryTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<MasteryTracking[]> {
    let query = this.supabase.from('mastery_trackings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_TRACKING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── KnowledgeMap ──────────────────────────────────────────────────────
  async createKnowledgeMap(schoolId: string, data: Omit<KnowledgeMap, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeMap> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('knowledge_maps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_MAP_CREATE_FAILED', 500);
    return result;
  }

  async getKnowledgeMap(schoolId: string, id: string): Promise<KnowledgeMap | null> {
    const { data, error } = await this.supabase
      .from('knowledge_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateKnowledgeMap(schoolId: string, id: string, data: Partial<KnowledgeMap>): Promise<KnowledgeMap> {
    const { data: result, error } = await this.supabase
      .from('knowledge_maps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_MAP_UPDATE_FAILED', 500);
    return result;
  }

  async deleteKnowledgeMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_MAP_DELETE_FAILED', 500);
  }

  async listKnowledgeMaps(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeMap[]> {
    let query = this.supabase.from('knowledge_maps').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_MAP_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LearningObjective ──────────────────────────────────────────────────────
  async createLearningObjective(schoolId: string, data: Omit<LearningObjective, 'id' | 'created_at' | 'updated_at'>): Promise<LearningObjective> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_objectives')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_OBJECTIVE_CREATE_FAILED', 500);
    return result;
  }

  async getLearningObjective(schoolId: string, id: string): Promise<LearningObjective | null> {
    const { data, error } = await this.supabase
      .from('learning_objectives')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningObjective(schoolId: string, id: string, data: Partial<LearningObjective>): Promise<LearningObjective> {
    const { data: result, error } = await this.supabase
      .from('learning_objectives')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_OBJECTIVE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningObjective(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_objectives')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_OBJECTIVE_DELETE_FAILED', 500);
  }

  async listLearningObjectives(schoolId: string, filters?: Record<string, unknown>): Promise<LearningObjective[]> {
    let query = this.supabase.from('learning_objectives').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_OBJECTIVE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LearningPath ──────────────────────────────────────────────────────
  async createLearningPath(schoolId: string, data: Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>): Promise<LearningPath> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_paths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PATH_CREATE_FAILED', 500);
    return result;
  }

  async getLearningPath(schoolId: string, id: string): Promise<LearningPath | null> {
    const { data, error } = await this.supabase
      .from('learning_paths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningPath(schoolId: string, id: string, data: Partial<LearningPath>): Promise<LearningPath> {
    const { data: result, error } = await this.supabase
      .from('learning_paths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PATH_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_paths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PATH_DELETE_FAILED', 500);
  }

  async listLearningPaths(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPath[]> {
    let query = this.supabase.from('learning_paths').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PATH_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AdaptiveSequencing ──────────────────────────────────────────────────────
  async createAdaptiveSequencing(schoolId: string, data: Omit<AdaptiveSequencing, 'id' | 'created_at' | 'updated_at'>): Promise<AdaptiveSequencing> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('adaptive_sequencings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_SEQUENCING_CREATE_FAILED', 500);
    return result;
  }

  async getAdaptiveSequencing(schoolId: string, id: string): Promise<AdaptiveSequencing | null> {
    const { data, error } = await this.supabase
      .from('adaptive_sequencings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAdaptiveSequencing(schoolId: string, id: string, data: Partial<AdaptiveSequencing>): Promise<AdaptiveSequencing> {
    const { data: result, error } = await this.supabase
      .from('adaptive_sequencings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_SEQUENCING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAdaptiveSequencing(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('adaptive_sequencings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_SEQUENCING_DELETE_FAILED', 500);
  }

  async listAdaptiveSequencings(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveSequencing[]> {
    let query = this.supabase.from('adaptive_sequencings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_SEQUENCING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AdaptiveRecommendation ──────────────────────────────────────────────────────
  async createAdaptiveRecommendation(schoolId: string, data: Omit<AdaptiveRecommendation, 'id' | 'created_at' | 'updated_at'>): Promise<AdaptiveRecommendation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('adaptive_recommendations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_RECOMMENDATION_CREATE_FAILED', 500);
    return result;
  }

  async getAdaptiveRecommendation(schoolId: string, id: string): Promise<AdaptiveRecommendation | null> {
    const { data, error } = await this.supabase
      .from('adaptive_recommendations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAdaptiveRecommendation(schoolId: string, id: string, data: Partial<AdaptiveRecommendation>): Promise<AdaptiveRecommendation> {
    const { data: result, error } = await this.supabase
      .from('adaptive_recommendations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_RECOMMENDATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAdaptiveRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('adaptive_recommendations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_RECOMMENDATION_DELETE_FAILED', 500);
  }

  async listAdaptiveRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveRecommendation[]> {
    let query = this.supabase.from('adaptive_recommendations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_RECOMMENDATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── WeaknessDetection ──────────────────────────────────────────────────────
  async createWeaknessDetection(schoolId: string, data: Omit<WeaknessDetection, 'id' | 'created_at' | 'updated_at'>): Promise<WeaknessDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('weakness_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAKNESS_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getWeaknessDetection(schoolId: string, id: string): Promise<WeaknessDetection | null> {
    const { data, error } = await this.supabase
      .from('weakness_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWeaknessDetection(schoolId: string, id: string, data: Partial<WeaknessDetection>): Promise<WeaknessDetection> {
    const { data: result, error } = await this.supabase
      .from('weakness_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAKNESS_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteWeaknessDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('weakness_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAKNESS_DETECTION_DELETE_FAILED', 500);
  }

  async listWeaknessDetections(schoolId: string, filters?: Record<string, unknown>): Promise<WeaknessDetection[]> {
    let query = this.supabase.from('weakness_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAKNESS_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── StrengthDetection ──────────────────────────────────────────────────────
  async createStrengthDetection(schoolId: string, data: Omit<StrengthDetection, 'id' | 'created_at' | 'updated_at'>): Promise<StrengthDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('strength_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRENGTH_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getStrengthDetection(schoolId: string, id: string): Promise<StrengthDetection | null> {
    const { data, error } = await this.supabase
      .from('strength_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStrengthDetection(schoolId: string, id: string, data: Partial<StrengthDetection>): Promise<StrengthDetection> {
    const { data: result, error } = await this.supabase
      .from('strength_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRENGTH_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteStrengthDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('strength_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRENGTH_DETECTION_DELETE_FAILED', 500);
  }

  async listStrengthDetections(schoolId: string, filters?: Record<string, unknown>): Promise<StrengthDetection[]> {
    let query = this.supabase.from('strength_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRENGTH_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DifficultyAdjustment ──────────────────────────────────────────────────────
  async createDifficultyAdjustment(schoolId: string, data: Omit<DifficultyAdjustment, 'id' | 'created_at' | 'updated_at'>): Promise<DifficultyAdjustment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('difficulty_adjustments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIFFICULTY_ADJUSTMENT_CREATE_FAILED', 500);
    return result;
  }

  async getDifficultyAdjustment(schoolId: string, id: string): Promise<DifficultyAdjustment | null> {
    const { data, error } = await this.supabase
      .from('difficulty_adjustments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDifficultyAdjustment(schoolId: string, id: string, data: Partial<DifficultyAdjustment>): Promise<DifficultyAdjustment> {
    const { data: result, error } = await this.supabase
      .from('difficulty_adjustments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIFFICULTY_ADJUSTMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDifficultyAdjustment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('difficulty_adjustments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIFFICULTY_ADJUSTMENT_DELETE_FAILED', 500);
  }

  async listDifficultyAdjustments(schoolId: string, filters?: Record<string, unknown>): Promise<DifficultyAdjustment[]> {
    let query = this.supabase.from('difficulty_adjustments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIFFICULTY_ADJUSTMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LearningPace ──────────────────────────────────────────────────────
  async createLearningPace(schoolId: string, data: Omit<LearningPace, 'id' | 'created_at' | 'updated_at'>): Promise<LearningPace> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_paces')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PACE_CREATE_FAILED', 500);
    return result;
  }

  async getLearningPace(schoolId: string, id: string): Promise<LearningPace | null> {
    const { data, error } = await this.supabase
      .from('learning_paces')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningPace(schoolId: string, id: string, data: Partial<LearningPace>): Promise<LearningPace> {
    const { data: result, error } = await this.supabase
      .from('learning_paces')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PACE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningPace(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_paces')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PACE_DELETE_FAILED', 500);
  }

  async listLearningPaces(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPace[]> {
    let query = this.supabase.from('learning_paces').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_PACE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PersonalizedCurriculum ──────────────────────────────────────────────────────
  async createPersonalizedCurriculum(schoolId: string, data: Omit<PersonalizedCurriculum, 'id' | 'created_at' | 'updated_at'>): Promise<PersonalizedCurriculum> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('personalized_curriculums')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_CURRICULUM_CREATE_FAILED', 500);
    return result;
  }

  async getPersonalizedCurriculum(schoolId: string, id: string): Promise<PersonalizedCurriculum | null> {
    const { data, error } = await this.supabase
      .from('personalized_curriculums')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePersonalizedCurriculum(schoolId: string, id: string, data: Partial<PersonalizedCurriculum>): Promise<PersonalizedCurriculum> {
    const { data: result, error } = await this.supabase
      .from('personalized_curriculums')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_CURRICULUM_UPDATE_FAILED', 500);
    return result;
  }

  async deletePersonalizedCurriculum(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('personalized_curriculums')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_CURRICULUM_DELETE_FAILED', 500);
  }

  async listPersonalizedCurriculums(schoolId: string, filters?: Record<string, unknown>): Promise<PersonalizedCurriculum[]> {
    let query = this.supabase.from('personalized_curriculums').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_CURRICULUM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RemediationPlan ──────────────────────────────────────────────────────
  async createRemediationPlan(schoolId: string, data: Omit<RemediationPlan, 'id' | 'created_at' | 'updated_at'>): Promise<RemediationPlan> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('remediation_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_REMEDIATION_PLAN_CREATE_FAILED', 500);
    return result;
  }

  async getRemediationPlan(schoolId: string, id: string): Promise<RemediationPlan | null> {
    const { data, error } = await this.supabase
      .from('remediation_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRemediationPlan(schoolId: string, id: string, data: Partial<RemediationPlan>): Promise<RemediationPlan> {
    const { data: result, error } = await this.supabase
      .from('remediation_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_REMEDIATION_PLAN_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRemediationPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('remediation_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_REMEDIATION_PLAN_DELETE_FAILED', 500);
  }

  async listRemediationPlans(schoolId: string, filters?: Record<string, unknown>): Promise<RemediationPlan[]> {
    let query = this.supabase.from('remediation_plans').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_REMEDIATION_PLAN_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SkillAssessment ──────────────────────────────────────────────────────
  async createSkillAssessment(schoolId: string, data: Omit<SkillAssessment, 'id' | 'created_at' | 'updated_at'>): Promise<SkillAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('skill_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_ASSESSMENT_CREATE_FAILED', 500);
    return result;
  }

  async getSkillAssessment(schoolId: string, id: string): Promise<SkillAssessment | null> {
    const { data, error } = await this.supabase
      .from('skill_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSkillAssessment(schoolId: string, id: string, data: Partial<SkillAssessment>): Promise<SkillAssessment> {
    const { data: result, error } = await this.supabase
      .from('skill_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_ASSESSMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSkillAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_ASSESSMENT_DELETE_FAILED', 500);
  }

  async listSkillAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<SkillAssessment[]> {
    let query = this.supabase.from('skill_assessments').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_ASSESSMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CognitiveProfile ──────────────────────────────────────────────────────
  async createCognitiveProfile(schoolId: string, data: Omit<CognitiveProfile, 'id' | 'created_at' | 'updated_at'>): Promise<CognitiveProfile> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('cognitive_profiles')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COGNITIVE_PROFILE_CREATE_FAILED', 500);
    return result;
  }

  async getCognitiveProfile(schoolId: string, id: string): Promise<CognitiveProfile | null> {
    const { data, error } = await this.supabase
      .from('cognitive_profiles')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCognitiveProfile(schoolId: string, id: string, data: Partial<CognitiveProfile>): Promise<CognitiveProfile> {
    const { data: result, error } = await this.supabase
      .from('cognitive_profiles')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COGNITIVE_PROFILE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCognitiveProfile(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cognitive_profiles')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_COGNITIVE_PROFILE_DELETE_FAILED', 500);
  }

  async listCognitiveProfiles(schoolId: string, filters?: Record<string, unknown>): Promise<CognitiveProfile[]> {
    let query = this.supabase.from('cognitive_profiles').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_COGNITIVE_PROFILE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MemoryRetention ──────────────────────────────────────────────────────
  async createMemoryRetention(schoolId: string, data: Omit<MemoryRetention, 'id' | 'created_at' | 'updated_at'>): Promise<MemoryRetention> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('memory_retentions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MEMORY_RETENTION_CREATE_FAILED', 500);
    return result;
  }

  async getMemoryRetention(schoolId: string, id: string): Promise<MemoryRetention | null> {
    const { data, error } = await this.supabase
      .from('memory_retentions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMemoryRetention(schoolId: string, id: string, data: Partial<MemoryRetention>): Promise<MemoryRetention> {
    const { data: result, error } = await this.supabase
      .from('memory_retentions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MEMORY_RETENTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMemoryRetention(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('memory_retentions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_MEMORY_RETENTION_DELETE_FAILED', 500);
  }

  async listMemoryRetentions(schoolId: string, filters?: Record<string, unknown>): Promise<MemoryRetention[]> {
    let query = this.supabase.from('memory_retentions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_MEMORY_RETENTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AttentionScore ──────────────────────────────────────────────────────
  async createAttentionScore(schoolId: string, data: Omit<AttentionScore, 'id' | 'created_at' | 'updated_at'>): Promise<AttentionScore> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('attention_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENTION_SCORE_CREATE_FAILED', 500);
    return result;
  }

  async getAttentionScore(schoolId: string, id: string): Promise<AttentionScore | null> {
    const { data, error } = await this.supabase
      .from('attention_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAttentionScore(schoolId: string, id: string, data: Partial<AttentionScore>): Promise<AttentionScore> {
    const { data: result, error } = await this.supabase
      .from('attention_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENTION_SCORE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAttentionScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('attention_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENTION_SCORE_DELETE_FAILED', 500);
  }

  async listAttentionScores(schoolId: string, filters?: Record<string, unknown>): Promise<AttentionScore[]> {
    let query = this.supabase.from('attention_scores').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENTION_SCORE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MotivationIndex ──────────────────────────────────────────────────────
  async createMotivationIndex(schoolId: string, data: Omit<MotivationIndex, 'id' | 'created_at' | 'updated_at'>): Promise<MotivationIndex> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('motivation_indices')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MOTIVATION_INDEX_CREATE_FAILED', 500);
    return result;
  }

  async getMotivationIndex(schoolId: string, id: string): Promise<MotivationIndex | null> {
    const { data, error } = await this.supabase
      .from('motivation_indices')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMotivationIndex(schoolId: string, id: string, data: Partial<MotivationIndex>): Promise<MotivationIndex> {
    const { data: result, error } = await this.supabase
      .from('motivation_indices')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MOTIVATION_INDEX_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMotivationIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('motivation_indices')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_MOTIVATION_INDEX_DELETE_FAILED', 500);
  }

  async listMotivationIndexs(schoolId: string, filters?: Record<string, unknown>): Promise<MotivationIndex[]> {
    let query = this.supabase.from('motivation_indices').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_MOTIVATION_INDEX_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── EngagementIndex ──────────────────────────────────────────────────────
  async createEngagementIndex(schoolId: string, data: Omit<EngagementIndex, 'id' | 'created_at' | 'updated_at'>): Promise<EngagementIndex> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('engagement_indices')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ENGAGEMENT_INDEX_CREATE_FAILED', 500);
    return result;
  }

  async getEngagementIndex(schoolId: string, id: string): Promise<EngagementIndex | null> {
    const { data, error } = await this.supabase
      .from('engagement_indices')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEngagementIndex(schoolId: string, id: string, data: Partial<EngagementIndex>): Promise<EngagementIndex> {
    const { data: result, error } = await this.supabase
      .from('engagement_indices')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ENGAGEMENT_INDEX_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEngagementIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('engagement_indices')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ENGAGEMENT_INDEX_DELETE_FAILED', 500);
  }

  async listEngagementIndexs(schoolId: string, filters?: Record<string, unknown>): Promise<EngagementIndex[]> {
    let query = this.supabase.from('engagement_indices').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ENGAGEMENT_INDEX_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LearningSpeed ──────────────────────────────────────────────────────
  async createLearningSpeed(schoolId: string, data: Omit<LearningSpeed, 'id' | 'created_at' | 'updated_at'>): Promise<LearningSpeed> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_speeds')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_SPEED_CREATE_FAILED', 500);
    return result;
  }

  async getLearningSpeed(schoolId: string, id: string): Promise<LearningSpeed | null> {
    const { data, error } = await this.supabase
      .from('learning_speeds')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningSpeed(schoolId: string, id: string, data: Partial<LearningSpeed>): Promise<LearningSpeed> {
    const { data: result, error } = await this.supabase
      .from('learning_speeds')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_SPEED_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningSpeed(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_speeds')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_SPEED_DELETE_FAILED', 500);
  }

  async listLearningSpeeds(schoolId: string, filters?: Record<string, unknown>): Promise<LearningSpeed[]> {
    let query = this.supabase.from('learning_speeds').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_SPEED_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LearningCurve ──────────────────────────────────────────────────────
  async createLearningCurve(schoolId: string, data: Omit<LearningCurve, 'id' | 'created_at' | 'updated_at'>): Promise<LearningCurve> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_curves')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_CURVE_CREATE_FAILED', 500);
    return result;
  }

  async getLearningCurve(schoolId: string, id: string): Promise<LearningCurve | null> {
    const { data, error } = await this.supabase
      .from('learning_curves')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningCurve(schoolId: string, id: string, data: Partial<LearningCurve>): Promise<LearningCurve> {
    const { data: result, error } = await this.supabase
      .from('learning_curves')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_CURVE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningCurve(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_curves')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_CURVE_DELETE_FAILED', 500);
  }

  async listLearningCurves(schoolId: string, filters?: Record<string, unknown>): Promise<LearningCurve[]> {
    let query = this.supabase.from('learning_curves').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_CURVE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── BehaviourPrediction ──────────────────────────────────────────────────────
  async createBehaviourPrediction(schoolId: string, data: Omit<BehaviourPrediction, 'id' | 'created_at' | 'updated_at'>): Promise<BehaviourPrediction> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('behaviour_predictions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_BEHAVIOUR_PREDICTION_CREATE_FAILED', 500);
    return result;
  }

  async getBehaviourPrediction(schoolId: string, id: string): Promise<BehaviourPrediction | null> {
    const { data, error } = await this.supabase
      .from('behaviour_predictions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBehaviourPrediction(schoolId: string, id: string, data: Partial<BehaviourPrediction>): Promise<BehaviourPrediction> {
    const { data: result, error } = await this.supabase
      .from('behaviour_predictions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_BEHAVIOUR_PREDICTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteBehaviourPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('behaviour_predictions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_BEHAVIOUR_PREDICTION_DELETE_FAILED', 500);
  }

  async listBehaviourPredictions(schoolId: string, filters?: Record<string, unknown>): Promise<BehaviourPrediction[]> {
    let query = this.supabase.from('behaviour_predictions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_BEHAVIOUR_PREDICTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AcademicRisk ──────────────────────────────────────────────────────
  async createAcademicRisk(schoolId: string, data: Omit<AcademicRisk, 'id' | 'created_at' | 'updated_at'>): Promise<AcademicRisk> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('academic_risks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACADEMIC_RISK_CREATE_FAILED', 500);
    return result;
  }

  async getAcademicRisk(schoolId: string, id: string): Promise<AcademicRisk | null> {
    const { data, error } = await this.supabase
      .from('academic_risks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAcademicRisk(schoolId: string, id: string, data: Partial<AcademicRisk>): Promise<AcademicRisk> {
    const { data: result, error } = await this.supabase
      .from('academic_risks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACADEMIC_RISK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAcademicRisk(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_risks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACADEMIC_RISK_DELETE_FAILED', 500);
  }

  async listAcademicRisks(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicRisk[]> {
    let query = this.supabase.from('academic_risks').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACADEMIC_RISK_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── EmotionalIndicator ──────────────────────────────────────────────────────
  async createEmotionalIndicator(schoolId: string, data: Omit<EmotionalIndicator, 'id' | 'created_at' | 'updated_at'>): Promise<EmotionalIndicator> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('emotional_indicators')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_EMOTIONAL_INDICATOR_CREATE_FAILED', 500);
    return result;
  }

  async getEmotionalIndicator(schoolId: string, id: string): Promise<EmotionalIndicator | null> {
    const { data, error } = await this.supabase
      .from('emotional_indicators')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEmotionalIndicator(schoolId: string, id: string, data: Partial<EmotionalIndicator>): Promise<EmotionalIndicator> {
    const { data: result, error } = await this.supabase
      .from('emotional_indicators')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_EMOTIONAL_INDICATOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEmotionalIndicator(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('emotional_indicators')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_EMOTIONAL_INDICATOR_DELETE_FAILED', 500);
  }

  async listEmotionalIndicators(schoolId: string, filters?: Record<string, unknown>): Promise<EmotionalIndicator[]> {
    let query = this.supabase.from('emotional_indicators').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_EMOTIONAL_INDICATOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── BurnoutDetection ──────────────────────────────────────────────────────
  async createBurnoutDetection(schoolId: string, data: Omit<BurnoutDetection, 'id' | 'created_at' | 'updated_at'>): Promise<BurnoutDetection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('burnout_detections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_BURNOUT_DETECTION_CREATE_FAILED', 500);
    return result;
  }

  async getBurnoutDetection(schoolId: string, id: string): Promise<BurnoutDetection | null> {
    const { data, error } = await this.supabase
      .from('burnout_detections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBurnoutDetection(schoolId: string, id: string, data: Partial<BurnoutDetection>): Promise<BurnoutDetection> {
    const { data: result, error } = await this.supabase
      .from('burnout_detections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_BURNOUT_DETECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteBurnoutDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('burnout_detections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_BURNOUT_DETECTION_DELETE_FAILED', 500);
  }

  async listBurnoutDetections(schoolId: string, filters?: Record<string, unknown>): Promise<BurnoutDetection[]> {
    let query = this.supabase.from('burnout_detections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_BURNOUT_DETECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── InterventionSuggestion ──────────────────────────────────────────────────────
  async createInterventionSuggestion(schoolId: string, data: Omit<InterventionSuggestion, 'id' | 'created_at' | 'updated_at'>): Promise<InterventionSuggestion> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intervention_suggestions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERVENTION_SUGGESTION_CREATE_FAILED', 500);
    return result;
  }

  async getInterventionSuggestion(schoolId: string, id: string): Promise<InterventionSuggestion | null> {
    const { data, error } = await this.supabase
      .from('intervention_suggestions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInterventionSuggestion(schoolId: string, id: string, data: Partial<InterventionSuggestion>): Promise<InterventionSuggestion> {
    const { data: result, error } = await this.supabase
      .from('intervention_suggestions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERVENTION_SUGGESTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteInterventionSuggestion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intervention_suggestions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERVENTION_SUGGESTION_DELETE_FAILED', 500);
  }

  async listInterventionSuggestions(schoolId: string, filters?: Record<string, unknown>): Promise<InterventionSuggestion[]> {
    let query = this.supabase.from('intervention_suggestions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERVENTION_SUGGESTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DynamicQuiz ──────────────────────────────────────────────────────
  async createDynamicQuiz(schoolId: string, data: Omit<DynamicQuiz, 'id' | 'created_at' | 'updated_at'>): Promise<DynamicQuiz> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('dynamic_quizzes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DYNAMIC_QUIZ_CREATE_FAILED', 500);
    return result;
  }

  async getDynamicQuiz(schoolId: string, id: string): Promise<DynamicQuiz | null> {
    const { data, error } = await this.supabase
      .from('dynamic_quizzes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDynamicQuiz(schoolId: string, id: string, data: Partial<DynamicQuiz>): Promise<DynamicQuiz> {
    const { data: result, error } = await this.supabase
      .from('dynamic_quizzes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DYNAMIC_QUIZ_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDynamicQuiz(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dynamic_quizzes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_DYNAMIC_QUIZ_DELETE_FAILED', 500);
  }

  async listDynamicQuizs(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicQuiz[]> {
    let query = this.supabase.from('dynamic_quizzes').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_DYNAMIC_QUIZ_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AdaptiveHomework ──────────────────────────────────────────────────────
  async createAdaptiveHomework(schoolId: string, data: Omit<AdaptiveHomework, 'id' | 'created_at' | 'updated_at'>): Promise<AdaptiveHomework> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('adaptive_homeworks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_HOMEWORK_CREATE_FAILED', 500);
    return result;
  }

  async getAdaptiveHomework(schoolId: string, id: string): Promise<AdaptiveHomework | null> {
    const { data, error } = await this.supabase
      .from('adaptive_homeworks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAdaptiveHomework(schoolId: string, id: string, data: Partial<AdaptiveHomework>): Promise<AdaptiveHomework> {
    const { data: result, error } = await this.supabase
      .from('adaptive_homeworks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_HOMEWORK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAdaptiveHomework(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('adaptive_homeworks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_HOMEWORK_DELETE_FAILED', 500);
  }

  async listAdaptiveHomeworks(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveHomework[]> {
    let query = this.supabase.from('adaptive_homeworks').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_HOMEWORK_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PersonalizedExercise ──────────────────────────────────────────────────────
  async createPersonalizedExercise(schoolId: string, data: Omit<PersonalizedExercise, 'id' | 'created_at' | 'updated_at'>): Promise<PersonalizedExercise> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('personalized_exercises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_EXERCISE_CREATE_FAILED', 500);
    return result;
  }

  async getPersonalizedExercise(schoolId: string, id: string): Promise<PersonalizedExercise | null> {
    const { data, error } = await this.supabase
      .from('personalized_exercises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePersonalizedExercise(schoolId: string, id: string, data: Partial<PersonalizedExercise>): Promise<PersonalizedExercise> {
    const { data: result, error } = await this.supabase
      .from('personalized_exercises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_EXERCISE_UPDATE_FAILED', 500);
    return result;
  }

  async deletePersonalizedExercise(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('personalized_exercises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_EXERCISE_DELETE_FAILED', 500);
  }

  async listPersonalizedExercises(schoolId: string, filters?: Record<string, unknown>): Promise<PersonalizedExercise[]> {
    let query = this.supabase.from('personalized_exercises').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PERSONALIZED_EXERCISE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SmartRevision ──────────────────────────────────────────────────────
  async createSmartRevision(schoolId: string, data: Omit<SmartRevision, 'id' | 'created_at' | 'updated_at'>): Promise<SmartRevision> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('smart_revisions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SMART_REVISION_CREATE_FAILED', 500);
    return result;
  }

  async getSmartRevision(schoolId: string, id: string): Promise<SmartRevision | null> {
    const { data, error } = await this.supabase
      .from('smart_revisions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSmartRevision(schoolId: string, id: string, data: Partial<SmartRevision>): Promise<SmartRevision> {
    const { data: result, error } = await this.supabase
      .from('smart_revisions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SMART_REVISION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSmartRevision(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('smart_revisions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SMART_REVISION_DELETE_FAILED', 500);
  }

  async listSmartRevisions(schoolId: string, filters?: Record<string, unknown>): Promise<SmartRevision[]> {
    let query = this.supabase.from('smart_revisions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SMART_REVISION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AIQuestionGenerator ──────────────────────────────────────────────────────
  async createAIQuestionGenerator(schoolId: string, data: Omit<AIQuestionGenerator, 'id' | 'created_at' | 'updated_at'>): Promise<AIQuestionGenerator> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ai_question_generators')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_QUESTION_GENERATOR_CREATE_FAILED', 500);
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

  async updateAIQuestionGenerator(schoolId: string, id: string, data: Partial<AIQuestionGenerator>): Promise<AIQuestionGenerator> {
    const { data: result, error } = await this.supabase
      .from('ai_question_generators')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_QUESTION_GENERATOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAIQuestionGenerator(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_question_generators')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_QUESTION_GENERATOR_DELETE_FAILED', 500);
  }

  async listAIQuestionGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<AIQuestionGenerator[]> {
    let query = this.supabase.from('ai_question_generators').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_QUESTION_GENERATOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── HintUsage ──────────────────────────────────────────────────────
  async createHintUsage(schoolId: string, data: Omit<HintUsage, 'id' | 'created_at' | 'updated_at'>): Promise<HintUsage> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('hint_usages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HINT_USAGE_CREATE_FAILED', 500);
    return result;
  }

  async getHintUsage(schoolId: string, id: string): Promise<HintUsage | null> {
    const { data, error } = await this.supabase
      .from('hint_usages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateHintUsage(schoolId: string, id: string, data: Partial<HintUsage>): Promise<HintUsage> {
    const { data: result, error } = await this.supabase
      .from('hint_usages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HINT_USAGE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteHintUsage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('hint_usages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_HINT_USAGE_DELETE_FAILED', 500);
  }

  async listHintUsages(schoolId: string, filters?: Record<string, unknown>): Promise<HintUsage[]> {
    let query = this.supabase.from('hint_usages').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_HINT_USAGE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ErrorAnalysis ──────────────────────────────────────────────────────
  async createErrorAnalysis(schoolId: string, data: Omit<ErrorAnalysis, 'id' | 'created_at' | 'updated_at'>): Promise<ErrorAnalysis> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('error_analyses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ERROR_ANALYSIS_CREATE_FAILED', 500);
    return result;
  }

  async getErrorAnalysis(schoolId: string, id: string): Promise<ErrorAnalysis | null> {
    const { data, error } = await this.supabase
      .from('error_analyses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateErrorAnalysis(schoolId: string, id: string, data: Partial<ErrorAnalysis>): Promise<ErrorAnalysis> {
    const { data: result, error } = await this.supabase
      .from('error_analyses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ERROR_ANALYSIS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteErrorAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('error_analyses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ERROR_ANALYSIS_DELETE_FAILED', 500);
  }

  async listErrorAnalysiss(schoolId: string, filters?: Record<string, unknown>): Promise<ErrorAnalysis[]> {
    let query = this.supabase.from('error_analyses').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ERROR_ANALYSIS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ConceptReinforcement ──────────────────────────────────────────────────────
  async createConceptReinforcement(schoolId: string, data: Omit<ConceptReinforcement, 'id' | 'created_at' | 'updated_at'>): Promise<ConceptReinforcement> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('concept_reinforcements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_REINFORCEMENT_CREATE_FAILED', 500);
    return result;
  }

  async getConceptReinforcement(schoolId: string, id: string): Promise<ConceptReinforcement | null> {
    const { data, error } = await this.supabase
      .from('concept_reinforcements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateConceptReinforcement(schoolId: string, id: string, data: Partial<ConceptReinforcement>): Promise<ConceptReinforcement> {
    const { data: result, error } = await this.supabase
      .from('concept_reinforcements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_REINFORCEMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteConceptReinforcement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('concept_reinforcements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_REINFORCEMENT_DELETE_FAILED', 500);
  }

  async listConceptReinforcements(schoolId: string, filters?: Record<string, unknown>): Promise<ConceptReinforcement[]> {
    let query = this.supabase.from('concept_reinforcements').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_REINFORCEMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AITutor ──────────────────────────────────────────────────────
  async createAITutor(schoolId: string, data: Omit<AITutor, 'id' | 'created_at' | 'updated_at'>): Promise<AITutor> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ai_tutors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_TUTOR_CREATE_FAILED', 500);
    return result;
  }

  async getAITutor(schoolId: string, id: string): Promise<AITutor | null> {
    const { data, error } = await this.supabase
      .from('ai_tutors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAITutor(schoolId: string, id: string, data: Partial<AITutor>): Promise<AITutor> {
    const { data: result, error } = await this.supabase
      .from('ai_tutors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_TUTOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAITutor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_tutors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_TUTOR_DELETE_FAILED', 500);
  }

  async listAITutors(schoolId: string, filters?: Record<string, unknown>): Promise<AITutor[]> {
    let query = this.supabase.from('ai_tutors').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_TUTOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TutorConversation ──────────────────────────────────────────────────────
  async createTutorConversation(schoolId: string, data: Omit<TutorConversation, 'id' | 'created_at' | 'updated_at'>): Promise<TutorConversation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('tutor_conversations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TUTOR_CONVERSATION_CREATE_FAILED', 500);
    return result;
  }

  async getTutorConversation(schoolId: string, id: string): Promise<TutorConversation | null> {
    const { data, error } = await this.supabase
      .from('tutor_conversations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTutorConversation(schoolId: string, id: string, data: Partial<TutorConversation>): Promise<TutorConversation> {
    const { data: result, error } = await this.supabase
      .from('tutor_conversations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TUTOR_CONVERSATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTutorConversation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('tutor_conversations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_TUTOR_CONVERSATION_DELETE_FAILED', 500);
  }

  async listTutorConversations(schoolId: string, filters?: Record<string, unknown>): Promise<TutorConversation[]> {
    let query = this.supabase.from('tutor_conversations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_TUTOR_CONVERSATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── HomeworkAssistance ──────────────────────────────────────────────────────
  async createHomeworkAssistance(schoolId: string, data: Omit<HomeworkAssistance, 'id' | 'created_at' | 'updated_at'>): Promise<HomeworkAssistance> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('homework_assistances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_ASSISTANCE_CREATE_FAILED', 500);
    return result;
  }

  async getHomeworkAssistance(schoolId: string, id: string): Promise<HomeworkAssistance | null> {
    const { data, error } = await this.supabase
      .from('homework_assistances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateHomeworkAssistance(schoolId: string, id: string, data: Partial<HomeworkAssistance>): Promise<HomeworkAssistance> {
    const { data: result, error } = await this.supabase
      .from('homework_assistances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_ASSISTANCE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteHomeworkAssistance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('homework_assistances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_ASSISTANCE_DELETE_FAILED', 500);
  }

  async listHomeworkAssistances(schoolId: string, filters?: Record<string, unknown>): Promise<HomeworkAssistance[]> {
    let query = this.supabase.from('homework_assistances').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_ASSISTANCE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ConceptExplanation ──────────────────────────────────────────────────────
  async createConceptExplanation(schoolId: string, data: Omit<ConceptExplanation, 'id' | 'created_at' | 'updated_at'>): Promise<ConceptExplanation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('concept_explanations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_EXPLANATION_CREATE_FAILED', 500);
    return result;
  }

  async getConceptExplanation(schoolId: string, id: string): Promise<ConceptExplanation | null> {
    const { data, error } = await this.supabase
      .from('concept_explanations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateConceptExplanation(schoolId: string, id: string, data: Partial<ConceptExplanation>): Promise<ConceptExplanation> {
    const { data: result, error } = await this.supabase
      .from('concept_explanations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_EXPLANATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteConceptExplanation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('concept_explanations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_EXPLANATION_DELETE_FAILED', 500);
  }

  async listConceptExplanations(schoolId: string, filters?: Record<string, unknown>): Promise<ConceptExplanation[]> {
    let query = this.supabase.from('concept_explanations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONCEPT_EXPLANATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ConversationMemory ──────────────────────────────────────────────────────
  async createConversationMemory(schoolId: string, data: Omit<ConversationMemory, 'id' | 'created_at' | 'updated_at'>): Promise<ConversationMemory> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('conversation_memories')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONVERSATION_MEMORY_CREATE_FAILED', 500);
    return result;
  }

  async getConversationMemory(schoolId: string, id: string): Promise<ConversationMemory | null> {
    const { data, error } = await this.supabase
      .from('conversation_memories')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateConversationMemory(schoolId: string, id: string, data: Partial<ConversationMemory>): Promise<ConversationMemory> {
    const { data: result, error } = await this.supabase
      .from('conversation_memories')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONVERSATION_MEMORY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteConversationMemory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('conversation_memories')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONVERSATION_MEMORY_DELETE_FAILED', 500);
  }

  async listConversationMemorys(schoolId: string, filters?: Record<string, unknown>): Promise<ConversationMemory[]> {
    let query = this.supabase.from('conversation_memories').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_CONVERSATION_MEMORY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MathSolver ──────────────────────────────────────────────────────
  async createMathSolver(schoolId: string, data: Omit<MathSolver, 'id' | 'created_at' | 'updated_at'>): Promise<MathSolver> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('math_solvers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MATH_SOLVER_CREATE_FAILED', 500);
    return result;
  }

  async getMathSolver(schoolId: string, id: string): Promise<MathSolver | null> {
    const { data, error } = await this.supabase
      .from('math_solvers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMathSolver(schoolId: string, id: string, data: Partial<MathSolver>): Promise<MathSolver> {
    const { data: result, error } = await this.supabase
      .from('math_solvers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MATH_SOLVER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMathSolver(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('math_solvers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_MATH_SOLVER_DELETE_FAILED', 500);
  }

  async listMathSolvers(schoolId: string, filters?: Record<string, unknown>): Promise<MathSolver[]> {
    let query = this.supabase.from('math_solvers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_MATH_SOLVER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ScienceSolver ──────────────────────────────────────────────────────
  async createScienceSolver(schoolId: string, data: Omit<ScienceSolver, 'id' | 'created_at' | 'updated_at'>): Promise<ScienceSolver> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('science_solvers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCIENCE_SOLVER_CREATE_FAILED', 500);
    return result;
  }

  async getScienceSolver(schoolId: string, id: string): Promise<ScienceSolver | null> {
    const { data, error } = await this.supabase
      .from('science_solvers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateScienceSolver(schoolId: string, id: string, data: Partial<ScienceSolver>): Promise<ScienceSolver> {
    const { data: result, error } = await this.supabase
      .from('science_solvers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCIENCE_SOLVER_UPDATE_FAILED', 500);
    return result;
  }

  async deleteScienceSolver(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('science_solvers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCIENCE_SOLVER_DELETE_FAILED', 500);
  }

  async listScienceSolvers(schoolId: string, filters?: Record<string, unknown>): Promise<ScienceSolver[]> {
    let query = this.supabase.from('science_solvers').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCIENCE_SOLVER_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ProgrammingTutor ──────────────────────────────────────────────────────
  async createProgrammingTutor(schoolId: string, data: Omit<ProgrammingTutor, 'id' | 'created_at' | 'updated_at'>): Promise<ProgrammingTutor> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('programming_tutors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PROGRAMMING_TUTOR_CREATE_FAILED', 500);
    return result;
  }

  async getProgrammingTutor(schoolId: string, id: string): Promise<ProgrammingTutor | null> {
    const { data, error } = await this.supabase
      .from('programming_tutors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProgrammingTutor(schoolId: string, id: string, data: Partial<ProgrammingTutor>): Promise<ProgrammingTutor> {
    const { data: result, error } = await this.supabase
      .from('programming_tutors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PROGRAMMING_TUTOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteProgrammingTutor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('programming_tutors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PROGRAMMING_TUTOR_DELETE_FAILED', 500);
  }

  async listProgrammingTutors(schoolId: string, filters?: Record<string, unknown>): Promise<ProgrammingTutor[]> {
    let query = this.supabase.from('programming_tutors').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PROGRAMMING_TUTOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── EssayAssistant ──────────────────────────────────────────────────────
  async createEssayAssistant(schoolId: string, data: Omit<EssayAssistant, 'id' | 'created_at' | 'updated_at'>): Promise<EssayAssistant> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('essay_assistants')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_ASSISTANT_CREATE_FAILED', 500);
    return result;
  }

  async getEssayAssistant(schoolId: string, id: string): Promise<EssayAssistant | null> {
    const { data, error } = await this.supabase
      .from('essay_assistants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEssayAssistant(schoolId: string, id: string, data: Partial<EssayAssistant>): Promise<EssayAssistant> {
    const { data: result, error } = await this.supabase
      .from('essay_assistants')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_ASSISTANT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEssayAssistant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('essay_assistants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_ASSISTANT_DELETE_FAILED', 500);
  }

  async listEssayAssistants(schoolId: string, filters?: Record<string, unknown>): Promise<EssayAssistant[]> {
    let query = this.supabase.from('essay_assistants').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_ASSISTANT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MasteryDashboard ──────────────────────────────────────────────────────
  async createMasteryDashboard(schoolId: string, data: Omit<MasteryDashboard, 'id' | 'created_at' | 'updated_at'>): Promise<MasteryDashboard> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('mastery_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_DASHBOARD_CREATE_FAILED', 500);
    return result;
  }

  async getMasteryDashboard(schoolId: string, id: string): Promise<MasteryDashboard | null> {
    const { data, error } = await this.supabase
      .from('mastery_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMasteryDashboard(schoolId: string, id: string, data: Partial<MasteryDashboard>): Promise<MasteryDashboard> {
    const { data: result, error } = await this.supabase
      .from('mastery_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_DASHBOARD_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMasteryDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mastery_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_DASHBOARD_DELETE_FAILED', 500);
  }

  async listMasteryDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<MasteryDashboard[]> {
    let query = this.supabase.from('mastery_dashboards').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_MASTERY_DASHBOARD_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyDashboard ──────────────────────────────────────────────────────
  async createCompetencyDashboard(schoolId: string, data: Omit<CompetencyDashboard, 'id' | 'created_at' | 'updated_at'>): Promise<CompetencyDashboard> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_DASHBOARD_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyDashboard(schoolId: string, id: string): Promise<CompetencyDashboard | null> {
    const { data, error } = await this.supabase
      .from('competency_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyDashboard(schoolId: string, id: string, data: Partial<CompetencyDashboard>): Promise<CompetencyDashboard> {
    const { data: result, error } = await this.supabase
      .from('competency_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_DASHBOARD_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_DASHBOARD_DELETE_FAILED', 500);
  }

  async listCompetencyDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyDashboard[]> {
    let query = this.supabase.from('competency_dashboards').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_DASHBOARD_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── KnowledgeHeatmap ──────────────────────────────────────────────────────
  async createKnowledgeHeatmap(schoolId: string, data: Omit<KnowledgeHeatmap, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeHeatmap> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('knowledge_heatmaps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_HEATMAP_CREATE_FAILED', 500);
    return result;
  }

  async getKnowledgeHeatmap(schoolId: string, id: string): Promise<KnowledgeHeatmap | null> {
    const { data, error } = await this.supabase
      .from('knowledge_heatmaps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateKnowledgeHeatmap(schoolId: string, id: string, data: Partial<KnowledgeHeatmap>): Promise<KnowledgeHeatmap> {
    const { data: result, error } = await this.supabase
      .from('knowledge_heatmaps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_HEATMAP_UPDATE_FAILED', 500);
    return result;
  }

  async deleteKnowledgeHeatmap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_heatmaps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_HEATMAP_DELETE_FAILED', 500);
  }

  async listKnowledgeHeatmaps(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeHeatmap[]> {
    let query = this.supabase.from('knowledge_heatmaps').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_KNOWLEDGE_HEATMAP_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LearningTimeline ──────────────────────────────────────────────────────
  async createLearningTimeline(schoolId: string, data: Omit<LearningTimeline, 'id' | 'created_at' | 'updated_at'>): Promise<LearningTimeline> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('learning_timelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_TIMELINE_CREATE_FAILED', 500);
    return result;
  }

  async getLearningTimeline(schoolId: string, id: string): Promise<LearningTimeline | null> {
    const { data, error } = await this.supabase
      .from('learning_timelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningTimeline(schoolId: string, id: string, data: Partial<LearningTimeline>): Promise<LearningTimeline> {
    const { data: result, error } = await this.supabase
      .from('learning_timelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_TIMELINE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLearningTimeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_timelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_TIMELINE_DELETE_FAILED', 500);
  }

  async listLearningTimelines(schoolId: string, filters?: Record<string, unknown>): Promise<LearningTimeline[]> {
    let query = this.supabase.from('learning_timelines').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEARNING_TIMELINE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SkillEvolution ──────────────────────────────────────────────────────
  async createSkillEvolution(schoolId: string, data: Omit<SkillEvolution, 'id' | 'created_at' | 'updated_at'>): Promise<SkillEvolution> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('skill_evolutions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_EVOLUTION_CREATE_FAILED', 500);
    return result;
  }

  async getSkillEvolution(schoolId: string, id: string): Promise<SkillEvolution | null> {
    const { data, error } = await this.supabase
      .from('skill_evolutions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSkillEvolution(schoolId: string, id: string, data: Partial<SkillEvolution>): Promise<SkillEvolution> {
    const { data: result, error } = await this.supabase
      .from('skill_evolutions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_EVOLUTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSkillEvolution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_evolutions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_EVOLUTION_DELETE_FAILED', 500);
  }

  async listSkillEvolutions(schoolId: string, filters?: Record<string, unknown>): Promise<SkillEvolution[]> {
    let query = this.supabase.from('skill_evolutions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SKILL_EVOLUTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── WeakTopicsReport ──────────────────────────────────────────────────────
  async createWeakTopicsReport(schoolId: string, data: Omit<WeakTopicsReport, 'id' | 'created_at' | 'updated_at'>): Promise<WeakTopicsReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('weak_topics_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAK_TOPICS_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getWeakTopicsReport(schoolId: string, id: string): Promise<WeakTopicsReport | null> {
    const { data, error } = await this.supabase
      .from('weak_topics_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWeakTopicsReport(schoolId: string, id: string, data: Partial<WeakTopicsReport>): Promise<WeakTopicsReport> {
    const { data: result, error } = await this.supabase
      .from('weak_topics_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAK_TOPICS_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteWeakTopicsReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('weak_topics_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAK_TOPICS_REPORT_DELETE_FAILED', 500);
  }

  async listWeakTopicsReports(schoolId: string, filters?: Record<string, unknown>): Promise<WeakTopicsReport[]> {
    let query = this.supabase.from('weak_topics_reports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEAK_TOPICS_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── StrongTopicsReport ──────────────────────────────────────────────────────
  async createStrongTopicsReport(schoolId: string, data: Omit<StrongTopicsReport, 'id' | 'created_at' | 'updated_at'>): Promise<StrongTopicsReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('strong_topics_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRONG_TOPICS_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getStrongTopicsReport(schoolId: string, id: string): Promise<StrongTopicsReport | null> {
    const { data, error } = await this.supabase
      .from('strong_topics_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStrongTopicsReport(schoolId: string, id: string, data: Partial<StrongTopicsReport>): Promise<StrongTopicsReport> {
    const { data: result, error } = await this.supabase
      .from('strong_topics_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRONG_TOPICS_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteStrongTopicsReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('strong_topics_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRONG_TOPICS_REPORT_DELETE_FAILED', 500);
  }

  async listStrongTopicsReports(schoolId: string, filters?: Record<string, unknown>): Promise<StrongTopicsReport[]> {
    let query = this.supabase.from('strong_topics_reports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_STRONG_TOPICS_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TeacherInsights ──────────────────────────────────────────────────────
  async createTeacherInsights(schoolId: string, data: Omit<TeacherInsights, 'id' | 'created_at' | 'updated_at'>): Promise<TeacherInsights> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('teacher_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INSIGHTS_CREATE_FAILED', 500);
    return result;
  }

  async getTeacherInsights(schoolId: string, id: string): Promise<TeacherInsights | null> {
    const { data, error } = await this.supabase
      .from('teacher_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherInsights(schoolId: string, id: string, data: Partial<TeacherInsights>): Promise<TeacherInsights> {
    const { data: result, error } = await this.supabase
      .from('teacher_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INSIGHTS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTeacherInsights(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INSIGHTS_DELETE_FAILED', 500);
  }

  async listTeacherInsightss(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherInsights[]> {
    let query = this.supabase.from('teacher_insights').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INSIGHTS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ParentInsights ──────────────────────────────────────────────────────
  async createParentInsights(schoolId: string, data: Omit<ParentInsights, 'id' | 'created_at' | 'updated_at'>): Promise<ParentInsights> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('parent_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_INSIGHTS_CREATE_FAILED', 500);
    return result;
  }

  async getParentInsights(schoolId: string, id: string): Promise<ParentInsights | null> {
    const { data, error } = await this.supabase
      .from('parent_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateParentInsights(schoolId: string, id: string, data: Partial<ParentInsights>): Promise<ParentInsights> {
    const { data: result, error } = await this.supabase
      .from('parent_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_INSIGHTS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteParentInsights(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_INSIGHTS_DELETE_FAILED', 500);
  }

  async listParentInsightss(schoolId: string, filters?: Record<string, unknown>): Promise<ParentInsights[]> {
    let query = this.supabase.from('parent_insights').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_INSIGHTS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SchoolInsights ──────────────────────────────────────────────────────
  async createSchoolInsights(schoolId: string, data: Omit<SchoolInsights, 'id' | 'created_at' | 'updated_at'>): Promise<SchoolInsights> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('school_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_INSIGHTS_CREATE_FAILED', 500);
    return result;
  }

  async getSchoolInsights(schoolId: string, id: string): Promise<SchoolInsights | null> {
    const { data, error } = await this.supabase
      .from('school_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSchoolInsights(schoolId: string, id: string, data: Partial<SchoolInsights>): Promise<SchoolInsights> {
    const { data: result, error } = await this.supabase
      .from('school_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_INSIGHTS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSchoolInsights(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_INSIGHTS_DELETE_FAILED', 500);
  }

  async listSchoolInsightss(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolInsights[]> {
    let query = this.supabase.from('school_insights').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_INSIGHTS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AnalyticsReport ──────────────────────────────────────────────────────
  async createAnalyticsReport(schoolId: string, data: Omit<AnalyticsReport, 'id' | 'created_at' | 'updated_at'>): Promise<AnalyticsReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('analytics_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ANALYTICS_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getAnalyticsReport(schoolId: string, id: string): Promise<AnalyticsReport | null> {
    const { data, error } = await this.supabase
      .from('analytics_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAnalyticsReport(schoolId: string, id: string, data: Partial<AnalyticsReport>): Promise<AnalyticsReport> {
    const { data: result, error } = await this.supabase
      .from('analytics_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ANALYTICS_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAnalyticsReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ANALYTICS_REPORT_DELETE_FAILED', 500);
  }

  async listAnalyticsReports(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReport[]> {
    let query = this.supabase.from('analytics_reports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ANALYTICS_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedLesson ──────────────────────────────────────────────────────
  async createRecommendedLesson(schoolId: string, data: Omit<RecommendedLesson, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedLesson> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_lessons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_LESSON_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedLesson(schoolId: string, id: string): Promise<RecommendedLesson | null> {
    const { data, error } = await this.supabase
      .from('recommended_lessons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedLesson(schoolId: string, id: string, data: Partial<RecommendedLesson>): Promise<RecommendedLesson> {
    const { data: result, error } = await this.supabase
      .from('recommended_lessons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_LESSON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_lessons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_LESSON_DELETE_FAILED', 500);
  }

  async listRecommendedLessons(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedLesson[]> {
    let query = this.supabase.from('recommended_lessons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_LESSON_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedVideo ──────────────────────────────────────────────────────
  async createRecommendedVideo(schoolId: string, data: Omit<RecommendedVideo, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedVideo> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_videos')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_VIDEO_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedVideo(schoolId: string, id: string): Promise<RecommendedVideo | null> {
    const { data, error } = await this.supabase
      .from('recommended_videos')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedVideo(schoolId: string, id: string, data: Partial<RecommendedVideo>): Promise<RecommendedVideo> {
    const { data: result, error } = await this.supabase
      .from('recommended_videos')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_VIDEO_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedVideo(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_videos')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_VIDEO_DELETE_FAILED', 500);
  }

  async listRecommendedVideos(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedVideo[]> {
    let query = this.supabase.from('recommended_videos').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_VIDEO_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedBook ──────────────────────────────────────────────────────
  async createRecommendedBook(schoolId: string, data: Omit<RecommendedBook, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedBook> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_books')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_BOOK_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedBook(schoolId: string, id: string): Promise<RecommendedBook | null> {
    const { data, error } = await this.supabase
      .from('recommended_books')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedBook(schoolId: string, id: string, data: Partial<RecommendedBook>): Promise<RecommendedBook> {
    const { data: result, error } = await this.supabase
      .from('recommended_books')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_BOOK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedBook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_books')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_BOOK_DELETE_FAILED', 500);
  }

  async listRecommendedBooks(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedBook[]> {
    let query = this.supabase.from('recommended_books').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_BOOK_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedExercise ──────────────────────────────────────────────────────
  async createRecommendedExercise(schoolId: string, data: Omit<RecommendedExercise, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedExercise> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_exercises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXERCISE_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedExercise(schoolId: string, id: string): Promise<RecommendedExercise | null> {
    const { data, error } = await this.supabase
      .from('recommended_exercises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedExercise(schoolId: string, id: string, data: Partial<RecommendedExercise>): Promise<RecommendedExercise> {
    const { data: result, error } = await this.supabase
      .from('recommended_exercises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXERCISE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedExercise(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_exercises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXERCISE_DELETE_FAILED', 500);
  }

  async listRecommendedExercises(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedExercise[]> {
    let query = this.supabase.from('recommended_exercises').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXERCISE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedProject ──────────────────────────────────────────────────────
  async createRecommendedProject(schoolId: string, data: Omit<RecommendedProject, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedProject> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_projects')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_PROJECT_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedProject(schoolId: string, id: string): Promise<RecommendedProject | null> {
    const { data, error } = await this.supabase
      .from('recommended_projects')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedProject(schoolId: string, id: string, data: Partial<RecommendedProject>): Promise<RecommendedProject> {
    const { data: result, error } = await this.supabase
      .from('recommended_projects')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_PROJECT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedProject(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_projects')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_PROJECT_DELETE_FAILED', 500);
  }

  async listRecommendedProjects(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedProject[]> {
    let query = this.supabase.from('recommended_projects').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_PROJECT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedGroup ──────────────────────────────────────────────────────
  async createRecommendedGroup(schoolId: string, data: Omit<RecommendedGroup, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedGroup> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_groups')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_GROUP_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedGroup(schoolId: string, id: string): Promise<RecommendedGroup | null> {
    const { data, error } = await this.supabase
      .from('recommended_groups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedGroup(schoolId: string, id: string, data: Partial<RecommendedGroup>): Promise<RecommendedGroup> {
    const { data: result, error } = await this.supabase
      .from('recommended_groups')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_GROUP_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_GROUP_DELETE_FAILED', 500);
  }

  async listRecommendedGroups(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedGroup[]> {
    let query = this.supabase.from('recommended_groups').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_GROUP_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedTutor ──────────────────────────────────────────────────────
  async createRecommendedTutor(schoolId: string, data: Omit<RecommendedTutor, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedTutor> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_tutors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_TUTOR_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedTutor(schoolId: string, id: string): Promise<RecommendedTutor | null> {
    const { data, error } = await this.supabase
      .from('recommended_tutors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedTutor(schoolId: string, id: string, data: Partial<RecommendedTutor>): Promise<RecommendedTutor> {
    const { data: result, error } = await this.supabase
      .from('recommended_tutors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_TUTOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedTutor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_tutors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_TUTOR_DELETE_FAILED', 500);
  }

  async listRecommendedTutors(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedTutor[]> {
    let query = this.supabase.from('recommended_tutors').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_TUTOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RecommendedExam ──────────────────────────────────────────────────────
  async createRecommendedExam(schoolId: string, data: Omit<RecommendedExam, 'id' | 'created_at' | 'updated_at'>): Promise<RecommendedExam> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('recommended_exams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXAM_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendedExam(schoolId: string, id: string): Promise<RecommendedExam | null> {
    const { data, error } = await this.supabase
      .from('recommended_exams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendedExam(schoolId: string, id: string, data: Partial<RecommendedExam>): Promise<RecommendedExam> {
    const { data: result, error } = await this.supabase
      .from('recommended_exams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendedExam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommended_exams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXAM_DELETE_FAILED', 500);
  }

  async listRecommendedExams(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedExam[]> {
    let query = this.supabase.from('recommended_exams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RECOMMENDED_EXAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyFramework ──────────────────────────────────────────────────────
  async createCompetencyFramework(schoolId: string, data: Omit<CompetencyFramework, 'id' | 'created_at' | 'updated_at'>): Promise<CompetencyFramework> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_frameworks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_FRAMEWORK_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyFramework(schoolId: string, id: string): Promise<CompetencyFramework | null> {
    const { data, error } = await this.supabase
      .from('competency_frameworks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyFramework(schoolId: string, id: string, data: Partial<CompetencyFramework>): Promise<CompetencyFramework> {
    const { data: result, error } = await this.supabase
      .from('competency_frameworks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_FRAMEWORK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyFramework(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_frameworks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_FRAMEWORK_DELETE_FAILED', 500);
  }

  async listCompetencyFrameworks(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyFramework[]> {
    let query = this.supabase.from('competency_frameworks').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_FRAMEWORK_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── FrameworkCompetency ──────────────────────────────────────────────────────
  async createFrameworkCompetency(schoolId: string, data: Omit<FrameworkCompetency, 'id' | 'created_at' | 'updated_at'>): Promise<FrameworkCompetency> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('framework_competencies')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_COMPETENCY_CREATE_FAILED', 500);
    return result;
  }

  async getFrameworkCompetency(schoolId: string, id: string): Promise<FrameworkCompetency | null> {
    const { data, error } = await this.supabase
      .from('framework_competencies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateFrameworkCompetency(schoolId: string, id: string, data: Partial<FrameworkCompetency>): Promise<FrameworkCompetency> {
    const { data: result, error } = await this.supabase
      .from('framework_competencies')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_COMPETENCY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteFrameworkCompetency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('framework_competencies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_COMPETENCY_DELETE_FAILED', 500);
  }

  async listFrameworkCompetencys(schoolId: string, filters?: Record<string, unknown>): Promise<FrameworkCompetency[]> {
    let query = this.supabase.from('framework_competencies').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_COMPETENCY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── FrameworkProgress ──────────────────────────────────────────────────────
  async createFrameworkProgress(schoolId: string, data: Omit<FrameworkProgress, 'id' | 'created_at' | 'updated_at'>): Promise<FrameworkProgress> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('framework_progresses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_PROGRESS_CREATE_FAILED', 500);
    return result;
  }

  async getFrameworkProgress(schoolId: string, id: string): Promise<FrameworkProgress | null> {
    const { data, error } = await this.supabase
      .from('framework_progresses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateFrameworkProgress(schoolId: string, id: string, data: Partial<FrameworkProgress>): Promise<FrameworkProgress> {
    const { data: result, error } = await this.supabase
      .from('framework_progresses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_PROGRESS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteFrameworkProgress(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('framework_progresses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_PROGRESS_DELETE_FAILED', 500);
  }

  async listFrameworkProgresss(schoolId: string, filters?: Record<string, unknown>): Promise<FrameworkProgress[]> {
    let query = this.supabase.from('framework_progresses').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_FRAMEWORK_PROGRESS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DigitalLesson ──────────────────────────────────────────────────────
  async createDigitalLesson(schoolId: string, data: Omit<DigitalLesson, 'id' | 'created_at' | 'updated_at'>): Promise<DigitalLesson> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('digital_lessons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIGITAL_LESSON_CREATE_FAILED', 500);
    return result;
  }

  async getDigitalLesson(schoolId: string, id: string): Promise<DigitalLesson | null> {
    const { data, error } = await this.supabase
      .from('digital_lessons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDigitalLesson(schoolId: string, id: string, data: Partial<DigitalLesson>): Promise<DigitalLesson> {
    const { data: result, error } = await this.supabase
      .from('digital_lessons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIGITAL_LESSON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDigitalLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_lessons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIGITAL_LESSON_DELETE_FAILED', 500);
  }

  async listDigitalLessons(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalLesson[]> {
    let query = this.supabase.from('digital_lessons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_DIGITAL_LESSON_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── InteractiveLesson ──────────────────────────────────────────────────────
  async createInteractiveLesson(schoolId: string, data: Omit<InteractiveLesson, 'id' | 'created_at' | 'updated_at'>): Promise<InteractiveLesson> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('interactive_lessons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERACTIVE_LESSON_CREATE_FAILED', 500);
    return result;
  }

  async getInteractiveLesson(schoolId: string, id: string): Promise<InteractiveLesson | null> {
    const { data, error } = await this.supabase
      .from('interactive_lessons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInteractiveLesson(schoolId: string, id: string, data: Partial<InteractiveLesson>): Promise<InteractiveLesson> {
    const { data: result, error } = await this.supabase
      .from('interactive_lessons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERACTIVE_LESSON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteInteractiveLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('interactive_lessons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERACTIVE_LESSON_DELETE_FAILED', 500);
  }

  async listInteractiveLessons(schoolId: string, filters?: Record<string, unknown>): Promise<InteractiveLesson[]> {
    let query = this.supabase.from('interactive_lessons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_INTERACTIVE_LESSON_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Simulation ──────────────────────────────────────────────────────
  async createSimulation(schoolId: string, data: Omit<Simulation, 'id' | 'created_at' | 'updated_at'>): Promise<Simulation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('simulations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SIMULATION_CREATE_FAILED', 500);
    return result;
  }

  async getSimulation(schoolId: string, id: string): Promise<Simulation | null> {
    const { data, error } = await this.supabase
      .from('simulations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSimulation(schoolId: string, id: string, data: Partial<Simulation>): Promise<Simulation> {
    const { data: result, error } = await this.supabase
      .from('simulations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SIMULATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SIMULATION_DELETE_FAILED', 500);
  }

  async listSimulations(schoolId: string, filters?: Record<string, unknown>): Promise<Simulation[]> {
    let query = this.supabase.from('simulations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SIMULATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── VirtualLab ──────────────────────────────────────────────────────
  async createVirtualLab(schoolId: string, data: Omit<VirtualLab, 'id' | 'created_at' | 'updated_at'>): Promise<VirtualLab> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('virtual_labs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_LAB_CREATE_FAILED', 500);
    return result;
  }

  async getVirtualLab(schoolId: string, id: string): Promise<VirtualLab | null> {
    const { data, error } = await this.supabase
      .from('virtual_labs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVirtualLab(schoolId: string, id: string, data: Partial<VirtualLab>): Promise<VirtualLab> {
    const { data: result, error } = await this.supabase
      .from('virtual_labs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_LAB_UPDATE_FAILED', 500);
    return result;
  }

  async deleteVirtualLab(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('virtual_labs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_LAB_DELETE_FAILED', 500);
  }

  async listVirtualLabs(schoolId: string, filters?: Record<string, unknown>): Promise<VirtualLab[]> {
    let query = this.supabase.from('virtual_labs').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_LAB_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ARLesson ──────────────────────────────────────────────────────
  async createARLesson(schoolId: string, data: Omit<ARLesson, 'id' | 'created_at' | 'updated_at'>): Promise<ARLesson> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ar_lessons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AR_LESSON_CREATE_FAILED', 500);
    return result;
  }

  async getARLesson(schoolId: string, id: string): Promise<ARLesson | null> {
    const { data, error } = await this.supabase
      .from('ar_lessons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateARLesson(schoolId: string, id: string, data: Partial<ARLesson>): Promise<ARLesson> {
    const { data: result, error } = await this.supabase
      .from('ar_lessons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AR_LESSON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteARLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ar_lessons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_AR_LESSON_DELETE_FAILED', 500);
  }

  async listARLessons(schoolId: string, filters?: Record<string, unknown>): Promise<ARLesson[]> {
    let query = this.supabase.from('ar_lessons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_AR_LESSON_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── VRLesson ──────────────────────────────────────────────────────
  async createVRLesson(schoolId: string, data: Omit<VRLesson, 'id' | 'created_at' | 'updated_at'>): Promise<VRLesson> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('vr_lessons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VR_LESSON_CREATE_FAILED', 500);
    return result;
  }

  async getVRLesson(schoolId: string, id: string): Promise<VRLesson | null> {
    const { data, error } = await this.supabase
      .from('vr_lessons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVRLesson(schoolId: string, id: string, data: Partial<VRLesson>): Promise<VRLesson> {
    const { data: result, error } = await this.supabase
      .from('vr_lessons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VR_LESSON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteVRLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vr_lessons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_VR_LESSON_DELETE_FAILED', 500);
  }

  async listVRLessons(schoolId: string, filters?: Record<string, unknown>): Promise<VRLesson[]> {
    let query = this.supabase.from('vr_lessons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_VR_LESSON_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── VideoLesson ──────────────────────────────────────────────────────
  async createVideoLesson(schoolId: string, data: Omit<VideoLesson, 'id' | 'created_at' | 'updated_at'>): Promise<VideoLesson> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('video_lessons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIDEO_LESSON_CREATE_FAILED', 500);
    return result;
  }

  async getVideoLesson(schoolId: string, id: string): Promise<VideoLesson | null> {
    const { data, error } = await this.supabase
      .from('video_lessons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVideoLesson(schoolId: string, id: string, data: Partial<VideoLesson>): Promise<VideoLesson> {
    const { data: result, error } = await this.supabase
      .from('video_lessons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIDEO_LESSON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteVideoLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('video_lessons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIDEO_LESSON_DELETE_FAILED', 500);
  }

  async listVideoLessons(schoolId: string, filters?: Record<string, unknown>): Promise<VideoLesson[]> {
    let query = this.supabase.from('video_lessons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIDEO_LESSON_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AudioLesson ──────────────────────────────────────────────────────
  async createAudioLesson(schoolId: string, data: Omit<AudioLesson, 'id' | 'created_at' | 'updated_at'>): Promise<AudioLesson> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('audio_lessons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUDIO_LESSON_CREATE_FAILED', 500);
    return result;
  }

  async getAudioLesson(schoolId: string, id: string): Promise<AudioLesson | null> {
    const { data, error } = await this.supabase
      .from('audio_lessons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAudioLesson(schoolId: string, id: string, data: Partial<AudioLesson>): Promise<AudioLesson> {
    const { data: result, error } = await this.supabase
      .from('audio_lessons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUDIO_LESSON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAudioLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audio_lessons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUDIO_LESSON_DELETE_FAILED', 500);
  }

  async listAudioLessons(schoolId: string, filters?: Record<string, unknown>): Promise<AudioLesson[]> {
    let query = this.supabase.from('audio_lessons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUDIO_LESSON_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Podcast ──────────────────────────────────────────────────────
  async createPodcast(schoolId: string, data: Omit<Podcast, 'id' | 'created_at' | 'updated_at'>): Promise<Podcast> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('podcasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PODCAST_CREATE_FAILED', 500);
    return result;
  }

  async getPodcast(schoolId: string, id: string): Promise<Podcast | null> {
    const { data, error } = await this.supabase
      .from('podcasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePodcast(schoolId: string, id: string, data: Partial<Podcast>): Promise<Podcast> {
    const { data: result, error } = await this.supabase
      .from('podcasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PODCAST_UPDATE_FAILED', 500);
    return result;
  }

  async deletePodcast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('podcasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PODCAST_DELETE_FAILED', 500);
  }

  async listPodcasts(schoolId: string, filters?: Record<string, unknown>): Promise<Podcast[]> {
    let query = this.supabase.from('podcasts').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PODCAST_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Flashcard ──────────────────────────────────────────────────────
  async createFlashcard(schoolId: string, data: Omit<Flashcard, 'id' | 'created_at' | 'updated_at'>): Promise<Flashcard> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('flashcards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_FLASHCARD_CREATE_FAILED', 500);
    return result;
  }

  async getFlashcard(schoolId: string, id: string): Promise<Flashcard | null> {
    const { data, error } = await this.supabase
      .from('flashcards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateFlashcard(schoolId: string, id: string, data: Partial<Flashcard>): Promise<Flashcard> {
    const { data: result, error } = await this.supabase
      .from('flashcards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_FLASHCARD_UPDATE_FAILED', 500);
    return result;
  }

  async deleteFlashcard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('flashcards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_FLASHCARD_DELETE_FAILED', 500);
  }

  async listFlashcards(schoolId: string, filters?: Record<string, unknown>): Promise<Flashcard[]> {
    let query = this.supabase.from('flashcards').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_FLASHCARD_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── MindMap ──────────────────────────────────────────────────────
  async createMindMap(schoolId: string, data: Omit<MindMap, 'id' | 'created_at' | 'updated_at'>): Promise<MindMap> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('mind_maps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MIND_MAP_CREATE_FAILED', 500);
    return result;
  }

  async getMindMap(schoolId: string, id: string): Promise<MindMap | null> {
    const { data, error } = await this.supabase
      .from('mind_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMindMap(schoolId: string, id: string, data: Partial<MindMap>): Promise<MindMap> {
    const { data: result, error } = await this.supabase
      .from('mind_maps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MIND_MAP_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMindMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mind_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_MIND_MAP_DELETE_FAILED', 500);
  }

  async listMindMaps(schoolId: string, filters?: Record<string, unknown>): Promise<MindMap[]> {
    let query = this.supabase.from('mind_maps').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_MIND_MAP_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AdaptiveExam ──────────────────────────────────────────────────────
  async createAdaptiveExam(schoolId: string, data: Omit<AdaptiveExam, 'id' | 'created_at' | 'updated_at'>): Promise<AdaptiveExam> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('adaptive_exams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_EXAM_CREATE_FAILED', 500);
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

  async updateAdaptiveExam(schoolId: string, id: string, data: Partial<AdaptiveExam>): Promise<AdaptiveExam> {
    const { data: result, error } = await this.supabase
      .from('adaptive_exams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_EXAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAdaptiveExam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('adaptive_exams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_EXAM_DELETE_FAILED', 500);
  }

  async listAdaptiveExams(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveExam[]> {
    let query = this.supabase.from('adaptive_exams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ADAPTIVE_EXAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CompetencyExam ──────────────────────────────────────────────────────
  async createCompetencyExam(schoolId: string, data: Omit<CompetencyExam, 'id' | 'created_at' | 'updated_at'>): Promise<CompetencyExam> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('competency_exams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_EXAM_CREATE_FAILED', 500);
    return result;
  }

  async getCompetencyExam(schoolId: string, id: string): Promise<CompetencyExam | null> {
    const { data, error } = await this.supabase
      .from('competency_exams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCompetencyExam(schoolId: string, id: string, data: Partial<CompetencyExam>): Promise<CompetencyExam> {
    const { data: result, error } = await this.supabase
      .from('competency_exams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_EXAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCompetencyExam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_exams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_EXAM_DELETE_FAILED', 500);
  }

  async listCompetencyExams(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyExam[]> {
    let query = this.supabase.from('competency_exams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_COMPETENCY_EXAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AICorrection ──────────────────────────────────────────────────────
  async createAICorrection(schoolId: string, data: Omit<AICorrection, 'id' | 'created_at' | 'updated_at'>): Promise<AICorrection> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('ai_corrections')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_CORRECTION_CREATE_FAILED', 500);
    return result;
  }

  async getAICorrection(schoolId: string, id: string): Promise<AICorrection | null> {
    const { data, error } = await this.supabase
      .from('ai_corrections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAICorrection(schoolId: string, id: string, data: Partial<AICorrection>): Promise<AICorrection> {
    const { data: result, error } = await this.supabase
      .from('ai_corrections')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_CORRECTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAICorrection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_corrections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_CORRECTION_DELETE_FAILED', 500);
  }

  async listAICorrections(schoolId: string, filters?: Record<string, unknown>): Promise<AICorrection[]> {
    let query = this.supabase.from('ai_corrections').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_AI_CORRECTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Rubric ──────────────────────────────────────────────────────
  async createRubric(schoolId: string, data: Omit<Rubric, 'id' | 'created_at' | 'updated_at'>): Promise<Rubric> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('rubrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_CREATE_FAILED', 500);
    return result;
  }

  async getRubric(schoolId: string, id: string): Promise<Rubric | null> {
    const { data, error } = await this.supabase
      .from('rubrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRubric(schoolId: string, id: string, data: Partial<Rubric>): Promise<Rubric> {
    const { data: result, error } = await this.supabase
      .from('rubrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRubric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('rubrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_DELETE_FAILED', 500);
  }

  async listRubrics(schoolId: string, filters?: Record<string, unknown>): Promise<Rubric[]> {
    let query = this.supabase.from('rubrics').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AutoGradingResult ──────────────────────────────────────────────────────
  async createAutoGradingResult(schoolId: string, data: Omit<AutoGradingResult, 'id' | 'created_at' | 'updated_at'>): Promise<AutoGradingResult> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('auto_grading_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUTO_GRADING_RESULT_CREATE_FAILED', 500);
    return result;
  }

  async getAutoGradingResult(schoolId: string, id: string): Promise<AutoGradingResult | null> {
    const { data, error } = await this.supabase
      .from('auto_grading_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutoGradingResult(schoolId: string, id: string, data: Partial<AutoGradingResult>): Promise<AutoGradingResult> {
    const { data: result, error } = await this.supabase
      .from('auto_grading_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUTO_GRADING_RESULT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAutoGradingResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('auto_grading_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUTO_GRADING_RESULT_DELETE_FAILED', 500);
  }

  async listAutoGradingResults(schoolId: string, filters?: Record<string, unknown>): Promise<AutoGradingResult[]> {
    let query = this.supabase.from('auto_grading_results').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_AUTO_GRADING_RESULT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── EssayEvaluation ──────────────────────────────────────────────────────
  async createEssayEvaluation(schoolId: string, data: Omit<EssayEvaluation, 'id' | 'created_at' | 'updated_at'>): Promise<EssayEvaluation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('essay_evaluations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_EVALUATION_CREATE_FAILED', 500);
    return result;
  }

  async getEssayEvaluation(schoolId: string, id: string): Promise<EssayEvaluation | null> {
    const { data, error } = await this.supabase
      .from('essay_evaluations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEssayEvaluation(schoolId: string, id: string, data: Partial<EssayEvaluation>): Promise<EssayEvaluation> {
    const { data: result, error } = await this.supabase
      .from('essay_evaluations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_EVALUATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEssayEvaluation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('essay_evaluations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_EVALUATION_DELETE_FAILED', 500);
  }

  async listEssayEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<EssayEvaluation[]> {
    let query = this.supabase.from('essay_evaluations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ESSAY_EVALUATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── OralEvaluation ──────────────────────────────────────────────────────
  async createOralEvaluation(schoolId: string, data: Omit<OralEvaluation, 'id' | 'created_at' | 'updated_at'>): Promise<OralEvaluation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('oral_evaluations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ORAL_EVALUATION_CREATE_FAILED', 500);
    return result;
  }

  async getOralEvaluation(schoolId: string, id: string): Promise<OralEvaluation | null> {
    const { data, error } = await this.supabase
      .from('oral_evaluations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateOralEvaluation(schoolId: string, id: string, data: Partial<OralEvaluation>): Promise<OralEvaluation> {
    const { data: result, error } = await this.supabase
      .from('oral_evaluations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ORAL_EVALUATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteOralEvaluation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('oral_evaluations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ORAL_EVALUATION_DELETE_FAILED', 500);
  }

  async listOralEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<OralEvaluation[]> {
    let query = this.supabase.from('oral_evaluations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ORAL_EVALUATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── PracticalEvaluation ──────────────────────────────────────────────────────
  async createPracticalEvaluation(schoolId: string, data: Omit<PracticalEvaluation, 'id' | 'created_at' | 'updated_at'>): Promise<PracticalEvaluation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('practical_evaluations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PRACTICAL_EVALUATION_CREATE_FAILED', 500);
    return result;
  }

  async getPracticalEvaluation(schoolId: string, id: string): Promise<PracticalEvaluation | null> {
    const { data, error } = await this.supabase
      .from('practical_evaluations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePracticalEvaluation(schoolId: string, id: string, data: Partial<PracticalEvaluation>): Promise<PracticalEvaluation> {
    const { data: result, error } = await this.supabase
      .from('practical_evaluations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PRACTICAL_EVALUATION_UPDATE_FAILED', 500);
    return result;
  }

  async deletePracticalEvaluation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('practical_evaluations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PRACTICAL_EVALUATION_DELETE_FAILED', 500);
  }

  async listPracticalEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<PracticalEvaluation[]> {
    let query = this.supabase.from('practical_evaluations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PRACTICAL_EVALUATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── XP ──────────────────────────────────────────────────────
  async createXP(schoolId: string, data: Omit<XP, 'id' | 'created_at' | 'updated_at'>): Promise<XP> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('xps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_XP_CREATE_FAILED', 500);
    return result;
  }

  async getXP(schoolId: string, id: string): Promise<XP | null> {
    const { data, error } = await this.supabase
      .from('xps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateXP(schoolId: string, id: string, data: Partial<XP>): Promise<XP> {
    const { data: result, error } = await this.supabase
      .from('xps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_XP_UPDATE_FAILED', 500);
    return result;
  }

  async deleteXP(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('xps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_XP_DELETE_FAILED', 500);
  }

  async listXPs(schoolId: string, filters?: Record<string, unknown>): Promise<XP[]> {
    let query = this.supabase.from('xps').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_XP_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Level ──────────────────────────────────────────────────────
  async createLevel(schoolId: string, data: Omit<Level, 'id' | 'created_at' | 'updated_at'>): Promise<Level> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('levels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEVEL_CREATE_FAILED', 500);
    return result;
  }

  async getLevel(schoolId: string, id: string): Promise<Level | null> {
    const { data, error } = await this.supabase
      .from('levels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLevel(schoolId: string, id: string, data: Partial<Level>): Promise<Level> {
    const { data: result, error } = await this.supabase
      .from('levels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEVEL_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLevel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('levels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEVEL_DELETE_FAILED', 500);
  }

  async listLevels(schoolId: string, filters?: Record<string, unknown>): Promise<Level[]> {
    let query = this.supabase.from('levels').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEVEL_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Achievement ──────────────────────────────────────────────────────
  async createAchievement(schoolId: string, data: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>): Promise<Achievement> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('achievements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACHIEVEMENT_CREATE_FAILED', 500);
    return result;
  }

  async getAchievement(schoolId: string, id: string): Promise<Achievement | null> {
    const { data, error } = await this.supabase
      .from('achievements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAchievement(schoolId: string, id: string, data: Partial<Achievement>): Promise<Achievement> {
    const { data: result, error } = await this.supabase
      .from('achievements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACHIEVEMENT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAchievement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('achievements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACHIEVEMENT_DELETE_FAILED', 500);
  }

  async listAchievements(schoolId: string, filters?: Record<string, unknown>): Promise<Achievement[]> {
    let query = this.supabase.from('achievements').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ACHIEVEMENT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Mission ──────────────────────────────────────────────────────
  async createMission(schoolId: string, data: Omit<Mission, 'id' | 'created_at' | 'updated_at'>): Promise<Mission> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('missions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MISSION_CREATE_FAILED', 500);
    return result;
  }

  async getMission(schoolId: string, id: string): Promise<Mission | null> {
    const { data, error } = await this.supabase
      .from('missions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMission(schoolId: string, id: string, data: Partial<Mission>): Promise<Mission> {
    const { data: result, error } = await this.supabase
      .from('missions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_MISSION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMission(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('missions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_MISSION_DELETE_FAILED', 500);
  }

  async listMissions(schoolId: string, filters?: Record<string, unknown>): Promise<Mission[]> {
    let query = this.supabase.from('missions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_MISSION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── DailyChallenge ──────────────────────────────────────────────────────
  async createDailyChallenge(schoolId: string, data: Omit<DailyChallenge, 'id' | 'created_at' | 'updated_at'>): Promise<DailyChallenge> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('daily_challenges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DAILY_CHALLENGE_CREATE_FAILED', 500);
    return result;
  }

  async getDailyChallenge(schoolId: string, id: string): Promise<DailyChallenge | null> {
    const { data, error } = await this.supabase
      .from('daily_challenges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDailyChallenge(schoolId: string, id: string, data: Partial<DailyChallenge>): Promise<DailyChallenge> {
    const { data: result, error } = await this.supabase
      .from('daily_challenges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_DAILY_CHALLENGE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDailyChallenge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('daily_challenges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_DAILY_CHALLENGE_DELETE_FAILED', 500);
  }

  async listDailyChallenges(schoolId: string, filters?: Record<string, unknown>): Promise<DailyChallenge[]> {
    let query = this.supabase.from('daily_challenges').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_DAILY_CHALLENGE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── WeeklyChallenge ──────────────────────────────────────────────────────
  async createWeeklyChallenge(schoolId: string, data: Omit<WeeklyChallenge, 'id' | 'created_at' | 'updated_at'>): Promise<WeeklyChallenge> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('weekly_challenges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEEKLY_CHALLENGE_CREATE_FAILED', 500);
    return result;
  }

  async getWeeklyChallenge(schoolId: string, id: string): Promise<WeeklyChallenge | null> {
    const { data, error } = await this.supabase
      .from('weekly_challenges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWeeklyChallenge(schoolId: string, id: string, data: Partial<WeeklyChallenge>): Promise<WeeklyChallenge> {
    const { data: result, error } = await this.supabase
      .from('weekly_challenges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEEKLY_CHALLENGE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteWeeklyChallenge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('weekly_challenges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEEKLY_CHALLENGE_DELETE_FAILED', 500);
  }

  async listWeeklyChallenges(schoolId: string, filters?: Record<string, unknown>): Promise<WeeklyChallenge[]> {
    let query = this.supabase.from('weekly_challenges').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_WEEKLY_CHALLENGE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Leaderboard ──────────────────────────────────────────────────────
  async createLeaderboard(schoolId: string, data: Omit<Leaderboard, 'id' | 'created_at' | 'updated_at'>): Promise<Leaderboard> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('leaderboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEADERBOARD_CREATE_FAILED', 500);
    return result;
  }

  async getLeaderboard(schoolId: string, id: string): Promise<Leaderboard | null> {
    const { data, error } = await this.supabase
      .from('leaderboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLeaderboard(schoolId: string, id: string, data: Partial<Leaderboard>): Promise<Leaderboard> {
    const { data: result, error } = await this.supabase
      .from('leaderboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEADERBOARD_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLeaderboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('leaderboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEADERBOARD_DELETE_FAILED', 500);
  }

  async listLeaderboards(schoolId: string, filters?: Record<string, unknown>): Promise<Leaderboard[]> {
    let query = this.supabase.from('leaderboards').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LEADERBOARD_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Team ──────────────────────────────────────────────────────
  async createTeam(schoolId: string, data: Omit<Team, 'id' | 'created_at' | 'updated_at'>): Promise<Team> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('teams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEAM_CREATE_FAILED', 500);
    return result;
  }

  async getTeam(schoolId: string, id: string): Promise<Team | null> {
    const { data, error } = await this.supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeam(schoolId: string, id: string, data: Partial<Team>): Promise<Team> {
    const { data: result, error } = await this.supabase
      .from('teams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEAM_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTeam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEAM_DELETE_FAILED', 500);
  }

  async listTeams(schoolId: string, filters?: Record<string, unknown>): Promise<Team[]> {
    let query = this.supabase.from('teams').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEAM_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Avatar ──────────────────────────────────────────────────────
  async createAvatar(schoolId: string, data: Omit<Avatar, 'id' | 'created_at' | 'updated_at'>): Promise<Avatar> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('avatars')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AVATAR_CREATE_FAILED', 500);
    return result;
  }

  async getAvatar(schoolId: string, id: string): Promise<Avatar | null> {
    const { data, error } = await this.supabase
      .from('avatars')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAvatar(schoolId: string, id: string, data: Partial<Avatar>): Promise<Avatar> {
    const { data: result, error } = await this.supabase
      .from('avatars')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_AVATAR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAvatar(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('avatars')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_AVATAR_DELETE_FAILED', 500);
  }

  async listAvatars(schoolId: string, filters?: Record<string, unknown>): Promise<Avatar[]> {
    let query = this.supabase.from('avatars').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_AVATAR_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Reward ──────────────────────────────────────────────────────
  async createReward(schoolId: string, data: Omit<Reward, 'id' | 'created_at' | 'updated_at'>): Promise<Reward> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('rewards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_REWARD_CREATE_FAILED', 500);
    return result;
  }

  async getReward(schoolId: string, id: string): Promise<Reward | null> {
    const { data, error } = await this.supabase
      .from('rewards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateReward(schoolId: string, id: string, data: Partial<Reward>): Promise<Reward> {
    const { data: result, error } = await this.supabase
      .from('rewards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_REWARD_UPDATE_FAILED', 500);
    return result;
  }

  async deleteReward(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('rewards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_REWARD_DELETE_FAILED', 500);
  }

  async listRewards(schoolId: string, filters?: Record<string, unknown>): Promise<Reward[]> {
    let query = this.supabase.from('rewards').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_REWARD_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── Badge ──────────────────────────────────────────────────────
  async createBadge(schoolId: string, data: Omit<Badge, 'id' | 'created_at' | 'updated_at'>): Promise<Badge> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('badges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_BADGE_CREATE_FAILED', 500);
    return result;
  }

  async getBadge(schoolId: string, id: string): Promise<Badge | null> {
    const { data, error } = await this.supabase
      .from('badges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBadge(schoolId: string, id: string, data: Partial<Badge>): Promise<Badge> {
    const { data: result, error } = await this.supabase
      .from('badges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_BADGE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteBadge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('badges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_BADGE_DELETE_FAILED', 500);
  }

  async listBadges(schoolId: string, filters?: Record<string, unknown>): Promise<Badge[]> {
    let query = this.supabase.from('badges').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_BADGE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── VirtualCurrency ──────────────────────────────────────────────────────
  async createVirtualCurrency(schoolId: string, data: Omit<VirtualCurrency, 'id' | 'created_at' | 'updated_at'>): Promise<VirtualCurrency> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('virtual_currencies')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_CURRENCY_CREATE_FAILED', 500);
    return result;
  }

  async getVirtualCurrency(schoolId: string, id: string): Promise<VirtualCurrency | null> {
    const { data, error } = await this.supabase
      .from('virtual_currencies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVirtualCurrency(schoolId: string, id: string, data: Partial<VirtualCurrency>): Promise<VirtualCurrency> {
    const { data: result, error } = await this.supabase
      .from('virtual_currencies')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_CURRENCY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteVirtualCurrency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('virtual_currencies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_CURRENCY_DELETE_FAILED', 500);
  }

  async listVirtualCurrencys(schoolId: string, filters?: Record<string, unknown>): Promise<VirtualCurrency[]> {
    let query = this.supabase.from('virtual_currencies').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_VIRTUAL_CURRENCY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CurrencyTransaction ──────────────────────────────────────────────────────
  async createCurrencyTransaction(schoolId: string, data: Omit<CurrencyTransaction, 'id' | 'created_at' | 'updated_at'>): Promise<CurrencyTransaction> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('currency_transactions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRENCY_TRANSACTION_CREATE_FAILED', 500);
    return result;
  }

  async getCurrencyTransaction(schoolId: string, id: string): Promise<CurrencyTransaction | null> {
    const { data, error } = await this.supabase
      .from('currency_transactions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCurrencyTransaction(schoolId: string, id: string, data: Partial<CurrencyTransaction>): Promise<CurrencyTransaction> {
    const { data: result, error } = await this.supabase
      .from('currency_transactions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRENCY_TRANSACTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCurrencyTransaction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('currency_transactions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRENCY_TRANSACTION_DELETE_FAILED', 500);
  }

  async listCurrencyTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<CurrencyTransaction[]> {
    let query = this.supabase.from('currency_transactions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRENCY_TRANSACTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ParentRecommendation ──────────────────────────────────────────────────────
  async createParentRecommendation(schoolId: string, data: Omit<ParentRecommendation, 'id' | 'created_at' | 'updated_at'>): Promise<ParentRecommendation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('parent_recommendations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_RECOMMENDATION_CREATE_FAILED', 500);
    return result;
  }

  async getParentRecommendation(schoolId: string, id: string): Promise<ParentRecommendation | null> {
    const { data, error } = await this.supabase
      .from('parent_recommendations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateParentRecommendation(schoolId: string, id: string, data: Partial<ParentRecommendation>): Promise<ParentRecommendation> {
    const { data: result, error } = await this.supabase
      .from('parent_recommendations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_RECOMMENDATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteParentRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_recommendations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_RECOMMENDATION_DELETE_FAILED', 500);
  }

  async listParentRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<ParentRecommendation[]> {
    let query = this.supabase.from('parent_recommendations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_RECOMMENDATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ParentAlert ──────────────────────────────────────────────────────
  async createParentAlert(schoolId: string, data: Omit<ParentAlert, 'id' | 'created_at' | 'updated_at'>): Promise<ParentAlert> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('parent_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_ALERT_CREATE_FAILED', 500);
    return result;
  }

  async getParentAlert(schoolId: string, id: string): Promise<ParentAlert | null> {
    const { data, error } = await this.supabase
      .from('parent_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateParentAlert(schoolId: string, id: string, data: Partial<ParentAlert>): Promise<ParentAlert> {
    const { data: result, error } = await this.supabase
      .from('parent_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_ALERT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteParentAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_ALERT_DELETE_FAILED', 500);
  }

  async listParentAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<ParentAlert[]> {
    let query = this.supabase.from('parent_alerts').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_ALERT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ParentCoaching ──────────────────────────────────────────────────────
  async createParentCoaching(schoolId: string, data: Omit<ParentCoaching, 'id' | 'created_at' | 'updated_at'>): Promise<ParentCoaching> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('parent_coachings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_COACHING_CREATE_FAILED', 500);
    return result;
  }

  async getParentCoaching(schoolId: string, id: string): Promise<ParentCoaching | null> {
    const { data, error } = await this.supabase
      .from('parent_coachings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateParentCoaching(schoolId: string, id: string, data: Partial<ParentCoaching>): Promise<ParentCoaching> {
    const { data: result, error } = await this.supabase
      .from('parent_coachings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_COACHING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteParentCoaching(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_coachings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_COACHING_DELETE_FAILED', 500);
  }

  async listParentCoachings(schoolId: string, filters?: Record<string, unknown>): Promise<ParentCoaching[]> {
    let query = this.supabase.from('parent_coachings').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_COACHING_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── HomeActivity ──────────────────────────────────────────────────────
  async createHomeActivity(schoolId: string, data: Omit<HomeActivity, 'id' | 'created_at' | 'updated_at'>): Promise<HomeActivity> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('home_activities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOME_ACTIVITY_CREATE_FAILED', 500);
    return result;
  }

  async getHomeActivity(schoolId: string, id: string): Promise<HomeActivity | null> {
    const { data, error } = await this.supabase
      .from('home_activities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateHomeActivity(schoolId: string, id: string, data: Partial<HomeActivity>): Promise<HomeActivity> {
    const { data: result, error } = await this.supabase
      .from('home_activities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOME_ACTIVITY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteHomeActivity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('home_activities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOME_ACTIVITY_DELETE_FAILED', 500);
  }

  async listHomeActivitys(schoolId: string, filters?: Record<string, unknown>): Promise<HomeActivity[]> {
    let query = this.supabase.from('home_activities').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOME_ACTIVITY_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ParentWeeklyReport ──────────────────────────────────────────────────────
  async createParentWeeklyReport(schoolId: string, data: Omit<ParentWeeklyReport, 'id' | 'created_at' | 'updated_at'>): Promise<ParentWeeklyReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('parent_weekly_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_WEEKLY_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getParentWeeklyReport(schoolId: string, id: string): Promise<ParentWeeklyReport | null> {
    const { data, error } = await this.supabase
      .from('parent_weekly_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateParentWeeklyReport(schoolId: string, id: string, data: Partial<ParentWeeklyReport>): Promise<ParentWeeklyReport> {
    const { data: result, error } = await this.supabase
      .from('parent_weekly_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_WEEKLY_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteParentWeeklyReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_weekly_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_WEEKLY_REPORT_DELETE_FAILED', 500);
  }

  async listParentWeeklyReports(schoolId: string, filters?: Record<string, unknown>): Promise<ParentWeeklyReport[]> {
    let query = this.supabase.from('parent_weekly_reports').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_PARENT_WEEKLY_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LessonPlan ──────────────────────────────────────────────────────
  async createLessonPlan(schoolId: string, data: Omit<LessonPlan, 'id' | 'created_at' | 'updated_at'>): Promise<LessonPlan> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('lesson_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_PLAN_CREATE_FAILED', 500);
    return result;
  }

  async getLessonPlan(schoolId: string, id: string): Promise<LessonPlan | null> {
    const { data, error } = await this.supabase
      .from('lesson_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLessonPlan(schoolId: string, id: string, data: Partial<LessonPlan>): Promise<LessonPlan> {
    const { data: result, error } = await this.supabase
      .from('lesson_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_PLAN_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLessonPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('lesson_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_PLAN_DELETE_FAILED', 500);
  }

  async listLessonPlans(schoolId: string, filters?: Record<string, unknown>): Promise<LessonPlan[]> {
    let query = this.supabase.from('lesson_plans').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_PLAN_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ExamTemplate ──────────────────────────────────────────────────────
  async createExamTemplate(schoolId: string, data: Omit<ExamTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<ExamTemplate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('exam_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_EXAM_TEMPLATE_CREATE_FAILED', 500);
    return result;
  }

  async getExamTemplate(schoolId: string, id: string): Promise<ExamTemplate | null> {
    const { data, error } = await this.supabase
      .from('exam_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateExamTemplate(schoolId: string, id: string, data: Partial<ExamTemplate>): Promise<ExamTemplate> {
    const { data: result, error } = await this.supabase
      .from('exam_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_EXAM_TEMPLATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteExamTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('exam_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_EXAM_TEMPLATE_DELETE_FAILED', 500);
  }

  async listExamTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<ExamTemplate[]> {
    let query = this.supabase.from('exam_templates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_EXAM_TEMPLATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── HomeworkTemplate ──────────────────────────────────────────────────────
  async createHomeworkTemplate(schoolId: string, data: Omit<HomeworkTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<HomeworkTemplate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('homework_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_TEMPLATE_CREATE_FAILED', 500);
    return result;
  }

  async getHomeworkTemplate(schoolId: string, id: string): Promise<HomeworkTemplate | null> {
    const { data, error } = await this.supabase
      .from('homework_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateHomeworkTemplate(schoolId: string, id: string, data: Partial<HomeworkTemplate>): Promise<HomeworkTemplate> {
    const { data: result, error } = await this.supabase
      .from('homework_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_TEMPLATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteHomeworkTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('homework_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_TEMPLATE_DELETE_FAILED', 500);
  }

  async listHomeworkTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<HomeworkTemplate[]> {
    let query = this.supabase.from('homework_templates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_HOMEWORK_TEMPLATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RubricTemplate ──────────────────────────────────────────────────────
  async createRubricTemplate(schoolId: string, data: Omit<RubricTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<RubricTemplate> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('rubric_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_TEMPLATE_CREATE_FAILED', 500);
    return result;
  }

  async getRubricTemplate(schoolId: string, id: string): Promise<RubricTemplate | null> {
    const { data, error } = await this.supabase
      .from('rubric_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRubricTemplate(schoolId: string, id: string, data: Partial<RubricTemplate>): Promise<RubricTemplate> {
    const { data: result, error } = await this.supabase
      .from('rubric_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_TEMPLATE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRubricTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('rubric_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_TEMPLATE_DELETE_FAILED', 500);
  }

  async listRubricTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<RubricTemplate[]> {
    let query = this.supabase.from('rubric_templates').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RUBRIC_TEMPLATE_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ClassroomInsights ──────────────────────────────────────────────────────
  async createClassroomInsights(schoolId: string, data: Omit<ClassroomInsights, 'id' | 'created_at' | 'updated_at'>): Promise<ClassroomInsights> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('classroom_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CLASSROOM_INSIGHTS_CREATE_FAILED', 500);
    return result;
  }

  async getClassroomInsights(schoolId: string, id: string): Promise<ClassroomInsights | null> {
    const { data, error } = await this.supabase
      .from('classroom_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateClassroomInsights(schoolId: string, id: string, data: Partial<ClassroomInsights>): Promise<ClassroomInsights> {
    const { data: result, error } = await this.supabase
      .from('classroom_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CLASSROOM_INSIGHTS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteClassroomInsights(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('classroom_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_CLASSROOM_INSIGHTS_DELETE_FAILED', 500);
  }

  async listClassroomInsightss(schoolId: string, filters?: Record<string, unknown>): Promise<ClassroomInsights[]> {
    let query = this.supabase.from('classroom_insights').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_CLASSROOM_INSIGHTS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── AttendanceInsights ──────────────────────────────────────────────────────
  async createAttendanceInsights(schoolId: string, data: Omit<AttendanceInsights, 'id' | 'created_at' | 'updated_at'>): Promise<AttendanceInsights> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('attendance_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENDANCE_INSIGHTS_CREATE_FAILED', 500);
    return result;
  }

  async getAttendanceInsights(schoolId: string, id: string): Promise<AttendanceInsights | null> {
    const { data, error } = await this.supabase
      .from('attendance_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAttendanceInsights(schoolId: string, id: string, data: Partial<AttendanceInsights>): Promise<AttendanceInsights> {
    const { data: result, error } = await this.supabase
      .from('attendance_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENDANCE_INSIGHTS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAttendanceInsights(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('attendance_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENDANCE_INSIGHTS_DELETE_FAILED', 500);
  }

  async listAttendanceInsightss(schoolId: string, filters?: Record<string, unknown>): Promise<AttendanceInsights[]> {
    let query = this.supabase.from('attendance_insights').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_ATTENDANCE_INSIGHTS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TeacherIntervention ──────────────────────────────────────────────────────
  async createTeacherIntervention(schoolId: string, data: Omit<TeacherIntervention, 'id' | 'created_at' | 'updated_at'>): Promise<TeacherIntervention> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('teacher_interventions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INTERVENTION_CREATE_FAILED', 500);
    return result;
  }

  async getTeacherIntervention(schoolId: string, id: string): Promise<TeacherIntervention | null> {
    const { data, error } = await this.supabase
      .from('teacher_interventions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherIntervention(schoolId: string, id: string, data: Partial<TeacherIntervention>): Promise<TeacherIntervention> {
    const { data: result, error } = await this.supabase
      .from('teacher_interventions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INTERVENTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTeacherIntervention(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_interventions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INTERVENTION_DELETE_FAILED', 500);
  }

  async listTeacherInterventions(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherIntervention[]> {
    let query = this.supabase.from('teacher_interventions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_INTERVENTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── LessonRecommendation ──────────────────────────────────────────────────────
  async createLessonRecommendation(schoolId: string, data: Omit<LessonRecommendation, 'id' | 'created_at' | 'updated_at'>): Promise<LessonRecommendation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('lesson_recommendations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_RECOMMENDATION_CREATE_FAILED', 500);
    return result;
  }

  async getLessonRecommendation(schoolId: string, id: string): Promise<LessonRecommendation | null> {
    const { data, error } = await this.supabase
      .from('lesson_recommendations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLessonRecommendation(schoolId: string, id: string, data: Partial<LessonRecommendation>): Promise<LessonRecommendation> {
    const { data: result, error } = await this.supabase
      .from('lesson_recommendations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_RECOMMENDATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteLessonRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('lesson_recommendations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_RECOMMENDATION_DELETE_FAILED', 500);
  }

  async listLessonRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<LessonRecommendation[]> {
    let query = this.supabase.from('lesson_recommendations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_LESSON_RECOMMENDATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── SchoolPerformanceAI ──────────────────────────────────────────────────────
  async createSchoolPerformanceAI(schoolId: string, data: Omit<SchoolPerformanceAI, 'id' | 'created_at' | 'updated_at'>): Promise<SchoolPerformanceAI> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('school_performance_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_PERFORMANCE_AI_CREATE_FAILED', 500);
    return result;
  }

  async getSchoolPerformanceAI(schoolId: string, id: string): Promise<SchoolPerformanceAI | null> {
    const { data, error } = await this.supabase
      .from('school_performance_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSchoolPerformanceAI(schoolId: string, id: string, data: Partial<SchoolPerformanceAI>): Promise<SchoolPerformanceAI> {
    const { data: result, error } = await this.supabase
      .from('school_performance_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_PERFORMANCE_AI_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSchoolPerformanceAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_performance_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_PERFORMANCE_AI_DELETE_FAILED', 500);
  }

  async listSchoolPerformanceAIs(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolPerformanceAI[]> {
    let query = this.supabase.from('school_performance_ais').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_SCHOOL_PERFORMANCE_AI_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── TeacherPerformanceAI ──────────────────────────────────────────────────────
  async createTeacherPerformanceAI(schoolId: string, data: Omit<TeacherPerformanceAI, 'id' | 'created_at' | 'updated_at'>): Promise<TeacherPerformanceAI> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('teacher_performance_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_PERFORMANCE_AI_CREATE_FAILED', 500);
    return result;
  }

  async getTeacherPerformanceAI(schoolId: string, id: string): Promise<TeacherPerformanceAI | null> {
    const { data, error } = await this.supabase
      .from('teacher_performance_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherPerformanceAI(schoolId: string, id: string, data: Partial<TeacherPerformanceAI>): Promise<TeacherPerformanceAI> {
    const { data: result, error } = await this.supabase
      .from('teacher_performance_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_PERFORMANCE_AI_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTeacherPerformanceAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_performance_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_PERFORMANCE_AI_DELETE_FAILED', 500);
  }

  async listTeacherPerformanceAIs(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherPerformanceAI[]> {
    let query = this.supabase.from('teacher_performance_ais').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_TEACHER_PERFORMANCE_AI_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── CurriculumAnalysis ──────────────────────────────────────────────────────
  async createCurriculumAnalysis(schoolId: string, data: Omit<CurriculumAnalysis, 'id' | 'created_at' | 'updated_at'>): Promise<CurriculumAnalysis> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('curriculum_analyses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRICULUM_ANALYSIS_CREATE_FAILED', 500);
    return result;
  }

  async getCurriculumAnalysis(schoolId: string, id: string): Promise<CurriculumAnalysis | null> {
    const { data, error } = await this.supabase
      .from('curriculum_analyses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCurriculumAnalysis(schoolId: string, id: string, data: Partial<CurriculumAnalysis>): Promise<CurriculumAnalysis> {
    const { data: result, error } = await this.supabase
      .from('curriculum_analyses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRICULUM_ANALYSIS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteCurriculumAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('curriculum_analyses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRICULUM_ANALYSIS_DELETE_FAILED', 500);
  }

  async listCurriculumAnalysiss(schoolId: string, filters?: Record<string, unknown>): Promise<CurriculumAnalysis[]> {
    let query = this.supabase.from('curriculum_analyses').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_CURRICULUM_ANALYSIS_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── ResourceAllocation ──────────────────────────────────────────────────────
  async createResourceAllocation(schoolId: string, data: Omit<ResourceAllocation, 'id' | 'created_at' | 'updated_at'>): Promise<ResourceAllocation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('resource_allocations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RESOURCE_ALLOCATION_CREATE_FAILED', 500);
    return result;
  }

  async getResourceAllocation(schoolId: string, id: string): Promise<ResourceAllocation | null> {
    const { data, error } = await this.supabase
      .from('resource_allocations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResourceAllocation(schoolId: string, id: string, data: Partial<ResourceAllocation>): Promise<ResourceAllocation> {
    const { data: result, error } = await this.supabase
      .from('resource_allocations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RESOURCE_ALLOCATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteResourceAllocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_allocations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RESOURCE_ALLOCATION_DELETE_FAILED', 500);
  }

  async listResourceAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<ResourceAllocation[]> {
    let query = this.supabase.from('resource_allocations').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RESOURCE_ALLOCATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── RiskPrediction ──────────────────────────────────────────────────────
  async createRiskPrediction(schoolId: string, data: Omit<RiskPrediction, 'id' | 'created_at' | 'updated_at'>): Promise<RiskPrediction> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('risk_predictions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RISK_PREDICTION_CREATE_FAILED', 500);
    return result;
  }

  async getRiskPrediction(schoolId: string, id: string): Promise<RiskPrediction | null> {
    const { data, error } = await this.supabase
      .from('risk_predictions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRiskPrediction(schoolId: string, id: string, data: Partial<RiskPrediction>): Promise<RiskPrediction> {
    const { data: result, error } = await this.supabase
      .from('risk_predictions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_RISK_PREDICTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRiskPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('risk_predictions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_RISK_PREDICTION_DELETE_FAILED', 500);
  }

  async listRiskPredictions(schoolId: string, filters?: Record<string, unknown>): Promise<RiskPrediction[]> {
    let query = this.supabase.from('risk_predictions').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_RISK_PREDICTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // ─── NationalComparison ──────────────────────────────────────────────────────
  async createNationalComparison(schoolId: string, data: Omit<NationalComparison, 'id' | 'created_at' | 'updated_at'>): Promise<NationalComparison> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('national_comparisons')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_NATIONAL_COMPARISON_CREATE_FAILED', 500);
    return result;
  }

  async getNationalComparison(schoolId: string, id: string): Promise<NationalComparison | null> {
    const { data, error } = await this.supabase
      .from('national_comparisons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNationalComparison(schoolId: string, id: string, data: Partial<NationalComparison>): Promise<NationalComparison> {
    const { data: result, error } = await this.supabase
      .from('national_comparisons')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'ADAPTIVE_NATIONAL_COMPARISON_UPDATE_FAILED', 500);
    return result;
  }

  async deleteNationalComparison(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_comparisons')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'ADAPTIVE_NATIONAL_COMPARISON_DELETE_FAILED', 500);
  }

  async listNationalComparisons(schoolId: string, filters?: Record<string, unknown>): Promise<NationalComparison[]> {
    let query = this.supabase.from('national_comparisons').select('*').eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'ADAPTIVE_NATIONAL_COMPARISON_LIST_FAILED', 500);
    return data ?? [];
  }

}

export function createAdaptiveRepository(supabase: SupabaseClient): AdaptiveRepository {
  return new AdaptiveRepositoryImpl(supabase);
}
