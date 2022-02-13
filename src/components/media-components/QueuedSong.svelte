<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import SongInfo from './SongInfo.svelte'

    let src
    let coverArt
    let fallbackCoverArt = 'assets/img/cover-art-fallback.svg'
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

<section>
    <img src={coverArt || fallbackCoverArt} alt='Song cover art'>
    {#if isSongQueued}
        <SongInfo {title} {artist} {duration} />
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
    }

    img {
        width: 168px;

        margin: auto;
        border-radius: 25%;
    }
</style>