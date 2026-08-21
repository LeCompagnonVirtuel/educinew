import type { CreateTeacherRequest, UpdateTeacherRequest } from '../types';
import { logger } from '@educi/logger';

export class ValidationService {
  validateCreate(data: CreateTeacherRequest): { isValid: boolean; errors: Array<{ field: string; message: string }> } {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.firstName || data.firstName.trim().length < 1) {
      errors.push({ field: 'firstName', message: 'Prénom requis' });
    }
    if (!data.lastName || data.lastName.trim().length < 1) {
      errors.push({ field: 'lastName', message: 'Nom requis' });
    }
    if (!data.employmentType) {
      errors.push({ field: 'employmentType', message: 'Type d\'emploi requis' });
    }
    if (!data.contractType) {
      errors.push({ field: 'contractType', message: 'Type de contrat requis' });
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push({ field: 'email', message: 'Email invalide' });
    }
    if (data.phone && !/^\+?[\d\s-]{8,15}$/.test(data.phone)) {
      errors.push({ field: 'phone', message: 'Téléphone invalide' });
    }
    if (data.salary !== undefined && data.salary < 0) {
      errors.push({ field: 'salary', message: 'Le salaire ne peut pas être négatif' });
    }
    if (data.maxWeeklyHours !== undefined && (data.maxWeeklyHours < 1 || data.maxWeeklyHours > 80)) {
      errors.push({ field: 'maxWeeklyHours', message: 'Les heures hebdomadaires doivent être entre 1 et 80' });
    }

    return { isValid: errors.length === 0, errors };
  }

  validateUpdate(data: UpdateTeacherRequest): { isValid: boolean; errors: Array<{ field: string; message: string }> } {
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
    if (data.phone !== undefined && data.phone.length > 0 && !/^\+?[\d\s-]{8,15}$/.test(data.phone)) {
      errors.push({ field: 'phone', message: 'Téléphone invalide' });
    }
    if (data.salary !== undefined && data.salary < 0) {
      errors.push({ field: 'salary', message: 'Le salaire ne peut pas être négatif' });
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
    if (!row.employmentType && !row['Type d\'emploi']) {
      errors.push({ row: rowIndex, field: 'employmentType', message: 'Type d\'emploi requis' });
    }
    if (!row.contractType && !row['Type de contrat']) {
      errors.push({ row: rowIndex, field: 'contractType', message: 'Type de contrat requis' });
    }

    return { isValid: errors.length === 0, errors };
  }
}
