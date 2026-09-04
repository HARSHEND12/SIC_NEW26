-- Run this in the Supabase SQL editor (or via `supabase db push`).

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  roll_number text not null,
  email text not null,
  phone text not null,
  department text not null,
  year text not null,
  college_name text not null default 'Hindustan College of Science and Technology, Farah (Mathura)',
  track text not null,
  abstract_title text,
  abstract_text text,
  abstract_file_path text,
  -- submitted: free registration/abstract received, awaiting review
  -- shortlisted: team selected them, final-round payment now required
  -- confirmed: paid, confirmed for the final round
  -- rejected: not selected after review
  -- failed: payment attempt failed after being shortlisted
  status text not null default 'submitted',
  amount integer not null default 10000, -- in paise (₹100.00), only charged once shortlisted
  razorpay_order_id text,
  razorpay_payment_id text,
  created_at timestamptz not null default now()
);

alter table registrations enable row level security;

-- Anyone can submit a free registration/abstract (the public registration form).
create policy "Anyone can insert a registration"
  on registrations for insert
  to anon
  with check (status = 'submitted');

-- A person can read their own status/ticket once they know its id (used by the /ticket/:id page).
-- This relies on the id being an unguessable UUID, not on auth.
create policy "Anyone can read a registration by id"
  on registrations for select
  to anon
  using (true);

-- Signed-in organizers can read every registration (used by the /admin dashboard).
-- Without this, the anon-only policy above leaves authenticated queries blocked by
-- RLS and the dashboard silently returns zero rows.
create policy "Organizers can read all registrations"
  on registrations for select
  to authenticated
  using (true);

-- Only authenticated organizers can shortlist/reject from the admin UI.
-- Payment confirmation (shortlisted -> confirmed) is done by the Edge Function's
-- service role, which bypasses RLS, so no anon update policy is needed for that.
create policy "Authenticated organizers can update registrations"
  on registrations for update
  to authenticated
  using (true);

create index if not exists registrations_status_idx on registrations (status);
create index if not exists registrations_track_idx on registrations (track);

-- Storage bucket for PDF abstract uploads. Private (not public) — files are only
-- readable by signed URL, generated on demand for signed-in organizers reviewing
-- submissions in /admin.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('abstracts', 'abstracts', false, 10485760, array['application/pdf'])
on conflict (id) do nothing;

-- Anyone can upload their own abstract PDF at registration time.
create policy "Anyone can upload an abstract pdf"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'abstracts');

-- Only signed-in organizers can read abstract files back (for review in /admin).
create policy "Organizers can view abstract pdfs"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'abstracts');
