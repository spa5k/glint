import Fastify from "fastify";
import router from "./router";

const main = async (): Promise<void> => {
  // Write a fastify server
  const app = Fastify({
    logger: true,
  });

  app.register(router);

  // Run the server!
  try {
    await app.listen(3000);
    // Print fastify routes
    console.log(app.printRoutes());
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Run the server!
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
