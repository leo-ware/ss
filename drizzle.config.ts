import { config } from 'dotenv'
import { defineConfig } from "drizzle-kit"

config({ path: '.env' });

export default defineConfig({
    schema: "./src/lib/drizzle/schema.ts",
    schemaFilter: ["public"],
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        port: 5432,
    },
})
