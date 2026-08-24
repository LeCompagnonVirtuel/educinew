# EduCI Connectors

> **Phase 3 — Enterprise Integration**
> Complete Connectors documentation for the EduCI platform

---

## Table of Contents

1. [Overview](#1-overview)
2. [Google Workspace](#2-google-workspace)
3. [Microsoft 365](#3-microsoft-365)
4. [Communication Platforms](#4-communication-platforms)
5. [Communication Services](#5-communication-services)
6. [Cloud Providers](#6-cloud-providers)
7. [Payment Processors](#7-payment-processors)
8. [African Mobile Money](#8-african-mobile-money)
9. [AI Providers](#9-ai-providers)
10. [Developer Tools](#10-developer-tools)
11. [Identity Providers](#11-identity-providers)
12. [Databases](#12-databases)
13. [Connector Health Monitoring](#13-connector-health-monitoring)
14. [Data Synchronization](#14-data-synchronization)

---

## 1. Overview

### 1.1 Purpose

Connectors enable EduCI to integrate with external services, APIs, and platforms. They provide standardized interfaces for authentication, data exchange, and event synchronization.

### 1.2 Connector Categories

| Category | Connectors |
|---|---|
| **Productivity** | Google Workspace, Microsoft 365, Zoom, Slack, Discord |
| **Communication** | Twilio, SendGrid, Firebase Cloud Messaging |
| **Cloud** | AWS, Azure, Cloudflare, Supabase |
| **Payments** | Stripe, PayPal, Orange Money, MTN Money, Wave, MoneyFusion |
| **AI Providers** | OpenAI, Anthropic, Gemini, Mistral, DeepSeek |
| **DevOps** | GitHub, GitLab, Jira, Trello, Notion |
| **Identity** | LDAP, Active Directory, SAML, OpenID Connect |
| **Databases** | PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch |

### 1.3 Connector Lifecycle

```
install → configure → connect → sync → monitor → update → disconnect → uninstall
```

---

## 2. Google Workspace

### 2.1 Features

| Feature | Description |
|---|---|
| **Calendar** | Sync events, create meetings |
| **Drive** | Upload/download files, manage folders |
| **Gmail** | Send emails, manage templates |
| **Meet** | Create video conferences |
| **Sheets** | Read/write spreadsheet data |
| **Classroom** | Sync courses, assignments, grades |

### 2.2 Configuration

```typescript
const googleWorkspaceConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'https://api.educi.com/connectors/google/callback',
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/classroom.courses.readonly',
  ],
  serviceAccountKey: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  domain: 'educi.com',
};
```

### 2.3 Usage

```typescript
// Sync Google Classroom courses
const courses = await googleConnector.classroom.courses.list({
  teacherId: 'teacher@educi.com',
});

// Create calendar event
await googleConnector.calendar.events.insert({
  calendarId: 'primary',
  resource: {
    summary: 'Parent-Teacher Conference',
    start: { dateTime: '2026-07-30T09:00:00Z' },
    end: { dateTime: '2026-07-30T10:00:00Z' },
    attendees: [{ email: 'parent@example.com' }],
  },
});

// Send email
await googleConnector.gmail.send({
  to: 'student@example.com',
  subject: 'Welcome to EduCI',
  body: 'Welcome to our educational platform!',
});
```

---

## 3. Microsoft 365

### 3.1 Features

| Feature | Description |
|---|---|
| **Outlook** | Email, calendar management |
| **OneDrive** | File storage and sharing |
| **Teams** | Messaging, meetings |
| **SharePoint** | Document management |
| **Azure AD** | Identity management |

### 3.2 Configuration

```typescript
const microsoft365Config = {
  clientId: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  tenantId: process.env.AZURE_TENANT_ID,
  redirectUri: 'https://api.educi.com/connectors/microsoft/callback',
  scopes: [
    'https://graph.microsoft.com/User.Read',
    'https://graph.microsoft.com/Mail.Send',
    'https://graph.microsoft.com/Calendars.ReadWrite',
    'https://graph.microsoft.com/Files.ReadWrite',
  ],
};
```

### 3.3 Usage

```typescript
// Send email via Outlook
await microsoft365.outlook.sendMail({
  message: {
    subject: 'Grade Report',
    body: { contentType: 'HTML', content: '<h1>Your grades</h1>' },
    toRecipients: [{ emailAddress: { address: 'student@example.com' } }],
  },
});

// Create Teams meeting
await microsoft365.teams.createMeeting({
  subject: 'Parent Conference',
  startDateTime: '2026-07-30T09:00:00Z',
  endDateTime: '2026-07-30T10:00:00Z',
  attendees: [{ emailAddress: { address: 'parent@example.com' } }],
});

// Upload to OneDrive
await microsoft365.onedrive.upload({
  path: '/Reports/grade-report.pdf',
  content: pdfBuffer,
});
```

---

## 4. Communication Platforms

### 4.1 Zoom

```typescript
const zoomConfig = {
  accountId: process.env.ZOOM_ACCOUNT_ID,
  clientId: process.env.ZOOM_CLIENT_ID,
  clientSecret: process.env.ZOOM_CLIENT_SECRET,
};

// Create meeting
await zoom.meetings.create({
  topic: 'Virtual Classroom',
  type: 1,  // Instant meeting
  start_time: '2026-07-30T09:00:00Z',
  duration: 60,
  settings: {
    waiting_room: true,
    approval_type: 2,
  },
});
```

### 4.2 Slack

```typescript
const slackConfig = {
  botToken: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
};

// Send message
await slack.chat.postMessage({
  channel: '#announcements',
  text: 'New grades have been posted!',
  blocks: [
    {
      type: 'header',
      text: { type: 'plain_text', text: 'Grade Update' },
    },
    {
      type: 'section',
      text: { type: 'mrkdwn', text: 'Grades for Q2 have been published.' },
    },
  ],
});

// Send DM
await slack.chat.postMessage({
  channel: '@student123',
  text: 'Your grade report is ready.',
});
```

### 4.3 Discord

```typescript
const discordConfig = {
  botToken: process.env.DISCORD_BOT_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
};

// Send message to channel
await discord.channels.sendMessage({
  channelId: 'announcements-channel-id',
  content: 'New course materials available!',
  embeds: [
    {
      title: 'Course Materials',
      description: 'Materials for Module 3 have been uploaded.',
      color: 0x00ff00,
      fields: [
        { name: 'Course', value: 'Mathematics 101', inline: true },
        { name: 'Module', value: '3', inline: true },
      ],
    },
  ],
});
```

---

## 5. Communication Services

### 5.1 Twilio

```typescript
const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER,
};

// Send SMS
await twilio.messages.create({
  to: '+1234567890',
  from: twilioConfig.phoneNumber,
  body: 'Your payment of $50 has been received. Thank you!',
});

// Send WhatsApp
await twilio.messages.create({
  to: 'whatsapp:+1234567890',
  from: 'whatsapp:+14155238886',
  body: 'Your enrollment is confirmed!',
});

// Make voice call
await twilio.calls.create({
  to: '+1234567890',
  from: twilioConfig.phoneNumber,
  url: 'https://api.educi.com/twilio/voice-twiml',
});
```

### 5.2 Firebase Cloud Messaging

```typescript
const fcmConfig = {
  serviceAccount: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
  projectId: process.env.FIREBASE_PROJECT_ID,
};

// Send push notification
await fcm.messaging.send({
  token: 'device-token-here',
  notification: {
    title: 'New Assignment',
    body: 'You have a new assignment in Mathematics.',
  },
  data: {
    assignmentId: 'asg_123',
    courseId: 'crs_456',
  },
});

// Send to topic
await fcm.messaging.send({
  topic: 'announcements',
  notification: {
    title: 'School Announcement',
    body: 'School will be closed tomorrow.',
  },
});
```

### 5.3 Supabase

```typescript
const supabaseConfig = {
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_KEY,
};

// Query data
const { data, error } = await supabase
  .from('students')
  .select('*')
  .eq('school_id', 'school_123');

// Insert data
const { data, error } = await supabase
  .from('enrollments')
  .insert({ student_id: 'stu_123', class_id: 'cls_456' });

// Subscribe to changes
supabase
  .channel('enrollments')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'enrollments' }, (payload) => {
    console.log('Change received:', payload);
  })
  .subscribe();
```

---

## 6. Cloud Providers

### 6.1 AWS

```typescript
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
};

// S3 - Upload file
await aws.s3.upload({
  Bucket: 'educi-documents',
  Key: 'reports/grade-report.pdf',
  Body: pdfBuffer,
  ContentType: 'application/pdf',
});

// SES - Send email
await aws.ses.sendEmail({
  Source: 'noreply@educi.com',
  Destination: { ToAddresses: ['student@example.com'] },
  Message: {
    Subject: { Data: 'Grade Report' },
    Body: { Html: { Data: '<h1>Your grades</h1>' } },
  },
});

// Lambda - Invoke function
await aws.lambda.invoke({
  FunctionName: 'process-grades',
  Payload: JSON.stringify({ studentId: 'stu_123' }),
});
```

### 6.2 Azure

```typescript
const azureConfig = {
  subscriptionId: process.env.AZURE_SUBSCRIPTION_ID,
  clientId: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  tenantId: process.env.AZURE_TENANT_ID,
};

// Blob Storage - Upload
await azure.blob.upload({
  containerName: 'documents',
  blobName: 'reports/grade-report.pdf',
  content: pdfBuffer,
});

// Cognitive Services - OCR
const ocrResult = await azure.cognitiveServices.read({
  imageUrl: 'https://example.com/document.jpg',
});
```

### 6.3 Cloudflare

```typescript
const cloudflareConfig = {
  apiKey: process.env.CLOUDFLARE_API_KEY,
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
};

// R2 Storage - Upload
await cloudflare.r2.putObject({
  bucket: 'educi-backups',
  key: 'db-backup-2026-07-29.sql',
  body: backupStream,
});

// Workers - Deploy
await cloudflare.workers.deploy({
  name: 'educi-api-worker',
  script: workerScript,
});
```

---

## 7. Payment Processors

### 7.1 Stripe

```typescript
const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

// Create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5000,  // $50.00
  currency: 'usd',
  metadata: {
    studentId: 'stu_123',
    invoiceId: 'inv_456',
  },
});

// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: 'cus_123',
  items: [{ price: 'price_educi_monthly' }],
});

// Create customer
const customer = await stripe.customers.create({
  email: 'parent@example.com',
  name: 'John Doe',
  metadata: { schoolId: 'school_123' },
});

// Handle webhook
app.post('/webhooks/stripe', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      handlePaymentSuccess(event.data.object);
      break;
    case 'invoice.payment_failed':
      handlePaymentFailure(event.data.object);
      break;
  }
  
  res.json({ received: true });
});
```

### 7.2 PayPal

```typescript
const paypalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID,
  clientSecret: process.env.PAYPAL_CLIENT_SECRET,
  mode: 'live',  // or 'sandbox'
};

// Create order
const order = await paypal.orders.create({
  intent: 'CAPTURE',
  purchase_units: [{
    amount: {
      currency_code: 'USD',
      value: '50.00',
    },
    description: 'Tuition Payment',
    custom_id: 'stu_123',
  }],
});

// Capture order
const capture = await paypal.orders.captureOrder(order.id);
```

---

## 8. African Mobile Money

### 8.1 Orange Money

```typescript
const orangeMoneyConfig = {
  merchantKey: process.env.ORANGE_MERCHANT_KEY,
  apiKey: process.env.ORANGE_API_KEY,
  environment: 'production',
  countryCode: 'SN',  // Senegal
};

// Initiate payment
const payment = await orangeMoney.payment({
  amount: 25000,
  currency: 'XOF',
  phone: '+221771234567',
  orderId: 'order_123',
  description: 'Tuition payment',
  callbackUrl: 'https://api.educi.com/webhooks/orange-money',
});

// Check status
const status = await orangeMoney.checkStatus(payment.payId);
```

### 8.2 MTN Mobile Money

```typescript
const mtnConfig = {
  subscriptionKey: process.env.MTN_SUBSCRIPTION_KEY,
  apiKey: process.env.MTN_API_KEY,
  userId: process.env.MTN_USER_ID,
  environment: 'production',
  baseUrl: 'https://proxy.momoapi.mtn.com',
};

// Request to pay
const payment = await mtn.requestToPay({
  amount: '25000',
  currency: 'XOF',
  externalId: 'order_123',
  payer: { partyIdType: 'MSISDN', partyId: '221771234567' },
  payerMessage: 'Tuition payment',
  payeeNote: 'EduCI payment',
});

// Check status
const status = await mtn.checkPaymentStatus(payment.externalId);
```

### 8.3 Wave

```typescript
const waveConfig = {
  apiKey: process.env.WAVE_API_KEY,
  environment: 'production',
};

// Create payment
const payment = await wave.payments.create({
  amount: 25000,
  currency: 'XOF',
  phone_number: '+221771234567',
  description: 'Tuition payment',
});

// Check status
const status = await wave.payments.get(payment.id);
```

### 8.4 MoneyFusion

```typescript
const moneyFusionConfig = {
  apiKey: process.env.MONEYFUSION_API_KEY,
  merchantId: process.env.MONEYFUSION_MERCHANT_ID,
  environment: 'production',
};

// Initiate payment across providers
const payment = await moneyFusion.initiatePayment({
  amount: 25000,
  currency: 'XOF',
  phone: '+221771234567',
  provider: 'orange_money',  // or 'mtn_money', 'wave'
  orderId: 'order_123',
});
```

---

## 9. AI Providers

### 9.1 OpenAI

```typescript
const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
};

// Chat completion
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'You are a helpful educational assistant.' },
    { role: 'user', content: 'Explain photosynthesis in simple terms.' },
  ],
  max_tokens: 1000,
  temperature: 0.7,
});

// Text embedding
const embedding = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'Educational content for knowledge base',
});

// Image generation
const image = await openai.images.generate({
  model: 'dall-e-3',
  prompt: 'Educational diagram of the water cycle',
  size: '1024x1024',
});
```

### 9.2 Anthropic

```typescript
const anthropicConfig = {
  apiKey: process.env.ANTHROPIC_API_KEY,
};

const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1000,
  messages: [
    { role: 'user', content: 'Help me understand calculus derivatives.' },
  ],
});
```

### 9.3 Other AI Providers

| Provider | Models | Use Case |
|---|---|---|
| **Google Gemini** | gemini-1.5-pro, gemini-1.5-flash | Multimodal, long context |
| **Mistral** | mistral-large, mistral-small | European languages, code |
| **DeepSeek** | deepseek-v3, deepseek-coder | Cost-effective, multilingual |

---

## 10. Developer Tools

### 10.1 GitHub

```typescript
const githubConfig = {
  token: process.env.GITHUB_TOKEN,
  org: 'educi-platform',
};

// List repositories
const repos = await github.repos.listForOrg({ org: 'educi-platform' });

// Create issue
await github.issues.create({
  owner: 'educi-platform',
  repo: 'backend',
  title: 'Bug: Grade calculation error',
  body: 'When submitting grades for...',
  labels: ['bug', 'high-priority'],
});

// Create pull request
const pr = await github.pulls.create({
  owner: 'educi-platform',
  repo: 'backend',
  title: 'feat: Add new grading system',
  head: 'feature/new-grading',
  base: 'main',
  body: 'This PR adds...',
});
```

### 10.2 GitLab

```typescript
const gitlabConfig = {
  token: process.env.GITLAB_TOKEN,
  projectId: process.env.GITLAB_PROJECT_ID,
};

// Create issue
await gitlab.issues.create({
  projectId: gitlabConfig.projectId,
  title: 'Bug: Grade calculation error',
  description: 'When submitting grades for...',
  labels: ['bug', 'high-priority'],
});
```

### 10.3 Jira

```typescript
const jiraConfig = {
  host: process.env.JIRA_HOST,
  email: process.env.JIRA_EMAIL,
  apiToken: process.env.JIRA_API_TOKEN,
};

// Create issue
await jira.issues.createIssue({
  fields: {
    project: { key: 'EDUCI' },
    summary: 'Grade calculation bug',
    description: 'When submitting grades...',
    issuetype: { name: 'Bug' },
    priority: { name: 'High' },
    assignee: { accountId: 'user_123' },
  },
});
```

### 10.4 Notion

```typescript
const notionConfig = {
  apiKey: process.env.NOTION_API_KEY,
};

// Create page
await notion.pages.create({
  parent: { database_id: 'db_123' },
  properties: {
    Name: { title: [{ text: { content: 'Course Materials' } }] },
    Status: { select: { name: 'Published' } },
  },
  children: [
    {
      type: 'heading_2',
      heading_2: { text: [{ text: { content: 'Module 1' } }] },
    },
  ],
});
```

---

## 11. Identity Providers

### 11.1 LDAP

```typescript
const ldapConfig = {
  url: process.env.LDAP_URL,
  bindDN: process.env.LDAP_BIND_DN,
  bindPassword: process.env.LDAP_BIND_PASSWORD,
  baseDN: process.env.LDAP_BASE_DN,
  userSearchBase: 'ou=users',
  groupSearchBase: 'ou=groups',
};

// Authenticate user
const user = await ldap.authenticate('username', 'password');

// Search users
const users = await ldap.search('(objectClass=person)', {
  attributes: ['cn', 'mail', 'memberOf'],
});
```

### 11.2 Active Directory

```typescript
const adConfig = {
  url: process.env.AD_URL,
  baseDN: process.env.AD_BASE_DN,
  username: process.env.AD_USERNAME,
  password: process.env.AD_PASSWORD,
};

// Authenticate
const user = await ad.authenticate('DOMAIN\\username', 'password');

// Get user groups
const groups = await ad.getUserGroups('username');
```

### 11.3 SAML

```typescript
const samlConfig = {
  entryPoint: process.env.SAML_ENTRY_POINT,
  issuer: process.env.SAML_ISSUER,
  cert: process.env.SAML_CERT,
  callbackUrl: 'https://api.educi.com/auth/saml/callback',
};

// Generate AuthnRequest
const authRequest = saml.generateAuthnRequest();

// Validate response
const profile = await saml.validateResponse(samlResponse);
```

---

## 12. Databases

### 12.1 PostgreSQL

```typescript
const postgresConfig = {
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  ssl: { rejectUnauthorized: false },
};

// Query data
const { rows } = await postgres.query(
  'SELECT * FROM students WHERE school_id = $1',
  ['school_123']
);
```

### 12.2 MongoDB

```typescript
const mongoConfig = {
  uri: process.env.MONGODB_URI,
  database: process.env.MONGODB_DATABASE,
};

const collection = mongo.db().collection('students');
const students = await collection.find({ schoolId: 'school_123' }).toArray();
```

---

## 13. Connector Health Monitoring

### 13.1 Health Status

```typescript
interface ConnectorHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency: number;
  errorRate: number;
  lastCheck: Date;
  uptime: number;
  rateLimit: {
    remaining: number;
    resetAt: Date;
  };
}
```

### 13.2 Health Dashboard

```typescript
// Get all connector health
GET /api/v1/connectors/health

// Response
{
  "google-workspace": {
    "status": "healthy",
    "latency": 150,
    "errorRate": 0.01,
    "uptime": 99.99
  },
  "stripe": {
    "status": "healthy",
    "latency": 200,
    "errorRate": 0,
    "uptime": 100
  },
  "twilio": {
    "status": "degraded",
    "latency": 500,
    "errorRate": 0.05,
    "uptime": 99.5
  }
}
```

### 13.3 Alerting

```yaml
groups:
  - name: connectors
    rules:
      - alert: ConnectorUnhealthy
        expr: connector_health_status == 2
        for: 5m
        labels:
          severity: critical

      - alert: ConnectorHighLatency
        expr: connector_latency_seconds > 5
        for: 5m
        labels:
          severity: warning

      - alert: ConnectorHighErrorRate
        expr: connector_error_rate > 0.1
        for: 5m
        labels:
          severity: warning
```

---

## 14. Data Synchronization

### 14.1 Sync Modes

| Mode | Description | Use Case |
|---|---|---|
| **Full Sync** | Complete data refresh | Initial setup, data repair |
| **Incremental** | Changed records only | Regular sync |
| **Real-time** | Event-driven updates | Live data |
| **Bi-directional** | Two-way sync | Collaborative data |

### 14.2 Conflict Resolution

| Strategy | Description |
|---|---|
| **Last-write-wins** | Most recent update takes precedence |
| **Source-wins** | EduCI is source of truth |
| **Target-wins** | External system is source of truth |
| **Manual** | Queue for human review |
| **Custom** | Custom merge function |

### 14.3 Sync Configuration

```typescript
const syncConfig = {
  connectorId: 'google-workspace',
  entity: 'students',
  mode: 'incremental',
  direction: 'pull',  // 'pull' | 'push' | 'bi-directional'
  schedule: '*/15 * * * *',  // Every 15 minutes
  conflictResolution: 'source-wins',
  fieldMapping: {
    'google.id': 'externalId',
    'google.name': 'displayName',
    'google.email': 'email',
  },
  filters: {
    schoolId: 'school_123',
    status: 'active',
  },
  batchSize: 100,
  retryPolicy: {
    maxRetries: 3,
    backoffMultiplier: 2,
  },
};
```

### 14.4 Sync Monitoring

```typescript
// Get sync status
GET /api/v1/connectors/google-workspace/sync-status

// Response
{
  "lastSync": "2026-07-29T14:30:00Z",
  "nextSync": "2026-07-29T14:45:00Z",
  "duration": 120000,
  "recordsProcessed": 500,
  "recordsCreated": 10,
  "recordsUpdated": 25,
  "recordsDeleted": 2,
  "errors": []
}
```

---

*EduCI Connectors — Phase 3 Documentation*
*Last Updated: 2026-07-29*
