<script lang='ts'>
    import useDraggableBar from '../../utils/useDraggableBar'
    import type { clickOrTouch } from '../../types/barInteraction'

    export let time
    export let duration

    let songBar
    $: timePercentage = (time / duration) * 100

    const getPositionClicked = (event: clickOrTouch) => {
        const songBarLeftSide = songBar.getBoundingClientRect().left
        if (event instanceof MouseEvent) {
            return event.clientX - songBarLeftSide
        } else {
            return event.touches[0].clientX - songBarLeftSide
        }
    }
    const setSongTime = (event: clickOrTouch) => {
        const songBarWidth = songBar.clientWidth
        const positionClicked = getPositionClicked(event)

        const percentageOfSong = positionClicked / songBarWidth
        const timeToSet = percentageOfSong * duration

        time = timeToSet
    }

    const { draggingOff, handleClick, handleMove } = useDraggableBar(setSongTime)
</script>

<svelte:window
    on:mouseup={draggingOff}
    on:touchend={draggingOff}
    on:touchcancel={draggingOff}
/>

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
        height: .5em;

        background: #333;
    }

    .slider {
        pointer-events: none;

        height: 100%;

        background: #ff00c3;
    }
</style>