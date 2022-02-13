<script lang='ts'>
    export let src
    export let paused
    export let muted
    export let time

    let audio
</script>

<audio
    {src}
    autoplay
    bind:this={audio}
    bind:muted
    bind:paused
    bind:currentTime={time}
></audio>

{paused} {time}