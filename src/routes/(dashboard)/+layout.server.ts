import { redirect } from "@sveltejs/kit";

export const load = (event) => {

    console.log("Se ejecuta el server layout")

    if (!event.locals.user) {
        redirect(302, '/login')
    }

}