import type {
  GedkinDataDomain,
  GedkinDataProduct,
  GedkinDataContract,
  GedkinDataSource,
  GedkinDataLineage,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

// ============================================================================
// Data Fabric Repository Interfaces
// ============================================================================

export interface GedkinDataDomainRepository extends GedkinCrudRepository<GedkinDataDomain & GedkinBaseEntity> {
  // Custom queries can be added here
}

export interface GedkinDataProductRepository extends GedkinCrudRepository<GedkinDataProduct & GedkinBaseEntity> {
  // Custom queries can be added here
}

export interface GedkinDataContractRepository extends GedkinCrudRepository<GedkinDataContract & GedkinBaseEntity> {
  // Custom queries can be added here
}

export interface GedkinDataSourceRepository extends GedkinCrudRepository<GedkinDataSource & GedkinBaseEntity> {
  findByDomainId(domainId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinDataSource & GedkinBaseEntity>>;
}

export interface GedkinDataLineageRepository extends GedkinCrudRepository<GedkinDataLineage & GedkinBaseEntity> {
  findByProductId(productId: string, schoolId: string): Promise<(GedkinDataLineage & GedkinBaseEntity)[]>;
}