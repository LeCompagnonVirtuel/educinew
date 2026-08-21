import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../../services/api';

export interface Child {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  matricule?: string;
  photoUrl?: string;
  classId?: string;
  className?: string;
  schoolId?: string;
  schoolName?: string;
  dateOfBirth?: string;
}

interface ChildContextType {
  children: Child[];
  selectedChild: Child | null;
  selectChild: (child: Child) => void;
  loading: boolean;
  refresh: () => Promise<void>;
}

const ChildContext = createContext<ChildContextType>({
  children: [],
  selectedChild: null,
  selectChild: () => {},
  loading: true,
  refresh: async () => {},
});

export const useChild = () => useContext(ChildContext);

export function ChildProvider({ children: childrenProp }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);

  const loadChildren = useCallback(async () => {
    if (!user || user.role !== 'PARENT') {
      setLoading(false);
      return;
    }

    try {
      const data = await api.getParentChildren(user.id);
      const mapped: Child[] = (data || []).map((s: any) => ({
        id: s.id,
        userId: s.userId || s.user_id,
        firstName: (s.user?.name?.trim().split(' ') || [])[0] || s.firstName || s.first_name || '',
        lastName: (s.user?.name?.trim().split(' ') || []).slice(1).join(' ') || s.lastName || s.last_name || '',
        fullName: s.user?.name || `${s.firstName || s.first_name || ''} ${s.lastName || s.last_name || ''}`.trim(),
        matricule: s.matricule,
        photoUrl: s.user?.photoUrl || s.user?.photo_url,
        classId: s.classId || s.class_id,
        className: s.class?.name || s.className,
        schoolId: s.schoolId || s.school_id,
        schoolName: s.school?.name,
        dateOfBirth: s.dateOfBirth || s.date_of_birth,
      }));

      setChildrenList(mapped);
      if (mapped.length > 0 && !selectedChild) {
        setSelectedChild(mapped[0]);
      }
    } catch (err) {
      console.error('[ChildContext] Failed to load children:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.role]);

  useEffect(() => {
    loadChildren();
  }, [loadChildren]);

  const selectChild = (child: Child) => {
    setSelectedChild(child);
  };

  return (
    <ChildContext.Provider value={{
      children: childrenList,
      selectedChild,
      selectChild,
      loading,
      refresh: loadChildren,
    }}>
      {childrenProp}
    </ChildContext.Provider>
  );
}
