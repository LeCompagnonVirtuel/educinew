# Interoperability — Sécurité

> Version : 1.0
> Statut : Validé

---

## 1. Threat Model

| Menace | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Token volé | Élevé | Moyenne | Rotation + Expiry court |
| Man-in-the-middle | Élevé | Faible | TLS 1.3 + Certificate Pinning |
| Replay attack | Moyen | Moyenne | Nonce + Timestamp validation |
| Injection | Élevé | Faible | Input validation Zod |
| Data exfiltration | Élevé | Faible | Encryption + RLS |
| Connector impersonation | Élevé | Faible | HMAC + Secret rotation |
| API abuse | Moyen | Élevée | Rate limiting + WAF |

---

## 2. Authentification par Protocol

### 2.1 LTI 1.3 Security

```typescript
class LTISecurity {
  // 1. JWT Validation avec JWKS
  async validateToken(idToken: string, connectorId: string): Promise<LTIPayload> {
    const connector = await this.getConnector(connectorId);
    const jwks = await this.fetchJWKS(connector.config.jwks_url);

    const decoded = jwt.verify(idToken, jwks, {
      algorithms: ["RS256"],
      issuer: connector.config.platform_id,
      audience: connector.config.client_id,
      clockTolerance: 30 // seconds
    });

    // 2. Validate nonce (anti-replay)
    await this.validateNonce(decoded.nonce, decoded.sub);

    // 3. Validate deployment_id
    if (decoded.deployment_id !== connector.config.deployment_id) {
      throw new SecurityError("Invalid deployment_id");
    }

    // 4. Validate message timestamp
    const msgTime = new Date(decoded.iat * 1000);
    const drift = Date.now() - msgTime.getTime();
    if (drift > 300000) { // 5 minutes max
      throw new SecurityError("Message too old");
    }

    return decoded;
  }

  // HMAC pour webhook verification
  verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  }
}
```

### 2.2 xAPI Security

```typescript
class XAPISecurity {
  // Basic Auth ou OAuth 2.0
  async authenticate(req: Request, connector: Connector): Promise<boolean> {
    const authHeader = req.headers.get("Authorization");

    if (authHeader?.startsWith("Basic ")) {
      // xAPI LRS Basic Auth
      const credentials = Buffer.from(
        authHeader.slice(6), "base64"
      ).toString("utf-8");
      const [username, password] = credentials.split(":");

      return this.verifyLRScredentials(
        connector.config.lrs_endpoint,
        username,
        password
      );
    }

    if (authHeader?.startsWith("Bearer ")) {
      // OAuth 2.0
      const token = authHeader.slice(7);
      return this.verifyOAuthToken(token, connector);
    }

    return false;
  }

  // Statement signature (xAPI Extension)
  signStatement(statement: XAPIStatement, secret: string): string {
    const payload = JSON.stringify({
      actor: statement.actor,
      verb: statement.verb,
      object: statement.object
    });
    return crypto.createHmac("sha256", secret).update(payload).digest("hex");
  }
}
```

---

## 3. Encryption

### 3.1 Secrets Chiffrement

```typescript
class ConnectorEncryption {
  private algorithm = "aes-256-gcm";

  async encryptConfig(
    config: Record<string, unknown>,
    masterKey: string
  ): Promise<EncryptedPayload> {
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash("sha256").update(masterKey).digest();

    const cipher = crypto.createCipheriv(this.algorithm, key, iv, {
      authTagLength: 16
    });

    const plaintext = JSON.stringify(config);
    const encrypted = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return {
      iv: iv.toString("hex"),
      encrypted: encrypted.toString("hex"),
      authTag: authTag.toString("hex"),
      algorithm: this.algorithm
    };
  }

  async decryptConfig(
    payload: EncryptedPayload,
    masterKey: string
  ): Promise<Record<string, unknown>> {
    const key = crypto.createHash("sha256").update(masterKey).digest();
    const iv = Buffer.from(payload.iv, "hex");
    const authTag = Buffer.from(payload.authTag, "hex");
    const encrypted = Buffer.from(payload.encrypted, "hex");

    const decipher = crypto.createDecipheriv(this.algorithm, key, iv, {
      authTagLength: 16
    });
    decipher.setAuthTag(authTag);

    const plaintext = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]).toString("utf8");

    return JSON.parse(plaintext);
  }
}
```

### 3.2 Data in Transit

```
Client                  EduCI Gateway              External
  │                          │                         │
  │── HTTPS (TLS 1.3) ─────▶│                         │
  │   ECDHE + AES-256-GCM   │── mTLS ────────────────▶│
  │                          │   (optionnel)           │
  │◀── 200 OK ──────────────│◀── Response ────────────│
```

| Layer | Protocol | Cipher |
|-------|----------|--------|
| Transport | TLS 1.3 | ECDHE-P256-AES256-GCM |
| API Auth | JWT RS256 | RSA-2048 |
| Webhook | HMAC-SHA256 | Symmetric |
| Storage | AES-256-GCM | Envelope |

---

## 4. Rate Limiting

```typescript
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyGenerator: (req: Request) => string;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // Global
  default: { windowMs: 60000, maxRequests: 100, keyGenerator: getClientId },

  // Per protocol
  "lti:launch": { windowMs: 60000, maxRequests: 30, keyGenerator: getSchoolId },
  "lti:grade": { windowMs: 60000, maxRequests: 60, keyGenerator: getConnectorId },
  "xapi:statement": { windowMs: 60000, maxRequests: 200, keyGenerator: getSchoolId },
  "caldav:sync": { windowMs: 300000, maxRequests: 10, keyGenerator: getConnectorId },

  // Webhook callbacks
  "webhook:callback": { windowMs: 60000, maxRequests: 50, keyGenerator: getConnectorId }
};

class RateLimiter {
  private redis: Redis;

  async check(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    const pipeline = this.redis.pipeline();
    pipeline.zremrangebyscore(key, 0, windowStart);
    pipeline.zadd(key, now, `${now}-${crypto.randomUUID()}`);
    pipeline.zcard(key);
    pipeline.expire(key, Math.ceil(config.windowMs / 1000));

    const results = await pipeline.exec();
    const count = results[2][1] as number;

    return {
      allowed: count <= config.maxRequests,
      remaining: Math.max(0, config.maxRequests - count),
      resetAt: now + config.windowMs,
      retryAfter: count > config.maxRequests
        ? Math.ceil(config.windowMs / 1000)
        : undefined
    };
  }
}
```

---

## 5. Input Validation

```typescript
import { z } from "zod";

const ConnectorConfigSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("lti"),
    platform_id: z.string().url(),
    client_id: z.string().min(1),
    deployment_id: z.string().min(1),
    jwks_url: z.string().url(),
    auth_url: z.string().url(),
    redirect_uris: z.array(z.string().url()).min(1)
  }),
  z.object({
    type: z.literal("xapi"),
    endpoint: z.string().url(),
    username: z.string().min(1),
    password: z.string().min(8),
    version: z.enum(["1.0.0", "1.0.1", "1.0.2", "1.0.3"])
  }),
  z.object({
    type: z.literal("caldav"),
    server_url: z.string().url(),
    calendar_id: z.string().min(1),
    auth_type: z.enum(["basic", "oauth2"]),
    credentials: z.record(z.string())
  })
]);

const XAPIStatementSchema = z.object({
  actor: z.object({
    mbox: z.string().email().optional(),
    name: z.string().optional(),
    openid: z.string().url().optional()
  }).refine(obj => obj.mbox || obj.name || obj.openid),
  verb: z.object({
    id: z.string().url(),
    display: z.record(z.string())
  }),
  object: z.object({
    id: z.string().url(),
    definition: z.object({
      name: z.record(z.string()),
      type: z.string().url()
    }).optional()
  }),
  result: z.object({
    score: z.object({
      scaled: z.number().min(0).max(1).optional(),
      raw: z.number().optional(),
      max: z.number().optional()
    }).optional(),
    completion: z.boolean().optional(),
    success: z.boolean().optional(),
    duration: z.string().regex(/^PT\d+[HM]$/).optional()
  }).optional()
});
```

---

## 6. Audit Logging

```typescript
interface SecurityAuditEntry {
  id: string;
  timestamp: string;
  event_type: "auth_success" | "auth_failure" | "rate_limit" |
             "permission_denied" | "config_change" | "data_access";
  protocol: string;
  connector_id?: string;
  school_id: string;
  actor_id?: string;
  actor_ip: string;
  user_agent: string;
  resource_type?: string;
  resource_id?: string;
  metadata: Record<string, unknown>;
  risk_level: "low" | "medium" | "high" | "critical";
}

class SecurityAuditLogger {
  async log(entry: Omit<SecurityAuditEntry, "id" | "timestamp">): Promise<void> {
    const fullEntry: SecurityAuditEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };

    // Immutability check
    const hash = this.computeHash(fullEntry);

    await this.supabase.from("security_audit_log").insert({
      ...fullEntry,
      content_hash: hash
    });

    // Alert on critical events
    if (entry.risk_level === "critical") {
      await this.alertOpsTeam(fullEntry);
    }
  }

  private computeHash(entry: SecurityAuditEntry): string {
    const payload = JSON.stringify(entry);
    return crypto.createHash("sha256").update(payload).digest("hex");
  }
}
```

---

## 7. Security Checklist

- [ ] TLS 1.3 obligatoire sur tous les endpoints
- [ ] JWKS rotation automatique configurée
- [ ] Secrets chiffrés au repos (AES-256-GCM)
- [ ] Rate limiting par école et par connecteur
- [ ] Input validation (Zod) sur toutes les entrées
- [ ] Audit log immuable avec hash
- [ ] Alertes automatiques sur événements critiques
- [ ] Penetration test validé
- [ ] OWASP Top 10 couvert
