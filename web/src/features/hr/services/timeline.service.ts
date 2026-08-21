import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createTimelineService(repo: HRRepositoryExtended) {
  return {
    async getEmployeeTimeline(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');

      const employee = await repo.findEmployeeById(schoolId, employeeId);
      if (!employee) throw new AppError('Employé non trouvé');

      const timeline: any[] = [];

      // Hire event
      if (employee.hire_date) {
        timeline.push({ type: 'hire', date: employee.hire_date, description: 'Embauché(e)' });
      }

      // Contracts
      const contracts = await repo.findContracts(schoolId, employeeId);
      for (const contract of contracts) {
        timeline.push({ type: 'contract', date: contract.start_date, description: `Contrat ${contract.contract_type}` });
      }

      // Leaves
      const leaves = await repo.findLeaves(schoolId, employeeId);
      for (const leave of leaves) {
        timeline.push({ type: 'leave', date: leave.start_date, description: `Congé ${leave.leave_type} (${leave.status})` });
      }

      // Promotions
      const promotions = await repo.findPromotions(schoolId, employeeId);
      for (const promo of promotions) {
        timeline.push({ type: 'promotion', date: promo.effective_date, description: `Promotion vers ${promo.new_position}` });
      }

      // Transfers
      const transfers = await repo.findTransfers(schoolId, employeeId);
      for (const transfer of transfers) {
        timeline.push({ type: 'transfer', date: transfer.effective_date, description: 'Transfert' });
      }

      // Trainings
      const enrollments = await (repo as any).supabase
        .from('training_enrollments')
        .select('*, trainings(*)')
        .eq('school_id', schoolId)
        .eq('employee_id', employeeId);
      if (enrollments.data) {
        for (const enrollment of enrollments.data) {
          timeline.push({ type: 'training', date: enrollment.enrolled_at, description: `Formation: ${enrollment.trainings?.title || 'N/A'}` });
        }
      }

      // Sort by date
      timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return timeline;
    },
  };
}
