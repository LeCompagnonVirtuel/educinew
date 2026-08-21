import type { AcademicRepository, Department, CreateDepartmentRequest, UpdateDepartmentRequest } from '../types';
import { DepartmentNotFoundError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';

export class DepartmentService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new department after validating code uniqueness within the school.
   */
  async create(schoolId: string, userId: string, data: CreateDepartmentRequest): Promise<Department> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom est requis' });
    }
    if (!data.code || data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code est requis' });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'DEPARTMENT_VALIDATION_ERROR',
        400,
      );
    }

    const departments = await this.academicRepo.findAllDepartments(schoolId);

    const duplicate = departments.find(
      (d) => d.code.toLowerCase() === data.code.trim().toLowerCase(),
    );

    if (duplicate) {
      throw new AppError(
        `Un département avec le code ${data.code} existe déjà`,
        'DEPARTMENT_DUPLICATE',
        409,
      );
    }

    const department = await this.academicRepo.createDepartment(data, schoolId);
    logger.info('Department created', { departmentId: department.id, schoolId, userId }, 'academic');
    return department;
  }

  /**
   * Retrieves a department by its ID within a school.
   */
  async getById(schoolId: string, departmentId: string): Promise<Department> {
    const department = await this.academicRepo.findDepartment(departmentId);
    if (!department || department.schoolId !== schoolId) {
      throw new DepartmentNotFoundError(departmentId);
    }
    logger.info('Department retrieved', { departmentId, schoolId }, 'academic');
    return department;
  }

  /**
   * Lists all departments for a school ordered by name.
   */
  async list(schoolId: string): Promise<Department[]> {
    const departments = await this.academicRepo.findAllDepartments(schoolId);
    logger.info('Departments listed', { schoolId, count: departments.length }, 'academic');
    return departments;
  }

  /**
   * Updates a department after validating the update data.
   */
  async update(schoolId: string, userId: string, departmentId: string, data: UpdateDepartmentRequest): Promise<Department> {
    const existing = await this.academicRepo.findDepartment(departmentId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new DepartmentNotFoundError(departmentId);
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
        'DEPARTMENT_VALIDATION_ERROR',
        400,
      );
    }

    if (data.code !== undefined) {
      const targetCode = data.code.trim().toLowerCase();
      const departments = await this.academicRepo.findAllDepartments(schoolId);

      const duplicate = departments.find(
        (d) => d.id !== departmentId && d.code.toLowerCase() === targetCode,
      );

      if (duplicate) {
        throw new AppError(
          `Un département avec le code ${data.code} existe déjà`,
          'DEPARTMENT_DUPLICATE',
          409,
        );
      }
    }

    const updated = await this.academicRepo.updateDepartment(departmentId, data);
    logger.info('Department updated', { departmentId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Deletes a department by its ID.
   */
  async delete(schoolId: string, userId: string, departmentId: string): Promise<void> {
    const existing = await this.academicRepo.findDepartment(departmentId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new DepartmentNotFoundError(departmentId);
    }

    await this.academicRepo.deleteDepartment(departmentId);
    logger.info('Department deleted', { departmentId, schoolId, userId }, 'academic');
  }
}
