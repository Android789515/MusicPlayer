<script lang='ts'>
    import { Link } from 'svelte-navigator'

    import { library, queuedSong } from '../../stores/library'
    import { useEnterKeyAsClick } from '../../utils/useEnterKeyAsClick'
    import { Routes } from '../../types/routes'

    import SongInfo from '../wrappers/SongInfo.svelte'

    export let songInfo

    const handleClick = () => {
        console.log('ran')
        library.queueSong(songInfo.id)
    }

    const handleKeydown = useEnterKeyAsClick(handleClick)

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

<li class='song clickable'>
    <Link
        to={Routes.currentlyPlaying}
        class='link'
        tabindex='4'
        on:click={() => handleClick()}
        on:keydown={handleKeydown}
    >
        <SongInfo
            styles={songStyles}
            {songInfo}
            timeToDisplay={songInfo.duration}
        />
    </Link>
</li>

<style>
    .song {
        padding-right: 1em;
    }
</style>