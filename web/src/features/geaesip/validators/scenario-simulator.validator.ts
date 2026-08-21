import {
  createGeaesipScenarioSchema,
  updateGeaesipScenarioSchema,
  createGeaesipScenarioRunSchema,
  createGeaesipScenarioComparisonSchema,
} from '@educi/types';

export function validateGeaesipScenarioCreate(data: unknown) {
  return createGeaesipScenarioSchema.parse(data);
}

export function validateGeaesipScenarioUpdate(data: unknown) {
  return updateGeaesipScenarioSchema.parse(data);
}

export function validateGeaesipScenarioRunCreate(data: unknown) {
  return createGeaesipScenarioRunSchema.parse(data);
}

export function validateGeaesipScenarioComparisonCreate(data: unknown) {
  return createGeaesipScenarioComparisonSchema.parse(data);
}
