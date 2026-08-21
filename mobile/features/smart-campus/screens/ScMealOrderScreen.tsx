import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface MealOrder {
  mealId: string;
  mealName: string;
  price: number;
  quantity: number;
  specialInstructions: string;
  pickupTime: string;
}

export const ScMealOrderScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { mealId } = route.params;
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState<OrderItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [pickupTime, setPickupTime] = useState('asap');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMealInfo();
  }, [mealId]);

  const fetchMealInfo = async () => {
    try {
      const response = await fetch(`/api/smart-campus/canteen/menu/${mealId}`);
      const json = await response.json();
      setMeal(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handlePlaceOrder = async () => {
    if (!meal) return;
    setSubmitting(true);
    try {
      const order: MealOrder = {
        mealId: meal.id,
        mealName: meal.name,
        price: meal.price,
        quantity,
        specialInstructions: '',
        pickupTime,
      };
      await fetch('/api/smart-campus/canteen/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      Alert.alert('Success', 'Order placed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Meal not found</Text>
      </View>
    );
  }

  const total = meal.price * quantity;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mealCard}>
        <Text style={styles.mealName}>{meal.name}</Text>
        <Text style={styles.mealPrice}>${meal.price.toFixed(2)} each</Text>
      </View>

      <View style={styles.quantitySection}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pickupSection}>
        <Text style={styles.sectionTitle}>Pickup Time</Text>
        <View style={styles.pickupOptions}>
          {[
            { key: 'asap', label: 'ASAP (15-20 min)' },
            { key: '12:00', label: '12:00 PM' },
            { key: '12:30', label: '12:30 PM' },
            { key: '13:00', label: '1:00 PM' },
            { key: '13:30', label: '1:30 PM' },
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.pickupOption, pickupTime === option.key && styles.pickupOptionActive]}
              onPress={() => setPickupTime(option.key)}
            >
              <Text style={[styles.pickupText, pickupTime === option.key && styles.pickupTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item</Text>
          <Text style={styles.summaryValue}>{meal.name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Quantity</Text>
          <Text style={styles.summaryValue}>{quantity}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Price</Text>
          <Text style={styles.summaryValue}>${meal.price.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryTotal]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handlePlaceOrder}
          disabled={submitting}
        >
          <Text style={styles.orderButtonText}>
            {submitting ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  mealCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  mealName: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  mealPrice: { fontSize: 16, color: '#28a745' },
  quantitySection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  quantityControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  quantityValue: { fontSize: 24, fontWeight: '700' },
  pickupSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  pickupOptions: { gap: 8 },
  pickupOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  pickupOptionActive: { backgroundColor: '#007AFF' },
  pickupText: { fontSize: 14, color: '#666' },
  pickupTextActive: { color: '#fff' },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, fontWeight: '500' },
  summaryTotal: { borderBottomWidth: 0 },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#28a745' },
  buttonContainer: { padding: 16 },
  orderButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
