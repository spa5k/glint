import postgres from "postgres";

const sql = postgres({
  user: "core",
  password: "core",
  host: "localhost",
  database: "core",
  port: 5432,
});

export default sql;
// Postgres connection string with ssl disabled/off
// postgres://core:core@localhost:5432/core
// Disabled ssl string
// postgres://core:core@localhost:5432/core?sslmode=disable
