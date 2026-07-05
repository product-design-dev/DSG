create policy "Enable update for authenticated users only"
  on brand for update
  to authenticated
  using (true)
  with check (true);

create policy "Enable delete for authenticated users only"
  on brand for delete
  to authenticated
  using (true);
