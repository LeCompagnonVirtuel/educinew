import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  AiModel,
  AiModelConfig,
  AiModelRoute,
  AiModelHealth,
  AiModelUsage,
  AiModelBenchmark,
  AiFallbackModel,
  AiCostBudget,
  AiUsageQuota,
  AiSession,
  AiConversation,
  AiMessage,
  AiFunctionCall,
  AiToolCall,
  AiContextWindow,
  AiConversationMemory,
  AiConversationSummary,
  AiSessionAnalytics,
  AiPromptTemplate,
  AiPromptVersion,
  AiPromptExecution,
  AiPromptCategory,
  AiContext,
  AiContextSource,
  AiContextInjection,
  AiEvaluation,
  AiModelEvaluation,
  AiSchoolConfig,
  AiUserPreference,
  AiAccessControl,
  AiFeatureFlag,
  AiBillingConfig,
  AiAuditEntry,
  AiPerformanceMetric,
  AiDailyUsage,
  AiConversationAnalytic,
  AiRateLimitConfig,
  AiFunctionDefinition,
  AiFunctionExecution,
  AiCacheEntry,
  AiModelVersion,
  AiAbTest,
  AiFeedback,
  AiInsight,
  AiRecommendation,
  AiAuditLog,
  AiBillingTransaction,
  AiSubscription,
  AiQuotaAlert,
  AiBatchJob,
  AiCacheInvalidation,
  AiLoadBalancer,
  AiModelEndpoint,
  AiDocumentProcessing,
  AiVoiceConfig,
  AiVideoProcessing,
  AiGenerationConfig,
  AiEvaluationCriterion,
  AiBenchmarkSuite,
  AiBenchmarkResult,
  AiOptimizationResult,
  AiModelComparison,
  AiPromptOptimization,
  AiTokenEstimation,
  AiLatencyBudget,
  AiThroughputConfig,
  AiCircuitBreaker,
  AiLoggingConfig,
  AiTracingConfig,
  AiPrometheusMetric,
  AiGrafanaDashboard,
  AiAlertRule,
  AiOperatorConfig,
  AiPipelineStep,
  AiPipeline,
  AiDataFlow,
  AiBackupConfig,
  AiDisasterRecovery,
  AiCostAllocation,
  AiFeatureUsage,
  AiPerformanceBaseline,
  AiSlaConfig,
  AiSlaViolation,
  AiComplianceCheck,
  AiPrivacyConfig,
  AiDataGovernance,
  AiSafetyFilter,
  AiAutoScaling,
  AiOptimizationSuggestion,
  AiTrainingDataset,
  AiTrainingJob,
  AiCustomModel,
  AiLanguageSupport,
  AiTranslationConfig,
  AiNotificationConfig,
  AiWebhook,
  AiIntegration,
  AiPlugin,
  AiDeploymentConfig,
  AiLogEntry,
  AiPerformanceBenchmark,
  AiCostForecast,
  AiOptimizationRule,
  AiQualityMetric,
  AiSecurityPolicy,
  AiAccessToken,
  AiApiKey,
} from '@educi/types';
import {
  AiModelError,
  AiModelConfigError,
  AiSessionError,
  AiConversationError,
  AiPromptError,
  AiContextError,
  AiEvaluationError,
  AiConfigError,
  AiAccessError,
  AiBillingError,
  AiAuditError,
  AiPerformanceError,
  AiUsageError,
  AiCacheError,
  AiSafetyError,
  AiTrainingError,
  AiIntegrationError,
  AiDeploymentError,
  AiLoggingError,
  AiMonitoringError,
  AiOptimizationError,
  AiSecurityError,
  AiAgentError,
  AiEducationError,
} from '@educi/errors';

interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface AiModelQuery extends PaginationParams, SortParams {
  search?: string;
  status?: string;
  provider?: string;
  capability?: string;
  schoolId?: string;
}

interface AiSessionQuery extends PaginationParams, SortParams {
  search?: string;
  status?: string;
  userId?: string;
  schoolId?: string;
  startDate?: string;
  endDate?: string;
}

interface AiConversationQuery extends PaginationParams, SortParams {
  search?: string;
  status?: string;
  sessionId?: string;
  schoolId?: string;
}

interface AiMessageQuery extends PaginationParams, SortParams {
  role?: string;
  conversationId?: string;
  schoolId?: string;
}

interface AiPromptQuery extends PaginationParams, SortParams {
  search?: string;
  category?: string;
  schoolId?: string;
}

interface AiEvaluationQuery extends PaginationParams, SortParams {
  status?: string;
  evaluatorType?: string;
  schoolId?: string;
}

interface AiAuditQuery extends PaginationParams, SortParams {
  action?: string;
  resourceType?: string;
  userId?: string;
  schoolId?: string;
  startDate?: string;
  endDate?: string;
}

export class AiRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  // =========================================================================
  // AI MODELS
  // =========================================================================

  async findModelById(id: string, schoolId: string): Promise<AiModel | null> {
    const { data, error } = await this.supabase
      .from('ai_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (error) throw new AiModelError('AI_MODEL_NOT_FOUND', `Model not found: ${error.message}`);
    return data;
  }

  async findModels(query: AiModelQuery): Promise<PaginatedResult<AiModel>> {
    const { page = 1, limit = 20, offset = 0, search, status, provider, capability, schoolId } = query;
    let qb = this.supabase.from('ai_models').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (search) qb = qb.or(`name.ilike.%${search}%,display_name.ilike.%${search}%`);
    if (status) qb = qb.eq('status', status);
    if (provider) qb = qb.eq('provider', provider);
    if (capability) qb = qb.contains('capabilities', [capability]);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_MODEL_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModel(model: Omit<AiModel, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiModel> {
    const { data, error } = await this.supabase
      .from('ai_models')
      .insert({ ...model, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_CREATE_ERROR', error.message);
    return data;
  }

  async updateModel(id: string, updates: Partial<AiModel>, schoolId: string): Promise<AiModel> {
    const { data, error } = await this.supabase
      .from('ai_models')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteModel(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_MODEL_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI MODEL CONFIGS
  // =========================================================================

  async findModelConfigById(id: string, schoolId: string): Promise<AiModelConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_model_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelConfigError('AI_MODEL_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findModelConfigs(query: PaginationParams & { modelId?: string; schoolId?: string }): Promise<PaginatedResult<AiModelConfig>> {
    const { page = 1, limit = 20, offset = 0, modelId, schoolId } = query;
    let qb = this.supabase.from('ai_model_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (modelId) qb = qb.eq('model_id', modelId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelConfigError('AI_MODEL_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelConfig(config: Omit<AiModelConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiModelConfig> {
    const { data, error } = await this.supabase
      .from('ai_model_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelConfigError('AI_MODEL_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateModelConfig(id: string, updates: Partial<AiModelConfig>, schoolId: string): Promise<AiModelConfig> {
    const { data, error } = await this.supabase
      .from('ai_model_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelConfigError('AI_MODEL_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteModelConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_model_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelConfigError('AI_MODEL_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI MODEL ROUTES
  // =========================================================================

  async findModelRouteById(id: string, schoolId: string): Promise<AiModelRoute | null> {
    const { data, error } = await this.supabase
      .from('ai_model_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_MODEL_ROUTE_NOT_FOUND', `Route not found: ${error.message}`);
    return data;
  }

  async findModelRoutes(query: PaginationParams & { modelId?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiModelRoute>> {
    const { page = 1, limit = 20, offset = 0, modelId, status, schoolId } = query;
    let qb = this.supabase.from('ai_model_routes').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (modelId) qb = qb.eq('model_id', modelId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_MODEL_ROUTE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelRoute(route: Omit<AiModelRoute, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiModelRoute> {
    const { data, error } = await this.supabase
      .from('ai_model_routes')
      .insert({ ...route, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_ROUTE_CREATE_ERROR', error.message);
    return data;
  }

  async updateModelRoute(id: string, updates: Partial<AiModelRoute>, schoolId: string): Promise<AiModelRoute> {
    const { data, error } = await this.supabase
      .from('ai_model_routes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_ROUTE_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteModelRoute(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_model_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_MODEL_ROUTE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI MODEL HEALTH
  // =========================================================================

  async findModelHealthById(id: string, schoolId: string): Promise<AiModelHealth | null> {
    const { data, error } = await this.supabase
      .from('ai_model_health')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_MODEL_HEALTH_NOT_FOUND', `Health not found: ${error.message}`);
    return data;
  }

  async findModelHealthByModelId(modelId: string, schoolId: string): Promise<AiModelHealth | null> {
    const { data, error } = await this.supabase
      .from('ai_model_health')
      .select('*')
      .eq('model_id', modelId)
      .eq('school_id', schoolId)
      .order('checked_at', { ascending: false })
      .limit(1)
      .single();
    if (error) throw new AiModelError('AI_MODEL_HEALTH_FETCH_ERROR', error.message);
    return data;
  }

  async createModelHealth(health: Omit<AiModelHealth, 'id' | 'createdAt'>, schoolId: string): Promise<AiModelHealth> {
    const { data, error } = await this.supabase
      .from('ai_model_health')
      .insert({ ...health, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_HEALTH_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI MODEL USAGE
  // =========================================================================

  async findModelUsageById(id: string, schoolId: string): Promise<AiModelUsage | null> {
    const { data, error } = await this.supabase
      .from('ai_model_usage')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiUsageError('AI_MODEL_USAGE_NOT_FOUND', `Usage not found: ${error.message}`);
    return data;
  }

  async findModelUsages(query: PaginationParams & { modelId?: string; startDate?: string; endDate?: string; schoolId?: string }): Promise<PaginatedResult<AiModelUsage>> {
    const { page = 1, limit = 20, offset = 0, modelId, startDate, endDate, schoolId } = query;
    let qb = this.supabase.from('ai_model_usage').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (modelId) qb = qb.eq('model_id', modelId);
    if (startDate) qb = qb.gte('created_at', startDate);
    if (endDate) qb = qb.lte('created_at', endDate);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiUsageError('AI_MODEL_USAGE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelUsage(usage: Omit<AiModelUsage, 'id' | 'createdAt'>, schoolId: string): Promise<AiModelUsage> {
    const { data, error } = await this.supabase
      .from('ai_model_usage')
      .insert({ ...usage, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiUsageError('AI_MODEL_USAGE_CREATE_ERROR', error.message);
    return data;
  }

  async getModelUsageStats(modelId: string, schoolId: string, startDate: string, endDate: string): Promise<{
    totalTokens: number;
    totalCost: number;
    requestCount: number;
    avgLatency: number;
  }> {
    const { data, error } = await this.supabase
      .from('ai_model_usage')
      .select('tokens_used, cost, latency_ms')
      .eq('model_id', modelId)
      .eq('school_id', schoolId)
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    if (error) throw new AiUsageError('AI_MODEL_USAGE_STATS_ERROR', error.message);
    const usages = data ?? [];
    return {
      totalTokens: usages.reduce((sum: number, u: Record<string, unknown>) => sum + ((u.tokens_used as number) ?? 0), 0),
      totalCost: usages.reduce((sum: number, u: Record<string, unknown>) => sum + ((u.cost as number) ?? 0), 0),
      requestCount: usages.length,
      avgLatency: usages.length > 0 ? usages.reduce((sum: number, u: Record<string, unknown>) => sum + ((u.latency_ms as number) ?? 0), 0) / usages.length : 0,
    };
  }

  // =========================================================================
  // AI MODEL BENCHMARKS
  // =========================================================================

  async findModelBenchmarkById(id: string, schoolId: string): Promise<AiModelBenchmark | null> {
    const { data, error } = await this.supabase
      .from('ai_model_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_MODEL_BENCHMARK_NOT_FOUND', `Benchmark not found: ${error.message}`);
    return data;
  }

  async findModelBenchmarks(query: PaginationParams & { modelId?: string; schoolId?: string }): Promise<PaginatedResult<AiModelBenchmark>> {
    const { page = 1, limit = 20, offset = 0, modelId, schoolId } = query;
    let qb = this.supabase.from('ai_model_benchmarks').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (modelId) qb = qb.eq('model_id', modelId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_MODEL_BENCHMARK_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelBenchmark(benchmark: Omit<AiModelBenchmark, 'id' | 'createdAt'>, schoolId: string): Promise<AiModelBenchmark> {
    const { data, error } = await this.supabase
      .from('ai_model_benchmarks')
      .insert({ ...benchmark, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_MODEL_BENCHMARK_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI FALLBACK MODELS
  // =========================================================================

  async findFallbackModelById(id: string, schoolId: string): Promise<AiFallbackModel | null> {
    const { data, error } = await this.supabase
      .from('ai_fallback_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_FALLBACK_MODEL_NOT_FOUND', `Fallback not found: ${error.message}`);
    return data;
  }

  async findFallbackModels(query: PaginationParams & { primaryModelId?: string; schoolId?: string }): Promise<PaginatedResult<AiFallbackModel>> {
    const { page = 1, limit = 20, offset = 0, primaryModelId, schoolId } = query;
    let qb = this.supabase.from('ai_fallback_models').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (primaryModelId) qb = qb.eq('primary_model_id', primaryModelId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_FALLBACK_MODEL_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createFallbackModel(fallback: Omit<AiFallbackModel, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiFallbackModel> {
    const { data, error } = await this.supabase
      .from('ai_fallback_models')
      .insert({ ...fallback, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_FALLBACK_MODEL_CREATE_ERROR', error.message);
    return data;
  }

  async updateFallbackModel(id: string, updates: Partial<AiFallbackModel>, schoolId: string): Promise<AiFallbackModel> {
    const { data, error } = await this.supabase
      .from('ai_fallback_models')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_FALLBACK_MODEL_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteFallbackModel(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_fallback_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_FALLBACK_MODEL_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI COST BUDGETS
  // =========================================================================

  async findCostBudgetById(id: string, schoolId: string): Promise<AiCostBudget | null> {
    const { data, error } = await this.supabase
      .from('ai_cost_budgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiBillingError('AI_COST_BUDGET_NOT_FOUND', `Budget not found: ${error.message}`);
    return data;
  }

  async findCostBudgets(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiCostBudget>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_cost_budgets').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiBillingError('AI_COST_BUDGET_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createCostBudget(budget: Omit<AiCostBudget, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiCostBudget> {
    const { data, error } = await this.supabase
      .from('ai_cost_budgets')
      .insert({ ...budget, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiBillingError('AI_COST_BUDGET_CREATE_ERROR', error.message);
    return data;
  }

  async updateCostBudget(id: string, updates: Partial<AiCostBudget>, schoolId: string): Promise<AiCostBudget> {
    const { data, error } = await this.supabase
      .from('ai_cost_budgets')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiBillingError('AI_COST_BUDGET_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteCostBudget(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_cost_budgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiBillingError('AI_COST_BUDGET_DELETE_ERROR', error.message);
  }

  async getBudgetSpending(budgetId: string, schoolId: string): Promise<{ spent: number; remaining: number; percentage: number }> {
    const budget = await this.findCostBudgetById(budgetId, schoolId);
    if (!budget) throw new AiBillingError('AI_COST_BUDGET_NOT_FOUND', 'Budget not found');
    const spent = (budget as Record<string, unknown>).currentSpending as number ?? 0;
    const limit = (budget as Record<string, unknown>).amount as number ?? 0;
    return { spent, remaining: limit - spent, percentage: limit > 0 ? (spent / limit) * 100 : 0 };
  }

  // =========================================================================
  // AI USAGE QUOTAS
  // =========================================================================

  async findUsageQuotaById(id: string, schoolId: string): Promise<AiUsageQuota | null> {
    const { data, error } = await this.supabase
      .from('ai_usage_quotas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiUsageError('AI_USAGE_QUOTA_NOT_FOUND', `Quota not found: ${error.message}`);
    return data;
  }

  async findUsageQuotas(query: PaginationParams & { userId?: string; schoolId?: string }): Promise<PaginatedResult<AiUsageQuota>> {
    const { page = 1, limit = 20, offset = 0, userId, schoolId } = query;
    let qb = this.supabase.from('ai_usage_quotas').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (userId) qb = qb.eq('user_id', userId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiUsageError('AI_USAGE_QUOTA_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createUsageQuota(quota: Omit<AiUsageQuota, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiUsageQuota> {
    const { data, error } = await this.supabase
      .from('ai_usage_quotas')
      .insert({ ...quota, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiUsageError('AI_USAGE_QUOTA_CREATE_ERROR', error.message);
    return data;
  }

  async updateUsageQuota(id: string, updates: Partial<AiUsageQuota>, schoolId: string): Promise<AiUsageQuota> {
    const { data, error } = await this.supabase
      .from('ai_usage_quotas')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiUsageError('AI_USAGE_QUOTA_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteUsageQuota(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_usage_quotas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiUsageError('AI_USAGE_QUOTA_DELETE_ERROR', error.message);
  }

  async checkQuotaLimit(userId: string, schoolId: string): Promise<{ allowed: boolean; current: number; limit: number }> {
    const { data: quota } = await this.supabase
      .from('ai_usage_quotas')
      .select('*')
      .eq('user_id', userId)
      .eq('school_id', schoolId)
      .single();
    if (!quota) return { allowed: true, current: 0, limit: Infinity };
    const current = (quota as Record<string, unknown>).currentUsage as number ?? 0;
    const maxLimit = (quota as Record<string, unknown>).maxUsage as number ?? Infinity;
    return { allowed: current < limit, current, limit: maxLimit };
  }

  // =========================================================================
  // AI SESSIONS
  // =========================================================================

  async findSessionById(id: string, schoolId: string): Promise<AiSession | null> {
    const { data, error } = await this.supabase
      .from('ai_sessions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSessionError('AI_SESSION_NOT_FOUND', `Session not found: ${error.message}`);
    return data;
  }

  async findSessions(query: AiSessionQuery): Promise<PaginatedResult<AiSession>> {
    const { page = 1, limit = 20, offset = 0, search, status, userId, schoolId, startDate, endDate } = query;
    let qb = this.supabase.from('ai_sessions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (search) qb = qb.ilike('title', `%${search}%`);
    if (status) qb = qb.eq('status', status);
    if (userId) qb = qb.eq('user_id', userId);
    if (startDate) qb = qb.gte('created_at', startDate);
    if (endDate) qb = qb.lte('created_at', endDate);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSessionError('AI_SESSION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createSession(session: Omit<AiSession, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiSession> {
    const { data, error } = await this.supabase
      .from('ai_sessions')
      .insert({ ...session, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSessionError('AI_SESSION_CREATE_ERROR', error.message);
    return data;
  }

  async updateSession(id: string, updates: Partial<AiSession>, schoolId: string): Promise<AiSession> {
    const { data, error } = await this.supabase
      .from('ai_sessions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSessionError('AI_SESSION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteSession(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_sessions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiSessionError('AI_SESSION_DELETE_ERROR', error.message);
  }

  async endSession(id: string, schoolId: string): Promise<AiSession> {
    return this.updateSession(id, { status: 'ended', endedAt: new Date().toISOString() }, schoolId);
  }

  // =========================================================================
  // AI CONVERSATIONS
  // =========================================================================

  async findConversationById(id: string, schoolId: string): Promise<AiConversation | null> {
    const { data, error } = await this.supabase
      .from('ai_conversations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConversationError('AI_CONVERSATION_NOT_FOUND', `Conversation not found: ${error.message}`);
    return data;
  }

  async findConversations(query: AiConversationQuery): Promise<PaginatedResult<AiConversation>> {
    const { page = 1, limit = 20, offset = 0, search, status, sessionId, schoolId } = query;
    let qb = this.supabase.from('ai_conversations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (search) qb = qb.ilike('title', `%${search}%`);
    if (status) qb = qb.eq('status', status);
    if (sessionId) qb = qb.eq('session_id', sessionId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConversationError('AI_CONVERSATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createConversation(conversation: Omit<AiConversation, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiConversation> {
    const { data, error } = await this.supabase
      .from('ai_conversations')
      .insert({ ...conversation, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConversationError('AI_CONVERSATION_CREATE_ERROR', error.message);
    return data;
  }

  async updateConversation(id: string, updates: Partial<AiConversation>, schoolId: string): Promise<AiConversation> {
    const { data, error } = await this.supabase
      .from('ai_conversations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConversationError('AI_CONVERSATION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteConversation(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_conversations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConversationError('AI_CONVERSATION_DELETE_ERROR', error.message);
  }

  async getConversationWithMessages(conversationId: string, schoolId: string): Promise<AiConversation & { messages: AiMessage[] }> {
    const conversation = await this.findConversationById(conversationId, schoolId);
    if (!conversation) throw new AiConversationError('AI_CONVERSATION_NOT_FOUND', 'Conversation not found');
    const messages = await this.findMessages({ conversationId, schoolId, limit: 1000 });
    return { ...conversation, messages: messages.data };
  }

  // =========================================================================
  // AI MESSAGES
  // =========================================================================

  async findMessageById(id: string, schoolId: string): Promise<AiMessage | null> {
    const { data, error } = await this.supabase
      .from('ai_messages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConversationError('AI_MESSAGE_NOT_FOUND', `Message not found: ${error.message}`);
    return data;
  }

  async findMessages(query: AiMessageQuery): Promise<PaginatedResult<AiMessage>> {
    const { page = 1, limit = 20, offset = 0, role, conversationId, schoolId } = query;
    let qb = this.supabase.from('ai_messages').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (role) qb = qb.eq('role', role);
    if (conversationId) qb = qb.eq('conversation_id', conversationId);
    qb = qb.order('created_at', { ascending: true }).range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConversationError('AI_MESSAGE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createMessage(message: Omit<AiMessage, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiMessage> {
    const { data, error } = await this.supabase
      .from('ai_messages')
      .insert({ ...message, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConversationError('AI_MESSAGE_CREATE_ERROR', error.message);
    return data;
  }

  async updateMessage(id: string, updates: Partial<AiMessage>, schoolId: string): Promise<AiMessage> {
    const { data, error } = await this.supabase
      .from('ai_messages')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConversationError('AI_MESSAGE_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteMessage(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_messages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConversationError('AI_MESSAGE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI FUNCTION CALLS
  // =========================================================================

  async findFunctionCallById(id: string, schoolId: string): Promise<AiFunctionCall | null> {
    const { data, error } = await this.supabase
      .from('ai_function_calls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_CALL_NOT_FOUND', `Function call not found: ${error.message}`);
    return data;
  }

  async findFunctionCalls(query: PaginationParams & { functionName?: string; messageId?: string; schoolId?: string }): Promise<PaginatedResult<AiFunctionCall>> {
    const { page = 1, limit = 20, offset = 0, functionName, messageId, schoolId } = query;
    let qb = this.supabase.from('ai_function_calls').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (functionName) qb = qb.eq('function_name', functionName);
    if (messageId) qb = qb.eq('message_id', messageId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_FUNCTION_CALL_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createFunctionCall(call: Omit<AiFunctionCall, 'id' | 'createdAt'>, schoolId: string): Promise<AiFunctionCall> {
    const { data, error } = await this.supabase
      .from('ai_function_calls')
      .insert({ ...call, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_CALL_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI TOOL CALLS
  // =========================================================================

  async findToolCallById(id: string, schoolId: string): Promise<AiToolCall | null> {
    const { data, error } = await this.supabase
      .from('ai_tool_calls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_TOOL_CALL_NOT_FOUND', `Tool call not found: ${error.message}`);
    return data;
  }

  async findToolCalls(query: PaginationParams & { toolName?: string; messageId?: string; schoolId?: string }): Promise<PaginatedResult<AiToolCall>> {
    const { page = 1, limit = 20, offset = 0, toolName, messageId, schoolId } = query;
    let qb = this.supabase.from('ai_tool_calls').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (toolName) qb = qb.eq('tool_name', toolName);
    if (messageId) qb = qb.eq('message_id', messageId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_TOOL_CALL_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createToolCall(call: Omit<AiToolCall, 'id' | 'createdAt'>, schoolId: string): Promise<AiToolCall> {
    const { data, error } = await this.supabase
      .from('ai_tool_calls')
      .insert({ ...call, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_TOOL_CALL_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI CONTEXT WINDOWS
  // =========================================================================

  async findContextWindowById(id: string, schoolId: string): Promise<AiContextWindow | null> {
    const { data, error } = await this.supabase
      .from('ai_context_windows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_WINDOW_NOT_FOUND', `Context window not found: ${error.message}`);
    return data;
  }

  async findContextWindows(query: PaginationParams & { sessionId?: string; schoolId?: string }): Promise<PaginatedResult<AiContextWindow>> {
    const { page = 1, limit = 20, offset = 0, sessionId, schoolId } = query;
    let qb = this.supabase.from('ai_context_windows').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (sessionId) qb = qb.eq('session_id', sessionId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiContextError('AI_CONTEXT_WINDOW_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createContextWindow(window: Omit<AiContextWindow, 'id' | 'createdAt'>, schoolId: string): Promise<AiContextWindow> {
    const { data, error } = await this.supabase
      .from('ai_context_windows')
      .insert({ ...window, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_WINDOW_CREATE_ERROR', error.message);
    return data;
  }

  async updateContextWindow(id: string, updates: Partial<AiContextWindow>, schoolId: string): Promise<AiContextWindow> {
    const { data, error } = await this.supabase
      .from('ai_context_windows')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_WINDOW_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI CONVERSATION MEMORY
  // =========================================================================

  async findConversationMemoryById(id: string, schoolId: string): Promise<AiConversationMemory | null> {
    const { data, error } = await this.supabase
      .from('ai_conversation_memory')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiContextError('AI_CONVERSATION_MEMORY_NOT_FOUND', `Memory not found: ${error.message}`);
    return data;
  }

  async findConversationMemories(query: PaginationParams & { conversationId?: string; schoolId?: string }): Promise<PaginatedResult<AiConversationMemory>> {
    const { page = 1, limit = 20, offset = 0, conversationId, schoolId } = query;
    let qb = this.supabase.from('ai_conversation_memory').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (conversationId) qb = qb.eq('conversation_id', conversationId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiContextError('AI_CONVERSATION_MEMORY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createConversationMemory(memory: Omit<AiConversationMemory, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiConversationMemory> {
    const { data, error } = await this.supabase
      .from('ai_conversation_memory')
      .insert({ ...memory, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONVERSATION_MEMORY_CREATE_ERROR', error.message);
    return data;
  }

  async updateConversationMemory(id: string, updates: Partial<AiConversationMemory>, schoolId: string): Promise<AiConversationMemory> {
    const { data, error } = await this.supabase
      .from('ai_conversation_memory')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONVERSATION_MEMORY_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI CONVERSATION SUMMARIES
  // =========================================================================

  async findConversationSummaryById(id: string, schoolId: string): Promise<AiConversationSummary | null> {
    const { data, error } = await this.supabase
      .from('ai_conversation_summaries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiContextError('AI_CONVERSATION_SUMMARY_NOT_FOUND', `Summary not found: ${error.message}`);
    return data;
  }

  async findConversationSummaries(query: PaginationParams & { conversationId?: string; schoolId?: string }): Promise<PaginatedResult<AiConversationSummary>> {
    const { page = 1, limit = 20, offset = 0, conversationId, schoolId } = query;
    let qb = this.supabase.from('ai_conversation_summaries').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (conversationId) qb = qb.eq('conversation_id', conversationId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiContextError('AI_CONVERSATION_SUMMARY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createConversationSummary(summary: Omit<AiConversationSummary, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiConversationSummary> {
    const { data, error } = await this.supabase
      .from('ai_conversation_summaries')
      .insert({ ...summary, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONVERSATION_SUMMARY_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI SESSION ANALYTICS
  // =========================================================================

  async findSessionAnalyticsById(id: string, schoolId: string): Promise<AiSessionAnalytics | null> {
    const { data, error } = await this.supabase
      .from('ai_session_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_SESSION_ANALYTICS_NOT_FOUND', `Analytics not found: ${error.message}`);
    return data;
  }

  async findSessionAnalytics(query: PaginationParams & { sessionId?: string; schoolId?: string }): Promise<PaginatedResult<AiSessionAnalytics>> {
    const { page = 1, limit = 20, offset = 0, sessionId, schoolId } = query;
    let qb = this.supabase.from('ai_session_analytics').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (sessionId) qb = qb.eq('session_id', sessionId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_SESSION_ANALYTICS_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createSessionAnalytics(analytics: Omit<AiSessionAnalytics, 'id' | 'createdAt'>, schoolId: string): Promise<AiSessionAnalytics> {
    const { data, error } = await this.supabase
      .from('ai_session_analytics')
      .insert({ ...analytics, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_SESSION_ANALYTICS_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PROMPT TEMPLATES
  // =========================================================================

  async findPromptTemplateById(id: string, schoolId: string): Promise<AiPromptTemplate | null> {
    const { data, error } = await this.supabase
      .from('ai_prompt_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_TEMPLATE_NOT_FOUND', `Template not found: ${error.message}`);
    return data;
  }

  async findPromptTemplates(query: AiPromptQuery): Promise<PaginatedResult<AiPromptTemplate>> {
    const { page = 1, limit = 20, offset = 0, search, category, schoolId } = query;
    let qb = this.supabase.from('ai_prompt_templates').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (search) qb = qb.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    if (category) qb = qb.eq('category', category);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPromptError('AI_PROMPT_TEMPLATE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPromptTemplate(template: Omit<AiPromptTemplate, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPromptTemplate> {
    const { data, error } = await this.supabase
      .from('ai_prompt_templates')
      .insert({ ...template, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_TEMPLATE_CREATE_ERROR', error.message);
    return data;
  }

  async updatePromptTemplate(id: string, updates: Partial<AiPromptTemplate>, schoolId: string): Promise<AiPromptTemplate> {
    const { data, error } = await this.supabase
      .from('ai_prompt_templates')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_TEMPLATE_UPDATE_ERROR', error.message);
    return data;
  }

  async deletePromptTemplate(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_prompt_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiPromptError('AI_PROMPT_TEMPLATE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI PROMPT VERSIONS
  // =========================================================================

  async findPromptVersionById(id: string, schoolId: string): Promise<AiPromptVersion | null> {
    const { data, error } = await this.supabase
      .from('ai_prompt_versions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_VERSION_NOT_FOUND', `Version not found: ${error.message}`);
    return data;
  }

  async findPromptVersions(query: PaginationParams & { templateId?: string; schoolId?: string }): Promise<PaginatedResult<AiPromptVersion>> {
    const { page = 1, limit = 20, offset = 0, templateId, schoolId } = query;
    let qb = this.supabase.from('ai_prompt_versions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (templateId) qb = qb.eq('template_id', templateId);
    qb = qb.order('version', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPromptError('AI_PROMPT_VERSION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPromptVersion(version: Omit<AiPromptVersion, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPromptVersion> {
    const { data, error } = await this.supabase
      .from('ai_prompt_versions')
      .insert({ ...version, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_VERSION_CREATE_ERROR', error.message);
    return data;
  }

  async getLatestPromptVersion(templateId: string, schoolId: string): Promise<AiPromptVersion | null> {
    const { data, error } = await this.supabase
      .from('ai_prompt_versions')
      .select('*')
      .eq('template_id', templateId)
      .eq('school_id', schoolId)
      .order('version', { ascending: false })
      .limit(1)
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_VERSION_FETCH_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PROMPT EXECUTIONS
  // =========================================================================

  async findPromptExecutionById(id: string, schoolId: string): Promise<AiPromptExecution | null> {
    const { data, error } = await this.supabase
      .from('ai_prompt_executions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_EXECUTION_NOT_FOUND', `Execution not found: ${error.message}`);
    return data;
  }

  async findPromptExecutions(query: PaginationParams & { templateId?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiPromptExecution>> {
    const { page = 1, limit = 20, offset = 0, templateId, status, schoolId } = query;
    let qb = this.supabase.from('ai_prompt_executions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (templateId) qb = qb.eq('template_id', templateId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPromptError('AI_PROMPT_EXECUTION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPromptExecution(execution: Omit<AiPromptExecution, 'id' | 'createdAt'>, schoolId: string): Promise<AiPromptExecution> {
    const { data, error } = await this.supabase
      .from('ai_prompt_executions')
      .insert({ ...execution, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_EXECUTION_CREATE_ERROR', error.message);
    return data;
  }

  async updatePromptExecution(id: string, updates: Partial<AiPromptExecution>, schoolId: string): Promise<AiPromptExecution> {
    const { data, error } = await this.supabase
      .from('ai_prompt_executions')
      .update({ ...updates })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_EXECUTION_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PROMPT CATEGORIES
  // =========================================================================

  async findPromptCategoryById(id: string, schoolId: string): Promise<AiPromptCategory | null> {
    const { data, error } = await this.supabase
      .from('ai_prompt_categories')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_CATEGORY_NOT_FOUND', `Category not found: ${error.message}`);
    return data;
  }

  async findPromptCategories(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiPromptCategory>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_prompt_categories').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPromptError('AI_PROMPT_CATEGORY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPromptCategory(category: Omit<AiPromptCategory, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPromptCategory> {
    const { data, error } = await this.supabase
      .from('ai_prompt_categories')
      .insert({ ...category, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_CATEGORY_CREATE_ERROR', error.message);
    return data;
  }

  async updatePromptCategory(id: string, updates: Partial<AiPromptCategory>, schoolId: string): Promise<AiPromptCategory> {
    const { data, error } = await this.supabase
      .from('ai_prompt_categories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_CATEGORY_UPDATE_ERROR', error.message);
    return data;
  }

  async deletePromptCategory(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_prompt_categories')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiPromptError('AI_PROMPT_CATEGORY_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI CONTEXTS
  // =========================================================================

  async findContextById(id: string, schoolId: string): Promise<AiContext | null> {
    const { data, error } = await this.supabase
      .from('ai_contexts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_NOT_FOUND', `Context not found: ${error.message}`);
    return data;
  }

  async findContexts(query: PaginationParams & { type?: string; schoolId?: string }): Promise<PaginatedResult<AiContext>> {
    const { page = 1, limit = 20, offset = 0, type, schoolId } = query;
    let qb = this.supabase.from('ai_contexts').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (type) qb = qb.eq('type', type);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiContextError('AI_CONTEXT_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createContext(context: Omit<AiContext, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiContext> {
    const { data, error } = await this.supabase
      .from('ai_contexts')
      .insert({ ...context, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_CREATE_ERROR', error.message);
    return data;
  }

  async updateContext(id: string, updates: Partial<AiContext>, schoolId: string): Promise<AiContext> {
    const { data, error } = await this.supabase
      .from('ai_contexts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteContext(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_contexts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiContextError('AI_CONTEXT_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI CONTEXT SOURCES
  // =========================================================================

  async findContextSourceById(id: string, schoolId: string): Promise<AiContextSource | null> {
    const { data, error } = await this.supabase
      .from('ai_context_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_SOURCE_NOT_FOUND', `Source not found: ${error.message}`);
    return data;
  }

  async findContextSources(query: PaginationParams & { type?: string; schoolId?: string }): Promise<PaginatedResult<AiContextSource>> {
    const { page = 1, limit = 20, offset = 0, type, schoolId } = query;
    let qb = this.supabase.from('ai_context_sources').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (type) qb = qb.eq('type', type);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiContextError('AI_CONTEXT_SOURCE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createContextSource(source: Omit<AiContextSource, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiContextSource> {
    const { data, error } = await this.supabase
      .from('ai_context_sources')
      .insert({ ...source, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_SOURCE_CREATE_ERROR', error.message);
    return data;
  }

  async updateContextSource(id: string, updates: Partial<AiContextSource>, schoolId: string): Promise<AiContextSource> {
    const { data, error } = await this.supabase
      .from('ai_context_sources')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_SOURCE_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteContextSource(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_context_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiContextError('AI_CONTEXT_SOURCE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI CONTEXT INJECTIONS
  // =========================================================================

  async findContextInjectionById(id: string, schoolId: string): Promise<AiContextInjection | null> {
    const { data, error } = await this.supabase
      .from('ai_context_injections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_INJECTION_NOT_FOUND', `Injection not found: ${error.message}`);
    return data;
  }

  async findContextInjections(query: PaginationParams & { contextId?: string; schoolId?: string }): Promise<PaginatedResult<AiContextInjection>> {
    const { page = 1, limit = 20, offset = 0, contextId, schoolId } = query;
    let qb = this.supabase.from('ai_context_injections').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (contextId) qb = qb.eq('context_id', contextId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiContextError('AI_CONTEXT_INJECTION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createContextInjection(injection: Omit<AiContextInjection, 'id' | 'createdAt'>, schoolId: string): Promise<AiContextInjection> {
    const { data, error } = await this.supabase
      .from('ai_context_injections')
      .insert({ ...injection, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiContextError('AI_CONTEXT_INJECTION_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI EVALUATIONS
  // =========================================================================

  async findEvaluationById(id: string, schoolId: string): Promise<AiEvaluation | null> {
    const { data, error } = await this.supabase
      .from('ai_evaluations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiEvaluationError('AI_EVALUATION_NOT_FOUND', `Evaluation not found: ${error.message}`);
    return data;
  }

  async findEvaluations(query: AiEvaluationQuery): Promise<PaginatedResult<AiEvaluation>> {
    const { page = 1, limit = 20, offset = 0, status, evaluatorType, schoolId } = query;
    let qb = this.supabase.from('ai_evaluations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    if (evaluatorType) qb = qb.eq('evaluator_type', evaluatorType);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiEvaluationError('AI_EVALUATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createEvaluation(evaluation: Omit<AiEvaluation, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiEvaluation> {
    const { data, error } = await this.supabase
      .from('ai_evaluations')
      .insert({ ...evaluation, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_EVALUATION_CREATE_ERROR', error.message);
    return data;
  }

  async updateEvaluation(id: string, updates: Partial<AiEvaluation>, schoolId: string): Promise<AiEvaluation> {
    const { data, error } = await this.supabase
      .from('ai_evaluations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_EVALUATION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteEvaluation(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_evaluations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiEvaluationError('AI_EVALUATION_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI MODEL EVALUATIONS
  // =========================================================================

  async findModelEvaluationById(id: string, schoolId: string): Promise<AiModelEvaluation | null> {
    const { data, error } = await this.supabase
      .from('ai_model_evaluations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiEvaluationError('AI_MODEL_EVALUATION_NOT_FOUND', `Model evaluation not found: ${error.message}`);
    return data;
  }

  async findModelEvaluations(query: PaginationParams & { modelId?: string; evaluationId?: string; schoolId?: string }): Promise<PaginatedResult<AiModelEvaluation>> {
    const { page = 1, limit = 20, offset = 0, modelId, evaluationId, schoolId } = query;
    let qb = this.supabase.from('ai_model_evaluations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (modelId) qb = qb.eq('model_id', modelId);
    if (evaluationId) qb = qb.eq('evaluation_id', evaluationId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiEvaluationError('AI_MODEL_EVALUATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelEvaluation(eval_: Omit<AiModelEvaluation, 'id' | 'createdAt'>, schoolId: string): Promise<AiModelEvaluation> {
    const { data, error } = await this.supabase
      .from('ai_model_evaluations')
      .insert({ ...eval_, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_MODEL_EVALUATION_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI SCHOOL CONFIG
  // =========================================================================

  async findSchoolConfig(schoolId: string): Promise<AiSchoolConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_school_configs')
      .select('*')
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_SCHOOL_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async createSchoolConfig(config: Omit<AiSchoolConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiSchoolConfig> {
    const { data, error } = await this.supabase
      .from('ai_school_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_SCHOOL_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateSchoolConfig(schoolId: string, updates: Partial<AiSchoolConfig>): Promise<AiSchoolConfig> {
    const { data, error } = await this.supabase
      .from('ai_school_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_SCHOOL_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI USER PREFERENCES
  // =========================================================================

  async findUserPreferenceById(id: string, schoolId: string): Promise<AiUserPreference | null> {
    const { data, error } = await this.supabase
      .from('ai_user_preferences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_USER_PREFERENCE_NOT_FOUND', `Preference not found: ${error.message}`);
    return data;
  }

  async findUserPreferenceByUserId(userId: string, schoolId: string): Promise<AiUserPreference | null> {
    const { data, error } = await this.supabase
      .from('ai_user_preferences')
      .select('*')
      .eq('user_id', userId)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_USER_PREFERENCE_FETCH_ERROR', error.message);
    return data;
  }

  async findUserPreferences(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiUserPreference>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_user_preferences').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_USER_PREFERENCE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createUserPreference(preference: Omit<AiUserPreference, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiUserPreference> {
    const { data, error } = await this.supabase
      .from('ai_user_preferences')
      .insert({ ...preference, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_USER_PREFERENCE_CREATE_ERROR', error.message);
    return data;
  }

  async updateUserPreference(id: string, updates: Partial<AiUserPreference>, schoolId: string): Promise<AiUserPreference> {
    const { data, error } = await this.supabase
      .from('ai_user_preferences')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_USER_PREFERENCE_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteUserPreference(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_user_preferences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_USER_PREFERENCE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI ACCESS CONTROLS
  // =========================================================================

  async findAccessControlById(id: string, schoolId: string): Promise<AiAccessControl | null> {
    const { data, error } = await this.supabase
      .from('ai_access_controls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAccessError('AI_ACCESS_CONTROL_NOT_FOUND', `Access control not found: ${error.message}`);
    return data;
  }

  async findAccessControls(query: PaginationParams & { userId?: string; resourceType?: string; schoolId?: string }): Promise<PaginatedResult<AiAccessControl>> {
    const { page = 1, limit = 20, offset = 0, userId, resourceType, schoolId } = query;
    let qb = this.supabase.from('ai_access_controls').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (userId) qb = qb.eq('user_id', userId);
    if (resourceType) qb = qb.eq('resource_type', resourceType);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAccessError('AI_ACCESS_CONTROL_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createAccessControl(control: Omit<AiAccessControl, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiAccessControl> {
    const { data, error } = await this.supabase
      .from('ai_access_controls')
      .insert({ ...control, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAccessError('AI_ACCESS_CONTROL_CREATE_ERROR', error.message);
    return data;
  }

  async updateAccessControl(id: string, updates: Partial<AiAccessControl>, schoolId: string): Promise<AiAccessControl> {
    const { data, error } = await this.supabase
      .from('ai_access_controls')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAccessError('AI_ACCESS_CONTROL_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteAccessControl(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_access_controls')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiAccessError('AI_ACCESS_CONTROL_DELETE_ERROR', error.message);
  }

  async checkAccess(userId: string, resourceType: string, resourceId: string, schoolId: string): Promise<boolean> {
    const { data } = await this.supabase
      .from('ai_access_controls')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .limit(1)
      .single();
    return !!data;
  }

  // =========================================================================
  // AI FEATURE FLAGS
  // =========================================================================

  async findFeatureFlagById(id: string, schoolId: string): Promise<AiFeatureFlag | null> {
    const { data, error } = await this.supabase
      .from('ai_feature_flags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_FEATURE_FLAG_NOT_FOUND', `Feature flag not found: ${error.message}`);
    return data;
  }

  async findFeatureFlags(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiFeatureFlag>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_feature_flags').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_FEATURE_FLAG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createFeatureFlag(flag: Omit<AiFeatureFlag, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiFeatureFlag> {
    const { data, error } = await this.supabase
      .from('ai_feature_flags')
      .insert({ ...flag, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_FEATURE_FLAG_CREATE_ERROR', error.message);
    return data;
  }

  async updateFeatureFlag(id: string, updates: Partial<AiFeatureFlag>, schoolId: string): Promise<AiFeatureFlag> {
    const { data, error } = await this.supabase
      .from('ai_feature_flags')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_FEATURE_FLAG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteFeatureFlag(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_feature_flags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_FEATURE_FLAG_DELETE_ERROR', error.message);
  }

  async isFeatureEnabled(flagName: string, schoolId: string): Promise<boolean> {
    const { data } = await this.supabase
      .from('ai_feature_flags')
      .select('enabled')
      .eq('name', flagName)
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .single();
    return (data as Record<string, unknown>)?.enabled as boolean ?? false;
  }

  // =========================================================================
  // AI BILLING CONFIGS
  // =========================================================================

  async findBillingConfigById(id: string, schoolId: string): Promise<AiBillingConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_billing_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiBillingError('AI_BILLING_CONFIG_NOT_FOUND', `Billing config not found: ${error.message}`);
    return data;
  }

  async findBillingConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiBillingConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_billing_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiBillingError('AI_BILLING_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createBillingConfig(config: Omit<AiBillingConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiBillingConfig> {
    const { data, error } = await this.supabase
      .from('ai_billing_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiBillingError('AI_BILLING_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateBillingConfig(id: string, updates: Partial<AiBillingConfig>, schoolId: string): Promise<AiBillingConfig> {
    const { data, error } = await this.supabase
      .from('ai_billing_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiBillingError('AI_BILLING_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteBillingConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_billing_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiBillingError('AI_BILLING_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI AUDIT ENTRIES
  // =========================================================================

  async findAuditEntryById(id: string, schoolId: string): Promise<AiAuditEntry | null> {
    const { data, error } = await this.supabase
      .from('ai_audit_entries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAuditError('AI_AUDIT_ENTRY_NOT_FOUND', `Audit entry not found: ${error.message}`);
    return data;
  }

  async findAuditEntries(query: AiAuditQuery): Promise<PaginatedResult<AiAuditEntry>> {
    const { page = 1, limit = 20, offset = 0, action, resourceType, userId, schoolId, startDate, endDate } = query;
    let qb = this.supabase.from('ai_audit_entries').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (action) qb = qb.eq('action', action);
    if (resourceType) qb = qb.eq('resource_type', resourceType);
    if (userId) qb = qb.eq('user_id', userId);
    if (startDate) qb = qb.gte('created_at', startDate);
    if (endDate) qb = qb.lte('created_at', endDate);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAuditError('AI_AUDIT_ENTRY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createAuditEntry(entry: Omit<AiAuditEntry, 'id' | 'createdAt'>, schoolId: string): Promise<AiAuditEntry> {
    const { data, error } = await this.supabase
      .from('ai_audit_entries')
      .insert({ ...entry, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAuditError('AI_AUDIT_ENTRY_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PERFORMANCE METRICS
  // =========================================================================

  async findPerformanceMetricById(id: string, schoolId: string): Promise<AiPerformanceMetric | null> {
    const { data, error } = await this.supabase
      .from('ai_performance_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_METRIC_NOT_FOUND', `Metric not found: ${error.message}`);
    return data;
  }

  async findPerformanceMetrics(query: PaginationParams & { metricType?: string; schoolId?: string; startDate?: string; endDate?: string }): Promise<PaginatedResult<AiPerformanceMetric>> {
    const { page = 1, limit = 20, offset = 0, metricType, schoolId, startDate, endDate } = query;
    let qb = this.supabase.from('ai_performance_metrics').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (metricType) qb = qb.eq('metric_type', metricType);
    if (startDate) qb = qb.gte('created_at', startDate);
    if (endDate) qb = qb.lte('created_at', endDate);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_METRIC_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPerformanceMetric(metric: Omit<AiPerformanceMetric, 'id' | 'createdAt'>, schoolId: string): Promise<AiPerformanceMetric> {
    const { data, error } = await this.supabase
      .from('ai_performance_metrics')
      .insert({ ...metric, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_METRIC_CREATE_ERROR', error.message);
    return data;
  }

  async getPerformanceStats(metricType: string, schoolId: string, startDate: string, endDate: string): Promise<{
    avgValue: number;
    minValue: number;
    maxValue: number;
    count: number;
  }> {
    const { data, error } = await this.supabase
      .from('ai_performance_metrics')
      .select('value')
      .eq('metric_type', metricType)
      .eq('school_id', schoolId)
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_STATS_ERROR', error.message);
    const metrics = (data ?? []) as Record<string, unknown>[];
    const values = metrics.map((m) => (m.value as number) ?? 0);
    return {
      avgValue: values.length > 0 ? values.reduce((a: number, b: number) => a + b, 0) / values.length : 0,
      minValue: values.length > 0 ? Math.min(...values) : 0,
      maxValue: values.length > 0 ? Math.max(...values) : 0,
      count: values.length,
    };
  }

  // =========================================================================
  // AI DAILY USAGE
  // =========================================================================

  async findDailyUsageById(id: string, schoolId: string): Promise<AiDailyUsage | null> {
    const { data, error } = await this.supabase
      .from('ai_daily_usage')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiUsageError('AI_DAILY_USAGE_NOT_FOUND', `Daily usage not found: ${error.message}`);
    return data;
  }

  async findDailyUsages(query: PaginationParams & { startDate?: string; endDate?: string; schoolId?: string }): Promise<PaginatedResult<AiDailyUsage>> {
    const { page = 1, limit = 20, offset = 0, startDate, endDate, schoolId } = query;
    let qb = this.supabase.from('ai_daily_usage').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (startDate) qb = qb.gte('date', startDate);
    if (endDate) qb = qb.lte('date', endDate);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiUsageError('AI_DAILY_USAGE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createDailyUsage(usage: Omit<AiDailyUsage, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiDailyUsage> {
    const { data, error } = await this.supabase
      .from('ai_daily_usage')
      .insert({ ...usage, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiUsageError('AI_DAILY_USAGE_CREATE_ERROR', error.message);
    return data;
  }

  async updateDailyUsage(id: string, updates: Partial<AiDailyUsage>, schoolId: string): Promise<AiDailyUsage> {
    const { data, error } = await this.supabase
      .from('ai_daily_usage')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiUsageError('AI_DAILY_USAGE_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI CONVERSATION ANALYTICS
  // =========================================================================

  async findConversationAnalyticById(id: string, schoolId: string): Promise<AiConversationAnalytic | null> {
    const { data, error } = await this.supabase
      .from('ai_conversation_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_CONVERSATION_ANALYTIC_NOT_FOUND', `Analytic not found: ${error.message}`);
    return data;
  }

  async findConversationAnalytics(query: PaginationParams & { conversationId?: string; schoolId?: string }): Promise<PaginatedResult<AiConversationAnalytic>> {
    const { page = 1, limit = 20, offset = 0, conversationId, schoolId } = query;
    let qb = this.supabase.from('ai_conversation_analytics').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (conversationId) qb = qb.eq('conversation_id', conversationId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_CONVERSATION_ANALYTIC_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createConversationAnalytic(analytic: Omit<AiConversationAnalytic, 'id' | 'createdAt'>, schoolId: string): Promise<AiConversationAnalytic> {
    const { data, error } = await this.supabase
      .from('ai_conversation_analytics')
      .insert({ ...analytic, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_CONVERSATION_ANALYTIC_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI RATE LIMIT CONFIGS
  // =========================================================================

  async findRateLimitConfigById(id: string, schoolId: string): Promise<AiRateLimitConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_rate_limit_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_RATE_LIMIT_CONFIG_NOT_FOUND', `Rate limit config not found: ${error.message}`);
    return data;
  }

  async findRateLimitConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiRateLimitConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_rate_limit_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_RATE_LIMIT_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createRateLimitConfig(config: Omit<AiRateLimitConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiRateLimitConfig> {
    const { data, error } = await this.supabase
      .from('ai_rate_limit_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_RATE_LIMIT_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateRateLimitConfig(id: string, updates: Partial<AiRateLimitConfig>, schoolId: string): Promise<AiRateLimitConfig> {
    const { data, error } = await this.supabase
      .from('ai_rate_limit_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_RATE_LIMIT_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteRateLimitConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_rate_limit_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_RATE_LIMIT_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI FUNCTION DEFINITIONS
  // =========================================================================

  async findFunctionDefinitionById(id: string, schoolId: string): Promise<AiFunctionDefinition | null> {
    const { data, error } = await this.supabase
      .from('ai_function_definitions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_DEFINITION_NOT_FOUND', `Function definition not found: ${error.message}`);
    return data;
  }

  async findFunctionDefinitions(query: PaginationParams & { category?: string; schoolId?: string }): Promise<PaginatedResult<AiFunctionDefinition>> {
    const { page = 1, limit = 20, offset = 0, category, schoolId } = query;
    let qb = this.supabase.from('ai_function_definitions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (category) qb = qb.eq('category', category);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_FUNCTION_DEFINITION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createFunctionDefinition(def: Omit<AiFunctionDefinition, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiFunctionDefinition> {
    const { data, error } = await this.supabase
      .from('ai_function_definitions')
      .insert({ ...def, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_DEFINITION_CREATE_ERROR', error.message);
    return data;
  }

  async updateFunctionDefinition(id: string, updates: Partial<AiFunctionDefinition>, schoolId: string): Promise<AiFunctionDefinition> {
    const { data, error } = await this.supabase
      .from('ai_function_definitions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_DEFINITION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteFunctionDefinition(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_function_definitions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiAgentError('AI_FUNCTION_DEFINITION_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI FUNCTION EXECUTIONS
  // =========================================================================

  async findFunctionExecutionById(id: string, schoolId: string): Promise<AiFunctionExecution | null> {
    const { data, error } = await this.supabase
      .from('ai_function_executions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_EXECUTION_NOT_FOUND', `Function execution not found: ${error.message}`);
    return data;
  }

  async findFunctionExecutions(query: PaginationParams & { functionName?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiFunctionExecution>> {
    const { page = 1, limit = 20, offset = 0, functionName, status, schoolId } = query;
    let qb = this.supabase.from('ai_function_executions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (functionName) qb = qb.eq('function_name', functionName);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_FUNCTION_EXECUTION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createFunctionExecution(execution: Omit<AiFunctionExecution, 'id' | 'createdAt'>, schoolId: string): Promise<AiFunctionExecution> {
    const { data, error } = await this.supabase
      .from('ai_function_executions')
      .insert({ ...execution, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_EXECUTION_CREATE_ERROR', error.message);
    return data;
  }

  async updateFunctionExecution(id: string, updates: Partial<AiFunctionExecution>, schoolId: string): Promise<AiFunctionExecution> {
    const { data, error } = await this.supabase
      .from('ai_function_executions')
      .update({ ...updates })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_FUNCTION_EXECUTION_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI CACHE ENTRIES
  // =========================================================================

  async findCacheEntryById(id: string, schoolId: string): Promise<AiCacheEntry | null> {
    const { data, error } = await this.supabase
      .from('ai_cache_entries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_NOT_FOUND', `Cache entry not found: ${error.message}`);
    return data;
  }

  async findCacheEntryByKey(key: string, schoolId: string): Promise<AiCacheEntry | null> {
    const { data, error } = await this.supabase
      .from('ai_cache_entries')
      .select('*')
      .eq('cache_key', key)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_FETCH_ERROR', error.message);
    return data;
  }

  async findCacheEntries(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiCacheEntry>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_cache_entries').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createCacheEntry(entry: Omit<AiCacheEntry, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiCacheEntry> {
    const { data, error } = await this.supabase
      .from('ai_cache_entries')
      .insert({ ...entry, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_CREATE_ERROR', error.message);
    return data;
  }

  async updateCacheEntry(id: string, updates: Partial<AiCacheEntry>, schoolId: string): Promise<AiCacheEntry> {
    const { data, error } = await this.supabase
      .from('ai_cache_entries')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteCacheEntry(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_cache_entries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_DELETE_ERROR', error.message);
  }

  async deleteExpiredCacheEntries(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('ai_cache_entries')
      .delete()
      .lt('expires_at', new Date().toISOString())
      .eq('school_id', schoolId)
      .select('id');
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_CLEANUP_ERROR', error.message);
    return data?.length ?? 0;
  }

  // =========================================================================
  // AI MODEL VERSIONS
  // =========================================================================

  async findModelVersionById(id: string, schoolId: string): Promise<AiModelVersion | null> {
    const { data, error } = await this.supabase
      .from('ai_model_versions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_MODEL_VERSION_NOT_FOUND', `Model version not found: ${error.message}`);
    return data;
  }

  async findModelVersions(query: PaginationParams & { modelId?: string; schoolId?: string }): Promise<PaginatedResult<AiModelVersion>> {
    const { page = 1, limit = 20, offset = 0, modelId, schoolId } = query;
    let qb = this.supabase.from('ai_model_versions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (modelId) qb = qb.eq('model_id', modelId);
    qb = qb.order('version', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_MODEL_VERSION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelVersion(version: Omit<AiModelVersion, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiModelVersion> {
    const { data, error } = await this.supabase
      .from('ai_model_versions')
      .insert({ ...version, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_VERSION_CREATE_ERROR', error.message);
    return data;
  }

  async updateModelVersion(id: string, updates: Partial<AiModelVersion>, schoolId: string): Promise<AiModelVersion> {
    const { data, error } = await this.supabase
      .from('ai_model_versions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_VERSION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteModelVersion(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_model_versions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_MODEL_VERSION_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI AB TESTS
  // =========================================================================

  async findAbTestById(id: string, schoolId: string): Promise<AiAbTest | null> {
    const { data, error } = await this.supabase
      .from('ai_ab_tests')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiEvaluationError('AI_AB_TEST_NOT_FOUND', `AB test not found: ${error.message}`);
    return data;
  }

  async findAbTests(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiAbTest>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_ab_tests').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiEvaluationError('AI_AB_TEST_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createAbTest(test: Omit<AiAbTest, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiAbTest> {
    const { data, error } = await this.supabase
      .from('ai_ab_tests')
      .insert({ ...test, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_AB_TEST_CREATE_ERROR', error.message);
    return data;
  }

  async updateAbTest(id: string, updates: Partial<AiAbTest>, schoolId: string): Promise<AiAbTest> {
    const { data, error } = await this.supabase
      .from('ai_ab_tests')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_AB_TEST_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteAbTest(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_ab_tests')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiEvaluationError('AI_AB_TEST_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI FEEDBACK
  // =========================================================================

  async findFeedbackById(id: string, schoolId: string): Promise<AiFeedback | null> {
    const { data, error } = await this.supabase
      .from('ai_feedback')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiEvaluationError('AI_FEEDBACK_NOT_FOUND', `Feedback not found: ${error.message}`);
    return data;
  }

  async findFeedbacks(query: PaginationParams & { messageType?: string; schoolId?: string }): Promise<PaginatedResult<AiFeedback>> {
    const { page = 1, limit = 20, offset = 0, messageType, schoolId } = query;
    let qb = this.supabase.from('ai_feedback').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (messageType) qb = qb.eq('message_type', messageType);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiEvaluationError('AI_FEEDBACK_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createFeedback(feedback: Omit<AiFeedback, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiFeedback> {
    const { data, error } = await this.supabase
      .from('ai_feedback')
      .insert({ ...feedback, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_FEEDBACK_CREATE_ERROR', error.message);
    return data;
  }

  async updateFeedback(id: string, updates: Partial<AiFeedback>, schoolId: string): Promise<AiFeedback> {
    const { data, error } = await this.supabase
      .from('ai_feedback')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_FEEDBACK_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteFeedback(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_feedback')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiEvaluationError('AI_FEEDBACK_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI INSIGHTS
  // =========================================================================

  async findInsightById(id: string, schoolId: string): Promise<AiInsight | null> {
    const { data, error } = await this.supabase
      .from('ai_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_INSIGHT_NOT_FOUND', `Insight not found: ${error.message}`);
    return data;
  }

  async findInsights(query: PaginationParams & { category?: string; schoolId?: string }): Promise<PaginatedResult<AiInsight>> {
    const { page = 1, limit = 20, offset = 0, category, schoolId } = query;
    let qb = this.supabase.from('ai_insights').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (category) qb = qb.eq('category', category);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_INSIGHT_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createInsight(insight: Omit<AiInsight, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiInsight> {
    const { data, error } = await this.supabase
      .from('ai_insights')
      .insert({ ...insight, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_INSIGHT_CREATE_ERROR', error.message);
    return data;
  }

  async updateInsight(id: string, updates: Partial<AiInsight>, schoolId: string): Promise<AiInsight> {
    const { data, error } = await this.supabase
      .from('ai_insights')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_INSIGHT_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteInsight(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiPerformanceError('AI_INSIGHT_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI RECOMMENDATIONS
  // =========================================================================

  async findRecommendationById(id: string, schoolId: string): Promise<AiRecommendation | null> {
    const { data, error } = await this.supabase
      .from('ai_recommendations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_RECOMMENDATION_NOT_FOUND', `Recommendation not found: ${error.message}`);
    return data;
  }

  async findRecommendations(query: PaginationParams & { type?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiRecommendation>> {
    const { page = 1, limit = 20, offset = 0, type, status, schoolId } = query;
    let qb = this.supabase.from('ai_recommendations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (type) qb = qb.eq('type', type);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_RECOMMENDATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createRecommendation(recommendation: Omit<AiRecommendation, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiRecommendation> {
    const { data, error } = await this.supabase
      .from('ai_recommendations')
      .insert({ ...recommendation, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_RECOMMENDATION_CREATE_ERROR', error.message);
    return data;
  }

  async updateRecommendation(id: string, updates: Partial<AiRecommendation>, schoolId: string): Promise<AiRecommendation> {
    const { data, error } = await this.supabase
      .from('ai_recommendations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_RECOMMENDATION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteRecommendation(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_recommendations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiPerformanceError('AI_RECOMMENDATION_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI AUDIT LOGS
  // =========================================================================

  async findAuditLogById(id: string, schoolId: string): Promise<AiAuditLog | null> {
    const { data, error } = await this.supabase
      .from('ai_audit_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAuditError('AI_AUDIT_LOG_NOT_FOUND', `Audit log not found: ${error.message}`);
    return data;
  }

  async findAuditLogs(query: AiAuditQuery): Promise<PaginatedResult<AiAuditLog>> {
    const { page = 1, limit = 20, offset = 0, action, resourceType, userId, schoolId, startDate, endDate } = query;
    let qb = this.supabase.from('ai_audit_logs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (action) qb = qb.eq('action', action);
    if (resourceType) qb = qb.eq('resource_type', resourceType);
    if (userId) qb = qb.eq('user_id', userId);
    if (startDate) qb = qb.gte('created_at', startDate);
    if (endDate) qb = qb.lte('created_at', endDate);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAuditError('AI_AUDIT_LOG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createAuditLog(log: Omit<AiAuditLog, 'id' | 'createdAt'>, schoolId: string): Promise<AiAuditLog> {
    const { data, error } = await this.supabase
      .from('ai_audit_logs')
      .insert({ ...log, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAuditError('AI_AUDIT_LOG_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI BILLING TRANSACTIONS
  // =========================================================================

  async findBillingTransactionById(id: string, schoolId: string): Promise<AiBillingTransaction | null> {
    const { data, error } = await this.supabase
      .from('ai_billing_transactions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiBillingError('AI_BILLING_TRANSACTION_NOT_FOUND', `Transaction not found: ${error.message}`);
    return data;
  }

  async findBillingTransactions(query: PaginationParams & { type?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiBillingTransaction>> {
    const { page = 1, limit = 20, offset = 0, type, status, schoolId } = query;
    let qb = this.supabase.from('ai_billing_transactions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (type) qb = qb.eq('type', type);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiBillingError('AI_BILLING_TRANSACTION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createBillingTransaction(transaction: Omit<AiBillingTransaction, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiBillingTransaction> {
    const { data, error } = await this.supabase
      .from('ai_billing_transactions')
      .insert({ ...transaction, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiBillingError('AI_BILLING_TRANSACTION_CREATE_ERROR', error.message);
    return data;
  }

  async updateBillingTransaction(id: string, updates: Partial<AiBillingTransaction>, schoolId: string): Promise<AiBillingTransaction> {
    const { data, error } = await this.supabase
      .from('ai_billing_transactions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiBillingError('AI_BILLING_TRANSACTION_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI SUBSCRIPTIONS
  // =========================================================================

  async findSubscriptionById(id: string, schoolId: string): Promise<AiSubscription | null> {
    const { data, error } = await this.supabase
      .from('ai_subscriptions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiBillingError('AI_SUBSCRIPTION_NOT_FOUND', `Subscription not found: ${error.message}`);
    return data;
  }

  async findSubscriptions(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiSubscription>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_subscriptions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiBillingError('AI_SUBSCRIPTION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createSubscription(subscription: Omit<AiSubscription, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiSubscription> {
    const { data, error } = await this.supabase
      .from('ai_subscriptions')
      .insert({ ...subscription, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiBillingError('AI_SUBSCRIPTION_CREATE_ERROR', error.message);
    return data;
  }

  async updateSubscription(id: string, updates: Partial<AiSubscription>, schoolId: string): Promise<AiSubscription> {
    const { data, error } = await this.supabase
      .from('ai_subscriptions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiBillingError('AI_SUBSCRIPTION_UPDATE_ERROR', error.message);
    return data;
  }

  async cancelSubscription(id: string, schoolId: string): Promise<AiSubscription> {
    return this.updateSubscription(id, { status: 'cancelled', cancelledAt: new Date().toISOString() }, schoolId);
  }

  // =========================================================================
  // AI QUOTA ALERTS
  // =========================================================================

  async findQuotaAlertById(id: string, schoolId: string): Promise<AiQuotaAlert | null> {
    const { data, error } = await this.supabase
      .from('ai_quota_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiUsageError('AI_QUOTA_ALERT_NOT_FOUND', `Quota alert not found: ${error.message}`);
    return data;
  }

  async findQuotaAlerts(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiQuotaAlert>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_quota_alerts').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiUsageError('AI_QUOTA_ALERT_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createQuotaAlert(alert: Omit<AiQuotaAlert, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiQuotaAlert> {
    const { data, error } = await this.supabase
      .from('ai_quota_alerts')
      .insert({ ...alert, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiUsageError('AI_QUOTA_ALERT_CREATE_ERROR', error.message);
    return data;
  }

  async updateQuotaAlert(id: string, updates: Partial<AiQuotaAlert>, schoolId: string): Promise<AiQuotaAlert> {
    const { data, error } = await this.supabase
      .from('ai_quota_alerts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiUsageError('AI_QUOTA_ALERT_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteQuotaAlert(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_quota_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiUsageError('AI_QUOTA_ALERT_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI BATCH JOBS
  // =========================================================================

  async findBatchJobById(id: string, schoolId: string): Promise<AiBatchJob | null> {
    const { data, error } = await this.supabase
      .from('ai_batch_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_BATCH_JOB_NOT_FOUND', `Batch job not found: ${error.message}`);
    return data;
  }

  async findBatchJobs(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiBatchJob>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_batch_jobs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_BATCH_JOB_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createBatchJob(job: Omit<AiBatchJob, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiBatchJob> {
    const { data, error } = await this.supabase
      .from('ai_batch_jobs')
      .insert({ ...job, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_BATCH_JOB_CREATE_ERROR', error.message);
    return data;
  }

  async updateBatchJob(id: string, updates: Partial<AiBatchJob>, schoolId: string): Promise<AiBatchJob> {
    const { data, error } = await this.supabase
      .from('ai_batch_jobs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_BATCH_JOB_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteBatchJob(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_batch_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiAgentError('AI_BATCH_JOB_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI CACHE INVALIDATIONS
  // =========================================================================

  async findCacheInvalidationById(id: string, schoolId: string): Promise<AiCacheInvalidation | null> {
    const { data, error } = await this.supabase
      .from('ai_cache_invalidations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiCacheError('AI_CACHE_INVALIDATION_NOT_FOUND', `Cache invalidation not found: ${error.message}`);
    return data;
  }

  async findCacheInvalidations(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiCacheInvalidation>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_cache_invalidations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiCacheError('AI_CACHE_INVALIDATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createCacheInvalidation(invalidation: Omit<AiCacheInvalidation, 'id' | 'createdAt'>, schoolId: string): Promise<AiCacheInvalidation> {
    const { data, error } = await this.supabase
      .from('ai_cache_invalidations')
      .insert({ ...invalidation, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiCacheError('AI_CACHE_INVALIDATION_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI LOAD BALANCERS
  // =========================================================================

  async findLoadBalancerById(id: string, schoolId: string): Promise<AiLoadBalancer | null> {
    const { data, error } = await this.supabase
      .from('ai_load_balancers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_LOAD_BALANCER_NOT_FOUND', `Load balancer not found: ${error.message}`);
    return data;
  }

  async findLoadBalancers(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiLoadBalancer>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_load_balancers').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_LOAD_BALANCER_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createLoadBalancer(lb: Omit<AiLoadBalancer, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiLoadBalancer> {
    const { data, error } = await this.supabase
      .from('ai_load_balancers')
      .insert({ ...lb, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_LOAD_BALANCER_CREATE_ERROR', error.message);
    return data;
  }

  async updateLoadBalancer(id: string, updates: Partial<AiLoadBalancer>, schoolId: string): Promise<AiLoadBalancer> {
    const { data, error } = await this.supabase
      .from('ai_load_balancers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_LOAD_BALANCER_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteLoadBalancer(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_load_balancers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_LOAD_BALANCER_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI MODEL ENDPOINTS
  // =========================================================================

  async findModelEndpointById(id: string, schoolId: string): Promise<AiModelEndpoint | null> {
    const { data, error } = await this.supabase
      .from('ai_model_endpoints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_MODEL_ENDPOINT_NOT_FOUND', `Model endpoint not found: ${error.message}`);
    return data;
  }

  async findModelEndpoints(query: PaginationParams & { modelId?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiModelEndpoint>> {
    const { page = 1, limit = 20, offset = 0, modelId, status, schoolId } = query;
    let qb = this.supabase.from('ai_model_endpoints').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (modelId) qb = qb.eq('model_id', modelId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_MODEL_ENDPOINT_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelEndpoint(endpoint: Omit<AiModelEndpoint, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiModelEndpoint> {
    const { data, error } = await this.supabase
      .from('ai_model_endpoints')
      .insert({ ...endpoint, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_ENDPOINT_CREATE_ERROR', error.message);
    return data;
  }

  async updateModelEndpoint(id: string, updates: Partial<AiModelEndpoint>, schoolId: string): Promise<AiModelEndpoint> {
    const { data, error } = await this.supabase
      .from('ai_model_endpoints')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_MODEL_ENDPOINT_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteModelEndpoint(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_model_endpoints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_MODEL_ENDPOINT_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI DOCUMENT PROCESSING
  // =========================================================================

  async findDocumentProcessingById(id: string, schoolId: string): Promise<AiDocumentProcessing | null> {
    const { data, error } = await this.supabase
      .from('ai_document_processing')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_DOCUMENT_PROCESSING_NOT_FOUND', `Document processing not found: ${error.message}`);
    return data;
  }

  async findDocumentProcessings(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiDocumentProcessing>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_document_processing').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_DOCUMENT_PROCESSING_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createDocumentProcessing(doc: Omit<AiDocumentProcessing, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiDocumentProcessing> {
    const { data, error } = await this.supabase
      .from('ai_document_processing')
      .insert({ ...doc, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_DOCUMENT_PROCESSING_CREATE_ERROR', error.message);
    return data;
  }

  async updateDocumentProcessing(id: string, updates: Partial<AiDocumentProcessing>, schoolId: string): Promise<AiDocumentProcessing> {
    const { data, error } = await this.supabase
      .from('ai_document_processing')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_DOCUMENT_PROCESSING_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI VOICE CONFIG
  // =========================================================================

  async findVoiceConfigById(id: string, schoolId: string): Promise<AiVoiceConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_voice_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_VOICE_CONFIG_NOT_FOUND', `Voice config not found: ${error.message}`);
    return data;
  }

  async findVoiceConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiVoiceConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_voice_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_VOICE_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createVoiceConfig(config: Omit<AiVoiceConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiVoiceConfig> {
    const { data, error } = await this.supabase
      .from('ai_voice_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_VOICE_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateVoiceConfig(id: string, updates: Partial<AiVoiceConfig>, schoolId: string): Promise<AiVoiceConfig> {
    const { data, error } = await this.supabase
      .from('ai_voice_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_VOICE_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteVoiceConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_voice_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_VOICE_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI VIDEO PROCESSING
  // =========================================================================

  async findVideoProcessingById(id: string, schoolId: string): Promise<AiVideoProcessing | null> {
    const { data, error } = await this.supabase
      .from('ai_video_processing')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_VIDEO_PROCESSING_NOT_FOUND', `Video processing not found: ${error.message}`);
    return data;
  }

  async findVideoProcessings(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiVideoProcessing>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_video_processing').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_VIDEO_PROCESSING_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createVideoProcessing(video: Omit<AiVideoProcessing, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiVideoProcessing> {
    const { data, error } = await this.supabase
      .from('ai_video_processing')
      .insert({ ...video, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_VIDEO_PROCESSING_CREATE_ERROR', error.message);
    return data;
  }

  async updateVideoProcessing(id: string, updates: Partial<AiVideoProcessing>, schoolId: string): Promise<AiVideoProcessing> {
    const { data, error } = await this.supabase
      .from('ai_video_processing')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_VIDEO_PROCESSING_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI GENERATION CONFIG
  // =========================================================================

  async findGenerationConfigById(id: string, schoolId: string): Promise<AiGenerationConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_generation_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_GENERATION_CONFIG_NOT_FOUND', `Generation config not found: ${error.message}`);
    return data;
  }

  async findGenerationConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiGenerationConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_generation_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_GENERATION_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createGenerationConfig(config: Omit<AiGenerationConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiGenerationConfig> {
    const { data, error } = await this.supabase
      .from('ai_generation_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_GENERATION_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateGenerationConfig(id: string, updates: Partial<AiGenerationConfig>, schoolId: string): Promise<AiGenerationConfig> {
    const { data, error } = await this.supabase
      .from('ai_generation_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_GENERATION_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteGenerationConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_generation_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_GENERATION_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI EVALUATION CRITERIA
  // =========================================================================

  async findEvaluationCriterionById(id: string, schoolId: string): Promise<AiEvaluationCriterion | null> {
    const { data, error } = await this.supabase
      .from('ai_evaluation_criteria')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiEvaluationError('AI_EVALUATION_CRITERION_NOT_FOUND', `Criterion not found: ${error.message}`);
    return data;
  }

  async findEvaluationCriteria(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiEvaluationCriterion>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_evaluation_criteria').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiEvaluationError('AI_EVALUATION_CRITERION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createEvaluationCriterion(criterion: Omit<AiEvaluationCriterion, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiEvaluationCriterion> {
    const { data, error } = await this.supabase
      .from('ai_evaluation_criteria')
      .insert({ ...criterion, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_EVALUATION_CRITERION_CREATE_ERROR', error.message);
    return data;
  }

  async updateEvaluationCriterion(id: string, updates: Partial<AiEvaluationCriterion>, schoolId: string): Promise<AiEvaluationCriterion> {
    const { data, error } = await this.supabase
      .from('ai_evaluation_criteria')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_EVALUATION_CRITERION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteEvaluationCriterion(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_evaluation_criteria')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiEvaluationError('AI_EVALUATION_CRITERION_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI BENCHMARK SUITES
  // =========================================================================

  async findBenchmarkSuiteById(id: string, schoolId: string): Promise<AiBenchmarkSuite | null> {
    const { data, error } = await this.supabase
      .from('ai_benchmark_suites')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_BENCHMARK_SUITE_NOT_FOUND', `Suite not found: ${error.message}`);
    return data;
  }

  async findBenchmarkSuites(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiBenchmarkSuite>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_benchmark_suites').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_BENCHMARK_SUITE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createBenchmarkSuite(suite: Omit<AiBenchmarkSuite, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiBenchmarkSuite> {
    const { data, error } = await this.supabase
      .from('ai_benchmark_suites')
      .insert({ ...suite, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_BENCHMARK_SUITE_CREATE_ERROR', error.message);
    return data;
  }

  async updateBenchmarkSuite(id: string, updates: Partial<AiBenchmarkSuite>, schoolId: string): Promise<AiBenchmarkSuite> {
    const { data, error } = await this.supabase
      .from('ai_benchmark_suites')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_BENCHMARK_SUITE_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteBenchmarkSuite(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_benchmark_suites')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiPerformanceError('AI_BENCHMARK_SUITE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI BENCHMARK RESULTS
  // =========================================================================

  async findBenchmarkResultById(id: string, schoolId: string): Promise<AiBenchmarkResult | null> {
    const { data, error } = await this.supabase
      .from('ai_benchmark_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_BENCHMARK_RESULT_NOT_FOUND', `Result not found: ${error.message}`);
    return data;
  }

  async findBenchmarkResults(query: PaginationParams & { suiteId?: string; modelId?: string; schoolId?: string }): Promise<PaginatedResult<AiBenchmarkResult>> {
    const { page = 1, limit = 20, offset = 0, suiteId, modelId, schoolId } = query;
    let qb = this.supabase.from('ai_benchmark_results').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (suiteId) qb = qb.eq('suite_id', suiteId);
    if (modelId) qb = qb.eq('model_id', modelId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_BENCHMARK_RESULT_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createBenchmarkResult(result: Omit<AiBenchmarkResult, 'id' | 'createdAt'>, schoolId: string): Promise<AiBenchmarkResult> {
    const { data, error } = await this.supabase
      .from('ai_benchmark_results')
      .insert({ ...result, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_BENCHMARK_RESULT_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI OPTIMIZATION RESULTS
  // =========================================================================

  async findOptimizationResultById(id: string, schoolId: string): Promise<AiOptimizationResult | null> {
    const { data, error } = await this.supabase
      .from('ai_optimization_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RESULT_NOT_FOUND', `Result not found: ${error.message}`);
    return data;
  }

  async findOptimizationResults(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiOptimizationResult>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_optimization_results').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RESULT_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createOptimizationResult(result: Omit<AiOptimizationResult, 'id' | 'createdAt'>, schoolId: string): Promise<AiOptimizationResult> {
    const { data, error } = await this.supabase
      .from('ai_optimization_results')
      .insert({ ...result, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RESULT_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI MODEL COMPARISONS
  // =========================================================================

  async findModelComparisonById(id: string, schoolId: string): Promise<AiModelComparison | null> {
    const { data, error } = await this.supabase
      .from('ai_model_comparisons')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiEvaluationError('AI_MODEL_COMPARISON_NOT_FOUND', `Comparison not found: ${error.message}`);
    return data;
  }

  async findModelComparisons(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiModelComparison>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_model_comparisons').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiEvaluationError('AI_MODEL_COMPARISON_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createModelComparison(comparison: Omit<AiModelComparison, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiModelComparison> {
    const { data, error } = await this.supabase
      .from('ai_model_comparisons')
      .insert({ ...comparison, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_MODEL_COMPARISON_CREATE_ERROR', error.message);
    return data;
  }

  async updateModelComparison(id: string, updates: Partial<AiModelComparison>, schoolId: string): Promise<AiModelComparison> {
    const { data, error } = await this.supabase
      .from('ai_model_comparisons')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiEvaluationError('AI_MODEL_COMPARISON_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PROMPT OPTIMIZATIONS
  // =========================================================================

  async findPromptOptimizationById(id: string, schoolId: string): Promise<AiPromptOptimization | null> {
    const { data, error } = await this.supabase
      .from('ai_prompt_optimizations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_OPTIMIZATION_NOT_FOUND', `Optimization not found: ${error.message}`);
    return data;
  }

  async findPromptOptimizations(query: PaginationParams & { templateId?: string; schoolId?: string }): Promise<PaginatedResult<AiPromptOptimization>> {
    const { page = 1, limit = 20, offset = 0, templateId, schoolId } = query;
    let qb = this.supabase.from('ai_prompt_optimizations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (templateId) qb = qb.eq('template_id', templateId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPromptError('AI_PROMPT_OPTIMIZATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPromptOptimization(optimization: Omit<AiPromptOptimization, 'id' | 'createdAt'>, schoolId: string): Promise<AiPromptOptimization> {
    const { data, error } = await this.supabase
      .from('ai_prompt_optimizations')
      .insert({ ...optimization, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPromptError('AI_PROMPT_OPTIMIZATION_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI TOKEN ESTIMATIONS
  // =========================================================================

  async findTokenEstimationById(id: string, schoolId: string): Promise<AiTokenEstimation | null> {
    const { data, error } = await this.supabase
      .from('ai_token_estimations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiUsageError('AI_TOKEN_ESTIMATION_NOT_FOUND', `Estimation not found: ${error.message}`);
    return data;
  }

  async findTokenEstimations(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiTokenEstimation>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_token_estimations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiUsageError('AI_TOKEN_ESTIMATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createTokenEstimation(estimation: Omit<AiTokenEstimation, 'id' | 'createdAt'>, schoolId: string): Promise<AiTokenEstimation> {
    const { data, error } = await this.supabase
      .from('ai_token_estimations')
      .insert({ ...estimation, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiUsageError('AI_TOKEN_ESTIMATION_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI LATENCY BUDGETS
  // =========================================================================

  async findLatencyBudgetById(id: string, schoolId: string): Promise<AiLatencyBudget | null> {
    const { data, error } = await this.supabase
      .from('ai_latency_budgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_LATENCY_BUDGET_NOT_FOUND', `Budget not found: ${error.message}`);
    return data;
  }

  async findLatencyBudgets(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiLatencyBudget>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_latency_budgets').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_LATENCY_BUDGET_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createLatencyBudget(budget: Omit<AiLatencyBudget, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiLatencyBudget> {
    const { data, error } = await this.supabase
      .from('ai_latency_budgets')
      .insert({ ...budget, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_LATENCY_BUDGET_CREATE_ERROR', error.message);
    return data;
  }

  async updateLatencyBudget(id: string, updates: Partial<AiLatencyBudget>, schoolId: string): Promise<AiLatencyBudget> {
    const { data, error } = await this.supabase
      .from('ai_latency_budgets')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_LATENCY_BUDGET_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI THROUGHPUT CONFIGS
  // =========================================================================

  async findThroughputConfigById(id: string, schoolId: string): Promise<AiThroughputConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_throughput_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_THROUGHPUT_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findThroughputConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiThroughputConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_throughput_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_THROUGHPUT_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createThroughputConfig(config: Omit<AiThroughputConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiThroughputConfig> {
    const { data, error } = await this.supabase
      .from('ai_throughput_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_THROUGHPUT_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateThroughputConfig(id: string, updates: Partial<AiThroughputConfig>, schoolId: string): Promise<AiThroughputConfig> {
    const { data, error } = await this.supabase
      .from('ai_throughput_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_THROUGHPUT_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteThroughputConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_throughput_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiPerformanceError('AI_THROUGHPUT_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI CIRCUIT BREAKERS
  // =========================================================================

  async findCircuitBreakerById(id: string, schoolId: string): Promise<AiCircuitBreaker | null> {
    const { data, error } = await this.supabase
      .from('ai_circuit_breakers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_CIRCUIT_BREAKER_NOT_FOUND', `Circuit breaker not found: ${error.message}`);
    return data;
  }

  async findCircuitBreakers(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiCircuitBreaker>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_circuit_breakers').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_CIRCUIT_BREAKER_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createCircuitBreaker(breaker: Omit<AiCircuitBreaker, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiCircuitBreaker> {
    const { data, error } = await this.supabase
      .from('ai_circuit_breakers')
      .insert({ ...breaker, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_CIRCUIT_BREAKER_CREATE_ERROR', error.message);
    return data;
  }

  async updateCircuitBreaker(id: string, updates: Partial<AiCircuitBreaker>, schoolId: string): Promise<AiCircuitBreaker> {
    const { data, error } = await this.supabase
      .from('ai_circuit_breakers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_CIRCUIT_BREAKER_UPDATE_ERROR', error.message);
    return data;
  }

  async tripCircuitBreaker(id: string, schoolId: string): Promise<AiCircuitBreaker> {
    return this.updateCircuitBreaker(id, { status: 'tripped', trippedAt: new Date().toISOString() }, schoolId);
  }

  async resetCircuitBreaker(id: string, schoolId: string): Promise<AiCircuitBreaker> {
    return this.updateCircuitBreaker(id, { status: 'closed', resetAt: new Date().toISOString() }, schoolId);
  }

  // =========================================================================
  // AI LOGGING CONFIGS
  // =========================================================================

  async findLoggingConfigById(id: string, schoolId: string): Promise<AiLoggingConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_logging_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiLoggingError('AI_LOGGING_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findLoggingConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiLoggingConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_logging_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiLoggingError('AI_LOGGING_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createLoggingConfig(config: Omit<AiLoggingConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiLoggingConfig> {
    const { data, error } = await this.supabase
      .from('ai_logging_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiLoggingError('AI_LOGGING_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateLoggingConfig(id: string, updates: Partial<AiLoggingConfig>, schoolId: string): Promise<AiLoggingConfig> {
    const { data, error } = await this.supabase
      .from('ai_logging_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiLoggingError('AI_LOGGING_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteLoggingConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_logging_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiLoggingError('AI_LOGGING_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI TRACING CONFIGS
  // =========================================================================

  async findTracingConfigById(id: string, schoolId: string): Promise<AiTracingConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_tracing_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiMonitoringError('AI_TRACING_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findTracingConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiTracingConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_tracing_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiMonitoringError('AI_TRACING_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createTracingConfig(config: Omit<AiTracingConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiTracingConfig> {
    const { data, error } = await this.supabase
      .from('ai_tracing_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiMonitoringError('AI_TRACING_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateTracingConfig(id: string, updates: Partial<AiTracingConfig>, schoolId: string): Promise<AiTracingConfig> {
    const { data, error } = await this.supabase
      .from('ai_tracing_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiMonitoringError('AI_TRACING_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteTracingConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_tracing_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiMonitoringError('AI_TRACING_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI PROMETHEUS METRICS
  // =========================================================================

  async findPrometheusMetricById(id: string, schoolId: string): Promise<AiPrometheusMetric | null> {
    const { data, error } = await this.supabase
      .from('ai_prometheus_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiMonitoringError('AI_PROMETHEUS_METRIC_NOT_FOUND', `Metric not found: ${error.message}`);
    return data;
  }

  async findPrometheusMetrics(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiPrometheusMetric>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_prometheus_metrics').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiMonitoringError('AI_PROMETHEUS_METRIC_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPrometheusMetric(metric: Omit<AiPrometheusMetric, 'id' | 'createdAt'>, schoolId: string): Promise<AiPrometheusMetric> {
    const { data, error } = await this.supabase
      .from('ai_prometheus_metrics')
      .insert({ ...metric, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiMonitoringError('AI_PROMETHEUS_METRIC_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI GRAFANA DASHBOARDS
  // =========================================================================

  async findGrafanaDashboardById(id: string, schoolId: string): Promise<AiGrafanaDashboard | null> {
    const { data, error } = await this.supabase
      .from('ai_grafana_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiMonitoringError('AI_GRAFANA_DASHBOARD_NOT_FOUND', `Dashboard not found: ${error.message}`);
    return data;
  }

  async findGrafanaDashboards(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiGrafanaDashboard>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_grafana_dashboards').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiMonitoringError('AI_GRAFANA_DASHBOARD_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createGrafanaDashboard(dashboard: Omit<AiGrafanaDashboard, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiGrafanaDashboard> {
    const { data, error } = await this.supabase
      .from('ai_grafana_dashboards')
      .insert({ ...dashboard, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiMonitoringError('AI_GRAFANA_DASHBOARD_CREATE_ERROR', error.message);
    return data;
  }

  async updateGrafanaDashboard(id: string, updates: Partial<AiGrafanaDashboard>, schoolId: string): Promise<AiGrafanaDashboard> {
    const { data, error } = await this.supabase
      .from('ai_grafana_dashboards')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiMonitoringError('AI_GRAFANA_DASHBOARD_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteGrafanaDashboard(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_grafana_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiMonitoringError('AI_GRAFANA_DASHBOARD_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI ALERT RULES
  // =========================================================================

  async findAlertRuleById(id: string, schoolId: string): Promise<AiAlertRule | null> {
    const { data, error } = await this.supabase
      .from('ai_alert_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiMonitoringError('AI_ALERT_RULE_NOT_FOUND', `Alert rule not found: ${error.message}`);
    return data;
  }

  async findAlertRules(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiAlertRule>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_alert_rules').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiMonitoringError('AI_ALERT_RULE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createAlertRule(rule: Omit<AiAlertRule, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiAlertRule> {
    const { data, error } = await this.supabase
      .from('ai_alert_rules')
      .insert({ ...rule, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiMonitoringError('AI_ALERT_RULE_CREATE_ERROR', error.message);
    return data;
  }

  async updateAlertRule(id: string, updates: Partial<AiAlertRule>, schoolId: string): Promise<AiAlertRule> {
    const { data, error } = await this.supabase
      .from('ai_alert_rules')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiMonitoringError('AI_ALERT_RULE_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteAlertRule(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_alert_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiMonitoringError('AI_ALERT_RULE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI OPERATOR CONFIGS
  // =========================================================================

  async findOperatorConfigById(id: string, schoolId: string): Promise<AiOperatorConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_operator_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_OPERATOR_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findOperatorConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiOperatorConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_operator_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_OPERATOR_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createOperatorConfig(config: Omit<AiOperatorConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiOperatorConfig> {
    const { data, error } = await this.supabase
      .from('ai_operator_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_OPERATOR_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateOperatorConfig(id: string, updates: Partial<AiOperatorConfig>, schoolId: string): Promise<AiOperatorConfig> {
    const { data, error } = await this.supabase
      .from('ai_operator_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_OPERATOR_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteOperatorConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_operator_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_OPERATOR_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI PIPELINE STEPS
  // =========================================================================

  async findPipelineStepById(id: string, schoolId: string): Promise<AiPipelineStep | null> {
    const { data, error } = await this.supabase
      .from('ai_pipeline_steps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_PIPELINE_STEP_NOT_FOUND', `Step not found: ${error.message}`);
    return data;
  }

  async findPipelineSteps(query: PaginationParams & { pipelineId?: string; schoolId?: string }): Promise<PaginatedResult<AiPipelineStep>> {
    const { page = 1, limit = 20, offset = 0, pipelineId, schoolId } = query;
    let qb = this.supabase.from('ai_pipeline_steps').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (pipelineId) qb = qb.eq('pipeline_id', pipelineId);
    qb = qb.order('order_index', { ascending: true }).range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_PIPELINE_STEP_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPipelineStep(step: Omit<AiPipelineStep, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPipelineStep> {
    const { data, error } = await this.supabase
      .from('ai_pipeline_steps')
      .insert({ ...step, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_PIPELINE_STEP_CREATE_ERROR', error.message);
    return data;
  }

  async updatePipelineStep(id: string, updates: Partial<AiPipelineStep>, schoolId: string): Promise<AiPipelineStep> {
    const { data, error } = await this.supabase
      .from('ai_pipeline_steps')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_PIPELINE_STEP_UPDATE_ERROR', error.message);
    return data;
  }

  async deletePipelineStep(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_pipeline_steps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiAgentError('AI_PIPELINE_STEP_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI PIPELINES
  // =========================================================================

  async findPipelineById(id: string, schoolId: string): Promise<AiPipeline | null> {
    const { data, error } = await this.supabase
      .from('ai_pipelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_PIPELINE_NOT_FOUND', `Pipeline not found: ${error.message}`);
    return data;
  }

  async findPipelines(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiPipeline>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_pipelines').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_PIPELINE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPipeline(pipeline: Omit<AiPipeline, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPipeline> {
    const { data, error } = await this.supabase
      .from('ai_pipelines')
      .insert({ ...pipeline, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_PIPELINE_CREATE_ERROR', error.message);
    return data;
  }

  async updatePipeline(id: string, updates: Partial<AiPipeline>, schoolId: string): Promise<AiPipeline> {
    const { data, error } = await this.supabase
      .from('ai_pipelines')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_PIPELINE_UPDATE_ERROR', error.message);
    return data;
  }

  async deletePipeline(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_pipelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiAgentError('AI_PIPELINE_DELETE_ERROR', error.message);
  }

  async getPipelineWithSteps(pipelineId: string, schoolId: string): Promise<AiPipeline & { steps: AiPipelineStep[] }> {
    const pipeline = await this.findPipelineById(pipelineId, schoolId);
    if (!pipeline) throw new AiAgentError('AI_PIPELINE_NOT_FOUND', 'Pipeline not found');
    const steps = await this.findPipelineSteps({ pipelineId, schoolId, limit: 1000 });
    return { ...pipeline, steps: steps.data };
  }

  // =========================================================================
  // AI DATA FLOWS
  // =========================================================================

  async findDataFlowById(id: string, schoolId: string): Promise<AiDataFlow | null> {
    const { data, error } = await this.supabase
      .from('ai_data_flows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiAgentError('AI_DATA_FLOW_NOT_FOUND', `Data flow not found: ${error.message}`);
    return data;
  }

  async findDataFlows(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiDataFlow>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_data_flows').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiAgentError('AI_DATA_FLOW_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createDataFlow(flow: Omit<AiDataFlow, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiDataFlow> {
    const { data, error } = await this.supabase
      .from('ai_data_flows')
      .insert({ ...flow, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiAgentError('AI_DATA_FLOW_CREATE_ERROR', error.message);
    return data;
  }

  async updateDataFlow(id: string, updates: Partial<AiDataFlow>, schoolId: string): Promise<AiDataFlow> {
    const { data, error } = await this.supabase
      .from('ai_data_flows')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiAgentError('AI_DATA_FLOW_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteDataFlow(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_data_flows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiAgentError('AI_DATA_FLOW_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI BACKUP CONFIGS
  // =========================================================================

  async findBackupConfigById(id: string, schoolId: string): Promise<AiBackupConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_backup_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_BACKUP_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findBackupConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiBackupConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_backup_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_BACKUP_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createBackupConfig(config: Omit<AiBackupConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiBackupConfig> {
    const { data, error } = await this.supabase
      .from('ai_backup_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_BACKUP_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateBackupConfig(id: string, updates: Partial<AiBackupConfig>, schoolId: string): Promise<AiBackupConfig> {
    const { data, error } = await this.supabase
      .from('ai_backup_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_BACKUP_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteBackupConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_backup_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_BACKUP_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI DISASTER RECOVERY
  // =========================================================================

  async findDisasterRecoveryById(id: string, schoolId: string): Promise<AiDisasterRecovery | null> {
    const { data, error } = await this.supabase
      .from('ai_disaster_recovery')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_DISASTER_RECOVERY_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findDisasterRecoveries(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiDisasterRecovery>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_disaster_recovery').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_DISASTER_RECOVERY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createDisasterRecovery(dr: Omit<AiDisasterRecovery, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiDisasterRecovery> {
    const { data, error } = await this.supabase
      .from('ai_disaster_recovery')
      .insert({ ...dr, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_DISASTER_RECOVERY_CREATE_ERROR', error.message);
    return data;
  }

  async updateDisasterRecovery(id: string, updates: Partial<AiDisasterRecovery>, schoolId: string): Promise<AiDisasterRecovery> {
    const { data, error } = await this.supabase
      .from('ai_disaster_recovery')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_DISASTER_RECOVERY_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteDisasterRecovery(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_disaster_recovery')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_DISASTER_RECOVERY_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI COST ALLOCATIONS
  // =========================================================================

  async findCostAllocationById(id: string, schoolId: string): Promise<AiCostAllocation | null> {
    const { data, error } = await this.supabase
      .from('ai_cost_allocations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiBillingError('AI_COST_ALLOCATION_NOT_FOUND', `Allocation not found: ${error.message}`);
    return data;
  }

  async findCostAllocations(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiCostAllocation>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_cost_allocations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiBillingError('AI_COST_ALLOCATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createCostAllocation(allocation: Omit<AiCostAllocation, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiCostAllocation> {
    const { data, error } = await this.supabase
      .from('ai_cost_allocations')
      .insert({ ...allocation, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiBillingError('AI_COST_ALLOCATION_CREATE_ERROR', error.message);
    return data;
  }

  async updateCostAllocation(id: string, updates: Partial<AiCostAllocation>, schoolId: string): Promise<AiCostAllocation> {
    const { data, error } = await this.supabase
      .from('ai_cost_allocations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiBillingError('AI_COST_ALLOCATION_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI FEATURE USAGE
  // =========================================================================

  async findFeatureUsageById(id: string, schoolId: string): Promise<AiFeatureUsage | null> {
    const { data, error } = await this.supabase
      .from('ai_feature_usage')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiUsageError('AI_FEATURE_USAGE_NOT_FOUND', `Usage not found: ${error.message}`);
    return data;
  }

  async findFeatureUsages(query: PaginationParams & { feature?: string; schoolId?: string }): Promise<PaginatedResult<AiFeatureUsage>> {
    const { page = 1, limit = 20, offset = 0, feature, schoolId } = query;
    let qb = this.supabase.from('ai_feature_usage').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (feature) qb = qb.eq('feature', feature);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiUsageError('AI_FEATURE_USAGE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createFeatureUsage(usage: Omit<AiFeatureUsage, 'id' | 'createdAt'>, schoolId: string): Promise<AiFeatureUsage> {
    const { data, error } = await this.supabase
      .from('ai_feature_usage')
      .insert({ ...usage, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiUsageError('AI_FEATURE_USAGE_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PERFORMANCE BASELINES
  // =========================================================================

  async findPerformanceBaselineById(id: string, schoolId: string): Promise<AiPerformanceBaseline | null> {
    const { data, error } = await this.supabase
      .from('ai_performance_baselines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BASELINE_NOT_FOUND', `Baseline not found: ${error.message}`);
    return data;
  }

  async findPerformanceBaselines(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiPerformanceBaseline>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_performance_baselines').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BASELINE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPerformanceBaseline(baseline: Omit<AiPerformanceBaseline, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPerformanceBaseline> {
    const { data, error } = await this.supabase
      .from('ai_performance_baselines')
      .insert({ ...baseline, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BASELINE_CREATE_ERROR', error.message);
    return data;
  }

  async updatePerformanceBaseline(id: string, updates: Partial<AiPerformanceBaseline>, schoolId: string): Promise<AiPerformanceBaseline> {
    const { data, error } = await this.supabase
      .from('ai_performance_baselines')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BASELINE_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI SLA CONFIGS
  // =========================================================================

  async findSlaConfigById(id: string, schoolId: string): Promise<AiSlaConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_sla_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_SLA_CONFIG_NOT_FOUND', `SLA config not found: ${error.message}`);
    return data;
  }

  async findSlaConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiSlaConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_sla_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_SLA_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createSlaConfig(config: Omit<AiSlaConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiSlaConfig> {
    const { data, error } = await this.supabase
      .from('ai_sla_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_SLA_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateSlaConfig(id: string, updates: Partial<AiSlaConfig>, schoolId: string): Promise<AiSlaConfig> {
    const { data, error } = await this.supabase
      .from('ai_sla_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_SLA_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteSlaConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_sla_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiPerformanceError('AI_SLA_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI SLA VIOLATIONS
  // =========================================================================

  async findSlaViolationById(id: string, schoolId: string): Promise<AiSlaViolation | null> {
    const { data, error } = await this.supabase
      .from('ai_sla_violations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_SLA_VIOLATION_NOT_FOUND', `Violation not found: ${error.message}`);
    return data;
  }

  async findSlaViolations(query: PaginationParams & { configId?: string; schoolId?: string }): Promise<PaginatedResult<AiSlaViolation>> {
    const { page = 1, limit = 20, offset = 0, configId, schoolId } = query;
    let qb = this.supabase.from('ai_sla_violations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (configId) qb = qb.eq('config_id', configId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_SLA_VIOLATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createSlaViolation(violation: Omit<AiSlaViolation, 'id' | 'createdAt'>, schoolId: string): Promise<AiSlaViolation> {
    const { data, error } = await this.supabase
      .from('ai_sla_violations')
      .insert({ ...violation, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_SLA_VIOLATION_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI COMPLIANCE CHECKS
  // =========================================================================

  async findComplianceCheckById(id: string, schoolId: string): Promise<AiComplianceCheck | null> {
    const { data, error } = await this.supabase
      .from('ai_compliance_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSecurityError('AI_COMPLIANCE_CHECK_NOT_FOUND', `Check not found: ${error.message}`);
    return data;
  }

  async findComplianceChecks(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiComplianceCheck>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_compliance_checks').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSecurityError('AI_COMPLIANCE_CHECK_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createComplianceCheck(check: Omit<AiComplianceCheck, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiComplianceCheck> {
    const { data, error } = await this.supabase
      .from('ai_compliance_checks')
      .insert({ ...check, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_COMPLIANCE_CHECK_CREATE_ERROR', error.message);
    return data;
  }

  async updateComplianceCheck(id: string, updates: Partial<AiComplianceCheck>, schoolId: string): Promise<AiComplianceCheck> {
    const { data, error } = await this.supabase
      .from('ai_compliance_checks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_COMPLIANCE_CHECK_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PRIVACY CONFIGS
  // =========================================================================

  async findPrivacyConfigById(id: string, schoolId: string): Promise<AiPrivacyConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_privacy_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSecurityError('AI_PRIVACY_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findPrivacyConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiPrivacyConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_privacy_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSecurityError('AI_PRIVACY_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPrivacyConfig(config: Omit<AiPrivacyConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPrivacyConfig> {
    const { data, error } = await this.supabase
      .from('ai_privacy_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_PRIVACY_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updatePrivacyConfig(id: string, updates: Partial<AiPrivacyConfig>, schoolId: string): Promise<AiPrivacyConfig> {
    const { data, error } = await this.supabase
      .from('ai_privacy_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_PRIVACY_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deletePrivacyConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_privacy_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiSecurityError('AI_PRIVACY_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI DATA GOVERNANCE
  // =========================================================================

  async findDataGovernanceById(id: string, schoolId: string): Promise<AiDataGovernance | null> {
    const { data, error } = await this.supabase
      .from('ai_data_governance')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSecurityError('AI_DATA_GOVERNANCE_NOT_FOUND', `Governance not found: ${error.message}`);
    return data;
  }

  async findDataGovernance(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiDataGovernance>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_data_governance').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSecurityError('AI_DATA_GOVERNANCE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createDataGovernance(governance: Omit<AiDataGovernance, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiDataGovernance> {
    const { data, error } = await this.supabase
      .from('ai_data_governance')
      .insert({ ...governance, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_DATA_GOVERNANCE_CREATE_ERROR', error.message);
    return data;
  }

  async updateDataGovernance(id: string, updates: Partial<AiDataGovernance>, schoolId: string): Promise<AiDataGovernance> {
    const { data, error } = await this.supabase
      .from('ai_data_governance')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_DATA_GOVERNANCE_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI SAFETY FILTERS
  // =========================================================================

  async findSafetyFilterById(id: string, schoolId: string): Promise<AiSafetyFilter | null> {
    const { data, error } = await this.supabase
      .from('ai_safety_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSafetyError('AI_SAFETY_FILTER_NOT_FOUND', `Filter not found: ${error.message}`);
    return data;
  }

  async findSafetyFilters(query: PaginationParams & { type?: string; schoolId?: string }): Promise<PaginatedResult<AiSafetyFilter>> {
    const { page = 1, limit = 20, offset = 0, type, schoolId } = query;
    let qb = this.supabase.from('ai_safety_filters').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (type) qb = qb.eq('type', type);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSafetyError('AI_SAFETY_FILTER_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createSafetyFilter(filter: Omit<AiSafetyFilter, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiSafetyFilter> {
    const { data, error } = await this.supabase
      .from('ai_safety_filters')
      .insert({ ...filter, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSafetyError('AI_SAFETY_FILTER_CREATE_ERROR', error.message);
    return data;
  }

  async updateSafetyFilter(id: string, updates: Partial<AiSafetyFilter>, schoolId: string): Promise<AiSafetyFilter> {
    const { data, error } = await this.supabase
      .from('ai_safety_filters')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSafetyError('AI_SAFETY_FILTER_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteSafetyFilter(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_safety_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiSafetyError('AI_SAFETY_FILTER_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI AUTO SCALING
  // =========================================================================

  async findAutoScalingById(id: string, schoolId: string): Promise<AiAutoScaling | null> {
    const { data, error } = await this.supabase
      .from('ai_auto_scaling')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_AUTO_SCALING_NOT_FOUND', `Auto scaling not found: ${error.message}`);
    return data;
  }

  async findAutoScalings(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiAutoScaling>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_auto_scaling').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_AUTO_SCALING_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createAutoScaling(scaling: Omit<AiAutoScaling, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiAutoScaling> {
    const { data, error } = await this.supabase
      .from('ai_auto_scaling')
      .insert({ ...scaling, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_AUTO_SCALING_CREATE_ERROR', error.message);
    return data;
  }

  async updateAutoScaling(id: string, updates: Partial<AiAutoScaling>, schoolId: string): Promise<AiAutoScaling> {
    const { data, error } = await this.supabase
      .from('ai_auto_scaling')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_AUTO_SCALING_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteAutoScaling(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_auto_scaling')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_AUTO_SCALING_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI OPTIMIZATION SUGGESTIONS
  // =========================================================================

  async findOptimizationSuggestionById(id: string, schoolId: string): Promise<AiOptimizationSuggestion | null> {
    const { data, error } = await this.supabase
      .from('ai_optimization_suggestions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_SUGGESTION_NOT_FOUND', `Suggestion not found: ${error.message}`);
    return data;
  }

  async findOptimizationSuggestions(query: PaginationParams & { type?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiOptimizationSuggestion>> {
    const { page = 1, limit = 20, offset = 0, type, status, schoolId } = query;
    let qb = this.supabase.from('ai_optimization_suggestions').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (type) qb = qb.eq('type', type);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_SUGGESTION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createOptimizationSuggestion(suggestion: Omit<AiOptimizationSuggestion, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiOptimizationSuggestion> {
    const { data, error } = await this.supabase
      .from('ai_optimization_suggestions')
      .insert({ ...suggestion, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_SUGGESTION_CREATE_ERROR', error.message);
    return data;
  }

  async updateOptimizationSuggestion(id: string, updates: Partial<AiOptimizationSuggestion>, schoolId: string): Promise<AiOptimizationSuggestion> {
    const { data, error } = await this.supabase
      .from('ai_optimization_suggestions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_SUGGESTION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteOptimizationSuggestion(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_optimization_suggestions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_SUGGESTION_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI TRAINING DATASETS
  // =========================================================================

  async findTrainingDatasetById(id: string, schoolId: string): Promise<AiTrainingDataset | null> {
    const { data, error } = await this.supabase
      .from('ai_training_datasets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiTrainingError('AI_TRAINING_DATASET_NOT_FOUND', `Dataset not found: ${error.message}`);
    return data;
  }

  async findTrainingDatasets(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiTrainingDataset>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_training_datasets').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiTrainingError('AI_TRAINING_DATASET_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createTrainingDataset(dataset: Omit<AiTrainingDataset, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiTrainingDataset> {
    const { data, error } = await this.supabase
      .from('ai_training_datasets')
      .insert({ ...dataset, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiTrainingError('AI_TRAINING_DATASET_CREATE_ERROR', error.message);
    return data;
  }

  async updateTrainingDataset(id: string, updates: Partial<AiTrainingDataset>, schoolId: string): Promise<AiTrainingDataset> {
    const { data, error } = await this.supabase
      .from('ai_training_datasets')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiTrainingError('AI_TRAINING_DATASET_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteTrainingDataset(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_training_datasets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiTrainingError('AI_TRAINING_DATASET_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI TRAINING JOBS
  // =========================================================================

  async findTrainingJobById(id: string, schoolId: string): Promise<AiTrainingJob | null> {
    const { data, error } = await this.supabase
      .from('ai_training_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiTrainingError('AI_TRAINING_JOB_NOT_FOUND', `Job not found: ${error.message}`);
    return data;
  }

  async findTrainingJobs(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiTrainingJob>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_training_jobs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiTrainingError('AI_TRAINING_JOB_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createTrainingJob(job: Omit<AiTrainingJob, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiTrainingJob> {
    const { data, error } = await this.supabase
      .from('ai_training_jobs')
      .insert({ ...job, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiTrainingError('AI_TRAINING_JOB_CREATE_ERROR', error.message);
    return data;
  }

  async updateTrainingJob(id: string, updates: Partial<AiTrainingJob>, schoolId: string): Promise<AiTrainingJob> {
    const { data, error } = await this.supabase
      .from('ai_training_jobs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiTrainingError('AI_TRAINING_JOB_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteTrainingJob(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_training_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiTrainingError('AI_TRAINING_JOB_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI CUSTOM MODELS
  // =========================================================================

  async findCustomModelById(id: string, schoolId: string): Promise<AiCustomModel | null> {
    const { data, error } = await this.supabase
      .from('ai_custom_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiModelError('AI_CUSTOM_MODEL_NOT_FOUND', `Custom model not found: ${error.message}`);
    return data;
  }

  async findCustomModels(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiCustomModel>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_custom_models').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiModelError('AI_CUSTOM_MODEL_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createCustomModel(model: Omit<AiCustomModel, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiCustomModel> {
    const { data, error } = await this.supabase
      .from('ai_custom_models')
      .insert({ ...model, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiModelError('AI_CUSTOM_MODEL_CREATE_ERROR', error.message);
    return data;
  }

  async updateCustomModel(id: string, updates: Partial<AiCustomModel>, schoolId: string): Promise<AiCustomModel> {
    const { data, error } = await this.supabase
      .from('ai_custom_models')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiModelError('AI_CUSTOM_MODEL_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteCustomModel(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_custom_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiModelError('AI_CUSTOM_MODEL_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI LANGUAGE SUPPORT
  // =========================================================================

  async findLanguageSupportById(id: string, schoolId: string): Promise<AiLanguageSupport | null> {
    const { data, error } = await this.supabase
      .from('ai_language_support')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_LANGUAGE_SUPPORT_NOT_FOUND', `Support not found: ${error.message}`);
    return data;
  }

  async findLanguageSupports(query: PaginationParams & { language?: string; schoolId?: string }): Promise<PaginatedResult<AiLanguageSupport>> {
    const { page = 1, limit = 20, offset = 0, language, schoolId } = query;
    let qb = this.supabase.from('ai_language_support').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (language) qb = qb.eq('language', language);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_LANGUAGE_SUPPORT_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createLanguageSupport(support: Omit<AiLanguageSupport, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiLanguageSupport> {
    const { data, error } = await this.supabase
      .from('ai_language_support')
      .insert({ ...support, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_LANGUAGE_SUPPORT_CREATE_ERROR', error.message);
    return data;
  }

  async updateLanguageSupport(id: string, updates: Partial<AiLanguageSupport>, schoolId: string): Promise<AiLanguageSupport> {
    const { data, error } = await this.supabase
      .from('ai_language_support')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_LANGUAGE_SUPPORT_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteLanguageSupport(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_language_support')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_LANGUAGE_SUPPORT_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI TRANSLATION CONFIGS
  // =========================================================================

  async findTranslationConfigById(id: string, schoolId: string): Promise<AiTranslationConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_translation_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_TRANSLATION_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findTranslationConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiTranslationConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_translation_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_TRANSLATION_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createTranslationConfig(config: Omit<AiTranslationConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiTranslationConfig> {
    const { data, error } = await this.supabase
      .from('ai_translation_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_TRANSLATION_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateTranslationConfig(id: string, updates: Partial<AiTranslationConfig>, schoolId: string): Promise<AiTranslationConfig> {
    const { data, error } = await this.supabase
      .from('ai_translation_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_TRANSLATION_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteTranslationConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_translation_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_TRANSLATION_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI NOTIFICATION CONFIGS
  // =========================================================================

  async findNotificationConfigById(id: string, schoolId: string): Promise<AiNotificationConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_notification_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiConfigError('AI_NOTIFICATION_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findNotificationConfigs(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiNotificationConfig>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_notification_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiConfigError('AI_NOTIFICATION_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createNotificationConfig(config: Omit<AiNotificationConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiNotificationConfig> {
    const { data, error } = await this.supabase
      .from('ai_notification_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiConfigError('AI_NOTIFICATION_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateNotificationConfig(id: string, updates: Partial<AiNotificationConfig>, schoolId: string): Promise<AiNotificationConfig> {
    const { data, error } = await this.supabase
      .from('ai_notification_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiConfigError('AI_NOTIFICATION_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteNotificationConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_notification_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiConfigError('AI_NOTIFICATION_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI WEBHOOKS
  // =========================================================================

  async findWebhookById(id: string, schoolId: string): Promise<AiWebhook | null> {
    const { data, error } = await this.supabase
      .from('ai_webhooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiIntegrationError('AI_WEBHOOK_NOT_FOUND', `Webhook not found: ${error.message}`);
    return data;
  }

  async findWebhooks(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiWebhook>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_webhooks').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiIntegrationError('AI_WEBHOOK_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createWebhook(webhook: Omit<AiWebhook, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiWebhook> {
    const { data, error } = await this.supabase
      .from('ai_webhooks')
      .insert({ ...webhook, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiIntegrationError('AI_WEBHOOK_CREATE_ERROR', error.message);
    return data;
  }

  async updateWebhook(id: string, updates: Partial<AiWebhook>, schoolId: string): Promise<AiWebhook> {
    const { data, error } = await this.supabase
      .from('ai_webhooks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiIntegrationError('AI_WEBHOOK_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteWebhook(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_webhooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiIntegrationError('AI_WEBHOOK_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI INTEGRATIONS
  // =========================================================================

  async findIntegrationById(id: string, schoolId: string): Promise<AiIntegration | null> {
    const { data, error } = await this.supabase
      .from('ai_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiIntegrationError('AI_INTEGRATION_NOT_FOUND', `Integration not found: ${error.message}`);
    return data;
  }

  async findIntegrations(query: PaginationParams & { type?: string; status?: string; schoolId?: string }): Promise<PaginatedResult<AiIntegration>> {
    const { page = 1, limit = 20, offset = 0, type, status, schoolId } = query;
    let qb = this.supabase.from('ai_integrations').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (type) qb = qb.eq('type', type);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiIntegrationError('AI_INTEGRATION_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createIntegration(integration: Omit<AiIntegration, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiIntegration> {
    const { data, error } = await this.supabase
      .from('ai_integrations')
      .insert({ ...integration, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiIntegrationError('AI_INTEGRATION_CREATE_ERROR', error.message);
    return data;
  }

  async updateIntegration(id: string, updates: Partial<AiIntegration>, schoolId: string): Promise<AiIntegration> {
    const { data, error } = await this.supabase
      .from('ai_integrations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiIntegrationError('AI_INTEGRATION_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteIntegration(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiIntegrationError('AI_INTEGRATION_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI PLUGINS
  // =========================================================================

  async findPluginById(id: string, schoolId: string): Promise<AiPlugin | null> {
    const { data, error } = await this.supabase
      .from('ai_plugins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiIntegrationError('AI_PLUGIN_NOT_FOUND', `Plugin not found: ${error.message}`);
    return data;
  }

  async findPlugins(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiPlugin>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_plugins').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiIntegrationError('AI_PLUGIN_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPlugin(plugin: Omit<AiPlugin, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPlugin> {
    const { data, error } = await this.supabase
      .from('ai_plugins')
      .insert({ ...plugin, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiIntegrationError('AI_PLUGIN_CREATE_ERROR', error.message);
    return data;
  }

  async updatePlugin(id: string, updates: Partial<AiPlugin>, schoolId: string): Promise<AiPlugin> {
    const { data, error } = await this.supabase
      .from('ai_plugins')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiIntegrationError('AI_PLUGIN_UPDATE_ERROR', error.message);
    return data;
  }

  async deletePlugin(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_plugins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiIntegrationError('AI_PLUGIN_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI DEPLOYMENT CONFIGS
  // =========================================================================

  async findDeploymentConfigById(id: string, schoolId: string): Promise<AiDeploymentConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_deployment_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiDeploymentError('AI_DEPLOYMENT_CONFIG_NOT_FOUND', `Config not found: ${error.message}`);
    return data;
  }

  async findDeploymentConfigs(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiDeploymentConfig>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_deployment_configs').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiDeploymentError('AI_DEPLOYMENT_CONFIG_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createDeploymentConfig(config: Omit<AiDeploymentConfig, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiDeploymentConfig> {
    const { data, error } = await this.supabase
      .from('ai_deployment_configs')
      .insert({ ...config, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiDeploymentError('AI_DEPLOYMENT_CONFIG_CREATE_ERROR', error.message);
    return data;
  }

  async updateDeploymentConfig(id: string, updates: Partial<AiDeploymentConfig>, schoolId: string): Promise<AiDeploymentConfig> {
    const { data, error } = await this.supabase
      .from('ai_deployment_configs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiDeploymentError('AI_DEPLOYMENT_CONFIG_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteDeploymentConfig(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_deployment_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiDeploymentError('AI_DEPLOYMENT_CONFIG_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI LOG ENTRIES
  // =========================================================================

  async findLogEntryById(id: string, schoolId: string): Promise<AiLogEntry | null> {
    const { data, error } = await this.supabase
      .from('ai_log_entries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiLoggingError('AI_LOG_ENTRY_NOT_FOUND', `Log entry not found: ${error.message}`);
    return data;
  }

  async findLogEntries(query: PaginationParams & { level?: string; schoolId?: string; startDate?: string; endDate?: string }): Promise<PaginatedResult<AiLogEntry>> {
    const { page = 1, limit = 20, offset = 0, level, schoolId, startDate, endDate } = query;
    let qb = this.supabase.from('ai_log_entries').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (level) qb = qb.eq('level', level);
    if (startDate) qb = qb.gte('created_at', startDate);
    if (endDate) qb = qb.lte('created_at', endDate);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiLoggingError('AI_LOG_ENTRY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createLogEntry(entry: Omit<AiLogEntry, 'id' | 'createdAt'>, schoolId: string): Promise<AiLogEntry> {
    const { data, error } = await this.supabase
      .from('ai_log_entries')
      .insert({ ...entry, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiLoggingError('AI_LOG_ENTRY_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI PERFORMANCE BENCHMARKS
  // =========================================================================

  async findPerformanceBenchmarkById(id: string, schoolId: string): Promise<AiPerformanceBenchmark | null> {
    const { data, error } = await this.supabase
      .from('ai_performance_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BENCHMARK_NOT_FOUND', `Benchmark not found: ${error.message}`);
    return data;
  }

  async findPerformanceBenchmarks(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiPerformanceBenchmark>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_performance_benchmarks').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BENCHMARK_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createPerformanceBenchmark(benchmark: Omit<AiPerformanceBenchmark, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiPerformanceBenchmark> {
    const { data, error } = await this.supabase
      .from('ai_performance_benchmarks')
      .insert({ ...benchmark, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BENCHMARK_CREATE_ERROR', error.message);
    return data;
  }

  async updatePerformanceBenchmark(id: string, updates: Partial<AiPerformanceBenchmark>, schoolId: string): Promise<AiPerformanceBenchmark> {
    const { data, error } = await this.supabase
      .from('ai_performance_benchmarks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_PERFORMANCE_BENCHMARK_UPDATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI COST FORECASTS
  // =========================================================================

  async findCostForecastById(id: string, schoolId: string): Promise<AiCostForecast | null> {
    const { data, error } = await this.supabase
      .from('ai_cost_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiBillingError('AI_COST_FORECAST_NOT_FOUND', `Forecast not found: ${error.message}`);
    return data;
  }

  async findCostForecasts(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiCostForecast>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_cost_forecasts').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiBillingError('AI_COST_FORECAST_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createCostForecast(forecast: Omit<AiCostForecast, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiCostForecast> {
    const { data, error } = await this.supabase
      .from('ai_cost_forecasts')
      .insert({ ...forecast, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiBillingError('AI_COST_FORECAST_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI OPTIMIZATION RULES
  // =========================================================================

  async findOptimizationRuleById(id: string, schoolId: string): Promise<AiOptimizationRule | null> {
    const { data, error } = await this.supabase
      .from('ai_optimization_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RULE_NOT_FOUND', `Rule not found: ${error.message}`);
    return data;
  }

  async findOptimizationRules(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiOptimizationRule>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_optimization_rules').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RULE_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createOptimizationRule(rule: Omit<AiOptimizationRule, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiOptimizationRule> {
    const { data, error } = await this.supabase
      .from('ai_optimization_rules')
      .insert({ ...rule, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RULE_CREATE_ERROR', error.message);
    return data;
  }

  async updateOptimizationRule(id: string, updates: Partial<AiOptimizationRule>, schoolId: string): Promise<AiOptimizationRule> {
    const { data, error } = await this.supabase
      .from('ai_optimization_rules')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RULE_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteOptimizationRule(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_optimization_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiOptimizationError('AI_OPTIMIZATION_RULE_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI QUALITY METRICS
  // =========================================================================

  async findQualityMetricById(id: string, schoolId: string): Promise<AiQualityMetric | null> {
    const { data, error } = await this.supabase
      .from('ai_quality_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiPerformanceError('AI_QUALITY_METRIC_NOT_FOUND', `Metric not found: ${error.message}`);
    return data;
  }

  async findQualityMetrics(query: PaginationParams & { metricType?: string; schoolId?: string }): Promise<PaginatedResult<AiQualityMetric>> {
    const { page = 1, limit = 20, offset = 0, metricType, schoolId } = query;
    let qb = this.supabase.from('ai_quality_metrics').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (metricType) qb = qb.eq('metric_type', metricType);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiPerformanceError('AI_QUALITY_METRIC_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createQualityMetric(metric: Omit<AiQualityMetric, 'id' | 'createdAt'>, schoolId: string): Promise<AiQualityMetric> {
    const { data, error } = await this.supabase
      .from('ai_quality_metrics')
      .insert({ ...metric, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiPerformanceError('AI_QUALITY_METRIC_CREATE_ERROR', error.message);
    return data;
  }

  // =========================================================================
  // AI SECURITY POLICIES
  // =========================================================================

  async findSecurityPolicyById(id: string, schoolId: string): Promise<AiSecurityPolicy | null> {
    const { data, error } = await this.supabase
      .from('ai_security_policies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSecurityError('AI_SECURITY_POLICY_NOT_FOUND', `Policy not found: ${error.message}`);
    return data;
  }

  async findSecurityPolicies(query: PaginationParams & { schoolId?: string }): Promise<PaginatedResult<AiSecurityPolicy>> {
    const { page = 1, limit = 20, offset = 0, schoolId } = query;
    let qb = this.supabase.from('ai_security_policies').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSecurityError('AI_SECURITY_POLICY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createSecurityPolicy(policy: Omit<AiSecurityPolicy, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiSecurityPolicy> {
    const { data, error } = await this.supabase
      .from('ai_security_policies')
      .insert({ ...policy, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_SECURITY_POLICY_CREATE_ERROR', error.message);
    return data;
  }

  async updateSecurityPolicy(id: string, updates: Partial<AiSecurityPolicy>, schoolId: string): Promise<AiSecurityPolicy> {
    const { data, error } = await this.supabase
      .from('ai_security_policies')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_SECURITY_POLICY_UPDATE_ERROR', error.message);
    return data;
  }

  async deleteSecurityPolicy(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_security_policies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiSecurityError('AI_SECURITY_POLICY_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI ACCESS TOKENS
  // =========================================================================

  async findAccessTokenById(id: string, schoolId: string): Promise<AiAccessToken | null> {
    const { data, error } = await this.supabase
      .from('ai_access_tokens')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSecurityError('AI_ACCESS_TOKEN_NOT_FOUND', `Token not found: ${error.message}`);
    return data;
  }

  async findAccessTokens(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiAccessToken>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_access_tokens').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSecurityError('AI_ACCESS_TOKEN_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createAccessToken(token: Omit<AiAccessToken, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiAccessToken> {
    const { data, error } = await this.supabase
      .from('ai_access_tokens')
      .insert({ ...token, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_ACCESS_TOKEN_CREATE_ERROR', error.message);
    return data;
  }

  async updateAccessToken(id: string, updates: Partial<AiAccessToken>, schoolId: string): Promise<AiAccessToken> {
    const { data, error } = await this.supabase
      .from('ai_access_tokens')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_ACCESS_TOKEN_UPDATE_ERROR', error.message);
    return data;
  }

  async revokeAccessToken(id: string, schoolId: string): Promise<AiAccessToken> {
    return this.updateAccessToken(id, { status: 'revoked', revokedAt: new Date().toISOString() }, schoolId);
  }

  async deleteAccessToken(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_access_tokens')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiSecurityError('AI_ACCESS_TOKEN_DELETE_ERROR', error.message);
  }

  // =========================================================================
  // AI API KEYS
  // =========================================================================

  async findApiKeyById(id: string, schoolId: string): Promise<AiApiKey | null> {
    const { data, error } = await this.supabase
      .from('ai_api_keys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new AiSecurityError('AI_API_KEY_NOT_FOUND', `API key not found: ${error.message}`);
    return data;
  }

  async findApiKeys(query: PaginationParams & { status?: string; schoolId?: string }): Promise<PaginatedResult<AiApiKey>> {
    const { page = 1, limit = 20, offset = 0, status, schoolId } = query;
    let qb = this.supabase.from('ai_api_keys').select('*', { count: 'exact' });
    if (schoolId) qb = qb.eq('school_id', schoolId);
    if (status) qb = qb.eq('status', status);
    qb = qb.range(offset, offset + limit - 1);
    const { data, error, count } = await qb;
    if (error) throw new AiSecurityError('AI_API_KEY_FETCH_ERROR', error.message);
    return { data: data ?? [], total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) };
  }

  async createApiKey(key: Omit<AiApiKey, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AiApiKey> {
    const { data, error } = await this.supabase
      .from('ai_api_keys')
      .insert({ ...key, school_id: schoolId })
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_API_KEY_CREATE_ERROR', error.message);
    return data;
  }

  async updateApiKey(id: string, updates: Partial<AiApiKey>, schoolId: string): Promise<AiApiKey> {
    const { data, error } = await this.supabase
      .from('ai_api_keys')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AiSecurityError('AI_API_KEY_UPDATE_ERROR', error.message);
    return data;
  }

  async revokeApiKey(id: string, schoolId: string): Promise<AiApiKey> {
    return this.updateApiKey(id, { status: 'revoked', revokedAt: new Date().toISOString() }, schoolId);
  }

  async deleteApiKey(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_api_keys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AiSecurityError('AI_API_KEY_DELETE_ERROR', error.message);
  }
  // =========================================================================
  // AGGREGATE / UTILITY METHODS
  // =========================================================================

  async getModelWithAllRelations(modelId: string, schoolId: string): Promise<AiModel & {
    configs: AiModelConfig[];
    routes: AiModelRoute[];
    health: AiModelHealth | null;
    benchmarks: AiModelBenchmark[];
    fallbacks: AiFallbackModel[];
    versions: AiModelVersion[];
  }> {
    const model = await this.findModelById(modelId, schoolId);
    if (!model) throw new AiModelError('AI_MODEL_NOT_FOUND', 'Model not found');
    const configs = await this.findModelConfigs({ modelId, schoolId, limit: 1000 });
    const routes = await this.findModelRoutes({ modelId, schoolId, limit: 1000 });
    const health = await this.findModelHealthByModelId(modelId, schoolId);
    const benchmarks = await this.findModelBenchmarks({ modelId, schoolId, limit: 1000 });
    const fallbacks = await this.findFallbackModels({ primaryModelId: modelId, schoolId, limit: 1000 });
    const versions = await this.findModelVersions({ modelId, schoolId, limit: 1000 });
    return {
      ...model,
      configs: configs.data,
      routes: routes.data,
      health,
      benchmarks: benchmarks.data,
      fallbacks: fallbacks.data,
      versions: versions.data,
    };
  }

  async getPromptTemplateWithVersions(templateId: string, schoolId: string): Promise<AiPromptTemplate & {
    versions: AiPromptVersion[];
    latestVersion: AiPromptVersion | null;
  }> {
    const template = await this.findPromptTemplateById(templateId, schoolId);
    if (!template) throw new AiPromptError('AI_PROMPT_TEMPLATE_NOT_FOUND', 'Template not found');
    const versions = await this.findPromptVersions({ templateId, schoolId, limit: 1000 });
    const latestVersion = await this.getLatestPromptVersion(templateId, schoolId);
    return { ...template, versions: versions.data, latestVersion };
  }

  async getSchoolAiOverview(schoolId: string): Promise<{
    totalModels: number;
    activeModels: number;
    totalSessions: number;
    activeSessions: number;
    totalConversations: number;
    totalMessages: number;
    totalEvaluations: number;
    totalCost: number;
    totalTokens: number;
  }> {
    const models = await this.findModels({ schoolId, limit: 1 });
    const sessions = await this.findSessions({ schoolId, limit: 1 });
    const conversations = await this.findConversations({ schoolId, limit: 1 });
    const evaluations = await this.findEvaluations({ schoolId, limit: 1 });
    const costBudgets = await this.findCostBudgets({ schoolId, limit: 100 });
    const totalCost = costBudgets.data.reduce((sum: number, b: Record<string, unknown>) => sum + ((b.currentSpending as number) ?? 0), 0);
    return {
      totalModels: models.total,
      activeModels: models.data.filter((m: Record<string, unknown>) => m.status === 'active').length,
      totalSessions: sessions.total,
      activeSessions: sessions.data.filter((s: Record<string, unknown>) => s.status === 'active').length,
      totalConversations: conversations.total,
      totalMessages: 0,
      totalEvaluations: evaluations.total,
      totalCost,
      totalTokens: 0,
    };
  }

  async getRecentAuditLogs(schoolId: string, limit: number): Promise<AiAuditEntry[]> {
    const { data, error } = await this.supabase
      .from('ai_audit_entries')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw new AiAuditError('AI_AUDIT_ENTRY_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async getModelHealthSummary(schoolId: string): Promise<Array<{
    modelId: string;
    modelName: string;
    status: string;
    lastChecked: string;
  }>> {
    const models = await this.findModels({ schoolId, status: 'active', limit: 1000 });
    const results: Array<{ modelId: string; modelName: string; status: string; lastChecked: string }> = [];
    for (const model of models.data) {
      const health = await this.findModelHealthByModelId(model.id, schoolId);
      results.push({
        modelId: model.id,
        modelName: model.name ?? 'Unknown',
        status: health?.status ?? 'unknown',
        lastChecked: health?.checkedAt ?? 'never',
      });
    }
    return results;
  }

  async findActiveRateLimitConfig(schoolId: string, endpoint: string): Promise<AiRateLimitConfig | null> {
    const { data, error } = await this.supabase
      .from('ai_rate_limit_configs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('endpoint', endpoint)
      .eq('status', 'active')
      .single();
    if (error) throw new AiConfigError('AI_RATE_LIMIT_CONFIG_FETCH_ERROR', error.message);
    return data;
  }

  async findActiveFeatureFlags(schoolId: string): Promise<AiFeatureFlag[]> {
    const { data, error } = await this.supabase
      .from('ai_feature_flags')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .eq('enabled', true);
    if (error) throw new AiConfigError('AI_FEATURE_FLAG_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async getModelUsageByProvider(schoolId: string, startDate: string, endDate: string): Promise<Array<{
    provider: string;
    totalTokens: number;
    totalCost: number;
    requestCount: number;
  }>> {
    const { data, error } = await this.supabase
      .from('ai_model_usage')
      .select('provider, tokens_used, cost')
      .eq('school_id', schoolId)
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    if (error) throw new AiUsageError('AI_MODEL_USAGE_FETCH_ERROR', error.message);
    const usages = (data ?? []) as Record<string, unknown>[];
    const grouped: Record<string, { totalTokens: number; totalCost: number; requestCount: number }> = {};
    for (const u of usages) {
      const provider = (u.provider as string) ?? 'unknown';
      if (!grouped[provider]) grouped[provider] = { totalTokens: 0, totalCost: 0, requestCount: 0 };
      grouped[provider].totalTokens += (u.tokens_used as number) ?? 0;
      grouped[provider].totalCost += (u.cost as number) ?? 0;
      grouped[provider].requestCount += 1;
    }
    return Object.entries(grouped).map(([provider, stats]) => ({ provider, ...stats }));
  }

  async getConversationStats(schoolId: string, startDate: string, endDate: string): Promise<{
    totalConversations: number;
    avgMessagesPerConversation: number;
    totalTokensUsed: number;
    avgResponseTime: number;
  }> {
    const conversations = await this.findConversations({ schoolId, startDate, endDate, limit: 10000 });
    return {
      totalConversations: conversations.total,
      avgMessagesPerConversation: 0,
      totalTokensUsed: 0,
      avgResponseTime: 0,
    };
  }

  async findEnabledSafetyFilters(schoolId: string): Promise<AiSafetyFilter[]> {
    const { data, error } = await this.supabase
      .from('ai_safety_filters')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw new AiSafetyError('AI_SAFETY_FILTER_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async findExpiredCacheEntries(schoolId: string): Promise<AiCacheEntry[]> {
    const { data, error } = await this.supabase
      .from('ai_cache_entries')
      .select('*')
      .eq('school_id', schoolId)
      .lt('expires_at', new Date().toISOString());
    if (error) throw new AiCacheError('AI_CACHE_ENTRY_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async findTrippedCircuitBreakers(schoolId: string): Promise<AiCircuitBreaker[]> {
    const { data, error } = await this.supabase
      .from('ai_circuit_breakers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'tripped');
    if (error) throw new AiModelError('AI_CIRCUIT_BREAKER_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async findPendingBatchJobs(schoolId: string): Promise<AiBatchJob[]> {
    const { data, error } = await this.supabase
      .from('ai_batch_jobs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    if (error) throw new AiAgentError('AI_BATCH_JOB_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async findActivePipelines(schoolId: string): Promise<AiPipeline[]> {
    const { data, error } = await this.supabase
      .from('ai_pipelines')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw new AiAgentError('AI_PIPELINE_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async findUnresolvedAlerts(schoolId: string): Promise<AiAlertRule[]> {
    const { data, error } = await this.supabase
      .from('ai_alert_rules')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'firing');
    if (error) throw new AiMonitoringError('AI_ALERT_RULE_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async findFailedTrainingJobs(schoolId: string): Promise<AiTrainingJob[]> {
    const { data, error } = await this.supabase
      .from('ai_training_jobs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'failed');
    if (error) throw new AiTrainingError('AI_TRAINING_JOB_FETCH_ERROR', error.message);
    return data ?? [];
  }

  async findActiveAutoScaling(schoolId: string): Promise<AiAutoScaling[]> {
    const { data, error } = await this.supabase
      .from('ai_auto_scaling')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw new AiModelError('AI_AUTO_SCALING_FETCH_ERROR', error.message);
    return data ?? [];
  }
}

export const createAiRepository = (supabase: SupabaseClient) => new AiRepository(supabase);
export const aiRepository = new AiRepository(null as unknown as SupabaseClient);
