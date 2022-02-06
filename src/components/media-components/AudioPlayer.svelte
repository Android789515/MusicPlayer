<script lang='ts'>
    import { afterUpdate, onDestroy } from 'svelte'

    import { mediaControlOptions } from '../../stores/mediaControl'

    export let src

    $: $mediaControlOptions
    let paused
    let muted

    const unsubscribe = mediaControlOptions.subscribe(controlOptions => {
        paused = controlOptions.paused
        muted = controlOptions.muted
    })

    let audio
    $: audio && {

    }
    const syncAudio = () => {
        if (!paused) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    afterUpdate(syncAudio)
    onDestroy(unsubscribe)
</script>

<audio
    {src}
    autoplay
    bind:this={audio}
    bind:muted={muted}
></audio>