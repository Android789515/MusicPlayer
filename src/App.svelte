<script lang='ts'>
    import { queuedSong } from './stores/library'

    import QueuedSong from './components/media-components/wrappers/QueuedSong.svelte'
    import Library from './components/library-components/Library.svelte'
    import ModalContainer from './components/modal-components/ModalContainer.svelte'
    import MediaControls from './components/media-components/MediaControls.svelte'

    const queueTestSong = () => {
        queuedSong.queueSong({
            id: '',
            src: 'test-audio/Beethoven.mp3',
            coverArt: '',
            title: 'Fur Elise',
            artist: 'Beethoven',
            duration: 175
        })
    }

    const unqueueSong = () => queuedSong.unqueueSong()
</script>

<main>
    <QueuedSong />

    <button class='temp' on:click={queueTestSong}>Queue test song</button>
    <button class='temp' on:click={unqueueSong}>Un-queue song</button>
    <MediaControls />

    <Library />

    <ModalContainer />
</main>

<style>
    .temp {
        height: max-content;
    }

    main {
        display: grid;
        grid-template-columns: minmax(1em, 1fr) 85% minmax(1em, 1fr);

        padding-top: 5em;
    }

    :global(main > *) {
        grid-column: 2 / -2;
    }

    :global(.clickable) {
        cursor: pointer;
    }

    :global(.hidden) {
        display: none;
    }
</style>