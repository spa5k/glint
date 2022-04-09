import fetch from "node-fetch";
import { describe, expect, it } from "vitest";
import sql from "../src/config/sql";

describe("menuSearch", async () => {
  it("should return a list of results", async () => {
    const [user] = await sql`SELECT * FROM users ORDER BY balance ASC LIMIT 1`;
    const [menu] = await sql`SELECT * FROM menu ORDER BY price DESC LIMIT 1`;
    const response = await fetch(
      `http://localhost:3000/buy?userId=${user.id}&menuId=${menu.id}`,
      { method: "POST" }
    );
    const json = await response.json();

    expect(json).toEqual({
      error: "Bad Request",
      message: "Insufficient balance",
    });
  });

  it("test balance change of user", async () => {
    const [user] = await sql`SELECT * FROM users ORDER BY balance DESC LIMIT 1`;
    const [menu] = await sql`SELECT * FROM menu ORDER BY price ASC LIMIT 1`;

    const response = await fetch(
      `http://localhost:3000/buy?userId=${user.id}&menuId=${menu.id}`,
      { method: "POST" }
    );
    const json = await response.json();

    const usersBalance = parseFloat(user.balance);
    const menuPrice = parseFloat(menu.price);
    const finalPrice = usersBalance - menuPrice;

    // Round finalPrice to 2 decimal places
    const roundedFinalPrice = Math.round(finalPrice * 100) / 100;
    const roundedUserBalance =
      Math.round(parseFloat(json.user.balance) * 100) / 100;

    // @ts-ignore
    expect(roundedUserBalance).toEqual(parseFloat(roundedFinalPrice));
  });
});
