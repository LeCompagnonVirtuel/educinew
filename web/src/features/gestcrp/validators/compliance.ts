import { z } from 'zod';
import { complianceAssessmentSchema, governancePolicySchema } from '@educi/types';

export const createComplianceAssessmentSchema = complianceAssessmentSchema;

export const updateComplianceAssessmentSchema = complianceAssessmentSchema.partial();

export const createGovernancePolicySchema = governancePolicySchema;

export const updateGovernancePolicySchema = governancePolicySchema.partial();
