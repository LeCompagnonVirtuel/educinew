# Phase 2.6: AI Education Features

## Overview

Le module AI Education d'EduCI intègre l'intelligence artificielle au cœur de l'expérience éducative : tutorat adaptatif, évaluation intelligente, création de contenu, et suivi de progression. Il est spécialement conçu pour le système scolaire ivoirien avec support des programmes officiels, langues locales, et contexte culturel.

### Capacités

- Tutorat adaptatif avec détection de difficultés
- Évaluation formative et sommative par IA
- Création automatique d'exercices et évaluations
- Suivi de progression et analytics
- Adaptation au programme officiel ivoirien
- Support multilingue (français, Baoulé, Dioula, Bété)
- Gamification et motivation
- Communication avec les parents

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│           AI Education Service               │
├──────────┬──────────┬──────────┬────────────┤
│ Adaptive │ Content  │Progress  │  Commu-    │
│ Tutoring │ Creator  │ Tracker  │ nication   │
├──────────┴──────────┴──────────┴────────────┤
│              Education Models                 │
├──────────┬──────────┬──────────┬────────────┤
│Student   │Curriculum │Assessment│ Gamifi-    │
│Profile   │ Database  │ Engine   │ cation    │
└──────────┴──────────┴──────────┴────────────┘
```

### Modèles de données

```typescript
interface AIStudentProfile {
  id: string;
  userId: string;
  schoolId: string;
  level: EducationLevel;
  subjects: StudentSubject[];
  learningStyle: LearningStyle;
  strengths: string[];
  weaknesses: string[];
  interests: string[];
  languagePreferences: string[];
  aiInteractionHistory: AIInteractionRecord[];
  createdAt: string;
  updatedAt: string;
}

type EducationLevel =
  | 'maternelle' | 'cp' | 'ce1' | 'ce2' | 'cm1' | 'cm2'
  | '6eme' | '5eme' | '4eme' | '3eme'
  | 'seconde' | 'premiere' | 'terminale';

interface StudentSubject {
  subject: string;
  level: number;
  progress: number;
  lastAssessment: AssessmentResult;
  mastery: MasteryLevel;
}

type MasteryLevel = 'novice' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface LearningStyle {
  visual: number;
  auditory: number;
  kinesthetic: number;
  readingWriting: number;
  dominant: 'visual' | 'auditory' | 'kinesthetic' | 'reading_writing';
}

interface AITutoringSession {
  id: string;
  studentId: string;
  subject: string;
  topic: string;
  mode: TutoringMode;
  objectives: string[];
  activities: TutoringActivity[];
  assessment: SessionAssessment;
  duration: number;
  createdAt: string;
}

type TutoringMode =
  | 'discovery' | 'practice' | 'review'
  | 'assessment' | 'remediation' | 'enrichment';

interface TutoringActivity {
  type: 'explanation' | 'exercise' | 'quiz' | 'game' | 'discussion';
  content: string;
  difficulty: number;
  hints: string[];
  solution?: string;
  feedback: string;
  completed: boolean;
  score?: number;
}

interface CurriculumTopic {
  id: string;
  level: EducationLevel;
  subject: string;
  cycle: string;
  competence: string;
  theme: string;
  subtopics: string[];
  prerequisites: string[];
  objectives: string[];
  difficulty: number;
  estimatedHours: number;
}
```

## Configuration

### Programme officiel

```typescript
import { AI_EDUCATION_CONFIG } from '@educi/config';

// Structure du programme ivoirien
const curriculum = AI_EDUCATION_CONFIG.curriculum;
/*
{
  levels: [
    { id: "maternelle", name: "Maternelle", cycle: "prescolaire" },
    { id: "cp", name: "CP", cycle: "elementaire" },
    { id: "ce1", name: "CE1", cycle: "elementaire" },
    { id: "ce2", name: "CE2", cycle: "elementaire" },
    { id: "cm1", name: "CM1", cycle: "elementaire" },
    { id: "cm2", name: "CM2", cycle: "elementaire" },
    { id: "6eme", name: "6ème", cycle: "moyen" },
    { id: "5eme", name: "5ème", cycle: "moyen" },
    { id: "4eme", name: "4ème", cycle: "moyen" },
    { id: "3eme", name: "3ème", cycle: "moyen" },
    { id: "seconde", name: "Seconde", cycle: "secondaire" },
    { id: "premiere", name: "Première", cycle: "secondaire" },
    { id: "terminale", name: "Terminale", cycle: "secondaire" },
  ],
  subjects: [
    { id: "mathematiques", name: "Mathématiques", levels: ["cp", "ce1", "ce2", "cm1", "cm2", "6eme", "5eme", "4eme", "3eme", "seconde", "premiere", "terminale"] },
    { id: "francais", name: "Français", levels: ["cp", "ce1", "ce2", "cm1", "cm2", "6eme", "5eme", "4eme", "3eme"] },
    { id: "anglais", name: "Anglais", levels: ["6eme", "5eme", "4eme", "3eme", "seconde", "premiere", "terminale"] },
    { id: "sciences", name: "Sciences", levels: ["cm1", "cm2", "6eme", "5eme", "4eme", "3eme"] },
    { id: "histoire_geo", name: "Histoire-Géographie", levels: ["cm1", "cm2", "6eme", "5eme", "4eme", "3eme", "seconde", "premiere", "terminale"] },
  ]
}
*/
```

### Tutorat adaptatif

```typescript
const tutoringConfig = AI_EDUCATION_CONFIG.tutoring;
/*
{
  enabled: true,
  defaultMode: "discovery",
  adaptativity: {
    enabled: true,
    adjustmentThreshold: 0.3,
    difficultyRange: [0.1, 1.0],
    hintSystem: true,
    maxHintsPerExercise: 3,
    scaffoldingEnabled: true,
  },
  gamification: {
    enabled: true,
    pointsPerCorrectAnswer: 10,
    streakBonus: 5,
    levelUpThreshold: 100,
    achievementsEnabled: true,
  },
  session: {
    maxDuration: 60,
    breakReminder: 15,
    autoSave: true,
    resumeEnabled: true,
  }
}
*/
```

### Évaluation

```typescript
const assessmentConfig = AI_EDUCATION_CONFIG.assessment;
/*
{
  enabled: true,
  types: {
    formative: { enabled: true, autoGrade: true },
    summative: { enabled: true, autoGrade: false },
    diagnostic: { enabled: true, autoGrade: true },
    selfAssessment: { enabled: true, autoGrade: false },
  },
  feedback: {
    immediate: true,
    detailed: true,
    constructive: true,
    language: "fr",
    includeHints: true,
    includeExamples: true,
  },
  rubrics: {
    enabled: true,
    defaultRubrics: ["compréhension", "application", "analyse", "synthèse"],
  }
}
*/
```

### Création de contenu

```typescript
const contentConfig = AI_EDUCATION_CONFIG.content;
/*
{
  enabled: true,
  autoGenerate: true,
  contentTypes: [
    { type: "exercise", autoGrade: true, difficulty: "adaptive" },
    { type: "quiz", autoGrade: true, questionCount: [5, 20] },
    { type: "lesson", autoGrade: false, format: "markdown" },
    { type: "game", autoGrade: false, formats: ["quiz", "puzzle", "memory"] },
  ],
  validation: {
    humanReview: false,
    autoApproval: true,
    qualityThreshold: 0.8,
  },
  sharing: {
    enabled: true,
    betweenSchools: true,
    publicCatalog: true,
  }
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/education/profiles` | Profils étudiants | ENSEIGNANT, ADMIN |
| GET | `/api/ai/education/profiles/:id` | Profil d'un étudiant | ENSEIGNANT, ADMIN |
| POST | `/api/ai/education/tutoring` | Démarrer un tutorat | ÉLÈVE, ENSEIGNANT |
| POST | `/api/ai/education/tutoring/:sessionId/message` | Message de tutorat | ÉLÈVE, ENSEIGNANT |
| GET | `/api/ai/education/tutoring/:sessionId/progress` | Progression | ÉLÈVE, ENSEIGNANT |
| POST | `/api/ai/education/assessment` | Créer une évaluation | ENSEIGNANT |
| POST | `/api/ai/assessment/:id/submit` | Soumettre des réponses | ÉLÈVE |
| GET | `/api/ai/assessment/:id/results` | Résultats | ÉLÈVE, ENSEIGNANT |
| POST | `/api/ai/education/content/generate` | Générer du contenu | ENSEIGNANT |
| GET | `/api/ai/education/curriculum` | Programme officiel | Tous |
| GET | `/api/ai/education/progress/:studentId` | Progression globale | ENSEIGNANT, PARENT |

### Exemples de requêtes

#### Démarrer une session de tutorat

```typescript
const session = await fetch('/api/ai/education/tutoring', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    studentId: 'student-123',
    subject: 'mathématiques',
    topic: 'fractions',
    mode: 'discovery',
    objectives: [
      'Comprendre la notion de fraction',
      'Lire et écrire des fractions',
    ],
  }),
});

const result = await session.json();
// {
//   sessionId: "tutoring-456",
//   welcomeMessage: "Bonjour ! Aujourd'hui, nous allons explorer les fractions. Tu sais ce qu'est une fraction ?",
//   suggestedActivities: [...],
//   difficulty: 0.4,
//   estimatedDuration: 20
// }
```

#### Générer un exercice

```typescript
const exercise = await fetch('/api/ai/education/content/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    type: 'exercise',
    subject: 'mathématiques',
    level: 'cm2',
    topic: 'fractions',
    difficulty: 0.5,
    count: 5,
    format: 'interactive',
    context: 'marché de Cocody',
  }),
});

const result = await exercise.json();
// {
//   exercises: [
//     {
//       question: "Au marché de Cocody, Koffi a 3/4 d'un sac de riz. Combien lui reste-t-il si on lui en prend 1/4 ?",
//       type: "text_input",
//       hints: ["Pense à un sac de riz coupé en 4 parts"],
//       solution: "2/4 = 1/2",
//       explanation: "3/4 - 1/4 = 2/4 = 1/2"
//     },
//     // ... 4 autres exercices
//   ],
//   estimatedTime: 15,
//   totalPoints: 50
// }
```

#### Obtenir la progression

```typescript
const progress = await fetch('/api/ai/education/progress/student-123', {
  headers: { 'Authorization': `Bearer ${token}` },
});

const result = await progress.json();
// {
//   student: { id: "student-123", name: "Kouamé" },
//   overall: { mastery: 0.72, trend: "improving" },
//   subjects: [
//     {
//       subject: "mathématiques",
//       mastery: 0.85,
//       topics: [
//         { topic: "fractions", mastery: 0.9, status: "mastered" },
//         { topic: "géométrie", mastery: 0.6, status: "learning" },
//       ]
//     }
//   ],
//   recommendations: [
//     "Pratiquer la géométrie avec des exercices visuels",
//     "Revoir les fractions avec des contextes concrets"
//   ]
// }
```

## Usage Examples

### Exemple 1 : Tutorat adaptatif

```typescript
class AdaptiveTutor {
  private profile: AIStudentProfile;

  async startSession(subject: string, topic: string): Promise<TutoringSession> {
    // Analyser le profil
    const mastery = this.getMastery(subject, topic);
    const learningStyle = this.profile.learningStyle;

    // Déterminer le mode
    const mode = this.determineMode(mastery);

    // Sélectionner les activités
    const activities = this.selectActivities(
      topic,
      mode,
      learningStyle,
      mastery
    );

    return {
      activities,
      estimatedDuration: this.estimateDuration(activities),
      difficulty: this.adjustDifficulty(mastery),
    };
  }

  async handleResponse(
    activityId: string,
    response: string
  ): Promise<TutorResponse> {
    // Évaluer la réponse
    const evaluation = await this.evaluateResponse(activityId, response);

    // Ajuster la difficulté
    this.adjustDifficulty(evaluation.score);

    // Générer le feedback
    const feedback = await this.generateFeedback(evaluation);

    // Suggérer la prochaine activité
    const nextActivity = this.suggestNextActivity(evaluation);

    return {
      feedback,
      score: evaluation.score,
      nextActivity,
      masteryUpdate: this.calculateMasteryUpdate(evaluation),
    };
  }

  private determineMode(mastery: number): TutoringMode {
    if (mastery < 0.3) return 'remediation';
    if (mastery < 0.5) return 'discovery';
    if (mastery < 0.8) return 'practice';
    return 'enrichment';
  }
}
```

### Exemple 2 : Création d'évaluation

```typescript
class AssessmentGenerator {
  async generate(params: {
    subject: string;
    level: string;
    topics: string[];
    questionCount: number;
    difficulty: number;
  }): Promise<Assessment> {
    // Sélectionner les compétences
    const competencies = await this.selectCompetencies(
      params.subject,
      params.topics
    );

    // Générer les questions
    const questions = await this.generateQuestions(
      competencies,
      params.questionCount,
      params.difficulty
    );

    // Créer la grille d'évaluation
    const rubric = this.createRubric(competencies);

    // Estimer le temps
    const estimatedTime = this.estimateTime(questions);

    return {
      title: `Évaluation ${params.subject} - ${params.topics.join(', ')}`,
      questions,
      rubric,
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      estimatedTime,
      instructions: this.generateInstructions(params.level),
    };
  }
}
```

### Exemple 3 : Suivi de progression

```typescript
class ProgressTracker {
  async analyzeProgress(studentId: string): Promise<ProgressReport> {
    // Récupérer l'historique
    const history = await this.getInteractionHistory(studentId);

    // Calculer la maîtrise par sujet
    const subjectMastery = this.calculateSubjectMastery(history);

    // Identifier les tendances
    const trends = this.analyzeTrends(history);

    // Générer des recommandations
    const recommendations = await this.generateRecommendations(
      subjectMastery,
      trends
    );

    // Prédire la performance
    const predictions = this.predictPerformance(subjectMastery, trends);

    return {
      summary: {
        overallMastery: this.calculateOverallMastery(subjectMastery),
        improvementRate: this.calculateImprovementRate(trends),
        timeSpent: this.calculateTimeSpent(history),
      },
      subjects: subjectMastery,
      trends,
      recommendations,
      predictions,
      alerts: this.generateAlerts(subjectMastery, trends),
    };
  }
}
```

## Best Practices

### Tutorat

1. **Adapter au niveau** : Commencer par évaluer avant de tutorer
2. **Contextualiser** : Utiliser des exemples ivoiriens (marché, école, famille)
3. **Encourager** : Feedback positif même en cas d'erreur
4. **Varier** : Alterner les types d'activités
5. **Mesurer** : Suivre la progression en temps réel

### Évaluation

```typescript
// Bon : Évaluation formative bienveillante
const formativeFeedback = `Kouamé, tu as bien compris l'idée de fraction !
Tu as trouvé 2/4, c'est excellent. 
Essaie maintenant de simplifier cette fraction.
Rappelle-toi : 2/4 = 1/2.`;

// Mauvais : Évaluation punitive
const punitiveFeedback = `Réponse incorrecte. La bonne réponse était 1/2. 0/5.`;
```

### Multilingue

```typescript
// Bon : Supporter les langues locales
const greeting = {
  fr: "Bonjour ! Comment puis-je t'aider ?",
  bao: "Nno ! N'da m'na srô ?",
  djou: "I ni ce ! N'da mi sunan ?",
};
```

## Security Considerations

- Données des élèves chiffrées et isolées
- Consentement parental pour les mineurs
- Audit trail des interactions IA
- Pas de diagnostic médical ou psychologique
- Respect de la vie privée
- Contrôle parental intégré
- Conformité RGPD et lois ivoiriennes

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `education_tutoring_sessions` | Counter | Sessions de tutorat |
| `education_assessments_taken` | Counter | Évaluations passées |
| `education_content_generated` | Counter | Contenu généré |
| `education_mastery_average` | Gauge | Maîtrise moyenne |
| `education_engagement_score` | Gauge | Score d'engagement |
| `education_session_duration` | Histogram | Durée des sessions |

### Alertes

```typescript
const educationAlerts = [
  {
    name: 'Élève en difficulté',
    condition: 'student_mastery < 0.3',
    severity: 'high',
    action: 'notify_teacher',
  },
  {
    name: 'Désengagement détecté',
    condition: 'engagement_score < 0.2',
    severity: 'medium',
    action: 'suggest_activities',
  },
  {
    name: 'Progression anormale',
    condition: 'mastery_trend < -0.1',
    severity: 'medium',
    action: 'review_student',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiStudentNotFoundError` | 404 | Élève introuvable | Vérifier l'ID |
| `AiCurriculumError` | 500 | Erreur programme | Vérifier la base |
| `AiAssessmentError` | 500 | Erreur d'évaluation | Réessayer |
| `AiContentGenerationError` | 500 | Erreur de génération | Simplifier la requête |
| `AiProfileError` | 500 | Erreur de profil | Recréer le profil |

## Changelog

### Version 2.6.0

- Tutorat adaptatif avec détection de difficultés
- Évaluation formative et sommative par IA
- Création automatique d'exercices
- Suivi de progression avancé
- Support du programme officiel ivoirien
- Multilingue (français, Baoulé, Dioula, Bété)
- Gamification intégrée
- Communication avec les parents
