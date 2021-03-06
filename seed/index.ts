// We will first seed restaurant data
import "dotenv/config";
import postgres from "postgres";
import sql from "../src/config/sql";
import { insertMenu } from "../src/functions/insertMenu";
import { insertOpeningHours } from "../src/functions/insertOpeningHours";
import RestaurantData1 from "./restaurant_with_menu.json";
import UserData from "./users_with_purchase_history.json";

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
      const promises: postgres.PendingQuery<postgres.Row[]>[][] = [];

      const element = RestaurantData1[index];
      const restaurantId = restaurantIdArr[index];
      const { menu } = element;

      try {
        const promise = insertOpeningHours(restaurantId);
        promises.push(promise);
      } catch (err) {
        continue;
      }
      for (const promise of promises) {
        await Promise.all(promise);
      }
      try {
        await Promise.all(promises);
        await insertMenu(restaurantId, menu);
      } catch {
        continue;
      }
    }
  }
};

const userAndHistorySeeding = async () => {
  for (const user of UserData) {
    const { cashBalance, name, purchaseHistory } = user;

    // Create user from the values above and return id
    const createdUser = await sql`
      INSERT INTO users (name, balance) VALUES (${name}, ${cashBalance}) RETURNING id`;
    const userId = createdUser[0].id;
    // console.log(createdUser);
    // Map over purchaseHistory.
    // Get restaurant name, dishname
    // Get price
    purchaseHistory.map(async (purchase) => {
      const { dishName, restaurantName, transactionDate } = purchase;
      const res = await sql`
        select menu.id as "menuId",price from menu JOIN restaurant ON menu.restaurant_id=restaurant.id where menu.name = ${dishName} and restaurant.name = ${restaurantName}`;

      const { menuId, price } = res[0];

      const timestampzDate = new Date(transactionDate).toISOString();

      await sql`
        INSERT INTO history (user_id, menu_id,  amount, created_at) VALUES (${userId}, ${menuId}, ${price}, ${timestampzDate}) returning id`;
    });
  }
};

const main = async () => {
  await restaurantAndMenuSeeding();
  await userAndHistorySeeding();
};
main()
  .catch(console.error)
  .finally(() => {
    console.log("???? Seeding Done");
    process.exit(0);
  });
