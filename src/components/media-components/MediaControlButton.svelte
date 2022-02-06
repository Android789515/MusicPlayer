<script>
    export let buttonName
    export let buttonAction
</script>

<img
    class='media-control-button clickable'
    src='assets/icons/media-buttons/{buttonName}.svg'
    alt={buttonName}
    on:click={buttonAction}
>

<style>
    .media-control-button {
        width: 60px;
    }
</style>