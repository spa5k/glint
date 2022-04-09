import { FastifyInstance } from "fastify";
import sql from "../config/sql";

interface IQuerystring {
  max: number;
  min: number;
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
    const { max, min, limit } = request.query;
    // Extract hour, mins, am pm from date
    if (!max || !min || !limit) {
      reply.code(400).send({
        error: "Bad Request",
        message: "Missing query parameters, please send max,min and limit as params",
      });
      return;
    }

    let data;
    try {
      data = await sql`
  
        select rs.name, rs.id from restaurant rs 
        left join menu m on m.restaurant_id=rs.id 
        where m.price between ${min} and ${max} 
        group by rs.name, rs.id having count(m.name)>5 
        order by rs.name limit ${limit};
      `;
    } catch (err) {
      console.log(err);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }
    if (data.length === 0) {
      return reply.code(404).send({
        error: "Not Found",
        message: "No data found",
      });
    }

    return reply.send({
      top: data,
    });
  });
}
