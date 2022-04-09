import { FastifyInstance } from "fastify";
import sql from "../config/sql";

interface IQuerystring {
  name: string;
}

export default async function searchMenuController(fastify: FastifyInstance) {
  /*
    └── / (GET)
        └── search (GET)
            └── / (GET)
                ├── menu (GET)
                │   └── / (GET)
  */
  fastify.get<{
    Querystring: IQuerystring;
  }>(":name", async (request, reply) => {
    const { name } = request.query;
    // Extract hour, mins, am pm from date
    let data;
    try {
      data = await sql`
      select m.name as "dishName", m.id as "menuId", m.price, r.name as "restaurantName", r.id as "restaurantId" from menu m join restaurant r on r.id=m.restaurant_id where m.document @@ websearch_to_tsquery(${name});
      `;
    } catch (err) {
      console.error(err);
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
      result: data,
    });
  });
}
