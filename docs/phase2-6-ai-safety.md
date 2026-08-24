# Phase 2.6: AI Safety and Moderation

## Overview

Le module AI Safety d'EduCI assure la sécurité et la modération de toutes les interactions IA : filtrage de contenu, détection de PII, prévention des abus, et conformité aux réglementations. Il est spécialement conçu pour protéger les élèves mineurs dans un contexte éducatif ivoirien.

### Capacités

- Filtrage de contenu multi-niveaux
- Détection et masquage de PII (Informations Personnelles Identifiantes)
- Prévention des abus et manipulations
- Audit trail complet
- Conformité RGPD et lois ivoiriennes
- Modération humaine intégrée
- Alertes en temps réel
- Rapports de sécurité

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│            AI Safety Service                 │
├──────────┬──────────┬──────────┬────────────┤
│ Content  │   PII    │  Abuse   │  Audit     │
│ Filter   │ Detector │  Prev.   │  Logger    │
├──────────┴──────────┴──────────┴────────────┤
│              Safety Layers                    │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│Input │Mod.  │Out.  │PII   │Rate  │ Human    │
│Filter│Layer │Filter│Mask  │Limit │ Review   │
└──────┴──────┴──────┴──────┴──────┴──────────┘
```

### Modèles de données

```typescript
interface AISafetyConfig {
  id: string;
  schoolId?: string;
  level: AISafetyLevel;
  rules: AISafetyRule[];
  filters: AISafetyFilter[];
  rateLimits: AISafetyRateLimit[];
  auditSettings: AISafetyAuditSettings;
  notificationSettings: AISafetyNotificationSettings;
  createdAt: string;
  updatedAt: string;
}

type AISafetyLevel = 'low' | 'medium' | 'high' | 'maximum';

interface AISafetyRule {
  id: string;
  name: string;
  description: string;
  category: ContentFilterCategory;
  action: 'block' | 'warn' | 'log' | 'modify';
  severity: 'low' | 'medium' | 'high' | 'critical';
  pattern?: string;
  keywords?: string[];
  enabled: boolean;
  priority: number;
}

type ContentFilterCategory =
  | 'violence' | 'hate_speech' | 'sexual_content'
  | 'self_harm' | 'drug_related' | 'personal_info'
  | 'spam' | 'inappropriate_language' | 'bullying'
  | 'academic_dishonesty' | 'external_threats';

interface PIIItem {
  type: PIIDetectionType;
  value: string;
  startIndex: number;
  endIndex: number;
  confidence: number;
  masked: boolean;
}

type PIIDetectionType =
  | 'email' | 'phone' | 'address' | 'credit_card'
  | 'national_id' | 'bank_account' | 'medical_record'
  | 'social_media' | 'name' | 'school_name'
  | 'parent_name' | 'location';

interface SafetyCheckResult {
  safe: boolean;
  violations: SafetyViolation[];
  piiItems: PIIItem[];
  riskScore: number;
  recommendations: string[];
  action: SafetyAction;
}

interface SafetyViolation {
  ruleId: string;
  category: ContentFilterCategory;
  severity: string;
  matchedContent: string;
  position: { start: number; end: number };
  suggestedAction: string;
}

interface AISafetyAuditEntry {
  id: string;
  schoolId: string;
  userId?: string;
  eventType: SafetyAuditEventType;
  eventTypeVersion: number;
  eventData: Record<string, unknown>;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

type SafetyAuditEventType =
  | 'content_filtered' | 'pii_detected' | 'abuse_attempt'
  | 'rate_limit_exceeded' | 'unauthorized_access' | 'data_export'
  | 'config_changed' | 'rule_added' | 'rule_modified'
  | 'human_review_required' | 'safety_alert';
```

## Configuration

### Niveaux de sécurité

```typescript
import { AI_SAFETY_CONFIG } from '@educi/config';

// Niveau de sécurité par défaut
const defaultSafetyLevel = AI_SAFETY_CONFIG.defaultLevel; // 'high'

// Configuration par niveau
const safetyLevels = AI_SAFETY_CONFIG.levels;
/*
{
  low: {
    contentFilter: false,
    piiDetection: true,
    abusePrevention: false,
    rateLimit: 100,
    auditLevel: "basic",
  },
  medium: {
    contentFilter: true,
    piiDetection: true,
    abusePrevention: true,
    rateLimit: 50,
    auditLevel: "standard",
  },
  high: {
    contentFilter: true,
    piiDetection: true,
    abusePrevention: true,
    rateLimit: 20,
    auditLevel: "detailed",
    humanReview: true,
  },
  maximum: {
    contentFilter: true,
    piiDetection: true,
    abusePrevention: true,
    rateLimit: 10,
    auditLevel: "full",
    humanReview: true,
    realTimeAlerts: true,
  }
}
*/
```

### Filtres de contenu

```typescript
const contentFilters = AI_SAFETY_CONFIG.contentFilters;
/*
[
  {
    id: "violence_filter",
    category: "violence",
    action: "block",
    severity: "high",
    keywords: ["tuer", "violence", "arme", "combat"],
    patterns: [/kill\s+you/i, /violence/i],
    enabled: true,
  },
  {
    id: "bullying_filter",
    category: "bullying",
    action: "warn",
    severity: "medium",
    keywords: ["idiot", "nul", "stupide", "moche"],
    patterns: [],
    enabled: true,
  },
  {
    id: "pii_filter",
    category: "personal_info",
    action: "modify",
    severity: "high",
    patterns: [
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      /\b\d{10}\b/g,
      /\b\d{13}\b/g,
    ],
    enabled: true,
  }
]
*/
```

### Détection PII

```typescript
const piiConfig = AI_SAFETY_CONFIG.piiDetection;
/*
{
  enabled: true,
  types: [
    { type: "email", pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, action: "mask" },
    { type: "phone", pattern: /(\+225|00225)?[\s.-]?\d{2}[\s.-]?\d{3}[\s.-]?\d{4}/g, action: "mask" },
    { type: "national_id", pattern: /\b\d{13}\b/g, action: "mask" },
    { type: "credit_card", pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, action: "mask" },
    { type: "address", pattern: /\b\d+\s+(rue|avenue|boulevard|quartier|ville)\b/gi, action: "mask" },
  ],
  maskCharacter: "*",
  maskEmails: true,
  maskPhones: true,
  storeOriginal: false,
}
*/
```

### Prévention des abus

```typescript
const abusePrevention = AI_SAFETY_CONFIG.abusePrevention;
/*
{
  enabled: true,
  rules: [
    {
      id: "prompt_injection",
      name: "Injection de prompt",
      pattern: /ignore\s+(previous|all)\s+instructions/i,
      action: "block",
      severity: "critical",
    },
    {
      id: "jailbreak",
      name: "Tentative de jailbreak",
      patterns: [
        /you\s+are\s+now\s+(DAN|unrestricted)/i,
        /pretend\s+you\s+are/i,
        /act\s+as\s+if\s+you\s+have\s+no\s+rules/i,
      ],
      action: "block",
      severity: "critical",
    },
    {
      id: "data_extraction",
      name: "Extraction de données",
      pattern: /show\s+me\s+(your\s+)?(system\s+prompt|instructions)/i,
      action: "block",
      severity: "high",
    },
    {
      id: "inappropriate_requests",
      name: "Demandes inappropriées",
      keywords: ["nude", "sex", "porn", "drugs"],
      action: "block",
      severity: "high",
    },
  ],
  rateLimiting: {
    maxRequests: 30,
    windowMs: 60000,
    blockDuration: 300000,
  },
  suspiciousActivity: {
    enabled: true,
    detection: true,
    alertThreshold: 5,
    autoBlock: true,
  }
}
*/
```

### Rate limiting

```typescript
const rateLimits = AI_SAFETY_CONFIG.rateLimits;
/*
[
  { role: "eleve", maxRequests: 30, windowMs: 60000, message: "Trop de requêtes. Attends un moment." },
  { role: "enseignant", maxRequests: 60, windowMs: 60000 },
  { role: "parent", maxRequests: 20, windowMs: 60000 },
  { role: "directeur", maxRequests: 100, windowMs: 60000 },
  { role: "admin", maxRequests: 200, windowMs: 60000 },
]
*/
```

### Audit

```typescript
const auditConfig = AI_SAFETY_CONFIG.audit;
/*
{
  enabled: true,
  retentionDays: 365,
  logLevel: "detailed",
  includePII: false,
  includeContent: true,
  storage: "supabase",
  alertOnCritical: true,
  alertEmails: ["security@educi.ci"],
  exportEnabled: true,
  exportFormats: ["json", "csv"],
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| POST | `/api/ai/safety/check` | Vérifier du contenu | Système |
| POST | `/api/ai/safety/check/pii` | Détecter la PII | Système |
| GET | `/api/ai/safety/config` | Configuration safety | ADMIN |
| PUT | `/api/ai/safety/config` | Modifier config | SUPER_ADMIN |
| GET | `/api/ai/safety/rules` | Règles de sécurité | ADMIN |
| POST | `/api/ai/safety/rules` | Ajouter une règle | ADMIN |
| PUT | `/api/ai/safety/rules/:id` | Modifier une règle | ADMIN |
| DELETE | `/api/ai/safety/rules/:id` | Supprimer une règle | SUPER_ADMIN |
| GET | `/api/ai/safety/audit` | Journal d'audit | ADMIN |
| GET | `/api/ai/safety/violations` | Violations détectées | ADMIN |
| POST | `/api/ai/safety/review` | Demander une review | ENSEIGNANT |
| GET | `/api/ai/safety/stats` | Statistiques | ADMIN, SUPER_ADMIN |

### Exemples de requêtes

#### Vérifier du contenu

```typescript
const check = await fetch('/api/ai/safety/check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    content: "Je m'appelle Kouamé et mon email est kouame@educi.ci",
    context: {
      userId: 'student-123',
      role: 'eleve',
      schoolId: 'school-456',
    },
  }),
});

const result = await check.json();
// {
//   safe: false,
//   violations: [],
//   piiItems: [
//     { type: "email", value: "k***@educi.ci", confidence: 0.98, masked: true },
//   ],
//   riskScore: 0.3,
//   action: { type: "modify", content: "Je m'appelle Kouamé et mon email est k***@educi.ci" }
// }
```

#### Consulter les violations

```typescript
const violations = await fetch('/api/ai/safety/violations?limit=50', {
  headers: { 'Authorization': `Bearer ${token}` },
});

const result = await violations.json();
// {
//   violations: [
//     {
//       id: "violation-123",
//       userId: "student-456",
//       category: "bullying",
//       content: "tu es un idiot",
//       action: "warn",
//       timestamp: "2025-01-15T10:30:00Z",
//     }
//   ],
//   total: 156,
//   page: 1
// }
```

## Usage Examples

### Exemple 1 : Pipeline de sécurité

```typescript
class SafetyPipeline {
  async processInput(
    content: string,
    context: SafetyContext
  ): Promise<SafetyCheckResult> {
    // Étape 1 : Vérification des abus
    const abuseCheck = await this.checkAbuse(content, context);
    if (abuseCheck.blocked) {
      return abuseCheck;
    }

    // Étape 2 : Détection PII
    const piiCheck = await this.detectPII(content);
    content = this.maskPII(content, piiCheck.piiItems);

    // Étape 3 : Filtrage de contenu
    const contentCheck = await this.filterContent(content, context);
    if (contentCheck.blocked) {
      return contentCheck;
    }

    // Étape 4 : Rate limiting
    const rateLimitCheck = await this.checkRateLimit(context);
    if (rateLimitCheck.exceeded) {
      return rateLimitCheck;
    }

    // Étape 5 : Audit
    await this.logAudit({
      content,
      context,
      checks: [abuseCheck, piiCheck, contentCheck],
    });

    return {
      safe: true,
      violations: [],
      piiItems: piiCheck.piiItems,
      riskScore: this.calculateRiskScore(abuseCheck, piiCheck, contentCheck),
      action: { type: 'allow', content },
    };
  }
}
```

### Exemple 2 : Modération humaine

```typescript
class HumanModeration {
  async submitForReview(
    content: string,
    context: SafetyContext,
    reason: string
  ): Promise<ModerationRequest> {
    // Créer la demande
    const request = await moderationRepository.create({
      content,
      context,
      reason,
      status: 'pending',
      priority: this.calculatePriority(context),
    });

    // Notifier les modérateurs
    await notificationService.notifyModerators({
      type: 'new_review',
      requestId: request.id,
      priority: request.priority,
    });

    return request;
  }

  async handleDecision(
    requestId: string,
    decision: ModerationDecision
  ): Promise<void> {
    // Enregistrer la décision
    await moderationRepository.update(requestId, {
      decision: decision.action,
      moderatorId: decision.moderatorId,
      reason: decision.reason,
      timestamp: new Date(),
    });

    // Appliquer la décision
    if (decision.action === 'approve') {
      await this.approveContent(requestId);
    } else if (decision.action === 'reject') {
      await this.rejectContent(requestId);
    }

    // Notifier l'utilisateur
    await this.notifyUser(requestId, decision);
  }
}
```

### Exemple 3 : Détection d'abus

```typescript
class AbuseDetector {
  private suspiciousPatterns: RegExp[] = [
    /ignore\s+previous\s+instructions/i,
    /you\s+are\s+now\s+(DAN|unrestricted)/i,
    /pretend\s+you\s+are/i,
    /act\s+as\s+if\s+you\s+have\s+no\s+rules/i,
    /reveal\s+your\s+system\s+prompt/i,
  ];

  async detect(content: string, context: AbuseContext): Promise<AbuseResult> {
    // Vérifier les patterns
    const matchedPatterns = this.suspiciousPatterns.filter(p =>
      p.test(content)
    );

    if (matchedPatterns.length > 0) {
      await this.logAbuse(content, context, matchedPatterns);
      await this.checkRepetition(context.userId);

      return {
        detected: true,
        type: 'prompt_injection',
        confidence: 0.95,
        action: 'block',
      };
    }

    // Vérifier le comportement suspect
    const behavior = await this.analyzeBehavior(context.userId);
    if (behavior.suspicious) {
      return {
        detected: true,
        type: 'suspicious_behavior',
        confidence: behavior.confidence,
        action: 'warn',
      };
    }

    return { detected: false };
  }
}
```

## Best Practices

### Sécurité

1. **Par défaut bloquer** : En cas de doute, bloquer
2. **Plusieurs couches** : Ne pas dépendre d'un seul filtre
3. **Audit complet** : Tracer toutes les actions
4. **Modération humaine** : Pour les cas ambigus
5. **Mise à jour** : Régulièrement mettre à jour les règles

### Performance

```typescript
// Bon : Vérifications parallèles
const [abuseCheck, piiCheck] = await Promise.all([
  checkAbuse(content),
  detectPII(content),
]);

// Bon : Cache des résultats
const cached = await cache.get(`safety:${hash(content)}`);

// Mauvais : Vérifications séquentielles
let result = await checkAbuse(content);
result = await detectPII(content);
result = await filterContent(content);
```

### Gestion des PII

```typescript
// Bon : Masquer avant stockage
const maskedContent = maskPII(content, {
  maskCharacter: '*',
  preserveLength: true,
});

// Bon : Ne pas stocker l'original
const safeContent = {
  masked: maskedContent,
  originalHash: hash(content), // Pour audit
};
```

## Security Considerations

- Chiffrement de toutes les données sensibles
- Isolation des données par école
- Accès strict par rôle
- Audit trail immuable
- Rotation des clés de chiffrement
- Conformité RGPD et lois ivoiriennes
- Protection contre les attaques par injection
- Détection et prévention des abus

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `safety_checks_total` | Counter | Vérifications effectuées |
| `safety_violations_total` | Counter | Violations détectées |
| `safety_pii_detected_total` | Counter | PII détectée |
| `safety_abuse_attempts_total` | Counter | Tentatives d'abus |
| `safety_rate_limit_hits_total` | Counter | Rate limits atteints |
| `safety_review_pending` | Gauge | Reviews en attente |
| `safety_risk_score_average` | Gauge | Score de risque moyen |

### Alertes

```typescript
const safetyAlerts = [
  {
    name: 'Tentative d\'injection de prompt',
    condition: 'safety_abuse_attempts_total > 0',
    severity: 'critical',
    action: 'block_and_notify',
  },
  {
    name: 'PII détectée en masse',
    condition: 'safety_pii_detected_total > 100',
    severity: 'high',
    action: 'notify_admin',
  },
  {
    name: 'Taux de violations élevé',
    condition: 'safety_violations_total / safety_checks_total > 0.1',
    severity: 'medium',
    action: 'increase_safety_level',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiSafetyCheckError` | 500 | Erreur de vérification | Réessayer |
| `AiPIIDetectionError` | 500 | Erreur de détection | Vérifier les patterns |
| `AiAbuseDetectedError` | 403 | Abus détecté | Bloquer l'utilisateur |
| `AiRateLimitError` | 429 | Rate limit atteint | Attendre |
| `AiSafetyConfigError` | 400 | Config invalide | Vérifier les paramètres |
| `AiModerationError` | 500 | Erreur de modération | Escalader |

## Changelog

### Version 2.6.0

- Filtrage de contenu multi-niveaux
- Détection de PII avec masquage
- Prévention des abus et manipulations
- Audit trail complet
- Modération humaine intégrée
- Rate limiting par rôle
- Conformité RGPD et lois ivoiriennes
- Alertes en temps réel
