import crypto from 'crypto';
import { PaymentProvider, type PaymentInitParams, type PaymentInitResult, type WebhookVerifyResult, type ConnectionTestResult } from '../types';

const MONEY_FUSION_URL_REGEX = /^https:\/\/pay\.moneyfusion\.net\/([^/]+)\/([^/]+)\/pay\/?$/;

export function validateMoneyFusionUrl(url: string): { valid: boolean; businessName?: string; token?: string; error?: string } {
  const match = url.trim().match(MONEY_FUSION_URL_REGEX);
  if (!match) {
    return { valid: false, error: 'Format invalide. Attendu: https://pay.moneyfusion.net/{businessname}/{token}/pay/' };
  }
  return { valid: true, businessName: match[1], token: match[2] };
}

export function parseMoneyFusionUrl(url: string): { businessName: string; token: string } {
  const match = url.trim().match(MONEY_FUSION_URL_REGEX);
  if (!match) throw new Error('URL Money Fusion invalide');
  return { businessName: match[1], token: match[2] };
}

export class MoneyFusionProvider extends PaymentProvider {
  readonly name = 'MONEY_FUSION';
  readonly displayName = 'Money Fusion';
  readonly supportedCurrencies = ['XOF'];
  readonly supportedCountries = ['CI', 'SN', 'ML', 'BF', 'TG', 'BJ', 'CM'];

  private get paymentUrl(): string {
    return this._config.credentials.payment_url || '';
  }

  private get parsed() {
    return parseMoneyFusionUrl(this.paymentUrl);
  }

  async initiatePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    try {
      const { businessName, token } = this.parsed;
      const endpoint = `https://pay.moneyfusion.net/${businessName}/${token}/pay/`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPrice: Math.round(params.amount),
          article: params.description || `Paiement EduCI - ${params.reference}`,
          devise: this._config.currency || 'XOF',
          reference: params.reference,
          returnUrl: params.returnUrl,
          cancelUrl: params.cancelUrl,
          notifyUrl: params.webhookUrl,
          customer_email: params.customerEmail,
          customer_name: params.customerName,
          customer_phone: params.customerPhone || '',
        }),
      });

      const data = await response.json();

      if (data.statut === 'success' || data.url || data.payment_url || data.link) {
        const redirectUrl = data.url || data.payment_url || data.link;
        return {
          success: true,
          transactionId: data.token || data.transaction_id || params.reference,
          paymentUrl: redirectUrl,
          reference: params.reference,
          provider: this.name,
          rawResponse: data,
        };
      }

      return {
        success: false,
        transactionId: params.reference,
        reference: params.reference,
        provider: this.name,
        error: data.message || data.error || 'Erreur Money Fusion',
        rawResponse: data,
      };
    } catch (err: any) {
      return {
        success: false,
        transactionId: params.reference,
        reference: params.reference,
        provider: this.name,
        error: err.message,
      };
    }
  }

  verifyWebhook(payload: string, headers: Record<string, string>): WebhookVerifyResult {
    try {
      const body = JSON.parse(payload);

      const status = (body.statut || body.status || '').toString().toUpperCase();
      let txStatus: 'COMPLETED' | 'FAILED' | 'PENDING' | 'CANCELLED';

      if (['SUCCESS', 'COMPLETED', 'ACCEPTED', 'PAID'].includes(status)) {
        txStatus = 'COMPLETED';
      } else if (['FAILED', 'REFUSED', 'CANCELLED', 'ERROR', 'REJECTED'].includes(status)) {
        txStatus = 'FAILED';
      } else if (['CANCELLED', 'ANNULE'].includes(status)) {
        txStatus = 'CANCELLED';
      } else {
        txStatus = 'PENDING';
      }

      return {
        valid: true,
        reference: body.reference || body.transaction_id || body.token || '',
        status: txStatus,
        providerTransactionId: body.token || body.transaction_id || '',
        amount: body.totalPrice || body.amount || body.montant,
        currency: body.devise || body.currency || 'XOF',
        rawPayload: body,
      };
    } catch (err: any) {
      return { valid: false, reference: '', status: 'FAILED', rawPayload: payload, error: err.message };
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const validation = validateMoneyFusionUrl(this.paymentUrl);
      if (!validation.valid) {
        return { success: false, provider: this.name, message: validation.error || 'URL invalide', error: validation.error };
      }

      return {
        success: true,
        provider: this.name,
        message: `Money Fusion configuré pour "${validation.businessName}". Prêt à recevoir des paiements.`,
        accountName: validation.businessName,
      };
    } catch (err: any) {
      return { success: false, provider: this.name, message: 'Erreur de connexion', error: err.message };
    }
  }
}
