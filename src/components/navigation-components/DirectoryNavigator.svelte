<script lang='ts'>
    import { Route, Router } from 'svelte-navigator'

    import { queuedSong, library } from '../../stores/library'
    import { Routes } from '../../types/routes'

    import Library from '../../pages/Library.svelte'
    import CurrentlyPlaying from '../../pages/CurrentlyPlaying.svelte'
    import Tab from './Tab.svelte'
    import DirectoryName from '../../components/navigation-components/DirectoryName.svelte'
    import CloseableTab from '../../components/navigation-components/CloseableTab.svelte'

    $: ({ src } = $queuedSong)
    $: isSongQueued = src !== undefined
    $: openedPlaylists = []

    const unqueueSong = () => {
        library.unqueueSong()
    }
</script>

<Router>
    <nav class='navigation' role='navigation'>
        <ul
            aria-label='Navigation Links'
            class='links unstyled-ul'
        >
            <Tab>
                <DirectoryName name='Library' />
            </Tab>

            {#each openedPlaylists as openedPlaylist}
                <CloseableTab path='openedPlaylist' on:closeTab={() => {}}>
                    <DirectoryName name='Playlist' />
                </CloseableTab>
            {/each}

            {#if isSongQueued}
                <CloseableTab path='currentlyPlaying' on:closeTab={unqueueSong}>
                    <DirectoryName name='Currently Playing' />
                </CloseableTab>
            {/if}
        </ul>
    </nav>

    <div class='component'>
        <Route path={Routes.currentlyPlaying}>
            <CurrentlyPlaying />
        </Route>

        <Route>
            <Library />
        </Route>
    </div>
</Router>

<style>
    .navigation {
        position: sticky;
        top: 0;

        /* Allows side scrolling through tabs */
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