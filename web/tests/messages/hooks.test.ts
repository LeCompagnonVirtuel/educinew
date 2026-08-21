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

describe('useConversation hook', () => {
  it('should import useConversation from hooks', async () => {
    const mod = await import('../../src/features/messages/hooks/useConversation');
    expect(mod.useConversation).toBeDefined();
  });

  it('should return default state with null id', async () => {
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    const { result } = renderHook(() => useConversation(null));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should fetch conversation data', async () => {
    const conversation = { id: '1', type: 'GROUP', title: 'Test' };
    mockFetch.mockResolvedValue(mockJsonResponse(conversation));
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    const { result } = renderHook(() => useConversation('1'));
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual(conversation);
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    const { result } = renderHook(() => useConversation('1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    const { result } = renderHook(() => useConversation('1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('Network error');
  });

  it('should set loading to false on null id', async () => {
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    const { result } = renderHook(() => useConversation(null));
    expect(result.current.loading).toBe(false);
  });

  it('should return error message for non-Error throw', async () => {
    mockFetch.mockRejectedValue('string error');
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    const { result } = renderHook(() => useConversation('1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('Erreur inconnue');
  });

  it('should call correct API endpoint', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({}));
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    renderHook(() => useConversation('conv-123'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/messages/conversations/conv-123');
    });
  });

  it('should handle empty string id', async () => {
    const { useConversation } = await import('../../src/features/messages/hooks/useConversation');
    const { result } = renderHook(() => useConversation(''));
    expect(result.current.loading).toBe(false);
  });
});

describe('useConversations hook', () => {
  it('should import useConversations from hooks', async () => {
    const mod = await import('../../src/features/messages/hooks/useConversations');
    expect(mod.useConversations).toBeDefined();
  });

  it('should return default state', async () => {
    const { useConversations } = await import('../../src/features/messages/hooks/useConversations');
    const { result } = renderHook(() => useConversations(''));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should call fetch with schoolId param', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useConversations } = await import('../../src/features/messages/hooks/useConversations');
    renderHook(() => useConversations('school1'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('schoolId=school1'));
    });
  });

  it('should include filters in URL params', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useConversations } = await import('../../src/features/messages/hooks/useConversations');
    renderHook(() => useConversations('s1', { search: 'test' }));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('search=test'));
    });
  });

  it('should handle empty string schoolId', async () => {
    const { useConversations } = await import('../../src/features/messages/hooks/useConversations');
    const { result } = renderHook(() => useConversations(''));
    expect(result.current.loading).toBe(false);
  });

  it('should handle fetch failure', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useConversations } = await import('../../src/features/messages/hooks/useConversations');
    const { result } = renderHook(() => useConversations('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));
    const { useConversations } = await import('../../src/features/messages/hooks/useConversations');
    const { result } = renderHook(() => useConversations('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('fail');
  });

  it('should use default limit', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useConversations } = await import('../../src/features/messages/hooks/useConversations');
    renderHook(() => useConversations('s1'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('/api/messages/conversations');
  });
});

describe('useMessages hook', () => {
  it('should import useMessages from hooks', async () => {
    const mod = await import('../../src/features/messages/hooks/useMessages');
    expect(mod.useMessages).toBeDefined();
  });

  it('should return default state with null id', async () => {
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    const { result } = renderHook(() => useMessages(null));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should return loading state when conversationId provided', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    const { result } = renderHook(() => useMessages('conv1'));
    expect(result.current.loading).toBe(true);
  });

  it('should call correct endpoint for messages', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    renderHook(() => useMessages('conv1'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/messages/conversations/conv1/messages'));
    });
  });

  it('should pass filters to URL params', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    renderHook(() => useMessages('conv1', { type: 'TEXT' }));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('type=TEXT'));
    });
  });

  it('should handle empty string conversationId', async () => {
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    const { result } = renderHook(() => useMessages(''));
    expect(result.current.loading).toBe(false);
  });

  it('should handle fetch error gracefully', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    const { result } = renderHook(() => useMessages('conv1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    const { result } = renderHook(() => useMessages('conv1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('fail');
  });

  it('should return multiple filters', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useMessages } = await import('../../src/features/messages/hooks/useMessages');
    renderHook(() => useMessages('c1', { senderId: 'u1', status: 'SENT' }));
    await waitFor(() => {
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('senderId=u1');
      expect(url).toContain('status=SENT');
    });
  });
});

describe('useSendMessage hook', () => {
  it('should import useSendMessage from hooks', async () => {
    const mod = await import('../../src/features/messages/hooks/useSendMessage');
    expect(mod.useSendMessage).toBeDefined();
  });

  it('should return default state', async () => {
    const { useSendMessage } = await import('../../src/features/messages/hooks/useSendMessage');
    const { result } = renderHook(() => useSendMessage());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.send).toBe('function');
  });

  it('should send message via POST', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ id: '1' }));
    const { useSendMessage } = await import('../../src/features/messages/hooks/useSendMessage');
    const { result } = renderHook(() => useSendMessage());
    await act(async () => {
      await result.current.send({ content: 'Hello', conversationId: 'c1' });
    });
    expect(mockFetch).toHaveBeenCalledWith('/api/messages', expect.objectContaining({ method: 'POST' }));
  });

  it('should call onSuccess callback on success', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({}));
    const onSuccess = vi.fn();
    const { useSendMessage } = await import('../../src/features/messages/hooks/useSendMessage');
    const { result } = renderHook(() => useSendMessage(onSuccess));
    await act(async () => {
      await result.current.send({ content: 'Hi' });
    });
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should not call onSuccess on failure', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const onSuccess = vi.fn();
    const { useSendMessage } = await import('../../src/features/messages/hooks/useSendMessage');
    const { result } = renderHook(() => useSendMessage(onSuccess));
    await act(async () => {
      await result.current.send({ content: 'Fail' });
    });
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network'));
    const { useSendMessage } = await import('../../src/features/messages/hooks/useSendMessage');
    const { result } = renderHook(() => useSendMessage());
    await act(async () => {
      await result.current.send({ content: 'Hi' });
    });
    expect(result.current.error).toBe('Network');
  });

  it('should send JSON body', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({}));
    const { useSendMessage } = await import('../../src/features/messages/hooks/useSendMessage');
    const { result } = renderHook(() => useSendMessage());
    await act(async () => {
      await result.current.send({ content: 'Test', conversationId: 'c1' });
    });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.content).toBe('Test');
    expect(body.conversationId).toBe('c1');
  });

  it('should handle non-Error exception', async () => {
    mockFetch.mockRejectedValue('string error');
    const { useSendMessage } = await import('../../src/features/messages/hooks/useSendMessage');
    const { result } = renderHook(() => useSendMessage());
    await act(async () => {
      await result.current.send({ content: 'Hi' });
    });
    expect(result.current.error).toBe('Erreur inconnue');
  });
});

describe('useNotifications hook', () => {
  it('should import useNotifications from hooks', async () => {
    const mod = await import('../../src/features/messages/hooks/useNotifications');
    expect(mod.useNotifications).toBeDefined();
  });

  it('should return default state', async () => {
    const { useNotifications } = await import('../../src/features/messages/hooks/useNotifications');
    const { result } = renderHook(() => useNotifications(''));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should call correct endpoint', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useNotifications } = await import('../../src/features/messages/hooks/useNotifications');
    renderHook(() => useNotifications('s1'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/messages/notifications'));
    });
  });

  it('should pass filters to URL', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useNotifications } = await import('../../src/features/messages/hooks/useNotifications');
    renderHook(() => useNotifications('s1', { type: 'MESSAGE' }));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('type=MESSAGE'));
    });
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const { useNotifications } = await import('../../src/features/messages/hooks/useNotifications');
    const { result } = renderHook(() => useNotifications('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));
    const { useNotifications } = await import('../../src/features/messages/hooks/useNotifications');
    const { result } = renderHook(() => useNotifications('s1'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('fail');
  });

  it('should include schoolId in params', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useNotifications } = await import('../../src/features/messages/hooks/useNotifications');
    renderHook(() => useNotifications('school-abc'));
    await waitFor(() => {
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('schoolId=school-abc');
    });
  });

  it('should handle multiple filters', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([]));
    const { useNotifications } = await import('../../src/features/messages/hooks/useNotifications');
    renderHook(() => useNotifications('s1', { type: 'ANNOUNCEMENT', isRead: 'false' }));
    await waitFor(() => {
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('type=ANNOUNCEMENT');
    });
  });
});
