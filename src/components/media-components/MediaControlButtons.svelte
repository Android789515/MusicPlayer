<script>
    import MediaControlButton from './MediaControlButton.svelte'
    import VolumeButton from './VolumeButton.svelte'

    export let paused
    export let time

    export let volume
    export let muted

    export let shuffle

    export let isVolumeBarShown

    const pause = () => paused = true
    const play = () => paused = false

    const rewind = () => time -= 5
    const fastForward = () => time += 5

    const toggleShuffle = () => shuffle = !shuffle
</script>

<div aria-label='Media control buttons' class='media-control-buttons'>
    <MediaControlButton
        buttonName='shuffle'
        buttonAction={toggleShuffle}
        smallerSize={true}
    />

    <MediaControlButton buttonName='rewind' buttonAction={rewind} />

    <MediaControlButton hidden={!paused} buttonName='play' buttonAction={play} />
    <MediaControlButton hidden={paused} buttonName='pause' buttonAction={pause} />

    <MediaControlButton buttonName='fast-forward' buttonAction={fastForward} />

    <VolumeButton
        bind:isVolumeBarShown
        bind:volume
        bind:muted
    />
</div>

<style>
    .media-control-buttons {
        grid-row: 2;
        grid-column: 1 / span 2;

        display: flex;
        align-items: flex-end;
    }
</style>