import fetch from "node-fetch";
import { describe, expect, it } from "vitest";

describe("menuSearch", async () => {
  it("should return a list of results", async () => {
    const response = await fetch(
      "http://localhost:3000/top?max=1000&min=1&limit=5",
    );
    const json = await response.json();

    expect(
      (
        json as {
          top: any;
        }
      ).top.length,
    ).toEqual(5);
  });

  it("should not return a list of results", async () => {
    const response = await fetch("http://localhost:3000/top");
    const json = await response.json();

    expect(json).toEqual({
      error: "Bad Request",
      message: "Missing query parameters, please send max,min and limit as params",
    });
  });
});
