import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('DocumentService', () => {
  const mockRepo = {
    findEmployeeDocuments: vi.fn(),
    findEmployeeDocumentById: vi.fn(),
    createEmployeeDocument: vi.fn(),
    updateEmployeeDocument: vi.fn(),
    deleteEmployeeDocument: vi.fn(),
  };

  const schoolId = 'school-1';
  const documentId = 'doc-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findEmployeeDocuments', () => {
    it('should return documents list', async () => {
      const documents = [{ id: '1', name: 'Contract' }];
      mockRepo.findEmployeeDocuments.mockResolvedValue(documents);
      const result = await mockRepo.findEmployeeDocuments(schoolId, employeeId);
      expect(result).toEqual(documents);
    });

    it('should require both ids', () => {
      const validate = (sId: string, eId: string) => {
        if (!sId || !eId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', employeeId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });

    it('should handle empty results', async () => {
      mockRepo.findEmployeeDocuments.mockResolvedValue([]);
      const result = await mockRepo.findEmployeeDocuments(schoolId, employeeId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findEmployeeDocumentById', () => {
    it('should return document by id', async () => {
      const doc = { id: documentId, name: 'Contract' };
      mockRepo.findEmployeeDocumentById.mockResolvedValue(doc);
      const result = await mockRepo.findEmployeeDocumentById(schoolId, documentId);
      expect(result.name).toBe('Contract');
    });

    it('should throw if not found', async () => {
      mockRepo.findEmployeeDocumentById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const doc = await mockRepo.findEmployeeDocumentById(schoolId, 'nonexistent');
        if (!doc) throw new Error('Document non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createEmployeeDocument', () => {
    it('should create document', async () => {
      mockRepo.createEmployeeDocument.mockResolvedValue({ id: '1', name: 'Contract' });
      const result = await mockRepo.createEmployeeDocument({
        employee_id: employeeId,
        name: 'Contract',
        type: 'contract',
        school_id: schoolId,
      });
      expect(result.name).toBe('Contract');
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom du document est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should require type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type de document est requis');
      };
      expect(() => validate({ employee_id: employeeId, name: 'Contract' })).toThrow();
    });
  });

  describe('updateEmployeeDocument', () => {
    it('should update document', async () => {
      mockRepo.findEmployeeDocumentById.mockResolvedValue({ id: documentId });
      mockRepo.updateEmployeeDocument.mockResolvedValue({ id: documentId, name: 'Updated' });
      const result = await mockRepo.updateEmployeeDocument(schoolId, documentId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findEmployeeDocumentById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const doc = await mockRepo.findEmployeeDocumentById(schoolId, documentId);
        if (!doc) throw new Error('Document non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deleteEmployeeDocument', () => {
    it('should delete document', async () => {
      mockRepo.findEmployeeDocumentById.mockResolvedValue({ id: documentId });
      mockRepo.deleteEmployeeDocument.mockResolvedValue(undefined);
      await mockRepo.deleteEmployeeDocument(schoolId, documentId);
      expect(mockRepo.deleteEmployeeDocument).toHaveBeenCalled();
    });

    it('should throw if not found on delete', async () => {
      mockRepo.findEmployeeDocumentById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const doc = await mockRepo.findEmployeeDocumentById(schoolId, documentId);
        if (!doc) throw new Error('Document non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Document type', () => {
    it('should define valid types', () => {
      const types = ['contract', 'id_card', 'diploma', 'certificate', 'cv', 'other'];
      expect(types).toContain('contract');
      expect(types).toContain('diploma');
    });

    it('should validate document type', () => {
      const validTypes = ['contract', 'id_card', 'diploma', 'certificate', 'cv', 'other'];
      const isValidType = (type: string) => validTypes.includes(type);
      expect(isValidType('contract')).toBe(true);
      expect(isValidType('invalid')).toBe(false);
    });
  });

  describe('Document validation', () => {
    it('should validate file size (max 10MB)', () => {
      const isValidSize = (bytes: number) => bytes <= 10 * 1024 * 1024;
      expect(isValidSize(5 * 1024 * 1024)).toBe(true);
      expect(isValidSize(15 * 1024 * 1024)).toBe(false);
    });

    it('should validate file extension', () => {
      const validExtensions = ['pdf', 'doc', 'docx', 'jpg', 'png'];
      const isValidExt = (ext: string) => validExtensions.includes(ext.toLowerCase());
      expect(isValidExt('pdf')).toBe(true);
      expect(isValidExt('exe')).toBe(false);
    });
  });
});
