import type {
  AcademicRepository, AcademicYear, Term, Level, Section, Stream, AcademicYearStatus,
  CreateLevelRequest, UpdateLevelRequest, CreateSectionRequest, UpdateSectionRequest,
  CreateStreamRequest, UpdateStreamRequest,
} from '../types';
import { AcademicYearNotFoundError, AcademicYearConflictError, LevelNotFoundError, SectionNotFoundError, StreamNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';

export class AcademicService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  async createAcademicYear(schoolId: string, userId: string, data: { name: string; startDate: string; endDate: string; termsCount: number }): Promise<AcademicYear> {
    logger.info('Creating academic year', { schoolId, userId, name: data.name });
    const years = await this.academicRepo.findAllAcademicYears(schoolId);
    if (years.some(y => y.name === data.name)) {
      throw new AcademicYearConflictError('Une année académique avec ce nom existe déjà');
    }
    if (new Date(data.startDate) >= new Date(data.endDate)) {
      throw new AcademicYearConflictError('La date de fin doit être postérieure à la date de début');
    }
    const isCurrent = years.length === 0;
    const result = await this.academicRepo.createAcademicYear({
      schoolId, name: data.name, startDate: data.startDate, endDate: data.endDate,
      status: 'ACTIVE', isCurrent, termsCount: data.termsCount,
    });
    logger.info('Academic year created', { yearId: result.id });
    return result;
  }

  async updateAcademicYear(schoolId: string, userId: string, yearId: string, data: Partial<{ name: string; status: AcademicYearStatus; isCurrent: boolean }>): Promise<AcademicYear> {
    logger.info('Updating academic year', { schoolId, userId, yearId });
    const year = await this.academicRepo.findAcademicYear(yearId);
    if (!year || year.schoolId !== schoolId) throw new AcademicYearNotFoundError();
    return this.academicRepo.updateAcademicYear(yearId, data);
  }

  async archiveAcademicYear(schoolId: string, userId: string, yearId: string): Promise<void> {
    logger.info('Archiving academic year', { schoolId, userId, yearId });
    const year = await this.academicRepo.findAcademicYear(yearId);
    if (!year || year.schoolId !== schoolId) throw new AcademicYearNotFoundError();
    await this.academicRepo.updateAcademicYear(yearId, { status: 'ARCHIVED', isCurrent: false });
  }

  async restoreAcademicYear(schoolId: string, userId: string, yearId: string): Promise<void> {
    logger.info('Restoring academic year', { schoolId, userId, yearId });
    const year = await this.academicRepo.findAcademicYear(yearId);
    if (!year || year.schoolId !== schoolId) throw new AcademicYearNotFoundError();
    await this.academicRepo.updateAcademicYear(yearId, { status: 'ACTIVE' });
  }

  async setCurrentAcademicYear(schoolId: string, userId: string, yearId: string): Promise<void> {
    logger.info('Setting current academic year', { schoolId, userId, yearId });
    const year = await this.academicRepo.findAcademicYear(yearId);
    if (!year || year.schoolId !== schoolId) throw new AcademicYearNotFoundError();
    const years = await this.academicRepo.findAllAcademicYears(schoolId);
    for (const y of years) {
      if (y.isCurrent && y.id !== yearId) {
        await this.academicRepo.updateAcademicYear(y.id, { isCurrent: false });
      }
    }
    await this.academicRepo.updateAcademicYear(yearId, { isCurrent: true });
  }

  async getAcademicYear(schoolId: string, yearId: string): Promise<AcademicYear> {
    const year = await this.academicRepo.findAcademicYear(yearId);
    if (!year || year.schoolId !== schoolId) throw new AcademicYearNotFoundError();
    return year;
  }

  async listAcademicYears(schoolId: string): Promise<AcademicYear[]> {
    return this.academicRepo.findAllAcademicYears(schoolId);
  }

  async createTerm(schoolId: string, userId: string, yearId: string, data: { name: string; startDate: string; endDate: string; order: number }): Promise<Term> {
    logger.info('Creating term', { schoolId, userId, yearId });
    const year = await this.academicRepo.findAcademicYear(yearId);
    if (!year || year.schoolId !== schoolId) throw new AcademicYearNotFoundError();
    const terms = await this.academicRepo.findTerms(yearId);
    if (terms.some(t => t.name === data.name)) {
      throw new AcademicYearConflictError('Un trimestre avec ce nom existe déjà');
    }
    const term = await this.academicRepo.createAcademicYear({
      ...year, name: data.name, startDate: data.startDate, endDate: data.endDate,
    });
    return term as unknown as Term;
  }

  async listTerms(schoolId: string, yearId: string): Promise<Term[]> {
    const year = await this.academicRepo.findAcademicYear(yearId);
    if (!year || year.schoolId !== schoolId) throw new AcademicYearNotFoundError();
    return this.academicRepo.findTerms(yearId);
  }

  async createLevel(schoolId: string, userId: string, data: CreateLevelRequest): Promise<Level> {
    logger.info('Creating level', { schoolId, userId, name: data.name });
    const levels = await this.academicRepo.findAllLevels(schoolId);
    if (levels.some(l => l.name === data.name)) {
      throw new AcademicYearConflictError('Un niveau avec ce nom existe déjà');
    }
    const result = await this.academicRepo.createLevel(data, schoolId);
    logger.info('Level created', { levelId: result.id });
    return result;
  }

  async updateLevel(schoolId: string, userId: string, levelId: string, data: UpdateLevelRequest): Promise<Level> {
    logger.info('Updating level', { schoolId, userId, levelId });
    const level = await this.academicRepo.findLevel(levelId);
    if (!level || level.schoolId !== schoolId) throw new LevelNotFoundError();
    return this.academicRepo.updateLevel(levelId, data);
  }

  async deleteLevel(schoolId: string, userId: string, levelId: string): Promise<void> {
    logger.info('Deleting level', { schoolId, userId, levelId });
    const level = await this.academicRepo.findLevel(levelId);
    if (!level || level.schoolId !== schoolId) throw new LevelNotFoundError();
    await this.academicRepo.deleteLevel(levelId);
  }

  async listLevels(schoolId: string): Promise<Level[]> {
    return this.academicRepo.findAllLevels(schoolId);
  }

  async createSection(schoolId: string, userId: string, data: CreateSectionRequest): Promise<Section> {
    logger.info('Creating section', { schoolId, userId, name: data.name });
    const sections = await this.academicRepo.findAllSections(schoolId);
    if (sections.some(s => s.name === data.name)) {
      throw new AcademicYearConflictError('Une section avec ce nom existe déjà');
    }
    return this.academicRepo.createSection(data, schoolId);
  }

  async updateSection(schoolId: string, userId: string, sectionId: string, data: UpdateSectionRequest): Promise<Section> {
    logger.info('Updating section', { schoolId, userId, sectionId });
    const section = await this.academicRepo.findSection(sectionId);
    if (!section || section.schoolId !== schoolId) throw new SectionNotFoundError();
    return this.academicRepo.updateSection(sectionId, data);
  }

  async deleteSection(schoolId: string, userId: string, sectionId: string): Promise<void> {
    logger.info('Deleting section', { schoolId, userId, sectionId });
    const section = await this.academicRepo.findSection(sectionId);
    if (!section || section.schoolId !== schoolId) throw new SectionNotFoundError();
    await this.academicRepo.deleteSection(sectionId);
  }

  async listSections(schoolId: string): Promise<Section[]> {
    return this.academicRepo.findAllSections(schoolId);
  }

  async createStream(schoolId: string, userId: string, data: CreateStreamRequest): Promise<Stream> {
    logger.info('Creating stream', { schoolId, userId, name: data.name });
    const streams = await this.academicRepo.findAllStreams(schoolId);
    if (streams.some(s => s.name === data.name)) {
      throw new AcademicYearConflictError('Une filière avec ce nom existe déjà');
    }
    return this.academicRepo.createStream(data, schoolId);
  }

  async updateStream(schoolId: string, userId: string, streamId: string, data: UpdateStreamRequest): Promise<Stream> {
    logger.info('Updating stream', { schoolId, userId, streamId });
    const stream = await this.academicRepo.findStream(streamId);
    if (!stream || stream.schoolId !== schoolId) throw new StreamNotFoundError();
    return this.academicRepo.updateStream(streamId, data);
  }

  async deleteStream(schoolId: string, userId: string, streamId: string): Promise<void> {
    logger.info('Deleting stream', { schoolId, userId, streamId });
    const stream = await this.academicRepo.findStream(streamId);
    if (!stream || stream.schoolId !== schoolId) throw new StreamNotFoundError();
    await this.academicRepo.deleteStream(streamId);
  }

  async listStreams(schoolId: string): Promise<Stream[]> {
    return this.academicRepo.findAllStreams(schoolId);
  }
}
