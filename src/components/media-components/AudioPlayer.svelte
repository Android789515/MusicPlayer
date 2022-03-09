<script lang='ts'>
    import { mediaControls } from '../../stores/mediaControls'
    import { library, songs } from '../../stores/library'
    import { toInteger } from '../../utils/math'

    import QueuedSong from '../wrappers/QueuedSong.svelte'

    export let src

    $: paused = mediaControls.isPaused()
    $: time = mediaControls.getCurrentTime()
    $: volume = mediaControls.getVolume()
    $: muted = volume === 0

    const playRandomSong = () => {
        const songIDs = $songs.map(song => song.id)
        const randomIndex = toInteger(Math.random() * songIDs.length)

        const nextSong = songIDs[randomIndex]

        if (nextSong) {
            library.queueSong(nextSong)
        }
    }

    const handleAudioEnd = () => {
        const shuffle = mediaControls.isShuffleToggled()
        if (shuffle) {
            playRandomSong()
        }
    }
</script>

<audio
    {src}
    autoplay

    {paused}
    currentTime={time}

    {volume}
    {muted}
    on:ended={handleAudioEnd}
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