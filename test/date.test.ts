import fetch from "node-fetch";
import { describe, expect, it } from "vitest";

describe("menuSearch", async () => {
  it("should return a list of results", async () => {
    const response = await fetch(
      "http://localhost:3000/date?date=2022-04-07T10:43:58.022Z",
    );
    const json = await response.json();

    expect(
      (
        json as {
          restaurant: any;
        }
      ).restaurant.length,
    ).toBeGreaterThan(1);
  });
});
