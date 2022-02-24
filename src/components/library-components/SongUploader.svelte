<script lang='ts'>
    import { useSongUploader } from '../../utils/useSongUploader'

    let uploader

    const { handleUpload } = useSongUploader()
</script>

<div aria-label='Song uploader' class='song-uploader clickable'>
    <h3 class='upload-text' on:click={() => uploader.click()}>Click to upload</h3>
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
        text-align: center;

        grid-column: 2 / -2;

        padding: 1em;
        border: dashed rgba(0, 0, 0, .5) .125em;
        border-radius: .5em;
    }

    .upload-text {
        margin: 0;
    }

    .file-uploader {
        display: none;
    }
</style>