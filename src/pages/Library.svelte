<script lang='ts'>
    import SearchBar from '../components/library-components/SearchBar.svelte'
    import SongUploader from '../components/library-components/SongUploader.svelte'
    import SearchResults from '../components/library-components/SearchResults.svelte'

    let searchResults = []
</script>

<section aria-label='Library' class='library'>
    <SearchBar bind:searchResults />
    <SongUploader />
    <SearchResults bind:searchResults />
</section>

<style>
    .library {
        --inner-component-side-space: 1em;
        display: grid;
        grid-template-columns: 1em auto 1em;
        grid-row-gap: 1em;

        margin: 2em 0;
    }
</style>