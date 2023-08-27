// for migrations
import postgres from "postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

const migrationDb = drizzle(migrationClient);
migrate(migrationDb, { migrationsFolder: "drizzle" }).then(() =>
  console.log("migrations for drizzle finished"),
);

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
export const db: PostgresJsDatabase = drizzle(queryClient);
