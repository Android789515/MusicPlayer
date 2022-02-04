import { writable } from 'svelte/store'

const createMediaControlOptions = () => {
    const { subscribe, update, set } = writable({
        volume: .5,
        muted: false,
        paused: true,
        loop: false,
        shuffle: false,
        time: 0,
        maxTime: undefined
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