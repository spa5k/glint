import fetch from "node-fetch";
import { describe, expect, it } from "vitest";
import sql from "../src/config/sql";

describe("menuSearch", async () => {
  it("should return a list of results", async () => {
    // Get a random user order by random
    const [user] = await sql`SELECT * FROM users ORDER BY RANDOM() LIMIT 1`;
    const response = await fetch(
      `http://localhost:3000/user?userId=${user.id}`,
    );
    const json = await response.json();

    expect(
      (
        json as {
          user: {
            id: number;
          };
        }
      ).user.id,
    ).toEqual(user.id);
  });

  it("should not return a user", async () => {
    const response = await fetch("http://localhost:3000/user");
    const json = await response.json();

    expect(json).toEqual({
      error: "No such user",
      message: "No user id provided",
    });
  });

  it("should not return a user when wrong id is send", async () => {
    const response = await fetch("http://[::1]:3000/user?userId=1");
    const json = await response.json();

    expect(json).toEqual({
      error: "Internal Server Error",
      message: "Something went wrong",
    });
  });
});
