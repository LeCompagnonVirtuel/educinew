import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpSkillsService } from '../skills.service'
import * as skillsRepo from '../../repositories/skills.repository'

vi.mock('../../repositories/skills.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpSkillsService', () => {
  let service: GewlpSkillsService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpSkillsService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list skills', async () => {
      const mockSkills = [{ id: '1', name: 'React' }]
      vi.mocked(skillsRepo.list).mockResolvedValue(mockSkills as any)

      const result = await service.listSkills()

      expect(result).toEqual(mockSkills)
      expect(skillsRepo.list).toHaveBeenCalledOnce()
    })

    it('should find skill by id', async () => {
      const mockSkill = { id: '1', name: 'React' }
      vi.mocked(skillsRepo.find).mockResolvedValue(mockSkill as any)

      const result = await service.findSkill('1')

      expect(result).toEqual(mockSkill)
      expect(skillsRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create skill', async () => {
      const input = { name: 'React', level: 'INTERMEDIATE' }
      vi.mocked(skillsRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createSkill(input as any)

      expect(result.id).toBe('1')
      expect(skillsRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update skill', async () => {
      vi.mocked(skillsRepo.update).mockResolvedValue({ id: '1', name: 'React' } as any)

      const result = await service.updateSkill('1', { name: 'React Native' } as any)

      expect(result.id).toBe('1')
      expect(skillsRepo.update).toHaveBeenCalledWith('1', { name: 'React Native' })
    })

    it('should delete skill', async () => {
      vi.mocked(skillsRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteSkill('1')

      expect(skillsRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if skill not found', async () => {
      vi.mocked(skillsRepo.find).mockResolvedValue(null)

      await expect(service.findSkill('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(skillsRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createSkill({ name: 'React' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(skillsRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listSkills()).rejects.toThrow('db error')
    })
  })
})