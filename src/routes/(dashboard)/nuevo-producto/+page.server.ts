import { redirect, fail, type Actions } from "@sveltejs/kit";
import { db } from "$lib/server/db/db"
import { productosTable } from "$lib/server/db/schema"

export const actions = {

    default: async ({ request, locals }) => {
        if(!locals.user) {
            redirect(302, "/")
        }

        const formData = await request.formData()

        const nombre = formData.get('nombre')
        const descripcion = formData.get('descripcion')
        const precioAdulto = formData.get('precio-adulto')
        const precioNino = formData.get('precio-nino')
        const precioInfante = formData.get('precio-infante')

        if(typeof nombre !== "string" || nombre.length === 0) {
            return fail(400, { message: "Debes ingresar un nombre válido"})
        }

        if (typeof descripcion !== "string" || descripcion.length === 0) {
            return fail(400, { message: "Debes ingresar una descripción válida" })
        }

        if (!precioAdulto) {
            return fail(400, { message: "Debes ingresar un precio de adulto válido" })
        }

        let adultoFloat: number = 0
        let ninoFloat: number = 0
        let infanteFloat: number = 0

        if(typeof precioAdulto === "string") {
            adultoFloat = parseFloat(precioAdulto)
        }

        if (typeof precioNino === "string" && precioNino !== "") {
            ninoFloat = parseFloat(precioNino)
        }

        if (typeof precioInfante === "string" && precioInfante !== "") {
            infanteFloat = parseFloat(precioInfante)
        }

        try {
            await db.insert(productosTable).values({
                nombre,
                descripcion,
                precioAdulto: adultoFloat,
                precioNino: ninoFloat,
                precioInfante: infanteFloat
            })
        }
        catch (err) {
            console.log(err)
            return fail(400, { message: "No se pudo guardar el producto. Intentalo nuevamente."})
        }

        redirect(302, "/productos-revendedores")

    }

} satisfies Actions