import { SupabaseClient } from '@supabase/supabase-js';
// Government & National Governance Repository Types
// Phase 2.9 - EduCI Platform

// ═══════════════════════════════════════════════════════════════════════════════
// Module 1: Ministry System
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  Ministry,
  MinistryCreate,
  MinistryUpdate,
  MinistryQuery,
  MinistryDepartment,
  MinistryDepartmentCreate,
  MinistryDepartmentUpdate,
  MinistryDepartmentQuery,
  Directorate,
  DirectorateCreate,
  DirectorateUpdate,
  DirectorateQuery,
  EducationPolicy,
  EducationPolicyCreate,
  EducationPolicyUpdate,
  EducationPolicyQuery,
  NationalProgram,
  NationalProgramCreate,
  NationalProgramUpdate,
  NationalProgramQuery,
  EducationStrategy,
  EducationStrategyCreate,
  EducationStrategyUpdate,
  EducationStrategyQuery,
  Circular,
  CircularCreate,
  CircularUpdate,
  CircularQuery,
  OfficialDocument,
  OfficialDocumentCreate,
  OfficialDocumentUpdate,
  OfficialDocumentQuery,
  EducationCalendar,
  EducationCalendarCreate,
  EducationCalendarUpdate,
  EducationCalendarQuery,
  NationalStatistic,
  NationalStatisticCreate,
  NationalStatisticUpdate,
  NationalStatisticQuery,
  MinistryUser,
  MinistryUserCreate,
  MinistryUserUpdate,
  MinistryUserQuery,
  MinistryNotification,
  MinistryNotificationCreate,
  MinistryNotificationUpdate,
  MinistryNotificationQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 2: Regional Governance
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EducationRegion,
  EducationRegionCreate,
  EducationRegionUpdate,
  EducationRegionQuery,
  EducationDistrict,
  EducationDistrictCreate,
  EducationDistrictUpdate,
  EducationDistrictQuery,
  Academy,
  AcademyCreate,
  AcademyUpdate,
  AcademyQuery,
  RegionalDirectorate,
  RegionalDirectorateCreate,
  RegionalDirectorateUpdate,
  RegionalDirectorateQuery,
  Inspector,
  InspectorCreate,
  InspectorUpdate,
  InspectorQuery,
  InspectionVisit,
  InspectionVisitCreate,
  InspectionVisitUpdate,
  InspectionVisitQuery,
  RegionalReport,
  RegionalReportCreate,
  RegionalReportUpdate,
  RegionalReportQuery,
  RegionalKpi,
  RegionalKpiCreate,
  RegionalKpiUpdate,
  RegionalKpiQuery,
  DistrictReport,
  DistrictReportCreate,
  DistrictReportUpdate,
  DistrictReportQuery,
  RegionUser,
  RegionUserCreate,
  RegionUserUpdate,
  RegionUserQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 3: Campus Management
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  Campus,
  CampusCreate,
  CampusUpdate,
  CampusQuery,
  CampusGroup,
  CampusGroupCreate,
  CampusGroupUpdate,
  CampusGroupQuery,
  CampusGroupMember,
  CampusGroupMemberCreate,
  CampusGroupMemberUpdate,
  CampusGroupMemberQuery,
  SharedResource,
  SharedResourceCreate,
  SharedResourceUpdate,
  SharedResourceQuery,
  SharedResourceBooking,
  SharedResourceBookingCreate,
  SharedResourceBookingUpdate,
  SharedResourceBookingQuery,
  CrossCampusUser,
  CrossCampusUserCreate,
  CrossCampusUserUpdate,
  CrossCampusUserQuery,
  CampusTransfer,
  CampusTransferCreate,
  CampusTransferUpdate,
  CampusTransferQuery,
  CentralizedAdministration,
  CentralizedAdministrationCreate,
  CentralizedAdministrationUpdate,
  CentralizedAdministrationQuery,
  CampusAnalytics,
  CampusAnalyticsCreate,
  CampusAnalyticsUpdate,
  CampusAnalyticsQuery,
  InterCampusCommunication,
  InterCampusCommunicationCreate,
  InterCampusCommunicationUpdate,
  InterCampusCommunicationQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 4: School Networks
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  SchoolNetwork,
  SchoolNetworkCreate,
  SchoolNetworkUpdate,
  SchoolNetworkQuery,
  NetworkMember,
  NetworkMemberCreate,
  NetworkMemberUpdate,
  NetworkMemberQuery,
  SchoolChain,
  SchoolChainCreate,
  SchoolChainUpdate,
  SchoolChainQuery,
  SchoolFranchise,
  SchoolFranchiseCreate,
  SchoolFranchiseUpdate,
  SchoolFranchiseQuery,
  ReligiousSchoolGroup,
  ReligiousSchoolGroupCreate,
  ReligiousSchoolGroupUpdate,
  ReligiousSchoolGroupQuery,
  PrivateSchoolGroup,
  PrivateSchoolGroupCreate,
  PrivateSchoolGroupUpdate,
  PrivateSchoolGroupQuery,
  NgoSchoolGroup,
  NgoSchoolGroupCreate,
  NgoSchoolGroupUpdate,
  NgoSchoolGroupQuery,
  InternationalSchoolGroup,
  InternationalSchoolGroupCreate,
  InternationalSchoolGroupUpdate,
  InternationalSchoolGroupQuery,
  NetworkAgreement,
  NetworkAgreementCreate,
  NetworkAgreementUpdate,
  NetworkAgreementQuery,
  NetworkReport,
  NetworkReportCreate,
  NetworkReportUpdate,
  NetworkReportQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 5: National Examinations
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  NationalExam,
  NationalExamCreate,
  NationalExamUpdate,
  NationalExamQuery,
  ExamCenter,
  ExamCenterCreate,
  ExamCenterUpdate,
  ExamCenterQuery,
  ExamCandidate,
  ExamCandidateCreate,
  ExamCandidateUpdate,
  ExamCandidateQuery,
  ExamSupervisor,
  ExamSupervisorCreate,
  ExamSupervisorUpdate,
  ExamSupervisorQuery,
  ExamSession,
  ExamSessionCreate,
  ExamSessionUpdate,
  ExamSessionQuery,
  MarkingCenter,
  MarkingCenterCreate,
  MarkingCenterUpdate,
  MarkingCenterQuery,
  ExamResult,
  ExamResultCreate,
  ExamResultUpdate,
  ExamResultQuery,
  Certificate,
  CertificateCreate,
  CertificateUpdate,
  CertificateQuery,
  Diploma,
  DiplomaCreate,
  DiplomaUpdate,
  DiplomaQuery,
  ExamFraud,
  ExamFraudCreate,
  ExamFraudUpdate,
  ExamFraudQuery,
  ExamAppeal,
  ExamAppealCreate,
  ExamAppealUpdate,
  ExamAppealQuery,
  ExamStatistics,
  ExamStatisticsCreate,
  ExamStatisticsUpdate,
  ExamStatisticsQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 6: Inspections
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  InspectionMission,
  InspectionMissionCreate,
  InspectionMissionUpdate,
  InspectionMissionQuery,
  InspectionReport,
  InspectionReportCreate,
  InspectionReportUpdate,
  InspectionReportQuery,
  InspectionRecommendation,
  InspectionRecommendationCreate,
  InspectionRecommendationUpdate,
  InspectionRecommendationQuery,
  SchoolCompliance,
  SchoolComplianceCreate,
  SchoolComplianceUpdate,
  SchoolComplianceQuery,
  CorrectiveAction,
  CorrectiveActionCreate,
  CorrectiveActionUpdate,
  CorrectiveActionQuery,
  InspectionCalendar,
  InspectionCalendarCreate,
  InspectionCalendarUpdate,
  InspectionCalendarQuery,
  SchoolRating,
  SchoolRatingCreate,
  SchoolRatingUpdate,
  SchoolRatingQuery,
  InspectionChecklist,
  InspectionChecklistCreate,
  InspectionChecklistUpdate,
  InspectionChecklistQuery,
  InspectorPerformance,
  InspectorPerformanceCreate,
  InspectorPerformanceUpdate,
  InspectorPerformanceQuery,
  ComplianceTrend,
  ComplianceTrendCreate,
  ComplianceTrendUpdate,
  ComplianceTrendQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 7: Accreditation
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  Accreditation,
  AccreditationCreate,
  AccreditationUpdate,
  AccreditationQuery,
  AccreditationStandard,
  AccreditationStandardCreate,
  AccreditationStandardUpdate,
  AccreditationStandardQuery,
  AccreditationAssessment,
  AccreditationAssessmentCreate,
  AccreditationAssessmentUpdate,
  AccreditationAssessmentQuery,
  Certification,
  CertificationCreate,
  CertificationUpdate,
  CertificationQuery,
  Renewal,
  RenewalCreate,
  RenewalUpdate,
  RenewalQuery,
  QualityAudit,
  QualityAuditCreate,
  QualityAuditUpdate,
  QualityAuditQuery,
  ComplianceRule,
  ComplianceRuleCreate,
  ComplianceRuleUpdate,
  ComplianceRuleQuery,
  QualityIndicator,
  QualityIndicatorCreate,
  QualityIndicatorUpdate,
  QualityIndicatorQuery,
  AccreditationDocument,
  AccreditationDocumentCreate,
  AccreditationDocumentUpdate,
  AccreditationDocumentQuery,
  AuditFinding,
  AuditFindingCreate,
  AuditFindingUpdate,
  AuditFindingQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 8: Analytics & Dashboards
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EducationKpi,
  EducationKpiCreate,
  EducationKpiUpdate,
  EducationKpiQuery,
  RegionalAnalyticsKpi,
  RegionalAnalyticsKpiCreate,
  RegionalAnalyticsKpiUpdate,
  RegionalAnalyticsKpiQuery,
  NationalDashboard,
  NationalDashboardCreate,
  NationalDashboardUpdate,
  NationalDashboardQuery,
  DashboardWidget,
  DashboardWidgetCreate,
  DashboardWidgetUpdate,
  DashboardWidgetQuery,
  PredictiveAnalytic,
  PredictiveAnalyticCreate,
  PredictiveAnalyticUpdate,
  PredictiveAnalyticQuery,
  DropoutMap,
  DropoutMapCreate,
  DropoutMapUpdate,
  DropoutMapQuery,
  InfrastructureMap,
  InfrastructureMapCreate,
  InfrastructureMapUpdate,
  InfrastructureMapQuery,
  TeacherDistribution,
  TeacherDistributionCreate,
  TeacherDistributionUpdate,
  TeacherDistributionQuery,
  StudentDistribution,
  StudentDistributionCreate,
  StudentDistributionUpdate,
  StudentDistributionQuery,
  BudgetAnalytic,
  BudgetAnalyticCreate,
  BudgetAnalyticUpdate,
  BudgetAnalyticQuery,
  EducationForecast,
  EducationForecastCreate,
  EducationForecastUpdate,
  EducationForecastQuery,
  DataCollection,
  DataCollectionCreate,
  DataCollectionUpdate,
  DataCollectionQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 9: Funding & Finance
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  GovernmentFunding,
  GovernmentFundingCreate,
  GovernmentFundingUpdate,
  GovernmentFundingQuery,
  FundingAllocation,
  FundingAllocationCreate,
  FundingAllocationUpdate,
  FundingAllocationQuery,
  Scholarship,
  ScholarshipCreate,
  ScholarshipUpdate,
  ScholarshipQuery,
  ScholarshipApplication,
  ScholarshipApplicationCreate,
  ScholarshipApplicationUpdate,
  ScholarshipApplicationQuery,
  Grant,
  GrantCreate,
  GrantUpdate,
  GrantQuery,
  GrantProject,
  GrantProjectCreate,
  GrantProjectUpdate,
  GrantProjectQuery,
  Donor,
  DonorCreate,
  DonorUpdate,
  DonorQuery,
  NgoPartner,
  NgoPartnerCreate,
  NgoPartnerUpdate,
  NgoPartnerQuery,
  BudgetAllocation,
  BudgetAllocationCreate,
  BudgetAllocationUpdate,
  BudgetAllocationQuery,
  RegionalBudget,
  RegionalBudgetCreate,
  RegionalBudgetUpdate,
  RegionalBudgetQuery,
  FundDisbursement,
  FundDisbursementCreate,
  FundDisbursementUpdate,
  FundDisbursementQuery,
  FundingReport,
  FundingReportCreate,
  FundingReportUpdate,
  FundingReportQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 10: Identity Management
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  NationalStudentId,
  NationalStudentIdCreate,
  NationalStudentIdUpdate,
  NationalStudentIdQuery,
  TeacherRegistry,
  TeacherRegistryCreate,
  TeacherRegistryUpdate,
  TeacherRegistryQuery,
  SchoolRegistry,
  SchoolRegistryCreate,
  SchoolRegistryUpdate,
  SchoolRegistryQuery,
  DigitalCertificate,
  DigitalCertificateCreate,
  DigitalCertificateUpdate,
  DigitalCertificateQuery,
  QrVerification,
  QrVerificationCreate,
  QrVerificationUpdate,
  QrVerificationQuery,
  IdentityVerification,
  IdentityVerificationCreate,
  IdentityVerificationUpdate,
  IdentityVerificationQuery,
  BiometricData,
  BiometricDataCreate,
  BiometricDataUpdate,
  BiometricDataQuery,
  IdentityAudit,
  IdentityAuditCreate,
  IdentityAuditUpdate,
  IdentityAuditQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 11: Compliance & Regulations
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  NationalStandard,
  NationalStandardCreate,
  NationalStandardUpdate,
  NationalStandardQuery,
  SchoolComplianceRecord,
  SchoolComplianceRecordCreate,
  SchoolComplianceRecordUpdate,
  SchoolComplianceRecordQuery,
  ComplianceAssessment,
  ComplianceAssessmentCreate,
  ComplianceAssessmentUpdate,
  ComplianceAssessmentQuery,
  ComplianceWaiver,
  ComplianceWaiverCreate,
  ComplianceWaiverUpdate,
  ComplianceWaiverQuery,
  RegulationCategory,
  RegulationCategoryCreate,
  RegulationCategoryUpdate,
  RegulationCategoryQuery,
  EducationRegulation,
  EducationRegulationCreate,
  EducationRegulationUpdate,
  EducationRegulationQuery,
  ComplianceNotification,
  ComplianceNotificationCreate,
  ComplianceNotificationUpdate,
  ComplianceNotificationQuery,
  ComplianceReport,
  ComplianceReportCreate,
  ComplianceReportUpdate,
  ComplianceReportQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 12: International Education
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  Country,
  CountryCreate,
  CountryUpdate,
  CountryQuery,
  Language,
  LanguageCreate,
  LanguageUpdate,
  LanguageQuery,
  Currency,
  CurrencyCreate,
  CurrencyUpdate,
  CurrencyQuery,
  EducationSystem,
  EducationSystemCreate,
  EducationSystemUpdate,
  EducationSystemQuery,
  Equivalency,
  EquivalencyCreate,
  EquivalencyUpdate,
  EquivalencyQuery,
  InternationalPartnership,
  InternationalPartnershipCreate,
  InternationalPartnershipUpdate,
  InternationalPartnershipQuery,
  ExchangeProgram,
  ExchangeProgramCreate,
  ExchangeProgramUpdate,
  ExchangeProgramQuery,
  InternationalStudent,
  InternationalStudentCreate,
  InternationalStudentUpdate,
  InternationalStudentQuery,
  CrossBorderResearch,
  CrossBorderResearchCreate,
  CrossBorderResearchUpdate,
  CrossBorderResearchQuery,
  GlobalBenchmark,
  GlobalBenchmarkCreate,
  GlobalBenchmarkUpdate,
  GlobalBenchmarkQuery
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 1: Ministry System - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovMinistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Ministry | null>;
  findAll(schoolId: string, query?: MinistryQuery): Promise<Ministry[]>;
  create(schoolId: string, data: MinistryCreate): Promise<Ministry>;
  update(schoolId: string, id: string, data: MinistryUpdate): Promise<Ministry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: MinistryQuery): Promise<number>;
  findActive(schoolId: string): Promise<Ministry[]>;
  findByCountry(schoolId: string, countryId: string): Promise<Ministry[]>;
  findByName(schoolId: string, name: string): Promise<Ministry | null>;
}

export interface GovMinistryDepartmentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<MinistryDepartment | null>;
  findAll(schoolId: string, query?: MinistryDepartmentQuery): Promise<MinistryDepartment[]>;
  create(schoolId: string, data: MinistryDepartmentCreate): Promise<MinistryDepartment>;
  update(schoolId: string, id: string, data: MinistryDepartmentUpdate): Promise<MinistryDepartment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: MinistryDepartmentQuery): Promise<number>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<MinistryDepartment[]>;
  findActive(schoolId: string): Promise<MinistryDepartment[]>;
  findByDirector(schoolId: string, directorId: string): Promise<MinistryDepartment[]>;
}

export interface GovDirectorateRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Directorate | null>;
  findAll(schoolId: string, query?: DirectorateQuery): Promise<Directorate[]>;
  create(schoolId: string, data: DirectorateCreate): Promise<Directorate>;
  update(schoolId: string, id: string, data: DirectorateUpdate): Promise<Directorate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DirectorateQuery): Promise<number>;
  findByDepartmentId(schoolId: string, departmentId: string): Promise<Directorate[]>;
  findActive(schoolId: string): Promise<Directorate[]>;
  findByRegion(schoolId: string, regionId: string): Promise<Directorate[]>;
}

export interface GovEducationPolicyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationPolicy | null>;
  findAll(schoolId: string, query?: EducationPolicyQuery): Promise<EducationPolicy[]>;
  create(schoolId: string, data: EducationPolicyCreate): Promise<EducationPolicy>;
  update(schoolId: string, id: string, data: EducationPolicyUpdate): Promise<EducationPolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationPolicyQuery): Promise<number>;
  findByStatus(schoolId: string, status: string): Promise<EducationPolicy[]>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<EducationPolicy[]>;
  findActive(schoolId: string): Promise<EducationPolicy[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<EducationPolicy[]>;
}

export interface GovNationalProgramRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NationalProgram | null>;
  findAll(schoolId: string, query?: NationalProgramQuery): Promise<NationalProgram[]>;
  create(schoolId: string, data: NationalProgramCreate): Promise<NationalProgram>;
  update(schoolId: string, id: string, data: NationalProgramUpdate): Promise<NationalProgram>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NationalProgramQuery): Promise<number>;
  findByPolicyId(schoolId: string, policyId: string): Promise<NationalProgram[]>;
  findActive(schoolId: string): Promise<NationalProgram[]>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<NationalProgram[]>;
}

export interface GovEducationStrategyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationStrategy | null>;
  findAll(schoolId: string, query?: EducationStrategyQuery): Promise<EducationStrategy[]>;
  create(schoolId: string, data: EducationStrategyCreate): Promise<EducationStrategy>;
  update(schoolId: string, id: string, data: EducationStrategyUpdate): Promise<EducationStrategy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationStrategyQuery): Promise<number>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<EducationStrategy[]>;
  findActive(schoolId: string): Promise<EducationStrategy[]>;
  findByStatus(schoolId: string, status: string): Promise<EducationStrategy[]>;
}

export interface GovCircularRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Circular | null>;
  findAll(schoolId: string, query?: CircularQuery): Promise<Circular[]>;
  create(schoolId: string, data: CircularCreate): Promise<Circular>;
  update(schoolId: string, id: string, data: CircularUpdate): Promise<Circular>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CircularQuery): Promise<number>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<Circular[]>;
  findActive(schoolId: string): Promise<Circular[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<Circular[]>;
  findByCategory(schoolId: string, category: string): Promise<Circular[]>;
}

export interface GovOfficialDocumentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<OfficialDocument | null>;
  findAll(schoolId: string, query?: OfficialDocumentQuery): Promise<OfficialDocument[]>;
  create(schoolId: string, data: OfficialDocumentCreate): Promise<OfficialDocument>;
  update(schoolId: string, id: string, data: OfficialDocumentUpdate): Promise<OfficialDocument>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: OfficialDocumentQuery): Promise<number>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<OfficialDocument[]>;
  findByType(schoolId: string, type: string): Promise<OfficialDocument[]>;
  findByStatus(schoolId: string, status: string): Promise<OfficialDocument[]>;
  archive(schoolId: string, id: string): Promise<void>;
}

export interface GovEducationCalendarRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationCalendar | null>;
  findAll(schoolId: string, query?: EducationCalendarQuery): Promise<EducationCalendar[]>;
  create(schoolId: string, data: EducationCalendarCreate): Promise<EducationCalendar>;
  update(schoolId: string, id: string, data: EducationCalendarUpdate): Promise<EducationCalendar>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationCalendarQuery): Promise<number>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<EducationCalendar[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<EducationCalendar[]>;
  findActive(schoolId: string): Promise<EducationCalendar[]>;
}

export interface GovNationalStatisticRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NationalStatistic | null>;
  findAll(schoolId: string, query?: NationalStatisticQuery): Promise<NationalStatistic[]>;
  create(schoolId: string, data: NationalStatisticCreate): Promise<NationalStatistic>;
  update(schoolId: string, id: string, data: NationalStatisticUpdate): Promise<NationalStatistic>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NationalStatisticQuery): Promise<number>;
  findByYear(schoolId: string, year: number): Promise<NationalStatistic[]>;
  findByCategory(schoolId: string, category: string): Promise<NationalStatistic[]>;
  findLatest(schoolId: string): Promise<NationalStatistic | null>;
}

export interface GovMinistryUserRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<MinistryUser | null>;
  findAll(schoolId: string, query?: MinistryUserQuery): Promise<MinistryUser[]>;
  create(schoolId: string, data: MinistryUserCreate): Promise<MinistryUser>;
  update(schoolId: string, id: string, data: MinistryUserUpdate): Promise<MinistryUser>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: MinistryUserQuery): Promise<number>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<MinistryUser[]>;
  findByRole(schoolId: string, role: string): Promise<MinistryUser[]>;
  findActive(schoolId: string): Promise<MinistryUser[]>;
}

export interface GovMinistryNotificationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<MinistryNotification | null>;
  findAll(schoolId: string, query?: MinistryNotificationQuery): Promise<MinistryNotification[]>;
  create(schoolId: string, data: MinistryNotificationCreate): Promise<MinistryNotification>;
  update(schoolId: string, id: string, data: MinistryNotificationUpdate): Promise<MinistryNotification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: MinistryNotificationQuery): Promise<number>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<MinistryNotification[]>;
  findUnread(schoolId: string, userId: string): Promise<MinistryNotification[]>;
  markAsRead(schoolId: string, id: string): Promise<void>;
  findByPriority(schoolId: string, priority: string): Promise<MinistryNotification[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 2: Regional Governance - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovEducationRegionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationRegion | null>;
  findAll(schoolId: string, query?: EducationRegionQuery): Promise<EducationRegion[]>;
  create(schoolId: string, data: EducationRegionCreate): Promise<EducationRegion>;
  update(schoolId: string, id: string, data: EducationRegionUpdate): Promise<EducationRegion>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationRegionQuery): Promise<number>;
  findActive(schoolId: string): Promise<EducationRegion[]>;
  findByName(schoolId: string, name: string): Promise<EducationRegion | null>;
  findByCountryId(schoolId: string, countryId: string): Promise<EducationRegion[]>;
}

export interface GovEducationDistrictRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationDistrict | null>;
  findAll(schoolId: string, query?: EducationDistrictQuery): Promise<EducationDistrict[]>;
  create(schoolId: string, data: EducationDistrictCreate): Promise<EducationDistrict>;
  update(schoolId: string, id: string, data: EducationDistrictUpdate): Promise<EducationDistrict>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationDistrictQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<EducationDistrict[]>;
  findActive(schoolId: string): Promise<EducationDistrict[]>;
  findByName(schoolId: string, name: string): Promise<EducationDistrict | null>;
}

export interface GovAcademyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Academy | null>;
  findAll(schoolId: string, query?: AcademyQuery): Promise<Academy[]>;
  create(schoolId: string, data: AcademyCreate): Promise<Academy>;
  update(schoolId: string, id: string, data: AcademyUpdate): Promise<Academy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: AcademyQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<Academy[]>;
  findActive(schoolId: string): Promise<Academy[]>;
  findBySpecialization(schoolId: string, specialization: string): Promise<Academy[]>;
}

export interface GovRegionalDirectorateRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<RegionalDirectorate | null>;
  findAll(schoolId: string, query?: RegionalDirectorateQuery): Promise<RegionalDirectorate[]>;
  create(schoolId: string, data: RegionalDirectorateCreate): Promise<RegionalDirectorate>;
  update(schoolId: string, id: string, data: RegionalDirectorateUpdate): Promise<RegionalDirectorate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RegionalDirectorateQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<RegionalDirectorate[]>;
  findActive(schoolId: string): Promise<RegionalDirectorate[]>;
  findByDirector(schoolId: string, directorId: string): Promise<RegionalDirectorate | null>;
}

export interface GovInspectorRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Inspector | null>;
  findAll(schoolId: string, query?: InspectorQuery): Promise<Inspector[]>;
  create(schoolId: string, data: InspectorCreate): Promise<Inspector>;
  update(schoolId: string, id: string, data: InspectorUpdate): Promise<Inspector>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectorQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<Inspector[]>;
  findActive(schoolId: string): Promise<Inspector[]>;
  findBySpecialization(schoolId: string, specialization: string): Promise<Inspector[]>;
}

export interface GovInspectionVisitRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InspectionVisit | null>;
  findAll(schoolId: string, query?: InspectionVisitQuery): Promise<InspectionVisit[]>;
  create(schoolId: string, data: InspectionVisitCreate): Promise<InspectionVisit>;
  update(schoolId: string, id: string, data: InspectionVisitUpdate): Promise<InspectionVisit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectionVisitQuery): Promise<number>;
  findByInspectorId(schoolId: string, inspectorId: string): Promise<InspectionVisit[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<InspectionVisit[]>;
  findByStatus(schoolId: string, status: string): Promise<InspectionVisit[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<InspectionVisit[]>;
}

export interface GovRegionalReportRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<RegionalReport | null>;
  findAll(schoolId: string, query?: RegionalReportQuery): Promise<RegionalReport[]>;
  create(schoolId: string, data: RegionalReportCreate): Promise<RegionalReport>;
  update(schoolId: string, id: string, data: RegionalReportUpdate): Promise<RegionalReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RegionalReportQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<RegionalReport[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<RegionalReport[]>;
  findByType(schoolId: string, type: string): Promise<RegionalReport[]>;
}

export interface GovRegionalKpiRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<RegionalKpi | null>;
  findAll(schoolId: string, query?: RegionalKpiQuery): Promise<RegionalKpi[]>;
  create(schoolId: string, data: RegionalKpiCreate): Promise<RegionalKpi>;
  update(schoolId: string, id: string, data: RegionalKpiUpdate): Promise<RegionalKpi>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RegionalKpiQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<RegionalKpi[]>;
  findByYear(schoolId: string, year: number): Promise<RegionalKpi[]>;
  findLatest(schoolId: string, regionId: string): Promise<RegionalKpi | null>;
}

export interface GovDistrictReportRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<DistrictReport | null>;
  findAll(schoolId: string, query?: DistrictReportQuery): Promise<DistrictReport[]>;
  create(schoolId: string, data: DistrictReportCreate): Promise<DistrictReport>;
  update(schoolId: string, id: string, data: DistrictReportUpdate): Promise<DistrictReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DistrictReportQuery): Promise<number>;
  findByDistrictId(schoolId: string, districtId: string): Promise<DistrictReport[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<DistrictReport[]>;
  findByType(schoolId: string, type: string): Promise<DistrictReport[]>;
}

export interface GovRegionUserRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<RegionUser | null>;
  findAll(schoolId: string, query?: RegionUserQuery): Promise<RegionUser[]>;
  create(schoolId: string, data: RegionUserCreate): Promise<RegionUser>;
  update(schoolId: string, id: string, data: RegionUserUpdate): Promise<RegionUser>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RegionUserQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<RegionUser[]>;
  findByRole(schoolId: string, role: string): Promise<RegionUser[]>;
  findActive(schoolId: string): Promise<RegionUser[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 3: Campus Management - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovCampusRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Campus | null>;
  findAll(schoolId: string, query?: CampusQuery): Promise<Campus[]>;
  create(schoolId: string, data: CampusCreate): Promise<Campus>;
  update(schoolId: string, id: string, data: CampusUpdate): Promise<Campus>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CampusQuery): Promise<number>;
  findActive(schoolId: string): Promise<Campus[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<Campus[]>;
  findByRegionId(schoolId: string, regionId: string): Promise<Campus[]>;
}

export interface GovCampusGroupRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CampusGroup | null>;
  findAll(schoolId: string, query?: CampusGroupQuery): Promise<CampusGroup[]>;
  create(schoolId: string, data: CampusGroupCreate): Promise<CampusGroup>;
  update(schoolId: string, id: string, data: CampusGroupUpdate): Promise<CampusGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CampusGroupQuery): Promise<number>;
  findByCampusId(schoolId: string, campusId: string): Promise<CampusGroup[]>;
  findActive(schoolId: string): Promise<CampusGroup[]>;
  findByType(schoolId: string, type: string): Promise<CampusGroup[]>;
}

export interface GovCampusGroupMemberRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CampusGroupMember | null>;
  findAll(schoolId: string, query?: CampusGroupMemberQuery): Promise<CampusGroupMember[]>;
  create(schoolId: string, data: CampusGroupMemberCreate): Promise<CampusGroupMember>;
  update(schoolId: string, id: string, data: CampusGroupMemberUpdate): Promise<CampusGroupMember>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CampusGroupMemberQuery): Promise<number>;
  findByGroupId(schoolId: string, groupId: string): Promise<CampusGroupMember[]>;
  findByUserId(schoolId: string, userId: string): Promise<CampusGroupMember[]>;
  findActive(schoolId: string, groupId: string): Promise<CampusGroupMember[]>;
}

export interface GovSharedResourceRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SharedResource | null>;
  findAll(schoolId: string, query?: SharedResourceQuery): Promise<SharedResource[]>;
  create(schoolId: string, data: SharedResourceCreate): Promise<SharedResource>;
  update(schoolId: string, id: string, data: SharedResourceUpdate): Promise<SharedResource>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SharedResourceQuery): Promise<number>;
  findByCampusId(schoolId: string, campusId: string): Promise<SharedResource[]>;
  findAvailable(schoolId: string): Promise<SharedResource[]>;
  findByType(schoolId: string, type: string): Promise<SharedResource[]>;
}

export interface GovSharedResourceBookingRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SharedResourceBooking | null>;
  findAll(schoolId: string, query?: SharedResourceBookingQuery): Promise<SharedResourceBooking[]>;
  create(schoolId: string, data: SharedResourceBookingCreate): Promise<SharedResourceBooking>;
  update(schoolId: string, id: string, data: SharedResourceBookingUpdate): Promise<SharedResourceBooking>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SharedResourceBookingQuery): Promise<number>;
  findByResourceId(schoolId: string, resourceId: string): Promise<SharedResourceBooking[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<SharedResourceBooking[]>;
  findByStatus(schoolId: string, status: string): Promise<SharedResourceBooking[]>;
  approve(schoolId: string, id: string): Promise<void>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface GovCrossCampusUserRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CrossCampusUser | null>;
  findAll(schoolId: string, query?: CrossCampusUserQuery): Promise<CrossCampusUser[]>;
  create(schoolId: string, data: CrossCampusUserCreate): Promise<CrossCampusUser>;
  update(schoolId: string, id: string, data: CrossCampusUserUpdate): Promise<CrossCampusUser>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CrossCampusUserQuery): Promise<number>;
  findByUserId(schoolId: string, userId: string): Promise<CrossCampusUser[]>;
  findByCampusId(schoolId: string, campusId: string): Promise<CrossCampusUser[]>;
  findActive(schoolId: string): Promise<CrossCampusUser[]>;
}

export interface GovCampusTransferRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CampusTransfer | null>;
  findAll(schoolId: string, query?: CampusTransferQuery): Promise<CampusTransfer[]>;
  create(schoolId: string, data: CampusTransferCreate): Promise<CampusTransfer>;
  update(schoolId: string, id: string, data: CampusTransferUpdate): Promise<CampusTransfer>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CampusTransferQuery): Promise<number>;
  findByStudentId(schoolId: string, studentId: string): Promise<CampusTransfer[]>;
  findByStatus(schoolId: string, status: string): Promise<CampusTransfer[]>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovCentralizedAdministrationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CentralizedAdministration | null>;
  findAll(schoolId: string, query?: CentralizedAdministrationQuery): Promise<CentralizedAdministration[]>;
  create(schoolId: string, data: CentralizedAdministrationCreate): Promise<CentralizedAdministration>;
  update(schoolId: string, id: string, data: CentralizedAdministrationUpdate): Promise<CentralizedAdministration>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CentralizedAdministrationQuery): Promise<number>;
  findByCampusId(schoolId: string, campusId: string): Promise<CentralizedAdministration[]>;
  findActive(schoolId: string): Promise<CentralizedAdministration[]>;
  findByType(schoolId: string, type: string): Promise<CentralizedAdministration[]>;
}

export interface GovCampusAnalyticsRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CampusAnalytics | null>;
  findAll(schoolId: string, query?: CampusAnalyticsQuery): Promise<CampusAnalytics[]>;
  create(schoolId: string, data: CampusAnalyticsCreate): Promise<CampusAnalytics>;
  update(schoolId: string, id: string, data: CampusAnalyticsUpdate): Promise<CampusAnalytics>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CampusAnalyticsQuery): Promise<number>;
  findByCampusId(schoolId: string, campusId: string): Promise<CampusAnalytics[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<CampusAnalytics[]>;
  findLatest(schoolId: string, campusId: string): Promise<CampusAnalytics | null>;
}

export interface GovInterCampusCommunicationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InterCampusCommunication | null>;
  findAll(schoolId: string, query?: InterCampusCommunicationQuery): Promise<InterCampusCommunication[]>;
  create(schoolId: string, data: InterCampusCommunicationCreate): Promise<InterCampusCommunication>;
  update(schoolId: string, id: string, data: InterCampusCommunicationUpdate): Promise<InterCampusCommunication>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InterCampusCommunicationQuery): Promise<number>;
  findBySenderCampusId(schoolId: string, campusId: string): Promise<InterCampusCommunication[]>;
  findByReceiverCampusId(schoolId: string, campusId: string): Promise<InterCampusCommunication[]>;
  findByStatus(schoolId: string, status: string): Promise<InterCampusCommunication[]>;
  markAsRead(schoolId: string, id: string): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 4: School Networks - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovSchoolNetworkRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SchoolNetwork | null>;
  findAll(schoolId: string, query?: SchoolNetworkQuery): Promise<SchoolNetwork[]>;
  create(schoolId: string, data: SchoolNetworkCreate): Promise<SchoolNetwork>;
  update(schoolId: string, id: string, data: SchoolNetworkUpdate): Promise<SchoolNetwork>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SchoolNetworkQuery): Promise<number>;
  findActive(schoolId: string): Promise<SchoolNetwork[]>;
  findByType(schoolId: string, type: string): Promise<SchoolNetwork[]>;
  findByName(schoolId: string, name: string): Promise<SchoolNetwork | null>;
}

export interface GovNetworkMemberRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NetworkMember | null>;
  findAll(schoolId: string, query?: NetworkMemberQuery): Promise<NetworkMember[]>;
  create(schoolId: string, data: NetworkMemberCreate): Promise<NetworkMember>;
  update(schoolId: string, id: string, data: NetworkMemberUpdate): Promise<NetworkMember>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NetworkMemberQuery): Promise<number>;
  findByNetworkId(schoolId: string, networkId: string): Promise<NetworkMember[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<NetworkMember[]>;
  findActive(schoolId: string, networkId: string): Promise<NetworkMember[]>;
}

export interface GovSchoolChainRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SchoolChain | null>;
  findAll(schoolId: string, query?: SchoolChainQuery): Promise<SchoolChain[]>;
  create(schoolId: string, data: SchoolChainCreate): Promise<SchoolChain>;
  update(schoolId: string, id: string, data: SchoolChainUpdate): Promise<SchoolChain>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SchoolChainQuery): Promise<number>;
  findActive(schoolId: string): Promise<SchoolChain[]>;
  findByName(schoolId: string, name: string): Promise<SchoolChain | null>;
  findByOwnerId(schoolId: string, ownerId: string): Promise<SchoolChain[]>;
}

export interface GovSchoolFranchiseRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SchoolFranchise | null>;
  findAll(schoolId: string, query?: SchoolFranchiseQuery): Promise<SchoolFranchise[]>;
  create(schoolId: string, data: SchoolFranchiseCreate): Promise<SchoolFranchise>;
  update(schoolId: string, id: string, data: SchoolFranchiseUpdate): Promise<SchoolFranchise>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SchoolFranchiseQuery): Promise<number>;
  findByChainId(schoolId: string, chainId: string): Promise<SchoolFranchise[]>;
  findByStatus(schoolId: string, status: string): Promise<SchoolFranchise[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovReligiousSchoolGroupRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ReligiousSchoolGroup | null>;
  findAll(schoolId: string, query?: ReligiousSchoolGroupQuery): Promise<ReligiousSchoolGroup[]>;
  create(schoolId: string, data: ReligiousSchoolGroupCreate): Promise<ReligiousSchoolGroup>;
  update(schoolId: string, id: string, data: ReligiousSchoolGroupUpdate): Promise<ReligiousSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ReligiousSchoolGroupQuery): Promise<number>;
  findByReligion(schoolId: string, religion: string): Promise<ReligiousSchoolGroup[]>;
  findActive(schoolId: string): Promise<ReligiousSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<ReligiousSchoolGroup | null>;
}

export interface GovPrivateSchoolGroupRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<PrivateSchoolGroup | null>;
  findAll(schoolId: string, query?: PrivateSchoolGroupQuery): Promise<PrivateSchoolGroup[]>;
  create(schoolId: string, data: PrivateSchoolGroupCreate): Promise<PrivateSchoolGroup>;
  update(schoolId: string, id: string, data: PrivateSchoolGroupUpdate): Promise<PrivateSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: PrivateSchoolGroupQuery): Promise<number>;
  findByOwnerId(schoolId: string, ownerId: string): Promise<PrivateSchoolGroup[]>;
  findActive(schoolId: string): Promise<PrivateSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<PrivateSchoolGroup | null>;
}

export interface GovNgoSchoolGroupRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NgoSchoolGroup | null>;
  findAll(schoolId: string, query?: NgoSchoolGroupQuery): Promise<NgoSchoolGroup[]>;
  create(schoolId: string, data: NgoSchoolGroupCreate): Promise<NgoSchoolGroup>;
  update(schoolId: string, id: string, data: NgoSchoolGroupUpdate): Promise<NgoSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NgoSchoolGroupQuery): Promise<number>;
  findByNgoId(schoolId: string, ngoId: string): Promise<NgoSchoolGroup[]>;
  findActive(schoolId: string): Promise<NgoSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<NgoSchoolGroup | null>;
}

export interface GovInternationalSchoolGroupRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InternationalSchoolGroup | null>;
  findAll(schoolId: string, query?: InternationalSchoolGroupQuery): Promise<InternationalSchoolGroup[]>;
  create(schoolId: string, data: InternationalSchoolGroupCreate): Promise<InternationalSchoolGroup>;
  update(schoolId: string, id: string, data: InternationalSchoolGroupUpdate): Promise<InternationalSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InternationalSchoolGroupQuery): Promise<number>;
  findByCountryId(schoolId: string, countryId: string): Promise<InternationalSchoolGroup[]>;
  findActive(schoolId: string): Promise<InternationalSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<InternationalSchoolGroup | null>;
}

export interface GovNetworkAgreementRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NetworkAgreement | null>;
  findAll(schoolId: string, query?: NetworkAgreementQuery): Promise<NetworkAgreement[]>;
  create(schoolId: string, data: NetworkAgreementCreate): Promise<NetworkAgreement>;
  update(schoolId: string, id: string, data: NetworkAgreementUpdate): Promise<NetworkAgreement>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NetworkAgreementQuery): Promise<number>;
  findByNetworkId(schoolId: string, networkId: string): Promise<NetworkAgreement[]>;
  findByStatus(schoolId: string, status: string): Promise<NetworkAgreement[]>;
  approve(schoolId: string, id: string): Promise<void>;
  findExpired(schoolId: string): Promise<NetworkAgreement[]>;
}

export interface GovNetworkReportRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NetworkReport | null>;
  findAll(schoolId: string, query?: NetworkReportQuery): Promise<NetworkReport[]>;
  create(schoolId: string, data: NetworkReportCreate): Promise<NetworkReport>;
  update(schoolId: string, id: string, data: NetworkReportUpdate): Promise<NetworkReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NetworkReportQuery): Promise<number>;
  findByNetworkId(schoolId: string, networkId: string): Promise<NetworkReport[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<NetworkReport[]>;
  findByType(schoolId: string, type: string): Promise<NetworkReport[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 5: National Examinations - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovNationalExamRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NationalExam | null>;
  findAll(schoolId: string, query?: NationalExamQuery): Promise<NationalExam[]>;
  create(schoolId: string, data: NationalExamCreate): Promise<NationalExam>;
  update(schoolId: string, id: string, data: NationalExamUpdate): Promise<NationalExam>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NationalExamQuery): Promise<number>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<NationalExam[]>;
  findActive(schoolId: string): Promise<NationalExam[]>;
  findByType(schoolId: string, type: string): Promise<NationalExam[]>;
}

export interface GovExamCenterRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamCenter | null>;
  findAll(schoolId: string, query?: ExamCenterQuery): Promise<ExamCenter[]>;
  create(schoolId: string, data: ExamCenterCreate): Promise<ExamCenter>;
  update(schoolId: string, id: string, data: ExamCenterUpdate): Promise<ExamCenter>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamCenterQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamCenter[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<ExamCenter[]>;
  findActive(schoolId: string): Promise<ExamCenter[]>;
}

export interface GovExamCandidateRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamCandidate | null>;
  findAll(schoolId: string, query?: ExamCandidateQuery): Promise<ExamCandidate[]>;
  create(schoolId: string, data: ExamCandidateCreate): Promise<ExamCandidate>;
  update(schoolId: string, id: string, data: ExamCandidateUpdate): Promise<ExamCandidate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamCandidateQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamCandidate[]>;
  findByStudentId(schoolId: string, studentId: string): Promise<ExamCandidate[]>;
  findByCenterId(schoolId: string, centerId: string): Promise<ExamCandidate[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamCandidate[]>;
}

export interface GovExamSupervisorRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamSupervisor | null>;
  findAll(schoolId: string, query?: ExamSupervisorQuery): Promise<ExamSupervisor[]>;
  create(schoolId: string, data: ExamSupervisorCreate): Promise<ExamSupervisor>;
  update(schoolId: string, id: string, data: ExamSupervisorUpdate): Promise<ExamSupervisor>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamSupervisorQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamSupervisor[]>;
  findByCenterId(schoolId: string, centerId: string): Promise<ExamSupervisor[]>;
  findActive(schoolId: string): Promise<ExamSupervisor[]>;
}

export interface GovExamSessionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamSession | null>;
  findAll(schoolId: string, query?: ExamSessionQuery): Promise<ExamSession[]>;
  create(schoolId: string, data: ExamSessionCreate): Promise<ExamSession>;
  update(schoolId: string, id: string, data: ExamSessionUpdate): Promise<ExamSession>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamSessionQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamSession[]>;
  findByCenterId(schoolId: string, centerId: string): Promise<ExamSession[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<ExamSession[]>;
}

export interface GovMarkingCenterRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<MarkingCenter | null>;
  findAll(schoolId: string, query?: MarkingCenterQuery): Promise<MarkingCenter[]>;
  create(schoolId: string, data: MarkingCenterCreate): Promise<MarkingCenter>;
  update(schoolId: string, id: string, data: MarkingCenterUpdate): Promise<MarkingCenter>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: MarkingCenterQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<MarkingCenter[]>;
  findActive(schoolId: string): Promise<MarkingCenter[]>;
  findByLocation(schoolId: string, location: string): Promise<MarkingCenter[]>;
}

export interface GovExamResultRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamResult | null>;
  findAll(schoolId: string, query?: ExamResultQuery): Promise<ExamResult[]>;
  create(schoolId: string, data: ExamResultCreate): Promise<ExamResult>;
  update(schoolId: string, id: string, data: ExamResultUpdate): Promise<ExamResult>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamResultQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamResult[]>;
  findByStudentId(schoolId: string, studentId: string): Promise<ExamResult[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamResult[]>;
  publish(schoolId: string, examId: string): Promise<void>;
}

export interface GovCertificateRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Certificate | null>;
  findAll(schoolId: string, query?: CertificateQuery): Promise<Certificate[]>;
  create(schoolId: string, data: CertificateCreate): Promise<Certificate>;
  update(schoolId: string, id: string, data: CertificateUpdate): Promise<Certificate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CertificateQuery): Promise<number>;
  findByStudentId(schoolId: string, studentId: string): Promise<Certificate[]>;
  findByExamId(schoolId: string, examId: string): Promise<Certificate[]>;
  verify(schoolId: string, certificateNumber: string): Promise<Certificate | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovDiplomaRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Diploma | null>;
  findAll(schoolId: string, query?: DiplomaQuery): Promise<Diploma[]>;
  create(schoolId: string, data: DiplomaCreate): Promise<Diploma>;
  update(schoolId: string, id: string, data: DiplomaUpdate): Promise<Diploma>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DiplomaQuery): Promise<number>;
  findByStudentId(schoolId: string, studentId: string): Promise<Diploma[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<Diploma[]>;
  verify(schoolId: string, diplomaNumber: string): Promise<Diploma | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovExamFraudRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamFraud | null>;
  findAll(schoolId: string, query?: ExamFraudQuery): Promise<ExamFraud[]>;
  create(schoolId: string, data: ExamFraudCreate): Promise<ExamFraud>;
  update(schoolId: string, id: string, data: ExamFraudUpdate): Promise<ExamFraud>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamFraudQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamFraud[]>;
  findByCandidateId(schoolId: string, candidateId: string): Promise<ExamFraud[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamFraud[]>;
  investigate(schoolId: string, id: string): Promise<void>;
}

export interface GovExamAppealRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamAppeal | null>;
  findAll(schoolId: string, query?: ExamAppealQuery): Promise<ExamAppeal[]>;
  create(schoolId: string, data: ExamAppealCreate): Promise<ExamAppeal>;
  update(schoolId: string, id: string, data: ExamAppealUpdate): Promise<ExamAppeal>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamAppealQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamAppeal[]>;
  findByCandidateId(schoolId: string, candidateId: string): Promise<ExamAppeal[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamAppeal[]>;
  resolve(schoolId: string, id: string, decision: string): Promise<void>;
}

export interface GovExamStatisticsRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExamStatistics | null>;
  findAll(schoolId: string, query?: ExamStatisticsQuery): Promise<ExamStatistics[]>;
  create(schoolId: string, data: ExamStatisticsCreate): Promise<ExamStatistics>;
  update(schoolId: string, id: string, data: ExamStatisticsUpdate): Promise<ExamStatistics>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExamStatisticsQuery): Promise<number>;
  findByExamId(schoolId: string, examId: string): Promise<ExamStatistics[]>;
  findByRegionId(schoolId: string, regionId: string): Promise<ExamStatistics[]>;
  findLatest(schoolId: string, examId: string): Promise<ExamStatistics | null>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 6: Inspections - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovInspectionMissionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InspectionMission | null>;
  findAll(schoolId: string, query?: InspectionMissionQuery): Promise<InspectionMission[]>;
  create(schoolId: string, data: InspectionMissionCreate): Promise<InspectionMission>;
  update(schoolId: string, id: string, data: InspectionMissionUpdate): Promise<InspectionMission>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectionMissionQuery): Promise<number>;
  findByInspectorId(schoolId: string, inspectorId: string): Promise<InspectionMission[]>;
  findByStatus(schoolId: string, status: string): Promise<InspectionMission[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<InspectionMission[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

export interface GovInspectionReportRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InspectionReport | null>;
  findAll(schoolId: string, query?: InspectionReportQuery): Promise<InspectionReport[]>;
  create(schoolId: string, data: InspectionReportCreate): Promise<InspectionReport>;
  update(schoolId: string, id: string, data: InspectionReportUpdate): Promise<InspectionReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectionReportQuery): Promise<number>;
  findByMissionId(schoolId: string, missionId: string): Promise<InspectionReport[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<InspectionReport[]>;
  findByStatus(schoolId: string, status: string): Promise<InspectionReport[]>;
  submit(schoolId: string, id: string): Promise<void>;
}

export interface GovInspectionRecommendationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InspectionRecommendation | null>;
  findAll(schoolId: string, query?: InspectionRecommendationQuery): Promise<InspectionRecommendation[]>;
  create(schoolId: string, data: InspectionRecommendationCreate): Promise<InspectionRecommendation>;
  update(schoolId: string, id: string, data: InspectionRecommendationUpdate): Promise<InspectionRecommendation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectionRecommendationQuery): Promise<number>;
  findByReportId(schoolId: string, reportId: string): Promise<InspectionRecommendation[]>;
  findByPriority(schoolId: string, priority: string): Promise<InspectionRecommendation[]>;
  findByStatus(schoolId: string, status: string): Promise<InspectionRecommendation[]>;
  implement(schoolId: string, id: string): Promise<void>;
}

export interface GovSchoolComplianceRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SchoolCompliance | null>;
  findAll(schoolId: string, query?: SchoolComplianceQuery): Promise<SchoolCompliance[]>;
  create(schoolId: string, data: SchoolComplianceCreate): Promise<SchoolCompliance>;
  update(schoolId: string, id: string, data: SchoolComplianceUpdate): Promise<SchoolCompliance>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SchoolComplianceQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<SchoolCompliance[]>;
  findByStatus(schoolId: string, status: string): Promise<SchoolCompliance[]>;
  findByStandardId(schoolId: string, standardId: string): Promise<SchoolCompliance[]>;
}

export interface GovCorrectiveActionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CorrectiveAction | null>;
  findAll(schoolId: string, query?: CorrectiveActionQuery): Promise<CorrectiveAction[]>;
  create(schoolId: string, data: CorrectiveActionCreate): Promise<CorrectiveAction>;
  update(schoolId: string, id: string, data: CorrectiveActionUpdate): Promise<CorrectiveAction>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CorrectiveActionQuery): Promise<number>;
  findByComplianceId(schoolId: string, complianceId: string): Promise<CorrectiveAction[]>;
  findByStatus(schoolId: string, status: string): Promise<CorrectiveAction[]>;
  findByDeadline(schoolId: string, deadline: string): Promise<CorrectiveAction[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

export interface GovInspectionCalendarRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InspectionCalendar | null>;
  findAll(schoolId: string, query?: InspectionCalendarQuery): Promise<InspectionCalendar[]>;
  create(schoolId: string, data: InspectionCalendarCreate): Promise<InspectionCalendar>;
  update(schoolId: string, id: string, data: InspectionCalendarUpdate): Promise<InspectionCalendar>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectionCalendarQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<InspectionCalendar[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<InspectionCalendar[]>;
  findByInspectorId(schoolId: string, inspectorId: string): Promise<InspectionCalendar[]>;
}

export interface GovSchoolRatingRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SchoolRating | null>;
  findAll(schoolId: string, query?: SchoolRatingQuery): Promise<SchoolRating[]>;
  create(schoolId: string, data: SchoolRatingCreate): Promise<SchoolRating>;
  update(schoolId: string, id: string, data: SchoolRatingUpdate): Promise<SchoolRating>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SchoolRatingQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<SchoolRating[]>;
  findByRegionId(schoolId: string, regionId: string): Promise<SchoolRating[]>;
  findLatest(schoolId: string, schoolId_: string): Promise<SchoolRating | null>;
}

export interface GovInspectionChecklistRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InspectionChecklist | null>;
  findAll(schoolId: string, query?: InspectionChecklistQuery): Promise<InspectionChecklist[]>;
  create(schoolId: string, data: InspectionChecklistCreate): Promise<InspectionChecklist>;
  update(schoolId: string, id: string, data: InspectionChecklistUpdate): Promise<InspectionChecklist>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectionChecklistQuery): Promise<number>;
  findByMissionId(schoolId: string, missionId: string): Promise<InspectionChecklist[]>;
  findByCategory(schoolId: string, category: string): Promise<InspectionChecklist[]>;
  findActive(schoolId: string): Promise<InspectionChecklist[]>;
}

export interface GovInspectorPerformanceRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InspectorPerformance | null>;
  findAll(schoolId: string, query?: InspectorPerformanceQuery): Promise<InspectorPerformance[]>;
  create(schoolId: string, data: InspectorPerformanceCreate): Promise<InspectorPerformance>;
  update(schoolId: string, id: string, data: InspectorPerformanceUpdate): Promise<InspectorPerformance>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InspectorPerformanceQuery): Promise<number>;
  findByInspectorId(schoolId: string, inspectorId: string): Promise<InspectorPerformance[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<InspectorPerformance[]>;
  findLatest(schoolId: string, inspectorId: string): Promise<InspectorPerformance | null>;
}

export interface GovComplianceTrendRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ComplianceTrend | null>;
  findAll(schoolId: string, query?: ComplianceTrendQuery): Promise<ComplianceTrend[]>;
  create(schoolId: string, data: ComplianceTrendCreate): Promise<ComplianceTrend>;
  update(schoolId: string, id: string, data: ComplianceTrendUpdate): Promise<ComplianceTrend>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ComplianceTrendQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<ComplianceTrend[]>;
  findByRegionId(schoolId: string, regionId: string): Promise<ComplianceTrend[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<ComplianceTrend[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 7: Accreditation - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovAccreditationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Accreditation | null>;
  findAll(schoolId: string, query?: AccreditationQuery): Promise<Accreditation[]>;
  create(schoolId: string, data: AccreditationCreate): Promise<Accreditation>;
  update(schoolId: string, id: string, data: AccreditationUpdate): Promise<Accreditation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: AccreditationQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<Accreditation[]>;
  findByStatus(schoolId: string, status: string): Promise<Accreditation[]>;
  approve(schoolId: string, id: string): Promise<void>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovAccreditationStandardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<AccreditationStandard | null>;
  findAll(schoolId: string, query?: AccreditationStandardQuery): Promise<AccreditationStandard[]>;
  create(schoolId: string, data: AccreditationStandardCreate): Promise<AccreditationStandard>;
  update(schoolId: string, id: string, data: AccreditationStandardUpdate): Promise<AccreditationStandard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: AccreditationStandardQuery): Promise<number>;
  findByCategory(schoolId: string, category: string): Promise<AccreditationStandard[]>;
  findActive(schoolId: string): Promise<AccreditationStandard[]>;
  findByName(schoolId: string, name: string): Promise<AccreditationStandard | null>;
}

export interface GovAccreditationAssessmentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<AccreditationAssessment | null>;
  findAll(schoolId: string, query?: AccreditationAssessmentQuery): Promise<AccreditationAssessment[]>;
  create(schoolId: string, data: AccreditationAssessmentCreate): Promise<AccreditationAssessment>;
  update(schoolId: string, id: string, data: AccreditationAssessmentUpdate): Promise<AccreditationAssessment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: AccreditationAssessmentQuery): Promise<number>;
  findByAccreditationId(schoolId: string, accreditationId: string): Promise<AccreditationAssessment[]>;
  findByStandardId(schoolId: string, standardId: string): Promise<AccreditationAssessment[]>;
  findByStatus(schoolId: string, status: string): Promise<AccreditationAssessment[]>;
}

export interface GovCertificationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Certification | null>;
  findAll(schoolId: string, query?: CertificationQuery): Promise<Certification[]>;
  create(schoolId: string, data: CertificationCreate): Promise<Certification>;
  update(schoolId: string, id: string, data: CertificationUpdate): Promise<Certification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CertificationQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<Certification[]>;
  findActive(schoolId: string): Promise<Certification[]>;
  findExpired(schoolId: string): Promise<Certification[]>;
  renew(schoolId: string, id: string): Promise<void>;
}

export interface GovRenewalRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Renewal | null>;
  findAll(schoolId: string, query?: RenewalQuery): Promise<Renewal[]>;
  create(schoolId: string, data: RenewalCreate): Promise<Renewal>;
  update(schoolId: string, id: string, data: RenewalUpdate): Promise<Renewal>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RenewalQuery): Promise<number>;
  findByCertificationId(schoolId: string, certificationId: string): Promise<Renewal[]>;
  findByStatus(schoolId: string, status: string): Promise<Renewal[]>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovQualityAuditRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<QualityAudit | null>;
  findAll(schoolId: string, query?: QualityAuditQuery): Promise<QualityAudit[]>;
  create(schoolId: string, data: QualityAuditCreate): Promise<QualityAudit>;
  update(schoolId: string, id: string, data: QualityAuditUpdate): Promise<QualityAudit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: QualityAuditQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<QualityAudit[]>;
  findByStatus(schoolId: string, status: string): Promise<QualityAudit[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<QualityAudit[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

export interface GovComplianceRuleRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ComplianceRule | null>;
  findAll(schoolId: string, query?: ComplianceRuleQuery): Promise<ComplianceRule[]>;
  create(schoolId: string, data: ComplianceRuleCreate): Promise<ComplianceRule>;
  update(schoolId: string, id: string, data: ComplianceRuleUpdate): Promise<ComplianceRule>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ComplianceRuleQuery): Promise<number>;
  findByCategory(schoolId: string, category: string): Promise<ComplianceRule[]>;
  findActive(schoolId: string): Promise<ComplianceRule[]>;
  findByName(schoolId: string, name: string): Promise<ComplianceRule | null>;
}

export interface GovQualityIndicatorRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<QualityIndicator | null>;
  findAll(schoolId: string, query?: QualityIndicatorQuery): Promise<QualityIndicator[]>;
  create(schoolId: string, data: QualityIndicatorCreate): Promise<QualityIndicator>;
  update(schoolId: string, id: string, data: QualityIndicatorUpdate): Promise<QualityIndicator>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: QualityIndicatorQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<QualityIndicator[]>;
  findByCategory(schoolId: string, category: string): Promise<QualityIndicator[]>;
  findLatest(schoolId: string, schoolId_: string): Promise<QualityIndicator | null>;
}

export interface GovAccreditationDocumentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<AccreditationDocument | null>;
  findAll(schoolId: string, query?: AccreditationDocumentQuery): Promise<AccreditationDocument[]>;
  create(schoolId: string, data: AccreditationDocumentCreate): Promise<AccreditationDocument>;
  update(schoolId: string, id: string, data: AccreditationDocumentUpdate): Promise<AccreditationDocument>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: AccreditationDocumentQuery): Promise<number>;
  findByAccreditationId(schoolId: string, accreditationId: string): Promise<AccreditationDocument[]>;
  findByType(schoolId: string, type: string): Promise<AccreditationDocument[]>;
  verify(schoolId: string, id: string): Promise<void>;
}

export interface GovAuditFindingRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<AuditFinding | null>;
  findAll(schoolId: string, query?: AuditFindingQuery): Promise<AuditFinding[]>;
  create(schoolId: string, data: AuditFindingCreate): Promise<AuditFinding>;
  update(schoolId: string, id: string, data: AuditFindingUpdate): Promise<AuditFinding>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: AuditFindingQuery): Promise<number>;
  findByAuditId(schoolId: string, auditId: string): Promise<AuditFinding[]>;
  findBySeverity(schoolId: string, severity: string): Promise<AuditFinding[]>;
  findByStatus(schoolId: string, status: string): Promise<AuditFinding[]>;
  resolve(schoolId: string, id: string): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 8: Analytics & Dashboards - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovEducationKpiRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationKpi | null>;
  findAll(schoolId: string, query?: EducationKpiQuery): Promise<EducationKpi[]>;
  create(schoolId: string, data: EducationKpiCreate): Promise<EducationKpi>;
  update(schoolId: string, id: string, data: EducationKpiUpdate): Promise<EducationKpi>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationKpiQuery): Promise<number>;
  findByCategory(schoolId: string, category: string): Promise<EducationKpi[]>;
  findByYear(schoolId: string, year: number): Promise<EducationKpi[]>;
  findLatest(schoolId: string): Promise<EducationKpi | null>;
}

export interface GovRegionalAnalyticsKpiRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<RegionalAnalyticsKpi | null>;
  findAll(schoolId: string, query?: RegionalAnalyticsKpiQuery): Promise<RegionalAnalyticsKpi[]>;
  create(schoolId: string, data: RegionalAnalyticsKpiCreate): Promise<RegionalAnalyticsKpi>;
  update(schoolId: string, id: string, data: RegionalAnalyticsKpiUpdate): Promise<RegionalAnalyticsKpi>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RegionalAnalyticsKpiQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<RegionalAnalyticsKpi[]>;
  findByYear(schoolId: string, year: number): Promise<RegionalAnalyticsKpi[]>;
  findLatest(schoolId: string, regionId: string): Promise<RegionalAnalyticsKpi | null>;
}

export interface GovNationalDashboardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NationalDashboard | null>;
  findAll(schoolId: string, query?: NationalDashboardQuery): Promise<NationalDashboard[]>;
  create(schoolId: string, data: NationalDashboardCreate): Promise<NationalDashboard>;
  update(schoolId: string, id: string, data: NationalDashboardUpdate): Promise<NationalDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NationalDashboardQuery): Promise<number>;
  findActive(schoolId: string): Promise<NationalDashboard[]>;
  findByType(schoolId: string, type: string): Promise<NationalDashboard[]>;
  findByOwnerId(schoolId: string, ownerId: string): Promise<NationalDashboard[]>;
}

export interface GovDashboardWidgetRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<DashboardWidget | null>;
  findAll(schoolId: string, query?: DashboardWidgetQuery): Promise<DashboardWidget[]>;
  create(schoolId: string, data: DashboardWidgetCreate): Promise<DashboardWidget>;
  update(schoolId: string, id: string, data: DashboardWidgetUpdate): Promise<DashboardWidget>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DashboardWidgetQuery): Promise<number>;
  findByDashboardId(schoolId: string, dashboardId: string): Promise<DashboardWidget[]>;
  findByType(schoolId: string, type: string): Promise<DashboardWidget[]>;
  reorder(schoolId: string, dashboardId: string, widgetIds: string[]): Promise<void>;
}

export interface GovPredictiveAnalyticRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<PredictiveAnalytic | null>;
  findAll(schoolId: string, query?: PredictiveAnalyticQuery): Promise<PredictiveAnalytic[]>;
  create(schoolId: string, data: PredictiveAnalyticCreate): Promise<PredictiveAnalytic>;
  update(schoolId: string, id: string, data: PredictiveAnalyticUpdate): Promise<PredictiveAnalytic>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: PredictiveAnalyticQuery): Promise<number>;
  findByModelType(schoolId: string, modelType: string): Promise<PredictiveAnalytic[]>;
  findByStatus(schoolId: string, status: string): Promise<PredictiveAnalytic[]>;
  findLatest(schoolId: string, modelType: string): Promise<PredictiveAnalytic | null>;
}

export interface GovDropoutMapRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<DropoutMap | null>;
  findAll(schoolId: string, query?: DropoutMapQuery): Promise<DropoutMap[]>;
  create(schoolId: string, data: DropoutMapCreate): Promise<DropoutMap>;
  update(schoolId: string, id: string, data: DropoutMapUpdate): Promise<DropoutMap>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DropoutMapQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<DropoutMap[]>;
  findByYear(schoolId: string, year: number): Promise<DropoutMap[]>;
  findLatest(schoolId: string): Promise<DropoutMap | null>;
}

export interface GovInfrastructureMapRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InfrastructureMap | null>;
  findAll(schoolId: string, query?: InfrastructureMapQuery): Promise<InfrastructureMap[]>;
  create(schoolId: string, data: InfrastructureMapCreate): Promise<InfrastructureMap>;
  update(schoolId: string, id: string, data: InfrastructureMapUpdate): Promise<InfrastructureMap>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InfrastructureMapQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<InfrastructureMap[]>;
  findByType(schoolId: string, type: string): Promise<InfrastructureMap[]>;
  findLatest(schoolId: string): Promise<InfrastructureMap | null>;
}

export interface GovTeacherDistributionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<TeacherDistribution | null>;
  findAll(schoolId: string, query?: TeacherDistributionQuery): Promise<TeacherDistribution[]>;
  create(schoolId: string, data: TeacherDistributionCreate): Promise<TeacherDistribution>;
  update(schoolId: string, id: string, data: TeacherDistributionUpdate): Promise<TeacherDistribution>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: TeacherDistributionQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<TeacherDistribution[]>;
  findByYear(schoolId: string, year: number): Promise<TeacherDistribution[]>;
  findLatest(schoolId: string): Promise<TeacherDistribution | null>;
}

export interface GovStudentDistributionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<StudentDistribution | null>;
  findAll(schoolId: string, query?: StudentDistributionQuery): Promise<StudentDistribution[]>;
  create(schoolId: string, data: StudentDistributionCreate): Promise<StudentDistribution>;
  update(schoolId: string, id: string, data: StudentDistributionUpdate): Promise<StudentDistribution>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: StudentDistributionQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<StudentDistribution[]>;
  findByYear(schoolId: string, year: number): Promise<StudentDistribution[]>;
  findLatest(schoolId: string): Promise<StudentDistribution | null>;
}

export interface GovBudgetAnalyticRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<BudgetAnalytic | null>;
  findAll(schoolId: string, query?: BudgetAnalyticQuery): Promise<BudgetAnalytic[]>;
  create(schoolId: string, data: BudgetAnalyticCreate): Promise<BudgetAnalytic>;
  update(schoolId: string, id: string, data: BudgetAnalyticUpdate): Promise<BudgetAnalytic>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: BudgetAnalyticQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<BudgetAnalytic[]>;
  findByYear(schoolId: string, year: number): Promise<BudgetAnalytic[]>;
  findLatest(schoolId: string): Promise<BudgetAnalytic | null>;
}

export interface GovEducationForecastRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationForecast | null>;
  findAll(schoolId: string, query?: EducationForecastQuery): Promise<EducationForecast[]>;
  create(schoolId: string, data: EducationForecastCreate): Promise<EducationForecast>;
  update(schoolId: string, id: string, data: EducationForecastUpdate): Promise<EducationForecast>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationForecastQuery): Promise<number>;
  findByModelType(schoolId: string, modelType: string): Promise<EducationForecast[]>;
  findByTargetYear(schoolId: string, targetYear: number): Promise<EducationForecast[]>;
  findLatest(schoolId: string, modelType: string): Promise<EducationForecast | null>;
}

export interface GovDataCollectionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<DataCollection | null>;
  findAll(schoolId: string, query?: DataCollectionQuery): Promise<DataCollection[]>;
  create(schoolId: string, data: DataCollectionCreate): Promise<DataCollection>;
  update(schoolId: string, id: string, data: DataCollectionUpdate): Promise<DataCollection>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DataCollectionQuery): Promise<number>;
  findByStatus(schoolId: string, status: string): Promise<DataCollection[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<DataCollection[]>;
  findByType(schoolId: string, type: string): Promise<DataCollection[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 9: Funding & Finance - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovGovernmentFundingRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<GovernmentFunding | null>;
  findAll(schoolId: string, query?: GovernmentFundingQuery): Promise<GovernmentFunding[]>;
  create(schoolId: string, data: GovernmentFundingCreate): Promise<GovernmentFunding>;
  update(schoolId: string, id: string, data: GovernmentFundingUpdate): Promise<GovernmentFunding>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: GovernmentFundingQuery): Promise<number>;
  findByFiscalYear(schoolId: string, fiscalYear: string): Promise<GovernmentFunding[]>;
  findByStatus(schoolId: string, status: string): Promise<GovernmentFunding[]>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<GovernmentFunding[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovFundingAllocationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<FundingAllocation | null>;
  findAll(schoolId: string, query?: FundingAllocationQuery): Promise<FundingAllocation[]>;
  create(schoolId: string, data: FundingAllocationCreate): Promise<FundingAllocation>;
  update(schoolId: string, id: string, data: FundingAllocationUpdate): Promise<FundingAllocation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: FundingAllocationQuery): Promise<number>;
  findByFundingId(schoolId: string, fundingId: string): Promise<FundingAllocation[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<FundingAllocation[]>;
  findByStatus(schoolId: string, status: string): Promise<FundingAllocation[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovScholarshipRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Scholarship | null>;
  findAll(schoolId: string, query?: ScholarshipQuery): Promise<Scholarship[]>;
  create(schoolId: string, data: ScholarshipCreate): Promise<Scholarship>;
  update(schoolId: string, id: string, data: ScholarshipUpdate): Promise<Scholarship>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ScholarshipQuery): Promise<number>;
  findByStatus(schoolId: string, status: string): Promise<Scholarship[]>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<Scholarship[]>;
  findActive(schoolId: string): Promise<Scholarship[]>;
}

export interface GovScholarshipApplicationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ScholarshipApplication | null>;
  findAll(schoolId: string, query?: ScholarshipApplicationQuery): Promise<ScholarshipApplication[]>;
  create(schoolId: string, data: ScholarshipApplicationCreate): Promise<ScholarshipApplication>;
  update(schoolId: string, id: string, data: ScholarshipApplicationUpdate): Promise<ScholarshipApplication>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ScholarshipApplicationQuery): Promise<number>;
  findByScholarshipId(schoolId: string, scholarshipId: string): Promise<ScholarshipApplication[]>;
  findByStudentId(schoolId: string, studentId: string): Promise<ScholarshipApplication[]>;
  findByStatus(schoolId: string, status: string): Promise<ScholarshipApplication[]>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovGrantRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Grant | null>;
  findAll(schoolId: string, query?: GrantQuery): Promise<Grant[]>;
  create(schoolId: string, data: GrantCreate): Promise<Grant>;
  update(schoolId: string, id: string, data: GrantUpdate): Promise<Grant>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: GrantQuery): Promise<number>;
  findByDonorId(schoolId: string, donorId: string): Promise<Grant[]>;
  findByStatus(schoolId: string, status: string): Promise<Grant[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<Grant[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovGrantProjectRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<GrantProject | null>;
  findAll(schoolId: string, query?: GrantProjectQuery): Promise<GrantProject[]>;
  create(schoolId: string, data: GrantProjectCreate): Promise<GrantProject>;
  update(schoolId: string, id: string, data: GrantProjectUpdate): Promise<GrantProject>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: GrantProjectQuery): Promise<number>;
  findByGrantId(schoolId: string, grantId: string): Promise<GrantProject[]>;
  findByStatus(schoolId: string, status: string): Promise<GrantProject[]>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<GrantProject[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

export interface GovDonorRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Donor | null>;
  findAll(schoolId: string, query?: DonorQuery): Promise<Donor[]>;
  create(schoolId: string, data: DonorCreate): Promise<Donor>;
  update(schoolId: string, id: string, data: DonorUpdate): Promise<Donor>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DonorQuery): Promise<number>;
  findActive(schoolId: string): Promise<Donor[]>;
  findByType(schoolId: string, type: string): Promise<Donor[]>;
  findByName(schoolId: string, name: string): Promise<Donor | null>;
}

export interface GovNgoPartnerRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NgoPartner | null>;
  findAll(schoolId: string, query?: NgoPartnerQuery): Promise<NgoPartner[]>;
  create(schoolId: string, data: NgoPartnerCreate): Promise<NgoPartner>;
  update(schoolId: string, id: string, data: NgoPartnerUpdate): Promise<NgoPartner>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NgoPartnerQuery): Promise<number>;
  findActive(schoolId: string): Promise<NgoPartner[]>;
  findBySpecialization(schoolId: string, specialization: string): Promise<NgoPartner[]>;
  findByName(schoolId: string, name: string): Promise<NgoPartner | null>;
}

export interface GovBudgetAllocationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<BudgetAllocation | null>;
  findAll(schoolId: string, query?: BudgetAllocationQuery): Promise<BudgetAllocation[]>;
  create(schoolId: string, data: BudgetAllocationCreate): Promise<BudgetAllocation>;
  update(schoolId: string, id: string, data: BudgetAllocationUpdate): Promise<BudgetAllocation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: BudgetAllocationQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<BudgetAllocation[]>;
  findByFiscalYear(schoolId: string, fiscalYear: string): Promise<BudgetAllocation[]>;
  findByStatus(schoolId: string, status: string): Promise<BudgetAllocation[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovRegionalBudgetRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<RegionalBudget | null>;
  findAll(schoolId: string, query?: RegionalBudgetQuery): Promise<RegionalBudget[]>;
  create(schoolId: string, data: RegionalBudgetCreate): Promise<RegionalBudget>;
  update(schoolId: string, id: string, data: RegionalBudgetUpdate): Promise<RegionalBudget>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RegionalBudgetQuery): Promise<number>;
  findByRegionId(schoolId: string, regionId: string): Promise<RegionalBudget[]>;
  findByFiscalYear(schoolId: string, fiscalYear: string): Promise<RegionalBudget[]>;
  findByStatus(schoolId: string, status: string): Promise<RegionalBudget[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovFundDisbursementRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<FundDisbursement | null>;
  findAll(schoolId: string, query?: FundDisbursementQuery): Promise<FundDisbursement[]>;
  create(schoolId: string, data: FundDisbursementCreate): Promise<FundDisbursement>;
  update(schoolId: string, id: string, data: FundDisbursementUpdate): Promise<FundDisbursement>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: FundDisbursementQuery): Promise<number>;
  findByAllocationId(schoolId: string, allocationId: string): Promise<FundDisbursement[]>;
  findByStatus(schoolId: string, status: string): Promise<FundDisbursement[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<FundDisbursement[]>;
  process(schoolId: string, id: string): Promise<void>;
}

export interface GovFundingReportRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<FundingReport | null>;
  findAll(schoolId: string, query?: FundingReportQuery): Promise<FundingReport[]>;
  create(schoolId: string, data: FundingReportCreate): Promise<FundingReport>;
  update(schoolId: string, id: string, data: FundingReportUpdate): Promise<FundingReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: FundingReportQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<FundingReport[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<FundingReport[]>;
  findByType(schoolId: string, type: string): Promise<FundingReport[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 10: Identity Management - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovNationalStudentIdRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NationalStudentId | null>;
  findAll(schoolId: string, query?: NationalStudentIdQuery): Promise<NationalStudentId[]>;
  create(schoolId: string, data: NationalStudentIdCreate): Promise<NationalStudentId>;
  update(schoolId: string, id: string, data: NationalStudentIdUpdate): Promise<NationalStudentId>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NationalStudentIdQuery): Promise<number>;
  findByStudentId(schoolId: string, studentId: string): Promise<NationalStudentId | null>;
  findByNationalId(schoolId: string, nationalId: string): Promise<NationalStudentId | null>;
  verify(schoolId: string, nationalId: string): Promise<NationalStudentId | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovTeacherRegistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<TeacherRegistry | null>;
  findAll(schoolId: string, query?: TeacherRegistryQuery): Promise<TeacherRegistry[]>;
  create(schoolId: string, data: TeacherRegistryCreate): Promise<TeacherRegistry>;
  update(schoolId: string, id: string, data: TeacherRegistryUpdate): Promise<TeacherRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: TeacherRegistryQuery): Promise<number>;
  findByTeacherId(schoolId: string, teacherId: string): Promise<TeacherRegistry | null>;
  findByLicenseNumber(schoolId: string, licenseNumber: string): Promise<TeacherRegistry | null>;
  verify(schoolId: string, id: string): Promise<void>;
  suspend(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovSchoolRegistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SchoolRegistry | null>;
  findAll(schoolId: string, query?: SchoolRegistryQuery): Promise<SchoolRegistry[]>;
  create(schoolId: string, data: SchoolRegistryCreate): Promise<SchoolRegistry>;
  update(schoolId: string, id: string, data: SchoolRegistryUpdate): Promise<SchoolRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SchoolRegistryQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<SchoolRegistry | null>;
  findByRegistrationNumber(schoolId: string, registrationNumber: string): Promise<SchoolRegistry | null>;
  verify(schoolId: string, id: string): Promise<void>;
  deregister(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovDigitalCertificateRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<DigitalCertificate | null>;
  findAll(schoolId: string, query?: DigitalCertificateQuery): Promise<DigitalCertificate[]>;
  create(schoolId: string, data: DigitalCertificateCreate): Promise<DigitalCertificate>;
  update(schoolId: string, id: string, data: DigitalCertificateUpdate): Promise<DigitalCertificate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: DigitalCertificateQuery): Promise<number>;
  findByUserId(schoolId: string, userId: string): Promise<DigitalCertificate[]>;
  findActive(schoolId: string): Promise<DigitalCertificate[]>;
  verify(schoolId: string, certificateId: string): Promise<DigitalCertificate | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovQrVerificationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<QrVerification | null>;
  findAll(schoolId: string, query?: QrVerificationQuery): Promise<QrVerification[]>;
  create(schoolId: string, data: QrVerificationCreate): Promise<QrVerification>;
  update(schoolId: string, id: string, data: QrVerificationUpdate): Promise<QrVerification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: QrVerificationQuery): Promise<number>;
  findByCode(schoolId: string, code: string): Promise<QrVerification | null>;
  verify(schoolId: string, code: string): Promise<QrVerification | null>;
  invalidate(schoolId: string, id: string): Promise<void>;
  findActive(schoolId: string): Promise<QrVerification[]>;
}

export interface GovIdentityVerificationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<IdentityVerification | null>;
  findAll(schoolId: string, query?: IdentityVerificationQuery): Promise<IdentityVerification[]>;
  create(schoolId: string, data: IdentityVerificationCreate): Promise<IdentityVerification>;
  update(schoolId: string, id: string, data: IdentityVerificationUpdate): Promise<IdentityVerification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: IdentityVerificationQuery): Promise<number>;
  findByUserId(schoolId: string, userId: string): Promise<IdentityVerification[]>;
  findByStatus(schoolId: string, status: string): Promise<IdentityVerification[]>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GovBiometricDataRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<BiometricData | null>;
  findAll(schoolId: string, query?: BiometricDataQuery): Promise<BiometricData[]>;
  create(schoolId: string, data: BiometricDataCreate): Promise<BiometricData>;
  update(schoolId: string, id: string, data: BiometricDataUpdate): Promise<BiometricData>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: BiometricDataQuery): Promise<number>;
  findByUserId(schoolId: string, userId: string): Promise<BiometricData[]>;
  findByType(schoolId: string, type: string): Promise<BiometricData[]>;
  verify(schoolId: string, id: string): Promise<void>;
  deactivate(schoolId: string, id: string): Promise<void>;
}

export interface GovIdentityAuditRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<IdentityAudit | null>;
  findAll(schoolId: string, query?: IdentityAuditQuery): Promise<IdentityAudit[]>;
  create(schoolId: string, data: IdentityAuditCreate): Promise<IdentityAudit>;
  update(schoolId: string, id: string, data: IdentityAuditUpdate): Promise<IdentityAudit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: IdentityAuditQuery): Promise<number>;
  findByUserId(schoolId: string, userId: string): Promise<IdentityAudit[]>;
  findByAction(schoolId: string, action: string): Promise<IdentityAudit[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<IdentityAudit[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 11: Compliance & Regulations - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovNationalStandardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<NationalStandard | null>;
  findAll(schoolId: string, query?: NationalStandardQuery): Promise<NationalStandard[]>;
  create(schoolId: string, data: NationalStandardCreate): Promise<NationalStandard>;
  update(schoolId: string, id: string, data: NationalStandardUpdate): Promise<NationalStandard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: NationalStandardQuery): Promise<number>;
  findByCategory(schoolId: string, category: string): Promise<NationalStandard[]>;
  findActive(schoolId: string): Promise<NationalStandard[]>;
  findByName(schoolId: string, name: string): Promise<NationalStandard | null>;
}

export interface GovSchoolComplianceRecordRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<SchoolComplianceRecord | null>;
  findAll(schoolId: string, query?: SchoolComplianceRecordQuery): Promise<SchoolComplianceRecord[]>;
  create(schoolId: string, data: SchoolComplianceRecordCreate): Promise<SchoolComplianceRecord>;
  update(schoolId: string, id: string, data: SchoolComplianceRecordUpdate): Promise<SchoolComplianceRecord>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: SchoolComplianceRecordQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<SchoolComplianceRecord[]>;
  findByStandardId(schoolId: string, standardId: string): Promise<SchoolComplianceRecord[]>;
  findByStatus(schoolId: string, status: string): Promise<SchoolComplianceRecord[]>;
}

export interface GovComplianceAssessmentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ComplianceAssessment | null>;
  findAll(schoolId: string, query?: ComplianceAssessmentQuery): Promise<ComplianceAssessment[]>;
  create(schoolId: string, data: ComplianceAssessmentCreate): Promise<ComplianceAssessment>;
  update(schoolId: string, id: string, data: ComplianceAssessmentUpdate): Promise<ComplianceAssessment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ComplianceAssessmentQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<ComplianceAssessment[]>;
  findByStandardId(schoolId: string, standardId: string): Promise<ComplianceAssessment[]>;
  findByStatus(schoolId: string, status: string): Promise<ComplianceAssessment[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovComplianceWaiverRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ComplianceWaiver | null>;
  findAll(schoolId: string, query?: ComplianceWaiverQuery): Promise<ComplianceWaiver[]>;
  create(schoolId: string, data: ComplianceWaiverCreate): Promise<ComplianceWaiver>;
  update(schoolId: string, id: string, data: ComplianceWaiverUpdate): Promise<ComplianceWaiver>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ComplianceWaiverQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<ComplianceWaiver[]>;
  findByStatus(schoolId: string, status: string): Promise<ComplianceWaiver[]>;
  approve(schoolId: string, id: string): Promise<void>;
  findExpired(schoolId: string): Promise<ComplianceWaiver[]>;
}

export interface GovRegulationCategoryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<RegulationCategory | null>;
  findAll(schoolId: string, query?: RegulationCategoryQuery): Promise<RegulationCategory[]>;
  create(schoolId: string, data: RegulationCategoryCreate): Promise<RegulationCategory>;
  update(schoolId: string, id: string, data: RegulationCategoryUpdate): Promise<RegulationCategory>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: RegulationCategoryQuery): Promise<number>;
  findActive(schoolId: string): Promise<RegulationCategory[]>;
  findByName(schoolId: string, name: string): Promise<RegulationCategory | null>;
  findByParentId(schoolId: string, parentId: string): Promise<RegulationCategory[]>;
}

export interface GovEducationRegulationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationRegulation | null>;
  findAll(schoolId: string, query?: EducationRegulationQuery): Promise<EducationRegulation[]>;
  create(schoolId: string, data: EducationRegulationCreate): Promise<EducationRegulation>;
  update(schoolId: string, id: string, data: EducationRegulationUpdate): Promise<EducationRegulation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationRegulationQuery): Promise<number>;
  findByCategoryId(schoolId: string, categoryId: string): Promise<EducationRegulation[]>;
  findByStatus(schoolId: string, status: string): Promise<EducationRegulation[]>;
  findActive(schoolId: string): Promise<EducationRegulation[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<EducationRegulation[]>;
}

export interface GovComplianceNotificationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ComplianceNotification | null>;
  findAll(schoolId: string, query?: ComplianceNotificationQuery): Promise<ComplianceNotification[]>;
  create(schoolId: string, data: ComplianceNotificationCreate): Promise<ComplianceNotification>;
  update(schoolId: string, id: string, data: ComplianceNotificationUpdate): Promise<ComplianceNotification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ComplianceNotificationQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<ComplianceNotification[]>;
  findUnread(schoolId: string, userId: string): Promise<ComplianceNotification[]>;
  markAsRead(schoolId: string, id: string): Promise<void>;
  findByPriority(schoolId: string, priority: string): Promise<ComplianceNotification[]>;
}

export interface GovComplianceReportRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ComplianceReport | null>;
  findAll(schoolId: string, query?: ComplianceReportQuery): Promise<ComplianceReport[]>;
  create(schoolId: string, data: ComplianceReportCreate): Promise<ComplianceReport>;
  update(schoolId: string, id: string, data: ComplianceReportUpdate): Promise<ComplianceReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ComplianceReportQuery): Promise<number>;
  findBySchoolId(schoolId: string, schoolId_: string): Promise<ComplianceReport[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<ComplianceReport[]>;
  findByType(schoolId: string, type: string): Promise<ComplianceReport[]>;
  submit(schoolId: string, id: string): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 12: International Education - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface GovCountryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Country | null>;
  findAll(schoolId: string, query?: CountryQuery): Promise<Country[]>;
  create(schoolId: string, data: CountryCreate): Promise<Country>;
  update(schoolId: string, id: string, data: CountryUpdate): Promise<Country>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CountryQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<Country | null>;
  findByCode(schoolId: string, code: string): Promise<Country | null>;
  findActive(schoolId: string): Promise<Country[]>;
}

export interface GovLanguageRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Language | null>;
  findAll(schoolId: string, query?: LanguageQuery): Promise<Language[]>;
  create(schoolId: string, data: LanguageCreate): Promise<Language>;
  update(schoolId: string, id: string, data: LanguageUpdate): Promise<Language>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: LanguageQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<Language | null>;
  findByCode(schoolId: string, code: string): Promise<Language | null>;
  findActive(schoolId: string): Promise<Language[]>;
}

export interface GovCurrencyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Currency | null>;
  findAll(schoolId: string, query?: CurrencyQuery): Promise<Currency[]>;
  create(schoolId: string, data: CurrencyCreate): Promise<Currency>;
  update(schoolId: string, id: string, data: CurrencyUpdate): Promise<Currency>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CurrencyQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<Currency | null>;
  findByCode(schoolId: string, code: string): Promise<Currency | null>;
  findActive(schoolId: string): Promise<Currency[]>;
}

export interface GovEducationSystemRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EducationSystem | null>;
  findAll(schoolId: string, query?: EducationSystemQuery): Promise<EducationSystem[]>;
  create(schoolId: string, data: EducationSystemCreate): Promise<EducationSystem>;
  update(schoolId: string, id: string, data: EducationSystemUpdate): Promise<EducationSystem>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EducationSystemQuery): Promise<number>;
  findByCountryId(schoolId: string, countryId: string): Promise<EducationSystem[]>;
  findActive(schoolId: string): Promise<EducationSystem[]>;
  findByName(schoolId: string, name: string): Promise<EducationSystem | null>;
}

export interface GovEquivalencyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<Equivalency | null>;
  findAll(schoolId: string, query?: EquivalencyQuery): Promise<Equivalency[]>;
  create(schoolId: string, data: EquivalencyCreate): Promise<Equivalency>;
  update(schoolId: string, id: string, data: EquivalencyUpdate): Promise<Equivalency>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EquivalencyQuery): Promise<number>;
  findBySourceCountryId(schoolId: string, countryId: string): Promise<Equivalency[]>;
  findByTargetCountryId(schoolId: string, countryId: string): Promise<Equivalency[]>;
  findActive(schoolId: string): Promise<Equivalency[]>;
}

export interface GovInternationalPartnershipRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InternationalPartnership | null>;
  findAll(schoolId: string, query?: InternationalPartnershipQuery): Promise<InternationalPartnership[]>;
  create(schoolId: string, data: InternationalPartnershipCreate): Promise<InternationalPartnership>;
  update(schoolId: string, id: string, data: InternationalPartnershipUpdate): Promise<InternationalPartnership>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InternationalPartnershipQuery): Promise<number>;
  findByCountryId(schoolId: string, countryId: string): Promise<InternationalPartnership[]>;
  findByStatus(schoolId: string, status: string): Promise<InternationalPartnership[]>;
  findActive(schoolId: string): Promise<InternationalPartnership[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovExchangeProgramRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<ExchangeProgram | null>;
  findAll(schoolId: string, query?: ExchangeProgramQuery): Promise<ExchangeProgram[]>;
  create(schoolId: string, data: ExchangeProgramCreate): Promise<ExchangeProgram>;
  update(schoolId: string, id: string, data: ExchangeProgramUpdate): Promise<ExchangeProgram>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: ExchangeProgramQuery): Promise<number>;
  findByPartnershipId(schoolId: string, partnershipId: string): Promise<ExchangeProgram[]>;
  findByStatus(schoolId: string, status: string): Promise<ExchangeProgram[]>;
  findActive(schoolId: string): Promise<ExchangeProgram[]>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<ExchangeProgram[]>;
}

export interface GovInternationalStudentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<InternationalStudent | null>;
  findAll(schoolId: string, query?: InternationalStudentQuery): Promise<InternationalStudent[]>;
  create(schoolId: string, data: InternationalStudentCreate): Promise<InternationalStudent>;
  update(schoolId: string, id: string, data: InternationalStudentUpdate): Promise<InternationalStudent>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: InternationalStudentQuery): Promise<number>;
  findByProgramId(schoolId: string, programId: string): Promise<InternationalStudent[]>;
  findByHomeCountryId(schoolId: string, countryId: string): Promise<InternationalStudent[]>;
  findByStatus(schoolId: string, status: string): Promise<InternationalStudent[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GovCrossBorderResearchRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<CrossBorderResearch | null>;
  findAll(schoolId: string, query?: CrossBorderResearchQuery): Promise<CrossBorderResearch[]>;
  create(schoolId: string, data: CrossBorderResearchCreate): Promise<CrossBorderResearch>;
  update(schoolId: string, id: string, data: CrossBorderResearchUpdate): Promise<CrossBorderResearch>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: CrossBorderResearchQuery): Promise<number>;
  findByPartnershipId(schoolId: string, partnershipId: string): Promise<CrossBorderResearch[]>;
  findByStatus(schoolId: string, status: string): Promise<CrossBorderResearch[]>;
  findByTopic(schoolId: string, topic: string): Promise<CrossBorderResearch[]>;
  submit(schoolId: string, id: string): Promise<void>;
}

export interface GovGlobalBenchmarkRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<GlobalBenchmark | null>;
  findAll(schoolId: string, query?: GlobalBenchmarkQuery): Promise<GlobalBenchmark[]>;
  create(schoolId: string, data: GlobalBenchmarkCreate): Promise<GlobalBenchmark>;
  update(schoolId: string, id: string, data: GlobalBenchmarkUpdate): Promise<GlobalBenchmark>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: GlobalBenchmarkQuery): Promise<number>;
  findByIndicator(schoolId: string, indicator: string): Promise<GlobalBenchmark[]>;
  findByYear(schoolId: string, year: number): Promise<GlobalBenchmark[]>;
  findLatest(schoolId: string, indicator: string): Promise<GlobalBenchmark | null>;
  findByCountryId(schoolId: string, countryId: string): Promise<GlobalBenchmark[]>;
}
