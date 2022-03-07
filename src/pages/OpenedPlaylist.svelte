<script lang='ts'>
    import { afterUpdate } from 'svelte'
    import { useNavigate } from 'svelte-navigator'

    import { openedPlaylists } from '../stores/library'
    import { Routes } from '../types/routes'

    const navigate = useNavigate()

    const redirectIfNoPlaylistOpen = () => {
        const noPlaylistsOpen = $openedPlaylists.length < 1

        if (noPlaylistsOpen) {
            navigate(Routes.library)
        }
    }

    afterUpdate(redirectIfNoPlaylistOpen)
</script>

<h2>Hi</h2>

<style>

</style>