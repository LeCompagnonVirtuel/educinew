# Phase 2.6: AI Core Platform

## Overview

La Plateforme IA Core d'EduCI constitue le socle fondamental de l'intelligence artificielle intégrée à l'écosystème éducatif. Elle fournit une architecture modulaire, multi-fournisseurs et multi-modèles, conçue spécifiquement pour le contexte éducatif de la Côte d'Ivoire et de l'Afrique francophone.

La plateforme supporte les fournisseurs OpenAI, Anthropic, Google Gemini, Mistral, DeepSeek, Llama, Cohere, et Azure OpenAI, avec un système de routage intelligent, de fallback automatique, et de gestion des coûts optimisée en XOF (Franc CFA).

### Objectifs

- Fournir une interface unifiée pour interagir avec plusieurs modèles IA
- Gérer les sessions, conversations et contextes de manière persistante
- Assurer la sécurité, la conformité et la protection des données
- Optimiser les coûts tout en maintenant une qualité de service élevée
- Supporter les fonctionnalités vocales, visuelles et de traitement de documents

### Portée Phase 2.6

| Module | Description | Statut |
|--------|-------------|--------|
| AI Core Platform | Plateforme de base, routing, cache | Actif |
| AI Models | Gestion des modèles IA | Actif |
| AI Prompts | Templates et versioning de prompts | Actif |
| AI Sessions | Sessions et conversations | Actif |
| AI Agents | Agents IA et tâches | Actif |
| AI Education | Assistants éducatifs | Actif |
| AI Safety | Filtrage et sécurité | Actif |
| AI Analytics | Métriques et rapports | Actif |
| AI Voice & Vision | Traitement vocal et visuel | Actif |
| AI Automation | Workflows et planification | Actif |
| AI Infrastructure | Sécurité, monitoring, cache | Actif |

## Architecture

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    EduCI AI Platform                      │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│  Models  │ Prompts  │ Sessions │  Agents  │  Education  │
│ Service  │ Service  │ Service  │ Service  │   Service   │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│                    Context Engine                         │
│         (Embeddings, Vector Store, RAG)                  │
├─────────────────────────────────────────────────────────┤
│                   Routing Layer                          │
│     (Cost-Optimized, Fallback, Load Balancing)           │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│  OpenAI  │Anthropic │  Gemini  │ Mistral  │  DeepSeek   │
│    API   │   API    │   API    │   API    │    API      │
└──────────┴──────────┴──────────┴──────────┴─────────────┘
```

### Composants principaux

#### 1. AI Model Router

Le routeur gère le choix du modèle optimal en fonction du coût, de la latence et de la disponibilité.

```typescript
// Configuration du routage depuis @educi/config
import { AI_MODELS_CONFIG } from '@educi/config';

const routingConfig = AI_MODELS_CONFIG.routing;
// strategy: "cost-optimized"
// enableFallback: true
// maxRetriesPerModel: 2
// circuitBreakerPerModel: true
```

Stratégies de routage disponibles :
- `cost_optimized` : Minimise les coûts tout en respectant les SLA
- `latency_optimized` : Priorise la vitesse de réponse
- `quality_optimized` : Priorise la qualité des réponses
- `balanced` : Équilibre coût/qualité/latence
- `round_robin` : Distribution circulaire
- `fallback_chain` : Chaîne de secours séquentielle

#### 2. Circuit Breaker

Le disjoncteur empêche les appels répétés à un modèle défaillant.

```typescript
// Configuration depuis @educi/config
const circuitBreakerConfig = AI_GENERAL_CONFIG.circuitBreaker;
// failureThreshold: 5
// resetTimeout: 60000
// halfOpenMaxCalls: 3
// monitoringWindow: 30000
```

États du circuit breaker :
- **Closed** : Fonctionnement normal, les appels passent
- **Open** : Trop d'échecs, les appels sont bloqués
- **Half-Open** : Test de récupération avec appels limités

#### 3. Cache Layer

Le cache LRU réduit les appels API redondants et améliore les performances.

```typescript
const cacheConfig = AI_GENERAL_CONFIG.cache;
// enabled: true
// defaultTTL: 300000 (5 minutes)
// maxSize: 1000
// strategy: "lru"
// warmupOnStart: true
```

#### 4. Rate Limiter

Le limiteur de débit protège contre les abus et respecte les quotas des fournisseurs.

```typescript
const rateLimitConfig = AI_MODELS_CONFIG.rateLimits;
// requestsPerMinute: 60
// tokensPerMinute: 100000
// requestsPerDay: 10000
// tokensPerDay: 5000000
// burstLimit: 10
```

### Flux de données

```
Requête utilisateur
       │
       ▼
┌──────────────┐
│ Auth & Rate  │
│   Limiter    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Cache      │
│   Check      │
└──────┬───────┘
       │ (miss)
       ▼
┌──────────────┐
│   Model      │
│   Router     │
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│   Circuit    │────▶│   Fallback   │
│   Breaker    │     │   Model      │
└──────┬───────┘     └──────────────┘
       │
       ▼
┌──────────────┐
│   Provider   │
│   API Call   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Response   │
│   Validation │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Cache      │
│   Store      │
└──────┬───────┘
       │
       ▼
   Réponse utilisateur
```

## Configuration

### Variables d'environnement

```env
# Configuration IA Générale
AI_ENABLED=true
AI_VERSION=2.6.0
AI_LOCALE=fr-CI
AI_TIMEZONE=Africa/Abidjan

# Fournisseurs IA
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
MISTRAL_API_KEY=...
DEEPSEEK_API_KEY=...

# Configuration de cache
AI_CACHE_ENABLED=true
AI_CACHE_DEFAULT_TTL=300000
AI_CACHE_MAX_SIZE=1000

# Configuration de sécurité
AI_SAFETY_LEVEL=high
AI_CONTENT_FILTER_ENABLED=true
AI_JAILBREAK_DETECTION=true

# Budget et coûts
AI_MONTHLY_BUDGET_XOF=5000000
AI_COST_ALERT_THRESHOLD=100000
AI_CURRENCY=XOF
AI_EXCHANGE_RATE_USD=600

# Monitoring
AI_METRICS_ENABLED=true
AI_METRICS_RETENTION_DAYS=90
AI_HEALTH_CHECK_INTERVAL=30000
```

### Configuration par école

```typescript
// Type depuis @educi/types
interface AISchoolConfig {
  id: string;
  schoolId: string;
  defaultModelId: string;
  fallbackModelId: string;
  maxTokensPerRequest: number;
  dailyTokenBudget: number;
  monthlyCostBudget: number;
  streamingEnabled: boolean;
  safetyLevel: string;
  allowedProviders: AIModelProvider[];
  allowedCapabilities: AIModelCapability[];
}
```

### Limites globales

```typescript
const limitsConfig = AI_GENERAL_CONFIG.limits;
// maxRequestsPerMinute: 60
// maxTokensPerRequest: 8192
// maxFileSize: 52428800 (50 MB)
// maxConcurrentUploads: 5
// maxBatchSize: 100
```

## API Reference

### Endpoints principaux

#### Modèles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/ai/models` | Lister les modèles disponibles |
| GET | `/api/ai/models/:id` | Obtenir un modèle spécifique |
| POST | `/api/ai/models` | Créer un modèle (admin) |
| PUT | `/api/ai/models/:id` | Mettre à jour un modèle (admin) |
| DELETE | `/api/ai/models/:id` | Supprimer un modèle (admin) |
| GET | `/api/ai/models/:id/health` | Santé d'un modèle |
| GET | `/api/ai/models/:id/usage` | Utilisation d'un modèle |

#### Sessions

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/ai/sessions` | Lister les sessions |
| GET | `/api/ai/sessions/:id` | Obtenir une session |
| POST | `/api/ai/sessions` | Créer une session |
| PUT | `/api/ai/sessions/:id` | Mettre à jour une session |
| DELETE | `/api/ai/sessions/:id` | Supprimer une session |
| POST | `/api/ai/sessions/:id/end` | Terminer une session |

#### Conversations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/ai/conversations` | Lister les conversations |
| GET | `/api/ai/conversations/:id` | Obtenir une conversation |
| POST | `/api/ai/conversations` | Créer une conversation |
| POST | `/api/ai/conversations/:id/messages` | Envoyer un message |

#### Prompts

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/ai/prompts` | Lister les prompts |
| GET | `/api/ai/prompts/:id` | Obtenir un prompt |
| POST | `/api/ai/prompts` | Créer un prompt |
| PUT | `/api/ai/prompts/:id` | Mettre à jour un prompt |
| POST | `/api/ai/prompts/:id/execute` | Exécuter un prompt |

### Formats de requête/réponse

#### Créer une session

```typescript
// Requête
interface AiSessionCreate {
  schoolId: string;
  userId: string;
  modelId: string;
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
  metadata?: Record<string, unknown>;
}

// Réponse
interface AiSession {
  id: string;
  schoolId: string;
  userId: string;
  modelId: string;
  status: 'active' | 'paused' | 'completed' | 'failed' | 'expired';
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  totalTokens: TokenUsage;
  cost: number;
  messageCount: number;
  lastMessageAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}
```

#### Envoyer un message

```typescript
// Requête
interface SendMessageRequest {
  content: string;
  role: 'user';
  attachments?: Array<{
    type: string;
    url: string;
    mimeType: string;
  }>;
  metadata?: Record<string, unknown>;
}

// Réponse (streaming)
interface StreamChunk {
  type: 'content' | 'function_call' | 'done' | 'error';
  content?: string;
  functionCall?: {
    name: string;
    arguments: Record<string, unknown>;
  };
  usage?: TokenUsage;
  metadata?: Record<string, unknown>;
}
```

## Usage Examples

### Exemple 1 : Créer une session de tutorat

```typescript
import { AI_SESSIONS_CONFIG, AI_STUDENT_ASSISTANT_CONFIG } from '@educi/config';

// Créer une session pour un élève en mathématiques
const session = await fetch('/api/ai/sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    schoolId: 'school-123',
    userId: 'student-456',
    modelId: 'gpt-4o-mini',
    systemPrompt: `Tu es un tuteur bienveillant pour les mathématiques.
    Tu aides l'élève à comprendre les concepts pas à pas.
    Tu utilises des exemples concrets du contexte ivoirien.
    Tu encourage et valorises les progrès.`,
    temperature: 0.7,
    maxTokens: 4096,
  }),
});
```

### Exemple 2 : Envoyer un message avec streaming

```typescript
const response = await fetch(`/api/ai/conversations/${conversationId}/messages`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    content: 'Explique-moi comment résoudre une équation du second degré',
    role: 'user',
  }),
});

// Lire le streaming
const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (reader) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

  for (const line of lines) {
    const data = JSON.parse(line.slice(6));
    if (data.type === 'content') {
      process.stdout.write(data.content);
    }
  }
}
```

### Exemple 3 : Utiliser le contexte RAG

```typescript
import { AI_CONTEXT_ENGINE_CONFIG } from '@educi/config';

// Rechercher dans la base de connaissances
const searchResults = await fetch('/api/ai/context/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    query: 'Quels sont les types de triangles ?',
    schoolId: 'school-123',
    strategy: 'hybrid',
    topK: 5,
    filters: {
      subjectId: 'math',
      level: 'collège',
    },
  }),
});
```

### Exemple 4 : Obtenir les métriques de coût

```typescript
// Obtenir le résumé des coûts mensuels
const costReport = await fetch('/api/ai/analytics/costs?period=monthly', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

const report = await costReport.json();
console.log(`Coût total: ${report.totalCost} XOF`);
console.log(`Budget restant: ${report.remaining} XOF`);
console.log(`Par modèle:`, report.byModel);
```

## Best Practices

### Patterns recommandés

1. **Utiliser le fallback chain** : Toujours configurer un modèle de secours
2. **Mettre en cache les réponses** : Pour les requêtes identiques ou similaires
3. **Limiter le contexte** : Envoyer uniquement les informations pertinentes
4. **Valider les sorties** : Vérifier la qualité des réponses avant affichage
5. **Monitorer les coûts** : Vérifier régulièrement les métriques d'utilisation

### Anti-patterns

1. **Ne pas court-circuiter le rate limiter** : Risque de blocage par le fournisseur
2. **Ne pas ignorer les erreurs** : Toujours implémenter un gestionnaire d'erreurs
3. **Ne pas stocker les clés API dans le code** : Utiliser les variables d'environnement
4. **Ne pas surcharger le contexte** : Respecter les limites de tokens par modèle
5. **Ne pas ignorer la safety layer** : Toujours filtrer les entrées et sorties

### Optimisation des performances

```typescript
// Bon : Utiliser le cache pour les requêtes répétitives
const cachedResult = await cache.get(`search:${queryHash}`);
if (cachedResult) return cachedResult;

// Bon : Utiliser le batching pour les appels embeddings
const embeddings = await embeddingService.batchEmbed(texts, {
  batchSize: AI_PROMPTS_CONFIG.embedding.batchSize,
});

// Bon : Utiliser le streaming pour les réponses longues
const stream = await model.chat(messages, {
  stream: true,
  chunkSize: AI_GENERAL_CONFIG.streaming.chunkSize,
});
```

## Security Considerations

### Authentification et autorisation

- Toutes les requêtes IA requièrent un token JWT valide
- Les permissions sont vérifiées via le système RBAC d'EduCI
- Les clés API sont chiffrées au repos et en transit
- Rotation automatique des clés tous les 90 jours

### Protection des données

```typescript
// Chiffrement des données sensibles
const encryptionConfig = AI_SESSIONS_CONFIG.encryption;
// algorithm: "aes-256-gcm"
// keyRotationDays: 90
// atRestEnabled: true
// inTransitEnabled: true

// Rétention des données
const retentionConfig = AI_SESSIONS_CONFIG.storage;
// retentionDays: 365
// maxStoragePerUser: 104857600 (100 MB)
```

### Filtrage de contenu

```typescript
import { AI_PROMPTS_CONFIG } from '@educi/config';

// Patterns bloqués par défaut
const blockedPatterns = AI_PROMPTS_CONFIG.safety.blockedPatterns;
// "ignore previous instructions"
// "ignorez les instructions précédentes"
// "reveal system prompt"
// "montrez le prompt système"
```

### Conformité

- **RGPD** : Droit à l'oubli, portabilité des données
- **Lois ivoiriennes** : Protection des données personnelles
- **Politique scolaire** : Respect du règlement intérieur

## Monitoring and Alerting

### Métriques collectées

```typescript
const metricsConfig = AI_GENERAL_CONFIG.metrics;
// collectionInterval: 30000 (30 secondes)
// exportInterval: 300000 (5 minutes)
// retentionDays: 90
// dashboardsEnabled: true
```

### Métriques clés

| Métrique | Description | Seuil d'alerte |
|----------|-------------|----------------|
| `ai_requests_total` | Nombre total de requêtes | - |
| `ai_tokens_used_total` | Tokens consommés | > 80% du quota |
| `ai_cost_total_xof` | Coût total en XOF | > 100 000 XOF |
| `ai_latency_p95` | Latence P95 | > 5000ms |
| `ai_error_rate` | Taux d'erreur | > 5% |
| `ai_cache_hit_rate` | Taux de cache hit | < 30% |
| `ai_circuit_breaker_opens` | Ouvertures du circuit breaker | > 3/heure |
| `ai_model_health_status` | Santé des modèles | Dégradé |

### Dashboards Grafana

Le système fournit des dashboards préconfigurés pour :
- Vue d'ensemble de la plateforme IA
- Performance par modèle
- Utilisation et coûts
- Sécurité et incidents
- Qualité des réponses

### Règles d'alerte

```typescript
// Exemple de règle d'alerte
interface AIAlertRule {
  id: string;
  schoolId: string;
  name: string;
  condition: string;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  notificationChannels: string[];
}

// Règles prédéfinies
const alertRules = [
  {
    name: 'Coût mensuel élevé',
    condition: 'ai_cost_monthly > 500000',
    threshold: 500000,
    severity: 'high',
  },
  {
    name: 'Latence élevée',
    condition: 'ai_latency_p95 > 5000',
    threshold: 5000,
    severity: 'medium',
  },
  {
    name: 'Taux d\'erreur élevé',
    condition: 'ai_error_rate > 0.05',
    threshold: 0.05,
    severity: 'critical',
  },
];
```

## Troubleshooting

### Problèmes courants

| Problème | Cause probable | Solution |
|----------|---------------|----------|
| `AI_MODEL_NOT_FOUND_ERROR` | Modèle inexistant ou désactivé | Vérifier la configuration des modèles |
| `AI_MODEL_UNAVAILABLE_ERROR` | Fournisseur indisponible | Le fallback se déclenche automatiquement |
| `AI_MODEL_RATE_LIMIT_ERROR` | Quota dépassé | Attendre la réinitialisation du compteur |
| `AI_TOKEN_LIMIT_EXCEEDED_ERROR` | Trop de tokens dans la requête | Réduire la taille du contexte |
| `AI_COST_LIMIT_EXCEEDED_ERROR` | Budget dépassé | Contacter l'administrateur |
| `AI_BUDGET_EXHAUSTED_ERROR` | Budget épuisé | Attendre le prochain cycle de facturation |
| `AI_SESSION_EXPIRED_ERROR` | Session expirée | Créer une nouvelle session |
| `AI_CONTEXT_ERROR` | Erreur de contexte IA | Vérifier les données d'entrée |
| `AI_ROUTING_ERROR` | Erreur de routage | Vérifier la configuration des routes |

### Logs de diagnostic

```typescript
// Les erreurs incluent des informations de diagnostic
interface DiagnosticInfo {
  requestId: string;
  modelId: string;
  provider: string;
  latencyMs: number;
  tokensUsed: number;
  costXof: number;
  circuitBreakerState: 'closed' | 'open' | 'half_open';
  cacheHit: boolean;
  fallbackUsed: boolean;
}
```

## Changelog

### Version 2.6.0 (Phase 2.6)

- **Initial release** : Plateforme IA Core complète
- Support multi-fournisseurs : OpenAI, Anthropic, Google, Mistral, DeepSeek
- Routing intelligent avec stratégies configurables
- Circuit breaker et fallback automatique
- Cache LRU avec warmup
- Rate limiting par école et par utilisateur
- Sessions persistantes avec chiffrement
- Contexte RAG avec embeddings
- Monitoring et alerting intégrés
- Support streaming pour les réponses longues
- Gestion des coûts en XOF
- Conformité RGPD et lois ivoiriennes

### Version 2.6.1 (Patch)

- Correction du calcul de tokens pour les modèles Claude
- Amélioration du cache de similarité sémantique
- Ajout du support audio pour GPT-4o
