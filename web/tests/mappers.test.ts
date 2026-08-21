// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { toCamelCase, toSnakeCase, mapKeysToCamel, mapKeysToSnake } from '@/lib/utils/mappers';

describe('toCamelCase', () => {
  it('converts snake_case to camelCase', () => {
    expect(toCamelCase('first_name')).toBe('firstName');
    expect(toCamelCase('last_name')).toBe('lastName');
    expect(toCamelCase('school_id')).toBe('schoolId');
  });

  it('leaves camelCase unchanged', () => {
    expect(toCamelCase('firstName')).toBe('firstName');
  });

  it('handles empty string', () => {
    expect(toCamelCase('')).toBe('');
  });
});

describe('toSnakeCase', () => {
  it('converts camelCase to snake_case', () => {
    expect(toSnakeCase('firstName')).toBe('first_name');
    expect(toSnakeCase('lastName')).toBe('last_name');
    expect(toSnakeCase('schoolId')).toBe('school_id');
  });

  it('leaves snake_case unchanged', () => {
    expect(toSnakeCase('first_name')).toBe('first_name');
  });
});

describe('mapKeysToCamel', () => {
  it('converts flat object keys', () => {
    const input = { first_name: 'John', last_name: 'Doe' };
    const result = mapKeysToCamel(input);
    expect(result).toEqual({ firstName: 'John', lastName: 'Doe' });
  });

  it('converts nested object keys', () => {
    const input = { user_data: { first_name: 'John', school_id: 1 } };
    const result = mapKeysToCamel(input);
    expect(result).toEqual({ userData: { firstName: 'John', schoolId: 1 } });
  });

  it('converts array of objects', () => {
    const input = [{ first_name: 'John' }, { first_name: 'Jane' }];
    const result = mapKeysToCamel(input);
    expect(result).toEqual([{ firstName: 'John' }, { firstName: 'Jane' }]);
  });

  it('returns null/undefined as-is', () => {
    expect(mapKeysToCamel(null)).toBeNull();
    expect(mapKeysToCamel(undefined)).toBeUndefined();
  });

  it('returns primitives as-is', () => {
    expect(mapKeysToCamel(42)).toBe(42);
    expect(mapKeysToCamel('hello')).toBe('hello');
  });
});

describe('mapKeysToSnake', () => {
  it('converts flat object keys', () => {
    const input = { firstName: 'John', lastName: 'Doe' };
    const result = mapKeysToSnake(input);
    expect(result).toEqual({ first_name: 'John', last_name: 'Doe' });
  });

  it('converts nested object keys', () => {
    const input = { userData: { firstName: 'John', schoolId: 1 } };
    const result = mapKeysToSnake(input);
    expect(result).toEqual({ user_data: { first_name: 'John', school_id: 1 } });
  });

  it('returns null/undefined as-is', () => {
    expect(mapKeysToSnake(null)).toBeNull();
    expect(mapKeysToSnake(undefined)).toBeUndefined();
  });
});
