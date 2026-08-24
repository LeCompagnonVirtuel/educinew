# Phase 2.6: AI Agents Management

## Overview

Le module AI Agents d'EduCI implémente un framework d'agents IA spécialisés pour l'éducation : tuteurs, assistants, modérateurs, évaluateurs, et agents de support. Chaque agent a des capacités spécifiques, un comportement configurable, et peut collaborer avec d'autres agents pour résoudre des tâches complexes.

### Capacités

- Framework multi-agents avec collaboration
- Agents spécialisés par rôle éducatif
- Orchestration de workflows complexes
- Mémoire partagée entre agents
- Monitoring et traçabilité
- Configuration flexible par école
- Événements en temps réel
- Support des tools (fonctions externes)

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│              AI Agent Orchestrator           │
├──────────┬──────────┬──────────┬────────────┤
│  Agent   │ Workflow │  Memory  │  Tool      │
│ Registry │ Engine   │  Manager │  Executor  │
├──────────┴──────────┴──────────┴────────────┤
│              Agent Types                      │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│Tutor │ Asst │Moder │Eval  │Suprt │  Custom  │
│      │      │ator  │uator│      │          │
└──────┴──────┴──────┴──────┴──────┴──────────┘
```

### Modèles de données

```typescript
interface AIAgent {
  id: string;
  schoolId?: string;
  name: string;
  description: string;
  type: AIAgentType;
  status: AIAgentStatus;
  capabilities: AIAgentCapability[];
  modelId: string;
  systemPrompt: string;
  tools: AIAgentTool[];
  config: AIAgentConfig;
  memory: AIAgentMemory;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

type AIAgentType =
  | 'tutor' | 'assistant' | 'moderator' | 'evaluator'
  | 'researcher' | 'content_creator' | 'translator'
  | 'mentor' | 'analyzer' | 'custom';

type AIAgentStatus =
  | 'active' | 'inactive' | 'busy'
  | 'error' | 'maintenance';

type AIAgentCapability =
  | 'text_generation' | 'text_analysis' | 'question_answering'
  | 'tutoring' | 'evaluation' | 'content_creation'
  | 'moderation' | 'translation' | 'summarization'
  | 'code_generation' | 'data_analysis' | 'research'
  | 'scheduling' | 'communication' | 'reporting';

interface AIAgentTool {
  id: string;
  name: string;
  description: string;
  type: 'function' | 'api' | 'database' | 'file';
  schema: Record<string, unknown>;
  handler: string;
  permissions: string[];
  rateLimit?: number;
}

interface AIAgentConfig {
  temperature: number;
  maxTokens: number;
  maxTurns: number;
  timeout: number;
  retryPolicy: RetryPolicy;
  collaboration: CollaborationConfig;
  memoryConfig: MemoryConfig;
}

interface AIAgentMemory {
  type: 'none' | 'session' | 'persistent' | 'shared';
  maxEntries: number;
  ttl: number;
  compressionEnabled: boolean;
  storeId?: string;
}

interface AIAgentMessage {
  id: string;
  agentId: string;
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCalls?: AIAgentToolCall[];
  toolResults?: AIAgentToolResult[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

interface AIAgentToolCall {
  id: string;
  toolId: string;
  arguments: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
}

interface AIAgentToolResult {
  toolCallId: string;
  success: boolean;
  data: unknown;
  error?: string;
}
```

## Configuration

### Agents prédéfinis

```typescript
import { AI_AGENTS_CONFIG } from '@educi/config';

// Agent tuteur
const tutorAgent = AI_AGENTS_CONFIG.agents.tutor;
/*
{
  name: "Tuteur IA",
  description: "Agent de tutorat adaptatif",
  type: "tutor",
  capabilities: ["tutoring", "question_answering", "evaluation"],
  tools: ["search_knowledge", "generate_exercise", "check_answer"],
  config: {
    temperature: 0.7,
    maxTokens: 4096,
    maxTurns: 50,
    timeout: 300000,
  },
  memory: {
    type: "session",
    maxEntries: 100,
    ttl: 3600000,
  }
}
*/

// Agent assistant
const assistantAgent = AI_AGENTS_CONFIG.agents.assistant;
/*
{
  name: "Assistant Pédagogique",
  description: "Agent d'assistance générale",
  type: "assistant",
  capabilities: ["text_generation", "summarization", "translation"],
  tools: ["search_web", "calculate", "format_text"],
  config: {
    temperature: 0.5,
    maxTokens: 2048,
    maxTurns: 20,
    timeout: 60000,
  }
}
*/

// Agent modérateur
const moderatorAgent = AI_AGENTS_CONFIG.agents.moderator;
/*
{
  name: "Modérateur de Contenu",
  description: "Agent de modération et sécurité",
  type: "moderator",
  capabilities: ["text_analysis", "moderation"],
  tools: ["filter_content", "check_safety", "report_issue"],
  config: {
    temperature: 0.1,
    maxTokens: 1024,
    maxTurns: 5,
    timeout: 30000,
  }
}
*/

// Agent évaluateur
const evaluatorAgent = AI_AGENTS_CONFIG.agents.evaluator;
/*
{
  name: "Évaluateur IA",
  description: "Agent d'évaluation et feedback",
  type: "evaluator",
  capabilities: ["evaluation", "text_analysis", "reporting"],
  tools: ["grade_answer", "generate_feedback", "analyze_progress"],
  config: {
    temperature: 0.3,
    maxTokens: 2048,
    maxTurns: 10,
    timeout: 120000,
  }
}
*/
```

### Orchestration

```typescript
const orchestrationConfig = AI_AGENTS_CONFIG.orchestration;
/*
{
  maxConcurrentAgents: 5,
  defaultTimeout: 300000,
  enableCollaboration: true,
  messageQueue: {
    enabled: true,
    maxSize: 1000,
    processInterval: 100,
  },
  eventBus: {
    enabled: true,
    bufferSize: 100,
    flushInterval: 1000,
  }
}
*/
```

### Mémoire

```typescript
const memoryConfig = AI_AGENTS_CONFIG.memory;
/*
{
  defaultType: "session",
  maxTotalEntries: 10000,
  compressionEnabled: true,
  storageBackend: "supabase",
  syncInterval: 30000,
  evictionPolicy: "lru",
}
*/
```

### Tools

```typescript
const toolsConfig = AI_AGENTS_CONFIG.tools;
/*
{
  enabled: true,
  sandboxMode: true,
  maxConcurrentTools: 3,
  timeout: 30000,
  retryAttempts: 2,
  availableTools: [
    { id: "search_knowledge", name: "Recherche KB", type: "function" },
    { id: "generate_exercise", name: "Générer exercice", type: "function" },
    { id: "check_answer", name: "Vérifier réponse", type: "function" },
    { id: "search_web", name: "Recherche web", type: "api" },
    { id: "calculate", name: "Calculatrice", type: "function" },
    { id: "get_student_data", name: "Données élève", type: "database" },
  ]
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/agents` | Lister les agents | Tous authentifiés |
| GET | `/api/ai/agents/:id` | Détails d'un agent | Tous authentifiés |
| POST | `/api/ai/agents` | Créer un agent | ADMIN, SUPER_ADMIN |
| PUT | `/api/ai/agents/:id` | Modifier un agent | ADMIN |
| DELETE | `/api/ai/agents/:id` | Supprimer un agent | SUPER_ADMIN |
| POST | `/api/ai/agents/:id/chat` | Interagir avec un agent | Tous authentifiés |
| POST | `/api/ai/agents/:id/execute` | Exécuter un workflow | ENSEIGNANT, ADMIN |
| GET | `/api/ai/agents/:id/memory` | Consulter la mémoire | ADMIN |
| GET | `/api/ai/agents/:id/tools` | Lister les tools | Tous authentifiés |
| POST | `/api/ai/agents/:id/tools/:toolId` | Exécuter un tool | Système |
| GET | `/api/ai/agents/:id/logs` | Journaux d'exécution | ADMIN |

### Exemples de requêtes

#### Créer un agent personnalisé

```typescript
const agent = await fetch('/api/ai/agents', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: 'Tuteur Mathématiques Spécialisé',
    description: 'Agent de tutorat spécialisé en mathématiques',
    type: 'tutor',
    modelId: 'gpt-4o',
    systemPrompt: `Tu es un tuteur mathématique expert.
Tu enseignes les mathématiques du primaire et secondaire en Côte d'Ivoire.
Tu utilises des exemples concrets du quotidien ivoirien.
Tu es patient et bienveillant.
Tu adaptes ton approche au niveau de l'élève.`,
    capabilities: ['tutoring', 'question_answering', 'evaluation'],
    tools: ['search_knowledge', 'generate_exercise', 'check_answer'],
    config: {
      temperature: 0.7,
      maxTokens: 4096,
      maxTurns: 50,
      timeout: 300000,
    },
    memory: {
      type: 'session',
      maxEntries: 100,
      ttl: 3600000,
    },
  }),
});
```

#### Interagir avec un agent

```typescript
const response = await fetch('/api/ai/agents/agent-123/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    message: "Peux-tu m'expliquer la règle de trois?",
    context: {
      studentId: 'student-456',
      level: 'CM2',
      subject: 'mathématiques',
    },
    stream: true,
  }),
});
```

#### Exécuter un workflow

```typescript
const workflow = await fetch('/api/ai/agents/agent-123/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    workflow: 'tutoring_session',
    input: {
      studentId: 'student-456',
      subject: 'mathématiques',
      topic: 'fractions',
      duration: 30,
    },
    options: {
      enableEvaluation: true,
      generateReport: true,
    },
  }),
});
```

## Usage Examples

### Exemple 1 : Système multi-agents

```typescript
class MultiAgentSystem {
  private agents: Map<string, AIAgent>;
  private memory: SharedMemory;

  constructor() {
    this.agents = new Map();
    this.memory = new SharedMemory();
  }

  async processQuery(query: string, context: StudentContext): Promise<string> {
    // 1. Modérateur vérifie le contenu
    const moderation = await this.agents.get('moderator')!.process({
      action: 'check',
      content: query,
      context,
    });

    if (moderation.blocked) {
      return "Je ne peux pas répondre à cette question. Autre chose?";
    }

    // 2. Route vers l'agent approprié
    const agent = this.selectAgent(query, context);

    // 3. Récupère le contexte de la mémoire partagée
    const memoryContext = await this.memory.get(context.studentId);

    // 4. Traite la requête
    const response = await agent.process({
      message: query,
      context: {
        ...context,
        previousInteractions: memoryContext,
      },
    });

    // 5. Stocke dans la mémoire
    await this.memory.store(context.studentId, {
      query,
      response: response.content,
      agentId: agent.id,
      timestamp: new Date(),
    });

    return response.content;
  }

  private selectAgent(query: string, context: StudentContext): AIAgent {
    if (/math|calcul|nombre|fraction/.test(query)) {
      return this.agents.get('math_tutor')!;
    }
    if (/français|grammaire|lecture/.test(query)) {
      return this.agents.get('french_tutor')!;
    }
    if (/aide|comment|quoi/.test(query)) {
      return this.agents.get('assistant')!;
    }
    return this.agents.get('general_tutor')!;
  }
}
```

### Exemple 2 : Agent avec tools

```typescript
class TutorWithTools {
  private agent: AIAgent;
  private tools: Map<string, Tool>;

  async processWithTools(message: string): Promise<string> {
    const response = await this.agent.process({
      message,
      tools: this.tools,
    });

    // Exécuter les tool calls si nécessaire
    if (response.toolCalls) {
      for (const toolCall of response.toolCalls) {
        const tool = this.tools.get(toolCall.toolId);
        if (tool) {
          const result = await tool.execute(toolCall.arguments);
          await this.agent.processToolResult(toolCall.id, result);
        }
      }
    }

    return response.content;
  }
}

// Exemple de tool
class SearchKnowledgeTool implements Tool {
  id = 'search_knowledge';
  name = 'Recherche Base de Connaissances';

  async execute(args: { query: string; subject: string }): Promise<unknown> {
    const results = await knowledgeBase.search(args.query, {
      subject: args.subject,
      limit: 5,
    });

    return {
      results: results.map(r => ({
        title: r.title,
        content: r.content,
        relevance: r.score,
      })),
    };
  }
}
```

### Exemple 3 : Workflow de tutorat

```typescript
class TutoringWorkflow {
  async execute(studentId: string, subject: string, topic: string): Promise<WorkflowResult> {
    // Étape 1 : Évaluation initiale
    const assessment = await this.assessStudent(studentId, subject, topic);

    // Étape 2 : Planification
    const plan = await this.createPlan(assessment);

    // Étape 3 : Tutorat
    const tutoringResult = await this.tutorStudent(studentId, plan);

    // Étape 4 : Évaluation finale
    const finalAssessment = await this.assessProgress(studentId, tutoringResult);

    // Étape 5 : Rapport
    const report = await this.generateReport(assessment, finalAssessment);

    return {
      studentId,
      subject,
      topic,
      initialAssessment: assessment,
      finalAssessment: finalAssessment,
      report,
      duration: tutoringResult.duration,
    };
  }
}
```

## Best Practices

### Conception d'agents

1. **Spécialisation** : Un agent = un rôle précis
2. **Prompts clairs** : Instructions précises et structurées
3. **Tools limités** : Ne donner que les tools nécessaires
4. **Mémoire adaptée** : Type et durée selon le cas d'usage
5. **Monitoring** : Journaliser toutes les interactions

### Collaboration

```typescript
// Bon : Agents spécialisés qui collaborent
const workflow = [
  { agent: 'moderator', action: 'validate_input' },
  { agent: 'tutor', action: 'process_query' },
  { agent: 'evaluator', action: 'assess_response' },
];

// Mauvais : Un agent fait tout
const overloadedAgent = {
  capabilities: ['everything'],
};
```

### Gestion des erreurs

```typescript
// Bon : Retry avec backoff
const retryPolicy = {
  maxRetries: 3,
  backoffMultiplier: 2,
  initialDelay: 1000,
};

// Bon : Timeout par agent
const timeout = {
  default: 60000,
  tutoring: 300000,
  moderation: 30000,
};
```

## Security Considerations

- Isolation des agents par école
- Permissions granulaires par tool
- Validation des entrées avant exécution
- Audit trail complet des actions
- Sandboxing des tools externes
- Rate limiting par agent
- Détection d'abus

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `agent_requests_total` | Counter | Requêtes par agent |
| `agent_tool_calls_total` | Counter | Appels tools par agent |
| `agent_tool_errors_total` | Counter | Erreurs tools |
| `agent_response_time_seconds` | Histogram | Temps de réponse |
| `agent_memory_usage` | Gauge | Utilisation mémoire |
| `agent_active_sessions` | Gauge | Sessions actives |
| `agent_collaboration_events` | Counter | Événements collaboration |

### Alertes

```typescript
const agentAlerts = [
  {
    name: 'Agent en erreur',
    condition: 'agent_status == error',
    severity: 'high',
    action: 'restart_agent',
  },
  {
    name: 'Tool call échoué',
    condition: 'agent_tool_errors_total > 10',
    severity: 'medium',
    action: 'disable_tool',
  },
  {
    name: 'Agent surchargé',
    condition: 'agent_active_sessions > 20',
    severity: 'medium',
    action: 'scale_agents',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiAgentNotFoundError` | 404 | Agent introuvable | Vérifier l'ID |
| `AiAgentBusyError` | 429 | Agent occupé | Mettre en file d'attente |
| `AiAgentToolError` | 500 | Erreur de tool | Vérifier le tool |
| `AiAgentTimeoutError` | 408 | Timeout dépassé | Augmenter le timeout |
| `AiAgentMemoryError` | 500 | Erreur mémoire | Vérifier le stockage |
| `AiAgentConfigError` | 400 | Configuration invalide | Vérifier les paramètres |

## Changelog

### Version 2.6.0

- Framework multi-agents
- Agents spécialisés (tutor, assistant, moderator, evaluator)
- Orchestration de workflows
- Mémoire partagée
- Tools extensibles
- Monitoring et traçabilité
- Support des événements temps réel
- Collaboration entre agents
