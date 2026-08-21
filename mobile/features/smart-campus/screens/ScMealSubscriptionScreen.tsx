import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  mealsPerDay: number;
  features: string[];
}

interface UserSubscription {
  id: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: string;
  mealsRemaining: number;
}

export const ScMealSubscriptionScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plansRes, subRes] = await Promise.all([
        fetch('/api/smart-campus/canteen/subscriptions/plans'),
        fetch('/api/smart-campus/canteen/subscriptions/current'),
      ]);
      const plansJson = await plansRes.json();
      const subJson = await subRes.json();
      setPlans(plansJson.data);
      setCurrentSubscription(subJson.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (plan: SubscriptionPlan) => {
    Alert.alert(
      'Subscribe',
      `Subscribe to ${plan.name} for $${plan.price.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: async () => {
            try {
              await fetch('/api/smart-campus/canteen/subscriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId: plan.id }),
              });
              Alert.alert('Success', 'Subscription activated!');
              fetchData();
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Failed to subscribe');
            }
          },
        },
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch('/api/smart-campus/canteen/subscriptions/current', {
                method: 'DELETE',
              });
              Alert.alert('Success', 'Subscription cancelled');
              fetchData();
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Failed to cancel subscription');
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
      {currentSubscription && (
        <View style={styles.currentCard}>
          <Text style={styles.currentTitle}>Current Subscription</Text>
          <View style={styles.currentInfo}>
            <Text style={styles.planName}>{currentSubscription.planName}</Text>
            <View style={[styles.statusBadge, currentSubscription.status === 'active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{currentSubscription.status}</Text>
            </View>
          </View>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Start Date</Text>
              <Text style={styles.detailValue}>{currentSubscription.startDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>End Date</Text>
              <Text style={styles.detailValue}>{currentSubscription.endDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Meals Remaining</Text>
              <Text style={styles.detailValue}>{currentSubscription.mealsRemaining}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSubscription}>
            <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.sectionTitle}>Available Plans</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
          <View style={styles.planHeader}>
            <Text style={styles.planPrice}>${plan.price.toFixed(2)}</Text>
            <Text style={styles.planDuration}>/{plan.duration}</Text>
          </View>
          <Text style={styles.mealsInfo}>{plan.mealsPerDay} meals per day</Text>
          <View style={styles.featuresContainer}>
            {plan.features.map((feature, index) => (
              <Text key={index} style={styles.feature}>✓ {feature}</Text>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.subscribeButton, currentSubscription && styles.subscribeButtonDisabled]}
            onPress={() => handleSubscribe(plan)}
            disabled={!!currentSubscription}
          >
            <Text style={styles.subscribeButtonText}>
              {currentSubscription ? 'Current Plan' : 'Subscribe'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  currentCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  currentTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  currentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: { fontSize: 18, fontWeight: '700' },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: 12, color: '#999', marginBottom: 4 },
  detailValue: { fontSize: 14, fontWeight: '500' },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  planDescription: { fontSize: 14, color: '#666', marginBottom: 12 },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  planPrice: { fontSize: 28, fontWeight: '700', color: '#007AFF' },
  planDuration: { fontSize: 16, color: '#666' },
  mealsInfo: { fontSize: 14, color: '#666', marginBottom: 12 },
  featuresContainer: { marginBottom: 16 },
  feature: { fontSize: 14, color: '#28a745', marginBottom: 6 },
  subscribeButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  subscribeButtonDisabled: { backgroundColor: '#ccc' },
  subscribeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: { backgroundColor: '#d4edda' },
  statusInactive: { backgroundColor: '#f8d7da' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
