<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores"
    import { afterUpdate } from "svelte";

    function changeSelectedOption(node: HTMLAnchorElement) {
        if(node.href.includes($page.url.pathname) && $page.url.pathname !== "/") {
            node.classList.add('selected-option')
        } else {
            node.classList.remove('selected-option')
        }
    }

    afterUpdate(() => {
        let navOptions = document.querySelectorAll('.option')
        navOptions.forEach((node) => changeSelectedOption(node))
    })

</script>

<div class="left-menu">

    <div class="logo-container">
        <!-- <img src={Logo} alt=""> -->
    </div>

    <div class="options-container">
        <a href="/inicio" class="option">
            <p>Inicio</p>
        </a>

        <a href="/reservas" class="option">
            <p>Reservas</p>
        </a>

        <a href="/revendedores" class="option">
            <p>Revendedores</p>
        </a>

        <a href="/productos-internos" class="option">
            <p>Productos internos</p>
        </a>

        <a href="/productos-revendedores" class="option">
            <p>Productos revendedores</p>
        </a>

    </div>

    <form class="cerrar-sesion" method="POST" action="/" use:enhance>
        <button>Cerrar sesión</button>
    </form>

</div>

<style>
    .left-menu {
        position: relative;
        width: 320px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--background-dark-color);
        padding: 60px 20px 30px 20px;
        overflow-y: auto;
    }
    /* Anchura de la barra de desplazamiento */
    .left-menu::-webkit-scrollbar {
        width: 6px;
    }

    /* Estilo de la barra de desplazamiento */
    .left-menu::-webkit-scrollbar-track {
        background-color: var(--background-dark-color);
    }

    /* Estilo del pulgar de la barra de desplazamiento */
    ::-webkit-scrollbar-thumb {
        background-color: #353c49;
        border-radius: 20px;
    }

    /* Logo */
    .logo-container {
        width: 100%;
        padding: 0 20px;
        margin-bottom: 20px;
    }
    .logo-container img {
        width: 100%;
    }

    /* Opciones */
    .options-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }   
    .home-button, .option {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        color: var(--font-light-color);
        text-decoration: none;
        padding: 10px 10px;
        gap: 10px;
    }
    :global(.selected-option) {
        outline: 1px solid var(--font-light-color);
        border-radius: 6px;
    }

    /* Cerrar sesion */
    .cerrar-sesion {
        margin-top: 40px;
        width: 100%;
        display: grid;
        place-items: center;
    }
    .cerrar-sesion button {
        background: var(--primary-color);
        color: #fff;
        padding: 10px 30px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>