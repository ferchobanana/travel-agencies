<script lang="ts">
    import Icon from "@iconify/svelte"
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
        <div class="reserva card">
            <p class="id-reserva">123456</p>
            <p class="nombre-persona">Fernando Jiménez</p>
            <p class="total">$2300 MXN</p>

            <div class="botones">
            <button class="base-button">Editar reserva</button>
        </div>
        </div>

    </div>
</div>

<style>

    h1 {
        margin-bottom: 30px;
    }
    
    .reserva {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 25px;
    }
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
</style>