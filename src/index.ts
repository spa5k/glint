import "dotenv/config";
import Fastify from "fastify";
import swagger from "fastify-swagger";
import router from "./router";

const main = async (): Promise<void> => {
  // Write a fastify server
  const app = Fastify({
    logger: true,
  });

  app.register(router);

  // @ts-ignore
  await app.register(swagger, {
    mode: "static",
    specification: {
      path: "./reference/glint.yaml",
    },
    exposeRoute: true,
    routePrefix: "/docs",
  });

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
