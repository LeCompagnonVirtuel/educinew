import {
  createGeaesipExtendedForecastSchema,
  createGeaesipForecastBacktestSchema,
  createGeaesipModelDriftSchema,
} from '@educi/types';

export function validateGeaesipExtendedForecastCreate(data: unknown) {
  return createGeaesipExtendedForecastSchema.parse(data);
}

export function validateGeaesipForecastBacktestCreate(data: unknown) {
  return createGeaesipForecastBacktestSchema.parse(data);
}

export function validateGeaesipModelDriftCreate(data: unknown) {
  return createGeaesipModelDriftSchema.parse(data);
}
