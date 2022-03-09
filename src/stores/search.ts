import { derived } from 'svelte/store'

import { library } from './library'
import type { Playlist, Song } from '../types/libraryTypes'
import { SearchableKeys } from '../types/libraryTypes'

const searchLibrary = (query: string) => derived(library, ({ songs, playlists }) => {
    if (!query) return []

    const searchResults = [
        ...lookThrough(songs).for(query),
        ...lookThrough(playlists).for(query)
    ]
    const anyResults = searchResults.length

    return anyResults ? searchResults : newResultsMessage('Nothing found')
})

const newResultsMessage = (message: string) => [{ message }]

const lookThrough = (collection: (Song | Playlist)[]) => {
    return {
        for: (query: string) => {
            return collection.reduce((matches: (Song | Playlist)[], item: Song | Playlist) => {
                const searchableValues = Object.entries(item).reduce(getSearchableValues, [])
                const wasMatchFound = searchableValues.some(value => queryMatch(value, query))

                return wasMatchFound ? [...matches, item] : matches
            }, [])
        }
    }
}

type PossibleValues = SearchableKeys | Song[]
type ArrayEntries = [string, PossibleValues]

const getSearchableValues = (values: PossibleValues[], [ key, value ]: ArrayEntries) => {
    if (key in SearchableKeys) {
        return [...values, value]
    }
    return values
}

const queryMatch = (item: PossibleValues, query: string) => {
    switch (typeof item) {
        case 'string':
            const lowerCaseString = item.toLocaleLowerCase()
            const lowerCaseQuery = query.toLocaleLowerCase()

            return lowerCaseString.includes(lowerCaseQuery)

        case 'number':
            return item <= Number(query)

        default:
            const isSongsList = Array.isArray(item)
            if (!isSongsList) {
                return item === query
            }

            const anyMatchesInSongsList = lookThrough(item).for(query).length
            return anyMatchesInSongsList
    }
}

export { searchLibrary }