import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Blockchain Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getCredentialBlockchain: vi.fn(),
      listCredentialBlockchains: vi.fn(),
      createCredentialBlockchain: vi.fn(),
      updateCredentialBlockchain: vi.fn(),
      deleteCredentialBlockchain: vi.fn(),
      getDiplomaLedger: vi.fn(),
      listDiplomaLedgers: vi.fn(),
      createDiplomaLedger: vi.fn(),
      updateDiplomaLedger: vi.fn(),
      deleteDiplomaLedger: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('CredentialBlockchainService', () => {
    it('should create service', async () => {
      const { EduOSCredentialBlockchainService } = await import('../eduos-credential-blockchain.service');
      const service = new EduOSCredentialBlockchainService({} as any);
      expect(service).toBeDefined();
    });

    it('should get credential blockchain', async () => {
      mockRepo.getCredentialBlockchain.mockResolvedValue({ id: 'cb-1', hash: '0xabc' });
      const { EduOSCredentialBlockchainService } = await import('../eduos-credential-blockchain.service');
      const service = new EduOSCredentialBlockchainService({} as any);
      const result = await service.getCredentialBlockchain('school-1', 'cb-1');
      expect(result.id).toBe('cb-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getCredentialBlockchain.mockResolvedValue(null);
      const { EduOSCredentialBlockchainService } = await import('../eduos-credential-blockchain.service');
      const service = new EduOSCredentialBlockchainService({} as any);
      await expect(service.getCredentialBlockchain('school-1', 'cb-1')).rejects.toThrow();
    });

    it('should list credential blockchains', async () => {
      mockRepo.listCredentialBlockchains.mockResolvedValue([{ id: 'cb-1' }]);
      const { EduOSCredentialBlockchainService } = await import('../eduos-credential-blockchain.service');
      const service = new EduOSCredentialBlockchainService({} as any);
      const result = await service.listCredentialBlockchains('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create credential blockchain', async () => {
      mockRepo.createCredentialBlockchain.mockResolvedValue({ id: 'cb-1' });
      const { EduOSCredentialBlockchainService } = await import('../eduos-credential-blockchain.service');
      const service = new EduOSCredentialBlockchainService({} as any);
      const result = await service.createCredentialBlockchain('school-1', { hash: '0xabc' });
      expect(result.id).toBe('cb-1');
    });

    it('should update credential blockchain', async () => {
      mockRepo.getCredentialBlockchain.mockResolvedValue({ id: 'cb-1' });
      mockRepo.updateCredentialBlockchain.mockResolvedValue({ id: 'cb-1', verified: true });
      const { EduOSCredentialBlockchainService } = await import('../eduos-credential-blockchain.service');
      const service = new EduOSCredentialBlockchainService({} as any);
      const result = await service.updateCredentialBlockchain('school-1', 'cb-1', { verified: true });
      expect(result.verified).toBe(true);
    });

    it('should delete credential blockchain', async () => {
      mockRepo.getCredentialBlockchain.mockResolvedValue({ id: 'cb-1' });
      mockRepo.deleteCredentialBlockchain.mockResolvedValue(undefined);
      const { EduOSCredentialBlockchainService } = await import('../eduos-credential-blockchain.service');
      const service = new EduOSCredentialBlockchainService({} as any);
      await service.deleteCredentialBlockchain('school-1', 'cb-1');
      expect(mockRepo.deleteCredentialBlockchain).toHaveBeenCalledWith('school-1', 'cb-1');
    });
  });

  describe('DiplomaLedgerService', () => {
    it('should create service', async () => {
      const { EduOSDiplomaLedgerService } = await import('../eduos-diploma-ledger.service');
      const service = new EduOSDiplomaLedgerService({} as any);
      expect(service).toBeDefined();
    });

    it('should get diploma ledger', async () => {
      mockRepo.getDiplomaLedger.mockResolvedValue({ id: 'dl-1', diplomaId: 'dip-1' });
      const { EduOSDiplomaLedgerService } = await import('../eduos-diploma-ledger.service');
      const service = new EduOSDiplomaLedgerService({} as any);
      const result = await service.getDiplomaLedger('school-1', 'dl-1');
      expect(result.id).toBe('dl-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getDiplomaLedger.mockResolvedValue(null);
      const { EduOSDiplomaLedgerService } = await import('../eduos-diploma-ledger.service');
      const service = new EduOSDiplomaLedgerService({} as any);
      await expect(service.getDiplomaLedger('school-1', 'dl-1')).rejects.toThrow();
    });

    it('should list diploma ledgers', async () => {
      mockRepo.listDiplomaLedgers.mockResolvedValue([{ id: 'dl-1' }]);
      const { EduOSDiplomaLedgerService } = await import('../eduos-diploma-ledger.service');
      const service = new EduOSDiplomaLedgerService({} as any);
      const result = await service.listDiplomaLedgers('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create diploma ledger', async () => {
      mockRepo.createDiplomaLedger.mockResolvedValue({ id: 'dl-1' });
      const { EduOSDiplomaLedgerService } = await import('../eduos-diploma-ledger.service');
      const service = new EduOSDiplomaLedgerService({} as any);
      const result = await service.createDiplomaLedger('school-1', { diplomaId: 'dip-1' });
      expect(result.id).toBe('dl-1');
    });

    it('should update diploma ledger', async () => {
      mockRepo.getDiplomaLedger.mockResolvedValue({ id: 'dl-1' });
      mockRepo.updateDiplomaLedger.mockResolvedValue({ id: 'dl-1', status: 'confirmed' });
      const { EduOSDiplomaLedgerService } = await import('../eduos-diploma-ledger.service');
      const service = new EduOSDiplomaLedgerService({} as any);
      const result = await service.updateDiplomaLedger('school-1', 'dl-1', { status: 'confirmed' });
      expect(result.status).toBe('confirmed');
    });

    it('should delete diploma ledger', async () => {
      mockRepo.getDiplomaLedger.mockResolvedValue({ id: 'dl-1' });
      mockRepo.deleteDiplomaLedger.mockResolvedValue(undefined);
      const { EduOSDiplomaLedgerService } = await import('../eduos-diploma-ledger.service');
      const service = new EduOSDiplomaLedgerService({} as any);
      await service.deleteDiplomaLedger('school-1', 'dl-1');
      expect(mockRepo.deleteDiplomaLedger).toHaveBeenCalledWith('school-1', 'dl-1');
    });
  });
});
