import { z } from 'zod';
import { soarPlaybookSchema } from '@educi/types';

export const createSOARPlaybookSchema = soarPlaybookSchema;

export const updateSOARPlaybookSchema = soarPlaybookSchema.partial();
