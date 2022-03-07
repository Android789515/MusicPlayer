<script lang='ts'>
    import QueuedSong from '../components/wrappers/QueuedSong.svelte'
</script>

<QueuedSong styles={{
    container: {
        display: 'flex',
        flexDirection: 'column',

        padding: '1em',
        marginTop: '5em'
    },
    coverArt: {
        width: '10.5em',

        margin: '2em auto',
    },
    songInfo: {
        textAlign: 'center'
    }
}} />