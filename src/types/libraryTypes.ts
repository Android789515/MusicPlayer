import type { PictureType } from 'jsmediatags/types'

export type SongID = string

export interface Song {
    readonly id: SongID | undefined
    src: string | undefined
    coverArt: PictureType | undefined
    title: string | undefined
    artist: string | undefined
    duration: number | undefined
}

export type PlaylistID = string

export interface Playlist {
    readonly id: PlaylistID
    name: string
    songs: string[]
    isOpen: boolean
}

export enum SearchableKeys {
    title = 'title',
    artist = 'artist',
    duration = 'duration',
    name = 'name',
    songs = 'songs'
}