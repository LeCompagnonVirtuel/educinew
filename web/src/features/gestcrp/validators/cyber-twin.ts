import { z } from 'zod';
import { cyberDigitalTwinSchema } from '@educi/types';

export const createCyberDigitalTwinSchema = cyberDigitalTwinSchema;

export const updateCyberDigitalTwinSchema = cyberDigitalTwinSchema.partial();
