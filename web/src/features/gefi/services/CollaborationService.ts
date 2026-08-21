import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CollaborationWorkspace {
  id: string;
  school_id: string;
  workspace_code: string;
  name: string;
  description: string;
  type: 'project' | 'department' | 'committee' | 'task_force' | 'custom';
  owner_id: string;
  members: WorkspaceMember[];
  status: 'active' | 'archived' | 'deleted';
  settings: WorkspaceSettings;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface WorkspaceMember {
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joined_at: string;
  last_active_at?: string;
}

export interface WorkspaceSettings {
  visibility: 'private' | 'team' | 'public';
  allow_external_sharing: boolean;
  default_notification: 'all' | 'mentions' | 'none';
}

export interface CollaborationDocument {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  type: 'document' | 'spreadsheet' | 'presentation' | 'note';
  owner_id: string;
  last_edited_by?: string;
  last_edited_at?: string;
  version: number;
  versions: DocumentVersion[];
  comments: DocumentComment[];
  sharing: DocumentSharing;
  metadata?: Record<string, unknown>;
  school_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface DocumentVersion {
  version: number;
  content: string;
  edited_by: string;
  edited_at: string;
  comment?: string;
}

export interface DocumentComment {
  id: string;
  user_id: string;
  content: string;
  position?: { start: number; end: number };
  resolved: boolean;
  created_at: string;
}

export interface DocumentSharing {
  visibility: 'workspace' | 'specific_users' | 'public';
  shared_with: string[];
  link_sharing: boolean;
}

export interface CollaborationMessage {
  id: string;
  workspace_id: string;
  channel_id?: string;
  user_id: string;
  content: string;
  type: 'text' | 'file' | 'system' | 'mention';
  reply_to?: string;
  reactions: Record<string, string[]>;
  metadata?: Record<string, unknown>;
  school_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CollaborationChannel {
  id: string;
  workspace_id: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'direct';
  members: string[];
  last_message_at?: string;
  unread_count: number;
  school_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateCollaborationWorkspace {
  name: string;
  description: string;
  type: 'project' | 'department' | 'committee' | 'task_force' | 'custom';
  owner_id: string;
  settings?: Partial<WorkspaceSettings>;
  metadata?: Record<string, unknown>;
}

export interface UpdateCollaborationWorkspace {
  name?: string;
  description?: string;
  status?: string;
  settings?: Partial<WorkspaceSettings>;
  metadata?: Record<string, unknown>;
}

export class CollaborationService {
  private readonly WORKSPACES_TABLE = 'collaboration_workspaces';
  private readonly DOCUMENTS_TABLE = 'collaboration_documents';
  private readonly MESSAGES_TABLE = 'collaboration_messages';
  private readonly CHANNELS_TABLE = 'collaboration_channels';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllWorkspaces(schoolId: string): Promise<CollaborationWorkspace[]> {
    const { data, error } = await this.supabase
      .from(this.WORKSPACES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getWorkspaceById(schoolId: string, id: string): Promise<CollaborationWorkspace | null> {
    const { data, error } = await this.supabase
      .from(this.WORKSPACES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createWorkspace(schoolId: string, workspace: CreateCollaborationWorkspace): Promise<CollaborationWorkspace> {
    const workspaceCode = `WS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.WORKSPACES_TABLE)
      .insert({
        workspace_code: workspaceCode,
        ...workspace,
        members: [{ user_id: workspace.owner_id, role: 'owner', joined_at: new Date().toISOString() }],
        status: 'active',
        settings: workspace.settings || {
          visibility: 'team',
          allow_external_sharing: false,
          default_notification: 'all',
        },
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateWorkspace(schoolId: string, id: string, workspace: UpdateCollaborationWorkspace): Promise<CollaborationWorkspace> {
    const { data, error } = await this.supabase
      .from(this.WORKSPACES_TABLE)
      .update({ ...workspace, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteWorkspace(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.WORKSPACES_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async addMember(schoolId: string, workspaceId: string, userId: string, role: 'admin' | 'member' | 'viewer'): Promise<CollaborationWorkspace> {
    const workspace = await this.getWorkspaceById(schoolId, workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const existingMember = workspace.members.find((m) => m.user_id === userId);
    if (existingMember) throw new Error('User already a member');

    const newMember: WorkspaceMember = {
      user_id: userId,
      role,
      joined_at: new Date().toISOString(),
    };

    return this.updateWorkspace(schoolId, workspaceId, {
      members: [...workspace.members, newMember],
    });
  }

  async removeMember(schoolId: string, workspaceId: string, userId: string): Promise<CollaborationWorkspace> {
    const workspace = await this.getWorkspaceById(schoolId, workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    return this.updateWorkspace(schoolId, workspaceId, {
      members: workspace.members.filter((m) => m.user_id !== userId),
    });
  }

  async createDocument(schoolId: string, workspaceId: string, title: string, content: string, type: string, ownerId: string): Promise<CollaborationDocument> {
    const { data, error } = await this.supabase
      .from(this.DOCUMENTS_TABLE)
      .insert({
        workspace_id: workspaceId,
        title,
        content,
        type,
        owner_id: ownerId,
        last_edited_by: ownerId,
        last_edited_at: new Date().toISOString(),
        version: 1,
        versions: [{
          version: 1,
          content,
          edited_by: ownerId,
          edited_at: new Date().toISOString(),
        }],
        comments: [],
        sharing: { visibility: 'workspace', shared_with: [], link_sharing: false },
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateDocument(schoolId: string, id: string, content: string, editedBy: string, comment?: string): Promise<CollaborationDocument> {
    const doc = await this.getDocumentById(schoolId, id);
    if (!doc) throw new Error('Document not found');

    const newVersion = doc.version + 1;
    const newVersionEntry: DocumentVersion = {
      version: newVersion,
      content,
      edited_by: editedBy,
      edited_at: new Date().toISOString(),
      comment,
    };

    const { data, error } = await this.supabase
      .from(this.DOCUMENTS_TABLE)
      .update({
        content,
        last_edited_by: editedBy,
        last_edited_at: new Date().toISOString(),
        version: newVersion,
        versions: [...doc.versions, newVersionEntry],
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getDocumentById(schoolId: string, id: string): Promise<CollaborationDocument | null> {
    const { data, error } = await this.supabase
      .from(this.DOCUMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async getDocumentsByWorkspace(schoolId: string, workspaceId: string): Promise<CollaborationDocument[]> {
    const { data, error } = await this.supabase
      .from(this.DOCUMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('workspace_id', workspaceId)
      .is('deleted_at', null)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async addDocumentComment(schoolId: string, documentId: string, userId: string, content: string): Promise<CollaborationDocument> {
    const doc = await this.getDocumentById(schoolId, documentId);
    if (!doc) throw new Error('Document not found');

    const newComment: DocumentComment = {
      id: `DCMT-${Date.now()}`,
      user_id: userId,
      content,
      resolved: false,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from(this.DOCUMENTS_TABLE)
      .update({
        comments: [...doc.comments, newComment],
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', documentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async createChannel(schoolId: string, workspaceId: string, name: string, description: string, type: 'public' | 'private' | 'direct', members: string[]): Promise<CollaborationChannel> {
    const { data, error } = await this.supabase
      .from(this.CHANNELS_TABLE)
      .insert({
        workspace_id: workspaceId,
        name,
        description,
        type,
        members,
        unread_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getChannelsByWorkspace(schoolId: string, workspaceId: string): Promise<CollaborationChannel[]> {
    const { data, error } = await this.supabase
      .from(this.CHANNELS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('workspace_id', workspaceId)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async sendMessage(schoolId: string, workspaceId: string, userId: string, content: string, channelId?: string, replyTo?: string): Promise<CollaborationMessage> {
    const { data, error } = await this.supabase
      .from(this.MESSAGES_TABLE)
      .insert({
        workspace_id: workspaceId,
        channel_id: channelId,
        user_id: userId,
        content,
        type: 'text',
        reply_to: replyTo,
        reactions: {},
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getMessages(schoolId: string, workspaceId: string, channelId?: string, limit: number = 50): Promise<CollaborationMessage[]> {
    let query = this.supabase
      .from(this.MESSAGES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('workspace_id', workspaceId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (channelId) {
      query = query.eq('channel_id', channelId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return (data || []).reverse();
  }

  async addReaction(schoolId: string, messageId: string, userId: string, reaction: string): Promise<CollaborationMessage> {
    const { data: message, error: fetchError } = await this.supabase
      .from(this.MESSAGES_TABLE)
      .select('reactions')
      .eq('school_id', schoolId)
      .eq('id', messageId)
      .single();

    if (fetchError) throw fetchError;

    const reactions = message.reactions || {};
    const existingUsers = reactions[reaction] || [];
    const updatedUsers = existingUsers.includes(userId)
      ? existingUsers.filter((id) => id !== userId)
      : [...existingUsers, userId];

    const updatedReactions = { ...reactions, [reaction]: updatedUsers };

    const { data, error } = await this.supabase
      .from(this.MESSAGES_TABLE)
      .update({ reactions: updatedReactions, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getActiveWorkspaces(schoolId: string): Promise<CollaborationWorkspace[]> {
    const { data, error } = await this.supabase
      .from(this.WORKSPACES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getWorkspacesByMember(schoolId: string, userId: string): Promise<CollaborationWorkspace[]> {
    const { data, error } = await this.supabase
      .from(this.WORKSPACES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).filter((w) => w.members.some((m) => m.user_id === userId));
  }

  async getCollaborationStats(schoolId: string): Promise<{ totalWorkspaces: number; totalDocuments: number; totalMessages: number; activeMembers: number }> {
    const workspaces = await this.getAllWorkspaces(schoolId);
    const { count: docCount } = await this.supabase
      .from(this.DOCUMENTS_TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    const { count: msgCount } = await this.supabase
      .from(this.MESSAGES_TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    const activeMembers = new Set(
      workspaces.flatMap((w) => w.members.map((m) => m.user_id))
    ).size;

    return {
      totalWorkspaces: workspaces.length,
      totalDocuments: docCount || 0,
      totalMessages: msgCount || 0,
      activeMembers,
    };
  }
}
