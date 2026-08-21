-- ============================================================
-- Smart Campus Module - Complete Migration
-- ============================================================

-- ============================================================
-- TRANSPORT
-- ============================================================

CREATE TABLE IF NOT EXISTS sc_buses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    plate_number VARCHAR(20) NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 0,
    model VARCHAR(100),
    year INTEGER,
    color VARCHAR(30),
    fuel_type VARCHAR(30) DEFAULT 'diesel',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    photo_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_bus_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    zone VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    direction VARCHAR(30) DEFAULT 'morning',
    estimated_duration_min INTEGER,
    distance_km DECIMAL(8,2),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES sc_buses(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES sc_routes(id) ON DELETE CASCADE,
    driver_id UUID,
    departure_time TIMESTAMPTZ,
    arrival_time TIMESTAMPTZ,
    actual_departure TIMESTAMPTZ,
    actual_arrival TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    license_number VARCHAR(50),
    license_expiry DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_assistants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES sc_buses(id) ON DELETE CASCADE,
    route_id UUID REFERENCES sc_routes(id) ON DELETE SET NULL,
    driver_id UUID REFERENCES sc_drivers(id) ON DELETE SET NULL,
    assistant_id UUID REFERENCES sc_assistants(id) ON DELETE SET NULL,
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_to DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_gps_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES sc_buses(id) ON DELETE CASCADE,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    speed DECIMAL(6,2),
    heading DECIMAL(5,2),
    altitude DECIMAL(7,2),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_bus_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    trip_id UUID NOT NULL REFERENCES sc_trips(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    pickup_stop_id UUID REFERENCES sc_bus_stops(id) ON DELETE SET NULL,
    dropoff_stop_id UUID REFERENCES sc_bus_stops(id) ON DELETE SET NULL,
    boarded_at TIMESTAMPTZ,
    dropped_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'boarded',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_fuel_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES sc_buses(id) ON DELETE CASCADE,
    fill_date DATE NOT NULL DEFAULT CURRENT_DATE,
    liters DECIMAL(8,2) NOT NULL,
    cost DECIMAL(12,2),
    fuel_type VARCHAR(30) DEFAULT 'diesel',
    mileage_km DECIMAL(10,2),
    station VARCHAR(150),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_bus_maintenance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES sc_buses(id) ON DELETE CASCADE,
    maintenance_type VARCHAR(50) NOT NULL,
    description TEXT,
    scheduled_date DATE,
    completed_date DATE,
    cost DECIMAL(12,2),
    provider VARCHAR(150),
    mileage_at_service DECIMAL(10,2),
    next_service_km DECIMAL(10,2),
    status VARCHAR(30) NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_bus_insurance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES sc_buses(id) ON DELETE CASCADE,
    provider VARCHAR(150) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    premium DECIMAL(12,2),
    coverage_type VARCHAR(50),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    document_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_bus_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    bus_id UUID REFERENCES sc_buses(id) ON DELETE SET NULL,
    trip_id UUID REFERENCES sc_trips(id) ON DELETE SET NULL,
    incident_type VARCHAR(50) NOT NULL,
    severity VARCHAR(30) DEFAULT 'minor',
    description TEXT,
    location TEXT,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    reported_by UUID,
    resolved BOOLEAN NOT NULL DEFAULT false,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_emergency_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(30) NOT NULL DEFAULT 'high',
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    recipient_roles TEXT[],
    sent_at TIMESTAMPTZ,
    acknowledged_by UUID[],
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- LIBRARY
-- ============================================================

CREATE TABLE IF NOT EXISTS sc_authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    biography TEXT,
    nationality VARCHAR(100),
    birth_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_publishers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    address TEXT,
    phone VARCHAR(30),
    email VARCHAR(200),
    website VARCHAR(300),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_book_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    parent_id UUID REFERENCES sc_book_categories(id) ON DELETE SET NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    isbn VARCHAR(20),
    author_id UUID REFERENCES sc_authors(id) ON DELETE SET NULL,
    publisher_id UUID REFERENCES sc_publishers(id) ON DELETE SET NULL,
    category_id UUID REFERENCES sc_book_categories(id) ON DELETE SET NULL,
    edition VARCHAR(50),
    language VARCHAR(50) DEFAULT 'fr',
    page_count INTEGER,
    description TEXT,
    cover_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_book_copies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES sc_books(id) ON DELETE CASCADE,
    barcode VARCHAR(50),
    condition_status VARCHAR(30) NOT NULL DEFAULT 'good',
    acquisition_date DATE,
    shelf_location VARCHAR(50),
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_book_loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    copy_id UUID NOT NULL REFERENCES sc_book_copies(id) ON DELETE CASCADE,
    borrower_id UUID NOT NULL,
    borrower_type VARCHAR(30) NOT NULL DEFAULT 'student',
    loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    renewed_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'on_loan',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_book_returns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    loan_id UUID NOT NULL REFERENCES sc_book_loans(id) ON DELETE CASCADE,
    return_date DATE NOT NULL DEFAULT CURRENT_DATE,
    condition_at_return VARCHAR(30) DEFAULT 'good',
    late_days INTEGER NOT NULL DEFAULT 0,
    fine_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    notes TEXT,
    received_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_book_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES sc_books(id) ON DELETE CASCADE,
    reserved_by UUID NOT NULL,
    reserved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expiry_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_late_fees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    loan_id UUID NOT NULL REFERENCES sc_book_loans(id) ON DELETE CASCADE,
    borrower_id UUID NOT NULL,
    days_late INTEGER NOT NULL,
    fee_per_day DECIMAL(8,2) NOT NULL DEFAULT 0.50,
    total_fee DECIMAL(10,2) NOT NULL,
    paid BOOLEAN NOT NULL DEFAULT false,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_ebooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    book_id UUID REFERENCES sc_books(id) ON DELETE SET NULL,
    title VARCHAR(300) NOT NULL,
    file_url TEXT NOT NULL,
    file_size_kb INTEGER,
    format VARCHAR(10) DEFAULT 'pdf',
    download_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_audiobooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    book_id UUID REFERENCES sc_books(id) ON DELETE SET NULL,
    title VARCHAR(300) NOT NULL,
    narrator VARCHAR(200),
    audio_url TEXT NOT NULL,
    duration_seconds INTEGER,
    file_size_kb INTEGER,
    format VARCHAR(10) DEFAULT 'mp3',
    download_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_rfid_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    tag_uid VARCHAR(50) NOT NULL,
    entity_type VARCHAR(30) NOT NULL,
    entity_id UUID NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    issued_date DATE NOT NULL DEFAULT CURRENT_DATE,
    last_scanned_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_library_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES sc_books(id) ON DELETE CASCADE,
    total_copies INTEGER NOT NULL DEFAULT 0,
    available_copies INTEGER NOT NULL DEFAULT 0,
    loaned_copies INTEGER NOT NULL DEFAULT 0,
    damaged_copies INTEGER NOT NULL DEFAULT 0,
    last_counted_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_book_acquisitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    book_id UUID REFERENCES sc_books(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(12,2),
    vendor VARCHAR(200),
    order_date DATE,
    received_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'requested',
    requested_by UUID,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_library_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    card_number VARCHAR(50) NOT NULL,
    holder_id UUID NOT NULL,
    holder_type VARCHAR(30) NOT NULL DEFAULT 'student',
    issued_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    max_loans INTEGER NOT NULL DEFAULT 5,
    active_loans INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- CANTEEN
-- ============================================================

CREATE TABLE IF NOT EXISTS sc_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    menu_date DATE NOT NULL,
    meal_type VARCHAR(30) NOT NULL DEFAULT 'lunch',
    description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    menu_id UUID NOT NULL REFERENCES sc_menus(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    meal_type VARCHAR(30) NOT NULL DEFAULT 'main',
    portion_size VARCHAR(50),
    calories DECIMAL(7,2),
    price DECIMAL(8,2) NOT NULL DEFAULT 0,
    is_vegetarian BOOLEAN NOT NULL DEFAULT false,
    is_vegan BOOLEAN NOT NULL DEFAULT false,
    is_halal BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_nutrition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    meal_id UUID NOT NULL REFERENCES sc_meals(id) ON DELETE CASCADE,
    protein_g DECIMAL(6,2),
    carbs_g DECIMAL(6,2),
    fat_g DECIMAL(6,2),
    fiber_g DECIMAL(6,2),
    vitamin_a_mcg DECIMAL(7,2),
    vitamin_c_mg DECIMAL(7,2),
    calcium_mg DECIMAL(7,2),
    iron_mg DECIMAL(7,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_allergens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    severity_level VARCHAR(30) NOT NULL DEFAULT 'standard',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_food_stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    item_name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
    unit VARCHAR(30) NOT NULL DEFAULT 'kg',
    min_quantity DECIMAL(10,2),
    max_quantity DECIMAL(10,2),
    expiry_date DATE,
    supplier_id UUID,
    unit_cost DECIMAL(10,2),
    storage_location VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'in_stock',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_food_suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    contact_name VARCHAR(150),
    phone VARCHAR(30),
    email VARCHAR(200),
    address TEXT,
    specialties TEXT,
    rating DECIMAL(3,2),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_meal_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    menu_id UUID NOT NULL REFERENCES sc_menus(id) ON DELETE CASCADE,
    meal_id UUID NOT NULL REFERENCES sc_meals(id) ON DELETE CASCADE,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    quantity INTEGER NOT NULL DEFAULT 1,
    special_requests TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'ordered',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_meal_consumption (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    meal_id UUID NOT NULL REFERENCES sc_meals(id) ON DELETE CASCADE,
    consumed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    portion_consumed VARCHAR(30) DEFAULT 'full',
    rating INTEGER,
    feedback TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_meal_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    meals_per_week INTEGER NOT NULL DEFAULT 5,
    monthly_price DECIMAL(10,2),
    start_date DATE NOT NULL,
    end_date DATE,
    auto_renew BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_meal_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    subscription_id UUID REFERENCES sc_meal_subscriptions(id) ON DELETE SET NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL DEFAULT 'cash',
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reference VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'completed',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_kitchen_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'cook',
    phone VARCHAR(30),
    hire_date DATE,
    certification VARCHAR(150),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_cantine_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_meals_served INTEGER NOT NULL DEFAULT 0,
    total_revenue DECIMAL(12,2) NOT NULL DEFAULT 0,
    waste_kg DECIMAL(8,2) NOT NULL DEFAULT 0,
    stock_remaining_value DECIMAL(12,2),
    incidents_count INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    generated_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INFIRMERIE (Medical)
-- ============================================================

CREATE TABLE IF NOT EXISTS sc_medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    blood_type VARCHAR(5),
    height_cm DECIMAL(5,1),
    weight_kg DECIMAL(5,1),
    vision_left VARCHAR(20),
    vision_right VARCHAR(20),
    doctor_name VARCHAR(150),
    doctor_phone VARCHAR(30),
    insurance_provider VARCHAR(150),
    insurance_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_medical_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    visit_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    reason VARCHAR(200) NOT NULL,
    symptoms TEXT,
    temperature DECIMAL(4,1),
    blood_pressure VARCHAR(10),
    weight_kg DECIMAL(5,1),
    nurse_notes TEXT,
    treatment_given TEXT,
    sent_home BOOLEAN NOT NULL DEFAULT false,
    parent_notified BOOLEAN NOT NULL DEFAULT false,
    follow_up_needed BOOLEAN NOT NULL DEFAULT false,
    follow_up_date DATE,
    created_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    visit_id UUID NOT NULL REFERENCES sc_medical_visits(id) ON DELETE CASCADE,
    treatment_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    medication_given VARCHAR(200),
    dosage VARCHAR(100),
    administered_by UUID,
    administered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_vaccinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    vaccine_name VARCHAR(150) NOT NULL,
    dose_number INTEGER NOT NULL DEFAULT 1,
    administered_date DATE NOT NULL,
    administered_by VARCHAR(150),
    lot_number VARCHAR(50),
    next_dose_date DATE,
    certificate_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'completed',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_medical_allergies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    allergen VARCHAR(200) NOT NULL,
    reaction_type VARCHAR(100),
    severity VARCHAR(30) NOT NULL DEFAULT 'moderate',
    diagnosed_date DATE,
    treatment_notes TEXT,
    emergency_medication VARCHAR(200),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_medical_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    condition_name VARCHAR(200) NOT NULL,
    diagnosis_date DATE,
    treating_physician VARCHAR(150),
    treatment TEXT,
    is_chronic BOOLEAN NOT NULL DEFAULT false,
    is_resolved BOOLEAN NOT NULL DEFAULT false,
    resolved_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    medication_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    reason VARCHAR(200),
    prescribing_doctor VARCHAR(150),
    start_date DATE NOT NULL,
    end_date DATE,
    time_of_day VARCHAR(50),
    requires_nurse_admin BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    contact_name VARCHAR(150) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    phone_primary VARCHAR(30) NOT NULL,
    phone_secondary VARCHAR(30),
    email VARCHAR(200),
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_accidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    accident_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200),
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    severity VARCHAR(30) NOT NULL DEFAULT 'minor',
    first_aid_given TEXT,
    hospital_visited BOOLEAN NOT NULL DEFAULT false,
    hospital_name VARCHAR(200),
    parent_notified_at TIMESTAMPTZ,
    reported_by UUID,
    witnesses TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'reported',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_health_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    report_type VARCHAR(100) NOT NULL,
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    period_start DATE,
    period_end DATE,
    total_visits INTEGER NOT NULL DEFAULT 0,
    total_accidents INTEGER NOT NULL DEFAULT 0,
    common_conditions TEXT,
    vaccinations_status TEXT,
    recommendations TEXT,
    generated_by UUID,
    document_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- BUILDINGS & BOARDING
-- ============================================================

CREATE TABLE IF NOT EXISTS sc_buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20),
    building_type VARCHAR(50) NOT NULL DEFAULT 'academic',
    address TEXT,
    floors_count INTEGER NOT NULL DEFAULT 1,
    year_built INTEGER,
    total_area_sqm DECIMAL(10,2),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    building_id UUID NOT NULL REFERENCES sc_buildings(id) ON DELETE CASCADE,
    room_number VARCHAR(20) NOT NULL,
    floor_number INTEGER NOT NULL DEFAULT 0,
    room_type VARCHAR(50) NOT NULL DEFAULT 'classroom',
    capacity INTEGER NOT NULL DEFAULT 0,
    area_sqm DECIMAL(8,2),
    has_ac BOOLEAN NOT NULL DEFAULT false,
    has_projector BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES sc_rooms(id) ON DELETE CASCADE,
    bed_number VARCHAR(20) NOT NULL,
    bed_type VARCHAR(30) NOT NULL DEFAULT 'single',
    position VARCHAR(50),
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    assigned_student_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_occupancy (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    building_id UUID NOT NULL REFERENCES sc_buildings(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES sc_rooms(id) ON DELETE CASCADE,
    capacity INTEGER NOT NULL,
    occupied INTEGER NOT NULL DEFAULT 0,
    occupancy_date DATE NOT NULL DEFAULT CURRENT_DATE,
    occupancy_rate DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE WHEN capacity > 0 THEN (occupied::DECIMAL / capacity * 100) ELSE 0 END
    ) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_room_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES sc_rooms(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    bed_id UUID REFERENCES sc_beds(id) ON DELETE SET NULL,
    assignment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_boarding_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    bed_id UUID REFERENCES sc_beds(id) ON DELETE SET NULL,
    attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in_time TIMESTAMPTZ,
    check_out_time TIMESTAMPTZ,
    is_present BOOLEAN NOT NULL DEFAULT true,
    reason_absence TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_night_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    building_id UUID NOT NULL REFERENCES sc_buildings(id) ON DELETE CASCADE,
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_students INTEGER NOT NULL DEFAULT 0,
    present_count INTEGER NOT NULL DEFAULT 0,
    absent_count INTEGER NOT NULL DEFAULT 0,
    sick_count INTEGER NOT NULL DEFAULT 0,
    incidents TEXT,
    notes TEXT,
    reported_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_disciplines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    incident_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(30) NOT NULL DEFAULT 'minor',
    action_taken TEXT,
    sanction VARCHAR(200),
    incident_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reported_by UUID,
    parent_notified BOOLEAN NOT NULL DEFAULT false,
    follow_up_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- VISITORS
-- ============================================================

CREATE TABLE IF NOT EXISTS sc_visitor_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    visitor_name VARCHAR(200) NOT NULL,
    id_type VARCHAR(30) NOT NULL DEFAULT 'national_id',
    id_number VARCHAR(50),
    phone VARCHAR(30),
    email VARCHAR(200),
    photo_url TEXT,
    purpose TEXT NOT NULL,
    host_student_id UUID,
    host_staff_id UUID,
    expected_arrival TIMESTAMPTZ,
    actual_arrival TIMESTAMPTZ,
    actual_departure TIMESTAMPTZ,
    vehicle_plate VARCHAR(20),
    status VARCHAR(30) NOT NULL DEFAULT 'registered',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_visitor_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    registration_id UUID NOT NULL REFERENCES sc_visitor_registrations(id) ON DELETE CASCADE,
    badge_number VARCHAR(50) NOT NULL,
    badge_type VARCHAR(30) NOT NULL DEFAULT 'day_pass',
    issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    returned_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_visitor_qrs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    registration_id UUID NOT NULL REFERENCES sc_visitor_registrations(id) ON DELETE CASCADE,
    qr_code TEXT NOT NULL,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    scanned_at TIMESTAMPTZ,
    scan_location VARCHAR(100),
    is_valid BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_visitor_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    invited_by UUID NOT NULL,
    visitor_name VARCHAR(200) NOT NULL,
    visitor_phone VARCHAR(30),
    visitor_email VARCHAR(200),
    visit_date DATE NOT NULL,
    visit_time TIME,
    purpose TEXT NOT NULL,
    access_areas TEXT[],
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_visitor_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    registration_id UUID NOT NULL REFERENCES sc_visitor_registrations(id) ON DELETE CASCADE,
    approved_by UUID NOT NULL,
    approval_status VARCHAR(30) NOT NULL DEFAULT 'approved',
    comments TEXT,
    approved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_identity_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    registration_id UUID NOT NULL REFERENCES sc_visitor_registrations(id) ON DELETE CASCADE,
    verification_method VARCHAR(50) NOT NULL DEFAULT 'id_check',
    verified BOOLEAN NOT NULL DEFAULT false,
    verified_by UUID,
    verified_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_visitor_blacklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    person_name VARCHAR(200) NOT NULL,
    id_number VARCHAR(50),
    reason TEXT NOT NULL,
    added_by UUID NOT NULL,
    added_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    is_permanent BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ASSETS
-- ============================================================

CREATE TABLE IF NOT EXISTS sc_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_tag VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    sub_category VARCHAR(100),
    purchase_date DATE,
    purchase_price DECIMAL(12,2),
    current_value DECIMAL(12,2),
    location VARCHAR(200),
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    room_id UUID REFERENCES sc_rooms(id) ON DELETE SET NULL,
    condition_status VARCHAR(30) NOT NULL DEFAULT 'good',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES sc_assets(id) ON DELETE SET NULL,
    equipment_type VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    specifications JSONB,
    installation_date DATE,
    last_service_date DATE,
    next_service_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'operational',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_furniture (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES sc_assets(id) ON DELETE SET NULL,
    furniture_type VARCHAR(100) NOT NULL,
    material VARCHAR(50),
    dimensions VARCHAR(50),
    color VARCHAR(30),
    quantity INTEGER NOT NULL DEFAULT 1,
    assigned_to UUID,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_it_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES sc_assets(id) ON DELETE SET NULL,
    device_type VARCHAR(50) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    mac_address VARCHAR(17),
    ip_address VARCHAR(45),
    operating_system VARCHAR(50),
    software_licenses TEXT,
    assigned_user_id UUID,
    purchase_date DATE,
    warranty_expiry DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_asset_warranties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES sc_assets(id) ON DELETE CASCADE,
    provider VARCHAR(200) NOT NULL,
    warranty_type VARCHAR(50) NOT NULL DEFAULT 'standard',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    coverage_description TEXT,
    document_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_asset_depreciations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES sc_assets(id) ON DELETE CASCADE,
    method VARCHAR(50) NOT NULL DEFAULT 'straight_line',
    useful_life_years INTEGER NOT NULL DEFAULT 5,
    annual_rate DECIMAL(5,2),
    original_value DECIMAL(12,2) NOT NULL,
    current_value DECIMAL(12,2) NOT NULL,
    depreciation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_asset_transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES sc_assets(id) ON DELETE CASCADE,
    from_building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    from_room_id UUID REFERENCES sc_rooms(id) ON DELETE SET NULL,
    to_building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    to_room_id UUID REFERENCES sc_rooms(id) ON DELETE SET NULL,
    transfer_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reason TEXT,
    approved_by UUID,
    transferred_by UUID,
    status VARCHAR(30) NOT NULL DEFAULT 'completed',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_maintenance_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES sc_assets(id) ON DELETE SET NULL,
    room_id UUID REFERENCES sc_rooms(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(30) NOT NULL DEFAULT 'medium',
    category VARCHAR(100),
    reported_by UUID NOT NULL,
    assigned_to UUID,
    reported_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    estimated_cost DECIMAL(12,2),
    actual_cost DECIMAL(12,2),
    status VARCHAR(30) NOT NULL DEFAULT 'open',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_technicians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(200),
    specialty VARCHAR(100),
    certification VARCHAR(200),
    hire_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    ticket_id UUID REFERENCES sc_maintenance_tickets(id) ON DELETE SET NULL,
    technician_id UUID REFERENCES sc_technicians(id) ON DELETE SET NULL,
    order_type VARCHAR(50) NOT NULL DEFAULT 'repair',
    description TEXT NOT NULL,
    scheduled_date DATE,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    labor_hours DECIMAL(6,2),
    labor_cost DECIMAL(12,2),
    parts_cost DECIMAL(12,2),
    total_cost DECIMAL(12,2),
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_maintenance_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    provider VARCHAR(200) NOT NULL,
    contract_type VARCHAR(50) NOT NULL DEFAULT 'preventive',
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    annual_cost DECIMAL(12,2),
    frequency VARCHAR(50),
    next_service_date DATE,
    contact_name VARCHAR(150),
    contact_phone VARCHAR(30),
    document_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_spare_parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    part_number VARCHAR(100) NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    quantity INTEGER NOT NULL DEFAULT 0,
    min_quantity INTEGER DEFAULT 0,
    unit_cost DECIMAL(10,2),
    supplier VARCHAR(200),
    storage_location VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'in_stock',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- IOT & SMART CAMPUS

CREATE TABLE IF NOT EXISTS sc_iot_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_name VARCHAR(200) NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    device_uid VARCHAR(100) NOT NULL,
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    room_id UUID REFERENCES sc_rooms(id) ON DELETE SET NULL,
    firmware_version VARCHAR(50),
    last_heartbeat TIMESTAMPTZ,
    battery_level INTEGER,
    status VARCHAR(30) NOT NULL DEFAULT 'online',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_sensors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_id UUID NOT NULL REFERENCES sc_iot_devices(id) ON DELETE CASCADE,
    sensor_type VARCHAR(50) NOT NULL,
    unit VARCHAR(20),
    min_threshold DECIMAL(10,2),
    max_threshold DECIMAL(10,2),
    calibration_date DATE,
    last_reading DECIMAL(10,2),
    last_reading_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_energy_monitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_id UUID NOT NULL REFERENCES sc_iot_devices(id) ON DELETE CASCADE,
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    meter_number VARCHAR(50),
    reading_kwh DECIMAL(12,2) NOT NULL DEFAULT 0,
    reading_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    monthly_limit_kwh DECIMAL(12,2),
    cost_per_kwh DECIMAL(6,4),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_water_monitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_id UUID NOT NULL REFERENCES sc_iot_devices(id) ON DELETE CASCADE,
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    meter_number VARCHAR(50),
    reading_liters DECIMAL(12,2) NOT NULL DEFAULT 0,
    reading_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    monthly_limit_liters DECIMAL(12,2),
    cost_per_liter DECIMAL(6,4),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_door_accesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_id UUID NOT NULL REFERENCES sc_iot_devices(id) ON DELETE CASCADE,
    room_id UUID REFERENCES sc_rooms(id) ON DELETE SET NULL,
    access_type VARCHAR(30) NOT NULL DEFAULT 'card',
    schedule JSONB,
    is_locked BOOLEAN NOT NULL DEFAULT false,
    last_access_at TIMESTAMPTZ,
    last_access_user UUID,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_smart_locks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_id UUID NOT NULL REFERENCES sc_iot_devices(id) ON DELETE CASCADE,
    room_id UUID REFERENCES sc_rooms(id) ON DELETE SET NULL,
    lock_type VARCHAR(30) NOT NULL DEFAULT 'electronic',
    is_locked BOOLEAN NOT NULL DEFAULT true,
    auto_lock_seconds INTEGER DEFAULT 30,
    emergency_override BOOLEAN NOT NULL DEFAULT false,
    last_locked_at TIMESTAMPTZ,
    last_unlocked_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_smart_cameras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_id UUID NOT NULL REFERENCES sc_iot_devices(id) ON DELETE CASCADE,
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    camera_type VARCHAR(30) NOT NULL DEFAULT 'ip',
    stream_url TEXT,
    recording_enabled BOOLEAN NOT NULL DEFAULT true,
    night_vision BOOLEAN NOT NULL DEFAULT false,
    motion_detection BOOLEAN NOT NULL DEFAULT true,
    storage_days INTEGER NOT NULL DEFAULT 30,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    rule_name VARCHAR(200) NOT NULL,
    description TEXT,
    trigger_type VARCHAR(50) NOT NULL,
    trigger_config JSONB NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    action_config JSONB NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    last_triggered_at TIMESTAMPTZ,
    execution_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_smart_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES sc_rooms(id) ON DELETE CASCADE,
    lighting_mode VARCHAR(30) DEFAULT 'auto',
    temperature_target DECIMAL(4,1),
    current_temperature DECIMAL(4,1),
    current_humidity DECIMAL(5,2),
    occupancy_detected BOOLEAN NOT NULL DEFAULT false,
    air_quality_index INTEGER,
    noise_level_db DECIMAL(5,1),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_room_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES sc_rooms(id) ON DELETE CASCADE,
    reserved_by UUID NOT NULL,
    purpose VARCHAR(200) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    attendees_count INTEGER DEFAULT 0,
    equipment_needed TEXT[],
    status VARCHAR(30) NOT NULL DEFAULT 'confirmed',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_room_schedulings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES sc_rooms(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    event_type VARCHAR(50) NOT NULL DEFAULT 'class',
    event_name VARCHAR(200),
    group_id UUID,
    teacher_id UUID,
    is_recurring BOOLEAN NOT NULL DEFAULT true,
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_to DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- SECURITY

CREATE TABLE IF NOT EXISTS sc_emergency_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    plan_name VARCHAR(200) NOT NULL,
    plan_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    procedures TEXT NOT NULL,
    responsible_team TEXT[],
    last_drill_date DATE,
    next_drill_date DATE,
    document_url TEXT,
    version VARCHAR(20) NOT NULL DEFAULT '1.0',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_security_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    incident_type VARCHAR(100) NOT NULL,
    severity VARCHAR(30) NOT NULL DEFAULT 'low',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200),
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    reported_by UUID,
    witness_names TEXT,
    evidence_urls TEXT[],
    action_taken TEXT,
    police_notified BOOLEAN NOT NULL DEFAULT false,
    report_reference VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'open',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_guards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    shift_schedule JSONB,
    badge_number VARCHAR(50),
    hire_date DATE,
    company VARCHAR(150),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_cctvs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    camera_id VARCHAR(100) NOT NULL,
    name VARCHAR(150) NOT NULL,
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    location_description TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    resolution VARCHAR(20) DEFAULT '1080p',
    has_audio BOOLEAN NOT NULL DEFAULT false,
    storage_days INTEGER NOT NULL DEFAULT 30,
    stream_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ENVIRONMENT & SUSTAINABILITY

CREATE TABLE IF NOT EXISTS sc_waste_management (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    waste_type VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    quantity_kg DECIMAL(10,2) NOT NULL DEFAULT 0,
    collection_date DATE NOT NULL DEFAULT CURRENT_DATE,
    collection_point VARCHAR(100),
    disposal_method VARCHAR(100),
    recycling_percentage DECIMAL(5,2),
    cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_carbon_footprint (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    scope VARCHAR(30) NOT NULL,
    category VARCHAR(100) NOT NULL,
    emission_source VARCHAR(200) NOT NULL,
    emission_factor DECIMAL(12,4),
    quantity DECIMAL(12,2),
    total_kg_co2 DECIMAL(12,2) NOT NULL DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_solar_production (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    panel_count INTEGER NOT NULL DEFAULT 0,
    capacity_kw DECIMAL(10,2),
    energy_produced_kwh DECIMAL(12,2) NOT NULL DEFAULT 0,
    reading_date DATE NOT NULL DEFAULT CURRENT_DATE,
    peak_sun_hours DECIMAL(4,2),
    efficiency_percent DECIMAL(5,2),
    revenue_saved DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_energy_savings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    energy_type VARCHAR(30) NOT NULL,
    previous_usage DECIMAL(12,2),
    current_usage DECIMAL(12,2),
    savings_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    savings_percent DECIMAL(5,2),
    cost_savings DECIMAL(12,2),
    measures_taken TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_water_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    meter_id UUID,
    building_id UUID REFERENCES sc_buildings(id) ON DELETE SET NULL,
    reading_liters DECIMAL(12,2) NOT NULL DEFAULT 0,
    reading_date DATE NOT NULL DEFAULT CURRENT_DATE,
    usage_liters DECIMAL(12,2) NOT NULL DEFAULT 0,
    cost_per_liter DECIMAL(6,4),
    total_cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_environmental_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    report_type VARCHAR(100) NOT NULL,
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    period_start DATE,
    period_end DATE,
    total_energy_kwh DECIMAL(12,2),
    total_water_liters DECIMAL(12,2),
    total_waste_kg DECIMAL(12,2),
    total_co2_kg DECIMAL(12,2),
    solar_produced_kwh DECIMAL(12,2),
    recycling_rate DECIMAL(5,2),
    highlights TEXT,
    recommendations TEXT,
    generated_by UUID,
    document_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sc_environmental_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    goal_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    target_value DECIMAL(12,2) NOT NULL,
    current_value DECIMAL(12,2) NOT NULL DEFAULT 0,
    unit VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    target_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'on_track',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES: Create index on school_id for all sc_* tables
-- ============================================================

DO 
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'sc_buses', 'sc_bus_stops', 'sc_routes', 'sc_trips',
            'sc_drivers', 'sc_assistants', 'sc_assignments',
            'sc_gps_tracking', 'sc_bus_attendance', 'sc_fuel_records',
            'sc_bus_maintenance', 'sc_bus_insurance', 'sc_bus_incidents',
            'sc_emergency_alerts',
            'sc_authors', 'sc_publishers', 'sc_book_categories',
            'sc_books', 'sc_book_copies', 'sc_book_loans',
            'sc_book_returns', 'sc_book_reservations', 'sc_late_fees',
            'sc_ebooks', 'sc_audiobooks', 'sc_rfid_tags',
            'sc_library_inventory', 'sc_book_acquisitions', 'sc_library_cards',
            'sc_menus', 'sc_meals', 'sc_nutrition', 'sc_allergens',
            'sc_food_stock', 'sc_food_suppliers', 'sc_meal_orders',
            'sc_meal_consumption', 'sc_meal_subscriptions', 'sc_meal_payments',
            'sc_kitchen_staff', 'sc_cantine_reports',
            'sc_medical_records', 'sc_medical_visits', 'sc_treatments',
            'sc_vaccinations', 'sc_medical_allergies', 'sc_medical_history',
            'sc_medications', 'sc_emergency_contacts', 'sc_accidents',
            'sc_health_reports',
            'sc_buildings', 'sc_rooms', 'sc_beds', 'sc_occupancy',
            'sc_room_assignments', 'sc_boarding_attendance',
            'sc_night_reports', 'sc_disciplines',
            'sc_visitor_registrations', 'sc_visitor_badges',
            'sc_visitor_qrs', 'sc_visitor_invitations',
            'sc_visitor_approvals', 'sc_identity_verifications',
            'sc_visitor_blacklists',
            'sc_assets', 'sc_equipment', 'sc_furniture', 'sc_it_assets',
            'sc_asset_warranties', 'sc_asset_depreciations',
            'sc_asset_transfers', 'sc_maintenance_tickets',
            'sc_technicians', 'sc_work_orders', 'sc_maintenance_contracts',
            'sc_spare_parts',
            'sc_iot_devices', 'sc_sensors', 'sc_energy_monitors',
            'sc_water_monitors', 'sc_door_accesses', 'sc_smart_locks',
            'sc_smart_cameras', 'sc_automation_rules', 'sc_smart_rooms',
            'sc_room_reservations', 'sc_room_schedulings',
            'sc_emergency_plans', 'sc_security_incidents',
            'sc_guards', 'sc_cctvs',
            'sc_waste_management', 'sc_carbon_footprint',
            'sc_solar_production', 'sc_energy_savings', 'sc_water_usage',
            'sc_environmental_reports', 'sc_environmental_goals'
        ])
    LOOP
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS idx_%s_school_id ON %I (school_id)',
            t, t
        );
    END LOOP;
END ;

-- ============================================================
-- ROW LEVEL SECURITY: Enable RLS and create school_id isolation
-- ============================================================

DO 
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'sc_buses', 'sc_bus_stops', 'sc_routes', 'sc_trips',
            'sc_drivers', 'sc_assistants', 'sc_assignments',
            'sc_gps_tracking', 'sc_bus_attendance', 'sc_fuel_records',
            'sc_bus_maintenance', 'sc_bus_insurance', 'sc_bus_incidents',
            'sc_emergency_alerts',
            'sc_authors', 'sc_publishers', 'sc_book_categories',
            'sc_books', 'sc_book_copies', 'sc_book_loans',
            'sc_book_returns', 'sc_book_reservations', 'sc_late_fees',
            'sc_ebooks', 'sc_audiobooks', 'sc_rfid_tags',
            'sc_library_inventory', 'sc_book_acquisitions', 'sc_library_cards',
            'sc_menus', 'sc_meals', 'sc_nutrition', 'sc_allergens',
            'sc_food_stock', 'sc_food_suppliers', 'sc_meal_orders',
            'sc_meal_consumption', 'sc_meal_subscriptions', 'sc_meal_payments',
            'sc_kitchen_staff', 'sc_cantine_reports',
            'sc_medical_records', 'sc_medical_visits', 'sc_treatments',
            'sc_vaccinations', 'sc_medical_allergies', 'sc_medical_history',
            'sc_medications', 'sc_emergency_contacts', 'sc_accidents',
            'sc_health_reports',
            'sc_buildings', 'sc_rooms', 'sc_beds', 'sc_occupancy',
            'sc_room_assignments', 'sc_boarding_attendance',
            'sc_night_reports', 'sc_disciplines',
            'sc_visitor_registrations', 'sc_visitor_badges',
            'sc_visitor_qrs', 'sc_visitor_invitations',
            'sc_visitor_approvals', 'sc_identity_verifications',
            'sc_visitor_blacklists',
            'sc_assets', 'sc_equipment', 'sc_furniture', 'sc_it_assets',
            'sc_asset_warranties', 'sc_asset_depreciations',
            'sc_asset_transfers', 'sc_maintenance_tickets',
            'sc_technicians', 'sc_work_orders', 'sc_maintenance_contracts',
            'sc_spare_parts',
            'sc_iot_devices', 'sc_sensors', 'sc_energy_monitors',
            'sc_water_monitors', 'sc_door_accesses', 'sc_smart_locks',
            'sc_smart_cameras', 'sc_automation_rules', 'sc_smart_rooms',
            'sc_room_reservations', 'sc_room_schedulings',
            'sc_emergency_plans', 'sc_security_incidents',
            'sc_guards', 'sc_cctvs',
            'sc_waste_management', 'sc_carbon_footprint',
            'sc_solar_production', 'sc_energy_savings', 'sc_water_usage',
            'sc_environmental_reports', 'sc_environmental_goals'
        ])
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('DROP POLICY IF EXISTS school_isolation_policy ON %I', t);
        EXECUTE format(
            'CREATE POLICY school_isolation_policy ON %I
             USING (school_id = (SELECT school_id FROM user_schools WHERE user_id = auth.uid() LIMIT 1))
             WITH CHECK (school_id = (SELECT school_id FROM user_schools WHERE user_id = auth.uid() LIMIT 1))',
            t
        );
    END LOOP;
END ;


