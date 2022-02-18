import { writable } from 'svelte/store'

interface Directory {
    directory: string
}

const createDirectoryNavigator = () => {
    const internalState = writable<Directory>({ directory: '' })
    const { subscribe } = internalState

    const initialize = (directory: string) => {
        internalState.set({ directory })
    }

    const navigate = (directory: string) => {
        internalState.set({ directory })
    }

    return {
        subscribe,
        initialize,
        navigate
    }
}

export const directoryNavigator = createDirectoryNavigator()