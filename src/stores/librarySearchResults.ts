import { derived } from 'svelte/store'

import { library } from './library'
import type { Playlist, Song } from '../types/libraryTypes'

const librarySearchResults = (query: string) => derived(library, state => {
    const piecesOfState = Object.values(state)

    // Go through each piece of state
    const searchResults = piecesOfState.reduce((results, piece) => {
        if (Array.isArray(piece)) {
            // If it's songs or playlists
            const matches = lookThrough(piece).for(query)
            console.log(matches)
        }
        return results
    }, [])

    console.log('Search results: ', searchResults)
})

const lookThrough = (collection: Song[] | Playlist[]) => {
    return {
        for: (query: string) => {
            return collection.some((item: Song | Playlist) => {

            })
        }
    }
}

const queryMatch = <Type>(item: Type, query: string) => {
    console.log('Item', item)
    console.log('Query', query)
    console.log('Are equal?', String(item) === query)

    return String(item) === query
}

export { librarySearchResults }