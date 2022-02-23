<script lang='ts'>
    import SongUploader from './SongUploader.svelte'
    import Songs from './Songs.svelte'
</script>

<section aria-label='Library' class='library'>
    <SongUploader />
    <Songs />
</section>

<style>
    .library {
        display: grid;
        grid-template-columns: minmax(1em, 2em) auto minmax(1em, 2em);

        margin-top: 2em;
    }

    :global(.library > *) {
        grid-column: 2 / -2;
    }
</style>