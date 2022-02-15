import { writable } from 'svelte/store'

import type { Song } from '../types/song'

const songs = writable([])

const createQueuedSong = () => {
    const { subscribe, update, set } = writable<Song>({
        id: undefined,
        src: undefined,
        coverArt: undefined,
        title: undefined,
        artist: undefined,
        duration: undefined
    })

    return {
        subscribe,
        update,
        queueSong: (song: Song) => set(song)
    }
}


const playlists = writable([])

export const queuedSong = createQueuedSong()
export { songs, playlists }