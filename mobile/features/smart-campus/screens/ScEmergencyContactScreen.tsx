import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  isPrimary: boolean;
}

export const ScEmergencyContactScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/smart-campus/medical/emergency-contacts');
      const json = await response.json();
      setContacts(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <Text style={styles.headerCount}>{contacts.length} Contacts</Text>
      </View>

      {contacts.map((contact) => (
        <View key={contact.id} style={[styles.card, contact.isPrimary && styles.primaryCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{contact.name}</Text>
            {contact.isPrimary && (
              <View style={styles.primaryBadge}>
                <Text style={styles.primaryText}>Primary</Text>
              </View>
            )}
          </View>
          <Text style={styles.relationship}>{contact.relationship}</Text>

          <View style={styles.contactInfo}>
            <TouchableOpacity style={styles.contactRow} onPress={() => handleCall(contact.phone)}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={[styles.contactValue, styles.phoneLink]}>{contact.phone}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactRow} onPress={() => handleEmail(contact.email)}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={[styles.contactValue, styles.emailLink]}>{contact.email}</Text>
            </TouchableOpacity>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>{contact.address}</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.callButton} onPress={() => handleCall(contact.phone)}>
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emailButton} onPress={() => handleEmail(contact.email)}>
              <Text style={styles.emailButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerCount: { fontSize: 14, color: '#666' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  primaryCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: { fontSize: 16, fontWeight: '600' },
  relationship: { fontSize: 14, color: '#666', marginBottom: 12 },
  contactInfo: { marginBottom: 12 },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  contactLabel: { fontSize: 14, color: '#666' },
  contactValue: { fontSize: 14, fontWeight: '500' },
  phoneLink: { color: '#007AFF' },
  emailLink: { color: '#007AFF' },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  emailButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  emailButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  primaryBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryText: { fontSize: 12, fontWeight: '600', color: '#fff' },
});
