# KMITL Food Hub - Database Schema (Supabase)

Run these SQL statements in the Supabase SQL Editor to set up the database.

## Tables

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'USER' check (role in ('USER', 'ADMIN', 'SUPER_ADMIN')),
  is_banned boolean not null default false,
  ban_until timestamptz,
  ban_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Stores table
create table public.stores (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  category text not null default 'food' check (category in ('food', 'drink', 'transport', 'other')),
  location_lat float8,
  location_lng float8,
  location_name text,
  zone text,
  image_url text,
  phone text,
  opening_hours text,
  price_range text,
  status text not null default 'PENDING' check (status in ('PENDING', 'ACTIVE', 'CLOSED', 'SUSPENDED')),
  rating float4 not null default 0,
  review_count int not null default 0,
  submitted_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- soft delete
);

-- Reviews table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  is_flagged boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- soft delete
);

-- Audit Logs table
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  admin_id uuid references public.users(id),
  action text not null,
  target_type text,
  target_id uuid,
  details jsonb,
  ip_address text,
  user_agent text,
  timestamp timestamptz not null default now()
);

-- Store Suggestions table
create table public.store_suggestions (
  id uuid default uuid_generate_v4() primary key,
  submitted_by uuid references public.users(id),
  submitter_name text,
  submitter_email text,
  store_name text not null,
  description text,
  category text,
  location_name text,
  phone text,
  opening_hours text,
  image_url text,
  status text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  admin_note text,
  created_at timestamptz not null default now()
);
```

## Indexes

```sql
create index on public.stores(status);
create index on public.stores(category);
create index on public.stores(rating desc);
create index on public.reviews(store_id);
create index on public.reviews(user_id);
create index on public.audit_logs(admin_id);
create index on public.audit_logs(timestamp desc);
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.stores enable row level security;
alter table public.reviews enable row level security;
alter table public.audit_logs enable row level security;
alter table public.store_suggestions enable row level security;

-- Helper function: is super admin
create or replace function is_super_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid()
    and (role = 'SUPER_ADMIN' or email = 'kunsubphiwichit@gmail.com')
  );
$$ language sql security definer;

-- Helper function: is admin
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid()
    and role in ('ADMIN', 'SUPER_ADMIN')
  );
$$ language sql security definer;

-- USERS policies
create policy "Users can view their own profile" on public.users
  for select using (auth.uid() = id);
create policy "Admins can view all users" on public.users
  for select using (is_admin());
create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);
create policy "Super admin can update any user" on public.users
  for update using (is_super_admin());

-- STORES policies
create policy "Anyone can view active stores" on public.stores
  for select using (status = 'ACTIVE' and deleted_at is null);
create policy "Admins can view all stores" on public.stores
  for select using (is_admin());
create policy "Admins can insert stores" on public.stores
  for insert with check (is_admin());
create policy "Admins can update stores" on public.stores
  for update using (is_admin());
create policy "Super admin can delete stores (soft)" on public.stores
  for update using (is_super_admin());

-- REVIEWS policies
create policy "Anyone can view reviews" on public.reviews
  for select using (deleted_at is null);
create policy "Authenticated users can insert reviews" on public.reviews
  for insert with check (auth.uid() = user_id);
create policy "Users can update their own reviews" on public.reviews
  for update using (auth.uid() = user_id);
create policy "Admins can manage all reviews" on public.reviews
  for all using (is_admin());

-- AUDIT LOGS policies
create policy "Only admins can view audit logs" on public.audit_logs
  for select using (is_admin());
create policy "System can insert audit logs" on public.audit_logs
  for insert with check (is_admin());

-- STORE SUGGESTIONS policies
create policy "Anyone can submit suggestions" on public.store_suggestions
  for insert with check (true);
create policy "Submitters can view their own suggestions" on public.store_suggestions
  for select using (submitted_by = auth.uid() or submitted_by is null);
create policy "Admins can manage all suggestions" on public.store_suggestions
  for all using (is_admin());
```

## Triggers

```sql
-- Auto update store rating when review is added
create or replace function update_store_rating()
returns trigger as $$
begin
  update public.stores
  set 
    rating = (select avg(rating) from public.reviews where store_id = NEW.store_id and deleted_at is null),
    review_count = (select count(*) from public.reviews where store_id = NEW.store_id and deleted_at is null),
    updated_at = now()
  where id = NEW.store_id;
  return NEW;
end;
$$ language plpgsql;

create trigger on_review_change
  after insert or update or delete on public.reviews
  for each row execute procedure update_store_rating();

-- Auto create user profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url, role)
  values (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    case when NEW.email = 'kunsubphiwichit@gmail.com' then 'SUPER_ADMIN' else 'USER' end
  );
  return NEW;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Auto unban expired bans
create or replace function auto_unban_users()
returns void as $$
  update public.users
  set is_banned = false, ban_until = null, ban_reason = null
  where is_banned = true and ban_until is not null and ban_until < now();
$$ language sql;
```
