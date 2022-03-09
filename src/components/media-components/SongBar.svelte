<script lang='ts'>
    import { mediaControls } from '../../stores/mediaControls'
    import useDraggableBar from '../../utils/useDraggableBar'
    import capDecimal from '../../utils/capDecimal'
    import type { clickOrTouch } from '../../types/barInteraction'

    import DragEventRemover from '../generic-components/DragEventRemover.svelte'

    export let duration

    $: time = mediaControls.getCurrentTime()

    let songBar

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
    const adjustSongBar = (event: clickOrTouch) => {
        const songBarWidth = songBar.clientWidth
        const positionInteracted = getInteractPosition(event)

        const percentageOfSong = capDecimal(positionInteracted / songBarWidth)
        const timeToSet = percentageOfSong * duration

        mediaControls.setSongTime(timeToSet)
    }

    const { draggingOff, handleClick, handleMove } = useDraggableBar(adjustSongBar)

    $: timePercent = ((time / duration) * 100).toFixed(0)
</script>

<DragEventRemover {draggingOff} />

<div
    class='song-bar clickable barTransition'
    aria-label={`Song time bar, current song time is ${timePercent}%`}
    role='progressbar'
    draggable='true'
    bind:this={songBar}
    on:mousedown|preventDefault={handleClick}
    on:mousemove={handleMove}
    on:touchstart={handleClick}
    on:touchmove={handleMove}
>
    <div class='slider' style='width: {timePercent}%'>
    </div>
</div>

<style>
    .song-bar {
        grid-row: 3;
        grid-column: 1 / span 3;

        height: .5em;

        background: var(--bar-bg);
    }

    .slider {
        pointer-events: none;

        height: 100%;

        background: var(--slider-bg);
    }
</style>