import { get, writable } from 'svelte/store'

import type { clickOrTouch } from '../types/barInteraction'

type setBarValueFn = (event: clickOrTouch) => void

const useDraggableBar = (setBarValue: setBarValueFn) => {
    const dragging = writable(false)

    const draggingOn = () => dragging.set(true)
    const draggingOff = () => dragging.set(false)

    const handleClick = (event: clickOrTouch) => {
        draggingOn()
        setBarValue(event)
    }

    const handleMove = (event: clickOrTouch) => {
        if (get(dragging)) {
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