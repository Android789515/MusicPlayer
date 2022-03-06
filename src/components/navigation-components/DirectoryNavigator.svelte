<script lang='ts'>
    import { onMount } from 'svelte'

    import { queuedSong, library } from '../../stores/library'
    import { currentDirectory, useDirectoryNavigator } from '../../stores/directoryNavigator'
    import { capitalize } from '../../utils/stringUtils'

    import Tab from './Tab.svelte'
    import DirectoryName from '../../components/navigation-components/DirectoryName.svelte'
    import CloseableTab from '../../components/navigation-components/CloseableTab.svelte'

    $: ({ src } = $queuedSong)
    $: isSongQueued = src !== undefined

    const initializeDirectory = () => $currentDirectory = 'library'

    const navigator = useDirectoryNavigator()

    let isPlaylistOpen = false

    const unqueueSong = () => {
        library.unqueueSong()
        navigator.navigate('library')
    }

    onMount(initializeDirectory)
</script>

<nav class='navigation' role='navigation'>
    <ul
        aria-label='Navigation Links'
        class='links unstyled-ul'
    >
        <Tab linkTo='library'>
            <DirectoryName name='Library' />
        </Tab>

        {#if isPlaylistOpen}
            <Tab linkTo='openedPlaylist'>
                <DirectoryName name='Playlist' />
            </Tab>
        {/if}

        {#if isSongQueued}
            <CloseableTab linkTo='currentlyPlaying' on:closeTab={unqueueSong}>
                <DirectoryName name='Currently Playing' />
            </CloseableTab>
        {/if}
    </ul>
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
    }

    .links {
        display: grid;
        grid-auto-columns: max-content;
        align-items: baseline;

        width: 100%;
    }

    .component {
        grid-row: 2;
    }
</style>