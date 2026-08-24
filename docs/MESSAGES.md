# Messages / Communication Module

## Overview

The Messages module is a comprehensive real-time communication system powering all user-to-user, group, and broadcast messaging within EduCI. It covers:

- **Messaging** — 1-to-1 and group direct messages with rich content (TEXT, IMAGE, FILE, AUDIO, VIDEO, SYSTEM, ANNOUNCEMENT, BROADCAST)
- **Conversations** — Threaded, persistent conversation contexts (PRIVATE, GROUP, CLASS, LEVEL, COHORT, PARENTS, STAFF, TEACHERS, ADMIN, DIRECTION, ACCOUNTING)
- **Notifications** — Multi-channel delivery (IN_APP, PUSH, EMAIL, SMS, WHATSAPP) with configurable preferences and quiet hours
- **Broadcasts** — One-to-many administrative announcements with scoped targeting (SINGLE, CLASS, LEVEL, ALL_PARENTS, ALL_TEACHERS, ALL_STUDENTS, ALL_STAFF, WHOLE_SCHOOL, MULTI_SCHOOL)
- **Announcements** — Scheduled, prioritized, and published notifications with expiration
- **Groups** — Persistent group chat with role-based member management (OWNER, ADMIN, MODERATOR, MEMBER)
- **Attachments** — File, image, video, audio, and archive uploads (max 25MB, 10 per message)
- **Moderation** — Report (SPAM, HARASSMENT, INAPPROPRIATE, MISINFORMATION, OTHER) and moderation actions (WARNING, MUTED, BLOCKED, REMOVED, BANNED)

---

## Architecture (DDD Layered Pattern)

The module follows strict Domain-Driven Design layering:

```
Types → Validators → Repository → Services → Hooks → Pages → API
```

| Layer | Purpose | Location |
|-------|---------|----------|
| Types | TypeScript interfaces, enums, and constants | `src/features/messages/types.ts` |
| Validators | Zod schemas for all inbound data | `src/features/messages/validators/schemas.ts` |
| Repository | Supabase data access and database queries | `src/features/messages/repositories/message.repository.ts` |
| Services | Business logic orchestration (20 services) | `src/features/messages/services/` |
| Hooks | React Query hooks for client consumption (82 hooks) | `src/features/messages/hooks/` |
| Pages | Next.js route components | `src/app/messages/` |
| API | Next.js App Router route handlers | `src/app/api/messages/` |

All layers are co-located under `web/src/features/messages/`. Mobile counterparts live under `mobile/features/messages/`.

---

## API Routes (31 route files, 38+ HTTP method handlers)

| # | Method | Route | Description |
|---|--------|-------|-------------|
| 1 | GET | `/api/messages` | List messages with filters |
| 2 | POST | `/api/messages` | Send a new message |
| 3 | GET | `/api/messages/[id]` | Get message by ID |
| 4 | PUT | `/api/messages/[id]` | Update message content |
| 5 | DELETE | `/api/messages/[id]` | Delete message (soft or permanent) |
| 6 | GET | `/api/messages/search` | Full-text message search |
| 7 | POST | `/api/messages/read` | Bulk mark messages as read |
| 8 | POST | `/api/messages/reactions` | Add/remove reaction (toggle) |
| 9 | GET | `/api/messages/reactions` | Get reactions for a message |
| 10 | POST | `/api/messages/typing` | Send typing indicator |
| 11 | GET | `/api/messages/typing` | Get typing indicators |
| 12 | POST | `/api/messages/presence` | Update user presence status |
| 13 | GET | `/api/messages/presence` | Get presence for users |
| 14 | GET | `/api/messages/notifications` | List user notifications |
| 15 | GET | `/api/messages/groups` | List groups |
| 16 | POST | `/api/messages/groups` | Create group |
| 17 | GET | `/api/messages/announcements` | List announcements |
| 18 | POST | `/api/messages/announcements` | Create announcement |
| 19 | GET | `/api/messages/broadcasts` | List broadcasts |
| 20 | POST | `/api/messages/broadcasts` | Create broadcast |
| 21 | GET | `/api/messages/attachments` | List attachments |
| 22 | POST | `/api/messages/upload` | Upload attachment |
| 23 | GET | `/api/messages/download` | Download attachment |
| 24 | POST | `/api/messages/archive` | Archive conversation |
| 25 | POST | `/api/messages/restore` | Restore conversation |
| 26 | POST | `/api/messages/sync` | Sync offline messages |
| 27 | POST | `/api/messages/realtime` | Realtime subscription management |
| 28 | POST | `/api/messages/import` | Import messages |
| 29 | POST | `/api/messages/export` | Export messages |
| 30 | POST | `/api/messages/report` | Report message |
| 31 | POST | `/api/messages/[id]/report` | Report specific message |
| 32 | POST | `/api/messages/[id]/read` | Mark specific message read |
| 33 | GET | `/api/messages/[id]/reactions` | Get reactions for message |
| 34 | POST | `/api/messages/[id]/reactions` | Add reaction to message |
| 35 | DELETE | `/api/messages/[id]/reactions` | Remove reaction from message |
| 36 | POST | `/api/messages/[id]/pin` | Toggle pin on message |
| 37 | POST | `/api/messages/[id]/forward` | Forward message |
| 38 | GET | `/api/messages/statistics` | Get message statistics |
| 39 | GET | `/api/messages/dashboard` | Get communication dashboard |
| 40 | GET | `/api/messages/timeline` | Get timeline |
| 41 | GET | `/api/messages/audit` | Get audit log |
| 42 | GET | `/api/messages/settings` | Get notification settings |
| 43 | PUT | `/api/messages/settings` | Update notification settings |

---

## Services (20 total)

| # | Service | File | Responsibility |
|---|---------|------|----------------|
| 1 | `MessageService` | `message.service.ts` | CRUD, edit, delete (soft/permanent), pin, forward, search, read receipts |
| 2 | `ConversationService` | `conversation.service.ts` | Conversation lifecycle, membership, archive/restore, pin, mute |
| 3 | `NotificationService` | `notification.service.ts` | Create, deliver, mark read, preferences, settings |
| 4 | `BroadcastService` | `broadcast.service.ts` | Create, schedule, send, and manage broadcasts |
| 5 | `AnnouncementService` | `announcement.service.ts` | Create, publish, expire, and manage announcements |
| 6 | `GroupService` | `group.service.ts` | Group CRUD, member management, archive |
| 7 | `AttachmentService` | `attachment.service.ts` | File upload, validation, download, deletion |
| 8 | `ReactionService` | `reaction.service.ts` | Add/remove/query reactions on messages |
| 9 | `SearchService` | `search.service.ts` | Full-text message and conversation search |
| 10 | `RealtimeService` | `realtime.service.ts` | WebSocket subscriptions, typing, presence |
| 11 | `ImportService` | `import.service.ts` | Import messages from external sources |
| 12 | `ExportService` | `export.service.ts` | Export messages to PDF/CSV/JSON |
| 13 | `StatisticsService` | `statistics.service.ts` | Message volume, engagement, user stats |
| 14 | `DashboardService` | `dashboard.service.ts` | Communication dashboard aggregates |
| 15 | `AuditService` | `audit.service.ts` | Immutable audit trail for all mutations |
| 16 | `ValidationService` | `validation.service.ts` | Input validation orchestration |
| 17 | `PermissionService` | `permission.service.ts` | Role-based access control checks |
| 18 | `SyncService` | `sync.service.ts` | Offline sync and conflict resolution |
| 19 | `SettingsService` | `settings.service.ts` | Notification settings and preferences |
| 20 | `TimelineService` | `timeline.service.ts` | Conversation and user timeline aggregation |

---

## Hooks (82 total)

### Core Message Hooks
| # | Hook | Purpose |
|---|------|---------|
| 1 | `useConversation` | Single conversation by ID |
| 2 | `useConversations` | List user conversations with filters |
| 3 | `useConversationMembers` | List conversation members |
| 4 | `useMessage` | Single message by ID |
| 5 | `useMessages` | List messages in conversation |
| 6 | `useSendMessage` | Mutation: send message |
| 7 | `useEditMessage` | Mutation: edit message |
| 8 | `useDeleteMessage` | Mutation: delete message |
| 9 | `usePinMessage` | Mutation: toggle pin on message |
| 10 | `useForwardMessage` | Mutation: forward message |
| 11 | `useMessageSearch` | Full-text message search |

### Reactions & Read Receipts
| # | Hook | Purpose |
|---|------|---------|
| 12 | `useReactions` | Get reactions for message |
| 13 | `useAddReaction` | Mutation: add/toggle reaction |
| 14 | `useRemoveReaction` | Mutation: remove reaction |
| 15 | `useMarkAsRead` | Mutation: mark message read |
| 16 | `useMarkConversationAsRead` | Mutation: mark conversation read |
| 17 | `useUnreadCount` | Query: unread count for conversation |
| 18 | `useTotalUnreadCount` | Query: total unread across all conversations |

### Conversation Management
| # | Hook | Purpose |
|---|------|---------|
| 19 | `useArchiveConversation` | Mutation: archive conversation |
| 20 | `useRestoreConversation` | Mutation: restore conversation |
| 21 | `usePinConversation` | Mutation: pin/unpin conversation |
| 22 | `useMuteConversation` | Mutation: mute/unmute conversation |

### Notifications
| # | Hook | Purpose |
|---|------|---------|
| 23 | `useNotifications` | List notifications |
| 24 | `useNotification` | Single notification |
| 25 | `useUnreadNotifications` | Query: unread notifications |
| 26 | `useMarkNotificationAsRead` | Mutation: mark notification read |
| 27 | `useMarkAllNotificationsAsRead` | Mutation: mark all read |
| 28 | `useDeleteNotification` | Mutation: delete notification |
| 29 | `useNotificationSettings` | Query: notification settings |
| 30 | `useNotificationPreferences` | Query: notification preferences |

### Groups
| # | Hook | Purpose |
|---|------|---------|
| 31 | `useGroups` | List groups |
| 32 | `useGroup` | Single group |
| 33 | `useCreateGroup` | Mutation: create group |
| 34 | `useUpdateGroup` | Mutation: update group |
| 35 | `useDeleteGroup` | Mutation: delete group |
| 36 | `useArchiveGroup` | Mutation: archive group |
| 37 | `useGroupMembers` | Query: group members |
| 38 | `useAddGroupMember` | Mutation: add group member |
| 39 | `useRemoveGroupMember` | Mutation: remove group member |

### Announcements
| # | Hook | Purpose |
|---|------|---------|
| 40 | `useAnnouncements` | List announcements |
| 41 | `useAnnouncement` | Single announcement |
| 42 | `useCreateAnnouncement` | Mutation: create announcement |
| 43 | `useUpdateAnnouncement` | Mutation: update announcement |
| 44 | `useDeleteAnnouncement` | Mutation: delete announcement |
| 45 | `usePublishAnnouncement` | Mutation: publish announcement |

### Broadcasts
| # | Hook | Purpose |
|---|------|---------|
| 46 | `useBroadcasts` | List broadcasts |
| 47 | `useBroadcast` | Single broadcast |
| 48 | `useCreateBroadcast` | Mutation: create broadcast |
| 49 | `useUpdateBroadcast` | Mutation: update broadcast |
| 50 | `useDeleteBroadcast` | Mutation: delete broadcast |
| 51 | `useSendBroadcast` | Mutation: send broadcast |
| 52 | `useScheduleBroadcast` | Mutation: schedule broadcast |

### Attachments
| # | Hook | Purpose |
|---|------|---------|
| 53 | `useAttachments` | List attachments |
| 54 | `useAttachment` | Single attachment |
| 55 | `useUploadAttachment` | Mutation: upload file |
| 56 | `useDownloadAttachment` | Query: download attachment |
| 57 | `useDeleteAttachment` | Mutation: delete attachment |

### Search & Statistics
| # | Hook | Purpose |
|---|------|---------|
| 58 | `useSearch` | General search |
| 59 | `useMessageStatistics` | Query: message statistics |
| 60 | `useConversationStatistics` | Query: conversation statistics |
| 61 | `useUserStatistics` | Query: user statistics |
| 62 | `useCommunicationDashboard` | Query: dashboard aggregates |
| 63 | `useRecentActivity` | Query: recent activity feed |

### Audit & Timeline
| # | Hook | Purpose |
|---|------|---------|
| 64 | `useAuditLog` | Query: audit trail |
| 65 | `useAuditEntry` | Query: single audit entry |
| 66 | `useTimeline` | Query: timeline |
| 67 | `useConversationTimeline` | Query: conversation timeline |
| 68 | `useUserTimeline` | Query: user timeline |

### Offline & Sync
| # | Hook | Purpose |
|---|------|---------|
| 69 | `useSyncMessages` | Mutation: sync offline messages |
| 70 | `useSyncConversations` | Mutation: sync offline conversations |
| 71 | `useOfflineQueue` | Query: offline queue status |
| 72 | `useProcessOfflineQueue` | Mutation: process queued items |

### Settings, Import/Export, Realtime
| # | Hook | Purpose |
|---|------|---------|
| 73 | `useSettings` | Query: user settings |
| 74 | `useUpdateSettings` | Mutation: update settings |
| 75 | `useExportMessages` | Mutation: export messages |
| 76 | `useExportConversations` | Mutation: export conversations |
| 77 | `useExportStatistics` | Mutation: export statistics |
| 78 | `useImportMessages` | Mutation: import messages |
| 79 | `useImportConversations` | Mutation: import conversations |
| 80 | `useReportMessage` | Mutation: report message |
| 81 | `useTypingStatus` | Subscribe to typing indicators |
| 82 | `usePresenceStatus` | Subscribe to presence status |

---

## Configuration

All configuration constants are imported from `@educi/config`.

### MESSAGE_LIMITS

```typescript
{
  MAX_MESSAGE_LENGTH: 10000,
  MAX_SEARCH_QUERY_LENGTH: 200,
  MIN_SEARCH_QUERY_LENGTH: 2,
  MAX_MESSAGES_PER_PAGE: 50,
  DEFAULT_MESSAGES_PER_PAGE: 20,
  MAX_CONVERSATION_MEMBERS: 500,
  MAX_GROUP_MEMBERS: 1000,
  MAX_ATTACHMENT_PER_MESSAGE: 10,
}
```

### ATTACHMENTS

```typescript
{
  MAX_FILE_SIZE_MB: 25,
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif'],
    DOCUMENT: ['application/pdf', 'application/msword'],
    VIDEO: ['video/mp4'],
    AUDIO: ['audio/mpeg'],
    ARCHIVE: ['application/zip'],
  },
  STORAGE_BUCKET: 'attachments',
}
```

### NOTIFICATIONS

```typescript
{
  CHANNELS: ['IN_APP', 'PUSH', 'EMAIL', 'SMS', 'WHATSAPP'],
  TYPES: ['MESSAGE', 'ANNOUNCEMENT', 'BROADCAST', 'MENTION', 'REACTION', 'SYSTEM', 'REMINDER'],
  BATCH_SIZE: 100,
  RETRY_COUNT: 3,
  QUIET_HOURS_DEFAULT_START: '22:00',
  QUIET_HOURS_DEFAULT_END: '07:00',
  NOTIFICATION_RETENTION_DAYS: 90,
}
```

### REALTIME

```typescript
{
  ENABLED: true,
  RECONNECT_INTERVAL_MS: 1000,
  MAX_RECONNECT_ATTEMPTS: 10,
  HEARTBEAT_INTERVAL_MS: 30000,
  TYPING_TIMEOUT_MS: 5000,
}
```

### BROADCAST

```typescript
{
  MAX_RECIPIENTS: 10000,
  BATCH_SIZE: 100,
  ALLOWED_SCOPES: ['SINGLE', 'CLASS', 'LEVEL', 'ALL_PARENTS', 'ALL_TEACHERS', 'ALL_STUDENTS', 'WHOLE_SCHOOL'],
  PRIORITY_LEVELS: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  MAX_SCHEDULE_ADVANCE_DAYS: 365,
}
```

### COMMUNICATION_PERMISSIONS

```typescript
{
  SEND_MESSAGE: ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'DIRECTOR', 'SECRETARY', 'ACCOUNTANT', 'STAFF', 'STUDENT', 'PARENT'],
  DELETE_MESSAGE: ['ADMIN', 'SUPER_ADMIN'],
  CREATE_BROADCAST: ['ADMIN', 'DIRECTOR'],
  MANAGE_GROUPS: ['ADMIN', 'DIRECTOR'],
  CREATE_GROUP: ['ADMIN', 'TEACHER'],
  CREATE_ANNOUNCEMENT: ['ADMIN', 'DIRECTOR'],
  MODERATE: ['ADMIN', 'SUPER_ADMIN'],
}
```

### MESSAGE_RETENTION

```typescript
{
  DEFAULT_RETENTION_DAYS: 365,
  MIN_RETENTION_DAYS: 30,
  MAX_RETENTION_DAYS: 3650,
  AUTO_DELETE_DELETED_MESSAGES_DAYS: 30,
  AUTO_ARCHIVE_INACTIVE_CONVERSATIONS_DAYS: 90,
}
```

### RATE_LIMITS

```typescript
{
  MESSAGES_PER_MINUTE: 60,
  MESSAGES_PER_HOUR: 500,
  MESSAGES_PER_DAY: 5000,
  SEARCH_PER_MINUTE: 30,
  BROADCASTS_PER_DAY: 10,
}
```

### FILE_TYPES

```typescript
{
  IMAGES: { EXTENSIONS: ['.jpg', '.png', '.gif'] },
  DOCUMENTS: { EXTENSIONS: ['.pdf', '.doc', '.docx'] },
  VIDEOS: { EXTENSIONS: ['.mp4', '.webm'] },
  AUDIO: { EXTENSIONS: ['.mp3', '.wav'] },
}
```

### MESSAGE_SEARCH

```typescript
{
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 200,
  DEFAULT_LIMIT: 20,
  MAX_RESULTS: 100,
  SEARCH_DELAY_MS: 300,
}
```

### MESSAGE_REALTIME

```typescript
{
  TYPING_INDICATOR_ENABLED: true,
  PRESENCE_ENABLED: true,
  READ_RECEIPTS_ENABLED: true,
  MESSAGE_EDIT_WINDOW_MINUTES: 15,
}
```

### MESSAGE_MODERATION

```typescript
{
  REPORT_REASONS: ['SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'MISINFORMATION', 'OTHER'],
  MODERATION_ACTIONS: ['WARNING', 'MUTED', 'BLOCKED', 'REMOVED', 'BANNED'],
  AUTO_MODERATION_ENABLED: true,
  MAX_REPORTS_BEFORE_ACTION: 3,
  APPEAL_ENABLED: true,
}
```

---

## Permissions Matrix

| Action | Student | Parent | Staff | Secretary | Accountant | Teacher | Director | Admin | Super Admin |
|--------|---------|--------|-------|-----------|------------|---------|----------|-------|-------------|
| Send message | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create conversation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create group | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Create announcement | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Create broadcast | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Delete any message | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Edit own message | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Delete own message | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Moderate | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage groups | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Upload attachment | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Report message | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View audit log | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage settings | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Data Flow

### Message Send → Delivery → Read Receipt → Notification

```
1. Client calls useSendMessage hook
2. API validates input via sendMessageSchema (Zod)
3. MessageService.createMessage() persists to messages table
4. Conversation last_message_at/preview updated
5. AttachmentService links any attachmentIds to message
6. RealtimeService broadcasts to conversation members via Supabase Realtime
7. NotificationService creates notifications for offline members
8. Notification channels dispatched (IN_APP, PUSH, EMAIL, SMS, WHATSAPP)
9. Client receives confirmation with message ID
10. Recipient reads message → useMarkAsRead / useMarkConversationAsRead
11. message_reads table updated with read_at timestamp
12. RealtimeService broadcasts read receipt to sender
13. NotificationService marks relevant notifications as read
```

### Search Flow

```
1. User types in search (debounced 300ms via MESSAGE_SEARCH.SEARCH_DELAY_MS)
2. useMessageSearch / useSearch hook fires
3. SearchService queries messages table with ILIKE on content
4. Results filtered by conversationId, senderId, type, date range
5. Paginated response returned (max 100 results)
```

---

## Offline / Sync Support

- **Offline queue** managed by `useOfflineQueue` and `useProcessOfflineQueue` hooks
- **Sync service** (`SyncService`) reconciles offline changes on reconnect
- **Conflict resolution** via server timestamps and last-write-wins
- **Offline queue full** error when queue exceeds capacity (OfflineQueueFullError)
- **Sync conflict** detection and resolution (SyncConflictError)
- Mobile module has dedicated sync hooks for messages and conversations

---

## Audit Logging

All mutations are recorded in the `message_audit_logs` table:

```typescript
{
  id: string;
  schoolId: string;
  userId: string;
  action: string;          // e.g. 'SEND_MESSAGE', 'DELETE_MESSAGE', 'CREATE_GROUP'
  entityType: string;      // e.g. 'message', 'conversation', 'group'
  entityId: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}
```

Accessible via `useAuditLog` hook and `GET /api/messages/audit`. Admin-only access.

---

## Error Handling

45 typed error classes in `@educi/errors`:

### Message Errors
| Error | HTTP | Description |
|-------|------|-------------|
| `MessageNotFoundError` | 404 | Message does not exist |
| `MessageDeletedError` | 409 | Message has been deleted |
| `MessageTooLongError` | 400 | Exceeds max message length |
| `MessageAlreadyReadError` | 409 | Message already marked read |
| `MessageInvalidFormatError` | 400 | Invalid message format |
| `MessageRetentionError` | 400 | Message past retention period |

### Conversation Errors
| Error | HTTP | Description |
|-------|------|-------------|
| `ConversationNotFoundError` | 404 | Conversation does not exist |
| `ConversationArchivedError` | 409 | Conversation is archived |
| `ConversationAlreadyExistsError` | 409 | Duplicate conversation |
| `ConversationFullError` | 409 | Max members reached |
| `DuplicateConversationError` | 409 | Duplicate conversation detected |

### Group Errors
| Error | HTTP | Description |
|-------|------|-------------|
| `GroupNotFoundError` | 404 | Group does not exist |
| `GroupAlreadyExistsError` | 409 | Duplicate group name |
| `GroupFullError` | 409 | Max group members reached |
| `GroupMemberNotFoundError` | 404 | Member not in group |
| `GroupMemberAlreadyExistsError` | 409 | User already in group |

### Notification Errors
| Error | HTTP | Description |
|-------|------|-------------|
| `NotificationNotFoundError` | 404 | Notification does not exist |
| `NotificationFailedError` | 500 | Notification delivery failed |
| `NotificationPreferenceError` | 400 | Invalid preference update |

### Broadcast / Announcement Errors
| Error | HTTP | Description |
|-------|------|-------------|
| `BroadcastNotFoundError` | 404 | Broadcast does not exist |
| `BroadcastAlreadySentError` | 409 | Broadcast already sent |
| `BroadcastFailedError` | 500 | Broadcast delivery failed |
| `AnnouncementNotFoundError` | 404 | Announcement does not exist |
| `AnnouncementAlreadyPublishedError` | 409 | Already published |
| `AnnouncementExpiredError` | 409 | Announcement has expired |

### Attachment Errors
| Error | HTTP | Description |
|-------|------|-------------|
| `AttachmentNotFoundError` | 404 | Attachment does not exist |
| `AttachmentTooLargeError` | 400 | Exceeds max file size |
| `AttachmentUnsupportedError` | 400 | Unsupported file type |

### System Errors
| Error | HTTP | Description |
|-------|------|-------------|
| `PermissionDeniedError` | 403 | Insufficient permissions |
| `ModerationActionError` | 400 | Invalid moderation action |
| `ReportAlreadyExistsError` | 409 | Duplicate report |
| `ReportNotFoundError` | 404 | Report does not exist |
| `SyncConflictError` | 409 | Offline sync conflict |
| `OfflineQueueFullError` | 507 | Offline queue at capacity |
| `SearchQueryTooShortError` | 400 | Query below min length |
| `SearchQueryTooLongError` | 400 | Query exceeds max length |
| `ExportFailedError` | 500 | Export operation failed |
| `ImportFailedError` | 500 | Import operation failed |
| `FileUploadFailedError` | 500 | File upload failed |
| `FileDownloadFailedError` | 500 | File download failed |
| `RealtimeDisconnectedError` | 503 | Realtime connection lost |
| `RateLimitExceededError` | 429 | Rate limit exceeded |
| `UserBlockedError` | 403 | User is blocked |
| `CannotMessageSelfError` | 400 | Cannot send message to self |
| `EncryptionError` | 500 | Encryption/decryption failure |

---

## Validators (39 Zod Schemas)

| # | Schema | Purpose |
|---|--------|---------|
| 1 | `createConversationSchema` | Validate conversation creation |
| 2 | `updateConversationSchema` | Validate conversation updates |
| 3 | `sendMessageSchema` | Validate message send |
| 4 | `editMessageSchema` | Validate message edit |
| 5 | `messageFiltersSchema` | Validate message list filters |
| 6 | `messageSearchSchema` | Validate search parameters |
| 7 | `createGroupSchema` | Validate group creation |
| 8 | `updateGroupSchema` | Validate group updates |
| 9 | `createAnnouncementSchema` | Validate announcement creation |
| 10 | `updateAnnouncementSchema` | Validate announcement updates |
| 11 | `createBroadcastSchema` | Validate broadcast creation |
| 12 | `updateBroadcastSchema` | Validate broadcast updates |
| 13 | `addReactionSchema` | Validate reaction addition |
| 14 | `notificationSettingsSchema` | Validate notification settings |
| 15 | `notificationPreferenceSchema` | Validate notification preference |
| 16 | `attachmentUploadSchema` | Validate attachment upload |
| 17 | `reportMessageSchema` | Validate message report |
| 18 | `moderationActionSchema` | Validate moderation action |
| 19 | `archiveConversationSchema` | Validate archive operation |
| 20 | `deleteMessageSchema` | Validate message deletion |
| 21 | `forwardMessageSchema` | Validate message forwarding |
| 22 | `pinMessageSchema` | Validate message pinning |
| 23 | `muteConversationSchema` | Validate mute operation |
| 24 | `bulkMarkReadSchema` | Validate bulk read marking |
| 25 | `exportMessagesSchema` | Validate message export |
| 26 | `importMessagesSchema` | Validate message import |
| 27 | `conversationSearchSchema` | Validate conversation search |
| 28 | `memberRoleSchema` | Validate member role change |
| 29 | `notificationBatchSchema` | Validate batch notifications |
| 30 | `broadcastScheduleSchema` | Validate broadcast scheduling |
| 31 | `searchFilterSchema` | Validate search filters |
| 32 | `messageStatsSchema` | Validate statistics query |
| 33 | `attachmentDownloadSchema` | Validate attachment download |
| 34 | `announcementPublishSchema` | Validate announcement publish |
| 35 | `conversationArchiveSchema` | Validate archive toggle |
| 36 | `messageRestoreSchema` | Validate message restore |
| 37 | `conversationRestoreSchema` | Validate conversation restore |
| 38 | `groupMemberSchema` | Validate group member operations |
| 39 | `settingsUpdateSchema` | Validate settings update |

---

## Mobile Module

Located at `mobile/features/messages/`. Mirrors the web module with platform-specific adaptations.

### Structure

```
mobile/features/messages/
├── hooks/
│   ├── index.ts
│   ├── useConversation.ts
│   ├── useConversations.ts
│   ├── useDashboard.ts
│   ├── useMessages.ts
│   ├── useNotifications.ts
│   └── useSendMessage.ts
├── repositories/
│   ├── index.ts
│   └── message.repository.ts
├── services/
│   ├── index.ts
│   └── message.service.ts
└── index.ts
```

### Mobile-Specific Features

| Feature | iOS | Android |
|---------|-----|---------|
| Push notifications | APNs | FCM |
| Offline queue | ✅ | ✅ |
| Background sync | ✅ | ✅ |
| Deep linking | ✅ | ✅ |

### Mobile Hooks

6 hooks available on mobile: `useConversation`, `useConversations`, `useDashboard`, `useMessages`, `useNotifications`, `useSendMessage`.

---

## Database Tables

### conversations
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,  -- PRIVATE, GROUP, CLASS, LEVEL, COHORT, etc.
  title VARCHAR(200),
  description TEXT,
  avatar_url TEXT,
  is_archived BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_muted BOOLEAN DEFAULT FALSE,
  last_message_at TIMESTAMP,
  last_message_preview VARCHAR(100),
  created_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### conversation_members
```sql
CREATE TABLE conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role VARCHAR(50) DEFAULT 'MEMBER',
  is_muted BOOLEAN DEFAULT FALSE,
  last_read_at TIMESTAMP,
  joined_at TIMESTAMP DEFAULT NOW(),
  left_at TIMESTAMP,
  UNIQUE(conversation_id, user_id)
);
```

### messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'TEXT',
  status VARCHAR(50) DEFAULT 'SENT',
  reply_to_id UUID,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_forwarded BOOLEAN DEFAULT FALSE,
  forwarded_from_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### message_attachments
```sql
CREATE TABLE message_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  file_name VARCHAR(255),
  file_type VARCHAR(100),
  file_size BIGINT,
  file_url TEXT,
  thumbnail_url TEXT,
  mime_type VARCHAR(100),
  type VARCHAR(50),  -- IMAGE, DOCUMENT, PDF, VIDEO, AUDIO, ARCHIVE, OTHER
  uploaded_by UUID,
  school_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  school_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200),
  body TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  channels TEXT[] DEFAULT ARRAY['IN_APP'],
  sent_at TIMESTAMP,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### notification_settings
```sql
CREATE TABLE notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  school_id UUID NOT NULL,
  email_enabled BOOLEAN DEFAULT FALSE,
  push_enabled BOOLEAN DEFAULT TRUE,
  sms_enabled BOOLEAN DEFAULT FALSE,
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  message_notifications BOOLEAN DEFAULT TRUE,
  announcement_notifications BOOLEAN DEFAULT TRUE,
  broadcast_notifications BOOLEAN DEFAULT TRUE,
  mention_notifications BOOLEAN DEFAULT TRUE,
  reaction_notifications BOOLEAN DEFAULT TRUE,
  system_notifications BOOLEAN DEFAULT TRUE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, school_id)
);
```

### notification_preferences
```sql
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  school_id UUID NOT NULL,
  channel VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, school_id, channel, type)
);
```

### message_reads
```sql
CREATE TABLE message_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  read_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);
```

### message_reactions
```sql
CREATE TABLE message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,  -- LIKE, LOVE, LAUGH, WOW, SAD, ANGRY
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);
```

### conversation_groups / groups
```sql
CREATE TABLE conversation_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  school_id UUID NOT NULL,
  created_by UUID,
  is_archived BOOLEAN DEFAULT FALSE,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### conversation_group_members / group_members
```sql
CREATE TABLE conversation_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES conversation_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role VARCHAR(50) DEFAULT 'MEMBER',  -- OWNER, ADMIN, MODERATOR, MEMBER
  joined_at TIMESTAMP DEFAULT NOW(),
  left_at TIMESTAMP,
  UNIQUE(group_id, user_id)
);
```

### announcements
```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  priority VARCHAR(50) NOT NULL,  -- LOW, MEDIUM, HIGH, URGENT
  target_audience VARCHAR(50),
  target_ids UUID[],
  attachment_ids UUID[],
  scheduled_at TIMESTAMP,
  expires_at TIMESTAMP,
  published_by UUID,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### broadcasts
```sql
CREATE TABLE broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  scope VARCHAR(50) NOT NULL,
  target_ids UUID[],
  channels TEXT[] NOT NULL,
  attachment_ids UUID[],
  sent_by UUID,
  sent_at TIMESTAMP,
  is_scheduled BOOLEAN DEFAULT FALSE,
  scheduled_at TIMESTAMP,
  recipient_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  read_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'DRAFT',  -- DRAFT, SCHEDULED, SENT, FAILED
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### message_audit_logs
```sql
CREATE TABLE message_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL,
  user_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  previous_value JSONB,
  new_value JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_entity ON message_audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_user ON message_audit_logs(user_id);
CREATE INDEX idx_audit_created ON message_audit_logs(created_at);
```

### typing_indicators
```sql
CREATE TABLE typing_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  user_id UUID NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);
```

### user_presence
```sql
CREATE TABLE user_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  status VARCHAR(50) DEFAULT 'offline',  -- online, away, offline
  last_seen_at TIMESTAMP DEFAULT NOW()
);
```

---

## Realtime Features

### Typing Indicators
- Users broadcast typing status via `POST /api/messages/typing`
- Stored in `typing_indicators` table, auto-expired after `REALTIME.TYPING_TIMEOUT_MS` (5s)
- Only visible to active conversation members
- Available via `useTypingStatus` hook

### Presence
- Presence status tracked in `user_presence` table (online, away, offline)
- Updated via `POST /api/messages/presence`
- Queried via `GET /api/messages/presence?userIds=...`
- Available via `usePresenceStatus` hook
- Heartbeat interval: `REALTIME.HEARTBEAT_INTERVAL_MS` (30s)

### Read Receipts
- Per-message read tracking via `message_reads` table
- Bulk read marking via `POST /api/messages/read`
- Read receipt broadcast to sender in real-time
- Configurable via `MESSAGE_REALTIME.READ_RECEIPTS_ENABLED`

### Realtime Architecture

```
Client ──Supabase Realtime──► RealtimeService
  │                                │
  │ subscribe to:                  ├── message inserts
  │ subscribe to:                  ├── message updates
  │ subscribe to:                  ├── typing_indicators
  │ subscribe to:                  ├── user_presence
  │ subscribe to:                  ├── notifications
  │                                │
  │ publish via API:               │
  │   POST /api/messages           ├── send message
  │   POST /api/messages/typing    ├── typing status
  │   POST /api/messages/presence  ├── presence update
  │   POST /api/messages/read      ├── read receipts
  │   POST /api/messages/reactions ├── reactions
```

### Reconnection

- Automatic reconnection on disconnect
- `REALTIME.MAX_RECONNECT_ATTEMPTS`: 10
- `REALTIME.RECONNECT_INTERVAL_MS`: 1000ms (exponential backoff)
- `RealtimeDisconnectedError` thrown when connection lost

---

## Tests

16 test files in `web/tests/messages/`:

| # | Test File | Coverage |
|---|-----------|----------|
| 1 | `types.test.ts` | Type definitions and interfaces |
| 2 | `validators.test.ts` | All 39 Zod schemas |
| 3 | `repositories.test.ts` | Repository CRUD operations |
| 4 | `services.test.ts` | Core service logic |
| 5 | `services-sync.test.ts` | Sync service offline handling |
| 6 | `services-moderation.test.ts` | Moderation service actions |
| 7 | `services-extended.test.ts` | Extended service scenarios |
| 8 | `services-analytics.test.ts` | Analytics and statistics |
| 9 | `hooks.test.ts` | React Query hooks |
| 10 | `hooks-extended.test.ts` | Extended hook scenarios |
| 11 | `errors.test.ts` | All 45 error classes |
| 12 | `config.test.ts` | All 12 config sections |
| 13 | `permissions.test.ts` | Permission service logic |
| 14 | `data-flow.test.ts` | End-to-end data flow |
| 15 | `api.test.ts` | API route handlers |
| 16 | `api-extended.test.ts` | Extended API scenarios |
