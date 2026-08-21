import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createImportService(repo: HRRepositoryExtended) {
  return {
    async importEmployees(schoolId: string, employees: any[]) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!employees || employees.length === 0) throw new AppError('Aucun employé à importer');

      const results = { success: 0, errors: 0, details: [] as any[] };

      for (const emp of employees) {
        try {
          if (!emp.first_name || !emp.last_name || !emp.email) {
            results.errors++;
            results.details.push({ data: emp, error: 'Données incomplètes' });
            continue;
          }

          const existing = await repo.findEmployeeByEmail(schoolId, emp.email);
          if (existing) {
            results.errors++;
            results.details.push({ data: emp, error: 'Un employé avec cet email existe déjà' });
            continue;
          }

          await repo.createEmployee({ ...emp, school_id: schoolId });
          results.success++;
        } catch (error: any) {
          results.errors++;
          results.details.push({ data: emp, error: error.message });
        }
      }

      return results;
    },

    async validateImportData(data: any[]) {
      const errors: string[] = [];
      if (!Array.isArray(data)) throw new AppError('Les données doivent être un tableau');

      for (let i = 0; i < data.length; i++) {
        const emp = data[i];
        if (!emp.first_name) errors.push(`Ligne ${i + 1}: prénom manquant`);
        if (!emp.last_name) errors.push(`Ligne ${i + 1}: nom manquant`);
        if (!emp.email) errors.push(`Ligne ${i + 1}: email manquant`);
        if (emp.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emp.email)) {
          errors.push(`Ligne ${i + 1}: email invalide`);
        }
      }

      if (errors.length > 0) throw new AppError(errors.join('; '));
      return true;
    },
  };
}
