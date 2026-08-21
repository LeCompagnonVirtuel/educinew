import {
  createGedkinMarketplaceProductSchema,
  updateGedkinMarketplaceProductSchema,
  createGedkinSubscriptionSchema,
  updateGedkinSubscriptionSchema,
  createGedkinAccessLogSchema,
  updateGedkinAccessLogSchema,
  createGedkinReviewSchema,
  updateGedkinReviewSchema,
  createGedkinSLASchema,
  updateGedkinSLASchema,
} from '@educi/types';

export const createMarketplaceProductSchema = createGedkinMarketplaceProductSchema;
export const updateMarketplaceProductSchema = updateGedkinMarketplaceProductSchema;

export const createSubscriptionSchema = createGedkinSubscriptionSchema;
export const updateSubscriptionSchema = updateGedkinSubscriptionSchema;

export const createAccessLogSchema = createGedkinAccessLogSchema;
export const updateAccessLogSchema = updateGedkinAccessLogSchema;

export const createReviewSchema = createGedkinReviewSchema;
export const updateReviewSchema = updateGedkinReviewSchema;

export const createSLASchema = createGedkinSLASchema;
export const updateSLASchema = updateGedkinSLASchema;
