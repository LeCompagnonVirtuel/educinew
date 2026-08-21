import type { SupabaseClient } from '@supabase/supabase-js';
import type { DiscussionForum, ForumPost, ForumComment } from '@educi/types';
import { LxpForumNotFoundError, LxpForumCreateError, LxpForumPostNotFoundError, LxpForumPostCreateError, LxpForumPostUpdateError, LxpForumPostDeleteError, LxpForumCommentNotFoundError, LxpForumCommentCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpForumService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getForum(schoolId: string, id: string): Promise<DiscussionForum> {
    const forum = await this.repo.findForumById(schoolId, id);
    if (!forum) throw new LxpForumNotFoundError(id);
    return forum;
  }

  async listForums(courseId: string): Promise<readonly DiscussionForum[]> {
    return this.repo.findForums(courseId);
  }

  async createForum(data: Omit<DiscussionForum, 'id' | 'createdAt' | 'updatedAt' | 'postCount' | 'participantCount' | 'pinnedPosts'>): Promise<DiscussionForum> {
    const created = await this.repo.createForum(data);
    if (!created) throw new LxpForumCreateError();
    return created;
  }

  async getPost(schoolId: string, id: string): Promise<ForumPost> {
    const post = await this.repo.findForumPostById(schoolId, id);
    if (!post) throw new LxpForumPostNotFoundError(id);
    return post;
  }

  async createPost(forumId: string, userId: string, data: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'forumId' | 'viewCount' | 'commentCount' | 'reactionCount' | 'bookmarkCount' | 'upvotes' | 'downvotes' | 'score'>): Promise<ForumPost> {
    const created = await this.repo.createForumPost(forumId, userId, data);
    if (!created) throw new LxpForumPostCreateError();
    return created;
  }

  async updatePost(schoolId: string, id: string, data: Partial<ForumPost>): Promise<ForumPost> {
    const existing = await this.repo.findForumPostById(schoolId, id);
    if (!existing) throw new LxpForumPostNotFoundError(id);
    const updated = await this.repo.updateForumPost(id, data);
    if (!updated) throw new LxpForumPostUpdateError();
    return updated;
  }

  async deletePost(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findForumPostById(schoolId, id);
    if (!existing) throw new LxpForumPostNotFoundError(id);
    const deleted = await this.repo.deleteForumPost(id);
    if (!deleted) throw new LxpForumPostDeleteError();
  }

  async createComment(postId: string, userId: string, content: string, parentId?: string): Promise<ForumComment> {
    const created = await this.repo.createForumComment(postId, userId, content, parentId);
    if (!created) throw new LxpForumCommentCreateError();
    return created;
  }
}
