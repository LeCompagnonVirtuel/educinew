import {
  createGeaesipAIEvaluationSchema,
  createGeaesipModelEvaluationSchema,
  createGeaesipAgentEvaluationSchema,
} from '@educi/types';

export function validateGeaesipAIEvaluationCreate(data: unknown) {
  return createGeaesipAIEvaluationSchema.parse(data);
}

export function validateGeaesipModelEvaluationCreate(data: unknown) {
  return createGeaesipModelEvaluationSchema.parse(data);
}

export function validateGeaesipAgentEvaluationCreate(data: unknown) {
  return createGeaesipAgentEvaluationSchema.parse(data);
}
