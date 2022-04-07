-- migrate:up

update menu set document = setweight(to_tsvector(name), 'A');

CREATE INDEX document_menu_idx
  ON menu
  USING GIN (document);
        CREATE FUNCTION menu_tsvector_trigger() RETURNS trigger AS $$


begin
  new.document :=
  setweight(to_tsvector('english', coalesce(new.name, '')), 'A');
  return new;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER tsvectorupdatemenu BEFORE INSERT OR UPDATE
    ON menu FOR EACH ROW EXECUTE PROCEDURE menu_tsvector_trigger();
        

-- migrate:down

-- Drop the document column from menu
DROP INDEX IF EXISTS document_menu_idx;
DROP FUNCTION IF EXISTS menu_tsvector_trigger();
ALTER TABLE menu DROP COLUMN document;
DROP TRIGGER IF EXISTS tsvectorupdatemenu ON menu;