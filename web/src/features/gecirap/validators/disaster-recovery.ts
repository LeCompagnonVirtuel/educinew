import {
  createGecirapDisasterRecoveryPlanSchema,
  updateGecirapDisasterRecoveryPlanSchema,
  createGecirapRecoveryStrategySchema,
  updateGecirapRecoveryStrategySchema,
  createGecirapRecoveryExecutionSchema,
  updateGecirapRecoveryExecutionSchema,
  createGecirapRecoveryTestSchema,
  updateGecirapRecoveryTestSchema,
  createGecirapRecoveryDependencySchema,
  updateGecirapRecoveryDependencySchema,
} from '@educi/types';

export const createDisasterRecoveryPlanSchema = createGecirapDisasterRecoveryPlanSchema;
export const updateDisasterRecoveryPlanSchema = updateGecirapDisasterRecoveryPlanSchema;

export const createRecoveryStrategySchema = createGecirapRecoveryStrategySchema;
export const updateRecoveryStrategySchema = updateGecirapRecoveryStrategySchema;

export const createRecoveryExecutionSchema = createGecirapRecoveryExecutionSchema;
export const updateRecoveryExecutionSchema = updateGecirapRecoveryExecutionSchema;

export const createRecoveryTestSchema = createGecirapRecoveryTestSchema;
export const updateRecoveryTestSchema = updateGecirapRecoveryTestSchema;

export const createRecoveryDependencySchema = createGecirapRecoveryDependencySchema;
export const updateRecoveryDependencySchema = updateGecirapRecoveryDependencySchema;
