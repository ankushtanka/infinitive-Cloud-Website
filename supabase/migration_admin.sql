-- Run this SQL in your Supabase dashboard → SQL Editor
-- This creates the admin_settings table used by the Admin Panel

create table if not exists public.admin_settings (
  id          uuid default gen_random_uuid() primary key,
  key         text unique not null,
  value       jsonb not null default '{}',
  updated_at  timestamptz default now()
);

-- Enable Row Level Security
alter table public.admin_settings enable row level security;

-- Allow authenticated (admin) users to read and write
create policy "authenticated_admin_full_access"
  on public.admin_settings
  for all
  to authenticated
  using (true)
  with check (true);

-- Allow public (anonymous) to only READ settings (so frontend can fetch prices/content)
create policy "public_read_settings"
  on public.admin_settings
  for select
  to anon
  using (true);
