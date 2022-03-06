<script lang='ts'>
    import { slide } from 'svelte/transition'

    import { library } from '../../stores/library'

    export let query

    let playlistName

    $: {
        playlistName = query
    }

    type KeyPressed = string
    enum Keys { enter = 'Enter' }

    const handleKeydown = ({ key }: { key: KeyPressed }) => {
        if (key === Keys.enter) {
            library.createPlaylist(playlistName)
        }
    }
</script>

<div
    class='layout clickable'
    aria-label='Create playlist button'
    role='button'
    in:slide={{ delay: 1000 }}
>
    <h3 class='title'>Create playlist?</h3>
    <input
        class='playlist-name-field'
        type='text'
        bind:value={playlistName}
        on:keydown={handleKeydown}
    >
</div>

<style>
    .layout {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        padding-right: var(--inner-component-side-space);
    }

    .title {
        font-size: 1.1rem;
        text-align: center;

        margin: 0;
    }

    .playlist-name-field {
        display: block;

        width: 50%;
    }
</style>