import { z } from 'zod';
import { threatIndicatorSchema } from '@educi/types';

export const createThreatIndicatorSchema = threatIndicatorSchema;

export const updateThreatIndicatorSchema = threatIndicatorSchema.partial();
