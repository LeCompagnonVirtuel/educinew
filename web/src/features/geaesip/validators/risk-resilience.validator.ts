import {
  createGeaesipRiskRegistrySchema,
  updateGeaesipRiskRegistrySchema,
  createGeaesipRiskMatrixSchema,
  createGeaesipEarlyWarningSchema,
  createGeaesipMitigationPlanSchema,
  updateGeaesipMitigationPlanSchema,
} from '@educi/types';

export function validateGeaesipRiskRegistryCreate(data: unknown) {
  return createGeaesipRiskRegistrySchema.parse(data);
}

export function validateGeaesipRiskRegistryUpdate(data: unknown) {
  return updateGeaesipRiskRegistrySchema.parse(data);
}

export function validateGeaesipRiskMatrixCreate(data: unknown) {
  return createGeaesipRiskMatrixSchema.parse(data);
}

export function validateGeaesipEarlyWarningCreate(data: unknown) {
  return createGeaesipEarlyWarningSchema.parse(data);
}

export function validateGeaesipMitigationPlanCreate(data: unknown) {
  return createGeaesipMitigationPlanSchema.parse(data);
}

export function validateGeaesipMitigationPlanUpdate(data: unknown) {
  return updateGeaesipMitigationPlanSchema.parse(data);
}
