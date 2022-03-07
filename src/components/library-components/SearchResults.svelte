<script lang='ts'>
    import type { Song, Playlist } from '../../types/libraryTypes'
    import { songs, queuedSong, playlists } from '../../stores/library'

    import CreatePlaylistButton from './CreatePlaylistButton.svelte'
    import PlaylistEntry from './PlaylistEntry.svelte'
    import SongEntry from './SongEntry.svelte'
    import ResultsMessage from './ResultsMessage.svelte'

    export let query
    export let searchResults

    $: defaultResults = [...$songs, ...$playlists]
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
        <CreatePlaylistButton {query} />
    {/if}

    {#each areThereSearchResults ? $searchResults : defaultResults as result (result.id)}
        {#if isPlaylist(result)}
            <PlaylistEntry playlistInfo={{...result}} />

        {:else if isSong(result)}
            <SongEntry songInfo={{...result}} />

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