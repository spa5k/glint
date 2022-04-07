-- migrate:up
CREATE TABLE restaurant (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "balance" numeric(10,2) NOT NULL DEFAULT 0.00,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "name" text NOT NULL,
  "document" tsvector
);

-- migrate:down

-- Drop table restaurant
DROP TABLE IF EXISTS restaurant;