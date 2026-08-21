export interface PaymentProviderConfig {
  schoolId: string;
  provider: string;
  credentials: Record<string, string>;
  sandbox: boolean;
  currency: string;
  country: string;
}

export interface PaymentInitParams {
  amount: number;
  currency: string;
  reference: string;
  description: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  returnUrl: string;
  cancelUrl: string;
  webhookUrl: string;
  metadata?: Record<string, string>;
}

export interface PaymentInitResult {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  reference: string;
  provider: string;
  currency?: string;
  rawResponse?: unknown;
  error?: string;
}

export interface WebhookVerifyResult {
  valid: boolean;
  reference: string;
  status: 'COMPLETED' | 'FAILED' | 'PENDING' | 'CANCELLED';
  providerTransactionId?: string;
  amount?: number;
  currency?: string;
  rawPayload: unknown;
  error?: string;
}

export interface ConnectionTestResult {
  success: boolean;
  provider: string;
  message: string;
  accountName?: string;
  balance?: number;
  currency?: string;
  error?: string;
}

export abstract class PaymentProvider {
  protected _config: PaymentProviderConfig;

  constructor(config: PaymentProviderConfig) {
    this._config = config;
  }

  get config() { return this._config; }

  abstract readonly name: string;
  abstract readonly displayName: string;
  abstract readonly supportedCurrencies: string[];
  abstract readonly supportedCountries: string[];

  abstract initiatePayment(params: PaymentInitParams): Promise<PaymentInitResult>;
  abstract verifyWebhook(payload: string, headers: Record<string, string>): WebhookVerifyResult;
  abstract testConnection(): Promise<ConnectionTestResult>;
}
