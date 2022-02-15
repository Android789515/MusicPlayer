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
    $: isSongQueued = src !== undefined
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

<audio
    src={src}
    autoplay

    bind:paused
    bind:currentTime={time}

    bind:volume
    bind:muted
></audio>

<!-- I wrap this in a div and tell the inner Component that -->
<!-- it will have a custom layout so it will inherit styles. -->
<div class='queued-song'>
    <QueuedSong customLayout={true}>
        <img
            slot='cover-art'
            class='cover-art'
            class:shown={isSongQueued}
            src={coverArt || fallbackArt}
            alt='Cover art'
        >

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
        display: none;

        width: 4em;

        margin: 2em 1em 2em 0;
        border-radius: 25%;
    }

    .cover-art.shown {
        display: block;
    }

    .song-info {
        display: grid;
    }

    .song-info > * {
        margin: 0;
    }
</style>