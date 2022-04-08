import { FastifyInstance } from "fastify";
import combinedSearchController from "./routes/combinedSearchController";
import dateController from "./routes/dateController";
import indexController from "./routes/indexController";
import searchMenuController from "./routes/searchMenu";
import searchRestaurantController from "./routes/searchRestaurant";
import topDisherController from "./routes/topDishesController";
import transactionController from "./routes/transactionController";
import userController from "./routes/userController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(userController, { prefix: "/user" });
  fastify.register(indexController, { prefix: "/" });
  fastify.register(dateController, { prefix: "/date" });
  fastify.register(combinedSearchController, {
    prefix: "/search",
  });
  fastify.register(searchMenuController, { prefix: "/search/menu" });
  fastify.register(searchRestaurantController, {
    prefix: "/search/restaurant",
  });
  fastify.register(transactionController, {
    prefix: "/buy",
  });
  fastify.register(topDisherController, {
    prefix: "/top",
  });
}
