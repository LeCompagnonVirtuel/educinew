import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'academic' | 'event' | 'urgent';
  author: string;
  timestamp: string;
  isPinned: boolean;
}

const AnnouncementsListScreen: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const mockData: Announcement[] = [
        { id: '1', title: 'Campus Closure Notice', content: 'Due to severe weather conditions, the campus will be closed tomorrow. All classes are cancelled.', type: 'urgent', author: 'Administration', timestamp: '2 hours ago', isPinned: true },
        { id: '2', title: 'Annual Science Fair', content: 'Join us for the annual science fair showcasing student projects and innovations.', type: 'event', author: 'Science Department', timestamp: 'Yesterday', isPinned: false },
        { id: '3', title: 'New Curriculum Updates', content: 'We are introducing new curriculum guidelines for the upcoming semester.', type: 'academic', author: 'Academic Board', timestamp: '3 days ago', isPinned: true },
        { id: '4', title: 'Staff Appreciation Week', content: 'Next week we celebrate our dedicated staff members.', type: 'general', author: 'HR Department', timestamp: '4 days ago', isPinned: false },
        { id: '5', title: 'Parent-Teacher Conference', content: 'Schedule your slots for the upcoming parent-teacher conference.', type: 'event', author: 'Administration', timestamp: '5 days ago', isPinned: false },
      ];
      setAnnouncements(mockData);
    } catch (err) {
      setError('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  const filters = ['all', 'general', 'academic', 'event', 'urgent'];

  const filteredAnnouncements = activeFilter === 'all'
    ? announcements
    : announcements.filter((a) => a.type === activeFilter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return '#ef4444';
      case 'event': return '#8b5cf6';
      case 'academic': return '#3b82f6';
      case 'general': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const renderItem = ({ item }: { item: Announcement }) => (
    <View style={[styles.card, item.isPinned && styles.pinnedCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          {item.isPinned && <Text style={styles.pinIcon}>📌</Text>}
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
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
      <Text style={styles.title}>Announcements</Text>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, activeFilter === filter && styles.activeFilter]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredAnnouncements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
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
    paddingBottom: 16,
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
  pinnedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
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
    gap: 4,
    flex: 1,
  },
  pinIcon: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  author: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default AnnouncementsListScreen;
