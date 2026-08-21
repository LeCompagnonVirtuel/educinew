import { SupabaseClient } from '@supabase/supabase-js';
import type {
  Course,
  CourseQuery,
  CourseCreate,
  CourseUpdate,
  CourseModule,
  ModuleCreate,
  ModuleUpdate,
  Lesson,
  LessonCreate,
  LessonUpdate,
  Chapter,
  ChapterCreate,
  Unit,
  UnitCreate,
  Topic,
  TopicCreate,
  CourseVersion,
  CourseTemplate,
  CourseTemplateQuery,
  Video,
  Audio,
  PDF,
  H5PContent,
  LearningPath,
  LearningPathQuery,
  LearningPathCreate,
  LearningPathUpdate,
  AdaptivePath,
  CompetencyPath,
  Assignment,
  AssignmentQuery,
  AssignmentCreate,
  AssignmentUpdate,
  Homework,
  Project,
  Rubric,
  PeerReview,
  GroupAssignment,
  Submission,
  SubmissionCreate,
  Quiz,
  QuizCreate,
  QuizUpdate,
  QuestionBank,
  QuestionBankQuery,
  Question,
  QuestionCreate,
  QuizAttempt,
  Certificate,
  CertificateCreate,
  Badge,
  BadgeCreate,
  MicroCredential,
  Competency,
  Skill,
  Verification,
  LiveSession,
  LiveSessionQuery,
  LiveSessionCreate,
  VirtualClassroom,
  Recording,
  Attendance,
  Community,
  Group,
  Mentoring,
  StudyGroup,
  Progress,
  MarketplaceListing,
  License,
  LicenseCreate,
  Review,
  RevenueShare,
  RevenueShareCreate,
  ProgressCreate,
} from '@educi/types';


export interface XAPIStatementCreate {
  actor: { mbox: string; name: string };
  verb: { id: string; display: Record<string, string> };
  object: { id: string; definition: Record<string, unknown> };
  result?: Record<string, unknown>;
  context?: Record<string, unknown>;
  timestamp: string;
}

export interface VerificationCreate {
  credentialId: string;
  method: string;
  status: string;
  verifiedBy: string;
  verifiedAt: string;
  evidence?: Record<string, unknown>;
}

export interface CourseStatistics {
  totalStudents: number;
  completionRate: number;
  averageRating: number;
  totalRevenue: number;
  enrollmentTrend: Array<{ date: string; count: number }>;
  ratingDistribution: Record<string, number>;
  topModules: Array<{ id: string; title: string; completionRate: number }>;
  dropoffPoints: Array<{ moduleId: string; dropRate: number }>;
}
// ---- Locally defined types not in @educi/types ----
export interface ModuleQuery { search?: string; page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; }
export interface LessonQuery { search?: string; page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; }
export interface ChapterQuery { search?: string; page?: number; limit?: number; }
export interface ChapterUpdate { title?: string; content?: string; order?: number; }
export interface UnitQuery { search?: string; page?: number; limit?: number; }
export interface UnitUpdate { title?: string; content?: string; order?: number; }
export interface TopicQuery { search?: string; page?: number; limit?: number; }
export interface TopicUpdate { title?: string; description?: string; }
export interface CourseVersionQuery { page?: number; limit?: number; }
export interface CourseVersionCreate { courseId: string; version: number; changes: string[]; }
export interface CourseTemplateCreate { name: string; description: string; structure: Record<string, unknown>; }
export interface VideoQuery { page?: number; limit?: number; }
export interface VideoCreate { title: string; url: string; courseId: string; }
export interface VideoUpdate { title?: string; url?: string; }
export interface AudioQuery { page?: number; limit?: number; }
export interface AudioCreate { title: string; url: string; courseId: string; }
export interface AudioUpdate { title?: string; url?: string; }
export interface PDFQuery { page?: number; limit?: number; }
export interface PDFCreate { title: string; url: string; courseId: string; }
export interface PDFUpdate { title?: string; url?: string; }
export interface SCORM { id: string; courseId: string; manifestUrl: string; status: string; schoolId: string; }
export interface SCORMQuery { page?: number; limit?: number; }
export interface SCORMCreate { courseId: string; manifestUrl: string; }
export interface XAPIStatement { id: string; actor: Record<string, unknown>; verb: Record<string, unknown>; object: Record<string, unknown>; timestamp: string; schoolId: string; }
export interface XAPIQuery { page?: number; limit?: number; }
export interface H5PCreate { title: string; contentId: string; courseId: string; }
export interface H5PQuery { page?: number; limit?: number; }
export interface EPUB { id: string; title: string; url: string; courseId: string; schoolId: string; }
export interface EPUBQuery { page?: number; limit?: number; }
export interface EPUBCreate { title: string; url: string; courseId: string; }
export interface OfflineContent { id: string; courseId: string; data: Record<string, unknown>; schoolId: string; }
export interface OfflineQuery { page?: number; limit?: number; }
export interface OfflineCreate { courseId: string; data: Record<string, unknown>; }
export interface AdaptivePathQuery { page?: number; limit?: number; }
export interface AdaptivePathCreate { title: string; courseId: string; rules: Record<string, unknown>[]; }
export interface CompetencyPathQuery { page?: number; limit?: number; }
export interface CompetencyPathCreate { title: string; competencies: Record<string, unknown>[]; }
export interface HomeworkQuery { page?: number; limit?: number; }
export interface HomeworkCreate { title: string; courseId: string; dueDate: string; }
export interface HomeworkUpdate { title?: string; dueDate?: string; }
export interface ProjectQuery { page?: number; limit?: number; }
export interface ProjectCreate { title: string; courseId: string; description: string; }
export interface ProjectUpdate { title?: string; description?: string; }
export interface RubricQuery { page?: number; limit?: number; }
export interface RubricCreate { title: string; criteria: Record<string, unknown>[]; }
export interface RubricUpdate { title?: string; criteria?: Record<string, unknown>[]; }
export interface PeerReviewQuery { page?: number; limit?: number; }
export interface PeerReviewCreate { submissionId: string; reviewerId: string; }
export interface GroupAssignmentQuery { page?: number; limit?: number; }
export interface GroupAssignmentCreate { title: string; courseId: string; }
export interface SubmissionQuery { page?: number; limit?: number; }
export interface SubmissionUpdate { status?: string; grade?: number; feedback?: string; }
export interface QuizQuery { page?: number; limit?: number; }
export interface QuestionBankCreate { name: string; courseId: string; }
export interface QuestionQuery { page?: number; limit?: number; }
export interface QuestionUpdate { text?: string; choices?: Record<string, unknown>[]; }
export interface QuizAttemptQuery { page?: number; limit?: number; }
export interface CertificateQuery { page?: number; limit?: number; }
export interface BadgeQuery { page?: number; limit?: number; }
export interface BadgeUpdate { title?: string; description?: string; }
export interface MicroCredentialQuery { page?: number; limit?: number; }
export interface MicroCredentialCreate { title: string; description: string; requirements: Record<string, unknown>[]; }
export interface CompetencyQuery { page?: number; limit?: number; }
export interface CompetencyCreate { name: string; description: string; }
export interface SkillQuery { page?: number; limit?: number; }
export interface SkillCreate { name: string; category: string; }
export interface VerificationQuery { page?: number; limit?: number; }
export interface LiveSessionUpdate { title?: string; scheduledAt?: string; status?: string; }
export interface VirtualClassroomQuery { page?: number; limit?: number; }
export interface VirtualClassroomCreate { title: string; courseId: string; }
export interface RecordingCreate { sessionId: string; url: string; }
export interface RecordingQuery { page?: number; limit?: number; }
export interface AttendanceQuery { page?: number; limit?: number; }
export interface AttendanceCreate { studentId: string; sessionId: string; status: string; }
export interface Forum { id: string; title: string; courseId: string; schoolId: string; }
export interface ForumQuery { page?: number; limit?: number; }
export interface ForumCreate { title: string; courseId: string; }
export interface ForumUpdate { title?: string; }
export interface CommunityQuery { page?: number; limit?: number; }
export interface CommunityCreate { name: string; description: string; }
export interface GroupQuery { page?: number; limit?: number; }
export interface GroupCreate { name: string; courseId: string; }
export interface GroupUpdate { name?: string; }
export interface MentoringQuery { page?: number; limit?: number; }
export interface MentoringCreate { mentorId: string; studentId: string; }
export interface StudyGroupQuery { page?: number; limit?: number; }
export interface StudyGroupCreate { name: string; courseId: string; }
export interface ProgressQuery { page?: number; limit?: number; }
export interface EngagementQuery { page?: number; limit?: number; }
export interface AnalyticsQuery { page?: number; limit?: number; }
export interface PointsQuery { page?: number; limit?: number; }
export interface XPQuery { page?: number; limit?: number; }
export interface LevelQuery { page?: number; limit?: number; }
export interface AchievementQuery { page?: number; limit?: number; }
export interface LeaderboardQuery { page?: number; limit?: number; }
export interface ChallengeQuery { page?: number; limit?: number; }
export interface RewardQuery { page?: number; limit?: number; }
export interface MarketplaceQuery { page?: number; limit?: number; }
export interface MarketplaceCreate { title: string; description: string; price: number; }
export interface Publisher { id: string; name: string; schoolId: string; }
export interface PublisherQuery { page?: number; limit?: number; }
export interface PublisherCreate { name: string; }
export interface LicenseQuery { page?: number; limit?: number; }
export interface ReviewQuery { page?: number; limit?: number; }
export interface ReviewCreate { courseId: string; rating: number; comment: string; }
export interface RevenueShareQuery { page?: number; limit?: number; }

export interface AssignmentDueDate { studentId: string; deadline: string; extended: boolean; }
export interface AssignmentStatistics { totalSubmissions: number; averageGrade: number; onTimeRate: number; }
export interface LessonResource { id: string; title: string; url: string; type: string; }
export interface LessonAttachment { id: string; name: string; url: string; size: number; }
export interface CourseTemplateStructure { modules: Array<{ title: string; lessons: string[] }>; }
export interface VideoTranscriptSegment { startTime: number; endTime: number; text: string; }
export interface AudioTranscriptSegment { startTime: number; endTime: number; text: string; }
export interface SCORMResource { identifier: string; title: string; type: string; href: string; }

export interface LxpCourseRepository {
  findById(schoolId: string, id: string): Promise<Course | null>;
  findAll(schoolId: string, query: CourseQuery): Promise<PaginatedResult<Course>>;
  create(schoolId: string, data: CourseCreate): Promise<Course>;
  update(schoolId: string, id: string, data: CourseUpdate): Promise<Course>;
  delete(schoolId: string, id: string): Promise<void>;
  findBySlug(schoolId: string, slug: string): Promise<Course | null>;
  findByInstructor(schoolId: string, instructorId: string, query: CourseQuery): Promise<PaginatedResult<Course>>;
  findByCategory(schoolId: string, categoryId: string, query: CourseQuery): Promise<PaginatedResult<Course>>;
  findPublished(schoolId: string, query: CourseQuery): Promise<PaginatedResult<Course>>;
  findDraft(schoolId: string, query: CourseQuery): Promise<PaginatedResult<Course>>;
  archive(schoolId: string, id: string): Promise<Course>;
  publish(schoolId: string, id: string): Promise<Course>;
  unpublish(schoolId: string, id: string): Promise<Course>;
  duplicate(schoolId: string, id: string, newTitle: string): Promise<Course>;
  findByEnrollment(schoolId: string, studentId: string): Promise<Course[]>;
  getEnrollmentCount(schoolId: string, id: string): Promise<number>;
  getModules(schoolId: string, id: string): Promise<CourseModule[]>;
  reorderModules(schoolId: string, id: string, moduleIds: string[]): Promise<void>;
  updateSettings(schoolId: string, id: string, settings: Record<string, unknown>): Promise<Course>;
  getStatistics(schoolId: string, id: string): Promise<CourseStatistics>;
  findFeatured(schoolId: string, limit: number): Promise<Course[]>;
  searchFullText(schoolId: string, query: string): Promise<Course[]>;
}

export interface LxpModuleRepository {
  findById(schoolId: string, id: string): Promise<CourseModule | null>;
  findAll(schoolId: string, query: ModuleQuery): Promise<PaginatedResult<CourseModule>>;
  create(schoolId: string, data: ModuleCreate): Promise<CourseModule>;
  update(schoolId: string, id: string, data: ModuleUpdate): Promise<CourseModule>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<CourseModule[]>;
  reorder(schoolId: string, courseId: string, moduleIds: string[]): Promise<void>;
  getLessons(schoolId: string, id: string): Promise<Lesson[]>;
  getCompletionRate(schoolId: string, id: string): Promise<number>;
  getEstimatedDuration(schoolId: string, id: string): Promise<number>;
  duplicate(schoolId: string, id: string, courseId: string): Promise<CourseModule>;
  findByIds(schoolId: string, ids: string[]): Promise<CourseModule[]>;
  countByCourse(schoolId: string, courseId: string): Promise<number>;
}

export interface LxpLessonRepository {
  findById(schoolId: string, id: string): Promise<Lesson | null>;
  findAll(schoolId: string, query: LessonQuery): Promise<PaginatedResult<Lesson>>;
  create(schoolId: string, data: LessonCreate): Promise<Lesson>;
  update(schoolId: string, id: string, data: LessonUpdate): Promise<Lesson>;
  delete(schoolId: string, id: string): Promise<void>;
  findByModule(schoolId: string, moduleId: string): Promise<Lesson[]>;
  reorder(schoolId: string, moduleId: string, lessonIds: string[]): Promise<void>;
  getContent(schoolId: string, id: string): Promise<LessonContent>;
  getProgress(schoolId: string, id: string, studentId: string): Promise<LessonProgress>;
  markComplete(schoolId: string, id: string, studentId: string): Promise<void>;
  getPrerequisites(schoolId: string, id: string): Promise<Lesson[]>;
  duplicate(schoolId: string, id: string, moduleId: string): Promise<Lesson>;
  countByModule(schoolId: string, moduleId: string): Promise<number>;
  getEstimatedDuration(schoolId: string, id: string): Promise<number>;
  findPublic(schoolId: string, query: LessonQuery): Promise<PaginatedResult<Lesson>>;
}

export interface LxpChapterRepository {
  findById(schoolId: string, id: string): Promise<Chapter | null>;
  findAll(schoolId: string, query: ChapterQuery): Promise<PaginatedResult<Chapter>>;
  create(schoolId: string, data: ChapterCreate): Promise<Chapter>;
  update(schoolId: string, id: string, data: ChapterUpdate): Promise<Chapter>;
  delete(schoolId: string, id: string): Promise<void>;
  findByLesson(schoolId: string, lessonId: string): Promise<Chapter[]>;
  reorder(schoolId: string, lessonId: string, chapterIds: string[]): Promise<void>;
  getContent(schoolId: string, id: string): Promise<ChapterContent>;
  getWordCount(schoolId: string, id: string): Promise<number>;
  getReadingTime(schoolId: string, id: string): Promise<number>;
}

export interface LxpUnitRepository {
  findById(schoolId: string, id: string): Promise<Unit | null>;
  findAll(schoolId: string, query: UnitQuery): Promise<PaginatedResult<Unit>>;
  create(schoolId: string, data: UnitCreate): Promise<Unit>;
  update(schoolId: string, id: string, data: UnitUpdate): Promise<Unit>;
  delete(schoolId: string, id: string): Promise<void>;
  findByChapter(schoolId: string, chapterId: string): Promise<Unit[]>;
  reorder(schoolId: string, chapterId: string, unitIds: string[]): Promise<void>;
  getContent(schoolId: string, id: string): Promise<UnitContent>;
  getEstimatedDuration(schoolId: string, id: string): Promise<number>;
  countByChapter(schoolId: string, chapterId: string): Promise<number>;
}

export interface LxpTopicRepository {
  findById(schoolId: string, id: string): Promise<Topic | null>;
  findAll(schoolId: string, query: TopicQuery): Promise<PaginatedResult<Topic>>;
  create(schoolId: string, data: TopicCreate): Promise<Topic>;
  update(schoolId: string, id: string, data: TopicUpdate): Promise<Topic>;
  delete(schoolId: string, id: string): Promise<void>;
  findByUnit(schoolId: string, unitId: string): Promise<Topic[]>;
  getRelatedTopics(schoolId: string, id: string): Promise<Topic[]>;
  getSubTopics(schoolId: string, id: string): Promise<Topic[]>;
  countByUnit(schoolId: string, unitId: string): Promise<number>;
  searchByName(schoolId: string, query: string): Promise<Topic[]>;
}

export interface LxpCourseVersionRepository {
  findById(schoolId: string, id: string): Promise<CourseVersion | null>;
  findAll(schoolId: string, query: CourseVersionQuery): Promise<PaginatedResult<CourseVersion>>;
  create(schoolId: string, data: CourseVersionCreate): Promise<CourseVersion>;
  findByCourse(schoolId: string, courseId: string): Promise<CourseVersion[]>;
  getLatest(schoolId: string, courseId: string): Promise<CourseVersion | null>;
  getPublished(schoolId: string, courseId: string): Promise<CourseVersion | null>;
  publish(schoolId: string, id: string): Promise<CourseVersion>;
  archive(schoolId: string, id: string): Promise<CourseVersion>;
  getChangelog(schoolId: string, courseId: string): Promise<string[]>;
  compare(schoolId: string, versionAId: string, versionBId: string): Promise<VersionDiff>;
}

export interface LxpCourseTemplateRepository {
  findById(schoolId: string, id: string): Promise<CourseTemplate | null>;
  findAll(schoolId: string, query: CourseTemplateQuery): Promise<PaginatedResult<CourseTemplate>>;
  create(schoolId: string, data: CourseTemplateCreate): Promise<CourseTemplate>;
  update(schoolId: string, id: string, data: Partial<CourseTemplateCreate>): Promise<CourseTemplate>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCategory(schoolId: string, categoryId: string): Promise<CourseTemplate[]>;
  findFeatured(schoolId: string): Promise<CourseTemplate[]>;
  clone(schoolId: string, id: string, newTitle: string): Promise<CourseTemplate>;
  getPreview(schoolId: string, id: string): Promise<CourseTemplatePreview>;
  incrementUsage(schoolId: string, id: string): Promise<void>;
  searchByName(schoolId: string, query: string): Promise<CourseTemplate[]>;
}

export interface LxpVideoRepository {
  findById(schoolId: string, id: string): Promise<Video | null>;
  findAll(schoolId: string, query: VideoQuery): Promise<PaginatedResult<Video>>;
  create(schoolId: string, data: VideoCreate): Promise<Video>;
  update(schoolId: string, id: string, data: VideoUpdate): Promise<Video>;
  delete(schoolId: string, id: string): Promise<void>;
  findByLesson(schoolId: string, lessonId: string): Promise<Video[]>;
  findByUploader(schoolId: string, uploaderId: string): Promise<Video[]>;
  getStreamUrl(schoolId: string, id: string): Promise<string>;
  getThumbnailUrl(schoolId: string, id: string): Promise<string>;
  getTranscript(schoolId: string, id: string): Promise<VideoTranscript>;
  getChapters(schoolId: string, id: string): Promise<VideoChapter[]>;
  process(schoolId: string, id: string): Promise<void>;
  getStatus(schoolId: string, id: string): Promise<VideoStatus>;
  getViews(schoolId: string, id: string): Promise<number>;
  getAnalytics(schoolId: string, id: string): Promise<VideoAnalytics>;
  findPopular(schoolId: string, limit: number): Promise<Video[]>;
}

export interface LxpAudioRepository {
  findById(schoolId: string, id: string): Promise<Audio | null>;
  findAll(schoolId: string, query: AudioQuery): Promise<PaginatedResult<Audio>>;
  create(schoolId: string, data: AudioCreate): Promise<Audio>;
  update(schoolId: string, id: string, data: AudioUpdate): Promise<Audio>;
  delete(schoolId: string, id: string): Promise<void>;
  findByLesson(schoolId: string, lessonId: string): Promise<Audio[]>;
  getStreamUrl(schoolId: string, id: string): Promise<string>;
  getTranscript(schoolId: string, id: string): Promise<AudioTranscript>;
  getDuration(schoolId: string, id: string): Promise<number>;
  getWaveformData(schoolId: string, id: string): Promise<number[]>;
  process(schoolId: string, id: string): Promise<void>;
  findPopular(schoolId: string, limit: number): Promise<Audio[]>;
}

export interface LxpPDFRepository {
  findById(schoolId: string, id: string): Promise<PDF | null>;
  findAll(schoolId: string, query: PDFQuery): Promise<PaginatedResult<PDF>>;
  create(schoolId: string, data: PDFCreate): Promise<PDF>;
  update(schoolId: string, id: string, data: PDFUpdate): Promise<PDF>;
  delete(schoolId: string, id: string): Promise<void>;
  getDownloadUrl(schoolId: string, id: string): Promise<string>;
  getPreviewUrl(schoolId: string, id: string): Promise<string>;
  getTextContent(schoolId: string, id: string): Promise<string>;
  getAnnotations(schoolId: string, id: string): Promise<PDFAnnotation[]>;
  addAnnotation(schoolId: string, id: string, annotation: PDFAnnotationCreate): Promise<PDFAnnotation>;
  getPages(schoolId: string, id: string): Promise<number>;
  extractText(schoolId: string, id: string): Promise<string>;
}

export interface LxpSCORMRepository {
  findById(schoolId: string, id: string): Promise<SCORM | null>;
  findAll(schoolId: string, query: SCORMQuery): Promise<PaginatedResult<SCORM>>;
  create(schoolId: string, data: SCORMCreate): Promise<SCORM>;
  update(schoolId: string, id: string, data: Partial<SCORMCreate>): Promise<SCORM>;
  delete(schoolId: string, id: string): Promise<void>;
  getLaunchUrl(schoolId: string, id: string): Promise<string>;
  getManifest(schoolId: string, id: string): Promise<SCORMManifest>;
  getStatus(schoolId: string, id: string, studentId: string): Promise<SCORMStatus>;
  getCompletionData(schoolId: string, id: string, studentId: string): Promise<SCORMCompletionData>;
  getScore(schoolId: string, id: string, studentId: string): Promise<SCORMScore>;
  resetProgress(schoolId: string, id: string, studentId: string): Promise<void>;
  getSuspendData(schoolId: string, id: string, studentId: string): Promise<string>;
  processPackage(schoolId: string, id: string): Promise<void>;
}

export interface LxpXAPIRepository {
  findById(schoolId: string, id: string): Promise<XAPIStatement | null>;
  findAll(schoolId: string, query: XAPIQuery): Promise<PaginatedResult<XAPIStatement>>;
  create(schoolId: string, data: XAPIStatementCreate): Promise<XAPIStatement>;
  findByActor(schoolId: string, actorId: string): Promise<XAPIStatement[]>;
  findByVerb(schoolId: string, verb: string): Promise<XAPIStatement[]>;
  findByObject(schoolId: string, objectId: string): Promise<XAPIStatement[]>;
  findByDateRange(schoolId: string, range: DateRange): Promise<XAPIStatement[]>;
  getActorProfile(schoolId: string, actorId: string): Promise<ActorProfile>;
  getObjectActivities(schoolId: string, objectId: string): Promise<XAPIActivity[]>;
  aggregateScores(schoolId: string, activityId: string): Promise<ScoreAggregate>;
  verifyIntegrity(schoolId: string, id: string): Promise<boolean>;
  getStatementCount(schoolId: string, query: XAPIQuery): Promise<number>;
}

export interface LxpH5PRepository {
  findById(schoolId: string, id: string): Promise<H5PContent | null>;
  findAll(schoolId: string, query: H5PQuery): Promise<PaginatedResult<H5PContent>>;
  create(schoolId: string, data: H5PCreate): Promise<H5PContent>;
  update(schoolId: string, id: string, data: Partial<H5PCreate>): Promise<H5PContent>;
  delete(schoolId: string, id: string): Promise<void>;
  getEmbedUrl(schoolId: string, id: string): Promise<string>;
  getResult(schoolId: string, id: string, studentId: string): Promise<H5PResult>;
  getLibraries(schoolId: string): Promise<H5PLibrary[]>;
  getContentTypes(schoolId: string): Promise<H5PContentType[]>;
  validate(schoolId: string, data: H5PCreate): Promise<boolean>;
  getParameters(schoolId: string, id: string): Promise<Record<string, unknown>>;
  setParameters(schoolId: string, id: string, params: Record<string, unknown>): Promise<void>;
}

export interface LxpEPUBRepository {
  findById(schoolId: string, id: string): Promise<EPUB | null>;
  findAll(schoolId: string, query: EPUBQuery): Promise<PaginatedResult<EPUB>>;
  create(schoolId: string, data: EPUBCreate): Promise<EPUB>;
  update(schoolId: string, id: string, data: Partial<EPUBCreate>): Promise<EPUB>;
  delete(schoolId: string, id: string): Promise<void>;
  getChapters(schoolId: string, id: string): Promise<EPUBChapter[]>;
  getMetadata(schoolId: string, id: string): Promise<EPUBMetadata>;
  getTOC(schoolId: string, id: string): Promise<EPUBTOC[]>;
  getReadingProgress(schoolId: string, id: string, studentId: string): Promise<EPUBProgress>;
  updateReadingProgress(schoolId: string, id: string, studentId: string, progress: EPUBProgressUpdate): Promise<void>;
  getHighlights(schoolId: string, id: string, studentId: string): Promise<EPUBHighlight[]>;
  addHighlight(schoolId: string, id: string, studentId: string, highlight: EPUBHighlightCreate): Promise<EPUBHighlight>;
}

export interface LxpOfflineRepository {
  findById(schoolId: string, id: string): Promise<OfflineContent | null>;
  findAll(schoolId: string, query: OfflineQuery): Promise<PaginatedResult<OfflineContent>>;
  create(schoolId: string, data: OfflineCreate): Promise<OfflineContent>;
  update(schoolId: string, id: string, data: Partial<OfflineCreate>): Promise<OfflineContent>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<OfflineContent[]>;
  sync(schoolId: string, id: string): Promise<void>;
  getStatus(schoolId: string, id: string): Promise<OfflineSyncStatus>;
  downloadForOffline(schoolId: string, id: string, studentId: string): Promise<void>;
  getDownloadedContent(schoolId: string, studentId: string): Promise<OfflineContent[]>;
  removeOffline(schoolId: string, id: string, studentId: string): Promise<void>;
  getStorageUsage(schoolId: string, studentId: string): Promise<OfflineStorageUsage>;
}

export interface LxpLearningPathRepository {
  findById(schoolId: string, id: string): Promise<LearningPath | null>;
  findAll(schoolId: string, query: LearningPathQuery): Promise<PaginatedResult<LearningPath>>;
  create(schoolId: string, data: LearningPathCreate): Promise<LearningPath>;
  update(schoolId: string, id: string, data: LearningPathUpdate): Promise<LearningPath>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<LearningPath[]>;
  getCourses(schoolId: string, id: string): Promise<Course[]>;
  addCourse(schoolId: string, id: string, courseId: string): Promise<void>;
  removeCourse(schoolId: string, id: string, courseId: string): Promise<void>;
  reorderCourses(schoolId: string, id: string, courseIds: string[]): Promise<void>;
  getProgress(schoolId: string, id: string, studentId: string): Promise<LearningPathProgress>;
  enroll(schoolId: string, id: string, studentId: string): Promise<void>;
  getEnrolledStudents(schoolId: string, id: string): Promise<string[]>;
  getCompletionRate(schoolId: string, id: string): Promise<number>;
  getPrerequisites(schoolId: string, id: string): Promise<LearningPathPrerequisite[]>;
  publish(schoolId: string, id: string): Promise<LearningPath>;
  archive(schoolId: string, id: string): Promise<LearningPath>;
}

export interface LxpAdaptivePathRepository {
  findById(schoolId: string, id: string): Promise<AdaptivePath | null>;
  findAll(schoolId: string, query: AdaptivePathQuery): Promise<PaginatedResult<AdaptivePath>>;
  create(schoolId: string, data: AdaptivePathCreate): Promise<AdaptivePath>;
  update(schoolId: string, id: string, data: Partial<AdaptivePathCreate>): Promise<AdaptivePath>;
  delete(schoolId: string, id: string): Promise<void>;
  getRules(schoolId: string, id: string): Promise<AdaptiveRule[]>;
  addRule(schoolId: string, id: string, rule: AdaptiveRuleCreate): Promise<AdaptiveRule>;
  evaluate(schoolId: string, id: string, studentId: string): Promise<AdaptiveDecision>;
  getRecommendations(schoolId: string, id: string, studentId: string): Promise<Course[]>;
  getStudentPath(schoolId: string, id: string, studentId: string): Promise<AdaptiveStudentPath>;
  updateProgress(schoolId: string, id: string, studentId: string, progress: AdaptiveProgressUpdate): Promise<void>;
  getAnalytics(schoolId: string, id: string): Promise<AdaptiveAnalytics>;
}

export interface LxpCompetencyPathRepository {
  findById(schoolId: string, id: string): Promise<CompetencyPath | null>;
  findAll(schoolId: string, query: CompetencyPathQuery): Promise<PaginatedResult<CompetencyPath>>;
  create(schoolId: string, data: CompetencyPathCreate): Promise<CompetencyPath>;
  update(schoolId: string, id: string, data: Partial<CompetencyPathCreate>): Promise<CompetencyPath>;
  delete(schoolId: string, id: string): Promise<void>;
  getCompetencies(schoolId: string, id: string): Promise<Competency[]>;
  addCompetency(schoolId: string, id: string, competencyId: string): Promise<void>;
  removeCompetency(schoolId: string, id: string, competencyId: string): Promise<void>;
  getStudentProgress(schoolId: string, id: string, studentId: string): Promise<CompetencyPathProgress>;
  assessCompetency(schoolId: string, id: string, competencyId: string, studentId: string, score: number): Promise<void>;
  getMasteryLevels(schoolId: string, id: string): Promise<MasteryLevel[]>;
}

export interface LxpAssignmentRepository {
  findById(schoolId: string, id: string): Promise<Assignment | null>;
  findAll(schoolId: string, query: AssignmentQuery): Promise<PaginatedResult<Assignment>>;
  create(schoolId: string, data: AssignmentCreate): Promise<Assignment>;
  update(schoolId: string, id: string, data: AssignmentUpdate): Promise<Assignment>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Assignment[]>;
  findByModule(schoolId: string, moduleId: string): Promise<Assignment[]>;
  getSubmissions(schoolId: string, id: string): Promise<Submission[]>;
  getSubmissionCount(schoolId: string, id: string): Promise<number>;
  getAverageScore(schoolId: string, id: string): Promise<number>;
  publish(schoolId: string, id: string): Promise<Assignment>;
  archive(schoolId: string, id: string): Promise<Assignment>;
  getRubric(schoolId: string, id: string): Promise<Rubric | null>;
  setRubric(schoolId: string, id: string, rubricId: string): Promise<void>;
  getDueDates(schoolId: string, id: string): Promise<AssignmentDueDate[]>;
  extendDeadline(schoolId: string, id: string, studentId: string, newDeadline: string): Promise<void>;
  getStatistics(schoolId: string, id: string): Promise<AssignmentStatistics>;
  findUpcoming(schoolId: string, limit: number): Promise<Assignment[]>;
}

export interface LxpHomeworkRepository {
  findById(schoolId: string, id: string): Promise<Homework | null>;
  findAll(schoolId: string, query: HomeworkQuery): Promise<PaginatedResult<Homework>>;
  create(schoolId: string, data: HomeworkCreate): Promise<Homework>;
  update(schoolId: string, id: string, data: HomeworkUpdate): Promise<Homework>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Homework[]>;
  getSubmissions(schoolId: string, id: string): Promise<Submission[]>;
  grade(schoolId: string, id: string, submissionId: string, score: number, feedback: string): Promise<void>;
  getAverageScore(schoolId: string, id: string): Promise<number>;
  getDueDate(schoolId: string, id: string): Promise<string>;
  allowLateSubmission(schoolId: string, id: string, penaltyPercent: number): Promise<void>;
}

export interface LxpProjectRepository {
  findById(schoolId: string, id: string): Promise<Project | null>;
  findAll(schoolId: string, query: ProjectQuery): Promise<PaginatedResult<Project>>;
  create(schoolId: string, data: ProjectCreate): Promise<Project>;
  update(schoolId: string, id: string, data: ProjectUpdate): Promise<Project>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Project[]>;
  getDeliverables(schoolId: string, id: string): Promise<Deliverable[]>;
  addDeliverable(schoolId: string, id: string, deliverable: DeliverableCreate): Promise<Deliverable>;
  getTeam(schoolId: string, id: string): Promise<ProjectTeam>;
  assignTeam(schoolId: string, id: string, studentIds: string[]): Promise<void>;
  getRubric(schoolId: string, id: string): Promise<Rubric | null>;
  setRubric(schoolId: string, id: string, rubricId: string): Promise<void>;
  getProgress(schoolId: string, id: string): Promise<ProjectProgress>;
  getMilestones(schoolId: string, id: string): Promise<Milestone[]>;
}

export interface LxpRubricRepository {
  findById(schoolId: string, id: string): Promise<Rubric | null>;
  findAll(schoolId: string, query: RubricQuery): Promise<PaginatedResult<Rubric>>;
  create(schoolId: string, data: RubricCreate): Promise<Rubric>;
  update(schoolId: string, id: string, data: RubricUpdate): Promise<Rubric>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Rubric[]>;
  findByAssignment(schoolId: string, assignmentId: string): Promise<Rubric | null>;
  clone(schoolId: string, id: string, newTitle: string): Promise<Rubric>;
  getCriteria(schoolId: string, id: string): Promise<RubricCriterion[]>;
  addCriterion(schoolId: string, id: string, criterion: RubricCriterionCreate): Promise<RubricCriterion>;
  calculateScore(schoolId: string, id: string, scores: RubricScoreInput[]): Promise<RubricScoreResult>;
  getAvgScoresByCriterion(schoolId: string, id: string): Promise<Record<string, number>>;
}

export interface LxpPeerReviewRepository {
  findById(schoolId: string, id: string): Promise<PeerReview | null>;
  findAll(schoolId: string, query: PeerReviewQuery): Promise<PaginatedResult<PeerReview>>;
  create(schoolId: string, data: PeerReviewCreate): Promise<PeerReview>;
  update(schoolId: string, id: string, data: Partial<PeerReviewCreate>): Promise<PeerReview>;
  delete(schoolId: string, id: string): Promise<void>;
  findByAssignment(schoolId: string, assignmentId: string): Promise<PeerReview[]>;
  findByReviewer(schoolId: string, reviewerId: string): Promise<PeerReview[]>;
  findByReviewee(schoolId: string, revieweeId: string): Promise<PeerReview[]>;
  assign(schoolId: string, assignmentId: string, reviewerId: string, revieweeId: string): Promise<PeerReview>;
  submit(schoolId: string, id: string, review: PeerReviewSubmission): Promise<void>;
  getCompletedCount(schoolId: string, assignmentId: string): Promise<number>;
  getAnonymous(schoolId: string, id: string): Promise<PeerReviewAnonymous>;
}

export interface LxpGroupAssignmentRepository {
  findById(schoolId: string, id: string): Promise<GroupAssignment | null>;
  findAll(schoolId: string, query: GroupAssignmentQuery): Promise<PaginatedResult<GroupAssignment>>;
  create(schoolId: string, data: GroupAssignmentCreate): Promise<GroupAssignment>;
  update(schoolId: string, id: string, data: Partial<GroupAssignmentCreate>): Promise<GroupAssignment>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<GroupAssignment[]>;
  getGroups(schoolId: string, id: string): Promise<GroupAssignmentGroup[]>;
  assignGroup(schoolId: string, id: string, groupId: string, studentIds: string[]): Promise<void>;
  getGroupGrade(schoolId: string, id: string, groupId: string): Promise<GroupGrade>;
  getPeerEvaluation(schoolId: string, id: string, groupId: string): Promise<PeerEvaluation[]>;
  submitPeerEvaluation(schoolId: string, id: string, groupId: string, evaluation: PeerEvaluationCreate): Promise<void>;
}

export interface LxpSubmissionRepository {
  findById(schoolId: string, id: string): Promise<Submission | null>;
  findAll(schoolId: string, query: SubmissionQuery): Promise<PaginatedResult<Submission>>;
  create(schoolId: string, data: SubmissionCreate): Promise<Submission>;
  update(schoolId: string, id: string, data: SubmissionUpdate): Promise<Submission>;
  delete(schoolId: string, id: string): Promise<void>;
  findByAssignment(schoolId: string, assignmentId: string): Promise<Submission[]>;
  findByStudent(schoolId: string, studentId: string): Promise<Submission[]>;
  getLatestByStudent(schoolId: string, assignmentId: string, studentId: string): Promise<Submission | null>;
  grade(schoolId: string, id: string, grade: SubmissionGrade): Promise<void>;
  addFeedback(schoolId: string, id: string, feedback: SubmissionFeedback): Promise<void>;
  getAttachments(schoolId: string, id: string): Promise<SubmissionAttachment[]>;
  addAttachment(schoolId: string, id: string, attachment: SubmissionAttachmentCreate): Promise<SubmissionAttachment>;
  resubmit(schoolId: string, id: string, data: SubmissionCreate): Promise<Submission>;
  getGradeHistory(schoolId: string, id: string): Promise<GradeHistory[]>;
  getUngradedCount(schoolId: string, assignmentId: string): Promise<number>;
  bulkGrade(schoolId: string, assignmentId: string, grades: BulkGradeInput[]): Promise<void>;
}

export interface LxpQuizRepository {
  findById(schoolId: string, id: string): Promise<Quiz | null>;
  findAll(schoolId: string, query: QuizQuery): Promise<PaginatedResult<Quiz>>;
  create(schoolId: string, data: QuizCreate): Promise<Quiz>;
  update(schoolId: string, id: string, data: QuizUpdate): Promise<Quiz>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Quiz[]>;
  findByModule(schoolId: string, moduleId: string): Promise<Quiz[]>;
  getQuestions(schoolId: string, id: string): Promise<Question[]>;
  addQuestion(schoolId: string, id: string, question: QuestionCreate): Promise<Question>;
  removeQuestion(schoolId: string, id: string, questionId: string): Promise<void>;
  reorderQuestions(schoolId: string, id: string, questionIds: string[]): Promise<void>;
  startAttempt(schoolId: string, id: string, studentId: string): Promise<QuizAttempt>;
  getAttempts(schoolId: string, id: string): Promise<QuizAttempt[]>;
  getAverageScore(schoolId: string, id: string): Promise<number>;
  getPassRate(schoolId: string, id: string): Promise<number>;
  publish(schoolId: string, id: string): Promise<Quiz>;
  getTimeLimit(schoolId: string, id: string): Promise<number | null>;
  getAttemptsRemaining(schoolId: string, id: string, studentId: string): Promise<number>;
}

export interface LxpQuestionBankRepository {
  findById(schoolId: string, id: string): Promise<QuestionBank | null>;
  findAll(schoolId: string, query: QuestionBankQuery): Promise<PaginatedResult<QuestionBank>>;
  create(schoolId: string, data: QuestionBankCreate): Promise<QuestionBank>;
  update(schoolId: string, id: string, data: Partial<QuestionBankCreate>): Promise<QuestionBank>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<QuestionBank[]>;
  getQuestions(schoolId: string, id: string): Promise<Question[]>;
  addQuestion(schoolId: string, id: string, question: QuestionCreate): Promise<Question>;
  removeQuestion(schoolId: string, id: string, questionId: string): Promise<void>;
  importQuestions(schoolId: string, id: string, questions: QuestionCreate[]): Promise<Question[]>;
  exportQuestions(schoolId: string, id: string): Promise<Question[]>;
  getQuestionsByType(schoolId: string, id: string, type: QuestionType): Promise<Question[]>;
  getQuestionsByDifficulty(schoolId: string, id: string, difficulty: DifficultyLevel): Promise<Question[]>;
  searchQuestions(schoolId: string, id: string, query: string): Promise<Question[]>;
  getStatistics(schoolId: string, id: string): Promise<QuestionBankStatistics>;
  clone(schoolId: string, id: string, newTitle: string): Promise<QuestionBank>;
}

export interface LxpQuestionRepository {
  findById(schoolId: string, id: string): Promise<Question | null>;
  findAll(schoolId: string, query: QuestionQuery): Promise<PaginatedResult<Question>>;
  create(schoolId: string, data: QuestionCreate): Promise<Question>;
  update(schoolId: string, id: string, data: QuestionUpdate): Promise<Question>;
  delete(schoolId: string, id: string): Promise<void>;
  findByQuiz(schoolId: string, quizId: string): Promise<Question[]>;
  findByBank(schoolId: string, bankId: string): Promise<Question[]>;
  getChoices(schoolId: string, id: string): Promise<QuestionChoice[]>;
  addChoice(schoolId: string, id: string, choice: QuestionChoiceCreate): Promise<QuestionChoice>;
  validate(schoolId: string, id: string, answer: QuestionAnswer): Promise<QuestionValidationResult>;
  getStatistics(schoolId: string, id: string): Promise<QuestionStatistics>;
  clone(schoolId: string, id: string): Promise<Question>;
  findByType(schoolId: string, type: QuestionType): Promise<Question[]>;
}

export interface LxpQuizAttemptRepository {
  findById(schoolId: string, id: string): Promise<QuizAttempt | null>;
  findAll(schoolId: string, query: QuizAttemptQuery): Promise<PaginatedResult<QuizAttempt>>;
  findByQuiz(schoolId: string, quizId: string): Promise<QuizAttempt[]>;
  findByStudent(schoolId: string, studentId: string): Promise<QuizAttempt[]>;
  submit(schoolId: string, id: string, answers: QuizAnswer[]): Promise<QuizAttemptResult>;
  getTimeRemaining(schoolId: string, id: string): Promise<number>;
  autoSubmit(schoolId: string, id: string): Promise<QuizAttemptResult>;
  getResults(schoolId: string, id: string): Promise<QuizAttemptResult>;
  getAnswerDetails(schoolId: string, id: string): Promise<QuizAnswerDetail[]>;
  getBestAttempt(schoolId: string, quizId: string, studentId: string): Promise<QuizAttempt | null>;
  getLatestAttempt(schoolId: string, quizId: string, studentId: string): Promise<QuizAttempt | null>;
}

export interface LxpCertificateRepository {
  findById(schoolId: string, id: string): Promise<Certificate | null>;
  findAll(schoolId: string, query: CertificateQuery): Promise<PaginatedResult<Certificate>>;
  create(schoolId: string, data: CertificateCreate): Promise<Certificate>;
  update(schoolId: string, id: string, data: Partial<CertificateCreate>): Promise<Certificate>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<Certificate[]>;
  findByCourse(schoolId: string, courseId: string): Promise<Certificate[]>;
  issue(schoolId: string, courseId: string, studentId: string): Promise<Certificate>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
  verify(schoolId: string, id: string): Promise<boolean>;
  getByVerificationCode(schoolId: string, code: string): Promise<Certificate | null>;
  getDownloadUrl(schoolId: string, id: string): Promise<string>;
  getTemplates(schoolId: string): Promise<CertificateTemplate[]>;
  getStatistics(schoolId: string): Promise<CertificateStatistics>;
  findByDateRange(schoolId: string, range: DateRange): Promise<Certificate[]>;
  getExpiringSoon(schoolId: string, daysUntilExpiry: number): Promise<Certificate[]>;
}

export interface LxpBadgeRepository {
  findById(schoolId: string, id: string): Promise<Badge | null>;
  findAll(schoolId: string, query: BadgeQuery): Promise<PaginatedResult<Badge>>;
  create(schoolId: string, data: BadgeCreate): Promise<Badge>;
  update(schoolId: string, id: string, data: BadgeUpdate): Promise<Badge>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCategory(schoolId: string, categoryId: string): Promise<Badge[]>;
  award(schoolId: string, badgeId: string, studentId: string): Promise<BadgeAward>;
  revoke(schoolId: string, badgeId: string, studentId: string, reason: string): Promise<void>;
  getEarned(schoolId: string, studentId: string): Promise<Badge[]>;
  getEarnedCount(schoolId: string, badgeId: string): Promise<number>;
  getProgress(schoolId: string, badgeId: string, studentId: string): Promise<BadgeProgress>;
  findByStudent(schoolId: string, studentId: string): Promise<BadgeAward[]>;
}

export interface LxpMicroCredentialRepository {
  findById(schoolId: string, id: string): Promise<MicroCredential | null>;
  findAll(schoolId: string, query: MicroCredentialQuery): Promise<PaginatedResult<MicroCredential>>;
  create(schoolId: string, data: MicroCredentialCreate): Promise<MicroCredential>;
  update(schoolId: string, id: string, data: Partial<MicroCredentialCreate>): Promise<MicroCredential>;
  delete(schoolId: string, id: string): Promise<void>;
  getRequirements(schoolId: string, id: string): Promise<MicroCredentialRequirement[]>;
  addRequirement(schoolId: string, id: string, requirement: MicroCredentialRequirementCreate): Promise<MicroCredentialRequirement>;
  removeRequirement(schoolId: string, id: string, requirementId: string): Promise<void>;
  getEarned(schoolId: string, studentId: string): Promise<MicroCredential[]>;
  checkEligibility(schoolId: string, id: string, studentId: string): Promise<MicroCredentialEligibility>;
  award(schoolId: string, id: string, studentId: string): Promise<MicroCredentialAward>;
  verify(schoolId: string, id: string): Promise<boolean>;
  getStatistics(schoolId: string, id: string): Promise<MicroCredentialStatistics>;
}

export interface LxpCompetencyRepository {
  findById(schoolId: string, id: string): Promise<Competency | null>;
  findAll(schoolId: string, query: CompetencyQuery): Promise<PaginatedResult<Competency>>;
  create(schoolId: string, data: CompetencyCreate): Promise<Competency>;
  update(schoolId: string, id: string, data: Partial<CompetencyCreate>): Promise<Competency>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCategory(schoolId: string, categoryId: string): Promise<Competency[]>;
  getStudentProgress(schoolId: string, competencyId: string, studentId: string): Promise<CompetencyProgress>;
  assess(schoolId: string, competencyId: string, studentId: string, score: number, evidence: string): Promise<CompetencyAssessment>;
  getAssessments(schoolId: string, competencyId: string): Promise<CompetencyAssessment[]>;
  getRelatedCompetencies(schoolId: string, id: string): Promise<Competency[]>;
  getMasteryLevel(schoolId: string, id: string, studentId: string): Promise<MasteryLevel>;
  getFramework(schoolId: string, id: string): Promise<CompetencyFramework>;
}

export interface LxpSkillRepository {
  findById(schoolId: string, id: string): Promise<Skill | null>;
  findAll(schoolId: string, query: SkillQuery): Promise<PaginatedResult<Skill>>;
  create(schoolId: string, data: SkillCreate): Promise<Skill>;
  update(schoolId: string, id: string, data: Partial<SkillCreate>): Promise<Skill>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCategory(schoolId: string, categoryId: string): Promise<Skill[]>;
  findByCompetency(schoolId: string, competencyId: string): Promise<Skill[]>;
  getEndorsements(schoolId: string, skillId: string, studentId: string): Promise<SkillEndorsement[]>;
  endorse(schoolId: string, skillId: string, studentId: string, endorserId: string): Promise<SkillEndorsement>;
  getProficiency(schoolId: string, skillId: string, studentId: string): Promise<SkillProficiency>;
  updateProficiency(schoolId: string, skillId: string, studentId: string, level: number): Promise<void>;
  searchByName(schoolId: string, query: string): Promise<Skill[]>;
  getSkillTree(schoolId: string, id: string): Promise<SkillNode[]>;
}

export interface LxpVerificationRepository {
  findById(schoolId: string, id: string): Promise<Verification | null>;
  findAll(schoolId: string, query: VerificationQuery): Promise<PaginatedResult<Verification>>;
  create(schoolId: string, data: VerificationCreate): Promise<Verification>;
  update(schoolId: string, id: string, data: Partial<VerificationCreate>): Promise<Verification>;
  delete(schoolId: string, id: string): Promise<void>;
  verify(schoolId: string, id: string): Promise<VerificationResult>;
  findByCertificate(schoolId: string, certificateId: string): Promise<Verification[]>;
  findByBadge(schoolId: string, badgeId: string): Promise<Verification[]>;
  getByCode(schoolId: string, code: string): Promise<Verification | null>;
  getVerificationHistory(schoolId: string, entityId: string): Promise<Verification[]>;
  getStatistics(schoolId: string): Promise<VerificationStatistics>;
  getRecentVerifications(schoolId: string, limit: number): Promise<Verification[]>;
}

export interface LxpLiveSessionRepository {
  findById(schoolId: string, id: string): Promise<LiveSession | null>;
  findAll(schoolId: string, query: LiveSessionQuery): Promise<PaginatedResult<LiveSession>>;
  create(schoolId: string, data: LiveSessionCreate): Promise<LiveSession>;
  update(schoolId: string, id: string, data: LiveSessionUpdate): Promise<LiveSession>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<LiveSession[]>;
  findByInstructor(schoolId: string, instructorId: string): Promise<LiveSession[]>;
  start(schoolId: string, id: string): Promise<LiveSession>;
  end(schoolId: string, id: string): Promise<LiveSession>;
  getParticipants(schoolId: string, id: string): Promise<LiveSessionParticipant[]>;
  join(schoolId: string, id: string, studentId: string): Promise<void>;
  leave(schoolId: string, id: string, studentId: string): Promise<void>;
  getChatHistory(schoolId: string, id: string): Promise<LiveSessionChat[]>;
  getScreenShareUrl(schoolId: string, id: string): Promise<string>;
  getWhiteboardData(schoolId: string, id: string): Promise<WhiteboardData>;
  getRecording(schoolId: string, id: string): Promise<Recording | null>;
  schedule(schoolId: string, data: LiveSessionScheduleCreate): Promise<LiveSession>;
}

export interface LxpVirtualClassroomRepository {
  findById(schoolId: string, id: string): Promise<VirtualClassroom | null>;
  findAll(schoolId: string, query: VirtualClassroomQuery): Promise<PaginatedResult<VirtualClassroom>>;
  create(schoolId: string, data: VirtualClassroomCreate): Promise<VirtualClassroom>;
  update(schoolId: string, id: string, data: Partial<VirtualClassroomCreate>): Promise<VirtualClassroom>;
  delete(schoolId: string, id: string): Promise<void>;
  getParticipants(schoolId: string, id: string): Promise<VirtualClassroomParticipant[]>;
  join(schoolId: string, id: string, userId: string): Promise<void>;
  leave(schoolId: string, id: string, userId: string): Promise<void>;
  getSessions(schoolId: string, id: string): Promise<LiveSession[]>;
  getCapacity(schoolId: string, id: string): Promise<number>;
  isFull(schoolId: string, id: string): Promise<boolean>;
}

export interface LxpRecordingRepository {
  findById(schoolId: string, id: string): Promise<Recording | null>;
  findAll(schoolId: string, query: RecordingQuery): Promise<PaginatedResult<Recording>>;
  create(schoolId: string, data: RecordingCreate): Promise<Recording>;
  update(schoolId: string, id: string, data: Partial<RecordingCreate>): Promise<Recording>;
  delete(schoolId: string, id: string): Promise<void>;
  findBySession(schoolId: string, sessionId: string): Promise<Recording | null>;
  getStreamUrl(schoolId: string, id: string): Promise<string>;
  getDownloadUrl(schoolId: string, id: string): Promise<string>;
  getDuration(schoolId: string, id: string): Promise<number>;
  process(schoolId: string, id: string): Promise<void>;
  getStatus(schoolId: string, id: string): Promise<RecordingStatus>;
  getChapters(schoolId: string, id: string): Promise<RecordingChapter[]>;
}

export interface LxpAttendanceRepository {
  findById(schoolId: string, id: string): Promise<Attendance | null>;
  findAll(schoolId: string, query: AttendanceQuery): Promise<PaginatedResult<Attendance>>;
  create(schoolId: string, data: AttendanceCreate): Promise<Attendance>;
  update(schoolId: string, id: string, data: Partial<AttendanceCreate>): Promise<Attendance>;
  delete(schoolId: string, id: string): Promise<void>;
  findBySession(schoolId: string, sessionId: string): Promise<Attendance[]>;
  findByStudent(schoolId: string, studentId: string): Promise<Attendance[]>;
  markPresent(schoolId: string, sessionId: string, studentId: string): Promise<void>;
  markAbsent(schoolId: string, sessionId: string, studentId: string): Promise<void>;
  getAttendanceRate(schoolId: string, sessionId: string): Promise<number>;
  getStudentAttendanceRate(schoolId: string, courseId: string, studentId: string): Promise<number>;
  getCourseAttendanceStats(schoolId: string, courseId: string): Promise<AttendanceStats>;
  getReport(schoolId: string, courseId: string, dateRange: DateRange): Promise<AttendanceReport>;
}

export interface LxpForumRepository {
  findById(schoolId: string, id: string): Promise<Forum | null>;
  findAll(schoolId: string, query: ForumQuery): Promise<PaginatedResult<Forum>>;
  create(schoolId: string, data: ForumCreate): Promise<Forum>;
  update(schoolId: string, id: string, data: ForumUpdate): Promise<Forum>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Forum[]>;
  getThreads(schoolId: string, id: string): Promise<ForumThread[]>;
  createThread(schoolId: string, forumId: string, data: ForumThreadCreate): Promise<ForumThread>;
  getThread(schoolId: string, threadId: string): Promise<ForumThread>;
  getReplies(schoolId: string, threadId: string): Promise<ForumReply[]>;
  addReply(schoolId: string, threadId: string, data: ForumReplyCreate): Promise<ForumReply>;
  markResolved(schoolId: string, threadId: string): Promise<void>;
  pinThread(schoolId: string, threadId: string): Promise<void>;
  getPostCount(schoolId: string, id: string): Promise<number>;
  getActiveThreads(schoolId: string, id: string, limit: number): Promise<ForumThread[]>;
  searchThreads(schoolId: string, id: string, query: string): Promise<ForumThread[]>;
  getStatistics(schoolId: string, id: string): Promise<ForumStatistics>;
}

export interface LxpCommunityRepository {
  findById(schoolId: string, id: string): Promise<Community | null>;
  findAll(schoolId: string, query: CommunityQuery): Promise<PaginatedResult<Community>>;
  create(schoolId: string, data: CommunityCreate): Promise<Community>;
  update(schoolId: string, id: string, data: Partial<CommunityCreate>): Promise<Community>;
  delete(schoolId: string, id: string): Promise<void>;
  getMembers(schoolId: string, id: string): Promise<CommunityMember[]>;
  join(schoolId: string, id: string, userId: string): Promise<void>;
  leave(schoolId: string, id: string, userId: string): Promise<void>;
  getPosts(schoolId: string, id: string): Promise<CommunityPost[]>;
  createPost(schoolId: string, id: string, data: CommunityPostCreate): Promise<CommunityPost>;
  getMemberCount(schoolId: string, id: string): Promise<number>;
  findPublic(schoolId: string): Promise<Community[]>;
  findByCategory(schoolId: string, categoryId: string): Promise<Community[]>;
}

export interface LxpGroupRepository {
  findById(schoolId: string, id: string): Promise<Group | null>;
  findAll(schoolId: string, query: GroupQuery): Promise<PaginatedResult<Group>>;
  create(schoolId: string, data: GroupCreate): Promise<Group>;
  update(schoolId: string, id: string, data: GroupUpdate): Promise<Group>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Group[]>;
  getMembers(schoolId: string, id: string): Promise<GroupMember[]>;
  addMember(schoolId: string, id: string, studentId: string): Promise<GroupMember>;
  removeMember(schoolId: string, id: string, studentId: string): Promise<void>;
  getProjects(schoolId: string, id: string): Promise<Project[]>;
  getLeader(schoolId: string, id: string): Promise<GroupMember>;
  setLeader(schoolId: string, id: string, studentId: string): Promise<void>;
  autoAssign(schoolId: string, courseId: string, strategy: GroupAssignmentStrategy): Promise<Group[]>;
  getStatistics(schoolId: string, id: string): Promise<GroupStatistics>;
}

export interface LxpMentoringRepository {
  findById(schoolId: string, id: string): Promise<Mentoring | null>;
  findAll(schoolId: string, query: MentoringQuery): Promise<PaginatedResult<Mentoring>>;
  create(schoolId: string, data: MentoringCreate): Promise<Mentoring>;
  update(schoolId: string, id: string, data: Partial<MentoringCreate>): Promise<Mentoring>;
  delete(schoolId: string, id: string): Promise<void>;
  findByMentor(schoolId: string, mentorId: string): Promise<Mentoring[]>;
  findByMentee(schoolId: string, menteeId: string): Promise<Mentoring[]>;
  start(schoolId: string, id: string): Promise<Mentoring>;
  end(schoolId: string, id: string, reason: string): Promise<void>;
  getSessions(schoolId: string, id: string): Promise<MentoringSession[]>;
  scheduleSession(schoolId: string, id: string, session: MentoringSessionCreate): Promise<MentoringSession>;
  getGoals(schoolId: string, id: string): Promise<MentoringGoal[]>;
  addGoal(schoolId: string, id: string, goal: MentoringGoalCreate): Promise<MentoringGoal>;
  getFeedback(schoolId: string, id: string): Promise<MentoringFeedback[]>;
}

export interface LxpStudyGroupRepository {
  findById(schoolId: string, id: string): Promise<StudyGroup | null>;
  findAll(schoolId: string, query: StudyGroupQuery): Promise<PaginatedResult<StudyGroup>>;
  create(schoolId: string, data: StudyGroupCreate): Promise<StudyGroup>;
  update(schoolId: string, id: string, data: Partial<StudyGroupCreate>): Promise<StudyGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  getMembers(schoolId: string, id: string): Promise<StudyGroupMember[]>;
  join(schoolId: string, id: string, studentId: string): Promise<void>;
  leave(schoolId: string, id: string, studentId: string): Promise<void>;
  getSessions(schoolId: string, id: string): Promise<StudySession[]>;
  scheduleSession(schoolId: string, id: string, session: StudySessionCreate): Promise<StudySession>;
  getSharedResources(schoolId: string, id: string): Promise<StudyResource[]>;
  addResource(schoolId: string, id: string, resource: StudyResourceCreate): Promise<StudyResource>;
  findByStudent(schoolId: string, studentId: string): Promise<StudyGroup[]>;
}

export interface LxpProgressRepository {
  findById(schoolId: string, id: string): Promise<Progress | null>;
  findAll(schoolId: string, query: ProgressQuery): Promise<PaginatedResult<Progress>>;
  create(schoolId: string, data: ProgressCreate): Promise<Progress>;
  update(schoolId: string, id: string, data: Partial<ProgressCreate>): Promise<Progress>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<Progress[]>;
  findByCourse(schoolId: string, courseId: string): Promise<Progress[]>;
  getCourseProgress(schoolId: string, courseId: string, studentId: string): Promise<CourseProgress>;
  getModuleProgress(schoolId: string, moduleId: string, studentId: string): Promise<ModuleProgress>;
  getLessonProgress(schoolId: string, lessonId: string, studentId: string): Promise<LessonProgress>;
  updateLessonProgress(schoolId: string, lessonId: string, studentId: string, data: ProgressUpdate): Promise<void>;
  getOverallProgress(schoolId: string, studentId: string): Promise<OverallProgress>;
  getProgressHistory(schoolId: string, studentId: string, courseId: string): Promise<ProgressEntry[]>;
  getTimeSpent(schoolId: string, studentId: string, courseId: string): Promise<number>;
  getStreak(schoolId: string, studentId: string): Promise<ProgressStreak>;
  getLastActivity(schoolId: string, studentId: string): Promise<ProgressActivity | null>;
  getDailyProgress(schoolId: string, studentId: string, dateRange: DateRange): Promise<DailyProgress[]>;
}

export interface LxpEngagementRepository {
  findById(schoolId: string, id: string): Promise<Engagement | null>;
  findAll(schoolId: string, query: EngagementQuery): Promise<PaginatedResult<Engagement>>;
  create(schoolId: string, data: EngagementCreate): Promise<Engagement>;
  update(schoolId: string, id: string, data: Partial<EngagementCreate>): Promise<Engagement>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<Engagement[]>;
  findByCourse(schoolId: string, courseId: string): Promise<Engagement[]>;
  track(schoolId: string, data: EngagementTrack): Promise<void>;
  getEngagementScore(schoolId: string, courseId: string, studentId: string): Promise<number>;
  getEngagementTrend(schoolId: string, courseId: string, studentId: string): Promise<EngagementTrend[]>;
  getTopEngaged(schoolId: string, courseId: string, limit: number): Promise<EngagementLeaderboard[]>;
  getRiskStudents(schoolId: string, courseId: string): Promise<EngagementRisk[]>;
  getEngagementMetrics(schoolId: string, courseId: string): Promise<EngagementMetrics>;
}

export interface LxpAnalyticsRepository {
  findById(schoolId: string, id: string): Promise<Analytics | null>;
  findAll(schoolId: string, query: AnalyticsQuery): Promise<PaginatedResult<Analytics>>;
  create(schoolId: string, data: AnalyticsCreate): Promise<Analytics>;
  update(schoolId: string, id: string, data: Partial<AnalyticsCreate>): Promise<Analytics>;
  delete(schoolId: string, id: string): Promise<void>;
  getCourseAnalytics(schoolId: string, courseId: string): Promise<CourseAnalytics>;
  getStudentAnalytics(schoolId: string, studentId: string): Promise<StudentAnalytics>;
  getInstructorAnalytics(schoolId: string, instructorId: string): Promise<InstructorAnalytics>;
  getSchoolAnalytics(schoolId: string): Promise<SchoolAnalytics>;
  getRealTimeMetrics(schoolId: string): Promise<RealTimeMetrics>;
  generateReport(schoolId: string, reportType: AnalyticsReportType, params: AnalyticsReportParams): Promise<AnalyticsReport>;
  getTrends(schoolId: string, metric: string, dateRange: DateRange): Promise<TrendData[]>;
  getComparisons(schoolId: string, ids: string[]): Promise<AnalyticsComparison[]>;
  getPredictions(schoolId: string, courseId: string): Promise<AnalyticsPrediction[]>;
  exportData(schoolId: string, format: ExportFormat, query: AnalyticsQuery): Promise<string>;
  getHeatmap(schoolId: string, courseId: string): Promise<AnalyticsHeatmap>;
}

export interface LxpPointsRepository {
  findById(schoolId: string, id: string): Promise<Points | null>;
  findAll(schoolId: string, query: PointsQuery): Promise<PaginatedResult<Points>>;
  create(schoolId: string, data: PointsCreate): Promise<Points>;
  update(schoolId: string, id: string, data: Partial<PointsCreate>): Promise<Points>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<Points[]>;
  award(schoolId: string, studentId: string, points: number, reason: string): Promise<Points>;
  deduct(schoolId: string, studentId: string, points: number, reason: string): Promise<Points>;
  getBalance(schoolId: string, studentId: string): Promise<number>;
  getHistory(schoolId: string, studentId: string): Promise<Points[]>;
  getTopEarners(schoolId: string, limit: number): Promise<PointsLeaderboard[]>;
  getPointsByCategory(schoolId: string, studentId: string): Promise<Record<string, number>>;
  getPointsByCourse(schoolId: string, courseId: string): Promise<Points[]>;
}

export interface LxpXPRepository {
  findById(schoolId: string, id: string): Promise<XP | null>;
  findAll(schoolId: string, query: XPQuery): Promise<PaginatedResult<XP>>;
  create(schoolId: string, data: XPCreate): Promise<XP>;
  update(schoolId: string, id: string, data: Partial<XPCreate>): Promise<XP>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<XP[]>;
  award(schoolId: string, studentId: string, xp: number, reason: string): Promise<XP>;
  getTotal(schoolId: string, studentId: string): Promise<number>;
  getHistory(schoolId: string, studentId: string): Promise<XP[]>;
  getLeaderboard(schoolId: string, limit: number): Promise<XPLeaderboard[]>;
  getDailyXP(schoolId: string, studentId: string): Promise<number>;
  getWeeklyXP(schoolId: string, studentId: string): Promise<number>;
  getMultipliers(schoolId: string, studentId: string): Promise<XPMultiplier[]>;
  applyMultiplier(schoolId: string, studentId: string, multiplier: XPMultiplierCreate): Promise<void>;
}

export interface LxpLevelRepository {
  findById(schoolId: string, id: string): Promise<Level | null>;
  findAll(schoolId: string, query: LevelQuery): Promise<PaginatedResult<Level>>;
  create(schoolId: string, data: LevelCreate): Promise<Level>;
  update(schoolId: string, id: string, data: Partial<LevelCreate>): Promise<Level>;
  delete(schoolId: string, id: string): Promise<void>;
  getStudentLevel(schoolId: string, studentId: string): Promise<Level>;
  getLevelRequirements(schoolId: string, level: number): Promise<LevelRequirements>;
  getNextLevel(schoolId: string, studentId: string): Promise<Level | null>;
  getProgressToNext(schoolId: string, studentId: string): Promise<LevelProgress>;
  getLevelHistory(schoolId: string, studentId: string): Promise<LevelHistory[]>;
  getLevelDistribution(schoolId: string): Promise<LevelDistribution[]>;
  checkLevelUp(schoolId: string, studentId: string): Promise<boolean>;
}

export interface LxpAchievementRepository {
  findById(schoolId: string, id: string): Promise<Achievement | null>;
  findAll(schoolId: string, query: AchievementQuery): Promise<PaginatedResult<Achievement>>;
  create(schoolId: string, data: AchievementCreate): Promise<Achievement>;
  update(schoolId: string, id: string, data: Partial<AchievementCreate>): Promise<Achievement>;
  delete(schoolId: string, id: string): Promise<void>;
  findByStudent(schoolId: string, studentId: string): Promise<Achievement[]>;
  award(schoolId: string, achievementId: string, studentId: string): Promise<AchievementAward>;
  revoke(schoolId: string, achievementId: string, studentId: string, reason: string): Promise<void>;
  getEarned(schoolId: string, studentId: string): Promise<Achievement[]>;
  getProgress(schoolId: string, achievementId: string, studentId: string): Promise<AchievementProgress>;
  getStatistics(schoolId: string, achievementId: string): Promise<AchievementStatistics>;
  findByCategory(schoolId: string, categoryId: string): Promise<Achievement[]>;
  getRecentlyEarned(schoolId: string, limit: number): Promise<AchievementAward[]>;
}

export interface LxpLeaderboardRepository {
  findById(schoolId: string, id: string): Promise<Leaderboard | null>;
  findAll(schoolId: string, query: LeaderboardQuery): Promise<PaginatedResult<Leaderboard>>;
  create(schoolId: string, data: LeaderboardCreate): Promise<Leaderboard>;
  update(schoolId: string, id: string, data: Partial<LeaderboardCreate>): Promise<Leaderboard>;
  delete(schoolId: string, id: string): Promise<void>;
  getCourseLeaderboard(schoolId: string, courseId: string): Promise<LeaderboardEntry[]>;
  getSchoolLeaderboard(schoolId: string): Promise<LeaderboardEntry[]>;
  getStudentRank(schoolId: string, courseId: string, studentId: string): Promise<LeaderboardRank>;
  getTopPerformers(schoolId: string, courseId: string, limit: number): Promise<LeaderboardEntry[]>;
  getLeaderboardHistory(schoolId: string, courseId: string, studentId: string): Promise<LeaderboardHistory[]>;
  updateScores(schoolId: string, courseId: string): Promise<void>;
  getLeaderboardByType(schoolId: string, type: LeaderboardType): Promise<LeaderboardEntry[]>;
  getSeasonLeaderboard(schoolId: string, seasonId: string): Promise<LeaderboardEntry[]>;
}

export interface LxpChallengeRepository {
  findById(schoolId: string, id: string): Promise<Challenge | null>;
  findAll(schoolId: string, query: ChallengeQuery): Promise<PaginatedResult<Challenge>>;
  create(schoolId: string, data: ChallengeCreate): Promise<Challenge>;
  update(schoolId: string, id: string, data: Partial<ChallengeCreate>): Promise<Challenge>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Challenge[]>;
  getParticipants(schoolId: string, id: string): Promise<ChallengeParticipant[]>;
  join(schoolId: string, id: string, studentId: string): Promise<void>;
  leave(schoolId: string, id: string, studentId: string): Promise<void>;
  getLeaderboard(schoolId: string, id: string): Promise<ChallengeLeaderboard[]>;
  submit(schoolId: string, id: string, studentId: string, submission: ChallengeSubmission): Promise<void>;
  getProgress(schoolId: string, id: string, studentId: string): Promise<ChallengeProgress>;
  getActive(schoolId: string): Promise<Challenge[]>;
  getCompleted(schoolId: string, studentId: string): Promise<Challenge[]>;
  getStatistics(schoolId: string, id: string): Promise<ChallengeStatistics>;
}

export interface LxpRewardRepository {
  findById(schoolId: string, id: string): Promise<Reward | null>;
  findAll(schoolId: string, query: RewardQuery): Promise<PaginatedResult<Reward>>;
  create(schoolId: string, data: RewardCreate): Promise<Reward>;
  update(schoolId: string, id: string, data: Partial<RewardCreate>): Promise<Reward>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCategory(schoolId: string, categoryId: string): Promise<Reward[]>;
  redeem(schoolId: string, rewardId: string, studentId: string): Promise<RewardRedemption>;
  getAvailable(schoolId: string, studentId: string): Promise<Reward[]>;
  getRedeemed(schoolId: string, studentId: string): Promise<RewardRedemption[]>;
  getCost(schoolId: string, rewardId: string): Promise<number>;
  canAfford(schoolId: string, rewardId: string, studentId: string): Promise<boolean>;
  getCatalog(schoolId: string): Promise<Reward[]>;
  getStatistics(schoolId: string, rewardId: string): Promise<RewardStatistics>;
}

export interface LxpMarketplaceRepository {
  findById(schoolId: string, id: string): Promise<MarketplaceListing | null>;
  findAll(schoolId: string, query: MarketplaceQuery): Promise<PaginatedResult<MarketplaceListing>>;
  create(schoolId: string, data: MarketplaceCreate): Promise<MarketplaceListing>;
  update(schoolId: string, id: string, data: Partial<MarketplaceCreate>): Promise<MarketplaceListing>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCategory(schoolId: string, categoryId: string): Promise<MarketplaceListing[]>;
  findByPublisher(schoolId: string, publisherId: string): Promise<MarketplaceListing[]>;
  search(schoolId: string, query: string): Promise<MarketplaceListing[]>;
  getFeatured(schoolId: string): Promise<MarketplaceListing[]>;
  getPopular(schoolId: string, limit: number): Promise<MarketplaceListing[]>;
  getNewReleases(schoolId: string, limit: number): Promise<MarketplaceListing[]>;
  purchase(schoolId: string, listingId: string, buyerId: string): Promise<MarketplacePurchase>;
  getReviews(schoolId: string, listingId: string): Promise<Review[]>;
  addReview(schoolId: string, listingId: string, review: ReviewCreate): Promise<Review>;
  getSales(schoolId: string, publisherId: string): Promise<MarketplaceSale[]>;
  getEarnings(schoolId: string, publisherId: string): Promise<MarketplaceEarnings>;
  getPurchases(schoolId: string, buyerId: string): Promise<MarketplacePurchase[]>;
}

export interface LxpPublisherRepository {
  findById(schoolId: string, id: string): Promise<Publisher | null>;
  findAll(schoolId: string, query: PublisherQuery): Promise<PaginatedResult<Publisher>>;
  create(schoolId: string, data: PublisherCreate): Promise<Publisher>;
  update(schoolId: string, id: string, data: Partial<PublisherCreate>): Promise<Publisher>;
  delete(schoolId: string, id: string): Promise<void>;
  getCourses(schoolId: string, id: string): Promise<Course[]>;
  getRevenue(schoolId: string, id: string): Promise<PublisherRevenue>;
  getStatistics(schoolId: string, id: string): Promise<PublisherStatistics>;
  getSalesHistory(schoolId: string, id: string): Promise<PublisherSale[]>;
  getEarnings(schoolId: string, id: string): Promise<PublisherEarnings>;
  verify(schoolId: string, id: string): Promise<boolean>;
  getTopPublishers(schoolId: string, limit: number): Promise<Publisher[]>;
  findByUser(schoolId: string, userId: string): Promise<Publisher | null>;
}

export interface LxpLicenseRepository {
  findById(schoolId: string, id: string): Promise<License | null>;
  findAll(schoolId: string, query: LicenseQuery): Promise<PaginatedResult<License>>;
  create(schoolId: string, data: LicenseCreate): Promise<License>;
  update(schoolId: string, id: string, data: Partial<LicenseCreate>): Promise<License>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<License[]>;
  findByBuyer(schoolId: string, buyerId: string): Promise<License[]>;
  validate(schoolId: string, id: string): Promise<boolean>;
  activate(schoolId: string, id: string): Promise<License>;
  deactivate(schoolId: string, id: string): Promise<License>;
  transfer(schoolId: string, id: string, newOwnerId: string): Promise<License>;
  getActive(schoolId: string): Promise<License[]>;
  getExpiring(schoolId: string, daysUntilExpiry: number): Promise<License[]>;
  getUsage(schoolId: string, id: string): Promise<LicenseUsage>;
}

export interface LxpReviewRepository {
  findById(schoolId: string, id: string): Promise<Review | null>;
  findAll(schoolId: string, query: ReviewQuery): Promise<PaginatedResult<Review>>;
  create(schoolId: string, data: ReviewCreate): Promise<Review>;
  update(schoolId: string, id: string, data: Partial<ReviewCreate>): Promise<Review>;
  delete(schoolId: string, id: string): Promise<void>;
  findByCourse(schoolId: string, courseId: string): Promise<Review[]>;
  findByStudent(schoolId: string, studentId: string): Promise<Review[]>;
  getAverageRating(schoolId: string, courseId: string): Promise<number>;
  getRatingDistribution(schoolId: string, courseId: string): Promise<RatingDistribution>;
  flag(schoolId: string, id: string, reason: string): Promise<void>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
  getFlagged(schoolId: string): Promise<Review[]>;
  getRecent(schoolId: string, limit: number): Promise<Review[]>;
}

export interface LxpRevenueShareRepository {
  findById(schoolId: string, id: string): Promise<RevenueShare | null>;
  findAll(schoolId: string, query: RevenueShareQuery): Promise<PaginatedResult<RevenueShare>>;
  create(schoolId: string, data: RevenueShareCreate): Promise<RevenueShare>;
  update(schoolId: string, id: string, data: Partial<RevenueShareCreate>): Promise<RevenueShare>;
  delete(schoolId: string, id: string): Promise<void>;
  findByPublisher(schoolId: string, publisherId: string): Promise<RevenueShare[]>;
  findByCourse(schoolId: string, courseId: string): Promise<RevenueShare | null>;
  calculateRevenue(schoolId: string, courseId: string, dateRange: DateRange): Promise<RevenueCalculation>;
  getPayments(schoolId: string, publisherId: string): Promise<RevenuePayment[]>;
  getEarnings(schoolId: string, publisherId: string, dateRange: DateRange): Promise<RevenueEarnings>;
  getTotalRevenue(schoolId: string, dateRange: DateRange): Promise<number>;
  getRevenueByCategory(schoolId: string, dateRange: DateRange): Promise<RevenueByCategory[]>;
  getMonthlyReport(schoolId: string, publisherId: string, year: number, month: number): Promise<RevenueReport>;
  getTopCourses(schoolId: string, limit: number): Promise<RevenueCourseRanking[]>;
  getPaymentSchedule(schoolId: string, publisherId: string): Promise<PaymentSchedule[]>;
  processPayout(schoolId: string, publisherId: string, amount: number): Promise<RevenuePayment>;
}

export interface CourseStatistics {
  totalStudents: number;
  completionRate: number;
  averageScore: number;
  averageRating: number;
  totalRevenue: number;
  activeStudents: number;
  timeSpentAvg: number;
  enrollmentTrend: Array<{ date: string; count: number }>;
  ratingDistribution: Record<string, number>;
  topModules: Array<{ id: string; title: string; completionRate: number }>;
  dropoffPoints: Array<{ moduleId: string; dropRate: number }>;
}

export interface LessonContent {
  body: string;
  resources: LessonResource[];
  attachments: LessonAttachment[];
}

export interface LessonProgress {
  completed: boolean;
  timeSpent: number;
  lastAccessed: string;
  score: number | null;
}

export interface ChapterContent {
  body: string;
  wordCount: number;
  readingTime: number;
}

export interface UnitContent {
  body: string;
  duration: number;
}

export interface VersionDiff {
  added: string[];
  removed: string[];
  modified: string[];
}

export interface CourseTemplatePreview {
  structure: CourseTemplateStructure;
  sampleContent: Record<string, unknown>;
}

export interface VideoTranscript {
  segments: VideoTranscriptSegment[];
  language: string;
}

export interface VideoChapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

export interface VideoStatus {
  state: 'processing' | 'ready' | 'failed';
  progress: number;
  error: string | null;
}

export interface VideoAnalytics {
  views: number;
  uniqueViewers: number;
  averageWatchTime: number;
  completionRate: number;
  dropOffPoints: number[];
}

export interface AudioTranscript {
  segments: AudioTranscriptSegment[];
  language: string;
}

export interface PDFAnnotation {
  id: string;
  pageNumber: number;
  content: string;
  position: PDFPosition;
  authorId: string;
  createdAt: string;
}

export interface PDFAnnotationCreate {
  pageNumber: number;
  content: string;
  position: PDFPosition;
}

export interface PDFPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SCORMManifest {
  identifier: string;
  title: string;
  version: string;
  resources: SCORMResource[];
}

export interface SCORMStatus {
  completionStatus: string;
  successStatus: string;
  score: number;
  suspendData: string;
}

export interface SCORMCompletionData {
  completed: boolean;
  completionThreshold: number;
  completionValue: number;
  timestamp: string;
}

export interface SCORMScore {
  scaled: number;
  raw: number;
  min: number;
  max: number;
}

export interface ActorProfile {
  id: string;
  name: string;
  email: string;
  statements: number;
  lastActivity: string;
}

export interface XAPIActivity {
  id: string;
  type: string;
  title: string;
  statementCount: number;
}

export interface ScoreAggregate {
  average: number;
  median: number;
  min: number;
  max: number;
  count: number;
}

export interface H5PResult {
  score: number;
  maxScore: number;
  completed: boolean;
  answers: Record<string, unknown>;
}

export interface H5PLibrary {
  id: string;
  name: string;
  version: string;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
}

export interface H5PContentType {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface EPUBChapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface EPUBMetadata {
  title: string;
  author: string;
  language: string;
  publisher: string;
  description: string;
  coverImage: string;
}

export interface EPUBTOC {
  id: string;
  title: string;
  href: string;
  level: number;
  children: EPUBTOC[];
}

export interface EPUBProgress {
  currentChapter: string;
  progress: number;
  lastRead: string;
}

export interface EPUBProgressUpdate {
  currentChapter: string;
  progress: number;
}

export interface EPUBHighlight {
  id: string;
  chapterId: string;
  text: string;
  color: string;
  note: string | null;
}

export interface EPUBHighlightCreate {
  chapterId: string;
  text: string;
  color: string;
  note?: string;
}

export interface OfflineSyncStatus {
  synced: boolean;
  lastSynced: string | null;
  pendingChanges: number;
  error: string | null;
}

export interface OfflineStorageUsage {
  totalSize: number;
  usedSize: number;
  availableSize: number;
}

export interface LearningPathProgress {
  completedCourses: number;
  totalCourses: number;
  progress: number;
  currentCourseId: string | null;
}

export interface LearningPathPrerequisite {
  id: string;
  type: 'course' | 'competency' | 'skill';
  targetId: string;
  threshold: number;
}

export interface AdaptiveRule {
  id: string;
  condition: string;
  action: string;
  priority: number;
}

export interface AdaptiveRuleCreate {
  condition: string;
  action: string;
  priority: number;
}

export interface AdaptiveDecision {
  nextCourseId: string | null;
  reason: string;
  confidence: number;
}

export interface AdaptiveStudentPath {
  completed: string[];
  current: string;
  recommended: string[];
  skipped: string[];
}

export interface AdaptiveProgressUpdate {
  courseId: string;
  score: number;
  completed: boolean;
}

export interface AdaptiveAnalytics {
  completionRate: number;
  averageScore: number;
  pathEfficiency: number;
  adaptationCount: number;
}

export interface CompetencyPathProgress {
  completedCompetencies: number;
  totalCompetencies: number;
  progress: number;
  masteryLevels: Record<string, number>;
}

export interface MasteryLevel {
  id: string;
  name: string;
  description: string;
  threshold: number;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface DeliverableCreate {
  title: string;
  description: string;
  dueDate: string;
}

export interface ProjectTeam {
  id: string;
  members: ProjectTeamMember[];
  leaderId: string;
}

export interface ProjectTeamMember {
  id: string;
  name: string;
  role: string;
}

export interface ProjectProgress {
  completedDeliverables: number;
  totalDeliverables: number;
  progress: number;
  status: string;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface RubricCriterion {
  id: string;
  title: string;
  description: string;
  weight: number;
  levels: RubricLevel[];
}

export interface RubricCriterionCreate {
  title: string;
  description: string;
  weight: number;
  levels: RubricLevelCreate[];
}

export interface RubricLevel {
  id: string;
  title: string;
  description: string;
  score: number;
}

export interface RubricLevelCreate {
  title: string;
  description: string;
  score: number;
}

export interface RubricScoreInput {
  criterionId: string;
  levelId: string;
}

export interface RubricScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  criterionScores: Record<string, number>;
}

export interface PeerReviewSubmission {
  rating: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface PeerReviewAnonymous {
  reviewerId: string;
  rating: number;
  feedback: string;
}

export interface GroupAssignmentGroup {
  id: string;
  name: string;
  memberCount: number;
  submitted: boolean;
}

export interface GroupGrade {
  averageScore: number;
  individualGrades: Record<string, number>;
}

export interface PeerEvaluation {
  id: string;
  evaluatorId: string;
  evaluateeId: string;
  contribution: number;
  feedback: string;
}

export interface PeerEvaluationCreate {
  evaluateeId: string;
  contribution: number;
  feedback: string;
}

export interface SubmissionGrade {
  score: number;
  maxScore: number;
  feedback: string;
  gradedBy: string;
}

export interface SubmissionFeedback {
  content: string;
  attachments: string[];
  authorId: string;
}

export interface SubmissionAttachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface SubmissionAttachmentCreate {
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface GradeHistory {
  id: string;
  score: number;
  feedback: string;
  gradedBy: string;
  gradedAt: string;
}

export interface BulkGradeInput {
  studentId: string;
  score: number;
  feedback: string;
}

export interface QuestionType {
  multipleChoice: boolean;
  trueFalse: boolean;
  shortAnswer: boolean;
  essay: boolean;
  matching: boolean;
  fillInBlank: boolean;
  code: boolean;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface QuestionChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface QuestionChoiceCreate {
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface QuestionAnswer {
  answer: string | string[];
  timeSpent: number;
}

export interface QuestionValidationResult {
  correct: boolean;
  score: number;
  feedback: string;
}

export interface QuestionStatistics {
  totalAttempts: number;
  correctRate: number;
  averageTime: number;
  difficultyIndex: number;
}

export interface QuestionBankStatistics {
  totalQuestions: number;
  byType: Record<string, number>;
  byDifficulty: Record<string, number>;
  averageQuality: number;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  timeSpent: number;
}

export interface QuizAttemptResult {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  answers: QuizAnswerResult[];
  timeSpent: number;
}

export interface QuizAnswerResult {
  questionId: string;
  correct: boolean;
  score: number;
  feedback: string;
}

export interface QuizAnswerDetail {
  questionId: string;
  questionText: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  correct: boolean;
  score: number;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  design: string;
  isDefault: boolean;
}

export interface CertificateStatistics {
  totalIssued: number;
  totalRevoked: number;
  activeCount: number;
  issuedThisMonth: number;
}

export interface BadgeAward {
  id: string;
  badgeId: string;
  studentId: string;
  awardedAt: string;
  reason: string;
}

export interface BadgeProgress {
  current: number;
  required: number;
  percentage: number;
}

export interface MicroCredentialRequirement {
  id: string;
  type: string;
  targetId: string;
  threshold: number;
  description: string;
}

export interface MicroCredentialRequirementCreate {
  type: string;
  targetId: string;
  threshold: number;
  description: string;
}

export interface MicroCredentialEligibility {
  eligible: boolean;
  completed: number;
  total: number;
  remaining: MicroCredentialRequirement[];
}

export interface MicroCredentialAward {
  id: string;
  microCredentialId: string;
  studentId: string;
  awardedAt: string;
}

export interface MicroCredentialStatistics {
  totalEarned: number;
  averageCompletionTime: number;
  completionRate: number;
}

export interface CompetencyProgress {
  level: number;
  score: number;
  assessments: number;
  lastAssessed: string | null;
}

export interface CompetencyAssessment {
  id: string;
  score: number;
  evidence: string;
  assessorId: string;
  assessedAt: string;
}

export interface CompetencyFramework {
  id: string;
  name: string;
  levels: number;
  categories: string[];
}

export interface SkillEndorsement {
  id: string;
  skillId: string;
  studentId: string;
  endorserId: string;
  endorsedAt: string;
}

export interface SkillProficiency {
  level: number;
  endorsements: number;
  selfAssessed: boolean;
}

export interface SkillNode {
  id: string;
  name: string;
  children: SkillNode[];
  level: number;
}

export interface VerificationResult {
  valid: boolean;
  certificateId: string | null;
  badgeId: string | null;
  verifiedAt: string;
}

export interface VerificationStatistics {
  totalVerifications: number;
  validVerifications: number;
  invalidVerifications: number;
  recentVerifications: number;
}

export interface LiveSessionParticipant {
  id: string;
  userId: string;
  role: string;
  joinedAt: string;
  leftAt: string | null;
}

export interface LiveSessionChat {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
}

export interface WhiteboardData {
  elements: Record<string, unknown>[];
  lastUpdated: string;
}

export interface LiveSessionScheduleCreate {
  courseId: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
  maxParticipants: number;
}

export interface VirtualClassroomParticipant {
  id: string;
  userId: string;
  role: string;
  joinedAt: string;
}

export interface RecordingStatus {
  state: 'recording' | 'processing' | 'ready' | 'failed';
  progress: number;
}

export interface RecordingChapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  excused: number;
  rate: number;
}

export interface AttendanceReport {
  students: AttendanceStudentReport[];
  summary: AttendanceStats;
}

export interface AttendanceStudentReport {
  studentId: string;
  name: string;
  attendance: Attendance[];
  rate: number;
}

export interface ForumThread {
  id: string;
  title: string;
  authorId: string;
  content: string;
  replyCount: number;
  lastReplyAt: string;
  pinned: boolean;
  resolved: boolean;
}

export interface ForumThreadCreate {
  title: string;
  content: string;
}

export interface ForumReply {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface ForumReplyCreate {
  content: string;
}

export interface ForumStatistics {
  totalThreads: number;
  totalReplies: number;
  activeThreads: number;
  resolvedThreads: number;
}

export interface CommunityMember {
  id: string;
  userId: string;
  role: string;
  joinedAt: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: string;
}

export interface CommunityPostCreate {
  content: string;
}

export interface GroupMember {
  id: string;
  studentId: string;
  name: string;
  role: string;
  joinedAt: string;
}

export type GroupAssignmentStrategy = 'random' | 'balanced' | 'manual' | 'skill-based';

export interface GroupStatistics {
  totalGroups: number;
  averageSize: number;
  completionRate: number;
}

export interface MentoringSession {
  id: string;
  scheduledAt: string;
  duration: number;
  notes: string;
  status: string;
}

export interface MentoringSessionCreate {
  scheduledAt: string;
  duration: number;
  notes: string;
}

export interface MentoringGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
}

export interface MentoringGoalCreate {
  title: string;
  description: string;
  targetDate: string;
}

export interface MentoringFeedback {
  id: string;
  authorId: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface StudyGroupMember {
  id: string;
  studentId: string;
  name: string;
  joinedAt: string;
}

export interface StudySession {
  id: string;
  scheduledAt: string;
  duration: number;
  topic: string;
  attendees: string[];
}

export interface StudySessionCreate {
  scheduledAt: string;
  duration: number;
  topic: string;
}

export interface StudyResource {
  id: string;
  title: string;
  url: string;
  type: string;
  addedBy: string;
  addedAt: string;
}

export interface StudyResourceCreate {
  title: string;
  url: string;
  type: string;
}

export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  progress: number;
  lastAccessed: string;
  timeSpent: number;
}

export interface ModuleProgress {
  completedLessons: number;
  totalLessons: number;
  progress: number;
}

export interface OverallProgress {
  coursesInProgress: number;
  coursesCompleted: number;
  totalCredits: number;
  averageProgress: number;
}

export interface ProgressEntry {
  date: string;
  lessonsCompleted: number;
  timeSpent: number;
}

export interface ProgressStreak {
  current: number;
  longest: number;
  lastActive: string;
}

export interface ProgressActivity {
  type: string;
  courseId: string;
  lessonId: string;
  timestamp: string;
}

export interface ProgressUpdate {
  completed: boolean;
  timeSpent: number;
  score: number | null;
}

export interface DailyProgress {
  date: string;
  lessonsCompleted: number;
  timeSpent: number;
  pointsEarned: number;
}

export interface Engagement {
  id: string;
  studentId: string;
  courseId: string;
  type: string;
  value: number;
  timestamp: string;
}

export interface EngagementCreate {
  studentId: string;
  courseId: string;
  type: string;
  value: number;
}

export interface EngagementTrack {
  studentId: string;
  courseId: string;
  type: string;
  value: number;
}

export interface EngagementTrend {
  date: string;
  score: number;
  activity: number;
}

export interface EngagementLeaderboard {
  studentId: string;
  name: string;
  score: number;
  rank: number;
}

export interface EngagementRisk {
  studentId: string;
  name: string;
  riskLevel: string;
  factors: string[];
}

export interface EngagementMetrics {
  averageScore: number;
  activeStudents: number;
  completionRate: number;
  dropoffRate: number;
}

export interface Analytics {
  id: string;
  type: string;
  data: Record<string, unknown>;
  createdAt: string;
}

export interface AnalyticsCreate {
  type: string;
  data: Record<string, unknown>;
}

export interface CourseAnalytics {
  enrollmentCount: number;
  completionRate: number;
  averageScore: number;
  averageRating: number;
  revenue: number;
  timeSpent: number;
}

export interface StudentAnalytics {
  coursesEnrolled: number;
  coursesCompleted: number;
  averageScore: number;
  timeSpent: number;
  achievements: number;
}

export interface InstructorAnalytics {
  coursesTeaching: number;
  totalStudents: number;
  averageRating: number;
  revenue: number;
  contentCreated: number;
}

export interface SchoolAnalytics {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  revenue: number;
  completionRate: number;
}

export interface RealTimeMetrics {
  activeUsers: number;
  activeSessions: number;
  currentEnrollments: number;
  lastUpdated: string;
}

export type AnalyticsReportType = 'course' | 'student' | 'instructor' | 'school';

export interface AnalyticsReportParams {
  startDate: string;
  endDate: string;
  filters: Record<string, unknown>;
}

export interface AnalyticsReport {
  id: string;
  type: AnalyticsReportType;
  data: Record<string, unknown>;
  generatedAt: string;
  downloadUrl: string;
}

export interface TrendData {
  date: string;
  value: number;
}

export interface AnalyticsComparison {
  id: string;
  name: string;
  metrics: Record<string, number>;
}

export interface AnalyticsPrediction {
  courseId: string;
  predictedCompletion: number;
  predictedScore: number;
  confidence: number;
}

export type ExportFormat = 'csv' | 'json' | 'xlsx';

export interface AnalyticsHeatmap {
  hours: number[][];
  days: string[];
  values: number[];
}

export interface Points {
  id: string;
  studentId: string;
  points: number;
  reason: string;
  category: string;
  createdAt: string;
}

export interface PointsCreate {
  studentId: string;
  points: number;
  reason: string;
  category: string;
}

export interface PointsLeaderboard {
  studentId: string;
  name: string;
  points: number;
  rank: number;
}

export interface XP {
  id: string;
  studentId: string;
  xp: number;
  reason: string;
  source: string;
  createdAt: string;
}

export interface XPCreate {
  studentId: string;
  xp: number;
  reason: string;
  source: string;
}

export interface XPLeaderboard {
  studentId: string;
  name: string;
  xp: number;
  level: number;
  rank: number;
}

export interface XPMultiplier {
  id: string;
  factor: number;
  reason: string;
  expiresAt: string;
}

export interface XPMultiplierCreate {
  factor: number;
  reason: string;
  expiresAt: string;
}

export interface Level {
  id: string;
  level: number;
  title: string;
  xpRequired: number;
  rewards: LevelReward[];
}

export interface LevelCreate {
  level: number;
  title: string;
  xpRequired: number;
  rewards: LevelReward[];
}

export interface LevelReward {
  type: string;
  value: string;
}

export interface LevelRequirements {
  xpRequired: number;
  coursesRequired: number;
  badgesRequired: number;
}

export interface LevelProgress {
  currentXP: number;
  requiredXP: number;
  percentage: number;
}

export interface LevelHistory {
  level: number;
  achievedAt: string;
}

export interface LevelDistribution {
  level: number;
  count: number;
  percentage: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  criteria: AchievementCriteria;
}

export interface AchievementCreate {
  name: string;
  description: string;
  icon: string;
  category: string;
  criteria: AchievementCriteria;
}

export interface AchievementCriteria {
  type: string;
  threshold: number;
  conditions: Record<string, unknown>;
}

export interface AchievementAward {
  id: string;
  achievementId: string;
  studentId: string;
  awardedAt: string;
}

export interface AchievementProgress {
  current: number;
  required: number;
  percentage: number;
}

export interface AchievementStatistics {
  totalAwards: number;
  uniqueEarners: number;
  averageTimeToEarn: number;
}

export interface Leaderboard {
  id: string;
  name: string;
  type: LeaderboardType;
  courseId: string | null;
  entries: LeaderboardEntry[];
}

export interface LeaderboardCreate {
  name: string;
  type: LeaderboardType;
  courseId?: string;
}

export type LeaderboardType = 'course' | 'school' | 'global' | 'season';

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  score: number;
  avatar: string;
}

export interface LeaderboardRank {
  rank: number;
  score: number;
  totalParticipants: number;
}

export interface LeaderboardHistory {
  date: string;
  rank: number;
  score: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  courseId: string | null;
  startDate: string;
  endDate: string;
  reward: ChallengeReward;
  status: string;
}

export interface ChallengeCreate {
  title: string;
  description: string;
  courseId?: string;
  startDate: string;
  endDate: string;
  reward: ChallengeReward;
}

export interface ChallengeReward {
  type: string;
  value: number;
}

export interface ChallengeParticipant {
  id: string;
  studentId: string;
  joinedAt: string;
  progress: number;
}

export interface ChallengeLeaderboard {
  rank: number;
  studentId: string;
  name: string;
  score: number;
}

export interface ChallengeSubmission {
  content: string;
  attachments: string[];
}

export interface ChallengeProgress {
  completed: boolean;
  currentScore: number;
  targetScore: number;
  percentage: number;
}

export interface ChallengeStatistics {
  totalParticipants: number;
  completionRate: number;
  averageScore: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: string;
  cost: number;
  stock: number;
  image: string;
}

export interface RewardCreate {
  name: string;
  description: string;
  type: string;
  cost: number;
  stock: number;
  image: string;
}

export interface RewardRedemption {
  id: string;
  rewardId: string;
  studentId: string;
  redeemedAt: string;
  status: string;
}

export interface RewardStatistics {
  totalRedemptions: number;
  totalPointsSpent: number;
  averageRedemptionTime: number;
}

export interface MarketplacePurchase {
  id: string;
  listingId: string;
  buyerId: string;
  price: number;
  purchasedAt: string;
}

export interface MarketplaceSale {
  id: string;
  listingId: string;
  buyerId: string;
  amount: number;
  soldAt: string;
}

export interface MarketplaceEarnings {
  total: number;
  thisMonth: number;
  lastMonth: number;
  pending: number;
}

export interface PublisherRevenue {
  totalRevenue: number;
  thisMonth: number;
  averagePerCourse: number;
}

export interface PublisherStatistics {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  revenue: number;
}

export interface PublisherSale {
  id: string;
  courseId: string;
  amount: number;
  soldAt: string;
}

export interface PublisherEarnings {
  total: number;
  pending: number;
  paid: number;
}

export interface LicenseUsage {
  activeUsers: number;
  maxUsers: number;
  lastAccessed: string;
}

export interface RatingDistribution {
  average: number;
  total: number;
  distribution: Record<number, number>;
}

export interface RevenueCalculation {
  total: number;
  platformShare: number;
  publisherShare: number;
  period: DateRange;
}

export interface RevenuePayment {
  id: string;
  publisherId: string;
  amount: number;
  status: string;
  processedAt: string;
}

export interface RevenueEarnings {
  total: number;
  thisMonth: number;
  lastMonth: number;
  growth: number;
}

export interface RevenueByCategory {
  category: string;
  revenue: number;
  percentage: number;
}

export interface RevenueReport {
  month: number;
  year: number;
  totalRevenue: number;
  platformShare: number;
  publisherShare: number;
  topCourses: RevenueCourseRanking[];
}

export interface RevenueCourseRanking {
  rank: number;
  courseId: string;
  title: string;
  revenue: number;
}

export interface PaymentSchedule {
  id: string;
  amount: number;
  scheduledDate: string;
  status: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
