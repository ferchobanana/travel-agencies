import { json } from "@sveltejs/kit"
import { pgTable, serial, varchar, text, integer, boolean, doublePrecision, jsonb, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable('users', {
    id: text('id').primaryKey(),
    email: text('email').unique(),
    userName: varchar('user_name', { length: 50 }),
    password: text('password'),
    type: text('type'),
    data: jsonb('data'),
    urlProfilePicture: text('url_profile_picture'),
    createdAt: timestamp('created_at').defaultNow()
})

export const sessionsTable = pgTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => usersTable.id),
    expiresAt: timestamp('expires_at', {
        withTimezone: true,
        mode: "date"
    }).notNull()
})

export const reservasTable = pgTable('reservas', {
    id: serial('id').primaryKey(),
    nombre: text('nombre').notNull(),
    celular: text('celular').notNull(),
    email: text('email'),
    productos: jsonb('productos').notNull(),
    total: integer('total'),
    createdAt: timestamp('created_at').defaultNow()
})

export const productosTable = pgTable('productos', {
    id: serial('id').primaryKey(),
    nombre: text('nombre').notNull(),
    descripcion: text('descripcion').notNull(),
    precioAdulto: doublePrecision('precio_adulto').notNull(),
    precioNino: doublePrecision('precio_nino').notNull(),
    precioInfante: doublePrecision('precio_infante').notNull(),
    createdAt: timestamp('created_at').defaultNow()
})