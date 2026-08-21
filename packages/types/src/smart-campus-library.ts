// Smart Campus Enterprise Types - Bibliothèque Enterprise
// Phase 2.8 - EduCI Platform

// =============================================================================
// ENUMS
// =============================================================================

export enum BookStatus {
  AVAILABLE = "available",
  BORROWED = "borrowed",
  RESERVED = "reserved",
  LOST = "lost",
  DAMAGED = "damaged",
  RETIRED = "retired",
  UNDER_REPAIR = "under_repair",
  ON_ORDER = "on_order",
}

export enum BookFormat {
  HARDCOVER = "hardcover",
  PAPERBACK = "paperback",
  EBOOK = "ebook",
  AUDIOBOOK = "audiobook",
  PDF = "pdf",
  EPUB = "epub",
  MAGAZINE = "magazine",
  NEWSPAPER = "newspaper",
}

export enum LoanStatus {
  ACTIVE = "active",
  RETURNED = "returned",
  OVERDUE = "overdue",
  LOST = "lost",
  RENEWED = "renewed",
  CANCELLED = "cancelled",
}

export enum ReservationStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  READY = "ready",
  COLLECTED = "collected",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

export enum FineStatus {
  PENDING = "pending",
  PAID = "paid",
  WAIVED = "waived",
  PARTIALLY_PAID = "partially_paid",
  OVERDUE = "overdue",
}

export enum DigitalAccess {
  OPEN_ACCESS = "open_access",
  RESTRICTED = "restricted",
  INSTITUTIONAL = "institutional",
  LICENSED = "licensed",
}

export enum BarcodeType {
  CODE128 = "code128",
  CODE39 = "code39",
  EAN13 = "ean13",
  QR_CODE = "qr_code",
  ISBN = "isbn",
}

export enum RFIDStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  LOST = "lost",
  DAMAGED = "damaged",
  REPLACED = "replaced",
}

export enum AcquisitionStatus {
  REQUESTED = "requested",
  APPROVED = "approved",
  ORDERED = "ordered",
  RECEIVED = "received",
  CATALOGED = "cataloged",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum RecommendationType {
  POPULAR = "popular",
  NEW_ARRIVAL = "new_arrival",
  STAFF_PICK = "staff_pick",
  CURRICULUM = "curriculum",
  PERSONALIZED = "personalized",
  TRENDING = "trending",
}

export enum AuthorStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DECEASED = "deceased",
}

export enum PublisherStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MERGED = "merged",
}

export enum InventoryStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  DISCREPANCY_FOUND = "discrepancy_found",
}

export enum BookCondition {
  NEW = "new",
  LIKE_NEW = "like_new",
  VERY_GOOD = "very_good",
  GOOD = "good",
  ACCEPTABLE = "acceptable",
  POOR = "poor",
  DAMAGED = "damaged",
}

export enum LoanType {
  STANDARD = "standard",
  SHORT_TERM = "short_term",
  LONG_TERM = "long_term",
  REFERENCE = "reference",
  OVERNIGHT = "overnight",
}

export enum ReturnStatus {
  ON_TIME = "on_time",
  LATE = "late",
  DAMAGED = "damaged",
  LOST = "lost",
}

export enum FineType {
  LATE_RETURN = "late_return",
  DAMAGED_BOOK = "damaged_book",
  LOST_BOOK = "lost_book",
  RENEWAL_VIOLATION = "renewal_violation",
}

export enum LibraryCardStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  SUSPENDED = "suspended",
  LOST = "lost",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

export enum SearchType {
  TITLE = "title",
  AUTHOR = "author",
  ISBN = "isbn",
  SUBJECT = "subject",
  KEYWORD = "keyword",
  ADVANCED = "advanced",
}

export enum BookRating {
  UNRATED = "unrated",
  ONE_STAR = "one_star",
  TWO_STARS = "two_stars",
  THREE_STARS = "three_stars",
  FOUR_STARS = "four_stars",
  FIVE_STARS = "five_stars",
}

// =============================================================================
// INTERFACES
// =============================================================================

export interface Book {
  id: string;
  school_id: string;
  title: string;
  subtitle: string;
  isbn: string;
  isbn13: string;
  author_id: string;
  author_name: string;
  publisher_id: string;
  publisher_name: string;
  category_id: string;
  category_name: string;
  publication_year: number;
  edition: string;
  language: string;
  pages: number;
  format: BookFormat;
  status: BookStatus;
  condition: BookCondition;
  description: string;
  cover_image: string;
  dewey_decimal: string;
  call_number: string;
  location_shelf: string;
  location_row: string;
  location_section: string;
  total_copies: number;
  available_copies: number;
  barcode: string;
  rfid_tag: string;
  digital_url: string;
  digital_access: DigitalAccess;
  rating: BookRating;
  review_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface BookCreate {
  school_id: string;
  title: string;
  subtitle: string;
  isbn: string;
  isbn13: string;
  author_id: string;
  author_name: string;
  publisher_id: string;
  publisher_name: string;
  category_id: string;
  category_name: string;
  publication_year: number;
  edition: string;
  language: string;
  pages: number;
  format: BookFormat;
  condition: BookCondition;
  description: string;
  cover_image: string;
  dewey_decimal: string;
  call_number: string;
  location_shelf: string;
  location_row: string;
  location_section: string;
  total_copies: number;
  barcode: string;
  rfid_tag: string;
  digital_url: string;
  digital_access: DigitalAccess;
  tags: string[];
}

export interface BookUpdate {
  title?: string;
  subtitle?: string;
  isbn?: string;
  isbn13?: string;
  author_id?: string;
  author_name?: string;
  publisher_id?: string;
  publisher_name?: string;
  category_id?: string;
  category_name?: string;
  publication_year?: number;
  edition?: string;
  language?: string;
  pages?: number;
  format?: BookFormat;
  status?: BookStatus;
  condition?: BookCondition;
  description?: string;
  cover_image?: string;
  dewey_decimal?: string;
  call_number?: string;
  location_shelf?: string;
  location_row?: string;
  location_section?: string;
  total_copies?: number;
  available_copies?: number;
  barcode?: string;
  rfid_tag?: string;
  digital_url?: string;
  digital_access?: DigitalAccess;
  rating?: BookRating;
  tags?: string[];
}

export interface BookQuery {
  school_id: string;
  title?: string;
  author_id?: string;
  category_id?: string;
  format?: BookFormat;
  status?: BookStatus;
  language?: string;
  publication_year_from?: number;
  publication_year_to?: number;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface Author {
  id: string;
  school_id: string;
  first_name: string;
  last_name: string;
  biography: string;
  date_of_birth: string;
  date_of_death: string;
  nationality: string;
  website: string;
  photo_url: string;
  status: AuthorStatus;
  book_count: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
}

export interface AuthorCreate {
  school_id: string;
  first_name: string;
  last_name: string;
  biography: string;
  date_of_birth: string;
  date_of_death: string;
  nationality: string;
  website: string;
  photo_url: string;
  status: AuthorStatus;
}

export interface Publisher {
  id: string;
  school_id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  status: PublisherStatus;
  book_count: number;
  created_at: string;
  updated_at: string;
}

export interface PublisherCreate {
  school_id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  status: PublisherStatus;
}

export interface BookCategory {
  id: string;
  school_id: string;
  name: string;
  code: string;
  description: string;
  parent_id: string;
  dewey_code: string;
  book_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookCategoryCreate {
  school_id: string;
  name: string;
  code: string;
  description: string;
  parent_id: string;
  dewey_code: string;
  is_active: boolean;
}

export interface BookCopy {
  id: string;
  school_id: string;
  book_id: string;
  copy_number: number;
  barcode: string;
  rfid_tag: string;
  condition: BookCondition;
  status: BookStatus;
  location_shelf: string;
  location_row: string;
  location_section: string;
  acquired_date: string;
  last_maintained: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BookCopyCreate {
  school_id: string;
  book_id: string;
  copy_number: number;
  barcode: string;
  rfid_tag: string;
  condition: BookCondition;
  status: BookStatus;
  location_shelf: string;
  location_row: string;
  location_section: string;
  acquired_date: string;
  notes: string;
}

export interface BookReservation {
  id: string;
  school_id: string;
  book_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  status: ReservationStatus;
  reservation_date: string;
  expiry_date: string;
  pickup_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BookReservationCreate {
  school_id: string;
  book_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  expiry_date: string;
  notes: string;
}

export interface BookLoan {
  id: string;
  school_id: string;
  book_id: string;
  book_copy_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  loan_type: LoanType;
  status: LoanStatus;
  loan_date: string;
  due_date: string;
  return_date: string;
  renewal_count: number;
  max_renewals: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BookLoanCreate {
  school_id: string;
  book_id: string;
  book_copy_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  loan_type: LoanType;
  due_date: string;
  notes: string;
}

export interface BookReturn {
  id: string;
  school_id: string;
  loan_id: string;
  book_id: string;
  book_copy_id: string;
  user_id: string;
  return_date: string;
  status: ReturnStatus;
  condition_on_return: BookCondition;
  fine_amount: number;
  fine_paid: boolean;
  received_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BookReturnCreate {
  school_id: string;
  loan_id: string;
  book_id: string;
  book_copy_id: string;
  user_id: string;
  return_date: string;
  condition_on_return: BookCondition;
  received_by: string;
  notes: string;
}

export interface LateFee {
  id: string;
  school_id: string;
  loan_id: string;
  user_id: string;
  user_name: string;
  fine_type: FineType;
  amount: number;
  amount_paid: number;
  status: FineStatus;
  issued_date: string;
  due_date: string;
  paid_date: string;
  waiver_reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LateFeeCreate {
  school_id: string;
  loan_id: string;
  user_id: string;
  user_name: string;
  fine_type: FineType;
  amount: number;
  issued_date: string;
  due_date: string;
  notes: string;
}

export interface EBook {
  id: string;
  school_id: string;
  book_id: string;
  file_url: string;
  file_size: number;
  file_format: string;
  drm_protected: boolean;
  download_count: number;
  max_downloads: number;
  access_url: string;
  expiration_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EBookCreate {
  school_id: string;
  book_id: string;
  file_url: string;
  file_size: number;
  file_format: string;
  drm_protected: boolean;
  max_downloads: number;
  access_url: string;
  expiration_date: string;
  notes: string;
}

export interface Audiobook {
  id: string;
  school_id: string;
  book_id: string;
  narrator: string;
  duration_minutes: number;
  file_url: string;
  file_size: number;
  sample_url: string;
  chapters: number;
  bitrate: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AudiobookCreate {
  school_id: string;
  book_id: string;
  narrator: string;
  duration_minutes: number;
  file_url: string;
  file_size: number;
  sample_url: string;
  chapters: number;
  bitrate: number;
  notes: string;
}

export interface QRCode {
  id: string;
  school_id: string;
  book_id: string;
  book_copy_id: string;
  code: string;
  url: string;
  type: BarcodeType;
  generated_at: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Barcode {
  id: string;
  school_id: string;
  book_id: string;
  book_copy_id: string;
  code: string;
  type: BarcodeType;
  value: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RFIDTag {
  id: string;
  school_id: string;
  book_copy_id: string;
  tag_id: string;
  epc: string;
  status: RFIDStatus;
  assigned_date: string;
  last_scanned: string;
  location: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface RFIDTagCreate {
  school_id: string;
  book_copy_id: string;
  tag_id: string;
  epc: string;
  status: RFIDStatus;
  assigned_date: string;
  location: string;
  notes: string;
}

export interface LibraryInventory {
  id: string;
  school_id: string;
  inventory_code: string;
  status: InventoryStatus;
  scheduled_date: string;
  started_date: string;
  completed_date: string;
  total_items: number;
  counted_items: number;
  discrepancies: number;
  conducted_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LibraryInventoryCreate {
  school_id: string;
  inventory_code: string;
  scheduled_date: string;
  total_items: number;
  conducted_by: string;
  notes: string;
}

export interface BookAcquisition {
  id: string;
  school_id: string;
  title: string;
  author: string;
  isbn: string;
  format: BookFormat;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  requested_by: string;
  requested_date: string;
  status: AcquisitionStatus;
  approved_by: string;
  approved_date: string;
  ordered_date: string;
  received_date: string;
  supplier: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BookAcquisitionCreate {
  school_id: string;
  title: string;
  author: string;
  isbn: string;
  format: BookFormat;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  requested_by: string;
  requested_date: string;
  supplier: string;
  notes: string;
}

export interface BookRecommendation {
  id: string;
  school_id: string;
  book_id: string;
  recommended_for: string;
  recommendation_type: RecommendationType;
  reason: string;
  recommended_by: string;
  is_active: boolean;
  display_order: number;
  start_date: string;
  end_date: string;
  view_count: number;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export interface BookRecommendationCreate {
  school_id: string;
  book_id: string;
  recommended_for: string;
  recommendation_type: RecommendationType;
  reason: string;
  recommended_by: string;
  is_active: boolean;
  display_order: number;
  start_date: string;
  end_date: string;
}

export interface LibraryCard {
  id: string;
  school_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  card_number: string;
  status: LibraryCardStatus;
  issue_date: string;
  expiry_date: string;
  max_loans: number;
  current_loans: number;
  outstanding_fines: number;
  barcode: string;
  rfid_tag: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LibraryCardCreate {
  school_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  card_number: string;
  issue_date: string;
  expiry_date: string;
  max_loans: number;
  barcode: string;
  rfid_tag: string;
  notes: string;
}

export interface BookSearch {
  query: string;
  search_type: SearchType;
  filters: BookFilter;
  results: Book[];
  total_count: number;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: "asc" | "desc";
  search_time_ms: number;
}

export interface BookFilter {
  school_id: string;
  title?: string;
  author?: string;
  isbn?: string;
  category_id?: string;
  format?: BookFormat[];
  status?: BookStatus[];
  language?: string[];
  publication_year_from?: number;
  publication_year_to?: number;
  rating?: BookRating;
  available_only?: boolean;
  has_digital?: boolean;
  tags?: string[];
}

export interface LibraryAnalytics {
  total_books: number;
  total_copies: number;
  available_copies: number;
  borrowed_copies: number;
  total_users: number;
  active_users: number;
  total_loans: number;
  active_loans: number;
  overdue_loans: number;
  total_reservations: number;
  pending_reservations: number;
  total_fines: number;
  collected_fines: number;
  average_loan_duration: number;
  most_borrowed_books: Array<{
    book_id: string;
    title: string;
    author: string;
    borrow_count: number;
  }>;
  borrowing_trends: Array<{
    date: string;
    loans: number;
    returns: number;
  }>;
  popular_categories: Array<{
    category_id: string;
    category_name: string;
    book_count: number;
    loan_count: number;
  }>;
  digital_usage: {
    total_ebooks: number;
    total_audiobooks: number;
    total_downloads: number;
    total_streams: number;
  };
}

export interface LibraryReport {
  id: string;
  school_id: string;
  report_type: string;
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

export interface LibraryConfig {
  id: string;
  school_id: string;
  library_name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  opening_hours: Record<string, { open: string; close: string }>;
  max_loan_duration_days: number;
  max_renewals: number;
  max_reservations: number;
  fine_per_day: number;
  max_fine_amount: number;
  lost_book_fine_multiplier: number;
  allow_online_reservations: boolean;
  allow_online_renewals: boolean;
  require_approval_for_acquisitions: boolean;
  auto_send_overdue_notices: boolean;
  overdue_notice_days: number[];
  rfid_enabled: boolean;
  barcode_enabled: boolean;
  qr_code_enabled: boolean;
  digital_access_enabled: boolean;
  created_at: string;
  updated_at: string;
}
