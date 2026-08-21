// Phase 2.7: Learning Experience Platform — Course Management, Digital Content & Learning Paths

// ============================================================================
// ENUMS — COURSE MANAGEMENT
// ============================================================================

/** Status of a course in its lifecycle */
export const CourseStatus = {
  Draft: 'draft',
  InReview: 'in_review',
  Approved: 'approved',
  Published: 'published',
  Archived: 'archived',
  ArchivedHidden: 'archived_hidden',
  Scheduled: 'scheduled',
  Active: 'active',
  Completed: 'completed',
  Retired: 'retired',
} as const;
export type CourseStatus = (typeof CourseStatus)[keyof typeof CourseStatus];

/** Difficulty / level of a course */
export const CourseLevel = {
  Beginner: 'beginner',
  Elementary: 'elementary',
  Intermediate: 'intermediate',
  UpperIntermediate: 'upper_intermediate',
  Advanced: 'advanced',
  Expert: 'expert',
  Master: 'master',
} as const;
export type CourseLevel = (typeof CourseLevel)[keyof typeof CourseLevel];

/** Language a course is delivered in */
export const CourseLanguage = {
  English: 'en',
  French: 'fr',
  Spanish: 'es',
  Arabic: 'ar',
  Portuguese: 'pt',
  German: 'de',
  Chinese: 'zh',
  Japanese: 'ja',
  Hindi: 'hi',
  Swahili: 'sw',
  Other: 'other',
} as const;
export type CourseLanguage = (typeof CourseLanguage)[keyof typeof CourseLanguage];

/** High-level category grouping */
export const CourseCategory = {
  Technology: 'technology',
  Business: 'business',
  Science: 'science',
  Arts: 'arts',
  Engineering: 'engineering',
  Mathematics: 'mathematics',
  Languages: 'languages',
  Health: 'health',
  Education: 'education',
  SocialSciences: 'social_sciences',
  Humanities: 'humanities',
  Professional: 'professional',
  Vocational: 'vocational',
  Personal: 'personal',
  Other: 'other',
} as const;
export type CourseCategory = (typeof CourseCategory)[keyof typeof CourseCategory];

/** Visibility level of a course */
export const CourseVisibility = {
  Public: 'public',
  Unlisted: 'unlisted',
  Private: 'private',
  Internal: 'internal',
  Restricted: 'restricted',
} as const;
export type CourseVisibility = (typeof CourseVisibility)[keyof typeof CourseVisibility];

/** The structural type of a course */
export const CourseType = {
  Standard: 'standard',
  Workshop: 'workshop',
  Seminar: 'seminar',
  Bootcamp: 'bootcamp',
  Certification: 'certification',
  Micro: 'micro',
  Nano: 'nano',
  Cohort: 'cohort',
  SelfPaced: 'self_paced',
  Blended: 'blended',
  Project: 'project',
} as const;
export type CourseType = (typeof CourseType)[keyof typeof CourseType];

/** Delivery format of a course */
export const CourseFormat = {
  Online: 'online',
  InPerson: 'in_person',
  Hybrid: 'hybrid',
  Virtual: 'virtual',
  Asynchronous: 'asynchronous',
  Synchronous: 'synchronous',
} as const;
export type CourseFormat = (typeof CourseFormat)[keyof typeof CourseFormat];

/** Pacing model for a course */
export const CoursePace = {
  SelfPaced: 'self_paced',
  InstructorLed: 'instructor_led',
  CohortBased: 'cohort_based',
  DeadlineDriven: 'deadline_driven',
  Flexible: 'flexible',
} as const;
export type CoursePace = (typeof CoursePace)[keyof typeof CoursePace];

/** How learners enrol in a course */
export const CourseEnrollment = {
  Open: 'open',
  ApprovalRequired: 'approval_required',
  Closed: 'closed',
  InviteOnly: 'invite_only',
  SelfEnroll: 'self_enroll',
  AdminEnroll: 'admin_enroll',
} as const;
export type CourseEnrollment = (typeof CourseEnrollment)[keyof typeof CourseEnrollment];

/** Completion criteria for a course */
export const CourseCompletion = {
  Auto: 'auto',
  Manual: 'manual',
  Portfolio: 'portfolio',
  ExamBased: 'exam_based',
  CompetencyBased: 'competency_based',
  Hybrid: 'hybrid',
} as const;
export type CourseCompletion = (typeof CourseCompletion)[keyof typeof CourseCompletion];

/** Structural type of a module inside a course */
export const ModuleType = {
  Core: 'core',
  Elective: 'elective',
  Prerequisite: 'prerequisite',
  Supplementary: 'supplementary',
  Assessment: 'assessment',
  Project: 'project',
} as const;
export type ModuleType = (typeof ModuleType)[keyof typeof ModuleType];

/** Type of lesson within a module */
export const LessonType = {
  Lecture: 'lecture',
  Tutorial: 'tutorial',
  Lab: 'lab',
  Discussion: 'discussion',
  Exercise: 'exercise',
  CaseStudy: 'case_study',
  Fieldwork: 'fieldwork',
  Reflection: 'reflection',
  Project: 'project',
  Assessment: 'assessment',
} as const;
export type LessonType = (typeof LessonType)[keyof typeof LessonType];

/** Delivery format of digital content */
export const ContentType = {
  Video: 'video',
  Audio: 'audio',
  Document: 'document',
  Presentation: 'presentation',
  Image: 'image',
  Interactive: 'interactive',
  SCORM: 'scorm',
  XAPI: 'xapi',
  H5P: 'h5p',
  EPUB: 'epub',
  Archive: 'archive',
  Link: 'link',
  Embed: 'embed',
  Text: 'text',
} as const;
export type ContentType = (typeof ContentType)[keyof typeof ContentType];

/** Underlying file format */
export const ContentFormat = {
  MP4: 'mp4',
  WebM: 'webm',
  MOV: 'mov',
  AVI: 'avi',
  MP3: 'mp3',
  WAV: 'wav',
  OGG: 'ogg',
  FLAC: 'flac',
  PDF: 'pdf',
  DOCX: 'docx',
  PPTX: 'pptx',
  PPT: 'ppt',
  XLSX: 'xlsx',
  CSV: 'csv',
  JSON: 'json',
  ZIP: 'zip',
  PNG: 'png',
  JPG: 'jpg',
  JPEG: 'jpeg',
  GIF: 'gif',
  SVG: 'svg',
  WebP: 'webp',
  HTML: 'html',
  XML: 'xml',
  Markdown: 'markdown',
} as const;
export type ContentFormat = (typeof ContentFormat)[keyof typeof ContentFormat];

/** Publishing / moderation status of content */
export const ContentStatus = {
  Draft: 'draft',
  InReview: 'in_review',
  Approved: 'approved',
  Published: 'published',
  Rejected: 'rejected',
  Archived: 'archived',
  Processing: 'processing',
  Failed: 'failed',
} as const;
export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];

/** Licensing model for content */
export const ContentLicense = {
  AllRights: 'all_rights',
  CreativeCommonsCCBY: 'cc_by',
  CreativeCommonsCCBYSA: 'cc_by_sa',
  CreativeCommonsCCBYNC: 'cc_by_nc',
  CreativeCommonsCCBYNCSA: 'cc_by_nc_sa',
  CreativeCommonsCC0: 'cc0',
  PublicDomain: 'public_domain',
  Custom: 'custom',
  OpenSource: 'open_source',
  FreeForEducation: 'free_for_education',
} as const;
export type ContentLicense = (typeof ContentLicense)[keyof typeof ContentLicense];

/** Structural type of a learning path */
export const LearningPathType = {
  Linear: 'linear',
  Branching: 'branching',
  Adaptive: 'adaptive',
  Competency: 'competency',
  Certification: 'certification',
  Mentorship: 'mentorship',
  SkillBased: 'skill_based',
  Career: 'career',
} as const;
export type LearningPathType = (typeof LearningPathType)[keyof typeof LearningPathType];

/** Status of a learning path */
export const LearningPathStatus = {
  Draft: 'draft',
  Active: 'active',
  Archived: 'archived',
  Retired: 'retired',
} as const;
export type LearningPathStatus = (typeof LearningPathStatus)[keyof typeof LearningPathStatus];

/** How a prerequisite is satisfied */
export const PrerequisiteType = {
  CourseComplete: 'course_complete',
  ModuleComplete: 'module_complete',
  QuizScore: 'quiz_score',
  CompetencyAchieved: 'competency_achieved',
  SkillDemonstrated: 'skill_demonstrated',
  ManualApproval: 'manual_approval',
  TimeElapsed: 'time_elapsed',
} as const;
export type PrerequisiteType = (typeof PrerequisiteType)[keyof typeof PrerequisiteType];

/** Depth of adaptive personalisation */
export const AdaptiveLevel = {
  None: 'none',
  ContentRecommendation: 'content_recommendation',
  PacingAdjustment: 'pacing_adjustment',
  DifficultyAdjustment: 'difficulty_adjustment',
  PathBranching: 'path_branching',
  FullPersonalisation: 'full_personalisation',
} as const;
export type AdaptiveLevel = (typeof AdaptiveLevel)[keyof typeof AdaptiveLevel];

/** Broad competency tier */
export const CompetencyLevel = {
  Novice: 'novice',
  Beginner: 'beginner',
  Competent: 'competent',
  Proficient: 'proficient',
  Expert: 'expert',
  Master: 'master',
} as const;
export type CompetencyLevel = (typeof CompetencyLevel)[keyof typeof CompetencyLevel];

/** Skill proficiency tier */
export const SkillLevel = {
  Aware: 'aware',
  Foundational: 'foundational',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
  Expert: 'expert',
  ThoughtLeader: 'thought_leader',
} as const;
export type SkillLevel = (typeof SkillLevel)[keyof typeof SkillLevel];

/** Type of certification offered */
export const CertificationType = {
  Course: 'course',
  Program: 'program',
  Competency: 'competency',
  Skill: 'skill',
  Industry: 'industry',
  University: 'university',
  Micro: 'micro',
  Nano: 'nano',
} as const;
export type CertificationType = (typeof CertificationType)[keyof typeof CertificationType];

/** Issuance / lifecycle status of a certificate */
export const CertificateStatus = {
  Pending: 'pending',
  Issued: 'issued',
  Active: 'active',
  Expired: 'expired',
  Revoked: 'revoked',
  Suspended: 'suspended',
  Reissued: 'reissued',
} as const;
export type CertificateStatus = (typeof CertificateStatus)[keyof typeof CertificateStatus];

/** Badge classification */
export const BadgeType = {
  Achievement: 'achievement',
  Skill: 'skill',
  Participation: 'participation',
  Milestone: 'milestone',
  Leaderboard: 'leaderboard',
  Social: 'social',
  Custom: 'custom',
} as const;
export type BadgeType = (typeof BadgeType)[keyof typeof BadgeType];

/** Lifecycle status of a badge */
export const BadgeStatus = {
  Draft: 'draft',
  Active: 'active',
  Retired: 'retired',
  Revoked: 'revoked',
} as const;
export type BadgeStatus = (typeof BadgeStatus)[keyof typeof BadgeStatus];

/** Publishing / approval status of a course version */
export const VersionStatus = {
  Draft: 'draft',
  InReview: 'in_review',
  Approved: 'approved',
  Published: 'published',
  Rejected: 'rejected',
  Superseded: 'superseded',
} as const;
export type VersionStatus = (typeof VersionStatus)[keyof typeof VersionStatus];

/** Archive classification */
export const ArchiveStatus = {
  NotArchived: 'not_archived',
  Archived: 'archived',
  PermanentlyArchived: 'permanently_archived',
} as const;
export type ArchiveStatus = (typeof ArchiveStatus)[keyof typeof ArchiveStatus];

/** Publishing workflow status */
export const PublishStatus = {
  Unpublished: 'unpublished',
  InReview: 'in_review',
  Rejected: 'rejected',
  Scheduled: 'scheduled',
  Published: 'published',
  UnpublishedManual: 'unpublished_manual',
} as const;
export type PublishStatus = (typeof PublishStatus)[keyof typeof PublishStatus];

/** Workflow approval status */
export const WorkflowStatus = {
  Pending: 'pending',
  InProgress: 'in_progress',
  Approved: 'approved',
  Rejected: 'rejected',
  NeedsRevision: 'needs_revision',
  Completed: 'completed',
} as const;
export type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus];

// ============================================================================
// INTERFACES — COURSE MANAGEMENT
// ============================================================================

/** Core course entity */
export interface Course {
  readonly id: string;
  readonly schoolId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  promoVideoUrl?: string;
  status: CourseStatus;
  level: CourseLevel;
  language: CourseLanguage;
  category: CourseCategory;
  subcategory?: string;
  tags: readonly string[];
  visibility: CourseVisibility;
  type: CourseType;
  format: CourseFormat;
  pace: CoursePace;
  enrollment: CourseEnrollment;
  completionCriteria: CourseCompletion;
  estimatedHours?: number;
  maxEnrollments?: number;
  enrolledCount: number;
  rating?: number;
  reviewCount: number;
  price?: number;
  currency?: string;
  instructorId: string;
  instructorName?: string;
  coInstructorIds: readonly string[];
  version: number;
  locale?: string;
  prerequisites: readonly CoursePrerequisite[];
  learningObjectives: readonly string[];
  skillsCovered: readonly string[];
  accreditation?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  archivedAt?: string;
}

/** Payload to create a course */
export interface CourseCreate {
  schoolId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  promoVideoUrl?: string;
  status?: CourseStatus;
  level: CourseLevel;
  language: CourseLanguage;
  category: CourseCategory;
  subcategory?: string;
  tags?: readonly string[];
  visibility?: CourseVisibility;
  type: CourseType;
  format: CourseFormat;
  pace: CoursePace;
  enrollment?: CourseEnrollment;
  completionCriteria?: CourseCompletion;
  estimatedHours?: number;
  maxEnrollments?: number;
  price?: number;
  currency?: string;
  instructorId: string;
  coInstructorIds?: readonly string[];
  prerequisites?: readonly CoursePrerequisite[];
  learningObjectives?: readonly string[];
  skillsCovered?: readonly string[];
  accreditation?: string;
}

/** Payload to update a course */
export interface CourseUpdate {
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  promoVideoUrl?: string;
  status?: CourseStatus;
  level?: CourseLevel;
  language?: CourseLanguage;
  category?: CourseCategory;
  subcategory?: string;
  tags?: readonly string[];
  visibility?: CourseVisibility;
  type?: CourseType;
  format?: CourseFormat;
  pace?: CoursePace;
  enrollment?: CourseEnrollment;
  completionCriteria?: CourseCompletion;
  estimatedHours?: number;
  maxEnrollments?: number;
  price?: number;
  currency?: string;
  coInstructorIds?: readonly string[];
  prerequisites?: readonly CoursePrerequisite[];
  learningObjectives?: readonly string[];
  skillsCovered?: readonly string[];
  accreditation?: string;
}

/** Filter / query parameters for listing courses */
export interface CourseQuery {
  search?: string;
  schoolId?: string;
  status?: CourseStatus | 'all';
  level?: CourseLevel | 'all';
  language?: CourseLanguage | 'all';
  category?: CourseCategory | 'all';
  subcategory?: string;
  visibility?: CourseVisibility | 'all';
  type?: CourseType | 'all';
  format?: CourseFormat | 'all';
  pace?: CoursePace | 'all';
  instructorId?: string;
  tags?: readonly string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minEnrollments?: number;
  maxEnrollments?: number;
  createdAfter?: string;
  createdBefore?: string;
  publishedAfter?: string;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'createdAt' | 'updatedAt' | 'rating' | 'enrolledCount' | 'price';
  sortOrder?: 'asc' | 'desc';
}

/** Category metadata entry */
export interface CourseCategoryInterface {
  readonly id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  icon?: string;
  color?: string;
  sortOrder: number;
  isActive: boolean;
  courseCount: number;
  readonly children: readonly CourseCategoryInterface[];
  createdAt: string;
  updatedAt: string;
}

/** A module (section) inside a course */
export interface CourseModule {
  readonly id: string;
  readonly courseId: string;
  title: string;
  description?: string;
  moduleType: ModuleType;
  sortOrder: number;
  estimatedHours?: number;
  isRequired: boolean;
  isLocked: boolean;
  prerequisites: readonly string[];
  lessons: readonly Lesson[];
  lessonCount: number;
  completionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a module */
export interface ModuleCreate {
  readonly courseId: string;
  title: string;
  description?: string;
  moduleType: ModuleType;
  sortOrder?: number;
  estimatedHours?: number;
  isRequired?: boolean;
  prerequisites?: readonly string[];
}

/** Payload to update a module */
export interface ModuleUpdate {
  title?: string;
  description?: string;
  moduleType?: ModuleType;
  sortOrder?: number;
  estimatedHours?: number;
  isRequired?: boolean;
  isLocked?: boolean;
  prerequisites?: readonly string[];
}

/** A lesson inside a module */
export interface Lesson {
  readonly id: string;
  readonly moduleId: string;
  readonly courseId: string;
  title: string;
  description?: string;
  lessonType: LessonType;
  sortOrder: number;
  durationMinutes?: number;
  contentUrl?: string;
  contentType?: ContentType;
  contentFormat?: ContentFormat;
  textContent?: string;
  isRequired: boolean;
  isPreview: boolean;
  completionCriteria?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a lesson */
export interface LessonCreate {
  readonly moduleId: string;
  title: string;
  description?: string;
  lessonType: LessonType;
  sortOrder?: number;
  durationMinutes?: number;
  contentUrl?: string;
  contentType?: ContentType;
  contentFormat?: ContentFormat;
  textContent?: string;
  isRequired?: boolean;
  isPreview?: boolean;
  completionCriteria?: string;
}

/** Payload to update a lesson */
export interface LessonUpdate {
  title?: string;
  description?: string;
  lessonType?: LessonType;
  sortOrder?: number;
  durationMinutes?: number;
  contentUrl?: string;
  contentType?: ContentType;
  contentFormat?: ContentFormat;
  textContent?: string;
  isRequired?: boolean;
  isPreview?: boolean;
  completionCriteria?: string;
}

/** A chapter within a long-form lesson */
export interface Chapter {
  readonly id: string;
  readonly lessonId: string;
  title: string;
  sortOrder: number;
  startOffsetSeconds: number;
  endOffsetSeconds?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a chapter */
export interface ChapterCreate {
  readonly lessonId: string;
  title: string;
  sortOrder?: number;
  startOffsetSeconds?: number;
  endOffsetSeconds?: number;
  description?: string;
}

/** A unit within a chapter (e.g. page, slide) */
export interface Unit {
  readonly id: string;
  readonly chapterId: string;
  title: string;
  sortOrder: number;
  contentUrl?: string;
  contentType?: ContentType;
  textContent?: string;
  durationSeconds?: number;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a unit */
export interface UnitCreate {
  readonly chapterId: string;
  title: string;
  sortOrder?: number;
  contentUrl?: string;
  contentType?: ContentType;
  textContent?: string;
  durationSeconds?: number;
}

/** A topic tag applied to a course */
export interface Topic {
  readonly id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  courseCount: number;
  readonly children: readonly Topic[];
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a topic */
export interface TopicCreate {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

/** A versioned snapshot of a course */
export interface CourseVersion {
  readonly id: string;
  readonly courseId: string;
  version: number;
  status: VersionStatus;
  title: string;
  description: string;
  changeNotes?: string;
  publishedBy?: string;
  publishedAt?: string;
  snapshot: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/** Archive record for a course */
export interface CourseArchive {
  readonly id: string;
  readonly courseId: string;
  archivedBy: string;
  reason?: string;
  status: ArchiveStatus;
  archivedAt: string;
  restoreDeadline?: string;
  metadata?: Record<string, unknown>;
}

/** Publishing record for a course */
export interface CoursePublish {
  readonly id: string;
  readonly courseId: string;
  version: number;
  status: PublishStatus;
  publishedBy: string;
  publishNote?: string;
  scheduledAt?: string;
  publishedAt?: string;
  unpublishReason?: string;
  createdAt: string;
}

/** Record of a course duplication event */
export interface CourseDuplication {
  readonly id: string;
  readonly sourceCourseId: string;
  readonly targetCourseId: string;
  duplicatedBy: string;
  includeContent: boolean;
  includeEnrollments: boolean;
  includeAnalytics: boolean;
  startedAt: string;
  completedAt?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

/** A reusable course template */
export interface CourseTemplate {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description?: string;
  category: CourseCategory;
  level: CourseLevel;
  thumbnailUrl?: string;
  moduleCount: number;
  lessonCount: number;
  isPublic: boolean;
  usageCount: number;
  templateData: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/** Workflow step for course approval */
export interface CourseWorkflow {
  readonly id: string;
  readonly courseId: string;
  stepName: string;
  stepOrder: number;
  status: WorkflowStatus;
  assignedTo?: string;
  reviewerId?: string;
  reviewNote?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Learner enrolment record */
export interface CourseEnrollmentInterface {
  readonly id: string;
  readonly courseId: string;
  readonly userId: string;
  status: 'active' | 'completed' | 'paused' | 'dropped' | 'suspended';
  enrolledAt: string;
  completedAt?: string;
  lastAccessedAt?: string;
  progressPercentage: number;
  completedModuleCount: number;
  totalModuleCount: number;
  grade?: number;
  certificateId?: string;
  droppedAt?: string;
  dropReason?: string;
  createdAt: string;
  updatedAt: string;
}

/** Learner completion record */
export interface CourseCompletionInterface {
  readonly id: string;
  readonly courseId: string;
  readonly userId: string;
  readonly enrollmentId: string;
  completedAt: string;
  finalGrade?: number;
  gradeLetter?: string;
  passed: boolean;
  completionCriteria: CourseCompletion;
  totalHoursSpent: number;
  totalLessonsCompleted: number;
  totalQuizzesPassed: number;
  certificateId?: string;
  competencyScores: readonly CompetencyScore[];
  skillsDemonstrated: readonly string[];
  createdAt: string;
}

/** Competency score achieved */
export interface CompetencyScore {
  readonly competencyId: string;
  competencyName: string;
  score: number;
  maxScore: number;
  level: CompetencyLevel;
  assessedAt: string;
}

/** Prerequisite that must be satisfied before enrolment */
export interface CoursePrerequisite {
  readonly id: string;
  type: PrerequisiteType;
  targetId: string;
  targetName: string;
  condition?: string;
  isMet: boolean;
}

/** Tag associated with a course */
export interface CourseTag {
  readonly id: string;
  readonly courseId: string;
  tag: string;
  createdAt: string;
}

/** Learner review of a course */
export interface CourseReview {
  readonly id: string;
  readonly courseId: string;
  readonly userId: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment?: string;
  pros?: string;
  cons?: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  reportCount: number;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  createdAt: string;
  updatedAt: string;
}

/** Aggregated analytics for a course */
export interface CourseAnalytics {
  readonly courseId: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  droppedEnrollments: number;
  completionRate: number;
  averageRating: number;
  totalReviews: number;
  averageProgress: number;
  averageTimeSpentHours: number;
  averageGrade: number;
  passRate: number;
  enrollmentsByMonth: readonly MonthCount[];
  completionByModule: readonly ModuleCompletionStat[];
  topCountries: readonly CountryStat[];
  revenue?: number;
  refundCount: number;
  averageNPS?: number;
  lastUpdated: string;
}

/** Monthly count for time-series */
export interface MonthCount {
  readonly month: string;
  readonly count: number;
}

/** Module-level completion stat */
export interface ModuleCompletionStat {
  readonly moduleId: string;
  readonly moduleName: string;
  startedCount: number;
  completedCount: number;
  completionRate: number;
  averageTimeMinutes: number;
}

/** Country distribution stat */
export interface CountryStat {
  readonly country: string;
  readonly count: number;
  percentage: number;
}

// ============================================================================
// INTERFACES — DIGITAL CONTENT
// ============================================================================

/** Video content metadata */
export interface Video {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  format: ContentFormat;
  resolution?: string;
  fileSizeBytes: number;
  subtitles: readonly SubtitleTrack[];
  chapters: readonly Chapter[];
  thumbnailUrls?: Record<string, string>;
  hlsUrl?: string;
  dashUrl?: string;
  downloadUrl?: string;
  transcriptUrl?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** Subtitle / caption track */
export interface SubtitleTrack {
  readonly id: string;
  language: string;
  label: string;
  url: string;
  format: 'vtt' | 'srt' | 'ttml';
  isDefault: boolean;
}

/** Audio content metadata */
export interface Audio {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  format: ContentFormat;
  bitrate?: number;
  fileSizeBytes: number;
  transcriptUrl?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** PDF document content */
export interface PDF {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  url: string;
  fileName: string;
  fileSizeBytes: number;
  pageCount: number;
  mimeType: string;
  isDownloadable: boolean;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** Slide / presentation content */
export interface Presentation {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  url: string;
  fileName: string;
  format: 'pptx' | 'key' | 'pdf' | 'google_slides';
  fileSizeBytes: number;
  slideCount: number;
  thumbnailUrl?: string;
  isDownloadable: boolean;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** Image content asset */
export interface Image {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title?: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
  format: ContentFormat;
  fileSizeBytes: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** Interactive content (generic wrapper) */
export interface InteractiveContent {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  embedUrl: string;
  thumbnailUrl?: string;
  framework: string;
  width?: number;
  height?: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** SCORM package content */
export interface SCORMContent {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  packageUrl: string;
  manifestUrl: string;
  scormVersion: '1.2' | '2004_3rd' | '2004_4th';
  entryPoint?: string;
  fileSizeBytes: number;
  launchData?: string;
  maxTimeAllowed?: number;
  timeLimitAction?: string;
  scoringType?: 'none' | 'measure' | 'real';
  masteryScore?: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** xAPI (Experience API / Tin Can) content */
export interface XAPIContent {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  endpointUrl: string;
  authKey?: string;
  activityId: string;
  activityType: string;
  launchUrl?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** H5P interactive content */
export interface H5PContent {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  h5pTypeId: string;
  embedUrl: string;
  libraryVersion?: string;
  parameters?: Record<string, unknown>;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** EPUB e-book content */
export interface EPUBContent {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  author?: string;
  description?: string;
  url: string;
  coverUrl?: string;
  fileSizeBytes: number;
  pageCount: number;
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
  language: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** ZIP archive package (e.g. downloadable resource) */
export interface ZIPPackage {
  readonly id: string;
  readonly courseId?: string;
  readonly lessonId?: string;
  title: string;
  description?: string;
  url: string;
  fileName: string;
  fileSizeBytes: number;
  fileCount: number;
  extractedSizeBytes: number;
  passwordProtected: boolean;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/** Configuration for video / audio streaming */
export interface StreamingConfig {
  readonly contentId: string;
  provider: 'internal' | 'cloudfront' | 'akamai' | 'cloudflare' | 'custom';
  cdnUrl: string;
  hlsUrl?: string;
  dashUrl?: string;
  thumbnailCdnUrl?: string;
  transcodeProfiles: readonly TranscodeProfile[];
  drmEnabled: boolean;
  drmType?: 'widevine' | 'fairplay' | 'playready';
  adaptiveBitrate: boolean;
  maxConcurrentStreams?: number;
}

/** Transcoding profile for a stream */
export interface TranscodeProfile {
  readonly id: string;
  label: string;
  width: number;
  height: number;
  bitrateKbps: number;
  codec: string;
  format: ContentFormat;
}

/** Configuration for offline-capable content */
export interface OfflinePackage {
  readonly id: string;
  readonly courseId: string;
  totalSizeBytes: number;
  compressedSizeBytes: number;
  downloadUrl: string;
  contentHash: string;
  expiresAt?: string;
  maxDownloads?: number;
  downloadCount: number;
  devices: readonly string[];
  createdAt: string;
}

/** Generic metadata attached to any content asset */
export interface ContentMetadata {
  readonly contentId: string;
  contentType: ContentType;
  title: string;
  description?: string;
  keywords: readonly string[];
  author: string;
  license: ContentLicense;
  copyrightHolder?: string;
  sourceUrl?: string;
  language: string;
  accessibilityFeatures: readonly string[];
  fileSizeBytes: number;
  mimeType: string;
  customFields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/** Version history entry for content */
export interface ContentVersion {
  readonly id: string;
  readonly contentId: string;
  version: number;
  fileUrl: string;
  fileSizeBytes: number;
  changeNotes?: string;
  publishedBy: string;
  checksum: string;
  createdAt: string;
}

/** Tag applied to content */
export interface ContentTag {
  readonly id: string;
  readonly contentId: string;
  tag: string;
  createdAt: string;
}

/** Categorisation entry for content */
export interface ContentCategory {
  readonly id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  contentCount: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// INTERFACES — LEARNING PATHS
// ============================================================================

/** A curated sequence of courses / modules */
export interface LearningPath {
  readonly id: string;
  readonly schoolId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  pathType: LearningPathType;
  status: LearningPathStatus;
  visibility: CourseVisibility;
  estimatedHours: number;
  enrolledCount: number;
  completionCount: number;
  averageRating: number;
  instructorId: string;
  instructorName?: string;
  price?: number;
  currency?: string;
  modules: readonly LearningPathModule[];
  prerequisites: readonly LearningPathPrerequisite[];
  tags: readonly string[];
  skillsCovered: readonly string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/** Payload to create a learning path */
export interface LearningPathCreate {
  schoolId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  pathType: LearningPathType;
  status?: LearningPathStatus;
  visibility?: CourseVisibility;
  estimatedHours?: number;
  instructorId: string;
  price?: number;
  currency?: string;
  modules?: readonly LearningPathModule[];
  prerequisites?: readonly LearningPathPrerequisite[];
  tags?: readonly string[];
  skillsCovered?: readonly string[];
}

/** Payload to update a learning path */
export interface LearningPathUpdate {
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  pathType?: LearningPathType;
  status?: LearningPathStatus;
  visibility?: CourseVisibility;
  estimatedHours?: number;
  price?: number;
  currency?: string;
  modules?: readonly LearningPathModule[];
  prerequisites?: readonly LearningPathPrerequisite[];
  tags?: readonly string[];
  skillsCovered?: readonly string[];
}

/** A module (step) within a learning path */
export interface LearningPathModule {
  readonly id: string;
  readonly learningPathId: string;
  title: string;
  description?: string;
  sortOrder: number;
  courseId?: string;
  courseTitle?: string;
  moduleType: ModuleType;
  isRequired: boolean;
  estimatedHours?: number;
  unlockCondition?: string;
  createdAt: string;
  updatedAt: string;
}

/** Prerequisite for entering a learning path */
export interface LearningPathPrerequisite {
  readonly id: string;
  type: PrerequisiteType;
  targetId: string;
  targetName: string;
  condition?: string;
  isMet: boolean;
}

/** Adaptive learning path that branches based on performance */
export interface AdaptivePath {
  readonly id: string;
  readonly learningPathId: string;
  adaptiveLevel: AdaptiveLevel;
  branchingRules: readonly BranchingRule[];
  performanceThreshold: number;
  reassessmentIntervalLessons: number;
  fallbackPathId?: string;
  aiModelVersion?: string;
  createdAt: string;
  updatedAt: string;
}

/** A single branching rule in an adaptive path */
export interface BranchingRule {
  readonly id: string;
  triggerCondition: string;
  sourceModuleId: string;
  targetModuleId: string;
  targetAlternateModuleId?: string;
  priority: number;
  isActive: boolean;
}

/** A path personalised for a specific learner */
export interface PersonalizedPath {
  readonly id: string;
  readonly learningPathId: string;
  readonly userId: string;
  adaptivePathId?: string;
  currentModuleId?: string;
  progressPercentage: number;
  personalisationScore: number;
  adjustments: readonly PathAdjustment[];
  startedAt: string;
  lastAccessedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** Record of a personalisation adjustment */
export interface PathAdjustment {
  readonly id: string;
  adjustmentType: 'difficulty' | 'pacing' | 'content' | 'order';
  fromValue: string;
  toValue: string;
  reason: string;
  appliedAt: string;
}

/** Competency-mapped learning path */
export interface CompetencyPath {
  readonly id: string;
  readonly learningPathId: string;
  competencies: readonly CompetencyMapping[];
  assessmentMethod: 'quiz' | 'project' | 'portfolio' | 'peer_review' | 'hybrid';
  minimumCompetencyLevel: CompetencyLevel;
  createdAt: string;
  updatedAt: string;
}

/** Maps a module to a competency */
export interface CompetencyMapping {
  readonly competencyId: string;
  competencyName: string;
  targetLevel: CompetencyLevel;
  moduleIds: readonly string[];
  assessmentId?: string;
}

/** Path leading to a specific certification */
export interface CertificationPath {
  readonly id: string;
  readonly learningPathId: string;
  certificationId: string;
  certificationName: string;
  certificationType: CertificationType;
  requiredCourseCount: number;
  requiredCompetencies: readonly string[];
  expiryMonths?: number;
  renewalRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

/** AI-recommended learning path for a user */
export interface AIRecommendedPath {
  readonly id: string;
  readonly userId: string;
  readonly recommendedPathId: string;
  reason: string;
  confidenceScore: number;
  basedOnData: readonly string[];
  aiModelVersion: string;
  status: 'suggested' | 'accepted' | 'dismissed' | 'in_progress';
  suggestedAt: string;
  respondedAt?: string;
  createdAt: string;
}

/** Learner enrolment in a learning path */
export interface PathEnrollment {
  readonly id: string;
  readonly learningPathId: string;
  readonly userId: string;
  status: 'active' | 'completed' | 'paused' | 'dropped';
  enrolledAt: string;
  completedAt?: string;
  lastAccessedAt?: string;
  currentModuleId?: string;
  progressPercentage: number;
  completedModuleCount: number;
  totalModuleCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Progress tracking for a learning path */
export interface PathProgress {
  readonly id: string;
  readonly learningPathId: string;
  readonly userId: string;
  readonly enrollmentId: string;
  currentModuleId?: string;
  currentLessonId?: string;
  completedModules: readonly string[];
  completedLessons: readonly string[];
  progressPercentage: number;
  totalHoursSpent: number;
  lastActivityAt: string;
  streak: number;
  startDate: string;
  estimatedCompletionDate?: string;
  createdAt: string;
  updatedAt: string;
}

/** Completion record for a learning path */
export interface PathCompletion {
  readonly id: string;
  readonly learningPathId: string;
  readonly userId: string;
  readonly enrollmentId: string;
  completedAt: string;
  totalHoursSpent: number;
  finalGrade?: number;
  passed: boolean;
  competencyScores: readonly CompetencyScore[];
  skillsAchieved: readonly string[];
  certificateId?: string;
  badgeIds: readonly string[];
  createdAt: string;
}

// ============================================================================
// INTERFACES — COURSE MANAGEMENT (SUPPORTING)
// ============================================================================

/** Paginated list result for courses */
export interface CourseListResult {
  data: readonly Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Filter criteria for modules */
export interface ModuleFilter {
  search?: string;
  courseId?: string;
  moduleType?: ModuleType | 'all';
  isRequired?: boolean;
  isLocked?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'sortOrder' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/** Filter criteria for lessons */
export interface LessonFilter {
  search?: string;
  moduleId?: string;
  courseId?: string;
  lessonType?: LessonType | 'all';
  isRequired?: boolean;
  isPreview?: boolean;
  contentType?: ContentType | 'all';
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'sortOrder' | 'createdAt' | 'durationMinutes';
  sortOrder?: 'asc' | 'desc';
}

/** Certificate attached to a course */
export interface CourseCertificate {
  readonly id: string;
  readonly courseId: string;
  templateId: string;
  title: string;
  description?: string;
  criteria: string;
  expiryMonths?: number;
  autoIssue: boolean;
  issuedCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Prerequisite check result for a course */
export interface CoursePrerequisiteCheck {
  readonly courseId: string;
  readonly userId: string;
  allMet: boolean;
  prerequisites: readonly CoursePrerequisiteCheckItem[];
  checkedAt: string;
}

/** Result of a single prerequisite check */
export interface CoursePrerequisiteCheckItem {
  readonly prerequisiteId: string;
  type: PrerequisiteType;
  targetName: string;
  isMet: boolean;
  currentProgress?: number;
  requiredProgress: number;
  detail?: string;
}

/** Course import job */
export interface CourseImport {
  readonly id: string;
  readonly schoolId: string;
  fileName: string;
  format: 'scorm' | 'cmi5' | 'qti' | 'moodle_backup' | 'csv' | 'json' | 'zip';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'partial';
  totalItems: number;
  processedItems: number;
  successfulItems: number;
  failedItems: number;
  errors?: readonly ImportError[];
  importedCourseId?: string;
  importedBy: string;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

/** A single import error */
export interface ImportError {
  readonly itemIndex: number;
  readonly itemName: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/** Course export job */
export interface CourseExport {
  readonly id: string;
  readonly courseId: string;
  format: 'scorm_12' | 'scorm_2004' | 'cmi5' | 'qti' | 'moodle_backup' | 'json' | 'pdf' | 'zip';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  includeContent: boolean;
  includeAnalytics: boolean;
  includeEnrollments: boolean;
  exportedBy: string;
  fileUrl?: string;
  fileSizeBytes?: number;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

/** Bulk action on multiple courses */
export interface CourseBulkAction {
  action: 'publish' | 'archive' | 'unpublish' | 'delete' | 'duplicate' | 'tag' | 'categorize' | 'export';
  courseIds: readonly string[];
  parameters?: Record<string, unknown>;
  initiatedBy: string;
  status: 'pending' | 'in_progress' | 'completed' | 'partial' | 'failed';
  resultCount?: number;
  errorCount?: number;
  createdAt: string;
}

/** Course scheduling information */
export interface CourseSchedule {
  readonly id: string;
  readonly courseId: string;
  timezone: string;
  startDate?: string;
  endDate?: string;
  enrollmentDeadline?: string;
  sessions: readonly CourseScheduleSession[];
  recurringPattern?: string;
  holidayExclusions: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** A scheduled session within a course */
export interface CourseScheduleSession {
  readonly id: string;
  title: string;
  dayOfWeek?: number;
  startTime: string;
  endTime: string;
  room?: string;
  instructorId?: string;
  isVirtual: boolean;
  meetingUrl?: string;
  isRecurring: boolean;
}

/** Course design / branding settings */
export interface CourseDesign {
  readonly courseId: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily?: string;
  headerStyle?: 'minimal' | 'bold' | 'illustrated' | 'video';
  layoutStyle?: 'grid' | 'list' | 'timeline' | 'kanban';
  showProgress: boolean;
  showNavigation: boolean;
  showSocialFeatures: boolean;
  customCss?: string;
  logoUrl?: string;
  bannerUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/** Collaborator on a course */
export interface CourseCollaborator {
  readonly id: string;
  readonly courseId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  role: 'instructor' | 'co_instructor' | 'ta' | 'grader' | 'editor' | 'viewer';
  addedBy: string;
  addedAt: string;
  lastActiveAt?: string;
}

/** Instructor profile for course display */
export interface CourseInstructorProfile {
  readonly userId: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  title?: string;
  expertise: readonly string[];
  socialLinks: readonly CourseSocialLink[];
  courseCount: number;
  totalStudents: number;
  averageRating: number;
  createdAt: string;
}

/** Social link on an instructor profile */
export interface CourseSocialLink {
  readonly platform: string;
  readonly url: string;
}

/** Course syllabus / outline */
export interface CourseSyllabus {
  readonly courseId: string;
  overview: string;
  objectives: readonly string[];
  prerequisites: readonly string[];
  gradingPolicy: string;
  schedule: readonly CourseSyllabusWeek[];
  policies: readonly CourseSyllabusPolicy[];
  resources: readonly CourseSyllabusResource[];
  updatedAt: string;
}

/** A week in the syllabus schedule */
export interface CourseSyllabusWeek {
  weekNumber: number;
  title: string;
  topics: readonly string[];
  readings: readonly string[];
  assignments: readonly string[];
  dueDate?: string;
}

/** A course policy */
export interface CourseSyllabusPolicy {
  name: string;
  description: string;
}

/** A course resource */
export interface CourseSyllabusResource {
  name: string;
  url: string;
  type: 'textbook' | 'website' | 'software' | 'other';
}

/** Content upload request */
export interface ContentUploadRequest {
  readonly courseId?: string;
  readonly lessonId?: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  contentType: ContentType;
  title?: string;
  description?: string;
  tags?: readonly string[];
  license?: ContentLicense;
}

/** Content search / filter query */
export interface ContentSearchQuery {
  search?: string;
  courseId?: string;
  contentType?: ContentType | 'all';
  contentFormat?: ContentFormat | 'all';
  status?: ContentStatus | 'all';
  license?: ContentLicense | 'all';
  author?: string;
  tags?: readonly string[];
  minSizeBytes?: number;
  maxSizeBytes?: number;
  createdAfter?: string;
  createdBefore?: string;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'createdAt' | 'fileSizeBytes' | 'downloadCount';
  sortOrder?: 'asc' | 'desc';
}

/** Paginated list result for content */
export interface ContentListResult {
  data: readonly ContentMetadata[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Content processing job */
export interface ContentProcessingJob {
  readonly id: string;
  readonly contentId: string;
  jobType: 'transcode' | 'thumbnail' | 'transcript' | 'caption' | 'compress' | 'virus_scan';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progressPercent: number;
  inputUrl: string;
  outputUrl?: string;
  outputFormat?: string;
  errorMessage?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

/** Content access log entry */
export interface ContentAccessLog {
  readonly id: string;
  readonly contentId: string;
  readonly userId: string;
  accessType: 'view' | 'download' | 'stream' | 'preview';
  ipAddress?: string;
  userAgent?: string;
  durationSeconds?: number;
  bytesTransferred?: number;
  accessedAt: string;
}

/** Course access log entry */
export interface CourseAccessLog {
  readonly id: string;
  readonly courseId: string;
  readonly userId: string;
  accessType: 'enroll' | 'view' | 'lesson_start' | 'lesson_complete' | 'quiz_start' | 'quiz_complete' | 'certificate_earned';
  details?: string;
  accessedAt: string;
}

/** Course analytics query parameters */
export interface CourseAnalyticsQuery {
  courseId: string;
  dateRange?: { start: string; end: string };
  metrics?: readonly string[];
  groupBy?: 'day' | 'week' | 'month';
  filters?: Record<string, unknown>;
}

/** Content-level analytics */
export interface ContentAnalytics {
  readonly contentId: string;
  totalViews: number;
  uniqueViews: number;
  totalDownloads: number;
  averageViewDurationSeconds: number;
  completionRate: number;
  rating?: number;
  ratingCount: number;
  bytesTransferred: number;
  deviceBreakdown: readonly DeviceStat[];
  geographyBreakdown: readonly CountryStat[];
  timeSeriesData: readonly TimeSeriesPoint[];
  lastUpdated: string;
}

/** Device type statistic */
export interface DeviceStat {
  readonly deviceType: string;
  readonly count: number;
  readonly percentage: number;
}

/** A single time-series data point */
export interface TimeSeriesPoint {
  readonly timestamp: string;
  readonly value: number;
}

/** Learning path analytics */
export interface LearningPathAnalytics {
  readonly learningPathId: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  averageCompletionTimeDays: number;
  completionRate: number;
  averageRating: number;
  moduleDropoffRates: readonly ModuleDropoffStat[];
  enrollmentTrend: readonly TimeSeriesPoint[];
  lastUpdated: string;
}

/** Module dropoff statistic */
export interface ModuleDropoffStat {
  readonly moduleId: string;
  readonly moduleName: string;
  startedCount: number;
  droppedCount: number;
  dropoffRate: number;
}

/** Course insights summary */
export interface CourseInsights {
  readonly courseId: string;
  engagementScore: number;
  satisfactionScore: number;
  completionRate: number;
  averageGrade: number;
  dropoutRate: number;
  timeOnTaskAverage: number;
  contentEffectiveness: number;
  peerInteractionRate: number;
  helpSeekRate: number;
  topStrengths: readonly string[];
  topImprovements: readonly string[];
  recommendations: readonly string[];
  generatedAt: string;
}

/** Content insights summary */
export interface ContentInsights {
  readonly contentId: string;
  viewCount: number;
  uniqueViewCount: number;
  averageDuration: number;
  completionRate: number;
  rewatchRate: number;
  skipRate: number;
  averageRating: number;
  feedbackCount: number;
  engagementScore: number;
  effectivenessScore: number;
  topComments: readonly string[];
  generatedAt: string;
}

/** Course content recommendation */
export interface CourseContentRecommendation {
  readonly id: string;
  readonly courseId: string;
  readonly userId: string;
  recommendedContentId: string;
  contentTitle: string;
  reason: string;
  confidenceScore: number;
  type: 'next_lesson' | 'review' | 'supplementary' | 'prerequisite' | 'alternative';
  status: 'pending' | 'viewed' | 'completed' | 'dismissed';
  createdAt: string;
}

/** Learning path recommendation */
export interface LearningPathRecommendation {
  readonly id: string;
  readonly userId: string;
  recommendedPathId: string;
  pathTitle: string;
  reason: string;
  confidenceScore: number;
  basedOnData: readonly string[];
  status: 'suggested' | 'accepted' | 'dismissed' | 'in_progress';
  createdAt: string;
}

/** Course template query */
export interface CourseTemplateQuery {
  search?: string;
  schoolId?: string;
  category?: CourseCategory | 'all';
  level?: CourseLevel | 'all';
  isPublic?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'usageCount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/** Paginated list result for course templates */
export interface CourseTemplateListResult {
  data: readonly CourseTemplate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Learning path query parameters */
export interface LearningPathQuery {
  search?: string;
  schoolId?: string;
  pathType?: LearningPathType | 'all';
  status?: LearningPathStatus | 'all';
  visibility?: CourseVisibility | 'all';
  instructorId?: string;
  minRating?: number;
  tags?: readonly string[];
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'createdAt' | 'enrolledCount' | 'averageRating';
  sortOrder?: 'asc' | 'desc';
}

/** Paginated list result for learning paths */
export interface LearningPathListResult {
  data: readonly LearningPath[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Learning path prerequisite check result */
export interface LearningPathPrerequisiteCheck {
  readonly learningPathId: string;
  readonly userId: string;
  allMet: boolean;
  prerequisites: readonly PrerequisiteCheckItem[];
  checkedAt: string;
}

/** Result of a single prerequisite check item */
export interface PrerequisiteCheckItem {
  readonly prerequisiteId: string;
  type: PrerequisiteType;
  targetName: string;
  isMet: boolean;
  currentProgress?: number;
  requiredProgress: number;
  detail?: string;
}

/** Course version diff comparison */
export interface CourseVersionDiff {
  readonly fromVersion: number;
  readonly toVersion: number;
  addedModules: readonly string[];
  removedModules: readonly string[];
  modifiedModules: readonly ModuleDiff[];
  addedLessons: readonly string[];
  removedLessons: readonly string[];
  modifiedLessons: readonly LessonDiff[];
  metadataChanges: readonly MetadataChange[];
  generatedAt: string;
}

/** Diff for a module */
export interface ModuleDiff {
  readonly moduleId: string;
  readonly moduleName: string;
  changes: readonly string[];
}

/** Diff for a lesson */
export interface LessonDiff {
  readonly lessonId: string;
  readonly lessonName: string;
  changes: readonly string[];
}

/** Metadata change in a version diff */
export interface MetadataChange {
  field: string;
  oldValue: string;
  newValue: string;
}

/** Lesson progress tracking */
export interface LessonProgress {
  readonly id: string;
  readonly userId: string;
  readonly lessonId: string;
  readonly courseId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  progressPercentage: number;
  timeSpentMinutes: number;
  lastAccessedAt: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  bookmarkPosition?: number;
  createdAt: string;
  updatedAt: string;
}

/** Module prerequisite check result */
export interface ModulePrerequisiteCheck {
  readonly moduleId: string;
  readonly userId: string;
  allMet: boolean;
  prerequisites: readonly PrerequisiteCheckItem[];
  checkedAt: string;
}

/** Content transcoding status */
export interface ContentTranscodingStatus {
  readonly contentId: string;
  readonly jobId: string;
  inputFormat: ContentFormat;
  outputFormat: ContentFormat;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progressPercent: number;
  estimatedCompletionSeconds?: number;
  resolutions: readonly TranscodeProfile[];
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

/** Course branding override */
export interface CourseBranding {
  readonly courseId: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkModeColor?: string;
  fontFamily?: string;
  customCss?: string;
  showInstitutionBranding: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Path query result */
export interface PathQueryResult {
  data: readonly LearningPath[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
