import {
  createGedkinSimulationSchema,
  updateGedkinSimulationSchema,
  createGedkinScenarioSchema,
  updateGedkinScenarioSchema,
  createGedkinRunSchema,
  updateGedkinRunSchema,
  createGedkinResultSchema,
  updateGedkinResultSchema,
  createGedkinSensitivitySchema,
  updateGedkinSensitivitySchema,
} from '@educi/types';

export const createSimulationSchema = createGedkinSimulationSchema;
export const updateSimulationSchema = updateGedkinSimulationSchema;

export const createScenarioSchema = createGedkinScenarioSchema;
export const updateScenarioSchema = updateGedkinScenarioSchema;

export const createRunSchema = createGedkinRunSchema;
export const updateRunSchema = updateGedkinRunSchema;

export const createResultSchema = createGedkinResultSchema;
export const updateResultSchema = updateGedkinResultSchema;

export const createSensitivitySchema = createGedkinSensitivitySchema;
export const updateSensitivitySchema = updateGedkinSensitivitySchema;
