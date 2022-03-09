<script lang='ts'>
    import { mediaControls } from '../../stores/mediaControls'
    import { useEnterKeyAsClick } from '../../utils/useEnterKeyAsClick'

    $: volume = mediaControls.getVolume()
    $: muted = volume === 0

    const showVolumeBar = () => mediaControls.showVolumeBar()
    const handleKeydown = useEnterKeyAsClick(showVolumeBar)

    const mutedIcon = 'assets/icons/volume-buttons/muted.svg'
    let volumeIcon
    $: if (volume < .3) {
        volumeIcon = 'assets/icons/volume-buttons/low-volume.svg'
    } else if (volume > .6) {
        volumeIcon = 'assets/icons/volume-buttons/high-volume.svg'
    } else {
        volumeIcon = 'assets/icons/volume-buttons/medium-volume.svg'
    }

    $: volumePercent = volume * 100
</script>

<img
    class='volume-control-button clickable'
    aria-label={`Volume button, volume is ${volumePercent}%`}
    role='button'
    tabindex='5'
    src={muted ? mutedIcon : volumeIcon}
    alt='Volume button'
    on:click={showVolumeBar}
    on:keydown={handleKeydown}
>

<style>
    .volume-control-button {
        width: 3.125em;
    }
</style>