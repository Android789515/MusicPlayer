<script lang='ts'>
    let songUploader

    const readTags = (file) => {
        console.log(file)
        // const reader = new jsmediatags.Reader(file).setTagsToRead([ 'title', 'artist', 'picture' ])
        //
        // let tags
        // reader.read({
        //     onSuccess: data => tags = data.tags,
        //     onError: error => {
        //         throw new Error(`${error.type} ${error.info}`)
        //     }
        // })
        // return tags
    }

    const handleUpload = () => {
        const uploadedData = [ ...songUploader.files ]

        uploadedData.forEach(readTags)
    }
</script>

<div>
    <p on:click={() => songUploader.click()}>Click to upload</p>
    <input
        class='song-uploader'
        type='file'
        multiple
        bind:this={songUploader}
        on:change={handleUpload}
    >
</div>

<style>
    .song-uploader {
        display: none;
    }
</style>