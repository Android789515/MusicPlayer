import type { Tags } from 'jsmediatags/types'

export interface AudioFileData {
    tags: Tags,
    src: string,
    duration: number
}

interface TagKeys {
    [key: string]: string
}

export interface TagDefaults extends TagKeys {
    title: string
    artist: 'Unknown artist'
}