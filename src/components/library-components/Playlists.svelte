<script lang='ts'>
    import { playlists } from '../../stores/library'
</script>

<ul aria-label='Playlists' role='list'>
    {#each $playlists as { id, name, songs } (id)}
        {@const numberOfSongs = songs.length}
        <li class='playlist' aria-label='Playlist' role='listitem'>
            <p>{name}</p>
            <p>{numberOfSongs}</p>
        </li>
    {/each}
</ul>

<style>

</style>