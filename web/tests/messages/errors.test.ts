import { describe, it, expect } from 'vitest';
import {
  MessageNotFoundError,
  MessageDeletedError,
  MessageTooLongError,
  MessageAlreadyReadError,
  MessageInvalidFormatError,
  MessageRetentionError,
  ConversationNotFoundError,
  ConversationArchivedError,
  ConversationAlreadyExistsError,
  ConversationFullError,
  DuplicateConversationError,
  NotificationNotFoundError,
  NotificationFailedError,
  NotificationPreferenceError,
  GroupNotFoundError,
  GroupAlreadyExistsError,
  GroupFullError,
  GroupMemberNotFoundError,
  GroupMemberAlreadyExistsError,
  AnnouncementNotFoundError,
  AnnouncementAlreadyPublishedError,
  AnnouncementExpiredError,
  BroadcastNotFoundError,
  BroadcastAlreadySentError,
  BroadcastFailedError,
  AttachmentNotFoundError,
  AttachmentTooLargeError,
  AttachmentUnsupportedError,
  PermissionDeniedError,
  ModerationActionError,
  ReportAlreadyExistsError,
  ReportNotFoundError,
  SyncConflictError,
  OfflineQueueFullError,
  SearchQueryTooShortError,
  SearchQueryTooLongError,
  ExportFailedError,
  ImportFailedError,
  FileUploadFailedError,
  FileDownloadFailedError,
  RealtimeDisconnectedError,
  RateLimitExceededError,
  UserBlockedError,
  CannotMessageSelfError,
  EncryptionError,
} from '@educi/errors';

describe('Message Errors', () => {
  it('MessageNotFoundError should have correct message', () => {
    const error = new MessageNotFoundError();
    expect(error).toBeInstanceOf(MessageNotFoundError);
    expect(error.message).toContain('Message');
    expect(error.statusCode).toBe(404);
  });

  it('MessageNotFoundError should accept identifier', () => {
    const error = new MessageNotFoundError('MSG001');
    expect(error.message).toContain('MSG001');
  });

  it('MessageDeletedError should have correct message', () => {
    const error = new MessageDeletedError();
    expect(error).toBeInstanceOf(MessageDeletedError);
    expect(error.message).toContain('supprimé');
    expect(error.statusCode).toBe(409);
  });

  it('MessageTooLongError should have correct code', () => {
    const error = new MessageTooLongError(10000);
    expect(error).toBeInstanceOf(MessageTooLongError);
    expect(error.message).toContain('10000');
    expect(error.statusCode).toBe(400);
  });

  it('MessageAlreadyReadError should have correct message', () => {
    const error = new MessageAlreadyReadError();
    expect(error).toBeInstanceOf(MessageAlreadyReadError);
    expect(error.message).toContain('lu');
    expect(error.statusCode).toBe(409);
  });

  it('MessageInvalidFormatError should have correct code', () => {
    const error = new MessageInvalidFormatError();
    expect(error).toBeInstanceOf(MessageInvalidFormatError);
    expect(error.message).toContain('invalide');
    expect(error.statusCode).toBe(400);
  });

  it('MessageRetentionError should have correct code', () => {
    const error = new MessageRetentionError();
    expect(error).toBeInstanceOf(MessageRetentionError);
    expect(error.statusCode).toBe(400);
  });

  it('ConversationNotFoundError should have correct message', () => {
    const error = new ConversationNotFoundError();
    expect(error).toBeInstanceOf(ConversationNotFoundError);
    expect(error.message).toContain('Conversation');
    expect(error.statusCode).toBe(404);
  });

  it('ConversationNotFoundError should accept identifier', () => {
    const error = new ConversationNotFoundError('CONV001');
    expect(error.message).toContain('CONV001');
  });

  it('ConversationArchivedError should have correct message', () => {
    const error = new ConversationArchivedError();
    expect(error).toBeInstanceOf(ConversationArchivedError);
    expect(error.message).toContain('archivée');
    expect(error.statusCode).toBe(409);
  });

  it('ConversationAlreadyExistsError should have correct code', () => {
    const error = new ConversationAlreadyExistsError();
    expect(error).toBeInstanceOf(ConversationAlreadyExistsError);
    expect(error.statusCode).toBe(409);
  });

  it('ConversationFullError should have correct code', () => {
    const error = new ConversationFullError();
    expect(error).toBeInstanceOf(ConversationFullError);
    expect(error.statusCode).toBe(409);
  });

  it('DuplicateConversationError should have correct code', () => {
    const error = new DuplicateConversationError();
    expect(error).toBeInstanceOf(DuplicateConversationError);
    expect(error.statusCode).toBe(409);
  });

  it('NotificationNotFoundError should have correct message', () => {
    const error = new NotificationNotFoundError();
    expect(error).toBeInstanceOf(NotificationNotFoundError);
    expect(error.message).toContain('Notification');
    expect(error.statusCode).toBe(404);
  });

  it('NotificationNotFoundError should accept identifier', () => {
    const error = new NotificationNotFoundError('NOTIF001');
    expect(error.message).toContain('NOTIF001');
  });

  it('NotificationFailedError should have correct code', () => {
    const error = new NotificationFailedError();
    expect(error).toBeInstanceOf(NotificationFailedError);
    expect(error.statusCode).toBe(500);
  });

  it('NotificationPreferenceError should have correct code', () => {
    const error = new NotificationPreferenceError();
    expect(error).toBeInstanceOf(NotificationPreferenceError);
    expect(error.statusCode).toBe(400);
  });

  it('GroupNotFoundError should have correct message', () => {
    const error = new GroupNotFoundError();
    expect(error).toBeInstanceOf(GroupNotFoundError);
    expect(error.message).toContain('Groupe');
    expect(error.statusCode).toBe(404);
  });

  it('GroupNotFoundError should accept identifier', () => {
    const error = new GroupNotFoundError('GRP001');
    expect(error.message).toContain('GRP001');
  });

  it('GroupAlreadyExistsError should have correct code', () => {
    const error = new GroupAlreadyExistsError('Test');
    expect(error).toBeInstanceOf(GroupAlreadyExistsError);
    expect(error.message).toContain('Test');
    expect(error.statusCode).toBe(409);
  });

  it('GroupFullError should have correct code', () => {
    const error = new GroupFullError('TestGroup');
    expect(error).toBeInstanceOf(GroupFullError);
    expect(error.message).toContain('TestGroup');
    expect(error.statusCode).toBe(409);
  });

  it('GroupMemberNotFoundError should have correct message', () => {
    const error = new GroupMemberNotFoundError();
    expect(error).toBeInstanceOf(GroupMemberNotFoundError);
    expect(error.message).toContain('Membre');
    expect(error.statusCode).toBe(404);
  });

  it('GroupMemberAlreadyExistsError should have correct code', () => {
    const error = new GroupMemberAlreadyExistsError();
    expect(error).toBeInstanceOf(GroupMemberAlreadyExistsError);
    expect(error.statusCode).toBe(409);
  });

  it('AnnouncementNotFoundError should have correct message', () => {
    const error = new AnnouncementNotFoundError();
    expect(error).toBeInstanceOf(AnnouncementNotFoundError);
    expect(error.message).toContain('Annonce');
    expect(error.statusCode).toBe(404);
  });

  it('AnnouncementNotFoundError should accept identifier', () => {
    const error = new AnnouncementNotFoundError('ANN001');
    expect(error.message).toContain('ANN001');
  });

  it('AnnouncementAlreadyPublishedError should have correct code', () => {
    const error = new AnnouncementAlreadyPublishedError();
    expect(error).toBeInstanceOf(AnnouncementAlreadyPublishedError);
    expect(error.message).toContain('publiée');
    expect(error.statusCode).toBe(409);
  });

  it('AnnouncementExpiredError should have correct message', () => {
    const error = new AnnouncementExpiredError();
    expect(error).toBeInstanceOf(AnnouncementExpiredError);
    expect(error.message).toContain('expirée');
    expect(error.statusCode).toBe(409);
  });

  it('BroadcastNotFoundError should have correct message', () => {
    const error = new BroadcastNotFoundError();
    expect(error).toBeInstanceOf(BroadcastNotFoundError);
    expect(error.message).toContain('Diffusion');
    expect(error.statusCode).toBe(404);
  });

  it('BroadcastNotFoundError should accept identifier', () => {
    const error = new BroadcastNotFoundError('BRD001');
    expect(error.message).toContain('BRD001');
  });

  it('BroadcastAlreadySentError should have correct message', () => {
    const error = new BroadcastAlreadySentError();
    expect(error).toBeInstanceOf(BroadcastAlreadySentError);
    expect(error.message).toContain('envoyée');
    expect(error.statusCode).toBe(409);
  });

  it('BroadcastFailedError should have correct code', () => {
    const error = new BroadcastFailedError();
    expect(error).toBeInstanceOf(BroadcastFailedError);
    expect(error.statusCode).toBe(500);
  });

  it('AttachmentNotFoundError should have correct message', () => {
    const error = new AttachmentNotFoundError();
    expect(error).toBeInstanceOf(AttachmentNotFoundError);
    expect(error.message).toContain('Pièce jointe');
    expect(error.statusCode).toBe(404);
  });

  it('AttachmentNotFoundError should accept identifier', () => {
    const error = new AttachmentNotFoundError('ATT001');
    expect(error.message).toContain('ATT001');
  });

  it('AttachmentTooLargeError should have correct message', () => {
    const error = new AttachmentTooLargeError('25MB');
    expect(error).toBeInstanceOf(AttachmentTooLargeError);
    expect(error.message).toContain('25MB');
    expect(error.statusCode).toBe(400);
  });

  it('AttachmentUnsupportedError should have correct code', () => {
    const error = new AttachmentUnsupportedError('application/x-exe');
    expect(error).toBeInstanceOf(AttachmentUnsupportedError);
    expect(error.message).toContain('application/x-exe');
    expect(error.statusCode).toBe(400);
  });

  it('PermissionDeniedError should have correct code', () => {
    const error = new PermissionDeniedError();
    expect(error).toBeInstanceOf(PermissionDeniedError);
    expect(error.message).toContain('Permission');
    expect(error.statusCode).toBe(403);
  });

  it('ModerationActionError should have correct code', () => {
    const error = new ModerationActionError();
    expect(error).toBeInstanceOf(ModerationActionError);
    expect(error.message).toContain('modération');
    expect(error.statusCode).toBe(400);
  });

  it('ReportAlreadyExistsError should have correct code', () => {
    const error = new ReportAlreadyExistsError();
    expect(error).toBeInstanceOf(ReportAlreadyExistsError);
    expect(error.statusCode).toBe(409);
  });

  it('ReportNotFoundError should have correct code', () => {
    const error = new ReportNotFoundError();
    expect(error).toBeInstanceOf(ReportNotFoundError);
    expect(error.statusCode).toBe(404);
  });

  it('SyncConflictError should have correct code', () => {
    const error = new SyncConflictError();
    expect(error).toBeInstanceOf(SyncConflictError);
    expect(error.statusCode).toBe(409);
  });

  it('OfflineQueueFullError should have correct code', () => {
    const error = new OfflineQueueFullError();
    expect(error).toBeInstanceOf(OfflineQueueFullError);
    expect(error.statusCode).toBe(507);
  });

  it('SearchQueryTooShortError should have correct message', () => {
    const error = new SearchQueryTooShortError(2);
    expect(error).toBeInstanceOf(SearchQueryTooShortError);
    expect(error.message).toContain('2');
    expect(error.statusCode).toBe(400);
  });

  it('SearchQueryTooLongError should have correct message', () => {
    const error = new SearchQueryTooLongError(200);
    expect(error).toBeInstanceOf(SearchQueryTooLongError);
    expect(error.message).toContain('200');
    expect(error.statusCode).toBe(400);
  });

  it('ExportFailedError should have correct code', () => {
    const error = new ExportFailedError();
    expect(error).toBeInstanceOf(ExportFailedError);
    expect(error.statusCode).toBe(500);
  });

  it('ImportFailedError should have correct code', () => {
    const error = new ImportFailedError();
    expect(error).toBeInstanceOf(ImportFailedError);
    expect(error.statusCode).toBe(500);
  });

  it('FileUploadFailedError should have correct code', () => {
    const error = new FileUploadFailedError();
    expect(error).toBeInstanceOf(FileUploadFailedError);
    expect(error.statusCode).toBe(500);
  });

  it('FileDownloadFailedError should have correct code', () => {
    const error = new FileDownloadFailedError();
    expect(error).toBeInstanceOf(FileDownloadFailedError);
    expect(error.statusCode).toBe(500);
  });

  it('RealtimeDisconnectedError should have correct code', () => {
    const error = new RealtimeDisconnectedError();
    expect(error).toBeInstanceOf(RealtimeDisconnectedError);
    expect(error.statusCode).toBe(503);
  });

  it('RateLimitExceededError should have correct code', () => {
    const error = new RateLimitExceededError();
    expect(error).toBeInstanceOf(RateLimitExceededError);
    expect(error.statusCode).toBe(429);
  });

  it('UserBlockedError should have correct code', () => {
    const error = new UserBlockedError();
    expect(error).toBeInstanceOf(UserBlockedError);
    expect(error.statusCode).toBe(403);
  });

  it('CannotMessageSelfError should have correct code', () => {
    const error = new CannotMessageSelfError();
    expect(error).toBeInstanceOf(CannotMessageSelfError);
    expect(error.statusCode).toBe(400);
  });

  it('EncryptionError should have correct code', () => {
    const error = new EncryptionError();
    expect(error).toBeInstanceOf(EncryptionError);
    expect(error.statusCode).toBe(500);
  });
});
