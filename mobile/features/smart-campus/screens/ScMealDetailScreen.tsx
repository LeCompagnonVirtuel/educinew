import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface MealDetail {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  available: boolean;
  prepTime: string;
  rating: number;
}

export const ScMealDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState<MealDetail | null>(null);

  useEffect(() => {
    fetchMealDetail();
  }, [id]);

  const fetchMealDetail = async () => {
    try {
      const response = await fetch(`/api/smart-campus/canteen/menu/${id}`);
      const json = await response.json();
      setMeal(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{meal.name}</Text>
        <View style={styles.headerRow}>
          <Text style={styles.category}>{meal.category}</Text>
          <Text style={styles.price}>${meal.price.toFixed(2)}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>Rating: {meal.rating.toFixed(1)} / 5.0</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{meal.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Information</Text>
        <View style={styles.nutritionGrid}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.nutritionInfo.calories}</Text>
            <Text style={styles.nutritionLabel}>Calories</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.nutritionInfo.protein}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.nutritionInfo.carbs}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{meal.nutritionInfo.fat}g</Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {meal.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Prep Time</Text>
          <Text style={styles.value}>{meal.prepTime}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Availability</Text>
          <Text style={[styles.value, meal.available ? styles.available : styles.unavailable]}>
            {meal.available ? 'Available' : 'Sold Out'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.orderButton, !meal.available && styles.orderButtonDisabled]}
          onPress={() => navigation.navigate('ScMealOrder', { mealId: meal.id })}
          disabled={!meal.available}
        >
          <Text style={styles.orderButtonText}>{meal.available ? 'Order Now' : 'Unavailable'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: { fontSize: 14, color: '#666' },
  price: { fontSize: 20, fontWeight: '700', color: '#28a745' },
  ratingContainer: { marginTop: 4 },
  rating: { fontSize: 14, color: '#ffc107' },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutritionItem: { alignItems: 'center' },
  nutritionValue: { fontSize: 18, fontWeight: '700', color: '#007AFF' },
  nutritionLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  ingredient: { fontSize: 14, color: '#666', marginBottom: 8 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: '500' },
  available: { color: '#28a745' },
  unavailable: { color: '#dc3545' },
  buttonContainer: { padding: 16 },
  orderButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonDisabled: { backgroundColor: '#ccc' },
  orderButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
