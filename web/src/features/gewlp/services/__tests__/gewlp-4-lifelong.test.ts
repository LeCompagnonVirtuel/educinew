import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpLifelongService } from '../lifelong.service'
import * as lifelongRepo from '../../repositories/lifelong.repository'

vi.mock('../../repositories/lifelong.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpLifelongService', () => {
  let service: GewlpLifelongService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpLifelongService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list lifelong programs', async () => {
      const mockPrograms = [{ id: '1', title: 'Web Dev Bootcamp' }]
      vi.mocked(lifelongRepo.list).mockResolvedValue(mockPrograms as any)

      const result = await service.listLifelongPrograms()

      expect(result).toEqual(mockPrograms)
      expect(lifelongRepo.list).toHaveBeenCalledOnce()
    })

    it('should find lifelong program by id', async () => {
      const mockProgram = { id: '1', title: 'Web Dev Bootcamp' }
      vi.mocked(lifelongRepo.find).mockResolvedValue(mockProgram as any)

      const result = await service.findLifelongProgram('1')

      expect(result).toEqual(mockProgram)
      expect(lifelongRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create lifelong program', async () => {
      const input = { title: 'Web Dev Bootcamp', type: 'COURSE' }
      vi.mocked(lifelongRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createLifelongProgram(input as any)

      expect(result.id).toBe('1')
      expect(lifelongRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update lifelong program', async () => {
      vi.mocked(lifelongRepo.update).mockResolvedValue({ id: '1', title: 'Web Dev Bootcamp' } as any)

      const result = await service.updateLifelongProgram('1', { title: 'Advanced Web Dev' } as any)

      expect(result.id).toBe('1')
      expect(lifelongRepo.update).toHaveBeenCalledWith('1', { title: 'Advanced Web Dev' })
    })

    it('should delete lifelong program', async () => {
      vi.mocked(lifelongRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteLifelongProgram('1')

      expect(lifelongRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if lifelong program not found', async () => {
      vi.mocked(lifelongRepo.find).mockResolvedValue(null)

      await expect(service.findLifelongProgram('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(lifelongRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createLifelongProgram({ title: 'Test' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(lifelongRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listLifelongPrograms()).rejects.toThrow('db error')
    })
  })
})