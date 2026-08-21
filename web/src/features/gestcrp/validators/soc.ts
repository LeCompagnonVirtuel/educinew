import { z } from 'zod';
import { socIncidentSchema } from '@educi/types';

export const createSOCIncidentSchema = socIncidentSchema;

export const updateSOCIncidentSchema = socIncidentSchema.partial();
