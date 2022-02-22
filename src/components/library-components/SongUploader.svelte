<script lang='ts'>
    import { useSongUploader } from '../../utils/useSongUploader'

    let uploader

    const { handleUpload } = useSongUploader()
</script>

<div aria-label='Song uploader'>
    <p on:click={() => uploader.click()}>Click to upload</p>
    <input
        class='song-uploader'
        type='file'
        multiple
        bind:this={uploader}
        on:change={() => handleUpload(uploader)}
    >
</div>

<style>
    .song-uploader {
        display: none;
    }
</style>