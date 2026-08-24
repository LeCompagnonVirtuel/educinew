# Interoperability — Connectors

> Version : 1.0
> Statut : Validé

---

## 1. Supported Connectors

| Connector | Type | Status | Priority | Protocol |
|-----------|------|--------|----------|----------|
| Moodle | LTI 1.3 | Active | P0 | LTI |
| Canvas | LTI 1.3 | Active | P0 | LTI |
| Google Classroom | REST | Active | P0 | OAuth 2.0 |
| Blackboard | LTI 1.3 | Planned | P1 | LTI |
| Schoology | REST | Planned | P1 | OAuth 2.0 |
| Edmodo | REST | Planned | P2 | API Key |
| Chamilo | SCORM | Planned | P2 | SCORM |
| xAPI LRS | xAPI | Active | P0 | xAPI/Basic |

---

## 2. Connector Registry

```typescript
interface ConnectorDefinition {
  id: string;
  name: string;
  type: "lti" | "xapi" | "caldav" | "oidc" | "saml" | "rest" | "custom";
  version: string;
  description: string;
  capabilities: ConnectorCapability[];
  config_schema: JSONSchema;
  required_scopes: string[];
  documentation_url: string;
  vendor: string;
  icon_url?: string;
}

interface ConnectorCapability {
  name: string;
  description: string;
  direction: "inbound" | "outbound" | "bidirectional";
  entities: string[];
  protocol: string;
}

const CONNECTOR_REGISTRY: ConnectorDefinition[] = [
  {
    id: "moodle-lti",
    name: "Moodle LTI Integration",
    type: "lti",
    version: "1.3.0",
    description: "Intégration complète avec Moodle via LTI 1.3",
    capabilities: [
      {
        name: "grade_sync",
        description: "Synchronisation des notes",
        direction: "bidirectional",
        entities: ["grades", "assignments"],
        protocol: "LTI AGS"
      },
      {
        name: "roster_sync",
        description: "Synchronisation des inscriptions",
        direction: "inbound",
        entities: ["students", "courses"],
        protocol: "LTI NRPS"
      },
      {
        name: "deep_linking",
        description: "Lien direct vers les ressources",
        direction: "outbound",
        entities: ["content"],
        protocol: "LTI Deep Linking"
      }
    ],
    config_schema: {
      type: "object",
      properties: {
        platform_id: { type: "string", format: "uri" },
        client_id: { type: "string" },
        deployment_id: { type: "string" },
        jwks_url: { type: "string", format: "uri" },
        auth_url: { type: "string", format: "uri" }
      },
      required: ["platform_id", "client_id", "deployment_id", "jwks_url", "auth_url"]
    },
    required_scopes: [
      "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
      "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
      "https://purl.imsglobal.org/spec/lti-ags/scope/score"
    ],
    documentation_url: "https://docs.moodle.org/dev/LTI",
    vendor: "Moodle Pty Ltd"
  },
  {
    id: "google-classroom-rest",
    name: "Google Classroom REST API",
    type: "rest",
    version: "v1",
    description: "Intégration avec Google Classroom via REST API",
    capabilities: [
      {
        name: "course_sync",
        description: "Synchronisation des cours",
        direction: "bidirectional",
        entities: ["courses"],
        protocol: "REST/JSON"
      },
      {
        name: "student_sync",
        description: "Synchronisation des élèves",
        direction: "inbound",
        entities: ["students"],
        protocol: "REST/JSON"
      },
      {
        name: "grade_export",
        description: "Export des notes vers Google Classroom",
        direction: "outbound",
        entities: ["grades"],
        protocol: "REST/JSON"
      }
    ],
    config_schema: {
      type: "object",
      properties: {
        service_account_key: { type: "string" },
        impersonated_user: { type: "string", format: "email" },
        domain: { type: "string" }
      },
      required: ["service_account_key", "impersonated_user"]
    },
    required_scopes: [
      "https://www.googleapis.com/auth/classroom.courses",
      "https://www.googleapis.com/auth/classroom.rosters",
      "https://www.googleapis.com/auth/classroom.coursework.me"
    ],
    documentation_url: "https://developers.google.com/classroom",
    vendor: "Google"
  }
];
```

---

## 3. LTI Connector Implementation

```typescript
class LTIConnector implements BaseConnector {
  async handleLaunch(request: LTILaunchRequest): Promise<LTILaunchResponse> {
    // 1. Verify JWT
    const payload = await this.verifyLTIToken(request.id_token);

    // 2. Map user
    const user = await this.findOrCreateUser({
      external_id: payload.sub,
      email: payload.email,
      name: payload.name,
      roles: this.mapLTIRoles(payload.roles)
    });

    // 3. Create LTI session
    const session = await this.createLTISession({
      user_id: user.id,
      connector_id: this.connector.id,
      context_id: payload.context?.id,
      resource_link_id: payload.resource_link?.id,
      roles: payload.roles
    });

    // 4. Return deep link or launch resource
    if (payload.message_type === "LtiDeepLinkingRequest") {
      return this.handleDeepLinking(payload);
    }

    return {
      status: 302,
      redirect: `/lti/resource/${session.id}`
    };
  }

  async syncGrades(params: {
    course_id: string;
    grades: Grade[];
  }): Promise<SyncResult> {
    const lineItems = await this.getLTIAGS().getLineItems(params.course_id);

    let synced = 0;
    for (const grade of params.grades) {
      const lineItem = lineItems.find(li =>
        li.resourceId === grade.assignment_id
      );

      if (lineItem) {
        await this.getLTIAGS().postScore(lineItem.id, {
          userId: grade.student_external_id,
          scoreGiven: grade.score,
          scoreMaximum: grade.max_score,
          timestamp: new Date().toISOString(),
          activityProgress: "Completed",
          gradingProgress: "FullyGraded"
        });
        synced++;
      }
    }

    return {
      synced,
      failed: params.grades.length - synced,
      errors: []
    };
  }
}
```

---

## 4. xAPI Connector Implementation

```typescript
class XAPIConnector implements BaseConnector {
  private lrsClient: LRSClient;

  constructor(config: XAPIConnectorConfig) {
    this.lrsClient = new LRSClient({
      endpoint: config.endpoint,
      username: config.username,
      password: config.password
    });
  }

  async sendStatement(statement: XAPIStatement): Promise<string> {
    const response = await this.lrsClient.sendStatement(statement);
    return response.id;
  }

  async sendBatch(statements: XAPIStatement[]): Promise<SendResult> {
    const response = await this.lrsClient.sendStatements(statements);
    return {
      accepted: response.length,
      rejected: 0,
      statement_ids: response.map(r => r.id)
    };
  }

  async fetchStatements(params: {
    verb?: string;
    agent?: string;
    activity?: string;
    since?: string;
    limit: number;
  }): Promise<XAPIStatement[]> {
    const filters: Record<string, string> = {};
    if (params.verb) filters.verb = params.verb;
    if (params.agent) filters.agent = params.agent;
    if (params.activity) filters.activity = params.activity;
    if (params.since) filters.since = params.since;

    const response = await this.lrsClient.getStatements({
      filters,
      limit: params.limit
    });

    return response.statements;
  }

  async syncFromLRS(params: {
    since: string;
    entity_types: string[];
  }): Promise<SyncResult> {
    const statements = await this.fetchStatements({
      since: params.since,
      limit: 1000
    });

    let processed = 0;
    for (const statement of statements) {
      await this.processStatement(statement);
      processed++;
    }

    return {
      synced: processed,
      failed: 0,
      errors: []
    };
  }
}
```

---

## 5. Google Classroom Connector

```typescript
class GoogleClassroomConnector implements BaseConnector {
  private client: classroom_v1.Classroom;

  constructor(config: GoogleClassroomConfig) {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(config.service_account_key),
      scopes: ["https://www.googleapis.com/auth/classroom"],
      clientOptions: {
        subject: config.impersonated_user
      }
    });

    this.client = new classroom_v1.Classroom({ auth });
  }

  async syncCourses(): Promise<Course[]> {
    const courses = await this.client.courses.list({
      courseStates: ["ACTIVE"],
      pageSize: 100
    });

    return courses.data.courses?.map(c => ({
      id: c.id || "",
      name: c.name || "",
      section: c.section || "",
      description: c.description || "",
      teacher: c.teacherId || ""
    })) || [];
  }

  async syncStudents(courseId: string): Promise<Student[]> {
    const students = await this.client.courses.students.list({
      courseId,
      pageSize: 100
    });

    return students.data.students?.map(s => ({
      id: s.userId || "",
      name: s.profile?.name?.fullName || "",
      email: s.profile?.emailAddress || ""
    })) || [];
  }

  async exportGrades(courseId: string, grades: Grade[]): Promise<ExportResult> {
    let exported = 0;

    for (const grade of grades) {
      try {
        // Create coursework if not exists
        const coursework = await this.ensureCoursework(courseId, grade);

        // Post grade
        await this.client.courses.courseWork.studentSubmissions.patchSubmissions({
          courseId,
          courseWorkId: coursework.id || "",
          requestBody: {
            draftGrade: grade.score.toString()
          }
        });

        exported++;
      } catch (error) {
        console.error(`Failed to export grade for student ${grade.student_id}`);
      }
    }

    return { exported, failed: grades.length - exported };
  }
}
```

---

## 6. Connector Management API

### 6.1 List Available Connectors

```http
GET /api/v1/interop/connectors/available
```

**Response 200:**
```json
{
  "connectors": [
    {
      "id": "moodle-lti",
      "name": "Moodle LTI Integration",
      "type": "lti",
      "version": "1.3.0",
      "status": "ready",
      "capabilities": ["grade_sync", "roster_sync", "deep_linking"],
      "config_fields": ["platform_id", "client_id", "deployment_id", "jwks_url"]
    },
    {
      "id": "google-classroom-rest",
      "name": "Google Classroom REST API",
      "type": "rest",
      "version": "v1",
      "status": "ready",
      "capabilities": ["course_sync", "student_sync", "grade_export"],
      "config_fields": ["service_account_key", "impersonated_user"]
    }
  ]
}
```

### 6.2 Test Connector

```http
POST /api/v1/interop/connectors/{id}/test
```

**Request Body:**
```json
{
  "test_type": "connectivity|auth|sync",
  "config": {
    "platform_id": "https://moodle.example.com",
    "client_id": "test_client",
    "deployment_id": "1",
    "jwks_url": "https://moodle.example.com/certs",
    "auth_url": "https://moodle.example.com/token"
  }
}
```

**Response 200:**
```json
{
  "test_id": "test_abc123",
  "connector_id": "moodle-lti",
  "results": {
    "connectivity": {
      "status": "passed",
      "latency_ms": 120
    },
    "authentication": {
      "status": "passed",
      "token_type": "Bearer"
    },
    "capabilities": {
      "grade_sync": "available",
      "roster_sync": "available",
      "deep_linking": "available"
    }
  },
  "tested_at": "2026-08-07T14:00:00Z"
}
```

---

## 7. Database Schema

```sql
CREATE TABLE connector_definitions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  version TEXT NOT NULL,
  description TEXT,
  capabilities JSONB NOT NULL,
  config_schema JSONB NOT NULL,
  required_scopes TEXT[] DEFAULT '{}',
  documentation_url TEXT,
  vendor TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE connector_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  definition_id TEXT NOT NULL REFERENCES connector_definitions(id),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  config_encrypted JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  last_test_at TIMESTAMPTZ,
  last_test_result JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_instances_school ON connector_instances(school_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_instances_definition ON connector_instances(definition_id);
```
