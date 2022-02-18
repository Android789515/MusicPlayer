<script lang='ts'>
    import { useDirectoryNavigator } from '../../stores/directoryNavigator'

    export let linkTo

    const navigator = useDirectoryNavigator()
</script>

<li class='link' on:click={() => navigator.navigate(linkTo)}>
    <slot></slot>
</li>

<style>
    .link {
        justify-self: start;
    }
</style>