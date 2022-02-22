import { writable } from 'svelte/store'

import type { Song } from '../types/song'

const blankSong: Song = {
    id: undefined,
    src: undefined,
    coverArt: undefined,
    title: undefined,
    artist: undefined,
    duration: undefined
}

const createSongsStore = () => {
    const { subscribe, update } = writable<Song[]>([])

    const addSong = (song: Song) => {
        update(songs => [...songs, song])
    }

    const removeSong = (filterId: string) => {
        update(songs => songs.filter(song => song.id !== filterId))
    }

    return {
        subscribe,
        addSong,
        removeSong
    }
}

const createQueuedSong = () => {
    const { subscribe, update, set } = writable<Song>(blankSong)

    return {
        subscribe,
        update,
        set,
        unqueueSong: () => set(blankSong)
    }
}


const playlists = writable([])

export const songs = createSongsStore()
export const queuedSong = createQueuedSong()