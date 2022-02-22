<script lang='ts'>
    import formatTime from '../../utils/formatTime'

    export let songInfo
    export let timeToDisplay

    export let customStyle = false

    const { title, artist } = songInfo
</script>

<div
    aria-label='Song information'
    class='song-info'
    class:customStyle={customStyle}
>
    <slot name='title'>
        <h2>{title}</h2>
    </slot>

    <p>{artist}</p>

    <p>{formatTime(timeToDisplay)}</p>
</div>

<style>
    .song-info {
        text-align: center;
    }

    .customStyle {
        all: inherit;
    }

    .song-info > * {
        margin: 0;
    }
</style>