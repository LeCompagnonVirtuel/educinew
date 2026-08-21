import {
  createGeaesipCopilotSessionSchema,
  createGeaesipCopilotAnswerSchema,
  createGeaesipCopilotExplanationSchema,
} from '@educi/types';

export function validateGeaesipCopilotSessionCreate(data: unknown) {
  return createGeaesipCopilotSessionSchema.parse(data);
}

export function validateGeaesipCopilotAnswerCreate(data: unknown) {
  return createGeaesipCopilotAnswerSchema.parse(data);
}

export function validateGeaesipCopilotExplanationCreate(data: unknown) {
  return createGeaesipCopilotExplanationSchema.parse(data);
}
