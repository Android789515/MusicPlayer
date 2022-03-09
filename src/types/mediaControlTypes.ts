type Seconds = number
export enum VolumeBarStates {
    hidden = 'hidden',
    shown = 'shown'
}

export interface MediaControls {
    paused: boolean
    time: Seconds
    volume: number
    shuffle: boolean
    volumeBarState: VolumeBarStates.shown | VolumeBarStates.hidden
}