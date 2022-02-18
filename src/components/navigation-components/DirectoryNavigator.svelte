<script lang='ts'>
    import { onDestroy, onMount } from 'svelte'

    import { queuedSong } from '../../stores/library'
    import { directoryNavigator } from '../../stores/directoryNavigator'

    import QueuedSong from '../../components/media-components/wrappers/QueuedSong.svelte'
    import Library from '../../components/library-components/Library.svelte'
    import DirectoryLink from '../../components/navigation-components/DirectoryLink.svelte'
    import DirectoryName from '../../components/navigation-components/DirectoryName.svelte'

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
    <nav>
        <ul
            class='links unstyled-ul'
            style='--number-of-directories: {numberOfDirectories}'
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

    <svelte:component this={directories[currentDirectory]} />
</div>

<style>
    .directory {
        padding-top: 2em;
        padding-bottom: 5em;
    }

    .links {
        display: grid;
        grid-template-columns: repeat(var(--number-of-directories), 1fr);
        align-items: center;
    }
</style>