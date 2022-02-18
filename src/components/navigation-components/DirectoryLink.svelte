<script lang='ts'>
    import { directoryNavigator } from '../../stores/directoryNavigator'

    export let linkTo

    const { navigate } = directoryNavigator
</script>

<li on:click={() => navigate(linkTo)}>
    <slot></slot>
</li>