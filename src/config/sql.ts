import postgres from "postgres";

const sql = postgres({
  user: "core",
  password: "core",
  host: "localhost",
  database: "core",
  port: 5432,
  debug: true,
});

export default sql;
