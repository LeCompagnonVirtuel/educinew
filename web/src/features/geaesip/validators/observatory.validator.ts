import {
  createGeaesipCompositeIndexSchema,
  createGeaesipObservatoryIndicator2Schema,
  createGeaesipObservatoryTrendSchema,
} from '@educi/types';

export function validateGeaesipCompositeIndexCreate(data: unknown) {
  return createGeaesipCompositeIndexSchema.parse(data);
}

export function validateGeaesipObservatoryIndicator2Create(data: unknown) {
  return createGeaesipObservatoryIndicator2Schema.parse(data);
}

export function validateGeaesipObservatoryTrendCreate(data: unknown) {
  return createGeaesipObservatoryTrendSchema.parse(data);
}
