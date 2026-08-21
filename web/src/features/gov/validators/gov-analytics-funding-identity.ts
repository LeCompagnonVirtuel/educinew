// Government & National Governance Validators - Analytics, Funding & Identity
// Phase 2.9 - EduCI Platform

import { z } from 'zod';

// ─── EducationKpi ────────────────────────────────────────────
export const educationKpiCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  category: z.enum(['enrollment', 'retention', 'achievement', 'equity', 'finance', 'infrastructure', 'teacher']),
  targetValue: z.number(),
  currentValue: z.number().optional(),
  unit: z.string().max(50),
  academicYear: z.string().max(20),
  region: z.string().max(200).optional(),
  weight: z.number().min(0).max(100).default(100),
  formula: z.string().max(500).optional(),
  dataSource: z.string().max(200).optional(),
  status: z.enum(['on_track', 'at_risk', 'behind', 'achieved', 'not_started']).default('not_started'),
});

export const educationKpiUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  category: z.enum(['enrollment', 'retention', 'achievement', 'equity', 'finance', 'infrastructure', 'teacher']).optional(),
  targetValue: z.number().optional(),
  currentValue: z.number().optional(),
  unit: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  weight: z.number().min(0).max(100).optional(),
  formula: z.string().max(500).optional(),
  dataSource: z.string().max(200).optional(),
  status: z.enum(['on_track', 'at_risk', 'behind', 'achieved', 'not_started']).optional(),
});

export const educationKpiQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'category', 'academicYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['on_track', 'at_risk', 'behind', 'achieved', 'not_started']).optional(),
  category: z.enum(['enrollment', 'retention', 'achievement', 'equity', 'finance', 'infrastructure', 'teacher']).optional(),
  academicYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── RegionalAnalyticsKpi ────────────────────────────────────
export const regionalAnalyticsKpiCreateSchema = z.object({
  regionId: z.string().uuid(),
  kpiId: z.string().uuid(),
  value: z.number(),
  targetValue: z.number().optional(),
  changePercentage: z.number().optional(),
  period: z.string().max(50),
  academicYear: z.string().max(20),
  rank: z.number().int().min(0).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const regionalAnalyticsKpiUpdateSchema = z.object({
  kpiId: z.string().uuid().optional(),
  value: z.number().optional(),
  targetValue: z.number().optional(),
  changePercentage: z.number().optional(),
  period: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  rank: z.number().int().min(0).optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const regionalAnalyticsKpiQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['period', 'value', 'rank', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  regionId: z.string().uuid().optional(),
  kpiId: z.string().uuid().optional(),
  academicYear: z.string().max(20).optional(),
});

// ─── NationalDashboard ───────────────────────────────────────
export const nationalDashboardCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  category: z.enum(['overview', 'enrollment', 'performance', 'finance', 'infrastructure', 'teacher', 'custom']),
  isPublic: z.boolean().default(false),
  refreshInterval: z.number().int().min(0).optional(),
  layout: z.record(z.unknown()).optional(),
  filters: z.array(z.string().max(100)).optional(),
  ownerUserId: z.string().uuid().optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
});

export const nationalDashboardUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  category: z.enum(['overview', 'enrollment', 'performance', 'finance', 'infrastructure', 'teacher', 'custom']).optional(),
  isPublic: z.boolean().optional(),
  refreshInterval: z.number().int().min(0).optional(),
  layout: z.record(z.unknown()).optional(),
  filters: z.array(z.string().max(100)).optional(),
  ownerUserId: z.string().uuid().optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
});

export const nationalDashboardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  category: z.enum(['overview', 'enrollment', 'performance', 'finance', 'infrastructure', 'teacher', 'custom']).optional(),
  ministryId: z.string().uuid().optional(),
});
// ─── DashboardWidget ─────────────────────────────────────────
export const dashboardWidgetCreateSchema = z.object({
  dashboardId: z.string().uuid(),
  name: z.string().min(2).max(200),
  widgetType: z.enum(['chart', 'table', 'kpi', 'map', 'gauge', 'text', 'image']),
  dataSource: z.string().max(200),
  query: z.string().max(5000).optional(),
  config: z.record(z.unknown()).optional(),
  position: z.record(z.number()).optional(),
  size: z.record(z.number()).optional(),
  refreshInterval: z.number().int().min(0).optional(),
  status: z.enum(['draft', 'active', 'hidden']).default('draft'),
});

export const dashboardWidgetUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  widgetType: z.enum(['chart', 'table', 'kpi', 'map', 'gauge', 'text', 'image']).optional(),
  dataSource: z.string().max(200).optional(),
  query: z.string().max(5000).optional(),
  config: z.record(z.unknown()).optional(),
  position: z.record(z.number()).optional(),
  size: z.record(z.number()).optional(),
  refreshInterval: z.number().int().min(0).optional(),
  status: z.enum(['draft', 'active', 'hidden']).optional(),
});

export const dashboardWidgetQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'widgetType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'hidden']).optional(),
  widgetType: z.enum(['chart', 'table', 'kpi', 'map', 'gauge', 'text', 'image']).optional(),
  dashboardId: z.string().uuid().optional(),
});

// ─── PredictiveAnalytic ──────────────────────────────────────
export const predictiveAnalyticCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  modelType: z.enum(['enrollment_forecast', 'dropout_prediction', 'performance_prediction', 'budget_forecast', 'teacher_demand', 'custom']),
  parameters: z.record(z.unknown()).optional(),
  trainingData: z.string().max(500).optional(),
  accuracy: z.number().min(0).max(100).optional(),
  forecastPeriod: z.string().max(100).optional(),
  forecastValues: z.array(z.record(z.unknown())).optional(),
  lastRunDate: z.string().datetime().optional(),
  status: z.enum(['draft', 'trained', 'active', 'archived']).default('draft'),
});

export const predictiveAnalyticUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  modelType: z.enum(['enrollment_forecast', 'dropout_prediction', 'performance_prediction', 'budget_forecast', 'teacher_demand', 'custom']).optional(),
  parameters: z.record(z.unknown()).optional(),
  trainingData: z.string().max(500).optional(),
  accuracy: z.number().min(0).max(100).optional(),
  forecastPeriod: z.string().max(100).optional(),
  forecastValues: z.array(z.record(z.unknown())).optional(),
  lastRunDate: z.string().datetime().optional(),
  status: z.enum(['draft', 'trained', 'active', 'archived']).optional(),
});

export const predictiveAnalyticQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'modelType', 'accuracy', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'trained', 'active', 'archived']).optional(),
  modelType: z.enum(['enrollment_forecast', 'dropout_prediction', 'performance_prediction', 'budget_forecast', 'teacher_demand', 'custom']).optional(),
  ministryId: z.string().uuid().optional(),
});
// ─── DropoutMap ──────────────────────────────────────────────
export const dropoutMapCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  academicYear: z.string().max(20),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  dataPoints: z.array(z.object({
    latitude: z.number(),
    longitude: z.number(),
    dropoutRate: z.number().min(0).max(100),
    schoolName: z.string().max(200).optional(),
    studentCount: z.number().int().min(0).optional(),
  })),
  avgDropoutRate: z.number().min(0).max(100).optional(),
  totalSchools: z.number().int().min(0).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const dropoutMapUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  dataPoints: z.array(z.object({
    latitude: z.number(),
    longitude: z.number(),
    dropoutRate: z.number().min(0).max(100),
    schoolName: z.string().max(200).optional(),
    studentCount: z.number().int().min(0).optional(),
  })).optional(),
  avgDropoutRate: z.number().min(0).max(100).optional(),
  totalSchools: z.number().int().min(0).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const dropoutMapQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'academicYear', 'avgDropoutRate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── InfrastructureMap ───────────────────────────────────────
export const infrastructureMapCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  mapType: z.enum(['buildings', 'classrooms', 'laboratories', 'libraries', 'sports', 'digital', 'water', 'sanitation', 'energy']),
  region: z.string().max(200).optional(),
  dataPoints: z.array(z.object({
    latitude: z.number(),
    longitude: z.number(),
    infrastructureType: z.string().max(100),
    condition: z.enum(['excellent', 'good', 'fair', 'poor', 'critical']),
    schoolName: z.string().max(200).optional(),
    details: z.string().max(500).optional(),
  })),
  summary: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const infrastructureMapUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  mapType: z.enum(['buildings', 'classrooms', 'laboratories', 'libraries', 'sports', 'digital', 'water', 'sanitation', 'energy']).optional(),
  region: z.string().max(200).optional(),
  dataPoints: z.array(z.object({
    latitude: z.number(),
    longitude: z.number(),
    infrastructureType: z.string().max(100),
    condition: z.enum(['excellent', 'good', 'fair', 'poor', 'critical']),
    schoolName: z.string().max(200).optional(),
    details: z.string().max(500).optional(),
  })).optional(),
  summary: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const infrastructureMapQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'mapType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  mapType: z.enum(['buildings', 'classrooms', 'laboratories', 'libraries', 'sports', 'digital', 'water', 'sanitation', 'energy']).optional(),
  region: z.string().max(200).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── TeacherDistribution ─────────────────────────────────────
export const teacherDistributionCreateSchema = z.object({
  ministryId: z.string().uuid(),
  academicYear: z.string().max(20),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  totalTeachers: z.number().int().min(0),
  qualifiedTeachers: z.number().int().min(0).optional(),
  unqualifiedTeachers: z.number().int().min(0).optional(),
  maleTeachers: z.number().int().min(0).optional(),
  femaleTeachers: z.number().int().min(0).optional(),
  teacherStudentRatio: z.number().min(0).optional(),
  subjectDistribution: z.record(z.number()).optional(),
  levelDistribution: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const teacherDistributionUpdateSchema = z.object({
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  totalTeachers: z.number().int().min(0).optional(),
  qualifiedTeachers: z.number().int().min(0).optional(),
  unqualifiedTeachers: z.number().int().min(0).optional(),
  maleTeachers: z.number().int().min(0).optional(),
  femaleTeachers: z.number().int().min(0).optional(),
  teacherStudentRatio: z.number().min(0).optional(),
  subjectDistribution: z.record(z.number()).optional(),
  levelDistribution: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const teacherDistributionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['academicYear', 'totalTeachers', 'teacherStudentRatio', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  ministryId: z.string().uuid().optional(),
});
// ─── StudentDistribution ─────────────────────────────────────
export const studentDistributionCreateSchema = z.object({
  ministryId: z.string().uuid(),
  academicYear: z.string().max(20),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  totalStudents: z.number().int().min(0),
  maleStudents: z.number().int().min(0).optional(),
  femaleStudents: z.number().int().min(0).optional(),
  urbanStudents: z.number().int().min(0).optional(),
  ruralStudents: z.number().int().min(0).optional(),
  publicSchoolStudents: z.number().int().min(0).optional(),
  privateSchoolStudents: z.number().int().min(0).optional(),
  levelDistribution: z.record(z.number()).optional(),
  ageDistribution: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const studentDistributionUpdateSchema = z.object({
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  totalStudents: z.number().int().min(0).optional(),
  maleStudents: z.number().int().min(0).optional(),
  femaleStudents: z.number().int().min(0).optional(),
  urbanStudents: z.number().int().min(0).optional(),
  ruralStudents: z.number().int().min(0).optional(),
  publicSchoolStudents: z.number().int().min(0).optional(),
  privateSchoolStudents: z.number().int().min(0).optional(),
  levelDistribution: z.record(z.number()).optional(),
  ageDistribution: z.record(z.number()).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const studentDistributionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['academicYear', 'totalStudents', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  academicYear: z.string().max(20).optional(),
  region: z.string().max(200).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── BudgetAnalytic ──────────────────────────────────────────
export const budgetAnalyticCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  academicYear: z.string().max(20),
  category: z.enum(['revenue', 'expenditure', 'per_student', 'efficiency', 'allocation']),
  totalBudget: z.number().min(0),
  utilizedBudget: z.number().min(0).optional(),
  remainingBudget: z.number().min(0).optional(),
  utilizationRate: z.number().min(0).max(100).optional(),
  previousYearBudget: z.number().min(0).optional(),
  changePercentage: z.number().optional(),
  breakdown: z.record(z.number()).optional(),
  region: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).default('draft'),
});

export const budgetAnalyticUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  academicYear: z.string().max(20).optional(),
  category: z.enum(['revenue', 'expenditure', 'per_student', 'efficiency', 'allocation']).optional(),
  totalBudget: z.number().min(0).optional(),
  utilizedBudget: z.number().min(0).optional(),
  remainingBudget: z.number().min(0).optional(),
  utilizationRate: z.number().min(0).max(100).optional(),
  previousYearBudget: z.number().min(0).optional(),
  changePercentage: z.number().optional(),
  breakdown: z.record(z.number()).optional(),
  region: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
});

export const budgetAnalyticQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'academicYear', 'totalBudget', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'finalized', 'published']).optional(),
  category: z.enum(['revenue', 'expenditure', 'per_student', 'efficiency', 'allocation']).optional(),
  academicYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── EducationForecast ───────────────────────────────────────
export const educationForecastCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  forecastType: z.enum(['enrollment', 'teacher_demand', 'infrastructure', 'budget', 'graduation']),
  baseYear: z.string().max(20),
  targetYear: z.string().max(20),
  projections: z.array(z.object({
    year: z.string().max(20),
    value: z.number(),
    confidence: z.number().min(0).max(100).optional(),
  })),
  assumptions: z.array(z.string().max(500)).optional(),
  methodology: z.string().max(1000).optional(),
  region: z.string().max(200).optional(),
  status: z.enum(['draft', 'review', 'approved', 'published']).default('draft'),
});

export const educationForecastUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  forecastType: z.enum(['enrollment', 'teacher_demand', 'infrastructure', 'budget', 'graduation']).optional(),
  baseYear: z.string().max(20).optional(),
  targetYear: z.string().max(20).optional(),
  projections: z.array(z.object({
    year: z.string().max(20),
    value: z.number(),
    confidence: z.number().min(0).max(100).optional(),
  })).optional(),
  assumptions: z.array(z.string().max(500)).optional(),
  methodology: z.string().max(1000).optional(),
  region: z.string().max(200).optional(),
  status: z.enum(['draft', 'review', 'approved', 'published']).optional(),
});

export const educationForecastQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'forecastType', 'baseYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'review', 'approved', 'published']).optional(),
  forecastType: z.enum(['enrollment', 'teacher_demand', 'infrastructure', 'budget', 'graduation']).optional(),
  ministryId: z.string().uuid().optional(),
});
// ─── DataCollection ──────────────────────────────────────────
export const dataCollectionCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  description: z.string().max(2000).optional(),
  collectionType: z.enum(['census', 'survey', 'sample', 'administrative']),
  targetEntity: z.enum(['school', 'student', 'teacher', 'district', 'region']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  frequency: z.enum(['one_time', 'annual', 'quarterly', 'monthly']),
  fields: z.array(z.object({
    name: z.string().max(100),
    type: z.enum(['text', 'number', 'date', 'boolean', 'select', 'multi_select']),
    required: z.boolean().default(true),
    options: z.array(z.string().max(100)).optional(),
  })).optional(),
  instructions: z.string().max(5000).optional(),
  status: z.enum(['draft', 'active', 'completed', 'archived']).default('draft'),
});

export const dataCollectionUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  description: z.string().max(2000).optional(),
  collectionType: z.enum(['census', 'survey', 'sample', 'administrative']).optional(),
  targetEntity: z.enum(['school', 'student', 'teacher', 'district', 'region']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  frequency: z.enum(['one_time', 'annual', 'quarterly', 'monthly']).optional(),
  fields: z.array(z.object({
    name: z.string().max(100),
    type: z.enum(['text', 'number', 'date', 'boolean', 'select', 'multi_select']),
    required: z.boolean().default(true),
    options: z.array(z.string().max(100)).optional(),
  })).optional(),
  instructions: z.string().max(5000).optional(),
  status: z.enum(['draft', 'active', 'completed', 'archived']).optional(),
});

export const dataCollectionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'collectionType', 'startDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'completed', 'archived']).optional(),
  collectionType: z.enum(['census', 'survey', 'sample', 'administrative']).optional(),
  targetEntity: z.enum(['school', 'student', 'teacher', 'district', 'region']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── GovernmentFunding ───────────────────────────────────────
export const governmentFundingCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  source: z.string().min(2).max(200),
  totalAmount: z.number().min(0),
  fiscalYear: z.string().max(20),
  category: z.enum(['capital', 'recurrent', 'development', 'emergency', 'scholarship']),
  description: z.string().max(2000).optional(),
  approvalDate: z.string().datetime().optional(),
  disbursementDate: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  status: z.enum(['proposed', 'approved', 'disbursed', 'partially_disbursed', 'completed', 'cancelled']).default('proposed'),
});

export const governmentFundingUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  source: z.string().min(2).max(200).optional(),
  totalAmount: z.number().min(0).optional(),
  fiscalYear: z.string().max(20).optional(),
  category: z.enum(['capital', 'recurrent', 'development', 'emergency', 'scholarship']).optional(),
  description: z.string().max(2000).optional(),
  approvalDate: z.string().datetime().optional(),
  disbursementDate: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  status: z.enum(['proposed', 'approved', 'disbursed', 'partially_disbursed', 'completed', 'cancelled']).optional(),
});

export const governmentFundingQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'totalAmount', 'fiscalYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['proposed', 'approved', 'disbursed', 'partially_disbursed', 'completed', 'cancelled']).optional(),
  category: z.enum(['capital', 'recurrent', 'development', 'emergency', 'scholarship']).optional(),
  fiscalYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── FundingAllocation ───────────────────────────────────────
export const fundingAllocationCreateSchema = z.object({
  fundingId: z.string().uuid(),
  regionId: z.string().uuid().optional(),
  districtId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  allocatedAmount: z.number().min(0),
  purpose: z.string().min(10).max(1000),
  category: z.enum(['infrastructure', 'teacher_salary', 'equipment', 'training', 'scholarship', 'maintenance', 'other']),
  allocationDate: z.string().datetime(),
  disbursementDate: z.string().datetime().optional(),
  disbursedAmount: z.number().min(0).optional(),
  conditions: z.array(z.string().max(500)).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['allocated', 'disbursed', 'partially_disbursed', 'completed', 'revoked']).default('allocated'),
});

export const fundingAllocationUpdateSchema = z.object({
  regionId: z.string().uuid().optional(),
  districtId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  allocatedAmount: z.number().min(0).optional(),
  purpose: z.string().min(10).max(1000).optional(),
  category: z.enum(['infrastructure', 'teacher_salary', 'equipment', 'training', 'scholarship', 'maintenance', 'other']).optional(),
  allocationDate: z.string().datetime().optional(),
  disbursementDate: z.string().datetime().optional(),
  disbursedAmount: z.number().min(0).optional(),
  conditions: z.array(z.string().max(500)).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['allocated', 'disbursed', 'partially_disbursed', 'completed', 'revoked']).optional(),
});

export const fundingAllocationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['allocatedAmount', 'allocationDate', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['allocated', 'disbursed', 'partially_disbursed', 'completed', 'revoked']).optional(),
  category: z.enum(['infrastructure', 'teacher_salary', 'equipment', 'training', 'scholarship', 'maintenance', 'other']).optional(),
  fundingId: z.string().uuid().optional(),
  regionId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
});
// ─── Scholarship ─────────────────────────────────────────────
export const scholarshipCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  description: z.string().max(5000),
  type: z.enum(['merit', 'need_based', 'sports', 'cultural', 'minority', 'disability', 'government', 'international']),
  totalSlots: z.number().int().min(1),
  amountPerSlot: z.number().min(0),
  totalBudget: z.number().min(0),
  eligibilityCriteria: z.array(z.string().max(500)),
  applicationStart: z.string().datetime(),
  applicationEnd: z.string().datetime(),
  academicYear: z.string().max(20),
  level: z.array(z.enum(['primary', 'secondary', 'tertiary', 'postgraduate'])),
  renewalAllowed: z.boolean().default(false),
  renewalCriteria: z.string().max(1000).optional(),
  status: z.enum(['draft', 'open', 'closed', 'reviewing', 'awarded', 'cancelled']).default('draft'),
});

export const scholarshipUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  description: z.string().max(5000).optional(),
  type: z.enum(['merit', 'need_based', 'sports', 'cultural', 'minority', 'disability', 'government', 'international']).optional(),
  totalSlots: z.number().int().min(1).optional(),
  amountPerSlot: z.number().min(0).optional(),
  totalBudget: z.number().min(0).optional(),
  eligibilityCriteria: z.array(z.string().max(500)).optional(),
  applicationStart: z.string().datetime().optional(),
  applicationEnd: z.string().datetime().optional(),
  academicYear: z.string().max(20).optional(),
  level: z.array(z.enum(['primary', 'secondary', 'tertiary', 'postgraduate'])).optional(),
  renewalAllowed: z.boolean().optional(),
  renewalCriteria: z.string().max(1000).optional(),
  status: z.enum(['draft', 'open', 'closed', 'reviewing', 'awarded', 'cancelled']).optional(),
});

export const scholarshipQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'totalBudget', 'applicationEnd', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'open', 'closed', 'reviewing', 'awarded', 'cancelled']).optional(),
  type: z.enum(['merit', 'need_based', 'sports', 'cultural', 'minority', 'disability', 'government', 'international']).optional(),
  academicYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── ScholarshipApplication ──────────────────────────────────
export const scholarshipApplicationCreateSchema = z.object({
  scholarshipId: z.string().uuid(),
  studentId: z.string().uuid(),
  applicationDate: z.string().datetime(),
  academicRecord: z.record(z.unknown()).optional(),
  financialInfo: z.record(z.unknown()).optional(),
  documents: z.array(z.string().url()).optional(),
  personalStatement: z.string().max(5000).optional(),
  recommenderName: z.string().max(200).optional(),
  recommenderEmail: z.string().email().optional(),
  status: z.enum(['submitted', 'under_review', 'shortlisted', 'interview', 'awarded', 'rejected', 'waitlisted', 'withdrawn']).default('submitted'),
});

export const scholarshipApplicationUpdateSchema = z.object({
  applicationDate: z.string().datetime().optional(),
  academicRecord: z.record(z.unknown()).optional(),
  financialInfo: z.record(z.unknown()).optional(),
  documents: z.array(z.string().url()).optional(),
  personalStatement: z.string().max(5000).optional(),
  recommenderName: z.string().max(200).optional(),
  recommenderEmail: z.string().email().optional(),
  status: z.enum(['submitted', 'under_review', 'shortlisted', 'interview', 'awarded', 'rejected', 'waitlisted', 'withdrawn']).optional(),
  awardAmount: z.number().min(0).optional(),
  reviewNotes: z.string().max(2000).optional(),
  reviewedBy: z.string().uuid().optional(),
});

export const scholarshipApplicationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['applicationDate', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['submitted', 'under_review', 'shortlisted', 'interview', 'awarded', 'rejected', 'waitlisted', 'withdrawn']).optional(),
  scholarshipId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
});

// ─── Grant ───────────────────────────────────────────────────
export const grantCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  donorName: z.string().min(2).max(200),
  totalAmount: z.number().min(0),
  currency: z.string().max(10).default('USD'),
  description: z.string().max(5000).optional(),
  category: z.enum(['bilateral', 'multilateral', 'foundation', 'corporate', 'other']),
  agreementDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  objectives: z.array(z.string().max(500)).optional(),
  conditions: z.array(z.string().max(500)).optional(),
  reportingRequirements: z.string().max(2000).optional(),
  status: z.enum(['proposed', 'negotiating', 'signed', 'active', 'completed', 'suspended', 'cancelled']).default('proposed'),
});

export const grantUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  donorName: z.string().min(2).max(200).optional(),
  totalAmount: z.number().min(0).optional(),
  currency: z.string().max(10).optional(),
  description: z.string().max(5000).optional(),
  category: z.enum(['bilateral', 'multilateral', 'foundation', 'corporate', 'other']).optional(),
  agreementDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  objectives: z.array(z.string().max(500)).optional(),
  conditions: z.array(z.string().max(500)).optional(),
  reportingRequirements: z.string().max(2000).optional(),
  status: z.enum(['proposed', 'negotiating', 'signed', 'active', 'completed', 'suspended', 'cancelled']).optional(),
});

export const grantQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'totalAmount', 'donorName', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['proposed', 'negotiating', 'signed', 'active', 'completed', 'suspended', 'cancelled']).optional(),
  category: z.enum(['bilateral', 'multilateral', 'foundation', 'corporate', 'other']).optional(),
  ministryId: z.string().uuid().optional(),
});
// ─── GrantProject ────────────────────────────────────────────
export const grantProjectCreateSchema = z.object({
  grantId: z.string().uuid(),
  name: z.string().min(2).max(300),
  description: z.string().max(5000).optional(),
  budget: z.number().min(0),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  objectives: z.array(z.string().max(500)).optional(),
  activities: z.array(z.string().max(500)).optional(),
  beneficiaries: z.number().int().min(0).optional(),
  location: z.string().max(200).optional(),
  projectManager: z.string().max(200).optional(),
  milestones: z.array(z.object({
    name: z.string().max(200),
    targetDate: z.string().datetime(),
    status: z.enum(['pending', 'in_progress', 'completed', 'delayed']),
  })).optional(),
  status: z.enum(['planning', 'active', 'on_hold', 'completed', 'terminated']).default('planning'),
});

export const grantProjectUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  description: z.string().max(5000).optional(),
  budget: z.number().min(0).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  objectives: z.array(z.string().max(500)).optional(),
  activities: z.array(z.string().max(500)).optional(),
  beneficiaries: z.number().int().min(0).optional(),
  location: z.string().max(200).optional(),
  projectManager: z.string().max(200).optional(),
  milestones: z.array(z.object({
    name: z.string().max(200),
    targetDate: z.string().datetime(),
    status: z.enum(['pending', 'in_progress', 'completed', 'delayed']),
  })).optional(),
  status: z.enum(['planning', 'active', 'on_hold', 'completed', 'terminated']).optional(),
  completionPercentage: z.number().min(0).max(100).optional(),
});

export const grantProjectQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'budget', 'startDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['planning', 'active', 'on_hold', 'completed', 'terminated']).optional(),
  grantId: z.string().uuid().optional(),
});

// ─── Donor ───────────────────────────────────────────────────
export const donorCreateSchema = z.object({
  name: z.string().min(2).max(300),
  type: z.enum(['government', 'multilateral', 'foundation', 'corporate', 'individual', 'ngo']),
  country: z.string().min(2).max(100).optional(),
  contactPerson: z.string().max(200).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  totalContribution: z.number().min(0).optional(),
  focusAreas: z.array(z.string().max(100)).optional(),
  address: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'prospect']).default('active'),
});

export const donorUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  type: z.enum(['government', 'multilateral', 'foundation', 'corporate', 'individual', 'ngo']).optional(),
  country: z.string().min(2).max(100).optional(),
  contactPerson: z.string().max(200).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  totalContribution: z.number().min(0).optional(),
  focusAreas: z.array(z.string().max(100)).optional(),
  address: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'prospect']).optional(),
});

export const donorQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'totalContribution', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'prospect']).optional(),
  type: z.enum(['government', 'multilateral', 'foundation', 'corporate', 'individual', 'ngo']).optional(),
  country: z.string().max(100).optional(),
});

// ─── NgoPartner ──────────────────────────────────────────────
export const ngoPartnerCreateSchema = z.object({
  name: z.string().min(2).max(300),
  registrationNumber: z.string().max(100).optional(),
  type: z.enum(['local', 'international', 'faith_based', 'community', 'research']),
  country: z.string().min(2).max(100).optional(),
  contactPerson: z.string().max(200).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  focusAreas: z.array(z.string().max(100)),
  expertise: z.array(z.string().max(100)).optional(),
  partnershipStart: z.string().datetime().optional(),
  address: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'prospect']).default('active'),
});

export const ngoPartnerUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  registrationNumber: z.string().max(100).optional(),
  type: z.enum(['local', 'international', 'faith_based', 'community', 'research']).optional(),
  country: z.string().min(2).max(100).optional(),
  contactPerson: z.string().max(200).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  website: z.string().url().optional(),
  focusAreas: z.array(z.string().max(100)).optional(),
  expertise: z.array(z.string().max(100)).optional(),
  partnershipStart: z.string().datetime().optional(),
  address: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['active', 'inactive', 'prospect']).optional(),
});

export const ngoPartnerQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'country', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'prospect']).optional(),
  type: z.enum(['local', 'international', 'faith_based', 'community', 'research']).optional(),
  country: z.string().max(100).optional(),
});
// ─── BudgetAllocation ────────────────────────────────────────
export const budgetAllocationCreateSchema = z.object({
  ministryId: z.string().uuid(),
  fiscalYear: z.string().max(20),
  totalBudget: z.number().min(0),
  allocations: z.array(z.object({
    department: z.string().max(200),
    category: z.string().max(100),
    amount: z.number().min(0),
    percentage: z.number().min(0).max(100).optional(),
  })),
  approvedBy: z.string().uuid().optional(),
  approvalDate: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'submitted', 'approved', 'active', 'revised', 'closed']).default('draft'),
});

export const budgetAllocationUpdateSchema = z.object({
  fiscalYear: z.string().max(20).optional(),
  totalBudget: z.number().min(0).optional(),
  allocations: z.array(z.object({
    department: z.string().max(200),
    category: z.string().max(100),
    amount: z.number().min(0),
    percentage: z.number().min(0).max(100).optional(),
  })).optional(),
  approvedBy: z.string().uuid().optional(),
  approvalDate: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'submitted', 'approved', 'active', 'revised', 'closed']).optional(),
});

export const budgetAllocationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['fiscalYear', 'totalBudget', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'approved', 'active', 'revised', 'closed']).optional(),
  fiscalYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── RegionalBudget ──────────────────────────────────────────
export const regionalBudgetCreateSchema = z.object({
  regionId: z.string().uuid(),
  fiscalYear: z.string().max(20),
  totalBudget: z.number().min(0),
  allocations: z.array(z.object({
    category: z.string().max(100),
    amount: z.number().min(0),
    percentage: z.number().min(0).max(100).optional(),
  })),
  utilizationRate: z.number().min(0).max(100).optional(),
  approvedBy: z.string().uuid().optional(),
  approvalDate: z.string().datetime().optional(),
  status: z.enum(['draft', 'submitted', 'approved', 'active', 'closed']).default('draft'),
});

export const regionalBudgetUpdateSchema = z.object({
  fiscalYear: z.string().max(20).optional(),
  totalBudget: z.number().min(0).optional(),
  allocations: z.array(z.object({
    category: z.string().max(100),
    amount: z.number().min(0),
    percentage: z.number().min(0).max(100).optional(),
  })).optional(),
  utilizationRate: z.number().min(0).max(100).optional(),
  approvedBy: z.string().uuid().optional(),
  approvalDate: z.string().datetime().optional(),
  status: z.enum(['draft', 'submitted', 'approved', 'active', 'closed']).optional(),
});

export const regionalBudgetQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['fiscalYear', 'totalBudget', 'utilizationRate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'approved', 'active', 'closed']).optional(),
  fiscalYear: z.string().max(20).optional(),
  regionId: z.string().uuid().optional(),
});

// ─── FundDisbursement ────────────────────────────────────────
export const fundDisbursementCreateSchema = z.object({
  fundingId: z.string().uuid(),
  allocationId: z.string().uuid().optional(),
  amount: z.number().min(0),
  disbursementDate: z.string().datetime(),
  method: z.enum(['bank_transfer', 'cheque', 'cash', 'mobile_money', 'other']),
  referenceNumber: z.string().max(100).optional(),
  recipientEntity: z.string().max(200),
  recipientType: z.enum(['school', 'region', 'district', 'contractor', 'other']),
  purpose: z.string().max(1000),
  supportingDocuments: z.array(z.string().url()).optional(),
  approvedBy: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'disbursed', 'verified', 'cancelled']).default('pending'),
});

export const fundDisbursementUpdateSchema = z.object({
  amount: z.number().min(0).optional(),
  disbursementDate: z.string().datetime().optional(),
  method: z.enum(['bank_transfer', 'cheque', 'cash', 'mobile_money', 'other']).optional(),
  referenceNumber: z.string().max(100).optional(),
  recipientEntity: z.string().max(200).optional(),
  recipientType: z.enum(['school', 'region', 'district', 'contractor', 'other']).optional(),
  purpose: z.string().max(1000).optional(),
  supportingDocuments: z.array(z.string().url()).optional(),
  approvedBy: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'disbursed', 'verified', 'cancelled']).optional(),
});

export const fundDisbursementQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['amount', 'disbursementDate', 'recipientEntity', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['pending', 'approved', 'disbursed', 'verified', 'cancelled']).optional(),
  method: z.enum(['bank_transfer', 'cheque', 'cash', 'mobile_money', 'other']).optional(),
  fundingId: z.string().uuid().optional(),
  allocationId: z.string().uuid().optional(),
});
// ─── FundingReport ───────────────────────────────────────────
export const fundingReportCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'project', 'audit']),
  period: z.string().max(50),
  totalFunding: z.number().min(0),
  totalDisbursed: z.number().min(0).optional(),
  totalUtilized: z.number().min(0).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  challenges: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  submittedBy: z.string().uuid().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).default('draft'),
});

export const fundingReportUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'project', 'audit']).optional(),
  period: z.string().max(50).optional(),
  totalFunding: z.number().min(0).optional(),
  totalDisbursed: z.number().min(0).optional(),
  totalUtilized: z.number().min(0).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  challenges: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().max(5000).optional(),
});

export const fundingReportQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'period', 'totalFunding', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'project', 'audit']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── NationalStudentId ───────────────────────────────────────
export const nationalStudentIdCreateSchema = z.object({
  studentId: z.string().uuid(),
  nationalIdNumber: z.string().min(2).max(100),
  schoolId: z.string().uuid().optional(),
  fullName: z.string().min(2).max(200),
  dateOfBirth: z.string().datetime(),
  gender: z.enum(['male', 'female', 'other']),
  placeOfBirth: z.string().max(200).optional(),
  nationality: z.string().max(100).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  enrollmentYear: z.number().int().min(1900).max(2100),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']),
  photoUrl: z.string().url().optional(),
  biometricHash: z.string().max(256).optional(),
  issuedDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(['active', 'suspended', 'cancelled', 'expired']).default('active'),
});

export const nationalStudentIdUpdateSchema = z.object({
  nationalIdNumber: z.string().min(2).max(100).optional(),
  schoolId: z.string().uuid().optional(),
  fullName: z.string().min(2).max(200).optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  placeOfBirth: z.string().max(200).optional(),
  nationality: z.string().max(100).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  enrollmentYear: z.number().int().min(1900).max(2100).optional(),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']).optional(),
  photoUrl: z.string().url().optional(),
  biometricHash: z.string().max(256).optional(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(['active', 'suspended', 'cancelled', 'expired']).optional(),
});

export const nationalStudentIdQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['nationalIdNumber', 'fullName', 'enrollmentYear', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'suspended', 'cancelled', 'expired']).optional(),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']).optional(),
  region: z.string().max(200).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── TeacherRegistry ─────────────────────────────────────────
export const teacherRegistryCreateSchema = z.object({
  userId: z.string().uuid(),
  teacherIdNumber: z.string().min(2).max(100),
  fullName: z.string().min(2).max(200),
  dateOfBirth: z.string().datetime(),
  gender: z.enum(['male', 'female', 'other']),
  nationality: z.string().max(100).optional(),
  qualification: z.string().max(200),
  specialization: z.array(z.string().max(100)),
  experienceYears: z.number().int().min(0).max(50),
  schoolId: z.string().uuid().optional(),
  region: z.string().max(200).optional(),
  employmentType: z.enum(['permanent', 'contract', 'substitute', 'volunteer']),
  salaryGrade: z.string().max(50).optional(),
  licenseNumber: z.string().max(100).optional(),
  licenseExpiry: z.string().datetime().optional(),
  photoUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'retired', 'suspended', 'on_leave']).default('active'),
});

export const teacherRegistryUpdateSchema = z.object({
  teacherIdNumber: z.string().min(2).max(100).optional(),
  fullName: z.string().min(2).max(200).optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  nationality: z.string().max(100).optional(),
  qualification: z.string().max(200).optional(),
  specialization: z.array(z.string().max(100)).optional(),
  experienceYears: z.number().int().min(0).max(50).optional(),
  schoolId: z.string().uuid().optional(),
  region: z.string().max(200).optional(),
  employmentType: z.enum(['permanent', 'contract', 'substitute', 'volunteer']).optional(),
  salaryGrade: z.string().max(50).optional(),
  licenseNumber: z.string().max(100).optional(),
  licenseExpiry: z.string().datetime().optional(),
  photoUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'retired', 'suspended', 'on_leave']).optional(),
});

export const teacherRegistryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['teacherIdNumber', 'fullName', 'experienceYears', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'retired', 'suspended', 'on_leave']).optional(),
  employmentType: z.enum(['permanent', 'contract', 'substitute', 'volunteer']).optional(),
  region: z.string().max(200).optional(),
  schoolId: z.string().uuid().optional(),
});
// ─── SchoolRegistry ──────────────────────────────────────────
export const schoolRegistryCreateSchema = z.object({
  schoolId: z.string().uuid(),
  registrationNumber: z.string().min(2).max(100),
  name: z.string().min(2).max(300),
  type: z.enum(['public', 'private', 'ngo', 'community', 'international']),
  level: z.array(z.enum(['primary', 'secondary', 'tertiary', 'vocational'])),
  region: z.string().max(200),
  district: z.string().max(200),
  address: z.string().max(500),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  totalStudents: z.number().int().min(0).optional(),
  totalTeachers: z.number().int().min(0).optional(),
  yearEstablished: z.number().int().min(1800).max(2100).optional(),
  accreditationStatus: z.enum(['accredited', 'provisional', 'pending', 'not_accredited']).optional(),
  status: z.enum(['active', 'inactive', 'closed', 'pending']).default('active'),
});

export const schoolRegistryUpdateSchema = z.object({
  registrationNumber: z.string().min(2).max(100).optional(),
  name: z.string().min(2).max(300).optional(),
  type: z.enum(['public', 'private', 'ngo', 'community', 'international']).optional(),
  level: z.array(z.enum(['primary', 'secondary', 'tertiary', 'vocational'])).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  totalStudents: z.number().int().min(0).optional(),
  totalTeachers: z.number().int().min(0).optional(),
  yearEstablished: z.number().int().min(1800).max(2100).optional(),
  accreditationStatus: z.enum(['accredited', 'provisional', 'pending', 'not_accredited']).optional(),
  status: z.enum(['active', 'inactive', 'closed', 'pending']).optional(),
});

export const schoolRegistryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'registrationNumber', 'region', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'closed', 'pending']).optional(),
  type: z.enum(['public', 'private', 'ngo', 'community', 'international']).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
});

// ─── DigitalCertificate ──────────────────────────────────────
export const digitalCertificateCreateSchema = z.object({
  certificateId: z.string().uuid(),
  holderId: z.string().uuid(),
  certificateHash: z.string().min(10).max(256),
  blockchainTxId: z.string().max(256).optional(),
  issueDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  issuerSignature: z.string().max(500),
  verificationUrl: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
  status: z.enum(['valid', 'revoked', 'expired', 'pending']).default('valid'),
});

export const digitalCertificateUpdateSchema = z.object({
  certificateHash: z.string().min(10).max(256).optional(),
  blockchainTxId: z.string().max(256).optional(),
  expiryDate: z.string().datetime().optional(),
  issuerSignature: z.string().max(500).optional(),
  verificationUrl: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
  status: z.enum(['valid', 'revoked', 'expired', 'pending']).optional(),
});

export const digitalCertificateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['issueDate', 'expiryDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['valid', 'revoked', 'expired', 'pending']).optional(),
  certificateId: z.string().uuid().optional(),
  holderId: z.string().uuid().optional(),
});

// ─── QrVerification ──────────────────────────────────────────
export const qrVerificationCreateSchema = z.object({
  entityId: z.string().uuid(),
  entityType: z.enum(['certificate', 'diploma', 'student_id', 'teacher_id', 'school']),
  qrCode: z.string().max(500),
  verificationUrl: z.string().url(),
  hash: z.string().max(256),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  scanCount: z.number().int().min(0).default(0),
  lastScannedAt: z.string().datetime().optional(),
  lastScannedBy: z.string().max(200).optional(),
  status: z.enum(['active', 'expired', 'revoked']).default('active'),
});

export const qrVerificationUpdateSchema = z.object({
  qrCode: z.string().max(500).optional(),
  verificationUrl: z.string().url().optional(),
  hash: z.string().max(256).optional(),
  expiresAt: z.string().datetime().optional(),
  scanCount: z.number().int().min(0).optional(),
  lastScannedAt: z.string().datetime().optional(),
  lastScannedBy: z.string().max(200).optional(),
  status: z.enum(['active', 'expired', 'revoked']).optional(),
});

export const qrVerificationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['issuedAt', 'scanCount', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'expired', 'revoked']).optional(),
  entityType: z.enum(['certificate', 'diploma', 'student_id', 'teacher_id', 'school']).optional(),
  entityId: z.string().uuid().optional(),
});
// ─── IdentityVerification ────────────────────────────────────
export const identityVerificationCreateSchema = z.object({
  userId: z.string().uuid(),
  verificationType: z.enum(['national_id', 'passport', 'birth_certificate', 'biometric', 'manual']),
  documentNumber: z.string().max(100).optional(),
  documentUrl: z.string().url().optional(),
  submittedAt: z.string().datetime(),
  verifiedAt: z.string().datetime().optional(),
  verifiedBy: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'expired']).default('pending'),
});

export const identityVerificationUpdateSchema = z.object({
  verificationType: z.enum(['national_id', 'passport', 'birth_certificate', 'biometric', 'manual']).optional(),
  documentNumber: z.string().max(100).optional(),
  documentUrl: z.string().url().optional(),
  verifiedAt: z.string().datetime().optional(),
  verifiedBy: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'expired']).optional(),
});

export const identityVerificationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['submittedAt', 'verifiedAt', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'expired']).optional(),
  verificationType: z.enum(['national_id', 'passport', 'birth_certificate', 'biometric', 'manual']).optional(),
  userId: z.string().uuid().optional(),
});

// ─── BiometricData ───────────────────────────────────────────
export const biometricDataCreateSchema = z.object({
  userId: z.string().uuid(),
  biometricType: z.enum(['fingerprint', 'facial', 'iris', 'voice']),
  templateHash: z.string().max(256),
  quality: z.number().min(0).max(100),
  capturedAt: z.string().datetime(),
  capturedDevice: z.string().max(200).optional(),
  encryptedTemplate: z.string().max(1000).optional(),
  consentGiven: z.boolean().default(false),
  consentDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(['active', 'expired', 'revoked']).default('active'),
});

export const biometricDataUpdateSchema = z.object({
  biometricType: z.enum(['fingerprint', 'facial', 'iris', 'voice']).optional(),
  templateHash: z.string().max(256).optional(),
  quality: z.number().min(0).max(100).optional(),
  capturedDevice: z.string().max(200).optional(),
  encryptedTemplate: z.string().max(1000).optional(),
  consentGiven: z.boolean().optional(),
  consentDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(['active', 'expired', 'revoked']).optional(),
});

export const biometricDataQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['capturedAt', 'quality', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'expired', 'revoked']).optional(),
  biometricType: z.enum(['fingerprint', 'facial', 'iris', 'voice']).optional(),
  userId: z.string().uuid().optional(),
});

// ─── IdentityAudit ───────────────────────────────────────────
export const identityAuditCreateSchema = z.object({
  userId: z.string().uuid(),
  action: z.enum(['created', 'updated', 'verified', 'revoked', 'login', 'failed_login', 'password_change']),
  performedBy: z.string().uuid().optional(),
  ipAddress: z.string().max(50).optional(),
  userAgent: z.string().max(500).optional(),
  details: z.record(z.unknown()).optional(),
  result: z.enum(['success', 'failure', 'pending']),
  timestamp: z.string().datetime(),
  riskLevel: z.enum(['low', 'medium', 'high']).default('low'),
});

export const identityAuditUpdateSchema = z.object({
  action: z.enum(['created', 'updated', 'verified', 'revoked', 'login', 'failed_login', 'password_change']).optional(),
  performedBy: z.string().uuid().optional(),
  ipAddress: z.string().max(50).optional(),
  userAgent: z.string().max(500).optional(),
  details: z.record(z.unknown()).optional(),
  result: z.enum(['success', 'failure', 'pending']).optional(),
  riskLevel: z.enum(['low', 'medium', 'high']).optional(),
});

export const identityAuditQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['timestamp', 'action', 'riskLevel', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  action: z.enum(['created', 'updated', 'verified', 'revoked', 'login', 'failed_login', 'password_change']).optional(),
  result: z.enum(['success', 'failure', 'pending']).optional(),
  riskLevel: z.enum(['low', 'medium', 'high']).optional(),
  userId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});
// ─── NationalStandard ────────────────────────────────────────
export const nationalStandardCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  code: z.string().min(2).max(50),
  description: z.string().min(10).max(5000),
  category: z.enum(['academic', 'infrastructure', 'safety', 'governance', 'financial', 'environmental', 'digital']),
  scope: z.array(z.enum(['school', 'teacher', 'student', 'curriculum', 'assessment'])),
  effectiveDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  mandatoryCompliance: z.boolean().default(true),
  penalties: z.string().max(2000).optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'revised', 'withdrawn']).default('draft'),
});

export const nationalStandardUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().min(10).max(5000).optional(),
  category: z.enum(['academic', 'infrastructure', 'safety', 'governance', 'financial', 'environmental', 'digital']).optional(),
  scope: z.array(z.enum(['school', 'teacher', 'student', 'curriculum', 'assessment'])).optional(),
  effectiveDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  mandatoryCompliance: z.boolean().optional(),
  penalties: z.string().max(2000).optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'revised', 'withdrawn']).optional(),
});

export const nationalStandardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'revised', 'withdrawn']).optional(),
  category: z.enum(['academic', 'infrastructure', 'safety', 'governance', 'financial', 'environmental', 'digital']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── SchoolComplianceRecord ──────────────────────────────────
export const schoolComplianceRecordCreateSchema = z.object({
  schoolId: z.string().uuid(),
  standardId: z.string().uuid(),
  assessmentDate: z.string().datetime(),
  assessorId: z.string().uuid().optional(),
  score: z.number().min(0).max(100),
  compliantItems: z.number().int().min(0).optional(),
  nonCompliantItems: z.number().int().min(0).optional(),
  naItems: z.number().int().min(0).optional(),
  evidence: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
  nextReviewDate: z.string().datetime().optional(),
  status: z.enum(['compliant', 'partially_compliant', 'non_compliant', 'pending_review']).default('pending_review'),
});

export const schoolComplianceRecordUpdateSchema = z.object({
  standardId: z.string().uuid().optional(),
  assessmentDate: z.string().datetime().optional(),
  assessorId: z.string().uuid().optional(),
  score: z.number().min(0).max(100).optional(),
  compliantItems: z.number().int().min(0).optional(),
  nonCompliantItems: z.number().int().min(0).optional(),
  naItems: z.number().int().min(0).optional(),
  evidence: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
  nextReviewDate: z.string().datetime().optional(),
  status: z.enum(['compliant', 'partially_compliant', 'non_compliant', 'pending_review']).optional(),
});

export const schoolComplianceRecordQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['assessmentDate', 'score', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['compliant', 'partially_compliant', 'non_compliant', 'pending_review']).optional(),
  schoolId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
});

// ─── ComplianceAssessment ────────────────────────────────────
export const complianceAssessmentCreateSchema = z.object({
  schoolId: z.string().uuid(),
  assessmentType: z.enum(['internal', 'external', 'regulatory', 'voluntary']),
  assessmentDate: z.string().datetime(),
  assessorName: z.string().min(2).max(200),
  assessorOrganization: z.string().max(200).optional(),
  overallScore: z.number().min(0).max(100),
  categoryScores: z.record(z.number()).optional(),
  findings: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  followUpDate: z.string().datetime().optional(),
  reportUrl: z.string().url().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).default('draft'),
});

export const complianceAssessmentUpdateSchema = z.object({
  assessmentType: z.enum(['internal', 'external', 'regulatory', 'voluntary']).optional(),
  assessmentDate: z.string().datetime().optional(),
  assessorName: z.string().min(2).max(200).optional(),
  assessorOrganization: z.string().max(200).optional(),
  overallScore: z.number().min(0).max(100).optional(),
  categoryScores: z.record(z.number()).optional(),
  findings: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  followUpDate: z.string().datetime().optional(),
  reportUrl: z.string().url().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
});

export const complianceAssessmentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['assessmentDate', 'overallScore', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  assessmentType: z.enum(['internal', 'external', 'regulatory', 'voluntary']).optional(),
  schoolId: z.string().uuid().optional(),
});
// ─── ComplianceWaiver ────────────────────────────────────────
export const complianceWaiverCreateSchema = z.object({
  schoolId: z.string().uuid(),
  standardId: z.string().uuid(),
  waiverType: z.enum(['temporary', 'partial', 'conditional', 'permanent']),
  reason: z.string().min(10).max(5000),
  requestedBy: z.string().uuid().optional(),
  requestDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  approvedBy: z.string().uuid().optional(),
  approvalDate: z.string().datetime().optional(),
  status: z.enum(['pending', 'approved', 'denied', 'expired', 'revoked']).default('pending'),
});

export const complianceWaiverUpdateSchema = z.object({
  standardId: z.string().uuid().optional(),
  waiverType: z.enum(['temporary', 'partial', 'conditional', 'permanent']).optional(),
  reason: z.string().min(10).max(5000).optional(),
  expiryDate: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  approvedBy: z.string().uuid().optional(),
  approvalDate: z.string().datetime().optional(),
  status: z.enum(['pending', 'approved', 'denied', 'expired', 'revoked']).optional(),
  denialReason: z.string().max(2000).optional(),
});

export const complianceWaiverQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['requestDate', 'expiryDate', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['pending', 'approved', 'denied', 'expired', 'revoked']).optional(),
  waiverType: z.enum(['temporary', 'partial', 'conditional', 'permanent']).optional(),
  schoolId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
});

// ─── RegulationCategory ──────────────────────────────────────
export const regulationCategoryCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(50),
  description: z.string().max(2000).optional(),
  parentCategoryId: z.string().uuid().optional(),
  sortOrder: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const regulationCategoryUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(50).optional(),
  description: z.string().max(2000).optional(),
  parentCategoryId: z.string().uuid().optional(),
  sortOrder: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export const regulationCategoryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'sortOrder', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  parentCategoryId: z.string().uuid().optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── EducationRegulation ─────────────────────────────────────
export const educationRegulationCreateSchema = z.object({
  ministryId: z.string().uuid(),
  categoryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  referenceNumber: z.string().min(2).max(100),
  description: z.string().min(10).max(10000),
  content: z.string().min(10).max(50000).optional(),
  effectiveDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  targetEntities: z.array(z.enum(['school', 'teacher', 'student', 'parent', 'all'])),
  mandatory: z.boolean().default(true),
  penalties: z.string().max(3000).optional(),
  documentUrl: z.string().url().optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'amended', 'repealed']).default('draft'),
});

export const educationRegulationUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  referenceNumber: z.string().min(2).max(100).optional(),
  description: z.string().min(10).max(10000).optional(),
  content: z.string().min(10).max(50000).optional(),
  effectiveDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  targetEntities: z.array(z.enum(['school', 'teacher', 'student', 'parent', 'all'])).optional(),
  mandatory: z.boolean().optional(),
  penalties: z.string().max(3000).optional(),
  documentUrl: z.string().url().optional(),
  version: z.string().max(20).optional(),
  status: z.enum(['draft', 'active', 'amended', 'repealed']).optional(),
});

export const educationRegulationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'referenceNumber', 'effectiveDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'active', 'amended', 'repealed']).optional(),
  categoryId: z.string().uuid().optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── ComplianceNotification ──────────────────────────────────
export const complianceNotificationCreateSchema = z.object({
  schoolId: z.string().uuid(),
  regulationId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
  type: z.enum(['reminder', 'warning', 'violation', 'deadline', 'update']),
  title: z.string().min(2).max(300),
  message: z.string().min(10).max(5000),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  dueDate: z.string().datetime().optional(),
  sentAt: z.string().datetime().optional(),
  acknowledgedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'sent', 'acknowledged', 'overdue', 'archived']).default('draft'),
});

export const complianceNotificationUpdateSchema = z.object({
  regulationId: z.string().uuid().optional(),
  standardId: z.string().uuid().optional(),
  type: z.enum(['reminder', 'warning', 'violation', 'deadline', 'update']).optional(),
  title: z.string().min(2).max(300).optional(),
  message: z.string().min(10).max(5000).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  dueDate: z.string().datetime().optional(),
  sentAt: z.string().datetime().optional(),
  acknowledgedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'sent', 'acknowledged', 'overdue', 'archived']).optional(),
});

export const complianceNotificationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'priority', 'dueDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'sent', 'acknowledged', 'overdue', 'archived']).optional(),
  type: z.enum(['reminder', 'warning', 'violation', 'deadline', 'update']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  schoolId: z.string().uuid().optional(),
});

// ─── ComplianceReport ────────────────────────────────────────
export const complianceReportCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  reportType: z.enum(['annual', 'quarterly', 'special', 'breach', 'audit']),
  period: z.string().max(50),
  totalSchools: z.number().int().min(0).optional(),
  compliantSchools: z.number().int().min(0).optional(),
  partiallyCompliant: z.number().int().min(0).optional(),
  nonCompliant: z.number().int().min(0).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  submittedBy: z.string().uuid().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).default('draft'),
});

export const complianceReportUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  reportType: z.enum(['annual', 'quarterly', 'special', 'breach', 'audit']).optional(),
  period: z.string().max(50).optional(),
  totalSchools: z.number().int().min(0).optional(),
  compliantSchools: z.number().int().min(0).optional(),
  partiallyCompliant: z.number().int().min(0).optional(),
  nonCompliant: z.number().int().min(0).optional(),
  highlights: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().max(5000).optional(),
});

export const complianceReportQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'period', 'reportType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reportType: z.enum(['annual', 'quarterly', 'special', 'breach', 'audit']).optional(),
  ministryId: z.string().uuid().optional(),
});
// ─── Country ─────────────────────────────────────────────────
export const countryCreateSchema = z.object({
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(10),
  iso3Code: z.string().length(3).optional(),
  region: z.string().max(100).optional(),
  subRegion: z.string().max(100).optional(),
  population: z.number().int().min(0).optional(),
  area: z.number().min(0).optional(),
  capital: z.string().max(200).optional(),
  currency: z.string().max(10).optional(),
  phoneCode: z.string().max(10).optional(),
  languages: z.array(z.string().max(50)).optional(),
  educationSystem: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const countryUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(10).optional(),
  iso3Code: z.string().length(3).optional(),
  region: z.string().max(100).optional(),
  subRegion: z.string().max(100).optional(),
  population: z.number().int().min(0).optional(),
  area: z.number().min(0).optional(),
  capital: z.string().max(200).optional(),
  currency: z.string().max(10).optional(),
  phoneCode: z.string().max(10).optional(),
  languages: z.array(z.string().max(50)).optional(),
  educationSystem: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export const countryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'region', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  region: z.string().max(100).optional(),
});

// ─── Language ────────────────────────────────────────────────
export const languageCreateSchema = z.object({
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(10),
  iso639_1: z.string().length(2).optional(),
  iso639_2: z.string().length(3).optional(),
  family: z.string().max(100).optional(),
  speakers: z.number().int().min(0).optional(),
  isOfficial: z.boolean().default(false),
  countries: z.array(z.string().max(10)).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const languageUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().min(2).max(10).optional(),
  iso639_1: z.string().length(2).optional(),
  iso639_2: z.string().length(3).optional(),
  family: z.string().max(100).optional(),
  speakers: z.number().int().min(0).optional(),
  isOfficial: z.boolean().optional(),
  countries: z.array(z.string().max(10)).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export const languageQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'speakers', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  isOfficial: z.boolean().optional(),
});

// ─── Currency ────────────────────────────────────────────────
export const currencyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  code: z.string().length(3),
  symbol: z.string().max(10),
  decimalPlaces: z.number().int().min(0).max(4).default(2),
  countries: z.array(z.string().max(10)).optional(),
  exchangeRate: z.number().min(0).optional(),
  baseCurrency: z.string().length(3).optional(),
  lastUpdated: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const currencyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  code: z.string().length(3).optional(),
  symbol: z.string().max(10).optional(),
  decimalPlaces: z.number().int().min(0).max(4).optional(),
  countries: z.array(z.string().max(10)).optional(),
  exchangeRate: z.number().min(0).optional(),
  baseCurrency: z.string().length(3).optional(),
  lastUpdated: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export const currencyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

// ─── EducationSystem ─────────────────────────────────────────
export const educationSystemCreateSchema = z.object({
  countryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  structure: z.array(z.object({
    level: z.string().max(100),
    startAge: z.number().int().min(0).max(25),
    endAge: z.number().int().min(0).max(25),
    duration: z.number().int().min(1).max(10),
    type: z.enum(['compulsory', 'optional', 'free']),
  })),
  officialLanguage: z.string().max(100).optional(),
  academicYearStart: z.string().max(50).optional(),
  gradingSystem: z.string().max(200).optional(),
  entranceExams: z.array(z.string().max(200)).optional(),
  governingBody: z.string().max(200).optional(),
  website: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'under_reform']).default('active'),
});

export const educationSystemUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  structure: z.array(z.object({
    level: z.string().max(100),
    startAge: z.number().int().min(0).max(25),
    endAge: z.number().int().min(0).max(25),
    duration: z.number().int().min(1).max(10),
    type: z.enum(['compulsory', 'optional', 'free']),
  })).optional(),
  officialLanguage: z.string().max(100).optional(),
  academicYearStart: z.string().max(50).optional(),
  gradingSystem: z.string().max(200).optional(),
  entranceExams: z.array(z.string().max(200)).optional(),
  governingBody: z.string().max(200).optional(),
  website: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'under_reform']).optional(),
});

export const educationSystemQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'under_reform']).optional(),
  countryId: z.string().uuid().optional(),
});
// ─── Equivalency ─────────────────────────────────────────────
export const equivalencyCreateSchema = z.object({
  sourceCountryId: z.string().uuid(),
  targetCountryId: z.string().uuid(),
  sourceQualification: z.string().min(2).max(300),
  targetQualification: z.string().min(2).max(300),
  sourceLevel: z.string().max(200),
  targetLevel: z.string().max(200),
  conversionNotes: z.string().max(2000).optional(),
  approvedBy: z.string().uuid().optional(),
  effectiveDate: z.string().datetime(),
  documentUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'under_review']).default('active'),
});

export const equivalencyUpdateSchema = z.object({
  sourceQualification: z.string().min(2).max(300).optional(),
  targetQualification: z.string().min(2).max(300).optional(),
  sourceLevel: z.string().max(200).optional(),
  targetLevel: z.string().max(200).optional(),
  conversionNotes: z.string().max(2000).optional(),
  approvedBy: z.string().uuid().optional(),
  effectiveDate: z.string().datetime().optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'under_review']).optional(),
});

export const equivalencyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['sourceQualification', 'targetQualification', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'under_review']).optional(),
  sourceCountryId: z.string().uuid().optional(),
  targetCountryId: z.string().uuid().optional(),
});

// ─── InternationalPartnership ────────────────────────────────
export const internationalPartnershipCreateSchema = z.object({
  ministryId: z.string().uuid(),
  partnerCountryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  description: z.string().max(5000).optional(),
  partnershipType: z.enum(['bilateral', 'multilateral', 'research', 'capacity_building', 'exchange']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  budget: z.number().min(0).optional(),
  objectives: z.array(z.string().max(500)).optional(),
  contactPerson: z.string().max(200).optional(),
  contactEmail: z.string().email().optional(),
  agreementUrl: z.string().url().optional(),
  status: z.enum(['proposed', 'active', 'completed', 'suspended', 'cancelled']).default('proposed'),
});

export const internationalPartnershipUpdateSchema = z.object({
  partnerCountryId: z.string().uuid().optional(),
  title: z.string().min(2).max(300).optional(),
  description: z.string().max(5000).optional(),
  partnershipType: z.enum(['bilateral', 'multilateral', 'research', 'capacity_building', 'exchange']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  budget: z.number().min(0).optional(),
  objectives: z.array(z.string().max(500)).optional(),
  contactPerson: z.string().max(200).optional(),
  contactEmail: z.string().email().optional(),
  agreementUrl: z.string().url().optional(),
  status: z.enum(['proposed', 'active', 'completed', 'suspended', 'cancelled']).optional(),
});

export const internationalPartnershipQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'partnershipType', 'startDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['proposed', 'active', 'completed', 'suspended', 'cancelled']).optional(),
  partnershipType: z.enum(['bilateral', 'multilateral', 'research', 'capacity_building', 'exchange']).optional(),
  ministryId: z.string().uuid().optional(),
  partnerCountryId: z.string().uuid().optional(),
});

// ─── ExchangeProgram ─────────────────────────────────────────
export const exchangeProgramCreateSchema = z.object({
  partnershipId: z.string().uuid(),
  name: z.string().min(2).max(300),
  description: z.string().max(5000).optional(),
  type: z.enum(['student', 'teacher', 'researcher', 'administrator']),
  direction: z.enum(['outbound', 'inbound', 'bidirectional']),
  totalSlots: z.number().int().min(1),
  duration: z.string().max(100),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  applicationDeadline: z.string().datetime(),
  eligibility: z.array(z.string().max(500)).optional(),
  benefits: z.array(z.string().max(500)).optional(),
  fundingCovered: z.array(z.string().max(100)).optional(),
  status: z.enum(['draft', 'open', 'closed', 'in_progress', 'completed', 'cancelled']).default('draft'),
});

export const exchangeProgramUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  description: z.string().max(5000).optional(),
  type: z.enum(['student', 'teacher', 'researcher', 'administrator']).optional(),
  direction: z.enum(['outbound', 'inbound', 'bidirectional']).optional(),
  totalSlots: z.number().int().min(1).optional(),
  duration: z.string().max(100).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  applicationDeadline: z.string().datetime().optional(),
  eligibility: z.array(z.string().max(500)).optional(),
  benefits: z.array(z.string().max(500)).optional(),
  fundingCovered: z.array(z.string().max(100)).optional(),
  status: z.enum(['draft', 'open', 'closed', 'in_progress', 'completed', 'cancelled']).optional(),
});

export const exchangeProgramQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'startDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'open', 'closed', 'in_progress', 'completed', 'cancelled']).optional(),
  type: z.enum(['student', 'teacher', 'researcher', 'administrator']).optional(),
  partnershipId: z.string().uuid().optional(),
});
// ─── InternationalStudent ────────────────────────────────────
export const internationalStudentCreateSchema = z.object({
  studentId: z.string().uuid(),
  homeCountryId: z.string().uuid(),
  hostCountryId: z.string().uuid(),
  programId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  visaType: z.string().max(100).optional(),
  visaNumber: z.string().max(100).optional(),
  visaExpiry: z.string().datetime().optional(),
  arrivalDate: z.string().datetime().optional(),
  expectedGraduation: z.string().datetime().optional(),
  sponsorName: z.string().max(200).optional(),
  sponsorCountry: z.string().max(100).optional(),
  insuranceValid: z.boolean().default(false),
  status: z.enum(['active', 'graduated', 'withdrawn', 'expired', 'transferred']).default('active'),
});

export const internationalStudentUpdateSchema = z.object({
  homeCountryId: z.string().uuid().optional(),
  hostCountryId: z.string().uuid().optional(),
  programId: z.string().uuid().optional(),
  schoolId: z.string().uuid().optional(),
  visaType: z.string().max(100).optional(),
  visaNumber: z.string().max(100).optional(),
  visaExpiry: z.string().datetime().optional(),
  arrivalDate: z.string().datetime().optional(),
  expectedGraduation: z.string().datetime().optional(),
  sponsorName: z.string().max(200).optional(),
  sponsorCountry: z.string().max(100).optional(),
  insuranceValid: z.boolean().optional(),
  status: z.enum(['active', 'graduated', 'withdrawn', 'expired', 'transferred']).optional(),
});

export const internationalStudentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['visaExpiry', 'arrivalDate', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'graduated', 'withdrawn', 'expired', 'transferred']).optional(),
  homeCountryId: z.string().uuid().optional(),
  hostCountryId: z.string().uuid().optional(),
  programId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
});

// ─── CrossBorderResearch ─────────────────────────────────────
export const crossBorderResearchCreateSchema = z.object({
  ministryId: z.string().uuid(),
  title: z.string().min(2).max(300),
  description: z.string().max(5000).optional(),
  researchType: z.enum(['joint', 'collaborative', 'comparative', 'capacity_building']),
  participatingCountries: z.array(z.string().uuid()),
  leadResearcher: z.string().max(200).optional(),
  leadInstitution: z.string().max(200).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  budget: z.number().min(0).optional(),
  fundingSource: z.string().max(200).optional(),
  objectives: z.array(z.string().max(500)).optional(),
  methodology: z.string().max(2000).optional(),
  expectedOutcomes: z.array(z.string().max(500)).optional(),
  publicationUrl: z.string().url().optional(),
  status: z.enum(['proposal', 'active', 'completed', 'published', 'cancelled']).default('proposal'),
});

export const crossBorderResearchUpdateSchema = z.object({
  title: z.string().min(2).max(300).optional(),
  description: z.string().max(5000).optional(),
  researchType: z.enum(['joint', 'collaborative', 'comparative', 'capacity_building']).optional(),
  participatingCountries: z.array(z.string().uuid()).optional(),
  leadResearcher: z.string().max(200).optional(),
  leadInstitution: z.string().max(200).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  budget: z.number().min(0).optional(),
  fundingSource: z.string().max(200).optional(),
  objectives: z.array(z.string().max(500)).optional(),
  methodology: z.string().max(2000).optional(),
  expectedOutcomes: z.array(z.string().max(500)).optional(),
  publicationUrl: z.string().url().optional(),
  status: z.enum(['proposal', 'active', 'completed', 'published', 'cancelled']).optional(),
});

export const crossBorderResearchQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'researchType', 'startDate', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['proposal', 'active', 'completed', 'published', 'cancelled']).optional(),
  researchType: z.enum(['joint', 'collaborative', 'comparative', 'capacity_building']).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── GlobalBenchmark ─────────────────────────────────────────
export const globalBenchmarkCreateSchema = z.object({
  ministryId: z.string().uuid(),
  name: z.string().min(2).max(300),
  description: z.string().max(2000).optional(),
  source: z.string().min(2).max(200),
  sourceUrl: z.string().url().optional(),
  year: z.number().int().min(2000).max(2100),
  country: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  category: z.enum(['enrollment', 'literacy', 'spending', 'pisa', 'teacher_ratio', 'completion', 'other']),
  value: z.number(),
  unit: z.string().max(50),
  rank: z.number().int().min(0).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'verified', 'published']).default('draft'),
});

export const globalBenchmarkUpdateSchema = z.object({
  name: z.string().min(2).max(300).optional(),
  description: z.string().max(2000).optional(),
  source: z.string().min(2).max(200).optional(),
  sourceUrl: z.string().url().optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  country: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  category: z.enum(['enrollment', 'literacy', 'spending', 'pisa', 'teacher_ratio', 'completion', 'other']).optional(),
  value: z.number().optional(),
  unit: z.string().max(50).optional(),
  rank: z.number().int().min(0).optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'verified', 'published']).optional(),
});

export const globalBenchmarkQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'year', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['draft', 'verified', 'published']).optional(),
  category: z.enum(['enrollment', 'literacy', 'spending', 'pisa', 'teacher_ratio', 'completion', 'other']).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  country: z.string().max(100).optional(),
  ministryId: z.string().uuid().optional(),
});

// ─── Analytics Filter Schemas ────────────────────────────────
export const educationKpiFilterSchema = z.object({
  status: z.enum(['on_track', 'at_risk', 'behind', 'achieved', 'not_started']).optional(),
  category: z.enum(['enrollment', 'retention', 'achievement', 'equity', 'finance', 'infrastructure', 'teacher']).optional(),
  academicYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const scholarshipFilterSchema = z.object({
  status: z.enum(['draft', 'open', 'closed', 'reviewing', 'awarded', 'cancelled']).optional(),
  type: z.enum(['merit', 'need_based', 'sports', 'cultural', 'minority', 'disability', 'government', 'international']).optional(),
  academicYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const grantFilterSchema = z.object({
  status: z.enum(['proposed', 'negotiating', 'signed', 'active', 'completed', 'suspended', 'cancelled']).optional(),
  category: z.enum(['bilateral', 'multilateral', 'foundation', 'corporate', 'other']).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const governmentFundingFilterSchema = z.object({
  status: z.enum(['proposed', 'approved', 'disbursed', 'partially_disbursed', 'completed', 'cancelled']).optional(),
  category: z.enum(['capital', 'recurrent', 'development', 'emergency', 'scholarship']).optional(),
  fiscalYear: z.string().max(20).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const nationalStudentIdFilterSchema = z.object({
  status: z.enum(['active', 'suspended', 'cancelled', 'expired']).optional(),
  level: z.enum(['primary', 'secondary', 'tertiary', 'vocational']).optional(),
  region: z.string().max(200).optional(),
  schoolId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const teacherRegistryFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'retired', 'suspended', 'on_leave']).optional(),
  employmentType: z.enum(['permanent', 'contract', 'substitute', 'volunteer']).optional(),
  region: z.string().max(200).optional(),
  schoolId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const schoolRegistryFilterSchema = z.object({
  status: z.enum(['active', 'inactive', 'closed', 'pending']).optional(),
  type: z.enum(['public', 'private', 'ngo', 'community', 'international']).optional(),
  region: z.string().max(200).optional(),
  district: z.string().max(200).optional(),
  search: z.string().max(200).optional(),
});

export const educationRegulationFilterSchema = z.object({
  status: z.enum(['draft', 'active', 'amended', 'repealed']).optional(),
  categoryId: z.string().uuid().optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const complianceAssessmentFilterSchema = z.object({
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  assessmentType: z.enum(['internal', 'external', 'regulatory', 'voluntary']).optional(),
  schoolId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export const fundingReportFilterSchema = z.object({
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'published']).optional(),
  reportType: z.enum(['annual', 'quarterly', 'monthly', 'project', 'audit']).optional(),
  ministryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});
