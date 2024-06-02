<script lang="ts">
	import { formatDBDate } from '$lib/formatDate.js';
    import Icon from "@iconify/svelte"

    export let data
</script>

<div>
    <h1 class="base-page-title">Reservas</h1>

    <div class="contenedor-nueva-reserva">
        <a href="/nueva-reserva" class="nueva-reserva base-button">
            <Icon icon="simple-line-icons:plus" />
            Nueva reserva
        </a>
    </div>

    <div class="reservas">
        {#each data.reservas as r (r.id)}
            <div class="reserva card">
                <p class="id-reserva">{ r.id }</p>
                <p class="nombre-persona">{ r.nombre }</p>
                <p class="fecha">{ formatDBDate(r.createdAt) }</p>
                <p class="total">$2300 MXN</p>

                <div class="botones">
                <button class="base-button">Editar reserva</button>
            </div>
            </div>
        {/each}
    </div>

    <div class="base-pagination">
        <a href="?p=1">1</a>
        <a href="?p=2">2</a>
    </div>

</div>

<style>
    /* Boton nueva reserva */
    .contenedor-nueva-reserva {
        display: flex;
        justify-content: flex-end;
        margin-bottom:  30px;
    }
    .nueva-reserva {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
    }

    /* Reservas */
    .reservas {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .reserva {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 25px;
    }

</style>