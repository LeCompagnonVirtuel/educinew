import {
  createGedkinForecastSchema,
  updateGedkinForecastSchema,
  createGedkinModelSchema,
  updateGedkinModelSchema,
  createGedkinPredictionSchema,
  updateGedkinPredictionSchema,
  createGedkinCapacitySchema,
  updateGedkinCapacitySchema,
  createGedkinDriftSchema,
  updateGedkinDriftSchema,
} from '@educi/types';

export const createForecastSchema = createGedkinForecastSchema;
export const updateForecastSchema = updateGedkinForecastSchema;

export const createForecastModelSchema = createGedkinModelSchema;
export const updateForecastModelSchema = updateGedkinModelSchema;

export const createPredictionSchema = createGedkinPredictionSchema;
export const updatePredictionSchema = updateGedkinPredictionSchema;

export const createCapacitySchema = createGedkinCapacitySchema;
export const updateCapacitySchema = updateGedkinCapacitySchema;

export const createDriftSchema = createGedkinDriftSchema;
export const updateDriftSchema = updateGedkinDriftSchema;
