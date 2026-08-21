import {
  createGeaesipControlCenterSchema,
  updateGeaesipControlCenterSchema,
  createGeaesipExecutiveCockpitSchema,
  updateGeaesipExecutiveCockpitSchema,
  createGeaesipAlertSchema,
  createGeaesipDecisionQueueSchema,
  updateGeaesipDecisionQueueSchema,
} from '@educi/types';

export function validateGeaesipControlCenterCreate(data: unknown) {
  return createGeaesipControlCenterSchema.parse(data);
}

export function validateGeaesipControlCenterUpdate(data: unknown) {
  return updateGeaesipControlCenterSchema.parse(data);
}

export function validateGeaesipExecutiveCockpitCreate(data: unknown) {
  return createGeaesipExecutiveCockpitSchema.parse(data);
}

export function validateGeaesipExecutiveCockpitUpdate(data: unknown) {
  return updateGeaesipExecutiveCockpitSchema.parse(data);
}

export function validateGeaesipAlertCreate(data: unknown) {
  return createGeaesipAlertSchema.parse(data);
}

export function validateGeaesipDecisionQueueCreate(data: unknown) {
  return createGeaesipDecisionQueueSchema.parse(data);
}

export function validateGeaesipDecisionQueueUpdate(data: unknown) {
  return updateGeaesipDecisionQueueSchema.parse(data);
}
