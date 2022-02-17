<script lang='ts'>
    import { queuedSong } from '../../stores/library'

    const queueTestSong = () => {
        queuedSong.queueSong({
            id: '',
            src: 'test-audio/Beethoven.mp3',
            coverArt: '',
            title: 'Fur Elise',
            artist: 'Beethoven',
            duration: 175
        })
    }

    const unqueueSong = () => queuedSong.unqueueSong()
</script>

<button class='temp' on:click={queueTestSong}>Queue test song</button>
<button class='temp' on:click={unqueueSong}>Un-queue song</button>

<style>
    .temp {
        height: max-content;
    }
</style>