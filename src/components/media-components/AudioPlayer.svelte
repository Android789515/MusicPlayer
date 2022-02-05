<script lang='ts'>
    import { onDestroy, onMount } from 'svelte'

    import { mediaControlOptions } from '../../stores/mediaControl'
    import type { MediaControl } from '../../objects/appObjects'

    export let src

    let controls: MediaControl
    const unsubscribe = mediaControlOptions.subscribe((controlOptions: MediaControl) => {
        controls = controlOptions
    })

    let audio
    const playAudio = () => {
        audio.play()
    }

    onMount(playAudio)
    onDestroy(unsubscribe)
</script>

<audio
    {src}
    autoplay
    bind:this={audio}
    bind:muted={controls.muted}
    bind:paused={controls.paused}
></audio>