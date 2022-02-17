<script lang='ts'>
    export let volume
    export let muted

    export let isVolumeBarShown
    const showVolumeBar = () => isVolumeBarShown = true

    const mutedIcon = 'assets/icons/volume-buttons/muted.svg'
    let volumeIcon
    $: if (volume < .3) {
        volumeIcon = 'assets/icons/volume-buttons/low-volume.svg'
    } else if (volume > .6) {
        volumeIcon = 'assets/icons/volume-buttons/high-volume.svg'
    } else {
        volumeIcon = 'assets/icons/volume-buttons/medium-volume.svg'
    }
</script>

<img
    class='volume-control-button'
    src={muted ? mutedIcon : volumeIcon}
    alt='Volume and mute button'
    on:click={showVolumeBar}
>

<style>
    .volume-control-button {
        width: var(--volume-button-width);
        height: 3.75em;
    }
</style>