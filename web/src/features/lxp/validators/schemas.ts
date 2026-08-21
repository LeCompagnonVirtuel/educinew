import { z } from "zod";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Common / Shared Schemas
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const idSchema = z.string().uuid();
const emailSchema = z.string().email();
const urlSchema = z.string().url();
const isoDateSchema = z.string().datetime();
const slugSchema = z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const localeSchema = z.string().min(2).max(10);
const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

const statusEnum = z.enum(["draft", "published", "archived", "deleted"]);
const visibilityEnum = z.enum(["public", "private", "unlisted", "restricted"]);
const difficultyEnum = z.enum(["beginner", "intermediate", "advanced", "expert"]);
const contentTypeEnum = z.enum([
  "video",
  "audio",
  "pdf",
  "presentation",
  "image",
  "interactive",
  "scorm",
  "h5p",
  "epub",
  "text",
]);

const tagSchema = z.object({
  id: idSchema.optional(),
  name: z.string().min(1).max(100),
  slug: slugSchema,
});

const metadataSchema = z.record(z.string(), z.unknown());

const fileInfoSchema = z.object({
  id: idSchema.optional(),
  url: urlSchema,
  mimeType: z.string(),
  size: z.number().int().min(0),
  name: z.string(),
  duration: z.number().optional(),
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 1. Course Management (~60 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const createCourseSchema = z.object({
  title: z.string().min(1).max(300),
  slug: slugSchema,
  description: z.string().min(1).max(5000),
  shortDescription: z.string().min(1).max(500).optional(),
  categoryId: idSchema.optional(),
  subcategoryId: idSchema.optional(),
  instructorId: idSchema,
  difficulty: difficultyEnum,
  language: localeSchema.default("en"),
  thumbnail: urlSchema.optional(),
  trailer: urlSchema.optional(),
  tags: z.array(tagSchema).max(20).default([]),
  prerequisites: z.array(idSchema).max(10).default([]),
  objectives: z.array(z.string().min(1).max(300)).min(1).max(20),
  targetAudience: z.array(z.string().min(1).max(300)).max(10).default([]),
  estimatedDuration: z.number().int().min(0).optional(),
  maxEnrollments: z.number().int().min(1).optional(),
  price: z.number().min(0).optional(),
  currency: z.string().length(3).default("USD"),
  status: statusEnum.default("draft"),
  visibility: visibilityEnum.default("private"),
  settings: z
    .object({
      allowSelfPaced: z.boolean().default(true),
      allowDiscussions: z.boolean().default(true),
      showProgressBar: z.boolean().default(true),
      certificateEnabled: z.boolean().default(false),
      completionCriteria: z
        .enum(["all_lessons", "percentage", "quiz_pass", "manual"])
        .default("all_lessons"),
      completionPercentage: z.number().min(0).max(100).optional(),
    })
    .default({}),
  metadata: metadataSchema.default({}),
  localization: z
    .record(localeSchema, z.object({ title: z.string(), description: z.string() }))
    .default({}),
});

export const updateCourseSchema = createCourseSchema.partial().extend({
  id: idSchema,
});

export const courseQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  categoryId: idSchema.optional(),
  instructorId: idSchema.optional(),
  difficulty: difficultyEnum.optional(),
  status: statusEnum.optional(),
  visibility: visibilityEnum.optional(),
  language: localeSchema.optional(),
  tags: z.array(z.string()).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  createdAfter: isoDateSchema.optional(),
  createdBefore: isoDateSchema.optional(),
  sortBy: z
    .enum([
      "title",
      "createdAt",
      "updatedAt",
      "enrollments",
      "rating",
      "price",
    ])
    .default("createdAt"),
});

export const courseFilterSchema = z.object({
  search: z.string().optional(),
  categories: z.array(idSchema).optional(),
  instructors: z.array(idSchema).optional(),
  difficulties: z.array(difficultyEnum).optional(),
  statuses: z.array(statusEnum).optional(),
  visibilities: z.array(visibilityEnum).optional(),
  languages: z.array(localeSchema).optional(),
  tags: z.array(z.string()).optional(),
  priceRange: z
    .object({ min: z.number().min(0), max: z.number().min(0) })
    .optional(),
  dateRange: z
    .object({ from: isoDateSchema, to: isoDateSchema })
    .optional(),
  hasCertificate: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const createModuleSchema = z.object({
  courseId: idSchema,
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  order: z.number().int().min(0),
  duration: z.number().int().min(0).optional(),
  isRequired: z.boolean().default(true),
  prerequisites: z.array(idSchema).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateModuleSchema = createModuleSchema.partial().extend({
  id: idSchema,
});

export const createLessonSchema = z.object({
  moduleId: idSchema,
  title: z.string().min(1).max(300),
  slug: slugSchema,
  description: z.string().max(2000).optional(),
  content: z.string().max(50000).optional(),
  contentType: contentTypeEnum,
  order: z.number().int().min(0),
  duration: z.number().int().min(0).optional(),
  isRequired: z.boolean().default(true),
  isPreview: z.boolean().default(false),
  resources: z.array(fileInfoSchema).max(10).default([]),
  videoUrl: urlSchema.optional(),
  attachments: z.array(fileInfoSchema).max(10).default([]),
  metadata: metadataSchema.default({}),
  localization: z
    .record(
      localeSchema,
      z.object({ title: z.string(), description: z.string().optional() })
    )
    .default({}),
});

export const updateLessonSchema = createLessonSchema.partial().extend({
  id: idSchema,
});

export const createChapterSchema = z.object({
  lessonId: idSchema,
  title: z.string().min(1).max(300),
  content: z.string().max(50000).optional(),
  order: z.number().int().min(0),
  duration: z.number().int().min(0).optional(),
  type: z.enum(["text", "video", "quiz", "assignment", "interactive"]).default("text"),
  metadata: metadataSchema.default({}),
});

export const updateChapterSchema = createChapterSchema.partial().extend({
  id: idSchema,
});

export const createUnitSchema = z.object({
  chapterId: idSchema,
  title: z.string().min(1).max(300),
  content: z.string().max(50000).optional(),
  order: z.number().int().min(0),
  type: z.enum(["text", "video", "image", "interactive", "code"]).default("text"),
  duration: z.number().int().min(0).optional(),
  metadata: metadataSchema.default({}),
});

export const updateUnitSchema = createUnitSchema.partial().extend({
  id: idSchema,
});

export const createTopicSchema = z.object({
  unitId: idSchema,
  title: z.string().min(1).max(300),
  content: z.string().max(100000).optional(),
  order: z.number().int().min(0),
  type: z.enum(["text", "code", "media", "interactive", "assessment"]).default("text"),
  metadata: metadataSchema.default({}),
});

export const updateTopicSchema = createTopicSchema.partial().extend({
  id: idSchema,
});

export const courseVersionSchema = z.object({
  courseId: idSchema,
  version: z.string().min(1).max(50),
  changelog: z.string().min(1).max(2000),
  majorVersion: z.number().int().min(0),
  minorVersion: z.number().int().min(0),
  patchVersion: z.number().int().min(0),
  isBreaking: z.boolean().default(false),
});

export const courseArchiveSchema = z.object({
  courseId: idSchema,
  reason: z.string().max(1000).optional(),
  archiveContent: z.boolean().default(false),
  notifyEnrolled: z.boolean().default(true),
});

export const coursePublishSchema = z.object({
  courseId: idSchema,
  publishAt: isoDateSchema.optional(),
  notifySubscribers: z.boolean().default(true),
  releaseNotes: z.string().max(2000).optional(),
  version: z.string().optional(),
});

export const courseDuplicationSchema = z.object({
  sourceCourseId: idSchema,
  newTitle: z.string().min(1).max(300),
  newSlug: slugSchema,
  includeEnrollments: z.boolean().default(false),
  includeGrades: z.boolean().default(false),
  includeDiscussions: z.boolean().default(false),
  targetInstructorId: idSchema.optional(),
});

export const courseTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().min(1).max(100),
  difficulty: difficultyEnum,
  modules: z
    .array(
      z.object({
        title: z.string().min(1).max(300),
        lessons: z.array(
          z.object({
            title: z.string().min(1).max(300),
            contentType: contentTypeEnum,
          })
        ),
      })
    )
    .min(1),
  tags: z.array(tagSchema).default([]),
  thumbnail: urlSchema.optional(),
});

export const courseWorkflowSchema = z.object({
  courseId: idSchema,
  currentStatus: statusEnum,
  targetStatus: statusEnum,
  reviewerId: idSchema.optional(),
  reviewNotes: z.string().max(2000).optional(),
  autoApprove: z.boolean().default(false),
});

export const courseEnrollmentSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
  enrolledAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
  enrollmentType: z.enum(["self", "admin", "group", "api"]).default("self"),
  status: z.enum(["active", "inactive", "completed", "suspended"]).default("active"),
  source: z.string().max(100).optional(),
});

export const courseCompletionSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
  completedAt: isoDateSchema.optional(),
  progress: z.number().min(0).max(100).default(0),
  score: z.number().min(0).max(100).optional(),
  timeSpent: z.number().int().min(0).optional(),
  certificateId: idSchema.optional(),
});

export const coursePrerequisiteSchema = z.object({
  courseId: idSchema,
  prerequisiteCourseId: idSchema,
  minScore: z.number().min(0).max(100).optional(),
  isRequired: z.boolean().default(true),
  bypassable: z.boolean().default(false),
});

export const courseTagSchema = z.object({
  courseId: idSchema,
  tagId: idSchema,
});

export const courseReviewSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(200).optional(),
  comment: z.string().min(1).max(5000).optional(),
  isPublic: z.boolean().default(true),
});

export const courseSearchSchema = z.object({
  query: z.string().min(1).max(200),
  filters: courseFilterSchema.optional(),
  pagination: paginationSchema.optional(),
  highlight: z.boolean().default(true),
  suggest: z.boolean().default(false),
});

export const courseImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["scorm", "cmi5", "csv", "json", "qti", "moodle"]),
  courseId: idSchema.optional(),
  overwrite: z.boolean().default(false),
  mapping: z.record(z.string(), z.string()).optional(),
});

export const courseExportSchema = z.object({
  courseId: idSchema,
  format: z.enum(["scorm", "cmi5", "csv", "json", "pdf", "moodle"]),
  includeGrades: z.boolean().default(false),
  includeAnalytics: z.boolean().default(false),
  includeEnrollments: z.boolean().default(false),
  dateRange: z
    .object({ from: isoDateSchema, to: isoDateSchema })
    .optional(),
});

export const courseBulkUpdateSchema = z.object({
  courseIds: z.array(idSchema).min(1).max(100),
  updates: z.object({
    status: statusEnum.optional(),
    visibility: visibilityEnum.optional(),
    categoryId: idSchema.optional(),
    price: z.number().min(0).optional(),
    difficulty: difficultyEnum.optional(),
    tags: z.array(tagSchema).optional(),
  }),
});

export const courseBulkDeleteSchema = z.object({
  courseIds: z.array(idSchema).min(1).max(100),
  soft: z.boolean().default(true),
  reason: z.string().max(1000).optional(),
});

export const courseCategorySchema = z.object({
  id: idSchema.optional(),
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().max(2000).optional(),
  parentId: idSchema.optional(),
  order: z.number().int().min(0).default(0),
  icon: z.string().max(100).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  isVisible: z.boolean().default(true),
});

export const courseCategoryCreateSchema = courseCategorySchema.omit({ id: true });

export const courseCategoryUpdateSchema = courseCategorySchema.partial().extend({
  id: idSchema,
});

export const courseCategoryQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  parentId: idSchema.optional(),
  isVisible: z.boolean().optional(),
});

export const moduleReorderSchema = z.object({
  courseId: idSchema,
  moduleIds: z.array(idSchema).min(1),
});

export const lessonReorderSchema = z.object({
  moduleId: idSchema,
  lessonIds: z.array(idSchema).min(1),
});

export const moduleCompletionSchema = z.object({
  moduleId: idSchema,
  userId: idSchema,
  completedAt: isoDateSchema.optional(),
  progress: z.number().min(0).max(100).default(0),
});

export const lessonCompletionSchema = z.object({
  lessonId: idSchema,
  userId: idSchema,
  completedAt: isoDateSchema.optional(),
  progress: z.number().min(0).max(100).default(0),
  score: z.number().min(0).max(100).optional(),
  timeSpent: z.number().int().min(0).optional(),
});

export const courseAnalyticsSchema = z.object({
  courseId: idSchema,
  dateRange: z
    .object({ from: isoDateSchema, to: isoDateSchema })
    .optional(),
  metrics: z
    .array(
      z.enum([
        "enrollments",
        "completions",
        "dropouts",
        "engagement",
        "revenue",
        "ratings",
        "completionRate",
        "averageTime",
      ])
    )
    .optional(),
  granularity: z.enum(["hour", "day", "week", "month"]).default("day"),
});

export const courseCertificateSchema = z.object({
  courseId: idSchema,
  templateId: idSchema.optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  criteria: z
    .object({
      minProgress: z.number().min(0).max(100).default(100),
      minScore: z.number().min(0).max(100).optional(),
      requireAllLessons: z.boolean().default(true),
    })
    .default({}),
  expiryDays: z.number().int().min(0).optional(),
  issuedCount: z.number().int().min(0).default(0),
});

export const courseCompletionCriteriaSchema = z.object({
  courseId: idSchema,
  type: z.enum(["all_lessons", "percentage", "quiz_pass", "manual"]),
  percentage: z.number().min(0).max(100).optional(),
  quizId: idSchema.optional(),
  minScore: z.number().min(0).max(100).optional(),
  requiredLessonIds: z.array(idSchema).optional(),
});

export const coursePrerequisiteCheckSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
  skipPrerequisites: z.boolean().default(false),
});

export const courseShareSchema = z.object({
  courseId: idSchema,
  sharedWithUserId: idSchema.optional(),
  sharedWithGroupId: idSchema.optional(),
  permission: z.enum(["view", "edit", "admin"]).default("view"),
  expiresAt: isoDateSchema.optional(),
  message: z.string().max(500).optional(),
});

export const courseBookmarkSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
  note: z.string().max(500).optional(),
});

export const courseFavoriteSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
});

export const courseRatingSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
  rating: z.number().int().min(1).max(5),
  review: z.string().max(5000).optional(),
  isPublic: z.boolean().default(true),
});

export const courseRecommendationSchema = z.object({
  userId: idSchema,
  courseId: idSchema,
  score: z.number().min(0).max(1),
  reason: z.string().max(500).optional(),
  algorithm: z.enum(["collaborative", "content", "hybrid", "ai"]).default("hybrid"),
});

export const courseProgressSchema = z.object({
  courseId: idSchema,
  userId: idSchema,
  completedLessons: z.array(idSchema).default([]),
  currentLessonId: idSchema.optional(),
  progress: z.number().min(0).max(100).default(0),
  timeSpent: z.number().int().min(0).default(0),
  lastAccessedAt: isoDateSchema.optional(),
  startedAt: isoDateSchema.optional(),
  completedAt: isoDateSchema.optional(),
});

export const courseTimelineSchema = z.object({
  courseId: idSchema,
  events: z.array(
    z.object({
      id: idSchema.optional(),
      type: z.enum(["created", "updated", "published", "enrolled", "completed", "archived"]),
      timestamp: isoDateSchema,
      userId: idSchema.optional(),
      details: z.string().max(1000).optional(),
    })
  ),
});

export const courseSyllabusSchema = z.object({
  courseId: idSchema,
  modules: z.array(
    z.object({
      id: idSchema.optional(),
      title: z.string().min(1).max(300),
      description: z.string().max(2000).optional(),
      duration: z.number().int().min(0).optional(),
      lessons: z.array(
        z.object({
          id: idSchema.optional(),
          title: z.string().min(1).max(300),
          type: contentTypeEnum,
          duration: z.number().int().min(0).optional(),
        })
      ),
    })
  ),
});

export const courseSettingsSchema = z.object({
  courseId: idSchema,
  allowSelfPaced: z.boolean().default(true),
  allowDiscussions: z.boolean().default(true),
  allowDownloads: z.boolean().default(false),
  showProgressBar: z.boolean().default(true),
  certificateEnabled: z.boolean().default(false),
  completionCriteria: z
    .enum(["all_lessons", "percentage", "quiz_pass", "manual"])
    .default("all_lessons"),
  completionPercentage: z.number().min(0).max(100).optional(),
  maxAttempts: z.number().int().min(1).optional(),
  timeLimit: z.number().int().min(0).optional(),
  passingScore: z.number().min(0).max(100).optional(),
  enrollmentLimit: z.number().int().min(1).optional(),
  waitlistEnabled: z.boolean().default(false),
  dripContent: z.boolean().default(false),
  dripInterval: z.number().int().min(1).optional(),
  dripUnit: z.enum(["days", "weeks", "months"]).default("days"),
});

export const coursePrivacySchema = z.object({
  courseId: idSchema,
  visibility: visibilityEnum,
  enrolledOnlyContent: z.boolean().default(true),
  allowIndexing: z.boolean().default(true),
  dataRetentionDays: z.number().int().min(0).optional(),
  anonymizeAnalytics: z.boolean().default(false),
});

export const courseAccessibilitySchema = z.object({
  courseId: idSchema,
  wcagLevel: z.enum(["A", "AA", "AAA"]).default("AA"),
  hasTranscripts: z.boolean().default(false),
  hasCaptions: z.boolean().default(false),
  hasAudioDescription: z.boolean().default(false),
  hasSignLanguage: z.boolean().default(false),
  hasAltText: z.boolean().default(false),
  hasKeyboardNavigation: z.boolean().default(true),
  hasScreenReaderSupport: z.boolean().default(true),
  hasHighContrast: z.boolean().default(false),
  hasTextToSpeech: z.boolean().default(false),
});

export const courseLocalizationSchema = z.object({
  courseId: idSchema,
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(
    localeSchema,
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      shortDescription: z.string().optional(),
      objectives: z.array(z.string()).optional(),
    })
  ),
});

export const courseMetadataSchema = z.object({
  courseId: idSchema,
  author: z.string().max(200).optional(),
  publisher: z.string().max(200).optional(),
  isbn: z.string().max(20).optional(),
  version: z.string().max(50).optional(),
  subject: z.string().max(200).optional(),
  educationalLevel: z.string().max(100).optional(),
  learningResourceType: z.string().max(100).optional(),
  interactivityType: z.string().max(100).optional(),
  interactivityLevel: z.string().max(100).optional(),
  semanticDensity: z.number().min(0).max(1).optional(),
  intendedEndUserRole: z.string().max(100).optional(),
  context: z.string().max(200).optional(),
  customFields: z.record(z.string(), z.unknown()).default({}),
});

export const courseSEOConfigSchema = z.object({
  courseId: idSchema,
  metaTitle: z.string().min(1).max(70),
  metaDescription: z.string().min(1).max(160),
  keywords: z.array(z.string().min(1).max(50)).max(20).default([]),
  canonicalUrl: urlSchema.optional(),
  ogTitle: z.string().max(100).optional(),
  ogDescription: z.string().max(300).optional(),
  ogImage: urlSchema.optional(),
  twitterCard: z.enum(["summary", "summary_large_image"]).default("summary"),
  structuredData: z.record(z.string(), z.unknown()).optional(),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
});

export const coursePricingSchema = z.object({
  courseId: idSchema,
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  compareAtPrice: z.number().min(0).optional(),
  taxIncluded: z.boolean().default(false),
  taxRate: z.number().min(0).max(100).optional(),
  paymentPlans: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        installments: z.number().int().min(1),
        intervalDays: z.number().int().min(1),
        amount: z.number().min(0),
      })
    )
    .max(5)
    .optional(),
});

export const courseDiscountSchema = z.object({
  courseId: idSchema,
  code: z.string().min(3).max(50),
  type: z.enum(["percentage", "fixed"]),
  value: z.number().min(0),
  maxUses: z.number().int().min(1).optional(),
  currentUses: z.number().int().min(0).default(0),
  startsAt: isoDateSchema,
  expiresAt: isoDateSchema,
  applicableToNewOnly: z.boolean().default(false),
  minPurchase: z.number().min(0).optional(),
});

export const courseBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  courseIds: z.array(idSchema).min(2).max(50),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional(),
  thumbnail: urlSchema.optional(),
  isActive: z.boolean().default(true),
});

export const courseSubscriptionSchema = z.object({
  courseId: idSchema,
  planName: z.string().min(1).max(100),
  interval: z.enum(["monthly", "quarterly", "annual"]),
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  trialDays: z.number().int().min(0).default(0),
  maxUsers: z.number().int().min(1).optional(),
  features: z.array(z.string().max(200)).default([]),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 2. Digital Content (~50 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const videoUploadSchema = z.object({
  file: z.instanceof(File),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  categoryId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  thumbnail: z.instanceof(File).optional(),
  captions: z
    .array(
      z.object({
        file: z.instanceof(File),
        language: localeSchema,
        label: z.string().max(100),
      })
    )
    .max(20)
    .default([]),
  transcodeOptions: z
    .object({
      resolutions: z
        .array(z.enum(["360p", "480p", "720p", "1080p", "1440p", "4k"]))
        .default(["720p", "1080p"]),
      formats: z.array(z.enum(["mp4", "webm", "hls"])).default(["mp4", "hls"]),
    })
    .default({}),
  visibility: visibilityEnum.default("private"),
});

export const videoUpdateSchema = z.object({
  videoId: idSchema,
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  thumbnail: urlSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).optional(),
  categoryId: idSchema.optional(),
  visibility: visibilityEnum.optional(),
  metadata: metadataSchema.optional(),
});

export const videoQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  categoryId: idSchema.optional(),
  tags: z.array(z.string()).optional(),
  visibility: visibilityEnum.optional(),
  uploadedAfter: isoDateSchema.optional(),
  uploadedBefore: isoDateSchema.optional(),
  minDuration: z.number().int().min(0).optional(),
  maxDuration: z.number().int().min(0).optional(),
  sortBy: z.enum(["title", "createdAt", "views", "duration"]).default("createdAt"),
});

export const audioUploadSchema = z.object({
  file: z.instanceof(File),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  artist: z.string().max(200).optional(),
  album: z.string().max(200).optional(),
  genre: z.string().max(100).optional(),
  categoryId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  coverArt: z.instanceof(File).optional(),
  visibility: visibilityEnum.default("private"),
});

export const audioUpdateSchema = z.object({
  audioId: idSchema,
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  artist: z.string().max(200).optional(),
  album: z.string().max(200).optional(),
  genre: z.string().max(100).optional(),
  coverArt: urlSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).optional(),
  categoryId: idSchema.optional(),
  visibility: visibilityEnum.optional(),
});

export const pdfUploadSchema = z.object({
  file: z.instanceof(File),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  author: z.string().max(200).optional(),
  categoryId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  allowAnnotations: z.boolean().default(true),
  allowDownload: z.boolean().default(true),
  visibility: visibilityEnum.default("private"),
  password: z.string().min(4).max(50).optional(),
});

export const pdfAnnotationSchema = z.object({
  pdfId: idSchema,
  userId: idSchema,
  page: z.number().int().min(1),
  type: z.enum(["highlight", "underline", "strikethrough", "note", "freehand", "text", "stamp"]),
  content: z.string().max(5000).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#FFD700"),
  position: z
    .object({
      x: z.number(),
      y: z.number(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
  isPublic: z.boolean().default(false),
});

export const presentationUploadSchema = z.object({
  file: z.instanceof(File),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  author: z.string().max(200).optional(),
  categoryId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  format: z.enum(["pptx", "key", "odp", "google_slides"]),
  allowDownload: z.boolean().default(true),
  visibility: visibilityEnum.default("private"),
});

export const imageUploadSchema = z.object({
  file: z.instanceof(File),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  altText: z.string().max(500).optional(),
  categoryId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  resizeOptions: z
    .object({
      maxWidth: z.number().int().min(1).optional(),
      maxHeight: z.number().int().min(1).optional(),
      quality: z.number().min(0).max(1).default(0.85),
    })
    .optional(),
  visibility: visibilityEnum.default("private"),
});

export const interactiveContentSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  type: z.enum(["h5p", "scorm", "cmi5", "custom"]),
  contentData: z.record(z.string(), z.unknown()),
  categoryId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  settings: z
    .object({
      allowReview: z.boolean().default(true),
      showScore: z.boolean().default(true),
      passingScore: z.number().min(0).max(100).optional(),
    })
    .default({}),
  visibility: visibilityEnum.default("private"),
});

export const scormImportSchema = z.object({
  file: z.instanceof(File),
  courseId: idSchema.optional(),
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  scormVersion: z.enum(["1.2", "2004"]).default("2004"),
  launchBehavior: z.enum(["normal", "popup", "iframe"]).default("normal"),
  masteryScore: z.number().min(0).max(100).optional(),
  maxTimeAllowed: z.number().int().min(0).optional(),
  timeLimitAction: z.enum(["none", "pause", "submit"]).default("none"),
});

export const scormExportSchema = z.object({
  courseId: idSchema,
  scormVersion: z.enum(["1.2", "2004"]).default("2004"),
  includeGrades: z.boolean().default(false),
  includeManifest: z.boolean().default(true),
  packageType: z.enum(["precalculated", "postcalculated"]).default("precalculated"),
});

export const xapiStatementSchema = z.object({
  actor: z.object({
    mbox: z.string().email().optional(),
    account: z
      .object({
        name: z.string(),
        homePage: urlSchema,
      })
      .optional(),
    name: z.string().optional(),
  }),
  verb: z.object({
    id: urlSchema,
    display: z.record(localeSchema, z.string()),
  }),
  object: z.object({
    id: urlSchema,
    definition: z
      .object({
        name: z.record(localeSchema, z.string()),
        description: z.record(localeSchema, z.string()).optional(),
        type: urlSchema.optional(),
      })
      .optional(),
  }),
  result: z
    .object({
      score: z
        .object({
          scaled: z.number().min(-1).max(1),
          raw: z.number().optional(),
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
      success: z.boolean().optional(),
      completion: z.boolean().optional(),
      duration: z.string().optional(),
      response: z.string().optional(),
    })
    .optional(),
  context: z
    .object({
      contextActivities: z
        .object({
          parent: z.array(z.object({ id: urlSchema })).optional(),
          grouping: z.array(z.object({ id: urlSchema })).optional(),
        })
        .optional(),
      instructor: z.object({ mbox: z.string().email().optional() }).optional(),
      team: z.object({ mbox: z.string().email().optional() }).optional(),
      revision: z.string().optional(),
      platform: z.string().optional(),
      language: localeSchema.optional(),
    })
    .optional(),
  timestamp: isoDateSchema.optional(),
  authority: z
    .object({
      objectType: z.string().default("Agent"),
      mbox: z.string().email().optional(),
    })
    .optional(),
  attachment: z
    .array(
      z.object({
        usageType: urlSchema,
        display: z.record(localeSchema, z.string()),
        contentType: z.string(),
        length: z.number().int().min(0),
        sha2: z.string(),
      })
    )
    .optional(),
});

export const xapiQuerySchema = paginationSchema.extend({
  actor: z.object({ mbox: z.string().email().optional() }).optional(),
  verb: z.string().optional(),
  object: z.object({ id: urlSchema.optional() }).optional(),
  registration: z.string().uuid().optional(),
  since: isoDateSchema.optional(),
  until: isoDateSchema.optional(),
  limit: z.number().int().min(1).max(100).default(25),
  format: z.enum(["exact", "canonical", "ids"]).default("exact"),
  attachments: z.boolean().default(false),
});

export const h5pImportSchema = z.object({
  file: z.instanceof(File),
  courseId: idSchema.optional(),
  title: z.string().min(1).max(300).optional(),
  embedType: z.enum(["div", "iframe"]).default("div"),
  displayOptions: z
    .object({
      frame: z.boolean().default(true),
      export: z.boolean().default(true),
      embed: z.boolean().default(true),
      copyright: z.boolean().default(true),
    })
    .default({}),
});

export const h5pExportSchema = z.object({
  contentId: idSchema,
  includeMetadata: z.boolean().default(true),
  includeLibraries: z.boolean().default(false),
});

export const epubImportSchema = z.object({
  file: z.instanceof(File),
  courseId: idSchema.optional(),
  title: z.string().min(1).max(300).optional(),
  author: z.string().max(200).optional(),
  language: localeSchema.default("en"),
  enableAnnotations: z.boolean().default(true),
  enableHighlighting: z.boolean().default(true),
});

export const epubAnnotationSchema = z.object({
  epubId: idSchema,
  userId: idSchema,
  cfiRange: z.string().min(1),
  content: z.string().max(5000).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#FFD700"),
  type: z.enum(["highlight", "underline", "note", "bookmark"]).default("highlight"),
  isPublic: z.boolean().default(false),
});

export const zipPackageSchema = z.object({
  file: z.instanceof(File),
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  packageType: z.enum(["scorm", "cmi5", "h5p", "generic"]),
  courseId: idSchema.optional(),
  overwrite: z.boolean().default(false),
});

export const streamingConfigSchema = z.object({
  contentId: idSchema,
  quality: z.array(z.enum(["360p", "480p", "720p", "1080p", "1440p", "4k"])),
  protocol: z.enum(["hls", "dash", "mss"]).default("hls"),
  drm: z
    .object({
      enabled: z.boolean().default(false),
      type: z.enum(["widevine", "fairplay", "playready"]).optional(),
    })
    .default({}),
  cdn: z.string().max(200).optional(),
  transcoding: z
    .object({
      enabled: z.boolean().default(true),
      preset: z.enum(["fast", "balanced", "quality"]).default("balanced"),
    })
    .default({}),
  caching: z
    .object({
      enabled: z.boolean().default(true),
      ttl: z.number().int().min(60).default(3600),
    })
    .default({}),
});

export const offlinePackageSchema = z.object({
  contentId: idSchema,
  format: z.enum(["mp4", "webm", "audio", "pdf"]),
  quality: z.string().optional(),
  maxSize: z.number().int().min(1).optional(),
  includeSubtitles: z.boolean().default(true),
  includeMetadata: z.boolean().default(true),
  compressionLevel: z.enum(["none", "low", "medium", "high"]).default("medium"),
});

export const contentMetadataSchema = z.object({
  contentId: idSchema,
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  author: z.string().max(200).optional(),
  license: z.string().max(100).optional(),
  copyright: z.string().max(500).optional(),
  tags: z.array(z.string().max(100)).max(30).default([]),
  category: z.string().max(100).optional(),
  language: localeSchema.default("en"),
  duration: z.number().int().min(0).optional(),
  fileSize: z.number().int().min(0).optional(),
  mimeType: z.string().optional(),
  customFields: z.record(z.string(), z.unknown()).default({}),
});

export const contentVersionSchema = z.object({
  contentId: idSchema,
  version: z.string().min(1).max(50),
  changelog: z.string().min(1).max(2000),
  fileUrl: urlSchema,
  fileSize: z.number().int().min(0),
  isBreaking: z.boolean().default(false),
  publishedAt: isoDateSchema.optional(),
});

export const contentTagSchema = z.object({
  contentId: idSchema,
  tags: z.array(z.string().min(1).max(100)).min(1).max(30),
});

export const contentCategorySchema = z.object({
  contentId: idSchema,
  categoryId: idSchema,
  isPrimary: z.boolean().default(false),
});

export const contentSearchSchema = z.object({
  query: z.string().min(1).max(200),
  type: z.array(contentTypeEnum).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  language: localeSchema.optional(),
  dateRange: z
    .object({ from: isoDateSchema, to: isoDateSchema })
    .optional(),
  sortBy: z
    .enum(["relevance", "title", "createdAt", "views", "rating"])
    .default("relevance"),
  pagination: paginationSchema.optional(),
});

export const contentLicenseSchema = z.object({
  contentId: idSchema,
  type: z.enum([
    "cc-by",
    "cc-by-sa",
    "cc-by-nc",
    "cc-by-nc-sa",
    "cc-by-nd",
    "cc-by-nc-nd",
    "cc0",
    "proprietary",
    "custom",
  ]),
  customTerms: z.string().max(5000).optional(),
  attribution: z.string().max(500).optional(),
  commercialUse: z.boolean().default(false),
  shareAlike: z.boolean().default(false),
  derivativeWorks: z.boolean().default(true),
  expiresAt: isoDateSchema.optional(),
});

export const contentRightsSchema = z.object({
  contentId: idSchema,
  owner: z.string().min(1).max(200),
  rights: z.array(z.string().max(100)).default([]),
  territories: z.array(z.string().max(100)).default([]),
  validFrom: isoDateSchema.optional(),
  validUntil: isoDateSchema.optional(),
  transferable: z.boolean().default(false),
  exclusive: z.boolean().default(false),
});

export const contentModerationSchema = z.object({
  contentId: idSchema,
  status: z.enum(["pending", "approved", "rejected", "flagged"]),
  moderatorId: idSchema.optional(),
  reason: z.string().max(2000).optional(),
  notes: z.string().max(2000).optional(),
  flags: z
    .array(
      z.enum(["inappropriate", "spam", "copyright", "harassment", "misinformation", "other"])
    )
    .default([]),
});

export const contentBulkUploadSchema = z.object({
  files: z.array(z.instanceof(File)).min(1).max(100),
  categoryId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  visibility: visibilityEnum.default("private"),
  overwrite: z.boolean().default(false),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const contentBulkDeleteSchema = z.object({
  contentIds: z.array(idSchema).min(1).max(100),
  soft: z.boolean().default(true),
  reason: z.string().max(1000).optional(),
});

export const contentBulkUpdateSchema = z.object({
  contentIds: z.array(idSchema).min(1).max(100),
  updates: z.object({
    categoryId: idSchema.optional(),
    tags: z.array(z.string().max(100)).optional(),
    visibility: visibilityEnum.optional(),
    status: z.enum(["active", "inactive", "archived"]).optional(),
  }),
});

export const contentAnalyticsSchema = z.object({
  contentId: idSchema,
  dateRange: z
    .object({ from: isoDateSchema, to: isoDateSchema })
    .optional(),
  metrics: z
    .array(z.enum(["views", "downloads", "engagement", "completion", "rating", "shares"]))
    .optional(),
  granularity: z.enum(["hour", "day", "week", "month"]).default("day"),
});

export const contentDownloadSchema = z.object({
  contentId: idSchema,
  userId: idSchema,
  format: z.enum(["original", "compressed", "converted"]).default("original"),
  quality: z.string().optional(),
});

export const contentShareSchema = z.object({
  contentId: idSchema,
  sharedWithUserId: idSchema.optional(),
  sharedWithGroupId: idSchema.optional(),
  permission: z.enum(["view", "download", "edit"]).default("view"),
  expiresAt: isoDateSchema.optional(),
  message: z.string().max(500).optional(),
});

export const contentBookmarkSchema = z.object({
  contentId: idSchema,
  userId: idSchema,
  note: z.string().max(500).optional(),
  collection: z.string().max(100).optional(),
});

export const contentFavoriteSchema = z.object({
  contentId: idSchema,
  userId: idSchema,
});

export const contentReportSchema = z.object({
  contentId: idSchema,
  userId: idSchema,
  reason: z.enum(["inappropriate", "spam", "copyright", "harassment", "misinformation", "broken", "other"]),
  description: z.string().max(2000).optional(),
  evidence: z.array(urlSchema).max(5).default([]),
});

export const contentFeedbackSchema = z.object({
  contentId: idSchema,
  userId: idSchema,
  type: z.enum(["bug", "suggestion", "question", "praise"]),
  message: z.string().min(1).max(5000),
  contactEmail: emailSchema.optional(),
  pageUrl: urlSchema.optional(),
});

export const contentRatingSchema = z.object({
  contentId: idSchema,
  userId: idSchema,
  rating: z.number().int().min(1).max(5),
  review: z.string().max(5000).optional(),
  isPublic: z.boolean().default(true),
});

export const contentRecommendationSchema = z.object({
  userId: idSchema,
  contentId: idSchema,
  score: z.number().min(0).max(1),
  reason: z.string().max(500).optional(),
  algorithm: z.enum(["collaborative", "content", "hybrid", "ai"]).default("hybrid"),
});

export const contentAccessibilitySchema = z.object({
  contentId: idSchema,
  wcagLevel: z.enum(["A", "AA", "AAA"]).default("AA"),
  hasTranscript: z.boolean().default(false),
  hasCaptions: z.boolean().default(false),
  hasAudioDescription: z.boolean().default(false),
  hasSignLanguage: z.boolean().default(false),
  hasAltText: z.boolean().default(false),
  hasLongDescription: z.boolean().default(false),
  hasKeyboardNavigation: z.boolean().default(true),
  hasScreenReaderSupport: z.boolean().default(true),
});

export const contentLocalizationSchema = z.object({
  contentId: idSchema,
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(
    localeSchema,
    z.object({
      title: z.string().min(1),
      description: z.string().optional(),
    })
  ),
});

export const contentSEOConfigSchema = z.object({
  contentId: idSchema,
  metaTitle: z.string().min(1).max(70),
  metaDescription: z.string().min(1).max(160),
  keywords: z.array(z.string().min(1).max(50)).max(20).default([]),
  canonicalUrl: urlSchema.optional(),
  ogTitle: z.string().max(100).optional(),
  ogDescription: z.string().max(300).optional(),
  ogImage: urlSchema.optional(),
  noIndex: z.boolean().default(false),
});

export const contentPricingSchema = z.object({
  contentId: idSchema,
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  isFree: z.boolean().default(false),
  licenseType: z.enum(["single", "multi", "enterprise", "subscription"]),
  maxSeats: z.number().int().min(1).optional(),
});

export const contentPreviewSchema = z.object({
  contentId: idSchema,
  quality: z.enum(["low", "medium", "high"]).default("medium"),
  maxLength: z.number().int().min(10).max(600).default(30),
  includeWatermark: z.boolean().default(true),
});

export const contentTranscodeSchema = z.object({
  contentId: idSchema,
  targetFormat: z.enum(["mp4", "webm", "hls", "dash"]),
  quality: z.array(z.enum(["360p", "480p", "720p", "1080p"])),
  preset: z.enum(["fast", "balanced", "quality"]).default("balanced"),
  keepOriginal: z.boolean().default(true),
});

export const contentEncodeSchema = z.object({
  contentId: idSchema,
  codec: z.enum(["h264", "h265", "vp9", "av1"]),
  bitrate: z.number().int().min(100).max(50000),
  resolution: z.string().regex(/^\d+x\d+$/),
  frameRate: z.number().int().min(1).max(120).default(30),
  audioCodec: z.enum(["aac", "mp3", "opus"]).default("aac"),
  audioBitrate: z.number().int().min(32).max(320).default(128),
});

export const contentCompressSchema = z.object({
  contentId: idSchema,
  targetSize: z.number().int().min(1).optional(),
  quality: z.number().min(0).max(1).default(0.7),
  method: z.enum(["gzip", "brotli", "lz4", "zstd"]).default("gzip"),
  level: z.number().int().min(1).max(9).default(6),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 3. Learning Paths (~40 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const createLearningPathSchema = z.object({
  title: z.string().min(1).max(300),
  slug: slugSchema,
  description: z.string().min(1).max(5000),
  shortDescription: z.string().min(1).max(500).optional(),
  instructorId: idSchema,
  difficulty: difficultyEnum,
  language: localeSchema.default("en"),
  thumbnail: urlSchema.optional(),
  banner: urlSchema.optional(),
  tags: z.array(tagSchema).max(20).default([]),
  estimatedDuration: z.number().int().min(0).optional(),
  price: z.number().min(0).optional(),
  currency: z.string().length(3).default("USD"),
  status: statusEnum.default("draft"),
  visibility: visibilityEnum.default("private"),
  isAdaptive: z.boolean().default(false),
  competencies: z.array(z.string().max(100)).max(20).default([]),
  learningOutcomes: z.array(z.string().min(1).max(300)).min(1).max(20),
  targetAudience: z.array(z.string().min(1).max(300)).max(10).default([]),
  metadata: metadataSchema.default({}),
  settings: z
    .object({
      allowSelfPaced: z.boolean().default(true),
      showProgress: z.boolean().default(true),
      certificateEnabled: z.boolean().default(false),
      sequentialUnlock: z.boolean().default(false),
      timeLimit: z.number().int().min(0).optional(),
    })
    .default({}),
});

export const updateLearningPathSchema = createLearningPathSchema.partial().extend({
  id: idSchema,
});

export const learningPathQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  instructorId: idSchema.optional(),
  difficulty: difficultyEnum.optional(),
  status: statusEnum.optional(),
  visibility: visibilityEnum.optional(),
  tags: z.array(z.string()).optional(),
  isAdaptive: z.boolean().optional(),
  sortBy: z
    .enum(["title", "createdAt", "enrollments", "rating", "price"])
    .default("createdAt"),
});

export const learningPathFilterSchema = z.object({
  search: z.string().optional(),
  instructors: z.array(idSchema).optional(),
  difficulties: z.array(difficultyEnum).optional(),
  statuses: z.array(statusEnum).optional(),
  visibilities: z.array(visibilityEnum).optional(),
  tags: z.array(z.string()).optional(),
  priceRange: z
    .object({ min: z.number().min(0), max: z.number().min(0) })
    .optional(),
  dateRange: z
    .object({ from: isoDateSchema, to: isoDateSchema })
    .optional(),
  isAdaptive: z.boolean().optional(),
  competencies: z.array(z.string()).optional(),
});

export const learningPathModuleSchema = z.object({
  learningPathId: idSchema,
  courseId: idSchema,
  order: z.number().int().min(0),
  isRequired: z.boolean().default(true),
  unlockCriteria: z
    .object({
      type: z.enum(["immediate", "prerequisite", "score", "manual"]).default("immediate"),
      prerequisiteModuleId: idSchema.optional(),
      minScore: z.number().min(0).max(100).optional(),
    })
    .default({ type: "immediate" }),
  metadata: metadataSchema.default({}),
});

export const learningPathPrerequisiteSchema = z.object({
  learningPathId: idSchema,
  prerequisiteCourseId: idSchema,
  minScore: z.number().min(0).max(100).optional(),
  isRequired: z.boolean().default(true),
  bypassable: z.boolean().default(false),
});

export const adaptivePathSchema = z.object({
  learningPathId: idSchema,
  algorithm: z.enum(["rule_based", "ml", "hybrid"]).default("rule_based"),
  assessmentPoints: z
    .array(
      z.object({
        afterModuleId: idSchema,
        assessmentType: z.enum(["quiz", "survey", "self_assessment"]),
        passingScore: z.number().min(0).max(100).optional(),
        branchingRules: z.array(
          z.object({
            condition: z.enum(["above", "below", "equals"]),
            score: z.number(),
            targetModuleId: idSchema,
          })
        ),
      })
    )
    .max(50),
  fallbackModuleId: idSchema.optional(),
  maxBranches: z.number().int().min(1).max(10).default(5),
  settings: z
    .object({
      allowRepeat: z.boolean().default(false),
      showAdaptiveHint: z.boolean().default(true),
      trackProgress: z.boolean().default(true),
    })
    .default({}),
});

export const personalizedPathSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
  goals: z.array(z.string().min(1).max(300)).min(1).max(10),
  currentLevel: difficultyEnum,
  preferredPace: z.enum(["slow", "normal", "fast"]).default("normal"),
  preferredContentType: z.array(contentTypeEnum).max(5).default([]),
  availableHoursPerWeek: z.number().min(0).max(100).default(10),
  startDate: isoDateSchema.optional(),
  targetDate: isoDateSchema.optional(),
});

export const competencyPathSchema = z.object({
  learningPathId: idSchema,
  competencies: z.array(
    z.object({
      name: z.string().min(1).max(200),
      level: z.number().int().min(1).max(5),
      category: z.string().max(100).optional(),
      assessmentMethod: z.enum(["quiz", "project", "peer", "self"]).default("quiz"),
      courses: z.array(idSchema).default([]),
    })
  ),
  framework: z.string().max(200).optional(),
  version: z.string().max(50).optional(),
});

export const pathCertificationSchema = z.object({
  learningPathId: idSchema,
  certificationId: idSchema,
  requiredModules: z.array(idSchema).default([]),
  minScore: z.number().min(0).max(100).optional(),
  validityPeriod: z.number().int().min(0).optional(),
  renewalRequired: z.boolean().default(false),
});

export const aiRecommendedPathSchema = z.object({
  userId: idSchema,
  interests: z.array(z.string().min(1).max(100)).min(1).max(20),
  goals: z.array(z.string().min(1).max(300)).min(1).max(10),
  currentSkills: z.array(z.string().max(100)).default([]),
  desiredSkills: z.array(z.string().max(100)).default([]),
  timeCommitment: z.number().int().min(1).max(100).optional(),
  budget: z.number().min(0).optional(),
  maxPaths: z.number().int().min(1).max(10).default(5),
});

export const pathEnrollmentSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
  enrolledAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
  status: z.enum(["active", "inactive", "completed", "suspended"]).default("active"),
  source: z.string().max(100).optional(),
});

export const pathProgressSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
  completedCourses: z.array(idSchema).default([]),
  currentCourseId: idSchema.optional(),
  progress: z.number().min(0).max(100).default(0),
  timeSpent: z.number().int().min(0).default(0),
  startedAt: isoDateSchema.optional(),
  completedAt: isoDateSchema.optional(),
  lastAccessedAt: isoDateSchema.optional(),
  scores: z.record(idSchema, z.number().min(0).max(100)).default({}),
});

export const pathCompletionSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
  completedAt: isoDateSchema.optional(),
  finalScore: z.number().min(0).max(100).optional(),
  certificateId: idSchema.optional(),
  completionData: z
    .object({
      totalCourses: z.number().int().min(0),
      completedCourses: z.number().int().min(0),
      totalTime: z.number().int().min(0),
      averageScore: z.number().min(0).max(100).optional(),
    })
    .optional(),
});

export const pathDuplicateSchema = z.object({
  sourcePathId: idSchema,
  newTitle: z.string().min(1).max(300),
  newSlug: slugSchema,
  includeEnrollments: z.boolean().default(false),
  includeProgress: z.boolean().default(false),
  targetInstructorId: idSchema.optional(),
});

export const pathTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().min(1).max(100),
  difficulty: difficultyEnum,
  modules: z
    .array(
      z.object({
        title: z.string().min(1).max(300),
        courses: z.array(z.string().min(1).max(300)),
      })
    )
    .min(1),
  tags: z.array(tagSchema).default([]),
  thumbnail: urlSchema.optional(),
});

export const pathAnalyticsSchema = z.object({
  learningPathId: idSchema,
  dateRange: z
    .object({ from: isoDateSchema, to: isoDateSchema })
    .optional(),
  metrics: z
    .array(
      z.enum([
        "enrollments",
        "completions",
        "dropouts",
        "engagement",
        "revenue",
        "avgCompletionTime",
        "courseCompletionRates",
      ])
    )
    .optional(),
  granularity: z.enum(["hour", "day", "week", "month"]).default("day"),
});

export const pathExportSchema = z.object({
  learningPathId: idSchema,
  format: z.enum(["json", "csv", "pdf"]),
  includeEnrollments: z.boolean().default(false),
  includeProgress: z.boolean().default(false),
  includeAnalytics: z.boolean().default(false),
});

export const pathImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["json", "csv"]),
  overwrite: z.boolean().default(false),
  courseIdMapping: z.record(idSchema, idSchema).optional(),
});

export const pathVersionSchema = z.object({
  learningPathId: idSchema,
  version: z.string().min(1).max(50),
  changelog: z.string().min(1).max(2000),
  isBreaking: z.boolean().default(false),
});

export const pathPublishSchema = z.object({
  learningPathId: idSchema,
  publishAt: isoDateSchema.optional(),
  notifySubscribers: z.boolean().default(true),
  releaseNotes: z.string().max(2000).optional(),
});

export const pathArchiveSchema = z.object({
  learningPathId: idSchema,
  reason: z.string().max(1000).optional(),
  notifyEnrolled: z.boolean().default(true),
});

export const pathRestoreSchema = z.object({
  learningPathId: idSchema,
  reason: z.string().max(1000).optional(),
});

export const pathShareSchema = z.object({
  learningPathId: idSchema,
  sharedWithUserId: idSchema.optional(),
  sharedWithGroupId: idSchema.optional(),
  permission: z.enum(["view", "edit", "admin"]).default("view"),
  expiresAt: isoDateSchema.optional(),
  message: z.string().max(500).optional(),
});

export const pathBookmarkSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
  note: z.string().max(500).optional(),
});

export const pathFavoriteSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
});

export const pathRatingSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
  rating: z.number().int().min(1).max(5),
  review: z.string().max(5000).optional(),
  isPublic: z.boolean().default(true),
});

export const pathRecommendationSchema = z.object({
  userId: idSchema,
  learningPathId: idSchema,
  score: z.number().min(0).max(1),
  reason: z.string().max(500).optional(),
  algorithm: z.enum(["collaborative", "content", "hybrid", "ai"]).default("hybrid"),
});

export const pathProgressReportSchema = z.object({
  learningPathId: idSchema,
  userId: idSchema,
  includeModuleDetails: z.boolean().default(true),
  includeScores: z.boolean().default(true),
  includeTimeSpent: z.boolean().default(true),
  format: z.enum(["json", "pdf"]).default("json"),
});

export const pathTimelineSchema = z.object({
  learningPathId: idSchema,
  events: z.array(
    z.object({
      id: idSchema.optional(),
      type: z.enum(["created", "updated", "published", "enrolled", "completed", "archived"]),
      timestamp: isoDateSchema,
      userId: idSchema.optional(),
      details: z.string().max(1000).optional(),
    })
  ),
});

export const pathSyllabusSchema = z.object({
  learningPathId: idSchema,
  overview: z.string().max(5000).optional(),
  modules: z.array(
    z.object({
      id: idSchema.optional(),
      title: z.string().min(1).max(300),
      description: z.string().max(2000).optional(),
      duration: z.number().int().min(0).optional(),
      courses: z.array(
        z.object({
          id: idSchema.optional(),
          title: z.string().min(1).max(300),
          duration: z.number().int().min(0).optional(),
        })
      ),
    })
  ),
});

export const pathSettingsSchema = z.object({
  learningPathId: idSchema,
  allowSelfPaced: z.boolean().default(true),
  showProgress: z.boolean().default(true),
  certificateEnabled: z.boolean().default(false),
  sequentialUnlock: z.boolean().default(false),
  timeLimit: z.number().int().min(0).optional(),
  passingScore: z.number().min(0).max(100).optional(),
  maxAttempts: z.number().int().min(1).optional(),
  enrollmentLimit: z.number().int().min(1).optional(),
  allowDownload: z.boolean().default(false),
  dripContent: z.boolean().default(false),
  dripInterval: z.number().int().min(1).optional(),
  dripUnit: z.enum(["days", "weeks", "months"]).default("days"),
});

export const pathPrivacySchema = z.object({
  learningPathId: idSchema,
  visibility: visibilityEnum,
  allowIndexing: z.boolean().default(true),
  dataRetentionDays: z.number().int().min(0).optional(),
  anonymizeAnalytics: z.boolean().default(false),
});

export const pathAccessibilitySchema = z.object({
  learningPathId: idSchema,
  wcagLevel: z.enum(["A", "AA", "AAA"]).default("AA"),
  hasTranscripts: z.boolean().default(false),
  hasCaptions: z.boolean().default(false),
  hasAudioDescription: z.boolean().default(false),
  hasSignLanguage: z.boolean().default(false),
  hasAltText: z.boolean().default(false),
  hasKeyboardNavigation: z.boolean().default(true),
  hasScreenReaderSupport: z.boolean().default(true),
});

export const pathLocalizationSchema = z.object({
  learningPathId: idSchema,
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(
    localeSchema,
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      shortDescription: z.string().optional(),
    })
  ),
});

export const pathMetadataSchema = z.object({
  learningPathId: idSchema,
  author: z.string().max(200).optional(),
  publisher: z.string().max(200).optional(),
  subject: z.string().max(200).optional(),
  educationalLevel: z.string().max(100).optional(),
  customFields: z.record(z.string(), z.unknown()).default({}),
});

export const pathSEOConfigSchema = z.object({
  learningPathId: idSchema,
  metaTitle: z.string().min(1).max(70),
  metaDescription: z.string().min(1).max(160),
  keywords: z.array(z.string().min(1).max(50)).max(20).default([]),
  canonicalUrl: urlSchema.optional(),
  ogTitle: z.string().max(100).optional(),
  ogDescription: z.string().max(300).optional(),
  ogImage: urlSchema.optional(),
  noIndex: z.boolean().default(false),
});

export const pathPricingSchema = z.object({
  learningPathId: idSchema,
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  compareAtPrice: z.number().min(0).optional(),
  paymentPlans: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        installments: z.number().int().min(1),
        intervalDays: z.number().int().min(1),
        amount: z.number().min(0),
      })
    )
    .max(5)
    .optional(),
});

export const pathBundleSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  learningPathIds: z.array(idSchema).min(2).max(20),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional(),
  thumbnail: urlSchema.optional(),
  isActive: z.boolean().default(true),
});

export const pathSubscriptionSchema = z.object({
  learningPathId: idSchema,
  planName: z.string().min(1).max(100),
  interval: z.enum(["monthly", "quarterly", "annual"]),
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  trialDays: z.number().int().min(0).default(0),
  maxUsers: z.number().int().min(1).optional(),
  features: z.array(z.string().max(200)).default([]),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 4. Assignments (~50 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const rubricCriterionSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  weight: z.number().min(0).max(100).optional(),
  levels: z.array(
    z.object({
      id: idSchema.optional(),
      name: z.string().min(1).max(100),
      description: z.string().max(1000).optional(),
      score: z.number().min(0).max(100),
    })
  ).min(2).max(10),
});

export const createAssignmentSchema = z.object({
  courseId: idSchema,
  moduleId: idSchema.optional(),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(10000),
  instructions: z.string().max(20000).optional(),
  type: z.enum(["homework", "project", "case_study", "lab", "portfolio", "essay", "quiz", "discussion"]),
  difficulty: difficultyEnum,
  maxScore: z.number().min(0).max(1000),
  passingScore: z.number().min(0).max(1000).optional(),
  weight: z.number().min(0).max(100).optional(),
  dueDate: isoDateSchema.optional(),
  allowLateSubmission: z.boolean().default(false),
  latePenalty: z
    .object({
      type: z.enum(["percentage", "points", "fixed"]),
      value: z.number().min(0),
      maxPenalty: z.number().min(0).optional(),
      gracePeriodMinutes: z.number().int().min(0).optional(),
    })
    .optional(),
  maxAttempts: z.number().int().min(1).optional(),
  timeLimitMinutes: z.number().int().min(0).optional(),
  submissionType: z.enum(["file", "text", "url", "multi"]).default("file"),
  allowedFileTypes: z.array(z.string().max(20)).max(20).default([]),
  maxFileSize: z.number().int().min(1).optional(),
  rubricId: idSchema.optional(),
  peerReview: z
    .object({
      enabled: z.boolean().default(false),
      reviewersPerSubmission: z.number().int().min(1).max(10).default(3),
      anonymityLevel: z.enum(["anonymous", "partial", "open"]).default("anonymous"),
      criteria: z
        .array(z.object({ name: z.string().min(1).max(100), description: z.string().max(500).optional(), maxScore: z.number().min(0).max(100) }))
        .optional(),
    })
    .optional(),
  groupAssignment: z
    .object({
      enabled: z.boolean().default(false),
      minGroupSize: z.number().int().min(2).optional(),
      maxGroupSize: z.number().int().min(2).optional(),
      allowSelfAssign: z.boolean().default(true),
    })
    .optional(),
  status: statusEnum.default("draft"),
  visibility: visibilityEnum.default("private"),
  tags: z.array(tagSchema).max(10).default([]),
  resources: z.array(fileInfoSchema).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateAssignmentSchema = createAssignmentSchema.partial().extend({ id: idSchema });

export const assignmentQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  courseId: idSchema.optional(),
  moduleId: idSchema.optional(),
  type: z.enum(["homework", "project", "case_study", "lab", "portfolio", "essay", "quiz", "discussion"]).optional(),
  difficulty: difficultyEnum.optional(),
  status: statusEnum.optional(),
  dueAfter: isoDateSchema.optional(),
  dueBefore: isoDateSchema.optional(),
  sortBy: z.enum(["title", "createdAt", "dueDate", "submissions", "avgScore"]).default("createdAt"),
});

export const assignmentFilterSchema = z.object({
  search: z.string().optional(),
  courses: z.array(idSchema).optional(),
  types: z.array(z.enum(["homework", "project", "case_study", "lab", "portfolio", "essay", "quiz", "discussion"])).optional(),
  difficulties: z.array(difficultyEnum).optional(),
  statuses: z.array(statusEnum).optional(),
  dueDateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  hasRubric: z.boolean().optional(),
  hasPeerReview: z.boolean().optional(),
  isGroupAssignment: z.boolean().optional(),
});

export const createHomeworkSchema = createAssignmentSchema.extend({
  type: z.literal("homework"),
  questions: z
    .array(
      z.object({
        id: idSchema.optional(),
        question: z.string().min(1).max(5000),
        type: z.enum(["text", "file", "code", "multi_choice"]),
        options: z
          .array(z.object({ id: idSchema.optional(), text: z.string().min(1).max(500), isCorrect: z.boolean().default(false) }))
          .optional(),
        maxScore: z.number().min(0).max(100).default(10),
        isRequired: z.boolean().default(true),
      })
    )
    .min(1)
    .max(100),
});

export const updateHomeworkSchema = createHomeworkSchema.partial().extend({ id: idSchema });

export const createProjectSchema = createAssignmentSchema.extend({
  type: z.literal("project"),
  milestones: z
    .array(
      z.object({
        id: idSchema.optional(),
        title: z.string().min(1).max(200),
        description: z.string().max(2000).optional(),
        dueDate: isoDateSchema.optional(),
        weight: z.number().min(0).max(100).optional(),
        deliverables: z.array(z.string().max(200)).default([]),
      })
    )
    .max(20)
    .default([]),
  deliverables: z
    .array(
      z.object({
        name: z.string().min(1).max(200),
        description: z.string().max(1000).optional(),
        type: z.enum(["file", "text", "url", "code"]),
        required: z.boolean().default(true),
      })
    )
    .max(20),
  collaborationRules: z
    .object({
      allowTeams: z.boolean().default(false),
      maxTeamSize: z.number().int().min(2).optional(),
      allowExternalCollaboration: z.boolean().default(false),
    })
    .optional(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({ id: idSchema });

export const createCaseStudySchema = createAssignmentSchema.extend({
  type: z.literal("case_study"),
  caseData: z.object({
    background: z.string().min(1).max(10000),
    problem: z.string().min(1).max(5000),
    context: z.string().max(5000).optional(),
    data: z.array(z.record(z.string(), z.unknown())).max(50).default([]),
    questions: z
      .array(z.object({ question: z.string().min(1).max(2000), maxScore: z.number().min(0).max(100), rubricCriteria: z.array(z.string().max(500)).optional() }))
      .min(1)
      .max(20),
  }),
});

export const updateCaseStudySchema = createCaseStudySchema.partial().extend({ id: idSchema });

export const createLabWorkSchema = createAssignmentSchema.extend({
  type: z.literal("lab"),
  labEnvironment: z
    .object({
      type: z.enum(["cloud", "local", "hybrid"]).default("cloud"),
      instructions: z.string().max(10000).optional(),
      setupScript: z.string().max(50000).optional(),
      requiredTools: z.array(z.string().max(100)).max(20).default([]),
      timeLimitMinutes: z.number().int().min(0).optional(),
    })
    .optional(),
  checkPoints: z
    .array(
      z.object({
        id: idSchema.optional(),
        title: z.string().min(1).max(200),
        description: z.string().max(1000).optional(),
        validationType: z.enum(["manual", "auto", "peer"]),
        maxScore: z.number().min(0).max(100),
      })
    )
    .max(20)
    .default([]),
});

export const updateLabWorkSchema = createLabWorkSchema.partial().extend({ id: idSchema });

export const createPortfolioSchema = createAssignmentSchema.extend({
  type: z.literal("portfolio"),
  sections: z
    .array(
      z.object({
        id: idSchema.optional(),
        title: z.string().min(1).max(200),
        description: z.string().max(1000).optional(),
        requiredItems: z.number().int().min(0).optional(),
        maxItems: z.number().int().min(1).optional(),
        acceptedTypes: z.array(z.string().max(20)).max(10).default([]),
      })
    )
    .min(1)
    .max(20),
  reflectionRequired: z.boolean().default(false),
  peerFeedback: z
    .object({ enabled: z.boolean().default(false), reviewersPerPortfolio: z.number().int().min(1).max(10).default(3) })
    .optional(),
});

export const updatePortfolioSchema = createPortfolioSchema.partial().extend({ id: idSchema });

export const createRubricSchema = z.object({
  courseId: idSchema,
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  criteria: z.array(rubricCriterionSchema).min(1).max(20),
  totalPoints: z.number().min(0).max(1000).optional(),
  isGlobal: z.boolean().default(false),
  metadata: metadataSchema.default({}),
});

export const updateRubricSchema = createRubricSchema.partial().extend({ id: idSchema });

export const createPeerReviewSchema = z.object({
  assignmentId: idSchema,
  reviewersPerSubmission: z.number().int().min(1).max(10).default(3),
  anonymityLevel: z.enum(["anonymous", "partial", "open"]).default("anonymous"),
  reviewDeadline: isoDateSchema.optional(),
  minReviewWords: z.number().int().min(0).optional(),
  rubricId: idSchema.optional(),
  autoAssign: z.boolean().default(true),
  allowSelfReview: z.boolean().default(false),
  criteria: z
    .array(z.object({ name: z.string().min(1).max(100), description: z.string().max(500).optional(), maxScore: z.number().min(0).max(100) }))
    .max(10)
    .default([]),
});

export const updatePeerReviewSchema = createPeerReviewSchema.partial().extend({ id: idSchema });

export const peerReviewCompleteSchema = z.object({
  peerReviewId: idSchema,
  submissionId: idSchema,
  reviewerId: idSchema,
  scores: z.record(z.string(), z.number().min(0).max(100)),
  comments: z.string().max(5000).optional(),
  completedAt: isoDateSchema.optional(),
});

export const createGroupAssignmentSchema = z.object({
  assignmentId: idSchema,
  minGroupSize: z.number().int().min(2).max(50).default(2),
  maxGroupSize: z.number().int().min(2).max(50).default(5),
  allowSelfAssign: z.boolean().default(true),
  autoAssign: z.boolean().default(false),
  submissionScope: z.enum(["group", "individual"]).default("group"),
  gradingScope: z.enum(["group", "individual", "both"]).default("group"),
});

export const updateGroupAssignmentSchema = createGroupAssignmentSchema.partial().extend({ id: idSchema });

export const createSubmissionSchema = z.object({
  assignmentId: idSchema,
  userId: idSchema,
  groupId: idSchema.optional(),
  attemptNumber: z.number().int().min(1).default(1),
  files: z.array(fileInfoSchema).max(20).default([]),
  textContent: z.string().max(100000).optional(),
  url: urlSchema.optional(),
  submittedAt: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const updateSubmissionSchema = z.object({
  submissionId: idSchema,
  files: z.array(fileInfoSchema).max(20).optional(),
  textContent: z.string().max(100000).optional(),
  url: urlSchema.optional(),
  metadata: metadataSchema.optional(),
});

export const submissionGradeSchema = z.object({
  submissionId: idSchema,
  graderId: idSchema,
  score: z.number().min(0),
  maxScore: z.number().min(0),
  percentage: z.number().min(0).max(100).optional(),
  feedback: z.string().max(10000).optional(),
  rubricScores: z
    .record(z.string(), z.object({ score: z.number().min(0), comment: z.string().optional() }))
    .optional(),
  gradedAt: isoDateSchema.optional(),
  isPublished: z.boolean().default(false),
});

export const submissionFeedbackSchema = z.object({
  submissionId: idSchema,
  graderId: idSchema,
  feedbackType: z.enum(["grade", "comment", "audio", "video"]).default("comment"),
  content: z.string().max(10000),
  attachments: z.array(fileInfoSchema).max(5).default([]),
  isPublic: z.boolean().default(false),
  createdAt: isoDateSchema.optional(),
});

export const latePolicySchema = z.object({
  courseId: idSchema,
  allowLateSubmission: z.boolean().default(false),
  maxLateDays: z.number().int().min(0).optional(),
  latePenaltyType: z.enum(["percentage", "points", "fixed"]).default("percentage"),
  latePenaltyValue: z.number().min(0).default(0),
  maxPenalty: z.number().min(0).optional(),
  gracePeriodMinutes: z.number().int().min(0).default(0),
  autoDeduct: z.boolean().default(true),
  notifyOnLateSubmission: z.boolean().default(true),
});

export const latePenaltySchema = z.object({
  submissionId: idSchema,
  lateMinutes: z.number().int().min(0),
  penaltyType: z.enum(["percentage", "points", "fixed"]),
  penaltyValue: z.number().min(0),
  finalPenalty: z.number().min(0),
  waived: z.boolean().default(false),
  waivedBy: idSchema.optional(),
  waiveReason: z.string().max(500).optional(),
});

export const assignmentPublishSchema = z.object({
  assignmentId: idSchema,
  publishAt: isoDateSchema.optional(),
  notifyStudents: z.boolean().default(true),
  releaseRubric: z.boolean().default(false),
});

export const assignmentAnalyticsSchema = z.object({
  assignmentId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["submissions", "grades", "avgScore", "completionRate", "lateSubmissions", "timeSpent"])).optional(),
});

export const assignmentExportSchema = z.object({
  assignmentId: idSchema,
  format: z.enum(["csv", "json", "pdf", "xlsx"]),
  includeSubmissions: z.boolean().default(true),
  includeGrades: z.boolean().default(true),
  includeFeedback: z.boolean().default(false),
});

export const assignmentImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["json", "csv", "qti"]),
  courseId: idSchema,
  overwrite: z.boolean().default(false),
});

export const assignmentBulkUpdateSchema = z.object({
  assignmentIds: z.array(idSchema).min(1).max(100),
  updates: z.object({
    status: statusEnum.optional(),
    visibility: visibilityEnum.optional(),
    dueDate: isoDateSchema.optional(),
    maxScore: z.number().min(0).optional(),
    passingScore: z.number().min(0).optional(),
  }),
});

export const assignmentBulkDeleteSchema = z.object({
  assignmentIds: z.array(idSchema).min(1).max(100),
  soft: z.boolean().default(true),
  reason: z.string().max(1000).optional(),
});

export const assignmentDuplicateSchema = z.object({
  sourceAssignmentId: idSchema,
  newTitle: z.string().min(1).max(300),
  courseId: idSchema.optional(),
  includeRubric: z.boolean().default(true),
  includePeerReview: z.boolean().default(true),
  includeSubmissions: z.boolean().default(false),
});

export const assignmentTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(["homework", "project", "case_study", "lab", "portfolio", "essay"]),
  difficulty: difficultyEnum,
  defaultMaxScore: z.number().min(0).max(1000).default(100),
  defaultTimeLimit: z.number().int().min(0).optional(),
  tags: z.array(tagSchema).default([]),
  settings: z.record(z.string(), z.unknown()).default({}),
});

export const assignmentSettingsSchema = z.object({
  assignmentId: idSchema,
  allowLateSubmission: z.boolean().default(false),
  latePenalty: z.object({ type: z.enum(["percentage", "points", "fixed"]), value: z.number().min(0) }).optional(),
  maxAttempts: z.number().int().min(1).optional(),
  timeLimitMinutes: z.number().int().min(0).optional(),
  showScoreAfterSubmission: z.boolean().default(true),
  showCorrectAnswersAfterDeadline: z.boolean().default(true),
  allowResubmission: z.boolean().default(false),
  autoGrading: z.boolean().default(false),
  plagiarismCheck: z.boolean().default(false),
  similarityThreshold: z.number().min(0).max(100).optional(),
});

export const assignmentPrivacySchema = z.object({
  assignmentId: idSchema,
  visibility: visibilityEnum,
  showSubmissions: z.boolean().default(false),
  showGrades: z.boolean().default(true),
  allowAnonymousSubmission: z.boolean().default(false),
});

export const assignmentAccessibilitySchema = z.object({
  assignmentId: idSchema,
  wcagLevel: z.enum(["A", "AA", "AAA"]).default("AA"),
  hasAltText: z.boolean().default(false),
  hasTranscript: z.boolean().default(false),
  hasCaption: z.boolean().default(false),
  hasAudioDescription: z.boolean().default(false),
  extendedTimeMinutes: z.number().int().min(0).optional(),
  screenReaderFriendly: z.boolean().default(true),
});

export const assignmentLocalizationSchema = z.object({
  assignmentId: idSchema,
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(localeSchema, z.object({ title: z.string().min(1), description: z.string().min(1), instructions: z.string().optional() })),
});

export const assignmentMetadataSchema = z.object({
  assignmentId: idSchema,
  learningObjectives: z.array(z.string().max(300)).default([]),
  bloomLevel: z.enum(["remember", "understand", "apply", "analyze", "evaluate", "create"]).optional(),
  estimatedTimeMinutes: z.number().int().min(0).optional(),
  customFields: z.record(z.string(), z.unknown()).default({}),
});

export const assignmentReminderSchema = z.object({
  assignmentId: idSchema,
  reminderType: z.enum(["email", "notification", "sms"]),
  scheduledAt: isoDateSchema,
  message: z.string().min(1).max(500),
  recipientIds: z.array(idSchema).max(500).optional(),
  sent: z.boolean().default(false),
});

export const assignmentExtensionSchema = z.object({
  assignmentId: idSchema,
  userId: idSchema,
  newDueDate: isoDateSchema,
  reason: z.string().max(1000).optional(),
  grantedBy: idSchema,
  notifyStudent: z.boolean().default(true),
});

export const assignmentResubmitSchema = z.object({
  submissionId: idSchema,
  userId: idSchema,
  reason: z.string().max(1000).optional(),
  files: z.array(fileInfoSchema).max(20).optional(),
  textContent: z.string().max(100000).optional(),
  url: urlSchema.optional(),
});

export const assignmentDraftSchema = z.object({
  assignmentId: idSchema,
  userId: idSchema,
  draftData: z.record(z.string(), z.unknown()),
  lastSavedAt: isoDateSchema.optional(),
  autoSaved: z.boolean().default(false),
});

export const assignmentArchiveSchema = z.object({
  assignmentId: idSchema,
  reason: z.string().max(1000).optional(),
  archiveSubmissions: z.boolean().default(false),
  notifyEnrolled: z.boolean().default(false),
});

export const assignmentCompletionCriteriaSchema = z.object({
  assignmentId: idSchema,
  type: z.enum(["submission", "grade", "peer_review", "manual"]),
  minScore: z.number().min(0).max(100).optional(),
  requirePeerReview: z.boolean().default(false),
  peerReviewCount: z.number().int().min(1).optional(),
});

export const assignmentRubricSchema = z.object({
  assignmentId: idSchema,
  rubricId: idSchema,
  isRequired: z.boolean().default(true),
  showToStudents: z.boolean().default(true),
});

export const assignmentPeerReviewConfigSchema = z.object({
  assignmentId: idSchema,
  enabled: z.boolean().default(true),
  reviewersPerSubmission: z.number().int().min(1).max(10).default(3),
  anonymityLevel: z.enum(["anonymous", "partial", "open"]).default("anonymous"),
  reviewDeadline: isoDateSchema.optional(),
  minReviewWords: z.number().int().min(0).optional(),
  rubricId: idSchema.optional(),
  autoAssign: z.boolean().default(true),
  allowSelfReview: z.boolean().default(false),
});

export const assignmentGroupConfigSchema = z.object({
  assignmentId: idSchema,
  enabled: z.boolean().default(true),
  minGroupSize: z.number().int().min(2).max(50).default(2),
  maxGroupSize: z.number().int().min(2).max(50).default(5),
  allowSelfAssign: z.boolean().default(true),
  autoAssign: z.boolean().default(false),
  submissionScope: z.enum(["group", "individual"]).default("group"),
  gradingScope: z.enum(["group", "individual", "both"]).default("group"),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 5. Quizzes (~50 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const createQuizSchema = z.object({
  courseId: idSchema,
  moduleId: idSchema.optional(),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  instructions: z.string().max(10000).optional(),
  difficulty: difficultyEnum,
  maxScore: z.number().min(0).max(1000),
  passingScore: z.number().min(0).max(1000).optional(),
  timeLimitMinutes: z.number().int().min(0).optional(),
  maxAttempts: z.number().int().min(1).optional(),
  shuffleQuestions: z.boolean().default(false),
  shuffleOptions: z.boolean().default(false),
  showResults: z.enum(["immediate", "after_deadline", "never"]).default("immediate"),
  showCorrectAnswers: z.boolean().default(true),
  showScore: z.boolean().default(true),
  allowReview: z.boolean().default(true),
  requireLockdown: z.boolean().default(false),
  antiCheat: z
    .object({
      enabled: z.boolean().default(false),
      tabSwitchLimit: z.number().int().min(0).optional(),
      ipRestriction: z.boolean().default(false),
      webcamRequired: z.boolean().default(false),
      browserLockdown: z.boolean().default(false),
    })
    .default({}),
  dueDate: isoDateSchema.optional(),
  startDate: isoDateSchema.optional(),
  weight: z.number().min(0).max(100).optional(),
  status: statusEnum.default("draft"),
  visibility: visibilityEnum.default("private"),
  tags: z.array(tagSchema).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateQuizSchema = createQuizSchema.partial().extend({ id: idSchema });

export const quizQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  courseId: idSchema.optional(),
  moduleId: idSchema.optional(),
  difficulty: difficultyEnum.optional(),
  status: statusEnum.optional(),
  hasTimeLimit: z.boolean().optional(),
  sortBy: z.enum(["title", "createdAt", "attempts", "avgScore"]).default("createdAt"),
});

export const quizFilterSchema = z.object({
  search: z.string().optional(),
  courses: z.array(idSchema).optional(),
  difficulties: z.array(difficultyEnum).optional(),
  statuses: z.array(statusEnum).optional(),
  hasTimeLimit: z.boolean().optional(),
  hasAntiCheat: z.boolean().optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const createQuestionSchema = z.object({
  quizId: idSchema.optional(),
  bankId: idSchema.optional(),
  type: z.enum(["multiple_choice", "true_false", "fill_blank", "short_answer", "essay", "matching", "ordering", "hotspot", "code", "matrix"]),
  content: z.string().min(1).max(10000),
  explanation: z.string().max(5000).optional(),
  hint: z.string().max(1000).optional(),
  difficulty: difficultyEnum,
  points: z.number().min(0).max(100).default(1),
  tags: z.array(z.string().max(100)).max(10).default([]),
  options: z
    .array(
      z.object({
        id: idSchema.optional(),
        content: z.string().min(1).max(2000),
        isCorrect: z.boolean().default(false),
        explanation: z.string().max(1000).optional(),
        order: z.number().int().min(0).default(0),
      })
    )
    .optional(),
  matchingPairs: z
    .array(z.object({ left: z.string().min(1).max(500), right: z.string().min(1).max(500) }))
    .optional(),
  correctOrder: z.array(z.string().min(1).max(500)).optional(),
  codeTemplate: z.string().max(50000).optional(),
  codeLanguage: z.string().max(50).optional(),
  codeTestCases: z
    .array(
      z.object({
        input: z.string(),
        expectedOutput: z.string(),
        isHidden: z.boolean().default(false),
      })
    )
    .max(50)
    .optional(),
  metadata: metadataSchema.default({}),
});

export const updateQuestionSchema = createQuestionSchema.partial().extend({ id: idSchema });

export const questionOptionSchema = z.object({
  id: idSchema.optional(),
  content: z.string().min(1).max(2000),
  isCorrect: z.boolean().default(false),
  explanation: z.string().max(1000).optional(),
  order: z.number().int().min(0).default(0),
  imageUrl: urlSchema.optional(),
  matchId: idSchema.optional(),
});

export const questionBankSchema = z.object({
  courseId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  questions: z.array(createQuestionSchema).max(500).default([]),
  isPublic: z.boolean().default(false),
});

export const questionImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["json", "csv", "qti", "moodle"]),
  bankId: idSchema.optional(),
  quizId: idSchema.optional(),
  overwrite: z.boolean().default(false),
  mapping: z.record(z.string(), z.string()).optional(),
});

export const questionExportSchema = z.object({
  bankId: idSchema.optional(),
  quizId: idSchema.optional(),
  format: z.enum(["json", "csv", "qti"]),
  questionIds: z.array(idSchema).optional(),
  includeAnswers: z.boolean().default(true),
  includeExplanations: z.boolean().default(true),
});

export const randomizationSchema = z.object({
  quizId: idSchema,
  enabled: z.boolean().default(true),
  questionCount: z.number().int().min(1).optional(),
  poolSize: z.number().int().min(1).optional(),
  randomizeOptions: z.boolean().default(true),
  categories: z
    .array(z.object({ category: z.string(), count: z.number().int().min(1) }))
    .optional(),
  seed: z.number().int().min(0).optional(),
});

export const adaptiveTestSchema = z.object({
  quizId: idSchema,
  algorithm: z.enum(["IRT", "CAT", "rule_based"]).default("CAT"),
  maxQuestions: z.number().int().min(1).max(100),
  minQuestions: z.number().int().min(1).max(100),
  targetSE: z.number().min(0).max(1).default(0.3),
  startDifficulty: difficultyEnum,
  itemBank: z.array(idSchema).min(1),
  stopCriteria: z
    .object({ type: z.enum(["max_questions", "target_se", "confidence"]), value: z.number() })
    .default({ type: "target_se", value: 0.3 }),
});

export const practiceExamSchema = z.object({
  quizId: idSchema,
  isTimed: z.boolean().default(false),
  timeLimitMinutes: z.number().int().min(0).optional(),
  showAnswers: z.enum(["immediate", "after_submission", "never"]).default("immediate"),
  allowRetakes: z.boolean().default(true),
  maxRetakes: z.number().int().min(1).optional(),
  trackProgress: z.boolean().default(true),
});

export const timedExamSchema = z.object({
  quizId: idSchema,
  timeLimitMinutes: z.number().int().min(1),
  warningMinutes: z.number().int().min(0).default(5),
  autoSubmit: z.boolean().default(true),
  gracePeriodSeconds: z.number().int().min(0).default(0),
  showTimer: z.boolean().default(true),
  allowTimeExtension: z.boolean().default(false),
});

export const autoGradingSchema = z.object({
  quizId: idSchema,
  enabled: z.boolean().default(true),
  essayGrading: z
    .object({
      enabled: z.boolean().default(false),
      rubricId: idSchema.optional(),
      keywords: z.array(z.string().max(100)).default([]),
      minWordCount: z.number().int().min(0).optional(),
    })
    .optional(),
  codeGrading: z
    .object({
      enabled: z.boolean().default(false),
      testCases: z
        .array(z.object({ input: z.string(), expectedOutput: z.string(), points: z.number().min(0).default(1) }))
        .max(50)
        .optional(),
      timeLimitMs: z.number().int().min(100).default(5000),
      memoryLimitMb: z.number().int().min(32).default(256),
    })
    .optional(),
});

export const manualGradingSchema = z.object({
  quizId: idSchema,
  graderId: idSchema,
  questionId: idSchema,
  submissions: z.array(
    z.object({
      submissionId: idSchema,
      userId: idSchema,
      score: z.number().min(0),
      maxScore: z.number().min(0),
      feedback: z.string().max(5000).optional(),
    })
  ),
});

export const quizFeedbackSchema = z.object({
  quizId: idSchema,
  type: z.enum(["immediate", "after_deadline", "after_all_submitted", "manual"]),
  showCorrectAnswers: z.boolean().default(true),
  showExplanations: z.boolean().default(true),
  showScore: z.boolean().default(true),
  showPeerScores: z.boolean().default(false),
  customMessage: z.string().max(2000).optional(),
});

export const retakeRuleSchema = z.object({
  quizId: idSchema,
  allowRetakes: z.boolean().default(true),
  maxRetakes: z.number().int().min(1).optional(),
  scoreStrategy: z.enum(["latest", "highest", "average", "first"]).default("highest"),
  waitPeriodMinutes: z.number().int().min(0).optional(),
  retakeDiscount: z
    .object({ enabled: z.boolean().default(false), percentage: z.number().min(0).max(100).optional() })
    .optional(),
});

export const quizAttemptSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  attemptNumber: z.number().int().min(1),
  startedAt: isoDateSchema,
  submittedAt: isoDateSchema.optional(),
  timeSpent: z.number().int().min(0).optional(),
  status: z.enum(["in_progress", "submitted", "graded", "timed_out"]).default("in_progress"),
  answers: z
    .array(
      z.object({
        questionId: idSchema,
        answer: z.union([z.string(), z.number(), z.array(z.string())]),
        isCorrect: z.boolean().optional(),
        score: z.number().min(0).optional(),
        feedback: z.string().max(2000).optional(),
        timeSpent: z.number().int().min(0).optional(),
      })
    )
    .default([]),
  score: z.number().min(0).max(1000).optional(),
  passed: z.boolean().optional(),
  metadata: metadataSchema.default({}),
});

export const quizAnswerSchema = z.object({
  questionId: idSchema,
  answer: z.union([z.string(), z.number(), z.array(z.string())]),
  isCorrect: z.boolean().optional(),
  score: z.number().min(0).optional(),
  feedback: z.string().max(2000).optional(),
  timeSpent: z.number().int().min(0).optional(),
});

export const quizDuplicateSchema = z.object({
  sourceQuizId: idSchema,
  newTitle: z.string().min(1).max(300),
  courseId: idSchema.optional(),
  includeQuestions: z.boolean().default(true),
  includeSettings: z.boolean().default(true),
});

export const quizTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().min(1).max(100),
  difficulty: difficultyEnum,
  questionCount: z.number().int().min(1).max(100).default(10),
  questionTypes: z.array(z.enum(["multiple_choice", "true_false", "fill_blank", "short_answer", "essay"])).default(["multiple_choice"]),
  timeLimitMinutes: z.number().int().min(0).optional(),
  tags: z.array(tagSchema).default([]),
});

export const quizAnalyticsSchema = z.object({
  quizId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["attempts", "avgScore", "passRate", "avgTime", "questionAnalysis", "difficultyDistribution"])).optional(),
  granularity: z.enum(["day", "week", "month"]).default("day"),
});

export const quizImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["json", "csv", "qti", "moodle"]),
  courseId: idSchema,
  title: z.string().min(1).max(300).optional(),
  overwrite: z.boolean().default(false),
});

export const quizExportSchema = z.object({
  quizId: idSchema,
  format: z.enum(["json", "csv", "qti", "pdf"]),
  includeAnswers: z.boolean().default(true),
  includeExplanations: z.boolean().default(true),
  includeAnalytics: z.boolean().default(false),
});

export const questionPoolSchema = z.object({
  courseId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  questions: z.array(idSchema).default([]),
  isShared: z.boolean().default(false),
});

export const questionCategorySchema = z.object({
  courseId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  parentId: idSchema.optional(),
  order: z.number().int().min(0).default(0),
});

export const quizLockSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  reason: z.string().max(500),
  lockedBy: idSchema,
  expiresAt: isoDateSchema.optional(),
});

export const quizUnlockSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  unlockedBy: idSchema,
  reason: z.string().max(500).optional(),
});

export const quizPublishSchema = z.object({
  quizId: idSchema,
  publishAt: isoDateSchema.optional(),
  notifyStudents: z.boolean().default(true),
  releaseResults: z.boolean().default(false),
});

export const quizStartSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  attemptNumber: z.number().int().min(1).default(1),
  deviceInfo: z
    .object({ browser: z.string().max(100).optional(), os: z.string().max(100).optional(), screenResolution: z.string().optional() })
    .optional(),
});

export const quizSubmitSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  attemptNumber: z.number().int().min(1),
  answers: z.array(quizAnswerSchema).min(1),
  submittedAt: isoDateSchema.optional(),
  forceSubmit: z.boolean().default(false),
});

export const quizGradeSchema = z.object({
  quizId: idSchema,
  attemptId: idSchema,
  graderId: idSchema,
  adjustments: z
    .array(z.object({ questionId: idSchema, scoreAdjustment: z.number(), reason: z.string().max(500).optional() }))
    .optional(),
  overallFeedback: z.string().max(5000).optional(),
  isPublished: z.boolean().default(false),
});

export const quizCertificateSchema = z.object({
  quizId: idSchema,
  templateId: idSchema.optional(),
  title: z.string().min(1).max(200),
  minScore: z.number().min(0).max(100).default(70),
  expiryDays: z.number().int().min(0).optional(),
  issuedCount: z.number().int().min(0).default(0),
});

export const quizSettingsSchema = z.object({
  quizId: idSchema,
  timeLimitMinutes: z.number().int().min(0).optional(),
  maxAttempts: z.number().int().min(1).optional(),
  shuffleQuestions: z.boolean().default(false),
  shuffleOptions: z.boolean().default(false),
  showResults: z.enum(["immediate", "after_deadline", "never"]).default("immediate"),
  showCorrectAnswers: z.boolean().default(true),
  showScore: z.boolean().default(true),
  allowReview: z.boolean().default(true),
  requireLockdown: z.boolean().default(false),
  autoSubmit: z.boolean().default(true),
  passingScore: z.number().min(0).max(100).optional(),
});

export const quizPrivacySchema = z.object({
  quizId: idSchema,
  visibility: visibilityEnum,
  showInCatalog: z.boolean().default(true),
  allowGuestAccess: z.boolean().default(false),
  anonymousGrading: z.boolean().default(false),
});

export const quizAccessibilitySchema = z.object({
  quizId: idSchema,
  wcagLevel: z.enum(["A", "AA", "AAA"]).default("AA"),
  extendedTimeMinutes: z.number().int().min(0).optional(),
  hasAltText: z.boolean().default(false),
  hasTranscript: z.boolean().default(false),
  hasCaption: z.boolean().default(false),
  screenReaderFriendly: z.boolean().default(true),
  keyboardNavigation: z.boolean().default(true),
  highContrast: z.boolean().default(false),
});

export const quizLocalizationSchema = z.object({
  quizId: idSchema,
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(localeSchema, z.object({ title: z.string().min(1), description: z.string().min(1), instructions: z.string().optional() })),
});

export const quizMetadataSchema = z.object({
  quizId: idSchema,
  learningObjectives: z.array(z.string().max(300)).default([]),
  bloomLevel: z.enum(["remember", "understand", "apply", "analyze", "evaluate", "create"]).optional(),
  estimatedTimeMinutes: z.number().int().min(0).optional(),
  customFields: z.record(z.string(), z.unknown()).default({}),
});

export const quizReminderSchema = z.object({
  quizId: idSchema,
  reminderType: z.enum(["email", "notification", "sms"]),
  scheduledAt: isoDateSchema,
  message: z.string().min(1).max(500),
  recipientIds: z.array(idSchema).max(500).optional(),
  sent: z.boolean().default(false),
});

export const quizExtensionSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  additionalMinutes: z.number().int().min(1),
  reason: z.string().max(1000).optional(),
  grantedBy: idSchema,
  notifyStudent: z.boolean().default(true),
});

export const quizResubmitSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  attemptId: idSchema,
  reason: z.string().max(1000).optional(),
  approvedBy: idSchema,
});

export const quizDraftSchema = z.object({
  quizId: idSchema,
  userId: idSchema,
  draftData: z.record(z.string(), z.unknown()),
  lastSavedAt: isoDateSchema.optional(),
  autoSaved: z.boolean().default(false),
});

export const quizArchiveSchema = z.object({
  quizId: idSchema,
  reason: z.string().max(1000).optional(),
  archiveResults: z.boolean().default(false),
  notifyEnrolled: z.boolean().default(false),
});

export const quizCompletionCriteriaSchema = z.object({
  quizId: idSchema,
  type: z.enum(["pass", "attempt", "score", "manual"]),
  minScore: z.number().min(0).max(100).optional(),
  maxAttempts: z.number().int().min(1).optional(),
  requirePass: z.boolean().default(true),
});

export const quizRubricSchema = z.object({
  quizId: idSchema,
  rubricId: idSchema,
  questionIds: z.array(idSchema).optional(),
  isRequired: z.boolean().default(true),
});

export const quizPeerReviewConfigSchema = z.object({
  quizId: idSchema,
  enabled: z.boolean().default(true),
  reviewersPerAttempt: z.number().int().min(1).max(10).default(3),
  anonymityLevel: z.enum(["anonymous", "partial", "open"]).default("anonymous"),
  reviewDeadline: isoDateSchema.optional(),
  rubricId: idSchema.optional(),
});

export const quizGroupConfigSchema = z.object({
  quizId: idSchema,
  enabled: z.boolean().default(true),
  minGroupSize: z.number().int().min(2).max(50).default(2),
  maxGroupSize: z.number().int().min(2).max(50).default(5),
  sharedScore: z.boolean().default(true),
  individualContribution: z.boolean().default(false),
});

export const quizBulkUpdateSchema = z.object({
  quizIds: z.array(idSchema).min(1).max(100),
  updates: z.object({
    status: statusEnum.optional(),
    visibility: visibilityEnum.optional(),
    dueDate: isoDateSchema.optional(),
    timeLimitMinutes: z.number().int().min(0).optional(),
    maxAttempts: z.number().int().min(1).optional(),
  }),
});

export const quizBulkDeleteSchema = z.object({
  quizIds: z.array(idSchema).min(1).max(100),
  soft: z.boolean().default(true),
  reason: z.string().max(1000).optional(),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 6. Certifications (~40 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const createCertificateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  templateId: idSchema.optional(),
  issuerId: idSchema,
  criteria: z
    .object({
      courseId: idSchema.optional(),
      learningPathId: idSchema.optional(),
      quizId: idSchema.optional(),
      minScore: z.number().min(0).max(100).optional(),
      requiredBadges: z.array(idSchema).optional(),
      requiredCompetencies: z.array(z.string()).optional(),
    })
    .optional(),
  validityPeriod: z.number().int().min(0).optional(),
  renewalRequired: z.boolean().default(false),
  renewalCriteria: z.string().max(2000).optional(),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const updateCertificateSchema = createCertificateSchema.partial().extend({ id: idSchema });

export const certificateQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  issuerId: idSchema.optional(),
  status: statusEnum.optional(),
  renewalRequired: z.boolean().optional(),
  sortBy: z.enum(["name", "createdAt", "issuedCount", "validityPeriod"]).default("createdAt"),
});

export const certificateFilterSchema = z.object({
  search: z.string().optional(),
  issuers: z.array(idSchema).optional(),
  statuses: z.array(statusEnum).optional(),
  renewalRequired: z.boolean().optional(),
  hasExpiry: z.boolean().optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const createBadgeSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  icon: urlSchema,
  issuerId: idSchema,
  criteria: z
    .object({
      type: z.enum(["points", "completion", "skill", "custom"]),
      threshold: z.number().min(0).optional(),
      description: z.string().max(1000).optional(),
    })
    .optional(),
  category: z.string().max(100).optional(),
  rarity: z.enum(["common", "uncommon", "rare", "epic", "legendary"]).default("common"),
  points: z.number().int().min(0).default(0),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const updateBadgeSchema = createBadgeSchema.partial().extend({ id: idSchema });

export const badgeAwardSchema = z.object({
  badgeId: idSchema,
  userId: idSchema,
  awardedBy: idSchema.optional(),
  reason: z.string().max(1000).optional(),
  metadata: metadataSchema.default({}),
  awardedAt: isoDateSchema.optional(),
});

export const createMicroCredentialSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  issuerId: idSchema,
  skills: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        level: z.number().int().min(1).max(5),
        evidence: z.array(z.string().max(500)).optional(),
      })
    )
    .min(1)
    .max(20),
  criteria: z
    .object({
      requiredCourses: z.array(idSchema).optional(),
      requiredBadges: z.array(idSchema).optional(),
      minScore: z.number().min(0).max(100).optional(),
      portfolioRequired: z.boolean().default(false),
    })
    .optional(),
  validityPeriod: z.number().int().min(0).optional(),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const updateMicroCredentialSchema = createMicroCredentialSchema.partial().extend({ id: idSchema });

export const createCompetencySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
  framework: z.string().max(200).optional(),
  levels: z
    .array(
      z.object({
        level: z.number().int().min(1),
        name: z.string().min(1).max(100),
        description: z.string().max(1000).optional(),
      })
    )
    .min(1)
    .max(5),
  assessmentCriteria: z.array(z.string().max(500)).default([]),
  relatedCompetencies: z.array(idSchema).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateCompetencySchema = createCompetencySchema.partial().extend({ id: idSchema });

export const competencyAssessSchema = z.object({
  competencyId: idSchema,
  userId: idSchema,
  level: z.number().int().min(1).max(5),
  assessedBy: idSchema.optional(),
  evidence: z.array(z.string().max(500)).max(10).default([]),
  notes: z.string().max(2000).optional(),
  assessedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
});

export const createSkillSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
  taxonomy: z.string().max(200).optional(),
  parentSkillId: idSchema.optional(),
  relatedSkills: z.array(idSchema).max(10).default([]),
  assessmentMethods: z.array(z.enum(["quiz", "project", "peer", "self", "portfolio"])).default(["quiz"]),
  metadata: metadataSchema.default({}),
});

export const updateSkillSchema = createSkillSchema.partial().extend({ id: idSchema });

export const skillAssessSchema = z.object({
  skillId: idSchema,
  userId: idSchema,
  level: z.number().int().min(1).max(5),
  assessedBy: idSchema.optional(),
  assessmentMethod: z.enum(["quiz", "project", "peer", "self", "portfolio"]),
  score: z.number().min(0).max(100).optional(),
  evidence: z.array(z.string().max(500)).max(10).default([]),
  notes: z.string().max(2000).optional(),
  assessedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
});

export const verificationSchema = z.object({
  certificateId: idSchema,
  verificationCode: z.string().min(8).max(50),
  verifiedAt: isoDateSchema.optional(),
  verifiedBy: idSchema.optional(),
  isValid: z.boolean().default(true),
  reason: z.string().max(500).optional(),
});

export const blockchainVerificationSchema = z.object({
  certificateId: idSchema,
  blockchainNetwork: z.enum(["ethereum", "polygon", "solana", "hyperledger"]),
  transactionHash: z.string().min(1).max(200),
  blockNumber: z.number().int().min(0).optional(),
  contractAddress: z.string().min(1).max(100),
  verifiedAt: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const qrVerificationSchema = z.object({
  certificateId: idSchema,
  qrCode: z.string().min(1),
  verificationUrl: urlSchema,
  generatedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
});

export const expirationSchema = z.object({
  certificateId: idSchema,
  issuedAt: isoDateSchema,
  expiresAt: isoDateSchema,
  isExpired: z.boolean().default(false),
  renewalRequired: z.boolean().default(false),
  gracePeriodDays: z.number().int().min(0).default(0),
});

export const renewalSchema = z.object({
  certificateId: idSchema,
  userId: idSchema,
  renewalDate: isoDateSchema,
  newExpiryDate: isoDateSchema,
  previousExpiryDate: isoDateSchema,
  renewalMethod: z.enum(["automatic", "manual", "assessment"]).default("manual"),
  requirements: z.array(z.string().max(500)).default([]),
  notes: z.string().max(2000).optional(),
});

export const certificateRevokeSchema = z.object({
  certificateId: idSchema,
  revokedBy: idSchema,
  reason: z.string().min(1).max(2000),
  revokeDate: isoDateSchema.optional(),
  notifyHolder: z.boolean().default(true),
  isPermanent: z.boolean().default(true),
});

export const certificateVerifySchema = z.object({
  certificateId: idSchema.optional(),
  verificationCode: z.string().optional(),
  holderEmail: emailSchema.optional(),
});

export const certificateRenewSchema = z.object({
  certificateId: idSchema,
  userId: idSchema,
  newExpiryDate: isoDateSchema,
  reason: z.string().max(2000).optional(),
  renewedBy: idSchema,
});

export const badgeRevokeSchema = z.object({
  badgeAwardId: idSchema,
  revokedBy: idSchema,
  reason: z.string().min(1).max(2000),
  revokeDate: isoDateSchema.optional(),
  notifyHolder: z.boolean().default(true),
});

export const badgeVerifySchema = z.object({
  badgeId: idSchema,
  userId: idSchema.optional(),
  verificationCode: z.string().optional(),
});

export const microCredentialAwardSchema = z.object({
  microCredentialId: idSchema,
  userId: idSchema,
  awardedBy: idSchema.optional(),
  skills: z.array(z.object({ skillName: z.string().min(1).max(100), level: z.number().int().min(1).max(5) })),
  reason: z.string().max(1000).optional(),
  awardedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
});

export const competencyFrameworkSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  version: z.string().max(50),
  competencies: z.array(idSchema).min(1),
  levels: z
    .array(
      z.object({
        level: z.number().int().min(1),
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
      })
    )
    .min(1)
    .max(5),
  isPublic: z.boolean().default(false),
  metadata: metadataSchema.default({}),
});

export const skillTaxonomySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  version: z.string().max(50),
  categories: z.array(
    z.object({
      name: z.string().min(1).max(200),
      description: z.string().max(500).optional(),
      skills: z.array(idSchema).default([]),
      subcategories: z
        .array(
          z.object({
            name: z.string().min(1).max(200),
            skills: z.array(idSchema).default([]),
          })
        )
        .default([]),
    })
  ),
  metadata: metadataSchema.default({}),
});

export const skillGapSchema = z.object({
  userId: idSchema,
  targetRole: z.string().min(1).max(200).optional(),
  targetSkills: z.array(z.object({ skillId: idSchema, requiredLevel: z.number().int().min(1).max(5) })),
  currentLevels: z.record(idSchema, z.number().int().min(0).max(5)).default({}),
  recommendations: z.array(idSchema).default([]),
});

export const certificationPathSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  requiredCertificates: z.array(idSchema).min(1),
  requiredBadges: z.array(idSchema).default([]),
  requiredCompetencies: z.array(z.string()).default([]),
  learningPathId: idSchema.optional(),
  order: z.enum(["sequential", "flexible"]).default("flexible"),
  metadata: metadataSchema.default({}),
});

export const certificationRequirementsSchema = z.object({
  certificationId: idSchema,
  prerequisites: z
    .array(
      z.object({
        type: z.enum(["certificate", "badge", "competency", "skill", "course"]),
        id: idSchema.optional(),
        name: z.string().max(200).optional(),
        minLevel: z.number().int().min(1).optional(),
      })
    )
    .default([]),
  assessments: z
    .array(
      z.object({
        type: z.enum(["quiz", "project", "portfolio", "interview"]),
        name: z.string().min(1).max(200),
        minScore: z.number().min(0).max(100).optional(),
      })
    )
    .default([]),
  experienceHours: z.number().int().min(0).optional(),
  mentorshipHours: z.number().int().min(0).optional(),
});

export const certificationRenewalSchema = z.object({
  certificationId: idSchema,
  renewalPeriodDays: z.number().int().min(1),
  gracePeriodDays: z.number().int().min(0).default(30),
  renewalRequirements: z.array(z.string().max(500)).default([]),
  autoRenew: z.boolean().default(false),
  renewalCost: z.number().min(0).optional(),
  currency: z.string().length(3).default("USD"),
});

export const certificationExpirationSchema = z.object({
  certificationId: idSchema,
  validityDays: z.number().int().min(0),
  warningDays: z.number().int().min(0).default(30),
  notifyOnExpiry: z.boolean().default(true),
  notifyOnWarning: z.boolean().default(true),
  gracePeriodDays: z.number().int().min(0).default(0),
});

export const certificationTransferSchema = z.object({
  certificationId: idSchema,
  fromUserId: idSchema,
  toUserId: idSchema,
  reason: z.string().max(1000).optional(),
  transferredBy: idSchema,
  transferDate: isoDateSchema.optional(),
});

export const certificationShareSchema = z.object({
  certificationId: idSchema,
  sharedWithUserId: idSchema.optional(),
  sharedWithGroupId: idSchema.optional(),
  permission: z.enum(["view", "verify"]).default("view"),
  expiresAt: isoDateSchema.optional(),
  message: z.string().max(500).optional(),
});

export const certificationExportSchema = z.object({
  certificationId: idSchema,
  format: z.enum(["json", "pdf", "csv"]),
  includeHolderDetails: z.boolean().default(false),
  includeVerification: z.boolean().default(true),
});

export const certificationImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["json", "csv"]),
  overwrite: z.boolean().default(false),
});

export const certificationAnalyticsSchema = z.object({
  certificationId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z
    .array(z.enum(["issuedCount", "activeHolders", "expiredCount", "revokedCount", "renewalRate", "verificationCount"]))
    .optional(),
});

export const certificationBulkCreateSchema = z.object({
  templateId: idSchema,
  holderIds: z.array(idSchema).min(1).max(100),
  issuedBy: idSchema,
  issuedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
  reason: z.string().max(1000).optional(),
});

export const certificationBulkRevokeSchema = z.object({
  certificationIds: z.array(idSchema).min(1).max(100),
  revokedBy: idSchema,
  reason: z.string().min(1).max(2000),
  notifyHolders: z.boolean().default(true),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 7. Live Learning (~30 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const createLiveSessionSchema = z.object({
  courseId: idSchema,
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  instructorId: idSchema,
  scheduledAt: isoDateSchema,
  durationMinutes: z.number().int().min(1).max(480),
  maxParticipants: z.number().int().min(1).max(1000).optional(),
  type: z.enum(["lecture", "workshop", "seminar", "office_hours", "exam"]).default("lecture"),
  platform: z.enum(["zoom", "teams", "meet", "custom"]).default("zoom"),
  meetingUrl: urlSchema.optional(),
  meetingId: z.string().max(100).optional(),
  meetingPassword: z.string().max(50).optional(),
  settings: z
    .object({
      allowRecording: z.boolean().default(true),
      allowScreenShare: z.boolean().default(true),
      allowChat: z.boolean().default(true),
      allowQA: z.boolean().default(true),
      allowPolls: z.boolean().default(true),
      allowBreakoutRooms: z.boolean().default(false),
      muteOnEntry: z.boolean().default(true),
      waitingRoom: z.boolean().default(false),
      autoRecord: z.boolean().default(false),
    })
    .default({}),
  materials: z.array(fileInfoSchema).max(10).default([]),
  status: statusEnum.default("draft"),
  visibility: visibilityEnum.default("private"),
  tags: z.array(tagSchema).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateLiveSessionSchema = createLiveSessionSchema.partial().extend({ id: idSchema });

export const liveSessionQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  courseId: idSchema.optional(),
  instructorId: idSchema.optional(),
  type: z.enum(["lecture", "workshop", "seminar", "office_hours", "exam"]).optional(),
  status: statusEnum.optional(),
  scheduledAfter: isoDateSchema.optional(),
  scheduledBefore: isoDateSchema.optional(),
  sortBy: z.enum(["title", "scheduledAt", "participants", "duration"]).default("scheduledAt"),
});

export const liveSessionFilterSchema = z.object({
  search: z.string().optional(),
  courses: z.array(idSchema).optional(),
  instructors: z.array(idSchema).optional(),
  types: z.array(z.enum(["lecture", "workshop", "seminar", "office_hours", "exam"])).optional(),
  statuses: z.array(statusEnum).optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  hasRecording: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
});

export const createVirtualClassroomSchema = z.object({
  liveSessionId: idSchema,
  name: z.string().min(1).max(200),
  capacity: z.number().int().min(1).max(1000),
  layout: z.enum(["grid", "speaker", "sidebar", "presentation"]).default("grid"),
  features: z
    .object({
      whiteboard: z.boolean().default(true),
      screenShare: z.boolean().default(true),
      chat: z.boolean().default(true),
      qa: z.boolean().default(true),
      polls: z.boolean().default(true),
      breakoutRooms: z.boolean().default(true),
      handRaise: z.boolean().default(true),
      reactions: z.boolean().default(true),
    })
    .default({}),
  moderationSettings: z
    .object({
      enabled: z.boolean().default(false),
      approveMessages: z.boolean().default(false),
      muteAll: z.boolean().default(false),
      kickParticipants: z.boolean().default(false),
    })
    .default({}),
});

export const updateVirtualClassroomSchema = createVirtualClassroomSchema.partial().extend({ id: idSchema });

export const createRecordingSchema = z.object({
  liveSessionId: idSchema,
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  fileUrl: urlSchema,
  fileSize: z.number().int().min(0).optional(),
  duration: z.number().int().min(0).optional(),
  thumbnail: urlSchema.optional(),
  format: z.enum(["mp4", "webm", "m3u8"]).default("mp4"),
  resolution: z.string().regex(/^\d+x\d+$/).optional(),
  captions: z
    .array(z.object({ language: localeSchema, url: urlSchema, label: z.string().max(100) }))
    .max(20)
    .default([]),
  chapters: z
    .array(z.object({ title: z.string().min(1).max(200), startTime: z.number().int().min(0), endTime: z.number().int().min(0) }))
    .max(50)
    .default([]),
  visibility: visibilityEnum.default("private"),
  metadata: metadataSchema.default({}),
});

export const updateRecordingSchema = createRecordingSchema.partial().extend({ id: idSchema });

export const attendanceSchema = z.object({
  liveSessionId: idSchema,
  userId: idSchema,
  joinedAt: isoDateSchema,
  leftAt: isoDateSchema.optional(),
  duration: z.number().int().min(0),
  status: z.enum(["present", "absent", "late", "left_early"]).default("present"),
  ip: z.string().optional(),
  device: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
});

export const whiteboardSchema = z.object({
  liveSessionId: idSchema,
  elements: z.array(
    z.object({
      id: idSchema.optional(),
      type: z.enum(["path", "rect", "circle", "text", "image", "line", "arrow"]),
      x: z.number(),
      y: z.number(),
      width: z.number().optional(),
      height: z.number().optional(),
      points: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
      text: z.string().max(5000).optional(),
      fontSize: z.number().optional(),
      fontFamily: z.string().optional(),
      fill: z.string().optional(),
      stroke: z.string().optional(),
      strokeWidth: z.number().optional(),
      imageUrl: urlSchema.optional(),
      locked: z.boolean().default(false),
    })
  ),
  createdBy: idSchema,
  createdAt: isoDateSchema.optional(),
});

export const breakoutRoomSchema = z.object({
  liveSessionId: idSchema,
  name: z.string().min(1).max(100),
  participantIds: z.array(idSchema).default([]),
  maxParticipants: z.number().int().min(1).max(100).optional(),
  durationMinutes: z.number().int().min(1).max(240).optional(),
  autoAssign: z.boolean().default(true),
});

export const pollSchema = z.object({
  liveSessionId: idSchema,
  question: z.string().min(1).max(1000),
  options: z.array(pollOptionSchema).min(2).max(10),
  allowMultipleSelections: z.boolean().default(false),
  isAnonymous: z.boolean().default(false),
  durationSeconds: z.number().int().min(10).max(300).optional(),
  status: z.enum(["draft", "active", "closed"]).default("draft"),
});

const pollOptionSchemaDef = z.object({
  id: idSchema.optional(),
  text: z.string().min(1).max(200),
  voteCount: z.number().int().min(0).default(0),
});
const pollOptionSchema = pollOptionSchemaDef;

export const pollVoteSchema = z.object({
  pollId: idSchema,
  userId: idSchema,
  optionIds: z.array(idSchema).min(1),
  votedAt: isoDateSchema.optional(),
});

export const qaMessageSchema = z.object({
  liveSessionId: idSchema,
  userId: idSchema,
  question: z.string().min(1).max(5000),
  isAnonymous: z.boolean().default(false),
  parentId: idSchema.optional(),
  upvotes: z.number().int().min(0).default(0),
  answered: z.boolean().default(false),
  answeredAt: isoDateSchema.optional(),
  answeredBy: idSchema.optional(),
});

export const screenShareSchema = z.object({
  liveSessionId: idSchema,
  userId: idSchema,
  startedAt: isoDateSchema,
  endedAt: isoDateSchema.optional(),
  shareType: z.enum(["screen", "window", "tab"]).default("screen"),
  hasAudio: z.boolean().default(false),
});

export const liveChatSchema = z.object({
  liveSessionId: idSchema,
  userId: idSchema,
  message: z.string().min(1).max(2000),
  type: z.enum(["message", "reaction", "system"]).default("message"),
  replyTo: idSchema.optional(),
  isDeleted: z.boolean().default(false),
});

export const liveAnnotationSchema = z.object({
  liveSessionId: idSchema,
  userId: idSchema,
  timestamp: z.number().int().min(0),
  content: z.string().min(1).max(5000),
  type: z.enum(["note", "highlight", "bookmark", "question"]),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

export const liveSessionAnalyticsSchema = z.object({
  liveSessionId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["attendance", "engagement", "duration", "chatMessages", "pollParticipation", "qaQuestions"])).optional(),
});

export const liveSessionExportSchema = z.object({
  liveSessionId: idSchema,
  format: z.enum(["csv", "json", "pdf"]),
  includeChat: z.boolean().default(false),
  includeAttendance: z.boolean().default(true),
  includeEngagement: z.boolean().default(false),
});

export const liveSessionImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["csv", "json"]),
  courseId: idSchema,
  overwrite: z.boolean().default(false),
});

export const liveSessionTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(["lecture", "workshop", "seminar", "office_hours", "exam"]),
  defaultDurationMinutes: z.number().int().min(1).max(480),
  defaultSettings: z.record(z.string(), z.unknown()).default({}),
  tags: z.array(tagSchema).default([]),
});

export const liveSessionSettingsSchema = z.object({
  liveSessionId: idSchema,
  allowRecording: z.boolean().default(true),
  allowScreenShare: z.boolean().default(true),
  allowChat: z.boolean().default(true),
  allowQA: z.boolean().default(true),
  allowPolls: z.boolean().default(true),
  allowBreakoutRooms: z.boolean().default(false),
  muteOnEntry: z.boolean().default(true),
  waitingRoom: z.boolean().default(false),
  autoRecord: z.boolean().default(false),
  maxParticipants: z.number().int().min(1).optional(),
  recordingRetentionDays: z.number().int().min(0).optional(),
});

export const liveSessionPrivacySchema = z.object({
  liveSessionId: idSchema,
  visibility: visibilityEnum,
  showInCatalog: z.boolean().default(true),
  allowRecording: z.boolean().default(true),
  recordingVisibility: z.enum(["private", "enrolled", "public"]).default("enrolled"),
});

export const liveSessionAccessibilitySchema = z.object({
  liveSessionId: idSchema,
  hasCaptions: z.boolean().default(false),
  hasSignLanguage: z.boolean().default(false),
  hasAudioDescription: z.boolean().default(false),
  hasTranscript: z.boolean().default(false),
  screenReaderFriendly: z.boolean().default(true),
});

export const liveSessionLocalizationSchema = z.object({
  liveSessionId: idSchema,
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(localeSchema, z.object({ title: z.string().min(1), description: z.string().optional() })),
});

export const liveSessionMetadataSchema = z.object({
  liveSessionId: idSchema,
  topic: z.string().max(200).optional(),
  category: z.string().max(100).optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  customFields: z.record(z.string(), z.unknown()).default({}),
});

export const liveSessionReminderSchema = z.object({
  liveSessionId: idSchema,
  reminderType: z.enum(["email", "notification", "sms"]),
  scheduledMinutesBefore: z.number().int().min(1).max(1440),
  message: z.string().min(1).max(500),
  sent: z.boolean().default(false),
});

export const liveSessionExtensionSchema = z.object({
  liveSessionId: idSchema,
  additionalMinutes: z.number().int().min(1).max(240),
  reason: z.string().max(500).optional(),
  extendedBy: idSchema,
  notifyParticipants: z.boolean().default(true),
});

export const liveSessionArchiveSchema = z.object({
  liveSessionId: idSchema,
  reason: z.string().max(1000).optional(),
  archiveRecordings: z.boolean().default(true),
  notifyParticipants: z.boolean().default(false),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 8. Social Learning (~40 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const createForumSchema = z.object({
  courseId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(["general", "q_and_a", "discussion", "announcement", "off_topic"]).default("general"),
  visibility: visibilityEnum.default("public"),
  isModerated: z.boolean().default(false),
  allowAnonymous: z.boolean().default(false),
  maxPostLength: z.number().int().min(100).max(100000).default(50000),
  sortOrder: z.number().int().min(0).default(0),
  tags: z.array(z.string().max(100)).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateForumSchema = createForumSchema.partial().extend({ id: idSchema });

export const forumQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  courseId: idSchema.optional(),
  type: z.enum(["general", "q_and_a", "discussion", "announcement", "off_topic"]).optional(),
  sortBy: z.enum(["name", "createdAt", "posts", "lastActivity"]).default("lastActivity"),
});

export const forumFilterSchema = z.object({
  search: z.string().optional(),
  courses: z.array(idSchema).optional(),
  types: z.array(z.enum(["general", "q_and_a", "discussion", "announcement", "off_topic"])).optional(),
  isModerated: z.boolean().optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const createForumPostSchema = z.object({
  forumId: idSchema,
  userId: idSchema,
  title: z.string().min(1).max(300),
  content: z.string().min(1).max(50000),
  parentId: idSchema.optional(),
  isPinned: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  tags: z.array(z.string().max(100)).max(10).default([]),
  attachments: z.array(fileInfoSchema).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateForumPostSchema = z.object({
  postId: idSchema,
  title: z.string().min(1).max(300).optional(),
  content: z.string().min(1).max(50000).optional(),
  isPinned: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  tags: z.array(z.string().max(100)).max(10).optional(),
  attachments: z.array(fileInfoSchema).max(10).optional(),
});

export const forumCommentSchema = z.object({
  postId: idSchema,
  userId: idSchema,
  content: z.string().min(1).max(20000),
  parentId: idSchema.optional(),
  attachments: z.array(fileInfoSchema).max(5).default([]),
  isAccepted: z.boolean().default(false),
});

export const createCommunitySchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().max(5000).optional(),
  shortDescription: z.string().max(500).optional(),
  ownerId: idSchema,
  type: z.enum(["public", "private", "secret"]).default("public"),
  visibility: visibilityEnum.default("public"),
  thumbnail: urlSchema.optional(),
  banner: urlSchema.optional(),
  rules: z.array(z.string().max(500)).max(20).default([]),
  tags: z.array(z.string().max(100)).max(20).default([]),
  memberCount: z.number().int().min(0).default(0),
  settings: z
    .object({
      allowMemberPosts: z.boolean().default(true),
      allowMemberInvite: z.boolean().default(false),
      requireApproval: z.boolean().default(false),
      allowFileUploads: z.boolean().default(true),
      maxFileSize: z.number().int().min(1).default(10485760),
    })
    .default({}),
  metadata: metadataSchema.default({}),
});

export const updateCommunitySchema = createCommunitySchema.partial().extend({ id: idSchema });

export const communityMemberSchema = z.object({
  communityId: idSchema,
  userId: idSchema,
  role: z.enum(["member", "moderator", "admin", "owner"]).default("member"),
  status: z.enum(["active", "pending", "suspended", "banned"]).default("active"),
  joinedAt: isoDateSchema.optional(),
  invitedBy: idSchema.optional(),
  notifications: z.boolean().default(true),
});

export const createGroupSchema = z.object({
  courseId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  maxMembers: z.number().int().min(2).max(50).default(5),
  isPrivate: z.boolean().default(false),
  allowSelfJoin: z.boolean().default(true),
  requireApproval: z.boolean().default(false),
  tags: z.array(z.string().max(100)).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateGroupSchema = createGroupSchema.partial().extend({ id: idSchema });

export const groupMemberSchema = z.object({
  groupId: idSchema,
  userId: idSchema,
  role: z.enum(["member", "leader", "admin"]).default("member"),
  status: z.enum(["active", "pending", "removed"]).default("active"),
  joinedAt: isoDateSchema.optional(),
  invitedBy: idSchema.optional(),
});

export const createMentoringSchema = z.object({
  mentorId: idSchema,
  menteeId: idSchema,
  courseId: idSchema.optional(),
  topic: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  status: z.enum(["pending", "active", "completed", "cancelled"]).default("pending"),
  maxSessions: z.number().int().min(1).max(52).optional(),
  sessionDurationMinutes: z.number().int().min(15).max(240).default(60),
  startDate: isoDateSchema.optional(),
  endDate: isoDateSchema.optional(),
  goals: z.array(z.string().max(300)).max(10).default([]),
  metadata: metadataSchema.default({}),
});

export const updateMentoringSchema = createMentoringSchema.partial().extend({ id: idSchema });

export const mentoringSessionSchema = z.object({
  mentoringId: idSchema,
  scheduledAt: isoDateSchema,
  durationMinutes: z.number().int().min(15).max(240).default(60),
  meetingUrl: urlSchema.optional(),
  notes: z.string().max(5000).optional(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled", "no_show"]).default("scheduled"),
  feedback: z
    .object({
      mentorFeedback: z.string().max(2000).optional(),
      menteeFeedback: z.string().max(2000).optional(),
      mentorRating: z.number().int().min(1).max(5).optional(),
      menteeRating: z.number().int().min(1).max(5).optional(),
    })
    .optional(),
});

export const createStudyGroupSchema = z.object({
  courseId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  maxMembers: z.number().int().min(2).max(20).default(5),
  schedule: z
    .object({
      dayOfWeek: z.array(z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])),
      time: z.string().regex(/^\d{2}:\d{2}$/),
      durationMinutes: z.number().int().min(15).max(240).default(60),
    })
    .optional(),
  topics: z.array(z.string().max(200)).max(10).default([]),
  isPrivate: z.boolean().default(false),
  allowSelfJoin: z.boolean().default(true),
  metadata: metadataSchema.default({}),
});

export const updateStudyGroupSchema = createStudyGroupSchema.partial().extend({ id: idSchema });

export const studyGroupMemberSchema = z.object({
  studyGroupId: idSchema,
  userId: idSchema,
  role: z.enum(["member", "leader", "admin"]).default("member"),
  status: z.enum(["active", "pending", "removed"]).default("active"),
  joinedAt: isoDateSchema.optional(),
});

export const knowledgeShareSchema = z.object({
  userId: idSchema,
  courseId: idSchema.optional(),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  content: z.string().max(100000).optional(),
  type: z.enum(["article", "tutorial", "tip", "resource", "code_snippet"]),
  tags: z.array(z.string().max(100)).max(20).default([]),
  attachments: z.array(fileInfoSchema).max(10).default([]),
  visibility: visibilityEnum.default("public"),
  allowComments: z.boolean().default(true),
});

export const bookmarkSchema = z.object({
  userId: idSchema,
  targetType: z.enum(["course", "lesson", "assignment", "quiz", "content", "forum_post", "knowledge_share"]),
  targetId: idSchema,
  collection: z.string().max(100).optional(),
  note: z.string().max(500).optional(),
});

export const likeSchema = z.object({
  userId: idSchema,
  targetType: z.enum(["post", "comment", "knowledge_share", "forum_post"]),
  targetId: idSchema,
});

export const commentSchema = z.object({
  targetType: z.enum(["post", "knowledge_share", "forum_post", "content"]),
  targetId: idSchema,
  userId: idSchema,
  content: z.string().min(1).max(10000),
  parentId: idSchema.optional(),
  attachments: z.array(fileInfoSchema).max(5).default([]),
});

export const reactionSchema = z.object({
  userId: idSchema,
  targetType: z.enum(["post", "comment", "forum_post"]),
  targetId: idSchema,
  emoji: z.string().min(1).max(10),
});

export const discussionThreadSchema = z.object({
  forumId: idSchema,
  title: z.string().min(1).max(300),
  content: z.string().min(1).max(50000),
  userId: idSchema,
  tags: z.array(z.string().max(100)).max(10).default([]),
  isPinned: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  isResolved: z.boolean().default(false),
  attachments: z.array(fileInfoSchema).max(10).default([]),
});

export const forumModerationSchema = z.object({
  forumId: idSchema,
  moderatorId: idSchema,
  action: z.enum(["pin", "unpin", "lock", "unlock", "delete", "edit", "warn", "ban"]),
  targetType: z.enum(["post", "comment", "user"]),
  targetId: idSchema,
  reason: z.string().max(1000).optional(),
  duration: z.number().int().min(0).optional(),
});

export const forumGamificationSchema = z.object({
  forumId: idSchema,
  enabled: z.boolean().default(true),
  pointsPerPost: z.number().int().min(0).default(5),
  pointsPerComment: z.number().int().min(0).default(2),
  pointsPerLike: z.number().int().min(0).default(1),
  pointsPerBestAnswer: z.number().int().min(0).default(10),
  dailyPostLimit: z.number().int().min(1).optional(),
  minPostLength: z.number().int().min(1).default(50),
});

export const forumAnalyticsSchema = z.object({
  forumId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["posts", "comments", "users", "engagement", "topContributors", "avgResponseTime"])).optional(),
  granularity: z.enum(["day", "week", "month"]).default("day"),
});

export const communityAnalyticsSchema = z.object({
  communityId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["members", "posts", "comments", "engagement", "growth", "retention"])).optional(),
  granularity: z.enum(["day", "week", "month"]).default("day"),
});

export const groupAnalyticsSchema = z.object({
  groupId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["members", "activity", "collaboration", "completion"])).optional(),
});

export const mentoringAnalyticsSchema = z.object({
  mentoringId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["sessions", "duration", "feedback", "goals_met", "satisfaction"])).optional(),
});

export const studyGroupAnalyticsSchema = z.object({
  studyGroupId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["meetings", "attendance", "participation", "progress"])).optional(),
});

export const knowledgeShareAnalyticsSchema = z.object({
  knowledgeShareId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z.array(z.enum(["views", "likes", "comments", "shares", "bookmarks"])).optional(),
});

export const forumExportSchema = z.object({
  forumId: idSchema,
  format: z.enum(["csv", "json", "pdf"]),
  includeComments: z.boolean().default(true),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const communityExportSchema = z.object({
  communityId: idSchema,
  format: z.enum(["csv", "json", "pdf"]),
  includeMembers: z.boolean().default(true),
  includePosts: z.boolean().default(true),
});

export const groupExportSchema = z.object({
  groupId: idSchema,
  format: z.enum(["csv", "json", "pdf"]),
  includeMembers: z.boolean().default(true),
  includeActivity: z.boolean().default(true),
});

export const mentoringExportSchema = z.object({
  mentoringId: idSchema,
  format: z.enum(["csv", "json", "pdf"]),
  includeSessions: z.boolean().default(true),
  includeFeedback: z.boolean().default(true),
});

export const studyGroupExportSchema = z.object({
  studyGroupId: idSchema,
  format: z.enum(["csv", "json", "pdf"]),
  includeMembers: z.boolean().default(true),
  includeMeetings: z.boolean().default(true),
});

export const forumImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["csv", "json"]),
  courseId: idSchema,
  forumId: idSchema.optional(),
  overwrite: z.boolean().default(false),
});

export const communityImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["csv", "json"]),
  overwrite: z.boolean().default(false),
  includeMembers: z.boolean().default(true),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 9. Analytics (~30 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const progressSchema = z.object({
  userId: idSchema,
  courseId: idSchema.optional(),
  learningPathId: idSchema.optional(),
  completedItems: z.array(idSchema).default([]),
  totalItems: z.number().int().min(0).default(0),
  progress: z.number().min(0).max(100).default(0),
  timeSpent: z.number().int().min(0).default(0),
  lastActivityAt: isoDateSchema.optional(),
  startedAt: isoDateSchema.optional(),
  estimatedCompletionAt: isoDateSchema.optional(),
});

export const progressQuerySchema = paginationSchema.extend({
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  learningPathId: idSchema.optional(),
  minProgress: z.number().min(0).max(100).optional(),
  maxProgress: z.number().min(0).max(100).optional(),
  activeAfter: isoDateSchema.optional(),
  activeBefore: isoDateSchema.optional(),
  sortBy: z.enum(["progress", "timeSpent", "lastActivity", "startedAt"]).default("lastActivity"),
});

export const completionSchema = z.object({
  userId: idSchema,
  courseId: idSchema.optional(),
  lessonId: idSchema.optional(),
  moduleId: idSchema.optional(),
  assignmentId: idSchema.optional(),
  quizId: idSchema.optional(),
  completedAt: isoDateSchema.optional(),
  score: z.number().min(0).max(100).optional(),
  timeSpent: z.number().int().min(0).optional(),
  attemptCount: z.number().int().min(1).optional(),
  certificateId: idSchema.optional(),
});

export const completionQuerySchema = paginationSchema.extend({
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  type: z.enum(["lesson", "module", "course", "assignment", "quiz"]).optional(),
  completedAfter: isoDateSchema.optional(),
  completedBefore: isoDateSchema.optional(),
  minScore: z.number().min(0).max(100).optional(),
  maxScore: z.number().min(0).max(100).optional(),
  sortBy: z.enum(["completedAt", "score", "timeSpent"]).default("completedAt"),
});

export const engagementSchema = z.object({
  userId: idSchema,
  courseId: idSchema.optional(),
  sessionIdCount: z.number().int().min(0).default(0),
  totalTime: z.number().int().min(0).default(0),
  avgSessionDuration: z.number().int().min(0).default(0),
  lastActiveAt: isoDateSchema.optional(),
  actionsCount: z.number().int().min(0).default(0),
  interactionTypes: z.record(z.string(), z.number().int().min(0)).default({}),
  deviceBreakdown: z
    .record(z.enum(["desktop", "mobile", "tablet"]), z.number().int().min(0))
    .default({}),
});

export const engagementQuerySchema = paginationSchema.extend({
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  minSessions: z.number().int().min(0).optional(),
  minTime: z.number().int().min(0).optional(),
  sortBy: z.enum(["totalTime", "sessions", "lastActive", "actions"]).default("lastActive"),
});

export const dropoutRiskSchema = z.object({
  userId: idSchema,
  courseId: idSchema,
  riskScore: z.number().min(0).max(1),
  riskLevel: z.enum(["low", "medium", "high", "critical"]),
  factors: z
    .array(
      z.object({
        factor: z.string().max(200),
        weight: z.number().min(0).max(1),
        description: z.string().max(500).optional(),
      })
    )
    .default([]),
  lastActivityDays: z.number().int().min(0).optional(),
  currentProgress: z.number().min(0).max(100).optional(),
  predictedCompletion: z.number().min(0).max(100).optional(),
  recommendedActions: z.array(z.string().max(500)).default([]),
  assessedAt: isoDateSchema.optional(),
});

export const learningTimeSchema = z.object({
  userId: idSchema,
  courseId: idSchema.optional(),
  totalTime: z.number().int().min(0).default(0),
  dailyAverage: z.number().min(0).default(0),
  weeklyAverage: z.number().min(0).default(0),
  peakHour: z.number().int().min(0).max(23).optional(),
  peakDay: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]).optional(),
  sessionCount: z.number().int().min(0).default(0),
  avgSessionDuration: z.number().int().min(0).default(0),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const heatmapSchema = z.object({
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  data: z.array(
    z.object({
      date: z.string(),
      hour: z.number().int().min(0).max(23),
      value: z.number().min(0),
      label: z.string().optional(),
    })
  ),
  maxValue: z.number().min(0).optional(),
  colorScale: z.array(z.string().max(20)).optional(),
});

export const competencyAnalyticsSchema = z.object({
  userId: idSchema,
  competencyId: idSchema.optional(),
  currentLevel: z.number().int().min(0).max(5).default(0),
  targetLevel: z.number().int().min(1).max(5).optional(),
  progressToTarget: z.number().min(0).max(100).optional(),
  assessmentsCount: z.number().int().min(0).default(0),
  lastAssessmentAt: isoDateSchema.optional(),
  trend: z.enum(["improving", "stable", "declining"]).optional(),
  relatedCourses: z.array(idSchema).default([]),
});

export const skillGapAnalysisSchema = z.object({
  userId: idSchema,
  targetRole: z.string().min(1).max(200),
  gaps: z.array(
    z.object({
      skillId: idSchema,
      skillName: z.string().min(1).max(200),
      currentLevel: z.number().int().min(0).max(5),
      requiredLevel: z.number().int().min(1).max(5),
      gapSize: z.number().int().min(0).max(5),
      priority: z.enum(["critical", "high", "medium", "low"]),
      recommendedCourses: z.array(idSchema).default([]),
    })
  ),
  overallReadiness: z.number().min(0).max(100).optional(),
  estimatedTimeToReady: z.number().int().min(0).optional(),
});

export const learningRecommendationSchema = z.object({
  userId: idSchema,
  recommendations: z.array(
    z.object({
      type: z.enum(["course", "lesson", "content", "learning_path", "activity"]),
      id: idSchema,
      title: z.string().min(1).max(300),
      reason: z.string().max(500),
      score: z.number().min(0).max(1),
      algorithm: z.enum(["collaborative", "content", "hybrid", "ai", "rule_based"]),
    })
  ),
  generatedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
});

export const progressReportSchema = z.object({
  userId: idSchema,
  reportType: z.enum(["course", "learning_path", "competency", "overall"]),
  targetId: idSchema.optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  includeDetails: z.boolean().default(true),
  includeCharts: z.boolean().default(false),
  format: z.enum(["json", "pdf", "csv"]).default("json"),
});

export const engagementReportSchema = z.object({
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z
    .array(z.enum(["activeUsers", "sessionDuration", "pageViews", "interactions", "completionRate", "dropoutRate"]))
    .optional(),
  granularity: z.enum(["hour", "day", "week", "month"]).default("day"),
  groupBy: z.enum(["user", "course", "module", "lesson"]).optional(),
});

export const analyticsExportSchema = z.object({
  reportType: z.enum(["progress", "engagement", "completion", "dropout", "competency", "custom"]),
  format: z.enum(["csv", "json", "pdf", "xlsx"]),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  filters: z.record(z.string(), z.unknown()).default({}),
  includeRawData: z.boolean().default(false),
  includeCharts: z.boolean().default(false),
});

export const analyticsImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["csv", "json"]),
  dataType: z.enum(["progress", "engagement", "completion", "custom"]),
  overwrite: z.boolean().default(false),
  mapping: z.record(z.string(), z.string()).optional(),
});

const analyticsWidgetSchemaDef = z.object({
  id: idSchema.optional(),
  type: z.enum(["chart", "table", "metric", "progress", "heatmap", "leaderboard"]),
  title: z.string().min(1).max(200),
  dataSource: z.string().max(200),
  position: z.object({ x: z.number().int().min(0), y: z.number().int().min(0) }),
  size: z.object({ width: z.number().int().min(1).max(12), height: z.number().int().min(1).max(10) }),
  config: z.record(z.string(), z.unknown()).default({}),
  refreshInterval: z.number().int().min(0).optional(),
});
const analyticsWidgetSchema = analyticsWidgetSchemaDef;

export const analyticsWidgetCreateSchema = analyticsWidgetSchemaDef;

export const analyticsWidgetUpdateSchema = analyticsWidgetSchemaDef.partial().extend({ id: idSchema });

export const analyticsDashboardSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  ownerId: idSchema,
  isDefault: z.boolean().default(false),
  isPublic: z.boolean().default(false),
  widgets: z.array(analyticsWidgetSchema).max(20).default([]),
  layout: z
    .object({
      columns: z.number().int().min(1).max(12).default(12),
      rows: z.number().int().min(1).max(20).default(10),
    })
    .default({}),
  filters: z.record(z.string(), z.unknown()).default({}),
  refreshInterval: z.number().int().min(0).default(300),
});

export const analyticsAlertSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  ownerId: idSchema,
  metric: z.string().min(1).max(200),
  condition: z.enum(["above", "below", "equals", "change_above", "change_below"]),
  threshold: z.number(),
  severity: z.enum(["info", "warning", "critical"]).default("warning"),
  notificationChannels: z.array(z.enum(["email", "sms", "webhook", "in_app"])).default(["email"]),
  webhookUrl: urlSchema.optional(),
  cooldownMinutes: z.number().int().min(0).default(60),
  enabled: z.boolean().default(true),
});

export const analyticsScheduleSchema = z.object({
  name: z.string().min(1).max(200),
  reportType: z.enum(["progress", "engagement", "completion", "custom"]),
  frequency: z.enum(["daily", "weekly", "monthly", "quarterly"]),
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  dayOfMonth: z.number().int().min(1).max(31).optional(),
  recipients: z.array(emailSchema).min(1),
  format: z.enum(["csv", "json", "pdf"]).default("pdf"),
  filters: z.record(z.string(), z.unknown()).default({}),
  enabled: z.boolean().default(true),
  lastRunAt: isoDateSchema.optional(),
  nextRunAt: isoDateSchema.optional(),
});

export const analyticsFilterSchema = z.object({
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  segmentBy: z.enum(["user", "course", "module", "lesson", "date", "device"]).optional(),
  groupBy: z.enum(["day", "week", "month"]).optional(),
  minDataPoints: z.number().int().min(0).optional(),
  excludeIncomplete: z.boolean().default(false),
});

export const analyticsAggregationSchema = z.object({
  metric: z.enum(["sum", "avg", "min", "max", "count", "median"]),
  field: z.string().min(1).max(200),
  groupBy: z.array(z.string().max(100)).default([]),
  filters: z.record(z.string(), z.unknown()).default({}),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const analyticsVisualizationSchema = z.object({
  type: z.enum(["line", "bar", "pie", "area", "scatter", "heatmap", "funnel", "gauge"]),
  title: z.string().min(1).max(200),
  dataSource: z.string().max(200),
  xAxis: z
    .object({
      field: z.string().min(1).max(200),
      label: z.string().max(100).optional(),
      type: z.enum(["category", "time", "numeric"]).optional(),
    })
    .optional(),
  yAxis: z
    .object({
      field: z.string().min(1).max(200),
      label: z.string().max(100).optional(),
      aggregation: z.enum(["sum", "avg", "count", "min", "max"]).optional(),
    })
    .optional(),
  series: z
    .array(
      z.object({
        field: z.string().min(1).max(200),
        label: z.string().max(100).optional(),
        color: z.string().optional(),
      })
    )
    .optional(),
  options: z.record(z.string(), z.unknown()).default({}),
});

export const analyticsShareSchema = z.object({
  dashboardId: idSchema,
  sharedWithUserId: idSchema.optional(),
  sharedWithGroupId: idSchema.optional(),
  permission: z.enum(["view", "edit"]).default("view"),
  expiresAt: isoDateSchema.optional(),
});

export const analyticsBookmarkSchema = z.object({
  userId: idSchema,
  reportType: z.string().min(1).max(200),
  reportId: idSchema.optional(),
  name: z.string().min(1).max(200),
  filters: z.record(z.string(), z.unknown()).default({}),
});

export const analyticsFavoriteSchema = z.object({
  userId: idSchema,
  dashboardId: idSchema,
  order: z.number().int().min(0).default(0),
});

export const analyticsFeedbackSchema = z.object({
  userId: idSchema,
  reportType: z.string().min(1).max(200),
  reportId: idSchema.optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
  isHelpful: z.boolean().optional(),
});

export const analyticsRatingSchema = z.object({
  userId: idSchema,
  dashboardId: idSchema,
  rating: z.number().int().min(1).max(5),
  review: z.string().max(2000).optional(),
});

export const analyticsRecommendationSchema = z.object({
  userId: idSchema,
  reportType: z.string().min(1).max(200),
  reportId: idSchema.optional(),
  recommendations: z.array(
    z.object({
      action: z.string().min(1).max(500),
      priority: z.enum(["high", "medium", "low"]),
      category: z.string().max(100).optional(),
      estimatedImpact: z.number().min(0).max(1).optional(),
    })
  ),
  generatedAt: isoDateSchema.optional(),
});

export const analyticsInsightSchema = z.object({
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  insightType: z.enum(["trend", "anomaly", "prediction", "recommendation", "benchmark"]),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(2000),
  severity: z.enum(["info", "warning", "critical"]).default("info"),
  confidence: z.number().min(0).max(1).optional(),
  data: z.record(z.string(), z.unknown()).default({}),
  actionable: z.boolean().default(true),
  actionUrl: urlSchema.optional(),
  generatedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 10. Gamification (~30 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const pointsSchema = z.object({
  userId: idSchema,
  totalPoints: z.number().int().min(0).default(0),
  availablePoints: z.number().int().min(0).default(0),
  lifetimePoints: z.number().int().min(0).default(0),
  lastAwardedAt: isoDateSchema.optional(),
  breakdown: z.record(z.string(), z.number().int().min(0)).default({}),
});

export const pointsAwardSchema = z.object({
  userId: idSchema,
  points: z.number().int().min(1),
  source: z.enum(["course", "quiz", "assignment", "forum", "login", "streak", "achievement", "admin", "other"]),
  sourceId: idSchema.optional(),
  description: z.string().max(500).optional(),
  awardedBy: idSchema.optional(),
  awardedAt: isoDateSchema.optional(),
  expiresAt: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const xpSchema = z.object({
  userId: idSchema,
  totalXp: z.number().int().min(0).default(0),
  currentLevel: z.number().int().min(1).default(1),
  xpToNextLevel: z.number().int().min(0).default(100),
  xpInCurrentLevel: z.number().int().min(0).default(0),
  lifetimeXp: z.number().int().min(0).default(0),
  lastAwardedAt: isoDateSchema.optional(),
});

export const xpAwardSchema = z.object({
  userId: idSchema,
  xp: z.number().int().min(1),
  source: z.enum(["course", "quiz", "assignment", "forum", "login", "streak", "achievement", "admin", "other"]),
  sourceId: idSchema.optional(),
  description: z.string().max(500).optional(),
  awardedBy: idSchema.optional(),
  awardedAt: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const levelSchema = z.object({
  level: z.number().int().min(1),
  name: z.string().min(1).max(100),
  minXp: z.number().int().min(0),
  maxXp: z.number().int().min(0),
  benefits: z.array(z.string().max(200)).default([]),
  badge: urlSchema.optional(),
  description: z.string().max(500).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

export const levelUpdateSchema = z.object({
  userId: idSchema,
  previousLevel: z.number().int().min(1),
  newLevel: z.number().int().min(1),
  totalXp: z.number().int().min(0),
  unlockedBenefits: z.array(z.string().max(200)).default([]),
  notificationSent: z.boolean().default(false),
});

export const achievementSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  icon: urlSchema,
  category: z.string().max(100).optional(),
  rarity: z.enum(["common", "uncommon", "rare", "epic", "legendary"]).default("common"),
  points: z.number().int().min(0).default(0),
  xp: z.number().int().min(0).default(0),
  criteria: z
    .object({
      type: z.enum(["points", "completion", "streak", "skill", "custom"]),
      threshold: z.number().min(0).optional(),
      description: z.string().max(1000).optional(),
      conditions: z.record(z.string(), z.unknown()).default({}),
    })
    .optional(),
  isHidden: z.boolean().default(false),
  isRepeatable: z.boolean().default(false),
  maxRepeats: z.number().int().min(1).optional(),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const achievementAwardSchema = z.object({
  achievementId: idSchema,
  userId: idSchema,
  awardedBy: idSchema.optional(),
  reason: z.string().max(1000).optional(),
  metadata: metadataSchema.default({}),
  awardedAt: isoDateSchema.optional(),
  repeatCount: z.number().int().min(1).default(1),
});

export const badgeAward2Schema = z.object({
  badgeId: idSchema,
  userId: idSchema,
  awardedBy: idSchema.optional(),
  reason: z.string().max(1000).optional(),
  metadata: metadataSchema.default({}),
  awardedAt: isoDateSchema.optional(),
});

export const leaderboardSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(["points", "xp", "streak", "course_completion", "custom"]),
  scope: z.enum(["global", "course", "community", "group"]),
  scopeId: idSchema.optional(),
  timeWindow: z.enum(["daily", "weekly", "monthly", "all_time"]).default("all_time"),
  maxEntries: z.number().int().min(1).max(10000).default(100),
  isActive: z.boolean().default(true),
  resetSchedule: z
    .object({
      frequency: z.enum(["daily", "weekly", "monthly", "never"]).default("never"),
      dayOfWeek: z.number().int().min(0).max(6).optional(),
      dayOfMonth: z.number().int().min(1).max(31).optional(),
    })
    .optional(),
  metadata: metadataSchema.default({}),
});

export const leaderboardEntrySchema = z.object({
  leaderboardId: idSchema,
  userId: idSchema,
  rank: z.number().int().min(1),
  score: z.number().min(0),
  previousRank: z.number().int().min(1).optional(),
  rankChange: z.number().int().optional(),
  lastUpdated: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const leaderboardUpdateSchema = z.object({
  leaderboardId: idSchema,
  userId: idSchema,
  score: z.number().min(0),
  reason: z.string().max(500).optional(),
  metadata: metadataSchema.default({}),
});

export const challengeSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  type: z.enum(["individual", "team", "course_wide", "community"]),
  scope: z.enum(["global", "course", "community"]),
  scopeId: idSchema.optional(),
  startDate: isoDateSchema,
  endDate: isoDateSchema,
  maxParticipants: z.number().int().min(1).optional(),
  rewards: z
    .array(
      z.object({
        type: z.enum(["points", "xp", "badge", "certificate"]),
        value: z.number().int().min(0).optional(),
        badgeId: idSchema.optional(),
        rank: z.number().int().min(1).optional(),
      })
    )
    .default([]),
  rules: z
    .object({
      tasks: z
        .array(
          z.object({
            name: z.string().min(1).max(200),
            description: z.string().max(500).optional(),
            type: z.string().min(1).max(100),
            target: z.number().int().min(1),
            points: z.number().int().min(0).default(0),
          })
        )
        .max(20),
      scoringMethod: z.enum(["total", "percentage", "weighted"]).default("total"),
    })
    .optional(),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const challengeCreateSchema = challengeSchema;

export const challengeCompleteSchema = z.object({
  challengeId: idSchema,
  userId: idSchema,
  taskId: z.string().min(1).max(200),
  evidence: z.string().max(2000).optional(),
  completedAt: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const rewardSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000),
  type: z.enum(["points", "xp", "badge", "certificate", "discount", "physical", "custom"]),
  value: z.number().min(0).optional(),
  badgeId: idSchema.optional(),
  certificateTemplateId: idSchema.optional(),
  cost: z.number().int().min(0).default(0),
  stock: z.number().int().min(0).optional(),
  maxPerUser: z.number().int().min(1).optional(),
  imageUrl: urlSchema.optional(),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const rewardRedeemSchema = z.object({
  rewardId: idSchema,
  userId: idSchema,
  cost: z.number().int().min(0),
  quantity: z.number().int().min(1).default(1),
  redeemedAt: isoDateSchema.optional(),
  shippingInfo: z
    .object({
      name: z.string().min(1).max(200),
      address: z.string().min(1).max(500),
      city: z.string().min(1).max(100),
      state: z.string().min(1).max(100),
      postalCode: z.string().min(1).max(20),
      country: z.string().min(2).max(3),
      phone: z.string().max(30).optional(),
    })
    .optional(),
  metadata: metadataSchema.default({}),
});

export const dailyGoalSchema = z.object({
  userId: idSchema,
  goalType: z.enum(["points", "xp", "time", "completions"]),
  targetValue: z.number().min(0),
  currentValue: z.number().min(0).default(0),
  isCompleted: z.boolean().default(false),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  streakCount: z.number().int().min(0).default(0),
  metadata: metadataSchema.default({}),
});

export const streakSchema = z.object({
  userId: idSchema,
  type: z.enum(["login", "completion", "submission", "activity"]),
  currentStreak: z.number().int().min(0).default(0),
  longestStreak: z.number().int().min(0).default(0),
  lastActiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  totalDays: z.number().int().min(0).default(0),
  milestones: z.array(z.number().int().min(1)).default([]),
});

export const streakCreateSchema = z.object({
  userId: idSchema,
  type: z.enum(["login", "completion", "submission", "activity"]),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  initialCount: z.number().int().min(0).default(0),
});

export const gamificationConfigSchema = z.object({
  courseId: idSchema.optional(),
  communityId: idSchema.optional(),
  enabled: z.boolean().default(true),
  pointsEnabled: z.boolean().default(true),
  xpEnabled: z.boolean().default(true),
  badgesEnabled: z.boolean().default(true),
  leaderboardsEnabled: z.boolean().default(true),
  challengesEnabled: z.boolean().default(true),
  streaksEnabled: z.boolean().default(true),
  dailyGoalsEnabled: z.boolean().default(true),
  rewardsStoreEnabled: z.boolean().default(false),
  notificationsEnabled: z.boolean().default(true),
  pointsPerAction: z
    .object({
      login: z.number().int().min(0).default(5),
      courseComplete: z.number().int().min(0).default(100),
      lessonComplete: z.number().int().min(0).default(10),
      quizPass: z.number().int().min(0).default(20),
      assignmentSubmit: z.number().int().min(0).default(15),
      forumPost: z.number().int().min(0).default(5),
      forumComment: z.number().int().min(0).default(2),
      peerReview: z.number().int().min(0).default(10),
    })
    .default({}),
  xpMultiplier: z.number().min(0.1).max(10).default(1),
  metadata: metadataSchema.default({}),
});

export const gamificationAnalyticsSchema = z.object({
  scope: z.enum(["global", "course", "community"]),
  scopeId: idSchema.optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z
    .array(
      z.enum([
        "totalPoints",
        "totalXp",
        "activeUsers",
        "achievementsEarned",
        "badgesAwarded",
        "challengesCompleted",
        "averageStreak",
        "leaderboardActivity",
      ])
    )
    .optional(),
  granularity: z.enum(["day", "week", "month"]).default("day"),
});

export const gamificationExportSchema = z.object({
  scope: z.enum(["global", "course", "community"]),
  scopeId: idSchema.optional(),
  format: z.enum(["csv", "json", "pdf"]),
  includePoints: z.boolean().default(true),
  includeXp: z.boolean().default(true),
  includeBadges: z.boolean().default(true),
  includeAchievements: z.boolean().default(true),
  includeLeaderboards: z.boolean().default(false),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const gamificationImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["csv", "json"]),
  scope: z.enum(["global", "course", "community"]),
  scopeId: idSchema.optional(),
  overwrite: z.boolean().default(false),
});

export const gamificationSettingsSchema = z.object({
  courseId: idSchema.optional(),
  notificationsEnabled: z.boolean().default(true),
  emailDigest: z.enum(["daily", "weekly", "never"]).default("weekly"),
  showOnDashboard: z.boolean().default(true),
  showLeaderboardRank: z.boolean().default(true),
  showPoints: z.boolean().default(true),
  showXp: z.boolean().default(true),
  showBadges: z.boolean().default(true),
  allowOptOut: z.boolean().default(false),
  privacyLevel: z.enum(["public", "friends_only", "private"]).default("public"),
});

export const gamificationPrivacySchema = z.object({
  userId: idSchema,
  showPoints: z.boolean().default(true),
  showXp: z.boolean().default(true),
  showBadges: z.boolean().default(true),
  showLeaderboard: z.boolean().default(true),
  showAchievements: z.boolean().default(true),
  showStreaks: z.boolean().default(true),
  profileVisibility: z.enum(["public", "friends_only", "private"]).default("public"),
});

export const gamificationAccessibilitySchema = z.object({
  showPoints: z.boolean().default(true),
  showXp: z.boolean().default(true),
  showBadges: z.boolean().default(true),
  screenReaderDescriptions: z.boolean().default(true),
  colorBlindFriendly: z.boolean().default(true),
  highContrast: z.boolean().default(false),
  altTextForIcons: z.boolean().default(true),
});

export const gamificationLocalizationSchema = z.object({
  courseId: idSchema.optional(),
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(
    localeSchema,
    z.object({
      pointsLabel: z.string().min(1).optional(),
      xpLabel: z.string().min(1).optional(),
      levelLabel: z.string().min(1).optional(),
      badgeLabel: z.string().min(1).optional(),
      achievementLabel: z.string().min(1).optional(),
      leaderboardLabel: z.string().min(1).optional(),
    })
  ),
});

export const gamificationMetadataSchema = z.object({
  scope: z.enum(["global", "course", "community"]),
  scopeId: idSchema.optional(),
  version: z.string().max(50).optional(),
  customRules: z.array(z.record(z.string(), z.unknown())).default([]),
  metadata: metadataSchema.default({}),
});

export const gamificationReminderSchema = z.object({
  userId: idSchema,
  reminderType: z.enum(["streak", "daily_goal", "challenge", "leaderboard", "points_expiry"]),
  scheduledAt: isoDateSchema,
  message: z.string().min(1).max(500),
  sent: z.boolean().default(false),
  metadata: metadataSchema.default({}),
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 11. Marketplace (~30 schemas)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const createMarketplaceSchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().max(5000).optional(),
  shortDescription: z.string().max(500).optional(),
  ownerId: idSchema,
  logo: urlSchema.optional(),
  banner: urlSchema.optional(),
  category: z.string().min(1).max(100),
  tags: z.array(z.string().max(100)).max(20).default([]),
  commission: z.number().min(0).max(100).default(10),
  currency: z.string().length(3).default("USD"),
  status: statusEnum.default("draft"),
  visibility: visibilityEnum.default("private"),
  settings: z
    .object({
      allowInstantPurchase: z.boolean().default(true),
      allowLicensing: z.boolean().default(false),
      allowSubscriptions: z.boolean().default(true),
      requireApproval: z.boolean().default(false),
      returnPolicy: z.string().max(2000).optional(),
    })
    .default({}),
  metadata: metadataSchema.default({}),
});

export const updateMarketplaceSchema = createMarketplaceSchema.partial().extend({ id: idSchema });

export const marketplaceQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  category: z.string().optional(),
  ownerId: idSchema.optional(),
  status: statusEnum.optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["name", "createdAt", "price", "rating", "sales"]).default("createdAt"),
});

export const marketplaceFilterSchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.string()).optional(),
  owners: z.array(idSchema).optional(),
  statuses: z.array(statusEnum).optional(),
  priceRange: z.object({ min: z.number().min(0), max: z.number().min(0) }).optional(),
  tags: z.array(z.string()).optional(),
  ratingRange: z.object({ min: z.number().min(0).max(5), max: z.number().min(0).max(5) }).optional(),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
});

export const createMarketplaceTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().min(1).max(100),
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  thumbnail: urlSchema.optional(),
  previewUrl: urlSchema.optional(),
  content: z.record(z.string(), z.unknown()).default({}),
  tags: z.array(z.string().max(100)).max(20).default([]),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const updateMarketplaceTemplateSchema = createMarketplaceTemplateSchema.partial().extend({ id: idSchema });

export const premiumContentSchema = z.object({
  marketplaceId: idSchema,
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  shortDescription: z.string().max(500).optional(),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional(),
  currency: z.string().length(3).default("USD"),
  type: z.enum(["course", "template", "content", "tool", "service"]),
  thumbnail: urlSchema.optional(),
  previewUrl: urlSchema.optional(),
  contentId: idSchema.optional(),
  tags: z.array(z.string().max(100)).max(20).default([]),
  features: z.array(z.string().max(200)).max(20).default([]),
  requirements: z.array(z.string().max(200)).max(10).default([]),
  licenseType: z.enum(["single", "multi", "enterprise", "subscription"]),
  maxSeats: z.number().int().min(1).optional(),
  status: statusEnum.default("draft"),
  metadata: metadataSchema.default({}),
});

export const publisherAccountSchema = z.object({
  userId: idSchema,
  displayName: z.string().min(1).max(200),
  bio: z.string().max(2000).optional(),
  avatar: urlSchema.optional(),
  website: urlSchema.optional(),
  payoutMethod: z.enum(["bank_transfer", "paypal", "stripe"]),
  payoutDetails: z.record(z.string(), z.string()).default({}),
  taxInfo: z
    .object({
      country: z.string().length(3),
      taxId: z.string().max(50),
      businessType: z.enum(["individual", "business"]).default("individual"),
    })
    .optional(),
  status: z.enum(["pending", "approved", "suspended"]).default("pending"),
  totalSales: z.number().int().min(0).default(0),
  totalRevenue: z.number().min(0).default(0),
  rating: z.number().min(0).max(5).default(0),
  metadata: metadataSchema.default({}),
});

export const publisherApplicationSchema = z.object({
  userId: idSchema,
  displayName: z.string().min(1).max(200),
  bio: z.string().min(1).max(2000),
  portfolio: z.array(urlSchema).max(5).default([]),
  experience: z.string().max(2000).optional(),
  specialties: z.array(z.string().max(100)).max(10).default([]),
  agreedToTerms: z.literal(true),
});

export const reviewSchema = z.object({
  marketplaceId: idSchema,
  userId: idSchema,
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(200).optional(),
  comment: z.string().min(1).max(5000).optional(),
  pros: z.array(z.string().max(200)).max(5).default([]),
  cons: z.array(z.string().max(200)).max(5).default([]),
  isVerifiedPurchase: z.boolean().default(false),
  helpfulCount: z.number().int().min(0).default(0),
  reportedCount: z.number().int().min(0).default(0),
  status: z.enum(["visible", "hidden", "flagged"]).default("visible"),
});

export const ratingSchema = z.object({
  marketplaceId: idSchema,
  userId: idSchema,
  rating: z.number().int().min(1).max(5),
  ratedAt: isoDateSchema.optional(),
});

export const licenseSchema = z.object({
  marketplaceId: idSchema,
  type: z.enum(["single", "multi", "enterprise", "subscription", "custom"]),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  price: z.number().min(0),
  maxSeats: z.number().int().min(1).optional(),
  features: z.array(z.string().max(200)).max(20).default([]),
  restrictions: z.array(z.string().max(200)).max(10).default([]),
  validityDays: z.number().int().min(0).optional(),
  isDefault: z.boolean().default(false),
});

export const licenseCreateSchema = licenseSchema;

export const revenueShareSchema = z.object({
  marketplaceId: idSchema,
  publisherId: idSchema,
  sharePercentage: z.number().min(0).max(100),
  totalRevenue: z.number().min(0).default(0),
  totalPayouts: z.number().min(0).default(0),
  pendingPayout: z.number().min(0).default(0),
  currency: z.string().length(3).default("USD"),
  period: z.enum(["daily", "weekly", "monthly"]).default("monthly"),
  lastPayoutAt: isoDateSchema.optional(),
});

export const revenueShareCreateSchema = revenueShareSchema;

export const marketplaceAnalyticsSchema = z.object({
  marketplaceId: idSchema,
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
  metrics: z
    .array(
      z.enum([
        "views",
        "sales",
        "revenue",
        "conversionRate",
        "avgOrderValue",
        "topProducts",
        "refundRate",
        "reviews",
      ])
    )
    .optional(),
  granularity: z.enum(["day", "week", "month"]).default("day"),
});

export const marketplaceTransactionSchema = z.object({
  marketplaceId: idSchema,
  buyerId: idSchema,
  sellerId: idSchema,
  itemId: idSchema,
  itemType: z.enum(["course", "template", "content", "tool", "service"]),
  amount: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  commission: z.number().min(0).default(0),
  netAmount: z.number().min(0),
  paymentMethod: z.enum(["credit_card", "paypal", "stripe", "bank_transfer"]),
  transactionId: z.string().max(200).optional(),
  status: z.enum(["pending", "completed", "refunded", "disputed"]),
  createdAt: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const marketplacePayoutSchema = z.object({
  marketplaceId: idSchema,
  publisherId: idSchema,
  amount: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  method: z.enum(["bank_transfer", "paypal", "stripe"]),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  period: z.object({ from: isoDateSchema, to: isoDateSchema }),
  transactionId: z.string().max(200).optional(),
  processedAt: isoDateSchema.optional(),
  metadata: metadataSchema.default({}),
});

export const marketplaceExportSchema = z.object({
  marketplaceId: idSchema,
  format: z.enum(["csv", "json", "pdf"]),
  includeTransactions: z.boolean().default(true),
  includeReviews: z.boolean().default(false),
  includeAnalytics: z.boolean().default(false),
  dateRange: z.object({ from: isoDateSchema, to: isoDateSchema }).optional(),
});

export const marketplaceImportSchema = z.object({
  fileUrl: urlSchema,
  format: z.enum(["csv", "json"]),
  marketplaceId: idSchema,
  overwrite: z.boolean().default(false),
});

export const marketplaceSettingsSchema = z.object({
  marketplaceId: idSchema,
  allowInstantPurchase: z.boolean().default(true),
  allowLicensing: z.boolean().default(false),
  allowSubscriptions: z.boolean().default(true),
  requireApproval: z.boolean().default(false),
  commissionRate: z.number().min(0).max(100).default(10),
  returnPolicy: z.string().max(2000).optional(),
  refundWindowDays: z.number().int().min(0).default(30),
  minPayoutAmount: z.number().min(0).default(50),
  payoutSchedule: z.enum(["weekly", "biweekly", "monthly"]).default("monthly"),
  autoApprove: z.boolean().default(false),
  notificationEmail: emailSchema.optional(),
});

export const marketplacePrivacySchema = z.object({
  marketplaceId: idSchema,
  visibility: visibilityEnum,
  showSales: z.boolean().default(true),
  showPublisherInfo: z.boolean().default(true),
  showRatings: z.boolean().default(true),
  allowIndexing: z.boolean().default(true),
});

export const marketplaceAccessibilitySchema = z.object({
  marketplaceId: idSchema,
  hasAltText: z.boolean().default(false),
  hasTranscript: z.boolean().default(false),
  hasCaption: z.boolean().default(false),
  screenReaderFriendly: z.boolean().default(true),
  keyboardNavigation: z.boolean().default(true),
  highContrast: z.boolean().default(false),
});

export const marketplaceLocalizationSchema = z.object({
  marketplaceId: idSchema,
  defaultLocale: localeSchema,
  supportedLocales: z.array(localeSchema).min(1),
  translations: z.record(
    localeSchema,
    z.object({
      name: z.string().min(1),
      description: z.string().optional(),
    })
  ),
});

export const marketplaceMetadataSchema = z.object({
  marketplaceId: idSchema,
  customFields: z.record(z.string(), z.unknown()).default({}),
  seoData: z
    .object({
      metaTitle: z.string().max(70).optional(),
      metaDescription: z.string().max(160).optional(),
      keywords: z.array(z.string().max(50)).max(20).optional(),
    })
    .optional(),
  socialLinks: z
    .object({
      website: urlSchema.optional(),
      twitter: urlSchema.optional(),
      linkedin: urlSchema.optional(),
      youtube: urlSchema.optional(),
    })
    .optional(),
});

export const marketplaceSEOConfigSchema = z.object({
  marketplaceId: idSchema,
  metaTitle: z.string().min(1).max(70),
  metaDescription: z.string().min(1).max(160),
  keywords: z.array(z.string().min(1).max(50)).max(20).default([]),
  canonicalUrl: urlSchema.optional(),
  ogTitle: z.string().max(100).optional(),
  ogDescription: z.string().max(300).optional(),
  ogImage: urlSchema.optional(),
  noIndex: z.boolean().default(false),
});

export const marketplacePricingSchema = z.object({
  marketplaceId: idSchema,
  currency: z.string().length(3).default("USD"),
  taxRate: z.number().min(0).max(100).default(0),
  taxIncluded: z.boolean().default(false),
  allowDiscounts: z.boolean().default(true),
  allowCoupons: z.boolean().default(true),
  minPrice: z.number().min(0).default(0),
  maxPrice: z.number().min(0).optional(),
  paymentMethods: z.array(z.enum(["credit_card", "paypal", "stripe", "bank_transfer"])).default(["credit_card", "paypal"]),
});

export const marketplaceBundleSchema = z.object({
  marketplaceId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  itemIds: z.array(idSchema).min(2).max(50),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional(),
  thumbnail: urlSchema.optional(),
  isActive: z.boolean().default(true),
  maxPurchases: z.number().int().min(1).optional(),
  validUntil: isoDateSchema.optional(),
});

export const marketplaceSubscriptionSchema = z.object({
  marketplaceId: idSchema,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  interval: z.enum(["monthly", "quarterly", "annual"]),
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  trialDays: z.number().int().min(0).default(0),
  maxUsers: z.number().int().min(1).optional(),
  features: z.array(z.string().max(200)).default([]),
  includedItemIds: z.array(idSchema).default([]),
  isActive: z.boolean().default(true),
});


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Barrel Export
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const schemas = {
  // Course Management
  createCourseSchema,
  updateCourseSchema,
  courseQuerySchema,
  courseFilterSchema,
  createModuleSchema,
  updateModuleSchema,
  createLessonSchema,
  updateLessonSchema,
  createChapterSchema,
  updateChapterSchema,
  createUnitSchema,
  updateUnitSchema,
  createTopicSchema,
  updateTopicSchema,
  courseVersionSchema,
  courseArchiveSchema,
  coursePublishSchema,
  courseDuplicationSchema,
  courseTemplateSchema,
  courseWorkflowSchema,
  courseEnrollmentSchema,
  courseCompletionSchema,
  coursePrerequisiteSchema,
  courseTagSchema,
  courseReviewSchema,
  courseSearchSchema,
  courseImportSchema,
  courseExportSchema,
  courseBulkUpdateSchema,
  courseBulkDeleteSchema,
  courseCategorySchema,
  courseCategoryCreateSchema,
  courseCategoryUpdateSchema,
  courseCategoryQuerySchema,
  moduleReorderSchema,
  lessonReorderSchema,
  moduleCompletionSchema,
  lessonCompletionSchema,
  courseAnalyticsSchema,
  courseCertificateSchema,
  courseCompletionCriteriaSchema,
  coursePrerequisiteCheckSchema,
  courseShareSchema,
  courseBookmarkSchema,
  courseFavoriteSchema,
  courseRatingSchema,
  courseRecommendationSchema,
  courseProgressSchema,
  courseTimelineSchema,
  courseSyllabusSchema,
  courseSettingsSchema,
  coursePrivacySchema,
  courseAccessibilitySchema,
  courseLocalizationSchema,
  courseMetadataSchema,
  courseSEOConfigSchema,
  coursePricingSchema,
  courseDiscountSchema,
  courseBundleSchema,
  courseSubscriptionSchema,

  // Digital Content
  videoUploadSchema,
  videoUpdateSchema,
  videoQuerySchema,
  audioUploadSchema,
  audioUpdateSchema,
  pdfUploadSchema,
  pdfAnnotationSchema,
  presentationUploadSchema,
  imageUploadSchema,
  interactiveContentSchema,
  scormImportSchema,
  scormExportSchema,
  xapiStatementSchema,
  xapiQuerySchema,
  h5pImportSchema,
  h5pExportSchema,
  epubImportSchema,
  epubAnnotationSchema,
  zipPackageSchema,
  streamingConfigSchema,
  offlinePackageSchema,
  contentMetadataSchema,
  contentVersionSchema,
  contentTagSchema,
  contentCategorySchema,
  contentSearchSchema,
  contentLicenseSchema,
  contentRightsSchema,
  contentModerationSchema,
  contentBulkUploadSchema,
  contentBulkDeleteSchema,
  contentBulkUpdateSchema,
  contentAnalyticsSchema,
  contentDownloadSchema,
  contentShareSchema,
  contentBookmarkSchema,
  contentFavoriteSchema,
  contentReportSchema,
  contentFeedbackSchema,
  contentRatingSchema,
  contentRecommendationSchema,
  contentAccessibilitySchema,
  contentLocalizationSchema,
  contentSEOConfigSchema,
  contentPricingSchema,
  contentPreviewSchema,
  contentTranscodeSchema,
  contentEncodeSchema,
  contentCompressSchema,

  // Learning Paths
  createLearningPathSchema,
  updateLearningPathSchema,
  learningPathQuerySchema,
  learningPathFilterSchema,
  learningPathModuleSchema,
  learningPathPrerequisiteSchema,
  adaptivePathSchema,
  personalizedPathSchema,
  competencyPathSchema,
  pathCertificationSchema,
  aiRecommendedPathSchema,
  pathEnrollmentSchema,
  pathProgressSchema,
  pathCompletionSchema,
  pathDuplicateSchema,
  pathTemplateSchema,
  pathAnalyticsSchema,
  pathExportSchema,
  pathImportSchema,
  pathVersionSchema,
  pathPublishSchema,
  pathArchiveSchema,
  pathRestoreSchema,
  pathShareSchema,
  pathBookmarkSchema,
  pathFavoriteSchema,
  pathRatingSchema,
  pathRecommendationSchema,
  pathProgressReportSchema,
  pathTimelineSchema,
  pathSyllabusSchema,
  pathSettingsSchema,
  pathPrivacySchema,
  pathAccessibilitySchema,
  pathLocalizationSchema,
  pathMetadataSchema,
  pathSEOConfigSchema,
  pathPricingSchema,
  pathBundleSchema,
  pathSubscriptionSchema,

  // Assignments
  createAssignmentSchema,
  updateAssignmentSchema,
  assignmentQuerySchema,
  assignmentFilterSchema,
  createHomeworkSchema,
  updateHomeworkSchema,
  createProjectSchema,
  updateProjectSchema,
  createCaseStudySchema,
  updateCaseStudySchema,
  createLabWorkSchema,
  updateLabWorkSchema,
  createPortfolioSchema,
  updatePortfolioSchema,
  createRubricSchema,
  updateRubricSchema,
  createPeerReviewSchema,
  updatePeerReviewSchema,
  peerReviewCompleteSchema,
  createGroupAssignmentSchema,
  updateGroupAssignmentSchema,
  createSubmissionSchema,
  updateSubmissionSchema,
  submissionGradeSchema,
  submissionFeedbackSchema,
  latePolicySchema,
  latePenaltySchema,
  assignmentPublishSchema,
  assignmentAnalyticsSchema,
  assignmentExportSchema,
  assignmentImportSchema,
  assignmentBulkUpdateSchema,
  assignmentBulkDeleteSchema,
  assignmentDuplicateSchema,
  assignmentTemplateSchema,
  assignmentSettingsSchema,
  assignmentPrivacySchema,
  assignmentAccessibilitySchema,
  assignmentLocalizationSchema,
  assignmentMetadataSchema,
  assignmentReminderSchema,
  assignmentExtensionSchema,
  assignmentResubmitSchema,
  assignmentDraftSchema,
  assignmentArchiveSchema,
  assignmentCompletionCriteriaSchema,
  assignmentRubricSchema,
  assignmentPeerReviewConfigSchema,
  assignmentGroupConfigSchema,

  // Quizzes
  createQuizSchema,
  updateQuizSchema,
  quizQuerySchema,
  quizFilterSchema,
  createQuestionSchema,
  updateQuestionSchema,
  questionOptionSchema,
  questionBankSchema,
  questionImportSchema,
  questionExportSchema,
  randomizationSchema,
  adaptiveTestSchema,
  practiceExamSchema,
  timedExamSchema,
  autoGradingSchema,
  manualGradingSchema,
  quizFeedbackSchema,
  retakeRuleSchema,
  quizAttemptSchema,
  quizAnswerSchema,
  quizDuplicateSchema,
  quizTemplateSchema,
  quizAnalyticsSchema,
  quizImportSchema,
  quizExportSchema,
  questionPoolSchema,
  questionCategorySchema,
  quizLockSchema,
  quizUnlockSchema,
  quizPublishSchema,
  quizStartSchema,
  quizSubmitSchema,
  quizGradeSchema,
  quizCertificateSchema,
  quizSettingsSchema,
  quizPrivacySchema,
  quizAccessibilitySchema,
  quizLocalizationSchema,
  quizMetadataSchema,
  quizReminderSchema,
  quizExtensionSchema,
  quizResubmitSchema,
  quizDraftSchema,
  quizArchiveSchema,
  quizCompletionCriteriaSchema,
  quizRubricSchema,
  quizPeerReviewConfigSchema,
  quizGroupConfigSchema,
  quizBulkUpdateSchema,
  quizBulkDeleteSchema,

  // Certifications
  createCertificateSchema,
  updateCertificateSchema,
  certificateQuerySchema,
  certificateFilterSchema,
  createBadgeSchema,
  updateBadgeSchema,
  badgeAwardSchema,
  createMicroCredentialSchema,
  updateMicroCredentialSchema,
  createCompetencySchema,
  updateCompetencySchema,
  competencyAssessSchema,
  createSkillSchema,
  updateSkillSchema,
  skillAssessSchema,
  verificationSchema,
  blockchainVerificationSchema,
  qrVerificationSchema,
  expirationSchema,
  renewalSchema,
  certificateRevokeSchema,
  certificateVerifySchema,
  certificateRenewSchema,
  badgeRevokeSchema,
  badgeVerifySchema,
  microCredentialAwardSchema,
  competencyFrameworkSchema,
  skillTaxonomySchema,
  skillGapSchema,
  certificationPathSchema,
  certificationRequirementsSchema,
  certificationRenewalSchema,
  certificationExpirationSchema,
  certificationTransferSchema,
  certificationShareSchema,
  certificationExportSchema,
  certificationImportSchema,
  certificationAnalyticsSchema,
  certificationBulkCreateSchema,
  certificationBulkRevokeSchema,

  // Live Learning
  createLiveSessionSchema,
  updateLiveSessionSchema,
  liveSessionQuerySchema,
  liveSessionFilterSchema,
  createVirtualClassroomSchema,
  updateVirtualClassroomSchema,
  createRecordingSchema,
  updateRecordingSchema,
  attendanceSchema,
  whiteboardSchema,
  breakoutRoomSchema,
  pollSchema,
  pollVoteSchema,
  qaMessageSchema,
  screenShareSchema,
  liveChatSchema,
  liveAnnotationSchema,
  liveSessionAnalyticsSchema,
  liveSessionExportSchema,
  liveSessionImportSchema,
  liveSessionTemplateSchema,
  liveSessionSettingsSchema,
  liveSessionPrivacySchema,
  liveSessionAccessibilitySchema,
  liveSessionLocalizationSchema,
  liveSessionMetadataSchema,
  liveSessionReminderSchema,
  liveSessionExtensionSchema,
  liveSessionArchiveSchema,

  // Social Learning
  createForumSchema,
  updateForumSchema,
  forumQuerySchema,
  forumFilterSchema,
  createForumPostSchema,
  updateForumPostSchema,
  forumCommentSchema,
  createCommunitySchema,
  updateCommunitySchema,
  communityMemberSchema,
  createGroupSchema,
  updateGroupSchema,
  groupMemberSchema,
  createMentoringSchema,
  updateMentoringSchema,
  mentoringSessionSchema,
  createStudyGroupSchema,
  updateStudyGroupSchema,
  studyGroupMemberSchema,
  knowledgeShareSchema,
  bookmarkSchema,
  likeSchema,
  commentSchema,
  reactionSchema,
  discussionThreadSchema,
  forumModerationSchema,
  forumGamificationSchema,
  forumAnalyticsSchema,
  communityAnalyticsSchema,
  groupAnalyticsSchema,
  mentoringAnalyticsSchema,
  studyGroupAnalyticsSchema,
  knowledgeShareAnalyticsSchema,
  forumExportSchema,
  communityExportSchema,
  groupExportSchema,
  mentoringExportSchema,
  studyGroupExportSchema,
  forumImportSchema,
  communityImportSchema,

  // Analytics
  progressSchema,
  progressQuerySchema,
  completionSchema,
  completionQuerySchema,
  engagementSchema,
  engagementQuerySchema,
  dropoutRiskSchema,
  learningTimeSchema,
  heatmapSchema,
  competencyAnalyticsSchema,
  skillGapAnalysisSchema,
  learningRecommendationSchema,
  progressReportSchema,
  engagementReportSchema,
  analyticsExportSchema,
  analyticsImportSchema,
  analyticsDashboardSchema,
  analyticsWidgetCreateSchema,
  analyticsWidgetUpdateSchema,
  analyticsAlertSchema,
  analyticsScheduleSchema,
  analyticsFilterSchema,
  analyticsAggregationSchema,
  analyticsVisualizationSchema,
  analyticsShareSchema,
  analyticsBookmarkSchema,
  analyticsFavoriteSchema,
  analyticsFeedbackSchema,
  analyticsRatingSchema,
  analyticsRecommendationSchema,
  analyticsInsightSchema,

  // Gamification
  pointsSchema,
  pointsAwardSchema,
  xpSchema,
  xpAwardSchema,
  levelSchema,
  levelUpdateSchema,
  achievementSchema,
  achievementAwardSchema,
  badgeAward2Schema,
  leaderboardSchema,
  leaderboardEntrySchema,
  leaderboardUpdateSchema,
  challengeSchema,
  challengeCreateSchema,
  challengeCompleteSchema,
  rewardSchema,
  rewardRedeemSchema,
  dailyGoalSchema,
  streakSchema,
  streakCreateSchema,
  gamificationConfigSchema,
  gamificationAnalyticsSchema,
  gamificationExportSchema,
  gamificationImportSchema,
  gamificationSettingsSchema,
  gamificationPrivacySchema,
  gamificationAccessibilitySchema,
  gamificationLocalizationSchema,
  gamificationMetadataSchema,
  gamificationReminderSchema,

  // Marketplace
  createMarketplaceSchema,
  updateMarketplaceSchema,
  marketplaceQuerySchema,
  marketplaceFilterSchema,
  createMarketplaceTemplateSchema,
  updateMarketplaceTemplateSchema,
  premiumContentSchema,
  publisherAccountSchema,
  publisherApplicationSchema,
  reviewSchema,
  ratingSchema,
  licenseSchema,
  licenseCreateSchema,
  revenueShareSchema,
  revenueShareCreateSchema,
  marketplaceAnalyticsSchema,
  marketplaceTransactionSchema,
  marketplacePayoutSchema,
  marketplaceExportSchema,
  marketplaceImportSchema,
  marketplaceSettingsSchema,
  marketplacePrivacySchema,
  marketplaceAccessibilitySchema,
  marketplaceLocalizationSchema,
  marketplaceMetadataSchema,
  marketplaceSEOConfigSchema,
  marketplacePricingSchema,
  marketplaceBundleSchema,
  marketplaceSubscriptionSchema,
} as const;

