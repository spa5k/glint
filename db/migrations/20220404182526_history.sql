-- migrate:up
CREATE TABLE history (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "amount" numeric(10,2) NOT NULL DEFAULT 0.00,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "restaurant_id" uuid NOT NULL,
  "menu_id" uuid NOT NULL,
  "user_id" uuid NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS history;