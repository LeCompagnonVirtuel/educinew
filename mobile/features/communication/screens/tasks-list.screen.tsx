import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
}

const TasksListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const mockData: Task[] = [
        { id: '1', title: 'Review curriculum proposal', description: 'Review and provide feedback on the new curriculum', status: 'in_progress', priority: 'high', dueDate: 'Jan 20', assignee: 'Dr. Smith' },
        { id: '2', title: 'Submit budget report', description: 'Compile and submit quarterly budget report', status: 'todo', priority: 'high', dueDate: 'Jan 18', assignee: 'You' },
        { id: '3', title: 'Update student records', description: 'Update attendance and grade records', status: 'done', priority: 'medium', dueDate: 'Jan 15', assignee: 'Sarah Johnson' },
        { id: '4', title: 'Plan science fair', description: 'Organize logistics for annual science fair', status: 'in_progress', priority: 'medium', dueDate: 'Jan 22', assignee: 'Michael Chen' },
        { id: '5', title: 'Schedule parent meetings', description: 'Set up parent-teacher conference slots', status: 'todo', priority: 'low', dueDate: 'Jan 25', assignee: 'Lisa Wang' },
      ];
      setTasks(mockData);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const filters = ['all', 'todo', 'in_progress', 'done'];

  const filteredTasks = activeFilter === 'all'
    ? tasks
    : tasks.filter((t) => t.status === activeFilter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in_progress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return '#6b7280';
      case 'in_progress': return '#3b82f6';
      case 'done': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const toggleStatus = (taskId: string) => {
    setTasks(tasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'todo';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity style={styles.card} onPress={() => toggleStatus(item.id)}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
          </View>
          <Text style={styles.assignee}>{item.assignee}</Text>
        </View>
        <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
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
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, activeFilter === filter && styles.activeFilter]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
              {filter === 'in_progress' ? 'In Progress' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>+ New Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  activeFilter: {
    backgroundColor: '#3b82f6',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  assignee: {
    fontSize: 12,
    color: '#666',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default TasksListScreen;
