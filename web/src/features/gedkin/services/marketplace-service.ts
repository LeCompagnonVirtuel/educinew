import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createMarketplaceProductSchema,
  updateMarketplaceProductSchema,
  createDataSubscriptionSchema,
  updateDataSubscriptionSchema,
  createDataAccessLogSchema,
  updateDataAccessLogSchema,
  createProductReviewSchema,
  updateProductReviewSchema,
  createProductSLASchema,
  updateProductSLASchema,
} from '../validators/gedkin';
import type {
  GedkinMarketplaceProduct,
  GedkinDataSubscription,
  GedkinDataAccessLog,
  GedkinProductReview,
  GedkinProductSLA,
} from '@educi/types';
import type {
  GedkinMarketplaceProductRepository,
  GedkinDataSubscriptionRepository,
  GedkinDataAccessLogRepository,
  GedkinProductReviewRepository,
  GedkinProductSLARepository,
} from '../repositories/marketplace-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Marketplace Service
// ============================================================================

export class MarketplaceService extends BaseGedkinService {
  constructor(
    private readonly productRepo: GedkinMarketplaceProductRepository,
    private readonly subscriptionRepo: GedkinDataSubscriptionRepository,
    private readonly accessLogRepo: GedkinDataAccessLogRepository,
    private readonly reviewRepo: GedkinProductReviewRepository,
    private readonly slaRepo: GedkinProductSLARepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Products ────────────────────────────────────────────────────────────

  async listProducts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinMarketplaceProduct>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.productRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getProduct(schoolId: string, id: string): Promise<GedkinMarketplaceProduct> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Produit marketplace');
    return this.ensureExists(this.productRepo, id, schoolId, 'Produit marketplace');
  }

  async createProduct(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinMarketplaceProduct> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'type', 'version', 'status', 'license', 'pricing', 'schema', 'documentation', 'rating', 'downloads'], 'Produit marketplace');

    const validated = this.validateSchema(createMarketplaceProductSchema, data, 'Produit marketplace');
    this.validateRange(validated.rating, 0, 5, 'rating', 'Produit marketplace');

    return this.productRepo.create(
      {
        name: validated.name,
        description: validated.description,
        type: validated.type,
        version: validated.version,
        status: validated.status,
        license: validated.license,
        pricing: validated.pricing,
        schema: validated.schema,
        documentation: validated.documentation,
        rating: validated.rating,
        downloads: validated.downloads,
      },
      schoolId,
    );
  }

  async updateProduct(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinMarketplaceProduct> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Produit marketplace');

    const existing = await this.ensureExists(this.productRepo, id, schoolId, 'Produit marketplace');
    this.validateOwnership(existing, schoolId, 'Produit marketplace');

    const validated = this.validateSchema(updateMarketplaceProductSchema, data, 'Produit marketplace');
    return this.productRepo.update(id, schoolId, validated);
  }

  async deleteProduct(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Produit marketplace');

    const existing = await this.ensureExists(this.productRepo, id, schoolId, 'Produit marketplace');
    this.validateOwnership(existing, schoolId, 'Produit marketplace');

    await this.productRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinMarketplaceProduct>> {
    this.validateSchoolId(schoolId);
    return this.productRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinMarketplaceProduct>> {
    this.validateSchoolId(schoolId);
    return this.productRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  // ─── Subscriptions ───────────────────────────────────────────────────────

  async listSubscriptions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataSubscription>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.subscriptionRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSubscription(schoolId: string, id: string): Promise<GedkinDataSubscription> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Abonnement');
    return this.ensureExists(this.subscriptionRepo, id, schoolId, 'Abonnement');
  }

  async createSubscription(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataSubscription> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['productId', 'userId', 'status', 'startDate', 'endDate', 'usage'], 'Abonnement');

    const validated = this.validateSchema(createDataSubscriptionSchema, data, 'Abonnement');

    return this.subscriptionRepo.create(
      {
        productId: validated.productId,
        userId: validated.userId,
        status: validated.status,
        startDate: validated.startDate,
        endDate: validated.endDate,
        usage: validated.usage,
      },
      schoolId,
    );
  }

  async updateSubscription(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataSubscription> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Abonnement');

    const existing = await this.ensureExists(this.subscriptionRepo, id, schoolId, 'Abonnement');
    this.validateOwnership(existing, schoolId, 'Abonnement');

    const validated = this.validateSchema(updateDataSubscriptionSchema, data, 'Abonnement');
    return this.subscriptionRepo.update(id, schoolId, validated);
  }

  async deleteSubscription(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Abonnement');

    const existing = await this.ensureExists(this.subscriptionRepo, id, schoolId, 'Abonnement');
    this.validateOwnership(existing, schoolId, 'Abonnement');

    await this.subscriptionRepo.softDelete(id, schoolId);
  }

  async listByProduct(
    schoolId: string,
    productId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataSubscription>> {
    this.validateSchoolId(schoolId);
    return this.subscriptionRepo.findByProductId(productId, schoolId, this.validatePagination(params));
  }

  async listByUser(
    schoolId: string,
    userId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataSubscription>> {
    this.validateSchoolId(schoolId);
    return this.subscriptionRepo.findByUserId(userId, schoolId, this.validatePagination(params));
  }

  // ─── Access Logs ─────────────────────────────────────────────────────────

  async listAccessLogs(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataAccessLog>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.accessLogRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async createAccessLog(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataAccessLog> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['productId', 'userId', 'action', 'details'], 'Journal d\'accès');

    const validated = this.validateSchema(createDataAccessLogSchema, data, 'Journal d\'accès');

    return this.accessLogRepo.create(
      {
        productId: validated.productId,
        userId: validated.userId,
        action: validated.action,
        details: validated.details,
        timestamp: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async listByProductForAccessLogs(
    schoolId: string,
    productId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataAccessLog>> {
    this.validateSchoolId(schoolId);
    return this.accessLogRepo.findByProductId(productId, schoolId, this.validatePagination(params));
  }

  // ─── Reviews ─────────────────────────────────────────────────────────────

  async listReviews(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinProductReview>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.reviewRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getReview(schoolId: string, id: string): Promise<GedkinProductReview> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Avis');
    return this.ensureExists(this.reviewRepo, id, schoolId, 'Avis');
  }

  async createReview(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinProductReview> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['productId', 'userId', 'rating', 'comment'], 'Avis');

    const validated = this.validateSchema(createProductReviewSchema, data, 'Avis');
    this.validateRange(validated.rating, 1, 5, 'rating', 'Avis');

    return this.reviewRepo.create(
      {
        productId: validated.productId,
        userId: validated.userId,
        rating: validated.rating,
        comment: validated.comment,
      },
      schoolId,
    );
  }

  async updateReview(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinProductReview> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Avis');

    const existing = await this.ensureExists(this.reviewRepo, id, schoolId, 'Avis');
    this.validateOwnership(existing, schoolId, 'Avis');

    const validated = this.validateSchema(updateProductReviewSchema, data, 'Avis');
    return this.reviewRepo.update(id, schoolId, validated);
  }

  async deleteReview(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Avis');

    const existing = await this.ensureExists(this.reviewRepo, id, schoolId, 'Avis');
    this.validateOwnership(existing, schoolId, 'Avis');

    await this.reviewRepo.softDelete(id, schoolId);
  }

  async listByProductForReviews(
    schoolId: string,
    productId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinProductReview>> {
    this.validateSchoolId(schoolId);
    return this.reviewRepo.findByProductId(productId, schoolId, this.validatePagination(params));
  }

  // ─── SLA ─────────────────────────────────────────────────────────────────

  async listSLAs(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinProductSLA>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.slaRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSLA(schoolId: string, id: string): Promise<GedkinProductSLA> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'SLA');
    return this.ensureExists(this.slaRepo, id, schoolId, 'SLA');
  }

  async createSLA(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinProductSLA> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['productId', 'availability', 'latency', 'freshness', 'uptime'], 'SLA');

    const validated = this.validateSchema(createProductSLASchema, data, 'SLA');
    this.validateRange(validated.availability, 0, 100, 'availability', 'SLA');
    this.validateRange(validated.uptime, 0, 100, 'uptime', 'SLA');

    return this.slaRepo.create(
      {
        productId: validated.productId,
        availability: validated.availability,
        latency: validated.latency,
        freshness: validated.freshness,
        uptime: validated.uptime,
      },
      schoolId,
    );
  }

  async updateSLA(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinProductSLA> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'SLA');

    const existing = await this.ensureExists(this.slaRepo, id, schoolId, 'SLA');
    this.validateOwnership(existing, schoolId, 'SLA');

    const validated = this.validateSchema(updateProductSLASchema, data, 'SLA');
    return this.slaRepo.update(id, schoolId, validated);
  }

  async deleteSLA(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'SLA');

    const existing = await this.ensureExists(this.slaRepo, id, schoolId, 'SLA');
    this.validateOwnership(existing, schoolId, 'SLA');

    await this.slaRepo.softDelete(id, schoolId);
  }

  async listByProductForSLA(
    schoolId: string,
    productId: string,
  ): Promise<GedkinProductSLA | null> {
    this.validateSchoolId(schoolId);
    return this.slaRepo.findByProductId(productId, schoolId);
  }

  async getMarketplaceStats(
    schoolId: string,
  ): Promise<{
    totalProducts: number;
    totalSubscriptions: number;
    totalReviews: number;
    averageRating: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const products = await this.productRepo.findAll(schoolId, { limit: 1000 });
    const subscriptions = await this.subscriptionRepo.findAll(schoolId, { limit: 1000 });
    const reviews = await this.reviewRepo.findAll(schoolId, { limit: 1000 });

    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalRating = 0;

    for (const product of products.data) {
      byType[product.type] = (byType[product.type] ?? 0) + 1;
      byStatus[product.status] = (byStatus[product.status] ?? 0) + 1;
    }

    for (const review of reviews.data) {
      totalRating += review.rating;
    }

    return {
      totalProducts: products.total,
      totalSubscriptions: subscriptions.total,
      totalReviews: reviews.total,
      averageRating: reviews.total > 0 ? totalRating / reviews.total : 0,
      byType,
      byStatus,
    };
  }
}