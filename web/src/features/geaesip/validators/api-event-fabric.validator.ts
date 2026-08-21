import {
  createGeaesipIntelligenceAPISchema,
  updateGeaesipIntelligenceAPISchema,
  createGeaesipEventBusSchema,
  createGeaesipEventSubscriptionSchema,
  updateGeaesipEventSubscriptionSchema,
  createGeaesipAPIUsageSchema,
} from '@educi/types';

export function validateGeaesipIntelligenceAPICreate(data: unknown) {
  return createGeaesipIntelligenceAPISchema.parse(data);
}

export function validateGeaesipIntelligenceAPIUpdate(data: unknown) {
  return updateGeaesipIntelligenceAPISchema.parse(data);
}

export function validateGeaesipEventBusCreate(data: unknown) {
  return createGeaesipEventBusSchema.parse(data);
}

export function validateGeaesipEventSubscriptionCreate(data: unknown) {
  return createGeaesipEventSubscriptionSchema.parse(data);
}

export function validateGeaesipEventSubscriptionUpdate(data: unknown) {
  return updateGeaesipEventSubscriptionSchema.parse(data);
}

export function validateGeaesipAPIUsageCreate(data: unknown) {
  return createGeaesipAPIUsageSchema.parse(data);
}
