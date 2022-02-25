<script lang='ts'>
    import { onDestroy, onMount } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import SongInfo from './SongInfo.svelte'

    export let styles
    export let timeToDisplay = undefined

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

    let container
    let img
    const applyContainerStyles = () => {
        Object.entries(styles.container).forEach(([style, value]) => {
            container.style[style] = value
        })
    }

    const applyCoverArtStyles = () => {
        Object.entries(styles.coverArt).forEach(([style, value]) => {
            img.style[style] = value
        })
    }

    onMount(() => {
        if (styles) {
            applyContainerStyles()
            applyCoverArtStyles()
        }
    })
    onDestroy(unsubscribe)
</script>

<section
    aria-label='Queued song'
    bind:this={container}
>
    <img class='cover-art' src={coverArt || fallbackArt} alt='Song cover art' bind:this={img}>

    <SongInfo
        styles={styles.songInfo}
        songInfo={{ title: title, artist: artist }}
        timeToDisplay={timeToDisplay === undefined ? duration : timeToDisplay}
    />
</section>

<style>
    .cover-art {
        border-radius: 25%;
    }

    .song-info > * {
        margin: 0;
    }
</style>