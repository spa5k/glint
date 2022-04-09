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
        select r.name, r.id, o.day, o.hours from restaurant r join opening_hours o on r.id=o.restaurant_id where day=${
        dayInNumber + 1
      } and hours @> ${time}::time`;
    } catch (err) {
      console.error(err);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }

    if (!restaurant) {
      return reply.code(404).send({
        error: "Not Found",
        message: "No restaurant found",
      });
    }

    return reply.send({
      restaurant,
    });
  });
}
