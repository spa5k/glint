-- migrate:up
-- Alter table menu and add one to many relationship with restaurant
ALTER TABLE menu
  ADD CONSTRAINT restaurant_menu_fk
  FOREIGN KEY ("restaurant_id")
  REFERENCES restaurant on delete cascade;

ALTER TABLE opening_hours
  ADD CONSTRAINT restaurant_opening_hours_fk
  FOREIGN KEY ("restaurant_id")
  REFERENCES restaurant on delete cascade;

-- Alter table history and add references to restaurant, menu and user
ALTER TABLE history
  ADD CONSTRAINT restaurant_history_fk
  FOREIGN KEY (restaurant_id)
  REFERENCES restaurant (id) on delete cascade;

ALTER TABLE history
  ADD CONSTRAINT menu_history_fk
  FOREIGN KEY (menu_id)
  REFERENCES menu (id) on delete cascade;

ALTER TABLE history
  ADD CONSTRAINT user_history_fk
  FOREIGN KEY (user_id)
  REFERENCES users (id) on delete cascade;

-- migrate:down

-- Delete the foreign key constraints
ALTER TABLE history
  DROP CONSTRAINT IF EXISTS restaurant_history_fk;

ALTER TABLE history
  DROP CONSTRAINT IF EXISTS menu_history_fk;

ALTER TABLE history
  DROP CONSTRAINT IF EXISTS user_history_fk;

ALTER TABLE menu
  DROP CONSTRAINT IF EXISTS restaurant_menu_fk;