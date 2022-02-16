<script lang='ts'>
    export let draggingOff
</script>

<svelte:window
    on:mouseup={draggingOff}
    on:touchend={draggingOff}
    on:touchcancel={draggingOff}
/>