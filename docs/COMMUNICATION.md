# Communication & Collaboration Module

## Overview

The Communication & Collaboration Module is the enterprise-grade real-time communication and collaboration layer of EduCI. It provides comprehensive messaging, voice/video calling, email, SMS, push notifications, announcements, calendar, tasks, documents, AI-powered features, and multi-channel notification delivery across all institutional domains — students, teachers, parents, staff, and administration.

### Core Capabilities

- **Conversations & Messaging** — Direct, group, channel, and broadcast messaging with rich content types
- **Groups & Channels** — CRUD, member management, permissions, settings, and moderation
- **Calls** — Audio, video, conference, recording, and screen sharing
- **Email** — Send, templates, campaigns, tracking, and signatures
- **SMS** — Send, bulk, templates, and provider integration
- **Push Notifications** — Send, subscribe, templates, and device management
- **Announcements** — Create, publish, acknowledge, and targeting
- **Calendar** — Events, attendees, reminders, and subscriptions
- **Tasks** — Create, assign, comments, and checklists
- **Documents** — CRUD, versions, permissions, and comments
- **Collaboration** — Sessions, presence, and real-time editing
- **AI Features** — Summaries, translation, correction, and spam detection
- **Notifications** — Preferences, batching, and multi-channel delivery
- **Contacts** — CRUD, groups, and sync
- **Polls** — Create, vote, close, and results
- **Webhooks** — CRUD and event triggers
- **Channels** — Create, manage, and moderate
- **Presence** — Online status, typing indicators, and availability
- **Auto-Responses** — Trigger-based replies and rules
- **Search** — Cross-module search with filters
- **Export** — Conversation and document export
- **Scheduled Messages** — Schedule and cancel

---

## Architecture

### Design Patterns

| Pattern | Implementation |
|---------|---------------|
| DDD (Domain-Driven Design) | Domains: conversations, messages, calls, email, sms, push, announcements, calendar, tasks, documents, collaboration, contacts, polls, webhooks, channels, presence, notifications |
| Repository Pattern | `communication.repository.ts` — 1400+ line Supabase data access layer |
| Service Layer | 30 service files with domain-specific logic |
| Hook Layer | 95 React hooks for UI state management |
| Validation Layer | 60+ Zod schemas for API input validation |
| Event-Driven | Webhook event triggers, real-time subscriptions |
| Observer Pattern | Presence, typing indicators, read receipts |
| Strategy Pattern | Multi-provider email, SMS, push integration |
| Circuit Breaker | External provider fallback and retry logic |

### Data Flow

```
Page Component → Hook → Service → Repository → Supabase
      ↓              ↓         ↓           ↓
    (UI)      (React State) (Business)  (Data Access)
      ↓              ↓         ↓           ↓
  (Real-time)  (WebSocket) (Events)   (RLS Policies)
```

### Multi-Tenancy

All queries are scoped by `schoolId` parameter. The repository enforces tenant isolation at the data access level via Supabase Row Level Security (RLS) policies.

---

## Module Structure

### File Inventory

| Layer | Count | Description |
|-------|-------|-------------|
| Types | 1 (`types.ts`) | Re-exports from `@educi/types` |
| Validators | 1 (`schemas.ts`) | 60+ Zod validation schemas |
| Repository | 1 (`communication.repository.ts`) | 1400+ line Supabase data access (80+ methods) |
| Services | 30 files | Domain-specific business logic |
| Hooks | 95 files | React hooks for UI state |
| API Routes | 100+ routes | RESTful endpoints organized by domain |
| Mobile Screens | 15 files | React Native communication screens |

**Total: ~250+ files**

### Directory Layout

```
web/src/features/communication/
├── types.ts                              # Type re-exports from @educi/types
├── validators/
│   └── schemas.ts                        # 60+ Zod validation schemas
├── repositories/
│   └── communication.repository.ts       # SupabaseCommunicationRepository (80+ methods)
├── services/
│   ├── index.ts                          # 30 service exports
│   ├── conversation.service.ts           # Conversation lifecycle management
│   ├── message.service.ts                # Message CRUD, edit, delete, pin, forward
│   ├── thread.service.ts                 # Thread management and replies
│   ├── group.service.ts                  # Group CRUD, members, permissions
│   ├── channel.service.ts                # Channel creation, management, moderation
│   ├── call.service.ts                   # Audio/video call management
│   ├── conference.service.ts             # Multi-party conference calls
│   ├── recording.service.ts              # Call recording management
│   ├── screen-share.service.ts           # Screen sharing sessions
│   ├── email.service.ts                  # Email sending and tracking
│   ├── email-template.service.ts         # Email template management
│   ├── email-campaign.service.ts         # Email campaign execution
│   ├── email-signature.service.ts        # Email signature management
│   ├── sms.service.ts                    # SMS sending and delivery
│   ├── sms-bulk.service.ts               # Bulk SMS operations
│   ├── sms-template.service.ts           # SMS template management
│   ├── push-notification.service.ts      # Push notification delivery
│   ├── push-subscription.service.ts      # Push subscription management
│   ├── announcement.service.ts           # Announcement CRUD and publishing
│   ├── calendar.service.ts               # Calendar event management
│   ├── task.service.ts                   # Task CRUD and assignment
│   ├── document.service.ts               # Document CRUD and versioning
│   ├── collaboration.service.ts          # Real-time collaboration sessions
│   ├── contact.service.ts                # Contact CRUD and sync
│   ├── poll.service.ts                   # Poll creation and voting
│   ├── webhook.service.ts                # Webhook CRUD and event triggers
│   ├── presence.service.ts               # Online status and typing indicators
│   ├── auto-response.service.ts          # Auto-response rules and triggers
│   ├── search.service.ts                 # Cross-module search
│   ├── export.service.ts                 # Data export functionality
│   ├── scheduled-message.service.ts      # Scheduled message management
│   ├── ai.service.ts                     # AI-powered features
│   ├── notification.service.ts           # Notification delivery and preferences
│   ├── attachment.service.ts             # File upload and management
│   ├── reaction.service.ts               # Message reactions
│   ├── moderation.service.ts             # Content moderation and reporting
│   ├── permission.service.ts             # RBAC permission checks
│   ├── statistics.service.ts             # Communication statistics
│   ├── cache.service.ts                  # Caching layer
│   └── sync.service.ts                   # Offline sync management
├── hooks/
│   ├── use-conversations.ts              # Conversation list and details
│   ├── use-messages.ts                   # Message CRUD operations
│   ├── use-threads.ts                    # Thread management
│   ├── use-groups.ts                     # Group operations
│   ├── use-channels.ts                   # Channel operations
│   ├── use-calls.ts                      # Call management
│   ├── use-conference.ts                 # Conference call state
│   ├── use-recording.ts                  # Recording management
│   ├── use-screen-share.ts               # Screen sharing state
│   ├── use-email.ts                      # Email operations
│   ├── use-email-templates.ts            # Email template management
│   ├── use-email-campaigns.ts            # Email campaign operations
│   ├── use-email-signatures.ts           # Email signature management
│   ├── use-sms.ts                        # SMS operations
│   ├── use-sms-bulk.ts                   # Bulk SMS operations
│   ├── use-sms-templates.ts              # SMS template management
│   ├── use-push-notifications.ts         # Push notification operations
│   ├── use-push-subscriptions.ts         # Push subscription management
│   ├── use-announcements.ts              # Announcement operations
│   ├── use-calendar.ts                   # Calendar event management
│   ├── use-calendar-events.ts            # Individual event operations
│   ├── use-tasks.ts                      # Task operations
│   ├── use-task-assignment.ts            # Task assignment management
│   ├── use-documents.ts                  # Document operations
│   ├── use-document-versions.ts          # Document version management
│   ├── use-collaboration.ts              # Collaboration session state
│   ├── use-presence.ts                   # Online status and presence
│   ├── use-typing-indicator.ts           # Typing indicator state
│   ├── use-contacts.ts                   # Contact operations
│   ├── use-contact-groups.ts             # Contact group management
│   ├── use-polls.ts                      # Poll operations
│   ├── use-webhooks.ts                   # Webhook operations
│   ├── use-auto-responses.ts             # Auto-response management
│   ├── use-search.ts                     # Cross-module search
│   ├── use-export.ts                     # Export functionality
│   ├── use-scheduled-messages.ts         # Scheduled message management
│   ├── use-ai-features.ts                # AI feature operations
│   ├── use-notifications.ts              # Notification list and management
│   ├── use-notification-preferences.ts   # Notification preference management
│   ├── use-notification-channels.ts      # Notification channel management
│   ├── use-notification-batching.ts      # Notification batching state
│   ├── use-reactions.ts                  # Message reactions
│   ├── use-moderation.ts                 # Content moderation
│   ├── use-attachments.ts                # File attachment operations
│   ├── use-permissions.ts                # Permission checks
│   ├── use-statistics.ts                 # Communication statistics
│   ├── use-cache.ts                      # Cache management
│   ├── use-offline.ts                    # Offline mode state
│   ├── use-sync.ts                       # Offline sync management
│   ├── use-realtime.ts                   # Real-time subscription state
│   ├── use-read-receipts.ts              # Read receipt tracking
│   ├── use-message-search.ts             # Message search functionality
│   ├── use-conversation-search.ts        # Conversation search
│   ├── use-global-search.ts              # Global search across modules
│   ├── use-filters.ts                    # Filter state management
│   ├── use-sort.ts                       # Sort configuration
│   ├── use-pagination.ts                 # Pagination state
│   ├── use-message-composer.ts           # Message composition state
│   ├── use-media-upload.ts               # Media upload handling
│   ├── use-draft-messages.ts             # Draft message management
│   ├── use-pinned-messages.ts            # Pinned message management
│   ├── use-message-reactions.ts          # Message reaction state
│   ├── use-conversation-members.ts       # Conversation member management
│   ├── use-group-permissions.ts          # Group permission management
│   ├── use-call-history.ts               # Call history tracking
│   ├── use-email-tracking.ts             # Email open/click tracking
│   ├── use-sms-delivery.ts              # SMS delivery status tracking
│   ├── use-push-delivery.ts             # Push delivery status tracking
│   ├── use-announcement-targeting.ts     # Announcement target audience
│   ├── use-calendar-subscriptions.ts     # Calendar subscription management
│   ├── use-task-comments.ts              # Task comment operations
│   ├── use-task-checklists.ts            # Task checklist operations
│   ├── use-document-comments.ts          # Document comment operations
│   ├── use-document-permissions.ts       # Document permission management
│   ├── use-collaboration-editing.ts      # Real-time editing state
│   ├── use-contact-sync.ts              # Contact synchronization
│   ├── use-poll-results.ts              # Poll result aggregation
│   ├── use-webhook-events.ts            # Webhook event monitoring
│   ├── use-auto-response-rules.ts        # Auto-response rule management
│   ├── use-search-filters.ts            # Search filter configuration
│   ├── use-export-options.ts            # Export option configuration
│   ├── use-scheduled-message-details.ts # Individual scheduled message
│   ├── use-ai-summary.ts               # AI summary generation
│   ├── use-ai-translation.ts           # AI translation operations
│   ├── use-ai-correction.ts            # AI text correction
│   ├── use-ai-spam-detection.ts        # AI spam detection
│   ├── use-notification-delivery.ts     # Notification delivery tracking
│   ├── use-communication-dashboard.ts   # Communication dashboard data
│   └── use-notification-analytics.ts    # Notification analytics
├── validators/
│   └── schemas.ts                        # 60+ Zod validation schemas
└── mobile/
    ├── index.ts                           # 15 mobile screen exports
    └── screens/
        ├── ConversationsScreen.tsx        # Conversation list
        ├── ConversationDetailScreen.tsx   # Conversation detail
        ├── MessagesScreen.tsx             # Message list
        ├── MessageDetailScreen.tsx        # Message detail
        ├── GroupsScreen.tsx              # Group list
        ├── GroupDetailScreen.tsx          # Group detail
        ├── CallsScreen.tsx               # Call history
        ├── CallScreen.tsx                # Active call
        ├── ConferenceScreen.tsx          # Conference call
        ├── EmailScreen.tsx               # Email management
        ├── CalendarScreen.tsx            # Calendar events
        ├── TasksScreen.tsx               # Task management
        ├── DocumentsScreen.tsx           # Document management
        ├── ContactsScreen.tsx            # Contact management
        └── SettingsScreen.tsx            # Communication settings
```

---

## Feature Modules

### Conversations & Messaging

#### Overview

The Conversations & Messaging feature provides real-time 1-to-1 and group messaging with rich content support, threading, reactions, read receipts, and message pinning.

#### Message Types

| Type | Description |
|------|-------------|
| `TEXT` | Plain text or markdown content |
| `IMAGE` | Image attachment with preview |
| `FILE` | Generic file attachment |
| `AUDIO` | Audio message with playback |
| `VIDEO` | Video message with preview |
| `SYSTEM` | System-generated message |
| `ANNOUNCEMENT` | Announcement reference |
| `BROADCAST` | Broadcast reference |

#### Conversation Types

| Type | Description |
|------|-------------|
| `PRIVATE` | 1-to-1 direct message |
| `GROUP` | Multi-person group chat |
| `CLASS` | Class-wide conversation |
| `LEVEL` | Grade/level-wide conversation |
| `COHORT` | Cohort-based conversation |
| `PARENTS` | Parent group conversation |
| `STAFF` | Staff conversation |
| `TEACHERS` | Teacher conversation |
| `ADMIN` | Admin-only conversation |
| `DIRECTION` | Direction/leadership conversation |
| `ACCOUNTING` | Accounting department conversation |

#### Message Operations

| Operation | Description |
|-----------|-------------|
| Send | Send new message with content, attachments, mentions |
| Edit | Edit message within configurable edit window |
| Delete | Soft delete (recoverable) or permanent delete |
| Pin | Pin/unpin message to conversation top |
| Forward | Forward message to other conversations |
| React | Add/remove emoji reactions |
| Reply | Reply to specific message (thread) |
| Search | Full-text search across messages |
| Read Receipts | Track who has read the message |

#### Rate Limits

| Limit | Value |
|-------|-------|
| Messages per minute | 30 |
| Messages per hour | 500 |
| Messages per day | 5000 |
| Search queries per minute | 10 |
| Broadcasts per day | 10 |

---

### Groups & Channels

#### Overview

Groups and Channels provide organized communication spaces with role-based membership, permissions, and moderation capabilities.

#### Group Roles

| Role | Permissions |
|------|-------------|
| `OWNER` | Full control, delete group, transfer ownership |
| `ADMIN` | Manage members, settings, moderate content |
| `MODERATOR` | Moderate content, mute members |
| `MEMBER` | Send messages, react, participate |

#### Channel Types

| Type | Description |
|------|-------------|
| `PUBLIC` | Open to all school members |
| `PRIVATE` | Invite-only channel |
| `RESTRICTED` | Role-restricted channel |
| `ARCHIVED` | Read-only archived channel |

#### Group Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new group with name, description, members |
| Update | Update group name, description, avatar |
| Delete | Delete group and all messages |
| Add Member | Add member with role |
| Remove Member | Remove member from group |
| Change Role | Change member role |
| Mute | Mute group notifications |
| Archive | Archive group |
| Restore | Restore archived group |

---

### Calls

#### Overview

The Calls feature provides audio and video calling capabilities with conference support, recording, and screen sharing.

#### Call Types

| Type | Description |
|------|-------------|
| `AUDIO` | Voice-only call |
| `VIDEO` | Video call with camera |
| `CONFERENCE` | Multi-party conference call |
| `SCREEN_SHARE` | Screen sharing session |

#### Call States

| State | Description |
|-------|-------------|
| `RINGING` | Call initiated, waiting for answer |
| `CONNECTED` | Call established and active |
| `ON_HOLD` | Call on hold |
| `RECONNECTING` | Connection lost, attempting reconnect |
| `ENDED` | Call ended |
| `MISSED` | Call not answered |
| `REJECTED` | Call rejected by recipient |

#### Call Operations

| Operation | Description |
|-----------|-------------|
| Initiate | Start new call with participants |
| Answer | Accept incoming call |
| Reject | Reject incoming call |
| End | End active call |
| Hold | Put call on hold |
| Resume | Resume held call |
| Mute | Mute audio |
| Unmute | Unmute audio |
| Camera On/Off | Toggle video |
| Screen Share | Start/stop screen sharing |
| Record | Start/stop recording |
| Add Participant | Add participant to call |
| Remove Participant | Remove participant from call |
| Transfer | Transfer call to another participant |

---

### Email

#### Overview

The Email feature provides email sending, template management, campaign execution, open/click tracking, and signature management.

#### Email Operations

| Operation | Description |
|-----------|-------------|
| Send | Send single email with attachments |
| Send Bulk | Send email to multiple recipients |
| Schedule | Schedule email for future delivery |
| Template Create | Create reusable email template |
| Template Update | Update email template |
| Template Delete | Delete email template |
| Campaign Create | Create email campaign |
| Campaign Send | Execute email campaign |
| Campaign Schedule | Schedule campaign delivery |
| Track Opens | Track email open events |
| Track Clicks | Track link click events |
| Signature Create | Create email signature |
| Signature Set Default | Set default signature |

#### Email Configuration

| Setting | Description |
|---------|-------------|
| Provider | SMTP, SendGrid, Mailgun, SES |
| Max Recipients | 500 per email |
| Max Attachment Size | 25MB total |
| Tracking | Open tracking, click tracking |
| Retry | 3 attempts with exponential backoff |

---

### SMS

#### Overview

The SMS feature provides SMS sending, bulk operations, template management, and multi-provider integration.

#### SMS Operations

| Operation | Description |
|-----------|-------------|
| Send | Send single SMS |
| Send Bulk | Send SMS to multiple recipients |
| Schedule | Schedule SMS for future delivery |
| Template Create | Create SMS template |
| Template Update | Update SMS template |
| Template Delete | Delete SMS template |
| Check Delivery | Check delivery status |
| Get History | Get SMS sending history |

#### SMS Configuration

| Setting | Description |
|---------|-------------|
| Provider | Twilio, Vonage, MessageBird |
| Max Length | 160 characters (single), 1600 (multipart) |
| Max Recipients | 1000 per bulk send |
| Rate Limit | 50 SMS per minute |
| Delivery Webhook | Status callback URL |

---

### Push Notifications

#### Overview

The Push Notifications feature provides push notification delivery, subscription management, device management, and template support.

#### Push Operations

| Operation | Description |
|-----------|-------------|
| Send | Send push notification to user |
| Send Bulk | Send push to multiple users |
| Subscribe | Subscribe user to push notifications |
| Unsubscribe | Unsubscribe user from push |
| Get Subscriptions | Get user's push subscriptions |
| Register Device | Register device token |
| Remove Device | Remove device token |
| Template Create | Create push template |
| Template Update | Update push template |
| Template Delete | Delete push template |

#### Push Configuration

| Setting | Description |
|---------|-------------|
| Provider | Firebase Cloud Messaging, APNs |
| Max Payload | 4KB |
| TTL | 24 hours default |
| Priority | normal, high |
| Badge | Auto-increment badge count |

---

### Announcements

#### Overview

The Announcements feature provides scheduled, prioritized announcements with scoped targeting and acknowledgment tracking.

#### Announcement Scopes

| Scope | Description |
|-------|-------------|
| `SINGLE` | Single user |
| `CLASS` | All class members |
| `LEVEL` | All grade level members |
| `ALL_PARENTS` | All parents |
| `ALL_TEACHERS` | All teachers |
| `ALL_STUDENTS` | All students |
| `ALL_STAFF` | All staff |
| `WHOLE_SCHOOL` | All school members |
| `MULTI_SCHOOL` | Multiple schools |

#### Announcement Operations

| Operation | Description |
|-----------|-------------|
| Create | Create announcement with content and targeting |
| Publish | Publish announcement immediately |
| Schedule | Schedule for future publication |
| Expire | Set expiration date |
| Acknowledge | User acknowledges announcement |
| Get Acknowledgments | Get acknowledgment status |
| Pin | Pin announcement to top |
| Archive | Archive announcement |

---

### Calendar

#### Overview

The Calendar feature provides event management, attendee RSVP, reminders, and calendar subscriptions.

#### Event Types

| Type | Description |
|------|-------------|
| `MEETING` | Staff or parent meeting |
| `EXAM` | Examination event |
| `HOLIDAY` | School holiday |
| `EVENT` | School event |
| `DEADLINE` | Assignment or task deadline |
| `CUSTOM` | Custom event type |

#### Calendar Operations

| Operation | Description |
|-----------|-------------|
| Create Event | Create calendar event with details |
| Update Event | Update event information |
| Delete Event | Delete calendar event |
| Add Attendee | Add attendee to event |
| Remove Attendee | Remove attendee from event |
| RSVP | Respond to event invitation |
| Set Reminder | Set event reminder |
| Subscribe | Subscribe to calendar feed |
| Unsubscribe | Unsubscribe from calendar feed |
| Get Calendar | Get calendar events by date range |
| Get Calendar Feed | Get iCal feed URL |
| Get Availability | Check attendee availability |

---

### Tasks

#### Overview

The Tasks feature provides task creation, assignment, comments, checklists, and progress tracking.

#### Task Priority

| Priority | Description |
|----------|-------------|
| `LOW` | Low priority task |
| `MEDIUM` | Medium priority task |
| `HIGH` | High priority task |
| `URGENT` | Urgent priority task |

#### Task Operations

| Operation | Description |
|-----------|-------------|
| Create | Create task with title, description, due date |
| Update | Update task details |
| Delete | Delete task |
| Assign | Assign task to user |
| Unassign | Unassign task from user |
| Complete | Mark task as complete |
| Reopen | Reopen completed task |
| Add Comment | Add comment to task |
| Delete Comment | Delete task comment |
| Add Checklist Item | Add checklist item |
| Toggle Checklist Item | Toggle checklist item completion |
| Set Priority | Set task priority |
| Set Due Date | Set task due date |
| Get My Tasks | Get tasks assigned to current user |
| Get Overdue | Get overdue tasks |

---

### Documents

#### Overview

The Documents feature provides document CRUD, version control, permission management, and commenting.

#### Document Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new document |
| Update | Update document content |
| Delete | Delete document |
| Upload | Upload document file |
| Download | Download document file |
| Get Versions | Get document version history |
| Revert | Revert to previous version |
| Share | Share document with user |
| Revoke Access | Revoke document access |
| Get Permissions | Get document permissions |
| Add Comment | Add comment to document |
| Delete Comment | Delete document comment |
| Search | Search documents |
| Get Recent | Get recently accessed documents |

---

### Collaboration

#### Overview

The Collaboration feature provides real-time collaboration sessions, presence awareness, and concurrent editing capabilities.

#### Collaboration Operations

| Operation | Description |
|-----------|-------------|
| Start Session | Start collaboration session |
| Join Session | Join existing session |
| Leave Session | Leave collaboration session |
| End Session | End collaboration session |
| Get Participants | Get session participants |
| Send Presence | Send presence update |
| Get Presence | Get participant presence |
| Start Editing | Start real-time editing |
| Stop Editing | Stop real-time editing |
| Get Edit History | Get edit operation history |
| Lock Section | Lock document section |
| Unlock Section | Unlock document section |

---

### AI Features

#### Overview

The AI Features provide intelligent communication assistance including summaries, translation, text correction, and spam detection.

#### AI Operations

| Operation | Description |
|-----------|-------------|
| Summarize | Generate message/conversation summary |
| Translate | Translate message to target language |
| Correct | Grammar and spelling correction |
| Detect Spam | Detect spam or phishing content |
| Suggest Reply | Suggest reply based on context |
| Extract Action Items | Extract action items from messages |
| Sentiment Analysis | Analyze message sentiment |
| Auto-Tag | Auto-tag messages by topic |

#### AI Configuration

| Setting | Description |
|---------|-------------|
| Provider | OpenAI, Anthropic, custom |
| Max Tokens | 2000 per request |
| Cache TTL | 1 hour for repeated requests |
| Fallback | Graceful degradation on AI failure |

---

### Notifications

#### Overview

The Notifications feature provides multi-channel notification delivery, preference management, batching, and quiet hours.

#### Notification Channels

| Channel | Description |
|---------|-------------|
| `IN_APP` | In-app notification center |
| `PUSH` | Mobile push notification |
| `EMAIL` | Email notification |
| `SMS` | SMS notification |
| `WHATSAPP` | WhatsApp notification |

#### Notification Types

| Type | Description |
|------|-------------|
| `MESSAGE` | New message received |
| `MENTION` | User mentioned in message |
| `CALL` | Incoming call |
| `TASK_ASSIGNED` | Task assigned |
| `TASK_COMPLETED` | Task completed |
| `ANNOUNCEMENT` | New announcement |
| `DOCUMENT_SHARED` | Document shared |

#### Notification Operations

| Operation | Description |
|-----------|-------------|
| Get Notifications | Get user notifications |
| Mark Read | Mark notification as read |
| Mark All Read | Mark all notifications as read |
| Delete | Delete notification |
| Get Preferences | Get notification preferences |
| Update Preferences | Update notification preferences |
| Get Settings | Get notification settings |
| Update Settings | Update notification settings |
| Get Batches | Get batched notifications |
| Clear Batch | Clear notification batch |

---

### Contacts

#### Overview

The Contacts feature provides contact management, contact groups, and synchronization with external sources.

#### Contact Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new contact |
| Update | Update contact information |
| Delete | Delete contact |
| Get | Get contact by ID |
| List | List all contacts |
| Search | Search contacts |
| Add to Group | Add contact to group |
| Remove from Group | Remove contact from group |
| Create Group | Create contact group |
| Update Group | Update contact group |
| Delete Group | Delete contact group |
| Sync | Sync contacts from external source |
| Import | Import contacts from file |
| Export | Export contacts to file |

---

### Polls

#### Overview

The Polls feature provides poll creation, voting, and result aggregation.

#### Poll Operations

| Operation | Description |
|-----------|-------------|
| Create | Create poll with question and options |
| Vote | Cast vote on poll option |
| Close | Close poll for voting |
| Reopen | Reopen closed poll |
| Get Results | Get poll results with vote counts |
| Delete | Delete poll |
| Get My Vote | Get current user's vote |

---

### Webhooks

#### Overview

The Webhooks feature provides webhook CRUD and event-triggered HTTP callbacks.

#### Webhook Events

| Event | Description |
|-------|-------------|
| `message.created` | New message sent |
| `message.updated` | Message edited |
| `message.deleted` | Message deleted |
| `conversation.created` | New conversation created |
| `group.member_added` | Member added to group |
| `group.member_removed` | Member removed from group |
| `announcement.published` | Announcement published |
| `call.started` | Call initiated |
| `call.ended` | Call ended |
| `task.created` | New task created |
| `task.completed` | Task completed |

#### Webhook Operations

| Operation | Description |
|-----------|-------------|
| Create | Create webhook with URL and events |
| Update | Update webhook configuration |
| Delete | Delete webhook |
| Test | Send test event to webhook |
| Get Logs | Get webhook delivery logs |
| Toggle | Enable/disable webhook |
| Rotate Secret | Rotate webhook secret |

---

### Channels

#### Overview

The Channels feature provides organized communication channels with moderation and subscription management.

#### Channel Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new channel |
| Update | Update channel details |
| Delete | Delete channel |
| Archive | Archive channel |
| Restore | Restore archived channel |
| Subscribe | Subscribe to channel |
| Unsubscribe | Unsubscribe from channel |
| Get Subscribers | Get channel subscribers |
| Pin Message | Pin message to channel |
| Unpin Message | Unpin message from channel |
| Get Pinned | Get pinned messages |

---

### Presence

#### Overview

The Presence feature provides online status tracking, typing indicators, and availability management.

#### Presence Status

| Status | Description |
|--------|-------------|
| `ONLINE` | User is online and available |
| `AWAY` | User is away |
| `BUSY` | User is busy/do not disturb |
| `OFFLINE` | User is offline |

#### Presence Operations

| Operation | Description |
|-----------|-------------|
| Set Status | Set user presence status |
| Get Status | Get user presence status |
| Get Bulk | Get multiple users' presence |
| Start Typing | Start typing indicator |
| Stop Typing | Stop typing indicator |
| Get Typing Users | Get users currently typing |

---

### Auto-Responses

#### Overview

The Auto-Responses feature provides trigger-based automated replies and rules management.

#### Auto-Response Triggers

| Trigger | Description |
|---------|-------------|
| `KEYWORD` | Message contains specific keyword |
| `OUTSIDE_HOURS` | Message outside business hours |
| `ABSENCE` | User is on absence |
| `FIRST_MESSAGE` | First message from new contact |
| `SPECIFIC_SENDER` | Message from specific sender |

#### Auto-Response Operations

| Operation | Description |
|-----------|-------------|
| Create Rule | Create auto-response rule |
| Update Rule | Update auto-response rule |
| Delete Rule | Delete auto-response rule |
| Toggle Rule | Enable/disable rule |
| Get Rules | Get all auto-response rules |
| Get Triggers | Get available trigger types |
| Test Rule | Test auto-response rule |

---

### Search

#### Overview

The Search feature provides cross-module full-text search with advanced filtering capabilities.

#### Search Operations

| Operation | Description |
|-----------|-------------|
| Global Search | Search across all modules |
| Message Search | Search messages with filters |
| Conversation Search | Search conversations |
| Contact Search | Search contacts |
| Document Search | Search documents |
| Advanced Search | Search with complex filters |

---

### Export

#### Overview

The Export feature provides conversation and document export in multiple formats.

#### Export Formats

| Format | Description |
|--------|-------------|
| `PDF` | PDF document |
| `CSV` | CSV spreadsheet |
| `JSON` | JSON data |
| `HTML` | HTML document |
| `TXT` | Plain text |

#### Export Operations

| Operation | Description |
|-----------|-------------|
| Export Conversation | Export conversation messages |
| Export Thread | Export thread messages |
| Export Document | Export document content |
| Export Contacts | Export contact list |
| Export Calendar | Export calendar events |
| Get Export Status | Check export job status |
| Download Export | Download exported file |

---

### Scheduled Messages

#### Overview

The Scheduled Messages feature provides message scheduling for future delivery and cancellation.

#### Scheduled Message Operations

| Operation | Description |
|-----------|-------------|
| Schedule | Schedule message for future delivery |
| Cancel | Cancel scheduled message |
| Update | Update scheduled message content |
| Get Scheduled | Get list of scheduled messages |
| Get Details | Get scheduled message details |
| Get History | Get sent scheduled message history |

---

## API Reference

All routes are under `/api/communication/` and organized by domain.

### Conversation Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/conversations` | GET/POST | List/create conversations |
| `/api/communication/conversations/[id]` | GET/PUT/DELETE | Conversation CRUD |
| `/api/communication/conversations/[id]/messages` | GET/POST | List/send messages |
| `/api/communication/conversations/[id]/members` | GET/POST/DELETE | Manage members |
| `/api/communication/conversations/[id]/archive` | POST | Archive conversation |
| `/api/communication/conversations/[id]/restore` | POST | Restore conversation |
| `/api/communication/conversations/[id]/pin` | POST | Pin conversation |
| `/api/communication/conversations/[id]/mute` | POST | Mute conversation |

### Message Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/messages` | GET/POST | List/create messages |
| `/api/communication/messages/[id]` | GET/PUT/DELETE | Message CRUD |
| `/api/communication/messages/[id]/read` | POST | Mark message read |
| `/api/communication/messages/[id]/reactions` | GET/POST/DELETE | Manage reactions |
| `/api/communication/messages/[id]/pin` | POST | Pin message |
| `/api/communication/messages/[id]/forward` | POST | Forward message |
| `/api/communication/messages/[id]/report` | POST | Report message |
| `/api/communication/messages/search` | GET | Search messages |
| `/api/communication/messages/read` | POST | Bulk mark read |

### Thread Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/threads` | GET | List threads |
| `/api/communication/threads/[id]` | GET | Get thread |
| `/api/communication/threads/[id]/messages` | GET/POST | Thread messages |

### Group Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/groups` | GET/POST | List/create groups |
| `/api/communication/groups/[id]` | GET/PUT/DELETE | Group CRUD |
| `/api/communication/groups/[id]/members` | GET/POST/DELETE | Manage members |
| `/api/communication/groups/[id]/members/[memberId]` | PUT | Update member role |
| `/api/communication/groups/[id]/settings` | GET/PUT | Group settings |
| `/api/communication/groups/[id]/archive` | POST | Archive group |
| `/api/communication/groups/[id]/restore` | POST | Restore group |

### Channel Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/channels` | GET/POST | List/create channels |
| `/api/communication/channels/[id]` | GET/PUT/DELETE | Channel CRUD |
| `/api/communication/channels/[id]/subscribe` | POST | Subscribe to channel |
| `/api/communication/channels/[id]/unsubscribe` | POST | Unsubscribe from channel |
| `/api/communication/channels/[id]/subscribers` | GET | Get subscribers |
| `/api/communication/channels/[id]/pin` | POST | Pin message |
| `/api/communication/channels/[id]/archive` | POST | Archive channel |

### Call Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/calls` | GET/POST | List/initiate calls |
| `/api/communication/calls/[id]` | GET | Get call details |
| `/api/communication/calls/[id]/answer` | POST | Answer call |
| `/api/communication/calls/[id]/reject` | POST | Reject call |
| `/api/communication/calls/[id]/end` | POST | End call |
| `/api/communication/calls/[id]/hold` | POST | Hold call |
| `/api/communication/calls/[id]/mute` | POST | Mute call |
| `/api/communication/calls/[id]/participants` | POST/DELETE | Manage participants |
| `/api/communication/calls/[id]/record` | POST | Toggle recording |
| `/api/communication/calls/[id]/screen-share` | POST | Toggle screen share |
| `/api/communication/calls/history` | GET | Call history |

### Conference Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/conferences` | GET/POST | List/create conferences |
| `/api/communication/conferences/[id]` | GET | Get conference details |
| `/api/communication/conferences/[id]/join` | POST | Join conference |
| `/api/communication/conferences/[id]/leave` | POST | Leave conference |
| `/api/communication/conferences/[id]/participants` | GET/POST/DELETE | Manage participants |
| `/api/communication/conferences/[id]/record` | POST | Toggle recording |

### Email Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/email` | GET/POST | List/send emails |
| `/api/communication/email/[id]` | GET | Get email details |
| `/api/communication/email/templates` | GET/POST | List/create templates |
| `/api/communication/email/templates/[id]` | GET/PUT/DELETE | Template CRUD |
| `/api/communication/email/campaigns` | GET/POST | List/create campaigns |
| `/api/communication/email/campaigns/[id]` | GET/PUT/DELETE | Campaign CRUD |
| `/api/communication/email/campaigns/[id]/send` | POST | Send campaign |
| `/api/communication/email/campaigns/[id]/schedule` | POST | Schedule campaign |
| `/api/communication/email/signatures` | GET/POST | List/create signatures |
| `/api/communication/email/signatures/[id]` | GET/PUT/DELETE | Signature CRUD |
| `/api/communication/email/signatures/[id]/default` | POST | Set default |
| `/api/communication/email/tracking` | GET | Get tracking data |

### SMS Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/sms` | GET/POST | List/send SMS |
| `/api/communication/sms/[id]` | GET | Get SMS details |
| `/api/communication/sms/bulk` | POST | Send bulk SMS |
| `/api/communication/sms/templates` | GET/POST | List/create templates |
| `/api/communication/sms/templates/[id]` | GET/PUT/DELETE | Template CRUD |
| `/api/communication/sms/delivery` | GET | Check delivery status |

### Push Notification Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/push` | POST | Send push notification |
| `/api/communication/push/bulk` | POST | Send bulk push |
| `/api/communication/push/subscriptions` | GET/POST | List/create subscriptions |
| `/api/communication/push/subscriptions/[id]` | GET/DELETE | Subscription CRUD |
| `/api/communication/push/templates` | GET/POST | List/create templates |
| `/api/communication/push/templates/[id]` | GET/PUT/DELETE | Template CRUD |
| `/api/communication/push/devices` | GET/POST | List/register devices |
| `/api/communication/push/devices/[id]` | DELETE | Remove device |

### Announcement Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/announcements` | GET/POST | List/create announcements |
| `/api/communication/announcements/[id]` | GET/PUT/DELETE | Announcement CRUD |
| `/api/communication/announcements/[id]/publish` | POST | Publish announcement |
| `/api/communication/announcements/[id]/schedule` | POST | Schedule announcement |
| `/api/communication/announcements/[id]/acknowledge` | POST | Acknowledge announcement |
| `/api/communication/announcements/[id]/acknowledgments` | GET | Get acknowledgments |
| `/api/communication/announcements/[id]/pin` | POST | Pin announcement |
| `/api/communication/announcements/[id]/archive` | POST | Archive announcement |

### Calendar Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/calendar` | GET/POST | List/create events |
| `/api/communication/calendar/[id]` | GET/PUT/DELETE | Event CRUD |
| `/api/communication/calendar/[id]/attendees` | GET/POST/DELETE | Manage attendees |
| `/api/communication/calendar/[id]/rsvp` | POST | RSVP to event |
| `/api/communication/calendar/[id]/reminders` | GET/POST/DELETE | Manage reminders |
| `/api/communication/calendar/subscribe` | GET | Get calendar feed |
| `/api/communication/calendar/availability` | GET | Check availability |

### Task Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/tasks` | GET/POST | List/create tasks |
| `/api/communication/tasks/[id]` | GET/PUT/DELETE | Task CRUD |
| `/api/communication/tasks/[id]/assign` | POST | Assign task |
| `/api/communication/tasks/[id]/unassign` | POST | Unassign task |
| `/api/communication/tasks/[id]/complete` | POST | Complete task |
| `/api/communication/tasks/[id]/reopen` | POST | Reopen task |
| `/api/communication/tasks/[id]/comments` | GET/POST/DELETE | Manage comments |
| `/api/communication/tasks/[id]/checklist` | GET/POST/DELETE | Manage checklist |
| `/api/communication/tasks/[id]/checklist/[itemId]` | PUT | Toggle checklist item |
| `/api/communication/tasks/my` | GET | Get my tasks |
| `/api/communication/tasks/overdue` | GET | Get overdue tasks |

### Document Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/documents` | GET/POST | List/create documents |
| `/api/communication/documents/[id]` | GET/PUT/DELETE | Document CRUD |
| `/api/communication/documents/[id]/versions` | GET | Get version history |
| `/api/communication/documents/[id]/versions/[versionId]` | GET | Get specific version |
| `/api/communication/documents/[id]/revert` | POST | Revert to version |
| `/api/communication/documents/[id]/permissions` | GET/POST/DELETE | Manage permissions |
| `/api/communication/documents/[id]/comments` | GET/POST/DELETE | Manage comments |
| `/api/communication/documents/[id]/upload` | POST | Upload file |
| `/api/communication/documents/[id]/download` | GET | Download file |
| `/api/communication/documents/search` | GET | Search documents |
| `/api/communication/documents/recent` | GET | Get recent documents |

### Collaboration Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/collaboration/sessions` | GET/POST | List/create sessions |
| `/api/communication/collaboration/sessions/[id]` | GET/DELETE | Session CRUD |
| `/api/communication/collaboration/sessions/[id]/join` | POST | Join session |
| `/api/communication/collaboration/sessions/[id]/leave` | POST | Leave session |
| `/api/communication/collaboration/sessions/[id]/participants` | GET | Get participants |
| `/api/communication/collaboration/sessions/[id]/presence` | POST/GET | Manage presence |
| `/api/communication/collaboration/sessions/[id]/editing` | POST | Toggle editing |
| `/api/communication/collaboration/sessions/[id]/lock` | POST | Lock section |
| `/api/communication/collaboration/sessions/[id]/unlock` | POST | Unlock section |

### AI Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/ai/summarize` | POST | Generate summary |
| `/api/communication/ai/translate` | POST | Translate text |
| `/api/communication/ai/correct` | POST | Correct text |
| `/api/communication/ai/spam-detect` | POST | Detect spam |
| `/api/communication/ai/suggest-reply` | POST | Suggest reply |
| `/api/communication/ai/action-items` | POST | Extract action items |
| `/api/communication/ai/sentiment` | POST | Analyze sentiment |
| `/api/communication/ai/auto-tag` | POST | Auto-tag messages |

### Notification Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/notifications` | GET | List notifications |
| `/api/communication/notifications/[id]` | GET/DELETE | Notification CRUD |
| `/api/communication/notifications/[id]/read` | POST | Mark notification read |
| `/api/communication/notifications/read-all` | POST | Mark all read |
| `/api/communication/notifications/preferences` | GET/PUT | Manage preferences |
| `/api/communication/notifications/settings` | GET/PUT | Manage settings |
| `/api/communication/notifications/batches` | GET | Get notification batches |
| `/api/communication/notifications/batches/[id]` | DELETE | Clear batch |

### Contact Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/contacts` | GET/POST | List/create contacts |
| `/api/communication/contacts/[id]` | GET/PUT/DELETE | Contact CRUD |
| `/api/communication/contacts/search` | GET | Search contacts |
| `/api/communication/contacts/groups` | GET/POST | List/create groups |
| `/api/communication/contacts/groups/[id]` | GET/PUT/DELETE | Group CRUD |
| `/api/communication/contacts/groups/[id]/members` | GET/POST/DELETE | Manage group members |
| `/api/communication/contacts/sync` | POST | Sync contacts |
| `/api/communication/contacts/import` | POST | Import contacts |
| `/api/communication/contacts/export` | POST | Export contacts |

### Poll Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/polls` | GET/POST | List/create polls |
| `/api/communication/polls/[id]` | GET | Get poll details |
| `/api/communication/polls/[id]/vote` | POST | Cast vote |
| `/api/communication/polls/[id]/close` | POST | Close poll |
| `/api/communication/polls/[id]/reopen` | POST | Reopen poll |
| `/api/communication/polls/[id]/results` | GET | Get results |
| `/api/communication/polls/[id]/delete` | DELETE | Delete poll |

### Webhook Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/webhooks` | GET/POST | List/create webhooks |
| `/api/communication/webhooks/[id]` | GET/PUT/DELETE | Webhook CRUD |
| `/api/communication/webhooks/[id]/test` | POST | Test webhook |
| `/api/communication/webhooks/[id]/logs` | GET | Get delivery logs |
| `/api/communication/webhooks/[id]/toggle` | POST | Enable/disable |
| `/api/communication/webhooks/[id]/rotate-secret` | POST | Rotate secret |

### Presence Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/presence` | POST/GET | Set/get presence |
| `/api/communication/presence/bulk` | GET | Get bulk presence |
| `/api/communication/presence/typing` | POST | Start/stop typing |
| `/api/communication/presence/typing/[conversationId]` | GET | Get typing users |

### Auto-Response Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/auto-responses` | GET/POST | List/create rules |
| `/api/communication/auto-responses/[id]` | GET/PUT/DELETE | Rule CRUD |
| `/api/communication/auto-responses/[id]/toggle` | POST | Enable/disable rule |
| `/api/communication/auto-responses/triggers` | GET | Get trigger types |
| `/api/communication/auto-responses/test` | POST | Test rule |

### Search Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/search` | GET | Global search |
| `/api/communication/search/messages` | GET | Search messages |
| `/api/communication/search/conversations` | GET | Search conversations |
| `/api/communication/search/contacts` | GET | Search contacts |
| `/api/communication/search/documents` | GET | Search documents |
| `/api/communication/search/advanced` | GET | Advanced search |

### Export Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/export` | POST | Export data |
| `/api/communication/export/conversation` | POST | Export conversation |
| `/api/communication/export/thread` | POST | Export thread |
| `/api/communication/export/document` | POST | Export document |
| `/api/communication/export/contacts` | POST | Export contacts |
| `/api/communication/export/calendar` | POST | Export calendar |
| `/api/communication/export/[jobId]` | GET | Get export status |
| `/api/communication/export/[jobId]/download` | GET | Download export |

### Scheduled Message Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/scheduled` | GET/POST | List/schedule messages |
| `/api/communication/scheduled/[id]` | GET/PUT/DELETE | Scheduled message CRUD |
| `/api/communication/scheduled/[id]/cancel` | POST | Cancel scheduled message |
| `/api/communication/scheduled/history` | GET | Get sent history |

### Utility Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/communication/statistics` | GET | Communication statistics |
| `/api/communication/dashboard` | GET | Communication dashboard |
| `/api/communication/attachments` | GET | List attachments |
| `/api/communication/upload` | POST | Upload file |
| `/api/communication/download` | POST | Download file |
| `/api/communication/sync` | POST | Sync offline messages |
| `/api/communication/realtime` | POST | Real-time subscription |

---

## Configuration Options

### Communication Constants (from `@educi/config`)

```typescript
communication: {
  MESSAGE_LIMITS: {
    maxLength: 5000,
    paginationLimit: 50,
    maxMembers: 500,
    maxParticipants: 25,
    editWindowMinutes: 15,
    deleteWindowMinutes: 60,
    maxReactions: 10,
    maxMentions: 20,
  },
  ATTACHMENTS: {
    maxFileSize: 26214400, // 25MB
    maxFilesPerMessage: 10,
    allowedTypes: {
      images: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
      videos: ['mp4', 'mov', 'avi', 'webm'],
      audio: ['mp3', 'wav', 'ogg', 'm4a'],
      archives: ['zip', 'rar', '7z'],
    },
    storageBucket: 'communications',
  },
  NOTIFICATIONS: {
    channels: ['IN_APP', 'PUSH', 'EMAIL', 'SMS', 'WHATSAPP'],
    types: ['MESSAGE', 'MENTION', 'CALL', 'TASK_ASSIGNED', 'TASK_COMPLETED', 'ANNOUNCEMENT', 'DOCUMENT_SHARED'],
    batchSize: 50,
    retryAttempts: 3,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    retentionDays: 90,
  },
  REALTIME: {
    enabled: true,
    reconnectAttempts: 5,
    reconnectDelay: 1000,
    heartbeatInterval: 30000,
    typingTimeout: 5000,
    presenceInterval: 30000,
  },
  BROADCAST: {
    maxRecipients: 10000,
    batchSize: 100,
    scopes: ['SINGLE', 'CLASS', 'LEVEL', 'ALL_PARENTS', 'ALL_TEACHERS', 'ALL_STUDENTS', 'ALL_STAFF', 'WHOLE_SCHOOL', 'MULTI_SCHOOL'],
    priorities: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
  },
  COMMUNICATION_PERMISSIONS: {
    messaging: ['admin', 'teacher', 'staff', 'parent', 'student'],
    broadcasting: ['admin', 'direction'],
    announcements: ['admin', 'direction', 'teacher'],
    calls: ['admin', 'teacher', 'staff', 'parent'],
    email: ['admin', 'teacher', 'staff'],
    sms: ['admin', 'direction'],
    push: ['admin', 'teacher', 'staff'],
    documents: ['admin', 'teacher', 'staff'],
    tasks: ['admin', 'teacher', 'staff'],
    calendar: ['admin', 'teacher', 'staff', 'parent'],
  },
  MESSAGE_RETENTION: {
    defaultDays: 365,
    minDays: 30,
    maxDays: 3650,
    autoDelete: false,
    archiveAfterDays: 180,
  },
  RATE_LIMITS: {
    messagesPerMinute: 30,
    messagesPerHour: 500,
    messagesPerDay: 5000,
    searchPerMinute: 10,
    broadcastsPerDay: 10,
    emailsPerHour: 100,
    smsPerMinute: 50,
    pushPerMinute: 100,
  },
  FILE_TYPES: {
    images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'],
    videos: ['mp4', 'mov', 'avi', 'webm'],
    audio: ['mp3', 'wav', 'ogg', 'm4a', 'flac'],
  },
  MESSAGE_SEARCH: {
    minQueryLength: 2,
    maxQueryLength: 200,
    maxResults: 100,
    debounceDelay: 300,
    highlightMatches: true,
  },
  MESSAGE_REALTIME: {
    typingEnabled: true,
    presenceEnabled: true,
    readReceiptsEnabled: true,
    editWindowMs: 900000, // 15 minutes
    deleteWindowMs: 3600000, // 1 hour
  },
  MESSAGE_MODERATION: {
    reportReasons: ['SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'MISINFORMATION', 'OTHER'],
    actions: ['WARNING', 'MUTED', 'BLOCKED', 'REMOVED', 'BANNED'],
    autoModeration: false,
    appealEnabled: true,
  },
  EMAIL: {
    provider: 'sendgrid',
    maxRecipients: 500,
    maxAttachmentSize: 26214400, // 25MB
    trackingEnabled: true,
    retryAttempts: 3,
    retryDelay: 5000,
  },
  SMS: {
    provider: 'twilio',
    maxLength: 160,
    maxMultipartLength: 1600,
    maxRecipients: 1000,
    rateLimitPerMinute: 50,
    deliveryWebhook: '/api/communication/sms/delivery',
  },
  PUSH: {
    provider: 'firebase',
    maxPayload: 4096,
    ttl: 86400, // 24 hours
    priority: ['normal', 'high'],
    badgeAutoIncrement: true,
  },
  CALENDAR: {
    maxEvents: 1000,
    maxAttendees: 100,
    maxReminders: 5,
    defaultReminderMinutes: 15,
    subscriptionFormats: ['ical', 'json'],
  },
  TASKS: {
    maxChecklistItems: 50,
    maxComments: 500,
    priorities: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    statuses: ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELLED'],
  },
  DOCUMENTS: {
    maxFileSize: 104857600, // 100MB
    maxVersions: 100,
    maxComments: 1000,
    permissions: ['VIEW', 'COMMENT', 'EDIT', 'ADMIN'],
  },
  WEBHOOKS: {
    maxWebhooks: 50,
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
    secretLength: 32,
  },
}
```

---

## Security & Permissions

### RBAC Permissions

| Permission | Description | Roles |
|------------|-------------|-------|
| `communication:messaging` | Send and receive messages | admin, teacher, staff, parent, student |
| `communication:calls` | Make and receive calls | admin, teacher, staff, parent |
| `communication:email` | Send emails | admin, teacher, staff |
| `communication:sms` | Send SMS | admin, direction |
| `communication:push` | Send push notifications | admin, teacher, staff |
| `communication:broadcasts` | Create broadcasts | admin, direction |
| `communication:announcements` | Create announcements | admin, direction, teacher |
| `communication:groups` | Create and manage groups | admin, teacher, staff |
| `communication:channels` | Create and manage channels | admin, teacher, staff |
| `communication:documents` | Create and manage documents | admin, teacher, staff |
| `communication:tasks` | Create and manage tasks | admin, teacher, staff |
| `communication:calendar` | Manage calendar events | admin, teacher, staff, parent |
| `communication:contacts` | Manage contacts | admin, teacher, staff |
| `communication:polls` | Create polls | admin, teacher, staff |
| `communication:webhooks` | Manage webhooks | admin |
| `communication:moderation` | Moderate content | admin, direction |
| `communication:admin` | Full communication admin | admin |
| `communication:export` | Export communication data | admin, teacher, staff |
| `communication:ai` | Use AI features | admin, teacher, staff |
| `communication:analytics` | View communication analytics | admin, direction |

### Permission Checks

- All API routes verify user permissions before execution
- Group/channel permissions are checked at the service layer
- Document permissions support VIEW, COMMENT, EDIT, ADMIN levels
- Broadcast and announcement permissions are restricted to admin roles
- Call permissions are checked for both initiator and recipient
- Email and SMS sending permissions are role-restricted

### Tenant Isolation

- All queries are scoped by `schoolId` parameter
- Supabase Row Level Security (RLS) policies enforce tenant isolation
- Cross-tenant access is prevented at the repository level
- Multi-school broadcasts are scoped to authorized schools only

---

## Mobile Implementation

### React Native Screens

| Screen | Description |
|--------|-------------|
| `ConversationsScreen` | List of all conversations with previews |
| `ConversationDetailScreen` | Conversation detail with message list |
| `MessagesScreen` | Message list with search and filters |
| `MessageDetailScreen` | Message detail with thread view |
| `GroupsScreen` | List of groups with member counts |
| `GroupDetailScreen` | Group detail with members and settings |
| `CallsScreen` | Call history with status indicators |
| `CallScreen` | Active call with controls |
| `ConferenceScreen` | Conference call with participant grid |
| `EmailScreen` | Email inbox and composition |
| `CalendarScreen` | Calendar with event list |
| `TasksScreen` | Task list with filters |
| `DocumentsScreen` | Document list with search |
| `ContactsScreen` | Contact list with groups |
| `SettingsScreen` | Communication settings and preferences |

All screens are exported from `mobile/features/communication/index.ts`.

---

## Testing Strategy

### Unit Tests

- Service layer unit tests with mocked repositories
- Hook unit tests with mocked services
- Validator tests with edge cases
- Permission check tests

### Integration Tests

- API route integration tests with mocked Supabase
- Repository integration tests with test database
- Service integration tests with real repositories

### E2E Tests

- Message send/receive flow
- Group creation and management
- Call initiation and completion
- Email send and tracking
- Notification delivery across channels

### Load Tests

- High-volume message sending
- Concurrent call handling
- Bulk SMS/email delivery
- WebSocket connection scaling

---

## File Counts Summary

| Category | Count |
|----------|-------|
| Total Files | ~250+ |
| Type Files | 1 |
| Validator Files | 1 |
| Repository Files | 1 |
| Service Files | 30 |
| Hook Files | 95 |
| API Route Files | 100+ |
| Mobile Screen Files | 15 |
| Test Files | TBD |
