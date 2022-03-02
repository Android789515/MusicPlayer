import { derived } from 'svelte/store'

import { library } from './library'
import type { Playlist, Song } from '../types/libraryTypes'
import { SearchableKeys } from '../types/libraryTypes'

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
                const searchableValues = Object.entries(item).map(getSearchableValues)
                const wasMatchFound = searchableValues.some(value => queryMatch(value, query))

                return wasMatchFound ? [...matches, item] : matches
            }, [])
        }
    }
}

type ArrayEntries = [string, any]
const getSearchableValues = ([ key, value ]: ArrayEntries) => {
    if (key in SearchableKeys) {
        return value
    }
}

const queryMatch = (item: string | number, query: string) => {
    switch (typeof item) {
        case 'string':
            return item.includes(query)

        case 'number':
            return item <= Number(query)

        default:
            return item === query
    }
}

export { search }