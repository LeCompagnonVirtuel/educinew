import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createRewardService(repo: HRRepositoryExtended) {
  return {
    async findRewards(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const { data, error } = await (repo as any).supabase
        .from('rewards')
        .select('*')
        .eq('school_id', schoolId)
        .eq(employeeId ? 'employee_id' : 'school_id', employeeId || schoolId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async findRewardById(schoolId: string, rewardId: string) {
      if (!schoolId || !rewardId) throw new AppError('Identifiants requis');
      const { data } = await (repo as any).supabase
        .from('rewards')
        .select('*')
        .eq('school_id', schoolId)
        .eq('id', rewardId)
        .single();
      if (!data) throw new AppError('Récompense non trouvée');
      return data;
    },

    async createReward(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.reward_type) throw new AppError('Le type de récompense est requis');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      const { data: result, error } = await (repo as any).supabase
        .from('rewards')
        .insert({ ...data, school_id: schoolId })
        .select()
        .single();
      if (error) throw error;
      return result;
    },

    async updateReward(schoolId: string, rewardId: string, data: any) {
      if (!schoolId || !rewardId) throw new AppError('Identifiants requis');
      const { data: existing } = await (repo as any).supabase
        .from('rewards')
        .select('*')
        .eq('school_id', schoolId)
        .eq('id', rewardId)
        .single();
      if (!existing) throw new AppError('Récompense non trouvée');

      const { data: result, error } = await (repo as any).supabase
        .from('rewards')
        .update(data)
        .eq('school_id', schoolId)
        .eq('id', rewardId)
        .select()
        .single();
      if (error) throw error;
      return result;
    },

    async findRewardsByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      const { data, error } = await (repo as any).supabase
        .from('rewards')
        .select('*')
        .eq('school_id', schoolId)
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  };
}
