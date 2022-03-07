import { get, writable } from 'svelte/store'

import type { Directory } from '../types/directoryTypes'
import { Directories } from '../types/directoryTypes'

import CurrentlyPlaying from '../pages/CurrentlyPlaying.svelte'
import Library from '../pages/Library.svelte'

const currentDirectory = writable<Directory>(Directories.library)

const directories = {
    currentlyPlaying: CurrentlyPlaying,
    library: Library
}
// TODO - refactor
const useDirectoryNavigator = () => {
    return {
        getComponentToRender() {
            const keyToCurrentDirectory = get(currentDirectory) as keyof typeof directories

            return directories[keyToCurrentDirectory]
        },
        navigate(directory: Directory) {
            currentDirectory.set(directory)
        }
    }
}

export { currentDirectory, useDirectoryNavigator }