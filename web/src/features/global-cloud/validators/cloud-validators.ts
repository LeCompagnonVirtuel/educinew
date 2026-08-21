import { z } from 'zod';

const schoolId = z.string().uuid();

// =============================================================================
// Multi-Country
// =============================================================================

export const CreateMultiCountrySchema = z.object({
  schoolId,
  country_code: z.string().min(2).max(2),
  country_name: z.string().min(1),
  region: z.enum(['africa_west', 'africa_east', 'europe_north', 'europe_south', 'americas_north', 'americas_south', 'asia_pacific', 'middle_east']),
  provider: z.enum(['aws', 'azure', 'gcp', 'alibaba', 'oracle', 'private']),
  tier: z.enum(['standard', 'premium', 'enterprise', 'sovereign']),
  status: z.enum(['active', 'inactive', 'maintenance', 'error', 'drifting']),
});

export const UpdateMultiCountrySchema = CreateMultiCountrySchema.partial();

// =============================================================================
// Country Config
// =============================================================================

export const CreateCountryConfigSchema = z.object({
  schoolId,
  country_id: z.string().uuid(),
  language: z.string().min(2).max(10),
  currency: z.string().min(3).max(3),
  timezone: z.string().min(1),
  phone_format: z.string().min(1),
  date_format: z.string().min(1),
  number_format: z.string().min(1),
});

export const UpdateCountryConfigSchema = CreateCountryConfigSchema.partial();

// =============================================================================
// Country Compliance
// =============================================================================

export const CreateCountryComplianceSchema = z.object({
  schoolId,
  country_id: z.string().uuid(),
  framework: z.enum(['gdpr', 'soc2', 'iso27001', 'ferpa', 'coppa', 'lgpd', 'hipaa']),
  status: z.enum(['compliant', 'non_compliant', 'partial', 'under_review', 'exempt']),
  last_audit: z.string(),
  next_audit: z.string(),
});

export const UpdateCountryComplianceSchema = CreateCountryComplianceSchema.partial();

// =============================================================================
// Country Data Residency
// =============================================================================

export const CreateCountryDataResidencySchema = z.object({
  schoolId,
  country_id: z.string().uuid(),
  residency: z.enum(['local', 'regional', 'national', 'international', 'sovereign']),
  allowed_regions: z.array(z.enum(['africa_west', 'africa_east', 'europe_north', 'europe_south', 'americas_north', 'americas_south', 'asia_pacific', 'middle_east'])),
  encryption: z.enum(['aes256', 'rsa2048', 'custom']),
});

export const UpdateCountryDataResidencySchema = CreateCountryDataResidencySchema.partial();

// =============================================================================
// Multi-Region
// =============================================================================

export const CreateMultiRegionSchema = z.object({
  schoolId,
  region: z.enum(['africa_west', 'africa_east', 'europe_north', 'europe_south', 'americas_north', 'americas_south', 'asia_pacific', 'middle_east']),
  provider: z.enum(['aws', 'azure', 'gcp', 'alibaba', 'oracle', 'private']),
  tier: z.enum(['standard', 'premium', 'enterprise', 'sovereign']),
  status: z.enum(['active', 'inactive', 'maintenance', 'error', 'drifting']),
  primary: z.boolean(),
});

export const UpdateMultiRegionSchema = CreateMultiRegionSchema.partial();

// =============================================================================
// Region Config
// =============================================================================

export const CreateRegionConfigSchema = z.object({
  schoolId,
  region_id: z.string().uuid(),
  provider: z.enum(['aws', 'azure', 'gcp', 'alibaba', 'oracle', 'private']),
  api_endpoint: z.string().url(),
  storage_endpoint: z.string().url(),
  database_endpoint: z.string().url(),
  cache_endpoint: z.string().url(),
});

export const UpdateRegionConfigSchema = CreateRegionConfigSchema.partial();

// =============================================================================
// Region Deployment
// =============================================================================

export const CreateRegionDeploymentSchema = z.object({
  schoolId,
  region_id: z.string().uuid(),
  strategy: z.enum(['rolling', 'blue_green', 'canary', 'a_b', 'shadow']),
  mode: z.enum(['standalone', 'federated', 'hybrid', 'multi_cloud']),
  status: z.enum(['pending', 'deploying', 'deployed', 'failed', 'rolled_back']),
  version: z.string().min(1),
  deployed_at: z.string().optional(),
});

export const UpdateRegionDeploymentSchema = CreateRegionDeploymentSchema.partial();

// =============================================================================
// Region Failover
// =============================================================================

export const CreateRegionFailoverSchema = z.object({
  schoolId,
  region_id: z.string().uuid(),
  target_region_id: z.string().uuid(),
  strategy: z.enum(['latency', 'geographic', 'failover', 'weighted']),
  active: z.boolean(),
  triggered_at: z.string().optional(),
});

export const UpdateRegionFailoverSchema = CreateRegionFailoverSchema.partial();

// =============================================================================
// Multi-Government
// =============================================================================

export const CreateMultiGovernmentSchema = z.object({
  schoolId,
  government_id: z.string().uuid(),
  name: z.string().min(1),
  tier: z.enum(['standard', 'premium', 'enterprise', 'sovereign']),
  status: z.enum(['active', 'inactive', 'maintenance', 'error', 'drifting']),
});

export const UpdateMultiGovernmentSchema = CreateMultiGovernmentSchema.partial();

// =============================================================================
// Government Config
// =============================================================================

export const CreateGovernmentConfigSchema = z.object({
  schoolId,
  government_id: z.string().uuid(),
  regulatory_body: z.string().min(1),
  compliance_framework: z.enum(['gdpr', 'soc2', 'iso27001', 'ferpa', 'coppa', 'lgpd', 'hipaa']),
  data_sovereignty: z.boolean(),
  audit_frequency: z.string().min(1),
});

export const UpdateGovernmentConfigSchema = CreateGovernmentConfigSchema.partial();

// =============================================================================
// Government Policy
// =============================================================================

export const CreateGovernmentPolicySchema = z.object({
  schoolId,
  government_id: z.string().uuid(),
  policy_type: z.string().min(1),
  description: z.string().min(1),
  enforcement: z.string().min(1),
});

export const UpdateGovernmentPolicySchema = CreateGovernmentPolicySchema.partial();

// =============================================================================
// Government Compliance
// =============================================================================

export const CreateGovernmentComplianceSchema = z.object({
  schoolId,
  government_id: z.string().uuid(),
  framework: z.enum(['gdpr', 'soc2', 'iso27001', 'ferpa', 'coppa', 'lgpd', 'hipaa']),
  status: z.enum(['compliant', 'non_compliant', 'partial', 'under_review', 'exempt']),
  last_review: z.string(),
  next_review: z.string(),
});

export const UpdateGovernmentComplianceSchema = CreateGovernmentComplianceSchema.partial();

// =============================================================================
// Multi-Ministry
// =============================================================================

export const CreateMultiMinistrySchema = z.object({
  schoolId,
  ministry_id: z.string().uuid(),
  name: z.string().min(1),
  region: z.enum(['africa_west', 'africa_east', 'europe_north', 'europe_south', 'americas_north', 'americas_south', 'asia_pacific', 'middle_east']),
  tier: z.enum(['standard', 'premium', 'enterprise', 'sovereign']),
  status: z.enum(['active', 'inactive', 'maintenance', 'error', 'drifting']),
});

export const UpdateMultiMinistrySchema = CreateMultiMinistrySchema.partial();

// =============================================================================
// Ministry Config
// =============================================================================

export const CreateMinistryConfigSchema = z.object({
  schoolId,
  ministry_id: z.string().uuid(),
  department_count: z.number().int().min(0),
  school_count: z.number().int().min(0),
  student_count: z.number().int().min(0),
  teacher_count: z.number().int().min(0),
});

export const UpdateMinistryConfigSchema = CreateMinistryConfigSchema.partial();

// =============================================================================
// Ministry Dashboard
// =============================================================================

export const CreateMinistryDashboardSchema = z.object({
  schoolId,
  ministry_id: z.string().uuid(),
  dashboard_type: z.string().min(1),
  widgets: z.array(z.string()),
  refresh_interval: z.number().int().min(1),
});

export const UpdateMinistryDashboardSchema = CreateMinistryDashboardSchema.partial();

// =============================================================================
// Ministry Analytics
// =============================================================================

export const CreateMinistryAnalyticsSchema = z.object({
  schoolId,
  ministry_id: z.string().uuid(),
  metric_type: z.enum(['counter', 'gauge', 'histogram', 'summary', 'timer']),
  value: z.number(),
  period: z.string().min(1),
});

export const UpdateMinistryAnalyticsSchema = CreateMinistryAnalyticsSchema.partial();

// =============================================================================
// Tenant Federation
// =============================================================================

export const CreateTenantFederationSchema = z.object({
  schoolId,
  federation_name: z.string().min(1),
  federation_type: z.enum(['standalone', 'federated', 'hybrid', 'multi_cloud']),
  status: z.enum(['active', 'suspended', 'error']),
  member_count: z.number().int().min(0),
});

export const UpdateTenantFederationSchema = CreateTenantFederationSchema.partial();

// =============================================================================
// Federation Config
// =============================================================================

export const CreateFederationConfigSchema = z.object({
  schoolId,
  federation_id: z.string().uuid(),
  sync_strategy: z.enum(['synchronous', 'asynchronous', 'semi_synchronous', 'cross_region']),
  conflict_resolution: z.string().min(1),
  data_sharing: z.boolean(),
});

export const UpdateFederationConfigSchema = CreateFederationConfigSchema.partial();

// =============================================================================
// Federation Mapping
// =============================================================================

export const CreateFederationMappingSchema = z.object({
  schoolId,
  federation_id: z.string().uuid(),
  source_tenant_id: z.string().uuid(),
  target_tenant_id: z.string().uuid(),
  mapping_type: z.string().min(1),
});

export const UpdateFederationMappingSchema = CreateFederationMappingSchema.partial();

// =============================================================================
// Federation Sync
// =============================================================================

export const CreateFederationSyncSchema = z.object({
  schoolId,
  federation_id: z.string().uuid(),
  sync_type: z.string().min(1),
  status: z.enum(['synced', 'syncing', 'out_of_sync', 'error']),
  last_sync: z.string().optional(),
  next_sync: z.string().optional(),
});

export const UpdateFederationSyncSchema = CreateFederationSyncSchema.partial();
