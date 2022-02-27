import type { PictureType } from 'jsmediatags/types'

export type SongID = string

export interface Song {
    id: SongID | undefined
    src: string | undefined
    coverArt: PictureType | undefined
    title: string | undefined
    artist: string | undefined
    duration: number | undefined
}

export enum SongKeys {
    id = 'id',
    src = 'src',
    coverArt = 'coverArt',
    title = 'title',
    artist = 'artist',
    duration = 'duration'
}

export type PlaylistID = string

export interface Playlist {
    id: PlaylistID
    name: string
    songs: string[]
}