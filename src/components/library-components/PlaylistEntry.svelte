<script lang='ts'>
    export let playlistInfo

    const { name, songs } = playlistInfo

    const numberOfSongs = songs.length + ' songs'
</script>

<li class='container'>
    <div class='layout'>
        <h2 class='title'>{name}</h2>
        <p class='number-of-songs'>{numberOfSongs}</p>
    </div>
</li>

<style>
    .container {
        padding-right: var(--inner-component-side-space);
    }

    .layout {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        padding-bottom: 1em;
        border-bottom: solid .25em;
    }

    .layout > * {
        margin: 0;
    }

    .title {

    }

    .number-of-songs {

    }
</style>