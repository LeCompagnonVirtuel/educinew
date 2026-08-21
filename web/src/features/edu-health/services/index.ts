export { StudentHealthService } from './StudentHealthService';
export type { StudentHealth, Immunization, CreateStudentHealth, UpdateStudentHealth } from './StudentHealthService';

export { HealthScreeningService } from './HealthScreeningService';
export type { HealthScreening, ScreeningResult, CreateHealthScreening, UpdateHealthScreening } from './HealthScreeningService';

export { HealthReferralService } from './HealthReferralService';
export type { HealthReferral, ReferralDocument, CreateHealthReferral, UpdateHealthReferral } from './HealthReferralService';

export { ConsentManagementService } from './ConsentManagementService';
export type { ConsentRecord, CreateConsent, UpdateConsent } from './ConsentManagementService';

export { WellbeingService } from './WellbeingService';
export type { Wellbeing, MoodEntry, CreateWellbeing, UpdateWellbeing } from './WellbeingService';

export { WellbeingAssessmentService } from './WellbeingAssessmentService';
export type { WellbeingAssessment, AssessmentScore, CreateWellbeingAssessment, UpdateWellbeingAssessment } from './WellbeingAssessmentService';

export { CounselingService } from './CounselingService';
export type { CounselingSession, RiskAssessment, CreateCounselingSession, UpdateCounselingSession } from './CounselingService';

export { SupportPlanService } from './SupportPlanService';
export type { SupportPlan, SupportGoal, SupportIntervention, TeamMember, ProgressNote, CreateSupportPlan, UpdateSupportPlan } from './SupportPlanService';

export { SafeguardingService } from './SafeguardingService';
export type { SafeguardingConcern, SafeguardingEvidence, CreateSafeguardingConcern, UpdateSafeguardingConcern } from './SafeguardingService';

export { ChildProtectionService } from './ChildProtectionService';
export type { ChildProtectionCase, FamilyMember, CarePlan, CarePlanAction, CreateChildProtectionCase, UpdateChildProtectionCase } from './ChildProtectionService';

export { CaseAssignmentService } from './CaseAssignmentService';
export type { CaseAssignment, CreateCaseAssignment, UpdateCaseAssignment } from './CaseAssignmentService';

export { MandatoryReportingService } from './MandatoryReportingService';
export type { MandatoryReport, FollowUpAction, CreateMandatoryReport, UpdateMandatoryReport } from './MandatoryReportingService';

export { BullyingService } from './BullyingService';
export type { BullyingIncident, BullyingIntervention, CreateBullyingIncident, UpdateBullyingIncident } from './BullyingService';

export { HarassmentService } from './HarassmentService';
export type { HarassmentCase, HarassmentEvidence, CreateHarassmentCase, UpdateHarassmentCase } from './HarassmentService';

export { HealthInvestigationService } from './HealthInvestigationService';
export type { HealthInvestigation, InvestigationEvidenceItem, CreateHealthInvestigation, UpdateHealthInvestigation } from './HealthInvestigationService';

export { MediationService } from './MediationService';
export type { MediationSession, MediationAgreement, CreateMediationSession, UpdateMediationSession } from './MediationService';

export { IncidentService } from './IncidentService';
export type { HealthIncident, CreateHealthIncident, UpdateHealthIncident } from './IncidentService';

export { EmergencyService } from './EmergencyService';
export type { EmergencyResponse, EmergencyAction, CreateEmergencyResponse, UpdateEmergencyResponse } from './EmergencyService';

export { PostIncidentService } from './PostIncidentService';
export type { PostIncidentReview, ActionItem, CreatePostIncidentReview, UpdatePostIncidentReview } from './PostIncidentService';

export { ResponseTeamService } from './ResponseTeamService';
export type { ResponseTeam, TeamMemberEntry, ContactInformation, CreateResponseTeam, UpdateResponseTeam } from './ResponseTeamService';

export { AccessibilityService } from './AccessibilityService';
export type { AccessibilityProfile, AccommodationEntry, AssistiveTechnology, ModificationEntry, ExternalAgency, CreateAccessibilityProfile, UpdateAccessibilityProfile } from './AccessibilityService';

export { InclusionService } from './InclusionService';
export type { InclusionPlan, InclusionGoal, InclusionStrategy, SupportService, ProgressMonitoring, CreateInclusionPlan, UpdateInclusionPlan } from './InclusionService';

export { AccommodationService } from './AccommodationService';
export type { AccommodationRecord, CreateAccommodationRecord, UpdateAccommodationRecord } from './AccommodationService';

export { SpecialEducationService } from './SpecialEducationService';
export type { SpecialEducationPlan, PresentLevel, AnnualGoal, SpecialEducationService as SpecialEducationServiceType, TransitionPlan, ParentParticipation, CreateSpecialEducationPlan, UpdateSpecialEducationPlan } from './SpecialEducationService';

export { SocialSupportService } from './SocialSupportService';
export type { SocialSupport, SocialNeed, SocialIntervention, SocialReferral, CreateSocialSupport, UpdateSocialSupport } from './SocialSupportService';

export { FamilySupportService } from './FamilySupportService';
export type { FamilySupport, FamilyMemberEntry, FamilyAssessment, FamilyActionPlan, FamilyAction, FamilyService, ExternalAgencyEntry, CreateFamilySupport, UpdateFamilySupport } from './FamilySupportService';

export { EligibilityEngineService } from './EligibilityEngineService';
export type { EligibilityRule, EligibilityCriterion, EligibilityResult, CreateEligibilityRule, UpdateEligibilityRule } from './EligibilityEngineService';

export { CommunityResourceService } from './CommunityResourceService';
export type { CommunityResource, ResourceContact, CreateCommunityResource, UpdateCommunityResource } from './CommunityResourceService';

export { CampusSafetyService } from './CampusSafetyService';
export type { CampusSafetyRecord, SafetyAction, CreateCampusSafetyRecord, UpdateCampusSafetyRecord } from './CampusSafetyService';

export { AccessControlService } from './AccessControlService';
export type { AccessControlRecord, CreateAccessControlRecord, UpdateAccessControlRecord } from './AccessControlService';

export { SafetyInspectionCampusService } from './SafetyInspectionCampusService';
export type { SafetyInspectionCampus, ChecklistItem, InspectionFinding, CorrectiveAction, CreateSafetyInspectionCampus, UpdateSafetyInspectionCampus } from './SafetyInspectionCampusService';

export { VisitorSafetyService } from './VisitorSafetyService';
export type { VisitorSafety, CreateVisitorSafety, UpdateVisitorSafety } from './VisitorSafetyService';

export { HealthAIService } from './HealthAIService';
export type { HealthAIAnalysis, AIOutput, AIIndicator, CreateHealthAIAnalysis, UpdateHealthAIAnalysis } from './HealthAIService';

export { WellbeingAIService } from './WellbeingAIService';
export type { WellbeingAIModel, WellbeingAIPrediction, WellbeingPrediction, CreateWellbeingAIModel, UpdateWellbeingAIModel } from './WellbeingAIService';

export { SafeguardingAIService } from './SafeguardingAIService';
export type { SafeguardingAIAlert, SafeguardingAIAnalysis, CreateSafeguardingAIAlert, UpdateSafeguardingAIAlert } from './SafeguardingAIService';

export { SafetyRiskAIService } from './SafetyRiskAIService';
export type { SafetyRiskAssessment, RiskFactor, MitigationEntry, CreateSafetyRiskAssessment, UpdateSafetyRiskAssessment } from './SafetyRiskAIService';

export { HealthAnalyticsService } from './HealthAnalyticsService';
export type { HealthDashboard, HealthMetric, HealthTrend } from './HealthAnalyticsService';

export { WellbeingAnalyticsService } from './WellbeingAnalyticsService';
export type { WellbeingAnalytics, RiskDistribution, MoodTrend, WellbeingReport } from './WellbeingAnalyticsService';

export { SafeguardingAnalyticsService } from './SafeguardingAnalyticsService';
export type { SafeguardingAnalytics, SafeguardingTrend, SafeguardingReport } from './SafeguardingAnalyticsService';

export { SafetyAnalyticsService } from './SafetyAnalyticsService';
export type { SafetyAnalytics, SafetyTrend, SafetyReport } from './SafetyAnalyticsService';

export { HealthGovernanceService } from './HealthGovernanceService';
export type { HealthPolicy, PolicyAttachment, CreateHealthPolicy, UpdateHealthPolicy } from './HealthGovernanceService';

export { ComplianceTrackingService } from './ComplianceTrackingService';
export type { ComplianceRecord, ComplianceEvidence, CreateComplianceRecord, UpdateComplianceRecord } from './ComplianceTrackingService';

export { ConsentTrackingService } from './ConsentTrackingService';
export type { ConsentTrackingRecord, CreateConsentTrackingRecord, UpdateConsentTrackingRecord } from './ConsentTrackingService';

export { PolicyManagementService } from './PolicyManagementService';
export type { PolicyManagementRecord, CreatePolicyManagementRecord, UpdatePolicyManagementRecord } from './PolicyManagementService';

export { HealthDigitalTwinService } from './HealthDigitalTwinService';
export type { HealthDigitalTwin, DigitalTwinPrediction, CreateHealthDigitalTwin, UpdateHealthDigitalTwin } from './HealthDigitalTwinService';

export { WellbeingTwinService } from './WellbeingTwinService';
export type { WellbeingTwin, WellbeingState, MoodSnapshot, InterventionSnapshot, WellbeingTwinAlert, CreateWellbeingTwin, UpdateWellbeingTwin } from './WellbeingTwinService';

export { SafetyTwinService } from './SafetyTwinService';
export type { SafetyTwin, SafetyState, RiskZone, AccessPattern, IncidentSnapshot, SafetyTwinAlert, CreateSafetyTwin, UpdateSafetyTwin } from './SafetyTwinService';

export { SimulationService } from './SimulationService';
export type { HealthSimulation, SimulationScenario, SimulationParticipant, SimulationResults, CreateHealthSimulation, UpdateHealthSimulation } from './SimulationService';
