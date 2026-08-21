import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';

const mockFetch = vi.fn();
global.fetch = mockFetch;

function mockJsonResponse(data: unknown, ok = true) {
  return {
    ok,
    json: () => Promise.resolve(data),
    status: ok ? 200 : 500,
  };
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('useReactions hook', () => {
  it('should import useReactions', async () => {
    const mod = await import('../../src/features/messages/hooks/useReactions');
    expect(mod.useReactions).toBeDefined();
  });

  it('should return default state with null messageId', async () => {
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    const { result } = renderHook(() => useReactions(null));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should return loading when messageId provided', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    const { result } = renderHook(() => useReactions('msg1'));
    expect(result.current.loading).toBe(true);
  });

  it('should call correct endpoint', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    renderHook(() => useReactions('msg1'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/messages/msg1/reactions');
    });
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    const { result } = renderHook(() => useReactions('msg1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network'));
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    const { result } = renderHook(() => useReactions('msg1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('Network');
  });

  it('should handle empty string messageId', async () => {
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    const { result } = renderHook(() => useReactions(''));
    expect(result.current.loading).toBe(false);
  });

  it('should not call fetch with null messageId', async () => {
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    renderHook(() => useReactions(null));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should handle non-Error exception', async () => {
    mockFetch.mockRejectedValue('string error');
    const { useReactions } = await import('../../src/features/messages/hooks/useReactions');
    const { result } = renderHook(() => useReactions('msg1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('Erreur inconnue');
  });
});

describe('useGroups hook', () => {
  it('should import useGroups', async () => {
    const mod = await import('../../src/features/messages/hooks/useGroups');
    expect(mod.useGroups).toBeDefined();
  });

  it('should return default state', async () => {
    const { useGroups } = await import('../../src/features/messages/hooks/useGroups');
    const { result } = renderHook(() => useGroups(''));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should call correct endpoint', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useGroups } = await import('../../src/features/messages/hooks/useGroups');
    renderHook(() => useGroups('s1'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/messages/groups'));
    });
  });

  it('should pass filters to URL', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useGroups } = await import('../../src/features/messages/hooks/useGroups');
    renderHook(() => useGroups('s1', { search: 'math' }));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('search=math'));
    });
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useGroups } = await import('../../src/features/messages/hooks/useGroups');
    const { result } = renderHook(() => useGroups('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));
    const { useGroups } = await import('../../src/features/messages/hooks/useGroups');
    const { result } = renderHook(() => useGroups('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('fail');
  });

  it('should include schoolId in URL', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useGroups } = await import('../../src/features/messages/hooks/useGroups');
    renderHook(() => useGroups('school-xyz'));
    await waitFor(() => {
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('schoolId=school-xyz');
    });
  });

  it('should handle empty schoolId', async () => {
    const { useGroups } = await import('../../src/features/messages/hooks/useGroups');
    const { result } = renderHook(() => useGroups(''));
    expect(result.current.loading).toBe(false);
  });
});

describe('useBroadcasts hook', () => {
  it('should import useBroadcasts', async () => {
    const mod = await import('../../src/features/messages/hooks/useBroadcasts');
    expect(mod.useBroadcasts).toBeDefined();
  });

  it('should return default state', async () => {
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    const { result } = renderHook(() => useBroadcasts(''));
    expect(result.current.loading).toBe(false);
  });

  it('should return loading when schoolId provided', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    const { result } = renderHook(() => useBroadcasts('s1'));
    expect(result.current.loading).toBe(true);
  });

  it('should call correct endpoint', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    renderHook(() => useBroadcasts('s1'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/messages/broadcasts'));
    });
  });

  it('should pass filters', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    renderHook(() => useBroadcasts('s1', { status: 'SENT' }));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('status=SENT'));
    });
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    const { result } = renderHook(() => useBroadcasts('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    const { result } = renderHook(() => useBroadcasts('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('fail');
  });

  it('should handle multiple filters', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    renderHook(() => useBroadcasts('s1', { status: 'SENT', search: 'test' }));
    await waitFor(() => {
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('status=SENT');
    });
  });

  it('should handle empty schoolId', async () => {
    const { useBroadcasts } = await import('../../src/features/messages/hooks/useBroadcasts');
    const { result } = renderHook(() => useBroadcasts(''));
    expect(result.current.loading).toBe(false);
  });
});

describe('useUploadAttachment hook', () => {
  it('should import useUploadAttachment', async () => {
    const mod = await import('../../src/features/messages/hooks/useUploadAttachment');
    expect(mod.useUploadAttachment).toBeDefined();
  });

  it('should return default state', async () => {
    const { useUploadAttachment } = await import('../../src/features/messages/hooks/useUploadAttachment');
    const { result } = renderHook(() => useUploadAttachment());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should have upload function', async () => {
    const { useUploadAttachment } = await import('../../src/features/messages/hooks/useUploadAttachment');
    const { result } = renderHook(() => useUploadAttachment());
    expect(typeof result.current.upload).toBe('function');
  });

  it('should import useDownloadAttachment', async () => {
    const mod = await import('../../src/features/messages/hooks/useDownloadAttachment');
    expect(mod.useDownloadAttachment).toBeDefined();
  });

  it('should import useDeleteAttachment', async () => {
    const mod = await import('../../src/features/messages/hooks/useDeleteAttachment');
    expect(mod.useDeleteAttachment).toBeDefined();
  });

  it('should return default state for deleteAttachment', async () => {
    const { useDeleteAttachment } = await import('../../src/features/messages/hooks/useDeleteAttachment');
    const { result } = renderHook(() => useDeleteAttachment());
    expect(result.current.loading).toBe(false);
  });

  it('should have delete function', async () => {
    const { useDeleteAttachment } = await import('../../src/features/messages/hooks/useDeleteAttachment');
    const { result } = renderHook(() => useDeleteAttachment());
    expect(typeof result.current.remove).toBe('function');
  });

  it('should have download function', async () => {
    const { useDownloadAttachment } = await import('../../src/features/messages/hooks/useDownloadAttachment');
    const { result } = renderHook(() => useDownloadAttachment());
    expect(typeof result.current.download).toBe('function');
  });

  it('should handle upload POST request', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ id: 'att1' }));
    const { useUploadAttachment } = await import('../../src/features/messages/hooks/useUploadAttachment');
    const { result } = renderHook(() => useUploadAttachment());
    await act(async () => {
      await result.current.upload(new File(['test'], 'test.txt', { type: 'text/plain' }));
    });
    expect(mockFetch).toHaveBeenCalled();
  });

  it('should handle upload error', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useUploadAttachment } = await import('../../src/features/messages/hooks/useUploadAttachment');
    const { result } = renderHook(() => useUploadAttachment());
    await act(async () => {
      await result.current.upload(new File(['test'], 'test.txt', { type: 'text/plain' }));
    });
    expect(result.current.error).toBeTruthy();
  });
});

describe('useSearch hook', () => {
  it('should import useSearch', async () => {
    const mod = await import('../../src/features/messages/hooks/useSearch');
    expect(mod.useSearch).toBeDefined();
  });

  it('should return default state', async () => {
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(typeof result.current.search).toBe('function');
  });

  it('should call search endpoint', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ messages: [], conversations: [] }));
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    await act(async () => {
      await result.current.search('s1', 'hello');
    });
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('query=hello'));
  });

  it('should include schoolId in search URL', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ messages: [] }));
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    await act(async () => {
      await result.current.search('school-1', 'test');
    });
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('schoolId=school-1');
  });

  it('should pass filters', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ messages: [] }));
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    await act(async () => {
      await result.current.search('s1', 'query', { type: 'TEXT' });
    });
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('type=TEXT'));
  });

  it('should handle search error', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    await act(async () => {
      await result.current.search('s1', 'q');
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network'));
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    await act(async () => {
      await result.current.search('s1', 'q');
    });
    expect(result.current.error).toBe('Network');
  });

  it('should handle non-Error exception', async () => {
    mockFetch.mockRejectedValue('string');
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    await act(async () => {
      await result.current.search('s1', 'q');
    });
    expect(result.current.error).toBe('Erreur inconnue');
  });

  it('should use global search endpoint', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ messages: [] }));
    const { useSearch } = await import('../../src/features/messages/hooks/useSearch');
    const { result } = renderHook(() => useSearch());
    await act(async () => {
      await result.current.search('s1', 'q');
    });
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/messages/search/global'));
  });
});
