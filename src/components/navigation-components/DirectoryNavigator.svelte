<script lang='ts'>
    import { Route, Router } from 'svelte-navigator'

    import { queuedSong, library } from '../../stores/library'
    import { Routes } from '../../types/routes'

    import Library from '../../pages/Library.svelte'
    import CurrentlyPlaying from '../../pages/CurrentlyPlaying.svelte'
    import Tab from './Tab.svelte'
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
        <ul class='links unstyled-ul' aria-label='Navigation Links'>
            <Tab name='Library' />

            {#each openedPlaylists as openedPlaylist}
                <CloseableTab
                    path='openedPlaylist'
                    name='Playlist'
                    on:closeTab={() => {}}
                />
            {/each}

            <!-- Uses a hidden class instead of conditional rendering -->
            <!-- To prevent bugs when song unqueues -->
            <CloseableTab
                hidden={!isSongQueued}
                path='currentlyPlaying'
                name='Currently Playing'
                on:closeTab={unqueueSong}
            />
        </ul>
    </nav>

    <div class='component'>
        <Route path={Routes.currentlyPlaying}>
            <CurrentlyPlaying />
        </Route>

        <Route path={Routes.library}>
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