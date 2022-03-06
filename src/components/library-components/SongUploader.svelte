<script lang='ts'>
    import { useSongUploader } from '../../utils/useSongUploader'
    import { useEnterKeyAsClick } from '../../utils/useEnterKeyAsClick'

    let uploader

    const { handleUpload } = useSongUploader()

    const openUploadWindow = () => uploader.click()

    const handleKeydown = useEnterKeyAsClick(openUploadWindow)
</script>

<div aria-label='Song uploader' class='song-uploader clickable'>
    <h3
        class='upload-text'
        tabindex='3'
        on:keydown={handleKeydown}
        on:click={openUploadWindow}
    >
        Click to upload
    </h3>
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