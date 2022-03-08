<script lang='ts'>
    import { Link } from 'svelte-navigator'

    import { library } from '../../stores/library'
    import { useEnterKeyAsClick } from '../../utils/useEnterKeyAsClick'

    export let playlistInfo

    const { id, name, songs } = playlistInfo

    const numberOfSongs = songs.length + ' songs'

    const handleClick = () => {
        library.openPlaylist(id)
    }

    const handleKeydown = useEnterKeyAsClick(handleClick)
</script>

<li
    class='playlist clickable'
>
    <Link
        to={`/${id}`}
        class='link'
        tabindex='4'
        on:click={handleClick}
        on:keydown={handleKeydown}
    >
        <div class='layout'>
            <h2 class='title'>{name}</h2>
            <p class='number-of-songs'>{numberOfSongs}</p>
        </div>
    </Link>
</li>

<style>
    .playlist {
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