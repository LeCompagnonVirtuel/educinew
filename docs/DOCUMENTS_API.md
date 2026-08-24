# Document Management API Reference

## Authentication & Authorization

All API routes require JWT authentication via `Authorization: Bearer <token>` header. Routes are organized by domain under `/api/documents/`. Each route enforces RBAC permissions based on the authenticated user's role.

### Base URL Pattern

```
/api/documents/{domain}/{resource}/{action}
```

### Common Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Authorization` | `Bearer <token>` | JWT authentication token |
| `Content-Type` | `application/json` | Request content type |
| `X-School-Id` | `<schoolId>` | Tenant identifier |
| `X-Request-Id` | `<uuid>` | Request tracking ID |

### Common Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 50 | Items per page |
| `sort` | string | `createdAt` | Sort field |
| `order` | string | `desc` | Sort order (asc/desc) |
| `search` | string | - | Search query |
| `filters` | object | - | Filter conditions |

---

## Documents

### List Documents

```
GET /api/documents/docs
```

**Query Parameters:**
- `folderId` (string) - Filter by folder
- `workspaceId` (string) - Filter by workspace
- `type` (string) - Filter by document type
- `tags` (string[]) - Filter by tags
- `createdBy` (string) - Filter by creator
- `createdAfter` (string) - Filter by creation date
- `createdBefore` (string) - Filter by creation date
- `status` (string) - Filter by status

**Response (200):**
```json
{
  "documents": [
    {
      "id": "doc_123",
      "name": "Quarterly Report.pdf",
      "type": "PDF",
      "mimeType": "application/pdf",
      "size": 1048576,
      "folderId": "folder_456",
      "workspaceId": "workspace_789",
      "createdBy": "user_001",
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T14:20:00Z",
      "version": 3,
      "tags": ["report", "quarterly"],
      "metadata": {},
      "permissions": ["VIEW", "EDIT"],
      "status": "ACTIVE"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 250,
    "pages": 5
  }
}
```

### Create Document

```
POST /api/documents/docs
```

**Request Body:**
```json
{
  "name": "New Document.pdf",
  "type": "PDF",
  "folderId": "folder_456",
  "workspaceId": "workspace_789",
  "tags": ["new", "document"],
  "metadata": {
    "department": "Finance",
    "classification": "CONFIDENTIAL"
  },
  "content": "base64-encoded-content"
}
```

**Response (201):**
```json
{
  "document": {
    "id": "doc_124",
    "name": "New Document.pdf",
    "type": "PDF",
    "mimeType": "application/pdf",
    "size": 2097152,
    "folderId": "folder_456",
    "workspaceId": "workspace_789",
    "createdBy": "user_001",
    "createdAt": "2026-01-15T10:30:00Z",
    "version": 1,
    "status": "ACTIVE"
  }
}
```

### Get Document

```
GET /api/documents/docs/[id]
```

**Response (200):**
```json
{
  "document": {
    "id": "doc_123",
    "name": "Quarterly Report.pdf",
    "type": "PDF",
    "mimeType": "application/pdf",
    "size": 1048576,
    "folderId": "folder_456",
    "workspaceId": "workspace_789",
    "createdBy": "user_001",
    "createdAt": "2026-01-15T10:30:00Z",
    "updatedAt": "2026-01-15T14:20:00Z",
    "version": 3,
    "tags": ["report", "quarterly"],
    "metadata": {},
    "permissions": ["VIEW", "EDIT", "COMMENT", "ADMIN"],
    "status": "ACTIVE",
    "downloadUrl": "https://storage.example.com/doc_123.pdf",
    "previewUrl": "https://preview.example.com/doc_123"
  }
}
```

### Update Document

```
PUT /api/documents/docs/[id]
```

**Request Body:**
```json
{
  "name": "Updated Report.pdf",
  "tags": ["report", "quarterly", "updated"],
  "metadata": {
    "department": "Finance",
    "classification": "CONFIDENTIAL",
    "reviewStatus": "approved"
  }
}
```

**Response (200):**
```json
{
  "document": {
    "id": "doc_123",
    "name": "Updated Report.pdf",
    "updatedAt": "2026-01-15T15:00:00Z",
    "version": 4
  }
}
```

### Delete Document

```
DELETE /api/documents/docs/[id]
```

**Query Parameters:**
- `permanent` (boolean) - Permanent delete vs trash

**Response (200):**
```json
{
  "success": true,
  "message": "Document moved to trash"
}
```

### Upload Document

```
POST /api/documents/docs/[id]/upload
```

**Request Body:** `multipart/form-data`
- `file` (binary) - Document file
- `tags` (string[]) - Optional tags
- `metadata` (string) - JSON metadata string

**Response (200):**
```json
{
  "document": {
    "id": "doc_123",
    "name": "uploaded-file.pdf",
    "size": 1048576,
    "mimeType": "application/pdf",
    "version": 2
  },
  "processing": {
    "ocr": "pending",
    "thumbnail": "pending",
    "preview": "pending"
  }
}
```

### Download Document

```
GET /api/documents/docs/[id]/download
```

**Query Parameters:**
- `version` (number) - Specific version to download
- `watermark` (boolean) - Apply watermark

**Response:** Binary file download with appropriate Content-Type header

### Copy Document

```
POST /api/documents/docs/[id]/copy
```

**Request Body:**
```json
{
  "name": "Copy of Report.pdf",
  "folderId": "folder_789",
  "workspaceId": "workspace_789"
}
```

### Move Document

```
POST /api/documents/docs/[id]/move
```

**Request Body:**
```json
{
  "folderId": "folder_789"
}
```

### Rename Document

```
PUT /api/documents/docs/[id]/rename
```

**Request Body:**
```json
{
  "name": "New Document Name.pdf"
}
```

### Share Document

```
POST /api/documents/docs/[id]/share
```

**Request Body:**
```json
{
  "users": ["user_002", "user_003"],
  "groups": ["group_001"],
  "permission": "EDIT",
  "expiresAt": "2026-02-15T00:00:00Z",
  "message": "Please review this document"
}
```

### Revoke Document Access

```
DELETE /api/documents/docs/[id]/share
```

**Request Body:**
```json
{
  "users": ["user_002"],
  "groups": ["group_001"]
}
```

### Get Document Permissions

```
GET /api/documents/docs/[id]/permissions
```

**Response (200):**
```json
{
  "permissions": [
    {
      "id": "perm_001",
      "userId": "user_001",
      "level": "ADMIN",
      "grantedBy": "user_001",
      "grantedAt": "2026-01-15T10:30:00Z"
    },
    {
      "id": "perm_002",
      "userId": "user_002",
      "level": "EDIT",
      "grantedBy": "user_001",
      "grantedAt": "2026-01-15T11:00:00Z",
      "expiresAt": "2026-02-15T00:00:00Z"
    }
  ]
}
```

### Lock Document

```
POST /api/documents/docs/[id]/lock
```

**Response (200):**
```json
{
  "locked": true,
  "lockedBy": "user_001",
  "lockedAt": "2026-01-15T10:30:00Z"
}
```

### Unlock Document

```
POST /api/documents/docs/[id]/unlock
```

### Favorite Document

```
POST /api/documents/docs/[id]/favorite
```

### Unfavorite Document

```
DELETE /api/documents/docs/[id]/favorite
```

### Archive Document

```
POST /api/documents/docs/[id]/archive
```

### Restore Document

```
POST /api/documents/docs/[id]/restore
```

### Trash Document

```
POST /api/documents/docs/[id]/trash
```

### Recover Document

```
POST /api/documents/docs/[id]/recover
```

### Purge Document

```
DELETE /api/documents/docs/[id]/purge
```

---

## Folders

### List Folders

```
GET /api/documents/folders
```

**Query Parameters:**
- `parentId` (string) - Parent folder ID
- `workspaceId` (string) - Workspace ID

**Response (200):**
```json
{
  "folders": [
    {
      "id": "folder_001",
      "name": "Finance",
      "parentId": null,
      "workspaceId": "workspace_001",
      "documentCount": 25,
      "subfolderCount": 3,
      "createdBy": "user_001",
      "createdAt": "2026-01-10T08:00:00Z",
      "permissions": ["VIEW", "EDIT"]
    }
  ]
}
```

### Create Folder

```
POST /api/documents/folders
```

**Request Body:**
```json
{
  "name": "New Folder",
  "parentId": "folder_001",
  "workspaceId": "workspace_001",
  "description": "Folder for new documents"
}
```

### Get Folder

```
GET /api/documents/folders/[id]
```

### Update Folder

```
PUT /api/documents/folders/[id]
```

**Request Body:**
```json
{
  "name": "Updated Folder Name",
  "description": "Updated description"
}
```

### Delete Folder

```
DELETE /api/documents/folders/[id]
```

### Move Folder

```
POST /api/documents/folders/[id]/move
```

**Request Body:**
```json
{
  "parentId": "folder_002"
}
```

### Copy Folder

```
POST /api/documents/folders/[id]/copy
```

**Request Body:**
```json
{
  "name": "Copy of Folder",
  "parentId": "folder_003"
}
```

### Share Folder

```
POST /api/documents/folders/[id]/share
```

### Revoke Folder Access

```
DELETE /api/documents/folders/[id]/share
```

### List Folder Contents

```
GET /api/documents/folders/[id]/contents
```

**Response (200):**
```json
{
  "folders": [...],
  "documents": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 30
  }
}
```

### Get Folder Tree

```
GET /api/documents/folders/[id]/tree
```

**Response (200):**
```json
{
  "tree": {
    "id": "folder_001",
    "name": "Finance",
    "children": [
      {
        "id": "folder_002",
        "name": "Reports",
        "children": []
      }
    ]
  }
}
```

### Search Folder

```
GET /api/documents/folders/[id]/search
```

### Sort Folder Contents

```
GET /api/documents/folders/[id]/sort
```

### Filter Folder Contents

```
GET /api/documents/folders/[id]/filter
```

---

## Workspaces

### List Workspaces

```
GET /api/documents/workspaces
```

**Response (200):**
```json
{
  "workspaces": [
    {
      "id": "workspace_001",
      "name": "Finance Team",
      "description": "Finance department workspace",
      "memberCount": 10,
      "documentCount": 150,
      "storageUsed": 524288000,
      "storageQuota": 1073741824,
      "createdBy": "user_001",
      "createdAt": "2026-01-01T00:00:00Z",
      "role": "ADMIN"
    }
  ]
}
```

### Create Workspace

```
POST /api/documents/workspaces
```

**Request Body:**
```json
{
  "name": "New Workspace",
  "description": "Workspace for project",
  "members": ["user_001", "user_002"],
  "storageQuota": 1073741824
}
```

### Get Workspace

```
GET /api/documents/workspaces/[id]
```

### Update Workspace

```
PUT /api/documents/workspaces/[id]
```

**Request Body:**
```json
{
  "name": "Updated Workspace",
  "description": "Updated description",
  "storageQuota": 2147483648
}
```

### Delete Workspace

```
DELETE /api/documents/workspaces/[id]
```

### Add Workspace Member

```
POST /api/documents/workspaces/[id]/members
```

**Request Body:**
```json
{
  "userId": "user_003",
  "role": "MEMBER"
}
```

### Remove Workspace Member

```
DELETE /api/documents/workspaces/[id]/members/[memberId]
```

### Update Member Role

```
PUT /api/documents/workspaces/[id]/members/[memberId]
```

**Request Body:**
```json
{
  "role": "ADMIN"
}
```

### List Workspace Members

```
GET /api/documents/workspaces/[id]/members
```

### Share Workspace

```
POST /api/documents/workspaces/[id]/share
```

### Get Workspace Settings

```
GET /api/documents/workspaces/[id]/settings
```

### Update Workspace Settings

```
PUT /api/documents/workspaces/[id]/settings
```

### Get Workspace Statistics

```
GET /api/documents/workspaces/[id]/statistics
```

---

## Permissions

### List Document Permissions

```
GET /api/documents/permissions
```

**Query Parameters:**
- `documentId` (string) - Document ID
- `folderId` (string) - Folder ID
- `workspaceId` (string) - Workspace ID

### Grant Permission

```
POST /api/documents/permissions
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "userId": "user_002",
  "level": "EDIT",
  "expiresAt": "2026-02-15T00:00:00Z"
}
```

### Update Permission

```
PUT /api/documents/permissions/[id]
```

### Revoke Permission

```
DELETE /api/documents/permissions/[id]
```

### Bulk Grant Permissions

```
POST /api/documents/permissions/bulk
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"],
  "userIds": ["user_002", "user_003"],
  "level": "VIEW"
}
```

### Bulk Revoke Permissions

```
DELETE /api/documents/permissions/bulk
```

### Get Permission Inheritance

```
GET /api/documents/permissions/inheritance/[id]
```

### Get Share Link Permissions

```
GET /api/documents/permissions/links/[id]
```

### Create Share Link

```
POST /api/documents/permissions/links
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "permission": "VIEW",
  "expiresAt": "2026-02-15T00:00:00Z",
  "maxAccess": 10,
  "password": "optional-password"
}
```

### Delete Share Link

```
DELETE /api/documents/permissions/links/[id]
```

### Validate Share Link

```
POST /api/documents/permissions/links/validate
```

### Get Permission Audit Log

```
GET /api/documents/permissions/audit/[id]
```

---

## Versions

### List Versions

```
GET /api/documents/versions
```

**Query Parameters:**
- `documentId` (string) - Document ID

**Response (200):**
```json
{
  "versions": [
    {
      "id": "ver_001",
      "documentId": "doc_123",
      "version": 3,
      "createdBy": "user_001",
      "createdAt": "2026-01-15T14:20:00Z",
      "size": 1048576,
      "comment": "Updated quarterly figures",
      "changes": {
        "additions": 25,
        "deletions": 10,
        "modifications": 5
      }
    }
  ]
}
```

### Get Version

```
GET /api/documents/versions/[id]
```

### Compare Versions

```
GET /api/documents/versions/compare
```

**Query Parameters:**
- `from` (string) - From version ID
- `to` (string) - To version ID

### Revert to Version

```
POST /api/documents/versions/[id]/revert
```

### Download Version

```
GET /api/documents/versions/[id]/download
```

### Restore Version

```
POST /api/documents/versions/[id]/restore
```

### Lock Version

```
POST /api/documents/versions/[id]/lock
```

### Unlock Version

```
POST /api/documents/versions/[id]/unlock
```

### Get Version Diff

```
GET /api/documents/versions/[id]/diff
```

### Create Version

```
POST /api/documents/versions
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "content": "base64-encoded-content",
  "comment": "Updated content"
}
```

---

## Comments

### List Comments

```
GET /api/documents/comments
```

**Query Parameters:**
- `documentId` (string) - Document ID
- `resolved` (boolean) - Filter by resolution status

**Response (200):**
```json
{
  "comments": [
    {
      "id": "comment_001",
      "documentId": "doc_123",
      "content": "This section needs review",
      "author": {
        "id": "user_001",
        "name": "John Doe",
        "avatar": "https://avatar.example.com/user_001.jpg"
      },
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T10:30:00Z",
      "resolved": false,
      "mentions": ["user_002"],
      "replies": []
    }
  ]
}
```

### Add Comment

```
POST /api/documents/comments
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "content": "Please review this section @user_002",
  "mentions": ["user_002"],
  "parentId": null
}
```

### Update Comment

```
PUT /api/documents/comments/[id]
```

### Delete Comment

```
DELETE /api/documents/comments/[id]
```

### Resolve Comment

```
POST /api/documents/comments/[id]/resolve
```

### Reopen Comment

```
POST /api/documents/comments/[id]/reopen
```

### Like Comment

```
POST /api/documents/comments/[id]/like
```

### Unlike Comment

```
DELETE /api/documents/comments/[id]/like
```

### Add Comment Attachment

```
POST /api/documents/comments/[id]/attachments
```

### Delete Comment Attachment

```
DELETE /api/documents/comments/[id]/attachments/[attachmentId]
```

### Get Comment Thread

```
GET /api/documents/comments/[id]/thread
```

### Bulk Resolve Comments

```
POST /api/documents/comments/bulk/resolve
```

---

## Tags

### List Tags

```
GET /api/documents/tags
```

**Response (200):**
```json
{
  "tags": [
    {
      "id": "tag_001",
      "name": "Finance",
      "color": "#3B82F6",
      "documentCount": 25,
      "createdAt": "2026-01-10T08:00:00Z"
    }
  ]
}
```

### Create Tag

```
POST /api/documents/tags
```

**Request Body:**
```json
{
  "name": "New Tag",
  "color": "#10B981"
}
```

### Update Tag

```
PUT /api/documents/tags/[id]
```

### Delete Tag

```
DELETE /api/documents/tags/[id]
```

### Assign Tag

```
POST /api/documents/tags/[id]/assign
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"]
}
```

### Remove Tag

```
DELETE /api/documents/tags/[id]/assign
```

**Request Body:**
```json
{
  "documentIds": ["doc_123"]
}
```

### Bulk Assign Tags

```
POST /api/documents/tags/bulk/assign
```

### Get Tag Suggestions

```
GET /api/documents/tags/suggestions
```

### Get Popular Tags

```
GET /api/documents/tags/popular
```

### Get Tags by Document

```
GET /api/documents/tags/document/[documentId]
```

---

## Activities

### List Activities

```
GET /api/documents/activities
```

**Query Parameters:**
- `documentId` (string) - Filter by document
- `folderId` (string) - Filter by folder
- `userId` (string) - Filter by user
- `action` (string) - Filter by action type

**Response (200):**
```json
{
  "activities": [
    {
      "id": "activity_001",
      "documentId": "doc_123",
      "userId": "user_001",
      "action": "UPDATED",
      "details": {
        "field": "content",
        "previousValue": null,
        "newValue": "Updated content"
      },
      "createdAt": "2026-01-15T14:20:00Z"
    }
  ]
}
```

### Get Activity

```
GET /api/documents/activities/[id]
```

### Get Document Activity

```
GET /api/documents/activities/document/[documentId]
```

### Get User Activity

```
GET /api/documents/activities/user/[userId]
```

### Get Activity Timeline

```
GET /api/documents/activities/timeline
```

### Export Activities

```
POST /api/documents/activities/export
```

---

## Search

### Global Search

```
GET /api/documents/search
```

**Query Parameters:**
- `q` (string) - Search query
- `type` (string) - Filter by document type
- `tags` (string[]) - Filter by tags
- `folderId` (string) - Filter by folder
- `workspaceId` (string) - Filter by workspace
- `createdBy` (string) - Filter by creator
- `dateFrom` (string) - Filter by date range
- `dateTo` (string) - Filter by date range

**Response (200):**
```json
{
  "results": [
    {
      "id": "doc_123",
      "name": "Quarterly Report.pdf",
      "type": "PDF",
      "relevance": 0.95,
      "highlights": {
        "content": "The <mark>quarterly</mark> report shows..."
      },
      "snippet": "The quarterly report shows significant growth..."
    }
  ],
  "facets": {
    "types": [
      { "value": "PDF", "count": 15 },
      { "value": "DOCX", "count": 8 }
    ],
    "tags": [
      { "value": "report", "count": 10 }
    ]
  },
  "total": 23
}
```

### Advanced Search

```
GET /api/documents/search/advanced
```

### Full-Text Search

```
GET /api/documents/search/fulltext
```

### Metadata Search

```
GET /api/documents/search/metadata
```

### Tag Search

```
GET /api/documents/search/tags
```

### Saved Search

```
POST /api/documents/search/saved
```

### Get Saved Searches

```
GET /api/documents/search/saved
```

### Get Search Suggestions

```
GET /api/documents/search/suggestions
```

---

## Archive

### List Archived Documents

```
GET /api/documents/archive
```

### Archive Document

```
POST /api/documents/archive
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"],
  "reason": "Long-term storage",
  "retentionYears": 7
}
```

### Restore from Archive

```
POST /api/documents/archive/restore
```

### Search Archive

```
GET /api/documents/archive/search
```

### Export Archive

```
POST /api/documents/archive/export
```

### Get Archive Statistics

```
GET /api/documents/archive/statistics
```

### Get Archive Policies

```
GET /api/documents/archive/policies
```

### Create Archive Policy

```
POST /api/documents/archive/policies
```

---

## Backup

### List Backups

```
GET /api/documents/backup
```

### Create Backup

```
POST /api/documents/backup
```

**Request Body:**
```json
{
  "name": "Weekly Backup",
  "description": "Backup of all documents",
  "includeVersions": true,
  "includeComments": true
}
```

### Get Backup

```
GET /api/documents/backup/[id]
```

### Restore from Backup

```
POST /api/documents/backup/[id]/restore
```

### Download Backup

```
GET /api/documents/backup/[id]/download
```

### Delete Backup

```
DELETE /api/documents/backup/[id]
```

### Schedule Backup

```
POST /api/documents/backup/schedule
```

**Request Body:**
```json
{
  "name": "Daily Backup",
  "frequency": "daily",
  "time": "02:00",
  "retentionDays": 30
}
```

### Get Backup Schedule

```
GET /api/documents/backup/schedule
```

### Update Backup Schedule

```
PUT /api/documents/backup/schedule/[id]
```

### Cancel Backup

```
POST /api/documents/backup/[id]/cancel
```

---

## Restore

### List Restore Points

```
GET /api/documents/restore
```

### Create Restore Point

```
POST /api/documents/restore
```

### Restore Document

```
POST /api/documents/restore/document/[id]
```

### Restore Folder

```
POST /api/documents/restore/folder/[id]
```

### Restore to Point-in-Time

```
POST /api/documents/restore/point-in-time
```

**Request Body:**
```json
{
  "timestamp": "2026-01-15T10:00:00Z",
  "scope": "folder",
  "targetId": "folder_001"
}
```

### Preview Restore

```
GET /api/documents/restore/preview/[id]
```

---

## Trash

### List Trashed Documents

```
GET /api/documents/trash
```

### Move to Trash

```
POST /api/documents/trash
```

### Restore from Trash

```
POST /api/documents/trash/restore
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"]
}
```

### Empty Trash

```
DELETE /api/documents/trash
```

### Get Trash Statistics

```
GET /api/documents/trash/statistics
```

### Auto-Purge Settings

```
GET /api/documents/trash/auto-purge
```

### Update Auto-Purge Settings

```
PUT /api/documents/trash/auto-purge
```

### Get Trash Retention Policy

```
GET /api/documents/trash/retention
```

---

## Watermark

### List Watermarks

```
GET /api/documents/watermark
```

### Add Watermark

```
POST /api/documents/watermark
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"],
  "type": "TEXT",
  "text": "CONFIDENTIAL",
  "opacity": 0.3,
  "rotation": 45,
  "fontSize": 12,
  "color": "#888888"
}
```

### Remove Watermark

```
DELETE /api/documents/watermark/[id]
```

### Preview Watermark

```
POST /api/documents/watermark/preview
```

### Get Watermark Settings

```
GET /api/documents/watermark/settings
```

### Update Watermark Settings

```
PUT /api/documents/watermark/settings
```

---

## Templates

### List Templates

```
GET /api/documents/templates
```

### Create Template

```
POST /api/documents/templates
```

**Request Body:**
```json
{
  "name": "Invoice Template",
  "description": "Standard invoice template",
  "category": "Finance",
  "content": "base64-template-content",
  "variables": [
    { "name": "invoiceNumber", "type": "text" },
    { "name": "totalAmount", "type": "number" }
  ]
}
```

### Get Template

```
GET /api/documents/templates/[id]
```

### Update Template

```
PUT /api/documents/templates/[id]
```

### Delete Template

```
DELETE /api/documents/templates/[id]
```

### Use Template

```
POST /api/documents/templates/[id]/use
```

**Request Body:**
```json
{
  "variables": {
    "invoiceNumber": "INV-001",
    "totalAmount": 1500.00
  },
  "name": "Invoice INV-001",
  "folderId": "folder_001"
}
```

### Preview Template

```
GET /api/documents/templates/[id]/preview
```

### Share Template

```
POST /api/documents/templates/[id]/share
```

### Get Template Categories

```
GET /api/documents/templates/categories
```

### Create Template Category

```
POST /api/documents/templates/categories
```

---

## Merge

### Merge Documents

```
POST /api/documents/merge
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124", "doc_125"],
  "name": "Merged Document.pdf",
  "folderId": "folder_001",
  "order": ["doc_123", "doc_124", "doc_125"]
}
```

### Get Merge Preview

```
POST /api/documents/merge/preview
```

### Get Merge History

```
GET /api/documents/merge/history
```

### Cancel Merge

```
POST /api/documents/merge/[id]/cancel
```

---

## Compression

### Compress Document

```
POST /api/documents/compression
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "level": "medium"
}
```

### Decompress Document

```
POST /api/documents/compression/decompress
```

### Get Compression Settings

```
GET /api/documents/compression/settings
```

### Update Compression Settings

```
PUT /api/documents/compression/settings
```

---

## Conversion

### Convert Document

```
POST /api/documents/conversion
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "targetFormat": "PDF",
  "options": {
    "quality": "high",
    "preserveFormatting": true
  }
}
```

### Get Supported Conversions

```
GET /api/documents/conversion/formats
```

### Get Conversion History

```
GET /api/documents/conversion/history
```

### Cancel Conversion

```
POST /api/documents/conversion/[id]/cancel
```

### Get Conversion Status

```
GET /api/documents/conversion/[id]/status
```

### Batch Convert

```
POST /api/documents/conversion/batch
```

---

## OCR

### Extract Text

```
POST /api/documents/ocr/extract
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "language": "eng",
  "options": {
    "enhanceContrast": true,
    "deskew": true
  }
}
```

### Extract Fields

```
POST /api/documents/ocr/fields
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "templateId": "ocr_template_001",
  "fields": ["invoiceNumber", "totalAmount", "date"]
}
```

### Validate OCR

```
POST /api/documents/ocr/validate
```

### Correct OCR

```
POST /api/documents/ocr/correct
```

### Batch OCR

```
POST /api/documents/ocr/batch
```

### Template OCR

```
POST /api/documents/ocr/template
```

### Get OCR Status

```
GET /api/documents/ocr/[id]/status
```

### Get Supported Languages

```
GET /api/documents/ocr/languages
```

---

## Signatures

### Request Signature

```
POST /api/documents/signatures/request
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "signers": [
    {
      "userId": "user_002",
      "role": "APPROVER",
      "order": 1
    }
  ],
  "message": "Please sign the contract",
  "expiresAt": "2026-02-15T00:00:00Z"
}
```

### Sign Document

```
POST /api/documents/signatures/sign
```

**Request Body:**
```json
{
  "signatureId": "sig_001",
  "signature": "base64-signature-image",
  "certificate": "certificate-data",
  "pin": "1234"
}
```

### Verify Signature

```
GET /api/documents/signatures/verify/[id]
```

### Revoke Signature

```
POST /api/documents/signatures/[id]/revoke
```

**Request Body:**
```json
{
  "reason": "Document needs corrections"
}
```

### Get Certificate

```
GET /api/documents/signatures/certificate/[id]
```

### Bulk Sign

```
POST /api/documents/signatures/bulk
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"],
  "signature": "base64-signature-image"
}
```

### Get Signature Status

```
GET /api/documents/signatures/[id]/status
```

### Get Signature History

```
GET /api/documents/signatures/history/[documentId]
```

### Send Reminder

```
POST /api/documents/signatures/[id]/remind
```

### Get Pending Signatures

```
GET /api/documents/signatures/pending
```

---

## Approvals

### Submit for Approval

```
POST /api/documents/approvals/submit
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "workflowId": "workflow_001",
  "message": "Please review and approve",
  "dueDate": "2026-01-20T00:00:00Z"
}
```

### Approve Document

```
POST /api/documents/approvals/[id]/approve
```

**Request Body:**
```json
{
  "comment": "Looks good",
  "signature": "base64-signature"
}
```

### Reject Document

```
POST /api/documents/approvals/[id]/reject
```

**Request Body:**
```json
{
  "reason": "Missing required sections",
  "comment": "Please add the financial summary"
}
```

### Request Changes

```
POST /api/documents/approvals/[id]/changes
```

### Delegate Approval

```
POST /api/documents/approvals/[id]/delegate
```

**Request Body:**
```json
{
  "userId": "user_003",
  "reason": "Out of office"
}
```

### Escalate Approval

```
POST /api/documents/approvals/[id]/escalate
```

### Recall Approval

```
POST /api/documents/approvals/[id]/recall
```

### Get Pending Approvals

```
GET /api/documents/approvals/pending
```

---

## Workflows

### List Workflows

```
GET /api/documents/workflows
```

### Create Workflow

```
POST /api/documents/workflows
```

**Request Body:**
```json
{
  "name": "Document Review",
  "description": "Standard document review workflow",
  "steps": [
    {
      "name": "Teacher Review",
      "assigneeRole": "TEACHER",
      "action": "APPROVE",
      "required": true
    },
    {
      "name": "Admin Approval",
      "assigneeRole": "ADMIN",
      "action": "APPROVE",
      "required": true
    }
  ],
  "conditions": [
    {
      "step": "Teacher Review",
      "nextStep": "Admin Approval",
      "condition": "APPROVED"
    }
  ]
}
```

### Get Workflow

```
GET /api/documents/workflows/[id]
```

### Update Workflow

```
PUT /api/documents/workflows/[id]
```

### Delete Workflow

```
DELETE /api/documents/workflows/[id]
```

### Start Workflow

```
POST /api/documents/workflows/[id]/start
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "initiatorId": "user_001",
  "data": {}
}
```

### Transition Workflow

```
POST /api/documents/workflows/transition
```

**Request Body:**
```json
{
  "instanceId": "instance_001",
  "action": "APPROVE",
  "comment": "Approved with minor changes"
}
```

### Complete Workflow

```
POST /api/documents/workflows/[id]/complete
```

### Cancel Workflow

```
POST /api/documents/workflows/[id]/cancel
```

### Get Workflow History

```
GET /api/documents/workflows/[id]/history
```

### Get Workflow Instances

```
GET /api/documents/workflows/instances
```

### Get Workflow Templates

```
GET /api/documents/workflows/templates
```

### Create Workflow Template

```
POST /api/documents/workflows/templates
```

---

## Export

### Export Documents

```
POST /api/documents/export
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"],
  "format": "ZIP",
  "includeVersions": true,
  "includeComments": true,
  "includeMetadata": true
}
```

### Get Export Status

```
GET /api/documents/export/[jobId]/status
```

### Download Export

```
GET /api/documents/export/[jobId]/download
```

### Cancel Export

```
POST /api/documents/export/[jobId]/cancel
```

### Get Export History

```
GET /api/documents/export/history
```

### Export Folder

```
POST /api/documents/export/folder/[folderId]
```

---

## Retention

### List Retention Policies

```
GET /api/documents/retention
```

### Create Retention Policy

```
POST /api/documents/retention
```

**Request Body:**
```json
{
  "name": "Financial Documents",
  "documentTypes": ["INVOICE", "RECEIPT"],
  "retentionDays": 2555,
  "action": "ARCHIVE",
  "legalHoldEnabled": true
}
```

### Update Retention Policy

```
PUT /api/documents/retention/[id]
```

### Delete Retention Policy

```
DELETE /api/documents/retention/[id]
```

### Apply Legal Hold

```
POST /api/documents/retention/hold
```

### Release Legal Hold

```
POST /api/documents/retention/hold/[id]/release
```

### Get Legal Holds

```
GET /api/documents/retention/holds
```

### Get Retention Statistics

```
GET /api/documents/retention/statistics
```

---

## WebDAV

### List WebDAV Resources

```
GET /api/documents/webdav/[path]
```

### Create WebDAV Resource

```
PUT /api/documents/webdav/[path]
```

### Delete WebDAV Resource

```
DELETE /api/documents/webdav/[path]
```

### Copy WebDAV Resource

```
COPY /api/documents/webdav/[path]
```

### Move WebDAV Resource

```
MOVE /api/documents/webdav/[path]
```

### Get WebDAV Properties

```
PROPFIND /api/documents/webdav/[path]
```

### Lock WebDAV Resource

```
LOCK /api/documents/webdav/[path]
```

### Unlock WebDAV Resource

```
UNLOCK /api/documents/webdav/[path]
```

---

## Storage

### List Storage Providers

```
GET /api/documents/storage
```

### Get Storage Statistics

```
GET /api/documents/storage/statistics
```

### Get Storage Quota

```
GET /api/documents/storage/quota
```

### Update Storage Settings

```
PUT /api/documents/storage/settings
```

### Get Storage Usage

```
GET /api/documents/storage/usage
```

### Get Storage Health

```
GET /api/documents/storage/health
```

---

## AI

### Classify Document

```
POST /api/documents/ai/classify
```

**Request Body:**
```json
{
  "documentId": "doc_123"
}
```

### Auto-Tag Document

```
POST /api/documents/ai/auto-tag
```

### Summarize Document

```
POST /api/documents/ai/summarize
```

### Extract Information

```
POST /api/documents/ai/extract
```

### Find Similar Documents

```
POST /api/documents/ai/similar
```

### AI Search

```
POST /api/documents/ai/search
```

### Get AI Settings

```
GET /api/documents/ai/settings
```

### Update AI Settings

```
PUT /api/documents/ai/settings
```

---

## Forms

### List Forms

```
GET /api/documents/forms
```

### Create Form

```
POST /api/documents/forms
```

### Get Form

```
GET /api/documents/forms/[id]
```

### Update Form

```
PUT /api/documents/forms/[id]
```

### Delete Form

```
DELETE /api/documents/forms/[id]
```

### Submit Form

```
POST /api/documents/forms/[id]/submit
```

### Get Form Responses

```
GET /api/documents/forms/[id]/responses
```

### Export Form Responses

```
POST /api/documents/forms/[id]/export
```

---

## Offline

### Sync Documents

```
POST /api/documents/offline/sync
```

### Queue Offline Changes

```
POST /api/documents/offline/queue
```

### Resolve Conflicts

```
POST /api/documents/offline/resolve
```

### Get Sync Status

```
GET /api/documents/offline/status
```

---

## Encryption

### Encrypt Document

```
POST /api/documents/encryption/encrypt
```

### Decrypt Document

```
POST /api/documents/encryption/decrypt
```

### Generate Encryption Key

```
POST /api/documents/encryption/key
```

### Rotate Encryption Key

```
POST /api/documents/encryption/rotate
```

### Get Encryption Status

```
GET /api/documents/encryption/[documentId]/status
```

### Get Encryption Keys

```
GET /api/documents/encryption/keys
```

---

## Compliance

### Get Compliance Status

```
GET /api/documents/compliance/status
```

### Run Compliance Check

```
POST /api/documents/compliance/check
```

### Get Compliance Report

```
GET /api/documents/compliance/report
```

### Get Audit Log

```
GET /api/documents/compliance/audit
```

### Export Audit Log

```
POST /api/documents/compliance/audit/export
```

### Get Compliance Policies

```
GET /api/documents/compliance/policies
```

---

## Notifications

### Get Document Notifications

```
GET /api/documents/notifications
```

### Mark Notification Read

```
POST /api/documents/notifications/[id]/read
```

### Mark All Read

```
POST /api/documents/notifications/read-all
```

### Get Notification Settings

```
GET /api/documents/notifications/settings
```

### Update Notification Settings

```
PUT /api/documents/notifications/settings
```

### Get Notification Preferences

```
GET /api/documents/notifications/preferences
```

---

## Analytics

### Get Document Analytics

```
GET /api/documents/analytics
```

### Get Usage Statistics

```
GET /api/documents/analytics/usage
```

### Get Storage Analytics

```
GET /api/documents/analytics/storage
```

### Get User Analytics

```
GET /api/documents/analytics/users
```

### Get Activity Analytics

```
GET /api/documents/analytics/activity
```

### Export Analytics

```
POST /api/documents/analytics/export
```

---

## Batch

### Start Batch Operation

```
POST /api/documents/batch
```

**Request Body:**
```json
{
  "operation": "MOVE",
  "documentIds": ["doc_123", "doc_124", "doc_125"],
  "parameters": {
    "folderId": "folder_001"
  }
}
```

### Get Batch Status

```
GET /api/documents/batch/[id]/status
```

### Cancel Batch Operation

```
POST /api/documents/batch/[id]/cancel
```

### Get Batch History

```
GET /api/documents/batch/history
```

---

## Thumbnails

### Get Document Thumbnail

```
GET /api/documents/thumbnails/[documentId]
```

### Generate Thumbnail

```
POST /api/documents/thumbnails/generate
```

### Get Thumbnail Settings

```
GET /api/documents/thumbnails/settings
```

### Update Thumbnail Settings

```
PUT /api/documents/thumbnails/settings
```

---

## Metadata

### Get Document Metadata

```
GET /api/documents/metadata/[documentId]
```

### Update Metadata

```
PUT /api/documents/metadata/[documentId]
```

### Get Metadata Schema

```
GET /api/documents/metadata/schema
```

### Create Metadata Schema

```
POST /api/documents/metadata/schema
```

### Update Metadata Schema

```
PUT /api/documents/metadata/schema/[id]
```

### Delete Metadata Schema

```
DELETE /api/documents/metadata/schema/[id]
```

### Bulk Update Metadata

```
POST /api/documents/metadata/bulk
```

### Get Metadata Statistics

```
GET /api/documents/metadata/statistics
```

---

## Checkout

### Checkout Document

```
POST /api/documents/checkout/[documentId]
```

### Checkin Document

```
POST /api/documents/checkout/[documentId]/checkin
```

**Request Body:**
```json
{
  "comment": "Updated content",
  "version": "minor"
}
```

### Get Checkout Status

```
GET /api/documents/checkout/[documentId]/status
```

### Force Checkin

```
POST /api/documents/checkout/[documentId]/force
```

### Get Checked Out Documents

```
GET /api/documents/checkout/my
```

### Get Checkout History

```
GET /api/documents/checkout/[documentId]/history
```

---

## Favorites

### List Favorites

```
GET /api/documents/favorites
```

### Add to Favorites

```
POST /api/documents/favorites/[documentId]
```

### Remove from Favorites

```
DELETE /api/documents/favorites/[documentId]
```

### Reorder Favorites

```
PUT /api/documents/favorites/reorder
```

---

## Recent

### Get Recent Documents

```
GET /api/documents/recent
```

**Query Parameters:**
- `limit` (number) - Number of documents (default: 10)
- `days` (number) - Time range in days (default: 30)

### Clear Recent

```
DELETE /api/documents/recent
```

---

## Preview

### Get Preview

```
GET /api/documents/preview/[documentId]
```

### Get Preview Status

```
GET /api/documents/preview/[documentId]/status
```

### Generate Preview

```
POST /api/documents/preview/[documentId]/generate
```

---

## Download

### Secure Download

```
GET /api/documents/download/[documentId]
```

### Batch Download

```
POST /api/documents/download/batch
```

**Request Body:**
```json
{
  "documentIds": ["doc_123", "doc_124"],
  "format": "ZIP"
}
```

### Get Download History

```
GET /api/documents/download/history
```

### Get Download Statistics

```
GET /api/documents/download/statistics
```

---

## Print

### Get Print Version

```
GET /api/documents/print/[documentId]
```

### Print Document

```
POST /api/documents/print/[documentId]
```

**Request Body:**
```json
{
  "watermark": true,
  "pageRange": "1-5",
  "copies": 1
}
```

### Get Print History

```
GET /api/documents/print/history
```

### Get Print Settings

```
GET /api/documents/print/settings
```

---

## Viewing

### Start Viewing Session

```
POST /api/documents/viewing/[documentId]
```

### Join Viewing Session

```
POST /api/documents/viewing/[sessionId]/join
```

### Leave Viewing Session

```
POST /api/documents/viewing/[sessionId]/leave
```

### End Viewing Session

```
POST /api/documents/viewing/[sessionId]/end
```

### Get Viewing Participants

```
GET /api/documents/viewing/[sessionId]/participants
```

### Get Active Viewing Sessions

```
GET /api/documents/viewing/active
```

---

## Expiring

### Set Document Expiration

```
POST /api/documents/expiring/[documentId]
```

**Request Body:**
```json
{
  "expiresAt": "2026-02-15T00:00:00Z",
  "notifyBefore": 7,
  "action": "REVOKE_ACCESS"
}
```

### Get Expiring Documents

```
GET /api/documents/expiring
```

### Extend Expiration

```
POST /api/documents/expiring/[documentId]/extend
```

### Remove Expiration

```
DELETE /api/documents/expiring/[documentId]
```

---

## Reviews

### Start Review

```
POST /api/documents/reviews
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "reviewers": ["user_002", "user_003"],
  "dueDate": "2026-01-20T00:00:00Z",
  "instructions": "Please review the changes"
}
```

### Submit Review

```
POST /api/documents/reviews/[id]/submit
```

**Request Body:**
```json
{
  "status": "APPROVED",
  "comments": "Looks good",
  "score": 4
}
```

### Get Pending Reviews

```
GET /api/documents/reviews/pending
```

### Get Review History

```
GET /api/documents/reviews/history/[documentId]
```

### Cancel Review

```
POST /api/documents/reviews/[id]/cancel
```

### Send Review Reminder

```
POST /api/documents/reviews/[id]/remind
```

---

## Delegation

### Delegate Approval

```
POST /api/documents/delegation
```

**Request Body:**
```json
{
  "approvalId": "approval_001",
  "delegateTo": "user_003",
  "reason": "Out of office",
  "expiresAt": "2026-01-20T00:00:00Z"
}
```

### Get Delegations

```
GET /api/documents/delegation
```

### Revoke Delegation

```
DELETE /api/documents/delegation/[id]
```

### Get Delegation History

```
GET /api/documents/delegation/history
```

---

## Chain of Custody

### Get Chain of Custody

```
GET /api/documents/chain/[documentId]
```

### Add Custody Record

```
POST /api/documents/chain/[documentId]
```

### Get Custody Report

```
GET /api/documents/chain/[documentId]/report
```

### Export Custody Log

```
POST /api/documents/chain/[documentId]/export
```

---

## Forensic

### Get Forensic Report

```
GET /api/documents/forensic/[documentId]
```

### Generate Forensic Image

```
POST /api/documents/forensic/[documentId]/image
```

### Get Integrity Hash

```
GET /api/documents/forensic/[documentId]/hash
```

### Verify Integrity

```
POST /api/documents/forensic/[documentId]/verify
```

---

## Timestamps

### Get Timestamp

```
GET /api/documents/timestamps/[documentId]
```

### Create Timestamp

```
POST /api/documents/timestamps
```

### Verify Timestamp

```
POST /api/documents/timestamps/[id]/verify
```

### Get Timestamp Certificate

```
GET /api/documents/timestamps/[id]/certificate
```

---

## DRM

### Apply DRM Protection

```
POST /api/documents/drm
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "permissions": {
    "print": true,
    "copy": false,
    "download": true,
    "expiresAt": "2026-02-15T00:00:00Z"
  }
}
```

### Remove DRM Protection

```
DELETE /api/documents/drm/[documentId]
```

### Get DRM Status

```
GET /api/documents/drm/[documentId]/status
```

### Update DRM Permissions

```
PUT /api/documents/drm/[documentId]/permissions
```

---

## Redaction

### Apply Redaction

```
POST /api/documents/redaction
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "redactions": [
    {
      "page": 1,
      "x": 100,
      "y": 200,
      "width": 150,
      "height": 20,
      "reason": "PII"
    }
  ]
}
```

### Preview Redaction

```
POST /api/documents/redaction/preview
```

### Get Redaction History

```
GET /api/documents/redaction/history/[documentId]
```

### Apply Redaction Template

```
POST /api/documents/redaction/template
```

---

## Annotations

### List Annotations

```
GET /api/documents/annotations/[documentId]
```

### Create Annotation

```
POST /api/documents/annotations
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "page": 1,
  "x": 100,
  "y": 200,
  "width": 150,
  "height": 50,
  "type": "HIGHLIGHT",
  "color": "#FFFF00",
  "content": "Important section"
}
```

### Update Annotation

```
PUT /api/documents/annotations/[id]
```

### Delete Annotation

```
DELETE /api/documents/annotations/[id]
```

### Get Annotation Comments

```
GET /api/documents/annotations/[id]/comments
```

### Add Annotation Comment

```
POST /api/documents/annotations/[id]/comments
```

---

## Highlights

### List Highlights

```
GET /api/documents/highlights/[documentId]
```

### Create Highlight

```
POST /api/documents/highlights
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "page": 1,
  "startX": 100,
  "startY": 200,
  "endX": 300,
  "endY": 220,
  "color": "#FFFF00",
  "note": "Key information"
}
```

### Update Highlight

```
PUT /api/documents/highlights/[id]
```

### Delete Highlight

```
DELETE /api/documents/highlights/[id]
```

---

## Signature Fields

### List Signature Fields

```
GET /api/documents/signature-fields/[documentId]
```

### Add Signature Field

```
POST /api/documents/signature-fields
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "page": 1,
  "x": 100,
  "y": 500,
  "width": 200,
  "height": 50,
  "required": true,
  "signerEmail": "signer@example.com"
}
```

### Update Signature Field

```
PUT /api/documents/signature-fields/[id]
```

### Delete Signature Field

```
DELETE /api/documents/signature-fields/[id]
```

---

## Form Fields

### List Form Fields

```
GET /api/documents/form-fields/[documentId]
```

### Add Form Field

```
POST /api/documents/form-fields
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "page": 1,
  "x": 100,
  "y": 200,
  "width": 150,
  "height": 25,
  "type": "TEXT",
  "name": "fullName",
  "label": "Full Name",
  "required": true,
  "defaultValue": ""
}
```

### Update Form Field

```
PUT /api/documents/form-fields/[id]
```

### Delete Form Field

```
DELETE /api/documents/form-fields/[id]
```

---

## Custom Fields

### List Custom Fields

```
GET /api/documents/custom-fields
```

### Create Custom Field

```
POST /api/documents/custom-fields
```

**Request Body:**
```json
{
  "name": "Department",
  "type": "SELECT",
  "options": ["Finance", "HR", "IT", "Marketing"],
  "required": false,
  "defaultValue": "Finance"
}
```

### Update Custom Field

```
PUT /api/documents/custom-fields/[id]
```

### Delete Custom Field

```
DELETE /api/documents/custom-fields/[id]
```

### Assign Custom Field Value

```
POST /api/documents/custom-fields/[id]/assign
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "value": "Finance"
}
```

---

## Branding

### Get Branding Settings

```
GET /api/documents/branding
```

### Update Branding Settings

```
PUT /api/documents/branding
```

**Request Body:**
```json
{
  "logo": "base64-logo",
  "primaryColor": "#1E40AF",
  "watermarkText": "ACME SCHOOL",
  "footerText": "Confidential"
}
```

### Get Branding Preview

```
GET /api/documents/branding/preview
```

### Reset Branding

```
POST /api/documents/branding/reset
```
