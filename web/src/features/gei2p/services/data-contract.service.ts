import { SupabaseClient } from '@supabase/supabase-js';
import { DataContractService } from './gei2p-datamesh-data-contract.service';

export interface DataContract {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityDataContractService {
  private readonly contractService: DataContractService;

  constructor(supabase: SupabaseClient) {
    this.contractService = new DataContractService(supabase);
  }

  async listDataContracts(schoolId: string, filters?: Record<string, unknown>): Promise<DataContract[]> {
    return this.contractService.listEntities(schoolId, filters) as Promise<DataContract[]>;
  }

  async getDataContract(schoolId: string, id: string): Promise<DataContract | null> {
    const entity = await this.contractService.getEntity(id);
    if (entity && (entity as DataContract).school_id === schoolId) return entity as DataContract;
    return null;
  }

  async createDataContract(schoolId: string, userId: string, data: Record<string, unknown>): Promise<DataContract | null> {
    return this.contractService.createEntity({ ...data, school_id: schoolId } as Parameters<DataContractService['createEntity']>[0]) as Promise<DataContract | null>;
  }

  async updateDataContract(schoolId: string, id: string, data: Record<string, unknown>): Promise<DataContract | null> {
    const entity = await this.contractService.getEntity(id);
    if (!entity || (entity as DataContract).school_id !== schoolId) return null;
    return this.contractService.updateEntity(id, data as Parameters<DataContractService['updateEntity']>[1]) as Promise<DataContract | null>;
  }

  async deleteDataContract(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.contractService.getEntity(id);
    if (!entity || (entity as DataContract).school_id !== schoolId) return false;
    return this.contractService.deleteEntity(id);
  }
}
