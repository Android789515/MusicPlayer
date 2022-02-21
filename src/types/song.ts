import type { PictureType } from 'jsmediatags/types'

export interface Song {
    id: string | undefined,
    src: string | undefined,
    coverArt: PictureType | undefined,
    title: string | undefined,
    artist: string | undefined,
    duration: number | undefined
}