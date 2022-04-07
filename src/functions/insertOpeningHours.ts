import sql from "../config/sql";
import { dayToDayNumber } from "../utils/dayToDayString";
import { extractDay } from "../utils/extractDay";

export const insertOpeningHours = async (restaurantId: string) => {
  const { closingHour, days, openingHour } = extractDay();

  const dayNumber = dayToDayNumber(days);
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
    await sql`
          insert into opening_hours(restaurant_id, day, hours)
          values (${restaurantId}, ${
      dayNumber + 1
    }, ${sql`timerange(${openingHour}, ${closingHour})`})`;
  } catch (error) {
    console.error("error", error);
  }
};
