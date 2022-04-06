-- migrate:up
CREATE TABLE restaurant (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "balance" numeric(10,2) NOT NULL DEFAULT 0.00,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  -- "opening_hours" json NOT NULL,
  "name" citext NOT NULL
  -- "days_opened" text[] NOT NULL DEFAULT '{}'
);

-- migrate:down

-- Drop table restaurant
DROP TABLE IF EXISTS restaurant;