import { PaymentProvider, type PaymentProviderConfig } from './types';
import { MoneyFusionProvider } from './providers/moneyfusion';

export type ProviderName = 'MONEY_FUSION';

const providerMap: Record<ProviderName, new (config: PaymentProviderConfig) => PaymentProvider> = {
  MONEY_FUSION: MoneyFusionProvider,
};

export const AVAILABLE_PROVIDERS: { name: ProviderName; displayName: string; icon: string; countries: string[] }[] = [
  { name: 'MONEY_FUSION', displayName: 'Money Fusion', icon: '💰', countries: ['CI', 'SN', 'ML', 'BF', 'TG', 'BJ', 'CM'] },
];

export function createProvider(name: ProviderName, config: PaymentProviderConfig): PaymentProvider {
  const ProviderClass = providerMap[name];
  if (!ProviderClass) throw new Error(`Seul Money Fusion est supporté comme passerelle de paiement`);
  return new ProviderClass(config);
}

export function getProvidersForCountry(_countryCode: string): typeof AVAILABLE_PROVIDERS {
  return AVAILABLE_PROVIDERS;
}
