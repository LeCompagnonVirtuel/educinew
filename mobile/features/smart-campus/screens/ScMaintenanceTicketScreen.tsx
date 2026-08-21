import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScMaintenanceTicketScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/smart-campus/maintenance/tickets');
      const data = await response.json();
      setTickets(data.data);
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
      {tickets.map((ticket) => (
        <TouchableOpacity
          key={ticket.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScMaintenanceTicketDetail', { id: ticket.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{ticket.title}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(ticket.priority) }]}>
              <Text style={styles.priorityText}>{ticket.priority}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Ticket: {ticket.ticketNumber}</Text>
          <Text style={styles.info}>Location: {ticket.location}</Text>
          <Text style={styles.info}>Assigned To: {ticket.assignedTo}</Text>
          <Text style={styles.info}>Status: {ticket.status}</Text>
          <Text style={styles.info}>Created: {ticket.createdAt}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical':
      return '#b71c1c';
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
    flex: 1,
    marginRight: 8,
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
