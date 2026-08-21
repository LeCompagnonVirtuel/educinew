import { SupabaseClient } from '@supabase/supabase-js';
import { AppError, NotFoundError, ValidationError } from '@educi/errors';
import { CrudRepository, CrudRepositoryImpl, createCrudRepository } from './aeip-base.repository';

// ═══════════════════════════════════════════════════════════════════════
// AEIP-7 GENERATIVE STUDIO — Repository
// Auto-génératif, contenus, médias, designs, templates, projets, assets
// Table prefix: gns
// ═══════════════════════════════════════════════════════════════════════

// ── Generative Studio Configuration ──
export interface GnsStudioWorkspace {
  id: string;
  school_id: string;
  workspace_name: string;
  workspace_type: 'content_creation' | 'media_production' | 'design_studio' | 'template_factory' | 'asset_library' | 'hybrid';
  owner_id: string;
  status: 'active' | 'inactive' | 'archived' | 'maintenance';
  settings: Record<string, unknown>;
  storage_quota_mb: number;
  storage_used_mb: number;
  collaborators_count: number;
  ai_assistance_enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsStudioProject {
  id: string;
  school_id: string;
  workspace_id: string;
  project_name: string;
  project_type: 'courseware' | 'video' | 'animation' | 'interactive' | 'assessment' | 'mixed';
  status: 'draft' | 'in_progress' | 'review' | 'approved' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  owner_id: string;
  team_ids: string[];
  template_id: string | null;
  ai_generation_used: boolean;
  progress_percent: number;
  deadline: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsStudioProjectMilestone {
  id: string;
  school_id: string;
  project_id: string;
  milestone_name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  due_date: string;
  completed_at: string | null;
  deliverables: string[];
  assignee_ids: string[];
  order_index: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── AI Content Generation ──
export interface GnsAIContentPipeline {
  id: string;
  school_id: string;
  pipeline_name: string;
  pipeline_type: 'text' | 'image' | 'video' | 'audio' | '3d' | 'interactive' | 'mixed';
  status: 'active' | 'paused' | 'completed' | 'failed';
  ai_model_id: string;
  input_config: Record<string, unknown>;
  output_config: Record<string, unknown>;
  quality_settings: Record<string, unknown>;
  auto_retry_enabled: boolean;
  max_retries: number;
  avg_generation_time_ms: number;
  total_generations: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAITextGeneration {
  id: string;
  school_id: string;
  pipeline_id: string;
  prompt: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  model_used: string;
  temperature: number;
  top_p: number;
  output_text: string;
  output_html: string | null;
  output_markdown: string | null;
  language: string;
  quality_score: number;
  review_status: 'pending' | 'approved' | 'rejected' | 'needs_edit';
  reviewer_id: string | null;
  review_notes: string | null;
  generation_time_ms: number;
  cost_cents: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAIImageGeneration {
  id: string;
  school_id: string;
  pipeline_id: string;
  prompt: string;
  negative_prompt: string | null;
  style: 'realistic' | 'illustration' | 'cartoon' | 'minimalist' | 'academic' | 'artistic';
  resolution: string;
  aspect_ratio: string;
  seed: number | null;
  guidance_scale: number;
  steps: number;
  model_used: string;
  image_url: string;
  image_thumb_url: string;
  image_width: number;
  image_height: number;
  file_size_bytes: number;
  nsfw_detected: boolean;
  quality_score: number;
  generation_time_ms: number;
  cost_cents: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAIVideoGeneration {
  id: string;
  school_id: string;
  pipeline_id: string;
  prompt: string;
  source_image_url: string | null;
  duration_seconds: number;
  fps: number;
  resolution: string;
  style: 'realistic' | 'animation' | 'motion_graphics' | 'whiteboard' | 'talking_head';
  model_used: string;
  video_url: string;
  thumbnail_url: string;
  video_codec: string;
  audio_codec: string;
  file_size_bytes: number;
  generation_time_ms: number;
  cost_cents: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAIAudioGeneration {
  id: string;
  school_id: string;
  pipeline_id: string;
  text_input: string;
  voice_id: string;
  voice_name: string;
  language: string;
  speed: number;
  pitch: number;
  emotion: string | null;
  audio_url: string;
  audio_codec: string;
  sample_rate: number;
  duration_seconds: number;
  file_size_bytes: number;
  generation_time_ms: number;
  cost_cents: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAITTSConfiguration {
  id: string;
  school_id: string;
  config_name: string;
  provider: string;
  voice_id: string;
  voice_name: string;
  language: string;
  speed_default: number;
  pitch_default: number;
  ssml_enabled: boolean;
  neural_enabled: boolean;
  preview_url: string | null;
  usage_count: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAIVoiceModel {
  id: string;
  school_id: string;
  model_name: string;
  provider: string;
  voice_type: 'neural' | 'standard' | 'custom_clone';
  language: string;
  gender: string;
  sample_audio_url: string;
  is_premium: boolean;
  is_active: boolean;
  clone_training_status: string | null;
  clone_sample_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Content Templates ──
export interface GnsContentTemplate {
  id: string;
  school_id: string;
  template_name: string;
  template_type: 'slide_deck' | 'document' | 'video_script' | 'quiz' | 'assignment' | 'lesson_plan' | 'infographic' | 'webpage';
  category: string;
  description: string;
  thumbnail_url: string | null;
  preview_url: string | null;
  template_data: Record<string, unknown>;
  css_styles: string | null;
  variables: string[];
  is_ai_generated: boolean;
  is_public: boolean;
  usage_count: number;
  rating: number;
  rating_count: number;
  tags: string[];
  author_id: string;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsTemplateVariable {
  id: string;
  school_id: string;
  template_id: string;
  variable_name: string;
  variable_type: 'text' | 'number' | 'image' | 'color' | 'boolean' | 'select' | 'date' | 'rich_text';
  default_value: string;
  validation_rules: Record<string, unknown>;
  description: string;
  is_required: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsTemplateCategory {
  id: string;
  school_id: string;
  category_name: string;
  parent_id: string | null;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
  template_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsTemplateCollection {
  id: string;
  school_id: string;
  collection_name: string;
  description: string;
  template_ids: string[];
  thumbnail_url: string | null;
  is_featured: boolean;
  is_public: boolean;
  usage_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Media Library ──
export interface GnsMediaAsset {
  id: string;
  school_id: string;
  workspace_id: string;
  asset_name: string;
  asset_type: 'image' | 'video' | 'audio' | 'document' | '3d_model' | 'animation' | 'svg' | 'font' | 'icon';
  file_url: string;
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  thumbnail_url: string | null;
  alt_text: string | null;
  description: string | null;
  tags: string[];
  folder_id: string | null;
  uploaded_by: string;
  ai_generated: boolean;
  ai_pipeline_id: string | null;
  license: string;
  is_public: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsMediaFolder {
  id: string;
  school_id: string;
  workspace_id: string;
  folder_name: string;
  parent_id: string | null;
  path: string;
  description: string;
  icon: string;
  color: string;
  item_count: number;
  total_size_bytes: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsMediaTag {
  id: string;
  school_id: string;
  tag_name: string;
  tag_slug: string;
  color: string;
  usage_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsMediaProcessingJob {
  id: string;
  school_id: string;
  asset_id: string;
  job_type: 'thumbnail' | 'transcode' | 'compress' | 'resize' | 'watermark' | 'format_convert' | 'ai_enhance';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  input_config: Record<string, unknown>;
  output_config: Record<string, unknown>;
  progress_percent: number;
  error_message: string | null;
  result_url: string | null;
  processing_time_ms: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsMediaCDNConfig {
  id: string;
  school_id: string;
  provider: string;
  domain: string;
  api_key_encrypted: string;
  cache_ttl_seconds: number;
  bandwidth_limit_gb: number;
  bandwidth_used_gb: number;
  is_active: boolean;
  purge_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Design System ──
export interface GnsDesignSystem {
  id: string;
  school_id: string;
  system_name: string;
  description: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_primary: string;
  font_secondary: string;
  border_radius: string;
  spacing_unit: string;
  logo_url: string | null;
  favicon_url: string | null;
  is_default: boolean;
  version: number;
  component_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsDesignComponent {
  id: string;
  school_id: string;
  design_system_id: string;
  component_name: string;
  component_type: 'button' | 'card' | 'form' | 'modal' | 'table' | 'chart' | 'navigation' | 'layout' | 'typography' | 'icon';
  preview_url: string | null;
  code_html: string;
  code_css: string;
  code_js: string | null;
  code_react: string | null;
  props_schema: Record<string, unknown>;
  variants: string[];
  is_responsive: boolean;
  accessibility_level: 'A' | 'AA' | 'AAA';
  usage_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsDesignColorPalette {
  id: string;
  school_id: string;
  design_system_id: string;
  palette_name: string;
  colors: string[];
  semantic_mapping: Record<string, string>;
  is_dark_mode: boolean;
  contrast_ratio: number;
  wcag_compliant: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsDesignIconSet {
  id: string;
  school_id: string;
  design_system_id: string;
  set_name: string;
  icon_count: number;
  format: 'svg' | 'icon_font' | 'png' | 'mixed';
  style: 'filled' | 'outlined' | 'duotone' | 'flat';
  total_size_kb: number;
  preview_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsDesignIcon {
  id: string;
  school_id: string;
  icon_set_id: string;
  icon_name: string;
  icon_slug: string;
  svg_content: string;
  tags: string[];
  category: string;
  variants: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsDesignStyleGuide {
  id: string;
  school_id: string;
  design_system_id: string;
  guide_name: string;
  content_markdown: string;
  dos: string[];
  donts: string[];
  examples: Record<string, unknown>[];
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Courseware ──
export interface GnsCoursewareModule {
  id: string;
  school_id: string;
  project_id: string;
  module_name: string;
  module_type: 'lesson' | 'quiz' | 'lab' | 'discussion' | 'assignment' | 'simulation' | 'virtual_field_trip';
  status: 'draft' | 'in_review' | 'approved' | 'published';
  duration_minutes: number;
  learning_objectives: string[];
  prerequisites: string[];
  content_blocks: Record<string, unknown>[];
  assessment_config: Record<string, unknown> | null;
  interaction_type: 'passive' | 'interactive' | 'gamified' | 'collaborative';
  accessibility_features: string[];
  ai_generated: boolean;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCoursewareContentBlock {
  id: string;
  school_id: string;
  module_id: string;
  block_type: 'text' | 'image' | 'video' | 'audio' | 'interactive' | 'quiz_element' | 'code_snippet' | '3d_scene' | 'embed';
  block_order: number;
  content_data: Record<string, unknown>;
  layout: string;
  animation: string | null;
  width: string;
  height: string | null;
  alt_text: string | null;
  caption: string | null;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCoursewareQuiz {
  id: string;
  school_id: string;
  module_id: string;
  quiz_type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'short_answer' | 'essay' | 'coding' | 'mixed';
  questions: Record<string, unknown>[];
  time_limit_minutes: number | null;
  passing_score: number;
  max_attempts: number;
  shuffle_questions: boolean;
  show_feedback: boolean;
  proctoring_enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCoursewareLab {
  id: string;
  school_id: string;
  module_id: string;
  lab_type: 'virtual' | 'sandbox' | 'simulation' | 'physical_kit';
  environment_config: Record<string, unknown>;
  instructions_markdown: string;
  starter_code: string | null;
  solution_code: string | null;
  test_cases: Record<string, unknown>[];
  time_limit_minutes: number | null;
  max_resources: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCoursewareInteractiveElement {
  id: string;
  school_id: string;
  module_id: string;
  element_type: 'drag_drop' | 'hotspot' | 'timeline' | 'simulation' | 'virtual_lab' | 'branching_scenario' | 'storyline';
  config: Record<string, unknown>;
  assets: string[];
  scoring_rules: Record<string, unknown>;
  hint_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCoursewareSCORMPackage {
  id: string;
  school_id: string;
  module_id: string;
  package_name: string;
  scorm_version: '1.2' | '2004_3rd' | '2004_4th';
  file_url: string;
  file_size_bytes: number;
  manifest_xml: string;
  launch_url: string;
  completion_status: string;
  score_data: Record<string, unknown>;
  suspend_data: Record<string, unknown>;
  session_time_seconds: number;
  imported_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Video Production ──
export interface GnsVideoProject {
  id: string;
  school_id: string;
  project_id: string;
  video_type: 'lecture' | 'tutorial' | 'explainer' | 'animation' | 'screen_record' | 'introduction' | 'promo';
  resolution: string;
  fps: number;
  duration_seconds: number;
  status: 'pre_production' | 'production' | 'post_production' | 'rendering' | 'review' | 'final';
  raw_footage_urls: string[];
  project_file_url: string | null;
  render_settings: Record<string, unknown>;
  export_formats: string[];
  subtitles_enabled: boolean;
  subtitles_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsVideoScene {
  id: string;
  school_id: string;
  video_project_id: string;
  scene_number: number;
  scene_name: string;
  duration_seconds: number;
  description: string;
  storyboard_url: string | null;
  script: string;
  shot_type: string;
  camera_movement: string | null;
  bg_music_track: string | null;
  voiceover_id: string | null;
  text_overlays: Record<string, unknown>[];
  transitions: Record<string, unknown>[];
  status: 'planned' | 'filming' | 'editing' | 'review' | 'final';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsVideoRenderJob {
  id: string;
  school_id: string;
  video_project_id: string;
  job_type: 'full_render' | 'preview' | 'thumbnail' | 'subtitle_burn' | 'format_convert';
  status: 'queued' | 'rendering' | 'completed' | 'failed' | 'cancelled';
  progress_percent: number;
  output_format: string;
  output_resolution: string;
  output_url: string | null;
  output_size_bytes: number | null;
  render_time_ms: number | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsVideoStoryboard {
  id: string;
  school_id: string;
  video_project_id: string;
  storyboard_name: string;
  frame_count: number;
  frames: Record<string, unknown>[];
  total_duration_seconds: number;
  aspect_ratio: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsVideoStoryboardFrame {
  id: string;
  school_id: string;
  storyboard_id: string;
  frame_number: number;
  thumbnail_url: string | null;
  description: string;
  dialogue: string | null;
  duration_seconds: number;
  camera_angle: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsVideoSubtitleTrack {
  id: string;
  school_id: string;
  video_project_id: string;
  language: string;
  track_label: string;
  format: 'srt' | 'vtt' | 'ass' | 'embedded';
  file_url: string | null;
  auto_generated: boolean;
  status: 'generating' | 'ready' | 'reviewing' | 'published';
  segments: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsVideoCaptionSegment {
  id: string;
  school_id: string;
  subtitle_track_id: string;
  segment_index: number;
  start_ms: number;
  end_ms: number;
  text: string;
  position: string;
  style: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Animation & Motion ──
export interface GnsAnimationProject {
  id: string;
  school_id: string;
  project_id: string;
  animation_type: '2d' | '3d' | 'motion_graphics' | 'whiteboard' | 'character' | 'isometric';
  software: string;
  duration_seconds: number;
  fps: number;
  resolution: string;
  rigging_config: Record<string, unknown> | null;
  scene_file_url: string | null;
  render_settings: Record<string, unknown>;
  status: 'concept' | 'modeling' | 'rigging' | 'animation' | 'lighting' | 'rendering' | 'compositing' | 'final';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAnimationCharacter {
  id: string;
  school_id: string;
  animation_project_id: string;
  character_name: string;
  character_type: 'humanoid' | 'animal' | 'abstract' | 'mascot' | 'icon';
  model_url: string | null;
  texture_url: string | null;
  rig_url: string | null;
  emotion_states: string[];
  action_library: string[];
  speaking_animations: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAnimationAsset {
  id: string;
  school_id: string;
  animation_project_id: string;
  asset_name: string;
  asset_type: 'prop' | 'background' | 'effect' | 'particle' | 'transition' | 'text_template';
  file_url: string;
  file_format: string;
  size_px: { width: number; height: number };
  is_vector: boolean;
  layers: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAnimationKeyframe {
  id: string;
  school_id: string;
  animation_project_id: string;
  scene_id: string;
  object_id: string;
  frame_number: number;
  property: string;
  value: Record<string, unknown>;
  easing: string;
  duration_frames: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAnimationRenderSettings {
  id: string;
  school_id: string;
  animation_project_id: string;
  setting_name: string;
  resolution: string;
  fps: number;
  format: 'mp4' | 'webm' | 'gif' | 'apng' | 'lottie';
  codec: string;
  quality: 'draft' | 'standard' | 'high' | 'ultra';
  anti_aliasing: boolean;
  motion_blur: boolean;
  shadows: boolean;
  reflections: boolean;
  ambient_occlusion: boolean;
  render_time_estimate_seconds: number;
  is_preset: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Interactive Experiences ──
export interface GnsInteractiveExperience {
  id: string;
  school_id: string;
  project_id: string;
  experience_type: 'branching_scenario' | 'simulation' | 'virtual_lab' | 'game_based' | 'ar_vr' | 'escape_room';
  engine: string;
  config: Record<string, unknown>;
  assets: string[];
  scoring_rules: Record<string, unknown>;
  analytics_config: Record<string, unknown>;
  mobile_compatible: boolean;
  offline_capable: boolean;
  status: 'draft' | 'testing' | 'live' | 'archived';
  play_count: number;
  avg_completion_time_seconds: number;
  completion_rate: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsInteractiveBranchingNode {
  id: string;
  school_id: string;
  experience_id: string;
  node_id: string;
  node_type: 'decision' | 'info' | 'assessment' | 'action' | 'ending';
  title: string;
  content: Record<string, unknown>;
  choices: Record<string, unknown>[];
  conditions: Record<string, unknown>[];
  position: { x: number; y: number };
  order_index: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsInteractiveBranchingEdge {
  id: string;
  school_id: string;
  experience_id: string;
  source_node_id: string;
  target_node_id: string;
  label: string | null;
  condition: Record<string, unknown> | null;
  probability: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsInteractiveAnalytics {
  id: string;
  school_id: string;
  experience_id: string;
  session_id: string;
  learner_id: string;
  start_time: string;
  end_time: string;
  total_time_seconds: number;
  path_taken: string[];
  choices_made: Record<string, unknown>[];
  score: number;
  completed: boolean;
  drop_off_node: string | null;
  device_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsInteractiveSimulation {
  id: string;
  school_id: string;
  experience_id: string;
  simulation_type: 'physics' | 'chemistry' | 'biology' | 'economics' | 'ecology' | 'circuit' | 'math';
  engine: string;
  parameters: Record<string, unknown>;
  initial_state: Record<string, unknown>;
  time_step_ms: number;
  max_duration_seconds: number;
  variables: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Publishing & Distribution ──
export interface GnsPublishTarget {
  id: string;
  school_id: string;
  target_name: string;
  target_type: 'lms' | 'website' | 'app_store' | 'youtube' | 'vimeo' | 'social_media' | 'scorm_cloud' | 'rss';
  config: Record<string, unknown>;
  credentials_encrypted: Record<string, unknown>;
  auto_publish: boolean;
  is_active: boolean;
  last_publish_at: string | null;
  total_published: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsPublishJob {
  id: string;
  school_id: string;
  project_id: string;
  target_id: string;
  status: 'queued' | 'publishing' | 'completed' | 'failed';
  content_version: number;
  output_url: string | null;
  publish_metadata: Record<string, unknown>;
  error_message: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsContentVersion {
  id: string;
  school_id: string;
  project_id: string;
  version_number: number;
  changelog: string;
  author_id: string;
  snapshot_url: string;
  snapshot_size_bytes: number;
  diff_from_previous: Record<string, unknown>;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsContentReview {
  id: string;
  school_id: string;
  project_id: string;
  reviewer_id: string;
  review_type: 'peer' | 'admin' | 'ai_assisted' | 'accessibility' | 'quality';
  status: 'pending' | 'in_progress' | 'completed';
  overall_score: number;
  criteria_scores: Record<string, number>;
  comments: Record<string, unknown>[];
  suggestions: string[];
  approved: boolean;
  submitted_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsContentAnalytics {
  id: string;
  school_id: string;
  project_id: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  period_start: string;
  views: number;
  unique_viewers: number;
  completion_count: number;
  completion_rate: number;
  avg_time_spent_seconds: number;
  interaction_count: number;
  share_count: number;
  download_count: number;
  rating_avg: number;
  rating_count: number;
  feedback_count: number;
  error_count: number;
  device_breakdown: Record<string, number>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsContentDistribution {
  id: string;
  school_id: string;
  project_id: string;
  distribution_type: 'internal' | 'external' | 'partner' | 'public';
  channels: string[];
  audience_count: number;
  reach_count: number;
  engagement_rate: number;
  license_type: string;
  access_restrictions: Record<string, unknown>;
  analytics_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Asset Management ──
export interface GnsAssetLibrary {
  id: string;
  school_id: string;
  library_name: string;
  description: string;
  owner_id: string;
  is_public: boolean;
  asset_count: number;
  total_size_bytes: number;
  categories: string[];
  tags: string[];
  license_terms: string;
  usage_policy: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAssetCategory {
  id: string;
  school_id: string;
  library_id: string;
  category_name: string;
  parent_id: string | null;
  icon: string;
  asset_count: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAssetUsage {
  id: string;
  school_id: string;
  asset_id: string;
  used_in_project_id: string;
  used_by: string;
  used_at: string;
  usage_type: 'direct' | 'derived' | 'template';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsAssetLicense {
  id: string;
  school_id: string;
  library_id: string;
  license_name: string;
  license_type: 'free' | 'commercial' | 'educational' | 'creative_commons' | 'public_domain' | 'custom';
  terms_markdown: string;
  attribution_required: boolean;
  commercial_use: boolean;
  modification_allowed: boolean;
  share_alike: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Collaborative Editing ──
export interface GnsCollaborativeSession {
  id: string;
  school_id: string;
  project_id: string;
  session_name: string;
  host_id: string;
  participants: string[];
  max_participants: number;
  status: 'active' | 'paused' | 'ended';
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  avg_latency_ms: number;
  conflict_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCollaborativeCursor {
  id: string;
  school_id: string;
  session_id: string;
  user_id: string;
  user_name: string;
  user_color: string;
  position: Record<string, unknown>;
  selection: Record<string, unknown> | null;
  last_active_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCollaborativeEdit {
  id: string;
  school_id: string;
  session_id: string;
  user_id: string;
  edit_type: 'insert' | 'delete' | 'replace' | 'move' | 'format';
  position: Record<string, unknown>;
  content: Record<string, unknown>;
  length: number;
  timestamp: string;
  applied: boolean;
  conflict_resolved: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCollaborativeComment {
  id: string;
  school_id: string;
  project_id: string;
  author_id: string;
  content: string;
  position: Record<string, unknown> | null;
  reply_to_id: string | null;
  resolved: boolean;
  resolved_by: string | null;
  resolved_at: string | null;
  mentions: string[];
  reactions: Record<string, string[]>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsCollaborativeChangeRequest {
  id: string;
  school_id: string;
  project_id: string;
  requestor_id: string;
  title: string;
  description: string;
  change_type: 'content' | 'design' | 'structure' | 'metadata' | 'settings';
  before_snapshot: Record<string, unknown>;
  after_snapshot: Record<string, unknown>;
  status: 'proposed' | 'reviewing' | 'approved' | 'rejected' | 'merged' | 'cancelled';
  reviewer_ids: string[];
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  merge_conflicts: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Branding & White-label ──
export interface GnsBrandingProfile {
  id: string;
  school_id: string;
  profile_name: string;
  logo_url: string | null;
  logo_dark_url: string | null;
  favicon_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  font_url: string | null;
  email_header_html: string | null;
  email_footer_html: string | null;
  login_page_bg_url: string | null;
  custom_css: string | null;
  custom_js: string | null;
  domain: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GnsWhiteLabelConfig {
  id: string;
  school_id: string;
  branding_profile_id: string;
  config_key: string;
  config_value: string;
  config_type: 'string' | 'number' | 'boolean' | 'json' | 'url';
  description: string;
  is_required: boolean;
  validation_rules: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Table Name Map ──
export const GNS_TABLE_NAMES = {
  STUDIO_WORKSPACE: 'gns_studio_workspaces',
  STUDIO_PROJECT: 'gns_studio_projects',
  STUDIO_PROJECT_MILESTONE: 'gns_studio_project_milestones',
  AI_CONTENT_PIPELINE: 'gns_ai_content_pipelines',
  AI_TEXT_GENERATION: 'gns_ai_text_generations',
  AI_IMAGE_GENERATION: 'gns_ai_image_generations',
  AI_VIDEO_GENERATION: 'gns_ai_video_generations',
  AI_AUDIO_GENERATION: 'gns_ai_audio_generations',
  AI_TTS_CONFIG: 'gns_ai_tts_configs',
  AI_VOICE_MODEL: 'gns_ai_voice_models',
  CONTENT_TEMPLATE: 'gns_content_templates',
  TEMPLATE_VARIABLE: 'gns_template_variables',
  TEMPLATE_CATEGORY: 'gns_template_categories',
  TEMPLATE_COLLECTION: 'gns_template_collections',
  MEDIA_ASSET: 'gns_media_assets',
  MEDIA_FOLDER: 'gns_media_folders',
  MEDIA_TAG: 'gns_media_tags',
  MEDIA_PROCESSING_JOB: 'gns_media_processing_jobs',
  MEDIA_CDN_CONFIG: 'gns_media_cdn_configs',
  DESIGN_SYSTEM: 'gns_design_systems',
  DESIGN_COMPONENT: 'gns_design_components',
  DESIGN_COLOR_PALETTE: 'gns_design_color_palettes',
  DESIGN_ICON_SET: 'gns_design_icon_sets',
  DESIGN_ICON: 'gns_design_icons',
  DESIGN_STYLE_GUIDE: 'gns_design_style_guides',
  COURSEWARE_MODULE: 'gns_courseware_modules',
  COURSEWARE_CONTENT_BLOCK: 'gns_courseware_content_blocks',
  COURSEWARE_QUIZ: 'gns_courseware_quizzes',
  COURSEWARE_LAB: 'gns_courseware_labs',
  COURSEWARE_INTERACTIVE_ELEMENT: 'gns_courseware_interactive_elements',
  COURSEWARE_SCORM_PACKAGE: 'gns_courseware_scorm_packages',
  VIDEO_PROJECT: 'gns_video_projects',
  VIDEO_SCENE: 'gns_video_scenes',
  VIDEO_RENDER_JOB: 'gns_video_render_jobs',
  VIDEO_STORYBOARD: 'gns_video_storyboards',
  VIDEO_STORYBOARD_FRAME: 'gns_video_storyboard_frames',
  VIDEO_SUBTITLE_TRACK: 'gns_video_subtitle_tracks',
  VIDEO_CAPTION_SEGMENT: 'gns_video_caption_segments',
  ANIMATION_PROJECT: 'gns_animation_projects',
  ANIMATION_CHARACTER: 'gns_animation_characters',
  ANIMATION_ASSET: 'gns_animation_assets',
  ANIMATION_KEYFRAME: 'gns_animation_keyframes',
  ANIMATION_RENDER_SETTINGS: 'gns_animation_render_settings',
  INTERACTIVE_EXPERIENCE: 'gns_interactive_experiences',
  INTERACTIVE_BRANCHING_NODE: 'gns_interactive_branching_nodes',
  INTERACTIVE_BRANCHING_EDGE: 'gns_interactive_branching_edges',
  INTERACTIVE_ANALYTICS: 'gns_interactive_analytics',
  INTERACTIVE_SIMULATION: 'gns_interactive_simulations',
  PUBLISH_TARGET: 'gns_publish_targets',
  PUBLISH_JOB: 'gns_publish_jobs',
  CONTENT_VERSION: 'gns_content_versions',
  CONTENT_REVIEW: 'gns_content_reviews',
  CONTENT_ANALYTICS: 'gns_content_analytics',
  CONTENT_DISTRIBUTION: 'gns_content_distributions',
  ASSET_LIBRARY: 'gns_asset_libraries',
  ASSET_CATEGORY: 'gns_asset_categories',
  ASSET_USAGE: 'gns_asset_usages',
  ASSET_LICENSE: 'gns_asset_licenses',
  COLLABORATIVE_SESSION: 'gns_collaborative_sessions',
  COLLABORATIVE_CURSOR: 'gns_collaborative_cursors',
  COLLABORATIVE_EDIT: 'gns_collaborative_edits',
  COLLABORATIVE_COMMENT: 'gns_collaborative_comments',
  COLLABORATIVE_CHANGE_REQUEST: 'gns_collaborative_change_requests',
  BRANDING_PROFILE: 'gns_branding_profiles',
  WHITE_LABEL_CONFIG: 'gns_white_label_configs',
} as const;

// ── Repository Interface ──
export interface AEIP7Repository {
  // Studio
  studioWorkspaces: CrudRepository<GnsStudioWorkspace>;
  studioProjects: CrudRepository<GnsStudioProject>;
  studioProjectMilestones: CrudRepository<GnsStudioProjectMilestone>;
  // AI Generation
  aiContentPipelines: CrudRepository<GnsAIContentPipeline>;
  aiTextGenerations: CrudRepository<GnsAITextGeneration>;
  aiImageGenerations: CrudRepository<GnsAIImageGeneration>;
  aiVideoGenerations: CrudRepository<GnsAIVideoGeneration>;
  aiAudioGenerations: CrudRepository<GnsAIAudioGeneration>;
  aiTTSConfigs: CrudRepository<GnsAITTSConfiguration>;
  aiVoiceModels: CrudRepository<GnsAIVoiceModel>;
  // Templates
  contentTemplates: CrudRepository<GnsContentTemplate>;
  templateVariables: CrudRepository<GnsTemplateVariable>;
  templateCategories: CrudRepository<GnsTemplateCategory>;
  templateCollections: CrudRepository<GnsTemplateCollection>;
  // Media
  mediaAssets: CrudRepository<GnsMediaAsset>;
  mediaFolders: CrudRepository<GnsMediaFolder>;
  mediaTags: CrudRepository<GnsMediaTag>;
  mediaProcessingJobs: CrudRepository<GnsMediaProcessingJob>;
  mediaCDNConfigs: CrudRepository<GnsMediaCDNConfig>;
  // Design
  designSystems: CrudRepository<GnsDesignSystem>;
  designComponents: CrudRepository<GnsDesignComponent>;
  designColorPalettes: CrudRepository<GnsDesignColorPalette>;
  designIconSets: CrudRepository<GnsDesignIconSet>;
  designIcons: CrudRepository<GnsDesignIcon>;
  designStyleGuides: CrudRepository<GnsDesignStyleGuide>;
  // Courseware
  coursewareModules: CrudRepository<GnsCoursewareModule>;
  coursewareContentBlocks: CrudRepository<GnsCoursewareContentBlock>;
  coursewareQuizzes: CrudRepository<GnsCoursewareQuiz>;
  coursewareLabs: CrudRepository<GnsCoursewareLab>;
  coursewareInteractiveElements: CrudRepository<GnsCoursewareInteractiveElement>;
  coursewareSCORMPackages: CrudRepository<GnsCoursewareSCORMPackage>;
  // Video
  videoProjects: CrudRepository<GnsVideoProject>;
  videoScenes: CrudRepository<GnsVideoScene>;
  videoRenderJobs: CrudRepository<GnsVideoRenderJob>;
  videoStoryboards: CrudRepository<GnsVideoStoryboard>;
  videoStoryboardFrames: CrudRepository<GnsVideoStoryboardFrame>;
  videoSubtitleTracks: CrudRepository<GnsVideoSubtitleTrack>;
  videoCaptionSegments: CrudRepository<GnsVideoCaptionSegment>;
  // Animation
  animationProjects: CrudRepository<GnsAnimationProject>;
  animationCharacters: CrudRepository<GnsAnimationCharacter>;
  animationAssets: CrudRepository<GnsAnimationAsset>;
  animationKeyframes: CrudRepository<GnsAnimationKeyframe>;
  animationRenderSettings: CrudRepository<GnsAnimationRenderSettings>;
  // Interactive
  interactiveExperiences: CrudRepository<GnsInteractiveExperience>;
  interactiveBranchingNodes: CrudRepository<GnsInteractiveBranchingNode>;
  interactiveBranchingEdges: CrudRepository<GnsInteractiveBranchingEdge>;
  interactiveAnalytics: CrudRepository<GnsInteractiveAnalytics>;
  interactiveSimulations: CrudRepository<GnsInteractiveSimulation>;
  // Publishing
  publishTargets: CrudRepository<GnsPublishTarget>;
  publishJobs: CrudRepository<GnsPublishJob>;
  contentVersions: CrudRepository<GnsContentVersion>;
  contentReviews: CrudRepository<GnsContentReview>;
  contentAnalytics: CrudRepository<GnsContentAnalytics>;
  contentDistributions: CrudRepository<GnsContentDistribution>;
  // Assets
  assetLibraries: CrudRepository<GnsAssetLibrary>;
  assetCategories: CrudRepository<GnsAssetCategory>;
  assetUsages: CrudRepository<GnsAssetUsage>;
  assetLicenses: CrudRepository<GnsAssetLicense>;
  // Collaboration
  collaborativeSessions: CrudRepository<GnsCollaborativeSession>;
  collaborativeCursors: CrudRepository<GnsCollaborativeCursor>;
  collaborativeEdits: CrudRepository<GnsCollaborativeEdit>;
  collaborativeComments: CrudRepository<GnsCollaborativeComment>;
  collaborativeChangeRequests: CrudRepository<GnsCollaborativeChangeRequest>;
  // Branding
  brandingProfiles: CrudRepository<GnsBrandingProfile>;
  whiteLabelConfigs: CrudRepository<GnsWhiteLabelConfig>;
}

// ── Factory Function ──
export function createAEIP7Repository(supabase: SupabaseClient): AEIP7Repository {
  return {
    studioWorkspaces: createCrudRepository<GnsStudioWorkspace>(supabase, GNS_TABLE_NAMES.STUDIO_WORKSPACE),
    studioProjects: createCrudRepository<GnsStudioProject>(supabase, GNS_TABLE_NAMES.STUDIO_PROJECT),
    studioProjectMilestones: createCrudRepository<GnsStudioProjectMilestone>(supabase, GNS_TABLE_NAMES.STUDIO_PROJECT_MILESTONE),
    aiContentPipelines: createCrudRepository<GnsAIContentPipeline>(supabase, GNS_TABLE_NAMES.AI_CONTENT_PIPELINE),
    aiTextGenerations: createCrudRepository<GnsAITextGeneration>(supabase, GNS_TABLE_NAMES.AI_TEXT_GENERATION),
    aiImageGenerations: createCrudRepository<GnsAIImageGeneration>(supabase, GNS_TABLE_NAMES.AI_IMAGE_GENERATION),
    aiVideoGenerations: createCrudRepository<GnsAIVideoGeneration>(supabase, GNS_TABLE_NAMES.AI_VIDEO_GENERATION),
    aiAudioGenerations: createCrudRepository<GnsAIAudioGeneration>(supabase, GNS_TABLE_NAMES.AI_AUDIO_GENERATION),
    aiTTSConfigs: createCrudRepository<GnsAITTSConfiguration>(supabase, GNS_TABLE_NAMES.AI_TTS_CONFIG),
    aiVoiceModels: createCrudRepository<GnsAIVoiceModel>(supabase, GNS_TABLE_NAMES.AI_VOICE_MODEL),
    contentTemplates: createCrudRepository<GnsContentTemplate>(supabase, GNS_TABLE_NAMES.CONTENT_TEMPLATE),
    templateVariables: createCrudRepository<GnsTemplateVariable>(supabase, GNS_TABLE_NAMES.TEMPLATE_VARIABLE),
    templateCategories: createCrudRepository<GnsTemplateCategory>(supabase, GNS_TABLE_NAMES.TEMPLATE_CATEGORY),
    templateCollections: createCrudRepository<GnsTemplateCollection>(supabase, GNS_TABLE_NAMES.TEMPLATE_COLLECTION),
    mediaAssets: createCrudRepository<GnsMediaAsset>(supabase, GNS_TABLE_NAMES.MEDIA_ASSET),
    mediaFolders: createCrudRepository<GnsMediaFolder>(supabase, GNS_TABLE_NAMES.MEDIA_FOLDER),
    mediaTags: createCrudRepository<GnsMediaTag>(supabase, GNS_TABLE_NAMES.MEDIA_TAG),
    mediaProcessingJobs: createCrudRepository<GnsMediaProcessingJob>(supabase, GNS_TABLE_NAMES.MEDIA_PROCESSING_JOB),
    mediaCDNConfigs: createCrudRepository<GnsMediaCDNConfig>(supabase, GNS_TABLE_NAMES.MEDIA_CDN_CONFIG),
    designSystems: createCrudRepository<GnsDesignSystem>(supabase, GNS_TABLE_NAMES.DESIGN_SYSTEM),
    designComponents: createCrudRepository<GnsDesignComponent>(supabase, GNS_TABLE_NAMES.DESIGN_COMPONENT),
    designColorPalettes: createCrudRepository<GnsDesignColorPalette>(supabase, GNS_TABLE_NAMES.DESIGN_COLOR_PALETTE),
    designIconSets: createCrudRepository<GnsDesignIconSet>(supabase, GNS_TABLE_NAMES.DESIGN_ICON_SET),
    designIcons: createCrudRepository<GnsDesignIcon>(supabase, GNS_TABLE_NAMES.DESIGN_ICON),
    designStyleGuides: createCrudRepository<GnsDesignStyleGuide>(supabase, GNS_TABLE_NAMES.DESIGN_STYLE_GUIDE),
    coursewareModules: createCrudRepository<GnsCoursewareModule>(supabase, GNS_TABLE_NAMES.COURSEWARE_MODULE),
    coursewareContentBlocks: createCrudRepository<GnsCoursewareContentBlock>(supabase, GNS_TABLE_NAMES.COURSEWARE_CONTENT_BLOCK),
    coursewareQuizzes: createCrudRepository<GnsCoursewareQuiz>(supabase, GNS_TABLE_NAMES.COURSEWARE_QUIZ),
    coursewareLabs: createCrudRepository<GnsCoursewareLab>(supabase, GNS_TABLE_NAMES.COURSEWARE_LAB),
    coursewareInteractiveElements: createCrudRepository<GnsCoursewareInteractiveElement>(supabase, GNS_TABLE_NAMES.COURSEWARE_INTERACTIVE_ELEMENT),
    coursewareSCORMPackages: createCrudRepository<GnsCoursewareSCORMPackage>(supabase, GNS_TABLE_NAMES.COURSEWARE_SCORM_PACKAGE),
    videoProjects: createCrudRepository<GnsVideoProject>(supabase, GNS_TABLE_NAMES.VIDEO_PROJECT),
    videoScenes: createCrudRepository<GnsVideoScene>(supabase, GNS_TABLE_NAMES.VIDEO_SCENE),
    videoRenderJobs: createCrudRepository<GnsVideoRenderJob>(supabase, GNS_TABLE_NAMES.VIDEO_RENDER_JOB),
    videoStoryboards: createCrudRepository<GnsVideoStoryboard>(supabase, GNS_TABLE_NAMES.VIDEO_STORYBOARD),
    videoStoryboardFrames: createCrudRepository<GnsVideoStoryboardFrame>(supabase, GNS_TABLE_NAMES.VIDEO_STORYBOARD_FRAME),
    videoSubtitleTracks: createCrudRepository<GnsVideoSubtitleTrack>(supabase, GNS_TABLE_NAMES.VIDEO_SUBTITLE_TRACK),
    videoCaptionSegments: createCrudRepository<GnsVideoCaptionSegment>(supabase, GNS_TABLE_NAMES.VIDEO_CAPTION_SEGMENT),
    animationProjects: createCrudRepository<GnsAnimationProject>(supabase, GNS_TABLE_NAMES.ANIMATION_PROJECT),
    animationCharacters: createCrudRepository<GnsAnimationCharacter>(supabase, GNS_TABLE_NAMES.ANIMATION_CHARACTER),
    animationAssets: createCrudRepository<GnsAnimationAsset>(supabase, GNS_TABLE_NAMES.ANIMATION_ASSET),
    animationKeyframes: createCrudRepository<GnsAnimationKeyframe>(supabase, GNS_TABLE_NAMES.ANIMATION_KEYFRAME),
    animationRenderSettings: createCrudRepository<GnsAnimationRenderSettings>(supabase, GNS_TABLE_NAMES.ANIMATION_RENDER_SETTINGS),
    interactiveExperiences: createCrudRepository<GnsInteractiveExperience>(supabase, GNS_TABLE_NAMES.INTERACTIVE_EXPERIENCE),
    interactiveBranchingNodes: createCrudRepository<GnsInteractiveBranchingNode>(supabase, GNS_TABLE_NAMES.INTERACTIVE_BRANCHING_NODE),
    interactiveBranchingEdges: createCrudRepository<GnsInteractiveBranchingEdge>(supabase, GNS_TABLE_NAMES.INTERACTIVE_BRANCHING_EDGE),
    interactiveAnalytics: createCrudRepository<GnsInteractiveAnalytics>(supabase, GNS_TABLE_NAMES.INTERACTIVE_ANALYTICS),
    interactiveSimulations: createCrudRepository<GnsInteractiveSimulation>(supabase, GNS_TABLE_NAMES.INTERACTIVE_SIMULATION),
    publishTargets: createCrudRepository<GnsPublishTarget>(supabase, GNS_TABLE_NAMES.PUBLISH_TARGET),
    publishJobs: createCrudRepository<GnsPublishJob>(supabase, GNS_TABLE_NAMES.PUBLISH_JOB),
    contentVersions: createCrudRepository<GnsContentVersion>(supabase, GNS_TABLE_NAMES.CONTENT_VERSION),
    contentReviews: createCrudRepository<GnsContentReview>(supabase, GNS_TABLE_NAMES.CONTENT_REVIEW),
    contentAnalytics: createCrudRepository<GnsContentAnalytics>(supabase, GNS_TABLE_NAMES.CONTENT_ANALYTICS),
    contentDistributions: createCrudRepository<GnsContentDistribution>(supabase, GNS_TABLE_NAMES.CONTENT_DISTRIBUTION),
    assetLibraries: createCrudRepository<GnsAssetLibrary>(supabase, GNS_TABLE_NAMES.ASSET_LIBRARY),
    assetCategories: createCrudRepository<GnsAssetCategory>(supabase, GNS_TABLE_NAMES.ASSET_CATEGORY),
    assetUsages: createCrudRepository<GnsAssetUsage>(supabase, GNS_TABLE_NAMES.ASSET_USAGE),
    assetLicenses: createCrudRepository<GnsAssetLicense>(supabase, GNS_TABLE_NAMES.ASSET_LICENSE),
    collaborativeSessions: createCrudRepository<GnsCollaborativeSession>(supabase, GNS_TABLE_NAMES.COLLABORATIVE_SESSION),
    collaborativeCursors: createCrudRepository<GnsCollaborativeCursor>(supabase, GNS_TABLE_NAMES.COLLABORATIVE_CURSOR),
    collaborativeEdits: createCrudRepository<GnsCollaborativeEdit>(supabase, GNS_TABLE_NAMES.COLLABORATIVE_EDIT),
    collaborativeComments: createCrudRepository<GnsCollaborativeComment>(supabase, GNS_TABLE_NAMES.COLLABORATIVE_COMMENT),
    collaborativeChangeRequests: createCrudRepository<GnsCollaborativeChangeRequest>(supabase, GNS_TABLE_NAMES.COLLABORATIVE_CHANGE_REQUEST),
    brandingProfiles: createCrudRepository<GnsBrandingProfile>(supabase, GNS_TABLE_NAMES.BRANDING_PROFILE),
    whiteLabelConfigs: createCrudRepository<GnsWhiteLabelConfig>(supabase, GNS_TABLE_NAMES.WHITE_LABEL_CONFIG),
  };
}
