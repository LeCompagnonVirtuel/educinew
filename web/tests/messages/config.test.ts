import { describe, it, expect } from 'vitest';
import {
  MESSAGE_LIMITS,
  ATTACHMENTS,
  NOTIFICATIONS,
  REALTIME,
  BROADCAST,
  COMMUNICATION_PERMISSIONS,
  MESSAGE_RETENTION,
  RATE_LIMITS,
  FILE_TYPES,
  MESSAGE_SEARCH,
  MESSAGE_REALTIME,
  MESSAGE_MODERATION,
} from '@educi/config';

describe('Message Config', () => {
  describe('MESSAGE_LIMITS', () => {
    it('should have max message length', () => {
      expect(MESSAGE_LIMITS.MAX_MESSAGE_LENGTH).toBe(10000);
    });

    it('should have max search query length', () => {
      expect(MESSAGE_LIMITS.MAX_SEARCH_QUERY_LENGTH).toBe(200);
    });

    it('should have min search query length', () => {
      expect(MESSAGE_LIMITS.MIN_SEARCH_QUERY_LENGTH).toBe(2);
    });

    it('should have max messages per page', () => {
      expect(MESSAGE_LIMITS.MAX_MESSAGES_PER_PAGE).toBe(50);
    });

    it('should have default messages per page', () => {
      expect(MESSAGE_LIMITS.DEFAULT_MESSAGES_PER_PAGE).toBe(20);
    });

    it('should have max conversation members', () => {
      expect(MESSAGE_LIMITS.MAX_CONVERSATION_MEMBERS).toBe(500);
    });

    it('should have max group members', () => {
      expect(MESSAGE_LIMITS.MAX_GROUP_MEMBERS).toBe(1000);
    });

    it('should have max attachments per message', () => {
      expect(MESSAGE_LIMITS.MAX_ATTACHMENT_PER_MESSAGE).toBe(10);
    });
  });

  describe('ATTACHMENTS', () => {
    it('should have max file size', () => {
      expect(ATTACHMENTS.MAX_FILE_SIZE_MB).toBe(25);
    });

    it('should have allowed image types', () => {
      expect(ATTACHMENTS.ALLOWED_TYPES.IMAGE).toContain('image/jpeg');
      expect(ATTACHMENTS.ALLOWED_TYPES.IMAGE).toContain('image/png');
      expect(ATTACHMENTS.ALLOWED_TYPES.IMAGE).toContain('image/gif');
    });

    it('should have allowed document types', () => {
      expect(ATTACHMENTS.ALLOWED_TYPES.DOCUMENT).toContain('application/pdf');
      expect(ATTACHMENTS.ALLOWED_TYPES.DOCUMENT).toContain('application/msword');
    });

    it('should have allowed video types', () => {
      expect(ATTACHMENTS.ALLOWED_TYPES.VIDEO).toContain('video/mp4');
    });

    it('should have allowed audio types', () => {
      expect(ATTACHMENTS.ALLOWED_TYPES.AUDIO).toContain('audio/mpeg');
    });

    it('should have allowed archive types', () => {
      expect(ATTACHMENTS.ALLOWED_TYPES.ARCHIVE).toContain('application/zip');
    });

    it('should have storage bucket', () => {
      expect(ATTACHMENTS.STORAGE_BUCKET).toBe('attachments');
    });
  });

  describe('NOTIFICATIONS', () => {
    it('should have all channels', () => {
      expect(NOTIFICATIONS.CHANNELS).toContain('IN_APP');
      expect(NOTIFICATIONS.CHANNELS).toContain('PUSH');
      expect(NOTIFICATIONS.CHANNELS).toContain('EMAIL');
      expect(NOTIFICATIONS.CHANNELS).toContain('SMS');
      expect(NOTIFICATIONS.CHANNELS).toContain('WHATSAPP');
    });

    it('should have all types', () => {
      expect(NOTIFICATIONS.TYPES).toContain('MESSAGE');
      expect(NOTIFICATIONS.TYPES).toContain('ANNOUNCEMENT');
      expect(NOTIFICATIONS.TYPES).toContain('BROADCAST');
      expect(NOTIFICATIONS.TYPES).toContain('MENTION');
      expect(NOTIFICATIONS.TYPES).toContain('REACTION');
      expect(NOTIFICATIONS.TYPES).toContain('SYSTEM');
      expect(NOTIFICATIONS.TYPES).toContain('REMINDER');
    });

    it('should have batch size', () => {
      expect(NOTIFICATIONS.BATCH_SIZE).toBe(100);
    });

    it('should have retry count', () => {
      expect(NOTIFICATIONS.RETRY_COUNT).toBe(3);
    });

    it('should have quiet hours defaults', () => {
      expect(NOTIFICATIONS.QUIET_HOURS_DEFAULT_START).toBe('22:00');
      expect(NOTIFICATIONS.QUIET_HOURS_DEFAULT_END).toBe('07:00');
    });

    it('should have notification retention days', () => {
      expect(NOTIFICATIONS.NOTIFICATION_RETENTION_DAYS).toBe(90);
    });
  });

  describe('REALTIME', () => {
    it('should be enabled', () => {
      expect(REALTIME.ENABLED).toBe(true);
    });

    it('should have reconnect settings', () => {
      expect(REALTIME.RECONNECT_INTERVAL_MS).toBe(1000);
      expect(REALTIME.MAX_RECONNECT_ATTEMPTS).toBe(10);
    });

    it('should have heartbeat interval', () => {
      expect(REALTIME.HEARTBEAT_INTERVAL_MS).toBe(30000);
    });

    it('should have typing timeout', () => {
      expect(REALTIME.TYPING_TIMEOUT_MS).toBe(5000);
    });
  });

  describe('BROADCAST', () => {
    it('should have max recipients', () => {
      expect(BROADCAST.MAX_RECIPIENTS).toBe(10000);
    });

    it('should have batch size', () => {
      expect(BROADCAST.BATCH_SIZE).toBe(100);
    });

    it('should have allowed scopes', () => {
      expect(BROADCAST.ALLOWED_SCOPES).toContain('SINGLE');
      expect(BROADCAST.ALLOWED_SCOPES).toContain('CLASS');
      expect(BROADCAST.ALLOWED_SCOPES).toContain('LEVEL');
      expect(BROADCAST.ALLOWED_SCOPES).toContain('ALL_PARENTS');
      expect(BROADCAST.ALLOWED_SCOPES).toContain('ALL_TEACHERS');
      expect(BROADCAST.ALLOWED_SCOPES).toContain('ALL_STUDENTS');
      expect(BROADCAST.ALLOWED_SCOPES).toContain('WHOLE_SCHOOL');
    });

    it('should have priority levels', () => {
      expect(BROADCAST.PRIORITY_LEVELS).toContain('LOW');
      expect(BROADCAST.PRIORITY_LEVELS).toContain('MEDIUM');
      expect(BROADCAST.PRIORITY_LEVELS).toContain('HIGH');
      expect(BROADCAST.PRIORITY_LEVELS).toContain('URGENT');
    });

    it('should have max schedule advance days', () => {
      expect(BROADCAST.MAX_SCHEDULE_ADVANCE_DAYS).toBe(365);
    });
  });

  describe('COMMUNICATION_PERMISSIONS', () => {
    it('should define SEND_MESSAGE permissions', () => {
      expect(COMMUNICATION_PERMISSIONS.SEND_MESSAGE).toContain('ADMIN');
      expect(COMMUNICATION_PERMISSIONS.SEND_MESSAGE).toContain('TEACHER');
      expect(COMMUNICATION_PERMISSIONS.SEND_MESSAGE).toContain('STUDENT');
      expect(COMMUNICATION_PERMISSIONS.SEND_MESSAGE).toContain('PARENT');
    });

    it('should define DELETE_MESSAGE permissions', () => {
      expect(COMMUNICATION_PERMISSIONS.DELETE_MESSAGE).toContain('ADMIN');
      expect(COMMUNICATION_PERMISSIONS.DELETE_MESSAGE).toContain('SUPER_ADMIN');
    });

    it('should define CREATE_BROADCAST permissions', () => {
      expect(COMMUNICATION_PERMISSIONS.CREATE_BROADCAST).toContain('ADMIN');
      expect(COMMUNICATION_PERMISSIONS.CREATE_BROADCAST).toContain('DIRECTOR');
    });

    it('should define MANAGE_GROUPS permissions', () => {
      expect(COMMUNICATION_PERMISSIONS.MANAGE_GROUPS).toContain('ADMIN');
      expect(COMMUNICATION_PERMISSIONS.MANAGE_GROUPS).toContain('DIRECTOR');
    });

    it('should define CREATE_GROUP permissions', () => {
      expect(COMMUNICATION_PERMISSIONS.CREATE_GROUP).toContain('ADMIN');
      expect(COMMUNICATION_PERMISSIONS.CREATE_GROUP).toContain('TEACHER');
    });

    it('should define CREATE_ANNOUNCEMENT permissions', () => {
      expect(COMMUNICATION_PERMISSIONS.CREATE_ANNOUNCEMENT).toContain('ADMIN');
      expect(COMMUNICATION_PERMISSIONS.CREATE_ANNOUNCEMENT).toContain('DIRECTOR');
    });

    it('should define MODERATE permissions', () => {
      expect(COMMUNICATION_PERMISSIONS.MODERATE).toContain('ADMIN');
      expect(COMMUNICATION_PERMISSIONS.MODERATE).toContain('SUPER_ADMIN');
    });
  });

  describe('MESSAGE_RETENTION', () => {
    it('should have default retention days', () => {
      expect(MESSAGE_RETENTION.DEFAULT_RETENTION_DAYS).toBe(365);
    });

    it('should have min retention days', () => {
      expect(MESSAGE_RETENTION.MIN_RETENTION_DAYS).toBe(30);
    });

    it('should have max retention days', () => {
      expect(MESSAGE_RETENTION.MAX_RETENTION_DAYS).toBe(3650);
    });

    it('should have auto delete deleted messages days', () => {
      expect(MESSAGE_RETENTION.AUTO_DELETE_DELETED_MESSAGES_DAYS).toBe(30);
    });

    it('should have auto archive inactive conversations days', () => {
      expect(MESSAGE_RETENTION.AUTO_ARCHIVE_INACTIVE_CONVERSATIONS_DAYS).toBe(90);
    });
  });

  describe('RATE_LIMITS', () => {
    it('should have messages per minute', () => {
      expect(RATE_LIMITS.MESSAGES_PER_MINUTE).toBe(60);
    });

    it('should have messages per hour', () => {
      expect(RATE_LIMITS.MESSAGES_PER_HOUR).toBe(500);
    });

    it('should have messages per day', () => {
      expect(RATE_LIMITS.MESSAGES_PER_DAY).toBe(5000);
    });

    it('should have search per minute', () => {
      expect(RATE_LIMITS.SEARCH_PER_MINUTE).toBe(30);
    });

    it('should have broadcasts per day', () => {
      expect(RATE_LIMITS.BROADCASTS_PER_DAY).toBe(10);
    });
  });

  describe('FILE_TYPES', () => {
    it('should have image extensions', () => {
      expect(FILE_TYPES.IMAGES.EXTENSIONS).toContain('.jpg');
      expect(FILE_TYPES.IMAGES.EXTENSIONS).toContain('.png');
      expect(FILE_TYPES.IMAGES.EXTENSIONS).toContain('.gif');
    });

    it('should have document extensions', () => {
      expect(FILE_TYPES.DOCUMENTS.EXTENSIONS).toContain('.pdf');
      expect(FILE_TYPES.DOCUMENTS.EXTENSIONS).toContain('.doc');
      expect(FILE_TYPES.DOCUMENTS.EXTENSIONS).toContain('.docx');
    });

    it('should have video extensions', () => {
      expect(FILE_TYPES.VIDEOS.EXTENSIONS).toContain('.mp4');
      expect(FILE_TYPES.VIDEOS.EXTENSIONS).toContain('.webm');
    });

    it('should have audio extensions', () => {
      expect(FILE_TYPES.AUDIO.EXTENSIONS).toContain('.mp3');
      expect(FILE_TYPES.AUDIO.EXTENSIONS).toContain('.wav');
    });
  });

  describe('MESSAGE_SEARCH', () => {
    it('should have min query length', () => {
      expect(MESSAGE_SEARCH.MIN_QUERY_LENGTH).toBe(2);
    });

    it('should have max query length', () => {
      expect(MESSAGE_SEARCH.MAX_QUERY_LENGTH).toBe(200);
    });

    it('should have default limit', () => {
      expect(MESSAGE_SEARCH.DEFAULT_LIMIT).toBe(20);
    });

    it('should have max results', () => {
      expect(MESSAGE_SEARCH.MAX_RESULTS).toBe(100);
    });

    it('should have search delay', () => {
      expect(MESSAGE_SEARCH.SEARCH_DELAY_MS).toBe(300);
    });
  });

  describe('MESSAGE_REALTIME', () => {
    it('should have typing indicator enabled', () => {
      expect(MESSAGE_REALTIME.TYPING_INDICATOR_ENABLED).toBe(true);
    });

    it('should have presence enabled', () => {
      expect(MESSAGE_REALTIME.PRESENCE_ENABLED).toBe(true);
    });

    it('should have read receipts enabled', () => {
      expect(MESSAGE_REALTIME.READ_RECEIPTS_ENABLED).toBe(true);
    });

    it('should have message edit window', () => {
      expect(MESSAGE_REALTIME.MESSAGE_EDIT_WINDOW_MINUTES).toBe(15);
    });
  });

  describe('MESSAGE_MODERATION', () => {
    it('should have report reasons', () => {
      expect(MESSAGE_MODERATION.REPORT_REASONS).toContain('SPAM');
      expect(MESSAGE_MODERATION.REPORT_REASONS).toContain('HARASSMENT');
      expect(MESSAGE_MODERATION.REPORT_REASONS).toContain('INAPPROPRIATE');
      expect(MESSAGE_MODERATION.REPORT_REASONS).toContain('MISINFORMATION');
      expect(MESSAGE_MODERATION.REPORT_REASONS).toContain('OTHER');
    });

    it('should have moderation actions', () => {
      expect(MESSAGE_MODERATION.MODERATION_ACTIONS).toContain('WARNING');
      expect(MESSAGE_MODERATION.MODERATION_ACTIONS).toContain('MUTED');
      expect(MESSAGE_MODERATION.MODERATION_ACTIONS).toContain('BLOCKED');
      expect(MESSAGE_MODERATION.MODERATION_ACTIONS).toContain('REMOVED');
      expect(MESSAGE_MODERATION.MODERATION_ACTIONS).toContain('BANNED');
    });

    it('should have auto moderation enabled', () => {
      expect(MESSAGE_MODERATION.AUTO_MODERATION_ENABLED).toBe(true);
    });

    it('should have max reports before action', () => {
      expect(MESSAGE_MODERATION.MAX_REPORTS_BEFORE_ACTION).toBe(3);
    });

    it('should have appeal enabled', () => {
      expect(MESSAGE_MODERATION.APPEAL_ENABLED).toBe(true);
    });
  });
});
