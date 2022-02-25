<script lang='ts'>
    import useDraggableBar from '../../utils/useDraggableBar'
    import capPercentage from '../../utils/capPercentage'
    import type { clickOrTouch } from '../../types/barInteraction'

    import DragEventRemover from '../generic-components/DragEventRemover.svelte'

    export let volume
    export let isVolumeBarShown
    const hideVolumeBar = () => isVolumeBarShown = false

    $: volumePercent = volume * 100

    let volumeBar

    const getInteractPosition = (event: clickOrTouch) => {
        // Volume bar is rotated 180deg so the top is the bottom
        const volumeBarTop = volumeBar.getBoundingClientRect().bottom
        if (event instanceof MouseEvent) {
            const eventPosition = event.clientY
            return volumeBarTop - eventPosition
        } else {
            const eventPosition = event.touches[0].clientY
            return volumeBarTop - eventPosition
        }
    }

    const setVolume = (event: clickOrTouch) => {
        const volumeBarHeight = volumeBar.clientHeight
        const positionInteracted = getInteractPosition(event)

        const volumeToSet = capPercentage(positionInteracted / volumeBarHeight)

        // Mouse dragging is inaccurate so rounding must happen
        if (event instanceof MouseEvent) {
            const roundedValue = Math.round(volumeToSet * 10) / 10
            volume = roundedValue
        } else {
            volume = volumeToSet
        }
    }

    const { draggingOff, handleClick, handleMove } = useDraggableBar(setVolume)

    const handleInteraction = (event: clickOrTouch) => {
        const didClickOnVolumeBar = volumeBar.contains(event.target)
        if (isVolumeBarShown && !didClickOnVolumeBar) {
            hideVolumeBar()
        }
    }
</script>

<DragEventRemover {draggingOff} />

<svelte:window on:pointerup={handleInteraction} />

<div
    aria-label={`Volume bar, volume is ${volumePercent}%`}
    class='volume-bar clickable barTransition'
    class:shown={isVolumeBarShown}
    draggable='true'
    bind:this={volumeBar}
    on:mousedown|preventDefault={handleClick}
    on:mousemove={handleMove}
    on:touchstart={handleClick}
    on:touchmove={handleMove}
>
    <div
        class='slider'
        style='height: {volumePercent}%'
    >
    </div>
</div>

<style>
    .volume-bar {
        display: none;

        width: .5em;
        height: 2em;

        margin-left: .1em;
        margin-bottom: .7em;

        background: var(--bar-bg);

        transform: rotate(180deg);
    }

    .volume-bar.shown {
        display: block;
    }

    .slider {
        width: 100%;

        background: var(--slider-bg);
    }
</style>