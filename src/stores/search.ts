import { derived } from 'svelte/store'

import { library } from './library'
import type { Playlist, Song } from '../types/libraryTypes'

const search = (query: string) => derived(library, state => {
    if (!query) return []

    const searchResults = [
        ...lookThrough(state.songs).for(query),
        ...lookThrough(state.playlists).for(query)
    ]
    const anyResults = searchResults.length

    return anyResults ? searchResults : newResultsMessage('Nothing found')
})

const newResultsMessage = (message: string) => {
    return [{ message }]
}

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