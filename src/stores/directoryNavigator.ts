import { get, writable } from 'svelte/store'

import CurrentlyPlaying from '../pages/CurrentlyPlaying.svelte'
import Library from '../pages/Library.svelte'

type Directory = string
const currentDirectory = writable<Directory>('library')

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