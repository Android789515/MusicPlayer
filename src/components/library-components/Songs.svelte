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
        gridTemplate: 'auto auto / 1fr 1fr',
        gridAutoFlow: 'column',
        alignItems: 'baseline'
    }
</script>

<div aria-label='Songs' class='songs' role='list'>
    {#each $songs as song (song.id)}
        <div
            class='song'
            on:click={() => handleClick(() => library.queueSong(song.id))}
        >
            <SongInfo songInfo={song} timeToDisplay={song.duration} styles={songStyles}>
                <h5 class='song-title' slot='title'>{song.title}</h5>
            </SongInfo>
        </div>
    {/each}
    <SongInfo
        songInfo={{ artist: 'Some artist' }}
        timeToDisplay={0}
        styles={songStyles}
    >
        <h5 class='song-title' slot='title'>Some song title</h5>
    </SongInfo>
</div>

<style>
    .song-title {
        font-size: 1.5rem;

        margin: 0;
    }
</style>