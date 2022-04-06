import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import sql from "../config/sql";
import { dayToDayString } from "../utils/dayToDayString";

// interface IQuerystring {
//   date: Date;
// }

export default async function indexController(fastify: FastifyInstance) {
  // GET /
  fastify.get<{
    // Querystring: IQuerystring;
  }>("/", async (request, reply) => {
    // Get today's day from Date Obj
    const now = dayjs().day();
    // Get today's day as a string
    const day = dayToDayString(now);

    // Get all restaurants which are opened today
    const restaurant = await sql`
    select * from restaurant where ${day}=ANY(days_opened)
    `;
    console.log(restaurant);

    reply.send({
      date: dayToDayString(now),
    });
  });
}
