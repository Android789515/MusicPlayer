<script lang='ts'>
    import { afterUpdate } from 'svelte'
    import { useNavigate } from 'svelte-navigator'

    import { playlists } from '../stores/library'
    import { Routes } from '../types/routes'

    const navigate = useNavigate()

    const redirectIfNoPlaylistOpen = () => {
        const noPlaylistsOpen = $playlists.every(playlist => !playlist.isOpen)

        if (noPlaylistsOpen) {
            navigate(Routes.library)
        }
    }

    afterUpdate(redirectIfNoPlaylistOpen)
</script>

<h2>Hi</h2>

<style>

</style>