'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpForumService } from '../services/lxp-forum.service';
import type { DiscussionForum, ForumPost, ForumComment } from '@educi/types';
import type { ForumQuery } from '../types';

export const useLxpForums = (courseId: string) => {
  const [forums, setForums] = useState<readonly DiscussionForum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForums = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpForumService(createClient());
      const data = await service.listForums(courseId);
      setForums(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forums');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchForums();
  }, [fetchForums]);

  return { forums, loading, error, refresh: fetchForums };
};

export const useLxpForum = (schoolId: string, id: string | null) => {
  const [forum, setForum] = useState<DiscussionForum | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForum = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpForumService(createClient());
      const data = await service.getForum(schoolId, id);
      setForum(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forum');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchForum();
  }, [fetchForum]);

  return { forum, loading, error, refresh: fetchForum };
};

export const useLxpForumCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<DiscussionForum, 'id' | 'createdAt' | 'updatedAt' | 'postCount' | 'participantCount' | 'pinnedPosts'>): Promise<DiscussionForum | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpForumService(createClient());
      const result = await service.createForum(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create forum');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpForumPostCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(async (forumId: string, userId: string, data: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'forumId' | 'viewCount' | 'commentCount' | 'reactionCount' | 'bookmarkCount' | 'upvotes' | 'downvotes' | 'score'>): Promise<ForumPost | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpForumService(createClient());
      const result = await service.createPost(forumId, userId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create forum post');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createPost, loading, error };
};

export const useLxpForumPostDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removePost = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpForumService(createClient());
      await service.deletePost(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete forum post');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { removePost, loading, error };
};
