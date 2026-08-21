import { z } from 'zod';

const zString = (fieldName: string) => z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(1, `Le ${fieldName} est requis`);
const zOptionalString = z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0);
const zOptionalNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0).optional();
const zBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zUuid = z.string().uuid('UUID invalide');
const zOptionalUuid = z.string().uuid('UUID invalide').optional();
const zArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema).optional();
const zRecord = <T extends z.ZodTypeAny>(schema: T) => z.record(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });

export const AcademicIntelligenceCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['performance', 'engagement', 'retention', 'prediction', 'recommendation']),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
  model: zOptionalString,
  accuracy: zOptionalNumber,
});

export const AcademicIntelligenceUpdateSchema = AcademicIntelligenceCreateSchema.partial();

export const StudentPerformanceCreateSchema = z.object({
  intelligence_id: zUuid,
  student_id: zUuid,
  subject_id: zOptionalUuid,
  class_id: zOptionalUuid,
  metrics: zRecord(z.unknown()),
  score: zOptionalNumber,
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  period: zString('période'),
  analysis: zOptionalString,
  recommendations: zOptionalArray(zString('recommandation')),
  analyzedAt: zOptionalDate,
  school_id: zUuid,
});

export const StudentPerformanceUpdateSchema = StudentPerformanceCreateSchema.partial();

export const LearningPathCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  student_id: zUuid,
  subject_id: zOptionalUuid,
  objectives: zArray(zRecord(z.unknown())),
  modules: zArray(zRecord(z.unknown())),
  status: z.enum(['draft', 'active', 'completed', 'paused']).optional(),
  progress: zOptionalNumber,
  estimatedDuration: zOptionalNumber,
  actualDuration: zOptionalNumber,
  startDate: zOptionalDate,
  endDate: zOptionalDate,
  school_id: zUuid,
});

export const LearningPathUpdateSchema = LearningPathCreateSchema.partial();

export const InterventionCreateSchema = z.object({
  student_id: zUuid,
  type: z.enum(['academic', 'behavioral', 'social', 'health', 'career']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  description: zString('description'),
  status: z.enum(['identified', 'planned', 'in_progress', 'completed', 'cancelled']).optional(),
  assignedTo: zOptionalUuid,
  startDate: zOptionalDate,
  endDate: zOptionalDate,
  outcomes: zOptionalArray(zRecord(z.unknown())),
  school_id: zUuid,
});

export const InterventionUpdateSchema = InterventionCreateSchema.partial();

export const LearningStyleCreateSchema = z.object({
  student_id: zUuid,
  style: z.enum(['visual', 'auditory', 'kinesthetic', 'reading', 'multimodal']),
  confidence: zOptionalNumber,
  preferences: zRecord(z.unknown()).optional(),
  assessmentDate: zOptionalDate,
  school_id: zUuid,
});

export const LearningStyleUpdateSchema = LearningStyleCreateSchema.partial();

export const AcademicRiskCreateSchema = z.object({
  student_id: zUuid,
  riskType: z.enum(['dropout', 'failure', 'absenteeism', 'behavioral', 'social']),
  level: z.enum(['low', 'medium', 'high', 'critical']),
  factors: zArray(zRecord(z.unknown())),
  score: zNumber,
  status: z.enum(['detected', 'monitoring', 'intervening', 'resolved']).optional(),
  detectedAt: zOptionalDate,
  resolvedAt: zOptionalDate,
  school_id: zUuid,
});

export const AcademicRiskUpdateSchema = AcademicRiskCreateSchema.partial();

export const CurriculumMappingCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  gradeLevel: zString('niveau'),
  subject_id: zUuid,
  competencies: zArray(zRecord(z.unknown())),
  standards: zOptionalArray(zString('référence')),
  status: z.enum(['draft', 'approved', 'active', 'archived']).optional(),
  effectiveDate: zOptionalDate,
  school_id: zUuid,
});

export const CurriculumMappingUpdateSchema = CurriculumMappingCreateSchema.partial();

export const AcademicInsightCreateSchema = z.object({
  intelligence_id: zUuid,
  insightType: z.enum(['trend', 'correlation', 'anomaly', 'prediction', 'recommendation']),
  title: zString('titre'),
  description: zString('description'),
  data: zRecord(z.unknown()),
  confidence: zOptionalNumber,
  impact: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['new', 'reviewed', 'actioned', 'archived']).optional(),
  reviewedBy: zOptionalUuid,
  reviewedAt: zOptionalDate,
  school_id: zUuid,
});

export const AcademicInsightUpdateSchema = AcademicInsightCreateSchema.partial();

export const AcademicBenchmarkCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['internal', 'regional', 'national', 'international']),
  metrics: zArray(zRecord(z.unknown())),
  period: zString('période'),
  school_id: zUuid,
  rank: zOptionalNumber,
  percentile: zOptionalNumber,
  calculatedAt: zOptionalDate,
});

export const AcademicBenchmarkUpdateSchema = AcademicBenchmarkCreateSchema.partial();
