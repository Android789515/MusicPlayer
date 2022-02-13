<script>
    export let buttonName
    export let buttonAction
    export let hidden = false
</script>

<img
    class='media-control-button clickable'
    class:hidden={hidden}
    src='assets/icons/media-buttons/{buttonName}.svg'
    alt={buttonName}
    on:click={buttonAction}
>

<style>
    .media-control-button {
        width: 60px;
    }

    .hidden {
        display: none;
    }
</style>