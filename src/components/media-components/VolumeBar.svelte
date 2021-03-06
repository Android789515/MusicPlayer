<script lang='ts'>
    import useDraggableBar from '../../utils/useDraggableBar'
    import capDecimal from '../../utils/capDecimal'
    import type { clickOrTouch } from '../../types/barInteraction'

    import DragEventRemover from '../generic-components/DragEventRemover.svelte'

    export let volume
    export let isVolumeBarShown
    const hideVolumeBar = () => isVolumeBarShown = false

    $: volumePercent = volume * 100

    const setVolume = (newVolume: number) => {
        volume = newVolume
    }

    const raiseVolume = (amount: number) => volume = capDecimal(volume + amount)
    const lowerVolume = (amount: number) => volume = capDecimal(volume - amount)

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

    const adjustVolumeBar = (event: clickOrTouch) => {
        const volumeBarHeight = volumeBar.clientHeight
        const positionInteracted = getInteractPosition(event)

        const volumeToSet = capDecimal(positionInteracted / volumeBarHeight)

        // Mouse dragging is inaccurate so rounding must happen
        if (event instanceof MouseEvent) {
            const roundedValue = Math.round(volumeToSet * 10) / 10
            setVolume(roundedValue)
        } else {
            setVolume(volumeToSet)
        }
    }

    const { draggingOff, handleClick, handleMove } = useDraggableBar(adjustVolumeBar)

    const handleInteraction = (event: clickOrTouch) => {
        const didClickOnVolumeBar = volumeBar.contains(event.target)
        if (isVolumeBarShown && !didClickOnVolumeBar) {
            hideVolumeBar()
        }
    }

    type Keypressed = string

    enum Keys {
        upArrow = 'ArrowUp',
        downArrow = 'ArrowDown'
    }

    const handleKeydown = ({ key }: { key: Keypressed }) => {
        const wasUpArrowPressed = key === Keys.upArrow
        const wasDownArrowPressed = key === Keys.downArrow

        if (wasUpArrowPressed) {
            raiseVolume(.1)
        } else if (wasDownArrowPressed) {
            console.log(volume)
            lowerVolume(.1)
        }
    }
</script>

<DragEventRemover {draggingOff} />

<svelte:window on:pointerup={handleInteraction} />

<div
    class='volume-bar clickable barTransition'
    class:shown={isVolumeBarShown}
    aria-label={`Volume bar, volume is ${volumePercent}%`}
    tabindex='5'
    draggable='true'
    bind:this={volumeBar}
    on:mousedown|preventDefault={handleClick}
    on:mousemove={handleMove}
    on:touchstart={handleClick}
    on:touchmove={handleMove}
    on:keydown={handleKeydown}
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