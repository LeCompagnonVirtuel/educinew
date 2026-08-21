export enum MinistryLevel {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  DISTRICT = 'district',
  LOCAL = 'local',
}

export enum DepartmentType {
  ACADEMIC = 'academic',
  ADMINISTRATIVE = 'administrative',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  INSPECTION = 'inspection',
  PLANNING = 'planning',
  INTERNATIONAL = 'international',
  LEGAL = 'legal',
}

export enum DirectorateType {
  GENERAL = 'general',
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  SPECIALIZED = 'specialized',
  TECHNICAL = 'technical',
  ADMINISTRATIVE = 'administrative',
}

export enum InspectorateLevel {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  DISTRICT = 'district',
  SCHOOL = 'school',
}

export enum ZoneType {
  ACADEMIC = 'academic',
  ADMINISTRATIVE = 'administrative',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
  GENERAL = 'general',
}

export enum DistrictType {
  URBAN = 'urban',
  RURAL = 'rural',
  PERI_URBAN = 'peri_urban',
  METROPOLITAN = 'metropolitan',
  SPECIAL = 'special',
}

export enum HierarchyLevel {
  MINISTERIAL = 'ministerial',
  SECRETARY_GENERAL = 'secretary_general',
  DIRECTOR_GENERAL = 'director_general',
  DIRECTOR = 'director',
  HEAD_OF_SERVICE = 'head_of_service',
  CHIEF = 'chief',
  ADVISOR = 'advisor',
}

export enum ChartType {
  ORGANIZATIONAL = 'organizational',
  FUNCTIONAL = 'functional',
  HIERARCHICAL = 'hierarchical',
  MATRIX = 'matrix',
  FLAT = 'flat',
  DIVISIONAL = 'divisional',
}

export enum DelegationType {
  TEMPORARY = 'temporary',
  PERMANENT = 'permanent',
  SPECIAL = 'special',
  EMERGENCY = 'emergency',
  INTERIM = 'interim',
}

export enum CircularType {
  MINISTERIAL = 'ministerial',
  ADMINISTRATIVE = 'administrative',
  TECHNICAL = 'technical',
  FINANCIAL = 'financial',
  DISCIPLINARY = 'disciplinary',
  INFORMATIONAL = 'informational',
}

export enum DecisionType {
  MINISTERIAL = 'ministerial',
  CABINET = 'cabinet',
  DIRECTORIAL = 'directorial',
  ADMINISTRATIVE = 'administrative',
  DISCIPLINARY = 'disciplinary',
  FINANCIAL = 'financial',
}

export enum CommitteeType {
  STRATEGIC = 'strategic',
  TECHNICAL = 'technical',
  DISCIPLINARY = 'disciplinary',
  ACADEMIC = 'academic',
  FINANCIAL = 'financial',
  AUDIT = 'audit',
  SELECTION = 'selection',
  AD_HOC = 'ad_hoc',
}

export enum CommissionType {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  SPECIALIZED = 'specialized',
  INVESTIGATION = 'investigation',
  EVALUATION = 'evaluation',
  REFORM = 'reform',
}

export enum MinistryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  RESTRUCTURED = 'restructured',
  DISSOLVED = 'dissolved',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
}

export enum DepartmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  RESTRUCTURED = 'restructured',
  DISSOLVED = 'dissolved',
  PENDING = 'pending',
}

export enum DirectorateStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISSOLVED = 'dissolved',
  PENDING = 'pending',
  RESTRUCTURED = 'restructured',
}

export enum InspectorateStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum ZoneStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  RESTRUCTURED = 'restructured',
  PENDING = 'pending',
}

export enum DistrictStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  RESTRUCTURED = 'restructured',
  PENDING = 'pending',
}

export enum HierarchyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export enum ChartStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum DelegationStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  PENDING = 'pending',
}

export enum CircularStatus {
  DRAFT = 'draft',
  ISSUED = 'issued',
  ACTIVE = 'active',
  SUPERSEDED = 'superseded',
  REVOKED = 'revoked',
}

export enum DecisionStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  IMPLEMENTED = 'implemented',
  REVOKED = 'revoked',
  PENDING = 'pending',
}

export enum CommitteeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISSOLVED = 'dissolved',
  PENDING = 'pending',
}

export enum CommissionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISSOLVED = 'dissolved',
  PENDING = 'pending',
}

export enum MinistryRole {
  MINISTER = 'minister',
  SECRETARY_GENERAL = 'secretary_general',
  DIRECTOR_GENERAL = 'director_general',
  DIRECTOR = 'director',
  ADVISOR = 'advisor',
  INSPECTOR = 'inspector',
  ADMINISTRATOR = 'administrator',
}

export enum DepartmentRole {
  HEAD_OF_DEPARTMENT = 'head_of_department',
  DEPUTY_HEAD = 'deputy_head',
  CHIEF_OFFICER = 'chief_officer',
  INSPECTOR = 'inspector',
  ADMINISTRATOR = 'administrator',
}

export enum DirectorateRole {
  DIRECTOR = 'director',
  DEPUTY_DIRECTOR = 'deputy_director',
  CHIEF_OFFICER = 'chief_officer',
  INSPECTOR = 'inspector',
  COORDINATOR = 'coordinator',
}

export enum InspectorateRole {
  CHIEF_INSPECTOR = 'chief_inspector',
  INSPECTOR = 'inspector',
  DEPUTY_INSPECTOR = 'deputy_inspector',
  SENIOR_INSPECTOR = 'senior_inspector',
}

export enum ZoneRole {
  COORDINATOR = 'coordinator',
  DEPUTY_COORDINATOR = 'deputy_coordinator',
  INSPECTOR = 'inspector',
  ADMINISTRATOR = 'administrator',
}

export enum DistrictRole {
  SUPERINTENDENT = 'superintendent',
  DEPUTY_SUPERINTENDENT = 'deputy_superintendent',
  INSPECTOR = 'inspector',
  ADMINISTRATOR = 'administrator',
}

export enum HierarchyRole {
  CHIEF = 'chief',
  DEPUTY = 'deputy',
  ADVISOR = 'advisor',
  COORDINATOR = 'coordinator',
}

export enum ChartRole {
  CREATOR = 'creator',
  APPROVER = 'approver',
  REVIEWER = 'reviewer',
  ADMINISTRATOR = 'administrator',
}

export enum DelegationRole {
  DELEGATE = 'delegate',
  SUPERVISOR = 'supervisor',
  COORDINATOR = 'coordinator',
}

export enum CircularRole {
  ISSUER = 'issuer',
  APPROVER = 'approver',
  RECIPIENT = 'recipient',
  ADMINISTRATOR = 'administrator',
}

export enum DecisionRole {
  DECIDER = 'decider',
  APPROVER = 'approver',
  EXECUTOR = 'executor',
  REVIEWER = 'reviewer',
}

export enum CommitteeRole {
  CHAIRPERSON = 'chairperson',
  VICE_CHAIRPERSON = 'vice_chairperson',
  MEMBER = 'member',
  SECRETARY = 'secretary',
}

export enum CommissionRole {
  CHAIRPERSON = 'chairperson',
  VICE_CHAIRPERSON = 'vice_chairperson',
  MEMBER = 'member',
  SECRETARY = 'secretary',
  EXPERT = 'expert',
}

export enum MinistryPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum DepartmentPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum DirectoratePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum InspectoratePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum ZonePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum DistrictPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum HierarchyPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum ChartPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum DelegationPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum CircularPriority {
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum DecisionPriority {
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum CommitteePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum CommissionPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum MinistryCategory {
  EDUCATION = 'education',
  HEALTH = 'health',
  FINANCE = 'finance',
  JUSTICE = 'justice',
  DEFENSE = 'defense',
  INTERIOR = 'interior',
  FOREIGN_AFFAIRS = 'foreign_affairs',
  INFRASTRUCTURE = 'infrastructure',
}

export enum DepartmentCategory {
  ACADEMIC = 'academic',
  ADMINISTRATIVE = 'administrative',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  LEGAL = 'legal',
  PLANNING = 'planning',
}

export enum DirectorateCategory {
  EDUCATION = 'education',
  TRAINING = 'training',
  RESEARCH = 'research',
  INSPECTION = 'inspection',
  ADMINISTRATION = 'administration',
}

export enum InspectorateCategory {
  ACADEMIC = 'academic',
  ADMINISTRATIVE = 'administrative',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  DISCIPLINARY = 'disciplinary',
}

export enum ZoneCategory {
  ACADEMIC = 'academic',
  VOCATIONAL = 'vocational',
  TECHNICAL = 'technical',
  GENERAL = 'general',
}

export enum DistrictCategory {
  EDUCATION = 'education',
  ADMINISTRATIVE = 'administrative',
  TECHNICAL = 'technical',
}

export enum HierarchyCategory {
  MINISTERIAL = 'ministerial',
  DIRECTORIAL = 'directorial',
  ADMINISTRATIVE = 'administrative',
}

export enum ChartCategory {
  ORGANIZATIONAL = 'organizational',
  FUNCTIONAL = 'functional',
  STRATEGIC = 'strategic',
}

export enum DelegationCategory {
  TEMPORARY = 'temporary',
  PERMANENT = 'permanent',
  SPECIAL = 'special',
}

export enum CircularCategory {
  MINISTERIAL = 'ministerial',
  ADMINISTRATIVE = 'administrative',
  TECHNICAL = 'technical',
}

export enum DecisionCategory {
  MINISTERIAL = 'ministerial',
  CABINET = 'cabinet',
  DIRECTORIAL = 'directorial',
}

export enum CommitteeCategory {
  STRATEGIC = 'strategic',
  TECHNICAL = 'technical',
  DISCIPLINARY = 'disciplinary',
}

export enum CommissionCategory {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  SPECIALIZED = 'specialized',
}

export enum MinistryFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum DepartmentFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum DirectorateFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum InspectorateFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum ZoneFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum DistrictFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum HierarchyFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum ChartFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum DelegationFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum CircularFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum DecisionFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum CommitteeFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum CommissionFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum MinistryDuration {
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
  PERMANENT = 'permanent',
}

export enum DepartmentDuration {
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
  PERMANENT = 'permanent',
}

export interface Ministry {
  id: string;
  name: string;
  code: string;
  description: string;
  level: MinistryLevel;
  status: MinistryStatus;
  minister_name: string;
  secretary_general_name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface MinistryCreate {
  name: string;
  code: string;
  description: string;
  level: MinistryLevel;
  status: MinistryStatus;
  minister_name: string;
  secretary_general_name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
}

export interface MinistryUpdate {
  name?: string;
  code?: string;
  description?: string;
  level?: MinistryLevel;
  status?: MinistryStatus;
  minister_name?: string;
  secretary_general_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string;
}

export interface MinistryQuery {
  search?: string;
  level?: MinistryLevel;
  status?: MinistryStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Cabinet {
  id: string;
  ministry_id: string;
  name: string;
  description: string;
  head_name: string;
  position: string;
  phone: string;
  email: string;
  status: MinistryStatus;
  created_at: string;
  updated_at: string;
}

export interface CabinetCreate {
  ministry_id: string;
  name: string;
  description: string;
  head_name: string;
  position: string;
  phone: string;
  email: string;
  status: MinistryStatus;
}

export interface CabinetUpdate {
  ministry_id?: string;
  name?: string;
  description?: string;
  head_name?: string;
  position?: string;
  phone?: string;
  email?: string;
  status?: MinistryStatus;
}

export interface CabinetQuery {
  ministry_id?: string;
  search?: string;
  status?: MinistryStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Department {
  id: string;
  ministry_id: string;
  name: string;
  code: string;
  description: string;
  type: DepartmentType;
  head_name: string;
  phone: string;
  email: string;
  budget: number;
  status: DepartmentStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DepartmentCreate {
  ministry_id: string;
  name: string;
  code: string;
  description: string;
  type: DepartmentType;
  head_name: string;
  phone: string;
  email: string;
  budget: number;
  status: DepartmentStatus;
}

export interface DepartmentUpdate {
  ministry_id?: string;
  name?: string;
  code?: string;
  description?: string;
  type?: DepartmentType;
  head_name?: string;
  phone?: string;
  email?: string;
  budget?: number;
  status?: DepartmentStatus;
}

export interface DepartmentQuery {
  ministry_id?: string;
  search?: string;
  type?: DepartmentType;
  status?: DepartmentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface GeneralDirectorate {
  id: string;
  department_id: string;
  name: string;
  code: string;
  description: string;
  type: DirectorateType;
  director_name: string;
  phone: string;
  email: string;
  address: string;
  status: DirectorateStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GeneralDirectorateCreate {
  department_id: string;
  name: string;
  code: string;
  description: string;
  type: DirectorateType;
  director_name: string;
  phone: string;
  email: string;
  address: string;
  status: DirectorateStatus;
}

export interface GeneralDirectorateUpdate {
  department_id?: string;
  name?: string;
  code?: string;
  description?: string;
  type?: DirectorateType;
  director_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: DirectorateStatus;
}

export interface GeneralDirectorateQuery {
  department_id?: string;
  search?: string;
  type?: DirectorateType;
  status?: DirectorateStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalService {
  id: string;
  ministry_id: string;
  name: string;
  code: string;
  description: string;
  head_name: string;
  phone: string;
  email: string;
  budget: number;
  status: MinistryStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalServiceCreate {
  ministry_id: string;
  name: string;
  code: string;
  description: string;
  head_name: string;
  phone: string;
  email: string;
  budget: number;
  status: MinistryStatus;
}

export interface NationalServiceUpdate {
  ministry_id?: string;
  name?: string;
  code?: string;
  description?: string;
  head_name?: string;
  phone?: string;
  email?: string;
  budget?: number;
  status?: MinistryStatus;
}

export interface NationalServiceQuery {
  ministry_id?: string;
  search?: string;
  status?: MinistryStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegionalDirectorate {
  id: string;
  general_directorate_id: string;
  name: string;
  code: string;
  description: string;
  region: string;
  director_name: string;
  phone: string;
  email: string;
  address: string;
  status: DirectorateStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface RegionalDirectorateCreate {
  general_directorate_id: string;
  name: string;
  code: string;
  description: string;
  region: string;
  director_name: string;
  phone: string;
  email: string;
  address: string;
  status: DirectorateStatus;
}

export interface RegionalDirectorateUpdate {
  general_directorate_id?: string;
  name?: string;
  code?: string;
  description?: string;
  region?: string;
  director_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: DirectorateStatus;
}

export interface RegionalDirectorateQuery {
  general_directorate_id?: string;
  search?: string;
  region?: string;
  status?: DirectorateStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DepartmentalDirectorate {
  id: string;
  regional_directorate_id: string;
  name: string;
  code: string;
  description: string;
  department: string;
  director_name: string;
  phone: string;
  email: string;
  address: string;
  status: DirectorateStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DepartmentalDirectorateCreate {
  regional_directorate_id: string;
  name: string;
  code: string;
  description: string;
  department: string;
  director_name: string;
  phone: string;
  email: string;
  address: string;
  status: DirectorateStatus;
}

export interface DepartmentalDirectorateUpdate {
  regional_directorate_id?: string;
  name?: string;
  code?: string;
  description?: string;
  department?: string;
  director_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: DirectorateStatus;
}

export interface DepartmentalDirectorateQuery {
  regional_directorate_id?: string;
  search?: string;
  department?: string;
  status?: DirectorateStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Inspectorate {
  id: string;
  departmental_directorate_id: string;
  name: string;
  code: string;
  description: string;
  level: InspectorateLevel;
  chief_inspector_name: string;
  phone: string;
  email: string;
  address: string;
  status: InspectorateStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface InspectorateCreate {
  departmental_directorate_id: string;
  name: string;
  code: string;
  description: string;
  level: InspectorateLevel;
  chief_inspector_name: string;
  phone: string;
  email: string;
  address: string;
  status: InspectorateStatus;
}

export interface InspectorateUpdate {
  departmental_directorate_id?: string;
  name?: string;
  code?: string;
  description?: string;
  level?: InspectorateLevel;
  chief_inspector_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: InspectorateStatus;
}

export interface InspectorateQuery {
  departmental_directorate_id?: string;
  search?: string;
  level?: InspectorateLevel;
  status?: InspectorateStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface AcademicZone {
  id: string;
  inspectorate_id: string;
  name: string;
  code: string;
  description: string;
  type: ZoneType;
  coordinator_name: string;
  phone: string;
  email: string;
  address: string;
  status: ZoneStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AcademicZoneCreate {
  inspectorate_id: string;
  name: string;
  code: string;
  description: string;
  type: ZoneType;
  coordinator_name: string;
  phone: string;
  email: string;
  address: string;
  status: ZoneStatus;
}

export interface AcademicZoneUpdate {
  inspectorate_id?: string;
  name?: string;
  code?: string;
  description?: string;
  type?: ZoneType;
  coordinator_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: ZoneStatus;
}

export interface AcademicZoneQuery {
  inspectorate_id?: string;
  search?: string;
  type?: ZoneType;
  status?: ZoneStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SchoolDistrict {
  id: string;
  academic_zone_id: string;
  name: string;
  code: string;
  description: string;
  type: DistrictType;
  superintendent_name: string;
  phone: string;
  email: string;
  address: string;
  status: DistrictStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SchoolDistrictCreate {
  academic_zone_id: string;
  name: string;
  code: string;
  description: string;
  type: DistrictType;
  superintendent_name: string;
  phone: string;
  email: string;
  address: string;
  status: DistrictStatus;
}

export interface SchoolDistrictUpdate {
  academic_zone_id?: string;
  name?: string;
  code?: string;
  description?: string;
  type?: DistrictType;
  superintendent_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: DistrictStatus;
}

export interface SchoolDistrictQuery {
  academic_zone_id?: string;
  search?: string;
  type?: DistrictType;
  status?: DistrictStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface AdministrativeHierarchy {
  id: string;
  ministry_id: string;
  name: string;
  description: string;
  level: HierarchyLevel;
  parent_id: string | null;
  order: number;
  status: HierarchyStatus;
  created_at: string;
  updated_at: string;
}

export interface AdministrativeHierarchyCreate {
  ministry_id: string;
  name: string;
  description: string;
  level: HierarchyLevel;
  parent_id: string | null;
  order: number;
  status: HierarchyStatus;
}

export interface AdministrativeHierarchyUpdate {
  ministry_id?: string;
  name?: string;
  description?: string;
  level?: HierarchyLevel;
  parent_id?: string | null;
  order?: number;
  status?: HierarchyStatus;
}

export interface AdministrativeHierarchyQuery {
  ministry_id?: string;
  search?: string;
  level?: HierarchyLevel;
  status?: HierarchyStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface OrganizationChart {
  id: string;
  ministry_id: string;
  name: string;
  description: string;
  type: ChartType;
  version: string;
  effective_date: string;
  expiry_date: string | null;
  status: ChartStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OrganizationChartCreate {
  ministry_id: string;
  name: string;
  description: string;
  type: ChartType;
  version: string;
  effective_date: string;
  expiry_date: string | null;
  status: ChartStatus;
}

export interface OrganizationChartUpdate {
  ministry_id?: string;
  name?: string;
  description?: string;
  type?: ChartType;
  version?: string;
  effective_date?: string;
  expiry_date?: string | null;
  status?: ChartStatus;
}

export interface OrganizationChartQuery {
  ministry_id?: string;
  search?: string;
  type?: ChartType;
  status?: ChartStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Delegation {
  id: string;
  delegator_id: string;
  delegate_id: string;
  type: DelegationType;
  description: string;
  start_date: string;
  end_date: string | null;
  scope: string;
  status: DelegationStatus;
  created_at: string;
  updated_at: string;
}

export interface DelegationCreate {
  delegator_id: string;
  delegate_id: string;
  type: DelegationType;
  description: string;
  start_date: string;
  end_date: string | null;
  scope: string;
  status: DelegationStatus;
}

export interface DelegationUpdate {
  delegator_id?: string;
  delegate_id?: string;
  type?: DelegationType;
  description?: string;
  start_date?: string;
  end_date?: string | null;
  scope?: string;
  status?: DelegationStatus;
}

export interface DelegationQuery {
  delegator_id?: string;
  delegate_id?: string;
  type?: DelegationType;
  status?: DelegationStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface OfficialCircular {
  id: string;
  ministry_id: string;
  title: string;
  reference: string;
  content: string;
  type: CircularType;
  priority: CircularPriority;
  issuer_id: string;
  issue_date: string;
  effective_date: string;
  expiry_date: string | null;
  status: CircularStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OfficialCircularCreate {
  ministry_id: string;
  title: string;
  reference: string;
  content: string;
  type: CircularType;
  priority: CircularPriority;
  issuer_id: string;
  issue_date: string;
  effective_date: string;
  expiry_date: string | null;
  status: CircularStatus;
}

export interface OfficialCircularUpdate {
  ministry_id?: string;
  title?: string;
  reference?: string;
  content?: string;
  type?: CircularType;
  priority?: CircularPriority;
  issuer_id?: string;
  issue_date?: string;
  effective_date?: string;
  expiry_date?: string | null;
  status?: CircularStatus;
}

export interface OfficialCircularQuery {
  ministry_id?: string;
  search?: string;
  type?: CircularType;
  priority?: CircularPriority;
  status?: CircularStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface OfficialDecision {
  id: string;
  ministry_id: string;
  title: string;
  reference: string;
  description: string;
  type: DecisionType;
  priority: DecisionPriority;
  decider_id: string;
  decision_date: string;
  implementation_date: string | null;
  review_date: string | null;
  status: DecisionStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OfficialDecisionCreate {
  ministry_id: string;
  title: string;
  reference: string;
  description: string;
  type: DecisionType;
  priority: DecisionPriority;
  decider_id: string;
  decision_date: string;
  implementation_date: string | null;
  review_date: string | null;
  status: DecisionStatus;
}

export interface OfficialDecisionUpdate {
  ministry_id?: string;
  title?: string;
  reference?: string;
  description?: string;
  type?: DecisionType;
  priority?: DecisionPriority;
  decider_id?: string;
  decision_date?: string;
  implementation_date?: string | null;
  review_date?: string | null;
  status?: DecisionStatus;
}

export interface OfficialDecisionQuery {
  ministry_id?: string;
  search?: string;
  type?: DecisionType;
  priority?: DecisionPriority;
  status?: DecisionStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalCommittee {
  id: string;
  ministry_id: string;
  name: string;
  description: string;
  type: CommitteeType;
  chairperson_id: string;
  meeting_frequency: CommitteeFrequency;
  status: CommitteeStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalCommitteeCreate {
  ministry_id: string;
  name: string;
  description: string;
  type: CommitteeType;
  chairperson_id: string;
  meeting_frequency: CommitteeFrequency;
  status: CommitteeStatus;
}

export interface NationalCommitteeUpdate {
  ministry_id?: string;
  name?: string;
  description?: string;
  type?: CommitteeType;
  chairperson_id?: string;
  meeting_frequency?: CommitteeFrequency;
  status?: CommitteeStatus;
}

export interface NationalCommitteeQuery {
  ministry_id?: string;
  search?: string;
  type?: CommitteeType;
  status?: CommitteeStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalCommission {
  id: string;
  ministry_id: string;
  name: string;
  description: string;
  type: CommissionType;
  chairperson_id: string;
  mandate_start: string;
  mandate_end: string | null;
  status: CommissionStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalCommissionCreate {
  ministry_id: string;
  name: string;
  description: string;
  type: CommissionType;
  chairperson_id: string;
  mandate_start: string;
  mandate_end: string | null;
  status: CommissionStatus;
}

export interface NationalCommissionUpdate {
  ministry_id?: string;
  name?: string;
  description?: string;
  type?: CommissionType;
  chairperson_id?: string;
  mandate_start?: string;
  mandate_end?: string | null;
  status?: CommissionStatus;
}

export interface NationalCommissionQuery {
  ministry_id?: string;
  search?: string;
  type?: CommissionType;
  status?: CommissionStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryConfig {
  id: string;
  ministry_id: string;
  key: string;
  value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryConfigCreate {
  ministry_id: string;
  key: string;
  value: string;
  description: string;
}

export interface MinistryConfigUpdate {
  ministry_id?: string;
  key?: string;
  value?: string;
  description?: string;
}

export interface MinistryConfigQuery {
  ministry_id?: string;
  key?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMetrics {
  id: string;
  ministry_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMetricsCreate {
  ministry_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
}

export interface MinistryMetricsUpdate {
  ministry_id?: string;
  metric_name?: string;
  metric_value?: number;
  metric_unit?: string;
  period_start?: string;
  period_end?: string;
}

export interface MinistryMetricsQuery {
  ministry_id?: string;
  metric_name?: string;
  period_start?: string;
  period_end?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAuditLog {
  id: string;
  ministry_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: string;
  ip_address: string;
  created_at: string;
}

export interface MinistryAuditLogCreate {
  ministry_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: string;
  ip_address: string;
}

export interface MinistryAuditLogQuery {
  ministry_id?: string;
  action?: string;
  entity_type?: string;
  user_id?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryNotification {
  id: string;
  ministry_id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  read: boolean;
  created_at: string;
}

export interface MinistryNotificationCreate {
  ministry_id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
}

export interface MinistryNotificationUpdate {
  read?: boolean;
}

export interface MinistryNotificationQuery {
  ministry_id?: string;
  type?: string;
  priority?: string;
  read?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryDocument {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryDocumentCreate {
  ministry_id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
}

export interface MinistryDocumentUpdate {
  title?: string;
  description?: string;
}

export interface MinistryDocumentQuery {
  ministry_id?: string;
  search?: string;
  file_type?: string;
  uploaded_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryEvent {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  organizer_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryEventCreate {
  ministry_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  organizer_id: string;
  status: string;
}

export interface MinistryEventUpdate {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  status?: string;
}

export interface MinistryEventQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMeeting {
  id: string;
  committee_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  minutes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMeetingCreate {
  committee_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  minutes: string;
  status: string;
}

export interface MinistryMeetingUpdate {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  minutes?: string;
  status?: string;
}

export interface MinistryMeetingQuery {
  committee_id?: string;
  search?: string;
  status?: string;
  date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryBudget {
  id: string;
  ministry_id: string;
  fiscal_year: string;
  total_budget: number;
  allocated_budget: number;
  spent_budget: number;
  remaining_budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryBudgetCreate {
  ministry_id: string;
  fiscal_year: string;
  total_budget: number;
  allocated_budget: number;
  spent_budget: number;
  remaining_budget: number;
  status: string;
}

export interface MinistryBudgetUpdate {
  fiscal_year?: string;
  total_budget?: number;
  allocated_budget?: number;
  spent_budget?: number;
  remaining_budget?: number;
  status?: string;
}

export interface MinistryBudgetQuery {
  ministry_id?: string;
  fiscal_year?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryPerformance {
  id: string;
  ministry_id: string;
  indicator_name: string;
  target_value: number;
  actual_value: number;
  unit: string;
  period: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryPerformanceCreate {
  ministry_id: string;
  indicator_name: string;
  target_value: number;
  actual_value: number;
  unit: string;
  period: string;
  status: string;
}

export interface MinistryPerformanceUpdate {
  indicator_name?: string;
  target_value?: number;
  actual_value?: number;
  unit?: string;
  period?: string;
  status?: string;
}

export interface MinistryPerformanceQuery {
  ministry_id?: string;
  indicator_name?: string;
  period?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryReform {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  objectives: string;
  start_date: string;
  expected_end_date: string;
  actual_end_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryReformCreate {
  ministry_id: string;
  title: string;
  description: string;
  objectives: string;
  start_date: string;
  expected_end_date: string;
  actual_end_date: string | null;
  status: string;
}

export interface MinistryReformUpdate {
  title?: string;
  description?: string;
  objectives?: string;
  start_date?: string;
  expected_end_date?: string;
  actual_end_date?: string | null;
  status?: string;
}

export interface MinistryReformQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryPartnership {
  id: string;
  ministry_id: string;
  partner_name: string;
  partner_type: string;
  description: string;
  start_date: string;
  end_date: string | null;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryPartnershipCreate {
  ministry_id: string;
  partner_name: string;
  partner_type: string;
  description: string;
  start_date: string;
  end_date: string | null;
  value: number;
  status: string;
}

export interface MinistryPartnershipUpdate {
  partner_name?: string;
  partner_type?: string;
  description?: string;
  start_date?: string;
  end_date?: string | null;
  value?: number;
  status?: string;
}

export interface MinistryPartnershipQuery {
  ministry_id?: string;
  search?: string;
  partner_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryReport {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  report_type: string;
  period_start: string;
  period_end: string;
  generated_by: string;
  file_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryReportCreate {
  ministry_id: string;
  title: string;
  description: string;
  report_type: string;
  period_start: string;
  period_end: string;
  generated_by: string;
  file_url: string;
  status: string;
}

export interface MinistryReportUpdate {
  title?: string;
  description?: string;
  report_type?: string;
  period_start?: string;
  period_end?: string;
  generated_by?: string;
  file_url?: string;
  status?: string;
}

export interface MinistryReportQuery {
  ministry_id?: string;
  search?: string;
  report_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryStakeholder {
  id: string;
  ministry_id: string;
  name: string;
  type: string;
  role: string;
  contact_email: string;
  contact_phone: string;
  organization: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryStakeholderCreate {
  ministry_id: string;
  name: string;
  type: string;
  role: string;
  contact_email: string;
  contact_phone: string;
  organization: string;
}

export interface MinistryStakeholderUpdate {
  name?: string;
  type?: string;
  role?: string;
  contact_email?: string;
  contact_phone?: string;
  organization?: string;
}

export interface MinistryStakeholderQuery {
  ministry_id?: string;
  search?: string;
  type?: string;
  role?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryRisk {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  likelihood: number;
  impact: number;
  risk_level: string;
  mitigation_strategy: string;
  owner_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryRiskCreate {
  ministry_id: string;
  title: string;
  description: string;
  likelihood: number;
  impact: number;
  risk_level: string;
  mitigation_strategy: string;
  owner_id: string;
  status: string;
}

export interface MinistryRiskUpdate {
  title?: string;
  description?: string;
  likelihood?: number;
  impact?: number;
  risk_level?: string;
  mitigation_strategy?: string;
  owner_id?: string;
  status?: string;
}

export interface MinistryRiskQuery {
  ministry_id?: string;
  search?: string;
  risk_level?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryBenchmark {
  id: string;
  ministry_id: string;
  benchmark_name: string;
  description: string;
  category: string;
  target_value: number;
  current_value: number;
  unit: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryBenchmarkCreate {
  ministry_id: string;
  benchmark_name: string;
  description: string;
  category: string;
  target_value: number;
  current_value: number;
  unit: string;
  period: string;
}

export interface MinistryBenchmarkUpdate {
  benchmark_name?: string;
  description?: string;
  category?: string;
  target_value?: number;
  current_value?: number;
  unit?: string;
  period?: string;
}

export interface MinistryBenchmarkQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  period?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTraining {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  trainer: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTrainingCreate {
  ministry_id: string;
  title: string;
  description: string;
  trainer: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  status: string;
}

export interface MinistryTrainingUpdate {
  title?: string;
  description?: string;
  trainer?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  max_participants?: number;
  current_participants?: number;
  status?: string;
}

export interface MinistryTrainingQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryStatistics {
  id: string;
  ministry_id: string;
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryStatisticsCreate {
  ministry_id: string;
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
}

export interface MinistryStatisticsUpdate {
  stat_name?: string;
  stat_value?: number;
  stat_unit?: string;
  period?: string;
  category?: string;
}

export interface MinistryStatisticsQuery {
  ministry_id?: string;
  stat_name?: string;
  period?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTimeline {
  id: string;
  ministry_id: string;
  event_name: string;
  description: string;
  event_date: string;
  event_type: string;
  importance: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTimelineCreate {
  ministry_id: string;
  event_name: string;
  description: string;
  event_date: string;
  event_type: string;
  importance: string;
}

export interface MinistryTimelineUpdate {
  event_name?: string;
  description?: string;
  event_date?: string;
  event_type?: string;
  importance?: string;
}

export interface MinistryTimelineQuery {
  ministry_id?: string;
  search?: string;
  event_type?: string;
  importance?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryContact {
  id: string;
  ministry_id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface MinistryContactCreate {
  ministry_id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  is_primary: boolean;
}

export interface MinistryContactUpdate {
  name?: string;
  position?: string;
  department?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_primary?: boolean;
}

export interface MinistryContactQuery {
  ministry_id?: string;
  search?: string;
  department?: string;
  is_primary?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryFeedback {
  id: string;
  ministry_id: string;
  user_id: string;
  category: string;
  subject: string;
  message: string;
  rating: number;
  status: string;
  response: string | null;
  created_at: string;
  updated_at: string;
}

export interface MinistryFeedbackCreate {
  ministry_id: string;
  user_id: string;
  category: string;
  subject: string;
  message: string;
  rating: number;
  status: string;
}

export interface MinistryFeedbackUpdate {
  category?: string;
  subject?: string;
  message?: string;
  rating?: number;
  status?: string;
  response?: string | null;
}

export interface MinistryFeedbackQuery {
  ministry_id?: string;
  category?: string;
  status?: string;
  rating?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryComplaint {
  id: string;
  ministry_id: string;
  complainant_name: string;
  complainant_email: string;
  complainant_phone: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assigned_to: string | null;
  resolution: string | null;
  created_at: string;
  updated_at: string;
}

export interface MinistryComplaintCreate {
  ministry_id: string;
  complainant_name: string;
  complainant_email: string;
  complainant_phone: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assigned_to: string | null;
  resolution: string | null;
}

export interface MinistryComplaintUpdate {
  complainant_name?: string;
  complainant_email?: string;
  complainant_phone?: string;
  subject?: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  assigned_to?: string | null;
  resolution?: string | null;
}

export interface MinistryComplaintQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  priority?: string;
  status?: string;
  assigned_to?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryService {
  id: string;
  ministry_id: string;
  name: string;
  description: string;
  category: string;
  fee: number;
  processing_time: string;
  requirements: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryServiceCreate {
  ministry_id: string;
  name: string;
  description: string;
  category: string;
  fee: number;
  processing_time: string;
  requirements: string;
  status: string;
}

export interface MinistryServiceUpdate {
  name?: string;
  description?: string;
  category?: string;
  fee?: number;
  processing_time?: string;
  requirements?: string;
  status?: string;
}

export interface MinistryServiceQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryProcedure {
  id: string;
  ministry_id: string;
  service_id: string;
  step_number: number;
  step_name: string;
  description: string;
  responsible: string;
  duration: string;
  required_documents: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryProcedureCreate {
  ministry_id: string;
  service_id: string;
  step_number: number;
  step_name: string;
  description: string;
  responsible: string;
  duration: string;
  required_documents: string;
}

export interface MinistryProcedureUpdate {
  service_id?: string;
  step_number?: number;
  step_name?: string;
  description?: string;
  responsible?: string;
  duration?: string;
  required_documents?: string;
}

export interface MinistryProcedureQuery {
  ministry_id?: string;
  service_id?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTransparency {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  category: string;
  publication_date: string;
  document_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTransparencyCreate {
  ministry_id: string;
  title: string;
  description: string;
  category: string;
  publication_date: string;
  document_url: string;
  status: string;
}

export interface MinistryTransparencyUpdate {
  title?: string;
  description?: string;
  category?: string;
  publication_date?: string;
  document_url?: string;
  status?: string;
}

export interface MinistryTransparencyQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryInnovation {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  budget: number;
  owner_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryInnovationCreate {
  ministry_id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  budget: number;
  owner_id: string;
  status: string;
}

export interface MinistryInnovationUpdate {
  title?: string;
  description?: string;
  category?: string;
  stage?: string;
  budget?: number;
  owner_id?: string;
  status?: string;
}

export interface MinistryInnovationQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  stage?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistrySustainability {
  id: string;
  ministry_id: string;
  initiative_name: string;
  description: string;
  category: string;
  target_date: string;
  progress: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistrySustainabilityCreate {
  ministry_id: string;
  initiative_name: string;
  description: string;
  category: string;
  target_date: string;
  progress: number;
  status: string;
}

export interface MinistrySustainabilityUpdate {
  initiative_name?: string;
  description?: string;
  category?: string;
  target_date?: string;
  progress?: number;
  status?: string;
}

export interface MinistrySustainabilityQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryDigitalTransformation {
  id: string;
  ministry_id: string;
  project_name: string;
  description: string;
  category: string;
  budget: number;
  start_date: string;
  end_date: string;
  progress: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryDigitalTransformationCreate {
  ministry_id: string;
  project_name: string;
  description: string;
  category: string;
  budget: number;
  start_date: string;
  end_date: string;
  progress: number;
  status: string;
}

export interface MinistryDigitalTransformationUpdate {
  project_name?: string;
  description?: string;
  category?: string;
  budget?: number;
  start_date?: string;
  end_date?: string;
  progress?: number;
  status?: string;
}

export interface MinistryDigitalTransformationQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryInternational {
  id: string;
  ministry_id: string;
  country: string;
  organization: string;
  agreement_type: string;
  description: string;
  start_date: string;
  end_date: string | null;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryInternationalCreate {
  ministry_id: string;
  country: string;
  organization: string;
  agreement_type: string;
  description: string;
  start_date: string;
  end_date: string | null;
  value: number;
  status: string;
}

export interface MinistryInternationalUpdate {
  country?: string;
  organization?: string;
  agreement_type?: string;
  description?: string;
  start_date?: string;
  end_date?: string | null;
  value?: number;
  status?: string;
}

export interface MinistryInternationalQuery {
  ministry_id?: string;
  search?: string;
  country?: string;
  organization?: string;
  agreement_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryLegal {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  legal_type: string;
  reference_number: string;
  effective_date: string;
  expiry_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryLegalCreate {
  ministry_id: string;
  title: string;
  description: string;
  legal_type: string;
  reference_number: string;
  effective_date: string;
  expiry_date: string | null;
  status: string;
}

export interface MinistryLegalUpdate {
  title?: string;
  description?: string;
  legal_type?: string;
  reference_number?: string;
  effective_date?: string;
  expiry_date?: string | null;
  status?: string;
}

export interface MinistryLegalQuery {
  ministry_id?: string;
  search?: string;
  legal_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryCommunication {
  id: string;
  ministry_id: string;
  title: string;
  content: string;
  channel: string;
  audience: string;
  scheduled_date: string | null;
  sent_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryCommunicationCreate {
  ministry_id: string;
  title: string;
  content: string;
  channel: string;
  audience: string;
  scheduled_date: string | null;
  sent_date: string | null;
  status: string;
}

export interface MinistryCommunicationUpdate {
  title?: string;
  content?: string;
  channel?: string;
  audience?: string;
  scheduled_date?: string | null;
  sent_date?: string | null;
  status?: string;
}

export interface MinistryCommunicationQuery {
  ministry_id?: string;
  search?: string;
  channel?: string;
  audience?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryArchive {
  id: string;
  ministry_id: string;
  document_id: string;
  archive_date: string;
  retention_period: number;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryArchiveCreate {
  ministry_id: string;
  document_id: string;
  archive_date: string;
  retention_period: number;
  location: string;
  status: string;
}

export interface MinistryArchiveUpdate {
  archive_date?: string;
  retention_period?: number;
  location?: string;
  status?: string;
}

export interface MinistryArchiveQuery {
  ministry_id?: string;
  document_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryCompliance {
  id: string;
  ministry_id: string;
  regulation_name: string;
  description: string;
  category: string;
  compliance_level: number;
  last_audit_date: string;
  next_audit_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryComplianceCreate {
  ministry_id: string;
  regulation_name: string;
  description: string;
  category: string;
  compliance_level: number;
  last_audit_date: string;
  next_audit_date: string;
  status: string;
}

export interface MinistryComplianceUpdate {
  regulation_name?: string;
  description?: string;
  category?: string;
  compliance_level?: number;
  last_audit_date?: string;
  next_audit_date?: string;
  status?: string;
}

export interface MinistryComplianceQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryFacility {
  id: string;
  ministry_id: string;
  name: string;
  type: string;
  address: string;
  capacity: number;
  current_occupancy: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryFacilityCreate {
  ministry_id: string;
  name: string;
  type: string;
  address: string;
  capacity: number;
  current_occupancy: number;
  status: string;
}

export interface MinistryFacilityUpdate {
  name?: string;
  type?: string;
  address?: string;
  capacity?: number;
  current_occupancy?: number;
  status?: string;
}

export interface MinistryFacilityQuery {
  ministry_id?: string;
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryVehicle {
  id: string;
  ministry_id: string;
  plate_number: string;
  type: string;
  model: string;
  year: number;
  driver_name: string;
  driver_phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryVehicleCreate {
  ministry_id: string;
  plate_number: string;
  type: string;
  model: string;
  year: number;
  driver_name: string;
  driver_phone: string;
  status: string;
}

export interface MinistryVehicleUpdate {
  plate_number?: string;
  type?: string;
  model?: string;
  year?: number;
  driver_name?: string;
  driver_phone?: string;
  status?: string;
}

export interface MinistryVehicleQuery {
  ministry_id?: string;
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAsset {
  id: string;
  ministry_id: string;
  name: string;
  type: string;
  serial_number: string;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAssetCreate {
  ministry_id: string;
  name: string;
  type: string;
  serial_number: string;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  location: string;
  status: string;
}

export interface MinistryAssetUpdate {
  name?: string;
  type?: string;
  serial_number?: string;
  purchase_date?: string;
  purchase_price?: number;
  current_value?: number;
  location?: string;
  status?: string;
}

export interface MinistryAssetQuery {
  ministry_id?: string;
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryContract {
  id: string;
  ministry_id: string;
  contract_number: string;
  contractor_name: string;
  description: string;
  start_date: string;
  end_date: string;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryContractCreate {
  ministry_id: string;
  contract_number: string;
  contractor_name: string;
  description: string;
  start_date: string;
  end_date: string;
  value: number;
  status: string;
}

export interface MinistryContractUpdate {
  contract_number?: string;
  contractor_name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  value?: number;
  status?: string;
}

export interface MinistryContractQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryProcurement {
  id: string;
  ministry_id: string;
  procurement_number: string;
  description: string;
  category: string;
  estimated_budget: number;
  publication_date: string;
  closing_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryProcurementCreate {
  ministry_id: string;
  procurement_number: string;
  description: string;
  category: string;
  estimated_budget: number;
  publication_date: string;
  closing_date: string;
  status: string;
}

export interface MinistryProcurementUpdate {
  procurement_number?: string;
  description?: string;
  category?: string;
  estimated_budget?: number;
  publication_date?: string;
  closing_date?: string;
  status?: string;
}

export interface MinistryProcurementQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryBid {
  id: string;
  procurement_id: string;
  bidder_name: string;
  bidder_email: string;
  bid_amount: number;
  submission_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryBidCreate {
  procurement_id: string;
  bidder_name: string;
  bidder_email: string;
  bid_amount: number;
  submission_date: string;
  status: string;
}

export interface MinistryBidUpdate {
  bidder_name?: string;
  bidder_email?: string;
  bid_amount?: number;
  submission_date?: string;
  status?: string;
}

export interface MinistryBidQuery {
  procurement_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAward {
  id: string;
  bid_id: string;
  award_date: string;
  award_amount: number;
  justification: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAwardCreate {
  bid_id: string;
  award_date: string;
  award_amount: number;
  justification: string;
  status: string;
}

export interface MinistryAwardUpdate {
  award_date?: string;
  award_amount?: number;
  justification?: string;
  status?: string;
}

export interface MinistryAwardQuery {
  bid_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryPayment {
  id: string;
  contract_id: string;
  payment_number: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryPaymentCreate {
  contract_id: string;
  payment_number: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  status: string;
}

export interface MinistryPaymentUpdate {
  payment_number?: string;
  amount?: number;
  payment_date?: string;
  payment_method?: string;
  status?: string;
}

export interface MinistryPaymentQuery {
  contract_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryInvoice {
  id: string;
  contract_id: string;
  invoice_number: string;
  amount: number;
  invoice_date: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryInvoiceCreate {
  contract_id: string;
  invoice_number: string;
  amount: number;
  invoice_date: string;
  due_date: string;
  status: string;
}

export interface MinistryInvoiceUpdate {
  invoice_number?: string;
  amount?: number;
  invoice_date?: string;
  due_date?: string;
  status?: string;
}

export interface MinistryInvoiceQuery {
  contract_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryExpense {
  id: string;
  ministry_id: string;
  category: string;
  description: string;
  amount: number;
  expense_date: string;
  approved_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryExpenseCreate {
  ministry_id: string;
  category: string;
  description: string;
  amount: number;
  expense_date: string;
  approved_by: string;
  status: string;
}

export interface MinistryExpenseUpdate {
  category?: string;
  description?: string;
  amount?: number;
  expense_date?: string;
  approved_by?: string;
  status?: string;
}

export interface MinistryExpenseQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryRevenue {
  id: string;
  ministry_id: string;
  source: string;
  description: string;
  amount: number;
  revenue_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryRevenueCreate {
  ministry_id: string;
  source: string;
  description: string;
  amount: number;
  revenue_date: string;
  status: string;
}

export interface MinistryRevenueUpdate {
  source?: string;
  description?: string;
  amount?: number;
  revenue_date?: string;
  status?: string;
}

export interface MinistryRevenueQuery {
  ministry_id?: string;
  search?: string;
  source?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryFinancialReport {
  id: string;
  ministry_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  total_revenue: number;
  total_expenses: number;
  net_balance: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryFinancialReportCreate {
  ministry_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  total_revenue: number;
  total_expenses: number;
  net_balance: number;
  status: string;
}

export interface MinistryFinancialReportUpdate {
  report_type?: string;
  period_start?: string;
  period_end?: string;
  total_revenue?: number;
  total_expenses?: number;
  net_balance?: number;
  status?: string;
}

export interface MinistryFinancialReportQuery {
  ministry_id?: string;
  report_type?: string;
  period_start?: string;
  period_end?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAudit {
  id: string;
  ministry_id: string;
  audit_type: string;
  audit_date: string;
  auditor_name: string;
  findings: string;
  recommendations: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAuditCreate {
  ministry_id: string;
  audit_type: string;
  audit_date: string;
  auditor_name: string;
  findings: string;
  recommendations: string;
  status: string;
}

export interface MinistryAuditUpdate {
  audit_type?: string;
  audit_date?: string;
  auditor_name?: string;
  findings?: string;
  recommendations?: string;
  status?: string;
}

export interface MinistryAuditQuery {
  ministry_id?: string;
  search?: string;
  audit_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryInspection {
  id: string;
  inspectorate_id: string;
  school_id: string;
  inspection_date: string;
  inspector_name: string;
  findings: string;
  recommendations: string;
  score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryInspectionCreate {
  inspectorate_id: string;
  school_id: string;
  inspection_date: string;
  inspector_name: string;
  findings: string;
  recommendations: string;
  score: number;
  status: string;
}

export interface MinistryInspectionUpdate {
  inspectorate_id?: string;
  school_id?: string;
  inspection_date?: string;
  inspector_name?: string;
  findings?: string;
  recommendations?: string;
  score?: number;
  status?: string;
}

export interface MinistryInspectionQuery {
  inspectorate_id?: string;
  school_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAccreditation {
  id: string;
  institution_id: string;
  accreditation_type: string;
  accrediting_body: string;
  issue_date: string;
  expiry_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAccreditationCreate {
  institution_id: string;
  accreditation_type: string;
  accrediting_body: string;
  issue_date: string;
  expiry_date: string;
  status: string;
}

export interface MinistryAccreditationUpdate {
  institution_id?: string;
  accreditation_type?: string;
  accrediting_body?: string;
  issue_date?: string;
  expiry_date?: string;
  status?: string;
}

export interface MinistryAccreditationQuery {
  institution_id?: string;
  search?: string;
  accreditation_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryCertification {
  id: string;
  staff_id: string;
  certification_name: string;
  issuing_body: string;
  issue_date: string;
  expiry_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryCertificationCreate {
  staff_id: string;
  certification_name: string;
  issuing_body: string;
  issue_date: string;
  expiry_date: string;
  status: string;
}

export interface MinistryCertificationUpdate {
  staff_id?: string;
  certification_name?: string;
  issuing_body?: string;
  issue_date?: string;
  expiry_date?: string;
  status?: string;
}

export interface MinistryCertificationQuery {
  staff_id?: string;
  search?: string;
  certification_name?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryStaff {
  id: string;
  ministry_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  hire_date: string;
  salary: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryStaffCreate {
  ministry_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  hire_date: string;
  salary: number;
  status: string;
}

export interface MinistryStaffUpdate {
  employee_id?: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  department?: string;
  hire_date?: string;
  salary?: number;
  status?: string;
}

export interface MinistryStaffQuery {
  ministry_id?: string;
  search?: string;
  department?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryLeave {
  id: string;
  staff_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  approved_by: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryLeaveCreate {
  staff_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  approved_by: string | null;
  status: string;
}

export interface MinistryLeaveUpdate {
  leave_type?: string;
  start_date?: string;
  end_date?: string;
  reason?: string;
  approved_by?: string | null;
  status?: string;
}

export interface MinistryLeaveQuery {
  staff_id?: string;
  search?: string;
  leave_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryPerformanceReview {
  id: string;
  staff_id: string;
  review_period: string;
  reviewer_id: string;
  overall_rating: number;
  comments: string;
  goals: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryPerformanceReviewCreate {
  staff_id: string;
  review_period: string;
  reviewer_id: string;
  overall_rating: number;
  comments: string;
  goals: string;
  status: string;
}

export interface MinistryPerformanceReviewUpdate {
  review_period?: string;
  reviewer_id?: string;
  overall_rating?: number;
  comments?: string;
  goals?: string;
  status?: string;
}

export interface MinistryPerformanceReviewQuery {
  staff_id?: string;
  search?: string;
  review_period?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTrainingProgram {
  id: string;
  ministry_id: string;
  program_name: string;
  description: string;
  trainer: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTrainingProgramCreate {
  ministry_id: string;
  program_name: string;
  description: string;
  trainer: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  status: string;
}

export interface MinistryTrainingProgramUpdate {
  program_name?: string;
  description?: string;
  trainer?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  max_participants?: number;
  current_participants?: number;
  status?: string;
}

export interface MinistryTrainingProgramQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTrainingEnrollment {
  id: string;
  program_id: string;
  staff_id: string;
  enrollment_date: string;
  completion_date: string | null;
  score: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTrainingEnrollmentCreate {
  program_id: string;
  staff_id: string;
  enrollment_date: string;
  completion_date: string | null;
  score: number | null;
  status: string;
}

export interface MinistryTrainingEnrollmentUpdate {
  enrollment_date?: string;
  completion_date?: string | null;
  score?: number | null;
  status?: string;
}

export interface MinistryTrainingEnrollmentQuery {
  program_id?: string;
  staff_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTravel {
  id: string;
  staff_id: string;
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  estimated_cost: number;
  approved_by: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTravelCreate {
  staff_id: string;
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  estimated_cost: number;
  approved_by: string | null;
  status: string;
}

export interface MinistryTravelUpdate {
  destination?: string;
  purpose?: string;
  start_date?: string;
  end_date?: string;
  estimated_cost?: number;
  approved_by?: string | null;
  status?: string;
}

export interface MinistryTravelQuery {
  staff_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMission {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  country: string;
  start_date: string;
  end_date: string;
  participants: string;
  budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMissionCreate {
  ministry_id: string;
  title: string;
  description: string;
  country: string;
  start_date: string;
  end_date: string;
  participants: string;
  budget: number;
  status: string;
}

export interface MinistryMissionUpdate {
  title?: string;
  description?: string;
  country?: string;
  start_date?: string;
  end_date?: string;
  participants?: string;
  budget?: number;
  status?: string;
}

export interface MinistryMissionQuery {
  ministry_id?: string;
  search?: string;
  country?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryConference {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  organizer: string;
  participants: number;
  budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryConferenceCreate {
  ministry_id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  organizer: string;
  participants: number;
  budget: number;
  status: string;
}

export interface MinistryConferenceUpdate {
  title?: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  organizer?: string;
  participants?: number;
  budget?: number;
  status?: string;
}

export interface MinistryConferenceQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistrySeminar {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  speaker: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistrySeminarCreate {
  ministry_id: string;
  title: string;
  description: string;
  speaker: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  status: string;
}

export interface MinistrySeminarUpdate {
  title?: string;
  description?: string;
  speaker?: string;
  date?: string;
  time?: string;
  location?: string;
  participants?: number;
  status?: string;
}

export interface MinistrySeminarQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryWorkshop {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  facilitator: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryWorkshopCreate {
  ministry_id: string;
  title: string;
  description: string;
  facilitator: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  status: string;
}

export interface MinistryWorkshopUpdate {
  title?: string;
  description?: string;
  facilitator?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  max_participants?: number;
  current_participants?: number;
  status?: string;
}

export interface MinistryWorkshopQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAward {
  id: string;
  ministry_id: string;
  award_name: string;
  description: string;
  category: string;
  recipient_name: string;
  award_date: string;
  presented_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAwardCreate {
  ministry_id: string;
  award_name: string;
  description: string;
  category: string;
  recipient_name: string;
  award_date: string;
  presented_by: string;
  status: string;
}

export interface MinistryAwardUpdate {
  award_name?: string;
  description?: string;
  category?: string;
  recipient_name?: string;
  award_date?: string;
  presented_by?: string;
  status?: string;
}

export interface MinistryAwardQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryRecognition {
  id: string;
  ministry_id: string;
  recognition_name: string;
  description: string;
  recipient_id: string;
  recognition_date: string;
  given_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryRecognitionCreate {
  ministry_id: string;
  recognition_name: string;
  description: string;
  recipient_id: string;
  recognition_date: string;
  given_by: string;
  status: string;
}

export interface MinistryRecognitionUpdate {
  recognition_name?: string;
  description?: string;
  recipient_id?: string;
  recognition_date?: string;
  given_by?: string;
  status?: string;
}

export interface MinistryRecognitionQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMedia {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  media_type: string;
  file_url: string;
  publication_date: string;
  views: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMediaCreate {
  ministry_id: string;
  title: string;
  description: string;
  media_type: string;
  file_url: string;
  publication_date: string;
  views: number;
  status: string;
}

export interface MinistryMediaUpdate {
  title?: string;
  description?: string;
  media_type?: string;
  file_url?: string;
  publication_date?: string;
  views?: number;
  status?: string;
}

export interface MinistryMediaQuery {
  ministry_id?: string;
  search?: string;
  media_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistrySocialMedia {
  id: string;
  ministry_id: string;
  platform: string;
  account_name: string;
  account_url: string;
  followers: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistrySocialMediaCreate {
  ministry_id: string;
  platform: string;
  account_name: string;
  account_url: string;
  followers: number;
  status: string;
}

export interface MinistrySocialMediaUpdate {
  platform?: string;
  account_name?: string;
  account_url?: string;
  followers?: number;
  status?: string;
}

export interface MinistrySocialMediaQuery {
  ministry_id?: string;
  search?: string;
  platform?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryWebsite {
  id: string;
  ministry_id: string;
  url: string;
  description: string;
  traffic: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryWebsiteCreate {
  ministry_id: string;
  url: string;
  description: string;
  traffic: number;
  status: string;
}

export interface MinistryWebsiteUpdate {
  url?: string;
  description?: string;
  traffic?: number;
  status?: string;
}

export interface MinistryWebsiteQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryApp {
  id: string;
  ministry_id: string;
  name: string;
  description: string;
  platform: string;
  version: string;
  downloads: number;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAppCreate {
  ministry_id: string;
  name: string;
  description: string;
  platform: string;
  version: string;
  downloads: number;
  rating: number;
  status: string;
}

export interface MinistryAppUpdate {
  name?: string;
  description?: string;
  platform?: string;
  version?: string;
  downloads?: number;
  rating?: number;
  status?: string;
}

export interface MinistryAppQuery {
  ministry_id?: string;
  search?: string;
  platform?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryNewsletter {
  id: string;
  ministry_id: string;
  title: string;
  content: string;
  issue_number: number;
  publication_date: string;
  subscribers: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryNewsletterCreate {
  ministry_id: string;
  title: string;
  content: string;
  issue_number: number;
  publication_date: string;
  subscribers: number;
  status: string;
}

export interface MinistryNewsletterUpdate {
  title?: string;
  content?: string;
  issue_number?: number;
  publication_date?: string;
  subscribers?: number;
  status?: string;
}

export interface MinistryNewsletterQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryPressRelease {
  id: string;
  ministry_id: string;
  title: string;
  content: string;
  release_date: string;
  author: string;
  distribution_list: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryPressReleaseCreate {
  ministry_id: string;
  title: string;
  content: string;
  release_date: string;
  author: string;
  distribution_list: string;
  status: string;
}

export interface MinistryPressReleaseUpdate {
  title?: string;
  content?: string;
  release_date?: string;
  author?: string;
  distribution_list?: string;
  status?: string;
}

export interface MinistryPressReleaseQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAnnualReport {
  id: string;
  ministry_id: string;
  fiscal_year: string;
  title: string;
  summary: string;
  file_url: string;
  publication_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAnnualReportCreate {
  ministry_id: string;
  fiscal_year: string;
  title: string;
  summary: string;
  file_url: string;
  publication_date: string;
  status: string;
}

export interface MinistryAnnualReportUpdate {
  fiscal_year?: string;
  title?: string;
  summary?: string;
  file_url?: string;
  publication_date?: string;
  status?: string;
}

export interface MinistryAnnualReportQuery {
  ministry_id?: string;
  search?: string;
  fiscal_year?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryStrategicPlan {
  id: string;
  ministry_id: string;
  plan_name: string;
  description: string;
  vision: string;
  mission: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryStrategicPlanCreate {
  ministry_id: string;
  plan_name: string;
  description: string;
  vision: string;
  mission: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface MinistryStrategicPlanUpdate {
  plan_name?: string;
  description?: string;
  vision?: string;
  mission?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
}

export interface MinistryStrategicPlanQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryActionPlan {
  id: string;
  strategic_plan_id: string;
  action_name: string;
  description: string;
  responsible: string;
  start_date: string;
  end_date: string;
  budget: number;
  progress: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryActionPlanCreate {
  strategic_plan_id: string;
  action_name: string;
  description: string;
  responsible: string;
  start_date: string;
  end_date: string;
  budget: number;
  progress: number;
  status: string;
}

export interface MinistryActionPlanUpdate {
  action_name?: string;
  description?: string;
  responsible?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  progress?: number;
  status?: string;
}

export interface MinistryActionPlanQuery {
  strategic_plan_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryKeyPerformanceIndicator {
  id: string;
  strategic_plan_id: string;
  kpi_name: string;
  description: string;
  target_value: number;
  actual_value: number;
  unit: string;
  measurement_frequency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryKeyPerformanceIndicatorCreate {
  strategic_plan_id: string;
  kpi_name: string;
  description: string;
  target_value: number;
  actual_value: number;
  unit: string;
  measurement_frequency: string;
  status: string;
}

export interface MinistryKeyPerformanceIndicatorUpdate {
  kpi_name?: string;
  description?: string;
  target_value?: number;
  actual_value?: number;
  unit?: string;
  measurement_frequency?: string;
  status?: string;
}

export interface MinistryKeyPerformanceIndicatorQuery {
  strategic_plan_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMilestone {
  id: string;
  action_plan_id: string;
  milestone_name: string;
  description: string;
  target_date: string;
  completion_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMilestoneCreate {
  action_plan_id: string;
  milestone_name: string;
  description: string;
  target_date: string;
  completion_date: string | null;
  status: string;
}

export interface MinistryMilestoneUpdate {
  milestone_name?: string;
  description?: string;
  target_date?: string;
  completion_date?: string | null;
  status?: string;
}

export interface MinistryMilestoneQuery {
  action_plan_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryRiskAssessment {
  id: string;
  strategic_plan_id: string;
  risk_name: string;
  description: string;
  likelihood: number;
  impact: number;
  risk_level: string;
  mitigation_strategy: string;
  owner: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryRiskAssessmentCreate {
  strategic_plan_id: string;
  risk_name: string;
  description: string;
  likelihood: number;
  impact: number;
  risk_level: string;
  mitigation_strategy: string;
  owner: string;
  status: string;
}

export interface MinistryRiskAssessmentUpdate {
  risk_name?: string;
  description?: string;
  likelihood?: number;
  impact?: number;
  risk_level?: string;
  mitigation_strategy?: string;
  owner?: string;
  status?: string;
}

export interface MinistryRiskAssessmentQuery {
  strategic_plan_id?: string;
  search?: string;
  risk_level?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryStakeholderAnalysis {
  id: string;
  strategic_plan_id: string;
  stakeholder_name: string;
  stakeholder_type: string;
  interest_level: number;
  influence_level: number;
  strategy: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryStakeholderAnalysisCreate {
  strategic_plan_id: string;
  stakeholder_name: string;
  stakeholder_type: string;
  interest_level: number;
  influence_level: number;
  strategy: string;
  status: string;
}

export interface MinistryStakeholderAnalysisUpdate {
  stakeholder_name?: string;
  stakeholder_type?: string;
  interest_level?: number;
  influence_level?: number;
  strategy?: string;
  status?: string;
}

export interface MinistryStakeholderAnalysisQuery {
  strategic_plan_id?: string;
  search?: string;
  stakeholder_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryCommunicationPlan {
  id: string;
  strategic_plan_id: string;
  communication_name: string;
  description: string;
  audience: string;
  channel: string;
  frequency: string;
  responsible: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryCommunicationPlanCreate {
  strategic_plan_id: string;
  communication_name: string;
  description: string;
  audience: string;
  channel: string;
  frequency: string;
  responsible: string;
  status: string;
}

export interface MinistryCommunicationPlanUpdate {
  communication_name?: string;
  description?: string;
  audience?: string;
  channel?: string;
  frequency?: string;
  responsible?: string;
  status?: string;
}

export interface MinistryCommunicationPlanQuery {
  strategic_plan_id?: string;
  search?: string;
  channel?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryResourceAllocation {
  id: string;
  strategic_plan_id: string;
  resource_name: string;
  resource_type: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  allocation_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryResourceAllocationCreate {
  strategic_plan_id: string;
  resource_name: string;
  resource_type: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  allocation_date: string;
  status: string;
}

export interface MinistryResourceAllocationUpdate {
  resource_name?: string;
  resource_type?: string;
  quantity?: number;
  unit_cost?: number;
  total_cost?: number;
  allocation_date?: string;
  status?: string;
}

export interface MinistryResourceAllocationQuery {
  strategic_plan_id?: string;
  search?: string;
  resource_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMonitoring {
  id: string;
  strategic_plan_id: string;
  monitoring_name: string;
  description: string;
  frequency: string;
  responsible: string;
  tools: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMonitoringCreate {
  strategic_plan_id: string;
  monitoring_name: string;
  description: string;
  frequency: string;
  responsible: string;
  tools: string;
  status: string;
}

export interface MinistryMonitoringUpdate {
  monitoring_name?: string;
  description?: string;
  frequency?: string;
  responsible?: string;
  tools?: string;
  status?: string;
}

export interface MinistryMonitoringQuery {
  strategic_plan_id?: string;
  search?: string;
  frequency?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryEvaluation {
  id: string;
  strategic_plan_id: string;
  evaluation_name: string;
  description: string;
  evaluation_type: string;
  evaluator: string;
  evaluation_date: string;
  findings: string;
  recommendations: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryEvaluationCreate {
  strategic_plan_id: string;
  evaluation_name: string;
  description: string;
  evaluation_type: string;
  evaluator: string;
  evaluation_date: string;
  findings: string;
  recommendations: string;
  status: string;
}

export interface MinistryEvaluationUpdate {
  evaluation_name?: string;
  description?: string;
  evaluation_type?: string;
  evaluator?: string;
  evaluation_date?: string;
  findings?: string;
  recommendations?: string;
  status?: string;
}

export interface MinistryEvaluationQuery {
  strategic_plan_id?: string;
  search?: string;
  evaluation_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryLessonsLearned {
  id: string;
  strategic_plan_id: string;
  lesson_title: string;
  description: string;
  category: string;
  date_identified: string;
  recommendations: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryLessonsLearnedCreate {
  strategic_plan_id: string;
  lesson_title: string;
  description: string;
  category: string;
  date_identified: string;
  recommendations: string;
  status: string;
}

export interface MinistryLessonsLearnedUpdate {
  lesson_title?: string;
  description?: string;
  category?: string;
  date_identified?: string;
  recommendations?: string;
  status?: string;
}

export interface MinistryLessonsLearnedQuery {
  strategic_plan_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryBestPractice {
  id: string;
  ministry_id: string;
  practice_name: string;
  description: string;
  category: string;
  source: string;
  implementation_date: string;
  outcomes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryBestPracticeCreate {
  ministry_id: string;
  practice_name: string;
  description: string;
  category: string;
  source: string;
  implementation_date: string;
  outcomes: string;
  status: string;
}

export interface MinistryBestPracticeUpdate {
  practice_name?: string;
  description?: string;
  category?: string;
  source?: string;
  implementation_date?: string;
  outcomes?: string;
  status?: string;
}

export interface MinistryBestPracticeQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryInnovationHub {
  id: string;
  ministry_id: string;
  hub_name: string;
  description: string;
  focus_area: string;
  manager: string;
  budget: number;
  projects: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryInnovationHubCreate {
  ministry_id: string;
  hub_name: string;
  description: string;
  focus_area: string;
  manager: string;
  budget: number;
  projects: number;
  status: string;
}

export interface MinistryInnovationHubUpdate {
  hub_name?: string;
  description?: string;
  focus_area?: string;
  manager?: string;
  budget?: number;
  projects?: number;
  status?: string;
}

export interface MinistryInnovationHubQuery {
  ministry_id?: string;
  search?: string;
  focus_area?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryStartup {
  id: string;
  innovation_hub_id: string;
  startup_name: string;
  description: string;
  founder: string;
  funding_amount: number;
  stage: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryStartupCreate {
  innovation_hub_id: string;
  startup_name: string;
  description: string;
  founder: string;
  funding_amount: number;
  stage: string;
  status: string;
}

export interface MinistryStartupUpdate {
  startup_name?: string;
  description?: string;
  founder?: string;
  funding_amount?: number;
  stage?: string;
  status?: string;
}

export interface MinistryStartupQuery {
  innovation_hub_id?: string;
  search?: string;
  stage?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryIncubator {
  id: string;
  ministry_id: string;
  incubator_name: string;
  description: string;
  focus_area: string;
  manager: string;
  capacity: number;
  current_occupancy: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryIncubatorCreate {
  ministry_id: string;
  incubator_name: string;
  description: string;
  focus_area: string;
  manager: string;
  capacity: number;
  current_occupancy: number;
  status: string;
}

export interface MinistryIncubatorUpdate {
  incubator_name?: string;
  description?: string;
  focus_area?: string;
  manager?: string;
  capacity?: number;
  current_occupancy?: number;
  status?: string;
}

export interface MinistryIncubatorQuery {
  ministry_id?: string;
  search?: string;
  focus_area?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAccelerator {
  id: string;
  ministry_id: string;
  accelerator_name: string;
  description: string;
  focus_area: string;
  duration: number;
  cohort_size: number;
  current_cohort: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAcceleratorCreate {
  ministry_id: string;
  accelerator_name: string;
  description: string;
  focus_area: string;
  duration: number;
  cohort_size: number;
  current_cohort: number;
  status: string;
}

export interface MinistryAcceleratorUpdate {
  accelerator_name?: string;
  description?: string;
  focus_area?: string;
  duration?: number;
  cohort_size?: number;
  current_cohort?: number;
  status?: string;
}

export interface MinistryAcceleratorQuery {
  ministry_id?: string;
  search?: string;
  focus_area?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryLab {
  id: string;
  ministry_id: string;
  lab_name: string;
  description: string;
  focus_area: string;
  equipment: string;
  capacity: number;
  manager: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryLabCreate {
  ministry_id: string;
  lab_name: string;
  description: string;
  focus_area: string;
  equipment: string;
  capacity: number;
  manager: string;
  status: string;
}

export interface MinistryLabUpdate {
  lab_name?: string;
  description?: string;
  focus_area?: string;
  equipment?: string;
  capacity?: number;
  manager?: string;
  status?: string;
}

export interface MinistryLabQuery {
  ministry_id?: string;
  search?: string;
  focus_area?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryResearchProject {
  id: string;
  ministry_id: string;
  project_name: string;
  description: string;
  research_area: string;
  principal_investigator: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryResearchProjectCreate {
  ministry_id: string;
  project_name: string;
  description: string;
  research_area: string;
  principal_investigator: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: string;
}

export interface MinistryResearchProjectUpdate {
  project_name?: string;
  description?: string;
  research_area?: string;
  principal_investigator?: string;
  budget?: number;
  start_date?: string;
  end_date?: string;
  status?: string;
}

export interface MinistryResearchProjectQuery {
  ministry_id?: string;
  search?: string;
  research_area?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryResearcher {
  id: string;
  research_project_id: string;
  researcher_name: string;
  role: string;
  institution: string;
  expertise: string;
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryResearcherCreate {
  research_project_id: string;
  researcher_name: string;
  role: string;
  institution: string;
  expertise: string;
  start_date: string;
  end_date: string | null;
  status: string;
}

export interface MinistryResearcherUpdate {
  researcher_name?: string;
  role?: string;
  institution?: string;
  expertise?: string;
  start_date?: string;
  end_date?: string | null;
  status?: string;
}

export interface MinistryResearcherQuery {
  research_project_id?: string;
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryPublication {
  id: string;
  research_project_id: string;
  title: string;
  authors: string;
  journal: string;
  publication_date: string;
  doi: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryPublicationCreate {
  research_project_id: string;
  title: string;
  authors: string;
  journal: string;
  publication_date: string;
  doi: string;
  status: string;
}

export interface MinistryPublicationUpdate {
  title?: string;
  authors?: string;
  journal?: string;
  publication_date?: string;
  doi?: string;
  status?: string;
}

export interface MinistryPublicationQuery {
  research_project_id?: string;
  search?: string;
  journal?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryPatent {
  id: string;
  research_project_id: string;
  patent_title: string;
  description: string;
  inventor: string;
  filing_date: string;
  grant_date: string | null;
  patent_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryPatentCreate {
  research_project_id: string;
  patent_title: string;
  description: string;
  inventor: string;
  filing_date: string;
  grant_date: string | null;
  patent_number: string;
  status: string;
}

export interface MinistryPatentUpdate {
  patent_title?: string;
  description?: string;
  inventor?: string;
  filing_date?: string;
  grant_date?: string | null;
  patent_number?: string;
  status?: string;
}

export interface MinistryPatentQuery {
  research_project_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTechnology {
  id: string;
  ministry_id: string;
  technology_name: string;
  description: string;
  category: string;
  readiness_level: number;
  potential_impact: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTechnologyCreate {
  ministry_id: string;
  technology_name: string;
  description: string;
  category: string;
  readiness_level: number;
  potential_impact: string;
  status: string;
}

export interface MinistryTechnologyUpdate {
  technology_name?: string;
  description?: string;
  category?: string;
  readiness_level?: number;
  potential_impact?: string;
  status?: string;
}

export interface MinistryTechnologyQuery {
  ministry_id?: string;
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTechnologyTransfer {
  id: string;
  technology_id: string;
  recipient_organization: string;
  transfer_date: string;
  transfer_type: string;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTechnologyTransferCreate {
  technology_id: string;
  recipient_organization: string;
  transfer_date: string;
  transfer_type: string;
  value: number;
  status: string;
}

export interface MinistryTechnologyTransferUpdate {
  recipient_organization?: string;
  transfer_date?: string;
  transfer_type?: string;
  value?: number;
  status?: string;
}

export interface MinistryTechnologyTransferQuery {
  technology_id?: string;
  search?: string;
  transfer_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistrySpinOff {
  id: string;
  technology_id: string;
  company_name: string;
  description: string;
  founder: string;
  funding: number;
  equity: number;
  incorporation_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistrySpinOffCreate {
  technology_id: string;
  company_name: string;
  description: string;
  founder: string;
  funding: number;
  equity: number;
  incorporation_date: string;
  status: string;
}

export interface MinistrySpinOffUpdate {
  company_name?: string;
  description?: string;
  founder?: string;
  funding?: number;
  equity?: number;
  incorporation_date?: string;
  status?: string;
}

export interface MinistrySpinOffQuery {
  technology_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryCollaboration {
  id: string;
  ministry_id: string;
  partner_organization: string;
  collaboration_type: string;
  description: string;
  start_date: string;
  end_date: string | null;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryCollaborationCreate {
  ministry_id: string;
  partner_organization: string;
  collaboration_type: string;
  description: string;
  start_date: string;
  end_date: string | null;
  value: number;
  status: string;
}

export interface MinistryCollaborationUpdate {
  partner_organization?: string;
  collaboration_type?: string;
  description?: string;
  start_date?: string;
  end_date?: string | null;
  value?: number;
  status?: string;
}

export interface MinistryCollaborationQuery {
  ministry_id?: string;
  search?: string;
  collaboration_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryJointVenture {
  id: string;
  collaboration_id: string;
  venture_name: string;
  description: string;
  partner_contribution: number;
  ministry_contribution: number;
  equity_split: string;
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryJointVentureCreate {
  collaboration_id: string;
  venture_name: string;
  description: string;
  partner_contribution: number;
  ministry_contribution: number;
  equity_split: string;
  start_date: string;
  end_date: string | null;
  status: string;
}

export interface MinistryJointVentureUpdate {
  venture_name?: string;
  description?: string;
  partner_contribution?: number;
  ministry_contribution?: number;
  equity_split?: string;
  start_date?: string;
  end_date?: string | null;
  status?: string;
}

export interface MinistryJointVentureQuery {
  collaboration_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMemorandumOfUnderstanding {
  id: string;
  collaboration_id: string;
  mou_title: string;
  description: string;
  signing_date: string;
  expiry_date: string;
  parties: string;
  key_terms: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMemorandumOfUnderstandingCreate {
  collaboration_id: string;
  mou_title: string;
  description: string;
  signing_date: string;
  expiry_date: string;
  parties: string;
  key_terms: string;
  status: string;
}

export interface MinistryMemorandumOfUnderstandingUpdate {
  mou_title?: string;
  description?: string;
  signing_date?: string;
  expiry_date?: string;
  parties?: string;
  key_terms?: string;
  status?: string;
}

export interface MinistryMemorandumOfUnderstandingQuery {
  collaboration_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAgreement {
  id: string;
  collaboration_id: string;
  agreement_title: string;
  description: string;
  agreement_type: string;
  effective_date: string;
  termination_date: string | null;
  terms: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAgreementCreate {
  collaboration_id: string;
  agreement_title: string;
  description: string;
  agreement_type: string;
  effective_date: string;
  termination_date: string | null;
  terms: string;
  status: string;
}

export interface MinistryAgreementUpdate {
  agreement_title?: string;
  description?: string;
  agreement_type?: string;
  effective_date?: string;
  termination_date?: string | null;
  terms?: string;
  status?: string;
}

export interface MinistryAgreementQuery {
  collaboration_id?: string;
  search?: string;
  agreement_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryTreaty {
  id: string;
  ministry_id: string;
  treaty_title: string;
  description: string;
  treaty_type: string;
  signing_date: string;
  ratification_date: string | null;
  parties: string;
  key_provisions: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryTreatyCreate {
  ministry_id: string;
  treaty_title: string;
  description: string;
  treaty_type: string;
  signing_date: string;
  ratification_date: string | null;
  parties: string;
  key_provisions: string;
  status: string;
}

export interface MinistryTreatyUpdate {
  treaty_title?: string;
  description?: string;
  treaty_type?: string;
  signing_date?: string;
  ratification_date?: string | null;
  parties?: string;
  key_provisions?: string;
  status?: string;
}

export interface MinistryTreatyQuery {
  ministry_id?: string;
  search?: string;
  treaty_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryConvention {
  id: string;
  ministry_id: string;
  convention_title: string;
  description: string;
  convention_type: string;
  adoption_date: string;
  entry_into_force_date: string;
  parties: string;
  obligations: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryConventionCreate {
  ministry_id: string;
  convention_title: string;
  description: string;
  convention_type: string;
  adoption_date: string;
  entry_into_force_date: string;
  parties: string;
  obligations: string;
  status: string;
}

export interface MinistryConventionUpdate {
  convention_title?: string;
  description?: string;
  convention_type?: string;
  adoption_date?: string;
  entry_into_force_date?: string;
  parties?: string;
  obligations?: string;
  status?: string;
}

export interface MinistryConventionQuery {
  ministry_id?: string;
  search?: string;
  convention_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryProtocol {
  id: string;
  treaty_id: string;
  protocol_title: string;
  description: string;
  adoption_date: string;
  entry_into_force_date: string;
  amendments: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryProtocolCreate {
  treaty_id: string;
  protocol_title: string;
  description: string;
  adoption_date: string;
  entry_into_force_date: string;
  amendments: string;
  status: string;
}

export interface MinistryProtocolUpdate {
  protocol_title?: string;
  description?: string;
  adoption_date?: string;
  entry_into_force_date?: string;
  amendments?: string;
  status?: string;
}

export interface MinistryProtocolQuery {
  treaty_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryResolution {
  id: string;
  committee_id: string;
  resolution_number: string;
  title: string;
  description: string;
  adoption_date: string;
  voting_result: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryResolutionCreate {
  committee_id: string;
  resolution_number: string;
  title: string;
  description: string;
  adoption_date: string;
  voting_result: string;
  status: string;
}

export interface MinistryResolutionUpdate {
  resolution_number?: string;
  title?: string;
  description?: string;
  adoption_date?: string;
  voting_result?: string;
  status?: string;
}

export interface MinistryResolutionQuery {
  committee_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryOrdinance {
  id: string;
  ministry_id: string;
  ordinance_number: string;
  title: string;
  description: string;
  issue_date: string;
  effective_date: string;
  authority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryOrdinanceCreate {
  ministry_id: string;
  ordinance_number: string;
  title: string;
  description: string;
  issue_date: string;
  effective_date: string;
  authority: string;
  status: string;
}

export interface MinistryOrdinanceUpdate {
  ordinance_number?: string;
  title?: string;
  description?: string;
  issue_date?: string;
  effective_date?: string;
  authority?: string;
  status?: string;
}

export interface MinistryOrdinanceQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryDecree {
  id: string;
  ministry_id: string;
  decree_number: string;
  title: string;
  description: string;
  issue_date: string;
  effective_date: string;
  signatory: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryDecreeCreate {
  ministry_id: string;
  decree_number: string;
  title: string;
  description: string;
  issue_date: string;
  effective_date: string;
  signatory: string;
  status: string;
}

export interface MinistryDecreeUpdate {
  decree_number?: string;
  title?: string;
  description?: string;
  issue_date?: string;
  effective_date?: string;
  signatory?: string;
  status?: string;
}

export interface MinistryDecreeQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryDirective {
  id: string;
  ministry_id: string;
  directive_number: string;
  title: string;
  description: string;
  issue_date: string;
  effective_date: string;
  issuing_authority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryDirectiveCreate {
  ministry_id: string;
  directive_number: string;
  title: string;
  description: string;
  issue_date: string;
  effective_date: string;
  issuing_authority: string;
  status: string;
}

export interface MinistryDirectiveUpdate {
  directive_number?: string;
  title?: string;
  description?: string;
  issue_date?: string;
  effective_date?: string;
  issuing_authority?: string;
  status?: string;
}

export interface MinistryDirectiveQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryInstruction {
  id: string;
  ministry_id: string;
  instruction_number: string;
  title: string;
  description: string;
  issue_date: string;
  target_audience: string;
  issuing_authority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryInstructionCreate {
  ministry_id: string;
  instruction_number: string;
  title: string;
  description: string;
  issue_date: string;
  target_audience: string;
  issuing_authority: string;
  status: string;
}

export interface MinistryInstructionUpdate {
  instruction_number?: string;
  title?: string;
  description?: string;
  issue_date?: string;
  target_audience?: string;
  issuing_authority?: string;
  status?: string;
}

export interface MinistryInstructionQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryRuling {
  id: string;
  ministry_id: string;
  ruling_number: string;
  title: string;
  description: string;
  issue_date: string;
  legal_basis: string;
  authority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryRulingCreate {
  ministry_id: string;
  ruling_number: string;
  title: string;
  description: string;
  issue_date: string;
  legal_basis: string;
  authority: string;
  status: string;
}

export interface MinistryRulingUpdate {
  ruling_number?: string;
  title?: string;
  description?: string;
  issue_date?: string;
  legal_basis?: string;
  authority?: string;
  status?: string;
}

export interface MinistryRulingQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryOpinion {
  id: string;
  ministry_id: string;
  opinion_number: string;
  title: string;
  description: string;
  issue_date: string;
  legal_basis: string;
  author: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryOpinionCreate {
  ministry_id: string;
  opinion_number: string;
  title: string;
  description: string;
  issue_date: string;
  legal_basis: string;
  author: string;
  status: string;
}

export interface MinistryOpinionUpdate {
  opinion_number?: string;
  title?: string;
  description?: string;
  issue_date?: string;
  legal_basis?: string;
  author?: string;
  status?: string;
}

export interface MinistryOpinionQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryAdvice {
  id: string;
  ministry_id: string;
  advice_number: string;
  title: string;
  description: string;
  issue_date: string;
  recipient: string;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryAdviceCreate {
  ministry_id: string;
  advice_number: string;
  title: string;
  description: string;
  issue_date: string;
  recipient: string;
  subject: string;
  status: string;
}

export interface MinistryAdviceUpdate {
  advice_number?: string;
  title?: string;
  description?: string;
  issue_date?: string;
  recipient?: string;
  subject?: string;
  status?: string;
}

export interface MinistryAdviceQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryMemo {
  id: string;
  ministry_id: string;
  memo_number: string;
  title: string;
  content: string;
  issue_date: string;
  author: string;
  recipients: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryMemoCreate {
  ministry_id: string;
  memo_number: string;
  title: string;
  content: string;
  issue_date: string;
  author: string;
  recipients: string;
  status: string;
}

export interface MinistryMemoUpdate {
  memo_number?: string;
  title?: string;
  content?: string;
  issue_date?: string;
  author?: string;
  recipients?: string;
  status?: string;
}

export interface MinistryMemoQuery {
  ministry_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryNote {
  id: string;
  ministry_id: string;
  note_number: string;
  title: string;
  content: string;
  issue_date: string;
  author: string;
  classification: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryNoteCreate {
  ministry_id: string;
  note_number: string;
  title: string;
  content: string;
  issue_date: string;
  author: string;
  classification: string;
  status: string;
}

export interface MinistryNoteUpdate {
  note_number?: string;
  title?: string;
  content?: string;
  issue_date?: string;
  author?: string;
  classification?: string;
  status?: string;
}

export interface MinistryNoteQuery {
  ministry_id?: string;
  search?: string;
  classification?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}