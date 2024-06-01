<script lang="ts">
    import Icon from "@iconify/svelte"
</script>

<div class="page">
    <h1 class="base-page-title">Productos revendedores</h1>

    <div class="contenedor-nuevo-producto">
        <a href="/nuevo-producto" class="nuevo-producto base-button">
            <Icon icon="simple-line-icons:plus" />
            Nuevo producto
        </a>
    </div>

    <div class="productos">
        <div class="producto card">
            <p class="id">123456</p>
            <p class="nombre">Producto 1</p>
            <p class="precio-adulto">$2300 MXN</p>

            <div class="botones">
                <button class="base-button">Editar producto</button>
            </div>
        </div>
    </div>
</div>

<style>
    h1 {
        margin-bottom: 30px;
    }
    .producto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 25px;
    }
    .contenedor-nuevo-producto {
        display: flex;
        justify-content: flex-end;
        margin-bottom:  30px;
    }
    .nuevo-producto {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
    }
</style>