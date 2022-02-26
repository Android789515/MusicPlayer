<script lang='ts'>
    import CreatePlaylist from '../components/library-components/CreatePlaylist.svelte'
    import Playlists from '../components/library-components/Playlists.svelte'
    import SongUploader from '../components/library-components/SongUploader.svelte'
    import Songs from '../components/library-components/Songs.svelte'
</script>

<section aria-label='Library' class='library'>
    <CreatePlaylist />
    <SongUploader />
    <Songs />
</section>

<style>
    .library {
        display: grid;
        grid-template-columns: 1em auto 1em;
        grid-row-gap: 1em;

        margin: 2em 0;
    }
</style>