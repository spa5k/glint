import postgres from "postgres";
import sql from "../config/sql";
import { dayToDayNumber } from "../utils/dayToDayString";
import { extractDay } from "../utils/extractDay";

export const insertOpeningHours = (
  restaurantId: string
): postgres.PendingQuery<postgres.Row[]>[] => {
  const promiseArr: postgres.PendingQuery<postgres.Row[]>[] = [];

  // get a random number between 1-7
  const randomDay = Math.floor(Math.random() * 7) + 1;
  const daysDone: number[] = [];

  for (let index = 0; index < randomDay; index++) {
    const { closingHour, days, openingHour } = extractDay();
    const dayNumber = dayToDayNumber(days);

    if (daysDone.includes(dayNumber)) {
      index--;
      continue;
    }
    daysDone.push(dayNumber);

    console.log(
      "dayNumber",
      dayNumber,
      "restaurant_id",
      restaurantId,
      "openingHour",
      openingHour,
      "closingHour",
      closingHour
    );

    try {
      const promise = sql`
          insert into opening_hours(restaurant_id, day, hours)
          values (${restaurantId}, ${
        dayNumber + 1
      }, ${sql`timerange(${openingHour}::time, ${closingHour})::time`})`;
      promiseArr.push(promise);
    } catch (error) {
      console.error("error", error);
    }
  }

  return promiseArr;
};
