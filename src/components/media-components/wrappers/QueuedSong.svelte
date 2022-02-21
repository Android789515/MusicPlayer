<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../../stores/library'

    import SongInfo from '../../library-components/SongInfo.svelte'

    export let customLayout = undefined

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
    aria-label='Queued song'
    class='queued-song'
    class:customLayout={customLayout !== undefined}
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