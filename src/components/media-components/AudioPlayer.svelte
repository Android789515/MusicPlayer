<script lang='ts'>
    import { onMount } from 'svelte'

    import { mediaControlOptions } from '../../stores/mediaControl'

    export let src

    const { muted, paused } = $mediaControlOptions

    let audio
    const playAudio = () => {
        audio.play()
    }

    onMount(playAudio)
</script>

<audio
    {src}
    autoplay
    bind:this={audio}
    bind:muted={muted}
    bind:paused={paused}
></audio>