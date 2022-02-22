<script lang='ts'>
    import { library, songs } from '../../stores/library'
    import { useDirectoryNavigator } from '../../stores/directoryNavigator'

    import SongInfo from './SongInfo.svelte'

    const navigator = useDirectoryNavigator()


    const handleClick = (callback) => {
        callback()
        navigator.navigate('currentlyPlaying')
    }
</script>

<div aria-label='Songs' role='list'>
    {#each $songs as song (song.id)}
        <div
            class='song-info'
            on:click={() => handleClick(() => library.queueSong(song.id))}
        >
            <SongInfo songInfo={song} timeToDisplay={song.duration} customStyle={true}>
                <h5 class='song-title' slot='title'>{song.title}</h5>
            </SongInfo>
        </div>
    {/each}
</div>

<style>
    .song-info {

    }

    .song-title {
        margin: 0;
    }
</style>