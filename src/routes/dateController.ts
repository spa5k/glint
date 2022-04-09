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
  }>(":date", async (request, reply) => {
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
        select r.name, r.id, o.day, o.hours from restaurant r join opening_hours o on r.id=o.restaurant_id where day=${
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
