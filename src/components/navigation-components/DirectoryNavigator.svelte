<script lang='ts'>
    import { onDestroy, onMount } from 'svelte'

    import { queuedSong } from '../../stores/library'
    import { currentDirectory, useDirectoryNavigator } from '../../stores/directoryNavigator'
    import { capitalize } from '../../utils/stringUtils'

    import DirectoryLink from '../../components/navigation-components/DirectoryLink.svelte'
    import DirectoryName from '../../components/navigation-components/DirectoryName.svelte'

    let src
    const unsubscribe = queuedSong.subscribe(queuedSong => {
        src = queuedSong.src
    })
    $: isSongQueued = src !== undefined

    const initializeDirectory = () => $currentDirectory = 'library'

    let showPlaylists = false

    const navigator = useDirectoryNavigator()

    onMount(initializeDirectory)
    onDestroy(unsubscribe)
</script>

<nav class='navigation' role='navigation'>
    <ul
        aria-label='Navigation Links'
        class='links unstyled-ul'
    >
        <DirectoryLink linkTo='library'>
            <DirectoryName name='Library' />
        </DirectoryLink>

        {#if showPlaylists}
            <DirectoryLink linkTo='playlists'>
                <DirectoryName name='Playlistsaaaaaaaaaaaaaaaaaaaaa' />
            </DirectoryLink>
        {/if}

        {#if isSongQueued}
            <DirectoryLink linkTo='currentlyPlaying'>
                <DirectoryName name='Currently Playing' />
            </DirectoryLink>
        {/if}
    </ul>

    <div class='white-space'></div>
</nav>

<div class='component' aria-label={$currentDirectory && capitalize($currentDirectory)}>
    <svelte:component this={navigator.getComponentToRender()} />
</div>

<style>
    .navigation {
        position: sticky;
        top: 0;

        overflow-x: auto;

        width: 100%;

        --shaded-nav-bg: calc(var(--app-bg-lightness) - 10%);
        background: hsl(0, 0%, var(--shaded-nav-bg));

        box-shadow: 0 0.5em 1em rgb(255, 255, 255, .7);
    }

    .links {
        display: grid;
        grid-auto-columns: max-content;
        align-items: baseline;

        width: 100%;
    }

    .white-space {
        /* TODO figure out proper width */
        width: 100%;
        height: .75em;

        background: #fff;
    }

    .component {
        grid-row: 2;
    }
</style>