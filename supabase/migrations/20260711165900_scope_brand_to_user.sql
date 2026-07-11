delete from brand;

alter table brand
  add column user_id uuid not null default auth.uid() references auth.users (id) on delete cascade;

drop policy "Enable read access for all users" on brand;
drop policy "Enable insert for authenticated users only" on brand;
drop policy "Enable update for authenticated users only" on brand;
drop policy "Enable delete for authenticated users only" on brand;

create policy "Users can view their own brands"
  on brand for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own brands"
  on brand for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own brands"
  on brand for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own brands"
  on brand for delete
  to authenticated
  using (auth.uid() = user_id);
