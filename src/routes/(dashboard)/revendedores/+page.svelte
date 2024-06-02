<script lang="ts">
    import Icon from "@iconify/svelte"
    import { formatDBDate } from "$lib/formatDate";

    export let data

    

</script>

<div class="page">

    <h1 class="base-page-title">Revendedores</h1>

    <div class="contenedor-nuevo-vendedor">
        <a href="/nuevo-vendedor" class="nuevo-vendedor base-button">
            <Icon icon="simple-line-icons:plus" />
            Nueva vendedor
        </a>
    </div>

    <div class="vendedores">
        {#each data.vendedores as v (v.id)}
            <div class="vendedor card">
                <p class="id">{ v.email }</p>
                <p class="nombre">{ v.user_data.nombre }</p>
                <p class="fecha-registro">{ formatDBDate(v.creado) }</p>

                <div class="botones">
                    <a href={`/editar-vendedor?id=${v.id}`} class="base-button">Editar</a>
                </div>
            </div>
        {/each}
    </div>

</div>

<style>
    .vendedores {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .vendedor {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 25px;
    }
    .contenedor-nuevo-vendedor {
        display: flex;
        justify-content: flex-end;
        margin-bottom:  30px;
    }
    .nuevo-vendedor {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
    }
</style>