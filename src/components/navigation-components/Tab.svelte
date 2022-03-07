<script lang='ts'>
    import { onMount } from 'svelte'
    import { Link, useLocation } from 'svelte-navigator'

    export let path = ''

    const location = useLocation()
    $: currentPath = $location.pathname

    $: isCurrentDirectory = currentPath === `/${path}`

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
    class='tab'
    tabindex='1'
    class:currentDirectory={isCurrentDirectory}
    bind:this={navLink}
>
    <Link to={path} class='link nav-link clickable'>
        <slot></slot>
    </Link>
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
</style>