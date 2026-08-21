import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScAssetMaintenanceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [maintenanceTasks, setMaintenanceTasks] = useState<any[]>([]);

  useEffect(() => {
    fetchMaintenanceTasks();
  }, []);

  const fetchMaintenanceTasks = async () => {
    try {
      const response = await fetch('/api/smart-campus/assets/maintenance');
      const data = await response.json();
      setMaintenanceTasks(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {maintenanceTasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScAssetMaintenanceDetail', { id: task.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{task.assetName}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
              <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Task: {task.taskType}</Text>
          <Text style={styles.info}>Assigned To: {task.assignedTo}</Text>
          <Text style={styles.info}>Due Date: {task.dueDate}</Text>
          <Text style={styles.info}>Status: {task.status}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return '#f44336';
    case 'medium':
      return '#FF9800';
    case 'low':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});
