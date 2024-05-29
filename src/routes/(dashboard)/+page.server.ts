import { fail, redirect } from '@sveltejs/kit'
import { lucia } from "$lib/server/auth";

export const load = (event) => {
    redirect(302, '/inicio')
}

export const actions = {
    default: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }
        await lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/login");
    }
}