import { writable } from 'svelte/store'

import type { MediaControl } from '../objects/appObjects'

const createMediaControlOptions = () => {
    const { subscribe, update } = writable<MediaControl>({
        volume: .5,
        muted: false,
        paused: true,
        loop: false,
        shuffle: false
    })

    return {
        subscribe,
        pause: () => update(controls => ({ ...controls, paused: true })),
        unPause: () => update(controls => ({ ...controls, paused: false })),

        mute: () => update(controls => ({ ...controls, muted: true })),
        unMute: () => update(controls => ({ ...controls, muted: false }))
    }
}

export const mediaControlOptions = createMediaControlOptions()