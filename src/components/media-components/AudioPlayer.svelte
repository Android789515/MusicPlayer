<script lang='ts'>
    import { onDestroy } from 'svelte'

    import formatTime from '../../utils/formatTime'
    import { queuedSong } from '../../stores/library'

    import QueuedSong from './wrappers/QueuedSong.svelte'

    export let paused
    export let time

    export let volume
    export let muted

    export let src
    let title
    let artist
    let coverArt
    const fallbackArt = 'assets/img/cover-art-fallback.svg'

    const unsubscribe = queuedSong.subscribe(queuedSong => {
        title = queuedSong.title
        artist = queuedSong.artist
        coverArt = queuedSong.coverArt
    })

    onDestroy(unsubscribe)
</script>

<div class='queued-song'>
    <QueuedSong customLayout={true}>
        <img slot='cover-art' class='cover-art' src={coverArt || fallbackArt} alt='Cover art' >

        <div slot='song-info' class='song-info'>
            <h4>{title}</h4>
            <p>{artist}</p>
            <p>{formatTime(time)}</p>
        </div>
    </QueuedSong>
</div>

<style>
    .queued-song {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .cover-art {
        width: 4em;

        margin: 2em 1em 2em 0;
        border-radius: 25%;
    }

    .song-info {
        display: grid;
    }

    .song-info > * {
        margin: 0;
    }
</style>

<audio
    {src}
    autoplay

    bind:paused
    bind:currentTime={time}

    bind:volume
    bind:muted
></audio>