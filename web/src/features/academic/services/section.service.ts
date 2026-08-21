import type { AcademicRepository, Section, CreateSectionRequest, UpdateSectionRequest } from '../types';
import { SectionNotFoundError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';

export class SectionService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new section after validating required fields.
   */
  async create(schoolId: string, userId: string, data: CreateSectionRequest): Promise<Section> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom est requis' });
    }
    if (!data.code || data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code est requis' });
    }
    if (!data.levelId) {
      errors.push({ field: 'levelId', message: 'Le niveau est requis' });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'SECTION_VALIDATION_ERROR',
        400,
      );
    }

    const sections = await this.academicRepo.findAllSections(schoolId);

    const duplicateName = sections.find(
      (s) => s.name.toLowerCase() === data.name.trim().toLowerCase() && s.levelId === data.levelId,
    );
    if (duplicateName) {
      throw new AppError(
        `Une section "${data.name}" existe déjà pour ce niveau`,
        'SECTION_DUPLICATE',
        409,
      );
    }

    const duplicateCode = sections.find(
      (s) => s.code.toLowerCase() === data.code.trim().toLowerCase() && s.levelId === data.levelId,
    );
    if (duplicateCode) {
      throw new AppError(
        `Une section avec le code ${data.code} existe déjà pour ce niveau`,
        'SECTION_DUPLICATE',
        409,
      );
    }

    const section = await this.academicRepo.createSection(data, schoolId);
    logger.info('Section created', { sectionId: section.id, schoolId, userId }, 'academic');
    return section;
  }

  /**
   * Retrieves a section by its ID within a school.
   */
  async getById(schoolId: string, sectionId: string): Promise<Section> {
    const section = await this.academicRepo.findSection(sectionId);
    if (!section || section.schoolId !== schoolId) {
      throw new SectionNotFoundError(sectionId);
    }
    logger.info('Section retrieved', { sectionId, schoolId }, 'academic');
    return section;
  }

  /**
   * Lists all sections for a school ordered by name.
   */
  async list(schoolId: string): Promise<Section[]> {
    const sections = await this.academicRepo.findAllSections(schoolId);
    logger.info('Sections listed', { schoolId, count: sections.length }, 'academic');
    return sections;
  }

  /**
   * Updates a section after validating the update data.
   */
  async update(schoolId: string, userId: string, sectionId: string, data: UpdateSectionRequest): Promise<Section> {
    const existing = await this.academicRepo.findSection(sectionId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new SectionNotFoundError(sectionId);
    }

    const errors: Array<{ field: string; message: string }> = [];

    if (data.name !== undefined && data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom ne peut pas être vide' });
    }
    if (data.code !== undefined && data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code ne peut pas être vide' });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'SECTION_VALIDATION_ERROR',
        400,
      );
    }

    if (data.name !== undefined || data.code !== undefined || data.levelId !== undefined) {
      const targetName = (data.name ?? existing.name).trim().toLowerCase();
      const targetCode = (data.code ?? existing.code).trim().toLowerCase();
      const targetLevelId = data.levelId ?? existing.levelId;

      const sections = await this.academicRepo.findAllSections(schoolId);

      const duplicate = sections.find(
        (s) =>
          s.id !== sectionId &&
          s.levelId === targetLevelId &&
          (s.name.toLowerCase() === targetName || s.code.toLowerCase() === targetCode),
      );

      if (duplicate) {
        throw new AppError(
          `Une section "${data.name ?? existing.name}" ou le code ${data.code ?? existing.code} existe déjà pour ce niveau`,
          'SECTION_DUPLICATE',
          409,
        );
      }
    }

    const updated = await this.academicRepo.updateSection(sectionId, data);
    logger.info('Section updated', { sectionId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Deletes a section after verifying no streams are linked to it.
   */
  async delete(schoolId: string, userId: string, sectionId: string): Promise<void> {
    const existing = await this.academicRepo.findSection(sectionId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new SectionNotFoundError(sectionId);
    }

    const streams = await this.academicRepo.findAllStreams(schoolId);
    const linkedStreams = streams.filter((s) => s.levelId === existing.levelId);

    if (linkedStreams.length > 0) {
      throw new AppError(
        `Impossible de supprimer la section: ${linkedStreams.length} série(s) y sont associée(s)`,
        'SECTION_DELETION_ERROR',
        400,
      );
    }

    await this.academicRepo.deleteSection(sectionId);
    logger.info('Section deleted', { sectionId, schoolId, userId }, 'academic');
  }
}
