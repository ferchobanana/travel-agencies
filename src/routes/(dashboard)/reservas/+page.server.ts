import { redirect } from '@sveltejs/kit';
import { desc } from "drizzle-orm"
import { db } from "$lib/server/db/db"
import { reservasTable } from '$lib/server/db/schema.js';

export async function load({ request, locals, url }) {

    if(!locals.user) {
        redirect(302, '/login')
    }

    const pageParam = url.searchParams.get('p')
    let page: number = 1

    if(pageParam && typeof pageParam === "string") {
        page = parseInt(pageParam)
    }

    const el = 5
    const offset = (page * el) - el

    const reservas =  await db.select()
                        .from(reservasTable)
                        .offset(offset)
                        .limit(el)
                        .orderBy(desc(reservasTable.createdAt))

    return { reservas }

}