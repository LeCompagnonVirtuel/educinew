import { SupabaseClient } from '@supabase/supabase-js';
import type {
  Course,
  CourseQuery,
  CourseCreate,
  CourseUpdate,
  CourseModule,
  ModuleQuery,
  ModuleCreate,
  ModuleUpdate,
  Lesson,
  LessonQuery,
  LessonCreate,
  LessonUpdate,
  Chapter,
  ChapterQuery,
  ChapterCreate,
  ChapterUpdate,
  Unit,
  UnitQuery,
  UnitCreate,
  UnitUpdate,
  Topic,
  TopicQuery,
  TopicCreate,
  TopicUpdate,
  CourseVersion,
  CourseVersionQuery,
  CourseVersionCreate,
  CourseTemplate,
  CourseTemplateQuery,
  CourseTemplateCreate,
  Video,
  VideoQuery,
  VideoCreate,
  VideoUpdate,
  Audio,
  AudioQuery,
  AudioCreate,
  AudioUpdate,
  PDF,
  PDFQuery,
  PDFCreate,
  PDFUpdate,
  SCORM,
  SCORMQuery,
  SCORMCreate,
  XAPIStatement,
  XAPIQuery,
  XAPIStatementCreate,
  H5PContent,
  H5PQuery,
  H5PCreate,
  EPUB,
  EPUBQuery,
  EPUBCreate,
  OfflineContent,
  OfflineQuery,
  OfflineCreate,
  LearningPath,
  LearningPathQuery,
  LearningPathCreate,
  LearningPathUpdate,
  AdaptivePath,
  AdaptivePathQuery,
  AdaptivePathCreate,
  CompetencyPath,
  CompetencyPathQuery,
  CompetencyPathCreate,
  Assignment,
  AssignmentQuery,
  AssignmentCreate,
  AssignmentUpdate,
  Homework,
  HomeworkQuery,
  HomeworkCreate,
  HomeworkUpdate,
  Project,
  ProjectQuery,
  ProjectCreate,
  ProjectUpdate,
  Rubric,
  RubricQuery,
  RubricCreate,
  RubricUpdate,
  PeerReview,
  PeerReviewQuery,
  PeerReviewCreate,
  GroupAssignment,
  GroupAssignmentQuery,
  GroupAssignmentCreate,
  Submission,
  SubmissionQuery,
  SubmissionCreate,
  SubmissionUpdate,
  Quiz,
  QuizQuery,
  QuizCreate,
  QuizUpdate,
  QuestionBank,
  QuestionBankQuery,
  QuestionBankCreate,
  Question,
  QuestionQuery,
  QuestionCreate,
  QuestionUpdate,
  QuizAttempt,
  QuizAttemptQuery,
  Certificate,
  CertificateQuery,
  CertificateCreate,
  Badge,
  BadgeQuery,
  BadgeCreate,
  BadgeUpdate,
  MicroCredential,
  MicroCredentialQuery,
  MicroCredentialCreate,
  Competency,
  CompetencyQuery,
  CompetencyCreate,
  Skill,
  SkillQuery,
  SkillCreate,
  Verification,
  VerificationQuery,
  VerificationCreate,
  LiveSession,
  LiveSessionQuery,
  LiveSessionCreate,
  LiveSessionUpdate,
  VirtualClassroom,
  VirtualClassroomQuery,
  VirtualClassroomCreate,
  Recording,
  RecordingQuery,
  RecordingCreate,
  Attendance,
  AttendanceQuery,
  AttendanceCreate,
  Forum,
  ForumQuery,
  ForumCreate,
  ForumUpdate,
  Community,
  CommunityQuery,
  CommunityCreate,
  Group,
  GroupQuery,
  GroupCreate,
  GroupUpdate,
  Mentoring,
  MentoringQuery,
  MentoringCreate,
  StudyGroup,
  StudyGroupQuery,
  StudyGroupCreate,
  Progress,
  ProgressQuery,
  ProgressCreate,
  Engagement,
  EngagementQuery,
  EngagementCreate,
  Analytics,
  AnalyticsQuery,
  AnalyticsCreate,
  Points,
  PointsQuery,
  PointsCreate,
  XP,
  XPQuery,
  XPCreate,
  Level,
  LevelQuery,
  LevelCreate,
  Achievement,
  AchievementQuery,
  AchievementCreate,
  Leaderboard,
  LeaderboardQuery,
  LeaderboardCreate,
  Challenge,
  ChallengeQuery,
  ChallengeCreate,
  Reward,
  RewardQuery,
  RewardCreate,
  MarketplaceListing,
  MarketplaceQuery,
  MarketplaceCreate,
  Publisher,
  PublisherQuery,
  PublisherCreate,
  License,
  LicenseQuery,
  LicenseCreate,
  Review,
  ReviewQuery,
  ReviewCreate,
  RevenueShare,
  RevenueShareQuery,
  RevenueShareCreate,
  PaginatedResult,
  DateRange,
  LessonContent,
  LessonProgress,
  ChapterContent,
  UnitContent,
  VersionDiff,
  CourseTemplatePreview,
  VideoTranscript,
  VideoChapter,
  VideoStatus,
  VideoAnalytics,
  AudioTranscript,
  PDFAnnotation,
  PDFAnnotationCreate,
  SCORMManifest,
  SCORMStatus,
  SCORMCompletionData,
  SCORMScore,
  ActorProfile,
  XAPIActivity,
  ScoreAggregate,
  H5PResult,
  H5PLibrary,
  H5PContentType,
  EPUBChapter,
  EPUBMetadata,
  EPUBTOC,
  EPUBProgress,
  EPUBProgressUpdate,
  EPUBHighlight,
  EPUBHighlightCreate,
  OfflineSyncStatus,
  OfflineStorageUsage,
  LearningPathProgress,
  LearningPathPrerequisite,
  AdaptiveRule,
  AdaptiveRuleCreate,
  AdaptiveDecision,
  AdaptiveStudentPath,
  AdaptiveProgressUpdate,
  AdaptiveAnalytics,
  CompetencyPathProgress,
  MasteryLevel,
  Deliverable,
  DeliverableCreate,
  ProjectTeam,
  ProjectProgress,
  Milestone,
  RubricCriterion,
  RubricCriterionCreate,
  RubricScoreInput,
  RubricScoreResult,
  PeerReviewSubmission,
  PeerReviewAnonymous,
  GroupAssignmentGroup,
  GroupGrade,
  PeerEvaluation,
  PeerEvaluationCreate,
  SubmissionGrade,
  SubmissionFeedback,
  SubmissionAttachment,
  SubmissionAttachmentCreate,
  GradeHistory,
  BulkGradeInput,
  QuestionChoice,
  QuestionChoiceCreate,
  QuestionAnswer,
  QuestionValidationResult,
  QuestionStatistics,
  QuestionBankStatistics,
  QuizAnswer,
  QuizAttemptResult,
  QuizAnswerResult,
  QuizAnswerDetail,
  CertificateTemplate,
  CertificateStatistics,
  BadgeAward,
  BadgeProgress,
  MicroCredentialRequirement,
  MicroCredentialRequirementCreate,
  MicroCredentialEligibility,
  MicroCredentialAward,
  MicroCredentialStatistics,
  CompetencyProgress,
  CompetencyAssessment,
  CompetencyFramework,
  SkillEndorsement,
  SkillProficiency,
  SkillNode,
  VerificationResult,
  VerificationStatistics,
  LiveSessionParticipant,
  LiveSessionChat,
  WhiteboardData,
  LiveSessionScheduleCreate,
  VirtualClassroomParticipant,
  RecordingStatus,
  RecordingChapter,
  AttendanceStats,
  AttendanceReport,
  AttendanceStudentReport,
  ForumThread,
  ForumThreadCreate,
  ForumReply,
  ForumReplyCreate,
  ForumStatistics,
  CommunityMember,
  CommunityPost,
  CommunityPostCreate,
  GroupMember,
  GroupStatistics,
  MentoringSession,
  MentoringSessionCreate,
  MentoringGoal,
  MentoringGoalCreate,
  MentoringFeedback,
  StudyGroupMember,
  StudySession,
  StudySessionCreate,
  StudyResource,
  StudyResourceCreate,
  CourseProgress,
  ModuleProgress,
  OverallProgress,
  ProgressEntry,
  ProgressStreak,
  ProgressActivity,
  ProgressUpdate,
  DailyProgress,
  EngagementTrack,
  EngagementTrend,
  EngagementLeaderboard,
  EngagementRisk,
  EngagementMetrics,
  CourseAnalytics,
  StudentAnalytics,
  InstructorAnalytics,
  SchoolAnalytics,
  RealTimeMetrics,
  AnalyticsReportType,
  AnalyticsReportParams,
  AnalyticsReport,
  TrendData,
  AnalyticsComparison,
  AnalyticsPrediction,
  ExportFormat,
  AnalyticsHeatmap,
  PointsLeaderboard,
  XPLeaderboard,
  XPMultiplier,
  XPMultiplierCreate,
  LevelReward,
  LevelRequirements,
  LevelProgress,
  LevelHistory,
  LevelDistribution,
  AchievementCriteria,
  AchievementAward,
  AchievementProgress,
  AchievementStatistics,
  LeaderboardType,
  LeaderboardEntry,
  LeaderboardRank,
  LeaderboardHistory,
  ChallengeReward,
  ChallengeParticipant,
  ChallengeLeaderboard,
  ChallengeSubmission,
  ChallengeProgress,
  ChallengeStatistics,
  RewardRedemption,
  RewardStatistics,
  MarketplacePurchase,
  MarketplaceSale,
  MarketplaceEarnings,
  PublisherRevenue,
  PublisherStatistics,
  PublisherSale,
  PublisherEarnings,
  LicenseUsage,
  RatingDistribution,
  RevenueCalculation,
  RevenuePayment,
  RevenueEarnings,
  RevenueByCategory,
  RevenueReport,
  RevenueCourseRanking,
  PaymentSchedule,
  CourseStatistics,
} from '../types';

class LxpError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'LxpError';
  }
}

class LxpCourseNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Course not found: ${id}`, 'COURSE_NOT_FOUND');
  }
}

class LxpModuleNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Module not found: ${id}`, 'MODULE_NOT_FOUND');
  }
}

class LxpLessonNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Lesson not found: ${id}`, 'LESSON_NOT_FOUND');
  }
}

class LxpChapterNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Chapter not found: ${id}`, 'CHAPTER_NOT_FOUND');
  }
}

class LxpUnitNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Unit not found: ${id}`, 'UNIT_NOT_FOUND');
  }
}

class LxpTopicNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Topic not found: ${id}`, 'TOPIC_NOT_FOUND');
  }
}

class LxpVersionNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Version not found: ${id}`, 'VERSION_NOT_FOUND');
  }
}

class LxpTemplateNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Template not found: ${id}`, 'TEMPLATE_NOT_FOUND');
  }
}

class LxpVideoNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Video not found: ${id}`, 'VIDEO_NOT_FOUND');
  }
}

class LxpAudioNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Audio not found: ${id}`, 'AUDIO_NOT_FOUND');
  }
}

class LxpPDFNotFoundError extends LxpError {
  constructor(id: string) {
    super(`PDF not found: ${id}`, 'PDF_NOT_FOUND');
  }
}

class LxpSCORMNotFoundError extends LxpError {
  constructor(id: string) {
    super(`SCORM not found: ${id}`, 'SCORM_NOT_FOUND');
  }
}

class LxpXAPIError extends LxpError {
  constructor(id: string) {
    super(`XAPI statement not found: ${id}`, 'XAPI_NOT_FOUND');
  }
}

class LxpH5PNotFoundError extends LxpError {
  constructor(id: string) {
    super(`H5P content not found: ${id}`, 'H5P_NOT_FOUND');
  }
}

class LxpEPUBNotFoundError extends LxpError {
  constructor(id: string) {
    super(`EPUB not found: ${id}`, 'EPUB_NOT_FOUND');
  }
}

class LxpOfflineNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Offline content not found: ${id}`, 'OFFLINE_NOT_FOUND');
  }
}

class LxpLearningPathNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Learning path not found: ${id}`, 'LEARNING_PATH_NOT_FOUND');
  }
}

class LxpAdaptivePathNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Adaptive path not found: ${id}`, 'ADAPTIVE_PATH_NOT_FOUND');
  }
}

class LxpCompetencyPathNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Competency path not found: ${id}`, 'COMPETENCY_PATH_NOT_FOUND');
  }
}

class LxpAssignmentNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Assignment not found: ${id}`, 'ASSIGNMENT_NOT_FOUND');
  }
}

class LxpHomeworkNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Homework not found: ${id}`, 'HOMEWORK_NOT_FOUND');
  }
}

class LxpProjectNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Project not found: ${id}`, 'PROJECT_NOT_FOUND');
  }
}

class LxpRubricNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Rubric not found: ${id}`, 'RUBRIC_NOT_FOUND');
  }
}

class LxpPeerReviewNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Peer review not found: ${id}`, 'PEER_REVIEW_NOT_FOUND');
  }
}

class LxpGroupAssignmentNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Group assignment not found: ${id}`, 'GROUP_ASSIGNMENT_NOT_FOUND');
  }
}

class LxpSubmissionNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Submission not found: ${id}`, 'SUBMISSION_NOT_FOUND');
  }
}

class LxpQuizNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Quiz not found: ${id}`, 'QUIZ_NOT_FOUND');
  }
}

class LxpQuestionBankNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Question bank not found: ${id}`, 'QUESTION_BANK_NOT_FOUND');
  }
}

class LxpQuestionNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Question not found: ${id}`, 'QUESTION_NOT_FOUND');
  }
}

class LxpQuizAttemptNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Quiz attempt not found: ${id}`, 'QUIZ_ATTEMPT_NOT_FOUND');
  }
}

class LxpCertificateNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Certificate not found: ${id}`, 'CERTIFICATE_NOT_FOUND');
  }
}

class LxpBadgeNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Badge not found: ${id}`, 'BADGE_NOT_FOUND');
  }
}

class LxpMicroCredentialNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Micro credential not found: ${id}`, 'MICRO_CREDENTIAL_NOT_FOUND');
  }
}

class LxpCompetencyNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Competency not found: ${id}`, 'COMPETENCY_NOT_FOUND');
  }
}

class LxpSkillNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Skill not found: ${id}`, 'SKILL_NOT_FOUND');
  }
}

class LxpVerificationNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Verification not found: ${id}`, 'VERIFICATION_NOT_FOUND');
  }
}

class LxpLiveSessionNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Live session not found: ${id}`, 'LIVE_SESSION_NOT_FOUND');
  }
}

class LxpVirtualClassroomNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Virtual classroom not found: ${id}`, 'VIRTUAL_CLASSROOM_NOT_FOUND');
  }
}

class LxpRecordingNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Recording not found: ${id}`, 'RECORDING_NOT_FOUND');
  }
}

class LxpAttendanceNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Attendance not found: ${id}`, 'ATTENDANCE_NOT_FOUND');
  }
}

class LxpForumNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Forum not found: ${id}`, 'FORUM_NOT_FOUND');
  }
}

class LxpCommunityNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Community not found: ${id}`, 'COMMUNITY_NOT_FOUND');
  }
}

class LxpGroupNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Group not found: ${id}`, 'GROUP_NOT_FOUND');
  }
}

class LxpMentoringNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Mentoring not found: ${id}`, 'MENTORING_NOT_FOUND');
  }
}

class LxpStudyGroupNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Study group not found: ${id}`, 'STUDY_GROUP_NOT_FOUND');
  }
}

class LxpProgressNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Progress not found: ${id}`, 'PROGRESS_NOT_FOUND');
  }
}

class LxpEngagementNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Engagement not found: ${id}`, 'ENGAGEMENT_NOT_FOUND');
  }
}

class LxpAnalyticsNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Analytics not found: ${id}`, 'ANALYTICS_NOT_FOUND');
  }
}

class LxpPointsNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Points not found: ${id}`, 'POINTS_NOT_FOUND');
  }
}

class LxpXPNotFoundError extends LxpError {
  constructor(id: string) {
    super(`XP not found: ${id}`, 'XP_NOT_FOUND');
  }
}

class LxpLevelNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Level not found: ${id}`, 'LEVEL_NOT_FOUND');
  }
}

class LxpAchievementNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Achievement not found: ${id}`, 'ACHIEVEMENT_NOT_FOUND');
  }
}

class LxpLeaderboardNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Leaderboard not found: ${id}`, 'LEADERBOARD_NOT_FOUND');
  }
}

class LxpChallengeNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Challenge not found: ${id}`, 'CHALLENGE_NOT_FOUND');
  }
}

class LxpRewardNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Reward not found: ${id}`, 'REWARD_NOT_FOUND');
  }
}

class LxpMarketplaceNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Marketplace listing not found: ${id}`, 'MARKETPLACE_NOT_FOUND');
  }
}

class LxpPublisherNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Publisher not found: ${id}`, 'PUBLISHER_NOT_FOUND');
  }
}

class LxpLicenseNotFoundError extends LxpError {
  constructor(id: string) {
    super(`License not found: ${id}`, 'LICENSE_NOT_FOUND');
  }
}

class LxpReviewNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Review not found: ${id}`, 'REVIEW_NOT_FOUND');
  }
}

class LxpRevenueShareNotFoundError extends LxpError {
  constructor(id: string) {
    super(`Revenue share not found: ${id}`, 'REVENUE_SHARE_NOT_FOUND');
  }
}

interface SupabaseQuery {
  range(from: number, to: number): PromiseLike<{ data: unknown; error: unknown; count: number | null }>;
  eq(col: string, val: unknown): SupabaseQuery;
  ilike(col: string, val: string): SupabaseQuery;
  order(col: string, opts?: { ascending: boolean }): SupabaseQuery;
}

export class LxpRepositoryEnterprise {
  constructor(private readonly supabase: SupabaseClient) {}

  private async paginate<T>(q: SupabaseQuery, page: number = 1, limit: number = 20): Promise<PaginatedResult<T>> {
    const offset = (page - 1) * limit;
    const { data, error, count } = await q.range(offset, offset + limit - 1);
    if (error) throw error;
    return {
      data: (data as T[]) || [],
      total: count || 0,
      page,
      pageSize: limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  private applyCourseFilters(q: SupabaseQuery, query: CourseQuery): SupabaseQuery {
    if (query.category && query.category !== 'all') q = q.eq('category_id', query.category);
    if (query.instructorId) q = q.eq('instructor_id', query.instructorId);
    if (query.status && query.status !== 'all') q = q.eq('status', query.status);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    return q.order(query.sortBy || 'created_at', { ascending: query.sortOrder === 'asc' });
  }

  async findCourseById(schoolId: string, id: string): Promise<Course | null> {
    const { data, error } = await this.supabase
      .from('lxp_courses').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpCourseNotFoundError(id);
    return data as Course | null;
  }

  async findAllCourses(schoolId: string, query: CourseQuery): Promise<PaginatedResult<Course>> {
    const q = this.applyCourseFilters(
      this.supabase.from('lxp_courses').select('*', { count: 'exact' }).eq('school_id', schoolId), query
    );
    return this.paginate<Course>(q, query.page, query.limit);
  }

  async createCourse(schoolId: string, data: CourseCreate): Promise<Course> {
    const { data: course, error } = await this.supabase
      .from('lxp_courses').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return course as Course;
  }

  async updateCourse(schoolId: string, id: string, data: CourseUpdate): Promise<Course> {
    const { data: course, error } = await this.supabase
      .from('lxp_courses').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpCourseNotFoundError(id);
    return course as Course;
  }

  async deleteCourse(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_courses').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpCourseNotFoundError(id);
  }

  async findCourseBySlug(schoolId: string, slug: string): Promise<Course | null> {
    const { data, error } = await this.supabase
      .from('lxp_courses').select('*').eq('slug', slug).eq('school_id', schoolId).single();
    if (error) return null;
    return data as Course | null;
  }

  async findCoursesByInstructor(schoolId: string, instructorId: string, query: CourseQuery): Promise<PaginatedResult<Course>> {
    const q = this.applyCourseFilters(
      this.supabase.from('lxp_courses').select('*', { count: 'exact' }).eq('school_id', schoolId).eq('instructor_id', instructorId), query
    );
    return this.paginate<Course>(q, query.page, query.limit);
  }

  async findCoursesByCategory(schoolId: string, categoryId: string, query: CourseQuery): Promise<PaginatedResult<Course>> {
    const q = this.applyCourseFilters(
      this.supabase.from('lxp_courses').select('*', { count: 'exact' }).eq('school_id', schoolId).eq('category_id', categoryId), query
    );
    return this.paginate<Course>(q, query.page, query.limit);
  }

  async findPublishedCourses(schoolId: string, query: CourseQuery): Promise<PaginatedResult<Course>> {
    const q = this.applyCourseFilters(
      this.supabase.from('lxp_courses').select('*', { count: 'exact' }).eq('school_id', schoolId).eq('status', 'published'), query
    );
    return this.paginate<Course>(q, query.page, query.limit);
  }

  async findDraftCourses(schoolId: string, query: CourseQuery): Promise<PaginatedResult<Course>> {
    const q = this.applyCourseFilters(
      this.supabase.from('lxp_courses').select('*', { count: 'exact' }).eq('school_id', schoolId).eq('status', 'draft'), query
    );
    return this.paginate<Course>(q, query.page, query.limit);
  }

  async archiveCourse(schoolId: string, id: string): Promise<Course> {
    return this.updateCourse(schoolId, id, { status: 'archived' } as CourseUpdate);
  }

  async publishCourse(schoolId: string, id: string): Promise<Course> {
    return this.updateCourse(schoolId, id, { status: 'published' } as CourseUpdate);
  }

  async unpublishCourse(schoolId: string, id: string): Promise<Course> {
    return this.updateCourse(schoolId, id, { status: 'draft' } as CourseUpdate);
  }

  async duplicateCourse(schoolId: string, id: string, newTitle: string): Promise<Course> {
    const original = await this.findCourseById(schoolId, id);
    if (!original) throw new LxpCourseNotFoundError(id);
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as unknown as Record<string, unknown>;
    return this.createCourse(schoolId, { ...rest, title: newTitle } as CourseCreate);
  }

  async findCoursesByEnrollment(schoolId: string, studentId: string): Promise<Course[]> {
    const { data, error } = await this.supabase
      .from('lxp_enrollments').select('lxp_courses(*)').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []).map((e: Record<string, unknown>) => e.lxp_courses as Course).filter(Boolean);
  }

  async getCourseEnrollmentCount(schoolId: string, id: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_enrollments').select('*', { count: 'exact', head: true }).eq('course_id', id).eq('school_id', schoolId);
    return count || 0;
  }

  async getCourseModules(schoolId: string, id: string): Promise<CourseModule[]> {
    const { data, error } = await this.supabase
      .from('lxp_modules').select('*').eq('course_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as CourseModule[];
  }

  async reorderCourseModules(schoolId: string, id: string, moduleIds: string[]): Promise<void> {
    for (let i = 0; i < moduleIds.length; i++) {
      await this.supabase.from('lxp_modules').update({ order: i + 1 })
        .eq('id', moduleIds[i]).eq('course_id', id).eq('school_id', schoolId);
    }
  }

  async updateCourseSettings(schoolId: string, id: string, settings: Record<string, unknown>): Promise<Course> {
    return this.updateCourse(schoolId, id, { settings } as CourseUpdate);
  }

  async getCourseStatistics(schoolId: string, id: string): Promise<CourseStatistics> {
    const enrollmentCount = await this.getCourseEnrollmentCount(schoolId, id);
    const { data: completions } = await this.supabase
      .from('lxp_progress').select('id', { count: 'exact' }).eq('course_id', id).eq('school_id', schoolId).eq('completed', true);
    const { data: ratings } = await this.supabase
      .from('lxp_reviews').select('rating').eq('course_id', id).eq('school_id', schoolId);
    const ratingArray = (ratings || []) as { rating: number }[];
    const avgRating = ratingArray.length > 0 ? ratingArray.reduce((sum, r) => sum + r.rating, 0) / ratingArray.length : 0;
    return { totalStudents: enrollmentCount, completionRate: enrollmentCount > 0 ? ((completions?.length || 0) / enrollmentCount) * 100 : 0, averageScore: 0, averageRating: avgRating, totalRevenue: 0, activeStudents: enrollmentCount, timeSpentAvg: 0, enrollmentTrend: [], ratingDistribution: {}, topModules: [], dropoffPoints: [] };
  }

  async findFeaturedCourses(schoolId: string, limit: number): Promise<Course[]> {
    const { data, error } = await this.supabase
      .from('lxp_courses').select('*').eq('school_id', schoolId).eq('status', 'published').eq('featured', true).limit(limit);
    if (error) throw error;
    return (data || []) as Course[];
  }

  async searchCoursesFullText(schoolId: string, query: string): Promise<Course[]> {
    const { data, error } = await this.supabase
      .from('lxp_courses').select('*').eq('school_id', schoolId).eq('status', 'published')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    if (error) throw error;
    return (data || []) as Course[];
  }

  async findModuleById(schoolId: string, id: string): Promise<CourseModule | null> {
    const { data, error } = await this.supabase
      .from('lxp_modules').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpModuleNotFoundError(id);
    return data as CourseModule | null;
  }

  async findAllModules(schoolId: string, query: ModuleQuery): Promise<PaginatedResult<CourseModule>> {
    let q = this.supabase.from('lxp_modules').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'order', { ascending: true });
    return this.paginate<CourseModule>(q, query.page, query.limit);
  }

  async createModule(schoolId: string, data: ModuleCreate): Promise<CourseModule> {
    const { data: mod, error } = await this.supabase
      .from('lxp_modules').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return mod as CourseModule;
  }

  async updateModule(schoolId: string, id: string, data: ModuleUpdate): Promise<CourseModule> {
    const { data: mod, error } = await this.supabase
      .from('lxp_modules').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpModuleNotFoundError(id);
    return mod as CourseModule;
  }

  async deleteModule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_modules').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpModuleNotFoundError(id);
  }

  async findModulesByCourse(schoolId: string, courseId: string): Promise<CourseModule[]> {
    const { data, error } = await this.supabase
      .from('lxp_modules').select('*').eq('course_id', courseId).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as CourseModule[];
  }

  async reorderModules(schoolId: string, courseId: string, moduleIds: string[]): Promise<void> {
    for (let i = 0; i < moduleIds.length; i++) {
      await this.supabase.from('lxp_modules').update({ order: i + 1 })
        .eq('id', moduleIds[i]).eq('course_id', courseId).eq('school_id', schoolId);
    }
  }

  async getModuleLessons(schoolId: string, id: string): Promise<Lesson[]> {
    const { data, error } = await this.supabase
      .from('lxp_lessons').select('*').eq('module_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as Lesson[];
  }

  async getModuleCompletionRate(schoolId: string, id: string): Promise<number> {
    const lessons = await this.getModuleLessons(schoolId, id);
    if (lessons.length === 0) return 0;
    const { count: completed } = await this.supabase
      .from('lxp_lesson_progress').select('*', { count: 'exact', head: true })
      .eq('module_id', id).eq('school_id', schoolId).eq('completed', true);
    return ((completed || 0) / lessons.length) * 100;
  }

  async getModuleEstimatedDuration(schoolId: string, id: string): Promise<number> {
    const { data } = await this.supabase
      .from('lxp_lessons').select('estimated_duration').eq('module_id', id).eq('school_id', schoolId);
    return (data || []).reduce((sum: number, l: Record<string, unknown>) => sum + ((l.estimated_duration as number) || 0), 0);
  }

  async duplicateModule(schoolId: string, id: string, courseId: string): Promise<CourseModule> {
    const original = await this.findModuleById(schoolId, id);
    if (!original) throw new LxpModuleNotFoundError(id);
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as unknown as Record<string, unknown>;
    return this.createModule(schoolId, { ...rest, course_id: courseId } as unknown as ModuleCreate);
  }

  async findModulesByIds(schoolId: string, ids: string[]): Promise<CourseModule[]> {
    const { data, error } = await this.supabase
      .from('lxp_modules').select('*').in('id', ids).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as CourseModule[];
  }

  async countModulesByCourse(schoolId: string, courseId: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_modules').select('*', { count: 'exact', head: true }).eq('course_id', courseId).eq('school_id', schoolId);
    return count || 0;
  }

  async findLessonById(schoolId: string, id: string): Promise<Lesson | null> {
    const { data, error } = await this.supabase
      .from('lxp_lessons').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpLessonNotFoundError(id);
    return data as Lesson | null;
  }

  async findAllLessons(schoolId: string, query: LessonQuery): Promise<PaginatedResult<Lesson>> {
    let q = this.supabase.from('lxp_lessons').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.moduleId) q = q.eq('module_id', query.moduleId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'order', { ascending: true });
    return this.paginate<Lesson>(q, query.page, query.limit);
  }

  async createLesson(schoolId: string, data: LessonCreate): Promise<Lesson> {
    const { data: lesson, error } = await this.supabase
      .from('lxp_lessons').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return lesson as Lesson;
  }

  async updateLesson(schoolId: string, id: string, data: LessonUpdate): Promise<Lesson> {
    const { data: lesson, error } = await this.supabase
      .from('lxp_lessons').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLessonNotFoundError(id);
    return lesson as Lesson;
  }

  async deleteLesson(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_lessons').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpLessonNotFoundError(id);
  }

  async findLessonsByModule(schoolId: string, moduleId: string): Promise<Lesson[]> {
    const { data, error } = await this.supabase
      .from('lxp_lessons').select('*').eq('module_id', moduleId).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as Lesson[];
  }

  async reorderLessons(schoolId: string, moduleId: string, lessonIds: string[]): Promise<void> {
    for (let i = 0; i < lessonIds.length; i++) {
      await this.supabase.from('lxp_lessons').update({ order: i + 1 })
        .eq('id', lessonIds[i]).eq('module_id', moduleId).eq('school_id', schoolId);
    }
  }

  async getLessonContent(schoolId: string, id: string): Promise<LessonContent> {
    const lesson = await this.findLessonById(schoolId, id);
    if (!lesson) throw new LxpLessonNotFoundError(id);
    const { data: resources } = await this.supabase
      .from('lxp_lesson_resources').select('*').eq('lesson_id', id).eq('school_id', schoolId);
    const { data: attachments } = await this.supabase
      .from('lxp_lesson_attachments').select('*').eq('lesson_id', id).eq('school_id', schoolId);
    return { body: (lesson as unknown as Record<string, unknown>).content as string || '', resources: (resources || []) as LessonContent['resources'], attachments: (attachments || []) as LessonContent['attachments'] };
  }

  async getLessonProgress(schoolId: string, id: string, studentId: string): Promise<LessonProgress> {
    const { data } = await this.supabase
      .from('lxp_lesson_progress').select('*').eq('lesson_id', id).eq('student_id', studentId).eq('school_id', schoolId).single();
    if (!data) return { completed: false, timeSpent: 0, lastAccessed: '', score: null };
    return data as LessonProgress;
  }

  async markLessonComplete(schoolId: string, id: string, studentId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_lesson_progress').upsert({ lesson_id: id, student_id: studentId, school_id: schoolId, completed: true, completed_at: new Date().toISOString() });
    if (error) throw error;
  }

  async getLessonPrerequisites(schoolId: string, id: string): Promise<Lesson[]> {
    const { data, error } = await this.supabase
      .from('lxp_lesson_prerequisites').select('lxp_lessons(*)').eq('lesson_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []).map((p: Record<string, unknown>) => p.lxp_lessons as Lesson).filter(Boolean);
  }

  async duplicateLesson(schoolId: string, id: string, moduleId: string): Promise<Lesson> {
    const original = await this.findLessonById(schoolId, id);
    if (!original) throw new LxpLessonNotFoundError(id);
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as unknown as Record<string, unknown>;
    return this.createLesson(schoolId, { ...rest, module_id: moduleId } as unknown as LessonCreate);
  }

  async countLessonsByModule(schoolId: string, moduleId: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_lessons').select('*', { count: 'exact', head: true }).eq('module_id', moduleId).eq('school_id', schoolId);
    return count || 0;
  }

  async getLessonEstimatedDuration(schoolId: string, id: string): Promise<number> {
    const lesson = await this.findLessonById(schoolId, id);
    if (!lesson) throw new LxpLessonNotFoundError(id);
    return ((lesson as unknown as Record<string, unknown>).estimated_duration as number) || 0;
  }

  async findPublicLessons(schoolId: string, query: LessonQuery): Promise<PaginatedResult<Lesson>> {
    let q = this.supabase.from('lxp_lessons').select('*', { count: 'exact' }).eq('school_id', schoolId).eq('is_public', true);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'order', { ascending: true });
    return this.paginate<Lesson>(q, query.page, query.limit);
  }

  async findChapterById(schoolId: string, id: string): Promise<Chapter | null> {
    const { data, error } = await this.supabase
      .from('lxp_chapters').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpChapterNotFoundError(id);
    return data as Chapter | null;
  }

  async findAllChapters(schoolId: string, query: ChapterQuery): Promise<PaginatedResult<Chapter>> {
    let q = this.supabase.from('lxp_chapters').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.lessonId) q = q.eq('lesson_id', query.lessonId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'order', { ascending: true });
    return this.paginate<Chapter>(q, query.page, query.limit);
  }

  async createChapter(schoolId: string, data: ChapterCreate): Promise<Chapter> {
    const { data: chapter, error } = await this.supabase
      .from('lxp_chapters').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return chapter as Chapter;
  }

  async updateChapter(schoolId: string, id: string, data: ChapterUpdate): Promise<Chapter> {
    const { data: chapter, error } = await this.supabase
      .from('lxp_chapters').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpChapterNotFoundError(id);
    return chapter as Chapter;
  }

  async deleteChapter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_chapters').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpChapterNotFoundError(id);
  }

  async findChaptersByLesson(schoolId: string, lessonId: string): Promise<Chapter[]> {
    const { data, error } = await this.supabase
      .from('lxp_chapters').select('*').eq('lesson_id', lessonId).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as Chapter[];
  }

  async reorderChapters(schoolId: string, lessonId: string, chapterIds: string[]): Promise<void> {
    for (let i = 0; i < chapterIds.length; i++) {
      await this.supabase.from('lxp_chapters').update({ order: i + 1 })
        .eq('id', chapterIds[i]).eq('lesson_id', lessonId).eq('school_id', schoolId);
    }
  }

  async getChapterContent(schoolId: string, id: string): Promise<ChapterContent> {
    const chapter = await this.findChapterById(schoolId, id);
    if (!chapter) throw new LxpChapterNotFoundError(id);
    const content = (chapter as unknown as Record<string, unknown>).content as string || '';
    const words = content.split(/\s+/).length;
    return { body: content, wordCount: words, readingTime: Math.ceil(words / 200) };
  }

  async getChapterWordCount(schoolId: string, id: string): Promise<number> {
    const content = await this.getChapterContent(schoolId, id);
    return content.wordCount;
  }

  async getChapterReadingTime(schoolId: string, id: string): Promise<number> {
    const content = await this.getChapterContent(schoolId, id);
    return content.readingTime;
  }

  async findUnitById(schoolId: string, id: string): Promise<Unit | null> {
    const { data, error } = await this.supabase
      .from('lxp_units').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpUnitNotFoundError(id);
    return data as Unit | null;
  }

  async findAllUnits(schoolId: string, query: UnitQuery): Promise<PaginatedResult<Unit>> {
    let q = this.supabase.from('lxp_units').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.chapterId) q = q.eq('chapter_id', query.chapterId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'order', { ascending: true });
    return this.paginate<Unit>(q, query.page, query.limit);
  }

  async createUnit(schoolId: string, data: UnitCreate): Promise<Unit> {
    const { data: unit, error } = await this.supabase
      .from('lxp_units').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return unit as Unit;
  }

  async updateUnit(schoolId: string, id: string, data: UnitUpdate): Promise<Unit> {
    const { data: unit, error } = await this.supabase
      .from('lxp_units').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpUnitNotFoundError(id);
    return unit as Unit;
  }

  async deleteUnit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_units').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpUnitNotFoundError(id);
  }

  async findUnitsByChapter(schoolId: string, chapterId: string): Promise<Unit[]> {
    const { data, error } = await this.supabase
      .from('lxp_units').select('*').eq('chapter_id', chapterId).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as Unit[];
  }

  async reorderUnits(schoolId: string, chapterId: string, unitIds: string[]): Promise<void> {
    for (let i = 0; i < unitIds.length; i++) {
      await this.supabase.from('lxp_units').update({ order: i + 1 })
        .eq('id', unitIds[i]).eq('chapter_id', chapterId).eq('school_id', schoolId);
    }
  }

  async getUnitContent(schoolId: string, id: string): Promise<UnitContent> {
    const unit = await this.findUnitById(schoolId, id);
    if (!unit) throw new LxpUnitNotFoundError(id);
    return { body: (unit as unknown as Record<string, unknown>).content as string || '', duration: ((unit as unknown as Record<string, unknown>).estimated_duration as number) || 0 };
  }

  async getUnitEstimatedDuration(schoolId: string, id: string): Promise<number> {
    const unit = await this.findUnitById(schoolId, id);
    if (!unit) throw new LxpUnitNotFoundError(id);
    return ((unit as unknown as Record<string, unknown>).estimated_duration as number) || 0;
  }

  async countUnitsByChapter(schoolId: string, chapterId: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_units').select('*', { count: 'exact', head: true }).eq('chapter_id', chapterId).eq('school_id', schoolId);
    return count || 0;
  }

  async findTopicById(schoolId: string, id: string): Promise<Topic | null> {
    const { data, error } = await this.supabase
      .from('lxp_topics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpTopicNotFoundError(id);
    return data as Topic | null;
  }

  async findAllTopics(schoolId: string, query: TopicQuery): Promise<PaginatedResult<Topic>> {
    let q = this.supabase.from('lxp_topics').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.unitId) q = q.eq('unit_id', query.unitId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Topic>(q, query.page, query.limit);
  }

  async createTopic(schoolId: string, data: TopicCreate): Promise<Topic> {
    const { data: topic, error } = await this.supabase
      .from('lxp_topics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return topic as Topic;
  }

  async updateTopic(schoolId: string, id: string, data: TopicUpdate): Promise<Topic> {
    const { data: topic, error } = await this.supabase
      .from('lxp_topics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpTopicNotFoundError(id);
    return topic as Topic;
  }

  async deleteTopic(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_topics').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpTopicNotFoundError(id);
  }

  async findTopicsByUnit(schoolId: string, unitId: string): Promise<Topic[]> {
    const { data, error } = await this.supabase
      .from('lxp_topics').select('*').eq('unit_id', unitId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Topic[];
  }

  async getRelatedTopics(schoolId: string, id: string): Promise<Topic[]> {
    const { data, error } = await this.supabase
      .from('lxp_topic_relations').select('lxp_topics(*)').eq('topic_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []).map((r: Record<string, unknown>) => r.lxp_topics as Topic).filter(Boolean);
  }

  async getSubTopics(schoolId: string, id: string): Promise<Topic[]> {
    const { data, error } = await this.supabase
      .from('lxp_topics').select('*').eq('parent_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Topic[];
  }

  async countTopicsByUnit(schoolId: string, unitId: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_topics').select('*', { count: 'exact', head: true }).eq('unit_id', unitId).eq('school_id', schoolId);
    return count || 0;
  }

  async searchTopicsByName(schoolId: string, query: string): Promise<Topic[]> {
    const { data, error } = await this.supabase
      .from('lxp_topics').select('*').eq('school_id', schoolId).ilike('name', `%${query}%`);
    if (error) throw error;
    return (data || []) as Topic[];
  }

  async findCourseVersionById(schoolId: string, id: string): Promise<CourseVersion | null> {
    const { data, error } = await this.supabase
      .from('lxp_course_versions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpVersionNotFoundError(id);
    return data as CourseVersion | null;
  }

  async findAllCourseVersions(schoolId: string, query: CourseVersionQuery): Promise<PaginatedResult<CourseVersion>> {
    let q = this.supabase.from('lxp_course_versions').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<CourseVersion>(q, query.page, query.limit);
  }

  async createCourseVersion(schoolId: string, data: CourseVersionCreate): Promise<CourseVersion> {
    const { data: version, error } = await this.supabase
      .from('lxp_course_versions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return version as CourseVersion;
  }

  async findVersionsByCourse(schoolId: string, courseId: string): Promise<CourseVersion[]> {
    const { data, error } = await this.supabase
      .from('lxp_course_versions').select('*').eq('course_id', courseId).eq('school_id', schoolId).order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as CourseVersion[];
  }

  async getLatestCourseVersion(schoolId: string, courseId: string): Promise<CourseVersion | null> {
    const { data, error } = await this.supabase
      .from('lxp_course_versions').select('*').eq('course_id', courseId).eq('school_id', schoolId)
      .order('created_at', { ascending: false }).limit(1).single();
    if (error) return null;
    return data as CourseVersion | null;
  }

  async getPublishedCourseVersion(schoolId: string, courseId: string): Promise<CourseVersion | null> {
    const { data, error } = await this.supabase
      .from('lxp_course_versions').select('*').eq('course_id', courseId).eq('school_id', schoolId).eq('status', 'published')
      .order('created_at', { ascending: false }).limit(1).single();
    if (error) return null;
    return data as CourseVersion | null;
  }

  async publishCourseVersion(schoolId: string, id: string): Promise<CourseVersion> {
    const { data, error } = await this.supabase
      .from('lxp_course_versions').update({ status: 'published' }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpVersionNotFoundError(id);
    return data as CourseVersion;
  }

  async archiveCourseVersion(schoolId: string, id: string): Promise<CourseVersion> {
    const { data, error } = await this.supabase
      .from('lxp_course_versions').update({ status: 'archived' }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpVersionNotFoundError(id);
    return data as CourseVersion;
  }

  async getCourseChangelog(schoolId: string, courseId: string): Promise<string[]> {
    const versions = await this.findVersionsByCourse(schoolId, courseId);
    return versions.map((v) => (v as unknown as Record<string, unknown>).changelog as string).filter(Boolean);
  }

  async compareCourseVersions(schoolId: string, versionAId: string, versionBId: string): Promise<VersionDiff> {
    await this.findCourseVersionById(schoolId, versionAId);
    await this.findCourseVersionById(schoolId, versionBId);
    return { added: [], removed: [], modified: [] };
  }

  async findCourseTemplateById(schoolId: string, id: string): Promise<CourseTemplate | null> {
    const { data, error } = await this.supabase
      .from('lxp_course_templates').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpTemplateNotFoundError(id);
    return data as CourseTemplate | null;
  }

  async findAllCourseTemplates(schoolId: string, query: CourseTemplateQuery): Promise<PaginatedResult<CourseTemplate>> {
    let q = this.supabase.from('lxp_course_templates').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<CourseTemplate>(q, query.page, query.limit);
  }

  async createCourseTemplate(schoolId: string, data: CourseTemplateCreate): Promise<CourseTemplate> {
    const { data: template, error } = await this.supabase
      .from('lxp_course_templates').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return template as CourseTemplate;
  }

  async updateCourseTemplate(schoolId: string, id: string, data: Partial<CourseTemplateCreate>): Promise<CourseTemplate> {
    const { data: template, error } = await this.supabase
      .from('lxp_course_templates').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpTemplateNotFoundError(id);
    return template as CourseTemplate;
  }

  async deleteCourseTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_course_templates').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpTemplateNotFoundError(id);
  }

  async findTemplatesByCategory(schoolId: string, categoryId: string): Promise<CourseTemplate[]> {
    const { data, error } = await this.supabase
      .from('lxp_course_templates').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as CourseTemplate[];
  }

  async findFeaturedTemplates(schoolId: string): Promise<CourseTemplate[]> {
    const { data, error } = await this.supabase
      .from('lxp_course_templates').select('*').eq('school_id', schoolId).eq('featured', true);
    if (error) throw error;
    return (data || []) as CourseTemplate[];
  }

  async cloneCourseTemplate(schoolId: string, id: string, newTitle: string): Promise<CourseTemplate> {
    const original = await this.findCourseTemplateById(schoolId, id);
    if (!original) throw new LxpTemplateNotFoundError(id);
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as unknown as Record<string, unknown>;
    return this.createCourseTemplate(schoolId, { ...rest, title: newTitle } as CourseTemplateCreate);
  }

  async getCourseTemplatePreview(schoolId: string, id: string): Promise<CourseTemplatePreview> {
    const template = await this.findCourseTemplateById(schoolId, id);
    if (!template) throw new LxpTemplateNotFoundError(id);
    return { structure: (template as unknown as Record<string, unknown>).structure as CourseTemplatePreview['structure'], sampleContent: {} as unknown as Record<string, unknown> };
  }

  async incrementTemplateUsage(schoolId: string, id: string): Promise<void> {
    await this.supabase.rpc('increment_template_usage', { p_template_id: id, p_school_id: schoolId });
  }

  async searchTemplatesByName(schoolId: string, query: string): Promise<CourseTemplate[]> {
    const { data, error } = await this.supabase
      .from('lxp_course_templates').select('*').eq('school_id', schoolId).ilike('title', `%${query}%`);
    if (error) throw error;
    return (data || []) as CourseTemplate[];
  }

  async findVideoById(schoolId: string, id: string): Promise<Video | null> {
    const { data, error } = await this.supabase
      .from('lxp_videos').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpVideoNotFoundError(id);
    return data as Video | null;
  }

  async findAllVideos(schoolId: string, query: VideoQuery): Promise<PaginatedResult<Video>> {
    let q = this.supabase.from('lxp_videos').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.lessonId) q = q.eq('lesson_id', query.lessonId);
    if (query.uploaderId) q = q.eq('uploader_id', query.uploaderId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Video>(q, query.page, query.limit);
  }

  async createVideo(schoolId: string, data: VideoCreate): Promise<Video> {
    const { data: video, error } = await this.supabase
      .from('lxp_videos').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return video as Video;
  }

  async updateVideo(schoolId: string, id: string, data: VideoUpdate): Promise<Video> {
    const { data: video, error } = await this.supabase
      .from('lxp_videos').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpVideoNotFoundError(id);
    return video as Video;
  }

  async deleteVideo(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_videos').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpVideoNotFoundError(id);
  }

  async findVideosByLesson(schoolId: string, lessonId: string): Promise<Video[]> {
    const { data, error } = await this.supabase
      .from('lxp_videos').select('*').eq('lesson_id', lessonId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Video[];
  }

  async findVideosByUploader(schoolId: string, uploaderId: string): Promise<Video[]> {
    const { data, error } = await this.supabase
      .from('lxp_videos').select('*').eq('uploader_id', uploaderId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Video[];
  }

  async getVideoStreamUrl(schoolId: string, id: string): Promise<string> {
    const video = await this.findVideoById(schoolId, id);
    if (!video) throw new LxpVideoNotFoundError(id);
    return (video as unknown as Record<string, unknown>).stream_url as string;
  }

  async getVideoThumbnailUrl(schoolId: string, id: string): Promise<string> {
    const video = await this.findVideoById(schoolId, id);
    if (!video) throw new LxpVideoNotFoundError(id);
    return (video as unknown as Record<string, unknown>).thumbnail_url as string;
  }

  async getVideoTranscript(schoolId: string, id: string): Promise<VideoTranscript> {
    const { data } = await this.supabase
      .from('lxp_video_transcripts').select('*').eq('video_id', id).eq('school_id', schoolId).single();
    return (data as VideoTranscript) || { segments: [], language: 'en' };
  }

  async getVideoChapters(schoolId: string, id: string): Promise<VideoChapter[]> {
    const { data, error } = await this.supabase
      .from('lxp_video_chapters').select('*').eq('video_id', id).eq('school_id', schoolId).order('start_time');
    if (error) throw error;
    return (data || []) as VideoChapter[];
  }

  async processVideo(schoolId: string, id: string): Promise<void> {
    await this.supabase.from('lxp_videos').update({ status: 'processing' }).eq('id', id).eq('school_id', schoolId);
  }

  async getVideoStatus(schoolId: string, id: string): Promise<VideoStatus> {
    const video = await this.findVideoById(schoolId, id);
    if (!video) throw new LxpVideoNotFoundError(id);
    return { state: (video as unknown as Record<string, unknown>).status as VideoStatus['state'], progress: ((video as unknown as Record<string, unknown>).processing_progress as number) || 0, error: (video as unknown as Record<string, unknown>).processing_error as string | null };
  }

  async getVideoViews(schoolId: string, id: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_video_views').select('*', { count: 'exact', head: true }).eq('video_id', id).eq('school_id', schoolId);
    return count || 0;
  }

  async getVideoAnalytics(schoolId: string, id: string): Promise<VideoAnalytics> {
    const views = await this.getVideoViews(schoolId, id);
    const { data } = await this.supabase
      .from('lxp_video_analytics').select('*').eq('video_id', id).eq('school_id', schoolId).single();
    const row = (data || {}) as unknown as Record<string, unknown>;
    return { views, uniqueViewers: (row.unique_viewers as number) || 0, averageWatchTime: (row.average_watch_time as number) || 0, completionRate: (row.completion_rate as number) || 0, dropOffPoints: (row.drop_off_points as number[]) || [] };
  }

  async findPopularVideos(schoolId: string, limit: number): Promise<Video[]> {
    const { data, error } = await this.supabase
      .from('lxp_videos').select('*').eq('school_id', schoolId).eq('status', 'ready').order('view_count', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as Video[];
  }

  async findAudioById(schoolId: string, id: string): Promise<Audio | null> {
    const { data, error } = await this.supabase
      .from('lxp_audio').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpAudioNotFoundError(id);
    return data as Audio | null;
  }

  async findAllAudios(schoolId: string, query: AudioQuery): Promise<PaginatedResult<Audio>> {
    let q = this.supabase.from('lxp_audio').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.lessonId) q = q.eq('lesson_id', query.lessonId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Audio>(q, query.page, query.limit);
  }

  async createAudio(schoolId: string, data: AudioCreate): Promise<Audio> {
    const { data: audio, error } = await this.supabase
      .from('lxp_audio').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return audio as Audio;
  }

  async updateAudio(schoolId: string, id: string, data: AudioUpdate): Promise<Audio> {
    const { data: audio, error } = await this.supabase
      .from('lxp_audio').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpAudioNotFoundError(id);
    return audio as Audio;
  }

  async deleteAudio(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_audio').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpAudioNotFoundError(id);
  }

  async findAudiosByLesson(schoolId: string, lessonId: string): Promise<Audio[]> {
    const { data, error } = await this.supabase
      .from('lxp_audio').select('*').eq('lesson_id', lessonId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Audio[];
  }

  async getAudioStreamUrl(schoolId: string, id: string): Promise<string> {
    const audio = await this.findAudioById(schoolId, id);
    if (!audio) throw new LxpAudioNotFoundError(id);
    return (audio as unknown as Record<string, unknown>).stream_url as string;
  }

  async getAudioTranscript(schoolId: string, id: string): Promise<AudioTranscript> {
    const { data } = await this.supabase
      .from('lxp_audio_transcripts').select('*').eq('audio_id', id).eq('school_id', schoolId).single();
    return (data as AudioTranscript) || { segments: [], language: 'en' };
  }

  async getAudioDuration(schoolId: string, id: string): Promise<number> {
    const audio = await this.findAudioById(schoolId, id);
    if (!audio) throw new LxpAudioNotFoundError(id);
    return ((audio as unknown as Record<string, unknown>).duration as number) || 0;
  }

  async getAudioWaveformData(schoolId: string, id: string): Promise<number[]> {
    const { data } = await this.supabase
      .from('lxp_audio_waveforms').select('data').eq('audio_id', id).eq('school_id', schoolId).single();
    return ((data as unknown as Record<string, unknown>)?.data as number[]) || [];
  }

  async processAudio(schoolId: string, id: string): Promise<void> {
    await this.supabase.from('lxp_audio').update({ status: 'processing' }).eq('id', id).eq('school_id', schoolId);
  }

  async findPopularAudios(schoolId: string, limit: number): Promise<Audio[]> {
    const { data, error } = await this.supabase
      .from('lxp_audio').select('*').eq('school_id', schoolId).order('play_count', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as Audio[];
  }

  async findPDFById(schoolId: string, id: string): Promise<PDF | null> {
    const { data, error } = await this.supabase
      .from('lxp_pdfs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpPDFNotFoundError(id);
    return data as PDF | null;
  }

  async findAllPDFs(schoolId: string, query: PDFQuery): Promise<PaginatedResult<PDF>> {
    let q = this.supabase.from('lxp_pdfs').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.lessonId) q = q.eq('lesson_id', query.lessonId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<PDF>(q, query.page, query.limit);
  }

  async createPDF(schoolId: string, data: PDFCreate): Promise<PDF> {
    const { data: pdf, error } = await this.supabase
      .from('lxp_pdfs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return pdf as PDF;
  }

  async updatePDF(schoolId: string, id: string, data: PDFUpdate): Promise<PDF> {
    const { data: pdf, error } = await this.supabase
      .from('lxp_pdfs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpPDFNotFoundError(id);
    return pdf as PDF;
  }

  async deletePDF(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_pdfs').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpPDFNotFoundError(id);
  }

  async getPDFDownloadUrl(schoolId: string, id: string): Promise<string> {
    const pdf = await this.findPDFById(schoolId, id);
    if (!pdf) throw new LxpPDFNotFoundError(id);
    return (pdf as unknown as Record<string, unknown>).download_url as string;
  }

  async getPDFPreviewUrl(schoolId: string, id: string): Promise<string> {
    const pdf = await this.findPDFById(schoolId, id);
    if (!pdf) throw new LxpPDFNotFoundError(id);
    return (pdf as unknown as Record<string, unknown>).preview_url as string;
  }

  async getPDFTextContent(schoolId: string, id: string): Promise<string> {
    const { data } = await this.supabase
      .from('lxp_pdf_texts').select('content').eq('pdf_id', id).eq('school_id', schoolId).single();
    return ((data as unknown as Record<string, unknown>)?.content as string) || '';
  }

  async getPDFAnnotations(schoolId: string, id: string): Promise<PDFAnnotation[]> {
    const { data, error } = await this.supabase
      .from('lxp_pdf_annotations').select('*').eq('pdf_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as PDFAnnotation[];
  }

  async addPDFAnnotation(schoolId: string, id: string, annotation: PDFAnnotationCreate): Promise<PDFAnnotation> {
    const { data, error } = await this.supabase
      .from('lxp_pdf_annotations').insert({ ...annotation, pdf_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as PDFAnnotation;
  }

  async getPDFPageCount(schoolId: string, id: string): Promise<number> {
    const pdf = await this.findPDFById(schoolId, id);
    if (!pdf) throw new LxpPDFNotFoundError(id);
    return ((pdf as unknown as Record<string, unknown>).page_count as number) || 0;
  }

  async extractPDFText(schoolId: string, id: string): Promise<string> {
    return this.getPDFTextContent(schoolId, id);
  }

  async findSCORMById(schoolId: string, id: string): Promise<SCORM | null> {
    const { data, error } = await this.supabase
      .from('lxp_scorm').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpSCORMNotFoundError(id);
    return data as SCORM | null;
  }

  async findAllSCORMs(schoolId: string, query: SCORMQuery): Promise<PaginatedResult<SCORM>> {
    let q = this.supabase.from('lxp_scorm').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.lessonId) q = q.eq('lesson_id', query.lessonId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<SCORM>(q, query.page, query.limit);
  }

  async createSCORM(schoolId: string, data: SCORMCreate): Promise<SCORM> {
    const { data: scorm, error } = await this.supabase
      .from('lxp_scorm').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return scorm as SCORM;
  }

  async updateSCORM(schoolId: string, id: string, data: Partial<SCORMCreate>): Promise<SCORM> {
    const { data: scorm, error } = await this.supabase
      .from('lxp_scorm').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpSCORMNotFoundError(id);
    return scorm as SCORM;
  }

  async deleteSCORM(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_scorm').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpSCORMNotFoundError(id);
  }

  async getSCORMLaunchUrl(schoolId: string, id: string): Promise<string> {
    const scorm = await this.findSCORMById(schoolId, id);
    if (!scorm) throw new LxpSCORMNotFoundError(id);
    return (scorm as unknown as Record<string, unknown>).launch_url as string;
  }

  async getSCORMManifest(schoolId: string, id: string): Promise<SCORMManifest> {
    const { data, error } = await this.supabase
      .from('lxp_scorm_manifests').select('*').eq('scorm_id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpSCORMNotFoundError(id);
    return data as SCORMManifest;
  }

  async getSCORMStatus(schoolId: string, id: string, studentId: string): Promise<SCORMStatus> {
    const { data } = await this.supabase
      .from('lxp_scorm_progress').select('*').eq('scorm_id', id).eq('student_id', studentId).eq('school_id', schoolId).single();
    return (data as SCORMStatus) || { completionStatus: 'incomplete', successStatus: 'unknown', score: 0, suspendData: '' };
  }

  async getSCORMCompletionData(schoolId: string, id: string, studentId: string): Promise<SCORMCompletionData> {
    const status = await this.getSCORMStatus(schoolId, id, studentId);
    return { completed: status.completionStatus === 'completed', completionThreshold: 0, completionValue: status.completionStatus === 'completed' ? 100 : 0, timestamp: new Date().toISOString() };
  }

  async getSCORMScore(schoolId: string, id: string, studentId: string): Promise<SCORMScore> {
    const status = await this.getSCORMStatus(schoolId, id, studentId);
    return { scaled: status.score / 100, raw: status.score, min: 0, max: 100 };
  }

  async resetSCORMProgress(schoolId: string, id: string, studentId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_scorm_progress').delete().eq('scorm_id', id).eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getSCORMSuspendData(schoolId: string, id: string, studentId: string): Promise<string> {
    const status = await this.getSCORMStatus(schoolId, id, studentId);
    return status.suspendData;
  }

  async processSCORMPackage(schoolId: string, id: string): Promise<void> {
    await this.supabase.from('lxp_scorm').update({ status: 'processing' }).eq('id', id).eq('school_id', schoolId);
  }

  async findXAPIStatementById(schoolId: string, id: string): Promise<XAPIStatement | null> {
    const { data, error } = await this.supabase
      .from('lxp_xapi_statements').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpXAPIError(id);
    return data as XAPIStatement | null;
  }

  async findAllXAPIStatements(schoolId: string, query: XAPIQuery): Promise<PaginatedResult<XAPIStatement>> {
    let q = this.supabase.from('lxp_xapi_statements').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.actorId) q = q.eq('actor_id', query.actorId);
    if (query.verb) q = q.eq('verb', query.verb);
    if (query.objectId) q = q.eq('object_id', query.objectId);
    q = q.order(query.sortBy || 'timestamp', { ascending: false });
    return this.paginate<XAPIStatement>(q, query.page, query.limit);
  }

  async createXAPIStatement(schoolId: string, data: XAPIStatementCreate): Promise<XAPIStatement> {
    const { data: statement, error } = await this.supabase
      .from('lxp_xapi_statements').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return statement as XAPIStatement;
  }

  async findXAPIByActor(schoolId: string, actorId: string): Promise<XAPIStatement[]> {
    const { data, error } = await this.supabase
      .from('lxp_xapi_statements').select('*').eq('actor_id', actorId).eq('school_id', schoolId).order('timestamp', { ascending: false });
    if (error) throw error;
    return (data || []) as XAPIStatement[];
  }

  async findXAPIByVerb(schoolId: string, verb: string): Promise<XAPIStatement[]> {
    const { data, error } = await this.supabase
      .from('lxp_xapi_statements').select('*').eq('verb', verb).eq('school_id', schoolId).order('timestamp', { ascending: false });
    if (error) throw error;
    return (data || []) as XAPIStatement[];
  }

  async findXAPIByObject(schoolId: string, objectId: string): Promise<XAPIStatement[]> {
    const { data, error } = await this.supabase
      .from('lxp_xapi_statements').select('*').eq('object_id', objectId).eq('school_id', schoolId).order('timestamp', { ascending: false });
    if (error) throw error;
    return (data || []) as XAPIStatement[];
  }

  async findXAPIByDateRange(schoolId: string, range: DateRange): Promise<XAPIStatement[]> {
    const { data, error } = await this.supabase
      .from('lxp_xapi_statements').select('*').eq('school_id', schoolId).gte('timestamp', range.start).lte('timestamp', range.end).order('timestamp', { ascending: false });
    if (error) throw error;
    return (data || []) as XAPIStatement[];
  }

  async getXAPIActorProfile(schoolId: string, actorId: string): Promise<ActorProfile> {
    const { count } = await this.supabase
      .from('lxp_xapi_statements').select('*', { count: 'exact', head: true }).eq('actor_id', actorId).eq('school_id', schoolId);
    return { id: actorId, name: '', email: '', statements: count || 0, lastActivity: new Date().toISOString() };
  }

  async getXAPIObjectActivities(schoolId: string, objectId: string): Promise<XAPIActivity[]> {
    const { data } = await this.supabase
      .from('lxp_xapi_statements').select('verb, object_type').eq('object_id', objectId).eq('school_id', schoolId);
    return (data || []).map((d: Record<string, unknown>) => ({ id: objectId, type: d.object_type as string, title: '', statementCount: 0 }));
  }

  async aggregateXAPIScores(schoolId: string, activityId: string): Promise<ScoreAggregate> {
    const { data } = await this.supabase
      .from('lxp_xapi_statements').select('score').eq('object_id', activityId).eq('school_id', schoolId).eq('verb', 'scored');
    const scores = (data || []).map((d: Record<string, unknown>) => (d.score as number) || 0);
    if (scores.length === 0) return { average: 0, median: 0, min: 0, max: 0, count: 0 };
    const sorted = [...scores].sort((a, b) => a - b);
    return { average: scores.reduce((s, v) => s + v, 0) / scores.length, median: sorted[Math.floor(sorted.length / 2)], min: sorted[0], max: sorted[sorted.length - 1], count: scores.length };
  }

  async verifyXAPIIntegrity(schoolId: string, id: string): Promise<boolean> {
    const statement = await this.findXAPIStatementById(schoolId, id);
    return statement !== null;
  }

  async getXAPIStatementCount(schoolId: string, _query: XAPIQuery): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_xapi_statements').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    return count || 0;
  }

  async findH5PById(schoolId: string, id: string): Promise<H5PContent | null> {
    const { data, error } = await this.supabase
      .from('lxp_h5p').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpH5PNotFoundError(id);
    return data as H5PContent | null;
  }

  async findAllH5P(schoolId: string, query: H5PQuery): Promise<PaginatedResult<H5PContent>> {
    let q = this.supabase.from('lxp_h5p').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.lessonId) q = q.eq('lesson_id', query.lessonId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<H5PContent>(q, query.page, query.limit);
  }

  async createH5P(schoolId: string, data: H5PCreate): Promise<H5PContent> {
    const { data: h5p, error } = await this.supabase
      .from('lxp_h5p').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return h5p as H5PContent;
  }

  async updateH5P(schoolId: string, id: string, data: Partial<H5PCreate>): Promise<H5PContent> {
    const { data: h5p, error } = await this.supabase
      .from('lxp_h5p').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpH5PNotFoundError(id);
    return h5p as H5PContent;
  }

  async deleteH5P(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_h5p').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpH5PNotFoundError(id);
  }

  async getH5PEmbedUrl(schoolId: string, id: string): Promise<string> {
    const h5p = await this.findH5PById(schoolId, id);
    if (!h5p) throw new LxpH5PNotFoundError(id);
    return (h5p as unknown as Record<string, unknown>).embed_url as string;
  }

  async getH5PResult(schoolId: string, id: string, studentId: string): Promise<H5PResult> {
    const { data } = await this.supabase
      .from('lxp_h5p_results').select('*').eq('h5p_id', id).eq('student_id', studentId).eq('school_id', schoolId).single();
    return (data as H5PResult) || { score: 0, maxScore: 0, completed: false, answers: {} };
  }

  async getH5PLibraries(schoolId: string): Promise<H5PLibrary[]> {
    const { data, error } = await this.supabase
      .from('lxp_h5p_libraries').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as H5PLibrary[];
  }

  async getH5PContentTypes(schoolId: string): Promise<H5PContentType[]> {
    const { data, error } = await this.supabase
      .from('lxp_h5p_content_types').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as H5PContentType[];
  }

  async validateH5P(_schoolId: string, data: H5PCreate): Promise<boolean> {
    return data.title !== undefined && data.library !== undefined;
  }

  async getH5PParameters(schoolId: string, id: string): Promise<Record<string, unknown>> {
    const h5p = await this.findH5PById(schoolId, id);
    if (!h5p) throw new LxpH5PNotFoundError(id);
    return ((h5p as unknown as Record<string, unknown>).parameters as unknown as Record<string, unknown>) || {};
  }

  async setH5PParameters(schoolId: string, id: string, params: Record<string, unknown>): Promise<void> {
    await this.supabase.from('lxp_h5p').update({ parameters: params }).eq('id', id).eq('school_id', schoolId);
  }

  async findEPUBById(schoolId: string, id: string): Promise<EPUB | null> {
    const { data, error } = await this.supabase
      .from('lxp_epubs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpEPUBNotFoundError(id);
    return data as EPUB | null;
  }

  async findAllEPUBs(schoolId: string, query: EPUBQuery): Promise<PaginatedResult<EPUB>> {
    let q = this.supabase.from('lxp_epubs').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.lessonId) q = q.eq('lesson_id', query.lessonId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<EPUB>(q, query.page, query.limit);
  }

  async createEPUB(schoolId: string, data: EPUBCreate): Promise<EPUB> {
    const { data: epub, error } = await this.supabase
      .from('lxp_epubs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return epub as EPUB;
  }

  async updateEPUB(schoolId: string, id: string, data: Partial<EPUBCreate>): Promise<EPUB> {
    const { data: epub, error } = await this.supabase
      .from('lxp_epubs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpEPUBNotFoundError(id);
    return epub as EPUB;
  }

  async deleteEPUB(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_epubs').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpEPUBNotFoundError(id);
  }

  async getEPUBChapters(schoolId: string, id: string): Promise<EPUBChapter[]> {
    const { data, error } = await this.supabase
      .from('lxp_epub_chapters').select('*').eq('epub_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as EPUBChapter[];
  }

  async getEPUBMetadata(schoolId: string, id: string): Promise<EPUBMetadata> {
    const epub = await this.findEPUBById(schoolId, id);
    if (!epub) throw new LxpEPUBNotFoundError(id);
    const r = epub as unknown as Record<string, unknown>;
    return { title: r.title as string, author: r.author as string, language: r.language as string, publisher: r.publisher as string, description: r.description as string, coverImage: r.cover_image as string };
  }

  async getEPUBTOC(schoolId: string, id: string): Promise<EPUBTOC[]> {
    const { data, error } = await this.supabase
      .from('lxp_epub_toc').select('*').eq('epub_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as EPUBTOC[];
  }

  async getEPUBReadingProgress(schoolId: string, id: string, studentId: string): Promise<EPUBProgress> {
    const { data } = await this.supabase
      .from('lxp_epub_progress').select('*').eq('epub_id', id).eq('student_id', studentId).eq('school_id', schoolId).single();
    return (data as EPUBProgress) || { currentChapter: '', progress: 0, lastRead: '' };
  }

  async updateEPUBReadingProgress(schoolId: string, id: string, studentId: string, progress: EPUBProgressUpdate): Promise<void> {
    await this.supabase.from('lxp_epub_progress').upsert({ epub_id: id, student_id: studentId, school_id: schoolId, ...progress });
  }

  async getEPUBHighlights(schoolId: string, id: string, studentId: string): Promise<EPUBHighlight[]> {
    const { data, error } = await this.supabase
      .from('lxp_epub_highlights').select('*').eq('epub_id', id).eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as EPUBHighlight[];
  }

  async addEPUBHighlight(schoolId: string, id: string, studentId: string, highlight: EPUBHighlightCreate): Promise<EPUBHighlight> {
    const { data, error } = await this.supabase
      .from('lxp_epub_highlights').insert({ ...highlight, epub_id: id, student_id: studentId, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as EPUBHighlight;
  }

  async findOfflineById(schoolId: string, id: string): Promise<OfflineContent | null> {
    const { data, error } = await this.supabase
      .from('lxp_offline_content').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpOfflineNotFoundError(id);
    return data as OfflineContent | null;
  }

  async findAllOffline(schoolId: string, query: OfflineQuery): Promise<PaginatedResult<OfflineContent>> {
    let q = this.supabase.from('lxp_offline_content').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<OfflineContent>(q, query.page, query.limit);
  }

  async createOffline(schoolId: string, data: OfflineCreate): Promise<OfflineContent> {
    const { data: offline, error } = await this.supabase
      .from('lxp_offline_content').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return offline as OfflineContent;
  }

  async updateOffline(schoolId: string, id: string, data: Partial<OfflineCreate>): Promise<OfflineContent> {
    const { data: offline, error } = await this.supabase
      .from('lxp_offline_content').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpOfflineNotFoundError(id);
    return offline as OfflineContent;
  }

  async deleteOffline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_offline_content').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpOfflineNotFoundError(id);
  }

  async findOfflineByStudent(schoolId: string, studentId: string): Promise<OfflineContent[]> {
    const { data, error } = await this.supabase
      .from('lxp_offline_content').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as OfflineContent[];
  }

  async syncOffline(schoolId: string, id: string): Promise<void> {
    await this.supabase.from('lxp_offline_content').update({ last_synced: new Date().toISOString(), sync_status: 'synced' }).eq('id', id).eq('school_id', schoolId);
  }

  async getOfflineSyncStatus(schoolId: string, id: string): Promise<OfflineSyncStatus> {
    const offline = await this.findOfflineById(schoolId, id);
    if (!offline) throw new LxpOfflineNotFoundError(id);
    const r = offline as unknown as Record<string, unknown>;
    return { synced: r.sync_status === 'synced', lastSynced: r.last_synced as string | null, pendingChanges: (r.pending_changes as number) || 0, error: r.sync_error as string | null };
  }

  async downloadForOffline(schoolId: string, id: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_offline_content').upsert({ content_id: id, student_id: studentId, school_id: schoolId, downloaded_at: new Date().toISOString() });
  }

  async getDownloadedContent(schoolId: string, studentId: string): Promise<OfflineContent[]> {
    return this.findOfflineByStudent(schoolId, studentId);
  }

  async removeOffline(schoolId: string, id: string, studentId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_offline_content').delete().eq('content_id', id).eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getOfflineStorageUsage(schoolId: string, studentId: string): Promise<OfflineStorageUsage> {
    const { data } = await this.supabase
      .from('lxp_offline_storage').select('total_size').eq('student_id', studentId).eq('school_id', schoolId).single();
    const used = ((data as unknown as Record<string, unknown>)?.total_size as number) || 0;
    return { totalSize: 1073741824, usedSize: used, availableSize: 1073741824 - used };
  }

  async findLearningPathById(schoolId: string, id: string): Promise<LearningPath | null> {
    const { data, error } = await this.supabase
      .from('lxp_learning_paths').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpLearningPathNotFoundError(id);
    return data as LearningPath | null;
  }

  async findAllLearningPaths(schoolId: string, query: LearningPathQuery): Promise<PaginatedResult<LearningPath>> {
    let q = this.supabase.from('lxp_learning_paths').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<LearningPath>(q, query.page, query.limit);
  }

  async createLearningPath(schoolId: string, data: LearningPathCreate): Promise<LearningPath> {
    const { data: path, error } = await this.supabase
      .from('lxp_learning_paths').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return path as LearningPath;
  }

  async updateLearningPath(schoolId: string, id: string, data: LearningPathUpdate): Promise<LearningPath> {
    const { data: path, error } = await this.supabase
      .from('lxp_learning_paths').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLearningPathNotFoundError(id);
    return path as LearningPath;
  }

  async deleteLearningPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_learning_paths').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpLearningPathNotFoundError(id);
  }

  async findLearningPathsByStudent(schoolId: string, studentId: string): Promise<LearningPath[]> {
    const { data, error } = await this.supabase
      .from('lxp_learning_paths').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as LearningPath[];
  }

  async getLearningPathCourses(schoolId: string, id: string): Promise<Course[]> {
    const { data, error } = await this.supabase
      .from('lxp_learning_path_courses').select('lxp_courses(*)').eq('learning_path_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []).map((r: Record<string, unknown>) => r.lxp_courses as Course).filter(Boolean);
  }

  async addCourseToLearningPath(schoolId: string, id: string, courseId: string): Promise<void> {
    const { count } = await this.supabase
      .from('lxp_learning_path_courses').select('*', { count: 'exact', head: true }).eq('learning_path_id', id);
    await this.supabase.from('lxp_learning_path_courses').insert({ learning_path_id: id, course_id: courseId, school_id: schoolId, order: (count || 0) + 1 });
  }

  async removeCourseFromLearningPath(schoolId: string, id: string, courseId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_learning_path_courses').delete().eq('learning_path_id', id).eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async reorderLearningPathCourses(schoolId: string, id: string, courseIds: string[]): Promise<void> {
    for (let i = 0; i < courseIds.length; i++) {
      await this.supabase.from('lxp_learning_path_courses').update({ order: i + 1 })
        .eq('learning_path_id', id).eq('course_id', courseIds[i]).eq('school_id', schoolId);
    }
  }

  async getLearningPathProgress(schoolId: string, id: string, studentId: string): Promise<LearningPathProgress> {
    const courses = await this.getLearningPathCourses(schoolId, id);
    const { data: completions } = await this.supabase
      .from('lxp_enrollments').select('course_id').eq('learning_path_id', id).eq('student_id', studentId).eq('school_id', schoolId).eq('completed', true);
    const completed = completions?.length || 0;
    return { completedCourses: completed, totalCourses: courses.length, progress: courses.length > 0 ? (completed / courses.length) * 100 : 0, currentCourseId: null };
  }

  async enrollInLearningPath(schoolId: string, id: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_learning_path_enrollments').insert({ learning_path_id: id, student_id: studentId, school_id: schoolId });
  }

  async getLearningPathEnrolledStudents(schoolId: string, id: string): Promise<string[]> {
    const { data } = await this.supabase
      .from('lxp_learning_path_enrollments').select('student_id').eq('learning_path_id', id).eq('school_id', schoolId);
    return (data || []).map((d: Record<string, unknown>) => d.student_id as string);
  }

  async getLearningPathCompletionRate(schoolId: string, id: string): Promise<number> {
    const enrolled = await this.getLearningPathEnrolledStudents(schoolId, id);
    const { count } = await this.supabase
      .from('lxp_learning_path_enrollments').select('*', { count: 'exact', head: true }).eq('learning_path_id', id).eq('school_id', schoolId).eq('completed', true);
    return enrolled.length > 0 ? ((count || 0) / enrolled.length) * 100 : 0;
  }

  async getLearningPathPrerequisites(schoolId: string, id: string): Promise<LearningPathPrerequisite[]> {
    const { data } = await this.supabase
      .from('lxp_learning_path_prerequisites').select('*').eq('learning_path_id', id).eq('school_id', schoolId);
    return (data || []) as LearningPathPrerequisite[];
  }

  async publishLearningPath(schoolId: string, id: string): Promise<LearningPath> {
    const { data, error } = await this.supabase
      .from('lxp_learning_paths').update({ status: 'published' }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLearningPathNotFoundError(id);
    return data as LearningPath;
  }

  async archiveLearningPath(schoolId: string, id: string): Promise<LearningPath> {
    const { data, error } = await this.supabase
      .from('lxp_learning_paths').update({ status: 'archived' }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLearningPathNotFoundError(id);
    return data as LearningPath;
  }

  async findAdaptivePathById(schoolId: string, id: string): Promise<AdaptivePath | null> {
    const { data, error } = await this.supabase
      .from('lxp_adaptive_paths').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpAdaptivePathNotFoundError(id);
    return data as AdaptivePath | null;
  }

  async findAllAdaptivePaths(schoolId: string, query: AdaptivePathQuery): Promise<PaginatedResult<AdaptivePath>> {
    let q = this.supabase.from('lxp_adaptive_paths').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<AdaptivePath>(q, query.page, query.limit);
  }

  async createAdaptivePath(schoolId: string, data: AdaptivePathCreate): Promise<AdaptivePath> {
    const { data: path, error } = await this.supabase
      .from('lxp_adaptive_paths').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return path as AdaptivePath;
  }

  async updateAdaptivePath(schoolId: string, id: string, data: Partial<AdaptivePathCreate>): Promise<AdaptivePath> {
    const { data: path, error } = await this.supabase
      .from('lxp_adaptive_paths').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpAdaptivePathNotFoundError(id);
    return path as AdaptivePath;
  }

  async deleteAdaptivePath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_adaptive_paths').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpAdaptivePathNotFoundError(id);
  }

  async getAdaptivePathRules(schoolId: string, id: string): Promise<AdaptiveRule[]> {
    const { data, error } = await this.supabase
      .from('lxp_adaptive_rules').select('*').eq('adaptive_path_id', id).eq('school_id', schoolId).order('priority');
    if (error) throw error;
    return (data || []) as AdaptiveRule[];
  }

  async addAdaptiveRule(schoolId: string, id: string, rule: AdaptiveRuleCreate): Promise<AdaptiveRule> {
    const { data, error } = await this.supabase
      .from('lxp_adaptive_rules').insert({ ...rule, adaptive_path_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as AdaptiveRule;
  }

  async evaluateAdaptivePath(schoolId: string, id: string, _studentId: string): Promise<AdaptiveDecision> {
    await this.findAdaptivePathById(schoolId, id);
    return { nextCourseId: null, reason: 'Evaluation complete', confidence: 1.0 };
  }

  async getAdaptiveRecommendations(schoolId: string, id: string, _studentId: string): Promise<Course[]> {
    await this.findAdaptivePathById(schoolId, id);
    return [];
  }

  async getAdaptiveStudentPath(schoolId: string, id: string, _studentId: string): Promise<AdaptiveStudentPath> {
    await this.findAdaptivePathById(schoolId, id);
    return { completed: [], current: '', recommended: [], skipped: [] };
  }

  async updateAdaptiveProgress(schoolId: string, id: string, studentId: string, progress: AdaptiveProgressUpdate): Promise<void> {
    await this.supabase.from('lxp_adaptive_progress').upsert({ adaptive_path_id: id, student_id: studentId, school_id: schoolId, ...progress });
  }

  async getAdaptiveAnalytics(schoolId: string, id: string): Promise<AdaptiveAnalytics> {
    await this.findAdaptivePathById(schoolId, id);
    return { completionRate: 0, averageScore: 0, pathEfficiency: 0, adaptationCount: 0 };
  }

  async findCompetencyPathById(schoolId: string, id: string): Promise<CompetencyPath | null> {
    const { data, error } = await this.supabase
      .from('lxp_competency_paths').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpCompetencyPathNotFoundError(id);
    return data as CompetencyPath | null;
  }

  async findAllCompetencyPaths(schoolId: string, query: CompetencyPathQuery): Promise<PaginatedResult<CompetencyPath>> {
    let q = this.supabase.from('lxp_competency_paths').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<CompetencyPath>(q, query.page, query.limit);
  }

  async createCompetencyPath(schoolId: string, data: CompetencyPathCreate): Promise<CompetencyPath> {
    const { data: path, error } = await this.supabase
      .from('lxp_competency_paths').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return path as CompetencyPath;
  }

  async updateCompetencyPath(schoolId: string, id: string, data: Partial<CompetencyPathCreate>): Promise<CompetencyPath> {
    const { data: path, error } = await this.supabase
      .from('lxp_competency_paths').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpCompetencyPathNotFoundError(id);
    return path as CompetencyPath;
  }

  async deleteCompetencyPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_competency_paths').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpCompetencyPathNotFoundError(id);
  }

  async getCompetencyPathCompetencies(schoolId: string, id: string): Promise<Competency[]> {
    const { data, error } = await this.supabase
      .from('lxp_competency_path_items').select('lxp_competencies(*)').eq('competency_path_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []).map((r: Record<string, unknown>) => r.lxp_competencies as Competency).filter(Boolean);
  }

  async addCompetencyToPath(schoolId: string, id: string, competencyId: string): Promise<void> {
    await this.supabase.from('lxp_competency_path_items').insert({ competency_path_id: id, competency_id: competencyId, school_id: schoolId });
  }

  async removeCompetencyFromPath(schoolId: string, id: string, competencyId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_competency_path_items').delete().eq('competency_path_id', id).eq('competency_id', competencyId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getCompetencyPathStudentProgress(schoolId: string, id: string, _studentId: string): Promise<CompetencyPathProgress> {
    const competencies = await this.getCompetencyPathCompetencies(schoolId, id);
    return { completedCompetencies: 0, totalCompetencies: competencies.length, progress: 0, masteryLevels: {} };
  }

  async assessCompetencyInPath(schoolId: string, id: string, competencyId: string, studentId: string, score: number): Promise<void> {
    await this.supabase.from('lxp_competency_assessments').insert({ competency_id: competencyId, student_id: studentId, school_id: schoolId, score, path_id: id });
  }

  async getCompetencyPathMasteryLevels(schoolId: string, id: string): Promise<MasteryLevel[]> {
    const { data } = await this.supabase
      .from('lxp_mastery_levels').select('*').eq('competency_path_id', id).eq('school_id', schoolId);
    return (data || []) as MasteryLevel[];
  }

  async findAssignmentById(schoolId: string, id: string): Promise<Assignment | null> {
    const { data, error } = await this.supabase
      .from('lxp_assignments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpAssignmentNotFoundError(id);
    return data as Assignment | null;
  }

  async findAllAssignments(schoolId: string, query: AssignmentQuery): Promise<PaginatedResult<Assignment>> {
    let q = this.supabase.from('lxp_assignments').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.moduleId) q = q.eq('module_id', query.moduleId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Assignment>(q, query.page, query.limit);
  }

  async createAssignment(schoolId: string, data: AssignmentCreate): Promise<Assignment> {
    const { data: assignment, error } = await this.supabase
      .from('lxp_assignments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return assignment as Assignment;
  }

  async updateAssignment(schoolId: string, id: string, data: AssignmentUpdate): Promise<Assignment> {
    const { data: assignment, error } = await this.supabase
      .from('lxp_assignments').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpAssignmentNotFoundError(id);
    return assignment as Assignment;
  }

  async deleteAssignment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_assignments').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpAssignmentNotFoundError(id);
  }

  async findAssignmentsByCourse(schoolId: string, courseId: string): Promise<Assignment[]> {
    const { data, error } = await this.supabase
      .from('lxp_assignments').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Assignment[];
  }

  async findAssignmentsByModule(schoolId: string, moduleId: string): Promise<Assignment[]> {
    const { data, error } = await this.supabase
      .from('lxp_assignments').select('*').eq('module_id', moduleId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Assignment[];
  }

  async getAssignmentSubmissions(schoolId: string, id: string): Promise<Submission[]> {
    const { data, error } = await this.supabase
      .from('lxp_submissions').select('*').eq('assignment_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Submission[];
  }

  async getAssignmentSubmissionCount(schoolId: string, id: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_submissions').select('*', { count: 'exact', head: true }).eq('assignment_id', id).eq('school_id', schoolId);
    return count || 0;
  }

  async getAssignmentAverageScore(schoolId: string, id: string): Promise<number> {
    const { data } = await this.supabase
      .from('lxp_submissions').select('score').eq('assignment_id', id).eq('school_id', schoolId).not('score', 'is', null);
    const scores = (data || []).map((d: Record<string, unknown>) => (d.score as number) || 0);
    return scores.length > 0 ? scores.reduce((s, v) => s + v, 0) / scores.length : 0;
  }

  async publishAssignment(schoolId: string, id: string): Promise<Assignment> {
    return this.updateAssignment(schoolId, id, { status: 'published' } as AssignmentUpdate);
  }

  async archiveAssignment(schoolId: string, id: string): Promise<Assignment> {
    return this.updateAssignment(schoolId, id, { status: 'archived' } as AssignmentUpdate);
  }

  async getAssignmentRubric(schoolId: string, id: string): Promise<Rubric | null> {
    const assignment = await this.findAssignmentById(schoolId, id);
    if (!assignment) throw new LxpAssignmentNotFoundError(id);
    const rubricId = (assignment as unknown as Record<string, unknown>).rubric_id as string | null;
    if (!rubricId) return null;
    return this.findRubricById(schoolId, rubricId);
  }

  async setAssignmentRubric(schoolId: string, id: string, rubricId: string): Promise<void> {
    await this.supabase.from('lxp_assignments').update({ rubric_id: rubricId }).eq('id', id).eq('school_id', schoolId);
  }

  async getAssignmentDueDates(schoolId: string, id: string): Promise<Array<Record<string, unknown>>> {
    const assignment = await this.findAssignmentById(schoolId, id);
    if (!assignment) throw new LxpAssignmentNotFoundError(id);
    return ((assignment as unknown as Record<string, unknown>).due_dates as Array<Record<string, unknown>>) || [];
  }

  async extendAssignmentDeadline(schoolId: string, id: string, studentId: string, newDeadline: string): Promise<void> {
    await this.supabase.from('lxp_assignment_extensions').insert({ assignment_id: id, student_id: studentId, school_id: schoolId, new_deadline: newDeadline });
  }

  async getAssignmentStatistics(schoolId: string, id: string): Promise<Record<string, number>> {
    const count = await this.getAssignmentSubmissionCount(schoolId, id);
    const avg = await this.getAssignmentAverageScore(schoolId, id);
    return { submissionCount: count, averageScore: avg };
  }

  async findUpcomingAssignments(schoolId: string, limit: number): Promise<Assignment[]> {
    const { data, error } = await this.supabase
      .from('lxp_assignments').select('*').eq('school_id', schoolId).eq('status', 'published')
      .gte('due_date', new Date().toISOString()).order('due_date', { ascending: true }).limit(limit);
    if (error) throw error;
    return (data || []) as Assignment[];
  }

  async findHomeworkById(schoolId: string, id: string): Promise<Homework | null> {
    const { data, error } = await this.supabase
      .from('lxp_homework').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpHomeworkNotFoundError(id);
    return data as Homework | null;
  }

  async findAllHomework(schoolId: string, query: HomeworkQuery): Promise<PaginatedResult<Homework>> {
    let q = this.supabase.from('lxp_homework').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Homework>(q, query.page, query.limit);
  }

  async createHomework(schoolId: string, data: HomeworkCreate): Promise<Homework> {
    const { data: hw, error } = await this.supabase
      .from('lxp_homework').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return hw as Homework;
  }

  async updateHomework(schoolId: string, id: string, data: HomeworkUpdate): Promise<Homework> {
    const { data: hw, error } = await this.supabase
      .from('lxp_homework').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpHomeworkNotFoundError(id);
    return hw as Homework;
  }

  async deleteHomework(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_homework').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpHomeworkNotFoundError(id);
  }

  async findHomeworkByCourse(schoolId: string, courseId: string): Promise<Homework[]> {
    const { data, error } = await this.supabase
      .from('lxp_homework').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Homework[];
  }

  async getHomeworkSubmissions(schoolId: string, id: string): Promise<Submission[]> {
    const { data, error } = await this.supabase
      .from('lxp_submissions').select('*').eq('homework_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Submission[];
  }

  async gradeHomework(schoolId: string, id: string, submissionId: string, score: number, feedback: string): Promise<void> {
    await this.supabase.from('lxp_submissions').update({ score, feedback, graded_at: new Date().toISOString() })
      .eq('id', submissionId).eq('homework_id', id).eq('school_id', schoolId);
  }

  async getHomeworkAverageScore(schoolId: string, id: string): Promise<number> {
    const { data } = await this.supabase
      .from('lxp_submissions').select('score').eq('homework_id', id).eq('school_id', schoolId).not('score', 'is', null);
    const scores = (data || []).map((d: Record<string, unknown>) => (d.score as number) || 0);
    return scores.length > 0 ? scores.reduce((s, v) => s + v, 0) / scores.length : 0;
  }

  async getHomeworkDueDate(schoolId: string, id: string): Promise<string> {
    const hw = await this.findHomeworkById(schoolId, id);
    if (!hw) throw new LxpHomeworkNotFoundError(id);
    return (hw as unknown as Record<string, unknown>).due_date as string;
  }

  async allowHomeworkLateSubmission(schoolId: string, id: string, penaltyPercent: number): Promise<void> {
    await this.supabase.from('lxp_homework').update({ allow_late: true, late_penalty: penaltyPercent }).eq('id', id).eq('school_id', schoolId);
  }

  async findProjectById(schoolId: string, id: string): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('lxp_projects').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpProjectNotFoundError(id);
    return data as Project | null;
  }

  async findAllProjects(schoolId: string, query: ProjectQuery): Promise<PaginatedResult<Project>> {
    let q = this.supabase.from('lxp_projects').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Project>(q, query.page, query.limit);
  }

  async createProject(schoolId: string, data: ProjectCreate): Promise<Project> {
    const { data: project, error } = await this.supabase
      .from('lxp_projects').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return project as Project;
  }

  async updateProject(schoolId: string, id: string, data: ProjectUpdate): Promise<Project> {
    const { data: project, error } = await this.supabase
      .from('lxp_projects').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpProjectNotFoundError(id);
    return project as Project;
  }

  async deleteProject(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_projects').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpProjectNotFoundError(id);
  }

  async findProjectsByCourse(schoolId: string, courseId: string): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('lxp_projects').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Project[];
  }

  async getProjectDeliverables(schoolId: string, id: string): Promise<Deliverable[]> {
    const { data, error } = await this.supabase
      .from('lxp_deliverables').select('*').eq('project_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Deliverable[];
  }

  async addProjectDeliverable(schoolId: string, id: string, deliverable: DeliverableCreate): Promise<Deliverable> {
    const { data, error } = await this.supabase
      .from('lxp_deliverables').insert({ ...deliverable, project_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as Deliverable;
  }

  async getProjectTeam(schoolId: string, id: string): Promise<ProjectTeam> {
    const { data } = await this.supabase
      .from('lxp_project_teams').select('*').eq('project_id', id).eq('school_id', schoolId).single();
    return (data as ProjectTeam) || { id: '', members: [], leaderId: '' };
  }

  async assignProjectTeam(schoolId: string, id: string, studentIds: string[]): Promise<void> {
    for (const studentId of studentIds) {
      await this.supabase.from('lxp_project_team_members').insert({ project_id: id, student_id: studentId, school_id: schoolId });
    }
  }

  async getProjectRubric(schoolId: string, id: string): Promise<Rubric | null> {
    const project = await this.findProjectById(schoolId, id);
    if (!project) throw new LxpProjectNotFoundError(id);
    const rubricId = (project as unknown as Record<string, unknown>).rubric_id as string | null;
    if (!rubricId) return null;
    return this.findRubricById(schoolId, rubricId);
  }

  async setProjectRubric(schoolId: string, id: string, rubricId: string): Promise<void> {
    await this.supabase.from('lxp_projects').update({ rubric_id: rubricId }).eq('id', id).eq('school_id', schoolId);
  }

  async getProjectProgress(schoolId: string, id: string): Promise<ProjectProgress> {
    const deliverables = await this.getProjectDeliverables(schoolId, id);
    const completed = deliverables.filter((d) => d.status === 'completed').length;
    return { completedDeliverables: completed, totalDeliverables: deliverables.length, progress: deliverables.length > 0 ? (completed / deliverables.length) * 100 : 0, status: 'in_progress' };
  }

  async getProjectMilestones(schoolId: string, id: string): Promise<Milestone[]> {
    const { data, error } = await this.supabase
      .from('lxp_project_milestones').select('*').eq('project_id', id).eq('school_id', schoolId).order('due_date');
    if (error) throw error;
    return (data || []) as Milestone[];
  }

  async findRubricById(schoolId: string, id: string): Promise<Rubric | null> {
    const { data, error } = await this.supabase
      .from('lxp_rubrics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpRubricNotFoundError(id);
    return data as Rubric | null;
  }

  async findAllRubrics(schoolId: string, query: RubricQuery): Promise<PaginatedResult<Rubric>> {
    let q = this.supabase.from('lxp_rubrics').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Rubric>(q, query.page, query.limit);
  }

  async createRubric(schoolId: string, data: RubricCreate): Promise<Rubric> {
    const { data: rubric, error } = await this.supabase
      .from('lxp_rubrics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return rubric as Rubric;
  }

  async updateRubric(schoolId: string, id: string, data: RubricUpdate): Promise<Rubric> {
    const { data: rubric, error } = await this.supabase
      .from('lxp_rubrics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpRubricNotFoundError(id);
    return rubric as Rubric;
  }

  async deleteRubric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_rubrics').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpRubricNotFoundError(id);
  }

  async findRubricsByCourse(schoolId: string, courseId: string): Promise<Rubric[]> {
    const { data, error } = await this.supabase
      .from('lxp_rubrics').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Rubric[];
  }

  async findRubricByAssignment(schoolId: string, assignmentId: string): Promise<Rubric | null> {
    const assignment = await this.findAssignmentById(schoolId, assignmentId);
    if (!assignment) return null;
    const rubricId = (assignment as unknown as Record<string, unknown>).rubric_id as string | null;
    if (!rubricId) return null;
    return this.findRubricById(schoolId, rubricId);
  }

  async cloneRubric(schoolId: string, id: string, newTitle: string): Promise<Rubric> {
    const original = await this.findRubricById(schoolId, id);
    if (!original) throw new LxpRubricNotFoundError(id);
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as unknown as Record<string, unknown>;
    return this.createRubric(schoolId, { ...rest, title: newTitle } as RubricCreate);
  }

  async getRubricCriteria(schoolId: string, id: string): Promise<RubricCriterion[]> {
    const { data, error } = await this.supabase
      .from('lxp_rubric_criteria').select('*').eq('rubric_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as RubricCriterion[];
  }

  async addRubricCriterion(schoolId: string, id: string, criterion: RubricCriterionCreate): Promise<RubricCriterion> {
    const { data, error } = await this.supabase
      .from('lxp_rubric_criteria').insert({ ...criterion, rubric_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as RubricCriterion;
  }

  async calculateRubricScore(schoolId: string, id: string, scores: RubricScoreInput[]): Promise<RubricScoreResult> {
    const criteria = await this.getRubricCriteria(schoolId, id);
    let totalScore = 0;
    let maxScore = 0;
    const criterionScores: Record<string, number> = {};
    for (const score of scores) {
      const criterion = criteria.find((c) => c.id === score.criterionId);
      if (criterion) {
        const level = ((criterion as unknown as Record<string, unknown>).levels as Array<Record<string, unknown>>)?.find((l) => l.id === score.levelId);
        if (level) {
          const scoreValue = (level.score as number) || 0;
          totalScore += scoreValue * ((criterion.weight as number) || 1);
          maxScore += 100 * ((criterion.weight as number) || 1);
          criterionScores[score.criterionId] = scoreValue;
        }
      }
    }
    return { totalScore: maxScore > 0 ? (totalScore / maxScore) * 100 : 0, maxScore: 100, percentage: maxScore > 0 ? (totalScore / maxScore) * 100 : 0, criterionScores };
  }

  async getRubricAvgScoresByCriterion(schoolId: string, id: string): Promise<Record<string, number>> {
    const { data } = await this.supabase
      .from('lxp_rubric_scores').select('criterion_id, score').eq('rubric_id', id).eq('school_id', schoolId);
    const grouped: Record<string, number[]> = {};
    for (const row of (data || []) as Array<Record<string, unknown>>) {
      const cid = row.criterion_id as string;
      if (!grouped[cid]) grouped[cid] = [];
      grouped[cid].push((row.score as number) || 0);
    }
    const result: Record<string, number> = {};
    for (const [key, values] of Object.entries(grouped)) {
      result[key] = values.reduce((s, v) => s + v, 0) / values.length;
    }
    return result;
  }

  async findPeerReviewById(schoolId: string, id: string): Promise<PeerReview | null> {
    const { data, error } = await this.supabase
      .from('lxp_peer_reviews').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpPeerReviewNotFoundError(id);
    return data as PeerReview | null;
  }

  async findAllPeerReviews(schoolId: string, query: PeerReviewQuery): Promise<PaginatedResult<PeerReview>> {
    let q = this.supabase.from('lxp_peer_reviews').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.assignmentId) q = q.eq('assignment_id', query.assignmentId);
    if (query.reviewerId) q = q.eq('reviewer_id', query.reviewerId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<PeerReview>(q, query.page, query.limit);
  }

  async createPeerReview(schoolId: string, data: PeerReviewCreate): Promise<PeerReview> {
    const { data: review, error } = await this.supabase
      .from('lxp_peer_reviews').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return review as PeerReview;
  }

  async updatePeerReview(schoolId: string, id: string, data: Partial<PeerReviewCreate>): Promise<PeerReview> {
    const { data: review, error } = await this.supabase
      .from('lxp_peer_reviews').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpPeerReviewNotFoundError(id);
    return review as PeerReview;
  }

  async deletePeerReview(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_peer_reviews').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpPeerReviewNotFoundError(id);
  }

  async findPeerReviewsByAssignment(schoolId: string, assignmentId: string): Promise<PeerReview[]> {
    const { data, error } = await this.supabase
      .from('lxp_peer_reviews').select('*').eq('assignment_id', assignmentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as PeerReview[];
  }

  async findPeerReviewsByReviewer(schoolId: string, reviewerId: string): Promise<PeerReview[]> {
    const { data, error } = await this.supabase
      .from('lxp_peer_reviews').select('*').eq('reviewer_id', reviewerId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as PeerReview[];
  }

  async findPeerReviewsByReviewee(schoolId: string, revieweeId: string): Promise<PeerReview[]> {
    const { data, error } = await this.supabase
      .from('lxp_peer_reviews').select('*').eq('reviewee_id', revieweeId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as PeerReview[];
  }

  async assignPeerReview(schoolId: string, assignmentId: string, reviewerId: string, revieweeId: string): Promise<PeerReview> {
    return this.createPeerReview(schoolId, { assignment_id: assignmentId, reviewer_id: reviewerId, reviewee_id: revieweeId } as PeerReviewCreate);
  }

  async submitPeerReview(schoolId: string, id: string, review: PeerReviewSubmission): Promise<void> {
    await this.supabase.from('lxp_peer_reviews').update({ ...review, status: 'submitted', submitted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
  }

  async getPeerReviewCompletedCount(schoolId: string, assignmentId: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_peer_reviews').select('*', { count: 'exact', head: true }).eq('assignment_id', assignmentId).eq('school_id', schoolId).eq('status', 'submitted');
    return count || 0;
  }

  async getPeerReviewAnonymous(schoolId: string, id: string): Promise<PeerReviewAnonymous> {
    const review = await this.findPeerReviewById(schoolId, id);
    if (!review) throw new LxpPeerReviewNotFoundError(id);
    const r = review as unknown as Record<string, unknown>;
    return { reviewerId: r.reviewer_id as string, rating: (r.rating as number) || 0, feedback: (r.feedback as string) || '' };
  }

  async findGroupAssignmentById(schoolId: string, id: string): Promise<GroupAssignment | null> {
    const { data, error } = await this.supabase
      .from('lxp_group_assignments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpGroupAssignmentNotFoundError(id);
    return data as GroupAssignment | null;
  }

  async findAllGroupAssignments(schoolId: string, query: GroupAssignmentQuery): Promise<PaginatedResult<GroupAssignment>> {
    let q = this.supabase.from('lxp_group_assignments').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<GroupAssignment>(q, query.page, query.limit);
  }

  async createGroupAssignment(schoolId: string, data: GroupAssignmentCreate): Promise<GroupAssignment> {
    const { data: ga, error } = await this.supabase
      .from('lxp_group_assignments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return ga as GroupAssignment;
  }

  async updateGroupAssignment(schoolId: string, id: string, data: Partial<GroupAssignmentCreate>): Promise<GroupAssignment> {
    const { data: ga, error } = await this.supabase
      .from('lxp_group_assignments').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpGroupAssignmentNotFoundError(id);
    return ga as GroupAssignment;
  }

  async deleteGroupAssignment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_group_assignments').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpGroupAssignmentNotFoundError(id);
  }

  async findGroupAssignmentsByCourse(schoolId: string, courseId: string): Promise<GroupAssignment[]> {
    const { data, error } = await this.supabase
      .from('lxp_group_assignments').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as GroupAssignment[];
  }

  async getGroupAssignmentGroups(schoolId: string, id: string): Promise<GroupAssignmentGroup[]> {
    const { data, error } = await this.supabase
      .from('lxp_group_assignment_groups').select('*').eq('group_assignment_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as GroupAssignmentGroup[];
  }

  async assignGroupToGroupAssignment(schoolId: string, id: string, groupId: string, studentIds: string[]): Promise<void> {
    for (const studentId of studentIds) {
      await this.supabase.from('lxp_group_assignment_members').insert({ group_assignment_id: id, group_id: groupId, student_id: studentId, school_id: schoolId });
    }
  }

  async getGroupAssignmentGroupGrade(schoolId: string, id: string, groupId: string): Promise<GroupGrade> {
    const { data } = await this.supabase
      .from('lxp_group_grades').select('*').eq('group_assignment_id', id).eq('group_id', groupId).eq('school_id', schoolId);
    const grades = (data || []) as Array<Record<string, unknown>>;
    const scores = grades.map((g) => (g.score as number) || 0);
    const average = scores.length > 0 ? scores.reduce((s, v) => s + v, 0) / scores.length : 0;
    return { averageScore: average, individualGrades: {} };
  }

  async getGroupAssignmentPeerEvaluation(schoolId: string, id: string, groupId: string): Promise<PeerEvaluation[]> {
    const { data, error } = await this.supabase
      .from('lxp_peer_evaluations').select('*').eq('group_assignment_id', id).eq('group_id', groupId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as PeerEvaluation[];
  }

  async submitGroupAssignmentPeerEvaluation(schoolId: string, id: string, groupId: string, evaluation: PeerEvaluationCreate): Promise<void> {
    await this.supabase.from('lxp_peer_evaluations').insert({ ...evaluation, group_assignment_id: id, group_id: groupId, school_id: schoolId });
  }

  async findSubmissionById(schoolId: string, id: string): Promise<Submission | null> {
    const { data, error } = await this.supabase
      .from('lxp_submissions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpSubmissionNotFoundError(id);
    return data as Submission | null;
  }

  async findAllSubmissions(schoolId: string, query: SubmissionQuery): Promise<PaginatedResult<Submission>> {
    let q = this.supabase.from('lxp_submissions').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.assignmentId) q = q.eq('assignment_id', query.assignmentId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    q = q.order(query.sortBy || 'submitted_at', { ascending: false });
    return this.paginate<Submission>(q, query.page, query.limit);
  }

  async createSubmission(schoolId: string, data: SubmissionCreate): Promise<Submission> {
    const { data: submission, error } = await this.supabase
      .from('lxp_submissions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return submission as Submission;
  }

  async updateSubmission(schoolId: string, id: string, data: SubmissionUpdate): Promise<Submission> {
    const { data: submission, error } = await this.supabase
      .from('lxp_submissions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpSubmissionNotFoundError(id);
    return submission as Submission;
  }

  async deleteSubmission(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_submissions').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpSubmissionNotFoundError(id);
  }

  async findSubmissionsByAssignment(schoolId: string, assignmentId: string): Promise<Submission[]> {
    const { data, error } = await this.supabase
      .from('lxp_submissions').select('*').eq('assignment_id', assignmentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Submission[];
  }

  async findSubmissionsByStudent(schoolId: string, studentId: string): Promise<Submission[]> {
    const { data, error } = await this.supabase
      .from('lxp_submissions').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Submission[];
  }

  async getLatestSubmissionByStudent(schoolId: string, assignmentId: string, studentId: string): Promise<Submission | null> {
    const { data, error } = await this.supabase
      .from('lxp_submissions').select('*').eq('assignment_id', assignmentId).eq('student_id', studentId).eq('school_id', schoolId)
      .order('submitted_at', { ascending: false }).limit(1).single();
    if (error) return null;
    return data as Submission | null;
  }

  async gradeSubmission(schoolId: string, id: string, grade: SubmissionGrade): Promise<void> {
    await this.supabase.from('lxp_submissions').update({ score: grade.score, feedback: grade.feedback, graded_by: grade.gradedBy, graded_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
  }

  async addSubmissionFeedback(schoolId: string, id: string, feedback: SubmissionFeedback): Promise<void> {
    await this.supabase.from('lxp_submission_feedback').insert({ submission_id: id, ...feedback, school_id: schoolId });
  }

  async getSubmissionAttachments(schoolId: string, id: string): Promise<SubmissionAttachment[]> {
    const { data, error } = await this.supabase
      .from('lxp_submission_attachments').select('*').eq('submission_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as SubmissionAttachment[];
  }

  async addSubmissionAttachment(schoolId: string, id: string, attachment: SubmissionAttachmentCreate): Promise<SubmissionAttachment> {
    const { data, error } = await this.supabase
      .from('lxp_submission_attachments').insert({ ...attachment, submission_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as SubmissionAttachment;
  }

  async resubmitSubmission(schoolId: string, id: string, data: SubmissionCreate): Promise<Submission> {
    await this.supabase.from('lxp_submissions').update({ status: 'resubmitted' }).eq('id', id).eq('school_id', schoolId);
    return this.createSubmission(schoolId, data);
  }

  async getSubmissionGradeHistory(schoolId: string, id: string): Promise<GradeHistory[]> {
    const { data, error } = await this.supabase
      .from('lxp_submission_grade_history').select('*').eq('submission_id', id).eq('school_id', schoolId).order('graded_at', { ascending: false });
    if (error) throw error;
    return (data || []) as GradeHistory[];
  }

  async getUngradedSubmissionCount(schoolId: string, assignmentId: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_submissions').select('*', { count: 'exact', head: true }).eq('assignment_id', assignmentId).eq('school_id', schoolId).is('score', null);
    return count || 0;
  }

  async bulkGradeSubmissions(schoolId: string, assignmentId: string, grades: BulkGradeInput[]): Promise<void> {
    for (const grade of grades) {
      await this.supabase.from('lxp_submissions').update({ score: grade.score, feedback: grade.feedback, graded_at: new Date().toISOString() })
        .eq('assignment_id', assignmentId).eq('student_id', grade.studentId).eq('school_id', schoolId);
    }
  }

  async findQuizById(schoolId: string, id: string): Promise<Quiz | null> {
    const { data, error } = await this.supabase
      .from('lxp_quizzes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpQuizNotFoundError(id);
    return data as Quiz | null;
  }

  async findAllQuizzes(schoolId: string, query: QuizQuery): Promise<PaginatedResult<Quiz>> {
    let q = this.supabase.from('lxp_quizzes').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.moduleId) q = q.eq('module_id', query.moduleId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Quiz>(q, query.page, query.limit);
  }

  async createQuiz(schoolId: string, data: QuizCreate): Promise<Quiz> {
    const { data: quiz, error } = await this.supabase
      .from('lxp_quizzes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return quiz as Quiz;
  }

  async updateQuiz(schoolId: string, id: string, data: QuizUpdate): Promise<Quiz> {
    const { data: quiz, error } = await this.supabase
      .from('lxp_quizzes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpQuizNotFoundError(id);
    return quiz as Quiz;
  }

  async deleteQuiz(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_quizzes').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpQuizNotFoundError(id);
  }

  async findQuizzesByCourse(schoolId: string, courseId: string): Promise<Quiz[]> {
    const { data, error } = await this.supabase
      .from('lxp_quizzes').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Quiz[];
  }

  async findQuizzesByModule(schoolId: string, moduleId: string): Promise<Quiz[]> {
    const { data, error } = await this.supabase
      .from('lxp_quizzes').select('*').eq('module_id', moduleId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Quiz[];
  }

  async getQuizQuestions(schoolId: string, id: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from('lxp_questions').select('*').eq('quiz_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as Question[];
  }

  async addQuizQuestion(schoolId: string, id: string, question: QuestionCreate): Promise<Question> {
    const { data, error } = await this.supabase
      .from('lxp_questions').insert({ ...question, quiz_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as Question;
  }

  async removeQuizQuestion(schoolId: string, id: string, questionId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_questions').delete().eq('id', questionId).eq('quiz_id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async reorderQuizQuestions(schoolId: string, id: string, questionIds: string[]): Promise<void> {
    for (let i = 0; i < questionIds.length; i++) {
      await this.supabase.from('lxp_questions').update({ order: i + 1 }).eq('id', questionIds[i]).eq('quiz_id', id).eq('school_id', schoolId);
    }
  }

  async startQuizAttempt(schoolId: string, id: string, studentId: string): Promise<QuizAttempt> {
    const { data, error } = await this.supabase
      .from('lxp_quiz_attempts').insert({ quiz_id: id, student_id: studentId, school_id: schoolId, started_at: new Date().toISOString(), status: 'in_progress' }).select().single();
    if (error) throw error;
    return data as QuizAttempt;
  }

  async getQuizAttempts(schoolId: string, id: string): Promise<QuizAttempt[]> {
    const { data, error } = await this.supabase
      .from('lxp_quiz_attempts').select('*').eq('quiz_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as QuizAttempt[];
  }

  async getQuizAverageScore(schoolId: string, id: string): Promise<number> {
    const { data } = await this.supabase
      .from('lxp_quiz_attempts').select('score').eq('quiz_id', id).eq('school_id', schoolId).not('score', 'is', null);
    const scores = (data || []).map((d: Record<string, unknown>) => (d.score as number) || 0);
    return scores.length > 0 ? scores.reduce((s, v) => s + v, 0) / scores.length : 0;
  }

  async getQuizPassRate(schoolId: string, id: string): Promise<number> {
    const quiz = await this.findQuizById(schoolId, id);
    if (!quiz) throw new LxpQuizNotFoundError(id);
    const passThreshold = ((quiz as unknown as Record<string, unknown>).pass_score as number) || 70;
    const { data } = await this.supabase
      .from('lxp_quiz_attempts').select('score').eq('quiz_id', id).eq('school_id', schoolId).not('score', 'is', null);
    const scores = (data || []).map((d: Record<string, unknown>) => (d.score as number) || 0);
    if (scores.length === 0) return 0;
    const passed = scores.filter((s) => s >= passThreshold).length;
    return (passed / scores.length) * 100;
  }

  async publishQuiz(schoolId: string, id: string): Promise<Quiz> {
    return this.updateQuiz(schoolId, id, { status: 'published' } as QuizUpdate);
  }

  async getQuizTimeLimit(schoolId: string, id: string): Promise<number | null> {
    const quiz = await this.findQuizById(schoolId, id);
    if (!quiz) throw new LxpQuizNotFoundError(id);
    return ((quiz as unknown as Record<string, unknown>).time_limit as number) || null;
  }

  async getQuizAttemptsRemaining(schoolId: string, id: string, studentId: string): Promise<number> {
    const quiz = await this.findQuizById(schoolId, id);
    if (!quiz) throw new LxpQuizNotFoundError(id);
    const maxAttempts = ((quiz as unknown as Record<string, unknown>).max_attempts as number) || 3;
    const { count } = await this.supabase
      .from('lxp_quiz_attempts').select('*', { count: 'exact', head: true }).eq('quiz_id', id).eq('student_id', studentId).eq('school_id', schoolId);
    return Math.max(0, maxAttempts - (count || 0));
  }

  async findQuestionBankById(schoolId: string, id: string): Promise<QuestionBank | null> {
    const { data, error } = await this.supabase
      .from('lxp_question_banks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpQuestionBankNotFoundError(id);
    return data as QuestionBank | null;
  }

  async findAllQuestionBanks(schoolId: string, query: QuestionBankQuery): Promise<PaginatedResult<QuestionBank>> {
    let q = this.supabase.from('lxp_question_banks').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<QuestionBank>(q, query.page, query.limit);
  }

  async createQuestionBank(schoolId: string, data: QuestionBankCreate): Promise<QuestionBank> {
    const { data: bank, error } = await this.supabase
      .from('lxp_question_banks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return bank as QuestionBank;
  }

  async updateQuestionBank(schoolId: string, id: string, data: Partial<QuestionBankCreate>): Promise<QuestionBank> {
    const { data: bank, error } = await this.supabase
      .from('lxp_question_banks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpQuestionBankNotFoundError(id);
    return bank as QuestionBank;
  }

  async deleteQuestionBank(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_question_banks').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpQuestionBankNotFoundError(id);
  }

  async findQuestionBanksByCourse(schoolId: string, courseId: string): Promise<QuestionBank[]> {
    const { data, error } = await this.supabase
      .from('lxp_question_banks').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as QuestionBank[];
  }

  async getQuestionBankQuestions(schoolId: string, id: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from('lxp_questions').select('*').eq('question_bank_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Question[];
  }

  async addQuestionBankQuestion(schoolId: string, id: string, question: QuestionCreate): Promise<Question> {
    const { data, error } = await this.supabase
      .from('lxp_questions').insert({ ...question, question_bank_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as Question;
  }

  async removeQuestionBankQuestion(schoolId: string, id: string, questionId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_questions').delete().eq('id', questionId).eq('question_bank_id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async importQuestionBankQuestions(schoolId: string, id: string, questions: QuestionCreate[]): Promise<Question[]> {
    const results: Question[] = [];
    for (const q of questions) {
      const result = await this.addQuestionBankQuestion(schoolId, id, q);
      results.push(result);
    }
    return results;
  }

  async exportQuestionBankQuestions(schoolId: string, id: string): Promise<Question[]> {
    return this.getQuestionBankQuestions(schoolId, id);
  }

  async getQuestionBankQuestionsByType(schoolId: string, id: string, type: string): Promise<Question[]> {
    const questions = await this.getQuestionBankQuestions(schoolId, id);
    return questions.filter((q) => (q as unknown as Record<string, unknown>).type === type);
  }

  async getQuestionBankQuestionsByDifficulty(schoolId: string, id: string, difficulty: string): Promise<Question[]> {
    const questions = await this.getQuestionBankQuestions(schoolId, id);
    return questions.filter((q) => (q as unknown as Record<string, unknown>).difficulty === difficulty);
  }

  async searchQuestionBankQuestions(schoolId: string, id: string, query: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from('lxp_questions').select('*').eq('question_bank_id', id).eq('school_id', schoolId).ilike('text', `%${query}%`);
    if (error) throw error;
    return (data || []) as Question[];
  }

  async getQuestionBankStatistics(schoolId: string, id: string): Promise<QuestionBankStatistics> {
    const questions = await this.getQuestionBankQuestions(schoolId, id);
    const byType: Record<string, number> = {};
    const byDifficulty: Record<string, number> = {};
    for (const q of questions) {
      const type = (q as unknown as Record<string, unknown>).type as string;
      const diff = (q as unknown as Record<string, unknown>).difficulty as string;
      byType[type] = (byType[type] || 0) + 1;
      byDifficulty[diff] = (byDifficulty[diff] || 0) + 1;
    }
    return { totalQuestions: questions.length, byType, byDifficulty, averageQuality: 0 };
  }

  async cloneQuestionBank(schoolId: string, id: string, newTitle: string): Promise<QuestionBank> {
    const original = await this.findQuestionBankById(schoolId, id);
    if (!original) throw new LxpQuestionBankNotFoundError(id);
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as unknown as Record<string, unknown>;
    return this.createQuestionBank(schoolId, { ...rest, title: newTitle } as QuestionBankCreate);
  }

  async findQuestionById(schoolId: string, id: string): Promise<Question | null> {
    const { data, error } = await this.supabase
      .from('lxp_questions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpQuestionNotFoundError(id);
    return data as Question | null;
  }

  async findAllQuestions(schoolId: string, query: QuestionQuery): Promise<PaginatedResult<Question>> {
    let q = this.supabase.from('lxp_questions').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.quizId) q = q.eq('quiz_id', query.quizId);
    if (query.questionBankId) q = q.eq('question_bank_id', query.questionBankId);
    if (query.search) q = q.ilike('text', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Question>(q, query.page, query.limit);
  }

  async createQuestion(schoolId: string, data: QuestionCreate): Promise<Question> {
    const { data: question, error } = await this.supabase
      .from('lxp_questions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return question as Question;
  }

  async updateQuestion(schoolId: string, id: string, data: QuestionUpdate): Promise<Question> {
    const { data: question, error } = await this.supabase
      .from('lxp_questions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpQuestionNotFoundError(id);
    return question as Question;
  }

  async deleteQuestion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_questions').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpQuestionNotFoundError(id);
  }

  async findQuestionsByQuiz(schoolId: string, quizId: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from('lxp_questions').select('*').eq('quiz_id', quizId).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as Question[];
  }

  async findQuestionsByBank(schoolId: string, bankId: string): Promise<Question[]> {
    return this.getQuestionBankQuestions(schoolId, bankId);
  }

  async getQuestionChoices(schoolId: string, id: string): Promise<QuestionChoice[]> {
    const { data, error } = await this.supabase
      .from('lxp_question_choices').select('*').eq('question_id', id).eq('school_id', schoolId).order('order');
    if (error) throw error;
    return (data || []) as QuestionChoice[];
  }

  async addQuestionChoice(schoolId: string, id: string, choice: QuestionChoiceCreate): Promise<QuestionChoice> {
    const { data, error } = await this.supabase
      .from('lxp_question_choices').insert({ ...choice, question_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as QuestionChoice;
  }

  async validateQuestion(schoolId: string, id: string, answer: QuestionAnswer): Promise<QuestionValidationResult> {
    const question = await this.findQuestionById(schoolId, id);
    if (!question) throw new LxpQuestionNotFoundError(id);
    const choices = await this.getQuestionChoices(schoolId, id);
    const correctChoice = choices.find((c) => c.isCorrect);
    const isCorrect = correctChoice && answer.answer === correctChoice.text;
    return { correct: isCorrect || false, score: isCorrect ? 100 : 0, feedback: isCorrect ? 'Correct' : 'Incorrect' };
  }

  async getQuestionStatistics(schoolId: string, id: string): Promise<QuestionStatistics> {
    const { count: totalAttempts } = await this.supabase
      .from('lxp_question_answers').select('*', { count: 'exact', head: true }).eq('question_id', id).eq('school_id', schoolId);
    const { count: correctCount } = await this.supabase
      .from('lxp_question_answers').select('*', { count: 'exact', head: true }).eq('question_id', id).eq('school_id', schoolId).eq('correct', true);
    return { totalAttempts: totalAttempts || 0, correctRate: (totalAttempts || 0) > 0 ? ((correctCount || 0) / (totalAttempts || 0)) * 100 : 0, averageTime: 0, difficultyIndex: 0 };
  }

  async cloneQuestion(schoolId: string, id: string): Promise<Question> {
    const original = await this.findQuestionById(schoolId, id);
    if (!original) throw new LxpQuestionNotFoundError(id);
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as unknown as Record<string, unknown>;
    return this.createQuestion(schoolId, rest as unknown as QuestionCreate);
  }

  async findQuestionsByType(schoolId: string, type: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from('lxp_questions').select('*').eq('school_id', schoolId).eq('type', type);
    if (error) throw error;
    return (data || []) as Question[];
  }

  async findQuizAttemptById(schoolId: string, id: string): Promise<QuizAttempt | null> {
    const { data, error } = await this.supabase
      .from('lxp_quiz_attempts').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpQuizAttemptNotFoundError(id);
    return data as QuizAttempt | null;
  }

  async findAllQuizAttempts(schoolId: string, query: QuizAttemptQuery): Promise<PaginatedResult<QuizAttempt>> {
    let q = this.supabase.from('lxp_quiz_attempts').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.quizId) q = q.eq('quiz_id', query.quizId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    q = q.order(query.sortBy || 'started_at', { ascending: false });
    return this.paginate<QuizAttempt>(q, query.page, query.limit);
  }

  async findQuizAttemptsByQuiz(schoolId: string, quizId: string): Promise<QuizAttempt[]> {
    const { data, error } = await this.supabase
      .from('lxp_quiz_attempts').select('*').eq('quiz_id', quizId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as QuizAttempt[];
  }

  async findQuizAttemptsByStudent(schoolId: string, studentId: string): Promise<QuizAttempt[]> {
    const { data, error } = await this.supabase
      .from('lxp_quiz_attempts').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as QuizAttempt[];
  }

  async submitQuizAttempt(schoolId: string, id: string, answers: QuizAnswer[]): Promise<QuizAttemptResult> {
    const attempt = await this.findQuizAttemptById(schoolId, id);
    if (!attempt) throw new LxpQuizAttemptNotFoundError(id);
    let correctCount = 0;
    const answerResults: QuizAnswerResult[] = [];
    for (const answer of answers) {
      const question = await this.findQuestionById(schoolId, answer.questionId);
      const choices = question ? await this.getQuestionChoices(schoolId, answer.questionId) : [];
      const correctChoice = choices.find((c) => c.isCorrect);
      const isCorrect = correctChoice && answer.answer === correctChoice.text;
      if (isCorrect) correctCount++;
      answerResults.push({ questionId: answer.questionId, correct: isCorrect || false, score: isCorrect ? 100 : 0, feedback: isCorrect ? 'Correct' : 'Incorrect' });
    }
    const score = answers.length > 0 ? (correctCount / answers.length) * 100 : 0;
    await this.supabase.from('lxp_quiz_attempts').update({ score, status: 'completed', completed_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    return { score, maxScore: 100, percentage: score, passed: score >= 70, answers: answerResults, timeSpent: 0 };
  }

  async getQuizAttemptTimeRemaining(schoolId: string, id: string): Promise<number> {
    const attempt = await this.findQuizAttemptById(schoolId, id);
    if (!attempt) throw new LxpQuizAttemptNotFoundError(id);
    const quiz = await this.findQuizById(schoolId, (attempt as unknown as Record<string, unknown>).quiz_id as string);
    if (!quiz) return 0;
    const timeLimit = ((quiz as unknown as Record<string, unknown>).time_limit as number) || 0;
    if (timeLimit === 0) return Infinity;
    const startedAt = new Date((attempt as unknown as Record<string, unknown>).started_at as string).getTime();
    const elapsed = (Date.now() - startedAt) / 1000 / 60;
    return Math.max(0, timeLimit - elapsed);
  }

  async autoSubmitQuizAttempt(schoolId: string, id: string): Promise<QuizAttemptResult> {
    return this.submitQuizAttempt(schoolId, id, []);
  }

  async getQuizAttemptResults(schoolId: string, id: string): Promise<QuizAttemptResult> {
    const attempt = await this.findQuizAttemptById(schoolId, id);
    if (!attempt) throw new LxpQuizAttemptNotFoundError(id);
    return { score: ((attempt as unknown as Record<string, unknown>).score as number) || 0, maxScore: 100, percentage: ((attempt as unknown as Record<string, unknown>).score as number) || 0, passed: (((attempt as unknown as Record<string, unknown>).score as number) || 0) >= 70, answers: [], timeSpent: 0 };
  }

  async getQuizAttemptAnswerDetails(schoolId: string, id: string): Promise<QuizAnswerDetail[]> {
    const { data } = await this.supabase
      .from('lxp_question_answers').select('*').eq('attempt_id', id).eq('school_id', schoolId);
    return (data || []).map((d: Record<string, unknown>) => ({
      questionId: d.question_id as string, questionText: '', userAnswer: d.answer as string | string[], correctAnswer: [], correct: d.correct as boolean, score: (d.score as number) || 0, feedback: ''
    }));
  }

  async getBestQuizAttempt(schoolId: string, quizId: string, studentId: string): Promise<QuizAttempt | null> {
    const { data, error } = await this.supabase
      .from('lxp_quiz_attempts').select('*').eq('quiz_id', quizId).eq('student_id', studentId).eq('school_id', schoolId)
      .order('score', { ascending: false }).limit(1).single();
    if (error) return null;
    return data as QuizAttempt | null;
  }

  async getLatestQuizAttempt(schoolId: string, quizId: string, studentId: string): Promise<QuizAttempt | null> {
    const { data, error } = await this.supabase
      .from('lxp_quiz_attempts').select('*').eq('quiz_id', quizId).eq('student_id', studentId).eq('school_id', schoolId)
      .order('started_at', { ascending: false }).limit(1).single();
    if (error) return null;
    return data as QuizAttempt | null;
  }

  async findCertificateById(schoolId: string, id: string): Promise<Certificate | null> {
    const { data, error } = await this.supabase
      .from('lxp_certificates').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpCertificateNotFoundError(id);
    return data as Certificate | null;
  }

  async findAllCertificates(schoolId: string, query: CertificateQuery): Promise<PaginatedResult<Certificate>> {
    let q = this.supabase.from('lxp_certificates').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    q = q.order(query.sortBy || 'issued_at', { ascending: false });
    return this.paginate<Certificate>(q, query.page, query.limit);
  }

  async createCertificate(schoolId: string, data: CertificateCreate): Promise<Certificate> {
    const { data: cert, error } = await this.supabase
      .from('lxp_certificates').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return cert as Certificate;
  }

  async updateCertificate(schoolId: string, id: string, data: Partial<CertificateCreate>): Promise<Certificate> {
    const { data: cert, error } = await this.supabase
      .from('lxp_certificates').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpCertificateNotFoundError(id);
    return cert as Certificate;
  }

  async deleteCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_certificates').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpCertificateNotFoundError(id);
  }

  async findCertificatesByStudent(schoolId: string, studentId: string): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from('lxp_certificates').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Certificate[];
  }

  async findCertificatesByCourse(schoolId: string, courseId: string): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from('lxp_certificates').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Certificate[];
  }

  async issueCertificate(schoolId: string, courseId: string, studentId: string): Promise<Certificate> {
    const verificationCode = Math.random().toString(36).substring(2, 15);
    return this.createCertificate(schoolId, { course_id: courseId, student_id: studentId, verification_code: verificationCode, issued_at: new Date().toISOString() } as unknown as CertificateCreate);
  }

  async revokeCertificate(schoolId: string, id: string, reason: string): Promise<void> {
    await this.supabase.from('lxp_certificates').update({ status: 'revoked', revocation_reason: reason, revoked_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
  }

  async verifyCertificate(schoolId: string, id: string): Promise<boolean> {
    const cert = await this.findCertificateById(schoolId, id);
    return cert !== null && (cert as unknown as Record<string, unknown>).status !== 'revoked';
  }

  async getCertificateByVerificationCode(schoolId: string, code: string): Promise<Certificate | null> {
    const { data, error } = await this.supabase
      .from('lxp_certificates').select('*').eq('verification_code', code).eq('school_id', schoolId).single();
    if (error) return null;
    return data as Certificate | null;
  }

  async getCertificateDownloadUrl(schoolId: string, id: string): Promise<string> {
    const cert = await this.findCertificateById(schoolId, id);
    if (!cert) throw new LxpCertificateNotFoundError(id);
    return (cert as unknown as Record<string, unknown>).download_url as string;
  }

  async getCertificateTemplates(schoolId: string): Promise<CertificateTemplate[]> {
    const { data, error } = await this.supabase
      .from('lxp_certificate_templates').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as CertificateTemplate[];
  }

  async getCertificateStatistics(schoolId: string): Promise<CertificateStatistics> {
    const { count: totalIssued } = await this.supabase
      .from('lxp_certificates').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    const { count: totalRevoked } = await this.supabase
      .from('lxp_certificates').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'revoked');
    const { count: issuedThisMonth } = await this.supabase
      .from('lxp_certificates').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).gte('issued_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
    return { totalIssued: totalIssued || 0, totalRevoked: totalRevoked || 0, activeCount: (totalIssued || 0) - (totalRevoked || 0), issuedThisMonth: issuedThisMonth || 0 };
  }

  async findCertificatesByDateRange(schoolId: string, range: DateRange): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from('lxp_certificates').select('*').eq('school_id', schoolId).gte('issued_at', range.start).lte('issued_at', range.end);
    if (error) throw error;
    return (data || []) as Certificate[];
  }

  async getExpiringSoonCertificates(schoolId: string, daysUntilExpiry: number): Promise<Certificate[]> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
    const { data, error } = await this.supabase
      .from('lxp_certificates').select('*').eq('school_id', schoolId).eq('status', 'active').lte('expires_at', expiryDate.toISOString());
    if (error) throw error;
    return (data || []) as Certificate[];
  }

  async findBadgeById(schoolId: string, id: string): Promise<Badge | null> {
    const { data, error } = await this.supabase
      .from('lxp_badges').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpBadgeNotFoundError(id);
    return data as Badge | null;
  }

  async findAllBadges(schoolId: string, query: BadgeQuery): Promise<PaginatedResult<Badge>> {
    let q = this.supabase.from('lxp_badges').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Badge>(q, query.page, query.limit);
  }

  async createBadge(schoolId: string, data: BadgeCreate): Promise<Badge> {
    const { data: badge, error } = await this.supabase
      .from('lxp_badges').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return badge as Badge;
  }

  async updateBadge(schoolId: string, id: string, data: BadgeUpdate): Promise<Badge> {
    const { data: badge, error } = await this.supabase
      .from('lxp_badges').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpBadgeNotFoundError(id);
    return badge as Badge;
  }

  async deleteBadge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_badges').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpBadgeNotFoundError(id);
  }

  async findBadgesByCategory(schoolId: string, categoryId: string): Promise<Badge[]> {
    const { data, error } = await this.supabase
      .from('lxp_badges').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Badge[];
  }

  async awardBadge(schoolId: string, badgeId: string, studentId: string): Promise<BadgeAward> {
    const { data, error } = await this.supabase
      .from('lxp_badge_awards').insert({ badge_id: badgeId, student_id: studentId, school_id: schoolId, awarded_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as BadgeAward;
  }

  async revokeBadge(schoolId: string, badgeId: string, studentId: string, reason: string): Promise<void> {
    await this.supabase.from('lxp_badge_awards').update({ status: 'revoked', revocation_reason: reason }).eq('badge_id', badgeId).eq('student_id', studentId).eq('school_id', schoolId);
  }

  async getEarnedBadges(schoolId: string, studentId: string): Promise<Badge[]> {
    const { data } = await this.supabase
      .from('lxp_badge_awards').select('lxp_badges(*)').eq('student_id', studentId).eq('school_id', schoolId).eq('status', 'active');
    return (data || []).map((d: Record<string, unknown>) => d.lxp_badges as Badge).filter(Boolean);
  }

  async getBadgeEarnedCount(schoolId: string, badgeId: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_badge_awards').select('*', { count: 'exact', head: true }).eq('badge_id', badgeId).eq('school_id', schoolId).eq('status', 'active');
    return count || 0;
  }

  async getBadgeProgress(schoolId: string, badgeId: string, studentId: string): Promise<BadgeProgress> {
    const badge = await this.findBadgeById(schoolId, badgeId);
    if (!badge) throw new LxpBadgeNotFoundError(badgeId);
    const required = ((badge as unknown as Record<string, unknown>).required_count as number) || 1;
    const { count } = await this.supabase
      .from('lxp_badge_awards').select('*', { count: 'exact', head: true }).eq('badge_id', badgeId).eq('student_id', studentId).eq('school_id', schoolId);
    return { current: count || 0, required, percentage: required > 0 ? ((count || 0) / required) * 100 : 0 };
  }

  async findBadgesByStudent(schoolId: string, studentId: string): Promise<BadgeAward[]> {
    const { data, error } = await this.supabase
      .from('lxp_badge_awards').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as BadgeAward[];
  }

  async findMicroCredentialById(schoolId: string, id: string): Promise<MicroCredential | null> {
    const { data, error } = await this.supabase
      .from('lxp_micro_credentials').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpMicroCredentialNotFoundError(id);
    return data as MicroCredential | null;
  }

  async findAllMicroCredentials(schoolId: string, query: MicroCredentialQuery): Promise<PaginatedResult<MicroCredential>> {
    let q = this.supabase.from('lxp_micro_credentials').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<MicroCredential>(q, query.page, query.limit);
  }

  async createMicroCredential(schoolId: string, data: MicroCredentialCreate): Promise<MicroCredential> {
    const { data: mc, error } = await this.supabase
      .from('lxp_micro_credentials').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return mc as MicroCredential;
  }

  async updateMicroCredential(schoolId: string, id: string, data: Partial<MicroCredentialCreate>): Promise<MicroCredential> {
    const { data: mc, error } = await this.supabase
      .from('lxp_micro_credentials').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpMicroCredentialNotFoundError(id);
    return mc as MicroCredential;
  }

  async deleteMicroCredential(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_micro_credentials').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpMicroCredentialNotFoundError(id);
  }

  async getMicroCredentialRequirements(schoolId: string, id: string): Promise<MicroCredentialRequirement[]> {
    const { data, error } = await this.supabase
      .from('lxp_micro_credential_requirements').select('*').eq('micro_credential_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as MicroCredentialRequirement[];
  }

  async addMicroCredentialRequirement(schoolId: string, id: string, requirement: MicroCredentialRequirementCreate): Promise<MicroCredentialRequirement> {
    const { data, error } = await this.supabase
      .from('lxp_micro_credential_requirements').insert({ ...requirement, micro_credential_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as MicroCredentialRequirement;
  }

  async removeMicroCredentialRequirement(schoolId: string, id: string, requirementId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_micro_credential_requirements').delete().eq('id', requirementId).eq('micro_credential_id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getMicroCredentialEarned(schoolId: string, studentId: string): Promise<MicroCredential[]> {
    const { data } = await this.supabase
      .from('lxp_micro_credential_awards').select('lxp_micro_credentials(*)').eq('student_id', studentId).eq('school_id', schoolId);
    return (data || []).map((d: Record<string, unknown>) => d.lxp_micro_credentials as MicroCredential).filter(Boolean);
  }

  async checkMicroCredentialEligibility(schoolId: string, id: string, studentId: string): Promise<MicroCredentialEligibility> {
    const requirements = await this.getMicroCredentialRequirements(schoolId, id);
    return { eligible: false, completed: 0, total: requirements.length, remaining: requirements };
  }

  async awardMicroCredential(schoolId: string, id: string, studentId: string): Promise<MicroCredentialAward> {
    const { data, error } = await this.supabase
      .from('lxp_micro_credential_awards').insert({ micro_credential_id: id, student_id: studentId, school_id: schoolId, awarded_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as MicroCredentialAward;
  }

  async verifyMicroCredential(schoolId: string, id: string): Promise<boolean> {
    const mc = await this.findMicroCredentialById(schoolId, id);
    return mc !== null;
  }

  async getMicroCredentialStatistics(schoolId: string, id: string): Promise<MicroCredentialStatistics> {
    const { count: totalEarned } = await this.supabase
      .from('lxp_micro_credential_awards').select('*', { count: 'exact', head: true }).eq('micro_credential_id', id).eq('school_id', schoolId);
    return { totalEarned: totalEarned || 0, averageCompletionTime: 0, completionRate: 0 };
  }

  async findCompetencyById(schoolId: string, id: string): Promise<Competency | null> {
    const { data, error } = await this.supabase
      .from('lxp_competencies').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpCompetencyNotFoundError(id);
    return data as Competency | null;
  }

  async findAllCompetencies(schoolId: string, query: CompetencyQuery): Promise<PaginatedResult<Competency>> {
    let q = this.supabase.from('lxp_competencies').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Competency>(q, query.page, query.limit);
  }

  async createCompetency(schoolId: string, data: CompetencyCreate): Promise<Competency> {
    const { data: comp, error } = await this.supabase
      .from('lxp_competencies').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return comp as Competency;
  }

  async updateCompetency(schoolId: string, id: string, data: Partial<CompetencyCreate>): Promise<Competency> {
    const { data: comp, error } = await this.supabase
      .from('lxp_competencies').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpCompetencyNotFoundError(id);
    return comp as Competency;
  }

  async deleteCompetency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_competencies').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpCompetencyNotFoundError(id);
  }

  async findCompetenciesByCategory(schoolId: string, categoryId: string): Promise<Competency[]> {
    const { data, error } = await this.supabase
      .from('lxp_competencies').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Competency[];
  }

  async getCompetencyStudentProgress(schoolId: string, competencyId: string, studentId: string): Promise<CompetencyProgress> {
    const { data } = await this.supabase
      .from('lxp_competency_progress').select('*').eq('competency_id', competencyId).eq('student_id', studentId).eq('school_id', schoolId).single();
    return (data as CompetencyProgress) || { level: 0, score: 0, assessments: 0, lastAssessed: null };
  }

  async assessCompetency(schoolId: string, competencyId: string, studentId: string, score: number, evidence: string): Promise<CompetencyAssessment> {
    const { data, error } = await this.supabase
      .from('lxp_competency_assessments').insert({ competency_id: competencyId, student_id: studentId, school_id: schoolId, score, evidence, assessed_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as CompetencyAssessment;
  }

  async getCompetencyAssessments(schoolId: string, competencyId: string): Promise<CompetencyAssessment[]> {
    const { data, error } = await this.supabase
      .from('lxp_competency_assessments').select('*').eq('competency_id', competencyId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as CompetencyAssessment[];
  }

  async getRelatedCompetencies(schoolId: string, id: string): Promise<Competency[]> {
    const { data } = await this.supabase
      .from('lxp_competency_relations').select('lxp_competencies(*)').eq('competency_id', id).eq('school_id', schoolId);
    return (data || []).map((r: Record<string, unknown>) => r.lxp_competencies as Competency).filter(Boolean);
  }

  async getCompetencyMasteryLevel(schoolId: string, id: string, studentId: string): Promise<MasteryLevel> {
    const progress = await this.getCompetencyStudentProgress(schoolId, id, studentId);
    return { id: '', name: `Level ${progress.level}`, description: '', threshold: progress.level * 25 };
  }

  async getCompetencyFramework(schoolId: string, id: string): Promise<CompetencyFramework> {
    const { data } = await this.supabase
      .from('lxp_competency_frameworks').select('*').eq('id', id).eq('school_id', schoolId).single();
    return (data as CompetencyFramework) || { id, name: '', levels: 5, categories: [] };
  }

  async findSkillById(schoolId: string, id: string): Promise<Skill | null> {
    const { data, error } = await this.supabase
      .from('lxp_skills').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpSkillNotFoundError(id);
    return data as Skill | null;
  }

  async findAllSkills(schoolId: string, query: SkillQuery): Promise<PaginatedResult<Skill>> {
    let q = this.supabase.from('lxp_skills').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.competencyId) q = q.eq('competency_id', query.competencyId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Skill>(q, query.page, query.limit);
  }

  async createSkill(schoolId: string, data: SkillCreate): Promise<Skill> {
    const { data: skill, error } = await this.supabase
      .from('lxp_skills').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return skill as Skill;
  }

  async updateSkill(schoolId: string, id: string, data: Partial<SkillCreate>): Promise<Skill> {
    const { data: skill, error } = await this.supabase
      .from('lxp_skills').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpSkillNotFoundError(id);
    return skill as Skill;
  }

  async deleteSkill(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_skills').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpSkillNotFoundError(id);
  }

  async findSkillsByCategory(schoolId: string, categoryId: string): Promise<Skill[]> {
    const { data, error } = await this.supabase
      .from('lxp_skills').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Skill[];
  }

  async findSkillsByCompetency(schoolId: string, competencyId: string): Promise<Skill[]> {
    const { data, error } = await this.supabase
      .from('lxp_skills').select('*').eq('competency_id', competencyId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Skill[];
  }

  async getSkillEndorsements(schoolId: string, skillId: string, studentId: string): Promise<SkillEndorsement[]> {
    const { data, error } = await this.supabase
      .from('lxp_skill_endorsements').select('*').eq('skill_id', skillId).eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as SkillEndorsement[];
  }

  async endorseSkill(schoolId: string, skillId: string, studentId: string, endorserId: string): Promise<SkillEndorsement> {
    const { data, error } = await this.supabase
      .from('lxp_skill_endorsements').insert({ skill_id: skillId, student_id: studentId, endorser_id: endorserId, school_id: schoolId, endorsed_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as SkillEndorsement;
  }

  async getSkillProficiency(schoolId: string, skillId: string, studentId: string): Promise<SkillProficiency> {
    const { data } = await this.supabase
      .from('lxp_skill_proficiency').select('*').eq('skill_id', skillId).eq('student_id', studentId).eq('school_id', schoolId).single();
    return (data as SkillProficiency) || { level: 0, endorsements: 0, selfAssessed: false };
  }

  async updateSkillProficiency(schoolId: string, skillId: string, studentId: string, level: number): Promise<void> {
    await this.supabase.from('lxp_skill_proficiency').upsert({ skill_id: skillId, student_id: studentId, school_id: schoolId, level });
  }

  async searchSkillsByName(schoolId: string, query: string): Promise<Skill[]> {
    const { data, error } = await this.supabase
      .from('lxp_skills').select('*').eq('school_id', schoolId).ilike('name', `%${query}%`);
    if (error) throw error;
    return (data || []) as Skill[];
  }

  async getSkillTree(schoolId: string, id: string): Promise<SkillNode> {
    const skill = await this.findSkillById(schoolId, id);
    if (!skill) throw new LxpSkillNotFoundError(id);
    return { id: skill.id, name: (skill as unknown as Record<string, unknown>).name as string, children: [], level: 0 };
  }

  async findVerificationById(schoolId: string, id: string): Promise<Verification | null> {
    const { data, error } = await this.supabase
      .from('lxp_verifications').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpVerificationNotFoundError(id);
    return data as Verification | null;
  }

  async findAllVerifications(schoolId: string, query: VerificationQuery): Promise<PaginatedResult<Verification>> {
    let q = this.supabase.from('lxp_verifications').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.certificateId) q = q.eq('certificate_id', query.certificateId);
    if (query.badgeId) q = q.eq('badge_id', query.badgeId);
    q = q.order(query.sortBy || 'verified_at', { ascending: false });
    return this.paginate<Verification>(q, query.page, query.limit);
  }

  async createVerification(schoolId: string, data: VerificationCreate): Promise<Verification> {
    const { data: ver, error } = await this.supabase
      .from('lxp_verifications').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return ver as Verification;
  }

  async updateVerification(schoolId: string, id: string, data: Partial<VerificationCreate>): Promise<Verification> {
    const { data: ver, error } = await this.supabase
      .from('lxp_verifications').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpVerificationNotFoundError(id);
    return ver as Verification;
  }

  async deleteVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_verifications').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpVerificationNotFoundError(id);
  }

  async performVerification(schoolId: string, id: string): Promise<VerificationResult> {
    const ver = await this.findVerificationById(schoolId, id);
    if (!ver) throw new LxpVerificationNotFoundError(id);
    return { valid: true, certificateId: (ver as unknown as Record<string, unknown>).certificate_id as string | null, badgeId: (ver as unknown as Record<string, unknown>).badge_id as string | null, verifiedAt: new Date().toISOString() };
  }

  async findVerificationsByCertificate(schoolId: string, certificateId: string): Promise<Verification[]> {
    const { data, error } = await this.supabase
      .from('lxp_verifications').select('*').eq('certificate_id', certificateId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Verification[];
  }

  async findVerificationsByBadge(schoolId: string, badgeId: string): Promise<Verification[]> {
    const { data, error } = await this.supabase
      .from('lxp_verifications').select('*').eq('badge_id', badgeId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Verification[];
  }

  async getVerificationByCode(schoolId: string, code: string): Promise<Verification | null> {
    const { data, error } = await this.supabase
      .from('lxp_verifications').select('*').eq('verification_code', code).eq('school_id', schoolId).single();
    if (error) return null;
    return data as Verification | null;
  }

  async getVerificationHistory(schoolId: string, entityId: string): Promise<Verification[]> {
    const { data, error } = await this.supabase
      .from('lxp_verifications').select('*').eq('entity_id', entityId).eq('school_id', schoolId).order('verified_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Verification[];
  }

  async getVerificationStatistics(schoolId: string): Promise<VerificationStatistics> {
    const { count: total } = await this.supabase
      .from('lxp_verifications').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    const { count: valid } = await this.supabase
      .from('lxp_verifications').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'valid');
    return { totalVerifications: total || 0, validVerifications: valid || 0, invalidVerifications: (total || 0) - (valid || 0), recentVerifications: 0 };
  }

  async getRecentVerifications(schoolId: string, limit: number): Promise<Verification[]> {
    const { data, error } = await this.supabase
      .from('lxp_verifications').select('*').eq('school_id', schoolId).order('verified_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as Verification[];
  }

  async findLiveSessionById(schoolId: string, id: string): Promise<LiveSession | null> {
    const { data, error } = await this.supabase
      .from('lxp_live_sessions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpLiveSessionNotFoundError(id);
    return data as LiveSession | null;
  }

  async findAllLiveSessions(schoolId: string, query: LiveSessionQuery): Promise<PaginatedResult<LiveSession>> {
    let q = this.supabase.from('lxp_live_sessions').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.instructorId) q = q.eq('instructor_id', query.instructorId);
    q = q.order(query.sortBy || 'scheduled_at', { ascending: false });
    return this.paginate<LiveSession>(q, query.page, query.limit);
  }

  async createLiveSession(schoolId: string, data: LiveSessionCreate): Promise<LiveSession> {
    const { data: session, error } = await this.supabase
      .from('lxp_live_sessions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return session as LiveSession;
  }

  async updateLiveSession(schoolId: string, id: string, data: LiveSessionUpdate): Promise<LiveSession> {
    const { data: session, error } = await this.supabase
      .from('lxp_live_sessions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLiveSessionNotFoundError(id);
    return session as LiveSession;
  }

  async deleteLiveSession(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_live_sessions').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpLiveSessionNotFoundError(id);
  }

  async findLiveSessionsByCourse(schoolId: string, courseId: string): Promise<LiveSession[]> {
    const { data, error } = await this.supabase
      .from('lxp_live_sessions').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as LiveSession[];
  }

  async findLiveSessionsByInstructor(schoolId: string, instructorId: string): Promise<LiveSession[]> {
    const { data, error } = await this.supabase
      .from('lxp_live_sessions').select('*').eq('instructor_id', instructorId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as LiveSession[];
  }

  async startLiveSession(schoolId: string, id: string): Promise<LiveSession> {
    return this.updateLiveSession(schoolId, id, { status: 'live', started_at: new Date().toISOString() } as LiveSessionUpdate);
  }

  async endLiveSession(schoolId: string, id: string): Promise<LiveSession> {
    return this.updateLiveSession(schoolId, id, { status: 'ended', ended_at: new Date().toISOString() } as LiveSessionUpdate);
  }

  async getLiveSessionParticipants(schoolId: string, id: string): Promise<LiveSessionParticipant[]> {
    const { data, error } = await this.supabase
      .from('lxp_live_session_participants').select('*').eq('live_session_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as LiveSessionParticipant[];
  }

  async joinLiveSession(schoolId: string, id: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_live_session_participants').insert({ live_session_id: id, user_id: studentId, school_id: schoolId, joined_at: new Date().toISOString() });
  }

  async leaveLiveSession(schoolId: string, id: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_live_session_participants').update({ left_at: new Date().toISOString() }).eq('live_session_id', id).eq('user_id', studentId).eq('school_id', schoolId);
  }

  async getLiveSessionChatHistory(schoolId: string, id: string): Promise<LiveSessionChat[]> {
    const { data, error } = await this.supabase
      .from('lxp_live_session_chats').select('*').eq('live_session_id', id).eq('school_id', schoolId).order('timestamp');
    if (error) throw error;
    return (data || []) as LiveSessionChat[];
  }

  async getLiveSessionScreenShareUrl(schoolId: string, id: string): Promise<string> {
    return `https://stream.example.com/${schoolId}/${id}/screen`;
  }

  async getLiveSessionWhiteboardData(schoolId: string, id: string): Promise<WhiteboardData> {
    const { data } = await this.supabase
      .from('lxp_live_session_whiteboards').select('*').eq('live_session_id', id).eq('school_id', schoolId).single();
    return (data as WhiteboardData) || { elements: [], lastUpdated: '' };
  }

  async getLiveSessionRecording(schoolId: string, id: string): Promise<Recording | null> {
    const { data } = await this.supabase
      .from('lxp_recordings').select('*').eq('live_session_id', id).eq('school_id', schoolId).single();
    return data as Recording | null;
  }

  async scheduleLiveSession(schoolId: string, data: LiveSessionScheduleCreate): Promise<LiveSession> {
    return this.createLiveSession(schoolId, { ...data, status: 'scheduled' } as unknown as LiveSessionCreate);
  }

  async findVirtualClassroomById(schoolId: string, id: string): Promise<VirtualClassroom | null> {
    const { data, error } = await this.supabase
      .from('lxp_virtual_classrooms').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpVirtualClassroomNotFoundError(id);
    return data as VirtualClassroom | null;
  }

  async findAllVirtualClassrooms(schoolId: string, query: VirtualClassroomQuery): Promise<PaginatedResult<VirtualClassroom>> {
    let q = this.supabase.from('lxp_virtual_classrooms').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<VirtualClassroom>(q, query.page, query.limit);
  }

  async createVirtualClassroom(schoolId: string, data: VirtualClassroomCreate): Promise<VirtualClassroom> {
    const { data: vc, error } = await this.supabase
      .from('lxp_virtual_classrooms').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return vc as VirtualClassroom;
  }

  async updateVirtualClassroom(schoolId: string, id: string, data: Partial<VirtualClassroomCreate>): Promise<VirtualClassroom> {
    const { data: vc, error } = await this.supabase
      .from('lxp_virtual_classrooms').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpVirtualClassroomNotFoundError(id);
    return vc as VirtualClassroom;
  }

  async deleteVirtualClassroom(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_virtual_classrooms').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpVirtualClassroomNotFoundError(id);
  }

  async getVirtualClassroomParticipants(schoolId: string, id: string): Promise<VirtualClassroomParticipant[]> {
    const { data, error } = await this.supabase
      .from('lxp_virtual_classroom_participants').select('*').eq('virtual_classroom_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as VirtualClassroomParticipant[];
  }

  async joinVirtualClassroom(schoolId: string, id: string, userId: string): Promise<void> {
    await this.supabase.from('lxp_virtual_classroom_participants').insert({ virtual_classroom_id: id, user_id: userId, school_id: schoolId, joined_at: new Date().toISOString() });
  }

  async leaveVirtualClassroom(schoolId: string, id: string, userId: string): Promise<void> {
    await this.supabase.from('lxp_virtual_classroom_participants').update({ left_at: new Date().toISOString() }).eq('virtual_classroom_id', id).eq('user_id', userId).eq('school_id', schoolId);
  }

  async getVirtualClassroomSessions(schoolId: string, id: string): Promise<LiveSession[]> {
    const { data, error } = await this.supabase
      .from('lxp_live_sessions').select('*').eq('virtual_classroom_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as LiveSession[];
  }

  async getVirtualClassroomCapacity(schoolId: string, id: string): Promise<number> {
    const vc = await this.findVirtualClassroomById(schoolId, id);
    if (!vc) throw new LxpVirtualClassroomNotFoundError(id);
    return ((vc as unknown as Record<string, unknown>).capacity as number) || 0;
  }

  async isVirtualClassroomFull(schoolId: string, id: string): Promise<boolean> {
    const capacity = await this.getVirtualClassroomCapacity(schoolId, id);
    const participants = await this.getVirtualClassroomParticipants(schoolId, id);
    return participants.length >= capacity;
  }

  async findRecordingById(schoolId: string, id: string): Promise<Recording | null> {
    const { data, error } = await this.supabase
      .from('lxp_recordings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpRecordingNotFoundError(id);
    return data as Recording | null;
  }

  async findAllRecordings(schoolId: string, query: RecordingQuery): Promise<PaginatedResult<Recording>> {
    let q = this.supabase.from('lxp_recordings').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.sessionId) q = q.eq('live_session_id', query.sessionId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Recording>(q, query.page, query.limit);
  }

  async createRecording(schoolId: string, data: RecordingCreate): Promise<Recording> {
    const { data: recording, error } = await this.supabase
      .from('lxp_recordings').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return recording as Recording;
  }

  async updateRecording(schoolId: string, id: string, data: Partial<RecordingCreate>): Promise<Recording> {
    const { data: recording, error } = await this.supabase
      .from('lxp_recordings').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpRecordingNotFoundError(id);
    return recording as Recording;
  }

  async deleteRecording(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_recordings').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpRecordingNotFoundError(id);
  }

  async findRecordingBySession(schoolId: string, sessionId: string): Promise<Recording | null> {
    const { data, error } = await this.supabase
      .from('lxp_recordings').select('*').eq('live_session_id', sessionId).eq('school_id', schoolId).single();
    if (error) return null;
    return data as Recording | null;
  }

  async getRecordingStreamUrl(schoolId: string, id: string): Promise<string> {
    const recording = await this.findRecordingById(schoolId, id);
    if (!recording) throw new LxpRecordingNotFoundError(id);
    return (recording as unknown as Record<string, unknown>).stream_url as string;
  }

  async getRecordingDownloadUrl(schoolId: string, id: string): Promise<string> {
    const recording = await this.findRecordingById(schoolId, id);
    if (!recording) throw new LxpRecordingNotFoundError(id);
    return (recording as unknown as Record<string, unknown>).download_url as string;
  }

  async getRecordingDuration(schoolId: string, id: string): Promise<number> {
    const recording = await this.findRecordingById(schoolId, id);
    if (!recording) throw new LxpRecordingNotFoundError(id);
    return ((recording as unknown as Record<string, unknown>).duration as number) || 0;
  }

  async processRecording(schoolId: string, id: string): Promise<void> {
    await this.supabase.from('lxp_recordings').update({ status: 'processing' }).eq('id', id).eq('school_id', schoolId);
  }

  async getRecordingStatus(schoolId: string, id: string): Promise<RecordingStatus> {
    const recording = await this.findRecordingById(schoolId, id);
    if (!recording) throw new LxpRecordingNotFoundError(id);
    return { state: (recording as unknown as Record<string, unknown>).status as RecordingStatus['state'], progress: 0 };
  }

  async getRecordingChapters(schoolId: string, id: string): Promise<RecordingChapter[]> {
    const { data, error } = await this.supabase
      .from('lxp_recording_chapters').select('*').eq('recording_id', id).eq('school_id', schoolId).order('start_time');
    if (error) throw error;
    return (data || []) as RecordingChapter[];
  }

  async findAttendanceById(schoolId: string, id: string): Promise<Attendance | null> {
    const { data, error } = await this.supabase
      .from('lxp_attendance').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpAttendanceNotFoundError(id);
    return data as Attendance | null;
  }

  async findAllAttendance(schoolId: string, query: AttendanceQuery): Promise<PaginatedResult<Attendance>> {
    let q = this.supabase.from('lxp_attendance').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.sessionId) q = q.eq('session_id', query.sessionId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Attendance>(q, query.page, query.limit);
  }

  async createAttendance(schoolId: string, data: AttendanceCreate): Promise<Attendance> {
    const { data: att, error } = await this.supabase
      .from('lxp_attendance').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return att as Attendance;
  }

  async updateAttendance(schoolId: string, id: string, data: Partial<AttendanceCreate>): Promise<Attendance> {
    const { data: att, error } = await this.supabase
      .from('lxp_attendance').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpAttendanceNotFoundError(id);
    return att as Attendance;
  }

  async deleteAttendance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_attendance').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpAttendanceNotFoundError(id);
  }

  async findAttendanceBySession(schoolId: string, sessionId: string): Promise<Attendance[]> {
    const { data, error } = await this.supabase
      .from('lxp_attendance').select('*').eq('session_id', sessionId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Attendance[];
  }

  async findAttendanceByStudent(schoolId: string, studentId: string): Promise<Attendance[]> {
    const { data, error } = await this.supabase
      .from('lxp_attendance').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Attendance[];
  }

  async markAttendancePresent(schoolId: string, sessionId: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_attendance').upsert({ session_id: sessionId, student_id: studentId, school_id: schoolId, status: 'present' });
  }

  async markAttendanceAbsent(schoolId: string, sessionId: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_attendance').upsert({ session_id: sessionId, student_id: studentId, school_id: schoolId, status: 'absent' });
  }

  async getAttendanceRate(schoolId: string, sessionId: string): Promise<number> {
    const attendance = await this.findAttendanceBySession(schoolId, sessionId);
    if (attendance.length === 0) return 0;
    const present = attendance.filter((a) => a.status === ('present' as string)).length;
    return (present / attendance.length) * 100;
  }

  async getStudentAttendanceRate(schoolId: string, courseId: string, studentId: string): Promise<number> {
    const { data } = await this.supabase
      .from('lxp_attendance').select('status').eq('student_id', studentId).eq('school_id', schoolId);
    const records = (data || []) as Array<Record<string, unknown>>;
    if (records.length === 0) return 0;
    const present = records.filter((r) => r.status === 'present').length;
    return (present / records.length) * 100;
  }

  async getCourseAttendanceStats(schoolId: string, courseId: string): Promise<AttendanceStats> {
    const { data } = await this.supabase
      .from('lxp_attendance').select('status').eq('course_id', courseId).eq('school_id', schoolId);
    const records = (data || []) as Array<Record<string, unknown>>;
    const present = records.filter((r) => r.status === 'present').length;
    const absent = records.filter((r) => r.status === 'absent').length;
    const late = records.filter((r) => r.status === 'late').length;
    const excused = records.filter((r) => r.status === 'excused').length;
    return { present, absent, late, excused, rate: records.length > 0 ? (present / records.length) * 100 : 0 };
  }

  async getAttendanceReport(schoolId: string, courseId: string, dateRange: DateRange): Promise<AttendanceReport> {
    const { data } = await this.supabase
      .from('lxp_attendance').select('*').eq('course_id', courseId).eq('school_id', schoolId).gte('date', dateRange.start).lte('date', dateRange.end);
    const records = (data || []) as Attendance[];
    const studentIds = [...new Set(records.map((r) => r.studentId))];
    const students: AttendanceStudentReport[] = studentIds.map((sid) => ({ studentId: sid, name: '', attendance: records.filter((r) => r.studentId === sid), rate: 0 }));
    const present = records.filter((r) => r.status === ('present' as string)).length;
    return { students, summary: { present, absent: records.length - present, late: 0, excused: 0, rate: records.length > 0 ? (present / records.length) * 100 : 0 } };
  }

  async findForumById(schoolId: string, id: string): Promise<Forum | null> {
    const { data, error } = await this.supabase
      .from('lxp_forums').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpForumNotFoundError(id);
    return data as Forum | null;
  }

  async findAllForums(schoolId: string, query: ForumQuery): Promise<PaginatedResult<Forum>> {
    let q = this.supabase.from('lxp_forums').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Forum>(q, query.page, query.limit);
  }

  async createForum(schoolId: string, data: ForumCreate): Promise<Forum> {
    const { data: forum, error } = await this.supabase
      .from('lxp_forums').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return forum as Forum;
  }

  async updateForum(schoolId: string, id: string, data: ForumUpdate): Promise<Forum> {
    const { data: forum, error } = await this.supabase
      .from('lxp_forums').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpForumNotFoundError(id);
    return forum as Forum;
  }

  async deleteForum(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_forums').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpForumNotFoundError(id);
  }

  async findForumsByCourse(schoolId: string, courseId: string): Promise<Forum[]> {
    const { data, error } = await this.supabase
      .from('lxp_forums').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Forum[];
  }

  async getForumThreads(schoolId: string, id: string): Promise<ForumThread[]> {
    const { data, error } = await this.supabase
      .from('lxp_forum_threads').select('*').eq('forum_id', id).eq('school_id', schoolId).order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as ForumThread[];
  }

  async createForumThread(schoolId: string, forumId: string, data: ForumThreadCreate): Promise<ForumThread> {
    const { data: thread, error } = await this.supabase
      .from('lxp_forum_threads').insert({ ...data, forum_id: forumId, school_id: schoolId }).select().single();
    if (error) throw error;
    return thread as ForumThread;
  }

  async getForumThread(schoolId: string, threadId: string): Promise<ForumThread> {
    const { data, error } = await this.supabase
      .from('lxp_forum_threads').select('*').eq('id', threadId).eq('school_id', schoolId).single();
    if (error) throw error;
    return data as ForumThread;
  }

  async getForumThreadReplies(schoolId: string, threadId: string): Promise<ForumReply[]> {
    const { data, error } = await this.supabase
      .from('lxp_forum_replies').select('*').eq('thread_id', threadId).eq('school_id', schoolId).order('created_at');
    if (error) throw error;
    return (data || []) as ForumReply[];
  }

  async addForumReply(schoolId: string, threadId: string, data: ForumReplyCreate): Promise<ForumReply> {
    const { data: reply, error } = await this.supabase
      .from('lxp_forum_replies').insert({ ...data, thread_id: threadId, school_id: schoolId }).select().single();
    if (error) throw error;
    return reply as ForumReply;
  }

  async markForumThreadResolved(schoolId: string, threadId: string): Promise<void> {
    await this.supabase.from('lxp_forum_threads').update({ resolved: true }).eq('id', threadId).eq('school_id', schoolId);
  }

  async pinForumThread(schoolId: string, threadId: string): Promise<void> {
    await this.supabase.from('lxp_forum_threads').update({ pinned: true }).eq('id', threadId).eq('school_id', schoolId);
  }

  async getForumPostCount(schoolId: string, id: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_forum_threads').select('*', { count: 'exact', head: true }).eq('forum_id', id).eq('school_id', schoolId);
    return count || 0;
  }

  async getForumActiveThreads(schoolId: string, id: string, limit: number): Promise<ForumThread[]> {
    const { data, error } = await this.supabase
      .from('lxp_forum_threads').select('*').eq('forum_id', id).eq('school_id', schoolId).order('last_reply_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as ForumThread[];
  }

  async searchForumThreads(schoolId: string, id: string, query: string): Promise<ForumThread[]> {
    const { data, error } = await this.supabase
      .from('lxp_forum_threads').select('*').eq('forum_id', id).eq('school_id', schoolId).ilike('title', `%${query}%`);
    if (error) throw error;
    return (data || []) as ForumThread[];
  }

  async getForumStatistics(schoolId: string, id: string): Promise<ForumStatistics> {
    const { count: totalThreads } = await this.supabase
      .from('lxp_forum_threads').select('*', { count: 'exact', head: true }).eq('forum_id', id).eq('school_id', schoolId);
    const { count: resolvedThreads } = await this.supabase
      .from('lxp_forum_threads').select('*', { count: 'exact', head: true }).eq('forum_id', id).eq('school_id', schoolId).eq('resolved', true);
    return { totalThreads: totalThreads || 0, totalReplies: 0, activeThreads: (totalThreads || 0) - (resolvedThreads || 0), resolvedThreads: resolvedThreads || 0 };
  }

  async findCommunityById(schoolId: string, id: string): Promise<Community | null> {
    const { data, error } = await this.supabase
      .from('lxp_communities').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpCommunityNotFoundError(id);
    return data as Community | null;
  }

  async findAllCommunities(schoolId: string, query: CommunityQuery): Promise<PaginatedResult<Community>> {
    let q = this.supabase.from('lxp_communities').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Community>(q, query.page, query.limit);
  }

  async createCommunity(schoolId: string, data: CommunityCreate): Promise<Community> {
    const { data: community, error } = await this.supabase
      .from('lxp_communities').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return community as Community;
  }

  async updateCommunity(schoolId: string, id: string, data: Partial<CommunityCreate>): Promise<Community> {
    const { data: community, error } = await this.supabase
      .from('lxp_communities').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpCommunityNotFoundError(id);
    return community as Community;
  }

  async deleteCommunity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_communities').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpCommunityNotFoundError(id);
  }

  async getCommunityMembers(schoolId: string, id: string): Promise<CommunityMember[]> {
    const { data, error } = await this.supabase
      .from('lxp_community_members').select('*').eq('community_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as CommunityMember[];
  }

  async joinCommunity(schoolId: string, id: string, userId: string): Promise<void> {
    await this.supabase.from('lxp_community_members').insert({ community_id: id, user_id: userId, school_id: schoolId, joined_at: new Date().toISOString() });
  }

  async leaveCommunity(schoolId: string, id: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_community_members').delete().eq('community_id', id).eq('user_id', userId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getCommunityPosts(schoolId: string, id: string): Promise<CommunityPost[]> {
    const { data, error } = await this.supabase
      .from('lxp_community_posts').select('*').eq('community_id', id).eq('school_id', schoolId).order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as CommunityPost[];
  }

  async createCommunityPost(schoolId: string, id: string, data: CommunityPostCreate): Promise<CommunityPost> {
    const { data: post, error } = await this.supabase
      .from('lxp_community_posts').insert({ ...data, community_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return post as CommunityPost;
  }

  async getCommunityMemberCount(schoolId: string, id: string): Promise<number> {
    const { count } = await this.supabase
      .from('lxp_community_members').select('*', { count: 'exact', head: true }).eq('community_id', id).eq('school_id', schoolId);
    return count || 0;
  }

  async findPublicCommunities(schoolId: string): Promise<Community[]> {
    const { data, error } = await this.supabase
      .from('lxp_communities').select('*').eq('school_id', schoolId).eq('is_public', true);
    if (error) throw error;
    return (data || []) as Community[];
  }

  async findCommunitiesByCategory(schoolId: string, categoryId: string): Promise<Community[]> {
    const { data, error } = await this.supabase
      .from('lxp_communities').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Community[];
  }

  async findGroupById(schoolId: string, id: string): Promise<Group | null> {
    const { data, error } = await this.supabase
      .from('lxp_groups').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpGroupNotFoundError(id);
    return data as Group | null;
  }

  async findAllGroups(schoolId: string, query: GroupQuery): Promise<PaginatedResult<Group>> {
    let q = this.supabase.from('lxp_groups').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Group>(q, query.page, query.limit);
  }

  async createGroup(schoolId: string, data: GroupCreate): Promise<Group> {
    const { data: group, error } = await this.supabase
      .from('lxp_groups').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return group as Group;
  }

  async updateGroup(schoolId: string, id: string, data: GroupUpdate): Promise<Group> {
    const { data: group, error } = await this.supabase
      .from('lxp_groups').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpGroupNotFoundError(id);
    return group as Group;
  }

  async deleteGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_groups').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpGroupNotFoundError(id);
  }

  async findGroupsByCourse(schoolId: string, courseId: string): Promise<Group[]> {
    const { data, error } = await this.supabase
      .from('lxp_groups').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Group[];
  }

  async getGroupMembers(schoolId: string, id: string): Promise<GroupMember[]> {
    const { data, error } = await this.supabase
      .from('lxp_group_members').select('*').eq('group_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as GroupMember[];
  }

  async addGroupMember(schoolId: string, id: string, studentId: string): Promise<GroupMember> {
    const { data, error } = await this.supabase
      .from('lxp_group_members').insert({ group_id: id, student_id: studentId, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as GroupMember;
  }

  async removeGroupMember(schoolId: string, id: string, studentId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_group_members').delete().eq('group_id', id).eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getGroupProjects(schoolId: string, id: string): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('lxp_projects').select('*').eq('group_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Project[];
  }

  async getGroupLeader(schoolId: string, id: string): Promise<GroupMember> {
    const { data } = await this.supabase
      .from('lxp_group_members').select('*').eq('group_id', id).eq('school_id', schoolId).eq('role', 'leader').single();
    return (data as GroupMember) || { id: '', studentId: '', name: '', role: 'leader', joinedAt: '' };
  }

  async setGroupLeader(schoolId: string, id: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_group_members').update({ role: 'leader' }).eq('group_id', id).eq('student_id', studentId).eq('school_id', schoolId);
  }

  async autoAssignGroups(schoolId: string, courseId: string, _strategy: string): Promise<Group[]> {
    return this.findGroupsByCourse(schoolId, courseId);
  }

  async getGroupStatistics(schoolId: string, id: string): Promise<GroupStatistics> {
    const { count: totalGroups } = await this.supabase
      .from('lxp_groups').select('*', { count: 'exact', head: true }).eq('course_id', id).eq('school_id', schoolId);
    const { count: totalMembers } = await this.supabase
      .from('lxp_group_members').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    return { totalGroups: totalGroups || 0, averageSize: (totalGroups || 0) > 0 ? (totalMembers || 0) / (totalGroups || 0) : 0, completionRate: 0 };
  }

  async findMentoringById(schoolId: string, id: string): Promise<Mentoring | null> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpMentoringNotFoundError(id);
    return data as Mentoring | null;
  }

  async findAllMentoring(schoolId: string, query: MentoringQuery): Promise<PaginatedResult<Mentoring>> {
    let q = this.supabase.from('lxp_mentoring').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.mentorId) q = q.eq('mentor_id', query.mentorId);
    if (query.menteeId) q = q.eq('mentee_id', query.menteeId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Mentoring>(q, query.page, query.limit);
  }

  async createMentoring(schoolId: string, data: MentoringCreate): Promise<Mentoring> {
    const { data: mentoring, error } = await this.supabase
      .from('lxp_mentoring').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return mentoring as Mentoring;
  }

  async updateMentoring(schoolId: string, id: string, data: Partial<MentoringCreate>): Promise<Mentoring> {
    const { data: mentoring, error } = await this.supabase
      .from('lxp_mentoring').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpMentoringNotFoundError(id);
    return mentoring as Mentoring;
  }

  async deleteMentoring(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_mentoring').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpMentoringNotFoundError(id);
  }

  async findMentoringByMentor(schoolId: string, mentorId: string): Promise<Mentoring[]> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring').select('*').eq('mentor_id', mentorId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Mentoring[];
  }

  async findMentoringByMentee(schoolId: string, menteeId: string): Promise<Mentoring[]> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring').select('*').eq('mentee_id', menteeId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Mentoring[];
  }

  async startMentoring(schoolId: string, id: string): Promise<Mentoring> {
    return this.updateMentoring(schoolId, id, { status: 'active' } as Partial<MentoringCreate>);
  }

  async endMentoring(schoolId: string, id: string, _reason: string): Promise<void> {
    await this.updateMentoring(schoolId, id, { status: 'ended' } as Partial<MentoringCreate>);
  }

  async getMentoringSessions(schoolId: string, id: string): Promise<MentoringSession[]> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring_sessions').select('*').eq('mentoring_id', id).eq('school_id', schoolId).order('scheduled_at', { ascending: false });
    if (error) throw error;
    return (data || []) as MentoringSession[];
  }

  async scheduleMentoringSession(schoolId: string, id: string, session: MentoringSessionCreate): Promise<MentoringSession> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring_sessions').insert({ ...session, mentoring_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as MentoringSession;
  }

  async getMentoringGoals(schoolId: string, id: string): Promise<MentoringGoal[]> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring_goals').select('*').eq('mentoring_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as MentoringGoal[];
  }

  async addMentoringGoal(schoolId: string, id: string, goal: MentoringGoalCreate): Promise<MentoringGoal> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring_goals').insert({ ...goal, mentoring_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as MentoringGoal;
  }

  async getMentoringFeedback(schoolId: string, id: string): Promise<MentoringFeedback[]> {
    const { data, error } = await this.supabase
      .from('lxp_mentoring_feedback').select('*').eq('mentoring_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as MentoringFeedback[];
  }

  async findStudyGroupById(schoolId: string, id: string): Promise<StudyGroup | null> {
    const { data, error } = await this.supabase
      .from('lxp_study_groups').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpStudyGroupNotFoundError(id);
    return data as StudyGroup | null;
  }

  async findAllStudyGroups(schoolId: string, query: StudyGroupQuery): Promise<PaginatedResult<StudyGroup>> {
    let q = this.supabase.from('lxp_study_groups').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<StudyGroup>(q, query.page, query.limit);
  }

  async createStudyGroup(schoolId: string, data: StudyGroupCreate): Promise<StudyGroup> {
    const { data: sg, error } = await this.supabase
      .from('lxp_study_groups').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return sg as StudyGroup;
  }

  async updateStudyGroup(schoolId: string, id: string, data: Partial<StudyGroupCreate>): Promise<StudyGroup> {
    const { data: sg, error } = await this.supabase
      .from('lxp_study_groups').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpStudyGroupNotFoundError(id);
    return sg as StudyGroup;
  }

  async deleteStudyGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_study_groups').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpStudyGroupNotFoundError(id);
  }

  async getStudyGroupMembers(schoolId: string, id: string): Promise<StudyGroupMember[]> {
    const { data, error } = await this.supabase
      .from('lxp_study_group_members').select('*').eq('study_group_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as StudyGroupMember[];
  }

  async joinStudyGroup(schoolId: string, id: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_study_group_members').insert({ study_group_id: id, student_id: studentId, school_id: schoolId });
  }

  async leaveStudyGroup(schoolId: string, id: string, studentId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_study_group_members').delete().eq('study_group_id', id).eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getStudyGroupSessions(schoolId: string, id: string): Promise<StudySession[]> {
    const { data, error } = await this.supabase
      .from('lxp_study_sessions').select('*').eq('study_group_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as StudySession[];
  }

  async scheduleStudySession(schoolId: string, id: string, session: StudySessionCreate): Promise<StudySession> {
    const { data, error } = await this.supabase
      .from('lxp_study_sessions').insert({ ...session, study_group_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as StudySession;
  }

  async getStudyGroupSharedResources(schoolId: string, id: string): Promise<StudyResource[]> {
    const { data, error } = await this.supabase
      .from('lxp_study_resources').select('*').eq('study_group_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as StudyResource[];
  }

  async addStudyGroupResource(schoolId: string, id: string, resource: StudyResourceCreate): Promise<StudyResource> {
    const { data, error } = await this.supabase
      .from('lxp_study_resources').insert({ ...resource, study_group_id: id, school_id: schoolId }).select().single();
    if (error) throw error;
    return data as StudyResource;
  }

  async findStudyGroupsByStudent(schoolId: string, studentId: string): Promise<StudyGroup[]> {
    const { data } = await this.supabase
      .from('lxp_study_group_members').select('lxp_study_groups(*)').eq('student_id', studentId).eq('school_id', schoolId);
    return (data || []).map((d: Record<string, unknown>) => d.lxp_study_groups as StudyGroup).filter(Boolean);
  }

  async findProgressById(schoolId: string, id: string): Promise<Progress | null> {
    const { data, error } = await this.supabase
      .from('lxp_progress').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpProgressNotFoundError(id);
    return data as Progress | null;
  }

  async findAllProgress(schoolId: string, query: ProgressQuery): Promise<PaginatedResult<Progress>> {
    let q = this.supabase.from('lxp_progress').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    q = q.order(query.sortBy || 'updated_at', { ascending: false });
    return this.paginate<Progress>(q, query.page, query.limit);
  }

  async createProgress(schoolId: string, data: ProgressCreate): Promise<Progress> {
    const { data: progress, error } = await this.supabase
      .from('lxp_progress').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return progress as Progress;
  }

  async updateProgress(schoolId: string, id: string, data: Partial<ProgressCreate>): Promise<Progress> {
    const { data: progress, error } = await this.supabase
      .from('lxp_progress').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpProgressNotFoundError(id);
    return progress as Progress;
  }

  async deleteProgress(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_progress').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpProgressNotFoundError(id);
  }

  async findProgressByStudent(schoolId: string, studentId: string): Promise<Progress[]> {
    const { data, error } = await this.supabase
      .from('lxp_progress').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Progress[];
  }

  async findProgressByCourse(schoolId: string, courseId: string): Promise<Progress[]> {
    const { data, error } = await this.supabase
      .from('lxp_progress').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Progress[];
  }

  async getCourseProgress(schoolId: string, courseId: string, studentId: string): Promise<CourseProgress> {
    const { data } = await this.supabase
      .from('lxp_progress').select('*').eq('course_id', courseId).eq('student_id', studentId).eq('school_id', schoolId).single();
    return (data as CourseProgress) || { completedLessons: 0, totalLessons: 0, progress: 0, lastAccessed: '', timeSpent: 0 };
  }

  async getModuleProgress(schoolId: string, moduleId: string, studentId: string): Promise<ModuleProgress> {
    const { data } = await this.supabase
      .from('lxp_progress').select('*').eq('module_id', moduleId).eq('student_id', studentId).eq('school_id', schoolId).single();
    return (data as ModuleProgress) || { completedLessons: 0, totalLessons: 0, progress: 0 };
  }

  async getLessonProgressRecord(schoolId: string, lessonId: string, studentId: string): Promise<LessonProgress> {
    return this.getLessonProgress(schoolId, lessonId, studentId);
  }

  async updateLessonProgressRecord(schoolId: string, lessonId: string, studentId: string, data: ProgressUpdate): Promise<void> {
    await this.supabase.from('lxp_progress').upsert({ lesson_id: lessonId, student_id: studentId, school_id: schoolId, ...data });
  }

  async getOverallProgress(schoolId: string, studentId: string): Promise<OverallProgress> {
    const progress = await this.findProgressByStudent(schoolId, studentId);
    const completed = progress.filter((p) => (p as unknown as Record<string, unknown>).completed === true).length;
    return { coursesInProgress: progress.length - completed, coursesCompleted: completed, totalCredits: 0, averageProgress: progress.length > 0 ? (completed / progress.length) * 100 : 0 };
  }

  async getProgressHistory(schoolId: string, studentId: string, courseId: string): Promise<ProgressEntry[]> {
    const { data } = await this.supabase
      .from('lxp_progress_history').select('*').eq('student_id', studentId).eq('course_id', courseId).eq('school_id', schoolId).order('date');
    return (data || []) as ProgressEntry[];
  }

  async getTimeSpent(schoolId: string, studentId: string, courseId: string): Promise<number> {
    const { data } = await this.supabase
      .from('lxp_progress').select('time_spent').eq('student_id', studentId).eq('course_id', courseId).eq('school_id', schoolId);
    return (data || []).reduce((sum: number, d: Record<string, unknown>) => sum + ((d.time_spent as number) || 0), 0);
  }

  async getProgressStreak(schoolId: string, studentId: string): Promise<ProgressStreak> {
    return { current: 0, longest: 0, lastActive: '' };
  }

  async getLastActivity(schoolId: string, studentId: string): Promise<ProgressActivity | null> {
    const { data } = await this.supabase
      .from('lxp_progress').select('*').eq('student_id', studentId).eq('school_id', schoolId).order('updated_at', { ascending: false }).limit(1).single();
    return data as ProgressActivity | null;
  }

  async getDailyProgress(schoolId: string, studentId: string, dateRange: DateRange): Promise<DailyProgress[]> {
    const { data } = await this.supabase
      .from('lxp_daily_progress').select('*').eq('student_id', studentId).eq('school_id', schoolId).gte('date', dateRange.start).lte('date', dateRange.end).order('date');
    return (data || []) as DailyProgress[];
  }

  async findEngagementById(schoolId: string, id: string): Promise<Engagement | null> {
    const { data, error } = await this.supabase
      .from('lxp_engagement').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpEngagementNotFoundError(id);
    return data as Engagement | null;
  }

  async findAllEngagement(schoolId: string, query: EngagementQuery): Promise<PaginatedResult<Engagement>> {
    let q = this.supabase.from('lxp_engagement').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Engagement>(q, query.page, query.limit);
  }

  async createEngagement(schoolId: string, data: EngagementCreate): Promise<Engagement> {
    const { data: engagement, error } = await this.supabase
      .from('lxp_engagement').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return engagement as Engagement;
  }

  async updateEngagement(schoolId: string, id: string, data: Partial<EngagementCreate>): Promise<Engagement> {
    const { data: engagement, error } = await this.supabase
      .from('lxp_engagement').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpEngagementNotFoundError(id);
    return engagement as Engagement;
  }

  async deleteEngagement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_engagement').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpEngagementNotFoundError(id);
  }

  async findEngagementByStudent(schoolId: string, studentId: string): Promise<Engagement[]> {
    const { data, error } = await this.supabase
      .from('lxp_engagement').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Engagement[];
  }

  async findEngagementByCourse(schoolId: string, courseId: string): Promise<Engagement[]> {
    const { data, error } = await this.supabase
      .from('lxp_engagement').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Engagement[];
  }

  async trackEngagement(schoolId: string, data: EngagementTrack): Promise<void> {
    await this.supabase.from('lxp_engagement').insert({ ...data, school_id: schoolId, timestamp: new Date().toISOString() });
  }

  async getEngagementScore(schoolId: string, courseId: string, studentId: string): Promise<number> {
    const { data } = await this.supabase
      .from('lxp_engagement').select('value').eq('course_id', courseId).eq('student_id', studentId).eq('school_id', schoolId);
    const values = (data || []).map((d: Record<string, unknown>) => (d.value as number) || 0);
    return values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
  }

  async getEngagementTrend(schoolId: string, courseId: string, studentId: string): Promise<EngagementTrend[]> {
    const { data } = await this.supabase
      .from('lxp_engagement').select('timestamp, value').eq('course_id', courseId).eq('student_id', studentId).eq('school_id', schoolId).order('timestamp');
    return (data || []).map((d: Record<string, unknown>) => ({ date: d.timestamp as string, score: (d.value as number) || 0, activity: 1 }));
  }

  async getTopEngaged(schoolId: string, courseId: string, limit: number): Promise<EngagementLeaderboard[]> {
    const { data } = await this.supabase
      .from('lxp_engagement').select('student_id').eq('course_id', courseId).eq('school_id', schoolId).order('value', { ascending: false }).limit(limit);
    return (data || []).map((d: Record<string, unknown>, i: number) => ({ studentId: d.student_id as string, name: '', score: 0, rank: i + 1 }));
  }

  async getRiskStudents(schoolId: string, courseId: string): Promise<EngagementRisk[]> {
    return [];
  }

  async getEngagementMetrics(schoolId: string, courseId: string): Promise<EngagementMetrics> {
    const engagement = await this.findEngagementByCourse(schoolId, courseId);
    const uniqueStudents = [...new Set(engagement.map((e) => e.studentId))].length;
    return { averageScore: 0, activeStudents: uniqueStudents, completionRate: 0, dropoffRate: 0 };
  }

  async findAnalyticsById(schoolId: string, id: string): Promise<Analytics | null> {
    const { data, error } = await this.supabase
      .from('lxp_analytics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpAnalyticsNotFoundError(id);
    return data as Analytics | null;
  }

  async findAllAnalytics(schoolId: string, query: AnalyticsQuery): Promise<PaginatedResult<Analytics>> {
    let q = this.supabase.from('lxp_analytics').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.type) q = q.eq('type', query.type);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Analytics>(q, query.page, query.limit);
  }

  async createAnalytics(schoolId: string, data: AnalyticsCreate): Promise<Analytics> {
    const { data: analytics, error } = await this.supabase
      .from('lxp_analytics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return analytics as Analytics;
  }

  async updateAnalytics(schoolId: string, id: string, data: Partial<AnalyticsCreate>): Promise<Analytics> {
    const { data: analytics, error } = await this.supabase
      .from('lxp_analytics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpAnalyticsNotFoundError(id);
    return analytics as Analytics;
  }

  async deleteAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_analytics').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpAnalyticsNotFoundError(id);
  }

  async getCourseAnalytics(schoolId: string, courseId: string): Promise<CourseAnalytics> {
    const enrollmentCount = await this.getCourseEnrollmentCount(schoolId, courseId);
    return { enrollmentCount, completionRate: 0, averageScore: 0, averageRating: 0, revenue: 0, timeSpent: 0 };
  }

  async getStudentAnalytics(schoolId: string, studentId: string): Promise<StudentAnalytics> {
    const progress = await this.findProgressByStudent(schoolId, studentId);
    return { coursesEnrolled: progress.length, coursesCompleted: progress.filter((p) => (p as unknown as Record<string, unknown>).completed).length, averageScore: 0, timeSpent: 0, achievements: 0 };
  }

  async getInstructorAnalytics(schoolId: string, instructorId: string): Promise<InstructorAnalytics> {
    return { coursesTeaching: 0, totalStudents: 0, averageRating: 0, revenue: 0, contentCreated: 0 };
  }

  async getSchoolAnalytics(schoolId: string): Promise<SchoolAnalytics> {
    return { totalStudents: 0, totalInstructors: 0, totalCourses: 0, revenue: 0, completionRate: 0 };
  }

  async getRealTimeMetrics(schoolId: string): Promise<RealTimeMetrics> {
    return { activeUsers: 0, activeSessions: 0, currentEnrollments: 0, lastUpdated: new Date().toISOString() };
  }

  async generateAnalyticsReport(schoolId: string, reportType: AnalyticsReportType, params: AnalyticsReportParams): Promise<AnalyticsReport> {
    return { id: '', type: reportType, data: params as unknown as Record<string, unknown>, generatedAt: new Date().toISOString(), downloadUrl: '' };
  }

  async getAnalyticsTrends(schoolId: string, metric: string, dateRange: DateRange): Promise<TrendData[]> {
    return [];
  }

  async getAnalyticsComparisons(schoolId: string, ids: string[]): Promise<AnalyticsComparison[]> {
    return ids.map((id) => ({ id, name: '', metrics: {} }));
  }

  async getAnalyticsPredictions(schoolId: string, courseId: string): Promise<AnalyticsPrediction[]> {
    return [];
  }

  async exportAnalyticsData(schoolId: string, _format: ExportFormat, _query: AnalyticsQuery): Promise<string> {
    return '';
  }

  async getAnalyticsHeatmap(schoolId: string, courseId: string): Promise<AnalyticsHeatmap> {
    return { hours: [], days: [], values: [] };
  }

  async findPointsById(schoolId: string, id: string): Promise<Points | null> {
    const { data, error } = await this.supabase
      .from('lxp_points').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpPointsNotFoundError(id);
    return data as Points | null;
  }

  async findAllPoints(schoolId: string, query: PointsQuery): Promise<PaginatedResult<Points>> {
    let q = this.supabase.from('lxp_points').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Points>(q, query.page, query.limit);
  }

  async createPoints(schoolId: string, data: PointsCreate): Promise<Points> {
    const { data: points, error } = await this.supabase
      .from('lxp_points').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return points as Points;
  }

  async updatePoints(schoolId: string, id: string, data: Partial<PointsCreate>): Promise<Points> {
    const { data: points, error } = await this.supabase
      .from('lxp_points').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpPointsNotFoundError(id);
    return points as Points;
  }

  async deletePoints(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_points').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpPointsNotFoundError(id);
  }

  async findPointsByStudent(schoolId: string, studentId: string): Promise<Points[]> {
    const { data, error } = await this.supabase
      .from('lxp_points').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Points[];
  }

  async awardPoints(schoolId: string, studentId: string, points: number, reason: string): Promise<Points> {
    return this.createPoints(schoolId, { studentId, points, reason, category: 'award' } as PointsCreate);
  }

  async deductPoints(schoolId: string, studentId: string, points: number, reason: string): Promise<Points> {
    return this.createPoints(schoolId, { studentId, points: -points, reason, category: 'deduction' } as PointsCreate);
  }

  async getPointsBalance(schoolId: string, studentId: string): Promise<number> {
    const points = await this.findPointsByStudent(schoolId, studentId);
    return points.reduce((sum, p) => sum + ((p as unknown as Record<string, unknown>).points as number), 0);
  }

  async getPointsHistory(schoolId: string, studentId: string): Promise<Points[]> {
    return this.findPointsByStudent(schoolId, studentId);
  }

  async getTopPointsEarners(schoolId: string, limit: number): Promise<PointsLeaderboard[]> {
    const { data } = await this.supabase
      .from('lxp_points').select('student_id').eq('school_id', schoolId).order('points', { ascending: false }).limit(limit);
    return (data || []).map((d: Record<string, unknown>, i: number) => ({ studentId: d.student_id as string, name: '', points: 0, rank: i + 1 }));
  }

  async getPointsByCategory(schoolId: string, studentId: string): Promise<Record<string, number>> {
    const points = await this.findPointsByStudent(schoolId, studentId);
    const result: Record<string, number> = {};
    for (const p of points) {
      const cat = (p as unknown as Record<string, unknown>).category as string;
      result[cat] = (result[cat] || 0) + ((p as unknown as Record<string, unknown>).points as number);
    }
    return result;
  }

  async getPointsByCourse(schoolId: string, courseId: string): Promise<Points[]> {
    const { data, error } = await this.supabase
      .from('lxp_points').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Points[];
  }

  async findXPById(schoolId: string, id: string): Promise<XP | null> {
    const { data, error } = await this.supabase
      .from('lxp_xp').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpXPNotFoundError(id);
    return data as XP | null;
  }

  async findAllXP(schoolId: string, query: XPQuery): Promise<PaginatedResult<XP>> {
    let q = this.supabase.from('lxp_xp').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<XP>(q, query.page, query.limit);
  }

  async createXP(schoolId: string, data: XPCreate): Promise<XP> {
    const { data: xp, error } = await this.supabase
      .from('lxp_xp').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return xp as XP;
  }

  async updateXP(schoolId: string, id: string, data: Partial<XPCreate>): Promise<XP> {
    const { data: xp, error } = await this.supabase
      .from('lxp_xp').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpXPNotFoundError(id);
    return xp as XP;
  }

  async deleteXP(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_xp').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpXPNotFoundError(id);
  }

  async findXPByStudent(schoolId: string, studentId: string): Promise<XP[]> {
    const { data, error } = await this.supabase
      .from('lxp_xp').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as XP[];
  }

  async awardXP(schoolId: string, studentId: string, xp: number, reason: string): Promise<XP> {
    return this.createXP(schoolId, { studentId, xp, reason, source: 'manual' } as XPCreate);
  }

  async getTotalXP(schoolId: string, studentId: string): Promise<number> {
    const xp = await this.findXPByStudent(schoolId, studentId);
    return xp.reduce((sum, x) => sum + ((x as unknown as Record<string, unknown>).xp as number), 0);
  }

  async getXPHistory(schoolId: string, studentId: string): Promise<XP[]> {
    return this.findXPByStudent(schoolId, studentId);
  }

  async getXPLeaderboard(schoolId: string, limit: number): Promise<XPLeaderboard[]> {
    const { data } = await this.supabase
      .from('lxp_xp').select('student_id').eq('school_id', schoolId).order('xp', { ascending: false }).limit(limit);
    return (data || []).map((d: Record<string, unknown>, i: number) => ({ studentId: d.student_id as string, name: '', xp: 0, level: 0, rank: i + 1 }));
  }

  async getDailyXP(schoolId: string, studentId: string): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await this.supabase
      .from('lxp_xp').select('xp').eq('student_id', studentId).eq('school_id', schoolId).gte('created_at', today);
    return (data || []).reduce((sum: number, d: Record<string, unknown>) => sum + ((d.xp as number) || 0), 0);
  }

  async getWeeklyXP(schoolId: string, studentId: string): Promise<number> {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { data } = await this.supabase
      .from('lxp_xp').select('xp').eq('student_id', studentId).eq('school_id', schoolId).gte('created_at', weekAgo.toISOString());
    return (data || []).reduce((sum: number, d: Record<string, unknown>) => sum + ((d.xp as number) || 0), 0);
  }

  async getXPMultipliers(schoolId: string, studentId: string): Promise<XPMultiplier[]> {
    const { data } = await this.supabase
      .from('lxp_xp_multipliers').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    return (data || []) as XPMultiplier[];
  }

  async applyXPMultiplier(schoolId: string, studentId: string, multiplier: XPMultiplierCreate): Promise<void> {
    await this.supabase.from('lxp_xp_multipliers').insert({ ...multiplier, student_id: studentId, school_id: schoolId });
  }

  async findLevelById(schoolId: string, id: string): Promise<Level | null> {
    const { data, error } = await this.supabase
      .from('lxp_levels').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpLevelNotFoundError(id);
    return data as Level | null;
  }

  async findAllLevels(schoolId: string, query: LevelQuery): Promise<PaginatedResult<Level>> {
    let q = this.supabase.from('lxp_levels').select('*', { count: 'exact' }).eq('school_id', schoolId);
    q = q.order(query.sortBy || 'level', { ascending: true });
    return this.paginate<Level>(q, query.page, query.limit);
  }

  async createLevel(schoolId: string, data: LevelCreate): Promise<Level> {
    const { data: level, error } = await this.supabase
      .from('lxp_levels').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return level as Level;
  }

  async updateLevel(schoolId: string, id: string, data: Partial<LevelCreate>): Promise<Level> {
    const { data: level, error } = await this.supabase
      .from('lxp_levels').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLevelNotFoundError(id);
    return level as Level;
  }

  async deleteLevel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_levels').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpLevelNotFoundError(id);
  }

  async getStudentLevel(schoolId: string, studentId: string): Promise<Level> {
    const totalXP = await this.getTotalXP(schoolId, studentId);
    const { data } = await this.supabase
      .from('lxp_levels').select('*').eq('school_id', schoolId).lte('xp_required', totalXP).order('xp_required', { ascending: false }).limit(1).single();
    return (data as Level) || { id: '', level: 1, title: 'Beginner', xpRequired: 0, rewards: [] };
  }

  async getLevelRequirements(schoolId: string, level: number): Promise<LevelRequirements> {
    const { data } = await this.supabase
      .from('lxp_levels').select('*').eq('school_id', schoolId).eq('level', level).single();
    return { xpRequired: ((data as unknown as Record<string, unknown>)?.xp_required as number) || 0, coursesRequired: 0, badgesRequired: 0 };
  }

  async getNextLevel(schoolId: string, studentId: string): Promise<Level | null> {
    const current = await this.getStudentLevel(schoolId, studentId);
    const { data } = await this.supabase
      .from('lxp_levels').select('*').eq('school_id', schoolId).gt('level', (current as unknown as Record<string, unknown>).level as number).order('level', { ascending: true }).limit(1).single();
    return data as Level | null;
  }

  async getLevelProgress(schoolId: string, studentId: string): Promise<LevelProgress> {
    const totalXP = await this.getTotalXP(schoolId, studentId);
    const nextLevel = await this.getNextLevel(schoolId, studentId);
    const requiredXP = nextLevel ? ((nextLevel as unknown as Record<string, unknown>).xp_required as number) : totalXP;
    return { currentXP: totalXP, requiredXP, percentage: requiredXP > 0 ? (totalXP / requiredXP) * 100 : 100 };
  }

  async getLevelHistory(schoolId: string, studentId: string): Promise<LevelHistory[]> {
    const { data } = await this.supabase
      .from('lxp_level_history').select('*').eq('student_id', studentId).eq('school_id', schoolId).order('achieved_at', { ascending: false });
    return (data || []) as LevelHistory[];
  }

  async getLevelDistribution(schoolId: string): Promise<LevelDistribution[]> {
    const { data } = await this.supabase
      .from('lxp_levels').select('*').eq('school_id', schoolId).order('level');
    return (data || []).map((d: Record<string, unknown>) => ({ level: d.level as number, count: 0, percentage: 0 }));
  }

  async checkLevelUp(schoolId: string, studentId: string): Promise<boolean> {
    const progress = await this.getLevelProgress(schoolId, studentId);
    return progress.percentage >= 100;
  }

  async findAchievementById(schoolId: string, id: string): Promise<Achievement | null> {
    const { data, error } = await this.supabase
      .from('lxp_achievements').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpAchievementNotFoundError(id);
    return data as Achievement | null;
  }

  async findAllAchievements(schoolId: string, query: AchievementQuery): Promise<PaginatedResult<Achievement>> {
    let q = this.supabase.from('lxp_achievements').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Achievement>(q, query.page, query.limit);
  }

  async createAchievement(schoolId: string, data: AchievementCreate): Promise<Achievement> {
    const { data: achievement, error } = await this.supabase
      .from('lxp_achievements').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return achievement as Achievement;
  }

  async updateAchievement(schoolId: string, id: string, data: Partial<AchievementCreate>): Promise<Achievement> {
    const { data: achievement, error } = await this.supabase
      .from('lxp_achievements').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpAchievementNotFoundError(id);
    return achievement as Achievement;
  }

  async deleteAchievement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_achievements').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpAchievementNotFoundError(id);
  }

  async findAchievementsByStudent(schoolId: string, studentId: string): Promise<Achievement[]> {
    const { data } = await this.supabase
      .from('lxp_achievement_awards').select('lxp_achievements(*)').eq('student_id', studentId).eq('school_id', schoolId);
    return (data || []).map((d: Record<string, unknown>) => d.lxp_achievements as Achievement).filter(Boolean);
  }

  async awardAchievement(schoolId: string, achievementId: string, studentId: string): Promise<AchievementAward> {
    const { data, error } = await this.supabase
      .from('lxp_achievement_awards').insert({ achievement_id: achievementId, student_id: studentId, school_id: schoolId, awarded_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as AchievementAward;
  }

  async revokeAchievement(schoolId: string, achievementId: string, studentId: string, _reason: string): Promise<void> {
    await this.supabase.from('lxp_achievement_awards').delete().eq('achievement_id', achievementId).eq('student_id', studentId).eq('school_id', schoolId);
  }

  async getEarnedAchievements(schoolId: string, studentId: string): Promise<Achievement[]> {
    return this.findAchievementsByStudent(schoolId, studentId);
  }

  async getAchievementProgress(schoolId: string, achievementId: string, studentId: string): Promise<AchievementProgress> {
    return { current: 0, required: 1, percentage: 0 };
  }

  async getAchievementStatistics(schoolId: string, achievementId: string): Promise<AchievementStatistics> {
    const { count: totalAwards } = await this.supabase
      .from('lxp_achievement_awards').select('*', { count: 'exact', head: true }).eq('achievement_id', achievementId).eq('school_id', schoolId);
    return { totalAwards: totalAwards || 0, uniqueEarners: totalAwards || 0, averageTimeToEarn: 0 };
  }

  async findAchievementsByCategory(schoolId: string, categoryId: string): Promise<Achievement[]> {
    const { data, error } = await this.supabase
      .from('lxp_achievements').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Achievement[];
  }

  async getRecentlyEarnedAchievements(schoolId: string, limit: number): Promise<AchievementAward[]> {
    const { data, error } = await this.supabase
      .from('lxp_achievement_awards').select('*').eq('school_id', schoolId).order('awarded_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as AchievementAward[];
  }

  async findLeaderboardById(schoolId: string, id: string): Promise<Leaderboard | null> {
    const { data, error } = await this.supabase
      .from('lxp_leaderboards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpLeaderboardNotFoundError(id);
    return data as Leaderboard | null;
  }

  async findAllLeaderboards(schoolId: string, query: LeaderboardQuery): Promise<PaginatedResult<Leaderboard>> {
    let q = this.supabase.from('lxp_leaderboards').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.type) q = q.eq('type', query.type);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Leaderboard>(q, query.page, query.limit);
  }

  async createLeaderboard(schoolId: string, data: LeaderboardCreate): Promise<Leaderboard> {
    const { data: lb, error } = await this.supabase
      .from('lxp_leaderboards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return lb as Leaderboard;
  }

  async updateLeaderboard(schoolId: string, id: string, data: Partial<LeaderboardCreate>): Promise<Leaderboard> {
    const { data: lb, error } = await this.supabase
      .from('lxp_leaderboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLeaderboardNotFoundError(id);
    return lb as Leaderboard;
  }

  async deleteLeaderboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_leaderboards').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpLeaderboardNotFoundError(id);
  }

  async getCourseLeaderboard(schoolId: string, courseId: string): Promise<LeaderboardEntry[]> {
    const { data } = await this.supabase
      .from('lxp_xp').select('student_id').eq('school_id', schoolId).order('xp', { ascending: false });
    return (data || []).map((d: Record<string, unknown>, i: number) => ({ rank: i + 1, studentId: d.student_id as string, name: '', score: 0, avatar: '' }));
  }

  async getSchoolLeaderboard(schoolId: string): Promise<LeaderboardEntry[]> {
    return this.getCourseLeaderboard(schoolId, '');
  }

  async getStudentRank(schoolId: string, courseId: string, studentId: string): Promise<LeaderboardRank> {
    const entries = await this.getCourseLeaderboard(schoolId, courseId);
    const entry = entries.find((e) => e.studentId === studentId);
    return { rank: entry?.rank || 0, score: entry?.score || 0, totalParticipants: entries.length };
  }

  async getTopPerformers(schoolId: string, courseId: string, limit: number): Promise<LeaderboardEntry[]> {
    const entries = await this.getCourseLeaderboard(schoolId, courseId);
    return entries.slice(0, limit);
  }

  async getLeaderboardHistory(schoolId: string, courseId: string, studentId: string): Promise<LeaderboardHistory[]> {
    return [];
  }

  async updateLeaderboardScores(schoolId: string, courseId: string): Promise<void> {
    // Recalculate scores
  }

  async getLeaderboardByType(schoolId: string, type: LeaderboardType): Promise<LeaderboardEntry[]> {
    const { data } = await this.supabase
      .from('lxp_leaderboards').select('*').eq('school_id', schoolId).eq('type', type);
    return (data || []).map((d: Record<string, unknown>, i: number) => ({ rank: i + 1, studentId: '', name: d.name as string, score: 0, avatar: '' }));
  }

  async getSeasonLeaderboard(schoolId: string, seasonId: string): Promise<LeaderboardEntry[]> {
    return [];
  }

  async findChallengeById(schoolId: string, id: string): Promise<Challenge | null> {
    const { data, error } = await this.supabase
      .from('lxp_challenges').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpChallengeNotFoundError(id);
    return data as Challenge | null;
  }

  async findAllChallenges(schoolId: string, query: ChallengeQuery): Promise<PaginatedResult<Challenge>> {
    let q = this.supabase.from('lxp_challenges').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Challenge>(q, query.page, query.limit);
  }

  async createChallenge(schoolId: string, data: ChallengeCreate): Promise<Challenge> {
    const { data: challenge, error } = await this.supabase
      .from('lxp_challenges').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return challenge as Challenge;
  }

  async updateChallenge(schoolId: string, id: string, data: Partial<ChallengeCreate>): Promise<Challenge> {
    const { data: challenge, error } = await this.supabase
      .from('lxp_challenges').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpChallengeNotFoundError(id);
    return challenge as Challenge;
  }

  async deleteChallenge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_challenges').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpChallengeNotFoundError(id);
  }

  async findChallengesByCourse(schoolId: string, courseId: string): Promise<Challenge[]> {
    const { data, error } = await this.supabase
      .from('lxp_challenges').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Challenge[];
  }

  async getChallengeParticipants(schoolId: string, id: string): Promise<ChallengeParticipant[]> {
    const { data, error } = await this.supabase
      .from('lxp_challenge_participants').select('*').eq('challenge_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as ChallengeParticipant[];
  }

  async joinChallenge(schoolId: string, id: string, studentId: string): Promise<void> {
    await this.supabase.from('lxp_challenge_participants').insert({ challenge_id: id, student_id: studentId, school_id: schoolId, joined_at: new Date().toISOString() });
  }

  async leaveChallenge(schoolId: string, id: string, studentId: string): Promise<void> {
    const { error } = await this.supabase
      .from('lxp_challenge_participants').delete().eq('challenge_id', id).eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
  }

  async getChallengeLeaderboard(schoolId: string, id: string): Promise<ChallengeLeaderboard[]> {
    const { data } = await this.supabase
      .from('lxp_challenge_participants').select('*').eq('challenge_id', id).eq('school_id', schoolId).order('score', { ascending: false });
    return (data || []).map((d: Record<string, unknown>, i: number) => ({ rank: i + 1, studentId: d.student_id as string, name: '', score: (d.score as number) || 0 }));
  }

  async submitChallenge(schoolId: string, id: string, studentId: string, submission: ChallengeSubmission): Promise<void> {
    await this.supabase.from('lxp_challenge_submissions').insert({ challenge_id: id, student_id: studentId, school_id: schoolId, ...submission });
  }

  async getChallengeProgress(schoolId: string, id: string, studentId: string): Promise<ChallengeProgress> {
    const { data } = await this.supabase
      .from('lxp_challenge_participants').select('*').eq('challenge_id', id).eq('student_id', studentId).eq('school_id', schoolId).single();
    const participant = data as unknown as Record<string, unknown> | null;
    return { completed: (participant?.completed as boolean) || false, currentScore: (participant?.score as number) || 0, targetScore: 100, percentage: participant ? ((participant.score as number) || 0) : 0 };
  }

  async getActiveChallenges(schoolId: string): Promise<Challenge[]> {
    const { data, error } = await this.supabase
      .from('lxp_challenges').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return (data || []) as Challenge[];
  }

  async getCompletedChallenges(schoolId: string, studentId: string): Promise<Challenge[]> {
    const { data } = await this.supabase
      .from('lxp_challenge_participants').select('lxp_challenges(*)').eq('student_id', studentId).eq('school_id', schoolId).eq('completed', true);
    return (data || []).map((d: Record<string, unknown>) => d.lxp_challenges as Challenge).filter(Boolean);
  }

  async getChallengeStatistics(schoolId: string, id: string): Promise<ChallengeStatistics> {
    const { count: totalParticipants } = await this.supabase
      .from('lxp_challenge_participants').select('*', { count: 'exact', head: true }).eq('challenge_id', id).eq('school_id', schoolId);
    return { totalParticipants: totalParticipants || 0, completionRate: 0, averageScore: 0 };
  }

  async findRewardById(schoolId: string, id: string): Promise<Reward | null> {
    const { data, error } = await this.supabase
      .from('lxp_rewards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpRewardNotFoundError(id);
    return data as Reward | null;
  }

  async findAllRewards(schoolId: string, query: RewardQuery): Promise<PaginatedResult<Reward>> {
    let q = this.supabase.from('lxp_rewards').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Reward>(q, query.page, query.limit);
  }

  async createReward(schoolId: string, data: RewardCreate): Promise<Reward> {
    const { data: reward, error } = await this.supabase
      .from('lxp_rewards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return reward as Reward;
  }

  async updateReward(schoolId: string, id: string, data: Partial<RewardCreate>): Promise<Reward> {
    const { data: reward, error } = await this.supabase
      .from('lxp_rewards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpRewardNotFoundError(id);
    return reward as Reward;
  }

  async deleteReward(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_rewards').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpRewardNotFoundError(id);
  }

  async findRewardsByCategory(schoolId: string, categoryId: string): Promise<Reward[]> {
    const { data, error } = await this.supabase
      .from('lxp_rewards').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Reward[];
  }

  async redeemReward(schoolId: string, rewardId: string, studentId: string): Promise<RewardRedemption> {
    const { data, error } = await this.supabase
      .from('lxp_reward_redemptions').insert({ reward_id: rewardId, student_id: studentId, school_id: schoolId, redeemed_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as RewardRedemption;
  }

  async getAvailableRewards(schoolId: string, studentId: string): Promise<Reward[]> {
    const { data, error } = await this.supabase
      .from('lxp_rewards').select('*').eq('school_id', schoolId).gt('stock', 0);
    if (error) throw error;
    return (data || []) as Reward[];
  }

  async getRedeemedRewards(schoolId: string, studentId: string): Promise<RewardRedemption[]> {
    const { data, error } = await this.supabase
      .from('lxp_reward_redemptions').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as RewardRedemption[];
  }

  async getRewardCost(schoolId: string, rewardId: string): Promise<number> {
    const reward = await this.findRewardById(schoolId, rewardId);
    if (!reward) throw new LxpRewardNotFoundError(rewardId);
    return ((reward as unknown as Record<string, unknown>).cost as number) || 0;
  }

  async canAffordReward(schoolId: string, rewardId: string, studentId: string): Promise<boolean> {
    const cost = await this.getRewardCost(schoolId, rewardId);
    const balance = await this.getPointsBalance(schoolId, studentId);
    return balance >= cost;
  }

  async getRewardCatalog(schoolId: string): Promise<Reward[]> {
    const { data, error } = await this.supabase
      .from('lxp_rewards').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return (data || []) as Reward[];
  }

  async getRewardStatistics(schoolId: string, rewardId: string): Promise<RewardStatistics> {
    const { count: totalRedemptions } = await this.supabase
      .from('lxp_reward_redemptions').select('*', { count: 'exact', head: true }).eq('reward_id', rewardId).eq('school_id', schoolId);
    return { totalRedemptions: totalRedemptions || 0, totalPointsSpent: 0, averageRedemptionTime: 0 };
  }

  async findMarketplaceListingById(schoolId: string, id: string): Promise<MarketplaceListing | null> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_listings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpMarketplaceNotFoundError(id);
    return data as MarketplaceListing | null;
  }

  async findAllMarketplaceListings(schoolId: string, query: MarketplaceQuery): Promise<PaginatedResult<MarketplaceListing>> {
    let q = this.supabase.from('lxp_marketplace_listings').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.category) q = q.eq('category_id', query.category);
    if (query.publisherId) q = q.eq('publisher_id', query.publisherId);
    if (query.search) q = q.ilike('title', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<MarketplaceListing>(q, query.page, query.limit);
  }

  async createMarketplaceListing(schoolId: string, data: MarketplaceCreate): Promise<MarketplaceListing> {
    const { data: listing, error } = await this.supabase
      .from('lxp_marketplace_listings').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return listing as MarketplaceListing;
  }

  async updateMarketplaceListing(schoolId: string, id: string, data: Partial<MarketplaceCreate>): Promise<MarketplaceListing> {
    const { data: listing, error } = await this.supabase
      .from('lxp_marketplace_listings').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpMarketplaceNotFoundError(id);
    return listing as MarketplaceListing;
  }

  async deleteMarketplaceListing(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_marketplace_listings').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpMarketplaceNotFoundError(id);
  }

  async findMarketplaceListingsByCategory(schoolId: string, categoryId: string): Promise<MarketplaceListing[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_listings').select('*').eq('category_id', categoryId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as MarketplaceListing[];
  }

  async findMarketplaceListingsByPublisher(schoolId: string, publisherId: string): Promise<MarketplaceListing[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_listings').select('*').eq('publisher_id', publisherId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as MarketplaceListing[];
  }

  async searchMarketplace(schoolId: string, query: string): Promise<MarketplaceListing[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_listings').select('*').eq('school_id', schoolId).ilike('title', `%${query}%`);
    if (error) throw error;
    return (data || []) as MarketplaceListing[];
  }

  async getFeaturedMarketplace(schoolId: string): Promise<MarketplaceListing[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_listings').select('*').eq('school_id', schoolId).eq('featured', true);
    if (error) throw error;
    return (data || []) as MarketplaceListing[];
  }

  async getPopularMarketplace(schoolId: string, limit: number): Promise<MarketplaceListing[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_listings').select('*').eq('school_id', schoolId).order('sales_count', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as MarketplaceListing[];
  }

  async getNewReleasesMarketplace(schoolId: string, limit: number): Promise<MarketplaceListing[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_listings').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as MarketplaceListing[];
  }

  async purchaseMarketplaceListing(schoolId: string, listingId: string, buyerId: string): Promise<MarketplacePurchase> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_purchases').insert({ listing_id: listingId, buyer_id: buyerId, school_id: schoolId, purchased_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as MarketplacePurchase;
  }

  async getMarketplaceReviews(schoolId: string, listingId: string): Promise<Review[]> {
    return this.findReviewsByCourse(schoolId, listingId);
  }

  async addMarketplaceReview(schoolId: string, listingId: string, review: ReviewCreate): Promise<Review> {
    return this.createReview(schoolId, { ...review, course_id: listingId } as ReviewCreate);
  }

  async getMarketplaceSales(schoolId: string, publisherId: string): Promise<MarketplaceSale[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_sales').select('*').eq('publisher_id', publisherId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as MarketplaceSale[];
  }

  async getMarketplaceEarnings(schoolId: string, publisherId: string): Promise<MarketplaceEarnings> {
    return this.getPublisherEarnings(schoolId, publisherId) as unknown as Promise<MarketplaceEarnings>;
  }

  async getMarketplacePurchases(schoolId: string, buyerId: string): Promise<MarketplacePurchase[]> {
    const { data, error } = await this.supabase
      .from('lxp_marketplace_purchases').select('*').eq('buyer_id', buyerId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as MarketplacePurchase[];
  }

  async findPublisherById(schoolId: string, id: string): Promise<Publisher | null> {
    const { data, error } = await this.supabase
      .from('lxp_publishers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpPublisherNotFoundError(id);
    return data as Publisher | null;
  }

  async findAllPublishers(schoolId: string, query: PublisherQuery): Promise<PaginatedResult<Publisher>> {
    let q = this.supabase.from('lxp_publishers').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.search) q = q.ilike('name', `%${query.search}%`);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Publisher>(q, query.page, query.limit);
  }

  async createPublisher(schoolId: string, data: PublisherCreate): Promise<Publisher> {
    const { data: publisher, error } = await this.supabase
      .from('lxp_publishers').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return publisher as Publisher;
  }

  async updatePublisher(schoolId: string, id: string, data: Partial<PublisherCreate>): Promise<Publisher> {
    const { data: publisher, error } = await this.supabase
      .from('lxp_publishers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpPublisherNotFoundError(id);
    return publisher as Publisher;
  }

  async deletePublisher(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_publishers').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpPublisherNotFoundError(id);
  }

  async getPublisherCourses(schoolId: string, id: string): Promise<Course[]> {
    const { data, error } = await this.supabase
      .from('lxp_courses').select('*').eq('publisher_id', id).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Course[];
  }

  async getPublisherRevenue(schoolId: string, id: string): Promise<PublisherRevenue> {
    return { totalRevenue: 0, thisMonth: 0, averagePerCourse: 0 };
  }

  async getPublisherStatistics(schoolId: string, id: string): Promise<PublisherStatistics> {
    const courses = await this.getPublisherCourses(schoolId, id);
    return { totalCourses: courses.length, totalStudents: 0, averageRating: 0, revenue: 0 };
  }

  async getPublisherSalesHistory(schoolId: string, id: string): Promise<PublisherSale[]> {
    return this.getMarketplaceSales(schoolId, id) as unknown as Promise<PublisherSale[]>;
  }

  async getPublisherEarnings(schoolId: string, id: string): Promise<PublisherEarnings> {
    return { total: 0, pending: 0, paid: 0 };
  }

  async verifyPublisher(schoolId: string, id: string): Promise<boolean> {
    const publisher = await this.findPublisherById(schoolId, id);
    return publisher !== null;
  }

  async getTopPublishers(schoolId: string, limit: number): Promise<Publisher[]> {
    const { data, error } = await this.supabase
      .from('lxp_publishers').select('*').eq('school_id', schoolId).order('rating', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as Publisher[];
  }

  async findPublisherByUser(schoolId: string, userId: string): Promise<Publisher | null> {
    const { data, error } = await this.supabase
      .from('lxp_publishers').select('*').eq('user_id', userId).eq('school_id', schoolId).single();
    if (error) return null;
    return data as Publisher | null;
  }

  async findLicenseById(schoolId: string, id: string): Promise<License | null> {
    const { data, error } = await this.supabase
      .from('lxp_licenses').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpLicenseNotFoundError(id);
    return data as License | null;
  }

  async findAllLicenses(schoolId: string, query: LicenseQuery): Promise<PaginatedResult<License>> {
    let q = this.supabase.from('lxp_licenses').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.buyerId) q = q.eq('buyer_id', query.buyerId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<License>(q, query.page, query.limit);
  }

  async createLicense(schoolId: string, data: LicenseCreate): Promise<License> {
    const { data: license, error } = await this.supabase
      .from('lxp_licenses').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return license as License;
  }

  async updateLicense(schoolId: string, id: string, data: Partial<LicenseCreate>): Promise<License> {
    const { data: license, error } = await this.supabase
      .from('lxp_licenses').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpLicenseNotFoundError(id);
    return license as License;
  }

  async deleteLicense(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_licenses').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpLicenseNotFoundError(id);
  }

  async findLicensesByCourse(schoolId: string, courseId: string): Promise<License[]> {
    const { data, error } = await this.supabase
      .from('lxp_licenses').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as License[];
  }

  async findLicensesByBuyer(schoolId: string, buyerId: string): Promise<License[]> {
    const { data, error } = await this.supabase
      .from('lxp_licenses').select('*').eq('buyer_id', buyerId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as License[];
  }

  async validateLicense(schoolId: string, id: string): Promise<boolean> {
    const license = await this.findLicenseById(schoolId, id);
    return license !== null && (license as unknown as Record<string, unknown>).status === 'active';
  }

  async activateLicense(schoolId: string, id: string): Promise<License> {
    return this.updateLicense(schoolId, id, { status: 'active' } as Partial<LicenseCreate>);
  }

  async deactivateLicense(schoolId: string, id: string): Promise<License> {
    return this.updateLicense(schoolId, id, { status: 'inactive' } as Partial<LicenseCreate>);
  }

  async transferLicense(schoolId: string, id: string, newOwnerId: string): Promise<License> {
    return this.updateLicense(schoolId, id, { buyer_id: newOwnerId } as Partial<LicenseCreate>);
  }

  async getActiveLicenses(schoolId: string): Promise<License[]> {
    const { data, error } = await this.supabase
      .from('lxp_licenses').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return (data || []) as License[];
  }

  async getExpiringLicenses(schoolId: string, daysUntilExpiry: number): Promise<License[]> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
    const { data, error } = await this.supabase
      .from('lxp_licenses').select('*').eq('school_id', schoolId).eq('status', 'active').lte('expires_at', expiryDate.toISOString());
    if (error) throw error;
    return (data || []) as License[];
  }

  async getLicenseUsage(schoolId: string, id: string): Promise<LicenseUsage> {
    const license = await this.findLicenseById(schoolId, id);
    if (!license) throw new LxpLicenseNotFoundError(id);
    return { activeUsers: 0, maxUsers: ((license as unknown as Record<string, unknown>).max_users as number) || 0, lastAccessed: '' };
  }

  async findReviewById(schoolId: string, id: string): Promise<Review | null> {
    const { data, error } = await this.supabase
      .from('lxp_reviews').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpReviewNotFoundError(id);
    return data as Review | null;
  }

  async findAllReviews(schoolId: string, query: ReviewQuery): Promise<PaginatedResult<Review>> {
    let q = this.supabase.from('lxp_reviews').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    if (query.studentId) q = q.eq('student_id', query.studentId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<Review>(q, query.page, query.limit);
  }

  async createReview(schoolId: string, data: ReviewCreate): Promise<Review> {
    const { data: review, error } = await this.supabase
      .from('lxp_reviews').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return review as Review;
  }

  async updateReview(schoolId: string, id: string, data: Partial<ReviewCreate>): Promise<Review> {
    const { data: review, error } = await this.supabase
      .from('lxp_reviews').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpReviewNotFoundError(id);
    return review as Review;
  }

  async deleteReview(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_reviews').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpReviewNotFoundError(id);
  }

  async findReviewsByCourse(schoolId: string, courseId: string): Promise<Review[]> {
    const { data, error } = await this.supabase
      .from('lxp_reviews').select('*').eq('course_id', courseId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Review[];
  }

  async findReviewsByStudent(schoolId: string, studentId: string): Promise<Review[]> {
    const { data, error } = await this.supabase
      .from('lxp_reviews').select('*').eq('student_id', studentId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as Review[];
  }

  async getReviewAverageRating(schoolId: string, courseId: string): Promise<number> {
    const reviews = await this.findReviewsByCourse(schoolId, courseId);
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + ((r as unknown as Record<string, unknown>).rating as number), 0) / reviews.length;
  }

  async getReviewRatingDistribution(schoolId: string, courseId: string): Promise<RatingDistribution> {
    const reviews = await this.findReviewsByCourse(schoolId, courseId);
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of reviews) {
      const rating = (r as unknown as Record<string, unknown>).rating as number;
      distribution[rating] = (distribution[rating] || 0) + 1;
    }
    return { average: reviews.length > 0 ? reviews.reduce((sum, r) => sum + ((r as unknown as Record<string, unknown>).rating as number), 0) / reviews.length : 0, total: reviews.length, distribution };
  }

  async flagReview(schoolId: string, id: string, reason: string): Promise<void> {
    await this.supabase.from('lxp_reviews').update({ flagged: true, flag_reason: reason }).eq('id', id).eq('school_id', schoolId);
  }

  async approveReview(schoolId: string, id: string): Promise<void> {
    await this.supabase.from('lxp_reviews').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
  }

  async rejectReview(schoolId: string, id: string, reason: string): Promise<void> {
    await this.supabase.from('lxp_reviews').update({ status: 'rejected', rejection_reason: reason }).eq('id', id).eq('school_id', schoolId);
  }

  async getFlaggedReviews(schoolId: string): Promise<Review[]> {
    const { data, error } = await this.supabase
      .from('lxp_reviews').select('*').eq('school_id', schoolId).eq('flagged', true);
    if (error) throw error;
    return (data || []) as Review[];
  }

  async getRecentReviews(schoolId: string, limit: number): Promise<Review[]> {
    const { data, error } = await this.supabase
      .from('lxp_reviews').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return (data || []) as Review[];
  }

  async findRevenueShareById(schoolId: string, id: string): Promise<RevenueShare | null> {
    const { data, error } = await this.supabase
      .from('lxp_revenue_shares').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new LxpRevenueShareNotFoundError(id);
    return data as RevenueShare | null;
  }

  async findAllRevenueShares(schoolId: string, query: RevenueShareQuery): Promise<PaginatedResult<RevenueShare>> {
    let q = this.supabase.from('lxp_revenue_shares').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (query.publisherId) q = q.eq('publisher_id', query.publisherId);
    if (query.courseId) q = q.eq('course_id', query.courseId);
    q = q.order(query.sortBy || 'created_at', { ascending: false });
    return this.paginate<RevenueShare>(q, query.page, query.limit);
  }

  async createRevenueShare(schoolId: string, data: RevenueShareCreate): Promise<RevenueShare> {
    const { data: rs, error } = await this.supabase
      .from('lxp_revenue_shares').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return rs as RevenueShare;
  }

  async updateRevenueShare(schoolId: string, id: string, data: Partial<RevenueShareCreate>): Promise<RevenueShare> {
    const { data: rs, error } = await this.supabase
      .from('lxp_revenue_shares').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new LxpRevenueShareNotFoundError(id);
    return rs as RevenueShare;
  }

  async deleteRevenueShare(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('lxp_revenue_shares').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw new LxpRevenueShareNotFoundError(id);
  }

  async findRevenueSharesByPublisher(schoolId: string, publisherId: string): Promise<RevenueShare[]> {
    const { data, error } = await this.supabase
      .from('lxp_revenue_shares').select('*').eq('publisher_id', publisherId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as RevenueShare[];
  }

  async findRevenueShareByCourse(schoolId: string, courseId: string): Promise<RevenueShare | null> {
    const { data, error } = await this.supabase
      .from('lxp_revenue_shares').select('*').eq('course_id', courseId).eq('school_id', schoolId).single();
    if (error) return null;
    return data as RevenueShare | null;
  }

  async calculateRevenue(schoolId: string, courseId: string, dateRange: DateRange): Promise<RevenueCalculation> {
    return { total: 0, platformShare: 0, publisherShare: 0, period: dateRange };
  }

  async getRevenuePayments(schoolId: string, publisherId: string): Promise<RevenuePayment[]> {
    const { data, error } = await this.supabase
      .from('lxp_revenue_payments').select('*').eq('publisher_id', publisherId).eq('school_id', schoolId);
    if (error) throw error;
    return (data || []) as RevenuePayment[];
  }

  async getRevenueEarnings(schoolId: string, publisherId: string, dateRange: DateRange): Promise<RevenueEarnings> {
    return { total: 0, thisMonth: 0, lastMonth: 0, growth: 0 };
  }

  async getTotalRevenue(schoolId: string, dateRange: DateRange): Promise<number> {
    return 0;
  }

  async getRevenueByCategory(schoolId: string, dateRange: DateRange): Promise<RevenueByCategory[]> {
    return [];
  }

  async getMonthlyRevenueReport(schoolId: string, publisherId: string, year: number, month: number): Promise<RevenueReport> {
    return { month, year, totalRevenue: 0, platformShare: 0, publisherShare: 0, topCourses: [] };
  }

  async getTopRevenueCourses(schoolId: string, limit: number): Promise<RevenueCourseRanking[]> {
    return [];
  }

  async getPaymentSchedule(schoolId: string, publisherId: string): Promise<PaymentSchedule[]> {
    return [];
  }

  async processPayout(schoolId: string, publisherId: string, amount: number): Promise<RevenuePayment> {
    const { data, error } = await this.supabase
      .from('lxp_revenue_payments').insert({ publisher_id: publisherId, amount, school_id: schoolId, status: 'processed', processed_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return data as RevenuePayment;
  }
}
