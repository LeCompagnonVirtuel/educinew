// =====================================================
// EduCI — Email Templates (Resend HTML Templates)
// Modern professional responsive templates with SVG icons and EduCI branding
// =====================================================

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const COLORS = {
  indigo: "#4F46E5",
  indigoDark: "#3730A3",
  cyan: "#06B6D4",
  violet: "#8B5CF6",
  violetDark: "#6D28D9",
  white: "#FFFFFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  green10: "#ECFDF5",
  green600: "#059669",
  red10: "#FEF2F2",
  red600: "#DC2626",
  orange10: "#FFF7ED",
  orange600: "#EA580C",
  yellow10: "#FEFCE8",
  yellow600: "#CA8A04",
};

// =====================================================
// SVG ICONS
// =====================================================

const SVG_LOGO = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="#FF8A00"/></svg>`;

const SVG_ICON = {
  graduation: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="currentColor"/></svg>`,
  check: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/></svg>`,
  email: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/></svg>`,
  lock: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="currentColor"/></svg>`,
  login: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/></svg>`,
  school: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor"/></svg>`,
  clock: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/></svg>`,
  warning: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="currentColor"/></svg>`,
  alert: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/></svg>`,
  chart: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92L20.59 5.51L13.5 13.48L9.5 9.48L2 16.99L3.5 18.49Z" fill="currentColor"/></svg>`,
  book: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z" fill="currentColor"/></svg>`,
  payment: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V12H20V18ZM20 10H4V6H20V10Z" fill="currentColor"/></svg>`,
  megaphone: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2V4L13 9V22H11V9L4 2V4L11 9V22H13V9L20 2ZM18 4L14 7.5V9L18 5.5V4Z" fill="currentColor"/></svg>`,
  chat: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/></svg>`,
  resource: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor"/></svg>`,
  family: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/></svg>`,
  student: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/></svg>`,
  refund: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 15L12 20L7 15H10V10H14V15H17Z" fill="currentColor"/></svg>`,
  noAbsence: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z" fill="currentColor"/></svg>`,
};

// =====================================================
// LAYOUT COMPONENTS
// =====================================================

function baseLayout(content: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>EduCI</title>
  ${preheader ? `<meta name="x-apple-disable-message-reformatting"><style>.preheader{display:none!important;visibility:hidden;max-height:0;max-width:0;mso-hide:all;}</style>` : ""}
</head>
<body style="margin:0;padding:0;background-color:#F0F2F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  ${preheader ? `<span class="preheader" style="display:none!important;visibility:hidden;max-height:0;max-width:0;mso-hide:all;">${preheader}</span>` : ""}
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F0F2F5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function header(): string {
  return `<tr>
    <td align="center" style="padding-bottom:32px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 50%,#8B5CF6 100%);border-radius:16px;padding:14px 28px;box-shadow:0 4px 14px rgba(79,70,229,0.4);">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="middle" style="padding-right:10px;">${SVG_LOGO}</td>
                <td valign="middle">
                  <span style="font-size:26px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">Edu</span><span style="font-size:26px;font-weight:800;color:#FF8A00;letter-spacing:-0.5px;">CI</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function footer(): string {
  return `<tr>
    <td style="padding:32px 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="border-top:1px solid #E5E7EB;padding-top:24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#6B7280;">
              <a href="https://educi.live" style="color:#4F46E5;text-decoration:none;">educi.live</a>
            </p>
            <p style="margin:0 0 8px;font-size:12px;color:#9CA3AF;">
              Plateforme intelligente de gestion scolaire
            </p>
            <p style="margin:0;font-size:11px;color:#D1D5DB;">
              &copy; 2025 EduCI — Agr&eacute;&eacute; par le Minist&egrave;re de l'&Eacute;ducation Nationale de C&ocirc;te d'Ivoire
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function iconCircle(svg: string, bgColor: string, iconColor: string): string {
  const colored = svg.replace('currentColor', iconColor);
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding-bottom:24px;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:${bgColor};border-radius:50px;padding:16px 20px;">${colored}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function card(content: string, bgColor = "#FFFFFF"): string {
  return `<tr>
    <td style="background-color:${bgColor};border-radius:16px;border:1px solid #E5E7EB;padding:40px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04);">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${content}
      </table>
    </td>
  </tr>`;
}

function button(label: string, url: string, primary = true): string {
  const bg = primary
    ? `background:linear-gradient(135deg,#4F46E5,#7C3AED);box-shadow:0 4px 12px rgba(79,70,229,0.35);`
    : `background-color:#FFFFFF;border:1px solid #D1D5DB;`;
  const textColor = primary ? "#FFFFFF" : "#374151";
  return `<tr>
    <td align="center" style="padding:24px 0;">
      <a href="${url}" target="_blank" style="display:inline-block;padding:16px 40px;border-radius:10px;font-size:16px;font-weight:600;color:${textColor};text-decoration:none;${bg}">${label}</a>
    </td>
  </tr>`;
}

function divider(): string {
  return `<tr><td style="padding:16px 0;"><hr style="border:none;border-top:1px solid #F3F4F6;margin:0;"></td></tr>`;
}

function statBlock(label: string, value: string): string {
  return `<td align="center" style="padding:12px 16px;">
    <p style="margin:0 0 4px;font-size:12px;color:#6B7280;text-transform:uppercase;letter-spacing:0.5px;">${label}</p>
    <p style="margin:0;font-size:24px;font-weight:700;color:#4F46E5;">${value}</p>
  </td>`;
}

function infoBox(text: string, icon: string = SVG_ICON.alert, bgColor = "#F9FAFB", borderColor = "#F3F4F6", iconColor = "#9CA3AF"): string {
  const colored = icon.replace('currentColor', iconColor);
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${bgColor};border-radius:10px;border:1px solid ${borderColor};">
    <tr>
      <td style="padding:16px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td valign="top" style="width:20px;padding-right:10px;">${colored}</td>
            <td>
              <p style="margin:0;font-size:13px;color:#6B7280;line-height:1.5;">${text}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function warningBox(text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#FEF2F2,#FEE2E2);border-radius:10px;border:1px solid #FECACA;">
    <tr>
      <td style="padding:16px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td valign="top" style="width:20px;padding-right:10px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="#DC2626"/></svg>
            </td>
            <td>
              <p style="margin:0;font-size:13px;color:#991B1B;line-height:1.5;font-weight:500;">${text}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

// =====================================================
// AUTH TEMPLATES
// =====================================================

export function welcomeEmail(name: string, loginUrl: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  return {
    subject: "Bienvenue sur EduCI !",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.graduation, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Bienvenue ${safeName} !</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Votre compte EduCI a &eacute;t&eacute; cr&eacute;&eacute; avec succ&egrave;s. Vous avez acc&egrave;s &agrave; une plateforme compl&egrave;te de gestion scolaire intelligente.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#EEF2FF,#F0F4FF);border-radius:12px;border:1px solid #E0E7FF;">
              <tr>
                <td style="padding:24px;">
                  <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#4F46E5;">Ce qui vous attend :</p>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td valign="top" style="width:24px;padding:4px 12px 4px 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM12 4.2L19 8.3V15.7L12 19.8L5 15.7V8.3L12 4.2Z" fill="#4F46E5"/><path d="M10 17L6 13L7.4 11.6L10 14.2L16.6 7.6L18 9L10 17Z" fill="#4F46E5"/></svg></td><td style="padding:4px 0;font-size:14px;color:#374151;">Gestion des classes et &eacute;l&egrave;ves</td></tr>
                    <tr><td valign="top" style="width:24px;padding:4px 12px 4px 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#4F46E5"/></svg></td><td style="padding:4px 0;font-size:14px;color:#374151;">Suivi des notes en temps r&eacute;el</td></tr>
                    <tr><td valign="top" style="width:24px;padding:4px 12px 4px 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="#4F46E5"/></svg></td><td style="padding:4px 0;font-size:14px;color:#374151;">Communication parents-enseignants</td></tr>
                    <tr><td valign="top" style="width:24px;padding:4px 12px 4px 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="#4F46E5"/></svg></td><td style="padding:4px 0;font-size:14px;color:#374151;">Assistant IA p&eacute;dagogique</td></tr>
                  </table>
                </td>
              </tr>
            </table>
            ${button("Acc&eacute;der &agrave; mon espace", loginUrl)}
            <p style="margin:0;font-size:13px;color:#6B7280;text-align:center;">
              Besoin d'aide ? Contactez-nous &agrave; <a href="mailto:support@educi.live" style="color:#4F46E5;text-decoration:none;">support@educi.live</a>
            </p>
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Bienvenue sur EduCI — Votre plateforme de gestion scolaire est pr\u00eate !"),
  };
}

export function verifyEmail(name: string, verifyUrl: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  return {
    subject: "Confirmez votre inscription \u2014 EduCI",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.email, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Confirmez votre inscription</h1>
            <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour <strong>${safeName}</strong>,
            </p>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Merci pour votre inscription sur EduCI. Veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous pour activer votre compte et acc&eacute;der &agrave; votre espace d'administration.
            </p>
            ${button("Confirmer mon inscription", verifyUrl)}
            ${infoBox("Ce lien expire dans <strong>24 heures</strong>. Si vous n'avez pas cr\u00e9\u00e9 de compte sur EduCI, vous pouvez ignorer cet email en toute s\u00e9curit\u00e9.")}
            <tr>
              <td style="padding:16px 0 0;">
                <p style="margin:0;font-size:13px;color:#6B7280;text-align:center;">
                  Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
                </p>
                <p style="margin:8px 0 0;text-align:center;">
                  <a href="${verifyUrl}" style="color:#4F46E5;font-size:12px;text-decoration:none;word-break:break-all;font-family:monospace;">${verifyUrl}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#F0F4FF,#EEF2FF);border-radius:10px;border:1px solid #E0E7FF;">
                  <tr>
                    <td style="padding:16px 20px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td valign="top" style="width:20px;padding-right:10px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM12 4.2L19 8.3V15.7L12 19.8L5 15.7V8.3L12 4.2Z" fill="#4F46E5"/><path d="M10 17L6 13L7.4 11.6L10 14.2L16.6 7.6L18 9L10 17Z" fill="#4F46E5"/></svg>
                          </td>
                          <td>
                            <p style="margin:0;font-size:12px;color:#4F46E5;line-height:1.5;font-weight:500;">
                              Ce lien pointe exclusivement vers <strong>educi.live/verification</strong> &mdash; le domaine officiel de la plateforme EduCI.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Confirmez votre inscription pour activer votre compte EduCI"),
  };
}

export function passwordReset(name: string, resetUrl: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  return {
    subject: "R\u00e9initialisation de mot de passe \u2014 EduCI",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.lock, 'linear-gradient(135deg,#FEF2F2,#FEE2E2)', '#DC2626')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">R\u00e9initialisation du mot de passe</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeName}, vous avez demand\u00e9 la r\u00e9initialisation de votre mot de passe.
            </p>
            ${button("R\u00e9initialiser mon mot de passe", resetUrl)}
            ${warningBox("Ce lien expire dans <strong>1 heure</strong>. Si vous n'avez pas fait cette demande, ignorez cet email \u2014 votre mot de passe ne sera pas modifi\u00e9.")}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "R\u00e9initialisez votre mot de passe EduCI"),
  };
}

export function passwordResetConfirmation(name: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  return {
    subject: "Mot de passe modifi\u00e9 avec succ\u00e8s \u2014 EduCI",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.check, 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', '#059669')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Mot de passe modifi\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeName}, votre mot de passe a \u00e9t\u00e9 modifi\u00e9 avec succ&egrave;s.
            </p>
            ${warningBox("Si vous n'avez pas effectu\u00e9 cette modification, contactez le support imm\u00e9diatement.")}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Votre mot de passe EduCI a \u00e9t\u00e9 modifi\u00e9"),
  };
}

export function loginConfirmation(name: string, deviceInfo: string, timestamp: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  const safeDevice = escapeHtml(deviceInfo);
  return {
    subject: "Nouvelle connexion d\u00e9tect\u00e9e \u2014 EduCI",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.login, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Nouvelle connexion</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeName}, une nouvelle connexion a \u00e9t\u00e9 d\u00e9tect\u00e9e sur votre compte.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Appareil :</strong> ${safeDevice}</p>
                  <p style="margin:0;font-size:14px;color:#374151;"><strong>Date :</strong> ${escapeHtml(timestamp)}</p>
                </td>
              </tr>
            </table>
            ${infoBox("Si ce n'\u00e9tait pas vous, r\u00e9initialisez votre mot de passe imm\u00e9diatement.")}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Une nouvelle connexion a \u00e9t\u00e9 d\u00e9tect\u00e9e sur votre compte EduCI"),
  };
}

// =====================================================
// SCHOOL TEMPLATES
// =====================================================

export function schoolCreated(adminName: string, schoolName: string, dashboardUrl: string): { subject: string; html: string } {
  const safeAdmin = escapeHtml(adminName);
  const safeSchool = escapeHtml(schoolName);
  return {
    subject: `\u00c9tablissement "${safeSchool}" cr\u00e9\u00e9 avec succ\u00e8s`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.school, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">\u00c9tablissement cr\u00e9\u00e9 !</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeAdmin}, votre &eacute;tablissement <strong>${safeSchool}</strong> a \u00e9t\u00e9 cr\u00e9\u00e9 avec succ&egrave;s.
            </p>
            ${button("Acc&eacute;der au tableau de bord", dashboardUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Votre &eacute;tablissement "${safeSchool}" est maintenant actif sur EduCI`),
  };
}

export function schoolActivated(adminName: string, schoolName: string, planName: string): { subject: string; html: string } {
  const safeAdmin = escapeHtml(adminName);
  const safeSchool = escapeHtml(schoolName);
  const safePlan = escapeHtml(planName);
  return {
    subject: `Abonnement activ\u00e9 \u2014 ${safeSchool}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.check, 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', '#059669')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Abonnement activ\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeAdmin}, l'abonnement <strong>${safePlan}</strong> pour <strong>${safeSchool}</strong> est maintenant actif.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                ${statBlock("Plan", safePlan)}
                ${statBlock("Statut", "Actif")}
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Votre abonnement ${safePlan} pour ${safeSchool} est actif`),
  };
}

export function trialEnding(adminName: string, schoolName: string, daysRemaining: number, upgradeUrl: string): { subject: string; html: string } {
  const safeAdmin = escapeHtml(adminName);
  const safeSchool = escapeHtml(schoolName);
  return {
    subject: `Essai gratuit se termine dans ${daysRemaining} jour(s) \u2014 ${safeSchool}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.clock, 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', '#EA580C')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Essai gratuit bient\u00f4t termin\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeAdmin}, votre essai gratuit pour <strong>${safeSchool}</strong> se termine dans <strong>${daysRemaining} jour(s)</strong>.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:10px;border:1px solid #FED7AA;">
              <tr>
                <td style="padding:16px 20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td valign="top" style="width:20px;padding-right:10px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="#EA580C"/></svg>
                      </td>
                      <td>
                        <p style="margin:0;font-size:13px;color:#9A3412;line-height:1.5;font-weight:500;">
                          Pour continuer &agrave; utiliser EduCI sans interruption, veuillez souscrire &agrave; un abonnement.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            ${button("Souscrire maintenant", upgradeUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Votre essai EduCI se termine bient\u00f4t \u2014 Souscrivez pour continuer`),
  };
}

export function trialExpired(adminName: string, schoolName: string, upgradeUrl: string): { subject: string; html: string } {
  const safeAdmin = escapeHtml(adminName);
  const safeSchool = escapeHtml(schoolName);
  return {
    subject: `Essai gratuit expir\u00e9 \u2014 ${safeSchool}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.warning, 'linear-gradient(135deg,#FEF2F2,#FEE2E2)', '#DC2626')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Essai gratuit expir\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeAdmin}, votre essai gratuit pour <strong>${safeSchool}</strong> a expir\u00e9.
            </p>
            ${warningBox("Certaines fonctionnalit\u00e9s sont d\u00e9sormais restreintes.")}
            ${button("Choisir un abonnement", upgradeUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Votre essai EduCI a expir\u00e9 \u2014 Choisissez un abonnement pour continuer"),
  };
}

export function subscriptionExpired(adminName: string, schoolName: string, renewalUrl: string): { subject: string; html: string } {
  const safeAdmin = escapeHtml(adminName);
  const safeSchool = escapeHtml(schoolName);
  return {
    subject: `Abonnement expir\u00e9 \u2014 ${safeSchool}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.warning, 'linear-gradient(135deg,#FEF2F2,#FEE2E2)', '#DC2626')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Abonnement expir\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeAdmin}, l'abonnement de <strong>${safeSchool}</strong> a expir\u00e9.
            </p>
            ${button("Renouveler l'abonnement", renewalUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Votre abonnement EduCI a expir\u00e9 \u2014 Renouvelez pour continuer"),
  };
}

// =====================================================
// TEACHER TEMPLATES
// =====================================================

export function teacherAccountCreated(teacherName: string, email: string, tempPassword: string, loginUrl: string): { subject: string; html: string } {
  const safeTeacher = escapeHtml(teacherName);
  const safeEmail = escapeHtml(email);
  return {
    subject: "Votre compte enseignant EduCI est pr\u00eat",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.book, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Compte enseignant cr\u00e9\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeTeacher}, votre compte EduCI a \u00e9t\u00e9 cr\u00e9\u00e9.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0 0 12px;font-size:14px;color:#374151;"><strong>Email :</strong> ${safeEmail}</p>
                  <p style="margin:0;font-size:14px;color:#374151;"><strong>Mot de passe temporaire :</strong> <code style="background:#E5E7EB;padding:4px 10px;border-radius:6px;font-size:13px;font-family:monospace;">${escapeHtml(tempPassword)}</code></p>
                </td>
              </tr>
            </table>
            ${warningBox("Changez votre mot de passe apr&egrave;s la premi&egrave;re connexion.")}
            ${button("Se connecter", loginUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Votre compte enseignant EduCI est pr\u00eat \u2014 Connectez-vous avec vos identifiants"),
  };
}

export function teacherInvitation(inviterName: string, schoolName: string, inviteUrl: string, expiresAt: string): { subject: string; html: string } {
  const safeInviter = escapeHtml(inviterName);
  const safeSchool = escapeHtml(schoolName);
  const safeExpires = escapeHtml(expiresAt);
  return {
    subject: `Invitation \u00e0 rejoindre ${safeSchool} sur EduCI`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.graduation, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Vous \u00eates invit\u00e9(e) !</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              <strong>${safeInviter}</strong> vous invite &agrave; rejoindre <strong>${safeSchool}</strong> sur EduCI en tant qu'enseignant(e).
            </p>
            ${button("Accepter l'invitation", inviteUrl)}
            ${infoBox(`Cette invitation expire le <strong>${safeExpires}</strong>.`)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Rejoignez ${safeSchool} sur EduCI \u2014 Invitation de ${safeInviter}`),
  };
}

// =====================================================
// PARENT TEMPLATES
// =====================================================

export function parentAccountCreated(parentName: string, email: string, tempPassword: string, loginUrl: string): { subject: string; html: string } {
  const safeParent = escapeHtml(parentName);
  const safeEmail = escapeHtml(email);
  return {
    subject: "Votre compte parent EduCI est pr\u00eat",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.family, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Compte parent cr\u00e9\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeParent}, votre compte EduCI a \u00e9t\u00e9 cr\u00e9\u00e9.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0 0 12px;font-size:14px;color:#374151;"><strong>Email :</strong> ${safeEmail}</p>
                  <p style="margin:0;font-size:14px;color:#374151;"><strong>Mot de passe temporaire :</strong> <code style="background:#E5E7EB;padding:4px 10px;border-radius:6px;font-size:13px;font-family:monospace;">${escapeHtml(tempPassword)}</code></p>
                </td>
              </tr>
            </table>
            ${button("Acc&eacute;der au portail parent", loginUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Votre compte parent EduCI est pr\u00eat \u2014 Acc\u00e9dez au suivi scolaire de vos enfants"),
  };
}

export function parentPortalAccess(parentName: string, childrenNames: string[], loginUrl: string): { subject: string; html: string } {
  const safeParent = escapeHtml(parentName);
  const childrenList = childrenNames.map(n => `<tr><td style="padding:6px 0;font-size:14px;color:#374151;">&bull; ${escapeHtml(n)}</td></tr>`).join("");
  return {
    subject: "Acc\u00e8s au portail parent \u2014 EduCI",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.family, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Portail parent activ\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeParent}, votre portail parent est maintenant actif.
            </p>
            <p style="margin:0 0 12px;font-size:15px;color:#374151;font-weight:600;">Vos enfants inscrits :</p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;">
              <tr>
                <td style="padding:16px 20px;">
                  ${childrenList}
                </td>
              </tr>
            </table>
            ${button("Acc&eacute;der au portail", loginUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Votre portail parent EduCI est actif \u2014 Suivez la scolarit\u00e9 de vos enfants"),
  };
}

// =====================================================
// STUDENT TEMPLATES
// =====================================================

export function studentAccountCreated(studentName: string, className: string, matricule: string, loginUrl: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeClass = escapeHtml(className);
  return {
    subject: "Votre compte \u00e9tudiant EduCI est pr\u00eat",
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.student, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Compte \u00e9tudiant cr\u00e9\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeStudent}, votre compte EduCI a \u00e9t\u00e9 cr\u00e9\u00e9.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0 0 12px;font-size:14px;color:#374151;"><strong>Classe :</strong> ${safeClass}</p>
                  <p style="margin:0;font-size:14px;color:#374151;"><strong>Matricule :</strong> <code style="background:#E5E7EB;padding:4px 10px;border-radius:6px;font-size:13px;font-family:monospace;">${escapeHtml(matricule)}</code></p>
                </td>
              </tr>
            </table>
            ${button("Acc&eacute;der &agrave; mon espace", loginUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, "Votre compte \u00e9tudiant EduCI est pr\u00eat \u2014 Acc\u00e9dez &agrave; vos notes et cours"),
  };
}

// =====================================================
// PAYMENT TEMPLATES
// =====================================================

export function paymentReceived(studentName: string, amount: number, paymentMethod: string, reference: string, schoolName: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeMethod = escapeHtml(paymentMethod);
  const safeRef = escapeHtml(reference);
  const safeSchool = escapeHtml(schoolName);
  return {
    subject: `Paiement re\u00e7u \u2014 ${amount.toLocaleString("fr-FR")} XOF`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.check, 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', '#059669')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Paiement re\u00e7u</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Votre paiement a \u00e9t\u00e9 enregistr\u00e9 avec succ&egrave;s.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#ECFDF5,#D1FAE5);border-radius:12px;border:1px solid #A7F3D0;">
              <tr>
                <td style="padding:24px;">
                  <p style="margin:0 0 4px;font-size:12px;color:#059669;text-transform:uppercase;letter-spacing:0.5px;">Montant pay\u00e9</p>
                  <p style="margin:0 0 20px;font-size:32px;font-weight:700;color:#059669;">${amount.toLocaleString("fr-FR")} XOF</p>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">\u00c9l&egrave;ve :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeStudent}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">\u00c9tablissement :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeSchool}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">M\u00e9thode :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeMethod}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">R\u00e9f\u00e9rence :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeRef}</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Paiement de ${amount.toLocaleString("fr-FR")} XOF re\u00e7u pour ${safeStudent}`),
  };
}

export function paymentPending(studentName: string, amount: number, dueDate: string, payUrl: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeDue = escapeHtml(dueDate);
  return {
    subject: `Paiement en attente \u2014 ${amount.toLocaleString("fr-FR")} XOF`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.clock, 'linear-gradient(135deg,#FEFCE8,#FEF9C3)', '#CA8A04')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Paiement en attente</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Un paiement de <strong>${amount.toLocaleString("fr-FR")} XOF</strong> est en attente pour ${safeStudent}.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#FEFCE8,#FEF9C3);border-radius:10px;border:1px solid #FDE68A;">
              <tr>
                <td style="padding:16px 20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td valign="top" style="width:20px;padding-right:10px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#CA8A04"/></svg>
                      </td>
                      <td>
                        <p style="margin:0;font-size:13px;color:#92400E;line-height:1.5;font-weight:500;">
                          Date limite : <strong>${safeDue}</strong>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            ${button("Effectuer le paiement", payUrl)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Paiement en attente pour ${studentName} \u2014 \u00c9ch\u00e9ance le ${dueDate}`),
  };
}

export function paymentFailed(studentName: string, amount: number, reason: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeReason = escapeHtml(reason);
  return {
    subject: `Paiement \u00e9chou\u00e9 \u2014 ${amount.toLocaleString("fr-FR")} XOF`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.noAbsence, 'linear-gradient(135deg,#FEF2F2,#FEE2E2)', '#DC2626')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Paiement \u00e9chou\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Le paiement de <strong>${amount.toLocaleString("fr-FR")} XOF</strong> pour ${safeStudent} a \u00e9chou\u00e9.
            </p>
            ${warningBox(`<strong>Raison :</strong> ${safeReason}`)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Paiement de ${amount.toLocaleString("fr-FR")} XOF \u00e9chou\u00e9 pour ${studentName}`),
  };
}

export function paymentRefunded(studentName: string, amount: number, reference: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeRef = escapeHtml(reference);
  return {
    subject: `Remboursement effectu\u00e9 \u2014 ${amount.toLocaleString("fr-FR")} XOF`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.refund, 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', '#059669')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Remboursement effectu\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Un remboursement de <strong>${amount.toLocaleString("fr-FR")} XOF</strong> a \u00e9t\u00e9 effectu\u00e9 pour ${safeStudent}.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#ECFDF5,#D1FAE5);border-radius:10px;border:1px solid #A7F3D0;">
              <tr>
                <td style="padding:16px 20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td valign="top" style="width:20px;padding-right:10px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 15L12 20L7 15H10V10H14V15H17Z" fill="#059669"/></svg>
                      </td>
                      <td>
                        <p style="margin:0;font-size:13px;color:#065F46;line-height:1.5;">
                          <strong>R\u00e9f\u00e9rence :</strong> ${safeRef}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Remboursement de ${amount.toLocaleString("fr-FR")} XOF effectu\u00e9 pour ${studentName}`),
  };
}

// =====================================================
// GRADE / BULLETIN TEMPLATES
// =====================================================

export function newGrade(studentName: string, subject: string, score: number, maxScore: number, periodName: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeSubject = escapeHtml(subject);
  const safePeriod = escapeHtml(periodName);
  const pct = Math.round((score / maxScore) * 100);
  const color = pct >= 75 ? "#059669" : pct >= 50 ? "#CA8A04" : "#DC2626";
  const bgColor = pct >= 75 ? "linear-gradient(135deg,#ECFDF5,#D1FAE5)" : pct >= 50 ? "linear-gradient(135deg,#FEFCE8,#FEF9C3)" : "linear-gradient(135deg,#FEF2F2,#FEE2E2)";
  const borderColor = pct >= 75 ? "#A7F3D0" : pct >= 50 ? "#FDE68A" : "#FECACA";
  return {
    subject: `Nouvelle note \u2014 ${safeSubject} : ${score}/${maxScore}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.chart, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Nouvelle note</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Une nouvelle note a \u00e9t\u00e9 publi\u00e9e pour <strong>${safeStudent}</strong>.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${bgColor};border-radius:12px;border:1px solid ${borderColor};">
              <tr>
                <td style="padding:24px;">
                  <p style="margin:0 0 4px;font-size:12px;color:${color};text-transform:uppercase;letter-spacing:0.5px;">Note</p>
                  <p style="margin:0 0 20px;font-size:32px;font-weight:700;color:${color};">${score}/${maxScore}</p>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Mati&egrave;re :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeSubject}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">P\u00e9riode :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safePeriod}</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Nouvelle note en ${subject} pour ${studentName}: ${score}/${maxScore}`),
  };
}

export function bulletinAvailable(studentName: string, className: string, periodName: string, generalAverage: number, mention: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeClass = escapeHtml(className);
  const safePeriod = escapeHtml(periodName);
  const safeMention = escapeHtml(mention);
  return {
    subject: `Bulletin disponible \u2014 ${safePeriod}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.book, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Bulletin scolaire</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Le bulletin de <strong>${safeStudent}</strong> est maintenant disponible.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:12px;border:1px solid #F3F4F6;">
              <tr>
                ${statBlock("Classe", safeClass)}
                ${statBlock("Moyenne", `${generalAverage}/20`)}
                ${statBlock("Mention", safeMention)}
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Bulletin de ${safeStudent} disponible \u2014 ${safePeriod}: ${generalAverage}/20 (${safeMention})`),
  };
}

// =====================================================
// ATTENDANCE TEMPLATES
// =====================================================

export function absenceNotification(studentName: string, date: string, className: string, parentName: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeDate = escapeHtml(date);
  const safeClass = escapeHtml(className);
  const safeParent = escapeHtml(parentName);
  return {
    subject: `Absence signal\u00e9e \u2014 ${safeStudent} le ${safeDate}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.noAbsence, 'linear-gradient(135deg,#FEF2F2,#FEE2E2)', '#DC2626')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Absence signal\u00e9e</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeParent}, une absence a \u00e9t\u00e9 signal\u00e9e.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#FEF2F2,#FEE2E2);border-radius:10px;border:1px solid #FECACA;">
              <tr>
                <td style="padding:20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;\u00c9l&egrave;ve :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeStudent}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Classe :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeClass}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Date :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeDate}</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Absence de ${studentName} le ${date}`),
  };
}

export function lateArrival(studentName: string, date: string, lateMinutes: number, parentName: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeDate = escapeHtml(date);
  const safeParent = escapeHtml(parentName);
  return {
    subject: `Retard signal\u00e9 \u2014 ${safeStudent} (${lateMinutes} min)`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.clock, 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', '#EA580C')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Retard signal\u00e9</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeParent}, un retard a \u00e9t\u00e9 signal\u00e9.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:10px;border:1px solid #FED7AA;">
              <tr>
                <td style="padding:20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;\u00c9l&egrave;ve :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeStudent}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Date :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeDate}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Retard :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${lateMinutes} minutes</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Retard de ${studentName} \u2014 ${lateMinutes} minutes le ${date}`),
  };
}

// =====================================================
// NOTIFICATION TEMPLATES
// =====================================================

export function newAnnouncement(schoolName: string, title: string, message: string, recipientName: string): { subject: string; html: string } {
  const safeSchool = escapeHtml(schoolName);
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const safeRecipient = escapeHtml(recipientName);
  return {
    subject: `Nouvelle annonce \u2014 ${safeTitle}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.megaphone, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Nouvelle annonce</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeRecipient}, une nouvelle annonce a \u00e9t\u00e9 publi\u00e9e par <strong>${safeSchool}</strong>.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#4F46E5,#7C3AED);border-radius:12px;">
              <tr>
                <td style="padding:24px;">
                  <p style="margin:0 0 10px;font-size:18px;font-weight:700;color:#FFFFFF;">${safeTitle}</p>
                  <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.9);line-height:1.6;">${safeMessage}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Nouvelle annonce de ${schoolName}: ${title}`),
  };
}

export function newMessage(senderName: string, preview: string): { subject: string; html: string } {
  const safeSender = escapeHtml(senderName);
  const safePreview = escapeHtml(preview);
  return {
    subject: `Nouveau message de ${safeSender} \u2014 EduCI`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.chat, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Nouveau message</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              <strong>${safeSender}</strong> vous a envoy\u00e9 un message.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;border-left:4px solid #4F46E5;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0;font-size:14px;color:#6B7280;line-height:1.6;font-style:italic;">"${safePreview}"</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Nouveau message de ${senderName}`),
  };
}

// =====================================================
// NEW RESOURCE TEMPLATE
// =====================================================

export function newResource(studentName: string, resourceName: string, subjectName: string, teacherName: string): { subject: string; html: string } {
  const safeStudent = escapeHtml(studentName);
  const safeResource = escapeHtml(resourceName);
  const safeSubject = escapeHtml(subjectName);
  const safeTeacher = escapeHtml(teacherName);
  return {
    subject: `Nouvelle ressource \u2014 ${safeSubject}`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.resource, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Nouvelle ressource</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              Bonjour ${safeStudent}, une nouvelle ressource est disponible.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;">
              <tr>
                <td style="padding:20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Ressource :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeResource}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Mati&egrave;re :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeSubject}</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;">Enseignant :</td><td style="padding:6px 0;font-size:14px;color:#111827;font-weight:500;text-align:right;">${safeTeacher}</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Nouvelle ressource disponible en ${subjectName}`),
  };
}

// =====================================================
// INVITATION TEMPLATE
// =====================================================

export function invitationEmail(
  inviterName: string,
  schoolName: string,
  role: string,
  inviteUrl: string,
  expiresAt: string
): { subject: string; html: string } {
  const safeInviter = escapeHtml(inviterName);
  const safeSchool = escapeHtml(schoolName);
  const safeRole = escapeHtml(role);
  const safeExpires = escapeHtml(expiresAt);
  return {
    subject: `Invitation \u00e0 rejoindre ${safeSchool} \u2014 EduCI`,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.graduation, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Vous \u00eates invit\u00e9(e) !</h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">
              <strong>${safeInviter}</strong> vous invite &agrave; rejoindre <strong>${safeSchool}</strong> sur EduCI en tant que <strong>${safeRole}</strong>.
            </p>
            ${button("Accepter l'invitation", inviteUrl)}
            ${infoBox(`Cette invitation expire le <strong>${safeExpires}</strong>.`)}
          </td>
        </tr>
      `)}
      ${footer()}
    `, `Invitation de ${safeInviter} \u00e0 rejoindre ${safeSchool} en tant que ${safeRole}`),
  };
}

// =====================================================
// GENERIC / CUSTOM TEMPLATE
// =====================================================

export function customEmail(title: string, body: string, ctaLabel?: string, ctaUrl?: string): { subject: string; html: string } {
  const safeTitle = escapeHtml(title);
  const safeBody = escapeHtml(body);
  return {
    subject: safeTitle,
    html: baseLayout(`
      ${header()}
      ${card(`
        ${iconCircle(SVG_ICON.megaphone, 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', '#4F46E5')}
        <tr>
          <td>
            <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">${safeTitle}</h1>
            <div style="font-size:15px;line-height:1.7;color:#6B7280;">${safeBody}</div>
            ${ctaLabel && ctaUrl ? button(ctaLabel, ctaUrl) : ""}
          </td>
        </tr>
      `)}
      ${footer()}
    `, title),
  };
}

// =====================================================
// TEMPLATE REGISTRY
// =====================================================

export type EmailTemplateType =
  | "welcome"
  | "verify_email"
  | "password_reset"
  | "password_reset_confirmation"
  | "login_confirmation"
  | "school_created"
  | "school_activated"
  | "trial_ending"
  | "trial_expired"
  | "subscription_expired"
  | "teacher_account_created"
  | "teacher_invitation"
  | "parent_account_created"
  | "parent_portal_access"
  | "student_account_created"
  | "payment_received"
  | "payment_pending"
  | "payment_failed"
  | "payment_refunded"
  | "new_grade"
  | "bulletin_available"
  | "absence"
  | "late"
  | "new_announcement"
  | "new_message"
  | "new_resource"
  | "invitation"
  | "custom";

export function getEmailSubject(type: EmailTemplateType): string {
  const subjects: Record<string, string> = {
    welcome: "Bienvenue sur EduCI !",
    verify_email: "Confirmez votre inscription \u2014 EduCI",
    password_reset: "R\u00e9initialisation de mot de passe \u2014 EduCI",
    password_reset_confirmation: "Mot de passe modifi\u00e9 \u2014 EduCI",
    login_confirmation: "Nouvelle connexion \u2014 EduCI",
    school_created: "\u00c9tablissement cr\u00e9\u00e9 \u2014 EduCI",
    school_activated: "Abonnement activ\u00e9 \u2014 EduCI",
    trial_ending: "Essai gratuit bient\u00f4t termin\u00e9 \u2014 EduCI",
    trial_expired: "Essai gratuit expir\u00e9 \u2014 EduCI",
    subscription_expired: "Abonnement expir\u00e9 \u2014 EduCI",
    teacher_account_created: "Compte enseignant cr\u00e9\u00e9 \u2014 EduCI",
    teacher_invitation: "Invitation enseignant \u2014 EduCI",
    parent_account_created: "Compte parent cr\u00e9\u00e9 \u2014 EduCI",
    parent_portal_access: "Portail parent activ\u00e9 \u2014 EduCI",
    student_account_created: "Compte \u00e9tudiant cr\u00e9\u00e9 \u2014 EduCI",
    payment_received: "Paiement re\u00e7u \u2014 EduCI",
    payment_pending: "Paiement en attente \u2014 EduCI",
    payment_failed: "Paiement \u00e9chou\u00e9 \u2014 EduCI",
    payment_refunded: "Remboursement \u2014 EduCI",
    new_grade: "Nouvelle note \u2014 EduCI",
    bulletin_available: "Bulletin disponible \u2014 EduCI",
    absence: "Absence signal\u00e9e \u2014 EduCI",
    late: "Retard signal\u00e9 \u2014 EduCI",
    new_announcement: "Nouvelle annonce \u2014 EduCI",
    new_message: "Nouveau message \u2014 EduCI",
    new_resource: "Nouvelle ressource \u2014 EduCI",
    invitation: "Invitation \u2014 EduCI",
    custom: "EduCI",
  };
  return subjects[type] || "EduCI";
}
