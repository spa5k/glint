import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import sql from "../config/sql";

interface IQuerystring {
  date: Date;
}

export default async function dateController(fastify: FastifyInstance) {
  /*
    └── / (GET)
        ├── date (GET)
        │   └── / (GET)
  */
  fastify.get<{
    Querystring: IQuerystring;
  }>("/", async (request, reply) => {
    const date = request.query.date;
    // Extract hour, mins, am pm from date
    const hour = dayjs(date).hour();
    const min = dayjs(date).minute();
    const amPm = hour >= 12 ? "pm" : "am";
    const time = `${hour > 12 ? hour % 12 : hour}:${min}${amPm}`;
    const dayInNumber = dayjs(date).day();

    let restaurant;
    try {
      restaurant = await sql`
        select * from restaurant join opening_hours on restaurant.id=opening_hours.restaurant_id where day=${
        dayInNumber + 1
      } and hours @> ${time}::time`;
    } catch (err) {
      console.error(err);
    }

    reply.send({
      restaurant,
    });
  });
}
