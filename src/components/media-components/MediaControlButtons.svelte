<script>
    import MediaControlButton from './MediaControlButton.svelte'
    import VolumeButton from './VolumeButton.svelte'

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
</script>

<div class='media-control-buttons'>
    <MediaControlButton
        buttonName='shuffle'
        buttonAction={toggleShuffle}
        smallerSize={true}
    />

    <MediaControlButton buttonName='rewind' buttonAction={rewind} />

    <MediaControlButton hidden={!paused} buttonName='play' buttonAction={play} />
    <MediaControlButton hidden={paused} buttonName='pause' buttonAction={pause} />

    <MediaControlButton buttonName='fast-forward' buttonAction={fastForward} />

    <VolumeButton bind:volume bind:muted />
</div>

<style>
    .media-control-buttons {
        display: flex;
    }

    .toggled {
        background: #333;
    }
</style>