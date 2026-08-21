import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataFabricService } from '../data-fabric-service';

const mockDomainRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockProductRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockContractRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockSourceRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByDomainId: vi.fn(),
};

const mockLineageRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProductId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const DOMAIN_ID = '660e8400-e29b-41d4-a716-446655440001';
const PRODUCT_ID = '770e8400-e29b-41d4-a716-446655440002';
const CONTRACT_ID = '880e8400-e29b-41d4-a716-446655440003';
const SOURCE_ID = '990e8400-e29b-41d4-a716-446655440004';
const LINEAGE_ID = 'aa0e8400-e29b-41d4-a716-446655440005';

const mockDomain = {
  id: DOMAIN_ID,
  school_id: SCHOOL_ID,
  name: 'Student Data',
  description: 'All student-related data',
  owner: 'admin@school.com',
  steward: 'data-steward@school.com',
  status: 'ACTIVE',
  qualityLevel: 'GOOD',
  classification: 'INTERNAL',
  visibility: 'INSTITUTIONAL',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockProduct = {
  id: PRODUCT_ID,
  school_id: SCHOOL_ID,
  domainId: DOMAIN_ID,
  name: 'Student Roster',
  description: 'Student roster dataset',
  type: 'DATASET',
  version: '1.0.0',
  status: 'PUBLISHED',
  schema: { fields: ['id', 'name'] },
  lineage: [],
  contracts: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockContract = {
  id: CONTRACT_ID,
  school_id: SCHOOL_ID,
  productId: PRODUCT_ID,
  name: 'Data Access Contract',
  description: 'Standard data access terms',
  schema: { format: 'json' },
  sla: { availability: 99.9 },
  enforcement: 'STRICT',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockSource = {
  id: SOURCE_ID,
  school_id: SCHOOL_ID,
  domainId: DOMAIN_ID,
  name: 'Student DB',
  type: 'DATABASE',
  connection: { host: 'localhost', port: 5432 },
  schema: { tables: ['students'] },
  refreshInterval: '1h',
  status: 'ACTIVE',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockLineage = {
  id: LINEAGE_ID,
  school_id: SCHOOL_ID,
  sourceId: SOURCE_ID,
  targetId: PRODUCT_ID,
  transformation: 'ETL',
  direction: 'FORWARD',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: DataFabricService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new DataFabricService(
    mockDomainRepo as never,
    mockProductRepo as never,
    mockContractRepo as never,
    mockSourceRepo as never,
    mockLineageRepo as never,
  );
});

describe('DataFabricService', () => {
  describe('listDomains', () => {
    it('should list domains for a school', async () => {
      mockDomainRepo.findAll.mockResolvedValue({ data: [mockDomain], total: 1, offset: 0, limit: 50 });

      const result = await service.listDomains(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listDomains('')).rejects.toThrow();
    });
  });

  describe('getDomain', () => {
    it('should retrieve a domain by id', async () => {
      mockDomainRepo.exists.mockResolvedValue(true);
      mockDomainRepo.findById.mockResolvedValue(mockDomain);

      const result = await service.getDomain(SCHOOL_ID, DOMAIN_ID);

      expect(result).toEqual(mockDomain);
    });

    it('should throw if domain not found', async () => {
      mockDomainRepo.exists.mockResolvedValue(false);

      await expect(service.getDomain(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createDomain', () => {
    it('should create a domain successfully', async () => {
      mockDomainRepo.create.mockResolvedValue(mockDomain);

      const result = await service.createDomain(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Student Data',
        description: 'All student-related data',
        owner: 'admin@school.com',
        steward: 'data-steward@school.com',
        status: 'PUBLISHED',
        qualityLevel: 'GOOD',
        classification: 'INTERNAL',
        visibility: 'INSTITUTIONAL',
      });

      expect(result).toEqual(mockDomain);
    });

    it('should reject empty school_id on create', async () => {
      await expect(service.createDomain('', {
        name: 'Test',
        description: 'Test',
        owner: 'a',
        steward: 'a',
        status: 'ACTIVE',
        qualityLevel: 'GOOD',
        classification: 'INTERNAL',
        visibility: 'INSTITUTIONAL',
      })).rejects.toThrow();
    });
  });

  describe('updateDomain', () => {
    it('should update a domain successfully', async () => {
      mockDomainRepo.exists.mockResolvedValue(true);
      mockDomainRepo.findById.mockResolvedValue(mockDomain);
      mockDomainRepo.update.mockResolvedValue({ ...mockDomain, name: 'Updated Domain' });

      const result = await service.updateDomain(SCHOOL_ID, DOMAIN_ID, {
        name: 'Updated Domain',
      });

      expect(result.name).toBe('Updated Domain');
    });

    it('should throw if domain not found on update', async () => {
      mockDomainRepo.exists.mockResolvedValue(false);

      await expect(service.updateDomain(SCHOOL_ID, 'nonexistent', { name: 'X' })).rejects.toThrow();
    });
  });

  describe('deleteDomain', () => {
    it('should soft delete a domain', async () => {
      mockDomainRepo.exists.mockResolvedValue(true);
      mockDomainRepo.findById.mockResolvedValue(mockDomain);
      mockDomainRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteDomain(SCHOOL_ID, DOMAIN_ID);

      expect(mockDomainRepo.softDelete).toHaveBeenCalledWith(DOMAIN_ID, SCHOOL_ID);
    });
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      mockProductRepo.create.mockResolvedValue(mockProduct);

      const result = await service.createProduct(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        domainId: DOMAIN_ID,
        name: 'Student Roster',
        description: 'Student roster dataset',
        type: 'DATASET',
        version: '1.0.0',
        status: 'PUBLISHED',
        schema: { fields: ['id', 'name'] },
        lineage: [],
        contracts: [],
      });

      expect(result).toEqual(mockProduct);
    });
  });

  describe('listContracts', () => {
    it('should list contracts for a school', async () => {
      mockContractRepo.findAll.mockResolvedValue({ data: [mockContract], total: 1, offset: 0, limit: 50 });

      const result = await service.listContracts(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('createContract', () => {
    it('should create a contract successfully', async () => {
      mockContractRepo.create.mockResolvedValue(mockContract);

      const result = await service.createContract(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        productId: PRODUCT_ID,
        name: 'Data Access Contract',
        description: 'Standard data access terms',
        schema: { format: 'json' },
        sla: { availability: 99.9 },
        enforcement: 'STRICT',
      });

      expect(result).toEqual(mockContract);
    });
  });

  describe('createSource', () => {
    it('should create a source successfully', async () => {
      mockSourceRepo.create.mockResolvedValue(mockSource);

      const result = await service.createSource(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        domainId: DOMAIN_ID,
        name: 'Student DB',
        type: 'DATABASE',
        connection: { host: 'localhost', port: 5432 },
        schema: { tables: ['students'] },
        refreshInterval: '1h',
        status: 'ACTIVE',
      });

      expect(result).toEqual(mockSource);
    });
  });

  describe('listByDomain', () => {
    it('should list sources by domain', async () => {
      mockSourceRepo.findByDomainId.mockResolvedValue({ data: [mockSource], total: 1, offset: 0, limit: 50 });

      const result = await service.listByDomain(SCHOOL_ID, DOMAIN_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createLineage', () => {
    it('should create a lineage successfully', async () => {
      mockLineageRepo.create.mockResolvedValue(mockLineage);

      const result = await service.createLineage(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        sourceId: SOURCE_ID,
        targetId: PRODUCT_ID,
        transformation: 'ETL',
        direction: 'FORWARD',
      });

      expect(result).toEqual(mockLineage);
    });
  });

  describe('getLineageByProduct', () => {
    it('should return lineage by product', async () => {
      mockLineageRepo.findByProductId.mockResolvedValue([mockLineage]);

      const result = await service.getLineageByProduct(SCHOOL_ID, PRODUCT_ID);

      expect(result).toHaveLength(1);
    });
  });
});
