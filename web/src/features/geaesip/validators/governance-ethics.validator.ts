import {
  createGeaesipGovernancePolicySchema,
  updateGeaesipGovernancePolicySchema,
  createGeaesipGovernanceAuditSchema,
  createGeaesipEthicsReviewSchema,
  createGeaesipBiasReviewSchema,
} from '@educi/types';

export function validateGeaesipGovernancePolicyCreate(data: unknown) {
  return createGeaesipGovernancePolicySchema.parse(data);
}

export function validateGeaesipGovernancePolicyUpdate(data: unknown) {
  return updateGeaesipGovernancePolicySchema.parse(data);
}

export function validateGeaesipGovernanceAuditCreate(data: unknown) {
  return createGeaesipGovernanceAuditSchema.parse(data);
}

export function validateGeaesipEthicsReviewCreate(data: unknown) {
  return createGeaesipEthicsReviewSchema.parse(data);
}

export function validateGeaesipBiasReviewCreate(data: unknown) {
  return createGeaesipBiasReviewSchema.parse(data);
}
