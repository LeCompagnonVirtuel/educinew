-- ============================================================================
-- Intelligence & GEAESIP Modules Tables Migration
-- Created: 2026-08-21
-- ============================================================================
-- Part 1 – Intelligence Module (35 tables)
-- Part 2 – GEAESIP Module (10 consolidated tables)
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
-- PART 1: INTELLIGENCE MODULE
-- ============================================================================

-- 1a. intelligence_reports ---------------------------------------------------

CREATE TABLE intelligence_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('academic', 'financial', 'operational', 'attendance', 'behavioral', 'custom')),
  data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_reports_school_id ON intelligence_reports(school_id);
CREATE INDEX idx_intelligence_reports_type ON intelligence_reports(school_id, type);
CREATE INDEX idx_intelligence_reports_status ON intelligence_reports(school_id, status);

ALTER TABLE intelligence_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_reports
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_reports_updated_at
  BEFORE UPDATE ON intelligence_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1b. intelligence_analytics -------------------------------------------------

CREATE TABLE intelligence_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  dimension JSONB DEFAULT '{}',
  period TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_analytics_school_id ON intelligence_analytics(school_id);
CREATE INDEX idx_intelligence_analytics_metric_type ON intelligence_analytics(school_id, metric_type);
CREATE INDEX idx_intelligence_analytics_period ON intelligence_analytics(school_id, period);

ALTER TABLE intelligence_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_analytics
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_analytics_updated_at
  BEFORE UPDATE ON intelligence_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1c. intelligence_dashboards ------------------------------------------------

CREATE TABLE intelligence_dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_dashboards_school_id ON intelligence_dashboards(school_id);

ALTER TABLE intelligence_dashboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_dashboards
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_dashboards_updated_at
  BEFORE UPDATE ON intelligence_dashboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1d. intelligence_widgets ---------------------------------------------------

CREATE TABLE intelligence_widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  dashboard_id UUID NOT NULL REFERENCES intelligence_dashboards(id) ON DELETE CASCADE,
  widget_type TEXT NOT NULL CHECK (widget_type IN ('chart', 'table', 'kpi', 'gauge', 'map', 'text', 'heatmap', 'funnel', 'treemap')),
  config JSONB NOT NULL DEFAULT '{}',
  position JSONB NOT NULL DEFAULT '{"x": 0, "y": 0, "w": 4, "h": 4}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_widgets_school_id ON intelligence_widgets(school_id);
CREATE INDEX idx_intelligence_widgets_dashboard_id ON intelligence_widgets(dashboard_id);

ALTER TABLE intelligence_widgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_widgets
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_widgets_updated_at
  BEFORE UPDATE ON intelligence_widgets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1e. intelligence_data_sources ----------------------------------------------

CREATE TABLE intelligence_data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('database', 'api', 'file', 'webhook', 'stream')),
  config JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_data_sources_school_id ON intelligence_data_sources(school_id);
CREATE INDEX idx_intelligence_data_sources_type ON intelligence_data_sources(school_id, type);

ALTER TABLE intelligence_data_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_data_sources
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_data_sources_updated_at
  BEFORE UPDATE ON intelligence_data_sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1f. intelligence_queries ---------------------------------------------------

CREATE TABLE intelligence_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  data_source_id UUID REFERENCES intelligence_data_sources(id) ON DELETE SET NULL,
  result JSONB DEFAULT '{}',
  execution_time INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_queries_school_id ON intelligence_queries(school_id);
CREATE INDEX idx_intelligence_queries_data_source_id ON intelligence_queries(data_source_id);

ALTER TABLE intelligence_queries ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_queries
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_queries_updated_at
  BEFORE UPDATE ON intelligence_queries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1g. intelligence_visualizations --------------------------------------------

CREATE TABLE intelligence_visualizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bar', 'line', 'pie', 'scatter', 'area', 'heatmap', 'treemap', 'sankey', 'gauge', 'map')),
  config JSONB NOT NULL DEFAULT '{}',
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_visualizations_school_id ON intelligence_visualizations(school_id);
CREATE INDEX idx_intelligence_visualizations_type ON intelligence_visualizations(school_id, type);

ALTER TABLE intelligence_visualizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_visualizations
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_visualizations_updated_at
  BEFORE UPDATE ON intelligence_visualizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1h. intelligence_alerts ----------------------------------------------------

CREATE TABLE intelligence_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  condition JSONB NOT NULL DEFAULT '{}',
  threshold NUMERIC,
  enabled BOOLEAN NOT NULL DEFAULT true,
  channels JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_alerts_school_id ON intelligence_alerts(school_id);
CREATE INDEX idx_intelligence_alerts_enabled ON intelligence_alerts(school_id, enabled);

ALTER TABLE intelligence_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_alerts
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_alerts_updated_at
  BEFORE UPDATE ON intelligence_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1i. intelligence_alert_history ---------------------------------------------

CREATE TABLE intelligence_alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  alert_id UUID NOT NULL REFERENCES intelligence_alerts(id) ON DELETE CASCADE,
  triggered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  context JSONB NOT NULL DEFAULT '{}',
  acknowledged BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_alert_history_school_id ON intelligence_alert_history(school_id);
CREATE INDEX idx_intelligence_alert_history_alert_id ON intelligence_alert_history(alert_id);
CREATE INDEX idx_intelligence_alert_history_triggered_at ON intelligence_alert_history(triggered_at);

ALTER TABLE intelligence_alert_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_alert_history
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_alert_history_updated_at
  BEFORE UPDATE ON intelligence_alert_history
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- 1j. intelligence_predictions ------------------------------------------------

CREATE TABLE intelligence_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  input_data JSONB NOT NULL DEFAULT '{}',
  prediction JSONB NOT NULL DEFAULT '{}',
  confidence NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_predictions_school_id ON intelligence_predictions(school_id);
CREATE INDEX idx_intelligence_predictions_model_name ON intelligence_predictions(school_id, model_name);

ALTER TABLE intelligence_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_predictions
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_predictions_updated_at
  BEFORE UPDATE ON intelligence_predictions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1k. intelligence_models ----------------------------------------------------

CREATE TABLE intelligence_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('classification', 'regression', 'clustering', 'nlp', 'anomaly', 'forecasting')),
  config JSONB NOT NULL DEFAULT '{}',
  version TEXT NOT NULL DEFAULT '1.0.0',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'training', 'ready', 'deployed', 'retired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_models_school_id ON intelligence_models(school_id);
CREATE INDEX idx_intelligence_models_status ON intelligence_models(school_id, status);

ALTER TABLE intelligence_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_models
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_models_updated_at
  BEFORE UPDATE ON intelligence_models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1l. intelligence_model_training --------------------------------------------

CREATE TABLE intelligence_model_training (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  model_id UUID NOT NULL REFERENCES intelligence_models(id) ON DELETE CASCADE,
  dataset JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  metrics JSONB DEFAULT '{}',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_model_training_school_id ON intelligence_model_training(school_id);
CREATE INDEX idx_intelligence_model_training_model_id ON intelligence_model_training(model_id);
CREATE INDEX idx_intelligence_model_training_status ON intelligence_model_training(status);

ALTER TABLE intelligence_model_training ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_model_training
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_model_training_updated_at
  BEFORE UPDATE ON intelligence_model_training
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1m. intelligence_model_deployments -----------------------------------------

CREATE TABLE intelligence_model_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  model_id UUID NOT NULL REFERENCES intelligence_models(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  endpoint TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'deploying', 'active', 'failed', 'stopped')),
  deployed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_model_deployments_school_id ON intelligence_model_deployments(school_id);
CREATE INDEX idx_intelligence_model_deployments_model_id ON intelligence_model_deployments(model_id);
CREATE INDEX idx_intelligence_model_deployments_status ON intelligence_model_deployments(status);

ALTER TABLE intelligence_model_deployments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_model_deployments
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_model_deployments_updated_at
  BEFORE UPDATE ON intelligence_model_deployments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1n. intelligence_insights --------------------------------------------------

CREATE TABLE intelligence_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('trend', 'anomaly', 'correlation', 'recommendation', 'alert', 'summary')),
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_insights_school_id ON intelligence_insights(school_id);
CREATE INDEX idx_intelligence_insights_insight_type ON intelligence_insights(school_id, insight_type);
CREATE INDEX idx_intelligence_insights_severity ON intelligence_insights(school_id, severity);

ALTER TABLE intelligence_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_insights
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_insights_updated_at
  BEFORE UPDATE ON intelligence_insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1o. intelligence_recommendations -------------------------------------------

CREATE TABLE intelligence_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('curriculum', 'resource', 'scheduling', 'engagement', 'performance', 'operational')),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_recommendations_school_id ON intelligence_recommendations(school_id);
CREATE INDEX idx_intelligence_recommendations_type ON intelligence_recommendations(school_id, type);
CREATE INDEX idx_intelligence_recommendations_priority ON intelligence_recommendations(school_id, priority);

ALTER TABLE intelligence_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_recommendations
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_recommendations_updated_at
  BEFORE UPDATE ON intelligence_recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1p. intelligence_benchmarks ------------------------------------------------

CREATE TABLE intelligence_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  value NUMERIC NOT NULL,
  period TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_benchmarks_school_id ON intelligence_benchmarks(school_id);
CREATE INDEX idx_intelligence_benchmarks_category ON intelligence_benchmarks(school_id, category);

ALTER TABLE intelligence_benchmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_benchmarks
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_benchmarks_updated_at
  BEFORE UPDATE ON intelligence_benchmarks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1q. intelligence_trends ----------------------------------------------------

CREATE TABLE intelligence_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('up', 'down', 'stable', 'volatile')),
  change_pct NUMERIC,
  period TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_trends_school_id ON intelligence_trends(school_id);
CREATE INDEX idx_intelligence_trends_metric ON intelligence_trends(school_id, metric);

ALTER TABLE intelligence_trends ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_trends
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_trends_updated_at
  BEFORE UPDATE ON intelligence_trends
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1r. intelligence_forecasts -------------------------------------------------

CREATE TABLE intelligence_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  forecast_value NUMERIC NOT NULL,
  confidence_interval JSONB NOT NULL DEFAULT '{}',
  period TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_forecasts_school_id ON intelligence_forecasts(school_id);
CREATE INDEX idx_intelligence_forecasts_metric ON intelligence_forecasts(school_id, metric);

ALTER TABLE intelligence_forecasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_forecasts
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_forecasts_updated_at
  BEFORE UPDATE ON intelligence_forecasts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1s. intelligence_anomalies -------------------------------------------------

CREATE TABLE intelligence_anomalies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  expected_value NUMERIC NOT NULL,
  actual_value NUMERIC NOT NULL,
  severity TEXT NOT NULL DEFAULT 'warning' CHECK (severity IN ('info', 'warning', 'critical')),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_anomalies_school_id ON intelligence_anomalies(school_id);
CREATE INDEX idx_intelligence_anomalies_metric ON intelligence_anomalies(school_id, metric);
CREATE INDEX idx_intelligence_anomalies_detected_at ON intelligence_anomalies(detected_at);

ALTER TABLE intelligence_anomalies ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_anomalies
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_anomalies_updated_at
  BEFORE UPDATE ON intelligence_anomalies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1t. intelligence_correlations ----------------------------------------------

CREATE TABLE intelligence_correlations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  metric_a TEXT NOT NULL,
  metric_b TEXT NOT NULL,
  correlation_coefficient NUMERIC NOT NULL,
  significance NUMERIC,
  period TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_correlations_school_id ON intelligence_correlations(school_id);
CREATE INDEX idx_intelligence_correlations_metrics ON intelligence_correlations(school_id, metric_a, metric_b);

ALTER TABLE intelligence_correlations ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_correlations
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_correlations_updated_at
  BEFORE UPDATE ON intelligence_correlations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- 1u. intelligence_experiments ------------------------------------------------

CREATE TABLE intelligence_experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hypothesis TEXT,
  methodology TEXT,
  results JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_experiments_school_id ON intelligence_experiments(school_id);
CREATE INDEX idx_intelligence_experiments_status ON intelligence_experiments(school_id, status);

ALTER TABLE intelligence_experiments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_experiments
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_experiments_updated_at
  BEFORE UPDATE ON intelligence_experiments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1v. intelligence_ab_tests --------------------------------------------------

CREATE TABLE intelligence_ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  variants JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'paused', 'completed', 'cancelled')),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_ab_tests_school_id ON intelligence_ab_tests(school_id);
CREATE INDEX idx_intelligence_ab_tests_status ON intelligence_ab_tests(school_id, status);

ALTER TABLE intelligence_ab_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_ab_tests
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_ab_tests_updated_at
  BEFORE UPDATE ON intelligence_ab_tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1w. intelligence_ab_assignments ---------------------------------------------

CREATE TABLE intelligence_ab_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES intelligence_ab_tests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  variant TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_ab_assignments_school_id ON intelligence_ab_assignments(school_id);
CREATE INDEX idx_intelligence_ab_assignments_test_id ON intelligence_ab_assignments(test_id);
CREATE INDEX idx_intelligence_ab_assignments_user_id ON intelligence_ab_assignments(user_id);

ALTER TABLE intelligence_ab_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_ab_assignments
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_ab_assignments_updated_at
  BEFORE UPDATE ON intelligence_ab_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1x. intelligence_ab_results ------------------------------------------------

CREATE TABLE intelligence_ab_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES intelligence_ab_tests(id) ON DELETE CASCADE,
  variant TEXT NOT NULL,
  metric TEXT NOT NULL,
  value NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_ab_results_school_id ON intelligence_ab_results(school_id);
CREATE INDEX idx_intelligence_ab_results_test_id ON intelligence_ab_results(test_id);

ALTER TABLE intelligence_ab_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_ab_results
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_ab_results_updated_at
  BEFORE UPDATE ON intelligence_ab_results
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1y. intelligence_cohorts ---------------------------------------------------

CREATE TABLE intelligence_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  definition JSONB NOT NULL DEFAULT '{}',
  member_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_cohorts_school_id ON intelligence_cohorts(school_id);

ALTER TABLE intelligence_cohorts ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_cohorts
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_cohorts_updated_at
  BEFORE UPDATE ON intelligence_cohorts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1z. intelligence_cohort_members --------------------------------------------

CREATE TABLE intelligence_cohort_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  cohort_id UUID NOT NULL REFERENCES intelligence_cohorts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_cohort_members_school_id ON intelligence_cohort_members(school_id);
CREATE INDEX idx_intelligence_cohort_members_cohort_id ON intelligence_cohort_members(cohort_id);
CREATE INDEX idx_intelligence_cohort_members_user_id ON intelligence_cohort_members(user_id);

ALTER TABLE intelligence_cohort_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_cohort_members
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_cohort_members_updated_at
  BEFORE UPDATE ON intelligence_cohort_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1aa. intelligence_funnels --------------------------------------------------

CREATE TABLE intelligence_funnels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_funnels_school_id ON intelligence_funnels(school_id);

ALTER TABLE intelligence_funnels ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_funnels
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_funnels_updated_at
  BEFORE UPDATE ON intelligence_funnels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1ab. intelligence_funnel_steps ---------------------------------------------

CREATE TABLE intelligence_funnel_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  funnel_id UUID NOT NULL REFERENCES intelligence_funnels(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  filter JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_funnel_steps_school_id ON intelligence_funnel_steps(school_id);
CREATE INDEX idx_intelligence_funnel_steps_funnel_id ON intelligence_funnel_steps(funnel_id);

ALTER TABLE intelligence_funnel_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_funnel_steps
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_funnel_steps_updated_at
  BEFORE UPDATE ON intelligence_funnel_steps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1ac. intelligence_funnel_entries -------------------------------------------

CREATE TABLE intelligence_funnel_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  funnel_id UUID NOT NULL REFERENCES intelligence_funnels(id) ON DELETE CASCADE,
  step_id UUID NOT NULL REFERENCES intelligence_funnel_steps(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  entered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_funnel_entries_school_id ON intelligence_funnel_entries(school_id);
CREATE INDEX idx_intelligence_funnel_entries_funnel_id ON intelligence_funnel_entries(funnel_id);
CREATE INDEX idx_intelligence_funnel_entries_step_id ON intelligence_funnel_entries(step_id);

ALTER TABLE intelligence_funnel_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_funnel_entries
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_funnel_entries_updated_at
  BEFORE UPDATE ON intelligence_funnel_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1ad. intelligence_retention -------------------------------------------------

CREATE TABLE intelligence_retention (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  cohort_id UUID NOT NULL REFERENCES intelligence_cohorts(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  retention_rate NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_retention_school_id ON intelligence_retention(school_id);
CREATE INDEX idx_intelligence_retention_cohort_id ON intelligence_retention(cohort_id);

ALTER TABLE intelligence_retention ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_retention
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_retention_updated_at
  BEFORE UPDATE ON intelligence_retention
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1ae. intelligence_ltv ------------------------------------------------------

CREATE TABLE intelligence_ltv (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  ltv_value NUMERIC NOT NULL,
  calculation_method TEXT NOT NULL DEFAULT 'historical',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_ltv_school_id ON intelligence_ltv(school_id);
CREATE INDEX idx_intelligence_ltv_user_id ON intelligence_ltv(user_id);

ALTER TABLE intelligence_ltv ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_ltv
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_ltv_updated_at
  BEFORE UPDATE ON intelligence_ltv
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1af. intelligence_segments -------------------------------------------------

CREATE TABLE intelligence_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  criteria JSONB NOT NULL DEFAULT '{}',
  member_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_segments_school_id ON intelligence_segments(school_id);

ALTER TABLE intelligence_segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_segments
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_segments_updated_at
  BEFORE UPDATE ON intelligence_segments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 1ag. intelligence_segment_members ------------------------------------------

CREATE TABLE intelligence_segment_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  segment_id UUID NOT NULL REFERENCES intelligence_segments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_intelligence_segment_members_school_id ON intelligence_segment_members(school_id);
CREATE INDEX idx_intelligence_segment_members_segment_id ON intelligence_segment_members(segment_id);
CREATE INDEX idx_intelligence_segment_members_user_id ON intelligence_segment_members(user_id);

ALTER TABLE intelligence_segment_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON intelligence_segment_members
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER intelligence_segment_members_updated_at
  BEFORE UPDATE ON intelligence_segment_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ============================================================================
-- ============================================================================
--
-- PART 2: GEAESIP MODULE
--
-- ============================================================================
-- ============================================================================
-- Consolidates 65+ auto-generated geaesip_* tables into 10 logical tables:
--
-- Section 1 – Core Integration (5 tables)
--   geaesip_configs, geaesip_sync_logs, geaesip_webhook_events,
--   geaesip_api_keys, geaesip_webhooks
--
-- Section 2 – Infrastructure (1 consolidated table)
--   geaesip_infrastructure
--
-- Section 3 – Event Sourcing / CQRS (2 consolidated tables)
--   geaesip_events, geaesip_projections
--
-- Section 4 – Documentation & Project Management (3 consolidated tables)
--   geaesip_doc_pages, geaesip_project_items, geaesip_releases
-- ============================================================================

-- ============================================================================
-- 2a. geaesip_configs --------------------------------------------------------
-- Per-school GEAESIP configuration key-value pairs.

CREATE TABLE geaesip_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  config_key TEXT NOT NULL,
  config_value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, config_key)
);

CREATE INDEX idx_geaesip_configs_school_id ON geaesip_configs(school_id);
CREATE INDEX idx_geaesip_configs_config_key ON geaesip_configs(school_id, config_key);

ALTER TABLE geaesip_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_configs
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_configs_updated_at
  BEFORE UPDATE ON geaesip_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2b. geaesip_sync_logs ------------------------------------------------------
-- Data synchronization logs.

CREATE TABLE geaesip_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'success', 'failed', 'cancelled')),
  records_synced INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_sync_logs_school_id ON geaesip_sync_logs(school_id);
CREATE INDEX idx_geaesip_sync_logs_status ON geaesip_sync_logs(school_id, status);
CREATE INDEX idx_geaesip_sync_logs_sync_type ON geaesip_sync_logs(school_id, sync_type);

ALTER TABLE geaesip_sync_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_sync_logs
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_sync_logs_updated_at
  BEFORE UPDATE ON geaesip_sync_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2c. geaesip_webhook_events -------------------------------------------------
-- Inbound webhook events.

CREATE TABLE geaesip_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  processed BOOLEAN NOT NULL DEFAULT false,
  processed_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_webhook_events_school_id ON geaesip_webhook_events(school_id);
CREATE INDEX idx_geaesip_webhook_events_event_type ON geaesip_webhook_events(school_id, event_type);
CREATE INDEX idx_geaesip_webhook_events_processed ON geaesip_webhook_events(school_id, processed);

ALTER TABLE geaesip_webhook_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_webhook_events
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_webhook_events_updated_at
  BEFORE UPDATE ON geaesip_webhook_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2d. geaesip_api_keys -------------------------------------------------------
-- API key management for GEAESIP services.

CREATE TABLE geaesip_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '[]',
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_api_keys_school_id ON geaesip_api_keys(school_id);
CREATE INDEX idx_geaesip_api_keys_key_hash ON geaesip_api_keys(key_hash);

ALTER TABLE geaesip_api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_api_keys
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_api_keys_updated_at
  BEFORE UPDATE ON geaesip_api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2e. geaesip_webhooks -------------------------------------------------------
-- Outbound webhook configurations.

CREATE TABLE geaesip_webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  event_type TEXT NOT NULL,
  secret TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_webhooks_school_id ON geaesip_webhooks(school_id);
CREATE INDEX idx_geaesip_webhooks_event_type ON geaesip_webhooks(school_id, event_type);
CREATE INDEX idx_geaesip_webhooks_active ON geaesip_webhooks(school_id, active);

ALTER TABLE geaesip_webhooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_webhooks
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_webhooks_updated_at
  BEFORE UPDATE ON geaesip_webhooks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2f. geaesip_infrastructure -------------------------------------------------
-- Consolidates: geaesip_health_checks, geaesip_rate_limits,
--   geaesip_circuit_breakers, geaesip_retries, geaesip_timeouts,
--   geaesip_bulkheads, geaesip_load_balancers, geaesip_service_discovery,
--   geaesip_api_gateways, geaesip_message_queues, geaesip_event_buses,
--   geaesip_streaming, geaesip_batch_jobs, geaesip_pipelines,
--   geaesip_workflows, geaesip_orchestration, geaesip_choreography,
--   geaesip_sagas

CREATE TABLE geaesip_infrastructure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL CHECK (component_type IN (
    'health_check', 'rate_limit', 'circuit_breaker', 'retry', 'timeout',
    'bulkhead', 'load_balancer', 'service_discovery', 'api_gateway',
    'message_queue', 'event_bus', 'streaming', 'batch_job', 'pipeline',
    'workflow', 'orchestration', 'choreography', 'saga'
  )),
  name TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error', 'maintenance')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_infrastructure_school_id ON geaesip_infrastructure(school_id);
CREATE INDEX idx_geaesip_infrastructure_component_type ON geaesip_infrastructure(school_id, component_type);
CREATE INDEX idx_geaesip_infrastructure_status ON geaesip_infrastructure(school_id, status);

ALTER TABLE geaesip_infrastructure ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_infrastructure
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_infrastructure_updated_at
  BEFORE UPDATE ON geaesip_infrastructure
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ============================================================================
-- 2g. geaesip_events ---------------------------------------------------------
-- Append-only event store for domain and integration events.
-- Consolidates: geaesip_event_sourcing, geaesip_domain_events,
--   geaesip_integration_events, geaesip_event_store

CREATE TABLE geaesip_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  aggregate_id UUID NOT NULL,
  aggregate_type TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_events_school_id ON geaesip_events(school_id);
CREATE INDEX idx_geaesip_events_aggregate ON geaesip_events(aggregate_id, aggregate_type);
CREATE INDEX idx_geaesip_events_event_type ON geaesip_events(school_id, event_type);
CREATE INDEX idx_geaesip_events_version ON geaesip_events(aggregate_id, version);

-- No RLS - events are accessed via application-level RPCs.
-- No update trigger - events are immutable.

-- ============================================================================
-- 2h. geaesip_projections ----------------------------------------------------
-- Materialised read models built from geaesip_events.
-- Also consolidates: geaesip_cqrs, geaesip_snapshots, geaesip_versioning,
--   geaesip_schema_evolution, geaesip_data_lineage, geaesip_data_catalog,
--   geaesip_metadata_store, geaesip_glossary, geaesip_ontology,
--   geaesip_taxonomy, geaesip_knowledge_graph

CREATE TABLE geaesip_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  projection_name TEXT NOT NULL,
  state JSONB NOT NULL DEFAULT '{}',
  last_event_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, projection_name)
);

CREATE INDEX idx_geaesip_projections_school_id ON geaesip_projections(school_id);
CREATE INDEX idx_geaesip_projections_projection_name ON geaesip_projections(school_id, projection_name);
CREATE INDEX idx_geaesip_projections_last_event_id ON geaesip_projections(last_event_id);

ALTER TABLE geaesip_projections ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_projections
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_projections_updated_at
  BEFORE UPDATE ON geaesip_projections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2i. geaesip_doc_pages ------------------------------------------------------
-- Wiki, tutorials, guides, API docs, changelogs, and other documentation.
-- Consolidates: geaesip_knowledge_base, geaesip_wiki,
--   geaesip_documentation, geaesip_tutorials, geaesip_guides,
--   geaesip_references, geaesip_api_docs, geaesip_sdk_docs,
--   geaesip_release_notes, geaesip_changelog

CREATE TABLE geaesip_doc_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'wiki', 'tutorial', 'guide', 'reference', 'api_doc', 'sdk_doc',
    'release_notes', 'changelog', 'knowledge_base', 'other'
  )),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_doc_pages_school_id ON geaesip_doc_pages(school_id);
CREATE INDEX idx_geaesip_doc_pages_type ON geaesip_doc_pages(school_id, type);
CREATE INDEX idx_geaesip_doc_pages_status ON geaesip_doc_pages(school_id, status);

ALTER TABLE geaesip_doc_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_doc_pages
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_doc_pages_updated_at
  BEFORE UPDATE ON geaesip_doc_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2j. geaesip_project_items --------------------------------------------------
-- Epics, stories, tasks, subtasks, bugs, features, improvements,
-- research, experiments, prototypes, POCs, MVPs, and release milestones.
-- Consolidates: geaesip_roadmap, geaesip_backlog, geaesip_sprints,
--   geaesip_epics, geaesip_stories, geaesip_tasks, geaesip_subtasks,
--   geaesip_bugs, geaesip_features, geaesip_improvements,
--   geaesip_research, geaesip_experiments, geaesip_prototypes,
--   geaesip_pocs, geaesip_mvps, geaesip_alphas, geaesip_betas,
--   geaesip_rcs

CREATE TABLE geaesip_project_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'epic', 'story', 'task', 'subtask', 'bug', 'feature', 'improvement',
    'research', 'experiment', 'prototype', 'poc', 'mvp', 'alpha',
    'beta', 'rc', 'release', 'roadmap_item', 'backlog_item', 'sprint_item'
  )),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN (
    'backlog', 'todo', 'in_progress', 'in_review', 'done', 'cancelled'
  )),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low', 'none')),
  assignee_id UUID,
  parent_id UUID REFERENCES geaesip_project_items(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_geaesip_project_items_school_id ON geaesip_project_items(school_id);
CREATE INDEX idx_geaesip_project_items_type ON geaesip_project_items(school_id, type);
CREATE INDEX idx_geaesip_project_items_status ON geaesip_project_items(school_id, status);
CREATE INDEX idx_geaesip_project_items_parent_id ON geaesip_project_items(parent_id);
CREATE INDEX idx_geaesip_project_items_assignee_id ON geaesip_project_items(assignee_id);

ALTER TABLE geaesip_project_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_project_items
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_project_items_updated_at
  BEFORE UPDATE ON geaesip_project_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2k. geaesip_releases -------------------------------------------------------
-- Versioned release records.

CREATE TABLE geaesip_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'stable' CHECK (type IN ('alpha', 'beta', 'rc', 'stable', 'lts')),
  notes TEXT,
  release_date TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, version)
);

CREATE INDEX idx_geaesip_releases_school_id ON geaesip_releases(school_id);
CREATE INDEX idx_geaesip_releases_type ON geaesip_releases(school_id, type);
CREATE INDEX idx_geaesip_releases_release_date ON geaesip_releases(school_id, release_date);

ALTER TABLE geaesip_releases ENABLE ROW LEVEL SECURITY;
CREATE POLICY school_isolation_policy ON geaesip_releases
  USING (school_id = current_setting('app.current_school_id')::uuid);

CREATE TRIGGER geaesip_releases_updated_at
  BEFORE UPDATE ON geaesip_releases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
