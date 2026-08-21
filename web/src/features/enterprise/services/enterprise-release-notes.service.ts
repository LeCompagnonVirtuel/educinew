import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseReleaseNotesService(repo: EnterpriseRepositoryExtended) {
  return {
    async findReleaseNotes(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findReleaseNotes(enterpriseId, filters);
    },

    async findReleaseNoteById(enterpriseId: string, releaseNoteId: string) {
      if (!enterpriseId || !releaseNoteId) throw new AppError('Identifiants requis');
      const note = await repo.findReleaseNoteById(enterpriseId, releaseNoteId);
      if (!note) throw new AppError('Note de version non trouvée');
      return note;
    },

    async createReleaseNote(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.title) throw new AppError('Le titre est requis');
      if (!data?.content) throw new AppError('Le contenu est requis');
      return repo.createReleaseNote({ ...data, enterprise_id: enterpriseId });
    },

    async updateReleaseNote(enterpriseId: string, releaseNoteId: string, data: any) {
      if (!enterpriseId || !releaseNoteId) throw new AppError('Identifiants requis');
      const existing = await repo.findReleaseNoteById(enterpriseId, releaseNoteId);
      if (!existing) throw new AppError('Note de version non trouvée');
      return repo.updateReleaseNote(enterpriseId, releaseNoteId, data);
    },

    async deleteReleaseNote(enterpriseId: string, releaseNoteId: string) {
      if (!enterpriseId || !releaseNoteId) throw new AppError('Identifiants requis');
      const existing = await repo.findReleaseNoteById(enterpriseId, releaseNoteId);
      if (!existing) throw new AppError('Note de version non trouvée');
      return repo.deleteReleaseNote(enterpriseId, releaseNoteId);
    },
  };
}
