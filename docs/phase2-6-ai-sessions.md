# Phase 2.6: AI Sessions Management

## Overview

Le module AI Sessions d'EduCI gère le cycle de vie complet des sessions de conversation avec l'IA : création, historique, streaming temps réel, reprise de session, et optimisation du contexte. Il supporte les sessions multi-utilisateurs et multi-appareils avec synchronisation en temps réel.

### Capacités

- Sessions persistantes avec historique complet
- Streaming temps réel des réponses
- Reprise de session sur n'importe quel appareil
- Gestion du contexte et fenêtre glissante
- Sessions collaborative (tuteur + élève + parent)
- Métriques de session (tokens, coûts, latence)
- Nettoyage automatique des sessions expirées
- Export d'historique

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│              AI Session Service              │
├──────────┬──────────┬──────────┬────────────┤
│ Session  │ Message  │ Streaming│  Context   │
│ Manager  │ Store    │ Handler  │  Manager   │
├──────────┴──────────┴──────────┴────────────┤
│              Storage Layer                    │
├──────────┬──────────┬──────────┬────────────┤
│ Supabase │  Redis   │  Local   │   Sync     │
│  (DB)    │ (Cache)  │ (Offline)│  Engine    │
└──────────┴──────────┴──────────┴────────────┘
```

### Modèles de données

```typescript
interface AISession {
  id: string;
  schoolId: string;
  userId: string;
  agentId?: string;
  title: string;
  description: string;
  status: AISessionStatus;
  modelId: string;
  systemPrompt: string;
  messages: AIMessage[];
  context: AISessionContext;
  usage: AISessionUsage;
  settings: AISessionSettings;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  expiresAt: string;
}

type AISessionStatus =
  | 'active' | 'paused' | 'completed'
  | 'archived' | 'error' | 'expired';

interface AIMessage {
  id: string;
  sessionId: string;
  role: AIMessageRole;
  content: string;
  tokens: number;
  cost: number;
  modelId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

type AIMessageRole = 'system' | 'user' | 'assistant' | 'function';

interface AISessionContext {
  subject?: string;
  level?: string;
  topic?: string;
  objectives?: string[];
  constraints?: string[];
  previousSessions?: string[];
  userProfile?: Record<string, unknown>;
}

interface AISessionUsage {
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
  messageCount: number;
  averageLatency: number;
}

interface AISessionSettings {
  temperature: number;
  maxTokens: number;
  streamEnabled: boolean;
  contextWindow: number;
  autoSave: boolean;
  ttl: number;
}
```

## Configuration

### Configuration des sessions

```typescript
import { AI_SESSIONS_CONFIG } from '@educi/config';

// Configuration des sessions
const sessionsConfig = AI_SESSIONS_CONFIG;
/*
{
  maxConcurrentSessions: 10,
  sessionTimeout: 1800000, (30 minutes)
  maxMessagesPerSession: 200,
  maxTokensPerSession: 100000,
  enableStreaming: true,
  enableAutoSave: true,
  autoSaveInterval: 30000, (30 secondes)
  contextWindow: 20,
  sessionArchiveAfter: 86400000, (24 heures)
  cleanupInterval: 3600000, (1 heure)
}
*/
```

### Gestion du contexte

```typescript
const contextConfig = AI_SESSIONS_CONFIG.context;
/*
{
  strategy: "sliding_window",
  maxContextTokens: 8000,
  includeSystemPrompt: true,
  includeMetadata: true,
  compressionThreshold: 0.8,
  summaryAfterMessages: 20,
  preserveRecentMessages: 5,
  prioritizeRecentTopics: true,
}
*/
```

### Streaming

```typescript
const streamingConfig = AI_SESSIONS_CONFIG.streaming;
/*
{
  enabled: true,
  chunkSize: 100,
  flushInterval: 100,
  enablePartialMessages: true,
  heartbeatInterval: 30000,
  maxConcurrentStreams: 5,
  compression: true,
  protocol: "sse", (Server-Sent Events)
}
*/
```

### Cache des sessions

```typescript
const sessionCacheConfig = AI_SESSIONS_CONFIG.cache;
/*
{
  enabled: true,
  ttl: 1800000, (30 minutes)
  maxEntries: 1000,
  strategy: "lru",
  persistToDisk: false,
  compressionEnabled: true,
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/sessions` | Lister les sessions | Tous authentifiés |
| POST | `/api/ai/sessions` | Créer une session | Tous authentifiés |
| GET | `/api/ai/sessions/:id` | Détails d'une session | Propriétaire |
| PUT | `/api/ai/sessions/:id` | Modifier une session | Propriétaire |
| DELETE | `/api/ai/sessions/:id` | Supprimer une session | Propriétaire |
| POST | `/api/ai/sessions/:id/messages` | Ajouter un message | Propriétaire |
| GET | `/api/ai/sessions/:id/messages` | Historique des messages | Propriétaire |
| POST | `/api/ai/sessions/:id/stream` | Stream en temps réel | Propriétaire |
| POST | `/api/ai/sessions/:id/pause` | Mettre en pause | Propriétaire |
| POST | `/api/ai/sessions/:id/resume` | Reprendre | Propriétaire |
| POST | `/api/ai/sessions/:id/complete` | Terminer | Propriétaire |
| GET | `/api/ai/sessions/:id/export` | Exporter l'historique | Propriétaire, ADMIN |
| GET | `/api/ai/sessions/:id/metrics` | Métriques | Propriétaire, ADMIN |

### Exemples de requêtes

#### Créer une session

```typescript
const session = await fetch('/api/ai/sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: 'Tutorat Mathématiques - Fractions',
    description: 'Session de tutorat sur les fractions pour CM2',
    modelId: 'gpt-4o-mini',
    context: {
      subject: 'mathématiques',
      level: 'CM2',
      topic: 'fractions',
      objectives: [
        'Comprendre la notion de fraction',
        'Comparer des fractions',
        'Additionner des fractions de même dénominateur',
      ],
    },
    settings: {
      temperature: 0.7,
      maxTokens: 4096,
      streamEnabled: true,
    },
  }),
});
```

#### Envoyer un message

```typescript
const message = await fetch('/api/ai/sessions/session-123/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    content: "J'ai du mal à comprendre pourquoi 1/2 + 1/3 = 5/6. Peux-tu m'expliquer?",
    role: 'user',
  }),
});
```

#### Stream en temps réel

```typescript
const eventSource = new EventSource(
  `/api/ai/sessions/session-123/stream?token=${token}`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'token':
      appendToUI(data.content);
      break;
    case 'message_complete':
      finalMessage = data.content;
      break;
    case 'error':
      handleError(data.error);
      break;
  }
};

eventSource.onerror = () => {
  eventSource.close();
};
```

## Usage Examples

### Exemple 1 : Session de tutorat adaptatif

```typescript
class AdaptiveTutoringSession {
  private session: AISession;
  private errorCount = 0;
  private successCount = 0;

  async handleMessage(studentMessage: string): Promise<string> {
    // Analyser le message
    const analysis = this.analyzeMessage(studentMessage);

    // Adapter le comportement
    if (analysis.isConfused) {
      this.errorCount++;
      if (this.errorCount > 3) {
        await this.simplifyApproach();
      }
    }

    if (analysis.isCorrect) {
      this.successCount++;
      if (this.successCount > 2) {
        await this.advanceTopic();
      }
    }

    // Envoyer le message
    const response = await sessionService.sendMessage(
      this.session.id,
      studentMessage
    );

    return response.content;
  }

  private analyzeMessage(message: string): MessageAnalysis {
    return {
      isConfused: /je comprends pas|c'est quoi|comment|aide/i.test(message),
      isCorrect: /oui|exactement|merci|c'est ça/i.test(message),
      isFrustrated: /difficile|nul|pourquoi toujours/i.test(message),
      sentiment: this.analyzeSentiment(message),
    };
  }
}
```

### Exemple 2 : Session collaborative

```typescript
class CollaborativeSession {
  private session: AISession;
  private participants: Participant[];

  async addParticipant(participant: Participant): Promise<void> {
    this.participants.push(participant);

    // Mettre à jour le contexte
    await sessionService.updateContext(this.session.id, {
      participants: this.participants.map(p => ({
        id: p.id,
        role: p.role,
        name: p.name,
      })),
    });
  }

  async handleMultiParticipantMessage(
    senderId: string,
    message: string
  ): Promise<void> {
    // Enrichir le contexte avec l'expéditeur
    const enrichedContext = {
      ...this.session.context,
      currentSpeaker: this.participants.find(p => p.id === senderId),
      participantCount: this.participants.length,
    };

    // Générer une réponse adaptée
    const response = await sessionService.sendMessage(
      this.session.id,
      message,
      { context: enrichedContext }
    );

    // Diffuser à tous les participants
    await this.broadcastToParticipants(response);
  }
}
```

### Exemple 3 : Gestion du contexte

```typescript
class ContextManager {
  private maxTokens: number;
  private recentMessages: AIMessage[];
  private summary: string;

  constructor(maxTokens: number) {
    this.maxTokens = maxTokens;
    this.recentMessages = [];
    this.summary = '';
  }

  async buildContext(messages: AIMessage[]): Promise<AIMessage[]> {
    const systemPrompt = messages.find(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');

    // Calculer les tokens
    const totalTokens = this.estimateTokens(conversationMessages);

    if (totalTokens <= this.maxTokens) {
      return messages;
    }

    // Compresser les anciens messages
    const recentCount = Math.min(10, conversationMessages.length);
    const recent = conversationMessages.slice(-recentCount);
    const old = conversationMessages.slice(0, -recentCount);

    // Générer un résumé
    if (old.length > 0) {
      this.summary = await this.generateSummary(old);
    }

    // Construire le contexte optimisé
    return [
      systemPrompt,
      { role: 'system', content: `Résumé de la conversation:\n${this.summary}` },
      ...recent,
    ];
  }

  private estimateTokens(messages: AIMessage[]): number {
    return messages.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0);
  }

  private async generateSummary(messages: AIMessage[]): Promise<string> {
    const summaryPrompt = [
      { role: 'system', content: 'Résume cette conversation en 3-5 phrases.' },
      ...messages,
    ];
    return await aiService.generate(summaryPrompt);
  }
}
```

## Best Practices

### Gestion des sessions

1. **Auto-save** : Activer pour les sessions longues
2. **Expiration** : Configurer un TTL adapté au contexte
3. **Contexte** : Maintenir un contexte pertinent et léger
4. **Streaming** : Utiliser pour améliorer l'UX
5. **Export** : Permettre l'export pour les parents/enseignants

### Optimisation du contexte

```typescript
// Bon : Fenêtre glissante avec résumé
const context = {
  strategy: 'sliding_window',
  maxTokens: 8000,
  summaryAfterMessages: 20,
};

// Bon : Préserver les messages récents
const recentMessages = messages.slice(-10);

// Mauvais : Envoyer toute l'historique
const allMessages = messages; // Coûteux et lent
```

### Nettoyage automatique

```typescript
// Archiver les sessions inactives
const cleanupPolicy = {
  archiveAfter: '24h',
  deleteAfter: '30d',
  maxSessionsPerUser: 50,
};
```

## Security Considerations

- Les messages sont chiffrés au repos et en transit
- Authentification requise pour chaque opération
- Isolation des sessions par école et par utilisateur
- Audit trail de toutes les interactions
- Détection de contenu inapproprié
- Rate limiting sur les messages
- Purge automatique des données expirées

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `session_active_count` | Gauge | Sessions actives |
| `session_message_total` | Counter | Messages par session |
| `session_tokens_total` | Counter | Tokens par session |
| `session_cost_total_xof` | Counter | Coût par session |
| `session_duration_seconds` | Histogram | Durée des sessions |
| `session_stream_latency_ms` | Histogram | Latence streaming |
| `session_error_total` | Counter | Erreurs par session |

### Alertes

```typescript
const sessionAlerts = [
  {
    name: 'Session trop longue',
    condition: 'session_duration_seconds > 3600',
    severity: 'medium',
    action: 'suggest_archive',
  },
  {
    name: 'Tokens dépassés',
    condition: 'session_tokens_total > 100000',
    severity: 'high',
    action: 'limit_session',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiSessionNotFoundError` | 404 | Session introuvable | Vérifier l'ID |
| `AiSessionExpiredError` | 410 | Session expirée | Créer une nouvelle session |
| `AiSessionLimitError` | 429 | Limite de sessions atteinte | Archiver les anciennes |
| `AiMessageLimitError` | 429 | Limite de messages | Nouvelle session requise |
| `AiStreamingError` | 500 | Erreur de streaming | Reconnecter |
| `AiContextError` | 400 | Contexte invalide | Vérifier les paramètres |

## Changelog

### Version 2.6.0

- Sessions persistantes avec historique
- Streaming temps réel (SSE)
- Re.multi-appareil avec synchronisation
- Gestion du contexte fenêtre glissante
- Sessions collaboratives
- Métriques de session
- Nettoyage automatique
- Export d'historique
