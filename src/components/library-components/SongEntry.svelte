<script lang='ts'>
    import { library, queuedSong } from '../../stores/library'
    import { useDirectoryNavigator } from '../../stores/directoryNavigator'

    import SongInfo from '../wrappers/SongInfo.svelte'

    export let songInfo

    const navigator = useDirectoryNavigator()

    const handleClick = () => {
        library.queueSong(songInfo.id)
        navigator.navigate('currentlyPlaying')
    }

    const songStyles = {
        textAlign: 'left',

        display: 'grid',
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: 'auto max-content',
        gridRowGap: '.5em',
        gridColumnGap: '1em',
        gridAutoFlow: 'column',
        alignItems: 'baseline',

        paddingBottom: '1em',
        borderBottom: 'solid .25em'
    }

    $: isSongQueued = $queuedSong.src !== undefined
</script>

<li
    class='song clickable'
    on:click={() => handleClick()}
>
    <SongInfo
        styles={songStyles}
        {songInfo}
        timeToDisplay={songInfo.duration}
    />
</li>

<style>
    .song {
        padding-right: 1em;
    }
</style>