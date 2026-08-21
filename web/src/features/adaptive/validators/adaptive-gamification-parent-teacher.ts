import { z } from 'zod';

const challengeStatusEnum = z.enum(['active', 'completed', 'expired', 'upcoming']);
const rewardTypeEnum = z.enum(['badge', 'xp', 'virtual_currency', 'physical', 'privilege']);
const achievementTypeEnum = z.enum(['academic', 'participation', 'leadership', 'streak', 'mastery', 'special']);
const recommendationTargetEnum = z.enum(['parent', 'student', 'teacher']);
const alertSeverityEnum = z.enum(['info', 'warning', 'critical']);
const coachingStatusEnum = z.enum(['suggested', 'in_progress', 'completed', 'cancelled']);
const templateTypeEnum = z.enum(['lesson_plan', 'exam', 'homework', 'rubric', 'project']);
const insightTypeEnum = z.enum(['performance', 'engagement', 'behavior', 'attendance', 'social']);
const interventionStatusEnum = z.enum(['proposed', 'approved', 'active', 'completed', 'rejected']);

// XP
export const xpCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  amount: z.number().int().min(1),
  source: z.string().max(200),
  source_type: z.enum(['lesson', 'quiz', 'exercise', 'project', 'challenge', 'bonus']),
  description: z.string().max(500).optional(),
  multiplier: z.number().min(1).max(10).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const xpUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  amount: z.number().int().min(1).optional(),
  source: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Level
export const levelCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  current_level: z.number().int().min(1),
  current_xp: z.number().int().min(0),
  xp_to_next_level: z.number().int().min(1),
  total_xp_earned: z.number().int().min(0),
  level_name: z.string().max(100).optional(),
  level_benefits: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const levelUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  current_level: z.number().int().min(1).optional(),
  current_xp: z.number().int().min(0).optional(),
  xp_to_next_level: z.number().int().min(1).optional(),
  total_xp_earned: z.number().int().min(0).optional(),
  level_name: z.string().max(100).optional(),
  level_benefits: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Achievement
export const achievementCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000),
  type: achievementTypeEnum,
  icon_url: z.string().url().optional(),
  rarity: z.enum(['common', 'uncommon', 'rare', 'epic', 'legendary']),
  xp_reward: z.number().int().min(0).optional(),
  criteria: z.record(z.unknown()).optional(),
  unlocked_at: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const achievementUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  icon_url: z.string().url().optional(),
  rarity: z.enum(['common', 'uncommon', 'rare', 'epic', 'legendary']).optional(),
  xp_reward: z.number().int().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Mission
export const missionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  mission_type: z.enum(['daily', 'weekly', 'monthly', 'story', 'side']),
  objectives: z.array(z.object({
    description: z.string().max(500),
    target: z.number().int().min(1),
    current: z.number().int().min(0),
    is_completed: z.boolean(),
  })).min(1),
  xp_reward: z.number().int().min(0),
  deadline: z.string().datetime().optional(),
  status: challengeStatusEnum,
  progress_percentage: z.number().min(0).max(100),
  metadata: z.record(z.unknown()).optional(),
});

export const missionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  objectives: z.array(z.object({
    description: z.string().max(500),
    target: z.number().int().min(1),
    current: z.number().int().min(0),
    is_completed: z.boolean(),
  })).optional(),
  deadline: z.string().datetime().optional(),
  status: challengeStatusEnum.optional(),
  progress_percentage: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Daily Challenge
export const dailyChallengeCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  subject: z.string().max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  challenge_date: z.string().datetime(),
  tasks: z.array(z.object({
    task_id: z.string().uuid(),
    description: z.string().max(500),
    type: z.enum(['quiz', 'exercise', 'reading', 'practice']),
    target: z.number().int().min(1),
    xp_reward: z.number().int().min(0),
  })).min(1),
  total_xp_reward: z.number().int().min(0),
  time_limit_minutes: z.number().int().min(1).optional(),
  participants_count: z.number().int().min(0).optional(),
  status: challengeStatusEnum,
  metadata: z.record(z.unknown()).optional(),
});

export const dailyChallengeUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  tasks: z.array(z.object({
    task_id: z.string().uuid(),
    description: z.string().max(500),
    type: z.enum(['quiz', 'exercise', 'reading', 'practice']),
    target: z.number().int().min(1),
    xp_reward: z.number().int().min(0),
  })).optional(),
  total_xp_reward: z.number().int().min(0).optional(),
  time_limit_minutes: z.number().int().min(1).optional(),
  status: challengeStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Weekly Challenge
export const weeklyChallengeCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  theme: z.string().max(200),
  week_start: z.string().datetime(),
  week_end: z.string().datetime(),
  daily_tasks: z.array(z.object({
    day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
    tasks: z.array(z.object({
      description: z.string().max(500),
      type: z.enum(['quiz', 'exercise', 'reading', 'practice', 'project']),
      xp_reward: z.number().int().min(0),
    })),
  })).min(1),
  total_xp_reward: z.number().int().min(0),
  bonus_xp: z.number().int().min(0).optional(),
  status: challengeStatusEnum,
  metadata: z.record(z.unknown()).optional(),
});

export const weeklyChallengeUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  theme: z.string().max(200).optional(),
  daily_tasks: z.array(z.object({
    day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
    tasks: z.array(z.object({
      description: z.string().max(500),
      type: z.enum(['quiz', 'exercise', 'reading', 'practice', 'project']),
      xp_reward: z.number().int().min(0),
    })),
  })).optional(),
  total_xp_reward: z.number().int().min(0).optional(),
  bonus_xp: z.number().int().min(0).optional(),
  status: challengeStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Leaderboard
export const leaderboardCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.enum(['xp', 'level', 'achievements', 'streak', 'subject']),
  scope: z.enum(['school', 'grade', 'class']),
  period: z.enum(['daily', 'weekly', 'monthly', 'all_time']),
  entries: z.array(z.object({
    rank: z.number().int().min(1),
    student_id: z.string().uuid(),
    student_name: z.string().max(200),
    score: z.number().min(0),
    avatar_url: z.string().url().optional(),
  })).min(0),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const leaderboardUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  period: z.enum(['daily', 'weekly', 'monthly', 'all_time']).optional(),
  entries: z.array(z.object({
    rank: z.number().int().min(1),
    student_id: z.string().uuid(),
    student_name: z.string().max(200),
    score: z.number().min(0),
    avatar_url: z.string().url().optional(),
  })).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Team
export const teamCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  color: z.string().max(20).optional(),
  icon_url: z.string().url().optional(),
  member_ids: z.array(z.string().uuid()).min(1),
  captain_id: z.string().uuid(),
  total_xp: z.number().int().min(0).optional(),
  team_score: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const teamUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  color: z.string().max(20).optional(),
  icon_url: z.string().url().optional(),
  member_ids: z.array(z.string().uuid()).optional(),
  captain_id: z.string().uuid().optional(),
  total_xp: z.number().int().min(0).optional(),
  team_score: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Avatar
export const avatarCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  body_type: z.enum(['slim', 'average', 'athletic', 'broad']).optional(),
  skin_color: z.string().max(30).optional(),
  hair_style: z.string().max(50).optional(),
  hair_color: z.string().max(30).optional(),
  eye_color: z.string().max(30).optional(),
  outfit: z.object({
    top: z.string().max(100).optional(),
    bottom: z.string().max(100).optional(),
    shoes: z.string().max(100).optional(),
    accessory: z.string().max(100).optional(),
  }).optional(),
  equipped_items: z.array(z.string().uuid()).optional(),
  unlocked_items: z.array(z.string().uuid()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const avatarUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(100).optional(),
  body_type: z.enum(['slim', 'average', 'athletic', 'broad']).optional(),
  skin_color: z.string().max(30).optional(),
  hair_style: z.string().max(50).optional(),
  hair_color: z.string().max(30).optional(),
  eye_color: z.string().max(30).optional(),
  outfit: z.object({
    top: z.string().max(100).optional(),
    bottom: z.string().max(100).optional(),
    shoes: z.string().max(100).optional(),
    accessory: z.string().max(100).optional(),
  }).optional(),
  equipped_items: z.array(z.string().uuid()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Reward
export const rewardCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000),
  type: rewardTypeEnum,
  cost_xp: z.number().int().min(0).optional(),
  cost_currency: z.number().int().min(0).optional(),
  stock_quantity: z.number().int().min(-1).optional(),
  image_url: z.string().url().optional(),
  eligibility_criteria: z.record(z.unknown()).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const rewardUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: rewardTypeEnum.optional(),
  cost_xp: z.number().int().min(0).optional(),
  cost_currency: z.number().int().min(0).optional(),
  stock_quantity: z.number().int().min(-1).optional(),
  image_url: z.string().url().optional(),
  eligibility_criteria: z.record(z.unknown()).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Badge
export const badgeCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000),
  category: z.enum(['academic', 'social', 'creative', 'athletic', 'leadership', 'special']),
  icon_url: z.string().url(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']),
  criteria: z.array(z.object({
    type: z.string().max(100),
    target: z.number().int().min(1),
    description: z.string().max(500),
  })).min(1),
  xp_reward: z.number().int().min(0).optional(),
  is_hidden: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const badgeUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  category: z.enum(['academic', 'social', 'creative', 'athletic', 'leadership', 'special']).optional(),
  icon_url: z.string().url().optional(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']).optional(),
  criteria: z.array(z.object({
    type: z.string().max(100),
    target: z.number().int().min(1),
    description: z.string().max(500),
  })).optional(),
  xp_reward: z.number().int().min(0).optional(),
  is_hidden: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Virtual Currency
export const virtualCurrencyCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  balance: z.number().int().min(0),
  total_earned: z.number().int().min(0),
  total_spent: z.number().int().min(0),
  currency_name: z.string().max(50),
  recent_transactions: z.array(z.object({
    type: z.enum(['earned', 'spent', 'bonus']),
    amount: z.number().int().min(0),
    source: z.string().max(200),
    timestamp: z.string().datetime(),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const virtualCurrencyUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  balance: z.number().int().min(0).optional(),
  total_earned: z.number().int().min(0).optional(),
  total_spent: z.number().int().min(0).optional(),
  recent_transactions: z.array(z.object({
    type: z.enum(['earned', 'spent', 'bonus']),
    amount: z.number().int().min(0),
    source: z.string().max(200),
    timestamp: z.string().datetime(),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Parent Recommendation
export const parentRecommendationCreateSchema = z.object({
  school_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  student_id: z.string().uuid(),
  target: recommendationTargetEnum,
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  category: z.enum(['academic', 'behavioral', 'social', 'emotional', 'health']),
  priority: z.enum(['low', 'medium', 'high']),
  actions: z.array(z.string().max(500)).min(1),
  expected_outcome: z.string().max(500).optional(),
  deadline: z.string().datetime().optional(),
  status: z.enum(['new', 'read', 'accepted', 'implemented']),
  metadata: z.record(z.unknown()).optional(),
});

export const parentRecommendationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  actions: z.array(z.string().max(500)).optional(),
  expected_outcome: z.string().max(500).optional(),
  deadline: z.string().datetime().optional(),
  status: z.enum(['new', 'read', 'accepted', 'implemented']).optional(),
  feedback: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Parent Alert
export const parentAlertCreateSchema = z.object({
  school_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  student_id: z.string().uuid(),
  severity: alertSeverityEnum,
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  alert_type: z.enum(['academic', 'behavioral', 'attendance', 'health', 'safety', 'system']),
  requires_action: z.boolean().optional(),
  action_url: z.string().url().optional(),
  acknowledged_at: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const parentAlertUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  severity: alertSeverityEnum.optional(),
  title: z.string().min(1).max(200).optional(),
  message: z.string().min(1).max(2000).optional(),
  requires_action: z.boolean().optional(),
  action_url: z.string().url().optional(),
  acknowledged_at: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Parent Coaching
export const parentCoachingCreateSchema = z.object({
  school_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  student_id: z.string().uuid(),
  topic: z.string().min(1).max(200),
  description: z.string().max(2000),
  coaching_type: z.enum(['homework_help', 'study_tips', 'motivation', 'behavior', 'communication']),
  sessions: z.array(z.object({
    session_date: z.string().datetime(),
    duration_minutes: z.number().int().min(1),
    notes: z.string().max(1000).optional(),
    status: z.enum(['scheduled', 'completed', 'cancelled']),
  })).optional(),
  status: coachingStatusEnum,
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const parentCoachingUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  topic: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  coaching_type: z.enum(['homework_help', 'study_tips', 'motivation', 'behavior', 'communication']).optional(),
  sessions: z.array(z.object({
    session_date: z.string().datetime(),
    duration_minutes: z.number().int().min(1),
    notes: z.string().max(1000).optional(),
    status: z.enum(['scheduled', 'completed', 'cancelled']),
  })).optional(),
  status: coachingStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Home Activity
export const homeActivityCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  parent_id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  activity_type: z.enum(['reading', 'math_game', 'science_experiment', 'creative_writing', 'art', 'physical']),
  subject: z.string().max(100).optional(),
  estimated_minutes: z.number().int().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  materials_needed: z.array(z.string().max(200)).optional(),
  instructions: z.array(z.string().max(500)).min(1),
  xp_reward: z.number().int().min(0).optional(),
  is_completed: z.boolean().optional(),
  completion_photo_url: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const homeActivityUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  activity_type: z.enum(['reading', 'math_game', 'science_experiment', 'creative_writing', 'art', 'physical']).optional(),
  estimated_minutes: z.number().int().min(1).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  materials_needed: z.array(z.string().max(200)).optional(),
  instructions: z.array(z.string().max(500)).optional(),
  xp_reward: z.number().int().min(0).optional(),
  is_completed: z.boolean().optional(),
  completion_photo_url: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Parent Weekly Report
export const parentWeeklyReportCreateSchema = z.object({
  school_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  student_id: z.string().uuid(),
  week_start: z.string().datetime(),
  week_end: z.string().datetime(),
  summary: z.string().max(2000),
  academic_highlights: z.array(z.string().max(500)).optional(),
  areas_of_concern: z.array(z.string().max(500)).optional(),
  attendance_summary: z.object({
    days_present: z.number().int().min(0),
    days_absent: z.number().int().min(0),
    days_late: z.number().int().min(0),
  }).optional(),
  grade_summary: z.record(z.number().min(0).max(100)).optional(),
  engagement_score: z.number().min(0).max(100).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  next_week_preview: z.string().max(1000).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const parentWeeklyReportUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  summary: z.string().max(2000).optional(),
  academic_highlights: z.array(z.string().max(500)).optional(),
  areas_of_concern: z.array(z.string().max(500)).optional(),
  attendance_summary: z.object({
    days_present: z.number().int().min(0),
    days_absent: z.number().int().min(0),
    days_late: z.number().int().min(0),
  }).optional(),
  grade_summary: z.record(z.number().min(0).max(100)).optional(),
  engagement_score: z.number().min(0).max(100).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  next_week_preview: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Lesson Plan
export const lessonPlanCreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  template_type: templateTypeEnum,
  duration_minutes: z.number().int().min(1),
  objectives: z.array(z.string().max(500)).min(1),
  materials: z.array(z.string().max(200)).optional(),
  activities: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['introduction', 'main_activity', 'practice', 'assessment', 'closure']),
    duration_minutes: z.number().int().min(1),
    description: z.string().max(1000),
    resources: z.array(z.string().max(200)).optional(),
  })).min(1),
  differentiation: z.array(z.string().max(500)).optional(),
  assessment_method: z.string().max(200).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const lessonPlanUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  duration_minutes: z.number().int().min(1).optional(),
  objectives: z.array(z.string().max(500)).optional(),
  materials: z.array(z.string().max(200)).optional(),
  activities: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['introduction', 'main_activity', 'practice', 'assessment', 'closure']),
    duration_minutes: z.number().int().min(1),
    description: z.string().max(1000),
    resources: z.array(z.string().max(200)).optional(),
  })).optional(),
  differentiation: z.array(z.string().max(500)).optional(),
  assessment_method: z.string().max(200).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Exam Template
export const examTemplateCreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  template_type: templateTypeEnum,
  duration_minutes: z.number().int().min(1),
  total_points: z.number().int().min(1),
  sections: z.array(z.object({
    name: z.string().max(200),
    question_count: z.number().int().min(1),
    points_per_question: z.number().min(0),
    question_type: z.enum(['mcq', 'short_answer', 'essay', 'true_false', 'fill_blank']),
    instructions: z.string().max(500).optional(),
  })).min(1),
  passing_score: z.number().min(0).max(100),
  instructions: z.string().max(2000).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const examTemplateUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  duration_minutes: z.number().int().min(1).optional(),
  total_points: z.number().int().min(1).optional(),
  sections: z.array(z.object({
    name: z.string().max(200),
    question_count: z.number().int().min(1),
    points_per_question: z.number().min(0),
    question_type: z.enum(['mcq', 'short_answer', 'essay', 'true_false', 'fill_blank']),
    instructions: z.string().max(500).optional(),
  })).optional(),
  passing_score: z.number().min(0).max(100).optional(),
  instructions: z.string().max(2000).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Homework Template
export const homeworkTemplateCreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  template_type: templateTypeEnum,
  estimated_duration_minutes: z.number().int().min(1),
  tasks: z.array(z.object({
    task_number: z.number().int().min(1),
    description: z.string().max(1000),
    type: z.enum(['reading', 'exercise', 'project', 'research', 'practice']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    points: z.number().int().min(0).optional(),
  })).min(1),
  due_date_instructions: z.string().max(500).optional(),
  submission_format: z.enum(['online', 'paper', 'both']).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const homeworkTemplateUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  estimated_duration_minutes: z.number().int().min(1).optional(),
  tasks: z.array(z.object({
    task_number: z.number().int().min(1),
    description: z.string().max(1000),
    type: z.enum(['reading', 'exercise', 'project', 'research', 'practice']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    points: z.number().int().min(0).optional(),
  })).optional(),
  due_date_instructions: z.string().max(500).optional(),
  submission_format: z.enum(['online', 'paper', 'both']).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Rubric Template
export const rubricTemplateCreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  template_type: templateTypeEnum,
  assessment_type: z.enum(['essay', 'project', 'presentation', 'practical', 'portfolio']),
  criteria: z.array(z.object({
    name: z.string().max(200),
    description: z.string().max(500),
    weight: z.number().min(0).max(100),
    levels: z.array(z.object({
      level: z.number().int().min(1),
      label: z.string().max(100),
      description: z.string().max(500),
      points: z.number().int().min(0),
    })).min(2),
  })).min(1),
  total_points: z.number().int().min(1),
  is_ai_assisted: z.boolean().optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const rubricTemplateUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  assessment_type: z.enum(['essay', 'project', 'presentation', 'practical', 'portfolio']).optional(),
  criteria: z.array(z.object({
    name: z.string().max(200),
    description: z.string().max(500),
    weight: z.number().min(0).max(100),
    levels: z.array(z.object({
      level: z.number().int().min(1),
      label: z.string().max(100),
      description: z.string().max(500),
      points: z.number().int().min(0),
    })).min(2),
  })).optional(),
  total_points: z.number().int().min(1).optional(),
  is_ai_assisted: z.boolean().optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Classroom Insights
export const classroomInsightsCreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  class_id: z.string().uuid(),
  insight_type: insightTypeEnum,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  affected_student_ids: z.array(z.string().uuid()).optional(),
  metrics: z.record(z.number()).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  confidence: z.number().min(0).max(1),
  period: z.enum(['daily', 'weekly', 'monthly']),
  generated_at: z.string().datetime(),
  is_read: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const classroomInsightsUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  affected_student_ids: z.array(z.string().uuid()).optional(),
  metrics: z.record(z.number()).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  is_read: z.boolean().optional(),
  is_archived: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Attendance Insights
export const attendanceInsightsCreateSchema = z.object({
  school_id: z.string().uuid(),
  class_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  period: z.enum(['daily', 'weekly', 'monthly']),
  period_start: z.string().datetime(),
  period_end: z.string().datetime(),
  total_students: z.number().int().min(0),
  average_attendance_rate: z.number().min(0).max(100),
  chronic_absentees: z.number().int().min(0),
  late_arrivals: z.number().int().min(0),
  early_departures: z.number().int().min(0),
  attendance_trend: z.enum(['improving', 'stable', 'declining']),
  at_risk_students: z.array(z.object({
    student_id: z.string().uuid(),
    student_name: z.string().max(200),
    attendance_rate: z.number().min(0).max(100),
    risk_level: z.enum(['low', 'medium', 'high']),
  })).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const attendanceInsightsUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  average_attendance_rate: z.number().min(0).max(100).optional(),
  chronic_absentees: z.number().int().min(0).optional(),
  late_arrivals: z.number().int().min(0).optional(),
  early_departures: z.number().int().min(0).optional(),
  attendance_trend: z.enum(['improving', 'stable', 'declining']).optional(),
  at_risk_students: z.array(z.object({
    student_id: z.string().uuid(),
    student_name: z.string().max(200),
    attendance_rate: z.number().min(0).max(100),
    risk_level: z.enum(['low', 'medium', 'high']),
  })).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Teacher Intervention
export const teacherInterventionCreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  student_id: z.string().uuid(),
  intervention_type: z.enum(['academic_support', 'behavioral', 'attendance', 'social_emotional', 'health_referral']),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']),
  trigger_reason: z.string().max(500),
  planned_actions: z.array(z.object({
    action: z.string().max(500),
    responsible: z.string().max(200),
    deadline: z.string().datetime().optional(),
  })).min(1),
  status: interventionStatusEnum,
  metadata: z.record(z.unknown()).optional(),
});

export const teacherInterventionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  planned_actions: z.array(z.object({
    action: z.string().max(500),
    responsible: z.string().max(200),
    deadline: z.string().datetime().optional(),
  })).optional(),
  status: interventionStatusEnum.optional(),
  outcome_notes: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// School Performance AI
export const schoolPerformanceAICreateSchema = z.object({
  school_id: z.string().uuid(),
  analysis_type: z.enum(['academic', 'operational', 'financial', 'comprehensive']),
  period: z.enum(['monthly', 'quarterly', 'annual']),
  period_start: z.string().datetime(),
  period_end: z.string().datetime(),
  overall_score: z.number().min(0).max(100),
  dimensions: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    trend: z.enum(['improving', 'stable', 'declining']),
    benchmark: z.number().min(0).max(100).optional(),
  })).min(1),
  ai_insights: z.array(z.string().max(500)).min(1),
  recommendations: z.array(z.string().max(500)).optional(),
  risk_areas: z.array(z.string().max(200)).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const schoolPerformanceAIUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  overall_score: z.number().min(0).max(100).optional(),
  dimensions: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    trend: z.enum(['improving', 'stable', 'declining']),
    benchmark: z.number().min(0).max(100).optional(),
  })).optional(),
  ai_insights: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  risk_areas: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Teacher Performance AI
export const teacherPerformanceAICreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  period: z.enum(['monthly', 'quarterly', 'annual']),
  period_start: z.string().datetime(),
  period_end: z.string().datetime(),
  overall_score: z.number().min(0).max(100),
  dimensions: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    trend: z.enum(['improving', 'stable', 'declining']),
  })).min(1),
  student_feedback_score: z.number().min(0).max(100).optional(),
  class_performance_avg: z.number().min(0).max(100).optional(),
  ai_insights: z.array(z.string().max(500)).min(1),
  development_suggestions: z.array(z.string().max(500)).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const teacherPerformanceAIUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  overall_score: z.number().min(0).max(100).optional(),
  dimensions: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    trend: z.enum(['improving', 'stable', 'declining']),
  })).optional(),
  student_feedback_score: z.number().min(0).max(100).optional(),
  class_performance_avg: z.number().min(0).max(100).optional(),
  ai_insights: z.array(z.string().max(500)).optional(),
  development_suggestions: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Curriculum Analysis
export const curriculumAnalysisCreateSchema = z.object({
  school_id: z.string().uuid(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  analysis_type: z.enum(['alignment', 'effectiveness', 'gaps', 'comprehensive']),
  overall_effectiveness_score: z.number().min(0).max(100),
  unit_analyses: z.array(z.object({
    unit_name: z.string().max(200),
    effectiveness_score: z.number().min(0).max(100),
    student_mastery_rate: z.number().min(0).max(100),
    engagement_score: z.number().min(0).max(100).optional(),
    identified_gaps: z.array(z.string().max(200)).optional(),
  })).min(1),
  alignment_score: z.number().min(0).max(100).optional(),
  ai_recommendations: z.array(z.string().max(500)).min(1),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const curriculumAnalysisUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  overall_effectiveness_score: z.number().min(0).max(100).optional(),
  unit_analyses: z.array(z.object({
    unit_name: z.string().max(200),
    effectiveness_score: z.number().min(0).max(100),
    student_mastery_rate: z.number().min(0).max(100),
    engagement_score: z.number().min(0).max(100).optional(),
    identified_gaps: z.array(z.string().max(200)).optional(),
  })).optional(),
  alignment_score: z.number().min(0).max(100).optional(),
  ai_recommendations: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Resource Allocation
export const resourceAllocationCreateSchema = z.object({
  school_id: z.string().uuid(),
  allocation_type: z.enum(['staffing', 'budget', 'equipment', 'time', 'technology']),
  period: z.enum(['monthly', 'quarterly', 'annual']),
  period_start: z.string().datetime(),
  period_end: z.string().datetime(),
  total_resources: z.number().min(0),
  allocated_resources: z.array(z.object({
    category: z.string().max(200),
    allocated: z.number().min(0),
    utilized: z.number().min(0),
    efficiency_score: z.number().min(0).max(100),
  })).min(1),
  ai_optimization_suggestions: z.array(z.string().max(500)).min(1),
  cost_savings_potential: z.number().min(0).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const resourceAllocationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  total_resources: z.number().min(0).optional(),
  allocated_resources: z.array(z.object({
    category: z.string().max(200),
    allocated: z.number().min(0),
    utilized: z.number().min(0),
    efficiency_score: z.number().min(0).max(100),
  })).optional(),
  ai_optimization_suggestions: z.array(z.string().max(500)).optional(),
  cost_savings_potential: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Risk Prediction
export const riskPredictionCreateSchema = z.object({
  school_id: z.string().uuid(),
  prediction_type: z.enum(['dropout', 'academic_failure', 'behavioral_issue', 'attendance_problem', 'financial_risk']),
  entity_type: z.enum(['student', 'class', 'grade', 'school']),
  entity_id: z.string().uuid(),
  entity_name: z.string().max(200).optional(),
  risk_score: z.number().min(0).max(100),
  risk_level: z.enum(['low', 'medium', 'high', 'critical']),
  confidence: z.number().min(0).max(1),
  contributing_factors: z.array(z.object({
    factor: z.string().max(200),
    weight: z.number().min(0).max(1),
    description: z.string().max(500).optional(),
  })).optional(),
  recommended_interventions: z.array(z.string().max(500)).optional(),
  prediction_date: z.string().datetime(),
  is_acknowledged: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const riskPredictionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  risk_score: z.number().min(0).max(100).optional(),
  risk_level: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  confidence: z.number().min(0).max(1).optional(),
  contributing_factors: z.array(z.object({
    factor: z.string().max(200),
    weight: z.number().min(0).max(1),
    description: z.string().max(500).optional(),
  })).optional(),
  recommended_interventions: z.array(z.string().max(500)).optional(),
  is_acknowledged: z.boolean().optional(),
  is_mitigated: z.boolean().optional(),
  mitigation_notes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// National Comparison
export const nationalComparisonCreateSchema = z.object({
  school_id: z.string().uuid(),
  comparison_type: z.enum(['academic_performance', 'graduation_rate', 'attendance', 'resource_efficiency', 'comprehensive']),
  period: z.enum(['quarterly', 'annual']),
  period_year: z.number().int().min(2000),
  school_score: z.number().min(0).max(100),
  national_average: z.number().min(0).max(100),
  regional_average: z.number().min(0).max(100).optional(),
  percentile_rank: z.number().int().min(1).max(100),
  dimension_comparisons: z.array(z.object({
    dimension: z.string().max(200),
    school_score: z.number().min(0).max(100),
    national_average: z.number().min(0).max(100),
    difference: z.number().min(-100).max(100),
  })).optional(),
  ai_analysis: z.string().max(2000).optional(),
  improvement_areas: z.array(z.string().max(200)).optional(),
  strength_areas: z.array(z.string().max(200)).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const nationalComparisonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  school_score: z.number().min(0).max(100).optional(),
  national_average: z.number().min(0).max(100).optional(),
  regional_average: z.number().min(0).max(100).optional(),
  percentile_rank: z.number().int().min(1).max(100).optional(),
  dimension_comparisons: z.array(z.object({
    dimension: z.string().max(200),
    school_score: z.number().min(0).max(100),
    national_average: z.number().min(0).max(100),
    difference: z.number().min(-100).max(100),
  })).optional(),
  ai_analysis: z.string().max(2000).optional(),
  improvement_areas: z.array(z.string().max(200)).optional(),
  strength_areas: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});