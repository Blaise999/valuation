import { emailLayout, btn, detailsTable, infoBox, fmtNaira } from './_layout';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://idokoconsulting.com';

/* ============================================================
 * 1. CLIENT — Request received (after submit on /request-valuation)
 * ============================================================ */
export function tplRequestReceived(args: {
  full_name: string;
  reference: string;
  service_name: string;
  property_address: string;
  property_purpose: string;
}) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0b1020;letter-spacing:-0.01em;">Hello ${args.full_name.split(' ')[0]},</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#434b60;">
      Thank you for reaching out to Idoko C Idoko Consulting. We&rsquo;ve received your service request and our team is reviewing the details now.
    </p>

    ${detailsTable([
      { label: 'Reference', value: `<span style="font-family:'SF Mono',Menlo,monospace;color:#1d44d8;">${args.reference}</span>` },
      { label: 'Service', value: args.service_name },
      { label: 'Property', value: args.property_address || '—' },
      { label: 'Purpose', value: args.property_purpose || '—' },
    ])}

    <h3 style="margin:24px 0 10px;font-size:14px;color:#0b1020;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">What happens next</h3>
    <ol style="margin:0 0 20px;padding-left:20px;font-size:13px;line-height:1.8;color:#434b60;">
      <li>We review your request within 24 business hours.</li>
      <li>We send a written quotation by email.</li>
      <li>You pay securely with Paystack.</li>
      <li>Site inspection scheduled and completed.</li>
      <li>Final report delivered to your inbox.</li>
    </ol>

    ${infoBox(`<strong>Need to add documents?</strong> Reply to this email or message us on WhatsApp at <a href="https://wa.me/2348133988976" style="color:#1d44d8;">+234 813 398 8976</a>.`)}

    <p style="margin:28px 0 0;font-size:13px;color:#67738f;">
      Warm regards,<br/>
      <strong style="color:#0b1020;">The Idoko Consulting team</strong>
    </p>
  `;

  return emailLayout({
    title: `Request Received — ${args.reference}`,
    preheader: `We&rsquo;ve received your ${args.service_name} request. Reference ${args.reference}.`,
    body,
  });
}

/* ============================================================
 * 2. ADMIN — New request alert
 * ============================================================ */
export function tplRequestReceivedAdmin(args: {
  full_name: string;
  email: string;
  phone: string;
  reference: string;
  service_name: string;
  property_type: string;
  property_address: string;
  property_purpose: string;
  notes: string;
  documents_count: number;
  request_id: string;
}) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0b1020;">📥 New service request</h1>
    <p style="margin:0 0 18px;font-size:14px;color:#67738f;">A client just submitted a request via the website.</p>

    ${detailsTable([
      { label: 'Reference', value: `<span style="font-family:monospace;color:#1d44d8;">${args.reference}</span>` },
      { label: 'Client', value: args.full_name },
      { label: 'Email', value: `<a href="mailto:${args.email}" style="color:#1d44d8;">${args.email}</a>` },
      { label: 'Phone', value: `<a href="tel:${args.phone}" style="color:#1d44d8;">${args.phone}</a>` },
      { label: 'Service', value: args.service_name },
      { label: 'Property type', value: args.property_type || '—' },
      { label: 'Address', value: args.property_address || '—' },
      { label: 'Purpose', value: args.property_purpose || '—' },
      { label: 'Documents', value: `${args.documents_count} file(s) attached` },
    ])}

    ${args.notes ? `<p style="margin:18px 0;font-size:13px;color:#434b60;"><strong>Client notes:</strong><br/>${args.notes.replace(/\n/g, '<br/>')}</p>` : ''}

    <p style="margin:24px 0;">${btn('Open in Admin Dashboard →', `${SITE}/admin/requests/${args.request_id}`)}</p>

    ${infoBox(`<strong>Action required:</strong> Review the submission and send a quotation within 24 hours.`, 'amber')}
  `;

  return emailLayout({
    title: `New request — ${args.full_name}`,
    preheader: `${args.full_name} requested ${args.service_name} for ${args.property_address}`,
    body,
  });
}

/* ============================================================
 * 3. CLIENT — Quote sent (admin sends manual quote)
 * ============================================================ */
export function tplQuoteSent(args: {
  full_name: string;
  reference: string;
  service_name: string;
  quoted_amount: number;
  payment_link: string;
  notes?: string;
}) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0b1020;">Your quotation is ready</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#434b60;">
      Hello ${args.full_name.split(' ')[0]}, we&rsquo;ve reviewed your request and prepared a quotation.
    </p>

    ${detailsTable([
      { label: 'Reference', value: `<span style="font-family:monospace;color:#1d44d8;">${args.reference}</span>` },
      { label: 'Service', value: args.service_name },
      { label: 'Quoted fee', value: `<span style="color:#1d44d8;font-size:18px;">${fmtNaira(args.quoted_amount)}</span>` },
    ])}

    ${args.notes ? `<div style="margin:18px 0;padding:14px 18px;background:#f6f7f9;border-radius:12px;font-size:13px;color:#434b60;line-height:1.6;"><strong style="color:#0b1020;">Notes from our team:</strong><br/>${args.notes.replace(/\n/g, '<br/>')}</div>` : ''}

    <p style="margin:0 0 12px;font-size:14px;color:#434b60;">
      Once we receive payment we&rsquo;ll schedule the site inspection and begin work immediately.
    </p>

    <p style="margin:24px 0;">${btn(`Pay ${fmtNaira(args.quoted_amount)} Securely →`, args.payment_link)}</p>

    ${infoBox(`Payment is processed by <strong>Paystack</strong> — supports cards, bank transfer, USSD, and bank apps.`)}
  `;

  return emailLayout({
    title: `Quotation — ${args.reference}`,
    preheader: `Your ${args.service_name} quotation: ${fmtNaira(args.quoted_amount)}`,
    body,
  });
}

/* ============================================================
 * 4. CLIENT — Payment confirmed
 * ============================================================ */
export function tplPaymentReceived(args: {
  full_name: string;
  reference: string;
  amount: number;
  service_name: string;
  payment_reference: string;
}) {
  const body = `
    <div style="text-align:center;margin:0 0 28px;">
      <div style="display:inline-block;width:64px;height:64px;line-height:64px;border-radius:9999px;background:#ecfdf5;color:#059669;font-size:28px;font-weight:700;text-align:center;">✓</div>
      <h1 style="margin:18px 0 6px;font-size:24px;font-weight:700;color:#0b1020;">Payment confirmed</h1>
      <p style="margin:0;font-size:14px;color:#67738f;">Thank you, ${args.full_name.split(' ')[0]}. We&rsquo;ve received your payment.</p>
    </div>

    ${detailsTable([
      { label: 'Amount paid', value: `<span style="color:#059669;font-size:18px;">${fmtNaira(args.amount)}</span>` },
      { label: 'Service', value: args.service_name },
      { label: 'Request reference', value: `<span style="font-family:monospace;color:#1d44d8;">${args.reference}</span>` },
      { label: 'Payment reference', value: `<span style="font-family:monospace;font-size:11px;color:#67738f;">${args.payment_reference}</span>` },
      { label: 'Date', value: new Date().toLocaleDateString('en-NG', { dateStyle: 'long' }) },
    ])}

    <h3 style="margin:24px 0 10px;font-size:14px;color:#0b1020;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Next steps</h3>
    <ol style="margin:0 0 20px;padding-left:20px;font-size:13px;line-height:1.8;color:#434b60;">
      <li>We&rsquo;ll contact you within 24 hours to schedule the site inspection.</li>
      <li>Inspection is conducted by a registered Estate Surveyor.</li>
      <li>Final report is uploaded and emailed within 5–7 business days.</li>
    </ol>

    ${infoBox(`Keep this email as your receipt. The payment reference can be used for any enquiries with our finance team.`)}
  `;

  return emailLayout({
    title: `Payment received — ${args.reference}`,
    preheader: `Payment of ${fmtNaira(args.amount)} received for ${args.service_name}`,
    body,
  });
}

/* ============================================================
 * 5. CLIENT — Final report ready
 * ============================================================ */
export function tplReportReady(args: {
  full_name: string;
  reference: string;
  service_name: string;
  report_url: string;
}) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0b1020;">📄 Your report is ready</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#434b60;">
      Hello ${args.full_name.split(' ')[0]}, your ${args.service_name.toLowerCase()} report has been completed and uploaded.
    </p>

    ${detailsTable([
      { label: 'Reference', value: `<span style="font-family:monospace;color:#1d44d8;">${args.reference}</span>` },
      { label: 'Service', value: args.service_name },
      { label: 'Status', value: '<span style="color:#059669;">✓ Complete</span>' },
    ])}

    <p style="margin:24px 0;">${btn('Download Final Report →', args.report_url)}</p>

    ${infoBox(`<strong>Important:</strong> The download link expires in 12 months. Please save the file to a secure location.<br/><br/>For hardcopy delivery or any clarifications, simply reply to this email.`)}

    <p style="margin:24px 0 0;font-size:13px;color:#67738f;">
      It&rsquo;s been a pleasure working with you. We&rsquo;d be grateful for any referrals or feedback.<br/><br/>
      Warm regards,<br/>
      <strong style="color:#0b1020;">Idoko Chinelo Ifeyinwa</strong><br/>
      <span style="font-size:11px;">Principal Consultant · ANIVS, RSV, MSc, PhD</span>
    </p>
  `;

  return emailLayout({
    title: `Report ready — ${args.reference}`,
    preheader: `Your ${args.service_name} report is ready for download`,
    body,
  });
}

/* ============================================================
 * 6. CLIENT — Consultation confirmed (after Paystack success)
 * ============================================================ */
export function tplConsultationConfirmed(args: {
  full_name: string;
  reference: string;
  preferred_date: string;
  preferred_time: string;
  topic: string;
  amount: number;
}) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0b1020;">Your consultation is confirmed</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#434b60;">
      Thank you ${args.full_name.split(' ')[0]}, your booking and payment have been confirmed.
    </p>

    ${detailsTable([
      { label: 'Reference', value: `<span style="font-family:monospace;color:#1d44d8;">${args.reference}</span>` },
      { label: 'Date', value: args.preferred_date || '—' },
      { label: 'Time', value: args.preferred_time || 'To be confirmed' },
      { label: 'Topic', value: args.topic || '—' },
      { label: 'Amount paid', value: `<span style="color:#059669;">${fmtNaira(args.amount)}</span>` },
    ])}

    ${infoBox(`Our team will reach out shortly with the meeting details (in-person or video link). You can send any documents in advance by replying to this email.`)}

    <p style="margin:28px 0 0;font-size:13px;color:#67738f;">
      Looking forward to speaking with you.<br/>
      <strong style="color:#0b1020;">The Idoko Consulting team</strong>
    </p>
  `;

  return emailLayout({
    title: `Consultation confirmed — ${args.reference}`,
    preheader: `Your consultation on ${args.preferred_date} is confirmed.`,
    body,
  });
}

/* ============================================================
 * 7. ADMIN — Consultation booked alert
 * ============================================================ */
export function tplConsultationAdmin(args: {
  full_name: string;
  email: string;
  phone: string;
  reference: string;
  preferred_date: string;
  preferred_time: string;
  topic: string;
  notes: string;
  amount: number;
}) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0b1020;">📅 New consultation — paid</h1>
    <p style="margin:0 0 18px;font-size:14px;color:#67738f;">A client has booked and paid for a consultation.</p>

    ${detailsTable([
      { label: 'Reference', value: `<span style="font-family:monospace;color:#1d44d8;">${args.reference}</span>` },
      { label: 'Client', value: args.full_name },
      { label: 'Email', value: `<a href="mailto:${args.email}" style="color:#1d44d8;">${args.email}</a>` },
      { label: 'Phone', value: `<a href="tel:${args.phone}" style="color:#1d44d8;">${args.phone}</a>` },
      { label: 'Preferred date', value: args.preferred_date },
      { label: 'Preferred time', value: args.preferred_time || '—' },
      { label: 'Topic', value: args.topic },
      { label: 'Amount', value: `<span style="color:#059669;">${fmtNaira(args.amount)}</span>` },
    ])}

    ${args.notes ? `<p style="margin:18px 0;font-size:13px;color:#434b60;"><strong>Client notes:</strong><br/>${args.notes.replace(/\n/g, '<br/>')}</p>` : ''}

    <p style="margin:24px 0;">${btn('Open in Admin Dashboard →', `${SITE}/admin`)}</p>
  `;

  return emailLayout({
    title: `New consultation — ${args.full_name}`,
    preheader: `${args.full_name} booked a consultation on ${args.preferred_date}`,
    body,
  });
}

/* ============================================================
 * 8. ADMIN — Contact form message
 * ============================================================ */
export function tplContactMessage(args: {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0b1020;">💬 New contact message</h1>

    ${detailsTable([
      { label: 'Name', value: args.full_name },
      { label: 'Email', value: `<a href="mailto:${args.email}" style="color:#1d44d8;">${args.email}</a>` },
      { label: 'Phone', value: args.phone || '—' },
      { label: 'Subject', value: args.subject || '—' },
    ])}

    <div style="margin:18px 0;padding:18px;background:#f6f7f9;border-radius:12px;font-size:14px;color:#434b60;line-height:1.7;">
      ${args.message.replace(/\n/g, '<br/>')}
    </div>

    <p style="margin:24px 0;">${btn('Reply to Client', `mailto:${args.email}`)}</p>
  `;

  return emailLayout({
    title: `Contact: ${args.subject || 'New message'}`,
    preheader: `${args.full_name} sent a message via the website.`,
    body,
  });
}
