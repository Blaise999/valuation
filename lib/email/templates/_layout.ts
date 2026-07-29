/**
 * Base HTML layout for all transactional emails.
 * Brand: white card on light bg, blue gradient header,
 * inline SVG logo (mirrors the firm letterhead).
 */
export function emailLayout({
  preheader = '',
  title,
  body,
}: {
  preheader?: string;
  title: string;
  body: string;
}) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0b1020;-webkit-font-smoothing:antialiased;">
<!-- Preheader (hidden) -->
<div style="display:none;font-size:1px;color:#f6f7f9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f7f9;padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3568 0%,#2557eb 60%,#3b76f6 100%);padding:32px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="padding-right:14px;width:48px;">
                  <!-- Logo (SVG) -->
                  <svg width="44" height="44" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 18 L14 56 L26 56 L26 24 L20 18 Z" fill="#ffffff"/>
                    <path d="M26 26 L26 56 L40 56 L40 12 L33 6 L26 12 Z" fill="#ffffff" opacity="0.92"/>
                    <path d="M40 22 L40 56 L52 56 L52 28 L46 22 Z" fill="#ffffff" opacity="0.78"/>
                  </svg>
                </td>
                <td valign="middle">
                  <div style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;line-height:1.1;">IDOKO C IDOKO</div>
                  <div style="font-size:10px;font-weight:700;color:#bfd6fe;letter-spacing:0.28em;margin-top:2px;">CONSULTING</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px 28px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:22px 32px;background:#f6f7f9;border-top:1px solid #eceef2;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size:11px;color:#67738f;line-height:1.6;">
                  <strong style="color:#0b1020;">Idoko C Idoko Consulting</strong><br/>
                  Estate Surveyors &amp; Valuers · Property Managers · Facility Managers · Agency<br/>
                  No 75 Chime Avenue, New Heaven · Opp Mr Biggs bus stop, Enugu<br/>
                  <a href="tel:08133988976" style="color:#2557eb;text-decoration:none;">0813 398 8976</a> ·
                  <a href="mailto:info@idokoconsulting.com" style="color:#2557eb;text-decoration:none;">info@idokoconsulting.com</a>
                </td>
              </tr>
              <tr><td style="padding-top:14px;font-size:10px;color:#8691a9;">
                Idoko Chinelo Ifeyinwa, ANIVS · RSV · MSc · PhD · Principal Consultant<br/>
                © ${new Date().getFullYear()} Idoko C Idoko Consulting. All rights reserved.
              </td></tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="font-size:11px;color:#8691a9;margin:16px 0 0;text-align:center;">NIESV-Registered Estate Surveying &amp; Valuation Firm</p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* -------------------- helpers -------------------- */

export function btn(label: string, href: string) {
  return `<a href="${href}" style="display:inline-block;background:#1d44d8;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:9999px;">${label}</a>`;
}

export function detail(label: string, value: string) {
  return `<tr><td style="padding:10px 0;color:#67738f;font-size:13px;width:40%;">${label}</td><td style="padding:10px 0;color:#0b1020;font-size:13px;font-weight:600;">${value}</td></tr>`;
}

export function detailsTable(rows: { label: string; value: string }[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0;border-top:1px solid #eceef2;">
    ${rows.map((r) => `<tr><td style="padding:12px 0;color:#67738f;font-size:13px;width:40%;border-bottom:1px solid #eceef2;">${r.label}</td><td style="padding:12px 0;color:#0b1020;font-size:13px;font-weight:600;border-bottom:1px solid #eceef2;">${r.value}</td></tr>`).join('')}
  </table>`;
}

export function infoBox(content: string, color: 'blue' | 'green' | 'amber' = 'blue') {
  const styles = {
    blue: { bg: '#eff5ff', border: '#bfd6fe', text: '#1e3568' },
    green: { bg: '#ecfdf5', border: '#a7f3d0', text: '#064e3b' },
    amber: { bg: '#fffbeb', border: '#fde68a', text: '#78350f' },
  }[color];
  return `<div style="background:${styles.bg};border:1px solid ${styles.border};border-radius:12px;padding:16px 18px;color:${styles.text};font-size:13px;line-height:1.6;">${content}</div>`;
}

export const fmtNaira = (n: number | string | null | undefined) => {
  if (n === null || n === undefined || n === '') return '—';
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (isNaN(num)) return '—';
  return '₦' + num.toLocaleString('en-NG', { maximumFractionDigits: 0 });
};
