import {
  createGeaesipEducationRuntimeSchema,
  updateGeaesipEducationRuntimeSchema,
  createGeaesipRuntimeExecutionSchema,
  createGeaesipRuntimeMetricSchema,
} from '@educi/types';

export function validateGeaesipEducationRuntimeCreate(data: unknown) {
  return createGeaesipEducationRuntimeSchema.parse(data);
}

export function validateGeaesipEducationRuntimeUpdate(data: unknown) {
  return updateGeaesipEducationRuntimeSchema.parse(data);
}

export function validateGeaesipRuntimeExecutionCreate(data: unknown) {
  return createGeaesipRuntimeExecutionSchema.parse(data);
}

export function validateGeaesipRuntimeMetricCreate(data: unknown) {
  return createGeaesipRuntimeMetricSchema.parse(data);
}
