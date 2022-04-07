import postgres from "postgres";
import sql from "../config/sql";

export const insertMenu = async (
  restaurantId: string,
  menus: {
    dishName: string;
    price: number;
  }[]
) => {
  const menuPromise: postgres.PendingQuery<postgres.Row[]>[] = [];

  menus.map(async (menu) => {
    const { dishName, price } = menu;

    const promise = sql`INSERT INTO menu (name, price, restaurant_id) VALUES (${dishName}, ${price}, ${restaurantId})`;
    menuPromise.push(promise);
  });

  try {
    await Promise.all(menuPromise);
  } catch (err) {
    console.error("menu promise", err);
  }
};
