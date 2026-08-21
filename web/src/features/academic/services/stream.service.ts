import type { AcademicRepository, Stream, CreateStreamRequest, UpdateStreamRequest } from '../types';
import { StreamNotFoundError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';

export class StreamService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new stream after validating required fields.
   */
  async create(schoolId: string, userId: string, data: CreateStreamRequest): Promise<Stream> {
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
        'STREAM_VALIDATION_ERROR',
        400,
      );
    }

    const streams = await this.academicRepo.findAllStreams(schoolId);

    const duplicateName = streams.find(
      (s) => s.name.toLowerCase() === data.name.trim().toLowerCase() && s.levelId === data.levelId,
    );
    if (duplicateName) {
      throw new AppError(
        `Une série "${data.name}" existe déjà pour ce niveau`,
        'STREAM_DUPLICATE',
        409,
      );
    }

    const duplicateCode = streams.find(
      (s) => s.code.toLowerCase() === data.code.trim().toLowerCase() && s.levelId === data.levelId,
    );
    if (duplicateCode) {
      throw new AppError(
        `Une série avec le code ${data.code} existe déjà pour ce niveau`,
        'STREAM_DUPLICATE',
        409,
      );
    }

    const stream = await this.academicRepo.createStream(data, schoolId);
    logger.info('Stream created', { streamId: stream.id, schoolId, userId }, 'academic');
    return stream;
  }

  /**
   * Retrieves a stream by its ID within a school.
   */
  async getById(schoolId: string, streamId: string): Promise<Stream> {
    const stream = await this.academicRepo.findStream(streamId);
    if (!stream || stream.schoolId !== schoolId) {
      throw new StreamNotFoundError(streamId);
    }
    logger.info('Stream retrieved', { streamId, schoolId }, 'academic');
    return stream;
  }

  /**
   * Lists all streams for a school ordered by name.
   */
  async list(schoolId: string): Promise<Stream[]> {
    const streams = await this.academicRepo.findAllStreams(schoolId);
    logger.info('Streams listed', { schoolId, count: streams.length }, 'academic');
    return streams;
  }

  /**
   * Updates a stream after validating the update data.
   */
  async update(schoolId: string, userId: string, streamId: string, data: UpdateStreamRequest): Promise<Stream> {
    const existing = await this.academicRepo.findStream(streamId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new StreamNotFoundError(streamId);
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
        'STREAM_VALIDATION_ERROR',
        400,
      );
    }

    if (data.name !== undefined || data.code !== undefined || data.levelId !== undefined) {
      const targetName = (data.name ?? existing.name).trim().toLowerCase();
      const targetCode = (data.code ?? existing.code).trim().toLowerCase();
      const targetLevelId = data.levelId ?? existing.levelId;

      const streams = await this.academicRepo.findAllStreams(schoolId);

      const duplicate = streams.find(
        (s) =>
          s.id !== streamId &&
          s.levelId === targetLevelId &&
          (s.name.toLowerCase() === targetName || s.code.toLowerCase() === targetCode),
      );

      if (duplicate) {
        throw new AppError(
          `Une série "${data.name ?? existing.name}" ou le code ${data.code ?? existing.code} existe déjà pour ce niveau`,
          'STREAM_DUPLICATE',
          409,
        );
      }
    }

    const updated = await this.academicRepo.updateStream(streamId, data);
    logger.info('Stream updated', { streamId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Deletes a stream after verifying no classes are linked to it.
   */
  async delete(schoolId: string, userId: string, streamId: string): Promise<void> {
    const existing = await this.academicRepo.findStream(streamId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new StreamNotFoundError(streamId);
    }

    const { data: classes } = await this.academicRepo.findAllClasses(schoolId, { limit: 10000 });
    const linkedClasses = classes.filter((c) => c.streamId === streamId);

    if (linkedClasses.length > 0) {
      throw new AppError(
        `Impossible de supprimer la série: ${linkedClasses.length} classe(s) y sont associée(s)`,
        'STREAM_DELETION_ERROR',
        400,
      );
    }

    await this.academicRepo.deleteStream(streamId);
    logger.info('Stream deleted', { streamId, schoolId, userId }, 'academic');
  }
}
