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