<script lang="ts">

    import { goto } from "$app/navigation"
    import LoadingPage from "$lib/components/LoadingPage.svelte"

    type Producto = {
        id: string
        nombre: string
        precioAdulto: number
        precioNino: number
        precioInfante: number
    }

    type ProductoReserva = {
        id: string
        nombre: string
        adultos: number
        ninos: number
        infantes: number
        precioAdulto: number
        precioNino: number
        precioInfante: number
        fecha: string
    }

    let nombre: string = ""
    let email: string = ""
    let celular: string = ""

    let productos: Producto[] = [
        {
            id: "1",
            nombre: "Producto 1",
            precioAdulto: 1000,
            precioNino: 1000,
            precioInfante: 0
        },
        {
            id: "2",
            nombre: "Producto 2",
            precioAdulto: 1500,
            precioNino: 1200,
            precioInfante: 0
        }
    ]

    let productoSeleccionado: string

    let productosReserva: ProductoReserva[] = []

    function agregarProducto () {
        const productoAgregado = productos.find((producto) => producto.id == productoSeleccionado)

        if (productoAgregado) {
            const temp_producto: ProductoReserva = {
                id: productoAgregado.id,
                nombre: productoAgregado.nombre,
                adultos: 1,
                ninos: 0,
                infantes: 0,
                precioAdulto: productoAgregado.precioAdulto,
                precioNino: productoAgregado.precioNino,
                precioInfante: productoAgregado.precioInfante,
                fecha: ""
            }

            productosReserva = [...productosReserva, temp_producto]
        }

        productoSeleccionado = ""
    }

    function borrarProducto(i: number) {
        productosReserva.splice(i, 1)
        productosReserva = [...productosReserva]
    }

    function sumarTotalPersonas(personas: number, precio: number) {
        return precio * personas       
    }

    function sumarTotalProducto(p: ProductoReserva) {
        return (p.precioAdulto * p.adultos) + (p.precioNino * p.ninos) + (p.precioInfante * p.infantes)
    }

    function sumarTotal(pr: ProductoReserva[]) {
        let sum: number = 0

        pr.map((p) => {
            sum += sumarTotalProducto(p)
        })

        return sum
    }

    let loading: boolean = false
    let formMessage: string = ""

    async function handleSubmit() {  
        loading = true

        const res = await fetch('/api/guardar-reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                email,
                celular,
                productos: productosReserva
            })
        })
        
        const { message, status } = await res.json()

        if(status === 200){
            goto("/reservas")
        }

        formMessage = message
        loading = false
    }


</script>

<div class="page">

    {#if loading}
        <LoadingPage></LoadingPage>
    {/if}

    <h1 class="base-page-title">Crea una nueva reserva</h1>

    <div class="columna-izquierda">

        <!-- Formulario inicial -->
        <div class="datos-reserva card">
            <h2>Datos de la reserva</h2>
            <div class="full-input-container">
                <label for="nombre-persona" class="base-label">Nombre de la persona</label>
                <input type="text" class="base-input" placeholder="Nombre persona" bind:value={nombre}>
            </div>

            <div class="full-input-container">
                <label for="email" class="base-label">Email</label>
                <input type="text" class="base-input" placeholder="Email" bind:value={email}>
            </div>

            <div class="full-input-container">
                <label for="celular" class="base-label">Celular</label>
                <input type="text" class="base-input" placeholder="Número de celular" bind:value={celular}>
            </div>
        </div>

        <div class="productos card">
            <h2>Productos</h2>

            <!-- Selector de productos -->
            <div class="selector-productos">
                <label for="selector-productos" class="base-label">Selecciona productos</label>
                <select class="base-input" id="selector-productos"
                        bind:value={productoSeleccionado}
                        on:change={agregarProducto}>

                    <option selected disabled hidden value="">Selecciona un producto</option>

                    {#each productos as producto}
                        <option value={producto.id}> { producto.nombre }</option>
                    {/each}
                </select>
            </div>

            <!-- Productos de la reserva -->
            {#each productosReserva as producto, i (i)}
                <div class="producto">

                    <div class="nombre-boton">
                        <h3>{ producto.nombre }</h3>
                        <button on:click={() => {borrarProducto(i)}}>Eliminar</button>
                    </div>

                    <div class="personas-grid">
                        <div class="personas">
                            <label for="Adultos" class="base-label">Adultos</label>
                            <input type="number" class="base-input" placeholder="Adultos" bind:value={producto.adultos}>
                        </div>

                        <div class="personas">
                            <label for="Adultos" class="base-label">Niños</label>
                            <input type="number" class="base-input" placeholder="Niños" bind:value={producto.ninos}>
                        </div>

                        <div class="personas">
                            <label for="Adultos" class="base-label">Infantes</label>
                            <input type="number" class="base-input" placeholder="Infantes" bind:value={producto.infantes}>
                        </div>
                    </div>

                    <div class="fecha">
                        <label for="fecha" class="base-label">Fecha de salida</label>
                        <input type="date" id="fecha" class="base-input" bind:value={producto.fecha}>
                    </div>

                    <div class="notas">
                        <label for="notas" class="base-label">Notas</label>
                        <input type="text" class="base-input" id="notas" placeholder="Notas">
                    </div>
                </div>
            {/each}

        </div>
    </div>

    <!-- Total de la reserva -->
    <div class="columna-derecha">

        {#if productosReserva.length != 0}

            <div class="total card">

                {#each productosReserva as p}
                    <div class="total-producto">    
                        <p class="nombre-producto">{ p.nombre }</p>

                        <div class="total-personas-producto">
                            <p class="total-personas">Adultos x { p.adultos }</p>
                            <p class="total-precio-personas">${ sumarTotalPersonas(p.adultos, p.precioAdulto) }</p>
                        </div>
                        <div class="total-personas-producto">
                            <p class="total-personas">Niños x { p.ninos }</p>
                            <p class="total-precio-personas">${ sumarTotalPersonas(p.ninos, p.precioNino) }</p>
                        </div>
                        <div class="total-personas-producto">
                            <p class="total-personas">Infantes x { p.infantes }</p>
                            <p class="total-precio-personas">${ sumarTotalPersonas(p.infantes, p.precioInfante) }</p>
                        </div>
                    </div>
                {/each}

                <div class="precio-total">
                    <p>Total:</p>
                    <p>${ sumarTotal(productosReserva) } MXN</p>
                </div>

                <button disabled={loading} class="boton-crear base-button" on:click={handleSubmit}>Crear reserva</button>
            
                <p class="form-message">{ formMessage }</p>
            </div>
        {/if}
    </div>

</div>

<style>
    /* Página */
    .page {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px 30px;
    }
    h1 {
        margin-bottom: 30px;
        grid-column: span 3;
    }
    /* Columnas */
    .columna-izquierda {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .columna-derecha {
        grid-column: span 1;
    }
    /* Datos reserva */
    .datos-reserva {
        display: flex;
        flex-direction: column;
        gap: 12px 10px;
        width: 100%;
        padding: 20px 30px;
    }
    .full-input-container {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-bottom: 5px;
    }

    /* Productos */
    .productos {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .selector-productos {
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
    }

    /* Producto individual */
    .producto {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border-light-color);
        margin-bottom: 20px;
    }
    .nombre-boton {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .nombre-boton h3 {
        font-size: 18px;
        color: var(--primary-color);
    }
    .nombre-boton button {
        color: var(--primary-color);
        background: none;
        border: none;
        cursor: pointer;
    }
    .personas-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
    }
    .personas {
        display: flex;
        flex-direction: column;
        grid-column: span 1;
    }


    /* Total */
    .total {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .total-producto {
        display: flex;
        flex-direction: column;
    }
    .nombre-producto {
        font-weight: 600;
        font-size: 16px;
    }
    .total-personas-producto {
        display: flex;
        justify-content: space-between;
    }
    .total-personas-producto p {
        font-size: 14px;
    }
    .boton-crear {
        font-weight: 500;
        font-size: 15px;
        padding: 15px;
    }
    .precio-total {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 600;
    }
</style>