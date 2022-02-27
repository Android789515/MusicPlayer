<script>
    import MediaControlButton from './MediaControlButton.svelte'
    import VolumeButton from './VolumeButton.svelte'
    import VolumeBar from './VolumeBar.svelte'

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
    <div class='shuffle-button' class:toggled={shuffle}>
        <MediaControlButton
            buttonName='shuffle'
            buttonAction={toggleShuffle}
            smallerSize={true}
        />
    </div>

    <MediaControlButton buttonName='rewind' buttonAction={rewind} />

    <MediaControlButton hidden={!paused} buttonName='play' buttonAction={play} />
    <MediaControlButton hidden={paused} buttonName='pause' buttonAction={pause} />

    <MediaControlButton buttonName='fast-forward' buttonAction={fastForward} />

    <VolumeButton
        bind:isVolumeBarShown
        bind:volume
        bind:muted
    />

    <VolumeBar bind:isVolumeBarShown bind:volume />
</div>

<style>
    .media-control-buttons {
        display: flex;
        align-items: center;
    }

    .shuffle-button {
        padding: .0625em .125em;
        margin-bottom: .125em;
    }

    .shuffle-button.toggled {
        background: #dbdbdb9e;
        border-radius: 25%;
    }
</style>