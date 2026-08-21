import { z } from 'zod';

const schoolId = z.string().uuid();

// =============================================================================
// Graph Node
// =============================================================================

export const CreateGraphNodeSchema = z.object({
  schoolId,
  type: z.enum(['entity', 'concept', 'skill', 'competency', 'resource', 'assessment', 'course', 'module', 'topic', 'subtopic', 'standard', 'outcome']),
  label: z.string().min(1),
  description: z.string().min(1),
  properties: z.record(z.unknown()).optional(),
  embedding: z.array(z.number()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateGraphNodeSchema = CreateGraphNodeSchema.partial();

// =============================================================================
// Graph Edge
// =============================================================================

export const CreateGraphEdgeSchema = z.object({
  schoolId,
  source_id: z.string().uuid(),
  target_id: z.string().uuid(),
  type: z.enum(['prerequisite', 'teaches', 'learns', 'assesses', 'contains', 'relates_to', 'depends_on', 'feeds_into', 'equivalent', 'similar', 'contradicts', 'supports']),
  weight: z.number().min(0).max(1),
  properties: z.record(z.unknown()).optional(),
  bidirectional: z.boolean(),
});

export const UpdateGraphEdgeSchema = CreateGraphEdgeSchema.partial();

// =============================================================================
// Graph Community
// =============================================================================

export const CreateGraphCommunitySchema = z.object({
  schoolId,
  name: z.string().min(1),
  node_ids: z.array(z.string().uuid()),
  edge_ids: z.array(z.string().uuid()),
  density: z.number().min(0).max(1),
  modularity: z.number().min(0).max(1),
  algorithm: z.enum(['louvain', 'label_propagation', 'girvan_newman', 'spectral', 'clique']),
});

export const UpdateGraphCommunitySchema = CreateGraphCommunitySchema.partial();

// =============================================================================
// Graph Query
// =============================================================================

export const CreateGraphQuerySchema = z.object({
  schoolId,
  query: z.string().min(1),
  language: z.enum(['cypher', 'gremlin', 'sparql', 'graphql', 'sql', 'natural_language']),
  type: z.enum(['match', 'aggregate', 'path', 'subgraph', 'pattern', 'anomaly']),
  parameters: z.record(z.unknown()).optional(),
});

export const UpdateGraphQuerySchema = CreateGraphQuerySchema.partial();

// =============================================================================
// Graph Search
// =============================================================================

export const CreateGraphSearchSchema = z.object({
  schoolId,
  query: z.string().min(1),
  type: z.enum(['keyword', 'semantic', 'graph', 'hybrid', 'fuzzy', 'exact', 'phonetic']),
  filters: z.record(z.unknown()).optional(),
});

export const UpdateGraphSearchSchema = CreateGraphSearchSchema.partial();

// =============================================================================
// Graph Recommendation
// =============================================================================

export const CreateGraphRecommendationSchema = z.object({
  schoolId,
  entity_id: z.string().uuid(),
  entity_type: z.string().min(1),
  type: z.enum(['course', 'skill', 'resource', 'path', 'mentor', 'peer', 'opportunity']),
  reason: z.enum(['prerequisite', 'gap', 'interest', 'performance', 'career', 'trend', 'popularity']),
  score: z.number().min(0).max(1),
  confidence: z.enum(['low', 'medium', 'high', 'very_high']),
  explanation: z.string().min(1),
  expires_at: z.string(),
});

export const UpdateGraphRecommendationSchema = CreateGraphRecommendationSchema.partial();

// =============================================================================
// Graph Index
// =============================================================================

export const CreateGraphIndexSchema = z.object({
  schoolId,
  name: z.string().min(1),
  type: z.enum(['full_text', 'vector', 'graph', 'temporal', 'geospatial', 'hash']),
  fields: z.array(z.string()),
});

export const UpdateGraphIndexSchema = CreateGraphIndexSchema.partial();

// =============================================================================
// Graph Schema
// =============================================================================

export const CreateGraphSchemaSchema = z.object({
  schoolId,
  name: z.string().min(1),
  version: z.string().min(1),
  node_types: z.array(z.enum(['entity', 'concept', 'skill', 'competency', 'resource', 'assessment', 'course', 'module', 'topic', 'subtopic', 'standard', 'outcome'])),
  edge_types: z.array(z.enum(['prerequisite', 'teaches', 'learns', 'assesses', 'contains', 'relates_to', 'depends_on', 'feeds_into', 'equivalent', 'similar', 'contradicts', 'supports'])),
  constraints: z.array(z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    definition: z.record(z.unknown()),
    enforced: z.boolean(),
  })),
});

export const UpdateGraphSchemaSchema = CreateGraphSchemaSchema.partial();

// =============================================================================
// Graph Visualization
// =============================================================================

export const CreateGraphVisualizationSchema = z.object({
  schoolId,
  name: z.string().min(1),
  type: z.enum(['node_link', 'adjacency_matrix', 'arc_diagram', 'chord', 'sankey', 'tree_map']),
  layout: z.enum(['force_directed', 'hierarchical', 'circular', 'grid', 'tree', 'radial']),
  mode: z.enum(['static', 'animated', 'interactive', 'real_time', 'ar', 'vr']),
  config: z.object({
    width: z.number().int().min(1),
    height: z.number().int().min(1),
    zoom: z.boolean(),
    pan: z.boolean(),
    animations: z.boolean(),
    labels: z.boolean(),
    tooltips: z.boolean(),
    legend: z.boolean(),
    theme: z.string().min(1),
  }),
  data: z.record(z.unknown()),
});

export const UpdateGraphVisualizationSchema = CreateGraphVisualizationSchema.partial();

// =============================================================================
// Graph Dashboard
// =============================================================================

export const CreateGraphDashboardSchema = z.object({
  schoolId,
  name: z.string().min(1),
  widgets: z.array(z.object({
    id: z.string().uuid(),
    type: z.string().min(1),
    title: z.string().min(1),
    config: z.record(z.unknown()),
    data_source: z.string().min(1),
    position: z.object({
      x: z.number().int().min(0),
      y: z.number().int().min(0),
      w: z.number().int().min(1),
      h: z.number().int().min(1),
    }),
  })),
  layout: z.array(z.record(z.unknown())),
  is_default: z.boolean(),
});

export const UpdateGraphDashboardSchema = CreateGraphDashboardSchema.partial();

// =============================================================================
// Knowledge Node
// =============================================================================

export const CreateKnowledgeNodeSchema = z.object({
  schoolId,
  type: z.string().min(1),
  label: z.string().min(1),
  content: z.string().min(1),
  level: z.enum(['explicit', 'tacit', 'embedded', 'emergent']),
  domain: z.string().min(1),
  tags: z.array(z.string()),
  embedding: z.array(z.number()),
  references: z.array(z.string()),
});

export const UpdateKnowledgeNodeSchema = CreateKnowledgeNodeSchema.partial();

// =============================================================================
// Knowledge Edge
// =============================================================================

export const CreateKnowledgeEdgeSchema = z.object({
  source_id: z.string().uuid(),
  target_id: z.string().uuid(),
  type: z.enum(['hypernym', 'hyponym', 'synonym', 'antonym', 'meronym', 'holonym', 'troponym']),
  weight: z.number().min(0).max(1),
  context: z.string().min(1),
  bidirectional: z.boolean(),
});

export const UpdateKnowledgeEdgeSchema = CreateKnowledgeEdgeSchema.partial();

// =============================================================================
// Skill Gap
// =============================================================================

export const CreateSkillGapSchema = z.object({
  schoolId,
  student_id: z.string().uuid(),
  skill_id: z.string().uuid(),
  current_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert', 'master']),
  target_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert', 'master']),
  gap: z.number().min(0),
  priority: z.string().min(1),
  recommended_resources: z.array(z.string()),
  estimated_time_hours: z.number().min(0),
});

export const UpdateSkillGapSchema = CreateSkillGapSchema.partial();

// =============================================================================
// Competency Map
// =============================================================================

export const CreateCompetencyMapSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  competencies: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(['technical', 'soft', 'domain', 'methodological', 'digital', 'language', 'leadership', 'creative']),
    level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert', 'master']),
    required: z.boolean(),
  })),
  total_competencies: z.number().int().min(0),
  average_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert', 'master']),
});

export const UpdateCompetencyMapSchema = CreateCompetencyMapSchema.partial();

// =============================================================================
// Competency Progress
// =============================================================================

export const CreateCompetencyProgressSchema = z.object({
  schoolId,
  student_id: z.string().uuid(),
  competency_id: z.string().uuid(),
  status: z.enum(['not_started', 'in_progress', 'achieved', 'expired', 'revoked']),
  current_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert', 'master']),
  target_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert', 'master']),
  progress_percent: z.number().min(0).max(100),
  started_at: z.string(),
  achieved_at: z.string().optional(),
  expires_at: z.string().optional(),
  evidence: z.array(z.string()),
});

export const UpdateCompetencyProgressSchema = CreateCompetencyProgressSchema.partial();

// =============================================================================
// Learning Path
// =============================================================================

export const CreateLearningPathSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['linear', 'branching', 'adaptive', 'modular', 'competency_based']),
  modules: z.array(z.object({
    id: z.string().uuid(),
    path_id: z.string().uuid(),
    name: z.string().min(1),
    description: z.string().min(1),
    order: z.number().int().min(0),
    duration_hours: z.number().min(0),
    prerequisites: z.array(z.string()),
    outcomes: z.array(z.object({
      id: z.string().uuid(),
      module_id: z.string().uuid(),
      description: z.string().min(1),
      competency_id: z.string().uuid(),
      target_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert', 'master']),
      assessment_method: z.string().min(1),
    })),
    resources: z.array(z.string()),
    assessment_id: z.string().uuid(),
    completed_by_count: z.number().int().min(0),
  })),
  total_modules: z.number().int().min(1),
  estimated_hours: z.number().min(0),
  difficulty: z.string().min(1),
  tags: z.array(z.string()),
  enrollment_count: z.number().int().min(0),
  completion_rate: z.number().min(0).max(100),
  rating: z.number().min(0).max(5),
});

export const UpdateLearningPathSchema = CreateLearningPathSchema.partial();

// =============================================================================
// Alumni Network
// =============================================================================

export const CreateAlumniNetworkSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  member_count: z.number().int().min(0),
  total_donations: z.number().min(0),
  events_hosted: z.number().int().min(0),
  mentors_active: z.number().int().min(0),
});

export const UpdateAlumniNetworkSchema = CreateAlumniNetworkSchema.partial();

// =============================================================================
// Alumni Event
// =============================================================================

export const CreateAlumniEventSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  location: z.string().min(1),
  attendee_count: z.number().int().min(0),
  organizer_id: z.string().uuid(),
  sponsors: z.array(z.string()),
});

export const UpdateAlumniEventSchema = CreateAlumniEventSchema.partial();

// =============================================================================
// Alumni Contribution
// =============================================================================

export const CreateAlumniContributionSchema = z.object({
  schoolId,
  alumni_id: z.string().uuid(),
  type: z.string().min(1),
  amount: z.number().min(0),
  currency: z.string().min(3).max(3),
  purpose: z.string().min(1),
  campaign_id: z.string().uuid(),
  anonymous: z.boolean(),
});

export const UpdateAlumniContributionSchema = CreateAlumniContributionSchema.partial();

// =============================================================================
// Research Collaboration
// =============================================================================

export const CreateResearchCollaborationSchema = z.object({
  schoolId,
  title: z.string().min(1),
  description: z.string().min(1),
  researchers: z.array(z.string().uuid()),
  institutions: z.array(z.string()),
  start_date: z.string(),
  end_date: z.string().optional(),
  status: z.string().min(1),
  funding: z.number().min(0),
  publications: z.array(z.string()),
});

export const UpdateResearchCollaborationSchema = CreateResearchCollaborationSchema.partial();

// =============================================================================
// Research Trend
// =============================================================================

export const CreateResearchTrendSchema = z.object({
  topic: z.string().min(1),
  domain: z.string().min(1),
  growth_rate: z.number(),
  publication_count: z.number().int().min(0),
  top_keywords: z.array(z.string()),
  top_researchers: z.array(z.string()),
  period: z.string().min(1),
});

export const UpdateResearchTrendSchema = CreateResearchTrendSchema.partial();
