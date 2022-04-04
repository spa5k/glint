import Fastify from "fastify";

const main = async (): Promise<void> => {
  // Write a fastify server
  const app = Fastify({
    logger: true,
  });

  // Add a route
  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  // Run the server!
  try {
    await app.listen(3000);
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
