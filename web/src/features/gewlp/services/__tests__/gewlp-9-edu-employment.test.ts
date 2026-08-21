import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpEduEmploymentService } from '../edu-employment.service'
import * as eduEmploymentRepo from '../../repositories/edu-employment.repository'

vi.mock('../../repositories/edu-employment.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpEduEmploymentService', () => {
  let service: GewlpEduEmploymentService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpEduEmploymentService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list tracking records', async () => {
      const mockRecords = [{ id: '1', type: 'GRADUATE' }]
      vi.mocked(eduEmploymentRepo.list).mockResolvedValue(mockRecords as any)

      const result = await service.listTracking()

      expect(result).toEqual(mockRecords)
      expect(eduEmploymentRepo.list).toHaveBeenCalledOnce()
    })

    it('should find tracking record by id', async () => {
      const mockRecord = { id: '1', type: 'GRADUATE' }
      vi.mocked(eduEmploymentRepo.find).mockResolvedValue(mockRecord as any)

      const result = await service.findTracking('1')

      expect(result).toEqual(mockRecord)
      expect(eduEmploymentRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create tracking record', async () => {
      const input = { type: 'GRADUATE', outcome: 'EMPLOYED' }
      vi.mocked(eduEmploymentRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createTracking(input as any)

      expect(result.id).toBe('1')
      expect(eduEmploymentRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update tracking record', async () => {
      vi.mocked(eduEmploymentRepo.update).mockResolvedValue({ id: '1', type: 'GRADUATE' } as any)

      const result = await service.updateTracking('1', { type: 'DROPOUT' } as any)

      expect(result.id).toBe('1')
      expect(eduEmploymentRepo.update).toHaveBeenCalledWith('1', { type: 'DROPOUT' })
    })

    it('should delete tracking record', async () => {
      vi.mocked(eduEmploymentRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteTracking('1')

      expect(eduEmploymentRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if tracking record not found', async () => {
      vi.mocked(eduEmploymentRepo.find).mockResolvedValue(null)

      await expect(service.findTracking('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(eduEmploymentRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createTracking({ type: 'GRADUATE' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(eduEmploymentRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listTracking()).rejects.toThrow('db error')
    })
  })
})