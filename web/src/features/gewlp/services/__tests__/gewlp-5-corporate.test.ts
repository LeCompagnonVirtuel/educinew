import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpCorporateService } from '../corporate.service'
import * as corporateRepo from '../../repositories/corporate.repository'

vi.mock('../../repositories/corporate.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpCorporateService', () => {
  let service: GewlpCorporateService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpCorporateService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list corporate trainings', async () => {
      const mockTrainings = [{ id: '1', name: 'Leadership 101' }]
      vi.mocked(corporateRepo.list).mockResolvedValue(mockTrainings as any)

      const result = await service.listCorporateTrainings()

      expect(result).toEqual(mockTrainings)
      expect(corporateRepo.list).toHaveBeenCalledOnce()
    })

    it('should find corporate training by id', async () => {
      const mockTraining = { id: '1', name: 'Leadership 101' }
      vi.mocked(corporateRepo.find).mockResolvedValue(mockTraining as any)

      const result = await service.findCorporateTraining('1')

      expect(result).toEqual(mockTraining)
      expect(corporateRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create corporate training', async () => {
      const input = { name: 'Leadership 101', type: 'ACADEMY' }
      vi.mocked(corporateRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createCorporateTraining(input as any)

      expect(result.id).toBe('1')
      expect(corporateRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update corporate training', async () => {
      vi.mocked(corporateRepo.update).mockResolvedValue({ id: '1', name: 'Leadership 101' } as any)

      const result = await service.updateCorporateTraining('1', { name: 'Leadership 202' } as any)

      expect(result.id).toBe('1')
      expect(corporateRepo.update).toHaveBeenCalledWith('1', { name: 'Leadership 202' })
    })

    it('should delete corporate training', async () => {
      vi.mocked(corporateRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteCorporateTraining('1')

      expect(corporateRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if corporate training not found', async () => {
      vi.mocked(corporateRepo.find).mockResolvedValue(null)

      await expect(service.findCorporateTraining('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(corporateRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createCorporateTraining({ name: 'Test' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(corporateRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listCorporateTrainings()).rejects.toThrow('db error')
    })
  })
})