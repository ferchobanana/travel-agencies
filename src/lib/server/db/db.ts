import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { POSTGRES_URL } from '$env/static/private';

const pgClient = postgres(POSTGRES_URL)
export const db = drizzle(pgClient)

