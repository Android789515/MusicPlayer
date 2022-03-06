<script lang='ts'>
    import type { Song, Playlist } from '../../types/libraryTypes'
    import { songs, queuedSong } from '../../stores/library'

    import SongEntry from './SongEntry.svelte'
    import ResultsMessage from './ResultsMessage.svelte'
    import CreatePlaylistButton from './CreatePlaylistButton.svelte'

    export let query
    export let searchResults

    $: areThereSearchResults = $searchResults.length
    $: isSongQueued = $queuedSong.src !== undefined

    const isPlaylist = (searchResult: Song | Playlist) => {
        return 'name' in searchResult
    }

    const isSong = (searchResult: Song | Playlist) => {
        return 'title' in searchResult
    }
</script>

<ul class='search-results unstyled-ul' class:whenSongQueued={isSongQueued}>
    {#if query}
        <CreatePlaylistButton />
    {/if}

    {#each areThereSearchResults ? $searchResults : $songs as result (result.id)}
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
        grid-column: 2 / span 2;

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