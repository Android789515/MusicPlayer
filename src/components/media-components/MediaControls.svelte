<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'
    import { mediaControlOptions } from '../../stores/mediaControl'

    import MediaControlButton from './MediaControlButton.svelte'

    let paused
    const unsubscribe = mediaControlOptions.subscribe(controlOptions => {
        paused = controlOptions.paused
    })

    const pause = () => mediaControlOptions.pause()
    const play = () => mediaControlOptions.play()

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

<div>
    {#if paused}
        <MediaControlButton buttonName='play' buttonAction={play} />
    {:else}
        <MediaControlButton buttonName='pause' buttonAction={pause} />
    {/if}
</div>
<button on:click={queueTestSong}>Queue test song</button>