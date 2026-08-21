import { describe, it, expect } from 'vitest';
import { ValidationService } from '@/features/teachers/services/validation.service';
import { AuditTeacherService } from '@/features/teachers/services/audit-teacher.service';

describe('Teacher AuditService', () => {
  const service = new AuditTeacherService();

  it('should log audit entries without throwing', async () => {
    await expect(service.log({
      action: 'TEACHER_CREATE',
      teacherId: 't1',
      schoolId: 's1',
      details: { firstName: 'Jean', lastName: 'Dupont' },
    })).resolves.toBeUndefined();
  });

  it('should log audit entries without details', async () => {
    await expect(service.log({
      action: 'TEACHER_DELETE',
      teacherId: 't1',
    })).resolves.toBeUndefined();
  });
});

describe('Teacher ValidationService Extended', () => {
  const service = new ValidationService();

  it('should validate all employment types in create', () => {
    for (const type of ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'VOLUNTEER', 'INTERN']) {
      const result = service.validateCreate({ firstName: 'A', lastName: 'B', employmentType: type as any, contractType: 'CDI' });
      expect(result.isValid).toBe(true);
    }
  });

  it('should validate all contract types in create', () => {
    for (const type of ['CDI', 'CDD', 'VACATAIRE', 'CONSULTANT', 'STAGE']) {
      const result = service.validateCreate({ firstName: 'A', lastName: 'B', employmentType: 'FULL_TIME', contractType: type as any });
      expect(result.isValid).toBe(true);
    }
  });

  it('should validate all grades in create', () => {
    for (const grade of ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3']) {
      const result = service.validateCreate({ firstName: 'A', lastName: 'B', employmentType: 'FULL_TIME', contractType: 'CDI', grade: grade as any });
      expect(result.isValid).toBe(true);
    }
  });

  it('should validate all specialities in create', () => {
    for (const speciality of ['MATHEMATIQUES', 'PHYSIQUE', 'CHIMIE', 'BIOLOGIE', 'FRANCAIS', 'ANGLAIS']) {
      const result = service.validateCreate({ firstName: 'A', lastName: 'B', employmentType: 'FULL_TIME', contractType: 'CDI', speciality: speciality as any });
      expect(result.isValid).toBe(true);
    }
  });

  it('should validate import with French columns', () => {
    const result = service.validateImportRow({
      'Prénom': 'Jean',
      'Nom': 'Dupont',
      'Type d\'emploi': 'FULL_TIME',
      'Type de contrat': 'CDI',
      'Email': 'jean@test.com',
    }, 1);
    expect(result.isValid).toBe(true);
  });

  it('should validate import with English columns', () => {
    const result = service.validateImportRow({
      firstName: 'Jean',
      lastName: 'Dupont',
      employmentType: 'FULL_TIME',
      contractType: 'CDI',
    }, 1);
    expect(result.isValid).toBe(true);
  });

  it('should catch multiple errors in import', () => {
    const result = service.validateImportRow({}, 5);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
    expect(result.errors[0].row).toBe(5);
  });

  it('should validate update with all fields', () => {
    const result = service.validateUpdate({
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean@test.com',
      phone: '+22507070707',
      salary: 500000,
    });
    expect(result.isValid).toBe(true);
  });

  it('should catch invalid phone in update', () => {
    const result = service.validateUpdate({ phone: '123' });
    expect(result.isValid).toBe(false);
  });

  it('should catch negative salary in update', () => {
    const result = service.validateUpdate({ salary: -100 });
    expect(result.isValid).toBe(false);
  });
});
