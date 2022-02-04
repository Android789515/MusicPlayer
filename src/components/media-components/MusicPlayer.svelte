<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import AudioPlayer from './AudioPlayer.svelte'

    let src

    const unsubscribe = queuedSong.subscribe(queuedSong => src = queuedSong.src)

    onDestroy(unsubscribe)
</script>

<section>
    <AudioPlayer {src} />
</section>