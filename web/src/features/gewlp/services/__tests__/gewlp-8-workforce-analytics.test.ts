import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpWorkforceAnalyticsService } from '../workforce-analytics.service'
import * as workforceAnalyticsRepo from '../../repositories/workforce-analytics.repository'

vi.mock('../../repositories/workforce-analytics.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpWorkforceAnalyticsService', () => {
  let service: GewlpWorkforceAnalyticsService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpWorkforceAnalyticsService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list analytics', async () => {
      const mockAnalytics = [{ id: '1', type: 'DEMAND' }]
      vi.mocked(workforceAnalyticsRepo.list).mockResolvedValue(mockAnalytics as any)

      const result = await service.listAnalytics()

      expect(result).toEqual(mockAnalytics)
      expect(workforceAnalyticsRepo.list).toHaveBeenCalledOnce()
    })

    it('should find analytics by id', async () => {
      const mockAnalytics = { id: '1', type: 'DEMAND' }
      vi.mocked(workforceAnalyticsRepo.find).mockResolvedValue(mockAnalytics as any)

      const result = await service.findAnalytics('1')

      expect(result).toEqual(mockAnalytics)
      expect(workforceAnalyticsRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create analytics', async () => {
      const input = { type: 'DEMAND', dataSource: 'BUREAU' }
      vi.mocked(workforceAnalyticsRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createAnalytics(input as any)

      expect(result.id).toBe('1')
      expect(workforceAnalyticsRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update analytics', async () => {
      vi.mocked(workforceAnalyticsRepo.update).mockResolvedValue({ id: '1', type: 'DEMAND' } as any)

      const result = await service.updateAnalytics('1', { type: 'SUPPLY' } as any)

      expect(result.id).toBe('1')
      expect(workforceAnalyticsRepo.update).toHaveBeenCalledWith('1', { type: 'SUPPLY' })
    })

    it('should delete analytics', async () => {
      vi.mocked(workforceAnalyticsRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteAnalytics('1')

      expect(workforceAnalyticsRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if analytics not found', async () => {
      vi.mocked(workforceAnalyticsRepo.find).mockResolvedValue(null)

      await expect(service.findAnalytics('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(workforceAnalyticsRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createAnalytics({ type: 'DEMAND' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(workforceAnalyticsRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listAnalytics()).rejects.toThrow('db error')
    })
  })
})