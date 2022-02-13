<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import MediaControlButton from './MediaControlButton.svelte'
    import AudioPlayer from './AudioPlayer.svelte'

    let paused = true
    const pause = () => paused = true
    const play = () => paused = false

    let time = 0
    const rewind = () => time -= 5
    const fastForward = () => time += 5

    let volume = .5
    let muted = false
    let loop = false
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

<AudioPlayer
    {src}
    bind:paused
    bind:time
    bind:muted
/>

<div class='media-control-buttons'>
    <MediaControlButton buttonName='rewind' buttonAction={rewind} />
    <MediaControlButton hidden={!paused} buttonName='play' buttonAction={play} />
    <MediaControlButton hidden={paused} buttonName='pause' buttonAction={pause} />
    <MediaControlButton buttonName='fast-forward' buttonAction={fastForward} />
</div>
<button on:click={queueTestSong}>Queue test song</button>

<style>
    .media-control-buttons {
        display: flex;

        margin: auto;
    }
</style>