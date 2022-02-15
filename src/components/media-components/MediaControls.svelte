<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import AudioPlayer from './AudioPlayer.svelte'
    import MediaControlButtons from './MediaControlButtons.svelte'

    let paused = true
    let time = 0

    let volume = .5
    let muted = false

    let shuffle = false

    let src
    const unsubscribe = queuedSong.subscribe(queuedSong => {
        src = queuedSong.src
    })
    $: isSongQueued = src !== undefined

    onDestroy(unsubscribe)
</script>

<div class='media-controls' class:show={isSongQueued}>
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
</div>

<style>
    button {
        width: 100%;
    }

    .media-controls {
        align-self: end;

        display: flex;
        flex-direction: column;

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