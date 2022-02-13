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

    onDestroy(unsubscribe)
</script>

<div class='media-controls'>
    <AudioPlayer
            {src}
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
    <button on:click={queueTestSong}>Queue test song</button>
</div>

<style>
    button {
        width: 100%;
    }

    .media-controls {
        align-self: end;
    }
</style>