import {
  createGedkinQuerySchema,
  updateGedkinQuerySchema,
  createGedkinResponseSchema,
  updateGedkinResponseSchema,
  createGedkinConversationSchema,
  updateGedkinConversationSchema,
  createGedkinCopilotSourceSchema,
  updateGedkinCopilotSourceSchema,
  createGedkinApprovalSchema,
  updateGedkinApprovalSchema,
} from '@educi/types';

export const createQuerySchema = createGedkinQuerySchema;
export const updateQuerySchema = updateGedkinQuerySchema;

export const createResponseSchema = createGedkinResponseSchema;
export const updateResponseSchema = updateGedkinResponseSchema;

export const createConversationSchema = createGedkinConversationSchema;
export const updateConversationSchema = updateGedkinConversationSchema;

export const createCopilotSourceSchema = createGedkinCopilotSourceSchema;
export const updateCopilotSourceSchema = updateGedkinCopilotSourceSchema;

export const createApprovalSchema = createGedkinApprovalSchema;
export const updateApprovalSchema = updateGedkinApprovalSchema;
