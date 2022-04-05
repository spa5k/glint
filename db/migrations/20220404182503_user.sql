-- migrate:up
CREATE TABLE users (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" citext NOT NULL,
  "balance" numeric(10,2) NOT NULL DEFAULT 0.00,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

-- migrate:down

DROP TABLE IF EXISTS users;