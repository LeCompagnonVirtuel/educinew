import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useApprovals } from '@/features/documents/hooks';

interface Approval {
  id: string;
  documentName: string;
  requestedBy: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  type: string;
  urgency: 'low' | 'medium' | 'high';
  workflowStep: string;
}

interface WorkflowStep {
  id: string;
  step: string;
  assignee: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
}

const ApprovalsScreen: React.FC = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const mockData: Approval[] = [
        { id: '1', documentName: 'Budget Report Q4.xlsx', requestedBy: 'Finance Team', requestedAt: '2 hours ago', status: 'pending', type: 'Budget Approval', urgency: 'high', workflowStep: 'Department Head Review' },
        { id: '2', documentName: 'Staff Handbook.docx', requestedBy: 'HR Department', requestedAt: '1 day ago', status: 'pending', type: 'Policy Approval', urgency: 'medium', workflowStep: 'Vice Principal Review' },
        { id: '3', documentName: 'Exam Schedule Fall.pdf', requestedBy: 'Exam Office', requestedAt: '3 days ago', status: 'pending', type: 'Schedule Approval', urgency: 'low', workflowStep: 'Principal Approval' },
        { id: '4', documentName: 'Curriculum Plan 2024.pdf', requestedBy: 'Dr. Smith', requestedAt: '1 week ago', status: 'approved', type: 'Curriculum Approval', urgency: 'high', workflowStep: 'Completed' },
        { id: '5', documentName: 'Parent Meeting Minutes.pdf', requestedBy: 'Admin Office', requestedAt: '2 weeks ago', status: 'approved', type: 'Minutes Approval', urgency: 'low', workflowStep: 'Completed' },
        { id: '6', documentName: 'Lab Safety Guidelines.pptx', requestedBy: 'Science Dept', requestedAt: '3 weeks ago', status: 'rejected', type: 'Safety Review', urgency: 'medium', workflowStep: 'Rejected at Review' },
      ];
      setApprovals(mockData);
    } catch (err) {
      setError('Failed to fetch approvals');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchApprovals();
  }, []);

  const handleApprove = (id: string) => {
    Alert.alert('Approve', 'Are you sure you want to approve this?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Approve', onPress: () => {
        setApprovals(approvals.map((a) => a.id === id ? { ...a, status: 'approved' } : a));
        setSelectedApproval(null);
      }},
    ]);
  };

  const handleReject = (id: string) => {
    Alert.alert('Reject', 'Are you sure you want to reject this?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reject', style: 'destructive', onPress: () => {
        setApprovals(approvals.map((a) => a.id === id ? { ...a, status: 'rejected' } : a));
        setSelectedApproval(null);
      }},
    ]);
  };

  const showWorkflowTimeline = (approval: Approval) => {
    const mockSteps: WorkflowStep[] = [
      { id: '1', step: 'Submitted', assignee: approval.requestedBy, status: 'completed', timestamp: approval.requestedAt },
      { id: '2', step: 'Department Head Review', assignee: 'Ms. Johnson', status: 'completed', timestamp: '1 day ago' },
      { id: '3', step: approval.workflowStep, assignee: 'Dr. Smith', status: 'current' },
      { id: '4', step: 'Final Approval', assignee: 'Principal', status: 'pending' },
    ];
    setWorkflowSteps(mockSteps);
    setSelectedApproval(approval);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const filteredApprovals = approvals.filter((a) => {
    if (activeTab === 'pending') return a.status === 'pending';
    return a.status === 'approved' || a.status === 'rejected';
  });

  const renderItem = ({ item }: { item: Approval }) => (
    <TouchableOpacity style={styles.approvalItem} onPress={() => showWorkflowTimeline(item)}>
      <View style={styles.approvalHeader}>
        <View style={styles.approvalInfo}>
          <Text style={styles.approvalName} numberOfLines={1}>{item.documentName}</Text>
          <Text style={styles.approvalType}>{item.type}</Text>
        </View>
        <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(item.urgency) }]}>
          <Text style={styles.urgencyText}>{item.urgency}</Text>
        </View>
      </View>
      <View style={styles.approvalMeta}>
        <Text style={styles.metaText}>By: {item.requestedBy}</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.metaText}>{item.requestedAt}</Text>
      </View>
      <Text style={styles.workflowStep}>Step: {item.workflowStep}</Text>
      {item.status === 'pending' && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.rejectBtn} onPress={() => handleReject(item.id)}>
            <Text style={styles.rejectBtnText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approveBtn} onPress={() => handleApprove(item.id)}>
            <Text style={styles.approveBtnText}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.status !== 'pending' && (
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'approved' ? '#22c55e' : '#ef4444' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approvals</Text>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
            Pending ({approvals.filter((a) => a.status === 'pending').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed ({approvals.filter((a) => a.status !== 'pending').length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredApprovals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {selectedApproval && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Workflow Timeline</Text>
              <TouchableOpacity onPress={() => setSelectedApproval(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDocName}>{selectedApproval.documentName}</Text>
            {workflowSteps.map((step, idx) => (
              <View key={step.id} style={styles.timelineItem}>
                <View style={[styles.timelineDot, step.status === 'completed' && styles.dotCompleted, step.status === 'current' && styles.dotCurrent]} />
                {idx < workflowSteps.length - 1 && <View style={[styles.timelineLine, step.status === 'completed' && styles.lineCompleted]} />}
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineStep, step.status === 'current' && styles.stepCurrent]}>{step.step}</Text>
                  <Text style={styles.timelineAssignee}>{step.assignee}</Text>
                  {step.timestamp && <Text style={styles.timelineTime}>{step.timestamp}</Text>}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  approvalItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  approvalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  approvalInfo: {
    flex: 1,
    marginRight: 8,
  },
  approvalName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  approvalType: {
    fontSize: 12,
    color: '#6b7280',
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  urgencyText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  approvalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  metaDot: {
    fontSize: 12,
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  workflowStep: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
  },
  rejectBtnText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 14,
  },
  approveBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  approveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalClose: {
    fontSize: 18,
    color: '#6b7280',
  },
  modalDocName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
    marginTop: 2,
  },
  dotCompleted: {
    backgroundColor: '#22c55e',
  },
  dotCurrent: {
    backgroundColor: '#3b82f6',
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 14,
    bottom: -14,
    width: 2,
    backgroundColor: '#e5e7eb',
  },
  lineCompleted: {
    backgroundColor: '#22c55e',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineStep: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  stepCurrent: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  timelineAssignee: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  timelineTime: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ApprovalsScreen;
