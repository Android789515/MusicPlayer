<script>
    import MediaControlButton from './MediaControlButton.svelte'
    import VolumeControls from './VolumeControls.svelte'

    export let paused
    export let time

    export let volume
    export let muted

    export let shuffle

    const pause = () => paused = true
    const play = () => paused = false

    const rewind = () => time -= 5
    const fastForward = () => time += 5

    const toggleShuffle = () => shuffle = !shuffle

    let isVolumeBarShown = false
</script>

<div
    class='media-control-buttons'
    class:volumeBarShown={isVolumeBarShown}
>
    <MediaControlButton
        buttonName='shuffle'
        buttonAction={toggleShuffle}
        smallerSize={true}
    />

    <MediaControlButton buttonName='rewind' buttonAction={rewind} />

    <MediaControlButton hidden={!paused} buttonName='play' buttonAction={play} />
    <MediaControlButton hidden={paused} buttonName='pause' buttonAction={pause} />

    <MediaControlButton buttonName='fast-forward' buttonAction={fastForward} />

    <VolumeControls
        bind:isVolumeBarShown
        bind:volume
        bind:muted
    />
</div>

<style>
    .media-control-buttons {
        grid-row: 3;
        grid-column: 1;

        display: flex;
        align-items: flex-end;
    }

    .media-control-buttons.volumeBarShown {
        grid-row: 2 / span 2;
    }

    .toggled {
        background: #333;
    }
</style>