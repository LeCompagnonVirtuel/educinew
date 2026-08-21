import { z } from 'zod';
import { bcpPlanSchema } from '@educi/types';

export const createBCPPlanSchema = bcpPlanSchema;

export const updateBCPPlanSchema = bcpPlanSchema.partial();
