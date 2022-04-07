-- migrate:up
CREATE TABLE menu (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" citext NOT NULL,
  "price" numeric(10,2) NOT NULL DEFAULT 0.00,
  "restaurant_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

-- migrate:down

DROP TABLE IF EXISTS menu;