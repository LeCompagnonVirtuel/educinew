import {
  createGeaesipDecisionSchema,
  updateGeaesipDecisionSchema,
  createGeaesipDecisionOptionSchema,
  createGeaesipDecisionApprovalSchema,
  createGeaesipDecisionAuditSchema,
} from '@educi/types';

export function validateGeaesipDecisionCreate(data: unknown) {
  return createGeaesipDecisionSchema.parse(data);
}

export function validateGeaesipDecisionUpdate(data: unknown) {
  return updateGeaesipDecisionSchema.parse(data);
}

export function validateGeaesipDecisionOptionCreate(data: unknown) {
  return createGeaesipDecisionOptionSchema.parse(data);
}

export function validateGeaesipDecisionApprovalCreate(data: unknown) {
  return createGeaesipDecisionApprovalSchema.parse(data);
}

export function validateGeaesipDecisionAuditCreate(data: unknown) {
  return createGeaesipDecisionAuditSchema.parse(data);
}
