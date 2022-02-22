<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import QueuedSong from './wrappers/QueuedSong.svelte'
    import SongInfo from '../library-components/SongInfo.svelte'

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
    {src}
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

        <div
            aria-label='Song information'
            class='song-info'
            slot='song-info'
        >
            <SongInfo songInfo={{ artist }} timeToDisplay={time} customStyle={true}>
                <h4 class='song-title' slot='title'>{title}</h4>
            </SongInfo>
        </div>
    </QueuedSong>
</div>

<style>
    .queued-song {
        display: flex;
        align-items: center;
    }

    .cover-art {
        display: none;

        width: 4em;

        margin: 1em 1em 1em 0;
        border-radius: 25%;
    }

    .cover-art.shown {
        display: block;
    }

    .song-info {
        display: grid;
    }

    .song-title {
        margin: 0;
    }
</style>