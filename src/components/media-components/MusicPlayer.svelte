<script lang='ts'>
    import { onDestroy } from 'svelte'

    import { queuedSong } from '../../stores/library'

    import AudioPlayer from './AudioPlayer.svelte'

    let src
    $: isSongQueued = src !== undefined

    const unsubscribe = queuedSong.subscribe(queuedSong => src = queuedSong.src)

    onDestroy(unsubscribe)
</script>

<section>
    {#if isSongQueued}
        <AudioPlayer {src} />
    {/if}
</section>