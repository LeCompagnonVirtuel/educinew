import {
  createGeaesipSystemTwinSchema,
  updateGeaesipSystemTwinSchema,
  createGeaesipTwinStateSchema,
  updateGeaesipTwinStateSchema,
  createGeaesipTwinSimulationSchema,
  updateGeaesipTwinSimulationSchema,
} from '@educi/types';

export function validateGeaesipSystemTwinCreate(data: unknown) {
  return createGeaesipSystemTwinSchema.parse(data);
}

export function validateGeaesipSystemTwinUpdate(data: unknown) {
  return updateGeaesipSystemTwinSchema.parse(data);
}

export function validateGeaesipTwinStateCreate(data: unknown) {
  return createGeaesipTwinStateSchema.parse(data);
}

export function validateGeaesipTwinStateUpdate(data: unknown) {
  return updateGeaesipTwinStateSchema.parse(data);
}

export function validateGeaesipTwinSimulationCreate(data: unknown) {
  return createGeaesipTwinSimulationSchema.parse(data);
}

export function validateGeaesipTwinSimulationUpdate(data: unknown) {
  return updateGeaesipTwinSimulationSchema.parse(data);
}
