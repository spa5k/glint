import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import sql from "../config/sql";

// interface IQuerystring {
//   date: Date;
// }

export default async function indexController(fastify: FastifyInstance) {
  // GET /
  fastify.get<{
    // Querystring: IQuerystring;
  }>("/", async (_request, reply) => {
    const hour = dayjs().hour();
    const min = dayjs().minute();
    const amPm = hour >= 12 ? "pm" : "am";
    const time = `${hour > 12 ? hour % 12 : hour}:${min}${amPm}`;
    const dayInNumber = dayjs().day();

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
