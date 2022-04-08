import { FastifyInstance } from "fastify";
import sql from "../config/sql";

interface IQuerystring {
  greater: number;
  less: number;
  limit: number;
}

export default async function topDisherController(fastify: FastifyInstance) {
  /*
  └── / (GET)
      └── top (GET)
          └── / (GET)
  */
  fastify.get<{
    Querystring: IQuerystring;
  }>("/", async (request, reply) => {
    const { greater, less, limit } = request.query;
    // Extract hour, mins, am pm from date
    if (!greater || !less || !limit) {
      reply.code(400).send({
        error: "Bad Request",
        message: "Missing query parameters, please send greater, less and limit as params",
      });
      return;
    }

    const data = await sql`
      select rs.name, rs.id from restaurant rs 
      left join menu m on m.restaurant_id=rs.id 
      where m.price between ${less} and ${greater} 
      group by rs.name, rs.id having count(m.name)>5 
      order by rs.name limit ${limit};
    `;

    reply.send({
      name: data,
    });
  });
}
