<script lang='ts'>
    import { queuedSong } from '../../stores/library'

    import AudioPlayer from './AudioPlayer.svelte'
    import SongInfo from './SongInfo.svelte'

    const { src, coverArt } = $queuedSong
    $: isSongQueued = src !== undefined
</script>

<section>
    {#if isSongQueued}
        <AudioPlayer {src} />
        <SongInfo {coverArt} />
    {/if}
</section>