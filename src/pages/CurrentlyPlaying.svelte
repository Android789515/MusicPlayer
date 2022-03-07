<script lang='ts'>
    import { afterUpdate } from 'svelte'
    import { useNavigate } from 'svelte-navigator'

    import { queuedSong } from '../stores/library'

    import QueuedSong from '../components/wrappers/QueuedSong.svelte'

    const navigate = useNavigate()

    const redirectIfNoSongQueued = () => {
        const isSongQueued = $queuedSong.src !== undefined

        if (!isSongQueued) {
            navigate(-1)
        }
    }

    afterUpdate(redirectIfNoSongQueued)
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