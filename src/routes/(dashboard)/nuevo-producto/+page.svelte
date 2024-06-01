<script lang="ts">

    import type { ActionData } from "./$types"
    import { enhance } from "$app/forms"
    import LoadingPage from "$lib/components/LoadingPage.svelte"
    
    export let form: ActionData

    let loading = false

    function handleSubmit() {
        loading = true
    }

    $: if(form?.message) {
        loading = false
    }

</script>

<div class="page">

    {#if loading}
        <LoadingPage></LoadingPage>
    {/if}

    <h1 class="base-page-title">Crea un nuevo producto</h1>

    <form class="nuevo-producto card" method="POST" use:enhance on:submit={handleSubmit}>
        <div class="input-container">
            <label for="nombre" class="base-label">Nombre producto</label>
            <input type="text" class="base-input" id="nombre" name="nombre" placeholder="Nombre del producto">
        </div>

        <div class="input-container">
            <label for="" class="base-label">Descripción</label>
            <input type="text" class="base-input" name="descripcion" placeholder="Descripcion">
        </div>

        <div class="grid-precios">
            <div class="precio-container">
                <label for="precio-adulto" class="base-label">Precio adulto</label>
                <input type="number" class="base-input" id="precio-adulto" name="precio-adulto" placeholder="$">
            </div>

            <div class="precio-container">
                <label for="precio-nino" class="base-label">Precio niño</label>
                <input type="number" class="base-input" id="precio-nino" name="precio-nino" placeholder="$">
            </div>

            <div class="precio-container">
                <label for="precio-infante" class="base-label">Precio infante</label>
                <input type="number" class="base-input" id="precio-infante" name="precio-infante" placeholder="$">
            </div>
        </div>

        <button class="base-button">Crear producto</button>

        <p class="form-message">{ form?.message ?? "" }</p>
    </form>
</div>

<style>
    .nuevo-producto {
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    h1 {
        margin-bottom: 30px;
    }

    /* Input container */
    .input-container {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-bottom: 5px;
    }

    /* Grid precios */
    .grid-precios {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
    }
    .precio-container {
        grid-column: span 1;
        display: flex;
        flex-direction: column;
    }
    button {
        padding: 15px;
        font-size: 16px;
        font-weight: 500;
    }
</style>