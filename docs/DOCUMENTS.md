# Document Management & Digital Workflow Module

## Overview

The Document Management & Digital Workflow Module is the enterprise-grade document lifecycle and workflow automation layer of EduCI. It provides comprehensive document CRUD, folder/workspace organization, permission management, version control, comments, tags, activities, search, archive/backup/restore, trash management, watermarking, templates, merge/split, compression, format conversion, OCR, digital signatures, approvals, workflows, export/import, retention policies, WebDAV integration, cloud storage, AI classification, form management, offline support, encryption, compliance, notifications, analytics, batch processing, thumbnails, metadata, checkout/lock, favorites, recent files, preview, download, print, viewing, expiring documents, reviews, delegation, chain-of-custody, forensic analysis, timestamps, DRM protection, redaction, annotations, highlights, signature fields, form fields, custom fields, and institutional branding across all organizational domains.

### Core Capabilities

- **Document CRUD** — Create, read, update, delete with soft-delete and recovery
- **Folders** — Hierarchical folder organization with nested structures
- **Workspaces** — Collaborative workspaces with team-based access
- **Permissions** — Granular RBAC with document, folder, and workspace levels
- **Versions** — Full version history with diff tracking and rollback
- **Comments** — Threaded comments with mentions and annotations
- **Tags** — Flexible tagging system with auto-suggestions
- **Activities** — Complete activity audit trail for all document operations
- **Search** — Full-text search with advanced filters and facets
- **Archive** — Long-term archival with compliance-grade storage
- **Backup** — Automated backup with point-in-time recovery
- **Restore** — Document and folder restore from any point in time
- **Trash** — Soft-delete with configurable retention and auto-purge
- **Watermark** — Dynamic watermarking with user-specific identifiers
- **Templates** — Reusable document templates with variable fields
- **Merge/Split** — Document merge and split operations
- **Compression** — Smart compression for storage optimization
- **Conversion** — Format conversion between document types
- **OCR** — Optical character recognition for scanned documents
- **Signatures** — Electronic and digital signature workflows
- **Approvals** — Multi-level approval workflows with routing
- **Workflows** — Configurable workflow engine with state machines
- **Export/Import** — Bulk export and import in multiple formats
- **Retention** — Automated retention policies with legal holds
- **WebDAV** — WebDAV protocol support for desktop integration
- **Storage** — Multi-provider storage (S3, GCS, Azure, local)
- **AI Classification** — AI-powered document categorization and tagging
- **Forms** — Form field management and data extraction
- **Offline** — Offline document access with sync capabilities
- **Encryption** — End-to-end encryption with key management
- **Compliance** — GDPR, FERPA, HIPAA, SOC2 compliance features
- **Notifications** — Real-time notifications for document events
- **Analytics** — Document usage analytics and reporting
- **Batch Processing** — Bulk operations with progress tracking
- **Thumbnails** — Auto-generated thumbnails for all document types
- **Metadata** — Custom metadata fields and schema management
- **Checkout/Lock** — Exclusive checkout with collaborative editing
- **Favorites** — User favorites with quick access
- **Recent** — Recently accessed documents with activity history
- **Preview** — In-browser preview for 100+ file formats
- **Download** — Secure download with access logging
- **Print** — Print-optimized formatting with watermarks
- **Viewing** — Real-time collaborative viewing sessions
- **Expiring** — Time-limited document access with auto-revocation
- **Reviews** — Document review cycles with feedback tracking
- **Delegation** — Approval delegation with audit trail
- **Chain-of-Custody** — Complete document lifecycle tracking
- **Forensic** — Forensic analysis and e-discovery support
- **Timestamps** — Cryptographic timestamps for legal validity
- **DRM** — Digital rights management with access controls
- **Redaction** — Secure redaction with permanent removal
- **Annotations** — Rich annotations with highlights and notes
- **Highlights** — Text highlighting with color coding
- **Signature Fields** — Configurable signature field placement
- **Form Fields** — Dynamic form field management
- **Custom Fields** — User-defined metadata fields
- **Branding** — Custom branding for document exports and watermarks

---

## Architecture

### Design Patterns

| Pattern | Implementation |
|---------|---------------|
| DDD (Domain-Driven Design) | Domains: documents, folders, workspaces, permissions, versions, comments, tags, activities, search, archive, backup, restore, trash, watermark, templates, merge, compression, conversion, OCR, signatures, approvals, workflows, export, retention, WebDAV, storage, AI, forms, offline, encryption, compliance |
| Repository Pattern | `documents.repository.ts` — 2800+ line Supabase data access layer |
| Service Layer | 60 service files with domain-specific logic |
| Hook Layer | 325 React hooks for UI state management |
| Validation Layer | 85+ Zod schemas for API input validation |
| Event-Driven | Webhook event triggers, real-time subscriptions |
| Observer Pattern | Activity tracking, notifications, audit trail |
| Strategy Pattern | Multi-provider storage, conversion, OCR integration |
| Circuit Breaker | External provider fallback and retry logic |
| State Machine | Workflow engine with configurable transitions |
| Template Method | Document template processing pipeline |
| Chain of Responsibility | Multi-level approval routing |

### Data Flow

```
Page Component → Hook → Service → Repository → Supabase
      ↓              ↓         ↓           ↓
    (UI)      (React State) (Business)  (Data Access)
      ↓              ↓         ↓           ↓
  (Real-time)  (WebSocket) (Events)   (RLS Policies)

Document Upload → Validation → Processing Pipeline:
  ├── OCR Extraction → AI Classification → Metadata
  ├── Thumbnail Generation → Preview Creation
  ├── Compression → Encryption → Storage
  └── Activity Logging → Notification → Real-time Update
```

### Multi-Tenancy

All queries are scoped by `schoolId` parameter. The repository enforces tenant isolation at the data access level via Supabase Row Level Security (RLS) policies. Document storage paths include tenant prefix for physical isolation.

---

## Module Structure

### File Inventory

| Layer | Count | Description |
|-------|-------|-------------|
| Types | 1 (`types.ts`) | Re-exports from `@educi/types` |
| Validators | 1 (`schemas.ts`) | 85+ Zod validation schemas |
| Repository | 1 (`documents.repository.ts`) | 2800+ line Supabase data access (120+ methods) |
| Services | 60 files | Domain-specific business logic |
| Hooks | 325 files | React hooks for UI state |
| API Routes | 250+ routes | RESTful endpoints organized by domain |
| Mobile Screens | 20 files | React Native document screens |

**Total: ~650+ files**

### Directory Layout

```
web/src/features/documents/
├── types.ts                              # Type re-exports from @educi/types
├── validators/
│   └── schemas.ts                        # 85+ Zod validation schemas
├── repositories/
│   └── documents.repository.ts           # SupabaseDocumentsRepository (120+ methods)
├── services/
│   ├── index.ts                          # 60 service exports
│   ├── document.service.ts               # Document CRUD and lifecycle
│   ├── folder.service.ts                 # Folder hierarchy and management
│   ├── workspace.service.ts              # Workspace collaboration
│   ├── permission.service.ts             # RBAC permission checks
│   ├── version.service.ts                # Version control and history
│   ├── comment.service.ts                # Threaded comments and mentions
│   ├── tag.service.ts                    # Tag management and suggestions
│   ├── activity.service.ts               # Activity audit trail
│   ├── search.service.ts                 # Full-text search and filters
│   ├── archive.service.ts                # Long-term archival
│   ├── backup.service.ts                 # Backup and recovery
│   ├── restore.service.ts                # Point-in-time restore
│   ├── trash.service.ts                  # Soft-delete management
│   ├── watermark.service.ts              # Dynamic watermarking
│   ├── template.service.ts               # Document templates
│   ├── merge.service.ts                  # Document merge operations
│   ├── split.service.ts                  # Document split operations
│   ├── compression.service.ts            # Smart compression
│   ├── conversion.service.ts             # Format conversion
│   ├── ocr.service.ts                    # OCR processing
│   ├── signature.service.ts              # Digital signatures
│   ├── approval.service.ts               # Approval workflows
│   ├── workflow.service.ts               # Workflow engine
│   ├── export.service.ts                 # Export operations
│   ├── import.service.ts                 # Import operations
│   ├── retention.service.ts              # Retention policies
│   ├── webdav.service.ts                 # WebDAV integration
│   ├── storage.service.ts                # Cloud storage providers
│   ├── ai-classification.service.ts      # AI document classification
│   ├── form.service.ts                   # Form field management
│   ├── offline.service.ts                # Offline sync management
│   ├── encryption.service.ts             # End-to-end encryption
│   ├── compliance.service.ts             # Compliance features
│   ├── notification.service.ts           # Document notifications
│   ├── analytics.service.ts              # Usage analytics
│   ├── batch.service.ts                  # Batch processing
│   ├── thumbnail.service.ts              # Thumbnail generation
│   ├── metadata.service.ts               # Metadata management
│   ├── checkout.service.ts               # Checkout and locking
│   ├── favorite.service.ts               # Favorites management
│   ├── recent.service.ts                 # Recent documents
│   ├── preview.service.ts                # Document preview
│   ├── download.service.ts               # Secure downloads
│   ├── print.service.ts                  # Print formatting
│   ├── viewing.service.ts                # Collaborative viewing
│   ├── expiring.service.ts               # Expiring access
│   ├── review.service.ts                 # Review cycles
│   ├── delegation.service.ts             # Approval delegation
│   ├── chain.service.ts                  # Chain of custody
│   ├── forensic.service.ts               # Forensic analysis
│   ├── timestamp.service.ts              # Cryptographic timestamps
│   ├── drm.service.ts                    # Digital rights management
│   ├── redaction.service.ts              # Secure redaction
│   ├── annotation.service.ts             # Annotations and highlights
│   ├── signature-field.service.ts        # Signature field placement
│   ├── form-field.service.ts             # Form field management
│   ├── custom-field.service.ts           # Custom metadata fields
│   └── branding.service.ts               # Institutional branding
├── hooks/
│   ├── use-documents.ts                  # Document list and CRUD
│   ├── use-document-detail.ts            # Single document operations
│   ├── use-folders.ts                    # Folder hierarchy
│   ├── use-workspaces.ts                 # Workspace management
│   ├── use-permissions.ts                # Permission checks
│   ├── use-versions.ts                   # Version history
│   ├── use-comments.ts                   # Comment operations
│   ├── use-tags.ts                       # Tag management
│   ├── use-activities.ts                 # Activity tracking
│   ├── use-search.ts                     # Document search
│   ├── use-archive.ts                    # Archive operations
│   ├── use-backup.ts                     # Backup management
│   ├── use-restore.ts                    # Restore operations
│   ├── use-trash.ts                      # Trash management
│   ├── use-watermark.ts                  # Watermark operations
│   ├── use-templates.ts                  # Template management
│   ├── use-merge.ts                      # Merge operations
│   ├── use-split.ts                      # Split operations
│   ├── use-compression.ts                # Compression state
│   ├── use-conversion.ts                 # Format conversion
│   ├── use-ocr.ts                        # OCR processing
│   ├── use-signatures.ts                 # Digital signatures
│   ├── use-approvals.ts                  # Approval workflows
│   ├── use-workflows.ts                  # Workflow engine
│   ├── use-export.ts                     # Export operations
│   ├── use-import.ts                     # Import operations
│   ├── use-retention.ts                  # Retention policies
│   ├── use-webdav.ts                     # WebDAV integration
│   ├── use-storage.ts                    # Storage providers
│   ├── use-ai-classification.ts          # AI classification
│   ├── use-forms.ts                      # Form management
│   ├── use-offline.ts                    # Offline state
│   ├── use-encryption.ts                 # Encryption state
│   ├── use-compliance.ts                 # Compliance features
│   ├── use-notifications.ts              # Document notifications
│   ├── use-analytics.ts                  # Usage analytics
│   ├── use-batch.ts                      # Batch operations
│   ├── use-thumbnails.ts                 # Thumbnail generation
│   ├── use-metadata.ts                   # Metadata management
│   ├── use-checkout.ts                   # Checkout and locking
│   ├── use-favorites.ts                  # Favorites management
│   ├── use-recent.ts                     # Recent documents
│   ├── use-preview.ts                    # Document preview
│   ├── use-download.ts                   # Download operations
│   ├── use-print.ts                      # Print formatting
│   ├── use-viewing.ts                    # Collaborative viewing
│   ├── use-expiring.ts                   # Expiring access
│   ├── use-reviews.ts                    # Review cycles
│   ├── use-delegation.ts                 # Delegation management
│   ├── use-chain.ts                      # Chain of custody
│   ├── use-forensic.ts                   # Forensic analysis
│   ├── use-timestamps.ts                 # Cryptographic timestamps
│   ├── use-drm.ts                        # DRM protection
│   ├── use-redaction.ts                  # Redaction operations
│   ├── use-annotations.ts                # Annotations
│   ├── use-highlights.ts                 # Text highlighting
│   ├── use-signature-fields.ts           # Signature field management
│   ├── use-form-fields.ts                # Form field management
│   ├── use-custom-fields.ts              # Custom fields
│   ├── use-branding.ts                   # Branding management
│   ├── use-document-dashboard.ts         # Dashboard data
│   ├── use-document-stats.ts             # Usage statistics
│   ├── use-document-versions.ts          # Version operations
│   ├── use-document-comments.ts          # Comment operations
│   ├── use-document-permissions.ts       # Permission management
│   ├── use-document-activities.ts        # Activity feed
│   ├── use-document-tags.ts              # Tag operations
│   ├── use-document-search.ts            # Search operations
│   ├── use-document-pagination.ts        # Pagination state
│   ├── use-document-filters.ts           # Filter configuration
│   ├── use-document-sort.ts              # Sort configuration
│   ├── use-document-selection.ts         # Multi-select state
│   ├── use-document-bulk.ts              # Bulk operations
│   ├── use-document-upload.ts            # Upload handling
│   ├── use-document-download.ts          # Download handling
│   ├── use-document-preview.ts           # Preview state
│   ├── use-document-share.ts             # Sharing operations
│   ├── use-document-link.ts              # Share link management
│   ├── use-document-expiry.ts            # Expiration management
│   ├── use-document-review.ts            # Review operations
│   ├── use-document-approval.ts          # Approval operations
│   ├── use-document-workflow.ts          # Workflow state
│   ├── use-document-signature.ts         # Signature operations
│   ├── use-document-ocr.ts               # OCR operations
│   ├── use-document-convert.ts           # Conversion operations
│   ├── use-document-compress.ts          # Compression operations
│   ├── use-document-merge.ts             # Merge operations
│   ├── use-document-split.ts             # Split operations
│   ├── use-document-template.ts          # Template operations
│   ├── use-document-watermark.ts         # Watermark operations
│   ├── use-document-retention.ts         # Retention operations
│   ├── use-document-compliance.ts        # Compliance operations
│   ├── use-document-forensic.ts          # Forensic operations
│   ├── use-document-chain.ts             # Chain of custody
│   ├── use-document-timestamp.ts         # Timestamp operations
│   ├── use-document-drm.ts               # DRM operations
│   ├── use-document-redact.ts            # Redaction operations
│   ├── use-document-annotate.ts          # Annotation operations
│   ├── use-document-highlight.ts         # Highlight operations
│   ├── use-document-form-field.ts        # Form field operations
│   ├── use-document-signature-field.ts   # Signature field operations
│   ├── use-document-custom-field.ts      # Custom field operations
│   ├── use-document-branding.ts          # Branding operations
│   ├── use-document-export.ts            # Export operations
│   ├── use-document-import.ts            # Import operations
│   ├── use-document-backup.ts            # Backup operations
│   ├── use-document-restore.ts           # Restore operations
│   ├── use-document-trash.ts             # Trash operations
│   ├── use-document-archive.ts           # Archive operations
│   ├── use-document-webdav.ts            # WebDAV operations
│   ├── use-document-storage.ts           # Storage operations
│   ├── use-document-ai.ts                # AI operations
│   ├── use-document-forms.ts             # Form operations
│   ├── use-document-offline.ts           # Offline operations
│   ├── use-document-encryption.ts        # Encryption operations
│   ├── use-document-notifications.ts     # Notification operations
│   ├── use-document-analytics.ts         # Analytics operations
│   ├── use-document-batch.ts             # Batch operations
│   ├── use-document-thumbnail.ts         # Thumbnail operations
│   ├── use-document-metadata.ts          # Metadata operations
│   ├── use-document-checkout.ts          # Checkout operations
│   ├── use-document-favorite.ts          # Favorite operations
│   ├── use-document-recent.ts            # Recent operations
│   ├── use-document-viewing.ts           # Viewing operations
│   ├── use-document-delegation.ts        # Delegation operations
│   ├── use-document-realtime.ts          # Real-time state
│   └── use-document-cache.ts             # Cache management
├── validators/
│   └── schemas.ts                        # 85+ Zod validation schemas
└── mobile/
    ├── index.ts                           # 20 mobile screen exports
    └── screens/
        ├── DocumentsScreen.tsx            # Document list
        ├── DocumentDetailScreen.tsx       # Document detail
        ├── DocumentPreviewScreen.tsx      # Document preview
        ├── DocumentVersionsScreen.tsx     # Version history
        ├── DocumentCommentsScreen.tsx     # Comments
        ├── DocumentPermissionsScreen.tsx  # Permissions
        ├── FoldersScreen.tsx             # Folder browser
        ├── FolderDetailScreen.tsx         # Folder content
        ├── WorkspacesScreen.tsx          # Workspace list
        ├── WorkspaceDetailScreen.tsx      # Workspace detail
        ├── SearchScreen.tsx              # Document search
        ├── TagsScreen.tsx               # Tag management
        ├── TrashScreen.tsx              # Trash bin
        ├── ArchiveScreen.tsx            # Archived documents
        ├── TemplatesScreen.tsx          # Template gallery
        ├── SignaturesScreen.tsx         # Signature management
        ├── ApprovalsScreen.tsx          # Approval queue
        ├── WorkflowsScreen.tsx          # Workflow management
        ├── SettingsScreen.tsx           # Document settings
        └── BatchScreen.tsx              # Batch operations
```

---

## Feature Modules

### Document Management

#### Overview

The Document Management feature provides comprehensive CRUD operations with lifecycle management, version control, and collaborative editing capabilities.

#### Document Types

| Type | Description |
|------|-------------|
| `DOCUMENT` | Standard document (Word, Google Docs) |
| `SPREADSHEET` | Spreadsheet (Excel, Google Sheets) |
| `PRESENTATION` | Presentation (PowerPoint, Google Slides) |
| `PDF` | PDF document |
| `IMAGE` | Image file (JPG, PNG, GIF, etc.) |
| `VIDEO` | Video file (MP4, MOV, etc.) |
| `AUDIO` | Audio file (MP3, WAV, etc.) |
| `ARCHIVE` | Archive file (ZIP, RAR, etc.) |
| `CODE` | Source code file |
| `FORM` | Form template |
| `TEMPLATE` | Document template |
| `OTHER` | Other file types |

#### Document Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new document with metadata |
| Read | Read document content and metadata |
| Update | Update document content and metadata |
| Delete | Soft-delete or permanent delete |
| Upload | Upload file with processing pipeline |
| Download | Secure download with access logging |
| Copy | Copy document to new location |
| Move | Move document to different folder |
| Rename | Rename document |
| Share | Share with users or groups |
| Revoke | Revoke access permissions |
| Lock | Exclusive checkout lock |
| Unlock | Release checkout lock |
| Favorite | Add to favorites |
| Unfavorite | Remove from favorites |
| Archive | Move to archive |
| Restore | Restore from archive |
| Trash | Move to trash |
| Recover | Recover from trash |
| Purge | Permanently delete |

---

### Folder Management

#### Overview

The Folder Management feature provides hierarchical folder organization with nested structures and permission inheritance.

#### Folder Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new folder |
| Update | Update folder name and description |
| Delete | Delete folder and contents |
| Move | Move folder to new parent |
| Copy | Copy folder and contents |
| Share | Share folder with users |
| Revoke | Revoke folder access |
| List | List folder contents |
| Tree | Get folder hierarchy tree |
| Search | Search within folder |
| Sort | Sort folder contents |
| Filter | Filter folder contents |

---

### Workspace Management

#### Overview

The Workspace feature provides collaborative spaces with team-based access, shared resources, and workspace-specific settings.

#### Workspace Operations

| Operation | Description |
|-----------|-------------|
| Create | Create new workspace |
| Update | Update workspace settings |
| Delete | Delete workspace |
| Add Member | Add member with role |
| Remove Member | Remove member from workspace |
| Change Role | Change member role |
| List Members | List workspace members |
| Share | Share workspace with others |
| Settings | Manage workspace settings |
| Statistics | Get workspace statistics |

---

### Version Control

#### Overview

The Version Control feature provides complete version history with diff tracking, comparison, and rollback capabilities.

#### Version Operations

| Operation | Description |
|-----------|-------------|
| Create Version | Create new version on save |
| List Versions | Get version history |
| Get Version | Get specific version |
| Compare | Compare two versions |
| Revert | Revert to previous version |
| Download | Download specific version |
| Restore | Restore deleted version |
| Lock | Lock version from changes |
| Unlock | Unlock version |

---

### Comments & Annotations

#### Overview

The Comments & Annotations feature provides threaded discussions, mentions, and rich annotations on documents.

#### Comment Operations

| Operation | Description |
|-----------|-------------|
| Add Comment | Add comment to document |
| Reply | Reply to existing comment |
| Edit | Edit comment content |
| Delete | Delete comment |
| Resolve | Mark comment as resolved |
| Reopen | Reopen resolved comment |
| Mention | Mention user in comment |
| Attach | Attach file to comment |
| Like | Like/unlike comment |

---

### Tags & Metadata

#### Overview

The Tags & Metadata feature provides flexible tagging, custom metadata fields, and schema management.

#### Tag Operations

| Operation | Description |
|-----------|-------------|
| Create Tag | Create new tag |
| Update Tag | Update tag name and color |
| Delete Tag | Delete tag |
| Assign Tag | Assign tag to document |
| Remove Tag | Remove tag from document |
| Bulk Assign | Bulk assign tags |
| Get Suggestions | Get auto-tag suggestions |
| Get Popular | Get popular tags |

---

### Search & Discovery

#### Overview

The Search & Discovery feature provides full-text search, advanced filters, faceted search, and saved searches.

#### Search Operations

| Operation | Description |
|-----------|-------------|
| Full-Text Search | Search document content |
| Metadata Search | Search by metadata fields |
| Tag Search | Search by tags |
| Advanced Search | Complex filter combinations |
| Saved Search | Save search queries |
| Recent Searches | Get recent searches |
| Suggestions | Get search suggestions |
| Faceted Search | Get search facets |

---

### Archive & Backup

#### Overview

The Archive & Backup feature provides long-term archival, automated backups, and point-in-time recovery.

#### Archive Operations

| Operation | Description |
|-----------|-------------|
| Archive | Move documents to archive |
| Restore | Restore from archive |
| List | List archived documents |
| Search | Search archived documents |
| Export | Export archive |

#### Backup Operations

| Operation | Description |
|-----------|-------------|
| Create Backup | Create manual backup |
| List Backups | List available backups |
| Restore | Restore from backup |
| Download | Download backup file |
| Delete | Delete backup |
| Schedule | Schedule automated backups |

---

### Trash & Recovery

#### Overview

The Trash & Recovery feature provides soft-delete with configurable retention and auto-purge policies.

#### Trash Operations

| Operation | Description |
|-----------|-------------|
| Move to Trash | Soft-delete document |
| Restore | Restore from trash |
| Empty Trash | Permanently delete all |
| List | List trashed documents |
| Auto-Purge | Auto-delete after retention |

---

### Watermarking

#### Overview

The Watermarking feature provides dynamic watermarking with user-specific identifiers and branding.

#### Watermark Operations

| Operation | Description |
|-----------|-------------|
| Add Watermark | Add watermark to document |
| Remove Watermark | Remove watermark |
| Custom Watermark | Create custom watermark |
| Preview | Preview watermark effect |
| Batch | Batch watermark documents |

---

### Templates

#### Overview

The Templates feature provides reusable document templates with variable fields and conditional sections.

#### Template Operations

| Operation | Description |
|-----------|-------------|
| Create Template | Create document template |
| Update Template | Update template |
| Delete Template | Delete template |
| Use Template | Create document from template |
| Preview | Preview template |
| Share | Share template |
| Categories | Manage template categories |

---

### Document Processing

#### Overview

The Document Processing feature provides merge, split, compression, and format conversion capabilities.

#### Processing Operations

| Operation | Description |
|-----------|-------------|
| Merge | Merge multiple documents |
| Split | Split document into parts |
| Compress | Compress document |
| Decompress | Decompress document |
| Convert | Convert to different format |
| Optimize | Optimize document size |
| Batch Process | Process multiple documents |

---

### OCR Processing

#### Overview

The OCR Processing feature provides optical character recognition for scanned documents with template-based extraction.

#### OCR Operations

| Operation | Description |
|-----------|-------------|
| Extract Text | Extract text from image |
| Extract Fields | Extract specific fields |
| Validate | Validate extracted data |
| Correct | Auto-correct errors |
| Batch OCR | Process multiple documents |
| Template OCR | Template-based extraction |

---

### Digital Signatures

#### Overview

The Digital Signatures feature provides electronic and digital signature workflows with certificate management.

#### Signature Operations

| Operation | Description |
|-----------|-------------|
| Request Signature | Request signature from user |
| Sign | Sign document electronically |
| Verify | Verify signature validity |
| Revoke | Revoke signature |
| Certificate | Manage certificates |
| Bulk Sign | Bulk sign documents |

---

### Approval Workflows

#### Overview

The Approval Workflows feature provides multi-level approval routing with delegation and escalation.

#### Approval Operations

| Operation | Description |
|-----------|-------------|
| Submit for Approval | Submit document for approval |
| Approve | Approve document |
| Reject | Reject document |
| Request Changes | Request changes |
| Delegate | Delegate approval |
| Escalate | Escalate to next level |
| Recall | Recall from approval |

---

### Workflow Engine

#### Overview

The Workflow Engine feature provides configurable workflow automation with state machines and conditions.

#### Workflow Operations

| Operation | Description |
|-----------|-------------|
| Create Workflow | Create workflow definition |
| Update Workflow | Update workflow |
| Delete Workflow | Delete workflow |
| Start | Start workflow instance |
| Transition | Transition to next state |
| Complete | Complete workflow |
| Cancel | Cancel workflow |
| History | Get workflow history |

---

### Export & Import

#### Overview

The Export & Import feature provides bulk export and import in multiple formats with progress tracking.

#### Export Formats

| Format | Description |
|--------|-------------|
| `PDF` | PDF document |
| `DOCX` | Word document |
| `XLSX` | Excel spreadsheet |
| `PPTX` | PowerPoint presentation |
| `CSV` | CSV spreadsheet |
| `JSON` | JSON data |
| `XML` | XML data |
| `ZIP` | Compressed archive |

---

### Retention & Compliance

#### Overview

The Retention & Compliance feature provides automated retention policies, legal holds, and compliance features.

#### Retention Operations

| Operation | Description |
|-----------|-------------|
| Set Retention | Set retention policy |
| Legal Hold | Place legal hold |
| Release Hold | Release legal hold |
| Auto-Delete | Auto-delete expired documents |
| Compliance Check | Check compliance status |
| Audit Log | Get audit log |

---

### Storage & Integration

#### Overview

The Storage & Integration feature provides multi-provider storage, WebDAV access, and cloud integration.

#### Storage Providers

| Provider | Description |
|----------|-------------|
| `S3` | Amazon S3 |
| `GCS` | Google Cloud Storage |
| `Azure` | Azure Blob Storage |
| `Local` | Local file system |
| `Supabase` | Supabase Storage |

---

### AI Features

#### Overview

The AI Features provide intelligent document classification, auto-tagging, and content extraction.

#### AI Operations

| Operation | Description |
|-----------|-------------|
| Classify | Auto-classify document |
| Auto-Tag | Generate tags automatically |
| Summarize | Generate document summary |
| Extract | Extract key information |
| Similar | Find similar documents |
| Search | AI-powered search |

---

### Offline & Sync

#### Overview

The Offline & Sync feature provides offline document access with automatic synchronization.

#### Offline Operations

| Operation | Description |
|-----------|-------------|
| Sync | Sync documents offline |
| Queue | Queue offline changes |
| Resolve | Resolve conflicts |
| Status | Get sync status |

---

### Encryption & Security

#### Overview

The Encryption & Security feature provides end-to-end encryption, DRM protection, and secure redaction.

#### Encryption Operations

| Operation | Description |
|-----------|-------------|
| Encrypt | Encrypt document |
| Decrypt | Decrypt document |
| Generate Key | Generate encryption key |
| Rotate Key | Rotate encryption key |
| DRM | Apply DRM protection |
| Redact | Secure redaction |

---

### Notifications & Analytics

#### Overview

The Notifications & Analytics feature provides real-time notifications and document usage analytics.

#### Notification Events

| Event | Description |
|-------|-------------|
| `document.created` | Document created |
| `document.updated` | Document updated |
| `document.deleted` | Document deleted |
| `document.shared` | Document shared |
| `document.commented` | Comment added |
| `document.approved` | Document approved |
| `document.rejected` | Document rejected |
| `document.signed` | Document signed |

---

## Service Inventory

| # | Service | Methods | Description |
|---|---------|---------|-------------|
| 1 | document.service.ts | 18 | Document CRUD and lifecycle |
| 2 | folder.service.ts | 14 | Folder hierarchy and management |
| 3 | workspace.service.ts | 12 | Workspace collaboration |
| 4 | permission.service.ts | 16 | RBAC permission checks |
| 5 | version.service.ts | 10 | Version control and history |
| 6 | comment.service.ts | 11 | Threaded comments and mentions |
| 7 | tag.service.ts | 9 | Tag management and suggestions |
| 8 | activity.service.ts | 8 | Activity audit trail |
| 9 | search.service.ts | 10 | Full-text search and filters |
| 10 | archive.service.ts | 7 | Long-term archival |
| 11 | backup.service.ts | 8 | Backup and recovery |
| 12 | restore.service.ts | 6 | Point-in-time restore |
| 13 | trash.service.ts | 7 | Soft-delete management |
| 14 | watermark.service.ts | 6 | Dynamic watermarking |
| 15 | template.service.ts | 9 | Document templates |
| 16 | merge.service.ts | 5 | Document merge operations |
| 17 | split.service.ts | 5 | Document split operations |
| 18 | compression.service.ts | 6 | Smart compression |
| 19 | conversion.service.ts | 8 | Format conversion |
| 20 | ocr.service.ts | 9 | OCR processing |
| 21 | signature.service.ts | 12 | Digital signatures |
| 22 | approval.service.ts | 10 | Approval workflows |
| 23 | workflow.service.ts | 14 | Workflow engine |
| 24 | export.service.ts | 8 | Export operations |
| 25 | import.service.ts | 7 | Import operations |
| 26 | retention.service.ts | 8 | Retention policies |
| 27 | webdav.service.ts | 10 | WebDAV integration |
| 28 | storage.service.ts | 12 | Cloud storage providers |
| 29 | ai-classification.service.ts | 7 | AI document classification |
| 30 | form.service.ts | 9 | Form field management |
| 31 | offline.service.ts | 8 | Offline sync management |
| 32 | encryption.service.ts | 10 | End-to-end encryption |
| 33 | compliance.service.ts | 9 | Compliance features |
| 34 | notification.service.ts | 11 | Document notifications |
| 35 | analytics.service.ts | 10 | Usage analytics |
| 36 | batch.service.ts | 8 | Batch processing |
| 37 | thumbnail.service.ts | 6 | Thumbnail generation |
| 38 | metadata.service.ts | 9 | Metadata management |
| 39 | checkout.service.ts | 8 | Checkout and locking |
| 40 | favorite.service.ts | 6 | Favorites management |
| 41 | recent.service.ts | 5 | Recent documents |
| 42 | preview.service.ts | 7 | Document preview |
| 43 | download.service.ts | 6 | Secure downloads |
| 44 | print.service.ts | 5 | Print formatting |
| 45 | viewing.service.ts | 8 | Collaborative viewing |
| 46 | expiring.service.ts | 6 | Expiring access |
| 47 | review.service.ts | 10 | Review cycles |
| 48 | delegation.service.ts | 8 | Approval delegation |
| 49 | chain.service.ts | 9 | Chain of custody |
| 50 | forensic.service.ts | 7 | Forensic analysis |
| 51 | timestamp.service.ts | 6 | Cryptographic timestamps |
| 52 | drm.service.ts | 8 | Digital rights management |
| 53 | redaction.service.ts | 7 | Secure redaction |
| 54 | annotation.service.ts | 10 | Annotations and highlights |
| 55 | signature-field.service.ts | 6 | Signature field placement |
| 56 | form-field.service.ts | 8 | Form field management |
| 57 | custom-field.service.ts | 7 | Custom metadata fields |
| 58 | branding.service.ts | 6 | Institutional branding |
| 59 | cache.service.ts | 5 | Caching layer |
| 60 | sync.service.ts | 6 | Synchronization management |

**Total: 60 services, ~480 methods**

---

## Configuration Options

### Document Constants (from `@educi/config`)

```typescript
documents: {
  STORAGE: {
    maxFileSize: 104857600, // 100MB
    maxFilesPerUpload: 25,
    allowedTypes: {
      documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'rtf', 'odt'],
      images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'],
      videos: ['mp4', 'mov', 'avi', 'webm', 'mkv'],
      audio: ['mp3', 'wav', 'ogg', 'm4a', 'flac'],
      archives: ['zip', 'rar', '7z', 'tar', 'gz'],
      code: ['js', 'ts', 'py', 'java', 'cpp', 'c', 'h', 'css', 'html', 'json', 'xml'],
    },
    storageBucket: 'documents',
    thumbnailBucket: 'thumbnails',
  },
  VERSIONS: {
    maxVersions: 100,
    autoVersion: true,
    versionCommentRequired: false,
    diffEnabled: true,
  },
  PERMISSIONS: {
    levels: ['VIEW', 'COMMENT', 'EDIT', 'ADMIN'],
    defaultLevel: 'VIEW',
    inheritanceEnabled: true,
    shareMaxUsers: 100,
    linkExpirationDays: 30,
  },
  FOLDERS: {
    maxDepth: 10,
    maxChildren: 500,
    maxNameLength: 255,
    defaultPermissions: 'VIEW',
  },
  WORKSPACES: {
    maxMembers: 100,
    maxStorage: 10737418240, // 10GB
    defaultQuota: 1073741824, // 1GB
  },
  COMMENTS: {
    maxLength: 5000,
    maxAttachments: 5,
    editWindowMinutes: 15,
    mentionEnabled: true,
  },
  TAGS: {
    maxTagsPerDocument: 20,
    maxTagLength: 50,
    autoSuggestEnabled: true,
    colorEnabled: true,
  },
  SEARCH: {
    minQueryLength: 2,
    maxQueryLength: 200,
    maxResults: 100,
    debounceDelay: 300,
    highlightMatches: true,
    fullTextEnabled: true,
  },
  TRASH: {
    retentionDays: 30,
    autoPurge: true,
    maxItems: 1000,
  },
  WATERMARK: {
    enabled: true,
    opacity: 0.3,
    fontSize: 12,
    color: '#888888',
    rotation: 45,
  },
  TEMPLATES: {
    maxTemplates: 500,
    maxVariables: 50,
    maxFileSize: 52428800, // 50MB
  },
  COMPRESSION: {
    enabled: true,
    level: 'medium',
    minFileSize: 1024,
  },
  OCR: {
    provider: 'tesseract',
    languages: ['eng', 'fra', 'deu', 'spa', 'ita', 'por', 'nld', 'rus', 'jpn', 'chi_sim'],
    confidenceThreshold: 0.7,
    maxFileSize: 52428800,
  },
  SIGNATURES: {
    provider: 'docusign',
    maxSigners: 10,
    expirationDays: 30,
    reminderIntervalDays: 3,
  },
  WORKFLOWS: {
    maxSteps: 20,
    maxConditions: 50,
    timeoutDays: 30,
    autoEscalate: true,
  },
  RETENTION: {
    defaultDays: 2555, // 7 years
    minDays: 30,
    maxDays: 3650,
    legalHoldEnabled: true,
  },
  ENCRYPTION: {
    algorithm: 'AES-256-GCM',
    keyRotationDays: 90,
    clientSideEnabled: true,
  },
  DRM: {
    enabled: true,
    watermark: true,
    printAllowed: true,
    copyAllowed: false,
    downloadAllowed: true,
    expirationDays: 30,
  },
  RATE_LIMITS: {
    uploadsPerMinute: 10,
    downloadsPerMinute: 30,
    searchesPerMinute: 20,
    apiCallsPerMinute: 100,
    batchOperationsPerHour: 10,
  },
  NOTIFICATIONS: {
    events: ['created', 'updated', 'deleted', 'shared', 'commented', 'approved', 'rejected', 'signed', 'expired', 'archived'],
    channels: ['IN_APP', 'EMAIL', 'PUSH'],
    digestEnabled: true,
    digestInterval: 'daily',
  },
}
```

---

## Error Handling

### Error Hierarchy

```
DocumentError
├── ValidationError (400)
│   ├── InvalidFileType
│   ├── FileTooLarge
│   ├── MissingRequiredField
│   ├── InvalidMetadata
│   └── InvalidPermission
├── AuthenticationError (401)
│   ├── InvalidToken
│   ├── ExpiredToken
│   └── MissingToken
├── AuthorizationError (403)
│   ├── InsufficientPermissions
│   ├── DocumentLocked
│   ├── AccessDenied
│   └── ShareLimitExceeded
├── NotFoundError (404)
│   ├── DocumentNotFound
│   ├── FolderNotFound
│   ├── WorkspaceNotFound
│   ├── VersionNotFound
│   └── TemplateNotFound
├── ConflictError (409)
│   ├── DocumentExists
│   ├── VersionConflict
│   ├── CheckoutConflict
│   └── ConcurrentEdit
├── RateLimitError (429)
│   ├── UploadLimitExceeded
│   ├── DownloadLimitExceeded
│   └── SearchLimitExceeded
├── InternalError (500)
│   ├── StorageError
│   ├── ProcessingError
│   ├── ConversionError
│   ├── OCRError
│   ├── SignatureError
│   └── WorkflowError
└── ServiceUnavailableError (503)
    ├── ProviderDown
    └── MaintenanceMode
```

### Error Response Format

```json
{
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "The requested document was not found.",
    "details": {
      "documentId": "doc_123",
      "schoolId": "school_456"
    },
    "timestamp": "2026-01-15T10:30:00Z",
    "requestId": "req_789"
  }
}
```

---

## Security Model

### Authentication

- JWT token-based authentication
- Refresh token rotation
- Session management with device tracking
- API key authentication for integrations

### Authorization (RBAC)

| Permission | Description | Roles |
|------------|-------------|-------|
| `documents:create` | Create documents | admin, teacher, staff |
| `documents:read` | Read documents | admin, teacher, staff, parent, student |
| `documents:update` | Update documents | admin, teacher, staff |
| `documents:delete` | Delete documents | admin, teacher, staff |
| `documents:share` | Share documents | admin, teacher, staff |
| `documents:admin` | Full document admin | admin |
| `documents:export` | Export documents | admin, teacher, staff |
| `documents:import` | Import documents | admin, teacher, staff |
| `documents:archive` | Archive documents | admin, teacher, staff |
| `documents:backup` | Backup documents | admin |
| `documents:restore` | Restore documents | admin |
| `documents:trash` | Manage trash | admin, teacher, staff |
| `documents:watermark` | Apply watermarks | admin, teacher |
| `documents:template` | Manage templates | admin, teacher |
| `documents:ocr` | Use OCR features | admin, teacher, staff |
| `documents:signature` | Use signatures | admin, teacher, staff |
| `documents:approval` | Manage approvals | admin, teacher |
| `documents:workflow` | Manage workflows | admin, teacher |
| `documents:retention` | Manage retention | admin |
| `documents:compliance` | Manage compliance | admin |
| `documents:analytics` | View analytics | admin, teacher |
| `documents:branding` | Manage branding | admin |
| `documents:encrypt` | Manage encryption | admin |
| `documents:drm` | Manage DRM | admin |
| `documents:redact` | Redact documents | admin |

### Data Classification

| Classification | Description | Access |
|----------------|-------------|--------|
| `PUBLIC` | Publicly accessible | All users |
| `INTERNAL` | Internal use only | School members |
| `CONFIDENTIAL` | Sensitive information | Authorized users |
| `RESTRICTED` | Highly sensitive | Admin only |

---

## Multi-Tenant Isolation

- All queries scoped by `schoolId` parameter
- Supabase RLS policies enforce tenant isolation
- Document storage paths include tenant prefix
- Cross-tenant access prevented at repository level
- WebDAV access scoped to tenant
- Backup and restore tenant-specific

---

## API Routes Summary

All routes are under `/api/documents/` and organized by domain.

| Domain | Route Count | Prefix |
|--------|-------------|--------|
| Documents | 25 | `/api/documents/docs` |
| Folders | 18 | `/api/documents/folders` |
| Workspaces | 14 | `/api/documents/workspaces` |
| Permissions | 12 | `/api/documents/permissions` |
| Versions | 10 | `/api/documents/versions` |
| Comments | 12 | `/api/documents/comments` |
| Tags | 10 | `/api/documents/tags` |
| Activities | 6 | `/api/documents/activities` |
| Search | 8 | `/api/documents/search` |
| Archive | 8 | `/api/documents/archive` |
| Backup | 10 | `/api/documents/backup` |
| Restore | 6 | `/api/documents/restore` |
| Trash | 8 | `/api/documents/trash` |
| Watermark | 6 | `/api/documents/watermark` |
| Templates | 10 | `/api/documents/templates` |
| Merge | 4 | `/api/documents/merge` |
| Compression | 4 | `/api/documents/compression` |
| Conversion | 6 | `/api/documents/conversion` |
| OCR | 8 | `/api/documents/ocr` |
| Signatures | 10 | `/api/documents/signatures` |
| Approvals | 8 | `/api/documents/approvals` |
| Workflows | 12 | `/api/documents/workflows` |
| Export | 6 | `/api/documents/export` |
| Retention | 6 | `/api/documents/retention` |
| WebDAV | 8 | `/api/documents/webdav` |
| Storage | 6 | `/api/documents/storage` |
| AI | 8 | `/api/documents/ai` |
| Forms | 8 | `/api/documents/forms` |
| Offline | 4 | `/api/documents/offline` |
| Encryption | 6 | `/api/documents/encryption` |
| Compliance | 6 | `/api/documents/compliance` |
| Notifications | 6 | `/api/documents/notifications` |
| Analytics | 6 | `/api/documents/analytics` |
| Batch | 4 | `/api/documents/batch` |
| Thumbnails | 4 | `/api/documents/thumbnails` |
| Metadata | 8 | `/api/documents/metadata` |
| Checkout | 6 | `/api/documents/checkout` |
| Favorites | 4 | `/api/documents/favorites` |
| Recent | 4 | `/api/documents/recent` |
| Preview | 4 | `/api/documents/preview` |
| Download | 4 | `/api/documents/download` |
| Print | 4 | `/api/documents/print` |
| Viewing | 6 | `/api/documents/viewing` |
| Expiring | 4 | `/api/documents/expiring` |
| Reviews | 6 | `/api/documents/reviews` |
| Delegation | 4 | `/api/documents/delegation` |
| Chain | 4 | `/api/documents/chain` |
| Forensic | 4 | `/api/documents/forensic` |
| Timestamps | 4 | `/api/documents/timestamps` |
| DRM | 4 | `/api/documents/drm` |
| Redaction | 4 | `/api/documents/redaction` |
| Annotations | 6 | `/api/documents/annotations` |
| Highlights | 4 | `/api/documents/highlights` |
| Signature Fields | 4 | `/api/documents/signature-fields` |
| Form Fields | 4 | `/api/documents/form-fields` |
| Custom Fields | 4 | `/api/documents/custom-fields` |
| Branding | 4 | `/api/documents/branding` |

**Total: 250 routes across 58 domains**

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

- Document upload/download flow
- Folder creation and management
- Workspace collaboration
- Version control flow
- Permission management
- OCR processing
- Signature workflow
- Approval workflow

### Load Tests

- High-volume document uploads
- Concurrent editing sessions
- Bulk operations
- Search performance

---

## File Counts Summary

| Category | Count |
|----------|-------|
| Total Files | ~650+ |
| Type Files | 1 |
| Validator Files | 1 |
| Repository Files | 1 |
| Service Files | 60 |
| Hook Files | 325 |
| API Route Files | 250+ |
| Mobile Screen Files | 20 |
| Test Files | ~60 |
