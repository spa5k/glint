import fetch from "node-fetch";
import { describe, expect, it } from "vitest";

describe("menuSearch", async () => {
  it("should not return a list of results", async () => {
    const response = await fetch(
      "http://localhost:3000/search/menu?name=randomabcd",
    );
    const json = await response.json();

    expect(json).toEqual({ error: "Not Found", message: "No data found" });
  });

  it("should return a list of results", async () => {
    const response = await fetch(
      "http://localhost:3000/search/menu?name=chicken",
    );
    const json = await response.json();

    expect(
      (
        json as {
          result: any;
        }
      ).result.length,
    ).toBeGreaterThan(10);
  });

  it("should return a list of results", async () => {
    const response = await fetch(
      "http://localhost:3000/search/menu?name=chicken",
    );
    const json = await response.json();

    // @ts-ignore
    const data = json.result[0];

    const name: string = data.dishName;

    expect(name.toLowerCase()).includes("chicken");
  });
});
