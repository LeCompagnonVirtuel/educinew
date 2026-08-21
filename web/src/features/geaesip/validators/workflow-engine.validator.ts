import {
  createGeaesipWorkflowSchema,
  updateGeaesipWorkflowSchema,
  createGeaesipWorkflowTaskSchema,
  updateGeaesipWorkflowTaskSchema,
  createGeaesipActionPlanSchema,
  updateGeaesipActionPlanSchema,
  createGeaesipExecutionLogSchema,
} from '@educi/types';

export function validateGeaesipWorkflowCreate(data: unknown) {
  return createGeaesipWorkflowSchema.parse(data);
}

export function validateGeaesipWorkflowUpdate(data: unknown) {
  return updateGeaesipWorkflowSchema.parse(data);
}

export function validateGeaesipWorkflowTaskCreate(data: unknown) {
  return createGeaesipWorkflowTaskSchema.parse(data);
}

export function validateGeaesipWorkflowTaskUpdate(data: unknown) {
  return updateGeaesipWorkflowTaskSchema.parse(data);
}

export function validateGeaesipActionPlanCreate(data: unknown) {
  return createGeaesipActionPlanSchema.parse(data);
}

export function validateGeaesipActionPlanUpdate(data: unknown) {
  return updateGeaesipActionPlanSchema.parse(data);
}

export function validateGeaesipExecutionLogCreate(data: unknown) {
  return createGeaesipExecutionLogSchema.parse(data);
}
