import { SupabaseClient } from '@supabase/supabase-js';
// Government & National Governance Enterprise Repository
// Phase 2.9 - EduCI Platform
import type {
  Ministry, MinistryCreate,
  MinistryDepartment, MinistryDepartmentCreate,
  Directorate, DirectorateCreate,
  EducationPolicy, EducationPolicyCreate,
  NationalProgram, NationalProgramCreate,
  EducationStrategy, EducationStrategyCreate,
  Circular, CircularCreate,
  OfficialDocument, OfficialDocumentCreate,
  EducationCalendar, EducationCalendarCreate,
  NationalStatistic, NationalStatisticCreate,
  MinistryUser, MinistryUserCreate,
  MinistryNotification, MinistryNotificationCreate,
  EducationRegion, EducationRegionCreate,
  EducationDistrict, EducationDistrictCreate,
  Academy, AcademyCreate,
  RegionalDirectorate, RegionalDirectorateCreate,
  Inspector, InspectorCreate,
  InspectionVisit, InspectionVisitCreate,
  RegionalReport, RegionalReportCreate,
  RegionalKpi, RegionalKpiCreate,
  DistrictReport, DistrictReportCreate,
  RegionUser, RegionUserCreate,
  Campus, CampusCreate,
  CampusGroup, CampusGroupCreate,
  CampusGroupMember, CampusGroupMemberCreate,
  SharedResource, SharedResourceCreate,
  SharedResourceBooking, SharedResourceBookingCreate,
  CrossCampusUser, CrossCampusUserCreate,
  CampusTransfer, CampusTransferCreate,
  CentralizedAdministration, CentralizedAdministrationCreate,
  CampusAnalytics, CampusAnalyticsCreate,
  InterCampusCommunication, InterCampusCommunicationCreate,
  SchoolNetwork, SchoolNetworkCreate,
  NetworkMember, NetworkMemberCreate,
  SchoolChain, SchoolChainCreate,
  SchoolFranchise, SchoolFranchiseCreate,
  ReligiousSchoolGroup, ReligiousSchoolGroupCreate,
  PrivateSchoolGroup, PrivateSchoolGroupCreate,
  NgoSchoolGroup, NgoSchoolGroupCreate,
  InternationalSchoolGroup, InternationalSchoolGroupCreate,
  NetworkAgreement, NetworkAgreementCreate,
  NetworkReport, NetworkReportCreate,
  NationalExam, NationalExamCreate,
  ExamCenter, ExamCenterCreate,
  ExamCandidate, ExamCandidateCreate,
  ExamSupervisor, ExamSupervisorCreate,
  ExamSession, ExamSessionCreate,
  MarkingCenter, MarkingCenterCreate,
  ExamResult, ExamResultCreate,
  Certificate, CertificateCreate,
  Diploma, DiplomaCreate,
  ExamFraud, ExamFraudCreate,
  ExamAppeal, ExamAppealCreate,
  ExamStatistics, ExamStatisticsCreate,
  InspectionMission, InspectionMissionCreate,
  InspectionReport, InspectionReportCreate,
  InspectionRecommendation, InspectionRecommendationCreate,
  SchoolCompliance, SchoolComplianceCreate,
  CorrectiveAction, CorrectiveActionCreate,
  InspectionCalendar, InspectionCalendarCreate,
  SchoolRating, SchoolRatingCreate,
  InspectionChecklist, InspectionChecklistCreate,
  InspectorPerformance, InspectorPerformanceCreate,
  ComplianceTrend, ComplianceTrendCreate,
  Accreditation, AccreditationCreate,
  AccreditationStandard, AccreditationStandardCreate,
  AccreditationAssessment, AccreditationAssessmentCreate,
  Certification, CertificationCreate,
  Renewal, RenewalCreate,
  QualityAudit, QualityAuditCreate,
  ComplianceRule, ComplianceRuleCreate,
  QualityIndicator, QualityIndicatorCreate,
  AccreditationDocument, AccreditationDocumentCreate,
  AuditFinding, AuditFindingCreate,
  EducationKpi, EducationKpiCreate,
  RegionalAnalyticsKpi, RegionalAnalyticsKpiCreate,
  NationalDashboard, NationalDashboardCreate,
  DashboardWidget, DashboardWidgetCreate,
  PredictiveAnalytic, PredictiveAnalyticCreate,
  DropoutMap, DropoutMapCreate,
  InfrastructureMap, InfrastructureMapCreate,
  TeacherDistribution, TeacherDistributionCreate,
  StudentDistribution, StudentDistributionCreate,
  BudgetAnalytic, BudgetAnalyticCreate,
  EducationForecast, EducationForecastCreate,
  DataCollection, DataCollectionCreate,
  GovernmentFunding, GovernmentFundingCreate,
  FundingAllocation, FundingAllocationCreate,
  Scholarship, ScholarshipCreate,
  ScholarshipApplication, ScholarshipApplicationCreate,
  Grant, GrantCreate,
  GrantProject, GrantProjectCreate,
  Donor, DonorCreate,
  NgoPartner, NgoPartnerCreate,
  BudgetAllocation, BudgetAllocationCreate,
  RegionalBudget, RegionalBudgetCreate,
  FundDisbursement, FundDisbursementCreate,
  FundingReport, FundingReportCreate,
  NationalStudentId, NationalStudentIdCreate,
  TeacherRegistry, TeacherRegistryCreate,
  SchoolRegistry, SchoolRegistryCreate,
  DigitalCertificate, DigitalCertificateCreate,
  QrVerification, QrVerificationCreate,
  IdentityVerification, IdentityVerificationCreate,
  BiometricData, BiometricDataCreate,
  IdentityAudit, IdentityAuditCreate,
  NationalStandard, NationalStandardCreate,
  SchoolComplianceRecord, SchoolComplianceRecordCreate,
  ComplianceAssessment, ComplianceAssessmentCreate,
  ComplianceWaiver, ComplianceWaiverCreate,
  RegulationCategory, RegulationCategoryCreate,
  EducationRegulation, EducationRegulationCreate,
  ComplianceNotification, ComplianceNotificationCreate,
  ComplianceReport, ComplianceReportCreate,
  Country, CountryCreate,
  Language, LanguageCreate,
  Currency, CurrencyCreate,
  EducationSystem, EducationSystemCreate,
  Equivalency, EquivalencyCreate,
  InternationalPartnership, InternationalPartnershipCreate,
  ExchangeProgram, ExchangeProgramCreate,
  InternationalStudent, InternationalStudentCreate,
  CrossBorderResearch, CrossBorderResearchCreate,
  GlobalBenchmark, GlobalBenchmarkCreate, GlobalBenchmarkUpdate,
  GovernmentFundingUpdate,
  FundingAllocationUpdate,
  ScholarshipUpdate,
  ScholarshipApplicationUpdate,
  GrantUpdate,
  GrantProjectUpdate,
  DonorUpdate,
  NgoPartnerUpdate,
  BudgetAllocationUpdate,
  RegionalBudgetUpdate,
  FundDisbursementUpdate,
  FundingReportUpdate,
  NationalStudentIdUpdate,
  TeacherRegistryUpdate,
  SchoolRegistryUpdate,
  DigitalCertificateUpdate,
  QrVerificationUpdate,
  IdentityVerificationUpdate,
  BiometricDataUpdate,
  IdentityAuditUpdate,
  NationalStandardUpdate,
  SchoolComplianceRecordUpdate,
  ComplianceAssessmentUpdate,
  ComplianceWaiverUpdate,
  RegulationCategoryUpdate,
  EducationRegulationUpdate,
  ComplianceNotificationUpdate,
  ComplianceReportUpdate,
  CountryUpdate,
  LanguageUpdate,
  CurrencyUpdate,
  EducationSystemUpdate,
  EquivalencyUpdate,
  InternationalPartnershipUpdate,
  ExchangeProgramUpdate,
  InternationalStudentUpdate,
  CrossBorderResearchUpdate,
} from '@educi/types';
import {
  GovMinistryNotFoundError,
  GovMinistryDepartmentNotFoundError,
  GovDirectorateNotFoundError,
  GovEducationPolicyNotFoundError,
  GovNationalProgramNotFoundError,
  GovEducationStrategyNotFoundError,
  GovCircularNotFoundError,
  GovOfficialDocumentNotFoundError,
  GovEducationCalendarNotFoundError,
  GovNationalStatisticNotFoundError,
  GovMinistryUserNotFoundError,
  GovMinistryNotificationNotFoundError,
  GovEducationRegionNotFoundError,
  GovEducationDistrictNotFoundError,
  GovAcademyNotFoundError,
  GovRegionalDirectorateNotFoundError,
  GovInspectorNotFoundError,
  GovInspectionVisitNotFoundError,
  GovRegionalReportNotFoundError,
  GovRegionalKpiNotFoundError,
  GovDistrictReportNotFoundError,
  GovRegionUserNotFoundError,
  GovCampusNotFoundError,
  GovCampusGroupNotFoundError,
  GovCampusGroupMemberNotFoundError,
  GovSharedResourceNotFoundError,
  GovSharedResourceBookingNotFoundError,
  GovCrossCampusUserNotFoundError,
  GovCampusTransferNotFoundError,
  GovCentralizedAdministrationNotFoundError,
  GovCampusAnalyticsNotFoundError,
  GovInterCampusCommunicationNotFoundError,
  GovSchoolNetworkNotFoundError,
  GovNetworkMemberNotFoundError,
  GovSchoolChainNotFoundError,
  GovSchoolFranchiseNotFoundError,
  GovReligiousSchoolGroupNotFoundError,
  GovPrivateSchoolGroupNotFoundError,
  GovNgoSchoolGroupNotFoundError,
  GovInternationalSchoolGroupNotFoundError,
  GovNetworkAgreementNotFoundError,
  GovNetworkReportNotFoundError,
  GovNationalExamNotFoundError,
  GovExamCenterNotFoundError,
  GovExamCandidateNotFoundError,
  GovExamSupervisorNotFoundError,
  GovExamSessionNotFoundError,
  GovMarkingCenterNotFoundError,
  GovExamResultNotFoundError,
  GovCertificateNotFoundError,
  GovDiplomaNotFoundError,
  GovExamFraudNotFoundError,
  GovExamAppealNotFoundError,
  GovExamStatisticsNotFoundError,
  GovInspectionMissionNotFoundError,
  GovInspectionReportNotFoundError,
  GovInspectionRecommendationNotFoundError,
  GovSchoolComplianceNotFoundError,
  GovCorrectiveActionNotFoundError,
  GovInspectionCalendarNotFoundError,
  GovSchoolRatingNotFoundError,
  GovInspectionChecklistNotFoundError,
  GovInspectorPerformanceNotFoundError,
  GovComplianceTrendNotFoundError,
  GovAccreditationNotFoundError,
  GovAccreditationStandardNotFoundError,
  GovAccreditationAssessmentNotFoundError,
  GovCertificationNotFoundError,
  GovRenewalNotFoundError,
  GovQualityAuditNotFoundError,
  GovComplianceRuleNotFoundError,
  GovQualityIndicatorNotFoundError,
  GovAccreditationDocumentNotFoundError,
  GovAuditFindingNotFoundError,
  GovEducationKpiNotFoundError,
  GovRegionalAnalyticsKpiNotFoundError,
  GovNationalDashboardNotFoundError,
  GovDashboardWidgetNotFoundError,
  GovPredictiveAnalyticNotFoundError,
  GovDropoutMapNotFoundError,
  GovInfrastructureMapNotFoundError,
  GovTeacherDistributionNotFoundError,
  GovStudentDistributionNotFoundError,
  GovBudgetAnalyticNotFoundError,
  GovEducationForecastNotFoundError,
  GovDataCollectionNotFoundError,
  GovGovernmentFundingNotFoundError,
  GovFundingAllocationNotFoundError,
  GovScholarshipNotFoundError,
  GovScholarshipApplicationNotFoundError,
  GovGrantNotFoundError,
  GovGrantProjectNotFoundError,
  GovDonorNotFoundError,
  GovNgoPartnerNotFoundError,
  GovBudgetAllocationNotFoundError,
  GovRegionalBudgetNotFoundError,
  GovFundDisbursementNotFoundError,
  GovFundingReportNotFoundError,
  GovNationalStudentIdNotFoundError,
  GovTeacherRegistryNotFoundError,
  GovSchoolRegistryNotFoundError,
  GovDigitalCertificateNotFoundError,
  GovQrVerificationNotFoundError,
  GovIdentityVerificationNotFoundError,
  GovBiometricDataNotFoundError,
  GovIdentityAuditNotFoundError,
  GovNationalStandardNotFoundError,
  GovSchoolComplianceRecordNotFoundError,
  GovComplianceAssessmentNotFoundError,
  GovComplianceWaiverNotFoundError,
  GovRegulationCategoryNotFoundError,
  GovEducationRegulationNotFoundError,
  GovComplianceNotificationNotFoundError,
  GovComplianceReportNotFoundError,
  GovCountryNotFoundError,
  GovLanguageNotFoundError,
  GovCurrencyNotFoundError,
  GovEducationSystemNotFoundError,
  GovEquivalencyNotFoundError,
  GovInternationalPartnershipNotFoundError,
  GovExchangeProgramNotFoundError,
  GovInternationalStudentNotFoundError,
  GovCrossBorderResearchNotFoundError,
  GovGlobalBenchmarkNotFoundError,
} from '@educi/errors';

export class GovernmentRepositoryEnterprise {
  constructor(private readonly supabase: SupabaseClient) {}
  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 1: MINISTRY & NATIONAL ADMINISTRATION
  // ═══════════════════════════════════════════════════════════════════════════════

  async findMinistryById(schoolId: string, id: string): Promise<Ministry> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovMinistryNotFoundError(id);
    return data;
  }

  async findAllMinistries(schoolId: string): Promise<Ministry[]> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMinistry(schoolId: string, ministry: Partial<MinistryCreate>): Promise<Ministry> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .insert({ ...ministry, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMinistry(schoolId: string, id: string, updates: Partial<MinistryCreate>): Promise<Ministry> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryNotFoundError(id);
    return data;
  }

  async deleteMinistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_ministries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMinistries(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_ministries')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMinistryByCode(schoolId: string, code: string): Promise<Ministry> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovMinistryNotFoundError(code);
    return data;
  }

  async findActiveMinistries(schoolId: string): Promise<Ministry[]> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMinistriesByCountry(schoolId: string, country: string): Promise<Ministry[]> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .select('*')
      .eq('school_id', schoolId)
      .eq('country', country);
    if (error) throw error;
    return data ?? [];
  }

  async updateMinistryStatus(schoolId: string, id: string, status: string): Promise<Ministry> {
    const { data, error } = await this.supabase
      .from('gov_ministries')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryNotFoundError(id);
    return data;
  }

  async findMinistryDepartmentById(schoolId: string, id: string): Promise<MinistryDepartment> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovMinistryDepartmentNotFoundError(id);
    return data;
  }

  async findAllMinistryDepartments(schoolId: string): Promise<MinistryDepartment[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMinistryDepartment(schoolId: string, dept: Partial<MinistryDepartmentCreate>): Promise<MinistryDepartment> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .insert({ ...dept, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMinistryDepartment(schoolId: string, id: string, updates: Partial<MinistryDepartmentCreate>): Promise<MinistryDepartment> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryDepartmentNotFoundError(id);
    return data;
  }

  async deleteMinistryDepartment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_ministry_departments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMinistryDepartments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_ministry_departments')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMinistryDepartmentsByMinistry(schoolId: string, ministryId: string): Promise<MinistryDepartment[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMinistryDepartments(schoolId: string): Promise<MinistryDepartment[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMinistryDepartmentByCode(schoolId: string, code: string): Promise<MinistryDepartment> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovMinistryDepartmentNotFoundError(code);
    return data;
  }

  async updateMinistryDepartmentStatus(schoolId: string, id: string, status: string): Promise<MinistryDepartment> {
    const { data, error } = await this.supabase
      .from('gov_ministry_departments')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryDepartmentNotFoundError(id);
    return data;
  }

  async findDirectorateById(schoolId: string, id: string): Promise<Directorate> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDirectorateNotFoundError(id);
    return data;
  }

  async findAllDirectorates(schoolId: string): Promise<Directorate[]> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDirectorate(schoolId: string, directorate: Partial<DirectorateCreate>): Promise<Directorate> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .insert({ ...directorate, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateDirectorate(schoolId: string, id: string, updates: Partial<DirectorateCreate>): Promise<Directorate> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDirectorateNotFoundError(id);
    return data;
  }

  async deleteDirectorate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_directorates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDirectorates(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_directorates')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDirectoratesByMinistry(schoolId: string, ministryId: string): Promise<Directorate[]> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async findDirectoratesByRegion(schoolId: string, regionId: string): Promise<Directorate[]> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDirectorates(schoolId: string): Promise<Directorate[]> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateDirectorateStatus(schoolId: string, id: string, status: string): Promise<Directorate> {
    const { data, error } = await this.supabase
      .from('gov_directorates')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDirectorateNotFoundError(id);
    return data;
  }

  async findEducationPolicyById(schoolId: string, id: string): Promise<EducationPolicy> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationPolicyNotFoundError(id);
    return data;
  }

  async findAllEducationPolicies(schoolId: string): Promise<EducationPolicy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEducationPolicy(schoolId: string, policy: Partial<EducationPolicyCreate>): Promise<EducationPolicy> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .insert({ ...policy, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEducationPolicy(schoolId: string, id: string, updates: Partial<EducationPolicyCreate>): Promise<EducationPolicy> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationPolicyNotFoundError(id);
    return data;
  }

  async deleteEducationPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_policies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationPolicies(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_education_policies')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEducationPoliciesBySector(schoolId: string, sector: string): Promise<EducationPolicy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('sector', sector);
    if (error) throw error;
    return data ?? [];
  }

  async findEducationPoliciesByStatus(schoolId: string, status: string): Promise<EducationPolicy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEducationPolicies(schoolId: string): Promise<EducationPolicy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEducationPoliciesByMinistry(schoolId: string, ministryId: string): Promise<EducationPolicy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_policies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async findNationalProgramById(schoolId: string, id: string): Promise<NationalProgram> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNationalProgramNotFoundError(id);
    return data;
  }

  async findAllNationalPrograms(schoolId: string): Promise<NationalProgram[]> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNationalProgram(schoolId: string, program: Partial<NationalProgramCreate>): Promise<NationalProgram> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .insert({ ...program, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNationalProgram(schoolId: string, id: string, updates: Partial<NationalProgramCreate>): Promise<NationalProgram> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalProgramNotFoundError(id);
    return data;
  }

  async deleteNationalProgram(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_national_programs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNationalPrograms(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_national_programs')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNationalProgramsBySector(schoolId: string, sector: string): Promise<NationalProgram[]> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('sector', sector);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNationalPrograms(schoolId: string): Promise<NationalProgram[]> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findNationalProgramsByMinistry(schoolId: string, ministryId: string): Promise<NationalProgram[]> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async updateNationalProgramStatus(schoolId: string, id: string, status: string): Promise<NationalProgram> {
    const { data, error } = await this.supabase
      .from('gov_national_programs')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalProgramNotFoundError(id);
    return data;
  }

  async findEducationStrategyById(schoolId: string, id: string): Promise<EducationStrategy> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationStrategyNotFoundError(id);
    return data;
  }

  async findAllEducationStrategies(schoolId: string): Promise<EducationStrategy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEducationStrategy(schoolId: string, strategy: Partial<EducationStrategyCreate>): Promise<EducationStrategy> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .insert({ ...strategy, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEducationStrategy(schoolId: string, id: string, updates: Partial<EducationStrategyCreate>): Promise<EducationStrategy> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationStrategyNotFoundError(id);
    return data;
  }

  async deleteEducationStrategy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_strategies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationStrategies(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_education_strategies')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEducationStrategiesByMinistry(schoolId: string, ministryId: string): Promise<EducationStrategy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEducationStrategies(schoolId: string): Promise<EducationStrategy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEducationStrategiesBySector(schoolId: string, sector: string): Promise<EducationStrategy[]> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('sector', sector);
    if (error) throw error;
    return data ?? [];
  }

  async updateEducationStrategyStatus(schoolId: string, id: string, status: string): Promise<EducationStrategy> {
    const { data, error } = await this.supabase
      .from('gov_education_strategies')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationStrategyNotFoundError(id);
    return data;
  }

  async findCircularById(schoolId: string, id: string): Promise<Circular> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCircularNotFoundError(id);
    return data;
  }

  async findAllCirculars(schoolId: string): Promise<Circular[]> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCircular(schoolId: string, circular: Partial<CircularCreate>): Promise<Circular> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .insert({ ...circular, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCircular(schoolId: string, id: string, updates: Partial<CircularCreate>): Promise<Circular> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCircularNotFoundError(id);
    return data;
  }

  async deleteCircular(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_circulars')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCirculars(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_circulars')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCircularsByMinistry(schoolId: string, ministryId: string): Promise<Circular[]> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCirculars(schoolId: string): Promise<Circular[]> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCircularsByPriority(schoolId: string, priority: string): Promise<Circular[]> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('priority', priority);
    if (error) throw error;
    return data ?? [];
  }

  async updateCircularStatus(schoolId: string, id: string, status: string): Promise<Circular> {
    const { data, error } = await this.supabase
      .from('gov_circulars')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCircularNotFoundError(id);
    return data;
  }

  async findOfficialDocumentById(schoolId: string, id: string): Promise<OfficialDocument> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovOfficialDocumentNotFoundError(id);
    return data;
  }

  async findAllOfficialDocuments(schoolId: string): Promise<OfficialDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createOfficialDocument(schoolId: string, doc: Partial<OfficialDocumentCreate>): Promise<OfficialDocument> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .insert({ ...doc, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateOfficialDocument(schoolId: string, id: string, updates: Partial<OfficialDocumentCreate>): Promise<OfficialDocument> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovOfficialDocumentNotFoundError(id);
    return data;
  }

  async deleteOfficialDocument(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_official_documents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countOfficialDocuments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_official_documents')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findOfficialDocumentsByType(schoolId: string, type: string): Promise<OfficialDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveOfficialDocuments(schoolId: string): Promise<OfficialDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findOfficialDocumentsByMinistry(schoolId: string, ministryId: string): Promise<OfficialDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async updateOfficialDocumentStatus(schoolId: string, id: string, status: string): Promise<OfficialDocument> {
    const { data, error } = await this.supabase
      .from('gov_official_documents')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovOfficialDocumentNotFoundError(id);
    return data;
  }

  async findEducationCalendarById(schoolId: string, id: string): Promise<EducationCalendar> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationCalendarNotFoundError(id);
    return data;
  }

  async findAllEducationCalendars(schoolId: string): Promise<EducationCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEducationCalendar(schoolId: string, calendar: Partial<EducationCalendarCreate>): Promise<EducationCalendar> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .insert({ ...calendar, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEducationCalendar(schoolId: string, id: string, updates: Partial<EducationCalendarCreate>): Promise<EducationCalendar> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationCalendarNotFoundError(id);
    return data;
  }

  async deleteEducationCalendar(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_calendars')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationCalendars(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_education_calendars')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEducationCalendarsByAcademicYear(schoolId: string, academicYear: string): Promise<EducationCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('academic_year', academicYear);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEducationCalendars(schoolId: string): Promise<EducationCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEducationCalendarsByType(schoolId: string, type: string): Promise<EducationCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateEducationCalendarStatus(schoolId: string, id: string, status: string): Promise<EducationCalendar> {
    const { data, error } = await this.supabase
      .from('gov_education_calendars')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationCalendarNotFoundError(id);
    return data;
  }

  async findNationalStatisticById(schoolId: string, id: string): Promise<NationalStatistic> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNationalStatisticNotFoundError(id);
    return data;
  }

  async findAllNationalStatistics(schoolId: string): Promise<NationalStatistic[]> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNationalStatistic(schoolId: string, statistic: Partial<NationalStatisticCreate>): Promise<NationalStatistic> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .insert({ ...statistic, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNationalStatistic(schoolId: string, id: string, updates: Partial<NationalStatisticCreate>): Promise<NationalStatistic> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalStatisticNotFoundError(id);
    return data;
  }

  async deleteNationalStatistic(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_national_statistics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNationalStatistics(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_national_statistics')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNationalStatisticsByCategory(schoolId: string, category: string): Promise<NationalStatistic[]> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNationalStatistics(schoolId: string): Promise<NationalStatistic[]> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findNationalStatisticsByYear(schoolId: string, year: number): Promise<NationalStatistic[]> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('year', year);
    if (error) throw error;
    return data ?? [];
  }

  async updateNationalStatisticStatus(schoolId: string, id: string, status: string): Promise<NationalStatistic> {
    const { data, error } = await this.supabase
      .from('gov_national_statistics')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalStatisticNotFoundError(id);
    return data;
  }

  async findMinistryUserById(schoolId: string, id: string): Promise<MinistryUser> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovMinistryUserNotFoundError(id);
    return data;
  }

  async findAllMinistryUsers(schoolId: string): Promise<MinistryUser[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMinistryUser(schoolId: string, user: Partial<MinistryUserCreate>): Promise<MinistryUser> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .insert({ ...user, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMinistryUser(schoolId: string, id: string, updates: Partial<MinistryUserCreate>): Promise<MinistryUser> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryUserNotFoundError(id);
    return data;
  }

  async deleteMinistryUser(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_ministry_users')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMinistryUsers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_ministry_users')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMinistryUsersByMinistry(schoolId: string, ministryId: string): Promise<MinistryUser[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMinistryUsers(schoolId: string): Promise<MinistryUser[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMinistryUsersByRole(schoolId: string, role: string): Promise<MinistryUser[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('role', role);
    if (error) throw error;
    return data ?? [];
  }

  async updateMinistryUserStatus(schoolId: string, id: string, status: string): Promise<MinistryUser> {
    const { data, error } = await this.supabase
      .from('gov_ministry_users')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryUserNotFoundError(id);
    return data;
  }

  async findMinistryNotificationById(schoolId: string, id: string): Promise<MinistryNotification> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovMinistryNotificationNotFoundError(id);
    return data;
  }

  async findAllMinistryNotifications(schoolId: string): Promise<MinistryNotification[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMinistryNotification(schoolId: string, notification: Partial<MinistryNotificationCreate>): Promise<MinistryNotification> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .insert({ ...notification, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMinistryNotification(schoolId: string, id: string, updates: Partial<MinistryNotificationCreate>): Promise<MinistryNotification> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryNotificationNotFoundError(id);
    return data;
  }

  async deleteMinistryNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_ministry_notifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMinistryNotifications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_ministry_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMinistryNotificationsByMinistry(schoolId: string, ministryId: string): Promise<MinistryNotification[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('ministry_id', ministryId);
    if (error) throw error;
    return data ?? [];
  }

  async findUnreadMinistryNotifications(schoolId: string, userId: string): Promise<MinistryNotification[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .eq('read', false);
    if (error) throw error;
    return data ?? [];
  }

  async findMinistryNotificationsByType(schoolId: string, type: string): Promise<MinistryNotification[]> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async markMinistryNotificationAsRead(schoolId: string, id: string): Promise<MinistryNotification> {
    const { data, error } = await this.supabase
      .from('gov_ministry_notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMinistryNotificationNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 2: REGIONAL EDUCATION GOVERNANCE
  // ═══════════════════════════════════════════════════════════════════════════════

  async findEducationRegionById(schoolId: string, id: string): Promise<EducationRegion> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationRegionNotFoundError(id);
    return data;
  }

  async findAllEducationRegions(schoolId: string): Promise<EducationRegion[]> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEducationRegion(schoolId: string, region: Partial<EducationRegionCreate>): Promise<EducationRegion> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .insert({ ...region, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEducationRegion(schoolId: string, id: string, updates: Partial<EducationRegionCreate>): Promise<EducationRegion> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationRegionNotFoundError(id);
    return data;
  }

  async deleteEducationRegion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_regions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationRegions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_education_regions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEducationRegionByCode(schoolId: string, code: string): Promise<EducationRegion> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationRegionNotFoundError(code);
    return data;
  }

  async findActiveEducationRegions(schoolId: string): Promise<EducationRegion[]> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEducationRegionsByCountry(schoolId: string, country: string): Promise<EducationRegion[]> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('country', country);
    if (error) throw error;
    return data ?? [];
  }

  async updateEducationRegionStatus(schoolId: string, id: string, status: string): Promise<EducationRegion> {
    const { data, error } = await this.supabase
      .from('gov_education_regions')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationRegionNotFoundError(id);
    return data;
  }

  async findEducationDistrictById(schoolId: string, id: string): Promise<EducationDistrict> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationDistrictNotFoundError(id);
    return data;
  }

  async findAllEducationDistricts(schoolId: string): Promise<EducationDistrict[]> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEducationDistrict(schoolId: string, district: Partial<EducationDistrictCreate>): Promise<EducationDistrict> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .insert({ ...district, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEducationDistrict(schoolId: string, id: string, updates: Partial<EducationDistrictCreate>): Promise<EducationDistrict> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationDistrictNotFoundError(id);
    return data;
  }

  async deleteEducationDistrict(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_districts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationDistricts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_education_districts')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEducationDistrictsByRegion(schoolId: string, regionId: string): Promise<EducationDistrict[]> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEducationDistricts(schoolId: string): Promise<EducationDistrict[]> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEducationDistrictByCode(schoolId: string, code: string): Promise<EducationDistrict> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationDistrictNotFoundError(code);
    return data;
  }

  async updateEducationDistrictStatus(schoolId: string, id: string, status: string): Promise<EducationDistrict> {
    const { data, error } = await this.supabase
      .from('gov_education_districts')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationDistrictNotFoundError(id);
    return data;
  }

  async findAcademyById(schoolId: string, id: string): Promise<Academy> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovAcademyNotFoundError(id);
    return data;
  }

  async findAllAcademies(schoolId: string): Promise<Academy[]> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAcademy(schoolId: string, academy: Partial<AcademyCreate>): Promise<Academy> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .insert({ ...academy, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAcademy(schoolId: string, id: string, updates: Partial<AcademyCreate>): Promise<Academy> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAcademyNotFoundError(id);
    return data;
  }

  async deleteAcademy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_academies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAcademies(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_academies')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAcademiesByDistrict(schoolId: string, districtId: string): Promise<Academy[]> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('district_id', districtId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAcademies(schoolId: string): Promise<Academy[]> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAcademiesByType(schoolId: string, type: string): Promise<Academy[]> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateAcademyStatus(schoolId: string, id: string, status: string): Promise<Academy> {
    const { data, error } = await this.supabase
      .from('gov_academies')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAcademyNotFoundError(id);
    return data;
  }

  async findRegionalDirectorateById(schoolId: string, id: string): Promise<RegionalDirectorate> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRegionalDirectorateNotFoundError(id);
    return data;
  }

  async findAllRegionalDirectorates(schoolId: string): Promise<RegionalDirectorate[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRegionalDirectorate(schoolId: string, directorate: Partial<RegionalDirectorateCreate>): Promise<RegionalDirectorate> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .insert({ ...directorate, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRegionalDirectorate(schoolId: string, id: string, updates: Partial<RegionalDirectorateCreate>): Promise<RegionalDirectorate> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalDirectorateNotFoundError(id);
    return data;
  }

  async deleteRegionalDirectorate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_regional_directorates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegionalDirectorates(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_regional_directorates')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRegionalDirectoratesByRegion(schoolId: string, regionId: string): Promise<RegionalDirectorate[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRegionalDirectorates(schoolId: string): Promise<RegionalDirectorate[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRegionalDirectoratesByCountry(schoolId: string, country: string): Promise<RegionalDirectorate[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('country', country);
    if (error) throw error;
    return data ?? [];
  }

  async updateRegionalDirectorateStatus(schoolId: string, id: string, status: string): Promise<RegionalDirectorate> {
    const { data, error } = await this.supabase
      .from('gov_regional_directorates')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalDirectorateNotFoundError(id);
    return data;
  }

  async findInspectorById(schoolId: string, id: string): Promise<Inspector> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectorNotFoundError(id);
    return data;
  }

  async findAllInspectors(schoolId: string): Promise<Inspector[]> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspector(schoolId: string, inspector: Partial<InspectorCreate>): Promise<Inspector> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .insert({ ...inspector, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspector(schoolId: string, id: string, updates: Partial<InspectorCreate>): Promise<Inspector> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectorNotFoundError(id);
    return data;
  }

  async deleteInspector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectors(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspectors')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectorsByRegion(schoolId: string, regionId: string): Promise<Inspector[]> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInspectors(schoolId: string): Promise<Inspector[]> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInspectorsBySpecialization(schoolId: string, specialization: string): Promise<Inspector[]> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .select('*')
      .eq('school_id', schoolId)
      .eq('specialization', specialization);
    if (error) throw error;
    return data ?? [];
  }

  async updateInspectorStatus(schoolId: string, id: string, status: string): Promise<Inspector> {
    const { data, error } = await this.supabase
      .from('gov_inspectors')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectorNotFoundError(id);
    return data;
  }

  async findInspectionVisitById(schoolId: string, id: string): Promise<InspectionVisit> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectionVisitNotFoundError(id);
    return data;
  }

  async findAllInspectionVisits(schoolId: string): Promise<InspectionVisit[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspectionVisit(schoolId: string, visit: Partial<InspectionVisitCreate>): Promise<InspectionVisit> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .insert({ ...visit, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspectionVisit(schoolId: string, id: string, updates: Partial<InspectionVisitCreate>): Promise<InspectionVisit> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionVisitNotFoundError(id);
    return data;
  }

  async deleteInspectionVisit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspection_visits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectionVisits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspection_visits')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectionVisitsBySchool(schoolId: string, targetSchoolId: string): Promise<InspectionVisit[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInspectionVisits(schoolId: string): Promise<InspectionVisit[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInspectionVisitsByInspector(schoolId: string, inspectorId: string): Promise<InspectionVisit[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .select('*')
      .eq('school_id', schoolId)
      .eq('inspector_id', inspectorId);
    if (error) throw error;
    return data ?? [];
  }

  async updateInspectionVisitStatus(schoolId: string, id: string, status: string): Promise<InspectionVisit> {
    const { data, error } = await this.supabase
      .from('gov_inspection_visits')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionVisitNotFoundError(id);
    return data;
  }

  async findRegionalReportById(schoolId: string, id: string): Promise<RegionalReport> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRegionalReportNotFoundError(id);
    return data;
  }

  async findAllRegionalReports(schoolId: string): Promise<RegionalReport[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRegionalReport(schoolId: string, report: Partial<RegionalReportCreate>): Promise<RegionalReport> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .insert({ ...report, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRegionalReport(schoolId: string, id: string, updates: Partial<RegionalReportCreate>): Promise<RegionalReport> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalReportNotFoundError(id);
    return data;
  }

  async deleteRegionalReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_regional_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegionalReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_regional_reports')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRegionalReportsByRegion(schoolId: string, regionId: string): Promise<RegionalReport[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findRegionalReportsByType(schoolId: string, type: string): Promise<RegionalReport[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRegionalReports(schoolId: string): Promise<RegionalReport[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateRegionalReportStatus(schoolId: string, id: string, status: string): Promise<RegionalReport> {
    const { data, error } = await this.supabase
      .from('gov_regional_reports')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalReportNotFoundError(id);
    return data;
  }

  async findRegionalKpiById(schoolId: string, id: string): Promise<RegionalKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRegionalKpiNotFoundError(id);
    return data;
  }

  async findAllRegionalKpis(schoolId: string): Promise<RegionalKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRegionalKpi(schoolId: string, kpi: Partial<RegionalKpiCreate>): Promise<RegionalKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .insert({ ...kpi, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRegionalKpi(schoolId: string, id: string, updates: Partial<RegionalKpiCreate>): Promise<RegionalKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalKpiNotFoundError(id);
    return data;
  }

  async deleteRegionalKpi(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_regional_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegionalKpis(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_regional_kpis')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRegionalKpisByRegion(schoolId: string, regionId: string): Promise<RegionalKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRegionalKpis(schoolId: string): Promise<RegionalKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRegionalKpisByCategory(schoolId: string, category: string): Promise<RegionalKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async updateRegionalKpiStatus(schoolId: string, id: string, status: string): Promise<RegionalKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_kpis')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalKpiNotFoundError(id);
    return data;
  }

  async findDistrictReportById(schoolId: string, id: string): Promise<DistrictReport> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDistrictReportNotFoundError(id);
    return data;
  }

  async findAllDistrictReports(schoolId: string): Promise<DistrictReport[]> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDistrictReport(schoolId: string, report: Partial<DistrictReportCreate>): Promise<DistrictReport> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .insert({ ...report, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateDistrictReport(schoolId: string, id: string, updates: Partial<DistrictReportCreate>): Promise<DistrictReport> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDistrictReportNotFoundError(id);
    return data;
  }

  async deleteDistrictReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_district_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDistrictReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_district_reports')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDistrictReportsByDistrict(schoolId: string, districtId: string): Promise<DistrictReport[]> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('district_id', districtId);
    if (error) throw error;
    return data ?? [];
  }

  async findDistrictReportsByType(schoolId: string, type: string): Promise<DistrictReport[]> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDistrictReports(schoolId: string): Promise<DistrictReport[]> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateDistrictReportStatus(schoolId: string, id: string, status: string): Promise<DistrictReport> {
    const { data, error } = await this.supabase
      .from('gov_district_reports')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDistrictReportNotFoundError(id);
    return data;
  }

  async findRegionUserById(schoolId: string, id: string): Promise<RegionUser> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRegionUserNotFoundError(id);
    return data;
  }

  async findAllRegionUsers(schoolId: string): Promise<RegionUser[]> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRegionUser(schoolId: string, user: Partial<RegionUserCreate>): Promise<RegionUser> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .insert({ ...user, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRegionUser(schoolId: string, id: string, updates: Partial<RegionUserCreate>): Promise<RegionUser> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionUserNotFoundError(id);
    return data;
  }

  async deleteRegionUser(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_region_users')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegionUsers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_region_users')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRegionUsersByRegion(schoolId: string, regionId: string): Promise<RegionUser[]> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRegionUsers(schoolId: string): Promise<RegionUser[]> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRegionUsersByRole(schoolId: string, role: string): Promise<RegionUser[]> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('role', role);
    if (error) throw error;
    return data ?? [];
  }

  async updateRegionUserStatus(schoolId: string, id: string, status: string): Promise<RegionUser> {
    const { data, error } = await this.supabase
      .from('gov_region_users')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionUserNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 3: MULTI-CAMPUS GOVERNANCE
  // ═══════════════════════════════════════════════════════════════════════════════

  async findCampusById(schoolId: string, id: string): Promise<Campus> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCampusNotFoundError(id);
    return data;
  }

  async findAllCampuses(schoolId: string): Promise<Campus[]> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCampus(schoolId: string, campus: Partial<CampusCreate>): Promise<Campus> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .insert({ ...campus, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCampus(schoolId: string, id: string, updates: Partial<CampusCreate>): Promise<Campus> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusNotFoundError(id);
    return data;
  }

  async deleteCampus(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_campuses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCampuses(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_campuses')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCampusesByRegion(schoolId: string, regionId: string): Promise<Campus[]> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCampuses(schoolId: string): Promise<Campus[]> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCampusByCode(schoolId: string, code: string): Promise<Campus> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCampusNotFoundError(code);
    return data;
  }

  async updateCampusStatus(schoolId: string, id: string, status: string): Promise<Campus> {
    const { data, error } = await this.supabase
      .from('gov_campuses')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusNotFoundError(id);
    return data;
  }

  async findCampusGroupById(schoolId: string, id: string): Promise<CampusGroup> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCampusGroupNotFoundError(id);
    return data;
  }

  async findAllCampusGroups(schoolId: string): Promise<CampusGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCampusGroup(schoolId: string, group: Partial<CampusGroupCreate>): Promise<CampusGroup> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .insert({ ...group, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCampusGroup(schoolId: string, id: string, updates: Partial<CampusGroupCreate>): Promise<CampusGroup> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusGroupNotFoundError(id);
    return data;
  }

  async deleteCampusGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_campus_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCampusGroups(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_campus_groups')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCampusGroupsByType(schoolId: string, type: string): Promise<CampusGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCampusGroups(schoolId: string): Promise<CampusGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCampusGroupByName(schoolId: string, name: string): Promise<CampusGroup> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCampusGroupNotFoundError(name);
    return data;
  }

  async updateCampusGroupStatus(schoolId: string, id: string, status: string): Promise<CampusGroup> {
    const { data, error } = await this.supabase
      .from('gov_campus_groups')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusGroupNotFoundError(id);
    return data;
  }

  async findCampusGroupMemberById(schoolId: string, id: string): Promise<CampusGroupMember> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCampusGroupMemberNotFoundError(id);
    return data;
  }

  async findAllCampusGroupMembers(schoolId: string): Promise<CampusGroupMember[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCampusGroupMember(schoolId: string, member: Partial<CampusGroupMemberCreate>): Promise<CampusGroupMember> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .insert({ ...member, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCampusGroupMember(schoolId: string, id: string, updates: Partial<CampusGroupMemberCreate>): Promise<CampusGroupMember> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusGroupMemberNotFoundError(id);
    return data;
  }

  async deleteCampusGroupMember(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_campus_group_members')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCampusGroupMembers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_campus_group_members')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCampusGroupMembersByGroup(schoolId: string, groupId: string): Promise<CampusGroupMember[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .select('*')
      .eq('school_id', schoolId)
      .eq('group_id', groupId);
    if (error) throw error;
    return data ?? [];
  }

  async findCampusGroupMembersByCampus(schoolId: string, campusId: string): Promise<CampusGroupMember[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .select('*')
      .eq('school_id', schoolId)
      .eq('campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCampusGroupMembers(schoolId: string): Promise<CampusGroupMember[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateCampusGroupMemberStatus(schoolId: string, id: string, status: string): Promise<CampusGroupMember> {
    const { data, error } = await this.supabase
      .from('gov_campus_group_members')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusGroupMemberNotFoundError(id);
    return data;
  }

  async findSharedResourceById(schoolId: string, id: string): Promise<SharedResource> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSharedResourceNotFoundError(id);
    return data;
  }

  async findAllSharedResources(schoolId: string): Promise<SharedResource[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSharedResource(schoolId: string, resource: Partial<SharedResourceCreate>): Promise<SharedResource> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .insert({ ...resource, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateSharedResource(schoolId: string, id: string, updates: Partial<SharedResourceCreate>): Promise<SharedResource> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSharedResourceNotFoundError(id);
    return data;
  }

  async deleteSharedResource(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_shared_resources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSharedResources(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_shared_resources')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSharedResourcesByType(schoolId: string, type: string): Promise<SharedResource[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSharedResources(schoolId: string): Promise<SharedResource[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSharedResourcesByCampus(schoolId: string, campusId: string): Promise<SharedResource[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .select('*')
      .eq('school_id', schoolId)
      .eq('campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async updateSharedResourceStatus(schoolId: string, id: string, status: string): Promise<SharedResource> {
    const { data, error } = await this.supabase
      .from('gov_shared_resources')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSharedResourceNotFoundError(id);
    return data;
  }

  async findSharedResourceBookingById(schoolId: string, id: string): Promise<SharedResourceBooking> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSharedResourceBookingNotFoundError(id);
    return data;
  }

  async findAllSharedResourceBookings(schoolId: string): Promise<SharedResourceBooking[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSharedResourceBooking(schoolId: string, booking: Partial<SharedResourceBookingCreate>): Promise<SharedResourceBooking> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .insert({ ...booking, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateSharedResourceBooking(schoolId: string, id: string, updates: Partial<SharedResourceBookingCreate>): Promise<SharedResourceBooking> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSharedResourceBookingNotFoundError(id);
    return data;
  }

  async deleteSharedResourceBooking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSharedResourceBookings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSharedResourceBookingsByResource(schoolId: string, resourceId: string): Promise<SharedResourceBooking[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('resource_id', resourceId);
    if (error) throw error;
    return data ?? [];
  }

  async findSharedResourceBookingsByCampus(schoolId: string, campusId: string): Promise<SharedResourceBooking[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSharedResourceBookings(schoolId: string): Promise<SharedResourceBooking[]> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateSharedResourceBookingStatus(schoolId: string, id: string, status: string): Promise<SharedResourceBooking> {
    const { data, error } = await this.supabase
      .from('gov_shared_resource_bookings')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSharedResourceBookingNotFoundError(id);
    return data;
  }

  async findCrossCampusUserById(schoolId: string, id: string): Promise<CrossCampusUser> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCrossCampusUserNotFoundError(id);
    return data;
  }

  async findAllCrossCampusUsers(schoolId: string): Promise<CrossCampusUser[]> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCrossCampusUser(schoolId: string, user: Partial<CrossCampusUserCreate>): Promise<CrossCampusUser> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .insert({ ...user, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCrossCampusUser(schoolId: string, id: string, updates: Partial<CrossCampusUserCreate>): Promise<CrossCampusUser> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCrossCampusUserNotFoundError(id);
    return data;
  }

  async deleteCrossCampusUser(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_cross_campus_users')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCrossCampusUsers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_cross_campus_users')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCrossCampusUsersByCampus(schoolId: string, campusId: string): Promise<CrossCampusUser[]> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCrossCampusUsers(schoolId: string): Promise<CrossCampusUser[]> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCrossCampusUsersByRole(schoolId: string, role: string): Promise<CrossCampusUser[]> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .select('*')
      .eq('school_id', schoolId)
      .eq('role', role);
    if (error) throw error;
    return data ?? [];
  }

  async updateCrossCampusUserStatus(schoolId: string, id: string, status: string): Promise<CrossCampusUser> {
    const { data, error } = await this.supabase
      .from('gov_cross_campus_users')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCrossCampusUserNotFoundError(id);
    return data;
  }

  async findCampusTransferById(schoolId: string, id: string): Promise<CampusTransfer> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCampusTransferNotFoundError(id);
    return data;
  }

  async findAllCampusTransfers(schoolId: string): Promise<CampusTransfer[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCampusTransfer(schoolId: string, transfer: Partial<CampusTransferCreate>): Promise<CampusTransfer> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .insert({ ...transfer, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCampusTransfer(schoolId: string, id: string, updates: Partial<CampusTransferCreate>): Promise<CampusTransfer> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusTransferNotFoundError(id);
    return data;
  }

  async deleteCampusTransfer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_campus_transfers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCampusTransfers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_campus_transfers')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCampusTransfersByStudent(schoolId: string, studentId: string): Promise<CampusTransfer[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingCampusTransfers(schoolId: string): Promise<CampusTransfer[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async findCampusTransfersByCampus(schoolId: string, campusId: string): Promise<CampusTransfer[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('from_campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async updateCampusTransferStatus(schoolId: string, id: string, status: string): Promise<CampusTransfer> {
    const { data, error } = await this.supabase
      .from('gov_campus_transfers')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusTransferNotFoundError(id);
    return data;
  }

  async findCentralizedAdministrationById(schoolId: string, id: string): Promise<CentralizedAdministration> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCentralizedAdministrationNotFoundError(id);
    return data;
  }

  async findAllCentralizedAdministrations(schoolId: string): Promise<CentralizedAdministration[]> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCentralizedAdministration(schoolId: string, admin: Partial<CentralizedAdministrationCreate>): Promise<CentralizedAdministration> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .insert({ ...admin, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCentralizedAdministration(schoolId: string, id: string, updates: Partial<CentralizedAdministrationCreate>): Promise<CentralizedAdministration> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCentralizedAdministrationNotFoundError(id);
    return data;
  }

  async deleteCentralizedAdministration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_centralized_administrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCentralizedAdministrations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_centralized_administrations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCentralizedAdministrationsByType(schoolId: string, type: string): Promise<CentralizedAdministration[]> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCentralizedAdministrations(schoolId: string): Promise<CentralizedAdministration[]> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCentralizedAdministrationsByCampus(schoolId: string, campusId: string): Promise<CentralizedAdministration[]> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async updateCentralizedAdministrationStatus(schoolId: string, id: string, status: string): Promise<CentralizedAdministration> {
    const { data, error } = await this.supabase
      .from('gov_centralized_administrations')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCentralizedAdministrationNotFoundError(id);
    return data;
  }

  async findCampusAnalyticsById(schoolId: string, id: string): Promise<CampusAnalytics> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCampusAnalyticsNotFoundError(id);
    return data;
  }

  async findAllCampusAnalytics(schoolId: string): Promise<CampusAnalytics[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCampusAnalytics(schoolId: string, analytics: Partial<CampusAnalyticsCreate>): Promise<CampusAnalytics> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .insert({ ...analytics, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCampusAnalytics(schoolId: string, id: string, updates: Partial<CampusAnalyticsCreate>): Promise<CampusAnalytics> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusAnalyticsNotFoundError(id);
    return data;
  }

  async deleteCampusAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_campus_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCampusAnalytics(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_campus_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCampusAnalyticsByCampus(schoolId: string, campusId: string): Promise<CampusAnalytics[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async findCampusAnalyticsByMetric(schoolId: string, metric: string): Promise<CampusAnalytics[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('metric', metric);
    if (error) throw error;
    return data ?? [];
  }

  async findCampusAnalyticsByPeriod(schoolId: string, period: string): Promise<CampusAnalytics[]> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('period', period);
    if (error) throw error;
    return data ?? [];
  }

  async updateCampusAnalyticsStatus(schoolId: string, id: string, status: string): Promise<CampusAnalytics> {
    const { data, error } = await this.supabase
      .from('gov_campus_analytics')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCampusAnalyticsNotFoundError(id);
    return data;
  }

  async findInterCampusCommunicationById(schoolId: string, id: string): Promise<InterCampusCommunication> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInterCampusCommunicationNotFoundError(id);
    return data;
  }

  async findAllInterCampusCommunications(schoolId: string): Promise<InterCampusCommunication[]> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInterCampusCommunication(schoolId: string, comm: Partial<InterCampusCommunicationCreate>): Promise<InterCampusCommunication> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .insert({ ...comm, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInterCampusCommunication(schoolId: string, id: string, updates: Partial<InterCampusCommunicationCreate>): Promise<InterCampusCommunication> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInterCampusCommunicationNotFoundError(id);
    return data;
  }

  async deleteInterCampusCommunication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inter_campus_communications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInterCampusCommunications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInterCampusCommunicationsByType(schoolId: string, type: string): Promise<InterCampusCommunication[]> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findInterCampusCommunicationsByCampus(schoolId: string, campusId: string): Promise<InterCampusCommunication[]> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('from_campus_id', campusId);
    if (error) throw error;
    return data ?? [];
  }

  async findUnreadInterCampusCommunications(schoolId: string, userId: string): Promise<InterCampusCommunication[]> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('recipient_id', userId)
      .eq('read', false);
    if (error) throw error;
    return data ?? [];
  }

  async updateInterCampusCommunicationStatus(schoolId: string, id: string, status: string): Promise<InterCampusCommunication> {
    const { data, error } = await this.supabase
      .from('gov_inter_campus_communications')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInterCampusCommunicationNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 4: EDUCATION NETWORKS
  // ═══════════════════════════════════════════════════════════════════════════════

  async findSchoolNetworkById(schoolId: string, id: string): Promise<SchoolNetwork> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolNetworkNotFoundError(id);
    return data;
  }

  async findAllSchoolNetworks(schoolId: string): Promise<SchoolNetwork[]> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSchoolNetwork(schoolId: string, network: Partial<SchoolNetworkCreate>): Promise<SchoolNetwork> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .insert({ ...network, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateSchoolNetwork(schoolId: string, id: string, updates: Partial<SchoolNetworkCreate>): Promise<SchoolNetwork> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolNetworkNotFoundError(id);
    return data;
  }

  async deleteSchoolNetwork(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_school_networks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolNetworks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_school_networks')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSchoolNetworksByType(schoolId: string, type: string): Promise<SchoolNetwork[]> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSchoolNetworks(schoolId: string): Promise<SchoolNetwork[]> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSchoolNetworkByName(schoolId: string, name: string): Promise<SchoolNetwork> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolNetworkNotFoundError(name);
    return data;
  }

  async updateSchoolNetworkStatus(schoolId: string, id: string, status: string): Promise<SchoolNetwork> {
    const { data, error } = await this.supabase
      .from('gov_school_networks')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolNetworkNotFoundError(id);
    return data;
  }

  async findNetworkMemberById(schoolId: string, id: string): Promise<NetworkMember> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNetworkMemberNotFoundError(id);
    return data;
  }

  async findAllNetworkMembers(schoolId: string): Promise<NetworkMember[]> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNetworkMember(schoolId: string, member: Partial<NetworkMemberCreate>): Promise<NetworkMember> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .insert({ ...member, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNetworkMember(schoolId: string, id: string, updates: Partial<NetworkMemberCreate>): Promise<NetworkMember> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNetworkMemberNotFoundError(id);
    return data;
  }

  async deleteNetworkMember(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_network_members')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNetworkMembers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_network_members')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNetworkMembersByNetwork(schoolId: string, networkId: string): Promise<NetworkMember[]> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .select('*')
      .eq('school_id', schoolId)
      .eq('network_id', networkId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNetworkMembers(schoolId: string): Promise<NetworkMember[]> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findNetworkMembersBySchool(schoolId: string, memberIdSchoolId: string): Promise<NetworkMember[]> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .select('*')
      .eq('school_id', schoolId)
      .eq('member_school_id', memberIdSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async updateNetworkMemberStatus(schoolId: string, id: string, status: string): Promise<NetworkMember> {
    const { data, error } = await this.supabase
      .from('gov_network_members')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNetworkMemberNotFoundError(id);
    return data;
  }

  async findSchoolChainById(schoolId: string, id: string): Promise<SchoolChain> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolChainNotFoundError(id);
    return data;
  }

  async findAllSchoolChains(schoolId: string): Promise<SchoolChain[]> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSchoolChain(schoolId: string, chain: Partial<SchoolChainCreate>): Promise<SchoolChain> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .insert({ ...chain, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateSchoolChain(schoolId: string, id: string, updates: Partial<SchoolChainCreate>): Promise<SchoolChain> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolChainNotFoundError(id);
    return data;
  }

  async deleteSchoolChain(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_school_chains')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolChains(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_school_chains')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSchoolChainsByType(schoolId: string, type: string): Promise<SchoolChain[]> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSchoolChains(schoolId: string): Promise<SchoolChain[]> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSchoolChainByName(schoolId: string, name: string): Promise<SchoolChain> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolChainNotFoundError(name);
    return data;
  }

  async updateSchoolChainStatus(schoolId: string, id: string, status: string): Promise<SchoolChain> {
    const { data, error } = await this.supabase
      .from('gov_school_chains')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolChainNotFoundError(id);
    return data;
  }

  async findSchoolFranchiseById(schoolId: string, id: string): Promise<SchoolFranchise> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolFranchiseNotFoundError(id);
    return data;
  }

  async findAllSchoolFranchises(schoolId: string): Promise<SchoolFranchise[]> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSchoolFranchise(schoolId: string, franchise: Partial<SchoolFranchiseCreate>): Promise<SchoolFranchise> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .insert({ ...franchise, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateSchoolFranchise(schoolId: string, id: string, updates: Partial<SchoolFranchiseCreate>): Promise<SchoolFranchise> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolFranchiseNotFoundError(id);
    return data;
  }

  async deleteSchoolFranchise(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_school_franchises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolFranchises(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_school_franchises')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSchoolFranchisesByCountry(schoolId: string, country: string): Promise<SchoolFranchise[]> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .select('*')
      .eq('school_id', schoolId)
      .eq('country', country);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSchoolFranchises(schoolId: string): Promise<SchoolFranchise[]> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSchoolFranchiseByName(schoolId: string, name: string): Promise<SchoolFranchise> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolFranchiseNotFoundError(name);
    return data;
  }

  async updateSchoolFranchiseStatus(schoolId: string, id: string, status: string): Promise<SchoolFranchise> {
    const { data, error } = await this.supabase
      .from('gov_school_franchises')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolFranchiseNotFoundError(id);
    return data;
  }

  async findReligiousSchoolGroupById(schoolId: string, id: string): Promise<ReligiousSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovReligiousSchoolGroupNotFoundError(id);
    return data;
  }

  async findAllReligiousSchoolGroups(schoolId: string): Promise<ReligiousSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createReligiousSchoolGroup(schoolId: string, group: Partial<ReligiousSchoolGroupCreate>): Promise<ReligiousSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .insert({ ...group, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateReligiousSchoolGroup(schoolId: string, id: string, updates: Partial<ReligiousSchoolGroupCreate>): Promise<ReligiousSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovReligiousSchoolGroupNotFoundError(id);
    return data;
  }

  async deleteReligiousSchoolGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_religious_school_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countReligiousSchoolGroups(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_religious_school_groups')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findReligiousSchoolGroupsByReligion(schoolId: string, religion: string): Promise<ReligiousSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('religion', religion);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveReligiousSchoolGroups(schoolId: string): Promise<ReligiousSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findReligiousSchoolGroupByName(schoolId: string, name: string): Promise<ReligiousSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovReligiousSchoolGroupNotFoundError(name);
    return data;
  }

  async updateReligiousSchoolGroupStatus(schoolId: string, id: string, status: string): Promise<ReligiousSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_religious_school_groups')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovReligiousSchoolGroupNotFoundError(id);
    return data;
  }

  async findPrivateSchoolGroupById(schoolId: string, id: string): Promise<PrivateSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovPrivateSchoolGroupNotFoundError(id);
    return data;
  }

  async findAllPrivateSchoolGroups(schoolId: string): Promise<PrivateSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createPrivateSchoolGroup(schoolId: string, group: Partial<PrivateSchoolGroupCreate>): Promise<PrivateSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .insert({ ...group, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updatePrivateSchoolGroup(schoolId: string, id: string, updates: Partial<PrivateSchoolGroupCreate>): Promise<PrivateSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovPrivateSchoolGroupNotFoundError(id);
    return data;
  }

  async deletePrivateSchoolGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_private_school_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPrivateSchoolGroups(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_private_school_groups')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findPrivateSchoolGroupsByType(schoolId: string, type: string): Promise<PrivateSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePrivateSchoolGroups(schoolId: string): Promise<PrivateSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPrivateSchoolGroupByName(schoolId: string, name: string): Promise<PrivateSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovPrivateSchoolGroupNotFoundError(name);
    return data;
  }

  async updatePrivateSchoolGroupStatus(schoolId: string, id: string, status: string): Promise<PrivateSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_private_school_groups')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovPrivateSchoolGroupNotFoundError(id);
    return data;
  }

  async findNgoSchoolGroupById(schoolId: string, id: string): Promise<NgoSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNgoSchoolGroupNotFoundError(id);
    return data;
  }

  async findAllNgoSchoolGroups(schoolId: string): Promise<NgoSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNgoSchoolGroup(schoolId: string, group: Partial<NgoSchoolGroupCreate>): Promise<NgoSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .insert({ ...group, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNgoSchoolGroup(schoolId: string, id: string, updates: Partial<NgoSchoolGroupCreate>): Promise<NgoSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNgoSchoolGroupNotFoundError(id);
    return data;
  }

  async deleteNgoSchoolGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_ngo_school_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNgoSchoolGroups(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNgoSchoolGroupsByFocusArea(schoolId: string, focusArea: string): Promise<NgoSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('focus_area', focusArea);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNgoSchoolGroups(schoolId: string): Promise<NgoSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findNgoSchoolGroupByName(schoolId: string, name: string): Promise<NgoSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNgoSchoolGroupNotFoundError(name);
    return data;
  }

  async updateNgoSchoolGroupStatus(schoolId: string, id: string, status: string): Promise<NgoSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_ngo_school_groups')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNgoSchoolGroupNotFoundError(id);
    return data;
  }

  async findInternationalSchoolGroupById(schoolId: string, id: string): Promise<InternationalSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInternationalSchoolGroupNotFoundError(id);
    return data;
  }

  async findAllInternationalSchoolGroups(schoolId: string): Promise<InternationalSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInternationalSchoolGroup(schoolId: string, group: Partial<InternationalSchoolGroupCreate>): Promise<InternationalSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .insert({ ...group, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInternationalSchoolGroup(schoolId: string, id: string, updates: Partial<InternationalSchoolGroupCreate>): Promise<InternationalSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInternationalSchoolGroupNotFoundError(id);
    return data;
  }

  async deleteInternationalSchoolGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_international_school_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInternationalSchoolGroups(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_international_school_groups')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInternationalSchoolGroupsByCountry(schoolId: string, country: string): Promise<InternationalSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('country', country);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInternationalSchoolGroups(schoolId: string): Promise<InternationalSchoolGroup[]> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInternationalSchoolGroupByName(schoolId: string, name: string): Promise<InternationalSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInternationalSchoolGroupNotFoundError(name);
    return data;
  }

  async updateInternationalSchoolGroupStatus(schoolId: string, id: string, status: string): Promise<InternationalSchoolGroup> {
    const { data, error } = await this.supabase
      .from('gov_international_school_groups')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInternationalSchoolGroupNotFoundError(id);
    return data;
  }

  async findNetworkAgreementById(schoolId: string, id: string): Promise<NetworkAgreement> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNetworkAgreementNotFoundError(id);
    return data;
  }

  async findAllNetworkAgreements(schoolId: string): Promise<NetworkAgreement[]> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNetworkAgreement(schoolId: string, agreement: Partial<NetworkAgreementCreate>): Promise<NetworkAgreement> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .insert({ ...agreement, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNetworkAgreement(schoolId: string, id: string, updates: Partial<NetworkAgreementCreate>): Promise<NetworkAgreement> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNetworkAgreementNotFoundError(id);
    return data;
  }

  async deleteNetworkAgreement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_network_agreements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNetworkAgreements(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_network_agreements')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNetworkAgreementsByNetwork(schoolId: string, networkId: string): Promise<NetworkAgreement[]> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .select('*')
      .eq('school_id', schoolId)
      .eq('network_id', networkId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNetworkAgreements(schoolId: string): Promise<NetworkAgreement[]> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findNetworkAgreementsByType(schoolId: string, type: string): Promise<NetworkAgreement[]> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateNetworkAgreementStatus(schoolId: string, id: string, status: string): Promise<NetworkAgreement> {
    const { data, error } = await this.supabase
      .from('gov_network_agreements')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNetworkAgreementNotFoundError(id);
    return data;
  }

  async findNetworkReportById(schoolId: string, id: string): Promise<NetworkReport> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNetworkReportNotFoundError(id);
    return data;
  }

  async findAllNetworkReports(schoolId: string): Promise<NetworkReport[]> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNetworkReport(schoolId: string, report: Partial<NetworkReportCreate>): Promise<NetworkReport> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .insert({ ...report, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNetworkReport(schoolId: string, id: string, updates: Partial<NetworkReportCreate>): Promise<NetworkReport> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNetworkReportNotFoundError(id);
    return data;
  }

  async deleteNetworkReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_network_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNetworkReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_network_reports')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNetworkReportsByNetwork(schoolId: string, networkId: string): Promise<NetworkReport[]> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('network_id', networkId);
    if (error) throw error;
    return data ?? [];
  }

  async findNetworkReportsByType(schoolId: string, type: string): Promise<NetworkReport[]> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNetworkReports(schoolId: string): Promise<NetworkReport[]> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateNetworkReportStatus(schoolId: string, id: string, status: string): Promise<NetworkReport> {
    const { data, error } = await this.supabase
      .from('gov_network_reports')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNetworkReportNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 5: NATIONAL EXAMINATIONS
  // ═══════════════════════════════════════════════════════════════════════════════

  async findNationalExamById(schoolId: string, id: string): Promise<NationalExam> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNationalExamNotFoundError(id);
    return data;
  }

  async findAllNationalExams(schoolId: string): Promise<NationalExam[]> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNationalExam(schoolId: string, exam: Partial<NationalExamCreate>): Promise<NationalExam> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .insert({ ...exam, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNationalExam(schoolId: string, id: string, updates: Partial<NationalExamCreate>): Promise<NationalExam> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalExamNotFoundError(id);
    return data;
  }

  async deleteNationalExam(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_national_exams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNationalExams(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_national_exams')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNationalExamsByType(schoolId: string, type: string): Promise<NationalExam[]> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNationalExams(schoolId: string): Promise<NationalExam[]> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findNationalExamsByAcademicYear(schoolId: string, academicYear: string): Promise<NationalExam[]> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .select('*')
      .eq('school_id', schoolId)
      .eq('academic_year', academicYear);
    if (error) throw error;
    return data ?? [];
  }

  async updateNationalExamStatus(schoolId: string, id: string, status: string): Promise<NationalExam> {
    const { data, error } = await this.supabase
      .from('gov_national_exams')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalExamNotFoundError(id);
    return data;
  }

  async findExamCenterById(schoolId: string, id: string): Promise<ExamCenter> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamCenterNotFoundError(id);
    return data;
  }

  async findAllExamCenters(schoolId: string): Promise<ExamCenter[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamCenter(schoolId: string, center: Partial<ExamCenterCreate>): Promise<ExamCenter> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .insert({ ...center, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamCenter(schoolId: string, id: string, updates: Partial<ExamCenterCreate>): Promise<ExamCenter> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamCenterNotFoundError(id);
    return data;
  }

  async deleteExamCenter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_centers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamCenters(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_centers')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamCentersByRegion(schoolId: string, regionId: string): Promise<ExamCenter[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveExamCenters(schoolId: string): Promise<ExamCenter[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findExamCenterByCode(schoolId: string, code: string): Promise<ExamCenter> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamCenterNotFoundError(code);
    return data;
  }

  async updateExamCenterStatus(schoolId: string, id: string, status: string): Promise<ExamCenter> {
    const { data, error } = await this.supabase
      .from('gov_exam_centers')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamCenterNotFoundError(id);
    return data;
  }

  async findExamCandidateById(schoolId: string, id: string): Promise<ExamCandidate> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamCandidateNotFoundError(id);
    return data;
  }

  async findAllExamCandidates(schoolId: string): Promise<ExamCandidate[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamCandidate(schoolId: string, candidate: Partial<ExamCandidateCreate>): Promise<ExamCandidate> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .insert({ ...candidate, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamCandidate(schoolId: string, id: string, updates: Partial<ExamCandidateCreate>): Promise<ExamCandidate> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamCandidateNotFoundError(id);
    return data;
  }

  async deleteExamCandidate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_candidates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamCandidates(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_candidates')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamCandidatesByExam(schoolId: string, examId: string): Promise<ExamCandidate[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async findExamCandidatesByCenter(schoolId: string, centerId: string): Promise<ExamCandidate[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('center_id', centerId);
    if (error) throw error;
    return data ?? [];
  }

  async findRegisteredExamCandidates(schoolId: string, examId: string): Promise<ExamCandidate[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId)
      .eq('status', 'registered');
    if (error) throw error;
    return data ?? [];
  }

  async updateExamCandidateStatus(schoolId: string, id: string, status: string): Promise<ExamCandidate> {
    const { data, error } = await this.supabase
      .from('gov_exam_candidates')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamCandidateNotFoundError(id);
    return data;
  }

  async findExamSupervisorById(schoolId: string, id: string): Promise<ExamSupervisor> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamSupervisorNotFoundError(id);
    return data;
  }

  async findAllExamSupervisors(schoolId: string): Promise<ExamSupervisor[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamSupervisor(schoolId: string, supervisor: Partial<ExamSupervisorCreate>): Promise<ExamSupervisor> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .insert({ ...supervisor, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamSupervisor(schoolId: string, id: string, updates: Partial<ExamSupervisorCreate>): Promise<ExamSupervisor> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamSupervisorNotFoundError(id);
    return data;
  }

  async deleteExamSupervisor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_supervisors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamSupervisors(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_supervisors')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamSupervisorsByCenter(schoolId: string, centerId: string): Promise<ExamSupervisor[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .select('*')
      .eq('school_id', schoolId)
      .eq('center_id', centerId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveExamSupervisors(schoolId: string): Promise<ExamSupervisor[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findExamSupervisorsByExam(schoolId: string, examId: string): Promise<ExamSupervisor[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async updateExamSupervisorStatus(schoolId: string, id: string, status: string): Promise<ExamSupervisor> {
    const { data, error } = await this.supabase
      .from('gov_exam_supervisors')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamSupervisorNotFoundError(id);
    return data;
  }

  async findExamSessionById(schoolId: string, id: string): Promise<ExamSession> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamSessionNotFoundError(id);
    return data;
  }

  async findAllExamSessions(schoolId: string): Promise<ExamSession[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamSession(schoolId: string, session: Partial<ExamSessionCreate>): Promise<ExamSession> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .insert({ ...session, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamSession(schoolId: string, id: string, updates: Partial<ExamSessionCreate>): Promise<ExamSession> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamSessionNotFoundError(id);
    return data;
  }

  async deleteExamSession(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_sessions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamSessions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamSessionsByExam(schoolId: string, examId: string): Promise<ExamSession[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async findExamSessionsByDate(schoolId: string, date: string): Promise<ExamSession[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveExamSessions(schoolId: string): Promise<ExamSession[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateExamSessionStatus(schoolId: string, id: string, status: string): Promise<ExamSession> {
    const { data, error } = await this.supabase
      .from('gov_exam_sessions')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamSessionNotFoundError(id);
    return data;
  }

  async findMarkingCenterById(schoolId: string, id: string): Promise<MarkingCenter> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovMarkingCenterNotFoundError(id);
    return data;
  }

  async findAllMarkingCenters(schoolId: string): Promise<MarkingCenter[]> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMarkingCenter(schoolId: string, center: Partial<MarkingCenterCreate>): Promise<MarkingCenter> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .insert({ ...center, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMarkingCenter(schoolId: string, id: string, updates: Partial<MarkingCenterCreate>): Promise<MarkingCenter> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMarkingCenterNotFoundError(id);
    return data;
  }

  async deleteMarkingCenter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_marking_centers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMarkingCenters(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_marking_centers')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMarkingCentersByRegion(schoolId: string, regionId: string): Promise<MarkingCenter[]> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMarkingCenters(schoolId: string): Promise<MarkingCenter[]> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMarkingCentersByExam(schoolId: string, examId: string): Promise<MarkingCenter[]> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async updateMarkingCenterStatus(schoolId: string, id: string, status: string): Promise<MarkingCenter> {
    const { data, error } = await this.supabase
      .from('gov_marking_centers')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovMarkingCenterNotFoundError(id);
    return data;
  }

  async findExamResultById(schoolId: string, id: string): Promise<ExamResult> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamResultNotFoundError(id);
    return data;
  }

  async findAllExamResults(schoolId: string): Promise<ExamResult[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamResult(schoolId: string, result: Partial<ExamResultCreate>): Promise<ExamResult> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .insert({ ...result, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamResult(schoolId: string, id: string, updates: Partial<ExamResultCreate>): Promise<ExamResult> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamResultNotFoundError(id);
    return data;
  }

  async deleteExamResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamResults(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_results')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamResultsByExam(schoolId: string, examId: string): Promise<ExamResult[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async findExamResultsByCandidate(schoolId: string, candidateId: string): Promise<ExamResult[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .select('*')
      .eq('school_id', schoolId)
      .eq('candidate_id', candidateId);
    if (error) throw error;
    return data ?? [];
  }

  async findPublishedExamResults(schoolId: string, examId: string): Promise<ExamResult[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId)
      .eq('published', true);
    if (error) throw error;
    return data ?? [];
  }

  async updateExamResultStatus(schoolId: string, id: string, status: string): Promise<ExamResult> {
    const { data, error } = await this.supabase
      .from('gov_exam_results')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamResultNotFoundError(id);
    return data;
  }

  async findCertificateById(schoolId: string, id: string): Promise<Certificate> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCertificateNotFoundError(id);
    return data;
  }

  async findAllCertificates(schoolId: string): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCertificate(schoolId: string, cert: Partial<CertificateCreate>): Promise<Certificate> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .insert({ ...cert, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCertificate(schoolId: string, id: string, updates: Partial<CertificateCreate>): Promise<Certificate> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCertificateNotFoundError(id);
    return data;
  }

  async deleteCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCertificates(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_certificates')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCertificatesByCandidate(schoolId: string, candidateId: string): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('candidate_id', candidateId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCertificates(schoolId: string): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCertificateByNumber(schoolId: string, number: string): Promise<Certificate> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .select('*')
      .eq('number', number)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCertificateNotFoundError(number);
    return data;
  }

  async updateCertificateStatus(schoolId: string, id: string, status: string): Promise<Certificate> {
    const { data, error } = await this.supabase
      .from('gov_certificates')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCertificateNotFoundError(id);
    return data;
  }

  async findDiplomaById(schoolId: string, id: string): Promise<Diploma> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDiplomaNotFoundError(id);
    return data;
  }

  async findAllDiplomas(schoolId: string): Promise<Diploma[]> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDiploma(schoolId: string, diploma: Partial<DiplomaCreate>): Promise<Diploma> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .insert({ ...diploma, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateDiploma(schoolId: string, id: string, updates: Partial<DiplomaCreate>): Promise<Diploma> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDiplomaNotFoundError(id);
    return data;
  }

  async deleteDiploma(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_diplomas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDiplomas(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_diplomas')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDiplomasByCandidate(schoolId: string, candidateId: string): Promise<Diploma[]> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .select('*')
      .eq('school_id', schoolId)
      .eq('candidate_id', candidateId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDiplomas(schoolId: string): Promise<Diploma[]> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDiplomaByNumber(schoolId: string, number: string): Promise<Diploma> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .select('*')
      .eq('number', number)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDiplomaNotFoundError(number);
    return data;
  }

  async updateDiplomaStatus(schoolId: string, id: string, status: string): Promise<Diploma> {
    const { data, error } = await this.supabase
      .from('gov_diplomas')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDiplomaNotFoundError(id);
    return data;
  }

  async findExamFraudById(schoolId: string, id: string): Promise<ExamFraud> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamFraudNotFoundError(id);
    return data;
  }

  async findAllExamFrauds(schoolId: string): Promise<ExamFraud[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamFraud(schoolId: string, fraud: Partial<ExamFraudCreate>): Promise<ExamFraud> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .insert({ ...fraud, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamFraud(schoolId: string, id: string, updates: Partial<ExamFraudCreate>): Promise<ExamFraud> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamFraudNotFoundError(id);
    return data;
  }

  async deleteExamFraud(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_frauds')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamFrauds(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_frauds')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamFraudsByExam(schoolId: string, examId: string): Promise<ExamFraud[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async findExamFraudsBySeverity(schoolId: string, severity: string): Promise<ExamFraud[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .select('*')
      .eq('school_id', schoolId)
      .eq('severity', severity);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingExamFrauds(schoolId: string): Promise<ExamFraud[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async updateExamFraudStatus(schoolId: string, id: string, status: string): Promise<ExamFraud> {
    const { data, error } = await this.supabase
      .from('gov_exam_frauds')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamFraudNotFoundError(id);
    return data;
  }

  async findExamAppealById(schoolId: string, id: string): Promise<ExamAppeal> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamAppealNotFoundError(id);
    return data;
  }

  async findAllExamAppeals(schoolId: string): Promise<ExamAppeal[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamAppeal(schoolId: string, appeal: Partial<ExamAppealCreate>): Promise<ExamAppeal> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .insert({ ...appeal, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamAppeal(schoolId: string, id: string, updates: Partial<ExamAppealCreate>): Promise<ExamAppeal> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamAppealNotFoundError(id);
    return data;
  }

  async deleteExamAppeal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_appeals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamAppeals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_appeals')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamAppealsByCandidate(schoolId: string, candidateId: string): Promise<ExamAppeal[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('candidate_id', candidateId);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingExamAppeals(schoolId: string): Promise<ExamAppeal[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async findExamAppealsByExam(schoolId: string, examId: string): Promise<ExamAppeal[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async updateExamAppealStatus(schoolId: string, id: string, status: string): Promise<ExamAppeal> {
    const { data, error } = await this.supabase
      .from('gov_exam_appeals')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamAppealNotFoundError(id);
    return data;
  }

  async findExamStatisticsById(schoolId: string, id: string): Promise<ExamStatistics> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExamStatisticsNotFoundError(id);
    return data;
  }

  async findAllExamStatistics(schoolId: string): Promise<ExamStatistics[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createExamStatistics(schoolId: string, stats: Partial<ExamStatisticsCreate>): Promise<ExamStatistics> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .insert({ ...stats, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateExamStatistics(schoolId: string, id: string, updates: Partial<ExamStatisticsCreate>): Promise<ExamStatistics> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamStatisticsNotFoundError(id);
    return data;
  }

  async deleteExamStatistics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exam_statistics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExamStatistics(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_exam_statistics')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExamStatisticsByExam(schoolId: string, examId: string): Promise<ExamStatistics[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('exam_id', examId);
    if (error) throw error;
    return data ?? [];
  }

  async findExamStatisticsByRegion(schoolId: string, regionId: string): Promise<ExamStatistics[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findExamStatisticsByYear(schoolId: string, year: number): Promise<ExamStatistics[]> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('year', year);
    if (error) throw error;
    return data ?? [];
  }

  async updateExamStatisticsStatus(schoolId: string, id: string, status: string): Promise<ExamStatistics> {
    const { data, error } = await this.supabase
      .from('gov_exam_statistics')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExamStatisticsNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 6: SCHOOL INSPECTION
  // ═══════════════════════════════════════════════════════════════════════════════

  async findInspectionMissionById(schoolId: string, id: string): Promise<InspectionMission> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectionMissionNotFoundError(id);
    return data;
  }

  async findAllInspectionMissions(schoolId: string): Promise<InspectionMission[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspectionMission(schoolId: string, mission: Partial<InspectionMissionCreate>): Promise<InspectionMission> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .insert({ ...mission, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspectionMission(schoolId: string, id: string, updates: Partial<InspectionMissionCreate>): Promise<InspectionMission> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionMissionNotFoundError(id);
    return data;
  }

  async deleteInspectionMission(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspection_missions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectionMissions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspection_missions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectionMissionsBySchool(schoolId: string, targetSchoolId: string): Promise<InspectionMission[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInspectionMissions(schoolId: string): Promise<InspectionMission[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInspectionMissionsByType(schoolId: string, type: string): Promise<InspectionMission[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateInspectionMissionStatus(schoolId: string, id: string, status: string): Promise<InspectionMission> {
    const { data, error } = await this.supabase
      .from('gov_inspection_missions')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionMissionNotFoundError(id);
    return data;
  }

  async findInspectionReportById(schoolId: string, id: string): Promise<InspectionReport> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectionReportNotFoundError(id);
    return data;
  }

  async findAllInspectionReports(schoolId: string): Promise<InspectionReport[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspectionReport(schoolId: string, report: Partial<InspectionReportCreate>): Promise<InspectionReport> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .insert({ ...report, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspectionReport(schoolId: string, id: string, updates: Partial<InspectionReportCreate>): Promise<InspectionReport> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionReportNotFoundError(id);
    return data;
  }

  async deleteInspectionReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspection_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectionReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspection_reports')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectionReportsByMission(schoolId: string, missionId: string): Promise<InspectionReport[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('mission_id', missionId);
    if (error) throw error;
    return data ?? [];
  }

  async findInspectionReportsBySchool(schoolId: string, targetSchoolId: string): Promise<InspectionReport[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInspectionReports(schoolId: string): Promise<InspectionReport[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateInspectionReportStatus(schoolId: string, id: string, status: string): Promise<InspectionReport> {
    const { data, error } = await this.supabase
      .from('gov_inspection_reports')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionReportNotFoundError(id);
    return data;
  }

  async findInspectionRecommendationById(schoolId: string, id: string): Promise<InspectionRecommendation> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectionRecommendationNotFoundError(id);
    return data;
  }

  async findAllInspectionRecommendations(schoolId: string): Promise<InspectionRecommendation[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspectionRecommendation(schoolId: string, rec: Partial<InspectionRecommendationCreate>): Promise<InspectionRecommendation> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .insert({ ...rec, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspectionRecommendation(schoolId: string, id: string, updates: Partial<InspectionRecommendationCreate>): Promise<InspectionRecommendation> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionRecommendationNotFoundError(id);
    return data;
  }

  async deleteInspectionRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspection_recommendations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectionRecommendations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectionRecommendationsByReport(schoolId: string, reportId: string): Promise<InspectionRecommendation[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('report_id', reportId);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingInspectionRecommendations(schoolId: string): Promise<InspectionRecommendation[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async findInspectionRecommendationsByPriority(schoolId: string, priority: string): Promise<InspectionRecommendation[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('priority', priority);
    if (error) throw error;
    return data ?? [];
  }

  async updateInspectionRecommendationStatus(schoolId: string, id: string, status: string): Promise<InspectionRecommendation> {
    const { data, error } = await this.supabase
      .from('gov_inspection_recommendations')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionRecommendationNotFoundError(id);
    return data;
  }

  async findSchoolComplianceById(schoolId: string, id: string): Promise<SchoolCompliance> {
    const { data, error } = await this.supabase
      .from('gov_school_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolComplianceNotFoundError(id);
    return data;
  }

  async findAllSchoolCompliances(schoolId: string): Promise<SchoolCompliance[]> {
    const { data, error } = await this.supabase
      .from('gov_school_compliances')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSchoolCompliance(schoolId: string, compliance: Partial<SchoolComplianceCreate>): Promise<SchoolCompliance> {
    const { data, error } = await this.supabase
      .from('gov_school_compliances')
      .insert({ ...compliance, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateSchoolCompliance(schoolId: string, id: string, updates: Partial<SchoolComplianceCreate>): Promise<SchoolCompliance> {
    const { data, error } = await this.supabase
      .from('gov_school_compliances')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolComplianceNotFoundError(id);
    return data;
  }

  async deleteSchoolCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_school_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolCompliances(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_school_compliances')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSchoolCompliancesByCategory(schoolId: string, category: string): Promise<SchoolCompliance[]> {
    const { data, error } = await this.supabase
      .from('gov_school_compliances')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findNonCompliantSchoolCompliances(schoolId: string): Promise<SchoolCompliance[]> {
    const { data, error } = await this.supabase
      .from('gov_school_compliances')
      .select('*')
      .eq('school_id', schoolId)
      .eq('compliant', false);
    if (error) throw error;
    return data ?? [];
  }

  async updateSchoolComplianceStatus(schoolId: string, id: string, status: string): Promise<SchoolCompliance> {
    const { data, error } = await this.supabase
      .from('gov_school_compliances')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolComplianceNotFoundError(id);
    return data;
  }

  async findCorrectiveActionById(schoolId: string, id: string): Promise<CorrectiveAction> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCorrectiveActionNotFoundError(id);
    return data;
  }

  async findAllCorrectiveActions(schoolId: string): Promise<CorrectiveAction[]> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCorrectiveAction(schoolId: string, action: Partial<CorrectiveActionCreate>): Promise<CorrectiveAction> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .insert({ ...action, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCorrectiveAction(schoolId: string, id: string, updates: Partial<CorrectiveActionCreate>): Promise<CorrectiveAction> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCorrectiveActionNotFoundError(id);
    return data;
  }

  async deleteCorrectiveAction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_corrective_actions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCorrectiveActions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_corrective_actions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCorrectiveActionsBySchool(schoolId: string, targetSchoolId: string): Promise<CorrectiveAction[]> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingCorrectiveActions(schoolId: string): Promise<CorrectiveAction[]> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async findOverdueCorrectiveActions(schoolId: string): Promise<CorrectiveAction[]> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'overdue');
    if (error) throw error;
    return data ?? [];
  }

  async updateCorrectiveActionStatus(schoolId: string, id: string, status: string): Promise<CorrectiveAction> {
    const { data, error } = await this.supabase
      .from('gov_corrective_actions')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCorrectiveActionNotFoundError(id);
    return data;
  }

  async findInspectionCalendarById(schoolId: string, id: string): Promise<InspectionCalendar> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectionCalendarNotFoundError(id);
    return data;
  }

  async findAllInspectionCalendars(schoolId: string): Promise<InspectionCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspectionCalendar(schoolId: string, calendar: Partial<InspectionCalendarCreate>): Promise<InspectionCalendar> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .insert({ ...calendar, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspectionCalendar(schoolId: string, id: string, updates: Partial<InspectionCalendarCreate>): Promise<InspectionCalendar> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionCalendarNotFoundError(id);
    return data;
  }

  async deleteInspectionCalendar(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspection_calendars')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectionCalendars(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspection_calendars')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectionCalendarsByRegion(schoolId: string, regionId: string): Promise<InspectionCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInspectionCalendars(schoolId: string): Promise<InspectionCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInspectionCalendarsByType(schoolId: string, type: string): Promise<InspectionCalendar[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateInspectionCalendarStatus(schoolId: string, id: string, status: string): Promise<InspectionCalendar> {
    const { data, error } = await this.supabase
      .from('gov_inspection_calendars')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionCalendarNotFoundError(id);
    return data;
  }

  async findSchoolRatingById(schoolId: string, id: string): Promise<SchoolRating> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolRatingNotFoundError(id);
    return data;
  }

  async findAllSchoolRatings(schoolId: string): Promise<SchoolRating[]> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSchoolRating(schoolId: string, rating: Partial<SchoolRatingCreate>): Promise<SchoolRating> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .insert({ ...rating, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateSchoolRating(schoolId: string, id: string, updates: Partial<SchoolRatingCreate>): Promise<SchoolRating> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolRatingNotFoundError(id);
    return data;
  }

  async deleteSchoolRating(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_school_ratings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolRatings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_school_ratings')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSchoolRatingsBySchool(schoolId: string, targetSchoolId: string): Promise<SchoolRating[]> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findLatestSchoolRating(schoolId: string, targetSchoolId: string): Promise<SchoolRating> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error) throw new GovSchoolRatingNotFoundError(targetSchoolId);
    return data;
  }

  async findSchoolRatingsByPeriod(schoolId: string, period: string): Promise<SchoolRating[]> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('period', period);
    if (error) throw error;
    return data ?? [];
  }

  async updateSchoolRatingStatus(schoolId: string, id: string, status: string): Promise<SchoolRating> {
    const { data, error } = await this.supabase
      .from('gov_school_ratings')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolRatingNotFoundError(id);
    return data;
  }

  async findInspectionChecklistById(schoolId: string, id: string): Promise<InspectionChecklist> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectionChecklistNotFoundError(id);
    return data;
  }

  async findAllInspectionChecklists(schoolId: string): Promise<InspectionChecklist[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspectionChecklist(schoolId: string, checklist: Partial<InspectionChecklistCreate>): Promise<InspectionChecklist> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .insert({ ...checklist, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspectionChecklist(schoolId: string, id: string, updates: Partial<InspectionChecklistCreate>): Promise<InspectionChecklist> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionChecklistNotFoundError(id);
    return data;
  }

  async deleteInspectionChecklist(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspection_checklists')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectionChecklists(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspection_checklists')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectionChecklistsByType(schoolId: string, type: string): Promise<InspectionChecklist[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInspectionChecklists(schoolId: string): Promise<InspectionChecklist[]> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInspectionChecklistsByName(schoolId: string, name: string): Promise<InspectionChecklist> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectionChecklistNotFoundError(name);
    return data;
  }

  async updateInspectionChecklistStatus(schoolId: string, id: string, status: string): Promise<InspectionChecklist> {
    const { data, error } = await this.supabase
      .from('gov_inspection_checklists')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectionChecklistNotFoundError(id);
    return data;
  }

  async findInspectorPerformanceById(schoolId: string, id: string): Promise<InspectorPerformance> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInspectorPerformanceNotFoundError(id);
    return data;
  }

  async findAllInspectorPerformances(schoolId: string): Promise<InspectorPerformance[]> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInspectorPerformance(schoolId: string, perf: Partial<InspectorPerformanceCreate>): Promise<InspectorPerformance> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .insert({ ...perf, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInspectorPerformance(schoolId: string, id: string, updates: Partial<InspectorPerformanceCreate>): Promise<InspectorPerformance> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectorPerformanceNotFoundError(id);
    return data;
  }

  async deleteInspectorPerformance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_inspector_performances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInspectorPerformances(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_inspector_performances')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInspectorPerformancesByInspector(schoolId: string, inspectorId: string): Promise<InspectorPerformance[]> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .select('*')
      .eq('school_id', schoolId)
      .eq('inspector_id', inspectorId);
    if (error) throw error;
    return data ?? [];
  }

  async findInspectorPerformancesByPeriod(schoolId: string, period: string): Promise<InspectorPerformance[]> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .select('*')
      .eq('school_id', schoolId)
      .eq('period', period);
    if (error) throw error;
    return data ?? [];
  }

  async findInspectorPerformancesByRating(schoolId: string, rating: string): Promise<InspectorPerformance[]> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .select('*')
      .eq('school_id', schoolId)
      .eq('rating', rating);
    if (error) throw error;
    return data ?? [];
  }

  async updateInspectorPerformanceStatus(schoolId: string, id: string, status: string): Promise<InspectorPerformance> {
    const { data, error } = await this.supabase
      .from('gov_inspector_performances')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInspectorPerformanceNotFoundError(id);
    return data;
  }

  async findComplianceTrendById(schoolId: string, id: string): Promise<ComplianceTrend> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovComplianceTrendNotFoundError(id);
    return data;
  }

  async findAllComplianceTrends(schoolId: string): Promise<ComplianceTrend[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createComplianceTrend(schoolId: string, trend: Partial<ComplianceTrendCreate>): Promise<ComplianceTrend> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .insert({ ...trend, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateComplianceTrend(schoolId: string, id: string, updates: Partial<ComplianceTrendCreate>): Promise<ComplianceTrend> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceTrendNotFoundError(id);
    return data;
  }

  async deleteComplianceTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_compliance_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countComplianceTrends(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_compliance_trends')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findComplianceTrendsBySchool(schoolId: string, targetSchoolId: string): Promise<ComplianceTrend[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findComplianceTrendsByPeriod(schoolId: string, period: string): Promise<ComplianceTrend[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .select('*')
      .eq('school_id', schoolId)
      .eq('period', period);
    if (error) throw error;
    return data ?? [];
  }

  async findComplianceTrendsByCategory(schoolId: string, category: string): Promise<ComplianceTrend[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async updateComplianceTrendStatus(schoolId: string, id: string, status: string): Promise<ComplianceTrend> {
    const { data, error } = await this.supabase
      .from('gov_compliance_trends')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceTrendNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 7: SCHOOL ACCREDITATION
  // ═══════════════════════════════════════════════════════════════════════════════

  async findAccreditationById(schoolId: string, id: string): Promise<Accreditation> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovAccreditationNotFoundError(id);
    return data;
  }

  async findAllAccreditations(schoolId: string): Promise<Accreditation[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAccreditation(schoolId: string, accreditation: Partial<AccreditationCreate>): Promise<Accreditation> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .insert({ ...accreditation, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAccreditation(schoolId: string, id: string, updates: Partial<AccreditationCreate>): Promise<Accreditation> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationNotFoundError(id);
    return data;
  }

  async deleteAccreditation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_accreditations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAccreditations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_accreditations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAccreditationsBySchool(schoolId: string, targetSchoolId: string): Promise<Accreditation[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAccreditations(schoolId: string): Promise<Accreditation[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAccreditationsByType(schoolId: string, type: string): Promise<Accreditation[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateAccreditationStatus(schoolId: string, id: string, status: string): Promise<Accreditation> {
    const { data, error } = await this.supabase
      .from('gov_accreditations')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationNotFoundError(id);
    return data;
  }

  async findAccreditationStandardById(schoolId: string, id: string): Promise<AccreditationStandard> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovAccreditationStandardNotFoundError(id);
    return data;
  }

  async findAllAccreditationStandards(schoolId: string): Promise<AccreditationStandard[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAccreditationStandard(schoolId: string, standard: Partial<AccreditationStandardCreate>): Promise<AccreditationStandard> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .insert({ ...standard, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAccreditationStandard(schoolId: string, id: string, updates: Partial<AccreditationStandardCreate>): Promise<AccreditationStandard> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationStandardNotFoundError(id);
    return data;
  }

  async deleteAccreditationStandard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_accreditation_standards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAccreditationStandards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_accreditation_standards')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAccreditationStandardsByCategory(schoolId: string, category: string): Promise<AccreditationStandard[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAccreditationStandards(schoolId: string): Promise<AccreditationStandard[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAccreditationStandardByCode(schoolId: string, code: string): Promise<AccreditationStandard> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovAccreditationStandardNotFoundError(code);
    return data;
  }

  async updateAccreditationStandardStatus(schoolId: string, id: string, status: string): Promise<AccreditationStandard> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_standards')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationStandardNotFoundError(id);
    return data;
  }

  async findAccreditationAssessmentById(schoolId: string, id: string): Promise<AccreditationAssessment> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovAccreditationAssessmentNotFoundError(id);
    return data;
  }

  async findAllAccreditationAssessments(schoolId: string): Promise<AccreditationAssessment[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAccreditationAssessment(schoolId: string, assessment: Partial<AccreditationAssessmentCreate>): Promise<AccreditationAssessment> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .insert({ ...assessment, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAccreditationAssessment(schoolId: string, id: string, updates: Partial<AccreditationAssessmentCreate>): Promise<AccreditationAssessment> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationAssessmentNotFoundError(id);
    return data;
  }

  async deleteAccreditationAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_accreditation_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAccreditationAssessments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAccreditationAssessmentsBySchool(schoolId: string, targetSchoolId: string): Promise<AccreditationAssessment[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingAccreditationAssessments(schoolId: string): Promise<AccreditationAssessment[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async findAccreditationAssessmentsByStandard(schoolId: string, standardId: string): Promise<AccreditationAssessment[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('standard_id', standardId);
    if (error) throw error;
    return data ?? [];
  }

  async updateAccreditationAssessmentStatus(schoolId: string, id: string, status: string): Promise<AccreditationAssessment> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_assessments')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationAssessmentNotFoundError(id);
    return data;
  }

  async findCertificationById(schoolId: string, id: string): Promise<Certification> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCertificationNotFoundError(id);
    return data;
  }

  async findAllCertifications(schoolId: string): Promise<Certification[]> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCertification(schoolId: string, cert: Partial<CertificationCreate>): Promise<Certification> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .insert({ ...cert, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCertification(schoolId: string, id: string, updates: Partial<CertificationCreate>): Promise<Certification> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCertificationNotFoundError(id);
    return data;
  }

  async deleteCertification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_certifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCertifications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_certifications')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCertificationsBySchool(schoolId: string, targetSchoolId: string): Promise<Certification[]> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCertifications(schoolId: string): Promise<Certification[]> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCertificationsByType(schoolId: string, type: string): Promise<Certification[]> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateCertificationStatus(schoolId: string, id: string, status: string): Promise<Certification> {
    const { data, error } = await this.supabase
      .from('gov_certifications')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCertificationNotFoundError(id);
    return data;
  }

  async findRenewalById(schoolId: string, id: string): Promise<Renewal> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRenewalNotFoundError(id);
    return data;
  }

  async findAllRenewals(schoolId: string): Promise<Renewal[]> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRenewal(schoolId: string, renewal: Partial<RenewalCreate>): Promise<Renewal> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .insert({ ...renewal, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRenewal(schoolId: string, id: string, updates: Partial<RenewalCreate>): Promise<Renewal> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRenewalNotFoundError(id);
    return data;
  }

  async deleteRenewal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_renewals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRenewals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_renewals')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRenewalsBySchool(schoolId: string, targetSchoolId: string): Promise<Renewal[]> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingRenewals(schoolId: string): Promise<Renewal[]> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async findOverdueRenewals(schoolId: string): Promise<Renewal[]> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'overdue');
    if (error) throw error;
    return data ?? [];
  }

  async updateRenewalStatus(schoolId: string, id: string, status: string): Promise<Renewal> {
    const { data, error } = await this.supabase
      .from('gov_renewals')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRenewalNotFoundError(id);
    return data;
  }

  async findQualityAuditById(schoolId: string, id: string): Promise<QualityAudit> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovQualityAuditNotFoundError(id);
    return data;
  }

  async findAllQualityAudits(schoolId: string): Promise<QualityAudit[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createQualityAudit(schoolId: string, audit: Partial<QualityAuditCreate>): Promise<QualityAudit> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .insert({ ...audit, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateQualityAudit(schoolId: string, id: string, updates: Partial<QualityAuditCreate>): Promise<QualityAudit> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovQualityAuditNotFoundError(id);
    return data;
  }

  async deleteQualityAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_quality_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countQualityAudits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_quality_audits')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findQualityAuditsBySchool(schoolId: string, targetSchoolId: string): Promise<QualityAudit[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingQualityAudits(schoolId: string): Promise<QualityAudit[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async findQualityAuditsByType(schoolId: string, type: string): Promise<QualityAudit[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateQualityAuditStatus(schoolId: string, id: string, status: string): Promise<QualityAudit> {
    const { data, error } = await this.supabase
      .from('gov_quality_audits')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovQualityAuditNotFoundError(id);
    return data;
  }

  async findComplianceRuleById(schoolId: string, id: string): Promise<ComplianceRule> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovComplianceRuleNotFoundError(id);
    return data;
  }

  async findAllComplianceRules(schoolId: string): Promise<ComplianceRule[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createComplianceRule(schoolId: string, rule: Partial<ComplianceRuleCreate>): Promise<ComplianceRule> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .insert({ ...rule, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateComplianceRule(schoolId: string, id: string, updates: Partial<ComplianceRuleCreate>): Promise<ComplianceRule> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceRuleNotFoundError(id);
    return data;
  }

  async deleteComplianceRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_compliance_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countComplianceRules(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_compliance_rules')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findComplianceRulesByCategory(schoolId: string, category: string): Promise<ComplianceRule[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveComplianceRules(schoolId: string): Promise<ComplianceRule[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findComplianceRuleByCode(schoolId: string, code: string): Promise<ComplianceRule> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovComplianceRuleNotFoundError(code);
    return data;
  }

  async updateComplianceRuleStatus(schoolId: string, id: string, status: string): Promise<ComplianceRule> {
    const { data, error } = await this.supabase
      .from('gov_compliance_rules')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceRuleNotFoundError(id);
    return data;
  }

  async findQualityIndicatorById(schoolId: string, id: string): Promise<QualityIndicator> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovQualityIndicatorNotFoundError(id);
    return data;
  }

  async findAllQualityIndicators(schoolId: string): Promise<QualityIndicator[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createQualityIndicator(schoolId: string, indicator: Partial<QualityIndicatorCreate>): Promise<QualityIndicator> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .insert({ ...indicator, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateQualityIndicator(schoolId: string, id: string, updates: Partial<QualityIndicatorCreate>): Promise<QualityIndicator> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovQualityIndicatorNotFoundError(id);
    return data;
  }

  async deleteQualityIndicator(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_quality_indicators')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countQualityIndicators(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_quality_indicators')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findQualityIndicatorsByCategory(schoolId: string, category: string): Promise<QualityIndicator[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveQualityIndicators(schoolId: string): Promise<QualityIndicator[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findQualityIndicatorsBySchool(schoolId: string, targetSchoolId: string): Promise<QualityIndicator[]> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async updateQualityIndicatorStatus(schoolId: string, id: string, status: string): Promise<QualityIndicator> {
    const { data, error } = await this.supabase
      .from('gov_quality_indicators')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovQualityIndicatorNotFoundError(id);
    return data;
  }

  async findAccreditationDocumentById(schoolId: string, id: string): Promise<AccreditationDocument> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovAccreditationDocumentNotFoundError(id);
    return data;
  }

  async findAllAccreditationDocuments(schoolId: string): Promise<AccreditationDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAccreditationDocument(schoolId: string, doc: Partial<AccreditationDocumentCreate>): Promise<AccreditationDocument> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .insert({ ...doc, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAccreditationDocument(schoolId: string, id: string, updates: Partial<AccreditationDocumentCreate>): Promise<AccreditationDocument> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationDocumentNotFoundError(id);
    return data;
  }

  async deleteAccreditationDocument(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_accreditation_documents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAccreditationDocuments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_accreditation_documents')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAccreditationDocumentsBySchool(schoolId: string, targetSchoolId: string): Promise<AccreditationDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAccreditationDocumentsByType(schoolId: string, type: string): Promise<AccreditationDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingAccreditationDocuments(schoolId: string): Promise<AccreditationDocument[]> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async updateAccreditationDocumentStatus(schoolId: string, id: string, status: string): Promise<AccreditationDocument> {
    const { data, error } = await this.supabase
      .from('gov_accreditation_documents')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAccreditationDocumentNotFoundError(id);
    return data;
  }

  async findAuditFindingById(schoolId: string, id: string): Promise<AuditFinding> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovAuditFindingNotFoundError(id);
    return data;
  }

  async findAllAuditFindings(schoolId: string): Promise<AuditFinding[]> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAuditFinding(schoolId: string, finding: Partial<AuditFindingCreate>): Promise<AuditFinding> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .insert({ ...finding, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAuditFinding(schoolId: string, id: string, updates: Partial<AuditFindingCreate>): Promise<AuditFinding> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAuditFindingNotFoundError(id);
    return data;
  }

  async deleteAuditFinding(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_audit_findings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAuditFindings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_audit_findings')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAuditFindingsByAudit(schoolId: string, auditId: string): Promise<AuditFinding[]> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('audit_id', auditId);
    if (error) throw error;
    return data ?? [];
  }

  async findOpenAuditFindings(schoolId: string): Promise<AuditFinding[]> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'open');
    if (error) throw error;
    return data ?? [];
  }

  async findAuditFindingsBySeverity(schoolId: string, severity: string): Promise<AuditFinding[]> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('severity', severity);
    if (error) throw error;
    return data ?? [];
  }

  async updateAuditFindingStatus(schoolId: string, id: string, status: string): Promise<AuditFinding> {
    const { data, error } = await this.supabase
      .from('gov_audit_findings')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovAuditFindingNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 8: EDUCATION ANALYTICS
  // ═══════════════════════════════════════════════════════════════════════════════

  async findEducationKpiById(schoolId: string, id: string): Promise<EducationKpi> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationKpiNotFoundError(id);
    return data;
  }

  async findAllEducationKpis(schoolId: string): Promise<EducationKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEducationKpi(schoolId: string, kpi: Partial<EducationKpiCreate>): Promise<EducationKpi> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .insert({ ...kpi, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEducationKpi(schoolId: string, id: string, updates: Partial<EducationKpiCreate>): Promise<EducationKpi> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationKpiNotFoundError(id);
    return data;
  }

  async deleteEducationKpi(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationKpis(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_education_kpis')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEducationKpisByCategory(schoolId: string, category: string): Promise<EducationKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEducationKpis(schoolId: string): Promise<EducationKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEducationKpisByRegion(schoolId: string, regionId: string): Promise<EducationKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async updateEducationKpiStatus(schoolId: string, id: string, status: string): Promise<EducationKpi> {
    const { data, error } = await this.supabase
      .from('gov_education_kpis')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationKpiNotFoundError(id);
    return data;
  }

  async findRegionalAnalyticsKpiById(schoolId: string, id: string): Promise<RegionalAnalyticsKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return data;
  }

  async findAllRegionalAnalyticsKpis(schoolId: string): Promise<RegionalAnalyticsKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRegionalAnalyticsKpi(schoolId: string, kpi: Partial<RegionalAnalyticsKpiCreate>): Promise<RegionalAnalyticsKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .insert({ ...kpi, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRegionalAnalyticsKpi(schoolId: string, id: string, updates: Partial<RegionalAnalyticsKpiCreate>): Promise<RegionalAnalyticsKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return data;
  }

  async deleteRegionalAnalyticsKpi(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegionalAnalyticsKpis(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRegionalAnalyticsKpisByRegion(schoolId: string, regionId: string): Promise<RegionalAnalyticsKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRegionalAnalyticsKpis(schoolId: string): Promise<RegionalAnalyticsKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRegionalAnalyticsKpisByCategory(schoolId: string, category: string): Promise<RegionalAnalyticsKpi[]> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async updateRegionalAnalyticsKpiStatus(schoolId: string, id: string, status: string): Promise<RegionalAnalyticsKpi> {
    const { data, error } = await this.supabase
      .from('gov_regional_analytics_kpis')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return data;
  }

  async findNationalDashboardById(schoolId: string, id: string): Promise<NationalDashboard> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNationalDashboardNotFoundError(id);
    return data;
  }

  async findAllNationalDashboards(schoolId: string): Promise<NationalDashboard[]> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNationalDashboard(schoolId: string, dashboard: Partial<NationalDashboardCreate>): Promise<NationalDashboard> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .insert({ ...dashboard, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNationalDashboard(schoolId: string, id: string, updates: Partial<NationalDashboardCreate>): Promise<NationalDashboard> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalDashboardNotFoundError(id);
    return data;
  }

  async deleteNationalDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_national_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNationalDashboards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_national_dashboards')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNationalDashboardsByType(schoolId: string, type: string): Promise<NationalDashboard[]> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveNationalDashboards(schoolId: string): Promise<NationalDashboard[]> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findNationalDashboardByName(schoolId: string, name: string): Promise<NationalDashboard> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNationalDashboardNotFoundError(name);
    return data;
  }

  async updateNationalDashboardStatus(schoolId: string, id: string, status: string): Promise<NationalDashboard> {
    const { data, error } = await this.supabase
      .from('gov_national_dashboards')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalDashboardNotFoundError(id);
    return data;
  }

  async findDashboardWidgetById(schoolId: string, id: string): Promise<DashboardWidget> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDashboardWidgetNotFoundError(id);
    return data;
  }

  async findAllDashboardWidgets(schoolId: string): Promise<DashboardWidget[]> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDashboardWidget(schoolId: string, widget: Partial<DashboardWidgetCreate>): Promise<DashboardWidget> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .insert({ ...widget, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateDashboardWidget(schoolId: string, id: string, updates: Partial<DashboardWidgetCreate>): Promise<DashboardWidget> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDashboardWidgetNotFoundError(id);
    return data;
  }

  async deleteDashboardWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_dashboard_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDashboardWidgets(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDashboardWidgetsByDashboard(schoolId: string, dashboardId: string): Promise<DashboardWidget[]> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .select('*')
      .eq('school_id', schoolId)
      .eq('dashboard_id', dashboardId);
    if (error) throw error;
    return data ?? [];
  }

  async findDashboardWidgetsByType(schoolId: string, type: string): Promise<DashboardWidget[]> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDashboardWidgets(schoolId: string): Promise<DashboardWidget[]> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async updateDashboardWidgetStatus(schoolId: string, id: string, status: string): Promise<DashboardWidget> {
    const { data, error } = await this.supabase
      .from('gov_dashboard_widgets')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDashboardWidgetNotFoundError(id);
    return data;
  }

  async findPredictiveAnalyticById(schoolId: string, id: string): Promise<PredictiveAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovPredictiveAnalyticNotFoundError(id);
    return data;
  }

  async findAllPredictiveAnalytics(schoolId: string): Promise<PredictiveAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createPredictiveAnalytic(schoolId: string, analytic: Partial<PredictiveAnalyticCreate>): Promise<PredictiveAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .insert({ ...analytic, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updatePredictiveAnalytic(schoolId: string, id: string, updates: Partial<PredictiveAnalyticCreate>): Promise<PredictiveAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovPredictiveAnalyticNotFoundError(id);
    return data;
  }

  async deletePredictiveAnalytic(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_predictive_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPredictiveAnalytics(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_predictive_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findPredictiveAnalyticsByType(schoolId: string, type: string): Promise<PredictiveAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePredictiveAnalytics(schoolId: string): Promise<PredictiveAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPredictiveAnalyticsByRegion(schoolId: string, regionId: string): Promise<PredictiveAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async updatePredictiveAnalyticStatus(schoolId: string, id: string, status: string): Promise<PredictiveAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_predictive_analytics')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovPredictiveAnalyticNotFoundError(id);
    return data;
  }

  async findDropoutMapById(schoolId: string, id: string): Promise<DropoutMap> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDropoutMapNotFoundError(id);
    return data;
  }

  async findAllDropoutMaps(schoolId: string): Promise<DropoutMap[]> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDropoutMap(schoolId: string, map: Partial<DropoutMapCreate>): Promise<DropoutMap> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .insert({ ...map, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateDropoutMap(schoolId: string, id: string, updates: Partial<DropoutMapCreate>): Promise<DropoutMap> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDropoutMapNotFoundError(id);
    return data;
  }

  async deleteDropoutMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_dropout_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDropoutMaps(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_dropout_maps')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDropoutMapsByRegion(schoolId: string, regionId: string): Promise<DropoutMap[]> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDropoutMaps(schoolId: string): Promise<DropoutMap[]> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDropoutMapsByYear(schoolId: string, year: number): Promise<DropoutMap[]> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .select('*')
      .eq('school_id', schoolId)
      .eq('year', year);
    if (error) throw error;
    return data ?? [];
  }

  async updateDropoutMapStatus(schoolId: string, id: string, status: string): Promise<DropoutMap> {
    const { data, error } = await this.supabase
      .from('gov_dropout_maps')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDropoutMapNotFoundError(id);
    return data;
  }

  async findInfrastructureMapById(schoolId: string, id: string): Promise<InfrastructureMap> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInfrastructureMapNotFoundError(id);
    return data;
  }

  async findAllInfrastructureMaps(schoolId: string): Promise<InfrastructureMap[]> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createInfrastructureMap(schoolId: string, map: Partial<InfrastructureMapCreate>): Promise<InfrastructureMap> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .insert({ ...map, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateInfrastructureMap(schoolId: string, id: string, updates: Partial<InfrastructureMapCreate>): Promise<InfrastructureMap> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInfrastructureMapNotFoundError(id);
    return data;
  }

  async deleteInfrastructureMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_infrastructure_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInfrastructureMaps(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findInfrastructureMapsByRegion(schoolId: string, regionId: string): Promise<InfrastructureMap[]> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInfrastructureMaps(schoolId: string): Promise<InfrastructureMap[]> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInfrastructureMapsByType(schoolId: string, type: string): Promise<InfrastructureMap[]> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async updateInfrastructureMapStatus(schoolId: string, id: string, status: string): Promise<InfrastructureMap> {
    const { data, error } = await this.supabase
      .from('gov_infrastructure_maps')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInfrastructureMapNotFoundError(id);
    return data;
  }

  async findTeacherDistributionById(schoolId: string, id: string): Promise<TeacherDistribution> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovTeacherDistributionNotFoundError(id);
    return data;
  }

  async findAllTeacherDistributions(schoolId: string): Promise<TeacherDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createTeacherDistribution(schoolId: string, dist: Partial<TeacherDistributionCreate>): Promise<TeacherDistribution> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .insert({ ...dist, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateTeacherDistribution(schoolId: string, id: string, updates: Partial<TeacherDistributionCreate>): Promise<TeacherDistribution> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovTeacherDistributionNotFoundError(id);
    return data;
  }

  async deleteTeacherDistribution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_teacher_distributions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTeacherDistributions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_teacher_distributions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findTeacherDistributionsByRegion(schoolId: string, regionId: string): Promise<TeacherDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTeacherDistributions(schoolId: string): Promise<TeacherDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTeacherDistributionsBySubject(schoolId: string, subject: string): Promise<TeacherDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('subject', subject);
    if (error) throw error;
    return data ?? [];
  }

  async updateTeacherDistributionStatus(schoolId: string, id: string, status: string): Promise<TeacherDistribution> {
    const { data, error } = await this.supabase
      .from('gov_teacher_distributions')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovTeacherDistributionNotFoundError(id);
    return data;
  }

  async findStudentDistributionById(schoolId: string, id: string): Promise<StudentDistribution> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovStudentDistributionNotFoundError(id);
    return data;
  }

  async findAllStudentDistributions(schoolId: string): Promise<StudentDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createStudentDistribution(schoolId: string, dist: Partial<StudentDistributionCreate>): Promise<StudentDistribution> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .insert({ ...dist, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateStudentDistribution(schoolId: string, id: string, updates: Partial<StudentDistributionCreate>): Promise<StudentDistribution> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovStudentDistributionNotFoundError(id);
    return data;
  }

  async deleteStudentDistribution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_student_distributions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countStudentDistributions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_student_distributions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findStudentDistributionsByRegion(schoolId: string, regionId: string): Promise<StudentDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveStudentDistributions(schoolId: string): Promise<StudentDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findStudentDistributionsByLevel(schoolId: string, level: string): Promise<StudentDistribution[]> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('level', level);
    if (error) throw error;
    return data ?? [];
  }

  async updateStudentDistributionStatus(schoolId: string, id: string, status: string): Promise<StudentDistribution> {
    const { data, error } = await this.supabase
      .from('gov_student_distributions')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovStudentDistributionNotFoundError(id);
    return data;
  }

  async findBudgetAnalyticById(schoolId: string, id: string): Promise<BudgetAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovBudgetAnalyticNotFoundError(id);
    return data;
  }

  async findAllBudgetAnalytics(schoolId: string): Promise<BudgetAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBudgetAnalytic(schoolId: string, analytic: Partial<BudgetAnalyticCreate>): Promise<BudgetAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .insert({ ...analytic, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBudgetAnalytic(schoolId: string, id: string, updates: Partial<BudgetAnalyticCreate>): Promise<BudgetAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovBudgetAnalyticNotFoundError(id);
    return data;
  }

  async deleteBudgetAnalytic(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_budget_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countBudgetAnalytics(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_budget_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBudgetAnalyticsByRegion(schoolId: string, regionId: string): Promise<BudgetAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBudgetAnalytics(schoolId: string): Promise<BudgetAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findBudgetAnalyticsByFiscalYear(schoolId: string, fiscalYear: string): Promise<BudgetAnalytic[]> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .select('*')
      .eq('school_id', schoolId)
      .eq('fiscal_year', fiscalYear);
    if (error) throw error;
    return data ?? [];
  }

  async updateBudgetAnalyticStatus(schoolId: string, id: string, status: string): Promise<BudgetAnalytic> {
    const { data, error } = await this.supabase
      .from('gov_budget_analytics')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovBudgetAnalyticNotFoundError(id);
    return data;
  }

  async findEducationForecastById(schoolId: string, id: string): Promise<EducationForecast> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationForecastNotFoundError(id);
    return data;
  }

  async findAllEducationForecasts(schoolId: string): Promise<EducationForecast[]> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEducationForecast(schoolId: string, forecast: Partial<EducationForecastCreate>): Promise<EducationForecast> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .insert({ ...forecast, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEducationForecast(schoolId: string, id: string, updates: Partial<EducationForecastCreate>): Promise<EducationForecast> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationForecastNotFoundError(id);
    return data;
  }

  async deleteEducationForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationForecasts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_education_forecasts')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEducationForecastsByType(schoolId: string, type: string): Promise<EducationForecast[]> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEducationForecasts(schoolId: string): Promise<EducationForecast[]> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEducationForecastsByRegion(schoolId: string, regionId: string): Promise<EducationForecast[]> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('region_id', regionId);
    if (error) throw error;
    return data ?? [];
  }

  async updateEducationForecastStatus(schoolId: string, id: string, status: string): Promise<EducationForecast> {
    const { data, error } = await this.supabase
      .from('gov_education_forecasts')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationForecastNotFoundError(id);
    return data;
  }

  async findDataCollectionById(schoolId: string, id: string): Promise<DataCollection> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDataCollectionNotFoundError(id);
    return data;
  }

  async findAllDataCollections(schoolId: string): Promise<DataCollection[]> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDataCollection(schoolId: string, collection: Partial<DataCollectionCreate>): Promise<DataCollection> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .insert({ ...collection, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateDataCollection(schoolId: string, id: string, updates: Partial<DataCollectionCreate>): Promise<DataCollection> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDataCollectionNotFoundError(id);
    return data;
  }

  async deleteDataCollection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_data_collections')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataCollections(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('gov_data_collections')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataCollectionsByType(schoolId: string, type: string): Promise<DataCollection[]> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataCollections(schoolId: string): Promise<DataCollection[]> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPendingDataCollections(schoolId: string): Promise<DataCollection[]> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async updateDataCollectionStatus(schoolId: string, id: string, status: string): Promise<DataCollection> {
    const { data, error } = await this.supabase
      .from('gov_data_collections')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDataCollectionNotFoundError(id);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 9: FUNDING
  // ═══════════════════════════════════════════════════════════════════════════════

  async findGovernmentFundingById(schoolId: string, id: string): Promise<GovernmentFunding> {
    const { data, error } = await this.supabase
      .from('gov_government_fundings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovGovernmentFundingNotFoundError(id);
    return data;
  }

  async findAllGovernmentFundings(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentFunding[]> {
    let query = this.supabase
      .from('gov_government_fundings')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createGovernmentFunding(schoolId: string, data: GovernmentFundingCreate): Promise<GovernmentFunding> {
    const { data: result, error } = await this.supabase
      .from('gov_government_fundings')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateGovernmentFunding(schoolId: string, id: string, data: GovernmentFundingUpdate): Promise<GovernmentFunding> {
    const { data: result, error } = await this.supabase
      .from('gov_government_fundings')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovGovernmentFundingNotFoundError(id);
    return result;
  }

  async deleteGovernmentFunding(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_government_fundings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGovernmentFundings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_government_fundings')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findFundingAllocationById(schoolId: string, id: string): Promise<FundingAllocation> {
    const { data, error } = await this.supabase
      .from('gov_funding_allocations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovFundingAllocationNotFoundError(id);
    return data;
  }

  async findAllFundingAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<FundingAllocation[]> {
    let query = this.supabase
      .from('gov_funding_allocations')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createFundingAllocation(schoolId: string, data: FundingAllocationCreate): Promise<FundingAllocation> {
    const { data: result, error } = await this.supabase
      .from('gov_funding_allocations')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateFundingAllocation(schoolId: string, id: string, data: FundingAllocationUpdate): Promise<FundingAllocation> {
    const { data: result, error } = await this.supabase
      .from('gov_funding_allocations')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovFundingAllocationNotFoundError(id);
    return result;
  }

  async deleteFundingAllocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_funding_allocations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFundingAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_funding_allocations')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findScholarshipById(schoolId: string, id: string): Promise<Scholarship> {
    const { data, error } = await this.supabase
      .from('gov_scholarships')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovScholarshipNotFoundError(id);
    return data;
  }

  async findAllScholarships(schoolId: string, filters?: Record<string, unknown>): Promise<Scholarship[]> {
    let query = this.supabase
      .from('gov_scholarships')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createScholarship(schoolId: string, data: ScholarshipCreate): Promise<Scholarship> {
    const { data: result, error } = await this.supabase
      .from('gov_scholarships')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateScholarship(schoolId: string, id: string, data: ScholarshipUpdate): Promise<Scholarship> {
    const { data: result, error } = await this.supabase
      .from('gov_scholarships')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovScholarshipNotFoundError(id);
    return result;
  }

  async deleteScholarship(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_scholarships')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countScholarships(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_scholarships')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findScholarshipApplicationById(schoolId: string, id: string): Promise<ScholarshipApplication> {
    const { data, error } = await this.supabase
      .from('gov_scholarship_applications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovScholarshipApplicationNotFoundError(id);
    return data;
  }

  async findAllScholarshipApplications(schoolId: string, filters?: Record<string, unknown>): Promise<ScholarshipApplication[]> {
    let query = this.supabase
      .from('gov_scholarship_applications')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createScholarshipApplication(schoolId: string, data: ScholarshipApplicationCreate): Promise<ScholarshipApplication> {
    const { data: result, error } = await this.supabase
      .from('gov_scholarship_applications')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateScholarshipApplication(schoolId: string, id: string, data: ScholarshipApplicationUpdate): Promise<ScholarshipApplication> {
    const { data: result, error } = await this.supabase
      .from('gov_scholarship_applications')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovScholarshipApplicationNotFoundError(id);
    return result;
  }

  async deleteScholarshipApplication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_scholarship_applications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countScholarshipApplications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_scholarship_applications')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findGrantById(schoolId: string, id: string): Promise<Grant> {
    const { data, error } = await this.supabase
      .from('gov_grants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovGrantNotFoundError(id);
    return data;
  }

  async findAllGrants(schoolId: string, filters?: Record<string, unknown>): Promise<Grant[]> {
    let query = this.supabase
      .from('gov_grants')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createGrant(schoolId: string, data: GrantCreate): Promise<Grant> {
    const { data: result, error } = await this.supabase
      .from('gov_grants')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateGrant(schoolId: string, id: string, data: GrantUpdate): Promise<Grant> {
    const { data: result, error } = await this.supabase
      .from('gov_grants')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovGrantNotFoundError(id);
    return result;
  }

  async deleteGrant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_grants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGrants(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_grants')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findGrantProjectById(schoolId: string, id: string): Promise<GrantProject> {
    const { data, error } = await this.supabase
      .from('gov_grant_projects')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovGrantProjectNotFoundError(id);
    return data;
  }

  async findAllGrantProjects(schoolId: string, filters?: Record<string, unknown>): Promise<GrantProject[]> {
    let query = this.supabase
      .from('gov_grant_projects')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createGrantProject(schoolId: string, data: GrantProjectCreate): Promise<GrantProject> {
    const { data: result, error } = await this.supabase
      .from('gov_grant_projects')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateGrantProject(schoolId: string, id: string, data: GrantProjectUpdate): Promise<GrantProject> {
    const { data: result, error } = await this.supabase
      .from('gov_grant_projects')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovGrantProjectNotFoundError(id);
    return result;
  }

  async deleteGrantProject(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_grant_projects')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGrantProjects(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_grant_projects')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findDonorById(schoolId: string, id: string): Promise<Donor> {
    const { data, error } = await this.supabase
      .from('gov_donors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDonorNotFoundError(id);
    return data;
  }

  async findAllDonors(schoolId: string, filters?: Record<string, unknown>): Promise<Donor[]> {
    let query = this.supabase
      .from('gov_donors')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createDonor(schoolId: string, data: DonorCreate): Promise<Donor> {
    const { data: result, error } = await this.supabase
      .from('gov_donors')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateDonor(schoolId: string, id: string, data: DonorUpdate): Promise<Donor> {
    const { data: result, error } = await this.supabase
      .from('gov_donors')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDonorNotFoundError(id);
    return result;
  }

  async deleteDonor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_donors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDonors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_donors')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findNgoPartnerById(schoolId: string, id: string): Promise<NgoPartner> {
    const { data, error } = await this.supabase
      .from('gov_ngo_partners')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNgoPartnerNotFoundError(id);
    return data;
  }

  async findAllNgoPartners(schoolId: string, filters?: Record<string, unknown>): Promise<NgoPartner[]> {
    let query = this.supabase
      .from('gov_ngo_partners')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createNgoPartner(schoolId: string, data: NgoPartnerCreate): Promise<NgoPartner> {
    const { data: result, error } = await this.supabase
      .from('gov_ngo_partners')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateNgoPartner(schoolId: string, id: string, data: NgoPartnerUpdate): Promise<NgoPartner> {
    const { data: result, error } = await this.supabase
      .from('gov_ngo_partners')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNgoPartnerNotFoundError(id);
    return result;
  }

  async deleteNgoPartner(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_ngo_partners')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNgoPartners(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_ngo_partners')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findBudgetAllocationById(schoolId: string, id: string): Promise<BudgetAllocation> {
    const { data, error } = await this.supabase
      .from('gov_budget_allocations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovBudgetAllocationNotFoundError(id);
    return data;
  }

  async findAllBudgetAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<BudgetAllocation[]> {
    let query = this.supabase
      .from('gov_budget_allocations')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createBudgetAllocation(schoolId: string, data: BudgetAllocationCreate): Promise<BudgetAllocation> {
    const { data: result, error } = await this.supabase
      .from('gov_budget_allocations')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateBudgetAllocation(schoolId: string, id: string, data: BudgetAllocationUpdate): Promise<BudgetAllocation> {
    const { data: result, error } = await this.supabase
      .from('gov_budget_allocations')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovBudgetAllocationNotFoundError(id);
    return result;
  }

  async deleteBudgetAllocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_budget_allocations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countBudgetAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_budget_allocations')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findRegionalBudgetById(schoolId: string, id: string): Promise<RegionalBudget> {
    const { data, error } = await this.supabase
      .from('gov_regional_budgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRegionalBudgetNotFoundError(id);
    return data;
  }

  async findAllRegionalBudgets(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalBudget[]> {
    let query = this.supabase
      .from('gov_regional_budgets')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createRegionalBudget(schoolId: string, data: RegionalBudgetCreate): Promise<RegionalBudget> {
    const { data: result, error } = await this.supabase
      .from('gov_regional_budgets')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateRegionalBudget(schoolId: string, id: string, data: RegionalBudgetUpdate): Promise<RegionalBudget> {
    const { data: result, error } = await this.supabase
      .from('gov_regional_budgets')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegionalBudgetNotFoundError(id);
    return result;
  }

  async deleteRegionalBudget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_regional_budgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegionalBudgets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_regional_budgets')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findFundDisbursementById(schoolId: string, id: string): Promise<FundDisbursement> {
    const { data, error } = await this.supabase
      .from('gov_fund_disbursements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovFundDisbursementNotFoundError(id);
    return data;
  }

  async findAllFundDisbursements(schoolId: string, filters?: Record<string, unknown>): Promise<FundDisbursement[]> {
    let query = this.supabase
      .from('gov_fund_disbursements')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createFundDisbursement(schoolId: string, data: FundDisbursementCreate): Promise<FundDisbursement> {
    const { data: result, error } = await this.supabase
      .from('gov_fund_disbursements')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateFundDisbursement(schoolId: string, id: string, data: FundDisbursementUpdate): Promise<FundDisbursement> {
    const { data: result, error } = await this.supabase
      .from('gov_fund_disbursements')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovFundDisbursementNotFoundError(id);
    return result;
  }

  async deleteFundDisbursement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_fund_disbursements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFundDisbursements(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_fund_disbursements')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findFundingReportById(schoolId: string, id: string): Promise<FundingReport> {
    const { data, error } = await this.supabase
      .from('gov_funding_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovFundingReportNotFoundError(id);
    return data;
  }

  async findAllFundingReports(schoolId: string, filters?: Record<string, unknown>): Promise<FundingReport[]> {
    let query = this.supabase
      .from('gov_funding_reports')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createFundingReport(schoolId: string, data: FundingReportCreate): Promise<FundingReport> {
    const { data: result, error } = await this.supabase
      .from('gov_funding_reports')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateFundingReport(schoolId: string, id: string, data: FundingReportUpdate): Promise<FundingReport> {
    const { data: result, error } = await this.supabase
      .from('gov_funding_reports')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovFundingReportNotFoundError(id);
    return result;
  }

  async deleteFundingReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_funding_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFundingReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_funding_reports')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async getActiveGovernmentFundings(schoolId: string): Promise<GovernmentFunding[]> {
    const { data, error } = await this.supabase
      .from('gov_government_fundings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data || [];
  }

  async getPendingScholarshipApplications(schoolId: string): Promise<ScholarshipApplication[]> {
    const { data, error } = await this.supabase
      .from('gov_scholarship_applications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data || [];
  }

  async getActiveGrantProjects(schoolId: string): Promise<GrantProject[]> {
    const { data, error } = await this.supabase
      .from('gov_grant_projects')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data || [];
  }

  async getFundingSummaryByType(schoolId: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .from('gov_government_fundings')
      .select('funding_type, amount')
      .eq('school_id', schoolId);
    if (error) throw error;
    const summary: Record<string, number> = {};
    (data || []).forEach((row: Record<string, unknown>) => {
      const type = row.funding_type as string;
      const amount = row.amount as number;
      summary[type] = (summary[type] || 0) + amount;
    });
    return summary;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 10: DIGITAL IDENTITY
  // ═══════════════════════════════════════════════════════════════════════════════

  async findNationalStudentIdById(schoolId: string, id: string): Promise<NationalStudentId> {
    const { data, error } = await this.supabase
      .from('gov_national_student_ids')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNationalStudentIdNotFoundError(id);
    return data;
  }

  async findAllNationalStudentIds(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStudentId[]> {
    let query = this.supabase
      .from('gov_national_student_ids')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createNationalStudentId(schoolId: string, data: NationalStudentIdCreate): Promise<NationalStudentId> {
    const { data: result, error } = await this.supabase
      .from('gov_national_student_ids')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateNationalStudentId(schoolId: string, id: string, data: NationalStudentIdUpdate): Promise<NationalStudentId> {
    const { data: result, error } = await this.supabase
      .from('gov_national_student_ids')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalStudentIdNotFoundError(id);
    return result;
  }

  async deleteNationalStudentId(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_national_student_ids')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNationalStudentIds(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_national_student_ids')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findTeacherRegistryById(schoolId: string, id: string): Promise<TeacherRegistry> {
    const { data, error } = await this.supabase
      .from('gov_teacher_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovTeacherRegistryNotFoundError(id);
    return data;
  }

  async findAllTeacherRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherRegistry[]> {
    let query = this.supabase
      .from('gov_teacher_registries')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createTeacherRegistry(schoolId: string, data: TeacherRegistryCreate): Promise<TeacherRegistry> {
    const { data: result, error } = await this.supabase
      .from('gov_teacher_registries')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateTeacherRegistry(schoolId: string, id: string, data: TeacherRegistryUpdate): Promise<TeacherRegistry> {
    const { data: result, error } = await this.supabase
      .from('gov_teacher_registries')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovTeacherRegistryNotFoundError(id);
    return result;
  }

  async deleteTeacherRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_teacher_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTeacherRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_teacher_registries')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findSchoolRegistryById(schoolId: string, id: string): Promise<SchoolRegistry> {
    const { data, error } = await this.supabase
      .from('gov_school_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolRegistryNotFoundError(id);
    return data;
  }

  async findAllSchoolRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRegistry[]> {
    let query = this.supabase
      .from('gov_school_registries')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createSchoolRegistry(schoolId: string, data: SchoolRegistryCreate): Promise<SchoolRegistry> {
    const { data: result, error } = await this.supabase
      .from('gov_school_registries')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateSchoolRegistry(schoolId: string, id: string, data: SchoolRegistryUpdate): Promise<SchoolRegistry> {
    const { data: result, error } = await this.supabase
      .from('gov_school_registries')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolRegistryNotFoundError(id);
    return result;
  }

  async deleteSchoolRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_school_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_school_registries')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findDigitalCertificateById(schoolId: string, id: string): Promise<DigitalCertificate> {
    const { data, error } = await this.supabase
      .from('gov_digital_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovDigitalCertificateNotFoundError(id);
    return data;
  }

  async findAllDigitalCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificate[]> {
    let query = this.supabase
      .from('gov_digital_certificates')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createDigitalCertificate(schoolId: string, data: DigitalCertificateCreate): Promise<DigitalCertificate> {
    const { data: result, error } = await this.supabase
      .from('gov_digital_certificates')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateDigitalCertificate(schoolId: string, id: string, data: DigitalCertificateUpdate): Promise<DigitalCertificate> {
    const { data: result, error } = await this.supabase
      .from('gov_digital_certificates')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovDigitalCertificateNotFoundError(id);
    return result;
  }

  async deleteDigitalCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_digital_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDigitalCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_digital_certificates')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findQrVerificationById(schoolId: string, id: string): Promise<QrVerification> {
    const { data, error } = await this.supabase
      .from('gov_qr_verifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovQrVerificationNotFoundError(id);
    return data;
  }

  async findAllQrVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<QrVerification[]> {
    let query = this.supabase
      .from('gov_qr_verifications')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createQrVerification(schoolId: string, data: QrVerificationCreate): Promise<QrVerification> {
    const { data: result, error } = await this.supabase
      .from('gov_qr_verifications')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateQrVerification(schoolId: string, id: string, data: QrVerificationUpdate): Promise<QrVerification> {
    const { data: result, error } = await this.supabase
      .from('gov_qr_verifications')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovQrVerificationNotFoundError(id);
    return result;
  }

  async deleteQrVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_qr_verifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countQrVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_qr_verifications')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findIdentityVerificationById(schoolId: string, id: string): Promise<IdentityVerification> {
    const { data, error } = await this.supabase
      .from('gov_identity_verifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovIdentityVerificationNotFoundError(id);
    return data;
  }

  async findAllIdentityVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]> {
    let query = this.supabase
      .from('gov_identity_verifications')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createIdentityVerification(schoolId: string, data: IdentityVerificationCreate): Promise<IdentityVerification> {
    const { data: result, error } = await this.supabase
      .from('gov_identity_verifications')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateIdentityVerification(schoolId: string, id: string, data: IdentityVerificationUpdate): Promise<IdentityVerification> {
    const { data: result, error } = await this.supabase
      .from('gov_identity_verifications')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovIdentityVerificationNotFoundError(id);
    return result;
  }

  async deleteIdentityVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_identity_verifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countIdentityVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_identity_verifications')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findBiometricDataById(schoolId: string, id: string): Promise<BiometricData> {
    const { data, error } = await this.supabase
      .from('gov_biometric_data')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovBiometricDataNotFoundError(id);
    return data;
  }

  async findAllBiometricData(schoolId: string, filters?: Record<string, unknown>): Promise<BiometricData[]> {
    let query = this.supabase
      .from('gov_biometric_data')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createBiometricData(schoolId: string, data: BiometricDataCreate): Promise<BiometricData> {
    const { data: result, error } = await this.supabase
      .from('gov_biometric_data')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateBiometricData(schoolId: string, id: string, data: BiometricDataUpdate): Promise<BiometricData> {
    const { data: result, error } = await this.supabase
      .from('gov_biometric_data')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovBiometricDataNotFoundError(id);
    return result;
  }

  async deleteBiometricData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_biometric_data')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countBiometricData(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_biometric_data')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findIdentityAuditById(schoolId: string, id: string): Promise<IdentityAudit> {
    const { data, error } = await this.supabase
      .from('gov_identity_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovIdentityAuditNotFoundError(id);
    return data;
  }

  async findAllIdentityAudits(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAudit[]> {
    let query = this.supabase
      .from('gov_identity_audits')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createIdentityAudit(schoolId: string, data: IdentityAuditCreate): Promise<IdentityAudit> {
    const { data: result, error } = await this.supabase
      .from('gov_identity_audits')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateIdentityAudit(schoolId: string, id: string, data: IdentityAuditUpdate): Promise<IdentityAudit> {
    const { data: result, error } = await this.supabase
      .from('gov_identity_audits')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovIdentityAuditNotFoundError(id);
    return result;
  }

  async deleteIdentityAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_identity_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countIdentityAudits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_identity_audits')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async verifyStudentIdentity(schoolId: string, studentId: string): Promise<IdentityVerification | null> {
    const { data, error } = await this.supabase
      .from('gov_identity_verifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .eq('status', 'verified')
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getUnverifiedNationalIds(schoolId: string): Promise<NationalStudentId[]> {
    const { data, error } = await this.supabase
      .from('gov_national_student_ids')
      .select('*')
      .eq('school_id', schoolId)
      .eq('verification_status', 'unverified');
    if (error) throw error;
    return data || [];
  }

  async getExpiredDigitalCertificates(schoolId: string): Promise<DigitalCertificate[]> {
    const { data, error } = await this.supabase
      .from('gov_digital_certificates')
      .select('*')
      .eq('school_id', schoolId)
      .lt('expiry_date', new Date().toISOString());
    if (error) throw error;
    return data || [];
  }

  async getAuditTrailForIdentity(schoolId: string, identityId: string): Promise<IdentityAudit[]> {
    const { data, error } = await this.supabase
      .from('gov_identity_audits')
      .select('*')
      .eq('school_id', schoolId)
      .eq('identity_id', identityId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 11: COMPLIANCE
  // ═══════════════════════════════════════════════════════════════════════════════

  async findNationalStandardById(schoolId: string, id: string): Promise<NationalStandard> {
    const { data, error } = await this.supabase
      .from('gov_national_standards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovNationalStandardNotFoundError(id);
    return data;
  }

  async findAllNationalStandards(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStandard[]> {
    let query = this.supabase
      .from('gov_national_standards')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createNationalStandard(schoolId: string, data: NationalStandardCreate): Promise<NationalStandard> {
    const { data: result, error } = await this.supabase
      .from('gov_national_standards')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateNationalStandard(schoolId: string, id: string, data: NationalStandardUpdate): Promise<NationalStandard> {
    const { data: result, error } = await this.supabase
      .from('gov_national_standards')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovNationalStandardNotFoundError(id);
    return result;
  }

  async deleteNationalStandard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_national_standards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countNationalStandards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_national_standards')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findSchoolComplianceRecordById(schoolId: string, id: string): Promise<SchoolComplianceRecord> {
    const { data, error } = await this.supabase
      .from('gov_school_compliance_records')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovSchoolComplianceRecordNotFoundError(id);
    return data;
  }

  async findAllSchoolComplianceRecords(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolComplianceRecord[]> {
    let query = this.supabase
      .from('gov_school_compliance_records')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createSchoolComplianceRecord(schoolId: string, data: SchoolComplianceRecordCreate): Promise<SchoolComplianceRecord> {
    const { data: result, error } = await this.supabase
      .from('gov_school_compliance_records')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateSchoolComplianceRecord(schoolId: string, id: string, data: SchoolComplianceRecordUpdate): Promise<SchoolComplianceRecord> {
    const { data: result, error } = await this.supabase
      .from('gov_school_compliance_records')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovSchoolComplianceRecordNotFoundError(id);
    return result;
  }

  async deleteSchoolComplianceRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_school_compliance_records')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolComplianceRecords(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_school_compliance_records')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findComplianceAssessmentById(schoolId: string, id: string): Promise<ComplianceAssessment> {
    const { data, error } = await this.supabase
      .from('gov_compliance_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovComplianceAssessmentNotFoundError(id);
    return data;
  }

  async findAllComplianceAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceAssessment[]> {
    let query = this.supabase
      .from('gov_compliance_assessments')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createComplianceAssessment(schoolId: string, data: ComplianceAssessmentCreate): Promise<ComplianceAssessment> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_assessments')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateComplianceAssessment(schoolId: string, id: string, data: ComplianceAssessmentUpdate): Promise<ComplianceAssessment> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_assessments')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceAssessmentNotFoundError(id);
    return result;
  }

  async deleteComplianceAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_compliance_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countComplianceAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_compliance_assessments')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findComplianceWaiverById(schoolId: string, id: string): Promise<ComplianceWaiver> {
    const { data, error } = await this.supabase
      .from('gov_compliance_waivers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovComplianceWaiverNotFoundError(id);
    return data;
  }

  async findAllComplianceWaivers(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceWaiver[]> {
    let query = this.supabase
      .from('gov_compliance_waivers')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createComplianceWaiver(schoolId: string, data: ComplianceWaiverCreate): Promise<ComplianceWaiver> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_waivers')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateComplianceWaiver(schoolId: string, id: string, data: ComplianceWaiverUpdate): Promise<ComplianceWaiver> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_waivers')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceWaiverNotFoundError(id);
    return result;
  }

  async deleteComplianceWaiver(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_compliance_waivers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countComplianceWaivers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_compliance_waivers')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findRegulationCategoryById(schoolId: string, id: string): Promise<RegulationCategory> {
    const { data, error } = await this.supabase
      .from('gov_regulation_categories')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovRegulationCategoryNotFoundError(id);
    return data;
  }

  async findAllRegulationCategories(schoolId: string, filters?: Record<string, unknown>): Promise<RegulationCategory[]> {
    let query = this.supabase
      .from('gov_regulation_categories')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createRegulationCategory(schoolId: string, data: RegulationCategoryCreate): Promise<RegulationCategory> {
    const { data: result, error } = await this.supabase
      .from('gov_regulation_categories')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateRegulationCategory(schoolId: string, id: string, data: RegulationCategoryUpdate): Promise<RegulationCategory> {
    const { data: result, error } = await this.supabase
      .from('gov_regulation_categories')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovRegulationCategoryNotFoundError(id);
    return result;
  }

  async deleteRegulationCategory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_regulation_categories')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegulationCategories(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_regulation_categories')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findEducationRegulationById(schoolId: string, id: string): Promise<EducationRegulation> {
    const { data, error } = await this.supabase
      .from('gov_education_regulations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationRegulationNotFoundError(id);
    return data;
  }

  async findAllEducationRegulations(schoolId: string, filters?: Record<string, unknown>): Promise<EducationRegulation[]> {
    let query = this.supabase
      .from('gov_education_regulations')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createEducationRegulation(schoolId: string, data: EducationRegulationCreate): Promise<EducationRegulation> {
    const { data: result, error } = await this.supabase
      .from('gov_education_regulations')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateEducationRegulation(schoolId: string, id: string, data: EducationRegulationUpdate): Promise<EducationRegulation> {
    const { data: result, error } = await this.supabase
      .from('gov_education_regulations')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationRegulationNotFoundError(id);
    return result;
  }

  async deleteEducationRegulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_regulations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationRegulations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_education_regulations')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findComplianceNotificationById(schoolId: string, id: string): Promise<ComplianceNotification> {
    const { data, error } = await this.supabase
      .from('gov_compliance_notifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovComplianceNotificationNotFoundError(id);
    return data;
  }

  async findAllComplianceNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceNotification[]> {
    let query = this.supabase
      .from('gov_compliance_notifications')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createComplianceNotification(schoolId: string, data: ComplianceNotificationCreate): Promise<ComplianceNotification> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_notifications')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateComplianceNotification(schoolId: string, id: string, data: ComplianceNotificationUpdate): Promise<ComplianceNotification> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_notifications')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceNotificationNotFoundError(id);
    return result;
  }

  async deleteComplianceNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_compliance_notifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countComplianceNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_compliance_notifications')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findComplianceReportById(schoolId: string, id: string): Promise<ComplianceReport> {
    const { data, error } = await this.supabase
      .from('gov_compliance_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovComplianceReportNotFoundError(id);
    return data;
  }

  async findAllComplianceReports(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceReport[]> {
    let query = this.supabase
      .from('gov_compliance_reports')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createComplianceReport(schoolId: string, data: ComplianceReportCreate): Promise<ComplianceReport> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_reports')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateComplianceReport(schoolId: string, id: string, data: ComplianceReportUpdate): Promise<ComplianceReport> {
    const { data: result, error } = await this.supabase
      .from('gov_compliance_reports')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovComplianceReportNotFoundError(id);
    return result;
  }

  async deleteComplianceReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_compliance_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countComplianceReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_compliance_reports')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async getNonCompliantSchoolRecords(schoolId: string): Promise<SchoolComplianceRecord[]> {
    const { data, error } = await this.supabase
      .from('gov_school_compliance_records')
      .select('*')
      .eq('school_id', schoolId)
      .eq('compliance_status', 'non_compliant');
    if (error) throw error;
    return data || [];
  }

  async getComplianceScoreBySchool(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('gov_compliance_assessments')
      .select('score')
      .eq('school_id', schoolId);
    if (error) throw error;
    if (!data || data.length === 0) return 0;
    const total = data.reduce((sum: number, r: Record<string, unknown>) => sum + ((r.score as number) || 0), 0);
    return total / data.length;
  }

  async getUpcomingComplianceWaivers(schoolId: string): Promise<ComplianceWaiver[]> {
    const { data, error } = await this.supabase
      .from('gov_compliance_waivers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .gte('expiry_date', new Date().toISOString())
      .order('expiry_date', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async getComplianceOverview(schoolId: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .from('gov_school_compliance_records')
      .select('compliance_status')
      .eq('school_id', schoolId);
    if (error) throw error;
    const overview: Record<string, number> = {};
    (data || []).forEach((row: Record<string, unknown>) => {
      const status = row.compliance_status as string;
      overview[status] = (overview[status] || 0) + 1;
    });
    return overview;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MODULE 12: INTERNATIONAL
  // ═══════════════════════════════════════════════════════════════════════════════

  async findCountryById(schoolId: string, id: string): Promise<Country> {
    const { data, error } = await this.supabase
      .from('gov_countries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCountryNotFoundError(id);
    return data;
  }

  async findAllCountries(schoolId: string, filters?: Record<string, unknown>): Promise<Country[]> {
    let query = this.supabase
      .from('gov_countries')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createCountry(schoolId: string, data: CountryCreate): Promise<Country> {
    const { data: result, error } = await this.supabase
      .from('gov_countries')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateCountry(schoolId: string, id: string, data: CountryUpdate): Promise<Country> {
    const { data: result, error } = await this.supabase
      .from('gov_countries')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCountryNotFoundError(id);
    return result;
  }

  async deleteCountry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_countries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCountries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_countries')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findLanguageById(schoolId: string, id: string): Promise<Language> {
    const { data, error } = await this.supabase
      .from('gov_languages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovLanguageNotFoundError(id);
    return data;
  }

  async findAllLanguages(schoolId: string, filters?: Record<string, unknown>): Promise<Language[]> {
    let query = this.supabase
      .from('gov_languages')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createLanguage(schoolId: string, data: LanguageCreate): Promise<Language> {
    const { data: result, error } = await this.supabase
      .from('gov_languages')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateLanguage(schoolId: string, id: string, data: LanguageUpdate): Promise<Language> {
    const { data: result, error } = await this.supabase
      .from('gov_languages')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovLanguageNotFoundError(id);
    return result;
  }

  async deleteLanguage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_languages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countLanguages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_languages')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findCurrencyById(schoolId: string, id: string): Promise<Currency> {
    const { data, error } = await this.supabase
      .from('gov_currencies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCurrencyNotFoundError(id);
    return data;
  }

  async findAllCurrencies(schoolId: string, filters?: Record<string, unknown>): Promise<Currency[]> {
    let query = this.supabase
      .from('gov_currencies')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createCurrency(schoolId: string, data: CurrencyCreate): Promise<Currency> {
    const { data: result, error } = await this.supabase
      .from('gov_currencies')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateCurrency(schoolId: string, id: string, data: CurrencyUpdate): Promise<Currency> {
    const { data: result, error } = await this.supabase
      .from('gov_currencies')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCurrencyNotFoundError(id);
    return result;
  }

  async deleteCurrency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_currencies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCurrencies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_currencies')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findEducationSystemById(schoolId: string, id: string): Promise<EducationSystem> {
    const { data, error } = await this.supabase
      .from('gov_education_systems')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEducationSystemNotFoundError(id);
    return data;
  }

  async findAllEducationSystems(schoolId: string, filters?: Record<string, unknown>): Promise<EducationSystem[]> {
    let query = this.supabase
      .from('gov_education_systems')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createEducationSystem(schoolId: string, data: EducationSystemCreate): Promise<EducationSystem> {
    const { data: result, error } = await this.supabase
      .from('gov_education_systems')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateEducationSystem(schoolId: string, id: string, data: EducationSystemUpdate): Promise<EducationSystem> {
    const { data: result, error } = await this.supabase
      .from('gov_education_systems')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEducationSystemNotFoundError(id);
    return result;
  }

  async deleteEducationSystem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_education_systems')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEducationSystems(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_education_systems')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findEquivalencyById(schoolId: string, id: string): Promise<Equivalency> {
    const { data, error } = await this.supabase
      .from('gov_equivalencies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovEquivalencyNotFoundError(id);
    return data;
  }

  async findAllEquivalencies(schoolId: string, filters?: Record<string, unknown>): Promise<Equivalency[]> {
    let query = this.supabase
      .from('gov_equivalencies')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createEquivalency(schoolId: string, data: EquivalencyCreate): Promise<Equivalency> {
    const { data: result, error } = await this.supabase
      .from('gov_equivalencies')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateEquivalency(schoolId: string, id: string, data: EquivalencyUpdate): Promise<Equivalency> {
    const { data: result, error } = await this.supabase
      .from('gov_equivalencies')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovEquivalencyNotFoundError(id);
    return result;
  }

  async deleteEquivalency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_equivalencies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEquivalencies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_equivalencies')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findInternationalPartnershipById(schoolId: string, id: string): Promise<InternationalPartnership> {
    const { data, error } = await this.supabase
      .from('gov_international_partnerships')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInternationalPartnershipNotFoundError(id);
    return data;
  }

  async findAllInternationalPartnerships(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalPartnership[]> {
    let query = this.supabase
      .from('gov_international_partnerships')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createInternationalPartnership(schoolId: string, data: InternationalPartnershipCreate): Promise<InternationalPartnership> {
    const { data: result, error } = await this.supabase
      .from('gov_international_partnerships')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateInternationalPartnership(schoolId: string, id: string, data: InternationalPartnershipUpdate): Promise<InternationalPartnership> {
    const { data: result, error } = await this.supabase
      .from('gov_international_partnerships')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInternationalPartnershipNotFoundError(id);
    return result;
  }

  async deleteInternationalPartnership(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_international_partnerships')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInternationalPartnerships(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_international_partnerships')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findExchangeProgramById(schoolId: string, id: string): Promise<ExchangeProgram> {
    const { data, error } = await this.supabase
      .from('gov_exchange_programs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovExchangeProgramNotFoundError(id);
    return data;
  }

  async findAllExchangePrograms(schoolId: string, filters?: Record<string, unknown>): Promise<ExchangeProgram[]> {
    let query = this.supabase
      .from('gov_exchange_programs')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createExchangeProgram(schoolId: string, data: ExchangeProgramCreate): Promise<ExchangeProgram> {
    const { data: result, error } = await this.supabase
      .from('gov_exchange_programs')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateExchangeProgram(schoolId: string, id: string, data: ExchangeProgramUpdate): Promise<ExchangeProgram> {
    const { data: result, error } = await this.supabase
      .from('gov_exchange_programs')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovExchangeProgramNotFoundError(id);
    return result;
  }

  async deleteExchangeProgram(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_exchange_programs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countExchangePrograms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_exchange_programs')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findInternationalStudentById(schoolId: string, id: string): Promise<InternationalStudent> {
    const { data, error } = await this.supabase
      .from('gov_international_students')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovInternationalStudentNotFoundError(id);
    return data;
  }

  async findAllInternationalStudents(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalStudent[]> {
    let query = this.supabase
      .from('gov_international_students')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createInternationalStudent(schoolId: string, data: InternationalStudentCreate): Promise<InternationalStudent> {
    const { data: result, error } = await this.supabase
      .from('gov_international_students')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateInternationalStudent(schoolId: string, id: string, data: InternationalStudentUpdate): Promise<InternationalStudent> {
    const { data: result, error } = await this.supabase
      .from('gov_international_students')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovInternationalStudentNotFoundError(id);
    return result;
  }

  async deleteInternationalStudent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_international_students')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInternationalStudents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_international_students')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findCrossBorderResearchById(schoolId: string, id: string): Promise<CrossBorderResearch> {
    const { data, error } = await this.supabase
      .from('gov_cross_border_research')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovCrossBorderResearchNotFoundError(id);
    return data;
  }

  async findAllCrossBorderResearch(schoolId: string, filters?: Record<string, unknown>): Promise<CrossBorderResearch[]> {
    let query = this.supabase
      .from('gov_cross_border_research')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createCrossBorderResearch(schoolId: string, data: CrossBorderResearchCreate): Promise<CrossBorderResearch> {
    const { data: result, error } = await this.supabase
      .from('gov_cross_border_research')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateCrossBorderResearch(schoolId: string, id: string, data: CrossBorderResearchUpdate): Promise<CrossBorderResearch> {
    const { data: result, error } = await this.supabase
      .from('gov_cross_border_research')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovCrossBorderResearchNotFoundError(id);
    return result;
  }

  async deleteCrossBorderResearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_cross_border_research')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCrossBorderResearch(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_cross_border_research')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async findGlobalBenchmarkById(schoolId: string, id: string): Promise<GlobalBenchmark> {
    const { data, error } = await this.supabase
      .from('gov_global_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new GovGlobalBenchmarkNotFoundError(id);
    return data;
  }

  async findAllGlobalBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<GlobalBenchmark[]> {
    let query = this.supabase
      .from('gov_global_benchmarks')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createGlobalBenchmark(schoolId: string, data: GlobalBenchmarkCreate): Promise<GlobalBenchmark> {
    const { data: result, error } = await this.supabase
      .from('gov_global_benchmarks')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async updateGlobalBenchmark(schoolId: string, id: string, data: GlobalBenchmarkUpdate): Promise<GlobalBenchmark> {
    const { data: result, error } = await this.supabase
      .from('gov_global_benchmarks')
      .update(data)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new GovGlobalBenchmarkNotFoundError(id);
    return result;
  }

  async deleteGlobalBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('gov_global_benchmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGlobalBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from('gov_global_benchmarks')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async getStudentsByCountry(schoolId: string, countryCode: string): Promise<InternationalStudent[]> {
    const { data, error } = await this.supabase
      .from('gov_international_students')
      .select('*')
      .eq('school_id', schoolId)
      .eq('country_code', countryCode);
    if (error) throw error;
    return data || [];
  }

  async getActiveExchangePrograms(schoolId: string): Promise<ExchangeProgram[]> {
    const { data, error } = await this.supabase
      .from('gov_exchange_programs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data || [];
  }

  async getEquivalenciesByOriginCountry(schoolId: string, countryCode: string): Promise<Equivalency[]> {
    const { data, error } = await this.supabase
      .from('gov_equivalencies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('origin_country_code', countryCode);
    if (error) throw error;
    return data || [];
  }

  async getGlobalBenchmarkStats(schoolId: string): Promise<Record<string, unknown>[]> {
    const { data, error } = await this.supabase
      .from('gov_global_benchmarks')
      .select('benchmark_name, value, year')
      .eq('school_id', schoolId)
      .order('year', { ascending: false });
    if (error) throw error;
    return data || [];
  }
}
