import { redirect } from '@sveltejs/kit'
import { db } from "$lib/server/db/db"
import { usersTable } from "$lib/server/db/schema"

export const load = async ({ locals, request, url }) => {

    if(!locals.user) {
        redirect(302, "/login")
    }

    const pageParam = url.searchParams.get('page')
    let page = 1

    if (typeof pageParam == "string") {
        page = parseInt(pageParam)
    }

    const el =  10
    const first = (page - 1) * el + 1
    const last = page * el

    // const vendedores = await db.select().from(usersTable).where()

}