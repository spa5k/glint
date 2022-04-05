// We will first seed restaurant data
import sql from "../src/config/sql";
import RestaurantData1 from "./restaurant_with_menu.json";
// User and history seeding
import UserData from "./users_with_purchase_history.json";

type OpeningHour = {
  day: string;
  fromHours: number;
  fromMinutes: number;
  toHours: number;
  toMinutes: number;
};

const restaurantAndMenuSeeding = async () => {
  RestaurantData1.forEach(async (restaurant) => {
    const { cashBalance, openingHours, restaurantName } = restaurant;
    const menus = restaurant.menu;

    const openingHoursArray = openingHours.split("/");
    const openingHoursArr: OpeningHour[] = [];

    openingHoursArray.map((openingHours) => {
      // closing hours from the end of the line. and remove them from origin opening hours
      const closingHours = openingHours.split("-")[1].trim();
      const openingHoursWithoutClosingHours = openingHours
        .replace(closingHours, "")
        .replace("-", "")
        .trim();
      // Take last 2 values from openingHour
      const openingHour = openingHoursWithoutClosingHours
        .split(" ")
        .slice(-2)
        .join(" ");
      // remove openingHour from openingHoursWithoutClosingHours
      const openingHoursWithoutOpeningHour = openingHoursWithoutClosingHours
        .replace(openingHour, "")
        .trim();

      // split openingHoursWithoutOpeningHour by , and then map through it, use the values and push them to openingHoursO
      openingHoursWithoutOpeningHour.split(",").map((day) => {
        // Extract fromHours and fromMinutes from openingHour
        const fromHoursOpening = openingHour.split(" ");
        const [hoursOpening, minsOpening] = fromHoursOpening[0].split(":");
        const AmOrPmOpening = fromHoursOpening[1];
        let finalHoursOpening = parseInt(hoursOpening);

        const fromHoursClosing = openingHour.split(" ");
        const [hoursClosing, minsClosing] = fromHoursClosing[0].split(":");
        const AmOrPmClosing = fromHoursClosing[1];
        let finalHoursClosing = parseInt(hoursClosing);

        if (AmOrPmOpening === "pm") {
          finalHoursOpening = parseInt(hoursOpening) + 12;
        }

        if (AmOrPmClosing === "pm") {
          finalHoursClosing = parseInt(hoursClosing) + 12;
        }

        const emptyObj: OpeningHour = {
          day,
          fromHours: isNaN(finalHoursOpening) ? 0 : finalHoursOpening,
          fromMinutes: isNaN(parseInt(minsOpening)) ? 0 : parseInt(minsOpening),
          toHours: isNaN(finalHoursClosing) ? 0 : finalHoursClosing,
          toMinutes: isNaN(parseInt(minsClosing)) ? 0 : parseInt(minsClosing),
        };
        openingHoursArr.push(emptyObj);
      });
    });
    // Insert restaurant data and return back id
    const restaurantId = await sql`
      INSERT INTO restaurant (name, balance, opening_hours) VALUES (${restaurantName}, ${cashBalance}, ${JSON.stringify(
      openingHoursArr
    )}) RETURNING id`;

    console.log(restaurantId[0].id);

    menus.map(async (menu) => {
      const { dishName, price } = menu;
      const menuId =
        await sql`INSERT INTO menu (name, price, restaurant_id) VALUES (${dishName}, ${price}, ${restaurantId[0].id}) RETURNING id`;
      console.log(menuId[0].id);
    });

    // Use restaurantId to insert menus
  });
};

const userAndHistorySeeding = async () => {
  for (let index = 0; index < UserData.length; index++) {
    const user = UserData[index];
    const { cashBalance, name, purchaseHistory } = user;

    // Create user from the values above and return id
    const createdUser = await sql`
      INSERT INTO users (name, balance) VALUES (${name}, ${cashBalance}) RETURNING id`;
    const userId = createdUser[0].id;

    // Map over purchaseHistory.
    // Get restaurant name, dishname
    // Get price
    purchaseHistory.map(async (purchase) => {
      const { dishName, restaurantName, transactionDate } = purchase;
      const res = await sql`
        select menu.id as "menuId",price,restaurant.id as "restaurantId" from menu JOIN restaurant ON menu.restaurant_id=restaurant.id where menu.name = ${dishName} and restaurant.name = ${restaurantName}`;

      const { menuId, restaurantId, price } = res[0];

      const timestampzDate = new Date(transactionDate).toISOString();

      const res1 = await sql`
        INSERT INTO history (user_id, menu_id, restaurant_id, amount, created_at) VALUES (${userId}, ${menuId}, ${restaurantId}, ${price}, ${timestampzDate}) returning id`;
      console.log(res1[0].id);
    });
  }
};

restaurantAndMenuSeeding()
  .then(() => {
    userAndHistorySeeding();
  })
  .catch((err) => {
    console.log(err);
  });
