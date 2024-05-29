<div>
    <h1 class="base-page-title">Crea una nueva reserva</h1>

    <form class="nueva-reserva card">
        <div class="full-input-container">
            <label for="nombre-persona" class="base-label">Nombre de la persona</label>
            <input type="text" class="base-input" placeholder="Nombre persona">
        </div>

        <div class="full-input-container">
            <label for="email" class="base-label">Email</label>
            <input type="text" class="base-input" placeholder="Email">
        </div>

        <div class="full-input-container">
            <label for="celular" class="base-label">Celular</label>
            <input type="text" class="base-input" placeholder="Número de celular">
        </div>

        <div class="personas-grid">
            <div class="personas">
                <label for="Adultos" class="base-label">Adultos</label>
                <input type="text" class="base-input" placeholder="Adultos">
            </div>

            <div class="personas">
                <label for="Adultos" class="base-label">Niños</label>
                <input type="text" class="base-input" placeholder="Niños">
            </div>

            <div class="personas">
                <label for="Adultos" class="base-label">Infantes</label>
                <input type="text" class="base-input" placeholder="Infantes">
            </div>
        </div>

        <button class="boton-crear base-button">Crear reserva</button>
    </form>
</div>

<style>
    h1 {
        margin-bottom: 30px;
    }
    .nueva-reserva {
        display: flex;
        flex-direction: column;
        gap: 12px 10px;
        width: 100%;
        max-width: 600px;
        padding: 20px 30px;
    }
    .full-input-container {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-bottom: 3px;
    }

    /* Personas */
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

    .boton-crear {
        font-weight: 500;
        font-size: 15px;
        padding: 15px;
    }
</style>