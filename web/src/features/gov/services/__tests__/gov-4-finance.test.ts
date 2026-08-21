import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovBudgetAllocationService } from '../gov-budget-allocation.service';
import { GovFundDisbursementService } from '../gov-fund-disbursement.service';
import { GovScholarshipService } from '../gov-scholarship.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findBudgetAllocationById: vi.fn(),
  createBudgetAllocation: vi.fn(),
  updateBudgetAllocation: vi.fn(),
  deleteBudgetAllocation: vi.fn(),
  findFundDisbursementById: vi.fn(),
  findAllFundDisbursements: vi.fn(),
  createFundDisbursement: vi.fn(),
  findScholarshipById: vi.fn(),
  findAllScholarships: vi.fn(),
  createScholarship: vi.fn(),
  deleteScholarship: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovBudgetAllocationService', () => {
  const service = new GovBudgetAllocationService(mockSupabase);

  it('should get a budget allocation', async () => {
    mockRepo.findBudgetAllocationById.mockResolvedValue({ id: '1', amount: 1000000 });
    const result = await service.getBudgetAllocation('school1', '1');
    expect(result).toHaveProperty('amount', 1000000);
  });

  it('should throw when allocation not found', async () => {
    mockRepo.findBudgetAllocationById.mockResolvedValue(null);
    await expect(service.getBudgetAllocation('school1', '999')).rejects.toThrow();
  });

  it('should create a budget allocation', async () => {
    mockRepo.createBudgetAllocation.mockResolvedValue({ id: '1' });
    const result = await service.createBudgetAllocation('school1', { amount: 500000 } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a budget allocation', async () => {
    mockRepo.findBudgetAllocationById.mockResolvedValue({ id: '1' });
    mockRepo.updateBudgetAllocation.mockResolvedValue({ id: '1', amount: 750000 });
    const result = await service.updateBudgetAllocation('school1', '1', { amount: 750000 });
    expect(result).toHaveProperty('amount', 750000);
  });

  it('should delete a budget allocation', async () => {
    mockRepo.findBudgetAllocationById.mockResolvedValue({ id: '1' });
    mockRepo.deleteBudgetAllocation.mockResolvedValue(undefined);
    await expect(service.deleteBudgetAllocation('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovFundDisbursementService', () => {
  const service = new GovFundDisbursementService(mockSupabase);

  it('should create a disbursement', async () => {
    mockRepo.createFundDisbursement.mockResolvedValue({ id: '1' });
    const result = await service.createFundDisbursement('school1', { amount: 100000 } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when disbursement not found', async () => {
    mockRepo.findFundDisbursementById.mockResolvedValue(null);
    await expect(service.getFundDisbursement('school1', '999')).rejects.toThrow();
  });

  it('should list disbursements', async () => {
    mockRepo.findAllFundDisbursements.mockResolvedValue([]);
    const result = await service.listFundDisbursements('school1');
    expect(result).toEqual([]);
  });
});

describe('GovScholarshipService', () => {
  const service = new GovScholarshipService(mockSupabase);

  it('should create a scholarship', async () => {
    mockRepo.createScholarship.mockResolvedValue({ id: '1' });
    const result = await service.createScholarship('school1', { name: 'Merit' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findScholarshipById.mockResolvedValue(null);
    await expect(service.getScholarship('school1', '999')).rejects.toThrow();
  });

  it('should delete a scholarship', async () => {
    mockRepo.findScholarshipById.mockResolvedValue({ id: '1' });
    mockRepo.deleteScholarship.mockResolvedValue(undefined);
    await expect(service.deleteScholarship('school1', '1')).resolves.toBeUndefined();
  });
});
