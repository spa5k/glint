// We will first seed restaurant data
import postgres from "postgres";
import sql from "../src/config/sql";
import { dayToDayNumber } from "../src/utils/dayToDayString";
import { extractDay } from "../src/utils/extractDay";
import RestaurantData1 from "./restaurant_with_menu.json";

const restaurantAndMenuSeeding = async () => {
  const openingHoursPromise: postgres.PendingQuery<postgres.Row[]>[] = [];
  const menuPromise: postgres.PendingQuery<postgres.Row[]>[] = [];
  for (const restaurant of RestaurantData1) {
    const { cashBalance, restaurantName } = restaurant;
    const menus = restaurant.menu;

    let restaurantId = "";

    // Insert restaurant data and return back id
    try {
      const res = await sql`
        INSERT INTO restaurant (name, balance) VALUES (${restaurantName}, ${cashBalance}) RETURNING id`;
      restaurantId = res[0].id;
      console.log("restaurant_id", restaurantId);
    } catch (err) {
      console.log("restaurant", err);
      continue;
    }

    // generate random number between 0 and 6
    const randomDay = Math.floor(Math.random() * 7);

    // use randomDay for a for loop
    for (let i = 0; i < randomDay; i++) {
      const { closingHour, days, openingHour } = extractDay();

      const dayNumber = dayToDayNumber(days);

      const promise = sql`
          insert into opening_hours(restaurant_id, day, hours)
          values (${restaurantId}, ${
        dayNumber + 1
      }, ${sql`timerange(${openingHour}, ${closingHour})`})`;
      openingHoursPromise.push(promise);
    }

    menus.map(async (menu) => {
      const { dishName, price } = menu;

      const promise = sql`INSERT INTO menu (name, price, restaurant_id) VALUES (${dishName}, ${price}, ${restaurantId})`;
      menuPromise.push(promise);
    });
  }
  try {
    await Promise.all(openingHoursPromise);
    await Promise.all(menuPromise);
  } catch (err) {
    console.log("promise", err);
  }
};

// const userAndHistorySeeding = async () => {
//   for (let index = 0; index < UserData.length; index++) {
//     const user = UserData[index];
//     const { cashBalance, name, purchaseHistory } = user;

//     // Create user from the values above and return id
//     const createdUser = await sql`
//       INSERT INTO users (name, balance) VALUES (${name}, ${cashBalance}) RETURNING id`;
//     const userId = createdUser[0].id;

//     // Map over purchaseHistory.
//     // Get restaurant name, dishname
//     // Get price
//     purchaseHistory.map(async (purchase) => {
//       const { dishName, restaurantName, transactionDate } = purchase;
//       const res = await sql`
//         select menu.id as "menuId",price,restaurant.id as "restaurantId" from menu JOIN restaurant ON menu.restaurant_id=restaurant.id where menu.name = ${dishName} and restaurant.name = ${restaurantName}`;

//       const { menuId, restaurantId, price } = res[0];

//       const timestampzDate = new Date(transactionDate).toISOString();

//       const res1 = await sql`
//         INSERT INTO history (user_id, menu_id, restaurant_id, amount, created_at) VALUES (${userId}, ${menuId}, ${restaurantId}, ${price}, ${timestampzDate}) returning id`;
//       console.log(res1[0].id);
//     });
//   }
// };

restaurantAndMenuSeeding()
  // .then(() => {
  //   // userAndHistorySeeding();
  // })
  .catch((err) => {
    console.log(err);
  });
