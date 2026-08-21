import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpCareerService } from '../career.service'
import * as careerRepo from '../../repositories/career.repository'

vi.mock('../../repositories/career.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpCareerService', () => {
  let service: GewlpCareerService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpCareerService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list career plans', async () => {
      const mockPlans = [{ id: '1', goal: 'Become CTO' }]
      vi.mocked(careerRepo.list).mockResolvedValue(mockPlans as any)

      const result = await service.listCareerPlans()

      expect(result).toEqual(mockPlans)
      expect(careerRepo.list).toHaveBeenCalledOnce()
    })

    it('should find career plan by id', async () => {
      const mockPlan = { id: '1', goal: 'Become CTO' }
      vi.mocked(careerRepo.find).mockResolvedValue(mockPlan as any)

      const result = await service.findCareerPlan('1')

      expect(result).toEqual(mockPlan)
      expect(careerRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create career plan', async () => {
      const input = { goal: 'Become CTO', stage: 'DEVELOPMENT' }
      vi.mocked(careerRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createCareerPlan(input as any)

      expect(result.id).toBe('1')
      expect(careerRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update career plan', async () => {
      vi.mocked(careerRepo.update).mockResolvedValue({ id: '1', goal: 'Become CTO' } as any)

      const result = await service.updateCareerPlan('1', { goal: 'Become CEO' } as any)

      expect(result.id).toBe('1')
      expect(careerRepo.update).toHaveBeenCalledWith('1', { goal: 'Become CEO' })
    })

    it('should delete career plan', async () => {
      vi.mocked(careerRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteCareerPlan('1')

      expect(careerRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if career plan not found', async () => {
      vi.mocked(careerRepo.find).mockResolvedValue(null)

      await expect(service.findCareerPlan('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(careerRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createCareerPlan({ goal: 'Test' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(careerRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listCareerPlans()).rejects.toThrow('db error')
    })
  })
})