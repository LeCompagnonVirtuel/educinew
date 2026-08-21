import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProvisioningService } from '../provisioning-service';
import { GecirapTemplateNotFoundError, GecirapNotFoundError } from '@educi/errors';

const mockTemplateRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByName: vi.fn(),
};

const mockStackRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByTemplateId: vi.fn(),
  findActive: vi.fn(),
};

const mockJobRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findRunning: vi.fn(),
  findFailed: vi.fn(),
  findByStackId: vi.fn(),
};

const mockChangeRepo = {
  findAll: vi.fn(),
  create: vi.fn(),
  findByStackId: vi.fn(),
};

const mockPolicyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const TEMPLATE_ID = '660e8400-e29b-41d4-a716-446655440001';
const STACK_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockTemplate = {
  id: TEMPLATE_ID,
  school_id: SCHOOL_ID,
  name: 'vpc-template',
  template_type: 'TERRAFORM',
  provider: 'TERRAFORM',
  content: '{}',
  version: '1.0.0',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockStack = {
  id: STACK_ID,
  school_id: SCHOOL_ID,
  template_id: TEMPLATE_ID,
  name: 'prod-vpc',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockJob = {
  id: 'job-001',
  school_id: SCHOOL_ID,
  stack_id: STACK_ID,
  job_type: 'apply',
  status: 'completed',
  started_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockPolicy = {
  id: 'ipol-001',
  school_id: SCHOOL_ID,
  name: 'no-public-s3',
  policy_type: 'SECURITY',
  rules: [{ check: 'no_public_s3' }],
  enforcement_level: 'mandatory',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: ProvisioningService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ProvisioningService(
    mockTemplateRepo as never,
    mockStackRepo as never,
    mockJobRepo as never,
    mockChangeRepo as never,
    mockPolicyRepo as never,
  );
});

describe('ProvisioningService', () => {
  describe('listTemplates', () => {
    it('should list templates for a school', async () => {
      mockTemplateRepo.findAll.mockResolvedValue({ data: [mockTemplate], total: 1 });

      const result = await service.listTemplates(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listTemplates('')).rejects.toThrow();
    });
  });

  describe('getTemplate', () => {
    it('should retrieve a template by id', async () => {
      mockTemplateRepo.exists.mockResolvedValue(true);
      mockTemplateRepo.findById.mockResolvedValue(mockTemplate);

      const result = await service.getTemplate(SCHOOL_ID, TEMPLATE_ID);

      expect(result).toEqual(mockTemplate);
    });

    it('should throw if template not found', async () => {
      mockTemplateRepo.exists.mockResolvedValue(false);

      await expect(service.getTemplate(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createTemplate', () => {
    it('should create a template successfully', async () => {
      mockTemplateRepo.findByName.mockResolvedValue(null);
      mockTemplateRepo.create.mockResolvedValue(mockTemplate);

      const result = await service.createTemplate(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'vpc-template',
        template_type: 'TERRAFORM',
        provider: 'TERRAFORM',
        content: '{}',
        version: '1.0.0',
      });

      expect(result).toEqual(mockTemplate);
    });

    it('should reject duplicate template name', async () => {
      mockTemplateRepo.findByName.mockResolvedValue(mockTemplate);

      await expect(service.createTemplate(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'vpc-template',
        template_type: 'TERRAFORM',
        provider: 'TERRAFORM',
        content: '{}',
        version: '1.0.0',
      })).rejects.toThrow(GecirapTemplateNotFoundError);
    });
  });

  describe('deleteTemplate', () => {
    it('should soft delete a template', async () => {
      mockTemplateRepo.exists.mockResolvedValue(true);
      mockTemplateRepo.findById.mockResolvedValue(mockTemplate);
      mockStackRepo.findByTemplateId.mockResolvedValue({ data: [], total: 0 });
      mockTemplateRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteTemplate(SCHOOL_ID, TEMPLATE_ID);

      expect(mockTemplateRepo.softDelete).toHaveBeenCalledWith(TEMPLATE_ID, SCHOOL_ID);
    });

    it('should reject deleting template with associated stacks', async () => {
      mockTemplateRepo.exists.mockResolvedValue(true);
      mockTemplateRepo.findById.mockResolvedValue(mockTemplate);
      mockStackRepo.findByTemplateId.mockResolvedValue({ data: [mockStack], total: 1 });

      await expect(service.deleteTemplate(SCHOOL_ID, TEMPLATE_ID)).rejects.toThrow(GecirapTemplateNotFoundError);
    });
  });

  describe('createStack', () => {
    it('should create a stack successfully', async () => {
      mockTemplateRepo.exists.mockResolvedValue(true);
      mockStackRepo.create.mockResolvedValue(mockStack);

      const result = await service.createStack(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        template_id: TEMPLATE_ID,
        templateId: TEMPLATE_ID,
        name: 'prod-vpc',
        environment: 'PRODUCTION',
      });

      expect(result).toEqual(mockStack);
    });
  });

  describe('listActiveStacks', () => {
    it('should return active stacks', async () => {
      mockStackRepo.findActive.mockResolvedValue([mockStack]);

      const result = await service.listActiveStacks(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createJob', () => {
    it('should create a provisioning job', async () => {
      mockStackRepo.exists.mockResolvedValue(true);
      mockJobRepo.create.mockResolvedValue(mockJob);

      const result = await service.createJob(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        stack_id: STACK_ID,
        stackId: STACK_ID,
        job_type: 'apply',
        action: 'apply',
      });

      expect(result).toEqual(mockJob);
    });
  });

  describe('validateAgainstPolicies', () => {
    it('should return valid when no mandatory violations', async () => {
      mockStackRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.findActive.mockResolvedValue([]);

      const result = await service.validateAgainstPolicies(SCHOOL_ID, STACK_ID);

      expect(result.valid).toBe(true);
      expect(result.violations).toHaveLength(0);
    });

    it('should return violations for mandatory policies', async () => {
      mockStackRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.findActive.mockResolvedValue([mockPolicy]);

      const result = await service.validateAgainstPolicies(SCHOOL_ID, STACK_ID);

      expect(result.valid).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
    });
  });
});
