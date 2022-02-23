<script lang='ts'>
    import { onDestroy, onMount } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import SongInfo from './SongInfo.svelte'

    export let styles = undefined

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

    let container
    const applyStyles = () => {
        Object.entries(styles).forEach(([style, value]) => {
            container.style[style] = value
        })
    }

    onMount(() => {
        if (styles) {
            applyStyles()
        }
    })
    onDestroy(unsubscribe)
</script>

<section
    aria-label='Queued song'
    class:default={!styles}
    bind:this={container}
>
    <slot name='cover-art'>
        <img src={coverArt || fallbackArt} alt='Song cover art'>
    </slot>

    {#if isSongQueued}
        <slot name='song-info'>
            <SongInfo songInfo={{ title, artist }} timeToDisplay={duration} />
        </slot>
    {/if}
</section>

<style>
    img {
        width: 10.5em;

        margin: 2em auto;
        border-radius: 25%;
    }

    .default {
        display: flex;
        flex-direction: column;

        margin-top: 5em;
    }
</style>