import { z } from 'zod';

const schoolId = z.string().uuid();

// =============================================================================
// National Dashboard
// =============================================================================

export const CreateNationalDashboardSchema = z.object({
  schoolId,
  type: z.literal('NATIONAL'),
  total_schools: z.number().int().min(0),
  total_students: z.number().int().min(0),
  total_teachers: z.number().int().min(0),
  national_budget: z.number().min(0),
  strategic_goals: z.array(z.enum(['QUALITY', 'EQUITY', 'EFFICIENCY', 'INNOVATION', 'SUSTAINABILITY', 'SAFETY'])),
  national_priorities: z.array(z.enum(['ACCESS', 'QUALITY', 'RELEVANCE', 'EFFICIENCY', 'GOVERNANCE', 'INNOVATION'])),
  refresh_frequency: z.enum(['REALTIME', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY']),
});

export const UpdateNationalDashboardSchema = CreateNationalDashboardSchema.partial();

// =============================================================================
// Ministry Dashboard
// =============================================================================

export const CreateMinistryDashboardSchema = z.object({
  schoolId,
  type: z.literal('MINISTRY'),
  ministry_name: z.string().min(1),
  minister_name: z.string().min(1),
  portfolio: z.string().min(1),
  total_schools: z.number().int().min(0),
  total_students: z.number().int().min(0),
  total_teachers: z.number().int().min(0),
  budget_allocated: z.number().min(0),
  budget_spent: z.number().min(0),
});

export const UpdateMinistryDashboardSchema = CreateMinistryDashboardSchema.partial();

// =============================================================================
// Regional Dashboard
// =============================================================================

export const CreateRegionalDashboardSchema = z.object({
  schoolId,
  type: z.literal('REGIONAL'),
  region: z.string().min(1),
  region_code: z.string().min(1),
  governor: z.string().min(1),
  total_districts: z.number().int().min(0),
  total_schools: z.number().int().min(0),
  total_students: z.number().int().min(0),
  total_teachers: z.number().int().min(0),
  regional_budget: z.number().min(0),
  districts: z.array(z.string()),
});

export const UpdateRegionalDashboardSchema = CreateRegionalDashboardSchema.partial();

// =============================================================================
// Policy Dashboard
// =============================================================================

export const CreatePolicyDashboardSchema = z.object({
  schoolId,
  type: z.literal('POLICY'),
  active_policies: z.number().int().min(0),
  pending_policies: z.number().int().min(0),
  expired_policies: z.number().int().min(0),
  total_impact_score: z.number().min(0),
});

export const UpdatePolicyDashboardSchema = CreatePolicyDashboardSchema.partial();

// =============================================================================
// Executive Dashboard
// =============================================================================

export const CreateExecutiveDashboardSchema = z.object({
  schoolId,
  type: z.literal('EXECUTIVE'),
  executive_name: z.string().min(1),
  role: z.string().min(1),
  widgets: z.array(z.object({
    id: z.string().uuid(),
    type: z.string().min(1),
    title: z.string().min(1),
    query: z.string().min(1),
    config: z.record(z.unknown()),
    position: z.object({
      x: z.number().int().min(0),
      y: z.number().int().min(0),
      col: z.number().int().min(1),
      row: z.number().int().min(1),
    }),
    size: z.object({
      width: z.number().int().min(1),
      height: z.number().int().min(1),
    }),
  })),
  filters: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(['DATE', 'REGION', 'SCHOOL_TYPE', 'LEVEL', 'GENDER', 'PROGRAM', 'STATUS']),
    name: z.string().min(1),
    options: z.array(z.string()),
    required: z.boolean(),
  })),
  last_refreshed: z.string(),
});

export const UpdateExecutiveDashboardSchema = CreateExecutiveDashboardSchema.partial();

// =============================================================================
// National KPI
// =============================================================================

export const CreateNationalKPISchema = z.object({
  schoolId,
  name: z.string().min(1),
  category: z.enum(['EDUCATION', 'FINANCE', 'INFRASTRUCTURE', 'EMPLOYMENT', 'HEALTH', 'SAFETY', 'SUSTAINABILITY', 'INNOVATION']),
  status: z.enum(['ON_TRACK', 'AT_RISK', 'OFF_TRACK', 'CRITICAL', 'NOT_MEASURED']),
  trend: z.enum(['IMPROVING', 'STABLE', 'DECLINING', 'VOLATILE', 'SEASONAL']),
  metric: z.object({
    current: z.number(),
    previous: z.number(),
    target: z.number(),
    unit: z.string().min(1),
    change_percent: z.number(),
    change_direction: z.enum(['IMPROVING', 'STABLE', 'DECLINING', 'VOLATILE', 'SEASONAL']),
  }),
  national_target: z.number(),
  national_average: z.number(),
  regions_above_target: z.number().int().min(0),
  regions_below_target: z.number().int().min(0),
  last_measured: z.string(),
  data_source: z.enum(['DATABASE', 'API', 'SURVEY', 'IOT', 'MANUAL', 'EXTERNAL', 'AI']),
  description: z.string().min(1),
});

export const UpdateNationalKPISchema = CreateNationalKPISchema.partial();

// =============================================================================
// Regional KPI
// =============================================================================

export const CreateRegionalKPISchema = z.object({
  schoolId,
  region: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['EDUCATION', 'FINANCE', 'INFRASTRUCTURE', 'EMPLOYMENT', 'HEALTH', 'SAFETY', 'SUSTAINABILITY', 'INNOVATION']),
  status: z.enum(['ON_TRACK', 'AT_RISK', 'OFF_TRACK', 'CRITICAL', 'NOT_MEASURED']),
  trend: z.enum(['IMPROVING', 'STABLE', 'DECLINING', 'VOLATILE', 'SEASONAL']),
  metric: z.object({
    current: z.number(),
    previous: z.number(),
    target: z.number(),
    unit: z.string().min(1),
    change_percent: z.number(),
    change_direction: z.enum(['IMPROVING', 'STABLE', 'DECLINING', 'VOLATILE', 'SEASONAL']),
  }),
  national_ranking: z.number().int().min(0),
  regional_ranking: z.number().int().min(0),
  districts_above_target: z.number().int().min(0),
  districts_below_target: z.number().int().min(0),
  last_measured: z.string(),
  data_source: z.enum(['DATABASE', 'API', 'SURVEY', 'IOT', 'MANUAL', 'EXTERNAL', 'AI']),
});

export const UpdateRegionalKPISchema = CreateRegionalKPISchema.partial();

// =============================================================================
// Budget Intelligence
// =============================================================================

export const CreateBudgetIntelligenceSchema = z.object({
  schoolId,
  fiscal_year: z.number().int().min(2000),
  total_budget: z.number().min(0),
  total_spent: z.number().min(0),
  total_remaining: z.number().min(0),
  utilization_rate: z.number().min(0).max(100),
  allocations: z.array(z.object({
    category: z.enum(['CAPITAL', 'OPERATIONAL', 'MAINTENANCE', 'EMERGENCY', 'DEVELOPMENT', 'RESEARCH', 'TRANSFER']),
    amount: z.number().min(0),
    spent: z.number().min(0),
    remaining: z.number().min(0),
    utilization_rate: z.number().min(0).max(100),
    region: z.string().min(1),
    district: z.string().optional(),
    school_name: z.string().optional(),
    fiscal_quarter: z.number().int().min(1).max(4),
    approved_by: z.string().min(1),
    approved_at: z.string(),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'IMPLEMENTING', 'COMPLETED', 'CANCELLED']),
  })),
});

export const UpdateBudgetIntelligenceSchema = CreateBudgetIntelligenceSchema.partial();

// =============================================================================
// Teacher Intelligence
// =============================================================================

export const CreateTeacherIntelligenceSchema = z.object({
  schoolId,
  total_teachers: z.number().int().min(0),
  qualified_teachers: z.number().int().min(0),
  student_teacher_ratio: z.number().min(0),
  average_salary: z.number().min(0),
  retention_rate: z.number().min(0).max(100),
  satisfaction_score: z.number().min(0).max(100),
});

export const UpdateTeacherIntelligenceSchema = CreateTeacherIntelligenceSchema.partial();

// =============================================================================
// Infrastructure Intelligence
// =============================================================================

export const CreateInfrastructureIntelligenceSchema = z.object({
  schoolId,
  total_buildings: z.number().int().min(0),
  total_classrooms: z.number().int().min(0),
  total_labs: z.number().int().min(0),
  total_libraries: z.number().int().min(0),
  total_sports_facilities: z.number().int().min(0),
  ict_infrastructure_score: z.number().min(0).max(100),
  energy_score: z.number().min(0).max(100),
  water_score: z.number().min(0).max(100),
  overall_condition_score: z.number().min(0).max(100),
});

export const UpdateInfrastructureIntelligenceSchema = CreateInfrastructureIntelligenceSchema.partial();

// =============================================================================
// Student Intelligence
// =============================================================================

export const CreateStudentIntelligenceSchema = z.object({
  schoolId,
  total_enrolled: z.number().int().min(0),
  total_attending: z.number().int().min(0),
  attendance_rate: z.number().min(0).max(100),
  graduation_rate: z.number().min(0).max(100),
  employment_rate: z.number().min(0).max(100),
  satisfaction_score: z.number().min(0).max(100),
});

export const UpdateStudentIntelligenceSchema = CreateStudentIntelligenceSchema.partial();

// =============================================================================
// Employment Intelligence
// =============================================================================

export const CreateEmploymentIntelligenceSchema = z.object({
  schoolId,
  total_graduates: z.number().int().min(0),
  total_employed: z.number().int().min(0),
  placement_rate: z.number().min(0).max(100),
  average_time_to_employment: z.number().int().min(0),
  average_salary: z.number().min(0),
});

export const UpdateEmploymentIntelligenceSchema = CreateEmploymentIntelligenceSchema.partial();

// =============================================================================
// AI Recommendation
// =============================================================================

export const CreateAIRecommendationSchema = z.object({
  schoolId,
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['POLICY', 'BUDGET', 'STAFFING', 'INFRASTRUCTURE', 'PROGRAM', 'PARTNERSHIP']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'URGENT']),
  status: z.enum(['NEW', 'REVIEWED', 'APPROVED', 'IMPLEMENTING', 'COMPLETED', 'REJECTED']),
  confidence_score: z.number().min(0).max(1),
  impact_score: z.number().min(0).max(100),
  implementation_cost: z.number().min(0),
  expected_roi: z.number(),
  implementation_timeline: z.object({
    start: z.string(),
    end: z.string(),
  }),
  data_sources: z.array(z.enum(['DATABASE', 'API', 'SURVEY', 'IOT', 'MANUAL', 'EXTERNAL', 'AI'])),
  model_version: z.string().min(1),
  region: z.string().optional(),
  district: z.string().optional(),
  school_name: z.string().optional(),
});

export const UpdateAIRecommendationSchema = CreateAIRecommendationSchema.partial();

// =============================================================================
// Strategic Plan
// =============================================================================

export const CreateStrategicPlanSchema = z.object({
  schoolId,
  title: z.string().min(1),
  description: z.string().min(1),
  vision: z.string().min(1),
  mission: z.string().min(1),
  start_date: z.string(),
  end_date: z.string(),
  goals: z.array(z.object({
    goal: z.enum(['QUALITY', 'EQUITY', 'EFFICIENCY', 'INNOVATION', 'SUSTAINABILITY', 'SAFETY']),
    title: z.string().min(1),
    description: z.string().min(1),
    target_date: z.string(),
    progress_percent: z.number().min(0).max(100),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'IMPLEMENTING', 'COMPLETED', 'CANCELLED']),
    responsible_ministry: z.string().min(1),
    budget_allocated: z.number().min(0),
    budget_spent: z.number().min(0),
  })),
  national_priorities: z.array(z.enum(['ACCESS', 'QUALITY', 'RELEVANCE', 'EFFICIENCY', 'GOVERNANCE', 'INNOVATION'])),
  total_budget: z.number().min(0),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'IMPLEMENTING', 'COMPLETED', 'CANCELLED']),
  approved_by: z.string().min(1),
  approved_at: z.string(),
});

export const UpdateStrategicPlanSchema = CreateStrategicPlanSchema.partial();

// =============================================================================
// Government Alert
// =============================================================================

export const CreateGovernmentAlertSchema = z.object({
  schoolId,
  alert_level: z.enum(['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EMERGENCY']),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['EDUCATION', 'FINANCE', 'INFRASTRUCTURE', 'EMPLOYMENT', 'HEALTH', 'SAFETY', 'SUSTAINABILITY', 'INNOVATION']),
  region: z.string().optional(),
  district: z.string().optional(),
  school_name: z.string().optional(),
  affected_count: z.number().int().min(0),
  recommended_actions: z.array(z.string()),
  resolved: z.boolean(),
  expires_at: z.string().optional(),
});

export const UpdateGovernmentAlertSchema = CreateGovernmentAlertSchema.partial();

// =============================================================================
// Risk Assessment
// =============================================================================

export const CreateRiskAssessmentSchema = z.object({
  schoolId,
  title: z.string().min(1),
  description: z.string().min(1),
  risk_category: z.enum(['STRATEGIC', 'OPERATIONAL', 'FINANCIAL', 'COMPLIANCE', 'REPUTATIONAL', 'TECHNOLOGICAL']),
  risk_level: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
  probability: z.number().min(0).max(1),
  impact: z.number().min(0).max(1),
  risk_score: z.number().min(0).max(100),
  affected_areas: z.array(z.enum(['STUDENTS', 'TEACHERS', 'STAFF', 'PARENTS', 'COMMUNITY', 'GOVERNMENT', 'PARTNERS'])),
  mitigation_strategies: z.array(z.object({
    strategy: z.string().min(1),
    description: z.string().min(1),
    implementation_cost: z.number().min(0),
    effectiveness_score: z.number().min(0).max(100),
    responsible_party: z.string().min(1),
    deadline: z.string(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'OVERDUE']),
    progress_percent: z.number().min(0).max(100),
  })),
  owner: z.string().min(1),
  review_date: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'IMPLEMENTING', 'COMPLETED', 'CANCELLED']),
});

export const UpdateRiskAssessmentSchema = CreateRiskAssessmentSchema.partial();

// =============================================================================
// Stakeholder Map
// =============================================================================

export const CreateStakeholderMapSchema = z.object({
  schoolId,
  stakeholders: z.array(z.object({
    stakeholder_type: z.enum(['GOVERNMENT', 'MINISTRY', 'SCHOOL', 'PARENT', 'STUDENT', 'TEACHER', 'EMPLOYER', 'NGO', 'INTERNATIONAL']),
    name: z.string().min(1),
    role: z.string().min(1),
    influence_level: z.number().min(0).max(10),
    interest_level: z.number().min(0).max(10),
    sentiment: z.enum(['POSITIVE', 'NEGATIVE', 'NEUTRAL', 'MIXED', 'UNKNOWN']),
    engagement_frequency: z.array(z.enum(['EMAIL', 'SMS', 'PUSH', 'VOICE', 'VIDEO', 'IN_PERSON', 'SOCIAL_MEDIA'])),
    key_concerns: z.array(z.string()),
    expectations: z.array(z.string()),
    communication_preferences: z.array(z.enum(['EMAIL', 'SMS', 'PUSH', 'VOICE', 'VIDEO', 'IN_PERSON', 'SOCIAL_MEDIA'])),
  })),
  engagement_strategies: z.array(z.object({
    stakeholder_type: z.enum(['GOVERNMENT', 'MINISTRY', 'SCHOOL', 'PARENT', 'STUDENT', 'TEACHER', 'EMPLOYER', 'NGO', 'INTERNATIONAL']),
    engagement_type: z.string().min(1),
    description: z.string().min(1),
    date: z.string(),
    participants: z.array(z.string()),
    outcomes: z.array(z.string()),
    follow_up_actions: z.array(z.string()),
    satisfaction_score: z.number().min(0).max(100),
    channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'VOICE', 'VIDEO', 'IN_PERSON', 'SOCIAL_MEDIA']),
  })),
});

export const UpdateStakeholderMapSchema = CreateStakeholderMapSchema.partial();
