import { z } from 'zod';

// ============================================================================
// CANTINE SCHEMAS (40)
// ============================================================================

// --- Menu ---

export const menuCreateSchema = z.object({
  name: z.string().min(1, 'Menu name is required').max(200),
  description: z.string().max(1000).optional(),
  categoryId: z.string().uuid('Invalid category ID'),
  dayOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  effectiveFrom: z.string().datetime(),
  effectiveUntil: z.string().datetime(),
  items: z.array(
    z.object({
      name: z.string().min(1).max(200),
      description: z.string().max(500).optional(),
      mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
      price: z.number().min(0),
      isAvailable: z.boolean().default(true),
    })
  ).min(1, 'At least one menu item is required'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const menuUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  categoryId: z.string().uuid().optional(),
  dayOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).optional(),
  effectiveFrom: z.string().datetime().optional(),
  effectiveUntil: z.string().datetime().optional(),
  items: z.array(
    z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(200),
      description: z.string().max(500).optional(),
      mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
      price: z.number().min(0),
      isAvailable: z.boolean(),
    })
  ).min(1).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const menuQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'createdAt', 'dayOfWeek', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  dayOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  categoryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
});

export const menuFilterSchema = z.object({
  dayOfWeek: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])).optional(),
  status: z.array(z.enum(['draft', 'published', 'archived'])).optional(),
  categoryId: z.array(z.string().uuid()).optional(),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }).optional(),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }).optional(),
  tags: z.array(z.string()).optional(),
});

// --- Meal ---

export const mealCreateSchema = z.object({
  menuId: z.string().uuid('Invalid menu ID'),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  name: z.string().min(1, 'Meal name is required').max(200),
  description: z.string().max(1000).optional(),
  servingTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format (HH:mm)'),
  servingEndTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format (HH:mm)'),
  portionSize: z.number().min(0).optional(),
  portionUnit: z.enum(['grams', 'ml', 'pieces', 'slices']).optional(),
  price: z.number().min(0),
  availableQuantity: z.number().int().min(0).optional(),
  ingredients: z.array(z.string().max(200)).max(50).optional(),
  preparationInstructions: z.string().max(2000).optional(),
  temperatureRequirement: z.enum(['hot', 'cold', 'room']).optional(),
});

export const mealUpdateSchema = z.object({
  menuId: z.string().uuid().optional(),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']).optional(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  servingTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  servingEndTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  portionSize: z.number().min(0).optional(),
  portionUnit: z.enum(['grams', 'ml', 'pieces', 'slices']).optional(),
  price: z.number().min(0).optional(),
  availableQuantity: z.number().int().min(0).optional(),
  ingredients: z.array(z.string().max(200)).max(50).optional(),
  preparationInstructions: z.string().max(2000).optional(),
  temperatureRequirement: z.enum(['hot', 'cold', 'room']).optional(),
  isActive: z.boolean().optional(),
});

// --- Nutrition ---

export const nutritionCreateSchema = z.object({
  mealId: z.string().uuid('Invalid meal ID'),
  calories: z.number().min(0),
  protein: z.number().min(0).optional(),
  carbohydrates: z.number().min(0).optional(),
  fat: z.number().min(0).optional(),
  fiber: z.number().min(0).optional(),
  sugar: z.number().min(0).optional(),
  sodium: z.number().min(0).optional(),
  cholesterol: z.number().min(0).optional(),
  vitamins: z.array(
    z.object({
      name: z.string().min(1).max(100),
      amount: z.number().min(0),
      unit: z.string().min(1).max(20),
    })
  ).max(20).optional(),
  minerals: z.array(
    z.object({
      name: z.string().min(1).max(100),
      amount: z.number().min(0),
      unit: z.string().min(1).max(20),
    })
  ).max(20).optional(),
  servingSize: z.number().min(0).optional(),
  servingUnit: z.string().max(20).optional(),
  source: z.string().max(200).optional(),
});

export const nutritionUpdateSchema = z.object({
  mealId: z.string().uuid().optional(),
  calories: z.number().min(0).optional(),
  protein: z.number().min(0).optional(),
  carbohydrates: z.number().min(0).optional(),
  fat: z.number().min(0).optional(),
  fiber: z.number().min(0).optional(),
  sugar: z.number().min(0).optional(),
  sodium: z.number().min(0).optional(),
  cholesterol: z.number().min(0).optional(),
  vitamins: z.array(
    z.object({
      name: z.string().min(1).max(100),
      amount: z.number().min(0),
      unit: z.string().min(1).max(20),
    })
  ).max(20).optional(),
  minerals: z.array(
    z.object({
      name: z.string().min(1).max(100),
      amount: z.number().min(0),
      unit: z.string().min(1).max(20),
    })
  ).max(20).optional(),
  servingSize: z.number().min(0).optional(),
  servingUnit: z.string().max(20).optional(),
  source: z.string().max(200).optional(),
});

// --- Allergen ---

export const allergenCreateSchema = z.object({
  name: z.string().min(1, 'Allergen name is required').max(200),
  description: z.string().max(1000).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.enum(['common', 'rare', 'environmental', 'drug']),
  iconUrl: z.string().url().optional(),
  colorCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
  synonyms: z.array(z.string().max(100)).max(10).optional(),
  regulatoryInfo: z.string().max(500).optional(),
  isActive: z.boolean().default(true),
});

export const allergenUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  category: z.enum(['common', 'rare', 'environmental', 'drug']).optional(),
  iconUrl: z.string().url().optional(),
  colorCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  synonyms: z.array(z.string().max(100)).max(10).optional(),
  regulatoryInfo: z.string().max(500).optional(),
  isActive: z.boolean().optional(),
});

// --- Food Stock ---

export const foodStockCreateSchema = z.object({
  name: z.string().min(1, 'Stock item name is required').max(200),
  description: z.string().max(1000).optional(),
  category: z.enum(['produce', 'dairy', 'meat', 'seafood', 'grains', 'spices', 'beverages', 'frozen', 'canned', 'other']),
  quantity: z.number().min(0),
  unit: z.enum(['kg', 'g', 'lbs', 'oz', 'liters', 'ml', 'gallons', 'pieces', 'cases']),
  minimumQuantity: z.number().min(0).optional(),
  maximumQuantity: z.number().min(0).optional(),
  costPerUnit: z.number().min(0),
  supplierId: z.string().uuid().optional(),
  location: z.string().max(200).optional(),
  batchNumber: z.string().max(100).optional(),
  expirationDate: z.string().datetime().optional(),
  storageRequirements: z.string().max(500).optional(),
  barcode: z.string().max(100).optional(),
});

export const foodStockUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  category: z.enum(['produce', 'dairy', 'meat', 'seafood', 'grains', 'spices', 'beverages', 'frozen', 'canned', 'other']).optional(),
  quantity: z.number().min(0).optional(),
  unit: z.enum(['kg', 'g', 'lbs', 'oz', 'liters', 'ml', 'gallons', 'pieces', 'cases']).optional(),
  minimumQuantity: z.number().min(0).optional(),
  maximumQuantity: z.number().min(0).optional(),
  costPerUnit: z.number().min(0).optional(),
  supplierId: z.string().uuid().optional(),
  location: z.string().max(200).optional(),
  batchNumber: z.string().max(100).optional(),
  expirationDate: z.string().datetime().optional(),
  storageRequirements: z.string().max(500).optional(),
  barcode: z.string().max(100).optional(),
  isActive: z.boolean().optional(),
});

// --- Supplier ---

export const supplierCreateSchema = z.object({
  name: z.string().min(1, 'Supplier name is required').max(200),
  contactPerson: z.string().min(1).max(200),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1).max(50),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }),
  category: z.enum(['food', 'beverages', 'equipment', 'packaging', 'cleaning', 'other']),
  rating: z.number().min(0).max(5).optional(),
  certifications: z.array(z.string().max(200)).max(20).optional(),
  paymentTerms: z.string().max(200).optional(),
  leadTimeDays: z.number().int().min(0).optional(),
  minimumOrderAmount: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
  notes: z.string().max(1000).optional(),
});

export const supplierUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  contactPerson: z.string().min(1).max(200).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).max(50).optional(),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }).optional(),
  category: z.enum(['food', 'beverages', 'equipment', 'packaging', 'cleaning', 'other']).optional(),
  rating: z.number().min(0).max(5).optional(),
  certifications: z.array(z.string().max(200)).max(20).optional(),
  paymentTerms: z.string().max(200).optional(),
  leadTimeDays: z.number().int().min(0).optional(),
  minimumOrderAmount: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
});

// --- Order ---

export const orderCreateSchema = z.object({
  supplierId: z.string().uuid('Invalid supplier ID'),
  items: z.array(
    z.object({
      stockItemId: z.string().uuid('Invalid stock item ID'),
      quantity: z.number().min(0.01),
      unit: z.enum(['kg', 'g', 'lbs', 'oz', 'liters', 'ml', 'gallons', 'pieces', 'cases']),
      unitPrice: z.number().min(0),
      notes: z.string().max(200).optional(),
    })
  ).min(1, 'At least one item is required'),
  expectedDeliveryDate: z.string().datetime(),
  deliveryAddress: z.string().max(500).optional(),
  paymentMethod: z.enum(['cash', 'credit', 'bankTransfer', 'check']).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  notes: z.string().max(1000).optional(),
  requestedBy: z.string().uuid('Invalid user ID'),
});

export const orderUpdateSchema = z.object({
  supplierId: z.string().uuid().optional(),
  items: z.array(
    z.object({
      id: z.string().uuid().optional(),
      stockItemId: z.string().uuid('Invalid stock item ID'),
      quantity: z.number().min(0.01),
      unit: z.enum(['kg', 'g', 'lbs', 'oz', 'liters', 'ml', 'gallons', 'pieces', 'cases']),
      unitPrice: z.number().min(0),
      notes: z.string().max(200).optional(),
    })
  ).min(1).optional(),
  expectedDeliveryDate: z.string().datetime().optional(),
  actualDeliveryDate: z.string().datetime().optional(),
  deliveryAddress: z.string().max(500).optional(),
  paymentMethod: z.enum(['cash', 'credit', 'bankTransfer', 'check']).optional(),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  notes: z.string().max(1000).optional(),
});

// --- Consumption ---

export const consumptionCreateSchema = z.object({
  mealId: z.string().uuid('Invalid meal ID'),
  date: z.string().datetime(),
  quantityConsumed: z.number().min(0),
  quantityWasted: z.number().min(0).optional(),
  costPerServing: z.number().min(0),
  servedTo: z.array(z.string().uuid()).min(1, 'At least one consumer is required'),
  notes: z.string().max(500).optional(),
  recordedBy: z.string().uuid('Invalid user ID'),
});

// --- Subscription ---

export const subscriptionCreateSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  planType: z.enum(['daily', 'weekly', 'monthly', 'semester', 'yearly']),
  mealTypes: z.array(z.enum(['breakfast', 'lunch', 'dinner', 'snack'])).min(1, 'At least one meal type is required'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  price: z.number().min(0),
  paymentFrequency: z.enum(['upfront', 'monthly', 'quarterly']),
  autoRenew: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export const subscriptionUpdateSchema = z.object({
  studentId: z.string().uuid().optional(),
  planType: z.enum(['daily', 'weekly', 'monthly', 'semester', 'yearly']).optional(),
  mealTypes: z.array(z.enum(['breakfast', 'lunch', 'dinner', 'snack'])).min(1).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  price: z.number().min(0).optional(),
  paymentFrequency: z.enum(['upfront', 'monthly', 'quarterly']).optional(),
  autoRenew: z.boolean().optional(),
  status: z.enum(['active', 'paused', 'cancelled', 'expired']).optional(),
  notes: z.string().max(500).optional(),
});

// --- Payment ---

export const paymentCreateSchema = z.object({
  subscriptionId: z.string().uuid('Invalid subscription ID'),
  amount: z.number().min(0),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  paymentMethod: z.enum(['cash', 'card', 'bankTransfer', 'mobile', 'check']),
  transactionReference: z.string().max(200).optional(),
  paidBy: z.string().uuid('Invalid user ID'),
  paidAt: z.string().datetime(),
  notes: z.string().max(500).optional(),
});

export const paymentUpdateSchema = z.object({
  subscriptionId: z.string().uuid().optional(),
  amount: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  paymentMethod: z.enum(['cash', 'card', 'bankTransfer', 'mobile', 'check']).optional(),
  transactionReference: z.string().max(200).optional(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).optional(),
  notes: z.string().max(500).optional(),
});

// --- Attendance ---

export const attendanceCreateSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  mealId: z.string().uuid('Invalid meal ID'),
  date: z.string().datetime(),
  status: z.enum(['present', 'absent', 'late', 'excused']),
  checkInTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  notes: z.string().max(500).optional(),
  recordedBy: z.string().uuid('Invalid user ID'),
});

// --- Kitchen Staff ---

export const kitchenStaffCreateSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  role: z.enum(['chef', 'sousChef', 'cook', 'prepCook', 'dishwasher', 'manager', 'nutritionist']),
  certifications: z.array(z.string().max(200)).max(20).optional(),
  specializations: z.array(z.string().max(200)).max(10).optional(),
  hireDate: z.string().datetime(),
  shiftPattern: z.enum(['morning', 'afternoon', 'evening', 'rotating']),
  hourlyRate: z.number().min(0).optional(),
  emergencyContact: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(1).max(50),
    relationship: z.string().max(100),
  }).optional(),
  isActive: z.boolean().default(true),
});

export const kitchenStaffUpdateSchema = z.object({
  userId: z.string().uuid().optional(),
  role: z.enum(['chef', 'sousChef', 'cook', 'prepCook', 'dishwasher', 'manager', 'nutritionist']).optional(),
  certifications: z.array(z.string().max(200)).max(20).optional(),
  specializations: z.array(z.string().max(200)).max(10).optional(),
  shiftPattern: z.enum(['morning', 'afternoon', 'evening', 'rotating']).optional(),
  hourlyRate: z.number().min(0).optional(),
  emergencyContact: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(1).max(50),
    relationship: z.string().max(100),
  }).optional(),
  isActive: z.boolean().optional(),
});

// --- Cantine Report ---

export const cantineReportSchema = z.object({
  reportType: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  includeMetrics: z.array(z.enum([
    'consumption',
    'waste',
    'revenue',
    'attendance',
    'nutrition',
    'inventory',
    'staff',
    'supplierPerformance',
  ])).min(1, 'At least one metric is required'),
  format: z.enum(['pdf', 'csv', 'json', 'xlsx']).default('pdf'),
  groupBy: z.enum(['day', 'week', 'month', 'mealType', 'category']).optional(),
  filters: z.object({
    mealTypes: z.array(z.enum(['breakfast', 'lunch', 'dinner', 'snack'])).optional(),
    categories: z.array(z.string().uuid()).optional(),
    staffIds: z.array(z.string().uuid()).optional(),
  }).optional(),
});

// --- Menu Search ---

export const menuSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
  filters: z.object({
    dayOfWeek: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])).optional(),
    mealType: z.array(z.enum(['breakfast', 'lunch', 'dinner', 'snack'])).optional(),
    priceRange: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
    }).optional(),
    allergenFree: z.array(z.string().uuid()).optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// --- Menu Bulk Operations ---

export const menuBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one menu ID is required'),
  updates: z.object({
    status: z.enum(['draft', 'published', 'archived']).optional(),
    categoryId: z.string().uuid().optional(),
    tags: z.array(z.string().max(50)).max(10).optional(),
    priceMultiplier: z.number().min(0.1).max(10).optional(),
  }),
});

export const menuBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one menu ID is required'),
  force: z.boolean().default(false),
});

// --- Menu Export/Import ---

export const menuExportSchema = z.object({
  format: z.enum(['csv', 'json', 'xlsx', 'pdf']),
  ids: z.array(z.string().uuid()).optional(),
  includeItems: z.boolean().default(true),
  includeNutrition: z.boolean().default(false),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }).optional(),
});

export const menuImportSchema = z.object({
  fileUrl: z.string().url('Invalid file URL'),
  format: z.enum(['csv', 'json', 'xlsx']),
  overwrite: z.boolean().default(false),
  validateOnly: z.boolean().default(false),
  categoryId: z.string().uuid().optional(),
});

// --- Menu Settings ---

export const menuSettingsSchema = z.object({
  defaultCurrency: z.string().length(3),
  maxItemsPerMenu: z.number().int().min(1).max(100),
  enablePricing: z.boolean(),
  enableNutrition: z.boolean(),
  enableAllergenTracking: z.boolean(),
  autoPublish: z.boolean(),
  approvalRequired: z.boolean(),
  defaultMenuDuration: z.number().int().min(1).max(365),
  imageStorageLimit: z.number().int().min(1),
  allowStudentFeedback: z.boolean(),
  feedbackAnonymous: z.boolean().default(true),
  displayAllergens: z.boolean(),
  displayNutrition: z.boolean(),
});

// --- Menu Accessibility ---

export const menuAccessibilitySchema = z.object({
  highContrast: z.boolean().default(false),
  largeText: z.boolean().default(false),
  screenReaderOptimized: z.boolean().default(false),
  keyboardNavigation: z.boolean().default(true),
  altTextRequired: z.boolean().default(true),
  colorBlindFriendly: z.boolean().default(false),
  simplifiedView: z.boolean().default(false),
  audioDescriptions: z.boolean().default(false),
  dyslexiaFriendly: z.boolean().default(false),
  motionReduction: z.boolean().default(false),
});

// --- Menu Localization ---

export const menuLocalizationSchema = z.object({
  defaultLanguage: z.string().min(2).max(5),
  supportedLanguages: z.array(z.string().min(2).max(5)).min(1),
  translations: z.array(
    z.object({
      language: z.string().min(2).max(5),
      menuId: z.string().uuid(),
      name: z.string().min(1).max(200),
      description: z.string().max(1000).optional(),
      items: z.array(
        z.object({
          itemId: z.string().uuid(),
          name: z.string().min(1).max(200),
          description: z.string().max(500).optional(),
        })
      ).optional(),
    })
  ).max(50).optional(),
  autoTranslate: z.boolean().default(false),
  fallbackLanguage: z.string().min(2).max(5).optional(),
});

// --- Menu Metadata ---

export const menuMetadataSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  keywords: z.array(z.string().max(100)).max(20).optional(),
  author: z.string().max(200).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  version: z.string().max(50).optional(),
  category: z.string().max(100).optional(),
  customFields: z.array(
    z.object({
      key: z.string().min(1).max(100),
      value: z.string().max(500),
      type: z.enum(['text', 'number', 'boolean', 'date']),
    })
  ).max(20).optional(),
});

// --- Menu Pricing ---

export const menuPricingSchema = z.object({
  menuId: z.string().uuid('Invalid menu ID'),
  basePrice: z.number().min(0),
  currency: z.string().length(3),
  discountPercentage: z.number().min(0).max(100).optional(),
  bulkPricing: z.array(
    z.object({
      minQuantity: z.number().int().min(1),
      maxQuantity: z.number().int().min(1),
      pricePerUnit: z.number().min(0),
    })
  ).max(10).optional(),
  timeBasedPricing: z.array(
    z.object({
      startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      priceMultiplier: z.number().min(0.1).max(10),
    })
  ).max(5).optional(),
  studentDiscount: z.number().min(0).max(100).optional(),
  staffDiscount: z.number().min(0).max(100).optional(),
  taxRate: z.number().min(0).max(100).optional(),
});

// --- Menu Bundle ---

export const menuBundleSchema = z.object({
  name: z.string().min(1, 'Bundle name is required').max(200),
  description: z.string().max(1000).optional(),
  menuIds: z.array(z.string().uuid()).min(2, 'At least 2 menus are required for a bundle'),
  bundlePrice: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  maxQuantity: z.number().int().min(1).optional(),
  isActive: z.boolean().default(true),
});

// --- Menu Subscription ---

export const menuSubscriptionSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  menuIds: z.array(z.string().uuid()).min(1),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  price: z.number().min(0),
  currency: z.string().length(3),
  autoRotate: z.boolean().default(true),
  allowCustomization: z.boolean().default(false),
  maxSwapPerPeriod: z.number().int().min(0).optional(),
  cancellationPolicy: z.string().max(500).optional(),
  isActive: z.boolean().default(true),
});

// --- Menu Version ---

export const menuVersionSchema = z.object({
  menuId: z.string().uuid('Invalid menu ID'),
  versionNumber: z.string().max(50),
  changeDescription: z.string().max(500),
  snapshot: z.record(z.unknown()),
  createdBy: z.string().uuid('Invalid user ID'),
  isPublished: z.boolean().default(false),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

// --- Menu Archive ---

export const menuArchiveSchema = z.object({
  menuId: z.string().uuid('Invalid menu ID'),
  reason: z.string().max(500).optional(),
  archiveUntil: z.string().datetime().optional(),
  preserveForAnalytics: z.boolean().default(true),
  notifySubscribers: z.boolean().default(false),
});

// --- Menu Restore ---

export const menuRestoreSchema = z.object({
  menuId: z.string().uuid('Invalid menu ID'),
  restoreToStatus: z.enum(['draft', 'published']).default('draft'),
  includeVersionHistory: z.boolean().default(true),
  notifySubscribers: z.boolean().default(false),
});

// ============================================================================
// MEDICAL SCHEMAS (40)
// ============================================================================

// --- Medical Record ---

export const medicalRecordCreateSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  height: z.number().min(0).optional(),
  heightUnit: z.enum(['cm', 'in']).optional(),
  weight: z.number().min(0).optional(),
  weightUnit: z.enum(['kg', 'lbs']).optional(),
  insuranceProvider: z.string().max(200).optional(),
  insurancePolicyNumber: z.string().max(100).optional(),
  insuranceExpiry: z.string().datetime().optional(),
  primaryPhysician: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(1).max(50),
    email: z.string().email().optional(),
    facility: z.string().max(200).optional(),
  }).optional(),
  medicalConditions: z.array(z.string().max(200)).max(50).optional(),
  disabilities: z.array(z.string().max(200)).max(20).optional(),
  notes: z.string().max(5000).optional(),
  isActive: z.boolean().default(true),
});

export const medicalRecordUpdateSchema = z.object({
  studentId: z.string().uuid().optional(),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  height: z.number().min(0).optional(),
  heightUnit: z.enum(['cm', 'in']).optional(),
  weight: z.number().min(0).optional(),
  weightUnit: z.enum(['kg', 'lbs']).optional(),
  insuranceProvider: z.string().max(200).optional(),
  insurancePolicyNumber: z.string().max(100).optional(),
  insuranceExpiry: z.string().datetime().optional(),
  primaryPhysician: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(1).max(50),
    email: z.string().email().optional(),
    facility: z.string().max(200).optional(),
  }).optional(),
  medicalConditions: z.array(z.string().max(200)).max(50).optional(),
  disabilities: z.array(z.string().max(200)).max(20).optional(),
  notes: z.string().max(5000).optional(),
  isActive: z.boolean().optional(),
});

export const medicalRecordQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'studentId', 'bloodType']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  studentId: z.string().uuid().optional(),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  hasConditions: z.boolean().optional(),
  search: z.string().max(200).optional(),
});

export const medicalRecordFilterSchema = z.object({
  bloodType: z.array(z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])).optional(),
  hasInsurance: z.boolean().optional(),
  hasConditions: z.boolean().optional(),
  hasDisabilities: z.boolean().optional(),
  ageRange: z.object({
    min: z.number().int().min(0),
    max: z.number().int().min(0),
  }).optional(),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }).optional(),
  insuranceExpiryRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }).optional(),
});

// --- Visit ---

export const visitCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  visitDate: z.string().datetime(),
  visitType: z.enum(['routine', 'emergency', 'followUp', 'specialist', 'vaccination', 'dental', 'vision']),
  reason: z.string().min(1, 'Visit reason is required').max(1000),
  facility: z.string().max(200).optional(),
  physician: z.string().max(200).optional(),
  symptoms: z.array(z.string().max(200)).max(20).optional(),
  diagnosis: z.string().max(2000).optional(),
  notes: z.string().max(5000).optional(),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(
    z.object({
      name: z.string().min(1).max(200),
      url: z.string().url(),
      type: z.enum(['image', 'document', 'lab_result', 'prescription']),
    })
  ).max(20).optional(),
});

export const visitUpdateSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  visitDate: z.string().datetime().optional(),
  visitType: z.enum(['routine', 'emergency', 'followUp', 'specialist', 'vaccination', 'dental', 'vision']).optional(),
  reason: z.string().min(1).max(1000).optional(),
  facility: z.string().max(200).optional(),
  physician: z.string().max(200).optional(),
  symptoms: z.array(z.string().max(200)).max(20).optional(),
  diagnosis: z.string().max(2000).optional(),
  notes: z.string().max(5000).optional(),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(
    z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(200),
      url: z.string().url(),
      type: z.enum(['image', 'document', 'lab_result', 'prescription']),
    })
  ).max(20).optional(),
});

// --- Treatment ---

export const treatmentCreateSchema = z.object({
  visitId: z.string().uuid('Invalid visit ID'),
  treatmentType: z.enum(['medication', 'procedure', 'therapy', 'surgery', 'referral', 'other']),
  description: z.string().min(1, 'Treatment description is required').max(2000),
  diagnosisCode: z.string().max(50).optional(),
  procedureCode: z.string().max(50).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  dosage: z.string().max(200).optional(),
  frequency: z.string().max(200).optional(),
  duration: z.string().max(200).optional(),
  sideEffects: z.array(z.string().max(200)).max(20).optional(),
  notes: z.string().max(2000).optional(),
  prescribedBy: z.string().max(200).optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'discontinued']).default('planned'),
});

export const treatmentUpdateSchema = z.object({
  visitId: z.string().uuid().optional(),
  treatmentType: z.enum(['medication', 'procedure', 'therapy', 'surgery', 'referral', 'other']).optional(),
  description: z.string().min(1).max(2000).optional(),
  diagnosisCode: z.string().max(50).optional(),
  procedureCode: z.string().max(50).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  dosage: z.string().max(200).optional(),
  frequency: z.string().max(200).optional(),
  duration: z.string().max(200).optional(),
  sideEffects: z.array(z.string().max(200)).max(20).optional(),
  notes: z.string().max(2000).optional(),
  prescribedBy: z.string().max(200).optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'discontinued']).optional(),
});

// --- Vaccination ---

export const vaccinationCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  vaccineName: z.string().min(1, 'Vaccine name is required').max(200),
  vaccineType: z.enum(['routine', 'travel', 'seasonal', 'emergency', 'optional']),
  dateAdministered: z.string().datetime(),
  doseNumber: z.number().int().min(1),
  totalDoses: z.number().int().min(1),
  manufacturer: z.string().max(200).optional(),
  batchNumber: z.string().max(100).optional(),
  expirationDate: z.string().datetime().optional(),
  site: z.string().max(100).optional(),
  route: z.enum(['intramuscular', 'subcutaneous', 'oral', 'intranasal', 'intradermal']).optional(),
  administeredBy: z.string().max(200).optional(),
  facility: z.string().max(200).optional(),
  reactions: z.array(z.string().max(200)).max(10).optional(),
  notes: z.string().max(1000).optional(),
  certificateNumber: z.string().max(100).optional(),
});

export const vaccinationUpdateSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  vaccineName: z.string().min(1).max(200).optional(),
  vaccineType: z.enum(['routine', 'travel', 'seasonal', 'emergency', 'optional']).optional(),
  dateAdministered: z.string().datetime().optional(),
  doseNumber: z.number().int().min(1).optional(),
  totalDoses: z.number().int().min(1).optional(),
  manufacturer: z.string().max(200).optional(),
  batchNumber: z.string().max(100).optional(),
  expirationDate: z.string().datetime().optional(),
  site: z.string().max(100).optional(),
  route: z.enum(['intramuscular', 'subcutaneous', 'oral', 'intranasal', 'intradermal']).optional(),
  administeredBy: z.string().max(200).optional(),
  facility: z.string().max(200).optional(),
  reactions: z.array(z.string().max(200)).max(10).optional(),
  notes: z.string().max(1000).optional(),
  certificateNumber: z.string().max(100).optional(),
});

// --- Allergy ---

export const allergyCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  allergenName: z.string().min(1, 'Allergen name is required').max(200),
  allergenType: z.enum(['food', 'drug', 'environmental', 'insect', 'latex', 'other']),
  severity: z.enum(['mild', 'moderate', 'severe', 'life_threatening']),
  reactionType: z.array(z.string().max(200)).min(1, 'At least one reaction type is required'),
  onsetDate: z.string().datetime().optional(),
  diagnosedBy: z.string().max(200).optional(),
  status: z.enum(['active', 'resolved', 'inactive']).default('active'),
  crossReactivity: z.array(z.string().max(200)).max(10).optional(),
  emergencyMedication: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
});

export const allergyUpdateSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  allergenName: z.string().min(1).max(200).optional(),
  allergenType: z.enum(['food', 'drug', 'environmental', 'insect', 'latex', 'other']).optional(),
  severity: z.enum(['mild', 'moderate', 'severe', 'life_threatening']).optional(),
  reactionType: z.array(z.string().max(200)).min(1).optional(),
  onsetDate: z.string().datetime().optional(),
  diagnosedBy: z.string().max(200).optional(),
  status: z.enum(['active', 'resolved', 'inactive']).optional(),
  crossReactivity: z.array(z.string().max(200)).max(10).optional(),
  emergencyMedication: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
});

// --- History ---

export const historyCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  historyType: z.enum(['surgical', 'family', 'social', 'medical', 'psychiatric', 'obstetric']),
  condition: z.string().min(1, 'Condition is required').max(200),
  description: z.string().max(2000).optional(),
  diagnosisDate: z.string().datetime().optional(),
  resolutionDate: z.string().datetime().optional(),
  treatingPhysician: z.string().max(200).optional(),
  facility: z.string().max(200).optional(),
  outcome: z.enum(['resolved', 'ongoing', 'chronic', 'fatal', 'unknown']).optional(),
  relationToPatient: z.string().max(100).optional(),
  medications: z.array(z.string().max(200)).max(20).optional(),
  notes: z.string().max(2000).optional(),
});

// --- Medication ---

export const medicationCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  name: z.string().min(1, 'Medication name is required').max(200),
  genericName: z.string().max(200).optional(),
  dosage: z.string().min(1, 'Dosage is required').max(200),
  route: z.enum(['oral', 'intravenous', 'intramuscular', 'subcutaneous', 'topical', 'inhalation', 'rectal', 'other']),
  frequency: z.string().min(1, 'Frequency is required').max(200),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  prescribingDoctor: z.string().max(200).optional(),
  pharmacy: z.string().max(200).optional(),
  refillDate: z.string().datetime().optional(),
  remainingRefills: z.number().int().min(0).optional(),
  sideEffects: z.array(z.string().max(200)).max(20).optional(),
  interactions: z.array(z.string().max(200)).max(10).optional(),
  instructions: z.string().max(1000).optional(),
  status: z.enum(['active', 'completed', 'discontinued', 'on_hold']).default('active'),
  isOverTheCounter: z.boolean().default(false),
});

export const medicationUpdateSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  name: z.string().min(1).max(200).optional(),
  genericName: z.string().max(200).optional(),
  dosage: z.string().min(1).max(200).optional(),
  route: z.enum(['oral', 'intravenous', 'intramuscular', 'subcutaneous', 'topical', 'inhalation', 'rectal', 'other']).optional(),
  frequency: z.string().min(1).max(200).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  prescribingDoctor: z.string().max(200).optional(),
  pharmacy: z.string().max(200).optional(),
  refillDate: z.string().datetime().optional(),
  remainingRefills: z.number().int().min(0).optional(),
  sideEffects: z.array(z.string().max(200)).max(20).optional(),
  interactions: z.array(z.string().max(200)).max(10).optional(),
  instructions: z.string().max(1000).optional(),
  status: z.enum(['active', 'completed', 'discontinued', 'on_hold']).optional(),
  isOverTheCounter: z.boolean().optional(),
});

// --- Emergency Contact ---

export const emergencyContactCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  name: z.string().min(1, 'Contact name is required').max(200),
  relationship: z.enum(['parent', 'guardian', 'sibling', 'spouse', 'friend', 'other']),
  phone: z.string().min(1, 'Phone number is required').max(50),
  secondaryPhone: z.string().max(50).optional(),
  email: z.string().email().optional(),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }).optional(),
  isPrimary: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export const emergencyContactUpdateSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  name: z.string().min(1).max(200).optional(),
  relationship: z.enum(['parent', 'guardian', 'sibling', 'spouse', 'friend', 'other']).optional(),
  phone: z.string().min(1).max(50).optional(),
  secondaryPhone: z.string().max(50).optional(),
  email: z.string().email().optional(),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }).optional(),
  isPrimary: z.boolean().optional(),
  notes: z.string().max(500).optional(),
});

// --- Accident ---

export const accidentCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  incidentDate: z.string().datetime(),
  location: z.string().min(1, 'Location is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  incidentType: z.enum(['fall', 'collision', 'burn', 'poisoning', 'drowning', 'electrical', 'transport', 'sports', 'other']),
  severity: z.enum(['minor', 'moderate', 'severe', 'critical']),
  injuries: z.array(
    z.object({
      type: z.string().min(1).max(200),
      bodyPart: z.string().max(200),
      severity: z.enum(['minor', 'moderate', 'severe']),
      treatmentProvided: z.string().max(500).optional(),
    })
  ).min(1, 'At least one injury is required'),
  witnesses: z.array(
    z.object({
      name: z.string().min(1).max(200),
      phone: z.string().max(50).optional(),
      statement: z.string().max(1000).optional(),
    })
  ).max(10).optional(),
  reportedBy: z.string().uuid('Invalid user ID'),
  followUpRequired: z.boolean().default(false),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(
    z.object({
      name: z.string().min(1).max(200),
      url: z.string().url(),
      type: z.enum(['image', 'document', 'video']),
    })
  ).max(20).optional(),
  notes: z.string().max(2000).optional(),
});

export const accidentUpdateSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  incidentDate: z.string().datetime().optional(),
  location: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  incidentType: z.enum(['fall', 'collision', 'burn', 'poisoning', 'drowning', 'electrical', 'transport', 'sports', 'other']).optional(),
  severity: z.enum(['minor', 'moderate', 'severe', 'critical']).optional(),
  injuries: z.array(
    z.object({
      id: z.string().uuid().optional(),
      type: z.string().min(1).max(200),
      bodyPart: z.string().max(200),
      severity: z.enum(['minor', 'moderate', 'severe']),
      treatmentProvided: z.string().max(500).optional(),
    })
  ).min(1).optional(),
  witnesses: z.array(
    z.object({
      name: z.string().min(1).max(200),
      phone: z.string().max(50).optional(),
      statement: z.string().max(1000).optional(),
    })
  ).max(10).optional(),
  followUpRequired: z.boolean().optional(),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(
    z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(200),
      url: z.string().url(),
      type: z.enum(['image', 'document', 'video']),
    })
  ).max(20).optional(),
  notes: z.string().max(2000).optional(),
});

// --- Health Report ---

export const healthReportCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  reportType: z.enum(['annual', 'sports', 'pre_admission', 'follow_up', 'emergency', 'vaccination', 'custom']),
  reportDate: z.string().datetime(),
  generatedBy: z.string().uuid('Invalid user ID'),
  summary: z.string().min(1, 'Report summary is required').max(5000),
  findings: z.array(
    z.object({
      category: z.string().min(1).max(200),
      description: z.string().min(1).max(1000),
      status: z.enum(['normal', 'abnormal', 'critical']),
      recommendation: z.string().max(500).optional(),
    })
  ).min(1, 'At least one finding is required'),
  vitalSigns: z.object({
    bloodPressure: z.string().max(50).optional(),
    heartRate: z.number().int().min(0).optional(),
    temperature: z.number().optional(),
    respiratoryRate: z.number().int().min(0).optional(),
    oxygenSaturation: z.number().min(0).max(100).optional(),
  }).optional(),
  recommendations: z.array(z.string().max(500)).max(20).optional(),
  attachments: z.array(z.string().url()).max(10).optional(),
  isConfidential: z.boolean().default(false),
});

// --- Certificate ---

export const certificateCreateSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  certificateType: z.enum(['fitness', 'vaccination', 'medical', 'disability', 'allergy', 'insurance']),
  issueDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  issuedBy: z.string().min(1, 'Issuer name is required').max(200),
  institution: z.string().max(200).optional(),
  certificateNumber: z.string().max(100).optional(),
  purpose: z.string().max(500).optional(),
  conditions: z.array(z.string().max(200)).max(20).optional(),
  restrictions: z.array(z.string().max(200)).max(20).optional(),
  notes: z.string().max(2000).optional(),
  documentUrl: z.string().url().optional(),
});

export const certificateUpdateSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  certificateType: z.enum(['fitness', 'vaccination', 'medical', 'disability', 'allergy', 'insurance']).optional(),
  issueDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  issuedBy: z.string().min(1).max(200).optional(),
  institution: z.string().max(200).optional(),
  certificateNumber: z.string().max(100).optional(),
  purpose: z.string().max(500).optional(),
  conditions: z.array(z.string().max(200)).max(20).optional(),
  restrictions: z.array(z.string().max(200)).max(20).optional(),
  notes: z.string().max(2000).optional(),
  documentUrl: z.string().url().optional(),
  status: z.enum(['active', 'expired', 'revoked']).optional(),
});

// --- Dosage ---

export const dosageCreateSchema = z.object({
  medicationId: z.string().uuid('Invalid medication ID'),
  dosageForm: z.enum(['tablet', 'capsule', 'liquid', 'injection', 'patch', 'inhaler', 'suppository', 'cream', 'drops']),
  strength: z.string().min(1, 'Strength is required').max(100),
  strengthUnit: z.enum(['mg', 'mcg', 'g', 'ml', 'units', 'iu']),
  frequency: z.enum(['once_daily', 'twice_daily', 'three_times_daily', 'four_times_daily', 'every_4_hours', 'every_6_hours', 'every_8_hours', 'as_needed', 'weekly', 'monthly']),
  timing: z.enum(['morning', 'afternoon', 'evening', 'bedtime', 'with_meals', 'before_meals', 'after_meals', 'anytime']),
  duration: z.number().int().min(1).optional(),
  durationUnit: z.enum(['days', 'weeks', 'months', 'years']).optional(),
  maxDailyDose: z.number().min(0).optional(),
  instructions: z.string().max(1000).optional(),
  taperingSchedule: z.array(
    z.object({
      week: z.number().int().min(1),
      dosage: z.string().min(1).max(100),
    })
  ).max(20).optional(),
});

// --- Medical Search ---

export const medicalSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
  filters: z.object({
    recordType: z.array(z.enum(['active', 'archived', 'all'])).optional(),
    bloodType: z.array(z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])).optional(),
    hasAllergies: z.boolean().optional(),
    hasConditions: z.boolean().optional(),
    ageRange: z.object({
      min: z.number().int().min(0),
      max: z.number().int().min(0),
    }).optional(),
    dateRange: z.object({
      from: z.string().datetime(),
      to: z.string().datetime(),
    }).optional(),
  }).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// --- Medical Bulk Operations ---

export const medicalBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one medical record ID is required'),
  updates: z.object({
    isActive: z.boolean().optional(),
    notes: z.string().max(5000).optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
  }),
});

export const medicalBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one medical record ID is required'),
  force: z.boolean().default(false),
  reason: z.string().max(500).optional(),
});

// --- Medical Export/Import ---

export const medicalExportSchema = z.object({
  format: z.enum(['csv', 'json', 'xlsx', 'pdf']),
  ids: z.array(z.string().uuid()).optional(),
  includeHistory: z.boolean().default(true),
  includeAllergies: z.boolean().default(true),
  includeMedications: z.boolean().default(true),
  includeVaccinations: z.boolean().default(true),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }).optional(),
  anonymize: z.boolean().default(false),
});

export const medicalImportSchema = z.object({
  fileUrl: z.string().url('Invalid file URL'),
  format: z.enum(['csv', 'json', 'xlsx']),
  overwrite: z.boolean().default(false),
  validateOnly: z.boolean().default(false),
  mergeStrategy: z.enum(['replace', 'merge', 'skip_existing']).default('merge'),
});

// --- Medical Settings ---

export const medicalSettingsSchema = z.object({
  defaultCurrency: z.string().length(3),
  enableVaccinationTracking: z.boolean(),
  enableAllergyAlerts: z.boolean(),
  enableMedicationTracking: z.boolean(),
  enableAccidentReporting: z.boolean(),
  requireInsuranceInfo: z.boolean(),
  autoGenerateCertificates: z.boolean(),
  certificateValidityDays: z.number().int().min(1),
  retentionPeriodYears: z.number().int().min(1),
  allowPatientPortalAccess: z.boolean(),
  enableTelemedicine: z.boolean(),
  requireConsentForDataSharing: z.boolean(),
  dataEncryptionEnabled: z.boolean().default(true),
  auditLogRetentionDays: z.number().int().min(30),
});

// --- Medical Accessibility ---

export const medicalAccessibilitySchema = z.object({
  highContrast: z.boolean().default(false),
  largeText: z.boolean().default(false),
  screenReaderOptimized: z.boolean().default(false),
  keyboardNavigation: z.boolean().default(true),
  altTextRequired: z.boolean().default(true),
  colorBlindFriendly: z.boolean().default(false),
  simplifiedView: z.boolean().default(false),
  audioDescriptions: z.boolean().default(false),
  dyslexiaFriendly: z.boolean().default(false),
  motionReduction: z.boolean().default(false),
  voiceInput: z.boolean().default(false),
  textToSpeech: z.boolean().default(false),
});

// --- Medical Localization ---

export const medicalLocalizationSchema = z.object({
  defaultLanguage: z.string().min(2).max(5),
  supportedLanguages: z.array(z.string().min(2).max(5)).min(1),
  translations: z.array(
    z.object({
      language: z.string().min(2).max(5),
      recordId: z.string().uuid(),
      conditions: z.array(z.string().max(200)).optional(),
      medications: z.array(z.string().max(200)).optional(),
      instructions: z.string().max(2000).optional(),
      notes: z.string().max(2000).optional(),
    })
  ).max(50).optional(),
  autoTranslate: z.boolean().default(false),
  fallbackLanguage: z.string().min(2).max(5).optional(),
  useMetricSystem: z.boolean().default(true),
});

// --- Medical Metadata ---

export const medicalMetadataSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  keywords: z.array(z.string().max(100)).max(20).optional(),
  author: z.string().max(200).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  version: z.string().max(50).optional(),
  classification: z.enum(['public', 'internal', 'confidential', 'restricted']).default('confidential'),
  customFields: z.array(
    z.object({
      key: z.string().min(1).max(100),
      value: z.string().max(500),
      type: z.enum(['text', 'number', 'boolean', 'date']),
    })
  ).max(20).optional(),
});

// --- Medical Pricing ---

export const medicalPricingSchema = z.object({
  medicalRecordId: z.string().uuid().optional(),
  consultationFee: z.number().min(0),
  currency: z.string().length(3),
  insuranceCoverage: z.number().min(0).max(100).optional(),
  outOfPocketMax: z.number().min(0).optional(),
  copayAmount: z.number().min(0).optional(),
  deductible: z.number().min(0).optional(),
  labTestFees: z.array(
    z.object({
      testName: z.string().min(1).max(200),
      cost: z.number().min(0),
    })
  ).max(50).optional(),
  procedureFees: z.array(
    z.object({
      procedureName: z.string().min(1).max(200),
      cost: z.number().min(0),
    })
  ).max(50).optional(),
  taxRate: z.number().min(0).max(100).optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  paymentPlans: z.array(
    z.object({
      planName: z.string().min(1).max(200),
      monthlyPayment: z.number().min(0),
      durationMonths: z.number().int().min(1),
    })
  ).max(5).optional(),
});

// --- Medical Bundle ---

export const medicalBundleSchema = z.object({
  name: z.string().min(1, 'Bundle name is required').max(200),
  description: z.string().max(1000).optional(),
  services: z.array(z.string().uuid()).min(2, 'At least 2 services are required'),
  bundlePrice: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  maxUses: z.number().int().min(1).optional(),
  isActive: z.boolean().default(true),
  applicableFor: z.array(z.enum(['student', 'staff', 'visitor'])).min(1),
});

// --- Medical Subscription ---

export const medicalSubscriptionSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  coverageType: z.enum(['basic', 'standard', 'premium', 'comprehensive']),
  price: z.number().min(0),
  currency: z.string().length(3),
  billingFrequency: z.enum(['monthly', 'quarterly', 'annual']),
  maxVisits: z.number().int().min(1).optional(),
  maxConsultations: z.number().int().min(1).optional(),
  includesEmergency: z.boolean().default(false),
  includesLabTests: z.boolean().default(false),
  includesVaccinations: z.boolean().default(false),
  includesDental: z.boolean().default(false),
  includesVision: z.boolean().default(false),
  networkCoverage: z.array(z.string().max(200)).max(20).optional(),
  waitingPeriodDays: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
});

// --- Medical Version ---

export const medicalVersionSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  versionNumber: z.string().max(50),
  changeDescription: z.string().max(500),
  snapshot: z.record(z.unknown()),
  createdBy: z.string().uuid('Invalid user ID'),
  isPublished: z.boolean().default(false),
  changeType: z.enum(['update', 'correction', 'addition', 'removal']),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

// --- Medical Archive ---

export const medicalArchiveSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  reason: z.string().max(500).optional(),
  archiveUntil: z.string().datetime().optional(),
  preserveForCompliance: z.boolean().default(true),
  notifyStakeholders: z.boolean().default(false),
  accessRestriction: z.enum(['none', 'admin_only', 'medical_staff', 'restricted']).default('admin_only'),
});

// --- Medical Restore ---

export const medicalRestoreSchema = z.object({
  medicalRecordId: z.string().uuid('Invalid medical record ID'),
  restoreToStatus: z.enum(['active', 'archived']).default('active'),
  includeVersionHistory: z.boolean().default(true),
  notifyStakeholders: z.boolean().default(false),
  accessRestriction: z.enum(['none', 'admin_only', 'medical_staff', 'restricted']).default('none'),
});

// --- Medical Report ---

export const medicalReportSchema = z.object({
  reportType: z.enum(['patient_summary', 'visit_history', 'medication_list', 'vaccination_record', 'allergy_report', 'incident_report', 'comprehensive']),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  includeSections: z.array(z.enum([
    'demographics',
    'vitalSigns',
    'conditions',
    'medications',
    'allergies',
    'vaccinations',
    'visits',
    'treatments',
    'labResults',
    'imaging',
    'certificates',
    'emergencyContacts',
  ])).min(1, 'At least one section is required'),
  format: z.enum(['pdf', 'html', 'json']).default('pdf'),
  anonymize: z.boolean().default(false),
  patientId: z.string().uuid().optional(),
});

// --- Medical Analytics ---

export const medicalAnalyticsSchema = z.object({
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    'visitFrequency',
    'commonConditions',
    'medicationUsage',
    'vaccinationRates',
    'allergyPrevalence',
    'incidentTrends',
    'treatmentOutcomes',
    'costAnalysis',
    'demographicBreakdown',
    'referralPatterns',
  ])).min(1, 'At least one metric is required'),
  groupBy: z.enum(['day', 'week', 'month', 'quarter', 'year']).optional(),
  filters: z.object({
    ageRange: z.object({
      min: z.number().int().min(0),
      max: z.number().int().min(0),
    }).optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    conditions: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
  }).optional(),
  outputFormat: z.enum(['json', 'csv', 'xlsx', 'pdf']).default('json'),
});

// ============================================================================
// BOARDING SCHEMAS (40)
// ============================================================================

// --- Building ---

export const buildingCreateSchema = z.object({
  name: z.string().min(1, 'Building name is required').max(200),
  code: z.string().min(1, 'Building code is required').max(50),
  description: z.string().max(1000).optional(),
  type: z.enum(['residential', 'academic', 'administrative', 'recreational', 'dining', 'medical', 'mixed']),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }),
  floors: z.number().int().min(1).max(100),
  totalRooms: z.number().int().min(1),
  totalCapacity: z.number().int().min(1),
  yearBuilt: z.number().int().min(1800).max(2100).optional(),
  lastRenovated: z.string().datetime().optional(),
  facilities: z.array(z.enum([
    'elevator', 'escalator', 'fire_escape', 'generator', 'water_supply',
    'air_conditioning', 'heating', 'internet', 'cctv', 'security_system',
    'laundry', 'kitchen', 'dining_hall', 'recreation_room', 'study_room',
    'library', 'gym', 'swimming_pool', 'parking', 'garden',
  ])).max(20).optional(),
  status: z.enum(['active', 'maintenance', 'closed', 'renovation']).default('active'),
  managerId: z.string().uuid().optional(),
  contactPhone: z.string().max(50).optional(),
  contactEmail: z.string().email().optional(),
  imageUrl: z.string().url().optional(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }).optional(),
});

export const buildingUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  code: z.string().min(1).max(50).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['residential', 'academic', 'administrative', 'recreational', 'dining', 'medical', 'mixed']).optional(),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }).optional(),
  floors: z.number().int().min(1).max(100).optional(),
  totalRooms: z.number().int().min(1).optional(),
  totalCapacity: z.number().int().min(1).optional(),
  yearBuilt: z.number().int().min(1800).max(2100).optional(),
  lastRenovated: z.string().datetime().optional(),
  facilities: z.array(z.enum([
    'elevator', 'escalator', 'fire_escape', 'generator', 'water_supply',
    'air_conditioning', 'heating', 'internet', 'cctv', 'security_system',
    'laundry', 'kitchen', 'dining_hall', 'recreation_room', 'study_room',
    'library', 'gym', 'swimming_pool', 'parking', 'garden',
  ])).max(20).optional(),
  status: z.enum(['active', 'maintenance', 'closed', 'renovation']).optional(),
  managerId: z.string().uuid().optional(),
  contactPhone: z.string().max(50).optional(),
  contactEmail: z.string().email().optional(),
  imageUrl: z.string().url().optional(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }).optional(),
});

export const buildingQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'createdAt', 'status', 'floors', 'totalCapacity']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  type: z.enum(['residential', 'academic', 'administrative', 'recreational', 'dining', 'medical', 'mixed']).optional(),
  status: z.enum(['active', 'maintenance', 'closed', 'renovation']).optional(),
  search: z.string().max(200).optional(),
});

export const buildingFilterSchema = z.object({
  type: z.array(z.enum(['residential', 'academic', 'administrative', 'recreational', 'dining', 'medical', 'mixed'])).optional(),
  status: z.array(z.enum(['active', 'maintenance', 'closed', 'renovation'])).optional(),
  capacityRange: z.object({
    min: z.number().int().min(1),
    max: z.number().int().min(1),
  }).optional(),
  floorRange: z.object({
    min: z.number().int().min(1),
    max: z.number().int().min(1),
  }).optional(),
  facilities: z.array(z.enum([
    'elevator', 'escalator', 'fire_escape', 'generator', 'water_supply',
    'air_conditioning', 'heating', 'internet', 'cctv', 'security_system',
    'laundry', 'kitchen', 'dining_hall', 'recreation_room', 'study_room',
    'library', 'gym', 'swimming_pool', 'parking', 'garden',
  ])).optional(),
  hasAvailableRooms: z.boolean().optional(),
  yearBuiltRange: z.object({
    min: z.number().int().min(1800).max(2100),
    max: z.number().int().min(1800).max(2100),
  }).optional(),
});

// --- Room ---

export const roomCreateSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  roomNumber: z.string().min(1, 'Room number is required').max(50),
  floor: z.number().int().min(0),
  roomType: z.enum(['single', 'double', 'triple', 'quad', 'dormitory', 'suite', 'apartment', 'office', 'classroom', 'laboratory']),
  capacity: z.number().int().min(1),
  currentOccupancy: z.number().int().min(0).default(0),
 面积: z.number().min(0).optional(),
  areaUnit: z.enum(['sqm', 'sqft']).optional(),
  amenities: z.array(z.enum([
    'bed', 'desk', 'chair', 'wardrobe', 'air_conditioning', 'heating',
    'private_bathroom', 'shared_bathroom', 'balcony', 'kitchenette',
    'wifi', 'television', 'refrigerator', 'microwave', 'safe',
  ])).max(15).optional(),
  status: z.enum(['available', 'occupied', 'maintenance', 'reserved', 'cleaning']).default('available'),
  monthlyRate: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  notes: z.string().max(1000).optional(),
});

export const roomUpdateSchema = z.object({
  buildingId: z.string().uuid().optional(),
  roomNumber: z.string().min(1).max(50).optional(),
  floor: z.number().int().min(0).optional(),
  roomType: z.enum(['single', 'double', 'triple', 'quad', 'dormitory', 'suite', 'apartment', 'office', 'classroom', 'laboratory']).optional(),
  capacity: z.number().int().min(1).optional(),
  currentOccupancy: z.number().int().min(0).optional(),
  area: z.number().min(0).optional(),
  areaUnit: z.enum(['sqm', 'sqft']).optional(),
  amenities: z.array(z.enum([
    'bed', 'desk', 'chair', 'wardrobe', 'air_conditioning', 'heating',
    'private_bathroom', 'shared_bathroom', 'balcony', 'kitchenette',
    'wifi', 'television', 'refrigerator', 'microwave', 'safe',
  ])).max(15).optional(),
  status: z.enum(['available', 'occupied', 'maintenance', 'reserved', 'cleaning']).optional(),
  monthlyRate: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  notes: z.string().max(1000).optional(),
});

// --- Bed ---

export const bedCreateSchema = z.object({
  roomId: z.string().uuid('Invalid room ID'),
  bedNumber: z.string().min(1, 'Bed number is required').max(50),
  bedType: z.enum(['single', 'double', 'bunk', 'loft', 'murphy', 'rollaway', 'crib']),
  position: z.enum(['window', 'door', 'wall', 'center', 'bunk_top', 'bunk_bottom']).optional(),
  mattressSize: z.enum(['twin', 'twin_xl', 'full', 'queen', 'king']).optional(),
  status: z.enum(['available', 'occupied', 'maintenance', 'reserved']).default('available'),
  monthlyRate: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  notes: z.string().max(500).optional(),
});

export const bedUpdateSchema = z.object({
  roomId: z.string().uuid().optional(),
  bedNumber: z.string().min(1).max(50).optional(),
  bedType: z.enum(['single', 'double', 'bunk', 'loft', 'murphy', 'rollaway', 'crib']).optional(),
  position: z.enum(['window', 'door', 'wall', 'center', 'bunk_top', 'bunk_bottom']).optional(),
  mattressSize: z.enum(['twin', 'twin_xl', 'full', 'queen', 'king']).optional(),
  status: z.enum(['available', 'occupied', 'maintenance', 'reserved']).optional(),
  monthlyRate: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  notes: z.string().max(500).optional(),
});

// --- Occupancy ---

export const occupancyCreateSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  date: z.string().datetime(),
  totalCapacity: z.number().int().min(0),
  currentOccupancy: z.number().int().min(0),
  availableSpaces: z.number().int().min(0),
  occupancyRate: z.number().min(0).max(100),
  reservedSpaces: z.number().int().min(0).optional(),
  maintenanceSpaces: z.number().int().min(0).optional(),
  notes: z.string().max(500).optional(),
  recordedBy: z.string().uuid('Invalid user ID'),
});

// --- Assignment ---

export const assignmentCreateSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  buildingId: z.string().uuid('Invalid building ID'),
  roomId: z.string().uuid('Invalid room ID'),
  bedId: z.string().uuid().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  assignmentType: z.enum(['permanent', 'temporary', 'visiting', 'emergency']),
  monthlyRate: z.number().min(0),
  currency: z.string().length(3),
  paymentMethod: z.enum(['monthly', 'semester', 'yearly', 'upfront']),
  status: z.enum(['active', 'pending', 'completed', 'cancelled']).default('pending'),
  specialRequests: z.string().max(1000).optional(),
  approvedBy: z.string().uuid().optional(),
  notes: z.string().max(1000).optional(),
});

export const assignmentUpdateSchema = z.object({
  studentId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),
  bedId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  assignmentType: z.enum(['permanent', 'temporary', 'visiting', 'emergency']).optional(),
  monthlyRate: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  paymentMethod: z.enum(['monthly', 'semester', 'yearly', 'upfront']).optional(),
  status: z.enum(['active', 'pending', 'completed', 'cancelled']).optional(),
  specialRequests: z.string().max(1000).optional(),
  approvedBy: z.string().uuid().optional(),
  notes: z.string().max(1000).optional(),
});

// --- Attendance ---

export const attendanceCreateSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  date: z.string().datetime(),
  checkInTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  checkOutTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format').optional(),
  status: z.enum(['present', 'absent', 'late', 'excused', 'early_leave']),
  students: z.array(
    z.object({
      studentId: z.string().uuid('Invalid student ID'),
      status: z.enum(['present', 'absent', 'late', 'excused', 'early_leave']),
      checkInTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
      checkOutTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
      notes: z.string().max(200).optional(),
    })
  ).min(1, 'At least one student record is required'),
  recordedBy: z.string().uuid('Invalid user ID'),
  notes: z.string().max(1000).optional(),
});

export const attendanceUpdateSchema = z.object({
  buildingId: z.string().uuid().optional(),
  date: z.string().datetime().optional(),
  checkInTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  checkOutTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  status: z.enum(['present', 'absent', 'late', 'excused', 'early_leave']).optional(),
  students: z.array(
    z.object({
      studentId: z.string().uuid('Invalid student ID'),
      status: z.enum(['present', 'absent', 'late', 'excused', 'early_leave']),
      checkInTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
      checkOutTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
      notes: z.string().max(200).optional(),
    })
  ).min(1).optional(),
  recordedBy: z.string().uuid().optional(),
  notes: z.string().max(1000).optional(),
});

// --- Night Report ---

export const nightReportCreateSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  date: z.string().datetime(),
  shiftStart: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  shiftEnd: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  nightStaffId: z.string().uuid('Invalid staff ID'),
  totalStudentsPresent: z.number().int().min(0),
  totalStudentsAbsent: z.number().int().min(0),
  incidents: z.array(
    z.object({
      type: z.enum(['noise', 'curfew_violation', 'unauthorized_entry', 'medical', 'behavioral', 'maintenance', 'security', 'other']),
      description: z.string().min(1).max(1000),
      severity: z.enum(['low', 'medium', 'high', 'critical']),
      studentsInvolved: z.array(z.string().uuid()).max(10).optional(),
      actionTaken: z.string().max(500).optional(),
      timeOccurred: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    })
  ).max(50).optional(),
  maintenanceIssues: z.array(z.string().max(500)).max(20).optional(),
  visitorsLog: z.array(
    z.object({
      visitorName: z.string().min(1).max(200),
      purpose: z.string().max(200),
      timeIn: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      timeOut: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    })
  ).max(50).optional(),
  notes: z.string().max(2000).optional(),
});

export const nightReportUpdateSchema = z.object({
  buildingId: z.string().uuid().optional(),
  date: z.string().datetime().optional(),
  shiftStart: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  shiftEnd: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  nightStaffId: z.string().uuid().optional(),
  totalStudentsPresent: z.number().int().min(0).optional(),
  totalStudentsAbsent: z.number().int().min(0).optional(),
  incidents: z.array(
    z.object({
      id: z.string().uuid().optional(),
      type: z.enum(['noise', 'curfew_violation', 'unauthorized_entry', 'medical', 'behavioral', 'maintenance', 'security', 'other']),
      description: z.string().min(1).max(1000),
      severity: z.enum(['low', 'medium', 'high', 'critical']),
      studentsInvolved: z.array(z.string().uuid()).max(10).optional(),
      actionTaken: z.string().max(500).optional(),
      timeOccurred: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    })
  ).max(50).optional(),
  maintenanceIssues: z.array(z.string().max(500)).max(20).optional(),
  visitorsLog: z.array(
    z.object({
      id: z.string().uuid().optional(),
      visitorName: z.string().min(1).max(200),
      purpose: z.string().max(200),
      timeIn: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      timeOut: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    })
  ).max(50).optional(),
  notes: z.string().max(2000).optional(),
});

// --- Visitor ---

export const visitorCreateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email().optional(),
  phone: z.string().min(1, 'Phone number is required').max(50),
  idType: z.enum(['passport', 'national_id', 'drivers_license', 'student_id']),
  idNumber: z.string().min(1, 'ID number is required').max(100),
  relationship: z.enum(['parent', 'guardian', 'sibling', 'friend', 'relative', 'official', 'other']),
  photoUrl: z.string().url().optional(),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }).optional(),
  isBlacklisted: z.boolean().default(false),
  blacklistReason: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
  emergencyContact: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(1).max(50),
    relationship: z.string().max(100),
  }).optional(),
});

export const visitorUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).max(50).optional(),
  idType: z.enum(['passport', 'national_id', 'drivers_license', 'student_id']).optional(),
  idNumber: z.string().min(1).max(100).optional(),
  relationship: z.enum(['parent', 'guardian', 'sibling', 'friend', 'relative', 'official', 'other']).optional(),
  photoUrl: z.string().url().optional(),
  address: z.object({
    street: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(100),
    postalCode: z.string().max(20),
    country: z.string().max(100),
  }).optional(),
  isBlacklisted: z.boolean().optional(),
  blacklistReason: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
  emergencyContact: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(1).max(50),
    relationship: z.string().max(100),
  }).optional(),
});

// --- Discipline ---

export const disciplineCreateSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  buildingId: z.string().uuid('Invalid building ID'),
  incidentDate: z.string().datetime(),
  incidentType: z.enum([
    'noise_violation', 'curfew_violation', 'unauthorized_entry', 'vandalism',
    'theft', 'substance_abuse', 'violence', 'bullying', 'property_damage',
    'fire_safety_violation', 'electrical_violation', 'guest_policy_violation',
    'cleanliness_violation', 'other',
  ]),
  severity: z.enum(['minor', 'moderate', 'serious', 'critical']),
  description: z.string().min(1, 'Description is required').max(5000),
  location: z.string().max(200).optional(),
  witnesses: z.array(
    z.object({
      name: z.string().min(1).max(200),
      role: z.enum(['student', 'staff', 'visitor']),
      statement: z.string().max(1000).optional(),
    })
  ).max(10).optional(),
  reportedBy: z.string().uuid('Invalid user ID'),
  reportedTo: z.string().uuid('Invalid user ID').optional(),
  actionTaken: z.enum([
    'verbal_warning', 'written_warning', 'community_service',
    'parent_notification', 'suspension', 'expulsion', 'probation',
    'counseling', 'restorative_justice', 'other',
  ]),
  actionDetails: z.string().max(1000).optional(),
  followUpDate: z.string().datetime().optional(),
  followUpNotes: z.string().max(1000).optional(),
  attachments: z.array(
    z.object({
      name: z.string().min(1).max(200),
      url: z.string().url(),
      type: z.enum(['image', 'document', 'video', 'audio']),
    })
  ).max(20).optional(),
});

export const disciplineUpdateSchema = z.object({
  studentId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  incidentDate: z.string().datetime().optional(),
  incidentType: z.enum([
    'noise_violation', 'curfew_violation', 'unauthorized_entry', 'vandalism',
    'theft', 'substance_abuse', 'violence', 'bullying', 'property_damage',
    'fire_safety_violation', 'electrical_violation', 'guest_policy_violation',
    'cleanliness_violation', 'other',
  ]).optional(),
  severity: z.enum(['minor', 'moderate', 'serious', 'critical']).optional(),
  description: z.string().min(1).max(5000).optional(),
  location: z.string().max(200).optional(),
  witnesses: z.array(
    z.object({
      name: z.string().min(1).max(200),
      role: z.enum(['student', 'staff', 'visitor']),
      statement: z.string().max(1000).optional(),
    })
  ).max(10).optional(),
  reportedBy: z.string().uuid().optional(),
  reportedTo: z.string().uuid().optional(),
  actionTaken: z.enum([
    'verbal_warning', 'written_warning', 'community_service',
    'parent_notification', 'suspension', 'expulsion', 'probation',
    'counseling', 'restorative_justice', 'other',
  ]).optional(),
  actionDetails: z.string().max(1000).optional(),
  followUpDate: z.string().datetime().optional(),
  followUpNotes: z.string().max(1000).optional(),
  attachments: z.array(
    z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(200),
      url: z.string().url(),
      type: z.enum(['image', 'document', 'video', 'audio']),
    })
  ).max(20).optional(),
  status: z.enum(['open', 'investigating', 'resolved', 'appealed', 'closed']).optional(),
});

// --- Building Maintenance ---

export const buildingMaintenanceCreateSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  roomId: z.string().uuid().optional(),
  maintenanceType: z.enum(['planned', 'emergency', 'preventive', 'corrective', 'predictive']),
  category: z.enum([
    'plumbing', 'electrical', 'hvac', 'structural', 'roofing',
    'flooring', 'painting', 'landscaping', 'cleaning', 'pest_control',
    'security_system', 'fire_safety', 'elevator', 'generator', 'other',
  ]),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  reportedBy: z.string().uuid('Invalid user ID'),
  reportedDate: z.string().datetime(),
  scheduledDate: z.string().datetime().optional(),
  estimatedCost: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  assignedTo: z.array(z.string().uuid()).max(10).optional(),
  estimatedDuration: z.number().int().min(0).optional(),
  durationUnit: z.enum(['hours', 'days', 'weeks']).optional(),
  materials: z.array(
    z.object({
      name: z.string().min(1).max(200),
      quantity: z.number().min(0),
      unit: z.string().max(50),
      unitCost: z.number().min(0).optional(),
    })
  ).max(50).optional(),
  attachments: z.array(z.string().url()).max(10).optional(),
  notes: z.string().max(2000).optional(),
});

export const nightShiftCreateSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  staffId: z.string().uuid('Invalid staff ID'),
  shiftDate: z.string().datetime(),
  shiftStart: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  shiftEnd: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  duties: z.array(z.enum([
    'patrol', 'check_in', 'lock_doors', 'monitor_cameras',
    'respond_incidents', 'manage_visitors', 'report_maintenance',
    'emergency_response', 'student_welfare',
  ])).min(1, 'At least one duty is required'),
  backupStaffId: z.string().uuid().optional(),
  emergencyContact: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().min(1).max(50),
    availableFrom: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    availableUntil: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  }).optional(),
  specialInstructions: z.string().max(2000).optional(),
  status: z.enum(['scheduled', 'active', 'completed', 'cancelled']).default('scheduled'),
});

export const visitorLogCreateSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  visitorId: z.string().uuid('Invalid visitor ID'),
  studentId: z.string().uuid('Invalid student ID'),
  purpose: z.string().min(1, 'Purpose is required').max(500),
  checkInTime: z.string().datetime(),
  checkOutTime: z.string().datetime().optional(),
  escortedBy: z.string().uuid().optional(),
  areasAccessed: z.array(z.string().max(200)).max(20).optional(),
  idVerified: z.boolean().default(false),
  photoTaken: z.boolean().default(false),
  vehicleInfo: z.object({
    licensePlate: z.string().max(20).optional(),
    make: z.string().max(100).optional(),
    model: z.string().max(100).optional(),
    color: z.string().max(50).optional(),
  }).optional(),
  notes: z.string().max(1000).optional(),
  approvedBy: z.string().uuid('Invalid user ID'),
});

// --- Building Search ---

export const buildingSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
  filters: z.object({
    type: z.array(z.enum(['residential', 'academic', 'administrative', 'recreational', 'dining', 'medical', 'mixed'])).optional(),
    status: z.array(z.enum(['active', 'maintenance', 'closed', 'renovation'])).optional(),
    hasAvailableRooms: z.boolean().optional(),
    facilities: z.array(z.enum([
      'elevator', 'escalator', 'fire_escape', 'generator', 'water_supply',
      'air_conditioning', 'heating', 'internet', 'cctv', 'security_system',
      'laundry', 'kitchen', 'dining_hall', 'recreation_room', 'study_room',
      'library', 'gym', 'swimming_pool', 'parking', 'garden',
    ])).optional(),
    capacityRange: z.object({
      min: z.number().int().min(1),
      max: z.number().int().min(1),
    }).optional(),
  }).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// --- Building Bulk Operations ---

export const buildingBulkUpdateSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one building ID is required'),
  updates: z.object({
    status: z.enum(['active', 'maintenance', 'closed', 'renovation']).optional(),
    facilities: z.array(z.enum([
      'elevator', 'escalator', 'fire_escape', 'generator', 'water_supply',
      'air_conditioning', 'heating', 'internet', 'cctv', 'security_system',
      'laundry', 'kitchen', 'dining_hall', 'recreation_room', 'study_room',
      'library', 'gym', 'swimming_pool', 'parking', 'garden',
    ])).max(20).optional(),
    managerId: z.string().uuid().optional(),
    contactPhone: z.string().max(50).optional(),
    contactEmail: z.string().email().optional(),
  }),
});

export const buildingBulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one building ID is required'),
  force: z.boolean().default(false),
  reason: z.string().max(500).optional(),
});

// --- Building Export/Import ---

export const buildingExportSchema = z.object({
  format: z.enum(['csv', 'json', 'xlsx', 'pdf']),
  ids: z.array(z.string().uuid()).optional(),
  includeRooms: z.boolean().default(false),
  includeBeds: z.boolean().default(false),
  includeMaintenance: z.boolean().default(false),
  includeOccupancy: z.boolean().default(true),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }).optional(),
});

export const buildingImportSchema = z.object({
  fileUrl: z.string().url('Invalid file URL'),
  format: z.enum(['csv', 'json', 'xlsx']),
  overwrite: z.boolean().default(false),
  validateOnly: z.boolean().default(false),
  importType: z.enum(['buildings', 'rooms', 'beds', 'all']).default('all'),
});

// --- Building Settings ---

export const buildingSettingsSchema = z.object({
  defaultCurrency: z.string().length(3),
  enableOnlineBooking: z.boolean(),
  autoAssignRooms: z.boolean(),
  requireApprovalForAssignment: z.boolean(),
  maxGuestsPerRoom: z.number().int().min(1),
  guestCurfewTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  quietHoursStart: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  quietHoursEnd: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  maintenanceRequestTimeout: z.number().int().min(1),
  emergencyResponseTimeout: z.number().int().min(1),
  autoLockDoors: z.boolean(),
  keyCardEnabled: z.boolean(),
  cctvRetentionDays: z.number().int().min(1),
  incidentReportingEnabled: z.boolean(),
  parentNotificationEnabled: z.boolean(),
  allowStudentRoomSwap: z.boolean(),
});

// --- Building Accessibility ---

export const buildingAccessibilitySchema = z.object({
  wheelchairAccessible: z.boolean().default(false),
  accessibleRooms: z.number().int().min(0).optional(),
  rampAccess: z.boolean().default(false),
  elevatorAccess: z.boolean().default(false),
  accessibleBathrooms: z.boolean().default(false),
  brailleSignage: z.boolean().default(false),
  audioAnnouncements: z.boolean().default(false),
  tactileFloorIndicators: z.boolean().default(false),
  wideDoorways: z.boolean().default(false),
  grabBars: z.boolean().default(false),
  emergencyEvacuationPlan: z.boolean().default(true),
  hearingLoop: z.boolean().default(false),
  visualAlerts: z.boolean().default(false),
  accessibleParking: z.boolean().default(false),
  serviceAnimalPolicy: z.boolean().default(true),
});

// --- Building Localization ---

export const buildingLocalizationSchema = z.object({
  defaultLanguage: z.string().min(2).max(5),
  supportedLanguages: z.array(z.string().min(2).max(5)).min(1),
  translations: z.array(
    z.object({
      language: z.string().min(2).max(5),
      buildingId: z.string().uuid(),
      name: z.string().min(1).max(200),
      description: z.string().max(1000).optional(),
      rules: z.array(z.string().max(500)).max(20).optional(),
      signs: z.array(
        z.object({
          signId: z.string().uuid(),
          text: z.string().min(1).max(200),
          location: z.string().max(200),
        })
      ).max(50).optional(),
    })
  ).max(50).optional(),
  autoTranslate: z.boolean().default(false),
  fallbackLanguage: z.string().min(2).max(5).optional(),
  multilingualSignage: z.boolean().default(false),
});

// --- Building Metadata ---

export const buildingMetadataSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  keywords: z.array(z.string().max(100)).max(20).optional(),
  author: z.string().max(200).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  version: z.string().max(50).optional(),
  category: z.enum(['academic', 'residential', 'administrative', 'recreational', 'mixed']).optional(),
  customFields: z.array(
    z.object({
      key: z.string().min(1).max(100),
      value: z.string().max(500),
      type: z.enum(['text', 'number', 'boolean', 'date']),
    })
  ).max(20).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

// --- Building Pricing ---

export const buildingPricingSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  currency: z.string().length(3),
  roomPricing: z.array(
    z.object({
      roomType: z.enum(['single', 'double', 'triple', 'quad', 'dormitory', 'suite', 'apartment']),
      basePrice: z.number().min(0),
      peakSeasonPrice: z.number().min(0).optional(),
      offSeasonPrice: z.number().min(0).optional(),
      weekendPrice: z.number().min(0).optional(),
    })
  ).min(1, 'At least one room type pricing is required'),
  additionalFees: z.array(
    z.object({
      feeType: z.enum(['security_deposit', 'application', 'late_payment', 'cleaning', 'laundry', 'parking', 'internet', 'insurance']),
      amount: z.number().min(0),
      isRefundable: z.boolean().default(false),
      description: z.string().max(200).optional(),
    })
  ).max(10).optional(),
  discountPolicies: z.array(
    z.object({
      discountType: z.enum(['early_bird', 'loyalty', 'scholarship', 'group', 'sibling']),
      percentage: z.number().min(0).max(100),
      conditions: z.string().max(500).optional(),
      validFrom: z.string().datetime().optional(),
      validUntil: z.string().datetime().optional(),
    })
  ).max(10).optional(),
  paymentTerms: z.string().max(500).optional(),
  latePaymentPenalty: z.number().min(0).optional(),
  gracePeriodDays: z.number().int().min(0).optional(),
});

// --- Building Bundle ---

export const buildingBundleSchema = z.object({
  name: z.string().min(1, 'Bundle name is required').max(200),
  description: z.string().max(1000).optional(),
  buildingIds: z.array(z.string().uuid()).min(1, 'At least one building is required'),
  bundlePrice: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  includes: z.array(z.enum([
    'room', 'meals', 'laundry', 'internet', 'parking',
    'insurance', 'gym_access', 'study_room', 'transport',
  ])).min(1, 'At least one inclusion is required'),
  maxOccupants: z.number().int().min(1).optional(),
  isActive: z.boolean().default(true),
});

// --- Building Subscription ---

export const buildingSubscriptionSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  buildingId: z.string().uuid('Invalid building ID'),
  planType: z.enum(['monthly', 'semester', 'annual', 'custom']),
  price: z.number().min(0),
  currency: z.string().length(3),
  billingCycle: z.enum(['monthly', 'quarterly', 'annually']),
  includes: z.array(z.enum([
    'room', 'meals', 'laundry', 'internet', 'parking',
    'insurance', 'gym_access', 'study_room', 'transport',
  ])).min(1),
  cancellationPolicy: z.string().max(500).optional(),
  earlyTerminationFee: z.number().min(0).optional(),
  maxPauseDays: z.number().int().min(0).optional(),
  renewalReminderDays: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
});

// --- Building Version ---

export const buildingVersionSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  versionNumber: z.string().max(50),
  changeDescription: z.string().max(500),
  snapshot: z.record(z.unknown()),
  createdBy: z.string().uuid('Invalid user ID'),
  isPublished: z.boolean().default(false),
  changeType: z.enum(['update', 'renovation', 'policy_change', 'facility_addition', 'capacity_change']),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

// --- Building Archive ---

export const buildingArchiveSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  reason: z.string().max(500).optional(),
  archiveUntil: z.string().datetime().optional(),
  preserveForAnalytics: z.boolean().default(true),
  notifyTenants: z.boolean().default(false),
  transferStudents: z.boolean().default(false),
  transferDestination: z.string().uuid().optional(),
});

// --- Building Restore ---

export const buildingRestoreSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  restoreToStatus: z.enum(['active', 'maintenance']).default('active'),
  includeVersionHistory: z.boolean().default(true),
  notifyTenants: z.boolean().default(false),
  reassignStudents: z.boolean().default(false),
});

// --- Building Report ---

export const buildingReportSchema = z.object({
  reportType: z.enum(['occupancy', 'maintenance', 'financial', 'incident', 'comprehensive', 'compliance']),
  buildingId: z.string().uuid().optional(),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  includeMetrics: z.array(z.enum([
    'occupancyRate', 'revenue', 'maintenanceRequests', 'incidents',
    'visitorLogs', 'energyUsage', 'roomUtilization', 'studentSatisfaction',
    'complianceStatus', 'staffPerformance',
  ])).min(1, 'At least one metric is required'),
  format: z.enum(['pdf', 'csv', 'json', 'xlsx']).default('pdf'),
  groupBy: z.enum(['building', 'floor', 'roomType', 'month', 'week']).optional(),
  filters: z.object({
    roomTypes: z.array(z.enum(['single', 'double', 'triple', 'quad', 'dormitory', 'suite', 'apartment'])).optional(),
    statuses: z.array(z.enum(['active', 'maintenance', 'closed', 'renovation'])).optional(),
    priorityLevels: z.array(z.enum(['low', 'medium', 'high', 'critical'])).optional(),
  }).optional(),
});

// --- Building Analytics ---

export const buildingAnalyticsSchema = z.object({
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    'occupancyTrends', 'revenueAnalysis', 'maintenancePatterns',
    'incidentTrends', 'energyConsumption', 'roomUtilization',
    'studentSatisfaction', 'staffEfficiency', 'costOptimization',
    'forecasting',
  ])).min(1, 'At least one metric is required'),
  buildingIds: z.array(z.string().uuid()).optional(),
  groupBy: z.enum(['day', 'week', 'month', 'quarter', 'year']).optional(),
  filters: z.object({
    roomTypes: z.array(z.enum(['single', 'double', 'triple', 'quad', 'dormitory', 'suite', 'apartment'])).optional(),
    buildingTypes: z.array(z.enum(['residential', 'academic', 'administrative', 'recreational', 'dining', 'medical', 'mixed'])).optional(),
    occupancyRange: z.object({
      min: z.number().min(0).max(100),
      max: z.number().min(0).max(100),
    }).optional(),
  }).optional(),
  outputFormat: z.enum(['json', 'csv', 'xlsx', 'pdf']).default('json'),
});

// --- Building Bookmark ---

export const buildingBookmarkSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  buildingId: z.string().uuid('Invalid building ID'),
  roomId: z.string().uuid().optional(),
  label: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  tags: z.array(z.string().max(50)).max(10).optional(),
  isShared: z.boolean().default(false),
  sharedWith: z.array(z.string().uuid()).max(20).optional(),
});
