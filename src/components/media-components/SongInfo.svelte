<script lang='ts'>
    import formatTime from '../../utils/formatTime'

    export let title
    export let artist
    export let duration
</script>

<div class='song-info'>
    <h2>{title}</h2>

    <p>{artist}</p>

    <p>{formatTime(duration)}</p>
</div>

<style>
    .song-info {
        text-align: center;
    }

    .song-info > * {
        margin: 0;
    }
</style>