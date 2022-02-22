<script lang='ts'>
    import { songs } from '../../stores/library'
    import { queuedSong } from '../../stores/library'
    import { useDirectoryNavigator } from '../../stores/directoryNavigator'
    import type { Song } from '../../types/song'

    import SongInfo from './SongInfo.svelte'

    const navigator = useDirectoryNavigator()

    const queueSong = (song: Song) => queuedSong.set(song)

    const handleClick = (callback) => {
        callback()
        navigator.navigate('currentlyPlaying')
    }
</script>

<div>
    {#each $songs as song (song.id)}
        <div
            class='song-info'
            on:click={() => handleClick(() => queueSong(song))}
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