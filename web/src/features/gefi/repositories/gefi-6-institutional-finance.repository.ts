import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-6: Institutional Finance — School Revenue, Expenses, Capital Projects
// ============================================================================

export interface GEFISchoolRevenue extends BaseEntity { category: 'TUITION'|'FEES'|'AUXILIARY'|'GOVERNMENT'|'DONATION'|'GRANT'|'INVESTMENT'|'OTHER'; description: string; amount: number; currency_code: string; source_id?: string; source_type?: string; fiscal_year_id: string; period: string; status: 'RECORDED'|'CONFIRMED'|'RECONCILED'; metadata: Record<string,unknown>; }
export interface GEFISchoolExpense extends BaseEntity { category: 'SALARY'|'BENEFIT'|'SUPPLIES'|'MAINTENANCE'|'UTILITIES'|'TRANSPORT'|'FOOD'|'TECHNOLOGY'|'MARKETING'|'ADMINISTRATIVE'|'CAPITAL'|'OTHER'; description: string; amount: number; currency_code: string; vendor_id?: string; cost_center_id?: string; fiscal_year_id: string; period: string; status: 'PENDING'|'APPROVED'|'PAID'|'DISPUTED'; metadata: Record<string,unknown>; }
export interface GEFICapitalProject extends BaseEntity { name: string; description: string; type: 'CONSTRUCTION'|'RENOVATION'|'EQUIPMENT'|'INFRASTRUCTURE'|'TECHNOLOGY'; total_budget: number; spent: number; funded_amount: number; start_date: string; end_date: string; status: 'PLANNING'|'FUNDING'|'IN_PROGRESS'|'COMPLETED'|'ON_HOLD'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFICapitalProjectPhase extends BaseEntity { project_id: string; name: string; description: string; budget: number; spent: number; start_date: string; end_date: string; status: 'NOT_STARTED'|'IN_PROGRESS'|'COMPLETED'|'DELAYED'; metadata: Record<string,unknown>; }
export interface GEFICapitalProjectExpense extends BaseEntity { phase_id: string; category: string; description: string; amount: number; vendor: string; invoice_number?: string; status: 'PENDING'|'APPROVED'|'PAID'; paid_date?: string; metadata: Record<string,unknown>; }
export interface GEFICapitalProjectDonation extends BaseEntity { project_id: string; donor_name: string; donor_email?: string; amount: number; currency_code: string; type: 'CASH'|'IN_KIND'|'PLEDGE'; status: 'PENDING'|'CONFIRMED'|'RECEIVED'; received_date?: string; metadata: Record<string,unknown>; }
export interface GEFIDepartmentBudget extends BaseEntity { department_id: string; fiscal_year_id: string; name: string; total_budget: number; spent: number; committed: number; available: number; status: 'ACTIVE'|'FROZEN'|'CLOSED'; metadata: Record<string,unknown>; }
export interface GEFIDepartmentBudgetLine extends BaseEntity { budget_id: string; category: string; description: string; allocated: number; spent: number; committed: number; variance: number; metadata: Record<string,unknown>; }
export interface GEFIPurchasingRequest extends BaseEntity { requester_id: string; department_id: string; description: string; amount: number; currency_code: string; priority: 'LOW'|'MEDIUM'|'HIGH'|'URGENT'; justification: string; status: 'DRAFT'|'SUBMITTED'|'APPROVED'|'REJECTED'|'ORDERED'|'RECEIVED'; approved_by?: string; approved_at?: string; metadata: Record<string,unknown>; }
export interface GEFIPurchaseOrder extends BaseEntity { request_id: string; po_number: string; vendor_name: string; vendor_contact: string; total_amount: number; tax_amount: number; shipping_amount: number; grand_total: number; currency_code: string; delivery_date: string; status: 'DRAFT'|'SENT'|'CONFIRMED'|'SHIPPED'|'RECEIVED'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIPurchaseOrderItem extends BaseEntity { order_id: string; description: string; quantity: number; unit_price: number; total_price: number; received_quantity: number; status: 'PENDING'|'PARTIAL'|'RECEIVED'|'RETURNED'; metadata: Record<string,unknown>; }
export interface GEFIVendor extends BaseEntity; name: string; contact_person: string; email: string; phone: string; address: string; tax_id: string; payment_terms: string; rating: number; status: 'ACTIVE'|'INACTIVE'|'BLOCKED'; metadata: Record<string,unknown>; }
export interface GEFIVendorPayment extends BaseEntity { vendor_id: string; purchase_order_id: string; amount: number; payment_method: string; reference: string; status: 'PENDING'|'COMPLETED'|'FAILED'; paid_at?: string; metadata: Record<string,unknown>; }
export interface GEFIAsset extends BaseEntity { name: string; category: string; description: string; purchase_date: string; purchase_price: number; current_value: number; depreciation_method: 'STRAIGHT_LINE'|'DECLINING_BALANCE'|'UNITS_OF_PRODUCTION'; useful_life_years: number; salvage_value: number; location: string; assigned_to?: string; status: 'ACTIVE'|'DISPOSED'|'MAINTENANCE'|'LOST'; metadata: Record<string,unknown>; }
export interface GEFIAssetMaintenance extends BaseEntity { asset_id: string; maintenance_type: 'PREVENTIVE'|'CORRECTIVE'|'PREDICTIVE'; description: string; cost: number; performed_by: string; scheduled_date: string; completed_date?: string; status: 'SCHEDULED'|'IN_PROGRESS'|'COMPLETED'|'CANCELLED'; next_maintenance_date?: string; metadata: Record<string,unknown>; }
export interface GEFIAssetDepreciation extends BaseEntity { asset_id: string; period: string; depreciation_amount: number; accumulated_depreciation: number; book_value: number; calculated_at: string; metadata: Record<string,unknown>; }
export interface GEFIAssetDisposal extends BaseEntity { asset_id: string; disposal_type: 'SALE'|'DONATION'|'SCRAP'|'TRANSFER'; disposal_date: string; sale_price?: number; buyer?: string; reason: string; approved_by: string; status: 'PENDING'|'APPROVED'|'COMPLETED'; metadata: Record<string,unknown>; }
export interface GEFIInventory extends BaseEntity { name: string; category: string; sku: string; quantity: number; unit_cost: number; total_value: number; reorder_level: number; reorder_quantity: number; location: string; supplier_id?: string; status: 'IN_STOCK'|'LOW_STOCK'|'OUT_OF_STOCK'|'DISCONTINUED'; metadata: Record<string,unknown>; }
export interface GEFIInventoryMovement extends BaseEntity { item_id: string; movement_type: 'RECEIPT'|'ISSUE'|'TRANSFER'|'ADJUSTMENT'|'RETURN'; quantity: number; unit_cost: number; total_cost: number; from_location?: string; to_location?: string; reference: string; performed_by: string; status: 'COMPLETED'|'PENDING'|'CANCELLED'; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI6Repository {
  schoolRevenue: CrudRepository<GEFISchoolRevenue>;
  schoolExpense: CrudRepository<GEFISchoolExpense>;
  capitalProject: CrudRepository<GEFICapitalProject>;
  capitalProjectPhase: CrudRepository<GEFICapitalProjectPhase>;
  capitalProjectExpense: CrudRepository<GEFICapitalProjectExpense>;
  capitalProjectDonation: CrudRepository<GEFICapitalProjectDonation>;
  departmentBudget: CrudRepository<GEFIDepartmentBudget>;
  departmentBudgetLine: CrudRepository<GEFIDepartmentBudgetLine>;
  purchasingRequest: CrudRepository<GEFIPurchasingRequest>;
  purchaseOrder: CrudRepository<GEFIPurchaseOrder>;
  purchaseOrderItem: CrudRepository<GEFIPurchaseOrderItem>;
  vendor: CrudRepository<GEFIVendor>;
  vendorPayment: CrudRepository<GEFIVendorPayment>;
  asset: CrudRepository<GEFIAsset>;
  assetMaintenance: CrudRepository<GEFIAssetMaintenance>;
  assetDepreciation: CrudRepository<GEFIAssetDepreciation>;
  assetDisposal: CrudRepository<GEFIAssetDisposal>;
  inventory: CrudRepository<GEFIInventory>;
  inventoryMovement: CrudRepository<GEFIInventoryMovement>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI6Repository(supabase: SupabaseClient): GEFI6Repository {
  return {
    schoolRevenue: createCrudRepository<GEFISchoolRevenue>(supabase, 'gefi_school_revenues'),
    schoolExpense: createCrudRepository<GEFISchoolExpense>(supabase, 'gefi_school_expenses'),
    capitalProject: createCrudRepository<GEFICapitalProject>(supabase, 'gefi_capital_projects'),
    capitalProjectPhase: createCrudRepository<GEFICapitalProjectPhase>(supabase, 'gefi_capital_project_phases'),
    capitalProjectExpense: createCrudRepository<GEFICapitalProjectExpense>(supabase, 'gefi_capital_project_expenses'),
    capitalProjectDonation: createCrudRepository<GEFICapitalProjectDonation>(supabase, 'gefi_capital_project_donations'),
    departmentBudget: createCrudRepository<GEFIDepartmentBudget>(supabase, 'gefi_department_budgets'),
    departmentBudgetLine: createCrudRepository<GEFIDepartmentBudgetLine>(supabase, 'gefi_department_budget_lines'),
    purchasingRequest: createCrudRepository<GEFIPurchasingRequest>(supabase, 'gefi_purchasing_requests'),
    purchaseOrder: createCrudRepository<GEFIPurchaseOrder>(supabase, 'gefi_purchase_orders'),
    purchaseOrderItem: createCrudRepository<GEFIPurchaseOrderItem>(supabase, 'gefi_purchase_order_items'),
    vendor: createCrudRepository<GEFIVendor>(supabase, 'gefi_vendors'),
    vendorPayment: createCrudRepository<GEFIVendorPayment>(supabase, 'gefi_vendor_payments'),
    asset: createCrudRepository<GEFIAsset>(supabase, 'gefi_assets'),
    assetMaintenance: createCrudRepository<GEFIAssetMaintenance>(supabase, 'gefi_asset_maintenances'),
    assetDepreciation: createCrudRepository<GEFIAssetDepreciation>(supabase, 'gefi_asset_depreciations'),
    assetDisposal: createCrudRepository<GEFIAssetDisposal>(supabase, 'gefi_asset_disposals'),
    inventory: createCrudRepository<GEFIInventory>(supabase, 'gefi_inventory'),
    inventoryMovement: createCrudRepository<GEFIInventoryMovement>(supabase, 'gefi_inventory_movements'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_institutional_finance_audit_trails'),
  };
}
