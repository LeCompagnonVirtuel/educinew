# EduCI Marketplace

> **Phase 3 — Enterprise Integration**
> Complete Marketplace documentation for the EduCI platform

---

## Table of Contents

1. [Overview](#1-overview)
2. [Plugin Ecosystem](#2-plugin-ecosystem)
3. [Extensions](#3-extensions)
4. [Themes](#4-themes)
5. [Templates](#5-templates)
6. [Search and Discovery](#6-search-and-discovery)
7. [Reviews and Ratings](#7-reviews-and-ratings)
8. [Subscriptions](#8-subscriptions)
9. [Licensing](#9-licensing)
10. [Publishing Workflow](#10-publishing-workflow)
11. [Developer Validation](#11-developer-validation)
12. [Marketplace API](#12-marketplace-api)

---

## 1. Overview

### 1.1 Purpose

The EduCI Marketplace provides a centralized platform for discovering, installing, and managing extensions that enhance the EduCI platform. It enables third-party developers to publish plugins, themes, and templates that integrate with EduCI's core functionality.

### 1.2 Extension Types

| Type | Description | Example |
|---|---|---|
| **Plugins** | Feature extensions | Payment gateway, analytics |
| **Themes** | UI customizations | Custom branding, dark mode |
| **Templates** | Workflow templates | Enrollment process, grading |
| **Connectors** | External integrations | LMS, SIS, HR systems |
| **Widgets** | UI components | Dashboard widgets, charts |

### 1.3 Marketplace Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    EduCI Marketplace                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │   Storefront  │    │   Admin      │                   │
│  │   (Browse)    │    │   Panel      │                   │
│  └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                            │
│         ▼                   ▼                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Marketplace Engine                    │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐         │   │
│  │  │ Search  │  │ Install │  │ License │         │   │
│  │  └─────────┘  └─────────┘  └─────────┘         │   │
│  └─────────────────────────────────────────────────┘   │
│         │                   │                            │
│         ▼                   ▼                            │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │   Extension   │    │   Billing    │                   │
│  │   Registry    │    │   Service    │                   │
│  └──────────────┘    └──────────────┘                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Plugin Ecosystem

### 2.1 Plugin Structure

```typescript
interface Plugin {
  id: string;
  name: string;
  slug: string;
  description: string;
  version: string;
  author: string;
  category: string;
  tags: string[];
  price: number;
  license: LicenseType;
  rating: number;
  installs: number;
  icon: string;
  screenshots: string[];
  documentation: string;
  changelog: string;
  requirements: {
    minEduCIVersion: string;
    maxEduCIVersion?: string;
    dependencies?: string[];
  };
  permissions: string[];
  hooks: string[];
  api: PluginAPI;
}
```

### 2.2 Plugin Categories

| Category | Description | Examples |
|---|---|---|
| **Academic** | Academic features | Grading tools, assessment |
| **Finance** | Financial management | Payment gateways, invoicing |
| **Communication** | Communication tools | SMS, email, push |
| **Analytics** | Reporting and analytics | Dashboards, reports |
| **Security** | Security features | 2FA, audit logging |
| **Integration** | External integrations | LMS, SIS, HR |
| **Automation** | Workflow automation | Triggers, actions |
| **UI/UX** | User experience | Themes, widgets |

### 2.3 Plugin Installation

```typescript
// Install plugin
POST /api/v1/marketplace/plugins/install
{
  "pluginId": "plg_stripe_payment",
  "version": "2.1.0",
  "configuration": {
    "apiKey": "sk_live_...",
    "webhookSecret": "whsec_..."
  }
}

// Response
{
  "success": true,
  "data": {
    "installationId": "inst_abc123",
    "pluginId": "plg_stripe_payment",
    "version": "2.1.0",
    "status": "installed",
    "installedAt": "2026-07-29T10:00:00Z"
  }
}
```

### 2.4 Plugin Management

```typescript
// List installed plugins
GET /api/v1/marketplace/plugins/installed

// Update plugin
POST /api/v1/marketplace/plugins/{pluginId}/update

// Uninstall plugin
DELETE /api/v1/marketplace/plugins/{pluginId}

// Enable/disable plugin
POST /api/v1/marketplace/plugins/{pluginId}/toggle
{
  "enabled": true
}
```

---

## 3. Extensions

### 3.1 Extension API

```typescript
// Plugin API interface
interface PluginAPI {
  // Hooks
  onInstall: (config: any) => Promise<void>;
  onUninstall: () => Promise<void>;
  onUpdate: (oldVersion: string, newVersion: string) => Promise<void>;
  
  // Lifecycle
  onEnable: () => Promise<void>;
  onDisable: () => Promise<void>;
  
  // Events
  on(event: string, handler: Function): void;
  emit(event: string, data: any): void;
  
  // Storage
  storage: {
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    delete(key: string): Promise<void>;
  };
  
  // API
  api: {
    get(path: string): Promise<any>;
    post(path: string, data: any): Promise<any>;
    put(path: string, data: any): Promise<any>;
    delete(path: string): Promise<any>;
  };
}
```

### 3.2 Extension Development

```typescript
// Example plugin
export default {
  name: 'Custom Grading Scale',
  version: '1.0.0',
  
  async onInstall(config) {
    // Create custom grading scales
    await this.api.post('/api/v1/grading-scales', {
      name: config.scaleName,
      grades: config.grades,
    });
  },
  
  async onUninstall() {
    // Clean up
    await this.api.delete('/api/v1/grading-scales/custom');
  },
  
  init() {
    // Register event handlers
    this.on('grade.submitted', async (event) => {
      // Apply custom grading logic
      const customGrade = this.calculateCustomGrade(event.payload);
      await this.storage.set(`grade_${event.payload.id}`, customGrade);
    });
  },
  
  calculateCustomGrade(payload) {
    // Custom grading logic
    return {
      letterGrade: payload.score >= 90 ? 'A' : 'B',
      gpa: payload.score >= 90 ? 4.0 : 3.0,
    };
  },
};
```

---

## 4. Themes

### 4.1 Theme Structure

```typescript
interface Theme {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  screenshots: string[];
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  customCSS?: string;
}
```

### 4.2 Theme Installation

```typescript
// Install theme
POST /api/v1/marketplace/themes/install
{
  "themeId": "thm_dark_mode",
  "applyTo": "all"  // or "school_123"
}

// Apply theme to school
POST /api/v1/marketplace/themes/{themeId}/apply
{
  "schoolId": "school_123"
}

// Preview theme
GET /api/v1/marketplace/themes/{themeId}/preview
```

### 4.3 Custom Theme

```typescript
// Create custom theme
POST /api/v1/marketplace/themes/custom
{
  "name": "My School Theme",
  "colors": {
    "primary": "#1E40AF",
    "secondary": "#3B82F6",
    "background": "#FFFFFF",
    "text": "#1F2937",
    "accent": "#10B981"
  },
  "fonts": {
    "heading": "Inter",
    "body": "Inter",
    "mono": "JetBrains Mono"
  },
  "customCSS": ".header { background: #1E40AF; }"
}
```

---

## 5. Templates

### 5.1 Template Types

| Type | Description |
|---|---|
| **Workflow** | Automation workflow templates |
| **Document** | Document templates |
| **Report** | Report templates |
| **Email** | Email templates |
| **Form** | Form templates |

### 5.2 Template Installation

```typescript
// Install workflow template
POST /api/v1/marketplace/templates/install
{
  "templateId": "tpl_student_enrollment",
  "customizations": {
    "name": "My Enrollment Process",
    "variables": {
      "managerEmail": "manager@school.com"
    }
  }
}

// Use template
POST /api/v1/workflows/from-template
{
  "templateId": "tpl_student_enrollment",
  "name": "Fall 2026 Enrollment"
}
```

---

## 6. Search and Discovery

### 6.1 Search API

```typescript
// Search marketplace
GET /api/v1/marketplace/search?q=payment&category=finance&sort=rating

// Filters
{
  "query": "payment",
  "category": "finance",
  "priceRange": { "min": 0, "max": 100 },
  "rating": { "min": 4 },
  "sort": "rating",  // "relevance" | "rating" | "installs" | "newest"
  "page": 1,
  "limit": 20
}

// Response
{
  "results": [
    {
      "id": "plg_stripe_payment",
      "name": "Stripe Payment Gateway",
      "description": "Accept payments via Stripe",
      "category": "finance",
      "rating": 4.8,
      "installs": 1250,
      "price": 49.99,
      "icon": "https://..."
    }
  ],
  "total": 15,
  "page": 1,
  "pages": 1
}
```

### 6.2 Categories and Tags

```typescript
// Get categories
GET /api/v1/marketplace/categories
// Returns: [{ id, name, count, icon }]

// Get popular tags
GET /api/v1/marketplace/tags
// Returns: [{ tag, count }]
```

---

## 7. Reviews and Ratings

### 7.1 Review API

```typescript
// Submit review
POST /api/v1/marketplace/plugins/{pluginId}/reviews
{
  "rating": 5,
  "title": "Great payment plugin",
  "review": "Easy to set up and works perfectly.",
  "version": "2.1.0"
}

// Get reviews
GET /api/v1/marketplace/plugins/{pluginId}/reviews?limit=50

// Response
{
  "reviews": [
    {
      "id": "rev_abc123",
      "userId": "user_456",
      "rating": 5,
      "title": "Great payment plugin",
      "review": "Easy to set up and works perfectly.",
      "version": "2.1.0",
      "createdAt": "2026-07-29T10:00:00Z",
      "helpful": 12
    }
  ],
  "summary": {
    "average": 4.8,
    "total": 250,
    "distribution": {
      "5": 200,
      "4": 30,
      "3": 10,
      "2": 5,
      "1": 5
    }
  }
}
```

### 7.2 Review Moderation

```typescript
// Flag review
POST /api/v1/marketplace/reviews/{reviewId}/flag
{
  "reason": "spam"
}

// Admin moderation
POST /api/v1/marketplace/reviews/{reviewId}/approve
POST /api/v1/marketplace/reviews/{reviewId}/reject
```

---

## 8. Subscriptions

### 8.1 Subscription Plans

| Plan | Price | Features |
|---|---|---|
| **Free** | $0 | Basic features, community support |
| **Starter** | $29/mo | 5 plugins, email support |
| **Professional** | $99/mo | 20 plugins, priority support |
| **Enterprise** | Custom | Unlimited, dedicated support |

### 8.2 Subscription Management

```typescript
// Get current subscription
GET /api/v1/marketplace/subscription

// Upgrade plan
POST /api/v1/marketplace/subscription/upgrade
{
  "planId": "plan_professional",
  "paymentMethod": "pm_card_visa"
}

// Cancel subscription
POST /api/v1/marketplace/subscription/cancel
{
  "reason": "Too expensive"
}
```

---

## 9. Licensing

### 9.1 License Types

| Type | Description | Billing |
|---|---|---|
| **Free** | No cost | — |
| **Per User** | Per active user | Monthly/annual |
| **Per Org** | Per organization | Monthly/annual |
| **Usage-Based** | Per API call | Metered |
| **One-Time** | Single purchase | One-time |
| **Tiered** | Volume discounts | Usage tiers |

### 9.2 License Validation

```typescript
// Validate license
const validation = await licenseService.validate({
  pluginId: 'plg_stripe_payment',
  licenseKey: 'lic_abc123',
  organizationId: 'org_456',
});

// Response
{
  "valid": true,
  "license": {
    "type": "per_org",
    "maxUsers": 100,
    "expiresAt": "2027-07-29T00:00:00Z",
    "features": ["payments", "invoicing", "reports"]
  }
}
```

### 9.3 License Activation

```typescript
// Activate license
POST /api/v1/marketplace/licenses/activate
{
  "licenseKey": "lic_abc123",
  "pluginId": "plg_stripe_payment",
  "organizationId": "org_456"
}

// Deactivate license
POST /api/v1/marketplace/licenses/deactivate
{
  "licenseKey": "lic_abc123"
}
```

---

## 10. Publishing Workflow

### 10.1 Publishing Steps

```
1. Develop    → Build extension locally
2. Test       → Run automated tests and security scan
3. Submit     → Upload to marketplace
4. Review     → Automated + manual validation
5. Publish    → Available in marketplace
6. Update     → New versions through same process
```

### 10.2 Submission Requirements

```typescript
interface Submission {
  name: string;
  description: string;
  version: string;
  category: string;
  tags: string[];
  icon: string;
  screenshots: string[];
  documentation: string;
  changelog: string;
  sourceCode: string;  // Repository URL
  license: string;
  requirements: {
    minEduCIVersion: string;
    dependencies?: string[];
  };
  permissions: string[];
}
```

### 10.3 Review Process

```typescript
// Automated checks
const automatedReview = {
  securityScan: true,
  codeQuality: true,
  documentation: true,
  permissions: true,
  compatibility: true,
  performance: true,
};

// Manual review
const manualReview = {
  functionality: 'Does it work as described?',
  security: 'Are there security concerns?',
  quality: 'Is the code well-written?',
  documentation: 'Is it well-documented?',
  compliance: 'Does it comply with policies?',
};
```

### 10.4 Publishing API

```typescript
// Submit extension
POST /api/v1/marketplace/publish
FormData:
  - package: (binary)
  - manifest: (JSON)

// Check submission status
GET /api/v1/marketplace/publish/{submissionId}

// Update submission
PUT /api/v1/marketplace/publish/{submissionId}
```

---

## 11. Developer Validation

### 11.1 Developer Requirements

- Verified email address
- Accepted developer agreement
- Payment information (for paid extensions)
- Identity verification (for commercial extensions)

### 11.2 Developer Dashboard

```typescript
// Get developer stats
GET /api/v1/marketplace/developer/stats

// Response
{
  "extensions": 5,
  "totalInstalls": 1250,
  "totalRevenue": 4500,
  "averageRating": 4.6,
  "recentReviews": [...],
  "pendingPayouts": 750
}

// Get extension analytics
GET /api/v1/marketplace/developer/extensions/{extensionId}/analytics
```

### 11.3 Payout Management

```typescript
// Get payout history
GET /api/v1/marketplace/developer/payouts

// Request payout
POST /api/v1/marketplace/developer/payouts/request
{
  "amount": 750,
  "method": "bank_transfer"
}

// Payout settings
PUT /api/v1/marketplace/developer/payout-settings
{
  "bankAccount": {
    "iban": "FR7630006000011234567890189",
    "bic": "BNPAFRPP"
  },
  "payoutSchedule": "monthly"
}
```

---

## 12. Marketplace API

### 12.1 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/marketplace/search` | Search marketplace |
| `GET` | `/api/v1/marketplace/categories` | List categories |
| `GET` | `/api/v1/marketplace/tags` | List tags |
| `GET` | `/api/v1/marketplace/plugins` | List plugins |
| `GET` | `/api/v1/marketplace/plugins/:id` | Get plugin details |
| `POST` | `/api/v1/marketplace/plugins/install` | Install plugin |
| `DELETE` | `/api/v1/marketplace/plugins/:id` | Uninstall plugin |
| `POST` | `/api/v1/marketplace/plugins/:id/toggle` | Enable/disable |
| `GET` | `/api/v1/marketplace/plugins/installed` | List installed |
| `POST` | `/api/v1/marketplace/themes/install` | Install theme |
| `POST` | `/api/v1/marketplace/templates/install` | Install template |
| `POST` | `/api/v1/marketplace/publish` | Submit extension |
| `GET` | `/api/v1/marketplace/publish/:id` | Check submission |
| `GET` | `/api/v1/marketplace/plugins/:id/reviews` | Get reviews |
| `POST` | `/api/v1/marketplace/plugins/:id/reviews` | Submit review |
| `GET` | `/api/v1/marketplace/subscription` | Get subscription |
| `POST` | `/api/v1/marketplace/subscription/upgrade` | Upgrade plan |
| `GET` | `/api/v1/marketplace/developer/stats` | Developer stats |
| `GET` | `/api/v1/marketplace/developer/payouts` | Payout history |

---

*EduCI Marketplace — Phase 3 Documentation*
*Last Updated: 2026-07-29*
