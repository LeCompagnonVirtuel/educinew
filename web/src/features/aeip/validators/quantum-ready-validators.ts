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

export const QuantumReadinessCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  status: z.enum(['assessing', 'preparing', 'ready', 'implementing', 'complete']).optional(),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
  assessmentDate: zOptionalDate,
  readinessScore: zOptionalNumber,
});

export const QuantumReadinessUpdateSchema = QuantumReadinessCreateSchema.partial();

export const QuantumAlgorithmCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['optimization', 'simulation', 'machine_learning', 'cryptography', 'search']),
  complexity: z.enum(['low', 'medium', 'high', 'experimental']),
  status: z.enum(['research', 'prototype', 'tested', 'production']).optional(),
  classicalAlternative: zOptionalString,
  quantumAdvantage: zOptionalString,
  qubitsRequired: zOptionalNumber,
  school_id: zUuid,
});

export const QuantumAlgorithmUpdateSchema = QuantumAlgorithmCreateSchema.partial();

export const QuantumSimulationCreateSchema = z.object({
  algorithm_id: zUuid,
  name: zString('nom'),
  description: zOptionalString,
  input: zRecord(z.unknown()),
  output: zRecord(z.unknown()).optional(),
  status: z.enum(['queued', 'running', 'completed', 'failed']).optional(),
  classicalTime: zOptionalNumber,
  quantumTime: zOptionalNumber,
  accuracy: zOptionalNumber,
  qubitsUsed: zOptionalNumber,
  startedAt: zOptionalDate,
  completedAt: zOptionalDate,
  school_id: zUuid,
});

export const QuantumSimulationUpdateSchema = QuantumSimulationCreateSchema.partial();

export const QuantumCryptographyCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['qkd', 'pqc', 'hybrid', 'quantum_resistant']),
  algorithm: zString('algorithme'),
  keySize: zOptionalNumber,
  status: z.enum(['testing', 'deployed', 'monitoring']).optional(),
  lastTest: zOptionalDate,
  expiryDate: zOptionalDate,
  school_id: zUuid,
});

export const QuantumCryptographyUpdateSchema = QuantumCryptographyCreateSchema.partial();

export const QuantumEducationModuleCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  topics: zArray(zRecord(z.unknown())),
  duration: zOptionalNumber,
  prerequisites: zOptionalArray(zUuid),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  enrollmentCount: zOptionalNumber,
  rating: zOptionalNumber,
  school_id: zUuid,
});

export const QuantumEducationModuleUpdateSchema = QuantumEducationModuleCreateSchema.partial();

export const QuantumResearchProjectCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  domain: z.enum(['quantum_computing', 'quantum_ai', 'quantum_cryptography', 'quantum_sensing', 'quantum_network']),
  status: z.enum(['proposal', 'funded', 'in_progress', 'completed', 'published']).optional(),
  leadResearcher: zOptionalUuid,
  team: zOptionalArray(zUuid),
  budget: zOptionalNumber,
  startDate: zOptionalDate,
  endDate: zOptionalDate,
  outcomes: zOptionalArray(zRecord(z.unknown())),
  school_id: zUuid,
});

export const QuantumResearchProjectUpdateSchema = QuantumResearchProjectCreateSchema.partial();

export const QuantumHardwareCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['simulator', 'emulator', 'real_hardware', 'cloud_access']),
  provider: zOptionalString,
  qubits: zOptionalNumber,
  connectivity: zOptionalString,
  errorRate: zOptionalNumber,
  status: z.enum(['available', 'busy', 'maintenance', 'offline']).optional(),
  lastCalibration: zOptionalDate,
  school_id: zUuid,
});

export const QuantumHardwareUpdateSchema = QuantumHardwareCreateSchema.partial();

export const QuantumBenchmarkCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  algorithm_id: zUuid,
  hardware_id: zOptionalUuid,
  metrics: zRecord(z.unknown()),
  classicalResult: zOptionalNumber,
  quantumResult: zOptionalNumber,
  improvement: zOptionalNumber,
  runs: zOptionalNumber,
  executedAt: zOptionalDate,
  school_id: zUuid,
});

export const QuantumBenchmarkUpdateSchema = QuantumBenchmarkCreateSchema.partial();
