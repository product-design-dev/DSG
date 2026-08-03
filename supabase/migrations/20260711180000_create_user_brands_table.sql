create table public.brands (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  brand_key text not null,
  name text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, brand_key)
);

alter table public.brands enable row level security;

create policy "Users can view their own brands"
  on public.brands for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own brands"
  on public.brands for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own brands"
  on public.brands for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own brands"
  on public.brands for delete
  to authenticated
  using (auth.uid() = user_id);
