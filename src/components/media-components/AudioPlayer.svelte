<script lang='ts'>
    import { library, songs } from '../../stores/library'
    import { toInteger } from '../../utils/math'

    import QueuedSong from '../wrappers/QueuedSong.svelte'

    export let paused
    export let time

    export let volume
    export let muted

    export let shuffle

    export let src

    const playRandomSong = () => {
        const songIDs = $songs.map(song => song.id)
        const randomIndex = Math.random() * songIDs.length
        const nextSong = songIDs[toInteger(randomIndex)]

        if (nextSong) {
            library.queueSong(nextSong)
        }
    }
</script>

<audio
    {src}
    autoplay

    bind:paused
    bind:currentTime={time}

    bind:volume
    bind:muted
    on:ended={() => {
        if (shuffle) {
            playRandomSong()
        }
    }}
></audio>

<!-- I wrap this in a div and tell the inner Component that -->
<!-- it will have a custom layout so it will inherit styles. -->
<QueuedSong timeToDisplay={time} styles={{
        container: {
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            marginBottom: '.5em'
        },
        coverArt: {
            display: 'block',

            width: '4em',

            marginRight: '1em',
            borderRadius: '25%'
        },
        songInfo: {
            display: 'grid',

            whiteSpace: 'nowrap'
        }
    }}
/>