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

<div class='directory-navigator' aria-label='App directory'>
    <nav class='navigation' role='navigation'>
        <ul class='links unstyled-ul' aria-label='Navigation Links'>
            <DirectoryLink linkTo='library'>
                <DirectoryName name='Library' />
            </DirectoryLink>

            {#if showPlaylists}
                <DirectoryLink linkTo='playlists'>
                    <DirectoryName name='Playlists' />
                </DirectoryLink>
            {/if}

            {#if isSongQueued}
                <DirectoryLink linkTo='currentlyPlaying'>
                    <DirectoryName name='Currently Playing' />
                </DirectoryLink>
            {/if}
        </ul>
    </nav>

    <div class='component' aria-label={capitalize($currentDirectory)}>
        <svelte:component this={navigator.getComponentToRender()} />
    </div>
</div>

<style>
    .directory-navigator {
        display: grid;
    }

    .navigation {
        position: fixed;
        left: 0;
        right: 0;

        overflow-x: auto;

        width: 100%;

        margin: auto;
        --shaded-nav-bg: calc(var(--app-bg-lightness) - 10%);
        background: hsl(0, 0%, var(--shaded-nav-bg));
    }

    .links {
        display: grid;
        grid-auto-columns: max-content;
        align-items: baseline;

        width: 100%;
    }

    .component {
        padding: 5em 0;
    }
</style>