import {
  createGeaesipMemorySchema,
  updateGeaesipMemorySchema,
  createGeaesipMemoryRetrievalSchema,
  createGeaesipMemoryPolicySchema,
  updateGeaesipMemoryPolicySchema,
} from '@educi/types';

export function validateGeaesipMemoryCreate(data: unknown) {
  return createGeaesipMemorySchema.parse(data);
}

export function validateGeaesipMemoryUpdate(data: unknown) {
  return updateGeaesipMemorySchema.parse(data);
}

export function validateGeaesipMemoryRetrievalCreate(data: unknown) {
  return createGeaesipMemoryRetrievalSchema.parse(data);
}

export function validateGeaesipMemoryPolicyCreate(data: unknown) {
  return createGeaesipMemoryPolicySchema.parse(data);
}

export function validateGeaesipMemoryPolicyUpdate(data: unknown) {
  return updateGeaesipMemoryPolicySchema.parse(data);
}
