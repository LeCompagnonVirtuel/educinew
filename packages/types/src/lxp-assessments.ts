// Phase 2.7: Learning Experience Platform — Assessments, Quizzes & Certifications

// ============================================================================
// ENUMS — ASSIGNMENTS & GRADING
// ============================================================================

/** Structural type of an assignment */
export const AssignmentType = {
  Homework: 'homework',
  Project: 'project',
  CaseStudy: 'case_study',
  LabWork: 'lab_work',
  Portfolio: 'portfolio',
  Essay: 'essay',
  Presentation: 'presentation',
  Discussion: 'discussion',
  PeerReview: 'peer_review',
  GroupProject: 'group_project',
  Capstone: 'capstone',
  Research: 'research',
  Fieldwork: 'fieldwork',
  Practical: 'practical',
} as const;
export type AssignmentType = (typeof AssignmentType)[keyof typeof AssignmentType];

/** Lifecycle status of an assignment */
export const AssignmentStatus = {
  Draft: 'draft',
  Published: 'published',
  Active: 'active',
  SubmissionOpen: 'submission_open',
  SubmissionClosed: 'submission_closed',
  Grading: 'grading',
  Graded: 'graded',
  Returned: 'returned',
  Archived: 'archived',
} as const;
export type AssignmentStatus = (typeof AssignmentStatus)[keyof typeof AssignmentStatus];

/** Who can see / access the assignment */
export const AssignmentVisibility = {
  Public: 'public',
  Enrolled: 'enrolled',
  Group: 'group',
  Private: 'private',
  AdminOnly: 'admin_only',
} as const;
export type AssignmentVisibility = (typeof AssignmentVisibility)[keyof typeof AssignmentVisibility];

/** How a learner submits work */
export const SubmissionType = {
  File: 'file',
  Text: 'text',
  URL: 'url',
  Code: 'code',
  Media: 'media',
  SCORM: 'scorm',
  MultipleFiles: 'multiple_files',
  RichText: 'rich_text',
  Link: 'link',
  Repository: 'repository',
} as const;
export type SubmissionType = (typeof SubmissionType)[keyof typeof SubmissionType];

/** Status of an individual submission */
export const SubmissionStatus = {
  NotSubmitted: 'not_submitted',
  Submitted: 'submitted',
  LateSubmission: 'late_submission',
  Grading: 'grading',
  Graded: 'graded',
  Returned: 'returned',
  Resubmitted: 'resubmitted',
  Exempted: 'exempted',
  Missing: 'missing',
  Cancelled: 'cancelled',
} as const;
export type SubmissionStatus = (typeof SubmissionStatus)[keyof typeof SubmissionStatus];

/** How grading is computed */
export const GradingMethod = {
  Numeric: 'numeric',
  Letter: 'letter',
  Percentage: 'percentage',
  PassFail: 'pass_fail',
  rubric: 'rubric',
  CompleteIncomplete: 'complete_incomplete',
  points: 'points',
  gpa: 'gpa',
  competency: 'competency',
  portfolio: 'portfolio',
} as const;
export type GradingMethod = (typeof GradingMethod)[keyof typeof GradingMethod];

/** Standard grading scale */
export const GradingScale = {
  French20: 'french_20',
  Percentage: 'percentage',
  Letter: 'letter',
  GPA4: 'gpa_4',
  GPA5: 'gpa_5',
  PassFail: 'pass_fail',
  Competency: 'competency',
  Custom: 'custom',
} as const;
export type GradingScale = (typeof GradingScale)[keyof typeof GradingScale];

/** Delivery channel for feedback */
export const FeedbackType = {
  Inline: 'inline',
  Audio: 'audio',
  Video: 'video',
  Rubric: 'rubric',
  Comment: 'comment',
  File: 'file',
  Automated: 'automated',
  Peer: 'peer',
} as const;
export type FeedbackType = (typeof FeedbackType)[keyof typeof FeedbackType];

/** Depth of a rubric criterion level */
export const RubricLevel = {
  Exemplary: 'exemplary',
  Proficient: 'proficient',
  Developing: 'developing',
  Beginning: 'beginning',
  NotAchieved: 'not_achieved',
  NotApplicable: 'not_applicable',
} as const;
export type RubricLevel = (typeof RubricLevel)[keyof typeof RubricLevel];

/** Status of a peer review round */
export const ReviewStatus = {
  Pending: 'pending',
  Assigned: 'assigned',
  InProgress: 'in_progress',
  Completed: 'completed',
  Disputed: 'disputed',
  Overridden: 'overridden',
} as const;
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];

/** Status of a group assignment */
export const GroupStatus = {
  Forming: 'forming',
  Formed: 'formed',
  Active: 'active',
  Submitted: 'submitted',
  Graded: 'graded',
  Dissolved: 'dissolved',
} as const;
export type GroupStatus = (typeof GroupStatus)[keyof typeof GroupStatus];

// ============================================================================
// ENUMS — QUIZZES & EXAMS
// ============================================================================

/** Structural type of a quiz */
export const QuizType = {
  Practice: 'practice',
  Graded: 'graded',
  Diagnostic: 'diagnostic',
  Adaptive: 'adaptive',
  Certification: 'certification',
  Survey: 'survey',
  Flashcard: 'flashcard',
  Placement: 'placement',
  Poll: 'poll',
} as const;
export type QuizType = (typeof QuizType)[keyof typeof QuizType];

/** Lifecycle status of a quiz */
export const QuizStatus = {
  Draft: 'draft',
  Published: 'published',
  Active: 'active',
  Paused: 'paused',
  Archived: 'archived',
  Retired: 'retired',
} as const;
export type QuizStatus = (typeof QuizStatus)[keyof typeof QuizStatus];

/** Difficulty tier of a quiz */
export const QuizDifficulty = {
  VeryEasy: 'very_easy',
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
  VeryHard: 'very_hard',
  Adaptive: 'adaptive',
} as const;
export type QuizDifficulty = (typeof QuizDifficulty)[keyof typeof QuizDifficulty];

/** Question structural type */
export const QuestionType = {
  MultipleChoice: 'multiple_choice',
  TrueFalse: 'true_false',
  ShortAnswer: 'short_answer',
  LongAnswer: 'long_answer',
  Matching: 'matching',
  Ordering: 'ordering',
  FillInTheBlank: 'fill_in_the_blank',
  Numeric: 'numeric',
  Date: 'date',
  Hotspot: 'hotspot',
  DragAndDrop: 'drag_and_drop',
  Code: 'code',
  Essay: 'essay',
  AudioResponse: 'audio_response',
  VideoResponse: 'video_response',
  FileUpload: 'file_upload',
  Matrix: 'matrix',
  Likert: 'likert',
  Ranking: 'ranking',
  Clustering: 'clustering',
} as const;
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

/** Answer rendering format */
export const QuestionFormat = {
  Text: 'text',
  RichText: 'rich_text',
  Markdown: 'markdown',
  HTML: 'html',
  LaTeX: 'latex',
  Code: 'code',
  Image: 'image',
  Audio: 'audio',
  Video: 'video',
} as const;
export type QuestionFormat = (typeof QuestionFormat)[keyof typeof QuestionFormat];

/** How an answer is evaluated */
export const AnswerType = {
  ExactMatch: 'exact_match',
  Contains: 'contains',
  Regex: 'regex',
  Numeric: 'numeric',
  Range: 'range',
  Manual: 'manual',
  Rubric: 'rubric',
  CodeExecution: 'code_execution',
  SemanticSimilarity: 'semantic_similarity',
  AIEvaluated: 'ai_evaluated',
} as const;
export type AnswerType = (typeof AnswerType)[keyof typeof AnswerType];

/** Adaptive test routing model */
export const AdaptiveTestType = {
  CAT: 'cat',
  MultiStage: 'multi_stage',
  VariableLength: 'variable_length',
  BranchAndBound: 'branch_and_bound',
  FixedForm: 'fixed_form',
} as const;
export type AdaptiveTestType = (typeof AdaptiveTestType)[keyof typeof AdaptiveTestType];

/** Examination structural type */
export const ExamType = {
  Final: 'final',
  Midterm: 'midterm',
  Placement: 'placement',
  Certification: 'certification',
  Practice: 'practice',
  Diagnostic: 'diagnostic',
  Comprehensive: 'comprehensive',
  Oral: 'oral',
  Practical: 'practical',
  OpenBook: 'open_book',
} as const;
export type ExamType = (typeof ExamType)[keyof typeof ExamType];

/** Lifecycle status of an exam sitting */
export const ExamStatus = {
  Scheduled: 'scheduled',
  InProgress: 'in_progress',
  Completed: 'completed',
  Grading: 'grading',
  Graded: 'graded',
  Cancelled: 'cancelled',
  Postponed: 'postponed',
} as const;
export type ExamStatus = (typeof ExamStatus)[keyof typeof ExamStatus];

/** Status of the grading process */
export const GradingStatus = {
  NotStarted: 'not_started',
  InProgress: 'in_progress',
  Completed: 'completed',
  UnderReview: 'under_review',
  Finalized: 'finalized',
  AppealPending: 'appeal_pending',
} as const;
export type GradingStatus = (typeof GradingStatus)[keyof typeof GradingStatus];

// ============================================================================
// ENUMS — CERTIFICATIONS & CREDENTIALS
// ============================================================================

/** Type of certificate issued */
export const CertificateType = {
  Course: 'course',
  Program: 'program',
  Competency: 'competency',
  Skill: 'skill',
  Attendance: 'attendance',
  Achievement: 'achievement',
  Industry: 'industry',
  University: 'university',
} as const;
export type CertificateType = (typeof CertificateType)[keyof typeof CertificateType];

/** Classification of a digital badge */
export const BadgeType2 = {
  Skill: 'skill',
  Achievement: 'achievement',
  Participation: 'participation',
  Milestone: 'milestone',
  Leaderboard: 'leaderboard',
  Social: 'social',
  Custom: 'custom',
} as const;
export type BadgeType2 = (typeof BadgeType2)[keyof typeof BadgeType2];

/** Micro-credential lifecycle status */
export const MicroCredentialStatus = {
  Draft: 'draft',
  Published: 'published',
  Active: 'active',
  Expired: 'expired',
  Revoked: 'revoked',
  Superseded: 'superseded',
} as const;
export type MicroCredentialStatus = (typeof MicroCredentialStatus)[keyof typeof MicroCredentialStatus];

/** Competency assessment status */
export const CompetencyStatus = {
  NotStarted: 'not_started',
  InProgress: 'in_progress',
  Achieved: 'achieved',
  Maintained: 'maintained',
  Expired: 'expired',
  Revoked: 'revoked',
} as const;
export type CompetencyStatus = (typeof CompetencyStatus)[keyof typeof CompetencyStatus];

/** Skill domain category */
export const SkillCategory = {
  Technical: 'technical',
  Soft: 'soft',
  Leadership: 'leadership',
  Creative: 'creative',
  Analytical: 'analytical',
  Communication: 'communication',
  Digital: 'digital',
  Language: 'language',
  Domain: 'domain',
  Professional: 'professional',
} as const;
export type SkillCategory = (typeof SkillCategory)[keyof typeof SkillCategory];

/** How a credential is verified */
export const VerificationMethod = {
  QRCode: 'qr_code',
  Blockchain: 'blockchain',
  API: 'api',
  Manual: 'manual',
  Email: 'email',
  DigitalSignature: 'digital_signature',
  Hash: 'hash',
} as const;
export type VerificationMethod = (typeof VerificationMethod)[keyof typeof VerificationMethod];

/** Blockchain anchoring status */
export const BlockchainStatus = {
  Pending: 'pending',
  Anchored: 'anchored',
  Confirmed: 'confirmed',
  Failed: 'failed',
  Expired: 'expired',
} as const;
export type BlockchainStatus = (typeof BlockchainStatus)[keyof typeof BlockchainStatus];

/** QR code verification status */
export const QRCodeStatus = {
  Generated: 'generated',
  Active: 'active',
  Scanned: 'scanned',
  Expired: 'expired',
  Revoked: 'revoked',
} as const;
export type QRCodeStatus = (typeof QRCodeStatus)[keyof typeof QRCodeStatus];

/** Credential expiry type */
export const ExpirationType = {
  Never: 'never',
  FixedDate: 'fixed_date',
  Duration: 'duration',
  Rolling: 'rolling',
  ActivityBased: 'activity_based',
} as const;
export type ExpirationType = (typeof ExpirationType)[keyof typeof ExpirationType];

/** Renewal tracking status */
export const RenewalStatus = {
  NotRequired: 'not_required',
  Due: 'due',
  InProgress: 'in_progress',
  Completed: 'completed',
  Overdue: 'overdue',
  Waived: 'waived',
} as const;
export type RenewalStatus = (typeof RenewalStatus)[keyof typeof RenewalStatus];

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

// ============================================================================
// INTERFACES — ASSIGNMENTS
// ============================================================================

/** Core assignment entity */
export interface Assignment {
  readonly id: string;
  readonly courseId: string;
  readonly moduleId?: string;
  title: string;
  description: string;
  instructions?: string;
  assignmentType: AssignmentType;
  status: AssignmentStatus;
  visibility: AssignmentVisibility;
  submissionType: SubmissionType;
  gradingMethod: GradingMethod;
  gradingScale?: GradingScale;
  maxScore: number;
  passingScore?: number;
  weight: number;
  dueDate: string;
  allowLateSubmission: boolean;
  latePenaltyPercent?: number;
  latePenaltyPerDay?: number;
  maxAttempts: number;
  isGroupAssignment: boolean;
  groupSize?: number;
  rubricId?: string;
  attachments: readonly AssignmentAttachment[];
  learningObjectives: readonly string[];
  estimatedMinutes?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/** Attachment file on an assignment */
export interface AssignmentAttachment {
  readonly id: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes: number;
  mimeType: string;
  uploadedAt: string;
}

/** Payload to create an assignment */
export interface AssignmentCreate {
  readonly courseId: string;
  readonly moduleId?: string;
  title: string;
  description: string;
  instructions?: string;
  assignmentType: AssignmentType;
  status?: AssignmentStatus;
  visibility?: AssignmentVisibility;
  submissionType: SubmissionType;
  gradingMethod: GradingMethod;
  gradingScale?: GradingScale;
  maxScore: number;
  passingScore?: number;
  weight: number;
  dueDate: string;
  allowLateSubmission?: boolean;
  latePenaltyPercent?: number;
  latePenaltyPerDay?: number;
  maxAttempts?: number;
  isGroupAssignment?: boolean;
  groupSize?: number;
  rubricId?: string;
  attachments?: readonly AssignmentAttachment[];
  learningObjectives?: readonly string[];
  estimatedMinutes?: number;
}

/** Payload to update an assignment */
export interface AssignmentUpdate {
  title?: string;
  description?: string;
  instructions?: string;
  assignmentType?: AssignmentType;
  status?: AssignmentStatus;
  visibility?: AssignmentVisibility;
  submissionType?: SubmissionType;
  gradingMethod?: GradingMethod;
  gradingScale?: GradingScale;
  maxScore?: number;
  passingScore?: number;
  weight?: number;
  dueDate?: string;
  allowLateSubmission?: boolean;
  latePenaltyPercent?: number;
  latePenaltyPerDay?: number;
  maxAttempts?: number;
  isGroupAssignment?: boolean;
  groupSize?: number;
  rubricId?: string;
  attachments?: readonly AssignmentAttachment[];
  learningObjectives?: readonly string[];
  estimatedMinutes?: number;
}

/** Query parameters for listing assignments */
export interface AssignmentQuery {
  search?: string;
  courseId?: string;
  moduleId?: string;
  assignmentType?: AssignmentType | 'all';
  status?: AssignmentStatus | 'all';
  visibility?: AssignmentVisibility | 'all';
  gradingMethod?: GradingMethod | 'all';
  isGroupAssignment?: boolean;
  dueDateFrom?: string;
  dueDateTo?: string;
  createdAfter?: string;
  createdBefore?: string;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'dueDate' | 'createdAt' | 'weight';
  sortOrder?: 'asc' | 'desc';
}

/** A homework-style assignment */
export interface Homework {
  readonly id: string;
  readonly assignmentId: string;
  instructions: string;
  estimatedMinutes: number;
  resources: readonly HomeworkResource[];
  difficultyLevel: 'easy' | 'medium' | 'hard';
  allowCollaboration: boolean;
  autoGrade: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Supplementary resource for a homework */
export interface HomeworkResource {
  readonly id: string;
  title: string;
  url: string;
  type: 'document' | 'video' | 'link' | 'code';
}

/** A project-based assignment */
export interface Project {
  readonly id: string;
  readonly assignmentId: string;
  projectScope: string;
  deliverables: readonly string[];
  milestones: readonly ProjectMilestone[];
  teamSizeMin?: number;
  teamSizeMax?: number;
  presentationRequired: boolean;
  repoUrl?: string;
  deploymentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/** A milestone within a project */
export interface ProjectMilestone {
  readonly id: string;
  title: string;
  description?: string;
  dueDate: string;
  weight: number;
  deliverables: readonly string[];
  isCompleted: boolean;
}

/** Case study assignment */
export interface CaseStudy {
  readonly id: string;
  readonly assignmentId: string;
  industryContext: string;
  problemStatement: string;
  dataProvided?: string;
  expectedAnalysis: string;
  wordLimit?: number;
  referencesRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Lab / practical work assignment */
export interface LabWork {
  readonly id: string;
  readonly assignmentId: string;
  labEnvironment: string;
  preRequisites: readonly string[];
  steps: readonly LabStep[];
  reportRequired: boolean;
  reportTemplateUrl?: string;
  sandboxUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/** A step within a lab */
export interface LabStep {
  readonly id: string;
  stepNumber: number;
  title: string;
  instructions: string;
  expectedOutput?: string;
  hints?: readonly string[];
  validationCommand?: string;
}

/** Portfolio assignment */
export interface Portfolio {
  readonly id: string;
  readonly assignmentId: string;
  requiredSections: readonly PortfolioSection[];
  minPieces: number;
  maxPieces: number;
  reflectiveComponentRequired: boolean;
  presentationFormat: 'online' | 'physical' | 'both';
  createdAt: string;
  updatedAt: string;
}

/** Required section of a portfolio */
export interface PortfolioSection {
  readonly id: string;
  name: string;
  description?: string;
  minItems: number;
  maxItems?: number;
  requiredMediaType?: readonly string[];
  rubricCriteria: readonly string[];
}

/** Rubric template for grading */
export interface Rubric {
  readonly id: string;
  readonly courseId?: string;
  readonly assignmentId?: string;
  title: string;
  description?: string;
  criteria: readonly RubricCriterion[];
  totalPoints: number;
  isPublished: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/** A single criterion in a rubric */
export interface RubricCriterion {
  readonly id: string;
  name: string;
  description: string;
  weight: number;
  maxPoints: number;
  levels: readonly RubricLevelInterface[];
}

/** A performance level for a rubric criterion */
export interface RubricLevelInterface {
  readonly id: string;
  level: RubricLevel;
  title: string;
  description: string;
  points: number;
  examples?: readonly string[];
}

/** Peer review assignment configuration */
export interface PeerReview {
  readonly id: string;
  readonly assignmentId: string;
  reviewCount: number;
  anonymousReview: boolean;
  selfReview: boolean;
  rubricId?: string;
  minWords: number;
  calibrationRequired: boolean;
  calibrationQuizId?: string;
  reviewsPerSubmission: number;
  distributionStrategy: 'random' | 'manual' | 'round_robin' | 'smart';
  createdAt: string;
  updatedAt: string;
}

/** A group-based assignment */
export interface GroupAssignment {
  readonly id: string;
  readonly assignmentId: string;
  groupId: string;
  groupName: string;
  members: readonly GroupAssignmentMember[];
  groupScore?: number;
  individualContributions?: readonly IndividualContribution[];
  status: GroupStatus;
  createdAt: string;
  updatedAt: string;
}

/** Member of a group assignment */
export interface GroupAssignmentMember {
  readonly userId: string;
  userName: string;
  role: 'leader' | 'member' | 'reviewer';
  joinedAt: string;
}

/** Individual contribution record */
export interface IndividualContribution {
  readonly userId: string;
  contributionScore: number;
  peerRating?: number;
  notes?: string;
}

// ============================================================================
// INTERFACES — SUBMISSIONS & GRADING
// ============================================================================

/** A learner's submission */
export interface Submission {
  readonly id: string;
  readonly assignmentId: string;
  readonly userId: string;
  userName?: string;
  submissionType: SubmissionType;
  status: SubmissionStatus;
  attemptNumber: number;
  content?: string;
  fileUrl?: string;
  fileUrls?: readonly string[];
  repositoryUrl?: string;
  submittedAt: string;
  gradedAt?: string;
  gradedBy?: string;
  score?: number;
  maxScore: number;
  percentage?: number;
  letterGrade?: string;
  passed: boolean;
  feedback?: SubmissionFeedback;
  isLate: boolean;
  latePenaltyApplied: number;
  turnitinScore?: number;
  aiDetectionScore?: number;
  comments: readonly SubmissionComment[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a submission */
export interface SubmissionCreate {
  readonly assignmentId: string;
  submissionType: SubmissionType;
  content?: string;
  fileUrl?: string;
  fileUrls?: readonly string[];
  repositoryUrl?: string;
  metadata?: Record<string, unknown>;
}

/** Feedback on a submission */
export interface SubmissionFeedback {
  overallComment?: string;
  grade?: number;
  letterGrade?: string;
  rubricScores?: readonly RubricScoreEntry[];
  inlineComments: readonly InlineComment[];
  audioFeedbackUrl?: string;
  videoFeedbackUrl?: string;
  files: readonly FeedbackFile[];
  givenBy: string;
  givenAt: string;
}

/** Rubric score for a single criterion */
export interface RubricScoreEntry {
  readonly criterionId: string;
  criterionName: string;
  selectedLevelId: string;
  points: number;
  comment?: string;
}

/** Inline comment on submission content */
export interface InlineComment {
  readonly id: string;
  content: string;
  anchor?: string;
  startIndex?: number;
  endIndex?: number;
  position?: { x: number; y: number };
  authorId: string;
  authorName: string;
  createdAt: string;
}

/** Feedback file attachment */
export interface FeedbackFile {
  readonly id: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes: number;
}

/** Comment thread on a submission */
export interface SubmissionComment {
  readonly id: string;
  userId: string;
  userName: string;
  content: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

/** Late submission policy */
export interface LatePolicy {
  readonly id: string;
  readonly courseId: string;
  allowLateSubmission: boolean;
  gracePeriodHours: number;
  penaltyType: 'percentage' | 'points' | 'fixed_per_day' | 'none';
  penaltyValue: number;
  maxLateDays: number;
  autoDeduct: boolean;
  notifyStudent: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Specific late penalty calculation */
export interface LatePenalty {
  readonly submissionId: string;
  hoursLate: number;
  daysLate: number;
  penaltyType: 'percentage' | 'points' | 'fixed_per_day';
  penaltyValue: number;
  totalPenalty: number;
  finalScore: number;
  calculatedAt: string;
}

// ============================================================================
// INTERFACES — QUIZZES & EXAMS
// ============================================================================

/** Core quiz entity */
export interface Quiz {
  readonly id: string;
  readonly courseId: string;
  readonly moduleId?: string;
  title: string;
  description?: string;
  instructions?: string;
  quizType: QuizType;
  status: QuizStatus;
  difficulty: QuizDifficulty;
  timeLimitMinutes?: number;
  timeLimitType: 'per_quiz' | 'per_question' | 'none';
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showCorrectAnswers: 'always' | 'after_submission' | 'after_deadline' | 'never';
  showScore: 'always' | 'after_submission' | 'after_deadline' | 'never';
  allowReview: boolean;
  showExplanations: boolean;
  questions: readonly Question[];
  totalPoints: number;
  questionCount: number;
  tags: readonly string[];
  startDate?: string;
  endDate?: string;
  proctoringEnabled: boolean;
  lockdownEnabled: boolean;
  ipAddressRestriction?: readonly string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/** Payload to create a quiz */
export interface QuizCreate {
  readonly courseId: string;
  readonly moduleId?: string;
  title: string;
  description?: string;
  instructions?: string;
  quizType: QuizType;
  status?: QuizStatus;
  difficulty?: QuizDifficulty;
  timeLimitMinutes?: number;
  timeLimitType?: 'per_quiz' | 'per_question' | 'none';
  passingScore?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showCorrectAnswers?: 'always' | 'after_submission' | 'after_deadline' | 'never';
  showScore?: 'always' | 'after_submission' | 'after_deadline' | 'never';
  allowReview?: boolean;
  showExplanations?: boolean;
  tags?: readonly string[];
  startDate?: string;
  endDate?: string;
  proctoringEnabled?: boolean;
  lockdownEnabled?: boolean;
}

/** Payload to update a quiz */
export interface QuizUpdate {
  title?: string;
  description?: string;
  instructions?: string;
  quizType?: QuizType;
  status?: QuizStatus;
  difficulty?: QuizDifficulty;
  timeLimitMinutes?: number;
  timeLimitType?: 'per_quiz' | 'per_question' | 'none';
  passingScore?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showCorrectAnswers?: 'always' | 'after_submission' | 'after_deadline' | 'never';
  showScore?: 'always' | 'after_submission' | 'after_deadline' | 'never';
  allowReview?: boolean;
  showExplanations?: boolean;
  tags?: readonly string[];
  startDate?: string;
  endDate?: string;
  proctoringEnabled?: boolean;
  lockdownEnabled?: boolean;
}

/** A reusable question bank */
export interface QuestionBank {
  readonly id: string;
  readonly courseId?: string;
  name: string;
  description?: string;
  tags: readonly string[];
  questionCount: number;
  isShared: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/** A single quiz question */
export interface Question {
  readonly id: string;
  readonly quizId?: string;
  readonly questionBankId?: string;
  questionType: QuestionType;
  format: QuestionFormat;
  answerType: AnswerType;
  questionText: string;
  questionHtml?: string;
  questionMediaUrl?: string;
  options: readonly QuestionOption[];
  correctAnswer?: string | readonly string[];
  explanation?: string;
  explanationMediaUrl?: string;
  points: number;
  difficulty: QuizDifficulty;
  tags: readonly string[];
  timeLimitSeconds?: number;
  caseSensitive: boolean;
  allowPartialCredit: boolean;
  partialCreditPercent?: number;
  regexPattern?: string;
  numericMin?: number;
  numericMax?: number;
  matchingPairs?: readonly MatchingPair[];
  orderingItems?: readonly OrderingItem[];
  codingLanguage?: string;
  codeTemplate?: string;
  testCases?: readonly TestCase[];
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a question */
export interface QuestionCreate {
  questionType: QuestionType;
  format?: QuestionFormat;
  answerType?: AnswerType;
  questionText: string;
  questionHtml?: string;
  questionMediaUrl?: string;
  options?: readonly QuestionOption[];
  correctAnswer?: string | readonly string[];
  explanation?: string;
  explanationMediaUrl?: string;
  points?: number;
  difficulty?: QuizDifficulty;
  tags?: readonly string[];
  timeLimitSeconds?: number;
  caseSensitive?: boolean;
  allowPartialCredit?: boolean;
  partialCreditPercent?: number;
  regexPattern?: string;
  numericMin?: number;
  numericMax?: number;
  matchingPairs?: readonly MatchingPair[];
  orderingItems?: readonly OrderingItem[];
  codingLanguage?: string;
  codeTemplate?: string;
  testCases?: readonly TestCase[];
}

/** An answer option for a question */
export interface QuestionOption {
  readonly id: string;
  text: string;
  html?: string;
  mediaUrl?: string;
  isCorrect: boolean;
  sortOrder: number;
  explanation?: string;
}

/** A matching pair for matching questions */
export interface MatchingPair {
  readonly id: string;
  left: string;
  right: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
}

/** An item for ordering questions */
export interface OrderingItem {
  readonly id: string;
  text: string;
  mediaUrl?: string;
  correctPosition: number;
}

/** A test case for coding questions */
export interface TestCase {
  readonly id: string;
  label: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  timeLimitMs?: number;
  memoryLimitMb?: number;
}

/** Configuration for question randomisation */
export interface RandomizationConfig {
  readonly id: string;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  questionPoolSize?: number;
  questionPoolSource?: 'all' | 'tagged' | 'difficulty';
  questionPoolTags?: readonly string[];
  questionPoolDifficulty?: QuizDifficulty;
  seed?: number;
  preventRepeat: boolean;
}

/** Adaptive test configuration */
export interface AdaptiveTest {
  readonly id: string;
  readonly quizId: string;
  adaptiveType: AdaptiveTestType;
  initialDifficulty: QuizDifficulty;
  stoppingCriteria: AdaptiveStoppingCriteria;
  itemBank: readonly string[];
  routingAlgorithm: string;
  thetaEstimationMethod: 'mle' | 'eap' | 'cmle';
  infoFunction: 'Fisher' | 'KullbackLeibler' | 'KullbackLeibler2';
  minQuestions: number;
  maxQuestions: number;
  targetSE: number;
  createdAt: string;
  updatedAt: string;
}

/** Stopping criteria for adaptive tests */
export interface AdaptiveStoppingCriteria {
  maxItems: number;
  targetSE: number;
  targetScore?: number;
  confidenceLevel?: number;
  minItems: number;
}

/** Practice exam (untimed, non-graded) */
export interface PracticeExam {
  readonly id: string;
  readonly quizId: string;
  showAnswersImmediately: boolean;
  allowUnlimitedAttempts: boolean;
  showHints: boolean;
  showProgress: boolean;
  trackPerformance: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Timed exam configuration */
export interface TimedExam {
  readonly id: string;
  readonly quizId: string;
  totalTimeMinutes: number;
  gracePeriodMinutes: number;
  autoSubmit: boolean;
  autoSaveIntervalSeconds: number;
  showTimer: boolean;
  showTimeWarning: boolean;
  timeWarningMinutes?: number;
  preventTabSwitch: boolean;
  preventCopyPaste: boolean;
  preventScreenCapture: boolean;
  webcamRequired: boolean;
  idVerification: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Auto-grading configuration */
export interface AutoGrading {
  readonly id: string;
  readonly quizId: string;
  enabled: boolean;
  instantFeedback: boolean;
  partialCredit: boolean;
  showCorrectAnswersAfter: 'never' | 'after_submission' | 'after_deadline';
  aiGradingEnabled: boolean;
  aiGradingModel?: string;
  confidenceThreshold?: number;
  manualReviewThreshold?: number;
  createdAt: string;
  updatedAt: string;
}

/** Manual grading queue entry */
export interface ManualGrading {
  readonly id: string;
  readonly submissionId: string;
  readonly questionId: string;
  readonly quizId: string;
  status: GradingStatus;
  assignedTo?: string;
  priority: number;
  score?: number;
  maxScore: number;
  feedback?: string;
  rubricScores?: readonly RubricScoreEntry[];
  gradedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Feedback entry for a quiz */
export interface QuizFeedback {
  readonly id: string;
  readonly quizId: string;
  feedbackType: FeedbackType;
  trigger: 'always' | 'correct' | 'incorrect' | 'after_deadline' | 'manual';
  content: string;
  mediaUrl?: string;
  relatedQuestionIds: readonly string[];
  sortOrder: number;
  createdAt: string;
}

/** Retake rule for a quiz */
export interface RetakeRule {
  readonly id: string;
  readonly quizId: string;
  maxAttempts: number;
  waitPeriodMinutes?: number;
  waitPeriodType: 'fixed' | 'exponential' | 'none';
  scoreStrategy: 'latest' | 'best' | 'average' | 'first';
  showPreviousAnswers: boolean;
  showPreviousScore: boolean;
  allowAfterDeadline: boolean;
  createdAt: string;
  updatedAt: string;
}

/** A quiz attempt by a learner */
export interface QuizAttempt {
  readonly id: string;
  readonly quizId: string;
  readonly userId: string;
  attemptNumber: number;
  status: 'in_progress' | 'completed' | 'timed_out' | 'abandoned' | 'flagged';
  startedAt: string;
  completedAt?: string;
  submittedAt?: string;
  timeSpentSeconds: number;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  answers: readonly QuizAnswer[];
  ip?: string;
  userAgent?: string;
  proctorNotes?: string;
  isFlagged: boolean;
  createdAt: string;
  updatedAt: string;
}

/** An individual answer within a quiz attempt */
export interface QuizAnswer {
  readonly id: string;
  readonly attemptId: string;
  readonly questionId: string;
  answer: string | readonly string[];
  isCorrect: boolean;
  pointsEarned: number;
  maxPoints: number;
  timeSpentSeconds: number;
  wasFlagged: boolean;
  feedback?: string;
  gradedBy?: 'auto' | 'manual' | 'ai';
  gradedAt?: string;
  createdAt: string;
}

// ============================================================================
// INTERFACES — CERTIFICATIONS & CREDENTIALS
// ============================================================================

/** Core certificate entity */
export interface Certificate {
  readonly id: string;
  readonly schoolId: string;
  readonly courseId?: string;
  readonly learningPathId?: string;
  title: string;
  description?: string;
  certificateType: CertificateType;
  status: CertificateStatus;
  templateId?: string;
  recipientUserId: string;
  recipientName: string;
  recipientEmail: string;
  issuedBy: string;
  issuedByName: string;
  issuedAt: string;
  expiresAt?: string;
  certificateNumber: string;
  verificationUrl: string;
  skillsCovered: readonly string[];
  competencies: readonly string[];
  issuedCourseTitle?: string;
  grade?: number;
  creditHours?: number;
  customFields: Record<string, unknown>;
  pdfUrl?: string;
  metadataUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a certificate */
export interface CertificateCreate {
  readonly schoolId: string;
  readonly courseId?: string;
  readonly learningPathId?: string;
  title: string;
  description?: string;
  certificateType: CertificateType;
  templateId?: string;
  recipientUserId: string;
  issuedBy: string;
  expiresAt?: string;
  skillsCovered?: readonly string[];
  competencies?: readonly string[];
  grade?: number;
  creditHours?: number;
  customFields?: Record<string, unknown>;
}

/** Digital badge entity */
export interface DigitalBadge {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description: string;
  badgeType: BadgeType2;
  imageUrl: string;
  criteria: string;
  issuerName: string;
  issuerUrl?: string;
  badgeClass?: string;
  alignment: readonly BadgeAlignment[];
  tags: readonly string[];
  expiryType: ExpirationType;
  expiresAt?: string;
  issuedTo?: string;
  issuedByName?: string;
  issuedAt?: string;
  revokedAt?: string;
  revokeReason?: string;
  createdAt: string;
  updatedAt: string;
}

/** Alignment with external standards */
export interface BadgeAlignment {
  readonly id: string;
  name: string;
  url: string;
  description?: string;
  framework?: string;
}

/** Payload to create a badge */
export interface BadgeCreate {
  readonly schoolId: string;
  name: string;
  description: string;
  badgeType: BadgeType2;
  imageUrl: string;
  criteria: string;
  issuerName: string;
  issuerUrl?: string;
  alignment?: readonly BadgeAlignment[];
  tags?: readonly string[];
  expiryType?: ExpirationType;
  expiresAt?: string;
}

/** Micro-credential entity */
export interface MicroCredential {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description: string;
  status: MicroCredentialStatus;
  credentialType: 'badge' | 'certificate' | 'digital_badge' | 'badge_and_certificate';
  issuerName: string;
  issuerUrl?: string;
  criteria: readonly MicroCredentialCriteria[];
  requiredAssessments: readonly string[];
  requiredCompetencies: readonly string[];
  requiredHours: number;
  expiryType: ExpirationType;
  expiryMonths?: number;
  stackable: boolean;
  pathwayIds: readonly string[];
  issuedCount: number;
  tags: readonly string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

/** Criteria for earning a micro-credential */
export interface MicroCredentialCriteria {
  readonly id: string;
  type: 'course' | 'competency' | 'skill' | 'assessment' | 'hours' | 'custom';
  name: string;
  description: string;
  targetId?: string;
  threshold?: number;
  isRequired: boolean;
}

/** Competency entity */
export interface Competency {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description: string;
  category: SkillCategory;
  framework?: string;
  frameworkCode?: string;
  parentCompetencyId?: string;
  level: CompetencyLevel;
  assessable: boolean;
  assessableMethods: readonly string[];
  relatedSkills: readonly string[];
  relatedCompetencies: readonly string[];
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Skill entity */
export interface Skill {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description: string;
  category: SkillCategory;
  proficiencyLevel: SkillLevel;
  relatedCompetencies: readonly string[];
  relatedSkills: readonly string[];
  assessable: boolean;
  endorsementsCount: number;
  verifiedCount: number;
  tags: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** Credential verification record */
export interface Verification {
  readonly id: string;
  readonly credentialId: string;
  credentialType: 'certificate' | 'badge' | 'micro_credential';
  verificationMethod: VerificationMethod;
  verificationCode: string;
  verifiedAt: string;
  verifiedBy?: string;
  ipAddress?: string;
  result: 'valid' | 'invalid' | 'revoked' | 'expired';
  details?: string;
  createdAt: string;
}

/** Blockchain verification anchoring */
export interface BlockchainVerification {
  readonly id: string;
  readonly credentialId: string;
  status: BlockchainStatus;
  chain: 'ethereum' | 'polygon' | 'hyperledger' | 'solana';
  transactionHash?: string;
  blockNumber?: number;
  smartContractAddress?: string;
  credentialHash: string;
  anchorDate?: string;
  confirmations: number;
  gasUsed?: number;
  networkFee?: number;
  createdAt: string;
  updatedAt: string;
}

/** QR code verification record */
export interface QRVerification {
  readonly id: string;
  readonly credentialId: string;
  status: QRCodeStatus;
  qrData: string;
  verificationUrl: string;
  generatedAt: string;
  expiresAt?: string;
  scanCount: number;
  lastScannedAt?: string;
  lastScannedIp?: string;
  createdAt: string;
  updatedAt: string;
}

/** Expiration tracking for a credential */
export interface Expiration {
  readonly id: string;
  readonly credentialId: string;
  expirationType: ExpirationType;
  issuedAt: string;
  expiresAt?: string;
  durationMonths?: number;
  lastActivityAt?: string;
  isExpired: boolean;
  reminderSentAt?: string;
  renewalInitiatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// INTERFACES — ASSIGNMENTS (SUPPORTING)
// ============================================================================

/** Paginated list result for assignments */
export interface AssignmentListResult {
  data: readonly Assignment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Bulk action on assignments */
export interface AssignmentBulkAction {
  action: 'publish' | 'archive' | 'delete' | 'duplicate' | 'set_due_date' | 'extend_deadline';
  assignmentIds: readonly string[];
  parameters?: Record<string, unknown>;
  initiatedBy: string;
  status: 'pending' | 'in_progress' | 'completed' | 'partial' | 'failed';
  resultCount?: number;
  errorCount?: number;
  createdAt: string;
}

/** Assignment extension request */
export interface AssignmentExtensionRequest {
  readonly id: string;
  readonly assignmentId: string;
  readonly userId: string;
  reason: string;
  requestedNewDeadline: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewNote?: string;
  reviewedAt?: string;
  createdAt: string;
}

/** Learner assignment summary */
export interface LearnerAssignmentSummary {
  readonly userId: string;
  readonly courseId: string;
  totalAssignments: number;
  submittedCount: number;
  gradedCount: number;
  missingCount: number;
  lateCount: number;
  averageScore: number;
  averagePercentage: number;
  totalWeightedScore: number;
  lastSubmittedAt?: string;
}

/** Assignment export */
export interface AssignmentExport {
  readonly id: string;
  readonly assignmentId: string;
  format: 'pdf' | 'csv' | 'json' | 'xlsx';
  includeSubmissions: boolean;
  includeGrades: boolean;
  includeFeedback: boolean;
  dateRange?: { start: string; end: string };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileUrl?: string;
  exportedBy: string;
  createdAt: string;
}

/** Assignment import */
export interface AssignmentImport {
  readonly id: string;
  readonly courseId: string;
  fileName: string;
  format: 'qti' | 'moodle' | 'canvas' | 'csv' | 'json';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'partial';
  totalItems: number;
  processedItems: number;
  successfulItems: number;
  failedItems: number;
  errors?: readonly ImportErrorEntry[];
  importedBy: string;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

/** A single import error */
export interface ImportErrorEntry {
  readonly itemIndex: number;
  readonly itemName: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/** Assignment analytics */
export interface AssignmentAnalytics {
  readonly assignmentId: string;
  totalStudents: number;
  submittedCount: number;
  gradedCount: number;
  missingCount: number;
  lateCount: number;
  averageScore: number;
  medianScore: number;
  standardDeviation: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
  averageTimeToSubmitHours: number;
  scoreDistribution: readonly ScoreDistribution[];
  submissionTimeline: readonly SubmissionTimelinePoint[];
  lastUpdated: string;
}

/** Score distribution bucket */
export interface ScoreDistribution {
  readonly range: string;
  readonly count: number;
  readonly percentage: number;
}

/** Submission timeline point */
export interface SubmissionTimelinePoint {
  readonly timestamp: string;
  readonly count: number;
}

/** Assignment rubric mapping */
export interface AssignmentRubricMapping {
  readonly assignmentId: string;
  readonly rubricId: string;
  criteriaWeights: readonly RubricCriterionWeight[];
  totalWeight: number;
  createdAt: string;
  updatedAt: string;
}

/** Weight for a rubric criterion */
export interface RubricCriterionWeight {
  readonly criterionId: string;
  weight: number;
  maxPoints: number;
}

/** Grading queue for instructors */
export interface GradingQueue {
  readonly courseId: string;
  readonly instructorId: string;
  pendingCount: number;
  inProgressCount: number;
  completedToday: number;
  oldestUngradedAt?: string;
  items: readonly GradingQueueItem[];
  updatedAt: string;
}

/** A single item in the grading queue */
export interface GradingQueueItem {
  readonly submissionId: string;
  readonly assignmentId: string;
  readonly assignmentTitle: string;
  readonly userId: string;
  readonly userName: string;
  submittedAt: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  estimatedGradingMinutes: number;
}

/** Grading batch operation */
export interface GradingBatch {
  readonly id: string;
  readonly courseId: string;
  readonly assignmentId: string;
  action: 'apply_rubric' | 'apply_curve' | 'apply_penalty' | 'return_all' | 'set_grade';
  parameters: Record<string, unknown>;
  affectedSubmissions: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  initiatedBy: string;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

/** Grading curve configuration */
export interface GradingCurve {
  readonly id: string;
  readonly courseId: string;
  readonly assignmentId?: string;
  curveType: 'linear' | 'logarithmic' | 'percentage' | 'custom';
  parameters: Record<string, number>;
  appliedAt: string;
  appliedBy: string;
  affectedCount: number;
}

/** Grade distribution for a course */
export interface GradeDistribution {
  readonly courseId: string;
  readonly periodId?: string;
  letterDistribution: readonly LetterGradeCount[];
  numericDistribution: readonly NumericGradeBucket[];
  mean: number;
  median: number;
  mode: number;
  standardDeviation: number;
  skewness: number;
  kurtosis: number;
  generatedAt: string;
}

/** Count of a letter grade */
export interface LetterGradeCount {
  readonly grade: string;
  readonly count: number;
  readonly percentage: number;
}

/** Numeric grade bucket */
export interface NumericGradeBucket {
  readonly min: number;
  readonly max: number;
  readonly count: number;
  readonly percentage: number;
}

// ============================================================================
// INTERFACES — QUIZZES & EXAMS (SUPPORTING)
// ============================================================================

/** Paginated list result for quizzes */
export interface QuizListResult {
  data: readonly Quiz[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Bulk action on quizzes */
export interface QuizBulkAction {
  action: 'publish' | 'archive' | 'delete' | 'duplicate' | 'shuffle' | 'reset_attempts';
  quizIds: readonly string[];
  parameters?: Record<string, unknown>;
  initiatedBy: string;
  status: 'pending' | 'in_progress' | 'completed' | 'partial' | 'failed';
  resultCount?: number;
  errorCount?: number;
  createdAt: string;
}

/** Quiz section (grouping of questions) */
export interface QuizSection {
  readonly id: string;
  readonly quizId: string;
  title: string;
  description?: string;
  sortOrder: number;
  questionIds: readonly string[];
  questionCount: number;
  timeLimitMinutes?: number;
  shuffleQuestions: boolean;
  requiredCorrectCount?: number;
  createdAt: string;
  updatedAt: string;
}

/** Quiz category */
export interface QuizCategory {
  readonly id: string;
  readonly courseId?: string;
  name: string;
  description?: string;
  parentId?: string;
  quizCount: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Question difficulty distribution */
export interface QuestionDifficultyDistribution {
  readonly quizId: string;
  veryEasy: number;
  easy: number;
  medium: number;
  hard: number;
  veryHard: number;
  averageDifficulty: number;
  totalQuestions: number;
}

/** Question tag statistics */
export interface QuestionTagStats {
  readonly tag: string;
  questionCount: number;
  averageCorrectRate: number;
  averageTimeSeconds: number;
  averageDifficulty: number;
}

/** Quiz analytics */
export interface QuizAnalytics {
  readonly quizId: string;
  totalAttempts: number;
  uniqueAttempters: number;
  averageScore: number;
  medianScore: number;
  standardDeviation: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
  averageTimeMinutes: number;
  completionRate: number;
  retakeRate: number;
  questionAnalysis: readonly QuestionAnalysis[];
  attemptDistribution: readonly AttemptDistribution[];
  lastUpdated: string;
}

/** Per-question analysis */
export interface QuestionAnalysis {
  readonly questionId: string;
  questionType: QuestionType;
  correctRate: number;
  averageTimeSeconds: number;
  discriminationIndex?: number;
  difficultyIndex?: number;
  skipRate: number;
  flagRate: number;
}

/** Attempt count distribution */
export interface AttemptDistribution {
  readonly attemptNumber: number;
  readonly count: number;
  readonly percentage: number;
}

/** Learner quiz summary */
export interface LearnerQuizSummary {
  readonly userId: string;
  readonly courseId: string;
  totalQuizzes: number;
  attemptedCount: number;
  passedCount: number;
  averageScore: number;
  bestScore: number;
  totalTimeMinutes: number;
  lastAttemptAt?: string;
}

/** Question bank query */
export interface QuestionBankQuery {
  search?: string;
  courseId?: string;
  questionType?: QuestionType | 'all';
  difficulty?: QuizDifficulty | 'all';
  tags?: readonly string[];
  minPoints?: number;
  maxPoints?: number;
  createdAfter?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'difficulty' | 'points' | 'correctRate';
  sortOrder?: 'asc' | 'desc';
}

/** Question bank statistics */
export interface QuestionBankStats {
  readonly bankId: string;
  totalQuestions: number;
  byType: readonly QuestionTypeCount[];
  byDifficulty: readonly QuestionDifficultyCount[];
  byTag: readonly QuestionTagCount[];
  averagePoints: number;
  averageCorrectRate: number;
  lastUpdated: string;
}

/** Question count by type */
export interface QuestionTypeCount {
  readonly type: string;
  readonly count: number;
}

/** Question count by difficulty */
export interface QuestionDifficultyCount {
  readonly difficulty: string;
  readonly count: number;
}

/** Question count by tag */
export interface QuestionTagCount {
  readonly tag: string;
  readonly count: number;
}

/** Question metadata */
export interface QuestionMetadata {
  readonly questionId: string;
  version: number;
  author: string;
  lastEditedBy: string;
  lastEditedAt: string;
  usageCount: number;
  averageCorrectRate: number;
  discriminationIndex?: number;
  difficultyIndex?: number;
  createdAt: string;
  updatedAt: string;
}

/** Question statistics */
export interface QuestionStatistics {
  readonly questionId: string;
  totalAttempts: number;
  correctCount: number;
  incorrectCount: number;
  skipCount: number;
  flagCount: number;
  correctRate: number;
  averageTimeSeconds: number;
  discriminationIndex?: number;
  difficultyIndex?: number;
  lastCalculatedAt: string;
}

/** Quiz export */
export interface QuizExport {
  readonly id: string;
  readonly quizId: string;
  format: 'qti' | 'pdf' | 'json' | 'csv' | 'moodle';
  includeAnswers: boolean;
  includeExplanations: boolean;
  includeStatistics: boolean;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileUrl?: string;
  exportedBy: string;
  createdAt: string;
}

/** Quiz import */
export interface QuizImport {
  readonly id: string;
  readonly courseId: string;
  fileName: string;
  format: 'qti' | 'moodle' | 'canvas' | 'blackboard' | 'json';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'partial';
  totalQuestions: number;
  importedQuestions: number;
  failedQuestions: number;
  errors?: readonly ImportErrorEntry[];
  importedBy: string;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

/** Exam schedule */
export interface ExamSchedule {
  readonly id: string;
  readonly courseId: string;
  readonly quizId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  room?: string;
  building?: string;
  proctorId?: string;
  maxCapacity: number;
  enrolledCount: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** Exam proctor */
export interface ExamProctor {
  readonly id: string;
  readonly userId: string;
  userName: string;
  proctorType: 'in_person' | 'online' | 'ai_assisted';
  qualifications: readonly string[];
  assignedExams: readonly string[];
  totalProctoredSessions: number;
  rating?: number;
  createdAt: string;
}

/** Exam session record */
export interface ExamSession {
  readonly id: string;
  readonly examScheduleId: string;
  readonly userId: string;
  readonly proctorId?: string;
  startedAt: string;
  endedAt?: string;
  durationMinutes: number;
  status: 'in_progress' | 'completed' | 'disconnected' | 'terminated';
  integrityFlags: readonly string[];
  ip?: string;
  webcamSnapshots?: readonly string[];
  screenRecordings?: readonly string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** Assessment calibration entry */
export interface AssessmentCalibration {
  readonly id: string;
  readonly assignmentId: string;
  readonly graderId: string;
  sampleSubmissionIds: readonly string[];
  expectedScores: readonly number[];
  actualScores: readonly number[];
  accuracyPercent: number;
  calibrationStatus: 'pending' | 'in_progress' | 'completed' | 'passed' | 'failed';
  calibratedAt?: string;
  createdAt: string;
}

/** Quiz calibration entry */
export interface QuizCalibration {
  readonly id: string;
  readonly quizId: string;
  readonly graderId: string;
  sampleQuestionIds: readonly string[];
  accuracyPercent: number;
  calibrationStatus: 'pending' | 'completed' | 'passed' | 'failed';
  calibratedAt?: string;
  createdAt: string;
}

/** Learner quiz performance summary */
export interface LearnerQuizPerformance {
  readonly userId: string;
  readonly quizId: string;
  totalAttempts: number;
  bestScore: number;
  latestScore: number;
  averageScore: number;
  totalTimeMinutes: number;
  lastAttemptAt: string;
  passed: boolean;
  improvementRate: number;
}

// ============================================================================
// INTERFACES — CERTIFICATIONS (SUPPORTING)
// ============================================================================

/** Certificate template */
export interface CertificateTemplate {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description?: string;
  templateHtml: string;
  templateCss?: string;
  backgroundImageUrl?: string;
  logoUrl?: string;
  signatureUrl?: string;
  stampUrl?: string;
  fields: readonly CertificateTemplateField[];
  isDefault: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

/** A placeholder field in a certificate template */
export interface CertificateTemplateField {
  readonly id: string;
  fieldName: string;
  fieldType: 'text' | 'date' | 'number' | 'image' | 'qr_code';
  label: string;
  defaultValue?: string;
  isRequired: boolean;
}

/** Badge template */
export interface BadgeTemplate {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description?: string;
  imageUrl: string;
  criteriaTemplate: string;
  category: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  isDefault: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Paginated list result for certificates */
export interface CertificateListResult {
  data: readonly Certificate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Paginated list result for badges */
export interface BadgeListResult {
  data: readonly DigitalBadge[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Paginated list result for rubrics */
export interface RubricListResult {
  data: readonly Rubric[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Certificate revocation log */
export interface CertificateRevocationLog {
  readonly id: string;
  readonly certificateId: string;
  revokedBy: string;
  reason: string;
  revokedAt: string;
  notificationSent: boolean;
  blockchainRevoked: boolean;
}

/** Badge award log */
export interface BadgeAwardLog {
  readonly id: string;
  readonly badgeId: string;
  readonly userId: string;
  awardedBy: string;
  awardReason: string;
  awardedAt: string;
  isAutomatic: boolean;
}

/** Micro-credential award log */
export interface MicroCredentialAwardLog {
  readonly id: string;
  readonly microCredentialId: string;
  readonly userId: string;
  awardedBy: string;
  awardReason: string;
  awardedAt: string;
  criteriaMet: readonly string[];
}

/** Certificate revocation request */
export interface CertificateRevocationRequest {
  readonly certificateId: string;
  reason: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

/** Badge revocation request */
export interface BadgeRevocationRequest {
  readonly badgeId: string;
  readonly userId: string;
  reason: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

/** Competency assessment result */
export interface CompetencyAssessmentResult {
  readonly id: string;
  readonly competencyId: string;
  readonly userId: string;
  readonly assessedBy: string;
  score: number;
  maxScore: number;
  level: CompetencyLevel;
  evidence: readonly string[];
  feedback?: string;
  assessedAt: string;
  validUntil?: string;
  createdAt: string;
}

/** Skill assessment result */
export interface SkillAssessmentResult {
  readonly id: string;
  readonly skillId: string;
  readonly userId: string;
  assessedBy: string;
  proficiencyLevel: SkillLevel;
  evidence: readonly string[];
  endorsements: readonly string[];
  feedback?: string;
  assessedAt: string;
  validUntil?: string;
  createdAt: string;
}

/** Certification renewal reminder */
export interface CertificationRenewalReminder {
  readonly id: string;
  readonly credentialId: string;
  readonly userId: string;
  reminderType: 'email' | 'notification' | 'both';
  sentAt: string;
  expiresAt: string;
  actionTaken: boolean;
  actionTakenAt?: string;
}

/** Assignment query result */
export interface AssignmentQueryResult {
  data: readonly Assignment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Quiz query result */
export interface QuizQueryResult {
  data: readonly Quiz[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Submission query result */
export interface SubmissionQueryResult {
  data: readonly Submission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Certificate query result */
export interface CertificateQueryResult {
  data: readonly Certificate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Assessment analytics summary */
export interface AssessmentAnalytics {
  readonly courseId: string;
  totalAssignments: number;
  totalQuizzes: number;
  totalExams: number;
  averageAssignmentScore: number;
  averageQuizScore: number;
  averageExamScore: number;
  overallPassRate: number;
  averageSubmissionTimeHours: number;
  lateSubmissionRate: number;
  gradeTrend: readonly TimeSeriesDataPoint[];
  topPerformers: readonly TopPerformerStat[];
  strugglingLearners: readonly StrugglingLearnerStat[];
  generatedAt: string;
}

/** Time-series data point */
export interface TimeSeriesDataPoint {
  readonly date: string;
  readonly value: number;
}

/** Top performer statistic */
export interface TopPerformerStat {
  readonly userId: string;
  readonly userName: string;
  averageScore: number;
  completedCount: number;
}

/** Struggling learner statistic */
export interface StrugglingLearnerStat {
  readonly userId: string;
  readonly userName: string;
  averageScore: number;
  missingCount: number;
  riskLevel: 'low' | 'medium' | 'high';
}
