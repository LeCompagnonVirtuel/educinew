import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('DataTransformation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Data Normalization', () => {
    it('should normalize data to 0-1 range', () => {
      const normalize = (value: number, min: number, max: number) => (value - min) / (max - min);
      expect(normalize(50, 0, 100)).toBe(0.5);
      expect(normalize(0, 0, 100)).toBe(0);
      expect(normalize(100, 0, 100)).toBe(1);
    });

    it('should normalize to percentage', () => {
      const toPercent = (value: number, total: number) => (value / total) * 100;
      expect(toPercent(25, 100)).toBe(25);
      expect(toPercent(1, 3)).toBeCloseTo(33.33, 1);
    });

    it('should min-max scale data', () => {
      const minMaxScale = (data: number[]) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
        return data.map(v => (v - min) / (max - min));
      };
      expect(minMaxScale([10, 20, 30])).toEqual([0, 0.5, 1]);
    });

    it('should z-score normalize data', () => {
      const zNormalize = (data: number[]) => {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        const stdDev = Math.sqrt(data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length);
        return data.map(v => (v - mean) / stdDev);
      };
      const normalized = zNormalize([10, 20, 30, 40, 50]);
      expect(normalized[2]).toBeCloseTo(0, 0);
    });

    it('should log scale data', () => {
      const logScale = (data: number[]) => data.map(v => Math.log10(v));
      expect(logScale([1, 10, 100, 1000])).toEqual([0, 1, 2, 3]);
    });
  });

  describe('Data Aggregation', () => {
    it('should sum array', () => {
      expect([1, 2, 3, 4, 5].reduce((a, b) => a + b, 0)).toBe(15);
    });

    it('should calculate average', () => {
      const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
      expect(avg([10, 20, 30])).toBe(20);
    });

    it('should calculate weighted average', () => {
      const weightedAvg = (values: number[], weights: number[]) => {
        return values.reduce((a, v, i) => a + v * weights[i], 0) / weights.reduce((a, b) => a + b, 0);
      };
      expect(weightedAvg([80, 90], [0.7, 0.3])).toBeCloseTo(83, 0);
    });

    it('should group and count', () => {
      const groupByCount = (arr: string[]) => {
        return arr.reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      };
      expect(groupByCount(['a', 'b', 'a', 'c', 'a'])).toEqual({ a: 3, b: 1, c: 1 });
    });

    it('should group and sum', () => {
      const groupBySum = (arr: { category: string; value: number }[]) => {
        return arr.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + item.value;
          return acc;
        }, {} as Record<string, number>);
      };
      const data = [{ category: 'A', value: 10 }, { category: 'A', value: 20 }, { category: 'B', value: 15 }];
      expect(groupBySum(data)).toEqual({ A: 30, B: 15 });
    });

    it('should pivot data', () => {
      const pivot = (arr: { row: string; col: string; value: number }[]) => {
        return arr.reduce((acc, item) => {
          if (!acc[item.row]) acc[item.row] = {};
          acc[item.row][item.col] = item.value;
          return acc;
        }, {} as Record<string, Record<string, number>>);
      };
      const data = [{ row: 'R1', col: 'C1', value: 1 }, { row: 'R1', col: 'C2', value: 2 }];
      expect(pivot(data)).toEqual({ R1: { C1: 1, C2: 2 } });
    });

    it('should calculate cumulative sum', () => {
      const cumulative = (arr: number[]) => {
        return arr.reduce((acc, val) => {
          const last = acc.length > 0 ? acc[acc.length - 1] : 0;
          acc.push(last + val);
          return acc;
        }, [] as number[]);
      };
      expect(cumulative([1, 2, 3, 4])).toEqual([1, 3, 6, 10]);
    });

    it('should calculate percentage distribution', () => {
      const distribution = (arr: number[]) => {
        const total = arr.reduce((a, b) => a + b, 0);
        return arr.map(v => (v / total) * 100);
      };
      expect(distribution([25, 25, 50])).toEqual([25, 25, 50]);
    });
  });

  describe('Time Series Transformations', () => {
    it('should resample by period', () => {
      const resample = (data: { date: string; value: number }[], period: string) => {
        return data.reduce((acc, item) => {
          const key = item.date.slice(0, period === 'month' ? 7 : 10);
          if (!acc[key]) acc[key] = [];
          acc[key].push(item.value);
          return acc;
        }, {} as Record<string, number[]>);
      };
      const data = [
        { date: '2025-07-01', value: 10 },
        { date: '2025-07-02', value: 20 },
        { date: '2025-08-01', value: 30 },
      ];
      const resampled = resample(data, 'month');
      expect(resampled['2025-07']).toEqual([10, 20]);
      expect(resampled['2025-08']).toEqual([30]);
    });

    it('should interpolate missing values', () => {
      const interpolate = (arr: (number | null)[]) => {
        const result = [...arr];
        for (let i = 0; i < result.length; i++) {
          if (result[i] === null) {
            let prev = i - 1;
            let next = i + 1;
            while (prev >= 0 && result[prev] === null) prev--;
            while (next < result.length && result[next] === null) next++;
            if (prev >= 0 && next < result.length) {
              result[i] = ((result[prev] as number) + (result[next] as number)) / 2;
            }
          }
        }
        return result;
      };
      expect(interpolate([10, null, 30])).toEqual([10, 20, 30]);
    });

    it('should calculate rolling window', () => {
      const rollingWindow = (arr: number[], window: number) => {
        return arr.map((_, i) => {
          if (i < window - 1) return null;
          return arr.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0) / window;
        });
      };
      expect(rollingWindow([1, 2, 3, 4, 5], 3)).toEqual([null, null, 2, 3, 4]);
    });

    it('should detect trend direction', () => {
      const detectTrend = (data: number[]) => {
        if (data.length < 2) return 'stable';
        const first = data.slice(0, Math.floor(data.length / 2));
        const second = data.slice(Math.floor(data.length / 2));
        const avgFirst = first.reduce((a, b) => a + b, 0) / first.length;
        const avgSecond = second.reduce((a, b) => a + b, 0) / second.length;
        if (avgSecond > avgFirst * 1.05) return 'increasing';
        if (avgSecond < avgFirst * 0.95) return 'decreasing';
        return 'stable';
      };
      expect(detectTrend([10, 20, 30, 40, 50])).toBe('increasing');
      expect(detectTrend([50, 40, 30, 20, 10])).toBe('decreasing');
      expect(detectTrend([25, 26, 25, 24, 25])).toBe('stable');
    });

    it('should calculate seasonality index', () => {
      const seasonalityIndex = (monthlyData: number[]) => {
        const avg = monthlyData.reduce((a, b) => a + b, 0) / monthlyData.length;
        return monthlyData.map(v => v / avg);
      };
      expect(seasonalityIndex([80, 100, 120])).toEqual([0.8, 1.0, 1.2]);
    });

    it('should fill forward missing values', () => {
      const fillForward = (arr: (number | null)[]) => {
        const result = [...arr];
        let lastValid = null;
        for (let i = 0; i < result.length; i++) {
          if (result[i] !== null) lastValid = result[i];
          else if (lastValid !== null) result[i] = lastValid;
        }
        return result;
      };
      expect(fillForward([10, null, null, 30, null])).toEqual([10, 10, 10, 30, 30]);
    });

    it('should calculate year-over-year change', () => {
      const yoyChange = (current: number[], previous: number[]) => {
        return current.map((v, i) => ((v - previous[i]) / previous[i]) * 100);
      };
      expect(yoyChange([120, 130], [100, 100])).toEqual([20, 30]);
    });

    it('should aggregate by quarter', () => {
      const aggregateByQuarter = (monthlyData: number[]) => {
        const quarters = [];
        for (let i = 0; i < monthlyData.length; i += 3) {
          quarters.push(monthlyData.slice(i, i + 3).reduce((a, b) => a + b, 0));
        }
        return quarters;
      };
      expect(aggregateByQuarter([10, 20, 30, 40, 50, 60])).toEqual([60, 150]);
    });
  });

  describe('Chart Data Transformations', () => {
    it('should transform to line chart format', () => {
      const toLineChart = (labels: string[], datasets: { name: string; data: number[] }[]) => {
        return { labels, datasets: datasets.map(d => ({ label: d.name, data: d.data, fill: false, tension: 0.1 })) };
      };
      const result = toLineChart(['Jan', 'Feb'], [{ name: 'Revenue', data: [100, 200] }]);
      expect(result.labels).toHaveLength(2);
      expect(result.datasets).toHaveLength(1);
    });

    it('should transform to pie chart format', () => {
      const toPieChart = (data: { label: string; value: number }[]) => {
        return { labels: data.map(d => d.label), datasets: [{ data: data.map(d => d.value) }] };
      };
      const result = toPieChart([{ label: 'Male', value: 250 }, { label: 'Female', value: 270 }]);
      expect(result.labels).toEqual(['Male', 'Female']);
      expect(result.datasets[0].data).toEqual([250, 270]);
    });

    it('should transform to bar chart format', () => {
      const toBarChart = (data: { label: string; value: number }[]) => {
        return { labels: data.map(d => d.label), datasets: [{ data: data.map(d => d.value), backgroundColor: data.map((_, i) => `hsl(${i * 60}, 70%, 50%)`) }] };
      };
      const result = toBarChart([{ label: 'A', value: 10 }, { label: 'B', value: 20 }]);
      expect(result.datasets[0].backgroundColor).toHaveLength(2);
    });

    it('should transform to heatmap format', () => {
      const toHeatmap = (data: { row: string; col: string; value: number }[]) => {
        const rows = [...new Set(data.map(d => d.row))];
        const cols = [...new Set(data.map(d => d.col))];
        const values = rows.map(row => cols.map(col => {
          const item = data.find(d => d.row === row && d.col === col);
          return item ? item.value : 0;
        }));
        return { rows, cols, values };
      };
      const data = [{ row: 'R1', col: 'C1', value: 10 }, { row: 'R1', col: 'C2', value: 20 }];
      const result = toHeatmap(data);
      expect(result.rows).toEqual(['R1']);
      expect(result.cols).toEqual(['C1', 'C2']);
    });

    it('should transform to funnel format', () => {
      const toFunnel = (stages: { name: string; count: number }[]) => {
        return stages.map((s, i) => ({
          ...s,
          percentage: i === 0 ? 100 : (s.count / stages[0].count) * 100,
        }));
      };
      const result = toFunnel([{ name: 'Applied', count: 200 }, { name: 'Accepted', count: 100 }]);
      expect(result[0].percentage).toBe(100);
      expect(result[1].percentage).toBe(50);
    });

    it('should transform to radar chart format', () => {
      const toRadar = (categories: string[], values: number[]) => {
        return { labels: categories, datasets: [{ data: values, fill: true }] };
      };
      const result = toRadar(['Math', 'Science', 'English'], [85, 90, 78]);
      expect(result.labels).toHaveLength(3);
      expect(result.datasets[0].data).toEqual([85, 90, 78]);
    });

    it('should transform to gauge format', () => {
      const toGauge = (value: number, min: number, max: number) => {
        return { value, min, max, percentage: ((value - min) / (max - min)) * 100 };
      };
      const result = toGauge(75, 0, 100);
      expect(result.percentage).toBe(75);
    });

    it('should transform to treemap format', () => {
      const toTreemap = (data: { name: string; value: number }[]) => {
        const total = data.reduce((a, d) => a + d.value, 0);
        return data.map(d => ({ ...d, percentage: (d.value / total) * 100 }));
      };
      const result = toTreemap([{ name: 'A', value: 30 }, { name: 'B', value: 70 }]);
      expect(result[0].percentage).toBe(30);
      expect(result[1].percentage).toBe(70);
    });

    it('should transform to scatter plot format', () => {
      const toScatter = (points: { x: number; y: number }[]) => {
        return { datasets: [{ data: points, pointRadius: 5 }] };
      };
      const result = toScatter([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
      expect(result.datasets[0].data).toHaveLength(2);
    });

    it('should transform to area chart format', () => {
      const toArea = (labels: string[], datasets: { name: string; data: number[] }[]) => {
        return { labels, datasets: datasets.map(d => ({ ...d, fill: true })) };
      };
      const result = toArea(['Jan', 'Feb'], [{ name: 'Revenue', data: [100, 200] }]);
      expect(result.datasets[0].fill).toBe(true);
    });
  });

  describe('Data Filtering', () => {
    it('should filter by date range', () => {
      const filterByDateRange = (data: { date: string }[], from: string, to: string) => {
        return data.filter(d => d.date >= from && d.date <= to);
      };
      const data = [{ date: '2025-01-01' }, { date: '2025-06-15' }, { date: '2025-12-31' }];
      expect(filterByDateRange(data, '2025-03-01', '2025-09-30')).toHaveLength(1);
    });

    it('should filter by multiple criteria', () => {
      const filterByCriteria = (data: any[], criteria: Record<string, any>) => {
        return data.filter(item => Object.entries(criteria).every(([key, value]) => item[key] === value));
      };
      const data = [{ type: 'A', status: 'active' }, { type: 'B', status: 'active' }, { type: 'A', status: 'inactive' }];
      expect(filterByCriteria(data, { type: 'A', status: 'active' })).toHaveLength(1);
    });

    it('should filter by search term', () => {
      const filterBySearch = (data: { name: string }[], term: string) => {
        return data.filter(d => d.name.toLowerCase().includes(term.toLowerCase()));
      };
      const data = [{ name: 'John Smith' }, { name: 'Jane Doe' }, { name: 'Bob Johnson' }];
      expect(filterBySearch(data, 'john')).toHaveLength(2);
    });

    it('should filter by numeric range', () => {
      const filterByRange = (data: { value: number }[], min: number, max: number) => {
        return data.filter(d => d.value >= min && d.value <= max);
      };
      const data = [{ value: 10 }, { value: 50 }, { value: 100 }];
      expect(filterByRange(data, 20, 80)).toHaveLength(1);
    });

    it('should filter unique values', () => {
      const uniqueValues = (arr: any[]) => [...new Set(arr)];
      expect(uniqueValues([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it('should filter top N values', () => {
      const topN = (arr: number[], n: number) => [...arr].sort((a, b) => b - a).slice(0, n);
      expect(topN([10, 50, 30, 20, 40], 3)).toEqual([50, 40, 30]);
    });

    it('should filter by inclusion list', () => {
      const filterByInclude = (data: any[], key: string, values: any[]) => {
        return data.filter(d => values.includes(d[key]));
      };
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(filterByInclude(data, 'id', [1, 3])).toHaveLength(2);
    });

    it('should filter by exclusion list', () => {
      const filterByExclude = (data: any[], key: string, values: any[]) => {
        return data.filter(d => !values.includes(d[key]));
      };
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(filterByExclude(data, 'id', [2])).toHaveLength(2);
    });

    it('should apply multiple filters sequentially', () => {
      const applyFilters = (data: any[], filters: ((item: any) => boolean)[]) => {
        return filters.reduce((result, filter) => result.filter(filter), data);
      };
      const data = [{ type: 'A', value: 10 }, { type: 'B', value: 20 }, { type: 'A', value: 30 }];
      const result = applyFilters(data, [
        d => d.type === 'A',
        d => d.value > 15,
      ]);
      expect(result).toHaveLength(1);
    });

    it('should handle empty filter results', () => {
      const data = [{ value: 1 }];
      const result = data.filter(d => d.value > 10);
      expect(result).toEqual([]);
    });
  });
});
