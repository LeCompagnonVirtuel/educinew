import { z } from 'zod';
import { appScanSchema, apiSecurityPolicySchema } from '@educi/types';

export const createAppScanSchema = appScanSchema;

export const updateAppScanSchema = appScanSchema.partial();

export const createAPISecurityPolicySchema = apiSecurityPolicySchema;

export const updateAPISecurityPolicySchema = apiSecurityPolicySchema.partial();
