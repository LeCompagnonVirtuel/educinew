import type {
  AcademicRepository, SchoolClass, Subject, Room, TimetableSlot,
  CreateClassRequest, CreateSubjectRequest, CreateRoomRequest, CreateScheduleSlotRequest,
  DayOfWeek,
} from '../types';
import { AcademicImportError, AcademicValidationError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ACADEMIC_IMPORT } from '@educi/config';

type ImportType = 'CLASSES' | 'SUBJECTS' | 'ROOMS' | 'TIMETABLE';

interface ImportResult<T> {
  success: boolean;
  imported: number;
  errors: Array<{ row: number; field: string; message: string }>;
  data: T[];
}

export class AcademicImportService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Parses CSV data and bulk creates classes after validation.
   */
  async importClasses(
    schoolId: string,
    userId: string,
    data: string,
  ): Promise<ImportResult<SchoolClass>> {
    const rows = this.parseCSV(data);
    if (rows.length === 0) {
      throw new AcademicImportError('Aucune donnée à importer');
    }

    if (rows.length > ACADEMIC_IMPORT.MAX_ROWS) {
      throw new AcademicImportError(
        `Trop de lignes: ${rows.length} lignes (max: ${ACADEMIC_IMPORT.MAX_ROWS})`,
      );
    }

    const validationErrors = this.validateImportData(data, 'CLASSES');
    if (validationErrors.length > 0) {
      throw new AcademicValidationError(validationErrors);
    }

    const errors: Array<{ row: number; field: string; message: string }> = [];
    const imported: SchoolClass[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2;

      try {
        if (!row.name || row.name.trim().length === 0) {
          errors.push({ row: rowNumber, field: 'name', message: 'Le nom est requis' });
          continue;
        }
        if (!row.levelId) {
          errors.push({ row: rowNumber, field: 'levelId', message: 'Le niveau est requis' });
          continue;
        }
        if (!row.academicYearId) {
          errors.push({ row: rowNumber, field: 'academicYearId', message: "L'année scolaire est requise" });
          continue;
        }

        const classData: CreateClassRequest = {
          name: row.name.trim(),
          levelId: row.levelId,
          sectionId: row.sectionId || undefined,
          streamId: row.streamId || undefined,
          capacity: row.capacity ? parseInt(row.capacity, 10) : 40,
          roomId: row.roomId || undefined,
          mainTeacherId: row.mainTeacherId || undefined,
          color: row.color || undefined,
          academicYearId: row.academicYearId,
        };

        const cls = await this.academicRepo.createClass(classData, schoolId);
        imported.push(cls);
      } catch (error) {
        errors.push({
          row: rowNumber,
          field: 'general',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
        });
      }
    }

    logger.info('Classes imported', { schoolId, userId, imported: imported.length, errors: errors.length }, 'academic');

    return {
      success: errors.length === 0,
      imported: imported.length,
      errors,
      data: imported,
    };
  }

  /**
   * Parses CSV data and bulk creates subjects after validation.
   */
  async importSubjects(
    schoolId: string,
    userId: string,
    data: string,
  ): Promise<ImportResult<Subject>> {
    const rows = this.parseCSV(data);
    if (rows.length === 0) {
      throw new AcademicImportError('Aucune donnée à importer');
    }

    if (rows.length > ACADEMIC_IMPORT.MAX_ROWS) {
      throw new AcademicImportError(
        `Trop de lignes: ${rows.length} lignes (max: ${ACADEMIC_IMPORT.MAX_ROWS})`,
      );
    }

    const validationErrors = this.validateImportData(data, 'SUBJECTS');
    if (validationErrors.length > 0) {
      throw new AcademicValidationError(validationErrors);
    }

    const errors: Array<{ row: number; field: string; message: string }> = [];
    const imported: Subject[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2;

      try {
        if (!row.name || row.name.trim().length === 0) {
          errors.push({ row: rowNumber, field: 'name', message: 'Le nom est requis' });
          continue;
        }
        if (!row.code || row.code.trim().length === 0) {
          errors.push({ row: rowNumber, field: 'code', message: 'Le code est requis' });
          continue;
        }

        const subjectData: CreateSubjectRequest = {
          name: row.name.trim(),
          code: row.code.trim(),
          coefficient: row.coefficient ? parseFloat(row.coefficient) : undefined,
          maxHoursPerWeek: row.maxHoursPerWeek ? parseInt(row.maxHoursPerWeek, 10) : undefined,
          departmentId: row.departmentId || undefined,
          color: row.color || undefined,
          levels: row.levels ? row.levels.split(',').map((l: string) => l.trim()) : [],
        };

        const subject = await this.academicRepo.createSubject(subjectData, schoolId);
        imported.push(subject);
      } catch (error) {
        errors.push({
          row: rowNumber,
          field: 'general',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
        });
      }
    }

    logger.info('Subjects imported', { schoolId, userId, imported: imported.length, errors: errors.length }, 'academic');

    return {
      success: errors.length === 0,
      imported: imported.length,
      errors,
      data: imported,
    };
  }

  /**
   * Parses CSV data and bulk creates rooms after validation.
   */
  async importRooms(
    schoolId: string,
    userId: string,
    data: string,
  ): Promise<ImportResult<Room>> {
    const rows = this.parseCSV(data);
    if (rows.length === 0) {
      throw new AcademicImportError('Aucune donnée à importer');
    }

    if (rows.length > ACADEMIC_IMPORT.MAX_ROWS) {
      throw new AcademicImportError(
        `Trop de lignes: ${rows.length} lignes (max: ${ACADEMIC_IMPORT.MAX_ROWS})`,
      );
    }

    const validationErrors = this.validateImportData(data, 'ROOMS');
    if (validationErrors.length > 0) {
      throw new AcademicValidationError(validationErrors);
    }

    const errors: Array<{ row: number; field: string; message: string }> = [];
    const imported: Room[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2;

      try {
        if (!row.name || row.name.trim().length === 0) {
          errors.push({ row: rowNumber, field: 'name', message: 'Le nom est requis' });
          continue;
        }
        if (!row.code || row.code.trim().length === 0) {
          errors.push({ row: rowNumber, field: 'code', message: 'Le code est requis' });
          continue;
        }
        if (!row.capacity || parseInt(row.capacity, 10) < 1) {
          errors.push({ row: rowNumber, field: 'capacity', message: 'La capacité doit être supérieure à 0' });
          continue;
        }
        if (!row.roomType) {
          errors.push({ row: rowNumber, field: 'roomType', message: 'Le type de salle est requis' });
          continue;
        }

        const roomData: CreateRoomRequest = {
          name: row.name.trim(),
          code: row.code.trim(),
          capacity: parseInt(row.capacity, 10),
          roomType: row.roomType.trim() as 'NORMAL' | 'LABORATORY' | 'COMPUTER' | 'AMPHITHEATER' | 'WORKSHOP' | 'LIBRARY',
          floor: row.floor ? parseInt(row.floor, 10) : undefined,
          building: row.building || undefined,
          hasProjector: row.hasProjector === 'true' || row.hasProjector === '1',
          hasWhiteboard: row.hasWhiteboard !== 'false' && row.hasWhiteboard !== '0',
          hasComputer: row.hasComputer === 'true' || row.hasComputer === '1',
          hasInternet: row.hasInternet === 'true' || row.hasInternet === '1',
        };

        const room = await this.academicRepo.createRoom(roomData, schoolId);
        imported.push(room);
      } catch (error) {
        errors.push({
          row: rowNumber,
          field: 'general',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
        });
      }
    }

    logger.info('Rooms imported', { schoolId, userId, imported: imported.length, errors: errors.length }, 'academic');

    return {
      success: errors.length === 0,
      imported: imported.length,
      errors,
      data: imported,
    };
  }

  /**
   * Parses CSV data and bulk creates timetable slots after validation.
   */
  async importTimetable(
    schoolId: string,
    userId: string,
    data: string,
  ): Promise<ImportResult<TimetableSlot>> {
    const rows = this.parseCSV(data);
    if (rows.length === 0) {
      throw new AcademicImportError('Aucune donnée à importer');
    }

    if (rows.length > ACADEMIC_IMPORT.MAX_ROWS) {
      throw new AcademicImportError(
        `Trop de lignes: ${rows.length} lignes (max: ${ACADEMIC_IMPORT.MAX_ROWS})`,
      );
    }

    const validationErrors = this.validateImportData(data, 'TIMETABLE');
    if (validationErrors.length > 0) {
      throw new AcademicValidationError(validationErrors);
    }

    const errors: Array<{ row: number; field: string; message: string }> = [];
    const imported: TimetableSlot[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2;

      try {
        if (!row.classId) {
          errors.push({ row: rowNumber, field: 'classId', message: 'La classe est requise' });
          continue;
        }
        if (!row.subjectId) {
          errors.push({ row: rowNumber, field: 'subjectId', message: 'La matière est requise' });
          continue;
        }
        if (!row.teacherId) {
          errors.push({ row: rowNumber, field: 'teacherId', message: "L'enseignant est requis" });
          continue;
        }
        if (!row.roomId) {
          errors.push({ row: rowNumber, field: 'roomId', message: 'La salle est requise' });
          continue;
        }
        if (!row.academicYearId) {
          errors.push({ row: rowNumber, field: 'academicYearId', message: "L'année scolaire est requise" });
          continue;
        }
        if (!row.dayOfWeek && row.dayOfWeek !== '0') {
          errors.push({ row: rowNumber, field: 'dayOfWeek', message: 'Le jour de la semaine est requis' });
          continue;
        }
        if (!row.startTime) {
          errors.push({ row: rowNumber, field: 'startTime', message: "L'heure de début est requise" });
          continue;
        }
        if (!row.endTime) {
          errors.push({ row: rowNumber, field: 'endTime', message: "L'heure de fin est requise" });
          continue;
        }

        const slotData: CreateScheduleSlotRequest = {
          classId: row.classId,
          subjectId: row.subjectId,
          teacherId: row.teacherId,
          roomId: row.roomId,
          academicYearId: row.academicYearId,
          dayOfWeek: parseInt(row.dayOfWeek, 10) as DayOfWeek,
          startTime: row.startTime.trim(),
          endTime: row.endTime.trim(),
        };

        if (slotData.startTime >= slotData.endTime) {
          errors.push({ row: rowNumber, field: 'endTime', message: "L'heure de fin doit être après l'heure de début" });
          continue;
        }

        const slot = await this.academicRepo.createTimetableSlot(slotData, schoolId);
        imported.push(slot);
      } catch (error) {
        errors.push({
          row: rowNumber,
          field: 'general',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
        });
      }
    }

    logger.info('Timetable imported', { schoolId, userId, imported: imported.length, errors: errors.length }, 'academic');

    return {
      success: errors.length === 0,
      imported: imported.length,
      errors,
      data: imported,
    };
  }

  /**
   * Validates CSV data format and required columns for the given import type.
   */
  validateImportData(
    data: string,
    type: ImportType,
  ): Array<{ field: string; message: string }> {
    const errors: Array<{ field: string, message: string }> = [];
    const lines = data.split('\n').filter((line) => line.trim().length > 0);

    if (lines.length < 2) {
      errors.push({ field: 'data', message: 'Le fichier doit contenir au moins un en-tête et une ligne de données' });
      return errors;
    }

    const headers = this.parseCSVLine(lines[0]);
    const requiredColumns = this.getRequiredColumns(type);

    for (const col of requiredColumns) {
      if (!headers.includes(col)) {
        errors.push({ field: 'columns', message: `Colonne manquante: ${col}` });
      }
    }

    return errors;
  }

  private parseCSV(data: string): Record<string, string>[] {
    const lines = data.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length < 2) return [];

    const headers = this.parseCSVLine(lines[0]);
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      const row: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j] || '';
      }
      rows.push(row);
    }

    return rows;
  }

  private parseCSVLine(line: string): string[] {
    const delimiter = line.includes(';') ? ';' : ',';
    return line.split(delimiter).map((val) => val.trim().replace(/^["']|["']$/g, ''));
  }

  private getRequiredColumns(type: ImportType): string[] {
    switch (type) {
      case 'CLASSES':
        return ['name', 'levelId', 'academicYearId'];
      case 'SUBJECTS':
        return ['name', 'code'];
      case 'ROOMS':
        return ['name', 'code', 'capacity', 'roomType'];
      case 'TIMETABLE':
        return ['classId', 'subjectId', 'teacherId', 'roomId', 'academicYearId', 'dayOfWeek', 'startTime', 'endTime'];
      default:
        return [];
    }
  }
}
