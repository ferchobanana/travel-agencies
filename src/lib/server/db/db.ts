import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { sql } from "drizzle-orm";
import { POSTGRES_URL } from '$env/static/private';

const pgClient = postgres(POSTGRES_URL)
export const db = drizzle(pgClient)

await db.execute(sql`SET TIME ZONE 'America/Mexico_City'`)