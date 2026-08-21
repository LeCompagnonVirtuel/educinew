import type {
  PaginatedResult,
  PaginationParams,
  FilterParams,
} from '../repositories/base-gecirap-repository';
import type { GecirapServiceConfig } from './base-gecirap-service';
import { BaseGecirapService } from './base-gecirap-service';
import type { CloudProviderRepository } from '../repositories/cloud-infrastructure-repository';
import type { ClusterRepository, WorkloadRepository } from '../repositories/container-orchestration-repository';
import type { NetworkRepository, NetworkHealthRepository } from '../repositories/network-repository';
import type { AIOpsAgentRepository, InfrastructureEventRepository, IncidentCorrelationRepository } from '../repositories/aiops-repository';
import type { DisasterRecoveryPlanRepository } from '../repositories/disaster-recovery-repository';
import type { DriftDetectionRepository } from '../repositories/infrastructure-as-code-repository';
import type { ScalingPolicyRepository } from '../repositories/autoscaling-repository';
import type { CostCenterRepository, BudgetRepository } from '../repositories/finops-repository';
import type { EdgeNodeRepository } from '../repositories/edge-computing-repository';
import type { GeoRegionRepository } from '../repositories/multi-region-repository';

// ============================================================================
// Security Dashboard Service
// ============================================================================

export interface SecurityOverview {
  cloudProviders: number;
  activeClusters: number;
  totalWorkloads: number;
  unhealthyNodes: number;
  unresolvedEvents: number;
  openIncidents: number;
  unresolvedDrifts: number;
  unhealthyNetworks: number;
  activeScalingPolicies: number;
  exceededBudgets: number;
  offlineEdgeNodes: number;
}

export interface HealthStatus {
  component: string;
  status: 'healthy' | 'degraded' | 'critical' | 'unknown';
  lastChecked: string;
  details: Record<string, unknown>;
}

export class SecurityDashboardService extends BaseGecirapService {
  constructor(
    private readonly providerRepo: CloudProviderRepository,
    private readonly clusterRepo: ClusterRepository,
    private readonly workloadRepo: WorkloadRepository,
    private readonly networkRepo: NetworkRepository,
    private readonly networkHealthRepo: NetworkHealthRepository,
    private readonly eventRepo: InfrastructureEventRepository,
    private readonly correlationRepo: IncidentCorrelationRepository,
    private readonly driftRepo: DriftDetectionRepository,
    private readonly scalingPolicyRepo: ScalingPolicyRepository,
    private readonly budgetRepo: BudgetRepository,
    private readonly edgeNodeRepo: EdgeNodeRepository,
    private readonly regionRepo: GeoRegionRepository,
    private readonly drPlanRepo: DisasterRecoveryPlanRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  async getSecurityOverview(schoolId: string): Promise<SecurityOverview> {
    this.validateSchoolId(schoolId);

    const [
      providers,
      clusters,
      workloads,
      events,
      correlations,
      drifts,
      networks,
      scalingPolicies,
      budgets,
      edgeNodes,
    ] = await Promise.all([
      this.providerRepo.findAll(schoolId, { limit: 500 }),
      this.clusterRepo.findAll(schoolId, { limit: 500 }),
      this.workloadRepo.findAll(schoolId, { limit: 500 }),
      this.eventRepo.findUnresolved(schoolId),
      this.correlationRepo.findUnresolved(schoolId),
      this.driftRepo.findUnresolved(schoolId),
      this.networkHealthRepo.findUnhealthy(schoolId),
      this.scalingPolicyRepo.findActive(schoolId),
      this.budgetRepo.findExceeded(schoolId),
      this.edgeNodeRepo.findOffline(schoolId),
    ]);

    return {
      cloudProviders: providers.total,
      activeClusters: clusters.data.filter((c) => c.status === 'active').length,
      totalWorkloads: workloads.total,
      unhealthyNodes: 0,
      unresolvedEvents: events.length,
      openIncidents: correlations.length,
      unresolvedDrifts: drifts.length,
      unhealthyNetworks: networks.length,
      activeScalingPolicies: scalingPolicies.length,
      exceededBudgets: budgets.length,
      offlineEdgeNodes: edgeNodes.length,
    };
  }

  async getHealthStatus(schoolId: string): Promise<HealthStatus[]> {
    this.validateSchoolId(schoolId);

    const now = new Date().toISOString();

    const [
      providers,
      clusters,
      networks,
      events,
      drifts,
      budgets,
    ] = await Promise.all([
      this.providerRepo.findAll(schoolId, { limit: 1 }),
      this.clusterRepo.findAll(schoolId, { limit: 1 }),
      this.networkHealthRepo.findUnhealthy(schoolId),
      this.eventRepo.findUnresolved(schoolId),
      this.driftRepo.findUnresolved(schoolId),
      this.budgetRepo.findExceeded(schoolId),
    ]);

    const statuses: HealthStatus[] = [
      {
        component: 'Cloud Providers',
        status: providers.total > 0 ? 'healthy' : 'unknown',
        lastChecked: now,
        details: { total: providers.total },
      },
      {
        component: 'Clusters',
        status: clusters.total > 0 ? 'healthy' : 'unknown',
        lastChecked: now,
        details: { total: clusters.total },
      },
      {
        component: 'Networks',
        status: networks.length === 0 ? 'healthy' : 'degraded',
        lastChecked: now,
        details: { unhealthyCount: networks.length },
      },
      {
        component: 'Infrastructure Events',
        status: events.length === 0 ? 'healthy' : events.length > 10 ? 'critical' : 'degraded',
        lastChecked: now,
        details: { unresolvedCount: events.length },
      },
      {
        component: 'Infrastructure Drift',
        status: drifts.length === 0 ? 'healthy' : drifts.length > 5 ? 'critical' : 'degraded',
        lastChecked: now,
        details: { unresolvedCount: drifts.length },
      },
      {
        component: 'Budgets',
        status: budgets.length === 0 ? 'healthy' : 'critical',
        lastChecked: now,
        details: { exceededCount: budgets.length },
      },
    ];

    return statuses;
  }

  async getIncidentTimeline(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<Record<string, unknown>>> {
    this.validateSchoolId(schoolId);

    const events = await this.eventRepo.findAll(schoolId, this.validatePagination(params));

    return {
      data: events.data.map((e) => ({
        id: e.id,
        type: e.event_type,
        severity: e.severity,
        source: e.source,
        message: e.message,
        timestamp: e.created_at,
        resolved: e.resolved_at !== null,
      })),
      total: events.total,
      offset: events.offset,
      limit: events.limit,
    };
  }

  async getComplianceStatus(
    schoolId: string,
  ): Promise<{
    rtoCompliant: boolean;
    rpoCompliant: boolean;
    driftFree: boolean;
    budgetCompliant: boolean;
    overallScore: number;
  }> {
    this.validateSchoolId(schoolId);

    const [
      drPlans,
      drifts,
      budgets,
    ] = await Promise.all([
      this.drPlanRepo.findActive(schoolId),
      this.driftRepo.findUnresolved(schoolId),
      this.budgetRepo.findExceeded(schoolId),
    ]);

    const rtoCompliant = drPlans.every((p) => p.rto_hours > 0);
    const rpoCompliant = drPlans.every((p) => p.rpo_hours > 0);
    const driftFree = drifts.length === 0;
    const budgetCompliant = budgets.length === 0;

    const checks = [rtoCompliant, rpoCompliant, driftFree, budgetCompliant];
    const passed = checks.filter(Boolean).length;
    const overallScore = Math.round((passed / checks.length) * 100);

    return {
      rtoCompliant,
      rpoCompliant,
      driftFree,
      budgetCompliant,
      overallScore,
    };
  }
}
