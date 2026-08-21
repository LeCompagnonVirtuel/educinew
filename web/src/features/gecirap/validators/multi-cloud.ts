import {
  createGecirapCloudPlacementDecisionSchema,
  updateGecirapCloudPlacementDecisionSchema,
  createGecirapCloudMigrationSchema,
  updateGecirapCloudMigrationSchema,
  createGecirapCloudBalanceSchema,
  updateGecirapCloudBalanceSchema,
  createGecirapProviderCapabilitySchema,
  updateGecirapProviderCapabilitySchema,
} from '@educi/types';

export const createPlacementDecisionSchema = createGecirapCloudPlacementDecisionSchema;
export const updatePlacementDecisionSchema = updateGecirapCloudPlacementDecisionSchema;

export const createCloudMigrationSchema = createGecirapCloudMigrationSchema;
export const updateCloudMigrationSchema = updateGecirapCloudMigrationSchema;

export const createCloudBalanceSchema = createGecirapCloudBalanceSchema;
export const updateCloudBalanceSchema = updateGecirapCloudBalanceSchema;

export const createProviderCapabilitySchema = createGecirapProviderCapabilitySchema;
export const updateProviderCapabilitySchema = updateGecirapProviderCapabilitySchema;
