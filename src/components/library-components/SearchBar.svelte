<script lang='ts'>
    import { library } from '../../stores/library'

    export let searchResults

    let searchText = ''
    $: searchResults = library.searchLibrary(searchText)
</script>

<div class='layout'>
    <input
        class='searchbar'
        type='text'
        placeholder='Type to search or create'
        aria-label='Search bar'
        role='searchbox'
        bind:value={searchText}
    />
</div>

<style>
    .layout, button {
        grid-column: 2 / -2;
    }

    .searchbar {
        display: block;

        width: 100%;
    }
</style>