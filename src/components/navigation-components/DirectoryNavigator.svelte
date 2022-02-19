<script lang='ts'>
    import { onDestroy, onMount } from 'svelte'

    import { queuedSong } from '../../stores/library'
    import { currentDirectory, useDirectoryNavigator } from '../../stores/directoryNavigator'

    import DirectoryLink from '../../components/navigation-components/DirectoryLink.svelte'
    import DirectoryName from '../../components/navigation-components/DirectoryName.svelte'

    let src
    const unsubscribe = queuedSong.subscribe(queuedSong => {
        src = queuedSong.src
    })
    $: isSongQueued = src !== undefined

    const initializeDirectory = () => $currentDirectory = 'library'

    const navigator = useDirectoryNavigator()

    onMount(initializeDirectory)
    onDestroy(unsubscribe)
</script>

<div class='directory'>
    <nav class='navigation'>
        <ul
            class='links unstyled-ul'
            style='--number-of-directories: {navigator.getNumberOfDirectories()}'
        >
            <DirectoryLink linkTo='library'>
                <DirectoryName name='Library' />
            </DirectoryLink>

            {#if isSongQueued}
                <DirectoryLink linkTo='currentlyPlaying'>
                    <DirectoryName name='Currently Playing' />
                </DirectoryLink>
            {/if}
        </ul>
    </nav>

    <div class='component'>
        <svelte:component this={navigator.getComponentToRender()} />
    </div>
</div>

<style>
    .directory {
        display: grid;
    }

    .navigation {
        position: fixed;
        left: 0;
        right: 0;

        overflow-x: scroll;

        width: 100%;

        padding: 0 1em 0 0;
        margin: auto;
        --shaded-nav-bg: calc(var(--app-bg-lightness) - 10%);
        background: hsl(0, 0%, var(--shaded-nav-bg));
    }

    .links {
        display: grid;
        grid-template-columns: repeat(var(--number-of-directories), max-content);
        align-items: baseline;
    }

    .component {
        padding: 5em 0;
    }
</style>