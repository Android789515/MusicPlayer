import { derived, writable } from 'svelte/store'

import type { clickOrTouch } from '../types/barInteraction'

type setBarValueFn = (event: clickOrTouch) => void

const useDraggableBar = (setBarValue: setBarValueFn) => {
    const draggingState = writable(false)
    const dragging = derived(draggingState, $state => $state)

    const draggingOn = () => draggingState.set(true)
    const draggingOff = () => draggingState.set(false)

    const handleClick = (event: clickOrTouch) => {
        draggingOn()
        setBarValue(event)
    }

    const handleMove = (event: clickOrTouch) => {
        if (dragging) {
            setBarValue(event)
        }
    }

    return {
        draggingOff,
        handleClick,
        handleMove
    }
}

export default useDraggableBar