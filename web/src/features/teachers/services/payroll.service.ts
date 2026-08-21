import type { TeacherRepository, TeacherPayrollSummary } from '../types';
import { TeacherPayrollError } from '@educi/errors';
import { logger } from '@educi/logger';

export class PayrollService {
  constructor(private readonly teacherRepo: TeacherRepository) {}

  async getPayroll(schoolId: string): Promise<TeacherPayrollSummary[]> {
    return this.teacherRepo.getPayroll(schoolId);
  }

  async calculatePayroll(schoolId: string, month: number, year: number): Promise<TeacherPayrollSummary[]> {
    const payroll = await this.teacherRepo.getPayroll(schoolId);

    const enriched = payroll.map((entry) => {
      const overtimeHours = Math.max(0, entry.hoursWorked - 40);
      const overtimePay = overtimeHours * (entry.baseSalary / 160) * 1.5;

      return {
        ...entry,
        overtimeHours,
        overtimePay,
        netPay: entry.baseSalary + overtimePay + entry.bonuses - entry.deductions,
      };
    });

    logger.info('Payroll calculated', { schoolId, month, year, count: enriched.length }, 'teachers');
    return enriched;
  }
}
