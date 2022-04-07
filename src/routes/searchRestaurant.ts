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

    const data = await sql`
    select r.name as "restaurantName", r.id as "restaurantId" from menu m join restaurant r on r.id=m.restaurant_id where r.document @@ websearch_to_tsquery(${name});
    `;

    reply.send({
      name: data,
    });
  });
}
