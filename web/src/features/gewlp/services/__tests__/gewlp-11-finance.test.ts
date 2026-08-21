import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpFinanceService } from '../finance.service'
import * as financeRepo from '../../repositories/finance.repository'

vi.mock('../../repositories/finance.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpFinanceService', () => {
  let service: GewlpFinanceService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpFinanceService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list finance records', async () => {
      const mockRecords = [{ id: '1', type: 'WALLET' }]
      vi.mocked(financeRepo.list).mockResolvedValue(mockRecords as any)

      const result = await service.listFinance()

      expect(result).toEqual(mockRecords)
      expect(financeRepo.list).toHaveBeenCalledOnce()
    })

    it('should find finance record by id', async () => {
      const mockRecord = { id: '1', type: 'WALLET' }
      vi.mocked(financeRepo.find).mockResolvedValue(mockRecord as any)

      const result = await service.findFinance('1')

      expect(result).toEqual(mockRecord)
      expect(financeRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create finance record', async () => {
      const input = { type: 'WALLET', status: 'ACTIVE' }
      vi.mocked(financeRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createFinance(input as any)

      expect(result.id).toBe('1')
      expect(financeRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update finance record', async () => {
      vi.mocked(financeRepo.update).mockResolvedValue({ id: '1', type: 'WALLET' } as any)

      const result = await service.updateFinance('1', { status: 'INACTIVE' } as any)

      expect(result.id).toBe('1')
      expect(financeRepo.update).toHaveBeenCalledWith('1', { status: 'INACTIVE' })
    })

    it('should delete finance record', async () => {
      vi.mocked(financeRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteFinance('1')

      expect(financeRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if finance record not found', async () => {
      vi.mocked(financeRepo.find).mockResolvedValue(null)

      await expect(service.findFinance('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(financeRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createFinance({ type: 'WALLET' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(financeRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listFinance()).rejects.toThrow('db error')
    })
  })
})