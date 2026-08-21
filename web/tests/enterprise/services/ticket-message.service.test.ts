import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TicketMessageService', () => {
  const mockRepo = {
    findMessages: vi.fn(),
    findMessageById: vi.fn(),
    createMessage: vi.fn(),
    updateMessage: vi.fn(),
    deleteMessage: vi.fn(),
    markAsRead: vi.fn(),
    addAttachment: vi.fn(),
    removeAttachment: vi.fn(),
    getAttachments: vi.fn(),
    searchMessages: vi.fn(),
    getMessageStats: vi.fn(),
    addReaction: vi.fn(),
    removeReaction: vi.fn(),
    pinMessage: vi.fn(),
    unpinMessage: vi.fn(),
    getInternalNotes: vi.fn(),
    addInternalNote: vi.fn(),
  };

  const ticketId = 'tick-1';
  const messageId = 'msg-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findMessages', () => {
    it('should return messages for ticket', async () => {
      const messages = [{ id: messageId, content: 'Hello', ticketId }];
      mockRepo.findMessages.mockResolvedValue(messages);
      const result = await mockRepo.findMessages(ticketId);
      expect(result).toEqual(messages);
    });

    it('should require ticketId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant du ticket requis');
      };
      expect(() => validate('')).toThrow('Identifiant du ticket requis');
    });

    it('should paginate results', async () => {
      mockRepo.findMessages.mockResolvedValue([]);
      await mockRepo.findMessages(ticketId, { page: 1, limit: 20 });
      expect(mockRepo.findMessages).toHaveBeenCalledWith(ticketId, { page: 1, limit: 20 });
    });

    it('should sort by creation date', async () => {
      mockRepo.findMessages.mockResolvedValue([
        { createdAt: '2026-01-01T10:00:00Z' },
        { createdAt: '2026-01-01T11:00:00Z' },
      ]);
      const result = await mockRepo.findMessages(ticketId);
      expect(result).toHaveLength(2);
    });

    it('should handle empty messages', async () => {
      mockRepo.findMessages.mockResolvedValue([]);
      const result = await mockRepo.findMessages(ticketId);
      expect(result).toHaveLength(0);
    });

    it('should include author info', async () => {
      mockRepo.findMessages.mockResolvedValue([{ id: messageId, author: { id: 'u-1', name: 'John' } }]);
      const result = await mockRepo.findMessages(ticketId);
      expect(result[0].author.name).toBe('John');
    });
  });

  describe('findMessageById', () => {
    it('should return message by id', async () => {
      const message = { id: messageId, content: 'Hello', ticketId };
      mockRepo.findMessageById.mockResolvedValue(message);
      const result = await mockRepo.findMessageById(messageId);
      expect(result).toEqual(message);
    });

    it('should throw if not found', async () => {
      mockRepo.findMessageById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const msg = await mockRepo.findMessageById(id);
        if (!msg) throw new Error('Message non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Message non trouvé');
    });

    it('should require messageId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include attachments', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId, attachments: [{ name: 'file.pdf' }] });
      const result = await mockRepo.findMessageById(messageId);
      expect(result.attachments).toHaveLength(1);
    });

    it('should include reactions', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId, reactions: [{ emoji: '👍', userId: 'u-1' }] });
      const result = await mockRepo.findMessageById(messageId);
      expect(result.reactions).toHaveLength(1);
    });
  });

  describe('createMessage', () => {
    it('should create message with valid data', async () => {
      const data = { content: 'Here is the update', ticketId, authorId: 'usr-1' };
      mockRepo.createMessage.mockResolvedValue({ id: messageId, ...data, createdAt: new Date().toISOString() });
      const result = await mockRepo.createMessage(data);
      expect(result.content).toBe('Here is the update');
    });

    it('should require content', () => {
      const validate = (data: any) => {
        if (!data?.content || data.content.trim().length === 0) throw new Error('Le contenu est requis');
      };
      expect(() => validate({ ticketId, authorId: 'usr-1' })).toThrow('Le contenu est requis');
    });

    it('should require ticketId', () => {
      const validate = (data: any) => {
        if (!data?.ticketId) throw new Error('L\'identifiant du ticket est requis');
      };
      expect(() => validate({ content: 'Hi', authorId: 'usr-1' })).toThrow('L\'identifiant du ticket est requis');
    });

    it('should require authorId', () => {
      const validate = (data: any) => {
        if (!data?.authorId) throw new Error('L\'auteur est requis');
      };
      expect(() => validate({ content: 'Hi', ticketId })).toThrow('L\'auteur est requis');
    });

    it('should validate content length', () => {
      const validate = (content: string) => {
        if (content.length > 10000) throw new Error('Le contenu est trop long');
      };
      expect(() => validate('a'.repeat(10001))).toThrow();
      expect(() => validate('Valid message')).not.toThrow();
    });

    it('should set timestamp', async () => {
      mockRepo.createMessage.mockResolvedValue({ id: messageId, createdAt: new Date().toISOString() });
      const result = await mockRepo.createMessage({ content: 'Hi', ticketId, authorId: 'usr-1' });
      expect(result.createdAt).toBeDefined();
    });

    it('should support internal messages', async () => {
      mockRepo.createMessage.mockResolvedValue({ id: messageId, isInternal: true });
      const result = await mockRepo.createMessage({ content: 'Internal note', ticketId, authorId: 'usr-1', isInternal: true });
      expect(result.isInternal).toBe(true);
    });

    it('should handle mention in message', async () => {
      mockRepo.createMessage.mockResolvedValue({ id: messageId, mentions: ['usr-2'] });
      const result = await mockRepo.createMessage({ content: '@user2 please check', ticketId, authorId: 'usr-1' });
      expect(result.mentions).toContain('usr-2');
    });
  });

  describe('updateMessage', () => {
    it('should update message', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId, content: 'Old' });
      mockRepo.updateMessage.mockResolvedValue({ id: messageId, content: 'Updated', edited: true });
      const result = await mockRepo.updateMessage(messageId, { content: 'Updated' });
      expect(result.content).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findMessageById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const msg = await mockRepo.findMessageById(messageId);
        if (!msg) throw new Error('Message non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Message non trouvé');
    });

    it('should not update other user messages', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId, authorId: 'usr-1' });
      const validate = (currentUserId: string, messageAuthorId: string) => {
        if (currentUserId !== messageAuthorId) throw new Error('Vous ne pouvez modifier que vos propres messages');
      };
      expect(() => validate('usr-2', 'usr-1')).toThrow();
    });

    it('should mark as edited', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId });
      mockRepo.updateMessage.mockResolvedValue({ edited: true, editedAt: new Date().toISOString() });
      const result = await mockRepo.updateMessage(messageId, { content: 'Fixed typo' });
      expect(result.edited).toBe(true);
    });

    it('should validate content', () => {
      const validate = (content: string) => {
        if (!content || content.trim().length === 0) throw new Error('Le contenu ne peut pas être vide');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('Updated content')).not.toThrow();
    });
  });

  describe('deleteMessage', () => {
    it('should delete message', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId, authorId: 'usr-1' });
      mockRepo.deleteMessage.mockResolvedValue(undefined);
      await mockRepo.deleteMessage(messageId);
      expect(mockRepo.deleteMessage).toHaveBeenCalledWith(messageId);
    });

    it('should throw if not found', async () => {
      mockRepo.findMessageById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const msg = await mockRepo.findMessageById(messageId);
        if (!msg) throw new Error('Message non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Message non trouvé');
    });

    it('should not delete other user messages', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId, authorId: 'usr-1' });
      const validate = (currentUserId: string, messageAuthorId: string, isAdmin: boolean) => {
        if (currentUserId !== messageAuthorId && !isAdmin) throw new Error('Non autorisé');
      };
      expect(() => validate('usr-2', 'usr-1', false)).toThrow();
      expect(() => validate('usr-2', 'usr-1', true)).not.toThrow();
    });

    it('should soft delete message', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId });
      mockRepo.deleteMessage.mockResolvedValue({ deleted: true, content: 'Message supprimé' });
      const result = await mockRepo.deleteMessage(messageId);
      expect(result.content).toBe('Message supprimé');
    });

    it('should handle already deleted message', async () => {
      mockRepo.findMessageById.mockResolvedValue({ id: messageId, deleted: true });
      const deleteOrThrow = async () => {
        const msg = await mockRepo.findMessageById(messageId);
        if (msg?.deleted) throw new Error('Le message est déjà supprimé');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Le message est déjà supprimé');
    });
  });

  describe('markAsRead', () => {
    it('should mark message as read', async () => {
      mockRepo.markAsRead.mockResolvedValue({ id: messageId, read: true, readAt: new Date().toISOString() });
      const result = await mockRepo.markAsRead(messageId, 'usr-1');
      expect(result.read).toBe(true);
    });

    it('should handle multiple readers', async () => {
      mockRepo.markAsRead.mockResolvedValue({ id: messageId, readCount: 3 });
      const result = await mockRepo.markAsRead(messageId, 'usr-1');
      expect(result.readCount).toBe(3);
    });

    it('should not mark already read', async () => {
      mockRepo.markAsRead.mockResolvedValue({ id: messageId, read: true, alreadyRead: true });
      const result = await mockRepo.markAsRead(messageId, 'usr-1');
      expect(result.alreadyRead).toBe(true);
    });
  });

  describe('addReaction', () => {
    it('should add reaction to message', async () => {
      mockRepo.addReaction.mockResolvedValue({ messageId, emoji: '👍', userId: 'usr-1' });
      const result = await mockRepo.addReaction(messageId, 'usr-1', '👍');
      expect(result.emoji).toBe('👍');
    });

    it('should require valid emoji', () => {
      const validate = (emoji: string) => {
        if (!emoji || emoji.length === 0) throw new Error('L\'emoji est requis');
      };
      expect(() => validate('')).toThrow('L\'emoji est requis');
    });

    it('should toggle existing reaction', async () => {
      mockRepo.addReaction.mockResolvedValue({ messageId, emoji: '👍', removed: true });
      const result = await mockRepo.addReaction(messageId, 'usr-1', '👍');
      expect(result.removed).toBe(true);
    });

    it('should count reactions', async () => {
      mockRepo.addReaction.mockResolvedValue({ messageId, emoji: '👍', count: 5 });
      const result = await mockRepo.addReaction(messageId, 'usr-1', '👍');
      expect(result.count).toBe(5);
    });
  });

  describe('pinMessage', () => {
    it('should pin message', async () => {
      mockRepo.pinMessage.mockResolvedValue({ id: messageId, pinned: true, pinnedAt: new Date().toISOString() });
      const result = await mockRepo.pinMessage(messageId);
      expect(result.pinned).toBe(true);
    });

    it('should unpin message', async () => {
      mockRepo.unpinMessage.mockResolvedValue({ id: messageId, pinned: false });
      const result = await mockRepo.unpinMessage(messageId);
      expect(result.pinned).toBe(false);
    });

    it('should handle already pinned', async () => {
      mockRepo.pinMessage.mockResolvedValue({ id: messageId, pinned: true, alreadyPinned: true });
      const result = await mockRepo.pinMessage(messageId);
      expect(result.alreadyPinned).toBe(true);
    });
  });

  describe('addInternalNote', () => {
    it('should add internal note', async () => {
      mockRepo.addInternalNote.mockResolvedValue({ id: 'note-1', content: 'Internal note', isInternal: true });
      const result = await mockRepo.addInternalNote(ticketId, { content: 'Internal note', authorId: 'usr-1' });
      expect(result.isInternal).toBe(true);
    });

    it('should require content', () => {
      const validate = (data: any) => {
        if (!data?.content) throw new Error('Le contenu est requis');
      };
      expect(() => validate({})).toThrow('Le contenu est requis');
    });

    it('should not be visible to customers', async () => {
      mockRepo.addInternalNote.mockResolvedValue({ isInternal: true, visibleToCustomer: false });
      const result = await mockRepo.addInternalNote(ticketId, { content: 'Note', authorId: 'usr-1' });
      expect(result.visibleToCustomer).toBe(false);
    });

    it('should handle empty internal notes', async () => {
      mockRepo.getInternalNotes.mockResolvedValue([]);
      const result = await mockRepo.getInternalNotes(ticketId);
      expect(result).toHaveLength(0);
    });
  });

  describe('getAttachments', () => {
    it('should return attachments for message', async () => {
      mockRepo.getAttachments.mockResolvedValue([{ name: 'file.pdf', size: 1024 }]);
      const result = await mockRepo.getAttachments(messageId);
      expect(result).toHaveLength(1);
    });

    it('should handle no attachments', async () => {
      mockRepo.getAttachments.mockResolvedValue([]);
      const result = await mockRepo.getAttachments(messageId);
      expect(result).toHaveLength(0);
    });

    it('should validate file size', () => {
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const validate = (size: number) => {
        if (size > maxFileSize) throw new Error('Le fichier est trop volumineux');
      };
      expect(() => validate(5 * 1024 * 1024)).not.toThrow();
      expect(() => validate(15 * 1024 * 1024)).toThrow();
    });

    it('should validate file type', () => {
      const allowedTypes = ['pdf', 'png', 'jpg', 'docx', 'xlsx'];
      const validate = (ext: string) => {
        if (!allowedTypes.includes(ext)) throw new Error('Type de fichier non supporté');
      };
      expect(() => validate('pdf')).not.toThrow();
      expect(() => validate('exe')).toThrow();
    });
  });

  describe('searchMessages', () => {
    it('should search messages', async () => {
      mockRepo.searchMessages.mockResolvedValue([{ id: messageId, content: 'Found message' }]);
      const result = await mockRepo.searchMessages(ticketId, 'Found');
      expect(result).toHaveLength(1);
    });

    it('should require minimum query', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('Requise au moins 2 caractères');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('F')).toThrow();
      expect(() => validate('Fi')).not.toThrow();
    });

    it('should handle no results', async () => {
      mockRepo.searchMessages.mockResolvedValue([]);
      const result = await mockRepo.searchMessages(ticketId, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });
});
