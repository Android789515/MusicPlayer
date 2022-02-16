<script lang='ts'>
    import type { clickOrTouch } from '../../types/barInteraction'

    export let volume
    export let muted

    export let volumeControls

    export let isVolumeBarShown
    const showVolumeBar = () => isVolumeBarShown = true
    const hideVolumeBar = () => isVolumeBarShown = false

    const mutedIcon = 'assets/icons/volume-buttons/muted.svg'
    let volumeIcon
    $: if (volume < .3) {
        volumeIcon = 'assets/icons/volume-buttons/low-volume.svg'
    } else if (volume > .6) {
        volumeIcon = 'assets/icons/volume-buttons/high-volume.svg'
    } else {
        volumeIcon = 'assets/icons/volume-buttons/medium-volume.svg'
    }

    const handleInteractionRelease = (event: clickOrTouch) => {
        const didInteractWithVolumeControls = volumeControls.contains(event.target)
        if (!didInteractWithVolumeControls) {
            hideVolumeBar()
        }
    }
</script>

<svelte:window on:mouseup={handleInteractionRelease} />

<img
    class='volume-control-button'
    src={muted ? mutedIcon : volumeIcon}
    alt='Volume and mute button'
    on:click={showVolumeBar}
>

<style>
    .volume-control-button {
        width: 3.125em;
        height: 3.75em;
    }
</style>