<script lang='ts'>
    import { onDestroy, onMount } from 'svelte'

    import { queuedSong } from '../../stores/library'
    import { directoryNavigator } from '../../stores/directoryNavigator'

    import QueuedSong from '../../components/media-components/wrappers/QueuedSong.svelte'
    import Library from '../../components/library-components/Library.svelte'
    import DirectoryLink from '../../components/navigation-components/DirectoryLink.svelte'

    let src
    const unsubscribeFromQueuedSong = queuedSong.subscribe(queuedSong => {
        src = queuedSong.src
    })
    $: isSongQueued = src !== undefined

    const directories = {
        currentlyPlaying: QueuedSong,
        library: Library
    }
    $: numberOfDirectories = Object.keys(directories).length

    const initializeDirectoryNavigator = () => {
        directoryNavigator.initialize('library')
    }

    let currentDirectory
    const unsubscribeFromDirectoryNavigator = directoryNavigator.subscribe(navigator => {
        currentDirectory = navigator.directory
    })

    const unsubscribeAll = () => {
        unsubscribeFromQueuedSong()
        unsubscribeFromDirectoryNavigator()
    }

    onMount(initializeDirectoryNavigator)
    onDestroy(unsubscribeAll)
</script>

<div class='directory'>
    <nav class='navigation'>
        <ul
            class='links unstyled-ul'
            style='--number-of-directories: {numberOfDirectories}'
        >
            <DirectoryLink linkTo='library'>
                <p class='directory-name'>Library</p>
            </DirectoryLink>

            {#if isSongQueued}
                <DirectoryLink linkTo='currentlyPlaying'>
                    <p class='directory-name'>Currently Playing</p>
                </DirectoryLink>
            {/if}
        </ul>
    </nav>

    <svelte:component this={directories[currentDirectory]} />
</div>

<style>
    .directory {
        padding-top: 2em;
        padding-bottom: 5em;
    }

    .navigation {

    }

    .links {
        display: grid;
        grid-template-columns: repeat(var(--number-of-directories), 1fr);
    }

    .directory-name {
        text-align: center;

        margin-top: 0;
    }
</style>