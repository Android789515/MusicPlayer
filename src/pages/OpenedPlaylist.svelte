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
    {#if thisPlaylist}
        <h1 class='playlist-name'>{thisPlaylist.name}</h1>

        <ul class='songs-in-playlist unstyled-ul'>
        </ul>
    {/if}
</section>

<style>
    .opened-playlist {
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 2.5em 1em 0 1em;
    }

    .playlist-name {
        font-size: 2rem;
        text-align: center;

        border: solid;
    }
</style>