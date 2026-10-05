create table public.profiles(
    id uuid references auth.users on delete cascade primary key,
    name text,
    date_of_birth date not null,
    time_of_birth time not null,
    place_of_birth text not null
);