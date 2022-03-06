<script lang='ts'>
    import { capitalize } from '../../utils/stringUtils'
    import { useEnterKeyAsClick } from '../../utils/useEnterKeyAsClick'

    export let buttonName
    export let buttonAction
    export let hidden = false
    export let smallerSize = false

    let mediaControlButton
    const refocusOnButton = () => mediaControlButton.focus()

    const simulateClick = () => {
        buttonAction()
        refocusOnButton()
        // TODO - make work on play/pause
    }

    const handleKeydown = useEnterKeyAsClick(simulateClick)
</script>

<img
    class='media-control-button clickable'
    class:smallerSize={smallerSize === true}
    class:hidden={hidden}
    aria-label={capitalize(buttonName) + 'button'}
    role='button'
    tabindex='5'
    src='assets/icons/media-buttons/{buttonName}.svg'
    alt={buttonName}
    bind:this={mediaControlButton}
    on:click={buttonAction}
    on:keydown={handleKeydown}
>

<style>
    .media-control-button {
        width: 3.75em;
    }

    .smallerSize {
        width: 3.125em;
    }
</style>