import { get, writable } from 'svelte/store'
import capDecimal from '../utils/capDecimal'
import type { MediaControls } from '../types/mediaControlTypes'
import { VolumeBarStates } from '../types/mediaControlTypes'

const createMediaControls = () => {
    const mediaControls = writable<MediaControls>({
        paused: true,
        time: 0,
        volume: .5,
        shuffle: false,
        volumeBarState: VolumeBarStates.hidden
    })
    const { subscribe, update } = mediaControls

    const isPaused = () => get(mediaControls).paused
    const pause = () => update(mediaControls => ({ ...mediaControls, paused: true }))
    const play = () => update(mediaControls => ({ ...mediaControls, paused: false }))

    const getCurrentTime = () => get(mediaControls).time
    const rewind = () => update(mediaControls => {
        return {
            ...mediaControls,
            time: mediaControls.time - 5
        }
    })
    const fastForward = () => update(mediaControls => {
        return {
            ...mediaControls,
            time: mediaControls.time + 5
        }
    })

    const getVolume = () => get(mediaControls).volume
    const setVolume = (volume: number) => update(mediaControls => {
        return { ...mediaControls, volume }
    })
    const raiseVolume = (amount: number) => update(mediaControls => {
        const volume = capDecimal(mediaControls.volume + amount)
        return { ...mediaControls, volume }
    })
    const lowerVolume = (amount: number) => update(mediaControls => {
        const volume = capDecimal(mediaControls.volume - amount)
        return { ...mediaControls, volume }
    })

    const getVolumeBarState = () => get(mediaControls).volumeBarState
    const showVolumeBar = () => update(mediaControls => {
        return {
            ...mediaControls,
            volumeBarState: VolumeBarStates.shown
        }
    })
    const hideVolumeBar = () => update(mediaControls => {
        return {
            ...mediaControls,
            volumeBarState: VolumeBarStates.hidden
        }
    })

    const isShuffleToggled = () => get(mediaControls).shuffle
    const toggleShuffle = () => update(mediaControls => {
        return { ...mediaControls, shuffle: !mediaControls.shuffle }
    })

    return {
        subscribe,
        isPaused,
        pause,
        play,
        getCurrentTime,
        rewind,
        fastForward,
        getVolume,
        setVolume,
        raiseVolume,
        lowerVolume,
        getVolumeBarState,
        showVolumeBar,
        hideVolumeBar,
        isShuffleToggled,
        toggleShuffle
    }
}

export const mediaControls = createMediaControls()