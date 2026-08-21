import {
  createGeaesipIntelligenceCoreSchema,
  updateGeaesipIntelligenceCoreSchema,
  createGeaesipKnowledgeFusionSchema,
  updateGeaesipKnowledgeFusionSchema,
  createGeaesipCrossDomainSignalSchema,
  updateGeaesipCrossDomainSignalSchema,
  createGeaesipCausalRelationshipSchema,
  updateGeaesipCausalRelationshipSchema,
  createGeaesipSystemHealthScoreSchema,
  updateGeaesipSystemHealthScoreSchema,
} from '@educi/types';

export function validateGeaesipIntelligenceCoreCreate(data: unknown) {
  return createGeaesipIntelligenceCoreSchema.parse(data);
}

export function validateGeaesipIntelligenceCoreUpdate(data: unknown) {
  return updateGeaesipIntelligenceCoreSchema.parse(data);
}

export function validateGeaesipKnowledgeFusionCreate(data: unknown) {
  return createGeaesipKnowledgeFusionSchema.parse(data);
}

export function validateGeaesipKnowledgeFusionUpdate(data: unknown) {
  return updateGeaesipKnowledgeFusionSchema.parse(data);
}

export function validateGeaesipCrossDomainSignalCreate(data: unknown) {
  return createGeaesipCrossDomainSignalSchema.parse(data);
}

export function validateGeaesipCrossDomainSignalUpdate(data: unknown) {
  return updateGeaesipCrossDomainSignalSchema.parse(data);
}

export function validateGeaesipCausalRelationshipCreate(data: unknown) {
  return createGeaesipCausalRelationshipSchema.parse(data);
}

export function validateGeaesipCausalRelationshipUpdate(data: unknown) {
  return updateGeaesipCausalRelationshipSchema.parse(data);
}

export function validateGeaesipSystemHealthScoreCreate(data: unknown) {
  return createGeaesipSystemHealthScoreSchema.parse(data);
}

export function validateGeaesipSystemHealthScoreUpdate(data: unknown) {
  return updateGeaesipSystemHealthScoreSchema.parse(data);
}
