import { FastifyInstance } from "fastify";
import indexController from "./routes/indexController";
import userController from "./routes/userController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(userController, { prefix: "/api/v1/user" });
  fastify.register(indexController, { prefix: "/" });
}
