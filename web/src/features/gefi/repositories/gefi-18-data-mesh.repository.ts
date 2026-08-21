import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-18: Data Mesh — Data Domains, Products, Governance, Discovery
// ============================================================================

export interface GEFIDataDomain extends BaseEntity { name: string; description: string; owner_id: string; domain_type: 'FINANCIAL'|'ACADEMIC'|'OPERATIONAL'|'HR'|'MARKETING'|'CUSTOM'; data_products: string[]; sla_uptime: number; sla_latency_ms: number; status: 'ACTIVE'|'INACTIVE'|'ARCHIVED'; metadata: Record<string,unknown>; }
export interface GEFIDataDomainMember extends BaseEntity { domain_id: string; user_id: string; role: 'OWNER'|'ADMIN'|'ENGINEER'|'ANALYST'|'VIEWER'; permissions: string[]; joined_at: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIDataProduct extends BaseEntity { domain_id: string; name: string; description: string; type: 'DATASET'|'API'|'MODEL'|'DASHBOARD'|'REPORT'; schema: Record<string,unknown>; api_endpoint?: string; refresh_frequency: string; owner_id: string; version: string; quality_score: number; usage_count: number; status: 'PUBLISHED'|'DEPRECATED'|'DRAFT'|'MAINTENANCE'; metadata: Record<string,unknown>; }
export interface GEFIDataProductVersion extends BaseEntity { product_id: string; version: string; changelog: string; schema: Record<string,unknown>; breaking_changes: boolean; published_by: string; published_at: string; status: 'CURRENT'|'ARCHIVED'|'DEPRECATED'; metadata: Record<string,unknown>; }
export interface GEFIDataQualityRule extends BaseEntity { product_id: string; name: string; rule_type: 'COMPLETENESS'|'ACCURACY'|'CONSISTENCY'|'TIMELINESS'|'VALIDITY'|'UNIQUENESS'; definition: Record<string,unknown>; severity: 'CRITICAL'|'HIGH'|'MEDIUM'|'LOW'; is_active: boolean; last_checked: string; status: 'PASSED'|'FAILED'|'WARNING'; metadata: Record<string,unknown>; }
export interface GEFIDataQualityCheck extends BaseEntity { rule_id: string; check_date: string; passed: boolean; score: number; details: Record<string,unknown>; rows_checked: number; rows_failed: number; metadata: Record<string,unknown>; }
export interface GEFIDataLineage extends BaseEntity { product_id: string; source_product_ids: string[]; transformation_steps: Record<string,unknown>[]; dependencies: string[]; upstream_products: string[]; downstream_products: string[]; last_updated: string; metadata: Record<string,unknown>; }
export interface GEFIDataCatalog extends BaseEntity { name: string; description: string; domain_id?: string; total_products: number; total_searches: number; last_indexed: string; status: 'ACTIVE'|'REBUILDING'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIDataCatalogEntry extends BaseEntity { catalog_id: string; product_id: string; search_vector?: number[]; tags: string[]; popularity_score: number; last_accessed: string; metadata: Record<string,unknown>; }
export interface GEFIDataAccessRequest extends BaseEntity { product_id: string; requester_id: string; purpose: string; access_level: 'READ'|'WRITE'|'ADMIN'; duration_days: number; status: 'PENDING'|'APPROVED'|'DENIED'|'EXPIRED'; approved_by?: string; approved_at?: string; expires_at?: string; metadata: Record<string,unknown>; }
export interface GEFIDataPolicy extends BaseEntity { domain_id?: string; product_id?: string; policy_type: 'ACCESS'|'RETENTION'| 'ENCRYPTION'|'ANONYMIZATION'|'AUDIT'; definition: Record<string,unknown>; enforcement: 'STRICT'|'ADVISORY'; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIDataGovernance extends BaseEntity { name: string; framework: string; standards: Record<string,unknown>[]; compliance_score: number; last_audit: string; next_audit: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIDataShare extends BaseEntity { product_id: string; shared_by: string; shared_with: string; share_type: 'DATASET'|'API'|'VIEW'; permissions: string[]; expires_at?: string; status: 'ACTIVE'|'EXPIRED'|'REVOKED'; metadata: Record<string,unknown>; }
export interface GEFIDataSubscription extends BaseEntity { product_id: string; subscriber_id: string; callback_url?: string; events: string[]; status: 'ACTIVE'|'PAUSED'|'CANCELLED'; last_notification: string; metadata: Record<string,unknown>; }
export interface GEFIDataEvent extends BaseEntity { product_id: string; event_type: string; payload: Record<string,unknown>; produced_at: string; consumed: boolean; consumed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIDataMetric extends BaseEntity { product_id: string; metric_name: string; metric_value: number; metric_type: string; period: string; calculated_at: string; metadata: Record<string,unknown>; }
export interface GEFIDataContract extends BaseEntity { product_id: string; consumer_id: string; schema_version: string; sla_latency_ms: number; sla_uptime: number; notification_channel: string; status: 'ACTIVE'|'BREACHED'|'TERMINATED'; last_breach?: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI18Repository {
  dataDomain: CrudRepository<GEFIDataDomain>;
  dataDomainMember: CrudRepository<GEFIDataDomainMember>;
  dataProduct: CrudRepository<GEFIDataProduct>;
  dataProductVersion: CrudRepository<GEFIDataProductVersion>;
  dataQualityRule: CrudRepository<GEFIDataQualityRule>;
  dataQualityCheck: CrudRepository<GEFIDataQualityCheck>;
  dataLineage: CrudRepository<GEFIDataLineage>;
  dataCatalog: CrudRepository<GEFIDataCatalog>;
  dataCatalogEntry: CrudRepository<GEFIDataCatalogEntry>;
  dataAccessRequest: CrudRepository<GEFIDataAccessRequest>;
  dataPolicy: CrudRepository<GEFIDataPolicy>;
  dataGovernance: CrudRepository<GEFIDataGovernance>;
  dataShare: CrudRepository<GEFIDataShare>;
  dataSubscription: CrudRepository<GEFIDataSubscription>;
  dataEvent: CrudRepository<GEFIDataEvent>;
  dataMetric: CrudRepository<GEFIDataMetric>;
  dataContract: CrudRepository<GEFIDataContract>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI18Repository(supabase: SupabaseClient): GEFI18Repository {
  return {
    dataDomain: createCrudRepository<GEFIDataDomain>(supabase, 'gefi_data_domains'),
    dataDomainMember: createCrudRepository<GEFIDataDomainMember>(supabase, 'gefi_data_domain_members'),
    dataProduct: createCrudRepository<GEFIDataProduct>(supabase, 'gefi_data_products'),
    dataProductVersion: createCrudRepository<GEFIDataProductVersion>(supabase, 'gefi_data_product_versions'),
    dataQualityRule: createCrudRepository<GEFIDataQualityRule>(supabase, 'gefi_data_quality_rules'),
    dataQualityCheck: createCrudRepository<GEFIDataQualityCheck>(supabase, 'gefi_data_quality_checks'),
    dataLineage: createCrudRepository<GEFIDataLineage>(supabase, 'gefi_data_lineage'),
    dataCatalog: createCrudRepository<GEFIDataCatalog>(supabase, 'gefi_data_catalogs'),
    dataCatalogEntry: createCrudRepository<GEFIDataCatalogEntry>(supabase, 'gefi_data_catalog_entries'),
    dataAccessRequest: createCrudRepository<GEFIDataAccessRequest>(supabase, 'gefi_data_access_requests'),
    dataPolicy: createCrudRepository<GEFIDataPolicy>(supabase, 'gefi_data_policies'),
    dataGovernance: createCrudRepository<GEFIDataGovernance>(supabase, 'gefi_data_governance'),
    dataShare: createCrudRepository<GEFIDataShare>(supabase, 'gefi_data_shares'),
    dataSubscription: createCrudRepository<GEFIDataSubscription>(supabase, 'gefi_data_subscriptions'),
    dataEvent: createCrudRepository<GEFIDataEvent>(supabase, 'gefi_data_events'),
    dataMetric: createCrudRepository<GEFIDataMetric>(supabase, 'gefi_data_metrics'),
    dataContract: createCrudRepository<GEFIDataContract>(supabase, 'gefi_data_contracts'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_data_mesh_audit_trails'),
  };
}
