<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import AudioPlayer from './AudioPlayer.svelte'
    import MediaControlButtons from './MediaControlButtons.svelte'
    import SongBar from './SongBar.svelte'
    import VolumeBar from './VolumeBar.svelte'

    let paused = true
    let time = 0

    let volume = .5
    $: muted = volume === 0

    let shuffle = false

    let src
    let duration
    const unsubscribe = queuedSong.subscribe(queuedSong => {
        src = queuedSong.src
        duration = queuedSong.duration
    })
    $: isSongQueued = src !== undefined

    let isVolumeBarShown = false

    onDestroy(unsubscribe)
</script>

<div
    class='media-controls'
    class:show={isSongQueued}
>
    <AudioPlayer
        src={isSongQueued && src}
        bind:paused
        bind:time

        bind:volume
        bind:muted
    />

    <MediaControlButtons
        bind:paused
        bind:time

        bind:volume
        bind:muted

        bind:shuffle

        bind:isVolumeBarShown
    />

    <VolumeBar bind:isVolumeBarShown bind:volume />

    <SongBar {duration} bind:time />
</div>

<style>
    button {
        width: 100%;
    }

    .media-controls {
        --bar-bg: #333;
        --slider-bg: #ff00c3;
        --media-button-width: 3.75em;
        --volume-bar-height: 2em;

        align-self: end;

        display: grid;
        grid-template-rows: auto auto;
                                   /* Space for the volume bar */
        grid-template-columns: max-content var(--media-button-width);
        grid-auto-flow: column;

        position: fixed;
        left: 0;
        right: 0;
        bottom: -100%;

        width: 100%;

        padding: 0 1em;
        margin: 0 auto 2em auto;

        transition: bottom 250ms;
    }

    .media-controls.show {
        bottom: 0;
    }
</style>