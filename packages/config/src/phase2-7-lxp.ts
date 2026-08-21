/**
 * Phase 2.7 – LXP (Learning Experience Platform) Configuration
 * EduCI Platform – 75 configuration sections
 */

// ============================================================================
// 1. LXP_GENERAL_CONFIG
// ============================================================================

export const LXP_GENERAL_CONFIG = {
  enabled: true,
  version: "2.7.0" as const,
  language: "fr" as const,
  maxConcurrentUsers: 10000,
  sessionTimeout: 1800,
  idleWarningTimeout: 300,
  maxSessionsPerUser: 1,
  features: {
    courseCatalog: true,
    courseBuilder: true,
    liveSessions: true,
    gamification: true,
    marketplace: true,
    analytics: true,
    certifications: true,
    aiRecommendations: true,
    offlineMode: false,
  },
  maintenanceMode: false,
  maintenanceMessage: "Le système est en maintenance. Veuillez réessayer plus tard.",
} as const;

export type LxpGeneralConfig = typeof LXP_GENERAL_CONFIG;

// ============================================================================
// 2. LXP_COURSE_CATALOG_CONFIG
// ============================================================================

export const LXP_COURSE_CATALOG_CONFIG = {
  enabled: true,
  maxCourses: 50000,
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
    pageSizeOptions: [10, 20, 50, 100] as const,
  },
  search: {
    enabled: true,
    minQueryLength: 2,
    maxQueryLength: 200,
    fuzzySearch: true,
    fuzzyThreshold: 0.7,
    searchFields: ["title", "description", "tags", "instructor", "category"] as const,
  },
  filtering: {
    categories: true,
    levels: true,
    languages: true,
    duration: true,
    rating: true,
    price: true,
    format: true,
    maxActiveFilters: 5,
  },
  sorting: {
    defaultSort: "relevance" as const,
    options: ["relevance", "title", "date", "rating", "popularity", "price"] as const,
  },
  display: {
    viewModes: ["grid", "list"] as const,
    defaultView: "grid" as const,
    showThumbnails: true,
    showRating: true,
    showEnrollmentCount: true,
    showDuration: true,
    showPrice: true,
  },
} as const;

export type LxpCourseCatalogConfig = typeof LXP_COURSE_CATALOG_CONFIG;

// ============================================================================
// 3. LXP_COURSE_BUILDER_CONFIG
// ============================================================================

export const LXP_COURSE_BUILDER_CONFIG = {
  enabled: true,
  maxModulesPerCourse: 50,
  maxLessonsPerModule: 30,
  maxChaptersPerLesson: 20,
  maxUnitsPerChapter: 10,
  maxContentBlocksPerUnit: 25,
  maxFileSize: 524288000,
  supportedMediaTypes: [
    "video/mp4",
    "video/webm",
    "audio/mpeg",
    "audio/wav",
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/svg+xml",
  ] as const,
  editor: {
    enableRichText: true,
    enableCodeHighlighting: true,
    enableMathRendering: true,
    enableMermaidDiagrams: true,
    enableMarkdownShortcuts: true,
    autoSaveInterval: 30000,
    maxUndoSteps: 100,
  },
  collaboration: {
    enabled: true,
    maxEditorsPerCourse: 10,
    realTimeSync: true,
    conflictResolution: "last-write-wins" as const,
  },
  preview: {
    enabled: true,
    responsivePreview: true,
    devicePresets: ["desktop", "tablet", "mobile"] as const,
  },
} as const;

export type LxpCourseBuilderConfig = typeof LXP_COURSE_BUILDER_CONFIG;

// ============================================================================
// 4. LXP_MODULE_CONFIG
// ============================================================================

export const LXP_MODULE_CONFIG = {
  enabled: true,
  moduleTypes: [
    "theory",
    "practice",
    "assessment",
    "project",
    "discussion",
    "lab",
    "review",
  ] as const,
  ordering: {
    allowedMethods: ["manual", "alphabetical", "chronological", "difficulty"] as const,
    defaultMethod: "manual" as const,
    allowReorder: true,
  },
  prerequisites: {
    enabled: true,
    allowMultiple: true,
    enforceSequential: false,
    prerequisiteTypes: ["module", "course", "competency", "skill"] as const,
  },
  completionCriteria: {
    requireAllLessons: true,
    requireMinimumScore: false,
    minimumScore: 70,
    requireTimeSpent: false,
    minimumTimeMinutes: 30,
    requireInteraction: true,
    completionMessage: "Module terminé avec succès !",
  },
  display: {
    showProgress: true,
    showEstimatedDuration: true,
    showDifficultyLevel: true,
    showPrerequisites: true,
  },
} as const;

export type LxpModuleConfig = typeof LXP_MODULE_CONFIG;

// ============================================================================
// 5. LXP_LESSON_CONFIG
// ============================================================================

export const LXP_LESSON_CONFIG = {
  enabled: true,
  lessonTypes: [
    "video",
    "text",
    "interactive",
    "quiz",
    "assignment",
    "discussion",
    "live",
    "scorm",
    "h5p",
  ] as const,
  duration: {
    minMinutes: 5,
    maxMinutes: 180,
    defaultMinutes: 30,
    estimateFromContent: true,
  },
  completion: {
    requireAllChapters: true,
    requireMinimumTime: false,
    minimumTimePercent: 80,
    requireInteraction: true,
    allowManualCompletion: false,
  },
  passFail: {
    enabled: true,
    passingScore: 70,
    allowRetake: true,
    maxRetakes: 3,
    retakeDelayMinutes: 5,
    showCorrectAnswers: true,
    showExplanations: true,
  },
  navigation: {
    allowBackward: true,
    allowSkip: false,
    requireSequentialCompletion: false,
    autoAdvance: false,
    showProgressBar: true,
  },
  bookmarks: {
    enabled: true,
    maxBookmarksPerLesson: 50,
    allowNotes: true,
  },
} as const;

export type LxpLessonConfig = typeof LXP_LESSON_CONFIG;

// ============================================================================
// 6. LXP_CHAPTER_CONFIG
// ============================================================================

export const LXP_CHAPTER_CONFIG = {
  enabled: true,
  chapterStructure: {
    minWidth: 1,
    maxWidth: 100,
    allowNested: true,
    maxDepth: 3,
  },
  navigation: {
    allowNonLinear: false,
    showTableOfContents: true,
    highlightCurrent: true,
    showEstimatedTime: true,
  },
  progressTracking: {
    trackReadingTime: true,
    trackScrollPosition: true,
    trackInteractions: true,
    saveProgressInterval: 15000,
    resumeFromLastPosition: true,
  },
  display: {
    showChapterNumbers: true,
    showChapterTitle: true,
    showProgressPercentage: true,
    showCompletionStatus: true,
  },
  contentLimits: {
    maxTextLength: 500000,
    maxImages: 100,
    maxEmbeds: 20,
    maxInteractiveElements: 30,
  },
} as const;

export type LxpChapterConfig = typeof LXP_CHAPTER_CONFIG;

// ============================================================================
// 7. LXP_UNIT_CONFIG
// ============================================================================

export const LXP_UNIT_CONFIG = {
  enabled: true,
  unitTypes: [
    "text",
    "video",
    "audio",
    "image",
    "quiz",
    "interactive",
    "document",
    "embed",
  ] as const,
  contentLimits: {
    maxTextLength: 100000,
    maxFileSize: 104857600,
    maxImages: 50,
    maxVideos: 10,
    maxAudioFiles: 20,
  },
  timeLimits: {
    enabled: false,
    defaultMinutes: 10,
    maxMinutes: 120,
    allowExtension: true,
    extensionMinutes: 5,
    maxExtensions: 2,
  },
  accessibility: {
    requireAltText: true,
    requireTranscripts: true,
    requireCaptions: true,
    requireARIA: true,
    wcagLevel: "AA" as const,
  },
  scoring: {
    enabled: false,
    maxPoints: 100,
    passingPoints: 70,
    allowPartialCredit: true,
  },
} as const;

export type LxpUnitConfig = typeof LXP_UNIT_CONFIG;

// ============================================================================
// 8. LXP_TOPIC_CONFIG
// ============================================================================

export const LXP_TOPIC_CONFIG = {
  enabled: true,
  topicTypes: [
    "subject",
    "skill",
    "competency",
    "standard",
    "tag",
    "category",
  ] as const,
  content: {
    maxTopicsPerCourse: 200,
    allowNestedTopics: true,
    maxNestingDepth: 5,
    allowMultipleParents: true,
  },
  assessmentIntegration: {
    linkToQuestions: true,
    linkToCompetencies: true,
    linkToSkills: true,
    autoTagContent: true,
  },
  taxonomy: {
    enableHierarchy: true,
    maxRootTopics: 100,
    allowAliases: true,
    allowSynonyms: true,
    syncExternalTaxonomy: false,
  },
  display: {
    showTopicTree: true,
    showContentCount: true,
    showRelatedTopics: true,
  },
} as const;

export type LxpTopicConfig = typeof LXP_TOPIC_CONFIG;

// ============================================================================
// 9. LXP_COURSE_VERSIONING_CONFIG
// ============================================================================

export const LXP_COURSE_VERSIONING_CONFIG = {
  enabled: true,
  maxVersions: 50,
  versionComparison: {
    enabled: true,
    diffAlgorithm: "myers" as const,
    showContentDiff: true,
    showMetadataDiff: true,
    showStructureDiff: true,
  },
  rollback: {
    enabled: true,
    confirmBeforeRollback: true,
    createBackupOnRollback: true,
    notifyOnRollback: true,
    rollbackMessage: "Le cours a été restauré à la version précédente.",
  },
  autoVersioning: {
    enabled: true,
    onPublish: true,
    onSignificantChange: true,
    significantChangeThreshold: 10,
  },
  versionNaming: {
    scheme: "semantic" as const,
    prefix: "v",
    autoIncrement: true,
  },
  retention: {
    keepAllVersions: false,
    maxRetentionDays: 365,
    archiveOldVersions: true,
  },
} as const;

export type LxpCourseVersioningConfig = typeof LXP_COURSE_VERSIONING_CONFIG;

// ============================================================================
// 10. LXP_COURSE_ARCHIVE_CONFIG
// ============================================================================

export const LXP_COURSE_ARCHIVE_CONFIG = {
  enabled: true,
  archivePolicies: {
    autoArchiveAfterDays: 90,
    archiveInactiveCourses: true,
    archiveCompletedCourses: false,
    requireConfirmation: true,
  },
  retention: {
    maxArchiveDurationDays: 730,
    autoDeleteAfterDays: 1095,
    preserveAnalytics: true,
    preserveCertificates: true,
  },
  restore: {
    enabled: true,
    allowPartialRestore: true,
    preserveEnrollmentHistory: true,
    preserveGrades: true,
    restoreMessage: "Le cours a été restauré avec succès.",
  },
  notifications: {
    notifyBeforeArchive: true,
    archiveNoticeDays: 30,
    notifyOnArchive: true,
    notifyOnRestore: true,
  },
  storage: {
    compressArchivedContent: true,
    separateStorage: true,
    storagePath: "/archives/courses",
  },
} as const;

export type LxpCourseArchiveConfig = typeof LXP_COURSE_ARCHIVE_CONFIG;

// ============================================================================
// 11. LXP_COURSE_PUBLISH_CONFIG
// ============================================================================

export const LXP_COURSE_PUBLISH_CONFIG = {
  enabled: true,
  publishingWorkflow: {
    enabled: true,
    stages: ["draft", "review", "approved", "scheduled", "published"] as const,
    defaultStage: "draft" as const,
    requireApproval: true,
    approverRoles: ["admin", "instructor_lead", "reviewer"] as const,
    minApprovers: 1,
  },
  approval: {
    allowSelfApproval: false,
    requireComments: false,
    allowConditionalApproval: true,
    approvalMessage: "Le cours a été approuvé pour publication.",
    rejectionMessage: "Le cours nécessite des modifications avant publication.",
  },
  scheduling: {
    enabled: true,
    allowFuturePublish: true,
    maxScheduleDays: 365,
    timezone: "Europe/Paris" as const,
    publishTimeDefault: "00:00" as const,
  },
  notifications: {
    notifyOnSubmit: true,
    notifyOnApproval: true,
    notifyOnRejection: true,
    notifyOnPublish: true,
  },
} as const;

export type LxpCoursePublishConfig = typeof LXP_COURSE_PUBLISH_CONFIG;

// ============================================================================
// 12. LXP_COURSE_DUPLICATION_CONFIG
// ============================================================================

export const LXP_COURSE_DUPLICATION_CONFIG = {
  enabled: true,
  duplicationOptions: {
    copyContent: true,
    copySettings: true,
    copyEnrollments: false,
    copyGrades: false,
    copyDiscussions: false,
    copyAnnouncements: false,
    copyAssignments: true,
    copyAssessments: true,
  },
  contentCopying: {
    deepCopy: true,
    preserveReferences: true,
    generateNewIds: true,
    updateInternalLinks: true,
    copyMediaFiles: true,
    shareMediaByReference: false,
  },
  limits: {
    maxDuplicationsPerDay: 50,
    maxConcurrentDuplications: 5,
    maxCourseSizeForDuplication: 5368709120,
  },
  notifications: {
    notifyOnComplete: true,
    notifyOnFailure: true,
    showProgressInUI: true,
  },
} as const;

export type LxpCourseDuplicationConfig = typeof LXP_COURSE_DUPLICATION_CONFIG;

// ============================================================================
// 13. LXP_COURSE_TEMPLATE_CONFIG
// ============================================================================

export const LXP_COURSE_TEMPLATE_CONFIG = {
  enabled: true,
  templateTypes: [
    "blank",
    "standard",
    "workshop",
    "certification",
    "selfpaced",
    "instructorled",
    "blended",
  ] as const,
  creation: {
    allowFromCourse: true,
    allowFromTemplate: true,
    maxCustomTemplates: 100,
    requireApproval: false,
  },
  sharing: {
    shareWithinOrganization: true,
    sharePublicly: false,
    allowForking: true,
    attributionRequired: true,
  },
  metadata: {
    requireDescription: true,
    requireCategory: true,
    requireThumbnail: false,
    requireObjectives: true,
    maxTags: 20,
  },
  defaults: {
    defaultLanguage: "fr" as const,
    defaultDuration: 40,
    defaultMaxEnrollments: 500,
    defaultCertificateEnabled: false,
  },
} as const;

export type LxpCourseTemplateConfig = typeof LXP_COURSE_TEMPLATE_CONFIG;

// ============================================================================
// 14. LXP_COURSE_WORKFLOW_CONFIG
// ============================================================================

export const LXP_COURSE_WORKFLOW_CONFIG = {
  enabled: true,
  workflowStages: [
    { id: "concept", label: "Concept", color: "#6B7280" as const },
    { id: "development", label: "Développement", color: "#3B82F6" as const },
    { id: "review", label: "Révision", color: "#F59E0B" as const },
    { id: "revision", label: "Révision demandée", color: "#EF4444" as const },
    { id: "approval", label: "Approbation", color: "#8B5CF6" as const },
    { id: "staging", label: "Mise en pré-production", color: "#06B6D4" as const },
    { id: "published", label: "Publié", color: "#10B981" as const },
  ] as const,
  approval: {
    requiredTransitions: ["review", "approval"] as const,
    allowSkipStages: false,
    autoAdvanceOnApproval: true,
    requireJustification: true,
  },
  notification: {
    notifyOnTransition: true,
    notifyAssignees: true,
    emailNotifications: true,
    inAppNotifications: true,
    notificationTemplate: "workflow-transition" as const,
  },
  automation: {
    autoAssignReviewers: true,
    autoRemindStalled: true,
    stalledDaysThreshold: 7,
    autoArchiveRejected: false,
  },
} as const;

export type LxpCourseWorkflowConfig = typeof LXP_COURSE_WORKFLOW_CONFIG;

// ============================================================================
// 15. LXP_VIDEO_CONFIG
// ============================================================================

export const LXP_VIDEO_CONFIG = {
  enabled: true,
  videoFormats: ["mp4", "webm", "mov", "avi", "mkv"] as const,
  maxFileSize: 2147483648,
  maxDuration: 14400,
  minDuration: 5,
  streaming: {
    enabled: true,
    protocols: ["hls", "dash"] as const,
    defaultProtocol: "hls" as const,
    adaptiveBitrate: true,
    maxBitrate: 8000000,
    minBitrate: 500000,
    bufferSize: 30,
  },
  transcoding: {
    enabled: true,
    outputFormats: ["mp4", "webm"] as const,
    qualityPresets: ["1080p", "720p", "480p", "360p"] as const,
    defaultPreset: "720p" as const,
    preserveOriginal: true,
    maxConcurrentJobs: 5,
  },
  player: {
    enablePlaybackSpeed: true,
    enableQualitySelector: true,
    enableCaptions: true,
    enableChapters: true,
    enableNotes: true,
    enablePictureInPicture: true,
    enableFullscreen: true,
    autoPlay: false,
    defaultVolume: 80,
    resumeFromLastPosition: true,
  },
  captions: {
    required: true,
    supportedFormats: ["srt", "vtt", "ttml"] as const,
    autoGenerate: true,
    languages: ["fr", "en"] as const,
  },
  thumbnails: {
    autoGenerate: true,
    customAllowed: true,
    resolution: { width: 1280, height: 720 },
    format: "jpg" as const,
  },
} as const;

export type LxpVideoConfig = typeof LXP_VIDEO_CONFIG;

// ============================================================================
// 16. LXP_AUDIO_CONFIG
// ============================================================================

export const LXP_AUDIO_CONFIG = {
  enabled: true,
  audioFormats: ["mp3", "wav", "ogg", "aac", "flac", "m4a"] as const,
  maxFileSize: 104857600,
  maxDuration: 28800,
  minDuration: 5,
  streaming: {
    enabled: true,
    protocol: "progressive" as const,
    bufferSize: 10,
  },
  quality: {
    defaultBitrate: 128000,
    maxBitrate: 320000,
    sampleRates: [22050, 44100, 48000] as const,
    defaultSampleRate: 44100,
    channels: ["mono", "stereo"] as const,
    defaultChannels: "stereo" as const,
  },
  player: {
    enablePlaybackSpeed: true,
    enableSleepTimer: true,
    enableVisualization: true,
    enableEqualizer: false,
    autoPlay: false,
    defaultVolume: 80,
    resumeFromLastPosition: true,
  },
  transcription: {
    enabled: true,
    autoGenerate: true,
    languages: ["fr", "en"] as const,
    maxFileSize: 52428800,
  },
  podcasts: {
    enabled: true,
    generateRSSFeed: true,
    maxEpisodes: 500,
    supportedDistributions: ["rss", "apple", "spotify"] as const,
  },
} as const;

export type LxpAudioConfig = typeof LXP_AUDIO_CONFIG;

// ============================================================================
// 17. LXP_PDF_CONFIG
// ============================================================================

export const LXP_PDF_CONFIG = {
  enabled: true,
  maxFileSize: 209715200,
  maxPages: 5000,
  rendering: {
    enabled: true,
    engine: "pdfjs" as const,
    scale: 1.0,
    enableTextSelection: true,
    enableSearch: true,
    enablePrint: true,
    enableDownload: true,
  },
  annotation: {
    enabled: true,
    types: ["highlight", "underline", "strikethrough", "note", "freehand", "text", "stamp"] as const,
    allowCollaboration: false,
    maxAnnotationsPerDocument: 200,
    exportFormat: "pdf" as const,
  },
  export: {
    enabled: true,
    formats: ["pdf", "png", "jpg", "txt"] as const,
    preserveFormatting: true,
    includeAnnotations: false,
  },
  forms: {
    enabled: true,
    allowFilling: true,
    allowSigning: false,
    submitFormat: "pdf" as const,
  },
  security: {
    allowPrinting: true,
    allowCopying: true,
    allowEditing: false,
    watermarkEnabled: false,
    watermarkText: "",
  },
} as const;

export type LxpPdfConfig = typeof LXP_PDF_CONFIG;

// ============================================================================
// 18. LXP_SCORM_CONFIG
// ============================================================================

export const LXP_SCORM_CONFIG = {
  enabled: true,
  supportedVersions: ["1.2", "2004-3rd", "2004-4th"] as const,
  import: {
    enabled: true,
    maxPackageSize: 1073741824,
    allowedExtensions: [".zip", ".pif"] as const,
    validateBeforeImport: true,
    autoDetectVersion: true,
  },
  export: {
    enabled: true,
    formats: ["scorm-12", "scorm-2004", "cmi5"] as const,
    includeReports: true,
    includeScoreData: true,
  },
  tracking: {
    trackProgress: true,
    trackCompletion: true,
    trackScore: true,
    trackTime: true,
    trackObjectives: true,
    trackInteractions: true,
    completionThreshold: 0.8,
    suspendDataMaxSize: 64000,
  },
  runtime: {
    launchInNewWindow: false,
    windowWidth: 1024,
    windowHeight: 768,
    allowResize: true,
    showNavigation: true,
  },
} as const;

export type LxpScormConfig = typeof LXP_SCORM_CONFIG;

// ============================================================================
// 19. LXP_XAPI_CONFIG
// ============================================================================

export const LXP_XAPI_CONFIG = {
  enabled: true,
  statements: {
    enabled: true,
    maxBatchSize: 50,
    retentionDays: 365,
    compressionEnabled: true,
  },
  lrs: {
    enabled: true,
    endpoints: [
      {
        name: "Principal",
        url: "https://lrs.educi.fr/xapi",
        version: "1.0.3" as const,
        enabled: true,
      },
    ] as const,
    authMethod: "basic" as const,
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },
  reporting: {
    enabled: true,
    dashboards: ["learner", "instructor", "admin"] as const,
    metrics: [
      "completions",
      "scores",
      "time-spent",
      "interactions",
      "achievements",
    ] as const,
    exportFormats: ["csv", "json", "xlsx"] as const,
  },
  verbs: {
    custom: ["reviewed", "discussed", "collaborated", "mentored"] as const,
    syncStandardVerbs: true,
  },
  activities: {
    activityProfileStorage: true,
    activityStateStorage: true,
    stateMaxSize: 1048576,
  },
} as const;

export type LxpXapiConfig = typeof LXP_XAPI_CONFIG;

// ============================================================================
// 20. LXP_H5P_CONFIG
// ============================================================================

export const LXP_H5P_CONFIG = {
  enabled: true,
  h5pTypes: [
    "course-presentation",
    "interactive-video",
    "branching-scenario",
    "drag-and-drop",
    "fill-in-the-blanks",
    "flashcards",
    "image-hotspots",
    "image-pair",
    "interactive-quiz",
    "mark-the-words",
    "crossword",
    "questionnaire",
  ] as const,
  import: {
    enabled: true,
    maxPackageSize: 52428800,
    allowedExtensions: [".h5p"] as const,
    validateBeforeImport: true,
  },
  export: {
    enabled: true,
    formats: ["h5p", "scorm"] as const,
    includeContent: true,
    includeUserStates: false,
  },
  editor: {
    enabled: true,
    enableCreation: true,
    enableEditing: true,
    maxFileSize: 52428800,
    previewEnabled: true,
  },
  playback: {
    enableFullScreen: true,
    enableEmbed: true,
    embedCode: '<iframe src="{url}" width="100%" height="600" frameborder="0"></iframe>',
    frameIntegration: "standalone" as const,
  },
  storage: {
    useLrs: true,
    storeUserStates: true,
    storeScores: true,
    stateMaxSize: 1048576,
  },
} as const;

export type LxpH5pConfig = typeof LXP_H5P_CONFIG;

// ============================================================================
// 21. LXP_EPUB_CONFIG
// ============================================================================

export const LXP_EPUB_CONFIG = {
  enabled: true,
  supportedVersions: ["2.0", "3.0", "3.1", "3.2"] as const,
  maxFileSize: 104857600,
  rendering: {
    enabled: true,
    engine: "readium" as const,
    enableReflow: true,
    defaultFontSize: 16,
    minFontSize: 10,
    maxFontSize: 32,
    defaultLineHeight: 1.5,
    themes: ["light", "dark", "sepia", "high-contrast"] as const,
    defaultTheme: "light" as const,
  },
  bookmarking: {
    enabled: true,
    maxBookmarks: 500,
    allowNotes: true,
    syncAcrossDevices: true,
  },
  annotation: {
    enabled: true,
    types: ["highlight", "underline", "note", "freehand"] as const,
    colors: ["#FFEB3B", "#FF9800", "#F44336", "#4CAF50", "#2196F3", "#9C27B0"] as const,
    allowExport: true,
    exportFormat: "pdf" as const,
  },
  navigation: {
    tableOfContents: true,
    pageList: true,
    landmarks: true,
    allowSearch: true,
    enablePagination: true,
  },
  accessibility: {
    readAloud: true,
    adjustSpacing: true,
    dyslexiaFont: true,
    screenReaderSupport: true,
  },
} as const;

export type LxpEpubConfig = typeof LXP_EPUB_CONFIG;

// ============================================================================
// 22. LXP_OFFLINE_CONFIG
// ============================================================================

export const LXP_OFFLINE_CONFIG = {
  enabled: false,
  offlinePackages: {
    enabled: true,
    maxPackageSize: 5368709120,
    allowVideoDownload: true,
    allowAudioDownload: true,
    allowDocumentDownload: true,
    compressContent: true,
    compressionLevel: 6,
  },
  sync: {
    enabled: true,
    syncOnReconnect: true,
    conflictResolution: "server-wins" as const,
    maxSyncBatchSize: 100,
    syncProgressIndicator: true,
    syncMessage: "Synchronisation en cours...",
  },
  storage: {
    maxStoragePerUser: 2147483648,
    storageQuotaWarning: 0.8,
    allowExternalStorage: false,
    clearOnLogout: false,
  },
  features: {
    offlineQuizzes: true,
    offlineProgress: true,
    offlineBookmarks: true,
    offlineNotes: true,
    offlineGrading: false,
  },
  notifications: {
    notifySyncComplete: true,
    notifySyncFailed: true,
    notifyStorageWarning: true,
  },
} as const;

export type LxpOfflineConfig = typeof LXP_OFFLINE_CONFIG;

// ============================================================================
// 23. LXP_STREAMING_CONFIG
// ============================================================================

export const LXP_STREAMING_CONFIG = {
  enabled: true,
  protocols: ["hls", "dash", "rtmp", "webrtc"] as const,
  defaultProtocol: "hls" as const,
  quality: {
    enableAdaptiveBitrate: true,
    qualityLevels: [
      { label: "Ultra", bitrate: 8000000, resolution: "1920x1080" as const },
      { label: "Haute", bitrate: 4000000, resolution: "1280x720" as const },
      { label: "Standard", bitrate: 2000000, resolution: "854x480" as const },
      { label: "Économique", bitrate: 1000000, resolution: "640x360" as const },
    ] as const,
    autoSelectQuality: true,
    allowManualOverride: true,
  },
  cdn: {
    enabled: true,
    provider: "cloudfront" as const,
    edgeLocations: ["eu-west-1", "eu-central-1", "us-east-1"] as const,
    cacheTtl: 86400,
    prefetchEnabled: true,
  },
  live: {
    enabled: true,
    maxConcurrentStreams: 100,
    maxViewersPerStream: 5000,
    recordingEnabled: true,
    recordingRetention: 90,
    chatEnabled: true,
    latency: "low" as const,
  },
  analytics: {
    trackBuffering: true,
    trackBitrateChanges: true,
    trackViewDuration: true,
    trackEngagement: true,
  },
} as const;

export type LxpStreamingConfig = typeof LXP_STREAMING_CONFIG;

// ============================================================================
// 24. LXP_CONTENT_METADATA_CONFIG
// ============================================================================

export const LXP_CONTENT_METADATA_CONFIG = {
  enabled: true,
  metadataFields: [
    "title",
    "description",
    "author",
    "language",
    "duration",
    "difficulty",
    "tags",
    "category",
    "version",
    "created-date",
    "modified-date",
    "license",
    "format",
    "size",
    "thumbnails",
  ] as const,
  indexing: {
    enabled: true,
    engine: "elasticsearch" as const,
    indexOnSave: true,
    reindexOnStructureChange: true,
    batchSize: 100,
    maxIndexSize: "2gb" as const,
  },
  search: {
    enableFullTextSearch: true,
    enableFacetedSearch: true,
    enableAutocomplete: true,
    autocompleteMinChars: 2,
    maxSuggestions: 10,
  },
  validation: {
    requireTitle: true,
    titleMaxLength: 200,
    requireDescription: true,
    descriptionMaxLength: 2000,
    requireLanguage: true,
    requireCategory: true,
    requireThumbnail: false,
    validateThumbnailDimensions: true,
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  schema: {
    standard: "dc" as const,
    customFieldsEnabled: true,
    maxCustomFields: 50,
  },
} as const;

export type LxpContentMetadataConfig = typeof LXP_CONTENT_METADATA_CONFIG;

// ============================================================================
// 25. LXP_CONTENT_SEARCH_CONFIG
// ============================================================================

export const LXP_CONTENT_SEARCH_CONFIG = {
  enabled: true,
  engine: {
    type: "elasticsearch" as const,
    host: "localhost",
    port: 9200,
    indexPrefix: "lxp_" as const,
    maxResultsPerQuery: 1000,
    timeout: 10000,
  },
  indexing: {
    fields: [
      "title",
      "description",
      "content",
      "tags",
      "author",
      "category",
    ] as const,
    boostValues: {
      title: 3.0,
      tags: 2.5,
      author: 1.5,
      description: 1.2,
      content: 1.0,
    },
    analyzeContent: true,
    indexMediaMetadata: true,
  },
  suggestions: {
    enabled: true,
    maxSuggestions: 10,
    minQueryLength: 2,
    enableDidYouMean: true,
    enableRelatedSearch: true,
    popularSearches: true,
    recentSearches: true,
  },
  filtering: {
    enableTypeFilter: true,
    enableLanguageFilter: true,
    enableDateFilter: true,
    enableRatingFilter: true,
    enableDifficultyFilter: true,
  },
  performance: {
    enableCaching: true,
    cacheTtl: 300,
    enableQueryOptimization: true,
  },
} as const;

export type LxpContentSearchConfig = typeof LXP_CONTENT_SEARCH_CONFIG;

// ============================================================================
// 26. LXP_LEARNING_PATH_CONFIG
// ============================================================================

export const LXP_LEARNING_PATH_CONFIG = {
  enabled: true,
  pathTypes: [
    "linear",
    "branching",
    "adaptive",
    "competency-based",
    "self-directed",
    "hybrid",
  ] as const,
  prerequisites: {
    enabled: true,
    requireCompletion: true,
    requireMinimumScore: false,
    minimumScore: 70,
    allowWaiver: true,
    waiverApprovalRequired: true,
  },
  adaptive: {
    enabled: true,
    algorithm: "bayesian" as const,
    adjustmentFrequency: "per-lesson" as const,
    factors: ["performance", "time-spent", "engagement", "preferences"] as const,
    difficultyRange: { min: 1, max: 10 },
  },
  structure: {
    maxCourses: 20,
    maxModules: 200,
    allowCourseReuse: true,
    allowParallelPaths: false,
  },
  display: {
    showPathProgress: true,
    showEstimatedDuration: true,
    showNextMilestone: true,
    showSkillProgress: true,
  },
  completion: {
    requireAllCourses: true,
    requireFinalAssessment: false,
    passingScore: 70,
    certificateEnabled: true,
    completionMessage: "Parcours d'apprentissage terminé !",
  },
} as const;

export type LxpLearningPathConfig = typeof LXP_LEARNING_PATH_CONFIG;

// ============================================================================
// 27. LXP_ADAPTIVE_PATH_CONFIG
// ============================================================================

export const LXP_ADAPTIVE_PATH_CONFIG = {
  enabled: true,
  adaptationAlgorithms: [
    "bayesian",
    "item-response-theory",
    "knowledge-tracing",
    "collaborative-filtering",
    "content-based",
    "hybrid",
  ] as const,
  defaultAlgorithm: "bayesian" as const,
  personalization: {
    enabled: true,
    factors: [
      "learning-style",
      "prior-knowledge",
      "engagement-level",
      "time-availability",
      "goals",
    ] as const,
    profileUpdateFrequency: "per-session" as const,
    profilePersistence: true,
  },
  difficulty: {
    autoAdjust: true,
    initialLevel: "intermediate" as const,
    adjustmentRate: 0.1,
    maxAdjustmentPerSession: 2,
    minDifficulty: 1,
    maxDifficulty: 10,
  },
  recommendations: {
    maxRecommendations: 10,
    includeReason: true,
    diversityFactor: 0.3,
    freshnessWeight: 0.2,
  },
  performance: {
    modelRetrainingInterval: 86400,
    minDataPoints: 30,
    confidenceThreshold: 0.7,
  },
} as const;

export type LxpAdaptivePathConfig = typeof LXP_ADAPTIVE_PATH_CONFIG;

// ============================================================================
// 28. LXP_COMPETENCY_PATH_CONFIG
// ============================================================================

export const LXP_COMPETENCY_PATH_CONFIG = {
  enabled: true,
  competencyMapping: {
    enabled: true,
    maxCompetenciesPerCourse: 50,
    levels: ["beginner", "intermediate", "advanced", "expert"] as const,
    requireAssessment: true,
    allowSelfAssessment: true,
    requireInstructorValidation: true,
  },
  skillTracking: {
    enabled: true,
    trackProgress: true,
    trackApplication: true,
    showRadarChart: true,
    showProgressBar: true,
    updateOnCompletion: true,
  },
  frameworks: {
    supportedFrameworks: ["custom", "ESCO", "O*NET", "competency-model"] as const,
    allowImport: true,
    allowExport: true,
    syncExternalSystems: false,
  },
  assessment: {
    assessmentMethods: ["quiz", "project", "portfolio", "observation", "peer"] as const,
    minimumAssessmentsPerCompetency: 2,
    recertificationInterval: 365,
  },
  visualization: {
    showCompetencyMap: true,
    showSkillTree: true,
    showGrowthTimeline: true,
    showGapAnalysis: true,
  },
} as const;

export type LxpCompetencyPathConfig = typeof LXP_COMPETENCY_PATH_CONFIG;

// ============================================================================
// 29. LXP_CERTIFICATION_PATH_CONFIG
// ============================================================================

export const LXP_CERTIFICATION_PATH_CONFIG = {
  enabled: true,
  certificationRequirements: {
    minCourses: 3,
    minCredits: 120,
    minDurationHours: 40,
    requireFinalExam: true,
    passingScore: 75,
    allowRetakes: true,
    maxRetakes: 3,
    retakeWaitingPeriodDays: 30,
  },
  renewal: {
    enabled: true,
    renewalPeriodMonths: 12,
    renewalNoticeDays: 60,
    requireContinuingEducation: true,
    continuingEducationCredits: 20,
    allowGracePeriod: true,
    gracePeriodDays: 30,
  },
  pathways: {
    allowMultiplePaths: true,
    maxPaths: 5,
    allowCrossCertification: true,
    prerequisiteCertifications: [] as readonly string[],
  },
  verification: {
    publicVerification: true,
    verificationUrl: "https://verify.educi.fr" as const,
    includeQRCode: true,
    includeBlockchain: false,
    expiryNotification: true,
    expiryNoticeDays: 90,
  },
} as const;

export type LxpCertificationPathConfig = typeof LXP_CERTIFICATION_PATH_CONFIG;

// ============================================================================
// 30. LXP_AI_RECOMMENDATION_CONFIG
// ============================================================================

export const LXP_AI_RECOMMENDATION_CONFIG = {
  enabled: true,
  aiModel: {
    provider: "openai" as const,
    model: "gpt-4" as const,
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 30000,
  },
  recommendationFrequency: {
    onLogin: true,
    onCourseCompletion: true,
    scheduled: true,
    scheduleInterval: "weekly" as const,
    onSearchQuery: true,
    onBrowsingHistory: true,
  },
  types: [
    "course-recommendation",
    "content-recommendation",
    "path-recommendation",
    "peer-recommendation",
    "skill-recommendation",
  ] as const,
  personalization: {
    trackBehavior: true,
    useDemographics: false,
    useLearningStyle: true,
    usePerformanceHistory: true,
    useEngagementMetrics: true,
  },
  display: {
    maxRecommendations: 10,
    showConfidenceScore: false,
    showReason: true,
    layout: "carousel" as const,
    refreshOnScroll: false,
  },
  privacy: {
    anonymizeData: true,
    optOutAllowed: true,
    dataRetentionDays: 365,
    requireConsent: true,
  },
} as const;

export type LxpAiRecommendationConfig = typeof LXP_AI_RECOMMENDATION_CONFIG;

// ============================================================================
// 31. LXP_ASSIGNMENT_CONFIG
// ============================================================================

export const LXP_ASSIGNMENT_CONFIG = {
  enabled: true,
  assignmentTypes: [
    "essay",
    "file-upload",
    "code-submission",
    "media-upload",
    "url-submission",
    "text-entry",
    "group-project",
    "presentation",
    "peer-review",
  ] as const,
  submission: {
    allowMultipleSubmissions: true,
    maxSubmissions: 5,
    allowLateSubmission: true,
    latePenaltyPercent: 10,
    maxLateDays: 7,
    requireSubmissionConfirmation: true,
    allowedFileTypes: [
      ".pdf",
      ".docx",
      ".xlsx",
      ".pptx",
      ".zip",
      ".rar",
      ".txt",
      ".md",
      ".html",
      ".csv",
    ] as const,
    maxFileSize: 104857600,
    maxFiles: 10,
  },
  grading: {
    gradingScale: "100" as const,
    passingGrade: 70,
    allowPartialCredit: true,
    allowExtraCredit: true,
    maxExtraCredit: 20,
    gradeDisplay: "percentage" as const,
    rubricRequired: false,
    peerGradingEnabled: false,
  },
  feedback: {
    allowInlineComments: true,
    allowAudioFeedback: false,
    allowVideoFeedback: false,
    feedbackTemplates: true,
    maxFeedbackLength: 10000,
    feedbackDeadlineDays: 14,
  },
  notifications: {
    notifyOnSubmission: true,
    notifyOnGrading: true,
    notifyOnFeedback: true,
    notifyBeforeDeadline: true,
    deadlineNoticeHours: 24,
  },
} as const;

export type LxpAssignmentConfig = typeof LXP_ASSIGNMENT_CONFIG;

// ============================================================================
// 32. LXP_HOMEWORK_CONFIG
// ============================================================================

export const LXP_HOMEWORK_CONFIG = {
  enabled: true,
  homeworkTypes: [
    "reading",
    "writing",
    "practice",
    "research",
    "creation",
    "reflection",
    "collaboration",
  ] as const,
  deadlines: {
    enabled: true,
    allowFlexibleDeadlines: true,
    timezone: "Europe/Paris" as const,
    defaultDuration: 7,
    maxDuration: 90,
    allowExtensions: true,
    extensionDays: 3,
    maxExtensions: 2,
  },
  latePolicies: {
    enabled: true,
    penaltyPerDay: 10,
    maxPenalty: 50,
    absoluteDeadlineDays: 14,
    gracePeriodMinutes: 60,
    allowLateWithPenalty: true,
    exemptWeekends: false,
    exemptHolidays: true,
  },
  tracking: {
    trackProgress: true,
    trackTimeSpent: true,
    trackInteractions: true,
    showProgressToStudent: true,
    showProgressToInstructor: true,
  },
  display: {
    showDueDate: true,
    showTimeRemaining: true,
    showEstimatedTime: true,
    showDifficulty: true,
    showRelatedResources: true,
  },
} as const;

export type LxpHomeworkConfig = typeof LXP_HOMEWORK_CONFIG;

// ============================================================================
// 33. LXP_PROJECT_CONFIG
// ============================================================================

export const LXP_PROJECT_CONFIG = {
  enabled: true,
  projectTypes: [
    "individual",
    "group",
    "research",
    "creative",
    "technical",
    "case-study",
    "capstone",
  ] as const,
  milestones: {
    enabled: true,
    maxMilestones: 20,
    requireApproval: true,
    allowPartialSubmission: true,
    trackProgress: true,
  },
  evaluation: {
    evaluationMethods: ["instructor", "peer", "self", "rubric", "portfolio"] as const,
    rubricRequired: true,
    peerReviewRequired: false,
    selfReflectionRequired: true,
    passingScore: 70,
    weightInFinalGrade: 30,
  },
  collaboration: {
    enabled: true,
    maxGroupSize: 10,
    allowGroupFormation: true,
    instructorOverride: true,
    collaborationTools: ["chat", "file-sharing", "version-control"] as const,
  },
  submission: {
    allowIterativeSubmission: true,
    maxIterations: 10,
    requireMilestoneCompletion: true,
    submissionFormats: ["file", "url", "text", "media"] as const,
    maxFileSize: 524288000,
  },
} as const;

export type LxpProjectConfig = typeof LXP_PROJECT_CONFIG;

// ============================================================================
// 34. LXP_CASE_STUDY_CONFIG
// ============================================================================

export const LXP_CASE_STUDY_CONFIG = {
  enabled: true,
  caseStudyTemplates: [
    "analysis",
    "decision-making",
    "problem-solving",
    "ethical-dilemma",
    "real-world",
    "simulation",
    "comparative",
  ] as const,
  evaluationCriteria: {
    enabled: true,
    criteria: [
      "analysis-quality",
      "critical-thinking",
      "solution-feasibility",
      "evidence-support",
      "communication",
      "creativity",
    ] as const,
    maxCriteria: 10,
    requireRubric: true,
    allowCustomCriteria: true,
  },
  content: {
    maxTextLength: 100000,
    maxAttachments: 20,
    maxFileSize: 104857600,
    allowMultimedia: true,
    allowExternalLinks: true,
  },
  discussion: {
    enabled: true,
    anonymousOption: false,
    instructorModeration: true,
    requireSubstantivePosts: true,
    minPostLength: 100,
  },
  submission: {
    formats: ["text", "file", "presentation"] as const,
    allowCollaboration: false,
    requireCitations: true,
    citationStyle: "APA" as const,
  },
} as const;

export type LxpCaseStudyConfig = typeof LXP_CASE_STUDY_CONFIG;

// ============================================================================
// 35. LXP_LAB_WORK_CONFIG
// ============================================================================

export const LXP_LAB_WORK_CONFIG = {
  enabled: true,
  labEnvironments: {
    types: ["virtual-machine", "container", "cloud-ide", "simulation"] as const,
    defaultType: "container" as const,
    maxConcurrentLabs: 50,
    maxDuration: 480,
    idleTimeout: 30,
    autoSaveInterval: 300,
  },
  tools: {
    preInstalledTools: [
      "git",
      "nodejs",
      "python",
      "docker",
      "mysql",
      "nginx",
    ] as const,
    allowCustomInstall: true,
    maxStoragePerLab: 1073741824,
    maxMemoryPerLab: 4294967296,
    maxCpuPerLab: 2,
  },
  assessment: {
    autoGrading: true,
    rubricRequired: true,
    requireLabReport: true,
    reportFormats: ["pdf", "markdown"] as const,
    submissionDeadline: true,
    latePolicyEnabled: true,
  },
  monitoring: {
    trackActivity: true,
    trackResourceUsage: true,
    screenshotsEnabled: false,
    alertOnSuspiciousActivity: true,
  },
  security: {
    isolateLabs: true,
    restrictInternet: false,
    allowFileUpload: true,
    allowFileDownload: true,
    scanForMalware: true,
  },
} as const;

export type LxpLabWorkConfig = typeof LXP_LAB_WORK_CONFIG;

// ============================================================================
// 36. LXP_PORTFOLIO_CONFIG
// ============================================================================

export const LXP_PORTFOLIO_CONFIG = {
  enabled: true,
  portfolioTypes: [
    "showcase",
    "reflective",
    "progress",
    "assessment",
    "career",
    "course-specific",
  ] as const,
  presentation: {
    enabled: true,
    themes: ["minimal", "professional", "creative", "academic"] as const,
    defaultTheme: "professional" as const,
    customCssEnabled: true,
    responsiveDesign: true,
    publicSharing: true,
    customDomain: false,
  },
  evaluation: {
    enabled: true,
    evaluationMethods: ["instructor", "peer", "self"] as const,
    rubricRequired: true,
    criteria: ["completeness", "quality", "reflection", "growth", "presentation"] as const,
    passingScore: 70,
  },
  content: {
    maxItems: 100,
    maxFileSize: 209715200,
    supportedTypes: ["file", "text", "image", "video", "audio", "link", "embed"] as const,
    allowComments: true,
    allowVersioning: true,
  },
  sharing: {
    publicUrl: true,
    passwordProtected: true,
    expirationEnabled: true,
    downloadEnabled: true,
    embedEnabled: true,
  },
} as const;

export type LxpPortfolioConfig = typeof LXP_PORTFOLIO_CONFIG;

// ============================================================================
// 37. LXP_RUBRIC_CONFIG
// ============================================================================

export const LXP_RUBRIC_CONFIG = {
  enabled: true,
  rubricTypes: [
    "analytic",
    "holistic",
    "single-point",
    "checklist",
    "weighted",
  ] as const,
  criteria: {
    maxCriteria: 20,
    maxLevelsPerCriterion: 6,
    allowCustomCriteria: true,
    requireDescriptions: true,
    descriptionMaxLength: 500,
  },
  levels: {
    defaultLevels: ["Excellente", "Bonne", "Suffisante", "Insuffisante"] as const,
    defaultLevelCount: 4,
    allowCustomLevels: true,
    requireLevelDescriptions: true,
  },
  scoring: {
    pointRange: { min: 0, max: 100 },
    allowZeroPoints: true,
    allowHalfPoints: false,
    calculateWeightedAverage: true,
    exportWithGrades: true,
  },
  sharing: {
    shareWithinOrganization: true,
    sharePublicly: false,
    allowForking: true,
    templateLibrary: true,
  },
  analytics: {
    trackUsage: true,
    trackScoreDistribution: true,
    showCriteriaAnalysis: true,
    exportAnalytics: true,
  },
} as const;

export type LxpRubricConfig = typeof LXP_RUBRIC_CONFIG;

// ============================================================================
// 38. LXP_PEER_REVIEW_CONFIG
// ============================================================================

export const LXP_PEER_REVIEW_CONFIG = {
  enabled: true,
  reviewMatching: {
    algorithm: "random" as const,
    matchBySkill: false,
    matchByPerformance: false,
    avoidConflicts: true,
    minReviewsPerSubmission: 2,
    maxReviewsPerSubmission: 5,
    balancedDistribution: true,
  },
  anonymity: {
    enabled: true,
    anonymousToReviewer: true,
    anonymousToAuthor: true,
    instructorCanReveal: true,
    revealAfterGrading: true,
  },
  criteria: {
    useRubric: true,
    rubricRequired: true,
    allowCustomCriteria: true,
    minCriteria: 1,
    maxCriteria: 15,
  },
  process: {
    reviewPeriodDays: 7,
    allowSelfReview: false,
    requireWrittenFeedback: true,
    minFeedbackLength: 50,
    allowFollowUpQuestions: true,
    allowRebuttal: true,
  },
  quality: {
    calibrateReviews: true,
    flagLowQuality: true,
    minQualityScore: 0.6,
    instructorOverride: true,
  },
} as const;

export type LxpPeerReviewConfig = typeof LXP_PEER_REVIEW_CONFIG;

// ============================================================================
// 39. LXP_GROUP_ASSIGNMENT_CONFIG
// ============================================================================

export const LXP_GROUP_ASSIGNMENT_CONFIG = {
  enabled: true,
  groupFormation: {
    methods: ["manual", "random", "skill-based", "preference", "instructor"] as const,
    defaultMethod: "manual" as const,
    minGroupSize: 2,
    maxGroupSize: 10,
    allowSelfSelection: true,
    instructorCanModify: true,
    balanceBySkill: false,
  },
  collaboration: {
    enabled: true,
    tools: ["chat", "file-sharing", "whiteboard", "discussion", "task-board"] as const,
    sharedWorkspace: true,
    taskAllocation: true,
    progressTracking: true,
    conflictResolution: true,
  },
  grading: {
    gradingMethods: ["group", "individual", "combined"] as const,
    defaultMethod: "group" as const,
    peerEvaluation: true,
    peerEvaluationWeight: 20,
    individualContribution: true,
    contributionWeight: 30,
  },
  communication: {
    groupChat: true,
    groupEmail: true,
    announcements: true,
    instructorAccess: true,
  },
  limits: {
    maxGroupsPerCourse: 100,
    maxMembersPerGroup: 15,
    allowCrossCourseGroups: false,
    groupPersistence: "course" as const,
  },
} as const;

export type LxpGroupAssignmentConfig = typeof LXP_GROUP_ASSIGNMENT_CONFIG;

// ============================================================================
// 40. LXP_SUBMISSION_CONFIG
// ============================================================================

export const LXP_SUBMISSION_CONFIG = {
  enabled: true,
  submissionTypes: [
    "file",
    "text",
    "url",
    "media",
    "code",
    "dataset",
    "presentation",
  ] as const,
  fileLimits: {
    maxFileSize: 104857600,
    maxTotalSize: 524288000,
    maxFiles: 20,
    allowedExtensions: [
      ".pdf", ".docx", ".xlsx", ".pptx", ".zip", ".rar",
      ".txt", ".md", ".html", ".csv", ".json", ".xml",
      ".py", ".js", ".ts", ".java", ".cpp", ".c",
      ".png", ".jpg", ".jpeg", ".gif", ".svg",
    ] as const,
    scanForViruses: true,
    generateThumbnails: true,
  },
  history: {
    keepAllSubmissions: true,
    maxSubmissions: 20,
    showPreviousSubmissions: true,
    allowSubmissionDeletion: false,
    trackModificationTime: true,
  },
  processing: {
    autoExtractText: true,
    autoGenerateThumbnail: true,
    autoCheckPlagiarism: false,
    plagiarismCheckService: "none" as const,
    plagiarismThreshold: 0.3,
  },
  resubmission: {
    enabled: true,
    maxResubmissions: 5,
    resetGradeOnResubmission: true,
    notifyInstructorOnResubmission: true,
    preserveFeedbackHistory: true,
  },
} as const;

export type LxpSubmissionConfig = typeof LXP_SUBMISSION_CONFIG;

// ============================================================================
// 41. LXP_LATE_POLICY_CONFIG
// ============================================================================

export const LXP_LATE_POLICY_CONFIG = {
  enabled: true,
  penalties: {
    enabled: true,
    type: "percentage" as const,
    penaltyPerDay: 10,
    maxPenalty: 50,
    zeroAfterDays: 14,
    exemptionReasons: ["medical", "emergency", "technical"] as const,
  },
  gracePeriods: {
    enabled: true,
    durationMinutes: 60,
    extendOnTechnicalIssues: true,
    autoApply: true,
    notificationBeforeExpiry: true,
    noticeMinutes: 15,
  },
  extensions: {
    enabled: true,
    requireApproval: true,
    approverRoles: ["instructor", "admin"] as const,
    maxExtensionDays: 7,
    maxExtensionsPerAssignment: 3,
    requireJustification: true,
    retroactiveAllowed: true,
  },
  timezone: {
    enforce: true,
    defaultTimezone: "Europe/Paris" as const,
    allowUserTimezone: false,
  },
  notifications: {
    notifyOnLateSubmission: true,
    notifyOnExtensionGranted: true,
    notifyOnPenalty: true,
    reminderBeforeDeadline: true,
    reminderHours: 24,
  },
} as const;

export type LxpLatePolicyConfig = typeof LXP_LATE_POLICY_CONFIG;

// ============================================================================
// 42. LXP_QUIZ_CONFIG
// ============================================================================

export const LXP_QUIZ_CONFIG = {
  enabled: true,
  quizTypes: [
    "multiple-choice",
    "true-false",
    "fill-blank",
    "matching",
    "short-answer",
    "essay",
    "code",
    "interactive",
    "timed",
    "untimed",
  ] as const,
  difficulty: {
    levels: ["débutant", "intermédiaire", "avancé", "expert"] as const,
    defaultLevel: "intermédia" as const,
    allowAdaptiveDifficulty: true,
    questionDistribution: "balanced" as const,
  },
  timeLimits: {
    enabled: true,
    defaultMinutes: 30,
    maxMinutes: 180,
    allowOverride: true,
    timeBonusEnabled: false,
    timeBonusPercent: 10,
    showTimer: true,
    allowPause: false,
    autoSubmitOnExpiry: true,
    warningBeforeExpiry: true,
    warningMinutes: 5,
  },
  attempts: {
    maxAttempts: 3,
    showScore: true,
    showCorrectAnswers: true,
    showExplanations: true,
    showTimeSpent: true,
    showRanking: false,
    passingScore: 70,
  },
  navigation: {
    allowBackward: true,
    allowSkip: true,
    showQuestionNumbers: true,
    showProgressBar: true,
    questionOrdering: "sequential" as const,
    sectionOrdering: "sequential" as const,
  },
  security: {
    enableProctoring: false,
    preventTabSwitching: false,
    disableCopyPaste: false,
    randomizeQuestions: true,
    randomizeAnswers: true,
    showOneQuestionAtATime: false,
    lockQuestionAfterAnswer: false,
  },
} as const;

export type LxpQuizConfig = typeof LXP_QUIZ_CONFIG;

// ============================================================================
// 43. LXP_QUESTION_BANK_CONFIG
// ============================================================================

export const LXP_QUESTION_BANK_CONFIG = {
  enabled: true,
  questionTypes: [
    "multiple-choice",
    "multiple-select",
    "true-false",
    "fill-blank",
    "matching",
    "ordering",
    "short-answer",
    "essay",
    "code",
    "diagram",
    "audio-response",
    "video-response",
  ] as const,
  pools: {
    enabled: true,
    maxPools: 200,
    maxQuestionsPerPool: 5000,
    allowPoolHierarchy: true,
    maxNestingDepth: 3,
    requirePoolDescription: true,
  },
  categories: {
    enabled: true,
    maxCategories: 100,
    allowCategoryHierarchy: true,
    requireCategoryAssignment: true,
    syncWithTopics: true,
  },
  metadata: {
    requireQuestionText: true,
    requireCorrectAnswer: true,
    requireExplanation: true,
    requireDifficulty: true,
    requireCategory: true,
    requireTags: true,
    maxTags: 10,
  },
  import: {
    enabled: true,
    formats: ["csv", "json", "xlsx", "qti"] as const,
    maxImportSize: 10485760,
    validateOnImport: true,
    previewBeforeImport: true,
  },
  export: {
    enabled: true,
    formats: ["csv", "json", "xlsx", "qti", "pdf"] as const,
    includeCorrectAnswers: true,
    includeExplanations: true,
    includeMetadata: true,
  },
} as const;

export type LxpQuestionBankConfig = typeof LXP_QUESTION_BANK_CONFIG;

// ============================================================================
// 44. LXP_RANDOMIZATION_CONFIG
// ============================================================================

export const LXP_RANDOMIZATION_CONFIG = {
  enabled: true,
  questionRandomization: {
    enabled: true,
    methods: ["full-random", "random-from-pool", "section-random"] as const,
    defaultMethod: "full-random" as const,
    seedBased: true,
    reproducible: true,
  },
  answerShuffling: {
    enabled: true,
    shuffleMultipleChoice: true,
    shuffleTrueFalse: true,
    shuffleMatching: false,
    keepCorrectAnswerPosition: false,
    seedBased: true,
  },
  poolSampling: {
    enabled: true,
    defaultSampleSize: 10,
    maxSampleSize: 100,
    useWeighting: true,
    weights: {
      easy: 1,
      medium: 2,
      hard: 3,
    } as const,
    avoidRepeats: true,
    guaranteeMinimumDifficulty: true,
  },
  variants: {
    enabled: true,
    maxVariants: 5,
    generateFromTemplate: true,
    variantDifference: "moderate" as const,
  },
  seed: {
    generationMethod: "timestamp" as const,
    allowCustomSeed: false,
    seedLength: 16,
  },
} as const;

export type LxpRandomizationConfig = typeof LXP_RANDOMIZATION_CONFIG;

// ============================================================================
// 45. LXP_ADAPTIVE_TEST_CONFIG
// ============================================================================

export const LXP_ADAPTIVE_TEST_CONFIG = {
  enabled: true,
  itemSelection: {
    algorithm: "CAT" as const,
    initialItemDifficulty: 0.5,
    itemPoolMinSize: 50,
    selectByContent: true,
    selectByDifficulty: true,
    selectByInformation: true,
    exposureControl: true,
    maxExposureRate: 0.3,
  },
  abilityEstimation: {
    method: "MLE" as const,
    initialEstimate: 0.0,
    standardErrorThreshold: 0.3,
    minItems: 5,
    maxItems: 50,
    convergenceThreshold: 0.01,
  },
  stopping: {
    maxItems: 50,
    minItems: 5,
    standardErrorTarget: 0.3,
    confidenceLevel: 0.95,
    timeLimit: 3600,
  },
  calibration: {
    enabled: true,
    calibrationItems: 10,
    calibrationMethod: "pre-test" as const,
    recalibrateOnDrift: true,
    driftThreshold: 0.5,
  },
  reporting: {
    showItemParameters: true,
    showAbilityEstimate: true,
    showStandardError: true,
    showConfidenceInterval: true,
    detailedReport: false,
  },
} as const;

export type LxpAdaptiveTestConfig = typeof LXP_ADAPTIVE_TEST_CONFIG;

// ============================================================================
// 46. LXP_PRACTICE_EXAM_CONFIG
// ============================================================================

export const LXP_PRACTICE_EXAM_CONFIG = {
  enabled: true,
  practiceModes: [
    "free-practice",
    "timed-practice",
    "review-mode",
    "flashcard-mode",
    "focus-mode",
  ] as const,
  feedback: {
    immediateFeedback: true,
    detailedExplanations: true,
    showCorrectAnswer: true,
    showReferences: true,
    showHints: true,
    hintsAvailable: true,
    maxHintsPerQuestion: 3,
  },
  scoring: {
    showScore: true,
    showScoreBreakdown: true,
    showDifficultyDistribution: true,
    showTopicBreakdown: true,
    trackProgress: true,
    showComparisonToAverage: true,
  },
  attempts: {
    unlimitedAttempts: true,
    showAttemptHistory: true,
    bestScoreCount: true,
    trackAllAttempts: true,
  },
  timing: {
    showTimePerQuestion: true,
    showTotalTime: true,
    allowPause: true,
    trackTimeSpent: true,
    compareTimeToAverage: true,
  },
  content: {
    useQuestionBank: true,
    questionSelectionMode: "random" as const,
    balanceDifficulty: true,
    balanceTopics: true,
    excludeCompleted: false,
  },
} as const;

export type LxpPracticeExamConfig = typeof LXP_PRACTICE_EXAM_CONFIG;

// ============================================================================
// 47. LXP_TIMED_EXAM_CONFIG
// ============================================================================

export const LXP_TIMED_EXAM_CONFIG = {
  enabled: true,
  timeLimits: {
    defaultMinutes: 60,
    maxMinutes: 240,
    minMinutes: 15,
    allowCustomTime: true,
    allowInstructorOverride: true,
    showTimer: true,
    timerPosition: "top-right" as const,
    allowHideTimer: false,
  },
  proctoring: {
    enabled: false,
    provider: "none" as const,
    requirePhotoId: true,
    requireEnvironmentScan: false,
    recordScreen: false,
    recordAudio: false,
    faceDetection: false,
    gazeTracking: false,
    tabSwitchDetection: true,
    maxTabSwitches: 3,
    autoSubmitOnViolation: false,
  },
  extensions: {
    enabled: true,
    requireApproval: true,
    allowExtraTime: true,
    extraTimeMinutes: 15,
    allowPause: true,
    maxPauses: 3,
    pauseDurationMinutes: 5,
  },
  security: {
    lockBrowser: false,
    disableCopyPaste: true,
    disableRightClick: true,
    disablePrintScreen: true,
    disableDevTools: true,
    fullScreen: false,
    secureBrowser: false,
  },
  submission: {
    autoSubmitOnExpiry: true,
    saveOnExpiry: true,
    allowManualSubmit: true,
    confirmBeforeSubmit: true,
    showSummaryBeforeSubmit: true,
  },
} as const;

export type LxpTimedExamConfig = typeof LXP_TIMED_EXAM_CONFIG;

// ============================================================================
// 48. LXP_AUTO_GRADING_CONFIG
// ============================================================================

export const LXP_AUTO_GRADING_CONFIG = {
  enabled: true,
  gradingAlgorithms: {
    multipleChoice: "exact-match" as const,
    trueFalse: "exact-match" as const,
    fillBlank: "fuzzy-match" as const,
    matching: "exact-match" as const,
    ordering: "partial-credit" as const,
    shortAnswer: "keyword-match" as const,
    code: "test-case" as const,
    essay: "ai-assisted" as const,
  },
  rubricIntegration: {
    enabled: true,
    autoApplyRubric: true,
    rubricWeighting: true,
    partialCredit: true,
    roundToNearest: true,
    roundingPrecision: 1,
  },
  scoring: {
    maxScore: 100,
    passingScore: 70,
    decimalPlaces: 1,
    allowNegativeScores: false,
    bonusPointsEnabled: true,
    maxBonusPoints: 10,
  },
  feedback: {
    autoGenerateFeedback: true,
    showCorrectAnswer: true,
    showExplanation: true,
    showReferences: true,
    feedbackTemplates: true,
    maxFeedbackLength: 2000,
  },
  processing: {
    processImmediately: true,
    batchSize: 100,
    maxConcurrentJobs: 10,
    retryOnFailure: true,
    maxRetries: 3,
  },
} as const;

export type LxpAutoGradingConfig = typeof LXP_AUTO_GRADING_CONFIG;

// ============================================================================
// 49. LXP_MANUAL_GRADING_CONFIG
// ============================================================================

export const LXP_MANUAL_GRADING_CONFIG = {
  enabled: true,
  gradingQueue: {
    enabled: true,
    prioritizeByDeadline: true,
    prioritizeBySubmissionTime: false,
    showEstimatedGradingTime: true,
    assignToInstructors: true,
    maxItemsPerInstructor: 50,
    autoBalanceWorkload: true,
  },
  rubrics: {
    requireRubric: true,
    allowRubricOverride: true,
    showRubricWhileGrading: true,
    calculateScoreFromRubric: true,
    allowAdditionalComments: true,
  },
  feedback: {
    requireFeedback: true,
    minFeedbackLength: 50,
    allowAudioFeedback: false,
    allowVideoFeedback: false,
    feedbackTemplates: true,
    maxTemplates: 20,
    anonymousFeedback: false,
  },
  batchGrading: {
    enabled: true,
    maxBatchSize: 50,
    allowPartialBatch: true,
    applyToAll: false,
    commonFeedback: true,
  },
  notifications: {
    notifyOnGradingComplete: true,
    notifyOnFeedback: true,
    notifyOnGradeChange: true,
    emailDigestEnabled: false,
    emailDigestFrequency: "daily" as const,
  },
} as const;

export type LxpManualGradingConfig = typeof LXP_MANUAL_GRADING_CONFIG;

// ============================================================================
// 50. LXP_RETAKE_CONFIG
// ============================================================================

export const LXP_RETAKE_CONFIG = {
  enabled: true,
  retakePolicies: {
    maxRetakes: 3,
    waitPeriodMinutes: 0,
    requireApproval: false,
    resetProgress: false,
    preserveBestScore: true,
    showAllAttempts: true,
  },
  scoringMethods: {
    defaultMethod: "best" as const,
    availableMethods: ["best", "latest", "average", "first", "last"] as const,
    allowInstructorOverride: true,
    showSelectedMethod: true,
  },
  content: {
    randomizeOnRetake: true,
    differentQuestions: true,
    showNewQuestionsFirst: false,
    excludePreviousQuestions: false,
    refreshQuestionBank: true,
  },
  restrictions: {
    restrictByTime: false,
    restrictByScore: false,
    minScoreToRetake: 0,
    maxTimeBetweenRetakes: 0,
    requireReviewBeforeRetake: false,
  },
  notification: {
    notifyOnRetakeAvailable: true,
    notifyOnRetakeComplete: true,
    showRetakeCount: true,
  },
} as const;

export type LxpRetakeConfig = typeof LXP_RETAKE_CONFIG;

// ============================================================================
// 51. LXP_CERTIFICATE_CONFIG
// ============================================================================

export const LXP_CERTIFICATE_CONFIG = {
  enabled: true,
  certificateTypes: [
    "completion",
    "achievement",
    "competency",
    "professional",
    "course-specific",
    "program",
    "custom",
  ] as const,
  templates: {
    enabled: true,
    maxTemplates: 50,
    allowCustomDesign: true,
    allowCustomText: true,
    allowLogoUpload: true,
    supportedLanguages: ["fr", "en", "es", "de"] as const,
    defaultTemplate: "professional" as const,
  },
  verification: {
    enabled: true,
    publicVerification: true,
    verificationUrl: "https://verify.educi.fr" as const,
    includeQRCode: true,
    includeSerialNumber: true,
    includeBlockchain: false,
    verificationCodeLength: 16,
  },
  issuance: {
    autoIssueOnCompletion: true,
    requireApproval: false,
    issueDelay: 0,
    includeGrade: true,
    includeCompletionDate: true,
    validFrom: "completion-date" as const,
    validUntil: "none" as const,
  },
  sharing: {
    allowDownload: true,
    downloadFormats: ["pdf", "png"] as const,
    allowSocialSharing: true,
    allowLinkedInSharing: true,
    allowEmailSharing: true,
  },
} as const;

export type LxpCertificateConfig = typeof LXP_CERTIFICATE_CONFIG;

// ============================================================================
// 52. LXP_BADGE_CONFIG
// ============================================================================

export const LXP_BADGE_CONFIG = {
  enabled: true,
  badgeTypes: [
    "completion",
    "achievement",
    "skill",
    "participation",
    "leadership",
    "innovation",
    "streak",
    "special",
  ] as const,
  criteria: {
    requireCriteria: true,
    maxCriteriaPerBadge: 10,
    allowAutoAward: true,
    allowManualAward: true,
    criteriaTypes: [
      "course-completion",
      "quiz-score",
      "assignment-grade",
      "participation",
      "peer-review",
      "time-spent",
      "streak",
      "custom",
    ] as const,
  },
  display: {
    showOnProfile: true,
    showOnCertificate: true,
    showInCatalog: true,
    showIssuedDate: true,
    showExpiryDate: true,
    badgeSize: "medium" as const,
    allowCustomDesign: true,
  },
  sharing: {
    allowSocialSharing: true,
    shareToLinkedIn: true,
    shareToTwitter: true,
    embedEnabled: true,
    downloadEnabled: true,
    downloadFormats: ["png", "svg", "pdf"] as const,
  },
  expiration: {
    enabled: false,
    defaultDurationDays: 365,
    allowNeverExpire: true,
    renewalEnabled: true,
    renewalNoticeDays: 30,
  },
} as const;

export type LxpBadgeConfig = typeof LXP_BADGE_CONFIG;

// ============================================================================
// 53. LXP_MICRO_CREDENTIAL_CONFIG
// ============================================================================

export const LXP_MICRO_CREDENTIAL_CONFIG = {
  enabled: true,
  credentialTypes: [
    "badge",
    "certificate",
    "digital-badge",
    "professional-credential",
    "nano-degree",
    "micro-specialization",
  ] as const,
  pathways: {
    enabled: true,
    maxPathways: 20,
    allowStacking: true,
    stackIntoCredentials: true,
    requireSequentialCompletion: false,
    allowParallelPathways: true,
  },
  requirements: {
    minCourses: 1,
    minCredits: 0,
    requireAssessment: true,
    requireProject: false,
    requirePortfolio: false,
    passingScore: 70,
  },
  issuance: {
    autoIssue: true,
    requireApproval: false,
    issueOnCompletion: true,
    validFrom: "issuance-date" as const,
    expiryEnabled: false,
    expiryMonths: 24,
  },
  verification: {
    publicVerification: true,
    includeQRCode: true,
    includeBlockchain: false,
    verificationUrl: "https://credentials.educi.fr" as const,
  },
} as const;

export type LxpMicroCredentialConfig = typeof LXP_MICRO_CREDENTIAL_CONFIG;

// ============================================================================
// 54. LXP_COMPETENCY_CONFIG
// ============================================================================

export const LXP_COMPETENCY_CONFIG = {
  enabled: true,
  competencyFramework: {
    enabled: true,
    maxCompetencies: 500,
    maxLevels: 5,
    allowHierarchy: true,
    maxDepth: 4,
    frameworks: ["custom", "bloom", "dreyfus", "cefr"] as const,
    defaultFramework: "custom" as const,
  },
  assessment: {
    assessmentMethods: [
      "quiz",
      "project",
      "portfolio",
      "observation",
      "self-assessment",
      "peer-assessment",
      "interview",
    ] as const,
    requireMultipleAssessments: true,
    minAssessmentsPerCompetency: 2,
    weightingEnabled: true,
    recertificationRequired: true,
    recertificationIntervalMonths: 12,
  },
  mapping: {
    linkToCourses: true,
    linkToActivities: true,
    linkToCareers: true,
    showCompetencyMap: true,
    showGapAnalysis: true,
    showGrowthTimeline: true,
  },
  levels: [
    { level: 1, label: "Débutant", description: "Découverte de la compétence" },
    { level: 2, label: "Élémentaire", description: "Application guidée" },
    { level: 3, label: "Intermédiaire", description: "Application autonome" },
    { level: 4, label: "Avancé", description: "Maîtrise et innovation" },
    { level: 5, label: "Expert", description: "Leadership et mentorat" },
  ] as const,
} as const;

export type LxpCompetencyConfig = typeof LXP_COMPETENCY_CONFIG;

// ============================================================================
// 55. LXP_SKILL_CONFIG
// ============================================================================

export const LXP_SKILL_CONFIG = {
  enabled: true,
  skillTaxonomy: {
    enabled: true,
    maxSkills: 2000,
    allowHierarchy: true,
    maxDepth: 5,
    categories: [
      "technical",
      "soft",
      "leadership",
      "domain",
      "methodology",
      "tool",
    ] as const,
    defaultCategory: "technical" as const,
  },
  assessment: {
    assessmentMethods: [
      "self-assessment",
      "peer-assessment",
      "instructor-assessment",
      "project-based",
      "simulation",
      "interview",
    ] as const,
    levels: ["awareness", "basic", "intermediate", "advanced", "expert"] as const,
    requireEvidence: true,
    evidenceTypes: ["portfolio", "certificate", "project", "assessment"] as const,
  },
  tracking: {
    trackProgress: true,
    trackUsage: true,
    trackEndorsements: true,
    showSkillRadar: true,
    showSkillTimeline: true,
    updateOnAchievement: true,
  },
  endorsement: {
    enabled: true,
    allowPeerEndorsement: true,
    allowInstructorEndorsement: true,
    requireJustification: true,
    maxEndorsementsPerSkill: 20,
  },
  visualization: {
    showSkillTree: true,
    showSkillCloud: true,
    showSkillMatrix: true,
    showGrowthChart: true,
    showGapAnalysis: true,
  },
} as const;

export type LxpSkillConfig = typeof LXP_SKILL_CONFIG;

// ============================================================================
// 56. LXP_VERIFICATION_CONFIG
// ============================================================================

export const LXP_VERIFICATION_CONFIG = {
  enabled: true,
  verificationMethods: [
    "unique-id",
    "qr-code",
    "blockchain",
    "digital-signature",
    "api",
    "url",
  ] as const,
  defaultMethod: "unique-id" as const,
  blockchain: {
    enabled: false,
    provider: "ethereum" as const,
    network: "mainnet" as const,
    contractAddress: "" as const,
    gasLimit: 200000,
    confirmationsRequired: 3,
  },
  qr: {
    enabled: true,
    format: "png" as const,
    size: 200,
    errorCorrection: "M" as const,
    includeLogo: true,
    logoSize: 40,
  },
  api: {
    enabled: true,
    rateLimit: 100,
    requireApiKey: true,
    apiVersion: "v1" as const,
    corsEnabled: true,
  },
  url: {
    enabled: true,
    baseUrl: "https://verify.educi.fr" as const,
    urlLength: 32,
    expiryDays: 365,
  },
  certificate: {
    includeVerificationCode: true,
    includeQRCode: true,
    includeVerificationUrl: true,
    verificationMessage: "Vérifiez l'authenticité de ce certificat sur {url}",
  },
} as const;

export type LxpVerificationConfig = typeof LXP_VERIFICATION_CONFIG;

// ============================================================================
// 57. LXP_BLOCKCHAIN_CONFIG
// ============================================================================

export const LXP_BLOCKCHAIN_CONFIG = {
  enabled: false,
  blockchainProviders: [
    { id: "ethereum", name: "Ethereum", network: "mainnet" as const, enabled: true },
    { id: "polygon", name: "Polygon", network: "mainnet" as const, enabled: true },
    { id: "solana", name: "Solana", network: "mainnet" as const, enabled: false },
    { id: "tezos", name: "Tezos", network: "mainnet" as const, enabled: false },
  ] as const,
  defaultProvider: "polygon" as const,
  gas: {
    maxGasPrice: 100,
    gasLimit: 200000,
    autoAdjustGas: true,
    gasBufferPercent: 20,
  },
  verification: {
    confirmationsRequired: 3,
    timeout: 300000,
    retryAttempts: 3,
    retryDelay: 5000,
  },
  storage: {
    storeOnChain: false,
    ipfsEnabled: true,
    ipfsGateway: "https://ipfs.educi.fr" as const,
    pinContent: true,
  },
  costs: {
    trackGasCosts: true,
    maxMonthlyBudget: 1000,
    alertThreshold: 0.8,
    currency: "EUR" as const,
  },
} as const;

export type LxpBlockchainConfig = typeof LXP_BLOCKCHAIN_CONFIG;

// ============================================================================
// 58. LXP_QR_CONFIG
// ============================================================================

export const LXP_QR_CONFIG = {
  enabled: true,
  generation: {
    enabled: true,
    defaultFormat: "png" as const,
    supportedFormats: ["png", "svg", "pdf"] as const,
    defaultSize: 200,
    minSize: 50,
    maxSize: 1000,
    errorCorrectionLevels: ["L", "M", "Q", "H"] as const,
    defaultErrorCorrection: "M" as const,
    defaultForeground: "#000000" as const,
    defaultBackground: "#FFFFFF" as const,
  },
  verification: {
    enabled: true,
    validateOnScan: true,
    checkExpiry: true,
    logScans: true,
    maxScanAttempts: 10,
    cooldownBetweenScans: 5,
  },
  expiry: {
    enabled: true,
    defaultExpiryDays: 365,
    minExpiryDays: 1,
    maxExpiryDays: 1825,
    allowNeverExpire: false,
    expiryMessage: "Ce QR code a expiré.",
  },
  customDesign: {
    allowCustomColors: true,
    allowLogo: true,
    maxLogoSize: 524288,
    allowCustomPattern: true,
    allowRoundedCorners: true,
  },
  tracking: {
    trackScans: true,
    trackLocation: false,
    trackDevice: true,
    trackTimestamp: true,
    analyticsRetentionDays: 365,
  },
} as const;

export type LxpQrConfig = typeof LXP_QR_CONFIG;

// ============================================================================
// 59. LXP_LIVE_SESSION_CONFIG
// ============================================================================

export const LXP_LIVE_SESSION_CONFIG = {
  enabled: true,
  sessionTypes: [
    "lecture",
    "workshop",
    "seminar",
    "office-hours",
    "exam",
    "assessment",
    "social",
  ] as const,
  capacity: {
    maxParticipants: 500,
    maxPresenters: 20,
    maxModerators: 10,
    allowWaitlist: true,
    waitlistSize: 100,
    autoRemoveAbsentees: true,
  },
  duration: {
    minMinutes: 15,
    maxMinutes: 480,
    defaultMinutes: 60,
    allowExtension: true,
    extensionMinutes: 15,
    maxExtensions: 3,
  },
  features: {
    screenSharing: true,
    whiteboard: true,
    recording: true,
    chat: true,
    qAndA: true,
    polls: true,
    breakoutRooms: true,
    handRaise: true,
    reactions: true,
    annotations: true,
  },
  recording: {
    enabled: true,
    autoRecord: false,
    requireConsent: true,
    storageDuration: 90,
    allowDownload: false,
    allowReplay: true,
    replayAccess: "enrolled" as const,
  },
  scheduling: {
    allowRecurring: true,
    maxRecurrenceWeeks: 16,
    calendarIntegration: true,
    reminderBeforeMinutes: 15,
    allowReschedule: true,
    allowCancel: true,
    cancellationNoticeHours: 24,
  },
} as const;

export type LxpLiveSessionConfig = typeof LXP_LIVE_SESSION_CONFIG;

// ============================================================================
// 60. LXP_VIRTUAL_CLASSROOM_CONFIG
// ============================================================================

export const LXP_VIRTUAL_CLASSROOM_CONFIG = {
  enabled: true,
  classroomTools: [
    "whiteboard",
    "screen-share",
    "document-share",
    "poll",
    "quiz",
    "timer",
    "calculator",
    "code-editor",
    "terminal",
  ] as const,
  whiteboard: {
    enabled: true,
    maxCollaborators: 50,
    tools: ["pen", "text", "shapes", "eraser", "sticky-note", "image", "link"] as const,
    saveProgress: true,
    exportFormats: ["png", "pdf", "svg"] as const,
    allowBackgroundUpload: true,
    maxPageSize: 100,
  },
  recording: {
    enabled: true,
    quality: "hd" as const,
    formats: ["mp4", "webm"] as const,
    includeChat: true,
    includeWhiteboard: true,
    includeScreenShare: true,
    autoTranscribe: true,
    transcriptionLanguages: ["fr", "en"] as const,
  },
  participation: {
    showParticipantList: true,
    showTypingIndicator: true,
    showPresenceStatus: true,
    allowReactions: true,
    reactionTypes: ["thumbs-up", "heart", "applause", "question", "agree", "disagree"] as const,
    muteByDefault: false,
    allowSelfUnmute: true,
  },
  moderation: {
    enabled: true,
    muteAll: true,
    removeParticipant: true,
    lockRoom: true,
    shareControls: true,
    restrictChat: false,
    requireApprovalToJoin: false,
  },
} as const;

export type LxpVirtualClassroomConfig = typeof LXP_VIRTUAL_CLASSROOM_CONFIG;

// ============================================================================
// 61. LXP_BREAKOUT_ROOM_CONFIG
// ============================================================================

export const LXP_BREAKOUT_ROOM_CONFIG = {
  enabled: true,
  roomCreation: {
    autoCreate: false,
    maxRooms: 20,
    minParticipants: 2,
    maxParticipants: 10,
    allowCustomAssignment: true,
    randomAssignment: true,
    instructorCanMove: true,
  },
  timeLimits: {
    enabled: true,
    defaultMinutes: 15,
    maxMinutes: 60,
    allowExtension: true,
    extensionMinutes: 5,
    warnBeforeClosing: true,
    warningMinutes: 2,
    autoCloseOnExpiry: true,
  },
  monitoring: {
    showRoomList: true,
    showParticipantCount: true,
    showRoomActivity: true,
    instructorCanJoin: true,
    instructorCanObserve: true,
    captureScreenshots: false,
    trackTimeInRoom: true,
  },
  features: {
    chat: true,
    screenShare: true,
    whiteboard: true,
    fileShare: true,
    audioVideo: true,
    textEditor: false,
    timers: true,
  },
  reintegration: {
    allowReturnToMain: true,
    notifyOnReturn: true,
    autoReturnOnClose: true,
    shareRoomSummary: true,
  },
} as const;

export type LxpBreakoutRoomConfig = typeof LXP_BREAKOUT_ROOM_CONFIG;

// ============================================================================
// 62. LXP_POLL_CONFIG
// ============================================================================

export const LXP_POLL_CONFIG = {
  enabled: true,
  pollTypes: [
    "multiple-choice",
    "true-false",
    "rating",
    "open-ended",
    "word-cloud",
    "ranking",
    "quiz",
  ] as const,
  responses: {
    allowMultipleChoice: false,
    allowAnonymous: true,
    showResults: true,
    showResultsAfter: "after-close" as const,
    allowEditResponse: false,
    requireResponse: false,
    maxResponseLength: 1000,
  },
  analytics: {
    showResponseCount: true,
    showPercentage: true,
    showIndividualResponses: false,
    exportResults: true,
    exportFormats: ["csv", "json"] as const,
  },
  design: {
    maxOptions: 10,
    requiredOptions: 2,
    allowOtherOption: true,
    allowCustomText: true,
    shuffleOptions: false,
  },
  timing: {
    allowTimed: true,
    defaultDurationMinutes: 5,
    maxDurationMinutes: 60,
    allowEarlyClose: true,
    showTimer: true,
  },
  integration: {
    embedInLesson: true,
    embedInQuiz: true,
    shareResults: true,
    addToReport: true,
  },
} as const;

export type LxpPollConfig = typeof LXP_POLL_CONFIG;

// ============================================================================
// 63. LXP_QA_CONFIG
// ============================================================================

export const LXP_QA_CONFIG = {
  enabled: true,
  moderation: {
    enabled: true,
    preModeration: false,
    postModeration: true,
    autoFlag: true,
    flagThreshold: 0.8,
    moderatorRoles: ["instructor", "moderator", "admin"] as const,
    maxModerators: 20,
  },
  anonymous: {
    enabled: true,
    anonymousToStudents: true,
    anonymousToInstructors: false,
    instructorCanReveal: true,
    allowPseudonyms: true,
    pseudonymMaxLength: 30,
  },
  upvoting: {
    enabled: true,
    allowDownvoting: false,
    showVoteCount: true,
    sortByVotes: true,
    minVotesForPromotion: 5,
    promoteToTop: true,
  },
  features: {
    threads: true,
    maxThreadDepth: 5,
    attachments: true,
    maxAttachments: 5,
    maxFileSize: 10485760,
    codeBlock: true,
    latex: true,
    images: true,
  },
  rewards: {
    enabled: true,
    pointsForAnswer: 10,
    pointsForBestAnswer: 50,
    pointsForUpvote: 2,
    badgesEnabled: true,
  },
  search: {
    enabled: true,
    fullTextSearch: true,
    filterByTag: true,
    filterByStatus: true,
    filterByDate: true,
  },
} as const;

export type LxpQaConfig = typeof LXP_QA_CONFIG;

// ============================================================================
// 64. LXP_FORUM_CONFIG
// ============================================================================

export const LXP_FORUM_CONFIG = {
  enabled: true,
  forumTypes: [
    "general",
    "course-specific",
    "topic-based",
    "support",
    "announcement",
    "discussion",
    "showcase",
  ] as const,
  moderation: {
    enabled: true,
    preModeration: false,
    postModeration: true,
    autoModeration: true,
    profanityFilter: true,
    spamDetection: true,
    moderatorRoles: ["instructor", "moderator", "admin"] as const,
    maxPostsPerDay: 50,
    cooldownMinutes: 1,
  },
  features: {
    threads: true,
    maxThreadDepth: 10,
    attachments: true,
    maxAttachments: 10,
    maxFileSize: 10485760,
    codeBlock: true,
    latex: true,
    images: true,
    polls: true,
    bookmarks: true,
    subscriptions: true,
  },
  gamification: {
    enabled: true,
    pointsForPost: 5,
    pointsForReply: 3,
    pointsForBestAnswer: 100,
    pointsForUpvote: 1,
    badgesEnabled: true,
    leaderboards: true,
  },
  notifications: {
    emailOnReply: true,
    emailOnMention: true,
    emailOnDigest: false,
    digestFrequency: "weekly" as const,
    pushNotifications: true,
  },
  search: {
    fullTextSearch: true,
    filterByAuthor: true,
    filterByDate: true,
    filterByTag: true,
    sortOptions: ["newest", "oldest", "popular", "recently-active"] as const,
  },
} as const;

export type LxpForumConfig = typeof LXP_FORUM_CONFIG;

// ============================================================================
// 65. LXP_COMMUNITY_CONFIG
// ============================================================================

export const LXP_COMMUNITY_CONFIG = {
  enabled: true,
  communityTypes: [
    "course-community",
    "interest-group",
    "professional-network",
    "alumni",
    "support-group",
    "project-team",
  ] as const,
  membership: {
    allowSelfJoin: true,
    requireApproval: false,
    maxMembersPerCommunity: 5000,
    allowMultipleMemberships: true,
    memberRoles: ["member", "moderator", "admin"] as const,
    inviteEnabled: true,
    maxInvitesPerMember: 10,
  },
  events: {
    enabled: true,
    maxEventsPerCommunity: 100,
    allowMemberEvents: true,
    requireApproval: false,
    rsvpEnabled: true,
    maxAttendees: 500,
    calendarIntegration: true,
    reminderEnabled: true,
    reminderHoursBefore: 24,
  },
  features: {
    discussionBoard: true,
    fileSharing: true,
    polls: true,
    events: true,
    memberDirectory: true,
    profiles: true,
    messaging: true,
    announcements: true,
  },
  privacy: {
    visibility: "members-only" as const,
    searchable: true,
    showMemberList: true,
    showActivityFeed: true,
    dataRetentionDays: 730,
  },
} as const;

export type LxpCommunityConfig = typeof LXP_COMMUNITY_CONFIG;

// ============================================================================
// 66. LXP_MENTORING_CONFIG
// ============================================================================

export const LXP_MENTORING_CONFIG = {
  enabled: true,
  matching: {
    algorithm: "skill-based" as const,
    matchByExpertise: true,
    matchByAvailability: true,
    matchByGoals: true,
    matchByTimezone: false,
    minMatchScore: 0.6,
    maxMenteesPerMentor: 5,
    allowSelfMatch: false,
  },
  scheduling: {
    enabled: true,
    sessionTypes: ["one-on-one", "group", "workshop"] as const,
    defaultDurationMinutes: 60,
    minDurationMinutes: 15,
    maxDurationMinutes: 180,
    allowRecurring: true,
    maxRecurrenceWeeks: 12,
    calendarIntegration: true,
    reminderEnabled: true,
    reminderMinutes: 30,
  },
  tracking: {
    trackSessions: true,
    trackGoals: true,
    trackProgress: true,
    requireSessionNotes: true,
    allowFeedback: true,
    feedbackAfterEachSession: true,
    anonymousFeedback: false,
  },
  goals: {
    enabled: true,
    maxGoals: 10,
    goalCategories: ["skill", "career", "education", "personal", "project"] as const,
    requireTimeline: true,
    allowMentorGoals: true,
    progressUpdates: true,
    updateFrequency: "weekly" as const,
  },
  evaluation: {
    enabled: true,
    evaluateMentor: true,
    evaluateMentee: true,
    evaluateProgram: true,
    surveyFrequency: "monthly" as const,
    anonymousResponses: true,
  },
} as const;

export type LxpMentoringConfig = typeof LXP_MENTORING_CONFIG;

// ============================================================================
// 67. LXP_GAMIFICATION_CONFIG
// ============================================================================

export const LXP_GAMIFICATION_CONFIG = {
  enabled: true,
  points: {
    enabled: true,
    earnMethods: [
      "course-completion",
      "quiz-score",
      "assignment-submission",
      "forum-participation",
      "peer-review",
      "attendance",
      "login-streak",
      "special-event",
    ] as const,
    bonusMultiplier: {
      perfectScore: 2.0,
      earlySubmission: 1.5,
      consecutiveDays: 1.2,
    } as const,
    pointExpiration: false,
    pointExpirationDays: 365,
  },
  xp: {
    enabled: true,
    xpPerLevel: 1000,
    maxLevel: 100,
    levelNames: [
      "Novice", "Apprenti", "Initié", "Confirmé", "Expert",
      "Maître", "Légende", "Mythique", "Transcendant", "Divin",
    ] as const,
    showXPBar: true,
    showLevelUpAnimation: true,
  },
  levels: {
    enabled: true,
    maxLevel: 100,
    unlockableFeatures: [
      "custom-avatar",
      "custom-theme",
      "advanced-stats",
      "priority-support",
      "exclusive-content",
    ] as const,
    levelUpRewards: true,
    showLeaderboard: true,
  },
  achievements: {
    enabled: true,
    maxAchievements: 500,
    categories: ["learning", "social", "exploration", "mastery", "special"] as const,
    showOnProfile: true,
    showNotifications: true,
    shareable: true,
  },
  penalties: {
    enabled: false,
    penaltyTypes: ["late-submission", "absence", "plagiarism"] as const,
    maxPenalty: 50,
    warnBeforePenalty: true,
  },
} as const;

export type LxpGamificationConfig = typeof LXP_GAMIFICATION_CONFIG;

// ============================================================================
// 68. LXP_LEADERBOARD_CONFIG
// ============================================================================

export const LXP_LEADERBOARD_CONFIG = {
  enabled: true,
  leaderboardTypes: [
    "points",
    "xp",
    "level",
    "course-completion",
    "quiz-performance",
    "forum-activity",
    "peer-review",
    "overall",
  ] as const,
  refresh: {
    autoRefresh: true,
    refreshIntervalMinutes: 5,
    manualRefresh: true,
    showLastUpdated: true,
  },
  privacy: {
    showFullNames: true,
    showAvatars: true,
    allowAnonymous: true,
    optOutAllowed: true,
    showOptOutMessage: true,
    optOutMessage: "Vous avez choisi de ne pas afficher votre classement.",
  },
  display: {
    showTopN: 10,
    showUserPosition: true,
    showRankChange: true,
    showScoreHistory: false,
    highlightFriends: false,
    showBadges: true,
    displayStyle: "table" as const,
  },
  timeframes: ["daily", "weekly", "monthly", "quarterly", "all-time"] as const,
  defaultTimeframe: "all-time" as const,
  filters: {
    allowCourseFilter: true,
    allowTimeFilter: true,
    allowGroupFilter: true,
    allowRoleFilter: false,
  },
} as const;

export type LxpLeaderboardConfig = typeof LXP_LEADERBOARD_CONFIG;

// ============================================================================
// 69. LXP_CHALLENGE_CONFIG
// ============================================================================

export const LXP_CHALLENGE_CONFIG = {
  enabled: true,
  challengeTypes: [
    "learning",
    "quiz",
    "project",
    "social",
    "streak",
    "speed",
    "accuracy",
    "completion",
  ] as const,
  duration: {
    minDays: 1,
    maxDays: 90,
    defaultDays: 7,
    allowCustomDuration: true,
    allowIndefinite: false,
  },
  rewards: {
    enabled: true,
    rewardTypes: ["points", "xp", "badges", "certificates", "recognition"] as const,
    bonusPoints: 100,
    bonusXP: 500,
    exclusiveBadges: true,
    completionMultiplier: 1.5,
  },
  participation: {
    maxParticipants: 1000,
    allowTeamParticipation: true,
    maxTeamSize: 5,
    requireRegistration: false,
    allowLateJoin: true,
    lateJoinDeadlinePercent: 50,
  },
  progress: {
    showProgressBar: true,
    showLeaderboard: true,
    showTimeRemaining: true,
    showMilestones: true,
    notifyOnMilestone: true,
  },
  difficulty: {
    levels: ["facile", "moyen", "difficile", "extrême"] as const,
    defaultLevel: "moyen" as const,
    allowDifficultySelection: true,
    adaptiveDifficulty: false,
  },
} as const;

export type LxpChallengeConfig = typeof LXP_CHALLENGE_CONFIG;

// ============================================================================
// 70. LXP_MARKETPLACE_CONFIG
// ============================================================================

export const LXP_MARKETPLACE_CONFIG = {
  enabled: true,
  marketplaceTypes: [
    "courses",
    "content",
    "templates",
    "tools",
    "services",
    "certifications",
  ] as const,
  commission: {
    platformCommission: 20,
    minCommission: 10,
    maxCommission: 40,
    commissionOnDiscount: true,
    volumeDiscountEnabled: true,
    volumeDiscountThreshold: 100,
    volumeDiscountPercent: 5,
  },
  payouts: {
    payoutMethods: ["bank-transfer", "paypal", "stripe", "crypto"] as const,
    defaultMethod: "bank-transfer" as const,
    minPayoutAmount: 50,
    maxPayoutAmount: 50000,
    payoutSchedule: "monthly" as const,
    payoutDay: 15,
    autoPayout: true,
    holdPeriodDays: 30,
  },
  listings: {
    maxListingsPerSeller: 100,
    maxImages: 10,
    maxPreviewItems: 5,
    requireDescription: true,
    minDescriptionLength: 100,
    requireThumbnail: true,
    requirePricing: true,
  },
  reviews: {
    enabled: true,
    requirePurchase: true,
    allowAnonymous: false,
    moderationEnabled: true,
    maxReviewsPerUser: 1,
    showAverageRating: true,
    minRating: 1,
    maxRating: 5,
  },
  search: {
    fullTextSearch: true,
    filterByCategory: true,
    filterByPrice: true,
    filterByRating: true,
    filterByLevel: true,
    sortBy: ["relevance", "newest", "popular", "price-low", "price-high", "rating"] as const,
  },
} as const;

export type LxpMarketplaceConfig = typeof LXP_MARKETPLACE_CONFIG;

// ============================================================================
// 71. LXP_PUBLISHER_CONFIG
// ============================================================================

export const LXP_PUBLISHER_CONFIG = {
  enabled: true,
  publisherTiers: [
    {
      id: "free",
      label: "Gratuit",
      commission: 40,
      maxListings: 5,
      features: ["basic-analytics", "basic-support"] as const,
    },
    {
      id: "starter",
      label: "Débutant",
      commission: 30,
      monthlyFee: 29,
      maxListings: 25,
      features: ["advanced-analytics", "priority-support", "custom-branding"] as const,
    },
    {
      id: "professional",
      label: "Professionnel",
      commission: 20,
      monthlyFee: 99,
      maxListings: 100,
      features: ["full-analytics", "dedicated-support", "custom-domain", "api-access"] as const,
    },
    {
      id: "enterprise",
      label: "Entreprise",
      commission: 15,
      monthlyFee: 299,
      maxListings: 1000,
      features: ["enterprise-analytics", "24-7-support", "white-label", "custom-integrations"] as const,
    },
  ] as const,
  defaultTier: "free" as const,
  requirements: {
    minContentQuality: 70,
    requireDemoContent: true,
    requireProfileCompletion: true,
    backgroundCheck: false,
    portfolioRequired: true,
  },
  benefits: {
    featuredListings: true,
    earlyAccess: true,
    betaFeatures: true,
    communityAccess: true,
    mentoringProgram: true,
    revenueInsights: true,
  },
} as const;

export type LxpPublisherConfig = typeof LXP_PUBLISHER_CONFIG;

// ============================================================================
// 72. LXP_LICENSE_CONFIG
// ============================================================================

export const LXP_LICENSE_CONFIG = {
  enabled: true,
  licenseTypes: [
    "single-user",
    "multi-user",
    "site-license",
    "enterprise",
    "academic",
    "trial",
    "open-source",
  ] as const,
  pricing: {
    enableDynamicPricing: false,
    currency: "EUR" as const,
    taxIncluded: true,
    taxRate: 20,
    allowPromotions: true,
    maxDiscountPercent: 50,
    bundleDiscount: 10,
  },
  distribution: {
    directSale: true,
    marketplace: true,
    apiDistribution: true,
    bulkLicensing: true,
    maxBulkLicense: 10000,
    licenseKeyGeneration: true,
    licenseKeyLength: 32,
  },
  management: {
    trackActivations: true,
    maxActivations: 1,
    allowDeactivation: true,
    deactivationCooldownDays: 30,
    transferAllowed: true,
    maxTransfers: 3,
  },
  expiration: {
    enabled: true,
    defaultDurationDays: 365,
    allowNeverExpire: false,
    renewalReminder: true,
    renewalNoticeDays: 60,
    gracePeriodDays: 30,
  },
} as const;

export type LxpLicenseConfig = typeof LXP_LICENSE_CONFIG;

// ============================================================================
// 73. LXP_REVENUE_SHARE_CONFIG
// ============================================================================

export const LXP_REVENUE_SHARE_CONFIG = {
  enabled: true,
  revenueModels: [
    "commission",
    "subscription",
    "tiered",
    "hybrid",
    "royalty",
  ] as const,
  defaultModel: "commission" as const,
  payoutSchedules: {
    frequency: "monthly" as const,
    payoutDay: 15,
    minPayout: 50,
    maxPayout: 100000,
    holdPeriodDays: 30,
    advancePayout: false,
    advancePayoutPercent: 80,
  },
  calculations: {
    includeTaxes: true,
    includeRefunds: true,
    refundWindowDays: 30,
    partialRefundSupport: true,
    commissionOnNet: true,
    roundingPrecision: 2,
  },
  reporting: {
    generateMonthlyReports: true,
    generateQuarterlyReports: true,
    detailedBreakdown: true,
    showTaxes: true,
    showDeductions: true,
    exportFormats: ["csv", "pdf", "json"] as const,
  },
  compliance: {
    generateInvoices: true,
    taxReporting: true,
    vatCompliance: true,
    internationalPayments: true,
    supportedCountries: ["FR", "DE", "ES", "IT", "NL", "BE", "CH"] as const,
  },
} as const;

export type LxpRevenueShareConfig = typeof LXP_REVENUE_SHARE_CONFIG;

// ============================================================================
// 74. LXP_ANALYTICS_CONFIG
// ============================================================================

export const LXP_ANALYTICS_CONFIG = {
  enabled: true,
  retention: {
    rawDataRetentionDays: 365,
    aggregatedDataRetentionDays: 1095,
    logRetentionDays: 90,
    sessionDataRetentionDays: 180,
    userActivityRetentionDays: 730,
  },
  realTime: {
    enabled: true,
    updateInterval: 5000,
    maxConcurrentStreams: 100,
    dashboardRefresh: true,
    alertOnThreshold: true,
    thresholds: {
      activeUsers: 1000,
      errorRate: 0.05,
      responseTime: 5000,
      cpuUsage: 0.8,
    } as const,
  },
  exports: {
    enabled: true,
    formats: ["csv", "xlsx", "json", "pdf"] as const,
    maxRowsPerExport: 100000,
    scheduledExports: true,
    exportSchedules: ["daily", "weekly", "monthly"] as const,
    exportDestination: "email" as const,
  },
  dashboards: {
    enabled: true,
    maxDashboards: 20,
    allowCustomDashboards: true,
    widgetTypes: [
      "line-chart",
      "bar-chart",
      "pie-chart",
      "metric",
      "table",
      "heatmap",
      "funnel",
    ] as const,
    refreshInterval: 30000,
    shareDashboards: true,
  },
  dataCollection: {
    trackPageViews: true,
    trackClicks: true,
    trackScrollDepth: true,
    trackTimeOnPage: true,
    trackSearchQueries: true,
    trackFileDownloads: true,
    anonymizeIP: true,
    respectDNT: true,
  },
} as const;

export type LxpAnalyticsConfig = typeof LXP_ANALYTICS_CONFIG;

// ============================================================================
// 75. LXP_REPORT_CONFIG
// ============================================================================

export const LXP_REPORT_CONFIG = {
  enabled: true,
  reportTypes: [
    "learner-progress",
    "course-performance",
    "assessment-results",
    "engagement-metrics",
    "completion-rates",
    "completion-statistics",
    "revenue-report",
    "certification-report",
    "competency-report",
    "activity-report",
    "custom",
  ] as const,
  scheduling: {
    enabled: true,
    frequencies: ["daily", "weekly", "monthly", "quarterly", "yearly"] as const,
    defaultFrequency: "monthly" as const,
    allowCustomSchedule: true,
    timezone: "Europe/Paris" as const,
    timeDefault: "08:00" as const,
  },
  distribution: {
    enabled: true,
    methods: ["email", "download", "dashboard", "api"] as const,
    defaultMethod: "email" as const,
    recipients: {
      maxRecipients: 50,
      allowExternalRecipients: false,
      requireApproval: false,
    },
    formats: ["pdf", "xlsx", "csv", "json", "html"] as const,
    defaultFormat: "pdf" as const,
  },
  templates: {
    enabled: true,
    maxTemplates: 50,
    allowCustomTemplates: true,
    allowBranding: true,
    includeCharts: true,
    includeTables: true,
    includeSummary: true,
  },
  access: {
    requireAuth: true,
    roleBasedAccess: true,
    allowedRoles: ["admin", "instructor", "manager", "analyst"] as const,
    allowGuestAccess: false,
    expirationDays: 30,
    maxDownloads: 100,
  },
  privacy: {
    anonymizeData: false,
    aggregateData: true,
    suppressSmallNumbers: true,
    smallNumberThreshold: 5,
    gdprCompliant: true,
    dataExportAllowed: true,
  },
} as const;

export type LxpReportConfig = typeof LXP_REPORT_CONFIG;
