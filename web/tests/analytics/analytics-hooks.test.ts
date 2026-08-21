import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useWidgets } from '../../src/features/analytics/hooks/use-widgets';
import { useStudentAnalytics } from '../../src/features/analytics/hooks/use-student-analytics';
import { useReports, useReport } from '../../src/features/analytics/hooks/use-reports';
import { useKPI, useKPITrend } from '../../src/features/analytics/hooks/use-kpi';
import { useSnapshots } from '../../src/features/analytics/hooks/use-snapshots';
import { useTrendAnalysis } from '../../src/features/analytics/hooks/use-trend';
import { useSegment } from '../../src/features/analytics/hooks/use-segment';
import { useRetention } from '../../src/features/analytics/hooks/use-retention';
import { useRealTimeData } from '../../src/features/analytics/hooks/use-real-time';
import { useImportData } from '../../src/features/analytics/hooks/use-import';
import { usePredictions } from '../../src/features/analytics/hooks/use-predictions';
import { useScheduledReports } from '../../src/features/analytics/hooks/use-scheduled-reports';
import { useParentAnalytics } from '../../src/features/analytics/hooks/use-parent-analytics';
import { useTeacherAnalytics } from '../../src/features/analytics/hooks/use-teacher-analytics';
import { useTimelineAnalytics } from '../../src/features/analytics/hooks/use-timeline-analytics';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return { ...actual };
});

describe('AnalyticsHooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useWidgets', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useWidgets());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept dashboardId parameter', () => {
      const { result } = renderHook(() => useWidgets('dash-1'));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useWidgets());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useStudentAnalytics', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useStudentAnalytics());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept schoolId parameter', () => {
      const { result } = renderHook(() => useStudentAnalytics('sch-1'));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useStudentAnalytics());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useReports', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useReports());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useReports({ schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useReports());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useReport', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useReport('rpt-1'));
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept null reportId', () => {
      const { result } = renderHook(() => useReport(null));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useReport('rpt-1'));
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useKPI', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useKPI());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useKPI({ kpiId: 'kpi-1', schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useKPI());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useKPITrend', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useKPITrend());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useKPITrend({ kpiId: 'kpi-1', period: 'monthly' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useKPITrend());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useSnapshots', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useSnapshots());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useSnapshots({ dataset: 'students', schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useSnapshots());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useTrendAnalysis', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useTrendAnalysis());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useTrendAnalysis({ metric: 'revenue', period: 'monthly', schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useTrendAnalysis());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useSegment', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useSegment());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useSegment({ segmentId: 'seg-1', schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useSegment());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useRetention', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useRetention());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useRetention({ period: 'monthly', schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useRetention());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useRealTimeData', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useRealTimeData());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useRealTimeData({ dataset: 'active_users', interval: 5000 }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useRealTimeData());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useImportData', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useImportData());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useImportData({ source: 'students', schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useImportData());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('usePredictions', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => usePredictions());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => usePredictions({ type: 'dropout', schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => usePredictions());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useScheduledReports', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useScheduledReports());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useScheduledReports({ schoolId: 'sch-1' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useScheduledReports());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useParentAnalytics', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useParentAnalytics());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept schoolId parameter', () => {
      const { result } = renderHook(() => useParentAnalytics('sch-1'));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useParentAnalytics());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useTeacherAnalytics', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useTeacherAnalytics());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept schoolId parameter', () => {
      const { result } = renderHook(() => useTeacherAnalytics('sch-1'));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useTeacherAnalytics());
      expect(typeof result.current.refetch).toBe('function');
    });
  });

  describe('useTimelineAnalytics', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useTimelineAnalytics());
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should accept params', () => {
      const { result } = renderHook(() => useTimelineAnalytics({ dataset: 'enrollment', timeRange: '30d' }));
      expect(result.current.loading).toBe(false);
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useTimelineAnalytics());
      expect(typeof result.current.refetch).toBe('function');
    });
  });
});
