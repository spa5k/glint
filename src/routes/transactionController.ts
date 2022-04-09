import { FastifyInstance } from "fastify";
import sql from "../config/sql";

interface IQuerystring {
  menuId: string;
  userId: string;
}

export default async function transactionController(fastify: FastifyInstance) {
  /*
  └── / (GET)
    ├── buy (GET)
        └── / (GET)
  */
  fastify.get<{
    Querystring: IQuerystring;
  }>("/", async (request, reply) => {
    const { menuId, userId } = request.query;
    // Extract hour, mins, am pm from date

    if (!menuId || !userId) {
      reply.code(400).send({
        error: "Bad Request",
        message: "Missing query parameters, please send menuId and userId as params",
      });
      return;
    }
    // Get existing balance of user
    let userBalance = 0;
    let price = 0;
    try {
      const [balance] = await sql`SELECT * FROM users WHERE id = ${userId}`;
      console.log("before", balance);
      userBalance = parseFloat(balance.balance);

      const [data] = await sql`select get_menu_price(${menuId}) as price;`;
      price = parseFloat(data.price);
    } catch (err) {
      console.log(err);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }

    // Get price of menu

    if (price > userBalance) {
      return reply.code(400).send({
        error: "Bad Request",
        message: "Insufficient balance",
      });
    }
    let updatedUserData;

    try {
      const [user] = await sql.begin(async (sql) => {
        const [history] = await sql`
          insert into history (menu_id, user_id, amount) 
          values (${menuId}, ${userId}, (select get_menu_price(${menuId}))) 
          returning *;`;

        let user;

        if (history.id) {
          const [userData] = await sql`
          update users set balance = balance - (select amount from history where id=${history.id})
          where id=${userId} returning *;`;
          user = userData;
        }

        return [user];
      });
      updatedUserData = user;
      console.log("after", user);
    } catch (err) {
      console.error(err);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }

    return reply.send({
      user: updatedUserData,
    });
  });
}
