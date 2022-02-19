<script lang='ts'>
    import { currentDirectory, useDirectoryNavigator } from '../../stores/directoryNavigator'

    export let linkTo

    $: isCurrentDirectory = linkTo === $currentDirectory

    const navigator = useDirectoryNavigator()
</script>

<li
    class='link clickable'
    class:currentDirectory={isCurrentDirectory}
    on:click={() => navigator.navigate(linkTo)}>
    <slot></slot>
</li>

<style>
    .link {
        justify-self: start;

        display: flex;
        flex-direction: column;
        align-items: center;

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