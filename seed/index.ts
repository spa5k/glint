// We will first seed restaurant data
import postgres from "postgres";
import sql from "../src/config/sql";
import { insertMenu } from "../src/functions/insertMenu";
import { insertOpeningHours } from "../src/functions/insertOpeningHours";
import RestaurantData1 from "./restaurant_with_menu.json";

const restaurantAndMenuSeeding = async () => {
  const restaurantIdArr: string[] = [];
  const resPromiseArr: postgres.PendingQuery<postgres.Row[]>[] = [];

  for (const restaurant of RestaurantData1) {
    const { cashBalance, restaurantName } = restaurant;

    try {
      const res = sql`
        INSERT INTO restaurant (name, balance) VALUES (${restaurantName}, ${cashBalance}) RETURNING id`;
      resPromiseArr.push(res);
    } catch (err) {
      console.error("restaurant", err);
      continue;
    }
  }

  const res = await Promise.all(resPromiseArr);

  res.map((rest) => {
    restaurantIdArr.push(rest[0].id);
  });

  // check if length of restaurantIdArr is equal to RestaurantData1.length
  if (restaurantIdArr.length === RestaurantData1.length) {
    for (let index = 0; index < RestaurantData1.length; index++) {
      const element = RestaurantData1[index];
      const restaurantId = restaurantIdArr[index];
      console.error("Accessing id", restaurantId);
      const { menu } = element;

      try {
        await insertMenu(restaurantId, menu);
      } catch {
        continue;
      }
    }
  }
};

restaurantAndMenuSeeding().catch((err) => {
  console.error("restaurantAndMenuSeeding", err);
});

// // openingHours seeding
const openingHoursSeeding = async () => {
  const res = await sql`SELECT id FROM restaurant`;
  console.log(res.length);
  const promises: postgres.PendingQuery<postgres.Row[]>[] = [];
  for (const element of res) {
    const restaurantId = element.id;
    try {
      const promise = insertOpeningHours(restaurantId);
      promises.push(...promise);
    } catch (err) {
      continue;
    }
  }
  console.log("Length of promise", promises.length);
  // await Promise.all(promises);
};
openingHoursSeeding().then((res) => {
  console.log("done", res);
});

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

// restaurantAndMenuSeeding().catch(console.error);
//   // .then(() => {
//   //   // userAndHistorySeeding();
//   // })
//   .catch((err) => {
//     console.log(err);
//   });
