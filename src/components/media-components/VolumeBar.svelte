<script lang='ts'>
    import useDraggableBar from '../../utils/useDraggableBar'
    import capPercentage from '../../utils/capPercentage'
    import type { clickOrTouch } from '../../types/barInteraction'

    import DragEventRemover from '../generic-components/DragEventRemover.svelte'

    export let volume
    export let isVolumeBarShown

    $: volumePercentage = volume * 100

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

        volume = volumeToSet
    }

    const { draggingOff, handleClick, handleMove } = useDraggableBar(setVolume)
</script>

<DragEventRemover {draggingOff} />

<div
    class='volume-bar clickable'
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
        style='height: {volumePercentage}%'
    >
    </div>
</div>

<style>
    .volume-bar {
        order: -1;

        display: none;

        width: .5em;
        height: var(--volume-bar-height);

        background: var(--bar-bg);

        transform: rotate(180deg);
    }

    .volume-bar.shown {
        display: block;

        margin: auto;
    }

    .slider {
        width: 100%;

        background: var(--slider-bg);
    }
</style>