import {
  createGeaesipCrossDomainEventSchema,
  updateGeaesipCrossDomainEventSchema,
  createGeaesipCorrelationSchema,
  createGeaesipImpactChainSchema,
  createGeaesipSystemicRiskSchema,
  updateGeaesipSystemicRiskSchema,
  createGeaesipDependencyGraphSchema,
} from '@educi/types';

export function validateGeaesipCrossDomainEventCreate(data: unknown) {
  return createGeaesipCrossDomainEventSchema.parse(data);
}

export function validateGeaesipCrossDomainEventUpdate(data: unknown) {
  return updateGeaesipCrossDomainEventSchema.parse(data);
}

export function validateGeaesipCorrelationCreate(data: unknown) {
  return createGeaesipCorrelationSchema.parse(data);
}

export function validateGeaesipImpactChainCreate(data: unknown) {
  return createGeaesipImpactChainSchema.parse(data);
}

export function validateGeaesipSystemicRiskCreate(data: unknown) {
  return createGeaesipSystemicRiskSchema.parse(data);
}

export function validateGeaesipSystemicRiskUpdate(data: unknown) {
  return updateGeaesipSystemicRiskSchema.parse(data);
}

export function validateGeaesipDependencyGraphCreate(data: unknown) {
  return createGeaesipDependencyGraphSchema.parse(data);
}
