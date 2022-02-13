<script lang='ts'>
    export let volume
    export let muted

    const mutedIcon = 'assets/icons/volume-buttons/muted.svg'
    const getVolumeIcon = () => {
        if (volume < .3) {
            return 'assets/icons/volume-buttons/low-volume.svg'
        } else if (volume > .6) {
            return 'assets/icons/volume-buttons/high-volume.svg'
        } else {
            return 'assets/icons/volume-buttons/medium-volume.svg'
        }
    }

    const toggleMute = () => muted = !muted
</script>

<img
    class='volume-control-button'
    src={muted ? mutedIcon : getVolumeIcon()}
    alt='Volume and mute button'
    on:click={toggleMute}
>

<style>
    .volume-control-button {
        width: 3.125em;
    }
</style>