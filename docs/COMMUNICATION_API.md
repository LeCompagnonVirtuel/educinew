# Communication & Collaboration API Reference

## Authentication & Authorization

All API endpoints require authentication via Bearer token in the `Authorization` header.

```
Authorization: Bearer <access_token>
```

### Authorization Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | Bearer token from Supabase Auth |
| `X-School-Id` | Yes | School ID for tenant scoping |
| `X-Request-Id` | No | Unique request ID for tracing |

### Authorization Errors

| Status Code | Description |
|-------------|-------------|
| 401 | Missing or invalid authentication token |
| 403 | Insufficient permissions for requested resource |
| 404 | Resource not found or not accessible in current tenant |

---

## Base URL

```
https://api.educi.com/api/communication
```

All endpoints are relative to this base URL.

---

## Rate Limiting

| Endpoint Category | Limit |
|-------------------|-------|
| Messages | 30/minute, 500/hour, 5000/day |
| Search | 10/minute |
| Broadcasts | 10/day |
| Email | 100/hour |
| SMS | 50/minute |
| Push Notifications | 100/minute |
| File Upload | 10/minute |
| General | 100/minute |

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 25
X-RateLimit-Reset: 1640000000
```

---

## Conversations API

### List Conversations

```
GET /conversations
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 20, max: 50) |
| `type` | string | No | Filter by conversation type |
| `search` | string | No | Search in conversation names |
| `archived` | boolean | No | Filter archived conversations |
| `pinned` | boolean | No | Filter pinned conversations |
| `muted` | boolean | No | Filter muted conversations |
| `sortBy` | string | No | Sort field (default: `lastMessageAt`) |
| `sortOrder` | string | No | Sort order (`asc` or `desc`) |

**Response:**

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "conv_123",
        "type": "GROUP",
        "name": "Grade 10 - Mathematics",
        "description": "Math class discussion",
        "avatar": "https://storage.educi.com/avatars/conv_123.jpg",
        "schoolId": "school_456",
        "createdBy": "user_789",
        "lastMessage": {
          "id": "msg_101",
          "content": "Don't forget homework due tomorrow!",
          "senderId": "user_789",
          "senderName": "Mr. Smith",
          "createdAt": "2026-07-25T10:30:00Z"
        },
        "unreadCount": 3,
        "pinned": false,
        "muted": false,
        "archived": false,
        "memberCount": 30,
        "createdAt": "2026-01-15T08:00:00Z",
        "updatedAt": "2026-07-25T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/conversations?page=1&limit=20&type=GROUP" \
  -H "Authorization: Bearer <token>" \
  -H "X-School-Id: school_456"
```

---

### Create Conversation

```
POST /conversations
```

**Request Body:**

```json
{
  "type": "GROUP",
  "name": "Parent-Teacher Meeting",
  "description": "Discussion for upcoming parent-teacher meeting",
  "memberIds": ["user_001", "user_002", "user_003"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Conversation type |
| `name` | string | Yes | Conversation name |
| `description` | string | No | Conversation description |
| `memberIds` | string[] | Yes | Initial member IDs |
| `avatar` | string | No | Avatar URL |

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "conv_200",
    "type": "GROUP",
    "name": "Parent-Teacher Meeting",
    "description": "Discussion for upcoming parent-teacher meeting",
    "schoolId": "school_456",
    "createdBy": "user_789",
    "members": [
      {"userId": "user_001", "role": "OWNER", "joinedAt": "2026-07-25T10:00:00Z"},
      {"userId": "user_002", "role": "MEMBER", "joinedAt": "2026-07-25T10:00:00Z"},
      {"userId": "user_003", "role": "MEMBER", "joinedAt": "2026-07-25T10:00:00Z"}
    ],
    "createdAt": "2026-07-25T10:00:00Z",
    "updatedAt": "2026-07-25T10:00:00Z"
  }
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conversations" \
  -H "Authorization: Bearer <token>" \
  -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"type":"GROUP","name":"Parent-Teacher Meeting","memberIds":["user_001","user_002"]}'
```

---

### Get Conversation

```
GET /conversations/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/conversations/conv_123" \
  -H "Authorization: Bearer <token>" \
  -H "X-School-Id: school_456"
```

---

### Update Conversation

```
PUT /conversations/[id]
```

**Request Body:**

```json
{
  "name": "Updated Conversation Name",
  "description": "Updated description",
  "avatar": "https://storage.educi.com/avatars/new-avatar.jpg"
}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/conversations/conv_123" \
  -H "Authorization: Bearer <token>" \
  -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","description":"Updated desc"}'
```

---

### Delete Conversation

```
DELETE /conversations/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/conversations/conv_123" \
  -H "Authorization: Bearer <token>" \
  -H "X-School-Id: school_456"
```

---

### Archive Conversation

```
POST /conversations/[id]/archive
```

**Response:**

```json
{
  "success": true,
  "data": {"id": "conv_123", "archived": true, "archivedAt": "2026-07-25T10:00:00Z"}
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conversations/conv_123/archive" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Restore Conversation

```
POST /conversations/[id]/restore
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conversations/conv_123/restore" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Pin Conversation

```
POST /conversations/[id]/pin
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conversations/conv_123/pin" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Mute Conversation

```
POST /conversations/[id]/mute
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conversations/conv_123/mute" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Messages API

### List Messages

```
GET /messages
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `conversationId` | string | Yes | Conversation ID |
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 50, max: 100) |
| `before` | string | No | Get messages before this message ID |
| `after` | string | No | Get messages after this message ID |
| `type` | string | No | Filter by message type |
| `search` | string | No | Search in message content |
| `startDate` | string | No | Filter messages after this date |
| `endDate` | string | No | Filter messages before this date |

**Response:**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_101",
        "conversationId": "conv_123",
        "type": "TEXT",
        "content": "Hello everyone!",
        "senderId": "user_789",
        "sender": {"id": "user_789", "name": "Mr. Smith", "avatar": "https://storage.educi.com/avatars/user_789.jpg"},
        "attachments": [],
        "reactions": [{"emoji": "👍", "users": ["user_001", "user_002"], "count": 2}],
        "readBy": ["user_001", "user_002", "user_003"],
        "replyTo": null,
        "pinned": false,
        "edited": false,
        "deleted": false,
        "createdAt": "2026-07-25T10:30:00Z",
        "updatedAt": "2026-07-25T10:30:00Z"
      }
    ],
    "pagination": {"page": 1, "limit": 50, "total": 250, "totalPages": 5, "hasMore": true}
  }
}
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/messages?conversationId=conv_123&page=1&limit=50" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Send Message

```
POST /messages
```

**Request Body:**

```json
{
  "conversationId": "conv_123",
  "type": "TEXT",
  "content": "Hello everyone! Don't forget homework due tomorrow.",
  "replyTo": null,
  "mentions": ["user_001"],
  "attachments": [
    {
      "fileName": "homework.pdf",
      "fileUrl": "https://storage.educi.com/uploads/homework.pdf",
      "fileSize": 1024000,
      "mimeType": "application/pdf"
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `conversationId` | string | Yes | Conversation ID |
| `type` | string | Yes | Message type (TEXT, IMAGE, FILE, AUDIO, VIDEO) |
| `content` | string | Yes | Message content |
| `replyTo` | string | No | Message ID to reply to |
| `mentions` | string[] | No | User IDs to mention |
| `attachments` | array | No | File attachments |

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "msg_102",
    "conversationId": "conv_123",
    "type": "TEXT",
    "content": "Hello everyone! Don't forget homework due tomorrow.",
    "senderId": "user_789",
    "sender": {"id": "user_789", "name": "Mr. Smith", "avatar": "https://storage.educi.com/avatars/user_789.jpg"},
    "attachments": [{"id": "att_201", "fileName": "homework.pdf", "fileUrl": "https://storage.educi.com/uploads/homework.pdf", "fileSize": 1024000, "mimeType": "application/pdf"}],
    "mentions": ["user_001"],
    "reactions": [],
    "readBy": [],
    "createdAt": "2026-07-25T11:00:00Z"
  }
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/messages" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"conversationId":"conv_123","type":"TEXT","content":"Hello!"}'
```

---

### Get Message

```
GET /messages/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/messages/msg_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Message

```
PUT /messages/[id]
```

**Request Body:**

```json
{"content": "Updated message content"}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/messages/msg_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"content":"Updated content"}'
```

---

### Delete Message

```
DELETE /messages/[id]
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `permanent` | boolean | No | Permanent delete (default: false) |

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/messages/msg_101?permanent=false" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Mark Message Read

```
POST /messages/[id]/read
```

**Response:**

```json
{"success": true, "data": {"messageId": "msg_101", "readBy": "user_001", "readAt": "2026-07-25T12:00:00Z"}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/messages/msg_101/read" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Bulk Mark Read

```
POST /messages/read
```

**Request Body:**

```json
{
  "conversationId": "conv_123",
  "messageIds": ["msg_100", "msg_101", "msg_102"]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/messages/read" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"conversationId":"conv_123","messageIds":["msg_100","msg_101"]}'
```

---

### Add Reaction

```
POST /messages/[id]/reactions
```

**Request Body:**

```json
{"emoji": "👍"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/messages/msg_101/reactions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"emoji":"👍"}'
```

---

### Remove Reaction

```
DELETE /messages/[id]/reactions
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emoji` | string | Yes | Emoji to remove |

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/messages/msg_101/reactions?emoji=%F0%9F%91%8D" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Reactions

```
GET /messages/[id]/reactions
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/messages/msg_101/reactions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Pin Message

```
POST /messages/[id]/pin
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/messages/msg_101/pin" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Forward Message

```
POST /messages/[id]/forward
```

**Request Body:**

```json
{"conversationIds": ["conv_200", "conv_201"]}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/messages/msg_101/forward" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"conversationIds":["conv_200","conv_201"]}'
```

---

### Report Message

```
POST /messages/[id]/report
```

**Request Body:**

```json
{"reason": "SPAM", "description": "This message contains spam content"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/messages/msg_101/report" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"reason":"SPAM","description":"Spam content"}'
```

---

### Search Messages

```
GET /messages/search
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `conversationId` | string | No | Limit to conversation |
| `type` | string | No | Filter by message type |
| `startDate` | string | No | Filter after date |
| `endDate` | string | No | Filter before date |
| `senderId` | string | No | Filter by sender |
| `page` | number | No | Page number |
| `limit` | number | No | Results per page |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/messages/search?q=homework&conversationId=conv_123" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Threads API

### List Threads

```
GET /threads
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `conversationId` | string | Yes | Conversation ID |
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/threads?conversationId=conv_123&page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Thread

```
GET /threads/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/threads/thread_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Thread Messages

```
GET /threads/[id]/messages
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/threads/thread_101/messages?page=1&limit=50" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Groups API

### List Groups

```
GET /groups
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `search` | string | No | Search in group names |
| `archived` | boolean | No | Filter archived groups |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/groups?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Group

```
POST /groups
```

**Request Body:**

```json
{
  "name": "Science Department",
  "description": "Science department group chat",
  "memberIds": ["user_001", "user_002"]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/groups" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Science Department","memberIds":["user_001","user_002"]}'
```

---

### Get Group

```
GET /groups/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/groups/group_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Group

```
PUT /groups/[id]
```

**Request Body:**

```json
{"name": "Updated Name", "description": "Updated description"}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/groups/group_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"name":"Updated Name"}'
```

---

### Delete Group

```
DELETE /groups/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/groups/group_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Add Group Member

```
POST /groups/[id]/members
```

**Request Body:**

```json
{"userId": "user_003", "role": "MEMBER"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/groups/group_101/members" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"userId":"user_003","role":"MEMBER"}'
```

---

### Remove Group Member

```
DELETE /groups/[id]/members/[memberId]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/groups/group_101/members/user_003" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Member Role

```
PUT /groups/[id]/members/[memberId]
```

**Request Body:**

```json
{"role": "ADMIN"}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/groups/group_101/members/user_002" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"role":"ADMIN"}'
```

---

### Get Group Settings

```
GET /groups/[id]/settings
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/groups/group_101/settings" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Archive Group

```
POST /groups/[id]/archive
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/groups/group_101/archive" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Restore Group

```
POST /groups/[id]/restore
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/groups/group_101/restore" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Calls API

### List Calls

```
GET /calls
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `type` | string | No | Filter by call type |
| `state` | string | No | Filter by call state |
| `startDate` | string | No | Filter after date |
| `endDate` | string | No | Filter before date |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/calls?page=1&limit=20&type=VIDEO" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Initiate Call

```
POST /calls
```

**Request Body:**

```json
{
  "type": "VIDEO",
  "conversationId": "conv_123",
  "participantIds": ["user_001", "user_002"]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"type":"VIDEO","conversationId":"conv_123","participantIds":["user_001"]}'
```

---

### Get Call

```
GET /calls/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/calls/call_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Answer Call

```
POST /calls/[id]/answer
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/answer" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Reject Call

```
POST /calls/[id]/reject
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/reject" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### End Call

```
POST /calls/[id]/end
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/end" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Hold Call

```
POST /calls/[id]/hold
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/hold" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Mute Call

```
POST /calls/[id]/mute
```

**Request Body:**

```json
{"muted": true}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/mute" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"muted":true}'
```

---

### Manage Participants

```
POST /calls/[id]/participants
```

**Request Body:**

```json
{"userId": "user_003"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/participants" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"userId":"user_003"}'
```

---

### Remove Participant

```
DELETE /calls/[id]/participants/[participantId]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/calls/call_101/participants/user_003" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Toggle Recording

```
POST /calls/[id]/record
```

**Request Body:**

```json
{"recording": true}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/record" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"recording":true}'
```

---

### Toggle Screen Share

```
POST /calls/[id]/screen-share
```

**Request Body:**

```json
{"screenShare": true}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calls/call_101/screen-share" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"screenShare":true}'
```

---

### Call History

```
GET /calls/history
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/calls/history?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Conference API

### List Conferences

```
GET /conferences
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/conferences?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Conference

```
POST /conferences
```

**Request Body:**

```json
{
  "name": "Parent-Teacher Conference",
  "description": "Quarterly parent-teacher meeting",
  "scheduledAt": "2026-08-01T14:00:00Z",
  "maxParticipants": 50,
  "participantIds": ["user_001", "user_002"]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conferences" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Conference","scheduledAt":"2026-08-01T14:00:00Z","maxParticipants":50}'
```

---

### Get Conference

```
GET /conferences/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/conferences/conf_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Join Conference

```
POST /conferences/[id]/join
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conferences/conf_101/join" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Leave Conference

```
POST /conferences/[id]/leave
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conferences/conf_101/leave" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Manage Conference Participants

```
POST /conferences/[id]/participants
```

**Request Body:**

```json
{"userId": "user_004", "role": "PARTICIPANT"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conferences/conf_101/participants" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"userId":"user_004","role":"PARTICIPANT"}'
```

---

### Toggle Conference Recording

```
POST /conferences/[id]/record
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/conferences/conf_101/record" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"recording":true}'
```

---

## Email API

### List Emails

```
GET /email
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `status` | string | No | Filter by status |
| `startDate` | string | No | Filter after date |
| `endDate` | string | No | Filter before date |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/email?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Send Email

```
POST /email
```

**Request Body:**

```json
{
  "to": ["parent@educi.com"],
  "cc": ["admin@educi.com"],
  "bcc": [],
  "subject": "Report Card - Q2 2026",
  "body": "Dear Parent, please find attached the report card.",
  "attachments": [{"fileName": "report.pdf", "fileUrl": "https://storage.educi.com/uploads/report.pdf"}],
  "signatureId": "sig_101",
  "trackOpens": true,
  "trackClicks": true
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/email" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"to":["parent@educi.com"],"subject":"Report Card","body":"Dear Parent...","trackOpens":true}'
```

---

### Get Email

```
GET /email/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/email/email_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### List Email Templates

```
GET /email/templates
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/email/templates" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Email Template

```
POST /email/templates
```

**Request Body:**

```json
{
  "name": "Homework Reminder",
  "subject": "Homework Reminder - {{className}}",
  "body": "Dear {{parentName}}, {{studentName}} has homework due in {{subject}}.",
  "variables": ["className", "parentName", "studentName", "subject"]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/email/templates" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Homework Reminder","subject":"Reminder - {{className}}","body":"Dear {{parentName}}...","variables":["className","parentName"]}'
```

---

### Update Email Template

```
PUT /email/templates/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/email/templates/tmpl_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"name":"Updated Template"}'
```

---

### Delete Email Template

```
DELETE /email/templates/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/email/templates/tmpl_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### List Email Campaigns

```
GET /email/campaigns
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/email/campaigns" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Email Campaign

```
POST /email/campaigns
```

**Request Body:**

```json
{
  "name": "Welcome Back Newsletter",
  "templateId": "tmpl_101",
  "recipientGroup": "ALL_PARENTS",
  "scheduledAt": "2026-08-01T09:00:00Z"
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/email/campaigns" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Newsletter","templateId":"tmpl_101","recipientGroup":"ALL_PARENTS"}'
```

---

### Send Campaign

```
POST /email/campaigns/[id]/send
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/email/campaigns/campaign_101/send" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Schedule Campaign

```
POST /email/campaigns/[id]/schedule
```

**Request Body:**

```json
{"scheduledAt": "2026-08-01T09:00:00Z"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/email/campaigns/campaign_101/schedule" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"scheduledAt":"2026-08-01T09:00:00Z"}'
```

---

### List Email Signatures

```
GET /email/signatures
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/email/signatures" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Email Signature

```
POST /email/signatures
```

**Request Body:**

```json
{
  "name": "Work Signature",
  "content": "<p>Mr. Smith<br>Mathematics Teacher<br>EduCI School</p>",
  "isDefault": true
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/email/signatures" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Work Signature","content":"<p>Mr. Smith</p>","isDefault":true}'
```

---

### Set Default Signature

```
POST /email/signatures/[id]/default
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/email/signatures/sig_101/default" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Email Tracking

```
GET /email/tracking
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emailId` | string | Yes | Email ID |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/email/tracking?emailId=email_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## SMS API

### List SMS Messages

```
GET /sms
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/sms?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Send SMS

```
POST /sms
```

**Request Body:**

```json
{
  "to": "+1234567890",
  "body": "Reminder: Parent-teacher meeting tomorrow at 3 PM."
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/sms" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"to":"+1234567890","body":"Meeting tomorrow at 3 PM."}'
```

---

### Get SMS

```
GET /sms/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/sms/sms_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Send Bulk SMS

```
POST /sms/bulk
```

**Request Body:**

```json
{
  "to": ["+1234567890", "+0987654321"],
  "body": "School closed tomorrow due to weather."
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/sms/bulk" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"to":["+1234567890","+0987654321"],"body":"School closed tomorrow."}'
```

---

### List SMS Templates

```
GET /sms/templates
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/sms/templates" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create SMS Template

```
POST /sms/templates
```

**Request Body:**

```json
{
  "name": "Homework Reminder",
  "body": "Reminder: {{studentName}} has homework due in {{subject}}."
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/sms/templates" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Homework Reminder","body":"Reminder: {{studentName}} has homework due."}'
```

---

### Check SMS Delivery

```
GET /sms/delivery
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `smsId` | string | Yes | SMS ID |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/sms/delivery?smsId=sms_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Push API

### Send Push Notification

```
POST /push
```

**Request Body:**

```json
{
  "userId": "user_001",
  "title": "New Message",
  "body": "You have a new message from Mr. Smith",
  "data": {"type": "MESSAGE", "conversationId": "conv_123", "messageId": "msg_101"},
  "priority": "high"
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/push" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"userId":"user_001","title":"New Message","body":"New message from Mr. Smith","data":{"type":"MESSAGE"}}'
```

---

### Send Bulk Push

```
POST /push/bulk
```

**Request Body:**

```json
{
  "userIds": ["user_001", "user_002", "user_003"],
  "title": "School Announcement",
  "body": "School will be closed tomorrow.",
  "data": {"type": "ANNOUNCEMENT", "announcementId": "ann_101"}
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/push/bulk" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"userIds":["user_001","user_002"],"title":"Announcement","body":"School closed tomorrow."}'
```

---

### List Push Subscriptions

```
GET /push/subscriptions
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/push/subscriptions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Push Subscription

```
POST /push/subscriptions
```

**Request Body:**

```json
{"deviceToken": "fcm_token_456", "platform": "android"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/push/subscriptions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"deviceToken":"fcm_token_456","platform":"android"}'
```

---

### Delete Push Subscription

```
DELETE /push/subscriptions/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/push/subscriptions/sub_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### List Push Templates

```
GET /push/templates
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/push/templates" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Push Template

```
POST /push/templates
```

**Request Body:**

```json
{
  "name": "New Message",
  "title": "New Message from {{senderName}}",
  "body": "{{messagePreview}}",
  "data": {"type": "MESSAGE"}
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/push/templates" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Message","title":"From {{senderName}}","body":"{{messagePreview}}"}'
```

---

### Register Device

```
POST /push/devices
```

**Request Body:**

```json
{"deviceToken": "fcm_token_789", "platform": "ios", "deviceName": "iPhone 14"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/push/devices" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"deviceToken":"fcm_token_789","platform":"ios","deviceName":"iPhone 14"}'
```

---

### Remove Device

```
DELETE /push/devices/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/push/devices/device_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Announcements API

### List Announcements

```
GET /announcements
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `scope` | string | No | Filter by scope |
| `status` | string | No | Filter by status |
| `priority` | string | No | Filter by priority |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/announcements?page=1&limit=20&scope=WHOLE_SCHOOL" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Announcement

```
POST /announcements
```

**Request Body:**

```json
{
  "title": "School Closure Notice",
  "content": "School will be closed on August 1st.",
  "scope": "WHOLE_SCHOOL",
  "priority": "HIGH",
  "scheduledAt": null,
  "expiresAt": "2026-08-02T00:00:00Z",
  "acknowledgmentRequired": true,
  "targetUserIds": [],
  "targetClassIds": [],
  "targetLevelIds": []
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/announcements" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"title":"School Closure","content":"Closed on Aug 1st.","scope":"WHOLE_SCHOOL","priority":"HIGH"}'
```

---

### Get Announcement

```
GET /announcements/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/announcements/ann_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Announcement

```
PUT /announcements/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/announcements/ann_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"title":"Updated Title"}'
```

---

### Delete Announcement

```
DELETE /announcements/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/announcements/ann_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Publish Announcement

```
POST /announcements/[id]/publish
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/announcements/ann_101/publish" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Schedule Announcement

```
POST /announcements/[id]/schedule
```

**Request Body:**

```json
{"scheduledAt": "2026-08-01T09:00:00Z"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/announcements/ann_101/schedule" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"scheduledAt":"2026-08-01T09:00:00Z"}'
```

---

### Acknowledge Announcement

```
POST /announcements/[id]/acknowledge
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/announcements/ann_101/acknowledge" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Acknowledgments

```
GET /announcements/[id]/acknowledgments
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/announcements/ann_101/acknowledgments" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Pin Announcement

```
POST /announcements/[id]/pin
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/announcements/ann_101/pin" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Archive Announcement

```
POST /announcements/[id]/archive
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/announcements/ann_101/archive" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Calendar API

### List Calendar Events

```
GET /calendar
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | string | Yes | Start date range |
| `endDate` | string | Yes | End date range |
| `type` | string | No | Filter by event type |
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/calendar?startDate=2026-08-01&endDate=2026-08-31" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Calendar Event

```
POST /calendar
```

**Request Body:**

```json
{
  "title": "Parent-Teacher Meeting",
  "description": "Quarterly meeting with parents",
  "type": "MEETING",
  "startDate": "2026-08-01T14:00:00Z",
  "endDate": "2026-08-01T16:00:00Z",
  "location": "Conference Room A",
  "attendeeIds": ["user_001", "user_002"],
  "reminders": [{"type": "EMAIL", "minutesBefore": 60}]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calendar" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"title":"Meeting","type":"MEETING","startDate":"2026-08-01T14:00:00Z","endDate":"2026-08-01T16:00:00Z"}'
```

---

### Get Calendar Event

```
GET /calendar/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/calendar/event_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Calendar Event

```
PUT /calendar/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/calendar/event_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"title":"Updated Meeting"}'
```

---

### Delete Calendar Event

```
DELETE /calendar/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/calendar/event_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Add Attendee

```
POST /calendar/[id]/attendees
```

**Request Body:**

```json
{"userId": "user_003"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calendar/event_101/attendees" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"userId":"user_003"}'
```

---

### Remove Attendee

```
DELETE /calendar/[id]/attendees/[attendeeId]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/calendar/event_101/attendees/user_003" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### RSVP to Event

```
POST /calendar/[id]/rsvp
```

**Request Body:**

```json
{"status": "ACCEPTED"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calendar/event_101/rsvp" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"status":"ACCEPTED"}'
```

---

### Manage Reminders

```
POST /calendar/[id]/reminders
```

**Request Body:**

```json
{"type": "EMAIL", "minutesBefore": 30}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/calendar/event_101/reminders" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"type":"EMAIL","minutesBefore":30}'
```

---

### Get Calendar Feed

```
GET /calendar/subscribe
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/calendar/subscribe" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Check Availability

```
GET /calendar/availability
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userIds` | string | Yes | Comma-separated user IDs |
| `startDate` | string | Yes | Start date |
| `endDate` | string | Yes | End date |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/calendar/availability?userIds=user_001&startDate=2026-08-01&endDate=2026-08-01" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Tasks API

### List Tasks

```
GET /tasks
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `status` | string | No | Filter by status |
| `priority` | string | No | Filter by priority |
| `assigneeId` | string | No | Filter by assignee |
| `search` | string | No | Search in task titles |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/tasks?page=1&limit=20&status=IN_PROGRESS" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Task

```
POST /tasks
```

**Request Body:**

```json
{
  "title": "Prepare report cards",
  "description": "Generate Q2 report cards",
  "priority": "HIGH",
  "assigneeId": "user_789",
  "dueDate": "2026-08-01T23:59:59Z",
  "checklist": [{"text": "Gather exam results"}, {"text": "Calculate grades"}]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/tasks" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare reports","priority":"HIGH","dueDate":"2026-08-01T23:59:59Z"}'
```

---

### Get Task

```
GET /tasks/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/tasks/task_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Task

```
PUT /tasks/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/tasks/task_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"title":"Updated task","priority":"URGENT"}'
```

---

### Delete Task

```
DELETE /tasks/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/tasks/task_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Assign Task

```
POST /tasks/[id]/assign
```

**Request Body:**

```json
{"userId": "user_002"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/tasks/task_101/assign" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"userId":"user_002"}'
```

---

### Unassign Task

```
POST /tasks/[id]/unassign
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/tasks/task_101/unassign" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Complete Task

```
POST /tasks/[id]/complete
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/tasks/task_101/complete" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Reopen Task

```
POST /tasks/[id]/reopen
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/tasks/task_101/reopen" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Task Comments

```
GET /tasks/[id]/comments
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/tasks/task_101/comments" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Add Task Comment

```
POST /tasks/[id]/comments
```

**Request Body:**

```json
{"content": "Half of report cards are done"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/tasks/task_101/comments" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"content":"Half done"}'
```

---

### Get Task Checklist

```
GET /tasks/[id]/checklist
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/tasks/task_101/checklist" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Add Checklist Item

```
POST /tasks/[id]/checklist
```

**Request Body:**

```json
{"text": "Send reports to parents"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/tasks/task_101/checklist" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"text":"Send reports"}'
```

---

### Toggle Checklist Item

```
PUT /tasks/[id]/checklist/[itemId]
```

**Request Body:**

```json
{"completed": true}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/tasks/task_101/checklist/check_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"completed":true}'
```

---

### Get My Tasks

```
GET /tasks/my
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/tasks/my?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Overdue Tasks

```
GET /tasks/overdue
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/tasks/overdue" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Documents API

### List Documents

```
GET /documents
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `search` | string | No | Search in document titles |
| `type` | string | No | Filter by document type |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Document

```
POST /documents
```

**Request Body:**

```json
{
  "title": "Class Schedule",
  "description": "Weekly class schedule for Grade 10",
  "type": "TEXT",
  "content": "Monday: Math, Science, English..."
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/documents" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"title":"Class Schedule","type":"TEXT","content":"Monday: Math..."}'
```

---

### Get Document

```
GET /documents/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents/doc_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Document

```
PUT /documents/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/documents/doc_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"title":"Updated Title","content":"Updated content"}'
```

---

### Delete Document

```
DELETE /documents/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/documents/doc_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Upload Document

```
POST /documents/[id]/upload
```

**Request:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | File to upload |

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/documents/doc_103/upload" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -F "file=@/path/to/file.pdf"
```

---

### Download Document

```
GET /documents/[id]/download
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents/doc_101/download" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" -o document.pdf
```

---

### Get Document Versions

```
GET /documents/[id]/versions
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents/doc_101/versions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Revert to Version

```
POST /documents/[id]/revert
```

**Request Body:**

```json
{"version": 2}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/documents/doc_101/revert" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"version":2}'
```

---

### Get Document Permissions

```
GET /documents/[id]/permissions
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents/doc_101/permissions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Manage Document Permissions

```
POST /documents/[id]/permissions
```

**Request Body:**

```json
{"userId": "user_001", "permission": "EDIT"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/documents/doc_101/permissions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"userId":"user_001","permission":"EDIT"}'
```

---

### Revoke Document Permission

```
DELETE /documents/[id]/permissions/[userId]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/documents/doc_101/permissions/user_001" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Document Comments

```
GET /documents/[id]/comments
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents/doc_101/comments" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Add Document Comment

```
POST /documents/[id]/comments
```

**Request Body:**

```json
{"content": "Great work on this document!"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/documents/doc_101/comments" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"content":"Great work!"}'
```

---

### Delete Document Comment

```
DELETE /documents/[id]/comments/[commentId]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/documents/doc_101/comments/comment_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Search Documents

```
GET /documents/search
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents/search?q=curriculum" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Recent Documents

```
GET /documents/recent
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/documents/recent?limit=10" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Collaboration API

### List Collaboration Sessions

```
GET /collaboration/sessions
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/collaboration/sessions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Collaboration Session

```
POST /collaboration/sessions
```

**Request Body:**

```json
{"documentId": "doc_101", "name": "Curriculum Review"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/collaboration/sessions" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"documentId":"doc_101","name":"Curriculum Review"}'
```

---

### Get Collaboration Session

```
GET /collaboration/sessions/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/collaboration/sessions/collab_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Join Collaboration Session

```
POST /collaboration/sessions/[id]/join
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/collaboration/sessions/collab_101/join" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Leave Collaboration Session

```
POST /collaboration/sessions/[id]/leave
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/collaboration/sessions/collab_101/leave" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Session Participants

```
GET /collaboration/sessions/[id]/participants
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/collaboration/sessions/collab_101/participants" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Send Presence

```
POST /collaboration/sessions/[id]/presence
```

**Request Body:**

```json
{"status": "ACTIVE", "cursor": {"line": 10, "column": 5}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/collaboration/sessions/collab_101/presence" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"status":"ACTIVE","cursor":{"line":10,"column":5}}'
```

---

### Toggle Editing

```
POST /collaboration/sessions/[id]/editing
```

**Request Body:**

```json
{"editing": true}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/collaboration/sessions/collab_101/editing" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"editing":true}'
```

---

### Lock Section

```
POST /collaboration/sessions/[id]/lock
```

**Request Body:**

```json
{"section": "chapter-1", "userId": "user_001"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/collaboration/sessions/collab_101/lock" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"section":"chapter-1","userId":"user_001"}'
```

---

### Unlock Section

```
POST /collaboration/sessions/[id]/unlock
```

**Request Body:**

```json
{"section": "chapter-1"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/collaboration/sessions/collab_101/unlock" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"section":"chapter-1"}'
```

---

## AI API

### Summarize

```
POST /ai/summarize
```

**Request Body:**

```json
{
  "conversationId": "conv_123",
  "messageCount": 100,
  "language": "en"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "summary": "Discussion about upcoming exam schedule and study materials.",
    "keyPoints": ["Exam scheduled for Aug 15", "Study guide uploaded", "Office hours extended"],
    "language": "en"
  }
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/summarize" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"conversationId":"conv_123","messageCount":100}'
```

---

### Translate

```
POST /ai/translate
```

**Request Body:**

```json
{"text": "Hello, how are you?", "targetLanguage": "fr"}
```

**Response:**

```json
{"success": true, "data": {"translatedText": "Bonjour, comment allez-vous?", "sourceLanguage": "en", "targetLanguage": "fr"}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/translate" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, how are you?","targetLanguage":"fr"}'
```

---

### Correct Text

```
POST /ai/correct
```

**Request Body:**

```json
{"text": "Their is many student in the class."}
```

**Response:**

```json
{"success": true, "data": {"correctedText": "There are many students in the class.", "corrections": [{"original": "Their", "corrected": "There are", "rule": "grammar"}]}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/correct" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"text":"Their is many student in the class."}'
```

---

### Detect Spam

```
POST /ai/spam-detect
```

**Request Body:**

```json
{"content": "Click here to win a free iPhone!"}
```

**Response:**

```json
{"success": true, "data": {"isSpam": true, "confidence": 0.95, "reason": "Promotional content with suspicious link"}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/spam-detect" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"content":"Click here to win a free iPhone!"}'
```

---

### Suggest Reply

```
POST /ai/suggest-reply
```

**Request Body:**

```json
{"messageContent": "When is the homework due?", "conversationContext": "Math class group chat"}
```

**Response:**

```json
{"success": true, "data": {"suggestions": ["Homework is due tomorrow at 9 AM", "Please check the syllabus for due dates", "The deadline has been extended to Friday"]}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/suggest-reply" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"messageContent":"When is the homework due?"}'
```

---

### Extract Action Items

```
POST /ai/action-items
```

**Request Body:**

```json
{"content": "Please submit your report by Friday. John needs to review the budget. Meeting rescheduled to Monday."}
```

**Response:**

```json
{"success": true, "data": {"actionItems": [{"text": "Submit report by Friday", "assignee": null, "dueDate": "Friday"}, {"text": "Review the budget", "assignee": "John", "dueDate": null}, {"text": "Attend rescheduled meeting on Monday", "assignee": null, "dueDate": "Monday"}]}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/action-items" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"content":"Submit report by Friday. Review budget."}'
```

---

### Sentiment Analysis

```
POST /ai/sentiment
```

**Request Body:**

```json
{"text": "I'm really happy with the progress this semester!"}
```

**Response:**

```json
{"success": true, "data": {"sentiment": "positive", "confidence": 0.92, "score": 0.85}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/sentiment" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"text":"I am really happy with the progress!"}'
```

---

### Auto-Tag

```
POST /ai/auto-tag
```

**Request Body:**

```json
{"content": "Reminder about the science fair next week. All students should prepare their projects."}
```

**Response:**

```json
{"success": true, "data": {"tags": ["science-fair", "reminder", "student-projects"], "category": "announcement"}}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/ai/auto-tag" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"content":"Reminder about science fair next week."}'
```

---

## Notifications API

### List Notifications

```
GET /notifications
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `read` | boolean | No | Filter by read status |
| `type` | string | No | Filter by notification type |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/notifications?page=1&limit=20&read=false" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Notification

```
GET /notifications/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/notifications/notif_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Mark Notification Read

```
POST /notifications/[id]/read
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/notifications/notif_101/read" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Mark All Read

```
POST /notifications/read-all
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/notifications/read-all" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Delete Notification

```
DELETE /notifications/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/notifications/notif_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Notification Preferences

```
GET /notifications/preferences
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/notifications/preferences" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Notification Preferences

```
PUT /notifications/preferences
```

**Request Body:**

```json
{
  "MESSAGE": {"IN_APP": true, "PUSH": true, "EMAIL": false},
  "MENTION": {"IN_APP": true, "PUSH": true, "EMAIL": true},
  "TASK_ASSIGNED": {"IN_APP": true, "PUSH": true, "EMAIL": true}
}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/notifications/preferences" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"MESSAGE":{"IN_APP":true,"PUSH":true}}'
```

---

### Get Notification Settings

```
GET /notifications/settings
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/notifications/settings" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Notification Settings

```
PUT /notifications/settings
```

**Request Body:**

```json
{
  "quietHoursEnabled": true,
  "quietHoursStart": "22:00",
  "quietHoursEnd": "07:00",
  "batchingEnabled": true,
  "batchingIntervalMinutes": 30
}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/notifications/settings" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"quietHoursEnabled":true,"quietHoursStart":"22:00","quietHoursEnd":"07:00"}'
```

---

### Get Notification Batches

```
GET /notifications/batches
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/notifications/batches" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Clear Notification Batch

```
DELETE /notifications/batches/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/notifications/batches/batch_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Contacts API

### List Contacts

```
GET /contacts
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `search` | string | No | Search in contact names |
| `groupId` | string | No | Filter by group |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/contacts?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Contact

```
POST /contacts
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "parent",
  "studentIds": ["student_001"]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/contacts" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"parent"}'
```

---

### Get Contact

```
GET /contacts/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/contacts/contact_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Contact

```
PUT /contacts/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/contacts/contact_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"name":"Updated Name"}'
```

---

### Delete Contact

```
DELETE /contacts/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/contacts/contact_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Search Contacts

```
GET /contacts/search
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/contacts/search?q=john" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### List Contact Groups

```
GET /contacts/groups
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/contacts/groups" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Contact Group

```
POST /contacts/groups
```

**Request Body:**

```json
{"name": "Grade 10 Parents"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/contacts/groups" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"name":"Grade 10 Parents"}'
```

---

### Update Contact Group

```
PUT /contacts/groups/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/contacts/groups/group_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"name":"Updated Group"}'
```

---

### Delete Contact Group

```
DELETE /contacts/groups/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/contacts/groups/group_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Manage Group Members

```
POST /contacts/groups/[id]/members
```

**Request Body:**

```json
{"contactId": "contact_101"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/contacts/groups/group_101/members" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"contactId":"contact_101"}'
```

---

### Sync Contacts

```
POST /contacts/sync
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/contacts/sync" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Import Contacts

```
POST /contacts/import
```

**Request:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | CSV or JSON file |

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/contacts/import" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -F "file=@/path/to/contacts.csv"
```

---

### Export Contacts

```
POST /contacts/export
```

**Request Body:**

```json
{"format": "csv", "groupId": "group_101"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/contacts/export" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"format":"csv"}'
```

---

## Polls API

### List Polls

```
GET /polls
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/polls?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Poll

```
POST /polls
```

**Request Body:**

```json
{
  "question": "What is the best day for parent-teacher meetings?",
  "options": ["Monday", "Wednesday", "Friday"],
  "conversationId": "conv_123",
  "allowMultiple": false,
  "anonymous": true,
  "expiresAt": "2026-08-01T23:59:59Z"
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/polls" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"question":"Best day for meetings?","options":["Monday","Wednesday","Friday"],"conversationId":"conv_123"}'
```

---

### Get Poll

```
GET /polls/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/polls/poll_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Vote

```
POST /polls/[id]/vote
```

**Request Body:**

```json
{"optionIndex": 1}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/polls/poll_101/vote" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"optionIndex":1}'
```

---

### Close Poll

```
POST /polls/[id]/close
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/polls/poll_101/close" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Reopen Poll

```
POST /polls/[id]/reopen
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/polls/poll_101/reopen" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Poll Results

```
GET /polls/[id]/results
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/polls/poll_101/results" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Delete Poll

```
DELETE /polls/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/polls/poll_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Webhooks API

### List Webhooks

```
GET /webhooks
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/webhooks" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Webhook

```
POST /webhooks
```

**Request Body:**

```json
{
  "url": "https://example.com/webhook",
  "events": ["message.created", "announcement.published"],
  "secret": "my_webhook_secret"
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/webhooks" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/webhook","events":["message.created"]}'
```

---

### Get Webhook

```
GET /webhooks/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/webhooks/webhook_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Webhook

```
PUT /webhooks/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/webhooks/webhook_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://new-url.com/webhook","events":["message.created","announcement.published"]}'
```

---

### Delete Webhook

```
DELETE /webhooks/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/webhooks/webhook_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Test Webhook

```
POST /webhooks/[id]/test
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/webhooks/webhook_101/test" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Webhook Logs

```
GET /webhooks/[id]/logs
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/webhooks/webhook_101/logs" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Toggle Webhook

```
POST /webhooks/[id]/toggle
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/webhooks/webhook_101/toggle" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Rotate Webhook Secret

```
POST /webhooks/[id]/rotate-secret
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/webhooks/webhook_101/rotate-secret" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Channels API

### List Channels

```
GET /channels
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/channels?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Channel

```
POST /channels
```

**Request Body:**

```json
{"name": "Announcements", "description": "Official announcements", "type": "PUBLIC"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/channels" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Announcements","description":"Official","type":"PUBLIC"}'
```

---

### Get Channel

```
GET /channels/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/channels/channel_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Channel

```
PUT /channels/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/channels/channel_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"name":"Updated Channel"}'
```

---

### Delete Channel

```
DELETE /channels/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/channels/channel_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Subscribe to Channel

```
POST /channels/[id]/subscribe
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/channels/channel_101/subscribe" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Unsubscribe from Channel

```
POST /channels/[id]/unsubscribe
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/channels/channel_101/unsubscribe" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Channel Subscribers

```
GET /channels/[id]/subscribers
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/channels/channel_101/subscribers" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Pin Message to Channel

```
POST /channels/[id]/pin
```

**Request Body:**

```json
{"messageId": "msg_101"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/channels/channel_101/pin" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"messageId":"msg_101"}'
```

---

### Archive Channel

```
POST /channels/[id]/archive
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/channels/channel_101/archive" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Presence API

### Set Presence

```
POST /presence
```

**Request Body:**

```json
{"status": "ONLINE"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/presence" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"status":"ONLINE"}'
```

---

### Get Presence

```
GET /presence
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/presence?userId=user_001" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Bulk Presence

```
GET /presence/bulk
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userIds` | string | Yes | Comma-separated user IDs |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/presence/bulk?userIds=user_001,user_002" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Start Typing

```
POST /presence/typing
```

**Request Body:**

```json
{"conversationId": "conv_123"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/presence/typing" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"conversationId":"conv_123"}'
```

---

### Get Typing Users

```
GET /presence/typing/[conversationId]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/presence/typing/conv_123" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Auto-Responses API

### List Auto-Response Rules

```
GET /auto-responses
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/auto-responses" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Create Auto-Response Rule

```
POST /auto-responses
```

**Request Body:**

```json
{
  "name": "Outside Hours Response",
  "trigger": "OUTSIDE_HOURS",
  "response": "Thank you for your message. We will respond during business hours.",
  "enabled": true,
  "schedule": {"start": "17:00", "end": "08:00", "days": ["mon", "tue", "wed", "thu", "fri"]}
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/auto-responses" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"After Hours","trigger":"OUTSIDE_HOURS","response":"We will respond tomorrow.","enabled":true}'
```

---

### Get Auto-Response Rule

```
GET /auto-responses/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/auto-responses/rule_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Auto-Response Rule

```
PUT /auto-responses/[id]
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/auto-responses/rule_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Rule","response":"Updated response text."}'
```

---

### Delete Auto-Response Rule

```
DELETE /auto-responses/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/auto-responses/rule_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Toggle Auto-Response Rule

```
POST /auto-responses/[id]/toggle
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/auto-responses/rule_101/toggle" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Trigger Types

```
GET /auto-responses/triggers
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/auto-responses/triggers" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Test Auto-Response Rule

```
POST /auto-responses/test
```

**Request Body:**

```json
{"ruleId": "rule_101", "testMessage": "Hello, I need help with my homework."}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/auto-responses/test" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"ruleId":"rule_101","testMessage":"Hello, I need help."}'
```

---

## Search API

### Global Search

```
GET /search
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `modules` | string | No | Comma-separated modules to search |
| `page` | number | No | Page number |
| `limit` | number | No | Results per page |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/search?q=homework&modules=messages,documents" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Search Messages

```
GET /search/messages
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `conversationId` | string | No | Limit to conversation |
| `startDate` | string | No | Filter after date |
| `endDate` | string | No | Filter before date |
| `senderId` | string | No | Filter by sender |
| `page` | number | No | Page number |
| `limit` | number | No | Results per page |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/search/messages?q=exam&conversationId=conv_123" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Search Conversations

```
GET /search/conversations
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/search/conversations?q=math" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Search Contacts

```
GET /search/contacts
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/search/contacts?q=john" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Search Documents

```
GET /search/documents
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/search/documents?q=curriculum" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Advanced Search

```
GET /search/advanced
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `type` | string | No | Content type filter |
| `senderId` | string | No | Sender filter |
| `conversationId` | string | No | Conversation filter |
| `startDate` | string | No | Start date filter |
| `endDate` | string | No | End date filter |
| `hasAttachment` | boolean | No | Filter with attachments |
| `page` | number | No | Page number |
| `limit` | number | No | Results per page |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/search/advanced?q=homework&type=TEXT&hasAttachment=true" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Export API

### Export Data

```
POST /export
```

**Request Body:**

```json
{
  "type": "CONVERSATION",
  "conversationId": "conv_123",
  "format": "PDF",
  "startDate": "2026-01-01",
  "endDate": "2026-07-25"
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/export" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"type":"CONVERSATION","conversationId":"conv_123","format":"PDF"}'
```

---

### Export Conversation

```
POST /export/conversation
```

**Request Body:**

```json
{"conversationId": "conv_123", "format": "PDF", "includeAttachments": true}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/export/conversation" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"conversationId":"conv_123","format":"PDF"}'
```

---

### Export Thread

```
POST /export/thread
```

**Request Body:**

```json
{"threadId": "thread_101", "format": "PDF"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/export/thread" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"threadId":"thread_101","format":"PDF"}'
```

---

### Export Document

```
POST /export/document
```

**Request Body:**

```json
{"documentId": "doc_101", "format": "PDF", "version": 3}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/export/document" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"documentId":"doc_101","format":"PDF"}'
```

---

### Export Contacts

```
POST /export/contacts
```

**Request Body:**

```json
{"format": "CSV", "groupId": "group_101"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/export/contacts" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" -d '{"format":"CSV"}'
```

---

### Export Calendar

```
POST /export/calendar
```

**Request Body:**

```json
{"format": "ICAL", "startDate": "2026-08-01", "endDate": "2026-08-31"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/export/calendar" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"format":"ICAL","startDate":"2026-08-01","endDate":"2026-08-31"}'
```

---

### Get Export Status

```
GET /export/[jobId]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/export/export_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Download Export

```
GET /export/[jobId]/download
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/export/export_101/download" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" -o export.pdf
```

---

## Scheduled Messages API

### List Scheduled Messages

```
GET /scheduled
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/scheduled?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Schedule Message

```
POST /scheduled
```

**Request Body:**

```json
{
  "conversationId": "conv_123",
  "content": "Happy birthday! Hope you have a great day!",
  "scheduledAt": "2026-08-15T09:00:00Z",
  "type": "TEXT"
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/scheduled" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"conversationId":"conv_123","content":"Happy birthday!","scheduledAt":"2026-08-15T09:00:00Z"}'
```

---

### Get Scheduled Message

```
GET /scheduled/[id]
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/scheduled/sched_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Update Scheduled Message

```
PUT /scheduled/[id]
```

**Request Body:**

```json
{"content": "Updated message content", "scheduledAt": "2026-08-16T09:00:00Z"}
```

**Example:**

```bash
curl -X PUT "https://api.educi.com/api/communication/scheduled/sched_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"content":"Updated content","scheduledAt":"2026-08-16T09:00:00Z"}'
```

---

### Cancel Scheduled Message

```
DELETE /scheduled/[id]
```

**Example:**

```bash
curl -X DELETE "https://api.educi.com/api/communication/scheduled/sched_101" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Scheduled History

```
GET /scheduled/history
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/scheduled/history?page=1&limit=20" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

## Utility API

### Get Communication Statistics

```
GET /statistics
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/statistics" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Get Communication Dashboard

```
GET /dashboard
```

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/dashboard" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### List Attachments

```
GET /attachments
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `conversationId` | string | No | Filter by conversation |
| `messageId` | string | No | Filter by message |
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |

**Example:**

```bash
curl -X GET "https://api.educi.com/api/communication/attachments?conversationId=conv_123" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456"
```

---

### Upload File

```
POST /upload
```

**Request:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | File to upload |
| `conversationId` | string | Yes | Conversation ID |

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/upload" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -F "file=@/path/to/file.pdf" -F "conversationId=conv_123"
```

---

### Download File

```
POST /download
```

**Request Body:**

```json
{"fileUrl": "https://storage.educi.com/uploads/file.pdf"}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/download" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"fileUrl":"https://storage.educi.com/uploads/file.pdf"}' -o file.pdf
```

---

### Sync Offline Messages

```
POST /sync
```

**Request Body:**

```json
{
  "messages": [
    {"tempId": "temp_001", "conversationId": "conv_123", "content": "Offline message", "createdAt": "2026-07-25T08:00:00Z"}
  ]
}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/sync" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"tempId":"temp_001","conversationId":"conv_123","content":"Offline msg"}]}'
```

---

### Manage Real-time Subscription

```
POST /realtime
```

**Request Body:**

```json
{"action": "subscribe", "channels": ["messages", "presence", "typing"]}
```

**Example:**

```bash
curl -X POST "https://api.educi.com/api/communication/realtime" \
  -H "Authorization: Bearer <token>" -H "X-School-Id: school_456" \
  -H "Content-Type: application/json" \
  -d '{"action":"subscribe","channels":["messages","presence"]}'
```

---

## Error Responses

All error responses follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [
      {
        "field": "content",
        "message": "Content is required"
      }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request body |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | External service unavailable |
