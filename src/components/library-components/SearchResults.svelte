<script lang='ts'>
    import type { Song, Playlist } from '../../types/libraryTypes'
    import { songs, queuedSong } from '../../stores/library'

    import SongEntry from './SongEntry.svelte'
    import ResultsMessage from './ResultsMessage.svelte'

    $: areThereSearchResults = false
    $: isSongQueued = $queuedSong.src !== undefined

    const isPlaylist = (searchResult: Song | Playlist) => {
        return 'name' in searchResult
    }

    const isSong = (searchResult: Song | Playlist) => {
        return 'title' in searchResult
    }
</script>

<ul class='search-results unstyled-ul' class:whenSongQueued={isSongQueued}>
    {#each areThereSearchResults ? false : $songs as result (result.id)}
        {#if isPlaylist(result)}
            <li></li>

        {:else if isSong(result)}
            <SongEntry songInfo={{
                id: result.id,
                title: result.title,
                artist: result.artist,
                duration: result.duration
                }} />

        {:else}
            <ResultsMessage
                message={result.message}
            />
        {/if}
    {/each}
</ul>

<style>
    .search-results {
        display: grid;
        grid-row-gap: 1.25em;

        overflow: auto;

        max-height: 39em;

        padding: 1em 0;
    }

    .search-results.whenSongQueued {
        max-height: 30em;
    }
</style>