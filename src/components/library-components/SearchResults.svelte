<script lang='ts'>
    import type { Song, Playlist } from '../../types/libraryTypes'

    import Songs from './Songs.svelte'
    import SongEntry from './SongEntry.svelte'
    import ResultsMessage from './ResultsMessage.svelte'

    export let searchResults

    const isPlaylist = (searchResult: Song | Playlist) => {
        return 'name' in searchResult
    }

    const isSong = (searchResult: Song | Playlist) => {
        return 'title' in searchResult
    }
</script>

{#if searchResults.length}
    <ul class='search-results unstyled-ul'>
        {#each searchResults as result (result.id)}
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

{:else}
    <Songs />
{/if}

<style>
    .search-results {
        grid-column: 2 / span 2;

        display: grid;
        grid-row-gap: 1.25em;

        overflow: auto;

        max-height: 48em;

        padding: 1em 0;
    }

    :global(.search-results > *) {
        padding-right: var(--inner-component-side-space);
    }
</style>