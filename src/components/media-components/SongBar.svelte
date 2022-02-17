<script lang='ts'>
    import useDraggableBar from '../../utils/useDraggableBar'
    import capPercentage from '../../utils/capPercentage'
    import type { clickOrTouch } from '../../types/barInteraction'

    import DragEventRemover from '../generic-components/DragEventRemover.svelte'

    export let time
    export let duration

    let songBar
    $: timePercentage = ((time / duration) * 100).toFixed(0)

    const getInteractPosition = (event: clickOrTouch) => {
        const songBarLeftSide = songBar.getBoundingClientRect().left
        if (event instanceof MouseEvent) {
            const eventPosition = event.clientX
            return eventPosition - songBarLeftSide
        } else {
            const eventPosition = event.touches[0].clientX
            return eventPosition - songBarLeftSide
        }
    }
    const setSongTime = (event: clickOrTouch) => {
        const songBarWidth = songBar.clientWidth
        const positionInteracted = getInteractPosition(event)

        const percentageOfSong = capPercentage(positionInteracted / songBarWidth)
        const timeToSet = percentageOfSong * duration

        time = timeToSet
    }

    const { draggingOff, handleClick, handleMove } = useDraggableBar(setSongTime)
</script>

<DragEventRemover {draggingOff} />

<div
    class='song-bar clickable'
    draggable='true'
    bind:this={songBar}
    on:mousedown|preventDefault={handleClick}
    on:mousemove={handleMove}
    on:touchstart={handleClick}
    on:touchmove={handleMove}
>
    <div class='slider' style='width: {timePercentage}%'>
    </div>
</div>

<style>
    .song-bar {
        grid-row: 3;
        grid-column: 1 / span 2;

        height: .5em;

        background: var(--bar-bg);
    }

    .slider {
        pointer-events: none;

        height: 100%;

        background: var(--slider-bg);
    }
</style>