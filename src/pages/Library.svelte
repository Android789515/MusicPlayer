<script lang='ts'>
    import SearchBar from '../components/library-components/SearchBar.svelte'
    import SongUploader from '../components/library-components/SongUploader.svelte'
    import SearchResults from '../components/library-components/SearchResults.svelte'
</script>

<section aria-label='Library' class='library'>
    <SearchBar />
    <SongUploader />
    <SearchResults />
</section>

<style>
    .library {
        display: grid;
        grid-template-columns: 1em auto 1em;
        grid-row-gap: 1em;

        margin: 2em 0;
    }
</style>