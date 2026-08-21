import {
  createGeaesipResourceForecastSchema,
  createGeaesipAllocationPlanSchema,
  updateGeaesipAllocationPlanSchema,
  createGeaesipOptimizationResultSchema,
} from '@educi/types';

export function validateGeaesipResourceForecastCreate(data: unknown) {
  return createGeaesipResourceForecastSchema.parse(data);
}

export function validateGeaesipAllocationPlanCreate(data: unknown) {
  return createGeaesipAllocationPlanSchema.parse(data);
}

export function validateGeaesipAllocationPlanUpdate(data: unknown) {
  return updateGeaesipAllocationPlanSchema.parse(data);
}

export function validateGeaesipOptimizationResultCreate(data: unknown) {
  return createGeaesipOptimizationResultSchema.parse(data);
}
