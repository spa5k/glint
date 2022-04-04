-- migrate:up
CREATE TABLE restaurant (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "balance" numeric(10,2) NOT NULL DEFAULT 0.00,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  "opening_hours" text NOT NULL,
  "name" citext NOT NULL
);

-- migrate:down

-- Drop table restaurant
DROP TABLE IF EXISTS restaurant;