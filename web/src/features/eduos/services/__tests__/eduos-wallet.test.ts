import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Wallet Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getEducationWallet: vi.fn(),
      listEducationWallets: vi.fn(),
      createEducationWallet: vi.fn(),
      updateEducationWallet: vi.fn(),
      deleteEducationWallet: vi.fn(),
      getWalletCredits: vi.fn(),
      listWalletCredits: vi.fn(),
      createWalletCredits: vi.fn(),
      updateWalletCredits: vi.fn(),
      deleteWalletCredits: vi.fn(),
      getScholarship: vi.fn(),
      listScholarships: vi.fn(),
      createScholarship: vi.fn(),
      updateScholarship: vi.fn(),
      deleteScholarship: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('EducationWalletService', () => {
    it('should create service', async () => {
      const { EduOSEducationWalletService } = await import('../eduos-education-wallet.service');
      const service = new EduOSEducationWalletService({} as any);
      expect(service).toBeDefined();
    });

    it('should get education wallet', async () => {
      mockRepo.getEducationWallet.mockResolvedValue({ id: 'ew-1', balance: 1000 });
      const { EduOSEducationWalletService } = await import('../eduos-education-wallet.service');
      const service = new EduOSEducationWalletService({} as any);
      const result = await service.getEducationWallet('school-1', 'ew-1');
      expect(result.id).toBe('ew-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getEducationWallet.mockResolvedValue(null);
      const { EduOSEducationWalletService } = await import('../eduos-education-wallet.service');
      const service = new EduOSEducationWalletService({} as any);
      await expect(service.getEducationWallet('school-1', 'ew-1')).rejects.toThrow();
    });

    it('should list education wallets', async () => {
      mockRepo.listEducationWallets.mockResolvedValue([{ id: 'ew-1' }]);
      const { EduOSEducationWalletService } = await import('../eduos-education-wallet.service');
      const service = new EduOSEducationWalletService({} as any);
      const result = await service.listEducationWallets('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create education wallet', async () => {
      mockRepo.createEducationWallet.mockResolvedValue({ id: 'ew-1' });
      const { EduOSEducationWalletService } = await import('../eduos-education-wallet.service');
      const service = new EduOSEducationWalletService({} as any);
      const result = await service.createEducationWallet('school-1', { balance: 500 });
      expect(result.id).toBe('ew-1');
    });

    it('should update education wallet', async () => {
      mockRepo.getEducationWallet.mockResolvedValue({ id: 'ew-1' });
      mockRepo.updateEducationWallet.mockResolvedValue({ id: 'ew-1', balance: 1500 });
      const { EduOSEducationWalletService } = await import('../eduos-education-wallet.service');
      const service = new EduOSEducationWalletService({} as any);
      const result = await service.updateEducationWallet('school-1', 'ew-1', { balance: 1500 });
      expect(result.balance).toBe(1500);
    });

    it('should delete education wallet', async () => {
      mockRepo.getEducationWallet.mockResolvedValue({ id: 'ew-1' });
      mockRepo.deleteEducationWallet.mockResolvedValue(undefined);
      const { EduOSEducationWalletService } = await import('../eduos-education-wallet.service');
      const service = new EduOSEducationWalletService({} as any);
      await service.deleteEducationWallet('school-1', 'ew-1');
      expect(mockRepo.deleteEducationWallet).toHaveBeenCalledWith('school-1', 'ew-1');
    });
  });

  describe('ScholarshipService', () => {
    it('should create service', async () => {
      const { EduOSScholarshipService } = await import('../eduos-scholarship.service');
      const service = new EduOSScholarshipService({} as any);
      expect(service).toBeDefined();
    });

    it('should get scholarship', async () => {
      mockRepo.getScholarship.mockResolvedValue({ id: 'sch-1', name: 'Merit Award' });
      const { EduOSScholarshipService } = await import('../eduos-scholarship.service');
      const service = new EduOSScholarshipService({} as any);
      const result = await service.getScholarship('school-1', 'sch-1');
      expect(result.id).toBe('sch-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getScholarship.mockResolvedValue(null);
      const { EduOSScholarshipService } = await import('../eduos-scholarship.service');
      const service = new EduOSScholarshipService({} as any);
      await expect(service.getScholarship('school-1', 'sch-1')).rejects.toThrow();
    });

    it('should list scholarships', async () => {
      mockRepo.listScholarships.mockResolvedValue([{ id: 'sch-1' }]);
      const { EduOSScholarshipService } = await import('../eduos-scholarship.service');
      const service = new EduOSScholarshipService({} as any);
      const result = await service.listScholarships('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create scholarship', async () => {
      mockRepo.createScholarship.mockResolvedValue({ id: 'sch-1' });
      const { EduOSScholarshipService } = await import('../eduos-scholarship.service');
      const service = new EduOSScholarshipService({} as any);
      const result = await service.createScholarship('school-1', { name: 'Merit Award' });
      expect(result.id).toBe('sch-1');
    });

    it('should update scholarship', async () => {
      mockRepo.getScholarship.mockResolvedValue({ id: 'sch-1' });
      mockRepo.updateScholarship.mockResolvedValue({ id: 'sch-1', name: 'Updated Award' });
      const { EduOSScholarshipService } = await import('../eduos-scholarship.service');
      const service = new EduOSScholarshipService({} as any);
      const result = await service.updateScholarship('school-1', 'sch-1', { name: 'Updated Award' });
      expect(result.name).toBe('Updated Award');
    });

    it('should delete scholarship', async () => {
      mockRepo.getScholarship.mockResolvedValue({ id: 'sch-1' });
      mockRepo.deleteScholarship.mockResolvedValue(undefined);
      const { EduOSScholarshipService } = await import('../eduos-scholarship.service');
      const service = new EduOSScholarshipService({} as any);
      await service.deleteScholarship('school-1', 'sch-1');
      expect(mockRepo.deleteScholarship).toHaveBeenCalledWith('school-1', 'sch-1');
    });
  });
});
