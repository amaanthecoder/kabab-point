# Backend Setup Guide — Kabab Point

---

## Step 1 — Supabase (Database)

1. Go to https://supabase.com and create a free account
2. Click "New project", name it "kabab-point", choose any region near UAE
3. Wait for the project to spin up (~2 min)
4. Go to: **Project Settings → API**
   - Copy **Project URL** → paste into `.env.local` as `VITE_SUPABASE_URL`
   - Copy **anon / public key** → paste into `.env.local` as `VITE_SUPABASE_ANON_KEY`

### Run this SQL in Supabase SQL Editor (Project → SQL Editor → New query)

```sql
-- ─── Table 1: Reservations (Book a Table) ────────────────────────────────────
create table reservations (
  id            bigserial primary key,
  name          text not null,
  phone         text not null,
  date          date not null,
  time          time not null,
  guests        text not null,
  special_request text,
  status        text not null default 'pending',
  created_at    timestamptz not null default now()
);

-- ─── Table 2: Catering Inquiries ─────────────────────────────────────────────
create table catering_inquiries (
  id            bigserial primary key,
  name          text not null,
  phone         text not null,
  event_date    date not null,
  guest_count   integer,
  event_type    text not null,
  message       text,
  status        text not null default 'new',
  created_at    timestamptz not null default now()
);

-- ─── Table 3: Contact Messages ────────────────────────────────────────────────
create table contact_messages (
  id            bigserial primary key,
  name          text not null,
  contact       text not null,
  message       text not null,
  status        text not null default 'unread',
  created_at    timestamptz not null default now()
);

-- ─── Row Level Security (anyone can INSERT, only authenticated users can read) ─
alter table reservations       enable row level security;
alter table catering_inquiries enable row level security;
alter table contact_messages   enable row level security;

create policy "Allow public insert" on reservations       for insert to anon with check (true);
create policy "Allow public insert" on catering_inquiries for insert to anon with check (true);
create policy "Allow public insert" on contact_messages   for insert to anon with check (true);
```

---

## Step 2 — EmailJS (Email notifications)

1. Go to https://emailjs.com and create a free account
2. **Add Email Service:**
   - Dashboard → Email Services → Add New Service → choose **Gmail**
   - Connect `amaanpatel7868@gmail.com` (you'll need to authorise it)
   - Copy the **Service ID** → paste into `.env.local` as `VITE_EMAILJS_SERVICE_ID`

3. **Create Email Template:**
   - Dashboard → Email Templates → Create New Template
   - Set it up like this:

   **To email:** `{{to_email}}`
   **Subject:** `{{subject}}`
   **Body (plain text):**
   ```
   {{content}}

   ---
   Submitted: {{submitted_at}}
   Kabab Point, Sharjah
   ```

   - Save the template
   - Copy the **Template ID** → paste into `.env.local` as `VITE_EMAILJS_TEMPLATE_ID`

4. **Get Public Key:**
   - Dashboard → Account → General → **Public Key**
   - Copy it → paste into `.env.local` as `VITE_EMAILJS_PUBLIC_KEY`

---

## Step 3 — CallMeBot (WhatsApp notifications)

This sends a WhatsApp message to +971 562091145 whenever a form is submitted.

**One-time activation (do this from the +971 562091145 WhatsApp):**

1. Open WhatsApp on that number
2. Send this exact message to **+34 644 599 019**:
   ```
   I allow callmebot to send me messages
   ```
3. CallMeBot will reply with your personal API key (e.g. `123456`)
4. Copy that API key → paste into `.env.local` as `VITE_CALLMEBOT_APIKEY`

---

## Step 4 — Final .env.local should look like this

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
VITE_ADMIN_EMAIL=amaanpatel7868@gmail.com
VITE_CALLMEBOT_PHONE=971562091145
VITE_CALLMEBOT_APIKEY=123456
```

Then run `npm run dev` and test all three forms.
You can view all submissions live in: Supabase Dashboard → Table Editor.
