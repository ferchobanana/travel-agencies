import { redirect } from '@sveltejs/kit'
import { db } from "$lib/server/db/db"
import { usersTable } from "$lib/server/db/schema"
import { eq } from 'drizzle-orm'

export const load = async ({ locals, request, url }) => {

    if(!locals.user) {
        redirect(302, "/login")
    }

    const pageParam = url.searchParams.get('p')
    let page = 1

    if (typeof pageParam == "string") {
        page = parseInt(pageParam)
    }

    const el =  10
    const offset = (page * el) - el

    const vendedores = await db.select({
                                    id: usersTable.id,
                                    user: usersTable.userName,
                                    email: usersTable.email,
                                    creado: usersTable.createdAt,
                                    user_data: usersTable.data
                                })
                                .from(usersTable)
                                .where(eq(usersTable.type, "vendedor"))
                                .limit(el)
                                .offset(offset)

    return { vendedores }

}