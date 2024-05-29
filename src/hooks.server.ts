import type { Handle } from '@sveltejs/kit'
import { lucia } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {

	// Obtenemos el ID de la sesion guardado en la cookie
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	// Si no hay ID session guardada en cookie, retornamos
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;

		return resolve(event);
	}

	// Validamos el ID session guardado en la cookie
	const { session, user } = await lucia.validateSession(sessionId);

	// Si existe una sesion con ese ID pero fress es true significa que se extendio la sesion y por lo tanto tenemos que renovar la cookie
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	// Si el ID guardado en la cookie no es valido, reseteamos la cookie
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	// Gurdamos los valores de la sesion, del usuario y retornamos
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
}