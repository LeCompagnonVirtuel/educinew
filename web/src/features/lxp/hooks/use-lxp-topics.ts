'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpTopicService } from '../services/lxp-topic.service';
import type { Topic, TopicCreate } from '@educi/types';
import type { TopicUpdate } from '../types';

export const useLxpTopics = (schoolId: string) => {
  const [topics, setTopics] = useState<readonly Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpTopicService(createClient());
      const data = await service.listTopics(schoolId);
      setTopics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch topics');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return { topics, loading, error, refresh: fetchTopics };
};

export const useLxpTopic = (schoolId: string, id: string | null) => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopic = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpTopicService(createClient());
      const data = await service.getTopic(schoolId, id);
      setTopic(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch topic');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  return { topic, loading, error, refresh: fetchTopic };
};

export const useLxpTopicCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TopicCreate): Promise<Topic | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpTopicService(createClient());
      const result = await service.createTopic(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create topic');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpTopicUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: TopicUpdate): Promise<Topic | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpTopicService(createClient());
      const result = await service.updateTopic(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update topic');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpTopicDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpTopicService(createClient());
      await service.deleteTopic(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete topic');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
