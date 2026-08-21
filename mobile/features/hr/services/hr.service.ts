import { logger } from '@educi/logger';
import { HrMobileRepository } from '../repositories/hr.repository';

export class HrMobileService {
  private readonly repository: HrMobileRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: HrMobileRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async findEmployee(id: string) { return this.repository.findEmployee(id); }
  async findAllEmployees(filters?: Record<string, unknown>) { return this.repository.findAllEmployees(this.schoolId, filters); }
  async createEmployee(data: Record<string, unknown>) { return this.repository.createEmployee(data, this.schoolId); }
  async updateEmployee(id: string, data: Record<string, unknown>) { return this.repository.updateEmployee(id, data); }
  async deleteEmployee(id: string) { return this.repository.deleteEmployee(id); }

  async findDepartment(id: string) { return this.repository.findDepartment(id); }
  async findAllDepartments() { return this.repository.findAllDepartments(this.schoolId); }
  async createDepartment(data: Record<string, unknown>) { return this.repository.createDepartment(data, this.schoolId); }
  async updateDepartment(id: string, data: Record<string, unknown>) { return this.repository.updateDepartment(id, data); }

  async findLeave(id: string) { return this.repository.findLeave(id); }
  async findAllLeaves(filters?: Record<string, unknown>) { return this.repository.findAllLeaves(this.schoolId, filters); }
  async createLeave(data: Record<string, unknown>) { return this.repository.createLeave(data, this.schoolId); }
  async updateLeaveStatus(id: string, status: string, approvedBy: string) { return this.repository.updateLeaveStatus(id, status, approvedBy); }

  async findAttendance(id: string) { return this.repository.findAttendance(id); }
  async findAllAttendance(filters?: Record<string, unknown>) { return this.repository.findAllAttendance(this.schoolId, filters); }
  async clockIn(employeeId: string, method: string, latitude?: number, longitude?: number) { return this.repository.clockIn(employeeId, method, latitude, longitude); }
  async clockOut(employeeId: string) { return this.repository.clockOut(employeeId); }
  async getTodayAttendance(employeeId: string) { return this.repository.getTodayAttendance(employeeId); }

  async findTraining(id: string) { return this.repository.findTraining(id); }
  async findAllTrainings(filters?: Record<string, unknown>) { return this.repository.findAllTrainings(this.schoolId, filters); }
  async createTraining(data: Record<string, unknown>) { return this.repository.createTraining(data, this.schoolId); }
  async enrollTraining(trainingId: string, employeeId: string) { return this.repository.enrollTraining(trainingId, employeeId); }

  async findPerformanceReview(id: string) { return this.repository.findPerformanceReview(id); }
  async findAllPerformanceReviews(filters?: Record<string, unknown>) { return this.repository.findAllPerformanceReviews(this.schoolId, filters); }
  async createPerformanceReview(data: Record<string, unknown>) { return this.repository.createPerformanceReview(data, this.schoolId); }
  async updatePerformanceReview(id: string, data: Record<string, unknown>) { return this.repository.updatePerformanceReview(id, data); }

  async getDashboard() { return this.repository.getDashboard(this.schoolId); }
  async searchEmployees(query: string) { return this.repository.searchEmployees(this.schoolId, query); }
}