import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GewlpAiOrchestratorService } from '../ai-orchestrator.service'
import * as aiOrchestratorRepo from '../../repositories/ai-orchestrator.repository'

vi.mock('../../repositories/ai-orchestrator.repository', () => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  list: vi.fn(),
}))

const mockSupabase = {} as any

describe('GewlpAiOrchestratorService', () => {
  let service: GewlpAiOrchestratorService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new GewlpAiOrchestratorService(mockSupabase)
  })

  describe('CRUD', () => {
    it('should list AI agents', async () => {
      const mockAgents = [{ id: '1', type: 'RECOMMENDATION' }]
      vi.mocked(aiOrchestratorRepo.list).mockResolvedValue(mockAgents as any)

      const result = await service.listAgents()

      expect(result).toEqual(mockAgents)
      expect(aiOrchestratorRepo.list).toHaveBeenCalledOnce()
    })

    it('should find AI agent by id', async () => {
      const mockAgent = { id: '1', type: 'RECOMMENDATION' }
      vi.mocked(aiOrchestratorRepo.find).mockResolvedValue(mockAgent as any)

      const result = await service.findAgent('1')

      expect(result).toEqual(mockAgent)
      expect(aiOrchestratorRepo.find).toHaveBeenCalledWith('1')
    })

    it('should create AI agent', async () => {
      const input = { type: 'RECOMMENDATION', status: 'ACTIVE' }
      vi.mocked(aiOrchestratorRepo.create).mockResolvedValue({ id: '1', ...input } as any)

      const result = await service.createAgent(input as any)

      expect(result.id).toBe('1')
      expect(aiOrchestratorRepo.create).toHaveBeenCalledWith(input)
    })

    it('should update AI agent', async () => {
      vi.mocked(aiOrchestratorRepo.update).mockResolvedValue({ id: '1', type: 'RECOMMENDATION' } as any)

      const result = await service.updateAgent('1', { status: 'INACTIVE' } as any)

      expect(result.id).toBe('1')
      expect(aiOrchestratorRepo.update).toHaveBeenCalledWith('1', { status: 'INACTIVE' })
    })

    it('should delete AI agent', async () => {
      vi.mocked(aiOrchestratorRepo.delete).mockResolvedValue(undefined as any)

      await service.deleteAgent('1')

      expect(aiOrchestratorRepo.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('errors', () => {
    it('should throw if AI agent not found', async () => {
      vi.mocked(aiOrchestratorRepo.find).mockResolvedValue(null)

      await expect(service.findAgent('nonexistent')).rejects.toThrow()
    })

    it('should handle repository errors on create', async () => {
      vi.mocked(aiOrchestratorRepo.create).mockRejectedValue(new Error('db error'))

      await expect(service.createAgent({ type: 'RECOMMENDATION' } as any)).rejects.toThrow('db error')
    })

    it('should handle repository errors on list', async () => {
      vi.mocked(aiOrchestratorRepo.list).mockRejectedValue(new Error('db error'))

      await expect(service.listAgents()).rejects.toThrow('db error')
    })
  })
})