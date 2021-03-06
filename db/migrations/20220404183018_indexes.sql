-- migrate:up

CREATE INDEX name_res ON restaurant ("name");
CREATE INDEX name_user ON users ("name");
CREATE INDEX name_menu ON menu ("name");
CREATE INDEX price on menu ("price");
CREATE INDEX price_user on users ("balance");
CREATE INDEX price_his on history ("amount");
CREATE INDEX price_menu_his on history ("menu_id");
CREATE INDEX price_user_his on history ("user_id");
-- migrate:down


DROP INDEX IF EXISTS name_res;
DROP INDEX IF EXISTS name_user;
DROP INDEX IF EXISTS name_menu;
DROP INDEX IF EXISTS price;
DROP INDEX IF EXISTS price_user;
DROP INDEX IF EXISTS price_his;
DROP INDEX IF EXISTS price_menu_his;
DROP INDEX IF EXISTS price_user_his;