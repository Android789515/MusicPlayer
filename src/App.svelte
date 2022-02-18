<script lang='ts'>
    import ModalContainer from './components/modal-components/ModalContainer.svelte'
    import MediaControls from './components/media-components/MediaControls.svelte'
    import Directory from './components/navigation-components/DirectoryNavigator.svelte'
</script>

<main>
    <Directory />

    <MediaControls />

    <ModalContainer />
</main>

<style>
    main {
        display: grid;
        grid-template-columns: minmax(1em, 1fr) 85% minmax(1em, 1fr);
    }

    :global(main > *) {
        grid-column: 2 / -2;
    }
</style>