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

# ============================================================
# 1. models/route.ts - GET, POST
# ============================================================
Write-Route "models/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { aiModelQuerySchema, createAiModelSchema } from '@/features/ai/validators/schemas';
import { AiModelService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const query = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
      search: searchParams.get('search') || undefined,
      provider: searchParams.get('provider') || undefined,
      isActive: searchParams.get('isActive') !== null ? searchParams.get('isActive') === 'true' : undefined,
      capability: searchParams.get('capability') || undefined,
      sortBy: (searchParams.get('sortBy') || 'createdAt') as 'name' | 'createdAt' | 'updatedAt' | 'version',
      sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
    };

    const service = new AiModelService(supabase);
    const data = await service.listModels(schoolId, query);
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
    const validated = createAiModelSchema.parse(body);
    const service = new AiModelService(supabase);
    const data = await service.createModel(validated.schoolId, validated);
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

# ============================================================
# 2. models/[id]/route.ts - GET, PUT, DELETE
# ============================================================
Write-Route "models/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updateAiModelSchema } from '@/features/ai/validators/schemas';
import { AiModelService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiModelService(supabase);
    const data = await service.getModel(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Model not found' }, { status: 404 });
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
    const validated = updateAiModelSchema.parse(body);
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiModelService(supabase);
    const data = await service.updateModel(schoolId, params.id, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
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

    const service = new AiModelService(supabase);
    await service.deleteModel(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# Helper function for simple GET-only routes
# ============================================================
function Write-GetOnlyRoute($relPath, $serviceName, $serviceClass, $methodName, $queryParam) {
  $content = @"
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { $serviceClass } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new $serviceClass(supabase);
    const data = await service.$methodName(schoolId$(if ($queryParam) { `, searchParams` }));
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
"@
  Write-Route $relPath $content
}

# Helper function for POST-only routes
function Write-PostOnlyRoute($relPath, $serviceClass, $methodName, $schemaName, $schemaImport) {
  $importLine = if ($schemaImport) { "import { $schemaName } from '@/features/ai/validators/schemas';" } else { "" }
  $validation = if ($schemaImport) { "
    const validated = $schemaName.parse(body);" } else { "" }
  $call = if ($schemaImport) { "validated.schoolId, validated" } else { "schoolId" }

  $content = @"
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
$importLine
import { $serviceClass } from '@/features/ai/services';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
$validation
    const service = new $serviceClass(supabase);
    const data = await service.$methodName($call);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
"@
  Write-Route $relPath $content
}

# ============================================================
# 3-4. prompts
# ============================================================
Write-Route "prompts/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createPromptTemplateSchema } from '@/features/ai/validators/schemas';
import { AiPromptTemplateService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const query = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      sortBy: (searchParams.get('sortBy') || 'createdAt') as 'name' | 'createdAt' | 'updatedAt' | 'category',
      sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
    };

    const service = new AiPromptTemplateService(supabase);
    const data = await service.listTemplates(schoolId, query);
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
    const validated = createPromptTemplateSchema.parse(body);
    const service = new AiPromptTemplateService(supabase);
    const data = await service.createTemplate(validated.schoolId, validated);
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

Write-Route "prompts/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updatePromptTemplateSchema } from '@/features/ai/validators/schemas';
import { AiPromptTemplateService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiPromptTemplateService(supabase);
    const data = await service.getTemplate(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Template not found' }, { status: 404 });
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
    const validated = updatePromptTemplateSchema.parse(body);
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiPromptTemplateService(supabase);
    const data = await service.updateTemplate(schoolId, params.id, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
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

    const service = new AiPromptTemplateService(supabase);
    await service.deleteTemplate(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "prompts/[id]/versions/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { promptTemplateVersionSchema } from '@/features/ai/validators/schemas';
import { AiPromptVersionService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiPromptVersionService(supabase);
    const data = await service.getVersions(schoolId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = promptTemplateVersionSchema.parse({ ...body, templateId: params.id });
    const service = new AiPromptVersionService(supabase);
    const data = await service.createVersion(validated.templateId, validated);
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

# ============================================================
# 5-8. sessions
# ============================================================
Write-Route "sessions/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createSessionSchema } from '@/features/ai/validators/schemas';
import { AiSessionService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const query = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
      search: searchParams.get('search') || undefined,
      modelId: searchParams.get('modelId') || undefined,
      isArchived: searchParams.get('isArchived') !== null ? searchParams.get('isArchived') === 'true' : undefined,
      sortBy: (searchParams.get('sortBy') || 'createdAt') as 'title' | 'createdAt' | 'updatedAt' | 'messageCount',
      sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
    };

    const service = new AiSessionService(supabase);
    const data = await service.listSessions(schoolId, query);
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
    const validated = createSessionSchema.parse(body);
    const service = new AiSessionService(supabase);
    const data = await service.createSession(validated.schoolId, validated);
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

Write-Route "sessions/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updateSessionSchema } from '@/features/ai/validators/schemas';
import { AiSessionService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiSessionService(supabase);
    const data = await service.getSession(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Session not found' }, { status: 404 });
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
    const validated = updateSessionSchema.parse(body);
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiSessionService(supabase);
    const data = await service.updateSession(schoolId, params.id, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
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

    const service = new AiSessionService(supabase);
    await service.deleteSession(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "sessions/[id]/messages/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sessionMessageSchema } from '@/features/ai/validators/schemas';
import { AiMessageService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiMessageService(supabase);
    const data = await service.getSessionMessages(schoolId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = sessionMessageSchema.parse({ ...body, sessionId: params.id });
    const service = new AiMessageService(supabase);
    const data = await service.createMessage(validated.sessionId, validated);
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

Write-Route "sessions/[id]/export/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiSessionService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const format = searchParams.get('format') || 'json';
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiSessionService(supabase);
    const data = await service.exportSession(schoolId, params.id, format);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "sessions/[id]/search/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sessionSearchSchema } from '@/features/ai/validators/schemas';
import { AiSessionService } from '@/features/ai/services';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = sessionSearchSchema.parse({ ...body, sessionId: params.id });
    const service = new AiSessionService(supabase);
    const data = await service.searchSession(validated.sessionId, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 9-11. messages
# ============================================================
Write-Route "messages/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiMessageService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiMessageService(supabase);
    const data = await service.listMessages(schoolId, {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
    });
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
    const service = new AiMessageService(supabase);
    const data = await service.createMessage(body.sessionId, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "messages/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiMessageService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiMessageService(supabase);
    const data = await service.getMessage(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Message not found' }, { status: 404 });
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

    const service = new AiMessageService(supabase);
    const data = await service.updateMessage(schoolId, params.id, body);
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

    const service = new AiMessageService(supabase);
    await service.deleteMessage(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "messages/stream/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiMessageService } from '@/features/ai/services';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiMessageService(supabase);
    const data = await service.streamMessage(schoolId, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 12-13. contexts
# ============================================================
Write-Route "contexts/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiContextService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiContextService(supabase);
    const data = await service.listContexts(schoolId, {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
    });
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
    const service = new AiContextService(supabase);
    const data = await service.createContext(body.schoolId, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "contexts/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiContextService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiContextService(supabase);
    const data = await service.getContext(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Context not found' }, { status: 404 });
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

    const service = new AiContextService(supabase);
    const data = await service.updateContext(schoolId, params.id, body);
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

    const service = new AiContextService(supabase);
    await service.deleteContext(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "contexts/search/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { contextSearchSchema } from '@/features/ai/validators/schemas';
import { AiContextService } from '@/features/ai/services';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = contextSearchSchema.parse(body);
    const service = new AiContextService(supabase);
    const data = await service.searchContext(validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 14. preferences
# ============================================================
Write-Route "preferences/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updatePreferencesSchema } from '@/features/ai/validators/schemas';
import { AiPreferenceService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const userId = searchParams.get('userId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiPreferenceService(supabase);
    const data = userId
      ? await service.getUserPreference(schoolId, userId)
      : await service.getSchoolConfig(schoolId);
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
    const validated = updatePreferencesSchema.parse(body);
    const service = new AiPreferenceService(supabase);
    const data = await service.updateUserPreference(validated.userId, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 15-18. agents
# ============================================================
Write-Route "agents/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createAgentSchema } from '@/features/ai/validators/schemas';
import { AiAgentService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAgentService(supabase);
    const data = await service.listAgents(schoolId, {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
      search: searchParams.get('search') || undefined,
      type: searchParams.get('type') || undefined,
    });
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
    const validated = createAgentSchema.parse(body);
    const service = new AiAgentService(supabase);
    const data = await service.createAgent(validated.schoolId, validated);
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

Write-Route "agents/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updateAgentSchema } from '@/features/ai/validators/schemas';
import { AiAgentService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAgentService(supabase);
    const data = await service.getAgent(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
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
    const validated = updateAgentSchema.parse(body);
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAgentService(supabase);
    const data = await service.updateAgent(schoolId, params.id, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
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

    const service = new AiAgentService(supabase);
    await service.deleteAgent(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "agents/[id]/tasks/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { agentTaskSchema } from '@/features/ai/validators/schemas';
import { AiAgentTaskService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAgentTaskService(supabase);
    const data = await service.listAgentTasks(schoolId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = agentTaskSchema.parse({ ...body, agentId: params.id });
    const service = new AiAgentTaskService(supabase);
    const data = await service.createTask(validated.agentId, validated);
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

Write-Route "agents/[id]/handoff/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { agentHandoffSchema } from '@/features/ai/validators/schemas';
import { AiAgentService } from '@/features/ai/services';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = agentHandoffSchema.parse({ ...body, fromAgentId: params.id });
    const service = new AiAgentService(supabase);
    const data = await service.handoffAgent(validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "agents/[id]/escalation/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { agentEscalationSchema } from '@/features/ai/validators/schemas';
import { AiAgentService } from '@/features/ai/services';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = agentEscalationSchema.parse({ ...body, agentId: params.id });
    const service = new AiAgentService(supabase);
    const data = await service.escalateAgent(validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 19-28. student-assistant
# ============================================================
Write-Route "student-assistant/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { studentQuerySchema } from '@/features/ai/validators/schemas';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.listSessions(schoolId);
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
    const validated = studentQuerySchema.parse(body);
    const service = new AiStudentAssistantService(supabase);
    const data = await service.query(validated.schoolId, validated);
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

Write-Route "student-assistant/study-plan/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { studyPlanSchema } from '@/features/ai/validators/schemas';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const studentId = searchParams.get('studentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.getStudyPlans(schoolId, studentId);
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
    const validated = studyPlanSchema.parse(body);
    const service = new AiStudentAssistantService(supabase);
    const data = await service.createStudyPlan(validated.schoolId, validated);
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

Write-Route "student-assistant/quiz/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { quizSchema } from '@/features/ai/validators/schemas';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const studentId = searchParams.get('studentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.getQuizzes(schoolId, studentId);
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
    const validated = quizSchema.parse(body);
    const service = new AiStudentAssistantService(supabase);
    const data = await service.createQuiz(validated.schoolId, validated);
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

Write-Route "student-assistant/exercises/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { exerciseSchema } from '@/features/ai/validators/schemas';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const studentId = searchParams.get('studentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.getExercises(schoolId, studentId);
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
    const validated = exerciseSchema.parse(body);
    const service = new AiStudentAssistantService(supabase);
    const data = await service.createExercise(validated.schoolId, validated);
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

Write-Route "student-assistant/flashcards/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { flashcardSchema } from '@/features/ai/validators/schemas';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const studentId = searchParams.get('studentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.getFlashcards(schoolId, studentId);
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
    const validated = flashcardSchema.parse(body);
    const service = new AiStudentAssistantService(supabase);
    const data = await service.createFlashcards(validated.schoolId, validated);
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

Write-Route "student-assistant/progress/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const studentId = searchParams.get('studentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.getProgress(schoolId, studentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "student-assistant/achievements/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const studentId = searchParams.get('studentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.getAchievements(schoolId, studentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "student-assistant/leaderboard/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { leaderboardQuerySchema } from '@/features/ai/validators/schemas';
import { AiStudentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiStudentAssistantService(supabase);
    const data = await service.getLeaderboard(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 29-38. teacher-assistant
# ============================================================
Write-Route "teacher-assistant/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.listSessions(schoolId);
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
    const service = new AiTeacherAssistantService(supabase);
    const data = await service.createSession(body.schoolId, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "teacher-assistant/lesson-plan/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { lessonPlanSchema } from '@/features/ai/validators/schemas';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('teacherId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.getLessonPlans(schoolId, teacherId);
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
    const validated = lessonPlanSchema.parse(body);
    const service = new AiTeacherAssistantService(supabase);
    const data = await service.createLessonPlan(validated.teacherId, validated);
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

Write-Route "teacher-assistant/assessment/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { assessmentSchema } from '@/features/ai/validators/schemas';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('teacherId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.getAssessments(schoolId, teacherId);
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
    const validated = assessmentSchema.parse(body);
    const service = new AiTeacherAssistantService(supabase);
    const data = await service.createAssessment(validated.teacherId, validated);
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

Write-Route "teacher-assistant/rubric/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rubricSchema } from '@/features/ai/validators/schemas';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('teacherId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.getRubrics(schoolId, teacherId);
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
    const validated = rubricSchema.parse(body);
    const service = new AiTeacherAssistantService(supabase);
    const data = await service.createRubric(validated.teacherId, validated);
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

Write-Route "teacher-assistant/feedback/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { teacherFeedbackSchema } from '@/features/ai/validators/schemas';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('teacherId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.getFeedback(schoolId, teacherId);
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
    const validated = teacherFeedbackSchema.parse(body);
    const service = new AiTeacherAssistantService(supabase);
    const data = await service.createFeedback(validated.teacherId, validated);
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

Write-Route "teacher-assistant/correction/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { correctionSchema } from '@/features/ai/validators/schemas';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = correctionSchema.parse(body);
    const service = new AiTeacherAssistantService(supabase);
    const data = await service.correctAssignment(validated.teacherId, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "teacher-assistant/analytics/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('teacherId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.getAnalytics(schoolId, teacherId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "teacher-assistant/meeting/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { meetingSchema } from '@/features/ai/validators/schemas';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('teacherId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.getMeetings(schoolId, teacherId);
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
    const validated = meetingSchema.parse(body);
    const service = new AiTeacherAssistantService(supabase);
    const data = await service.createMeeting(validated.teacherId, validated);
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

Write-Route "teacher-assistant/report/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiTeacherAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('teacherId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiTeacherAssistantService(supabase);
    const data = await service.getReports(schoolId, teacherId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 39-45. parent-assistant
# ============================================================
Write-Route "parent-assistant/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiParentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getDashboard(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "parent-assistant/notifications/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiParentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getNotifications(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "parent-assistant/meeting/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { meetingRequestSchema } from '@/features/ai/validators/schemas';
import { AiParentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getMeetings(schoolId, parentId);
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
    const validated = meetingRequestSchema.parse(body);
    const service = new AiParentAssistantService(supabase);
    const data = await service.requestMeeting(validated.parentId, validated);
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

Write-Route "parent-assistant/homework/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiParentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getHomework(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "parent-assistant/study-time/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiParentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getStudyTime(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "parent-assistant/progress/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiParentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getProgress(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "parent-assistant/events/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiParentAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getEvents(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 46-55. admin-assistant
# ============================================================
Write-Route "admin-assistant/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getDashboard(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "admin-assistant/dashboard/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getDashboardData(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "admin-assistant/reports/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getReports(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "admin-assistant/financial/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getFinancialData(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "admin-assistant/enrollment/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getEnrollmentData(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "admin-assistant/staff/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getStaffData(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "admin-assistant/inventory/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getInventoryData(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "admin-assistant/maintenance/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { maintenanceSchema } from '@/features/ai/validators/schemas';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getMaintenanceData(schoolId);
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
    const validated = maintenanceSchema.parse(body);
    const service = new AiAdminAssistantService(supabase);
    const data = await service.createMaintenanceRequest(validated.adminId, validated);
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

Write-Route "admin-assistant/transport/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiAdminAssistantService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiAdminAssistantService(supabase);
    const data = await service.getTransportData(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

# ============================================================
# 56-62. curriculum
# ============================================================
Write-Route "curriculum/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { curriculumQuerySchema } from '@/features/ai/validators/schemas';
import { AiCurriculumService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiCurriculumService(supabase);
    const data = await service.listCurricula(schoolId);
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
    const service = new AiCurriculumService(supabase);
    const data = await service.createCurriculum(body.schoolId, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "curriculum/[id]/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiCurriculumService } from '@/features/ai/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiCurriculumService(supabase);
    const data = await service.getCurriculum(schoolId, params.id);
    if (!data) return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 });
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

    const service = new AiCurriculumService(supabase);
    const data = await service.updateCurriculum(schoolId, params.id, body);
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

    const service = new AiCurriculumService(supabase);
    await service.deleteCurriculum(schoolId, params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "curriculum/objectives/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { learningObjectiveSchema } from '@/features/ai/validators/schemas';
import { AiCurriculumService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const curriculumId = searchParams.get('curriculumId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiCurriculumService(supabase);
    const data = await service.getObjectives(schoolId, curriculumId);
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
    const validated = learningObjectiveSchema.parse(body);
    const service = new AiCurriculumService(supabase);
    const data = await service.createObjective(validated.curriculumId, validated);
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

Write-Route "curriculum/scope-sequence/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { scopeSequenceSchema } from '@/features/ai/validators/schemas';
import { AiCurriculumService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiCurriculumService(supabase);
    const data = await service.getScopeSequence(schoolId);
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
    const validated = scopeSequenceSchema.parse(body);
    const service = new AiCurriculumService(supabase);
    const data = await service.createScopeSequence(validated.curriculumId, validated);
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

Write-Route "curriculum/assessment/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { assessmentAlignmentSchema } from '@/features/ai/validators/schemas';
import { AiCurriculumService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiCurriculumService(supabase);
    const data = await service.getAssessments(schoolId);
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
    const validated = assessmentAlignmentSchema.parse(body);
    const service = new AiCurriculumService(supabase);
    const data = await service.createAssessment(validated.curriculumId, validated);
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

Write-Route "curriculum/resources/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiCurriculumService } from '@/features/ai/services';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiCurriculumService(supabase);
    const data = await service.getResources(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Route "curriculum/gap-analysis/route.ts" @'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { gapAnalysisSchema } from '@/features/ai/validators/schemas';
import { AiCurriculumService } from '@/features/ai/services';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = gapAnalysisSchema.parse(body);
    const service = new AiCurriculumService(supabase);
    const data = await service.analyzeGap(validated.curriculumId, validated);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
'@

Write-Host "Phase 1 complete (routes 1-62). Continuing..."
