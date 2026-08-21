import { z } from 'zod';
import { zeroTrustPolicySchema } from '@educi/types';

export const createZeroTrustPolicySchema = zeroTrustPolicySchema;

export const updateZeroTrustPolicySchema = zeroTrustPolicySchema.partial();
