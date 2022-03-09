<script lang='ts'>
    import { queuedSong } from '../../stores/library'

    import AudioPlayer from './AudioPlayer.svelte'
    import MediaControlButtons from './MediaControlButtons.svelte'
    import SongBar from './SongBar.svelte'

    $: ({ src, duration } = $queuedSong)
    $: isSongQueued = src !== undefined
</script>

<div
    aria-label='Media controls'
    class='media-controls'
    class:show={isSongQueued}
>
    <AudioPlayer src={isSongQueued && src} />

    <MediaControlButtons />

    <SongBar {duration} />
</div>

<style>
    button {
        width: 100%;
    }

    .media-controls {
        --bar-bg: #333;
        --slider-bg: #ff00c3;

        position: fixed;
        left: 0;
        right: 0;
        bottom: -100%;

        width: 100%;

        padding: 1em;
        background: #fff;

        transition: bottom 250ms;
    }

    .media-controls.show {
        bottom: 0;
    }
</style>