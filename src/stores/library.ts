import { derived, writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

import type { Playlist, PlaylistID, Song, SongID } from '../types/libraryTypes'

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
    playlists: Playlist[],
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

    const removeSong = (songID: SongID) => {
        update(library => {
            const filteredSongs = library.songs.filter(({ id }) => id !== songID)

            return { ...library, songs: filteredSongs }
        })
    }

    const queueSong = (songID: SongID) => {
        update(library => {
            const songToQueue = library.songs.find(song => song.id === songID)
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

    const createPlaylist = (name: string) => {
        update(library => {
            const newPlaylist = {
                id: uuid(),
                name,
                assignedSongs: []
            }
            return { ...library, playlists: [...library.playlists, newPlaylist] }
        })
    }

    const addSongToPlaylist = (songID: SongID, playlistID: PlaylistID) => {
        update(library => {
            return { ...library, playlists: library.playlists.map(playlist => {
                    const isPlaylistToAddTo = playlist.id === playlistID
                    if (isPlaylistToAddTo) {
                        return {
                            ...playlist,
                            assignedSongs: [...playlist.assignedSongs, songID]
                        }
                    }
                    return playlist
                })
            }
        })
    }

    const deletePlaylist = (playlistID: PlaylistID) => {
        update(library => {
            return { ...library, playlists: library.playlists.filter(playlist => {
                    const shouldKeep = playlist.id !== playlistID
                    if (shouldKeep) {
                        return playlist
                    }
                })
            }
        })
    }

    const removeSongFromPlaylist = (songID: SongID, playlistID: PlaylistID) => {
        update(library => {
            return { ...library, playlists: library.playlists.map(playlist => {
                    const isPlaylistToUpdate = playlist.id === playlistID
                    if (isPlaylistToUpdate) {
                        return {
                            ...playlist,
                            assignedSongs: playlist.assignedSongs.filter(id => id !== songID)
                        }
                    }
                    return playlist
                })
            }
        })
    }

    return {
        subscribe,
        addSong,
        removeSong,
        queueSong,
        unqueueSong,
        createPlaylist,
        addSongToPlaylist,
        deletePlaylist,
        removeSongFromPlaylist
    }
}

export const library = createLibrary()
export const songs = derived(library, state => state.songs)
export const queuedSong = derived(library, state => state.queuedSong)
