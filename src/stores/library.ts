import { writable } from 'svelte/store'

import type { QueuedSong } from '../objects/appObjects'

const songs = writable([])
const queuedSong = writable<QueuedSong>({
    id: undefined,
    src: undefined,
    coverArt: undefined,
    title: undefined,
    artist: undefined,
    duration: undefined
})

const playlists = writable([])

export { songs, queuedSong, playlists }