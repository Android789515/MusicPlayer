<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import AudioPlayer from './AudioPlayer.svelte'
    import MediaControlButtons from './MediaControlButtons.svelte'
    import SongBar from './SongBar.svelte'

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
    aria-label='Media controls'
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

    <SongBar {duration} bind:time />
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
        bottom: 0;

        width: 100%;

        padding: 1em;
        background: #fff;

        transition: bottom 250ms;
    }
</style>