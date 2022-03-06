<script lang='ts'>
    import { onMount } from 'svelte'

    import { currentDirectory, useDirectoryNavigator } from '../../stores/directoryNavigator'

    export let linkTo

    $: isCurrentDirectory = linkTo === $currentDirectory

    const navigator = useDirectoryNavigator()
    const navigateToLink = () => navigator.navigate(linkTo)

    let navLink
    const focusPage = () => {
        if (isCurrentDirectory) {
            navLink.focus()
        }
    }

    onMount(focusPage)
</script>

<li
    aria-label='Navigation Link'
    class='link clickable'
    tabindex='1'
    class:currentDirectory={isCurrentDirectory}
    on:click={navigateToLink}
    bind:this={navLink}
>
    <slot></slot>
</li>

<style>
    .link {
        grid-row: 1;
        justify-self: start;

        white-space: nowrap;

        padding: .5em 1em;
    }
    .currentDirectory {
        background: hsl(0, 0%, var(--app-bg-lightness));
    }

    .link:not(.currentDirectory) {
        transform: translateY(0);
        transition: transform 250ms;
    }

    .link:not(.currentDirectory):focus,
    .link:not(.currentDirectory):hover {
        transform: translateY(-.125em);
    }

    .link:not(.currentDirectory):active {
        transform: translateY(.0625em);
    }
</style>