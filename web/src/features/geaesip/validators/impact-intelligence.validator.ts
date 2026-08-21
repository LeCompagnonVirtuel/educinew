import {
  createGeaesipImpactModelSchema,
  updateGeaesipImpactModelSchema,
  createGeaesipImpactResultSchema,
  createGeaesipEconomicForecastSchema,
  createGeaesipHumanCapitalIndexSchema,
} from '@educi/types';

export function validateGeaesipImpactModelCreate(data: unknown) {
  return createGeaesipImpactModelSchema.parse(data);
}

export function validateGeaesipImpactModelUpdate(data: unknown) {
  return updateGeaesipImpactModelSchema.parse(data);
}

export function validateGeaesipImpactResultCreate(data: unknown) {
  return createGeaesipImpactResultSchema.parse(data);
}

export function validateGeaesipEconomicForecastCreate(data: unknown) {
  return createGeaesipEconomicForecastSchema.parse(data);
}

export function validateGeaesipHumanCapitalIndexCreate(data: unknown) {
  return createGeaesipHumanCapitalIndexSchema.parse(data);
}
