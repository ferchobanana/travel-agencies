<script lang="ts">

    import { enhance } from "$app/forms"
    import LoadingPage from "$lib/components/LoadingPage.svelte"

    export let form
    
    let inputPassType = "password"

    function showPass(node: HTMLInputElement) {
        node.addEventListener('change', () => {
            if (node.checked) {
                inputPassType = "text"
            } else {
                inputPassType = "password"
            }
        })
    }

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

    <h1 class="base-page-title">Agrega un nuevo vendedor</h1>

    <form class="nuevo-vendedor card" method="POST" use:enhance on:submit={handleSubmit}>
        <div class="input-container">
            <label for="nombre" class="base-label">Nombre vendedor</label>
            <input type="text" class="base-input" id="nombre" name="nombre" placeholder="Nombre del vendedor">
        </div>

        <div class="input-container">
            <label for="usuario" class="base-label">Usuario</label>
            <input type="text" class="base-input" id="usuario" name="usuario" placeholder="Usuario">
        </div>

        <div class="input-container">
            <label for="email" class="base-label">Email</label>
            <input type="text" class="base-input" id="email" name="email" placeholder="Email">
        </div>

        <div class="input-container">
            <label for="password" class="base-label">Contraseña</label>
            <input type={inputPassType} name="password" id="password" class="base-input" placeholder="Contraseña">
            <div class="see-pass">
                <input type="checkbox" id="see-pass" use:showPass>
                <label for="see-pass">Mostrar contraseña</label>
            </div>
        </div>

        <button class="base-button">Agregar vendedor</button>

        <p class="form-message">{ form?.message ?? "" }</p>
    </form>
</div>

<style>
    .nuevo-vendedor {
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .see-pass {
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
</style>