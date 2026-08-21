import type { HRRepositoryExtended } from '../types';

export function createHRRepository(supabase: any): HRRepositoryExtended {
  return {
    async findUser(userId: string) {
      const { data } = await supabase.from('users').select('*').eq('id', userId).single();
      return data;
    },
    async findClass(classId: string) {
      const { data } = await supabase.from('classes').select('*').eq('id', classId).single();
      return data;
    },
    async findAcademicYear(yearId: string) {
      const { data } = await supabase.from('academic_years').select('*').eq('id', yearId).single();
      return data;
    },
    async getSchoolSettings(schoolId: string) {
      const { data } = await supabase.from('school_settings').select('*').eq('school_id', schoolId).single();
      return data;
    },
    async logAuditEntry(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) {
      await supabase.from('audit_logs').insert({
        school_id: schoolId,
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        previous_value: previousValue ? JSON.stringify(previousValue) : null,
        new_value: newValue ? JSON.stringify(newValue) : null,
      });
    },
    async findEmployees(schoolId: string, filters?: any) {
      let query = supabase.from('employees').select('*').eq('school_id', schoolId);
      if (filters?.departmentId) query = query.eq('department_id', filters.departmentId);
      if (filters?.positionId) query = query.eq('position_id', filters.positionId);
      if (filters?.status) query = query.eq('status', filters.status);
      if (filters?.contractType) query = query.eq('contract_type', filters.contractType);
      if (filters?.query) {
        query = query.or(`first_name.ilike.%${filters.query}%,last_name.ilike.%${filters.query}%,employee_code.ilike.%${filters.query}%`);
      }
      if (filters?.sortBy) {
        query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      if (filters?.page && filters?.limit) {
        const offset = (filters.page - 1) * filters.limit;
        query = query.range(offset, offset + filters.limit - 1);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    async findEmployeeById(schoolId: string, employeeId: string) {
      const { data } = await supabase.from('employees').select('*').eq('school_id', schoolId).eq('id', employeeId).single();
      return data;
    },
    async findEmployeeByCode(schoolId: string, code: string) {
      const { data } = await supabase.from('employees').select('*').eq('school_id', schoolId).eq('employee_code', code).single();
      return data;
    },
    async findEmployeeByEmail(schoolId: string, email: string) {
      const { data } = await supabase.from('employees').select('*').eq('school_id', schoolId).eq('email', email).single();
      return data;
    },
    async createEmployee(data: any) {
      const { data: result, error } = await supabase.from('employees').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateEmployee(schoolId: string, employeeId: string, data: any) {
      const { data: result, error } = await supabase.from('employees').update(data).eq('school_id', schoolId).eq('id', employeeId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteEmployee(schoolId: string, employeeId: string) {
      const { error } = await supabase.from('employees').delete().eq('school_id', schoolId).eq('id', employeeId);
      if (error) throw error;
    },
    async countEmployees(schoolId: string, filters?: any) {
      let query = supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (filters?.departmentId) query = query.eq('department_id', filters.departmentId);
      if (filters?.status) query = query.eq('status', filters.status);
      const { count, error } = await query;
      if (error) throw error;
      return count || 0;
    },
    async findDepartments(schoolId: string) {
      const { data, error } = await supabase.from('departments').select('*').eq('school_id', schoolId).order('name');
      if (error) throw error;
      return data || [];
    },
    async findDepartmentById(schoolId: string, departmentId: string) {
      const { data } = await supabase.from('departments').select('*').eq('school_id', schoolId).eq('id', departmentId).single();
      return data;
    },
    async findDepartmentByName(schoolId: string, name: string) {
      const { data } = await supabase.from('departments').select('*').eq('school_id', schoolId).eq('name', name).single();
      return data;
    },
    async createDepartment(data: any) {
      const { data: result, error } = await supabase.from('departments').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateDepartment(schoolId: string, departmentId: string, data: any) {
      const { data: result, error } = await supabase.from('departments').update(data).eq('school_id', schoolId).eq('id', departmentId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteDepartment(schoolId: string, departmentId: string) {
      const { error } = await supabase.from('departments').delete().eq('school_id', schoolId).eq('id', departmentId);
      if (error) throw error;
    },
    async countDepartmentEmployees(schoolId: string, departmentId: string) {
      const { count, error } = await supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('department_id', departmentId);
      if (error) throw error;
      return count || 0;
    },
    async findPositions(schoolId: string, departmentId?: string) {
      let query = supabase.from('positions').select('*').eq('school_id', schoolId);
      if (departmentId) query = query.eq('department_id', departmentId);
      const { data, error } = await query.order('name');
      if (error) throw error;
      return data || [];
    },
    async findPositionById(schoolId: string, positionId: string) {
      const { data } = await supabase.from('positions').select('*').eq('school_id', schoolId).eq('id', positionId).single();
      return data;
    },
    async createPosition(data: any) {
      const { data: result, error } = await supabase.from('positions').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updatePosition(schoolId: string, positionId: string, data: any) {
      const { data: result, error } = await supabase.from('positions').update(data).eq('school_id', schoolId).eq('id', positionId).select().single();
      if (error) throw error;
      return result;
    },
    async deletePosition(schoolId: string, positionId: string) {
      const { error } = await supabase.from('positions').delete().eq('school_id', schoolId).eq('id', positionId);
      if (error) throw error;
    },
    async findContracts(schoolId: string, employeeId?: string) {
      let query = supabase.from('employee_contracts').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findContractById(schoolId: string, contractId: string) {
      const { data } = await supabase.from('employee_contracts').select('*').eq('school_id', schoolId).eq('id', contractId).single();
      return data;
    },
    async findActiveContract(schoolId: string, employeeId: string) {
      const { data } = await supabase.from('employee_contracts').select('*').eq('school_id', schoolId).eq('employee_id', employeeId).eq('status', 'active').single();
      return data;
    },
    async createContract(data: any) {
      const { data: result, error } = await supabase.from('employee_contracts').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateContract(schoolId: string, contractId: string, data: any) {
      const { data: result, error } = await supabase.from('employee_contracts').update(data).eq('school_id', schoolId).eq('id', contractId).select().single();
      if (error) throw error;
      return result;
    },
    async endContract(schoolId: string, contractId: string, endDate: string) {
      const { data: result, error } = await supabase.from('employee_contracts').update({ status: 'expired', end_date: endDate }).eq('school_id', schoolId).eq('id', contractId).select().single();
      if (error) throw error;
      return result;
    },
    async findLeaves(schoolId: string, employeeId?: string) {
      let query = supabase.from('leaves').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findLeaveById(schoolId: string, leaveId: string) {
      const { data } = await supabase.from('leaves').select('*').eq('school_id', schoolId).eq('id', leaveId).single();
      return data;
    },
    async findPendingLeaves(schoolId: string) {
      const { data, error } = await supabase.from('leaves').select('*').eq('school_id', schoolId).eq('status', 'pending').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async createLeave(data: any) {
      const { data: result, error } = await supabase.from('leaves').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateLeave(schoolId: string, leaveId: string, data: any) {
      const { data: result, error } = await supabase.from('leaves').update(data).eq('school_id', schoolId).eq('id', leaveId).select().single();
      if (error) throw error;
      return result;
    },
    async approveLeave(schoolId: string, leaveId: string, approvedBy: string, approved: boolean, rejectionReason?: string) {
      const status = approved ? 'approved' : 'rejected';
      const { data: result, error } = await supabase.from('leaves').update({ status, approved_by: approvedBy, rejection_reason: rejectionReason, approved_at: new Date().toISOString() }).eq('school_id', schoolId).eq('id', leaveId).select().single();
      if (error) throw error;
      return result;
    },
    async findLeaveBalance(schoolId: string, employeeId: string, leaveType: string) {
      const { data } = await supabase.from('leave_balances').select('*').eq('school_id', schoolId).eq('employee_id', employeeId).eq('leave_type', leaveType).single();
      return data;
    },
    async updateLeaveBalance(schoolId: string, employeeId: string, leaveType: string, daysUsed: number) {
      const { data: result, error } = await supabase.from('leave_balances').upsert({ school_id: schoolId, employee_id: employeeId, leave_type: leaveType, days_used: daysUsed }, { onConflict: 'school_id,employee_id,leave_type' }).select().single();
      if (error) throw error;
      return result;
    },
    async findTrainings(schoolId: string) {
      const { data, error } = await supabase.from('trainings').select('*').eq('school_id', schoolId).order('start_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findTrainingById(schoolId: string, trainingId: string) {
      const { data } = await supabase.from('trainings').select('*').eq('school_id', schoolId).eq('id', trainingId).single();
      return data;
    },
    async createTraining(data: any) {
      const { data: result, error } = await supabase.from('trainings').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateTraining(schoolId: string, trainingId: string, data: any) {
      const { data: result, error } = await supabase.from('trainings').update(data).eq('school_id', schoolId).eq('id', trainingId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteTraining(schoolId: string, trainingId: string) {
      const { error } = await supabase.from('trainings').delete().eq('school_id', schoolId).eq('id', trainingId);
      if (error) throw error;
    },
    async findTrainingEnrollments(schoolId: string, trainingId: string) {
      const { data, error } = await supabase.from('training_enrollments').select('*').eq('school_id', schoolId).eq('training_id', trainingId);
      if (error) throw error;
      return data || [];
    },
    async enrollTraining(data: any) {
      const { data: result, error } = await supabase.from('training_enrollments').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async unenrollTraining(schoolId: string, enrollmentId: string) {
      const { error } = await supabase.from('training_enrollments').delete().eq('school_id', schoolId).eq('id', enrollmentId);
      if (error) throw error;
    },
    async findCertifications(schoolId: string, employeeId?: string) {
      let query = supabase.from('certifications').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('expiry_date');
      if (error) throw error;
      return data || [];
    },
    async findCertificationById(schoolId: string, certificationId: string) {
      const { data } = await supabase.from('certifications').select('*').eq('school_id', schoolId).eq('id', certificationId).single();
      return data;
    },
    async createCertification(data: any) {
      const { data: result, error } = await supabase.from('certifications').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateCertification(schoolId: string, certificationId: string, data: any) {
      const { data: result, error } = await supabase.from('certifications').update(data).eq('school_id', schoolId).eq('id', certificationId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteCertification(schoolId: string, certificationId: string) {
      const { error } = await supabase.from('certifications').delete().eq('school_id', schoolId).eq('id', certificationId);
      if (error) throw error;
    },
    async findPerformanceReviews(schoolId: string, employeeId?: string) {
      let query = supabase.from('performance_reviews').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findPerformanceReviewById(schoolId: string, reviewId: string) {
      const { data } = await supabase.from('performance_reviews').select('*').eq('school_id', schoolId).eq('id', reviewId).single();
      return data;
    },
    async createPerformanceReview(data: any) {
      const { data: result, error } = await supabase.from('performance_reviews').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updatePerformanceReview(schoolId: string, reviewId: string, data: any) {
      const { data: result, error } = await supabase.from('performance_reviews').update(data).eq('school_id', schoolId).eq('id', reviewId).select().single();
      if (error) throw error;
      return result;
    },
    async findObjectives(schoolId: string, employeeId?: string) {
      let query = supabase.from('objectives').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findObjectiveById(schoolId: string, objectiveId: string) {
      const { data } = await supabase.from('objectives').select('*').eq('school_id', schoolId).eq('id', objectiveId).single();
      return data;
    },
    async createObjective(data: any) {
      const { data: result, error } = await supabase.from('objectives').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateObjective(schoolId: string, objectiveId: string, data: any) {
      const { data: result, error } = await supabase.from('objectives').update(data).eq('school_id', schoolId).eq('id', objectiveId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteObjective(schoolId: string, objectiveId: string) {
      const { error } = await supabase.from('objectives').delete().eq('school_id', schoolId).eq('id', objectiveId);
      if (error) throw error;
    },
    async findPromotions(schoolId: string, employeeId?: string) {
      let query = supabase.from('promotions').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findPromotionById(schoolId: string, promotionId: string) {
      const { data } = await supabase.from('promotions').select('*').eq('school_id', schoolId).eq('id', promotionId).single();
      return data;
    },
    async createPromotion(data: any) {
      const { data: result, error } = await supabase.from('promotions').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updatePromotion(schoolId: string, promotionId: string, data: any) {
      const { data: result, error } = await supabase.from('promotions').update(data).eq('school_id', schoolId).eq('id', promotionId).select().single();
      if (error) throw error;
      return result;
    },
    async findTransfers(schoolId: string, employeeId?: string) {
      let query = supabase.from('transfers').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findTransferById(schoolId: string, transferId: string) {
      const { data } = await supabase.from('transfers').select('*').eq('school_id', schoolId).eq('id', transferId).single();
      return data;
    },
    async createTransfer(data: any) {
      const { data: result, error } = await supabase.from('transfers').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateTransfer(schoolId: string, transferId: string, data: any) {
      const { data: result, error } = await supabase.from('transfers').update(data).eq('school_id', schoolId).eq('id', transferId).select().single();
      if (error) throw error;
      return result;
    },
    async findTerminations(schoolId: string, employeeId?: string) {
      let query = supabase.from('terminations').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findTerminationById(schoolId: string, terminationId: string) {
      const { data } = await supabase.from('terminations').select('*').eq('school_id', schoolId).eq('id', terminationId).single();
      return data;
    },
    async createTermination(data: any) {
      const { data: result, error } = await supabase.from('terminations').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateTermination(schoolId: string, terminationId: string, data: any) {
      const { data: result, error } = await supabase.from('terminations').update(data).eq('school_id', schoolId).eq('id', terminationId).select().single();
      if (error) throw error;
      return result;
    },
    async findDisciplinaryActions(schoolId: string, employeeId?: string) {
      let query = supabase.from('disciplinary_actions').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findDisciplinaryActionById(schoolId: string, actionId: string) {
      const { data } = await supabase.from('disciplinary_actions').select('*').eq('school_id', schoolId).eq('id', actionId).single();
      return data;
    },
    async createDisciplinaryAction(data: any) {
      const { data: result, error } = await supabase.from('disciplinary_actions').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateDisciplinaryAction(schoolId: string, actionId: string, data: any) {
      const { data: result, error } = await supabase.from('disciplinary_actions').update(data).eq('school_id', schoolId).eq('id', actionId).select().single();
      if (error) throw error;
      return result;
    },
    async findRecruitments(schoolId: string) {
      const { data, error } = await supabase.from('recruitments').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findRecruitmentById(schoolId: string, recruitmentId: string) {
      const { data } = await supabase.from('recruitments').select('*').eq('school_id', schoolId).eq('id', recruitmentId).single();
      return data;
    },
    async createRecruitment(data: any) {
      const { data: result, error } = await supabase.from('recruitments').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateRecruitment(schoolId: string, recruitmentId: string, data: any) {
      const { data: result, error } = await supabase.from('recruitments').update(data).eq('school_id', schoolId).eq('id', recruitmentId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteRecruitment(schoolId: string, recruitmentId: string) {
      const { error } = await supabase.from('recruitments').delete().eq('school_id', schoolId).eq('id', recruitmentId);
      if (error) throw error;
    },
    async findCandidates(schoolId: string, recruitmentId?: string) {
      let query = supabase.from('candidates').select('*').eq('school_id', schoolId);
      if (recruitmentId) query = query.eq('recruitment_id', recruitmentId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findCandidateById(schoolId: string, candidateId: string) {
      const { data } = await supabase.from('candidates').select('*').eq('school_id', schoolId).eq('id', candidateId).single();
      return data;
    },
    async findCandidateByEmail(schoolId: string, email: string) {
      const { data } = await supabase.from('candidates').select('*').eq('school_id', schoolId).eq('email', email).single();
      return data;
    },
    async createCandidate(data: any) {
      const { data: result, error } = await supabase.from('candidates').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateCandidate(schoolId: string, candidateId: string, data: any) {
      const { data: result, error } = await supabase.from('candidates').update(data).eq('school_id', schoolId).eq('id', candidateId).select().single();
      if (error) throw error;
      return result;
    },
    async findInterviews(schoolId: string, candidateId?: string) {
      let query = supabase.from('interviews').select('*').eq('school_id', schoolId);
      if (candidateId) query = query.eq('candidate_id', candidateId);
      const { data, error } = await query.order('scheduled_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findInterviewById(schoolId: string, interviewId: string) {
      const { data } = await supabase.from('interviews').select('*').eq('school_id', schoolId).eq('id', interviewId).single();
      return data;
    },
    async createInterview(data: any) {
      const { data: result, error } = await supabase.from('interviews').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateInterview(schoolId: string, interviewId: string, data: any) {
      const { data: result, error } = await supabase.from('interviews').update(data).eq('school_id', schoolId).eq('id', interviewId).select().single();
      if (error) throw error;
      return result;
    },
    async findJobOffers(schoolId: string, candidateId?: string) {
      let query = supabase.from('job_offers').select('*').eq('school_id', schoolId);
      if (candidateId) query = query.eq('candidate_id', candidateId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findJobOfferById(schoolId: string, offerId: string) {
      const { data } = await supabase.from('job_offers').select('*').eq('school_id', schoolId).eq('id', offerId).single();
      return data;
    },
    async createJobOffer(data: any) {
      const { data: result, error } = await supabase.from('job_offers').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateJobOffer(schoolId: string, offerId: string, data: any) {
      const { data: result, error } = await supabase.from('job_offers').update(data).eq('school_id', schoolId).eq('id', offerId).select().single();
      if (error) throw error;
      return result;
    },
    async findEmployeeDocuments(schoolId: string, employeeId: string) {
      const { data, error } = await supabase.from('employee_documents').select('*').eq('school_id', schoolId).eq('employee_id', employeeId).order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findEmployeeDocumentById(schoolId: string, documentId: string) {
      const { data } = await supabase.from('employee_documents').select('*').eq('school_id', schoolId).eq('id', documentId).single();
      return data;
    },
    async createEmployeeDocument(data: any) {
      const { data: result, error } = await supabase.from('employee_documents').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateEmployeeDocument(schoolId: string, documentId: string, data: any) {
      const { data: result, error } = await supabase.from('employee_documents').update(data).eq('school_id', schoolId).eq('id', documentId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteEmployeeDocument(schoolId: string, documentId: string) {
      const { error } = await supabase.from('employee_documents').delete().eq('school_id', schoolId).eq('id', documentId);
      if (error) throw error;
    },
    async findSchedules(schoolId: string, employeeId?: string) {
      let query = supabase.from('employee_schedules').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      const { data, error } = await query.order('start_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findScheduleById(schoolId: string, scheduleId: string) {
      const { data } = await supabase.from('employee_schedules').select('*').eq('school_id', schoolId).eq('id', scheduleId).single();
      return data;
    },
    async createSchedule(data: any) {
      const { data: result, error } = await supabase.from('employee_schedules').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateSchedule(schoolId: string, scheduleId: string, data: any) {
      const { data: result, error } = await supabase.from('employee_schedules').update(data).eq('school_id', schoolId).eq('id', scheduleId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteSchedule(schoolId: string, scheduleId: string) {
      const { error } = await supabase.from('employee_schedules').delete().eq('school_id', schoolId).eq('id', scheduleId);
      if (error) throw error;
    },
    async findShifts(schoolId: string) {
      const { data, error } = await supabase.from('employee_shifts').select('*').eq('school_id', schoolId).order('name');
      if (error) throw error;
      return data || [];
    },
    async findShiftById(schoolId: string, shiftId: string) {
      const { data } = await supabase.from('employee_shifts').select('*').eq('school_id', schoolId).eq('id', shiftId).single();
      return data;
    },
    async clockIn(schoolId: string, employeeId: string, clockInTime?: string, location?: string) {
      const { data: existing } = await supabase.from('employee_attendance').select('*').eq('school_id', schoolId).eq('employee_id', employeeId).is('clock_out', null).single();
      if (existing) throw new Error('Already clocked in');
      const { data: result, error } = await supabase.from('employee_attendance').insert({ school_id: schoolId, employee_id: employeeId, clock_in: clockInTime || new Date().toISOString(), location }).select().single();
      if (error) throw error;
      return result;
    },
    async clockOut(schoolId: string, employeeId: string, clockOutTime?: string) {
      const { data: existing } = await supabase.from('employee_attendance').select('*').eq('school_id', schoolId).eq('employee_id', employeeId).is('clock_out', null).single();
      if (!existing) throw new Error('Not clocked in');
      const { data: result, error } = await supabase.from('employee_attendance').update({ clock_out: clockOutTime || new Date().toISOString() }).eq('id', existing.id).select().single();
      if (error) throw error;
      return result;
    },
    async findAttendance(schoolId: string, employeeId?: string, dateFrom?: string, dateTo?: string) {
      let query = supabase.from('employee_attendance').select('*').eq('school_id', schoolId);
      if (employeeId) query = query.eq('employee_id', employeeId);
      if (dateFrom) query = query.gte('clock_in', dateFrom);
      if (dateTo) query = query.lte('clock_in', dateTo);
      const { data, error } = await query.order('clock_in', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async findBenefits(schoolId: string) {
      const { data, error } = await supabase.from('benefits').select('*').eq('school_id', schoolId).order('name');
      if (error) throw error;
      return data || [];
    },
    async findBenefitById(schoolId: string, benefitId: string) {
      const { data } = await supabase.from('benefits').select('*').eq('school_id', schoolId).eq('id', benefitId).single();
      return data;
    },
    async createBenefit(data: any) {
      const { data: result, error } = await supabase.from('benefits').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateBenefit(schoolId: string, benefitId: string, data: any) {
      const { data: result, error } = await supabase.from('benefits').update(data).eq('school_id', schoolId).eq('id', benefitId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteBenefit(schoolId: string, benefitId: string) {
      const { error } = await supabase.from('benefits').delete().eq('school_id', schoolId).eq('id', benefitId);
      if (error) throw error;
    },
    async findDeductions(schoolId: string) {
      const { data, error } = await supabase.from('deductions').select('*').eq('school_id', schoolId).order('name');
      if (error) throw error;
      return data || [];
    },
    async findDeductionById(schoolId: string, deductionId: string) {
      const { data } = await supabase.from('deductions').select('*').eq('school_id', schoolId).eq('id', deductionId).single();
      return data;
    },
    async createDeduction(data: any) {
      const { data: result, error } = await supabase.from('deductions').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateDeduction(schoolId: string, deductionId: string, data: any) {
      const { data: result, error } = await supabase.from('deductions').update(data).eq('school_id', schoolId).eq('id', deductionId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteDeduction(schoolId: string, deductionId: string) {
      const { error } = await supabase.from('deductions').delete().eq('school_id', schoolId).eq('id', deductionId);
      if (error) throw error;
    },
    async findAllowances(schoolId: string) {
      const { data, error } = await supabase.from('allowances').select('*').eq('school_id', schoolId).order('name');
      if (error) throw error;
      return data || [];
    },
    async findAllowanceById(schoolId: string, allowanceId: string) {
      const { data } = await supabase.from('allowances').select('*').eq('school_id', schoolId).eq('id', allowanceId).single();
      return data;
    },
    async createAllowance(data: any) {
      const { data: result, error } = await supabase.from('allowances').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateAllowance(schoolId: string, allowanceId: string, data: any) {
      const { data: result, error } = await supabase.from('allowances').update(data).eq('school_id', schoolId).eq('id', allowanceId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteAllowance(schoolId: string, allowanceId: string) {
      const { error } = await supabase.from('allowances').delete().eq('school_id', schoolId).eq('id', allowanceId);
      if (error) throw error;
    },
    async generateEmployeeCode(schoolId: string, departmentCode: string, year?: number) {
      const y = year || new Date().getFullYear();
      const { count } = await supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('employee_code', `like`, `${departmentCode}-${y}-%`);
      const seq = (count || 0) + 1;
      return `${departmentCode}-${y}-${seq.toString().padStart(4, '0')}`;
    },
    async findSalaryScales(schoolId: string) {
      const { data, error } = await supabase.from('salary_scales').select('*').eq('school_id', schoolId).order('name');
      if (error) throw error;
      return data || [];
    },
    async findSalaryScaleById(schoolId: string, scaleId: string) {
      const { data } = await supabase.from('salary_scales').select('*').eq('school_id', schoolId).eq('id', scaleId).single();
      return data;
    },
    async createSalaryScale(data: any) {
      const { data: result, error } = await supabase.from('salary_scales').insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async updateSalaryScale(schoolId: string, scaleId: string, data: any) {
      const { data: result, error } = await supabase.from('salary_scales').update(data).eq('school_id', schoolId).eq('id', scaleId).select().single();
      if (error) throw error;
      return result;
    },
    async deleteSalaryScale(schoolId: string, scaleId: string) {
      const { error } = await supabase.from('salary_scales').delete().eq('school_id', schoolId).eq('id', scaleId);
      if (error) throw error;
    },
    async getEmployeeStatistics(schoolId: string) {
      const total = await supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
      const active = await supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'active');
      const onLeave = await supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'on_leave');
      const suspended = await supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'suspended');
      const terminated = await supabase.from('employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'terminated');
      return {
        totalEmployees: total.count || 0,
        activeEmployees: active.count || 0,
        onLeaveEmployees: onLeave.count || 0,
        suspendedEmployees: suspended.count || 0,
        terminatedEmployees: terminated.count || 0,
      };
    },
    async getDashboardData(schoolId: string) {
      const stats = await this.getEmployeeStatistics(schoolId);
      const pendingLeaves = await this.findPendingLeaves(schoolId);
      return { statistics: stats, pendingLeaves: pendingLeaves.length };
    },
  };
}
