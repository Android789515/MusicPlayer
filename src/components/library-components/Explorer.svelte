<script lang='ts'>
    import { librarySearchResults } from '../../stores/librarySearchResults'

    import SearchBar from './SearchBar.svelte'
    import SearchResults from './SearchResults.svelte'

    $: search = librarySearchResults('Rondo Alla Turca')
    $: $search
</script>

<div class='explorer'>
    <SearchBar />
    <SearchResults />
</div>

<style>
    .explorer {
        grid-column: 2 / span 2;
    }

    :global(.explorer > *) {
        padding-right: var(--inner-component-side-space);
    }
</style>