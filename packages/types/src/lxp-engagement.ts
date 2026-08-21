// Phase 2.7: Learning Experience Platform — Live Learning, Social, Analytics, Gamification & Marketplace

// ============================================================================
// ENUMS — LIVE LEARNING
// ============================================================================

/** Status of a live session */
export const LiveSessionStatus = {
  Scheduled: 'scheduled',
  WaitingRoom: 'waiting_room',
  Live: 'live',
  Paused: 'paused',
  Ended: 'ended',
  Cancelled: 'cancelled',
  Recording: 'recording',
  Processing: 'processing',
} as const;
export type LiveSessionStatus = (typeof LiveSessionStatus)[keyof typeof LiveSessionStatus];

/** Structural type of a live session */
export const LiveSessionType = {
  Lecture: 'lecture',
  Workshop: 'workshop',
  Seminar: 'seminar',
  OfficeHours: 'office_hours',
  Tutoring: 'tutoring',
  Exam: 'exam',
  Discussion: 'discussion',
  Lab: 'lab',
  GuestSpeaker: 'guest_speaker',
  AMA: 'ama',
  CoWorking: 'co_working',
  Celebration: 'celebration',
} as const;
export type LiveSessionType = (typeof LiveSessionType)[keyof typeof LiveSessionType];

/** Attendance tracking status */
export const AttendanceStatus = {
  Registered: 'registered',
  Present: 'present',
  Late: 'late',
  Absent: 'absent',
  Excused: 'excused',
  LeftEarly: 'left_early',
  OnBreak: 'on_break',
  Rejoined: 'rejoined',
} as const;
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

/** Whiteboard annotation tools */
export const WhiteboardTool = {
  Pen: 'pen',
  Highlighter: 'highlighter',
  Eraser: 'eraser',
  Text: 'text',
  Line: 'line',
  Arrow: 'arrow',
  Rectangle: 'rectangle',
  Circle: 'circle',
  Triangle: 'triangle',
  StickyNote: 'sticky_note',
  Image: 'image',
  LaserPointer: 'laser_pointer',
  Selection: 'selection',
  Pan: 'pan',
  Shape: 'shape',
} as const;
export type WhiteboardTool = (typeof WhiteboardTool)[keyof typeof WhiteboardTool];

/** Status of a breakout room */
export const BreakoutRoomStatus = {
  Created: 'created',
  Open: 'open',
  Locked: 'locked',
  Closed: 'closed',
  Recalled: 'recalled',
} as const;
export type BreakoutRoomStatus = (typeof BreakoutRoomStatus)[keyof typeof BreakoutRoomStatus];

/** Status of a live poll */
export const PollStatus = {
  Draft: 'draft',
  Active: 'active',
  Closed: 'closed',
  ResultsPublished: 'results_published',
  Archived: 'archived',
} as const;
export type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];

/** Status of a Q&A message */
export const QAStatus = {
  Open: 'open',
  Answered: 'answered',
  Upvoted: 'upvoted',
  Merged: 'merged',
  Hidden: 'hidden',
  Deleted: 'deleted',
} as const;
export type QAStatus = (typeof QAStatus)[keyof typeof QAStatus];

/** Screen-share mode */
export const ScreenShareStatus = {
  None: 'none',
  FullScreen: 'full_screen',
  Window: 'window',
  Tab: 'tab',
  Presentation: 'presentation',
} as const;
export type ScreenShareStatus = (typeof ScreenShareStatus)[keyof typeof ScreenShareStatus];

// ============================================================================
// ENUMS — SOCIAL LEARNING
// ============================================================================

/** Discussion forum type */
export const ForumType = {
  Course: 'course',
  Module: 'module',
  General: 'general',
  QnA: 'q_and_a',
  Announcements: 'announcements',
  Help: 'help',
  StudyGroup: 'study_group',
  Project: 'project',
  Social: 'social',
} as const;
export type ForumType = (typeof ForumType)[keyof typeof ForumType];

/** Forum lifecycle status */
export const ForumStatus = {
  Active: 'active',
  ReadOnly: 'read_only',
  Archived: 'archived',
  Locked: 'locked',
} as const;
export type ForumStatus = (typeof ForumStatus)[keyof typeof ForumStatus];

/** Type of a forum post */
export const PostType = {
  Thread: 'thread',
  Question: 'question',
  Announcement: 'announcement',
  Poll: 'poll',
  Resource: 'resource',
  Reflection: 'reflection',
  Showcase: 'showcase',
} as const;
export type PostType = (typeof PostType)[keyof typeof PostType];

/** Moderation status of a post */
export const PostStatus = {
  Published: 'published',
  Draft: 'draft',
  Pending: 'pending',
  Flagged: 'flagged',
  Hidden: 'hidden',
  Deleted: 'deleted',
  Locked: 'locked',
  Pinned: 'pinned',
} as const;
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];

/** Status of a comment */
export const CommentStatus = {
  Visible: 'visible',
  Hidden: 'hidden',
  Flagged: 'flagged',
  Deleted: 'deleted',
  Edited: 'edited',
} as const;
export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus];

/** Reaction emoji / type */
export const ReactionType = {
  Like: 'like',
  Love: 'love',
  Celebrate: 'celebrate',
  Insightful: 'insightful',
  Funny: 'funny',
  Question: 'question',
  Confused: 'confused',
  Disagree: 'disagree',
} as const;
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];

/** Learner group type */
export const GroupType = {
  Study: 'study',
  Project: 'project',
  Social: 'social',
  PeerReview: 'peer_review',
  Mentoring: 'mentoring',
  Interest: 'interest',
  Cohort: 'cohort',
} as const;
export type GroupType = (typeof GroupType)[keyof typeof GroupType];

/** Group lifecycle status */
export const GroupStatus2 = {
  Forming: 'forming',
  Active: 'active',
  Inactive: 'inactive',
  Archived: 'archived',
  Dissolved: 'dissolved',
} as const;
export type GroupStatus2 = (typeof GroupStatus2)[keyof typeof GroupStatus2];

/** Mentoring arrangement status */
export const MentoringStatus = {
  Requested: 'requested',
  Accepted: 'accepted',
  Active: 'active',
  Paused: 'paused',
  Completed: 'completed',
  Cancelled: 'cancelled',
  Declined: 'declined',
} as const;
export type MentoringStatus = (typeof MentoringStatus)[keyof typeof MentoringStatus];

/** Study group status */
export const StudyGroupStatus = {
  Forming: 'forming',
  Active: 'active',
  Meeting: 'meeting',
  Inactive: 'inactive',
  Completed: 'completed',
  Dissolved: 'dissolved',
} as const;
export type StudyGroupStatus = (typeof StudyGroupStatus)[keyof typeof StudyGroupStatus];

/** Knowledge sharing status */
export const KnowledgeShareStatus = {
  Proposed: 'proposed',
  Scheduled: 'scheduled',
  Delivered: 'delivered',
  Recorded: 'recorded',
  Shared: 'shared',
  Archived: 'archived',
} as const;
export type KnowledgeShareStatus = (typeof KnowledgeShareStatus)[keyof typeof KnowledgeShareStatus];

/** Bookmark target type */
export const BookmarkType = {
  Course: 'course',
  Lesson: 'lesson',
  Module: 'module',
  Video: 'video',
  Document: 'document',
  ForumPost: 'forum_post',
  Quiz: 'quiz',
  Assignment: 'assignment',
  LearningPath: 'learning_path',
  Note: 'note',
} as const;
export type BookmarkType = (typeof BookmarkType)[keyof typeof BookmarkType];

// ============================================================================
// ENUMS — ANALYTICS
// ============================================================================

/** Analytics data category */
export const AnalyticsType = {
  Progress: 'progress',
  Engagement: 'engagement',
  Completion: 'completion',
  Performance: 'performance',
  Dropout: 'dropout',
  Competency: 'competency',
  SkillGap: 'skill_gap',
  Social: 'social',
  Content: 'content',
  Revenue: 'revenue',
} as const;
export type AnalyticsType = (typeof AnalyticsType)[keyof typeof AnalyticsType];

/** Engagement intensity level */
export const EngagementLevel = {
  None: 'none',
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  VeryHigh: 'very_high',
  Champion: 'champion',
} as const;
export type EngagementLevel = (typeof EngagementLevel)[keyof typeof EngagementLevel];

/** Predicted dropout risk tier */
export const DropoutRisk = {
  None: 'none',
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  Critical: 'critical',
} as const;
export type DropoutRisk = (typeof DropoutRisk)[keyof typeof DropoutRisk];

/** Competency analytics focus */
export const CompetencyAnalyticsType = {
  Assessment: 'assessment',
  Gap: 'gap',
  Trend: 'trend',
  Distribution: 'distribution',
  Correlation: 'correlation',
  Benchmark: 'benchmark',
} as const;
export type CompetencyAnalyticsType = (typeof CompetencyAnalyticsType)[keyof typeof CompetencyAnalyticsType];

/** Skill gap analysis type */
export const SkillGapType = {
  CurrentVsRequired: 'current_vs_required',
  Individual: 'individual',
  Team: 'team',
  Organisational: 'organisational',
  MarketDemand: 'market_demand',
  CareerPath: 'career_path',
} as const;
export type SkillGapType = (typeof SkillGapType)[keyof typeof SkillGapType];

/** Recommendation engine type */
export const RecommendationType = {
  Content: 'content',
  Course: 'course',
  LearningPath: 'learning_path',
  Peer: 'peer',
  Mentor: 'mentor',
  Career: 'career',
  Skill: 'skill',
  Review: 'review',
} as const;
export type RecommendationType = (typeof RecommendationType)[keyof typeof RecommendationType];

// ============================================================================
// ENUMS — GAMIFICATION
// ============================================================================

/** Action that earns gamification reward */
export const GamificationAction = {
  CompleteLesson: 'complete_lesson',
  CompleteModule: 'complete_module',
  CompleteCourse: 'complete_course',
  PassQuiz: 'pass_quiz',
  SubmitAssignment: 'submit_assignment',
  HelpPeer: 'help_peer',
  PostInForum: 'post_in_forum',
  ReviewCourse: 'review_course',
  LoginStreak: 'login_streak',
  AchievementUnlocked: 'achievement_unlocked',
  BadgeEarned: 'badge_earned',
  ChallengeComplete: 'challenge_complete',
  Referral: 'referral',
  FirstSubmission: 'first_submission',
  PerfectScore: 'perfect_score',
  SpeedDemon: 'speed_demon',
  SocialShare: 'social_share',
  StudyGroupActive: 'study_group_active',
} as const;
export type GamificationAction = (typeof GamificationAction)[keyof typeof GamificationAction];

/** Currency / point type */
export const PointType = {
  XP: 'xp',
  Coins: 'coins',
  Tokens: 'tokens',
  Credits: 'credits',
  Bonus: 'bonus',
  Streak: 'streak',
  Achievement: 'achievement',
  Custom: 'custom',
} as const;
export type PointType = (typeof PointType)[keyof typeof PointType];

/** Experience point action */
export const XPAction = {
  LessonComplete: 'lesson_complete',
  ModuleComplete: 'module_complete',
  CourseComplete: 'course_complete',
  QuizPassed: 'quiz_passed',
  AssignmentSubmitted: 'assignment_submitted',
  PerfectScore: 'perfect_score',
  StreakBonus: 'streak_bonus',
  DailyLogin: 'daily_login',
  HelpPeer: 'help_peer',
  ForumContribution: 'forum_contribution',
  ChallengeComplete: 'challenge_complete',
  AchievementUnlock: 'achievement_unlock',
  BadgeEarned: 'badge_earned',
  Referral: 'referral',
  FirstTimeActions: 'first_time_actions',
  SpeedBonus: 'speed_bonus',
  QualityBonus: 'quality_bonus',
} as const;
export type XPAction = (typeof XPAction)[keyof typeof XPAction];

/** Level status */
export const LevelStatus = {
  Locked: 'locked',
  Active: 'active',
  Completed: 'completed',
  Mastered: 'mastered',
} as const;
export type LevelStatus = (typeof LevelStatus)[keyof typeof LevelStatus];

/** Achievement classification */
export const AchievementType = {
  Academic: 'academic',
  Social: 'social',
  Persistence: 'persistence',
  Mastery: 'mastery',
  Exploration: 'exploration',
  Creative: 'creative',
  Leadership: 'leadership',
  Milestone: 'milestone',
  Special: 'special',
  Seasonal: 'seasonal',
} as const;
export type AchievementType = (typeof AchievementType)[keyof typeof AchievementType];

/** Badge lifecycle status */
export const BadgeStatus2 = {
  Draft: 'draft',
  Active: 'active',
  Retired: 'retired',
  Revoked: 'revoked',
} as const;
export type BadgeStatus2 = (typeof BadgeStatus2)[keyof typeof BadgeStatus2];

/** Leaderboard structural type */
export const LeaderboardType = {
  Global: 'global',
  Course: 'course',
  Module: 'module',
  Cohort: 'cohort',
  Weekly: 'weekly',
  Monthly: 'monthly',
  AllTime: 'all_time',
  Friends: 'friends',
  Department: 'department',
} as const;
export type LeaderboardType = (typeof LeaderboardType)[keyof typeof LeaderboardType];

/** Challenge structural type */
export const ChallengeType = {
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly',
  Seasonal: 'seasonal',
  Course: 'course',
  Social: 'social',
  Academic: 'academic',
  Streak: 'streak',
  Speed: 'speed',
  Accuracy: 'accuracy',
  Creative: 'creative',
  Collaborative: 'collaborative',
} as const;
export type ChallengeType = (typeof ChallengeType)[keyof typeof ChallengeType];

/** Reward redemption type */
export const RewardType = {
  Badge: 'badge',
  Certificate: 'certificate',
  Points: 'points',
  Discount: 'discount',
  FeatureUnlock: 'feature_unlock',
  Custom: 'custom',
  GiftCard: 'gift_card',
  Subscription: 'subscription',
} as const;
export type RewardType = (typeof RewardType)[keyof typeof RewardType];

// ============================================================================
// ENUMS — MARKETPLACE
// ============================================================================

/** Content type in the marketplace */
export const MarketplaceContentType = {
  Course: 'course',
  LearningPath: 'learning_path',
  Template: 'template',
  Assessment: 'assessment',
  Resource: 'resource',
  Coaching: 'coaching',
  Bundle: 'bundle',
  Workshop: 'workshop',
} as const;
export type MarketplaceContentType = (typeof MarketplaceContentType)[keyof typeof MarketplaceContentType];

/** Publisher account status */
export const PublisherStatus = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
  Suspended: 'suspended',
  Active: 'active',
  Inactive: 'inactive',
} as const;
export type PublisherStatus = (typeof PublisherStatus)[keyof typeof PublisherStatus];

/** Marketplace review status */
export const ReviewStatus2 = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
  Flagged: 'flagged',
  Hidden: 'hidden',
} as const;
export type ReviewStatus2 = (typeof ReviewStatus2)[keyof typeof ReviewStatus2];

/** Marketplace rating scale type */
export const RatingType = {
  FiveStar: 'five_star',
  ThumbsUp: 'thumbs_up',
  Numeric: 'numeric',
  Emoji: 'emoji',
  NPS: 'nps',
} as const;
export type RatingType = (typeof RatingType)[keyof typeof RatingType];

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

/** Licensing model for marketplace content */
export const LicenseType = {
  SingleUser: 'single_user',
  MultiUser: 'multi_user',
  SiteLicense: 'site_license',
  Subscription: 'subscription',
  Perpetual: 'perpetual',
  Trial: 'trial',
  Free: 'free',
  OpenSource: 'open_source',
} as const;
export type LicenseType = (typeof LicenseType)[keyof typeof LicenseType];

/** Revenue share model */
export const RevenueShareType = {
  Fixed: 'fixed',
  Tiered: 'tiered',
  Graduated: 'graduated',
  Custom: 'custom',
  FlatRate: 'flat_rate',
  Percentage: 'percentage',
} as const;
export type RevenueShareType = (typeof RevenueShareType)[keyof typeof RevenueShareType];

// ============================================================================
// INTERFACES — LIVE LEARNING
// ============================================================================

/** Virtual classroom container */
export interface VirtualClassroom {
  readonly id: string;
  readonly schoolId: string;
  readonly courseId: string;
  name: string;
  description?: string;
  maxParticipants: number;
  recordingEnabled: boolean;
  whiteboardEnabled: boolean;
  breakoutRoomsEnabled: boolean;
  screenShareEnabled: boolean;
  chatEnabled: boolean;
  qaEnabled: boolean;
  pollsEnabled: boolean;
  attendanceTracking: boolean;
  waitingRoomEnabled: boolean;
  autoRecord: boolean;
  scheduledSessions: readonly LiveSession[];
  settings: VirtualClassroomSettings;
  createdAt: string;
  updatedAt: string;
}

/** Configuration for a virtual classroom */
export interface VirtualClassroomSettings {
  allowParticipantScreenShare: boolean;
  allowParticipantWhiteboard: boolean;
  muteOnJoin: boolean;
  cameraOnByDefault: boolean;
  handRaiseOnByDefault: boolean;
  maxScreenSharers: number;
  recordingConsentRequired: boolean;
  storageRetentionDays: number;
  bandwidthLimit?: number;
}

/** A single live session instance */
export interface LiveSession {
  readonly id: string;
  readonly virtualClassroomId: string;
  readonly courseId: string;
  title: string;
  description?: string;
  sessionType: LiveSessionType;
  status: LiveSessionStatus;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
  instructorId: string;
  instructorName?: string;
  coHostIds: readonly string[];
  participantCount: number;
  maxParticipants: number;
  recordingUrl?: string;
  recordingSizeBytes?: number;
  recordingDurationSeconds?: number;
  meetingId: string;
  meetingPassword?: string;
  meetingUrl?: string;
  attendance: readonly Attendance[];
  whiteboardState?: Whiteboard;
  breakoutRooms: readonly BreakoutRoom[];
  polls: readonly Poll[];
  qaMessages: readonly QAMessage[];
  chatMessages: readonly LiveChat[];
  screenShares: readonly ScreenShare[];
  annotations: readonly LiveAnnotation[];
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a live session */
export interface LiveSessionCreate {
  readonly virtualClassroomId: string;
  readonly courseId: string;
  title: string;
  description?: string;
  sessionType: LiveSessionType;
  scheduledStart: string;
  scheduledEnd: string;
  instructorId: string;
  coHostIds?: readonly string[];
  maxParticipants?: number;
  meetingUrl?: string;
}

/** Query parameters for listing sessions */
export interface LiveSessionQuery {
  courseId?: string;
  virtualClassroomId?: string;
  sessionType?: LiveSessionType | 'all';
  status?: LiveSessionStatus | 'all';
  instructorId?: string;
  scheduledFrom?: string;
  scheduledTo?: string;
  page?: number;
  limit?: number;
  sortBy?: 'scheduledStart' | 'createdAt' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
}

/** Session recording metadata */
export interface Recording {
  readonly id: string;
  readonly sessionId: string;
  title: string;
  url: string;
  downloadUrl: string;
  durationSeconds: number;
  fileSizeBytes: number;
  format: 'mp4' | 'webm' | 'mkv';
  thumbnailUrl?: string;
  chapters: readonly RecordingChapter[];
  transcriptUrl?: string;
  createdAt: string;
}

/** A chapter marker in a recording */
export interface RecordingChapter {
  readonly id: string;
  title: string;
  startSeconds: number;
  endSeconds: number;
  description?: string;
}

/** Attendance record for a live session */
export interface Attendance {
  readonly id: string;
  readonly sessionId: string;
  readonly userId: string;
  userName?: string;
  status: AttendanceStatus;
  joinedAt?: string;
  leftAt?: string;
  durationMinutes: number;
  isMuted: boolean;
  cameraOn: boolean;
  participatedInActivities: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Whiteboard state for a session */
export interface Whiteboard {
  readonly sessionId: string;
  activeTool: WhiteboardTool;
  elements: readonly WhiteboardElement[];
  collaborators: readonly string[];
  version: number;
  lastModifiedBy: string;
  lastModifiedAt: string;
}

/** A single whiteboard element */
export interface WhiteboardElement {
  readonly id: string;
  type: 'pen' | 'text' | 'shape' | 'image' | 'sticky' | 'arrow';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  color: string;
  strokeWidth: number;
  opacity: number;
  rotation: number;
  zIndex: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

/** A breakout room within a live session */
export interface BreakoutRoom {
  readonly id: string;
  readonly sessionId: string;
  name: string;
  roomNumber: number;
  status: BreakoutRoomStatus;
  participantIds: readonly string[];
  participantCount: number;
  maxParticipants: number;
  topic?: string;
  durationMinutes?: number;
  createdAt: string;
  closedAt?: string;
}

/** A live poll */
export interface Poll {
  readonly id: string;
  readonly sessionId: string;
  question: string;
  description?: string;
  pollType: 'single_choice' | 'multiple_choice' | 'yes_no' | 'rating' | 'word_cloud' | 'open_ended';
  status: PollStatus;
  options: readonly PollOption[];
  allowAnonymous: boolean;
  showResults: 'never' | 'after_vote' | 'after_close';
  totalVotes: number;
  createdAt: string;
  closedAt?: string;
}

/** A poll option */
export interface PollOption {
  readonly id: string;
  text: string;
  voteCount: number;
  percentage?: number;
  voters: readonly string[];
}

/** Q&A message in a live session */
export interface QAMessage {
  readonly id: string;
  readonly sessionId: string;
  readonly userId: string;
  userName: string;
  question: string;
  status: QAStatus;
  upvotes: number;
  upvotedBy: readonly string[];
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Screen-share instance */
export interface ScreenShare {
  readonly id: string;
  readonly sessionId: string;
  readonly userId: string;
  userName: string;
  shareType: ScreenShareStatus;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
}

/** Chat message in a live session */
export interface LiveChat {
  readonly id: string;
  readonly sessionId: string;
  readonly userId: string;
  userName: string;
  content: string;
  recipientId?: string;
  isPrivate: boolean;
  isSystem: boolean;
  createdAt: string;
}

/** Annotation on shared content */
export interface LiveAnnotation {
  readonly id: string;
  readonly sessionId: string;
  readonly userId: string;
  userName: string;
  pageNumber?: number;
  timestampSeconds?: number;
  content: string;
  color: string;
  position: { x: number; y: number };
  isResolved: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// INTERFACES — SOCIAL LEARNING
// ============================================================================

/** Discussion forum container */
export interface DiscussionForum {
  readonly id: string;
  readonly courseId: string;
  title: string;
  description?: string;
  forumType: ForumType;
  status: ForumStatus;
  isAnonymousAllowed: boolean;
  moderationRequired: boolean;
  moderationRules: readonly string[];
  postCount: number;
  participantCount: number;
  lastPostAt?: string;
  pinnedPosts: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** A post in a discussion forum */
export interface ForumPost {
  readonly id: string;
  readonly forumId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  postType: PostType;
  status: PostStatus;
  title: string;
  content: string;
  contentHtml?: string;
  mediaUrls: readonly string[];
  attachmentUrls: readonly string[];
  tags: readonly string[];
  isAnonymous: boolean;
  isPinned: boolean;
  isLocked: boolean;
  isEdited: boolean;
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  bookmarkCount: number;
  lastCommentAt?: string;
  acceptedAnswerId?: string;
  upvotes: number;
  downvotes: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}

/** Comment on a forum post */
export interface ForumComment {
  readonly id: string;
  readonly postId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  contentHtml?: string;
  mediaUrls: readonly string[];
  status: CommentStatus;
  isAnonymous: boolean;
  isEdited: boolean;
  parentId?: string;
  replyCount: number;
  upvotes: number;
  downvotes: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}

/** A learning community */
export interface Community {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  slug: string;
  description: string;
  coverImageUrl?: string;
  iconUrl?: string;
  visibility: 'public' | 'private' | 'invite_only';
  memberCount: number;
  postCount: number;
  ownerIds: readonly string[];
  moderatorIds: readonly string[];
  tags: readonly string[];
  rules: readonly string[];
  isOfficial: boolean;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

/** Community membership */
export interface CommunityMember {
  readonly id: string;
  readonly communityId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  status: 'active' | 'pending' | 'banned' | 'muted';
  joinedAt: string;
  lastActiveAt: string;
  postCount: number;
  createdAt: string;
}

/** A learner group */
export interface Group {
  readonly id: string;
  readonly schoolId: string;
  readonly courseId?: string;
  name: string;
  description?: string;
  groupType: GroupType;
  status: GroupStatus2;
  coverImageUrl?: string;
  maxSize: number;
  memberCount: number;
  isPrivate: boolean;
  ownerIds: readonly string[];
  tags: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** Group membership */
export interface GroupMember {
  readonly id: string;
  readonly groupId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  lastActiveAt: string;
  contributionsCount: number;
  createdAt: string;
}

/** Mentoring relationship */
export interface Mentoring {
  readonly id: string;
  readonly schoolId: string;
  readonly courseId?: string;
  readonly mentorId: string;
  mentorName: string;
  readonly menteeId: string;
  menteeName: string;
  status: MentoringStatus;
  focusAreas: readonly string[];
  goals: readonly MentoringGoal[];
  sessionCount: number;
  totalSessionMinutes: number;
  startDate: string;
  endDate?: string;
  completedAt?: string;
  rating?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

/** A mentoring goal */
export interface MentoringGoal {
  readonly id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'abandoned';
  targetDate?: string;
  completedAt?: string;
}

/** A single mentoring session */
export interface MentoringSession {
  readonly id: string;
  readonly mentoringId: string;
  title: string;
  notes?: string;
  durationMinutes: number;
  scheduledAt: string;
  attendedBy: readonly string[];
  outcomes: readonly string[];
  actionItems: readonly string[];
  recordingUrl?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

/** A study group */
export interface StudyGroup {
  readonly id: string;
  readonly schoolId: string;
  readonly courseId?: string;
  name: string;
  description?: string;
  status: StudyGroupStatus;
  maxSize: number;
  memberCount: number;
  scheduleDay?: string;
  scheduleTime?: string;
  meetingUrl?: string;
  topics: readonly string[];
  resources: readonly StudyGroupResource[];
  memberIds: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** Study group member */
export interface StudyGroupMember {
  readonly id: string;
  readonly studyGroupId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  role: 'leader' | 'member';
  joinedAt: string;
  sessionsAttended: number;
  contributionsCount: number;
  createdAt: string;
}

/** A resource shared in a study group */
export interface StudyGroupResource {
  readonly id: string;
  title: string;
  url: string;
  type: 'document' | 'video' | 'link' | 'note' | 'code';
  sharedBy: string;
  sharedAt: string;
}

/** Knowledge sharing event */
export interface KnowledgeShare {
  readonly id: string;
  readonly schoolId: string;
  readonly courseId?: string;
  title: string;
  description: string;
  status: KnowledgeShareStatus;
  presenterId: string;
  presenterName: string;
  attendees: readonly string[];
  attendeeCount: number;
  scheduledAt?: string;
  deliveredAt?: string;
  durationMinutes?: number;
  presentationUrl?: string;
  recordingUrl?: string;
  rating?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

/** Bookmark on learning content */
export interface Bookmark {
  readonly id: string;
  readonly userId: string;
  targetType: BookmarkType;
  targetId: string;
  title: string;
  note?: string;
  folder?: string;
  tags: readonly string[];
  createdAt: string;
}

/** Like on social content */
export interface Like {
  readonly id: string;
  readonly userId: string;
  targetType: 'post' | 'comment' | 'resource' | 'share';
  targetId: string;
  createdAt: string;
}

/** Comment on social content */
export interface Comment {
  readonly id: string;
  readonly userId: string;
  userName: string;
  targetType: 'post' | 'share' | 'achievement' | 'challenge';
  targetId: string;
  content: string;
  parentId?: string;
  replyCount: number;
  reactionCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Reaction on social content */
export interface Reaction {
  readonly id: string;
  readonly userId: string;
  targetType: 'post' | 'comment' | 'share' | 'achievement';
  targetId: string;
  reactionType: ReactionType;
  createdAt: string;
}

/** Discussion thread */
export interface DiscussionThread {
  readonly id: string;
  readonly forumId: string;
  readonly rootPostId: string;
  title: string;
  participantIds: readonly string[];
  participantCount: number;
  replyCount: number;
  lastReplyAt: string;
  totalUpvotes: number;
  isResolved: boolean;
  tags: readonly string[];
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// INTERFACES — ANALYTICS
// ============================================================================

/** Learner progress record */
export interface Progress {
  readonly id: string;
  readonly userId: string;
  readonly courseId: string;
  readonly moduleId?: string;
  readonly lessonId?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  progressPercentage: number;
  timeSpentMinutes: number;
  lastAccessedAt: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  attempts: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a progress record */
export interface ProgressCreate {
  readonly userId: string;
  readonly courseId: string;
  readonly moduleId?: string;
  readonly lessonId?: string;
  status?: 'not_started' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  progressPercentage?: number;
  timeSpentMinutes?: number;
  score?: number;
}

/** Course completion record */
export interface Completion {
  readonly id: string;
  readonly userId: string;
  readonly courseId: string;
  completedAt: string;
  finalGrade?: number;
  gradeLetter?: string;
  passed: boolean;
  totalTimeSpentMinutes: number;
  totalLessonsCompleted: number;
  totalModulesCompleted: number;
  totalQuizzesPassed: number;
  totalAssignmentsSubmitted: number;
  averageScore: number;
  completionMethod: 'auto' | 'manual' | 'portfolio' | 'exam' | 'competency';
  certificateId?: string;
  createdAt: string;
}

/** Payload to create a completion record */
export interface CompletionCreate {
  readonly userId: string;
  readonly courseId: string;
  finalGrade?: number;
  passed: boolean;
  totalTimeSpentMinutes: number;
  completionMethod: 'auto' | 'manual' | 'portfolio' | 'exam' | 'competency';
}

/** Engagement tracking record */
export interface Engagement {
  readonly id: string;
  readonly userId: string;
  readonly courseId: string;
  sessionCount: number;
  totalTimeMinutes: number;
  lastActiveAt: string;
  loginCount: number;
  contentInteractions: number;
  forumPosts: number;
  quizAttempts: number;
  assignmentsSubmitted: number;
  peerInteractions: number;
  helpRequests: number;
  helpGiven: number;
  streakDays: number;
  engagementLevel: EngagementLevel;
  engagementScore: number;
  periodStart: string;
  periodEnd: string;
  dailyBreakdown: readonly DailyEngagement[];
  createdAt: string;
  updatedAt: string;
}

/** Payload to create an engagement record */
export interface EngagementCreate {
  readonly userId: string;
  readonly courseId: string;
  sessionCount?: number;
  totalTimeMinutes?: number;
  contentInteractions?: number;
  forumPosts?: number;
  quizAttempts?: number;
  assignmentsSubmitted?: number;
  peerInteractions?: number;
}

/** Daily engagement breakdown */
export interface DailyEngagement {
  readonly date: string;
  timeMinutes: number;
  lessonsAccessed: number;
  quizzesAttempted: number;
  forumPosts: number;
  loginCount: number;
}

/** Predicted dropout risk entry */
export interface DropoutRiskInterface {
  readonly userId: string;
  readonly courseId: string;
  riskLevel: DropoutRisk;
  riskScore: number;
  riskFactors: readonly RiskFactor[];
  recommendedInterventions: readonly string[];
  predictedDropoutDate?: string;
  lastAssessedAt: string;
  trend: 'improving' | 'stable' | 'worsening';
  assessmentModel: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

/** A contributing factor to dropout risk */
export interface RiskFactor {
  readonly factor: string;
  weight: number;
  value: number;
  description: string;
}

/** Learning time tracking */
export interface LearningTime {
  readonly userId: string;
  readonly courseId: string;
  totalTimeMinutes: number;
  averageSessionMinutes: number;
  longestSessionMinutes: number;
  totalSessions: number;
  peakHour: number;
  peakDayOfWeek: number;
  dailyAverageMinutes: number;
  weeklyTrend: readonly number[];
  monthlyTrend: readonly number[];
  lastSessionAt: string;
  firstSessionAt: string;
}

/** Visual heatmap data for activity */
export interface Heatmap {
  readonly userId: string;
  readonly courseId?: string;
  data: readonly HeatmapCell[];
  maxValue: number;
  minValue: number;
  period: 'day' | 'week' | 'month';
  startDate: string;
  endDate: string;
}

/** A cell in the heatmap grid */
export interface HeatmapCell {
  readonly row: number;
  readonly column: number;
  readonly value: number;
  readonly label?: string;
}

/** Competency analytics aggregation */
export interface CompetencyAnalytics {
  readonly competencyId: string;
  competencyName: string;
  totalLearners: number;
  averageScore: number;
  medianScore: number;
  minScore: number;
  maxScore: number;
  standardDeviation: number;
  achievedCount: number;
  inProgressCount: number;
  notStartedCount: number;
  levelDistribution: readonly LevelDistribution[];
  trendData: readonly TrendDataPoint[];
  correlationWithPerformance: number;
  gapAnalysis: readonly SkillGap[];
  assessedAt: string;
}

/** Distribution of learners across competency levels */
export interface LevelDistribution {
  readonly level: string;
  readonly count: number;
  readonly percentage: number;
}

/** A data point for trend analysis */
export interface TrendDataPoint {
  readonly date: string;
  readonly value: number;
  readonly change?: number;
}

/** Skill gap analysis result */
export interface SkillGap {
  readonly skillId: string;
  readonly skillName: string;
  currentLevel: SkillLevel;
  targetLevel: SkillLevel;
  gapSize: number;
  gapSeverity: 'critical' | 'high' | 'medium' | 'low' | 'none';
  recommendedActions: readonly string[];
  relatedCourses: readonly string[];
  estimatedTimeToClose: number;
  assessedAt: string;
}

/** AI-generated learning recommendation */
export interface LearningRecommendation {
  readonly id: string;
  readonly userId: string;
  recommendationType: RecommendationType;
  title: string;
  description: string;
  reason: string;
  targetId: string;
  targetType: 'course' | 'lesson' | 'module' | 'learning_path' | 'resource' | 'peer' | 'mentor';
  confidenceScore: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'accepted' | 'dismissed' | 'in_progress' | 'completed';
  basedOnData: readonly string[];
  aiModelVersion: string;
  expiresAt?: string;
  respondedAt?: string;
  createdAt: string;
}

/** Consolidated progress report */
export interface ProgressReport {
  readonly userId: string;
  readonly userName: string;
  periodStart: string;
  periodEnd: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  coursesInProgress: number;
  totalLessonsCompleted: number;
  totalModulesCompleted: number;
  totalTimeMinutes: number;
  averageGrade: number;
  highestGrade: number;
  lowestGrade: number;
  quizPassRate: number;
  assignmentCompletionRate: number;
  averageEngagement: number;
  currentStreak: number;
  longestStreak: number;
  badgesEarned: number;
  certificatesEarned: number;
  xpEarned: number;
  level: number;
  courseBreakdown: readonly CourseProgressSummary[];
  generatedAt: string;
}

/** Per-course summary within a progress report */
export interface CourseProgressSummary {
  readonly courseId: string;
  readonly courseName: string;
  progressPercentage: number;
  status: string;
  averageGrade?: number;
  timeSpentMinutes: number;
  lastAccessedAt: string;
}

/** Engagement report aggregation */
export interface EngagementReport {
  readonly schoolId: string;
  periodStart: string;
  periodEnd: string;
  totalActiveUsers: number;
  totalSessions: number;
  averageSessionMinutes: number;
  averageEngagementScore: number;
  dailyActiveUsers: readonly DailyActiveUsers[];
  topCourses: readonly CourseEngagementStat[];
  contentEngagement: readonly ContentEngagementStat[];
  socialEngagement: readonly SocialEngagementStat[];
  generatedAt: string;
}

/** Daily active user count */
export interface DailyActiveUsers {
  readonly date: string;
  readonly count: number;
}

/** Course engagement statistic */
export interface CourseEngagementStat {
  readonly courseId: string;
  readonly courseName: string;
  activeUsers: number;
  averageSessionMinutes: number;
  completionRate: number;
  engagementScore: number;
}

/** Content engagement statistic */
export interface ContentEngagementStat {
  readonly contentType: string;
  viewCount: number;
  averageTimeMinutes: number;
  completionRate: number;
  rating?: number;
}

/** Social engagement statistic */
export interface SocialEngagementStat {
  readonly metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

// ============================================================================
// INTERFACES — GAMIFICATION
// ============================================================================

/** Points account for a user */
export interface Points {
  readonly id: string;
  readonly userId: string;
  readonly schoolId: string;
  totalPoints: number;
  availablePoints: number;
  spentPoints: number;
  pendingPoints: number;
  lifetimePoints: number;
  lastEarnedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a points entry */
export interface PointsCreate {
  readonly userId: string;
  readonly schoolId: string;
  totalPoints?: number;
  availablePoints?: number;
}

/** Experience points ledger */
export interface XP {
  readonly id: string;
  readonly userId: string;
  totalXP: number;
  currentLevelXP: number;
  nextLevelXP: number;
  level: number;
  title?: string;
  multiplier: number;
  lastXPEarnedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload to create an XP record */
export interface XPCreate {
  readonly userId: string;
  totalXP?: number;
  level?: number;
  multiplier?: number;
}

/** Gamification level definition */
export interface Level {
  readonly id: string;
  readonly schoolId?: string;
  levelNumber: number;
  name: string;
  description?: string;
  requiredXP: number;
  iconUrl?: string;
  rewards: readonly LevelReward[];
  unlockFeatures: readonly string[];
  status: LevelStatus;
  createdAt: string;
  updatedAt: string;
}

/** Reward unlocked at a level */
export interface LevelReward {
  readonly id: string;
  rewardType: RewardType;
  rewardName: string;
  rewardValue: string;
  iconUrl?: string;
}

/** Payload to create a level */
export interface LevelCreate {
  readonly schoolId?: string;
  levelNumber: number;
  name: string;
  description?: string;
  requiredXP: number;
  iconUrl?: string;
  rewards?: readonly LevelReward[];
  unlockFeatures?: readonly string[];
}

/** Achievement definition */
export interface Achievement {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description: string;
  achievementType: AchievementType;
  iconUrl: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  criteria: readonly AchievementCriteria[];
  xpReward: number;
  badgeRewardId?: string;
  pointsReward: number;
  isSecret: boolean;
  unlockCount: number;
  tags: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** Criteria for unlocking an achievement */
export interface AchievementCriteria {
  readonly id: string;
  type: string;
  description: string;
  target: number;
  current: number;
  operator: 'gte' | 'lte' | 'eq' | 'between';
  value: number;
}

/** Payload to create an achievement */
export interface AchievementCreate {
  readonly schoolId: string;
  name: string;
  description: string;
  achievementType: AchievementType;
  iconUrl: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  criteria?: readonly AchievementCriteria[];
  xpReward?: number;
  badgeRewardId?: string;
  pointsReward?: number;
  isSecret?: boolean;
  tags?: readonly string[];
}

/** Badge definition (gamification) */
export interface Badge {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  criteria: readonly BadgeCriteria[];
  xpReward: number;
  isSecret: boolean;
  earnedCount: number;
  tags: readonly string[];
  expiryType: 'never' | 'duration' | 'date';
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Criteria for earning a badge */
export interface BadgeCriteria {
  readonly id: string;
  type: string;
  description: string;
  threshold: number;
  operator: 'gte' | 'lte' | 'eq';
}

/** Payload to create a badge */
export interface BadgeCreateInterface {
  readonly schoolId: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  criteria?: readonly BadgeCriteria[];
  xpReward?: number;
  isSecret?: boolean;
  tags?: readonly string[];
  expiryType?: 'never' | 'duration' | 'date';
  expiresAt?: string;
}

/** Leaderboard definition */
export interface Leaderboard {
  readonly id: string;
  readonly schoolId: string;
  leaderboardType: LeaderboardType;
  title: string;
  description?: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'all_time';
  metric: 'xp' | 'points' | 'courses_completed' | 'streak' | 'badges' | 'engagement';
  scopeId?: string;
  scopeType?: 'course' | 'cohort' | 'department' | 'global';
  maxEntries: number;
  resetSchedule?: string;
  isActive: boolean;
  entries: readonly LeaderboardEntry[];
  createdAt: string;
  updatedAt: string;
}

/** An entry on a leaderboard */
export interface LeaderboardEntry {
  readonly id: string;
  readonly leaderboardId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  rank: number;
  score: number;
  change: number;
  isCurrent: boolean;
  badges: readonly string[];
  level: number;
  achievedAt: string;
  createdAt: string;
}

/** Gamification challenge definition */
export interface Challenge {
  readonly id: string;
  readonly schoolId: string;
  title: string;
  description: string;
  challengeType: ChallengeType;
  iconUrl?: string;
  bannerUrl?: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  criteria: readonly ChallengeCriteria[];
  xpReward: number;
  pointsReward: number;
  badgeRewardId?: string;
  maxParticipants?: number;
  participantCount: number;
  isTeamChallenge: boolean;
  maxTeamSize?: number;
  leaderboardId?: string;
  tags: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** Criteria for completing a challenge */
export interface ChallengeCriteria {
  readonly id: string;
  type: string;
  description: string;
  target: number;
  unit: string;
  operator: 'gte' | 'lte' | 'eq';
}

/** Payload to create a challenge */
export interface ChallengeCreate {
  readonly schoolId: string;
  title: string;
  description: string;
  challengeType: ChallengeType;
  iconUrl?: string;
  bannerUrl?: string;
  startDate: string;
  endDate: string;
  criteria?: readonly ChallengeCriteria[];
  xpReward?: number;
  pointsReward?: number;
  badgeRewardId?: string;
  maxParticipants?: number;
  isTeamChallenge?: boolean;
  maxTeamSize?: number;
  tags?: readonly string[];
}

/** Reward definition */
export interface Reward {
  readonly id: string;
  readonly schoolId: string;
  name: string;
  description: string;
  rewardType: RewardType;
  iconUrl: string;
  costPoints: number;
  costXP?: number;
  stock: number;
  maxPerUser: number;
  totalRedeemed: number;
  isActive: boolean;
  expiryType: 'never' | 'duration' | 'date';
  expiresAt?: string;
  tags: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a reward */
export interface RewardCreate {
  readonly schoolId: string;
  name: string;
  description: string;
  rewardType: RewardType;
  iconUrl: string;
  costPoints: number;
  costXP?: number;
  stock?: number;
  maxPerUser?: number;
  expiryType?: 'never' | 'duration' | 'date';
  expiresAt?: string;
  tags?: readonly string[];
}

/** Daily learning goal */
export interface DailyGoal {
  readonly id: string;
  readonly userId: string;
  date: string;
  targetMinutes: number;
  actualMinutes: number;
  targetLessons: number;
  actualLessons: number;
  targetQuizScore?: number;
  actualQuizScore?: number;
  completed: boolean;
  bonusEarned: number;
  createdAt: string;
  updatedAt: string;
}

/** Streak tracking */
export interface Streak {
  readonly id: string;
  readonly userId: string;
  currentStreak: number;
  longestStreak: number;
  streakType: 'daily_login' | 'daily_learning' | 'daily_quiz' | 'daily_reading';
  lastActiveDate: string;
  freezeCount: number;
  maxFreezes: number;
  totalStreakDays: number;
  milestones: readonly StreakMilestone[];
  createdAt: string;
  updatedAt: string;
}

/** A streak milestone reached */
export interface StreakMilestone {
  readonly id: string;
  days: number;
  reachedAt: string;
  rewardType: RewardType;
  rewardValue: number;
}

/** Payload to create a streak */
export interface StreakCreate {
  readonly userId: string;
  currentStreak?: number;
  longestStreak?: number;
  streakType?: 'daily_login' | 'daily_learning' | 'daily_quiz' | 'daily_reading';
}

/** XP transaction ledger entry */
export interface XPTransaction {
  readonly id: string;
  readonly userId: string;
  action: XPAction;
  amount: number;
  balance: number;
  multiplier: number;
  description: string;
  referenceId?: string;
  referenceType?: string;
  source: 'system' | 'manual' | 'bonus' | 'challenge' | 'achievement' | 'streak';
  createdAt: string;
}

// ============================================================================
// INTERFACES — MARKETPLACE
// ============================================================================

/** Marketplace listing for a course */
export interface CourseMarketplace {
  readonly id: string;
  readonly courseId: string;
  readonly publisherId: string;
  publisherName: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  contentType: MarketplaceContentType;
  category: string;
  tags: readonly string[];
  price: number;
  currency: string;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  revenue: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'published' | 'suspended';
  language: string;
  level: string;
  estimatedHours: number;
  lastUpdated: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** A template sold in the marketplace */
export interface MarketplaceTemplate {
  readonly id: string;
  readonly publisherId: string;
  publisherName: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  tags: readonly string[];
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  downloadCount: number;
  fileSizeBytes: number;
  format: string;
  previewUrl?: string;
  downloadUrl: string;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'published';
  createdAt: string;
  updatedAt: string;
}

/** Premium content listing */
export interface PremiumContent {
  readonly id: string;
  readonly publisherId: string;
  title: string;
  description: string;
  contentType: MarketplaceContentType;
  thumbnailUrl: string;
  previewUrl?: string;
  price: number;
  currency: string;
  licensingModel: LicenseType;
  rating: number;
  purchaseCount: number;
  revenue: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

/** Publisher account on the marketplace */
export interface PublisherAccount {
  readonly id: string;
  readonly userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  websiteUrl?: string;
  socialLinks: readonly SocialLink[];
  status: PublisherStatus;
  verifiedAt?: string;
  totalRevenue: number;
  totalSales: number;
  averageRating: number;
  totalReviews: number;
  publishedCount: number;
  payoutMethod?: string;
  payoutDetails?: Record<string, unknown>;
  commissionRate: number;
  createdAt: string;
  updatedAt: string;
}

/** A social link on a publisher profile */
export interface SocialLink {
  readonly platform: string;
  readonly url: string;
}

/** Publisher application to the marketplace */
export interface PublisherApplication {
  readonly id: string;
  readonly userId: string;
  displayName: string;
  bio: string;
  qualifications: string;
  portfolioUrls: readonly string[];
  sampleContentUrls: readonly string[];
  expertiseAreas: readonly string[];
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  reviewerNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** A review on marketplace content */
export interface Review {
  readonly id: string;
  readonly contentId: string;
  readonly userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  pros?: string;
  cons?: string;
  helpfulCount: number;
  reportCount: number;
  status: ReviewStatus2;
  response?: string;
  responseBy?: string;
  responseAt?: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Rating aggregate */
export interface Rating {
  readonly contentId: string;
  averageRating: number;
  totalRatings: number;
  distribution: readonly RatingDistribution[];
  lastRatedAt?: string;
}

/** Rating distribution histogram */
export interface RatingDistribution {
  readonly stars: number;
  readonly count: number;
  readonly percentage: number;
}

/** License for marketplace content */
export interface License {
  readonly id: string;
  readonly contentId: string;
  readonly buyerId: string;
  licenseType: LicenseType;
  licenseKey: string;
  status: 'active' | 'expired' | 'revoked' | 'suspended';
  maxUsers: number;
  currentUsers: number;
  purchasedAt: string;
  expiresAt?: string;
  lastUsedAt?: string;
  totalUsageMinutes: number;
  features: readonly string[];
  createdAt: string;
  updatedAt: string;
}

/** Payload to create a license */
export interface LicenseCreate {
  readonly contentId: string;
  readonly buyerId: string;
  licenseType: LicenseType;
  maxUsers?: number;
  expiresAt?: string;
}

/** Revenue share configuration */
export interface RevenueShare {
  readonly id: string;
  readonly publisherId: string;
  shareType: RevenueShareType;
  platformPercent: number;
  publisherPercent: number;
  tiers?: readonly RevenueShareTier[];
  effectiveDate: string;
  createdAt: string;
  updatedAt: string;
}

/** A tier in a tiered revenue share model */
export interface RevenueShareTier {
  readonly id: string;
  minRevenue: number;
  maxRevenue?: number;
  platformPercent: number;
  publisherPercent: number;
}

/** Payload to create a revenue share config */
export interface RevenueShareCreate {
  readonly publisherId: string;
  shareType: RevenueShareType;
  platformPercent?: number;
  publisherPercent?: number;
  tiers?: readonly RevenueShareTier[];
  effectiveDate?: string;
}

/** Marketplace analytics snapshot */
export interface MarketplaceAnalytics {
  readonly marketplaceId: string;
  totalRevenue: number;
  totalTransactions: number;
  totalPublishers: number;
  totalContentItems: number;
  averageOrderValue: number;
  conversionRate: number;
  refundRate: number;
  topContent: readonly MarketplaceContentStat[];
  topCategories: readonly CategoryStat[];
  revenueByMonth: readonly MonthlyRevenue[];
  generatedAt: string;
}

/** Content-level marketplace stat */
export interface MarketplaceContentStat {
  readonly contentId: string;
  readonly contentTitle: string;
  revenue: number;
  salesCount: number;
  rating: number;
  reviewCount: number;
  conversionRate: number;
}

/** Category-level marketplace stat */
export interface CategoryStat {
  readonly category: string;
  revenue: number;
  salesCount: number;
  contentCount: number;
  averageRating: number;
}

/** Monthly revenue breakdown */
export interface MonthlyRevenue {
  readonly month: string;
  readonly revenue: number;
  readonly transactions: number;
  readonly newBuyers: number;
}

/** A marketplace transaction */
export interface MarketplaceTransaction {
  readonly id: string;
  readonly contentId: string;
  readonly contentTitle: string;
  readonly buyerId: string;
  readonly publisherId: string;
  contentType: MarketplaceContentType;
  amount: number;
  currency: string;
  platformFee: number;
  publisherPayout: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'refunded' | 'disputed' | 'cancelled';
  licenseId?: string;
  refundReason?: string;
  refundedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payout record for a publisher */
export interface MarketplacePayout {
  readonly id: string;
  readonly publisherId: string;
  amount: number;
  currency: string;
  platformFee: number;
  netPayout: number;
  periodStart: string;
  periodEnd: string;
  transactionCount: number;
  payoutMethod: string;
  payoutReference?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'on_hold';
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}
