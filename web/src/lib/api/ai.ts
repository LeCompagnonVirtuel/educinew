import { sbAi } from './domains/ai.service';

export const aiApi = {
  chat: (message: string, context?: string) => sbAi.chat(message, context),
  explainExercise: (exercise: string, subject: string) => sbAi.explainExercise(exercise, subject),
  generateQuiz: (topic: string, difficulty: string, count?: number) => sbAi.generateQuiz(topic, difficulty, count),
  summarizeLesson: (content: string, subject: string) => sbAi.summarizeLesson(content, subject),
};