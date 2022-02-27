import { derived } from 'svelte/store'

import { library } from './library'
import type { Playlist, Song } from '../types/libraryTypes'

const search = (query: string) => derived(library, state => {
    if (!query) return []
    const piecesOfState = Object.values(state)

    // Go through each piece of state
    const searchResults = piecesOfState.reduce((results, piece) => {
        if (Array.isArray(piece)) {
            // If it's songs or playlists
            const matches = lookThrough(piece).for(query)
            return [...results, ...matches]
        }
        return results
    }, [])

    if (!searchResults.length) {
        const nothingFound = [
            { message: 'Nothing Found' }
        ]
        return nothingFound
    }
    return searchResults
})

const lookThrough = (collection: (Song | Playlist)[]) => {
    return {
        for: (query: string) => {
            return collection.reduce((matches: (Song | Playlist)[], item: Song | Playlist) => {
                const wasMatchFound = Object.values(item).some(value => queryMatch(value, query))

                return wasMatchFound ? [...matches, item] : matches
            }, [])
        }
    }
}

const queryMatch = <Type>(item: Type, query: string) => {
    return String(item) === query
}

export { search }