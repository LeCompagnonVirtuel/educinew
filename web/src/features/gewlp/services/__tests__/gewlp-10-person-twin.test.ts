import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpPersonTwinService } from '../person-twin.service'
import * as personTwinRepo from '../../repositories/person-twin.repository'

vi.mock('../../repositories/person-twin.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpPersonTwinService', () => {
  let service: GewlpPersonTwinService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpPersonTwinService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list digital twins', async () => {
      const mockTwins = [{ id: '1', type: 'STUDENT' }]
      vi.mocked(personTwinRepo.list).mockResolvedValue(mockTwins as any)

      const result = await service.listDigitalTwins()

      expect(result).toEqual(mockTwins)
      expect(personTwinRepo.list).toHaveBeenCalledOnce()
    })

    it('should find digital twin by id', async () => {
      const mockTwin = { id: '1', type: 'STUDENT' }
      vi.mocked(personTwinRepo.find).mockResolvedValue(mockTwin as any)

      const result = await service.findDigitalTwin('1')

      expect(result).toEqual(mockTwin)
      expect(personTwinRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create digital twin', async () => {
      const input = { type: 'STUDENT', components: ['PROFILE', 'SKILLS'] }
      vi.mocked(personTwinRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createDigitalTwin(input as any)

      expect(result.id).toBe('1')
      expect(personTwinRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update digital twin', async () => {
      vi.mocked(personTwinRepo.update).mockResolvedValue({ id: '1', type: 'STUDENT' } as any)

      const result = await service.updateDigitalTwin('1', { type: 'TEACHER' } as any)

      expect(result.id).toBe('1')
      expect(personTwinRepo.update).toHaveBeenCalledWith('1', { type: 'TEACHER' })
    })

    it('should delete digital twin', async () => {
      vi.mocked(personTwinRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteDigitalTwin('1')

      expect(personTwinRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if digital twin not found', async () => {
      vi.mocked(personTwinRepo.find).mockResolvedValue(null)

      await expect(service.findDigitalTwin('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(personTwinRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createDigitalTwin({ type: 'STUDENT' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(personTwinRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listDigitalTwins()).rejects.toThrow('db error')
    })
  })
})