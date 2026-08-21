import {
  createGeaesipAgentRegistrySchema,
  updateGeaesipAgentRegistrySchema,
  createGeaesipAgentMissionSchema,
  createGeaesipAgentVoteSchema,
  createGeaesipAgentNegotiationSchema,
} from '@educi/types';

export function validateGeaesipAgentRegistryCreate(data: unknown) {
  return createGeaesipAgentRegistrySchema.parse(data);
}

export function validateGeaesipAgentRegistryUpdate(data: unknown) {
  return updateGeaesipAgentRegistrySchema.parse(data);
}

export function validateGeaesipAgentMissionCreate(data: unknown) {
  return createGeaesipAgentMissionSchema.parse(data);
}

export function validateGeaesipAgentVoteCreate(data: unknown) {
  return createGeaesipAgentVoteSchema.parse(data);
}

export function validateGeaesipAgentNegotiationCreate(data: unknown) {
  return createGeaesipAgentNegotiationSchema.parse(data);
}
