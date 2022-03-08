<script lang='ts'>
    import { afterUpdate, onMount } from 'svelte'
    import { useNavigate, useParams } from 'svelte-navigator'

    import { playlists } from '../stores/library'
    import { Routes } from '../types/routes'

    const params = useParams()

    let thisPlaylist
    const getPlaylistData = () => {
        const { playlistID } = $params

        thisPlaylist = $playlists.find(playlist => {
            const isThisPlaylist = playlist.id === playlistID

            if (isThisPlaylist) {
                return playlist
            }
        })
    }

    const navigate = useNavigate()

    const redirectIfNoPlaylistOpen = () => {
        const noPlaylistsOpen = $playlists.every(playlist => !playlist.isOpen)

        if (noPlaylistsOpen) {
            navigate(Routes.library)
        }
    }

    onMount(getPlaylistData)
    afterUpdate(redirectIfNoPlaylistOpen)
</script>

<section class='opened-playlist' aria-label='Opened Playlist'>
    <header>
        {#if thisPlaylist}
            <h1 class='playlist-name'>{thisPlaylist.name}</h1>
        {/if}
    </header>
</section>

<style>
    .opened-playlist {
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 4em;
    }

    .playlist-name {
        font-size: 2rem;
    }
</style>