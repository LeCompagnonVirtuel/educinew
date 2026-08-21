import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-11: Data Mesh — Decentralized Data Domain Management
// ~28 entities × 5 CRUD methods = ~140 methods
// ============================================================================

export interface GEI2PDataDomain extends BaseEntity { name: string; description: string; owner_did: string; domain_type: 'academic'|'financial'| 'student'| 'teacher'| 'admin'|'research'|'operational'; data_products: string[]; status: 'active'| 'inactive'|'migrating'; created_at_domain: string; }
export interface GEI2PDataProduct extends BaseEntity { domain_id: string; name: string; description: string; product_type: 'dataset'| 'api'| 'event_stream'| 'report'| 'model'| 'dashboard'; schema: Record<string,unknown>; format: 'json'|'parquet'|'csv'|'avro'|'protobuf'; owner_did: string; version: string; quality_score: number; status: 'draft'|'active'|'deprecated'|'archived'; }
export interface GEI2PDataProductVersion extends BaseEntity { product_id: string; version: string; schema: Record<string,unknown>; changelog: string; file_url?: string; checksum: string; released_at: string; status: 'draft'|'released'|'deprecated'; }
export interface GEI2PDataProductAccess extends BaseEntity { product_id: string; consumer_did: string; access_type: 'read'|'write'|'admin'; granted_by: string; granted_at: string; expires_at?: string; status: 'active'|'revoked'|'expired'; }
export interface GEI2PDataProductQuality extends BaseEntity { product_id: string; check_type: 'completeness'|'accuracy'|'consistency'|'timeliness'|'validity'|'freshness'; score: number; total_records: number; passed_records: number; failed_records: number; details: Record<string,unknown>; checked_at: string; }
export interface GEI2PDataProductSLA extends BaseEntity { product_id: string; sla_type: 'availability'|'freshness'|'accuracy'| 'latency'; target_value: number; actual_value: number; unit: string; period: string; met: boolean; calculated_at: string; }
export interface GEI2PDataProductLineage extends BaseEntity { source_product_id: string; target_product_id: string; transformation: string; pipeline_id?: string; frequency: string; last_run_at?: string; status: 'active'|'paused'|'error'; }
export interface GEI2PDataProductCatalog extends BaseEntity { name: string; description: string; domain_ids: string[]; product_count: number; last_synced_at?: string; search_index_version: string; }
export interface GEI2PDataProductSearchIndex extends BaseEntity { catalog_id: string; product_id: string; search_text: string; tags: string[]; metadata: Record<string,unknown>; indexed_at: string; }
export interface GEI2PDataProductContract extends BaseEntity { product_id: string; contract_type: 'schema'|'sla'| 'access'| 'usage'; terms: Record<string,unknown>; version: string; effective_date: string; expiration_date?: string; status: 'active'|'expired'|'terminated'; }
export interface GEI2PDataProductMonitoring extends BaseEntity { product_id: string; monitor_type: 'availability'|'freshness'| 'quality'|'usage'| 'cost'; config: Record<string,unknown>; status: 'healthy'|'degraded'|'down'|'unknown'; last_checked_at: string; }
export interface GEI2PDataProductAlert extends BaseEntity { product_id: string; alert_type: 'freshness_violation'|'quality_degradation'| 'sla_breach'| 'access_anomaly'|'cost_spike'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; }
export interface GEI2PDataProductUsage extends BaseEntity { product_id: string; consumer_did: string; query_count: number; records_read: number; records_written: number; bytes_transferred: number; period: string; recorded_at: string; }
export interface GEI2PDataProductCost extends BaseEntity { product_id: string; cost_type: 'storage'|'compute'|'transfer'|'query'|'total'; amount: number; currency: string; period: string; calculated_at: string; }
export interface GEI2PDataProductTag extends BaseEntity { product_id: string; tag: string; added_by: string; added_at: string; }
export interface GEI2PDataProductRating extends BaseEntity { product_id: string; rater_did: string; rating: number; review?: string; rated_at: string; }
export interface GEI2PDataPipeline extends BaseEntity { name: string; description: string; source_product_id: string; target_product_id: string; transform_config: Record<string,unknown>; schedule?: string; status: 'draft'|'active'|'paused'|'error'; last_run_at?: string; next_run_at?: string; }
export interface GEI2PDataPipelineRun extends BaseEntity { pipeline_id: string; status: 'pending'|'running'|'completed'|'failed'|'cancelled'; records_processed: number; records_created: number; records_updated: number; records_failed: number; started_at: string; completed_at?: string; error_log?: string; }
export interface GEI2PDataDomainPolicy extends BaseEntity { domain_id: string; policy_type: 'access'|'quality'| 'security'| 'retention'| 'sharing'; policy_config: Record<string,unknown>; enabled: boolean; }
export interface GEI2PDataDomainGovernance extends BaseEntity { domain_id: string; governance_type: 'data_steward'| 'quality_review'| 'access_approval'| 'schema_change'; assigned_to: string; status: 'active'|'completed'|'pending'; }
export interface GEI2PDataProductSchema extends BaseEntity { product_id: string; schema_name: string; version: string; fields: Record<string,unknown>[]; compatibility: 'backward'|'forward'|'full'|'none'; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PDataProductSchemaEvolution extends BaseEntity { schema_id: string; change_type: 'add_field'|'remove_field'|'modify_field'|'rename_field'; field_name: string; old_definition?: Record<string,unknown>; new_definition?: Record<string,unknown>; compatibility: 'compatible'|'breaking'|'conditional'; approved_by?: string; approved_at?: string; }
export interface GEI2PDataMeshMetric extends BaseEntity { metric_name: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface GEI2PDataMeshCompliance extends BaseEntity { product_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PDataMeshAuditLog extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PDataMeshNotification extends BaseEntity { recipient_did: string; type: 'product_update'|'quality_alert'| 'sla_breach'| 'access_change'| 'schema_change'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PDataMeshBackup extends BaseEntity { product_id: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; record_count: number; created_at_backup: string; expires_at: string; }
export interface GEI2PDataMeshInteroperability extends BaseEntity { source_product_id: string; target_product_id: string; interop_type: 'federation'| 'virtualization'| 'materialization'; config: Record<string,unknown>; status: 'active'|'inactive'|'error'; last_synced_at?: string; }
export interface GEI2PDataMeshDiscovery extends BaseEntity { query: string; filters: Record<string,unknown>; results_count: number; user_did: string; searched_at: string; clicked_product_id?: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P11_TABLE_NAMES: Record<string, string> = {
  GEI2PDataDomain: 'gei2p_data_domains',
  GEI2PDataProduct: 'gei2p_data_products',
  GEI2PDataProductVersion: 'gei2p_data_product_versions',
  GEI2PDataProductAccess: 'gei2p_data_product_accesses',
  GEI2PDataProductQuality: 'gei2p_data_product_qualities',
  GEI2PDataProductSLA: 'gei2p_data_product_slas',
  GEI2PDataProductLineage: 'gei2p_data_product_lineages',
  GEI2PDataProductCatalog: 'gei2p_data_product_catalogs',
  GEI2PDataProductSearchIndex: 'gei2p_data_product_search_indices',
  GEI2PDataProductContract: 'gei2p_data_product_contracts',
  GEI2PDataProductMonitoring: 'gei2p_data_product_monitorings',
  GEI2PDataProductAlert: 'gei2p_data_product_alerts',
  GEI2PDataProductUsage: 'gei2p_data_product_usages',
  GEI2PDataProductCost: 'gei2p_data_product_costs',
  GEI2PDataProductTag: 'gei2p_data_product_tags',
  GEI2PDataProductRating: 'gei2p_data_product_ratings',
  GEI2PDataPipeline: 'gei2p_data_pipelines',
  GEI2PDataPipelineRun: 'gei2p_data_pipeline_runs',
  GEI2PDataDomainPolicy: 'gei2p_data_domain_policies',
  GEI2PDataDomainGovernance: 'gei2p_data_domain_governances',
  GEI2PDataProductSchema: 'gei2p_data_product_schemas',
  GEI2PDataProductSchemaEvolution: 'gei2p_data_product_schema_evolutions',
  GEI2PDataMeshMetric: 'gei2p_data_mesh_metrics',
  GEI2PDataMeshCompliance: 'gei2p_data_mesh_compliances',
  GEI2PDataMeshAuditLog: 'gei2p_data_mesh_audit_logs',
  GEI2PDataMeshNotification: 'gei2p_data_mesh_notifications',
  GEI2PDataMeshBackup: 'gei2p_data_mesh_backups',
  GEI2PDataMeshInteroperability: 'gei2p_data_mesh_interoperabilities',
  GEI2PDataMeshDiscovery: 'gei2p_data_mesh_discoveries',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P11Repository {
  domains: CrudRepository<GEI2PDataDomain>;
  products: CrudRepository<GEI2PDataProduct>;
  productVersions: CrudRepository<GEI2PDataProductVersion>;
  productAccesses: CrudRepository<GEI2PDataProductAccess>;
  productQualities: CrudRepository<GEI2PDataProductQuality>;
  productSLAs: CrudRepository<GEI2PDataProductSLA>;
  productLineages: CrudRepository<GEI2PDataProductLineage>;
  productCatalogs: CrudRepository<GEI2PDataProductCatalog>;
  productSearchIndices: CrudRepository<GEI2PDataProductSearchIndex>;
  productContracts: CrudRepository<GEI2PDataProductContract>;
  productMonitorings: CrudRepository<GEI2PDataProductMonitoring>;
  productAlerts: CrudRepository<GEI2PDataProductAlert>;
  productUsages: CrudRepository<GEI2PDataProductUsage>;
  productCosts: CrudRepository<GEI2PDataProductCost>;
  productTags: CrudRepository<GEI2PDataProductTag>;
  productRatings: CrudRepository<GEI2PDataProductRating>;
  pipelines: CrudRepository<GEI2PDataPipeline>;
  pipelineRuns: CrudRepository<GEI2PDataPipelineRun>;
  domainPolicies: CrudRepository<GEI2PDataDomainPolicy>;
  domainGovernances: CrudRepository<GEI2PDataDomainGovernance>;
  productSchemas: CrudRepository<GEI2PDataProductSchema>;
  productSchemaEvolutions: CrudRepository<GEI2PDataProductSchemaEvolution>;
  metrics: CrudRepository<GEI2PDataMeshMetric>;
  compliances: CrudRepository<GEI2PDataMeshCompliance>;
  auditLogs: CrudRepository<GEI2PDataMeshAuditLog>;
  notifications: CrudRepository<GEI2PDataMeshNotification>;
  backups: CrudRepository<GEI2PDataMeshBackup>;
  interoperabilities: CrudRepository<GEI2PDataMeshInteroperability>;
  discoveries: CrudRepository<GEI2PDataMeshDiscovery>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P11Repository(supabase: SupabaseClient): GEI2P11Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    domains: crud<GEI2PDataDomain>(GEI2P11_TABLE_NAMES.GEI2PDataDomain),
    products: crud<GEI2PDataProduct>(GEI2P11_TABLE_NAMES.GEI2PDataProduct),
    productVersions: crud<GEI2PDataProductVersion>(GEI2P11_TABLE_NAMES.GEI2PDataProductVersion),
    productAccesses: crud<GEI2PDataProductAccess>(GEI2P11_TABLE_NAMES.GEI2PDataProductAccess),
    productQualities: crud<GEI2PDataProductQuality>(GEI2P11_TABLE_NAMES.GEI2PDataProductQuality),
    productSLAs: crud<GEI2PDataProductSLA>(GEI2P11_TABLE_NAMES.GEI2PDataProductSLA),
    productLineages: crud<GEI2PDataProductLineage>(GEI2P11_TABLE_NAMES.GEI2PDataProductLineage),
    productCatalogs: crud<GEI2PDataProductCatalog>(GEI2P11_TABLE_NAMES.GEI2PDataProductCatalog),
    productSearchIndices: crud<GEI2PDataProductSearchIndex>(GEI2P11_TABLE_NAMES.GEI2PDataProductSearchIndex),
    productContracts: crud<GEI2PDataProductContract>(GEI2P11_TABLE_NAMES.GEI2PDataProductContract),
    productMonitorings: crud<GEI2PDataProductMonitoring>(GEI2P11_TABLE_NAMES.GEI2PDataProductMonitoring),
    productAlerts: crud<GEI2PDataProductAlert>(GEI2P11_TABLE_NAMES.GEI2PDataProductAlert),
    productUsages: crud<GEI2PDataProductUsage>(GEI2P11_TABLE_NAMES.GEI2PDataProductUsage),
    productCosts: crud<GEI2PDataProductCost>(GEI2P11_TABLE_NAMES.GEI2PDataProductCost),
    productTags: crud<GEI2PDataProductTag>(GEI2P11_TABLE_NAMES.GEI2PDataProductTag),
    productRatings: crud<GEI2PDataProductRating>(GEI2P11_TABLE_NAMES.GEI2PDataProductRating),
    pipelines: crud<GEI2PDataPipeline>(GEI2P11_TABLE_NAMES.GEI2PDataPipeline),
    pipelineRuns: crud<GEI2PDataPipelineRun>(GEI2P11_TABLE_NAMES.GEI2PDataPipelineRun),
    domainPolicies: crud<GEI2PDataDomainPolicy>(GEI2P11_TABLE_NAMES.GEI2PDataDomainPolicy),
    domainGovernances: crud<GEI2PDataDomainGovernance>(GEI2P11_TABLE_NAMES.GEI2PDataDomainGovernance),
    productSchemas: crud<GEI2PDataProductSchema>(GEI2P11_TABLE_NAMES.GEI2PDataProductSchema),
    productSchemaEvolutions: crud<GEI2PDataProductSchemaEvolution>(GEI2P11_TABLE_NAMES.GEI2PDataProductSchemaEvolution),
    metrics: crud<GEI2PDataMeshMetric>(GEI2P11_TABLE_NAMES.GEI2PDataMeshMetric),
    compliances: crud<GEI2PDataMeshCompliance>(GEI2P11_TABLE_NAMES.GEI2PDataMeshCompliance),
    auditLogs: crud<GEI2PDataMeshAuditLog>(GEI2P11_TABLE_NAMES.GEI2PDataMeshAuditLog),
    notifications: crud<GEI2PDataMeshNotification>(GEI2P11_TABLE_NAMES.GEI2PDataMeshNotification),
    backups: crud<GEI2PDataMeshBackup>(GEI2P11_TABLE_NAMES.GEI2PDataMeshBackup),
    interoperabilities: crud<GEI2PDataMeshInteroperability>(GEI2P11_TABLE_NAMES.GEI2PDataMeshInteroperability),
    discoveries: crud<GEI2PDataMeshDiscovery>(GEI2P11_TABLE_NAMES.GEI2PDataMeshDiscovery),
  };
}
