import { supportConfig } from '@/lib/support';

export function buildEmailSupportBlock(): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px;border-top:1px solid #E5E7EB;padding-top:24px;">
      <tr><td>
        <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#374151;">Besoin d'aide ? Contactez le support EduCI</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:13px;color:#6B7280;">
          <tr>
            <td style="padding:4px 0;width:100px;font-weight:600;color:#374151;">Téléphone :</td>
            <td style="padding:4px 0;"><a href="${supportConfig.phoneLink}" style="color:#4F46E5;text-decoration:none;">${supportConfig.phoneDisplay}</a></td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-weight:600;color:#374151;">WhatsApp :</td>
            <td style="padding:4px 0;"><a href="${supportConfig.whatsappLink}" style="color:#25D366;text-decoration:none;">${supportConfig.whatsappDisplay}</a></td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-weight:600;color:#374151;">Email :</td>
            <td style="padding:4px 0;"><a href="mailto:${supportConfig.emails.support}" style="color:#4F46E5;text-decoration:none;">${supportConfig.emails.support}</a></td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-weight:600;color:#374151;">Localisation :</td>
            <td style="padding:4px 0;">${supportConfig.location.full}</td>
          </tr>
        </table>
      </td></tr>
    </table>`;
}
