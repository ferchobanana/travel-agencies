<script lang="ts">
    import Icon from "@iconify/svelte"

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
        <div class="vendedor card">
            <p class="id">123456</p>
            <p class="nombre">Fernando Jiménez</p>
            <p class="fecha-registro">31/05/24</p>

            <div class="botones">
                <button class="base-button">Editar</button>
            </div>
        </div>
    </div>

</div>

<style>
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