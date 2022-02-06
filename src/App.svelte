<script lang='ts'>
    import MusicPlayer from './components/media-components/MusicPlayer.svelte'
    import Library from './components/library-components/Library.svelte'
    import ModalContainer from './components/modal-components/ModalContainer.svelte'
    import MediaControls from './components/media-components/MediaControls.svelte'
</script>

<main>
    <MusicPlayer />

    <MediaControls />

    <Library />

    <ModalContainer />
</main>

<style>
    :global(.clickable) {
        cursor: pointer;
    }

    main {
        display: grid;
        grid-template-columns: minmax(1em, 1fr) 85% minmax(1em, 1fr);
        grid-row-gap: 1em;

        padding-top: 5em;
    }

    :global(main > *) {
        grid-column: 2 / -2;
    }
</style>