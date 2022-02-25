import { get, writable } from 'svelte/store'

import CurrentlyPlaying from '../pages/CurrentlyPlaying.svelte'
import Library from '../pages/Library.svelte'

const currentDirectory = writable<string>('')

const directories = {
    currentlyPlaying: CurrentlyPlaying,
    library: Library
}

const useDirectoryNavigator = () => {
    return {
        getComponentToRender() {
            return directories[get(currentDirectory) as keyof typeof directories]
        },
        navigate(directory: string) {
            currentDirectory.set(directory)
        }
    }
}

export { currentDirectory, useDirectoryNavigator }