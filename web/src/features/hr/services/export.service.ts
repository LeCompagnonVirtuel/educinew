import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createExportService(repo: HRRepositoryExtended) {
  return {
    async exportEmployees(schoolId: string, filters?: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const employees = await repo.findEmployees(schoolId, filters);

      const exportData = employees.map((emp: any) => ({
        Code: emp.employee_code,
        Prénom: emp.first_name,
        Nom: emp.last_name,
        Email: emp.email,
        Téléphone: emp.phone,
        Département: emp.department_id,
        Poste: emp.position_id,
        Statut: emp.status,
        Type_contrat: emp.contract_type,
        Date_embauche: emp.hire_date,
      }));

      return exportData;
    },

    async exportEmployeesCSV(schoolId: string, filters?: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const data = await this.exportEmployees(schoolId, filters);

      if (data.length === 0) return '';

      const headers = Object.keys(data[0]);
      const csvRows = [headers.join(',')];

      for (const row of data) {
        const values = headers.map((h) => {
          const val = (row as any)[h];
          return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
        });
        csvRows.push(values.join(','));
      }

      return csvRows.join('\n');
    },

    async exportEmployeesJSON(schoolId: string, filters?: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const data = await this.exportEmployees(schoolId, filters);
      return JSON.stringify(data, null, 2);
    },
  };
}
