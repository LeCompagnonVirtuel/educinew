import type {
  GedkinDataQuality_,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinDataQualityRepository extends GedkinCrudRepository<GedkinDataQuality_ & GedkinBaseEntity> {
  findByDomainId(domainId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataQuality_ & GedkinBaseEntity>>;
  findByProductId(productId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataQuality_ & GedkinBaseEntity>>;
}