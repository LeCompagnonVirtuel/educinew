import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWidgetService } from '../../src/features/analytics/services/widget.service';

const mockRepository = {
  addWidget: vi.fn(),
  updateWidget: vi.fn(),
  removeWidget: vi.fn(),
};

describe('WidgetService', () => {
  let service: ReturnType<typeof createWidgetService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createWidgetService(mockRepository as any);
  });

  it('should call addWidget with dashboardId and widgetData', async () => {
    const widgetData = { type: 'kpi', title: 'Revenue KPI' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-1', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(mockRepository.addWidget).toHaveBeenCalledWith('dash-1', widgetData);
    expect(result).toHaveProperty('id');
  });

  it('should propagate errors from addWidget', async () => {
    mockRepository.addWidget.mockRejectedValue(new Error('Add error'));
    await expect(service.addWidget('dash-1', {})).rejects.toThrow('Add error');
  });

  it('should call updateWidget with widgetId and data', async () => {
    const data = { title: 'Updated Widget' };
    mockRepository.updateWidget.mockResolvedValue({ id: 'wgt-1', ...data });
    const result = await service.updateWidget('wgt-1', data);
    expect(mockRepository.updateWidget).toHaveBeenCalledWith('wgt-1', data);
    expect(result).toHaveProperty('id');
  });

  it('should propagate errors from updateWidget', async () => {
    mockRepository.updateWidget.mockRejectedValue(new Error('Update error'));
    await expect(service.updateWidget('wgt-1', {})).rejects.toThrow('Update error');
  });

  it('should call removeWidget with widgetId', async () => {
    mockRepository.removeWidget.mockResolvedValue(undefined);
    await service.removeWidget('wgt-1');
    expect(mockRepository.removeWidget).toHaveBeenCalledWith('wgt-1');
  });

  it('should propagate errors from removeWidget', async () => {
    mockRepository.removeWidget.mockRejectedValue(new Error('Remove error'));
    await expect(service.removeWidget('wgt-1')).rejects.toThrow('Remove error');
  });

  it('should add widget with chart type', async () => {
    const widgetData = { type: 'chart', title: 'Bar Chart' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-2', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('chart');
  });

  it('should add widget with gauge type', async () => {
    const widgetData = { type: 'gauge', title: 'Attendance Gauge' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-3', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('gauge');
  });

  it('should update widget title successfully', async () => {
    mockRepository.updateWidget.mockResolvedValue({ id: 'wgt-1', title: 'New Title' });
    const result = await service.updateWidget('wgt-1', { title: 'New Title' });
    expect(result.title).toBe('New Title');
  });

  it('should update widget visibility', async () => {
    mockRepository.updateWidget.mockResolvedValue({ id: 'wgt-1', visible: false });
    const result = await service.updateWidget('wgt-1', { visible: false });
    expect(result.visible).toBe(false);
  });

  it('should update widget position', async () => {
    const position = { x: 0, y: 0, w: 6, h: 4 };
    mockRepository.updateWidget.mockResolvedValue({ id: 'wgt-1', position });
    const result = await service.updateWidget('wgt-1', { position });
    expect(result.position).toEqual(position);
  });

  it('should update widget config', async () => {
    const config = { colors: ['#ff0000', '#00ff00'] };
    mockRepository.updateWidget.mockResolvedValue({ id: 'wgt-1', config });
    const result = await service.updateWidget('wgt-1', { config });
    expect(result.config).toEqual(config);
  });

  it('should update widget refreshInterval', async () => {
    mockRepository.updateWidget.mockResolvedValue({ id: 'wgt-1', refreshInterval: 600 });
    const result = await service.updateWidget('wgt-1', { refreshInterval: 600 });
    expect(result.refreshInterval).toBe(600);
  });

  it('should add widget with map type', async () => {
    const widgetData = { type: 'map', title: 'Geo Map' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-4', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('map');
  });

  it('should add widget with table type', async () => {
    const widgetData = { type: 'table', title: 'Student Table' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-5', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('table');
  });

  it('should add widget with heatmap type', async () => {
    const widgetData = { type: 'heatmap', title: 'Performance Heatmap' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-6', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('heatmap');
  });

  it('should add widget with timeline type', async () => {
    const widgetData = { type: 'timeline', title: 'Events Timeline' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-7', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('timeline');
  });

  it('should add widget with text type', async () => {
    const widgetData = { type: 'text', title: 'Summary Text' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-8', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('text');
  });

  it('should add widget with progress type', async () => {
    const widgetData = { type: 'progress', title: 'Goal Progress' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-9', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('progress');
  });

  it('should add widget with comparison type', async () => {
    const widgetData = { type: 'comparison', title: 'Year Comparison' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-10', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('comparison');
  });

  it('should add widget with list type', async () => {
    const widgetData = { type: 'list', title: 'Top Students List' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-11', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('list');
  });

  it('should add widget with image type', async () => {
    const widgetData = { type: 'image', title: 'School Logo' };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-12', ...widgetData });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result.type).toBe('image');
  });

  it('should remove widget returning void', async () => {
    mockRepository.removeWidget.mockResolvedValue(undefined);
    const result = await service.removeWidget('wgt-1');
    expect(result).toBeUndefined();
  });

  it('should handle addWidget returning complete object', async () => {
    const widgetData = { type: 'kpi', title: 'Full Widget', dataSource: 'students', config: {} };
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-13', ...widgetData, createdAt: '2025-07-24T00:00:00Z' });
    const result = await service.addWidget('dash-1', widgetData);
    expect(result).toHaveProperty('createdAt');
  });

  it('should handle updateWidget with multiple fields', async () => {
    mockRepository.updateWidget.mockResolvedValue({ id: 'wgt-1', title: 'Multi Update', visible: false, refreshInterval: 120 });
    const result = await service.updateWidget('wgt-1', { title: 'Multi Update', visible: false, refreshInterval: 120 });
    expect(result.title).toBe('Multi Update');
    expect(result.visible).toBe(false);
  });

  it('should handle removeWidget with non-existent id', async () => {
    mockRepository.removeWidget.mockRejectedValue(new Error('Widget not found'));
    await expect(service.removeWidget('non-existent')).rejects.toThrow('Widget not found');
  });

  it('should handle addWidget with empty data', async () => {
    mockRepository.addWidget.mockResolvedValue({ id: 'wgt-14' });
    const result = await service.addWidget('dash-1', {});
    expect(result).toHaveProperty('id');
  });
});
