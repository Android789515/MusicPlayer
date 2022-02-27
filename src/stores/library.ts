import { derived, get, writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

import type { Playlist, PlaylistID, Song, SongID } from '../types/libraryTypes'
import { getSecondsOfTimeFormat } from '../utils/formatTime'

const blankSong: Song = {
    id: undefined,
    src: undefined,
    coverArt: undefined,
    title: undefined,
    artist: undefined,
    duration: undefined
}

interface Library {
    songs: Song[]
    playlists: Playlist[]
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
                songs: []
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
                            songs: [...playlist.songs, songID]
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
                            songs: playlist.songs.filter(id => id !== songID)
                        }
                    }
                    return playlist
                })
            }
        })
    }

    type LibraryQuery = string | number

    const searchSongs = (query: LibraryQuery) => {
        return get(library).songs.reduce<Song[]>((results, song) => {
            const doesMatchQuery = queryMatch(song, query)
            if (doesMatchQuery) return [...results, song]

            return results
        }, [])
    }

    const searchPlaylists = (query: LibraryQuery) => {
        return get(library).playlists.reduce<Playlist[]>((results, playlist) => {
            const doesMatchQuery = queryMatch(playlist, query)
            if (doesMatchQuery) return [...results, playlist]

            return results
        }, [])
    }

    const queryMatch = (array: Song | Playlist, query: LibraryQuery) => {
        return Object.values(array).some(detail => {
            switch (typeof detail) {
                case 'number': // Detail is a song duration
                    const roundedDuration = Math.floor(detail)
                    return roundedDuration <= Number(query)

                case 'string':
                    return detail.includes(String(query)) || detail === String(query)

                default:
                    return detail === query
            }
        })
    }

    const parseQuery = (query: string) => {
        // Example - 3:12 < 4 characters
        const couldQueryBeTimeFormat = query.includes(':')
        if (couldQueryBeTimeFormat) {
            const timeInSeconds = getSecondsOfTimeFormat(query)
            console.log(timeInSeconds)
            if (timeInSeconds) {
                return String(timeInSeconds) // Will be converted to a number later, if needed
            }
        }

        return query
    }

    const queryLibrary = (query: string) => {
        if (!query) return []

        const parsedQuery = parseQuery(query)
        const searchResults = [
            ...searchSongs(parsedQuery),
            ...searchPlaylists(parsedQuery)
        ]

        if (!searchResults.length) {
            return [{ message: 'Nothing Found' }]
        }
        return searchResults
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
        removeSongFromPlaylist,
        queryLibrary
    }
}

export const library = createLibrary()
export const songs = derived(library, state => state.songs)
export const queuedSong = derived(library, state => state.queuedSong)
export const playlists = derived(library, state => state.playlists)
