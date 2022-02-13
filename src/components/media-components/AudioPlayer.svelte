<script lang='ts'>
    export let src

    export let paused
    export let time

    export let volume
    export let muted

    let audio
</script>

<audio
    {src}
    autoplay
    bind:this={audio}

    bind:paused
    bind:currentTime={time}

    bind:volume
    bind:muted
></audio>

{paused} {time}