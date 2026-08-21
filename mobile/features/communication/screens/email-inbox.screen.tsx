import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  hasAttachment: boolean;
  folder: 'inbox' | 'sent' | 'drafts';
}

const EmailInboxScreen: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'sent' | 'drafts'>('inbox');

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const mockData: Email[] = [
        { id: '1', from: 'Dr. Smith', subject: 'Meeting Agenda', preview: 'Here is the agenda for tomorrow\'s meeting...', timestamp: '2:30 PM', isRead: false, hasAttachment: true, folder: 'inbox' },
        { id: '2', from: 'Sarah Johnson', subject: 'Project Update', preview: 'The project is progressing well. I wanted to share...', timestamp: '11:20 AM', isRead: false, hasAttachment: false, folder: 'inbox' },
        { id: '3', from: 'Michael Chen', subject: 'Curriculum Review', preview: 'Please review the attached curriculum documents...', timestamp: 'Yesterday', isRead: true, hasAttachment: true, folder: 'inbox' },
        { id: '4', from: 'Lisa Wang', subject: 'Event Planning', preview: 'Let\'s discuss the upcoming school event...', timestamp: 'Jan 13', isRead: true, hasAttachment: false, folder: 'inbox' },
        { id: '5', from: 'James Wilson', subject: 'Budget Report', preview: 'The quarterly budget report is ready for review...', timestamp: 'Jan 12', isRead: true, hasAttachment: true, folder: 'sent' },
        { id: '6', from: 'You', subject: 'Re: Meeting Agenda', preview: 'Thanks for sharing the agenda. I have a few additions...', timestamp: '2:45 PM', isRead: true, hasAttachment: false, folder: 'sent' },
      ];
      setEmails(mockData);
    } catch (err) {
      setError('Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  const filteredEmails = emails.filter((e) => e.folder === activeFolder);

  const markAsRead = (emailId: string) => {
    setEmails(emails.map((e) => (e.id === emailId ? { ...e, isRead: true } : e)));
  };

  const renderItem = ({ item }: { item: Email }) => (
    <TouchableOpacity
      style={[styles.emailItem, !item.isRead && styles.unreadEmail]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.emailHeader}>
        <View style={styles.senderInfo}>
          {!item.isRead && <View style={styles.unreadDot} />}
          <Text style={[styles.sender, !item.isRead && styles.unreadSender]}>{item.from}</Text>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={[styles.subject, !item.isRead && styles.unreadSubject]}>{item.subject}</Text>
      <View style={styles.previewRow}>
        <Text style={styles.preview} numberOfLines={1}>{item.preview}</Text>
        {item.hasAttachment && <Text style={styles.attachmentIcon}>📎</Text>}
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
      <Text style={styles.title}>Email</Text>
      <View style={styles.folderTabs}>
        {(['inbox', 'sent', 'drafts'] as const).map((folder) => (
          <TouchableOpacity
            key={folder}
            style={[styles.folderTab, activeFolder === folder && styles.activeFolderTab]}
            onPress={() => setActiveFolder(folder)}
          >
            <Text style={[styles.folderTabText, activeFolder === folder && styles.activeFolderText]}>
              {folder.charAt(0).toUpperCase() + folder.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredEmails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.composeButton}>
        <Text style={styles.composeButtonText}>✏️ Compose</Text>
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
  folderTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  folderTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  activeFolderTab: {
    backgroundColor: '#3b82f6',
  },
  folderTabText: {
    fontSize: 14,
    color: '#666',
  },
  activeFolderText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 80,
  },
  emailItem: {
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
  unreadEmail: {
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  sender: {
    fontSize: 14,
    color: '#666',
  },
  unreadSender: {
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  subject: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  unreadSubject: {
    fontWeight: 'bold',
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preview: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  attachmentIcon: {
    fontSize: 14,
    marginLeft: 8,
  },
  composeButton: {
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
  composeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default EmailInboxScreen;
