import { sbMarketplace } from './domains/marketplace.service';

export const marketplaceApi = {
  listListings: (filters?: { category?: string; search?: string }) =>
    sbMarketplace.listListings(filters),
  getCategories: () => sbMarketplace.getCategories(),
  createListing: (data: any) => sbMarketplace.createListing(data),
  getOrders: (userId?: string) => sbMarketplace.getOrders(userId),
  createOrder: (listingId: string, quantity?: number) => sbMarketplace.createOrder(listingId, quantity),
};