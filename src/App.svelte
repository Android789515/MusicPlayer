<script lang='ts'>
    import ModalContainer from './components/modal-components/ModalContainer.svelte'
    import MediaControls from './components/media-components/MediaControls.svelte'
    import DirectoryNavigator from './components/navigation-components/DirectoryNavigator.svelte'
</script>

<main aria-label='Application' role='main'>
    <DirectoryNavigator />

    <MediaControls />

    <ModalContainer />
</main>

<style>
    main {
        display: grid;
        grid-template-rows: auto 1fr;

        min-height: 100vh;
    }
</style>