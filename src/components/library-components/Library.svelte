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
        grid-template-columns: 1em auto 1em;

        margin-top: 2em;
    }

    :global(.library > *) {
        grid-column: 2 / -2;
    }
</style>