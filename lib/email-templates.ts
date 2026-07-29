/**
 * Branded HTML email templates.
 * All templates use inline styles (required for email clients).
 * Brand: white background, blue gradient accents, building logo.
 */

const COMPANY = {
  name: 'Idoko C Idoko Consulting',
  tagline: 'Estate Surveyors & Valuers · Property Managers · Agency',
  phone: '0813 398 8976',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@idokoconsulting.com',
  address: 'No 75 Chime Avenue, New Heaven, Enugu',
  website: process.env.NEXT_PUBLIC_SITE_URL || 'https://idokoconsulting.com',
};

/**
 * Logo as inline SVG (renders in most modern email clients).
 */
const LOGO_SVG = `
<svg width="48" height="48" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="display:block;">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1e3568"/>
      <stop offset="55%" stop-color="#2557eb"/>
      <stop offset="100%" stop-color="#5e96fa"/>
    </linearGradient>
  </defs>
  <path d="M14 18 L14 56 L26 56 L26 24 L20 18 Z" fill="url(#g)"/>
  <path d="M26 26 L26 56 L40 56 L40 12 L33 6 L26 12 Z" fill="url(#g)" opacity="0.92"/>
  <path d="M40 22 L40 56 L52 56 L52 28 L46 22 Z" fill="url(#g)" opacity="0.85"/>
</svg>
`.trim();

/**
 * Base wrapper used by every email.
 */
function wrap(opts: { preheader: string; heroTitle: string; heroSubtitle?: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${opts.heroTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0b1020;-webkit-font-smoothing:antialiased;">
  <!-- Preheader (preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f6f7f9;opacity:0;">
    ${opts.preheader}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f7f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
          <!-- Hero -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3568 0%,#2557eb 60%,#3b76f6 100%);padding:32px;color:#ffffff;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:14px;vertical-align:middle;">
                          <div style="background:#ffffff;border-radius:12px;padding:6px;display:inline-block;line-height:0;">
                            ${LOGO_SVG}
                          </div>
                        </td>
                        <td style="vertical-align:middle;">
                          <div style="font-size:14px;font-weight:700;letter-spacing:-0.01em;line-height:1.2;">IDOKO C IDOKO</div>
                          <div style="font-size:10px;font-weight:700;letter-spacing:0.28em;color:#bfd6fe;">CONSULTING</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;padding:5px 10px;background:rgba(255,255,255,0.15);border-radius:999px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#ffffff;font-weight:600;">Estate Valuers</span>
                  </td>
                </tr>
              </table>

              <h1 style="margin:36px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-0.02em;">
                ${opts.heroTitle}
              </h1>
              ${opts.heroSubtitle ? `<p style="margin:10px 0 0 0;font-size:14px;color:#dbe8fe;line-height:1.5;">${opts.heroSubtitle}</p>` : ''}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 36px 24px 36px;font-size:15px;line-height:1.65;color:#0b1020;">
              ${opts.body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px 32px 36px;border-top:1px solid #eceef2;background:#fafbfc;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size:12px;line-height:1.7;color:#67738f;">
                    <strong style="color:#0b1020;">${COMPANY.name}</strong><br />
                    ${COMPANY.tagline}<br /><br />
                    📍 ${COMPANY.address}<br />
                    📞 <a href="tel:${COMPANY.phone.replace(/\s/g, '')}" style="color:#2557eb;text-decoration:none;">${COMPANY.phone}</a> &nbsp;·&nbsp;
                    ✉️ <a href="mailto:${COMPANY.email}" style="color:#2557eb;text-decoration:none;">${COMPANY.email}</a><br />
                    🌐 <a href="${COMPANY.website}" style="color:#2557eb;text-decoration:none;">${COMPANY.website.replace(/^https?:\/\//, '')}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;font-size:11px;color:#8691a9;border-top:1px dashed #eceef2;margin-top:14px;">
                    <div style="padding-top:14px;">
                      Idoko Chinelo Ifeyinwa — Principal Valuer<br />
                      © ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(label: string, href: string) {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td style="background:#1d44d8;border-radius:999px;">
      <a href="${href}" style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;">${label}</a>
    </td>
  </tr>
</table>`;
}

function infoBox(rows: { label: string; value: string }[]) {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:18px 0;background:#f6f7f9;border-radius:12px;border:1px solid #eceef2;">
  <tr><td style="padding:20px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${rows.map((r, i) => `
        <tr>
          <td style="padding:${i === 0 ? '0' : '10px'} 0 ${i === rows.length - 1 ? '0' : '10px'} 0;font-size:12px;color:#67738f;text-transform:uppercase;letter-spacing:0.08em;width:40%;">
            ${r.label}
          </td>
          <td style="padding:${i === 0 ? '0' : '10px'} 0 ${i === rows.length - 1 ? '0' : '10px'} 0;font-size:14px;color:#0b1020;font-weight:600;">
            ${r.value}
          </td>
        </tr>`).join('')}
    </table>
  </td></tr>
</table>`;
}

// =================================================================
// Templates
// =================================================================

export interface RequestEmailData {
  reference: string;
  full_name: string;
  email: string;
  phone?: string;
  service_name?: string;
  property_type?: string;
  property_address?: string;
  property_purpose?: string;
  notes?: string;
}

/**
 * Sent to the CLIENT after they submit a service request.
 */
export function clientRequestReceived(data: RequestEmailData) {
  const body = `
    <p style="margin:0 0 16px 0;">Hello <strong>${data.full_name}</strong>,</p>
    <p style="margin:0 0 16px 0;">
      Thank you for reaching out to ${COMPANY.name}. We have received your service request and our team is reviewing the details.
    </p>
    <p style="margin:0 0 8px 0;">
      You will hear from us within <strong>24 business hours</strong> with a tailored quotation and the next steps.
    </p>

    ${infoBox([
      { label: 'Reference', value: data.reference },
      { label: 'Service', value: data.service_name || '—' },
      { label: 'Property', value: data.property_type || '—' },
      { label: 'Address', value: data.property_address || '—' },
      { label: 'Purpose', value: data.property_purpose || '—' },
    ])}

    <p style="margin:24px 0 12px 0;font-size:13px;color:#67738f;">
      Please keep this reference handy — we&apos;ll quote it in all correspondence.
    </p>

    <hr style="border:0;border-top:1px solid #eceef2;margin:24px 0;" />

    <p style="margin:0 0 8px 0;font-size:13px;color:#67738f;">
      Need to reach us sooner? Reply to this email, call <a href="tel:${COMPANY.phone.replace(/\s/g,'')}" style="color:#2557eb;text-decoration:none;font-weight:600;">${COMPANY.phone}</a>, or message us on
      <a href="https://wa.me/2348133988976" style="color:#2557eb;text-decoration:none;font-weight:600;">WhatsApp</a>.
    </p>
  `;

  return {
    subject: `Request received · ${data.reference}`,
    html: wrap({
      preheader: `Your request ${data.reference} has been received. We'll respond within 24 hours.`,
      heroTitle: 'Request Received',
      heroSubtitle: `We&apos;ll review your details and respond within 24 business hours.`,
      body,
    }),
  };
}

/**
 * Sent to the ADMIN whenever a new request comes in.
 */
export function adminNewRequest(data: RequestEmailData & { admin_url: string }) {
  const body = `
    <p style="margin:0 0 16px 0;">A new service request has just been submitted via the website.</p>

    ${infoBox([
      { label: 'Reference', value: data.reference },
      { label: 'Client', value: data.full_name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone || '—' },
      { label: 'Service', value: data.service_name || '—' },
      { label: 'Property', value: `${data.property_type || '—'} — ${data.property_address || '—'}` },
      { label: 'Purpose', value: data.property_purpose || '—' },
    ])}

    ${data.notes ? `
      <div style="margin:18px 0;padding:16px 18px;background:#fffbeb;border-radius:10px;border:1px solid #fde68a;">
        <div style="font-size:11px;color:#92400e;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Client notes</div>
        <div style="font-size:14px;color:#451a03;line-height:1.5;">${data.notes}</div>
      </div>
    ` : ''}

    ${button('Open in Admin Dashboard', data.admin_url)}

    <p style="margin:0;font-size:13px;color:#67738f;">
      Tip: review the request, set a quote, and update the status — the client will see status changes in their email confirmations.
    </p>
  `;

  return {
    subject: `🆕 New ${data.service_name || 'service'} request — ${data.full_name}`,
    html: wrap({
      preheader: `New request from ${data.full_name} for ${data.service_name || 'a service'}.`,
      heroTitle: 'New Request',
      heroSubtitle: `From ${data.full_name} — ${data.service_name || 'service request'}.`,
      body,
    }),
  };
}

/**
 * Sent to CLIENT after they pay for a consultation.
 */
export function clientConsultationConfirmed(data: {
  full_name: string;
  reference: string;
  preferred_date?: string;
  preferred_time?: string;
  topic?: string;
  amount: number;
}) {
  const body = `
    <p style="margin:0 0 16px 0;">Hello <strong>${data.full_name}</strong>,</p>
    <p style="margin:0 0 16px 0;">
      Your consultation booking is confirmed and your payment of
      <strong style="color:#1d44d8;">₦${data.amount.toLocaleString()}</strong> has been received.
    </p>

    ${infoBox([
      { label: 'Reference', value: data.reference },
      { label: 'Preferred Date', value: data.preferred_date || '—' },
      { label: 'Preferred Time', value: data.preferred_time || '—' },
      { label: 'Topic', value: data.topic || '—' },
      { label: 'Amount Paid', value: `₦${data.amount.toLocaleString()}` },
    ])}

    <p style="margin:18px 0 12px 0;">
      Our principal consultant will reach out shortly with the meeting details. If you have documents to share in advance, simply reply to this email and attach them.
    </p>

    <p style="margin:0;font-size:13px;color:#67738f;">
      Need to reschedule? Just reply — we&apos;ll find another time that works.
    </p>
  `;

  return {
    subject: `Consultation confirmed · ${data.reference}`,
    html: wrap({
      preheader: `Your consultation is confirmed for ${data.preferred_date || 'soon'}.`,
      heroTitle: 'Consultation Confirmed ✓',
      heroSubtitle: `We look forward to speaking with you.`,
      body,
    }),
  };
}

/**
 * Sent to ADMIN when a consultation is paid.
 */
export function adminConsultationPaid(data: {
  full_name: string;
  email: string;
  phone?: string;
  reference: string;
  preferred_date?: string;
  preferred_time?: string;
  topic?: string;
  amount: number;
  admin_url: string;
}) {
  const body = `
    <p style="margin:0 0 16px 0;">A new consultation has been booked and paid for.</p>

    ${infoBox([
      { label: 'Reference', value: data.reference },
      { label: 'Client', value: data.full_name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone || '—' },
      { label: 'Date', value: `${data.preferred_date || '—'} ${data.preferred_time || ''}` },
      { label: 'Topic', value: data.topic || '—' },
      { label: 'Amount Paid', value: `₦${data.amount.toLocaleString()}` },
    ])}

    ${button('Open in Admin Dashboard', data.admin_url)}
  `;

  return {
    subject: `💰 Consultation paid — ${data.full_name}`,
    html: wrap({
      preheader: `${data.full_name} just paid for a consultation.`,
      heroTitle: 'Consultation Paid',
      heroSubtitle: `${data.full_name} · ₦${data.amount.toLocaleString()}`,
      body,
    }),
  };
}

/**
 * Sent to CLIENT when admin sends a quotation + payment link.
 */
export function clientQuotationSent(data: {
  full_name: string;
  reference: string;
  service_name: string;
  quoted_amount: number;
  payment_url: string;
  admin_notes?: string;
}) {
  const body = `
    <p style="margin:0 0 16px 0;">Hello <strong>${data.full_name}</strong>,</p>
    <p style="margin:0 0 16px 0;">
      Thank you for your patience. We have reviewed your request <strong>${data.reference}</strong> and prepared a quotation for the work.
    </p>

    ${infoBox([
      { label: 'Service', value: data.service_name },
      { label: 'Reference', value: data.reference },
      { label: 'Quoted Amount', value: `₦${data.quoted_amount.toLocaleString()}` },
    ])}

    ${data.admin_notes ? `
      <div style="margin:18px 0;padding:16px 18px;background:#eff5ff;border-radius:10px;border:1px solid #bfd6fe;">
        <div style="font-size:11px;color:#1e3a8a;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Notes from our team</div>
        <div style="font-size:14px;color:#1e3a8a;line-height:1.55;">${data.admin_notes}</div>
      </div>
    ` : ''}

    <p style="margin:18px 0;">
      To proceed, please complete payment securely below. Work begins immediately after payment is confirmed.
    </p>

    ${button(`Pay ₦${data.quoted_amount.toLocaleString()} Securely`, data.payment_url)}

    <p style="margin:18px 0 0 0;font-size:13px;color:#67738f;">
      Payment is processed by Paystack. You can pay with card, bank transfer, USSD, or QR code.
    </p>
  `;

  return {
    subject: `Quotation for ${data.reference} — ₦${data.quoted_amount.toLocaleString()}`,
    html: wrap({
      preheader: `Your quotation for ${data.service_name} is ready: ₦${data.quoted_amount.toLocaleString()}.`,
      heroTitle: 'Your Quotation is Ready',
      heroSubtitle: `Pay securely to begin the work.`,
      body,
    }),
  };
}

/**
 * Sent to CLIENT when their final report is ready.
 */
export function clientReportReady(data: {
  full_name: string;
  reference: string;
  report_url: string;
}) {
  const body = `
    <p style="margin:0 0 16px 0;">Hello <strong>${data.full_name}</strong>,</p>
    <p style="margin:0 0 16px 0;">
      We are pleased to confirm that your report for <strong>${data.reference}</strong> is now ready. You can download it using the link below.
    </p>

    ${button('Download Your Report', data.report_url)}

    <p style="margin:24px 0 12px 0;">
      The report is signed and stamped by your Principal Valuer, and is acceptable for the purpose stated in your request.
    </p>

    <p style="margin:0;font-size:13px;color:#67738f;">
      If you need a hardcopy delivered or a clarification on any section, just reply to this email.
    </p>
  `;

  return {
    subject: `Your report is ready · ${data.reference}`,
    html: wrap({
      preheader: `Your final report for ${data.reference} is ready to download.`,
      heroTitle: 'Your Report is Ready ✓',
      heroSubtitle: `Signed, stamped, and delivered.`,
      body,
    }),
  };
}

/**
 * Sent to ADMIN when someone fills the contact form.
 */
export function adminContactMessage(data: {
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const body = `
    <p style="margin:0 0 16px 0;">A new message has come in via the website contact form.</p>

    ${infoBox([
      { label: 'From', value: data.full_name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone || '—' },
      { label: 'Subject', value: data.subject || '—' },
    ])}

    <div style="margin:18px 0;padding:18px;background:#f6f7f9;border-left:4px solid #2557eb;border-radius:4px;">
      <div style="font-size:11px;color:#67738f;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Message</div>
      <div style="font-size:14px;color:#0b1020;line-height:1.6;white-space:pre-wrap;">${data.message}</div>
    </div>
  `;

  return {
    subject: `📬 ${data.subject || 'New message'} — ${data.full_name}`,
    html: wrap({
      preheader: `Message from ${data.full_name}`,
      heroTitle: 'New Contact Message',
      heroSubtitle: `From ${data.full_name}`,
      body,
    }),
  };
}
