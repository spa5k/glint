-- migrate:up
update restaurant set document = setweight(to_tsvector(name), 'A');

CREATE INDEX document_restaurant_idx
  ON restaurant
  USING GIN (document);
        CREATE FUNCTION restaurant_tsvector_trigger() RETURNS trigger AS $$


begin
  new.document :=
  setweight(to_tsvector('english', coalesce(new.name, '')), 'A');
  return new;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER tsvectorupdateres BEFORE INSERT OR UPDATE
    ON restaurant FOR EACH ROW EXECUTE PROCEDURE restaurant_tsvector_trigger();
        


-- migrate:down

