export interface QueuedSong {
    id: string | undefined,
    src: string | undefined,
    coverArt: string | undefined,
    title: string | undefined,
    artist: string | undefined,
    duration: number | undefined
}

export interface MediaControl {
    volume: number,
    muted: boolean,
    paused: boolean,
    loop: boolean,
    shuffle: boolean
}