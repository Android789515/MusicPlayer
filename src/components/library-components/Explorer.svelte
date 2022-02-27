<script lang='ts'>
    import { search } from '../../stores/search'

    import SearchBar from './SearchBar.svelte'
    import SearchResults from './SearchResults.svelte'

    let query = ''
    $: searchResults = search(query)
</script>

<div class='explorer'>
    <SearchBar bind:query/>
    <SearchResults {searchResults} />
</div>

<style>
    .explorer {
        grid-column: 2 / span 2;
    }

    :global(.explorer > *) {
        padding-right: var(--inner-component-side-space);
    }
</style>