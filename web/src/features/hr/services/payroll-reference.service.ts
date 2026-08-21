import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createPayrollReferenceService(repo: HRRepositoryExtended) {
  return {
    async findPayrollReferences(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const { data, error } = await (repo as any).supabase
        .from('payroll_references')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async findPayrollReferenceById(schoolId: string, referenceId: string) {
      if (!schoolId || !referenceId) throw new AppError('Identifiants requis');
      const { data } = await (repo as any).supabase
        .from('payroll_references')
        .select('*')
        .eq('school_id', schoolId)
        .eq('id', referenceId)
        .single();
      if (!data) throw new AppError('Référence de paie non trouvée');
      return data;
    },

    async findPayrollReferenceByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      const { data } = await (repo as any).supabase
        .from('payroll_references')
        .select('*')
        .eq('school_id', schoolId)
        .eq('employee_id', employeeId)
        .single();
      return data;
    },

    async createPayrollReference(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      const { data: result, error } = await (repo as any).supabase
        .from('payroll_references')
        .insert({ ...data, school_id: schoolId })
        .select()
        .single();
      if (error) throw error;
      return result;
    },

    async updatePayrollReference(schoolId: string, referenceId: string, data: any) {
      if (!schoolId || !referenceId) throw new AppError('Identifiants requis');
      const existing = await this.findPayrollReferenceById(schoolId, referenceId);
      if (!existing) throw new AppError('Référence de paie non trouvée');

      const { data: result, error } = await (repo as any).supabase
        .from('payroll_references')
        .update(data)
        .eq('school_id', schoolId)
        .eq('id', referenceId)
        .select()
        .single();
      if (error) throw error;
      return result;
    },

    async deletePayrollReference(schoolId: string, referenceId: string) {
      if (!schoolId || !referenceId) throw new AppError('Identifiants requis');
      const existing = await this.findPayrollReferenceById(schoolId, referenceId);
      if (!existing) throw new AppError('Référence de paie non trouvée');

      const { error } = await (repo as any).supabase
        .from('payroll_references')
        .delete()
        .eq('school_id', schoolId)
        .eq('id', referenceId);
      if (error) throw error;
    },
  };
}
