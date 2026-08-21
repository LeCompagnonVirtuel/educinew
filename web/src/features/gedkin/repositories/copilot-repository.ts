import type {
  GedkinCopilotQuery,
  GedkinCopilotResponse,
  GedkinCopilotConversation,
  GedkinCopilotSource,
  GedkinCopilotApproval,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinCopilotQueryRepository extends GedkinCrudRepository<GedkinCopilotQuery & GedkinBaseEntity> {
  findByUserId(userId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCopilotQuery & GedkinBaseEntity>>;
  findByQueryType(queryType: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCopilotQuery & GedkinBaseEntity>>;
}

export interface GedkinCopilotResponseRepository extends GedkinCrudRepository<GedkinCopilotResponse & GedkinBaseEntity> {
  findByQueryId(queryId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCopilotResponse & GedkinBaseEntity>>;
}

export interface GedkinCopilotConversationRepository extends GedkinCrudRepository<GedkinCopilotConversation & GedkinBaseEntity> {
  findByUserId(userId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCopilotConversation & GedkinBaseEntity>>;
}

export interface GedkinCopilotSourceRepository extends GedkinCrudRepository<GedkinCopilotSource & GedkinBaseEntity> {
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCopilotSource & GedkinBaseEntity>>;
}

export interface GedkinCopilotApprovalRepository extends GedkinCrudRepository<GedkinCopilotApproval & GedkinBaseEntity> {
  findByQueryId(queryId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinCopilotApproval & GedkinBaseEntity>>;
}