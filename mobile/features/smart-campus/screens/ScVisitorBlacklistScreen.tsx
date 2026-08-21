import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export const ScVisitorBlacklistScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [blacklisted, setBlacklisted] = useState<any[]>([]);

  useEffect(() => {
    fetchBlacklist();
  }, []);

  const fetchBlacklist = async () => {
    try {
      const response = await fetch('/api/smart-campus/visitors/blacklist');
      const data = await response.json();
      setBlacklisted(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (visitorId: string) => {
    Alert.alert(
      'Confirm Remove',
      'Remove visitor from blacklist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`/api/smart-campus/visitors/blacklist/${visitorId}`, {
                method: 'DELETE',
              });
              const data = await response.json();
              if (data.success) {
                Alert.alert('Success', 'Visitor removed from blacklist');
                fetchBlacklist();
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to remove visitor');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {blacklisted.map((visitor) => (
        <View key={visitor.id} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{visitor.name}</Text>
            <View style={styles.blacklistBadge}>
              <Text style={styles.badgeText}>BLACKLISTED</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>{visitor.email}</Text>
          <Text style={styles.info}>Reason: {visitor.reason}</Text>
          <Text style={styles.info}>Date Added: {visitor.dateAdded}</Text>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(visitor.id)}>
            <Text style={styles.removeButtonText}>Remove from Blacklist</Text>
          </TouchableOpacity>
        </View>
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
  blacklistBadge: {
    backgroundColor: '#f44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
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
  removeButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '600',
  },
});
