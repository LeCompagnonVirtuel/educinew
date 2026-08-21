import type {
  AcademicRepository, AcademicFilters, AcademicStatistics,
} from '../types';
import { AcademicExportError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ACADEMIC_EXPORT } from '@educi/config';

interface ExportColumn {
  key: string;
  header: string;
  format?: (value: unknown, row?: Record<string, unknown>) => string;
}

interface ExportFileResult {
  data: string | object;
  filename: string;
  mimeType: string;
}

export class AcademicExportService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Exports classes as CSV or JSON with optional filters.
   */
  async exportClasses(
    schoolId: string,
    filters: AcademicFilters,
    format: string = 'CSV',
  ): Promise<ExportFileResult> {
    if (!ACADEMIC_EXPORT.FORMATS.includes(format)) {
      throw new AppError(
        `Format non supporté: ${format}`,
        'ACADEMIC_EXPORT_FORMAT_INVALID',
        400,
      );
    }

    const { data: classes } = await this.academicRepo.findAllClasses(schoolId, {
      ...filters,
      limit: ACADEMIC_EXPORT.MAX_ROWS,
    });

    const columns: ExportColumn[] = [
      { key: 'name', header: 'Nom' },
      { key: 'level.name', header: 'Niveau', format: (v) => (v as string) || '' },
      { key: 'section.name', header: 'Section', format: (v) => (v as string) || '' },
      { key: 'stream.name', header: 'Série', format: (v) => (v as string) || '' },
      { key: 'capacity', header: 'Capacité' },
      { key: 'status', header: 'Statut' },
      { key: 'room.name', header: 'Salle', format: (v) => (v as string) || '' },
    ];

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `classes_${timestamp}`;

    if (format === 'JSON') {
      return {
        data: classes,
        filename: `${filename}.json`,
        mimeType: 'application/json',
      };
    }

    const csv = this.generateCSV(classes as unknown as Record<string, unknown>[], columns);
    return {
      data: csv,
      filename: `${filename}.csv`,
      mimeType: 'text/csv',
    };
  }

  /**
   * Exports subjects as CSV or JSON with optional filters.
   */
  async exportSubjects(
    schoolId: string,
    filters: AcademicFilters,
    format: string = 'CSV',
  ): Promise<ExportFileResult> {
    if (!ACADEMIC_EXPORT.FORMATS.includes(format)) {
      throw new AppError(
        `Format non supporté: ${format}`,
        'ACADEMIC_EXPORT_FORMAT_INVALID',
        400,
      );
    }

    const { data: subjects } = await this.academicRepo.findAllSubjects(schoolId, {
      ...filters,
      limit: ACADEMIC_EXPORT.MAX_ROWS,
    });

    const columns: ExportColumn[] = [
      { key: 'name', header: 'Nom' },
      { key: 'code', header: 'Code' },
      { key: 'coefficient', header: 'Coefficient' },
      { key: 'maxHoursPerWeek', header: 'Max Heures/Semaine' },
      { key: 'department.name', header: 'Département', format: (v) => (v as string) || '' },
      { key: 'archived', header: 'Archivé', format: (v) => (v as boolean) ? 'Oui' : 'Non' },
    ];

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `matieres_${timestamp}`;

    if (format === 'JSON') {
      return {
        data: subjects,
        filename: `${filename}.json`,
        mimeType: 'application/json',
      };
    }

    const csv = this.generateCSV(subjects as unknown as Record<string, unknown>[], columns);
    return {
      data: csv,
      filename: `${filename}.csv`,
      mimeType: 'text/csv',
    };
  }

  /**
   * Exports rooms as CSV or JSON with optional filters.
   */
  async exportRooms(
    schoolId: string,
    filters: AcademicFilters,
    format: string = 'CSV',
  ): Promise<ExportFileResult> {
    if (!ACADEMIC_EXPORT.FORMATS.includes(format)) {
      throw new AppError(
        `Format non supporté: ${format}`,
        'ACADEMIC_EXPORT_FORMAT_INVALID',
        400,
      );
    }

    const { data: rooms } = await this.academicRepo.findAllRooms(schoolId, {
      ...filters,
      limit: ACADEMIC_EXPORT.MAX_ROWS,
    });

    const columns: ExportColumn[] = [
      { key: 'name', header: 'Nom' },
      { key: 'code', header: 'Code' },
      { key: 'capacity', header: 'Capacité' },
      { key: 'roomType', header: 'Type' },
      { key: 'floor', header: 'Étage' },
      { key: 'building', header: 'Bâtiment' },
      { key: 'hasProjector', header: 'Vidéoprojecteur', format: (v) => (v as boolean) ? 'Oui' : 'Non' },
      { key: 'hasWhiteboard', header: 'Tableau', format: (v) => (v as boolean) ? 'Oui' : 'Non' },
      { key: 'hasComputer', header: 'Ordinateur', format: (v) => (v as boolean) ? 'Oui' : 'Non' },
      { key: 'hasInternet', header: 'Internet', format: (v) => (v as boolean) ? 'Oui' : 'Non' },
      { key: 'status', header: 'Statut' },
    ];

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `salles_${timestamp}`;

    if (format === 'JSON') {
      return {
        data: rooms,
        filename: `${filename}.json`,
        mimeType: 'application/json',
      };
    }

    const csv = this.generateCSV(rooms as unknown as Record<string, unknown>[], columns);
    return {
      data: csv,
      filename: `${filename}.csv`,
      mimeType: 'text/csv',
    };
  }

  /**
   * Exports timetable slots as CSV or JSON for an academic year.
   */
  async exportTimetable(
    schoolId: string,
    academicYearId: string,
    format: string = 'CSV',
  ): Promise<ExportFileResult> {
    if (!ACADEMIC_EXPORT.FORMATS.includes(format)) {
      throw new AppError(
        `Format non supporté: ${format}`,
        'ACADEMIC_EXPORT_FORMAT_INVALID',
        400,
      );
    }

    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });

    const columns: ExportColumn[] = [
      { key: 'class.name', header: 'Classe', format: (v) => (v as string) || '' },
      { key: 'subject.name', header: 'Matière', format: (v) => (v as string) || '' },
      { key: 'teacher.firstName', header: 'Enseignant', format: (_v, row) => {
        const t = (row as Record<string, unknown>).teacher as Record<string, string> | undefined;
        return t ? `${t.firstName || ''} ${t.lastName || ''}`.trim() : '';
      }},
      { key: 'room.name', header: 'Salle', format: (v) => (v as string) || '' },
      { key: 'dayOfWeek', header: 'Jour' },
      { key: 'startTime', header: 'Heure début' },
      { key: 'endTime', header: 'Heure fin' },
      { key: 'status', header: 'Statut' },
    ];

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `emploi_du_temps_${timestamp}`;

    if (format === 'JSON') {
      return {
        data: slots,
        filename: `${filename}.json`,
        mimeType: 'application/json',
      };
    }

    const csv = this.generateCSV(slots as unknown as Record<string, unknown>[], columns);
    return {
      data: csv,
      filename: `${filename}.csv`,
      mimeType: 'text/csv',
    };
  }

  /**
   * Exports academic statistics for a given year.
   */
  async exportStatistics(
    schoolId: string,
    academicYearId: string,
    format: string = 'JSON',
  ): Promise<ExportFileResult> {
    if (!ACADEMIC_EXPORT.FORMATS.includes(format)) {
      throw new AppError(
        `Format non supporté: ${format}`,
        'ACADEMIC_EXPORT_FORMAT_INVALID',
        400,
      );
    }

    const stats = await this.academicRepo.getStatistics(schoolId, academicYearId);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `statistiques_${timestamp}`;

    if (format === 'CSV') {
      const lines = [
        'Métrique,Valeur',
        `Total Classes,${stats.totalClasses}`,
        `Total Matières,${stats.totalSubjects}`,
        `Total Enseignants,${stats.totalTeachers}`,
        `Total Salles,${stats.totalRooms}`,
        `Taux Occupation Salles,${stats.roomOccupancyRate}%`,
      ];
      return {
        data: lines.join('\n'),
        filename: `${filename}.csv`,
        mimeType: 'text/csv',
      };
    }

    return {
      data: { ...stats, exportedAt: new Date().toISOString() },
      filename: `${filename}.json`,
      mimeType: 'application/json',
    };
  }

  /**
   * Converts an array of objects to a CSV string using column definitions.
   */
  generateCSV(
    data: Record<string, unknown>[],
    columns: ExportColumn[],
  ): string {
    const header = columns.map((c) => `"${c.header}"`).join(',');
    const rows = data.map((item) =>
      columns
        .map((col) => {
          let value: unknown;
          if (col.format) {
            value = col.format(this.getNestedValue(item, col.key), item);
          } else {
            value = this.getNestedValue(item, col.key);
          }
          const str = String(value ?? '').replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(','),
    );

    return [header, ...rows].join('\n');
  }

  /**
   * Triggers a file download in the browser with the given data and filename.
   */
  downloadFile(data: string | object, filename: string, format: string): void {
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const mimeType = format === 'JSON' ? 'application/json' : 'text/csv';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    logger.info('File downloaded', { filename, format }, 'academic');
  }

  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
      if (current && typeof current === 'object') {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }
}
