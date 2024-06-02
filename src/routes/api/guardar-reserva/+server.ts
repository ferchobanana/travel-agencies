import { error, json, redirect } from '@sveltejs/kit'
import { db } from "$lib/server/db/db"
import { reservasTable } from '$lib/server/db/schema.js'

export async function POST({ request, locals }) {

    if(!locals.user) {
        error(400, "No tienes acceso a esta ruta")
    }
    
    const { nombre, celular, email, productos } = await request.json()

    if(nombre.length == 0) {
        return json({ message: "El nombre no puede estar vacio", status: 400})
    }

    if (email.length == 0) {
        return json({ message: "El email no puede estar vacio", status: 400 })
    }

    if (celular.length == 0) {
        return json({ message: "El celular no puede estar vacio", status: 400 })
    }

    if (productos.length == 0) {
        return json({ message: "Tienes que agregar por lo menos un producto", status: 400 })
    }

    function validate_date(fecha: string) {
        const current_date = new Date;
        current_date.setHours(0, 0, 0, 0);

        const [year, month, day] = fecha.split('-')
        const input_date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

        if (input_date.getTime() == current_date.getTime()) return true

        if (input_date.getTime() < current_date.getTime()) return false 
        
        return true
    }

    for(let i = 0; i < productos.length; i++) {
        if (productos[i].fecha.length < 8) {
            return json({ message: "Los productos tienen que tener una fecha válida", status: 400 })
        }

        if(!validate_date(productos[i].fecha)) {
            return json({ message: "La fecha de un producto no puede ser anterior a la actual.", status: 400 })
        }

        if(productos[i].adultos < 1) {
            return json({ message: "La reserva tiene que contener por lo menos un adulto", status: 400 })
        }
    }

    try {
        await db.insert(reservasTable).values({
            nombre,
            celular,
            email,
            productos
        })
    }
    catch {
        return json({ message: "Hubo un error al guardar la reserva", status: 400 })
    }

    return json({ message: "Reserva creada con éxito", status: 200 })

}