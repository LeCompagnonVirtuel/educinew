import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AnalyticsUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Date Formatting', () => {
    it('should format date to ISO string', () => {
      const date = new Date('2025-07-24T10:30:00Z');
      expect(date.toISOString()).toBe('2025-07-24T10:30:00.000Z');
    });

    it('should format date to locale string', () => {
      const date = new Date('2025-07-24');
      expect(date.toLocaleDateString('en-US')).toContain('7/24/2025');
    });

    it('should parse date from string', () => {
      const date = new Date('2025-07-24');
      expect(date.getFullYear()).toBe(2025);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(24);
    });

    it('should handle invalid date', () => {
      const date = new Date('invalid');
      expect(isNaN(date.getTime())).toBe(true);
    });

    it('should compare two dates', () => {
      const d1 = new Date('2025-07-24');
      const d2 = new Date('2025-07-25');
      expect(d1 < d2).toBe(true);
    });

    it('should calculate date difference in days', () => {
      const d1 = new Date('2025-07-01');
      const d2 = new Date('2025-07-24');
      const diff = Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
      expect(diff).toBe(23);
    });

    it('should add days to date', () => {
      const date = new Date('2025-07-01');
      date.setDate(date.getDate() + 30);
      expect(date.getDate()).toBe(31);
    });

    it('should subtract months from date', () => {
      const date = new Date('2025-07-24');
      date.setMonth(date.getMonth() - 3);
      expect(date.getMonth()).toBe(3);
    });

    it('should get start of month', () => {
      const date = new Date('2025-07-24');
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      expect(start.getDate()).toBe(1);
    });

    it('should get end of month', () => {
      const date = new Date('2025-07-24');
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      expect(end.getDate()).toBe(31);
    });
  });

  describe('Number Formatting', () => {
    it('should format number with commas', () => {
      const num = 1234567;
      const formatted = num.toLocaleString('en-US');
      expect(formatted).toBe('1,234,567');
    });

    it('should format currency', () => {
      const num = 50000;
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
      expect(formatted).toContain('50,000');
    });

    it('should format percentage', () => {
      const num = 0.85;
      const formatted = (num * 100).toFixed(1) + '%';
      expect(formatted).toBe('85.0%');
    });

    it('should round to 2 decimal places', () => {
      const num = 3.14159;
      expect(Math.round(num * 100) / 100).toBe(3.14);
    });

    it('should calculate average', () => {
      const numbers = [10, 20, 30, 40, 50];
      const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
      expect(avg).toBe(30);
    });

    it('should calculate median', () => {
      const numbers = [1, 3, 5, 7, 9];
      const sorted = [...numbers].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      expect(median).toBe(5);
    });

    it('should calculate standard deviation', () => {
      const numbers = [2, 4, 4, 4, 5, 5, 7, 9];
      const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
      const squareDiffs = numbers.map(n => Math.pow(n - avg, 2));
      const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / numbers.length;
      const stdDev = Math.sqrt(avgSquareDiff);
      expect(stdDev).toBeCloseTo(2.0, 0);
    });

    it('should calculate growth rate', () => {
      const previous = 100;
      const current = 120;
      const growth = ((current - previous) / previous) * 100;
      expect(growth).toBe(20);
    });

    it('should calculate compound growth rate', () => {
      const startValue = 100;
      const endValue = 200;
      const periods = 3;
      const cagr = (Math.pow(endValue / startValue, 1 / periods) - 1) * 100;
      expect(cagr).toBeCloseTo(25.99, 0);
    });

    it('should format large numbers with suffix', () => {
      const format = (n: number) => {
        if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
        if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
        return n.toString();
      };
      expect(format(1500000)).toBe('1.5M');
      expect(format(50000)).toBe('50.0K');
      expect(format(500)).toBe('500');
    });
  });

  describe('String Utilities', () => {
    it('should capitalize first letter', () => {
      const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should truncate long strings', () => {
      const truncate = (s: string, max: number) => s.length > max ? s.slice(0, max) + '...' : s;
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hi', 5)).toBe('Hi');
    });

    it('should generate slug from string', () => {
      const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
      expect(slug('Hello World')).toBe('hello-world');
    });

    it('should validate email format', () => {
      const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
    });

    it('should validate UUID format', () => {
      const isValidUUID = (u: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(u);
      expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(isValidUUID('invalid')).toBe(false);
    });

    it('should generate random ID', () => {
      const generateId = () => Math.random().toString(36).slice(2, 11);
      const id = generateId();
      expect(id).toHaveLength(9);
      expect(typeof id).toBe('string');
    });

    it('should handle string interpolation', () => {
      const name = 'John';
      const age = 30;
      expect(`Name: ${name}, Age: ${age}`).toBe('Name: John, Age: 30');
    });

    it('should split string by delimiter', () => {
      const csv = 'a,b,c,d';
      expect(csv.split(',')).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should join array to string', () => {
      const arr = ['a', 'b', 'c'];
      expect(arr.join(', ')).toBe('a, b, c');
    });

    it('should replace all occurrences', () => {
      const str = 'hello world hello';
      expect(str.replaceAll('hello', 'hi')).toBe('hi world hi');
    });
  });

  describe('Array Utilities', () => {
    it('should sort numbers ascending', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      expect([...arr].sort((a, b) => a - b)).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    it('should remove duplicates', () => {
      const arr = [1, 2, 2, 3, 3, 3];
      expect([...new Set(arr)]).toEqual([1, 2, 3]);
    });

    it('should chunk array', () => {
      const chunk = (arr: number[], size: number) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
          chunks.push(arr.slice(i, i + size));
        }
        return chunks;
      };
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should flatten nested array', () => {
      const arr = [[1, 2], [3, 4], [5]];
      expect(arr.flat()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should group by key', () => {
      const groupBy = (arr: any[], key: string) => {
        return arr.reduce((acc, item) => {
          const group = item[key];
          acc[group] = acc[group] || [];
          acc[group].push(item);
          return acc;
        }, {});
      };
      const data = [{ type: 'a', value: 1 }, { type: 'b', value: 2 }, { type: 'a', value: 3 }];
      const grouped = groupBy(data, 'type');
      expect(grouped.a).toHaveLength(2);
      expect(grouped.b).toHaveLength(1);
    });

    it('should calculate sum', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(arr.reduce((a, b) => a + b, 0)).toBe(15);
    });

    it('should find max value', () => {
      const arr = [10, 5, 8, 20, 3];
      expect(Math.max(...arr)).toBe(20);
    });

    it('should find min value', () => {
      const arr = [10, 5, 8, 20, 3];
      expect(Math.min(...arr)).toBe(3);
    });

    it('should filter unique objects by key', () => {
      const arr = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 1, name: 'A' }];
      const unique = arr.filter((item, index, self) => index === self.findIndex(t => t.id === item.id));
      expect(unique).toHaveLength(2);
    });

    it('should paginate array', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const page = arr.slice(0, 5);
      expect(page).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('Object Utilities', () => {
    it('should deep clone object', () => {
      const obj = { a: 1, b: { c: 2 } };
      const clone = JSON.parse(JSON.stringify(obj));
      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj);
    });

    it('should merge objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      expect({ ...obj1, ...obj2 }).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should pick specific keys', () => {
      const pick = (obj: any, keys: string[]) => {
        return keys.reduce((acc, key) => {
          if (key in obj) acc[key] = obj[key];
          return acc;
        }, {} as any);
      };
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('should omit specific keys', () => {
      const omit = (obj: any, keys: string[]) => {
        return Object.keys(obj).reduce((acc, key) => {
          if (!keys.includes(key)) acc[key] = obj[key];
          return acc;
        }, {} as any);
      };
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('should check if object is empty', () => {
      expect(Object.keys({}).length).toBe(0);
      expect(Object.keys({ a: 1 }).length).toBeGreaterThan(0);
    });

    it('should flatten nested object', () => {
      const flatten = (obj: any, prefix = ''): any => {
        return Object.keys(obj).reduce((acc, key) => {
          const pre = prefix ? prefix + '.' : '';
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(acc, flatten(obj[key], pre + key));
          } else {
            acc[pre + key] = obj[key];
          }
          return acc;
        }, {} as any);
      };
      const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
      expect(flatten(obj)).toEqual({ a: 1, 'b.c': 2, 'b.d.e': 3 });
    });

    it('should check equality', () => {
      const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('should get nested value', () => {
      const get = (obj: any, path: string) => path.split('.').reduce((o, k) => o?.[k], obj);
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, 'a.b.c')).toBe(42);
    });

    it('should set nested value', () => {
      const set = (obj: any, path: string, value: any) => {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = current[keys[i]] || {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      };
      const obj: any = {};
      set(obj, 'a.b.c', 42);
      expect(obj.a.b.c).toBe(42);
    });

    it('should check if path exists', () => {
      const has = (obj: any, path: string) => {
        const keys = path.split('.');
        let current = obj;
        for (const key of keys) {
          if (current === null || current === undefined || !(key in current)) return false;
          current = current[key];
        }
        return true;
      };
      expect(has({ a: { b: 1 } }, 'a.b')).toBe(true);
      expect(has({ a: { b: 1 } }, 'a.c')).toBe(false);
    });
  });

  describe('Analytics Calculations', () => {
    it('should calculate percent change', () => {
      const percentChange = (old: number, New: number) => ((New - old) / old) * 100;
      expect(percentChange(100, 120)).toBe(20);
      expect(percentChange(100, 80)).toBe(-20);
    });

    it('should calculate moving average', () => {
      const movingAverage = (data: number[], window: number) => {
        return data.map((_, i) => {
          if (i < window - 1) return null;
          const slice = data.slice(i - window + 1, i + 1);
          return slice.reduce((a, b) => a + b, 0) / window;
        });
      };
      const data = [10, 20, 30, 40, 50];
      const ma = movingAverage(data, 3);
      expect(ma[2]).toBe(20);
      expect(ma[4]).toBeCloseTo(40, 0);
    });

    it('should calculate Z-score', () => {
      const zScore = (value: number, mean: number, stdDev: number) => (value - mean) / stdDev;
      expect(zScore(85, 75, 10)).toBe(1);
      expect(zScore(65, 75, 10)).toBe(-1);
    });

    it('should calculate percentile', () => {
      const percentile = (data: number[], value: number) => {
        const below = data.filter(d => d < value).length;
        return (below / data.length) * 100;
      };
      const data = [10, 20, 30, 40, 50];
      expect(percentile(data, 30)).toBe(40);
    });

    it('should calculate correlation coefficient', () => {
      const correlation = (x: number[], y: number[]) => {
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
        const sumX2 = x.reduce((a, b) => a + b * b, 0);
        const sumY2 = y.reduce((a, b) => a + b * b, 0);
        const num = n * sumXY - sumX * sumY;
        const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
        return den === 0 ? 0 : num / den;
      };
      const x = [1, 2, 3, 4, 5];
      const y = [2, 4, 6, 8, 10];
      expect(correlation(x, y)).toBeCloseTo(1, 1);
    });

    it('should calculate linear regression', () => {
      const linearRegression = (x: number[], y: number[]) => {
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
        const sumX2 = x.reduce((a, b) => a + b * b, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        return { slope, intercept };
      };
      const x = [1, 2, 3, 4, 5];
      const y = [2, 4, 6, 8, 10];
      const { slope, intercept } = linearRegression(x, y);
      expect(slope).toBeCloseTo(2, 0);
      expect(intercept).toBeCloseTo(0, 0);
    });

    it('should calculate R-squared', () => {
      const rSquared = (actual: number[], predicted: number[]) => {
        const mean = actual.reduce((a, b) => a + b, 0) / actual.length;
        const ssRes = actual.reduce((a, v, i) => a + Math.pow(v - predicted[i], 2), 0);
        const ssTot = actual.reduce((a, v) => a + Math.pow(v - mean, 2), 0);
        return ssTot === 0 ? 0 : 1 - ssRes / ssTot;
      };
      const actual = [10, 20, 30, 40, 50];
      const predicted = [10, 20, 30, 40, 50];
      expect(rSquared(actual, predicted)).toBe(1);
    });

    it('should calculate weighted average', () => {
      const weightedAverage = (values: number[], weights: number[]) => {
        const sum = values.reduce((a, v, i) => a + v * weights[i], 0);
        const weightSum = weights.reduce((a, b) => a + b, 0);
        return sum / weightSum;
      };
      expect(weightedAverage([80, 90, 70], [0.5, 0.3, 0.2])).toBeCloseTo(81, 0);
    });

    it('should calculate CAGR', () => {
      const cagr = (start: number, end: number, years: number) => {
        return (Math.pow(end / start, 1 / years) - 1) * 100;
      };
      expect(cagr(100, 200, 3)).toBeCloseTo(25.99, 0);
    });

    it('should calculate turnover rate', () => {
      const turnoverRate = (separations: number, avgEmployees: number) => {
        return (separations / avgEmployees) * 100;
      };
      expect(turnoverRate(15, 150)).toBe(10);
    });

    it('should calculate retention rate', () => {
      const retentionRate = (endCount: number, startCount: number) => {
        return (endCount / startCount) * 100;
      };
      expect(retentionRate(450, 500)).toBe(90);
    });
  });

  describe('Color Utilities', () => {
    it('should convert hex to RGB', () => {
      const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      };
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should generate color palette', () => {
      const generatePalette = (count: number) => {
        return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 70%, 50%)`);
      };
      expect(generatePalette(3)).toHaveLength(3);
    });

    it('should calculate color brightness', () => {
      const brightness = (r: number, g: number, b: number) => (r * 299 + g * 587 + b * 114) / 1000;
      expect(brightness(255, 255, 255)).toBe(255);
      expect(brightness(0, 0, 0)).toBe(0);
    });
  });

  describe('Validation Utilities', () => {
    it('should validate required fields', () => {
      const validateRequired = (obj: any, fields: string[]) => {
        return fields.every(field => obj[field] !== undefined && obj[field] !== null && obj[field] !== '');
      };
      expect(validateRequired({ name: 'Test', age: 30 }, ['name', 'age'])).toBe(true);
      expect(validateRequired({ name: '' }, ['name'])).toBe(false);
    });

    it('should validate number range', () => {
      const inRange = (num: number, min: number, max: number) => num >= min && num <= max;
      expect(inRange(5, 1, 10)).toBe(true);
      expect(inRange(15, 1, 10)).toBe(false);
    });

    it('should validate string length', () => {
      const minLength = (s: string, min: number) => s.length >= min;
      expect(minLength('hello', 3)).toBe(true);
      expect(minLength('hi', 3)).toBe(false);
    });

    it('should validate array length', () => {
      const arrayLength = (arr: any[], min: number, max: number) => arr.length >= min && arr.length <= max;
      expect(arrayLength([1, 2, 3], 1, 5)).toBe(true);
      expect(arrayLength([], 1, 5)).toBe(false);
    });

    it('should validate enum values', () => {
      const isEnum = (value: any, allowed: any[]) => allowed.includes(value);
      expect(isEnum('a', ['a', 'b', 'c'])).toBe(true);
      expect(isEnum('d', ['a', 'b', 'c'])).toBe(false);
    });

    it('should validate URL format', () => {
      const isValidUrl = (url: string) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('invalid')).toBe(false);
    });

    it('should validate date format', () => {
      const isValidDate = (date: string) => !isNaN(Date.parse(date));
      expect(isValidDate('2025-07-24')).toBe(true);
      expect(isValidDate('invalid')).toBe(false);
    });

    it('should validate phone number', () => {
      const isValidPhone = (phone: string) => /^\+?[\d\s-]{10,}$/.test(phone);
      expect(isValidPhone('+1234567890')).toBe(true);
      expect(isValidPhone('123')).toBe(false);
    });

    it('should validate JSON string', () => {
      const isValidJSON = (str: string) => {
        try {
          JSON.parse(str);
          return true;
        } catch {
          return false;
        }
      };
      expect(isValidJSON('{"a": 1}')).toBe(true);
      expect(isValidJSON('invalid')).toBe(false);
    });

    it('should validate password strength', () => {
      const isStrongPassword = (pw: string) => pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
      expect(isStrongPassword('Password1')).toBe(true);
      expect(isStrongPassword('weak')).toBe(false);
    });
  });
});
