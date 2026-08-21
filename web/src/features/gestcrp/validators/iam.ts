import { z } from 'zod';
import { iamPolicySchema } from '@educi/types';

export const createIAMPolicySchema = iamPolicySchema;

export const updateIAMPolicySchema = iamPolicySchema.partial();
