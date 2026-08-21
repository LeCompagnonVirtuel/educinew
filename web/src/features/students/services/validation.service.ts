import type { CreateStudentRequest, UpdateStudentRequest, StudentFilters } from '../types';
import { logger } from '@educi/logger';

export class ValidationService {
  validateCreate(data: CreateStudentRequest): { isValid: boolean; errors: Array<{ field: string; message: string }> } {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.firstName || data.firstName.trim().length < 1) {
      errors.push({ field: 'firstName', message: 'Prénom requis' });
    }
    if (!data.lastName || data.lastName.trim().length < 1) {
      errors.push({ field: 'lastName', message: 'Nom requis' });
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push({ field: 'email', message: 'Email invalide' });
    }
    if (data.phone && !/^\+?[\d\s-]{8,15}$/.test(data.phone)) {
      errors.push({ field: 'phone', message: 'Téléphone invalide' });
    }

    return { isValid: errors.length === 0, errors };
  }

  validateUpdate(data: UpdateStudentRequest): { isValid: boolean; errors: Array<{ field: string; message: string }> } {
    const errors: Array<{ field: string; message: string }> = [];

    if (data.firstName !== undefined && data.firstName.trim().length < 1) {
      errors.push({ field: 'firstName', message: 'Prénom requis' });
    }
    if (data.lastName !== undefined && data.lastName.trim().length < 1) {
      errors.push({ field: 'lastName', message: 'Nom requis' });
    }
    if (data.email !== undefined && data.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push({ field: 'email', message: 'Email invalide' });
    }

    return { isValid: errors.length === 0, errors };
  }

  validateImportRow(row: Record<string, unknown>, rowIndex: number): { isValid: boolean; errors: Array<{ row: number; field: string; message: string }> } {
    const errors: Array<{ row: number; field: string; message: string }> = [];

    if (!row.firstName && !row['Prénom']) {
      errors.push({ row: rowIndex, field: 'firstName', message: 'Prénom requis' });
    }
    if (!row.lastName && !row['Nom']) {
      errors.push({ row: rowIndex, field: 'lastName', message: 'Nom requis' });
    }

    return { isValid: errors.length === 0, errors };
  }
}
