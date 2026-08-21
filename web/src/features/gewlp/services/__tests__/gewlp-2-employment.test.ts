import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpEmploymentService } from '../employment.service'
import * as employmentRepo from '../../repositories/employment.repository'

vi.mock('../../repositories/employment.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpEmploymentService', () => {
  let service: GewlpEmploymentService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpEmploymentService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list employments', async () => {
      const mockEmployments = [{ id: '1', company: 'Google' }]
      vi.mocked(employmentRepo.list).mockResolvedValue(mockEmployments as any)

      const result = await service.listEmployments()

      expect(result).toEqual(mockEmployments)
      expect(employmentRepo.list).toHaveBeenCalledOnce()
    })

    it('should find employment by id', async () => {
      const mockEmployment = { id: '1', company: 'Google' }
      vi.mocked(employmentRepo.find).mockResolvedValue(mockEmployment as any)

      const result = await service.findEmployment('1')

      expect(result).toEqual(mockEmployment)
      expect(employmentRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create employment', async () => {
      const input = { company: 'Google', position: 'Engineer' }
      vi.mocked(employmentRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createEmployment(input as any)

      expect(result.id).toBe('1')
      expect(employmentRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update employment', async () => {
      vi.mocked(employmentRepo.update).mockResolvedValue({ id: '1', company: 'Google' } as any)

      const result = await service.updateEmployment('1', { company: 'Meta' } as any)

      expect(result.id).toBe('1')
      expect(employmentRepo.update).toHaveBeenCalledWith('1', { company: 'Meta' })
    })

    it('should delete employment', async () => {
      vi.mocked(employmentRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteEmployment('1')

      expect(employmentRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if employment not found', async () => {
      vi.mocked(employmentRepo.find).mockResolvedValue(null)

      await expect(service.findEmployment('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(employmentRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createEmployment({ company: 'Google' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(employmentRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listEmployments()).rejects.toThrow('db error')
    })
  })
})