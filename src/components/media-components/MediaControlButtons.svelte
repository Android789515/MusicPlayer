<script>
    import { mediaControls } from '../../stores/mediaControls'

    import MediaControlButton from './MediaControlButton.svelte'
    import VolumeButton from './VolumeButton.svelte'
    import VolumeBar from './VolumeBar.svelte'

    $: paused = mediaControls.isPaused()
    const pause = () => {
        console.log(paused)
        mediaControls.pause()
        console.log(paused)
    }
    const play = () => mediaControls.play()

    const rewind = () => mediaControls.rewind()
    const fastForward = () => mediaControls.fastForward()

    $: shuffle = mediaControls.isShuffleToggled()
    const toggleShuffle = () => mediaControls.toggleShuffle()
</script>

<div class='media-control-buttons' aria-label='Media control buttons'>
    <div class='shuffle-button' class:toggled={shuffle}>
        <MediaControlButton
            buttonName='shuffle'
            buttonAction={toggleShuffle}
            smallerSize={true}
        />
    </div>

    <MediaControlButton buttonName='rewind' buttonAction={rewind} />

    {#if paused}
        <MediaControlButton autoFocus={true} buttonName='play' buttonAction={play} />
    {:else}
        <MediaControlButton autoFocus={true} buttonName='pause' buttonAction={pause} />
    {/if}

    <MediaControlButton buttonName='fast-forward' buttonAction={fastForward} />

    <VolumeButton />

    <VolumeBar />
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