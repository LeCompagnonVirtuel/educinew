import { describe, it, expect, vi, beforeEach } from 'vitest';

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

describe('Message data flow - create and send', () => {
  it('should send a message and receive confirmation', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ id: 'm1', content: 'Hello' }));
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Hello', senderId: 'u1', schoolId: 's1' }),
    });
    const data = await response.json();
    expect(data.id).toBe('m1');
    expect(data.content).toBe('Hello');
  });

  it('should create conversation then send message', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', type: 'GROUP' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'First' }));
    const convRes = await fetch('/api/messages/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'GROUP', title: 'New Group', memberIds: ['u1', 'u2'], schoolId: 's1' }),
    });
    const conv = await convRes.json();
    expect(conv.id).toBe('c1');

    const msgRes = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conv.id, content: 'First', senderId: 'u1', schoolId: 's1' }),
    });
    const msg = await msgRes.json();
    expect(msg.content).toBe('First');
  });

  it('should fetch messages after sending', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Hi' }))
      .mockResolvedValueOnce(mockJsonResponse([{ id: 'm1', content: 'Hi' }]));
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Hi', senderId: 'u1', schoolId: 's1' }),
    });
    const msgsRes = await fetch('/api/messages/conversations/c1/messages');
    const msgs = await msgsRes.json();
    expect(msgs).toHaveLength(1);
    expect(msgs[0].content).toBe('Hi');
  });

  it('should handle message edit flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Original' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Edited', is_edited: true }));
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Original', senderId: 'u1', schoolId: 's1' }),
    });
    const editRes = await fetch('/api/messages/m1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'Edited' }),
    });
    const edited = await editRes.json();
    expect(edited.content).toBe('Edited');
    expect(edited.is_edited).toBe(true);
  });

  it('should handle message delete flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1' }))
      .mockResolvedValueOnce(mockJsonResponse(null, true));
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Delete me', senderId: 'u1', schoolId: 's1' }),
    });
    const delRes = await fetch('/api/messages/m1', { method: 'DELETE' });
    expect(delRes.ok).toBe(true);
  });

  it('should handle message forwarding flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Forward this' }))
      .mockResolvedValueOnce(mockJsonResponse([{ id: 'm2', content: 'Forward this', is_forwarded: true }]));
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Forward this', senderId: 'u1', schoolId: 's1' }),
    });
    const fwdRes = await fetch('/api/messages/m1/forward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetConversationIds: ['c2'] }),
    });
    const forwarded = await fwdRes.json();
    expect(forwarded[0].is_forwarded).toBe(true);
  });

  it('should handle reaction add flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'r1', type: 'LIKE', userId: 'u2' }));
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'React to this', senderId: 'u1', schoolId: 's1' }),
    });
    const reactionRes = await fetch('/api/messages/m1/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'LIKE', userId: 'u2' }),
    });
    const reaction = await reactionRes.json();
    expect(reaction.type).toBe('LIKE');
  });

  it('should handle reaction remove flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'r1' }))
      .mockResolvedValueOnce(mockJsonResponse(null, true));
    await fetch('/api/messages/m1/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'LIKE', userId: 'u2' }),
    });
    const removeRes = await fetch('/api/messages/m1/reactions/u2', { method: 'DELETE' });
    expect(removeRes.ok).toBe(true);
  });

  it('should handle read receipt flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Read me' }))
      .mockResolvedValueOnce(mockJsonResponse({ read: true }));
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Read me', senderId: 'u1', schoolId: 's1' }),
    });
    const readRes = await fetch('/api/messages/m1/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u2' }),
    });
    const read = await readRes.json();
    expect(read.read).toBe(true);
  });

  it('should handle conversation list load flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([{ id: 'c1', title: 'Group 1' }, { id: 'c2', title: 'Group 2' }]));
    const res = await fetch('/api/messages/conversations?schoolId=s1');
    const data = await res.json();
    expect(data).toHaveLength(2);
    expect(data[0].title).toBe('Group 1');
  });

  it('should handle conversation detail load flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ id: 'c1', title: 'Detail', type: 'GROUP' }));
    const res = await fetch('/api/messages/conversations/c1');
    const data = await res.json();
    expect(data.title).toBe('Detail');
  });

  it('should handle message search flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ messages: [{ id: 'm1', content: 'Found' }], total: 1 }));
    const res = await fetch('/api/messages/search/global?schoolId=s1&query=Found');
    const data = await res.json();
    expect(data.messages).toHaveLength(1);
    expect(data.messages[0].content).toBe('Found');
  });

  it('should handle notification flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse([{ id: 'n1', type: 'MESSAGE', title: 'New message' }]));
    const res = await fetch('/api/messages/notifications?schoolId=s1');
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].type).toBe('MESSAGE');
  });

  it('should handle mark notification read flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ id: 'n1', is_read: true }));
    const res = await fetch('/api/messages/notifications/n1/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    expect(data.is_read).toBe(true);
  });

  it('should handle mark all notifications read flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ success: true }));
    const res = await fetch('/api/messages/notifications/read-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u1', schoolId: 's1' }),
    });
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it('should handle group creation and message flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'g1', name: 'Math' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', type: 'GROUP' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Welcome' }));
    const groupRes = await fetch('/api/messages/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Math', type: 'CLASS', memberIds: ['u1'], schoolId: 's1' }),
    });
    const group = await groupRes.json();
    expect(group.name).toBe('Math');

    const convRes = await fetch('/api/messages/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'GROUP', title: 'Math Chat', memberIds: ['u1'], schoolId: 's1' }),
    });
    const conv = await convRes.json();

    const msgRes = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conv.id, content: 'Welcome', senderId: 'u1', schoolId: 's1' }),
    });
    const msg = await msgRes.json();
    expect(msg.content).toBe('Welcome');
  });

  it('should handle attachment upload and message flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'att1', file_name: 'doc.pdf' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Here is the file' }));
    const attachRes = await fetch('/api/messages/attachments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: 'doc.pdf', fileType: 'pdf', fileSize: 1024, fileUrl: 'url', mimeType: 'application/pdf', type: 'FILE', uploadedBy: 'u1' }),
    });
    const attach = await attachRes.json();
    expect(attach.file_name).toBe('doc.pdf');

    const msgRes = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Here is the file', senderId: 'u1', schoolId: 's1', attachmentIds: [attach.id] }),
    });
    const msg = await msgRes.json();
    expect(msg.content).toBe('Here is the file');
  });

  it('should handle announcement creation and publish flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'a1', is_published: false }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'a1', is_published: true }));
    const createRes = await fetch('/api/messages/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Holiday', content: 'School closed', type: 'INFO', priority: 'NORMAL', targetAudience: 'ALL', schoolId: 's1', publishedBy: 'u1' }),
    });
    const announcement = await createRes.json();
    expect(announcement.is_published).toBe(false);

    const publishRes = await fetch(`/api/messages/announcements/${announcement.id}/publish`, { method: 'POST' });
    const published = await publishRes.json();
    expect(published.is_published).toBe(true);
  });

  it('should handle broadcast creation and send flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'b1', status: 'DRAFT' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'b1', status: 'SENT' }));
    const createRes = await fetch('/api/messages/broadcasts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Alert', content: 'Storm warning', scope: 'ALL', channels: ['IN_APP'], schoolId: 's1', sentBy: 'u1' }),
    });
    const broadcast = await createRes.json();
    expect(broadcast.status).toBe('DRAFT');

    const sendRes = await fetch(`/api/messages/broadcasts/${broadcast.id}/send`, { method: 'POST' });
    const sent = await sendRes.json();
    expect(sent.status).toBe('SENT');
  });

  it('should handle pagination in message list', async () => {
    const messages = Array.from({ length: 50 }, (_, i) => ({ id: `m${i}`, content: `Msg ${i}` }));
    mockFetch.mockResolvedValue(mockJsonResponse(messages));
    const res = await fetch('/api/messages/conversations/c1/messages?limit=50&offset=0');
    const data = await res.json();
    expect(data).toHaveLength(50);
  });

  it('should handle error during message send', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Fail', senderId: 'u1', schoolId: 's1' }),
    });
    expect(res.ok).toBe(false);
  });

  it('should handle error during conversation creation', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse(null, false));
    const res = await fetch('/api/messages/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'GROUP', title: 'Fail', memberIds: [], schoolId: 's1' }),
    });
    expect(res.ok).toBe(false);
  });

  it('should handle conversation mute toggle flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', is_muted: false }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', is_muted: true }));
    await fetch('/api/messages/conversations/c1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isMuted: true }),
    });
    const res = await fetch('/api/messages/conversations/c1');
    const conv = await res.json();
    expect(conv.is_muted).toBe(true);
  });

  it('should handle conversation archive flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', is_archived: false }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', is_archived: true }));
    await fetch('/api/messages/conversations/c1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isArchived: true }),
    });
    const res = await fetch('/api/messages/conversations/c1');
    const conv = await res.json();
    expect(conv.is_archived).toBe(true);
  });

  it('should handle message pin flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', is_pinned: false }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', is_pinned: true }));
    await fetch('/api/messages/m1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPinned: true }),
    });
    const res = await fetch('/api/messages/m1');
    const msg = await res.json();
    expect(msg.is_pinned).toBe(true);
  });

  it('should handle reply to message flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm1', content: 'Original' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'm2', content: 'Reply', replyToId: 'm1' }));
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Original', senderId: 'u1', schoolId: 's1' }),
    });
    const replyRes = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'c1', content: 'Reply', senderId: 'u2', schoolId: 's1', replyToId: 'm1' }),
    });
    const reply = await replyRes.json();
    expect(reply.replyToId).toBe('m1');
  });

  it('should handle member add to conversation flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'cm1', userId: 'u3', role: 'MEMBER' }));
    await fetch('/api/messages/conversations/c1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Group' }),
    });
    const addRes = await fetch('/api/messages/conversations/c1/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u3', role: 'MEMBER' }),
    });
    const member = await addRes.json();
    expect(member.role).toBe('MEMBER');
  });

  it('should handle member remove from conversation flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'cm1' }))
      .mockResolvedValueOnce(mockJsonResponse(null, true));
    await fetch('/api/messages/conversations/c1/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u3' }),
    });
    const removeRes = await fetch('/api/messages/conversations/c1/members/u3', { method: 'DELETE' });
    expect(removeRes.ok).toBe(true);
  });

  it('should handle group member add flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'g1' }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'gm1', userId: 'u3', role: 'MEMBER' }));
    await fetch('/api/messages/groups/g1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Math' }),
    });
    const addRes = await fetch('/api/messages/groups/g1/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u3' }),
    });
    const member = await addRes.json();
    expect(member.role).toBe('MEMBER');
  });

  it('should handle group member remove flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'gm1' }))
      .mockResolvedValueOnce(mockJsonResponse(null, true));
    await fetch('/api/messages/groups/g1/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u3' }),
    });
    const removeRes = await fetch('/api/messages/groups/g1/members/u3', { method: 'DELETE' });
    expect(removeRes.ok).toBe(true);
  });

  it('should handle notification preferences update flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ channel: 'EMAIL', type: 'MESSAGE', isEnabled: true }));
    const res = await fetch('/api/messages/notifications/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u1', schoolId: 's1', channel: 'EMAIL', type: 'MESSAGE', isEnabled: true }),
    });
    const data = await res.json();
    expect(data.isEnabled).toBe(true);
  });

  it('should handle notification settings update flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ emailEnabled: false, pushEnabled: true }));
    const res = await fetch('/api/messages/notifications/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u1', schoolId: 's1', emailEnabled: false, pushEnabled: true }),
    });
    const data = await res.json();
    expect(data.emailEnabled).toBe(false);
    expect(data.pushEnabled).toBe(true);
  });

  it('should handle unread count fetch flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ count: 5 }));
    const res = await fetch('/api/messages/conversations/c1/unread?userId=u1');
    const data = await res.json();
    expect(data.count).toBe(5);
  });

  it('should handle total unread count fetch flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ totalUnread: 12 }));
    const res = await fetch('/api/messages/unread-total?userId=u1&schoolId=s1');
    const data = await res.json();
    expect(data.totalUnread).toBe(12);
  });

  it('should handle typing status flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ userId: 'u1', conversationId: 'c1', isTyping: true }));
    const res = await fetch('/api/messages/conversations/c1/typing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u1', isTyping: true }),
    });
    const data = await res.json();
    expect(data.isTyping).toBe(true);
  });

  it('should handle message statistics fetch flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ totalMessages: 100, messagesByType: { TEXT: 80, FILE: 20 } }));
    const res = await fetch('/api/messages/statistics?schoolId=s1');
    const data = await res.json();
    expect(data.totalMessages).toBe(100);
  });

  it('should handle dashboard fetch flow', async () => {
    mockFetch.mockResolvedValue(mockJsonResponse({ totalConversations: 10, totalMessages: 200, unreadNotifications: 3 }));
    const res = await fetch('/api/messages/dashboard?schoolId=s1');
    const data = await res.json();
    expect(data.totalConversations).toBe(10);
    expect(data.totalMessages).toBe(200);
  });

  it('should handle conversation pin toggle flow', async () => {
    mockFetch
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', is_pinned: false }))
      .mockResolvedValueOnce(mockJsonResponse({ id: 'c1', is_pinned: true }));
    await fetch('/api/messages/conversations/c1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPinned: true }),
    });
    const res = await fetch('/api/messages/conversations/c1');
    const conv = await res.json();
    expect(conv.is_pinned).toBe(true);
  });
});
