import { FastifyInstance } from "fastify";
import sql from "../config/sql";

interface IQuerystring {
  userId: string;
}

export default async function userController(fastify: FastifyInstance) {
  /*
    └── / (GET)
        ├── user (GET)
        │   └── / (GET)
  */
  fastify.get<{
    Querystring: IQuerystring;
  }>(":userId", async (request, reply) => {
    console.log(request.query);
    const userId = request.query.userId;

    // if no user id
    if (!userId) {
      return reply.code(400).send({
        error: "No such user",
        message: "No user id provided",
      });
    }

    let user;
    try {
      const [data] = await sql`
        select * from users where id=${userId}`;
      user = data;
    } catch (err) {
      console.error(err);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }
    // If no user,
    if (!user) {
      return reply.code(404).send({
        error: "Not Found",
        message: "User not found",
      });
    }

    return reply.send({
      user,
    });
  });
}
