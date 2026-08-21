import {
  createGedkinAgentSchema,
  updateGedkinAgentSchema,
  createGedkinTaskSchema,
  updateGedkinTaskSchema,
  createGedkinMessageSchema,
  updateGedkinMessageSchema,
  createGedkinToolCallSchema,
  updateGedkinToolCallSchema,
  createGedkinMemorySchema,
  updateGedkinMemorySchema,
} from '@educi/types';

export const createAgentSchema = createGedkinAgentSchema;
export const updateAgentSchema = updateGedkinAgentSchema;

export const createAgentTaskSchema = createGedkinTaskSchema;
export const updateAgentTaskSchema = updateGedkinTaskSchema;

export const createAgentMessageSchema = createGedkinMessageSchema;
export const updateAgentMessageSchema = updateGedkinMessageSchema;

export const createToolCallSchema = createGedkinToolCallSchema;
export const updateToolCallSchema = updateGedkinToolCallSchema;

export const createMemorySchema = createGedkinMemorySchema;
export const updateMemorySchema = updateGedkinMemorySchema;
