import {
  createGedkinExperimentSchema,
  updateGedkinExperimentSchema,
  createGedkinDatasetSchema,
  updateGedkinDatasetSchema,
  createGedkinModelExperimentSchema,
  updateGedkinModelExperimentSchema,
  createGedkinExperimentBenchmarkSchema,
  updateGedkinExperimentBenchmarkSchema,
} from '@educi/types';

export const createExperimentSchema = createGedkinExperimentSchema;
export const updateExperimentSchema = updateGedkinExperimentSchema;

export const createExperimentDatasetSchema = createGedkinDatasetSchema;
export const updateExperimentDatasetSchema = updateGedkinDatasetSchema;

export const createModelExperimentSchema = createGedkinModelExperimentSchema;
export const updateModelExperimentSchema = updateGedkinModelExperimentSchema;

export const createExperimentBenchmarkSchema = createGedkinExperimentBenchmarkSchema;
export const updateExperimentBenchmarkSchema = updateGedkinExperimentBenchmarkSchema;
