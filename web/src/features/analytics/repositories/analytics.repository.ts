import type {
  ExecutiveDashboard,
  AcademicAnalytics,
  FinancialAnalytics,
  HrAnalytics,
  StudentAnalytics,
  TeacherAnalytics,
  ParentAnalytics,
  PredictiveAIResult,
  Prediction,
  ReportConfig,
  CustomDashboard,
  DashboardWidget,
  ChartData,
  GeoMapData,
  HeatmapData,
  FunnelData,
  ScheduledReport,
  DataWarehouseFact,
  DataWarehouseDimension,
  ETLJob,
  AnalyticsPeriodType,
  ChartTypeEnum,
  ExportFormatType,
  DataSourceTypeEnum,
  PredictiveModelType,
  ReportScheduleType,
  RevenueKPIs,
  FinancialKPIs,
  AcademicKPIs,
  HrKPIs,
  StudentKPIs,
  TeacherKPIs,
  ParentKPIs,
  SystemKPIs,
  SuccessRateData,
  GradeEvolutionData,
  AttendanceAnalyticsData,
  PerformanceByEntity,
  SubjectDifficultyData,
  PredictiveResult,
  RevenueAnalytics,
  ExpenseAnalytics,
  ProfitAnalytics,
  CashFlowAnalytics,
  PaymentAnalytics,
  FinancialForecast,
  ForecastPoint,
  BudgetVsActualData,
  WorkforceAnalytics,
  TurnoverAnalytics,
  HrAttendanceAnalytics,
  TrainingAnalytics,
  HrPerformanceAnalytics,
  CompensationAnalytics,
  EnrollmentAnalytics,
  StudentAcademicAnalytics,
  DisciplineAnalytics,
  HealthAnalytics,
  StudentPaymentAnalytics,
  EngagementAnalytics,
  StudentRiskAnalytics,
  DropoutPrediction,
  TeacherPerformanceAnalytics,
  TeacherAttendanceAnalytics,
  TeacherWorkloadAnalytics,
  TeacherSatisfactionAnalytics,
  TeacherKPIsData,
  ParentPaymentAnalytics,
  ParentEngagementAnalytics,
  ParentCommunicationAnalytics,
  ParentSatisfactionAnalytics,
  PredictionFactor,
  ReportColumn,
  ReportChart,
} from '@educi/types';

export function createAnalyticsRepository(supabase: any) {
  return {
    // ─── Executive Dashboard ──────────────────────────────────────────────────
    async getExecutiveDashboard(dateFrom?: string, dateTo?: string): Promise<ExecutiveDashboard> {
      const revenue = await this.getRevenueKPIs(dateFrom, dateTo);
      const financial = await this.getFinancialKPIs(dateFrom, dateTo);
      const academic = await this.getAcademicKPIs(dateFrom, dateTo);
      const hr = await this.getHrKPIs(dateFrom, dateTo);
      const student = await this.getStudentKPIs(dateFrom, dateTo);
      const teacher = await this.getTeacherKPIs(dateFrom, dateTo);
      const parent = await this.getParentKPIs(dateFrom, dateTo);
      const system = await this.getSystemKPIs(dateFrom, dateTo);
      return { revenue, financial, academic, hr, student, teacher, parent, system, generatedAt: new Date().toISOString() };
    },
    async getRevenueKPIs(dateFrom?: string, dateTo?: string): Promise<RevenueKPIs> {
      let query = supabase.from('finance_payments').select('amount, payment_date, created_at');
      if (dateFrom) query = query.gte('payment_date', dateFrom);
      if (dateTo) query = query.lte('payment_date', dateTo);
      const { data } = await query;
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const totalRevenue = (data || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
      const monthlyRevenue = (data || []).filter((p: any) => p.payment_date >= monthStart).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
      const dailyRevenue = (data || []).filter((p: any) => p.payment_date >= dayStart).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
      return { totalRevenue, monthlyRevenue, dailyRevenue, mrr: monthlyRevenue, arr: monthlyRevenue * 12, revenueGrowth: 0, revenuePerSchool: 0, revenuePerStudent: 0, forecastNextMonth: monthlyRevenue * 1.05, forecastNextQuarter: monthlyRevenue * 3 * 1.05 };
    },
    async getFinancialKPIs(dateFrom?: string, dateTo?: string): Promise<FinancialKPIs> {
      let paymentQuery = supabase.from('finance_payments').select('amount');
      if (dateFrom) paymentQuery = paymentQuery.gte('payment_date', dateFrom);
      if (dateTo) paymentQuery = paymentQuery.lte('payment_date', dateTo);
      const { data: payments } = await paymentQuery;
      const totalIncome = (payments || []).reduce((s: number, p: any) => s + (p.amount || 0), 0);
      return { totalExpenses: 0, monthlyExpenses: 0, profit: totalIncome, profitMargin: 100, cashFlow: totalIncome, outstandingPayments: 0, overduePayments: 0, budgetUtilization: 0, costPerStudent: 0, costPerTeacher: 0 };
    },
    async getAcademicKPIs(dateFrom?: string, dateTo?: string): Promise<AcademicKPIs> {
      const { count: schoolCount } = await supabase.from('schools').select('id', { count: 'exact', head: true });
      const { count: studentCount } = await supabase.from('students').select('id', { count: 'exact', head: true });
      const { count: teacherCount } = await supabase.from('teachers').select('id', { count: 'exact', head: true });
      const { count: activeSchools } = await supabase.from('schools').select('id', { count: 'exact', head: true }).eq('status', 'active');
      return { totalSchools: schoolCount || 0, activeSchools: activeSchools || 0, totalStudents: studentCount || 0, totalTeachers: teacherCount || 0, totalUsers: 0, totalParents: 0, avgSuccessRate: 0, avgAttendanceRate: 0, avgClassSize: 0, topPerformingSchools: [], bottomPerformingSchools: [] };
    },
    async getHrKPIs(dateFrom?: string, dateTo?: string): Promise<HrKPIs> {
      const { count: totalEmployees } = await supabase.from('hr_employees').select('id', { count: 'exact', head: true });
      const { count: activeEmployees } = await supabase.from('hr_employees').select('id', { count: 'exact', head: true }).eq('status', 'active');
      return { totalEmployees: totalEmployees || 0, activeEmployees: activeEmployees || 0, turnoverRate: 0, avgTenure: 0, trainingCompletionRate: 0, avgPerformanceScore: 0, openPositions: 0, pendingLeaves: 0, absenteeismRate: 0, employeeSatisfaction: 0 };
    },
    async getStudentKPIs(dateFrom?: string, dateTo?: string): Promise<StudentKPIs> {
      const { count: totalEnrollments } = await supabase.from('student_enrollments').select('id', { count: 'exact', head: true });
      const { count: newEnrollments } = await supabase.from('student_enrollments').select('id', { count: 'exact', head: true }).gte('enrollment_date', dateFrom || new Date().toISOString().slice(0, 7) + '-01');
      return { totalEnrollments: totalEnrollments || 0, newEnrollments: newEnrollments || 0, dropoutRate: 0, retentionRate: 100, avgGPA: 0, atRiskStudents: 0, chronicAbsentees: 0, averageAge: 0, genderDistribution: {}, topStudents: [] };
    },
    async getTeacherKPIs(dateFrom?: string, dateTo?: string): Promise<TeacherKPIs> {
      const { count: totalTeachers } = await supabase.from('teachers').select('id', { count: 'exact', head: true });
      const { count: activeTeachers } = await supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('status', 'active');
      return { totalTeachers: totalTeachers || 0, activeTeachers: activeTeachers || 0, avgTeacherStudentRatio: 0, avgPerformanceRating: 0, avgClassesPerTeacher: 0, avgHoursPerWeek: 0, certificationRate: 0, topPerformers: [] };
    },
    async getParentKPIs(dateFrom?: string, dateTo?: string): Promise<ParentKPIs> {
      const { count: totalParents } = await supabase.from('parents').select('id', { count: 'exact', head: true });
      return { totalParents: totalParents || 0, activeParents: 0, avgPaymentRate: 0, avgEngagementScore: 0, avgAppUsageMinutes: 0, communicationRate: 0, satisfactionScore: 0 };
    },
    async getSystemKPIs(dateFrom?: string, dateTo?: string): Promise<SystemKPIs> {
      return { apiCalls: 0, storageUsedMb: 0, storageQuotaMb: 102400, uptimePercent: 99.9, avgResponseTime: 0, errorRate: 0, activeSessions: 0, peakConcurrentUsers: 0 };
    },

    // ─── Academic Analytics ──────────────────────────────────────────────────
    async getAcademicAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<AcademicAnalytics> {
      const successRate = await this.getSuccessRate(schoolId, period, dateFrom, dateTo);
      const gradeEvolution = await this.getGradeEvolution(schoolId, period, dateFrom, dateTo);
      const attendanceAnalytics = await this.getAttendanceAnalyticsData(schoolId, period, dateFrom, dateTo);
      const performanceByClass = await this.getPerformanceByClass(schoolId, dateFrom, dateTo);
      const performanceByLevel = await this.getPerformanceByLevel(schoolId, dateFrom, dateTo);
      const performanceBySchool = await this.getPerformanceBySchool(dateFrom, dateTo);
      const performanceByTeacher = await this.getPerformanceByTeacher(schoolId, dateFrom, dateTo);
      const performanceByYear = await this.getPerformanceByYear(schoolId);
      const subjectDifficulty = await this.getSubjectDifficulty(schoolId, dateFrom, dateTo);
      const predictiveResults = await this.getPredictiveResults(schoolId, 'academic_risk');
      return { successRate, gradeEvolution, attendanceAnalytics, performanceByClass, performanceByLevel, performanceBySchool, performanceByTeacher, performanceByYear, subjectDifficulty, predictiveResults };
    },
    async getSuccessRate(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<SuccessRateData> {
      let query = supabase.from('exam_results').select('score, max_score, exam_id, class_id, student_id').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('created_at', dateFrom);
      if (dateTo) query = query.lte('created_at', dateTo);
      const { data } = await query;
      const results = data || [];
      const overall = results.length > 0 ? results.reduce((s: number, r: any) => s + ((r.score / r.max_score) * 100), 0) / results.length : 0;
      return { overall, byClass: [], bySubject: [], byLevel: [], byYear: [], trend: [] };
    },
    async getGradeEvolution(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<GradeEvolutionData> {
      return { overall: [], bySubject: [], byClass: [] };
    },
    async getAttendanceAnalyticsData(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<AttendanceAnalyticsData> {
      let query = supabase.from('attendance_records').select('status, student_id, class_id').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('date', dateFrom);
      if (dateTo) query = query.lte('date', dateTo);
      const { data } = await query;
      const records = data || [];
      const present = records.filter((r: any) => r.status === 'present').length;
      const overallRate = records.length > 0 ? (present / records.length) * 100 : 0;
      return { overallRate, byClass: [], byStudent: [], byMonth: [], chronicAbsentees: 0, lateArrivals: 0 };
    },
    async getPerformanceByClass(schoolId: string, dateFrom?: string, dateTo?: string): Promise<PerformanceByEntity[]> {
      let query = supabase.from('exam_results').select('class_id, score, max_score, classes(name)').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('created_at', dateFrom);
      if (dateTo) query = query.lte('created_at', dateTo);
      const { data } = await query;
      const classMap = new Map<string, { name: string; scores: number[] }>();
      for (const r of data || []) {
        const key = r.class_id;
        if (!classMap.has(key)) classMap.set(key, { name: r.classes?.name || key, scores: [] });
        classMap.get(key)!.scores.push((r.score / r.max_score) * 100);
      }
      return Array.from(classMap.entries()).map(([id, { name, scores }], i) => ({
        id, name, score: scores.reduce((a, b) => a + b, 0) / scores.length, rank: 0, trend: 'stable' as const, change: 0,
      })).sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }));
    },
    async getPerformanceByLevel(schoolId: string, dateFrom?: string, dateTo?: string): Promise<PerformanceByEntity[]> { return []; },
    async getPerformanceBySchool(dateFrom?: string, dateTo?: string): Promise<PerformanceByEntity[]> { return []; },
    async getPerformanceByTeacher(schoolId: string, dateFrom?: string, dateTo?: string): Promise<PerformanceByEntity[]> { return []; },
    async getPerformanceByYear(schoolId: string): Promise<PerformanceByEntity[]> { return []; },
    async getSubjectDifficulty(schoolId: string, dateFrom?: string, dateTo?: string): Promise<SubjectDifficultyData[]> { return []; },
    async getPredictiveResults(schoolId: string, model: PredictiveModelType): Promise<PredictiveResult[]> { return []; },

    // ─── Financial Analytics ─────────────────────────────────────────────────
    async getFinancialAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<FinancialAnalytics> {
      const revenue = await this.getRevenueAnalytics(schoolId, period, dateFrom, dateTo);
      const expenses = await this.getExpenseAnalytics(schoolId, period, dateFrom, dateTo);
      const profit = await this.getProfitAnalytics(schoolId, period, dateFrom, dateTo);
      const cashFlow = await this.getCashFlowAnalytics(schoolId, dateFrom, dateTo);
      const payments = await this.getPaymentAnalytics(schoolId, dateFrom, dateTo);
      const forecast = await this.getFinancialForecast(schoolId);
      const budgetVsActual = await this.getBudgetVsActual(schoolId, dateFrom, dateTo);
      return { revenue, expenses, profit, cashFlow, payments, forecast, budgetVsActual };
    },
    async getRevenueAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<RevenueAnalytics> {
      let query = supabase.from('finance_payments').select('amount, payment_date, category').eq('school_id', schoolId).eq('status', 'completed');
      if (dateFrom) query = query.gte('payment_date', dateFrom);
      if (dateTo) query = query.lte('payment_date', dateTo);
      const { data } = await query;
      const payments = data || [];
      const total = payments.reduce((s: number, p: any) => s + (p.amount || 0), 0);
      return { total, daily: [], monthly: [], yearly: [], byCategory: [], bySchool: [], growth: { daily: 0, monthly: 0, yearly: 0 } };
    },
    async getExpenseAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<ExpenseAnalytics> {
      let query = supabase.from('finance_expenses').select('amount, category, expense_date').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('expense_date', dateFrom);
      if (dateTo) query = query.lte('expense_date', dateTo);
      const { data } = await query;
      const expenses = data || [];
      const total = expenses.reduce((s: number, e: any) => s + (e.amount || 0), 0);
      return { total, monthly: [], byCategory: [], trend: [] };
    },
    async getProfitAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<ProfitAnalytics> {
      const revenue = await this.getRevenueAnalytics(schoolId, period, dateFrom, dateTo);
      const expenses = await this.getExpenseAnalytics(schoolId, period, dateFrom, dateTo);
      const total = revenue.total - expenses.total;
      const margin = revenue.total > 0 ? (total / revenue.total) * 100 : 0;
      return { total, margin, monthly: [], trend: [] };
    },
    async getCashFlowAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<CashFlowAnalytics> {
      const revenue = await this.getRevenueAnalytics(schoolId, 'monthly', dateFrom, dateTo);
      const expenses = await this.getExpenseAnalytics(schoolId, 'monthly', dateFrom, dateTo);
      return { current: revenue.total - expenses.total, inflows: revenue.total, outflows: expenses.total, netFlow: revenue.total - expenses.total, projected: [], runway: 0 };
    },
    async getPaymentAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<PaymentAnalytics> {
      let query = supabase.from('finance_payments').select('amount, status, payment_method, payment_date').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('payment_date', dateFrom);
      if (dateTo) query = query.lte('payment_date', dateTo);
      const { data } = await query;
      const payments = data || [];
      const total = payments.reduce((s: number, p: any) => s + (p.amount || 0), 0);
      const collected = payments.filter((p: any) => p.status === 'completed').reduce((s: number, p: any) => s + (p.amount || 0), 0);
      const pending = payments.filter((p: any) => p.status === 'pending').reduce((s: number, p: any) => s + (p.amount || 0), 0);
      const overdue = payments.filter((p: any) => p.status === 'overdue').reduce((s: number, p: any) => s + (p.amount || 0), 0);
      return { total, collected, pending, overdue, collectionRate: total > 0 ? (collected / total) * 100 : 0, avgPaymentDelay: 0, byMethod: [] };
    },
    async getFinancialForecast(schoolId: string): Promise<FinancialForecast> {
      return { nextMonth: { predicted: 0, lower: 0, upper: 0, period: '', }, nextQuarter: { predicted: 0, lower: 0, upper: 0, period: '', }, nextYear: { predicted: 0, lower: 0, upper: 0, period: '', }, confidence: 0, model: 'linear_regression' };
    },
    async getBudgetVsActual(schoolId: string, dateFrom?: string, dateTo?: string): Promise<BudgetVsActualData> {
      const expenses = await this.getExpenseAnalytics(schoolId, 'monthly', dateFrom, dateTo);
      return { budget: 0, actual: expenses.total, variance: -expenses.total, variancePercent: 0, byCategory: [] };
    },

    // ─── HR Analytics ────────────────────────────────────────────────────────
    async getHrAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<HrAnalytics> {
      const workforce = await this.getWorkforceAnalytics(schoolId);
      const turnover = await this.getTurnoverAnalytics(schoolId, period, dateFrom, dateTo);
      const attendance = await this.getHrAttendanceAnalytics(schoolId, dateFrom, dateTo);
      const training = await this.getTrainingAnalytics(schoolId, dateFrom, dateTo);
      const performance = await this.getHrPerformanceAnalytics(schoolId, dateFrom, dateTo);
      const compensation = await this.getCompensationAnalytics(schoolId, dateFrom, dateTo);
      return { workforce, turnover, attendance, training, performance, compensation };
    },
    async getWorkforceAnalytics(schoolId: string): Promise<WorkforceAnalytics> {
      const { count: total } = await supabase.from('hr_employees').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
      return { total: total || 0, byDepartment: [], byContractType: [], byGender: [], avgAge: 0, avgTenure: 0 };
    },
    async getTurnoverAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<TurnoverAnalytics> {
      return { rate: 0, monthly: [], byDepartment: [], reasons: [], forecast: { predicted: 0, lower: 0, upper: 0, period: '' } };
    },
    async getHrAttendanceAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<HrAttendanceAnalytics> {
      return { avgRate: 0, byEmployee: [], byMonth: [], absenteeism: 0, punctuality: 0 };
    },
    async getTrainingAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<TrainingAnalytics> {
      return { totalPrograms: 0, completionRate: 0, avgScore: 0, byType: [], topPrograms: [] };
    },
    async getHrPerformanceAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<HrPerformanceAnalytics> {
      return { avgScore: 0, distribution: [], byDepartment: [], improvement: 0 };
    },
    async getCompensationAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<CompensationAnalytics> {
      return { avgSalary: 0, medianSalary: 0, byDepartment: [], salaryRange: { min: 0, max: 0 }, totalPayroll: 0 };
    },

    // ─── Student Analytics ──────────────────────────────────────────────────
    async getStudentAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<StudentAnalytics> {
      const enrollment = await this.getEnrollmentAnalytics(schoolId, period, dateFrom, dateTo);
      const academic = await this.getStudentAcademicAnalytics(schoolId, dateFrom, dateTo);
      const discipline = await this.getDisciplineAnalytics(schoolId, dateFrom, dateTo);
      const health = await this.getHealthAnalytics(schoolId, dateFrom, dateTo);
      const payments = await this.getStudentPaymentAnalytics(schoolId, dateFrom, dateTo);
      const engagement = await this.getEngagementAnalytics(schoolId, dateFrom, dateTo);
      const risk = await this.getStudentRiskAnalytics(schoolId, dateFrom, dateTo);
      const dropout = await this.getDropoutPrediction(schoolId);
      return { enrollment, academic, discipline, health, payments, engagement, risk, dropout };
    },
    async getEnrollmentAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<EnrollmentAnalytics> {
      let query = supabase.from('student_enrollments').select('id, enrollment_date, status').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('enrollment_date', dateFrom);
      if (dateTo) query = query.lte('enrollment_date', dateTo);
      const { data } = await query;
      const enrollments = data || [];
      const total = enrollments.length;
      const active = enrollments.filter((e: any) => e.status === 'active').length;
      return { total, new: total, returning: 0, transferred: 0, dropped: total - active, retentionRate: total > 0 ? (active / total) * 100 : 0, byClass: [], byMonth: [], trend: [] };
    },
    async getStudentAcademicAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<StudentAcademicAnalytics> {
      return { avgGPA: 0, avgAttendance: 0, passRate: 0, honorRoll: 0, academicProbation: 0, byClass: [], improvement: 0 };
    },
    async getDisciplineAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DisciplineAnalytics> {
      return { totalIncidents: 0, resolvedIncidents: 0, byType: [], byMonth: [], topStudents: [] };
    },
    async getHealthAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<HealthAnalytics> {
      return { totalRecords: 0, healthIssues: 0, vaccinationRate: 0, bmiDistribution: [] };
    },
    async getStudentPaymentAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<StudentPaymentAnalytics> {
      let query = supabase.from('finance_payments').select('amount, status, student_id').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('created_at', dateFrom);
      if (dateTo) query = query.lte('created_at', dateTo);
      const { data } = await query;
      const payments = data || [];
      const totalDue = payments.reduce((s: number, p: any) => s + (p.amount || 0), 0);
      const totalPaid = payments.filter((p: any) => p.status === 'completed').reduce((s: number, p: any) => s + (p.amount || 0), 0);
      return { totalDue, totalPaid, outstanding: totalDue - totalPaid, overdue: 0, collectionRate: totalDue > 0 ? (totalPaid / totalDue) * 100 : 0, avgPaymentDelay: 0, byClass: [] };
    },
    async getEngagementAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<EngagementAnalytics> {
      return { avgLoginFrequency: 0, avgSessionDuration: 0, activeUsers: 0, inactiveUsers: 0, appUsage: 0, featureUsage: [] };
    },
    async getStudentRiskAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<StudentRiskAnalytics> {
      return { atRiskCount: 0, riskDistribution: [], byFactor: [], interventions: 0, improvementRate: 0 };
    },
    async getDropoutPrediction(schoolId: string): Promise<DropoutPrediction> {
      return { predictedDropouts: 0, confidence: 0, factors: [], recommendations: [], atRiskStudents: [] };
    },

    // ─── Teacher Analytics ───────────────────────────────────────────────────
    async getTeacherAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<TeacherAnalytics> {
      const performance = await this.getTeacherPerformanceAnalytics(schoolId, dateFrom, dateTo);
      const attendance = await this.getTeacherAttendanceAnalytics(schoolId, dateFrom, dateTo);
      const workload = await this.getTeacherWorkloadAnalytics(schoolId, dateFrom, dateTo);
      const satisfaction = await this.getTeacherSatisfactionAnalytics(schoolId, dateFrom, dateTo);
      const kpis = await this.getTeacherKPIsData(schoolId, dateFrom, dateTo);
      return { performance, attendance, workload, satisfaction, kpis };
    },
    async getTeacherPerformanceAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<TeacherPerformanceAnalytics> {
      return { avgRating: 0, distribution: [], topPerformers: [], improvement: 0, bySubject: [] };
    },
    async getTeacherAttendanceAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<TeacherAttendanceAnalytics> {
      return { avgRate: 0, byTeacher: [], byMonth: [] };
    },
    async getTeacherWorkloadAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<TeacherWorkloadAnalytics> {
      return { avgClassesPerTeacher: 0, avgHoursPerWeek: 0, avgStudentsPerTeacher: 0, overloaded: 0, byDepartment: [] };
    },
    async getTeacherSatisfactionAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<TeacherSatisfactionAnalytics> {
      return { avgScore: 0, distribution: [], byCategory: [], trend: [] };
    },
    async getTeacherKPIsData(schoolId: string, dateFrom?: string, dateTo?: string): Promise<TeacherKPIsData> {
      return { avgPerformance: 0, avgAttendance: 0, avgStudentSatisfaction: 0, avgClassPerformance: 0, certificationRate: 0, trainingCompletion: 0 };
    },

    // ─── Parent Analytics ───────────────────────────────────────────────────
    async getParentAnalytics(schoolId: string, period: AnalyticsPeriodType, dateFrom?: string, dateTo?: string): Promise<ParentAnalytics> {
      const payments = await this.getParentPaymentAnalytics(schoolId, dateFrom, dateTo);
      const engagement = await this.getParentEngagementAnalytics(schoolId, dateFrom, dateTo);
      const communication = await this.getParentCommunicationAnalytics(schoolId, dateFrom, dateTo);
      const satisfaction = await this.getParentSatisfactionAnalytics(schoolId, dateFrom, dateTo);
      return { payments, engagement, communication, satisfaction };
    },
    async getParentPaymentAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<ParentPaymentAnalytics> {
      return { totalPaid: 0, avgPaymentTime: 0, onTimeRate: 0, byParent: [] };
    },
    async getParentEngagementAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<ParentEngagementAnalytics> {
      return { appUsage: 0, loginFrequency: 0, featureUsage: [], activeRate: 0 };
    },
    async getParentCommunicationAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<ParentCommunicationAnalytics> {
      return { messagesSent: 0, messagesRead: 0, readRate: 0, avgResponseTime: 0, byChannel: [] };
    },
    async getParentSatisfactionAnalytics(schoolId: string, dateFrom?: string, dateTo?: string): Promise<ParentSatisfactionAnalytics> {
      return { avgScore: 0, nps: 0, distribution: [], feedback: [] };
    },

    // ─── Predictive AI ──────────────────────────────────────────────────────
    async runPredictiveModel(model: PredictiveModelType, schoolId: string, params?: Record<string, unknown>): Promise<PredictiveAIResult> {
      const predictions = await this.getPredictions(model, schoolId);
      return { model, predictions, accuracy: 0, confidence: 0, generatedAt: new Date().toISOString(), factors: [], recommendations: [] };
    },
    async getPredictions(model: PredictiveModelType, schoolId: string): Promise<Prediction[]> { return []; },

    // ─── Reports ─────────────────────────────────────────────────────────────
    async createReport(config: Partial<ReportConfig>): Promise<ReportConfig> {
      const { data, error } = await supabase.from('analytics_reports').insert(config).select().single();
      if (error) throw error;
      return data;
    },
    async updateReport(reportId: string, config: Partial<ReportConfig>): Promise<ReportConfig> {
      const { data, error } = await supabase.from('analytics_reports').update(config).eq('id', reportId).select().single();
      if (error) throw error;
      return data;
    },
    async deleteReport(reportId: string): Promise<void> {
      const { error } = await supabase.from('analytics_reports').delete().eq('id', reportId);
      if (error) throw error;
    },
    async getReport(reportId: string): Promise<ReportConfig | null> {
      const { data } = await supabase.from('analytics_reports').select('*').eq('id', reportId).single();
      return data || null;
    },
    async listReports(filters?: Record<string, unknown>): Promise<ReportConfig[]> {
      let query = supabase.from('analytics_reports').select('*');
      if (filters?.createdBy) query = query.eq('created_by', filters.createdBy);
      if (filters?.dataSource) query = query.eq('data_source', filters.dataSource);
      query = query.order('created_at', { ascending: false });
      const { data } = await query;
      return data || [];
    },
    async executeReport(reportId: string, format: ExportFormatType): Promise<Record<string, unknown>> {
      const report = await this.getReport(reportId);
      if (!report) throw new Error('Report not found');
      return { reportId, format, generatedAt: new Date().toISOString(), data: [] };
    },

    // ─── Dashboards ─────────────────────────────────────────────────────────
    async createDashboard(config: Partial<CustomDashboard>): Promise<CustomDashboard> {
      const { data, error } = await supabase.from('analytics_dashboards').insert(config).select().single();
      if (error) throw error;
      return data;
    },
    async updateDashboard(dashboardId: string, config: Partial<CustomDashboard>): Promise<CustomDashboard> {
      const { data, error } = await supabase.from('analytics_dashboards').update(config).eq('id', dashboardId).select().single();
      if (error) throw error;
      return data;
    },
    async deleteDashboard(dashboardId: string): Promise<void> {
      const { error } = await supabase.from('analytics_dashboards').delete().eq('id', dashboardId);
      if (error) throw error;
    },
    async getDashboard(dashboardId: string): Promise<CustomDashboard | null> {
      const { data } = await supabase.from('analytics_dashboards').select('*').eq('id', dashboardId).single();
      return data || null;
    },
    async listDashboards(userId: string): Promise<CustomDashboard[]> {
      const { data } = await supabase.from('analytics_dashboards').select('*').or(`created_by.eq.${userId},shared_with.cs.{${userId}}`).order('created_at', { ascending: false });
      return data || [];
    },
    async shareDashboard(dashboardId: string, userIds: string[]): Promise<CustomDashboard> {
      const { data: existing } = await supabase.from('analytics_dashboards').select('shared_with').eq('id', dashboardId).single();
      const currentShared = existing?.shared_with || [];
      const updated = [...new Set([...currentShared, ...userIds])];
      const { data, error } = await supabase.from('analytics_dashboards').update({ shared_with: updated, is_shared: true }).eq('id', dashboardId).select().single();
      if (error) throw error;
      return data;
    },

    // ─── Widgets ────────────────────────────────────────────────────────────
    async addWidget(dashboardId: string, widget: Partial<DashboardWidget>): Promise<DashboardWidget> {
      const { data: dashboard } = await supabase.from('analytics_dashboards').select('widgets').eq('id', dashboardId).single();
      const widgets = dashboard?.widgets || [];
      const newWidget = { id: crypto.randomUUID(), ...widget, createdAt: new Date().toISOString() };
      widgets.push(newWidget);
      const { error } = await supabase.from('analytics_dashboards').update({ widgets }).eq('id', dashboardId);
      if (error) throw error;
      return newWidget as DashboardWidget;
    },
    async updateWidget(dashboardId: string, widgetId: string, widget: Partial<DashboardWidget>): Promise<DashboardWidget> {
      const { data: dashboard } = await supabase.from('analytics_dashboards').select('widgets').eq('id', dashboardId).single();
      const widgets = (dashboard?.widgets || []).map((w: any) => w.id === widgetId ? { ...w, ...widget } : w);
      const { error } = await supabase.from('analytics_dashboards').update({ widgets }).eq('id', dashboardId);
      if (error) throw error;
      return widgets.find((w: any) => w.id === widgetId);
    },
    async removeWidget(dashboardId: string, widgetId: string): Promise<void> {
      const { data: dashboard } = await supabase.from('analytics_dashboards').select('widgets').eq('id', dashboardId).single();
      const widgets = (dashboard?.widgets || []).filter((w: any) => w.id !== widgetId);
      const { error } = await supabase.from('analytics_dashboards').update({ widgets }).eq('id', dashboardId);
      if (error) throw error;
    },

    // ─── Charts ─────────────────────────────────────────────────────────────
    async getChartData(dataSource: DataSourceTypeEnum, chartType: ChartTypeEnum, params?: Record<string, unknown>): Promise<ChartData> {
      return { labels: [], datasets: [], metadata: {} };
    },
    async getGeoMapData(params?: Record<string, unknown>): Promise<GeoMapData> {
      return { regions: [], metadata: {} };
    },
    async getHeatmapData(params?: Record<string, unknown>): Promise<HeatmapData> {
      return { rows: [], columns: [], values: [], min: 0, max: 0 };
    },
    async getFunnelData(params?: Record<string, unknown>): Promise<FunnelData> {
      return { stages: [] };
    },

    // ─── Export/Import ──────────────────────────────────────────────────────
    async exportData(format: ExportFormatType, dataSource: DataSourceTypeEnum, params?: Record<string, unknown>): Promise<Record<string, unknown>> {
      return { format, dataSource, exportedAt: new Date().toISOString(), data: [] };
    },
    async importData(format: ExportFormatType, dataSource: DataSourceTypeEnum, data: Record<string, unknown>): Promise<{ imported: number; errors: number }> {
      return { imported: 0, errors: 0 };
    },

    // ─── Scheduled Reports ──────────────────────────────────────────────────
    async createScheduledReport(config: Partial<ScheduledReport>): Promise<ScheduledReport> {
      const { data, error } = await supabase.from('analytics_scheduled_reports').insert(config).select().single();
      if (error) throw error;
      return data;
    },
    async updateScheduledReport(id: string, config: Partial<ScheduledReport>): Promise<ScheduledReport> {
      const { data, error } = await supabase.from('analytics_scheduled_reports').update(config).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    async deleteScheduledReport(id: string): Promise<void> {
      const { error } = await supabase.from('analytics_scheduled_reports').delete().eq('id', id);
      if (error) throw error;
    },
    async listScheduledReports(): Promise<ScheduledReport[]> {
      const { data } = await supabase.from('analytics_scheduled_reports').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    async executeScheduledReport(id: string): Promise<void> {
      const { data } = await supabase.from('analytics_scheduled_reports').select('*').eq('id', id).single();
      if (!data) throw new Error('Scheduled report not found');
    },

    // ─── Data Warehouse ─────────────────────────────────────────────────────
    async getFactTable(params?: Record<string, unknown>): Promise<DataWarehouseFact[]> {
      let query = supabase.from('analytics_facts').select('*');
      if (params?.schoolId) query = query.eq('school_id', params.schoolId);
      if (params?.metric) query = query.eq('metric', params.metric);
      query = query.order('date', { ascending: false });
      const { data } = await query;
      return data || [];
    },
    async getDimension(type: string): Promise<DataWarehouseDimension[]> {
      const { data } = await supabase.from('analytics_dimensions').select('*').eq('type', type);
      return data || [];
    },
    async runETL(jobId: string): Promise<ETLJob> {
      const { data, error } = await supabase.from('analytics_etl_jobs').update({ status: 'running', last_run: new Date().toISOString() }).eq('id', jobId).select().single();
      if (error) throw error;
      return data;
    },
    async getETLJobs(): Promise<ETLJob[]> {
      const { data } = await supabase.from('analytics_etl_jobs').select('*').order('created_at', { ascending: false });
      return data || [];
    },

    // ─── Events ─────────────────────────────────────────────────────────────
    async logAnalyticsEvent(schoolId: string, event: string, data: Record<string, unknown>): Promise<void> {
      await supabase.from('analytics_events').insert({ school_id: schoolId, event, data, created_at: new Date().toISOString() });
    },
    async getAnalyticsEvents(schoolId: string, dateFrom?: string, dateTo?: string): Promise<Record<string, unknown>[]> {
      let query = supabase.from('analytics_events').select('*').eq('school_id', schoolId);
      if (dateFrom) query = query.gte('created_at', dateFrom);
      if (dateTo) query = query.lte('created_at', dateTo);
      query = query.order('created_at', { ascending: false });
      const { data } = await query;
      return data || [];
    },
  };
}
