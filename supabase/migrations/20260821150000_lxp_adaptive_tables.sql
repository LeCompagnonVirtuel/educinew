-- ============================================================================
-- LXP & Adaptive Module Tables Migration
-- Created: 2026-08-21
-- ============================================================================
-- Sections:
--   LXP MODULE
--     1. LXP Profiles & Paths
--     2. LXP Path Items & Progress
--     3. LXP Badges & Points
--     4. LXP Leaderboards & Recommendations
--     5. LXP Analytics & Engagement
--     6. LXP Certifications & Mentorships
--     7. LXP Discussions
--     8. LXP Resources & Reviews
--     9. LXP Learning Groups
--    10. LXP Assessments
--    11. LXP Learning Plans
--    12. LXP Streaks & Rewards
--    13. LXP Social (consolidated)
--    14. LXP Social Groups (consolidated)
--   ADAPTIVE MODULE
--    15. Adaptive Core (Cognitive & Learning Paths)
--    16. Adaptive Analytics
--    17. Adaptive Knowledge & Mastery
--    18. Adaptive Content & User Features
--    19. Adaptive Models & Predictions
--    20. Adaptive A/B Testing & Feature Flags
--    21. Adaptive Dashboards & Widgets
--    22. Adaptive Reports
--    23. Adaptive Alerts
--    24. Adaptive Goals & Achievements
--    25. Adaptive Social (consolidated)
-- ============================================================================

-- Helper: update_updated_at_column trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- LXP MODULE
-- ============================================================================

-- ============================================================================
-- 1. LXP Profiles & Paths
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  learning_style TEXT,
  preferences JSONB DEFAULT '{}',
  goals JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_profiles_school_id ON lxp_profiles(school_id);
CREATE INDEX idx_lxp_profiles_user_id ON lxp_profiles(school_id, user_id);

ALTER TABLE lxp_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_profiles
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_profiles_updated_at
  BEFORE UPDATE ON lxp_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')),
  estimated_hours NUMERIC(6,1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_paths_school_id ON lxp_paths(school_id);

ALTER TABLE lxp_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_paths
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_paths_updated_at
  BEFORE UPDATE ON lxp_paths
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2. LXP Path Items & Progress
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_path_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  path_id UUID NOT NULL REFERENCES lxp_paths(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_path_items_school_id ON lxp_path_items(school_id);
CREATE INDEX idx_lxp_path_items_path_id ON lxp_path_items(school_id, path_id);

ALTER TABLE lxp_path_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_path_items
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_path_items_updated_at
  BEFORE UPDATE ON lxp_path_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  path_id UUID NOT NULL REFERENCES lxp_paths(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')),
  progress_pct NUMERIC(5,2) DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_progress_school_id ON lxp_progress(school_id);
CREATE INDEX idx_lxp_progress_user_id ON lxp_progress(school_id, user_id);
CREATE INDEX idx_lxp_progress_path_id ON lxp_progress(school_id, path_id);

ALTER TABLE lxp_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_progress
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_progress_updated_at
  BEFORE UPDATE ON lxp_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 3. LXP Badges & Points
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_badges_school_id ON lxp_badges(school_id);

ALTER TABLE lxp_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_badges
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_badges_updated_at
  BEFORE UPDATE ON lxp_badges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES lxp_badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_user_badges_school_id ON lxp_user_badges(school_id);
CREATE INDEX idx_lxp_user_badges_user_id ON lxp_user_badges(school_id, user_id);

ALTER TABLE lxp_user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_user_badges
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_user_badges_updated_at
  BEFORE UPDATE ON lxp_user_badges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  reason TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_points_school_id ON lxp_points(school_id);
CREATE INDEX idx_lxp_points_user_id ON lxp_points(school_id, user_id);

ALTER TABLE lxp_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_points
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_points_updated_at
  BEFORE UPDATE ON lxp_points
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. LXP Leaderboards & Recommendations
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  period TEXT DEFAULT 'all_time' CHECK (period IN ('daily', 'weekly', 'monthly', 'all_time')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_leaderboards_school_id ON lxp_leaderboards(school_id);

ALTER TABLE lxp_leaderboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_leaderboards
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_leaderboards_updated_at
  BEFORE UPDATE ON lxp_leaderboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_leaderboard_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  leaderboard_id UUID NOT NULL REFERENCES lxp_leaderboards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  rank INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_leaderboard_entries_school_id ON lxp_leaderboard_entries(school_id);
CREATE INDEX idx_lxp_leaderboard_entries_leaderboard_id ON lxp_leaderboard_entries(school_id, leaderboard_id);

ALTER TABLE lxp_leaderboard_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_leaderboard_entries
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_leaderboard_entries_updated_at
  BEFORE UPDATE ON lxp_leaderboard_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  reason TEXT,
  score NUMERIC(5,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_recommendations_school_id ON lxp_recommendations(school_id);
CREATE INDEX idx_lxp_recommendations_user_id ON lxp_recommendations(school_id, user_id);

ALTER TABLE lxp_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_recommendations
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_recommendations_updated_at
  BEFORE UPDATE ON lxp_recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 5. LXP Analytics & Engagement
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC(12,2),
  period TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_analytics_school_id ON lxp_analytics(school_id);
CREATE INDEX idx_lxp_analytics_user_id ON lxp_analytics(school_id, user_id);

ALTER TABLE lxp_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_analytics
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_analytics_updated_at
  BEFORE UPDATE ON lxp_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  duration INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_engagement_school_id ON lxp_engagement(school_id);
CREATE INDEX idx_lxp_engagement_user_id ON lxp_engagement(school_id, user_id);

ALTER TABLE lxp_engagement ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_engagement
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_engagement_updated_at
  BEFORE UPDATE ON lxp_engagement
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. LXP Certifications & Mentorships
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  certification_type TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_certifications_school_id ON lxp_certifications(school_id);
CREATE INDEX idx_lxp_certifications_user_id ON lxp_certifications(school_id, user_id);

ALTER TABLE lxp_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_certifications
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_certifications_updated_at
  BEFORE UPDATE ON lxp_certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_mentorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL,
  mentee_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_mentorships_school_id ON lxp_mentorships(school_id);
CREATE INDEX idx_lxp_mentorships_mentor_id ON lxp_mentorships(school_id, mentor_id);
CREATE INDEX idx_lxp_mentorships_mentee_id ON lxp_mentorships(school_id, mentee_id);

ALTER TABLE lxp_mentorships ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_mentorships
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_mentorships_updated_at
  BEFORE UPDATE ON lxp_mentorships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 7. LXP Discussions
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_discussions_school_id ON lxp_discussions(school_id);
CREATE INDEX idx_lxp_discussions_item ON lxp_discussions(school_id, item_type, item_id);

ALTER TABLE lxp_discussions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_discussions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_discussions_updated_at
  BEFORE UPDATE ON lxp_discussions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_discussion_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  discussion_id UUID NOT NULL REFERENCES lxp_discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_discussion_posts_school_id ON lxp_discussion_posts(school_id);
CREATE INDEX idx_lxp_discussion_posts_discussion_id ON lxp_discussion_posts(school_id, discussion_id);

ALTER TABLE lxp_discussion_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_discussion_posts
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_discussion_posts_updated_at
  BEFORE UPDATE ON lxp_discussion_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 8. LXP Resources & Reviews
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_resources_school_id ON lxp_resources(school_id);

ALTER TABLE lxp_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_resources
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_resources_updated_at
  BEFORE UPDATE ON lxp_resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_resource_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES lxp_resources(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_resource_reviews_school_id ON lxp_resource_reviews(school_id);
CREATE INDEX idx_lxp_resource_reviews_resource_id ON lxp_resource_reviews(school_id, resource_id);

ALTER TABLE lxp_resource_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_resource_reviews
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_resource_reviews_updated_at
  BEFORE UPDATE ON lxp_resource_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 9. LXP Learning Groups
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_learning_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_learning_groups_school_id ON lxp_learning_groups(school_id);

ALTER TABLE lxp_learning_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_learning_groups
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_learning_groups_updated_at
  BEFORE UPDATE ON lxp_learning_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES lxp_learning_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_group_members_school_id ON lxp_group_members(school_id);
CREATE INDEX idx_lxp_group_members_group_id ON lxp_group_members(school_id, group_id);

ALTER TABLE lxp_group_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_group_members
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_group_members_updated_at
  BEFORE UPDATE ON lxp_group_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 10. LXP Assessments
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'quiz' CHECK (type IN ('quiz', 'exam', 'assignment', 'survey')),
  time_limit INTEGER,
  passing_score NUMERIC(5,2) DEFAULT 60.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_assessments_school_id ON lxp_assessments(school_id);

ALTER TABLE lxp_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_assessments
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_assessments_updated_at
  BEFORE UPDATE ON lxp_assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES lxp_assessments(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'essay')),
  content TEXT NOT NULL,
  options JSONB DEFAULT '[]',
  correct_answer TEXT,
  points INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_assessment_questions_school_id ON lxp_assessment_questions(school_id);
CREATE INDEX idx_lxp_assessment_questions_assessment_id ON lxp_assessment_questions(school_id, assessment_id);

ALTER TABLE lxp_assessment_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_assessment_questions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_assessment_questions_updated_at
  BEFORE UPDATE ON lxp_assessment_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES lxp_assessments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  score NUMERIC(6,2),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_assessment_attempts_school_id ON lxp_assessment_attempts(school_id);
CREATE INDEX idx_lxp_assessment_attempts_assessment_id ON lxp_assessment_attempts(school_id, assessment_id);
CREATE INDEX idx_lxp_assessment_attempts_user_id ON lxp_assessment_attempts(school_id, user_id);

ALTER TABLE lxp_assessment_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_assessment_attempts
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_assessment_attempts_updated_at
  BEFORE UPDATE ON lxp_assessment_attempts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_assessment_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  attempt_id UUID NOT NULL REFERENCES lxp_assessment_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES lxp_assessment_questions(id) ON DELETE CASCADE,
  answer TEXT,
  is_correct BOOLEAN,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_assessment_answers_school_id ON lxp_assessment_answers(school_id);
CREATE INDEX idx_lxp_assessment_answers_attempt_id ON lxp_assessment_answers(school_id, attempt_id);

ALTER TABLE lxp_assessment_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_assessment_answers
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_assessment_answers_updated_at
  BEFORE UPDATE ON lxp_assessment_answers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 11. LXP Learning Plans
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_learning_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  goals JSONB DEFAULT '[]',
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'abandoned')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_learning_plans_school_id ON lxp_learning_plans(school_id);
CREATE INDEX idx_lxp_learning_plans_user_id ON lxp_learning_plans(school_id, user_id);

ALTER TABLE lxp_learning_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_learning_plans
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_learning_plans_updated_at
  BEFORE UPDATE ON lxp_learning_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_learning_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES lxp_learning_plans(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  target_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_learning_plan_items_school_id ON lxp_learning_plan_items(school_id);
CREATE INDEX idx_lxp_learning_plan_items_plan_id ON lxp_learning_plan_items(school_id, plan_id);

ALTER TABLE lxp_learning_plan_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_learning_plan_items
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_learning_plan_items_updated_at
  BEFORE UPDATE ON lxp_learning_plan_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 12. LXP Streaks & Rewards
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  streak_type TEXT NOT NULL DEFAULT 'daily',
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_streaks_school_id ON lxp_streaks(school_id);
CREATE INDEX idx_lxp_streaks_user_id ON lxp_streaks(school_id, user_id);

ALTER TABLE lxp_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_streaks
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_streaks_updated_at
  BEFORE UPDATE ON lxp_streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cost INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'badge' CHECK (type IN ('badge', 'badge', 'badge', 'custom')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_rewards_school_id ON lxp_rewards(school_id);

ALTER TABLE lxp_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_rewards
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_rewards_updated_at
  BEFORE UPDATE ON lxp_rewards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_reward_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  reward_id UUID NOT NULL REFERENCES lxp_rewards(id) ON DELETE CASCADE,
  points_spent INTEGER NOT NULL DEFAULT 0,
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_reward_redemptions_school_id ON lxp_reward_redemptions(school_id);
CREATE INDEX idx_lxp_reward_redemptions_user_id ON lxp_reward_redemptions(school_id, user_id);

ALTER TABLE lxp_reward_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_reward_redemptions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_reward_redemptions_updated_at
  BEFORE UPDATE ON lxp_reward_redemptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 13. LXP Social (consolidated)
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'school', 'private')),
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_social_posts_school_id ON lxp_social_posts(school_id);
CREATE INDEX idx_lxp_social_posts_user_id ON lxp_social_posts(school_id, user_id);

ALTER TABLE lxp_social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_social_posts
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_social_posts_updated_at
  BEFORE UPDATE ON lxp_social_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_social_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES lxp_social_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'comment', 'share', 'bookmark', 'report', 'reaction')),
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_social_interactions_school_id ON lxp_social_interactions(school_id);
CREATE INDEX idx_lxp_social_interactions_post_id ON lxp_social_interactions(school_id, post_id);

ALTER TABLE lxp_social_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_social_interactions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_social_interactions_updated_at
  BEFORE UPDATE ON lxp_social_interactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_social_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_social_settings_school_id ON lxp_social_settings(school_id);
CREATE INDEX idx_lxp_social_settings_user_id ON lxp_social_settings(school_id, user_id);

ALTER TABLE lxp_social_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_social_settings
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_social_settings_updated_at
  BEFORE UPDATE ON lxp_social_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 14. LXP Social Groups (consolidated)
-- ============================================================================

CREATE TABLE IF NOT EXISTS lxp_social_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  privacy TEXT NOT NULL DEFAULT 'public' CHECK (privacy IN ('public', 'private', 'restricted')),
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_social_groups_school_id ON lxp_social_groups(school_id);

ALTER TABLE lxp_social_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_social_groups
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_social_groups_updated_at
  BEFORE UPDATE ON lxp_social_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_social_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES lxp_social_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_social_group_members_school_id ON lxp_social_group_members(school_id);
CREATE INDEX idx_lxp_social_group_members_group_id ON lxp_social_group_members(school_id, group_id);

ALTER TABLE lxp_social_group_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_social_group_members
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_social_group_members_updated_at
  BEFORE UPDATE ON lxp_social_group_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS lxp_social_group_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES lxp_social_groups(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lxp_social_group_content_school_id ON lxp_social_group_content(school_id);
CREATE INDEX idx_lxp_social_group_content_group_id ON lxp_social_group_content(school_id, group_id);

ALTER TABLE lxp_social_group_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON lxp_social_group_content
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER lxp_social_group_content_updated_at
  BEFORE UPDATE ON lxp_social_group_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ADAPTIVE MODULE
-- ============================================================================

-- ============================================================================
-- 15. Adaptive Core (Cognitive Profiles & Learning Paths)
-- ============================================================================

CREATE TABLE IF NOT EXISTS cognitive_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  profile_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cognitive_profiles_school_id ON cognitive_profiles(school_id);
CREATE INDEX idx_cognitive_profiles_user_id ON cognitive_profiles(school_id, user_id);

ALTER TABLE cognitive_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON cognitive_profiles
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER cognitive_profiles_updated_at
  BEFORE UPDATE ON cognitive_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'abandoned')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_paths_school_id ON learning_paths(school_id);
CREATE INDEX idx_learning_paths_user_id ON learning_paths(school_id, user_id);

ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON learning_paths
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER learning_paths_updated_at
  BEFORE UPDATE ON learning_paths
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS learning_path_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  node_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_path_nodes_school_id ON learning_path_nodes(school_id);
CREATE INDEX idx_learning_path_nodes_path_id ON learning_path_nodes(school_id, path_id);

ALTER TABLE learning_path_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON learning_path_nodes
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER learning_path_nodes_updated_at
  BEFORE UPDATE ON learning_path_nodes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS learning_path_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  from_node_id UUID NOT NULL REFERENCES learning_path_nodes(id) ON DELETE CASCADE,
  to_node_id UUID NOT NULL REFERENCES learning_path_nodes(id) ON DELETE CASCADE,
  condition JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_path_edges_school_id ON learning_path_edges(school_id);
CREATE INDEX idx_learning_path_edges_path_id ON learning_path_edges(school_id, path_id);

ALTER TABLE learning_path_edges ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON learning_path_edges
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER learning_path_edges_updated_at
  BEFORE UPDATE ON learning_path_edges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 16. Adaptive Analytics
-- ============================================================================

CREATE TABLE IF NOT EXISTS assessment_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL,
  user_id UUID NOT NULL,
  analytics_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assessment_analytics_school_id ON assessment_analytics(school_id);
CREATE INDEX idx_assessment_analytics_assessment_id ON assessment_analytics(school_id, assessment_id);

ALTER TABLE assessment_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON assessment_analytics
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER assessment_analytics_updated_at
  BEFORE UPDATE ON assessment_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS content_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  content_id UUID NOT NULL,
  user_id UUID NOT NULL,
  analytics_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_analytics_school_id ON content_analytics(school_id);
CREATE INDEX idx_content_analytics_content_id ON content_analytics(school_id, content_id);

ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON content_analytics
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER content_analytics_updated_at
  BEFORE UPDATE ON content_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC(12,4),
  period TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_performance_metrics_school_id ON performance_metrics(school_id);
CREATE INDEX idx_performance_metrics_user_id ON performance_metrics(school_id, user_id);

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON performance_metrics
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER performance_metrics_updated_at
  BEFORE UPDATE ON performance_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS learning_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_analytics_school_id ON learning_analytics(school_id);
CREATE INDEX idx_learning_analytics_user_id ON learning_analytics(school_id, user_id);

ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON learning_analytics
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER learning_analytics_updated_at
  BEFORE UPDATE ON learning_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  score NUMERIC(5,4),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_recommendations_school_id ON recommendations(school_id);
CREATE INDEX idx_recommendations_user_id ON recommendations(school_id, user_id);

ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON recommendations
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER recommendations_updated_at
  BEFORE UPDATE ON recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 17. Adaptive Knowledge & Mastery
-- ============================================================================

CREATE TABLE IF NOT EXISTS spaced_repetition (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content_id UUID NOT NULL,
  ease_factor NUMERIC(4,2) DEFAULT 2.5,
  interval INTEGER DEFAULT 1,
  next_review TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_spaced_repetition_school_id ON spaced_repetition(school_id);
CREATE INDEX idx_spaced_repetition_user_id ON spaced_repetition(school_id, user_id);
CREATE INDEX idx_spaced_repetition_next_review ON spaced_repetition(school_id, next_review);

ALTER TABLE spaced_repetition ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON spaced_repetition
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER spaced_repetition_updated_at
  BEFORE UPDATE ON spaced_repetition
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS difficulty_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_difficulty_levels_school_id ON difficulty_levels(school_id);

ALTER TABLE difficulty_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON difficulty_levels
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER difficulty_levels_updated_at
  BEFORE UPDATE ON difficulty_levels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS knowledge_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  topic_id UUID NOT NULL,
  state TEXT NOT NULL DEFAULT 'not_started' CHECK (state IN ('not_started', 'learning', 'reviewing', 'mastered')),
  probability NUMERIC(5,4) DEFAULT 0,
  last_assessed TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_knowledge_states_school_id ON knowledge_states(school_id);
CREATE INDEX idx_knowledge_states_user_id ON knowledge_states(school_id, user_id);

ALTER TABLE knowledge_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON knowledge_states
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER knowledge_states_updated_at
  BEFORE UPDATE ON knowledge_states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  content_id UUID NOT NULL,
  prerequisite_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_prerequisites_school_id ON prerequisites(school_id);
CREATE INDEX idx_prerequisites_content_id ON prerequisites(school_id, content_id);

ALTER TABLE prerequisites ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON prerequisites
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER prerequisites_updated_at
  BEFORE UPDATE ON prerequisites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS mastery_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  threshold NUMERIC(5,2) NOT NULL DEFAULT 80.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_mastery_levels_school_id ON mastery_levels(school_id);

ALTER TABLE mastery_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON mastery_levels
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER mastery_levels_updated_at
  BEFORE UPDATE ON mastery_levels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 18. Adaptive Learning Objectives & Content Features
-- ============================================================================

CREATE TABLE IF NOT EXISTS learning_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  blooms_level TEXT CHECK (blooms_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_objectives_school_id ON learning_objectives(school_id);

ALTER TABLE learning_objectives ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON learning_objectives
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER learning_objectives_updated_at
  BEFORE UPDATE ON learning_objectives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS content_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  content_id UUID NOT NULL,
  objective_id UUID NOT NULL REFERENCES learning_objectives(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_objectives_school_id ON content_objectives(school_id);
CREATE INDEX idx_content_objectives_content_id ON content_objectives(school_id, content_id);

ALTER TABLE content_objectives ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON content_objectives
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER content_objectives_updated_at
  BEFORE UPDATE ON content_objectives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS user_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  objective_id UUID NOT NULL REFERENCES learning_objectives(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'mastered')),
  progress NUMERIC(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_objectives_school_id ON user_objectives(school_id);
CREATE INDEX idx_user_objectives_user_id ON user_objectives(school_id, user_id);

ALTER TABLE user_objectives ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON user_objectives
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER user_objectives_updated_at
  BEFORE UPDATE ON user_objectives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 19. Adaptive Assessment Items & Ability Estimation
-- ============================================================================

CREATE TABLE IF NOT EXISTS assessment_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL,
  item_type TEXT NOT NULL,
  content TEXT NOT NULL,
  options JSONB DEFAULT '[]',
  difficulty NUMERIC(4,2) DEFAULT 0.5,
  points INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assessment_items_school_id ON assessment_items(school_id);
CREATE INDEX idx_assessment_items_assessment_id ON assessment_items(school_id, assessment_id);

ALTER TABLE assessment_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON assessment_items
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER assessment_items_updated_at
  BEFORE UPDATE ON assessment_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS item_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES assessment_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  response TEXT,
  is_correct BOOLEAN,
  time_spent INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_item_responses_school_id ON item_responses(school_id);
CREATE INDEX idx_item_responses_item_id ON item_responses(school_id, item_id);
CREATE INDEX idx_item_responses_user_id ON item_responses(school_id, user_id);

ALTER TABLE item_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON item_responses
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER item_responses_updated_at
  BEFORE UPDATE ON item_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ability_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  ability_value NUMERIC(8,4) DEFAULT 0,
  standard_error NUMERIC(8,4) DEFAULT 1.0,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ability_estimates_school_id ON ability_estimates(school_id);
CREATE INDEX idx_ability_estimates_user_id ON ability_estimates(school_id, user_id);

ALTER TABLE ability_estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ability_estimates
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER ability_estimates_updated_at
  BEFORE UPDATE ON ability_estimates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 20. Adaptive Test Sessions & Results
-- ============================================================================

CREATE TABLE IF NOT EXISTS test_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  assessment_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'timed_out', 'abandoned')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_test_sessions_school_id ON test_sessions(school_id);
CREATE INDEX idx_test_sessions_user_id ON test_sessions(school_id, user_id);

ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON test_sessions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER test_sessions_updated_at
  BEFORE UPDATE ON test_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES test_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  score NUMERIC(6,2),
  ability_estimate NUMERIC(8,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_test_results_school_id ON test_results(school_id);
CREATE INDEX idx_test_results_session_id ON test_results(school_id, session_id);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON test_results
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER test_results_updated_at
  BEFORE UPDATE ON test_results
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 21. Adaptive Content & User Features
-- ============================================================================

CREATE TABLE IF NOT EXISTS content_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  content_id UUID NOT NULL,
  feature_type TEXT NOT NULL,
  feature_value NUMERIC(8,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_features_school_id ON content_features(school_id);
CREATE INDEX idx_content_features_content_id ON content_features(school_id, content_id);

ALTER TABLE content_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON content_features
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER content_features_updated_at
  BEFORE UPDATE ON content_features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS user_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  feature_type TEXT NOT NULL,
  feature_value NUMERIC(8,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_features_school_id ON user_features(school_id);
CREATE INDEX idx_user_features_user_id ON user_features(school_id, user_id);

ALTER TABLE user_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON user_features
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER user_features_updated_at
  BEFORE UPDATE ON user_features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS learning_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  feature_type TEXT NOT NULL,
  feature_value NUMERIC(8,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_features_school_id ON learning_features(school_id);
CREATE INDEX idx_learning_features_user_id ON learning_features(school_id, user_id);

ALTER TABLE learning_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON learning_features
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER learning_features_updated_at
  BEFORE UPDATE ON learning_features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 22. Adaptive Models & Predictions
-- ============================================================================

CREATE TABLE IF NOT EXISTS model_parameters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  parameters JSONB DEFAULT '{}',
  version TEXT NOT NULL DEFAULT '1.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_model_parameters_school_id ON model_parameters(school_id);
CREATE INDEX idx_model_parameters_model_name ON model_parameters(school_id, model_name);

ALTER TABLE model_parameters ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON model_parameters
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER model_parameters_updated_at
  BEFORE UPDATE ON model_parameters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS prediction_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  model_name TEXT NOT NULL,
  input_data JSONB DEFAULT '{}',
  prediction JSONB DEFAULT '{}',
  actual JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_prediction_logs_school_id ON prediction_logs(school_id);
CREATE INDEX idx_prediction_logs_user_id ON prediction_logs(school_id, user_id);

ALTER TABLE prediction_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON prediction_logs
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER prediction_logs_updated_at
  BEFORE UPDATE ON prediction_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS recommendation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content_id UUID NOT NULL,
  recommendation_type TEXT NOT NULL,
  score NUMERIC(5,4),
  clicked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_recommendation_logs_school_id ON recommendation_logs(school_id);
CREATE INDEX idx_recommendation_logs_user_id ON recommendation_logs(school_id, user_id);

ALTER TABLE recommendation_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON recommendation_logs
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER recommendation_logs_updated_at
  BEFORE UPDATE ON recommendation_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 23. Adaptive A/B Testing & Feature Flags
-- ============================================================================

CREATE TABLE IF NOT EXISTS ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  variants JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'paused', 'completed')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ab_tests_school_id ON ab_tests(school_id);

ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ab_tests
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER ab_tests_updated_at
  BEFORE UPDATE ON ab_tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ab_test_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES ab_tests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  variant TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ab_test_assignments_school_id ON ab_test_assignments(school_id);
CREATE INDEX idx_ab_test_assignments_test_id ON ab_test_assignments(school_id, test_id);

ALTER TABLE ab_test_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ab_test_assignments
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER ab_test_assignments_updated_at
  BEFORE UPDATE ON ab_test_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ab_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES ab_tests(id) ON DELETE CASCADE,
  variant TEXT NOT NULL,
  metric TEXT NOT NULL,
  value NUMERIC(12,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ab_test_results_school_id ON ab_test_results(school_id);
CREATE INDEX idx_ab_test_results_test_id ON ab_test_results(school_id, test_id);

ALTER TABLE ab_test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON ab_test_results
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER ab_test_results_updated_at
  BEFORE UPDATE ON ab_test_results
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT false,
  percentage NUMERIC(5,2) DEFAULT 100.0 CHECK (percentage >= 0 AND percentage <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_feature_flags_school_id ON feature_flags(school_id);

ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON feature_flags
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER feature_flags_updated_at
  BEFORE UPDATE ON feature_flags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS feature_flag_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  variant TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_feature_flag_assignments_school_id ON feature_flag_assignments(school_id);
CREATE INDEX idx_feature_flag_assignments_flag_id ON feature_flag_assignments(school_id, flag_id);

ALTER TABLE feature_flag_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON feature_flag_assignments
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER feature_flag_assignments_updated_at
  BEFORE UPDATE ON feature_flag_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS feature_flag_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  value NUMERIC(12,4),
  period TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_feature_flag_metrics_school_id ON feature_flag_metrics(school_id);
CREATE INDEX idx_feature_flag_metrics_flag_id ON feature_flag_metrics(school_id, flag_id);

ALTER TABLE feature_flag_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON feature_flag_metrics
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER feature_flag_metrics_updated_at
  BEFORE UPDATE ON feature_flag_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 24. Adaptive Learning Analytics Dashboards
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_dashboards_school_id ON analytics_dashboards(school_id);

ALTER TABLE analytics_dashboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_dashboards
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_dashboards_updated_at
  BEFORE UPDATE ON analytics_dashboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  dashboard_id UUID NOT NULL REFERENCES analytics_dashboards(id) ON DELETE CASCADE,
  widget_type TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_widgets_school_id ON analytics_widgets(school_id);
CREATE INDEX idx_analytics_widgets_dashboard_id ON analytics_widgets(school_id, dashboard_id);

ALTER TABLE analytics_widgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_widgets
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_widgets_updated_at
  BEFORE UPDATE ON analytics_widgets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_data_sources_school_id ON analytics_data_sources(school_id);

ALTER TABLE analytics_data_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_data_sources
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_data_sources_updated_at
  BEFORE UPDATE ON analytics_data_sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 25. Adaptive Reports & Schedules
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  schedule TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_reports_school_id ON analytics_reports(school_id);

ALTER TABLE analytics_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_reports
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_reports_updated_at
  BEFORE UPDATE ON analytics_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_report_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES analytics_reports(id) ON DELETE CASCADE,
  frequency TEXT NOT NULL,
  next_run TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_report_schedules_school_id ON analytics_report_schedules(school_id);
CREATE INDEX idx_analytics_report_schedules_report_id ON analytics_report_schedules(school_id, report_id);

ALTER TABLE analytics_report_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_report_schedules
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_report_schedules_updated_at
  BEFORE UPDATE ON analytics_report_schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_report_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES analytics_reports(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  format TEXT NOT NULL DEFAULT 'pdf' CHECK (format IN ('pdf', 'csv', 'html', 'json')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_report_recipients_school_id ON analytics_report_recipients(school_id);
CREATE INDEX idx_analytics_report_recipients_report_id ON analytics_report_recipients(school_id, report_id);

ALTER TABLE analytics_report_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_report_recipients
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_report_recipients_updated_at
  BEFORE UPDATE ON analytics_report_recipients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_report_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES analytics_reports(id) ON DELETE CASCADE,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  file_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_report_history_school_id ON analytics_report_history(school_id);
CREATE INDEX idx_analytics_report_history_report_id ON analytics_report_history(school_id, report_id);

ALTER TABLE analytics_report_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_report_history
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_report_history_updated_at
  BEFORE UPDATE ON analytics_report_history
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 26. Adaptive Alerts
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  rule_name TEXT NOT NULL,
  condition JSONB NOT NULL DEFAULT '{}',
  threshold NUMERIC(12,4),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_alerts_school_id ON analytics_alerts(school_id);

ALTER TABLE analytics_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_alerts
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_alerts_updated_at
  BEFORE UPDATE ON analytics_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  alert_id UUID NOT NULL REFERENCES analytics_alerts(id) ON DELETE CASCADE,
  triggered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_alert_history_school_id ON analytics_alert_history(school_id);
CREATE INDEX idx_analytics_alert_history_alert_id ON analytics_alert_history(school_id, alert_id);

ALTER TABLE analytics_alert_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_alert_history
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_alert_history_updated_at
  BEFORE UPDATE ON analytics_alert_history
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 27. Adaptive Goals & Achievements
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  target NUMERIC(12,2),
  current NUMERIC(12,2) DEFAULT 0,
  deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_goals_school_id ON analytics_goals(school_id);
CREATE INDEX idx_analytics_goals_user_id ON analytics_goals(school_id, user_id);

ALTER TABLE analytics_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_goals
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_goals_updated_at
  BEFORE UPDATE ON analytics_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_goal_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  goal_id UUID NOT NULL REFERENCES analytics_goals(id) ON DELETE CASCADE,
  value NUMERIC(12,2),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_goal_progress_school_id ON analytics_goal_progress(school_id);
CREATE INDEX idx_analytics_goal_progress_goal_id ON analytics_goal_progress(school_id, goal_id);

ALTER TABLE analytics_goal_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_goal_progress
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_goal_progress_updated_at
  BEFORE UPDATE ON analytics_goal_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  achieved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_milestones_school_id ON analytics_milestones(school_id);
CREATE INDEX idx_analytics_milestones_user_id ON analytics_milestones(school_id, user_id);

ALTER TABLE analytics_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_milestones
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_milestones_updated_at
  BEFORE UPDATE ON analytics_milestones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  type TEXT NOT NULL DEFAULT 'daily',
  current INTEGER NOT NULL DEFAULT 0,
  longest INTEGER NOT NULL DEFAULT 0,
  last_activity TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_streaks_school_id ON analytics_streaks(school_id);
CREATE INDEX idx_analytics_streaks_user_id ON analytics_streaks(school_id, user_id);

ALTER TABLE analytics_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_streaks
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_streaks_updated_at
  BEFORE UPDATE ON analytics_streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_achievements_school_id ON analytics_achievements(school_id);
CREATE INDEX idx_analytics_achievements_user_id ON analytics_achievements(school_id, user_id);

ALTER TABLE analytics_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_achievements
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_achievements_updated_at
  BEFORE UPDATE ON analytics_achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 28. Adaptive Leaderboards
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  period TEXT DEFAULT 'all_time' CHECK (period IN ('daily', 'weekly', 'monthly', 'all_time')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_leaderboards_school_id ON analytics_leaderboards(school_id);

ALTER TABLE analytics_leaderboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_leaderboards
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_leaderboards_updated_at
  BEFORE UPDATE ON analytics_leaderboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_leaderboard_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  leaderboard_id UUID NOT NULL REFERENCES analytics_leaderboards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  score NUMERIC(12,4),
  rank INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_leaderboard_entries_school_id ON analytics_leaderboard_entries(school_id);
CREATE INDEX idx_analytics_leaderboard_entries_leaderboard_id ON analytics_leaderboard_entries(school_id, leaderboard_id);

ALTER TABLE analytics_leaderboard_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_leaderboard_entries
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_leaderboard_entries_updated_at
  BEFORE UPDATE ON analytics_leaderboard_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 29. Adaptive Social (consolidated)
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'school', 'private')),
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_social_posts_school_id ON analytics_social_posts(school_id);
CREATE INDEX idx_analytics_social_posts_user_id ON analytics_social_posts(school_id, user_id);

ALTER TABLE analytics_social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_social_posts
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_social_posts_updated_at
  BEFORE UPDATE ON analytics_social_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_social_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES analytics_social_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'comment', 'share', 'bookmark', 'report', 'reaction')),
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_social_interactions_school_id ON analytics_social_interactions(school_id);
CREATE INDEX idx_analytics_social_interactions_post_id ON analytics_social_interactions(school_id, post_id);

ALTER TABLE analytics_social_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_social_interactions
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_social_interactions_updated_at
  BEFORE UPDATE ON analytics_social_interactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_social_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  privacy TEXT NOT NULL DEFAULT 'public' CHECK (privacy IN ('public', 'private', 'restricted')),
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_social_groups_school_id ON analytics_social_groups(school_id);

ALTER TABLE analytics_social_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_social_groups
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_social_groups_updated_at
  BEFORE UPDATE ON analytics_social_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS analytics_social_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES analytics_social_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_social_group_members_school_id ON analytics_social_group_members(school_id);
CREATE INDEX idx_analytics_social_group_members_group_id ON analytics_social_group_members(school_id, group_id);

ALTER TABLE analytics_social_group_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON analytics_social_group_members
  USING (school_id = (current_setting('app.current_school_id')::uuid));
CREATE TRIGGER analytics_social_group_members_updated_at
  BEFORE UPDATE ON analytics_social_group_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- End of LXP & Adaptive Module Tables Migration
-- ============================================================================
