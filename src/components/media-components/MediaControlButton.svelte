<script lang='ts'>
    export let buttonName
    export let buttonAction
    export let hidden = false
    export let smallerSize = false
</script>

<img
    class='media-control-button clickable'
    class:smallerSize={smallerSize === true}
    class:hidden={hidden}
    src='assets/icons/media-buttons/{buttonName}.svg'
    alt={buttonName}
    on:click={buttonAction}
>

<style>
    .media-control-button {
        width: 3.75em;
    }

    .smallerSize {
        width: 3.125em;
        height: 3.75em;
    }
</style>