import { z } from 'zod';
import { dlpPolicySchema, encryptionKeySchema } from '@educi/types';

export const createDLPPolicySchema = dlpPolicySchema;

export const updateDLPPolicySchema = dlpPolicySchema.partial();

export const createEncryptionKeySchema = encryptionKeySchema;

export const updateEncryptionKeySchema = encryptionKeySchema.partial();
