# SIC 2026 — Student Innovation Conference

Registration site for the Student Innovation Conference, organized by the Byte and Qbit
clubs at Hindustan College of Science and Technology.

Stack: Vite + React + Tailwind CSS + Framer Motion (frontend), Supabase Postgres +
Auth + Edge Functions (backend), Razorpay (payments), Vercel (hosting).

## 1. Local setup

```bash
npm install
cp .env.example .env
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project settings
npm run dev
```

## 2. Supabase setup

1. Create a project at [supabase.com](https://supabase.com) (free tier is enough).
2. Open the SQL editor and run `supabase/schema.sql`.
3. Under **Authentication → Users**, manually create one account per organizer
   (this becomes the admin login at `/admin`). There is no public sign-up for admin —
   that's intentional.
4. Under **Project settings → API**, copy the Project URL and anon public key into `.env`.

## 3. Razorpay setup

1. Create an account at [razorpay.com](https://razorpay.com) under the club/college.
   You'll need basic KYC (PAN, bank account, and usually a letter confirming the event).
2. While KYC is pending, use **Test mode** — it works identically and lets you build
   and demo the full flow with fake card numbers Razorpay provides in their docs.
3. From **Settings → API keys**, generate a Key ID and Key Secret.

## 4. Deploy the Edge Functions

Install the Supabase CLI, then from the project root:

```bash
supabase login
supabase link --project-ref your-project-ref
supabase secrets set RAZORPAY_KEY_ID=your_key_id RAZORPAY_KEY_SECRET=your_key_secret
supabase functions deploy create-order
supabase functions deploy verify-payment
```

The Key Secret never reaches the browser — it only lives in these two functions.

### Editor red squiggles under `Deno.serve` / `Deno.env`

That's expected, not a bug. The two functions in `supabase/functions` run on Deno
(what Supabase Edge Functions use), but VS Code's default TypeScript checker is set
up for the Node/Vite side of the project and doesn't know Deno's globals or its
`https://esm.sh/...` import style. The code runs fine either way — this is purely
a local editor annoyance. To make it go away:

1. Install the **Deno** extension in VS Code (by denoland).
2. This project already includes `.vscode/settings.json`, which scopes the Deno
   extension to only `supabase/functions` — the rest of the app keeps using normal
   Node/TypeScript tooling. Reload the window after installing the extension
   (Ctrl+Shift+P → "Reload Window") and the squiggles should clear.

## 5. Deploy the frontend to Vercel

1. Push this project to a GitHub repo.
2. Import it at [vercel.com](https://vercel.com) → New Project.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in
   Vercel's project settings.
4. Deploy. Every push to `main` redeploys automatically.

## Registration fee

Registration and abstract submission are **free**. A ₹100 confirmation fee applies
only once a participant is **shortlisted** for the final round, held in college.
The amount is set in `amount` (paise) on the `registrations` table default in
`supabase/schema.sql` — the Edge Function always reads it from the database row,
never trusts a value sent from the browser. To change the fee, update the `default`
in the SQL (and existing shortlisted rows if needed).

## Flow summary

1. Student fills the form at `/register` (free) → a `submitted` row is created in Supabase,
   with an optional abstract for the paper/poster tracks.
2. Organizers review submissions at `/admin` and click **Shortlist** or **Reject** on
   each row. Rejected stays free with no further action.
3. A shortlisted student visits their `/ticket/:id` page (link shared by email/organizers)
   and sees a **Pay ₹100 to confirm your spot** button.
4. `create-order` Edge Function creates a Razorpay order using the amount stored server-side,
   only for rows with status `shortlisted` or `failed`.
5. Razorpay's hosted checkout opens — no card data touches your code.
6. On success, `verify-payment` checks Razorpay's HMAC signature server-side and only
   then flips the row to `confirmed`. A failed/cancelled payment sets status back to `failed`
   so the student can retry.
7. Confirmed students see a QR code and final-round details on `/ticket/:id`.
8. Organizers track everything — including filtering by status and exporting a CSV —
   from `/admin`.
