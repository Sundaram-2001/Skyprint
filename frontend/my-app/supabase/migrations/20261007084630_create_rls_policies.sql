create policy "allow users to add data"
on public.profiles
for insert 
with  check(auth.uid()=id);


create policy "allow users to read data"
on public.profiles
for select 
using (auth.uid()=id);

