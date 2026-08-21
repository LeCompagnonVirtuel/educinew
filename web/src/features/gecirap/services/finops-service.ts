import {
  GecirapBudgetNotFoundError,
  GecirapBudgetExceededError,
  GecirapCostError,
} from '@educi/errors';
import {
  createCostCenterSchema,
  updateCostCenterSchema,
  createBudgetSchema,
  updateBudgetSchema,
  createCostAllocationSchema,
} from '../validators/finops';
import type {
  GecirapCostCenter,
  GecirapBudget,
  GecirapCostAllocation,
  CostCenterRepository,
  BudgetRepository,
  CostAllocationRepository,
} from '../repositories/finops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// FinOps Service
// ============================================================================

export class FinOpsService extends BaseGecirapService {
  constructor(
    private readonly costCenterRepo: CostCenterRepository,
    private readonly budgetRepo: BudgetRepository,
    private readonly allocationRepo: CostAllocationRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Cost Centers ────────────────────────────────────────────────────────

  async listCostCenters(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostCenter>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.costCenterRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCostCenter(schoolId: string, id: string): Promise<GecirapCostCenter> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Centre de coûts');
    return this.ensureExists(this.costCenterRepo, id, schoolId, 'Centre de coûts');
  }

  async createCostCenter(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCostCenter> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'currency'], 'Centre de coûts');

    const validated = this.validateSchema(createCostCenterSchema, data, 'Centre de coûts');

    if (validated.parent_id) {
      await this.ensureExists(this.costCenterRepo, validated.parent_id, schoolId, 'Centre parent');
    }

    return this.costCenterRepo.create(
      {
        name: validated.name,
        description: validated.description,
        parent_id: validated.parent_id,
        budget_limit: validated.budget_limit,
        currency: validated.currency,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCostCenter(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCostCenter> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Centre de coûts');

    const existing = await this.ensureExists(this.costCenterRepo, id, schoolId, 'Centre de coûts');
    this.validateOwnership(existing, schoolId, 'Centre de coûts');

    const validated = this.validateSchema(updateCostCenterSchema, data, 'Centre de coûts');
    return this.costCenterRepo.update(id, schoolId, validated);
  }

  async deleteCostCenter(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Centre de coûts');

    const existing = await this.ensureExists(this.costCenterRepo, id, schoolId, 'Centre de coûts');
    this.validateOwnership(existing, schoolId, 'Centre de coûts');

    const budgets = await this.budgetRepo.findByCostCenterId(id, schoolId, { limit: 1 });
    if (budgets.total > 0) {
      throw new GecirapCostError(
        'Impossible de supprimer un centre avec des budgets associés',
      );
    }

    await this.costCenterRepo.softDelete(id, schoolId);
  }

  async listRoots(schoolId: string): Promise<GecirapCostCenter[]> {
    this.validateSchoolId(schoolId);
    return this.costCenterRepo.findRoots(schoolId);
  }

  async listByParent(
    schoolId: string,
    parentId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCostCenter>> {
    this.validateSchoolId(schoolId);
    this.validateId(parentId, 'Centre parent');
    return this.costCenterRepo.findByParentId(parentId, schoolId, this.validatePagination(params));
  }

  // ─── Budgets ─────────────────────────────────────────────────────────────

  async listBudgets(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapBudget>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.budgetRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getBudget(schoolId: string, id: string): Promise<GecirapBudget> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Budget');
    return this.ensureExists(this.budgetRepo, id, schoolId, 'Budget');
  }

  async createBudget(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapBudget> {
    this.validateSchoolId(schoolId);

    const validated = this.validateSchema(createBudgetSchema, data, 'Budget');

    return this.budgetRepo.create(
      {
        name: validated.name,
        amount: validated.amount,
        currency: validated.period,
        period_type: validated.period,
        spent_amount: validated.spent ?? 0,
        alert_threshold_percent: validated.alertThreshold ?? 80,
        status: validated.status ?? 'ON_TRACK',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateBudget(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapBudget> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Budget');

    const existing = await this.ensureExists(this.budgetRepo, id, schoolId, 'Budget');
    this.validateOwnership(existing, schoolId, 'Budget');

    const validated = this.validateSchema(updateBudgetSchema, data, 'Budget');
    return this.budgetRepo.update(id, schoolId, validated);
  }

  async deleteBudget(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Budget');

    const existing = await this.ensureExists(this.budgetRepo, id, schoolId, 'Budget');
    this.validateOwnership(existing, schoolId, 'Budget');

    await this.budgetRepo.softDelete(id, schoolId);
  }

  async getExceededBudgets(schoolId: string): Promise<GecirapBudget[]> {
    this.validateSchoolId(schoolId);
    return this.budgetRepo.findExceeded(schoolId);
  }

  async getActiveBudgets(schoolId: string): Promise<GecirapBudget[]> {
    this.validateSchoolId(schoolId);
    return this.budgetRepo.findActive(schoolId);
  }

  // ─── Cost Allocations ────────────────────────────────────────────────────

  async listAllocations(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCostAllocation>> {
    this.validateSchoolId(schoolId);
    return this.allocationRepo.findAll(schoolId, this.validatePagination(params));
  }

  async createAllocation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCostAllocation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cost_center_id', 'account_id', 'allocation_percent', 'cost_amount', 'period_start', 'period_end'], 'Allocation coûts');

    const validated = this.validateSchema(createCostAllocationSchema, data, 'Allocation coûts');

    this.validateRange(validated.allocation_percent, 0, 100, 'allocation_percent', 'Allocation coûts');

    return this.allocationRepo.create(
      {
        cost_center_id: validated.cost_center_id,
        account_id: validated.account_id,
        allocation_percent: validated.allocation_percent,
        cost_amount: validated.cost_amount,
        period_start: validated.period_start,
        period_end: validated.period_end,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async listByCostCenter(
    schoolId: string,
    costCenterId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCostAllocation>> {
    this.validateSchoolId(schoolId);
    this.validateId(costCenterId, 'Centre de coûts');
    return this.allocationRepo.findByCostCenterId(costCenterId, schoolId, this.validatePagination(params));
  }

  async listByAccount(
    schoolId: string,
    accountId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCostAllocation>> {
    this.validateSchoolId(schoolId);
    this.validateId(accountId, 'Compte cloud');
    return this.allocationRepo.findByAccountId(accountId, schoolId, this.validatePagination(params));
  }

  async getFinOpsOverview(schoolId: string): Promise<{
    totalCostCenters: number;
    totalBudgets: number;
    activeBudgets: number;
    exceededBudgets: number;
    totalAllocations: number;
    totalSpent: number;
    totalBudgetAmount: number;
  }> {
    this.validateSchoolId(schoolId);

    const centers = await this.costCenterRepo.findAll(schoolId, { limit: 500 });
    const budgets = await this.budgetRepo.findAll(schoolId, { limit: 500 });
    const activeBudgets = await this.budgetRepo.findActive(schoolId);
    const exceeded = await this.budgetRepo.findExceeded(schoolId);
    const allocations = await this.allocationRepo.findAll(schoolId, { limit: 500 });

    let totalSpent = 0;
    let totalBudgetAmount = 0;

    for (const budget of budgets.data) {
      totalSpent += budget.spent_amount;
      totalBudgetAmount += budget.amount;
    }

    return {
      totalCostCenters: centers.total,
      totalBudgets: budgets.total,
      activeBudgets: activeBudgets.length,
      exceededBudgets: exceeded.length,
      totalAllocations: allocations.total,
      totalSpent,
      totalBudgetAmount,
    };
  }
}
