-- migrate:up

-- Postgres Function that will take a menu id parameter and return the menu price
-- @param menu_id
-- @returns menu price

CREATE OR REPLACE FUNCTION get_menu_price(menu_id uuid)
  RETURNS numeric(10,2) AS
$$
  SELECT price FROM menu WHERE id = menu_id
$$ LANGUAGE sql STABLE;


CREATE TABLE history (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "amount" numeric(10,2) NOT NULL CHECK ("amount" = get_menu_price(menu_id)),
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "menu_id" uuid NOT NULL,
  "user_id" uuid NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS history;
DROP FUNCTION IF EXISTS get_menu_price;