import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';

interface Workflow {
  id: string;
  name: string;
  documentName: string;
  status: 'active' | 'completed' | 'cancelled';
  currentStep: string;
  initiatedBy: string;
  startedAt: string;
  steps: WorkflowStep[];
}

interface WorkflowStep {
  id: string;
  step: string;
  assignee: string;
  status: 'completed' | 'current' | 'pending' | 'skipped';
  timestamp?: string;
  condition?: string;
}

interface WorkflowTrigger {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
}

const WorkflowScreen: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [showTriggers, setShowTriggers] = useState(false);

  const triggers: WorkflowTrigger[] = [
    { id: '1', name: 'Budget > $1000', type: 'Amount Threshold', enabled: true },
    { id: '2', name: 'New Contract', type: 'Document Type', enabled: true },
    { id: '3', name: 'Policy Change', type: 'Category Match', enabled: false },
    { id: '4', name: 'Annual Review', type: 'Scheduled', enabled: true },
  ];

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const mockData: Workflow[] = [
        {
          id: '1', name: 'Budget Approval', documentName: 'Budget Report Q4.xlsx', status: 'active', currentStep: 'Department Head Review', initiatedBy: 'Finance Team', startedAt: '2 hours ago',
          steps: [
            { id: '1', step: 'Submitted', assignee: 'Finance Team', status: 'completed', timestamp: '2 hours ago' },
            { id: '2', step: 'Department Head Review', assignee: 'Ms. Johnson', status: 'current' },
            { id: '3', step: 'Vice Principal Approval', assignee: 'Vice Principal', status: 'pending', condition: 'Amount > $5000' },
            { id: '4', step: 'Principal Final Approval', assignee: 'Dr. Smith', status: 'pending' },
          ],
        },
        {
          id: '2', name: 'Policy Approval', documentName: 'Staff Handbook.docx', status: 'active', currentStep: 'Legal Review', initiatedBy: 'HR Department', startedAt: '1 day ago',
          steps: [
            { id: '1', step: 'Draft Review', assignee: 'HR', status: 'completed', timestamp: '1 day ago' },
            { id: '2', step: 'Department Heads', assignee: 'All Heads', status: 'completed', timestamp: '18 hours ago' },
            { id: '3', step: 'Legal Review', assignee: 'Legal Team', status: 'current' },
            { id: '4', step: 'Board Approval', assignee: 'Board', status: 'pending' },
          ],
        },
        {
          id: '3', name: 'Curriculum Review', documentName: 'Curriculum Plan 2024.pdf', status: 'completed', currentStep: 'Completed', initiatedBy: 'Dr. Smith', startedAt: '2 weeks ago',
          steps: [
            { id: '1', step: 'Initial Draft', assignee: 'Dr. Smith', status: 'completed', timestamp: '2 weeks ago' },
            { id: '2', step: 'Peer Review', assignee: 'Department Heads', status: 'completed', timestamp: '10 days ago' },
            { id: '3', step: 'Final Approval', assignee: 'Principal', status: 'completed', timestamp: '1 week ago' },
          ],
        },
        {
          id: '4', name: 'Contract Signing', documentName: 'Vendor Contract', status: 'cancelled', currentStep: 'Cancelled', initiatedBy: 'Admin', startedAt: '1 month ago',
          steps: [
            { id: '1', step: 'Review', assignee: 'Legal', status: 'completed', timestamp: '1 month ago' },
            { id: '2', step: 'Sign', assignee: 'Admin', status: 'skipped' },
          ],
        },
      ];
      setWorkflows(mockData);
    } catch (err) {
      setError('Failed to fetch workflows');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWorkflows();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#3b82f6';
      case 'completed': return '#22c55e';
      case 'cancelled': return '#ef4444';
      case 'current': return '#3b82f6';
      case 'pending': return '#e5e7eb';
      case 'skipped': return '#9ca3af';
      default: return '#6b7280';
    }
  };

  const filteredWorkflows = workflows.filter((w) => {
    if (activeTab === 'active') return w.status === 'active';
    return w.status === 'completed' || w.status === 'cancelled';
  });

  const renderItem = ({ item }: { item: Workflow }) => (
    <TouchableOpacity style={styles.workflowItem} onPress={() => setSelectedWorkflow(item)}>
      <View style={styles.workflowHeader}>
        <Text style={styles.workflowName} numberOfLines={1}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.workflowDoc}>{item.documentName}</Text>
      <Text style={styles.workflowMeta}>By: {item.initiatedBy} · {item.startedAt}</Text>
      <Text style={styles.workflowStep}>Current: {item.currentStep}</Text>
      <View style={styles.stepsPreview}>
        {item.steps.map((step) => (
          <View key={step.id} style={[styles.stepDot, { backgroundColor: getStatusColor(step.status) }]} />
        ))}
      </View>
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
      <View style={styles.header}>
        <Text style={styles.title}>Workflows</Text>
        <TouchableOpacity style={styles.triggerBtn} onPress={() => setShowTriggers(!showTriggers)}>
          <Text style={styles.triggerBtnText}>Triggers</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>History</Text>
        </TouchableOpacity>
      </View>

      {showTriggers && (
        <View style={styles.triggersPanel}>
          <Text style={styles.triggersTitle}>Active Triggers</Text>
          {triggers.map((trigger) => (
            <View key={trigger.id} style={styles.triggerItem}>
              <View style={styles.triggerInfo}>
                <Text style={styles.triggerName}>{trigger.name}</Text>
                <Text style={styles.triggerType}>{trigger.type}</Text>
              </View>
              <View style={[styles.triggerStatus, { backgroundColor: trigger.enabled ? '#22c55e' : '#e5e7eb' }]}>
                <Text style={styles.triggerStatusText}>{trigger.enabled ? 'ON' : 'OFF'}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <FlatList
        data={filteredWorkflows}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {selectedWorkflow && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedWorkflow.name}</Text>
              <TouchableOpacity onPress={() => setSelectedWorkflow(null)}>
                <Text style={styles.modalClose}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDoc}>{selectedWorkflow.documentName}</Text>
            <ScrollView>
              {selectedWorkflow.steps.map((step, idx) => (
                <View key={step.id} style={styles.timelineItem}>
                  <View style={[styles.timelineDot, { backgroundColor: getStatusColor(step.status) }]} />
                  {idx < selectedWorkflow.steps.length - 1 && <View style={styles.timelineLine} />}
                  <View style={styles.timelineContent}>
                    <Text style={[styles.timelineStep, step.status === 'current' && styles.stepCurrent]}>{step.step}</Text>
                    <Text style={styles.timelineAssignee}>{step.assignee}</Text>
                    {step.condition && <Text style={styles.timelineCondition}>If: {step.condition}</Text>}
                    {step.timestamp && <Text style={styles.timelineTime}>{step.timestamp}</Text>}
                  </View>
                </View>
              ))}
            </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  triggerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#e0e7ff',
  },
  triggerBtnText: {
    color: '#3730a3',
    fontSize: 13,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 8,
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
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  triggersPanel: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 12,
  },
  triggersTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  triggerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  triggerInfo: {},
  triggerName: {
    fontSize: 14,
    fontWeight: '500',
  },
  triggerType: {
    fontSize: 12,
    color: '#6b7280',
  },
  triggerStatus: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  triggerStatusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  workflowItem: {
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
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  workflowName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  workflowDoc: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 4,
  },
  workflowMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  workflowStep: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 8,
  },
  stepsPreview: {
    flexDirection: 'row',
    gap: 6,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalClose: {
    fontSize: 18,
    color: '#6b7280',
  },
  modalDoc: {
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
    marginRight: 12,
    marginTop: 2,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 14,
    bottom: -14,
    width: 2,
    backgroundColor: '#e5e7eb',
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
  timelineCondition: {
    fontSize: 11,
    color: '#f59e0b',
    fontStyle: 'italic',
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

export default WorkflowScreen;
