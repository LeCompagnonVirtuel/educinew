$base = "C:\Users\kouas\Documents\Dev\EduCI\EduCI\web\src\app\api\ai"

function Ensure-Dir($path) {
  if (!(Test-Path $path)) { New-Item -ItemType Directory -Path $path -Force | Out-Null }
}

function Write-Route($relPath, $content) {
  $fullPath = Join-Path $base $relPath
  Ensure-Dir (Split-Path $fullPath -Parent)
  Set-Content -Path $fullPath -Value $content -Encoding UTF8 -NoNewline
  Write-Host "Created: $relPath"
}

$GetOnlyTemplate = @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { IMPORT } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new CLASS(supabase);
    const data = await service.METHOD(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

$PostOnlyTemplate = @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SCHEMA_IMPORT } from '@/features/ai/validators/schemas';
import { SVC_IMPORT } from '@/features/ai/services';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = SCHEMA.parse(body);
    const service = new SVC_CLASS(supabase);
    const data = await service.METHOD(validated);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

$GetPutTemplate = @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { IMPORT } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new CLASS(supabase);
    const data = await service.METHOD(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new CLASS(supabase);
    const data = await service.UPDATE_METHOD(schoolId, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

$GetPostTemplate = @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SCHEMA_IMPORT } from '@/features/ai/validators/schemas';
import { SVC_IMPORT } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new SVC_CLASS(supabase);
    const data = await service.METHOD(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = SCHEMA.parse(body);
    const service = new SVC_CLASS(supabase);
    const data = await service.POST_METHOD(validated);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

function Get-GetOnly($relPath, $import, $class, $method) {
  $content = $GetOnlyTemplate -replace 'IMPORT', $import -replace 'CLASS', $class -replace 'METHOD', $method
  Write-Route $relPath $content
}

function Get-PostOnly($relPath, $schemaImport, $schema, $svcImport, $svcClass, $method) {
  $content = $PostOnlyTemplate -replace 'SCHEMA_IMPORT', $schemaImport -replace 'SCHEMA', $schema -replace 'SVC_IMPORT', $svcImport -replace 'SVC_CLASS', $svcClass -replace 'METHOD', $method
  Write-Route $relPath $content
}

function Get-GetPut($relPath, $import, $class, $getMethod, $updateMethod) {
  $content = $GetPutTemplate -replace 'IMPORT', $import -replace 'CLASS', $class -replace 'METHOD', $getMethod -replace 'UPDATE_METHOD', $updateMethod
  Write-Route $relPath $content
}

function Get-GetPost($relPath, $schemaImport, $schema, $svcImport, $svcClass, $getMethod, $postMethod) {
  $content = $GetPostTemplate -replace 'SCHEMA_IMPORT', $schemaImport -replace 'SCHEMA', $schema -replace 'SVC_IMPORT', $svcImport -replace 'SVC_CLASS', $svcClass -replace 'METHOD', $getMethod -replace 'POST_METHOD', $postMethod
  Write-Route $relPath $content
}

# ============================================================
# 63-71. documents
# ============================================================
Get-GetPost "documents/route.ts" "documentUploadSchema" "documentUploadSchema" "AiDocumentProcessingService" "AiDocumentProcessingService" "listDocuments" "uploadDocument"

Write-Route "documents/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiDocumentProcessingService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiDocumentProcessingService(supabase);
    const data = await service.getDocument(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiDocumentProcessingService(supabase);
    const data = await service.updateDocument(schoolId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiDocumentProcessingService(supabase);
    await service.deleteDocument(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Get-GetPost "documents/[id]/annotations/route.ts" "documentAnnotationSchema" "documentAnnotationSchema" "AiDocumentProcessingService" "AiDocumentProcessingService" "getAnnotations" "createAnnotation"

Get-GetOnly "documents/[id]/export/route.ts" "AiDocumentProcessingService" "AiDocumentProcessingService" "exportDocument"

Get-PostOnly "documents/[id]/share/route.ts" "documentShareSchema" "documentShareSchema" "AiDocumentProcessingService" "AiDocumentProcessingService" "shareDocument"

Get-GetOnly "documents/[id]/versions/route.ts" "AiDocumentProcessingService" "AiDocumentProcessingService" "getDocumentVersions"

Get-PostOnly "documents/ocr/route.ts" "documentOcrSchema" "documentOcrSchema" "AiDocumentProcessingService" "AiDocumentProcessingService" "processOcr"

Get-PostOnly "documents/summarize/route.ts" "documentSummarizationSchema" "documentSummarizationSchema" "AiDocumentProcessingService" "AiDocumentProcessingService" "summarizeDocument"

Get-PostOnly "documents/translate/route.ts" "documentTranslationSchema" "documentTranslationSchema" "AiDocumentProcessingService" "AiDocumentProcessingService" "translateDocument"

# ============================================================
# 72-78. quality
# ============================================================
Get-PostOnly "quality/route.ts" "qualityCheckSchema" "qualityCheckSchema" "AiQualityAssuranceService" "AiQualityAssuranceService" "runQualityCheck"

Get-PostOnly "quality/grammar/route.ts" "grammarCheckSchema" "grammarCheckSchema" "AiQualityAssuranceService" "AiQualityAssuranceService" "checkGrammar"

Get-PostOnly "quality/style/route.ts" "styleCheckSchema" "styleCheckSchema" "AiQualityAssuranceService" "AiQualityAssuranceService" "checkStyle"

Get-PostOnly "quality/factuality/route.ts" "factualityCheckSchema" "factualityCheckSchema" "AiQualityAssuranceService" "AiQualityAssuranceService" "checkFactuality"

Get-PostOnly "quality/bias/route.ts" "qualityBiasCheckSchema" "qualityBiasCheckSchema" "AiQualityAssuranceService" "AiQualityAssuranceService" "checkBias"

Get-PostOnly "quality/plagiarism/route.ts" "plagiarismCheckSchema" "plagiarismCheckSchema" "AiQualityAssuranceService" "AiQualityAssuranceService" "checkPlagiarism"

Get-PostOnly "quality/readability/route.ts" "readabilityCheckSchema" "readabilityCheckSchema" "AiQualityAssuranceService" "AiQualityAssuranceService" "checkReadability"

# ============================================================
# 79-85. voice
# ============================================================
Get-GetOnly "voice/route.ts" "AiVoiceProcessingService" "AiVoiceProcessingService" "getVoiceConfig"

Get-PostOnly "voice/stt/route.ts" "speechToTextSchema" "speechToTextSchema" "AiVoiceProcessingService" "AiVoiceProcessingService" "speechToText"

Get-PostOnly "voice/tts/route.ts" "textToSpeechSchema" "textToSpeechSchema" "AiVoiceProcessingService" "AiVoiceProcessingService" "textToSpeech"

Get-PostOnly "voice/clone/route.ts" "voiceCloneSchema" "voiceCloneSchema" "AiVoiceProcessingService" "AiVoiceProcessingService" "cloneVoice"

Get-PostOnly "voice/transcribe/route.ts" "transcriptionSchema" "transcriptionSchema" "AiVoiceProcessingService" "AiVoiceProcessingService" "transcribeAudio"

Get-PostOnly "voice/translate/route.ts" "voiceTranslationSchema" "voiceTranslationSchema" "AiVoiceProcessingService" "AiVoiceProcessingService" "translateVoice"

Get-PostOnly "voice/authenticate/route.ts" "voiceAuthenticationSchema" "voiceAuthenticationSchema" "AiVoiceProcessingService" "AiVoiceProcessingService" "authenticateVoice"

# ============================================================
# 86-95. vision
# ============================================================
Get-GetOnly "vision/route.ts" "AiVisionProcessingService" "AiVisionProcessingService" "getVisionConfig"

Get-PostOnly "vision/analyze/route.ts" "imageAnalysisSchema" "imageAnalysisSchema" "AiVisionProcessingService" "AiVisionProcessingService" "analyzeImage"

Get-PostOnly "vision/objects/route.ts" "objectDetectionSchema" "objectDetectionSchema" "AiVisionProcessingService" "AiVisionProcessingService" "detectObjects"

Get-PostOnly "vision/faces/route.ts" "faceDetectionSchema" "faceDetectionSchema" "AiVisionProcessingService" "AiVisionProcessingService" "detectFaces"

Get-PostOnly "vision/ocr/route.ts" "visionOcrSchema" "visionOcrSchema" "AiVisionProcessingService" "AiVisionProcessingService" "extractText"

Get-PostOnly "vision/text/route.ts" "textDetectionSchema" "textDetectionSchema" "AiVisionProcessingService" "AiVisionProcessingService" "detectText"

Get-PostOnly "vision/handwriting/route.ts" "handwritingRecognitionSchema" "handwritingRecognitionSchema" "AiVisionProcessingService" "AiVisionProcessingService" "recognizeHandwriting"

Get-PostOnly "vision/diagram/route.ts" "diagramAnalysisSchema" "diagramAnalysisSchema" "AiVisionProcessingService" "AiVisionProcessingService" "analyzeDiagram"

Get-PostOnly "vision/qa/route.ts" "visualQASchema" "visualQASchema" "AiVisionProcessingService" "AiVisionProcessingService" "visualQuestionAnswer"

Get-PostOnly "vision/caption/route.ts" "imageCaptionSchema" "imageCaptionSchema" "AiVisionProcessingService" "AiVisionProcessingService" "generateCaption"

# ============================================================
# 96-104. safety
# ============================================================
Get-GetPost "safety/route.ts" "contentFilterSchema" "contentFilterSchema" "AiSafetyService" "AiSafetyService" "listPolicies" "createPolicy"

Get-PostOnly "safety/content-filter/route.ts" "contentFilterSchema" "contentFilterSchema" "AiSafetyService" "AiSafetyService" "filterContent"

Get-PostOnly "safety/pii/route.ts" "piiDetectionSchema" "piiDetectionSchema" "AiSafetyService" "AiSafetyService" "detectPII"

Get-PostOnly "safety/jailbreak/route.ts" "jailbreakDetectionSchema" "jailbreakDetectionSchema" "AiSafetyService" "AiSafetyService" "detectJailbreak"

Get-PostOnly "safety/injection/route.ts" "promptInjectionSchema" "promptInjectionSchema" "AiSafetyService" "AiSafetyService" "detectInjection"

Get-PostOnly "safety/bias/route.ts" "biasDetectionSchema" "biasDetectionSchema" "AiSafetyService" "AiSafetyService" "detectBias"

Get-PostOnly "safety/classification/route.ts" "safetyClassificationSchema" "safetyClassificationSchema" "AiSafetyService" "AiSafetyService" "classifyContent"

Get-GetPost "safety/incidents/route.ts" "incidentReportSchema" "incidentReportSchema" "AiSafetyService" "AiSafetyService" "listIncidents" "reportIncident"

Get-PostOnly "safety/age-verification/route.ts" "ageVerificationSchema" "ageVerificationSchema" "AiSafetyService" "AiSafetyService" "verifyAge"

# ============================================================
# 105-110. moderation
# ============================================================
Get-GetPost "moderation/route.ts" "moderationQueueSchema" "moderationQueueSchema" "AiModerationService" "AiModerationService" "getModerationData" "createModerationEntry"

Get-GetPost "moderation/queue/route.ts" "moderationQueueSchema" "moderationQueueSchema" "AiModerationService" "AiModerationService" "getQueue" "addToQueue"

Get-PostOnly "moderation/action/route.ts" "moderationActionSchema" "moderationActionSchema" "AiModerationService" "AiModerationService" "takeAction"

Get-GetPost "moderation/reports/route.ts" "userReportSchema" "userReportSchema" "AiModerationService" "AiModerationService" "getReports" "submitReport"

Get-GetPost "moderation/appeals/route.ts" "appealSchema" "appealSchema" "AiModerationService" "AiModerationService" "getAppeals" "submitAppeal"

Get-PostOnly "moderation/shadow-ban/route.ts" "shadowBanSchema" "shadowBanSchema" "AiModerationService" "AiModerationService" "applyShadowBan"

# ============================================================
# 111-115. ethics
# ============================================================
Get-GetPost "ethics/route.ts" "ethicsCheckSchema" "ethicsCheckSchema" "AiEthicsService" "AiEthicsService" "listChecks" "runCheck"

Get-PostOnly "ethics/check/route.ts" "ethicsCheckSchema" "ethicsCheckSchema" "AiEthicsService" "AiEthicsService" "checkEthics"

Get-PostOnly "ethics/bias/route.ts" "biasMitigationSchema" "biasMitigationSchema" "AiEthicsService" "AiEthicsService" "mitigateBias"

Get-PostOnly "ethics/fairness/route.ts" "fairnessCheckSchema" "fairnessCheckSchema" "AiEthicsService" "AiEthicsService" "checkFairness"

Get-GetPost "ethics/model-card/route.ts" "modelCardSchema" "modelCardSchema" "AiEthicsService" "AiEthicsService" "getModelCards" "createModelCard"

# ============================================================
# 116-124. analytics
# ============================================================
Get-GetOnly "analytics/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getAnalytics"

Get-GetOnly "analytics/usage/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getUsageAnalytics"

Get-GetOnly "analytics/performance/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getPerformanceAnalytics"

Get-GetOnly "analytics/quality/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getQualityAnalytics"

Get-GetOnly "analytics/cost/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getCostAnalytics"

Get-GetOnly "analytics/cohort/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getCohortAnalytics"

Get-GetOnly "analytics/funnel/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getFunnelAnalytics"

Get-GetOnly "analytics/heatmap/route.ts" "AiAnalyticsService" "AiAnalyticsService" "getHeatmapAnalytics"

Get-GetPost "analytics/ab-test/route.ts" "experimentSchema" "experimentSchema" "AiAnalyticsService" "AiAnalyticsService" "getABTests" "createABTest"

# ============================================================
# 125-129. dashboard
# ============================================================
Get-GetPut "dashboard/route.ts" "AiDashboardService" "AiDashboardService" "getDashboard" "updateDashboard"

Get-GetPost "dashboard/widgets/route.ts" "widgetSchema" "widgetSchema" "AiDashboardService" "AiDashboardService" "getWidgets" "addWidget"

Get-PostOnly "dashboard/share/route.ts" "dashboardShareSchema" "dashboardShareSchema" "AiDashboardService" "AiDashboardService" "shareDashboard"

Get-GetPost "dashboard/templates/route.ts" "dashboardTemplateSchema" "dashboardTemplateSchema" "AiDashboardService" "AiDashboardService" "getTemplates" "createTemplate"

Get-GetPost "dashboard/alerts/route.ts" "dashboardAlertSchema" "dashboardAlertSchema" "AiDashboardService" "AiDashboardService" "getAlerts" "createAlert"

# ============================================================
# 130-135. insights
# ============================================================
Get-GetOnly "insights/route.ts" "AiInsightService" "AiInsightService" "getInsights"

Get-GetOnly "insights/trends/route.ts" "AiInsightService" "AiInsightService" "getTrends"

Get-GetOnly "insights/anomalies/route.ts" "AiInsightService" "AiInsightService" "getAnomalies"

Get-GetOnly "insights/correlations/route.ts" "AiInsightService" "AiInsightService" "getCorrelations"

Get-GetOnly "insights/predictions/route.ts" "AiInsightService" "AiInsightService" "getPredictions"

Get-GetOnly "insights/recommendations/route.ts" "AiInsightService" "AiInsightService" "getRecommendations"

# ============================================================
# 136-140. predictions
# ============================================================
Get-GetPost "predictions/route.ts" "predictionRequestSchema" "predictionRequestSchema" "AiPredictionService" "AiPredictionService" "getPredictions" "runPrediction"

Get-GetPut "predictions/config/route.ts" "AiPredictionService" "AiPredictionService" "getConfig" "updateConfig"

Get-PostOnly "predictions/backtest/route.ts" "backtestSchema" "backtestSchema" "AiPredictionService" "AiPredictionService" "runBacktest"

Get-PostOnly "predictions/ensemble/route.ts" "ensembleSchema" "ensembleSchema" "AiPredictionService" "AiPredictionService" "createEnsemble"

Get-PostOnly "predictions/drift/route.ts" "driftDetectionSchema" "driftDetectionSchema" "AiPredictionService" "AiPredictionService" "detectDrift"

# ============================================================
# 141-144. recommendations
# ============================================================
Get-GetPost "recommendations/route.ts" "recommendationRequestSchema" "recommendationRequestSchema" "AiRecommendationService" "AiRecommendationService" "getRecommendations" "createRecommendation"

Get-PostOnly "recommendations/feedback/route.ts" "recommendationFeedbackSchema" "recommendationFeedbackSchema" "AiRecommendationService" "AiRecommendationService" "submitFeedback"

Get-GetOnly "recommendations/knowledge-graph/route.ts" "AiRecommendationService" "AiRecommendationService" "getKnowledgeGraph"

Get-PostOnly "recommendations/context/route.ts" "contextAwareRecommendationSchema" "contextAwareRecommendationSchema" "AiRecommendationService" "AiRecommendationService" "getContextRecommendations"

# ============================================================
# 145-150. automation
# ============================================================
Get-GetPost "automation/route.ts" "automationWorkflowSchema" "automationWorkflowSchema" "AiAutomationService" "AiAutomationService" "listWorkflows" "createWorkflow"

Get-GetPost "automation/triggers/route.ts" "automationTriggerSchema" "automationTriggerSchema" "AiAutomationService" "AiAutomationService" "getTriggers" "createTrigger"

Get-GetPost "automation/scheduled/route.ts" "scheduledExecutionSchema" "scheduledExecutionSchema" "AiAutomationService" "AiAutomationService" "getScheduledExecutions" "scheduleExecution"

Get-GetPost "automation/events/route.ts" "eventListenerSchema" "eventListenerSchema" "AiAutomationService" "AiAutomationService" "getEventListeners" "createEventListener"

Get-GetPost "automation/webhooks/route.ts" "automationWebhookSchema" "automationWebhookSchema" "AiAutomationService" "AiAutomationService" "getWebhooks" "createWebhook"

Get-GetPost "automation/templates/route.ts" "automationWorkflowTemplateSchema" "automationWorkflowTemplateSchema" "AiAutomationService" "AiAutomationService" "getTemplates" "createTemplate"

# ============================================================
# 151-159. workflow
# ============================================================
Get-GetPost "workflow/route.ts" "workflowExecutionSchema" "workflowExecutionSchema" "AiWorkflowService" "AiWorkflowService" "listWorkflows" "createWorkflow"

Write-Route "workflow/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiWorkflowService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiWorkflowService(supabase);
    const data = await service.getWorkflow(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiWorkflowService(supabase);
    const data = await service.updateWorkflow(schoolId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiWorkflowService(supabase);
    await service.deleteWorkflow(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Get-GetPost "workflow/[id]/steps/route.ts" "workflowStepSchema" "workflowStepSchema" "AiWorkflowService" "AiWorkflowService" "getSteps" "addStep"

Get-PostOnly "workflow/[id]/execute/route.ts" "workflowExecutionSchema" "workflowExecutionSchema" "AiWorkflowService" "AiWorkflowService" "executeWorkflow"

Get-PostOnly "workflow/[id]/rollback/route.ts" "workflowRollbackSchema" "workflowRollbackSchema" "AiWorkflowService" "AiWorkflowService" "rollbackWorkflow"

Get-GetOnly "workflow/[id]/versions/route.ts" "AiWorkflowService" "AiWorkflowService" "getWorkflowVersions"

Get-PostOnly "workflow/[id]/test/route.ts" "workflowExecutionSchema" "workflowExecutionSchema" "AiWorkflowService" "AiWorkflowService" "testWorkflow"

Get-PostOnly "workflow/[id]/deploy/route.ts" "workflowExecutionSchema" "workflowExecutionSchema" "AiWorkflowService" "AiWorkflowService" "deployWorkflow"

Get-GetOnly "workflow/[id]/monitor/route.ts" "AiWorkflowService" "AiWorkflowService" "monitorWorkflow"

# ============================================================
# 160-167. scheduling
# ============================================================
Get-GetPost "scheduling/route.ts" "scheduleSchema" "scheduleSchema" "AiScheduleService" "AiScheduleService" "listSchedules" "createSchedule"

Write-Route "scheduling/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiScheduleService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiScheduleService(supabase);
    const data = await service.getSchedule(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiScheduleService(supabase);
    const data = await service.updateSchedule(schoolId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiScheduleService(supabase);
    await service.deleteSchedule(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Get-GetOnly "scheduling/conflicts/route.ts" "AiScheduleService" "AiScheduleService" "getConflicts"

Get-PostOnly "scheduling/optimize/route.ts" "optimizationSchema" "optimizationSchema" "AiScheduleService" "AiScheduleService" "optimizeSchedule"

Get-GetPost "scheduling/templates/route.ts" "scheduleTemplateSchema" "scheduleTemplateSchema" "AiScheduleService" "AiScheduleService" "getTemplates" "createTemplate"

Get-PostOnly "scheduling/publish/route.ts" "publicationSchema" "publicationSchema" "AiScheduleService" "AiScheduleService" "publishSchedule"

Get-GetPost "scheduling/reminders/route.ts" "reminderSchema" "reminderSchema" "AiScheduleService" "AiScheduleService" "getReminders" "createReminder"

Get-PostOnly "scheduling/calendar-sync/route.ts" "calendarSyncSchema" "calendarSyncSchema" "AiScheduleService" "AiScheduleService" "syncCalendar"

# ============================================================
# 168-175. notifications
# ============================================================
Get-GetPost "notifications/route.ts" "notificationSchema" "notificationSchema" "AiNotificationService" "AiNotificationService" "listNotifications" "createNotification"

Write-Route "notifications/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiNotificationService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiNotificationService(supabase);
    const data = await service.getNotification(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiNotificationService(supabase);
    const data = await service.updateNotification(schoolId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiNotificationService(supabase);
    await service.deleteNotification(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Get-PostOnly "notifications/batch/route.ts" "notificationBatchSchema" "notificationBatchSchema" "AiNotificationService" "AiNotificationService" "sendBatch"

Get-GetPost "notifications/templates/route.ts" "notificationTemplateSchema" "notificationTemplateSchema" "AiNotificationService" "AiNotificationService" "getTemplates" "createTemplate"

Get-GetPut "notifications/preferences/route.ts" "AiNotificationService" "AiNotificationService" "getPreferences" "updatePreferences"

Get-GetPost "notifications/digest/route.ts" "notificationDigestSchema" "notificationDigestSchema" "AiNotificationService" "AiNotificationService" "getDigests" "createDigest"

Get-GetOnly "notifications/history/route.ts" "AiNotificationService" "AiNotificationService" "getHistory"

Get-PostOnly "notifications/test/route.ts" "notificationSchema" "notificationSchema" "AiNotificationService" "AiNotificationService" "sendTestNotification"

# ============================================================
# 176-181. integrations
# ============================================================
Get-GetPost "integrations/route.ts" "integrationSchema" "integrationSchema" "AiIntegrationService" "AiIntegrationService" "listIntegrations" "createIntegration"

Write-Route "integrations/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiIntegrationService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiIntegrationService(supabase);
    const data = await service.getIntegration(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiIntegrationService(supabase);
    const data = await service.updateIntegration(schoolId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiIntegrationService(supabase);
    await service.deleteIntegration(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Get-GetPost "integrations/webhooks/route.ts" "integrationWebhookSchema" "integrationWebhookSchema" "AiIntegrationService" "AiIntegrationService" "getWebhooks" "createWebhook"

Get-GetPost "integrations/api-keys/route.ts" "integrationApiKeySchema" "integrationApiKeySchema" "AiIntegrationService" "AiIntegrationService" "getApiKeys" "createApiKey"

Get-GetPost "integrations/oauth2/route.ts" "oauth2Schema" "oauth2Schema" "AiIntegrationService" "AiIntegrationService" "getOAuth2Configs" "createOAuth2Config"

Get-GetOnly "integrations/versions/route.ts" "AiIntegrationService" "AiIntegrationService" "getVersions"

# ============================================================
# 182-184. api-keys
# ============================================================
Get-GetPost "api-keys/route.ts" "keyManagementSchema" "keyManagementSchema" "AiApiKeyService" "AiApiKeyService" "listApiKeys" "createApiKey"

Write-Route "api-keys/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiApiKeyService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiApiKeyService(supabase);
    const data = await service.getApiKey(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'API key not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiApiKeyService(supabase);
    const data = await service.updateApiKey(schoolId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiApiKeyService(supabase);
    await service.deleteApiKey(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Get-PostOnly "api-keys/[id]/rotate/route.ts" "keyManagementSchema" "keyManagementSchema" "AiApiKeyService" "AiApiKeyService" "rotateApiKey"

# ============================================================
# 185-188. rate-limits
# ============================================================
Get-GetPut "rate-limits/route.ts" "AiRateLimitService" "AiRateLimitService" "getRateLimits" "updateRateLimits"

Get-GetOnly "rate-limits/status/route.ts" "AiRateLimitService" "AiRateLimitService" "getStatus"

Get-PostOnly "rate-limits/override/route.ts" "rateLimitConfigSchema" "rateLimitConfigSchema" "AiRateLimitService" "AiRateLimitService" "createOverride"

Get-GetOnly "rate-limits/analytics/route.ts" "AiRateLimitService" "AiRateLimitService" "getAnalytics"

# ============================================================
# 189-192. cache
# ============================================================
Get-GetPut "cache/route.ts" "AiCacheService" "AiCacheService" "getCacheConfig" "updateCacheConfig"

Get-GetOnly "cache/status/route.ts" "AiCacheService" "AiCacheService" "getStatus"

Get-PostOnly "cache/invalidate/route.ts" "cacheInvalidationSchema" "cacheInvalidationSchema" "AiCacheService" "AiCacheService" "invalidateCache"

Get-GetOnly "cache/analytics/route.ts" "AiCacheService" "AiCacheService" "getAnalytics"

# ============================================================
# 193-197. storage
# ============================================================
Get-GetPut "storage/route.ts" "AiStorageService" "AiStorageService" "getStorageConfig" "updateStorageConfig"

Get-PostOnly "storage/upload/route.ts" "fileUploadSchema" "fileUploadSchema" "AiStorageService" "AiStorageService" "uploadFile"

Get-PostOnly "storage/share/route.ts" "fileShareSchema" "fileShareSchema" "AiStorageService" "AiStorageService" "shareFile"

Get-GetOnly "storage/quota/route.ts" "AiStorageService" "AiStorageService" "getQuota"

Get-PostOnly "storage/backup/route.ts" "backupSchema" "backupSchema" "AiStorageService" "AiStorageService" "createBackup"

# ============================================================
# 198-201. logs
# ============================================================
Get-GetPost "logs/route.ts" "logEntrySchema" "logEntrySchema" "AiLogService" "AiLogService" "listLogs" "createLogEntry"

Get-GetOnly "logs/entries/route.ts" "AiLogService" "AiLogService" "getEntries"

Get-PostOnly "logs/remote/route.ts" "remoteLogSchema" "remoteLogSchema" "AiLogService" "AiLogService" "sendRemoteLog"

Get-GetOnly "logs/audit/route.ts" "AiLogService" "AiLogService" "getAuditLogs"

# ============================================================
# 202-207. monitoring
# ============================================================
Get-GetOnly "monitoring/route.ts" "AiMonitorService" "AiMonitorService" "getMonitoringData"

Get-GetOnly "monitoring/health/route.ts" "AiMonitorService" "AiMonitorService" "getHealthStatus"

Get-GetOnly "monitoring/performance/route.ts" "AiMonitorService" "AiMonitorService" "getPerformanceMetrics"

Get-GetOnly "monitoring/availability/route.ts" "AiMonitorService" "AiMonitorService" "getAvailability"

Get-GetOnly "monitoring/security/route.ts" "AiMonitorService" "AiMonitorService" "getSecurityStatus"

Get-GetOnly "monitoring/resources/route.ts" "AiMonitorService" "AiMonitorService" "getResourceMetrics"

# ============================================================
# 208-213. alerts
# ============================================================
Get-GetPost "alerts/route.ts" "alertSchema" "alertSchema" "AiAlertService" "AiAlertService" "listAlerts" "createAlert"

Write-Route "alerts/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAlertService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAlertService(supabase);
    const data = await service.getAlert(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAlertService(supabase);
    const data = await service.updateAlert(schoolId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAlertService(supabase);
    await service.deleteAlert(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Get-PostOnly "alerts/escalation/route.ts" "alertEscalationSchema" "alertEscalationSchema" "AiAlertService" "AiAlertService" "createEscalation"

Get-GetPost "alerts/templates/route.ts" "alertTemplateSchema" "alertTemplateSchema" "AiAlertService" "AiAlertService" "getTemplates" "createTemplate"

Get-PostOnly "alerts/suppression/route.ts" "alertSuppressionSchema" "alertSuppressionSchema" "AiAlertService" "AiAlertService" "createSuppression"

Get-GetOnly "alerts/analytics/route.ts" "AiAlertService" "AiAlertService" "getAlertAnalytics"

# ============================================================
# 214-218. health-check
# ============================================================
Get-GetOnly "health-check/route.ts" "AiHealthCheckService" "AiHealthCheckService" "getHealthCheck"

Get-GetOnly "health-check/components/route.ts" "AiHealthCheckService" "AiHealthCheckService" "getComponentChecks"

Get-GetOnly "health-check/deep/route.ts" "AiHealthCheckService" "AiHealthCheckService" "getDeepCheck"

Get-GetOnly "health-check/readiness/route.ts" "AiHealthCheckService" "AiHealthCheckService" "getReadiness"

Get-GetOnly "health-check/liveness/route.ts" "AiHealthCheckService" "AiHealthCheckService" "getLiveness"

# ============================================================
# 219-222. load-balancer
# ============================================================
Get-GetPut "load-balancer/route.ts" "AiLoadBalancerService" "AiLoadBalancerService" "getLoadBalancer" "updateLoadBalancer"

Get-GetOnly "load-balancer/sessions/route.ts" "AiLoadBalancerService" "AiLoadBalancerService" "getSessions"

Get-GetPut "load-balancer/circuit-breaker/route.ts" "AiLoadBalancerService" "AiLoadBalancerService" "getCircuitBreaker" "updateCircuitBreaker"

Get-GetOnly "load-balancer/analytics/route.ts" "AiLoadBalancerService" "AiLoadBalancerService" "getAnalytics"

# ============================================================
# 223-226. scaling
# ============================================================
Get-GetPut "scaling/route.ts" "AiScalingService" "AiScalingService" "getScalingConfig" "updateScalingConfig"

Get-GetPost "scaling/predictive/route.ts" "predictiveScalingSchema" "predictiveScalingSchema" "AiScalingService" "AiScalingService" "getPredictiveScaling" "configurePredictiveScaling"

Get-GetPost "scaling/scheduled/route.ts" "scheduledScalingSchema" "scheduledScalingSchema" "AiScalingService" "AiScalingService" "getScheduledScaling" "configureScheduledScaling"

Get-GetOnly "scaling/metrics/route.ts" "AiScalingService" "AiScalingService" "getScalingMetrics"

# ============================================================
# 227-232. security
# ============================================================
Get-GetOnly "security/route.ts" "AiSecurityService" "AiSecurityService" "getSecurityOverview"

Get-GetPost "security/authentication/route.ts" "authenticationSchema" "authenticationSchema" "AiSecurityService" "AiSecurityService" "getAuthMethods" "configureAuth"

Get-GetPost "security/authorization/route.ts" "authorizationSchema" "authorizationSchema" "AiSecurityService" "AiSecurityService" "getAuthorization" "checkAuthorization"

Get-GetPost "security/csrf/route.ts" "csrfSchema" "csrfSchema" "AiSecurityService" "AiSecurityService" "getCsrfConfig" "updateCsrfConfig"

Get-GetPut "security/password-policy/route.ts" "AiSecurityService" "AiSecurityService" "getPasswordPolicy" "updatePasswordPolicy"

Get-GetPost "security/2fa/route.ts" "twoFactorSchema" "twoFactorSchema" "AiSecurityService" "AiSecurityService" "get2FAConfig" "configure2FA"

# ============================================================
# 233-236. encryption
# ============================================================
Get-GetPut "encryption/route.ts" "AiEncryptionService" "AiEncryptionService" "getEncryptionConfig" "updateEncryptionConfig"

Get-GetPost "encryption/keys/route.ts" "keyManagementSchema" "keyManagementSchema" "AiEncryptionService" "AiEncryptionService" "getKeys" "createKey"

Get-GetOnly "encryption/fields/route.ts" "AiEncryptionService" "AiEncryptionService" "getFieldEncryption"

Get-GetPost "encryption/certificates/route.ts" "certificateSchema" "certificateSchema" "AiEncryptionService" "AiEncryptionService" "getCertificates" "createCertificate"

# ============================================================
# 237-241. authorization
# ============================================================
Get-GetOnly "authorization/route.ts" "AiAuthorizationService" "AiAuthorizationService" "getAuthorizationOverview"

Get-GetPost "authorization/rbac/route.ts" "rbacSchema" "rbacSchema" "AiAuthorizationService" "AiAuthorizationService" "getRBAC" "configureRBAC"

Get-GetOnly "authorization/permissions/route.ts" "AiAuthorizationService" "AiAuthorizationService" "getPermissions"

Get-GetPost "authorization/policy/route.ts" "policySchema" "policySchema" "AiAuthorizationService" "AiAuthorizationService" "getPolicies" "createPolicy"

Get-PostOnly "authorization/context/route.ts" "contextAuthorizationSchema" "contextAuthorizationSchema" "AiAuthorizationService" "AiAuthorizationService" "checkContextAuthorization"

# ============================================================
# 242-246. audit
# ============================================================
Get-GetPost "audit/route.ts" "auditEventSchema" "auditEventSchema" "AiAuditService" "AiAuditService" "listAuditEvents" "createAuditEvent"

Get-GetOnly "audit/events/route.ts" "AiAuditService" "AiAuditService" "getEvents"

Get-PostOnly "audit/query/route.ts" "auditQuerySchema" "auditQuerySchema" "AiAuditService" "AiAuditService" "queryAudit"

Get-GetOnly "audit/reports/route.ts" "AiAuditService" "AiAuditService" "getReports"

Get-GetOnly "audit/compliance/route.ts" "AiAuditService" "AiAuditService" "getCompliance"

# ============================================================
# 247-250. compliance
# ============================================================
Get-GetPost "compliance/route.ts" "complianceSchema" "complianceSchema" "AiComplianceService" "AiComplianceService" "listCompliance" "runCompliance"

Get-GetPost "compliance/checks/route.ts" "complianceCheckSchema" "complianceCheckSchema" "AiComplianceService" "AiComplianceService" "getChecks" "runCheck"

Get-GetPost "compliance/consent/route.ts" "consentManagementSchema" "consentManagementSchema" "AiComplianceService" "AiComplianceService" "getConsents" "manageConsent"

Get-GetOnly "compliance/data-protection/route.ts" "AiComplianceService" "AiComplianceService" "getDataProtection"

Write-Host "Phase 2 complete! All 250 routes generated."
Write-Host "Total routes created. Cleaning up..."
