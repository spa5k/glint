CREATE MIGRATION m1tw2xzppt7q6gdcrhu6so7tkqkqspvopedkpfvkzwj3z3ghsiebzq
    ONTO initial
{
  CREATE TYPE default::Menu {
      CREATE REQUIRED PROPERTY dishName -> std::str;
      CREATE REQUIRED PROPERTY price -> std::int64;
  };
  CREATE TYPE default::Restaurant {
      CREATE REQUIRED MULTI LINK menu -> default::Menu;
      CREATE REQUIRED PROPERTY cashBalance -> std::int64;
      CREATE REQUIRED PROPERTY openingHours -> std::str;
      CREATE REQUIRED PROPERTY restaurantName -> std::str;
  };
  CREATE TYPE default::PurchaseHistory {
      CREATE REQUIRED LINK menu -> default::Menu;
      CREATE REQUIRED LINK restaurant -> default::Restaurant;
      CREATE REQUIRED PROPERTY amount -> std::float32;
      CREATE REQUIRED PROPERTY date -> std::datetime;
  };
  CREATE TYPE default::User {
      CREATE REQUIRED MULTI LINK history -> default::PurchaseHistory;
      CREATE REQUIRED PROPERTY cashBalance -> std::int64;
      CREATE REQUIRED PROPERTY name -> std::str;
  };
  ALTER TYPE default::PurchaseHistory {
      CREATE REQUIRED LINK user -> default::User;
  };
};
