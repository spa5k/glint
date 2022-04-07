import { FastifyInstance } from "fastify";
import dateController from "./routes/dateController";
import indexController from "./routes/indexController";
import searchMenuController from "./routes/searchMenu";
import userController from "./routes/userController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(userController, { prefix: "/user" });
  fastify.register(indexController, { prefix: "/" });
  fastify.register(dateController, { prefix: "/date" });
  fastify.register(searchMenuController, { prefix: "/search/menu" });
}
