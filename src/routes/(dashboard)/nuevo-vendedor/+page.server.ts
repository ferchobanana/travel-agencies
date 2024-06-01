import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth.js';
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { db } from "$lib/server/db/db"
import { usersTable } from '$lib/server/db/schema';

export const actions = {
    default: async ({ locals, request }) => {

        if (!locals.user) {
            redirect(302, "/")
        }

        const form = await request.formData()

        const nombre = form.get('nombre')
        const usuario = form.get('usuario')
        const email = form.get('email')
        const password = form.get('password')

        if (typeof nombre !== "string" || nombre.length < 3) {
            return fail(400, { message: "Ingresa un nombre válido." })
        }

        if (typeof usuario !== "string" || usuario.length < 2) {
            return fail(400, { message: "Ingresa un usuario válido." })
        }

        if (typeof email !== "string" || email.length < 5) {
            return fail(400, { message: "Ingresa un correo electrónico válido." })
        }

        if (typeof password !== "string" || password.length < 6) {
            return fail(400, { message: "Las contraseñas deben contener por lo menos 6 caracteres." })
        }

        // Creamos un nuevo userID y un hash password
        const userId = generateIdFromEntropySize(10); // 16 characters long
        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        try {
            await db.insert(usersTable).values({
                id: userId,
                userName: usuario,
                email,
                password: passwordHash,
                type: "vendedor",
                data: {
                    nombre,
                    from: "admin-dashboard"
                }
            })
        }
        catch (err) {
            return fail(400, { message: "Email o usuario en uso. Intenta con otro." })
        }

        await lucia.createSession(userId, {});

        redirect(302, "/")

    }
}