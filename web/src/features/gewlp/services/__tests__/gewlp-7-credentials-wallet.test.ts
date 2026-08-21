import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpCredentialsWalletService } from '../credentials-wallet.service'
import * as credentialsWalletRepo from '../../repositories/credentials-wallet.repository'

vi.mock('../../repositories/credentials-wallet.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpCredentialsWalletService', () => {
  let service: GewlpCredentialsWalletService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpCredentialsWalletService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list credentials', async () => {
      const mockCredentials = [{ id: '1', type: 'DIGITAL' }]
      vi.mocked(credentialsWalletRepo.list).mockResolvedValue(mockCredentials as any)

      const result = await service.listCredentials()

      expect(result).toEqual(mockCredentials)
      expect(credentialsWalletRepo.list).toHaveBeenCalledOnce()
    })

    it('should find credential by id', async () => {
      const mockCredential = { id: '1', type: 'DIGITAL' }
      vi.mocked(credentialsWalletRepo.find).mockResolvedValue(mockCredential as any)

      const result = await service.findCredential('1')

      expect(result).toEqual(mockCredential)
      expect(credentialsWalletRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create credential', async () => {
      const input = { type: 'DIGITAL', walletType: 'STUDENT' }
      vi.mocked(credentialsWalletRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createCredential(input as any)

      expect(result.id).toBe('1')
      expect(credentialsWalletRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update credential', async () => {
      vi.mocked(credentialsWalletRepo.update).mockResolvedValue({ id: '1', type: 'DIGITAL' } as any)

      const result = await service.updateCredential('1', { type: 'PHYSICAL' } as any)

      expect(result.id).toBe('1')
      expect(credentialsWalletRepo.update).toHaveBeenCalledWith('1', { type: 'PHYSICAL' })
    })

    it('should delete credential', async () => {
      vi.mocked(credentialsWalletRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteCredential('1')

      expect(credentialsWalletRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if credential not found', async () => {
      vi.mocked(credentialsWalletRepo.find).mockResolvedValue(null)

      await expect(service.findCredential('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(credentialsWalletRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createCredential({ type: 'DIGITAL' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(credentialsWalletRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listCredentials()).rejects.toThrow('db error')
    })
  })
})