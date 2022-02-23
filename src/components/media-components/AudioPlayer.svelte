<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import QueuedSong from '../wrappers/QueuedSong.svelte'
    import SongInfo from '../wrappers/SongInfo.svelte'

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
<QueuedSong styles={{
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: '.5em'
    }}>
    <img
        slot='cover-art'
        class='cover-art'
        src={coverArt || fallbackArt}
        alt='Cover art'
    >

    <SongInfo
        songInfo={{ artist }}
        slot='song-info'
        timeToDisplay={time}
        styles={{ display: 'grid' }}
    >
        <h4 class='song-title' slot='title'>{title}</h4>
    </SongInfo>
</QueuedSong>

<style>
    .cover-art {
        display: block;

        width: 4em;

        margin-right: 1em;
        border-radius: 25%;
    }

    .song-title {
        white-space: nowrap;

        margin: 0;
    }
</style>