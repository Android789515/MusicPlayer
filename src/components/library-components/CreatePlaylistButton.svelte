<script lang='ts'>
    import { slide } from 'svelte/transition'

    import { library, playlists } from '../../stores/library'

    export let query

    let playlistName
    $: playlistName = query

    type KeyPressed = string
    enum Keys { enter = 'Enter' }

    const handleKeydown = ({ key }: { key: KeyPressed }) => {
        const isEnterKey = key === Keys.enter
        const isNameTaken = checkNameAvailability(playlistName)

        if (isEnterKey) {
            if (!isNameTaken) {
                library.createPlaylist(playlistName)
            } else {
                shakeInputBox()
            }
        }
    }

    let shakeClass
    const shakeClassOn = () => shakeClass = true
    const shakeClassOff = () => shakeClass = false

    const shakeInputBox = () => {
        shakeClassOn()
        setTimeout(shakeClassOff, 1000)
    }

    type PlaylistName = string
    const checkNameAvailability = (name: PlaylistName) => {
        return $playlists.some(playlist => playlist.name === name)
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
        class:shakeClass={shakeClass}
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
        font: inherit;

        display: block;

        width: 50%;

        transition: margin 20ms;
    }

    @keyframes shake {
        0%, 100% {transform: translateX(0);}
        10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
        20%, 40%, 60%, 80% {transform: translateX(5px);}
    }

    .shakeClass {
        outline: solid red;

        animation: shake 80ms;
    }
</style>