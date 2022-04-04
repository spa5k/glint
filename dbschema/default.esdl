module default {
  type Restaurant {
    required property cashBalance -> int64;
    required property openingHours -> str;
    required property restaurantName -> str;
    required multi link menu -> Menu;
  }

  type Menu {
    required property dishName -> str;
    required property price -> int64;
  }

  type User {
    required property cashBalance -> int64;
    required property name -> str;
    required multi link history -> PurchaseHistory;
  }

  type PurchaseHistory {
    required property amount -> float32;
    required property date -> datetime;
    required link user -> User;
    required link restaurant -> Restaurant;
    required link menu -> Menu;
  }
}
