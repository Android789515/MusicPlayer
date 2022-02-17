<script lang='ts'>
    import VolumeButton from './VolumeButton.svelte'
    import VolumeBar from './VolumeBar.svelte'

    export let volume
    export let muted

    export let isVolumeBarShown

    let volumeControls
</script>

<VolumeButton
    {volumeControls}
    bind:isVolumeBarShown
    bind:volume
    bind:muted
/>
<VolumeBar {isVolumeBarShown} bind:volume />

<style>
    .volume-controls {
        display: grid;
    }
</style>