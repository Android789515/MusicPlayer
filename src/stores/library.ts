import { derived, writable } from 'svelte/store'

import type { Song } from '../types/song'

const blankSong: Song = {
    id: undefined,
    src: undefined,
    coverArt: undefined,
    title: undefined,
    artist: undefined,
    duration: undefined
}

interface Library {
    songs: Song[],
    playlists: [],
    queuedSong: Song
}

const createLibrary = () => {
    const internalState = writable<Library>({
        songs: [],
        playlists: [],
        queuedSong: blankSong
    })
    const { subscribe, update } = internalState

    const addSong = (song: Song) => {
        update(library => {
            return { ...library, songs: [...library.songs, song] }
        })
    }

    const removeSong = (filterId: string) => {
        update(library => {
            const filteredSongs = library.songs.filter(({ id }) => id !== filterId)

            return { ...library, songs: filteredSongs }
        })
    }

    const queueSong = (songId: string) => {
        update(library => {
            const songToQueue = library.songs.find(song => song.id === songId)
            if (songToQueue) {
                return { ...library, queuedSong: songToQueue }
            }
            return library
        })
    }

    const unqueueSong = () => {
        update(library => {
            return { ...library, queuedSong: blankSong }
        })
    }

    return {
        subscribe,
        addSong,
        removeSong,
        queueSong,
        unqueueSong
    }
}

export const library = createLibrary()
export const songs = derived(library, state => state.songs)
export const queuedSong = derived(library, state => state.queuedSong)
