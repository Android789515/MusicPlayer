<script lang='ts'>
    import { library, songs } from '../../stores/library'
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
</script>

<ul aria-label='Songs' class='songs unstyled-ul' role='list'>
    {#each $songs as song (song.id)}
        <li
            class='song clickable'
            on:click={() => handleClick(() => library.queueSong(song.id))}
        >
            <SongInfo songInfo={song} timeToDisplay={song.duration} styles={songStyles}>
                <h5 class='song-title' slot='title'>{song.title}</h5>
            </SongInfo>
        </li>
    {/each}
</ul>

<style>
    .songs {
        display: grid;
        grid-row-gap: 1.25em;
    }

    .song-title {
        font-size: 1.5rem;

        margin: 0;
    }
</style>