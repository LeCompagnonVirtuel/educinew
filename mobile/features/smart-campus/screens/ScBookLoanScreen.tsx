import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

interface LoanInfo {
  bookId: string;
  bookTitle: string;
  borrowerName: string;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  status: string;
  fine: number;
}

export const ScBookLoanScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<LoanInfo[]>([]);

  useEffect(() => {
    fetchLoans();
  }, [bookId]);

  const fetchLoans = async () => {
    try {
      const response = await fetch(`/api/smart-campus/library/loans?bookId=${bookId}`);
      const json = await response.json();
      setLoans(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = (loanId: string) => {
    Alert.alert(
      'Return Book',
      'Are you sure you want to return this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Return',
          onPress: async () => {
            try {
              await fetch(`/api/smart-campus/library/loans/${loanId}/return`, {
                method: 'POST',
              });
              fetchLoans();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const handleBorrow = async () => {
    try {
      await fetch('/api/smart-campus/library/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      Alert.alert('Success', 'Book borrowed successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to borrow book');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Loans</Text>
      </View>

      {loans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No loan records found</Text>
          <TouchableOpacity style={styles.borrowButton} onPress={handleBorrow}>
            <Text style={styles.borrowButtonText}>Borrow This Book</Text>
          </TouchableOpacity>
        </View>
      ) : (
        loans.map((loan) => (
          <View key={loan.loanDate} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.bookTitle}>{loan.bookTitle}</Text>
              <View style={[styles.statusBadge, loan.status === 'active' ? styles.statusActive : styles.statusReturned]}>
                <Text style={styles.statusText}>{loan.status}</Text>
              </View>
            </View>
            <Text style={styles.borrower}>Borrower: {loan.borrowerName}</Text>
            <View style={styles.datesRow}>
              <View style={styles.dateBlock}>
                <Text style={styles.dateLabel}>Loan Date</Text>
                <Text style={styles.dateValue}>{loan.loanDate}</Text>
              </View>
              <View style={styles.dateBlock}>
                <Text style={styles.dateLabel}>Due Date</Text>
                <Text style={styles.dateValue}>{loan.dueDate}</Text>
              </View>
              {loan.returnDate && (
                <View style={styles.dateBlock}>
                  <Text style={styles.dateLabel}>Return Date</Text>
                  <Text style={styles.dateValue}>{loan.returnDate}</Text>
                </View>
              )}
            </View>
            {loan.fine > 0 && (
              <Text style={styles.fine}>Fine: ${loan.fine.toFixed(2)}</Text>
            )}
            {loan.status === 'active' && (
              <TouchableOpacity
                style={styles.returnButton}
                onPress={() => handleReturn(loan.loanDate)}
              >
                <Text style={styles.returnButtonText}>Return Book</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  borrower: { fontSize: 14, color: '#666', marginBottom: 12 },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateBlock: { flex: 1 },
  dateLabel: { fontSize: 12, color: '#999', marginBottom: 4 },
  dateValue: { fontSize: 14, fontWeight: '500' },
  fine: { fontSize: 14, color: '#dc3545', marginBottom: 12 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: { backgroundColor: '#fff3cd' },
  statusReturned: { backgroundColor: '#d4edda' },
  statusText: { fontSize: 12, fontWeight: '600' },
  borrowButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  borrowButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  returnButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  returnButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
