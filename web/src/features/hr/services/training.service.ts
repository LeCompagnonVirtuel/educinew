import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createTrainingService(repo: HRRepositoryExtended) {
  return {
    async findTrainings(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findTrainings(schoolId);
    },

    async findTrainingById(schoolId: string, trainingId: string) {
      if (!schoolId || !trainingId) throw new AppError('Identifiants requis');
      const training = await repo.findTrainingById(schoolId, trainingId);
      if (!training) throw new AppError('Formation non trouvée');
      return training;
    },

    async createTraining(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.title) throw new AppError('Le titre de la formation est requis');
      if (!data?.start_date) throw new AppError('La date de début est requise');
      return repo.createTraining({ ...data, school_id: schoolId });
    },

    async updateTraining(schoolId: string, trainingId: string, data: any) {
      if (!schoolId || !trainingId) throw new AppError('Identifiants requis');
      const existing = await repo.findTrainingById(schoolId, trainingId);
      if (!existing) throw new AppError('Formation non trouvée');
      return repo.updateTraining(schoolId, trainingId, data);
    },

    async deleteTraining(schoolId: string, trainingId: string) {
      if (!schoolId || !trainingId) throw new AppError('Identifiants requis');
      const existing = await repo.findTrainingById(schoolId, trainingId);
      if (!existing) throw new AppError('Formation non trouvée');
      return repo.deleteTraining(schoolId, trainingId);
    },

    async findTrainingEnrollments(schoolId: string, trainingId: string) {
      if (!schoolId || !trainingId) throw new AppError('Identifiants requis');
      return repo.findTrainingEnrollments(schoolId, trainingId);
    },

    async enrollTraining(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.training_id) throw new AppError('L\'identifiant de la formation est requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');

      const training = await repo.findTrainingById(schoolId, data.training_id);
      if (!training) throw new AppError('Formation non trouvée');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.enrollTraining({ ...data, school_id: schoolId });
    },

    async unenrollTraining(schoolId: string, enrollmentId: string) {
      if (!schoolId || !enrollmentId) throw new AppError('Identifiants requis');
      return repo.unenrollTraining(schoolId, enrollmentId);
    },
  };
}
