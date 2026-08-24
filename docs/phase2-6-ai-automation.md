# Phase 2.6: AI Automation and Workflows

## Overview

Le module AI Automation d'EduCI permet de créer et gérer des workflows automatisés basés sur l'IA :批处理, déclencheurs, pipelines de traitement, et orchestration de tâches. Il optimise les processus éducatifs répétitifs et permet une scalabilité opérationnelle.

### Capacités

- Création de workflows visuels
- Déclencheurs temporels et événementiels
- Batch processing pour les opérations volumineuses
- Orchestration multi-services
- Gestion des erreurs et retry
- Monitoring et logging
- Templates de workflows prédéfinis
- API REST pour l'intégration

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│          AI Automation Service               │
├──────────┬──────────┬──────────┬────────────┤
│ Workflow │ Trigger  │  Batch   │  Pipeline  │
│ Engine   │ Manager  │ Processor│  Orchestr. │
├──────────┴──────────┴──────────┴────────────┤
│              Execution Layer                  │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│Queue │Sched │Retry │Error │Metric│ Logger   │
│      │uler  │      │Handle│      │          │
└──────┴──────┴──────┴──────┴──────┴──────────┘
```

### Modèles de données

```typescript
interface AIAutomationWorkflow {
  id: string;
  schoolId?: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  config: WorkflowConfig;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  nextRun?: string;
}

type WorkflowStatus = 'active' | 'inactive' | 'running' | 'error' | 'paused';

interface WorkflowTrigger {
  type: 'schedule' | 'event' | 'webhook' | 'manual';
  config: ScheduleConfig | EventConfig | WebhookConfig;
}

interface ScheduleConfig {
  cron?: string;
  interval?: number;
  timezone: string;
  startDate?: string;
  endDate?: string;
}

interface EventConfig {
  eventType: string;
  filters?: Record<string, unknown>;
}

interface WebhookConfig {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  authentication?: 'none' | 'api_key' | 'bearer';
}

interface WorkflowStep {
  id: string;
  name: string;
  type: StepType;
  config: StepConfig;
  dependencies: string[];
  retryPolicy?: RetryPolicy;
  timeout?: number;
  onError?: 'continue' | 'stop' | 'skip';
}

type StepType =
  | 'ai_call' | 'api_call' | 'database' | 'transform'
  | 'condition' | 'loop' | 'parallel' | 'notify'
  | 'email' | 'export' | 'import' | 'custom';

interface StepConfig {
  service?: string;
  method?: string;
  params?: Record<string, unknown>;
  template?: string;
  condition?: string;
  iterations?: number;
}

interface WorkflowConfig {
  maxConcurrentRuns: number;
  defaultTimeout: number;
  enableLogging: boolean;
  enableMetrics: boolean;
  notifyOnFailure: boolean;
  notifyOnSuccess: boolean;
  retentionDays: number;
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: ExecutionStatus;
  trigger: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  steps: StepExecution[];
  startedAt: string;
  completedAt?: string;
  duration?: number;
  error?: string;
}

type ExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

interface StepExecution {
  stepId: string;
  status: ExecutionStatus;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  error?: string;
  retryCount: number;
}

interface AIBatchJob {
  id: string;
  schoolId?: string;
  name: string;
  type: BatchType;
  status: BatchStatus;
  input: BatchInput;
  config: BatchConfig;
  progress: BatchProgress;
  results?: BatchResults;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

type BatchType =
  | 'evaluation' | 'notification' | 'report'
  | 'import' | 'export' | 'sync' | 'cleanup';

type BatchStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';

interface BatchInput {
  source: string;
  query?: string;
  filters?: Record<string, unknown>;
  data?: unknown[];
}

interface BatchConfig {
  chunkSize: number;
  parallelWorkers: number;
  maxRetries: number;
  timeout: number;
  continueOnError: boolean;
}

interface BatchProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  percentage: number;
  estimatedTimeRemaining?: number;
}

interface BatchResults {
  summary: {
    total: number;
    succeeded: number;
    failed: number;
    skipped: number;
  };
  details: BatchResultItem[];
}

interface BatchResultItem {
  id: string;
  status: 'success' | 'error' | 'skipped';
  data?: unknown;
  error?: string;
}
```

## Configuration

### Workflows

```typescript
import { AI_AUTOMATION_CONFIG } from '@educi/config';

const automationConfig = AI_AUTOMATION_CONFIG;
/*
{
  enabled: true,
  maxConcurrentWorkflows: 10,
  defaultTimeout: 300000,
  enableRetries: true,
  maxRetries: 3,
  retryDelay: 5000,
  logging: {
    enabled: true,
    level: "info",
    retentionDays: 30,
  },
  notifications: {
    enabled: true,
    channels: ["email", "webhook"],
    onFailure: true,
    onSuccess: false,
  }
}
*/
```

### Batch processing

```typescript
const batchConfig = AI_AUTOMATION_CONFIG.batch;
/*
{
  enabled: true,
  maxConcurrentJobs: 5,
  defaultChunkSize: 100,
  maxChunkSize: 1000,
  defaultParallelWorkers: 3,
  maxParallelWorkers: 10,
  timeout: 600000,
  cleanupInterval: 3600000,
  retentionDays: 7,
}
*/
```

### Templates de workflows

```typescript
const workflowTemplates = AI_AUTOMATION_CONFIG.templates;
/*
[
  {
    id: "daily_report",
    name: "Rapport quotidien",
    description: "Génère et envoie le rapport quotidien d'utilisation",
    trigger: { type: "schedule", config: { cron: "0 6 * * *", timezone: "Africa/Abidjan" } },
    steps: [
      { type: "database", name: "Collecter les données" },
      { type: "ai_call", name: "Analyser les tendances" },
      { type: "transform", name: "Générer le rapport" },
      { type: "email", name: "Envoyer aux admin" },
    ],
  },
  {
    id: "batch_assessment",
    name: "Évaluation batch",
    description: "Évalue les réponses de plusieurs élèves en parallèle",
    trigger: { type: "event", config: { eventType: "assessment_submitted" } },
    steps: [
      { type: "ai_call", name: "Évaluer la réponse" },
      { type: "database", name: "Enregistrer les notes" },
      { type: "notify", name: "Notifier l'élève" },
    ],
  },
  {
    id: "cleanup_sessions",
    name: "Nettoyage des sessions",
    description: "Supprime les sessions expirées",
    trigger: { type: "schedule", config: { cron: "0 2 * * *", timezone: "Africa/Abidjan" } },
    steps: [
      { type: "database", name: "Identifier les sessions expirées" },
      { type: "database", name: "Archiver les données importantes" },
      { type: "database", name: "Supprimer les sessions" },
    ],
  },
]
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/automation/workflows` | Lister les workflows | ADMIN |
| POST | `/api/ai/automation/workflows` | Créer un workflow | ADMIN, SUPER_ADMIN |
| GET | `/api/ai/automation/workflows/:id` | Détails d'un workflow | ADMIN |
| PUT | `/api/ai/automation/workflows/:id` | Modifier un workflow | ADMIN |
| DELETE | `/api/ai/automation/workflows/:id` | Supprimer un workflow | SUPER_ADMIN |
| POST | `/api/ai/automation/workflows/:id/run` | Exécuter un workflow | ADMIN |
| POST | `/api/ai/automation/workflows/:id/pause` | Mettre en pause | ADMIN |
| POST | `/api/ai/automation/workflows/:id/resume` | Reprendre | ADMIN |
| GET | `/api/ai/automation/workflows/:id/executions` | Historique | ADMIN |
| GET | `/api/ai/automation/workflows/:id/executions/:execId` | Détails exécution | ADMIN |
| POST | `/api/ai/automation/batch` | Créer un job batch | ENSEIGNANT, ADMIN |
| GET | `/api/ai/automation/batch/:id` | État du batch | ADMIN |
| POST | `/api/ai/automation/batch/:id/cancel` | Annuler un batch | ADMIN |
| GET | `/api/ai/automation/templates` | Templates disponibles | ADMIN |
| POST | `/api/ai/automation/templates/:id/instantiate` | Utiliser un template | ADMIN |

### Exemples de requêtes

#### Créer un workflow

```typescript
const workflow = await fetch('/api/ai/automation/workflows', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: 'Correction automatique des devoirs',
    description: 'Évalue et corrige les devoirs soumis par les élèves',
    trigger: {
      type: 'event',
      config: {
        eventType: 'homework_submitted',
        filters: { subject: 'mathématiques' },
      },
    },
    steps: [
      {
        id: 'step-1',
        name: 'Récupérer le devoir',
        type: 'database',
        config: {
          query: 'SELECT * FROM homework_submissions WHERE id = {{trigger.submissionId}}',
        },
      },
      {
        id: 'step-2',
        name: 'Évaluer avec l\'IA',
        type: 'ai_call',
        config: {
          service: 'ai-service',
          method: 'evaluate',
          params: {
            content: '{{step-1.content}}',
            rubric: '{{step-1.rubric}}',
          },
        },
        dependencies: ['step-1'],
      },
      {
        id: 'step-3',
        name: 'Enregistrer la note',
        type: 'database',
        config: {
          query: 'UPDATE homework_submissions SET grade = {{step-2.grade}}, feedback = {{step-2.feedback}} WHERE id = {{trigger.submissionId}}',
        },
        dependencies: ['step-2'],
      },
      {
        id: 'step-4',
        name: 'Notifier l\'élève',
        type: 'notify',
        config: {
          template: 'homework_graded',
          recipients: ['{{step-1.studentId}}'],
        },
        dependencies: ['step-3'],
      },
    ],
    config: {
      maxConcurrentRuns: 5,
      defaultTimeout: 300000,
      enableLogging: true,
      notifyOnFailure: true,
    },
  }),
});
```

#### Lancer un batch

```typescript
const batch = await fetch('/api/ai/automation/batch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: 'Évaluation des examens de mathématiques',
    type: 'evaluation',
    input: {
      source: 'exam_submissions',
      query: 'SELECT * FROM exam_submissions WHERE exam_id = ? AND subject = ?',
      filters: {
        examId: 'exam-123',
        subject: 'mathématiques',
      },
    },
    config: {
      chunkSize: 50,
      parallelWorkers: 5,
      maxRetries: 2,
      timeout: 600000,
      continueOnError: true,
    },
  }),
});

const result = await batch.json();
// {
//   batchId: "batch-456",
//   status: "queued",
//   totalItems: 250,
//   estimatedTime: 600,
//   statusUrl: "/api/ai/automation/batch/batch-456"
// }
```

## Usage Examples

### Exemple 1 : Workflow de notification

```typescript
class NotificationWorkflow {
  async createWeeklyReportWorkflow(): Promise<AIAutomationWorkflow> {
    return await workflowService.create({
      name: 'Rapport hebdomadaire',
      trigger: {
        type: 'schedule',
        config: {
          cron: '0 8 * * 1', // Chaque lundi à 8h
          timezone: 'Africa/Abidjan',
        },
      },
      steps: [
        {
          id: 'collect',
          name: 'Collecter les données',
          type: 'database',
          config: {
            query: `
              SELECT 
                COUNT(DISTINCT user_id) as active_users,
                COUNT(*) as total_sessions,
                SUM(cost) as total_cost
              FROM ai_sessions
              WHERE created_at >= NOW() - INTERVAL '7 days'
            `,
          },
        },
        {
          id: 'analyze',
          name: 'Analyser avec l\'IA',
          type: 'ai_call',
          config: {
            service: 'ai-analytics',
            method: 'analyze',
            params: { data: '{{collect.result}}' },
          },
          dependencies: ['collect'],
        },
        {
          id: 'format',
          name: 'Formater le rapport',
          type: 'transform',
          config: {
            template: 'weekly_report',
          },
          dependencies: ['analyze'],
        },
        {
          id: 'send',
          name: 'Envoyer par email',
          type: 'email',
          config: {
            to: ['admin@educi.ci', 'direction@educi.ci'],
            subject: 'Rapport hebdomadaire IA - {{date}}',
            body: '{{format.html}}',
            attachments: ['{{format.pdfUrl}}'],
          },
          dependencies: ['format'],
        },
      ],
    });
  }
}
```

### Exemple 2 : Batch processing

```typescript
class BatchProcessor {
  async processGradingBatch(
    examId: string,
    submissions: Submission[]
  ): Promise<AIBatchJob> {
    return await batchService.create({
      name: `Correction examen ${examId}`,
      type: 'evaluation',
      input: {
        source: 'submissions',
        data: submissions,
      },
      config: {
        chunkSize: 25,
        parallelWorkers: 5,
        maxRetries: 2,
        timeout: 300000,
        continueOnError: true,
      },
      onProgress: (progress) => {
        this.notifyProgress(examId, progress);
      },
      onComplete: (results) => {
        this.generateReport(examId, results);
      },
    });
  }
}
```

### Exemple 3 : Déclencheur événementiel

```typescript
class EventTrigger {
  async setupTriggers(): Promise<void> {
    // Déclencher lors de la soumission d'un devoir
    await triggerService.register({
      event: 'homework_submitted',
      workflow: 'grade_homework',
      filters: {
        subject: { $in: ['mathématiques', 'sciences'] },
      },
    });

    // Déclencher lors de l'inscription d'un élève
    await triggerService.register({
      event: 'student_enrolled',
      workflow: 'welcome_student',
    });

    // Déclencher lors d'une alerte de sécurité
    await triggerService.register({
      event: 'safety_alert',
      workflow: 'handle_safety_alert',
      filters: {
        severity: { $gte: 'high' },
      },
    });
  }
}
```

## Best Practices

### Workflows

1. **Modularité** : Une étape = une responsabilité
2. **Idempotence** : Les workflows doivent pouvoir être relancés
3. **Timeouts** : Toujours définir des timeouts
4. **Retry** : Implémenter des politiques de retry
5. **Monitoring** : Logger chaque étape

### Batch processing

```typescript
// Bon : Chunk size adapté
const config = {
  chunkSize: 50, // Pour les évaluations IA
  parallelWorkers: 5,
  timeout: 300000,
};

// Bon : Continue on error pour les batches
const config = {
  continueOnError: true, // Ne pas bloquer sur une erreur
};

// Mauvais : Tout en parallèle
const config = {
  chunkSize: 1000,
  parallelWorkers: 50, // Trop de charge
};
```

### Gestion des erreurs

```typescript
// Bon : Retry avec backoff
const retryPolicy = {
  maxRetries: 3,
  backoffMultiplier: 2,
  initialDelay: 1000,
  maxDelay: 30000,
};

// Bon : Fallback en cas d'erreur
const step = {
  type: 'ai_call',
  onError: 'continue',
  fallback: {
    type: 'database',
    query: 'SELECT default_response FROM fallbacks WHERE type = ?',
  },
};
```

## Security Considerations

- Authentification requise pour les webhooks
- Validation des entrées utilisateur
- Sandboxing des exécutions
- Audit trail des exécutions
- Rate limiting sur les déclencheurs
- Isolation des workflows par école
- Chiffrement des données sensibles
- Suppression sécurisée des anciennes exécutions

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `automation_workflows_total` | Counter | Workflows créés |
| `automation_executions_total` | Counter | Exécutions totales |
| `automation_execution_duration` | Histogram | Durée d'exécution |
| `automation_batch_jobs_total` | Counter | Jobs batch créés |
| `automation_batch_progress` | Gauge | Progression batch |
| `automation_errors_total` | Counter | Erreurs d'exécution |
| `automation_retries_total` | Counter | Tentatives de retry |

### Alertes

```typescript
const automationAlerts = [
  {
    name: 'Workflow en échec',
    condition: 'automation_execution_status == failed',
    severity: 'high',
    action: 'notify_admin',
  },
  {
    name: 'Batch bloqué',
    condition: 'automation_batch_progress < 0.5 AND batch_duration > 1800',
    severity: 'medium',
    action: 'investigate',
  },
  {
    name: 'Trop de retries',
    condition: 'automation_retries_total > 5',
    severity: 'medium',
    action: 'review_workflow',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiWorkflowNotFoundError` | 404 | Workflow introuvable | Vérifier l'ID |
| `AiWorkflowRunningError` | 409 | Workflow déjà en cours | Attendre ou arrêter |
| `AiWorkflowConfigError` | 400 | Configuration invalide | Vérifier les étapes |
| `AiBatchJobError` | 500 | Erreur de batch | Vérifier les logs |
| `AiBatchTimeoutError` | 408 | Timeout batch | Augmenter le timeout |
| `AiTriggerError` | 500 | Erreur de déclencheur | Vérifier l'événement |
| `AiStepError` | 500 | Erreur d'étape | Vérifier la dépendance |

## Changelog

### Version 2.6.0

- Framework de workflows complet
- Déclencheurs temporels et événementiels
- Batch processing parallèle
- Templates de workflows prédéfinis
- Monitoring et logging
- Gestion des erreurs et retry
- API REST pour intégration
- Webhooks personnalisables
