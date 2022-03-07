<script lang='ts'>
    import { afterUpdate, onMount } from 'svelte'
    import { useNavigate, useParams } from 'svelte-navigator'

    import { playlists } from '../stores/library'
    import { Routes } from '../types/routes'

    const params = useParams()

    let thisPlaylist
    const getPlaylistData = () => {
        const { playlistName } = $params

        thisPlaylist = $playlists.find(playlist => {
            const isThisPlaylist = playlist.name === playlistName

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

{#if thisPlaylist}
    <h2>{thisPlaylist.name}</h2>
{/if}

<style>

</style>