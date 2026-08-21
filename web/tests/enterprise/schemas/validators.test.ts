import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseValidators', () => {
  describe('validateEmail', () => {
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    it('should accept valid email', () => {
      expect(validateEmail('user@test.com')).toBe(true);
      expect(validateEmail('admin@school.edu')).toBe(true);
      expect(validateEmail('name.last@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('no@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('user@domain')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });

    it('should reject email with spaces', () => {
      expect(validateEmail('user @test.com')).toBe(false);
      expect(validateEmail('user@ test.com')).toBe(false);
    });

    it('should reject email with special chars', () => {
      expect(validateEmail('user name@test.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    const validatePassword = (password: string) => {
      if (password.length < 8) return { valid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
      if (!/[A-Z]/.test(password)) return { valid: false, error: 'Le mot de passe doit contenir au moins une majuscule' };
      if (!/[a-z]/.test(password)) return { valid: false, error: 'Le mot de passe doit contenir au moins une minuscule' };
      if (!/[0-9]/.test(password)) return { valid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
      return { valid: true };
    };

    it('should accept valid password', () => {
      expect(validatePassword('Password123').valid).toBe(true);
      expect(validatePassword('Str0ngP@ss').valid).toBe(true);
    });

    it('should reject short password', () => {
      const result = validatePassword('Pass1');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('8 caractères');
    });

    it('should reject password without uppercase', () => {
      const result = validatePassword('password123');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('majuscule');
    });

    it('should reject password without lowercase', () => {
      const result = validatePassword('PASSWORD123');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('minuscule');
    });

    it('should reject password without number', () => {
      const result = validatePassword('Password');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('chiffre');
    });
  });

  describe('validateName', () => {
    const validateName = (name: string) => {
      if (!name || name.trim().length < 2) return { valid: false, error: 'Le nom doit contenir au moins 2 caractères' };
      if (name.length > 100) return { valid: false, error: 'Le nom ne peut pas dépasser 100 caractères' };
      return { valid: true };
    };

    it('should accept valid name', () => {
      expect(validateName('John').valid).toBe(true);
      expect(validateName('Jean-Pierre').valid).toBe(true);
      expect(validateName('Marie-Claire').valid).toBe(true);
    });

    it('should reject empty name', () => {
      expect(validateName('').valid).toBe(false);
      expect(validateName(' ').valid).toBe(false);
    });

    it('should reject single char name', () => {
      expect(validateName('A').valid).toBe(false);
    });

    it('should reject too long name', () => {
      expect(validateName('A'.repeat(101)).valid).toBe(false);
    });
  });

  describe('validatePhone', () => {
    const validatePhone = (phone: string) => /^\+?[\d\s-]{8,}$/.test(phone);

    it('should accept valid phone', () => {
      expect(validatePhone('+33123456789')).toBe(true);
      expect(validatePhone('0123456789')).toBe(true);
      expect(validatePhone('+1-555-123-4567')).toBe(true);
    });

    it('should reject invalid phone', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
    });
  });

  describe('validateUrl', () => {
    const validateUrl = (url: string) => /^https?:\/\/.+/.test(url);

    it('should accept valid URL', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://test.org/path')).toBe(true);
    });

    it('should reject invalid URL', () => {
      expect(validateUrl('invalid')).toBe(false);
      expect(validateUrl('ftp://files.com')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });
  });

  describe('validateCode', () => {
    const validateCode = (code: string) => /^[A-Z]{2,4}-\d{4}-\d{4,}$/.test(code);

    it('should accept valid code', () => {
      expect(validateCode('DIR-2026-0001')).toBe(true);
      expect(validateCode('AB-2026-0001')).toBe(true);
      expect(validateCode('SCH-2026-0001')).toBe(true);
    });

    it('should reject invalid code', () => {
      expect(validateCode('invalid')).toBe(false);
      expect(validateCode('A-2026-0001')).toBe(false);
      expect(validateCode('DIR-2026-000')).toBe(false);
    });
  });

  describe('validateLicenseKey', () => {
    const validateLicenseKey = (key: string) => /^LIC-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4,}$/.test(key);

    it('should accept valid key', () => {
      expect(validateLicenseKey('LIC-2026-ABCD-1234')).toBe(true);
    });

    it('should reject invalid key', () => {
      expect(validateLicenseKey('INVALID')).toBe(false);
      expect(validateLicenseKey('LIC-ABC-123')).toBe(false);
    });
  });

  describe('validateCouponCode', () => {
    const validateCouponCode = (code: string) => /^[A-Z0-9]{4,20}$/.test(code);

    it('should accept valid code', () => {
      expect(validateCouponCode('SAVE20')).toBe(true);
      expect(validateCouponCode('AB12')).toBe(true);
      expect(validateCouponCode('A'.repeat(20))).toBe(true);
    });

    it('should reject invalid code', () => {
      expect(validateCouponCode('AB')).toBe(false);
      expect(validateCouponCode('A'.repeat(21))).toBe(false);
      expect(validateCouponCode('lower')).toBe(false);
    });
  });

  describe('validateSchoolCode', () => {
    const validateSchoolCode = (code: string) => /^[A-Z]{2,4}-\d{3,}$/.test(code);

    it('should accept valid code', () => {
      expect(validateSchoolCode('SCH-001')).toBe(true);
      expect(validateSchoolCode('AB-123')).toBe(true);
    });

    it('should reject invalid code', () => {
      expect(validateSchoolCode('A-001')).toBe(false);
      expect(validateSchoolCode('invalid')).toBe(false);
    });
  });

  describe('validateEmployeeCode', () => {
    const validateEmployeeCode = (code: string) => /^[A-Z]{2,4}-\d{4}-\d{4,}$/.test(code);

    it('should accept valid code', () => {
      expect(validateEmployeeCode('EMP-2026-0001')).toBe(true);
    });

    it('should reject invalid code', () => {
      expect(validateEmployeeCode('E-2026-0001')).toBe(false);
      expect(validateEmployeeCode('invalid')).toBe(false);
    });
  });

  describe('validateDateRange', () => {
    const validateDateRange = (from: string, to: string) => {
      if (new Date(from) > new Date(to)) return { valid: false, error: 'La date de début doit précéder la date de fin' };
      return { valid: true };
    };

    it('should accept valid range', () => {
      expect(validateDateRange('2026-01-01', '2026-12-31').valid).toBe(true);
    });

    it('should reject invalid range', () => {
      const result = validateDateRange('2026-12-31', '2026-01-01');
      expect(result.valid).toBe(false);
    });
  });

  describe('validatePercentage', () => {
    const validatePercentage = (value: number) => {
      if (value < 0 || value > 100) return { valid: false, error: 'Le pourcentage doit être entre 0 et 100' };
      return { valid: true };
    };

    it('should accept valid percentage', () => {
      expect(validatePercentage(0).valid).toBe(true);
      expect(validatePercentage(50).valid).toBe(true);
      expect(validatePercentage(100).valid).toBe(true);
    });

    it('should reject invalid percentage', () => {
      expect(validatePercentage(-1).valid).toBe(false);
      expect(validatePercentage(101).valid).toBe(false);
    });
  });

  describe('validateCurrency', () => {
    const validateCurrency = (currency: string) => ['EUR', 'USD', 'GBP', 'CHF', 'CAD'].includes(currency);

    it('should accept valid currency', () => {
      expect(validateCurrency('EUR')).toBe(true);
      expect(validateCurrency('USD')).toBe(true);
    });

    it('should reject invalid currency', () => {
      expect(validateCurrency('INVALID')).toBe(false);
      expect(validateCurrency('')).toBe(false);
    });
  });

  describe('validateLanguage', () => {
    const validateLanguage = (lang: string) => ['fr', 'en', 'es', 'de', 'it', 'pt', 'nl'].includes(lang);

    it('should accept valid language', () => {
      expect(validateLanguage('fr')).toBe(true);
      expect(validateLanguage('en')).toBe(true);
    });

    it('should reject invalid language', () => {
      expect(validateLanguage('xx')).toBe(false);
      expect(validateLanguage('')).toBe(false);
    });
  });

  describe('validateTimezone', () => {
    const validateTimezone = (tz: string) => {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
      } catch {
        return false;
      }
    };

    it('should accept valid timezone', () => {
      expect(validateTimezone('Europe/Paris')).toBe(true);
      expect(validateTimezone('America/New_York')).toBe(true);
      expect(validateTimezone('UTC')).toBe(true);
    });

    it('should reject invalid timezone', () => {
      expect(validateTimezone('Invalid/Zone')).toBe(false);
      expect(validateTimezone('')).toBe(false);
    });
  });

  describe('validatePagination', () => {
    const validatePagination = (page: number, limit: number) => {
      if (page < 1) return { valid: false, error: 'La page doit être supérieure à 0' };
      if (limit < 1 || limit > 100) return { valid: false, error: 'La limite doit être entre 1 et 100' };
      return { valid: true };
    };

    it('should accept valid pagination', () => {
      expect(validatePagination(1, 10).valid).toBe(true);
      expect(validatePagination(5, 50).valid).toBe(true);
    });

    it('should reject invalid page', () => {
      expect(validatePagination(0, 10).valid).toBe(false);
      expect(validatePagination(-1, 10).valid).toBe(false);
    });

    it('should reject invalid limit', () => {
      expect(validatePagination(1, 0).valid).toBe(false);
      expect(validatePagination(1, 101).valid).toBe(false);
    });
  });

  describe('validateFileSize', () => {
    const validateFileSize = (size: number, maxSize: number = 100 * 1024 * 1024) => {
      if (size <= 0) return { valid: false, error: 'La taille du fichier doit être supérieure à 0' };
      if (size > maxSize) return { valid: false, error: 'Le fichier est trop volumineux' };
      return { valid: true };
    };

    it('should accept valid file size', () => {
      expect(validateFileSize(1024).valid).toBe(true);
      expect(validateFileSize(50 * 1024 * 1024).valid).toBe(true);
    });

    it('should reject zero size', () => {
      expect(validateFileSize(0).valid).toBe(false);
    });

    it('should reject too large file', () => {
      expect(validateFileSize(150 * 1024 * 1024).valid).toBe(false);
    });
  });

  describe('validateFileType', () => {
    const validateFileType = (ext: string, allowed: string[]) => allowed.includes(ext.toLowerCase());

    it('should accept valid file type', () => {
      const allowed = ['pdf', 'docx', 'xlsx', 'png', 'jpg'];
      expect(validateFileType('pdf', allowed)).toBe(true);
      expect(validateFileType('PNG', allowed)).toBe(true);
    });

    it('should reject invalid file type', () => {
      const allowed = ['pdf', 'docx', 'xlsx'];
      expect(validateFileType('exe', allowed)).toBe(false);
      expect(validateFileType('bat', allowed)).toBe(false);
    });
  });

  describe('validateJsonSchema', () => {
    const validateJsonSchema = (data: any, required: string[]) => {
      const missing = required.filter(k => data[k] === undefined || data[k] === null);
      return missing.length === 0 ? { valid: true } : { valid: false, missing };
    };

    it('should accept valid data', () => {
      const data = { name: 'Test', email: 'test@test.com' };
      expect(validateJsonSchema(data, ['name', 'email']).valid).toBe(true);
    });

    it('should reject missing fields', () => {
      const data = { name: 'Test' };
      const result = validateJsonSchema(data, ['name', 'email']);
      expect(result.valid).toBe(false);
      expect(result.missing).toContain('email');
    });

    it('should reject null fields', () => {
      const data = { name: 'Test', email: null };
      const result = validateJsonSchema(data, ['name', 'email']);
      expect(result.valid).toBe(false);
    });
  });

  describe('validateArrayNotEmpty', () => {
    const validateArrayNotEmpty = (arr: any[]) => {
      if (!Array.isArray(arr) || arr.length === 0) return { valid: false, error: 'Le tableau ne peut pas être vide' };
      return { valid: true };
    };

    it('should accept non-empty array', () => {
      expect(validateArrayNotEmpty([1, 2, 3]).valid).toBe(true);
    });

    it('should reject empty array', () => {
      expect(validateArrayNotEmpty([]).valid).toBe(false);
    });

    it('should reject non-array', () => {
      expect(validateArrayNotEmpty('not an array' as any).valid).toBe(false);
    });
  });

  describe('validateUniqueArray', () => {
    const validateUniqueArray = (arr: any[]) => {
      const unique = new Set(arr);
      return unique.size === arr.length;
    };

    it('should accept unique array', () => {
      expect(validateUniqueArray([1, 2, 3])).toBe(true);
    });

    it('should reject non-unique array', () => {
      expect(validateUniqueArray([1, 2, 2, 3])).toBe(false);
    });
  });

  describe('validateHexColor', () => {
    const validateHexColor = (color: string) => /^#[0-9A-Fa-f]{6}$/.test(color);

    it('should accept valid hex color', () => {
      expect(validateHexColor('#000000')).toBe(true);
      expect(validateHexColor('#FFFFFF')).toBe(true);
      expect(validateHexColor('#FF5733')).toBe(true);
    });

    it('should reject invalid hex color', () => {
      expect(validateHexColor('000000')).toBe(false);
      expect(validateHexColor('#FFF')).toBe(false);
      expect(validateHexColor('#GGGGGG')).toBe(false);
    });
  });

  describe('validateSlug', () => {
    const validateSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

    it('should accept valid slug', () => {
      expect(validateSlug('my-page')).toBe(true);
      expect(validateSlug('hello-world-123')).toBe(true);
      expect(validateSlug('simple')).toBe(true);
    });

    it('should reject invalid slug', () => {
      expect(validateSlug('My-Page')).toBe(false);
      expect(validateSlug('my_page')).toBe(false);
      expect(validateSlug('-invalid')).toBe(false);
      expect(validateSlug('invalid-')).toBe(false);
    });
  });

  describe('validateBoolean', () => {
    const validateBoolean = (value: any) => typeof value === 'boolean';

    it('should accept boolean values', () => {
      expect(validateBoolean(true)).toBe(true);
      expect(validateBoolean(false)).toBe(true);
    });

    it('should reject non-boolean values', () => {
      expect(validateBoolean('true')).toBe(false);
      expect(validateBoolean(1)).toBe(false);
      expect(validateBoolean(null)).toBe(false);
    });
  });

  describe('validateInteger', () => {
    const validateInteger = (value: any) => Number.isInteger(value);

    it('should accept integers', () => {
      expect(validateInteger(0)).toBe(true);
      expect(validateInteger(42)).toBe(true);
      expect(validateInteger(-5)).toBe(true);
    });

    it('should reject non-integers', () => {
      expect(validateInteger(3.14)).toBe(false);
      expect(validateInteger('42')).toBe(false);
      expect(validateInteger(NaN)).toBe(false);
    });
  });

  describe('validatePositiveNumber', () => {
    const validatePositiveNumber = (value: number) => typeof value === 'number' && value > 0;

    it('should accept positive numbers', () => {
      expect(validatePositiveNumber(1)).toBe(true);
      expect(validatePositiveNumber(0.5)).toBe(true);
      expect(validatePositiveNumber(100)).toBe(true);
    });

    it('should reject non-positive numbers', () => {
      expect(validatePositiveNumber(0)).toBe(false);
      expect(validatePositiveNumber(-1)).toBe(false);
    });
  });

  describe('validateUUID', () => {
    const validateUUID = (uuid: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);

    it('should accept valid UUID', () => {
      expect(validateUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    });

    it('should reject invalid UUID', () => {
      expect(validateUUID('invalid')).toBe(false);
      expect(validateUUID('550e8400-e29b-41d4-a716')).toBe(false);
    });
  });

  describe('validateStatusTransition', () => {
    const validTransitions: Record<string, string[]> = {
      active: ['inactive', 'suspended', 'terminated'],
      inactive: ['active'],
      suspended: ['active', 'terminated'],
      terminated: [],
    };

    const validateStatusTransition = (from: string, to: string) => {
      if (!validTransitions[from]) return { valid: false, error: 'Statut source invalide' };
      if (!validTransitions[from].includes(to)) return { valid: false, error: 'Transition invalide' };
      return { valid: true };
    };

    it('should accept valid transitions', () => {
      expect(validateStatusTransition('active', 'inactive').valid).toBe(true);
      expect(validateStatusTransition('suspended', 'active').valid).toBe(true);
    });

    it('should reject invalid transitions', () => {
      expect(validateStatusTransition('terminated', 'active').valid).toBe(false);
      expect(validateStatusTransition('active', 'terminated').valid).toBe(true);
    });

    it('should reject unknown status', () => {
      expect(validateStatusTransition('unknown', 'active').valid).toBe(false);
    });
  });
});
