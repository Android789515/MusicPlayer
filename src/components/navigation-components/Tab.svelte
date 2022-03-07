<script lang='ts'>
    import { afterUpdate } from 'svelte'
    import { Link, useLocation } from 'svelte-navigator'

    import DirectoryName from './DirectoryName.svelte'

    export let path = '/'
    export let name
    export let hidden = false

    const location = useLocation()
    $: currentPath = $location.pathname

    $: isCurrentDirectory = currentPath === path

    let navLink
    const focusPage = () => {
        if (isCurrentDirectory) {
            navLink.focus()
        }
    }

    afterUpdate(focusPage)
</script>

<li
    aria-label='Navigation Link'
    class='tab'
    tabindex='1'
    class:currentDirectory={isCurrentDirectory}
    class:hidden={hidden}
    bind:this={navLink}
>
    <slot>
        <Link to={path} class='link nav-link clickable'>
            <DirectoryName {name} />
        </Link>
    </slot>
</li>

<style>
    .tab {
        grid-row: 1;
        justify-self: start;
    }
    .currentDirectory {
        background: hsl(0, 0%, var(--app-bg-lightness));
    }

    :global(.link) {
        text-decoration: none;
        color: #333;
    }
    :global(.nav-link) {
        display: block;

        white-space: nowrap;

        padding: .5em 1em;
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

    .hidden {
        display: none;
    }
</style>