<script lang='ts'>
    export let playlistInfo

    const { name, songs } = playlistInfo

    const numberOfSongs = songs.length + ' songs'
</script>

<li class='layout'>
    <h2 class='title'>{name}</h2>
    <p class='number-of-songs'>{numberOfSongs}</p>
</li>

<style>
    .layout {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        padding-right: var(--inner-component-side-space);
    }

    .layout > * {
        margin: 0;
    }

    .title {

    }

    .number-of-songs {

    }
</style>