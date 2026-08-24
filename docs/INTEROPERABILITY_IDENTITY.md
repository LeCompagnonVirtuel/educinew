# Interoperability — Identity & SSO

> Version : 1.0
> Statut : Validé

---

## 1. Identity Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   IDENTITY LAYER                        │
├──────────────┬──────────────┬──────────────────────────┤
│  EduCI Auth  │  External IdP │  Federation Service      │
│  (Supabase)  │  (OIDC/SAML) │  (Attribute Mapping)     │
└──────┬───────┴──────┬───────┴────────────┬─────────────┘
       │              │                    │
       ▼              ▼                    ▼
┌─────────────────────────────────────────────────────────┐
│                 IDENTITY STORE                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │  edu_users  │  │  idp_links │  │  attributes │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Supported Protocols

### 2.1 OpenID Connect

```typescript
interface OIDCProvider {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  jwks_uri: string;
  end_session_endpoint: string;
  scopes_supported: string[];
  response_types_supported: string[];
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
}

class OIDCConnector {
  async discover(issuer: string): Promise<OIDCProvider> {
    const response = await fetch(`${issuer}/.well-known/openid-configuration`);
    return response.json();
  }

  async authorize(params: {
    provider: OIDCProvider;
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
    nonce: string;
  }): Promise<string> {
    const url = new URL(params.provider.authorization_endpoint);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", params.client_id);
    url.searchParams.set("redirect_uri", params.redirect_uri);
    url.searchParams.set("scope", params.scope);
    url.searchParams.set("state", params.state);
    url.searchParams.set("nonce", params.nonce);
    url.searchParams.set("prompt", "consent");
    return url.toString();
  }

  async exchangeCode(params: {
    provider: OIDCProvider;
    code: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
  }): Promise<OIDCTokens> {
    const response = await fetch(params.provider.token_endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: params.code,
        client_id: params.client_id,
        client_secret: params.client_secret,
        redirect_uri: params.redirect_uri
      })
    });
    return response.json();
  }
}
```

### 2.2 SAML 2.0

```typescript
class SAMLConnector {
  async generateAuthnRequest(provider: SAMLProvider): Promise<string> {
    const id = `_saml_request_${crypto.randomUUID()}`;
    const issueInstant = new Date().toISOString();

    const request = `
      <samlp:AuthnRequest
        xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
        xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
        ID="${id}"
        Version="2.0"
        IssueInstant="${issueInstant}"
        AssertionConsumerServiceURL="${provider.acs_url}"
        ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST">
        <saml:Issuer>${provider.sp_entity_id}</saml:Issuer>
        <samlp:NameIDPolicy
          Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
          AllowCreate="true"/>
      </samlp:AuthnRequest>
    `;

    const compressed = zlib.deflateRawSync(Buffer.from(request));
    return Buffer.from(compressed).toString("base64");
  }

  async validateResponse(
    response: string,
    provider: SAMLProvider
  ): Promise<SAMLAssertion> {
    // 1. Base64 decode
    const decoded = Buffer.from(response, "base64").toString("utf8");

    // 2. Parse XML
    const doc = new DOMParser().parseFromString(decoded, "text/xml");

    // 3. Validate signature
    const isValid = await this.validateSignature(doc, provider.certificate);
    if (!isValid) throw new Error("Invalid SAML signature");

    // 4. Extract assertion
    const assertion = this.extractAssertion(doc);

    // 5. Validate conditions
    this.validateConditions(assertion, provider);

    return assertion;
  }
}
```

---

## 3. Attribute Mapping

```typescript
interface AttributeMapping {
  idp_attribute: string;
  local_attribute: string;
  transform?: (value: unknown) => unknown;
  required: boolean;
  default_value?: unknown;
}

const DEFAULT_OIDC_MAPPING: AttributeMapping[] = [
  { idp_attribute: "sub", local_attribute: "external_id", required: true },
  { idp_attribute: "email", local_attribute: "email", required: true },
  { idp_attribute: "given_name", local_attribute: "first_name", required: true },
  { idp_attribute: "family_name", local_attribute: "last_name", required: true },
  {
    idp_attribute: "email_verified",
    local_attribute: "email_verified",
    transform: (v) => v === true || v === "true",
    required: false
  },
  {
    idp_attribute: "roles",
    local_attribute: "role",
    transform: (roles: string[]) => {
      const roleMap: Record<string, UserRole> = {
        "admin": "ADMIN",
        "teacher": "ENSEIGNANT",
        "student": "ELEVE",
        "parent": "PARENT"
      };
      return roleMap[roles?.[0]] || "ELEVE";
    },
    required: false,
    default_value: "ELEVE"
  }
];

class AttributeMapper {
  mapAttributes(
    idpClaims: Record<string, unknown>,
    mapping: AttributeMapping[]
  ): Record<string, unknown> {
    const mapped: Record<string, unknown> = {};

    for (const rule of mapping) {
      let value = idpClaims[rule.idp_attribute];

      if (value === undefined || value === null) {
        if (rule.required) {
          throw new Error(`Required attribute missing: ${rule.idp_attribute}`);
        }
        value = rule.default_value;
      }

      if (rule.transform && value !== undefined) {
        value = rule.transform(value);
      }

      mapped[rule.local_attribute] = value;
    }

    return mapped;
  }
}
```

---

## 4. SSO Session Management

```typescript
interface SSOSession {
  id: string;
  user_id: string;
  school_id: string;
  idp_connector_id: string;
  idp_session_id?: string;
  access_token_hash: string;
  refresh_token_hash?: string;
  expires_at: string;
  created_at: string;
  ip_address: string;
  user_agent: string;
}

class SSOSessionManager {
  async createSession(params: {
    user_id: string;
    school_id: string;
    connector_id: string;
    tokens: OIDCTokens;
    request: Request;
  }): Promise<SSOSession> {
    const session: SSOSession = {
      id: crypto.randomUUID(),
      user_id: params.user_id,
      school_id: params.school_id,
      idp_connector_id: params.connector_id,
      access_token_hash: this.hashToken(params.tokens.access_token),
      refresh_token_hash: params.tokens.refresh_token
        ? this.hashToken(params.tokens.refresh_token)
        : undefined,
      expires_at: new Date(Date.now() + params.tokens.expires_in * 1000).toISOString(),
      created_at: new Date().toISOString(),
      ip_address: this.extractIP(params.request),
      user_agent: params.request.headers.get("User-Agent") || ""
    };

    await this.supabase.from("sso_sessions").insert(session);
    return session;
  }

  async validateSession(sessionId: string): Promise<boolean> {
    const { data } = await this.supabase
      .from("sso_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (!data) return false;
    if (new Date(data.expires_at) < new Date()) {
      await this.invalidateSession(sessionId);
      return false;
    }

    return true;
  }

  async logoutAllSessions(userId: string, schoolId: string): Promise<void> {
    await this.supabase
      .from("sso_sessions")
      .delete()
      .eq("user_id", userId)
      .eq("school_id", schoolId);
  }
}
```

---

## 5. Multi-IdP Support

```typescript
interface IdPConfiguration {
  school_id: string;
  primary_provider: "educi" | "oidc" | "saml" | "social";
  oidc_providers: OIDCProviderConfig[];
  saml_providers: SAMLProviderConfig[];
  fallback_to_local: boolean;
  attribute_mappings: Record<string, AttributeMapping[]>;
}

class MultiIdPManager {
  async resolveProvider(
    schoolId: string,
    email: string
  ): Promise<IdPConfiguration> {
    const config = await this.getIdPConfig(schoolId);

    // Check email domain routing
    const emailDomain = email.split("@")[1];

    for (const provider of config.oidc_providers) {
      if (provider.domain === emailDomain) {
        return { ...config, primary_provider: "oidc" };
      }
    }

    // Default to EduCI local auth
    return config;
  }

  async getSSOUrl(schoolId: string, email: string): Promise<string> {
    const config = await this.resolveProvider(schoolId, email);

    switch (config.primary_provider) {
      case "oidc":
        return this.getOIDCAuthUrl(config.oidc_providers[0]);
      case "saml":
        return this.getSAMLAuthUrl(config.saml_providers[0]);
      case "educi":
      default:
        return `/auth/login?email=${encodeURIComponent(email)}`;
    }
  }
}
```

---

## 6. Database Schema

```sql
CREATE TABLE idp_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  school_id UUID NOT NULL REFERENCES schools(id),
  connector_id UUID NOT NULL REFERENCES interop_connectors(id),
  external_id TEXT NOT NULL,
  idp_type TEXT NOT NULL,
  attributes JSONB DEFAULT '{}',
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, external_id, idp_type)
);

CREATE TABLE sso_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  school_id UUID NOT NULL REFERENCES schools(id),
  idp_connector_id UUID NOT NULL REFERENCES interop_connectors(id),
  access_token_hash TEXT NOT NULL,
  refresh_token_hash TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_idp_links_user ON idp_links(user_id, school_id);
CREATE INDEX idx_idp_links_external ON idp_links(external_id, idp_type);
CREATE INDEX idx_sso_sessions_user ON sso_sessions(user_id, expires_at);
```
