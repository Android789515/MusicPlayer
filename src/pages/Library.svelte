<script lang='ts'>
    import SongUploader from '../components/library-components/SongUploader.svelte'
    import Explorer from '../components/library-components/Explorer.svelte'
</script>

<section aria-label='Library' class='library'>
    <SongUploader />
    <Explorer />
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