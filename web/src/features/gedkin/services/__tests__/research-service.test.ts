import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResearchService } from '../research-service';

const mockProjectRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByStatus: vi.fn(),
};

const mockPublicationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProjectId: vi.fn(),
};

const mockProfileRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByUserId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const PROJECT_ID = '660e8400-e29b-41d4-a716-446655440001';
const PUBLICATION_ID = '770e8400-e29b-41d4-a716-446655440002';
const PROFILE_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockProject = {
  id: PROJECT_ID,
  school_id: SCHOOL_ID,
  title: 'AI in Education',
  description: 'Research on AI applications in education',
  status: 'ACTIVE',
  principalInvestigator: 'Dr. Smith',
  coInvestigators: ['Dr. Jones'],
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2025-12-31T00:00:00Z',
  funding: 50000,
  keywords: ['AI', 'education'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockPublication = {
  id: PUBLICATION_ID,
  school_id: SCHOOL_ID,
  projectId: PROJECT_ID,
  title: 'AI Transforming Education',
  authors: ['Dr. Smith', 'Dr. Jones'],
  journal: 'Education Today',
  year: 2024,
  doi: '10.1234/et.2024.001',
  citations: 15,
  status: 'PUBLISHED',
  abstract: 'This paper explores...',
  keywords: ['AI', 'education'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockProfile = {
  id: PROFILE_ID,
  school_id: SCHOOL_ID,
  userId: 'user-123',
  name: 'Dr. Smith',
  institution: 'University of Education',
  researchAreas: ['AI', 'Machine Learning'],
  publications: [PUBLICATION_ID],
  hIndex: 12,
  citations: 500,
  orcidId: '0000-0001-2345-6789',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: ResearchService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ResearchService(
    mockProjectRepo as never,
    mockPublicationRepo as never,
    mockProfileRepo as never,
  );
});

describe('ResearchService', () => {
  describe('listProjects', () => {
    it('should list projects for a school', async () => {
      mockProjectRepo.findAll.mockResolvedValue({ data: [mockProject], total: 1, offset: 0, limit: 50 });

      const result = await service.listProjects(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listProjects('')).rejects.toThrow();
    });
  });

  describe('getProject', () => {
    it('should retrieve a project by id', async () => {
      mockProjectRepo.exists.mockResolvedValue(true);
      mockProjectRepo.findById.mockResolvedValue(mockProject);

      const result = await service.getProject(SCHOOL_ID, PROJECT_ID);

      expect(result).toEqual(mockProject);
    });

    it('should throw if project not found', async () => {
      mockProjectRepo.exists.mockResolvedValue(false);

      await expect(service.getProject(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createProject', () => {
    it('should create a project successfully', async () => {
      mockProjectRepo.create.mockResolvedValue(mockProject);

      const result = await service.createProject(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        title: 'AI in Education',
        description: 'Research on AI applications in education',
        status: 'ACTIVE',
        principalInvestigator: 'Dr. Smith',
        coInvestigators: ['Dr. Jones'],
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2025-12-31T00:00:00Z',
        funding: 50000,
        keywords: ['AI', 'education'],
      });

      expect(result).toEqual(mockProject);
    });
  });

  describe('deleteProject', () => {
    it('should soft delete a project', async () => {
      mockProjectRepo.exists.mockResolvedValue(true);
      mockProjectRepo.findById.mockResolvedValue(mockProject);
      mockProjectRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteProject(SCHOOL_ID, PROJECT_ID);

      expect(mockProjectRepo.softDelete).toHaveBeenCalledWith(PROJECT_ID, SCHOOL_ID);
    });
  });

  describe('listByStatus', () => {
    it('should list projects by status', async () => {
      mockProjectRepo.findByStatus.mockResolvedValue({ data: [mockProject], total: 1, offset: 0, limit: 50 });

      const result = await service.listByStatus(SCHOOL_ID, 'ACTIVE');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createPublication', () => {
    it('should create a publication successfully', async () => {
      mockPublicationRepo.create.mockResolvedValue(mockPublication);

      const result = await service.createPublication(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        projectId: PROJECT_ID,
        title: 'AI Transforming Education',
        authors: ['Dr. Smith', 'Dr. Jones'],
        journal: 'Education Today',
        year: 2024,
        doi: '10.1234/et.2024.001',
        citations: 15,
        status: 'PUBLISHED',
        abstract: 'This paper explores...',
        keywords: ['AI', 'education'],
      });

      expect(result).toEqual(mockPublication);
    });
  });

  describe('listByProject', () => {
    it('should list publications by project', async () => {
      mockPublicationRepo.findByProjectId.mockResolvedValue({ data: [mockPublication], total: 1, offset: 0, limit: 50 });

      const result = await service.listByProject(SCHOOL_ID, PROJECT_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createProfile', () => {
    it('should create a researcher profile successfully', async () => {
      mockProfileRepo.create.mockResolvedValue(mockProfile);

      const result = await service.createProfile(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        userId: 'aa0e8400-e29b-41d4-a716-446655440010',
        name: 'Dr. Smith',
        institution: 'University of Education',
        researchAreas: ['AI', 'Machine Learning'],
        publications: [PUBLICATION_ID],
        hIndex: 12,
        citations: 500,
        orcidId: '0000-0001-2345-6789',
      });

      expect(result).toEqual(mockProfile);
    });
  });

  describe('listByUser', () => {
    it('should return profile by user', async () => {
      mockProfileRepo.findByUserId.mockResolvedValue(mockProfile);

      const result = await service.listByUser(SCHOOL_ID, 'user-123');

      expect(result).toEqual(mockProfile);
    });
  });

  describe('getResearchStats', () => {
    it('should return research statistics', async () => {
      mockProjectRepo.findAll.mockResolvedValue({ data: [mockProject], total: 1, offset: 0, limit: 1000 });
      mockPublicationRepo.findAll.mockResolvedValue({ data: [mockPublication], total: 1, offset: 0, limit: 1000 });
      mockProfileRepo.findAll.mockResolvedValue({ data: [mockProfile], total: 1, offset: 0, limit: 1000 });

      const result = await service.getResearchStats(SCHOOL_ID);

      expect(result.totalProjects).toBe(1);
      expect(result.totalPublications).toBe(1);
      expect(result.totalProfiles).toBe(1);
      expect(result.totalCitations).toBe(15);
    });
  });
});
