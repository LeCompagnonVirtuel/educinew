import type {
  GedkinMarketplaceProduct,
  GedkinDataSubscription,
  GedkinDataAccessLog,
  GedkinProductReview,
  GedkinProductSLA,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinMarketplaceProductRepository extends GedkinCrudRepository<GedkinMarketplaceProduct & GedkinBaseEntity> {
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinMarketplaceProduct & GedkinBaseEntity>>;
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinMarketplaceProduct & GedkinBaseEntity>>;
}

export interface GedkinDataSubscriptionRepository extends GedkinCrudRepository<GedkinDataSubscription & GedkinBaseEntity> {
  findByProductId(productId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataSubscription & GedkinBaseEntity>>;
  findByUserId(userId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataSubscription & GedkinBaseEntity>>;
}

export interface GedkinDataAccessLogRepository extends GedkinCrudRepository<GedkinDataAccessLog & GedkinBaseEntity> {
  findByProductId(productId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataAccessLog & GedkinBaseEntity>>;
}

export interface GedkinProductReviewRepository extends GedkinCrudRepository<GedkinProductReview & GedkinBaseEntity> {
  findByProductId(productId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinProductReview & GedkinBaseEntity>>;
}

export interface GedkinProductSLARepository extends GedkinCrudRepository<GedkinProductSLA & GedkinBaseEntity> {
  findByProductId(productId: string, schoolId: string): Promise<(GedkinProductSLA & GedkinBaseEntity) | null>;
}