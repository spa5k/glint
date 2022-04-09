import { FastifyInstance } from "fastify";
import sql from "../config/sql";

interface IQuerystring {
  name: string;
}

export default async function searchRestaurantController(
  fastify: FastifyInstance,
) {
  /*
    └── / (GET)
        └── search (GET)
            └── / (GET)
                ├── restaurant (GET)
                    └── / (GET)
  */
  fastify.get<{
    Querystring: IQuerystring;
  }>("/", async (request, reply) => {
    const { name } = request.query;
    // Extract hour, mins, am pm from date
    let data;
    try {
      data = await sql`
      select r.name as "restaurantName", r.id as "restaurantId" from menu m join restaurant r on r.id=m.restaurant_id where r.document @@ websearch_to_tsquery(${name}) group by r.name,r.id;
      `;
    } catch (err) {
      console.error(err);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }

    // If no data is found, return 404
    if (data.length === 0) {
      return reply.code(404).send({
        error: "Not Found",
        message: "No data found",
      });
    }

    return reply.send({
      result: data,
    });
  });
}
