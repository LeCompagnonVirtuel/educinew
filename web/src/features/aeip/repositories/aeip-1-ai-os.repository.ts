import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './aeip-base.repository';

// ============================================================================
// AEIP-1: AI OS — Artificial Intelligence Operating System
// ~300 entities × 5 CRUD methods = ~1500 methods
// ============================================================================

export interface AIOSModel extends BaseEntity { name: string; version: string; type: 'nlp'|'vision'|'prediction'|'generative'|'hybrid'; status: 'active'|'inactive'|'training'|'deployed'|'archived'; accuracy: number; config: Record<string,unknown>; metadata: Record<string,unknown>; }
export interface AIOSTrainingJob extends BaseEntity { model_id: string; status: 'queued'|'running'|'completed'|'failed'|'cancelled'; dataset_id: string; parameters: Record<string,unknown>; metrics: Record<string,number>; started_at?: string; completed_at?: string; }
export interface AIOSService extends BaseEntity { name: string; endpoint: string; model_id: string; status: 'healthy'|'degraded'|'down'|'maintenance'; request_count: number; error_rate: number; latency_ms: number; config: Record<string,unknown>; }
export interface AIOSPipeline extends BaseEntity { name: string; description: string; steps: Record<string,unknown>[]; status: 'draft'|'active'|'paused'|'completed'|'failed'; trigger_type: 'manual'|'scheduled'|'event'|'webhook'; schedule?: string; last_run_at?: string; next_run_at?: string; }
export interface AIOSEndpoint extends BaseEntity { name: string; url: string; method: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'; service_id: string; rate_limit: number; auth_required: boolean; schema: Record<string,unknown>; }
export interface AIOSDataset extends BaseEntity { name: string; description: string; source: string; format: 'csv'|'json'|'parquet'|'arrow'; size_bytes: number; row_count: number; schema: Record<string,unknown>[]; quality_score: number; status: 'uploading'|'ready'|'processing'|'error'; }
export interface AIOSToken extends BaseEntity { service_id: string; token_hash: string; name: string; scopes: string[]; expires_at?: string; last_used_at?: string; }
export interface AIOSMetric extends BaseEntity { service_id: string; name: string; value: number; unit: string; tags: Record<string,string>; timestamp: string; }
export interface AIOSLog extends BaseEntity { service_id: string; level: 'debug'|'info'|'warn'|'error'|'fatal'; message: string; context: Record<string,unknown>; stack_trace?: string; timestamp: string; }
export interface AIOSAlert extends BaseEntity { service_id: string; type: 'performance'|'error'|'security'|'usage'|'custom'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; resolved_by?: string; }
export interface AIOSConfig extends BaseEntity { key: string; value: unknown; category: string; description?: string; is_secret: boolean; }
export interface AIOSWebhook extends BaseEntity { name: string; url: string; events: string[]; secret: string; active: boolean; last_triggered_at?: string; failure_count: number; }
export interface AIOSIntegration extends BaseEntity { name: string; type: 'api'|'sdk'|'plugin'|'connector'; provider: string; config: Record<string,unknown>; status: 'active'|'inactive'|'error'; last_sync_at?: string; }
export interface AIOSCache extends BaseEntity { key: string; value: unknown; ttl_seconds: number; hits: number; expires_at: string; }
export interface AIOSQueue extends BaseEntity { name: string; description: string; status: 'active'|'paused'|'draining'|'empty'; message_count: number; consumer_count: number; config: Record<string,unknown>; }
export interface AIOSQueueMessage extends BaseEntity { queue_id: string; payload: Record<string,unknown>; status: 'pending'|'processing'|'completed'|'failed'|'dead_letter'; priority: number; attempts: number; max_attempts: number; scheduled_at?: string; processed_at?: string; }
export interface AIOSFunction extends BaseEntity { name: string; runtime: 'node'|'python'|'go'|'rust'; code: string; handler: string; environment: Record<string,string>; memory_mb: number; timeout_seconds: number; status: 'active'|'inactive'|'deploying'|'error'; version: number; }
export interface AIOSDeployment extends BaseEntity { function_id: string; version: number; status: 'pending'|'building'|'deploying'|'active'|'failed'|'rolled_back'; environment: 'development'|'staging'|'production'; commit_hash?: string; deployed_by: string; deployed_at?: string; rolled_back_at?: string; }
export interface AIOSPermission extends BaseEntity { resource: string; action: string; effect: 'allow'|'deny'; conditions?: Record<string,unknown>; }
export interface AIOSRole extends BaseEntity { name: string; description: string; permissions: string[]; is_system: boolean; }
export interface AIOSAuditLog extends BaseEntity { user_id: string; action: string; resource: string; resource_id: string; changes: Record<string,unknown>; ip_address: string; user_agent: string; timestamp: string; }
export interface AIOSNotification extends BaseEntity { user_id: string; type: 'info'|'warning'|'error'|'success'; title: string; message: string; read: boolean; read_at?: string; action_url?: string; metadata: Record<string,unknown>; }
export interface AIOSFeature extends BaseEntity { name: string; description: string; enabled: boolean; rollout_percentage: number; target_audience?: Record<string,unknown>; config: Record<string,unknown>; }
export interface AIOSExperiment extends BaseEntity { name: string; description: string; hypothesis: string; status: 'draft'|'running'|'paused'|'completed'|'cancelled'; variants: Record<string,unknown>[]; target_metric: string; minimum_sample_size: number; confidence_level: number; started_at?: string; ended_at?: string; }
export interface AIOSInsight extends BaseEntity { source: string; type: 'anomaly'|'trend'|'pattern'|'recommendation'|'alert'; title: string; description: string; confidence: number; impact: 'low'|'medium'|'high'|'critical'; data: Record<string,unknown>; acknowledged: boolean; acknowledged_by?: string; acknowledged_at?: string; }
export interface AIOSKnowledgeBase extends BaseEntity { name: string; description: string; type: 'faq'|'documentation'|'training'|'reference'; entry_count: number; last_updated_at: string; }
export interface AIOSKnowledgeEntry extends BaseEntity { knowledge_base_id: string; question: string; answer: string; category: string; tags: string[]; embedding?: number[]; confidence: number; helpful_count: number; unhelpful_count: number; }
export interface AIOSAgent extends BaseEntity { name: string; description: string; type: 'conversational'|'task'|'analytical'|'creative'; model_id: string; system_prompt: string; temperature: number; max_tokens: number; tools: string[]; status: 'active'|'inactive'|'training'|'error'; conversation_count: number; }
export interface AIOSConversation extends BaseEntity { agent_id: string; user_id: string; title: string; status: 'active'|'archived'|'deleted'; message_count: number; last_message_at: string; }
export interface AIOSMessage extends BaseEntity { conversation_id: string; role: 'user'|'assistant'|'system'; content: string; token_count: number; model?: string; latency_ms?: number; metadata: Record<string,unknown>; }
export interface AIOSWorkflow extends BaseEntity { name: string; description: string; definition: Record<string,unknown>; status: 'draft'|'active'|'paused'|'completed'|'failed'; version: number; trigger_type: 'manual'|'scheduled'|'event'|'webhook'; last_run_at?: string; run_count: number; }
export interface AIOSWorkflowRun extends BaseEntity { workflow_id: string; status: 'pending'|'running'|'completed'|'failed'|'cancelled'; input: Record<string,unknown>; output?: Record<string,unknown>; error?: string; started_at: string; completed_at?: string; duration_ms?: number; }
export interface AIOSNode extends BaseEntity { workflow_id: string; type: string; name: string; config: Record<string,unknown>; position: {x:number;y:number}; connections: string[]; }
export interface AIOSNodeRun extends BaseEntity { node_id: string; workflow_run_id: string; status: 'pending'|'running'|'completed'|'failed'|'skipped'; input: Record<string,unknown>; output?: Record<string,unknown>; error?: string; started_at: string; completed_at?: string; duration_ms?: number; }
export interface AIOSConnector extends BaseEntity { name: string; type: 'input'|'output'|'transform'|'filter'|'aggregate'; config: Record<string,unknown>; schema: Record<string,unknown>; status: 'active'|'inactive'|'error'; }
export interface AIOSConnection extends BaseEntity { source_connector_id: string; target_connector_id: string; mapping: Record<string,string>; filter?: Record<string,unknown>; active: boolean; }
export interface AIOSDataFlow extends BaseEntity { name: string; description: string; source: string; destination: string; transformations: Record<string,unknown>[]; schedule?: string; status: 'active'|'paused'|'error'; last_run_at?: string; }
export interface AIOSMonitor extends BaseEntity { name: string; type: 'health'|'performance'|'security'|'usage'|'custom'; query: string; thresholds: Record<string,number>; alert_channels: string[]; enabled: boolean; last_checked_at?: string; status: 'ok'|'warning'|'critical'; }
export interface AIOSIncident extends BaseEntity { monitor_id: string; title: string; description: string; severity: 'low'|'medium'|'high'|'critical'; status: 'open'|'investigating'|'identified'|'monitoring'|'resolved'; assigned_to?: string; resolved_at?: string; resolution?: string; }
export interface AIOSMaintenanceWindow extends BaseEntity { title: string; description: string; start_time: string; end_time: string; affected_services: string[]; status: 'scheduled'|'in_progress'|'completed'|'cancelled'; }
export interface AIOSCapacityPlan extends BaseEntity { resource_type: string; current_usage: number; projected_usage: number; capacity: number; utilization_percent: number; recommendation: string; period: string; }
export interface AIOSCostEntry extends BaseEntity { service: string; resource: string; amount: number; currency: string; period: string; category: string; metadata: Record<string,unknown>; }
export interface AIOSBudget extends BaseEntity { name: string; amount: number; currency: string; period: 'daily'|'weekly'|'monthly'|'yearly'; spent: number; alert_threshold: number; }
export interface AIOSSpellCheck extends BaseEntity { text: string; language: string; corrections: Record<string,unknown>[]; score: number; }
export interface AIOSTranslation extends BaseEntity { source_text: string; source_language: string; target_language: string; translated_text: string; confidence: number; model: string; }
export interface AIOSSentiment extends BaseEntity { text: string; language: string; sentiment: 'positive'|'negative'|'neutral'|'mixed'; score: number; emotions: Record<string,number>; }
export interface AIOSClassification extends BaseEntity { text: string; categories: Record<string,number>; primary_category: string; confidence: number; model: string; }
export interface AIOSExtraction extends BaseEntity { text: string; entity_type: string; entities: Record<string,unknown>[]; confidence: number; model: string; }
export interface AIOSSummarization extends BaseEntity { source_text: string; summary: string; method: 'extractive'|'abstractive'; ratio: number; model: string; }
export interface AIOSGeneration extends BaseEntity { prompt: string; output: string; type: 'text'|'code'|'image'|'audio'|'video'; model: string; parameters: Record<string,unknown>; tokens_used: number; }
export interface AIOSEmbedding extends BaseEntity { text: string; model: string; dimensions: number; vector: number[]; metadata: Record<string,unknown>; }
export interface AIOSVisionResult extends BaseEntity { image_url: string; result: Record<string,unknown>; confidence: number; model: string; processing_time_ms: number; }
export interface AIOSAudioResult extends BaseEntity { audio_url: string; transcription: string; language: string; duration_seconds: number; confidence: number; model: string; }
export interface AIOSSearchResult extends BaseEntity { query: string; results: Record<string,unknown>[]; total_count: number; page: number; page_size: number; took_ms: number; }
export interface AIOSRanking extends BaseEntity { query: string; items: Record<string,unknown>[]; algorithm: string; model: string; }
export interface AIOSRecommendation extends BaseEntity { user_id: string; item_type: string; item_id: string; score: number; reason: string; algorithm: string; generated_at: string; }
export interface AIOSPersonalization extends BaseEntity { user_id: string; preferences: Record<string,unknown>; behavior_profile: Record<string,unknown>; segment: string; last_updated_at: string; }
export interface AIOSABTest extends BaseEntity { name: string; description: string; status: 'draft'|'running'|'paused'|'completed'; variants: Record<string,unknown>[]; traffic_split: Record<string,number>; target_metric: string; started_at?: string; ended_at?: string; results?: Record<string,unknown>; }
export interface AIOSFunnel extends BaseEntity { name: string; steps: Record<string,unknown>[]; conversion_rate: number; drop_off_points: Record<string,unknown>[]; period: string; }
export interface AIOSCohort extends BaseEntity { name: string; definition: Record<string,unknown>; size: number; retention_rate: number; activity_score: number; }
export interface AIOSAttribution extends BaseEntity { source: string; medium: string; campaign: string; conversions: number; revenue: number; cost: number; roi: number; period: string; }
export interface AIOSLifecycle extends BaseEntity { user_id: string; stage: 'acquisition'|'activation'|'retention'|'referral'|'revenue'; score: number; transitions: Record<string,unknown>[]; }
export interface AIOSHealthScore extends BaseEntity { entity_type: string; entity_id: string; score: number; factors: Record<string,number>; trend: 'improving'|'stable'|'declining'; calculated_at: string; }
export interface AIOSPredictiveScore extends BaseEntity { entity_type: string; entity_id: string; prediction_type: string; score: number; confidence: number; features: Record<string,number>; model_version: string; predicted_at: string; }
export interface AIOSAnomalyDetection extends BaseEntity { metric_name: string; value: number; expected_value: number; deviation: number; severity: 'low'|'medium'|'high'|'critical'; detected_at: string; resolved: boolean; resolved_at?: string; }
export interface AIOSForecast extends BaseEntity { metric_name: string; historical_data: Record<string,unknown>[]; predictions: Record<string,unknown>[]; confidence_interval: Record<string,unknown>; model: string; accuracy: number; }
export interface AIOSPattern extends BaseEntity { name: string; description: string; pattern_type: string; frequency: number; confidence: number; examples: Record<string,unknown>[]; detected_at: string; }
export interface AIOSSegment extends BaseEntity { name: string; description: string; criteria: Record<string,unknown>; size: number; growth_rate: number; avg_value: number; }
export interface AIOSAttribute extends BaseEntity { name: string; type: 'string'|'number'|'boolean'|'date'|'json'; category: string; required: boolean; default_value?: unknown; validation?: Record<string,unknown>; }
export interface AIOSMetadataEntry extends BaseEntity { entity_type: string; entity_id: string; key: string; value: unknown; source: string; }
export interface AIOSVersionEntry extends BaseEntity { entity_type: string; entity_id: string; version: number; data: Record<string,unknown>; change_type: 'create'|'update'|'delete'; changed_by: string; }
export interface AIOSLabel extends BaseEntity { name: string; color: string; description?: string; entity_count: number; }
export interface AIOSAnnotation extends BaseEntity { entity_type: string; entity_id: string; label_id: string; user_id: string; note?: string; start_offset?: number; end_offset?: number; }
export interface AIOSDependency extends BaseEntity { source_type: string; source_id: string; target_type: string; target_id: string; relationship: string; weight: number; }
export interface AIOSRelation extends BaseEntity { entity_type_a: string; entity_id_a: string; entity_type_b: string; entity_id_b: string; relationship: string; properties: Record<string,unknown>; }
export interface AIOSGraph extends BaseEntity { name: string; description: string; node_count: number; edge_count: number; density: number; }
export interface AIOSGraphNode extends BaseEntity { graph_id: string; entity_type: string; entity_id: string; properties: Record<string,unknown>; }
export interface AIOSGraphEdge extends BaseEntity { graph_id: string; source_node_id: string; target_node_id: string; relationship: string; weight: number; properties: Record<string,unknown>; }
export interface AIOSCluster extends BaseEntity { name: string; algorithm: string; entity_type: string; entities: string[]; centroid: Record<string,number>; silhouette_score: number; }
export interface AIOSDimension extends BaseEntity { name: string; type: 'numerical'|'categorical'|'temporal'|'text'; statistics: Record<string,unknown>; }
export interface AIOSProjection extends BaseEntity { name: string; method: 'pca'|'tsne'|'umap'|'svd'; input_dimensions: string[]; output_dimensions: number; explained_variance?: number; }
export interface AIOSVisualization extends BaseEntity { name: string; type: 'chart'|'graph'|'map'|'table'|'dashboard'; config: Record<string,unknown>; data_source: string; refresh_interval?: number; }
export interface AIOSDashboard extends BaseEntity { name: string; description: string; layout: Record<string,unknown>; widgets: string[]; is_default: boolean; }
export interface AIOSWidget extends BaseEntity { dashboard_id: string; type: string; title: string; config: Record<string,unknown>; position: {x:number;y:number;w:number;h:number}; refresh_interval?: number; }
export interface AIOSReport extends BaseEntity { name: string; description: string; type: 'scheduled'|'on_demand'|'real_time'; format: 'pdf'|'html'|'csv'|'json'; query: string; schedule?: string; last_generated_at?: string; }
export interface AIOSReportExecution extends BaseEntity { report_id: string; status: 'pending'|'running'|'completed'|'failed'; parameters: Record<string,unknown>; result_url?: string; error?: string; started_at: string; completed_at?: string; duration_ms?: number; }
export interface AIOSArchive extends BaseEntity { entity_type: string; entity_id: string; data: Record<string,unknown>; reason: string; archived_by: string; archived_at: string; }
export interface AIOSRestoreEntry extends BaseEntity { archive_id: string; restored_by: string; restored_at: string; }
export interface AIOSLock extends BaseEntity { entity_type: string; entity_id: string; user_id: string; lock_type: 'read'|'write'|'exclusive'; expires_at: string; }
export interface AIOSRateLimit extends BaseEntity { endpoint: string; limit: number; window_seconds: number; current_count: number; window_start: string; }
export interface AIOSQuota extends BaseEntity { resource: string; limit: number; used: number; period: 'hourly'|'daily'|'monthly'|'yearly'; resets_at: string; }
export interface AIOSUsage extends BaseEntity { user_id: string; resource: string; count: number; tokens: number; cost: number; period: string; }
export interface AIOSSession extends BaseEntity { user_id: string; ip_address: string; user_agent: string; started_at: string; last_active_at: string; ended_at?: string; duration_seconds?: number; }
export interface AIOSUserActivity extends BaseEntity { user_id: string; session_id: string; action: string; resource: string; resource_id?: string; duration_ms?: number; metadata: Record<string,unknown>; timestamp: string; }
export interface AIOSPreference extends BaseEntity { user_id: string; key: string; value: unknown; category: string; }
export interface AIOSTemplate extends BaseEntity { name: string; description: string; type: string; content: Record<string,unknown>; variables: string[]; is_system: boolean; usage_count: number; }
export interface AIOSBookmark extends BaseEntity { user_id: string; entity_type: string; entity_id: string; name: string; note?: string; }
export interface AIOSHistory extends BaseEntity { user_id: string; action: string; entity_type: string; entity_id: string; changes: Record<string,unknown>; timestamp: string; }
export interface AIOSShare extends BaseEntity { entity_type: string; entity_id: string; shared_by: string; shared_with: string; permission: 'view'|'edit'|'admin'; expires_at?: string; }
export interface AIOSComment extends BaseEntity { entity_type: string; entity_id: string; user_id: string; content: string; parent_id?: string; }
export interface AIOSReaction extends BaseEntity { entity_type: string; entity_id: string; user_id: string; type: 'like'|'dislike'|'love'|'laugh'|'wow'|'sad'|'angry'; }
export interface AIOSFeed extends BaseEntity { user_id: string; entity_type: string; entity_id: string; action: string; actor_id: string; metadata: Record<string,unknown>; timestamp: string; }
export interface AIOSNotificationPreference extends BaseEntity { user_id: string; channel: 'email'|'push'|'sms'|'in_app'; event_type: string; enabled: boolean; }
export interface AIOSDigest extends BaseEntity { user_id: string; period: 'daily'|'weekly'|'monthly'; summary: Record<string,unknown>; sent_at: string; }
export interface AIOSMilestone extends BaseEntity { name: string; description: string; target_date: string; progress: number; status: 'pending'|'in_progress'|'completed'|'overdue'; dependencies: string[]; }
export interface AIOSGoal extends BaseEntity { name: string; description: string; type: 'okr'|'kpi'|'custom'; target_value: number; current_value: number; unit: string; period: string; owner_id: string; status: 'on_track'|'at_risk'|'behind'|'completed'; }
export interface AIOSInitiative extends BaseEntity { name: string; description: string; goal_id: string; owner_id: string; status: 'planning'|'active'|'completed'|'cancelled'; progress: number; budget: number; spent: number; start_date: string; end_date: string; }
export interface AIOSResource extends BaseEntity { name: string; type: 'human'|'financial'|'technical'|'physical'; capacity: number; allocated: number; cost_per_unit: number; availability: Record<string,unknown>; }
export interface AIOSAllocation extends BaseEntity { resource_id: string; initiative_id: string; amount: number; start_date: string; end_date: string; status: 'active'|'completed'|'cancelled'; }
export interface AIOSRisk extends BaseEntity { title: string; description: string; category: string; probability: number; impact: number; score: number; status: 'identified'|'analyzing'|'mitigating'|'closed'; owner_id: string; mitigation_plan?: string; }
export interface AIOSSuccessCriteria extends BaseEntity { initiative_id: string; name: string; metric: string; target: number; current: number; unit: string; status: 'not_met'|'at_risk'|'met'; }
export interface AIOSDecision extends BaseEntity { title: string; description: string; context: Record<string,unknown>; options: Record<string,unknown>[]; selected_option?: string; rationale?: string; decided_by: string; decided_at?: string; status: 'pending'|'decided'|'implemented'|'reviewed'; }
export interface AIOSAction extends BaseEntity { decision_id: string; title: string; description: string; assignee_id: string; due_date: string; status: 'pending'|'in_progress'|'completed'|'cancelled'; completed_at?: string; }
export interface AIOSSchedule extends BaseEntity { name: string; description: string; timezone: string; events: Record<string,unknown>[]; recurrence?: Record<string,unknown>; }
export interface AIOSEvent extends BaseEntity { schedule_id: string; title: string; description?: string; start_time: string; end_time: string; all_day: boolean; location?: string; attendees: string[]; reminders: Record<string,unknown>[]; }
export interface AIOSTask extends BaseEntity { title: string; description?: string; assignee_id: string; due_date?: string; priority: 'low'|'medium'|'high'|'urgent'; status: 'todo'|'in_progress'|'review'|'done'|'cancelled'; tags: string[]; parent_id?: string; }
export interface AIOSTaskComment extends BaseEntity { task_id: string; user_id: string; content: string; }
export interface AIOSTaskAttachment extends BaseEntity { task_id: string; file_name: string; file_url: string; file_size: number; mime_type: string; uploaded_by: string; }
export interface AIOSNote extends BaseEntity { title: string; content: string; tags: string[]; is_pinned: boolean; }
export interface AIOSWiki extends BaseEntity { title: string; content: string; slug: string; parent_id?: string; author_id: string; version: number; status: 'draft'|'published'|'archived'; }
export interface AIOSWikiVersion extends BaseEntity { wiki_id: string; version: number; content: string; author_id: string; change_summary: string; }
export interface AIOSForum extends BaseEntity { name: string; description: string; category: string; post_count: number; last_post_at?: string; }
export interface AIOSForumPost extends BaseEntity { forum_id: string; title: string; content: string; author_id: string; reply_count: number; view_count: number; is_pinned: boolean; is_locked: boolean; }
export interface AIOSForumReply extends BaseEntity { post_id: string; content: string; author_id: string; parent_id?: string; }
export interface AIOSPoll extends BaseEntity { question: string; options: Record<string,unknown>[]; author_id: string; expires_at?: string; is_anonymous: boolean; total_votes: number; }
export interface AIOSPollVote extends BaseEntity { poll_id: string; user_id: string; option_index: number; }
export interface AIOSSurvey extends BaseEntity { title: string; description: string; questions: Record<string,unknown>[]; author_id: string; status: 'draft'|'active'|'closed'; response_count: number; anonymous: boolean; }
export interface AIOSSurveyResponse extends BaseEntity { survey_id: string; respondent_id: string; answers: Record<string,unknown>[]; completed: boolean; submitted_at?: string; }
export interface AIOSTicket extends BaseEntity { subject: string; description: string; category: string; priority: 'low'|'medium'|'high'|'urgent'; status: 'open'|'in_progress'|'waiting'|'resolved'|'closed'; requester_id: string; assignee_id?: string; tags: string[]; }
export interface AIOSTicketMessage extends BaseEntity { ticket_id: string; author_id: string; content: string; is_internal: boolean; attachments: string[]; }
export interface AIOSKBArticle extends BaseEntity { title: string; content: string; category: string; tags: string[]; author_id: string; helpful_count: number; not_helpful_count: number; status: 'draft'|'published'|'archived'; }
export interface AIOSFeedback extends BaseEntity { entity_type: string; entity_id: string; user_id: string; rating: number; comment?: string; category: string; }
export interface AIOSNPS extends BaseEntity { user_id: string; score: number; feedback?: string; category: string; }
export interface AIOSSupport extends BaseEntity { type: 'chat'|'email'|'phone'|'ticket'; status: 'active'|'waiting'|'resolved'; requester_id: string; agent_id?: string; started_at: string; ended_at?: string; satisfaction?: number; }
export interface AIOSSupportMessage extends BaseEntity { support_id: string; sender_id: string; content: string; attachments: string[]; }
export interface AIOSAnnouncement extends BaseEntity { title: string; content: string; author_id: string; target_audience: string[]; priority: 'low'|'medium'|'high'; publish_at: string; expires_at?: string; read_count: number; }
export interface AIOSBanner extends BaseEntity { title: string; message: string; type: 'info'|'warning'|'error'|'success'; link?: string; position: 'top'|'bottom'; dismissible: boolean; active: boolean; }
export interface AIOSTutorial extends BaseEntity { title: string; description: string; steps: Record<string,unknown>[]; target_page: string; is_active: boolean; completion_rate: number; }
export interface AIOSOnboarding extends BaseEntity { name: string; description: string; steps: Record<string,unknown>[]; target_role: string; is_active: boolean; completion_rate: number; }
export interface AIOSEasterEgg extends BaseEntity { name: string; description: string; trigger: string; reward: Record<string,unknown>; discovered_count: number; }
export interface AIOSGamification extends BaseEntity { name: string; type: 'achievement'|'badge'|'points'|'level'|'streak'; description: string; criteria: Record<string,unknown>; reward: Record<string,unknown>; }
export interface AIOSAchievement extends BaseEntity { user_id: string; achievement_id: string; earned_at: string; }
export interface AIOSLeaderboard extends BaseEntity { name: string; type: string; period: string; entries: Record<string,unknown>[]; }
export interface AIOSStreak extends BaseEntity { user_id: string; type: string; current_count: number; best_count: number; last_activity_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const AIOS_TABLE_NAMES: Record<string, string> = {
  AIOSModel: 'aios_models',
  AIOSTrainingJob: 'aios_training_jobs',
  AIOSService: 'aios_services',
  AIOSPipeline: 'aios_pipelines',
  AIOSEndpoint: 'aios_endpoints',
  AIOSDataset: 'aios_datasets',
  AIOSToken: 'aios_tokens',
  AIOSMetric: 'aios_metrics',
  AIOSLog: 'aios_logs',
  AIOSAlert: 'aios_alerts',
  AIOSConfig: 'aios_configs',
  AIOSWebhook: 'aios_webhooks',
  AIOSIntegration: 'aios_integrations',
  AIOSCache: 'aios_caches',
  AIOSQueue: 'aios_queues',
  AIOSQueueMessage: 'aios_queue_messages',
  AIOSFunction: 'aios_functions',
  AIOSDeployment: 'aios_deployments',
  AIOSPermission: 'aios_permissions',
  AIOSRole: 'aios_roles',
  AIOSAuditLog: 'aios_audit_logs',
  AIOSNotification: 'aios_notifications',
  AIOSFeature: 'aios_features',
  AIOSExperiment: 'aios_experiments',
  AIOSInsight: 'aios_insights',
  AIOSKnowledgeBase: 'aios_knowledge_bases',
  AIOSKnowledgeEntry: 'aios_knowledge_entries',
  AIOSAgent: 'aios_agents',
  AIOSConversation: 'aios_conversations',
  AIOSMessage: 'aios_messages',
  AIOSWorkflow: 'aios_workflows',
  AIOSWorkflowRun: 'aios_workflow_runs',
  AIOSNode: 'aios_nodes',
  AIOSNodeRun: 'aios_node_runs',
  AIOSConnector: 'aios_connectors',
  AIOSConnection: 'aios_connections',
  AIOSDataFlow: 'aios_data_flows',
  AIOSMonitor: 'aios_monitors',
  AIOSIncident: 'aios_incidents',
  AIOSMaintenanceWindow: 'aios_maintenance_windows',
  AIOSCapacityPlan: 'aios_capacity_plans',
  AIOSCostEntry: 'aios_cost_entries',
  AIOSBudget: 'aios_budgets',
  AIOSSpellCheck: 'aios_spell_checks',
  AIOSTranslation: 'aios_translations',
  AIOSSentiment: 'aios_sentiments',
  AIOSClassification: 'aios_classifications',
  AIOSExtraction: 'aios_extractions',
  AIOSSummarization: 'aios_summarizations',
  AIOSGeneration: 'aios_generations',
  AIOSEmbedding: 'aios_embeddings',
  AIOSVisionResult: 'aios_vision_results',
  AIOSAudioResult: 'aios_audio_results',
  AIOSSearchResult: 'aios_search_results',
  AIOSRanking: 'aios_rankings',
  AIOSRecommendation: 'aios_recommendations',
  AIOSPersonalization: 'aios_personalizations',
  AIOSABTest: 'aios_ab_tests',
  AIOSFunnel: 'aios_funnels',
  AIOSCohort: 'aios_cohorts',
  AIOSAttribution: 'aios_attributions',
  AIOSLifecycle: 'aios_lifecycles',
  AIOSHealthScore: 'aios_health_scores',
  AIOSPredictiveScore: 'aios_predictive_scores',
  AIOSAnomalyDetection: 'aios_anomaly_detections',
  AIOSForecast: 'aios_forecasts',
  AIOSPattern: 'aios_patterns',
  AIOSSegment: 'aios_segments',
  AIOSAttribute: 'aios_attributes',
  AIOSMetadataEntry: 'aios_metadata_entries',
  AIOSVersionEntry: 'aios_version_entries',
  AIOSLabel: 'aios_labels',
  AIOSAnnotation: 'aios_annotations',
  AIOSDependency: 'aios_dependencies',
  AIOSRelation: 'aios_relations',
  AIOSGraph: 'aios_graphs',
  AIOSGraphNode: 'aios_graph_nodes',
  AIOSGraphEdge: 'aios_graph_edges',
  AIOSCluster: 'aios_clusters',
  AIOSDimension: 'aios_dimensions',
  AIOSProjection: 'aios_projections',
  AIOSVisualization: 'aios_visualizations',
  AIOSDashboard: 'aios_dashboards',
  AIOSWidget: 'aios_widgets',
  AIOSReport: 'aios_reports',
  AIOSReportExecution: 'aios_report_executions',
  AIOSArchive: 'aios_archives',
  AIOSRestoreEntry: 'aios_restore_entries',
  AIOSLock: 'aios_locks',
  AIOSRateLimit: 'aios_rate_limits',
  AIOSQuota: 'aios_quotas',
  AIOSUsage: 'aios_usages',
  AIOSSession: 'aios_sessions',
  AIOSUserActivity: 'aios_user_activities',
  AIOSPreference: 'aios_preferences',
  AIOSTemplate: 'aios_templates',
  AIOSBookmark: 'aios_bookmarks',
  AIOSHistory: 'aios_history',
  AIOSShare: 'aios_shares',
  AIOSComment: 'aios_comments',
  AIOSReaction: 'aios_reactions',
  AIOSFeed: 'aios_feeds',
  AIOSNotificationPreference: 'aios_notification_preferences',
  AIOSDigest: 'aios_digests',
  AIOSMilestone: 'aios_milestones',
  AIOSGoal: 'aios_goals',
  AIOSInitiative: 'aios_initiatives',
  AIOSResource: 'aios_resources',
  AIOSAllocation: 'aios_allocations',
  AIOSRisk: 'aios_risks',
  AIOSSuccessCriteria: 'aios_success_criteria',
  AIOSDecision: 'aios_decisions',
  AIOSAction: 'aios_actions',
  AIOSSchedule: 'aios_schedules',
  AIOSEvent: 'aios_events',
  AIOSTask: 'aios_tasks',
  AIOSTaskComment: 'aios_task_comments',
  AIOSTaskAttachment: 'aios_task_attachments',
  AIOSNote: 'aios_notes',
  AIOSWiki: 'aios_wikis',
  AIOSWikiVersion: 'aios_wiki_versions',
  AIOSForum: 'aios_forums',
  AIOSForumPost: 'aios_forum_posts',
  AIOSForumReply: 'aios_forum_replies',
  AIOSPoll: 'aios_polls',
  AIOSPollVote: 'aios_poll_votes',
  AIOSSurvey: 'aios_surveys',
  AIOSSurveyResponse: 'aios_survey_responses',
  AIOSTicket: 'aios_tickets',
  AIOSTicketMessage: 'aios_ticket_messages',
  AIOSKBArticle: 'aios_kb_articles',
  AIOSFeedback: 'aios_feedbacks',
  AIOSNPS: 'aios_nps',
  AIOSSupport: 'aios_supports',
  AIOSSupportMessage: 'aios_support_messages',
  AIOSAnnouncement: 'aios_announcements',
  AIOSBanner: 'aios_banners',
  AIOSTutorial: 'aios_tutorials',
  AIOSOnboarding: 'aios_onboardings',
  AIOSEasterEgg: 'aios_easter_eggs',
  AIOSGamification: 'aios_gamifications',
  AIOSAchievement: 'aios_achievements',
  AIOSLeaderboard: 'aios_leaderboards',
  AIOSStreak: 'aios_streaks',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface AEIP1Repository {
  models: CrudRepository<AIOSModel>;
  trainingJobs: CrudRepository<AIOSTrainingJob>;
  services: CrudRepository<AIOSService>;
  pipelines: CrudRepository<AIOSPipeline>;
  endpoints: CrudRepository<AIOSEndpoint>;
  datasets: CrudRepository<AIOSDataset>;
  tokens: CrudRepository<AIOSToken>;
  metrics: CrudRepository<AIOSMetric>;
  logs: CrudRepository<AIOSLog>;
  alerts: CrudRepository<AIOSAlert>;
  configs: CrudRepository<AIOSConfig>;
  webhooks: CrudRepository<AIOSWebhook>;
  integrations: CrudRepository<AIOSIntegration>;
  caches: CrudRepository<AIOSCache>;
  queues: CrudRepository<AIOSQueue>;
  queueMessages: CrudRepository<AIOSQueueMessage>;
  functions: CrudRepository<AIOSFunction>;
  deployments: CrudRepository<AIOSDeployment>;
  permissions: CrudRepository<AIOSPermission>;
  roles: CrudRepository<AIOSRole>;
  auditLogs: CrudRepository<AIOSAuditLog>;
  notifications: CrudRepository<AIOSNotification>;
  features: CrudRepository<AIOSFeature>;
  experiments: CrudRepository<AIOSExperiment>;
  insights: CrudRepository<AIOSInsight>;
  knowledgeBases: CrudRepository<AIOSKnowledgeBase>;
  knowledgeEntries: CrudRepository<AIOSKnowledgeEntry>;
  agents: CrudRepository<AIOSAgent>;
  conversations: CrudRepository<AIOSConversation>;
  messages: CrudRepository<AIOSMessage>;
  workflows: CrudRepository<AIOSWorkflow>;
  workflowRuns: CrudRepository<AIOSWorkflowRun>;
  nodes: CrudRepository<AIOSNode>;
  nodeRuns: CrudRepository<AIOSNodeRun>;
  connectors: CrudRepository<AIOSConnector>;
  connections: CrudRepository<AIOSConnection>;
  dataFlows: CrudRepository<AIOSDataFlow>;
  monitors: CrudRepository<AIOSMonitor>;
  incidents: CrudRepository<AIOSIncident>;
  maintenanceWindows: CrudRepository<AIOSMaintenanceWindow>;
  capacityPlans: CrudRepository<AIOSCapacityPlan>;
  costEntries: CrudRepository<AIOSCostEntry>;
  budgets: CrudRepository<AIOSBudget>;
  spellChecks: CrudRepository<AIOSSpellCheck>;
  translations: CrudRepository<AIOSTranslation>;
  sentiments: CrudRepository<AIOSSentiment>;
  classifications: CrudRepository<AIOSClassification>;
  extractions: CrudRepository<AIOSExtraction>;
  summarizations: CrudRepository<AIOSSummarization>;
  generations: CrudRepository<AIOSGeneration>;
  embeddings: CrudRepository<AIOSEmbedding>;
  visionResults: CrudRepository<AIOSVisionResult>;
  audioResults: CrudRepository<AIOSAudioResult>;
  searchResults: CrudRepository<AIOSSearchResult>;
  rankings: CrudRepository<AIOSRanking>;
  recommendations: CrudRepository<AIOSRecommendation>;
  personalizations: CrudRepository<AIOSPersonalization>;
  abTests: CrudRepository<AIOSABTest>;
  funnels: CrudRepository<AIOSFunnel>;
  cohorts: CrudRepository<AIOSCohort>;
  attributions: CrudRepository<AIOSAttribution>;
  lifecycles: CrudRepository<AIOSLifecycle>;
  healthScores: CrudRepository<AIOSHealthScore>;
  predictiveScores: CrudRepository<AIOSPredictiveScore>;
  anomalyDetections: CrudRepository<AIOSAnomalyDetection>;
  forecasts: CrudRepository<AIOSForecast>;
  patterns: CrudRepository<AIOSPattern>;
  segments: CrudRepository<AIOSSegment>;
  attributes: CrudRepository<AIOSAttribute>;
  metadataEntries: CrudRepository<AIOSMetadataEntry>;
  versionEntries: CrudRepository<AIOSVersionEntry>;
  labels: CrudRepository<AIOSLabel>;
  annotations: CrudRepository<AIOSAnnotation>;
  dependencies: CrudRepository<AIOSDependency>;
  relations: CrudRepository<AIOSRelation>;
  graphs: CrudRepository<AIOSGraph>;
  graphNodes: CrudRepository<AIOSGraphNode>;
  graphEdges: CrudRepository<AIOSGraphEdge>;
  clusters: CrudRepository<AIOSCluster>;
  dimensions: CrudRepository<AIOSDimension>;
  projections: CrudRepository<AIOSProjection>;
  visualizations: CrudRepository<AIOSVisualization>;
  dashboards: CrudRepository<AIOSDashboard>;
  widgets: CrudRepository<AIOSWidget>;
  reports: CrudRepository<AIOSReport>;
  reportExecutions: CrudRepository<AIOSReportExecution>;
  archives: CrudRepository<AIOSArchive>;
  restoreEntries: CrudRepository<AIOSRestoreEntry>;
  locks: CrudRepository<AIOSLock>;
  rateLimits: CrudRepository<AIOSRateLimit>;
  quotas: CrudRepository<AIOSQuota>;
  usages: CrudRepository<AIOSUsage>;
  sessions: CrudRepository<AIOSSession>;
  userActivities: CrudRepository<AIOSUserActivity>;
  preferences: CrudRepository<AIOSPreference>;
  templates: CrudRepository<AIOSTemplate>;
  bookmarks: CrudRepository<AIOSBookmark>;
  history: CrudRepository<AIOSHistory>;
  shares: CrudRepository<AIOSShare>;
  comments: CrudRepository<AIOSComment>;
  reactions: CrudRepository<AIOSReaction>;
  feeds: CrudRepository<AIOSFeed>;
  notificationPreferences: CrudRepository<AIOSNotificationPreference>;
  digests: CrudRepository<AIOSDigest>;
  milestones: CrudRepository<AIOSMilestone>;
  goals: CrudRepository<AIOSGoal>;
  initiatives: CrudRepository<AIOSInitiative>;
  resources: CrudRepository<AIOSResource>;
  allocations: CrudRepository<AIOSAllocation>;
  risks: CrudRepository<AIOSRisk>;
  successCriteria: CrudRepository<AIOSSuccessCriteria>;
  decisions: CrudRepository<AIOSDecision>;
  actions: CrudRepository<AIOSAction>;
  schedules: CrudRepository<AIOSSchedule>;
  events: CrudRepository<AIOSEvent>;
  tasks: CrudRepository<AIOSTask>;
  taskComments: CrudRepository<AIOSTaskComment>;
  taskAttachments: CrudRepository<AIOSTaskAttachment>;
  notes: CrudRepository<AIOSNote>;
  wikis: CrudRepository<AIOSWiki>;
  wikiVersions: CrudRepository<AIOSWikiVersion>;
  forums: CrudRepository<AIOSForum>;
  forumPosts: CrudRepository<AIOSForumPost>;
  forumReplies: CrudRepository<AIOSForumReply>;
  polls: CrudRepository<AIOSPoll>;
  pollVotes: CrudRepository<AIOSPollVote>;
  surveys: CrudRepository<AIOSSurvey>;
  surveyResponses: CrudRepository<AIOSSurveyResponse>;
  tickets: CrudRepository<AIOSTicket>;
  ticketMessages: CrudRepository<AIOSTicketMessage>;
  kbArticles: CrudRepository<AIOSKBArticle>;
  feedbacks: CrudRepository<AIOSFeedback>;
  nps: CrudRepository<AIOSNPS>;
  supports: CrudRepository<AIOSSupport>;
  supportMessages: CrudRepository<AIOSSupportMessage>;
  announcements: CrudRepository<AIOSAnnouncement>;
  banners: CrudRepository<AIOSBanner>;
  tutorials: CrudRepository<AIOSTutorial>;
  onboardings: CrudRepository<AIOSOnboarding>;
  easterEggs: CrudRepository<AIOSEasterEgg>;
  gamifications: CrudRepository<AIOSGamification>;
  achievements: CrudRepository<AIOSAchievement>;
  leaderboards: CrudRepository<AIOSLeaderboard>;
  streaks: CrudRepository<AIOSStreak>;
}

// ============================================================================
// Factory
// ============================================================================
export function createAEIP1Repository(supabase: SupabaseClient): AEIP1Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    models: crud<AIOSModel>(AIOS_TABLE_NAMES.AIOSModel),
    trainingJobs: crud<AIOSTrainingJob>(AIOS_TABLE_NAMES.AIOSTrainingJob),
    services: crud<AIOSService>(AIOS_TABLE_NAMES.AIOSService),
    pipelines: crud<AIOSPipeline>(AIOS_TABLE_NAMES.AIOSPipeline),
    endpoints: crud<AIOSEndpoint>(AIOS_TABLE_NAMES.AIOSEndpoint),
    datasets: crud<AIOSDataset>(AIOS_TABLE_NAMES.AIOSDataset),
    tokens: crud<AIOSToken>(AIOS_TABLE_NAMES.AIOSToken),
    metrics: crud<AIOSMetric>(AIOS_TABLE_NAMES.AIOSMetric),
    logs: crud<AIOSLog>(AIOS_TABLE_NAMES.AIOSLog),
    alerts: crud<AIOSAlert>(AIOS_TABLE_NAMES.AIOSAlert),
    configs: crud<AIOSConfig>(AIOS_TABLE_NAMES.AIOSConfig),
    webhooks: crud<AIOSWebhook>(AIOS_TABLE_NAMES.AIOSWebhook),
    integrations: crud<AIOSIntegration>(AIOS_TABLE_NAMES.AIOSIntegration),
    caches: crud<AIOSCache>(AIOS_TABLE_NAMES.AIOSCache),
    queues: crud<AIOSQueue>(AIOS_TABLE_NAMES.AIOSQueue),
    queueMessages: crud<AIOSQueueMessage>(AIOS_TABLE_NAMES.AIOSQueueMessage),
    functions: crud<AIOSFunction>(AIOS_TABLE_NAMES.AIOSFunction),
    deployments: crud<AIOSDeployment>(AIOS_TABLE_NAMES.AIOSDeployment),
    permissions: crud<AIOSPermission>(AIOS_TABLE_NAMES.AIOSPermission),
    roles: crud<AIOSRole>(AIOS_TABLE_NAMES.AIOSRole),
    auditLogs: crud<AIOSAuditLog>(AIOS_TABLE_NAMES.AIOSAuditLog),
    notifications: crud<AIOSNotification>(AIOS_TABLE_NAMES.AIOSNotification),
    features: crud<AIOSFeature>(AIOS_TABLE_NAMES.AIOSFeature),
    experiments: crud<AIOSExperiment>(AIOS_TABLE_NAMES.AIOSExperiment),
    insights: crud<AIOSInsight>(AIOS_TABLE_NAMES.AIOSInsight),
    knowledgeBases: crud<AIOSKnowledgeBase>(AIOS_TABLE_NAMES.AIOSKnowledgeBase),
    knowledgeEntries: crud<AIOSKnowledgeEntry>(AIOS_TABLE_NAMES.AIOSKnowledgeEntry),
    agents: crud<AIOSAgent>(AIOS_TABLE_NAMES.AIOSAgent),
    conversations: crud<AIOSConversation>(AIOS_TABLE_NAMES.AIOSConversation),
    messages: crud<AIOSMessage>(AIOS_TABLE_NAMES.AIOSMessage),
    workflows: crud<AIOSWorkflow>(AIOS_TABLE_NAMES.AIOSWorkflow),
    workflowRuns: crud<AIOSWorkflowRun>(AIOS_TABLE_NAMES.AIOSWorkflowRun),
    nodes: crud<AIOSNode>(AIOS_TABLE_NAMES.AIOSNode),
    nodeRuns: crud<AIOSNodeRun>(AIOS_TABLE_NAMES.AIOSNodeRun),
    connectors: crud<AIOSConnector>(AIOS_TABLE_NAMES.AIOSConnector),
    connections: crud<AIOSConnection>(AIOS_TABLE_NAMES.AIOSConnection),
    dataFlows: crud<AIOSDataFlow>(AIOS_TABLE_NAMES.AIOSDataFlow),
    monitors: crud<AIOSMonitor>(AIOS_TABLE_NAMES.AIOSMonitor),
    incidents: crud<AIOSIncident>(AIOS_TABLE_NAMES.AIOSIncident),
    maintenanceWindows: crud<AIOSMaintenanceWindow>(AIOS_TABLE_NAMES.AIOSMaintenanceWindow),
    capacityPlans: crud<AIOSCapacityPlan>(AIOS_TABLE_NAMES.AIOSCapacityPlan),
    costEntries: crud<AIOSCostEntry>(AIOS_TABLE_NAMES.AIOSCostEntry),
    budgets: crud<AIOSBudget>(AIOS_TABLE_NAMES.AIOSBudget),
    spellChecks: crud<AIOSSpellCheck>(AIOS_TABLE_NAMES.AIOSSpellCheck),
    translations: crud<AIOSTranslation>(AIOS_TABLE_NAMES.AIOSTranslation),
    sentiments: crud<AIOSSentiment>(AIOS_TABLE_NAMES.AIOSSentiment),
    classifications: crud<AIOSClassification>(AIOS_TABLE_NAMES.AIOSClassification),
    extractions: crud<AIOSExtraction>(AIOS_TABLE_NAMES.AIOSExtraction),
    summarizations: crud<AIOSSummarization>(AIOS_TABLE_NAMES.AIOSSummarization),
    generations: crud<AIOSGeneration>(AIOS_TABLE_NAMES.AIOSGeneration),
    embeddings: crud<AIOSEmbedding>(AIOS_TABLE_NAMES.AIOSEmbedding),
    visionResults: crud<AIOSVisionResult>(AIOS_TABLE_NAMES.AIOSVisionResult),
    audioResults: crud<AIOSAudioResult>(AIOS_TABLE_NAMES.AIOSAudioResult),
    searchResults: crud<AIOSSearchResult>(AIOS_TABLE_NAMES.AIOSSearchResult),
    rankings: crud<AIOSRanking>(AIOS_TABLE_NAMES.AIOSRanking),
    recommendations: crud<AIOSRecommendation>(AIOS_TABLE_NAMES.AIOSRecommendation),
    personalizations: crud<AIOSPersonalization>(AIOS_TABLE_NAMES.AIOSPersonalization),
    abTests: crud<AIOSABTest>(AIOS_TABLE_NAMES.AIOSABTest),
    funnels: crud<AIOSFunnel>(AIOS_TABLE_NAMES.AIOSFunnel),
    cohorts: crud<AIOSCohort>(AIOS_TABLE_NAMES.AIOSCohort),
    attributions: crud<AIOSAttribution>(AIOS_TABLE_NAMES.AIOSAttribution),
    lifecycles: crud<AIOSLifecycle>(AIOS_TABLE_NAMES.AIOSLifecycle),
    healthScores: crud<AIOSHealthScore>(AIOS_TABLE_NAMES.AIOSHealthScore),
    predictiveScores: crud<AIOSPredictiveScore>(AIOS_TABLE_NAMES.AIOSPredictiveScore),
    anomalyDetections: crud<AIOSAnomalyDetection>(AIOS_TABLE_NAMES.AIOSAnomalyDetection),
    forecasts: crud<AIOSForecast>(AIOS_TABLE_NAMES.AIOSForecast),
    patterns: crud<AIOSPattern>(AIOS_TABLE_NAMES.AIOSPattern),
    segments: crud<AIOSSegment>(AIOS_TABLE_NAMES.AIOSSegment),
    attributes: crud<AIOSAttribute>(AIOS_TABLE_NAMES.AIOSAttribute),
    metadataEntries: crud<AIOSMetadataEntry>(AIOS_TABLE_NAMES.AIOSMetadataEntry),
    versionEntries: crud<AIOSVersionEntry>(AIOS_TABLE_NAMES.AIOSVersionEntry),
    labels: crud<AIOSLabel>(AIOS_TABLE_NAMES.AIOSLabel),
    annotations: crud<AIOSAnnotation>(AIOS_TABLE_NAMES.AIOSAnnotation),
    dependencies: crud<AIOSDependency>(AIOS_TABLE_NAMES.AIOSDependency),
    relations: crud<AIOSRelation>(AIOS_TABLE_NAMES.AIOSRelation),
    graphs: crud<AIOSGraph>(AIOS_TABLE_NAMES.AIOSGraph),
    graphNodes: crud<AIOSGraphNode>(AIOS_TABLE_NAMES.AIOSGraphNode),
    graphEdges: crud<AIOSGraphEdge>(AIOS_TABLE_NAMES.AIOSGraphEdge),
    clusters: crud<AIOSCluster>(AIOS_TABLE_NAMES.AIOSCluster),
    dimensions: crud<AIOSDimension>(AIOS_TABLE_NAMES.AIOSDimension),
    projections: crud<AIOSProjection>(AIOS_TABLE_NAMES.AIOSProjection),
    visualizations: crud<AIOSVisualization>(AIOS_TABLE_NAMES.AIOSVisualization),
    dashboards: crud<AIOSDashboard>(AIOS_TABLE_NAMES.AIOSDashboard),
    widgets: crud<AIOSWidget>(AIOS_TABLE_NAMES.AIOSWidget),
    reports: crud<AIOSReport>(AIOS_TABLE_NAMES.AIOSReport),
    reportExecutions: crud<AIOSReportExecution>(AIOS_TABLE_NAMES.AIOSReportExecution),
    archives: crud<AIOSArchive>(AIOS_TABLE_NAMES.AIOSArchive),
    restoreEntries: crud<AIOSRestoreEntry>(AIOS_TABLE_NAMES.AIOSRestoreEntry),
    locks: crud<AIOSLock>(AIOS_TABLE_NAMES.AIOSLock),
    rateLimits: crud<AIOSRateLimit>(AIOS_TABLE_NAMES.AIOSRateLimit),
    quotas: crud<AIOSQuota>(AIOS_TABLE_NAMES.AIOSQuota),
    usages: crud<AIOSUsage>(AIOS_TABLE_NAMES.AIOSUsage),
    sessions: crud<AIOSSession>(AIOS_TABLE_NAMES.AIOSSession),
    userActivities: crud<AIOSUserActivity>(AIOS_TABLE_NAMES.AIOSUserActivity),
    preferences: crud<AIOSPreference>(AIOS_TABLE_NAMES.AIOSPreference),
    templates: crud<AIOSTemplate>(AIOS_TABLE_NAMES.AIOSTemplate),
    bookmarks: crud<AIOSBookmark>(AIOS_TABLE_NAMES.AIOSBookmark),
    history: crud<AIOSHistory>(AIOS_TABLE_NAMES.AIOSHistory),
    shares: crud<AIOSShare>(AIOS_TABLE_NAMES.AIOSShare),
    comments: crud<AIOSComment>(AIOS_TABLE_NAMES.AIOSComment),
    reactions: crud<AIOSReaction>(AIOS_TABLE_NAMES.AIOSReaction),
    feeds: crud<AIOSFeed>(AIOS_TABLE_NAMES.AIOSFeed),
    notificationPreferences: crud<AIOSNotificationPreference>(AIOS_TABLE_NAMES.AIOSNotificationPreference),
    digests: crud<AIOSDigest>(AIOS_TABLE_NAMES.AIOSDigest),
    milestones: crud<AIOSMilestone>(AIOS_TABLE_NAMES.AIOSMilestone),
    goals: crud<AIOSGoal>(AIOS_TABLE_NAMES.AIOSGoal),
    initiatives: crud<AIOSInitiative>(AIOS_TABLE_NAMES.AIOSInitiative),
    resources: crud<AIOSResource>(AIOS_TABLE_NAMES.AIOSResource),
    allocations: crud<AIOSAllocation>(AIOS_TABLE_NAMES.AIOSAllocation),
    risks: crud<AIOSRisk>(AIOS_TABLE_NAMES.AIOSRisk),
    successCriteria: crud<AIOSSuccessCriteria>(AIOS_TABLE_NAMES.AIOSSuccessCriteria),
    decisions: crud<AIOSDecision>(AIOS_TABLE_NAMES.AIOSDecision),
    actions: crud<AIOSAction>(AIOS_TABLE_NAMES.AIOSAction),
    schedules: crud<AIOSSchedule>(AIOS_TABLE_NAMES.AIOSSchedule),
    events: crud<AIOSEvent>(AIOS_TABLE_NAMES.AIOSEvent),
    tasks: crud<AIOSTask>(AIOS_TABLE_NAMES.AIOSTask),
    taskComments: crud<AIOSTaskComment>(AIOS_TABLE_NAMES.AIOSTaskComment),
    taskAttachments: crud<AIOSTaskAttachment>(AIOS_TABLE_NAMES.AIOSTaskAttachment),
    notes: crud<AIOSNote>(AIOS_TABLE_NAMES.AIOSNote),
    wikis: crud<AIOSWiki>(AIOS_TABLE_NAMES.AIOSWiki),
    wikiVersions: crud<AIOSWikiVersion>(AIOS_TABLE_NAMES.AIOSWikiVersion),
    forums: crud<AIOSForum>(AIOS_TABLE_NAMES.AIOSForum),
    forumPosts: crud<AIOSForumPost>(AIOS_TABLE_NAMES.AIOSForumPost),
    forumReplies: crud<AIOSForumReply>(AIOS_TABLE_NAMES.AIOSForumReply),
    polls: crud<AIOSPoll>(AIOS_TABLE_NAMES.AIOSPoll),
    pollVotes: crud<AIOSPollVote>(AIOS_TABLE_NAMES.AIOSPollVote),
    surveys: crud<AIOSSurvey>(AIOS_TABLE_NAMES.AIOSSurvey),
    surveyResponses: crud<AIOSSurveyResponse>(AIOS_TABLE_NAMES.AIOSSurveyResponse),
    tickets: crud<AIOSTicket>(AIOS_TABLE_NAMES.AIOSTicket),
    ticketMessages: crud<AIOSTicketMessage>(AIOS_TABLE_NAMES.AIOSTicketMessage),
    kbArticles: crud<AIOSKBArticle>(AIOS_TABLE_NAMES.AIOSKBArticle),
    feedbacks: crud<AIOSFeedback>(AIOS_TABLE_NAMES.AIOSFeedback),
    nps: crud<AIOSNPS>(AIOS_TABLE_NAMES.AIOSNPS),
    supports: crud<AIOSSupport>(AIOS_TABLE_NAMES.AIOSSupport),
    supportMessages: crud<AIOSSupportMessage>(AIOS_TABLE_NAMES.AIOSSupportMessage),
    announcements: crud<AIOSAnnouncement>(AIOS_TABLE_NAMES.AIOSAnnouncement),
    banners: crud<AIOSBanner>(AIOS_TABLE_NAMES.AIOSBanner),
    tutorials: crud<AIOSTutorial>(AIOS_TABLE_NAMES.AIOSTutorial),
    onboardings: crud<AIOSOnboarding>(AIOS_TABLE_NAMES.AIOSOnboarding),
    easterEggs: crud<AIOSEasterEgg>(AIOS_TABLE_NAMES.AIOSEasterEgg),
    gamifications: crud<AIOSGamification>(AIOS_TABLE_NAMES.AIOSGamification),
    achievements: crud<AIOSAchievement>(AIOS_TABLE_NAMES.AIOSAchievement),
    leaderboards: crud<AIOSLeaderboard>(AIOS_TABLE_NAMES.AIOSLeaderboard),
    streaks: crud<AIOSStreak>(AIOS_TABLE_NAMES.AIOSStreak),
  };
}
