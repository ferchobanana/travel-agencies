<script lang="ts">
    import '../../global.css'
    import LeftSideMenu from "./LeftSideMenu.svelte"
</script>

<div class="app">

    <LeftSideMenu></LeftSideMenu>

    <main>
        <slot></slot>
    </main>

</div>


<style>
    .app {
        width: 100%;
        display: flex;
        background-color: var(--background-light-color);
    }
    main {
        flex: 1;
        height: 100vh;
        padding: 35px 45px;
        overflow-y: scroll;
    }
</style>