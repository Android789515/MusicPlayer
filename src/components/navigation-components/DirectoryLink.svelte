<script lang='ts'>
    import { useDirectoryNavigator } from '../../stores/directoryNavigator'

    export let linkTo

    const navigator = useDirectoryNavigator()
</script>

<li on:click={() => navigator.navigate(linkTo)}>
    <slot></slot>
</li>