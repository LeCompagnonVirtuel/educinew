# Phase 2.6: AI Models Management

## Overview

Le module AI Models d'EduCI gère le cycle de vie complet des modèles d'intelligence artificielle : configuration, routage, surveillance de santé, optimisation des coûts et basculement automatique entre fournisseurs. Il supporte une architecture multi-fournisseurs avec des stratégies de routage intelligentes adaptées au contexte éducatif.

### Capacités

- Gestion de modèles multi-fournisseurs (OpenAI, Anthropic, Google, Mistral, DeepSeek, Llama, Cohere, Azure, Ollama, vLLM, LiteLLM, Local)
- Routage intelligent par coût, latence, qualité ou équilibré
- Fallback automatique avec chaîne configurable
- Load balancing pondéré
- Circuit breaker par modèle
- Suivi des coûts en XOF avec alertes budgétaires
- Gestion des quotas par école et par utilisateur
- Benchmarking et comparaison de modèles

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│              AI Model Service                │
├──────────┬──────────┬──────────┬────────────┤
│  Model   │  Model   │  Model   │   Model    │
│ Registry │  Router  │  Health  │   Cost     │
│          │          │  Monitor │  Tracker   │
├──────────┴──────────┴──────────┴────────────┤
│              Model Providers                  │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│OpenAI│Anthro│Google│Mistra│DeepS │  Local   │
│      │ pic  │  AI  │  l   │ eek  │ (Ollama) │
└──────┴──────┴──────┴──────┴──────┴──────────┘
```

### Modèles de données

```typescript
// Depuis @educi/types
interface AIModel {
  id: string;
  schoolId?: string;
  provider: AIModelProvider;
  modelId: string;
  name: string;
  description: string;
  capabilities: AIModelCapability[];
  tier: AIModelTier;
  status: AIModelStatus;
  maxTokens: number;
  contextWindow: number;
  inputCostPer1k: number;
  outputCostPer1k: number;
  embeddingCostPer1k: number;
  rateLimitRpm: number;
  rateLimitTpm: number;
  features: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Fournisseurs supportés
type AIModelProvider =
  | 'openai' | 'anthropic' | 'gemini' | 'mistral'
  | 'deepseek' | 'llama' | 'qwen' | 'cohere'
  | 'azure_openai' | 'ollama' | 'vllm' | 'litellm' | 'local';

// Capacités des modèles
type AIModelCapability =
  | 'text_completion' | 'chat' | 'embedding'
  | 'image_generation' | 'image_analysis'
  | 'audio_transcription' | 'audio_speech'
  | 'code_generation' | 'reasoning'
  | 'function_calling' | 'vision' | 'video';

// Statuts des modèles
type AIModelStatus =
  | 'active' | 'inactive' | 'deprecated'
  | 'rate_limited' | 'error' | 'maintenance';

// Niveaux de modèle
type AIModelTier =
  | 'free' | 'basic' | 'standard' | 'premium' | 'enterprise';
```

## Configuration

### Modèles disponibles

```typescript
import { AI_MODELS_CONFIG } from '@educi/config';

// Liste des modèles configurés
const availableModels = AI_MODELS_CONFIG.availableModels;
/*
[
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    maxTokens: 128000,
    costPer1kInputTokens: 0.00015,
    costPer1kOutputTokens: 0.0006,
    enabled: true,
    capabilities: ["chat", "code", "vision", "function_calling"],
    rateLimit: 500,
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    maxTokens: 128000,
    costPer1kInputTokens: 0.005,
    costPer1kOutputTokens: 0.015,
    enabled: true,
    capabilities: ["chat", "code", "vision", "function_calling", "audio"],
    rateLimit: 200,
  },
  // ... Claude 3 Haiku, Claude 3 Sonnet, Gemini 1.5 Flash, Mistral Small
]
*/
```

### Configuration du routing

```typescript
const routingConfig = AI_MODELS_CONFIG.routing;
// strategy: "cost-optimized"
// enableFallback: true
// maxRetriesPerModel: 2
// circuitBreakerPerModel: true
// latencyThreshold: 5000
// costThreshold: 0.05

const fallbackConfig = AI_MODELS_CONFIG.fallback;
// enabled: true
// fallbackChain: ["gpt-4o-mini", "claude-3-haiku", "gemini-1.5-flash"]
// triggerOn: ["timeout", "error", "rate_limit"]
// maxFallbackAttempts: 3

const loadBalancingConfig = AI_MODELS_CONFIG.loadBalancing;
// enabled: true
// strategy: "weighted"
// healthCheckInterval: 60000
// weights: { "gpt-4o-mini": 40, "gpt-4o": 20, "claude-3-haiku": 25, ... }
```

### Configuration des tokens

```typescript
const tokensConfig = AI_MODELS_CONFIG.tokens;
// maxInputTokens: 8192
// maxOutputTokens: 4096
// maxTotalTokens: 12288
// reservedTokens: 500
// countingStrategy: "cl100k_base"

const temperatureConfig = AI_MODELS_CONFIG.temperature;
// default: 0.7
// presets: {
//   precise: 0.1,
//   balanced: 0.7,
//   creative: 1.2,
//   brainstorming: 1.5
// }
```

### Configuration des coûts

```typescript
const costsConfig = AI_MODELS_CONFIG.costs;
// currency: "XOF"
// exchangeRateUSD: 600
// alertThreshold: 100000
// monthlyBudget: 5000000
// trackingEnabled: true
```

### Embedding

```typescript
const embeddingConfig = AI_MODELS_CONFIG.embedding;
// model: "text-embedding-3-small"
// dimensions: 1536
// maxTokens: 8191
// batchSize: 100
// cachingEnabled: true
```

### Vision

```typescript
const visionConfig = AI_MODELS_CONFIG.vision;
// enabled: true
// maxImageSize: 20971520 (20 MB)
// supportedFormats: ["jpg", "jpeg", "png", "gif", "webp", "bmp"]
// maxImagesPerRequest: 10
// analysisDetail: "auto"
```

### Audio

```typescript
const audioConfig = AI_MODELS_CONFIG.audio;
// enabled: true
// maxAudioSize: 26214400 (25 MB)
// supportedFormats: ["mp3", "wav", "m4a", "ogg", "flac"]
// maxDuration: 300 (5 minutes)
// language: "fr"

const ttsConfig = AI_MODELS_CONFIG.tts;
// enabled: true
// provider: "elevenlabs"
// defaultVoice: "france_female_1"
// availableVoices: [
//   { id: "ci_female_1", name: "Awa", accent: "ivoirien" },
//   { id: "ci_male_1", name: "Kofi", accent: "ivoirien" },
// ]
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/models` | Lister les modèles | Tous authentifiés |
| GET | `/api/ai/models/:id` | Détails d'un modèle | Tous authentifiés |
| POST | `/api/ai/models` | Créer un modèle | ADMIN, SUPER_ADMIN |
| PUT | `/api/ai/models/:id` | Modifier un modèle | ADMIN, SUPER_ADMIN |
| DELETE | `/api/ai/models/:id` | Supprimer un modèle | SUPER_ADMIN |
| GET | `/api/ai/models/:id/health` | Santé du modèle | Tous authentifiés |
| GET | `/api/ai/models/:id/usage` | Utilisation du modèle | ADMIN, SUPER_ADMIN |
| GET | `/api/ai/models/:id/benchmark` | Benchmark du modèle | ADMIN |
| POST | `/api/ai/models/route` | Calculer la route optimale | Système |
| GET | `/api/ai/models/health/all` | Santé de tous les modèles | ADMIN |

### Exemples de requêtes

#### Lister les modèles

```typescript
// GET /api/ai/models?provider=openai&capability=chat&status=active
const response = await fetch('/api/ai/models?provider=openai&capability=chat', {
  headers: { 'Authorization': `Bearer ${token}` },
});

const models = await response.json();
// [
//   {
//     id: "model-abc123",
//     provider: "openai",
//     modelId: "gpt-4o-mini",
//     name: "GPT-4o Mini",
//     capabilities: ["chat", "code", "vision"],
//     status: "active",
//     inputCostPer1k: 0.00015,
//     outputCostPer1k: 0.0006,
//   }
// ]
```

#### Créer un modèle personnalisé

```typescript
// POST /api/ai/models
const newModel = await fetch('/api/ai/models', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    provider: 'ollama',
    modelId: 'llama3.1:8b',
    name: 'Llama 3.1 8B (Local)',
    description: 'Modèle local pour les tâches simples',
    capabilities: ['chat', 'code'],
    tier: 'basic',
    maxTokens: 8192,
    contextWindow: 128000,
    inputCostPer1k: 0,
    outputCostPer1k: 0,
    rateLimitRpm: 100,
    rateLimitTpm: 50000,
  }),
});
```

#### Calculer la route optimale

```typescript
// POST /api/ai/models/route
const route = await fetch('/api/ai/models/route', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    schoolId: 'school-123',
    requiredCapabilities: ['chat', 'vision'],
    maxLatency: 3000,
    maxCostPerRequest: 0.01,
    strategy: 'cost_optimized',
  }),
});

const result = await route.json();
// {
//   selectedModel: "gpt-4o-mini",
//   fallbackModels: ["claude-3-haiku", "gemini-1.5-flash"],
//   estimatedCost: 0.003,
//   estimatedLatency: 1200,
//   confidence: 0.95
// }
```

## Usage Examples

### Exemple 1 : Sélection automatique de modèle

```typescript
import { AI_MODELS_CONFIG } from '@educi/config';

class ModelSelector {
  private models = AI_MODELS_CONFIG.availableModels;
  private fallbackChain = AI_MODELS_CONFIG.fallback.fallbackChain;

  selectModel(requirements: {
    capabilities: string[];
    maxCost: number;
    maxLatency: number;
  }): string {
    // Filtrer par capacités
    const capable = this.models.filter(m =>
      m.enabled &&
      requirements.capabilities.every(c => m.capabilities.includes(c))
    );

    // Trier par coût
    const sorted = capable.sort(
      (a, b) => a.costPer1kInputTokens - b.costPer1kInputTokens
    );

    // Retourner le moins cher dans les limites
    const affordable = sorted.find(
      m => m.costPer1kInputTokens <= requirements.maxCost
    );

    return affordable?.id ?? this.fallbackChain[0];
  }
}
```

### Exemple 2 : Gestion du budget

```typescript
import { AI_MODELS_CONFIG } from '@educi/config';

class BudgetManager {
  private monthlyBudget = AI_MODELS_CONFIG.costs.monthlyBudget;
  private alertThreshold = AI_MODELS_CONFIG.costs.alertThreshold;

  async checkBudget(schoolId: string): Promise<{
    allowed: boolean;
    remaining: number;
    percentage: number;
  }> {
    const usage = await this.getMonthlyUsage(schoolId);
    const remaining = this.monthlyBudget - usage;
    const percentage = (usage / this.monthlyBudget) * 100;

    if (remaining < this.alertThreshold) {
      await this.sendBudgetAlert(schoolId, remaining, percentage);
    }

    return {
      allowed: remaining > 0,
      remaining,
      percentage,
    };
  }
}
```

### Exemple 3 : Monitoring de santé

```typescript
import { AI_MODELS_CONFIG } from '@educi/config';

class HealthMonitor {
  async checkAllModels(): Promise<ModelHealthStatus[]> {
    const models = AI_MODELS_CONFIG.availableModels;
    const results: ModelHealthStatus[] = [];

    for (const model of models) {
      const health = await this.checkModelHealth(model.id);
      results.push({
        modelId: model.id,
        provider: model.provider,
        status: health.status,
        latencyP50: health.latencyP50,
        latencyP95: health.latencyP95,
        errorRate: health.errorRate,
        uptime: health.uptime,
      });
    }

    return results;
  }
}
```

## Best Practices

### Sélection de modèles

1. **Pour le tutorat** : `gpt-4o-mini` (rapide, économique) ou `claude-3-haiku` (qualité)
2. **Pour la correction** : `gpt-4o` ou `claude-3-sonnet` (raisonnement avancé)
3. **Pour le code** : `gpt-4o` ou `deepseek-coder` (optimisé code)
4. **Pour la vision** : `gpt-4o` ou `claude-3-sonnet` (multimodal)
5. **Pour le local** : `llama3.1:8b` via Ollama (confidentiel)

### Gestion des coûts

```typescript
// Bon : Utiliser gpt-4o-mini pour les tâches simples
const simpleTask = await modelService.chat('gpt-4o-mini', messages);

// Bon : Utiliser le cache pour éviter les appels redondants
const cached = await cache.get(`model:${modelId}:${hash(messages)}`);

// Mauvais : Utiliser gpt-4o pour tout
const expensive = await modelService.chat('gpt-4o', simpleMessages);
```

### Optimisation des tokens

```typescript
// Bon : Tronquer le contexte inutile
const optimizedMessages = messages.slice(-20);

// Bon : Utiliser les résumés pour les conversations longues
const summary = await summarizeConversation(messages.slice(0, -10));
const contextMessages = [{ role: 'system', content: summary }, ...messages.slice(-10)];
```

## Security Considerations

- Les clés API sont stockées dans les variables d'environnement, jamais en base
- Rotation automatique des clés tous les 90 jours
- Chiffrement TLS pour toutes les communications avec les fournisseurs
- Validation des réponses avant injection dans le contexte
- Audit trail de tous les appels modèles
- Isolation multi-tenant : chaque école a ses propres quotas

## Monitoring and Alerting

### Métriques par modèle

| Métrique | Type | Description |
|----------|------|-------------|
| `model_requests_total` | Counter | Nombre de requêtes par modèle |
| `model_tokens_input_total` | Counter | Tokens d'entrée consommés |
| `model_tokens_output_total` | Counter | Tokens de sortie générés |
| `model_cost_total_xof` | Counter | Coût total en XOF |
| `model_latency_seconds` | Histogram | Latence de réponse |
| `model_error_total` | Counter | Nombre d'erreurs |
| `model_health_status` | Gauge | Santé (1=healthy, 0=unhealthy) |
| `model_rate_limit_remaining` | Gauge | Quota restant |

### Alertes

```typescript
const modelAlerts = [
  {
    name: 'Modèle indisponible',
    condition: 'model_health_status == 0',
    severity: 'critical',
    action: 'fallback',
  },
  {
    name: 'Coût modèle élevé',
    condition: 'model_cost_total_xof > 100000',
    severity: 'high',
    action: 'notify_admin',
  },
  {
    name: 'Latence élevée',
    condition: 'model_latency_p95 > 5000',
    severity: 'medium',
    action: 'switch_model',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiModelNotFoundError` | 404 | Modèle introuvable | Vérifier l'ID du modèle |
| `AiModelUnavailableError` | 503 | Fournisseur indisponible | Le fallback se déclenche |
| `AiModelRateLimitError` | 429 | Limite de débit atteinte | Attendre ou changer de modèle |
| `AiModelConfigError` | 400 | Configuration invalide | Vérifier les paramètres |
| `AiModelHealthError` | 502 | Santé dégradée | Vérifier les logs du fournisseur |
| `AiTokenLimitExceededError` | 429 | Tokens dépassés | Réduire le contexte |
| `AiCostLimitExceededError` | 429 | Budget dépassé | Contacter l'admin |

## Changelog

### Version 2.6.0

- Support de 6 fournisseurs IA
- Routing intelligent multi-critères
- Fallback automatique avec chaîne configurable
- Circuit breaker par modèle
- Suivi des coûts en XOF
- Benchmarking intégré
- Dashboards de monitoring
- Support Ollama pour le local
