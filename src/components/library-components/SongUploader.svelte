<script lang='ts'>
    import { useSongUploader } from '../../utils/useSongUploader'

    let uploader

    const { handleUpload } = useSongUploader()
</script>

<div aria-label='Song uploader' class='song-uploader'>
    <p on:click={() => uploader.click()}>Click to upload</p>
    <input
        class='file-uploader'
        type='file'
        multiple
        bind:this={uploader}
        on:change={() => handleUpload(uploader)}
    >
</div>

<style>
    .song-uploader {
    }

    .file-uploader {
        display: none;
    }
</style>