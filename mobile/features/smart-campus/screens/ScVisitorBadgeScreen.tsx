import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScVisitorBadgeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState<any[]>([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await fetch('/api/smart-campus/visitors/badges');
      const data = await response.json();
      setVisitors(data.data);
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
      {visitors.map((visitor) => (
        <TouchableOpacity
          key={visitor.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScVisitorBadgeDetail', { id: visitor.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{visitor.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: visitor.badgeActive ? '#4CAF50' : '#f44336' }]}>
              <Text style={styles.statusText}>{visitor.badgeActive ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Badge: {visitor.badgeNumber}</Text>
          <Text style={styles.info}>Visit Date: {visitor.visitDate}</Text>
          <Text style={styles.info}>Host: {visitor.hostName}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
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
