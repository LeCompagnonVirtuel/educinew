import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SemanticService } from '../semantic-service';

const mockConceptRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByOntologyId: vi.fn(),
};

const mockOntologyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockTaxonomyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const CONCEPT_ID = '660e8400-e29b-41d4-a716-446655440001';
const ONTOLOGY_ID = '770e8400-e29b-41d4-a716-446655440002';
const TAXONOMY_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockConcept = {
  id: CONCEPT_ID,
  school_id: SCHOOL_ID,
  name: 'Mathematics',
  description: 'The study of numbers and shapes',
  language: 'FR',
  synonyms: ['Maths', 'Math'],
  relatedConcepts: [],
  ontologyId: ONTOLOGY_ID,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockOntology = {
  id: ONTOLOGY_ID,
  school_id: SCHOOL_ID,
  name: 'Education Ontology',
  description: 'Core education concepts',
  version: '1.0',
  concepts: [CONCEPT_ID],
  relations: [],
  language: 'FR',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockTaxonomy = {
  id: TAXONOMY_ID,
  school_id: SCHOOL_ID,
  name: 'Subject Taxonomy',
  description: 'Taxonomy of school subjects',
  rootConcepts: [CONCEPT_ID],
  depth: 3,
  language: 'FR',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: SemanticService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new SemanticService(
    mockConceptRepo as never,
    mockOntologyRepo as never,
    mockTaxonomyRepo as never,
  );
});

describe('SemanticService', () => {
  describe('listConcepts', () => {
    it('should list concepts for a school', async () => {
      mockConceptRepo.findAll.mockResolvedValue({ data: [mockConcept], total: 1, offset: 0, limit: 50 });

      const result = await service.listConcepts(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listConcepts('')).rejects.toThrow();
    });
  });

  describe('getConcept', () => {
    it('should retrieve a concept by id', async () => {
      mockConceptRepo.exists.mockResolvedValue(true);
      mockConceptRepo.findById.mockResolvedValue(mockConcept);

      const result = await service.getConcept(SCHOOL_ID, CONCEPT_ID);

      expect(result).toEqual(mockConcept);
    });

    it('should throw if concept not found', async () => {
      mockConceptRepo.exists.mockResolvedValue(false);

      await expect(service.getConcept(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createConcept', () => {
    it('should create a concept successfully', async () => {
      mockConceptRepo.create.mockResolvedValue(mockConcept);

      const result = await service.createConcept(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Mathematics',
        description: 'The study of numbers and shapes',
        language: 'FR',
        synonyms: ['Maths', 'Math'],
        relatedConcepts: [],
        ontologyId: ONTOLOGY_ID,
      });

      expect(result).toEqual(mockConcept);
    });
  });

  describe('updateConcept', () => {
    it('should update a concept successfully', async () => {
      mockConceptRepo.exists.mockResolvedValue(true);
      mockConceptRepo.findById.mockResolvedValue(mockConcept);
      mockConceptRepo.update.mockResolvedValue({ ...mockConcept, name: 'Advanced Math' });

      const result = await service.updateConcept(SCHOOL_ID, CONCEPT_ID, {
        name: 'Advanced Math',
      });

      expect(result.name).toBe('Advanced Math');
    });

    it('should throw if concept not found on update', async () => {
      mockConceptRepo.exists.mockResolvedValue(false);

      await expect(service.updateConcept(SCHOOL_ID, 'nonexistent', { name: 'X' })).rejects.toThrow();
    });
  });

  describe('deleteConcept', () => {
    it('should soft delete a concept', async () => {
      mockConceptRepo.exists.mockResolvedValue(true);
      mockConceptRepo.findById.mockResolvedValue(mockConcept);
      mockConceptRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteConcept(SCHOOL_ID, CONCEPT_ID);

      expect(mockConceptRepo.softDelete).toHaveBeenCalledWith(CONCEPT_ID, SCHOOL_ID);
    });
  });

  describe('listByOntology', () => {
    it('should list concepts by ontology', async () => {
      mockConceptRepo.findByOntologyId.mockResolvedValue({ data: [mockConcept], total: 1, offset: 0, limit: 50 });

      const result = await service.listByOntology(SCHOOL_ID, ONTOLOGY_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createOntology', () => {
    it('should create an ontology successfully', async () => {
      mockOntologyRepo.create.mockResolvedValue(mockOntology);

      const result = await service.createOntology(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Education Ontology',
        description: 'Core education concepts',
        version: '1.0',
        concepts: [CONCEPT_ID],
        relations: [],
        language: 'FR',
      });

      expect(result).toEqual(mockOntology);
    });
  });

  describe('createTaxonomy', () => {
    it('should create a taxonomy successfully', async () => {
      mockTaxonomyRepo.create.mockResolvedValue(mockTaxonomy);

      const result = await service.createTaxonomy(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Subject Taxonomy',
        description: 'Taxonomy of school subjects',
        rootConcepts: [CONCEPT_ID],
        depth: 3,
        language: 'FR',
      });

      expect(result).toEqual(mockTaxonomy);
    });
  });

  describe('getSemanticStats', () => {
    it('should return semantic statistics', async () => {
      mockConceptRepo.findAll.mockResolvedValue({ data: [mockConcept], total: 1, offset: 0, limit: 1000 });
      mockOntologyRepo.findAll.mockResolvedValue({ data: [mockOntology], total: 1, offset: 0, limit: 1000 });
      mockTaxonomyRepo.findAll.mockResolvedValue({ data: [mockTaxonomy], total: 1, offset: 0, limit: 1000 });

      const result = await service.getSemanticStats(SCHOOL_ID);

      expect(result.totalConcepts).toBe(1);
      expect(result.totalOntologies).toBe(1);
      expect(result.totalTaxonomies).toBe(1);
      expect(result.byLanguage['FR']).toBe(1);
    });
  });
});
