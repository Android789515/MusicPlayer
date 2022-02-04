<script lang='ts'>
    import { mediaControlOptions } from '../../stores/mediaControl'
    import { onDestroy } from 'svelte'

    export let src

    let muted
    const unsubscribe = mediaControlOptions.subscribe(controls => muted = controls.muted)

    let audio

    onDestroy(unsubscribe)
</script>

<audio
    bind:this={audio}
    {src}
    bind:muted
    autoplay
></audio>