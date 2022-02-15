import { writable } from 'svelte/store'

import type { Song } from '../types/song'

const songs = writable([])

const blankSong: Song = {
    id: undefined,
    src: undefined,
    coverArt: undefined,
    title: undefined,
    artist: undefined,
    duration: undefined
}

const createQueuedSong = () => {
    const { subscribe, update, set } = writable<Song>(blankSong)

    return {
        subscribe,
        update,
        queueSong: (song: Song) => set(song),
        unqueueSong: () => set(blankSong)
    }
}


const playlists = writable([])

export const queuedSong = createQueuedSong()
export { songs, playlists }