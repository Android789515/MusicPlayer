<script lang='ts'>
    import { queuedSong } from '../../stores/library'
    import { useDirectoryNavigator } from '../../stores/directoryNavigator'

    const navigator = useDirectoryNavigator()

    const queueTestSong = () => {
        queuedSong.queueSong({
            id: '',
            src: 'test-audio/Beethoven.mp3',
            coverArt: '',
            title: 'Fur Elise',
            artist: 'Beethoven',
            duration: 175
        })
        navigator.navigate('currentlyPlaying')
    }

    const unqueueSong = () => queuedSong.unqueueSong()
</script>

<section>
    <button class='temp' on:click={queueTestSong}>Queue test song</button>
    <button class='temp' on:click={unqueueSong}>Un-queue song</button>
</section>

<style>
    .temp {
        height: max-content;
    }
</style>