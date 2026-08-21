export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function mapKeysToCamel<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(mapKeysToCamel) as T;
  if (typeof obj !== 'object') return obj;

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = toCamelCase(key);
      result[camelKey] = mapKeysToCamel((obj as any)[key]);
    }
  }
  return result;
}

export function mapKeysToSnake<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(mapKeysToSnake) as T;
  if (typeof obj !== 'object') return obj;

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = toSnakeCase(key);
      result[snakeKey] = mapKeysToSnake((obj as any)[key]);
    }
  }
  return result;
}
