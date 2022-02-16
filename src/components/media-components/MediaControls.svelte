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
    />

    <SongBar bind:time {duration} />
</div>

<style>
    button {
        width: 100%;
    }

    .media-controls {
        --volume-bar-height: 2em;

        align-self: end;

        display: grid;
        grid-template-rows: auto var(--volume-bar-height) auto;
        grid-template-columns: 1fr;

        position: fixed;
        left: 0;
        right: 0;
        bottom: -100%;

        width: max-content;

        margin: 0 auto 2em auto;

        transition: bottom 250ms;
    }

    .media-controls.show {
        bottom: 0;
    }
</style>