import { z } from 'zod';

const schoolId = z.string().uuid();

// =============================================================================
// Capacity
// =============================================================================

export const CreateCapacityPlanSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  domain: z.enum(['CAPACITY', 'ENROLLMENT', 'TEACHER', 'BUDGET', 'DISASTER', 'EVACUATION', 'INFRASTRUCTURE', 'ENERGY', 'WATER', 'SECURITY', 'TRANSPORTATION', 'GROWTH', 'ACADEMIC', 'FINANCIAL', 'OPERATIONAL']),
  horizon: z.enum(['SHORT_TERM', 'MEDIUM_TERM', 'LONG_TERM', 'STRATEGIC']),
  targets: z.array(z.object({
    metric: z.enum(['OCCUPANCY', 'UTILIZATION', 'AVAILABILITY', 'EFFICIENCY', 'BOTTLENECK']),
    target_value: z.number(),
    unit: z.string().min(1),
    deadline: z.string(),
  })),
  constraints: z.array(z.object({
    resource_type: z.string().min(1),
    constraint_type: z.enum(['HARD', 'SOFT', 'PREFERENCE', 'BUDGET', 'TIME', 'RESOURCE', 'REGULATORY']),
    min_value: z.number(),
    max_value: z.number(),
    unit: z.string().min(1),
    description: z.string().min(1),
  })),
});

export const UpdateCapacityPlanSchema = CreateCapacityPlanSchema.partial();

// =============================================================================
// Capacity Simulation
// =============================================================================

export const CreateCapacitySimulationSchema = z.object({
  schoolId,
  plan_id: z.string().uuid(),
  engine: z.enum(['SYSTEM_DYNAMICS', 'AGENT_BASED', 'DISCRETE_EVENT', 'MONTE_CARLO', 'FINITE_ELEMENT', 'HYBRID']),
  scenario: z.enum(['BASELINE', 'BEST_CASE', 'WORST_CASE', 'OPTIMISTIC', 'PESSIMISTIC', 'STRESS', 'DISASTER', 'RECOVERY']),
  status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
  parameters: z.array(z.object({
    name: z.string().min(1),
    value: z.number(),
    type: z.string().min(1),
    unit: z.string().min(1),
    min_value: z.number(),
    max_value: z.number(),
    description: z.string().min(1),
  })),
  start_date: z.string(),
  end_date: z.string(),
  progress: z.number().min(0).max(100),
});

export const UpdateCapacitySimulationSchema = CreateCapacitySimulationSchema.partial();

// =============================================================================
// Enrollment Simulation
// =============================================================================

export const CreateEnrollmentSimulationSchema = z.object({
  schoolId,
  engine: z.enum(['SYSTEM_DYNAMICS', 'AGENT_BASED', 'DISCRETE_EVENT', 'MONTE_CARLO', 'FINITE_ELEMENT', 'HYBRID']),
  scenario: z.enum(['BASELINE', 'BEST_CASE', 'WORST_CASE', 'OPTIMISTIC', 'PESSIMISTIC', 'STRESS', 'DISASTER', 'RECOVERY']),
  status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
  parameters: z.array(z.object({
    name: z.string().min(1),
    value: z.number(),
    type: z.enum(['HARD', 'SOFT', 'PREFERENCE', 'BUDGET', 'TIME', 'RESOURCE', 'REGULATORY']),
    description: z.string().min(1),
  })),
  baseline_enrollment: z.number().int().min(0),
  projection_horizon: z.number().int().min(1),
});

export const UpdateEnrollmentSimulationSchema = CreateEnrollmentSimulationSchema.partial();

// =============================================================================
// Enrollment Scenario
// =============================================================================

export const CreateEnrollmentScenarioSchema = z.object({
  schoolId,
  name: z.string().min(1),
  scenario: z.enum(['BASELINE', 'BEST_CASE', 'WORST_CASE', 'OPTIMISTIC', 'PESSIMISTIC', 'STRESS', 'DISASTER', 'RECOVERY']),
  enrollment_data: z.array(z.object({
    date: z.string(),
    value: z.number(),
    delta: z.number(),
    source: z.string().min(1),
  })),
  assumptions: z.array(z.string()),
  risk_level: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
});

export const UpdateEnrollmentScenarioSchema = CreateEnrollmentScenarioSchema.partial();

// =============================================================================
// Teacher Plan
// =============================================================================

export const CreateTeacherPlanSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  teacher_count: z.number().int().min(1),
  allocation_rules: z.array(z.object({
    metric: z.enum(['WORKLOAD', 'SATISFACTION', 'RETENTION', 'PERFORMANCE', 'AVAILABILITY']),
    operator: z.string().min(1),
    value: z.number(),
    weight: z.number().min(0).max(1),
  })),
  constraints: z.array(z.object({
    resource_type: z.string().min(1),
    constraint_type: z.enum(['HARD', 'SOFT', 'PREFERENCE', 'BUDGET', 'TIME', 'RESOURCE', 'REGULATORY']),
    min_value: z.number(),
    max_value: z.number(),
    unit: z.string().min(1),
    description: z.string().min(1),
  })),
});

export const UpdateTeacherPlanSchema = CreateTeacherPlanSchema.partial();

// =============================================================================
// Teacher Simulation
// =============================================================================

export const CreateTeacherSimulationSchema = z.object({
  schoolId,
  plan_id: z.string().uuid(),
  engine: z.enum(['SYSTEM_DYNAMICS', 'AGENT_BASED', 'DISCRETE_EVENT', 'MONTE_CARLO', 'FINITE_ELEMENT', 'HYBRID']),
  scenario: z.enum(['BASELINE', 'BEST_CASE', 'WORST_CASE', 'OPTIMISTIC', 'PESSIMISTIC', 'STRESS', 'DISASTER', 'RECOVERY']),
  status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
  parameters: z.array(z.object({
    name: z.string().min(1),
    value: z.number(),
    type: z.string().min(1),
    unit: z.string().min(1),
    min_value: z.number(),
    max_value: z.number(),
    description: z.string().min(1),
  })),
  current_workload: z.number().min(0),
  projected_workload: z.number().min(0),
});

export const UpdateTeacherSimulationSchema = CreateTeacherSimulationSchema.partial();

// =============================================================================
// Budget Simulation
// =============================================================================

export const CreateBudgetSimulationSchema = z.object({
  schoolId,
  engine: z.enum(['SYSTEM_DYNAMICS', 'AGENT_BASED', 'DISCRETE_EVENT', 'MONTE_CARLO', 'FINITE_ELEMENT', 'HYBRID']),
  scenario: z.enum(['BASELINE', 'BEST_CASE', 'WORST_CASE', 'OPTIMISTIC', 'PESSIMISTIC', 'STRESS', 'DISASTER', 'RECOVERY']),
  status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
  total_budget: z.number().min(0),
  categories: z.array(z.object({
    category: z.enum(['CAPITAL', 'OPERATIONAL', 'MAINTENANCE', 'EMERGENCY', 'DEVELOPMENT', 'RESEARCH']),
    amount: z.number().min(0),
    percentage: z.number().min(0).max(100),
    variance: z.number(),
  })),
  parameters: z.array(z.object({
    name: z.string().min(1),
    value: z.number(),
    type: z.string().min(1),
    unit: z.string().min(1),
    min_value: z.number(),
    max_value: z.number(),
    description: z.string().min(1),
  })),
  fiscal_year: z.number().int().min(2000),
});

export const UpdateBudgetSimulationSchema = CreateBudgetSimulationSchema.partial();

// =============================================================================
// Disaster Simulation
// =============================================================================

export const CreateDisasterSimulationSchema = z.object({
  schoolId,
  disaster_type: z.enum(['FIRE', 'FLOOD', 'EARTHQUAKE', 'HURRICANE', 'TORNADO', 'PANDEMIC', 'CYBER_ATTACK', 'POWER_OUTAGE', 'CHEMICAL', 'STRUCTURAL']),
  severity: z.enum(['NEGLIGIBLE', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL']),
  engine: z.enum(['SYSTEM_DYNAMICS', 'AGENT_BASED', 'DISCRETE_EVENT', 'MONTE_CARLO', 'FINITE_ELEMENT', 'HYBRID']),
  scenario: z.enum(['BASELINE', 'BEST_CASE', 'WORST_CASE', 'OPTIMISTIC', 'PESSIMISTIC', 'STRESS', 'DISASTER', 'RECOVERY']),
  status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
  parameters: z.array(z.object({
    name: z.string().min(1),
    value: z.number(),
    unit: z.string().min(1),
    description: z.string().min(1),
  })),
  affected_area: z.string().min(1),
  estimated_duration: z.number().int().min(0),
});

export const UpdateDisasterSimulationSchema = CreateDisasterSimulationSchema.partial();

// =============================================================================
// Evacuation Plan
// =============================================================================

export const CreateEvacuationPlanSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  routes: z.array(z.object({
    route_type: z.enum(['PRIMARY', 'SECONDARY', 'EMERGENCY', 'ACCESSIBLE', 'SERVICE']),
    name: z.string().min(1),
    start_point: z.string().min(1),
    end_point: z.string().min(1),
    capacity: z.number().int().min(1),
    estimated_time: z.number().int().min(0),
    accessibility: z.boolean(),
    status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
  })),
  assembly_points: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    capacity: z.number().int().min(1),
    location: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      altitude: z.number(),
      address: z.string().min(1),
    }),
    facilities: z.array(z.string()),
  })),
  emergency_level: z.enum(['NORMAL', 'ELEVATED', 'HIGH', 'SEVERE', 'EXTREME']),
  last_drill: z.string().optional(),
  next_drill: z.string().optional(),
});

export const UpdateEvacuationPlanSchema = CreateEvacuationPlanSchema.partial();

// =============================================================================
// Infrastructure Plan
// =============================================================================

export const CreateInfrastructurePlanSchema = z.object({
  schoolId,
  name: z.string().min(1),
  projects: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    type: z.enum(['BUILDING', 'ROAD', 'UTILITY', 'NETWORK', 'SAFETY', 'AMENITY']),
    description: z.string().min(1),
    budget: z.number().min(0),
    start_date: z.string(),
    end_date: z.string(),
    status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
    dependencies: z.array(z.string()),
  })),
  total_budget: z.number().min(0),
  timeline_months: z.number().int().min(1),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']),
});

export const UpdateInfrastructurePlanSchema = CreateInfrastructurePlanSchema.partial();

// =============================================================================
// Security Plan
// =============================================================================

export const CreateSecurityPlanSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  threats: z.array(z.object({
    id: z.string().uuid(),
    threat_type: z.enum(['INTRUSION', 'THEFT', 'VANDALISM', 'ASSAULT', 'FIRE', 'HAZMAT', 'CYBER', 'TERRORISM']),
    probability: z.number().min(0).max(1),
    impact: z.enum(['NEGLIGIBLE', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL']),
    risk_score: z.number().min(0),
    vulnerability: z.string().min(1),
    mitigation: z.string().min(1),
    cost: z.number().min(0),
  })),
  measures: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    type: z.string().min(1),
    cost: z.number().min(0),
    effectiveness: z.number().min(0).max(1),
    threats_addressed: z.array(z.enum(['INTRUSION', 'THEFT', 'VANDALISM', 'ASSAULT', 'FIRE', 'HAZMAT', 'CYBER', 'TERRORISM'])),
    implementation_time: z.number().int().min(0),
  })),
  total_budget: z.number().min(0),
  effectiveness_score: z.number().min(0).max(100),
});

export const UpdateSecurityPlanSchema = CreateSecurityPlanSchema.partial();

// =============================================================================
// Transport Route
// =============================================================================

export const CreateTransportRouteSchema = z.object({
  schoolId,
  name: z.string().min(1),
  mode: z.enum(['BUS', 'CAR', 'BICYCLE', 'WALK', 'TRAIN', 'FERRY', 'AIR', 'EMERGENCY']),
  path: z.array(z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  })),
  stops: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    location: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      altitude: z.number(),
      address: z.string().min(1),
    }),
    boarding_count: z.number().int().min(0),
    schedule: z.array(z.string()),
  })),
  total_distance: z.number().min(0),
  estimated_time: z.number().int().min(0),
  capacity: z.number().int().min(1),
  active: z.boolean(),
});

export const UpdateTransportRouteSchema = CreateTransportRouteSchema.partial();

// =============================================================================
// Safety Plan
// =============================================================================

export const CreateSafetyPlanSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  assessments: z.array(z.object({
    id: z.string().uuid(),
    simulation_id: z.string().uuid(),
    area: z.string().min(1),
    rating: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DANGEROUS']),
    risk_score: z.number().min(0),
    hazards: z.array(z.object({
      id: z.string().uuid(),
      name: z.string().min(1),
      type: z.string().min(1),
      probability: z.number().min(0).max(1),
      severity: z.enum(['NEGLIGIBLE', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL']),
      mitigation: z.string().min(1),
      cost: z.number().min(0),
    })),
    compliance_score: z.number().min(0).max(100),
    recommendations: z.array(z.object({
      id: z.string().uuid(),
      type: z.enum(['ACTION', 'ALERT', 'OPTIMIZATION', 'PREDICTION', 'INSIGHT']),
      priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']),
      title: z.string().min(1),
      description: z.string().min(1),
      impact: z.enum(['NEGLIGIBLE', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL']),
      confidence: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
      estimated_cost: z.number().min(0),
      estimated_benefit: z.number().min(0),
      timeframe: z.enum(['SHORT_TERM', 'MEDIUM_TERM', 'LONG_TERM', 'STRATEGIC']),
    })),
  })),
  measures: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    type: z.string().min(1),
    cost: z.number().min(0),
    effectiveness: z.number().min(0).max(1),
    hazards_addressed: z.array(z.string()),
  })),
  total_budget: z.number().min(0),
  compliance_status: z.enum(['CONFIGURING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED', 'SCHEDULED']),
});

export const UpdateSafetyPlanSchema = CreateSafetyPlanSchema.partial();

// =============================================================================
// Simulation Template
// =============================================================================

export const CreateSimulationTemplateSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  domain: z.enum(['CAPACITY', 'ENROLLMENT', 'TEACHER', 'BUDGET', 'DISASTER', 'EVACUATION', 'INFRASTRUCTURE', 'ENERGY', 'WATER', 'SECURITY', 'TRANSPORTATION', 'GROWTH', 'ACADEMIC', 'FINANCIAL', 'OPERATIONAL']),
  engine: z.enum(['SYSTEM_DYNAMICS', 'AGENT_BASED', 'DISCRETE_EVENT', 'MONTE_CARLO', 'FINITE_ELEMENT', 'HYBRID']),
  parameters: z.array(z.object({
    name: z.string().min(1),
    value: z.number(),
    type: z.string().min(1),
    unit: z.string().min(1),
    min_value: z.number(),
    max_value: z.number(),
    description: z.string().min(1),
  })),
  constraints: z.array(z.object({
    resource_type: z.string().min(1),
    constraint_type: z.enum(['HARD', 'SOFT', 'PREFERENCE', 'BUDGET', 'TIME', 'RESOURCE', 'REGULATORY']),
    min_value: z.number(),
    max_value: z.number(),
    unit: z.string().min(1),
    description: z.string().min(1),
  })),
  is_public: z.boolean(),
});

export const UpdateSimulationTemplateSchema = CreateSimulationTemplateSchema.partial();

// =============================================================================
// Simulation Preset
// =============================================================================

export const CreateSimulationPresetSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  domain: z.enum(['CAPACITY', 'ENROLLMENT', 'TEACHER', 'BUDGET', 'DISASTER', 'EVACUATION', 'INFRASTRUCTURE', 'ENERGY', 'WATER', 'SECURITY', 'TRANSPORTATION', 'GROWTH', 'ACADEMIC', 'FINANCIAL', 'OPERATIONAL']),
  scenario: z.enum(['BASELINE', 'BEST_CASE', 'WORST_CASE', 'OPTIMISTIC', 'PESSIMISTIC', 'STRESS', 'DISASTER', 'RECOVERY']),
  parameters: z.array(z.object({
    name: z.string().min(1),
    value: z.number(),
    type: z.string().min(1),
    unit: z.string().min(1),
    min_value: z.number(),
    max_value: z.number(),
    description: z.string().min(1),
  })),
  tags: z.array(z.string()),
  is_default: z.boolean(),
});

export const UpdateSimulationPresetSchema = CreateSimulationPresetSchema.partial();
