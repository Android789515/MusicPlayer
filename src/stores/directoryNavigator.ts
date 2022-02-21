import { get, writable } from 'svelte/store'

import QueuedSong from '../components/media-components/wrappers/QueuedSong.svelte'
import Library from '../components/library-components/Library.svelte'

type Directory = string

const currentDirectory = writable<Directory>('')

const directories = {
    currentlyPlaying: QueuedSong,
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