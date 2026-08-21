import {
  ValidationError,
  NotFoundError,
  PermissionError,
} from '@educi/errors';
import {
  createDataDomainSchema,
  updateDataDomainSchema,
  createDataProductSchema,
  updateDataProductSchema,
  createDataContractSchema,
  updateDataContractSchema,
  createDataSourceSchema,
  updateDataSourceSchema,
} from '../validators/gedkin';
import type {
  GedkinDataDomain,
  GedkinDataProduct,
  GedkinDataContract,
  GedkinDataSource,
  GedkinDataLineage,
} from '@educi/types';
import type {
  GedkinDataDomainRepository,
  GedkinDataProductRepository,
  GedkinDataContractRepository,
  GedkinDataSourceRepository,
  GedkinDataLineageRepository,
} from '../repositories/data-fabric-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Data Fabric Service
// ============================================================================

export class DataFabricService extends BaseGedkinService {
  constructor(
    private readonly domainRepo: GedkinDataDomainRepository,
    private readonly productRepo: GedkinDataProductRepository,
    private readonly contractRepo: GedkinDataContractRepository,
    private readonly sourceRepo: GedkinDataSourceRepository,
    private readonly lineageRepo: GedkinDataLineageRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Domains ─────────────────────────────────────────────────────────────

  async listDomains(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataDomain>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.domainRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getDomain(schoolId: string, id: string): Promise<GedkinDataDomain> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Domaine de données');
    return this.ensureExists(this.domainRepo, id, schoolId, 'Domaine de données');
  }

  async createDomain(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataDomain> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'owner', 'steward', 'status', 'qualityLevel', 'classification', 'visibility'], 'Domaine de données');

    const validated = this.validateSchema(createDataDomainSchema, data, 'Domaine de données');

    return this.domainRepo.create(
      {
        name: validated.name,
        description: validated.description,
        owner: validated.owner,
        steward: validated.steward,
        status: validated.status,
        qualityLevel: validated.qualityLevel,
        classification: validated.classification,
        visibility: validated.visibility,
      },
      schoolId,
    );
  }

  async updateDomain(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataDomain> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Domaine de données');

    const existing = await this.ensureExists(this.domainRepo, id, schoolId, 'Domaine de données');
    this.validateOwnership(existing, schoolId, 'Domaine de données');

    const validated = this.validateSchema(updateDataDomainSchema, data, 'Domaine de données');
    return this.domainRepo.update(id, schoolId, validated);
  }

  async deleteDomain(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Domaine de données');

    const existing = await this.ensureExists(this.domainRepo, id, schoolId, 'Domaine de données');
    this.validateOwnership(existing, schoolId, 'Domaine de données');

    await this.domainRepo.softDelete(id, schoolId);
  }

  // ─── Products ────────────────────────────────────────────────────────────

  async listProducts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataProduct>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.productRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getProduct(schoolId: string, id: string): Promise<GedkinDataProduct> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Produit de données');
    return this.ensureExists(this.productRepo, id, schoolId, 'Produit de données');
  }

  async createProduct(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataProduct> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['domainId', 'name', 'description', 'type', 'version', 'status', 'schema', 'lineage', 'contracts'], 'Produit de données');

    const validated = this.validateSchema(createDataProductSchema, data, 'Produit de données');

    return this.productRepo.create(
      {
        domainId: validated.domainId,
        name: validated.name,
        description: validated.description,
        type: validated.type,
        version: validated.version,
        status: validated.status,
        schema: validated.schema,
        lineage: validated.lineage,
        contracts: validated.contracts,
      },
      schoolId,
    );
  }

  async updateProduct(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataProduct> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Produit de données');

    const existing = await this.ensureExists(this.productRepo, id, schoolId, 'Produit de données');
    this.validateOwnership(existing, schoolId, 'Produit de données');

    const validated = this.validateSchema(updateDataProductSchema, data, 'Produit de données');
    return this.productRepo.update(id, schoolId, validated);
  }

  async deleteProduct(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Produit de données');

    const existing = await this.ensureExists(this.productRepo, id, schoolId, 'Produit de données');
    this.validateOwnership(existing, schoolId, 'Produit de données');

    await this.productRepo.softDelete(id, schoolId);
  }

  // ─── Contracts ───────────────────────────────────────────────────────────

  async listContracts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataContract>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.contractRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getContract(schoolId: string, id: string): Promise<GedkinDataContract> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contrat de données');
    return this.ensureExists(this.contractRepo, id, schoolId, 'Contrat de données');
  }

  async createContract(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataContract> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['productId', 'name', 'description', 'schema', 'sla', 'enforcement'], 'Contrat de données');

    const validated = this.validateSchema(createDataContractSchema, data, 'Contrat de données');

    return this.contractRepo.create(
      {
        productId: validated.productId,
        name: validated.name,
        description: validated.description,
        schema: validated.schema,
        sla: validated.sla,
        enforcement: validated.enforcement,
      },
      schoolId,
    );
  }

  async updateContract(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataContract> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contrat de données');

    const existing = await this.ensureExists(this.contractRepo, id, schoolId, 'Contrat de données');
    this.validateOwnership(existing, schoolId, 'Contrat de données');

    const validated = this.validateSchema(updateDataContractSchema, data, 'Contrat de données');
    return this.contractRepo.update(id, schoolId, validated);
  }

  async deleteContract(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Contrat de données');

    const existing = await this.ensureExists(this.contractRepo, id, schoolId, 'Contrat de données');
    this.validateOwnership(existing, schoolId, 'Contrat de données');

    await this.contractRepo.softDelete(id, schoolId);
  }

  // ─── Sources ─────────────────────────────────────────────────────────────

  async listSources(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataSource>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.sourceRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSource(schoolId: string, id: string): Promise<GedkinDataSource> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Source de données');
    return this.ensureExists(this.sourceRepo, id, schoolId, 'Source de données');
  }

  async createSource(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataSource> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['domainId', 'name', 'type', 'connection', 'schema', 'refreshInterval', 'status'], 'Source de données');

    const validated = this.validateSchema(createDataSourceSchema, data, 'Source de données');

    return this.sourceRepo.create(
      {
        domainId: validated.domainId,
        name: validated.name,
        type: validated.type,
        connection: validated.connection,
        schema: validated.schema,
        refreshInterval: validated.refreshInterval,
        status: validated.status,
      },
      schoolId,
    );
  }

  async updateSource(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataSource> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Source de données');

    const existing = await this.ensureExists(this.sourceRepo, id, schoolId, 'Source de données');
    this.validateOwnership(existing, schoolId, 'Source de données');

    const validated = this.validateSchema(updateDataSourceSchema, data, 'Source de données');
    return this.sourceRepo.update(id, schoolId, validated);
  }

  async deleteSource(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Source de données');

    const existing = await this.ensureExists(this.sourceRepo, id, schoolId, 'Source de données');
    this.validateOwnership(existing, schoolId, 'Source de données');

    await this.sourceRepo.softDelete(id, schoolId);
  }

  async listByDomain(
    schoolId: string,
    domainId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataSource>> {
    this.validateSchoolId(schoolId);
    return this.sourceRepo.findByDomainId(domainId, schoolId, this.validatePagination(params));
  }

  // ─── Lineage ─────────────────────────────────────────────────────────────

  async listLineages(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataLineage>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.lineageRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getLineage(schoolId: string, id: string): Promise<GedkinDataLineage> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Lignage de données');
    return this.ensureExists(this.lineageRepo, id, schoolId, 'Lignage de données');
  }

  async createLineage(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataLineage> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['sourceId', 'targetId', 'transformation', 'direction'], 'Lignage de données');

    return this.lineageRepo.create(
      {
        sourceId: data.sourceId as string,
        targetId: data.targetId as string,
        transformation: data.transformation as string,
        direction: data.direction as string,
      },
      schoolId,
    );
  }

  async deleteLineage(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Lignage de données');

    const existing = await this.ensureExists(this.lineageRepo, id, schoolId, 'Lignage de données');
    this.validateOwnership(existing, schoolId, 'Lignage de données');

    await this.lineageRepo.softDelete(id, schoolId);
  }

  async getLineageByProduct(
    schoolId: string,
    productId: string,
  ): Promise<GedkinDataLineage[]> {
    this.validateSchoolId(schoolId);
    return this.lineageRepo.findByProductId(productId, schoolId);
  }
}