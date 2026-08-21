import {
  createGecirapNetworkSchema,
  updateGecirapNetworkSchema,
  createGecirapNetworkRouteSchema,
  updateGecirapNetworkRouteSchema,
  createGecirapLoadBalancerSchema,
  updateGecirapLoadBalancerSchema,
  createGecirapCDNDistributionSchema,
  updateGecirapCDNDistributionSchema,
  createGecirapDNSRecordSchema,
  updateGecirapDNSRecordSchema,
  createGecirapNetworkHealthSchema,
  updateGecirapNetworkHealthSchema,
  createGecirapTrafficMetricSchema,
  updateGecirapTrafficMetricSchema,
} from '@educi/types';

export const createNetworkSchema = createGecirapNetworkSchema;
export const updateNetworkSchema = updateGecirapNetworkSchema;

export const createNetworkRouteSchema = createGecirapNetworkRouteSchema;
export const updateNetworkRouteSchema = updateGecirapNetworkRouteSchema;

export const createLoadBalancerSchema = createGecirapLoadBalancerSchema;
export const updateLoadBalancerSchema = updateGecirapLoadBalancerSchema;

export const createCDNDistributionSchema = createGecirapCDNDistributionSchema;
export const updateCDNDistributionSchema = updateGecirapCDNDistributionSchema;

export const createDNSRecordSchema = createGecirapDNSRecordSchema;
export const updateDNSRecordSchema = updateGecirapDNSRecordSchema;

export const createNetworkHealthSchema = createGecirapNetworkHealthSchema;
export const updateNetworkHealthSchema = updateGecirapNetworkHealthSchema;

export const createTrafficMetricSchema = createGecirapTrafficMetricSchema;
export const updateTrafficMetricSchema = updateGecirapTrafficMetricSchema;
