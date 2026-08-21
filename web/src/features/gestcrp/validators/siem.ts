import { z } from 'zod';
import { siemRuleSchema } from '@educi/types';

export const createSIEMRuleSchema = siemRuleSchema;

export const updateSIEMRuleSchema = siemRuleSchema.partial();
