import postgres from "postgres";
import sql from "../config/sql";

export const insertMenu = async (
  restaurantId: string,
  menus: {
    dishName: string;
    price: number;
  }[],
) => {
  const menuPromise: postgres.PendingQuery<postgres.Row[]>[] = [];

  menus.map(async (menu) => {
    const { dishName, price } = menu;
    // Get a random floating point number between 1 to 1000
    const randomPrice = Math.random() * 1000;
    // Round the number to 2 decimal places
    const roundedPrice = Math.round(randomPrice * 100) / 100;

    const promise = sql
      `INSERT INTO menu (name, price, restaurant_id) VALUES (${dishName}, ${roundedPrice}, ${restaurantId})`;
    menuPromise.push(promise);
  });

  try {
    await Promise.all(menuPromise);
  } catch (err) {
    console.error("menu promise", err);
  }
};
