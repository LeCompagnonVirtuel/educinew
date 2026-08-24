# Interoperability — AI Integration

> Version : 1.0
> Statut : Validé

---

## 1. AI Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AI LAYER                             │
├──────────────┬──────────────┬──────────────────────────┤
│  DeepSeek    │  Gemini      │  Edge Functions          │
│  (Text Gen)  │  (Vision)    │  (Processing)            │
└──────┬───────┴───────┬──────┴────────────┬─────────────┘
       │               │                   │
       ▼               ▼                   ▼
┌─────────────────────────────────────────────────────────┐
│              AI GATEWAY (Edge Function)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Rate      │  │Prompt    │  │Response  │             │
│  │Limiter   │  │Builder   │  │Parser    │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              AI SERVICES                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Auto-Grade│  │Predict   │  │Recomm.   │             │
│  │Service   │  │Analytics │  │Engine    │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Content   │  │Anomaly   │  │Chat      │             │
│  │Generator │  │Detector  │  │Assistant │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              INTEROP LAYER                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │xAPI      │  │LTI       │  │Webhooks  │             │
│  │Analytics │  │Grade AI  │  │AI Events │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

---

## 2. AI Services

### 2.1 Auto-Grading Service

```typescript
interface AutoGradeRequest {
  assignment_id: string;
  student_id: string;
  submission_type: "text" | "code" | "image" | "file";
  content: string;
  rubric: GradingRubric;
  model: "deepseek" | "gemini";
}

interface GradingRubric {
  criteria: Array<{
    name: string;
    description: string;
    weight: number;
    max_score: number;
    indicators: string[];
  }>;
  total_score: number;
  passing_score: number;
}

interface AutoGradeResponse {
  score: number;
  max_score: number;
  percentage: number;
  passed: boolean;
  feedback: {
    overall: string;
    criteria: Array<{
      name: string;
      score: number;
      feedback: string;
      suggestions: string[];
    }>;
  };
  confidence: number;
  model_used: string;
  tokens_used: number;
}

class AutoGradingService {
  private aiGateway: AIGateway;

  constructor() {
    this.aiGateway = new AIGateway();
  }

  async grade(params: AutoGradeRequest): Promise<AutoGradeResponse> {
    // 1. Build prompt with rubric
    const prompt = this.buildGradingPrompt(params);

    // 2. Call AI model
    const response = await this.aiGateway.generate({
      model: params.model,
      prompt,
      max_tokens: 2000,
      temperature: 0.3
    });

    // 3. Parse response
    const result = this.parseGradingResponse(response, params.rubric);

    // 4. Log to xAPI
    await this.logToXAPI({
      verb: "graded",
      student_id: params.student_id,
      assignment_id: params.assignment_id,
      score: result.score,
      model: params.model
    });

    return result;
  }

  private buildGradingPrompt(params: AutoGradeRequest): string {
    return `
You are a professional teacher grading student work.

RUBRIC:
${JSON.stringify(params.rubric, null, 2)}

STUDENT SUBMISSION:
${params.content}

Grade the submission according to the rubric. Return a JSON response with:
- score for each criterion
- overall feedback
- suggestions for improvement

Be fair, consistent, and constructive in your feedback.
`;
  }
}
```

### 2.2 Prediction Analytics

```typescript
interface PredictionRequest {
  student_id?: string;
  class_id?: string;
  prediction_type: "at_risk" | "performance" | "attendance" | "engagement";
  time_horizon: "1_week" | "1_month" | "1_quarter" | "1_year";
  include_recommendations: boolean;
}

interface PredictionResponse {
  predictions: Array<{
    student_id: string;
    student_name: string;
    prediction: number; // 0-1
    confidence: number;
    risk_level: "low" | "medium" | "high" | "critical";
    factors: Array<{
      name: string;
      impact: number;
      description: string;
    }>;
    recommendations: string[];
  }>;
  model_info: {
    model_name: string;
    accuracy: number;
    last_trained: string;
    features_used: number;
  };
}

class PredictionAnalyticsService {
  async predict(params: PredictionRequest): Promise<PredictionResponse> {
    // 1. Gather historical data via interop
    const historicalData = await this.gatherHistoricalData(params);

    // 2. Build feature set
    const features = this.buildFeatureSet(historicalData);

    // 3. Call prediction model
    const predictions = await this.aiGateway.predict({
      model: "edu_prediction_v1",
      features,
      prediction_type: params.prediction_type
    });

    // 4. Generate recommendations
    if (params.include_recommendations) {
      for (const pred of predictions) {
        pred.recommendations = await this.generateRecommendations(pred);
      }
    }

    return {
      predictions,
      model_info: {
        model_name: "edu_prediction_v1",
        accuracy: 0.87,
        last_trained: "2026-07-15",
        features_used: features.length
      }
    };
  }

  private async gatherHistoricalData(
    params: PredictionRequest
  ): Promise<StudentData> {
    // Via xAPI
    const xapiData = await this.xapiConnector.fetchStatements({
      agent: params.student_id,
      verb: "completed",
      limit: 1000
    });

    // Via LTI grades
    const grades = await this.ltiConnector.getGrades(params.student_id);

    // Via attendance
    const attendance = await this.getAttendance(params.student_id);

    return { xapiData, grades, attendance };
  }
}
```

### 2.3 Recommendation Engine

```typescript
interface RecommendationRequest {
  student_id: string;
  context: "course_selection" | "study_plan" | "career_path" | "remediation";
  current_courses?: string[];
  interests?: string[];
  performance?: Record<string, number>;
}

interface RecommendationResponse {
  recommendations: Array<{
    type: string;
    title: string;
    description: string;
    confidence: number;
    reason: string;
    resources?: Array<{
      type: "course" | "exercise" | "video" | "article";
      title: string;
      url: string;
    }>;
  }>;
  learning_path?: {
    steps: Array<{
      order: number;
      action: string;
      description: string;
      estimated_time: string;
    }>;
  };
}

class RecommendationEngine {
  async recommend(params: RecommendationRequest): Promise<RecommendationResponse> {
    const prompt = this.buildRecommendationPrompt(params);

    const response = await this.aiGateway.generate({
      model: "deepseek",
      prompt,
      max_tokens: 3000,
      temperature: 0.7
    });

    return this.parseRecommendationResponse(response);
  }

  private buildRecommendationPrompt(
    params: RecommendationRequest
  ): string {
    return `
You are an academic advisor for a school in Africa.

Student ID: ${params.student_id}
Context: ${params.context}
Current Courses: ${params.current_courses?.join(", ") || "N/A"}
Interests: ${params.interests?.join(", ") || "N/A"}
Performance: ${JSON.stringify(params.performance || {})}

Provide personalized recommendations based on the student's profile.
Consider the African educational context and available resources.
Return a JSON response with recommendations and an optional learning path.
`;
  }
}
```

---

## 3. AI Gateway (Edge Function)

```typescript
// supabase/functions/ai-gateway/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface AIGatewayRequest {
  model: "deepseek" | "gemini";
  action: "generate" | "predict" | "analyze" | "embed";
  prompt?: string;
  features?: Record<string, unknown>[];
  max_tokens?: number;
  temperature?: number;
  school_id: string;
}

serve(async (req: Request) => {
  const gateway = new AIGateway();
  return gateway.handle(req);
});

class AIGateway {
  async handle(req: Request): Promise<Response> {
    const body: AIGatewayRequest = await req.json();

    // 1. Rate limiting
    const allowed = await this.checkRateLimit(body.school_id);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded" }),
        { status: 429 }
      );
    }

    // 2. Validate request
    this.validateRequest(body);

    // 3. Route to provider
    let result: unknown;
    switch (body.model) {
      case "deepseek":
        result = await this.callDeepSeek(body);
        break;
      case "gemini":
        result = await this.callGemini(body);
        break;
    }

    // 4. Log usage
    await this.logUsage({
      school_id: body.school_id,
      model: body.model,
      action: body.action,
      tokens_used: (result as { tokens_used: number }).tokens_used,
      timestamp: new Date().toISOString()
    });

    // 5. Return result
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  }

  private async callDeepSeek(params: AIGatewayRequest): Promise<AIResponse> {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("DEEPSEEK_API_KEY")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: params.prompt }],
        max_tokens: params.max_tokens || 1000,
        temperature: params.temperature || 0.7
      })
    });

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      tokens_used: data.usage.total_tokens,
      model: "deepseek"
    };
  }
}
```

---

## 4. xAPI AI Analytics

```typescript
class XAPIAIAnalytics {
  async analyzeLearningPatterns(
    statements: XAPIStatement[]
  ): Promise<LearningPattern[]> {
    const prompt = `
Analyze these xAPI learning statements and identify patterns:

${JSON.stringify(statements.slice(0, 100), null, 2)}

Identify:
1. Learning style (visual, auditory, kinesthetic)
2. Engagement patterns
3. Knowledge gaps
4. Optimal study times
5. Collaboration patterns

Return JSON with patterns and confidence scores.
`;

    const response = await this.aiGateway.generate({
      model: "deepseek",
      prompt,
      max_tokens: 2000,
      temperature: 0.5
    });

    return JSON.parse(response.content);
  }

  async generateInsights(
    studentId: string,
    timeframe: string
  ): Promise<InsightReport> {
    const statements = await this.xapiConnector.fetchStatements({
      agent: `mailto:${studentId}`,
      since: timeframe
    });

    const patterns = await this.analyzeLearningPatterns(statements);

    return {
      student_id: studentId,
      timeframe,
      patterns,
      recommendations: await this.generateRecommendations(patterns),
      generated_at: new Date().toISOString()
    };
  }
}
```

---

## 5. AI Event Webhooks

```typescript
interface AIWebhookEvent {
  event: "ai.prediction.completed" |
         "ai.grade.completed" |
         "ai.recommendation.completed" |
         "ai.anomaly.detected";
  school_id: string;
  data: Record<string, unknown>;
  timestamp: string;
}

class AIWebhookManager {
  async sendAIEvent(event: AIWebhookEvent): Promise<void> {
    const webhooks = await this.getSubscribedWebhooks(
      event.school_id,
      event.event
    );

    for (const webhook of webhooks) {
      await this.sendWebhook(webhook, event);
    }
  }

  async subscribe(params: {
    school_id: string;
    url: string;
    events: string[];
    secret: string;
  }): Promise<void> {
    await this.supabase.from("ai_webhooks").insert({
      id: crypto.randomUUID(),
      school_id: params.school_id,
      url: params.url,
      events: params.events,
      secret: params.secret,
      active: true
    });
  }
}
```

---

## 6. Usage & Cost Tracking

```typescript
interface AIUsageLog {
  id: string;
  school_id: string;
  user_id?: string;
  model: string;
  action: string;
  tokens_input: number;
  tokens_output: number;
  cost_usd: number;
  latency_ms: number;
  cached: boolean;
  created_at: string;
}

class AIUsageTracker {
  async logUsage(params: Omit<AIUsageLog, "id" | "created_at">): Promise<void> {
    await this.supabase.from("ai_usage_log").insert({
      ...params,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    });
  }

  async getUsageStats(
    schoolId: string,
    period: "day" | "week" | "month"
  ): Promise<UsageStats> {
    const { data } = await this.supabase
      .rpc("get_ai_usage_stats", {
        p_school_id: schoolId,
        p_period: period
      });

    return data;
  }
}
```

---

## 7. Model Pricing

| Model | Input | Output | Context |
|-------|-------|--------|---------|
| DeepSeek Chat | $0.14/1M tokens | $0.28/1M tokens | 128K |
| DeepSeek Coder | $0.14/1M tokens | $0.28/1M tokens | 128K |
| Gemini 1.5 Pro | $1.25/1M tokens | $5.00/1M tokens | 1M |
| Gemini 1.5 Flash | $0.075/1M tokens | $0.30/1M tokens | 1M |
