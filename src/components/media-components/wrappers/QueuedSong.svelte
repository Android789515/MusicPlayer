<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../../stores/library'

    import SongInfo from '../SongInfo.svelte'

    export let customLayout

    let src
    let coverArt
    const fallbackArt = 'assets/img/cover-art-fallback.svg'
    let title
    let artist
    let duration

    const unsubscribe = queuedSong.subscribe(queuedSong => {
        src = queuedSong.src
        coverArt = queuedSong.coverArt
        title = queuedSong.title
        artist = queuedSong.artist
        duration = queuedSong.duration
    })
    $: isSongQueued = src !== undefined

    onDestroy(unsubscribe)
</script>

<section
    class:customLayout={customLayout !== undefined}
    class='queued-song'
>
    <slot name='cover-art'>
        <img
            src={coverArt || fallbackArt}
            alt='Song cover art'
        >
    </slot>
    {#if isSongQueued}
        <slot name='song-info'>
            <SongInfo
                {title}
                {artist}
                {duration}
            />
        </slot>
    {/if}
</section>

<style>
    .queued-song {
        display: flex;
        flex-direction: column;
    }

    .customLayout {
        all: inherit;
    }

    img {
        width: 10.5em;

        margin: 2em auto;
        border-radius: 25%;
    }
</style>