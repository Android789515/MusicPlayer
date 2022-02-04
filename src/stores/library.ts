import { writable } from 'svelte/store'

const songs = writable([])
const queuedSong = writable({
    id: undefined,
    src: undefined,
    coverArt: undefined,
    title: undefined,
    artist: undefined,
    duration: undefined
})

const playlists = writable([])

export { songs, queuedSong, playlists }