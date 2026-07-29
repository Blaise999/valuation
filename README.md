# Idoko C Idoko Consulting

Complete website + admin platform for **Idoko C Idoko Consulting** — Estate Surveyors & Valuers · Property Managers · Facility Managers · Agency.

Stack: **Next.js 16 (App Router, Turbopack)** · **React 19** · **Tailwind CSS** · **Framer Motion** · **Supabase** (Auth, DB, Storage) · **Paystack** (payments) · **Resend** (transactional email).

---

## ⚡ Quick start (5 minutes)

```bash
npm install
cp .env.example .env.local
# fill in the keys (see "Setup" below)
npm run dev
```

Open `http://localhost:3000` for the website, `http://localhost:3000/admin/login` for admin.

---

## 1. Project structure

```
idoko-consulting/
├── app/
│   ├── (public pages)
│   │   ├── page.tsx                       # Home
│   │   ├── about/page.tsx
│   │   ├── services/{page,[slug]/page}.tsx
│   │   ├── properties/page.tsx
│   │   ├── request-valuation/page.tsx
│   │   ├── book-consultation/page.tsx
│   │   ├── contact/page.tsx
│   │   └── thank-you/page.tsx
│   ├── admin/                             # gated by proxy.ts
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── page.tsx                       # dashboard
│   │   ├── requests/{page, [id]/page}.tsx
│   │   ├── payments/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── properties/{page, new/page}.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── requests/route.ts              # POST: submit a request
│       ├── contact/route.ts               # POST: contact form
│       ├── paystack/
│       │   ├── initialize/route.ts        # POST: start a payment
│       │   ├── verify/route.ts            # GET: callback after payment
│       │   └── webhook/route.ts           # POST: Paystack webhook
│       └── admin/
│           ├── send-quote/route.ts        # POST: email client a quote+pay link
│           └── notify-report/route.ts     # POST: email client report ready
├── components/
│   ├── Hero.tsx, Navigation.tsx, Footer.tsx, Logo.tsx,
│   ├── WhatsAppWidget.tsx, RevealOnScroll.tsx
│   ├── ui/Form.tsx
│   └── admin/{AdminShell, RequestActions, DeletePropertyButton}.tsx
├── lib/
│   ├── supabase/{client, server, admin, middleware}.ts
│   ├── paystack.ts, email.ts, email-templates.ts, utils.ts
├── public/
│   ├── logo.png                           # the firm's logo
│   └── favicon.svg
├── supabase/schema.sql                    # ← run this once
├── types/db.ts
├── proxy.ts                               # Next 16 middleware (replaces middleware.ts)
└── ...config files
```

---

## 2. Setup — full walkthrough

### Step 1 — Install
```bash
npm install
```

### Step 2 — Supabase (DB + Auth + file storage)

1. Sign up at <https://supabase.com>, create a new project (free tier is fine).
2. **SQL Editor → New query** → paste the entire contents of `supabase/schema.sql` → **Run**.
   - Creates 9 tables, all RLS policies, 3 storage buckets, and seed services.
3. **Project Settings → API**, copy these into your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon public key
   - `SUPABASE_SERVICE_ROLE_KEY` — service_role (keep secret!)

### Step 3 — Create your admin user

1. Supabase Dashboard → **Authentication → Users → Add user** → enter email + password.
2. Copy the new user's UUID (long string).
3. **SQL Editor → New query**:
   ```sql
   insert into public.profiles (id, email, full_name, role)
   values (
     'PASTE_USER_UUID_HERE',
     'your@email.com',
     'Your Full Name',
     'super_admin'
   );
   ```
4. Sign in at `http://localhost:3000/admin/login`.

### Step 4 — Paystack (payments) ⭐

This is the most important piece. Read carefully.

#### Get your keys
1. Sign up at <https://paystack.com> and complete business verification.
2. **Dashboard → Settings → API Keys & Webhooks**.
3. Copy these into `.env.local`:
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` — Test or Live Public Key (`pk_test_xxx` or `pk_live_xxx`)
   - `PAYSTACK_SECRET_KEY` — Test or Live Secret Key (`sk_test_xxx` or `sk_live_xxx`) — **never commit this**

#### Set the webhook
On the same page, set the webhook URL:
- **Local development:** use [ngrok](https://ngrok.com) to expose `http://localhost:3000` to a public URL like `https://abc123.ngrok-free.app`, and set the webhook URL to `https://abc123.ngrok-free.app/api/paystack/webhook`.
- **Production:** `https://YOUR_DOMAIN.com/api/paystack/webhook`.

#### Test it
1. Use **Test mode** keys first.
2. Go to `/book-consultation`, fill the form, click pay.
3. On the Paystack page use a [test card](https://paystack.com/docs/payments/test-payments/), e.g. `4084 0840 8408 4081`, any future expiry, CVV `408`.
4. After paying:
   - The customer is redirected to `/api/paystack/verify?reference=...` (handled by the verify route)
   - `payment_status` is updated in the DB
   - Confirmation emails fire to client + admin
   - Customer lands on `/thank-you?type=payment`

#### Two payment flows

This site supports **both** the flows you described:

**Flow A — Fixed-fee consultation** (Option A)
- Client fills `/book-consultation`
- `/api/paystack/initialize` is called with `type: 'consultation'`, `amount: 15000`
- Paystack redirects them back, payment is verified, consultation is confirmed.

**Flow B — Quote-then-pay** (Option B, recommended for valuations)
1. Client submits `/request-valuation` (no payment yet)
2. Admin reviews in `/admin/requests/[id]`
3. Admin enters a `quoted_amount` and clicks **Send Quote to Client**
4. The `/api/admin/send-quote` route generates a Paystack payment link and emails it to the client
5. Client clicks link, pays, comes back to `/thank-you`

### Step 5 — Resend (transactional email)

1. Sign up at <https://resend.com> (free: 3,000 emails/month).
2. **Verify a sending domain** (recommended for production) — add the DNS records they show you in your domain registrar. While testing, you can use their default `onboarding@resend.dev`.
3. Copy the API key into `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   RESEND_FROM=Idoko Consulting <hello@yourdomain.com>
   ```

If you skip this, emails will be **logged to the console** but not sent — your app still runs.

#### What emails are sent automatically?

| Trigger                                         | To       | Template                       |
|-------------------------------------------------|----------|--------------------------------|
| Client submits a service request                | Client   | `clientRequestReceived`        |
| Same trigger                                    | Admin    | `adminNewRequest`              |
| Admin clicks **Send Quote**                     | Client   | `clientQuotationSent` (with payment link) |
| Client pays for a consultation                  | Client   | `clientConsultationConfirmed`  |
| Same trigger                                    | Admin    | `adminConsultationPaid`        |
| Admin clicks **Email Client: Report Ready**     | Client   | `clientReportReady`            |
| Someone fills the contact form                  | Admin    | `adminContactMessage`          |

All templates are in `lib/email-templates.ts` — fully branded (white background, blue gradient, your logo) and use inline styles for maximum email-client compatibility.

### Step 6 — Configure environment

Copy `.env.example` to `.env.local` and fill in:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
PAYSTACK_SECRET_KEY=sk_test_xxx

# Email (Resend) — optional but recommended
RESEND_API_KEY=re_xxx
RESEND_FROM=Idoko Consulting <hello@yourdomain.com>

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=2348133988976
NEXT_PUBLIC_COMPANY_PHONE=08133988976
NEXT_PUBLIC_COMPANY_EMAIL=info@idokoconsulting.com
NEXT_PUBLIC_COMPANY_ADDRESS=No 75 Chime Avenue, New Heaven. Opp Mr Biggs bus stop
```

### Step 7 — Run
```bash
npm run dev
```

---

## 3. Adding the team photos & NIESV logo

The Principal Valuer photo is already in place at `/public/principal.jpg`. To replace with a different photo, drop a new JPG/PNG at the same path with the same filename.

For the NIESV logo on the About page: the current page shows a styled placeholder badge. To swap it for the real NIESV logo:
1. Save the logo as `/public/niesv-logo.png`
2. Open `app/about/page.tsx`, find the **NIESV REGISTRATION STRIP** section
3. Replace the styled badge `<div>` with:
   ```tsx
   <Image src="/niesv-logo.png" alt="NIESV" fill className="object-contain p-4" sizes="180px" />
   ```

---

## 4. Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. <https://vercel.com/new> → import the repo.
3. Paste **all** environment variables from `.env.local` into Vercel's project settings.
4. Click **Deploy**.
5. Update the Paystack webhook URL to your live domain.
6. (Optional) Add a custom domain.

### Anywhere else
- Build: `npm run build`
- Start: `npm run start`
- Needs Node 20+ and the env vars in production.

---

## 5. Customising the brand

- **Colors** — `tailwind.config.ts` → `colors.brand` and `colors.ink`
- **Logo** — `components/Logo.tsx` (SVG) and `public/logo.png`
- **Hero images** — `components/Hero.tsx` (Unsplash URLs)
- **Service descriptions** — `app/services/[slug]/page.tsx` and the seed data in `supabase/schema.sql`
- **Email templates** — `lib/email-templates.ts`
- **WhatsApp number** — set `NEXT_PUBLIC_WHATSAPP_NUMBER` in env
- **Company info** — change in env, or use the **Admin → Settings** page after login

---

## 6. Security notes

- The **service role key** is only used in API routes (`lib/supabase/admin.ts`). Never imported in client code.
- Admin pages are gated by `proxy.ts` (Next 16's renamed middleware).
- Paystack webhook **verifies the HMAC signature** on every request. Invalid signatures are rejected.
- RLS policies in `schema.sql` enforce:
  - Anyone can submit requests, consultations, contact messages
  - Only authenticated admins (via `is_admin()` SQL helper) can read/update them
  - `documents` storage bucket is private; clients upload, only admins read
  - `properties` storage bucket is public so listings render fast

---

## 7. Troubleshooting

| Issue | Fix |
| --- | --- |
| `Module not found: Can't resolve '@supabase/ssr'` | Run `npm install` again. |
| Login redirects in a loop | Make sure your auth user has a row in `public.profiles` with role `admin` or `super_admin`. |
| Paystack webhook fires but DB doesn't update | Verify the webhook URL is correct in Paystack dashboard. Local dev needs ngrok. Check `PAYSTACK_SECRET_KEY` matches. |
| Emails not sending | Set `RESEND_API_KEY`. Without it, emails are logged but not sent. |
| `cookies() should be awaited` | This codebase already uses `await createClient()` — make sure you do the same in any new code. |
| `"middleware" file convention is deprecated` | Use `proxy.ts` instead — already done in this project. |

---

## 8. License

Proprietary — © Idoko C Idoko Consulting.
