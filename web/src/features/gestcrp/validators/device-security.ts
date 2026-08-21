import { z } from 'zod';
import { deviceInventorySchema, mdmCommandSchema } from '@educi/types';

export const createDeviceInventorySchema = deviceInventorySchema;

export const updateDeviceInventorySchema = deviceInventorySchema.partial();

export const createMDMCommandSchema = mdmCommandSchema;

export const updateMDMCommandSchema = mdmCommandSchema.partial();
