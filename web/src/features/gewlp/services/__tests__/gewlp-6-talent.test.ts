import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpTalentService } from '../talent.service'
import * as talentRepo from '../../repositories/talent.repository'

vi.mock('../../repositories/talent.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpTalentService', () => {
  let service: GewlpTalentService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpTalentService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list talent listings', async () => {
      const mockListings = [{ id: '1', title: 'Senior Dev' }]
      vi.mocked(talentRepo.list).mockResolvedValue(mockListings as any)

      const result = await service.listTalentListings()

      expect(result).toEqual(mockListings)
      expect(talentRepo.list).toHaveBeenCalledOnce()
    })

    it('should find talent listing by id', async () => {
      const mockListing = { id: '1', title: 'Senior Dev' }
      vi.mocked(talentRepo.find).mockResolvedValue(mockListing as any)

      const result = await service.findTalentListing('1')

      expect(result).toEqual(mockListing)
      expect(talentRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create talent listing', async () => {
      const input = { title: 'Senior Dev', type: 'TALENT' }
      vi.mocked(talentRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createTalentListing(input as any)

      expect(result.id).toBe('1')
      expect(talentRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update talent listing', async () => {
      vi.mocked(talentRepo.update).mockResolvedValue({ id: '1', title: 'Senior Dev' } as any)

      const result = await service.updateTalentListing('1', { title: 'Lead Dev' } as any)

      expect(result.id).toBe('1')
      expect(talentRepo.update).toHaveBeenCalledWith('1', { title: 'Lead Dev' })
    })

    it('should delete talent listing', async () => {
      vi.mocked(talentRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteTalentListing('1')

      expect(talentRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if talent listing not found', async () => {
      vi.mocked(talentRepo.find).mockResolvedValue(null)

      await expect(service.findTalentListing('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(talentRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createTalentListing({ title: 'Test' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(talentRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listTalentListings()).rejects.toThrow('db error')
    })
  })
})