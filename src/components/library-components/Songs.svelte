<script lang='ts'>
    import { library, songs, queuedSong } from '../../stores/library'
    import { useDirectoryNavigator } from '../../stores/directoryNavigator'

    import SongInfo from '../wrappers/SongInfo.svelte'

    const navigator = useDirectoryNavigator()

    const handleClick = (callback) => {
        callback()
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

<ul
    aria-label='Songs'
    class='songs unstyled-ul'
    class:whenSongQueued={isSongQueued}
    role='list'
>
    {#each $songs as song (song.id)}
        <li
            class='song clickable'
            on:click={() => handleClick(() => library.queueSong(song.id))}
        >
            <SongInfo
                styles={songStyles}
                songInfo={song}
                timeToDisplay={song.duration}
            />
        </li>
    {/each}
</ul>

<style>
    .songs {
        grid-column: 2 / span 2;

        display: grid;
        grid-row-gap: 1.25em;

        overflow: auto;

        max-height: 48em;

        padding: 1em 0;
    }

    .songs.whenSongQueued {
    }

    .song {
        padding-right: var(--inner-component-side-space);
    }
</style>