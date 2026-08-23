import { NextRequest, NextResponse } from 'next/server';
import { TABLE_MAP } from '@/lib/api/table-map';
import {
  handleList,
  handleCreate,
  handleRead,
  handleUpdate,
  handleDelete,
} from '@/lib/api/crud';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

function resolveTable(slug: string[]): { tableName: string; isItem: boolean; id?: string } {
  const path = slug.join('/');

  // Exact match for collection
  if (TABLE_MAP[path]) {
    return { tableName: TABLE_MAP[path], isItem: false };
  }

  // Check if last segment is an ID
  const lastSegment = slug[slug.length - 1];
  if (isUUID(lastSegment)) {
    const basePath = slug.slice(0, -1).join('/');
    if (TABLE_MAP[basePath]) {
      return { tableName: TABLE_MAP[basePath], isItem: true, id: lastSegment };
    }
  }

  // Try without last segment as sub-action (e.g. /api/academic/classes/statistics)
  // The mapping already has these, so check full path first

  // Fallback: derive table name from URL
  // Remove the last segment if it looks like an ID or action
  const tableName = path.replace(/\//g, '_');
  return { tableName, isItem: false };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const { tableName, isItem, id } = resolveTable(slug);

    if (isItem && id) {
      return await handleRead(req, tableName, id);
    }

    return await handleList(req, tableName, {
      defaultSort: 'created_at',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur interne' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const { tableName } = resolveTable(slug);
    return await handleCreate(req, tableName);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur interne' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const { tableName, isItem, id } = resolveTable(slug);

    if (!isItem || !id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    return await handleUpdate(req, tableName, id);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur interne' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const { tableName, isItem, id } = resolveTable(slug);

    if (!isItem || !id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    return await handleUpdate(req, tableName, id);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur interne' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const { tableName, isItem, id } = resolveTable(slug);

    if (!isItem || !id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    return await handleDelete(req, tableName, id, { softDelete: false });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur interne' },
      { status: 500 }
    );
  }
}
