<script lang='ts'>
    import { Route, Router } from 'svelte-navigator'

    import { queuedSong, library, openedPlaylists } from '../../stores/library'
    import { Routes } from '../../types/routes'

    import Library from '../../pages/Library.svelte'
    import CurrentlyPlaying from '../../pages/CurrentlyPlaying.svelte'
    import OpenedPlaylist from '../../pages/OpenedPlaylist.svelte'
    import Tab from './Tab.svelte'
    import CloseableTab from '../../components/navigation-components/CloseableTab.svelte'

    $: ({ src } = $queuedSong)
    $: isSongQueued = src !== undefined
</script>

<Router>
    <nav class='navigation' role='navigation'>
        <ul class='links unstyled-ul' aria-label='Navigation Links'>
            <Tab name='Library' />

            {#each $openedPlaylists as {name, id} (id)}
                <CloseableTab
                    path={`/${name}`}
                    name={name}
                    on:closeTab={() => library.closePlaylist(id)}
                />
            {/each}

            <!-- Uses a hidden class instead of conditional rendering -->
            <!-- To prevent bugs when song unqueues -->
            <CloseableTab
                hidden={!isSongQueued}
                path='/currentlyPlaying'
                name='Currently Playing'
                on:closeTab={() => library.unqueueSong()}
            />
        </ul>
    </nav>

    <div class='component'>
        <Route path=':playlistName'>
            <OpenedPlaylist />
        </Route>

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