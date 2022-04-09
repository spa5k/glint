-- migrate:up

CREATE FUNCTION time_subtype_diff(x time, y time) RETURNS float8 AS
'SELECT EXTRACT(EPOCH FROM (x - y))' LANGUAGE sql STRICT IMMUTABLE;

CREATE TYPE timerange AS RANGE (
    subtype = time,
    subtype_diff = time_subtype_diff
);

create table opening_hours (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  restaurant_id uuid NOT NULL, --references restaurant
  day int check (day between 1 and 7),
  hours timerange
);

-- https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DEFINING
-- CREATE FUNCTION time_subtype_diff(x time, y time) RETURNS float8 AS
-- 'SELECT EXTRACT(EPOCH FROM (x - y))' LANGUAGE sql STRICT IMMUTABLE;

-- CREATE TYPE timerange AS RANGE (
--     subtype = time,
--     subtype_diff = time_subtype_diff
-- );

-- create table operating_hours (
--   restaurant_id int primary key, --references restaurant
--   day int check (day between 1 and 7),
--   hours timerange
-- );

-- insert into operating_hours(restaurant_id, day, hours)
--   values (1, 1, timerange(time '2:30pm', time '8:00pm'))
-- migrate:down

DROP FUNCTION IF EXISTS time_subtype_diff();
DROP TABLE IF EXISTS opening_hours;
DROP TYPE IF EXISTS timerange;