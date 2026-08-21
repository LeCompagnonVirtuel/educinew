// Smart Campus Enterprise Types - Cantine
// Phase 2.8 - EduCI Platform

// =============================================================================
// ENUMS
// =============================================================================

export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
  SPECIAL = "special",
}

export enum MealStatus {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
  SOLD_OUT = "sold_out",
  LIMITED = "limited",
  DISCONTINUED = "discontinued",
}

export enum SubscriptionType {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  SEMESTER = "semester",
  ANNUAL = "annual",
  PAY_PER_MEAL = "pay_per_meal",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
  CANCELLED = "cancelled",
  PARTIAL = "partial",
}

export enum AllergenLevel {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum FoodStockStatus {
  IN_STOCK = "in_stock",
  LOW_STOCK = "low_stock",
  OUT_OF_STOCK = "out_of_stock",
  ORDERED = "ordered",
  EXPIRED = "expired",
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  READY = "ready",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum ConsumptionStatus {
  CONSUMED = "consumed",
  PARTIALLY_CONSUMED = "partially_consumed",
  NOT_CONSUMED = "not_consumed",
  WASTED = "wasted",
}

export enum KitchenStaffRole {
  CHEF = "chef",
  SOUS_CHEF = "sous_chef",
  COOK = "cook",
  PREP_COOK = "prep_cook",
  DISHWASHER = "dishwasher",
  KITCHEN_HELPER = "kitchen_helper",
  NUTRITIONIST = "nutritionist",
  MANAGER = "manager",
}

export enum MenuStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export enum SupplierStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  PENDING_APPROVAL = "pending_approval",
}

export enum NutritionGrade {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

export enum MealCategory {
  MAIN_COURSE = "main_course",
  SIDE_DISH = "side_dish",
  DESSERT = "dessert",
  BEVERAGE = "beverage",
  SOUP = "soup",
  SALAD = "salad",
  APPETIZER = "appetizer",
  COMBO = "combo",
  VEGETARIAN = "vegetarian",
  VEGAN = "vegan",
  HALAL = "halal",
  KOSHER = "kosher",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  MOBILE = "mobile",
  ACCOUNT = "account",
  VOUCHER = "voucher",
  SUBSCRIPTION = "subscription",
}

export enum ReportType {
  DAILY_SALES = "daily_sales",
  WEEKLY_SUMMARY = "weekly_summary",
  MONTHLY_ANALYSIS = "monthly_analysis",
  WASTE_REPORT = "waste_report",
  NUTRITION_REPORT = "nutrition_report",
  STOCK_REPORT = "stock_report",
  FINANCIAL_REPORT = "financial_report",
}

// =============================================================================
// INTERFACES
// =============================================================================

export interface Menu {
  id: string;
  school_id: string;
  name: string;
  description: string;
  date: string;
  meal_type: MealType;
  status: MenuStatus;
  meals: string[];
  special_instructions: string;
  is_special_menu: boolean;
  special_event_name: string;
  valid_from: string;
  valid_until: string;
  created_by: string;
  approved_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MenuCreate {
  school_id: string;
  name: string;
  description: string;
  date: string;
  meal_type: MealType;
  meals: string[];
  special_instructions: string;
  is_special_menu: boolean;
  special_event_name: string;
  valid_from: string;
  valid_until: string;
  created_by: string;
  notes: string;
}

export interface MenuUpdate {
  name?: string;
  description?: string;
  date?: string;
  meal_type?: MealType;
  status?: MenuStatus;
  meals?: string[];
  special_instructions?: string;
  is_special_menu?: boolean;
  special_event_name?: string;
  valid_from?: string;
  valid_until?: string;
  approved_by?: string;
  notes?: string;
}

export interface Meal {
  id: string;
  school_id: string;
  name: string;
  description: string;
  category: MealCategory;
  meal_type: MealType;
  status: MealStatus;
  price: number;
  cost: number;
  preparation_time_minutes: number;
  serving_size: string;
  calories: number;
  nutrition: Nutrition;
  allergens: Allergen[];
  ingredients: string[];
  image_url: string;
  is_available: boolean;
  available_quantity: number;
  max_quantity: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface MealCreate {
  school_id: string;
  name: string;
  description: string;
  category: MealCategory;
  meal_type: MealType;
  price: number;
  cost: number;
  preparation_time_minutes: number;
  serving_size: string;
  calories: number;
  nutrition: NutritionCreate;
  allergens: AllergenCreate[];
  ingredients: string[];
  image_url: string;
  available_quantity: number;
  max_quantity: number;
  tags: string[];
}

export interface Nutrition {
  id: string;
  school_id: string;
  meal_id: string;
  calories: number;
  protein_g: number;
  carbohydrates_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
  cholesterol_mg: number;
  vitamin_a_mcg: number;
  vitamin_c_mg: number;
  calcium_mg: number;
  iron_mg: number;
  grade: NutritionGrade;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface NutritionCreate {
  school_id: string;
  meal_id: string;
  calories: number;
  protein_g: number;
  carbohydrates_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
  cholesterol_mg: number;
  vitamin_a_mcg: number;
  vitamin_c_mg: number;
  calcium_mg: number;
  iron_mg: number;
  grade: NutritionGrade;
  notes: string;
}

export interface Allergen {
  id: string;
  school_id: string;
  meal_id: string;
  name: string;
  code: string;
  level: AllergenLevel;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AllergenCreate {
  school_id: string;
  meal_id: string;
  name: string;
  code: string;
  level: AllergenLevel;
  description: string;
}

export interface FoodStock {
  id: string;
  school_id: string;
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  minimum_quantity: number;
  maximum_quantity: number;
  status: FoodStockStatus;
  unit_cost: number;
  total_value: number;
  supplier_id: string;
  supplier_name: string;
  expiry_date: string;
  storage_location: string;
  last_restocked: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FoodStockCreate {
  school_id: string;
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  minimum_quantity: number;
  maximum_quantity: number;
  unit_cost: number;
  supplier_id: string;
  supplier_name: string;
  expiry_date: string;
  storage_location: string;
  last_restocked: string;
  notes: string;
}

export interface FoodSupplier {
  id: string;
  school_id: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  status: SupplierStatus;
  rating: number;
  delivery_days: string[];
  minimum_order: number;
  payment_terms: string;
  products: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FoodSupplierCreate {
  school_id: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  delivery_days: string[];
  minimum_order: number;
  payment_terms: string;
  products: string[];
  notes: string;
}

export interface MealOrder {
  id: string;
  school_id: string;
  user_id: string;
  user_name: string;
  user_type: string;
  menu_id: string;
  meal_ids: string[];
  meal_names: string[];
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  status: OrderStatus;
  order_date: string;
  delivery_date: string;
  delivery_location: string;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  special_requests: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MealOrderCreate {
  school_id: string;
  user_id: string;
  user_name: string;
  user_type: string;
  menu_id: string;
  meal_ids: string[];
  meal_names: string[];
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  delivery_date: string;
  delivery_location: string;
  payment_method: PaymentMethod;
  special_requests: string;
  notes: string;
}

export interface MealConsumption {
  id: string;
  school_id: string;
  user_id: string;
  user_name: string;
  meal_id: string;
  meal_name: string;
  order_id: string;
  status: ConsumptionStatus;
  quantity_consumed: number;
  quantity_wasted: number;
  consumption_date: string;
  consumption_time: string;
  feedback_rating: number;
  feedback_comment: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MealConsumptionCreate {
  school_id: string;
  user_id: string;
  user_name: string;
  meal_id: string;
  meal_name: string;
  order_id: string;
  status: ConsumptionStatus;
  quantity_consumed: number;
  quantity_wasted: number;
  consumption_date: string;
  consumption_time: string;
  feedback_rating: number;
  feedback_comment: string;
  notes: string;
}

export interface MealSubscription {
  id: string;
  school_id: string;
  user_id: string;
  user_name: string;
  user_type: string;
  subscription_type: SubscriptionType;
  start_date: string;
  end_date: string;
  is_active: boolean;
  meals_included: MealType[];
  price: number;
  payment_status: PaymentStatus;
  auto_renew: boolean;
  pause_start: string;
  pause_end: string;
  total_meals_used: number;
  total_meals_remaining: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MealSubscriptionCreate {
  school_id: string;
  user_id: string;
  user_name: string;
  user_type: string;
  subscription_type: SubscriptionType;
  start_date: string;
  end_date: string;
  meals_included: MealType[];
  price: number;
  payment_status: PaymentStatus;
  auto_renew: boolean;
  notes: string;
}

export interface MealPayment {
  id: string;
  school_id: string;
  user_id: string;
  user_name: string;
  order_id: string;
  subscription_id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id: string;
  payment_date: string;
  receipt_number: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MealPaymentCreate {
  school_id: string;
  user_id: string;
  user_name: string;
  order_id: string;
  subscription_id: string;
  amount: number;
  method: PaymentMethod;
  transaction_id: string;
  payment_date: string;
  receipt_number: string;
  notes: string;
}

export interface MealAttendance {
  id: string;
  school_id: string;
  user_id: string;
  user_name: string;
  user_type: string;
  meal_type: MealType;
  date: string;
  checked_in: boolean;
  check_in_time: string;
  check_out_time: string;
  meal_id: string;
  meal_name: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MealAttendanceCreate {
  school_id: string;
  user_id: string;
  user_name: string;
  user_type: string;
  meal_type: MealType;
  date: string;
  check_in_time: string;
  meal_id: string;
  meal_name: string;
  notes: string;
}

export interface KitchenStaff {
  id: string;
  school_id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  role: KitchenStaffRole;
  phone: string;
  email: string;
  shift_start: string;
  shift_end: string;
  is_active: boolean;
  certification: string;
  specialization: string[];
  hire_date: string;
  salary: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface KitchenStaffCreate {
  school_id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  role: KitchenStaffRole;
  phone: string;
  email: string;
  shift_start: string;
  shift_end: string;
  certification: string;
  specialization: string[];
  hire_date: string;
  salary: number;
  notes: string;
}

export interface CantineReport {
  id: string;
  school_id: string;
  report_type: ReportType;
  period_start: string;
  period_end: string;
  generated_at: string;
  generated_by: string;
  data: Record<string, unknown>;
  summary: string;
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface CantineReportCreate {
  school_id: string;
  report_type: ReportType;
  period_start: string;
  period_end: string;
  generated_by: string;
  data: Record<string, unknown>;
  summary: string;
  recommendations: string[];
}

export interface MenuFilter {
  school_id: string;
  date?: string;
  meal_type?: MealType[];
  status?: MenuStatus[];
  is_special_menu?: boolean;
  category?: MealCategory[];
  min_price?: number;
  max_price?: number;
  search?: string;
}

export interface CantineAnalytics {
  total_meals_served: number;
  total_revenue: number;
  total_cost: number;
  profit_margin: number;
  average_daily_orders: number;
  peak_meal_time: MealType;
  most_popular_meals: Array<{
    meal_id: string;
    meal_name: string;
    order_count: number;
    revenue: number;
  }>;
  meal_consumption_by_type: Array<{
    meal_type: MealType;
    total_served: number;
    total_wasted: number;
    waste_percentage: number;
  }>;
  nutrition_analytics: {
    average_calories_per_meal: number;
    average_protein_g: number;
    average_carbohydrates_g: number;
    average_fat_g: number;
  };
  subscription_analytics: {
    total_active_subscriptions: number;
    subscription_by_type: Array<{
      type: SubscriptionType;
      count: number;
      revenue: number;
    }>;
  };
  payment_analytics: {
    total_transactions: number;
    average_transaction_value: number;
    payment_by_method: Array<{
      method: PaymentMethod;
      count: number;
      amount: number;
    }>;
  };
  waste_analytics: {
    total_waste_kg: number;
    waste_cost: number;
    waste_reduction_percentage: number;
  };
  period_start: string;
  period_end: string;
  generated_at: string;
}

export interface MealPlan {
  id: string;
  school_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  meals_per_day: number;
  meals: Array<{
    day: number;
    meal_type: MealType;
    meal_id: string;
    meal_name: string;
    portion_size: string;
  }>;
  total_cost: number;
  average_daily_cost: number;
  nutrition_summary: {
    average_calories: number;
    average_protein: number;
    average_carbs: number;
    average_fat: number;
  };
  is_active: boolean;
  created_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MealPlanCreate {
  school_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  meals_per_day: number;
  meals: Array<{
    day: number;
    meal_type: MealType;
    meal_id: string;
    meal_name: string;
    portion_size: string;
  }>;
  total_cost: number;
  average_daily_cost: number;
  nutrition_summary: {
    average_calories: number;
    average_protein: number;
    average_carbs: number;
    average_fat: number;
  };
  is_active: boolean;
  created_by: string;
  notes: string;
}

export interface DietaryRestriction {
  id: string;
  school_id: string;
  user_id: string;
  user_name: string;
  restriction_type: string;
  severity: string;
  allergens: string[];
  excluded_ingredients: string[];
  preferred_meals: string[];
  medical_notes: string;
  doctor_approval: boolean;
  valid_from: string;
  valid_until: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierOrder {
  id: string;
  school_id: string;
  supplier_id: string;
  supplier_name: string;
  order_date: string;
  expected_delivery: string;
  actual_delivery: string;
  items: Array<{
    item_id: string;
    item_name: string;
    quantity: number;
    unit: string;
    unit_cost: number;
    total_cost: number;
  }>;
  total_amount: number;
  status: string;
  payment_status: PaymentStatus;
  delivery_address: string;
  special_instructions: string;
  received_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierOrderCreate {
  school_id: string;
  supplier_id: string;
  supplier_name: string;
  order_date: string;
  expected_delivery: string;
  items: Array<{
    item_id: string;
    item_name: string;
    quantity: number;
    unit: string;
    unit_cost: number;
    total_cost: number;
  }>;
  total_amount: number;
  delivery_address: string;
  special_instructions: string;
  notes: string;
}
