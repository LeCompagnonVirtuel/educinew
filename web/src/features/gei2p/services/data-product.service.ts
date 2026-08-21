import { SupabaseClient } from '@supabase/supabase-js';
import { DataCatalogService } from './gei2p-datamesh-data-catalog.service';

export interface DataProduct {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityDataProductService {
  private readonly catalogService: DataCatalogService;

  constructor(supabase: SupabaseClient) {
    this.catalogService = new DataCatalogService(supabase);
  }

  async listDataProducts(schoolId: string, filters?: Record<string, unknown>): Promise<DataProduct[]> {
    return this.catalogService.listEntities(schoolId, filters) as Promise<DataProduct[]>;
  }

  async getDataProduct(schoolId: string, id: string): Promise<DataProduct | null> {
    const entity = await this.catalogService.getEntity(id);
    if (entity && (entity as DataProduct).school_id === schoolId) return entity as DataProduct;
    return null;
  }

  async createDataProduct(schoolId: string, userId: string, data: Record<string, unknown>): Promise<DataProduct | null> {
    return this.catalogService.createEntity({ ...data, school_id: schoolId } as Parameters<DataCatalogService['createEntity']>[0]) as Promise<DataProduct | null>;
  }

  async updateDataProduct(schoolId: string, id: string, data: Record<string, unknown>): Promise<DataProduct | null> {
    const entity = await this.catalogService.getEntity(id);
    if (!entity || (entity as DataProduct).school_id !== schoolId) return null;
    return this.catalogService.updateEntity(id, data as Parameters<DataCatalogService['updateEntity']>[1]) as Promise<DataProduct | null>;
  }

  async deleteDataProduct(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.catalogService.getEntity(id);
    if (!entity || (entity as DataProduct).school_id !== schoolId) return false;
    return this.catalogService.deleteEntity(id);
  }
}
