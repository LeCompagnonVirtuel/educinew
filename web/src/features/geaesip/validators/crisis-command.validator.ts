import {
  createGeaesipCrisisSchema,
  updateGeaesipCrisisSchema,
  createGeaesipCrisisTeamSchema,
  createGeaesipCrisisPlaybookSchema,
  updateGeaesipCrisisPlaybookSchema,
  createGeaesipEmergencyCommunicationSchema,
} from '@educi/types';

export function validateGeaesipCrisisCreate(data: unknown) {
  return createGeaesipCrisisSchema.parse(data);
}

export function validateGeaesipCrisisUpdate(data: unknown) {
  return updateGeaesipCrisisSchema.parse(data);
}

export function validateGeaesipCrisisTeamCreate(data: unknown) {
  return createGeaesipCrisisTeamSchema.parse(data);
}

export function validateGeaesipCrisisPlaybookCreate(data: unknown) {
  return createGeaesipCrisisPlaybookSchema.parse(data);
}

export function validateGeaesipCrisisPlaybookUpdate(data: unknown) {
  return updateGeaesipCrisisPlaybookSchema.parse(data);
}

export function validateGeaesipEmergencyCommunicationCreate(data: unknown) {
  return createGeaesipEmergencyCommunicationSchema.parse(data);
}
