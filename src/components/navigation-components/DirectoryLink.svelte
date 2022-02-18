<script lang='ts'>
    import { currentDirectory, useDirectoryNavigator } from '../../stores/directoryNavigator'

    export let linkTo

    $: isCurrentDirectory = linkTo === $currentDirectory

    const navigator = useDirectoryNavigator()
</script>

<li
    class='link'
    class:currentDirectory={isCurrentDirectory}
    on:click={() => navigator.navigate(linkTo)}>
    <slot></slot>
    <span class='marker'></span>
</li>

<style>
    .link {
        justify-self: start;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .marker {
        display: none;
    }

    .currentDirectory .marker {
        display: block;

        width: 1em;
        height: .5em;

        background: #000;

        border-radius: .5em;
    }
</style>