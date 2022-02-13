<script>
    import MediaControlButton from './MediaControlButton.svelte'

    export let paused
    export let time

    const pause = () => paused = true
    const play = () => paused = false
    const rewind = () => time -= 5
    const fastForward = () => time += 5
</script>

<div class='media-control-buttons'>
    <MediaControlButton buttonName='rewind' buttonAction={rewind} />
    <MediaControlButton hidden={!paused} buttonName='play' buttonAction={play} />
    <MediaControlButton hidden={paused} buttonName='pause' buttonAction={pause} />
    <MediaControlButton buttonName='fast-forward' buttonAction={fastForward} />
</div>
<style>
    .media-control-buttons {
        display: flex;

        margin: auto;
    }
</style>