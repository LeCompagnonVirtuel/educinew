import {
  createGedkinPolicySchema,
  updateGedkinPolicySchema,
  createGedkinSimulationSchema,
  updateGedkinSimulationSchema,
  createGedkinRecommendationSchema,
  updateGedkinRecommendationSchema,
  createGedkinImpactSchema,
  updateGedkinImpactSchema,
} from '@educi/types';

export const createPolicySchema = createGedkinPolicySchema;
export const updatePolicySchema = updateGedkinPolicySchema;

export const createPolicySimulationSchema = createGedkinSimulationSchema;
export const updatePolicySimulationSchema = updateGedkinSimulationSchema;

export const createRecommendationSchema = createGedkinRecommendationSchema;
export const updateRecommendationSchema = updateGedkinRecommendationSchema;

export const createImpactSchema = createGedkinImpactSchema;
export const updateImpactSchema = updateGedkinImpactSchema;
